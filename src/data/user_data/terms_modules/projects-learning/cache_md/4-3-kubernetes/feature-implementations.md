# Kubernetes Feature Implementations Flashcards

#### Pod Scheduler - Node Selection
Location: `pkg/scheduler/framework/` and `pkg/scheduler/core/`
The scheduler selects optimal nodes for pods through filtering and scoring phases.

```go
// Main scheduling algorithm in pkg/scheduler/core/generic_scheduler.go
type genericScheduler struct {
    cache                    internalcache.Cache
    nodeInfoSnapshot         *internalcache.Snapshot
    percentageOfNodesToScore int32
}

func (g *genericScheduler) Schedule(ctx, pod *v1.Pod) (ScheduleResult, error) {
    // 1. Get feasible nodes (Filter phase)
    feasibleNodes, err := g.findNodesThatFitPod(ctx, pod)

    // Filter plugins run here:
    // - NodeResourcesFit: Check CPU/memory
    // - NodePorts: Check port conflicts
    // - NodeAffinity: Check affinity rules
    // - PodTopologySpread: Check spread constraints
    // - TaintToleration: Check taints/tolerations

    if len(feasibleNodes) == 0 {
        return ScheduleResult{}, &FitError{
            Pod: pod,
            NumAllNodes: len(g.cache.NodeTree().List()),
        }
    }

    // 2. Score nodes (Score phase)
    priorityList, err := g.prioritizeNodes(ctx, pod, feasibleNodes)

    // Scoring plugins:
    // - NodeResourcesFit: Prefer nodes with more available resources
    // - ImageLocality: Prefer nodes with image already pulled
    // - InterPodAffinity: Score based on pod affinity/anti-affinity
    // - NodeAffinity: Score based on preferred affinity

    // 3. Select best node
    host, err := g.selectHost(priorityList)

    return ScheduleResult{
        SuggestedHost: host,
    }, nil
}

// Filter example: NodeResourcesFit in pkg/scheduler/framework/plugins/noderesources/
func (f *Fit) Filter(ctx, state, pod, nodeInfo) *Status {
    insufficientResources := fitsRequest(pod, nodeInfo)

    if len(insufficientResources) > 0 {
        return NewStatus(Unschedulable,
            fmt.Sprintf("Insufficient %v", insufficientResources))
    }
    return nil
}
```
:p Where is pod scheduling implemented and what are the main phases?
??x
Location: `pkg/scheduler/core/generic_scheduler.go` and `pkg/scheduler/framework/plugins/`

Main phases:
1. **Filter**: Eliminate incompatible nodes (in `findNodesThatFitPod`)
   - NodeResourcesFit, NodePorts, NodeAffinity, TaintToleration
2. **Score**: Rank feasible nodes (in `prioritizeNodes`)
   - NodeResourcesFit, ImageLocality, InterPodAffinity
3. **Select**: Pick highest scoring node

Each phase uses plugin framework. Plugins in `pkg/scheduler/framework/plugins/`.
x??

---

#### Network Policy Enforcement
Location: `pkg/apis/networking/` for API, enforcement by CNI plugins
NetworkPolicies define traffic rules but are enforced by network plugins, not Kubernetes core.

```go
// NetworkPolicy definition in pkg/apis/networking/types.go
type NetworkPolicy struct {
    metav1.TypeMeta
    metav1.ObjectMeta

    Spec NetworkPolicySpec
}

type NetworkPolicySpec struct {
    // Which pods this policy applies to
    PodSelector metav1.LabelSelector

    // Ingress rules
    Ingress []NetworkPolicyIngressRule

    // Egress rules
    Egress []NetworkPolicyEgressRule

    // PolicyTypes: Ingress, Egress, or both
    PolicyTypes []PolicyType
}

type NetworkPolicyIngressRule struct {
    // Ports allowed
    Ports []NetworkPolicyPort

    // Sources allowed (pods, namespaces, IP blocks)
    From []NetworkPolicyPeer
}

// Example policy evaluation (conceptual - done by CNI)
func evaluateNetworkPolicy(packet Packet, pod *Pod, policies []*NetworkPolicy) bool {
    // 1. Find policies that select this pod
    applicablePolicies := []*NetworkPolicy{}
    for _, policy := range policies {
        if policySelectsPod(policy.Spec.PodSelector, pod) {
            applicablePolicies = append(applicablePolicies, policy)
        }
    }

    // 2. If no policies, allow all (default allow)
    if len(applicablePolicies) == 0 {
        return true
    }

    // 3. Check if any policy allows this traffic
    for _, policy := range applicablePolicies {
        if packet.Direction == Ingress {
            for _, rule := range policy.Spec.Ingress {
                if matchesIngressRule(packet, rule) {
                    return true
                }
            }
        }
    }

    // 4. Deny if no rule matched (default deny when policy exists)
    return false
}

// CNI plugin (Calico, Cilium) watches NetworkPolicy resources
// and programs iptables/eBPF rules accordingly
```
:p Where are NetworkPolicies defined and how are they enforced?
??x
Location: API types in `pkg/apis/networking/types.go`

Enforcement: NOT by Kubernetes core - by CNI plugins (Calico, Cilium, Weave)

Flow:
1. User creates NetworkPolicy resource
2. API server validates and stores in etcd
3. CNI plugin watches NetworkPolicy resources
4. CNI translates to iptables/eBPF/OVS rules
5. Rules enforced at network layer

Default behavior:
- No policies: Allow all traffic
- Policy exists for pod: Deny all except explicitly allowed

Kubernetes only provides the API; CNI does the work.
x??

---

#### ResourceQuota Admission
Location: `pkg/quota/` and admission plugin in `plugin/pkg/admission/resourcequota/`
ResourceQuota admission controller enforces resource limits per namespace.

```go
// Admission plugin in plugin/pkg/admission/resourcequota/admission.go
type quotaAdmission struct {
    Handler admission.Interface

    evaluator quota.Evaluator
    registry  quota.Registry
}

func (q *quotaAdmission) Admit(a admission.Attributes) error {
    // 1. Skip if not a create/update operation
    if a.GetOperation() != admission.Create && a.GetOperation() != admission.Update {
        return nil
    }

    // 2. Get all ResourceQuotas in namespace
    quotas, err := q.quotaLister.ResourceQuotas(a.GetNamespace()).List(labels.Everything())

    // 3. For each quota, check if operation would exceed limits
    for _, resourceQuota := range quotas {
        // Calculate current usage
        currentUsage := q.calculateUsage(a.GetNamespace(), resourceQuota)

        // Calculate usage delta from this operation
        newObject := a.GetObject()
        delta := q.evaluator.Usage(newObject)

        // Check if new usage exceeds quota
        newUsage := add(currentUsage, delta)

        for resourceName, limit := range resourceQuota.Spec.Hard {
            if newUsage[resourceName] > limit {
                return admission.NewForbidden(a,
                    fmt.Errorf("exceeded quota: %s", resourceName))
            }
        }
    }

    return nil
}

// Usage calculation in pkg/quota/v1/evaluator/core/pods.go
func (p *PodEvaluator) Usage(obj runtime.Object) corev1.ResourceList {
    pod := obj.(*corev1.Pod)

    result := corev1.ResourceList{}

    // Count pod
    result[corev1.ResourcePods] = resource.MustParse("1")

    // Sum container requests
    for _, container := range pod.Spec.Containers {
        for resourceName, quantity := range container.Resources.Requests {
            if existing, found := result[resourceName]; found {
                existing.Add(quantity)
                result[resourceName] = existing
            } else {
                result[resourceName] = quantity
            }
        }
    }

    return result
}
```
:p Where is ResourceQuota enforced and how does it work?
??x
Location:
- Admission plugin: `plugin/pkg/admission/resourcequota/`
- Evaluators: `pkg/quota/v1/evaluator/`

Enforcement:
1. Runs in admission phase (before persistence)
2. Lists all ResourceQuotas in namespace
3. Calculates current usage + delta from new request
4. Rejects if would exceed any quota limit

Resources tracked:
- Pods, CPU/memory requests/limits
- PVCs, Services, Secrets, ConfigMaps
- Custom resources (if configured)

Controller also runs periodically to recalculate usage and update status.
x??

---

#### Secret Encryption at Rest
Location: `staging/src/k8s.io/apiserver/pkg/storage/value/` and `cmd/kube-apiserver/app/options/`
Secrets are encrypted before storing in etcd using encryption providers.

```go
// Encryption config in cmd/kube-apiserver/app/options/encryptionconfig/
type EncryptionConfiguration struct {
    Resources []ResourceConfiguration
}

type ResourceConfiguration struct {
    Resources []string  // e.g., ["secrets"]
    Providers []ProviderConfiguration
}

type ProviderConfiguration struct {
    AESCBC   *AESConfiguration
    Secretbox *SecretboxConfiguration
    Identity  *IdentityConfiguration  // No encryption
    KMS       *KMSConfiguration       // External KMS
}

// Encryption transformer in staging/src/k8s.io/apiserver/pkg/storage/value/encrypt/
type envelopeTransformer struct {
    envelopeService envelope.Service
    prefix          []byte
    cacheSize       int
}

func (t *envelopeTransformer) TransformToStorage(data []byte, ctx value.Context) ([]byte, error) {
    // 1. Generate data encryption key (DEK)
    dek := make([]byte, 32)
    rand.Read(dek)

    // 2. Encrypt data with DEK (AES-GCM)
    encrypted := encryptWithDEK(data, dek)

    // 3. Encrypt DEK with Key Encryption Key (KEK) via KMS
    encryptedDEK, err := t.envelopeService.Encrypt(dek)

    // 4. Store: encryptedDEK + encrypted data
    result := append(t.prefix, encryptedDEK...)
    result = append(result, encrypted...)

    return result, nil
}

func (t *envelopeTransformer) TransformFromStorage(data []byte, ctx value.Context) ([]byte, error) {
    // 1. Extract encrypted DEK and encrypted data
    encryptedDEK := extractDEK(data)
    encryptedData := extractData(data)

    // 2. Decrypt DEK using KMS
    dek, err := t.envelopeService.Decrypt(encryptedDEK)

    // 3. Decrypt data using DEK
    decrypted := decryptWithDEK(encryptedData, dek)

    return decrypted, nil
}

// API server applies transformer before etcd storage
func (s *store) Create(ctx, key, obj) error {
    // Serialize object
    data := encode(obj)

    // Encrypt if configured
    encrypted, err := s.transformer.TransformToStorage(data, ctx)

    // Store in etcd
    s.etcdClient.Put(ctx, key, encrypted)
}
```
:p How does Kubernetes encrypt Secrets at rest and where is this implemented?
??x
Location: `staging/src/k8s.io/apiserver/pkg/storage/value/encrypt/`

Envelope encryption pattern:
1. Generate Data Encryption Key (DEK) per secret
2. Encrypt secret data with DEK (AES-GCM)
3. Encrypt DEK with Key Encryption Key (KEK) from KMS
4. Store encrypted DEK + encrypted data in etcd

Providers (in order of preference):
- KMS: External key management (AWS KMS, Vault)
- AESCBC: Static key in config
- Secretbox: NaCl secretbox
- Identity: No encryption (plaintext)

Configuration: `--encryption-provider-config` flag points to EncryptionConfiguration YAML.

First provider encrypts new data; all providers try decryption (for key rotation).
x??

---

#### Service Load Balancing - kube-proxy
Location: `pkg/proxy/` with iptables/ipvs/userspace modes
kube-proxy implements Service abstraction by programming network rules.

```go
// Proxy interface in pkg/proxy/
type Provider interface {
    Sync()
    SyncLoop()
}

// iptables mode in pkg/proxy/iptables/proxier.go
type Proxier struct {
    serviceMap map[types.NamespacedName]*serviceInfo
    endpointsMap map[types.NamespacedName]*endpointsInfo
    iptables utiliptables.Interface
}

func (proxier *Proxier) syncProxyRules() {
    // 1. Build iptables rules for each service
    for svcName, svc := range proxier.serviceMap {
        // Get endpoints for this service
        endpoints := proxier.endpointsMap[svcName]

        // Create chain for this service
        svcChain := servicePortChainName(svcName, svc.Port)

        // Jump rule from KUBE-SERVICES to service chain
        proxier.iptables.AppendRule("nat", "KUBE-SERVICES",
            "-m", "comment", "--comment", svcName,
            "-p", svc.Protocol,
            "-d", svc.ClusterIP,
            "--dport", svc.Port,
            "-j", svcChain)

        // 2. Load balance across endpoints
        numEndpoints := len(endpoints)
        for i, ep := range endpoints {
            // Probability for random load balancing
            probability := 1.0 / float64(numEndpoints - i)

            // DNAT to endpoint
            proxier.iptables.AppendRule("nat", svcChain,
                "-m", "comment", "--comment", svcName,
                "-m", "statistic", "--mode", "random",
                "--probability", fmt.Sprintf("%.5f", probability),
                "-j", "DNAT",
                "--to-destination", fmt.Sprintf("%s:%d", ep.IP, ep.Port))
        }

        // 3. For NodePort services, add KUBE-NODEPORTS rules
        if svc.NodePort != 0 {
            proxier.iptables.AppendRule("nat", "KUBE-NODEPORTS",
                "-p", svc.Protocol,
                "--dport", svc.NodePort,
                "-j", svcChain)
        }

        // 4. For LoadBalancer services, add external IP rules
        for _, ingress := range svc.LoadBalancerStatus.Ingress {
            proxier.iptables.AppendRule("nat", "KUBE-SERVICES",
                "-d", ingress.IP,
                "-p", svc.Protocol,
                "--dport", svc.Port,
                "-j", svcChain)
        }
    }

    // 5. Apply all rules atomically
    proxier.iptables.RestoreAll(rules)
}

// IPVS mode (more efficient for large clusters)
// Uses IPVS load balancer instead of iptables
// Located in pkg/proxy/ipvs/proxier.go
```
:p How does kube-proxy implement Service load balancing?
??x
Location: `pkg/proxy/iptables/proxier.go` (iptables mode) or `pkg/proxy/ipvs/proxier.go` (IPVS mode)

iptables mode:
1. Creates chain per Service:Port
2. Jump from KUBE-SERVICES to service chain when ClusterIP:Port matches
3. Random load balance to endpoints using statistic module
4. DNAT to endpoint IP:Port
5. NodePort: Additional rules in KUBE-NODEPORTS
6. LoadBalancer: Rules for external IPs

IPVS mode (better performance):
1. Creates IPVS virtual server per Service
2. Adds real servers (endpoints) to virtual server
3. Kernel IPVS handles load balancing

Modes: iptables (default), IPVS, userspace (deprecated), nftables (future).

kube-proxy watches Services and Endpoints, syncs rules on changes.
x??

---

#### Persistent Volume Provisioning
Location: `pkg/controller/volume/persistentvolume/` for controller, `pkg/volume/` for plugins
PV controller binds PVCs to PVs, triggers dynamic provisioning.

```go
// PV controller in pkg/controller/volume/persistentvolume/pv_controller.go
type PersistentVolumeController struct {
    volumeLister  corelisters.PersistentVolumeLister
    claimLister   corelisters.PersistentVolumeClaimLister
    classLister   storagelisters.StorageClassLister

    // Plugin for dynamic provisioning
    volumePluginMgr volume.VolumePluginMgr
}

func (ctrl *PersistentVolumeController) syncClaim(claim *v1.PersistentVolumeClaim) error {
    // 1. Check if already bound
    if claim.Spec.VolumeName != "" {
        // Already bound, ensure PV exists and matches
        return ctrl.syncBoundClaim(claim)
    }

    // 2. Find matching PV (if pre-provisioned)
    volume := ctrl.findMatchingVolume(claim)

    if volume != nil {
        // 3. Bind PVC to existing PV
        return ctrl.bind(volume, claim)
    }

    // 4. No matching PV, trigger dynamic provisioning
    storageClass := ctrl.getStorageClassForClaim(claim)

    if storageClass.VolumeBindingMode == storage.VolumeBindingWaitForFirstConsumer {
        // Wait for pod to be scheduled
        return nil
    }

    // 5. Provision new volume
    volume, err := ctrl.provisionVolume(claim, storageClass)
    if err != nil {
        return err
    }

    // 6. Create PV object
    pv := &v1.PersistentVolume{
        ObjectMeta: metav1.ObjectMeta{
            Name: volume.Name,
        },
        Spec: v1.PersistentVolumeSpec{
            Capacity: v1.ResourceList{
                v1.ResourceStorage: claim.Spec.Resources.Requests[v1.ResourceStorage],
            },
            AccessModes: claim.Spec.AccessModes,
            PersistentVolumeSource: volume.Source,
            StorageClassName: &storageClass.Name,
            ClaimRef: &v1.ObjectReference{
                Namespace: claim.Namespace,
                Name:      claim.Name,
                UID:       claim.UID,
            },
        },
    }

    ctrl.kubeClient.CoreV1().PersistentVolumes().Create(ctx, pv)

    return nil
}

// Dynamic provisioning via external provisioner (CSI)
// External provisioner watches PVCs and calls CSI CreateVolume

// Volume plugin example in pkg/volume/csi/
func (p *csiPlugin) ProvisionVolume(options VolumeOptions) (*v1.PersistentVolume, error) {
    // Call CSI driver
    resp, err := p.csiClient.CreateVolume(ctx, &csi.CreateVolumeRequest{
        Name:               options.PVName,
        CapacityRange:      &csi.CapacityRange{
            RequiredBytes: options.Capacity,
        },
        VolumeCapabilities: buildCapabilities(options),
        Parameters:         options.Parameters,
    })

    // Return PV spec
    return &v1.PersistentVolume{
        Spec: v1.PersistentVolumeSpec{
            CSI: &v1.CSIPersistentVolumeSource{
                Driver:       p.driverName,
                VolumeHandle: resp.Volume.VolumeId,
            },
        },
    }, nil
}
```
:p How does Kubernetes provision and bind PersistentVolumes?
??x
Location: Controller in `pkg/controller/volume/persistentvolume/`, plugins in `pkg/volume/`

Binding flow (PV controller):
1. User creates PVC
2. Controller searches for matching unbound PV
3. If found, bind PVC to PV (set spec.volumeName)
4. If not found, trigger dynamic provisioning

Dynamic provisioning:
1. Get StorageClass from PVC
2. Call provisioner (CSI driver)
3. Provisioner creates volume in storage system
4. Create PV object with volume handle
5. Bind PVC to new PV

Volume binding modes:
- Immediate: Provision immediately (default)
- WaitForFirstConsumer: Provision when pod scheduled (topology-aware)

Modern: External CSI provisioners watch PVCs, Kubernetes core deprecated built-in provisioners.
x??

---

#### Namespace Resource Isolation
Location: `pkg/controller/namespace/` and admission controllers
Namespaces provide scope for resource names and enable resource isolation.

```go
// Namespace controller in pkg/controller/namespace/namespace_controller.go
type NamespaceController struct {
    listerSynced  cache.InformerSynced
    queue         workqueue.RateLimitingInterface

    namespacedResourcesDeleter *namespacedResourcesDeleter
}

func (nm *NamespaceController) syncNamespaceFromKey(key string) error {
    namespace := nm.lister.Get(key)

    if namespace.DeletionTimestamp == nil {
        // Namespace not being deleted
        return nil
    }

    // Namespace is being deleted, clean up resources
    return nm.namespacedResourcesDeleter.Delete(namespace)
}

// Deletion process in pkg/controller/namespace/deletion/
type namespacedResourcesDeleter struct {
    discoverResourcesFn func() ([]*metav1.APIResourceList, error)
    deleteResourceFn    func(namespace string, gvr schema.GroupVersionResource) error
}

func (d *namespacedResourcesDeleter) Delete(namespace *v1.Namespace) error {
    // 1. Discover all namespaced resources
    resources, err := d.discoverResourcesFn()

    // 2. Delete all resources in namespace
    for _, resourceList := range resources {
        for _, resource := range resourceList.APIResources {
            if !resource.Namespaced {
                continue
            }

            gvr := schema.GroupVersionResource{
                Group:    resourceList.GroupVersion,
                Resource: resource.Name,
            }

            // Delete all instances of this resource type
            err := d.deleteResourceFn(namespace.Name, gvr)
        }
    }

    // 3. Remove finalizers from namespace
    namespace.Spec.Finalizers = []v1.FinalizerName{}

    // 4. Namespace will be deleted by API server
    return nil
}

// Admission: NamespaceLifecycle plugin
// plugin/pkg/admission/namespace/lifecycle/admission.go
type Lifecycle struct {
    client kubernetes.Interface
}

func (l *Lifecycle) Admit(a admission.Attributes) error {
    // Prevent operations on namespaces being deleted
    if a.GetNamespace() == "" {
        return nil
    }

    namespace, err := l.client.CoreV1().Namespaces().Get(ctx, a.GetNamespace())

    if namespace.Status.Phase == v1.NamespaceTerminating {
        return admission.NewForbidden(a,
            fmt.Errorf("namespace %s is terminating", namespace.Name))
    }

    return nil
}

// Namespace scoping in API server
// When listing resources, API server filters by namespace
func (r *REST) List(ctx, options) (runtime.Object, error) {
    namespace := genericapirequest.NamespaceValue(ctx)

    // List only resources in this namespace
    return r.store.List(ctx, &storage.ListOptions{
        ResourceVersion: options.ResourceVersion,
        Predicate: storage.SelectionPredicate{
            Field: fields.OneTermEqualSelector("metadata.namespace", namespace),
        },
    })
}
```
:p How do Namespaces provide resource isolation in Kubernetes?
??x
Location: Controller in `pkg/controller/namespace/`, admission in `plugin/pkg/admission/namespace/lifecycle/`

Isolation mechanisms:

1. **Name scoping**: Resources in different namespaces can have same name
2. **RBAC scoping**: Roles/RoleBindings are namespaced
3. **ResourceQuota**: Per-namespace resource limits
4. **NetworkPolicy**: Can isolate by namespace selector

Namespace deletion:
1. User deletes Namespace
2. API sets deletionTimestamp
3. Namespace controller discovers all namespaced resources
4. Deletes all resources in namespace
5. Removes finalizers
6. API server deletes Namespace

Admission controller prevents creating resources in terminating namespaces.

API server filters list/watch operations by namespace from context.

Note: Not true isolation - pods in different namespaces can still communicate unless NetworkPolicy blocks.
x??

---

#### Ingress Controller Pattern
Location: `staging/src/k8s.io/api/networking/v1/` for types, controllers are external
Ingress resource is just API; actual implementation is by external ingress controllers.

```go
// Ingress API in staging/src/k8s.io/api/networking/v1/types.go
type Ingress struct {
    metav1.TypeMeta
    metav1.ObjectMeta

    Spec   IngressSpec
    Status IngressStatus
}

type IngressSpec struct {
    // Default backend for unmatched requests
    DefaultBackend *IngressBackend

    // TLS configuration
    TLS []IngressTLS

    // Routing rules
    Rules []IngressRule

    // IngressClass name
    IngressClassName *string
}

type IngressRule struct {
    // Host (e.g., "example.com")
    Host string

    // HTTP routing rules
    IngressRuleValue
}

type HTTPIngressRuleValue struct {
    Paths []HTTPIngressPath
}

type HTTPIngressPath struct {
    Path     string  // e.g., "/api"
    PathType *PathType  // Prefix, Exact, ImplementationSpecific
    Backend  IngressBackend
}

type IngressBackend struct {
    Service *IngressServiceBackend
}

type IngressServiceBackend struct {
    Name string
    Port ServiceBackendPort
}

// External ingress controller (NGINX example - not in k8s core)
type NGINXController struct {
    client     kubernetes.Interface
    ingressLister networkinglisters.IngressLister
    serviceLister corelisters.ServiceLister
}

func (n *NGINXController) syncIngress(key string) error {
    namespace, name := splitKey(key)
    ingress := n.ingressLister.Ingresses(namespace).Get(name)

    // 1. Build NGINX config from Ingress
    config := n.buildConfig(ingress)

    // 2. Write config file
    writeFile("/etc/nginx/nginx.conf", config)

    // 3. Reload NGINX
    exec.Command("nginx", "-s", "reload").Run()

    // 4. Update Ingress status with LoadBalancer IP
    ingress.Status.LoadBalancer.Ingress = []v1.LoadBalancerIngress{{
        IP: n.getExternalIP(),
    }}
    n.client.NetworkingV1().Ingresses(namespace).UpdateStatus(ctx, ingress)

    return nil
}

func (n *NGINXController) buildConfig(ingress *Ingress) string {
    config := "http {\n"

    for _, rule := range ingress.Spec.Rules {
        config += fmt.Sprintf("  server {\n")
        config += fmt.Sprintf("    server_name %s;\n", rule.Host)

        for _, path := range rule.HTTP.Paths {
            // Get backend service endpoints
            service := n.serviceLister.Services(ingress.Namespace).Get(path.Backend.Service.Name)
            endpoints := n.getEndpoints(service)

            // Upstream block
            config += fmt.Sprintf("    upstream %s {\n", service.Name)
            for _, ep := range endpoints {
                config += fmt.Sprintf("      server %s:%d;\n", ep.IP, ep.Port)
            }
            config += "    }\n"

            // Location block
            config += fmt.Sprintf("    location %s {\n", path.Path)
            config += fmt.Sprintf("      proxy_pass http://%s;\n", service.Name)
            config += "    }\n"
        }

        config += "  }\n"
    }

    config += "}\n"
    return config
}
```
:p How does Ingress work and where is it implemented?
??x
Location: API types in `staging/src/k8s.io/api/networking/v1/`, controllers are EXTERNAL

Kubernetes provides only the API. Implementation by external controllers:
- NGINX Ingress Controller
- HAProxy Ingress
- Traefik
- Ambassador
- Istio Gateway

Controller flow:
1. Watch Ingress resources
2. Translate to LB config (NGINX conf, HAProxy conf, etc.)
3. Update load balancer
4. Update Ingress status with IP/hostname

IngressClass specifies which controller handles the Ingress.

Ingress provides:
- Host-based routing (example.com → service-a)
- Path-based routing (/api → service-a, /web → service-b)
- TLS termination

No code in Kubernetes core actually processes traffic - it's all external controllers.
x??

---

#### Node Lifecycle Controller
Location: `pkg/controller/nodelifecycle/`
Node controller monitors node health and taints/evicts pods from unhealthy nodes.

```go
// Node lifecycle controller in pkg/controller/nodelifecycle/node_lifecycle_controller.go
type Controller struct {
    taintManager *scheduler.NoExecuteTaintManager

    nodeLister      corelisters.NodeLister
    podLister       corelisters.PodLister

    nodeMonitorPeriod time.Duration  // Default: 5s
    nodeStartupGracePeriod time.Duration  // Default: 60s
    nodeMonitorGracePeriod time.Duration  // Default: 40s
}

func (nc *Controller) monitorNodeHealth(ctx context.Context) {
    nodes := nc.nodeLister.List()

    for _, node := range nodes {
        // Check node conditions
        observedReadyCondition := getNodeCondition(node, v1.NodeReady)

        if observedReadyCondition == nil {
            // No ready condition reported
            gracePeriod := nc.nodeStartupGracePeriod

            if time.Since(node.CreationTimestamp.Time) > gracePeriod {
                // Mark as Unknown
                nc.markNodeUnknown(node)
            }
            continue
        }

        // Check if condition is stale
        currentTime := time.Now()
        lastTransition := observedReadyCondition.LastTransitionTime.Time
        lastHeartbeat := observedReadyCondition.LastHeartbeatTime.Time

        gracePeriod := nc.nodeMonitorGracePeriod

        if currentTime.Sub(lastHeartbeat) > gracePeriod {
            // Node hasn't updated recently
            if observedReadyCondition.Status != v1.ConditionUnknown {
                // Mark as Unknown
                nc.markNodeUnknown(node)

                // Taint node
                nc.taintNode(node, v1.TaintNodeNotReady)
            }
        } else {
            // Node is healthy
            if observedReadyCondition.Status == v1.ConditionTrue {
                // Remove taints
                nc.removeTaint(node, v1.TaintNodeNotReady)
                nc.removeTaint(node, v1.TaintNodeUnreachable)
            } else {
                // Node reports NotReady
                nc.taintNode(node, v1.TaintNodeNotReady)
            }
        }
    }
}

func (nc *Controller) taintNode(node *v1.Node, taintKey string) {
    // Add taint to node
    taint := &v1.Taint{
        Key:    taintKey,
        Value:  "",
        Effect: v1.TaintEffectNoExecute,  // Evict pods
    }

    node.Spec.Taints = append(node.Spec.Taints, *taint)
    nc.kubeClient.CoreV1().Nodes().Update(ctx, node)
}

// NoExecuteTaintManager evicts pods in pkg/controller/nodelifecycle/scheduler/
func (tc *NoExecuteTaintManager) handleNodeUpdate(node *v1.Node) {
    // Find pods on this node
    pods := tc.getPodsOnNode(node.Name)

    for _, pod := range pods {
        // Check if pod tolerates all taints
        for _, taint := range node.Spec.Taints {
            if !podToleratesTaint(pod, taint) && taint.Effect == v1.TaintEffectNoExecute {
                // Pod doesn't tolerate, evict after grace period
                tolerationSeconds := getTolerationSeconds(pod, taint)

                tc.taintEvictionQueue.AddAfter(pod, time.Duration(tolerationSeconds)*time.Second)
            }
        }
    }
}

func (tc *NoExecuteTaintManager) evictPod(pod *v1.Pod) {
    // Delete pod
    tc.client.CoreV1().Pods(pod.Namespace).Delete(ctx, pod.Name, metav1.DeleteOptions{})
}
```
:p How does the Node Lifecycle Controller handle unhealthy nodes?
??x
Location: `pkg/controller/nodelifecycle/node_lifecycle_controller.go`

Monitoring:
1. Check node conditions every 5s (nodeMonitorPeriod)
2. If no heartbeat for 40s (nodeMonitorGracePeriod), mark Unknown
3. Add taint: node.kubernetes.io/not-ready:NoExecute

Taints applied:
- node.kubernetes.io/not-ready: Node condition NotReady
- node.kubernetes.io/unreachable: Node Unknown
- Effect: NoExecute (evicts pods)

Pod eviction:
1. NoExecuteTaintManager watches node taints
2. Finds pods without matching tolerations
3. Evicts pods after tolerationSeconds (default 300s)

Pods with tolerations:
```yaml
tolerations:
- key: node.kubernetes.io/not-ready
  operator: Exists
  effect: NoExecute
  tolerationSeconds: 300
```

Controller ensures unhealthy nodes don't run workloads.
x??

---

#### ConfigMap and Secret Projection
Location: `pkg/volume/configmap/` and `pkg/volume/secret/`
ConfigMaps and Secrets are mounted into pods as volumes or exposed as environment variables.

```go
// ConfigMap volume plugin in pkg/volume/configmap/configmap.go
type configMapVolumePlugin struct {
    host volume.VolumeHost
}

func (plugin *configMapVolumePlugin) NewMounter(spec *volume.Spec, pod *v1.Pod) (volume.Mounter, error) {
    return &configMapVolumeMounter{
        configMapName: spec.Name,
        pod:          pod,
        opts:         volumeutil.VolumeOptions{},
    }, nil
}

type configMapVolumeMounter struct {
    configMapName string
    pod           *v1.Pod
    volumePath    string
}

func (b *configMapVolumeMounter) SetUp(mounterArgs volume.MounterArgs) error {
    // 1. Fetch ConfigMap
    configMap, err := b.getConfigMap(b.configMapName, b.pod.Namespace)

    // 2. Create directory for volume
    os.MkdirAll(b.volumePath, 0755)

    // 3. Write each key as a file
    for key, value := range configMap.Data {
        filePath := filepath.Join(b.volumePath, key)

        // Write atomically using symlinks
        // 1. Write to ..data_tmp/
        tmpDir := filepath.Join(b.volumePath, "..data_tmp")
        os.MkdirAll(tmpDir, 0755)
        ioutil.WriteFile(filepath.Join(tmpDir, key), []byte(value), 0644)

        // 2. Atomic rename ..data_tmp -> ..data
        os.Rename(tmpDir, filepath.Join(b.volumePath, "..data"))

        // 3. Symlink key -> ..data/key
        os.Symlink(filepath.Join("..data", key), filePath)
    }

    // 4. Set up update watch
    go b.watchForUpdates()

    return nil
}

func (b *configMapVolumeMounter) watchForUpdates() {
    // Watch ConfigMap for changes
    watcher := b.client.CoreV1().ConfigMaps(b.pod.Namespace).Watch(ctx, metav1.ListOptions{
        FieldSelector: fmt.Sprintf("metadata.name=%s", b.configMapName),
    })

    for event := range watcher.ResultChan() {
        if event.Type == watch.Modified {
            configMap := event.Object.(*v1.ConfigMap)

            // Update files atomically
            b.updateFiles(configMap)
        }
    }
}

// Environment variable projection
// kubelet in pkg/kubelet/kubelet_pods.go
func (kl *Kubelet) makeEnvironmentVariables(pod *v1.Pod, container *v1.Container) ([]kubecontainer.EnvVar, error) {
    envVars := []kubecontainer.EnvVar{}

    for _, env := range container.Env {
        if env.ValueFrom != nil && env.ValueFrom.ConfigMapKeyRef != nil {
            // Fetch from ConfigMap
            configMap := kl.getConfigMap(env.ValueFrom.ConfigMapKeyRef.Name, pod.Namespace)
            value := configMap.Data[env.ValueFrom.ConfigMapKeyRef.Key]

            envVars = append(envVars, kubecontainer.EnvVar{
                Name:  env.Name,
                Value: value,
            })
        } else if env.ValueFrom != nil && env.ValueFrom.SecretKeyRef != nil {
            // Fetch from Secret
            secret := kl.getSecret(env.ValueFrom.SecretKeyRef.Name, pod.Namespace)
            value := secret.Data[env.ValueFrom.SecretKeyRef.Key]

            envVars = append(envVars, kubecontainer.EnvVar{
                Name:  env.Name,
                Value: string(value),
            })
        } else {
            // Literal value
            envVars = append(envVars, kubecontainer.EnvVar{
                Name:  env.Name,
                Value: env.Value,
            })
        }
    }

    return envVars, nil
}
```
:p How are ConfigMaps and Secrets mounted into pods?
??x
Location: Volume plugins in `pkg/volume/configmap/` and `pkg/volume/secret/`

Volume mounting:
1. Kubelet creates directory for volume
2. Fetches ConfigMap/Secret from API
3. Writes each key as file (key=filename, value=content)
4. Uses atomic updates via symlinks (..data → ..data_tmp)
5. Watches for changes and updates files

Atomic updates:
```
volume/
├── ..data -> ..2025_01_23_12_00_00/
├── ..2025_01_23_12_00_00/
│   └── config.json
└── config.json -> ..data/config.json
```

Environment variables:
1. Kubelet resolves valueFrom.configMapKeyRef/secretKeyRef
2. Fetches value from API
3. Passes to container runtime as env var

Note: Env vars are NOT updated when ConfigMap/Secret changes (set at container start). Volume files ARE updated.

Subpath mounts don't receive updates.
x??

---

#### Horizontal Pod Autoscaler Implementation
Location: `pkg/controller/podautoscaler/`
HPA controller scales workloads based on metrics from metrics-server or custom metrics API.

```go
// HPA controller in pkg/controller/podautoscaler/horizontal.go
type HorizontalController struct {
    scaleClient     scale.ScalesGetter
    hpaLister       autoscalinglisters.HorizontalPodAutoscalerLister

    metricsClient   metrics.MetricsClient
    replicaCalc     *ReplicaCalculator
}

func (a *HorizontalController) reconcileAutoscaler(hpa *autoscalingv2.HorizontalPodAutoscaler) error {
    // 1. Get current scale
    scale, err := a.scaleClient.Scales(hpa.Namespace).Get(ctx,
        hpa.Spec.ScaleTargetRef.Kind,
        hpa.Spec.ScaleTargetRef.Name)

    currentReplicas := scale.Spec.Replicas

    // 2. Compute desired replicas from metrics
    desiredReplicas := int32(0)

    for _, metric := range hpa.Spec.Metrics {
        var replica int32

        switch metric.Type {
        case autoscalingv2.ResourceMetricSourceType:
            // CPU or Memory
            replica, _, err = a.computeReplicasForResource(hpa, metric.Resource, currentReplicas)

        case autoscalingv2.PodsMetricSourceType:
            // Custom metric per pod
            replica, _, err = a.computeReplicasForPods(hpa, metric.Pods, currentReplicas)

        case autoscalingv2.ObjectMetricSourceType:
            // Metric from another object
            replica, _, err = a.computeReplicasForObject(hpa, metric.Object, currentReplicas)
        }

        // Take maximum across all metrics
        if replica > desiredReplicas {
            desiredReplicas = replica
        }
    }

    // 3. Apply bounds
    if desiredReplicas < hpa.Spec.MinReplicas {
        desiredReplicas = hpa.Spec.MinReplicas
    }
    if desiredReplicas > hpa.Spec.MaxReplicas {
        desiredReplicas = hpa.Spec.MaxReplicas
    }

    // 4. Check if scale needed
    if desiredReplicas != currentReplicas {
        // Apply stabilization (prevent flapping)
        desiredReplicas = a.stabilizeRecommendation(hpa, desiredReplicas)

        // Scale the target
        scale.Spec.Replicas = desiredReplicas
        a.scaleClient.Scales(hpa.Namespace).Update(ctx,
            hpa.Spec.ScaleTargetRef.Kind,
            scale)
    }

    // 5. Update HPA status
    hpa.Status.CurrentReplicas = currentReplicas
    hpa.Status.DesiredReplicas = desiredReplicas
    a.updateStatus(hpa)

    return nil
}

// Replica calculation in pkg/controller/podautoscaler/replica_calculator.go
func (c *ReplicaCalculator) GetResourceReplicas(currentReplicas int32, targetUtilization int32, resource v1.ResourceName) (int32, error) {
    // 1. Get metrics for all pods
    metrics := c.metricsClient.GetResourceMetric(resource, namespace, selector)

    // 2. Calculate utilization
    requests := 0
    usage := 0

    for _, metric := range metrics.Items {
        requests += getPodRequest(metric.PodName, resource)
        usage += metric.Value
    }

    currentUtilization := (usage * 100) / requests

    // 3. Formula: desiredReplicas = ceil(currentReplicas * currentUtilization / targetUtilization)
    usageRatio := float64(currentUtilization) / float64(targetUtilization)
    return int32(math.Ceil(float64(currentReplicas) * usageRatio)), nil
}
```
:p How is the Horizontal Pod Autoscaler implemented?
??x
Location: `pkg/controller/podautoscaler/horizontal.go`

Flow:
1. Watch HPA resources (every 15s)
2. For each HPA:
   - Get current replicas from scale subresource
   - Fetch metrics (resource, pods, object types)
   - Calculate desired replicas using formula
   - Apply min/max bounds
   - Apply stabilization window
   - Update scale if changed
   - Update HPA status

Formula: `desiredReplicas = ceil(currentReplicas × (currentMetric / targetMetric))`

Metrics sources:
- Resource: From metrics-server (CPU, memory)
- Pods: Custom metrics per pod
- Object: Metrics from other objects (queues, etc.)

Stabilization:
- Scale up: Use lowest recommendation in window (immediate)
- Scale down: Use highest recommendation in window (delayed)
- Prevents flapping

Uses scale subresource to work with Deployment, ReplicaSet, StatefulSet.
x??

---
