# High-Quality Flashcards: 014---Head-First-Software-Architecture_processed (Part 18)

**Starting Chapter:** Modular monolith

---

#### Modular Monolith Architecture
Modular monolith is an architectural style that organizes an application into modules based on business domains rather than technical layers. Unlike layered architecture, which separates concerns by technical functions (e.g., presentation, business logic, data access), modular monoliths group code by functional subdomains such as Order Placement, Payment, or Inventory Management within a larger domain like Online Store.

:p What distinguishes modular monolith from layered architecture?
??x
In layered architecture, code is partitioned by technical concerns (like UI, service layer, database access), whereas in a modular monolith, the code is structured around business capabilities or subdomains. Both are deployed as a single unit with a shared database, but the organization of code differs significantly.
x??

---

#### Module Definition in Modular Monoliths
A module in a modular monolith represents a self-contained unit that encapsulates all the business logic required for a specific subdomain. It's not just a package or namespace—it's a design element that ensures cohesion within a business function and clear boundaries between different domains.

:p How does a module in modular monolith differ from a layer in layered architecture?
??x
In layered architecture, a layer (e.g., presentation layer) abstracts a technical concern and interacts with other layers. In contrast, a module in a modular monolith reflects a business domain or subdomain, containing all necessary code for that domain, including models, services, and logic. Modules are more focused on business functionality than technical roles.
x??

---

#### Code Organization in Modular Monoliths
Modules in modular monoliths should be designed to encapsulate business logic and reduce coupling between different parts of the system. They may use various programming constructs like packages, namespaces, or modules depending on the language. The goal is to keep each module focused and independent.

:p What are some considerations for organizing code into modules in a modular monolith?
??x
Modules should be organized to reflect business subdomains, ensuring each module has a single responsibility. They must minimize dependencies on other modules and clearly define their interfaces. Techniques such as dependency inversion and clean architecture principles can help maintain loose coupling and high cohesion.
x??

---

#### Deployment Model of Modular Monoliths
Both modular monoliths and layered architectures are deployed as a single unit, typically with a single database. This deployment model simplifies deployment, testing, and debugging compared to microservices, which require separate deployments and inter-service communication.

:p Why is the deployment model important in understanding modular monoliths?
??x
Because it differentiates modular monoliths from microservices. While both use business-domain partitioning, modular monoliths are still deployed as one unit, making them easier to manage and debug than distributed systems, even though they offer better organization than traditional layered monoliths.
x??

---

#### Interaction Between Modules
In modular monoliths, modules interact through well-defined interfaces, often using dependency injection or service locators. The interaction is typically synchronous and within the same process, unlike microservices where communication happens over HTTP or message queues.

:p How do modules in a modular monolith interact with each other?
??x
Modules interact through clearly defined APIs or interfaces, often using dependency injection or service locator patterns. Since they reside in the same application, communication is fast and synchronous, avoiding the overhead of network calls or asynchronous messaging.
```java
public class OrderPlacementService {
    private final PaymentService paymentService;

    public OrderPlacementService(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    public void placeOrder(Order order) {
        paymentService.processPayment(order.getPayment());
    }
}
```
x??

---

#### Advantages of Modular Monoliths
Modular monoliths combine the simplicity of a single deployment with the organization benefits of modularity. They allow teams to work independently on different modules without the complexity of inter-service communication or distributed transactions.

:p What are the main advantages of using a modular monolith over a traditional layered monolith?
??x
Modular monoliths provide better organization by grouping code into business-focused modules, improving maintainability and scalability. They avoid the complexity of microservices while still offering a modular structure that supports team autonomy and clear separation of concerns.
x??

---

#### Modular Monolith vs Microservices
While modular monoliths use business-domain modules within a single deployment unit, microservices break the system into multiple independent services, each deployed separately. This leads to different trade-offs in terms of complexity, scalability, and deployment flexibility.

:p How does a modular monolith differ from microservices in terms of deployment and complexity?
??x
In a modular monolith, everything runs together in one process, simplifying deployment and debugging. In contrast, microservices are deployed separately, requiring coordination across services, handling network failures, and managing distributed transactions. Modular monoliths are simpler to manage but may scale less well than microservices.
x??

---

#### Business Domain Mapping in Modular Monoliths
Each module in a modular monolith corresponds to a business domain or subdomain. For example, in an e-commerce application, modules could include Customer Management, Order Fulfillment, and Inventory Tracking, each handling a distinct set of business processes.

:p How does mapping business domains to modules improve system design?
??x
Mapping business domains to modules ensures that code is grouped by functional responsibility rather than technical layer. This improves understanding, maintainability, and scalability, as developers can focus on one domain at a time and avoid tightly coupling unrelated technical concerns.
x??

---

#### Modular Monoliths Overview
Modular monoliths are an architectural approach where an application is organized into vertical slices, each representing a business domain. Instead of organizing code into horizontal layers (like presentation, business logic, persistence), modular monoliths group related functionality into modules that encapsulate all layers needed for a specific domain. This makes it easier to manage domain changes because each module is self-contained and owned by a cross-functional team.
:p What is the main benefit of organizing an application as a modular monolith instead of a layered architecture when making domain changes?
??x
In a layered architecture, changes affecting the business domain often require coordination across multiple teams responsible for different layers (e.g., UI, business rules, persistence). In contrast, modular monoliths organize functionality by domain, so a single team owns a module and can make changes without needing input from other teams. This reduces complexity and improves team autonomy.
$$
\text{Domain change impact} = f(\text{number of modules affected}, \text{team coordination required})
$$
This structure allows teams to own full vertical slices, reducing dependencies and enabling faster, more reliable development cycles.
x??

---

#### Domain-Driven Design in Modular Monoliths
A modular monolith is structured around business domains, where each module represents a distinct part of the business. For example, an order domain module might include components for placing orders, managing recipes, and handling delivery. Each module contains all necessary layers (presentation, business logic, persistence) but is organized around a business concern rather than a technical one.
:p How does organizing modules around business domains improve system design?
??x
Organizing modules around business domains aligns the architecture with business capabilities, making the system easier to understand, maintain, and evolve. It ensures that each module encapsulates a cohesive set of business functions, reducing coupling between unrelated features. This also supports cross-functional teams working on specific business areas, improving both development speed and code quality.
Example module structure:
```java
module OrderPlacement {
    PresentationLayer;
    BusinessRulesLayer;
    PersistenceLayer;
}
```
x??

---

#### Vertical Slicing vs Horizontal Layering
In a traditional layered architecture, the system is divided horizontally into layers such as UI, business logic, and data access. In contrast, a modular monolith uses vertical slicing, where each module represents a business capability and includes all necessary layers. This means that even though a module contains layers internally, the overall architecture is partitioned by domain, not by layer.
:p Why is vertical slicing preferred over horizontal layering in modular monoliths?
??x
Vertical slicing aligns the architecture with business concerns, making modules more cohesive and easier to manage. It allows teams to own full vertical slices, which simplifies domain changes and improves communication. While internal modules may still contain layers, the architectural concern is domain-based, not layer-based. This structure supports scalability and maintainability better than a strictly layered approach.
Example:
```java
// Vertical slice for Order Domain
OrderModule {
    PresentationLayer {
        OrderController;
    }
    BusinessRulesLayer {
        OrderService;
        CustomizationValidator;
    }
    PersistenceLayer {
        OrderRepository;
        DeliveryRepository;
    }
}
```
x??

---

#### Cross-Functional Teams in Modular Monoliths
In modular monoliths, teams are typically cross-functional and focused on a specific business domain. Each team owns the entire vertical slice of their module, including UI, business logic, and persistence. This contrasts with traditional layered architectures where teams specialize in individual layers (e.g., frontend developers, backend developers, DBAs), leading to increased coordination overhead when implementing domain changes.
:p What role do cross-functional teams play in a modular monolith architecture?
??x
Cross-functional teams in modular monoliths own complete modules, meaning they are responsible for all aspects of a business domain—UI, business logic, and data storage. This leads to faster development cycles, reduced inter-team dependencies, and improved accountability. Teams can implement domain changes independently without needing coordination from other specialized teams.
$$
\text{Team efficiency} = \frac{\text{Domain ownership}}{\text{Coordination overhead}}
$$
By owning the full vertical slice, teams reduce bottlenecks and streamline decision-making.
x??

---

#### Internal Structure of Modules
Although modules in a modular monolith contain technical layers (presentation, business logic, persistence), the architectural partitioning is still based on business domains. The internal organization of a module is an implementation detail, not an architectural concern. This allows flexibility in how each module is structured internally while maintaining clear domain boundaries.
:p Why are internal module structures considered implementation details in modular monoliths?
??x
The internal layout of a module (e.g., how many layers it has or how it’s structured) is irrelevant to the architectural decision of organizing by domain. What matters is that the module encapsulates a business domain. This abstraction allows for flexibility in internal design while keeping the architecture clean and aligned with business needs.
Example:
```java
// Internal structure of a module (implementation detail)
OrderModule {
    PresentationLayer;     // Handles UI
    BusinessRulesLayer;    // Contains business logic
    PersistenceLayer;      // Handles data access
}
```
x??

---

#### Comparison Between Layered and Modular Monolith Architectures
In a layered architecture, the system is separated by technical concerns, which makes it easier to swap out components like databases or UI frameworks. However, this separation leads to domain "smearing" across layers, making domain changes complex and requiring coordination among many teams. Modular monoliths avoid this by organizing around business domains, which improves maintainability and reduces inter-team dependencies.
:p How does modular monolith architecture differ from layered architecture in terms of managing domain changes?
??x
Layered architecture spreads domain logic across multiple layers, making domain changes difficult and requiring coordination between teams. Modular monoliths, by contrast, organize the system around business domains, allowing changes to be contained within a single module. This reduces the need for cross-team coordination and improves agility.
$$
\text{Change complexity} = \text{domain spread} \times \text{team coordination}
$$
In modular monoliths, domain changes are localized, reducing complexity.
x??

---

#### Benefits of Domain Partitioning
Domain partitioning in modular monoliths ensures that each module encapsulates a business capability, promoting modularity and reducing coupling. This approach helps teams scale effectively, as they can independently develop, test, and deploy their modules without affecting others. It also makes the system easier to understand and maintain.
:p What are the benefits of domain partitioning in modular monoliths?
??x
Domain partitioning leads to improved modularity, reduced coupling, and better scalability. Teams can work independently on their modules, reducing dependency on other teams. Additionally, domain boundaries make the system easier to reason about, test, and evolve over time.
$$
\text{Modularity} = \frac{\text{Clear boundaries}}{\text{Inter-module coupling}}
$$
Clear domain boundaries improve maintainability and reduce risk during development.
x??

---

#### Modular Monolith Overview
A modular monolith is an architectural approach where a single codebase is organized into distinct modules based on business domains rather than technical layers. This contrasts with layered architecture, where code is organized by concerns like presentation, business logic, and data access. In a modular monolith, each module encapsulates a specific domain, such as order management or inventory tracking. The goal is to increase modularity while still maintaining a single deployment unit.

:p What is the key difference between layered architecture and modular monoliths in terms of code organization?
??x
In layered architecture, code is organized by technical concerns (e.g., presentation, business logic, data access), whereas in modular monoliths, the code is organized by domain concerns (e.g., order, recipe, inventory). This allows modules to be more cohesive and aligned with business functionality.
x??

---

#### Module Namespace Example
In the example of Naan & Pop, the namespaces for different modules are:
- `com.naanpop.orderapp.order`
- `com.naanpop.orderapp.recipe`
- `com.naanpop.orderapp.inventory`

Each namespace represents a separate module within the monolith, reflecting domain-driven design principles.

:p How do namespaces reflect module boundaries in a modular monolith?
??x
Namespaces such as `com.naanpop.orderapp.order` define a module's scope. They group related code together under a common domain, making it easier to understand the application structure and maintain boundaries between modules. This is different from layered architectures where layers are defined by technical roles.
x??

---

#### Identifying Subdomains in Expense Tracking App
In an expense-tracking app for small to medium-sized businesses, the business requirements involve users adding expenses and auditors reviewing them. Key subdomains include:
- **User Management**
- **Expense Recording**
- **Audit Trail**

These subdomains represent distinct business concerns that can be mapped to separate modules in the modular monolith.

:p How can you identify subdomains in a business application like an expense tracker?
??x
By analyzing business requirements and identifying distinct roles and processes, such as users adding expenses and auditors reviewing them, you can identify subdomains like "User Management", "Expense Recording", and "Audit Trail". These correspond to modules in a modular monolith.
x??

---

#### Communication Between Modules
Modules in a modular monolith must communicate, but direct inter-module calls can lead to tight coupling and a "big ball of mud". Instead, communication should be controlled and well-defined to preserve modularity.

:p Why shouldn't modules directly call each other in a modular monolith?
??x
Direct calls between modules can break modularity by creating tight coupling. If every module references every other module, the system becomes difficult to maintain and understand. Controlled communication through well-defined interfaces or events is necessary to preserve modularity.
x??

---

#### Module Communication Strategies
To maintain modularity while allowing communication, one approach is to use a controlled communication mechanism, such as:
- **Event-driven communication**
- **Explicit APIs or interfaces**
- **CQRS (Command Query Responsibility Segregation)**

These help manage dependencies between modules without tightly coupling them.

:p What are some strategies for managing communication between modules in a modular monolith?
??x
Strategies include event-driven communication, using explicit APIs or interfaces, and applying patterns like CQRS. These methods help maintain clear boundaries and reduce coupling between modules.
x??

---

#### Example: Order and Inventory Module Interaction
In the Naan & Pop example, the ordering module needs to know about inventory to ensure ingredients are available. Rather than directly calling inventory functions, they should use a controlled mechanism like an event or API to request ingredient availability.

:p How might the ordering module interact with the inventory module in a modular monolith?
??x
The ordering module might request ingredient availability through an API or event-based communication, instead of directly calling inventory code. This ensures modularity and reduces tight coupling between modules.
x??

---

#### Modular Monolith vs. Microservices
While modular monoliths are a single deployment unit, they share some benefits with microservices, such as domain-driven design and clear module boundaries. However, unlike microservices, they do not require separate deployments or network calls between components.

:p How does a modular monolith differ from a microservices architecture?
??x
A modular monolith is a single deployment unit with modules organized by domain, whereas microservices are deployed separately and communicate over the network. Modular monoliths offer modularity and simplicity, while microservices offer scalability and independent deployment.
x??

---

#### Code Structure in Modular Monolith
In a modular monolith, code is structured using namespaces or packages that reflect domain modules. For example:
```java
package com.naanpop.orderapp.order;
// Order-related code here

package com.naanpop.orderapp.inventory;
// Inventory-related code here
```

:p What does the code structure look like in a modular monolith?
??x
Code is organized into packages or namespaces that reflect domain modules. For example, `com.naanpop.orderapp.order` and `com.naanpop.orderapp.inventory` are separate modules, each containing code related to its domain.
x??

---

