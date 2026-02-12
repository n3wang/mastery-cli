# High-Quality Flashcards: ConcurrencyNetModern_processed (Part 36)


**Starting Chapter:** 13.6.1 Solution implementing a polymorphic  publisher-subscriber pattern

---


#### Thread-safe Random Number Generator
Background context: In multithreaded applications, generating random numbers can be a challenge due to the shared state of `System.Random`. This class may not provide thread safety when accessed concurrently by multiple threads. To address this, `ThreadLocal<T>` is used to ensure each thread has its own instance of `Random`.

The example provided shows how to create a thread-safe pseudo-random number generator using `ThreadLocal<Random>`. The `ThreadSafeRandom` class inherits from `Random` and overrides the necessary methods.

:p How does the `ThreadSafeRandom` class ensure that random numbers are generated safely in a multi-threaded environment?
??x
The `ThreadSafeRandom` class ensures thread safety by leveraging `ThreadLocal<T>` to create an isolated instance of `Random` for each thread. This prevents shared state issues and guarantees that each thread gets independent random number generation.

Here is how the `ThreadSafeRandom` class works:

```csharp
public class ThreadSafeRandom : Random {
    private ThreadLocal<Random> random = 
        new ThreadLocal<Random>(() => new Random(MakeRandomSeed()));

    public override int Next() => random.Value.Next();
    public override int Next(int maxValue) => random.Value.Next(maxValue);
    public override int Next(int minValue, int maxValue) =>
        random.Value.Next(minValue, maxValue);
    public override double NextDouble() => random.Value.NextDouble();
    public override void NextBytes(byte[] buffer) =>
        random.Value.NextBytes(buffer);

    static int MakeRandomSeed() => 
        Guid.NewGuid().ToString().GetHashCode();
}
```

The `MakeRandomSeed` method generates a unique seed for each thread, ensuring that the state of `Random` is different across threads. This setup allows multiple threads to generate independent sequences of random numbers without interfering with each other.

x??

---

---


---
#### ThreadLocal Random Number Generation
Background context: In concurrent programming, generating unique and independent random numbers for each thread is crucial to avoid race conditions. The `ThreadLocal<T>` class allows creating a local copy of an object per thread, ensuring thread safety without blocking other threads.

Code example:
```csharp
var safeRandom = new ThreadSafeRandom();
string[] clips = new string[] { "1.mp3", "2.mp3", "3.mp3", "4.mp3" };
Parallel.For(0, 1000, (i) =>
{
    var clipIndex = safeRandom.Next(4);
    var clip = clips[clipIndex];
    Console.WriteLine($"clip to play {clip} - Thread Id {Thread.CurrentThread.ManagedThreadId}");
});
```
:p How does `ThreadLocal<T>` ensure thread safety in generating random numbers?
??x
`ThreadLocal<T>` ensures thread safety by creating a separate instance of the `Random` class for each thread, which are not dependent on the system clock. This way, each thread has its own unique and independent random number generator.

```csharp
public sealed class ThreadSafeRandom : Random
{
    private static readonly ThreadLocal<Random> ThreadLocalInstance = new(() => new Random());

    public override int Next()
    {
        return ThreadLocalInstance.Value.Next();
    }
}
```
x?

---


#### Polymorphic Event Aggregator Design Pattern
Background context: The `EventAggregator` pattern is a design pattern used to manage events of different types in a loosely coupled manner. It allows publishers to raise events and subscribers to handle them without knowing the specific event type.

Code example:
```csharp
let evtAggregator = EventAggregator.Create()
type IncrementEvent = { Value: int }
type ResetEvent = { ResetTime: DateTime }

evtAggregator.GetEvent<ResetEvent>()
    .ObserveOn(Scheduler.CurrentThread)
    .Subscribe(fun evt -> 
        printfn "Counter Reset at: %O - Thread Id %d" evt.ResetTime Thread.CurrentThread.ManagedThreadId)

evtAggregator.GetEvent<IncrementEvent>()
    .ObserveOn(Scheduler.CurrentThread)
    .Subscribe(fun evt -> 
        printfn "Counter Incremented. Value: %d - Thread Id %d" evt.Value Thread.CurrentThread.ManagedThreadId)

for i in [0..10] do
    evtAggregator.Publish({ Value = i })

evtAggregator.Publish({ ResetTime = DateTime(2015, 10, 21) })
```
:p How does the `EventAggregator` manage different types of events?
??x
The `EventAggregator` manages different types of events by using Rx (Reactive Extensions) subjects. Each event type is treated as an observable sequence, and when an event is published, it notifies all subscribers that are interested in that specific event type.

```csharp
type IEventAggregator = 
    inherit IDisposable
    abstract GetEvent<'Event> : unit -> IObservable<'Event>
    abstract Publish<'Event> : eventToPublish: 'Event -> unit

type internal EventAggregator() =
    let disposedErrorMessage = "The EventAggregator is already disposed."
    let subject = new Subject<obj>()

    interface IEventAggregator with
        member this.GetEvent<'Event>() : IObservable<'Event> =
            if (subject.IsDisposed) then failwith disposedErrorMessage
            subject.OfType<'Event>().AsObservable<'Event>()
                .SubscribeOn(TaskPoolScheduler.Default)

        member this.Publish(eventToPublish: 'Event): unit = 
            if (subject.IsDisposed) then failwith disposedErrorMessage
            subject.OnNext(eventToPublish)

        member this.Dispose(): unit = subject.Dispose()

static member Create() : IEventAggregator = new EventAggregator()
```
x?

---


#### Custom Rx Scheduler for Controlling Degree of Parallelism
Background context explaining the need to control parallelism in Rx when dealing with large volumes of event streams. The default schedulers provided by Rx, like `TaskPool` and `ThreadPool`, may not be optimal due to their initial thread creation delays.

:p What is the main issue with the default Rx schedulers for controlling degree of parallelism?
??x
The main issue is that both the TaskPool and ThreadPool schedulers start with one thread and only increase the number of threads after a 500ms delay. This can lead to suboptimal performance, especially on multi-core systems where actions are queued unnecessarily.

```fsharp
// Example code snippet showing default Rx scheduler behavior
let subscribeOnDefault = Observable.Interval(TimeSpan.FromSeconds(0.4))
                                     .SubscribeOn(ThreadPoolScheduler.Instance)
                                     .Subscribe(fun _ -> 
                                         printfn "ThreadId: %d" Thread.CurrentThread.ManagedThreadId)
```
x??

---


#### Custom Scheduler Interface for Rx
The `ParallelAgentScheduler` implements the `IScheduler` interface to integrate with Rx. This allows it to be used as a valid scheduler in Rx operations like `SubscribeOn`.

:p What does the `IScheduler` interface allow you to implement?
??x
The `IScheduler` interface allows you to define custom scheduling logic for Rx, enabling features such as `SubscribeOn`, `ObserveOn`, and other time-based operators. Implementing this interface provides control over when actions are executed based on the defined scheduler.

```fsharp
// Example of using ParallelAgentScheduler with SubscribeOn in F#
let scheduler = ParallelAgentScheduler(4)
Observable.Interval(TimeSpan.FromSeconds(0.4))
           .SubscribeOn(scheduler)
           .Subscribe(fun _ -> 
               printfn "ThreadId: %d" Thread.CurrentThread.ManagedThreadId)
```
x??

---


#### Custom Scheduler for Concurrent Programming with Rx
The `ParallelAgentScheduler` is a custom Rx scheduler that supports concurrent programming by managing the degree of parallelism. It uses an agent to coordinate and manage notifications, ensuring that tasks are executed in parallel without unnecessary delays.

:p What makes `ParallelAgentScheduler` different from default Rx schedulers?
??x
What makes `ParallelAgentScheduler` different from default Rx schedulers is its ability to provide fine-grained control over the degree of parallelism. Unlike the default schedulers which start with a single thread and only increase concurrency after a delay, `ParallelAgentScheduler` initializes its internal thread pool at startup time, reducing initial delays and improving performance on multi-core systems.

```fsharp
// Example of configuring ParallelAgentScheduler
let scheduler = ParallelAgentScheduler(4)
```
x??

---


#### Managing Concurrency with Rx
By implementing a custom scheduler like `ParallelAgentScheduler`, you can manage concurrency more effectively in Rx-based applications. This is particularly useful for large volumes of event streams where precise control over parallelism can significantly impact performance.

:p How does managing concurrency help in Rx-based applications?
??x
Managing concurrency helps in Rx-based applications by ensuring that tasks are executed efficiently without overwhelming the system resources. By controlling the degree of parallelism, you can optimize performance, reduce delays, and ensure that your application handles large volumes of data more effectively.

```fsharp
// Example usage of custom scheduler in an Rx pipeline
let scheduler = ParallelAgentScheduler(4)
Observable.Interval(TimeSpan.FromSeconds(0.4))
           .SubscribeOn(scheduler)
           .Subscribe(fun _ -> 
               printfn "ThreadId: %d" Thread.CurrentThread.ManagedThreadId)
```
x??

---

