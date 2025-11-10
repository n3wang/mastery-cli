# High-Quality Flashcards: Sam-Newman---Building-Microservices-OReilly-Media-2015_processed (Part 6)


**Starting Chapter:** Downsides to REST Over HTTP

---


#### REST Frameworks and Overhead
Background context explaining the trade-offs when using REST frameworks, including potential coupling issues.

:p What are some downsides to using REST frameworks like Spring Boot?
??x
While REST frameworks can simplify development and reduce boilerplate code, they often come with a set of assumptions that can lead to tight coupling between the service implementation and its external interface. For example, some frameworks might promote directly exposing database representations as API endpoints without proper abstraction.

This approach can cause problems later on when you need to change the internal data structures or storage mechanisms, as it locks you into specific implementations too early in the development process.

Example of tight coupling:
```java
@RestController
public class UserResource {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users")
    public List<User> getUsers() {
        return userRepository.findAll();
    }
}
```
In this example, the `UserRepository` directly interacts with a database, making changes to storage mechanisms harder.

A better approach would be to abstract data access and expose only necessary interfaces:
```java
@RestController
public class UserResource {
    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public List<UserDto> getUsers() {
        return userService.getAllUsers();
    }
}
```
x??

---


#### HTTP Overhead
Background context explaining the potential overhead of using REST over HTTP, especially in scenarios requiring low latency.

:p Why might REST over HTTP be a poor choice for low-latency communications?
??x
REST over HTTP can introduce significant overhead due to its reliance on the full HTTP protocol stack. Each request incurs a round-trip time that includes:

1. **HTTP Handshake**: Establishing a connection and negotiating headers.
2. **Serialization/Deserialization Overhead**: Converting between different data formats (e.g., JSON, XML).
3. **Security Headers**: Including authentication and authorization checks.

These overheads can be substantial in scenarios where extremely low-latency or small message sizes are critical.

For example, consider a WebSocket scenario:
```java
@ServerEndpoint("/websocket")
public class WebSocketHandler {
    @OnOpen
    public void onOpen(Session session) {
        System.out.println("New client connected: " + session.getId());
    }

    @OnMessage
    public String handleMessage(String message) {
        // Process and return the message
        return "Echo: " + message;
    }
}
```
In this case, WebSockets provide a more efficient way to stream data directly between client and server without the overhead of HTTP.

x??

---

---


#### Message Broker Overview
Message brokers like RabbitMQ serve as intermediaries between producers and consumers of events. They handle subscriptions, ensuring that consumers are informed when an event arrives. Brokers can also manage state, such as tracking which messages a consumer has already seen.

:p What is the role of message brokers in asynchronous communication?
??x
Message brokers act as intermediaries for publishing and subscribing to events. They help ensure that producers can send events and consumers can be notified about those events efficiently. Additionally, they handle state management, keeping track of what messages have been consumed by each subscriber.

For example, consider a scenario where an order is placed in an e-commerce system:
- A message broker could be used for the order service to emit an event when an order is created.
- Other services (such as inventory or email notification) can subscribe to this event and take appropriate actions.

```java
// Pseudocode example of emitting an event using a message broker
public class OrderService {
    private MessageBroker messageBroker;

    public void createOrder(Order order) {
        // Emit the event through the message broker
        messageBroker.publish("order.created", order);
    }
}

// Example subscription in another service to consume events
public class InventoryService {
    private MessageBroker messageBroker;
    private Set<String> seenOrders = new HashSet<>();

    public void subscribeToOrderEvents() {
        // Subscribe to specific event types
        messageBroker.subscribe("order.created", this::handleOrderCreated);
    }

    private void handleOrderCreated(Order order) {
        if (!seenOrders.contains(order.getId())) {
            // Process the order only once
            seenOrders.add(order.getId());
            // Update inventory or perform other actions
        }
    }
}
```
x??

---


#### Competing Consumer Pattern in ATOM
The Competing Consumer pattern involves bringing up multiple worker instances to compete for messages. This approach is useful for scaling the number of workers to handle a list of independent jobs, but it introduces complexity if shared state needs to be managed.

:p How does the Competing Consumer pattern work with ATOM events?
??x
In the Competing Consumer pattern, you bring up multiple worker instances that can all compete for messages. This is useful when you need to scale the number of workers to handle a list of independent jobs efficiently. However, if two or more consumers see the same message, it could lead to redundant processing.

With ATOM, this means managing shared state among all the competing consumers to reduce the likelihood of duplicate work. For example, each consumer needs to keep track of which messages have already been processed and avoid reprocessing them.

```java
// Pseudocode example of implementing Competing Consumer with ATOM
public class WorkerService {
    private MessageBroker messageBroker;
    private Set<String> seenMessages = new HashSet<>();

    public void startConsuming() {
        // Subscribe to the event feed
        messageBroker.subscribe("event.feed", this::processEvent);
    }

    private void processEvent(Event event) {
        if (!seenMessages.contains(event.getMessageId())) {
            // Mark as processed before handling
            seenMessages.add(event.getMessageId());
            handleEvent(event);
        }
    }

    private void handleEvent(Event event) {
        // Process the event
        System.out.println("Handling event: " + event.getType() + ", ID: " + event.getMessageId());
        // Perform necessary actions for this event
    }
}

// Example of how workers are started and compete for events
public class Application {
    public static void main(String[] args) {
        List<WorkerService> workers = new ArrayList<>();
        
        for (int i = 0; i < numberOfWorkers; i++) {
            WorkerService worker = new WorkerService();
            // Start the worker to consume events
            worker.startConsuming();
            workers.add(worker);
        }
    }
}
```
x??

---

---


---
#### Asynchronous Architecture Complexity
Background context: Asynchronous architectures, such as event-driven systems, can offer decoupled and scalable solutions but introduce complexities that need careful management. These complexities include handling long-running requests, managing message queues, and ensuring reliable processing of messages.

:p What are some challenges associated with asynchronous architectures?
??x
Challenges in asynchronous architectures include:
- Managing long-running async requests: Determining what to do when a response comes back, especially if the original node is no longer available.
- Handling competing consumer patterns: Workers may crash or fail to process messages correctly, leading to potential deadlocks and retry issues.
- Ensuring reliable message processing: Implementing mechanisms like dead letter queues (DLQ) for failed messages.

Code examples:
```java
// Pseudocode for handling a long-running async request
public void handleRequestAsync(String request) {
    try {
        // Logic to initiate the async process
        Future<String> result = processAsync(request);
        
        // Logic to handle the response when it comes back
        String response = result.get();
        log.info("Received response: " + response);
    } catch (ExecutionException | InterruptedException e) {
        log.error("Error processing request", e);
    }
}
```
x??

---


#### Catastrophic Failover Example
Background context: The author provides a real-world example from 2006 involving a bank's pricing system, which demonstrates the challenges of asynchronous architectures. A bug caused workers to crash repeatedly due to unhandled messages in a transacted queue.

:p What is a catastrophic failover and how did it manifest in this case?
??x
A catastrophic failover refers to a situation where a message processing system fails repeatedly, leading to continuous retries that can cause more issues. In the example provided:
- A bug caused certain pricing requests to crash workers.
- Transacted queues led to locks timing out and messages being re-added to the queue.
- Other workers would then pick up these failed messages and crash again, creating a cycle.

The issue was resolved by fixing the bug, setting retry limits, and implementing a message hospital (dead letter queue) for failed messages:
```java
// Pseudocode for handling dead letter queues
public void handleFailedMessage(String message) {
    // Check if maximum retries have been reached
    if (!messageProcessor.reachedMaxRetries(message)) {
        messageHospital.enqueue(message);
        log.warn("Failed to process message, enqueuing in hospital: " + message);
    } else {
        log.error("Exceeded max retries for message: " + message);
    }
}
```
x??

---


#### Importance of Monitoring and Correlation IDs
Background context: The author emphasizes the importance of having good monitoring tools and using correlation IDs to trace requests across different processes. This is crucial in complex, asynchronous systems.

:p Why are monitoring tools and correlation IDs important in asynchronous architectures?
??x
Monitoring tools help track system performance, detect failures, and ensure that all components are functioning correctly. Correlation IDs allow tracing of individual requests through a system, even when they span multiple services or processes.

For example:
- Monitoring can help identify patterns in failures, resource usage, and latency.
- Correlation IDs can be used to log and trace the flow of messages across different components.

```java
// Example of using correlation IDs for logging
public void processRequest(String request) {
    String corrId = UUID.randomUUID().toString();
    log.info("Processing request [id: " + corrId + ", request: " + request + "]");
    
    try {
        // Process the request asynchronously
        processAsync(request, corrId);
    } catch (Exception e) {
        log.error("Failed to process request [id: " + corrId + "]", e);
    }
}
```
x??

---

---

