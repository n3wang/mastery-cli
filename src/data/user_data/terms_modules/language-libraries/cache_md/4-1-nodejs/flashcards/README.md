# Node.js Flashcards

This directory contains comprehensive flashcards covering the architecture, design patterns, and implementation details of Node.js. These flashcards are designed to build familiarity and deep understanding of how Node.js works internally.

## Philosophy

These flashcards focus on **understanding over memorization**. Each card includes:
- Context and background to understand the "why"
- Code examples and pseudocode showing the "how"
- Connections to related concepts
- Practical implications and use cases

## Flashcard Format

The flashcards follow this structure:
- Separated by `---`
- Level 4 headers (`####`) for titles
- Description/context before the question
- `:p` marks the prompt (question)
- `??x` starts the answer
- `x??` ends the answer

Example:
```markdown
#### Concept Name
Background context and explanation...

:p What is the question?
??x
The answer with detailed explanation and code examples...
x??
```

## Files and Topics

### 1. Event Loop and Async Concepts
**File:** `event-loop-async.md`
**Topics:**
- Event loop phases (timers, poll, check, close)
- setImmediate vs setTimeout execution order
- Handle and Request wrapping patterns (HandleWrap, ReqWrap)
- Async hooks system (init, before, after, destroy)
- Async resource provider types (70+ types)
- Async ID relationships and tracking
- AsyncContext frame stack for context propagation
- Callback queue pattern and LIFO cleanup queue
- Mathematical concepts (async ID generation, safe integer range)

**Key Files Referenced:**
- `src/handle_wrap.h` - Handle lifecycle management
- `src/req_wrap.h` - Request wrapping
- `src/async_wrap.h` - Async hooks implementation
- `src/callback_queue.h` - Type-safe callback storage
- `doc/api/timers.md` - Event loop documentation

### 2. Module System and Architecture
**File:** `module-system.md`
**Topics:**
- Module wrapper function (exports, require, module, __filename, __dirname)
- Module cache keying with import attributes
- Dual module system (CommonJS vs ESM)
- Module phases (source phase, evaluation phase)
- Code caching mechanism for performance
- Module resolution algorithm and node_modules traversal
- Package.json "type" field for module interpretation
- Conditional exports for environment-specific code

**Key Files Referenced:**
- `src/module_wrap.h` - Module loading implementation
- `doc/api/modules.md` - CommonJS documentation
- `doc/api/esm.md` - ECMAScript modules documentation
- `doc/api/packages.md` - Package configuration

### 3. C++ Binding and V8 Integration
**File:** `cpp-v8-integration.md`
**Topics:**
- BaseObject pattern for JS/C++ binding
- Inheritance hierarchy (MemoryRetainer → BaseObject → AsyncWrap → HandleWrap/ReqWrap)
- V8 internal fields for fast C++ pointer retrieval
- Isolate-Context relationship (isolated V8 instances)
- Multi-Isolate Platform for Worker Threads
- Aliased Buffer technique for zero-copy C++/JS data sharing
- Weak references and garbage collection coordination
- Memory tracking interface (MemoryRetainer)
- Function template pattern for exposing C++ classes to JS

**Key Files Referenced:**
- `src/base_object.h` - Base class for all JS-exposed C++ objects
- `src/async_wrap.h` - Async operation tracking
- `src/handle_wrap.h` - libuv handle wrapping
- `src/aliased_buffer.h` - Zero-copy memory sharing
- `src/memory_tracker.h` - Memory accounting
- `src/env.h` - Environment and V8 integration
- `src/node.h` - Public API and initialization

### 4. Streams and Buffers
**File:** `streams-buffers.md`
**Topics:**
- Stream architecture (Readable, Writable, Duplex, Transform)
- StreamBase C++ interface for uniform stream handling
- DataQueue pattern (idempotent vs non-idempotent)
- Buffer memory management (alloc, allocUnsafe, from)
- Backpressure handling to prevent memory exhaustion
- highWaterMark tuning for performance vs memory trade-offs
- Stream modes (flowing vs paused)
- Object mode streams for structured data pipelines

**Key Files Referenced:**
- `src/stream_base.h` - Base class for all streams
- `src/js_stream.h` - JavaScript stream bridge
- `src/dataqueue/queue.h` - Stream buffering
- `src/node_buffer.h` - Buffer implementation
- `doc/api/stream.md` - Stream API documentation
- `doc/api/buffer.md` - Buffer API documentation

---

## API Usage Flashcards

### 5. File System API
**File:** `api-filesystem.md`
**Topics:**
- Three async patterns (sync, callback, promises)
- File system flags (r, w, a, r+, w+, a+)
- When to use streams vs readFile for large files
- Path resolution differences between require() and fs
- File descriptors and manual control
- fs.stat() for file metadata and use cases

**Key Concepts:**
- Sync methods block event loop (avoid in production)
- Streams for files >10MB
- Path resolution relative to process.cwd() not __dirname
- File descriptor lifecycle management
- Stats object for file information

**Reference:** `doc/api/fs.md`

### 6. HTTP/HTTPS API
**File:** `api-http.md`
**Topics:**
- Creating HTTP servers and lifecycle
- Reading request headers and setting response headers
- Parsing request bodies (streaming nature)
- HTTP Keep-Alive and connection pooling with Agents
- HTTPS configuration and certificate management

**Key Concepts:**
- Headers must be set before response body
- Request bodies are streams (must buffer chunks)
- Keep-Alive reuses TCP connections (performance)
- Agent manages connection pools
- HTTPS requires certificate and key files

**Reference:** `doc/api/http.md`, `doc/api/https.md`

### 7. Process and Events API
**File:** `api-process-events.md`
**Topics:**
- process.exit() vs process.exitCode vs 'exit' event
- Environment variables (process.env)
- Signal handling (SIGTERM, SIGINT, SIGKILL, SIGHUP)
- EventEmitter pattern and core methods
- Special 'error' event handling

**Key Concepts:**
- 'exit' event must be synchronous
- All environment variables are strings
- SIGKILL cannot be caught
- EventEmitter listeners execute synchronously
- Unhandled 'error' events crash process

**Reference:** `doc/api/process.md`, `doc/api/events.md`

### 8. Crypto, Path, and URL APIs
**File:** `api-crypto-path-url.md`
**Topics:**
- Cryptographic hashing (sha256, sha512)
- HMAC for message authentication
- path.join() vs path.resolve()
- Cross-platform path manipulation
- WHATWG URL API for parsing and manipulation

**Key Concepts:**
- Hashing is one-way (cannot reverse)
- HMAC provides authentication + integrity
- path.join() concatenates, path.resolve() makes absolute
- Use WHATWG URL, not legacy url.parse()
- URLSearchParams for query string manipulation

**Reference:** `doc/api/crypto.md`, `doc/api/path.md`, `doc/api/url.md`

---

## How to Use These Flashcards

### Learning Path

**For API Usage** (Practical development):
1. **Start here**: File System API basics (sync vs async patterns)
2. HTTP server creation and request handling
3. Environment variables and process lifecycle
4. EventEmitter pattern for custom events
5. Path and URL manipulation
6. Crypto hashing basics

**For Architecture Understanding** (Internals):
1. **Start here**: Event loop phases (foundation)
2. Module wrapper function (how code runs)
3. Stream architecture basics (four types)
4. Buffer allocation methods
5. Async hooks system
6. BaseObject pattern (JS/C++ binding)

**Intermediate Level** (Both tracks):
1. HTTP Keep-Alive and connection pooling
2. Process signals for graceful shutdown
3. HMAC for API authentication
4. Module resolution and caching
5. Async operation tracking
6. Backpressure and stream flow control

**Advanced Level** (Deep internals):
1. HandleWrap/ReqWrap patterns and libuv integration
2. Multi-Isolate Platform architecture
3. Aliased Buffer technique for performance
4. DataQueue patterns and memory management
5. Weak references and GC coordination
6. V8 internal fields and function templates

### Study Techniques

**1. Active Recall:**
- Read the context/description
- Try to answer the question before revealing the answer
- Compare your answer with the provided answer

**2. Elaborative Interrogation:**
- Ask yourself "Why does this work this way?"
- Connect concepts to other knowledge
- Think about alternative designs and their trade-offs

**3. Code Exploration:**
- Use the referenced file paths to explore the actual source code
- Set breakpoints and debug to see concepts in action
- Modify examples to test your understanding

**4. Build Mental Models:**
- Draw diagrams of architectures (event loop, inheritance hierarchies)
- Trace data flow through systems (stream pipelines, module loading)
- Create analogies to familiar concepts

## Additional Resources

### Source Code References
All flashcards reference specific source files. Key directories:
- `src/` - C++ implementation
- `doc/api/` - API documentation
- `lib/` - JavaScript implementation

### Useful Commands for Exploration

```bash
# Search for concept in source
grep -r "HandleWrap" src/

# Find all async provider types
grep "PROVIDER_" src/async_wrap.h

# Explore module loading
node --inspect-brk -e "require('./mymodule')"
# Then use Chrome DevTools to step through

# Check V8 flags
node --v8-options | grep -i "optimize"
```

### Debugging Node.js Internals

```javascript
// Enable async hooks debugging
const async_hooks = require('async_hooks');
async_hooks.createHook({
  init(asyncId, type, triggerAsyncId) {
    console.log(`Init: ${type} (${asyncId}), triggered by ${triggerAsyncId}`);
  }
}).enable();

// Run your code to see async operations
```

## Contributing

To add new flashcards:
1. Follow the existing format (level 4 header, context, `:p` question, `??x` answer `x??`)
2. Include code examples and pseudocode where helpful
3. Reference source file locations
4. Focus on understanding, not just facts
5. Explain the "why" and implications
6. Connect to related concepts

## Summary Statistics

**Current Coverage:**
- **Architecture Flashcards**: 4 files, ~34 flashcards
- **API Usage Flashcards**: 4 files, ~30 flashcards
- **Total**: 8 files, ~64 flashcards

**Topics Covered:**
- ✅ Event Loop and Async (internals)
- ✅ Module System (CommonJS & ESM)
- ✅ C++ Bindings and V8
- ✅ Streams and Buffers (architecture)
- ✅ File System API
- ✅ HTTP/HTTPS API
- ✅ Process and Events API
- ✅ Crypto, Path, and URL APIs

## Topics for Future Flashcards

Potential areas to expand:

**Additional APIs:**
- Child Process API (spawn, exec, fork)
- Cluster module (worker management)
- DNS API (resolution, lookup)
- Net API (TCP sockets, servers)
- UDP/Datagram sockets (dgram)
- TLS/SSL (secure sockets)
- Performance hooks (measuring)
- Worker Threads API
- Readline and TTY
- OS module (system information)

**Advanced Internals:**
- Process initialization sequence
- V8 garbage collection integration
- Native addons and N-API
- Diagnostic reports and tracing
- Permissions system (experimental)
- Test runner (built-in)
- Watch mode implementation
- QUIC protocol support (experimental)

**Patterns and Best Practices:**
- Error handling patterns
- Async error propagation
- Memory leak prevention
- Security best practices
- Performance optimization
- Testing strategies
- Debugging techniques

## Feedback

These flashcards are living documents. If you find:
- Incorrect information
- Unclear explanations
- Missing important concepts
- Better examples or analogies

Please update the flashcards or create an issue for discussion.

---

**Remember:** The goal is not to memorize every detail, but to build a mental model of how Node.js works. Understanding the architecture enables you to:
- Debug complex issues
- Make informed performance optimizations
- Contribute to Node.js core
- Design better applications
- Understand other similar systems (Deno, Bun, etc.)

Happy learning!
