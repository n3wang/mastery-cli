# Task Parallel Library Flashcards

## Core Concepts

#### Task vs Thread
Threads are low-level OS constructs that you manage manually. Tasks are high-level abstractions managed by the Task Parallel Library (TPL), which provides better performance through thread pooling and work stealing algorithms.

```csharp
// Thread (old way) - manual management
var thread = new Thread(() => DoWork());
thread.Start();
thread.Join();  // Wait for completion

// Task (modern way) - automatic management
var task = Task.Run(() => DoWork());
await task;  // Wait for completion
```

:p What is the difference between a Thread and a Task in .NET?
??x
**Thread vs Task comparison:**

**Thread (low-level):**
```csharp
// Manual thread management
var thread = new Thread(() => {
    // Work here
});
thread.Start();
thread.Join();  // Block until complete

// Characteristics:
- OS-level construct
- Heavy (1MB stack per thread)
- Manual lifecycle management
- No return value support
- No exception propagation
```

**Task (high-level):**
```csharp
// TPL managed
var task = Task.Run(() => {
    // Work here
    return result;
});
var result = await task;

// Characteristics:
- Abstraction over threads
- Lightweight (uses thread pool)
- Automatic management
- Return value support
- Exception propagation
- Composable (Task.WhenAll, etc.)
```

**Performance difference:**

**Threads:**
```
Create 1000 threads:
- Memory: ~1 GB (1MB each)
- Creation time: ~100ms
- Context switches: High overhead
```

**Tasks:**
```
Create 1000 tasks:
- Memory: ~100 MB (reuses thread pool)
- Creation time: ~10ms
- Context switches: Optimized by TPL
```

**Thread pool:**
```csharp
// TPL uses thread pool automatically
Task.Run(() => Work());  // Uses pool thread

// Thread pool advantages:
1. Reuses threads (no creation cost)
2. Limits concurrent threads (prevents overload)
3. Work stealing (load balancing)
4. Automatic scaling
```

**When to use:**

**Tasks (99% of cases):**
```csharp
// I/O operations
await httpClient.GetAsync(url);

// CPU-bound work
var result = await Task.Run(() => HeavyComputation());

// Parallel operations
await Task.WhenAll(task1, task2, task3);
```

**Threads (rare):**
```csharp
// Long-running background work
// Custom thread configuration
// Specific thread apartment state
```

**Recommendation:** Always use Tasks unless you have a specific reason to use Threads.
x??

---

#### Parallel vs Sequential Execution
Sequential execution processes items one at a time. Parallel execution processes multiple items simultaneously using available CPU cores.

```
Sequential (4 tasks × 100ms each = 400ms):
Task 1 → Task 2 → Task 3 → Task 4

Parallel (4 tasks on 4 cores = ~100ms):
Task 1 ↓
Task 2 ↓
Task 3 ↓
Task 4 ↓
```

:p What is the difference between sequential and parallel execution and when does parallelism help?
??x
**Sequential vs Parallel execution:**

**Sequential (one at a time):**
```csharp
var results = new List<string>();

foreach (var item in items)  // 10 items
{
    var result = ProcessItem(item);  // 100ms each
    results.Add(result);
}

// Total time: 10 × 100ms = 1000ms (1 second)
```

**Parallel (simultaneously):**
```csharp
var results = new ConcurrentBag<string>();

Parallel.ForEach(items, item =>  // 10 items
{
    var result = ProcessItem(item);  // 100ms each
    results.Add(result);
});

// On 4-core CPU: ~250ms (4x speedup)
// On 8-core CPU: ~125ms (8x speedup)
```

**Speedup calculation:**
```
Speedup = Sequential Time / Parallel Time

Example with 4 cores:
- Sequential: 1000ms
- Parallel:   250ms
- Speedup:    4x

Theoretical max speedup = Number of cores
```

**When parallelism helps:**

**✓ Good for parallelism (CPU-bound):**
```csharp
// Image processing
Parallel.ForEach(images, img => {
    Resize(img);      // CPU-intensive
    ApplyFilter(img); // CPU-intensive
});

// Data processing
Parallel.ForEach(records, record => {
    Compute Statistics(record);  // CPU-intensive
});

// Cryptography
Parallel.ForEach(passwords, pwd => {
    Hash(pwd);  // CPU-intensive
});
```

**✗ Doesn't help (I/O-bound):**
```csharp
// Database queries (limited by DB connections)
Parallel.ForEach(ids, id => {
    var data = await db.QueryAsync(id);  // I/O wait
});
// Use Task.WhenAll instead

// HTTP requests (limited by network)
Parallel.ForEach(urls, url => {
    var data = await http.GetAsync(url);  // I/O wait
});
// Use Task.WhenAll instead
```

**Overhead consideration:**
```csharp
// Small collection - overhead > benefit
var items = new[] { 1, 2, 3 };  // Only 3 items
Parallel.ForEach(items, ...);    // Slower than sequential

// Large collection - benefit > overhead
var items = Enumerable.Range(1, 10000);  // 10,000 items
Parallel.ForEach(items, ...);             // Much faster
```

**Amdahl's Law:**
```
Speedup = 1 / ((1 - P) + P/N)

P = Portion that can be parallelized
N = Number of processors

Example:
- 90% parallelizable (P=0.9)
- 4 cores (N=4)
- Speedup = 1 / ((1-0.9) + 0.9/4) = 3.08x
```

**Key insight:** Parallelism helps CPU-bound work that can be divided independently. Doesn't help I/O-bound work (use async instead).
x??

---

## Task Parallel Library Patterns

#### Parallel.ForEach Pattern
Parallel.ForEach processes collection items in parallel across multiple threads. Requires thread-safe operations for shared state.

```csharp
var results = new ConcurrentBag<string>();

Parallel.ForEach(items, item =>
{
    // This code runs on multiple threads simultaneously
    var result = ProcessItem(item);
    results.Add(result);  // Thread-safe collection
});
```

:p How does Parallel.ForEach work and what are the thread safety requirements?
??x
**Parallel.ForEach processes collections in parallel:**

**Basic usage:**
```csharp
Parallel.ForEach(collection, item =>
{
    // Process each item
    // This lambda runs on multiple threads
});
```

**Thread safety requirement:**
```csharp
// ❌ NOT thread-safe
var results = new List<string>();

Parallel.ForEach(items, item =>
{
    var result = Process(item);
    results.Add(result);  // RACE CONDITION!
    // Multiple threads modify List simultaneously
});

// ✅ Thread-safe with lock
var results = new List<string>();
var lockObj = new object();

Parallel.ForEach(items, item =>
{
    var result = Process(item);

    lock (lockObj)  // Only one thread at a time
    {
        results.Add(result);
    }
});

// ✅ Thread-safe with concurrent collection
var results = new ConcurrentBag<string>();

Parallel.ForEach(items, item =>
{
    var result = Process(item);
    results.Add(result);  // ConcurrentBag is thread-safe
});
```

**Controlling parallelism:**
```csharp
var options = new ParallelOptions
{
    MaxDegreeOfParallelism = 4  // Max 4 concurrent operations
};

Parallel.ForEach(items, options, item =>
{
    Process(item);
});

// Why limit parallelism:
// - Database connection limits
// - API rate limits
// - Memory constraints
// - External service limits
```

**Breaking out early:**
```csharp
Parallel.ForEach(items, (item, state) =>
{
    var result = Process(item);

    if (result == targetValue)
    {
        state.Break();  // Stop processing more items
        return;
    }
});
```

**When to use:**
```csharp
// ✓ CPU-bound operations on large collections
Parallel.ForEach(largeImageList, img => {
    ApplyFilter(img);  // CPU-intensive
});

// ✓ Independent operations
Parallel.ForEach(records, record => {
    ValidateRecord(record);  // No dependencies
});

// ✗ Small collections (overhead > benefit)
Parallel.ForEach(new[] {1, 2, 3}, ...);

// ✗ Sequential dependencies
Parallel.ForEach(items, item => {
    item.Result = previousItem.Result + 1;  // Depends on order!
});

// ✗ Async I/O operations
Parallel.ForEach(urls, async url => {
    await http.GetAsync(url);  // Use Task.WhenAll instead
});
```

**Performance example:**
```csharp
var items = Enumerable.Range(1, 1000).ToList();

// Sequential: ~10 seconds
foreach (var item in items) {
    Thread.Sleep(10);  // Simulate work
}

// Parallel on 4 cores: ~2.5 seconds
Parallel.ForEach(items, item => {
    Thread.Sleep(10);
});
```
x??

---

#### Task.WhenAll Pattern
Task.WhenAll starts multiple independent tasks concurrently and waits for all to complete. This is the primary pattern for parallel async I/O operations.

```csharp
// Start tasks (don't await yet)
var task1 = GetDataAsync();
var task2 = GetMoreDataAsync();
var task3 = GetOtherDataAsync();

// Wait for all to complete
await Task.WhenAll(task1, task2, task3);

// Now access results
var result1 = task1.Result;
var result2 = task2.Result;
var result3 = task3.Result;
```

:p How does Task.WhenAll work and when should you use it?
??x
**Task.WhenAll waits for multiple tasks to complete:**

**Sequential vs Parallel:**
```csharp
// ❌ Sequential - slow (300ms total)
var data1 = await GetData1Async();  // 100ms
var data2 = await GetData2Async();  // 100ms
var data3 = await GetData3Async();  // 100ms

// ✅ Parallel - fast (~100ms total)
var task1 = GetData1Async();  // Start immediately
var task2 = GetData2Async();  // Start immediately
var task3 = GetData3Async();  // Start immediately

await Task.WhenAll(task1, task2, task3);  // Wait for all

var data1 = task1.Result;
var data2 = task2.Result;
var data3 = task3.Result;
```

**Cleaner syntax with tuple:**
```csharp
var (data1, data2, data3) = await Task.WhenAll(
    GetData1Async(),
    GetData2Async(),
    GetData3Async()
);
```

**With collections:**
```csharp
var urls = new[] { "url1", "url2", "url3" };

// Create tasks
var tasks = urls.Select(url => httpClient.GetAsync(url));

// Wait for all
var responses = await Task.WhenAll(tasks);

// Process results
foreach (var response in responses)
{
    var content = await response.Content.ReadAsStringAsync();
}
```

**Error handling:**
```csharp
try
{
    await Task.WhenAll(task1, task2, task3);
}
catch (Exception ex)
{
    // Only first exception is thrown
    // To see all exceptions:
    try
    {
        await Task.WhenAll(tasks);
    }
    catch
    {
        foreach (var task in tasks)
        {
            if (task.IsFaulted)
            {
                // Handle task.Exception
            }
        }
    }
}
```

**Common patterns:**

**Multiple database queries:**
```csharp
var userTask = db.Users.FindAsync(userId);
var ordersTask = db.Orders.Where(o => o.UserId == userId).ToListAsync();
var profileTask = db.Profiles.FindAsync(userId);

await Task.WhenAll(userTask, ordersTask, profileTask);

var viewModel = new UserViewModel
{
    User = userTask.Result,
    Orders = ordersTask.Result,
    Profile = profileTask.Result
};
```

**Multiple HTTP calls:**
```csharp
var weatherTask = http.GetAsync("api/weather");
var newsTask = http.GetAsync("api/news");
var stocksTask = http.GetAsync("api/stocks");

await Task.WhenAll(weatherTask, newsTask, stocksTask);

// All calls made in parallel
```

**When to use:**

**✓ Independent async I/O:**
- HTTP requests
- Database queries
- File operations
- External API calls

**✗ Don't use for:**
- CPU-bound work (use Parallel.ForEach)
- Dependent operations (need sequential)
- Single operation (just await it)

**Performance impact:**
```
3 API calls, each 100ms:

Sequential:
Call 1 → Call 2 → Call 3 = 300ms

Task.WhenAll:
Call 1 ↓
Call 2 ↓ = ~100ms (3x faster)
Call 3 ↓
```
x??

---

#### Task.WhenAny Pattern
Task.WhenAny completes when the first task finishes. Useful for timeout scenarios, redundant operations, and racing multiple data sources.

```csharp
var task1 = SlowOperation();   // 2000ms
var task2 = FastOperation();   // 500ms
var task3 = MediumOperation(); // 1000ms

// Wait for first to complete
var completed = await Task.WhenAny(task1, task2, task3);
var result = await completed;  // result from FastOperation (500ms)
```

:p What is Task.WhenAny used for and how does it differ from Task.WhenAll?
??x
**Task.WhenAny returns when FIRST task completes:**

**WhenAny vs WhenAll:**
```csharp
// WhenAll - waits for ALL
await Task.WhenAll(task1, task2, task3);
// Returns when: ALL complete
// Use when: Need all results

// WhenAny - waits for FIRST
var first = await Task.WhenAny(task1, task2, task3);
// Returns when: FIRST completes
// Use when: First response wins
```

**Timeout pattern:**
```csharp
async Task<TResult> WithTimeout<TResult>(
    Task<TResult> operation,
    TimeSpan timeout)
{
    var timeoutTask = Task.Delay(timeout);

    var completedTask = await Task.WhenAny(operation, timeoutTask);

    if (completedTask == timeoutTask)
    {
        throw new TimeoutException("Operation timed out");
    }

    return await operation;
}

// Usage:
try
{
    var data = await WithTimeout(
        LongRunningOperation(),
        TimeSpan.FromSeconds(5)
    );
}
catch (TimeoutException)
{
    // Handle timeout
}
```

**Redundant requests (fastest wins):**
```csharp
// Query multiple data sources, use fastest
var dbTask = database.QueryAsync(id);
var cacheTask = cache.GetAsync(id);
var apiTask = externalApi.GetAsync(id);

var completedTask = await Task.WhenAny(dbTask, cacheTask, apiTask);
var result = await completedTask;

// First source to respond wins
// Example: Cache responds in 10ms, DB in 50ms → use cache
```

**Polling until complete:**
```csharp
var tasks = new List<Task<ProcessResult>>
{
    ProcessBatch1Async(),
    ProcessBatch2Async(),
    ProcessBatch3Async()
};

while (tasks.Any())
{
    var completedTask = await Task.WhenAny(tasks);
    tasks.Remove(completedTask);

    var result = await completedTask;
    Console.WriteLine($"Batch completed: {result}");
}

// Process results as they complete (not waiting for all)
```

**Resource availability:**
```csharp
// Multiple servers, use first available
var server1Task = server1.ProcessAsync(data);
var server2Task = server2.ProcessAsync(data);
var server3Task = server3.ProcessAsync(data);

var first = await Task.WhenAny(server1Task, server2Task, server3Task);
var result = await first;

// Use whichever server responds first
```

**Practical example - download with fallback:**
```csharp
async Task<byte[]> DownloadWithFallback(string primaryUrl, string backupUrl)
{
    var primaryTask = httpClient.GetByteArrayAsync(primaryUrl);
    var backupTask = httpClient.GetByteArrayAsync(backupUrl);

    var completedTask = await Task.WhenAny(primaryTask, backupTask);

    try
    {
        return await completedTask;
    }
    catch
    {
        // First failed, try the other
        var otherTask = completedTask == primaryTask ? backupTask : primaryTask;
        return await otherTask;
    }
}
```

**Key difference:**
```
WhenAll: AND logic (need all)
WhenAny: OR logic (need one)
```

**Use cases:**
- Timeouts
- Redundant operations
- First available resource
- As-they-complete processing
- Cancel on first success
x??

---

## Thread Safety

#### lock Statement
The lock statement ensures only one thread can execute a code block at a time. Critical for protecting shared mutable state in parallel operations.

```csharp
private readonly object _lockObject = new object();
private List<string> _results = new List<string>();

Parallel.ForEach(items, item =>
{
    var result = ProcessItem(item);

    lock (_lockObject)  // Only one thread at a time
    {
        _results.Add(result);
    }
});
```

:p How does the lock statement work and when is it necessary?
??x
**lock prevents concurrent access to shared resources:**

**The problem (race condition):**
```csharp
private int counter = 0;

Parallel.ForEach(items, item =>
{
    counter++;  // RACE CONDITION!
});

// Expected: 1000
// Actual: 743 (varies - some increments lost)

// Why: Multiple threads read/write simultaneously
// Thread 1: Read 5 → Add 1 → Write 6
// Thread 2: Read 5 → Add 1 → Write 6  (Lost Thread 1's update!)
```

**Solution with lock:**
```csharp
private readonly object _lockObject = new object();
private int counter = 0;

Parallel.ForEach(items, item =>
{
    lock (_lockObject)
    {
        counter++;  // Safe - one thread at a time
    }
});

// Result: 1000 (correct)
```

**How lock works:**
```csharp
lock (_lockObject)
{
    // Critical section
    // Only one thread executes this at a time
    // Other threads wait
}

// Translates to:
Monitor.Enter(_lockObject);
try
{
    // Critical section
}
finally
{
    Monitor.Exit(_lockObject);
}
```

**Lock object requirements:**
```csharp
// ✓ Good - private reference type
private readonly object _lockObject = new object();

// ✓ Good - instance lock
private readonly object _instanceLock = new object();

// ✗ Bad - don't lock on this
lock (this) { }  // External code can lock on same object

// ✗ Bad - don't lock on Type
lock (typeof(MyClass)) { }  // Global lock

// ✗ Bad - don't lock on string
lock ("myLock") { }  // String interning issues

// ✗ Bad - don't lock on value type
lock (42) { }  // Boxing creates different objects
```

**Deadlock danger:**
```csharp
// ❌ Deadlock scenario
object lock1 = new object();
object lock2 = new object();

// Thread 1:
lock (lock1) {
    lock (lock2) {
        // Work
    }
}

// Thread 2:
lock (lock2) {  // Has lock2, waiting for lock1
    lock (lock1) {  // Deadlock!
        // Work
    }
}
```

**Best practices:**

**1. Keep lock scope small:**
```csharp
// ❌ Bad - locks too much
lock (_lockObject)
{
    var result = ExpensiveOperation();  // Holds lock during slow work
    list.Add(result);
}

// ✅ Good - minimal lock
var result = ExpensiveOperation();  // Outside lock

lock (_lockObject)
{
    list.Add(result);  // Only lock for the write
}
```

**2. Use thread-safe collections instead:**
```csharp
// Instead of lock + List
private readonly ConcurrentBag<string> _results = new();

Parallel.ForEach(items, item =>
{
    _results.Add(item);  // No lock needed
});
```

**Performance impact:**
```
Without lock:
- 1000 operations: 10ms

With lock (high contention):
- 1000 operations: 100ms (10x slower due to waiting)

With ConcurrentBag:
- 1000 operations: 15ms (lock-free internally)
```

**When needed:**
- Protecting shared mutable state
- Non-atomic operations on shared data
- Ensuring consistency

**Alternatives:**
- `ConcurrentBag<T>`, `ConcurrentQueue<T>` (lock-free)
- `Interlocked` class (atomic operations)
- `SemaphoreSlim` (async-compatible)
- Avoid shared state (immutability)
x??

---

#### Concurrent Collections
Concurrent collections are thread-safe data structures that don't require explicit locking. They use lock-free algorithms internally for better performance in parallel scenarios.

```csharp
// Thread-safe collections
var bag = new ConcurrentBag<T>();        // Unordered
var queue = new ConcurrentQueue<T>();    // FIFO
var stack = new ConcurrentStack<T>();    // LIFO
var dict = new ConcurrentDictionary<K,V>(); // Key-value

// No lock needed
Parallel.ForEach(items, item =>
{
    bag.Add(ProcessItem(item));  // Thread-safe
});
```

:p What are concurrent collections and when should you use them instead of locks?
??x
**Concurrent collections = thread-safe without explicit locks**

**Standard vs Concurrent collections:**

**Standard (NOT thread-safe):**
```csharp
var list = new List<string>();

Parallel.ForEach(items, item =>
{
    list.Add(item);  // CRASH or data corruption
});
```

**Concurrent (thread-safe):**
```csharp
var bag = new ConcurrentBag<string>();

Parallel.ForEach(items, item =>
{
    bag.Add(item);  // Safe - no lock needed
});
```

**Available concurrent collections:**

**1. ConcurrentBag<T> - Unordered collection**
```csharp
var bag = new ConcurrentBag<string>();

// Thread-safe operations
bag.Add("item");
bool success = bag.TryTake(out string? item);

// Use when:
// - Order doesn't matter
// - Multiple producers/consumers
// - Parallel.ForEach results
```

**2. ConcurrentQueue<T> - FIFO queue**
```csharp
var queue = new ConcurrentQueue<string>();

queue.Enqueue("item");
bool success = queue.TryDequeue(out string? item);

// Use when:
// - First-in, first-out needed
// - Task queue / work items
// - Producer-consumer pattern
```

**3. ConcurrentStack<T> - LIFO stack**
```csharp
var stack = new ConcurrentStack<string>();

stack.Push("item");
bool success = stack.TryPop(out string? item);

// Use when:
// - Last-in, first-out needed
// - Undo operations
// - DFS algorithms
```

**4. ConcurrentDictionary<K,V> - Thread-safe dictionary**
```csharp
var dict = new ConcurrentDictionary<string, int>();

// Add or update
dict.TryAdd("key", 1);
dict.TryUpdate("key", 2, 1);  // Update if current value is 1
dict.AddOrUpdate("key", 1, (k, v) => v + 1);

// Get or add
var value = dict.GetOrAdd("key", k => ExpensiveOperation(k));

// Use when:
// - Caching
// - Shared lookups
// - Counters
```

**Performance comparison:**

**Lock + List:**
```csharp
var list = new List<string>();
var lockObj = new object();

Parallel.ForEach(items, item =>
{
    lock (lockObj) {
        list.Add(item);  // Bottleneck - one at a time
    }
});
// Time: 100ms (high contention)
```

**ConcurrentBag:**
```csharp
var bag = new ConcurrentBag<string>();

Parallel.ForEach(items, item =>
{
    bag.Add(item);  // Lock-free internally
});
// Time: 15ms (much faster)
```

**Practical example:**
```csharp
// Parallel data processing with results
public async Task<List<ProcessedItem>> ProcessManyItems(List<Item> items)
{
    var results = new ConcurrentBag<ProcessedItem>();

    Parallel.ForEach(items, new ParallelOptions { MaxDegreeOfParallelism = 4 },
        item =>
    {
        var processed = ProcessItem(item);
        results.Add(processed);
    });

    return results.ToList();
}
```

**Producer-consumer with ConcurrentQueue:**
```csharp
var queue = new ConcurrentQueue<WorkItem>();

// Producer
Task.Run(() => {
    while (hasWork) {
        queue.Enqueue(GetNextWorkItem());
    }
});

// Consumer
Task.Run(() => {
    while (true) {
        if (queue.TryDequeue(out var item)) {
            ProcessWorkItem(item);
        }
    }
});
```

**When to use:**

**Concurrent collections ✓:**
- Parallel.ForEach results
- Shared state in async code
- Producer-consumer scenarios
- High-contention scenarios

**Lock + standard collection ✓:**
- Complex updates requiring multiple operations
- Need specific ordering guarantees
- Low-contention scenarios
- Already using locks for other reasons

**Key advantage:** Better performance through lock-free algorithms and reduced contention
x??
