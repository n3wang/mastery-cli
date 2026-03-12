# Go Programming Patterns in Kubernetes Flashcards

#### Go Interfaces in Kubernetes
Kubernetes heavily uses interfaces to achieve decoupling and testability. Interfaces define behavior, not implementation.

```go
// Interface definition - what behavior is needed
type RuntimeService interface {
    CreateContainer(config *ContainerConfig) (string, error)
    StartContainer(containerID string) error
    StopContainer(containerID string) error
}

// Implementation 1: Real container runtime
type ContainerdRuntime struct {
    client *containerd.Client
}

func (c *ContainerdRuntime) CreateContainer(config *ContainerConfig) (string, error) {
    // Real implementation using containerd
    container, err := c.client.NewContainer(...)
    return container.ID(), err
}

// Implementation 2: Fake for testing
type FakeRuntime struct {
    containers map[string]*FakeContainer
}

func (f *FakeRuntime) CreateContainer(config *ContainerConfig) (string, error) {
    // Fake implementation for tests
    id := generateID()
    f.containers[id] = &FakeContainer{config: config}
    return id, nil
}

// Usage: Code depends on interface, not implementation
type Kubelet struct {
    runtime RuntimeService  // Can be real or fake
}

func (k *Kubelet) startPod(pod *Pod) {
    // Works with any RuntimeService implementation
    containerID, err := k.runtime.CreateContainer(...)
    k.runtime.StartContainer(containerID)
}
```
:p How does Kubernetes use Go interfaces and why are they important?
??x
Kubernetes uses interfaces extensively to define contracts between components without coupling to specific implementations.

**Benefits:**
1. **Decoupling**: Code depends on behavior (interface), not concrete types
2. **Testability**: Swap real implementations with fakes/mocks in tests
3. **Flexibility**: Multiple implementations of same interface
4. **Dependency Injection**: Pass different implementations

**Pattern:**
```go
// Define what you need
type Store interface {
    Get(key string) (value, error)
}

// Accept interfaces
func Process(store Store) {
    store.Get("key")  // Works with any Store
}

// Provide concrete types
realStore := &EtcdStore{}
fakeStore := &MemoryStore{}
Process(realStore)  // Production
Process(fakeStore)  // Testing
```

**In Kubernetes:**
- RuntimeService (CRI)
- VolumePlugin (CSI)
- NetworkPlugin (CNI)
- All use interfaces for pluggability

Small interfaces are preferred (single responsibility).
x??

---

#### Go Context in Kubernetes
Context is used throughout Kubernetes for cancellation, deadlines, and passing request-scoped values.

```go
import "context"

// Context with cancellation
func (kl *Kubelet) syncPods(ctx context.Context) {
    for {
        select {
        case <-ctx.Done():
            // Context cancelled - clean up and exit
            return
        case pod := <-kl.podUpdates:
            // Process pod with context
            kl.syncPod(ctx, pod)
        }
    }
}

// Context with timeout
func (kl *Kubelet) syncPod(ctx context.Context, pod *Pod) error {
    // Create context with 30 second timeout
    ctx, cancel := context.WithTimeout(ctx, 30*time.Second)
    defer cancel()

    // All operations must respect context
    if err := kl.runtime.CreateContainer(ctx, ...); err != nil {
        return err
    }

    return nil
}

// Passing values via context (used sparingly)
func (s *APIServer) handleRequest(req *Request) {
    // Add request ID to context
    ctx := context.WithValue(context.Background(),
                             requestIDKey, req.ID)

    // Context flows through call chain
    s.processRequest(ctx, req)
}

func (s *APIServer) processRequest(ctx context.Context, req *Request) {
    // Retrieve value from context
    requestID := ctx.Value(requestIDKey).(string)
    log.Printf("Processing request %s", requestID)
}

// Real Kubernetes example: API request with deadline
func (c *RESTClient) Get() Result {
    ctx, cancel := context.WithTimeout(context.Background(), c.timeout)
    defer cancel()

    req, err := http.NewRequestWithContext(ctx, "GET", c.url, nil)
    resp, err := c.client.Do(req)
    // If timeout exceeded, ctx.Done() is closed, request cancelled
    return Result{resp: resp}
}
```
:p What is Go's context.Context and how does Kubernetes use it?
??x
Context carries deadlines, cancellation signals, and request-scoped values across API boundaries and goroutines.

**Main uses:**

1. **Cancellation**:
```go
ctx, cancel := context.WithCancel(parent)
cancel()  // Signals all operations to stop
```

2. **Timeouts**:
```go
ctx, cancel := context.WithTimeout(parent, 5*time.Second)
// Automatically cancelled after 5 seconds
```

3. **Deadlines**:
```go
ctx, cancel := context.WithDeadline(parent, time.Now().Add(10*time.Second))
// Cancelled at specific time
```

4. **Values** (sparingly):
```go
ctx = context.WithValue(ctx, key, value)
```

**Kubernetes usage:**
- API requests have timeouts
- Long operations can be cancelled
- Graceful shutdown on SIGTERM
- Request tracing info

**Pattern:**
- First parameter of functions
- Pass down call chain
- Check `ctx.Done()` for cancellation
- Always defer cancel()

**Checking cancellation:**
```go
select {
case <-ctx.Done():
    return ctx.Err()  // Cancelled or deadline exceeded
case result := <-ch:
    // Normal processing
}
```
x??

---

#### Error Handling in Kubernetes
Kubernetes uses explicit error handling with custom error types and error wrapping for context.

```go
import (
    "fmt"
    "errors"
)

// Custom error types
type PodNotFoundError struct {
    Namespace string
    Name      string
}

func (e *PodNotFoundError) Error() string {
    return fmt.Sprintf("pod %s/%s not found", e.Namespace, e.Name)
}

// Checking error types
func (kl *Kubelet) getPod(namespace, name string) (*Pod, error) {
    pod, exists := kl.podCache[namespace+"/"+name]
    if !exists {
        return nil, &PodNotFoundError{
            Namespace: namespace,
            Name:      name,
        }
    }
    return pod, nil
}

// Using errors
func handleRequest() {
    pod, err := kubelet.getPod("default", "nginx")
    if err != nil {
        // Type assertion to check specific error
        var notFoundErr *PodNotFoundError
        if errors.As(err, &notFoundErr) {
            // Handle pod not found specifically
            log.Printf("Pod not found: %s/%s",
                      notFoundErr.Namespace, notFoundErr.Name)
            return
        }
        // Handle other errors
        return
    }
    // Use pod
}

// Error wrapping for context
func (s *Scheduler) scheduleOne() error {
    pod, err := s.getNextPod()
    if err != nil {
        return fmt.Errorf("failed to get next pod: %w", err)
    }

    node, err := s.selectNode(pod)
    if err != nil {
        return fmt.Errorf("failed to select node for pod %s: %w",
                         pod.Name, err)
    }

    return nil
}

// Multi-error handling
import "k8s.io/apimachinery/pkg/util/errors"

func (kl *Kubelet) syncPods(pods []*Pod) error {
    var errs []error

    for _, pod := range pods {
        if err := kl.syncPod(pod); err != nil {
            errs = append(errs, err)
            // Continue processing other pods
        }
    }

    // Aggregate all errors
    return errors.NewAggregate(errs)
}
```
:p How does Kubernetes handle errors in Go and what patterns are used?
??x
Kubernetes uses explicit error handling with several patterns:

**1. Multiple return values:**
```go
pod, err := getPod(name)
if err != nil {
    return err
}
```

**2. Custom error types:**
```go
type NotFoundError struct { ... }
func (e *NotFoundError) Error() string { ... }
```

**3. Error wrapping** (adds context):
```go
return fmt.Errorf("failed to start container: %w", err)
```

**4. Error type checking:**
```go
var notFoundErr *NotFoundError
if errors.As(err, &notFoundErr) {
    // Handle specifically
}
```

**5. Error aggregation:**
```go
errs := []error{err1, err2, err3}
return errors.NewAggregate(errs)
```

**Rules:**
- Check errors immediately after calls
- Add context when wrapping (%w preserves original)
- Use custom types for errors you need to handle differently
- Don't ignore errors (use _ only if truly safe)

**Why no exceptions:**
Go's explicit error handling makes error paths visible in code flow, forcing developers to handle errors.
x??

---

#### Go Channels and Goroutines in Kubernetes
Channels are used for communication between goroutines. Kubernetes uses them extensively for event handling and coordination.

```go
// Basic channel usage
func (kl *Kubelet) Run() {
    // Create channel
    podUpdates := make(chan *Pod, 100)  // Buffered channel

    // Start producer goroutine
    go kl.watchPods(podUpdates)

    // Start consumer goroutine
    go kl.syncPods(podUpdates)
}

func (kl *Kubelet) watchPods(updates chan<- *Pod) {
    // Send-only channel (chan<-)
    for {
        pod := kl.getPodUpdate()
        updates <- pod  // Send pod to channel
    }
}

func (kl *Kubelet) syncPods(updates <-chan *Pod) {
    // Receive-only channel (<-chan)
    for pod := range updates {  // Receive from channel
        kl.syncPod(pod)
    }
}

// Select for multiple channels
func (w *Worker) Run(stopCh <-chan struct{}) {
    workQueue := make(chan Item, 10)
    ticker := time.NewTicker(30 * time.Second)
    defer ticker.Stop()

    for {
        select {
        case item := <-workQueue:
            // Process work item
            w.processItem(item)

        case <-ticker.C:
            // Periodic housekeeping every 30 seconds
            w.doHousekeeping()

        case <-stopCh:
            // Graceful shutdown signal
            close(workQueue)
            return
        }
    }
}

// Wait group for coordinating goroutines
import "sync"

func (kl *Kubelet) startWorkers(numWorkers int) {
    var wg sync.WaitGroup

    for i := 0; i < numWorkers; i++ {
        wg.Add(1)
        go func(workerID int) {
            defer wg.Done()
            kl.worker(workerID)
        }(i)
    }

    // Wait for all workers to finish
    wg.Wait()
}

// Real Kubernetes pattern: Informer event channel
func (c *Controller) processEvents() {
    for {
        select {
        case event := <-c.eventCh:
            switch event.Type {
            case Added:
                c.handleAdd(event.Object)
            case Updated:
                c.handleUpdate(event.Object)
            case Deleted:
                c.handleDelete(event.Object)
            }
        case <-c.stopCh:
            return
        }
    }
}
```
:p How does Kubernetes use Go channels and goroutines for concurrency?
??x
Channels are typed conduits for communication between goroutines (lightweight threads).

**Channel basics:**
```go
ch := make(chan int)      // Unbuffered
ch := make(chan int, 10)  // Buffered (size 10)
ch <- value               // Send
value := <-ch             // Receive
close(ch)                 // Close channel
```

**Directional channels:**
- `chan<- T`: Send-only
- `<-chan T`: Receive-only
- `chan T`: Both

**Select statement:**
```go
select {
case v := <-ch1:
    // ch1 received
case ch2 <- v:
    // sent to ch2
case <-time.After(1 * time.Second):
    // timeout
default:
    // non-blocking
}
```

**Kubernetes patterns:**

1. **Work queue**: Items sent to workers via channel
2. **Stop channel**: `stopCh <-chan struct{}` for shutdown
3. **Event distribution**: Informers send events to controllers
4. **Rate limiting**: Buffer controls flow

**Coordination:**
- sync.WaitGroup: Wait for goroutines
- sync.Mutex: Protect shared data
- Context: Cancellation propagation

**Rules:**
- Don't communicate by sharing memory; share memory by communicating
- Close channels from sender
- Range over channels to receive all values
x??

---

#### Struct Tags and JSON Serialization
Kubernetes uses struct tags extensively for JSON/YAML serialization and API generation.

```go
// Pod definition with struct tags
type Pod struct {
    // json:"name" - JSON field name
    // json:"name,omitempty" - Omit if empty
    // json:"-" - Skip this field
    Name string `json:"name"`

    // omitempty: Don't include if nil/empty
    Namespace string `json:"namespace,omitempty"`

    // Nested struct
    Spec PodSpec `json:"spec"`

    // Pointer - can be nil
    Status *PodStatus `json:"status,omitempty"`

    // inline: Embed fields at same level
    metav1.ObjectMeta `json:"metadata,omitempty" protobuf:"bytes,1,opt"`

    // Multiple tags for different serialization
    Labels map[string]string `json:"labels,omitempty" yaml:"labels,omitempty"`
}

type PodSpec struct {
    // Different JSON name than field name
    Containers []Container `json:"containers"`

    // Ignored in JSON serialization
    InternalField string `json:"-"`

    // Custom type with own marshal/unmarshal
    RestartPolicy RestartPolicy `json:"restartPolicy,omitempty"`
}

// Serialization examples
import "encoding/json"

func exampleSerialization() {
    pod := &Pod{
        Name:      "nginx",
        Namespace: "default",
        Spec: PodSpec{
            Containers: []Container{
                {Name: "nginx", Image: "nginx:latest"},
            },
        },
    }

    // Marshal to JSON
    jsonBytes, err := json.Marshal(pod)
    // Result: {"name":"nginx","namespace":"default","spec":{...}}

    // Unmarshal from JSON
    var pod2 Pod
    err = json.Unmarshal(jsonBytes, &pod2)
}

// Code generation markers (comments)
// These drive code generation for deepcopy, defaults, etc.

// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object
type Pod struct {
    // ...
}

// +optional indicates field is optional in OpenAPI schema
type PodSpec struct {
    // +optional
    NodeName string `json:"nodeName,omitempty"`
}
```
:p What are Go struct tags and how does Kubernetes use them for serialization?
??x
Struct tags are metadata attached to struct fields using backticks. They control serialization, validation, and code generation.

**JSON tags:**
```go
type Example struct {
    Field1 string `json:"field1"`           // JSON name
    Field2 string `json:"field2,omitempty"` // Omit if empty
    Field3 string `json:"-"`                // Skip entirely
    Field4 string `json:",inline"`          // Inline nested struct
}
```

**Common tag patterns:**

1. **omitempty**: Skip field if zero value (nil, 0, "", empty slice)
2. **-**: Never serialize this field
3. **inline**: Flatten embedded struct

**Multiple tags:**
```go
Field string `json:"field" yaml:"field" protobuf:"bytes,1,opt"`
```

**Kubernetes-specific:**
```go
// Code generation directives (in comments)
// +optional
// +kubebuilder:validation:Required
// +k8s:deepcopy-gen=false
```

**How it works:**
```go
json.Marshal(obj)  // Reads tags to create JSON
json.Unmarshal(data, &obj)  // Reads tags to populate fields
```

**API definitions:**
All Kubernetes resources use tags to define:
- JSON/YAML format
- OpenAPI schema
- Protocol buffer encoding
- Which fields are required/optional

Without tags, field names would be capitalized in JSON (Go export requirement).
x??

---

#### Pointer vs Value Semantics
Kubernetes carefully chooses when to use pointers vs values. This affects mutability, memory, and nil-ability.

```go
// Value types (copy on assignment)
type ResourceRequirements struct {
    Limits   ResourceList
    Requests ResourceList
}

func processRequirements(reqs ResourceRequirements) {
    // reqs is a copy - changes don't affect original
    reqs.Limits["cpu"] = "2"
}

// Pointer types (reference on assignment)
type Pod struct {
    Spec   PodSpec
    Status *PodStatus  // Pointer - can be nil
}

func updatePodStatus(pod *Pod, status *PodStatus) {
    // Modifies original pod
    pod.Status = status
}

// Why use pointers:

// 1. Mutability - receiver can modify
func (p *Pod) SetPhase(phase PodPhase) {
    if p.Status == nil {
        p.Status = &PodStatus{}
    }
    p.Status.Phase = phase
}

// 2. Nil-ability - distinguish between unset and zero value
type ContainerState struct {
    Running    *ContainerStateRunning  // nil = not running
    Waiting    *ContainerStateWaiting  // nil = not waiting
    Terminated *ContainerStateTerminated  // nil = not terminated
}

func getState(state *ContainerState) string {
    if state.Running != nil {
        return "Running"
    } else if state.Waiting != nil {
        return "Waiting"
    } else if state.Terminated != nil {
        return "Terminated"
    }
    return "Unknown"
}

// 3. Large structs - avoid copying
func processNode(node *Node) {
    // Node is large, pass by pointer to avoid copy
}

// 4. Consistency - pointers for resources
func (c *RESTClient) Get() *Pod {
    // Return pointer to allow nil for not found
    return &Pod{}
}

// Value semantics - when to use values:

// Small types
type ResourceName string
type IntOrString struct {
    Type   int
    IntVal int32
    StrVal string
}

// Immutable types
type Time struct {
    time.Time
}

// Maps and slices are already references
type Labels map[string]string  // No pointer needed
type Containers []Container     // No pointer needed
```
:p When does Kubernetes use pointers vs values and why does this choice matter?
??x
**Pointer types** (`*Type`):
- Reference to data (8 bytes on 64-bit)
- Can be nil
- Modifications affect original
- Used for: large structs, optional fields, mutability

**Value types** (`Type`):
- Copy of data (size of struct)
- Cannot be nil (zero value instead)
- Modifications don't affect original
- Used for: small types, immutable data

**Kubernetes patterns:**

1. **Optional fields** - use pointers:
```go
Status *PodStatus  // nil = no status yet
```

2. **Large objects** - use pointers:
```go
func Process(node *Node)  // Node is large
```

3. **Mutating methods** - pointer receivers:
```go
func (p *Pod) SetDefaults()  // Modifies pod
```

4. **Small immutable types** - values:
```go
type ResourceName string
```

5. **Collections** - no pointer needed:
```go
Labels map[string]string  // Map is reference type
Pods []Pod  // Slice is reference type
```

**Rules:**
- Methods that mutate: pointer receiver
- Large structs (>64 bytes): pointer
- Need nil: pointer
- Small/immutable: value

**Memory consideration:**
Value: Copies data (can be expensive for large structs)
Pointer: Copies address (always 8 bytes)
x??

---

#### Deep Copy in Kubernetes
Kubernetes needs to copy objects without sharing memory. Deep copy creates independent copies of nested structures.

```go
// Shallow copy problem
func shallowCopyProblem() {
    original := &Pod{
        Labels: map[string]string{"app": "nginx"},
    }

    // Shallow copy - shares the map!
    copy := *original

    // Modifying copy affects original!
    copy.Labels["env"] = "prod"
    // original.Labels now also has "env": "prod"
}

// Deep copy solution - manual
func (in *Pod) DeepCopy() *Pod {
    if in == nil {
        return nil
    }

    out := new(Pod)

    // Copy simple fields
    out.Name = in.Name
    out.Namespace = in.Namespace

    // Deep copy map
    if in.Labels != nil {
        out.Labels = make(map[string]string, len(in.Labels))
        for key, val := range in.Labels {
            out.Labels[key] = val
        }
    }

    // Deep copy slices
    if in.Spec.Containers != nil {
        out.Spec.Containers = make([]Container, len(in.Spec.Containers))
        for i := range in.Spec.Containers {
            // Recursively deep copy
            out.Spec.Containers[i] = *in.Spec.Containers[i].DeepCopy()
        }
    }

    // Deep copy pointers
    if in.Status != nil {
        out.Status = in.Status.DeepCopy()
    }

    return out
}

// Kubernetes auto-generates deep copy
// File: zz_generated.deepcopy.go (auto-generated)

// DeepCopy is an autogenerated deepcopy function, copying the receiver,
// creating a new Pod.
func (in *Pod) DeepCopy() *Pod {
    if in == nil {
        return nil
    }
    out := new(Pod)
    in.DeepCopyInto(out)
    return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver,
// writing into out. in must be non-nil.
func (in *Pod) DeepCopyInto(out *Pod) {
    *out = *in
    if in.Labels != nil {
        in, out := &in.Labels, &out.Labels
        *out = make(map[string]string, len(*in))
        for key, val := range *in {
            (*out)[key] = val
        }
    }
    in.Spec.DeepCopyInto(&out.Spec)
    if in.Status != nil {
        in, out := &in.Status, &out.Status
        *out = new(PodStatus)
        (*in).DeepCopyInto(*out)
    }
}

// Usage
func modifyPodSafely(original *Pod) {
    // Create independent copy
    copy := original.DeepCopy()

    // Modify copy - doesn't affect original
    copy.Labels["modified"] = "true"

    // original is unchanged
}

// Code generation marker
// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object
type Pod struct {
    // ...
}
```
:p Why does Kubernetes need deep copy and how is it implemented?
??x
Deep copy creates a completely independent copy of an object, including all nested structures (maps, slices, pointers).

**Why needed:**

1. **Prevent shared mutation**:
```go
copy := original.DeepCopy()
copy.Labels["x"] = "y"  // Doesn't affect original
```

2. **Caching**: Informers cache objects - controllers must deep copy before modifying

3. **Versioning**: Keep old version while processing new version

**Shallow vs Deep:**

**Shallow** (just `*original`):
- Copies top-level fields
- Shares maps, slices, pointers
- Mutations affect both copies

**Deep**:
- Recursively copies everything
- Independent maps, slices, pointers
- Mutations are isolated

**Implementation:**

All Kubernetes types have auto-generated:
```go
DeepCopy() *T        // Returns new copy
DeepCopyInto(*T)     // Copies into existing
```

Generated by marker:
```go
// +k8s:deepcopy-gen:interfaces=runtime.Object
```

**Rules:**
- Always deep copy from informer cache before modifying
- Deep copy is expensive - use when necessary
- Generated code handles all nested structures

**Example:**
```go
pod := lister.Get(name)        // From cache
copy := pod.DeepCopy()         // Independent copy
copy.Labels["x"] = "y"         // Safe to modify
clientset.Update(copy)         // Update modified copy
```
x??

---

#### Typed vs Unstructured Objects
Kubernetes supports both strongly-typed objects and unstructured (map-based) objects for flexibility.

```go
// Typed - strongly typed Go structs
type Pod struct {
    metav1.TypeMeta
    metav1.ObjectMeta
    Spec   PodSpec
    Status PodStatus
}

func useTyped(clientset kubernetes.Interface) {
    // Typed client - compile-time safety
    pod, err := clientset.CoreV1().
        Pods("default").
        Get(context.TODO(), "nginx", metav1.GetOptions{})

    // Autocomplete and type checking
    fmt.Println(pod.Spec.Containers[0].Image)
}

// Unstructured - map-based, no types
import "k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"

func useUnstructured(dynamicClient dynamic.Interface) {
    // Unstructured client - runtime type
    gvr := schema.GroupVersionResource{
        Group:    "",
        Version:  "v1",
        Resource: "pods",
    }

    obj, err := dynamicClient.Resource(gvr).
        Namespace("default").
        Get(context.TODO(), "nginx", metav1.GetOptions{})

    // Access via map lookup - no compile-time safety
    containers, found, err := unstructured.NestedSlice(
        obj.Object, "spec", "containers")

    if found {
        container := containers[0].(map[string]interface{})
        image := container["image"].(string)
        fmt.Println(image)
    }
}

// Unstructured object structure
type Unstructured struct {
    Object map[string]interface{}
}

// Helper functions for nested access
func example() {
    u := &unstructured.Unstructured{
        Object: map[string]interface{}{
            "apiVersion": "v1",
            "kind":       "Pod",
            "metadata": map[string]interface{}{
                "name":      "nginx",
                "namespace": "default",
            },
            "spec": map[string]interface{}{
                "containers": []interface{}{
                    map[string]interface{}{
                        "name":  "nginx",
                        "image": "nginx:latest",
                    },
                },
            },
        },
    }

    // Get nested field
    image, found, err := unstructured.NestedString(
        u.Object, "spec", "containers", "0", "image")
    // image = "nginx:latest"

    // Set nested field
    err = unstructured.SetNestedField(
        u.Object, "nginx:1.19", "spec", "containers", "0", "image")
}

// When to use each:

// Typed - when you know the type at compile time
func processKnownTypes(pod *v1.Pod) {
    // Type-safe access
    for _, container := range pod.Spec.Containers {
        fmt.Println(container.Image)
    }
}

// Unstructured - when type is dynamic
func processAnyResource(obj *unstructured.Unstructured) {
    // Works with any Kubernetes resource
    name, _, _ := unstructured.NestedString(obj.Object, "metadata", "name")
    kind := obj.GetKind()
    fmt.Printf("Processing %s: %s\n", kind, name)
}
```
:p What's the difference between typed and unstructured objects in Kubernetes and when should each be used?
??x
**Typed objects:**
- Strongly-typed Go structs
- Compile-time type checking
- IDE autocomplete
- Better performance
- Must import type definitions

**Unstructured objects:**
- Map-based (`map[string]interface{}`)
- No compile-time checking
- Work with any resource type
- Used when type unknown at compile time

**When to use:**

**Typed** - when you know the type:
```go
pod := &v1.Pod{}
pod.Spec.Containers[0].Image = "nginx"
// Type-safe, fast, autocomplete
```

**Unstructured** - when type is dynamic:
```go
obj := &unstructured.Unstructured{}
unstructured.SetNestedField(obj.Object,
    "nginx", "spec", "containers", "0", "image")
// Works with any resource
// No type knowledge needed
```

**Use cases for unstructured:**
- Generic controllers (handles any resource)
- Dynamic clients
- CRDs you don't have types for
- kubectl (handles all resources)

**Conversion:**
```go
// Typed → Unstructured
runtime.DefaultUnstructuredConverter.ToUnstructured(pod)

// Unstructured → Typed
runtime.DefaultUnstructuredConverter.FromUnstructured(obj.Object, &pod)
```

**Trade-off:**
Typed = Safety + Performance
Unstructured = Flexibility
x??

---

#### Wait and Poll Patterns
Kubernetes extensively uses wait/poll patterns for eventually consistent operations.

```go
import (
    "k8s.io/apimachinery/pkg/util/wait"
    "time"
)

// Poll until condition is met
func waitForPodRunning(clientset kubernetes.Interface, podName string) error {
    return wait.PollImmediate(
        1*time.Second,              // Poll interval
        5*time.Minute,              // Timeout
        func() (bool, error) {      // Condition function
            pod, err := clientset.CoreV1().
                Pods("default").
                Get(context.TODO(), podName, metav1.GetOptions{})

            if err != nil {
                return false, err   // Error, stop polling
            }

            if pod.Status.Phase == v1.PodRunning {
                return true, nil    // Success, stop polling
            }

            return false, nil       // Not ready, continue polling
        },
    )
}

// Poll with backoff
func waitWithBackoff() error {
    backoff := wait.Backoff{
        Duration: 1 * time.Second,  // Initial duration
        Factor:   2.0,               // Multiply by this each iteration
        Steps:    5,                 // Maximum steps
        Cap:      1 * time.Minute,   // Maximum duration
    }

    return wait.ExponentialBackoff(backoff, func() (bool, error) {
        // Try operation
        err := attemptOperation()
        if err == nil {
            return true, nil   // Success
        }
        return false, nil      // Retry with backoff
    })
}

// Poll forever (use with context for cancellation)
func pollForever(ctx context.Context) {
    wait.UntilWithContext(ctx,
        func(ctx context.Context) {
            // Do work periodically
            doWork()
        },
        30*time.Second,  // Period
    )
}

// Jittered wait (adds randomness to avoid thundering herd)
func waitWithJitter() {
    wait.JitterUntil(
        func() {
            doWork()
        },
        30*time.Second,   // Period
        0.1,              // Jitter factor (10%)
        true,             // Sliding (reset timer after work)
        stopCh,           // Stop signal
    )
}

// Real Kubernetes example: Wait for CRD to be established
func waitForCRD(client apiextensionsclient.Interface, name string) error {
    return wait.PollImmediate(500*time.Millisecond, 60*time.Second,
        func() (bool, error) {
            crd, err := client.ApiextensionsV1().
                CustomResourceDefinitions().
                Get(context.TODO(), name, metav1.GetOptions{})

            if err != nil {
                return false, err
            }

            // Check if CRD is established
            for _, cond := range crd.Status.Conditions {
                if cond.Type == apiextensionsv1.Established &&
                   cond.Status == apiextensionsv1.ConditionTrue {
                    return true, nil
                }
            }

            return false, nil
        },
    )
}
```
:p What are wait/poll patterns in Kubernetes and when are they used?
??x
Wait/poll patterns repeatedly check a condition until it's met or timeout occurs. Used extensively because Kubernetes is eventually consistent.

**Main functions:**

1. **PollImmediate**:
```go
wait.PollImmediate(interval, timeout, conditionFunc)
// Checks immediately, then every interval until timeout
```

2. **Poll**:
```go
wait.Poll(interval, timeout, conditionFunc)
// Waits interval first, then checks
```

3. **ExponentialBackoff**:
```go
wait.ExponentialBackoff(backoff, conditionFunc)
// Increases wait time exponentially
```

4. **UntilWithContext**:
```go
wait.UntilWithContext(ctx, workFunc, period)
// Runs periodically until context cancelled
```

**Condition function:**
```go
func() (done bool, err error)
// done=true: Success, stop
// done=false, err=nil: Continue
// err!=nil: Error, stop
```

**Common uses:**
- Wait for pod to be ready
- Wait for CRD to be established
- Wait for resource deletion
- Retry failed operations
- Periodic reconciliation

**Pattern:**
```go
err := wait.PollImmediate(1*time.Second, 30*time.Second,
    func() (bool, error) {
        ready, err := checkIfReady()
        return ready, err
    },
)
```

**Why needed:**
Kubernetes operations are asynchronous - creating a pod doesn't mean it's running immediately.
x??

---
