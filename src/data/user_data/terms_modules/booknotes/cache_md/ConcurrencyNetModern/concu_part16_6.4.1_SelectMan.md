# High-Quality Flashcards: ConcurrencyNetModern_processed (Part 16)


**Starting Chapter:** 6.4.1 SelectMany the monadic bind operator

---


---
#### Cold and Hot Observables
Background context: In reactive programming, observables can be categorized into two types—hot and cold. A hot observable emits data regardless of whether there are any subscribers, making it suitable for streams like a continuous Twitter feed. Conversely, a cold observable starts emitting data only when a subscriber is added.

:p What distinguishes a hot observable from a cold observable?
??x
A hot observable always emits data continuously even if no subscribers are present, whereas a cold observable only starts emitting data once there are active subscribers.
x??

---


---
#### Publish/Subscribe Pattern Overview
The Publish/Subscribe (Pub/Sub) pattern allows any number of publishers to communicate with any number of subscribers asynchronously via an event channel. This is achieved through an intermediary hub that receives notifications from publishers and forwards them to subscribers.
:p What does the Pub/Sub pattern enable in terms of communication?
??x
The Pub/Sub pattern enables asynchronous communication between multiple publishers and subscribers, where a publisher can send notifications, and one or more subscribers can receive these notifications without needing to know about each other directly. The intermediary hub, known as a broker, manages this communication.
x??

---


#### Role of Subject in Rx
In the context of reactive extensions (Rx), a `Subject` acts as both an observer and an observable. This duality makes it ideal for implementing Pub/Sub patterns since it can both consume notifications from publishers and broadcast these to subscribers.
:p How does a Subject act in the context of Rx?
??x
A Subject implements the `IObservable` and `IObserver` interfaces, allowing it to act as both an observer (consuming notifications) and an observable (broadcasting notifications). This duality is crucial for managing events and notifications efficiently within the Pub/Sub model.
x??

---


#### Implementing Custom Subjects
While Rx provides built-in implementations of subjects, you can also create custom ones by implementing the `ISubject` interface. The key requirement is to satisfy the methods defined in this interface.
:p How can one implement a custom subject in Rx?
??x
To implement a custom subject in Rx, you need to define a class that satisfies the `ISubject` interface. This involves implementing the `OnNext`, `OnError`, and `OnCompleted` methods for handling notifications from observers. Additionally, you may also need to manage state if your implementation requires it.
```csharp
public class CustomSubject<T> : ISubject<T>
{
    public void OnNext(T value)
    {
        // Handle the incoming notification
    }

    public void OnError(Exception error)
    {
        // Handle an error condition
    }

    public void OnCompleted()
    {
        // Notify that no further notifications will be sent
    }
}
```
x??

---


#### Subject as a Publisher-Subscriber Hub
A `Subject` can act as a hub in the Pub/Sub pattern, intercepting and broadcasting notifications. It allows for complex logic such as merging or filtering of events before they are published.
:p How does a `Subject` function as a publisher-subscriber hub?
??x
A `Subject` functions by acting as both an observer (listening for notifications) and an observable (broadcasting those notifications). This dual role enables it to intercept and process events, applying logic such as merging or filtering before forwarding them to all subscribed observers.
x??

---


#### Using Subjects with IObservable and IObserver Interfaces
The `ISubject` interface combines the functionalities of `IObserver` and `IObservable`. It provides methods like `OnNext`, `OnError`, and `OnCompleted` for handling notifications, making it a versatile component in event-driven architectures.
:p What interfaces does `Subject<T>` implement?
??x
`Subject<T>` implements both `IObserver<T>` and `IObservable<T>`, providing the necessary methods to handle events as an observer (listening) and broadcast them as an observable (publishing). This duality allows for flexible event handling within Rx.
```csharp
interface ISubject<T, R> : IObserver<T>, IObservable<R>
{
    // Implementation details
}
```
x??

---

---


---
#### ReplaySubject Behavior
ReplaySubject acts like a normal Subject but stores all messages received. This allows it to provide these messages to current and future subscribers, making it useful when you need to send historical data to new subscribers.
:p What is ReplaySubject's primary feature?
??x
ReplaySubject retains all the messages received and makes them available for both current and future subscribers, providing a history of events.
x??

---


#### Hot vs Cold Observables
Hot observables continue emitting events even when there are no active subscribers. They are "always on," similar to a mouse movement event where continuous notifications occur regardless of listener presence.
:p What is a key characteristic of hot observables?
??x
A key characteristic of hot observables is that they emit notifications continuously, irrespective of whether any observers are currently subscribed.
x??

---


#### Rx Framework Concurrency Model
The Rx framework operates on a push model and supports multithreading but is single-threaded by default. To enable parallel execution, you must use specific Rx schedulers to control thread usage.
:p What does the Rx framework do regarding concurrency?
??x
Rx is based on a push model with support for multithreading but runs single-threaded by default. Enabling concurrency requires using Rx schedulers to manage threads and combine asynchronous sources effectively.
x??

---


#### Parallel Constructs in Rx
Parallel constructs in Rx programming allow you to combine multiple asynchronous sources, making it easier to handle and coordinate events from different independent tasks or computations.
:p What is the purpose of parallel constructs in Rx?
??x
The purpose of parallel constructs in Rx is to facilitate the combination of multiple asynchronous sources, enabling efficient handling and coordination of events from separate and concurrent tasks.
x??

---


#### Observables and Concurrent Tasks
Observables and observers handle asynchronous operations within a sequence using a push model. They can manage high-concurrency computations by directing incoming messages to specific threads.
:p How do observables deal with concurrency?
??x
Observables and observers manage asynchronous operations by pushing notifications in a sequence, allowing for the handling of high-concurrency tasks through thread-specific flow control.
x??

---


#### Subject Type Handling
The Subject type is hot, which means it can lose messages when there are no subscribers. Careful consideration must be given to choosing between types like ReplaySubject, BehaviorSubject, and AsyncSubject based on whether historical data or the latest value is needed.
:p What is a potential downside of using Subjects?
??x
A potential downside of using Subjects is that they can lose notifications if there are no active subscribers at the time of emission. This makes them "hot," meaning they continue emitting events even without listeners, potentially leading to missed messages.
x??

---

---


#### Rx Framework and Schedulers
Background context: The Reactive Extensions (Rx) framework in .NET provides a powerful set of operators for working with asynchronous data streams. One key feature is its ability to handle concurrency through schedulers, which can run operations on different threads.

:p What are schedulers in the Rx framework?
??x
Schedulers in the Rx framework manage and control how and when asynchronous operations execute. They abstract the underlying threading model, allowing developers to focus on the logic rather than the thread management details. Schedulers handle tasks such as scheduling events, performing task cancellation, error handling, and passing state between operations.
x??

---


#### SubscribeOn Method
Background context: The `SubscribeOn` method in Rx is used to specify which scheduler should be used for queuing messages that run on a different thread.

:p What does the `SubscribeOn` method do?
??x
The `SubscribeOn` method specifies the Scheduler to use when scheduling and running the operations that subscribe to an observable. This allows you to control where in the application's threading model the subscriptions should occur, ensuring efficient handling of asynchronous data streams.
x??

---


#### ObserveOn Method
Background context: The `ObserveOn` method determines which thread or synchronization context the callback function will be run in.

:p What does the `ObserveOn` method do?
??x
The `ObserveOn` method specifies the Scheduler to use for running the observable's notifications and output messages. It is particularly useful for UI programming, as it ensures that updates to the user interface are performed on the correct thread, avoiding cross-thread operation issues.
x??

---


#### RxPubSub Class Implementation
Background context: The `RxPubSub` class provides a reusable generic publisher-subscriber hub using Rx.

:p What does the `RxPubSub` class do?
??x
The `RxPubSub` class implements a reactive publisher-subscriber mechanism in C#. It uses Rx's `Subject` to subscribe and route values to observers, allowing multicasting notifications from sources to multiple subscribers. This implementation simplifies event handling by abstracting away much of the threading complexity.
x??

---


#### Subject Class Usage
Background context: The `Subject<T>` class is a concrete subject that can be subscribed to and also emits notifications.

:p How does the `RxPubSub` class use the `Subject<T>`?
??x
The `RxPubSub` class uses the `Subject<T>` to handle subscriptions and routing of values. When an observer subscribes, it registers with both the internal list of observers and the `Subject`. The `Subject` then dispatches notifications to all registered observers.
```csharp
public IDisposable Subscribe(IObserver<T> observer)
{
    observers.Add(observer);
    subject.Subscribe(observer);
    return new Subscription<T>(observer, observers);
}
```
x??

---


#### Observable Pipeline Control
Background context: The `RxPubSub` class provides methods to manage subscriptions and ensure proper threading for both subscription and observation.

:p How can the `RxPubSub` control which threads run in each step of an observable pipeline?
??x
The `RxPubSub` class controls the threads by using the `SubscribeOn` and `ObserveOn` operators. These operators allow you to specify different schedulers for handling subscriptions (where messages are queued) and observations (where output messages are processed). By combining these methods, you can precisely control the threading context in your observable pipeline.
x??

---

---


---
#### RxPubSub Class Overview
The `RxPubSub` class is designed to facilitate event-driven programming using reactive extensions (Rx). It allows for subscription and unsubscription of observers, making it easier to handle asynchronous events. The class maintains state through private fields such as a `Subject`, an `observers` collection, and a `subscribed observables` list.

The primary constructor initializes the subject with either a default or specified one, ensuring that no direct manipulation can alter the internal state of the Subject. Additionally, it provides methods to manage subscriptions and unsubscriptions:

- **Dispose**: Invokes `OnCompleted` on the observer and removes it from the observers collection.
- **AsObservable**: Exposes the observable interface for applying high-order operations.

:p What is the purpose of the RxPubSub class?
??x
The purpose of the RxPubSub class is to provide a framework for implementing publish-subscribe pattern in C#, leveraging the power of reactive extensions (Rx). It allows for easy subscription and unsubscription of observers, managing their state through internal collections while ensuring encapsulation of the Subject.

```csharp
public class RxPubSub<T> : IDisposable
{
    private readonly Subject<T> subject;
    private readonly List<Subscription> observers = new List<Subscription>();
    private readonly List<IDisposable> observables = new List<IDisposable>();

    public RxPubSub(ISubject<T> subject) => this.subject = subject;

    // Other methods and properties...
}
```
x??

---


#### Subject State Management
In the `RxPubSub` class, the state of observers is managed through a private `observers` collection. Each observer has its own `Subscription`, which can be unsubscribed from by calling `Dispose`. This ensures that when an observer no longer needs to receive updates, it can be removed without affecting other observers.

The `subscribed observables` list maintains references to the interfaces implementing `IDisposable`, allowing for unregistration of these subscriptions as well.

:p How does the RxPubSub class manage the state of observers?
??x
The `RxPubSub` class manages the state of observers by maintaining a list of subscriptions (`observers`) and disposable observables. When an observer subscribes, it gets added to the `observers` collection with its corresponding `Subscription`. Similarly, when an observable is registered through the `AddPublisher` method, it's added to the `subscribed observables` list.

To unsubscribe, the `Dispose` method on a specific subscription or observable is called. This method invokes `OnCompleted` on the observer and removes it from the `observers` collection, ensuring that no more notifications are sent to it.

```csharp
public void Dispose()
{
    observer.OnCompleted();
    observers.Remove(observer);
}
```
x??

---


#### Tweet Emotion Observable Implementation
In Listing 6.7, the `tweetEmotionObservable` function is implemented using the `Observable.Create` factory operator in F#. It creates an observable that processes a stream of tweet emotions by filtering, grouping, and mapping operations.

The function initializes Twitter credentials, starts the stream, filters tweets based on language, groups them by emotion, and maps each group to a `TweetEmotion` object before pushing it to the observer using `OnNext`.

:p How is the `tweetEmotionObservable` implemented in F#?
??x
In Listing 6.7, the `tweetEmotionObservable` function is implemented using the `Observable.Create` factory operator in F#. It creates an observable that processes a stream of tweet emotions by filtering, grouping, and mapping operations.

The implementation involves:

1. Initializing Twitter credentials.
2. Starting the stream with low-level filtering.
3. Filtering tweets to only include English language ones.
4. Grouping tweets by their evaluated emotion.
5. Mapping each group to a `TweetEmotion` object.
6. Pushing each processed tweet emotion to the observer using `OnNext`.

Here's the code snippet in detail:

```fsharp
let tweetEmotionObservable(throttle: TimeSpan) =
    Observable.Create(fun (observer: IObserver<_>) ->
        let cred = new TwitterCredentials(consumerKey, consumerSecretKey, accessToken, accessTokenSecret)
        let stream = Stream.CreateSampleStream(cred)

        stream.FilterLevel <- StreamFilterLevel.Low
        stream.StartStreamAsync() |> ignore

        stream.TweetReceived
        |> Observable.throttle(throttle) 
        |> Observable.filter(fun args -> 
            args.Tweet.Language = Language.English)
        |> Observable.groupBy(fun args ->
            evaluateEmotion args.Tweet.FullText)
        |> Observable.selectMany(fun args ->
            args |> Observable.map(fun tw ->
                TweetEmotion.Create tw.Tweet args.Key))
        |> Observable.subscribe(observer.OnNext)
    )
```
x??

---

