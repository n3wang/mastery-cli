# FastAPI Dependency Injection Flashcards

## Overview
These flashcards cover FastAPI's dependency injection system, which is the core mechanism for sharing logic, managing resources, and implementing authentication across endpoints.

---

#### Dependency Injection - Basic Concept
Dependency Injection (DI) is a design pattern where a function or class receives its dependencies from external sources rather than creating them internally. In FastAPI, dependencies are declared using the `Depends()` function and are automatically resolved before the endpoint function executes.

**Example Flow:**
```python
# Dependency function
def get_database():
    return Database()

# Endpoint using dependency
@app.get("/items/")
async def read_items(db = Depends(get_database)):
    # db is automatically injected
    return db.query("SELECT * FROM items")
```

**Pseudocode Logic:**
```
1. FastAPI sees Depends(get_database) in function signature
2. Before calling read_items():
   a. Call get_database() → returns Database instance
   b. Store result as 'db'
   c. Call read_items(db=Database instance)
3. Return response
```

:p What is Dependency Injection in FastAPI and how does it work at a basic level?
??x
Dependency Injection is a pattern where FastAPI automatically calls dependency functions and injects their return values into endpoint parameters.

**Process:**
1. Declare dependency with `Depends(function_name)`
2. FastAPI calls dependency function before endpoint
3. Result is injected as parameter value
4. Endpoint receives resolved dependency

**Example:**
```python
def get_db():
    return Database()

@app.get("/items/")
def read_items(db = Depends(get_db)):
    # db is already a Database instance
    pass
```
x??

---

#### Dependency Injection - The Dependant Class
The `Dependant` class (in `fastapi/dependencies/models.py`) is a dataclass that represents the dependency tree of a function. It stores all parameters, nested dependencies, and metadata needed to resolve dependencies at request time.

**Structure:**
```python
@dataclass
class Dependant:
    path_params: List[ModelField]      # Parameters from URL path
    query_params: List[ModelField]     # Parameters from query string
    header_params: List[ModelField]    # Parameters from headers
    cookie_params: List[ModelField]    # Parameters from cookies
    body_params: List[ModelField]      # Parameters from request body
    dependencies: List[Dependant]      # Nested sub-dependencies
    call: Optional[Callable]           # The function to call
    cache_key: Tuple                   # For caching results
```

**Tree Structure Example:**
```
endpoint_function (Dependant)
├── db (Dependant)
│   └── get_connection (Dependant)
└── current_user (Dependant)
    ├── token (Dependant)
    └── verify_token (Dependant)
```

:p What is the Dependant class and what information does it store?
??x
The `Dependant` class is a dataclass that represents a function's complete dependency structure, storing all parameters and nested dependencies.

**Key Fields:**
- `path_params, query_params, header_params, cookie_params, body_params` - Different parameter sources
- `dependencies` - List of sub-dependencies (creates tree structure)
- `call` - The actual function to call
- `cache_key` - Used for dependency caching

**Purpose:** Allows FastAPI to build a complete dependency graph at startup, then resolve it efficiently at request time.

**Location:** `fastapi/dependencies/models.py`
x??

---

#### Dependency Injection - get_dependant() Function
The `get_dependant()` function (in `fastapi/dependencies/utils.py`) analyzes a function's signature and builds a `Dependant` object representing its dependency tree. This happens at application startup, not during requests.

**Pseudocode Logic:**
```python
def get_dependant(func):
    dependant = Dependant(call=func)

    # Inspect function signature
    for param_name, param_annotation in inspect_signature(func):

        # Check what type of parameter it is
        if has_Depends(param_annotation):
            # It's a dependency - recursively analyze it
            sub_dependant = get_dependant(param_annotation.dependency)
            dependant.dependencies.append(sub_dependant)

        elif param_name in path_params:
            # It's from URL path
            field = create_field(param_name, param_annotation)
            dependant.path_params.append(field)

        elif is_pydantic_model(param_annotation):
            # It's request body
            field = create_field(param_name, param_annotation)
            dependant.body_params.append(field)

        else:
            # Default to query parameter
            field = create_field(param_name, param_annotation)
            dependant.query_params.append(field)

    return dependant
```

:p What does the get_dependant() function do and when is it called?
??x
`get_dependant()` analyzes a function's signature and builds a `Dependant` object representing its complete dependency tree. It runs at **application startup**, not during requests.

**Process:**
1. Inspect function signature and parameters
2. For each parameter, determine its source:
   - `Depends()` → Add to dependencies list (recursive)
   - Path parameter → Add to path_params
   - Pydantic model → Add to body_params
   - Default → Add to query_params
3. Recursively analyze sub-dependencies
4. Return Dependant tree structure

**Why startup:** Pre-analyzing dependencies makes request handling faster.

**Location:** `fastapi/dependencies/utils.py`
x??

---

#### Dependency Injection - solve_dependencies() Function
The `solve_dependencies()` function (in `fastapi/dependencies/utils.py`) executes the dependency tree at request time. It extracts values from the request, validates them, calls dependency functions, and returns a dictionary of resolved values.

**Pseudocode Logic:**
```python
async def solve_dependencies(request, dependant, dependency_cache):
    values = {}

    # 1. Extract and validate path parameters
    for path_param in dependant.path_params:
        raw_value = request.path_params[path_param.name]
        validated_value = validate_with_pydantic(raw_value, path_param.type)
        values[path_param.name] = validated_value

    # 2. Extract and validate query parameters
    for query_param in dependant.query_params:
        raw_value = request.query_params.get(query_param.name)
        validated_value = validate_with_pydantic(raw_value, query_param.type)
        values[query_param.name] = validated_value

    # 3. Parse and validate request body
    for body_param in dependant.body_params:
        raw_body = await request.json()
        validated_body = validate_with_pydantic(raw_body, body_param.type)
        values[body_param.name] = validated_body

    # 4. Resolve sub-dependencies recursively
    for sub_dependency in dependant.dependencies:
        # Check cache first
        cache_key = get_cache_key(sub_dependency)
        if cache_key in dependency_cache:
            result = dependency_cache[cache_key]
        else:
            # Recursively solve sub-dependency
            sub_values = await solve_dependencies(request, sub_dependency, dependency_cache)
            # Call the dependency function with resolved values
            result = await call_dependency(sub_dependency.call, **sub_values)
            # Cache the result
            dependency_cache[cache_key] = result

        values[sub_dependency.param_name] = result

    return values
```

:p What does solve_dependencies() do and when is it called?
??x
`solve_dependencies()` resolves the dependency tree at **request time** by extracting values from the request, validating them, calling dependency functions, and caching results.

**Process:**
1. Extract path parameters from URL
2. Extract query parameters from query string
3. Parse and validate request body
4. Resolve sub-dependencies recursively:
   - Check cache first
   - If not cached, solve sub-dependency
   - Call dependency function
   - Cache result for this request
5. Return dictionary of resolved values

**Key Feature:** Dependency caching prevents calling the same dependency multiple times per request.

**Location:** `fastapi/dependencies/utils.py`
x??

---

#### Dependency Injection - Dependency Caching
Dependency caching in FastAPI ensures that each dependency is called only once per request, even if multiple endpoints or dependencies depend on it. The cache is request-scoped and cleared after the response is sent.

**Cache Key Generation:**
```python
def get_cache_key(dependant):
    # Cache key includes:
    # 1. The dependency function itself
    # 2. Security scopes (if any)
    return (dependant.call, tuple(dependant.security_scopes))
```

**Pseudocode Logic:**
```python
# Request starts - create empty cache
dependency_cache = {}

# First time dependency is needed
def resolve_dependency(dependency):
    cache_key = (dependency.call, dependency.scopes)

    if cache_key in dependency_cache:
        # Already called - return cached result
        return dependency_cache[cache_key]
    else:
        # First time - call and cache
        result = call(dependency.call)
        dependency_cache[cache_key] = result
        return result

# Example scenario:
expensive_db() called by auth_dependency → Executes, cached
expensive_db() called by log_dependency  → Returns cached value
expensive_db() called by main_endpoint   → Returns cached value
# Total: 1 execution, 2 cache hits
```

:p How does dependency caching work in FastAPI?
??x
Dependency caching ensures each dependency is executed only once per request, with results cached and reused.

**Mechanism:**
1. Cache created at request start (empty dict)
2. Cache key = (dependency function, security scopes)
3. First call: Execute and cache result
4. Subsequent calls: Return cached value
5. Cache cleared after request completes

**Example:**
```python
def expensive_db():  # Called 3 times in dep tree
    return get_connection()  # Only executes once!

# Disable caching:
Depends(expensive_db, use_cache=False)
```

**Scope:** Per-request only (not shared between requests)

**Location:** Implemented in `solve_dependencies()` in `fastapi/dependencies/utils.py`
x??

---

#### Dependency Injection - Generator Dependencies (Setup/Teardown)
Generator dependencies use Python's `yield` statement to provide setup and teardown logic. Code before `yield` runs before the endpoint, and code after `yield` runs after the response is sent, even if an exception occurs.

**Pseudocode Logic:**
```python
# User's dependency code
def get_database():
    # SETUP: Runs before endpoint
    db = connect_to_database()

    try:
        yield db  # Provide value to endpoint
    finally:
        # TEARDOWN: Always runs after endpoint (even if exception)
        db.close()

# FastAPI's internal handling
async def handle_generator_dependency(generator_func):
    # Create AsyncExitStack to manage cleanup
    async with async_exit_stack:

        # Call the generator
        generator = generator_func()

        # Run until yield (setup phase)
        value = await anext(generator)

        # Register cleanup callback
        async_exit_stack.push_async_exit(finish_generator, generator)

        # Return yielded value to endpoint
        return value

    # After endpoint and response sent:
    # async_exit_stack.__aexit__() runs all cleanup callbacks
    # This finishes the generator (runs code after yield)
```

**Execution Timeline:**
```
1. Request arrives
2. Setup code (before yield) executes
3. Value yielded to endpoint
4. Endpoint executes
5. Response created and sent
6. Teardown code (after yield) executes
7. Request complete
```

:p How do generator dependencies work for setup and teardown in FastAPI?
??x
Generator dependencies use `yield` to separate setup (before yield) and teardown (after yield) logic.

**Structure:**
```python
def get_db():
    db = Database()     # Setup
    try:
        yield db        # Provide to endpoint
    finally:
        db.close()      # Teardown (always runs)
```

**Execution:**
1. Setup code runs before endpoint
2. Value yielded to endpoint parameter
3. Endpoint executes and returns response
4. Teardown code runs (even if exception occurred)

**Implementation:** FastAPI uses `AsyncExitStack` to manage cleanup callbacks, ensuring teardown always executes.

**Location:** Handled in `solve_dependencies()` using `async_exit_stack.enter_async_context()`
x??

---

#### Dependency Injection - Sub-Dependencies (Nested Dependencies)
Sub-dependencies occur when a dependency itself has dependencies. FastAPI resolves them recursively, depth-first, creating a dependency tree that's executed in the correct order.

**Example Code:**
```python
# Level 1: Base dependency
def get_token(authorization: str = Header(...)):
    return authorization.split("Bearer ")[1]

# Level 2: Depends on get_token
def get_current_user(token: str = Depends(get_token)):
    user = decode_token(token)
    return user

# Level 3: Depends on get_current_user
def get_admin_user(user: dict = Depends(get_current_user)):
    if not user.get("is_admin"):
        raise HTTPException(403, "Not an admin")
    return user

# Endpoint: Depends on get_admin_user
@app.get("/admin/data")
def admin_endpoint(admin: dict = Depends(get_admin_user)):
    return {"admin": admin, "data": "secret"}
```

**Dependency Tree:**
```
admin_endpoint
└── get_admin_user (depends on current_user)
    └── get_current_user (depends on token)
        └── get_token (depends on authorization header)
            └── authorization (header parameter)
```

**Execution Order (Depth-First):**
```
1. Extract authorization from request headers
2. Call get_token(authorization) → returns token string
3. Call get_current_user(token) → returns user dict
4. Call get_admin_user(user) → returns admin user dict
5. Call admin_endpoint(admin) → returns response
```

:p How do sub-dependencies (nested dependencies) work in FastAPI?
??x
Sub-dependencies are dependencies that themselves have dependencies. FastAPI resolves them recursively in depth-first order.

**Example:**
```python
def get_token(auth: str = Header(...)):
    return extract_token(auth)

def get_user(token: str = Depends(get_token)):
    return verify_token(token)

@app.get("/")
def endpoint(user = Depends(get_user)):
    return user
```

**Resolution Order:**
1. Extract header parameter
2. Call `get_token()` with header
3. Call `get_user()` with token result
4. Call endpoint with user result

**Tree:** Each dependency's dependencies are resolved before calling that dependency.

**Caching:** Works across the tree - if `get_token()` is used by multiple dependencies, it's cached.
x??

---

#### Dependency Injection - Class-Based Dependencies
Classes can be used as dependencies by using the class itself (not an instance) in `Depends()`. FastAPI calls the `__init__` method, treating it like any dependency function, and parameters of `__init__` become request parameters.

**Example Code:**
```python
class Pagination:
    def __init__(
        self,
        skip: int = Query(0, ge=0),
        limit: int = Query(10, ge=1, le=100)
    ):
        self.skip = skip
        self.limit = limit

    def get_slice(self):
        return slice(self.skip, self.skip + self.limit)

# Using class as dependency
@app.get("/items/")
def read_items(pagination: Pagination = Depends(Pagination)):
    items = all_items[pagination.get_slice()]
    return items
```

**Pseudocode Logic:**
```python
# When FastAPI sees Depends(Pagination):
1. Analyze Pagination.__init__ signature
2. Extract parameters: skip and limit
3. Determine they are query parameters (from Query())
4. At request time:
   a. Extract skip from query params (or use default 0)
   b. Extract limit from query params (or use default 10)
   c. Call: pagination = Pagination(skip=value, limit=value)
   d. Inject pagination instance into endpoint
```

**Request Example:**
```
GET /items/?skip=20&limit=10

FastAPI execution:
1. Parse skip=20, limit=10 from query string
2. Call Pagination(skip=20, limit=10)
3. Create instance with those values
4. Pass instance to read_items()
```

:p How do class-based dependencies work in FastAPI?
??x
Class-based dependencies use the class constructor (`__init__`) as the dependency function. Parameters of `__init__` become request parameters.

**Usage:**
```python
class Pagination:
    def __init__(self, skip: int = 0, limit: int = 10):
        self.skip = skip
        self.limit = limit

@app.get("/items/")
def read_items(pagination: Pagination = Depends(Pagination)):
    # pagination is an instance
    return items[pagination.skip:pagination.limit]
```

**Process:**
1. FastAPI analyzes `__init__` signature
2. `skip` and `limit` become query parameters
3. At request time, creates instance with extracted values
4. Instance injected into endpoint

**Benefit:** Encapsulates related parameters and logic together.
x??

---

#### Dependency Injection - AsyncExitStack for Cleanup
`AsyncExitStack` is a Python standard library tool that manages multiple async context managers. FastAPI uses it to ensure all generator dependencies' cleanup code runs in reverse order, even if exceptions occur.

**Context Manager Basics:**
```python
# Standard context manager
async with resource:
    # use resource
    pass
# cleanup runs here automatically

# AsyncExitStack manages multiple context managers
async with AsyncExitStack() as stack:
    resource1 = await stack.enter_async_context(get_resource1())
    resource2 = await stack.enter_async_context(get_resource2())
    # use resources
    pass
# cleanup runs for both in reverse order: resource2, then resource1
```

**FastAPI's Use:**
```python
# Pseudocode for how FastAPI uses AsyncExitStack
async def solve_dependencies_with_cleanup(dependant):
    # Get or create AsyncExitStack from request scope
    exit_stack = request.scope["fastapi_astack"]

    # For each generator dependency:
    for dependency in dependant.dependencies:
        if is_generator(dependency.call):
            # Enter the context (runs setup, yields value)
            value = await exit_stack.enter_async_context(
                contextmanager(dependency.call)
            )
            # exit_stack now owns the cleanup responsibility
        else:
            # Regular dependency - just call it
            value = await dependency.call()

    # After endpoint returns and response is sent:
    # exit_stack.__aexit__() automatically called
    # Runs all cleanup in reverse registration order
```

**Execution Flow:**
```
1. Request arrives
2. AsyncExitStack created, stored in request.scope
3. Dependencies resolved:
   - Generator dep A → setup runs, cleanup registered
   - Generator dep B → setup runs, cleanup registered
   - Regular dep C → just called
4. Endpoint executes
5. Response sent
6. AsyncExitStack.__aexit__() runs:
   - Cleanup B (reverse order)
   - Cleanup A
7. Request complete
```

:p What is AsyncExitStack and how does FastAPI use it for dependency cleanup?
??x
`AsyncExitStack` is a Python stdlib tool for managing multiple async context managers. FastAPI uses it to ensure all generator dependency cleanup code runs in reverse order.

**Purpose:**
- Manage cleanup for multiple generator dependencies
- Guarantee cleanup runs even if exceptions occur
- Execute cleanup in reverse registration order (LIFO)

**FastAPI Implementation:**
1. Create AsyncExitStack at request start
2. Store in `request.scope["fastapi_astack"]`
3. For each generator dependency:
   - Register with `enter_async_context()`
   - Setup runs, cleanup registered
4. After response sent:
   - `__aexit__()` runs all cleanups in reverse

**Location:** `fastapi/middleware/asyncexitstack.py` creates the middleware

**Why reverse order:** Last opened resource should close first (like nested context managers)
x??

---

#### Dependency Injection - Global Dependencies
Global dependencies are dependencies that apply to all endpoints in an application or router. They're specified in the `dependencies` parameter of `FastAPI()` or `APIRouter()` and run for every request.

**Example Code:**
```python
# Global dependency function
def verify_api_key(api_key: str = Header(...)):
    if api_key != "secret-key":
        raise HTTPException(403, "Invalid API key")
    return api_key

# Apply to entire application
app = FastAPI(dependencies=[Depends(verify_api_key)])

# All endpoints now require valid API key
@app.get("/items/")  # verify_api_key runs automatically
def read_items():
    return ["item1", "item2"]

@app.get("/users/")  # verify_api_key runs automatically
def read_users():
    return ["user1", "user2"]

# Also works with routers
router = APIRouter(
    prefix="/admin",
    dependencies=[Depends(verify_admin)]  # Only for this router
)
```

**Dependency Execution Order:**
```
Request to /items/
1. Global dependencies (verify_api_key)
2. Router dependencies (if endpoint is in a router)
3. Path operation dependencies (endpoint-specific)
4. Endpoint function
```

**Pseudocode Logic:**
```python
async def handle_request(endpoint):
    # Collect all dependencies
    all_dependencies = []
    all_dependencies.extend(app.dependencies)      # Global
    all_dependencies.extend(router.dependencies)   # Router-level
    all_dependencies.extend(endpoint.dependencies) # Endpoint-level

    # Resolve all dependencies in order
    for dependency in all_dependencies:
        await resolve_dependency(dependency)

    # Then call endpoint
    return await endpoint()
```

:p What are global dependencies in FastAPI and how do they work?
??x
Global dependencies are dependencies applied to all endpoints in an app or router via the `dependencies` parameter.

**Usage:**
```python
# Application-wide
app = FastAPI(dependencies=[Depends(verify_api_key)])

# Router-wide
router = APIRouter(dependencies=[Depends(verify_admin)])
```

**Execution Order:**
1. App-level global dependencies
2. Router-level dependencies
3. Endpoint-specific dependencies
4. Endpoint function

**Use Cases:**
- API key validation for all endpoints
- Request logging
- Rate limiting
- CORS checks

**Note:** Global dependencies run even if endpoint doesn't use their return value.

**Location:** Defined in `FastAPI.__init__()` and `APIRouter.__init__()` in `fastapi/applications.py` and `fastapi/routing.py`
x??
