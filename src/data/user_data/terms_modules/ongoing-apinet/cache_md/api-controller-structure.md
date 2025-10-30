# API Controller Structure in .NET

## What is a Controller?

A **Controller** in ASP.NET Core is a class that handles HTTP requests and returns responses. Think of it as the "traffic controller" for your API - it receives requests, processes them, and sends back responses.

## Basic Controller Anatomy

Here's the `TodoController` from this project with explanations:

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.Models;

namespace TodoApi.Controllers;

// [ApiController] marks this as an API controller with automatic features
[ApiController]
// [Route] defines the base URL path: /api/todo
[Route("api/[controller]")]
public class TodoController : ControllerBase
{
    private readonly TodoContext _context;
    private readonly ILogger<TodoController> _logger;

    // Constructor - dependencies are injected automatically
    public TodoController(TodoContext context, ILogger<TodoController> logger)
    {
        _context = context;
        _logger = logger;
    }

    // Methods (actions) go here...
}
```

### Key Concepts Explained

#### 1. `[ApiController]` Attribute
This attribute enables:
- **Automatic model validation**: Returns 400 Bad Request if data is invalid
- **Automatic HTTP 400 responses**: For validation errors
- **Binding source inference**: Automatically knows where data comes from (body, query, route)

#### 2. `[Route("api/[controller]")]` Attribute
- Defines the base URL for all actions in this controller
- `[controller]` is replaced with the controller name minus "Controller"
- `TodoController` → `/api/todo`

#### 3. `ControllerBase` vs `Controller`
- `ControllerBase`: For APIs (what we use) - no view support
- `Controller`: For MVC with views - includes view rendering

## HTTP Methods (Actions)

### GET - Retrieve Data

```csharp
/// <summary>
/// Get all todo items
/// </summary>
[HttpGet]  // Responds to GET /api/todo
public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodoItems()
{
    return await _context.TodoItems.ToListAsync();
}

/// <summary>
/// Get a specific todo item by id
/// </summary>
[HttpGet("{id}")]  // Responds to GET /api/todo/5
public async Task<ActionResult<TodoItem>> GetTodoItem(int id)
{
    var todoItem = await _context.TodoItems.FindAsync(id);

    if (todoItem == null)
    {
        return NotFound();  // Returns 404
    }

    return todoItem;  // Returns 200 with the item
}
```

**Breaking it down:**
- `async`: Method runs asynchronously (doesn't block)
- `Task<ActionResult<TodoItem>>`: Returns a result that can be data or HTTP status
- `await`: Waits for async operation to complete
- `{id}`: Route parameter - captures value from URL

### POST - Create Data

```csharp
/// <summary>
/// Create a new todo item
/// </summary>
[HttpPost]  // Responds to POST /api/todo
public async Task<ActionResult<TodoItem>> CreateTodoItem(TodoItem todoItem)
{
    todoItem.CreatedAt = DateTime.UtcNow;
    _context.TodoItems.Add(todoItem);
    await _context.SaveChangesAsync();

    // Returns 201 Created with Location header
    return CreatedAtAction(nameof(GetTodoItem), new { id = todoItem.Id }, todoItem);
}
```

**Breaking it down:**
- `TodoItem todoItem`: Automatically binds from request body (JSON)
- `Add()`: Adds entity to EF Core's change tracker
- `SaveChangesAsync()`: Commits changes to database
- `CreatedAtAction()`: Returns 201 with location of created resource

### PUT - Update Data

```csharp
/// <summary>
/// Update an existing todo item
/// </summary>
[HttpPut("{id}")]  // Responds to PUT /api/todo/5
public async Task<IActionResult> UpdateTodoItem(int id, TodoItem todoItem)
{
    if (id != todoItem.Id)
    {
        return BadRequest();  // Returns 400
    }

    _context.Entry(todoItem).State = EntityState.Modified;

    try
    {
        await _context.SaveChangesAsync();
    }
    catch (DbUpdateConcurrencyException)
    {
        if (!TodoItemExists(id))
        {
            return NotFound();  // Returns 404
        }
        throw;
    }

    return NoContent();  // Returns 204 (success, no content)
}
```

**Breaking it down:**
- `id` from URL, `todoItem` from request body
- `Entry().State = Modified`: Tells EF Core the entity changed
- `try/catch`: Handles concurrency errors (if item deleted during update)
- `NoContent()`: Returns 204 (standard for successful PUT)

### DELETE - Remove Data

```csharp
/// <summary>
/// Delete a todo item
/// </summary>
[HttpDelete("{id}")]  // Responds to DELETE /api/todo/5
public async Task<IActionResult> DeleteTodoItem(int id)
{
    var todoItem = await _context.TodoItems.FindAsync(id);
    if (todoItem == null)
    {
        return NotFound();  // Returns 404
    }

    _context.TodoItems.Remove(todoItem);
    await _context.SaveChangesAsync();

    return NoContent();  // Returns 204
}
```

## Return Types Explained

### `ActionResult<T>`
Allows returning either:
- The actual data: `return todoItem;` (becomes 200 OK)
- An HTTP status: `return NotFound();` (becomes 404)

### Common Return Methods

```csharp
return Ok(data);              // 200 OK with data
return Created(uri, data);    // 201 Created
return CreatedAtAction(...);  // 201 Created with location header
return NoContent();           // 204 No Content
return BadRequest();          // 400 Bad Request
return NotFound();            // 404 Not Found
return Unauthorized();        // 401 Unauthorized
return Forbid();              // 403 Forbidden
```

## Route Parameters

```csharp
// URL: /api/todo/5
[HttpGet("{id}")]
public async Task<ActionResult<TodoItem>> GetTodoItem(int id)

// URL: /api/todo/5/comments/10
[HttpGet("{todoId}/comments/{commentId}")]
public async Task<ActionResult> GetComment(int todoId, int commentId)

// URL: /api/todo?completed=true
[HttpGet]
public async Task<ActionResult> GetTodos([FromQuery] bool completed)
```

## Request Body Binding

```csharp
// Automatically binds JSON from request body
[HttpPost]
public async Task<ActionResult> Create(TodoItem item)

// Explicit binding source
[HttpPost]
public async Task<ActionResult> Create([FromBody] TodoItem item)

// Multiple sources
[HttpPost("{id}")]
public async Task<ActionResult> Update(
    [FromRoute] int id,           // From URL
    [FromBody] TodoItem item,     // From request body
    [FromQuery] string? note)     // From query string
```

## Testing Your Controller

### Using curl

```bash
# GET all todos
curl https://apinet.n.l0l.in/api/todo

# GET single todo
curl https://apinet.n.l0l.in/api/todo/1

# POST create todo
curl -X POST https://apinet.n.l0l.in/api/todo \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn .NET","description":"Study controllers","isCompleted":false}'

# PUT update todo
curl -X PUT https://apinet.n.l0l.in/api/todo/1 \
  -H "Content-Type: application/json" \
  -d '{"id":1,"title":"Learn .NET","isCompleted":true,"createdAt":"2025-10-02T00:00:00Z"}'

# DELETE todo
curl -X DELETE https://apinet.n.l0l.in/api/todo/1
```

### Using Swagger UI

1. Open `https://apinet.n.l0l.in/` in browser
2. Expand any endpoint
3. Click "Try it out"
4. Fill in parameters
5. Click "Execute"

## Best Practices

1. **Use async/await** for database operations
   ```csharp
   // Good
   await _context.SaveChangesAsync();

   // Avoid
   _context.SaveChanges();
   ```

2. **Return appropriate HTTP status codes**
   ```csharp
   if (item == null) return NotFound();
   if (id != item.Id) return BadRequest();
   return Ok(item);
   ```

3. **Use ActionResult<T>** for flexibility
   ```csharp
   public async Task<ActionResult<TodoItem>> Get(int id)
   ```

4. **Add XML comments** for Swagger documentation
   ```csharp
   /// <summary>
   /// Gets a specific todo item
   /// </summary>
   /// <param name="id">The todo item ID</param>
   /// <returns>The todo item</returns>
   [HttpGet("{id}")]
   public async Task<ActionResult<TodoItem>> Get(int id)
   ```

## Common Pitfalls

❌ **Forgetting to await**
```csharp
var items = _context.TodoItems.ToListAsync();  // Wrong!
var items = await _context.TodoItems.ToListAsync();  // Correct
```

❌ **Not checking for null**
```csharp
var item = await _context.TodoItems.FindAsync(id);
return item;  // Could return null, causing issues
```
✅ **Proper null handling**
```csharp
var item = await _context.TodoItems.FindAsync(id);
if (item == null) return NotFound();
return item;
```

❌ **Blocking async code**
```csharp
var result = SomeAsyncMethod().Result;  // Blocks thread
var result = await SomeAsyncMethod();    // Correct
```

## Next Steps

- Read `docs/dependency-injection.md` to understand how `_context` and `_logger` get into the controller
- Read `docs/async-await-patterns.md` to master async programming
- Read `docs/entity-framework-basics.md` to learn more about `_context`

## Official Resources

- [ASP.NET Core Controllers](https://docs.microsoft.com/en-us/aspnet/core/web-api/)
- [Routing in ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/routing)
- [Action Return Types](https://docs.microsoft.com/en-us/aspnet/core/web-api/action-return-types)
