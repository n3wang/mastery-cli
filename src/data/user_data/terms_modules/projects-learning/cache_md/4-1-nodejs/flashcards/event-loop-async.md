# Event Loop and Async Concepts Flashcards

#### Event Loop Phases
The Node.js event loop is built on top of libuv and processes operations in distinct phases. Understanding these phases is crucial for predicting when callbacks will execute and for performance optimization.

The six phases are executed in order, and each phase has a FIFO queue of callbacks. The event loop will process all callbacks in a phase before moving to the next one.

References: `doc/api/timers.md`, `doc/api/process.md`

:p What are the six phases of the Node.js event loop and what does each phase do?
??x
1. **timers**: Executes callbacks scheduled by `setTimeout()` and `setInterval()`
2. **pending callbacks**: Executes I/O callbacks deferred from the previous cycle
3. **idle, prepare**: Internal use only by Node.js
4. **poll**: Retrieves new I/O events and executes I/O related callbacks (most application code runs here)
5. **check**: Executes `setImmediate()` callbacks
6. **close callbacks**: Executes close event callbacks (e.g., `socket.on('close')`)

The loop continues iterating through these phases until there are no more callbacks to process.
x??

---

#### setImmediate vs setTimeout Order
Both `setImmediate()` and `setTimeout(fn, 0)` schedule callbacks asynchronously, but they execute in different phases of the event loop. The order depends on the context in which they're called.

When called within an I/O cycle, `setImmediate()` will always execute before any timers. However, when called from the main module, the order is non-deterministic because it depends on process performance.

```javascript
// Non-deterministic order (main module)
setTimeout(() => console.log('timeout'), 0);
setImmediate(() => console.log('immediate'));

// Deterministic order (I/O cycle)
fs.readFile('file.txt', () => {
  setTimeout(() => console.log('timeout'), 0);
  setImmediate(() => console.log('immediate'));
  // Will always print: immediate, timeout
});
```

:p In what phase does `setImmediate()` execute and why does it always run before `setTimeout(fn, 0)` when called within an I/O callback?
??x
`setImmediate()` executes in the **check** phase.

When called within an I/O callback (which runs in the **poll** phase), the event loop will complete the poll phase and immediately move to the check phase. Since the check phase comes before the timers phase in the next iteration, `setImmediate()` will execute first.

The sequence is: poll → check (setImmediate runs) → close callbacks → timers (setTimeout runs)
x??

---

#### Handle Wrapping Pattern
Node.js uses the `HandleWrap` base class to wrap libuv handles (like TCP sockets, UDP sockets, timers, etc.) in C++ objects. This pattern bridges libuv's C API with Node.js's C++ object model.

The key insight is the reference counting system: handles can be "referenced" or "unreferenced". Referenced handles keep the event loop alive, while unreferenced handles don't prevent the process from exiting.

```cpp
// Simplified HandleWrap structure
class HandleWrap : public AsyncWrap {
  uv_handle_t* handle_;  // The underlying libuv handle

  void Ref();    // Keep event loop alive
  void Unref();  // Don't prevent exit
  void Close();  // Close the handle
};
```

Reference: `src/handle_wrap.h`

:p What is the purpose of `ref()` and `unref()` methods in Node.js handles?
??x
- `ref()`: Makes the handle "count" toward the event loop's active handle count. A referenced handle keeps the event loop (and thus the process) running.

- `unref()`: Makes the handle not count toward active handles. An unreferenced handle won't prevent the process from exiting.

Example use case: A monitoring timer that checks system status every second should be `unref()`'d so it doesn't prevent the application from exiting when all other work is complete.

```javascript
const timer = setInterval(() => checkStatus(), 1000);
timer.unref();  // Won't keep process alive
```
x??

---

#### Request Wrapping Pattern
Node.js uses the `ReqWrap<T>` template class to wrap libuv request objects. Requests represent one-time asynchronous operations (like file read, DNS lookup, or socket write), as opposed to handles which are long-lived.

`ReqWrap` inherits from `AsyncWrap`, which means every request participates in the async hooks system for tracking and debugging.

```cpp
// Template pattern for libuv requests
template <typename T>
class ReqWrap : public AsyncWrap {
  T req_;  // The libuv request (uv_fs_t, uv_write_t, etc.)

  // Called when libuv operation completes
  void OnDone(int status);
};

// Example: File system request
class FSReqCallback : public ReqWrap<uv_fs_t> {
  // Handles completion of fs operations
};
```

Reference: `src/req_wrap.h`, `src/async_wrap.h`

:p What is the difference between HandleWrap and ReqWrap in Node.js architecture?
??x
**HandleWrap**:
- Wraps long-lived libuv handles (`uv_handle_t`)
- Represents continuous resources (sockets, timers, file watchers)
- Can be ref/unref'd to control event loop lifetime
- Examples: TCPWrap, UDPWrap, TimerWrap

**ReqWrap**:
- Wraps one-time libuv requests (`uv_req_t`)
- Represents single asynchronous operations
- Automatically cleaned up after completion
- Examples: FSReqCallback (file operations), GetAddrInfoReqWrap (DNS)

Think of handles as "nouns" (things that exist) and requests as "verbs" (actions to perform).
x??

---

#### Async Hooks System
The async hooks module provides an API to track the lifecycle of asynchronous resources in Node.js. Every asynchronous operation creates an "async resource" with a unique ID and a link to its parent (trigger).

The system tracks four lifecycle events, allowing developers to maintain context across async boundaries, measure performance, and debug complex async flows.

```javascript
const async_hooks = require('async_hooks');

// Create hooks to track async lifecycle
const hook = async_hooks.createHook({
  init(asyncId, type, triggerAsyncId, resource) {
    // Resource created
  },
  before(asyncId) {
    // Callback about to execute
  },
  after(asyncId) {
    // Callback finished
  },
  destroy(asyncId) {
    // Resource destroyed
  }
});

hook.enable();
```

Reference: `src/async_wrap.h`, `src/async_wrap.cc`, `doc/api/async_hooks.md`

:p What are the four lifecycle events in the async_hooks system and when does each fire?
??x
1. **init(asyncId, type, triggerAsyncId, resource)**:
   - Fires when an async resource is created
   - Assigns a unique `asyncId`
   - Links to parent via `triggerAsyncId`

2. **before(asyncId)**:
   - Fires immediately before the callback is invoked
   - Marks entry into async execution context

3. **after(asyncId)**:
   - Fires immediately after the callback completes
   - Marks exit from async execution context

4. **destroy(asyncId)**:
   - Fires when the async resource is destroyed
   - May fire synchronously or asynchronously after the resource is no longer needed

There's also a special `promiseResolve(asyncId)` hook for when a promise resolves.
x??

---

#### Async Resource Provider Types
Node.js categorizes every asynchronous operation into a specific "provider type". This enumeration helps identify what kind of operation is being tracked and enables type-specific handling.

There are over 70 provider types covering all async operations in Node.js, from file system operations to network requests to cryptographic functions.

```cpp
// Examples from AsyncWrap::ProviderType enum
enum ProviderType {
  PROVIDER_FSREQCALLBACK,      // fs.readFile, fs.writeFile
  PROVIDER_TCPWRAP,            // TCP socket
  PROVIDER_UDPWRAP,            // UDP socket
  PROVIDER_HTTPINCOMINGMESSAGE,// HTTP request
  PROVIDER_PROMISE,            // Promise
  PROVIDER_TIMEOUT,            // setTimeout
  PROVIDER_IMMEDIATE,          // setImmediate
  PROVIDER_PBKDF2REQUEST,      // crypto.pbkdf2
  // ... 60+ more types
};
```

Reference: `src/async_wrap.h` (lines with ProviderType enum)

:p Why does Node.js maintain over 70 different provider types for async operations instead of just tracking them all as generic "async operations"?
??x
Specific provider types enable:

1. **Debugging**: Developers can filter async_hooks output by operation type to debug specific subsystems
2. **Performance profiling**: Measure time spent in specific operation categories (e.g., all file I/O vs all network I/O)
3. **Context propagation**: Different provider types may need different context handling
4. **Resource tracking**: Memory profilers can categorize resource usage by operation type
5. **Diagnostic reporting**: Error reports can include the type of async operation that failed

Example: When debugging a memory leak, seeing `PROVIDER_TCPWRAP` vs `PROVIDER_FSREQCALLBACK` immediately tells you whether to look at network code or file operations.
x??

---

#### Async ID Relationships
Each async operation has two IDs: its own `asyncId` and a `triggerAsyncId` pointing to the async context that created it. This creates a tree structure representing the causal relationships between async operations.

The async ID is stored as a JavaScript `number` (which is a 64-bit float). JavaScript numbers can safely represent integers up to 2^53-1, giving Node.js effectively unlimited unique IDs.

```javascript
// Conceptual tree structure
setTimeout(() => {           // asyncId: 2, triggerAsyncId: 1
  fs.readFile('x', () => {   // asyncId: 3, triggerAsyncId: 2
    Promise.resolve().then(() => {  // asyncId: 4, triggerAsyncId: 3
      // ...
    });
  });
});
```

:p Why are async IDs stored as JavaScript numbers (doubles) rather than integers, and what mathematical property makes this safe?
??x
Async IDs are stored as JavaScript `number` type (IEEE 754 double-precision float) for two reasons:

1. **JavaScript compatibility**: All JavaScript numbers are doubles; using this type avoids conversion overhead when passing IDs between C++ and JavaScript

2. **Safe integer range**: While doubles are floating-point, they can represent integers exactly up to 2^53-1 (about 9 quadrillion). This is the "safe integer" range in JavaScript.

Mathematical property: The mantissa of a 64-bit float has 53 bits, so any integer within ±2^53 can be represented exactly without rounding errors.

This gives Node.js effectively unlimited unique async IDs in practice (9 quadrillion operations is unreachable in any realistic workload).

```cpp
// In C++
double async_id_;  // Stored as double
double trigger_async_id_;
```
x??

---

#### AsyncContext Frame Stack
Node.js maintains a stack of "async context frames" that track the JavaScript execution context across async boundaries. This enables determining which code initiated an async operation, even after multiple async hops.

The context frame contains the JavaScript execution context (as a V8::Value) and links to create a stack structure. This is particularly important for async context tracking in frameworks and diagnostic tools.

```cpp
// Simplified structure
class AsyncContextFrame {
  v8::Local<v8::Value> context_frame_;  // JS execution context
  AsyncContextFrame* parent_;            // Previous frame
};
```

When an async callback executes, Node.js pushes a new frame; when it completes, the frame is popped. This maintains the "who called whom" relationship.

Reference: `src/async_wrap.h`, async context tracking code

:p How does Node.js maintain execution context across asynchronous boundaries using the AsyncContextFrame stack?
??x
Node.js uses a **stack of context frames**:

1. **Frame creation**: When an async operation starts, Node.js creates a new `AsyncContextFrame` containing the current JavaScript execution context

2. **Frame linking**: The new frame's `parent_` points to the previous frame, creating a linked list/stack

3. **Context switching**:
   - Before callback: Push new frame, making it current
   - After callback: Pop frame, restoring parent as current

4. **Context access**: At any point, code can walk up the frame stack to find the originating context

This enables features like:
- AsyncLocalStorage (Node.js equivalent of thread-local storage)
- Distributed tracing (propagating trace IDs across async operations)
- Error tracking (knowing the full async call stack when an error occurs)

```javascript
// Conceptual flow
asyncLocalStorage.run(store, () => {     // Frame A created
  setTimeout(() => {                      // Frame B created (parent: A)
    fs.readFile('x', () => {             // Frame C created (parent: B)
      // Can access store from Frame A
    });
  });
});
```
x??

---

#### Callback Queue Pattern
Node.js implements a type-safe callback queue using C++ templates. The `CallbackQueue` template allows storing callbacks with different implementations but the same signature, enabling heterogeneous callback storage.

The queue uses a FIFO (First In, First Out) ordering and provides atomic size tracking for thread safety. Callbacks can be marked as "refed" or "unrefed" to control event loop behavior.

```cpp
// Template-based callback queue
template <typename R, typename... Args>
class CallbackQueue {
  // Store callbacks: (Args...) -> R
  void Push(std::unique_ptr<Callback> cb);
  std::unique_ptr<Callback> Shift();  // Remove and return first

  enum Flags {
    kRefed = 1,    // Keeps event loop alive
    kUnrefed = 2   // Doesn't prevent exit
  };
};

// Example usage
CallbackQueue<void, int> queue;
queue.Push(MakeCallback([](int x) { /* ... */ }));
auto cb = queue.Shift();  // Get first callback
```

Reference: `src/callback_queue.h`

:p What is the purpose of the CallbackQueue template pattern in Node.js and why use templates instead of a simple function pointer array?
??x
The `CallbackQueue` template provides **type-safe heterogeneous callback storage**:

**Why templates?**
1. **Type safety**: The compiler ensures all callbacks match the signature `(Args...) -> R`
2. **Heterogeneous storage**: Different callback implementations (lambdas, function pointers, bound methods) can be stored together
3. **Zero-cost abstraction**: Template specialization eliminates runtime overhead

**Advantages over function pointers:**
- Function pointers can't capture state (no closures)
- Templates allow storing std::function, lambdas, and any callable
- Type erasure via inheritance while maintaining type safety at the template level

```cpp
// Different callback types, same queue
CallbackQueue<void, int> q;

q.Push([x = 5](int y) { /* lambda with capture */ });
q.Push(&freeFunction);  // function pointer
q.Push(std::bind(&Class::method, obj, _1));  // bound method

// All type-checked at compile time!
```

This pattern is used throughout Node.js for: cleanup hooks, request callbacks, async operations, and more.
x??

---

#### Cleanup Queue LIFO Ordering
Node.js uses a cleanup queue to manage resource cleanup during shutdown. Unlike most queues, the cleanup queue executes in **LIFO (Last In, First Out)** order—newest hooks run first.

This reverse ordering handles cleanup dependencies: resources created later often depend on resources created earlier, so they should be cleaned up in reverse order.

```cpp
// Simplified CleanupQueue
class CleanupQueue {
  std::unordered_set<CleanupHook> set_;  // For O(1) removal
  uint64_t insertion_counter_;            // Track order

  void Add(CleanupHook hook) {
    hook.insertion_order_ = insertion_counter_++;
    set_.insert(hook);
  }

  void Drain() {
    // Sort by insertion_order DESC, then execute
    for (auto& hook : sorted_reverse()) {
      hook.callback_();
    }
  }
};
```

Reference: `src/cleanup_queue.h`

:p Why does Node.js execute cleanup hooks in LIFO (Last In, First Out) order rather than FIFO order?
??x
**LIFO ordering handles resource dependencies:**

When resource B depends on resource A:
1. A is created first (earlier in execution)
2. B is created second (depends on A)
3. B's cleanup hook added to queue
4. A's cleanup hook added to queue

At shutdown:
1. B's cleanup runs first (LIFO)
2. B releases its dependency on A
3. A's cleanup runs second
4. A can safely clean up

**Example scenario:**
```javascript
// Database connection created first
const db = createDB();
db.onCleanup(() => db.disconnect());

// HTTP server using DB created second
const server = createServer((req, res) => {
  db.query(...);  // Depends on db
});
server.onCleanup(() => server.close());

// Cleanup order: server.close() THEN db.disconnect()
// This ensures no requests try to use the DB after it's closed
```

If cleanup ran in FIFO order, we'd close the database before the HTTP server, potentially causing errors when the server tries to finish pending requests.
x??
