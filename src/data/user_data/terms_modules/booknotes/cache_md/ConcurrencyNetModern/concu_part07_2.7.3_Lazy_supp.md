# High-Quality Flashcards: ConcurrencyNetModern_processed (Part 7)


**Starting Chapter:** 2.7.3 Lazy support in F. 2.7.4 Lazy and Task a powerful combination

---


#### Combining Lazy and Task in F#
Background context explaining the concept. The `Lazy<T>` type can be combined with `Task<T>` to implement a useful pattern for instantiating objects that require asynchronous operations, ensuring lazy evaluation on demand using an independent thread.
If applicable, add code examples with explanations.
:p How does combining `Lazy<T>` and `Task<T>` enhance performance in concurrent applications?
??x
Combining `Lazy<T>` and `Task<T>` enhances performance by allowing the evaluation of a given expression exactly once while enabling lazy computation. This is particularly useful for asynchronous operations like loading data from a database, ensuring that the operation runs only once on a thread-pool thread.
```fsharp
let person = 
    new Lazy<Task<Person>>(async () => 
        async {
            using (var cmd = new SqlCommand(cmdText, conn))
            using (var reader = await cmd.ExecuteReaderAsync())
            do! 
                if(await reader.ReadAsync()) then
                    let firstName = reader["first_name"].ToString()
                    let lastName = reader["last_name"].ToString()
                    return new Person(firstName, lastName)
                else
                    throw new Exception("No record available")
        }
    )
async Task<Person> FetchPerson() =
    await person.Value
```
x??

---


#### Function Composition in FP
Background context explaining the concept. Function composition involves applying the result of one function to the input of another, creating a new function that solves complex problems by decomposing them into smaller and simpler problems.
If applicable, add code examples with explanations.
:p What is function composition in functional programming?
??x
Function composition in functional programming involves applying the result of one function as an argument to another function, effectively creating a new function. This technique helps solve complex problems by breaking them down into simpler, more manageable parts and then combining their solutions.
```fsharp
let addOne x = x + 1
let multiplyByTwo x = x * 2

// Composing the functions
let composeAddAndMultiply x =
    multiplyByTwo (addOne x)

composeAddAndMultiply 3 // Result is 8
```
x??

---


#### Closures in FP
Background context explaining the concept. A closure is an inline delegate/anonymous method attached to its parent method, where variables defined within the parent's body can be referenced from within the anonymous method. This allows functions to maintain state even after execution has left the scope of the parent function.
If applicable, add code examples with explanations.
:p What is a closure in functional programming?
??x
A closure in functional programming is an inline delegate or anonymous method attached to its parent method that can reference variables defined within the parent's body. This allows functions to maintain state even after execution has left the scope of the parent function.
```fsharp
let createCounter initialValue =
    let mutable count = initialValue
    (fun () -> 
        count <- count + 1
        count)

let counter = createCounter 0
counter() // Output: 1
counter() // Output: 2
```
x??

---


#### Memoization in FP
Background context explaining the concept. Memoization is a technique that maintains the results of intermediate computations instead of recomputing them, often used to speed up algorithms and reduce redundant calculations.
If applicable, add code examples with explanations.
:p What is memoization?
??x
Memoization is a functional programming technique that maintains the results of intermediate computations instead of recomputing them. It's considered a form of caching, where previous computation results are stored to avoid repeated expensive operations.
```fsharp
let fib =
    let cache = System.Collections.Generic.Dictionary<int, int>()
    (fun n ->
        match cache.TryGetValue(n) with
        | true, value -> value
        | false -> 
            let result = if n <= 1 then n else fib (n - 1) + fib (n - 2)
            cache.Add(n, result)
            result)

fib 10 // Output: 55
```
x??

---


#### Precomputation in FP
Background context explaining the concept. Precomputation involves performing an initial computation that generates a series of results, usually stored as a lookup table, to avoid redundant computations during execution.
If applicable, add code examples with explanations.
:p What is precomputation?
??x
Precomputation is a technique where an initial computation generates a series of results, often stored in the form of a lookup table. These precomputed values can be used directly from algorithms to avoid repeated and expensive computations each time your code executes.
```fsharp
let primeNumbers = 
    let primes = new System.Collections.Generic.HashSet<int>()
    for i in 2..100 do
        if isPrime i then primes.Add(i)
    primes

let isPrime n =
    not (primes.Contains(n))

primeNumbers // Output: HashSet containing all prime numbers up to 100
```
x??

---


#### Lazy Initialization in FP
Background context explaining the concept. Lazy initialization defers the computation of a factory function for object instantiation until needed, creating the object only once and improving performance by reducing memory consumption.
If applicable, add code examples with explanations.
:p What is lazy initialization?
??x
Lazy initialization is a technique that defers the computation of a factory function for object instantiation until needed. It ensures that an object is created only once and can improve performance by reducing memory consumption and avoiding unnecessary computations.
```fsharp
let person =
    new Lazy<Person>(fun () ->
        Person("barney", "rubble")
    )

person.Value.FullName // Lazy initialization ensures the value is computed only when accessed for the first time.
```
x??

---


#### Functional Data Structures and Immutability Overview
Functional programming fits well into data transformation scenarios. By using immutable data structures, you can avoid side effects and state changes, making concurrent programming easier.
:p What is the primary advantage of functional data structures in concurrent programming?
??x
The primary advantage of functional data structures in concurrent programming is that they allow transformations on data without affecting the original state. This eliminates side effects and makes it easier to handle concurrency because multiple threads can safely read or modify immutable data without causing race conditions.
```csharp
List<int> numbers = new List<int>();
foreach (var number in numbers) {
    // Transformation logic here
}
```
x??

---


#### Building a Functional List in C#
Creating a functional list involves defining operations that transform the list without modifying the original data. This ensures immutability and thus thread safety.
:p How can you implement a simple function to add an element to a functional list in C#?
??x
In C#, you can implement a `FunctionalList` class with methods like `Add`, which returns a new list instead of modifying the existing one.
```csharp
public class FunctionalList<T> {
    private readonly List<T> _list;

    public FunctionalList(List<T> list) {
        _list = list;
    }

    public FunctionalList<T> Add(T element) {
        var newList = new List<T>(_list);
        newList.Add(element);
        return new FunctionalList<T>(newList);
    }
}
```
x??

---


#### Using Immutability in F#
Immutability is easier to achieve in languages like F# due to its strong typing system and pattern matching capabilities.
:p How can you define an immutable list in F#?
??x
In F#, you can use the `list` keyword or the `List` type constructor to create immutable lists. For example:
```fsharp
let numbers = [1; 2; 3]
```
This definition is immutable and cannot be changed.
x??

---


#### Implementing Parallel Patterns with Functional Recursion
Parallel recursion allows you to perform operations in parallel, making use of multiple threads for efficiency.
:p How can you implement a parallel version of the map function using functional recursion?
??x
You can implement a parallel `map` function by recursively dividing the list into smaller chunks and processing them in parallel. Here is an example in F#:
```fsharp
let rec parallelMap f = function
    | [] -> []
    | x :: xs ->
        async {
            let! mappedX = Async.RunSynchronously(f x)
            return! mappedX :: (parallelMap f xs)
        }
```
This implementation uses asynchronous programming to process elements in parallel.
x??

---


#### Working with Immutable Objects in C# and F#
Immutable objects ensure that once an object is created, its state cannot be changed. This is crucial for maintaining consistency and preventing bugs.
:p How can you create a simple immutable class in C#?
??x
In C#, creating an immutable class involves making the fields read-only and providing constructor parameters to set these values. Here’s an example:
```csharp
public sealed class Person {
    public string Name { get; }
    public int Age { get; }

    public Person(string name, int age) {
        Name = name;
        Age = age;
    }
}
```
This ensures that once a `Person` object is created, its properties cannot be changed.
x??

---


#### Concurrent Programming with Functional Data Structures
Functional data structures can improve performance by sharing immutable data between threads. This avoids the need for locks and reduces race conditions.
:p How does functional data structure sharing contribute to concurrent programming?
??x
Functional data structures contribute to concurrent programming by allowing multiple threads to safely read or modify shared data without needing locks. When a function returns a new data structure, it doesn’t affect the original state, reducing the risk of race conditions and deadlocks.

For example:
```csharp
var originalList = new List<int>();
var modifiedList1 = originalList.Add(1);
var modifiedList2 = originalList.Add(2);

// Both modifications can occur in parallel without conflicts.
```
x??

---


#### Implementing Parallel Recursion with Tree Structures
Parallel recursion can be applied to tree structures, such as binary trees, allowing for efficient data processing across multiple threads.
:p How can you implement a function to traverse a binary tree in parallel using functional recursion?
??x
You can implement a parallel traversal of a binary tree by recursively dividing the tree into subtrees and processing them in parallel. Here’s an example in F#:
```fsharp
let rec parallelTreeTraversal (tree: 'a Tree) =
    async {
        match tree with
        | Leaf _ -> return ()
        | Node(left, right) ->
            let! () = Async.RunSynchronously(parallelTreeTraversal left)
            let! () = Async.RunSynchronously(parallelTreeTraversal right)
            // Additional processing here if needed
            return ()
    }
```
This function processes the left and right subtrees in parallel.
x??

---

---


---
#### Production Environment Challenges
Background context: In a production environment, software can encounter unexpected issues and heavy loads that are not present during testing. The phrase "It works on my machine" is common when developers test their applications locally but face problems once deployed.
:p What are some challenges faced in the production environment?
??x
Production environments often experience unforeseen issues due to multiple factors such as network latency, unexpected user load, and hardware limitations that were not present during development or testing phases. These conditions can lead to unreliable program behavior despite passing all local tests. 
```
public class Example {
    // Code for handling unexpected issues in production environment
}
```
x??

---


#### Thread-Safe Issues with Shared State
Background context: In the given scenario, a chat application was using a shared state (a `Dictionary` in memory) to keep track of connected users. The `OnConnected` and `OnDisconnected` methods were causing a bottleneck due to thread contention on this shared state.
:p What caused the high CPU usage issue in the application?
??x
The high CPU usage issue originated from the contention for a shared state (a `Dictionary`) used by multiple threads simultaneously, leading to significant overhead during `OnConnected` and `OnDisconnected` method calls. This contention slowed down the server's ability to handle incoming requests efficiently.
```csharp
// Pseudocode example of problematic code
public class ChatHub : Hub {
    private static Dictionary<string, string> users = new Dictionary<string, string>();

    public override async Task OnConnected()
    {
        // Code that may cause thread contention
        await Task.Run(() => 
        {
            lock(users)
            {
                // Operations on the shared state
            }
        });
    }

    public override void OnDisconnected(bool stopCalled)
    {
        // More code for managing disconnections
    }
}
```
x??

---


#### Profiling and Performance Analysis
Background context: To identify bottlenecks in applications, profiling tools were used. These tools sample the application during execution to analyze which methods are performing the most work.
:p What is the purpose of using a profiling tool?
??x
The purpose of using a profiling tool is to identify performance bottlenecks by sampling program execution and analyzing the methods that consume the most resources. This helps in optimizing critical sections of code for better performance.
```java
// Example usage of a profiling tool
Profiler.start();
// Application code here
Profiler.stop();
Profiler.printReport(); // Generate report showing hot paths
```
x??

---

---


#### Static Constructor in C#
A static constructor is used to initialize a static class or its static members. In the context of SignalR, it ensures that the dictionary `onlineUsers` is initialized only once when the application starts.

:p What does a static constructor do?
??x A static constructor initializes a static class or its static members. It is called only once by the .NET runtime before any other member of the static class is accessed. In SignalR, this ensures that the dictionary `onlineUsers` is initialized just once when the application starts.

```csharp
static Dictionary<Guid, string> onlineUsers = 
    new Dictionary<Guid, string>();

// Static constructor
{
    // Initialization code here
}
```
x??

---


#### Immutability and Shared State in SignalR Hub
Immutability is a principle that suggests minimizing the number of mutable state changes to improve concurrency. In the given context, using immutable data structures can help avoid thread contention.

:p How might immutability be applied to resolve issues with shared state?
??x To apply immutability, you could use collections like `ConcurrentDictionary` from the `System.Collections.Concurrent` namespace, which is designed for thread-safe operations without requiring locking. This would eliminate the need for locks and reduce the risk of thread contention.

```csharp
using System.Collections.Concurrent;

static ConcurrentDictionary<Guid, string> onlineUsers = 
    new ConcurrentDictionary<Guid, string>();

public override Task OnConnected()
{
    Guid connectionId = new Guid(Context.ConnectionId);
    string userName = Context.User.Identity.Name;
    
    if (!onlineUsers.TryAdd(connectionId, userName))
    {
        RegisterUserConnection(connectionId, userName);
    }

    return base.OnConnected();
}

public override Task OnDisconnected()
{
    Guid connectionId = new Guid(Context.ConnectionId);

    onlineUsers.TryRemove(connectionId, out _);
    DeregisterUserConnection(connectionId);

    return base.OnDisconnected();
}
```
x??

---

---


#### Thread Safety with Collections: Dictionary and Enumerating Issues
The `Dictionary` class can support multiple readers but not when being modified. Enumerating through a collection while another thread is modifying it can lead to exceptions or inconsistent states.
:p What are the limitations of using a `Dictionary` in a multithreaded environment?
??x
A dictionary can be read concurrently by many threads, but writing to it must be synchronized to avoid data corruption. However, enumerating through the collection is inherently unsafe because another thread might modify the dictionary during enumeration, leading to runtime exceptions like `ConcurrentModificationException`.
```csharp
// Incorrect way of iterating and modifying a dictionary
foreach (var item in connections)
{
    if (item.Value == "userToChange")
    {
        connections.Remove(item.Key);
    }
}
```
x??

---


#### Thread Safety Solutions: Locking vs Immutable Collections
Locking provides thread safety but can degrade performance due to contention. Immutable collections, introduced by .NET Framework 4.5, offer a way to maintain thread safety without locks.
:p What are the trade-offs between using locking and immutable collections for thread safety?
??x
Locking ensures that operations on shared data structures are synchronized, preventing race conditions but can lead to performance degradation due to contention where multiple threads wait for each other to release the lock. Immutable collections avoid this by ensuring that any operation creating a new version of the collection does not modify existing instances, thus maintaining thread safety without locks.
```csharp
// Using locking (incorrect)
lock (syncRoot)
{
    connections[connectionId] = userName;
}

// Using immutable collections (correct)
var original = new Dictionary<int, int>().ToImmutableDictionary();
var modifiedCollection = original.Add(key, value);
```
x??

---


#### Immutable Collections Overview
Background context: In the .NET Framework 4.5, immutable collections were introduced to provide thread-safe and non-mutable data structures. These collections are designed to prevent changes once created, ensuring that operations on them do not lead to unexpected behavior or race conditions.

The provided text lists several immutable collections in C#, such as `ImmutableList<T>`, `ImmutableDictionary<TKey, TValue>`, and others. It also mentions the older approach using `ReadOnlyCollection` which is a wrapper around mutable collections and can lead to thread-safety issues due to potential modifications by other threads.

:p What are the main advantages of using immutable collections over their mutable counterparts?
??x
Using immutable collections provides several benefits, including:
- Thread safety: Since changes cannot alter the existing collection once it's created, there is no risk of race conditions or data corruption.
- Simplified code: Because operations return new instances rather than modifying existing ones, the code becomes easier to reason about and debug.

In C#, you can create immutable collections using various methods. Here are two examples:

1. **Creating an `ImmutableList`**:
```csharp
var list = ImmutableList.Create<int>(); // Create an empty list.
list = list.Add(1);                     // Add 1 to the list.
list = list.Add(2);                     // Add 2 to the list.
list = list.Add(3);                     // Add 3 to the list.

// Alternatively, using a builder:
var builder = ImmutableList.CreateBuilder<int>();
builder.Add(1);
builder.Add(2);
builder.Add(3);

list = builder.ToImmutable();           // Freeze the builder into an immutable list.
```

2. **Using `ImmutableDictionary` for lookups**:
```csharp
var dictionary = ImmutableDictionary.Create<int, string>()
    .Add(1, "One")
    .Add(2, "Two");
```
x??

---


#### Constructing Immutable Collections with Builders
Background context: Using builders is a convenient way to construct immutable collections by adding elements one at a time and then sealing the collection into an immutable structure.

The provided text mentions that mutable builders are used to add elements incrementally and then convert them to an immutable state. This approach simplifies the construction of lists, dictionaries, or other collections without the need for complex manual copying.

:p How do you construct an `ImmutableList` using a builder?
??x
You can construct an `ImmutableList` using a builder by adding elements one at a time and then sealing the collection into an immutable state. Here's how to do it:

1. Create a builder:
```csharp
var builder = ImmutableList.CreateBuilder<int>();
```

2. Add elements to the builder:
```csharp
builder.Add(1); // Adds 1 to the list.
builder.Add(2); // Adds 2 to the list.
builder.Add(3); // Adds 3 to the list.
```

3. Convert the builder to an immutable list:
```csharp
var list = builder.ToImmutable(); // The final, immutable list is created.
```
x??

---


#### Thread-Safe Collections and CAS Operations
Background context: While immutable collections provide thread safety by ensuring that once a collection is created, it cannot be changed, certain operations still need to be protected. Lock statements can be used around read/write operations, but this approach can lead to performance bottlenecks. A more efficient technique involves using compare-and-swap (CAS) operations for write protection.

The CAS operation is an atomic operation that checks if a memory location's value matches the expected value and updates it with a new value only if both conditions are met. This ensures that writes are thread-safe without blocking other threads, leading to better scalability.

:p How does a compare-and-swap (CAS) operation work in multithreaded programming?
??x
A compare-and-swap (CAS) operation works by atomically performing an operation on memory locations under certain conditions:
1. **Read the current value** of the memory location.
2. **Compare it with the expected value** provided as a parameter.
3. If the values match, **update the memory location** with the new value.
4. Return the original (expected) value if the update was successful; otherwise, return the current value.

This operation ensures that writes are thread-safe without blocking other threads. It is more efficient than using locks in scenarios where frequent reads and occasional writes occur.

Here's a simple pseudocode example:
```pseudocode
function CAS(expectedValue, newValue, memoryLocation):
    if (memoryLocation == expectedValue) {
        memoryLocation = newValue;
        return true; // Update successful.
    }
    return false; // Another thread updated the location first.
```
x??

---

---


---
#### Atomic Operations and CAS Instructions
Atomic operations ensure that an operation on a shared variable is performed as a single, indivisible action. The `Interlocked.CompareExchange` (CAS) instruction is used to perform these atomic operations by comparing the current value with the expected one before updating it.

:p What are atomic operations and how do they work in the context of shared variables?
??x
Atomic operations ensure that an operation on a shared variable is performed as a single, indivisible action. This means that either the entire operation succeeds or fails; there's no partial execution. In the context of shared variables, this prevents race conditions where multiple threads might interfere with each other while modifying the same data.

For example, using `Interlocked.CompareExchange`, if Thread A and Thread B both try to update a variable, only one thread will succeed based on the current state; the other will retry until it can successfully perform the operation. Here's an example in C#:
```csharp
int value = 0;
while (true) {
    int expectedValue = value;
    if (Interlocked.CompareExchange(ref value, newExpectedValue, expectedValue) == expectedValue) {
        // Operation succeeded.
        break;
    }
}
```
x??

---


#### Implementation of Atom Class
The `Atom` class encapsulates reference objects and uses the `Interlocked.CompareExchange` method to perform atomic operations, ensuring thread safety without requiring locks. It is inspired by Clojure atoms.

:p What does the `Atom<T>` class do?
??x
The `Atom<T>` class provides a mechanism for performing atomic compare-and-swap (CAS) operations on reference objects. By encapsulating a volatile field of type T and using `Interlocked.CompareExchange`, it ensures that changes to the object are performed atomically.

Here is an example implementation:
```csharp
public sealed class Atom<T> where T : class {
    public Atom(T value)
    {
        this.value = value;
    }

    private volatile T value;

    public T Value => value;

    public T Swap(Func<T, T> factory) {
        T original, temp;
        do {
            original = value;
            temp = factory(original);
        } while (Interlocked.CompareExchange(ref value, temp, original) == original);

        return original;
    }
}
```

The `Swap` method allows changing the wrapped object atomically by providing a function to create a new instance based on the current one.
x??

---


#### Removing User Connections with ImmutableInterlocked
Explanation of how to remove a user connection using `ImmutableInterlocked.TryRemove`.

:p How does `ImmutableInterlocked.TryRemove` work to deregister a user in a SignalR hub?
??x
`ImmutableInterlocked.TryRemove` is used to atomically remove an item from an `ImmutableDictionary`. It returns `true` if the item was successfully removed and `false` otherwise, ensuring thread safety.

```csharp
if(ImmutableInterlocked.TryRemove(ref onlineUsers, connectionId, out userName)) {
    DeregisterUserConnection(connectionId, userName);
}
```

The method checks for the presence of the key. If found, it removes the item and returns `true`, along with the removed user's name. This operation ensures that the dictionary remains in a consistent state even under concurrent access.

x??

---

---

