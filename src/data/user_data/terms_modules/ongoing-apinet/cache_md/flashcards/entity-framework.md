# Entity Framework Core Flashcards

## Core Concepts

#### What is an ORM?
An Object-Relational Mapper (ORM) is a tool that converts between database tables (relational) and C# objects (object-oriented). Entity Framework Core is Microsoft's ORM that lets you work with databases using C# code instead of writing SQL queries.

```csharp
// Without ORM (raw SQL)
var sql = "SELECT * FROM TodoItems WHERE IsCompleted = 0";
// Execute SQL, parse results manually...

// With ORM (EF Core)
var todos = await _context.TodoItems
    .Where(t => !t.IsCompleted)
    .ToListAsync();
```

:p What is an ORM and how does Entity Framework Core work as one?
??x
**ORM = Object-Relational Mapper**

**Purpose:** Bridge between objects (C#) and relations (database)

**Without ORM:**
```csharp
// Write SQL manually
string sql = "SELECT * FROM TodoItems WHERE Id = @id";
var command = new SqlCommand(sql, connection);
command.Parameters.AddWithValue("@id", 5);
var reader = command.ExecuteReader();

// Parse results manually
while (reader.Read())
{
    var todo = new TodoItem {
        Id = reader.GetInt32(0),
        Title = reader.GetString(1),
        // ... map each column
    };
}
```

**With EF Core ORM:**
```csharp
// Write C# LINQ
var todo = await _context.TodoItems
    .Where(t => t.Id == 5)
    .FirstOrDefaultAsync();

// EF Core generates SQL automatically:
// SELECT * FROM TodoItems WHERE Id = 5
```

**How it works:**

**1. Define models (C# classes):**
```csharp
public class TodoItem {
    public int Id { get; set; }
    public string Title { get; set; }
}
```

**2. DbContext maps to database:**
```csharp
public class TodoContext : DbContext {
    public DbSet<TodoItem> TodoItems { get; set; }
}
```

**3. Query using LINQ:**
```csharp
var completed = await _context.TodoItems
    .Where(t => t.IsCompleted)
    .ToListAsync();
```

**4. EF Core translates to SQL:**
```sql
SELECT * FROM TodoItems WHERE IsCompleted = 1
```

**Benefits:**
- Type safety (compile-time checking)
- No SQL injection vulnerabilities
- Database agnostic (swap PostgreSQL ↔ SQL Server)
- Change tracking (automatic updates)
x??

---

#### Entity, DbContext, and DbSet
An Entity is a C# class that maps to a database table. DbContext is the bridge to the database and manages entities. DbSet<T> represents a specific table and provides query/save operations.

```csharp
// Entity - represents table row
public class TodoItem {
    public int Id { get; set; }
    public string Title { get; set; }
}

// DbContext - database connection
public class TodoContext : DbContext {
    public DbSet<TodoItem> TodoItems { get; set; }
}

// DbSet - represents table
_context.TodoItems.Add(newTodo);
```

:p What are Entity, DbContext, and DbSet in EF Core and how do they relate?
??x
**Three core concepts in EF Core:**

**1. Entity - C# class = Table row**
```csharp
// Entity (Model)
public class TodoItem
{
    public int Id { get; set; }        // Maps to Id column
    public string Title { get; set; }  // Maps to Title column
    public bool IsCompleted { get; set; }
}

// One instance = one row in database
var todo = new TodoItem {
    Title = "Learn EF Core",
    IsCompleted = false
};
```

**2. DbContext - Database bridge**
```csharp
public class TodoContext : DbContext
{
    // Constructor with options
    public TodoContext(DbContextOptions<TodoContext> options)
        : base(options) { }

    // DbSet properties (tables)
    public DbSet<TodoItem> TodoItems { get; set; }
    public DbSet<User> Users { get; set; }

    // Configuration
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Define table structure
    }
}
```

**Responsibilities:**
- Connection management
- Change tracking
- Query translation
- Transaction management

**3. DbSet<T> - Table operations**
```csharp
// DbSet represents a table
DbSet<TodoItem> TodoItems

// Query the table
var all = await _context.TodoItems.ToListAsync();
var one = await _context.TodoItems.FindAsync(id);
var filtered = await _context.TodoItems
    .Where(t => t.IsCompleted)
    .ToListAsync();

// Modify the table
_context.TodoItems.Add(newTodo);     // INSERT
_context.TodoItems.Remove(todo);     // DELETE
_context.TodoItems.Update(todo);     // UPDATE
```

**Relationship:**
```
TodoContext (bridge to database)
    ├─ DbSet<TodoItem> TodoItems (TodoItems table)
    ├─ DbSet<User> Users (Users table)
    └─ DbSet<Comment> Comments (Comments table)

Each DbSet contains entities (rows)
```

**Usage pattern:**
```csharp
// 1. Get DbContext (injected)
public TodoController(TodoContext context) {
    _context = context;
}

// 2. Use DbSet to query/modify
var todos = await _context.TodoItems.ToListAsync();

// 3. Save changes
await _context.SaveChangesAsync();
```
x??

---

## Querying Data

#### LINQ to Entities
LINQ (Language Integrated Query) allows you to query collections using C# syntax. EF Core translates LINQ expressions into SQL queries. The query doesn't execute until you enumerate (ToListAsync, FirstAsync, etc.).

```csharp
// LINQ query (not executed yet)
var query = _context.TodoItems
    .Where(t => !t.IsCompleted)
    .OrderBy(t => t.CreatedAt);

// Execution happens here
var result = await query.ToListAsync();

// Generated SQL:
// SELECT * FROM TodoItems
// WHERE IsCompleted = 0
// ORDER BY CreatedAt
```

:p How does LINQ work with Entity Framework Core and when is SQL executed?
??x
**LINQ = Language Integrated Query in C#**

**Deferred execution:**
```csharp
// 1. Build query (NO SQL yet)
var query = _context.TodoItems
    .Where(t => !t.IsCompleted)
    .OrderBy(t => t.CreatedAt)
    .Take(10);

// Still no SQL...

// 2. Execute query (SQL happens NOW)
var result = await query.ToListAsync();
```

**Execution triggers:**
```csharp
// These execute SQL:
.ToListAsync()       // Returns List<T>
.ToArrayAsync()      // Returns T[]
.FirstAsync()        // First item or exception
.FirstOrDefaultAsync() // First item or null
.SingleAsync()       // One item or exception
.CountAsync()        // Count of items
.AnyAsync()          // True if any exist
.SumAsync()          // Sum of values

// These build query (no execution):
.Where()             // Filter
.OrderBy()           // Sort
.Select()            // Transform
.Skip()              // Pagination
.Take()              // Limit
```

**Translation to SQL:**
```csharp
// C# LINQ:
var activeTodos = await _context.TodoItems
    .Where(t => !t.IsCompleted && t.CreatedAt > DateTime.UtcNow.AddDays(-7))
    .OrderByDescending(t => t.CreatedAt)
    .Take(10)
    .ToListAsync();

// Generated SQL (PostgreSQL):
SELECT * FROM "TodoItems"
WHERE ("IsCompleted" = FALSE)
  AND ("CreatedAt" > NOW() - INTERVAL '7 days')
ORDER BY "CreatedAt" DESC
LIMIT 10
```

**Building complex queries:**
```csharp
var query = _context.TodoItems.AsQueryable();

if (filterCompleted)
    query = query.Where(t => t.IsCompleted);

if (searchTerm != null)
    query = query.Where(t => t.Title.Contains(searchTerm));

if (sortByDate)
    query = query.OrderBy(t => t.CreatedAt);

// Still no SQL executed...

// Execute here:
var results = await query.ToListAsync();
```

**Performance consideration:**
```csharp
// ❌ Bad - loads all, filters in memory
var todos = await _context.TodoItems.ToListAsync();
var completed = todos.Where(t => t.IsCompleted).ToList();

// ✅ Good - filters in database
var completed = await _context.TodoItems
    .Where(t => t.IsCompleted)
    .ToListAsync();
```

**Key insight:** Query is just an expression tree until enumeration
x??

---

#### Filtering and Ordering
The Where() method filters records based on conditions. OrderBy() and ThenBy() sort results. Multiple conditions can be combined with && (AND) and || (OR).

```csharp
// Single condition
.Where(t => t.IsCompleted)

// Multiple conditions (AND)
.Where(t => !t.IsCompleted && t.CreatedAt > DateTime.UtcNow.AddDays(-7))

// Multiple conditions (OR)
.Where(t => t.Title.Contains("urgent") || t.Priority > 5)

// Ordering
.OrderBy(t => t.CreatedAt)              // Ascending
.OrderByDescending(t => t.CreatedAt)    // Descending
.OrderBy(t => t.IsCompleted).ThenBy(t => t.CreatedAt)  // Multiple
```

:p How do you filter and order data in Entity Framework Core?
??x
**Filtering with Where():**

**Single condition:**
```csharp
// SQL: WHERE IsCompleted = true
var completed = await _context.TodoItems
    .Where(t => t.IsCompleted)
    .ToListAsync();
```

**Multiple conditions (AND):**
```csharp
// SQL: WHERE IsCompleted = false AND CreatedAt > '2025-10-22'
var recent = await _context.TodoItems
    .Where(t => !t.IsCompleted && t.CreatedAt > DateTime.UtcNow.AddDays(-7))
    .ToListAsync();
```

**Multiple conditions (OR):**
```csharp
// SQL: WHERE Title LIKE '%urgent%' OR Priority > 5
var important = await _context.TodoItems
    .Where(t => t.Title.Contains("urgent") || t.Priority > 5)
    .ToListAsync();
```

**String operations:**
```csharp
// Contains - SQL: LIKE '%search%'
.Where(t => t.Title.Contains("search"))

// StartsWith - SQL: LIKE 'prefix%'
.Where(t => t.Title.StartsWith("prefix"))

// EndsWith - SQL: LIKE '%suffix'
.Where(t => t.Title.EndsWith("suffix"))
```

**Null checking:**
```csharp
// SQL: WHERE Description IS NOT NULL
.Where(t => t.Description != null)

// SQL: WHERE Description IS NULL
.Where(t => t.Description == null)
```

**Ordering:**

**Single sort:**
```csharp
// SQL: ORDER BY CreatedAt ASC
.OrderBy(t => t.CreatedAt)

// SQL: ORDER BY CreatedAt DESC
.OrderByDescending(t => t.CreatedAt)
```

**Multiple sorts:**
```csharp
// SQL: ORDER BY IsCompleted ASC, CreatedAt DESC
var todos = await _context.TodoItems
    .OrderBy(t => t.IsCompleted)
    .ThenByDescending(t => t.CreatedAt)
    .ToListAsync();

// First by completion status, then by date within each group
```

**Combining filter + order:**
```csharp
var todos = await _context.TodoItems
    .Where(t => !t.IsCompleted)           // Filter incomplete
    .OrderByDescending(t => t.CreatedAt)  // Sort by newest
    .Take(10)                              // Top 10
    .ToListAsync();

// SQL:
// SELECT * FROM TodoItems
// WHERE IsCompleted = false
// ORDER BY CreatedAt DESC
// LIMIT 10
```

**Dynamic sorting:**
```csharp
IQueryable<TodoItem> query = _context.TodoItems;

if (sortBy == "date")
    query = query.OrderBy(t => t.CreatedAt);
else if (sortBy == "title")
    query = query.OrderBy(t => t.Title);

var result = await query.ToListAsync();
```
x??

---

#### Pagination
Pagination divides large result sets into pages using Skip() and Take(). Skip(n) skips the first n records, Take(n) takes the next n records.

```csharp
// Page calculation
int pageNumber = 3;
int pageSize = 10;

var page = await _context.TodoItems
    .Skip((pageNumber - 1) * pageSize)  // Skip first 20
    .Take(pageSize)                      // Take next 10
    .ToListAsync();

// SQL: LIMIT 10 OFFSET 20
```

:p How does pagination work in Entity Framework Core?
??x
**Pagination formula:**
```
Skip = (PageNumber - 1) × PageSize
Take = PageSize
```

**Implementation:**
```csharp
public async Task<List<TodoItem>> GetPage(int pageNumber, int pageSize)
{
    return await _context.TodoItems
        .Skip((pageNumber - 1) * pageSize)
        .Take(pageSize)
        .ToListAsync();
}

// Page 1: Skip(0).Take(10)   - items 1-10
// Page 2: Skip(10).Take(10)  - items 11-20
// Page 3: Skip(20).Take(10)  - items 21-30
```

**Generated SQL:**
```sql
-- PostgreSQL
SELECT * FROM "TodoItems"
LIMIT 10 OFFSET 20

-- SQL Server
SELECT * FROM TodoItems
ORDER BY Id
OFFSET 20 ROWS
FETCH NEXT 10 ROWS ONLY
```

**Complete pagination example:**
```csharp
public async Task<PagedResult<TodoItem>> GetPagedTodos(
    int pageNumber,
    int pageSize,
    string? searchTerm = null)
{
    var query = _context.TodoItems.AsQueryable();

    // Optional filter
    if (!string.IsNullOrEmpty(searchTerm))
        query = query.Where(t => t.Title.Contains(searchTerm));

    // Get total count (before pagination)
    var totalCount = await query.CountAsync();

    // Apply pagination
    var items = await query
        .OrderBy(t => t.Id)  // Consistent ordering important!
        .Skip((pageNumber - 1) * pageSize)
        .Take(pageSize)
        .ToListAsync();

    return new PagedResult<TodoItem>
    {
        Items = items,
        PageNumber = pageNumber,
        PageSize = pageSize,
        TotalCount = totalCount,
        TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize)
    };
}
```

**Important - Always order before paging:**
```csharp
// ❌ Bad - unpredictable results
.Skip(10).Take(10)

// ✅ Good - consistent results
.OrderBy(t => t.Id)
.Skip(10).Take(10)
```

**Why ordering matters:**
Without ORDER BY, database returns rows in any order (heap order, index order, etc.). Results will be inconsistent between requests.

**Math example:**
```
Total items: 47
Page size: 10

Page 1: Skip(0).Take(10)   = items 1-10   (10 items)
Page 2: Skip(10).Take(10)  = items 11-20  (10 items)
Page 3: Skip(20).Take(10)  = items 21-30  (10 items)
Page 4: Skip(30).Take(10)  = items 31-40  (10 items)
Page 5: Skip(40).Take(10)  = items 41-47  (7 items)

Total pages = ⌈47 / 10⌉ = 5
```
x??

---

## Modifying Data

#### Change Tracking
EF Core tracks changes to entities automatically. When you modify properties on a tracked entity and call SaveChangesAsync(), EF Core generates UPDATE statements only for modified properties.

```csharp
// Load entity (becomes tracked)
var todo = await _context.TodoItems.FindAsync(5);

// Modify properties
todo.Title = "Updated title";
todo.IsCompleted = true;

// EF Core detected changes
await _context.SaveChangesAsync();

// SQL: UPDATE TodoItems
// SET Title = 'Updated title', IsCompleted = true
// WHERE Id = 5
```

:p How does Entity Framework Core's change tracking work?
??x
**Change tracking = EF Core monitors entity modifications**

**Tracked vs Untracked:**

**Tracked entities:**
```csharp
// Load from database - automatically tracked
var todo = await _context.TodoItems.FindAsync(5);

// EF Core now watches this entity
// Stores original values
// Detects property changes
```

**How tracking works:**

**1. Load entity:**
```csharp
var todo = await _context.TodoItems.FindAsync(5);

// EF Core stores:
// - Original: { Id: 5, Title: "Old", IsCompleted: false }
// - Current:  { Id: 5, Title: "Old", IsCompleted: false }
// - State: Unchanged
```

**2. Modify properties:**
```csharp
todo.Title = "New title";
todo.IsCompleted = true;

// EF Core detects change:
// - Original: { Id: 5, Title: "Old", IsCompleted: false }
// - Current:  { Id: 5, Title: "New title", IsCompleted: true }
// - State: Modified
```

**3. Save changes:**
```csharp
await _context.SaveChangesAsync();

// EF Core:
// 1. Detects modified properties
// 2. Generates SQL with ONLY changed columns
// SQL: UPDATE TodoItems
//      SET Title = 'New title', IsCompleted = true
//      WHERE Id = 5
```

**Untracked entities:**
```csharp
// Query with AsNoTracking - NOT tracked
var todo = await _context.TodoItems
    .AsNoTracking()
    .FirstAsync(t => t.Id == 5);

// Modify (EF Core doesn't see it)
todo.Title = "New";

// SaveChanges does NOTHING
await _context.SaveChangesAsync();
```

**Manual state management:**
```csharp
// Tell EF Core entity is modified
_context.Entry(todo).State = EntityState.Modified;

// Or specific properties
_context.Entry(todo).Property(t => t.Title).IsModified = true;

await _context.SaveChangesAsync();
```

**Entity states:**
```csharp
EntityState.Unchanged  // No changes detected
EntityState.Added      // New entity, will INSERT
EntityState.Modified   // Changed entity, will UPDATE
EntityState.Deleted    // Removed entity, will DELETE
EntityState.Detached   // Not tracked
```

**Performance tip:**
```csharp
// Read-only queries - disable tracking
var todos = await _context.TodoItems
    .AsNoTracking()
    .ToListAsync();

// Faster: No change tracking overhead
// Use for: Reports, read-only APIs, large queries
```

**Tracking example:**
```csharp
// Load and modify (tracked)
var todo = await _context.TodoItems.FindAsync(5);
todo.Title = "Updated";

// Check if modified
var entry = _context.Entry(todo);
bool isModified = entry.State == EntityState.Modified;

// See what changed
var modifiedProps = entry.Properties
    .Where(p => p.IsModified)
    .Select(p => p.Metadata.Name);

await _context.SaveChangesAsync();
```
x??

---

#### Add, Update, Delete Operations
Adding creates new records with Add(), updating modifies existing records by loading then changing properties, and deleting removes records with Remove(). All operations require SaveChangesAsync() to persist changes.

```csharp
// Add
_context.TodoItems.Add(newTodo);
await _context.SaveChangesAsync();  // INSERT

// Update (load-modify pattern)
var todo = await _context.TodoItems.FindAsync(id);
todo.Title = "Updated";
await _context.SaveChangesAsync();  // UPDATE

// Delete
_context.TodoItems.Remove(todo);
await _context.SaveChangesAsync();  // DELETE
```

:p What are the three main operations for modifying data in EF Core?
??x
**Three core operations:**

**1. ADD - Create new records**
```csharp
[HttpPost]
public async Task<ActionResult<TodoItem>> Create(TodoItem todo)
{
    // 1. Create entity
    var newTodo = new TodoItem {
        Title = "Learn EF Core",
        IsCompleted = false,
        CreatedAt = DateTime.UtcNow
    };

    // 2. Add to DbSet (state = Added)
    _context.TodoItems.Add(newTodo);

    // 3. Save to database
    await _context.SaveChangesAsync();

    // SQL: INSERT INTO TodoItems (Title, IsCompleted, CreatedAt)
    //      VALUES ('Learn EF Core', false, '2025-10-29')

    // 4. newTodo.Id is now populated with database-generated value
    return CreatedAtAction(nameof(Get), new { id = newTodo.Id }, newTodo);
}
```

**2. UPDATE - Modify existing records**

**Pattern A: Load-Modify (recommended)**
```csharp
[HttpPut("{id}")]
public async Task<IActionResult> Update(int id, UpdateTodoDto dto)
{
    // 1. Load from database (tracked)
    var todo = await _context.TodoItems.FindAsync(id);
    if (todo == null) return NotFound();

    // 2. Modify properties
    todo.Title = dto.Title;
    todo.IsCompleted = dto.IsCompleted;
    if (dto.IsCompleted)
        todo.CompletedAt = DateTime.UtcNow;

    // 3. Save (EF Core detects changes)
    await _context.SaveChangesAsync();

    // SQL: UPDATE TodoItems
    //      SET Title = '...', IsCompleted = true, CompletedAt = '...'
    //      WHERE Id = 5

    return NoContent();
}
```

**Pattern B: Explicit state (for disconnected scenarios)**
```csharp
[HttpPut("{id}")]
public async Task<IActionResult> Update(int id, TodoItem todo)
{
    if (id != todo.Id) return BadRequest();

    // Mark entire entity as modified
    _context.Entry(todo).State = EntityState.Modified;

    try {
        await _context.SaveChangesAsync();
    }
    catch (DbUpdateConcurrencyException) {
        if (!TodoExists(id)) return NotFound();
        throw;
    }

    return NoContent();
}
```

**3. DELETE - Remove records**
```csharp
[HttpDelete("{id}")]
public async Task<IActionResult> Delete(int id)
{
    // 1. Find entity
    var todo = await _context.TodoItems.FindAsync(id);
    if (todo == null) return NotFound();

    // 2. Mark for deletion
    _context.TodoItems.Remove(todo);

    // 3. Execute DELETE
    await _context.SaveChangesAsync();

    // SQL: DELETE FROM TodoItems WHERE Id = 5

    return NoContent();
}
```

**Batch operations:**
```csharp
// Add multiple
_context.TodoItems.AddRange(listOfTodos);

// Remove multiple
_context.TodoItems.RemoveRange(todosToDelete);

// Single SaveChanges for all
await _context.SaveChangesAsync();
```

**Important:** SaveChangesAsync() wraps everything in a transaction. All changes succeed or all fail together.
x??

---

## Configuration

#### DbContext Registration
The DbContext must be registered in dependency injection with a database provider. This is done in Program.cs using AddDbContext() and specifying the connection string.

```csharp
// Program.cs
var connectionString = "Host=server;Database=db;...";

builder.Services.AddDbContext<TodoContext>(options =>
    options.UseNpgsql(connectionString));

// Now TodoContext can be injected into controllers
public TodoController(TodoContext context) {
    _context = context;
}
```

:p How do you register a DbContext with dependency injection in ASP.NET Core?
??x
**DbContext registration in Program.cs:**

**Basic registration:**
```csharp
var builder = WebApplication.CreateBuilder(args);

// Register DbContext
builder.Services.AddDbContext<TodoContext>(options =>
    options.UseNpgsql(connectionString));

// ServiceLifetime: Scoped (default)
// - New instance per HTTP request
// - Shared within same request
// - Disposed after request
```

**Connection string sources:**

**1. Hardcoded (development only):**
```csharp
var connectionString = "Host=localhost;Database=mydb;Username=user;Password=pass";
builder.Services.AddDbContext<TodoContext>(options =>
    options.UseNpgsql(connectionString));
```

**2. From appsettings.json (recommended):**
```json
// appsettings.json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=mydb;..."
  }
}
```

```csharp
// Program.cs
var connectionString = builder.Configuration
    .GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<TodoContext>(options =>
    options.UseNpgsql(connectionString));
```

**3. From environment variable (production):**
```csharp
var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION")
    ?? builder.Configuration.GetConnectionString("DefaultConnection");
```

**Database providers:**
```csharp
// PostgreSQL
options.UseNpgsql(connectionString)

// SQL Server
options.UseSqlServer(connectionString)

// SQLite
options.UseSqlite(connectionString)

// MySQL
options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))

// In-Memory (testing)
options.UseInMemoryDatabase("TestDb")
```

**Additional options:**
```csharp
builder.Services.AddDbContext<TodoContext>(options =>
{
    options.UseNpgsql(connectionString);

    // Enable detailed errors (development only)
    options.EnableSensitiveDataLogging();
    options.EnableDetailedErrors();

    // Log queries to console
    options.LogTo(Console.WriteLine, LogLevel.Information);
});
```

**Usage in controller:**
```csharp
[ApiController]
[Route("api/[controller]")]
public class TodoController : ControllerBase
{
    private readonly TodoContext _context;

    // Constructor injection
    public TodoController(TodoContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<TodoItem>>> GetAll()
    {
        return await _context.TodoItems.ToListAsync();
    }
}
```

**Lifetime:** Scoped means one DbContext per HTTP request, automatically disposed after request completes. Don't make it Singleton (causes issues) or Transient (wasteful).
x??

---

## Performance

#### AsNoTracking for Read-Only Queries
By default, EF Core tracks all queried entities for change detection. For read-only queries, use AsNoTracking() to skip tracking and improve performance.

```csharp
// With tracking (default) - slower
var todos = await _context.TodoItems.ToListAsync();

// Without tracking - faster for read-only
var todos = await _context.TodoItems
    .AsNoTracking()
    .ToListAsync();

// Use AsNoTracking for:
// - Reports
// - API GET endpoints
// - Any read-only scenario
```

:p What is AsNoTracking() and when should you use it?
??x
**AsNoTracking() disables change tracking for queries**

**Performance comparison:**
```csharp
// WITH tracking (default)
var todos = await _context.TodoItems.ToListAsync();

// EF Core:
// 1. Queries database
// 2. Creates entities
// 3. Stores original values
// 4. Monitors for changes
// 5. Maintains identity map
// Memory: Higher
// Speed: Slower

// WITHOUT tracking
var todos = await _context.TodoItems
    .AsNoTracking()
    .ToListAsync();

// EF Core:
// 1. Queries database
// 2. Creates entities
// 3. Returns immediately
// Memory: Lower (no tracking overhead)
// Speed: Faster (20-30% typically)
```

**When to use:**

**AsNoTracking() ✓ (read-only):**
```csharp
// API GET endpoints
[HttpGet]
public async Task<List<TodoItem>> GetAll()
{
    return await _context.TodoItems
        .AsNoTracking()
        .ToListAsync();
}

// Reports
var report = await _context.TodoItems
    .AsNoTracking()
    .Select(t => new { t.Title, t.IsCompleted })
    .ToListAsync();

// Large queries
var allTodos = await _context.TodoItems
    .AsNoTracking()
    .ToListAsync();
```

**Tracking ✓ (need to modify):**
```csharp
// Update operation
var todo = await _context.TodoItems.FindAsync(id);
todo.Title = "Updated";  // Need tracking to detect this
await _context.SaveChangesAsync();

// Delete operation
var todo = await _context.TodoItems.FindAsync(id);
_context.TodoItems.Remove(todo);
await _context.SaveChangesAsync();
```

**Performance impact example:**
```
Query 1000 records:
- With tracking:    150ms, 25MB memory
- Without tracking: 100ms, 15MB memory
- Improvement:      ~33% faster, 40% less memory
```

**Global configuration (all queries no-tracking by default):**
```csharp
builder.Services.AddDbContext<TodoContext>(options =>
{
    options.UseNpgsql(connectionString);
    options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
});

// Then opt-in to tracking when needed:
var todo = await _context.TodoItems
    .AsTracking()
    .FirstAsync(t => t.Id == id);
```

**Identity map with tracking:**
```csharp
// With tracking - same instance
var todo1 = await _context.TodoItems.FindAsync(5);
var todo2 = await _context.TodoItems.FindAsync(5);
// todo1 == todo2 (same reference)

// Without tracking - different instances
var todo1 = await _context.TodoItems
    .AsNoTracking()
    .FirstAsync(t => t.Id == 5);
var todo2 = await _context.TodoItems
    .AsNoTracking()
    .FirstAsync(t => t.Id == 5);
// todo1 != todo2 (different references)
```
x??
