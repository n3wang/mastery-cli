# High-Quality Flashcards: 027---Architecture-Patterns-with-Python_processed (Part 5)

**Starting Chapter:** Not Everything Has to Be an Object A Domain Service Function

---

#### Hashing and Equality in Python Objects
In Python, objects that are used in sets or as dictionary keys must be hashable. By default, mutable objects like instances of custom classes are hashable, but if you define a custom `__hash__` method, you must also define `__eq__` to maintain consistency. If an object should not be used in sets or dicts, its hash can be set to `None`. This is important in domain modeling where entities are identified by unique attributes such as `.reference`. The hash must be based on immutable identity attributes to ensure that objects remain consistent in collections.

:p What is the recommended approach for making an entity hashable in Python?
??x
To make an entity hashable, define `__hash__` based on an immutable attribute like `.reference`. For example, if `reference` uniquely identifies the entity, you could implement:

```python
def __hash__(self):
    return hash(self.reference)
```

This ensures that two objects with the same reference will have the same hash and can be used in sets or as dict keys. If you do not define `__eq__` to match this behavior, Python may treat two objects with the same reference as different, which can lead to unpredictable behavior in collections. It's crucial to pair `__hash__` with `__eq__` to avoid inconsistencies.
x??

---

#### Implementing Batch Allocation Logic
The allocation logic determines how to distribute an order line across a list of batches. It prefers in-stock batches over shipment batches and earlier batches over later ones. The logic can be implemented using a simple loop that sorts batches by priority and allocates the quantity to the first batch that has sufficient stock.

:p How does the allocation algorithm prioritize batches when assigning an order line?
??x
The algorithm typically prioritizes batches by:
1. Prefer in-stock batches (`eta=None`) over shipment batches (`eta` is set).
2. Among in-stock batches, prefer the earliest batch based on `eta`.

Here is a pseudocode example:
```pseudocode
function allocate(line, batches):
    sorted_batches = sort(batches, by: eta)
    for batch in sorted_batches:
        if batch.available_quantity >= line.quantity:
            batch.allocate(line.quantity)
            return batch.reference
```
This ensures that stock is used efficiently and earlier batches are preferred.
x??

---

#### Testing Domain Service Functions
Testing domain service functions like `allocate()` requires creating test cases that verify the correct behavior of batch selection and quantity allocation. Tests should cover scenarios like:
- Prefer in-stock batches over shipment batches.
- Prefer earlier batches when stock is available.
- Return the correct batch reference after allocation.

:p What are the key aspects to test when implementing a domain service like `allocate()`?
??x
Key aspects include:
1. Ensuring in-stock batches are preferred over shipment batches.
2. Ensuring earlier batches are selected when multiple batches are available.
3. Verifying that the correct batch reference is returned after allocation.
4. Confirming that available quantities are updated correctly.

Example test:
```python
def test_prefers_current_stock_batches_to_shipments():
    in_stock_batch = Batch("in-stock-batch", "RETRO-CLOCK", 100, eta=None)
    shipment_batch = Batch("shipment-batch", "RETRO-CLOCK", 100, eta=tomorrow)
    line = OrderLine("oref", "RETRO-CLOCK", 10)
    allocate(line, [in_stock_batch, shipment_batch])
    assert in_stock_batch.available_quantity == 90
```
This ensures the business logic is correctly implemented.
x??

---

#### Hash Consistency Between `__hash__` and `__eq__`
In Python, if you override `__hash__`, you must also override `__eq__` to ensure that two objects considered equal have the same hash. Failing to do so can lead to unexpected behavior in sets or as dictionary keys.

:p Why is it necessary to keep `__hash__` and `__eq__` consistent?
??x
Because Python uses the hash value to quickly locate objects in sets and dictionaries. If two objects are equal (`__eq__` returns `True`) but have different hashes, they may not be found correctly in collections. For example:

```python
class Entity:
    def __init__(self, reference):
        self.reference = reference

    def __eq__(self, other):
        return isinstance(other, Entity) and self.reference == other.reference

    def __hash__(self):
        return hash(self.reference)
```

Here, two `Entity` objects with the same `reference` will have the same hash and are considered equal, which is essential for correct behavior in collections.
x??

---

#### Domain Service vs Entity/Value Object
A domain service is a function that performs a domain operation but doesn’t naturally belong to an entity or value object. It encapsulates business logic that spans multiple domain objects. It's a way to keep entities and value objects focused on their own responsibilities.

:p How does a domain service differ from an entity or value object?
??x
An entity or value object represents a core concept in the domain with its own identity or state. A domain service, on the other hand, is a function that performs a task involving multiple entities or value objects but doesn’t belong to any one of them. For example, `allocate()` is a domain service because it allocates an order line to a batch, which involves both `OrderLine` and `Batch` but isn’t part of either.

This separation helps maintain clean, focused domain models and avoids cluttering entities with business logic that doesn’t belong to them.
x??

---

#### Magic Methods in Python for Domain Modeling
Magic methods (also known as dunder methods) in Python allow us to define behaviors for operators and built-in functions on custom classes. In domain modeling, magic methods like `__gt__` enable intuitive usage of objects with idiomatic Python syntax, such as sorting batches by their expected arrival time (`eta`). This makes the code more readable and expressive of business logic.

For example, implementing `__gt__` allows sorting batches:
```python
def __gt__(self, other):
    if self.eta is None:
        return False
    if other.eta is None:
        return True
    return self.eta > other.eta
```
:p How does the `__gt__` method help in sorting batches in domain modeling?
??x
The `__gt__` method defines how two `Batch` objects should be compared when using Python's built-in `sorted()` function. It ensures that batches are ordered by their expected arrival date (`eta`), which is crucial for allocation logic. If one batch has no ETA, it's considered "greater" than another with an ETA, so it comes last in the sort order. This allows the system to prioritize batches with earlier delivery dates.
x??

---

#### Sorting Batches Using Magic Methods
Using `sorted(batches)` in Python relies on the `__gt__` magic method defined in the `Batch` class. This approach enables clean, readable code that expresses business intent directly in the language. The `sorted()` function internally calls `__gt__` to compare objects, making it easy to implement allocation logic where earlier deliveries take precedence.

:p Why is using `sorted()` with a custom `__gt__` method beneficial for batch allocation?
??x
By defining `__gt__`, we can sort batches by their expected arrival time (`eta`). This allows the allocation logic to pick the earliest available batch automatically. For example:
```python
batch = next(b for b in sorted(batches) if b.can_allocate(line))
```
This line finds the first batch that can fulfill the order line, prioritizing those with earlier ETAs, which is a natural business rule for inventory management.
x??

---

#### Domain Exceptions to Express Business Rules
Domain exceptions like `OutOfStock` are used to represent specific business conditions that occur during domain operations. They encapsulate domain concepts in the code and make it clear when a business rule has been violated. These exceptions improve clarity and help enforce business logic by signaling errors explicitly.

:p What is the purpose of raising an `OutOfStock` exception in the allocation process?
??x
An `OutOfStock` exception is raised when an order line cannot be allocated because there is insufficient stock in any of the available batches. This signals a domain-level constraint violation — not just a technical error — and helps enforce business rules such as "you cannot allocate more stock than is available." It also allows the calling code to handle this condition gracefully, e.g., by notifying the user or retrying with alternative sources.
x??

---

#### Exception Handling for Allocation Logic
When allocating an order line, if no batch can accommodate the request, a `StopIteration` is raised by `next()`. This is caught and converted into a domain-specific `OutOfStock` exception, providing a clear and meaningful error message. This pattern separates low-level implementation details from high-level business logic.

:p How does the code convert a `StopIteration` into an `OutOfStock` exception?
??x
Inside the `allocate` function, `next(...)` is used to get the first batch that can allocate the line. If no such batch exists, `StopIteration` is raised. The code catches this exception and raises a custom `OutOfStock` exception instead:
```python
try:
    batch = next(b for b in sorted(batches) if b.can_allocate(line))
except StopIteration:
    raise OutOfStock(f'Out of stock for sku {line.sku}')
```
This translates a generic iteration failure into a meaningful business-level error.
x??

---

#### Domain Services and Use Cases
A domain service represents a business concept or process, such as allocating an order line to a batch. Unlike service-layer services (which represent application use cases), domain services encapsulate core business logic and are often called by application-layer services. They provide a clean separation between domain logic and infrastructure concerns.

:p How does a domain service differ from a service-layer service?
??x
A domain service embodies a business concept, like allocation or validation, and contains core business logic. It's part of the domain layer and focuses on what the business does. In contrast, a service-layer service represents a use case (e.g., "fulfill an order") and orchestrates interactions between domain objects and infrastructure (e.g., database access). Domain services are often invoked by service-layer services.
x??

---

#### Naming Conventions for Domain Exceptions
Using names that align with the ubiquitous language of the domain improves code clarity and communication between developers and domain experts. Exceptions like `OutOfStock` directly reflect business terminology and make the code self-documenting. This practice supports maintainability and reduces ambiguity in error handling.

:p Why is it important to name domain exceptions using ubiquitous language?
??x
Using ubiquitous language ensures that developers and domain experts understand the same meaning behind an exception. For example, naming an exception `OutOfStock` instead of `InsufficientInventory` makes the code more aligned with how business stakeholders talk about the problem. This clarity reduces misunderstandings and makes the codebase easier to evolve and maintain.
x??

---

#### Domain Modeling Best Practices
Domain modeling should be close to the business, highly expressive, and easy to modify. It's essential to apply good object-oriented design principles such as SOLID, favoring composition over inheritance and using clear naming. Additionally, consistency boundaries and aggregates should be considered to maintain a well-structured domain model.

:p What are some best practices for domain modeling in Python?
??x
Best practices include:
- Keep the domain model close to the business logic.
- Use clear, expressive naming.
- Distinguish between entities and value objects.
- Apply OOP principles like SOLID.
- Prefer composition over inheritance.
- Use magic methods for intuitive object behavior.
- Raise domain-specific exceptions for business rule violations.
These practices ensure that the domain model is both maintainable and expressive of real-world business concepts.
x??

---

#### Repository Pattern Overview
The Repository pattern is a design pattern that acts as an abstraction layer between the domain model and the data access layer. It helps decouple core business logic from infrastructure concerns such as databases, file systems, or external APIs. By introducing a repository, we can simplify data access operations and make our system more testable and maintainable.

This pattern aligns with the Dependency Inversion Principle, which states that high-level modules should not depend on low-level modules. Both should depend on abstractions. In this case, the domain logic depends on the repository interface, not on concrete implementations like database connections.

:p What is the purpose of the Repository pattern in software design?
??x
The Repository pattern serves to abstract data access logic, allowing the domain layer to interact with data without knowing the underlying storage mechanism. It promotes loose coupling, enhances testability, and supports the inversion of dependencies by providing a clean interface between business logic and data persistence.

Example:
```java
// Domain layer uses this interface
public interface UserRepository {
    User findById(Long id);
    void save(User user);
}

// Implementation in data layer
public class DatabaseUserRepository implements UserRepository {
    public User findById(Long id) {
        // Database query logic here
    }
    public void save(User user) {
        // Save logic here
    }
}
```
x??

---

#### Dependency Inversion Principle and Repository
The Dependency Inversion Principle (DIP) suggests that abstractions should not depend on details; rather, details should depend on abstractions. The Repository pattern is one way to apply DIP in practice. Instead of having domain classes directly interact with database classes, they interact with repository interfaces.

This makes it easier to swap implementations (e.g., switch from a SQL database to a NoSQL one), mock repositories for unit testing, and manage complex data access logic separately from business logic.

:p How does the Repository pattern support the Dependency Inversion Principle?
??x
The Repository pattern supports DIP by ensuring that the domain or application layer depends on abstractions (i.e., repository interfaces) rather than concrete implementations (e.g., database classes). This allows developers to change data access strategies without affecting the core logic, improving flexibility and maintainability.

For example:
```java
// Domain logic depends on interface
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUser(Long id) {
        return userRepository.findById(id);
    }
}
```
x??

---

#### Testing with Repository Pattern
One of the main benefits of using the Repository pattern is improved testability. Because data access is abstracted into a repository, it's easy to mock or stub the repository during unit tests. This means you can test business logic without needing to set up a real database.

:p Why is the Repository pattern beneficial for testing?
??x
The Repository pattern improves testability because it allows developers to replace real data sources with mock or in-memory implementations during testing. This eliminates dependencies on external systems like databases, making tests faster, more reliable, and easier to run in isolation.

Example:
```java
// Mock repository for testing
public class MockUserRepository implements UserRepository {
    private final Map<Long, User> users = new HashMap<>();

    public User findById(Long id) {
        return users.get(id);
    }

    public void save(User user) {
        users.put(user.getId(), user);
    }
}
```
x??

---

#### Repository Interface Design
A well-designed repository interface should define methods that reflect common data access operations such as `find`, `save`, `update`, `delete`, and `findAll`. These methods abstract away the complexities of the underlying data source and provide a clean API for the domain layer.

:p What are typical methods found in a Repository interface?
??x
Typical methods in a Repository interface include `findById`, `findAll`, `save`, `update`, and `delete`. These methods abstract the operations needed to manage data entities, hiding the details of how data is stored or retrieved.

Example:
```java
public interface ProductRepository {
    Product findById(Long id);
    List<Product> findAll();
    void save(Product product);
    void update(Product product);
    void delete(Long id);
}
```
x??

---

#### Repository vs DAO
While both the Repository and Data Access Object (DAO) patterns aim to abstract data access, they differ in their scope and intent. A DAO typically maps directly to a table and exposes CRUD operations for a single entity. A Repository, however, often represents a collection of entities and may encapsulate more complex business logic.

:p How does a Repository differ from a DAO?
??x
A DAO (Data Access Object) usually maps to a single table and provides basic CRUD operations for a specific entity. A Repository, on the other hand, represents a collection of entities and often includes higher-level query methods or business logic. Repositories are more focused on domain concepts rather than database structures.

Example:
```java
// DAO - simple CRUD
public class ProductDAO {
    public Product findById(Long id) { /* DB query */ }
    public void save(Product product) { /* Insert */ }
}

// Repository - collection-based
public interface ProductRepository {
    List<Product> findByCategory(String category);
    List<Product> findExpensiveProducts(double threshold);
}
```
x??

---

#### Benefits of Using Repository Pattern
The Repository pattern brings several advantages including improved maintainability, scalability, testability, and adherence to SOLID principles. It allows teams to evolve the data access layer independently from the business logic and supports techniques like mocking and dependency injection.

:p What are the key benefits of applying the Repository pattern?
??x
Key benefits of using the Repository pattern include:
- **Decoupling**: Domain logic is decoupled from data access logic.
- **Testability**: Easy to mock repositories for unit testing.
- **Maintainability**: Changes in data access can be made without affecting business logic.
- **Flexibility**: Supports multiple data sources or storage technologies.
- **SOLID compliance**: Helps implement the Dependency Inversion Principle and Single Responsibility Principle.

```java
// Example of flexible data source usage
public class OrderService {
    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<Order> getRecentOrders() {
        return orderRepository.findRecentOrders();
    }
}
```
x??

---

