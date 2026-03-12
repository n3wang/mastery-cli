# FastAPI Routing and Parameters Flashcards

## Overview
These flashcards cover FastAPI's routing system and parameter handling, including path parameters, query parameters, and how requests are matched to endpoints.

---

#### Path Parameters - Basic Concept
Path parameters are variables in the URL path that are extracted and passed to endpoint functions. They're defined using curly braces `{param_name}` in the route path and are always required.

**Example:**
```python
@app.get("/items/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id}

# Request: GET /items/42
# FastAPI extracts: item_id = 42 (validated as int)
# Calls: read_item(item_id=42)
```

**Pseudocode Flow:**
```python
# 1. Route Registration (at startup)
route_pattern = "/items/{item_id}"
compiled_regex = compile_path_to_regex(route_pattern)
# Result: r"/items/(?P<item_id>[^/]+)"

# 2. Request Handling (at request time)
incoming_path = "/items/42"

if compiled_regex.match(incoming_path):
    path_params = extract_groups(incoming_path)
    # path_params = {"item_id": "42"}

    # Validate against type hint
    item_id = validate_type(path_params["item_id"], int)
    # item_id = 42 (converted to int)

    # Call endpoint
    return read_item(item_id=42)
```

:p What are path parameters in FastAPI and how are they processed?
??x
Path parameters are URL variables defined with `{param_name}` syntax, extracted from the URL and validated against type hints.

**Definition:**
```python
@app.get("/items/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id}
```

**Process:**
1. Route path compiled to regex: `/items/(?P<item_id>[^/]+)`
2. Incoming URL matched against regex
3. Named groups extracted: `{"item_id": "42"}`
4. Value validated as int: `42`
5. Passed to endpoint function

**Key:** Path parameters are **always required** (URL must match pattern).

**Location:** Path compilation in `fastapi/routing.py`, extraction in `solve_dependencies()`
x??

---

#### Path Parameters - Path() Function and Validation
The `Path()` function provides additional metadata for path parameters, including validation rules, descriptions, and examples. It uses Pydantic's validation system to enforce constraints.

**Example with Validation:**
```python
from fastapi import Path

@app.get("/items/{item_id}")
def read_item(
    item_id: int = Path(
        ...,                           # Required (ellipsis)
        ge=1,                          # Greater than or equal to 1
        le=1000,                       # Less than or equal to 1000
        description="The item ID",     # OpenAPI description
        example=42                     # OpenAPI example
    )
):
    return {"item_id": item_id}
```

**Validation Pseudocode:**
```python
# When request arrives with /items/42
def validate_path_param(value, field_info):
    # 1. Type conversion
    try:
        typed_value = int(value)  # "42" → 42
    except ValueError:
        raise ValidationError("Not a valid integer")

    # 2. Apply constraints from Path()
    if field_info.ge is not None and typed_value < field_info.ge:
        raise ValidationError(f"Must be >= {field_info.ge}")

    if field_info.le is not None and typed_value > field_info.le:
        raise ValidationError(f"Must be <= {field_info.le}")

    return typed_value

# Example validation:
validate_path_param("42", Path(ge=1, le=1000))    # OK → 42
validate_path_param("0", Path(ge=1, le=1000))     # Error: Must be >= 1
validate_path_param("1001", Path(ge=1, le=1000))  # Error: Must be <= 1000
validate_path_param("abc", Path())                # Error: Not valid integer
```

**Available Constraints:**
- `ge` - greater than or equal
- `le` - less than or equal
- `gt` - greater than
- `lt` - less than
- `min_length`, `max_length` - for strings
- `regex` - pattern matching for strings

:p What does the Path() function do and what validation options does it provide?
??x
`Path()` provides metadata and validation constraints for path parameters, using Pydantic's validation system.

**Common Constraints:**
```python
item_id: int = Path(
    ge=1,           # Greater than or equal
    le=1000,        # Less than or equal
    description="Item ID",
    example=42
)
```

**Validation Process:**
1. Extract string from URL
2. Convert to specified type (int, str, etc.)
3. Apply validation constraints
4. Raise `RequestValidationError` if fails
5. Return 422 status code with error details

**Other Constraints:**
- Numeric: `gt`, `lt`, `ge`, `le`, `multiple_of`
- String: `min_length`, `max_length`, `regex`

**Location:** `fastapi/param_functions.py` defines `Path()`, validation in `fastapi/dependencies/utils.py`
x??

---

#### Query Parameters - Basic Concept
Query parameters are extracted from the URL query string (after `?`). Unlike path parameters, they can be optional and have default values. Parameters not in the path or declared with special types default to query parameters.

**Example:**
```python
@app.get("/items/")
def read_items(
    skip: int = 0,        # Optional with default
    limit: int = 10,      # Optional with default
    q: str = None         # Optional, no default value
):
    return {"skip": skip, "limit": limit, "q": q}

# Request examples:
# GET /items/                      → skip=0, limit=10, q=None
# GET /items/?skip=20              → skip=20, limit=10, q=None
# GET /items/?skip=20&limit=100    → skip=20, limit=100, q=None
# GET /items/?q=search             → skip=0, limit=10, q="search"
```

**Pseudocode Logic:**
```python
def extract_query_params(request, endpoint_signature):
    query_string = request.url.query
    # Example: "skip=20&limit=100&q=search"

    parsed_params = parse_query_string(query_string)
    # {"skip": "20", "limit": "100", "q": "search"}

    result = {}
    for param_name, param_type, default in endpoint_signature:
        if param_name in parsed_params:
            # Present in query string
            raw_value = parsed_params[param_name]
            validated = validate_type(raw_value, param_type)
            result[param_name] = validated
        else:
            # Not present - use default
            result[param_name] = default

    return result

# Example:
extract_query_params(
    query_string="skip=20",
    signature=[("skip", int, 0), ("limit", int, 10)]
)
# Returns: {"skip": 20, "limit": 10}
```

:p How do query parameters work in FastAPI?
??x
Query parameters are extracted from the URL query string (after `?`) and can be optional with default values.

**Definition:**
```python
@app.get("/items/")
def read_items(skip: int = 0, limit: int = 10):
    return items[skip:skip+limit]

# GET /items/?skip=20&limit=10
```

**Process:**
1. Parse query string: `"skip=20&limit=10"`
2. Extract each parameter value
3. Validate against type hint
4. Use default if not provided
5. Pass to endpoint function

**Optional vs Required:**
- With default: `skip: int = 0` → Optional
- Without default: `q: str` → Required (400 if missing)
- Explicitly optional: `q: Optional[str] = None`

**Location:** Handled in `solve_dependencies()` in `fastapi/dependencies/utils.py`
x??

---

#### Query Parameters - Query() Function
The `Query()` function provides advanced configuration for query parameters, including validation, aliases, deprecation, and documentation metadata.

**Example:**
```python
from fastapi import Query

@app.get("/items/")
def read_items(
    q: str = Query(
        None,                          # Default value
        min_length=3,                  # Minimum length
        max_length=50,                 # Maximum length
        regex="^[a-zA-Z0-9]+$",       # Pattern validation
        description="Search query",    # OpenAPI docs
        alias="item-query",            # Different name in URL
        deprecated=True                # Mark as deprecated
    ),
    limit: int = Query(10, ge=1, le=100)  # With constraints
):
    return {"q": q, "limit": limit}

# Request: GET /items/?item-query=hello&limit=20
# Note: Uses alias "item-query" instead of "q"
```

**Validation Pseudocode:**
```python
def validate_query_param(value, field_info):
    # 1. Check if required
    if value is None:
        if field_info.default is ...:  # Ellipsis means required
            raise ValidationError("Field required")
        return field_info.default

    # 2. Type conversion
    typed_value = convert_type(value, field_info.type)

    # 3. String validations
    if isinstance(typed_value, str):
        if field_info.min_length and len(typed_value) < field_info.min_length:
            raise ValidationError(f"Too short (min {field_info.min_length})")

        if field_info.max_length and len(typed_value) > field_info.max_length:
            raise ValidationError(f"Too long (max {field_info.max_length})")

        if field_info.regex and not re.match(field_info.regex, typed_value):
            raise ValidationError("Does not match pattern")

    # 4. Numeric validations
    if isinstance(typed_value, (int, float)):
        if field_info.ge and typed_value < field_info.ge:
            raise ValidationError(f"Must be >= {field_info.ge}")
        if field_info.le and typed_value > field_info.le:
            raise ValidationError(f"Must be <= {field_info.le}")

    return typed_value
```

:p What additional features does the Query() function provide?
??x
`Query()` provides validation, aliases, deprecation, and documentation features for query parameters.

**Key Features:**
```python
q: str = Query(
    None,                    # Default (None = optional)
    min_length=3,           # String length constraints
    max_length=50,
    regex="^[a-z]+$",       # Pattern matching
    alias="search-query",   # URL param name differs
    deprecated=True,        # Mark in OpenAPI docs
    description="Search"    # Documentation
)
```

**Special Values:**
- `...` (Ellipsis) = Required with no default
- `None` = Optional, None if not provided

**Validation:** Same as `Path()` - numeric constraints (ge, le), string constraints (min/max length, regex)

**Alias Use Case:** Python-friendly names that differ from URL params (e.g., `item_query` in code, `item-query` in URL)

**Location:** `fastapi/param_functions.py`
x??

---

#### APIRoute - Request Handler Creation
`APIRoute` is a class that represents a single endpoint. Its `get_request_handler()` method creates the actual ASGI application that processes requests for that endpoint, handling dependency resolution and response serialization.

**Pseudocode for Request Handler:**
```python
class APIRoute:
    def __init__(self, path, endpoint, methods):
        self.path = path
        self.endpoint = endpoint
        self.methods = methods

        # Analyze endpoint at startup
        self.dependant = get_dependant(endpoint, path)
        self.request_handler = self.get_request_handler()

    def get_request_handler(self):
        # Create the actual request handler function
        async def app(request):
            # 1. Create dependency cache for this request
            dependency_cache = {}

            # 2. Create exit stack for cleanup
            async with AsyncExitStack() as stack:
                # 3. Solve all dependencies
                values = await solve_dependencies(
                    request=request,
                    dependant=self.dependant,
                    dependency_cache=dependency_cache,
                    async_exit_stack=stack
                )

                # 4. Call endpoint function with resolved dependencies
                raw_response = await run_endpoint(
                    endpoint=self.endpoint,
                    **values
                )

                # 5. Validate response if response_model is set
                if self.response_model:
                    validated_response = validate_response(
                        raw_response,
                        self.response_model
                    )
                else:
                    validated_response = raw_response

                # 6. Serialize to JSON-compatible format
                serialized = jsonable_encoder(validated_response)

                # 7. Create Response object
                response = JSONResponse(
                    content=serialized,
                    status_code=self.status_code
                )

                return response

            # 8. Exit stack cleanup runs here

        return app
```

:p What is APIRoute and what does its request handler do?
??x
`APIRoute` represents a single endpoint and creates a request handler that processes requests through dependency resolution, execution, and response serialization.

**Request Handler Process:**
1. Create dependency cache (request-scoped)
2. Create AsyncExitStack for cleanup
3. Solve all dependencies (extract, validate, inject)
4. Call endpoint function with resolved values
5. Validate response against response_model (if set)
6. Serialize response to JSON-compatible format
7. Create Response object (JSONResponse, etc.)
8. Cleanup runs (exit stack, generator teardown)

**Creation:** Request handler created at startup in `APIRoute.__init__()` via `get_request_handler()`

**Location:** `fastapi/routing.py`

**Key Point:** All the "magic" (dependencies, validation, serialization) happens in this handler.
x??

---

#### APIRouter - Modular Route Organization
`APIRouter` is like a mini FastAPI app that groups related routes together. Routers can be included in the main app or other routers, enabling modular application structure with shared prefixes, tags, and dependencies.

**Example:**
```python
from fastapi import APIRouter

# Create router for user-related endpoints
users_router = APIRouter(
    prefix="/users",                    # All routes get this prefix
    tags=["users"],                     # OpenAPI grouping
    dependencies=[Depends(verify_token)] # All routes get this dependency
)

@users_router.get("/")         # Actual path: /users/
def list_users():
    return ["user1", "user2"]

@users_router.get("/{user_id}") # Actual path: /users/{user_id}
def get_user(user_id: int):
    return {"user_id": user_id}

# Create router for items
items_router = APIRouter(prefix="/items", tags=["items"])

@items_router.get("/")         # Actual path: /items/
def list_items():
    return ["item1", "item2"]

# Include routers in main app
app = FastAPI()
app.include_router(users_router)
app.include_router(items_router)

# Final routes:
# GET /users/
# GET /users/{user_id}
# GET /items/
```

**Pseudocode Logic:**
```python
class APIRouter:
    def __init__(self, prefix="", tags=[], dependencies=[]):
        self.prefix = prefix
        self.tags = tags
        self.dependencies = dependencies
        self.routes = []

    def get(self, path):
        def decorator(func):
            full_path = self.prefix + path  # Combine prefix with path
            route = APIRoute(
                path=full_path,
                endpoint=func,
                tags=self.tags,
                dependencies=self.dependencies
            )
            self.routes.append(route)
            return func
        return decorator

    def include_router(self, router, prefix=""):
        # Merge another router's routes
        for route in router.routes:
            route.path = prefix + route.path  # Add prefix
            self.routes.append(route)

# When including in app:
app.include_router(users_router)
# Copies all routes from users_router to app.routes
```

:p What is APIRouter and how does it enable modular route organization?
??x
`APIRouter` is a class for grouping related routes with shared prefixes, tags, and dependencies, enabling modular app structure.

**Usage:**
```python
router = APIRouter(
    prefix="/users",
    tags=["users"],
    dependencies=[Depends(auth)]
)

@router.get("/")         # → /users/
@router.get("/{id}")     # → /users/{id}

app.include_router(router)
```

**Benefits:**
- **Modularity:** Separate routers for different features
- **Shared config:** Common prefix, tags, dependencies
- **Nesting:** Routers can include other routers
- **Organization:** Keep related endpoints together

**Process:**
1. Define routes on router
2. Router prepends prefix to all paths
3. `include_router()` copies routes to main app
4. Routes inherit router's tags and dependencies

**Location:** `fastapi/routing.py`
x??

---

#### Path Operation Decorators - Method Registration
Path operation decorators (`@app.get()`, `@app.post()`, etc.) are methods on `FastAPI` and `APIRouter` that register endpoints with specific HTTP methods. They create `APIRoute` instances and add them to the route table.

**Example:**
```python
@app.get("/items/")
def read_items():
    return ["item1", "item2"]

@app.post("/items/")
def create_item(item: Item):
    return item

@app.put("/items/{item_id}")
def update_item(item_id: int, item: Item):
    return {"item_id": item_id, **item.dict()}

@app.delete("/items/{item_id}")
def delete_item(item_id: int):
    return {"deleted": item_id}
```

**Decorator Implementation Pseudocode:**
```python
class FastAPI:
    def __init__(self):
        self.routes = []

    def get(self, path, **kwargs):
        """Decorator for GET requests"""
        def decorator(func):
            # Create APIRoute for this endpoint
            route = APIRoute(
                path=path,
                endpoint=func,
                methods=["GET"],  # GET method only
                **kwargs
            )
            # Add to route table
            self.routes.append(route)

            # Return original function unchanged
            return func

        return decorator

    def post(self, path, **kwargs):
        """Decorator for POST requests"""
        def decorator(func):
            route = APIRoute(
                path=path,
                endpoint=func,
                methods=["POST"],  # POST method only
                **kwargs
            )
            self.routes.append(route)
            return func
        return decorator

    # Similar for put(), delete(), patch(), etc.

# When used as decorator:
@app.get("/items/")  # Returns decorator function
def read_items():    # Passed to decorator
    return []        # Decorator creates APIRoute and adds to app.routes
```

**Multiple Methods:**
```python
# Same endpoint for multiple methods
@app.get("/items/{item_id}")
@app.put("/items/{item_id}")
def handle_item(item_id: int, item: Item = None):
    if request.method == "GET":
        return get_item(item_id)
    else:  # PUT
        return update_item(item_id, item)
```

:p How do path operation decorators work in FastAPI?
??x
Path operation decorators (`@app.get()`, `@app.post()`, etc.) register endpoints with specific HTTP methods by creating `APIRoute` instances.

**Implementation:**
```python
@app.get("/items/")  # Decorator call
def read_items():    # Decorated function
    return []

# Equivalent to:
route = APIRoute(path="/items/", endpoint=read_items, methods=["GET"])
app.routes.append(route)
```

**Process:**
1. Decorator called with path and options
2. Decorator function returned
3. Endpoint function passed to decorator
4. `APIRoute` created with method(s)
5. Route added to app's route table
6. Original function returned unchanged

**Available Decorators:**
- `get()`, `post()`, `put()`, `delete()`, `patch()`, `options()`, `head()`, `trace()`

**Location:** Methods on `FastAPI` class in `fastapi/applications.py`
x??

---

#### Parameter Source Resolution - ParamTypes
FastAPI determines where to extract each parameter from using the `ParamTypes` enum and the `in_` attribute of parameter field info. This determines whether a parameter comes from the path, query string, headers, cookies, or body.

**ParamTypes Enum:**
```python
class ParamTypes(str, Enum):
    query = "query"
    header = "header"
    path = "path"
    cookie = "cookie"
    body = "body"
```

**Parameter Source Logic:**
```python
def determine_param_source(param_name, param_annotation, path_params):
    # 1. Explicitly declared with Path(), Query(), etc.
    if isinstance(param_annotation, FieldInfo):
        return param_annotation.in_  # Returns ParamTypes value

    # 2. In the path pattern
    if param_name in path_params:  # e.g., {item_id} in "/items/{item_id}"
        return ParamTypes.path

    # 3. Pydantic model (not embedded)
    if is_pydantic_model(param_annotation):
        return ParamTypes.body

    # 4. Default to query
    return ParamTypes.query
```

**Example Analysis:**
```python
@app.get("/items/{item_id}")
def read_item(
    item_id: int,                           # In path → ParamTypes.path
    q: str = None,                          # Default → ParamTypes.query
    user_agent: str = Header(None),         # Explicit → ParamTypes.header
    session: str = Cookie(None),            # Explicit → ParamTypes.cookie
    item: Item = Body(...)                  # Explicit → ParamTypes.body
):
    pass

# FastAPI creates Dependant with:
# path_params: [item_id]
# query_params: [q]
# header_params: [user_agent]
# cookie_params: [session]
# body_params: [item]
```

**Extraction at Request Time:**
```python
async def extract_param(param, param_source, request):
    if param_source == ParamTypes.path:
        return request.path_params.get(param.name)

    elif param_source == ParamTypes.query:
        return request.query_params.get(param.name)

    elif param_source == ParamTypes.header:
        # Convert from header-name to header_name
        header_name = param.alias or param.name.replace("_", "-")
        return request.headers.get(header_name)

    elif param_source == ParamTypes.cookie:
        return request.cookies.get(param.name)

    elif param_source == ParamTypes.body:
        body = await request.json()
        return body.get(param.name)
```

:p How does FastAPI determine where each parameter comes from?
??x
FastAPI uses the `ParamTypes` enum and `in_` attribute to determine parameter sources (path, query, header, cookie, body).

**Resolution Order:**
1. **Explicit declaration** - Path(), Query(), Header(), Cookie(), Body()
   - Uses the `in_` attribute from FieldInfo
2. **In path pattern** - `{param_name}` in route path
   - Automatically detected as path parameter
3. **Pydantic model** - Class inheriting BaseModel
   - Treated as request body
4. **Default** - Everything else
   - Defaults to query parameter

**Example:**
```python
@app.get("/items/{item_id}")
def read(
    item_id: int,        # Path (in URL pattern)
    q: str = None,       # Query (default)
    token: str = Header()  # Header (explicit)
):
    pass
```

**Location:** Logic in `get_dependant()` in `fastapi/dependencies/utils.py`
x??

---

#### Request Body - Pydantic Model Handling
Request bodies are typically defined using Pydantic models. FastAPI automatically parses the JSON body, validates it against the model, and provides a typed instance to the endpoint.

**Example:**
```python
from pydantic import BaseModel, Field

class Item(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    description: str = None
    price: float = Field(..., gt=0)
    tax: float = None

@app.post("/items/")
def create_item(item: Item):
    # item is already a validated Item instance
    return {"name": item.name, "price": item.price}

# Request body:
# {
#   "name": "Laptop",
#   "description": "A nice laptop",
#   "price": 999.99,
#   "tax": 99.99
# }
```

**Validation Pseudocode:**
```python
async def parse_body_model(request, model_class):
    # 1. Parse JSON from request body
    try:
        raw_body = await request.json()
    except JSONDecodeError:
        raise ValidationError("Invalid JSON")

    # 2. Validate with Pydantic
    try:
        # Pydantic's validation
        validated_instance = model_class(**raw_body)
        # - Checks required fields
        # - Validates types
        # - Applies Field() constraints
        # - Runs custom validators
    except ValidationError as e:
        # Convert to RequestValidationError
        raise RequestValidationError(errors=e.errors())

    # 3. Return validated instance
    return validated_instance

# Example:
class Item(BaseModel):
    name: str
    price: float = Field(gt=0)

body = {"name": "Laptop", "price": 999.99}
item = parse_body_model(request, Item)
# item = Item(name="Laptop", price=999.99)

body = {"name": "Laptop", "price": -10}
item = parse_body_model(request, Item)
# Raises ValidationError: price must be > 0
```

**Multiple Body Parameters:**
```python
@app.put("/items/{item_id}")
def update_item(
    item_id: int,
    item: Item,           # First model
    importance: int = Body(...)  # Single value in body
):
    # Expected body:
    # {
    #   "item": {"name": "...", "price": ...},
    #   "importance": 5
    # }
    pass
```

:p How does FastAPI handle Pydantic models as request bodies?
??x
FastAPI automatically parses JSON request bodies and validates them against Pydantic models, providing typed instances to endpoints.

**Process:**
1. Detect Pydantic model in function signature
2. Mark as body parameter
3. At request time:
   - Parse JSON from request body
   - Validate with Pydantic model
   - Create typed instance
   - Inject into endpoint

**Example:**
```python
class Item(BaseModel):
    name: str
    price: float = Field(gt=0)

@app.post("/items/")
def create(item: Item):  # Auto-validated
    return item
```

**Validation:** Pydantic checks types, required fields, constraints, and runs custom validators. Returns 422 if validation fails.

**Location:** Body parsing in `solve_dependencies()`, Pydantic integration in `fastapi/dependencies/utils.py`
x??

---

#### Form Data and File Uploads
Form data and file uploads use special parameter types (`Form()` and `File()`) that parse `multipart/form-data` or `application/x-www-form-urlencoded` instead of JSON.

**Form Data Example:**
```python
from fastapi import Form

@app.post("/login/")
def login(
    username: str = Form(...),
    password: str = Form(...)
):
    return {"username": username}

# Request (application/x-www-form-urlencoded):
# username=johndoe&password=secret
```

**File Upload Example:**
```python
from fastapi import File, UploadFile

@app.post("/upload/")
async def upload_file(
    file: UploadFile = File(...)
):
    contents = await file.read()
    return {
        "filename": file.filename,
        "content_type": file.content_type,
        "size": len(contents)
    }

# Request (multipart/form-data):
# Content-Type: multipart/form-data; boundary=----WebKitFormBoundary
#
# ------WebKitFormBoundary
# Content-Disposition: form-data; name="file"; filename="test.txt"
# Content-Type: text/plain
#
# file contents here
# ------WebKitFormBoundary--
```

**UploadFile Features:**
```python
class UploadFile:
    filename: str           # Original filename
    content_type: str       # MIME type
    file: IO               # File-like object

    async def read(size: int = -1) -> bytes
    async def write(data: bytes) -> None
    async def seek(offset: int) -> None
    async def close() -> None
```

**Parsing Pseudocode:**
```python
async def parse_form_data(request, fields):
    # Check content type
    content_type = request.headers.get("content-type")

    if "application/x-www-form-urlencoded" in content_type:
        # Parse like query string
        body = await request.body()
        form_data = parse_urlencoded(body)
        # {"username": "johndoe", "password": "secret"}

    elif "multipart/form-data" in content_type:
        # Parse multipart (handles files)
        form = await request.form()
        # {"file": UploadFile(...), "description": "..."}

    # Extract requested fields
    result = {}
    for field in fields:
        if field.type == UploadFile:
            result[field.name] = form[field.name]  # UploadFile object
        else:
            result[field.name] = str(form[field.name])  # String value

    return result
```

:p How does FastAPI handle form data and file uploads?
??x
FastAPI uses `Form()` and `File()` parameter types to parse `multipart/form-data` and `application/x-www-form-urlencoded` request bodies.

**Form Data:**
```python
@app.post("/login/")
def login(
    username: str = Form(...),
    password: str = Form(...)
):
    return {"username": username}
```

**File Upload:**
```python
@app.post("/upload/")
async def upload(file: UploadFile = File(...)):
    contents = await file.read()
    return {"filename": file.filename, "size": len(contents)}
```

**UploadFile Methods:**
- `read()`, `write()`, `seek()`, `close()` - All async
- Properties: `filename`, `content_type`, `file`

**Note:** Cannot mix Form/File with Body (JSON) in same endpoint.

**Location:** Form parsing uses Starlette's form parsing, `UploadFile` defined in `fastapi/datastructures.py`
x??
