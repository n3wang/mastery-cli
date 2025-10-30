# FastAPI Async and ASGI Flashcards

## Overview
These flashcards cover FastAPI's async capabilities, ASGI protocol, and how it handles both async and sync functions.

---

#### ASGI Protocol - Basic Concept
ASGI (Asynchronous Server Gateway Interface) is the async successor to WSGI. It's a standard interface between async Python web servers (like Uvicorn) and applications (like FastAPI). ASGI apps are async callables that process HTTP requests, WebSockets, and other protocols.

**ASGI Application Signature:**
```python
async def application(scope, receive, send):
    """
    Args:
        scope: Dict with connection info (type, path, headers, etc.)
        receive: Async callable to receive messages from client
        send: Async callable to send messages to client
    """
    # Example HTTP request handling
    if scope["type"] == "http":
        # Receive request body
        body = b""
        while True:
            message = await receive()
            if message["type"] == "http.request":
                body += message.get("body", b"")
                if not message.get("more_body", False):
                    break

        # Send response
        await send({
            "type": "http.response.start",
            "status": 200,
            "headers": [[b"content-type", b"application/json"]],
        })
        await send({
            "type": "http.response.body",
            "body": b'{"message": "Hello"}',
        })
```

**Scope Dictionary Example:**
```python
{
    "type": "http",
    "method": "GET",
    "path": "/items/42",
    "query_string": b"skip=0&limit=10",
    "headers": [
        [b"host", b"example.com"],
        [b"user-agent", b"curl/7.64.1"]
    ],
    "server": ("127.0.0.1", 8000),
    "client": ("127.0.0.1", 54321),
    "scheme": "http"
}
```

:p What is ASGI and how does it work?
??x
ASGI (Asynchronous Server Gateway Interface) is the async standard interface between Python web servers and applications.

**ASGI App Signature:**
```python
async def app(scope, receive, send):
    # scope: Connection info (path, headers, etc.)
    # receive: Async func to receive from client
    # send: Async func to send to client
    pass
```

**Process:**
1. Server receives request
2. Creates scope dict with connection info
3. Calls ASGI app with (scope, receive, send)
4. App receives request body via receive()
5. App processes request
6. App sends response via send()

**Benefits:**
- Fully async (non-blocking I/O)
- Supports HTTP, WebSockets, HTTP/2
- Concurrent request handling

**FastAPI:** Built on Starlette, which is an ASGI framework.
x??

---

#### Async vs Sync Functions in FastAPI
FastAPI supports both async and sync endpoint functions. Async functions run directly on the event loop, while sync functions run in a thread pool to avoid blocking.

**Example:**
```python
import asyncio
import time

# Async endpoint (runs on event loop)
@app.get("/async-items/")
async def read_async_items():
    # Non-blocking I/O operations
    await asyncio.sleep(1)  # Yields to event loop
    result = await database.query("SELECT * FROM items")
    return result

# Sync endpoint (runs in thread pool)
@app.get("/sync-items/")
def read_sync_items():
    # Blocking operations
    time.sleep(1)  # Would block event loop if not in thread
    result = database_sync.query("SELECT * FROM items")
    return result
```

**Execution Pseudocode:**
```python
async def run_endpoint(endpoint_func, **kwargs):
    # Check if endpoint is async or sync
    if asyncio.iscoroutinefunction(endpoint_func):
        # Async function - run directly on event loop
        result = await endpoint_func(**kwargs)

    else:
        # Sync function - run in thread pool to avoid blocking
        loop = asyncio.get_event_loop()
        result = await loop.run_in_executor(
            None,  # Use default thread pool
            endpoint_func,
            **kwargs
        )

    return result
```

**Concurrency Comparison:**
```
Async Endpoint (10 concurrent requests):
Request 1: Start → await db (yields) → Resume → Done
Request 2:   Start → await db (yields) → Resume → Done
Request 3:     Start → await db (yields) → Resume → Done
All running concurrently on single thread

Sync Endpoint (10 concurrent requests):
Request 1: Thread 1 → time.sleep() → Done
Request 2: Thread 2 → time.sleep() → Done
Request 3: Thread 3 → time.sleep() → Done
Each uses a thread from thread pool
```

**When to Use:**
- **Async**: I/O-bound operations (database, API calls, file I/O)
- **Sync**: CPU-bound operations, legacy sync libraries
- **Note**: Can mix dependencies (async endpoint with sync dependency, etc.)

:p How does FastAPI handle both async and sync functions?
??x
FastAPI runs async functions directly on the event loop and sync functions in a thread pool to avoid blocking.

**Async Function:**
```python
@app.get("/items/")
async def read_items():
    result = await db.query()  # Non-blocking
    return result
# Runs on event loop, yields during I/O
```

**Sync Function:**
```python
@app.get("/items/")
def read_items():
    result = db_sync.query()  # Blocking
    return result
# Runs in thread pool via run_in_executor()
```

**Process:**
1. Check if function is async (iscoroutinefunction)
2. If async: Call with `await`
3. If sync: Wrap with `run_in_executor()` to run in thread

**Benefits:**
- Backwards compatibility with sync code
- Optimal performance for async code
- Can mix async/sync in dependencies

**Location:** Handling in `run_endpoint_function()` in `fastapi/routing.py`
x??

---

#### Event Loop and Concurrency
The event loop is Python's async runtime that schedules and executes coroutines. It enables concurrent I/O operations on a single thread by yielding control during waiting periods.

**Event Loop Basics:**
```python
import asyncio

async def task_1():
    print("Task 1: Start")
    await asyncio.sleep(1)  # Yields to event loop
    print("Task 1: Done")
    return "Result 1"

async def task_2():
    print("Task 2: Start")
    await asyncio.sleep(0.5)  # Yields to event loop
    print("Task 2: Done")
    return "Result 2"

async def main():
    # Run concurrently
    results = await asyncio.gather(task_1(), task_2())
    print(results)

# Run event loop
asyncio.run(main())
```

**Execution Timeline:**
```
Time 0.0s: Task 1 starts
Time 0.0s: Task 1 yields (sleep 1s)
Time 0.0s: Task 2 starts
Time 0.0s: Task 2 yields (sleep 0.5s)
Time 0.5s: Task 2 resumes, prints "Done", returns
Time 1.0s: Task 1 resumes, prints "Done", returns
```

**FastAPI Concurrency Pseudocode:**
```python
# Simplified ASGI server loop
async def server_loop():
    while True:
        # Accept new connection (non-blocking)
        connection = await accept_connection()

        # Create task for handling request (doesn't block)
        task = asyncio.create_task(handle_request(connection))
        # Task runs concurrently with other requests

async def handle_request(connection):
    # Read request (yields if waiting for data)
    request = await connection.receive()

    # Process request (yields during I/O)
    response = await app(request)

    # Send response (yields during network I/O)
    await connection.send(response)
```

**Concurrent Request Handling:**
```python
# When multiple requests arrive:
Request A: Receive → Process → DB query (await, yields) → ... → Send
Request B:   Receive → Process → DB query (await, yields) → ... → Send
Request C:     Receive → Process → API call (await, yields) → ... → Send

# All three run on same thread, interleaved during I/O waits
# Total time ≈ max(A, B, C) instead of A + B + C
```

:p How does the event loop enable concurrency in FastAPI?
??x
The event loop schedules and executes async tasks concurrently on a single thread by yielding control during I/O operations.

**Key Concept:**
- `await` yields control back to event loop
- Event loop switches to other ready tasks
- Task resumes when I/O completes

**Example:**
```python
async def endpoint():
    # Yields during I/O, other requests can run
    result = await db.query()
    return result
```

**Concurrency:**
```
Request 1: Process → await db → (yields) → Resume
Request 2:   Process → await api → (yields) → Resume
Request 3:     Process → await file → (yields) → Resume
All interleaved on single thread
```

**Benefits:**
- Handle 1000s of concurrent requests
- Single thread (no thread overhead)
- Efficient I/O-bound operations

**Note:** CPU-bound work doesn't yield, blocks event loop (use thread pool instead).
x??

---

#### run_in_threadpool for Sync Operations
FastAPI uses `run_in_threadpool()` to execute synchronous (blocking) operations in a thread pool, preventing them from blocking the async event loop.

**Implementation:**
```python
import asyncio
from concurrent.futures import ThreadPoolExecutor

# Thread pool for sync operations
threadpool = ThreadPoolExecutor(max_workers=40)

async def run_in_threadpool(func, *args, **kwargs):
    """Run sync function in thread pool"""
    loop = asyncio.get_event_loop()

    # Execute in thread pool
    result = await loop.run_in_executor(
        threadpool,
        lambda: func(*args, **kwargs)
    )

    return result
```

**Usage Example:**
```python
import time

def blocking_operation(duration):
    """Sync function that blocks"""
    time.sleep(duration)
    return f"Slept for {duration}s"

# FastAPI endpoint
@app.get("/blocking/")
def sync_endpoint(duration: int = 1):
    # This runs in thread pool automatically
    result = blocking_operation(duration)
    return {"result": result}

# Internally FastAPI does:
async def handle_request():
    # Detect sync function
    if not asyncio.iscoroutinefunction(sync_endpoint):
        # Run in thread pool
        result = await run_in_threadpool(sync_endpoint, duration=1)
    else:
        # Run directly
        result = await sync_endpoint(duration=1)

    return result
```

**Comparison:**
```python
# BAD: Calling blocking function directly in async code
async def bad_endpoint():
    time.sleep(5)  # BLOCKS EVENT LOOP - No other requests processed!
    return {"done": True}

# GOOD: Wrapped in run_in_threadpool
async def good_endpoint():
    await run_in_threadpool(time.sleep, 5)  # Runs in thread, doesn't block
    return {"done": True}

# BEST: Use async version
async def best_endpoint():
    await asyncio.sleep(5)  # Truly non-blocking
    return {"done": True}
```

**Thread Pool Sizing:**
```python
# Default thread pool (max_workers=40)
# Can handle 40 concurrent blocking operations

# If more than 40 blocking operations:
# - 40 run in threads
# - Others wait for thread to become available
# - Event loop stays responsive for async operations
```

:p What is run_in_threadpool and why is it needed?
??x
`run_in_threadpool()` executes sync (blocking) functions in a thread pool to prevent blocking the async event loop.

**Why Needed:**
```python
# Without threadpool (BAD):
async def endpoint():
    time.sleep(5)  # Blocks event loop
    # No other requests processed during sleep!

# With threadpool (GOOD):
async def endpoint():
    await run_in_threadpool(time.sleep, 5)
    # Other requests processed while sleeping
```

**Implementation:**
```python
async def run_in_threadpool(func, *args):
    loop = asyncio.get_event_loop()
    return await loop.run_in_executor(
        threadpool,  # Thread pool
        lambda: func(*args)
    )
```

**FastAPI Usage:** Automatically wraps sync endpoint functions and dependencies.

**Thread Pool:** Default max 40 workers

**Location:** `fastapi/concurrency.py`
x??

---

#### contextmanager_in_threadpool for Sync Generators
When a dependency is a sync generator (for setup/teardown), FastAPI uses `contextmanager_in_threadpool()` to run it in a thread pool while maintaining async context manager semantics.

**Example Sync Generator Dependency:**
```python
def get_db_connection():
    """Sync generator dependency with setup/teardown"""
    # SETUP (runs in thread)
    conn = create_sync_connection()  # Blocking
    try:
        yield conn
    finally:
        # TEARDOWN (runs in thread)
        conn.close()  # Blocking

@app.get("/items/")
async def read_items(db = Depends(get_db_connection)):
    # db is available here
    return db.query("SELECT * FROM items")
```

**Implementation Pseudocode:**
```python
from contextlib import contextmanager
import asyncio

async def contextmanager_in_threadpool(cm):
    """
    Wraps sync context manager to run in thread pool
    Returns async context manager
    """
    # Enter context in thread pool
    exit_func = None

    async def enter():
        nonlocal exit_func

        # Run __enter__ in thread
        value = await run_in_threadpool(cm.__enter__)

        # Store __exit__ for later
        exit_func = cm.__exit__

        return value

    async def exit(exc_type, exc_val, exc_tb):
        # Run __exit__ in thread
        await run_in_threadpool(exit_func, exc_type, exc_val, exc_tb)

    # Create async context manager
    class AsyncContextManager:
        async def __aenter__(self):
            return await enter()

        async def __aexit__(self, exc_type, exc_val, exc_tb):
            await exit(exc_type, exc_val, exc_tb)

    return AsyncContextManager()

# Usage in dependency resolution:
async def solve_sync_generator_dependency(dependency_func):
    # Wrap sync generator as context manager
    cm = contextmanager(dependency_func)()

    # Wrap to run in thread pool
    async_cm = contextmanager_in_threadpool(cm)

    # Enter context (setup runs in thread)
    value = await async_cm.__aenter__()

    # Register cleanup
    exit_stack.push_async_exit(async_cm)

    return value
```

**Execution Flow:**
```
1. Request arrives
2. Dependency identified as sync generator
3. Wrapped with @contextmanager
4. Wrapped with contextmanager_in_threadpool
5. Setup code runs in thread pool (non-blocking)
6. Value yielded to endpoint
7. Endpoint executes
8. Response sent
9. Teardown code runs in thread pool (non-blocking)
```

:p What is contextmanager_in_threadpool and when is it used?
??x
`contextmanager_in_threadpool()` wraps sync generator dependencies to run their setup/teardown code in a thread pool, converting them to async context managers.

**Use Case:**
```python
def get_db():  # Sync generator
    conn = create_connection()  # Blocking
    try:
        yield conn
    finally:
        conn.close()  # Blocking

# FastAPI wraps this automatically
```

**Process:**
1. Detect sync generator dependency
2. Wrap with `contextmanager_in_threadpool()`
3. Setup runs in thread pool (non-blocking)
4. Value yielded to endpoint
5. Teardown runs in thread pool after response

**Benefits:**
- Supports legacy sync database drivers
- Prevents blocking event loop
- Maintains setup/teardown pattern

**Comparison:** Async generators run directly on event loop, sync generators run in thread pool.

**Location:** `fastapi/concurrency.py`
x??

---

#### Background Tasks
Background tasks allow you to run functions after the response is sent to the client, useful for operations that don't need to complete before responding (logging, emails, cleanup).

**Example:**
```python
from fastapi import BackgroundTasks

def write_log(message: str):
    """Background task (runs after response sent)"""
    with open("log.txt", "a") as f:
        f.write(f"{message}\n")

@app.post("/send-notification/")
async def send_notification(
    email: str,
    background_tasks: BackgroundTasks
):
    # Add task to run after response
    background_tasks.add_task(write_log, f"Email sent to {email}")

    # Response sent immediately
    return {"message": "Notification sent"}
    # write_log() executes after this return

# Multiple background tasks
@app.post("/process/")
async def process(background_tasks: BackgroundTasks):
    background_tasks.add_task(task_1, arg1, arg2)
    background_tasks.add_task(task_2, kwarg=value)
    background_tasks.add_task(task_3)
    return {"status": "processing"}
```

**Implementation Pseudocode:**
```python
class BackgroundTasks:
    def __init__(self):
        self.tasks = []

    def add_task(self, func, *args, **kwargs):
        """Add task to queue"""
        self.tasks.append((func, args, kwargs))

    async def __call__(self):
        """Execute all background tasks"""
        for func, args, kwargs in self.tasks:
            if asyncio.iscoroutinefunction(func):
                # Async function
                await func(*args, **kwargs)
            else:
                # Sync function - run in thread pool
                await run_in_threadpool(func, *args, **kwargs)

# Request handling with background tasks:
async def handle_request(endpoint, background_tasks):
    # 1. Call endpoint
    response = await endpoint(background_tasks=background_tasks)

    # 2. Send response to client
    await send_response(response)

    # 3. Execute background tasks (after response sent)
    await background_tasks()

    # 4. Request complete
```

**Execution Timeline:**
```
Time 0ms: Request received
Time 10ms: Endpoint processes request
Time 15ms: Response sent to client (client gets response)
Time 15ms: Background task 1 starts
Time 100ms: Background task 1 completes
Time 100ms: Background task 2 starts
Time 200ms: Background task 2 completes
Time 200ms: Request fully complete (connection can close)
```

:p What are background tasks in FastAPI and how do they work?
??x
Background tasks are functions that run after the response is sent to the client, useful for operations that don't block the response.

**Usage:**
```python
from fastapi import BackgroundTasks

def send_email(email: str):
    # Send email logic
    pass

@app.post("/register/")
def register(email: str, background_tasks: BackgroundTasks):
    # Add task to run after response
    background_tasks.add_task(send_email, email)

    # Response sent immediately
    return {"status": "registered"}
    # send_email() runs after response sent
```

**Execution:**
1. Endpoint executes
2. Response sent to client
3. Background tasks run (in order added)
4. Connection closes

**Benefits:**
- Faster response times
- Deferred non-critical operations
- Supports both async and sync tasks

**Location:** `fastapi/background.py`
x??

---

#### Starlette Foundation
FastAPI is built on top of Starlette, inheriting its ASGI implementation, routing, middleware, and WebSocket support. Understanding Starlette helps understand FastAPI's internals.

**Inheritance Hierarchy:**
```python
# FastAPI extends Starlette
from starlette.applications import Starlette
from starlette.routing import Route

class FastAPI(Starlette):
    """FastAPI application class"""

    def __init__(self, ...):
        # Call Starlette's __init__
        super().__init__(...)

        # Add FastAPI-specific features
        self.openapi_schema = None
        self.setup()
```

**What FastAPI Inherits from Starlette:**

1. **ASGI Application**
   ```python
   # Starlette provides ASGI app interface
   async def __call__(self, scope, receive, send):
       # Handle ASGI protocol
       await self.router(scope, receive, send)
   ```

2. **Routing**
   ```python
   # Starlette's Router
   from starlette.routing import Router, Route

   router = Router(routes=[
       Route("/", endpoint=homepage),
       Route("/users/{id}", endpoint=get_user)
   ])
   ```

3. **Request/Response**
   ```python
   # Starlette's Request and Response classes
   from starlette.requests import Request
   from starlette.responses import JSONResponse

   async def endpoint(request: Request):
       return JSONResponse({"hello": "world"})
   ```

4. **Middleware**
   ```python
   # Starlette's middleware support
   from starlette.middleware import Middleware
   from starlette.middleware.cors import CORSMiddleware

   app = Starlette(middleware=[
       Middleware(CORSMiddleware, allow_origins=["*"])
   ])
   ```

**What FastAPI Adds:**

1. **Automatic Data Validation** (Pydantic)
2. **Dependency Injection System**
3. **OpenAPI Schema Generation**
4. **Interactive Documentation (Swagger/ReDoc)**
5. **Better Type Hints Support**
6. **Response Model Validation**

**Architecture:**
```
User Request
    ↓
ASGI Server (Uvicorn)
    ↓
Starlette ASGI App
    ├─ Middleware Stack
    ├─ Router (path matching)
    └─ Route Handler
        ↓
FastAPI Extensions
    ├─ Parameter Extraction
    ├─ Pydantic Validation
    ├─ Dependency Injection
    └─ Response Serialization
        ↓
User's Endpoint Function
```

:p What is the relationship between FastAPI and Starlette?
??x
FastAPI is built on top of Starlette, inheriting its ASGI implementation, routing, and middleware while adding validation, dependency injection, and OpenAPI generation.

**Inheritance:**
```python
class FastAPI(Starlette):
    # Inherits from Starlette
    pass
```

**From Starlette:**
- ASGI application interface
- Routing and path matching
- Request/Response classes
- Middleware support
- WebSocket support
- Background tasks (basic)

**Added by FastAPI:**
- Pydantic validation
- Dependency injection system
- OpenAPI automatic generation
- Interactive docs (Swagger/ReDoc)
- Type-based parameter extraction
- Response model validation

**Why:** Starlette provides production-ready ASGI foundation, FastAPI adds developer experience features.

**Benefit:** Can use Starlette features directly in FastAPI apps.
x??

---

#### WebSocket Support
FastAPI (via Starlette) supports WebSocket connections for bidirectional real-time communication. WebSockets maintain a persistent connection between client and server.

**Example:**
```python
from fastapi import WebSocket, WebSocketDisconnect

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    # Accept connection
    await websocket.accept()

    try:
        while True:
            # Receive message from client
            data = await websocket.receive_text()

            # Send response to client
            await websocket.send_text(f"Echo: {data}")

    except WebSocketDisconnect:
        print("Client disconnected")
```

**Broadcast Example (Chat Room):**
```python
from typing import List

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()

@app.websocket("/ws/{client_id}")
async def websocket_endpoint(
    websocket: WebSocket,
    client_id: int
):
    await manager.connect(websocket)

    try:
        while True:
            data = await websocket.receive_text()
            await manager.broadcast(f"Client {client_id}: {data}")

    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(f"Client {client_id} left")
```

**WebSocket Methods:**
```python
# Receive methods
await websocket.receive_text()      # Receive text message
await websocket.receive_bytes()     # Receive binary message
await websocket.receive_json()      # Receive and parse JSON

# Send methods
await websocket.send_text("Hello")  # Send text message
await websocket.send_bytes(b"...")  # Send binary message
await websocket.send_json({"a": 1}) # Send JSON

# Connection management
await websocket.accept()            # Accept connection
await websocket.close()             # Close connection
```

:p How do WebSockets work in FastAPI?
??x
FastAPI supports WebSockets for bidirectional real-time communication via persistent connections.

**Basic Example:**
```python
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()  # Accept connection

    while True:
        data = await websocket.receive_text()  # Receive
        await websocket.send_text(f"Echo: {data}")  # Send
```

**Methods:**
- Accept: `await websocket.accept()`
- Receive: `receive_text()`, `receive_bytes()`, `receive_json()`
- Send: `send_text()`, `send_bytes()`, `send_json()`
- Close: `await websocket.close()`

**Use Cases:**
- Real-time chat
- Live notifications
- Collaborative editing
- Live data feeds

**Exception:** `WebSocketDisconnect` raised when client disconnects

**Dependencies:** WebSocket endpoints support dependencies just like HTTP endpoints
x??
