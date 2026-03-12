# Operator Patterns and Cloud Integration Flashcards

#### Operator Pattern with Controller Runtime
Operators extend Kubernetes with custom controllers. Controller-runtime simplifies building operators.

```go
import (
    ctrl "sigs.k8s.io/controller-runtime"
    "sigs.k8s.io/controller-runtime/pkg/client"
)

// Custom Resource
type Database struct {
    metav1.TypeMeta
    metav1.ObjectMeta
    Spec   DatabaseSpec
    Status DatabaseStatus
}

type DatabaseSpec struct {
    Size     int32
    Version  string
}

type DatabaseStatus struct {
    Phase      string
    ReadyNodes int32
}

// Reconciler implements the operator logic
type DatabaseReconciler struct {
    client.Client
    Scheme *runtime.Scheme
}

func (r *DatabaseReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
    // 1. Fetch the Database resource
    var database Database
    if err := r.Get(ctx, req.NamespacedName, &database); err != nil {
        return ctrl.Result{}, client.IgnoreNotFound(err)
    }

    // 2. Reconcile: Ensure actual state matches desired state
    desiredReplicas := database.Spec.Size

    // 3. Check if StatefulSet exists
    var sts appsv1.StatefulSet
    err := r.Get(ctx, types.NamespacedName{
        Name:      database.Name,
        Namespace: database.Namespace,
    }, &sts)

    if err != nil && errors.IsNotFound(err) {
        // Create StatefulSet
        sts = r.createStatefulSet(&database)
        if err := r.Create(ctx, &sts); err != nil {
            return ctrl.Result{}, err
        }
        return ctrl.Result{RequeueAfter: 10 * time.Second}, nil
    }

    // 4. Update if needed
    if sts.Spec.Replicas != &desiredReplicas {
        sts.Spec.Replicas = &desiredReplicas
        if err := r.Update(ctx, &sts); err != nil {
            return ctrl.Result{}, err
        }
    }

    // 5. Update status
    database.Status.ReadyNodes = sts.Status.ReadyReplicas
    if database.Status.ReadyNodes == desiredReplicas {
        database.Status.Phase = "Ready"
    } else {
        database.Status.Phase = "Provisioning"
    }
    r.Status().Update(ctx, &database)

    return ctrl.Result{}, nil
}

// Setup with manager
func (r *DatabaseReconciler) SetupWithManager(mgr ctrl.Manager) error {
    return ctrl.NewControllerManagedBy(mgr).
        For(&Database{}).              // Watch Database resources
        Owns(&appsv1.StatefulSet{}).   // Watch owned StatefulSets
        Complete(r)
}

func main() {
    mgr, _ := ctrl.NewManager(ctrl.GetConfigOrDie(), ctrl.Options{})

    (&DatabaseReconciler{
        Client: mgr.GetClient(),
        Scheme: mgr.GetScheme(),
    }).SetupWithManager(mgr)

    mgr.Start(ctrl.SetupSignalHandler())
}
```
:p What is the Operator pattern and how does controller-runtime implement it?
??x
Operators extend Kubernetes with domain-specific knowledge using CRDs + custom controllers.

Pattern:
1. Define CRD (e.g., Database)
2. User creates CR (e.g., Database instance)
3. Controller watches CR
4. Controller reconciles: creates/updates child resources
5. Controller updates CR status

Controller-runtime provides:
- **Manager**: Runs controllers, handles leader election
- **Client**: CRUD operations
- **Reconciler**: Core logic (Reconcile function)
- **Builder**: Declarative controller setup

Reconcile loop:
1. Fetch CR
2. Determine desired state (from CR.Spec)
3. Determine actual state (from cluster)
4. Take action to match
5. Update status
6. Return: success or requeue

Owns(): Automatically watches child resources for changes.
x??

---

#### Status Subresource Pattern
Status is a subresource to prevent spec/status conflicts and enable cleaner RBAC.

```go
// CRD with status subresource enabled
crd := &apiextensionsv1.CustomResourceDefinition{
    Spec: apiextensionsv1.CustomResourceDefinitionSpec{
        Versions: []apiextensionsv1.CustomResourceDefinitionVersion{{
            Name: "v1",
            Subresources: &apiextensionsv1.CustomResourceSubresources{
                Status: &apiextensionsv1.CustomResourceSubresourceStatus{},
            },
        }},
    },
}

// With status subresource
// Two separate endpoints:
// PUT  /apis/group/v1/namespaces/ns/resources/name        (updates spec only)
// PUT  /apis/group/v1/namespaces/ns/resources/name/status (updates status only)

// Controller updates status separately
func (r *Reconciler) Reconcile(ctx, req) (ctrl.Result, error) {
    var obj MyResource
    r.Get(ctx, req.NamespacedName, &obj)

    // Reconcile logic...

    // Update status (separate write)
    obj.Status.Phase = "Ready"
    obj.Status.ObservedGeneration = obj.Generation
    r.Status().Update(ctx, &obj)  // Uses /status endpoint

    return ctrl.Result{}, nil
}

// Benefits of status subresource:

// 1. Prevent race conditions
// Without subresource:
//   User updates spec → resourceVersion++
//   Controller updates status → conflict (stale resourceVersion)
// With subresource:
//   Spec and status have independent resourceVersions

// 2. RBAC separation
role:
  rules:
  - apiGroups: ["mygroup"]
    resources: ["mydatabases"]
    verbs: ["get", "list", "create", "update"]  # Users can update spec
  - apiGroups: ["mygroup"]
    resources: ["mydatabases/status"]
    verbs: ["get"]  # Users can only read status (controllers write)

// 3. ObservedGeneration pattern
type MyResourceStatus struct {
    ObservedGeneration int64   // Last generation reconciled
    Conditions         []Condition
}

func isUpToDate(obj *MyResource) bool {
    return obj.Status.ObservedGeneration == obj.Generation
}
```
:p Why use status subresource and what benefits does it provide?
??x
Status subresource makes status a separate endpoint from spec, preventing conflicts.

Benefits:

1. **No race conditions**:
   - Spec updates don't conflict with status updates
   - Different resourceVersions

2. **RBAC separation**:
   - Users can update spec
   - Only controllers update status
   - resource/status permissions independent

3. **ObservedGeneration tracking**:
   - metadata.generation increments on spec change
   - status.observedGeneration = last reconciled generation
   - Detect if reconciliation is current

Without subresource:
- PUT /resource updates both spec and status
- Conflicts between user and controller updates

With subresource:
- PUT /resource updates only spec
- PUT /resource/status updates only status

Always enable status subresource for CRDs.
x??

---

#### Cloud Controller Manager
CCM separates cloud-specific logic from core Kubernetes components.

```go
// Cloud provider interface
type Interface interface {
    Initialize(clientBuilder controller.ControllerClientBuilder)
    LoadBalancer() (LoadBalancer, bool)
    Instances() (Instances, bool)
    Zones() (Zones, bool)
    Routes() (Routes, bool)
}

// LoadBalancer interface
type LoadBalancer interface {
    GetLoadBalancer(clusterName, service) (*LoadBalancerStatus, bool, error)
    EnsureLoadBalancer(clusterName, service, nodes) (*LoadBalancerStatus, error)
    UpdateLoadBalancer(clusterName, service, nodes) error
    EnsureLoadBalancerDeleted(clusterName, service) error
}

// Example: AWS implementation
type AWSCloud struct {
    elb *elb.ELB
    ec2 *ec2.EC2
}

func (c *AWSCloud) EnsureLoadBalancer(clusterName string, svc *v1.Service, nodes []*v1.Node) (*v1.LoadBalancerStatus, error) {
    // 1. Build ELB name from service
    lbName := getLoadBalancerName(svc)

    // 2. Check if ELB exists
    lb, err := c.elb.DescribeLoadBalancers(&elb.DescribeLoadBalancersInput{
        LoadBalancerNames: []*string{&lbName},
    })

    if err != nil {
        // 3. Create ELB
        _, err = c.elb.CreateLoadBalancer(&elb.CreateLoadBalancerInput{
            LoadBalancerName: &lbName,
            Listeners: buildListeners(svc),
            Subnets: getSubnets(svc),
            SecurityGroups: getSecurityGroups(svc),
        })
    }

    // 4. Register instances (nodes)
    instances := []*elb.Instance{}
    for _, node := range nodes {
        instanceID := getInstanceID(node)
        instances = append(instances, &elb.Instance{InstanceId: &instanceID})
    }

    c.elb.RegisterInstancesWithLoadBalancer(&elb.RegisterInstancesWithLoadBalancerInput{
        LoadBalancerName: &lbName,
        Instances:        instances,
    })

    // 5. Return LB status
    return &v1.LoadBalancerStatus{
        Ingress: []v1.LoadBalancerIngress{{
            Hostname: *lb.DNSName,
        }},
    }, nil
}

// CCM runs cloud-specific controllers
func main() {
    cloudProvider := getCloudProvider()

    // Node controller: Updates node addresses, labels
    nodeController := newNodeController(cloudProvider)

    // Service controller: Manages load balancers
    serviceController := newServiceController(cloudProvider)

    // Route controller: Creates routes for pod CIDR
    routeController := newRouteController(cloudProvider)

    // Run controllers
    go nodeController.Run()
    go serviceController.Run()
    go routeController.Run()
}
```
:p What is Cloud Controller Manager and what does it do?
??x
CCM runs cloud-provider-specific controllers, separating cloud logic from core Kubernetes.

Controllers:

1. **Node controller**:
   - Initializes nodes with cloud metadata
   - Monitors node health via cloud API
   - Deletes nodes removed from cloud

2. **Service controller**:
   - Creates/updates cloud load balancers for LoadBalancer services
   - Updates Service.status.loadBalancer

3. **Route controller**:
   - Creates routes in cloud network for pod CIDRs
   - Enables pod-to-pod networking across nodes

Cloud provider implements interfaces:
- LoadBalancer: ELB, ALB, GCP LB, Azure LB
- Instances: Node lifecycle, metadata
- Routes: VPC routes

Before CCM: Cloud code in kube-controller-manager (tightly coupled).
After CCM: Cloud code separate (easier to develop/maintain).
x??

---

#### Finalizer Patterns for Cleanup
Finalizers ensure proper cleanup before resource deletion. Common pattern for operators.

```go
const finalizerName = "database.example.com/cleanup"

func (r *DatabaseReconciler) Reconcile(ctx, req) (ctrl.Result, error) {
    var db Database
    if err := r.Get(ctx, req.NamespacedName, &db); err != nil {
        return ctrl.Result{}, client.IgnoreNotFound(err)
    }

    // Check if being deleted
    if !db.DeletionTimestamp.IsZero() {
        // Deletion in progress
        if containsFinalizer(db.Finalizers, finalizerName) {
            // Perform cleanup
            if err := r.cleanupDatabase(&db); err != nil {
                // Cleanup failed - retry
                return ctrl.Result{}, err
            }

            // Remove finalizer
            db.Finalizers = removeFinalizer(db.Finalizers, finalizerName)
            if err := r.Update(ctx, &db); err != nil {
                return ctrl.Result{}, err
            }
        }
        // Object will be deleted by API server
        return ctrl.Result{}, nil
    }

    // Add finalizer if not present
    if !containsFinalizer(db.Finalizers, finalizerName) {
        db.Finalizers = append(db.Finalizers, finalizerName)
        if err := r.Update(ctx, &db); err != nil {
            return ctrl.Result{}, err
        }
    }

    // Normal reconciliation
    return r.reconcileDatabase(ctx, &db)
}

func (r *DatabaseReconciler) cleanupDatabase(db *Database) error {
    // External cleanup (cloud resources, etc.)
    // 1. Delete cloud database instance
    if err := r.cloudProvider.DeleteDatabase(db.Name); err != nil {
        return err
    }

    // 2. Delete secrets
    secret := &corev1.Secret{
        ObjectMeta: metav1.ObjectMeta{
            Name:      db.Name + "-credentials",
            Namespace: db.Namespace,
        },
    }
    r.Delete(ctx, secret)

    // 3. Deregister from external registry
    r.registryClient.Deregister(db.Name)

    return nil
}

// Multiple finalizers example
metadata:
  finalizers:
  - database.example.com/cleanup
  - backup.example.com/snapshot
  - monitoring.example.com/alerts

// Each controller removes its finalizer after cleanup
// Object deleted only when finalizers=[]
```
:p How do finalizers enable proper cleanup in operators?
??x
Finalizers block deletion until cleanup completes. Controller removes finalizer after cleanup.

Pattern:
1. Add finalizer on creation
2. User deletes resource (deletionTimestamp set)
3. Controller detects deletion
4. Controller performs cleanup
5. Controller removes finalizer
6. API server deletes object

Cleanup tasks:
- Delete external resources (cloud, databases)
- Cleanup dependent resources
- Deregister from external systems
- Create backups

Multiple finalizers:
- Each controller has unique finalizer
- All must be removed before deletion
- Allows multiple cleanup handlers

Key: Update fails if resource doesn't exist, use client.IgnoreNotFound().

Without finalizers: Resource deleted immediately, no cleanup opportunity.
x??

---

#### Webhook Certificate Management
Admission webhooks require TLS certificates. Operators often manage these with cert-manager.

```go
// Webhook configuration
type MutatingWebhookConfiguration struct {
    Webhooks []MutatingWebhook {
        {
            Name: "database.example.com",
            ClientConfig: WebhookClientConfig {
                Service: &ServiceReference {
                    Name:      "database-webhook",
                    Namespace: "database-system",
                    Path:      "/mutate",
                },
                CABundle: []byte("base64-encoded-ca-cert"),
            },
        },
    },
}

// Webhook server
import "sigs.k8s.io/controller-runtime/pkg/webhook"

func setupWebhook(mgr ctrl.Manager) {
    server := mgr.GetWebhookServer()

    // Register handlers
    server.Register("/mutate", &webhook.Admission{
        Handler: &DatabaseDefaulter{},
    })

    server.Register("/validate", &webhook.Admission{
        Handler: &DatabaseValidator{},
    })
}

// Certificate management with cert-manager
type Certificate struct {
    Spec CertificateSpec {
        SecretName: "webhook-server-cert",
        IssuerRef: ObjectReference {
            Name: "selfsigned-issuer",
            Kind: "Issuer",
        },
        DNSNames: []string {
            "database-webhook.database-system.svc",
            "database-webhook.database-system.svc.cluster.local",
        },
    },
}

// Bootstrap: Operator creates Certificate resource
func (r *Reconciler) ensureCertificate() error {
    cert := &certv1.Certificate{
        ObjectMeta: metav1.ObjectMeta{
            Name:      "webhook-cert",
            Namespace: "database-system",
        },
        Spec: certv1.CertificateSpec{
            SecretName: "webhook-server-cert",
            DNSNames:   []string{"database-webhook.database-system.svc"},
            IssuerRef: certv1.ObjectReference{
                Name: "selfsigned-issuer",
            },
        },
    }
    return r.Create(ctx, cert)
}

// Inject CA bundle into webhook configuration
func (r *Reconciler) injectCABundle() error {
    // Get CA from certificate secret
    secret := &corev1.Secret{}
    r.Get(ctx, types.NamespacedName{
        Name:      "webhook-server-cert",
        Namespace: "database-system",
    }, secret)

    caBundle := secret.Data["ca.crt"]

    // Update webhook configuration
    var webhookConfig admissionv1.MutatingWebhookConfiguration
    r.Get(ctx, types.NamespacedName{Name: "database-webhook"}, &webhookConfig)

    for i := range webhookConfig.Webhooks {
        webhookConfig.Webhooks[i].ClientConfig.CABundle = caBundle
    }

    r.Update(ctx, &webhookConfig)
    return nil
}
```
:p How do operators manage webhook TLS certificates?
??x
Webhooks require TLS. Common solutions: cert-manager or self-signed certs.

Requirements:
- Certificate for webhook server
- CA bundle in WebhookConfiguration
- Certificate SAN matches service DNS

With cert-manager:
1. Create Issuer/ClusterIssuer (CA or self-signed)
2. Create Certificate resource
3. cert-manager creates Secret with cert
4. Webhook server loads cert from Secret
5. Inject CA bundle into WebhookConfiguration

Alternative: Generate self-signed on startup
```go
cert, key := generateSelfSignedCert()
saveToSecret(cert, key)
injectCABundle(cert)
```

Certificate rotation:
- cert-manager auto-renews
- Webhook server watches Secret, reloads

DNS names: {service}.{namespace}.svc, {service}.{namespace}.svc.cluster.local

Without proper certs: Webhook calls fail, blocking all matching requests.
x??

---

#### Owner References and Cascade Delete
OwnerReferences create parent-child relationships for automatic cleanup.

```go
// Set owner reference
func (r *Reconciler) createChildResource(parent *Database) error {
    statefulSet := &appsv1.StatefulSet{
        ObjectMeta: metav1.ObjectMeta{
            Name:      parent.Name,
            Namespace: parent.Namespace,
            OwnerReferences: []metav1.OwnerReference{{
                APIVersion:         parent.APIVersion,
                Kind:              parent.Kind,
                Name:              parent.Name,
                UID:               parent.UID,
                Controller:        pointer.Bool(true),
                BlockOwnerDeletion: pointer.Bool(true),
            }},
        },
        Spec: appsv1.StatefulSetSpec{...},
    }

    return r.Create(ctx, statefulSet)
}

// controller-runtime helper
import ctrl "sigs.k8s.io/controller-runtime"

func (r *Reconciler) createWithOwner(parent, child client.Object) error {
    if err := ctrl.SetControllerReference(parent, child, r.Scheme); err != nil {
        return err
    }
    return r.Create(ctx, child)
}

// Garbage collector behavior
// Parent deleted → children with ownerReference automatically deleted

// Propagation policies:
// 1. Foreground (default for kubectl)
deleteoptions := &metav1.DeleteOptions{
    PropagationPolicy: &foregroundDeletion,
}
// Process: Block parent deletion → Delete children → Delete parent after children gone

// 2. Background
deleteoptions := &metav1.DeleteOptions{
    PropagationPolicy: &backgroundDeletion,
}
// Process: Delete parent immediately → GC deletes children async

// 3. Orphan
deleteoptions := &metav1.DeleteOptions{
    PropagationPolicy: &orphanDeletion,
}
// Process: Remove ownerReferences from children → Delete parent, children remain

// BlockOwnerDeletion prevents parent deletion while child exists
// Ensures children deleted first in Foreground deletion

// Controller field indicates primary controller
// Only one ownerReference can have Controller=true
// Used by Owns() to watch children
```
:p How do OwnerReferences enable automatic resource cleanup?
??x
OwnerReferences link children to parents. Garbage collector deletes orphaned children automatically.

Fields:
- APIVersion, Kind, Name, UID: Identify owner
- Controller: true if primary controller (max one)
- BlockOwnerDeletion: Prevent owner deletion if set

Deletion propagation:

**Foreground**: Delete children → delete parent
- Parent gets deletionTimestamp
- Children deleted first
- Parent deleted after children gone

**Background**: Delete parent → GC deletes children
- Parent deleted immediately
- GC deletes children async

**Orphan**: Remove ownerRefs, keep children
- Children survive parent deletion

Use cases:
- ReplicaSet owns Pods
- Deployment owns ReplicaSets
- Custom operator resources

controller-runtime: SetControllerReference() sets ownerRef + controller=true.
x??

---

#### Custom Metrics API for HPA
Custom metrics enable HPA to scale on app-specific metrics.

```go
// Custom metrics API interface
type CustomMetricsProvider interface {
    GetMetricByName(name, namespace, metricName, selector) (*custom_metrics.MetricValue, error)
    GetMetricBySelector(namespace, selector, metricName) (*custom_metrics.MetricValueList, error)
}

// Implement custom metrics provider
type MyMetricsProvider struct {
    client client.Client
}

func (p *MyMetricsProvider) GetMetricByName(name, namespace, metricName, selector) (*custom_metrics.MetricValue, error) {
    // Fetch metric from your monitoring system
    switch metricName {
    case "requests_per_second":
        rps := p.getRequestsPerSecond(namespace, name)
        return &custom_metrics.MetricValue{
            Metric: custom_metrics.MetricIdentifier{
                Name: metricName,
            },
            Value: *resource.NewMilliQuantity(int64(rps*1000), resource.DecimalSI),
            Timestamp: metav1.Now(),
        }, nil

    case "queue_depth":
        depth := p.getQueueDepth(namespace, name)
        return &custom_metrics.MetricValue{
            Metric: custom_metrics.MetricIdentifier{
                Name: metricName,
            },
            Value: *resource.NewQuantity(depth, resource.DecimalSI),
            Timestamp: metav1.Now(),
        }, nil
    }
}

// Register with API server (API aggregation)
func setupCustomMetricsAPI() {
    apiService := &apiregistrationv1.APIService{
        ObjectMeta: metav1.ObjectMeta{
            Name: "v1beta1.custom.metrics.k8s.io",
        },
        Spec: apiregistrationv1.APIServiceSpec{
            Service: &apiregistrationv1.ServiceReference{
                Namespace: "monitoring",
                Name:      "custom-metrics-apiserver",
            },
            Group:                "custom.metrics.k8s.io",
            Version:              "v1beta1",
            GroupPriorityMinimum: 100,
            VersionPriority:      100,
        },
    }
}

// HPA using custom metric
hpa := &autoscalingv2.HorizontalPodAutoscaler{
    Spec: autoscalingv2.HorizontalPodAutoscalerSpec{
        ScaleTargetRef: autoscalingv2.CrossVersionObjectReference{
            APIVersion: "apps/v1",
            Kind:       "Deployment",
            Name:       "myapp",
        },
        MinReplicas: pointer.Int32(2),
        MaxReplicas: 10,
        Metrics: []autoscalingv2.MetricSpec{{
            Type: autoscalingv2.PodsMetricSourceType,
            Pods: &autoscalingv2.PodsMetricSource{
                Metric: autoscalingv2.MetricIdentifier{
                    Name: "requests_per_second",
                },
                Target: autoscalingv2.MetricTarget{
                    Type:         autoscalingv2.AverageValueMetricType,
                    AverageValue: resource.NewQuantity(1000, resource.DecimalSI),
                },
            },
        }},
    },
}
```
:p How does custom metrics API enable HPA to scale on application metrics?
??x
Custom metrics API exposes app-specific metrics via API aggregation for HPA consumption.

Architecture:
1. Metrics provider implements CustomMetricsProvider interface
2. Provider aggregated into API server
3. HPA queries /apis/custom.metrics.k8s.io/v1beta1/
4. Provider returns metric values
5. HPA scales based on values

Metric types:
- **Pods**: Metric per pod (e.g., requests/sec per pod)
- **Object**: Metric from another object (e.g., queue depth)

Flow:
1. App exports metrics (Prometheus, etc.)
2. Metrics adapter queries monitoring system
3. Adapter serves via custom metrics API
4. HPA fetches metrics
5. HPA scales deployment

Common adapters:
- prometheus-adapter
- stackdriver-adapter
- custom implementations

Alternative: External Metrics API for non-Kubernetes metrics.
x??

---

#### Kubernetes Event Recording
Events provide audit trail and debugging info. Controllers should record significant events.

```go
import "k8s.io/client-go/tools/record"

// Event recorder
type Reconciler struct {
    client.Client
    Recorder record.EventRecorder
}

func (r *Reconciler) Reconcile(ctx, req) (ctrl.Result, error) {
    var db Database
    r.Get(ctx, req.NamespacedName, &db)

    // Record normal event
    r.Recorder.Event(&db, corev1.EventTypeNormal, "Created", "Database instance created")

    // Record warning event
    if err := r.createDatabase(&db); err != nil {
        r.Recorder.Event(&db, corev1.EventTypeWarning, "ProvisioningFailed",
            fmt.Sprintf("Failed to provision database: %v", err))
        return ctrl.Result{}, err
    }

    // Eventf with formatting
    r.Recorder.Eventf(&db, corev1.EventTypeNormal, "ScalingStarted",
        "Scaling from %d to %d replicas", oldSize, newSize)

    return ctrl.Result{}, nil
}

// Setup recorder with manager
func (r *Reconciler) SetupWithManager(mgr ctrl.Manager) error {
    r.Recorder = mgr.GetEventRecorderFor("database-controller")
    return ctrl.NewControllerManagedBy(mgr).
        For(&Database{}).
        Complete(r)
}

// Event structure
type Event struct {
    Reason  string    // Short, CamelCase (e.g., "ProvisioningFailed")
    Message string    // Human-readable description
    Type    string    // "Normal" or "Warning"
    Source  EventSource {
        Component string  // "database-controller"
    }
    InvolvedObject ObjectReference  // Resource this event is about
    FirstTimestamp metav1.Time
    LastTimestamp  metav1.Time
    Count          int32  // How many times occurred
}

// Event aggregation
// Duplicate events within 10 minutes are aggregated (count incremented)

// Viewing events
kubectl get events
kubectl describe pod my-pod  // Shows events for pod

// Events are ephemeral (TTL ~1 hour)
// For audit trail, use external event exporters
```
:p How should controllers use Kubernetes events and what are best practices?
??x
Events provide observability for controllers. Record significant state changes and errors.

Event types:
- **Normal**: Successful operations, state transitions
- **Warning**: Failures, degraded state

Best practices:

**When to record:**
- Resource created/deleted
- Reconciliation failures
- Scaling operations
- Health state changes
- External API errors

**Reason naming:**
- CamelCase
- Specific (e.g., "ProvisioningFailed" not "Error")

**Message:**
- Human-readable
- Include context/details

**Avoid:**
- Per-reconcile events (spam)
- Debug-level details
- Sensitive information

Events are aggregated (duplicates within 10min count++).

Use Recorder.Event() for simple, Recorder.Eventf() for formatted messages.

Events are ephemeral. For permanent audit trail, export to external system.
x??

---
