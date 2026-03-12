# C++ Binding and V8 Integration Flashcards

#### BaseObject Pattern
The `BaseObject` class is the foundation for all Node.js C++ objects that need to be exposed to JavaScript. It manages the binding between a C++ object and its JavaScript wrapper, handling lifecycle, memory management, and garbage collection.

Every time you see a Node.js API that feels "native" (like file handles, sockets, crypto objects), it's likely backed by a `BaseObject` subclass.

```cpp
// Simplified BaseObject structure
class BaseObject : public MemoryRetainer {
  Environment* env_;                      // Node.js environment
  v8::Global<v8::Object> persistent_;     // JS object reference

  // Lifecycle management
  void MakeWeak();      // Allow GC to collect
  void ClearWeak();     // Prevent GC collection

  // Retrieve C++ object from JS object
  static BaseObject* FromJSObject(v8::Local<v8::Object> obj);

  // Unwrap: Get C++ pointer from JS object
  template<typename T>
  static T* Unwrap(v8::Local<v8::Object> obj);
};
```

Reference: `src/base_object.h`

:p What is the purpose of the BaseObject class in Node.js and how does it bridge C++ and JavaScript?
??x
**BaseObject** is the base class for all C++ objects exposed to JavaScript. It provides:

1. **Bidirectional binding:**
   - C++ object stores reference to JS object (`persistent_`)
   - JS object stores pointer to C++ object (in internal field)

2. **Lifecycle management:**
   - `MakeWeak()`: Tells V8 GC it can collect the JS object, triggering C++ cleanup
   - `ClearWeak()`: Prevents GC, keeping both objects alive

3. **Object retrieval:**
   ```cpp
   // From JavaScript callback, get C++ object
   void MyCallback(const FunctionCallbackInfo<Value>& args) {
     MyClass* obj = Unwrap<MyClass>(args.Holder());
     // Now can call C++ methods on obj
   }
   ```

**Example flow:**
```cpp
// Creating a bound object
class FileHandle : public BaseObject {
  int fd_;  // File descriptor
};

// In JS:
const fh = fs.open('file.txt');  // Creates FileHandle C++ object
// fh is JS object, but internally points to C++ FileHandle
// When GC collects fh, C++ FileHandle destructor closes fd_
```

**Key insight:** BaseObject enables JavaScript to control C++ object lifetime through garbage collection.
x??

---

#### Inheritance Hierarchy
Node.js uses a carefully designed C++ inheritance hierarchy to provide consistent behavior across all async operations, handles, and requests. Understanding this hierarchy is crucial for implementing new features or debugging existing ones.

```cpp
// Inheritance chain
MemoryRetainer (base interface)
  ↓
BaseObject (JS/C++ binding)
  ↓
AsyncWrap (async tracking)
  ↓
  ├─ HandleWrap (long-lived handles)
  │    ├─ TCPWrap (TCP sockets)
  │    ├─ UDPWrap (UDP sockets)
  │    ├─ PipeWrap (IPC pipes)
  │    └─ TimerWrap (timers)
  │
  └─ ReqWrap<T> (one-time requests)
       ├─ FSReqCallback (file operations)
       ├─ GetAddrInfoReqWrap (DNS)
       └─ WriteWrap (socket writes)
```

Each level adds specific functionality:
- **MemoryRetainer**: Memory tracking for heap snapshots
- **BaseObject**: JS/C++ binding and lifecycle
- **AsyncWrap**: Async hooks integration
- **HandleWrap/ReqWrap**: libuv integration

Reference: `src/base_object.h`, `src/async_wrap.h`, `src/handle_wrap.h`, `src/req_wrap.h`

:p What does each level of the Node.js C++ inheritance hierarchy provide?
??x
**Four-level hierarchy:**

1. **MemoryRetainer (base):**
   - Interface for memory tracking
   - Methods: `MemoryInfo()`, `SelfSize()`
   - Enables heap snapshots to show C++ memory usage

2. **BaseObject:**
   - Bidirectional C++/JavaScript binding
   - Lifecycle: `MakeWeak()`, `ClearWeak()`
   - Object retrieval: `Unwrap()`, `FromJSObject()`

3. **AsyncWrap:**
   - Async hooks integration
   - Tracks: `async_id`, `trigger_async_id`, `provider_type`
   - Enables async context tracking

4. **HandleWrap / ReqWrap<T>:**
   - libuv integration
   - HandleWrap: Long-lived resources (sockets, timers)
   - ReqWrap: One-time operations (file read, DNS lookup)

**Example - TCPWrap chain:**
```cpp
class TCPWrap : public HandleWrap {
  // Inherits:
  // - Memory tracking (MemoryRetainer)
  // - JS binding (BaseObject)
  // - Async tracking (AsyncWrap)
  // - Handle lifecycle (HandleWrap)

  uv_tcp_t handle_;  // libuv TCP handle

  void Connect(const char* ip, int port);
  void Listen(int backlog);
};
```

Each level builds on the previous, providing a complete solution for async, garbage-collected, memory-tracked, libuv-integrated objects.
x??

---

#### Internal Fields
V8 allows JavaScript objects to have "internal fields"—hidden slots that store C++ pointers. Node.js uses internal fields to store the C++ object pointer, enabling fast retrieval without property lookup.

Internal fields are invisible to JavaScript code but crucial for performance when crossing the JS/C++ boundary.

```cpp
// Setting internal field (during object creation)
v8::Local<v8::Object> obj = /* ... */;
obj->SetAlignedPointerInInternalField(0, this);  // Store C++ pointer

// Getting internal field (during method call)
void MyMethod(const FunctionCallbackInfo<Value>& args) {
  v8::Local<v8::Object> obj = args.Holder();
  MyClass* self = static_cast<MyClass*>(
    obj->GetAlignedPointerFromInternalField(0)
  );
  // Now can call self->CppMethod()
}
```

**Performance:** Internal field access is O(1) and avoids hash table lookup of properties.

Reference: V8 API, `src/base_object.h`

:p What are V8 internal fields and why does Node.js use them instead of regular JavaScript properties?
??x
**Internal fields** are hidden slots in JavaScript objects that store C++ pointers:

**Characteristics:**
- Invisible to JavaScript (not enumerable, not accessible via property access)
- Fast access: Direct memory offset, O(1) time
- Type: Stores aligned pointers (typically C++ object pointers)
- Number: Objects can have multiple internal fields (Node.js typically uses slot 0)

**Why use internal fields instead of JS properties?**

1. **Performance:**
   ```cpp
   // Internal field (fast)
   void* ptr = obj->GetAlignedPointerFromInternalField(0);  // ~2 ns

   // JS property (slow)
   v8::Local<v8::Value> val = obj->Get(context, "__cpp_ptr");
   void* ptr = /* extract from val */;  // ~50+ ns (hash lookup)
   ```

2. **Security:** JavaScript code cannot access or modify the C++ pointer
   ```javascript
   const socket = net.connect(...);
   // Cannot do: socket.__internal_cpp_pointer = null;
   // Internal field is invisible
   ```

3. **Type safety:** Only C++ code accesses the field, ensuring correct type casting

4. **Memory safety:** GC doesn't trace internal fields as JS references, preventing reference counting issues

**Usage pattern:**
```cpp
// Constructor
obj->SetAlignedPointerInInternalField(0, static_cast<void*>(this));

// Methods
MyClass* self = static_cast<MyClass*>(
  obj->GetAlignedPointerFromInternalField(0)
);
```
x??

---

#### Isolate-Context Relationship
V8 uses two key abstractions: **Isolate** and **Context**. Understanding their relationship is crucial for working with Node.js internals or embedding V8.

An **Isolate** is an isolated instance of the V8 engine with its own heap and garbage collector. A **Context** is an execution environment with its own global object.

```cpp
// Relationship
v8::Isolate* isolate;  // One per Node.js worker thread
  └─ Heap (separate memory)
  └─ v8::Context* context;  // Usually one per isolate in Node.js
       └─ Global object (separate globals)

// Multiple contexts (rare in Node.js)
v8::Isolate* isolate = v8::Isolate::New();
v8::Local<v8::Context> ctx1 = v8::Context::New(isolate);
v8::Local<v8::Context> ctx2 = v8::Context::New(isolate);
// ctx1 and ctx2 share isolate but have different global objects
```

**Node.js usage:**
- Main thread: 1 isolate, 1 context
- Worker thread: 1 isolate, 1 context (separate from main)
- Total: N+1 isolates for N workers

Reference: `src/env.h`, V8 documentation

:p What is the difference between a V8 Isolate and a Context, and how many of each does Node.js typically use?
??x
**Isolate:**
- Complete isolated V8 instance
- Own heap memory
- Own garbage collector
- Own call stack
- **Cannot share objects between isolates**

**Context:**
- Execution environment within an isolate
- Own global object
- Own built-in objects (Object, Array, etc.)
- **Can have multiple contexts per isolate**

**Memory relationship:**
```
Isolate (e.g., 100 MB heap)
  ├─ Context 1 (globals: { x: 1 })
  └─ Context 2 (globals: { x: 2 })
     // Share heap, but separate global objects
```

**Node.js usage:**

**Typical Node.js app:**
- Main thread: 1 isolate, 1 context
- Worker 1: 1 isolate, 1 context
- Worker 2: 1 isolate, 1 context
- **Total: N+1 isolates for N workers**

**Why multiple contexts are rare in Node.js:**
- Performance overhead of context switching
- Complexity of managing multiple globals
- Worker threads provide better isolation

**When multiple contexts are used:**
- VM module: `vm.createContext()` creates new context in same isolate
- Sandboxing: Separate global objects for untrusted code

**Key difference:** Isolates are heavyweight (separate memory), contexts are lightweight (shared memory, separate globals).
x??

---

#### Multi-Isolate Platform
Node.js supports running multiple V8 isolates in a single process through the `MultiIsolatePlatform` class. This is the foundation for Worker Threads.

The platform manages a shared thread pool for background tasks (like garbage collection, optimization) across all isolates.

```cpp
// Simplified MultiIsolatePlatform
class MultiIsolatePlatform : public v8::Platform {
  // Shared thread pool for all isolates
  std::unique_ptr<WorkerThreadsTaskRunner> background_thread_pool_;

  // Per-isolate task queues
  std::map<v8::Isolate*, TaskQueue> isolate_tasks_;

  // Background task scheduling
  void CallOnBackgroundThread(Task* task, ExpectedRuntime runtime) {
    background_thread_pool_->PostTask(task);
  }

  // Foreground task scheduling (isolate-specific)
  void CallOnForegroundThread(v8::Isolate* isolate, Task* task) {
    isolate_tasks_[isolate].push(task);
  }
};
```

**Key features:**
- Shared resources (thread pool) across isolates
- Isolated task queues (no cross-contamination)
- Efficient scheduling (work-stealing)

Reference: `src/node.h`, multi-isolate platform code

:p What is the purpose of MultiIsolatePlatform in Node.js and how does it enable Worker Threads?
??x
**MultiIsolatePlatform** manages multiple V8 isolates in a single process, enabling Worker Threads.

**Architecture:**
```
Process
  └─ MultiIsolatePlatform
       ├─ Shared Background Thread Pool (4-8 threads)
       │    └─ For: GC, compilation, optimization
       │
       ├─ Main Isolate (main thread)
       │    └─ Foreground Task Queue
       │
       ├─ Worker Isolate 1 (worker thread)
       │    └─ Foreground Task Queue
       │
       └─ Worker Isolate 2 (worker thread)
            └─ Foreground Task Queue
```

**Key responsibilities:**

1. **Background task management:**
   - Shared thread pool for all isolates
   - V8 compiler optimization runs here
   - GC marking phase runs here

2. **Foreground task scheduling:**
   - Each isolate has separate foreground queue
   - Ensures tasks run on correct thread

3. **Resource efficiency:**
   - Without sharing: 8 workers × 4 threads = 32 threads
   - With sharing: 8 workers + 1 pool (4 threads) = 12 threads

**Worker Thread creation flow:**
```javascript
// JavaScript
const { Worker } = require('worker_threads');
const w = new Worker('./worker.js');

// C++ flow
// 1. Create new v8::Isolate
// 2. Register with MultiIsolatePlatform
// 3. Create new Environment
// 4. Load worker.js in new isolate
// 5. Run event loop
```

**Why it matters:** Enables true parallelism for CPU-bound tasks while sharing platform resources efficiently.
x??

---

#### Aliased Buffer Technique
The `AliasedBuffer` is one of Node.js's most clever performance optimizations. It creates a shared memory region that both C++ and JavaScript can access directly, eliminating the need for expensive boundary crossings.

The technique uses V8's TypedArray backed by a C++ buffer, allowing writes from either side to be immediately visible to the other.

```cpp
// Aliased buffer structure
template<typename NativeT, typename V8T>
class AliasedBufferBase {
  NativeT* buffer_;                    // C++ native array
  v8::Global<V8T> js_array_;          // JS TypedArray viewing same memory

  // C++ write - immediately visible to JS
  void SetValue(size_t index, NativeT value) {
    buffer_[index] = value;  // Direct memory write
    // JS can read this immediately, no marshalling!
  }
};

// Example: Async hooks state
AliasedBuffer<uint32_t, v8::Uint32Array> async_hooks_state_;

// C++ updates
async_hooks_state_[kInit] = 1;  // Enable init hook

// JS reads (zero-copy!)
const state = binding.asyncHooksState;
if (state[kInit]) runInitCallbacks();
```

**Performance:** Eliminates ~50-100ns per access compared to calling C++ functions.

Reference: `src/aliased_buffer.h`

:p How does the AliasedBuffer technique achieve zero-copy data sharing between C++ and JavaScript?
??x
**AliasedBuffer** creates a shared memory region accessible from both C++ and JavaScript:

**Setup:**
```cpp
// C++ side
NativeT* cpp_buffer = new NativeT[size];  // Allocate memory

// Create JS TypedArray viewing same memory
v8::Local<v8::ArrayBuffer> ab =
  v8::ArrayBuffer::New(isolate, cpp_buffer, size);
v8::Local<v8::Uint32Array> js_array =
  v8::Uint32Array::New(ab, 0, size);

// Store both references
buffer_ = cpp_buffer;
js_array_ = js_array;
```

**Zero-copy access:**
```cpp
// C++ write
buffer_[0] = 42;

// JavaScript read (immediately sees 42!)
const value = jsArray[0];  // No C++ call!
```

**Memory layout:**
```
Memory: [0, 0, 0, 0, 0]
         ↑
         Both C++ pointer and JS TypedArray point here
```

**Why it's zero-copy:**
1. Both sides access the **same physical memory**
2. No serialization/deserialization
3. No function calls across boundary
4. No copying of data

**Trade-offs:**
- ✅ Extremely fast (direct memory access)
- ✅ No marshalling overhead
- ❌ Bypasses V8 write barriers (no automatic GC notifications)
- ❌ Requires careful synchronization for concurrent access
- ❌ Limited to simple data types (numbers, not objects)

**Common uses in Node.js:**
- Async hooks state (frequently read from JS)
- Timer queue (frequently updated from C++)
- Performance counters
- Environment flags

**Performance impact:** Reduces access time from ~50-100ns (C++ call) to ~2-5ns (memory access).
x??

---

#### Weak References and Garbage Collection
Node.js uses V8's weak reference mechanism to coordinate garbage collection between JavaScript and C++. When a JavaScript object is no longer referenced, V8 can notify the C++ side to clean up associated resources.

This is critical for preventing resource leaks: file descriptors, sockets, and memory must be freed when JavaScript objects are collected.

```cpp
// Setting up weak callback
class FileHandle : public BaseObject {
  int fd_;  // File descriptor

  void MakeWeak() {
    // Tell V8: call WeakCallback when JS object collected
    persistent_.SetWeak(this, WeakCallback, v8::WeakCallbackType::kParameter);
  }

  static void WeakCallback(const v8::WeakCallbackInfo<FileHandle>& data) {
    FileHandle* handle = data.GetParameter();
    close(handle->fd_);  // Close file descriptor
    delete handle;        // Delete C++ object
  }
};
```

**Timing:** Weak callback runs during garbage collection, not immediately when the last reference is dropped.

Reference: `src/base_object.h`, V8 weak reference documentation

:p How do weak references coordinate garbage collection between JavaScript and C++ in Node.js?
??x
**Weak references** allow C++ to be notified when JavaScript objects are garbage collected:

**Setup process:**
```cpp
// 1. Create objects
FileHandle* cpp_obj = new FileHandle(fd);
v8::Local<v8::Object> js_obj = /* ... */;

// 2. Create strong reference (prevents GC)
v8::Global<v8::Object> persistent(isolate, js_obj);

// 3. Make weak with callback
persistent.SetWeak(cpp_obj, WeakCallback,
                   v8::WeakCallbackType::kParameter);
```

**Lifecycle:**
```javascript
// JavaScript
let file = fs.openSync('data.txt');  // C++ creates FileHandle
// Strong references: file → JS object → C++ object

file = null;  // Remove strong reference
// Only weak reference remains

// ... sometime later during GC ...
// V8: "JS object has no strong references, collecting"
// V8: Calls WeakCallback(cpp_obj)
// WeakCallback: closes file descriptor, deletes C++ object
```

**Weak callback structure:**
```cpp
static void WeakCallback(
  const v8::WeakCallbackInfo<BaseObject>& data
) {
  BaseObject* obj = data.GetParameter();

  // Clean up resources
  obj->CleanupResources();  // Close fd, free memory, etc.

  // Delete C++ object
  delete obj;

  // V8 will then collect JS object
}
```

**Key properties:**
1. **Non-deterministic timing**: Callback runs during GC, not immediately
2. **One-time**: Callback fires once, then persistent handle cleared
3. **Resource cleanup**: Ensures C++ resources freed when JS object collected
4. **Prevents leaks**: Without weak callbacks, closing file would require explicit close() call

**Without weak references:** Every object would need explicit cleanup (like Java's close() or Python's context managers).

**With weak references:** Cleanup happens automatically when JavaScript object is no longer reachable.
x??

---

#### Memory Tracking Interface
Node.js implements a comprehensive memory tracking system that allows C++ objects to report their memory usage to heap snapshots and profiling tools. This is crucial for debugging memory leaks across the JS/C++ boundary.

Every `BaseObject` subclass can implement the `MemoryRetainer` interface to report its memory usage.

```cpp
// Memory tracking interface
class MemoryRetainer {
  // Return size of C++ object itself
  virtual size_t SelfSize() const = 0;

  // Report child objects and allocations
  virtual void MemoryInfo(MemoryTracker* tracker) const {}

  // Name for heap snapshots
  virtual const char* MemoryInfoName() const = 0;
};

// Example implementation
class BufferedSocket : public BaseObject {
  std::vector<char> buffer_;
  OtherObject* child_;

  size_t SelfSize() const override {
    return sizeof(*this);  // Size of the object
  }

  void MemoryInfo(MemoryTracker* tracker) const override {
    tracker->TrackField("buffer", buffer_);
    tracker->TrackField("child", child_);
  }

  const char* MemoryInfoName() const override {
    return "BufferedSocket";
  }
};
```

Reference: `src/memory_tracker.h`, `src/base_object.h`

:p What three methods does the MemoryRetainer interface require and what does each report?
??x
**Three required methods:**

1. **SelfSize()** - Size of the C++ object itself:
```cpp
size_t SelfSize() const override {
  return sizeof(*this);
}
```
Reports the size of the object's memory footprint (from sizeof operator).

2. **MemoryInfo(tracker)** - Reports child objects and allocations:
```cpp
void MemoryInfo(MemoryTracker* tracker) const override {
  // Report container sizes
  tracker->TrackField("buffer", buffer_);       // std::vector
  tracker->TrackField("cache", cache_);         // std::map

  // Report owned objects
  tracker->TrackField("parser", parser_);       // Pointer to another object

  // Report inline values (if significant)
  tracker->TrackFieldWithSize("inline_data", inline_data_.size());
}
```
Reports all memory this object owns or references.

3. **MemoryInfoName()** - Name for heap snapshots:
```cpp
const char* MemoryInfoName() const override {
  return "TCPWrap";
}
```
Returns human-readable name displayed in profiling tools.

**How it works in practice:**
```
Heap Snapshot:
  TCPWrap (1.2 KB)
    ├─ buffer (4 KB)          // From MemoryInfo
    ├─ parser (512 bytes)     // From MemoryInfo
    └─ self (128 bytes)       // From SelfSize
  Total: 5.84 KB
```

**Why all three?**
- `SelfSize()`: Base object overhead
- `MemoryInfo()`: Tracks what the object owns (recursive)
- `MemoryInfoName()`: Makes profiles readable

**Without this:** C++ memory would be "invisible" to Node.js profiling tools, making memory leaks impossible to debug.

**Macros for convenience:**
```cpp
SET_MEMORY_INFO_NAME(TCPWrap)  // Implements MemoryInfoName
SET_SELF_SIZE(TCPWrap)         // Implements SelfSize
// Only need to implement MemoryInfo manually
```
x??

---

#### Function Template Pattern
Node.js uses V8's `FunctionTemplate` to create JavaScript constructor functions backed by C++ classes. This pattern is how native modules expose classes to JavaScript.

```cpp
// Creating a function template
void Initialize(v8::Local<v8::Object> exports,
                v8::Local<v8::Context> context) {
  v8::Isolate* isolate = context->GetIsolate();

  // Create function template
  v8::Local<v8::FunctionTemplate> tpl =
    v8::FunctionTemplate::New(isolate, New);  // Constructor

  tpl->SetClassName(v8::String::NewFromUtf8Literal(isolate, "MyClass"));
  tpl->InstanceTemplate()->SetInternalFieldCount(1);  // For C++ pointer

  // Add methods
  NODE_SET_PROTOTYPE_METHOD(tpl, "myMethod", MyMethod);

  // Export constructor
  exports->Set(context,
               v8::String::NewFromUtf8Literal(isolate, "MyClass"),
               tpl->GetFunction(context).ToLocalChecked());
}

// Constructor
void New(const FunctionCallbackInfo<Value>& args) {
  MyClass* obj = new MyClass();
  obj->Wrap(args.This());  // Store C++ pointer in JS object
}
```

Reference: Node.js addon documentation, `src/` (various native modules)

:p What is the purpose of FunctionTemplate in V8 and what are the key steps to expose a C++ class to JavaScript?
??x
**FunctionTemplate** creates JavaScript constructor functions backed by C++ classes.

**Key steps to expose C++ class:**

1. **Create FunctionTemplate:**
```cpp
v8::Local<v8::FunctionTemplate> tpl =
  v8::FunctionTemplate::New(isolate, ConstructorCallback);
```
Links JS constructor to C++ constructor function.

2. **Set class name:**
```cpp
tpl->SetClassName(String::NewFromUtf8Literal(isolate, "MyClass"));
```
Sets the name for `obj.constructor.name`.

3. **Set internal field count:**
```cpp
tpl->InstanceTemplate()->SetInternalFieldCount(1);
```
Allocates hidden slot for C++ pointer.

4. **Add methods:**
```cpp
NODE_SET_PROTOTYPE_METHOD(tpl, "read", Read);
NODE_SET_PROTOTYPE_METHOD(tpl, "write", Write);
```
Adds methods to prototype.

5. **Add static methods/properties:**
```cpp
tpl->Set(String::NewFromUtf8Literal(isolate, "constant"),
         Integer::New(isolate, 42));
```

6. **Export constructor:**
```cpp
exports->Set(context,
             String::NewFromUtf8Literal(isolate, "MyClass"),
             tpl->GetFunction(context).ToLocalChecked());
```

**Usage in JavaScript:**
```javascript
const { MyClass } = require('./native');
const obj = new MyClass();  // Calls C++ constructor
obj.read();                  // Calls C++ Read function
```

**Complete flow:**
```
JavaScript                    C++
---------                    ---

new MyClass()  →  ConstructorCallback()
                  ├─ new MyClass()
                  └─ obj->Wrap(args.This())

obj.read()     →  Read(FunctionCallbackInfo)
                  ├─ Unwrap(args.Holder())
                  └─ cpp_obj->ReadInternal()
```

**Key insight:** FunctionTemplate bridges JavaScript's prototype system with C++ classes, making native objects feel like regular JavaScript objects.
x??
