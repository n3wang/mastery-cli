# FastAPI OpenAPI and Validation Flashcards

## Overview
These flashcards cover FastAPI's automatic OpenAPI documentation generation and Pydantic-based validation system.

---

#### OpenAPI Schema Generation - Basic Concept
FastAPI automatically generates OpenAPI 3.0 schemas by introspecting route definitions, parameter types, and Pydantic models. This happens at startup and is served at `/openapi.json`.

**Pseudocode Flow:**
```python
def generate_openapi_schema(app):
    schema = {
        "openapi": "3.0.2",
        "info": {
            "title": app.title,
            "version": app.version
        },
        "paths": {}
    }

    # For each route in the application
    for route in app.routes:
        if not isinstance(route, APIRoute):
            continue

        # Generate path item for this route
        path = route.path
        if path not in schema["paths"]:
            schema["paths"][path] = {}

        # For each HTTP method this route handles
        for method in route.methods:
            # Generate operation object
            operation = {
                "summary": route.summary or route.name,
                "operationId": route.operation_id or generate_operation_id(route),
                "parameters": [],
                "responses": {}
            }

            # Add parameters from dependant
            for path_param in route.dependant.path_params:
                operation["parameters"].append({
                    "name": path_param.name,
                    "in": "path",
                    "required": True,
                    "schema": get_type_schema(path_param.type)
                })

            for query_param in route.dependant.query_params:
                operation["parameters"].append({
                    "name": query_param.name,
                    "in": "query",
                    "required": not has_default(query_param),
                    "schema": get_type_schema(query_param.type)
                })

            # Add request body if present
            if route.dependant.body_params:
                operation["requestBody"] = generate_request_body_schema(
                    route.dependant.body_params
                )

            # Add responses
            operation["responses"]["200"] = {
                "description": "Successful Response",
                "content": {
                    "application/json": {
                        "schema": get_response_schema(route.response_model)
                    }
                }
            }

            schema["paths"][path][method.lower()] = operation

    return schema
```

:p How does FastAPI automatically generate OpenAPI schemas?
??x
FastAPI generates OpenAPI 3.0 schemas by introspecting routes, analyzing the `Dependant` objects, and extracting type information from Pydantic models.

**Process:**
1. At startup, iterate through all routes
2. For each route, extract:
   - Path parameters (from path pattern)
   - Query parameters (from function signature)
   - Request body schema (from Pydantic models)
   - Response schema (from response_model)
3. Generate OpenAPI operation objects
4. Combine into complete OpenAPI schema
5. Serve at `/openapi.json`

**Key Function:** `get_openapi()` in `fastapi/openapi/utils.py`

**Benefits:** Documentation auto-updates with code changes, always in sync.
x??

---

#### OpenAPI Documentation UIs
FastAPI provides interactive API documentation UIs (Swagger UI and ReDoc) that consume the OpenAPI schema. These are served at `/docs` and `/redoc` by default.

**UI Setup:**
```python
app = FastAPI(
    title="My API",
    description="API description",
    version="1.0.0",
    docs_url="/docs",        # Swagger UI (default: /docs)
    redoc_url="/redoc",      # ReDoc (default: /redoc)
    openapi_url="/openapi.json"  # OpenAPI schema endpoint
)

# Disable docs (for production):
app = FastAPI(docs_url=None, redoc_url=None)
```

**Pseudocode for Docs Endpoint:**
```python
@app.get("/docs")
async def swagger_ui_html():
    # Generate HTML page with Swagger UI
    html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist/swagger-ui.css">
    </head>
    <body>
        <div id="swagger-ui"></div>
        <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist/swagger-ui-bundle.js"></script>
        <script>
            SwaggerUIBundle({{
                url: '{app.openapi_url}',  // Load schema from /openapi.json
                dom_id: '#swagger-ui',
                presets: [SwaggerUIBundle.presets.apis]
            }})
        </script>
    </body>
    </html>
    """
    return HTMLResponse(html)

@app.get("/redoc")
async def redoc_html():
    # Similar HTML but for ReDoc
    html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <script src="https://cdn.jsdelivr.net/npm/redoc/bundles/redoc.standalone.js"></script>
    </head>
    <body>
        <redoc spec-url='{app.openapi_url}'></redoc>
    </body>
    </html>
    """
    return HTMLResponse(html)
```

:p What documentation UIs does FastAPI provide and how do they work?
??x
FastAPI provides Swagger UI (`/docs`) and ReDoc (`/redoc`) for interactive API documentation, both consuming the auto-generated OpenAPI schema.

**Default Endpoints:**
- `/docs` - Swagger UI (interactive, try-it-out features)
- `/redoc` - ReDoc (clean, mobile-friendly)
- `/openapi.json` - Raw OpenAPI schema

**Configuration:**
```python
app = FastAPI(
    docs_url="/api/docs",    # Custom path
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json"
)

# Disable in production:
app = FastAPI(docs_url=None, redoc_url=None)
```

**How it works:** UIs are HTML pages with JavaScript that fetch and render the OpenAPI schema from `/openapi.json`.

**Location:** `get_swagger_ui_html()` and `get_redoc_html()` in `fastapi/openapi/docs.py`
x??

---

#### Pydantic Model Validation - Field Types
Pydantic validates data against type hints and Field constraints. FastAPI uses Pydantic models for request/response validation, automatically converting types and enforcing constraints.

**Example:**
```python
from pydantic import BaseModel, Field, validator
from typing import Optional
from datetime import datetime

class Item(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = None
    price: float = Field(..., gt=0, description="Price must be positive")
    tax: Optional[float] = Field(None, ge=0, le=100)
    quantity: int = Field(1, ge=1)
    created_at: datetime = Field(default_factory=datetime.now)
    tags: list[str] = []

    @validator('name')
    def name_must_not_contain_special_chars(cls, v):
        if not v.replace(' ', '').isalnum():
            raise ValueError('Name must be alphanumeric')
        return v
```

**Validation Pseudocode:**
```python
def validate_model(data: dict, model_class: BaseModel):
    validated = {}
    errors = []

    # For each field in the model
    for field_name, field_info in model_class.__fields__.items():

        # 1. Get raw value
        if field_name in data:
            raw_value = data[field_name]
        elif field_info.default is not None:
            validated[field_name] = field_info.default
            continue
        elif field_info.required:
            errors.append(f"Field '{field_name}' required")
            continue
        else:
            validated[field_name] = None
            continue

        # 2. Type conversion
        try:
            typed_value = convert_to_type(raw_value, field_info.type)
        except (ValueError, TypeError) as e:
            errors.append(f"Field '{field_name}' must be {field_info.type}")
            continue

        # 3. Apply Field() constraints
        if field_info.gt is not None and typed_value <= field_info.gt:
            errors.append(f"Field '{field_name}' must be > {field_info.gt}")
        if field_info.ge is not None and typed_value < field_info.ge:
            errors.append(f"Field '{field_name}' must be >= {field_info.ge}")
        if field_info.lt is not None and typed_value >= field_info.lt:
            errors.append(f"Field '{field_name}' must be < {field_info.lt}")
        if field_info.le is not None and typed_value > field_info.le:
            errors.append(f"Field '{field_name}' must be <= {field_info.le}")

        # 4. Run custom validators
        for validator_func in field_info.validators:
            try:
                typed_value = validator_func(typed_value)
            except ValueError as e:
                errors.append(str(e))

        validated[field_name] = typed_value

    if errors:
        raise ValidationError(errors)

    return model_class(**validated)
```

:p How does Pydantic model validation work in FastAPI?
??x
Pydantic validates data by checking types, applying Field constraints, and running custom validators.

**Process:**
1. **Type conversion** - Convert raw data to specified type
2. **Required check** - Ensure required fields present
3. **Field constraints** - Apply gt, ge, lt, le, min_length, max_length, regex
4. **Custom validators** - Run @validator decorated methods
5. **Create instance** - If all pass, create model instance

**Example:**
```python
class Item(BaseModel):
    name: str = Field(..., min_length=1)
    price: float = Field(gt=0)

    @validator('name')
    def validate_name(cls, v):
        if 'admin' in v.lower():
            raise ValueError('Invalid name')
        return v
```

**Errors:** Returns 422 status with detailed error information.

**Integration:** FastAPI uses Pydantic for all model validation automatically.
x??

---

#### Request Validation Error Handling
When request validation fails (invalid types, missing required fields, constraint violations), FastAPI returns a 422 Unprocessable Entity response with detailed error information.

**Error Response Format:**
```json
{
  "detail": [
    {
      "loc": ["body", "price"],
      "msg": "ensure this value is greater than 0",
      "type": "value_error.number.not_gt",
      "ctx": {"limit_value": 0}
    },
    {
      "loc": ["query", "limit"],
      "msg": "value is not a valid integer",
      "type": "type_error.integer"
    }
  ]
}
```

**Error Handling Pseudocode:**
```python
class RequestValidationError(Exception):
    def __init__(self, errors: list):
        self.errors = errors

# Exception handler registered in FastAPI
async def request_validation_exception_handler(request, exc):
    # Convert Pydantic errors to FastAPI format
    formatted_errors = []

    for error in exc.errors():
        formatted_errors.append({
            "loc": error["loc"],        # Location: ["body", "field_name"]
            "msg": error["msg"],        # Human-readable message
            "type": error["type"],      # Error type code
            "ctx": error.get("ctx", {}) # Additional context
        })

    return JSONResponse(
        status_code=422,  # Unprocessable Entity
        content={"detail": formatted_errors}
    )

# Example validation flow:
try:
    # Parse request body
    body = await request.json()
    # Validate with Pydantic
    item = Item(**body)
except ValidationError as e:
    # Convert to RequestValidationError
    raise RequestValidationError(e.errors())
# Handler catches and formats response
```

**Error Location (`loc`) Format:**
```python
["body", "price"]           # Body parameter 'price'
["query", "limit"]          # Query parameter 'limit'
["path", "item_id"]         # Path parameter 'item_id'
["header", "x-api-key"]     # Header 'x-api-key'
["body", "user", "email"]   # Nested field in body
```

:p How does FastAPI handle request validation errors?
??x
FastAPI catches validation errors and returns a 422 Unprocessable Entity response with detailed error information.

**Response Format:**
```json
{
  "detail": [
    {
      "loc": ["body", "price"],
      "msg": "must be greater than 0",
      "type": "value_error.number.not_gt"
    }
  ]
}
```

**Error Fields:**
- `loc` - Location of error (path in request)
- `msg` - Human-readable message
- `type` - Error type code
- `ctx` - Additional context

**Status Code:** 422 (Unprocessable Entity)

**Handler:** `request_validation_exception_handler()` in `fastapi/exception_handlers.py`

**Customization:** Can override with custom exception handler using `@app.exception_handler(RequestValidationError)`
x??

---

#### Response Model Validation
The `response_model` parameter validates and serializes endpoint responses. It filters fields, validates types, and ensures responses match the declared schema.

**Example:**
```python
class UserIn(BaseModel):
    username: str
    password: str
    email: str

class UserOut(BaseModel):
    username: str
    email: str
    # Note: password field excluded

@app.post("/users/", response_model=UserOut)
def create_user(user: UserIn):
    # Save user to database (including password)
    saved_user = save_to_db(user)

    # Return full user object (including password)
    return saved_user
    # FastAPI automatically filters to only UserOut fields
    # Response: {"username": "...", "email": "..."}
    # Password is NOT included in response
```

**Response Validation Pseudocode:**
```python
async def serialize_response(raw_response, response_model):
    if response_model is None:
        # No validation - return as-is
        return raw_response

    # 1. Validate response against model
    try:
        if isinstance(raw_response, response_model):
            # Already an instance
            validated = raw_response
        else:
            # Convert to model (validates and filters)
            validated = response_model(**raw_response.dict())
    except ValidationError as e:
        # Response doesn't match declared model
        raise ResponseValidationError(e.errors())

    # 2. Serialize to JSON-compatible format
    serialized = jsonable_encoder(
        validated,
        include=response_model_include,
        exclude=response_model_exclude,
        by_alias=response_model_by_alias
    )

    return serialized

# Example:
class UserOut(BaseModel):
    username: str
    email: str

raw = {"username": "john", "email": "john@example.com", "password": "secret"}
result = serialize_response(raw, UserOut)
# result = {"username": "john", "email": "john@example.com"}
# password automatically excluded
```

**Advanced Options:**
```python
@app.get("/items/", response_model=list[Item])  # List of items
def read_items():
    return [item1, item2, item3]

@app.get("/items/{id}", response_model=Item, response_model_exclude={"internal_id"})
def read_item(id: int):
    return get_item(id)  # internal_id excluded from response

@app.get("/items/{id}", response_model=Item, response_model_include={"name", "price"})
def read_item_minimal(id: int):
    return get_item(id)  # Only name and price included
```

:p What is response_model and how does it work?
??x
`response_model` validates and filters endpoint responses, ensuring they match the declared schema and automatically excluding unspecified fields.

**Usage:**
```python
class UserOut(BaseModel):
    username: str
    email: str

@app.post("/users/", response_model=UserOut)
def create_user(user: UserIn):
    saved = save_user(user)  # Has password field
    return saved  # Password auto-filtered out
```

**Process:**
1. Endpoint returns raw data
2. Validate against response_model
3. Filter to only include model fields
4. Serialize to JSON-compatible format
5. Return filtered response

**Options:**
- `response_model_exclude` - Exclude specific fields
- `response_model_include` - Include only specific fields
- `response_model_by_alias` - Use field aliases

**Location:** Validation in `serialize_response()` in `fastapi/routing.py`
x??

---

#### JSON Encoding - jsonable_encoder
`jsonable_encoder()` converts Python objects to JSON-serializable formats, handling Pydantic models, dataclasses, dates, UUIDs, and custom types.

**Example:**
```python
from fastapi.encoders import jsonable_encoder
from datetime import datetime
from pydantic import BaseModel
from uuid import UUID

class User(BaseModel):
    id: UUID
    name: str
    created_at: datetime

user = User(
    id=UUID("123e4567-e89b-12d3-a456-426614174000"),
    name="John",
    created_at=datetime(2024, 1, 1, 12, 0, 0)
)

encoded = jsonable_encoder(user)
# {
#   "id": "123e4567-e89b-12d3-a456-426614174000",
#   "name": "John",
#   "created_at": "2024-01-01T12:00:00"
# }
```

**Encoding Pseudocode:**
```python
def jsonable_encoder(obj, include=None, exclude=None):
    # 1. Pydantic model
    if isinstance(obj, BaseModel):
        data = obj.dict(include=include, exclude=exclude)
        return jsonable_encoder(data)  # Recursively encode dict

    # 2. Dictionary
    elif isinstance(obj, dict):
        return {
            key: jsonable_encoder(value)
            for key, value in obj.items()
            if should_include(key, include, exclude)
        }

    # 3. List/Tuple/Set
    elif isinstance(obj, (list, tuple, set)):
        return [jsonable_encoder(item) for item in obj]

    # 4. Special types
    elif isinstance(obj, datetime):
        return obj.isoformat()  # "2024-01-01T12:00:00"

    elif isinstance(obj, UUID):
        return str(obj)  # "123e4567-..."

    elif isinstance(obj, Enum):
        return obj.value

    elif isinstance(obj, Path):
        return str(obj)

    elif hasattr(obj, "__dict__"):
        # Dataclass or custom class
        return jsonable_encoder(obj.__dict__)

    # 5. Already JSON-serializable
    elif isinstance(obj, (str, int, float, bool, type(None))):
        return obj

    # 6. Custom encoder
    else:
        if custom_encoder := get_custom_encoder(type(obj)):
            return custom_encoder(obj)
        else:
            # Fallback to str()
            return str(obj)
```

**Custom Encoders:**
```python
from fastapi.encoders import jsonable_encoder

class CustomType:
    def __init__(self, value):
        self.value = value

# Add custom encoder
encoded = jsonable_encoder(
    CustomType(42),
    custom_encoder={CustomType: lambda x: {"custom": x.value}}
)
# {"custom": 42}
```

:p What does jsonable_encoder() do and how does it work?
??x
`jsonable_encoder()` converts Python objects to JSON-serializable formats, recursively handling complex types.

**Conversions:**
- Pydantic models → `dict` (via `.dict()`)
- datetime → ISO string (`"2024-01-01T12:00:00"`)
- UUID → string
- Enum → value
- Path → string
- Dataclasses → dict
- Lists/dicts → recursively encoded
- Custom types → via custom_encoder

**Example:**
```python
from datetime import datetime
from uuid import UUID

data = {
    "id": UUID("..."),
    "created": datetime.now(),
    "tags": ["a", "b"]
}
encoded = jsonable_encoder(data)
# All values converted to JSON-compatible types
```

**Options:** `include`, `exclude` for field filtering

**Location:** `fastapi/encoders.py`
x??

---

#### OpenAPI Tags and Metadata
Tags group related operations in OpenAPI documentation. Metadata includes descriptions, external docs, and other information displayed in the documentation UI.

**Example:**
```python
from fastapi import FastAPI

# Define tag metadata
tags_metadata = [
    {
        "name": "users",
        "description": "Operations with users. The **login** logic is also here.",
        "externalDocs": {
            "description": "Users external docs",
            "url": "https://example.com/users",
        },
    },
    {
        "name": "items",
        "description": "Manage items. So _fancy_ they have their own docs.",
    },
]

app = FastAPI(
    title="My API",
    description="My API description with **markdown**",
    version="1.0.0",
    openapi_tags=tags_metadata
)

# Use tags in routes
@app.get("/users/", tags=["users"])
def read_users():
    return [{"username": "john"}]

@app.get("/items/", tags=["items"])
def read_items():
    return [{"name": "Laptop"}]

# Router with tags
router = APIRouter(
    prefix="/admin",
    tags=["admin", "users"]  # Multiple tags
)
```

**OpenAPI Schema Result:**
```json
{
  "openapi": "3.0.2",
  "info": {
    "title": "My API",
    "version": "1.0.0"
  },
  "tags": [
    {
      "name": "users",
      "description": "Operations with users...",
      "externalDocs": {...}
    }
  ],
  "paths": {
    "/users/": {
      "get": {
        "tags": ["users"],
        "summary": "Read Users",
        ...
      }
    }
  }
}
```

:p How do OpenAPI tags work in FastAPI?
??x
Tags group related operations in documentation and can include descriptions and external documentation links.

**Usage:**
```python
# Define tag metadata
tags_metadata = [
    {
        "name": "users",
        "description": "User operations",
        "externalDocs": {"url": "https://..."}
    }
]

app = FastAPI(openapi_tags=tags_metadata)

# Apply to routes
@app.get("/users/", tags=["users"])
def read_users():
    return []

# Apply to routers
router = APIRouter(tags=["admin"])
```

**Benefits:**
- Groups endpoints in Swagger UI
- Provides category descriptions
- Links to external documentation
- Supports markdown in descriptions

**Multiple Tags:** Endpoints can have multiple tags for cross-categorization.

**Location:** Tag processing in `get_openapi()` in `fastapi/openapi/utils.py`
x??

---

#### Operation ID and Summary
Operation IDs uniquely identify operations in OpenAPI, used by code generators. Summaries provide short descriptions displayed in documentation.

**Example:**
```python
@app.get(
    "/items/{item_id}",
    operation_id="get_item_by_id",          # Custom operation ID
    summary="Get a single item",             # Short description
    description="Retrieve an item by its unique identifier. Returns full item details.",
    response_description="The requested item"  # Response description
)
def read_item(item_id: int):
    """
    This docstring is also used as description if description parameter not provided.

    - **item_id**: The item's unique identifier
    """
    return {"item_id": item_id}
```

**Auto-Generated Operation ID:**
```python
# If operation_id not specified, FastAPI generates one:
def generate_operation_id(route):
    # Format: {method}_{path}_{function_name}
    # Example: get_items_item_id_read_item
    return f"{route.method}_{route.path}_{route.endpoint.__name__}"

# Can customize generation:
def custom_generate_unique_id(route: APIRoute):
    return f"{route.name}"

app = FastAPI(generate_unique_id_function=custom_generate_unique_id)
```

**OpenAPI Result:**
```json
{
  "paths": {
    "/items/{item_id}": {
      "get": {
        "summary": "Get a single item",
        "description": "Retrieve an item by its unique identifier...",
        "operationId": "get_item_by_id",
        "responses": {
          "200": {
            "description": "The requested item"
          }
        }
      }
    }
  }
}
```

:p What are operation IDs and summaries in FastAPI OpenAPI?
??x
Operation IDs uniquely identify operations (for code generators), while summaries provide short descriptions for documentation.

**Usage:**
```python
@app.get(
    "/items/{id}",
    operation_id="getItem",       # Unique ID
    summary="Get an item",        # Short description
    description="Long description..."  # Detailed docs
)
def read_item(id: int):
    """Docstring used if description not provided"""
    return {}
```

**Auto-Generation:** If not specified, FastAPI generates operation ID from method + path + function name.

**Custom Generation:**
```python
app = FastAPI(
    generate_unique_id_function=custom_func
)
```

**Use Cases:**
- Operation IDs: Code generators, client SDKs
- Summaries: Documentation UI, quick reference

**Location:** Set in `APIRoute.__init__()`, used in `get_openapi()` in `fastapi/openapi/utils.py`
x??
