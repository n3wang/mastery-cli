# High-Quality Flashcards: 027---Architecture-Patterns-with-Python_processed (Part 24)

**Starting Chapter:** Wrap-Up. What Have We Achieved. Why Have We Achieved

---

#### Events in Event-Driven Architecture
Events are simple dataclasses that define the data structures for inputs and internal messages within a system. They align well with Domain-Driven Design (DDD) because they often translate directly into business language, making them useful for event storming — a technique for gathering requirements and modeling domains. Events represent something that has happened in the past, and they are immutable.

:p What is the role of events in an event-driven architecture?
??x
Events serve as the core communication mechanism in an event-driven system. They are used to notify other parts of the system about changes or occurrences. In DDD, events help model the domain by capturing business-relevant facts. For example, a `BatchQuantityChanged` event might be raised when a batch's quantity is updated. Handlers react to these events and can trigger further actions or call external services. Since events are data-only structures, they promote loose coupling between components.
```java
// Example event class in Java
public class BatchQuantityChanged {
    private String batchId;
    private int newQuantity;

    public BatchQuantityChanged(String batchId, int newQuantity) {
        this.batchId = batchId;
        this.newQuantity = newQuantity;
    }

    // Getters
}
```
x??

---

#### Handlers and Single Responsibility Principle (SRP)
Handlers are components that react to events. They can interact with domain models or external services and can even raise new events. A key benefit of this approach is that it supports the Single Responsibility Principle (SRP), where each handler has one specific job. Multiple handlers can be defined for a single event, allowing for fine-grained control and modularity.

:p How do handlers enforce the Single Responsibility Principle in event-driven systems?
??x
Handlers enforce SRP by ensuring that each handler is responsible for exactly one behavior or task in response to an event. For example, one handler might update inventory, while another sends an email notification. This separation allows for easier maintenance, testing, and extension. Handlers can also raise new events, enabling cascading effects without violating SRP.
```java
// Example handler in Java
public class InventoryUpdateHandler {
    public void handle(BatchQuantityChanged event) {
        // Update inventory logic
    }
}

public class NotificationHandler {
    public void handle(BatchQuantityChanged event) {
        // Send email notification
    }
}
```
x??

---

#### Commands vs Events
While events represent what has happened, commands represent intentions or requests to perform an action. In early stages of learning, it may seem like some events resemble commands, but they serve different purposes. Commands are typically sent to a command handler to initiate a process, while events are broadcasted after something has already occurred.

:p How do commands differ from events in event-driven systems?
??x
Commands are requests to perform an action, usually sent to a command handler. Events, on the other hand, are notifications that something has already happened. For example, a `PlaceOrderCommand` would be handled to initiate an order process, whereas an `OrderPlacedEvent` would be raised once the order is successfully placed. Commands are about intention, while events are about fact.
```java
// Example command
public class PlaceOrderCommand {
    private String orderId;
    private List<Item> items;

    public PlaceOrderCommand(String orderId, List<Item> items) {
        this.orderId = orderId;
        this.items = items;
    }
}

// Example event
public class OrderPlacedEvent {
    private String orderId;
    private LocalDateTime timestamp;

    public OrderPlacedEvent(String orderId, LocalDateTime timestamp) {
        this.orderId = orderId;
        this.timestamp = timestamp;
    }
}
```
x??

---

#### Singleton Pattern in Message Bus Implementation
In some implementations, a message bus may use a singleton pattern to ensure a single instance exists throughout the application. This can simplify access and management of the bus.

:p How is the singleton pattern applied in a message bus implementation?
??x
The singleton pattern ensures that only one instance of the message bus exists in the application. This allows centralized handling of events and makes the system easier to manage. It avoids duplication and ensures consistency in event routing. In Python, this might be implemented using a module-level instance or a class with a private constructor and a static getter.
```python
# Pseudocode for a singleton message bus
class MessageBus:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def publish(self, event):
        # Handle event
        pass
```
x??

---

#### Commands vs Events in System Design
In system design, commands and events are both types of messages used to communicate between components, but they serve different purposes. Commands represent an intent to perform an action and are sent from one actor (e.g., a user or API) to another specific actor (e.g., a domain handler). They are usually named using imperative verb phrases like "allocate stock" or "create batch." Events, on the other hand, represent something that has already happened and are broadcast to all interested listeners. They are typically named with past-tense verb phrases like "order allocated to stock" or "shipment delayed." Commands express intent and require error handling, while events capture facts and should not depend on receiver success or failure.

:p What is the main difference between commands and events?
??x
Commands are sent with the expectation that a specific action will happen as a result, and they are directed to a single recipient. They express intent and must handle errors gracefully. Events, however, are broadcast to all interested listeners after an action has already occurred. They represent facts about what happened and do not require error handling from the sender because the sender doesn’t know who will process them.
x??

---

#### Command Structure in Domain Layer
In the domain layer, commands are typically implemented as simple data structures, often using classes or dataclasses. These structures hold the necessary data required to execute a command. For example, an `Allocate` command might include fields like `orderid`, `sku`, and `qty`. Commands are handled by a message bus or command handler, which processes them and may generate events if the operation succeeds. Commands are designed to be immutable and lightweight, focusing on capturing the intent rather than complex logic.

:p How are commands structured in the domain layer?
??x
Commands are usually structured as data classes or simple objects that encapsulate the data needed to perform an action. For example, in Python using `@dataclass`, a command like `Allocate` might look like:
```python
@dataclass
class Allocate(Command):
    orderid: str
    sku: str
    qty: int
```
This structure allows for easy serialization, testing, and passing around within the system without complex logic.
x??

---

#### Handling Commands with Message Bus
Commands are handled using a message bus or command dispatcher, similar to how events are handled. However, commands are processed with slightly different rules than events. For instance, when a command is received, it must be routed to the correct handler that understands how to execute it. Unlike events, which are broadcast to all listeners, commands are sent to a single handler. The command handler processes the command, performs the necessary domain logic, and may emit events upon successful completion. This pattern enables decoupling between the API layer and domain logic.

:p How are commands handled in a message bus system?
??x
Commands are routed to specific handlers based on their type. When a command like `CreateBatch` is received, it is dispatched to a corresponding handler function such as `handle_create_batch`. This handler performs the required domain logic and can emit events like `BatchCreated` upon success. The key difference from events is that commands are consumed once by a single handler, whereas events are broadcast to multiple listeners.
x??

---

#### Example Command: CreateBatch
The `CreateBatch` command represents an intent to create a new batch in the system. It includes fields such as `ref` (reference), `sku` (stock keeping unit), `qty` (quantity), and optionally `eta` (estimated time of arrival). This command replaces the `BatchCreated` event previously used in the system. By converting this event into a command, the system enforces a clearer separation between input and processing logic. Commands like `CreateBatch` are sent to the appropriate handler that creates the batch in the domain model and may emit events like `BatchCreated` upon success.

:p What does the `CreateBatch` command represent in the system?
??x
The `CreateBatch` command represents the intent to create a new batch in the system. It contains information such as:
```python
@dataclass
class CreateBatch(Command):
    ref: str
    sku: str
    qty: int
    eta: Optional[date] = None
```
It replaces the older `BatchCreated` event, which was used as an input but not as an instruction. Now, the system explicitly sends a command to create the batch, making the intent clearer and aligning with command handling principles.
x??

---

#### Command Handler Pattern Overview
A command handler is responsible for executing a command and performing the necessary business logic. It typically receives a command object, validates it, performs operations (like updating the domain model), and may emit events if the command succeeds. Command handlers are often part of a larger message bus system where commands are dispatched to the appropriate handler. Unlike event handlers, which are triggered by events, command handlers are invoked directly by the system upon receiving a command.

:p What role does a command handler play in a system?
??x
A command handler processes a command by executing the required business logic. It receives a command object, performs validation, updates the domain model, and may emit events upon successful completion. For example:
```python
def handle_allocate(command: Allocate):
    # Validate command
    # Perform allocation logic
    # Emit AllocationCompleted event
```
Command handlers are part of a message bus system and differ from event handlers in that they are invoked directly rather than being triggered by events.
x??

---

#### Difference Between Command and Event Naming Conventions
Commands are named using imperative mood verb phrases, such as "allocate stock" or "create batch", indicating an action that should be performed. Events, conversely, are named with past-tense verb phrases like "order allocated to stock" or "shipment delayed", reflecting something that has already occurred. This naming convention helps distinguish between the intent (command) and the outcome (event) in the system.

:p Why do commands and events use different naming conventions?
??x
Commands use imperative verb phrases (e.g., "allocate stock") to express intent — what should happen next. Events use past-tense verb phrases (e.g., "order allocated to stock") to reflect what already happened. This distinction makes it clear whether a message is a request to perform an action or a notification that an action has taken place. It also helps in debugging and understanding the flow of logic in the system.
x??

---

#### Command vs Event Error Handling
Commands must be handled with error handling because the sender expects a result. If a command fails, the sender needs to be informed of the failure so it can respond accordingly. For example, a failed allocation command might return an error indicating insufficient stock. Events, however, are broadcast and do not expect a response. Even if a listener fails to process an event, the sender does not need to know, as events are meant to propagate knowledge, not enforce actions.

:p How does error handling differ between commands and events?
??x
Commands require error handling since the sender expects a response or result. If a command fails, the sender must be notified, e.g., via an error message like "insufficient stock". Events, on the other hand, are broadcast to multiple listeners without expecting a response. If one listener fails, the others continue processing, and the sender doesn't care about individual listener failures.
x??

---

#### Command Handling in a Message Bus System
In a message bus system, commands are dispatched to their respective handlers using a mapping mechanism. For example, when a `CreateBatch` command is received, the system routes it to the `handle_create_batch` function. This handler performs the required logic, such as creating a new batch in the repository, and may emit events like `BatchCreated`. This architecture ensures that commands are processed consistently and that domain logic is separated from the API or interface layer.

:p How is a command routed to its handler in a message bus system?
??x
In a message bus system, commands are routed to handlers using a dispatcher that maps command types to handler functions. For instance:
```python
def dispatch(command):
    if isinstance(command, CreateBatch):
        return handle_create_batch(command)
```
This pattern allows for loose coupling between components and ensures that commands are processed by the correct logic.
x??

---

#### Event vs Command Handling in Message Bus
In a message bus system, events and commands are treated differently to reflect their distinct roles in the system. Events represent something that has already happened and are typically used for notification and triggering side effects, whereas commands represent an intent to change state. This distinction influences how exceptions are handled during processing.

:p What is the key difference in how events and commands are handled in the message bus?
??x
Events are processed by delegating to multiple handlers, but any exceptions during handling are caught and logged without interrupting the flow of message processing. Commands, on the other hand, propagate exceptions upward so that failures in command execution halt further processing. This design allows events to be resilient and not block the system, while commands enforce strict error handling and propagation.
x??

---

#### Message Bus Entry Point
The message bus has a single entry point, `handle`, which accepts either a command or an event. This function determines the type of message and routes it to the appropriate handler logic—either `handle_event` or `handle_command`.

:p How does the main `handle` function determine whether to process a message as an event or a command?
??x
The `handle` function uses `isinstance(message, events.Event)` and `isinstance(message, commands.Command)` checks to route messages correctly. It ensures that all messages are either events or commands, raising an exception otherwise. The logic is straightforward: if it's an event, call `handle_event`; if it's a command, call `handle_command`.
x??

---

#### Handling Events in Message Bus
Events are designed to be non-blocking and must not interrupt the flow of message processing. When an event is received, it is dispatched to multiple registered handlers. Any exceptions raised during event handling are caught, logged, and ignored, allowing processing to continue uninterrupted.

:p Why are exceptions in event handlers caught and ignored?
??x
Exceptions in event handlers are caught and ignored because events represent past occurrences and are used for notification or triggering side effects. Allowing an exception in one handler to stop the processing of other handlers ensures that the system remains resilient and continues to process subsequent messages. This pattern supports loose coupling and fault tolerance.
x??

---

#### Handling Commands in Message Bus
Commands represent actions that should be executed, and any failure during command execution should halt further processing. Therefore, exceptions raised during command handling are re-raised, causing the system to stop processing the current message and potentially roll back changes.

:p How does the command handler differ from the event handler in terms of exception handling?
??x
The command handler does not catch exceptions; instead, it allows them to propagate upward. This behavior enforces that if a command fails, the system should not proceed with further processing. In contrast, event handlers catch and ignore exceptions to maintain system stability and ensure that one failing handler does not prevent others from running.
x??

---

#### Event Handler Logic
Event handlers are registered in `EVENT_HANDLERS[type(event)]`, which is a mapping from event types to lists of functions that handle them. Each handler is executed, and after execution, new events collected from the unit of work are added to the queue for further processing.

:p What happens after an event handler completes its execution?
??x
After an event handler completes, any new events collected from the unit of work (`uow.collect_new_events()`) are added to the message queue for further processing. This allows event handlers to generate additional messages, creating a chain of processing that can respond dynamically to changes in state.
x??

---

#### Command Handler Logic
Command handlers are mapped by type in `COMMAND_HANDLERS[type(command)]`. The result of the handler is returned, and new events from the unit of work are added to the queue for processing. Since commands are meant to cause a change, their result is returned to the caller.

:p What is returned by the command handler after processing?
??x
The command handler returns the result of executing the command. This result may be used by the caller to determine the outcome of the operation, such as whether it succeeded or failed. Additionally, any new events generated during command execution are added to the message queue for further processing.
x??

---

#### Union Type for Message Handling
The `Message` type is defined as a union of `commands.Command` and `events.Event`. This allows the message bus to accept both types of messages through a single interface, simplifying the design and ensuring type safety.

:p Why is `Message` defined as a union of `Command` and `Event`?
??x
Defining `Message` as `Union[commands.Command, events.Event]` allows the message bus to treat both commands and events uniformly in its interface, while still routing them to the appropriate processing logic. This abstraction simplifies the API and enforces a clear separation of concerns between command and event handling.
x??

---

---

