# Advanced Kubernetes Components Flashcards

#### Scheduler Framework and Plugins
The scheduler uses a plugin architecture with extension points throughout the scheduling cycle.

```go
// Scheduler framework
type Framework interface {
    RunPreFilterPlugins(ctx, state, pod)
    RunFilterPlugins(ctx, state, pod, nodeInfo)
    RunScorePlugins(ctx, state, pod, nodeName)
    RunReservePlugins(ctx, state, pod, nodeName)
    RunPermitPlugins(ctx, state, pod, nodeName)
    RunBindPlugins(ctx, state, pod, nodeName)
}

// Extension points in order:
// 1. PreFilter: Preprocess pod or check cluster state
// 2. Filter: Filter out nodes that can't run pod
// 3. Score: Rank remaining nodes
// 4. Reserve: Maintain plugin state for chosen node
// 5. Permit: Approve or delay binding
// 6. Bind: Bind pod to node

// Example: NodeAffinity plugin
type NodeAffinity struct{}

func (pl *NodeAffinity) Filter(ctx, state, pod, nodeInfo) *Status {
    node := nodeInfo.Node()

    // Check required node affinity
    if pod.Spec.Affinity != nil &&
       pod.Spec.Affinity.NodeAffinity != nil {
        terms := pod.Spec.Affinity.NodeAffinity.RequiredDuringSchedulingIgnoredDuringExecution

        if !nodeMatchesTerms(node, terms) {
            return NewStatus(Unschedulable, "node doesn't match affinity")
        }
    }

    return NewStatus(Success)
}

func (pl *NodeAffinity) Score(ctx, state, pod, nodeName) (int64, *Status) {
    // Check preferred node affinity
    score := calculateAffinityScore(pod, nodeName)
    return score, NewStatus(Success)
}
```
:p How does the Kubernetes scheduler framework work with plugins?
??x
Scheduler framework defines extension points where plugins hook into the scheduling cycle.

Extension points (in order):
1. PreFilter: Pre-check pod requirements
2. Filter: Exclude incompatible nodes (feasibility)
3. Score: Rank nodes (0-100)
4. Reserve: Hold resources
5. Permit: Gate before binding
6. Bind: Assign pod to node

Plugins implement one or more extension points. Multiple plugins run at each point.

Scores are normalized and weighted. Highest total score wins.

Built-in plugins: NodeAffinity, PodTopologySpread, NodeResourcesFit, etc.
x??

---

#### Scheduler Queue and Priority
Scheduler maintains priority queues. Higher priority pods preempt lower priority pods.

```go
// Priority queue structure
type PriorityQueue struct {
    activeQ    *heap.Heap  // Ready to schedule
    backoffQ   *heap.Heap  // Backing off after failure
    unschedulableQ *heap.Heap  // Failed recently
}

// Pod priority determines order
type Pod struct {
    Spec PodSpec {
        Priority *int32  // Higher = more important
        PriorityClassName string
    }
}

// Preemption algorithm
func (sched *Scheduler) preempt(pod *Pod) (*Node, error) {
    // 1. Find nodes where pod would fit if we evict victims
    for _, node := range sched.nodes {
        victims := findVictimsOnNode(pod, node)

        // Can only preempt lower priority pods
        for _, victim := range victims {
            if victim.Spec.Priority >= pod.Spec.Priority {
                continue  // Can't preempt equal/higher priority
            }
        }

        // 2. Select node with least valuable victims
        nodeScore := calculatePreemptionScore(victims)
        if nodeScore > bestScore {
            bestNode = node
            bestVictims = victims
        }
    }

    // 3. Evict victims (set DeletionTimestamp)
    for _, victim := range bestVictims {
        sched.evict(victim)
    }

    return bestNode, nil
}

// Priority classes
type PriorityClass struct {
    Value         int32   // Priority value
    GlobalDefault bool    // Use if pod doesn't specify
    PreemptionPolicy *string  // "PreemptLowerPriority" or "Never"
}
```
:p How does Kubernetes scheduler handle pod priority and preemption?
??x
Scheduler uses priority values to order scheduling attempts and preempt lower-priority pods.

Priority:
- Pods have spec.priority (int32, higher=more important)
- Set via PriorityClass resource
- Default: 0

Queues:
- activeQ: Sorted by priority, ready to schedule
- backoffQ: Failed pods waiting to retry
- unschedulableQ: Recently unschedulable

Preemption:
1. High-priority pod can't fit
2. Find nodes where evicting lower-priority pods would make room
3. Select node with "least disruption" (lowest total victim priority)
4. Evict victims (delete with grace period)
5. Schedule preemptor

PreemptionPolicy=Never disables preemption for that pod.
x??

---

#### Container Storage Interface (CSI)
CSI is a standard for exposing storage systems to container orchestrators. Decouples storage from Kubernetes core.

```go
// CSI architecture: 3 gRPC services
type IdentityServer interface {
    GetPluginInfo() (*PluginInfo, error)
    GetPluginCapabilities() (*Capabilities, error)
    Probe() (*ProbeResponse, error)
}

type ControllerServer interface {
    CreateVolume(req *CreateVolumeRequest) (*CreateVolumeResponse, error)
    DeleteVolume(req *DeleteVolumeRequest) error
    ControllerPublishVolume(req *ControllerPublishVolumeRequest) error
    ControllerUnpublishVolume(req *ControllerUnpublishVolumeRequest) error
}

type NodeServer interface {
    NodeStageVolume(req *NodeStageVolumeRequest) error
    NodeUnstageVolume(req *NodeUnstageVolumeRequest) error
    NodePublishVolume(req *NodePublishVolumeRequest) error
    NodeUnpublishVolume(req *NodeUnpublishVolumeRequest) error
}

// Volume lifecycle:
// 1. CreateVolume (Controller) - Create storage volume
// 2. ControllerPublishVolume (Controller) - Attach to node
// 3. NodeStageVolume (Node) - Mount to staging path
// 4. NodePublishVolume (Node) - Bind mount to pod path
// 5. NodeUnpublishVolume (Node) - Unmount from pod
// 6. NodeUnstageVolume (Node) - Unmount from staging
// 7. ControllerUnpublishVolume (Controller) - Detach from node
// 8. DeleteVolume (Controller) - Delete volume

// Kubernetes components call CSI:
// - PV controller: CreateVolume, DeleteVolume
// - Attach/Detach controller: ControllerPublish/Unpublish
// - Kubelet: NodeStage, NodePublish, NodeUnpublish, NodeUnstage
```
:p What is CSI and how does Kubernetes interact with it?
??x
CSI (Container Storage Interface) is a gRPC standard for storage plugins. Storage vendors implement CSI, Kubernetes calls it.

Three servers:
1. Identity: Plugin info and capabilities
2. Controller: Create/delete volumes, attach/detach
3. Node: Mount/unmount on node

Volume attach flow:
1. CreateVolume: Create in storage system
2. ControllerPublishVolume: Attach to node (e.g., attach EBS to EC2)
3. NodeStageVolume: Global mount on node
4. NodePublishVolume: Bind mount into pod

Detach reverses the process.

Benefits: Storage logic outside Kubernetes core, standard interface, easier to add new storage types.
x??

---

#### Container Network Interface (CNI)
CNI plugins configure pod networking. Kubelet calls CNI plugins to setup/teardown network.

```go
// CNI plugin interface (called by kubelet)
type CNI interface {
    AddNetwork(ctx, netconf, runtimeConf) (*Result, error)
    DelNetwork(ctx, netconf, runtimeConf) error
}

// Pod creation network flow:
func (kl *Kubelet) setupPodNetwork(pod *Pod) error {
    // 1. Create network namespace
    netns := createNetworkNamespace(pod)

    // 2. Call CNI plugin
    result, err := kl.cni.AddNetwork(context.Background(), &CNIConfig{
        NetworkConfig: kl.networkConfig,  // CNI config file
        RuntimeConfig: &RuntimeConfig{
            ContainerID: pod.ID,
            NetNS:       netns,
            IfName:      "eth0",
        },
    })

    // 3. CNI plugin returns IP and routes
    pod.Status.PodIP = result.IPs[0].Address.IP
    return nil
}

// Example CNI plugin implementation:
func (p *BridgePlugin) AddNetwork(config, runtime) (*Result, error) {
    // 1. Create veth pair
    veth := createVethPair()

    // 2. Move one end to pod netns
    moveToNetNS(veth.PodEnd, runtime.NetNS)

    // 3. Attach other end to bridge
    attachToBridge(veth.HostEnd, "cni0")

    // 4. Allocate IP from IPAM
    ip := p.ipam.AllocateIP()

    // 5. Configure pod interface
    configureInterface(veth.PodEnd, ip)

    // 6. Setup routes
    addRoute(veth.PodEnd, "0.0.0.0/0", "169.254.1.1")

    return &Result{IPs: []IP{ip}}, nil
}

// CNI config file (/etc/cni/net.d/10-bridge.conf)
{
    "cniVersion": "0.4.0",
    "name": "mynet",
    "type": "bridge",
    "bridge": "cni0",
    "ipam": {
        "type": "host-local",
        "subnet": "10.244.0.0/16"
    }
}
```
:p How does CNI enable pluggable networking in Kubernetes?
??x
CNI (Container Network Interface) is a spec for network plugins. Kubelet calls CNI plugins via executables.

Operations:
1. ADD: Setup network for container
2. DEL: Teardown network
3. CHECK: Verify network (optional)

Flow:
1. Kubelet creates network namespace
2. Calls CNI plugin binary with config JSON
3. Plugin configures network (veth, IP, routes)
4. Returns IP address
5. Kubelet updates pod status

Common plugins:
- Calico: BGP routing
- Flannel: Overlay network
- Cilium: eBPF-based
- Bridge: Simple L2 bridge

Each provides different features (network policy, encryption, etc).
x??

---

#### Device Plugin Framework
Device plugins expose hardware devices (GPUs, FPGAs) to kubelet via gRPC.

```go
// Device plugin gRPC interface
type DevicePluginServer interface {
    GetDevicePluginOptions() (*DevicePluginOptions, error)
    ListAndWatch(empty *Empty, stream DevicePlugin_ListAndWatchServer) error
    Allocate(req *AllocateRequest) (*AllocateResponse, error)
}

// Example: GPU device plugin
type GPUPlugin struct {
    devices []*Device
}

func (p *GPUPlugin) ListAndWatch(empty *Empty, stream DevicePlugin_ListAndWatchServer) error {
    // Continuously send device list
    for {
        devices := []*Device{}

        // Discover GPUs
        for i := 0; i < p.numGPUs; i++ {
            devices = append(devices, &Device{
                ID:     fmt.Sprintf("nvidia-gpu-%d", i),
                Health: Healthy,
            })
        }

        // Send to kubelet
        stream.Send(&ListAndWatchResponse{Devices: devices})

        time.Sleep(10 * time.Second)
    }
}

func (p *GPUPlugin) Allocate(req *AllocateRequest) (*AllocateResponse, error) {
    responses := []*ContainerAllocateResponse{}

    for _, id := range req.DevicesIDs {
        // Return device specs for container
        responses = append(responses, &ContainerAllocateResponse{
            Devices: []*DeviceSpec{{
                HostPath:      fmt.Sprintf("/dev/nvidia%s", id),
                ContainerPath: fmt.Sprintf("/dev/nvidia%s", id),
                Permissions:   "rw",
            }},
            Envs: map[string]string{
                "NVIDIA_VISIBLE_DEVICES": id,
            },
        })
    }

    return &AllocateResponse{ContainerResponses: responses}, nil
}

// Pod requests devices via resources
spec:
  containers:
  - name: gpu-container
    resources:
      limits:
        nvidia.com/gpu: 2  # Request 2 GPUs
```
:p How do device plugins expose hardware to Kubernetes?
??x
Device plugins are gRPC servers that advertise and allocate hardware devices to kubelet.

Interface:
1. **ListAndWatch**: Stream available devices and health
2. **Allocate**: Return device configuration for container

Flow:
1. Plugin registers with kubelet
2. Plugin continuously sends device list
3. Pod requests device via resources.limits
4. Scheduler filters nodes with available devices
5. Kubelet calls Allocate on chosen node
6. Plugin returns device paths, env vars
7. Kubelet mounts devices into container

Kubelet tracks device allocations, prevents over-subscription.

Examples: nvidia.com/gpu, amd.com/gpu, intel.com/fpga
x??

---

#### API Aggregation Layer
API aggregation allows extending Kubernetes API with custom API servers without modifying core.

```go
// APIService resource
type APIService struct {
    Spec APIServiceSpec {
        Group:   "metrics.k8s.io"
        Version: "v1beta1"
        Service: &ServiceReference{
            Namespace: "kube-system"
            Name:      "metrics-server"
            Port:      443
        }
        GroupPriorityMinimum: 100
        VersionPriority:      100
    }
}

// Request flow:
// 1. Client: GET /apis/metrics.k8s.io/v1beta1/nodes
// 2. API server: Checks APIService registry
// 3. API server: Proxies to metrics-server service
// 4. Metrics server: Handles request, returns response
// 5. API server: Returns response to client

// Implementing aggregated API server
type MetricsServer struct {
    genericapiserver.GenericAPIServer
}

func (s *MetricsServer) InstallAPIGroups() {
    apiGroupInfo := genericapiserver.NewDefaultAPIGroupInfo(
        "metrics.k8s.io",
        Scheme,
        ParameterCodec,
        Codecs,
    )

    apiGroupInfo.VersionedResourcesStorageMap["v1beta1"] = map[string]rest.Storage{
        "nodes": &nodeMetricsStorage{},
        "pods":  &podMetricsStorage{},
    }

    s.InstallAPIGroup(&apiGroupInfo)
}

// Aggregation vs CRD:
// CRD: Stored in etcd, standard CRUD
// Aggregation: Custom storage/logic, can be non-etcd
```
:p What is API aggregation and when is it used instead of CRDs?
??x
API aggregation extends Kubernetes API by proxying requests to separate API servers.

How it works:
1. Create APIService resource specifying group/version
2. Point to backend service
3. kube-apiserver proxies matching requests
4. Backend handles with custom logic

APIService vs CRD:

**CRD**:
- Stored in etcd
- Standard CRUD operations
- Built-in watch/list
- Simpler to use

**Aggregation**:
- Custom storage (non-etcd)
- Custom business logic
- Real-time computed data
- More complex

Use aggregation for: metrics (metrics-server), custom auth (auth providers), computed/external data.

Example: metrics-server computes metrics on-demand, doesn't store in etcd.
x??

---

#### StatefulSet Ordinal Identity
StatefulSets provide stable identity via ordinal naming and persistent storage.

```go
// StatefulSet pod naming
// StatefulSet name: mysql
// Pods: mysql-0, mysql-1, mysql-2 (ordinal suffixes)

func (ssc *StatefulSetController) createPod(set *StatefulSet, ordinal int) {
    pod := &Pod{
        ObjectMeta: metav1.ObjectMeta{
            Name: fmt.Sprintf("%s-%d", set.Name, ordinal),
            Labels: set.Spec.Template.Labels,
        },
    }

    // Create PVC for each volumeClaimTemplate
    for _, template := range set.Spec.VolumeClaimTemplates {
        pvc := &PersistentVolumeClaim{
            ObjectMeta: metav1.ObjectMeta{
                // PVC name: <template>-<statefulset>-<ordinal>
                Name: fmt.Sprintf("%s-%s-%d", template.Name, set.Name, ordinal),
            },
            Spec: template.Spec,
        }
        ssc.createPVC(pvc)

        // Mount PVC in pod
        pod.Spec.Volumes = append(pod.Spec.Volumes, Volume{
            Name: template.Name,
            VolumeSource: VolumeSource{
                PersistentVolumeClaim: &PVCVolumeSource{
                    ClaimName: pvc.Name,
                },
            },
        })
    }
}

// Ordered operations
func (ssc *StatefulSetController) reconcile(set *StatefulSet) {
    // Create pods in order: 0, 1, 2, ...
    for i := 0; i < set.Spec.Replicas; i++ {
        if !podExists(set, i) {
            createPod(set, i)
            return  // Wait for pod-i to be ready before creating pod-(i+1)
        }
    }

    // Delete in reverse order: N, N-1, ..., 0
    for i := set.Spec.Replicas - 1; i >= 0; i-- {
        if podNeedsDelete(set, i) {
            deletePod(set, i)
            return  // Wait for delete before continuing
        }
    }
}
```
:p How do StatefulSets provide stable identity for pods?
??x
StatefulSets assign ordinal indices (0, 1, 2...) that determine pod names, hostnames, and PVC bindings.

Identity components:
1. **Name**: {statefulset}-{ordinal} (mysql-0, mysql-1)
2. **Hostname**: Same as name
3. **DNS**: {pod}.{service}.{namespace}.svc.cluster.local
4. **PVC**: {volume}-{statefulset}-{ordinal}

Guarantees:
- Name persists across reschedules
- Same pod always gets same PVC
- Ordinal never reused until pod deleted

Ordering:
- Create: 0 → 1 → 2 (wait for each ready)
- Delete: 2 → 1 → 0 (reverse order)
- Update: 2 → 1 → 0 (reverse for rolling)

Use case: Databases where identity/storage matters (master-slave replication).
x??

---

#### DaemonSet Node Selection
DaemonSets ensure one pod per node, using node selectors and taints/tolerations for targeting.

```go
// DaemonSet controller
func (dsc *DaemonSetController) syncDaemonSet(ds *DaemonSet) error {
    // 1. Get all nodes
    allNodes := dsc.nodeLister.List()

    // 2. Filter nodes that should run pod
    targetNodes := []Node{}
    for _, node := range allNodes {
        if shouldRun, _ := dsc.nodeShouldRunDaemonPod(node, ds); shouldRun {
            targetNodes = append(targetNodes, node)
        }
    }

    // 3. Create missing pods
    for _, node := range targetNodes {
        if !hasPod(node, ds) {
            dsc.createPod(ds, node)
        }
    }

    // 4. Delete pods on wrong nodes
    existingPods := dsc.getPodsForDaemonSet(ds)
    for _, pod := range existingPods {
        if !shouldRunOn(pod.Spec.NodeName, targetNodes) {
            dsc.deletePod(pod)
        }
    }
}

func (dsc *DaemonSetController) nodeShouldRunDaemonPod(node *Node, ds *DaemonSet) bool {
    // Check node selector
    if !nodeMatchesSelector(node, ds.Spec.Template.Spec.NodeSelector) {
        return false
    }

    // Check taints/tolerations
    for _, taint := range node.Spec.Taints {
        if !podToleratesTaint(ds.Spec.Template.Spec.Tolerations, taint) {
            return false
        }
    }

    // Check affinity
    if !nodeMatchesAffinity(node, ds.Spec.Template.Spec.Affinity) {
        return false
    }

    return true
}

// DaemonSet with tolerations for master
spec:
  template:
    spec:
      tolerations:
      - key: node-role.kubernetes.io/master
        effect: NoSchedule
```
:p How does DaemonSet determine which nodes should run pods?
??x
DaemonSet controller evaluates each node against pod's node selector, tolerations, and affinity.

Evaluation:
1. Node selector: node.labels match pod.spec.nodeSelector
2. Taints: pod tolerates all node taints
3. Affinity: node matches required affinity rules

Creates pod if all pass, deletes if node no longer matches.

Common patterns:
- All nodes: No selector
- Master nodes: Tolerate master taint
- Specific nodes: Node selector (e.g., disk=ssd)

DaemonSets bypass scheduler for pod creation, directly assign spec.nodeName.

Use case: Log collectors, monitoring agents, storage daemons.
x??

---

#### Job and CronJob Controllers
Jobs ensure pods run to completion. CronJobs create Jobs on schedule.

```go
// Job controller
func (jc *JobController) syncJob(job *Job) error {
    active := countActivePods(job)
    succeeded := countSucceededPods(job)
    failed := countFailedPods(job)

    // Check completion
    if succeeded >= job.Spec.Completions {
        job.Status.Conditions = append(job.Status.Conditions, JobCondition{
            Type:   JobComplete,
            Status: ConditionTrue,
        })
        return nil
    }

    // Check failure
    if failed >= job.Spec.BackoffLimit {
        job.Status.Conditions = append(job.Status.Conditions, JobCondition{
            Type:   JobFailed,
            Status: ConditionTrue,
        })
        return nil
    }

    // Calculate parallelism
    parallelism := job.Spec.Parallelism
    completions := job.Spec.Completions

    // How many pods should be running?
    wantActive := min(parallelism, completions-succeeded)

    // Create pods if needed
    if active < wantActive {
        jc.createPods(job, wantActive-active)
    }

    // Delete excess pods
    if active > wantActive {
        jc.deletePods(job, active-wantActive)
    }
}

// CronJob controller
func (cc *CronJobController) syncCronJob(cj *CronJob) error {
    // Parse schedule
    sched, _ := cron.Parse(cj.Spec.Schedule)

    // Get next run time
    nextRun := sched.Next(cj.Status.LastScheduleTime)

    if time.Now().After(nextRun) {
        // Time to create job
        job := createJobFromTemplate(cj.Spec.JobTemplate)
        cc.createJob(job)

        cj.Status.LastScheduleTime = &metav1.Time{Time: time.Now()}
    }

    // Cleanup old jobs
    if cj.Spec.SuccessfulJobsHistoryLimit != nil {
        cleanupOldJobs(cj, *cj.Spec.SuccessfulJobsHistoryLimit)
    }
}
```
:p How do Job and CronJob controllers ensure task completion?
??x
Job controller manages pods until desired completions reached or backoff limit exceeded.

Job behavior:
- Completions: How many successful pods needed
- Parallelism: Max concurrent pods
- BackoffLimit: Max failures before giving up

States:
- Active: Pods running
- Succeeded: Pods completed successfully
- Failed: Pods failed

Controller maintains: active + succeeded + failed pods.

CronJob:
- Parses cron schedule (e.g., "0 * * * *")
- Creates Job at scheduled time
- Tracks lastScheduleTime
- Cleans up old Jobs per historyLimit

Missed runs: ConcurrencyPolicy controls (Allow/Forbid/Replace).
x??

---

#### Service Mesh and Sidecar Injection
Admission webhooks inject sidecar containers for service mesh functionality.

```go
// Mutating webhook that injects Envoy sidecar
func (w *SidecarInjector) Handle(req admission.Request) admission.Response {
    pod := &corev1.Pod{}
    json.Unmarshal(req.Object.Raw, pod)

    // Check if injection needed
    if pod.Annotations["sidecar-injection"] != "enabled" {
        return admission.Allowed("injection not enabled")
    }

    // Inject init container (iptables rules)
    pod.Spec.InitContainers = append(pod.Spec.InitContainers, corev1.Container{
        Name:  "istio-init",
        Image: "istio/proxy_init:1.10",
        Args: []string{
            "-p", "15001",  // Envoy port
            "-u", "1337",   // Envoy user
        },
        SecurityContext: &corev1.SecurityContext{
            Capabilities: &corev1.Capabilities{
                Add: []corev1.Capability{"NET_ADMIN"},
            },
        },
    })

    // Inject sidecar container (Envoy proxy)
    pod.Spec.Containers = append(pod.Spec.Containers, corev1.Container{
        Name:  "istio-proxy",
        Image: "istio/proxyv2:1.10",
        Ports: []corev1.ContainerPort{
            {ContainerPort: 15001, Name: "proxy"},
            {ContainerPort: 15090, Name: "metrics"},
        },
        Env: []corev1.EnvVar{
            {Name: "POD_NAME", ValueFrom: &corev1.EnvVarSource{
                FieldRef: &corev1.ObjectFieldSelector{FieldPath: "metadata.name"},
            }},
        },
    })

    // Return patched pod
    marshaledPod, _ := json.Marshal(pod)
    return admission.PatchResponseFromRaw(req.Object.Raw, marshaledPod)
}
```
:p How does sidecar injection work for service meshes?
??x
Mutating admission webhooks intercept pod creation and inject sidecar containers.

Injection process:
1. Pod created with annotation (e.g., sidecar-injection=enabled)
2. Webhook intercepts CREATE request
3. Webhook adds init container (setup iptables)
4. Webhook adds sidecar container (Envoy proxy)
5. Returns modified pod spec
6. Kubelet starts both app and sidecar

Init container:
- Runs first
- Configures iptables to redirect traffic to proxy
- Requires NET_ADMIN capability

Sidecar container:
- Runs alongside app
- Intercepts all network traffic
- Provides mTLS, tracing, metrics

Transparent to application - no code changes needed.
x??

---
