# Dependency Injection in .NET

## What is Dependency Injection (DI)?

**Dependency Injection** is a design pattern where objects receive their dependencies from external sources rather than creating them internally.

Think of it like a restaurant:
- ❌ **Without DI**: Chef buys ingredients, cooks, and serves (does everything)
- ✅ **With DI**: Chef receives ingredients from supplier, focuses only on cooking

## Why Use Dependency Injection?

1. **Testability**: Easy to swap real dependencies with test versions
2. **Maintainability**: Changes in one place don't break everything
3. **Loose Coupling**: Classes don't need to know how to create their dependencies
4. **Lifetime Management**: Framework handles creating and disposing objects

## How DI Works in This Project

### Step 1: Register Services (Program.cs)

```csharp
var builder = WebApplication.CreateBuilder(args);

// Register services in the DI container
builder.Services.AddControllers();  // Registers controller services

// Register TodoContext with a specific lifetime
builder.Services.AddDbContext<TodoContext>(options =>
    options.UseNpgsql(connectionString));

// Built-in services automatically registered:
// - ILogger<T>
// - IConfiguration
// - IWebHostEnvironment
```

### Step 2: Inject into Controllers

```csharp
public class TodoController : ControllerBase
{
    private readonly TodoContext _context;
    private readonly ILogger<TodoController> _logger;

    // Dependencies are automatically injected through constructor
    public TodoController(TodoContext context, ILogger<TodoController> logger)
    {
        _context = context;  // Store for use in action methods
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodoItems()
    {
        _logger.LogInformation("Getting all todo items");
        return await _context.TodoItems.ToListAsync();
    }
}
```

**What's happening:**
1. ASP.NET Core sees `TodoController` needs `TodoContext` and `ILogger<TodoController>`
2. It looks in the DI container for these types
3. It creates instances (or reuses existing ones based on lifetime)
4. It passes them to the constructor
5. Controller uses them throughout its lifetime

## Service Lifetimes

.NET has three service lifetimes that control when instances are created and disposed:

### 1. Transient
**New instance every time it's requested**

```csharp
builder.Services.AddTransient<IMyService, MyService>();
```

**Use when:**
- Service is lightweight and stateless
- You need a fresh instance each time

**Example:**
```csharp
// Each request gets a new EmailSender
builder.Services.AddTransient<IEmailSender, EmailSender>();
```

### 2. Scoped
**One instance per HTTP request (or scope)**

```csharp
builder.Services.AddScoped<IMyService, MyService>();
```

**Use when:**
- Service maintains state during a request
- Database contexts (most common)

**Example:**
```csharp
// Same TodoContext instance throughout entire HTTP request
builder.Services.AddDbContext<TodoContext>(options =>
    options.UseNpgsql(connectionString));  // Uses Scoped by default
```

**Why Scoped for DbContext?**
- All operations in one request share the same database connection
- Changes are tracked together
- Disposed at end of request (connection released)

### 3. Singleton
**One instance for the entire application lifetime**

```csharp
builder.Services.AddSingleton<IMyService, MyService>();
```

**Use when:**
- Service has no state
- Service is expensive to create
- Service needs to be shared across entire app

**Example:**
```csharp
// One cache instance shared by all requests
builder.Services.AddSingleton<ICacheService, CacheService>();
```

⚠️ **Warning**: Never inject Scoped services into Singletons!

## Practical Examples from This Project

### Example 1: DbContext Registration

```csharp
// In Program.cs
var connectionString = "Host=143.198.247.248;...";
builder.Services.AddDbContext<TodoContext>(options =>
    options.UseNpgsql(connectionString));
```

**What this does:**
1. Registers `TodoContext` as a **Scoped** service
2. Configures it to use PostgreSQL with the connection string
3. Makes it available for injection anywhere in the app

### Example 2: Logging

```csharp
// In any controller
public class TodoController : ControllerBase
{
    private readonly ILogger<TodoController> _logger;

    public TodoController(ILogger<TodoController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult> Get()
    {
        _logger.LogInformation("Getting todos");
        _logger.LogWarning("Something unusual happened");
        _logger.LogError("An error occurred");
        // ...
    }
}
```

`ILogger<T>` is automatically registered by ASP.NET Core as **Singleton**.

### Example 3: Multiple Dependencies

```csharp
public class TodoController : ControllerBase
{
    private readonly TodoContext _context;
    private readonly ILogger<TodoController> _logger;
    private readonly IConfiguration _config;

    public TodoController(
        TodoContext context,
        ILogger<TodoController> logger,
        IConfiguration config)
    {
        _context = context;
        _logger = logger;
        _config = config;
    }
}
```

All three are automatically resolved and injected!

## Creating Your Own Services

### Step 1: Define an Interface

```csharp
// ITodoService.cs
namespace TodoApi.Services;

public interface ITodoService
{
    Task<List<TodoItem>> GetActiveTodosAsync();
    Task<bool> MarkAsCompleteAsync(int id);
}
```

### Step 2: Implement the Interface

```csharp
// TodoService.cs
namespace TodoApi.Services;

public class TodoService : ITodoService
{
    private readonly TodoContext _context;
    private readonly ILogger<TodoService> _logger;

    public TodoService(TodoContext context, ILogger<TodoService> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<List<TodoItem>> GetActiveTodosAsync()
    {
        _logger.LogInformation("Getting active todos");
        return await _context.TodoItems
            .Where(t => !t.IsCompleted)
            .ToListAsync();
    }

    public async Task<bool> MarkAsCompleteAsync(int id)
    {
        var todo = await _context.TodoItems.FindAsync(id);
        if (todo == null) return false;

        todo.IsCompleted = true;
        todo.CompletedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();
        return true;
    }
}
```

### Step 3: Register in Program.cs

```csharp
// Register as Scoped (shares lifetime with DbContext)
builder.Services.AddScoped<ITodoService, TodoService>();
```

### Step 4: Inject and Use

```csharp
public class TodoController : ControllerBase
{
    private readonly ITodoService _todoService;

    public TodoController(ITodoService todoService)
    {
        _todoService = todoService;
    }

    [HttpGet("active")]
    public async Task<ActionResult<List<TodoItem>>> GetActive()
    {
        var todos = await _todoService.GetActiveTodosAsync();
        return Ok(todos);
    }

    [HttpPost("{id}/complete")]
    public async Task<ActionResult> MarkComplete(int id)
    {
        var result = await _todoService.MarkAsCompleteAsync(id);
        if (!result) return NotFound();
        return NoContent();
    }
}
```

## Common Patterns

### Constructor Injection (Most Common)
```csharp
public class MyController : ControllerBase
{
    private readonly IMyService _service;

    public MyController(IMyService service)
    {
        _service = service;
    }
}
```

### Method Injection (Rare)
```csharp
[HttpGet]
public ActionResult Get([FromServices] IMyService service)
{
    // Use service only in this method
}
```

### Manual Resolution (Avoid if possible)
```csharp
public class Startup
{
    public void Configure(IApplicationBuilder app)
    {
        var service = app.ApplicationServices.GetRequiredService<IMyService>();
    }
}
```

## Choosing the Right Lifetime

| Lifetime | When to Use | Example |
|----------|------------|---------|
| **Transient** | Lightweight, stateless | Email sender, HTTP client |
| **Scoped** | Per-request state | DbContext, current user info |
| **Singleton** | App-wide state | Configuration, caching |

## Common Mistakes

❌ **Creating dependencies manually**
```csharp
public class TodoController : ControllerBase
{
    private readonly TodoContext _context;

    public TodoController()
    {
        // WRONG! Don't do this
        _context = new TodoContext();
    }
}
```

✅ **Use dependency injection**
```csharp
public class TodoController : ControllerBase
{
    private readonly TodoContext _context;

    public TodoController(TodoContext context)
    {
        // Correct!
        _context = context;
    }
}
```

❌ **Injecting Scoped into Singleton**
```csharp
// WRONG! DbContext is Scoped
builder.Services.AddSingleton<IMySingleton, MySingleton>();

public class MySingleton : IMySingleton
{
    private readonly TodoContext _context;  // Scoped - will cause issues!

    public MySingleton(TodoContext context)
    {
        _context = context;
    }
}
```

✅ **Use IServiceProvider for scoped access from singleton**
```csharp
public class MySingleton : IMySingleton
{
    private readonly IServiceProvider _serviceProvider;

    public MySingleton(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task DoWork()
    {
        using var scope = _serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<TodoContext>();
        // Use context...
    }
}
```

## Testing with DI

Dependency Injection makes testing easy:

```csharp
// In tests, inject a mock or in-memory database
var options = new DbContextOptionsBuilder<TodoContext>()
    .UseInMemoryDatabase("TestDb")
    .Options;

var context = new TodoContext(options);
var logger = Mock.Of<ILogger<TodoController>>();

var controller = new TodoController(context, logger);
```

## Built-in Services You Get for Free

These are automatically available for injection:

```csharp
public MyController(
    ILogger<MyController> logger,           // Logging
    IConfiguration configuration,           // App settings
    IWebHostEnvironment environment,        // Dev/Production info
    IHttpContextAccessor httpContext,       // Access to current request
    IServiceProvider serviceProvider)       // Access to DI container
{
    // All automatically injected!
}
```

## Next Steps

- Read `docs/async-await-patterns.md` to understand async operations
- Read `docs/entity-framework-basics.md` to learn about `TodoContext`
- Practice creating your own services!

## Official Resources

- [Dependency Injection in .NET](https://docs.microsoft.com/en-us/dotnet/core/extensions/dependency-injection)
- [Service Lifetimes](https://docs.microsoft.com/en-us/dotnet/core/extensions/dependency-injection#service-lifetimes)
- [ASP.NET Core DI](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection)
