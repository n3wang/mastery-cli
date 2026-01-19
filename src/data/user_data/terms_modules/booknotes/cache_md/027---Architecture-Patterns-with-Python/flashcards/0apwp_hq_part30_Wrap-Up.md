# High-Quality Flashcards: 027---Architecture-Patterns-with-Python_processed (Part 30)

**Starting Chapter:** Wrap-Up

---

#### Event Handlers and Read Models
Event handlers are a powerful mechanism for managing updates to read models. They allow the system to react to domain events and update views accordingly, making it easy to change or extend the implementation of the read model without affecting the write model.

:p What is the role of event handlers in managing read models?
??x
Event handlers listen for domain events and use them to update a read model. This approach decouples the write model from the read model, allowing for flexible and scalable data access patterns. For example, when a batch is allocated, an event handler might update a view that shows which order lines are allocated to which batches.

```java
// Pseudocode example of an event handler updating a read model
class AllocationEventHandler {
    void handle(AllocationEvent event) {
        // Update the read model with allocation details
        readModel.updateAllocation(event.orderLineId, event.batchId);
    }
}
```
This pattern supports eventual consistency and allows for efficient querying of the read model.
x??

---

#### CQRS and Read Model Storage Options
CQRS (Command Query Responsibility Segregation) allows for separate models for reads and writes. Different storage strategies for read models include using repositories, custom queries, raw SQL, or even separate read stores like Redis.

:p What are the trade-offs of using different storage approaches for read models?
??x
Using repositories is simple but can lead to performance issues with complex queries. Custom queries with ORMs allow reuse of DB configuration but add syntax complexity. Raw SQL gives fine-grained control over performance but requires maintenance when schemas change. Using separate read stores like Redis enables scaling and caching but adds complexity.

$$
\text{Performance} \propto \frac{1}{\text{Query Complexity}}
$$

For example, a simple repository-based query might be:
```java
List<OrderLineAllocation> findAllocationsForOrder(String orderId);
```
But with raw SQL, you could optimize for performance:
```sql
SELECT ol.order_id, ol.sku, b.batch_id
FROM order_lines ol
JOIN allocations a ON ol.id = a.order_line_id
JOIN batches b ON a.batch_id = b.id
WHERE ol.order_id = ?
```
x??

---

#### Trade-offs of Raw SQL vs ORM for Read Models
Raw SQL offers more control and can be more performant, especially for complex queries, but requires more effort to maintain and is harder to integrate with ORM models. ORMs provide consistency and ease of use but may not perform as well for complex read patterns.

:p When should you prefer raw SQL over ORM for read operations?
??x
Raw SQL is preferred when performance is critical and the query is complex, especially when dealing with denormalized data or when the read model doesn't align with the write model's structure. For example, in an allocation service, the read model may need to aggregate data across multiple entities (e.g., order lines, batches, SKUs), which is easier to express with SQL than with ORM queries.

In contrast, ORMs are better suited for simple, consistent access patterns where performance is not a bottleneck. For example:
```java
// ORM approach (simpler but potentially less performant)
List<Batch> batches = batchRepository.findBySkuAndAvailable(true, "SKU123");
```
vs.
```sql
-- Raw SQL (more control and performance)
SELECT b.id, b.sku, b.available_quantity
FROM batches b
JOIN products p ON b.sku = p.sku
WHERE p.sku = 'SKU123' AND b.available_quantity > 0;
```
x??

---

#### Use of Redis in Read Models
Using Redis for read models enables fast access and scalability. It allows for caching and can support a second layer of caching (e.g., Varnish) to reduce load on primary databases.

:p How does using Redis as a read store benefit an allocation system?
??x
Redis allows for fast, in-memory access to precomputed views, which is useful for high-frequency read operations. It supports caching and can be used in conjunction with Varnish for additional layers of caching. This is especially useful in systems like MADE.com where the allocation service needs to scale and respond quickly.

Example:
```java
// Pseudocode for updating Redis from event handler
class RedisAllocationUpdater {
    void update(String orderId, AllocationView view) {
        redis.set("allocation:" + orderId, serialize(view));
    }
}
```
This approach avoids repeated database queries and improves response times.
x??

---

#### Choosing Between Read Model Approaches
Choosing the right read model approach depends on the complexity of the domain and the performance requirements. For simple domains, ORM-based read models are sufficient. For complex domains, separate read models with event handlers are more compelling.

:p How do you decide whether to use a simple ORM-based read model or a separate read model with event handlers?
??x
If the read model closely mirrors the write model and queries are simple, an ORM-based approach works well. However, if the read model involves complex aggregations or needs to scale independently, a separate read model using event handlers is more appropriate.

Example:
$$
\text{Read Model Complexity} = f(\text{Domain Complexity}, \text{Query Patterns})
$$

If the domain is rich and complex (e.g., multiple SKUs per order), a dedicated read model with event handlers makes more sense than trying to map everything through the ORM.

For example:
```java
// Simple ORM approach
OrderLine line = orderLineRepository.findById(orderLineId);
return line.getAllocatedBatch();

// Complex read model approach
AllocationView view = redis.get("allocation:" + orderId);
return view.getOrderLines();
```
x??

---

#### Performance Considerations in Read Models
Performance can be a critical factor in choosing a read model strategy. Normalized schemas may cause performance issues with complex queries, especially in read-heavy systems.

:p Why might normalized schemas lead to performance limitations in read models?
??x
Normalized schemas reduce data redundancy but increase the number of joins required for complex queries, which can slow down read operations. For read-heavy systems, denormalization or using a separate read store (like Redis) can improve performance by reducing the complexity of queries.

$$
\text{Query Time} \propto \text{Number of Joins}
$$

Example:
```sql
-- Slow query due to multiple joins
SELECT o.order_id, ol.sku, b.batch_id
FROM orders o
JOIN order_lines ol ON o.id = ol.order_id
JOIN allocations a ON ol.id = a.order_line_id
JOIN batches b ON a.batch_id = b.id
WHERE o.order_id = 'ORD123';
```

vs.

```sql
-- Fast query with precomputed view
SELECT * FROM allocation_view WHERE order_id = 'ORD123';
```
x??

---

---

#### Dependency Injection Overview
Dependency injection (DI) is a design pattern where objects are passed their dependencies rather than creating them internally. In Python, this practice is often viewed with suspicion, as the language's flexibility and dynamic nature make it less necessary compared to statically-typed languages. However, DI can help manage complexity, especially in larger applications, by decoupling components and making testing easier.

:p What is the purpose of dependency injection in software design?
??x
Dependency injection promotes loose coupling between components by allowing dependencies to be provided externally, rather than being hardcoded or instantiated internally. This improves testability, maintainability, and scalability. For example, in a typical application, instead of a service class creating its own database connection, that connection is injected from an external source. This allows different implementations to be swapped easily, such as using a mock database during testing.
```java
// Example in Java showing DI
public class UserService {
    private final Database db;

    public UserService(Database db) {
        this.db = db; // Injected dependency
    }
}
```
x??

---

#### Composition Root and Bootstrapping
A composition root is a well-defined location in an application where all object dependencies are assembled. It's a central place where components are wired together, typically used in object-oriented languages to manage complex dependency graphs. In Python, the term "bootstrap" is often used instead, as it refers to the same concept of initializing and wiring up dependencies at startup.

:p Why is it important to centralize dependency setup in an application?
??x
Centralizing dependency setup in a bootstrapper or composition root ensures that all components are initialized consistently and that dependencies are managed in one place. This makes the system easier to reason about, debug, and extend. Without such a mechanism, dependencies may be scattered across entrypoints, leading to tightly coupled code and harder-to-maintain systems. The bootstrapper ensures that the application's main dependencies, like a Unit of Work (UoW), are created and passed properly to the entrypoints.
x??

---

#### Unit of Work Pattern in DI Context
The Unit of Work (UoW) pattern is often a core dependency in applications using domain-driven design. It tracks changes to domain objects and coordinates the writing of those changes to the database. In the context of dependency injection, the UoW is typically injected into services or repositories, ensuring that all operations share the same transactional context.

:p How does the Unit of Work pattern benefit from dependency injection?
??x
The Unit of Work pattern benefits from dependency injection because it allows services to work with a shared instance of the UoW, ensuring consistency in transactions and data handling. For example, when a service needs to perform multiple operations on the domain model, all of them can be part of the same transaction. By injecting the UoW, we avoid creating multiple instances and ensure that changes are committed or rolled back together.
$$
\text{UoW} = \text{Transaction} + \text{Change Tracking}
$$
```python
# Pseudocode showing UoW injection
class OrderService:
    def __init__(self, uow):
        self.uow = uow  # Injected UoW instance

    def place_order(self, order):
        self.uow.add(order)
        self.uow.commit()
```
x??

---

#### Entry Points and Initialization Without Bootstrapping
Before using a bootstrapper, entry points in an application often contain a lot of initialization logic. This leads to tight coupling and makes it harder to test or change parts of the system. Entry points are responsible for creating dependencies and passing them to the main application logic, which can make them bloated and less readable.

:p What problems arise from initializing dependencies directly in entry points?
??x
Initializing dependencies directly in entry points leads to tight coupling and violates the single responsibility principle. It makes the code harder to test, as you can't easily swap out implementations. For example, if an entry point instantiates a database connection and a service that uses it, testing the service requires setting up the database connection, which can be slow or difficult. This approach also makes it harder to reuse components or change dependency implementations.
```python
# Example of problematic initialization in entry point
def main():
    db = DatabaseConnection()  # Direct instantiation
    service = OrderService(db)
    service.process_order()
```
x??

---

#### Bootstrap Script Role in Python Applications
In Python, a bootstrap script is a common and acceptable way to manage initialization and dependency wiring. It centralizes setup logic and provides a clean separation between the application entrypoint and the initialization of dependencies. This makes the codebase more maintainable and easier to understand.

:p How does a bootstrap script improve application structure in Python?
??x
A bootstrap script centralizes the initialization logic of an application, separating it from the entrypoints. It ensures that dependencies are created once and shared across the application. This approach improves modularity, testability, and readability. Instead of having entrypoints do initialization, they simply call the bootstrap to get a configured application instance. This pattern is especially useful in larger systems where managing dependencies manually becomes unwieldy.
```python
# Bootstrap script pseudocode
def bootstrap():
    uow = UnitOfWork()
    service = OrderService(uow)
    return service

# Entry point
def main():
    service = bootstrap()
    service.process_order()
```
x??

---

---

#### Explicit vs Implicit Dependencies in Dependency Injection
Background context: In software design, managing dependencies is crucial for testability and maintainability. Explicit dependencies involve passing dependencies as parameters, while implicit dependencies rely on imports or global state. The Python example shows how explicit dependencies (like `uow` in `allocate`) allow for easier testing with fakes, whereas implicit dependencies (like importing `email.send`) require mocking and can tightly couple code to implementation details.
:p What is the difference between explicit and implicit dependencies in dependency injection?
??x
Explicit dependencies are passed as function arguments, allowing easy substitution during testing (e.g., `def allocate(cmd, uow)`). Implicit dependencies are resolved via imports or global state (e.g., `from allocation.adapters import email`), which makes testing harder because you must mock the imported module. Explicit dependencies promote loose coupling and adhere to the dependency inversion principle.
x??

---

#### Dependency Inversion Principle
Background context: The Dependency Inversion Principle (DIP) states that high-level modules should not depend on low-level modules. Both should depend on abstractions. In the text, this is exemplified by using an abstract `unit_of_work.AbstractUnitOfWork` instead of directly depending on a concrete implementation like `SqlAlchemyUnitOfWork`.
:p How does using abstractions help implement the Dependency Inversion Principle?
??x
By depending on abstractions (like `AbstractUnitOfWork`) rather than concrete implementations (like `SqlAlchemyUnitOfWork`), we decouple high-level logic from low-level details. This allows swapping implementations easily (e.g., for testing) and promotes modularity. For example, a handler function declares `uow: unit_of_work.AbstractUnitOfWork`, so it works with any class implementing that interface.
x??

---

#### Composition Root Pattern
Background context: The Composition Root is a design pattern where all object creation and wiring of dependencies happens in one place — typically at the application startup or entry point. This avoids scattering dependency setup throughout the codebase, reducing duplication and making it easier to manage dependencies for different environments (e.g., test vs production).
:p What is the purpose of the Composition Root pattern?
??x
The Composition Root centralizes the creation and injection of dependencies, avoiding duplication across entry points like Flask or Redis consumers. It ensures consistent dependency wiring and makes it easier to inject mocks or different implementations during testing. For example, instead of manually passing fake units of work in each test, we inject them from a single configuration at the top level.
x??

---

#### Manual Dependency Injection Without Frameworks
Background context: Manual DI involves manually creating and injecting dependencies into classes or functions, rather than relying on a DI framework. It’s often used in small to medium-sized projects or when frameworks like Flask or Django don’t provide built-in support. This approach gives more control but requires more boilerplate.
:p Why might someone choose manual DI over using a DI framework?
??x
Manual DI gives developers full control over how dependencies are created and injected, without the overhead or complexity of a framework. It's suitable for smaller applications or when integrating with existing systems (like Flask or Redis) that don’t support DI frameworks natively. However, it requires more manual work and can lead to duplicated code if not managed carefully.
x??

---

#### Unit of Work Pattern
Background context: The Unit of Work (UoW) pattern ensures that all operations within a business transaction are treated as a single unit. It tracks changes made to objects and commits or rolls back those changes. In the example, `SqlAlchemyUnitOfWork` depends on a session factory, allowing it to be swapped out for testing (e.g., with SQLite).
:p How does the Unit of Work pattern support testing?
??x
The UoW pattern supports testing by enabling easy substitution of real implementations with fake ones (e.g., `FakeUnitOfWork`). It also allows integration tests to swap session factories (e.g., using SQLite instead of PostgreSQL). For example:
```python
uow = unit_of_work.SqlAlchemyUnitOfWork(sqlite_session_factory)
```
This makes testing isolated and fast.
x??

---

#### Monkeypatching and Its Drawbacks
Background context: Monkeypatching is a technique used in Python to replace parts of a system (e.g., a function or module) at runtime. While useful for testing, it introduces tight coupling between tests and implementation details, increasing maintenance burden.
:p What are the drawbacks of using monkeypatching for testing?
??x
Monkeypatching tightly couples tests to implementation details. If you refactor code (e.g., change `from email import send_mail` to `import email`), all mocks must be updated. Additionally, it adds boilerplate to tests and can make them harder to read and maintain. For example, every test involving `send_out_of_stock_notification` would need:
```python
mock.patch("allocation.adapters.email.send")
```
x??

---

#### Testing with Fake Implementations
Background context: Using fake implementations (e.g., `FakeUnitOfWork`) allows isolating business logic from external dependencies (e.g., databases or external APIs). These fakes can simulate behavior without side effects, making tests faster and more reliable.
:p How do fake implementations improve test quality?
??x
Fake implementations allow tests to run in isolation, avoiding real-world side effects (e.g., database writes, email sends). They are faster and more predictable. For example, a `FakeUnitOfWork` can track changes without committing them to a real database, enabling fast unit tests.
x??

---

#### Example of Explicit Dependency Injection
Background context: Explicit dependency injection involves passing dependencies as parameters to functions or constructors. This makes dependencies clear, testable, and decoupled from implementation details.
:p Show how explicit dependency injection works in a function using a callback-style approach.
??x
```python
def send_out_of_stock_notification(event, send_mail):
    send_mail('stock@made.com', f'Out of stock for {event.sku}')
```
Here, `send_mail` is explicitly passed as a dependency, allowing easy substitution in tests (e.g., a mock function) without relying on imports or global state.
x??

---

#### Trade-offs Between Explicit and Implicit Dependencies
Background context: While explicit dependencies increase code complexity slightly, they improve testability, maintainability, and clarity. Implicit dependencies are simpler in code but harder to test and more fragile due to tight coupling.
:p What are the trade-offs between explicit and implicit dependency management?
??x
Explicit dependencies make code more testable and maintainable but introduce slight complexity by requiring parameters. Implicit dependencies are simpler but tightly couple code to implementation details, making refactoring and testing harder. The choice depends on project size and testing needs. The Zen of Python says: "Explicit is better than implicit."
x??

---

