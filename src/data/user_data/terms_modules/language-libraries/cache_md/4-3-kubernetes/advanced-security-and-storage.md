# Advanced Security and Storage Flashcards

#### Authentication Chain
API server supports multiple authentication methods in a chain. First successful authenticator wins.

```go
// Authentication chain
type authenticator struct {
    handlers []Authenticator
}

func (a *authenticator) AuthenticateRequest(req *http.Request) (*user.Info, bool, error) {
    // Try each authenticator in order
    for _, handler := range a.handlers {
        user, ok, err := handler.AuthenticateRequest(req)
        if err != nil {
            return nil, false, err
        }
        if ok {
            // First success wins
            return user, true, nil
        }
    }
    return nil, false, nil
}

// Common authenticators
var authChain = []Authenticator{
    // 1. X509 client certificates
    x509.New(opts.ClientCAFile),

    // 2. Bearer tokens (ServiceAccount tokens)
    bearertoken.New(tokenAuthenticator),

    // 3. Bootstrap tokens
    bootstraptoken.New(tokenAuthenticator),

    // 4. OIDC tokens (external IdP)
    oidc.New(oidc.Options{
        IssuerURL:     "https://accounts.google.com",
        ClientID:      "kubernetes",
        UsernameClaim: "email",
    }),

    // 5. Webhook token authentication
    webhook.New(webhookConfig),

    // 6. Request header authentication (for aggregated APIs)
    headerrequest.New(opts.RequestHeaderConfig),
}

// ServiceAccount token structure
type TokenReview struct {
    Spec TokenReviewSpec {
        Token string
    }
    Status TokenReviewStatus {
        Authenticated bool
        User UserInfo {
            Username string  // "system:serviceaccount:namespace:name"
            UID      string
            Groups   []string  // ["system:serviceaccounts", "system:serviceaccounts:namespace"]
        }
    }
}
```
:p How does Kubernetes authenticate requests and what methods are supported?
??x
API server uses an authentication chain. Authenticators are tried in order; first success wins.

Common authenticators:
1. **X509 certificates**: CN=username, O=groups
2. **ServiceAccount tokens**: JWT tokens for pods
3. **Bootstrap tokens**: For node joining
4. **OIDC**: External identity provider (Google, etc.)
5. **Webhook**: Call external auth service
6. **Request headers**: For API aggregation

User identity has:
- Username (string)
- UID (string)
- Groups ([]string)

ServiceAccount token username format: "system:serviceaccount:{namespace}:{name}"

Failed auth returns 401 Unauthorized.
x??

---

#### RBAC Authorization
Role-Based Access Control uses Roles and RoleBindings to grant permissions.

```go
// RBAC authorizer
type RBACAuthorizer struct {
    roleGetter        RoleGetter
    roleBindingGetter RoleBindingGetter
}

func (r *RBACAuthorizer) Authorize(attrs authorizer.Attributes) (authorizer.Decision, string, error) {
    user := attrs.GetUser()
    namespace := attrs.GetNamespace()

    // 1. Get all RoleBindings for this user
    roleBindings := r.getRoleBindingsForUser(user, namespace)

    // 2. For each binding, get the Role
    for _, binding := range roleBindings {
        role := r.getRole(binding.RoleRef)

        // 3. Check if role has required permission
        for _, rule := range role.Rules {
            if r.ruleAllows(rule, attrs) {
                return authorizer.DecisionAllow, "", nil
            }
        }
    }

    return authorizer.DecisionNoOpinion, "", nil
}

func (r *RBACAuthorizer) ruleAllows(rule PolicyRule, attrs Attributes) bool {
    // Check API group
    if !contains(rule.APIGroups, attrs.GetAPIGroup()) && !contains(rule.APIGroups, "*") {
        return false
    }

    // Check resource
    if !contains(rule.Resources, attrs.GetResource()) && !contains(rule.Resources, "*") {
        return false
    }

    // Check verb
    if !contains(rule.Verbs, attrs.GetVerb()) && !contains(rule.Verbs, "*") {
        return false
    }

    // Check resource name (optional)
    if len(rule.ResourceNames) > 0 && !contains(rule.ResourceNames, attrs.GetName()) {
        return false
    }

    return true
}

// Example: Grant pod read access
role := &rbacv1.Role{
    Rules: []rbacv1.PolicyRule{{
        APIGroups: []string{""},
        Resources: []string{"pods"},
        Verbs:     []string{"get", "list", "watch"},
    }},
}

roleBinding := &rbacv1.RoleBinding{
    Subjects: []rbacv1.Subject{{
        Kind:      "ServiceAccount",
        Name:      "my-sa",
        Namespace: "default",
    }},
    RoleRef: rbacv1.RoleRef{
        APIGroup: "rbac.authorization.k8s.io",
        Kind:     "Role",
        Name:     "pod-reader",
    },
}
```
:p How does RBAC determine if a user has permission for an operation?
??x
RBAC checks if user has a RoleBinding to a Role with a matching rule.

Process:
1. Find all RoleBindings where user is a Subject
2. For each binding, get referenced Role
3. Check if any Rule allows the operation

Rule matches if:
- APIGroup matches (or "*")
- Resource matches (or "*")
- Verb matches (or "*")
- ResourceName matches if specified

Role vs ClusterRole:
- Role: Namespaced resources
- ClusterRole: Cluster or all namespace resources

Decision: Allow (granted), NoOpinion (no rule), or Deny (explicit denial).

Multiple authorizers can run; any Allow grants access.
x??

---

#### Admission Control Ordering
Admission controllers run in phases: mutating, then schema validation, then validating.

```go
// Admission chain
func (a *admissionChain) Admit(attrs Attributes, o ObjectInterfaces) error {
    // Phase 1: Mutating admission
    for _, plugin := range a.mutatingPlugins {
        if err := plugin.Admit(attrs, o); err != nil {
            return err  // Reject request
        }
        // Plugin may have modified attrs.Object
    }

    // Phase 2: Schema validation
    if err := a.validator.Validate(attrs.Object); err != nil {
        return err
    }

    // Phase 3: Validating admission
    for _, plugin := range a.validatingPlugins {
        if err := plugin.Validate(attrs, o); err != nil {
            return err  // Reject request
        }
    }

    return nil
}

// Built-in admission controllers (subset)
var admissionPlugins = []admission.Interface{
    // Mutating:
    &NamespaceLifecycle{},      // Reject ops on terminating namespaces
    &ServiceAccount{},          // Auto-assign SA if not specified
    &DefaultStorageClass{},     // Set default storage class
    &MutatingAdmissionWebhook{}, // External webhooks

    // Validating:
    &ResourceQuota{},           // Enforce quotas
    &LimitRanger{},             // Enforce limits
    &PodSecurityPolicy{},       // Security policies (deprecated)
    &ValidatingAdmissionWebhook{}, // External webhooks
}

// Example: ServiceAccount admission (mutating)
func (s *ServiceAccount) Admit(attrs Attributes) error {
    if attrs.Resource != "pods" {
        return nil
    }

    pod := attrs.Object.(*corev1.Pod)

    // Auto-assign ServiceAccount if not set
    if pod.Spec.ServiceAccountName == "" {
        pod.Spec.ServiceAccountName = "default"
    }

    // Mount ServiceAccount token
    pod.Spec.Volumes = append(pod.Spec.Volumes, corev1.Volume{
        Name: "kube-api-access",
        VolumeSource: corev1.VolumeSource{
            Projected: &corev1.ProjectedVolumeSource{
                Sources: []corev1.VolumeProjection{
                    {ServiceAccountToken: &corev1.ServiceAccountTokenProjection{
                        Path: "token",
                    }},
                },
            },
        },
    })

    return nil
}
```
:p What is the execution order of admission controllers?
??x
Admission runs in strict order: Mutating → Schema Validation → Validating.

**Mutating phase:**
- Can modify objects
- Runs sequentially (order matters)
- Changes cascade to next plugin
- Built-in + webhooks

**Schema validation:**
- Validates against OpenAPI schema
- Ensures required fields present
- Checks types

**Validating phase:**
- Can only accept/reject
- Runs in parallel (order doesn't matter)
- Cannot modify
- Built-in + webhooks

**Important plugins:**
- NamespaceLifecycle: Prevents ops on terminating namespaces
- ServiceAccount: Auto-assigns SA, mounts token
- ResourceQuota: Enforces quotas
- PodSecurity: Enforces security standards

Any error fails the request. All must pass.
x??

---

#### etcd Watch and Caching
API server uses etcd watch with a watchcache for efficient List/Watch operations.

```go
// Watchcache architecture
type watchCache struct {
    sync.RWMutex
    store      cache.Indexer      // In-memory cache
    capacity   int                // Max cached items
    incoming   chan watchCacheEvent
    watchers   map[int]*cacheWatcher
}

// Initialize watchcache
func (w *watchCache) Run() {
    // Watch etcd
    etcdWatcher := w.etcdClient.Watch(ctx, w.key, clientv3.WithPrefix())

    for watchResp := range etcdWatcher {
        for _, event := range watchResp.Events {
            // Update cache
            switch event.Type {
            case mvccpb.PUT:
                obj := decode(event.Kv.Value)
                w.store.Update(obj)

                // Distribute to watchers
                w.incoming <- watchCacheEvent{
                    Type:   watch.Added,
                    Object: obj,
                    ResourceVersion: event.Kv.ModRevision,
                }

            case mvccpb.DELETE:
                obj := decode(event.PrevKv.Value)
                w.store.Delete(obj)

                w.incoming <- watchCacheEvent{
                    Type:   watch.Deleted,
                    Object: obj,
                }
            }
        }
    }
}

// Serve List from cache
func (w *watchCache) List(opts ListOptions) ([]runtime.Object, error) {
    w.RLock()
    defer w.RUnlock()

    if opts.ResourceVersion == "0" || opts.ResourceVersion == "" {
        // Serve from cache (no etcd call)
        return w.store.List(), nil
    }

    // Specific version - may need etcd
    return w.listFromEtcd(opts)
}

// Serve Watch from cache
func (w *watchCache) Watch(opts ListOptions) (watch.Interface, error) {
    // Create watcher at specific resourceVersion
    watcher := &cacheWatcher{
        input:   make(chan watchCacheEvent, 10),
        result:  make(chan watch.Event),
    }

    // Send all events since resourceVersion
    for _, event := range w.getEventsSince(opts.ResourceVersion) {
        watcher.input <- event
    }

    w.watchers[watcher.id] = watcher
    return watcher, nil
}
```
:p How does API server's watchcache improve performance?
??x
Watchcache maintains an in-memory copy of resources from etcd, serving List/Watch without hitting etcd.

Structure:
- One etcd watch per resource type
- In-memory cache (Indexer) of objects
- Sliding window of recent events
- Multiple client watchers fan out from single etcd watch

Benefits:
1. **List**: Served from memory (resourceVersion="0")
2. **Watch**: Events from cache, not etcd
3. **Reduced etcd load**: One watch vs many
4. **Consistent**: All clients see same order

ResourceVersion handling:
- "0": Latest from cache (fast)
- "": Latest from etcd (slow, consistent)
- "123": From cache if available, else etcd

Informers benefit most - thousands of watches → one etcd watch.
x??

---

#### Volume Snapshots
VolumeSnapshots capture point-in-time copy of volumes via CSI.

```go
// VolumeSnapshot resource
type VolumeSnapshot struct {
    Spec VolumeSnapshotSpec {
        Source VolumeSnapshotSource {
            PersistentVolumeClaimName *string  // PVC to snapshot
        }
        VolumeSnapshotClassName *string
    }
    Status VolumeSnapshotStatus {
        BoundVolumeSnapshotContentName *string
        ReadyToUse                     *bool
        CreationTime                   *metav1.Time
        RestoreSize                    *resource.Quantity
    }
}

// Snapshot controller
func (c *SnapshotController) syncSnapshot(snapshot *VolumeSnapshot) error {
    // 1. Validate PVC exists
    pvc := c.getPVC(snapshot.Spec.Source.PersistentVolumeClaimName)

    // 2. Create VolumeSnapshotContent (bound to CSI)
    content := &VolumeSnapshotContent{
        Spec: VolumeSnapshotContentSpec{
            VolumeSnapshotRef: snapshot,
            Source: VolumeSnapshotContentSource{
                VolumeHandle: pvc.Spec.VolumeName,
            },
            Driver: pvc.Spec.StorageClassName.Provisioner,
        },
    }
    c.createSnapshotContent(content)

    // 3. CSI driver creates snapshot
    csiSnapshot, err := c.csi.CreateSnapshot(ctx, &CreateSnapshotRequest{
        SourceVolumeId: content.Spec.Source.VolumeHandle,
        Name:           content.Name,
    })

    // 4. Update status
    snapshot.Status.BoundVolumeSnapshotContentName = &content.Name
    snapshot.Status.ReadyToUse = &csiSnapshot.ReadyToUse
    snapshot.Status.RestoreSize = &csiSnapshot.Size

    return nil
}

// Restore from snapshot
type PersistentVolumeClaim {
    Spec PersistentVolumeClaimSpec {
        DataSource *TypedLocalObjectReference {
            Kind: "VolumeSnapshot"
            Name: "my-snapshot"
        }
        Resources: ResourceRequirements {
            Requests: ResourceList {
                "storage": "10Gi"
            }
        }
    }
}

// Provisioner detects dataSource and restores
func (p *Provisioner) Provision(pvc *PVC) (*PV, error) {
    if pvc.Spec.DataSource != nil && pvc.Spec.DataSource.Kind == "VolumeSnapshot" {
        snapshot := p.getSnapshot(pvc.Spec.DataSource.Name)

        // Call CSI CreateVolume with snapshot source
        volume, err := p.csi.CreateVolume(ctx, &CreateVolumeRequest{
            Name:               pvc.Name,
            ContentSource:      &VolumeContentSource{
                Snapshot: &SnapshotSource{
                    SnapshotId: snapshot.Status.SnapshotHandle,
                },
            },
        })

        return volume, nil
    }
}
```
:p How do VolumeSnapshots work with CSI?
??x
VolumeSnapshots create point-in-time copies of PVCs via CSI driver.

Resources:
1. **VolumeSnapshot**: User-facing snapshot request
2. **VolumeSnapshotContent**: Bound to actual CSI snapshot

Process:
1. Create VolumeSnapshot referencing PVC
2. Controller creates VolumeSnapshotContent
3. CSI driver creates snapshot in storage system
4. Status.readyToUse=true when complete

Restore:
1. Create PVC with dataSource=VolumeSnapshot
2. Provisioner calls CSI with snapshot source
3. CSI driver restores volume from snapshot
4. PVC bound to restored volume

Use cases: Backup, clone volumes, test environments.

CSI methods: CreateSnapshot, DeleteSnapshot, CreateVolumeFromSnapshot.
x??

---

#### PodDisruptionBudget Enforcement
PDBs limit voluntary disruptions during maintenance operations.

```go
// PodDisruptionBudget
type PodDisruptionBudget struct {
    Spec PodDisruptionBudgetSpec {
        MinAvailable   *intstr.IntOrString  // e.g., "3" or "50%"
        MaxUnavailable *intstr.IntOrString
        Selector       *metav1.LabelSelector
    }
    Status PodDisruptionBudgetStatus {
        CurrentHealthy     int32
        DesiredHealthy     int32
        DisruptionsAllowed int32
        ExpectedPods       int32
    }
}

// Disruption controller
func (dc *DisruptionController) syncPDB(pdb *PodDisruptionBudget) error {
    // 1. Find pods matching selector
    pods := dc.podLister.List(pdb.Spec.Selector)
    expectedPods := len(pods)

    // 2. Count healthy pods
    healthyPods := 0
    for _, pod := range pods {
        if isPodHealthy(pod) {
            healthyPods++
        }
    }

    // 3. Calculate desired healthy
    var desiredHealthy int32
    if pdb.Spec.MinAvailable != nil {
        desiredHealthy = calculateIntOrPercent(*pdb.Spec.MinAvailable, expectedPods)
    } else {
        maxUnavailable := calculateIntOrPercent(*pdb.Spec.MaxUnavailable, expectedPods)
        desiredHealthy = expectedPods - maxUnavailable
    }

    // 4. Calculate allowed disruptions
    disruptionsAllowed := max(0, healthyPods-desiredHealthy)

    pdb.Status.CurrentHealthy = healthyPods
    pdb.Status.DesiredHealthy = desiredHealthy
    pdb.Status.DisruptionsAllowed = disruptionsAllowed
    pdb.Status.ExpectedPods = expectedPods

    return nil
}

// Eviction API checks PDB
func (s *Server) EvictPod(ctx, eviction *Eviction) error {
    pod := s.getPod(eviction.Name)

    // Find PDBs covering this pod
    pdbs := s.getPDBsForPod(pod)

    for _, pdb := range pdbs {
        if pdb.Status.DisruptionsAllowed <= 0 {
            return errors.New("cannot evict: disruption budget would be violated")
        }
    }

    // Allowed - delete pod
    s.deletePod(pod)
    return nil
}

// kubectl drain uses eviction API
kubectl drain node1  // Respects PDBs
```
:p How do PodDisruptionBudgets prevent too many pods from being disrupted?
??x
PDBs specify minimum availability during voluntary disruptions (drains, updates).

Spec options:
- **minAvailable**: Min healthy pods (int or %)
- **maxUnavailable**: Max unhealthy pods (int or %)

Controller calculates:
- CurrentHealthy: Healthy pods now
- DesiredHealthy: Based on minAvailable
- DisruptionsAllowed: CurrentHealthy - DesiredHealthy

Enforcement:
- Eviction API checks PDBs before evicting
- Returns error if disruption not allowed
- kubectl drain respects PDBs (waits or fails)

Voluntary vs Involuntary:
- Voluntary: drain, rolling update (PDB enforced)
- Involuntary: node failure, OOM (PDB ignored)

Use case: Ensure quorum during maintenance (e.g., 3/5 etcd members).
x??

---

#### Horizontal Pod Autoscaler Algorithm
HPA scales workloads based on metrics using a control loop.

```go
// HPA controller
func (hc *HPAController) computeReplicasForMetrics(hpa *HPA, currentReplicas int32) (int32, error) {
    var replicas int32

    for _, metric := range hpa.Spec.Metrics {
        switch metric.Type {
        case "Resource":
            // CPU/Memory utilization
            utilization := hc.getResourceUtilization(hpa, metric.Resource.Name)

            // Formula: desiredReplicas = ceil[currentReplicas * (currentMetric / targetMetric)]
            targetUtilization := metric.Resource.Target.AverageUtilization
            ratio := float64(utilization) / float64(targetUtilization)
            replicas = int32(math.Ceil(float64(currentReplicas) * ratio))

        case "Pods":
            // Custom metric per pod
            metricValue := hc.getCustomMetric(hpa, metric.Pods.Metric.Name)
            targetValue := metric.Pods.Target.AverageValue

            ratio := metricValue / targetValue
            replicas = int32(math.Ceil(float64(currentReplicas) * ratio))

        case "Object":
            // Metric from another object (e.g., queue depth)
            metricValue := hc.getObjectMetric(hpa, metric.Object)
            targetValue := metric.Object.Target.Value

            // Scale based on object metric
            ratio := metricValue / targetValue
            replicas = int32(math.Ceil(float64(currentReplicas) * ratio))
        }

        // Take maximum of all metrics
        if replicas > maxReplicas {
            maxReplicas = replicas
        }
    }

    // Apply bounds
    if maxReplicas < hpa.Spec.MinReplicas {
        maxReplicas = hpa.Spec.MinReplicas
    }
    if maxReplicas > hpa.Spec.MaxReplicas {
        maxReplicas = hpa.Spec.MaxReplicas
    }

    return maxReplicas, nil
}

// Stabilization window (prevent flapping)
func (hc *HPAController) stabilizeRecommendation(recommendations []int32) int32 {
    // For scale down: use highest recommendation in window
    // For scale up: use lowest recommendation in window
    // This prevents rapid oscillation
}

// Metrics from metrics-server or custom metrics API
type MetricsClient interface {
    GetResourceMetric(resource, namespace, selector) (PodMetricsList, error)
    GetCustomMetric(metricName, namespace, selector) (CustomMetricList, error)
    GetObjectMetric(metricName, namespace, objectRef) (int64, error)
}
```
:p How does HPA calculate desired replica count?
??x
HPA uses formula: desiredReplicas = ceil[currentReplicas × (currentMetric / targetMetric)]

Metric types:
1. **Resource**: CPU/memory utilization (from metrics-server)
2. **Pods**: Custom metric per pod (e.g., requests/sec)
3. **Object**: Metric from another object (e.g., queue depth)

Process:
1. Fetch metrics for all pods
2. Calculate average
3. Apply formula for each metric
4. Take max of all metric recommendations
5. Clamp to min/max replicas

Stabilization:
- Scale up: Immediate (lowest in window)
- Scale down: Delayed (highest in window, prevents flapping)

Sync interval: Every 15s (configurable).

Example: 50% CPU target, 80% current, 10 replicas → 10 × (80/50) = 16 replicas.
x??

---

#### Projected Volumes
Projected volumes combine multiple volume sources into a single directory.

```go
// Projected volume spec
type ProjectedVolumeSource struct {
    Sources []VolumeProjection
}

type VolumeProjection struct {
    Secret                   *SecretProjection
    ConfigMap                *ConfigMapProjection
    ServiceAccountToken      *ServiceAccountTokenProjection
    DownwardAPI              *DownwardAPIProjection
}

// Example: Combine SA token, ConfigMap, Secret
volumes:
- name: combined
  projected:
    sources:
    - serviceAccountToken:
        path: token
        expirationSeconds: 3600
        audience: api
    - configMap:
        name: my-config
        items:
        - key: config.yaml
          path: config/app.yaml
    - secret:
        name: my-secret
        items:
        - key: password
          path: secrets/db-password
    - downwardAPI:
        items:
        - path: labels
          fieldRef:
            fieldPath: metadata.labels

// Kubelet constructs projected volume
func (kl *Kubelet) makeProjectedVolume(pod *Pod, volume *Volume) error {
    volumePath := kl.getVolumePath(pod, volume.Name)

    for _, source := range volume.Projected.Sources {
        if source.Secret != nil {
            // Mount secret files
            secret := kl.getSecret(source.Secret.Name)
            for _, item := range source.Secret.Items {
                filePath := filepath.Join(volumePath, item.Path)
                writeFile(filePath, secret.Data[item.Key])
            }
        }

        if source.ConfigMap != nil {
            // Mount configmap files
            cm := kl.getConfigMap(source.ConfigMap.Name)
            for _, item := range source.ConfigMap.Items {
                filePath := filepath.Join(volumePath, item.Path)
                writeFile(filePath, cm.Data[item.Key])
            }
        }

        if source.ServiceAccountToken != nil {
            // Request token from TokenRequest API
            token := kl.tokenManager.GetToken(pod, source.ServiceAccountToken)
            filePath := filepath.Join(volumePath, source.ServiceAccountToken.Path)
            writeFile(filePath, token)
        }
    }

    return nil
}
```
:p What are projected volumes and why are they useful?
??x
Projected volumes combine multiple sources (Secret, ConfigMap, SA token, DownwardAPI) into one volume.

Sources:
1. **Secret**: Keys from Secret
2. **ConfigMap**: Keys from ConfigMap
3. **ServiceAccountToken**: Bound SA token with audience
4. **DownwardAPI**: Pod metadata (labels, annotations)

Benefits:
- Single mount point for related data
- Atomic updates (all sources updated together)
- Custom token audience/expiration
- Cleaner pod spec (fewer volumes)

Example structure:
```
/var/run/projected/
├── token (SA token)
├── config/app.yaml (ConfigMap)
├── secrets/password (Secret)
└── labels (DownwardAPI)
```

All files appear in same directory. Kubelet manages synchronization.
x??

---

#### Ephemeral Volumes
Ephemeral volumes are created/deleted with pods, not persisted separately.

```go
// Ephemeral volume types

// 1. emptyDir - shared scratch space
volumes:
- name: cache
  emptyDir:
    medium: Memory  // Optional: use tmpfs
    sizeLimit: 1Gi

// 2. Generic ephemeral volume - from CSI
volumes:
- name: scratch
  ephemeral:
    volumeClaimTemplate:
      spec:
        accessModes: ["ReadWriteOnce"]
        storageClassName: "fast"
        resources:
          requests:
            storage: 10Gi

// Kubelet implementation
func (kl *Kubelet) setupEphemeralVolume(pod *Pod, volume *Volume) error {
    if volume.EmptyDir != nil {
        // Create temp directory
        volumePath := filepath.Join(kl.getPodsDir(), pod.UID, volume.Name)

        if volume.EmptyDir.Medium == "Memory" {
            // Mount tmpfs
            mount("tmpfs", volumePath, "tmpfs", []string{"size=" + volume.EmptyDir.SizeLimit})
        } else {
            // Regular directory
            os.MkdirAll(volumePath, 0755)
        }
    }

    if volume.Ephemeral != nil {
        // Create PVC for this pod
        pvc := &PersistentVolumeClaim{
            ObjectMeta: metav1.ObjectMeta{
                Name: fmt.Sprintf("%s-%s", pod.Name, volume.Name),
                Namespace: pod.Namespace,
                OwnerReferences: []metav1.OwnerReference{{
                    APIVersion: "v1",
                    Kind:       "Pod",
                    Name:       pod.Name,
                    UID:        pod.UID,
                }},
            },
            Spec: volume.Ephemeral.VolumeClaimTemplate.Spec,
        }
        kl.createPVC(pvc)

        // Mount PVC like normal
        kl.mountPVC(pod, pvc)
    }

    return nil
}

// Cleanup
func (kl *Kubelet) cleanupPod(pod *Pod) {
    // emptyDir: Delete directory
    // ephemeral: PVC deleted via ownerReference (GC)
}
```
:p What are ephemeral volumes and when should they be used?
??x
Ephemeral volumes are created with the pod and deleted when pod is removed.

Types:

1. **emptyDir**:
   - Empty directory
   - Shared between containers
   - Optional: Memory-backed (tmpfs)
   - Use: Scratch space, cache

2. **Generic ephemeral**:
   - From CSI driver
   - PVC created automatically
   - Deleted with pod (ownerReference)
   - Use: Per-pod scratch from storage system

3. **ConfigMap/Secret**:
   - Technically ephemeral (pod-scoped)

Comparison to PVC:
- PVC: Persistent, outlives pod, manual lifecycle
- Ephemeral: Tied to pod, automatic cleanup

Use ephemeral for temporary data that doesn't need to persist beyond pod lifetime.

emptyDir is node-local; generic ephemeral can be network storage.
x??

---
