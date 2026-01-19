# High-Quality Flashcards: 027---Architecture-Patterns-with-Python_processed (Part 20)

**Starting Chapter:** The Model Records Events. The Message Bus Maps Events to Handlers

---

#### Domain Events
Domain events are simple data structures that represent facts about things that have happened in the domain model. They are value objects without behavior, named in the language of the domain, and used to decouple the core logic from side effects like sending emails. These events are raised by aggregates (like `Product`) when certain conditions occur, such as running out of stock.

:p What is the purpose of domain events in a domain model?
??x
Domain events allow the domain model to record occurrences without embedding implementation details. Instead of directly invoking side-effect operations like sending emails, the model raises events. This promotes separation of concerns and aligns with the dependency inversion principle, where the service layer depends on abstractions rather than concrete implementations. For example, when a `Product` cannot allocate a batch, it raises an `OutOfStock` event, which is then handled separately by a message bus.
x??

---

#### Message Bus Pattern
A message bus is a simple publish-subscribe system that maps events to handler functions. It maintains a dictionary mapping event types to lists of handlers. When an event is published, the bus iterates through all registered handlers for that event type and invokes them. This pattern enables loose coupling between the domain logic and external operations like notifications.

:p How does a message bus work in the context of domain events?
??x
The message bus uses a dictionary to map event types to handler functions. For instance, when an `OutOfStock` event is published, the bus finds all handlers registered for that event type and executes them. The structure looks like:
```python
HANDLERS = {
    events.OutOfStock: [send_out_of_stock_notification],
}
```
Each handler receives the event object and performs the necessary action, such as sending an email. This keeps the domain logic clean and separates concerns.
x??

---

#### Event Handling in Aggregate
In the domain model, aggregates (like `Product`) maintain a list of events they have raised. When a business rule is violated — such as attempting to allocate more stock than available — the aggregate appends an appropriate event to its `.events` list instead of raising an exception. This approach avoids using exceptions for control flow and makes the event handling explicit.

:p Why do we store events in the aggregate and not raise exceptions directly?
??x
Using exceptions for control flow is considered a code smell. By storing events in the aggregate, we decouple the domain logic from side effects. The event acts as a signal that something significant occurred in the domain. For example, if a product can't fulfill an order due to lack of stock, it raises an `OutOfStock` event instead of throwing an exception. This design makes it easier to reason about the system and supports the unit of work pattern later on.
x??

---

#### OutOfStock Event Example
An `OutOfStock` event is defined as a dataclass inheriting from a base `Event` class. It contains only the necessary data, such as the SKU of the item that ran out of stock. It is used to signal that an allocation attempt failed and triggers a notification mechanism through the message bus.

:p What does an `OutOfStock` event look like in code?
??x
```python
from dataclasses import dataclass

@dataclass
class OutOfStock(Event):
    sku: str
```
This event is raised by the `Product` aggregate when allocation fails. It contains minimal information — just the SKU — and serves as a signal for downstream handlers (e.g., to send an email). The event is stored in the aggregate’s `.events` list, which is later processed by the message bus.
x??

---

#### Separation of Concerns with Events
The use of domain events enforces a clear separation between the core business logic and external side effects. The domain model focuses on enforcing business rules, while the message bus handles notifications or other actions triggered by those events. This ensures that the service layer remains free of implementation details and adheres to the dependency inversion principle.

:p How do domain events support the dependency inversion principle?
??x
By raising events instead of directly calling external services, the domain model depends only on abstractions (the event types), not on concrete implementations. The actual handling of events (e.g., sending emails) is delegated to the message bus, which can be changed independently. This allows the service layer to remain unaware of how notifications are sent, promoting modularity and testability.
x??

---

#### Handling Events in Unit of Work
In the context of the Unit of Work pattern, events are typically handled after a transaction completes. The aggregate raises events during its operations, and the unit of work collects these events and forwards them to the message bus. This ensures that all domain changes are committed before any side effects are triggered, maintaining consistency.

:p What role does the Unit of Work play in handling domain events?
??x
The Unit of Work collects events raised by aggregates during a transaction and forwards them to the message bus after the transaction is committed. This ensures that domain changes are persisted before any side effects occur, preventing partial updates or inconsistent states. It also allows for better error handling and rollback strategies.
x??

---

#### Message Bus Implementation Details
The message bus implementation uses a dictionary (`HANDLERS`) to associate event types with their corresponding handler functions. It supports only synchronous execution of handlers, which is sufficient for conceptual separation and small units of work. Parallelism is not required but could be added if needed later.

:p What are the key components of a simple message bus implementation?
??x
A simple message bus includes:
1. A dictionary mapping event types to lists of handler functions.
2. A `handle(event)` function that iterates over registered handlers for a given event.
3. Handlers that process the event (e.g., send an email).

Example:
```python
def handle(event: events.Event):
    for handler in HANDLERS[type(event)]:
        handler(event)

HANDLERS = {
    events.OutOfStock: [send_out_of_stock_notification],
}
```
This design keeps the system modular and easy to extend.
x??

---

#### Event-Driven Architecture in Python Services
In Python-based applications, especially those using domain-driven design (DDD), event-driven architecture allows decoupling of components by having domain models raise events that are then handled asynchronously. This approach is different from Celery, which uses a function-based task distribution model. Instead, the event bus model aligns more with Node.js or actor frameworks, where events propagate through a system and are processed by handlers.

:p What is the primary difference between Celery and an event-based message bus?
??x
Celery distributes tasks using a function name and arguments, which is Python-specific and less flexible. In contrast, an event-based message bus allows for broader distribution and decoupling, where events can be handled by services written in different languages or deployed in separate containers. Events can be persisted and subscribed to across microservices, enabling scalability and loose coupling.
x??

---

#### Service Layer Event Handling with Message Bus
In this pattern, the service layer acts as a bridge between the domain model and the message bus. When domain events occur, they are passed up to the message bus for processing. The service layer does not directly interact with external systems like email infrastructures but instead delegates event handling to the message bus.

:p How does the service layer interact with the message bus in event-driven systems?
??x
The service layer collects events from domain aggregates and passes them to the message bus using `messagebus.handle(product.events)`. This keeps the service layer clean and focused on business logic, while event handling is abstracted into the message bus layer.
x??

---

#### Direct Event Raising in Service Layer
An alternative approach involves the service layer raising its own events directly instead of relying on domain model events. This gives more control over when and what events are raised, allowing for custom logic such as handling out-of-stock conditions.

:p What is the advantage of the service layer raising its own events?
??x
Raising events directly in the service layer provides more control and clarity over when events occur. It allows for explicit handling of business logic like `OutOfStock`, which can be raised and processed immediately, making it easier to reason about and test.
x??

---

#### Unit of Work Publishing Events to Message Bus
The Unit of Work (UoW) is responsible for tracking all aggregates involved in a transaction and publishing their events to the message bus after committing. This pattern centralizes event handling logic within the UoW, removing event responsibilities from the service layer entirely.

:p How does the Unit of Work publish events to the message bus?
??x
The UoW maintains a `.seen` set of all aggregates involved in the current session. After committing, it iterates through these seen objects and publishes their events using `messagebus.handle(event)`. This is done via a `publish_events()` method that runs after `_commit()`.
x??

---

#### Repository Tracking of Aggregates
To enable event publishing by the Unit of Work, the repository must track which aggregates have been loaded or modified during a session. This is achieved using a `.seen` set that is updated in the `add()` and `get()` methods.

:p Why is the repository's `.seen` set important in event-driven systems?
??x
The `.seen` set allows the Unit of Work to know which aggregates have been accessed or modified during a session. This enables the UoW to collect and publish all relevant events from these aggregates, ensuring that no event is missed during transactional commits.
x??

---

#### Fake Implementations for Testing
In test environments, fake implementations of repositories and UoWs are used to simulate real behavior without external dependencies. These fakes must correctly implement the base class methods and ensure that `.seen` tracking works properly.

:p How should fakes be implemented to maintain consistency with real implementations?
??x
Fakes must call `super().__init__()` to initialize the `.seen` set and implement underscored methods like `._add()` and `._get()`. This ensures that the event tracking and publishing logic works the same way in tests as in production, preserving behavior and correctness.
x??

---

---

#### Wrapper Pattern for Repository
The wrapper pattern is a design approach where functionality is added to an object by wrapping it, rather than inheriting from it. In the context of repositories, this avoids the need for "super-gross" underscore methods like `_add()` or `_commit()`. Instead, a `TrackingRepository` wraps an actual repository and delegates calls to it while adding tracking behavior.

:p What is the benefit of using a wrapper class for a repository instead of inheritance?
??x
Using a wrapper avoids the need for internal methods like `_add()` or `_commit()`. It allows clean delegation of functionality to the wrapped object, making the code more readable and testable. For example:

```python
class TrackingRepository:
    def __init__(self, repo: AbstractRepository):
        self.seen = set()
        self._repo = repo

    def add(self, product: model.Product):
        self._repo.add(product)
        self.seen.add(product)

    def get(self, sku) -> model.Product:
        product = self._repo.get(sku)
        if product:
            self.seen.add(product)
        return product
```

This approach separates concerns cleanly and keeps the interface simple.
x??

---

#### Unit of Work with Event Handling
The Unit of Work (UoW) pattern coordinates changes made to objects during a business transaction and ensures they are persisted consistently. When combined with domain events, UoW can collect events raised by aggregates and dispatch them via a message bus. This enables eventual consistency across multiple aggregates.

:p How can a Unit of Work collect and dispatch domain events raised by aggregates?
??x
A UoW can gather events from aggregates after committing changes and then pass them to a message bus. This avoids manually calling `bus.handle()` in each handler, centralizing event handling logic. Example:

```python
class UnitOfWork:
    def __init__(self):
        self.events = []

    def commit(self):
        self._commit()
        for aggregate in self._aggregates:
            self.events.extend(aggregate.events)
        for event in self.events:
            self.bus.handle(event)
```

This pattern improves modularity and reduces boilerplate.
x??

---

#### Domain Events and Causal Workflow Modeling
Domain events model real-world occurrences that trigger actions in a system. They help express causal relationships such as “When X happens, then Y should occur.” This supports the single responsibility principle by separating core logic from side effects like sending emails or updating related systems.

:p Why are domain events useful for modeling workflows in software systems?
??x
Domain events allow us to separate primary use cases from secondary ones, improving testability and observability. They help model real-world causality, e.g., when stock is allocated and not enough remains, an email is sent. This makes it easier to reason about behavior and scale components independently.

Example:

```java
// In service layer
if (stock < requested) {
    eventBus.handle(new OutOfStockEvent(orderId));
}
```

Events make workflows more explicit and easier to manage.
x??

---

#### Message Bus as a Routing Mechanism
A message bus acts like a dictionary mapping event types to their consumers. It routes messages without knowing the semantics of events, focusing purely on infrastructure. It allows decoupling between event producers and handlers.

:p How does a message bus facilitate decoupling in event-driven systems?
??x
A message bus serves as a routing mechanism that maps events to their handlers without requiring direct dependencies. For instance:

```python
class EventBus:
    def __init__(self):
        self.handlers = {}

    def subscribe(self, event_type, handler):
        self.handlers[event_type] = handler

    def handle(self, event):
        handler = self.handlers.get(type(event))
        if handler:
            handler(event)
```

This enables flexible extension and maintenance of event processing logic.
x??

---

#### Option 1: Service Layer Raises Events
In this approach, the service layer raises events after committing the unit of work. It's simple to implement but keeps event logic outside the domain model.

:p What are the pros and cons of raising events directly in the service layer?
??x
Pros:
- Simple to implement
- Clear separation of concerns between domain and infrastructure

Cons:
- Event logic is scattered
- Harder to test domain logic independently
- Less maintainable over time

Example:
```python
def allocate_stock(order_id, product_sku):
    # business logic
    uow.commit()
    event_bus.handle(AllocationFailedEvent(order_id))
```
x??

---

#### Option 2: Domain Model Raises Events
This approach places event-raising logic inside the domain model, promoting better encapsulation and testability. The service layer collects events from the model and forwards them to the bus.

:p How does raising events from the domain model improve system design?
??x
Raising events within the domain model ensures that event logic is co-located with business logic, improving maintainability and testability. The service layer just needs to collect and dispatch these events.

Example:
```python
class Order:
    def __init__(self, items):
        self.items = items
        self.events = []

    def cancel(self):
        self.events.append(OrderCancelledEvent(self.id))
```

Service layer:
```python
def cancel_order(order_id):
    order = repo.get(order_id)
    order.cancel()
    uow.commit()
    for event in order.events:
        event_bus.handle(event)
```
x??

---

#### Option 3: UoW Collects Events from Aggregates
In this design, the UoW is responsible for collecting events from aggregates after commit and dispatching them. It abstracts event handling away from individual handlers, reducing boilerplate and increasing consistency.

:p What is the advantage of letting the Unit of Work collect and raise events from aggregates?
??x
By centralizing event collection in the UoW, we reduce repetition in handlers and ensure all events are consistently processed. It also simplifies testing and promotes reuse.

Example:
```python
class UnitOfWork:
    def commit(self):
        self._commit()
        for aggregate in self._aggregates:
            for event in aggregate.events:
                self.bus.handle(event)
```

This design leverages ORM magic or reflection to automate event propagation.
x??

---

#### Trade-offs of Domain Events
While domain events provide benefits like improved testability and separation of concerns, they introduce complexity through asynchronous execution, potential performance bottlenecks, and risks of circular dependencies or infinite loops.

:p What are the main trade-offs of using domain events in an application?
??x
Pros:
- Separation of concerns
- Improved testability
- Supports eventual consistency
- Reflects real-world causality

Cons:
- Hidden side effects (e.g., synchronous event handling)
- Performance impact
- Complexity in debugging
- Risk of circular dependencies or infinite loops

Example:
```python
def handle_order_placed(order):
    # Synchronous event handling may block response
    email_service.send_confirmation(order.customer_email)
```

These hidden behaviors can lead to unexpected performance issues or bugs.
x??

---

#### Event-Driven Systems vs Orchestration vs Choreography
In event-driven systems, flow control shifts from orchestration (centralized control) to choreography (distributed coordination). This is a key shift from imperative to reactive programming models.

:p How does event-driven architecture change the way we think about system flow control?
??x
In traditional orchestration, one component controls the flow of operations. In event-driven choreography, components react to events and coordinate indirectly. As noted by reviewer Ed Jung, this transformation moves from "orchestration" to "choreography".

This shift makes systems more scalable and flexible but also harder to reason about because there's no single place to see the full flow of a request.
x??

---

