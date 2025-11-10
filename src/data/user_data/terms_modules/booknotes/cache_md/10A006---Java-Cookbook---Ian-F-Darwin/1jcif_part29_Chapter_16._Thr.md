# High-Quality Flashcards: 10A006---Java-Cookbook---Ian-F-Darwin_processed (Part 29)


**Starting Chapter:** Chapter 16. Threaded Java

---


#### Optional Interface Usage
Background context: The `Optional` interface is used to represent an optional value. It can be used to avoid null pointer exceptions and make your APIs more robust by indicating that a method may return no value at all.

:p What does the given code snippet demonstrate about using `Optional` with `ServiceLoader.load()`?
??x
The code snippet demonstrates how to use `Optional` to handle cases where an implementation of `LockManager` might not be found. By checking if `Optional<LockManager>` is present, it ensures that a null pointer exception does not occur when trying to access the value.

```java
Optional<LockManager> opt = ServiceLoader.load(LockManager.class).findFirst();
if (!opt.isPresent()) {
    throw new RuntimeException("Could not find implementation of LockManager");
}
LockManager mgr = opt.get();
```

Explanation: 
- `ServiceLoader.load(LockManager.class)` attempts to load the `LockManager` service provider.
- `.findFirst()` returns an `Optional<LockManager>` that may contain a value or be empty if no implementation is found.
- The `if (!opt.isPresent())` condition checks if there is a value (i.e., a LockManager instance) available. If not, it throws a runtime exception indicating that no suitable implementation was found.

If the `Optional<LockManager>` does contain an element, `.get()` method retrieves the actual `LockManager` object.
x??

---

#### ServiceLoader and Module Systems
Background context: The Java Platform Module System (JPMS) introduces a way to manage dependencies between modules in a more structured manner. Before JPMS, classes were loaded using class loaders; now with modules, services can be looked up using `ServiceLoader`.

:p What is the role of `ServiceLoader` in the provided code?
??x
The role of `ServiceLoader` in the provided code is to load implementations of the `LockManager` service provider. It scans for any available providers on the classpath and returns an `Optional<LockManager>` that can be checked to see if a suitable implementation was found.

```java
Optional<LockManager> opt = ServiceLoader.load(LockManager.class).findFirst();
if (!opt.isPresent()) {
    throw new RuntimeException("Could not find implementation of LockManager");
}
```

Explanation: 
- `ServiceLoader.load(LockManager.class)` queries the system for all available implementations that implement or extend `LockManager`.
- `.findFirst()` retrieves the first found provider, which is wrapped in an `Optional<LockManager>`.
- The `if (!opt.isPresent())` condition ensures that if no suitable implementation of `LockManager` was found, a runtime exception is thrown.
x??

---

#### Handling Unavailable Services with Optional
Background context: The Java 9 Modularity introduced the `Optional` class to help manage null values gracefully. This is especially useful in scenarios where services might not be available due to module dependencies or lack of implementation.

:p How does using `Optional` prevent potential runtime issues?
??x
Using `Optional` prevents potential runtime issues by avoiding null pointer exceptions when dealing with optional values. Instead of returning a null value, which can lead to unhandled exceptions later in the code, `Optional` provides methods like `isPresent()` and `get()`, allowing developers to handle the absence or presence of a value explicitly.

```java
Optional<LockManager> opt = ServiceLoader.load(LockManager.class).findFirst();
if (!opt.isPresent()) {
    throw new RuntimeException("Could not find implementation of LockManager");
}
```

Explanation: 
- By using `Optional`, you can check if a value is present with `.isPresent()`. If no value is found, the application throws an exception.
- This approach ensures that your code does not inadvertently assume a non-null value and can gracefully handle cases where a service might be missing.

Using `Optional` in this way enhances the robustness of your application by making it clear when certain components are optional or may fail to load.
x??

---

#### Migrating to JPMS
Background context: The Java Platform Module System (JPMS) was introduced in Java 9 to improve modularity and dependency management. Migration from traditional class loading to module systems involves changes in project structure, configuration, and possibly source code.

:p What is the main purpose of migrating to a modular system like JPMS?
??x
The main purpose of migrating to a modular system like JPMS is to enhance the modularity and manageability of Java applications. It provides better control over dependencies, clearer separation between modules, and improved performance due to optimized module loading.

Migration involves several steps such as:

1. **Organizing code into modules**: Grouping related classes and resources into modules.
2. **Defining module boundaries**: Clearly defining which packages are public and accessible from other modules.
3. **Updating dependencies**: Specifying dependencies between modules using the `module-info.java` file.

For example, a modular project might have multiple modules:

```java
// module-info.java in a LockManager module
module com.example.lockmanager {
    requires java.base;
    exports com.example.lockmanager.api; // Public API
}
```

Explanation: 
- By migrating to JPMS, developers can better organize their code into logical units (modules), making it easier to maintain and scale.
- The `module-info.java` file is crucial as it defines the module's identity, its dependencies, and public APIs. This helps in managing dependencies more explicitly and reducing classpath-related issues.

This migration process ensures that applications are built with a clearer structure, leading to more robust and modular software.
x??

---


#### Runnable Interface
Background context explaining the `Runnable` interface, its implementation, and why it is used. This interface has only one method: `run()`, which does not return a value but runs as an independent thread of execution.

:p What is the `Runnable` interface in Java?
??x
The `Runnable` interface is designed to allow you to pass code that should be executed by another thread, without creating a new class. It has only one method: `run()`, which does not return any value but performs some computation or task.

Here’s an example of how you can implement the `Runnable` interface and run it in a separate thread:

```java
public class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("Task is running in a different thread");
    }
}
```

To execute this `Runnable`, you would typically create a new thread as follows:

```java
Thread thread = new Thread(new MyRunnable());
thread.start();
```
x??

---

#### Callable Interface
Background context explaining the `Callable` interface, its implementation, and how it differs from the `Runnable` interface. The `Callable` interface introduces the `call()` method which returns a result.

:p What is the `Callable` interface in Java?
??x
The `Callable` interface extends the `Runnable` interface by adding one method: `call()`, which returns a value and can throw an exception. Unlike `Runnable`, `Callable` allows you to return data from the thread after it has executed its task.

Here’s how you might implement the `Callable` interface:

```java
public class MyCallable implements Callable<Integer> {
    @Override
    public Integer call() throws Exception {
        return 42; // Returning an integer value
    }
}
```

To use a `Callable`, it is typically passed to an `ExecutorService` via its `submit()` method, which returns a `Future`.

```java
ExecutorService executor = Executors.newSingleThreadExecutor();
Future<Integer> futureResult = executor.submit(new MyCallable());
int result = futureResult.get(); // Blocking until the task completes and retrieves the value
```
x??

---

#### ExecutorService for Threading
Background context explaining how to use an `ExecutorService` for managing threads in Java. It allows you to submit tasks (either `Runnable` or `Callable`) without directly creating thread objects.

:p How do you use an `ExecutorService` to handle threading?
??x
An `ExecutorService` is a service class that can execute code asynchronously, making it easier to manage multiple threads. You obtain an `ExecutorService` by invoking methods on the `Executors` utility class.

Here’s how you might create and use an `ExecutorService`:

```java
final ExecutorService pool = Executors.newFixedThreadPool(4); // Creating a thread pool with 4 threads

// Submitting tasks to the executor service
for (int i = 0; i < 10; i++) {
    Future<Integer> future = pool.submit(() -> {
        Thread.sleep(1000); // Simulating long-running task
        return i;
    });
    
    System.out.println("Task submitted");
}

// Waiting for all tasks to complete and then shutting down the executor service
try {
    Thread.sleep(3 * 1000);
} catch (InterruptedException e) {
    e.printStackTrace();
}
pool.shutdown();
```

In this example, `ExecutorService` manages the threads efficiently, allowing you to submit multiple tasks without worrying about thread creation and management.

??x
The key advantage of using an `ExecutorService` is that it abstracts away the details of creating and managing threads. It handles the task distribution and ensures that resources are managed effectively.

The code creates a fixed-size thread pool with 4 threads, submits tasks to this pool, and then waits for all submitted tasks to complete before shutting down the service.
x??

---

#### Future Interface
Background context explaining the `Future` interface and its methods. The `Future` represents a result that will become available in the future.

:p What is the `Future` interface used for?
??x
The `Future` interface is an abstract representation of some result to be computed later. It can return values, and indicate whether computation has completed. The main purpose is to allow you to perform asynchronous tasks without blocking your current thread until those tasks complete.

Here are some key methods in the `Future` interface:

```java
public interface Future<V> {
    public boolean isDone(); // Checks if the task is done
    public V get() throws InterruptedException, ExecutionException; // Blocks until result is available and returns it
    public V get(long timeout, TimeUnit unit) throws InterruptedException, ExecutionException, TimeoutException; // Similar to `get`, with a timeout
    public boolean cancel(boolean mayInterruptIfRunning); // Cancels the task if not already started or in progress
    public boolean isCancelled(); // Checks if the task has been cancelled
}
```

Here’s an example of using the `Future` interface:

```java
ExecutorService executor = Executors.newFixedThreadPool(1);
Future<Integer> futureResult = executor.submit(() -> {
    Thread.sleep(2000); // Simulating a long-running task
    return 42;
});

// Waiting for the result and handling potential exceptions
try {
    int result = futureResult.get();
    System.out.println("The result is: " + result);
} catch (InterruptedException | ExecutionException e) {
    e.printStackTrace();
}

executor.shutdown();
```

In this example, `Future` provides a way to get results from asynchronous tasks without blocking the main thread. It also supports cancelling tasks and checking their state.

??x
The `Future` interface allows you to handle asynchronous computations effectively by providing methods like `get()` which blocks until the result is ready or throws an exception if something goes wrong, while `cancel()` lets you stop a task that hasn't started or is still in progress.

In this example, we submit a task to an executor service and use `Future` to retrieve its result asynchronously. If the task completes normally, it prints the result; otherwise, it handles exceptions.
x??

---

#### CompletableFuture
Background context explaining `CompletableFuture`, its constructor methods, and how to complete or cancel tasks.

:p What is `CompletableFuture` in Java?
??x
`CompletableFuture` is a powerful class for asynchronous programming that extends the basic `Future` interface. It allows you to perform complex operations asynchronously by chaining various operations using lambda expressions and method references.

Here’s an example of creating and completing a `CompletableFuture`:

```java
CompletableFuture<Integer> cf = new CompletableFuture<>();
// Simulating work being done elsewhere
cf.complete(42); // Completing the future with a value

try {
    int result = cf.get(); // Blocks until the result is available
    System.out.println("Result: " + result);
} catch (InterruptedException | ExecutionException e) {
    e.printStackTrace();
}
```

`CompletableFuture` provides many methods for chaining operations:

- `thenApply`: Applies a function to the completed future.
- `thenAccept`: Accepts a consumer that will be called with the value once it’s available.

Here is an example of using `thenApply` and `thenRun`:

```java
CompletableFuture.supplyAsync(() -> 42)
    .thenApply(v -> v * 2) // Doubles the value
    .thenAccept(System.out::println); // Prints the result

// Using thenRun for side effects
CompletableFuture<Void> future = CompletableFuture.completedFuture(null);
future.thenRun(() -> System.out.println("Task completed"));
```

`CompletableFuture` is very flexible and allows you to compose complex asynchronous tasks with ease.

??x
`CompletableFuture` is a versatile class that enhances the `Future` interface by providing additional methods for composing asynchronous operations. It supports chaining operations like `thenApply`, `thenAccept`, and `thenRun`.

In this example, we create a `CompletableFuture` using `supplyAsync` to simulate a task that returns an integer value 42. We then chain further operations: doubling the value with `thenApply` and printing it with `thenAccept`. The `thenRun` method is used for side effects.

??x
The flexibility of `CompletableFuture` allows you to build complex asynchronous workflows by chaining various operations using lambda expressions or method references. This makes it easier to manage tasks that have multiple steps, where each step depends on the result of the previous one.
x??

---


#### Stopping a Thread: Using `stop()` Method is Deprecated
Background context explaining why using the `Thread.stop()` method is deprecated. The compiler generates deprecation warnings, and it can lead to unreliable behavior when used in multi-threaded programs.

:p What are the reasons for deprecating the use of `Thread.stop()`?
??x
The `Thread.stop()` method is deprecated because its usage can cause issues such as abrupt termination of threads without proper cleanup. This can result in resource leaks or inconsistent program states, making it unreliable to use in multi-threaded applications.

```java
public class StopBoolean {
    // volatile boolean done = false; // Note: The given code has 'volatile' removed for brevity.
    protected boolean done = false;
    Runnable r = () -> {
        while (done) { 
            System.out.println("StopBoolean running");
            try {
                Thread.sleep(720);
            } catch (InterruptedException ex) {
                // nothing to do
            }
        }
        System.out.println("StopBoolean finished.");
    };
    public void shutDown() {
        System.out.println("Shutting down...");
        done = true;
    }
    public void doDemo() throws InterruptedException {
        ExecutorService pool = Executors.newSingleThreadExecutor();
        pool.submit(r);
        Thread.sleep(1000 * 5);
        shutDown();
        pool.shutdown();
        pool.awaitTermination(2, TimeUnit.SECONDS);
    }
}
```
x??

---

#### Stopping a Thread: Using `volatile` Boolean Variable
Background context explaining the role of the `volatile` keyword in ensuring visibility of changes across threads. The main loop continuously checks this boolean variable to determine if the thread should exit.

:p How does using a `volatile` boolean variable help in stopping a thread?
??x
Using a `volatile` boolean variable ensures that any write operation to this variable is immediately visible to all other threads. This allows the main loop of the run() method to check the value of the boolean variable and exit the loop when necessary, thereby gracefully shutting down the thread.

```java
public class StopBoolean {
    // Must be volatile to ensure changes visible to other threads.
    protected volatile boolean done = false;
    
    Runnable r = () -> { 
        while (done) { 
            System.out.println("StopBoolean running");
            try { 
                Thread.sleep(720);
            } catch (InterruptedException ex) {
                // nothing to do
            }
        } 
        System.out.println("StopBoolean finished.");
    };
    
    public void shutDown() {
        System.out.println("Shutting down...");
        done = true;
    }
    
    public void doDemo() throws InterruptedException { 
        ExecutorService pool = Executors.newSingleThreadExecutor();
        pool.submit(r);
        Thread.sleep(1000 * 5);
        shutDown();
        pool.shutdown();
        pool.awaitTermination(2, TimeUnit.SECONDS);
    }
}
```
x??

---

#### Stopping a Thread: Handling Sockets and Deadlocks
Background context explaining scenarios where threads might get stuck in I/O operations. The example demonstrates intentionally creating a deadlock by reading from an HTTP socket without sending a proper request.

:p How can you terminate a thread that is blocked on a socket operation?
??x
To handle a thread that is blocked on a socket operation, you can close the socket. This interrupts the read operation, allowing the thread to exit the loop and terminate properly. However, closing the socket does not guarantee immediate termination of the I/O operation; it sends an interrupt signal.

```java
public class StopClose extends Thread {
    protected Socket io;
    
    public void run() { 
        try { 
            io = new Socket("java.sun.com", 80); // HTTP 
            BufferedReader is = new BufferedReader(new InputStreamReader(io.getInputStream()));
            System.out.println("StopClose reading");
            
            // The following line will deadlock (intentionally), since HTTP
            // enjoins the client to send a request (like "GET / HTTP/1.0") and a null line,
            // before reading the response.
            String line = is.readLine(); // DEADLOCK 
        } catch (IOException ex) { 
            System.out.println("StopClose terminating: " + ex);
        }
    }
    
    public void shutDown() throws IOException { 
        if (io != null) {
            synchronized (io) { 
                io.close();
            }
        }
        System.out.println("StopClose.shutDown() completed");
    }
}
```
x??

---

#### Stopping a Thread: Interrupting Reads
Background context explaining the use of `java.io.InterruptedIOException` to handle interrupted reads and retry logic. This approach is useful when you want to break out of blocking I/O operations without fully terminating the socket connection.

:p How can you interrupt a read operation in Java?
??x
To interrupt a read operation, you can catch an `InterruptedException` which is thrown by methods like `read()`. By throwing an interruption signal, the thread can exit the read loop and retry the read operation later. This approach allows for graceful handling of I/O operations without fully terminating the socket connection.

```java
public class Intr {
    public void handleInterruptedRead() throws IOException {
        try (BufferedReader br = new BufferedReader(new InputStreamReader(socket.getInputStream()))) {
            String line;
            while ((line = br.readLine()) != null) {
                // Process line
            }
        } catch (InterruptedException ex) {
            System.out.println("Read interrupted: " + ex);
            // Retry or handle the interruption
        }
    }
}
```
x??

---

