# Advanced Kubernetes Internals Flashcards

#### PLEG - Pod Lifecycle Event Generator
PLEG is the kubelet's mechanism to detect pod state changes efficiently. Instead of polling all containers constantly, it relies on the container runtime to report events.

```go
// PLEG generates pod lifecycle events
type GenericPLEG struct {
    runtime    RuntimeService
    eventCh    chan *PodLifecycleEvent
    relistPeriod time.Duration
}

func (g *GenericPLEG) relist() {
    // 1. Get current pods from runtime
    currentPods := g.runtime.GetPods()

    // 2. Compare with previous state
    for _, pod := range currentPods {
        oldPod := g.cache[pod.ID]

        // 3. Detect changes and generate events
        if oldPod == nil {
            g.eventCh <- &PodLifecycleEvent{
                ID:   pod.ID,
                Type: ContainerStarted,
            }
        } else if pod.State != oldPod.State {
            g.eventCh <- &PodLifecycleEvent{
                ID:   pod.ID,
                Type: ContainerChanged,
            }
        }
    }

    // 4. Update cache
    g.cache = currentPods
}
```
:p What is PLEG and how does it detect pod lifecycle changes?
??x
PLEG (Pod Lifecycle Event Generator) detects container state changes by periodically relisting all pods from the runtime and comparing with cached state.

Process:
1. Relist pods from runtime every ~1s
2. Compare current state with previous relist
3. Generate events for changes (started, stopped, changed)
4. Send events to kubelet's sync loop

Avoids constant per-container polling. If PLEG is unhealthy, kubelet marks node NotReady.
x??

---

#### SharedIndexInformer Architecture
SharedIndexInformer efficiently watches resources and maintains a local cache with indexing support. Multiple controllers can share one informer.

```go
// SharedIndexInformer structure
type sharedIndexInformer struct {
    indexer    Indexer           // Local cache with indexes
    controller Controller        // Manages watch connection
    processor  *sharedProcessor  // Distributes events to listeners
    listerWatcher ListerWatcher  // List/Watch interface
}

func (s *sharedIndexInformer) Run(stopCh <-chan struct{}) {
    // 1. List all resources initially
    list := s.listerWatcher.List()
    s.indexer.Replace(list)

    // 2. Start watch from resourceVersion
    watcher := s.listerWatcher.Watch(list.ResourceVersion)

    // 3. Process watch events
    for event := range watcher.ResultChan() {
        switch event.Type {
        case Added:
            s.indexer.Add(event.Object)
            s.processor.distribute(event)
        case Modified:
            s.indexer.Update(event.Object)
            s.processor.distribute(event)
        case Deleted:
            s.indexer.Delete(event.Object)
            s.processor.distribute(event)
        }
    }
}

// Multiple controllers share one informer
podInformer := factory.Core().V1().Pods().Informer()
podInformer.AddEventHandler(handler1)  // Controller 1
podInformer.AddEventHandler(handler2)  // Controller 2
// Only ONE watch connection to API server
```
:p How does SharedIndexInformer work and why is it "shared"?
??x
SharedIndexInformer maintains a local cache of resources via a single watch connection, distributing events to multiple event handlers.

Components:
- Indexer: Local cache with index lookups
- Controller: Manages list/watch
- Processor: Fans out events to handlers

"Shared" = multiple controllers share one informer/watch connection instead of each creating their own, reducing API server load.

Flow: List → Watch → Update cache → Distribute to handlers
x??

---

#### Workqueue Rate Limiting
Workqueues manage processing items with rate limiting to prevent overwhelming the system during failures.

```go
// Rate limiting queue with exponential backoff
queue := workqueue.NewRateLimitingQueue(
    workqueue.DefaultControllerRateLimiter())

// Processing pattern
func (c *Controller) processNextItem() bool {
    key, shutdown := c.queue.Get()
    if shutdown {
        return false
    }
    defer c.queue.Done(key)

    err := c.syncHandler(key)
    if err == nil {
        // Success - remove from queue
        c.queue.Forget(key)
        return true
    }

    // Failed - requeue with backoff
    if c.queue.NumRequeues(key) < 5 {
        c.queue.AddRateLimited(key)  // Exponential backoff
        return true
    }

    // Too many failures - give up
    c.queue.Forget(key)
    return true
}

// Rate limiter adds delays
type rateLimiter struct {
    failures map[interface{}]int
    baseDelay time.Duration
    maxDelay  time.Duration
}

func (r *rateLimiter) When(item interface{}) time.Duration {
    exp := r.failures[item]
    r.failures[item]++

    // delay = baseDelay * 2^exp
    delay := r.baseDelay * time.Duration(1<<exp)
    if delay > r.maxDelay {
        delay = r.maxDelay
    }
    return delay
}
```
:p How does workqueue rate limiting prevent controller overload?
??x
Workqueues use exponential backoff to add increasing delays for repeatedly failing items.

Pattern:
1. Get() item from queue
2. Process item
3. Success: Forget() (reset failure count)
4. Failure: AddRateLimited() (requeue with delay)

Delay calculation: baseDelay × 2^failures (capped at maxDelay)

Prevents rapid retry loops that would overwhelm API server during outages. Failed items retry with 1s, 2s, 4s, 8s... delays.
x??

---

#### Leader Election Pattern
Only one replica of a controller should be active. Leader election ensures high availability without duplicate reconciliation.

```go
import "k8s.io/client-go/tools/leaderelection"

func runWithLeaderElection(clientset kubernetes.Interface) {
    lock := &resourcelock.LeaseLock{
        LeaseMeta: metav1.ObjectMeta{
            Name:      "controller-leader",
            Namespace: "kube-system",
        },
        Client: clientset.CoordinationV1(),
        LockConfig: resourcelock.ResourceLockConfig{
            Identity: hostname,  // Unique identity
        },
    }

    leaderelection.RunOrDie(context.TODO(), leaderelection.LeaderElectionConfig{
        Lock:          lock,
        LeaseDuration: 15 * time.Second,
        RenewDeadline: 10 * time.Second,
        RetryPeriod:   2 * time.Second,
        Callbacks: leaderelection.LeaderCallbacks{
            OnStartedLeading: func(ctx context.Context) {
                // This replica is now leader - start work
                runController(ctx)
            },
            OnStoppedLeading: func() {
                // Lost leadership - stop work
                os.Exit(0)
            },
        },
    })
}

// Lease mechanism
// Leader periodically updates lease.spec.renewTime
// If renewTime + leaseDuration < now, lease is expired
// Other replicas try to acquire expired lease
```
:p How does Kubernetes leader election work and why is it needed?
??x
Leader election ensures only one replica of a controller is active at a time using a Lease resource.

Process:
1. Each replica tries to acquire lease with unique identity
2. Leader renews lease every RenewDeadline
3. If leader fails to renew, lease expires after LeaseDuration
4. Other replicas detect expiration and race to acquire
5. Winner becomes new leader

Parameters:
- LeaseDuration: 15s (how long leader owns lease)
- RenewDeadline: 10s (how often to renew)
- RetryPeriod: 2s (how often to check)

Prevents multiple controllers from conflicting changes.
x??

---

#### Scheme and Codec Registration
Kubernetes uses schemes to register types and codecs to serialize/deserialize them. Every API group has its own scheme.

```go
// Scheme maps GVK to Go types
import "k8s.io/apimachinery/pkg/runtime"

scheme := runtime.NewScheme()

// Register types
scheme.AddKnownTypes(schema.GroupVersion{
    Group:   "",
    Version: "v1",
}, &Pod{}, &PodList{})

// GVK = GroupVersionKind
gvk := schema.GroupVersionKind{
    Group:   "",
    Version: "v1",
    Kind:    "Pod",
}

// Convert GVK to Go type
obj, err := scheme.New(gvk)  // Returns &Pod{}

// Codec serializes/deserializes
codec := serializer.NewCodecFactory(scheme)

// Encode Go object to JSON
var pod *Pod
encoded, err := runtime.Encode(codec.LegacyCodec(v1.SchemeGroupVersion), pod)

// Decode JSON to Go object
decoded, gvk, err := codec.UniversalDeserializer().Decode(encoded, nil, nil)
pod = decoded.(*Pod)
```
:p What is a Scheme in Kubernetes and what role does it play?
??x
Scheme is a registry that maps GroupVersionKind (GVK) to Go types, enabling runtime type creation and conversion.

Functions:
- AddKnownTypes(): Register Go types for GVK
- New(gvk): Create instance of Go type for GVK
- ObjectKinds(obj): Get GVK for Go type
- Convert(): Convert between API versions

Used by:
- API server: Decode incoming requests
- Clients: Encode/decode objects
- Conversion: Transform v1beta1 ↔ v1

Without scheme, Kubernetes couldn't handle multiple API versions or create types dynamically.
x??

---

#### Finalizers and Deletion
Finalizers block object deletion until cleanup is complete. Objects enter "terminating" state but aren't removed until finalizers are cleared.

```go
// Add finalizer before creating resource
deployment := &appsv1.Deployment{
    ObjectMeta: metav1.ObjectMeta{
        Name:       "my-app",
        Finalizers: []string{"example.com/cleanup"},
    },
}
clientset.Create(deployment)

// Deletion process
func (c *Controller) handleDelete(obj interface{}) {
    deployment := obj.(*appsv1.Deployment)

    if deployment.DeletionTimestamp != nil {
        // Object is being deleted
        if containsFinalizer(deployment, "example.com/cleanup") {
            // Perform cleanup
            c.cleanupResources(deployment)

            // Remove finalizer
            deployment.Finalizers = removeFinalizer(deployment.Finalizers, "example.com/cleanup")
            clientset.Update(deployment)
            // Now API server will delete it
        }
        return
    }
}

// Timeline:
// 1. User: kubectl delete deployment my-app
// 2. API server: Sets deletionTimestamp, doesn't delete
// 3. Controller: Sees deletionTimestamp, does cleanup
// 4. Controller: Removes finalizer
// 5. API server: Sees no finalizers, actually deletes object
```
:p How do finalizers control object deletion in Kubernetes?
??x
Finalizers are strings in metadata.finalizers that prevent deletion until removed. Object enters "terminating" state (deletionTimestamp set) but isn't deleted.

Flow:
1. Delete request → API sets deletionTimestamp
2. Object still exists but marked for deletion
3. Controller sees deletionTimestamp
4. Controller performs cleanup
5. Controller removes its finalizer
6. When finalizers=[], API deletes object

Use case: Ensure dependent resources cleaned up before parent deleted.

Example: PVC finalizer prevents deletion while pod still using it.
x??

---

#### OwnerReferences and Garbage Collection
OwnerReferences create parent-child relationships. Garbage collector automatically deletes orphaned children.

```go
// ReplicaSet creates Pods with ownerReference
pod := &corev1.Pod{
    ObjectMeta: metav1.ObjectMeta{
        Name: "my-pod-abc123",
        OwnerReferences: []metav1.OwnerReference{{
            APIVersion:         "apps/v1",
            Kind:              "ReplicaSet",
            Name:              "my-replicaset",
            UID:               replicaSet.UID,
            Controller:        pointer.Bool(true),
            BlockOwnerDeletion: pointer.Bool(true),
        }},
    },
}

// Garbage collector logic
func (gc *GarbageCollector) processItem(item interface{}) {
    node := item.(*node)

    // Check if all owners exist
    for _, owner := range node.owners {
        if !gc.exists(owner) {
            // Owner deleted - delete this object
            gc.deleteObject(node)
            return
        }
    }
}

// Deletion propagation policies
// Orphan: Delete parent, leave children (remove ownerRef)
// Background: Delete parent immediately, GC deletes children async
// Foreground: Delete children first, then parent (uses finalizer)

clientset.Delete(name, &metav1.DeleteOptions{
    PropagationPolicy: &foreground,  // or background, orphan
})
```
:p What are OwnerReferences and how does garbage collection use them?
??x
OwnerReferences link child resources to parent owners. Garbage collector watches for deleted owners and removes orphaned children.

Fields:
- APIVersion, Kind, Name, UID: Identify owner
- Controller: true = this is the controller (only one)
- BlockOwnerDeletion: prevent owner deletion while child exists

Propagation policies:
- Orphan: Remove ownerRef, keep children
- Background: Delete owner, GC deletes children async
- Foreground: Delete children first (finalizer), then owner

Example: Delete ReplicaSet → automatically deletes its Pods (unless orphan policy).
x??

---

#### Informer Resync Mechanism
Resync periodically invokes Update handlers with cached objects, even without changes. Enables periodic reconciliation without constant list operations.

```go
// Resync every 30 seconds
factory := informers.NewSharedInformerFactoryWithOptions(
    clientset,
    30*time.Second,  // Resync period
)

podInformer := factory.Core().V1().Pods().Informer()
podInformer.AddEventHandler(cache.ResourceEventHandlerFuncs{
    AddFunc: func(obj interface{}) {
        // Real add event
    },
    UpdateFunc: func(oldObj, newObj interface{}) {
        // Could be real update OR resync
        // Check resourceVersion to distinguish
        old := oldObj.(*corev1.Pod)
        new := newObj.(*corev1.Pod)

        if old.ResourceVersion == new.ResourceVersion {
            // Resync - same object, no actual change
            // Still opportunity to reconcile
        } else {
            // Real update
        }
    },
})

// Why resync?
// 1. Recover from missed events
// 2. Periodic reconciliation without extra list calls
// 3. Fix inconsistencies between desired and actual state
// 4. Cheaper than constant re-listing
```
:p What is informer resync and why is it useful?
??x
Resync periodically calls Update handlers for all cached objects, even without actual changes.

Purpose:
1. Periodic reconciliation (catch drift)
2. Recover from missed watch events
3. No extra API calls (uses cache)
4. Ensures eventual consistency

Detection: oldObj.ResourceVersion == newObj.ResourceVersion means resync.

Typical period: 30s-10m. Set to 0 to disable.

Controllers reconcile periodically without explicitly listing all resources from API server.
x??

---

#### API Server Request Flow Optimization
API server optimizes reads with resourceVersion semantics and watch bookmarks to reduce etcd load.

```go
// List with resourceVersion semantics
listOptions := metav1.ListOptions{
    ResourceVersion:      "",     // Most recent (from etcd)
    ResourceVersionMatch: metav1.ResourceVersionMatchNotOlderThan,
}
pods, err := clientset.CoreV1().Pods("default").List(ctx, listOptions)

// ResourceVersion semantics:
// "" = most recent from etcd (default)
// "0" = any cached version (may be stale, from cache)
// "123" = exact version (for consistent reads)

// Watch with resourceVersion
watcher, err := clientset.CoreV1().Pods("default").Watch(ctx, metav1.ListOptions{
    ResourceVersion: pods.ResourceVersion,  // Start from list version
})

// Watch bookmarks - periodic markers without data
for event := range watcher.ResultChan() {
    if event.Type == watch.Bookmark {
        // Update resourceVersion without actual event
        rv = event.Object.(*corev1.Pod).ResourceVersion
        continue
    }
    // Process actual events
}

// API server cache layers:
// 1. Watchcache: Recent objects in memory
// 2. etcd: Source of truth
// List with rv="0" → served from watchcache (fast)
// List with rv="" → served from etcd (slow but current)
```
:p How does resourceVersion optimize API server reads?
??x
ResourceVersion controls read consistency and enables serving from cache vs etcd.

Values:
- "": Latest from etcd (consistent, slow)
- "0": Any cached version (fast, may be stale)
- "123": Exact version (consistent reads)

Watch bookmarks: Periodic events with updated resourceVersion but no data, enabling watch resume without re-listing.

Optimization: Use rv="0" for eventual consistency reads (served from watchcache), rv="" for strong consistency (etcd read).

Informers use watchcache, reducing etcd load.
x??

---

#### Storage Version and Migration
API server stores objects in a single version internally. Conversion happens at API boundaries. Storage version can be changed.

```go
// API server storage config
type StorageConfig struct {
    Type:          "etcd3"
    StorageVersion: "apps/v1"  // Store Deployments as v1
}

// Request flow with conversion
// 1. Client sends apps/v1beta1 Deployment
// 2. API server converts v1beta1 → internal version
// 3. API server converts internal → v1 (storage version)
// 4. Store v1 in etcd

// Reading with different version
// 1. Client requests apps/v1beta2 Deployment
// 2. API server reads v1 from etcd
// 3. Converts v1 → internal
// 4. Converts internal → v1beta2
// 5. Returns v1beta2 to client

// Storage migration (when changing storage version)
func migrateStorage(clientset kubernetes.Interface) {
    // 1. List all objects in old version
    deployments := clientset.AppsV1beta1().Deployments("").List()

    // 2. Read and write back (triggers conversion to new storage version)
    for _, d := range deployments {
        d2, _ := clientset.AppsV1().Deployments(d.Namespace).Get(d.Name)
        clientset.AppsV1().Deployments(d.Namespace).Update(d2)
    }
}
```
:p How does API server handle multiple API versions with one storage version?
??x
API server stores objects in one canonical version (storage version) but accepts/returns multiple versions via conversion.

Flow:
1. Request version → internal version (decode)
2. Internal → storage version (convert)
3. Store in etcd
4. Read from etcd (storage version)
5. Storage → internal (convert)
6. Internal → requested version (encode)

Conversion functions translate between versions. Internal version has all fields from all versions.

Changing storage version requires migration: read all objects and write back to trigger conversion.
x??

---

#### Custom Resource Definitions (CRD) Internals
CRDs extend Kubernetes API with custom resources. API server dynamically serves CRDs without restarts.

```go
// Define CRD
crd := &apiextensionsv1.CustomResourceDefinition{
    ObjectMeta: metav1.ObjectMeta{
        Name: "databases.example.com",
    },
    Spec: apiextensionsv1.CustomResourceDefinitionSpec{
        Group: "example.com",
        Names: apiextensionsv1.CustomResourceDefinitionNames{
            Plural:   "databases",
            Singular: "database",
            Kind:     "Database",
        },
        Scope: apiextensionsv1.NamespaceScoped,
        Versions: []apiextensionsv1.CustomResourceDefinitionVersion{{
            Name:    "v1",
            Served:  true,
            Storage: true,
            Schema: &apiextensionsv1.CustomResourceValidation{
                OpenAPIV3Schema: &apiextensionsv1.JSONSchemaProps{
                    Type: "object",
                    Properties: map[string]apiextensionsv1.JSONSchemaProps{
                        "spec": {
                            Type: "object",
                            Properties: map[string]apiextensionsv1.JSONSchemaProps{
                                "size": {Type: "integer"},
                            },
                        },
                    },
                },
            },
        }},
    },
}

// API server creates endpoints:
// GET /apis/example.com/v1/namespaces/{ns}/databases
// POST /apis/example.com/v1/namespaces/{ns}/databases
// etc.

// Stored in etcd at:
// /registry/example.com/databases/{namespace}/{name}
```
:p How do CRDs dynamically extend the Kubernetes API?
??x
CRDs are resources that define new resource types. API server watches CRDs and dynamically creates REST endpoints.

Process:
1. Create CRD resource
2. API server validates CRD
3. API server creates REST handlers for new type
4. New endpoints available (no restart)
5. Custom resources stored in etcd

CRD defines:
- Group, version, kind
- Schema (OpenAPI v3)
- Validation rules
- Scope (namespaced/cluster)

Controller watches CRD instances and implements business logic. API server only provides CRUD operations.
x??

---

#### Validating vs Mutating Webhooks
Admission webhooks call external services to validate or modify resources. Run in specific order.

```go
// Webhook flow: Mutating → Validating

// Mutating webhook - can modify object
type MutatingWebhook struct{}

func (w *MutatingWebhook) Handle(req admission.Request) admission.Response {
    pod := &corev1.Pod{}
    json.Unmarshal(req.Object.Raw, pod)

    // Inject sidecar container
    pod.Spec.Containers = append(pod.Spec.Containers, corev1.Container{
        Name:  "sidecar",
        Image: "envoy:latest",
    })

    // Return modified pod
    marshaledPod, _ := json.Marshal(pod)
    return admission.PatchResponseFromRaw(req.Object.Raw, marshaledPod)
}

// Validating webhook - can only accept/reject
type ValidatingWebhook struct{}

func (w *ValidatingWebhook) Handle(req admission.Request) admission.Response {
    pod := &corev1.Pod{}
    json.Unmarshal(req.Object.Raw, pod)

    // Check policy
    for _, c := range pod.Spec.Containers {
        if c.SecurityContext.Privileged {
            return admission.Denied("privileged containers not allowed")
        }
    }

    return admission.Allowed("")
}

// Full admission flow:
// 1. Authentication
// 2. Authorization
// 3. Mutating webhooks (in order, can chain modifications)
// 4. Object schema validation
// 5. Validating webhooks (parallel, all must pass)
// 6. Persist to etcd
```
:p What's the difference between mutating and validating admission webhooks?
??x
Mutating webhooks modify objects, validating webhooks accept or reject them.

Execution order:
1. Mutating webhooks (sequential, can chain)
2. Schema validation
3. Validating webhooks (parallel)

Mutating:
- Can change object via JSON patch
- Run before validation
- Example: Inject sidecars, set defaults

Validating:
- Can only allow/deny
- Run after all mutations
- Example: Enforce policies, check compliance

Both are HTTPS calls to external services. Failures can block requests (fail-closed) or allow (fail-open).
x??

---

#### Node Heartbeat and Lease
Nodes send heartbeats via Lease resources. More efficient than updating Node status constantly.

```go
// Kubelet heartbeat via Lease
func (kl *Kubelet) updateLease(ctx context.Context) {
    lease := &coordinationv1.Lease{
        ObjectMeta: metav1.ObjectMeta{
            Name:      kl.nodeName,
            Namespace: "kube-node-lease",
        },
        Spec: coordinationv1.LeaseSpec{
            HolderIdentity: pointer.String(kl.nodeName),
            RenewTime:      &metav1.MicroTime{Time: time.Now()},
        },
    }

    // Update every 10 seconds
    kl.client.CoordinationV1().Leases("kube-node-lease").Update(ctx, lease)
}

// Node controller checks leases
func (nc *NodeController) monitorNodeHealth() {
    for _, node := range nc.nodes {
        lease, err := nc.client.CoordinationV1().
            Leases("kube-node-lease").
            Get(ctx, node.Name, metav1.GetOptions{})

        if time.Since(lease.Spec.RenewTime.Time) > nodeMonitorGracePeriod {
            // Node hasn't updated lease - mark NotReady
            nc.markNodeNotReady(node)
        }
    }
}

// Lease vs Node Status updates:
// Lease: Small object, frequent updates (10s), low overhead
// Node Status: Large object, less frequent (5m), more overhead
// Lease provides fast failure detection without constant Node updates
```
:p How do Node Leases improve heartbeat efficiency?
??x
Node Leases are lightweight objects in kube-node-lease namespace that kubelet updates frequently for heartbeats.

Before Leases:
- Kubelet updated Node.Status every 10s
- Node object is large (conditions, capacity, etc)
- High API server/etcd load

With Leases:
- Kubelet updates small Lease object every 10s
- Node.Status updated less frequently (~1m)
- Much lower overhead

Node controller monitors Lease.Spec.RenewTime. If stale, marks node NotReady.

Result: Fast failure detection with minimal resource usage.
x??

---

#### Controller Metrics and Observability
Controllers expose Prometheus metrics for monitoring reconciliation performance and queue depth.

```go
import "github.com/prometheus/client_golang/prometheus"

// Define metrics
var (
    reconcileCount = prometheus.NewCounterVec(
        prometheus.CounterOpts{
            Name: "controller_reconcile_total",
            Help: "Total reconciliations",
        },
        []string{"controller", "result"},
    )

    reconcileDuration = prometheus.NewHistogramVec(
        prometheus.HistogramOpts{
            Name:    "controller_reconcile_duration_seconds",
            Help:    "Reconciliation duration",
            Buckets: prometheus.ExponentialBuckets(0.001, 2, 10),
        },
        []string{"controller"},
    )

    queueDepth = prometheus.NewGaugeVec(
        prometheus.GaugeOpts{
            Name: "workqueue_depth",
            Help: "Current depth of workqueue",
        },
        []string{"name"},
    )
)

func (c *Controller) syncHandler(key string) error {
    startTime := time.Now()
    defer func() {
        reconcileDuration.WithLabelValues(c.name).Observe(
            time.Since(startTime).Seconds())
    }()

    err := c.reconcile(key)

    result := "success"
    if err != nil {
        result = "error"
    }
    reconcileCount.WithLabelValues(c.name, result).Inc()

    return err
}

// Monitor queue
go wait.Until(func() {
    queueDepth.WithLabelValues(c.name).Set(float64(c.queue.Len()))
}, 1*time.Second, stopCh)
```
:p What key metrics should Kubernetes controllers expose?
??x
Controllers expose Prometheus metrics for observability:

Essential metrics:
1. **reconcile_total**: Counter of reconciliations (by result: success/error)
2. **reconcile_duration_seconds**: Histogram of reconciliation time
3. **workqueue_depth**: Current queue size
4. **workqueue_adds_total**: Items added to queue
5. **workqueue_retries_total**: Requeue count

Use cases:
- High duration → slow reconciliation
- Growing queue → controller can't keep up
- High retries → persistent failures

Buckets for duration: exponential (0.001, 0.002, 0.004, ...) to capture both fast and slow reconciliations.
x??

---

#### Field Selectors vs Label Selectors
Both filter resources, but field selectors query by spec/status fields while label selectors query metadata.

```go
// Label selector - queries metadata.labels
pods, err := clientset.CoreV1().Pods("default").List(ctx, metav1.ListOptions{
    LabelSelector: "app=nginx,env=prod",  // AND semantics
})

// Field selector - queries spec/status fields
pods, err := clientset.CoreV1().Pods("default").List(ctx, metav1.ListOptions{
    FieldSelector: "spec.nodeName=node-1,status.phase=Running",
})

// Implementation difference:
// Labels: Indexed in etcd, efficient for any label
// Fields: Only specific fields indexed (nodeName, phase)

// Supported field selectors are limited per resource type
// Check with: kubectl explain pod --recursive | grep -A5 fieldSelectors

// Combining both
pods, err := clientset.CoreV1().Pods("default").List(ctx, metav1.ListOptions{
    LabelSelector: "app=nginx",
    FieldSelector: "status.phase=Running",
})

// Field selectors are more efficient for well-indexed fields
// Example: Finding all pods on a node
// Good: FieldSelector("spec.nodeName=node-1")
// Bad: List all pods + client-side filter
```
:p What's the difference between field selectors and label selectors?
??x
Label selectors filter by metadata.labels, field selectors filter by spec/status fields.

Label selectors:
- Any label can be used
- All labels indexed
- Arbitrary user-defined keys
- Example: "app=nginx,tier!=frontend"

Field selectors:
- Only specific fields supported
- Limited fields indexed
- Predefined by resource type
- Example: "spec.nodeName=node-1"

Common field selectors:
- metadata.name
- metadata.namespace
- spec.nodeName (pods)
- status.phase (pods)

Use field selectors for indexed fields (efficient), labels for custom categorization.
x??

---
