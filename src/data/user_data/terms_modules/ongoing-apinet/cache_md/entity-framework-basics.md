# Entity Framework Core Basics

## What is Entity Framework Core (EF Core)?

**Entity Framework Core** is an Object-Relational Mapper (ORM) that lets you work with databases using C# objects instead of writing SQL.

Instead of this SQL:
```sql
SELECT * FROM TodoItems WHERE IsCompleted = false;
```

You write this C#:
```csharp
var todos = await _context.TodoItems
    .Where(t => !t.IsCompleted)
    .ToListAsync();
```

## Key Concepts

### 1. Entity (Model)
A C# class that represents a database table.

```csharp
// TodoItem.cs - Maps to "TodoItems" table
public class TodoItem
{
    public int Id { get; set; }              // Primary key
    public string Title { get; set; }        // Required column
    public string? Description { get; set; } // Nullable column
    public bool IsCompleted { get; set; }    // Boolean column
    public DateTime CreatedAt { get; set; }  // Timestamp column
}
```

### 2. DbContext
The "bridge" between your C# code and the database.

```csharp
// TodoContext.cs
public class TodoContext : DbContext
{
    public TodoContext(DbContextOptions<TodoContext> options) : base(options)
    {
    }

    // DbSet represents a table
    public DbSet<TodoItem> TodoItems { get; set; }

    // Configure how entities map to tables
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Define table structure and constraints
    }
}
```

### 3. DbSet<T>
Represents a table in the database. Used to query and save data.

```csharp
// _context.TodoItems is a DbSet<TodoItem>
var allTodos = await _context.TodoItems.ToListAsync();
```

## Querying Data

### Get All Records

```csharp
// SQL: SELECT * FROM TodoItems
var allTodos = await _context.TodoItems.ToListAsync();
```

### Get Single Record

```csharp
// SQL: SELECT * FROM TodoItems WHERE Id = 5
var todo = await _context.TodoItems.FindAsync(5);

// Alternative (more flexible)
var todo = await _context.TodoItems
    .FirstOrDefaultAsync(t => t.Id == 5);
```

### Filtering (Where)

```csharp
// SQL: SELECT * FROM TodoItems WHERE IsCompleted = false
var activeTodos = await _context.TodoItems
    .Where(t => !t.IsCompleted)
    .ToListAsync();

// Multiple conditions
var recentActive = await _context.TodoItems
    .Where(t => !t.IsCompleted && t.CreatedAt > DateTime.UtcNow.AddDays(-7))
    .ToListAsync();
```

### Ordering

```csharp
// SQL: SELECT * FROM TodoItems ORDER BY CreatedAt DESC
var recentFirst = await _context.TodoItems
    .OrderByDescending(t => t.CreatedAt)
    .ToListAsync();

// Multiple sort criteria
var sorted = await _context.TodoItems
    .OrderBy(t => t.IsCompleted)
    .ThenByDescending(t => t.CreatedAt)
    .ToListAsync();
```

### Selecting Specific Columns

```csharp
// SQL: SELECT Title FROM TodoItems
var titles = await _context.TodoItems
    .Select(t => t.Title)
    .ToListAsync();

// Anonymous object
var summary = await _context.TodoItems
    .Select(t => new { t.Id, t.Title, t.IsCompleted })
    .ToListAsync();
```

### Pagination

```csharp
// SQL: SELECT * FROM TodoItems LIMIT 10 OFFSET 20
var page = await _context.TodoItems
    .Skip(20)  // Skip first 20
    .Take(10)  // Take next 10
    .ToListAsync();

// Page 3 with 10 items per page
int pageNumber = 3;
int pageSize = 10;
var todos = await _context.TodoItems
    .Skip((pageNumber - 1) * pageSize)
    .Take(pageSize)
    .ToListAsync();
```

### Counting

```csharp
// SQL: SELECT COUNT(*) FROM TodoItems
var total = await _context.TodoItems.CountAsync();

// With condition
var activeCount = await _context.TodoItems
    .Where(t => !t.IsCompleted)
    .CountAsync();
```

### Checking Existence

```csharp
// SQL: SELECT CASE WHEN EXISTS(SELECT 1 FROM TodoItems WHERE Id = 5) THEN 1 ELSE 0 END
var exists = await _context.TodoItems.AnyAsync(t => t.Id == 5);
```

## Modifying Data

### Adding Records

```csharp
[HttpPost]
public async Task<ActionResult<TodoItem>> CreateTodoItem(TodoItem todoItem)
{
    // 1. Add to change tracker (not yet in database)
    _context.TodoItems.Add(todoItem);

    // 2. Save changes to database (SQL INSERT is executed here)
    await _context.SaveChangesAsync();

    // 3. todoItem.Id is now populated with the database-generated value
    return CreatedAtAction(nameof(GetTodoItem), new { id = todoItem.Id }, todoItem);
}
```

**What happens:**
1. `Add()` tells EF Core to track this entity as "Added"
2. `SaveChangesAsync()` generates and executes: `INSERT INTO TodoItems (...) VALUES (...)`
3. Database generates the Id and EF Core updates the object

### Updating Records

```csharp
[HttpPut("{id}")]
public async Task<IActionResult> UpdateTodoItem(int id, TodoItem todoItem)
{
    if (id != todoItem.Id)
        return BadRequest();

    // Mark the entity as modified
    _context.Entry(todoItem).State = EntityState.Modified;

    try
    {
        // SQL: UPDATE TodoItems SET ... WHERE Id = @id
        await _context.SaveChangesAsync();
    }
    catch (DbUpdateConcurrencyException)
    {
        if (!TodoItemExists(id))
            return NotFound();
        throw;
    }

    return NoContent();
}
```

**Alternative: Load then modify**
```csharp
// 1. Load from database
var todo = await _context.TodoItems.FindAsync(id);
if (todo == null) return NotFound();

// 2. Modify properties (EF Core tracks changes automatically)
todo.Title = "Updated title";
todo.IsCompleted = true;
todo.CompletedAt = DateTime.UtcNow;

// 3. Save (only modified properties are updated)
await _context.SaveChangesAsync();
```

### Deleting Records

```csharp
[HttpDelete("{id}")]
public async Task<IActionResult> DeleteTodoItem(int id)
{
    // 1. Find the entity
    var todoItem = await _context.TodoItems.FindAsync(id);
    if (todoItem == null)
        return NotFound();

    // 2. Mark for deletion
    _context.TodoItems.Remove(todoItem);

    // 3. Execute SQL: DELETE FROM TodoItems WHERE Id = @id
    await _context.SaveChangesAsync();

    return NoContent();
}
```

## Configuring Entities

### Using OnModelCreating

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    base.OnModelCreating(modelBuilder);

    modelBuilder.Entity<TodoItem>(entity =>
    {
        // Primary key
        entity.HasKey(e => e.Id);

        // Required field with max length
        entity.Property(e => e.Title)
            .IsRequired()
            .HasMaxLength(200);

        // Optional field with max length
        entity.Property(e => e.Description)
            .HasMaxLength(1000);

        // Default value
        entity.Property(e => e.IsCompleted)
            .HasDefaultValue(false);

        // Database-generated default (PostgreSQL function)
        entity.Property(e => e.CreatedAt)
            .HasDefaultValueSql("NOW()");
    });
}
```

### Using Data Annotations (Alternative)

```csharp
public class TodoItem
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(1000)]
    public string? Description { get; set; }

    public bool IsCompleted { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
```

## Database Connection

### Registering DbContext in Program.cs

```csharp
// Configure PostgreSQL connection
var connectionString = "Host=143.198.247.248;Port=5432;Database=postgres;Username=postgres;Password=423825f574901021";

builder.Services.AddDbContext<TodoContext>(options =>
    options.UseNpgsql(connectionString));
```

### Connection String Format

```
Host=server;Port=5432;Database=dbname;Username=user;Password=pass

// With additional options
Host=server;Port=5432;Database=dbname;Username=user;Password=pass;Pooling=true;Timeout=30
```

### Using Configuration (Recommended)

In `appsettings.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=143.198.247.248;Port=5432;..."
  }
}
```

In `Program.cs`:
```csharp
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<TodoContext>(options =>
    options.UseNpgsql(connectionString));
```

## Database Initialization

### Using EnsureCreated() (Current Approach)

```csharp
// In Program.cs
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<TodoContext>();
    db.Database.EnsureCreated();  // Creates database if it doesn't exist
}
```

**Pros:**
- Simple, no migration files
- Good for prototyping

**Cons:**
- Can't evolve schema (must recreate database)
- Not suitable for production

### Using Migrations (Recommended for Production)

```bash
# Create initial migration
dotnet ef migrations add InitialCreate

# Apply to database
dotnet ef database update
```

```csharp
// In Program.cs - replace EnsureCreated with:
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<TodoContext>();
    db.Database.Migrate();  // Applies pending migrations
}
```

## Common Patterns in This Project

### Check if Entity Exists

```csharp
private bool TodoItemExists(int id)
{
    return _context.TodoItems.Any(e => e.Id == id);
}
```

### Load and Check for Null

```csharp
var todoItem = await _context.TodoItems.FindAsync(id);
if (todoItem == null)
{
    return NotFound();
}
// Use todoItem...
```

### Track Changes Explicitly

```csharp
_context.Entry(todoItem).State = EntityState.Modified;
await _context.SaveChangesAsync();
```

## Async vs Sync

Always use async methods in ASP.NET Core:

❌ **Synchronous (blocks thread)**
```csharp
var todos = _context.TodoItems.ToList();
_context.SaveChanges();
```

✅ **Asynchronous (non-blocking)**
```csharp
var todos = await _context.TodoItems.ToListAsync();
await _context.SaveChangesAsync();
```

## Performance Tips

### 1. Use AsNoTracking for Read-Only Queries

```csharp
// Faster - doesn't track changes
var todos = await _context.TodoItems
    .AsNoTracking()
    .ToListAsync();
```

### 2. Select Only What You Need

```csharp
// Don't load entire entity if you only need a few fields
var titles = await _context.TodoItems
    .Select(t => t.Title)
    .ToListAsync();
```

### 3. Use Pagination

```csharp
// Don't load thousands of records at once
var page = await _context.TodoItems
    .Skip(skip)
    .Take(pageSize)
    .ToListAsync();
```

### 4. Avoid N+1 Queries (use Include for related data)

```csharp
// If TodoItem had a User relationship:
var todos = await _context.TodoItems
    .Include(t => t.User)  // Load related User in same query
    .ToListAsync();
```

## Common Errors and Solutions

### Error: "No database provider configured"
**Solution:** Register DbContext with database provider in Program.cs
```csharp
builder.Services.AddDbContext<TodoContext>(options =>
    options.UseNpgsql(connectionString));
```

### Error: "A second operation started on this context"
**Solution:** Don't run multiple operations in parallel on same context
```csharp
// Wrong
var task1 = _context.TodoItems.ToListAsync();
var task2 = _context.TodoItems.CountAsync();
await Task.WhenAll(task1, task2);

// Right - do one at a time, or use separate contexts
var todos = await _context.TodoItems.ToListAsync();
var count = await _context.TodoItems.CountAsync();
```

### Error: "Sequence contains no elements"
**Solution:** Use `FirstOrDefaultAsync` instead of `FirstAsync`
```csharp
var todo = await _context.TodoItems.FirstOrDefaultAsync(t => t.Id == id);
if (todo == null) return NotFound();
```

## Next Steps

- Read `docs/async-await-patterns.md` to understand async/await better
- Read `docs/linq-basics.md` for more query examples
- Try adding relationships (one-to-many, many-to-many)

## Official Resources

- [Entity Framework Core Documentation](https://docs.microsoft.com/en-us/ef/core/)
- [Querying Data](https://docs.microsoft.com/en-us/ef/core/querying/)
- [Saving Data](https://docs.microsoft.com/en-us/ef/core/saving/)
- [PostgreSQL Provider](https://www.npgsql.org/efcore/)
