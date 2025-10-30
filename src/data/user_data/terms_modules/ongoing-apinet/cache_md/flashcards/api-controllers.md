# API Controller Flashcards

## Controller Fundamentals

#### What is an API Controller?
An API Controller is a class that handles HTTP requests and returns responses. It acts as the entry point for your API, receiving requests, processing them (often using services/databases), and sending back data or status codes.

```csharp
[ApiController]
[Route("api/[controller]")]
public class TodoController : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<TodoItem>>> GetAll()
    {
        // Handle GET /api/todo
        return await _context.TodoItems.ToListAsync();
    }
}
```

:p What is an API Controller and what is its role in an ASP.NET Core application?
??x
**API Controller = HTTP request handler**

**Role in application:**
```
HTTP Request
    ↓
Middleware Pipeline (routing, authentication, etc.)
    ↓
Controller (TodoController)
    ↓
Action Method (GetAll, Create, Update, Delete)
    ↓
Business Logic / Database Access
    ↓
Response (JSON, status code)
    ↓
HTTP Response
```

**Basic structure:**
```csharp
[ApiController]  // 1. Marks as API controller
[Route("api/[controller]")]  // 2. Defines base route
public class TodoController : ControllerBase  // 3. Inherit from ControllerBase
{
    private readonly TodoContext _context;

    // 4. Dependency injection via constructor
    public TodoController(TodoContext context)
    {
        _context = context;
    }

    // 5. Action methods handle specific HTTP verbs
    [HttpGet]
    public async Task<ActionResult<List<TodoItem>>> GetAll()
    {
        return await _context.TodoItems.ToListAsync();
    }
}
```

**What controller does:**
1. **Receives requests:** Matches incoming HTTP to action methods
2. **Model binding:** Converts request data to C# objects
3. **Validation:** Checks if data is valid
4. **Business logic:** Calls services/database
5. **Returns response:** Converts C# objects to JSON/XML

**Example flow:**
```
Client sends:
GET /api/todo HTTP/1.1

↓ Routing finds TodoController.GetAll()
↓ Executes method
↓ Queries database
↓ Returns List<TodoItem>

Server responds:
HTTP/1.1 200 OK
Content-Type: application/json
[{"id":1,"title":"Learn API",...}]
```

**Controller responsibilities:**
- ✓ HTTP concerns (routing, status codes)
- ✓ Input validation
- ✓ Calling business logic
- ✓ Response formatting
- ✗ Database access (use services/repositories)
- ✗ Complex business logic (use service layer)

**ControllerBase vs Controller:**
- `ControllerBase`: For APIs (no view support)
- `Controller`: For MVC with views (includes view rendering)

Always use `ControllerBase` for REST APIs.
x??

---

#### [ApiController] Attribute
The [ApiController] attribute enables automatic features like model validation, automatic HTTP 400 responses for invalid data, and binding source inference (knowing where data comes from).

```csharp
[ApiController]  // Enables automatic features
[Route("api/[controller]")]
public class TodoController : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<TodoItem>> Create(TodoItem item)
    {
        // [ApiController] automatically:
        // - Validates item
        // - Returns 400 if invalid
        // - Binds from request body
    }
}
```

:p What does the [ApiController] attribute do and what features does it enable?
??x
**[ApiController] attribute enables automatic API features:**

**Features enabled:**

**1. Automatic model validation:**
```csharp
public class TodoItem
{
    [Required]
    public string Title { get; set; }

    [MaxLength(1000)]
    public string? Description { get; set; }
}

[ApiController]
[Route("api/[controller]")]
public class TodoController : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<TodoItem>> Create(TodoItem item)
    {
        // WITHOUT [ApiController]:
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);  // Manual check
        }

        // WITH [ApiController]:
        // Validation automatic!
        // If invalid, 400 returned automatically
        // This code only runs if valid

        _context.TodoItems.Add(item);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = item.Id }, item);
    }
}
```

**2. Automatic HTTP 400 responses:**
```csharp
// Client sends invalid data:
POST /api/todo
{
    "title": "",  // Empty (Required fails)
    "description": "..." (1500 chars)  // Too long (MaxLength fails)
}

// [ApiController] automatically returns:
HTTP 400 Bad Request
{
    "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
    "title": "One or more validation errors occurred.",
    "status": 400,
    "errors": {
        "Title": ["The Title field is required."],
        "Description": ["The field Description must be a string with a maximum length of 1000."]
    }
}
```

**3. Binding source inference:**
```csharp
[ApiController]
public class TodoController : ControllerBase
{
    // [ApiController] infers binding sources automatically:

    [HttpGet("{id}")]
    public async Task<ActionResult<TodoItem>> Get(int id)
    {
        // id from route (URL path)
        // Inferred: [FromRoute]
    }

    [HttpGet]
    public async Task<ActionResult<List<TodoItem>>> GetFiltered(
        string? search)
    {
        // search from query string (?search=value)
        // Inferred: [FromQuery]
    }

    [HttpPost]
    public async Task<ActionResult<TodoItem>> Create(TodoItem item)
    {
        // item from request body (JSON)
        // Inferred: [FromBody]
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
        int id,           // From route
        TodoItem item)    // From body
    {
        // Inferred automatically
    }
}
```

**4. Multipart/form-data inference:**
```csharp
[HttpPost("upload")]
public async Task<IActionResult> Upload(IFormFile file)
{
    // [ApiController] knows file comes from form-data
    // Inferred: [FromForm]
}
```

**Without [ApiController]:**
```csharp
// Manual validation
[HttpPost]
public async Task<ActionResult<TodoItem>> Create([FromBody] TodoItem item)
{
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }

    // Manual binding source attributes
    // More verbose
}
```

**With [ApiController]:**
```csharp
// Clean, automatic
[HttpPost]
public async Task<ActionResult<TodoItem>> Create(TodoItem item)
{
    // Validation automatic
    // Binding automatic
}
```

**When to use:** Always use [ApiController] for REST APIs (standard best practice)
x??

---

## HTTP Methods

#### HTTP Verbs and Their Meanings
HTTP verbs indicate the intended operation: GET retrieves data, POST creates new resources, PUT updates existing resources, DELETE removes resources. These map to CRUD operations.

```csharp
[HttpGet]     // READ   - Get data
[HttpPost]    // CREATE - Create new resource
[HttpPut]     // UPDATE - Update existing resource
[HttpDelete]  // DELETE - Remove resource
[HttpPatch]   // PATCH  - Partial update
```

:p What do the different HTTP verbs mean and how do they map to CRUD operations?
??x
**HTTP verbs map to CRUD operations:**

**GET - Read (retrieve data):**
```csharp
// Get all todos
[HttpGet]
public async Task<ActionResult<List<TodoItem>>> GetAll()
{
    return await _context.TodoItems.ToListAsync();
}
// GET /api/todo → 200 OK + list

// Get specific todo
[HttpGet("{id}")]
public async Task<ActionResult<TodoItem>> Get(int id)
{
    var todo = await _context.TodoItems.FindAsync(id);
    if (todo == null) return NotFound();
    return todo;
}
// GET /api/todo/5 → 200 OK + item
// GET /api/todo/999 → 404 Not Found

// Characteristics:
// - Safe (doesn't modify data)
// - Idempotent (same result every time)
// - Cacheable
```

**POST - Create (new resource):**
```csharp
[HttpPost]
public async Task<ActionResult<TodoItem>> Create(TodoItem item)
{
    _context.TodoItems.Add(item);
    await _context.SaveChangesAsync();

    return CreatedAtAction(nameof(Get), new { id = item.Id }, item);
}
// POST /api/todo + JSON body → 201 Created + location header

// Characteristics:
// - Not safe (modifies data)
// - NOT idempotent (multiple POSTs = multiple resources)
// - Returns 201 Created
// - Location header points to new resource
```

**PUT - Update (replace entire resource):**
```csharp
[HttpPut("{id}")]
public async Task<IActionResult> Update(int id, TodoItem item)
{
    if (id != item.Id) return BadRequest();

    _context.Entry(item).State = EntityState.Modified;

    try
    {
        await _context.SaveChangesAsync();
    }
    catch (DbUpdateConcurrencyException)
    {
        if (!TodoExists(id)) return NotFound();
        throw;
    }

    return NoContent();
}
// PUT /api/todo/5 + JSON body → 204 No Content

// Characteristics:
// - Not safe (modifies data)
// - Idempotent (same result if repeated)
// - Returns 204 No Content
// - Replaces entire resource
```

**DELETE - Delete (remove resource):**
```csharp
[HttpDelete("{id}")]
public async Task<IActionResult> Delete(int id)
{
    var todo = await _context.TodoItems.FindAsync(id);
    if (todo == null) return NotFound();

    _context.TodoItems.Remove(todo);
    await _context.SaveChangesAsync();

    return NoContent();
}
// DELETE /api/todo/5 → 204 No Content
// DELETE /api/todo/999 → 404 Not Found

// Characteristics:
// - Not safe (modifies data)
// - Idempotent (deleting again has same effect)
// - Returns 204 No Content
```

**PATCH - Partial Update:**
```csharp
[HttpPatch("{id}")]
public async Task<IActionResult> PartialUpdate(
    int id,
    JsonPatchDocument<TodoItem> patchDoc)
{
    var todo = await _context.TodoItems.FindAsync(id);
    if (todo == null) return NotFound();

    patchDoc.ApplyTo(todo);
    await _context.SaveChangesAsync();

    return NoContent();
}
// PATCH /api/todo/5 + patch document → 204 No Content

// Characteristics:
// - Updates only specified fields
// - Not idempotent (depends on operations)
// - More complex than PUT
```

**Idempotency table:**
```
GET:    ✓ Idempotent (same result every call)
POST:   ✗ Not idempotent (creates new resource each time)
PUT:    ✓ Idempotent (same final state)
DELETE: ✓ Idempotent (already deleted = same result)
PATCH:  ~ Depends on operations
```

**CRUD mapping:**
```
Create → POST
Read   → GET
Update → PUT / PATCH
Delete → DELETE
```

**URL patterns:**
```
GET    /api/todo       - Get all
GET    /api/todo/5     - Get one
POST   /api/todo       - Create
PUT    /api/todo/5     - Update
DELETE /api/todo/5     - Delete
```
x??

---

#### Route Parameters
Route parameters are placeholders in URLs that extract values. Defined with {name} syntax in the [Route] or [HttpGet("{id}")] attributes.

```csharp
// URL: /api/todo/5
[HttpGet("{id}")]
public async Task<ActionResult<TodoItem>> Get(int id)
{
    // id = 5 (extracted from URL)
}

// URL: /api/todo/5/comments/10
[HttpGet("{todoId}/comments/{commentId}")]
public async Task<ActionResult> GetComment(int todoId, int commentId)
{
    // todoId = 5, commentId = 10
}
```

:p How do route parameters work and how are they extracted from URLs?
??x
**Route parameters extract values from URL paths:**

**Basic route parameter:**
```csharp
[HttpGet("{id}")]
public async Task<ActionResult<TodoItem>> Get(int id)
{
    var todo = await _context.TodoItems.FindAsync(id);
    if (todo == null) return NotFound();
    return todo;
}

// URL: GET /api/todo/5
// id parameter = 5

// URL: GET /api/todo/42
// id parameter = 42
```

**Multiple route parameters:**
```csharp
[HttpGet("{todoId}/comments/{commentId}")]
public async Task<ActionResult<Comment>> GetComment(
    int todoId,
    int commentId)
{
    // todoId and commentId extracted from URL
    var comment = await _context.Comments
        .FirstOrDefaultAsync(c =>
            c.TodoId == todoId &&
            c.Id == commentId);

    if (comment == null) return NotFound();
    return comment;
}

// URL: GET /api/todo/5/comments/10
// todoId = 5, commentId = 10
```

**Parameter constraints:**
```csharp
// Int constraint
[HttpGet("{id:int}")]
public async Task<ActionResult<TodoItem>> Get(int id)
{
    // Only matches if id is an integer
}

// URL: /api/todo/5      ✓ Matches
// URL: /api/todo/abc    ✗ Doesn't match (404)

// Minimum value
[HttpGet("{id:int:min(1)}")]
// Only matches if id >= 1

// Multiple constraints
[HttpGet("{id:int:min(1):max(1000)}")]
// Only matches if 1 <= id <= 1000

// Guid constraint
[HttpGet("{id:guid}")]
public async Task<ActionResult<TodoItem>> Get(Guid id)
{
    // Only matches valid GUIDs
}

// URL: /api/todo/550e8400-e29b-41d4-a716-446655440000  ✓ Matches
// URL: /api/todo/invalid-guid                           ✗ 404
```

**Optional parameters:**
```csharp
[HttpGet("{category}/{subcategory?}")]
public async Task<ActionResult<List<TodoItem>>> GetByCategory(
    string category,
    string? subcategory = null)
{
    var query = _context.TodoItems
        .Where(t => t.Category == category);

    if (subcategory != null)
        query = query.Where(t => t.Subcategory == subcategory);

    return await query.ToListAsync();
}

// URL: /api/todo/work           → category="work", subcategory=null
// URL: /api/todo/work/urgent    → category="work", subcategory="urgent"
```

**Catch-all parameter:**
```csharp
[HttpGet("files/{*path}")]
public IActionResult GetFile(string path)
{
    // Captures everything after /files/
    // URL: /api/todo/files/docs/2025/report.pdf
    // path = "docs/2025/report.pdf"
}
```

**Parameter name matching:**
```csharp
// Parameter name must match method parameter
[HttpGet("{id}")]
public async Task<ActionResult<TodoItem>> Get(int id)  // ✓ Matches

[HttpGet("{itemId}")]
public async Task<ActionResult<TodoItem>> Get(int id)  // ✗ Won't bind

// Solution 1: Match names
[HttpGet("{id}")]
public async Task<ActionResult<TodoItem>> Get(int id)

// Solution 2: Use [FromRoute]
[HttpGet("{itemId}")]
public async Task<ActionResult<TodoItem>> Get([FromRoute(Name = "itemId")] int id)
```

**Type conversion:**
```csharp
[HttpGet("{id}")]
public async Task<ActionResult<TodoItem>> Get(int id)

// URL: /api/todo/5     → id = 5 (int)
// URL: /api/todo/abc   → 404 (can't convert to int)

// Different types
[HttpGet("{id:guid}")]
public async Task<ActionResult> Get(Guid id)  // Auto-converted

[HttpGet("{active:bool}")]
public async Task<ActionResult> Get(bool active)  // "true" → true
```

**Route vs Query parameters:**
```csharp
// Route parameter (part of path)
[HttpGet("{id}")]
public async Task<ActionResult> Get(int id)
// URL: /api/todo/5

// Query parameter (after ?)
[HttpGet]
public async Task<ActionResult> Get([FromQuery] int id)
// URL: /api/todo?id=5

// Combined
[HttpGet("{category}")]
public async Task<ActionResult> Get(
    string category,           // From route
    [FromQuery] bool active)   // From query
// URL: /api/todo/work?active=true
```
x??

---

## Response Types

#### ActionResult<T> Return Type
ActionResult<T> allows returning either the actual data (T) or an HTTP status code. This provides flexibility to return success with data or error statuses.

```csharp
public async Task<ActionResult<TodoItem>> Get(int id)
{
    var todo = await _context.TodoItems.FindAsync(id);

    if (todo == null)
        return NotFound();  // Returns ActionResult (404)

    return todo;  // Returns T directly (becomes 200 OK)
}
```

:p What is ActionResult<T> and why is it useful for API endpoints?
??x
**ActionResult<T> = Flexible return type for APIs**

**Two return options:**

**1. Return data (T):**
```csharp
public async Task<ActionResult<TodoItem>> Get(int id)
{
    var todo = await _context.TodoItems.FindAsync(id);
    return todo;  // Returns TodoItem, becomes 200 OK
}

// Response:
// HTTP 200 OK
// {"id":5,"title":"...","isCompleted":false}
```

**2. Return status code:**
```csharp
public async Task<ActionResult<TodoItem>> Get(int id)
{
    var todo = await _context.TodoItems.FindAsync(id);

    if (todo == null)
        return NotFound();  // Returns 404

    return todo;  // Returns 200 OK with data
}

// If not found:
// HTTP 404 Not Found

// If found:
// HTTP 200 OK
// {"id":5,...}
```

**Common status code methods:**
```csharp
public async Task<ActionResult<TodoItem>> Example(int id)
{
    // 200 OK with data
    return Ok(data);
    return data;  // Implicit Ok()

    // 201 Created with location header
    return CreatedAtAction(nameof(Get), new { id = item.Id }, item);
    return Created("/api/todo/5", item);

    // 204 No Content (success, no body)
    return NoContent();

    // 400 Bad Request
    return BadRequest();
    return BadRequest("Invalid data");

    // 404 Not Found
    return NotFound();
    return NotFound("Todo not found");

    // 401 Unauthorized
    return Unauthorized();

    // 403 Forbidden
    return Forbid();

    // 500 Internal Server Error
    return StatusCode(500);
    return Problem("Something went wrong");
}
```

**vs non-generic ActionResult:**
```csharp
// ActionResult<T> - knows return type
public async Task<ActionResult<TodoItem>> Get(int id)
{
    return todo;  // T is TodoItem
}
// Swagger knows return type
// Better API documentation

// ActionResult - generic
public async Task<IActionResult> Get(int id)
{
    return Ok(todo);  // Return type unknown to compiler
}
// Swagger can't infer return type
```

**vs direct type:**
```csharp
// Direct type - only success
public async Task<TodoItem> Get(int id)
{
    return todo;  // Can't return NotFound()
}

// ActionResult<T> - success or error
public async Task<ActionResult<TodoItem>> Get(int id)
{
    if (todo == null) return NotFound();
    return todo;
}
```

**Implicit conversion:**
```csharp
public async Task<ActionResult<List<TodoItem>>> GetAll()
{
    // Both work:
    var list = await _context.TodoItems.ToListAsync();

    return list;  // Implicit conversion to ActionResult
    return Ok(list);  // Explicit
}
```

**Complete example:**
```csharp
[HttpGet("{id}")]
public async Task<ActionResult<TodoItem>> Get(int id)
{
    // Validation
    if (id <= 0)
        return BadRequest("Invalid ID");

    // Database query
    var todo = await _context.TodoItems.FindAsync(id);

    // Not found check
    if (todo == null)
        return NotFound($"Todo with ID {id} not found");

    // Success
    return todo;  // 200 OK with TodoItem
}

// Possible responses:
// 400 Bad Request (id <= 0)
// 404 Not Found (todo doesn't exist)
// 200 OK + TodoItem (success)
```

**Benefits:**
1. Flexible (data or status)
2. Type-safe (compiler knows T)
3. Better documentation (Swagger)
4. Clean syntax
x??

---

#### Status Code Methods
ASP.NET Core provides methods to return specific HTTP status codes with optional data or messages. These methods create ActionResult objects with the appropriate status code.

```csharp
return Ok(data);              // 200 OK
return Created(uri, data);    // 201 Created
return CreatedAtAction(...);  // 201 Created with location
return NoContent();           // 204 No Content
return BadRequest();          // 400 Bad Request
return NotFound();            // 404 Not Found
return Unauthorized();        // 401 Unauthorized
```

:p What are the common HTTP status code methods in ASP.NET Core controllers?
??x
**Common status code methods:**

**2xx Success:**

**200 OK - Success with data**
```csharp
[HttpGet]
public async Task<ActionResult<List<TodoItem>>> GetAll()
{
    var todos = await _context.TodoItems.ToListAsync();
    return Ok(todos);
    // or just: return todos;
}

// Response:
// HTTP 200 OK
// [{"id":1,...},{"id":2,...}]
```

**201 Created - Resource created**
```csharp
[HttpPost]
public async Task<ActionResult<TodoItem>> Create(TodoItem item)
{
    _context.TodoItems.Add(item);
    await _context.SaveChangesAsync();

    // Method 1: CreatedAtAction (recommended)
    return CreatedAtAction(
        nameof(Get),           // Action name
        new { id = item.Id },  // Route values
        item);                 // Response body

    // Method 2: Created with URI
    return Created($"/api/todo/{item.Id}", item);
}

// Response:
// HTTP 201 Created
// Location: /api/todo/5
// {"id":5,"title":"..."}
```

**204 No Content - Success, no body**
```csharp
[HttpPut("{id}")]
public async Task<IActionResult> Update(int id, TodoItem item)
{
    // Update logic...
    await _context.SaveChangesAsync();

    return NoContent();
}

[HttpDelete("{id}")]
public async Task<IActionResult> Delete(int id)
{
    // Delete logic...
    return NoContent();
}

// Response:
// HTTP 204 No Content
// (empty body)
```

**4xx Client Errors:**

**400 Bad Request - Invalid input**
```csharp
[HttpPost]
public async Task<ActionResult<TodoItem>> Create(TodoItem item)
{
    if (string.IsNullOrEmpty(item.Title))
        return BadRequest("Title is required");

    if (item.Title.Length > 200)
        return BadRequest(new {
            error = "Title too long",
            maxLength = 200
        });

    // Create logic...
}

// Response:
// HTTP 400 Bad Request
// "Title is required"
// or
// {"error":"Title too long","maxLength":200}
```

**404 Not Found - Resource doesn't exist**
```csharp
[HttpGet("{id}")]
public async Task<ActionResult<TodoItem>> Get(int id)
{
    var todo = await _context.TodoItems.FindAsync(id);

    if (todo == null)
        return NotFound();
        // or: return NotFound($"Todo {id} not found");

    return todo;
}

// Response (not found):
// HTTP 404 Not Found

// Response (found):
// HTTP 200 OK
// {"id":5,...}
```

**401 Unauthorized - Authentication required**
```csharp
[HttpGet("secure")]
public async Task<ActionResult<List<TodoItem>>> GetSecure()
{
    if (User.Identity?.IsAuthenticated != true)
        return Unauthorized();

    return await _context.TodoItems.ToListAsync();
}

// Response:
// HTTP 401 Unauthorized
```

**403 Forbidden - Authenticated but no permission**
```csharp
[HttpDelete("{id}")]
public async Task<IActionResult> Delete(int id)
{
    var todo = await _context.TodoItems.FindAsync(id);
    if (todo == null) return NotFound();

    if (todo.OwnerId != User.Id)
        return Forbid();  // or: return StatusCode(403)

    _context.TodoItems.Remove(todo);
    await _context.SaveChangesAsync();

    return NoContent();
}

// Response:
// HTTP 403 Forbidden
```

**5xx Server Errors:**

**500 Internal Server Error**
```csharp
[HttpGet("{id}")]
public async Task<ActionResult<TodoItem>> Get(int id)
{
    try
    {
        var todo = await _context.TodoItems.FindAsync(id);
        return todo;
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Error getting todo {Id}", id);
        return StatusCode(500, "Internal server error");
        // or: return Problem("An error occurred");
    }
}

// Response:
// HTTP 500 Internal Server Error
// "Internal server error"
```

**Status code decision tree:**
```
Request received
    ↓
Authenticated? → No → 401 Unauthorized
    ↓ Yes
Authorized? → No → 403 Forbidden
    ↓ Yes
Valid input? → No → 400 Bad Request
    ↓ Yes
Resource exists? → No → 404 Not Found
    ↓ Yes
Process successfully? → No → 500 Internal Server Error
    ↓ Yes
GET → 200 OK
POST → 201 Created
PUT/DELETE → 204 No Content
```

**Best practices:**
- GET → 200 OK (with data) or 404
- POST → 201 Created (with location)
- PUT/PATCH → 200 OK or 204 No Content
- DELETE → 204 No Content or 404
- Validation errors → 400 Bad Request
- Not found → 404 Not Found
x??

---

## Dependency Injection

#### Constructor Injection in Controllers
Dependencies (like DbContext, services, loggers) are injected through the controller's constructor. ASP.NET Core's DI container automatically provides these dependencies.

```csharp
public class TodoController : ControllerBase
{
    private readonly TodoContext _context;
    private readonly ILogger<TodoController> _logger;

    // Constructor - dependencies injected here
    public TodoController(
        TodoContext context,
        ILogger<TodoController> logger)
    {
        _context = context;
        _logger = logger;
    }

    // Use injected dependencies in action methods
    [HttpGet]
    public async Task<ActionResult<List<TodoItem>>> GetAll()
    {
        _logger.LogInformation("Getting all todos");
        return await _context.TodoItems.ToListAsync();
    }
}
```

:p How does dependency injection work in ASP.NET Core controllers?
??x
**Dependency injection in controllers:**

**1. Register services (Program.cs):**
```csharp
var builder = WebApplication.CreateBuilder(args);

// Register services
builder.Services.AddDbContext<TodoContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddScoped<ITodoService, TodoService>();
builder.Services.AddSingleton<ICacheService, CacheService>();

builder.Services.AddControllers();
```

**2. Inject via constructor:**
```csharp
public class TodoController : ControllerBase
{
    private readonly TodoContext _context;
    private readonly ITodoService _todoService;
    private readonly ILogger<TodoController> _logger;

    // Constructor injection
    public TodoController(
        TodoContext context,
        ITodoService todoService,
        ILogger<TodoController> logger)
    {
        _context = context;
        _todoService = todoService;
        _logger = logger;
    }

    // Use injected dependencies
    [HttpGet]
    public async Task<ActionResult<List<TodoItem>>> GetAll()
    {
        _logger.LogInformation("Getting all todos");
        return await _todoService.GetAllAsync();
    }
}
```

**How it works:**
```
1. Request comes in: GET /api/todo

2. ASP.NET Core routing finds TodoController

3. DI container creates controller:
   - Resolves TodoContext (creates new instance - Scoped)
   - Resolves ITodoService (creates new instance - Scoped)
   - Resolves ILogger (reuses singleton)
   - Calls TodoController constructor with dependencies

4. Controller executes action method

5. After request, DI container:
   - Disposes Scoped services (TodoContext, TodoService)
   - Keeps Singleton services (Logger)
```

**Service lifetimes:**

**Scoped (per request):**
```csharp
builder.Services.AddScoped<TodoContext>();
// New instance per HTTP request
// Shared within same request
// Disposed after request

// Example:
// Request 1: Context instance A
// Request 2: Context instance B (different)
// Same request, multiple controllers: Same instance A
```

**Transient (every time):**
```csharp
builder.Services.AddTransient<IEmailService, EmailService>();
// New instance every injection
// Even within same request

// Example:
// Inject twice: Get 2 different instances
```

**Singleton (application lifetime):**
```csharp
builder.Services.AddSingleton<IConfiguration>();
// One instance for entire application
// Created once, reused forever
// Never disposed until app shuts down

// Example:
// All requests: Same instance
```

**Multiple dependencies:**
```csharp
public class TodoController : ControllerBase
{
    private readonly TodoContext _context;
    private readonly IAuthService _authService;
    private readonly IEmailService _emailService;
    private readonly ICacheService _cache;
    private readonly ILogger<TodoController> _logger;

    public TodoController(
        TodoContext context,
        IAuthService authService,
        IEmailService emailService,
        ICacheService cache,
        ILogger<TodoController> logger)
    {
        _context = context;
        _authService = authService;
        _emailService = emailService;
        _cache = cache;
        _logger = logger;
    }
}

// DI container resolves all automatically
```

**Interface vs concrete:**
```csharp
// Good - depend on interface
builder.Services.AddScoped<ITodoService, TodoService>();

public TodoController(ITodoService todoService) { }

// Allows:
// - Mocking for tests
// - Swapping implementations
// - Following SOLID principles

// Avoid - depending on concrete class
public TodoController(TodoService todoService) { }
// Tight coupling, hard to test
```

**Benefits:**
1. **Testability:** Inject mocks
2. **Loose coupling:** Depend on abstractions
3. **Lifetime management:** Automatic disposal
4. **Centralized configuration:** Register once, use everywhere
x??
