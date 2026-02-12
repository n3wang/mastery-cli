# High-Quality Flashcards: 027---Architecture-Patterns-with-Python_processed (Part 32)

**Starting Chapter:** Figure Out How to Integration Test the Real Thing

---

#### Dependency Injection with Functional vs Class-Based Approaches
In dependency injection (DI), we can inject dependencies either as functions or as class instances. The functional approach uses simple callables like `send_mail=lambda *args: None`, while the class-based approach uses abstractions such as `AbstractNotifications`. Functional DI works well for simple dependencies, but for more complex APIs (like email clients or database sessions), a class-based approach allows better encapsulation and testability.

:p What is the difference between functional and class-based dependency injection in this context?
??x
Functional DI uses simple functions or lambdas for dependencies, e.g., `send_mail=lambda *args: None`. This works well for simple tasks like sending a message or publishing an event. However, for more complex dependencies like email services, which have methods like `send`, `connect`, etc., using a class-based approach with an abstract base class provides better structure, testability, and extensibility. For example, `EmailNotifications` implements `AbstractNotifications` with methods like `send()` that encapsulate complex logic.
```python
# Functional approach
send_mail=lambda *args: None

# Class-based approach
class AbstractNotifications(ABC):
    @abstractmethod
    def send(self, destination, message):
        raise NotImplementedError

class EmailNotifications(AbstractNotifications):
    def __init__(self, smtp_host=DEFAULT_HOST, port=DEFAULT_PORT):
        self.server = smtplib.SMTP(smtp_host, port=port)
        self.server.noop()

    def send(self, destination, message):
        msg = f'Subject: allocation service notification {message}'
        self.server.sendmail(
            from_addr='allocations@example.com',
            to_addrs=[destination],
            msg=msg
        )
```
x??

---

#### Abstract Base Classes for Adapters
Abstract base classes (ABCs) define a contract that concrete implementations must follow. In the context of adapters, ABCs are used for dependencies that have complex APIs — for instance, an email notification service may require multiple operations like connecting, sending, and closing a session. Using an ABC ensures consistency across implementations and enables easy swapping of dependencies during testing or deployment.

:p Why do we use abstract base classes for dependencies like email notifications?
??x
Abstract base classes (ABCs) define a contract that ensures all implementations adhere to a consistent interface. For example, `AbstractNotifications` defines a `send()` method that must be implemented by any concrete class like `EmailNotifications`. This allows us to write code that depends on the abstraction rather than a specific implementation. During testing, we can inject a fake version (`FakeNotifications`) without affecting the core logic, promoting loose coupling and testability.
$$
\text{Interface} = \{ \text{send(destination, message)} \}
$$
x??

---

#### Unit Testing with Fake Implementations
When testing, we often need to replace real dependencies with fake ones to isolate the system under test. For example, instead of sending real emails, we might use a `FakeNotifications` class that stores messages in memory. This avoids external side effects, speeds up tests, and makes them more reliable.

:p How do we use a fake implementation in unit tests?
??x
We define a fake class that inherits from the abstract base class and overrides its methods to simulate behavior without side effects. For instance, `FakeNotifications` stores sent messages in a dictionary (`self.sent`) instead of actually sending emails. In tests, we instantiate this fake and assert against its state:
```python
fake_notifs = FakeNotifications()
bus = bootstrap.bootstrap(notifications=fake_notifs, ...)
bus.handle(commands.Allocate(...))
assert fake_notifs.sent['stock@made.com'] == ["Out of stock for POPULAR-CURTAINS"]
```
This ensures that the logic under test works correctly without relying on external systems.
x??

---

#### Building a Notification Adapter Step-by-Step
Creating a notification adapter involves defining an abstract interface (`AbstractNotifications`), implementing it (`EmailNotifications`), and injecting it into the application via dependency injection. This pattern supports multiple notification types (email, SMS, Slack) through polymorphism and promotes clean architecture.

:p How do we build a notification adapter following best practices?
??x
We begin by defining an abstract class (`AbstractNotifications`) that specifies required methods like `send(destination, message)`. Then, we implement it with a concrete class (`EmailNotifications`) that handles real SMTP logic. Finally, we inject the adapter into the system via DI:
```python
def bootstrap(notifications=EmailNotifications()):
    # ...
```
This allows easy substitution of adapters (e.g., for testing or switching from email to SMS) and supports scalability and maintainability.
x??

---

#### Handling Complex Dependencies in DI
Dependencies with complex APIs (e.g., HTTP clients, filesystem access, database connections) are better modeled using classes rather than functions. This enables proper encapsulation, mocking, and testing. Using abstract base classes ensures that all implementations follow a consistent interface, even if their internal logic differs.

:p Why are complex dependencies better modeled using classes than functions?
??x
Functions are limited to single callable behavior, whereas complex dependencies often have multiple operations like `connect`, `read`, `write`, `close`. A class-based approach allows encapsulation of this complexity. For example, `EmailNotifications` handles connection setup, message formatting, and sending in a structured way:
```python
class EmailNotifications(AbstractNotifications):
    def __init__(self, smtp_host=DEFAULT_HOST, port=DEFAULT_PORT):
        self.server = smtplib.SMTP(smtp_host, port=port)
        self.server.noop()
```
This design supports DI, mocking, and clear separation of concerns.
x??

---

#### Dependency Injection Recap
Dependency injection is a technique used to manage dependencies in software systems, especially when dealing with multiple implementations like real and fake adapters. It allows for easier testing, configuration, and decoupling of components. In the context of a bootstrapper, dependency injection ensures that the correct implementations (real or fake) are provided at startup, and can be overridden for testing.

:p What is the purpose of dependency injection in the context of bootstrapping an application?
??x
Dependency injection helps manage how dependencies are provided to components during application startup. It allows for switching between real and fake implementations, such as using a real email adapter in production and a fake one in tests. This makes the system more flexible and testable. The bootstrapper often sets up these dependencies once and provides them to the rest of the application.
x??

---

#### Adapter Pattern with ABC
The adapter pattern involves creating a common interface (using an Abstract Base Class or ABC) that both real and fake implementations adhere to. This allows switching between implementations without changing the code that uses them. The real implementation interacts with actual services like email or SMS, while the fake one (like MailHog) is used for integration testing.

:p Why is it important to define an ABC for adapters in a system?
??x
Defining an ABC ensures a consistent interface for both real and fake implementations. This allows developers to swap out the real adapter for a fake one during testing, without modifying the code that depends on the interface. It also enforces a contract, making the system more predictable and easier to reason about.
x??

---

#### Refactoring Redis Event Publisher to an Adapter
The `redis_eventpublisher` was originally a simple callable. Refactoring it into an adapter means creating a formal interface (e.g., using an ABC) and implementing both real and fake versions. This improves maintainability and allows for better testing and extension.

:p How does refactoring a callable into an adapter improve code structure?
??x
Refactoring a callable into an adapter formalizes the interface, allowing for multiple implementations. This makes the code more modular and testable. For example, the real Redis publisher can be swapped with a fake one for unit tests, and it becomes easier to add new implementations like a Slack publisher in the future.
x??

---

#### Twilio or Slack Notification Adapters
Notification systems can be extended to support different channels like SMS (via Twilio) or Slack. Adapters for these services can be built using the same pattern as email adapters, allowing the application to send notifications through various channels without changing the core logic.

:p How can you extend notification adapters to support SMS or Slack?
??x
By creating new adapter implementations that follow the same interface (ABC) as email adapters. For example, a Twilio adapter can be built to send SMS messages, and a Slack adapter can send messages to Slack channels. These adapters can be injected in place of the email adapter depending on configuration or environment.
x??

---

#### Flask App Factories and Global State
In Flask applications, global state (like a global `app` object) can cause issues when trying to test in-process using Flask's test client. Using app factories helps avoid global state and makes testing more reliable.

:p Why might global state in Flask cause problems during testing?
??x
Global state in Flask (like a global `app` object) can interfere with in-process testing using Flask’s test client. It makes it harder to isolate tests or run multiple app instances. Using app factories avoids this by creating a new app instance for each test, ensuring clean and predictable behavior.
x??

---

#### Summary of Adapter Pattern Workflow
The workflow for implementing the adapter pattern includes: 1) defining an interface using an ABC, 2) implementing the real adapter, 3) building a fake adapter for unit tests, 4) using a less fake version in Docker, and 5) testing the real version. This ensures a consistent and testable system.

:p What are the steps involved in implementing an adapter pattern?
??x
The steps are: 1) Define an interface using an ABC, 2) Implement the real adapter for production, 3) Build a fake adapter for unit testing, 4) Use a less fake version (e.g., MailHog) in Docker for integration tests, and 5) Test the real adapter in production. This ensures consistent behavior and testability across environments.
x??

---

#### Separating Entangled Responsibilities
When working with a legacy system, one of the main issues is the entanglement of responsibilities across different parts of the codebase. In a "big ball of mud", every part of the system looks similar because components lack clear boundaries and distinct roles. This makes it difficult to understand, modify, or extend the system.

The solution involves building a **service layer** that clearly separates concerns. Each use case (like "Create Workspace" or "Delete Document Version") should be handled by a dedicated function or class. These functions manage their own database transactions, fetch required data, check preconditions, update the domain model, and persist changes — all as atomic units.

:p How do we begin to separate responsibilities in a legacy system?
??x
To start, identify the use cases in your system. For example, if you're working with a web application, actions like "Apply Billing Charges" or "Raise Purchase Order" are use cases. Each use case should be encapsulated in a single function or class that:
1. Starts its own database transaction if needed.
2. Fetches any required data.
3. Checks preconditions (e.g., using an "Ensure" pattern).
4. Updates the domain model.
5. Persists any changes.

This approach ensures each operation is atomic and easier to reason about. Avoid long-running transactions and keep inter-use-case calls minimal.

Example pseudocode:
```pseudocode
function CreateWorkspace(workspaceName, userId):
    startTransaction()
    user = fetchUser(userId)
    ensureUserHasPermission(user, "create_workspace")
    workspace = new Workspace(name=workspaceName)
    saveWorkspace(workspace)
    commitTransaction()
```
x??

---

#### Use Case Identification and Atomic Operations
Identifying use cases is crucial for untangling a legacy system. A use case represents a meaningful operation from the user’s perspective, such as "Apply Billing Charges" or "Clean Abandoned Accounts". These should be named imperatively and treated as atomic units of work.

Each use case must:
- Manage its own database transaction
- Fetch required data
- Validate preconditions
- Update the domain model
- Persist changes

This structure helps isolate logic and makes testing and debugging easier. It also allows for better communication with stakeholders by aligning technical work with business outcomes.

:p Why should each use case be treated as an atomic unit?
??x
Each use case should be atomic because it ensures that either all steps complete successfully, or none do. This prevents partial updates that can lead to inconsistent data states. Atomicity is enforced through database transactions, which ensure that either all changes are committed or rolled back.

For example:
```java
public class CreateWorkspaceHandler {
    public void handle(CreateWorkspaceCommand command) {
        Transaction tx = beginTransaction();
        try {
            User user = userRepository.findById(command.getUserId());
            ensureUserCanCreateWorkspace(user);
            Workspace workspace = new Workspace(command.getName());
            workspaceRepository.save(workspace);
            tx.commit();
        } catch (Exception e) {
            tx.rollback();
            throw e;
        }
    }
}
```
x??

---

#### Refactoring Legacy Systems: The Service Layer Approach
In many legacy systems, logic is scattered across web handlers, managers, helpers, and even domain models. This leads to confusion and makes the system hard to maintain. Introducing a service layer helps centralize business logic, separating concerns and making the system more modular.

By extracting logic into command handlers or service classes, you create a clearer separation between data access, orchestration, and domain logic. Even if this results in duplicated code initially, it’s better than having tangled dependencies.

:p What is the benefit of introducing a service layer in a legacy system?
??x
Introducing a service layer allows you to centralize business logic, separating concerns like data access, orchestration, and domain logic. This improves maintainability, readability, and testability.

Example:
Before refactoring:
```java
// Domain model directly calls database
class Document {
    void save() {
        // Direct DB call inside model
        db.save(this);
    }
}
```

After refactoring:
```java
class DocumentService {
    void createDocument(CreateDocumentCommand cmd) {
        // Logic in service layer
        Document doc = new Document(cmd.title);
        documentRepository.save(doc);
    }
}
```
x??

---

#### Architecture Tax and Linking Cleanup to Feature Work
When refactoring a legacy system, it's often difficult to justify spending time cleaning up code without a clear business reason. One effective strategy is to link architectural cleanup to upcoming feature development or product launches. This is referred to as "architecture tax" — the idea that you can invest in cleaning up the codebase during periods where new features are being built.

:p How can architectural cleanup be justified in a legacy system?
??x
Architectural cleanup can be justified by aligning it with feature development or product milestones. For example, if you're launching a new product or expanding into new markets, this is the perfect time to invest in improving the system’s foundation.

This approach makes it easier to get buy-in from stakeholders because the cleanup work is tied to tangible business value.

Example:
If your team is building a new feature, you can propose:
- 3 weeks of cleanup work to improve performance or reduce technical debt
- In exchange for better maintainability and faster delivery of future features

This strategy turns cleanup from a cost into an investment.
x??

---

