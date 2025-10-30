# Kubernetes Concepts Flashcards

#### Kubelet Main Responsibility
The kubelet is the primary node agent running on each Kubernetes worker node. It ensures containers are running in pods according to PodSpecs received from the API server.

The kubelet's main loop continuously:
```go
// Pseudocode of kubelet's main sync loop
func (kl *Kubelet) syncLoop() {
    for {
        // 1. Get pod updates from API server
        pods := kl.getPodUpdates()

        // 2. Sync each pod
        for _, pod := range pods {
            kl.SyncPod(pod)
        }

        // 3. Perform housekeeping
        kl.cleanupPods()

        // 4. Wait for next iteration
        time.Sleep(syncFrequency)
    }
}
```
:p What is the primary responsibility of the kubelet and how does it work?
??x
The kubelet ensures containers are running in pods as specified by the API server.

It runs a continuous sync loop that:
1. Fetches pod specifications from the API server
2. Compares desired state (PodSpec) with actual state (running containers)
3. Takes corrective action (start/stop containers) to match desired state
4. Reports pod status back to the API server
x??

---

#### Kubernetes Control Plane Components
The control plane manages the cluster and makes global decisions. It consists of:
- kube-apiserver: REST API frontend
- kube-controller-manager: Runs controller processes
- kube-scheduler: Assigns pods to nodes

```go
// Simplified control plane flow
func handlePodCreation(pod Pod) {
    // 1. API Server validates and persists
    apiServer.Validate(pod)
    apiServer.PersistToEtcd(pod)

    // 2. Scheduler assigns node
    node := scheduler.SelectNode(pod)
    pod.Spec.NodeName = node

    // 3. Kubelet on that node starts containers
    kubelet[node].SyncPod(pod)
}
```
:p What are the three main control plane components and their roles?
??x
1. **kube-apiserver**: Frontend for the control plane, validates and processes REST requests, persists cluster state to etcd
2. **kube-controller-manager**: Runs controllers that watch cluster state and make changes to move current state toward desired state
3. **kube-scheduler**: Watches for newly created pods with no assigned node and selects a node for them to run on based on resource requirements and constraints
x??

---

#### Controller Pattern in Kubernetes
Controllers implement the reconciliation loop pattern - they continuously watch the desired state and actual state, then take action to reconcile differences.

```go
// Generic controller reconciliation pattern
func (c *Controller) Run() {
    for {
        // 1. Watch for changes
        obj := c.queue.Get()

        // 2. Get desired state
        desiredState := c.getDesiredState(obj)

        // 3. Get current/actual state
        actualState := c.getCurrentState(obj)

        // 4. Reconcile: make actual match desired
        if !reflect.DeepEqual(desiredState, actualState) {
            c.reconcile(desiredState, actualState)
        }

        // 5. Update status
        c.updateStatus(obj)
    }
}

// Example: ReplicaSet Controller
func (rsc *ReplicaSetController) reconcile(rs ReplicaSet) {
    currentReplicas := len(rsc.getPodsForReplicaSet(rs))
    desiredReplicas := rs.Spec.Replicas

    if currentReplicas < desiredReplicas {
        // Create missing pods
        rsc.createPods(desiredReplicas - currentReplicas)
    } else if currentReplicas > desiredReplicas {
        // Delete excess pods
        rsc.deletePods(currentReplicas - desiredReplicas)
    }
}
```
:p What is the controller pattern and how does it work in Kubernetes?
??x
The controller pattern is a control loop that watches the cluster's desired state (spec) and actual state, then makes changes to move actual state toward desired state.

The reconciliation loop:
1. Watch for changes to resources
2. Read desired state from the spec
3. Read actual/current state
4. Compare them
5. Take action to reconcile differences
6. Update status

Example: ReplicaSet controller ensures the specified number of pod replicas are running by creating or deleting pods as needed.
x??

---

#### kube-apiserver Architecture
The API server is the central management component that exposes the Kubernetes API. All cluster communication goes through it.

```go
// Simplified API server request flow
func (s *APIServer) handleRequest(req Request) Response {
    // 1. Authentication: Who are you?
    user, err := s.authenticate(req)
    if err != nil {
        return Unauthorized
    }

    // 2. Authorization: Are you allowed?
    if !s.authorize(user, req.Resource, req.Verb) {
        return Forbidden
    }

    // 3. Admission Control: Validate/Mutate request
    req = s.runAdmissionControllers(req)

    // 4. Validation: Is the object valid?
    if !s.validate(req.Object) {
        return BadRequest
    }

    // 5. Persist to etcd
    s.etcd.Store(req.Object)

    // 6. Return response
    return Success
}
```
:p What is the role of kube-apiserver and what stages does it process requests through?
??x
kube-apiserver is the central management component that exposes the Kubernetes REST API. All cluster operations go through it.

Request processing stages:
1. **Authentication**: Verify the caller's identity
2. **Authorization**: Check if the caller has permission for the operation
3. **Admission Control**: Run admission webhooks that can validate or mutate the request
4. **Validation**: Verify the object schema is valid
5. **Persistence**: Store the object in etcd
6. **Response**: Return result to caller

It's the only component that directly writes to etcd.
x??

---

#### Kubernetes Package Organization
The Kubernetes repository uses a specific package structure to separate concerns:
- `cmd/`: Entry points for binaries
- `pkg/`: Implementation logic
- `staging/`: Libraries published as separate modules

```go
// Example: How kubectl uses staged libraries
// In cmd/kubectl/kubectl.go (binary entry point)
package main

import (
    // Staged library - published as k8s.io/kubectl
    "k8s.io/kubectl/pkg/cmd"

    // Internal package - not for external use
    "k8s.io/kubernetes/pkg/version"
)

func main() {
    // Binary just calls into the library
    cmd.Execute()
}

// In staging/src/k8s.io/kubectl/pkg/cmd/cmd.go (library)
package cmd

func Execute() {
    // Actual implementation
    rootCmd.Execute()
}
```
:p How is the Kubernetes codebase organized and what is the purpose of each main directory?
??x
**Main directories:**
1. **cmd/**: Binary entry points - minimal main() functions that call into pkg/ or staging/
2. **pkg/**: Internal implementation packages - core logic not meant for external use
3. **staging/**: Source for separately published Go modules (e.g., k8s.io/client-go, k8s.io/kubectl)

**Pattern:**
- Binaries in `cmd/` are thin wrappers
- Real logic lives in `pkg/` or `staging/`
- `staging/` code is published as separate modules for external consumption
- Internal packages use `k8s.io/kubernetes/pkg/*`
- External packages use `k8s.io/component/*`

Example: `cmd/kubectl/kubectl.go` imports `k8s.io/kubectl/pkg/cmd` from staging.
x??

---

#### klog Verbosity Levels
Kubernetes uses klog for structured logging with verbosity levels that control what messages are shown.

```go
import "k8s.io/klog/v2"

func exampleLogging() {
    // Level 0: Always shown - use sparingly for critical info
    klog.Info("Server starting on port 8080")
    klog.Error("Failed to connect to database")

    // Level 1: Generally useful info
    klog.V(1).Info("Processing user request")

    // Level 2: Useful steady-state information
    klog.V(2).Info("Cache hit for key: user-123")

    // Level 3: Extended information about changes
    klog.V(3).Infof("Updating resource: %v -> %v", old, new)

    // Level 4: Debug-level verbosity
    klog.V(4).Info("Entering function processRequest()")

    // Level 5+: Trace-level verbosity
    klog.V(5).Infof("Variable state: x=%d, y=%d", x, y)
}

// Usage with flags:
// kubectl get pods -v=0  // Only Info/Error
// kubectl get pods -v=2  // Level 0, 1, 2
// kubectl get pods -v=4  // Level 0-4
```
:p What are klog verbosity levels and when should each be used?
??x
klog uses numeric verbosity levels (0-9+) to control logging output:

**Levels:**
- **0** (default): Critical info, always shown - use for important state changes, errors
- **1**: Generally useful steady-state info - successful operations
- **2**: Useful detailed steady-state info - cache hits, routine operations
- **3**: Extended information about changes - state transitions
- **4+**: Debug/trace level - function entry/exit, variable values

**Rules:**
- Lower number = more important
- Messages show if verbosity flag >= message level
- `klog.Info()` = level 0, always shown
- `klog.V(n).Info()` = only shown if `-v=n` or higher

**Usage:**
```go
klog.V(2).Info("msg")  // Shows with -v=2 or higher
```
x??

---

#### Pod Lifecycle and SyncPod
A Pod goes through several phases managed by the kubelet's SyncPod function, which is the main reconciliation logic.

```go
// Simplified SyncPod logic
func (kl *Kubelet) SyncPod(pod *v1.Pod) error {
    // 1. Check if pod should be running
    if kl.shouldPodBeDeleted(pod) {
        kl.killPod(pod)
        return nil
    }

    // 2. Create pod sandbox (network namespace)
    podSandbox, err := kl.createPodSandbox(pod)
    if err != nil {
        return err
    }

    // 3. Start init containers sequentially
    for _, initContainer := range pod.Spec.InitContainers {
        err := kl.startContainer(pod, initContainer, podSandbox)
        if err != nil {
            return err  // Init containers must succeed
        }
    }

    // 4. Start regular containers
    for _, container := range pod.Spec.Containers {
        if !kl.isContainerRunning(container) {
            kl.startContainer(pod, container, podSandbox)
        }
    }

    // 5. Update pod status
    kl.statusManager.SetPodStatus(pod, status)

    return nil
}
```
:p What are the main steps the kubelet's SyncPod function performs to reconcile a pod?
??x
SyncPod is the kubelet's main reconciliation function for a single pod:

**Steps:**
1. **Check if pod should run**: If marked for deletion, kill the pod and return
2. **Create pod sandbox**: Set up the network namespace and shared resources
3. **Run init containers**: Start init containers sequentially - all must succeed
4. **Start regular containers**: Start all containers defined in spec (parallel)
5. **Update status**: Report pod status back to API server

**Key points:**
- Init containers run sequentially and must complete successfully
- Regular containers start in parallel
- If any step fails, it's retried on next sync
- Runs continuously in a loop to maintain desired state
x??

---

#### Kubernetes API Versioning
Kubernetes APIs use versioning to maintain backward compatibility. Resources evolve through alpha, beta, and stable versions.

```go
// Example: Deployment API versions

// Alpha (v1alpha1) - Experimental, may change
// File: pkg/apis/apps/v1alpha1/types.go
package v1alpha1
type Deployment struct {
    Spec DeploymentSpec
}

// Beta (v1beta1) - More stable, but may still change
// File: pkg/apis/apps/v1beta1/types.go
package v1beta1
type Deployment struct {
    Spec DeploymentSpec  // May have different fields than alpha
}

// Stable (v1) - Production ready, guaranteed compatibility
// File: pkg/apis/apps/v1/types.go
package v1
type Deployment struct {
    Spec DeploymentSpec  // Stable schema
}

// Conversion between versions
func Convert_v1beta1_Deployment_To_v1_Deployment(
    in *v1beta1.Deployment,
    out *v1.Deployment,
) error {
    // Conversion logic
    out.Spec = convertSpec(in.Spec)
    return nil
}
```
:p How does Kubernetes handle API versioning and what are the version stages?
??x
Kubernetes uses API versioning to evolve resources while maintaining backward compatibility.

**Version stages:**
1. **Alpha (v1alpha1, v1alpha2)**:
   - Experimental, disabled by default
   - May change or be removed without notice
   - For testing new features

2. **Beta (v1beta1, v1beta2)**:
   - More stable, enabled by default
   - Schema may change but with migration path
   - Feature-complete but needs real-world testing

3. **Stable (v1, v2)**:
   - Production ready
   - Changes must be backward compatible
   - Guaranteed support for many releases

**How it works:**
- Each version has its own Go types
- Conversion functions translate between versions
- API server stores in an internal version
- Clients can use any supported version

Example: `apps/v1beta1` → `apps/v1` for Deployments
x??

---

#### Container Runtime Interface (CRI)
The CRI is a plugin interface that enables the kubelet to use different container runtimes without recompiling.

```go
// Simplified CRI interface
type RuntimeService interface {
    // Pod sandbox operations
    RunPodSandbox(config *PodSandboxConfig) (string, error)
    StopPodSandbox(podSandboxID string) error
    RemovePodSandbox(podSandboxID string) error

    // Container operations
    CreateContainer(podSandboxID string,
                    config *ContainerConfig) (string, error)
    StartContainer(containerID string) error
    StopContainer(containerID string, timeout int64) error
    RemoveContainer(containerID string) error

    // Status operations
    ContainerStatus(containerID string) (*ContainerStatus, error)
}

// Kubelet uses CRI to manage containers
func (kl *Kubelet) startContainer(
    pod *v1.Pod,
    container *v1.Container,
) error {
    // 1. Create container via CRI
    containerID, err := kl.runtimeService.CreateContainer(
        pod.Status.SandboxID,
        containerConfig,
    )

    // 2. Start container via CRI
    err = kl.runtimeService.StartContainer(containerID)

    return err
}
```
:p What is the Container Runtime Interface (CRI) and why is it important?
??x
CRI is a plugin interface that decouples the kubelet from specific container runtime implementations.

**Purpose:**
- Allows kubelet to work with any CRI-compatible runtime
- No need to recompile kubelet for different runtimes
- Standard interface for container operations

**Main operations:**
1. **Sandbox operations**: RunPodSandbox, StopPodSandbox (network/storage setup)
2. **Container operations**: Create, Start, Stop, Remove containers
3. **Status operations**: Get container and pod sandbox status
4. **Image operations**: Pull, list, remove images

**Common runtimes:**
- containerd (most popular)
- CRI-O
- Docker Engine (via cri-dockerd shim)

**Flow:**
kubelet → CRI API → runtime → actual containers

This abstraction lets Kubernetes support multiple container runtimes through a single interface.
x??

---

#### Kubernetes Build System
Kubernetes uses Make and Go to build binaries. Understanding the build system helps with development.

```bash
# Makefile structure (simplified)
# File: build/root/Makefile

# Build everything
all: build test

# Build specific component
build-kubectl:
    go build -o _output/bin/kubectl \
        k8s.io/kubernetes/cmd/kubectl

# Build with tags/version
build-with-version:
    go build \
        -ldflags "-X k8s.io/kubernetes/pkg/version.gitVersion=$(GIT_VERSION)" \
        -o _output/bin/kubectl \
        k8s.io/kubernetes/cmd/kubectl

# Run tests
test:
    go test ./pkg/... ./cmd/...

# Cross-compilation for different platforms
build-linux:
    GOOS=linux GOARCH=amd64 go build -o _output/bin/kubectl-linux \
        k8s.io/kubernetes/cmd/kubectl
```

```go
// Version information injected at build time
// File: pkg/version/base.go
package version

var (
    gitVersion   = "v0.0.0-master+$Format:%h$"
    gitCommit    = "$Format:%H$"
    buildDate    = "1970-01-01T00:00:00Z"
)

func Get() Info {
    return Info{
        GitVersion: gitVersion,  // Set by -ldflags at build
        GitCommit:  gitCommit,
        BuildDate:  buildDate,
    }
}
```
:p How does the Kubernetes build system work and what are the key make targets?
??x
Kubernetes uses Make as a build wrapper around Go tools.

**Key Make targets:**
- `make`: Build all binaries
- `make WHAT=cmd/kubectl`: Build specific component (faster)
- `make test`: Run all tests
- `make clean`: Remove built artifacts
- `make quick-release`: Build release artifacts

**How building works:**
1. Make calls Go build commands
2. Binaries output to `_output/bin/`
3. Version info injected via `-ldflags`
4. Cross-compilation supported (GOOS, GOARCH)

**Example:**
```bash
make WHAT=cmd/kubectl
# Produces: _output/bin/kubectl

# Equivalent to:
go build -o _output/bin/kubectl \
    k8s.io/kubernetes/cmd/kubectl
```

**Build optimization:**
- Build specific components with WHAT= for speed
- Use Go build cache for incremental builds
- Cross-compile for different platforms

**Version injection:**
Build-time flags set version variables that show in `kubectl version`.
x??

---

#### Admission Controllers
Admission controllers intercept API requests after authentication/authorization but before persisting to etcd. They can validate or mutate requests.

```go
// Admission controller interface
type Interface interface {
    // Admit can modify the object or reject the request
    Admit(attrs Attributes) error
}

// Example: PodSecurity admission controller
type PodSecurityAdmission struct{}

func (p *PodSecurityAdmission) Admit(attrs Attributes) error {
    pod := attrs.GetObject().(*v1.Pod)

    // Validate: Reject privileged pods in restricted namespace
    if attrs.GetNamespace() == "production" {
        for _, container := range pod.Spec.Containers {
            if container.SecurityContext.Privileged {
                return errors.New("privileged pods not allowed")
            }
        }
    }

    return nil
}

// Example: Mutating admission - add default labels
type DefaultLabels struct{}

func (d *DefaultLabels) Admit(attrs Attributes) error {
    pod := attrs.GetObject().(*v1.Pod)

    // Mutate: Add default labels if not present
    if pod.Labels == nil {
        pod.Labels = make(map[string]string)
    }
    if _, exists := pod.Labels["environment"]; !exists {
        pod.Labels["environment"] = "development"
    }

    return nil
}
```
:p What are admission controllers and how do they work in the API request flow?
??x
Admission controllers are plugins that intercept API requests before objects are persisted to etcd. They run after authentication and authorization.

**Types:**
1. **Validating**: Can accept or reject requests, cannot modify objects
2. **Mutating**: Can modify objects before they're stored

**When they run:**
Authentication → Authorization → **Mutating Admission** → **Validating Admission** → Validation → Persist to etcd

**Common uses:**
- Enforce security policies (PodSecurity)
- Set defaults (DefaultStorageClass)
- Inject sidecars (Istio)
- Validate resource quotas
- Add labels/annotations

**Example flow:**
```
1. User creates pod with no labels
2. Mutating admission adds default labels
3. Validating admission checks security policies
4. If all pass, pod saved to etcd
```

**Built-in vs Webhook:**
- Built-in: Compiled into API server
- Webhook: External service via HTTP

Key: They modify or validate BEFORE storage, so all persisted objects meet requirements.
x??

---

#### Kubernetes Client-Go
client-go is the official Go client library for Kubernetes. It provides typed clients, informers, and workqueues for building controllers.

```go
// Using client-go to interact with Kubernetes
package main

import (
    "context"
    "k8s.io/client-go/kubernetes"
    "k8s.io/client-go/tools/clientcmd"
    metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

func main() {
    // 1. Build config from kubeconfig
    config, err := clientcmd.BuildConfigFromFlags("", "/path/to/kubeconfig")

    // 2. Create clientset
    clientset, err := kubernetes.NewForConfig(config)

    // 3. Use typed client to get pods
    pods, err := clientset.CoreV1().
        Pods("default").
        List(context.TODO(), metav1.ListOptions{})

    // 4. Iterate results
    for _, pod := range pods.Items {
        println(pod.Name)
    }
}

// Building a controller with informers
import (
    "k8s.io/client-go/informers"
    "k8s.io/client-go/tools/cache"
)

func runController(clientset *kubernetes.Clientset) {
    // 1. Create informer factory
    factory := informers.NewSharedInformerFactory(clientset, 0)

    // 2. Get pod informer
    podInformer := factory.Core().V1().Pods()

    // 3. Add event handlers
    podInformer.Informer().AddEventHandler(cache.ResourceEventHandlerFuncs{
        AddFunc: func(obj interface{}) {
            pod := obj.(*v1.Pod)
            println("Pod added:", pod.Name)
        },
        UpdateFunc: func(oldObj, newObj interface{}) {
            pod := newObj.(*v1.Pod)
            println("Pod updated:", pod.Name)
        },
        DeleteFunc: func(obj interface{}) {
            pod := obj.(*v1.Pod)
            println("Pod deleted:", pod.Name)
        },
    })

    // 4. Start informer
    factory.Start(stopCh)
}
```
:p What is client-go and what are its main components for building Kubernetes controllers?
??x
client-go is the official Go client library for interacting with Kubernetes APIs.

**Main components:**

1. **Clientset**: Typed clients for all API resources
```go
clientset.CoreV1().Pods(namespace).Get(name)
```

2. **Informers**: Watch resources and cache them locally
- Efficient: one watch per resource type
- Provides local cache
- Event handlers for Add/Update/Delete

3. **Workqueue**: Rate-limited queue for processing items
- Deduplication
- Retry with backoff
- Rate limiting

4. **Listers**: Read from informer cache (no API calls)
```go
lister.Pods(namespace).Get(name)  // from cache
```

**Controller pattern:**
1. Create clientset
2. Set up informer with event handlers
3. Event handlers add items to workqueue
4. Worker processes queue items
5. Use lister to get current state
6. Reconcile: make actual match desired

**Why informers:**
- Reduce API server load (one watch vs many Gets)
- Fast local reads from cache
- Eventual consistency model
x??

---

#### Etcd Role in Kubernetes
etcd is a distributed key-value store that serves as Kubernetes' backing store for all cluster data.

```go
// Conceptual: How API server uses etcd
type APIServer struct {
    etcdClient *etcd.Client
}

func (s *APIServer) CreatePod(pod *v1.Pod) error {
    // 1. Generate key
    key := "/registry/pods/" + pod.Namespace + "/" + pod.Name

    // 2. Serialize pod to JSON
    data, err := json.Marshal(pod)

    // 3. Store in etcd
    _, err = s.etcdClient.Put(context.Background(), key, string(data))

    return err
}

func (s *APIServer) GetPod(namespace, name string) (*v1.Pod, error) {
    // 1. Build key
    key := "/registry/pods/" + namespace + "/" + name

    // 2. Get from etcd
    resp, err := s.etcdClient.Get(context.Background(), key)

    // 3. Deserialize
    var pod v1.Pod
    json.Unmarshal(resp.Kvs[0].Value, &pod)

    return &pod, nil
}

func (s *APIServer) WatchPods(namespace string) {
    // Watch for changes
    keyPrefix := "/registry/pods/" + namespace + "/"
    watchChan := s.etcdClient.Watch(context.Background(), keyPrefix,
                                     clientv3.WithPrefix())

    for watchResp := range watchChan {
        for _, event := range watchResp.Events {
            // event.Type: PUT, DELETE
            // event.Kv.Key, event.Kv.Value
            handleEvent(event)
        }
    }
}
```
:p What is etcd's role in Kubernetes and how does the API server interact with it?
??x
etcd is the distributed key-value database that stores all Kubernetes cluster data. It's the single source of truth for cluster state.

**What's stored:**
- All resource definitions (pods, services, deployments, etc.)
- Cluster configuration
- Secrets and ConfigMaps
- Resource state and status

**Key operations:**
1. **Put**: Store resource (create/update)
2. **Get**: Retrieve resource
3. **Watch**: Monitor changes to keys
4. **Delete**: Remove resource

**Interaction pattern:**
- Only API server writes/reads from etcd directly
- Other components (kubelet, scheduler) interact via API server
- Key format: `/registry/{resource-type}/{namespace}/{name}`

**Why etcd:**
- Distributed: Multiple replicas for high availability
- Consistent: Strong consistency guarantees
- Watchable: Efficient change notification
- Reliable: Raft consensus algorithm

**Example:**
```
PUT /registry/pods/default/nginx
GET /registry/pods/default/nginx
WATCH /registry/pods/default/
```

Without etcd, Kubernetes loses all state and cannot function.
x??

---
