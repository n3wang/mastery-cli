# High-Quality Flashcards: 027---Architecture-Patterns-with-Python_processed (Part 4)

**Starting Chapter:** Unit Testing Domain Models

---

#### Allocation Service Overview
This section introduces a new allocation service that enhances inventory management by considering not just physical warehouse stock, but also upcoming shipments. This innovation allows treating future incoming goods as part of available inventory, thereby reducing apparent stockouts and improving sales and inventory efficiency. The challenge arises in how to allocate orders to batches of stock, which now includes both warehouse stock and shipment batches with specific arrival times (ETA).

:p What is the core idea behind the new allocation system?
??x
The core idea is to treat incoming shipments as part of the inventory, allowing allocation to future stock based on expected arrival times (ETA). This enables more accurate stock availability, reduces false out-of-stock situations, and supports better inventory decisions by enabling lower warehouse stock levels while maintaining sales performance. The system must manage allocation between warehouse stock and shipment batches, prioritizing warehouse stock and then allocating to shipment batches in order of earliest ETA.
x??

---

#### Domain Modeling and Ubiquitous Language
Domain modeling involves working with business experts to understand and define the core concepts of the system. A shared vocabulary (ubiquitous language) is used to ensure clarity and consistency between developers and business stakeholders. Examples are used to illustrate rules, and identifiers are chosen for clarity and memorability.

:p Why is domain modeling important in system design?
??x
Domain modeling is crucial because it aligns technical implementation with business understanding. It ensures that the system's language and structure reflect real-world business concepts. Using a ubiquitous language (shared vocabulary) helps prevent misunderstandings between teams and ensures that the system accurately represents business rules.

For example, terms like SKU, batch, and ETA are defined clearly and consistently, enabling all stakeholders to communicate effectively.
x??

---

#### Batch and OrderLine Classes
The `Batch` and `OrderLine` classes are core components of the domain model. `OrderLine` is an immutable dataclass representing an order line with `orderid`, `sku`, and `qty`. `Batch` holds information about a batch of stock, including `reference`, `sku`, `eta` (expected time of arrival), and `available_quantity`. The `allocate` method in `Batch` reduces the available quantity by the quantity of the order line.

:p How does the `allocate` method in the `Batch` class work?
??x
The `allocate` method reduces the `available_quantity` of the batch by the quantity of the `OrderLine` being allocated. It is a simple subtraction operation, as shown in the code:
```python
def allocate(self, line: OrderLine):
    self.available_quantity -= line.qty
```
This reflects a basic inventory allocation logic where stock is reserved for an order.
x??

---

#### Testing Allocation Logic
The `can_allocate` method is introduced to determine whether a batch can fulfill an order line. It checks if the `available_quantity` of the batch is sufficient to meet the `qty` of the `OrderLine`, and also ensures that the SKUs match. This method is crucial for preventing incorrect allocations.

:p What conditions must be met for a batch to be able to allocate an order line?
??x
For a batch to allocate an order line, two conditions must be satisfied:
1. The `available_quantity` of the batch must be greater than or equal to the quantity (`qty`) of the `OrderLine`.
2. The `sku` of the batch must match the `sku` of the `OrderLine`.

This logic is captured in a `can_allocate` method:
```python
def can_allocate(self, line: OrderLine):
    return self.sku == line.sku and self.available_quantity >= line.qty
```
x??

---

#### Immutable Dataclass for OrderLine
`OrderLine` is defined as a `@dataclass(frozen=True)`, which makes it immutable. This is a good practice for domain entities that should not change after creation, ensuring data integrity.

:p Why is `OrderLine` defined as a frozen dataclass?
??x
`OrderLine` is defined as a frozen dataclass to ensure immutability. Once an `OrderLine` object is created, its attributes cannot be changed. This is important for maintaining data consistency in domain models, especially in systems where entities represent fixed business facts:
```python
@dataclass(frozen=True)
class OrderLine:
    orderid: str
    sku: str
    qty: int
```
This design prevents accidental modifications and supports predictable behavior.
x??

---

#### Designing for Business Language
The names of classes and variables in domain models are chosen to match business terminology. This makes the code easier to understand for both technical and non-technical stakeholders.

:p How does using business terminology in code benefit collaboration?
??x
Using business terminology in code helps bridge the gap between technical and non-technical team members. For example, naming a class `Batch` and a method `allocate` aligns with inventory management concepts. This makes the code self-explanatory and easier for stakeholders to review and validate:
```python
batch = Batch("batch-001", "SMALL-TABLE", qty=20, eta=date.today())
```
This makes it easy for a product manager to understand the code without deep technical knowledge.
x??

---

#### Batch Allocation Logic
The `can_allocate` method determines whether an order line can be allocated to a batch based on SKU match and sufficient available quantity. This logic is central to inventory management in a domain-driven design approach.
:p What does the `can_allocate` method check?
??x
The method checks two conditions: that the batch's SKU matches the order line's SKU and that the available quantity in the batch is greater than or equal to the quantity requested in the line. This ensures correct allocation without overcommitting inventory.
$$
\text{can\_allocate(line)} = (\text{self.sku} == \text{line.sku}) \land (\text{available\_quantity} \geq \text{line.qty})
$$
In code:
```python
def can_allocate(self, line: OrderLine) -> bool:
    return self.sku == line.sku and self.available_quantity >= line.qty
```
x??

---

#### Tracking Allocated Order Lines
To support deallocation, the `Batch` class now tracks which `OrderLine` objects have been allocated to it using a set (`_allocations`). This allows for precise control over what can be deallocated and prevents invalid operations.
:p Why is a set used for `_allocations`?
??x
A set is used because it enforces uniqueness of elements, ensuring that the same order line cannot be allocated multiple times to the same batch. It also supports efficient lookup and removal operations.
```python
self._allocations = set()  # type: Set[OrderLine]
```
This enables methods like `allocate()` and `deallocate()` to work correctly:
```python
def allocate(self, line: OrderLine):
    if self.can_allocate(line):
        self._allocations.add(line)

def deallocate(self, line: OrderLine):
    if line in self._allocations:
        self._allocations.remove(line)
```
x??

---

#### Idempotent Allocation
The test `test_allocation_is_idempotent` verifies that allocating the same order line multiple times to a batch results in correct behavior — specifically, that the available quantity decreases only once.
:p Why is idempotent allocation important?
??x
Idempotent allocation ensures that allocating the same line multiple times doesn’t cause incorrect inventory depletion. Since the `_allocations` set stores unique lines, repeated allocations have no additional effect beyond the first one.
```python
def allocate(self, line: OrderLine):
    if self.can_allocate(line):
        self._allocations.add(line)
```
If the same line is added again, it won’t change the set or the allocated quantity.
x??

---

#### Domain Model Complexity and Future Extensibility
While the current model is simple, real-world systems require handling complex business rules such as delivery dates, supplier-specific SKUs, regional warehouse allocation, and more.
:p What challenges arise when extending the domain model?
??x
Challenges include managing conditional logic for delivery dates, handling SKUs that are ordered directly from suppliers, and applying geographic constraints for warehouse allocation. These require careful design to maintain encapsulation and avoid a "ball of mud" architecture.
For example, a customer in Europe might not be allowed to receive items from a warehouse in Asia unless the SKU supports cross-region shipping.
x??

---

#### NewType for Strong Typing
In Python, `typing.NewType` is used to create distinct types from existing ones, enhancing type safety by preventing accidental mixing of incompatible types. For example, `Quantity = NewType("Quantity", int)` creates a new type called `Quantity` that behaves like an `int` but is distinct from other `int` values. This helps catch errors at type-checking time rather than runtime.

:p What is the purpose of using `NewType` in Python?
??x
`NewType` is used to create new types that are distinct from their base types (e.g., `Quantity = NewType("Quantity", int)`), improving type safety by preventing incorrect usage such as passing a `Quantity` where a `str` is expected. It does not change runtime behavior but helps static type checkers enforce correctness.
x??

---

#### Batch Class with Typed Parameters
The `Batch` class uses `NewType` to define types like `Reference`, `Sku`, and `Quantity`. These types help ensure that parameters passed into the constructor are of the correct logical type, improving code clarity and reducing bugs.

:p How does using `NewType` in a `Batch` class improve code quality?
??x
By defining types like `Reference`, `Sku`, and `Quantity` using `NewType`, the `Batch` class enforces type safety during development. For example, passing a `Sku` where a `Reference` is expected will raise a type error before runtime, making it easier to spot mistakes.
x??

---

#### Value Objects and Immutability
A value object is a domain object identified by its data rather than identity. It is typically immutable, meaning once created, its state cannot be changed. In Python, using `@dataclass(frozen=True)` ensures immutability and enables value equality, where two objects with identical attributes are considered equal.

:p Why are value objects often immutable?
??x
Value objects are immutable because they represent data that should not change over time. Using `@dataclass(frozen=True)` ensures that once an object is created, its fields cannot be modified, which supports predictable behavior and makes it safe to use them as keys in dictionaries or elements in sets.
x??

---

#### Dataclasses for Value Objects
Using `@dataclass(frozen=True)` simplifies creating immutable value objects. It automatically generates methods like `__init__`, `__repr__`, and `__eq__`. This pattern is common for business concepts like `OrderLine`, which has no identity but holds meaningful data.

:p What are the benefits of using `@dataclass(frozen=True)` for value objects?
??x
`@dataclass(frozen=True)` automatically generates useful methods like `__init__`, `__repr__`, and `__eq__`. It also enforces immutability, which is essential for value objects, ensuring that their state remains consistent and predictable across the application.
x??

---

#### NamedTuple vs Dataclass for Value Objects
Both `NamedTuple` and `dataclass` can be used to define value objects. However, `NamedTuple` is immutable by default and lightweight, while `dataclass` offers more flexibility, including support for default values, field annotations, and custom behavior.

:p When would you prefer `NamedTuple` over `dataclass` for a value object?
??x
`NamedTuple` is preferred when simplicity and performance are key, and you don't need features like default values or custom logic in your class. It's also immutable by default and suitable for lightweight data containers like `Money(currency: str, value: int)`.
x??

---

#### OrderLine as a Value Object
`OrderLine` represents a business concept with no unique identity, defined by its `orderid`, `sku`, and `qty`. It is modeled as a value object using `@dataclass(frozen=True)` to ensure immutability and equality based on data.

:p How is `OrderLine` modeled as a value object?
??x
`OrderLine` is modeled as a value object using `@dataclass(frozen=True)`, making it immutable and defining equality based on the values of `orderid`, `sku`, and `qty`. This ensures that two lines with the same data are treated as equal.
x??

---

#### Equality in Value Objects
In value objects, equality is based on the data they contain rather than their identity. This is achieved through automatic generation of `__eq__` in `@dataclass(frozen=True)` or `NamedTuple`.

:p What determines equality in value objects?
??x
Equality in value objects is determined by the values of their fields. For example, two `OrderLine` objects with the same `orderid`, `sku`, and `qty` are considered equal, even if they are separate instances in memory.
x??

---

#### Example: Line as a NamedTuple
`Line` is defined using `namedtuple('Line', ['sku', 'qty'])`, a concise way to define a simple immutable data structure. It behaves like a tuple but with named fields, useful for representing simple business entities.

:p What is the advantage of using `namedtuple` for representing simple data structures?
??x
`namedtuple` provides a concise and immutable way to define simple data structures with named fields. It avoids boilerplate code and supports value equality, making it ideal for representing lightweight business concepts like a `Line` in an order.
x??

---

---

#### Equality in Value Objects
In value objects, equality is based on the values of their attributes. For instance, `Name("Harry", "Percival") == Name("Harry", "Percival")` evaluates to true, but `Name("Harry", "Percival") == Name("Barry", "Percival")` is false. This behavior aligns with real-world intuition: two names are equal only if both first and last names match.
:p How is equality defined for value objects?
??x
Equality for value objects is defined as equality of all their attributes. For example, two `Name` objects are equal only if both the first and last names are the same. This mirrors real-world logic where two things are considered equal only if all their properties match.
x??

---

#### Hashing in Value Objects
For value objects, `__hash__` must be based on all value attributes to ensure that equal objects have the same hash. This is required when using value objects in sets or as dictionary keys. Python's `@frozen` decorator ensures immutability, which makes the hash safe to compute and use.
:p Why is hashing important for value objects?
??x
Hashing ensures that objects with the same values have the same hash, which is necessary for using them in sets or as dictionary keys. For value objects, the hash must be based on all value attributes. Using `@frozen=True` on a dataclass enforces immutability, which is essential for safe hashing.
x??

---

#### Hashing in Entities
Entities have identity-based equality, so their `__hash__` is typically based on their identity (e.g., a unique reference). This ensures that even if an entity's attributes change, its hash remains consistent, which is important for maintaining object identity in collections.
:p How is hashing implemented for entities?
??x
For entities, `__hash__` is typically based on a unique identifier like a reference or ID. For example, in a `Batch` class, the hash is based on `self.reference`. This ensures that even if other attributes change, the entity remains consistent in collections like sets or dictionaries.
x??

---

#### Example: Batch as an Entity
A `Batch` is an entity because it is uniquely identified by its reference. Even if other properties like the arrival date or allocated lines change, it remains the same batch. Equality is defined by identity (reference), not by attributes.
:p How is equality implemented for the Batch entity?
??x
Equality for `Batch` is implemented by comparing the `reference` attribute:  
```python
def __eq__(self, other):
    if not isinstance(other, Batch):
        return False
    return other.reference == self.reference
```
This ensures that two `Batch` objects are equal only if they have the same reference, reflecting their identity-based nature.
x??

---

#### Immutability and Value Objects
Value objects must be immutable to ensure that their hash remains consistent and that they behave predictably in collections. In Python, this is often enforced using `@frozen=True` in dataclasses, which prevents modification after creation.
:p Why is immutability important for value objects?
??x
Immutability ensures that the hash of a value object remains consistent, which is required for safe use in sets and dictionaries. It also prevents unexpected behavior when comparing or using objects in collections. In Python, `@frozen=True` in a dataclass enforces immutability.
x??

---

