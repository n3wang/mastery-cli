# High-Quality Flashcards: 027---Architecture-Patterns-with-Python_processed (Part 13)

**Starting Chapter:** On Deciding What Kind of Tests to Write

---

#### Service Layer as an API
The service layer acts as an abstraction that provides a consistent interface for interacting with the system. It allows multiple entry points (e.g., HTTP API, CLI, background jobs) to access the system’s functionality without tightly coupling those entry points to the internal domain model. This design promotes flexibility and maintainability.

:p What is the role of the service layer in system design?
??x
The service layer functions as an API that exposes the core functionality of the system. It serves as a boundary between external clients and the internal domain logic. By testing only against this layer, developers reduce coupling to the domain model, which allows for easier refactoring of domain objects without breaking tests. This approach aligns with the principle of minimizing glue code in tests.
x??

---

#### Testing Against the Service Layer
Testing against the service layer (as opposed to directly against domain objects) reduces the number of changes needed when refactoring the domain model. It ensures that tests do not depend on internal implementation details like private methods or attributes. This makes the system more resilient to change.

:p Why is it beneficial to test only against the service layer?
??x
Testing against the service layer avoids tight coupling to internal domain model details such as private methods or attributes. This allows developers to refactor domain objects freely without updating tests. It also ensures that tests focus on behavior rather than implementation, improving maintainability and reducing brittle tests.
x??

---

#### The Test Spectrum and Design Feedback
The spectrum of testing ranges from high-level integration tests (like HTTP API tests) to low-level unit tests (like those targeting domain objects). High-level tests offer less design feedback but more confidence in large-scale changes. Low-level tests provide strong design feedback but increase coupling and make refactoring harder.

:p How does the choice of test level affect system design and changeability?
??x
High-level tests (e.g., HTTP API tests) offer minimal design feedback but ensure that large-scale changes (like schema updates) do not break the system. In contrast, low-level tests (e.g., domain object tests) provide strong feedback on design decisions but increase coupling and make future changes more difficult. Balancing these is key to maintaining a flexible architecture.
x??

---

#### Glue Code in Tests
Every line of test code acts like a blob of glue that binds the system into a fixed shape. The more low-level tests (which touch private methods or internal structures), the harder it becomes to refactor or modify the system. Therefore, minimizing such tests is a best practice.

:p Why is it important to avoid low-level tests?
??x
Low-level tests (which interact with private methods or internal structures) act as "glue" that binds the system to a specific shape. These tests make the system harder to refactor because any change to internal logic can break many tests. To maintain flexibility, focus on testing behavior at higher levels, such as the service layer.
x??

---

#### Domain Language in Tests
Tests that read in the domain language help guide the design of domain objects and make the system more intuitive. When tests reflect domain concepts, they serve as a form of documentation and encourage better design practices.

:p How do domain-specific test language improve system design?
??x
Tests written in the domain language help clarify the intent and behavior of domain objects. They act as a design guide, encouraging developers to model the system in a way that reflects real-world concepts. This improves both readability and maintainability, as the codebase aligns with domain understanding.
x??

---

#### Extreme Programming (XP) and Listening to Code
Extreme Programming encourages developers to "listen to the code" by paying attention to test feedback. If tests are hard to write or reveal code smells, it’s a signal to refactor the design. This feedback loop is more effective when tests interact closely with the target code.

:p What does it mean to “listen to the code” in XP?
??x
"Listening to the code" means that developers should pay attention to what the code tells them through test behavior. If tests are difficult to write or reveal design flaws, it’s a sign to refactor. This feedback is most effective when tests are written against the actual domain objects, not just abstractions.
x??

---

#### Refactoring and Test Coupling
Refactoring becomes harder when tests are tightly coupled to internal implementation details. Tests that target domain models directly (e.g., private methods) make it difficult to modify those models without breaking tests.

:p How does tight coupling in tests affect refactoring?
??x
When tests are tightly coupled to internal implementation details (like private methods or attributes), refactoring becomes more difficult. Any change to those internal structures breaks many tests, increasing the cost of change. By testing only the service layer, developers can refactor domain models freely.
x??

---

#### The Role of Unit Tests in Early Design
Unit tests written early in development often help define and refine the domain model. These tests are used to explore and understand the required behavior of domain objects, guiding the design toward a more intuitive and domain-aligned structure.

:p What role do early unit tests play in domain modeling?
??x
Early unit tests are used to explore and define the behavior of domain objects. They help developers understand the required functionality and guide the design toward a structure that reflects domain concepts. These tests are instrumental in shaping the domain model during the early stages of development.
x??

---

#### Design Feedback vs. Coupling Trade-off
There is a trade-off between design feedback (from low-level tests) and coupling (from tight test dependencies). High-level tests provide less feedback but more flexibility, while low-level tests provide strong feedback but reduce flexibility.

:p What is the trade-off between design feedback and coupling in testing?
??x
Design feedback refers to how much insight tests give into the internal structure and design of the code. Low-level tests offer strong feedback but increase coupling to implementation details, making refactoring harder. High-level tests provide less feedback but reduce coupling, making the system more flexible to change.
x??

---

#### Test-Level Abstraction and Living Documentation
When writing tests, we aim to make them readable in the domain language so they act as living documentation. This helps new team members quickly understand how the system works and how core concepts interrelate. Tests written at this level reflect our intuitive understanding of the problem.
:p What is the benefit of writing tests in the domain language?
??x
Tests written in the domain language act as executable documentation, making it easier for new team members to understand how the system works and how core concepts interrelate. They also serve as a sketch of new behaviors, helping us visualize how code might look before implementation.
x??

---

#### High Gear vs. Low Gear Testing Strategy
We often use a "gear" metaphor for testing: low gear (domain-level tests) for starting projects or solving complex problems, where we get better feedback and executable documentation; high gear (service-layer tests) for routine feature additions or bug fixes, where we prefer lower coupling and higher coverage.
:p What does the "gear" metaphor represent in testing strategy?
??x
The "gear" metaphor represents the shift between testing at different abstraction levels. Low gear (domain-level) is used when starting a project or dealing with complex problems to get better feedback and documentation. High gear (service-layer) is used for routine tasks where lower coupling and higher coverage are preferred.
x??

---

#### Service Layer Tests and Domain Coupling
Service-layer tests are typically written against the service layer to reduce coupling and increase coverage. However, these tests still depend on domain objects for test setup. If we want full decoupling, we must rewrite the service API to work with primitive types.
:p Why do service-layer tests still couple to the domain?
??x
Service-layer tests still couple to the domain because they use domain objects to set up test data and invoke service functions. Even though the service layer itself might be abstracted, test code often directly instantiates domain objects like `Batch` or `OrderLine`.
x??

---

#### Fully Decoupling Service Layer Tests Using Primitives
To fully decouple service-layer tests from the domain, we rewrite the service API to accept only primitive types (strings, integers, etc.) instead of domain objects. This approach ensures that tests only depend on the service interface and not on internal domain models.
:p How can we fully decouple service-layer tests from the domain?
??x
We can fully decouple service-layer tests by rewriting the service API to accept only primitive types such as strings and integers. For example, instead of passing an `OrderLine` object, we pass `orderid`, `sku`, and `qty` as separate parameters. This removes any dependency on domain objects in the test code.
x??

---

#### Factory Functions for Test Fixtures
To reduce domain dependencies in tests, we can abstract domain object creation into helper functions or fixtures. For example, a `FakeRepository.for_batch()` method can be used to create domain objects without directly instantiating them in each test.
:p What is the purpose of using factory functions in test fixtures?
??x
Factory functions in test fixtures abstract away the direct instantiation of domain objects, centralizing domain dependencies in one place. This makes tests cleaner and easier to update if domain models change, since changes are localized to the factory function.
x??

---

#### Adding a New Service to Remove Domain Dependencies
If we need to remove all domain dependencies from service-layer tests, we can introduce a new service (e.g., `add_batch`) that encapsulates domain logic. This allows us to express all tests in terms of services and primitives, without relying on domain objects directly.
:p Why would you add a new service just to simplify tests?
??x
Adding a new service simplifies tests by removing domain dependencies from the test layer. While not always necessary, if a service is needed anyway (like `add_batch`), it makes sense to introduce it early to reduce coupling and improve test maintainability.
x??

---

#### Example of Service-Layer Test Using Only Primitives
A fully decoupled service-layer test uses only primitive inputs and service calls. For example, `services.add_batch()` and `services.allocate()` are called with only strings and integers, and no domain objects are instantiated directly in the test.
:p How does a fully decoupled service-layer test look in code?
??x
A fully decoupled test looks like this:
```python
def test_allocate_returns_allocation():
    repo, session = FakeRepository([]), FakeSession()
    services.add_batch("batch1", "COMPLICATED-LAMP", 100, None, repo, session)
    result = services.allocate("o1", "COMPLICATED-LAMP", 10, repo, session)
    assert result == "batch1"
```
Here, only primitives are used, and domain objects are created internally by the service.
x??

--- 

#### Design Principle: Avoid Direct Domain Usage in Service Tests
If a service-layer test requires direct interaction with domain objects, it may indicate that the service layer is incomplete or that a missing service should be added to encapsulate that behavior.
:p What does it mean if a service-layer test directly uses domain objects?
??x
If a service-layer test directly uses domain objects, it suggests that the service layer is incomplete or lacks a service for that operation. It's often a sign that a new service should be introduced to encapsulate domain logic and allow tests to be written purely in terms of service calls.
x??

---

#### Adding API Endpoints to Reduce Test Complexity
Adding an API endpoint for adding batches helps decouple E2E tests from direct database access. This approach simplifies test setup by replacing hardcoded SQL queries with API calls, making tests more readable and maintainable.
:p How does adding an API endpoint reduce complexity in E2E tests?
??x
Adding an API endpoint like `/add_batch` allows E2E tests to avoid direct database interactions. Instead of writing hardcoded SQL queries in `conftest.py`, tests can now make HTTP requests to the API. This approach removes the dependency on the database and makes tests more robust and easier to maintain.
x??

---

#### Service Layer Integration with API
The API layer integrates with the service layer by calling service functions. This integration ensures that business logic remains centralized in the service layer, while the API layer only handles HTTP requests and responses.
:p How does the API layer integrate with the service layer?
??x
The API layer integrates with the service layer by calling service functions. For example:
```python
services.add_batch(
    request.json['ref'], request.json['sku'], request.json['qty'], eta,
    repo, session
)
```
This line shows that the API layer parses input, prepares data, and calls the service function `add_batch`, which encapsulates the business logic. This keeps the service layer as the single source of truth for business logic.
x??

---

