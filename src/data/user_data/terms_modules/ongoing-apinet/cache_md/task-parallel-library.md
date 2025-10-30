# Task Parallel Library (TPL) in .NET

## What is Task Parallel Library?

The **Task Parallel Library (TPL)** is a set of APIs in .NET that makes it easier to write parallel and concurrent code. It helps you:
- Run multiple operations at the same time
- Utilize multiple CPU cores
- Improve application performance

## Why Use Parallel Programming?

**Sequential (one at a time):**
```
Task 1 → Task 2 → Task 3 → Task 4  (Total: 400ms)
100ms    100ms    100ms    100ms
```

**Parallel (simultaneously):**
```
Task 1 ↓
Task 2 ↓  (Total: ~100ms)
Task 3 ↓
Task 4 ↓
```

## Core Concepts

### Task vs Thread
- **Thread**: Low-level, you manage everything
- **Task**: High-level abstraction, managed by TPL
- **Recommendation**: Use Task (easier, better performance)

## TPL Patterns in the Demo Controller

### 1. Parallel.ForEach - Process Collection in Parallel

**Endpoint:** `GET /api/paralleldemo/parallel-foreach`

```csharp
var todos = await _context.TodoItems.Take(10).ToListAsync();
var results = new List<string>();
var lockObject = new object();

// Process items in parallel
Parallel.ForEach(todos, todo =>
{
    // This code runs in parallel on different threads
    Thread.Sleep(100); // Simulate work

    // Need lock for thread-safe operations
    lock (lockObject)
    {
        results.Add($"Processed: {todo.Title}");
    }
});
```

**When to use:**
- CPU-intensive operations on a collection
- Each item can be processed independently
- Order doesn't matter

**Test it:**
```bash
curl https://apinet.n.l0l.in/api/paralleldemo/parallel-foreach
```

### 2. Task.WhenAll - Wait for Multiple Tasks

**Endpoint:** `GET /api/paralleldemo/task-whenall`

```csharp
// Start multiple independent tasks
var task1 = GetTodoCountAsync();
var task2 = GetCompletedCountAsync();
var task3 = GetActiveCountAsync();

// Wait for ALL tasks to complete
await Task.WhenAll(task1, task2, task3);

// Now access results
var totalCount = task1.Result;
var completedCount = task2.Result;
var activeCount = task3.Result;
```

**When to use:**
- Multiple independent async operations
- Need all results before continuing
- Database queries, API calls, file I/O

**Test it:**
```bash
curl https://apinet.n.l0l.in/api/paralleldemo/task-whenall
```

**Key Point:**
```csharp
// ❌ Sequential - takes 300ms total
var count1 = await GetCount1Async(); // 100ms
var count2 = await GetCount2Async(); // 100ms
var count3 = await GetCount3Async(); // 100ms

// ✅ Parallel - takes ~100ms total
var task1 = GetCount1Async();
var task2 = GetCount2Async();
var task3 = GetCount3Async();
await Task.WhenAll(task1, task2, task3);
```

### 3. Task.WhenAny - First to Complete Wins

**Endpoint:** `GET /api/paralleldemo/task-whenany`

```csharp
var task1 = SimulateSlowOperationAsync("Database", 1000);
var task2 = SimulateSlowOperationAsync("Cache", 500);
var task3 = SimulateSlowOperationAsync("API", 2000);

// Wait for FIRST task to complete
var completedTask = await Task.WhenAny(task1, task2, task3);
var result = await completedTask;
// Result from Cache (500ms) - fastest!
```

**When to use:**
- Timeout scenarios
- Redundant operations (first response wins)
- Race conditions (first available resource)

**Test it:**
```bash
curl https://apinet.n.l0l.in/api/paralleldemo/task-whenany
```

### 4. Parallel Options - Control Parallelism

**Endpoint:** `GET /api/paralleldemo/parallel-batch`

```csharp
var parallelOptions = new ParallelOptions
{
    MaxDegreeOfParallelism = 3  // Max 3 tasks at once
};

Parallel.ForEach(todos, parallelOptions, todo =>
{
    // Process todo
});
```

**When to use:**
- Limit resource usage (database connections, API rate limits)
- Prevent overwhelming external services
- Control CPU usage

**Test it:**
```bash
curl https://apinet.n.l0l.in/api/paralleldemo/parallel-batch
```

### 5. PLINQ - Parallel LINQ

**Endpoint:** `GET /api/paralleldemo/plinq`

```csharp
var results = todos
    .AsParallel()                      // Enable parallel processing
    .WithDegreeOfParallelism(4)       // Use 4 threads
    .Where(t => t.Title.Length > 3)   // Filter
    .Select(t => new                   // Transform
    {
        t.Title,
        Length = t.Title.Length
    })
    .ToList();
```

**When to use:**
- LINQ queries on large collections
- CPU-intensive transformations
- Data processing pipelines

**Test it:**
```bash
curl https://apinet.n.l0l.in/api/paralleldemo/plinq
```

### 6. SemaphoreSlim - Throttle Concurrency

**Endpoint:** `GET /api/paralleldemo/semaphore-throttle`

```csharp
// Allow max 3 concurrent operations
using var semaphore = new SemaphoreSlim(3);
var tasks = new List<Task<string>>();

foreach (var todo in todos)
{
    tasks.Add(ProcessWithThrottleAsync(todo, semaphore));
}

var results = await Task.WhenAll(tasks);

// Helper method
private async Task<string> ProcessWithThrottleAsync(TodoItem todo, SemaphoreSlim semaphore)
{
    await semaphore.WaitAsync();  // Wait for slot
    try
    {
        await Task.Delay(500);  // Do work
        return $"Processed: {todo.Title}";
    }
    finally
    {
        semaphore.Release();  // Release slot
    }
}
```

**When to use:**
- Rate limiting API calls
- Database connection pooling
- Resource throttling

**Test it:**
```bash
curl https://apinet.n.l0l.in/api/paralleldemo/semaphore-throttle
```

### 7. Compare Sequential vs Parallel

**Endpoint:** `GET /api/paralleldemo/compare-performance`

See the performance difference between sequential and parallel processing!

**Test it:**
```bash
curl https://apinet.n.l0l.in/api/paralleldemo/compare-performance
```

## Thread Safety

When multiple threads access shared data, you need synchronization:

### Using lock

```csharp
private readonly object _lockObject = new object();
private List<string> _results = new List<string>();

Parallel.ForEach(items, item =>
{
    var result = ProcessItem(item);

    lock (_lockObject)
    {
        _results.Add(result);  // Thread-safe
    }
});
```

### Using ConcurrentBag (Thread-Safe Collection)

```csharp
using System.Collections.Concurrent;

var results = new ConcurrentBag<string>();

Parallel.ForEach(items, item =>
{
    var result = ProcessItem(item);
    results.Add(result);  // No lock needed - already thread-safe
});
```

### Thread-Safe Collections

```csharp
ConcurrentBag<T>        // Unordered collection
ConcurrentQueue<T>      // FIFO queue
ConcurrentStack<T>      // LIFO stack
ConcurrentDictionary<K,V>  // Thread-safe dictionary
```

## Common Patterns

### Pattern 1: Parallel Data Processing

```csharp
var items = await GetLargeDataSetAsync();

var results = new ConcurrentBag<ProcessedItem>();

Parallel.ForEach(items, new ParallelOptions { MaxDegreeOfParallelism = 4 }, item =>
{
    var processed = ProcessItem(item);
    results.Add(processed);
});
```

### Pattern 2: Multiple Independent API Calls

```csharp
var userTask = _httpClient.GetAsync("/api/user");
var ordersTask = _httpClient.GetAsync("/api/orders");
var productsTask = _httpClient.GetAsync("/api/products");

await Task.WhenAll(userTask, ordersTask, productsTask);

var user = await userTask.Result.Content.ReadAsAsync<User>();
var orders = await ordersTask.Result.Content.ReadAsAsync<Order[]>();
var products = await productsTask.Result.Content.ReadAsAsync<Product[]>();
```

### Pattern 3: Timeout with WhenAny

```csharp
var operationTask = LongRunningOperationAsync();
var timeoutTask = Task.Delay(TimeSpan.FromSeconds(5));

var completedTask = await Task.WhenAny(operationTask, timeoutTask);

if (completedTask == timeoutTask)
{
    throw new TimeoutException("Operation timed out");
}

return await operationTask;
```

### Pattern 4: Retry with Delay

```csharp
async Task<T> RetryAsync<T>(Func<Task<T>> operation, int maxRetries = 3)
{
    for (int i = 0; i < maxRetries; i++)
    {
        try
        {
            return await operation();
        }
        catch (Exception ex) when (i < maxRetries - 1)
        {
            await Task.Delay(TimeSpan.FromSeconds(Math.Pow(2, i))); // Exponential backoff
        }
    }
    throw new Exception("Max retries exceeded");
}
```

## Best Practices

### ✅ Do's

1. **Use async/await for I/O operations**
   ```csharp
   var data = await _httpClient.GetStringAsync(url);
   ```

2. **Use Task.WhenAll for independent operations**
   ```csharp
   await Task.WhenAll(task1, task2, task3);
   ```

3. **Use ParallelOptions to limit parallelism**
   ```csharp
   Parallel.ForEach(items, new ParallelOptions { MaxDegreeOfParallelism = 4 }, ...);
   ```

4. **Use thread-safe collections**
   ```csharp
   var results = new ConcurrentBag<string>();
   ```

### ❌ Don'ts

1. **Don't use Task.Run for async I/O**
   ```csharp
   // ❌ Bad
   await Task.Run(async () => await _context.TodoItems.ToListAsync());

   // ✅ Good
   await _context.TodoItems.ToListAsync();
   ```

2. **Don't use .Result or .Wait() - causes deadlocks**
   ```csharp
   // ❌ Bad
   var result = SomeAsyncMethod().Result;

   // ✅ Good
   var result = await SomeAsyncMethod();
   ```

3. **Don't parallelize unless it helps**
   ```csharp
   // If you only have 3 items, parallel overhead may be worse than sequential
   ```

4. **Don't forget exception handling**
   ```csharp
   try
   {
       await Task.WhenAll(tasks);
   }
   catch (Exception ex)
   {
       // Handle errors from any task
   }
   ```

## When to Use Parallel vs Sequential

### Use Parallel When:
- ✅ CPU-intensive operations
- ✅ Processing large collections
- ✅ Independent operations
- ✅ Multiple I/O operations

### Use Sequential When:
- ✅ Operations depend on each other
- ✅ Small collections (overhead > benefit)
- ✅ Order matters
- ✅ Shared state without synchronization

## Testing the Demo API

Access Swagger UI at `https://apinet.n.l0l.in/` and try these endpoints:

1. `/api/paralleldemo/parallel-foreach` - See parallel collection processing
2. `/api/paralleldemo/task-whenall` - Multiple concurrent queries
3. `/api/paralleldemo/task-whenany` - Race between operations
4. `/api/paralleldemo/parallel-batch` - Controlled parallelism
5. `/api/paralleldemo/plinq` - Parallel LINQ queries
6. `/api/paralleldemo/semaphore-throttle` - Throttled async operations
7. `/api/paralleldemo/compare-performance` - Sequential vs Parallel comparison

## Common Mistakes

### Mistake 1: Sharing non-thread-safe state

```csharp
// ❌ Bad - List is not thread-safe
var results = new List<string>();
Parallel.ForEach(items, item =>
{
    results.Add(item); // Race condition!
});

// ✅ Good - Use lock
var results = new List<string>();
var lockObj = new object();
Parallel.ForEach(items, item =>
{
    lock (lockObj)
    {
        results.Add(item);
    }
});

// ✅ Better - Use thread-safe collection
var results = new ConcurrentBag<string>();
Parallel.ForEach(items, item =>
{
    results.Add(item);
});
```

### Mistake 2: Not limiting parallelism

```csharp
// ❌ Bad - Could spawn thousands of threads
Parallel.ForEach(millionsOfItems, item => Process(item));

// ✅ Good - Limit concurrent operations
Parallel.ForEach(millionsOfItems,
    new ParallelOptions { MaxDegreeOfParallelism = 4 },
    item => Process(item));
```

### Mistake 3: Using Parallel for async operations

```csharp
// ❌ Bad - Parallel.ForEach doesn't understand async
Parallel.ForEach(items, async item =>
{
    await ProcessAsync(item); // Won't work as expected
});

// ✅ Good - Use Task.WhenAll
var tasks = items.Select(item => ProcessAsync(item));
await Task.WhenAll(tasks);
```

## Next Steps

- Practice with the demo endpoints
- Read `docs/async-await-patterns.md` for more async patterns
- Try implementing your own parallel operations
- Monitor performance differences

## Official Resources

- [Task Parallel Library (TPL)](https://docs.microsoft.com/en-us/dotnet/standard/parallel-programming/task-parallel-library-tpl)
- [Parallel Programming in .NET](https://docs.microsoft.com/en-us/dotnet/standard/parallel-programming/)
- [Task-based Asynchronous Pattern](https://docs.microsoft.com/en-us/dotnet/standard/asynchronous-programming-patterns/task-based-asynchronous-pattern-tap)
