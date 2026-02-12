# High-Quality Flashcards: Sam-Newman---Building-Microservices-OReilly-Media-2015_processed (Part 4)


**Starting Chapter:** Turtles All the Way Down

---


---
#### Modularity and Bounded Contexts
In domain-driven design, it is crucial to define clear boundaries within a domain through bounded contexts. This approach helps in reducing tight coupling between different parts of the system while ensuring high cohesion within each context. By identifying these bounded contexts early on and modeling them as modules or services, we can later leverage them for microservices.

:p What are bounded contexts and why are they important?
??x
Bounded contexts define a domain model's boundaries within which a set of models (entities, value objects) is consistent and unambiguous. They help in reducing tight coupling between different parts of the system by clearly defining where one context ends and another begins. This approach ensures that each context can be developed independently with its own specialized language.

Code examples:
```java
public class InventoryContext {
    // Models related to inventory management
}

public class OrderFulfillmentContext {
    // Models related to order fulfillment processes
}
```
x??

---


#### Service Boundaries and Bounded Contexts Alignment
Once the bounded contexts are identified, these should be modeled as separate modules or services. This alignment ensures that each microservice represents a specific business capability within its bounded context, leading to loose coupling and strong cohesion.

:p How do service boundaries align with bounded contexts?
??x
Service boundaries should be aligned with bounded contexts to ensure that the system is organized around business capabilities rather than technical components. Each microservice should represent a bounded context, encapsulating all related models, services, and data access logic within it.

Code examples:
```java
public class SnapCiService {
    // Models, services, and repositories for SnapCI service
}

public class GoCdService {
    // Models, services, and repositories for GoCd service
}
```
x??

---


#### Premature Decomposition
Premature decomposition of a system into microservices can lead to increased costs and maintenance challenges. It is often better to develop the initial system as a monolith and understand its boundaries more thoroughly before moving towards microservices.

:p What are the risks associated with premature decompositions?
??x
Prematurely splitting a system into microservices without thorough understanding of the domain and service boundaries can result in high costs due to frequent changes across services. It may also lead to over-engineering, as initial assumptions about boundaries might not hold up under real-world usage.

Code examples:
```java
public class MonolithicApplication {
    // Initial monolithic implementation before decomposition
}
```
x??

---


#### Business Capabilities vs Data Models
When identifying bounded contexts, focus on the business capabilities they provide rather than just data models. This approach ensures that services expose meaningful operations (like getting a current stock list or setting up payroll) rather than simple CRUD operations.

:p How should we think about bounded contexts in terms of business capabilities?
??x
Bounded contexts should be identified based on the business capabilities they provide, such as getting a current stock list from the warehouse context or managing payroll for finance. This approach ensures that services are designed to support real-world use cases rather than just abstracting data.

Code examples:
```java
public class WarehouseContext {
    public List<StockItem> getCurrentStockList() {
        // Logic to get current stock list
    }
}

public class FinanceContext {
    public void setupPayrollForNewRecruit(String recruit) {
        // Logic to set up payroll for a new recruit
    }
}
```
x??

---


#### Nested Bounded Contexts
Bounded contexts can contain further bounded contexts, allowing for nested decomposition. This approach helps in managing complexity by breaking down larger contexts into smaller, more manageable units.

:p How do you handle nested bounded contexts?
??x
Nested bounded contexts allow finer-grained management of domain models and services within a larger context. For example, a warehouse might be decomposed into order fulfillment, inventory management, and goods receiving. These sub-contexts can be represented as separate microservices if they are managed by different teams.

Code examples:
```java
public class WarehouseContext {
    public OrderFulfillmentService getFulfillmentService() {
        return new OrderFulfillmentService();
    }

    public InventoryManagementService getInventoryService() {
        return new InventoryManagementService();
    }
}

public class OrderFulfillmentService {
    // Logic related to order fulfillment
}
```
x??

---

---


#### Bounded Contexts and Microservices
Background context: The changes to a system are often driven by business needs. When decomposing systems into microservices, these services should be aligned with bounded contexts—areas within the domain that have their own language, rules, and data. This approach helps in isolating changes to specific microservices, reducing complexity.
:p How does aligning microservices with bounded contexts help in managing system changes?
??x
Aligning microservices with bounded contexts ensures that each service handles a specific part of the business logic, making it easier to isolate and manage changes. This alignment also reflects real-world business terms within the interfaces, enhancing communication clarity among teams.

For example:
- If you have an e-commerce domain, one bounded context might be "Orders," while another could be "Inventory."
```java
public interface OrderService {
    // Methods related to orders
}

public interface InventoryService {
    // Methods related to inventory
}
```
x??

---


#### Communication Through Business Concepts
Background context: Communicating between microservices should mimic the language and concepts used within the business. This approach ensures that teams understand each other better, reducing misunderstandings.
:p Why is it important for interfaces to reflect the same terms and ideas shared in an organization?
??x
It's crucial because it aligns technical communication with real-world business processes, making collaboration smoother and more effective. Using consistent terminology helps avoid misinterpretations and ensures that developers are working towards the same goals as the business.

For example:
- A form for a customer registration might be represented in both services using the term "CustomerProfile."
```java
public class CustomerRegistrationForm {
    private String name;
    private String email;
    
    // Constructor, getters, setters
}

public interface RegistrationService {
    void processRegistration(CustomerRegistrationForm form);
}
```
x??

---


#### Technical Boundary Issues
Background context: The example provided discusses a situation where services were modeled incorrectly along technical boundaries rather than business ones. This led to performance and maintenance issues.
:p What are the consequences of modeling service boundaries incorrectly?
??x
Incorrectly modeling service boundaries can lead to several problems, such as increased brittleness, performance overhead, and difficulty in maintaining code. For instance, making method calls overly frequent or complex can degrade system performance.

For example:
- Imagine a scenario where a customer profile update triggers multiple RPC calls.
```java
public class CustomerProfileService {
    public void updateCustomerProfile(String customerId, String newName) {
        // Update customer name
        customerRepository.updateName(customerId, newName);
        
        // Notify billing service (unnecessary if not strictly required)
        billingService.notifyUpdate();
        
        // Send email to user (if email is part of the profile)
        emailService.sendEmailToCustomer(customerId);
    }
}
```
x??

---


#### Bounded Contexts and Microservices
Background context: This concept explains how bounded contexts are crucial in identifying seams within a problem space, allowing for microservices that maintain high cohesion and loose coupling. These boundaries help ensure that changes in one part of the system do not adversely affect another.
:p What is a bounded context?
??x
A bounded context refers to a specific domain or subject area where certain rules and definitions apply. In software development, it helps identify natural divisions within a complex application, enabling teams to focus on particular aspects without worrying about implementation details in other parts of the system. This leads to better maintainability and scalability.
x??

---


#### Domain-Driven Design (DDD)
Background context: DDD provides useful tools for finding sensible boundaries between microservices by focusing on the core domain logic and entities. The ideas from DDD help ensure that services remain autonomous, making it easier to change and release them independently.
:p What is the role of DDD in identifying service boundaries?
??x
Domain-Driven Design (DDD) helps identify natural boundaries within a complex system through concepts like bounded contexts. By focusing on core domain logic, entities, and value objects, DDD ensures that services are aligned with business needs rather than technical considerations.
x??

---


#### Ideal Integration Technology Considerations
Background context: Choosing the right technology for microservice communication is crucial to maintain autonomy and avoid breaking changes or tangled systems. Factors like avoiding breaking changes and ensuring API agnosticism are key in selecting an integration technology.
:p What are some important factors when choosing an integration technology?
??x
When choosing an integration technology, it's important to consider:
1. Avoiding Breaking Changes: Ensure that changes do not impact existing consumers.
2. Technology-Agnostic APIs: Design APIs that can be easily adapted if the underlying technology stack changes in the future.
3. Flexibility and Adaptability: Choose a technology that supports evolving requirements over time.
x??

---


#### Integration Technologies
Background context: There are various options for integrating microservices, including SOAP, XML-RPC, REST, and Protocol Buffers. Each has its strengths and weaknesses, but it's crucial to choose one that aligns with the goals of minimizing breaking changes and ensuring API agnosticism.
:p What are some common integration technologies?
??x
Some common integration technologies include:
1. **SOAP**: A standard protocol for exchanging structured data in the implementation of web services in computer networks.
2. **XML-RPC**: An XML-based remote procedure call protocol, but it's less flexible compared to REST.
3. **REST**: Representational State Transfer, a set of constraints and architectural principles for designing networked applications.
4. **Protocol Buffers**: A binary serialization format that allows efficient data transmission over the wire.

Each has its own use cases and trade-offs, so the choice depends on specific requirements and context.
x??

---


#### Avoiding Breaking Changes
Background context: When making changes to microservices, it's crucial to ensure that consumers are not adversely affected. Techniques like introducing new fields without breaking existing consumers can help maintain system stability.
:p How do you ensure your microservice changes don't break existing consumers?
??x
To avoid breaking changes:
1. **Versioning APIs**: Use API versioning (e.g., /v1/users, /v2/users) to allow both old and new versions of an API to coexist temporarily.
2. **Backward Compatibility**: Ensure that adding new fields or features does not impact existing consumers by keeping the old logic intact for backward compatibility.
3. **Graceful Degradation**: Design APIs in a way that they can handle optional parameters, allowing older systems to continue functioning without issues.

By implementing these strategies, you can ensure that changes are made without breaking existing integrations.
x??

---


#### Technology-Agnostic APIs
Background context: As the IT industry evolves rapidly, it's important for APIs to remain agnostic of specific technologies. This ensures that services can be easily migrated or replaced without impacting other parts of the system.
:p Why is technology-agnosticism important in API design?
??x
Technology-agnosticism in API design is crucial because:
1. **Future-Proofing**: It allows your service to evolve and adapt to new tools, frameworks, and languages as they emerge.
2. **Scalability**: Services that are not tightly coupled to a specific technology stack can be more easily scaled or replaced without significant disruptions.
3. **Innovation**: Encourages experimentation with different technologies to improve productivity and performance.

By designing APIs that do not depend on specific implementation details, you ensure greater flexibility and resilience in your system.
x??

---

---


#### Keeping Options Open with Microservices
Background context: The text discusses why microservices are preferred for keeping options open, particularly focusing on technology-agnostic communication between services. It emphasizes making services simple and accessible to consumers while hiding internal implementation details.
:p Why is it important to keep APIs used for communication between microservices technology-agnostic?
??x
It is crucial to keep APIs technology-agnostic because this approach allows the microservice architecture to remain flexible and independent of specific technology stacks. This flexibility ensures that changes in one service do not force consumers or other services to update their technology, thereby maintaining loose coupling and reducing the complexity and cost of integration.
```java
public interface CustomerService {
    void createCustomer(Customer customer);
    Customer getCustomer(String customerId);
}
```
x??

---


#### Making Services Easy for Consumers
Background context: The text emphasizes making microservices easy for consumers to use by providing full freedom in their technology choice. It suggests that while client libraries can ease adoption, they may increase coupling and thus should be used judiciously.
:p How do we make it easy for consumers to use our services?
??x
We make services easy for consumers by allowing them full freedom in their technology choices and providing simple APIs. However, we must balance this with the need to keep internal implementation details hidden. Client libraries can ease adoption but may increase coupling. Therefore, careful consideration is needed to ensure that any library provided does not introduce unnecessary dependencies or coupling.
```java
public class CustomerClient {
    public void createCustomer(Customer customer) {
        // Implementation using a technology-agnostic API
    }
}
```
x??

---


#### Hiding Internal Implementation Details
Background context: The text stresses the importance of hiding internal implementation details to avoid breaking consumers if changes are made within the microservice. This is crucial for maintaining loose coupling and reducing technical debt.
:p Why is it important to hide internal implementation detail in a microservice?
??x
Hiding internal implementation details is important because exposing these details can make it harder to change or update the service without affecting its consumers. By keeping the interface clean and technology-agnostic, we reduce the risk of breaking changes and increase our ability to evolve the service independently.
```java
public class CustomerService {
    private final Database db;
    
    public CustomerService(Database db) {
        this.db = db;
    }
    
    public void createCustomer(Customer customer) {
        // Implementation that interacts with database internally but exposes a clean API
    }
}
```
x??

---


#### Shared API Fragility due to Database Changes
Background context: The passage highlights that a shared database acts as a brittle shared API, making it challenging to change the underlying schema without breaking other services.

:p How does changing the database schema impact consumers using direct access?
??x
Changing the database schema can break existing consumers because they are tightly bound to the current structure. For example:
- If you decide to add a new field in the customer table or remove an old one, all services that interact with this data need to be updated.
- Any regression testing is required to ensure no part of the application breaks due to these changes.

Example scenario:
```java
// Original database schema
public class Customer {
    private String name;
    private int age;
}

// After modification: adding a new field
public class UpdatedCustomer {
    private String name;
    private int age;
    private boolean isVIP;
}
```
x??

---


#### Tying Consumers to Specific Technology Choices
Background context: Direct database access binds consumers to the specific technology and structure of the database, making it hard to switch storage strategies without impacting these consumers.

:p What are the implications of tightly coupling services with a specific database technology?
??x
Tightly coupling services with a specific database technology means that if you need to change the underlying data store (e.g., from SQL to NoSQL), all consuming services must be updated. This can lead to significant rework and increased complexity.

Example:
```java
// Pseudocode for using a relational database driver
public void registerCustomer(Customer customer) {
    // Using specific JDBC methods to insert a new customer
    jdbcTemplate.update("INSERT INTO customers (name, age) VALUES (?, ?)", 
                         customer.getName(), customer.getAge());
}
```
x??

---


#### Losing Cohesion and Strong Coupling
Background context: The passage points out that direct database access leads to scattered logic across different services, compromising cohesion and strong coupling.

:p How does direct database access affect the distribution of business logic among services?
??x
Direct database access spreads critical business logic across multiple services. For instance:
- If editing customer information involves complex operations like updating related orders or notifications, each service that needs to edit a customer must implement this logic.
- This can lead to redundancy and inconsistent behavior if updates are not synchronized.

Example scenario:
```java
// Pseudocode for handling customer edits in three different services
public void editCustomerInWarehouse(Customer customer) {
    // Update warehouse-specific information
}

public void editCustomerInRegistrationUI(Customer customer) {
    // Update UI-related information
}

public void editCustomerInCallCenterUI(Customer customer) {
    // Update call center-specific information
}
```
x??

---


#### Avoiding Database Integration for Microservices
Background context: The passage concludes by advising against using direct database access in microservices architecture due to the issues it introduces.

:p What is the recommendation given regarding database integration in a microservices architecture?
??x
The recommendation is to avoid direct database access. Instead, services should collaborate through APIs or other means that do not expose internal implementation details, ensuring loose coupling and strong cohesion.

Example:
```java
// Service-to-service interaction via API
public void updateCustomer(Customer customer) {
    customerService.update(customer);
}
```
x??

---

---

