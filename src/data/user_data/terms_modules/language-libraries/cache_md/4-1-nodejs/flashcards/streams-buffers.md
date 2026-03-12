# Streams and Buffers Flashcards

#### Stream Architecture Overview
Node.js streams are an abstraction for working with flowing data. All streams are instances of EventEmitter and come in four base types. Understanding streams is crucial because they're used throughout Node.js for I/O operations.

Streams provide a consistent interface whether you're reading from a file, network socket, HTTP request, or any other data source.

```javascript
// Four stream types
const { Readable, Writable, Duplex, Transform } = require('stream');

// 1. Readable: Source of data
const readable = fs.createReadStream('input.txt');

// 2. Writable: Destination for data
const writable = fs.createWriteStream('output.txt');

// 3. Duplex: Both readable and writable
const socket = net.connect(8080);  // Can read and write

// 4. Transform: Duplex that modifies data
const gzip = zlib.createGzip();  // Reads input, writes compressed
```

Reference: `doc/api/stream.md`, `src/js_stream.h`

:p What are the four types of streams in Node.js and what distinguishes each type?
??x
**Four stream types:**

1. **Readable Stream:**
   - Source of data (read-only)
   - Examples: `fs.createReadStream()`, `http.IncomingMessage`, `process.stdin`
   - Interface: `.read()`, `.on('data')`, `.on('end')`

2. **Writable Stream:**
   - Destination for data (write-only)
   - Examples: `fs.createWriteStream()`, `http.ServerResponse`, `process.stdout`
   - Interface: `.write()`, `.end()`, `.on('drain')`

3. **Duplex Stream:**
   - Both readable and writable with independent channels
   - Examples: `net.Socket`, `crypto.Cipher`
   - Interface: Combines Readable + Writable methods
   - Key: Read and write sides are **independent** (reading doesn't affect writing)

4. **Transform Stream:**
   - Special type of Duplex where output is computed from input
   - Examples: `zlib.createGzip()`, `crypto.createHash()`
   - Interface: Same as Duplex, but read side provides transformed write side data
   - Key: Read and write sides are **connected** (output derived from input)

**Relationship:**
```
Readable ────┐
             ├──→ Duplex ──→ Transform
Writable ────┘
```

Transform is a Duplex, and Duplex combines Readable and Writable.
x??

---

#### StreamBase C++ Interface
Node.js implements a C++ `StreamBase` class that provides the foundation for all streams. This abstraction allows JavaScript streams to be backed by various underlying implementations (files, sockets, pipes) with a consistent interface.

```cpp
// Simplified StreamBase interface
class StreamBase {
  // Reading interface
  virtual int ReadStart() = 0;   // Start reading data
  virtual int ReadStop() = 0;    // Pause reading

  // Writing interface
  virtual int DoWrite(
    WriteWrap* req,
    uv_buf_t* bufs,
    size_t count,
    uv_stream_t* send_handle
  ) = 0;

  virtual int DoShutdown(ShutdownWrap* req) = 0;

  // Callbacks (called by libuv)
  void OnStreamRead(ssize_t nread, const uv_buf_t* buf);
  void OnStreamAlloc(size_t suggested_size, uv_buf_t* buf);
};

// Concrete implementations
class TCPWrap : public StreamBase { /* ... */ };
class PipeWrap : public StreamBase { /* ... */ };
class JSStream : public StreamBase { /* ... */ };
```

Reference: `src/stream_base.h`, `src/js_stream.h`

:p What is the purpose of the StreamBase abstract class in Node.js C++ code?
??x
**StreamBase** provides a uniform interface for all stream implementations:

**Purpose:**
1. **Abstraction**: Different stream types (TCP, pipe, file, custom) implement same interface
2. **Polymorphism**: Code can work with any stream type without knowing specifics
3. **Libuv integration**: Bridges libuv callbacks to Node.js stream events

**Key methods:**

**Reading:**
```cpp
ReadStart()  // Begin reading from stream (calls libuv uv_read_start)
ReadStop()   // Pause reading (calls uv_read_stop)
OnStreamRead(nread, buf)  // Callback when data arrives
```

**Writing:**
```cpp
DoWrite(req, bufs, count, handle)  // Write data to stream
DoShutdown(req)  // Close write side
```

**Concrete implementations:**
```cpp
// TCP socket stream
class TCPWrap : public StreamBase {
  int ReadStart() override {
    return uv_read_start(&handle_, OnAlloc, OnRead);
  }
};

// JavaScript-backed stream
class JSStream : public StreamBase {
  int ReadStart() override {
    // Calls JavaScript onread callback
    return CallJSMethod("onread");
  }
};
```

**Benefits:**
- File operations, network operations, and custom streams all use the same API
- Enables piping between different stream types: `fileStream.pipe(socket)`
- C++ code can work with streams generically without type-specific logic

**Example usage:**
```cpp
void PipeData(StreamBase* from, StreamBase* to) {
  from->ReadStart();  // Works for TCP, Pipe, File, etc.
  // Data flows from 'from' to 'to'
}
```

Without StreamBase, every stream type would need custom handling code.
x??

---

#### DataQueue Pattern
Node.js uses a sophisticated `DataQueue` pattern for buffering stream data. There are two variants: **idempotent** (immutable, replayable) and **non-idempotent** (mutable, single-read).

This pattern enables efficient memory management, slicing, and sharing of stream data across multiple readers.

```cpp
// Idempotent queue - immutable, replayable
class IdempotentDataQueue {
  std::vector<DataEntry> entries_;  // Immutable vector

  // Create subset view (no copy!)
  std::shared_ptr<DataQueue> slice(size_t offset, size_t length) {
    // Returns new queue viewing subset of same data
  }

  // Can read multiple times
  DataEntry peek();
};

// Non-idempotent queue - mutable, consume-on-read
class NonIdempotentDataQueue {
  std::deque<DataEntry> entries_;  // Mutable deque

  // Read and remove (destructive)
  DataEntry shift();

  // Limit size
  void cap(size_t max_size);
};
```

Reference: `src/dataqueue/queue.h`

:p What is the difference between idempotent and non-idempotent DataQueue in Node.js and when is each used?
??x
**Idempotent DataQueue:**
- **Immutable**: Once created, cannot be modified
- **Replayable**: Can read the same data multiple times
- **Shareable**: Multiple readers can safely share the same queue
- **Sliceable**: Create views into subsets without copying

```cpp
auto queue = DataQueue::CreateIdempotent(entries);

// Read multiple times
auto data1 = queue->peek();  // Read
auto data2 = queue->peek();  // Same data again

// Create slice (no copy!)
auto subset = queue->slice(10, 100);  // Bytes 10-110
```

**Use cases:**
- HTTP response bodies (may need to retry)
- Resource loading (cache and replay)
- Multi-consumer scenarios

**Non-idempotent DataQueue:**
- **Mutable**: Can add/remove entries
- **Single-read**: Data consumed on read
- **Memory-bounded**: Can limit size to prevent overflow

```cpp
auto queue = DataQueue::Create();

queue->append(entry);      // Add data
auto data = queue->shift();  // Read and remove
// Data is gone, cannot read again

queue->cap(1024 * 1024);   // Limit to 1MB
```

**Use cases:**
- Streaming scenarios (process once, discard)
- Memory-constrained pipes
- Live data feeds

**Mathematical model:**

Idempotent is like a **pure function** f(x):
- Calling f(x) multiple times always returns same result
- No side effects

Non-idempotent is like a **stateful iterator**:
- Calling next() changes state
- Each call returns different result

**Memory efficiency:**
```cpp
// Idempotent: Share 1MB buffer across 10 readers
IdempotentQueue queue(1MB_buffer);
// Memory: 1MB + 10 × (small metadata)

// Non-idempotent: Each reader needs own buffer
NonIdempotentQueue q1(1MB_buffer);
NonIdempotentQueue q2(1MB_buffer);
// Memory: 2MB
```
x??

---

#### Buffer Memory Management
Node.js Buffers are backed by V8 ArrayBuffer objects with custom allocation strategies. Understanding buffer memory management is crucial for performance and avoiding memory leaks.

Buffers use external memory (allocated outside V8 heap) but tracked by V8's garbage collector.

```javascript
// Three buffer allocation methods
const buf1 = Buffer.alloc(1024);         // Zeroed
const buf2 = Buffer.allocUnsafe(1024);   // Not zeroed (faster)
const buf3 = Buffer.from([1, 2, 3]);     // From array

// Memory characteristics
// buf1: Allocated + zeroed (slow, safe)
// buf2: Allocated, not zeroed (fast, unsafe - may contain sensitive data)
// buf3: Allocated + copied (moderate)
```

**Memory lifecycle:**
```cpp
// C++ implementation
Buffer::New(isolate, size) {
  // 1. Allocate external memory
  char* data = ArrayBufferAllocator::Allocate(size);

  // 2. Create V8 ArrayBuffer wrapping it
  v8::Local<v8::ArrayBuffer> ab =
    v8::ArrayBuffer::New(isolate, data, size,
      v8::ArrayBufferCreationMode::kExternalized);

  // 3. V8 tracks memory, will call FreeCallback when GC'd
  ab->SetFreeCallback(FreeCallback, data);
}
```

Reference: `src/node_buffer.h`, `src/node_buffer.cc`, `doc/api/buffer.md`

:p What is the difference between Buffer.alloc, Buffer.allocUnsafe, and Buffer.from in terms of performance and security?
??x
**Three allocation methods with different trade-offs:**

**1. Buffer.alloc(size):**
```javascript
const buf = Buffer.alloc(1024);  // All bytes = 0
```
- **Performance**: Slow (must zero memory)
- **Security**: Safe (no leaked data)
- **Use when**: Security matters more than speed
- **Cost**: ~5-10ns per byte (zeroing overhead)

**2. Buffer.allocUnsafe(size):**
```javascript
const buf = Buffer.allocUnsafe(1024);  // May contain old data!
```
- **Performance**: Fast (skips zeroing)
- **Security**: Unsafe (may contain sensitive data from previous allocations)
- **Use when**: Immediately overwriting entire buffer
- **Cost**: ~1ns per byte (allocation only)

**Security risk:**
```javascript
// Process previously had password in memory
const oldBuf = Buffer.from('password123');
// Buffer freed...

// Later, allocUnsafe may return same memory
const newBuf = Buffer.allocUnsafe(20);
console.log(newBuf.toString());  // Might print "password123"!
```

**3. Buffer.from(data):**
```javascript
const buf = Buffer.from([1, 2, 3]);
const buf2 = Buffer.from('hello', 'utf8');
```
- **Performance**: Moderate (allocate + copy)
- **Security**: Safe (new allocation with known data)
- **Use when**: Creating buffer from existing data
- **Cost**: Allocation + copy cost

**Performance comparison (1MB buffer):**
```javascript
// Buffer.alloc: ~10ms (allocate + zero)
// Buffer.allocUnsafe: ~0.5ms (allocate only)
// Buffer.from: ~5ms (allocate + copy)
```

**Best practices:**
```javascript
// Safe pattern with allocUnsafe
const buf = Buffer.allocUnsafe(1024);
buf.fill(0);  // Explicitly zero if needed

// Or better: only if immediately writing
const buf = Buffer.allocUnsafe(1024);
someStream.read(buf);  // Entire buffer overwritten
```

**Key insight**: `allocUnsafe` is "unsafe" not because it crashes, but because it may leak data across security boundaries in the same process.
x??

---

#### Backpressure Handling
Backpressure is the mechanism streams use to prevent faster producers from overwhelming slower consumers. Understanding backpressure is essential for writing memory-efficient stream code.

When a writable stream's buffer fills up, `write()` returns `false`, signaling the producer to pause. When the buffer drains, the `drain` event fires, signaling it's safe to resume.

```javascript
// Backpressure in action
const readable = fs.createReadStream('huge-file.txt');
const writable = fs.createWriteStream('output.txt');

readable.on('data', (chunk) => {
  const canContinue = writable.write(chunk);

  if (!canContinue) {
    // Buffer full! Pause reading
    readable.pause();
    console.log('Backpressure: pausing read');
  }
});

writable.on('drain', () => {
  // Buffer drained, resume reading
  console.log('Drain: resuming read');
  readable.resume();
});

// OR just use pipe() which handles backpressure automatically
readable.pipe(writable);
```

**Without backpressure:** Fast producer → full memory → crash

**With backpressure:** Fast producer → pause → wait for consumer → resume

Reference: `doc/api/stream.md`

:p What is backpressure in Node.js streams and how does it prevent memory exhaustion?
??x
**Backpressure** is flow control to match producer speed with consumer speed:

**Problem without backpressure:**
```javascript
// Fast producer (read 1GB file)
const readable = fs.createReadStream('huge.txt');
const writable = slowNetworkStream();

readable.on('data', chunk => {
  writable.write(chunk);  // Ignoring return value!
});

// Result: Writable buffers ALL data in memory
// Memory usage: 1GB+ (entire file buffered)
// Eventually: Out of memory crash
```

**Solution with backpressure:**
```javascript
readable.on('data', chunk => {
  const canContinue = writable.write(chunk);

  if (!canContinue) {  // Buffer full
    readable.pause();   // Stop producing
  }
});

writable.on('drain', () => {  // Buffer emptied
  readable.resume();           // Resume producing
});
```

**Flow control mechanism:**
```
Time 0: Producer [=====|     ]  Consumer
        (fast)          ↓ data  (slow)
                    [=========]  Buffer (empty)

Time 1: Producer [=====|     ]
                        ↓↓↓↓↓
                    [#########]  Buffer (full!)
        write() returns FALSE

Time 2: Producer [=====|     ]  PAUSED
                    [#########]  Buffer (full)
                        ↓↓↓↓↓
                                 Consumer (draining)

Time 3: Producer [=====|     ]  PAUSED
                    [#####    ]  Buffer (draining)
                        ↓↓↓
                                 Consumer (draining)

Time 4: Producer [=====|     ]  RESUMED
        'drain' event fired
                    [         ]  Buffer (empty)
```

**Mathematical model:**
```
producer_rate > consumer_rate + buffer_capacity / time
→ Memory exhaustion

With backpressure:
producer_rate = consumer_rate (flow control)
→ Bounded memory
```

**Real numbers:**
- Without backpressure: 1GB/s producer, 10MB/s consumer = 990MB buffered per second
- With backpressure: Buffer size = ~64KB (configurable), constant memory usage

**pipe() handles this automatically:**
```javascript
readable.pipe(writable);  // Backpressure managed internally
```

**Key insight:** Backpressure turns unbounded memory growth into bounded, controlled flow.
x??

---

#### Highwater Mark
The `highWaterMark` is a threshold that determines when a stream's internal buffer is "full" and backpressure should be applied. It's a tuning parameter that affects performance and memory usage.

Different values are appropriate for different scenarios: small for memory-constrained environments, large for high-throughput scenarios.

```javascript
// Setting highWaterMark
const readable = fs.createReadStream('file.txt', {
  highWaterMark: 64 * 1024  // 64KB (default: 16KB)
});

const writable = fs.createWriteStream('output.txt', {
  highWaterMark: 1024 * 1024  // 1MB (default: 16KB)
});

// How it affects behavior
writable.write(data1);  // returns true
writable.write(data2);  // returns true
// ... buffer filling ...
writable.write(dataN);  // returns false (hit highWaterMark)
```

**Trade-off:**
- **Low highWaterMark**: Less memory, more frequent pauses, lower throughput
- **High highWaterMark**: More memory, fewer pauses, higher throughput

Reference: `doc/api/stream.md`

:p What is highWaterMark in Node.js streams and how should you choose an appropriate value?
??x
**highWaterMark** is the buffer size threshold that triggers backpressure:

**How it works:**
```javascript
const writable = new Writable({
  highWaterMark: 16384  // 16KB
});

let buffered = 0;

writable.write(chunk1);  // buffered = 8KB, returns true
writable.write(chunk2);  // buffered = 16KB, returns true
writable.write(chunk3);  // buffered = 24KB, returns FALSE (exceeded!)
// Backpressure triggered!
```

**Choosing appropriate values:**

**Low highWaterMark (1-16 KB):**
```javascript
{ highWaterMark: 4 * 1024 }  // 4KB
```
- ✅ Low memory usage
- ✅ Good for many concurrent streams
- ❌ More syscalls (overhead)
- ❌ Lower throughput
- **Use for**: IoT devices, memory-constrained systems, many concurrent streams

**Medium highWaterMark (16-256 KB):**
```javascript
{ highWaterMark: 64 * 1024 }  // 64KB (Node.js default is 16KB)
```
- ✅ Balanced memory/performance
- ✅ Good for most applications
- **Use for**: General-purpose applications (default choice)

**High highWaterMark (256 KB - several MB):**
```javascript
{ highWaterMark: 1024 * 1024 }  // 1MB
```
- ✅ High throughput
- ✅ Fewer context switches
- ❌ High memory per stream
- ❌ Latency (data buffered longer)
- **Use for**: Bulk data processing, few concurrent streams, fast networks

**Mathematical consideration:**
```
Optimal highWaterMark ≈ bandwidth × latency

Example:
- Network: 1 GB/s
- Latency: 10ms
- Optimal: 1GB/s × 0.01s = 10MB

Example 2:
- Disk: 100 MB/s
- Latency: 1ms
- Optimal: 100MB/s × 0.001s = 100KB
```

**Real-world example:**
```javascript
// Bad: Too small for high-speed network
const socket = net.connect(8080, {
  highWaterMark: 1024  // 1KB - will pause constantly!
});

// Good: Appropriate for high-speed network
const socket = net.connect(8080, {
  highWaterMark: 256 * 1024  // 256KB - smooth flow
});
```

**Key insight:** highWaterMark is a trade-off between memory usage and throughput. Tune based on your specific constraints and measurements.
x??

---

#### Stream Modes: Flowing vs Paused
Readable streams operate in two modes: **flowing** mode (data automatically pushed) and **paused** mode (data pulled on demand). Understanding these modes is crucial for correctly handling streams.

The mode affects how data is consumed and how backpressure is managed.

```javascript
const readable = fs.createReadStream('file.txt');

// Paused mode (default) - pull-based
readable.on('readable', () => {
  let chunk;
  while (null !== (chunk = readable.read())) {
    console.log('Read:', chunk.length);
  }
});

// Switch to flowing mode - push-based
readable.on('data', (chunk) => {
  console.log('Data:', chunk.length);
});

// Transitions
readable.pause();   // flowing → paused
readable.resume();  // paused → flowing
```

**Key differences:**
- **Paused**: `read()` pulls data when ready
- **Flowing**: `data` event pushes data automatically

Reference: `doc/api/stream.md`

:p What are the two modes of readable streams in Node.js and how do you transition between them?
??x
**Two modes:**

**1. Paused Mode (default, pull-based):**
```javascript
const readable = fs.createReadStream('file.txt');

// Consumer explicitly pulls data
readable.on('readable', () => {
  let chunk;
  while (null !== (chunk = readable.read())) {
    // Process chunk
    console.log(chunk);
  }
});

// Data is NOT emitted until read() is called
```

**Characteristics:**
- Data buffered until `read()` called
- Consumer controls flow
- More control, more complex

**2. Flowing Mode (push-based):**
```javascript
const readable = fs.createReadStream('file.txt');

// Data automatically pushed via events
readable.on('data', (chunk) => {
  // Process chunk
  console.log(chunk);
});

// Data flows automatically
```

**Characteristics:**
- Data emitted immediately via `data` events
- Stream controls flow
- Simpler, less control

**Transitions:**

**Enter flowing mode:**
```javascript
// 1. Add 'data' event listener
readable.on('data', handler);

// 2. Call resume()
readable.resume();

// 3. Call pipe()
readable.pipe(writable);
```

**Exit flowing mode (enter paused):**
```javascript
// 1. Call pause() (if no pipe)
readable.pause();

// 2. Remove all 'data' listeners (without pipe)
readable.removeAllListeners('data');

// 3. Call unpipe()
readable.unpipe();
```

**State machine:**
```
          on('data')
          resume()
          pipe()
Paused ─────────────→ Flowing
   ↑                      │
   │      pause()         │
   │      unpipe()        │
   │      remove 'data'   │
   └──────────────────────┘
```

**Common pitfall:**
```javascript
const readable = fs.createReadStream('file.txt');

// Adding 'data' listener switches to flowing mode
readable.on('data', chunk => console.log(chunk));

// This won't work! Already in flowing mode
readable.on('readable', () => {
  readable.read();  // Will never be called!
});
```

**Best practice:**
- Use **flowing mode** with `pipe()` or `data` events for simplicity
- Use **paused mode** with `readable` events when you need fine-grained control

**Key insight:** The mode determines whether consumer pulls data or producer pushes data—a fundamental control flow decision.
x??

---

#### Object Mode Streams
By default, streams work with Buffers and strings. **Object mode** allows streams to work with arbitrary JavaScript objects, enabling high-level data pipelines.

Object mode is particularly useful for processing structured data through multiple transformation stages.

```javascript
const { Transform } = require('stream');

// Regular stream: Buffers/strings
const regular = new Transform({
  transform(chunk, encoding, callback) {
    // chunk is a Buffer
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

// Object mode stream: Any JS objects
const objectMode = new Transform({
  objectMode: true,
  transform(obj, encoding, callback) {
    // obj is whatever was written
    this.push({
      ...obj,
      processed: true,
      timestamp: Date.now()
    });
    callback();
  }
});

// Usage
objectMode.write({ id: 1, name: 'Alice' });
objectMode.write({ id: 2, name: 'Bob' });

objectMode.on('data', obj => {
  console.log(obj);  // { id: 1, name: 'Alice', processed: true, timestamp: ... }
});
```

Reference: `doc/api/stream.md`

:p What is object mode in Node.js streams and when should you use it?
??x
**Object mode** allows streams to transport arbitrary JavaScript objects instead of just Buffers/strings:

**Regular stream (default):**
```javascript
const transform = new Transform({
  transform(chunk, encoding, callback) {
    // chunk is ALWAYS a Buffer
    const str = chunk.toString();
    this.push(Buffer.from(str.toUpperCase()));
    callback();
  }
});

stream.write('hello');          // Converted to Buffer
stream.write(Buffer.from('x')); // Already a Buffer
stream.write({ x: 1 });         // Error! Objects not allowed
```

**Object mode stream:**
```javascript
const transform = new Transform({
  objectMode: true,
  transform(obj, encoding, callback) {
    // obj can be ANYTHING
    if (typeof obj === 'object') {
      this.push({ ...obj, processed: true });
    } else {
      this.push(obj);
    }
    callback();
  }
});

stream.write('hello');    // ✅ String passed through
stream.write({ x: 1 });   // ✅ Object passed through
stream.write([1, 2, 3]);  // ✅ Array passed through
stream.write(null);       // ✅ Even null (careful!)
```

**When to use object mode:**

**Use object mode:**
1. **Data pipelines**: Processing structured data through multiple stages
```javascript
readJSONLines()
  .pipe(parseObjects())
  .pipe(validateObjects())
  .pipe(transformObjects())
  .pipe(writeToDatabase())
```

2. **High-level abstractions**: Working with business objects rather than bytes
```javascript
getUserStream()  // Emits user objects
  .pipe(filterActive())
  .pipe(enrichWithProfile())
  .pipe(formatForAPI())
```

3. **Avoiding serialization overhead**: No need to JSON.stringify/parse between stages

**Don't use object mode:**
1. **Binary data**: Images, videos, files (use regular streams)
2. **Network protocols**: HTTP, TCP (need byte-level control)
3. **Performance-critical**: Object mode has overhead, regular streams are faster

**Important notes:**
- `highWaterMark` in object mode counts **objects**, not bytes
```javascript
{ objectMode: true, highWaterMark: 16 }  // 16 objects, not 16KB
```

- Cannot pipe object mode stream to non-object mode (and vice versa):
```javascript
objectStream.pipe(byteStream);  // ❌ Will break!
```

**Example pipeline:**
```javascript
// Parse CSV → Transform → Filter → Output
const pipeline = require('stream').pipeline;

pipeline(
  fs.createReadStream('data.csv'),        // Bytes
  csvParser({ objectMode: true }),        // Bytes → Objects
  new Transform({
    objectMode: true,
    transform(row, _, cb) {
      row.processed = true;
      cb(null, row);
    }
  }),
  new Writable({
    objectMode: true,
    write(obj, _, cb) {
      console.log(obj);
      cb();
    }
  }),
  (err) => { if (err) console.error(err); }
);
```
x??
