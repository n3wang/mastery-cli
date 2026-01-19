# High-Quality Flashcards: 027---Architecture-Patterns-with-Python_processed (Part 23)

**Starting Chapter:** Our New Event. Test-Driving a New Handler

---

#### BatchQuantityChanged Event
The `BatchQuantityChanged` event is a domain event used to signal that the available quantity of a specific batch has been updated. It carries two pieces of information: a reference to the batch (`ref`) and the new quantity (`qty`). This event plays a key role in maintaining consistency across systems when batch quantities change.

:p What is the purpose of the `BatchQuantityChanged` event in the allocation domain?
??x
The `BatchQuantityChanged` event notifies the system that a batch's available quantity has been altered. This event is critical for updating related allocations and ensuring data consistency when inventory levels change. It allows the system to react by reallocating orders if necessary.

```python
@dataclass
class BatchQuantityChanged(Event):
    ref: str
    qty: int
```
This design enables event-driven architecture, where changes to batch quantities trigger downstream logic like reallocation of orders.
x??

---

#### Handling Batch Quantity Changes
When handling a `BatchQuantityChanged` event, the system must update the batch's available quantity. If the new quantity is less than what has already been allocated to orders, the system must reallocate those orders to other batches. This ensures data integrity and prevents over-allocation.

:p How does the system handle a `BatchQuantityChanged` event when the quantity is reduced below allocated amounts?
??x
If the quantity of a batch is reduced below the amount already allocated, the system must reallocate the excess orders to other available batches. This is handled in the event handler logic, which checks for over-allocation and adjusts batch allocations accordingly.

For example:
- If a batch has 100 units and 20 are allocated, reducing it to 50 requires reallocating 10 units.
- The logic must identify which orders are affected and assign them to the next available batch.

This requires careful handling of transactions and consistency checks to avoid integrity issues.
x??

---

#### Transaction Integrity and Eventual Consistency
Splitting operations into multiple transactions increases the risk of integrity issues. If one transaction succeeds but another fails, the system may end up in an inconsistent state. This is especially true when handling events like `BatchQuantityChanged`, which may involve multiple steps like updating batch quantities and reallocating orders.

:p Why is splitting database operations across multiple transactions risky when handling events like `BatchQuantityChanged`?
??x
Splitting database operations into separate transactions introduces the risk of partial failure. If one transaction commits successfully but another fails, the system may end up in an inconsistent state. For example, a batch quantity might be updated, but order reallocations might not occur, leading to over-allocation or incorrect inventory tracking.

To mitigate this, developers must consider using atomic operations or compensating actions to maintain consistency.
x??

---

#### Unit Testing with Event Handlers
Unit tests for event handlers are written at a high level of abstraction, focusing on events rather than internal logic. This approach ensures that the behavior of the system is validated based on domain events, making tests more robust and easier to maintain.

:p How are unit tests for event handlers structured in this system?
??x
Tests for event handlers are written at a high level, focusing on domain events such as `BatchCreated` and `BatchQuantityChanged`. The tests simulate sequences of events and assert expected outcomes, such as updated batch quantities or reallocated orders. This event-driven testing approach ensures that the system behaves correctly without needing to mock internal components.

Example test structure:
```python
def test_changes_available_quantity(self):
    uow = FakeUnitOfWork()
    messagebus.handle(events.BatchCreated("batch1", "SKU1", 100, None), uow)
    messagebus.handle(events.BatchQuantityChanged("batch1", 50), uow)
    assert batch.available_quantity == 50
```
This ensures that batch quantities are correctly updated in response to events.
x??

---

#### Integration of Events and Handlers
The system uses a message bus to process events, which allows decoupling between components. Events like `BatchQuantityChanged` are handled by dedicated handlers that update domain models and trigger further actions like reallocation. This architecture supports scalability and maintainability.

:p How does the message bus facilitate handling of domain events like `BatchQuantityChanged`?
??x
The message bus decouples event producers from consumers by routing events to appropriate handlers. When `BatchQuantityChanged` is published, the message bus identifies the correct handler, which updates the batch quantity and potentially reallocates orders. This promotes loose coupling and allows for easy extension of event handling logic.

Example:
```python
messagebus.handle(events.BatchQuantityChanged("batch1", 50), uow)
```
Here, the `uow` (unit of work) provides context for the handler to access and modify the domain model.
x??

---

#### Handler Delegation in Domain Events
When handling domain events such as `BatchQuantityChanged`, the handler delegates responsibility to the model layer by using a unit of work pattern. This ensures that changes are made in a consistent transactional context. The handler retrieves a product associated with a specific batch reference, updates its quantity, and commits the changes.

:p What is the purpose of the `change_batch_quantity` handler function?
??x
The `change_batch_quantity` handler function is responsible for processing the `BatchQuantityChanged` event. It uses a unit of work (`uow`) to retrieve a product by its batch reference, calls a method on the product to change the batch quantity, and then commits the transaction to persist the changes. This pattern ensures data consistency and separation of concerns between event handling and business logic.
```python
def change_batch_quantity(event: events.BatchQuantityChanged, uow: unit_of_work.AbstractUnitOfWork):
    with uow:
        product = uow.products.get_by_batchref(batchref=event.ref)
        product.change_batch_quantity(ref=event.ref, qty=event.qty)
        uow.commit()
```
x??

---

#### Repository Pattern and Query Types
In this implementation, a new query method `get_by_batchref` is introduced to the repository interface. This allows retrieving a product based on a batch reference, which is useful when dealing with domain events that modify batch quantities. Both `SqlAlchemyRepository` and `FakeRepository` must implement this method to support the functionality.

:p Why is a new method `get_by_batchref` added to the repository?
??x
The `get_by_batchref` method is added to the repository to allow querying products by their batch reference. This is essential for domain events like `BatchQuantityChanged` where we need to locate a specific batch and update its quantity. The method is implemented in both `SqlAlchemyRepository` and `FakeRepository` to maintain consistency across different data access layers.
```python
def _get_by_batchref(self, batchref):
    return self.session.query(model.Product).join(model.Batch).filter(
        orm.batches.c.reference == batchref,
    ).first()
```
x??

---

#### Fake Repository Implementation for Testing
In unit tests, a `FakeRepository` is used instead of a real database. It implements all repository methods including `_get_by_batchref` using in-memory data structures. This allows testing of event handling logic without external dependencies, making tests faster and more reliable.

:p How does `FakeRepository` implement `_get_by_batchref` for testing?
??x
The `FakeRepository` implements `_get_by_batchref` by iterating through all products and their batches to find a matching batch reference. It uses a nested generator expression to scan through `_products` and their `batches`. If a match is found, it returns the corresponding product; otherwise, it returns `None`. This approach mimics the behavior of a real repository but operates on in-memory data.
```python
def _get_by_batchref(self, batchref):
    return next(
        (p for p in self._products for b in p.batches if b.reference == batchref),
        None
    )
```
x??

---

#### Unit of Work Pattern in Domain Handling
The unit of work pattern is used in the handler to manage transactions and ensure that all operations related to a domain event are committed together. It abstracts the persistence layer, allowing handlers to work with domain objects without worrying about how they are stored or retrieved.

:p What role does the unit of work play in the event handling process?
??x
The unit of work acts as a transactional boundary in the event handling process. It ensures that all operations performed within a handler (such as retrieving a product and updating its batch quantity) are part of a single transaction. If any step fails, the entire transaction can be rolled back, maintaining data integrity. It also provides a consistent interface for accessing and modifying domain objects.
```python
with uow:
    product = uow.products.get_by_batchref(batchref=event.ref)
    product.change_batch_quantity(ref=event.ref, qty=event.qty)
    uow.commit()
```
x??

---

#### Abstract Repository Interface Design
The `AbstractRepository` defines a common interface for all repository implementations. It includes abstract methods for adding, getting, and retrieving products by batch reference. This abstraction supports multiple data access strategies (e.g., SQL, in-memory) while maintaining a consistent API for domain logic.

:p What is the benefit of defining an abstract repository interface?
??x
Defining an abstract repository interface promotes loose coupling between domain logic and data access strategies. It allows different implementations (e.g., `SqlAlchemyRepository`, `FakeRepository`) to be used interchangeably, enabling easy testing and flexibility in data storage. The interface ensures that all repositories implement required methods, providing a stable contract for the domain layer.
$$
\text{Repository Interface} \rightarrow \text{Concrete Implementations}
$$
x??

---

#### Domain Event Handling and Product Update
When a `BatchQuantityChanged` event occurs, the system must locate the relevant product and update its batch quantity. This involves retrieving the product by batch reference, invoking a domain method to change the quantity, and persisting the changes through the unit of work.

:p What happens when a `BatchQuantityChanged` event is processed?
??x
When a `BatchQuantityChanged` event is processed, the handler first retrieves the product associated with the batch reference specified in the event. It then calls a domain method on the product to update the batch quantity. Finally, the changes are committed via the unit of work, ensuring persistence. This process encapsulates the logic of modifying domain entities in response to external events.
$$
\text{Event} \rightarrow \text{Handler} \rightarrow \text{Product Update} \rightarrow \text{Commit}
$$
x??

---

#### Domain Model Evolution with Event Handling
The domain model evolves to support new business requirements by adding methods that encapsulate behavior directly within the domain objects. In this case, a new method `change_batch_quantity` is added to the `Product` class to manage batch quantity changes and trigger deallocation logic when necessary. This approach keeps the domain logic centralized and ensures that events are published correctly.

:p What is the purpose of the `change_batch_quantity` method in the `Product` class?
??x
The `change_batch_quantity` method updates the purchased quantity of a batch and checks if available quantity goes below zero. If so, it deallocates items from the batch and publishes an `AllocationRequired` event for each deallocated item. This ensures that the system can reallocate orders if stock levels are reduced.
```python
def change_batch_quantity(self, ref: str, qty: int):
    batch = next(b for b in self.batches if b.reference == ref)
    batch._purchased_quantity = qty
    while batch.available_quantity < 0:
        line = batch.deallocate_one()
        self.events.append(
            events.AllocationRequired(line.orderid, line.sku, line.qty)
        )
```
x??

---

#### Message Bus and Event Handling
A message bus is used to route events to appropriate handlers. Each event type maps to a list of handlers that process it. This decouples event generation from event processing, enabling loosely coupled components and supporting complex workflows. The message bus is configured with specific handlers for different event types such as `BatchCreated`, `BatchQuantityChanged`, and `AllocationRequired`.

:p How does the message bus route events to their respective handlers?
??x
The message bus uses a dictionary mapping event types to lists of handler functions. When an event is handled, the system looks up the corresponding handlers in the `HANDLERS` dictionary and executes them sequentially. For example, `BatchQuantityChanged` events are handled by `change_batch_quantity`, which updates batch quantities and may emit new `AllocationRequired` events.
```python
HANDLERS = {
    events.BatchCreated: [handlers.add_batch],
    events.BatchQuantityChanged: [handlers.change_batch_quantity],
    events.AllocationRequired: [handlers.allocate],
    events.OutOfStock: [handlers.send_out_of_stock_notification],
}
```
x??

---

#### Testing Event Handlers in Isolation
Testing event handlers in isolation involves using a fake message bus to record events without side effects. This allows developers to verify that one handler correctly produces expected output events without running the full chain of dependent handlers. A fake unit of work (`FakeUnitOfWorkWithFakeMessageBus`) intercepts events and stores them for assertion.

:p Why would you test event handlers in isolation using a fake message bus?
??x
Testing in isolation ensures that individual event handlers behave correctly without depending on other handlers or external systems. It helps catch bugs early and simplifies debugging by focusing on one handler at a time. By using a fake message bus, we can assert that the correct events are emitted without executing downstream logic.
```python
class FakeUnitOfWorkWithFakeMessageBus(FakeUnitOfWork):
    def __init__(self):
        super().__init__()
        self.events_published = []

    def publish_events(self):
        for product in self.products.seen:
            while product.events:
                self.events_published.append(product.events.pop(0))
```
x??

---

#### Refactoring Message Bus to Use Classes
To improve testability and maintainability, the message bus can be refactored into a class-based design. This includes defining an abstract base class `AbstractMessageBus` and concrete implementations like `MessageBus` and `FakeMessageBus`. This structure allows for easier testing and extension, adhering to the Single Responsibility Principle.

:p What are the benefits of refactoring the message bus to use classes?
??x
Refactoring to a class-based design improves modularity and testability. It allows for cleaner separation of concerns, where each class has a single responsibility. For example, `FakeMessageBus` can override behavior for testing without affecting the real implementation. This makes it easier to mock dependencies and isolate components during testing.
```python
class AbstractMessageBus:
    HANDLERS: Dict[Type[events.Event], List[Callable]]

    def handle(self, event: events.Event):
        for handler in self.HANDLERS[type(event)]:
            handler(event)

class MessageBus(AbstractMessageBus):
    HANDLERS = {
        events.OutOfStock: [send_out_of_stock_notification],
    }

class FakeMessageBus(AbstractMessageBus):
    def __init__(self):
        self.events_published = []
        self.handlers = {
            events.OutOfStock: [lambda e: self.events_published.append(e)]
        }
```
x??

---

#### Handling Reallocation Logic
When batch quantity changes, especially when it drops below the total allocated, the system must reallocate orders. This involves checking the available quantity and deallocating items from batches until sufficient stock exists. Each deallocated item triggers a new `AllocationRequired` event, which is then handled by the allocation logic.

:p How does the system handle reallocation when batch quantity is reduced?
??x
When `change_batch_quantity` is called and the available quantity drops below zero, the system iteratively deallocates items from the batch using `deallocate_one()`. For each deallocated item, an `AllocationRequired` event is published, signaling that the associated order needs to be reallocated. This ensures that inventory adjustments are propagated correctly through the system.
```python
while batch.available_quantity < 0:
    line = batch.deallocate_one()
    self.events.append(
        events.AllocationRequired(line.orderid, line.sku, line.qty)
    )
```
x??

---

