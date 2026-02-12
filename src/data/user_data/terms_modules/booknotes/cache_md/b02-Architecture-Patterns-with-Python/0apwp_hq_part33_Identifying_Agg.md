# High-Quality Flashcards: 027---Architecture-Patterns-with-Python_processed (Part 33)

**Starting Chapter:** Identifying Aggregates and Bounded Contexts

---

#### Separating I/O Concerns from Domain Logic
Domain models should not contain I/O operations such as sending emails, writing files, or interacting with external services. These concerns should be moved into use-case functions or handlers. This separation ensures that the domain logic remains pure and testable, while I/O concerns are handled at a higher level. Techniques from Chapter 3 (abstractions) are used to keep handlers unit testable even when performing I/O.

:p Why should I/O operations be separated from domain models?
??x
I/O operations like sending emails or writing files should be kept outside of domain models because they introduce side effects and make the domain logic harder to test and reason about. By moving I/O concerns into use-case functions or handlers, we maintain a clean separation between business logic and infrastructure concerns. This makes the domain model pure, which enhances testability and maintainability. For example, instead of having a method in a `User` class send an email, the email sending logic should be handled in a use-case handler.
```java
// Domain model (pure)
public class User {
    private String email;
    public void updateEmail(String newEmail) {
        this.email = newEmail;
    }
}

// Use-case handler (handles I/O)
public class UpdateEmailUseCase {
    private EmailService emailService;
    public void execute(User user, String newEmail) {
        user.updateEmail(newEmail);
        emailService.sendConfirmationEmail(user.email);
    }
}
```
x??

---

#### Avoiding Deep Object Graph Navigation
Deep navigation through object graphs (e.g., `user.account.workspaces[0].documents.versions[1].owner.account.settings[0]`) leads to performance problems and tight coupling. Instead, use references and identifiers to break direct links between objects, which allows for better performance and easier maintenance. This approach avoids triggering multiple database queries when accessing nested properties.

:p How does deep object graph navigation affect performance and maintainability?
??x
Deep object graph navigation causes performance issues like the N+1 query problem, where each property access might trigger a database lookup. It also leads to tight coupling between objects, making the system harder to maintain and reason about. To mitigate this, replace direct references with identifiers and fetch related data using explicit queries. For example, instead of traversing deeply, use a repository to fetch a document by its ID and then query for its parent folder.
```java
// Instead of:
document.owner.account.settings[0]

// Use:
Folder folder = folderRepository.findById(document.parentFolderId);
```
x??

---

#### Handling Recursion Over Collections
Operations that recursively loop over collections (e.g., folders and documents) can severely impact performance. These loops often result in lazy-loaded ORM queries, which cause many small database hits. Instead, such operations should be replaced with efficient database queries using SQL or similar mechanisms.

:p How should recursive operations over collections be handled for performance?
??x
Recursive operations over collections should be replaced with efficient database queries to avoid performance bottlenecks caused by lazy-loaded ORM queries. For example, instead of recursively traversing folder structures in code, write a SQL query that fetches all documents within a folder tree. This avoids the N+1 problem and makes the system scalable.
```sql
-- Example SQL to fetch all documents in a folder tree
WITH RECURSIVE folder_tree AS (
    SELECT id, name, parent_id FROM folders WHERE id = ?
    UNION ALL
    SELECT f.id, f.name, f.parent_id FROM folders f
    JOIN folder_tree ft ON f.parent_id = ft.id
)
SELECT d.* FROM documents d
JOIN folder_tree ft ON d.folder_id = ft.id;
```
x??

---

#### Identifying Aggregates and Bounded Contexts
A key challenge in legacy systems is highly connected object graphs. Identifying aggregates and bounded contexts helps to decouple these relationships. Aggregates should be designed so that they encapsulate a clear business boundary and avoid bidirectional links. This leads to better performance, easier testing, and clearer responsibility boundaries.

:p What is the significance of identifying aggregates and bounded contexts in a legacy system?
??x
Identifying aggregates and bounded contexts helps break tight coupling in legacy systems by defining clear boundaries for consistency. Aggregates should encapsulate a business boundary and avoid bidirectional relationships. Bounded contexts define where each aggregate lives and how it interacts with others. This approach makes the system more modular, testable, and scalable. For example, a `User` aggregate might not directly reference `Workspace`, but instead use a `workspaceId` to fetch related data.
```java
// Before: Bidirectional relationship
class User {
    List<Workspace> workspaces;
}

class Workspace {
    User owner; // Bidirectional
}

// After: Unidirectional reference
class User {
    List<UUID> workspaceIds;
}

class Workspace {
    UUID userId; // Reference to user, not direct object
}
```
x??

---

#### Using References Instead of Direct Object Links
In the original design, objects were directly linked to each other (e.g., `Document` knows its `Folder`, and `Folder` has a list of `Documents`). This creates tight coupling and makes it difficult to reason about consistency. Instead, use references (like IDs) to break these links and allow for more flexible data access.

:p Why should objects use references instead of direct object links?
??x
Direct object links create tight coupling, making the system harder to maintain and prone to performance issues. Using references (IDs) breaks these links, allowing for cleaner data access and easier querying. For example, a `Document` can reference its `Folder` by ID, but not directly access the folder object. This promotes eventual consistency and avoids deep traversal issues.
$$
\text{Document} \rightarrow \text{FolderId} \quad \text{(instead of)} \quad \text{Document} \rightarrow \text{Folder}
$$
```java
public class Document {
    private UUID folderId;
    private String title;
    // No direct reference to Folder object
}
```
x??

---

#### Performance Optimization Through SQL Queries
Legacy systems often rely on nested loops and ORM lazy loading, which can cause performance degradation. Replacing these with direct SQL queries or read models allows for efficient data access without triggering multiple database hits.

:p How can performance be improved by replacing nested loops with SQL queries?
??x
Nested loops in code that trigger lazy-loaded ORM queries lead to the N+1 problem, where each iteration causes a database hit. By replacing these with SQL queries or read models, we can fetch all necessary data in fewer, optimized queries. This approach is especially useful for hierarchical data like folder trees or document structures.
```sql
-- Instead of nested loops in code:
SELECT * FROM folders WHERE parent_id = ?;
SELECT * FROM documents WHERE folder_id = ?;

-- Use a recursive query:
WITH RECURSIVE folder_tree AS (
    SELECT id, name, parent_id FROM folders WHERE id = ?
    UNION ALL
    SELECT f.id, f.name, f.parent_id FROM folders f
    JOIN folder_tree ft ON f.parent_id = ft.id
)
SELECT d.* FROM documents d
JOIN folder_tree ft ON d.folder_id = ft.id;
```
x??

---

---

#### Strangler Fig Pattern
The Strangler Fig pattern is a technique for gradually replacing an existing system by building a new system around the edges of the old one, while keeping it running. Over time, functionality is intercepted and replaced until the old system becomes obsolete and can be decommissioned.

:p What is the purpose of the Strangler Fig pattern in system refactoring?
??x
The purpose of the Strangler Fig pattern is to reduce risk in large-scale system migrations by allowing the old system to remain operational while slowly replacing its functionality with a new system. This approach helps avoid large, disruptive changes and enables gradual adoption of new architectures, such as microservices or event-driven systems.

```java
// Example: Interception of events to replace old functionality
public class EventInterceptor {
    public void handleEvent(Event event) {
        if (event.getType() == "ORDER_CREATED") {
            // Forward to new service
            newService.handle(event);
        } else {
            // Keep old behavior
            legacySystem.handle(event);
        }
    }
}
```
x??

---

#### Event-Driven Architecture
Event-driven architecture (EDA) is a design pattern where systems communicate asynchronously through events. Events represent changes in state or actions that occur in the system, and components react to these events to perform operations.

:p How does event-driven architecture improve system decoupling?
??x
In event-driven systems, components are loosely coupled because they communicate through events instead of direct calls. This means changes in one part of the system don’t directly affect other parts, allowing for independent scaling and development. For example, when a workspace is locked, an event is raised, and multiple services can react independently.

$$
\text{Event} = \text{Subject} + \text{Action} + \text{Payload}
$$

```java
// Example event structure
class LockWorkspaceEvent {
    String workspaceId;
    Long timestamp;
}
```
x??

---

#### CQRS (Command Query Responsibility Segregation)
CQRS is a pattern that separates the operations that read data from those that write data. It allows for optimized data models for queries and commands, often using different databases or views for each.

:p How does CQRS improve performance in a system?
??x
CQRS improves performance by allowing separate optimization of read and write operations. For example, writes can be optimized for consistency and transactional integrity, while reads can be optimized for speed using cached or denormalized data models. In the case study, a Redis cache was used for read-heavy operations.

$$
\text{Write Model} \neq \text{Read Model}
$$

```java
// Example: Separated models
class OrderWriteModel {
    void updateOrder(OrderCommand command) {
        // Update database
    }
}

class OrderReadModel {
    OrderView getOrderView(String orderId) {
        // Return cached data
        return redis.get(orderId);
    }
}
```
x??

---

#### Event Interception
Event interception is a technique used in event-driven systems to capture events from an existing system and route them to a new system for processing. It is a key step in the transition to a new architecture using the Strangler Fig pattern.

:p What role does event interception play in transitioning to a new system?
??x
Event interception allows an old system to continue operating while gradually shifting functionality to a new system. By raising events in the old system and consuming them in the new one, developers can safely move logic without disrupting current operations. For example, in the case study, when an account was locked, a `LockWorkspace` command was raised for each affected workspace.

```java
// Example: Intercepting events to forward to new system
void onAccountLocked(AccountLockedEvent event) {
    List<Workspace> workspaces = db.query("SELECT id FROM workspace WHERE account_id = ?", event.accountId);
    for (Workspace workspace : workspaces) {
        bus.handle(new LockWorkspaceCommand(workspace.id));
    }
}
```
x??

---

#### Walking Skeleton
A walking skeleton is a minimal implementation of a system that can be deployed and tested end-to-end. It includes infrastructure, deployment, and basic functionality, helping teams tackle infrastructure challenges early in development.

:p Why is deploying a "walking skeleton" important in event-driven systems?
??x
Deploying a walking skeleton forces teams to confront infrastructure issues early, such as deployment pipelines, monitoring, and networking. It provides a baseline for building out features incrementally and ensures that production readiness is considered from the start. For example, in the case study, the team deployed a system that logged input to handle infrastructure challenges before adding business logic.

```java
// Example: Simple walking skeleton
public class LoggingService {
    public void processEvent(Event event) {
        System.out.println("Processing event: " + event);
        // Eventually add real logic
    }
}
```
x??

---

#### Redis as a Read Model Cache
In the availability service, Redis was used as a cache for read models to improve query performance. Instead of running complex domain logic for every request, the system queried Redis for precomputed data.

:p How does using Redis improve query performance in the availability service?
??x
Using Redis as a read model cache allows for fast responses, typically in milliseconds, because it avoids complex domain logic. In the case study, queries for stock availability were answered in 2–3 milliseconds, enabling the system to handle hundreds of requests per second efficiently.

$$
\text{Response Time} = \text{Cache Hit} \Rightarrow \text{~2–3 ms}
$$

```java
// Example: Querying Redis for cached data
String stockView = redis.get("product:" + productId);
if (stockView != null) {
    return parseStockView(stockView);
} else {
    // Fall back to domain logic
}
```
x??

---

#### Event-Driven Stock Management
In the availability service, stock levels were managed asynchronously. When stock changed, a new event was raised to update the read model, and if stock ran out, a product was taken off sale.

:p How was stock availability managed in an event-driven system?
??x
Stock availability was managed asynchronously by updating a cached read model whenever stock changed. If stock reached zero, an event was raised to notify the frontend to take the product off sale. This decoupled stock updates from user-facing operations and allowed for real-time updates.

$$
\text{StockLevel} = \text{InitialStock} - \text{ReservedStock}
$$

```java
// Example: Stock change handling
void onStockUpdated(StockUpdatedEvent event) {
    redis.set("stock:" + event.productId, event.newStockLevel);
    if (event.newStockLevel == 0) {
        bus.publish(new ProductOutOfStockEvent(event.productId));
    }
}
```
x??

---

#### Event-Driven Architecture Hello World
Event-driven architecture starts with simple, foundational steps like handling a basic event such as `batch_created`. This is a minimal but crucial first step that forces teams to deploy a message bus, set up producers and consumers, build a deployment pipeline, and write a basic message handler. It's analogous to "Hello World" in traditional programming but in the context of distributed systems.

:p What is the significance of the first production deployment in an event-driven system?
??x
The first production deployment of an event-driven system, such as handling a `batch_created` event, serves as a foundational step that forces teams to implement core infrastructure components like a message bus, producers, consumers, and deployment pipelines. It sets the stage for more complex event handling and system growth. This minimal example ensures that all necessary elements are in place before moving on to more sophisticated logic.

```java
// Pseudocode for a simple event handler
void handleBatchCreated(String eventJson) {
    log(eventJson); // Log the JSON representation of the event
}
```
x??

---

#### Domain Modeling as a First Step
When facing a large, tangled system (a "big ball of mud"), domain modeling is often the recommended first step. It helps bridge the communication gap between business stakeholders and developers by creating a shared understanding using a ubiquitous language. This approach ensures that everyone speaks the same language, reducing misalignment and improving maintainability.

:p Why is domain modeling recommended as the first step when refactoring a large system?
??x
Domain modeling is recommended as the first step because it helps align business stakeholders and developers by establishing a shared, ubiquitous language. It breaks down complex systems into manageable models, reducing ambiguity and improving communication. This alignment is crucial when dealing with intractable problems like reliability, performance, or maintainability in large systems.

$$
\text{Domain Model} = \text{Business Concepts} + \text{Relationships} + \text{Rules}
$$

```java
// Example: User and Account relationship before and after modeling
class User {
    String userId;
    String accountId; // Before: tightly coupled
}

class Account {
    String accountId;
    List<Workspace> workspaces;
}
```
x??

---

