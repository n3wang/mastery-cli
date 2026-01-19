# High-Quality Flashcards: 014---Head-First-Software-Architecture_processed (Part 15)

**Starting Chapter:** Distributed deployment models The cons

---

#### Monolithic Architecture Overview
Monolithic architectures are a traditional software design approach where the entire application runs as a single unit within one process. This structure simplifies development and deployment initially, but can become a bottleneck as the system scales. In such systems, all components share the same codebase and runtime environment, making them easier to understand and debug at first, but harder to evolve or scale independently.

:p What are the key characteristics of monolithic systems?
??x
Monolithic systems have a single codebase, run in one process, and are deployed as a single unit. They are simpler to develop, debug, and deploy, but lack scalability and flexibility as they grow. For example, if a bug occurs in one module, it affects the entire system, and scaling requires scaling the whole application rather than individual parts.
```java
// Example of a simple monolithic structure
public class MonolithApp {
    public void processOrder() {
        // All logic in one place
        validateOrder();
        calculateTax();
        saveToDatabase();
    }
}
```
x??

---

#### Simplicity in Monoliths
One of the major advantages of monolithic systems is their simplicity. Since all modules are part of a single codebase, developers can easily understand how the system works and make changes without dealing with distributed complexity. This makes monoliths ideal for small to medium-sized applications where the cost of complexity is not justified.

:p Why is simplicity a key benefit of monolithic systems?
??x
Simplicity comes from having a single codebase and runtime environment, which reduces the complexity of development, testing, and deployment. It allows developers to work with a unified system and makes it easier to manage dependencies. For example, debugging is straightforward because all code resides in one place.
```java
// Simplified monolith with integrated components
public class SimpleApp {
    public void handleUserRequest() {
        // Everything happens in one place
        User user = fetchUser();
        processPayment(user);
        sendConfirmation(user);
    }
}
```
x??

---

#### Cost Efficiency of Monoliths
Monolithic applications are generally cheaper to build and operate due to their simplicity. They require less infrastructure, fewer services, and less coordination overhead compared to distributed systems. This makes them a cost-effective choice, especially for startups or projects with limited resources.

:p How does the cost of building and operating monoliths compare to distributed systems?
??x
Monoliths are typically cheaper because they involve fewer moving parts, less infrastructure, and simpler deployment strategies. For instance, there's no need for inter-service communication layers, load balancers, or service discovery mechanisms that are required in distributed systems. This results in lower operational costs and faster time-to-market.
x??

---

#### Speed to Market with Monoliths
Monoliths are ideal for rapid development and early-stage product releases. Their simplicity allows teams to move fast and iterate quickly, which is essential for MVPs or early-stage products where speed matters more than scalability.

:p Why are monoliths good for rapid development and early-stage products?
??x
Because monoliths have a simple architecture, they reduce the time needed to set up the development environment, deploy changes, and test functionality. Teams can focus on features rather than managing complex inter-service communication. For example, a startup building a basic web app can use a monolith to get to market quickly.
x??

---

#### Reliability in Monoliths
Monoliths tend to be more reliable because they make fewer network calls. Since components interact directly within the same process, they are less prone to network failures or latency issues that can affect distributed systems.

:p How does reliability differ between monoliths and distributed systems?
??x
Monoliths are more reliable because they avoid network dependencies. If a monolith makes no external calls, it reduces the chance of failure due to network issues or timeouts. In contrast, distributed systems must manage inter-service communication, which introduces more failure points.
x??

---

#### Deployability Limitations of Monoliths
Deploying monolithic systems requires redeploying the entire application, which introduces risk. Any change in one part of the system can potentially affect the whole system, increasing the chance of downtime or regressions.

:p What are the limitations of deploying monoliths?
??x
Deploying monoliths means redeploying the entire system, which increases the risk of introducing bugs or breaking functionality. Any change, even small, requires a full redeployment. This makes frequent updates risky and slower in monolithic systems.
x??

---

#### Scalability Challenges in Monoliths
Monoliths cannot scale parts of the system independently. If one module needs more resources, the entire application must be scaled, which can be inefficient and costly.

:p Why is scalability a challenge in monolithic systems?
??x
In monoliths, scaling is all-or-nothing. If one part of the system is under heavy load, the entire application must be scaled up, even if other parts are underutilized. This leads to inefficient resource usage and can become a bottleneck.
$$
\text{Scaling Monolith} = \text{Scale entire system}
$$
x??

---

#### Evolvability Issues in Monoliths
As monoliths grow, they become harder to modify and evolve. Since all code lives in one codebase, it becomes difficult to adopt new technologies or refactor specific parts without affecting the entire system.

:p What challenges arise with evolving monoliths over time?
??x
As the monolith grows, it becomes harder to refactor or introduce new technologies because all components are tightly coupled. Changing one part may require changes in other areas, increasing the risk of breaking existing functionality.
x??

---

#### Reliability Risks in Monoliths
A bug in any part of a monolithic system can bring down the entire application, making reliability a concern as the system grows. This single point of failure can cause widespread outages.

:p How does a bug in a monolith affect system reliability?
??x
If a bug exists in one module of a monolith, it can crash the entire system. This is because all modules run in the same process, so a failure in one part affects all others. This makes monoliths less resilient than distributed systems.
$$
\text{Monolith Failure} \Rightarrow \text{Entire System Down}
$$
x??

---

#### Distributed Architecture Overview
Distributed architectures are systems composed of multiple loosely coupled logical components that are deployed separately and communicate over a network. These systems evolved with modern engineering practices like continuous integration, deployment, and automated testing. They promote modularity, scalability, and testability, but also introduce complexity in performance, cost, and debugging.

:p What are the core principles behind distributed architectures?
??x
Distributed architectures are built on principles of modularity, where logical components are loosely coupled and independently deployable. They encourage separation of concerns and allow scaling of individual components. The evolution of these systems is tied to modern software engineering practices such as continuous integration, deployment, and automated testing, which enable rapid and reliable updates.
x??

---

#### Modularity in Distributed Systems
Modularity in distributed systems refers to the degree to which components can be developed, deployed, and maintained independently. Because each component is a separate unit, they must be loosely coupled, meaning changes in one component do not directly affect others.

:p Why does modularity matter in distributed systems?
??x
Modularity enhances maintainability and scalability. Each logical component can be updated or scaled independently, reducing the risk of system-wide failures. For example, in a microservice architecture, a user authentication service can be updated without affecting the payment processing service. This decoupling is achieved through well-defined APIs and communication protocols.
x??

---

#### Scalability in Distributed Systems
Distributed systems allow for independent scaling of logical components. For instance, if one part of an application experiences high load, only that component needs to be scaled up, rather than scaling the entire system.

:p How does distributed architecture support scalability?
??x
In distributed systems, components are deployed separately, allowing individual services to be scaled independently. For example, if a user service is under heavy load, it can be scaled up without affecting the inventory or payment services. This is achieved through load balancers and container orchestration tools like Kubernetes.
```java
// Example: Scaling a user service independently
Service user = new UserService();
Service inventory = new InventoryService();
// Scale user service only when needed
user.scale(10); // Scale to 10 instances
```
x??

---

#### Testability in Distributed Systems
Each deployment in a distributed system serves a small group of logical components, which makes testing easier. Since components are isolated, unit testing and integration testing can be performed independently.

:p How does distributed architecture improve testability?
??x
Distributed systems promote testability by isolating components. Each service can be tested independently, reducing the complexity of testing the entire system. For example, a payment service can be tested in isolation using mocks for other services. This reduces the risk of deploying changes and improves confidence in system updates.
x??

---

#### Fault Tolerance in Distributed Systems
Fault tolerance in distributed systems refers to the ability of the system to continue functioning even when individual components fail. This is achieved through redundancy and failover mechanisms.

:p What is the benefit of fault tolerance in distributed systems?
??x
Fault tolerance ensures system reliability. If one component fails, others continue to function. For example, in a distributed e-commerce system, if the payment gateway fails, the user interface and inventory system can still operate. Techniques like replication, circuit breakers, and load balancing contribute to fault tolerance.
x??

---

#### Performance Trade-offs in Distributed Systems
Communication between distributed components occurs over a network, which introduces latency and can impact performance. Network delays, bandwidth limitations, and message serialization overhead are key factors.

:p How does network communication affect performance in distributed systems?
??x
Network communication introduces latency and overhead, which can reduce performance. For example, a system with 10 services communicating over a network may experience delays due to message passing. Techniques like caching, asynchronous communication, and optimizing network protocols help mitigate these issues.
$$
\text{Total Latency} = \sum_{i=1}^{n} \text{Network Latency}_i + \text{Processing Time}_i
$$
x??

---

#### Simplicity vs. Complexity in Distributed Systems
Distributed systems are inherently complex. They are the opposite of simple systems, with challenges in understanding, debugging, and maintaining them.

:p Why are distributed systems considered complex?
??x
Distributed systems are complex due to the interactions between multiple components. Debugging, logging, and tracing errors across services can be difficult. For example, a request may involve 5 services, and an error could occur in any of them. Tools like distributed tracing and centralized logging are required to manage this complexity.
x??

---

#### Debugging Distributed Systems
Debugging in distributed systems is challenging due to the distributed nature of components. Errors can occur anywhere in the chain of communication, and tracing them requires sophisticated tools.

:p What makes debugging distributed systems difficult?
??x
In distributed systems, errors can originate from any service in a request chain. Tracing errors across services requires tools like distributed tracing (e.g., Jaeger, Zipkin) and centralized logging. For example, a request to a user service may involve a payment service and an inventory service, each logging their own events. Aggregating these logs to find root cause is complex.
x??

---

#### The Fallacies of Distributed Computing
The Fallacies of Distributed Computing describe common assumptions made in distributed systems that are often incorrect. These include assumptions about network reliability, zero latency, and perfect connectivity.

:p What are the Fallacies of Distributed Computing?
??x
The Fallacies of Distributed Computing, compiled by L. Peter Deutsch, highlight common misconceptions in distributed systems. These include assumptions such as:
1. The network is reliable.
2. Latency is zero.
3. Bandwidth is infinite.
4. The network is secure.
5. Topology doesn't change.
6. There is one administrator.
7. Transport costs are zero.
8. The network is homogeneous.
Understanding these fallacies helps developers design systems that are resilient to failures.
x??

---

#### Network Dependency in Distributed Systems
Distributed systems heavily depend on network communication, which introduces risks such as latency, packet loss, and failure. Architects often underestimate these complexities.

:p Why is network dependency a critical concern in distributed systems?
??x
Distributed systems rely on network communication between components. Network failures, latency, and unreliability can cause system-wide issues. For example, if a service cannot reach another due to network failure, it may cause cascading failures. Architects must design for failures and implement retry mechanisms, timeouts, and fallback strategies.
x??

---

#### Logging and Monitoring in Distributed Systems
Effective logging and monitoring are crucial in distributed systems. Logs from multiple services must be aggregated to trace errors and understand system behavior.

:p How do logging and monitoring work in distributed systems?
??x
In distributed systems, logs from each service must be aggregated to trace requests across multiple components. Tools like ELK Stack (Elasticsearch, Logstash, Kibana) or Prometheus and Grafana are used to collect, analyze, and visualize logs. For example, a single user request might generate logs in the authentication, payment, and inventory services, which are then correlated for debugging.
x??

---

#### Code Example: Microservice Communication
A simple example of communication between two services in a distributed system using REST APIs.

:p How do microservices communicate in a distributed system?
??x
Microservices communicate via APIs. For example, a user service might call a payment service using an HTTP request. The user service sends a POST request to the payment service’s endpoint, passing payment details.
```java
// Example: User service calling payment service
public class PaymentServiceClient {
    public void processPayment(String userId, double amount) {
        // Simulate REST call to payment service
        String url = "http://payment-service/process";
        // POST request to payment service
        // Handle response and error cases
    }
}
```
x??

---

#### Monolithic Architecture
Monolithic architecture refers to a software design approach where the entire application is built as a single, unified unit. This architecture is often favored in early development stages due to its simplicity, ease of deployment, and fast development cycles. However, as the application scales, monolithic systems can become unwieldy, leading to increased complexity in testing, deployment, and maintenance. In contrast to distributed systems, monolithic applications have no network dependencies, making them easier to debug and test.

:p What are the advantages and disadvantages of monolithic architecture?
??x
Advantages:
- Simpler development and testing due to a single codebase.
- Easier to deploy and debug with clear stack traces.
- Lower infrastructure overhead and no network traffic.

Disadvantages:
- Difficult to scale specific components independently.
- High risk of system-wide failures if one part fails.
- Harder to maintain as the application grows.
- Not suitable for large-scale, high-traffic applications.

Example pseudocode for a monolithic system:
```pseudocode
FUNCTION main()
    // All logic in one place
    CALL processUserInput()
    CALL saveToDatabase()
    CALL generateReport()
END FUNCTION
```
x??

---

#### Distributed Architecture
Distributed architecture involves breaking an application into multiple independent services that communicate with each other over a network. This approach allows for better scalability, fault tolerance, and modularity. It supports microservices and is ideal for complex, large-scale applications that need to grow and adapt quickly. However, it introduces challenges such as network latency, complexity in debugging, and increased infrastructure costs.

:p What are the pros and cons of distributed architecture?
??x
Pros:
- Scalability: Services can be scaled independently.
- Fault tolerance: Failure of one service does not crash the entire system.
- Modularity: Each service can be developed and deployed independently.
- Technology diversity: Different services can use different technologies.

Cons:
- Network dependencies: High risk of failure due to network issues.
- Complexity: Harder to debug and trace errors across services.
- Infrastructure costs: Requires more network infrastructure and management.
- Increased latency: Communication between services adds delay.

Example pseudocode for a distributed system:
```pseudocode
SERVICE UserManagement
    FUNCTION getUser(id)
        RETURN database.query("SELECT * FROM users WHERE id = ?", id)
    END FUNCTION
END SERVICE

SERVICE OrderProcessing
    FUNCTION processOrder(order)
        CALL UserManagement.getUser(order.userId)
        RETURN database.insert(order)
    END FUNCTION
END SERVICE
```
x??

---

#### Fault Tolerance in Distributed Systems
Fault tolerance refers to a system's ability to continue operating correctly in the presence of hardware or software failures. In distributed systems, fault tolerance is achieved through redundancy, replication, and error handling mechanisms. Techniques like load balancing, circuit breakers, and replication help ensure that a failure in one part of the system does not bring the entire system down.

:p How does distributed architecture improve fault tolerance?
??x
Distributed systems improve fault tolerance by:
- Isolating failures: If one service fails, others continue to function.
- Redundancy: Multiple instances of services can be deployed to avoid single points of failure.
- Replication: Data and services are replicated across multiple nodes.

Example Java code snippet for fault tolerance:
```java
public class FaultTolerantService {
    public void processRequest() {
        try {
            // Process request
        } catch (Exception e) {
            // Log error and fallback to alternative service
            fallbackService.execute();
        }
    }
}
```
x??

---

#### Network Overhead in Distributed Systems
In distributed systems, services communicate over a network, introducing network overhead. This includes latency, bandwidth usage, and potential failure points. The network becomes a critical component, and any issues such as packet loss or high latency can affect the performance and reliability of the system.

:p Why is network overhead a concern in distributed systems?
??x
Network overhead is a concern because:
- Communication between services introduces latency.
- Network failures can cause service outages.
- High network traffic increases infrastructure costs.
- Debugging becomes harder due to distributed nature.

Example:
$$
\text{Total latency} = \text{Processing time} + \text{Network delay} + \text{Queueing delay}
$$
x??

---

#### Scaling in Monolithic vs. Distributed Systems
Scaling a monolithic system involves scaling the entire application as a whole, which can be inefficient and resource-intensive. In contrast, distributed systems allow individual services to be scaled independently, improving resource utilization and performance.

:p How does scaling differ between monolithic and distributed architectures?
??x
In monolithic systems:
- Entire application scaled together.
- Resource inefficiency as all components are scaled even if only one needs more resources.

In distributed systems:
- Each service can be scaled independently.
- Better resource utilization and performance.
- Allows for micro-scaling based on demand.

Example pseudocode:
```pseudocode
// Monolithic scaling
SCALE entireApplication BY factor

// Distributed scaling
SCALE userService BY factor1
SCALE paymentService BY factor2
```
x??

---

#### Technical Debt in Monolithic Systems
Technical debt refers to the implied cost of additional rework caused by choosing an easy solution now instead of using a better approach that would take longer. Monolithic systems often accumulate technical debt due to rapid development and lack of modularity, making them harder to maintain and extend over time.

:p What is technical debt, and how does it relate to monolithic architecture?
??x
Technical debt:
- Refers to shortcuts taken during development that lead to future problems.
- In monolithic systems, rapid development and lack of modularity lead to high technical debt.
- Harder to refactor or improve due to tight coupling.

Example:
```java
// Poorly structured monolithic code
public class User {
    public void processOrder() {
        // Complex logic intertwined with other functionalities
    }
}
```
x??

---

#### Trade-offs Between Simplicity and Scalability
Simplicity is often prioritized in early development, especially for MVPs, but as the system grows, scalability becomes critical. Monolithic systems are simple to start with but become complex and hard to manage as they scale. Distributed systems, though more complex initially, provide better scalability and maintainability.

:p What are the trade-offs between simplicity and scalability in software architecture?
??x
Trade-offs:
- Simplicity: Easier to develop, deploy, and debug.
- Scalability: Distributed systems allow for independent scaling and better performance at scale.

Example:
$$
\text{Development Speed} \propto \frac{1}{\text{Architectural Complexity}}
$$
$$
\text{Scalability} \propto \text{Modularity}
$$
x??

---

#### Architectural Style Categorization
Understanding how to categorize architectural styles is essential for making sense of the many design patterns used in software development. One common method is by partitioning style—either technically or by domain. This distinction helps in choosing the right architecture for a given problem.
:p What are the two main ways to categorize architectural styles?
??x
The two main ways to categorize architectural styles are by their **partitioning style** and their **deployment model**. Partitioning style refers to how the system is divided: either **technically** (by concerns like presentation or services) or **by domain** (by problem areas like user management or payment processing). Deployment model refers to how components are deployed—either as a **monolithic** unit or **distributed** across multiple units.
x??

---

#### Technical vs Domain Partitioning
In technical partitioning, code is split by technical concerns such as UI, business logic, and data access layers. In contrast, domain partitioning splits code based on the business domain, such as user management, inventory, or billing.
:p How does technical partitioning differ from domain partitioning?
??x
In **technical partitioning**, the codebase is divided based on **technical responsibilities**—for example, separating presentation logic from business logic and data access. In **domain partitioning**, the code is structured around **business domains**—such as separating user authentication, product catalog, and order processing into distinct modules. Domain partitioning aligns more closely with real-world business processes.
x??

---

#### Monolithic vs Distributed Architectures
Monolithic architectures deploy all components as a single unit, making them simpler to develop, debug, and deploy initially. However, they become hard to scale and maintain as they grow. Distributed architectures, on the other hand, split components into separate units that can be scaled independently, but they introduce complexity due to inter-service communication.
:p What are the pros and cons of monolithic architectures?
??x
**Pros of monolithic architectures** include:
- Easier to understand and debug
- Cheaper to build initially
- Simple deployment model
- Good for rapid time-to-market

**Cons of monolithic architectures** include:
- Difficult to scale as a whole
- A bug can bring down the entire application
- Not modular, leading to tight coupling
- Harder to maintain and evolve over time

Example in Java:
```java
public class MonolithApp {
    public static void main(String[] args) {
        // All logic is in one unit
        System.out.println("Processing user request...");
    }
}
```
x??

---

#### Distributed Architecture Characteristics
Distributed architectures are scalable and modular, allowing different parts of an application to be deployed and scaled independently. However, they require network communication between services, increasing complexity and potential failure points.
:p What are the pros and cons of distributed architectures?
??x
**Pros of distributed architectures** include:
- Highly scalable
- Encourages modularity and easier testing
- Independent deployment and scaling
- Fault isolation

**Cons of distributed architectures** include:
- Complex to develop, debug, and maintain
- Requires network communication
- Increased latency and potential failure points
- More expensive to implement

Example in pseudocode:
```
ServiceA -> Network -> ServiceB
```
Each service communicates over a network, which adds complexity.
x??

---

#### Deployment Model Comparison
Architectures can be classified by their deployment model—monolithic or distributed. Monolithic systems deploy all components as a single unit, while distributed systems deploy logical components separately.
:p How do monolithic and distributed architectures differ in deployment?
??x
In a **monolithic architecture**, all components of the application are deployed as a **single unit**, meaning that a change requires redeploying the entire system. In a **distributed architecture**, components are deployed as **separate units**, allowing for independent scaling, deployment, and maintenance. This leads to more flexibility but also more complexity in managing inter-service communication.
x??

---

#### Layered Architecture Overview
The layered architecture is one of the most commonly used architectural styles because it's easy to understand and implement. It separates concerns into distinct layers, such as presentation, business logic, and data access.
:p What is the layered architecture, and why is it popular?
??x
The **layered architecture** separates an application into distinct layers, each with a specific responsibility (e.g., presentation, business logic, data access). It's popular because:
- It's easy to understand
- Leverages known design patterns
- Encourages separation of concerns

Example in pseudocode:
```
Presentation Layer -> Business Logic Layer -> Data Access Layer
```
Each layer interacts only with the layer directly below it, promoting modularity and maintainability.
x??

---

#### Layered Architecture Overview
Layered architecture is a structural approach to software design that separates the application into distinct horizontal layers, each with specific responsibilities. This approach supports separation of concerns, making it easier to manage complexity, test components, and scale the system. In the context of Naan & Pop, this architecture helps isolate UI, business logic, and data access layers, which is essential for a startup with limited resources but future expansion goals.

:p What is the main goal of layered architecture in the context of Naan & Pop?
??x
The main goal of layered architecture for Naan & Pop is to provide a simple yet extensible system that allows separation of responsibilities among specialized team members. This supports quick development, maintainability, and future scalability such as adding new interfaces or integrating delivery services.
x??

---

#### Model-View-Controller (MVC) Pattern
The Model-View-Controller (MVC) is a design pattern that separates an application into three interconnected components. The **Model** represents the data and business logic, the **View** displays the data, and the **Controller** handles user input and updates the model and view accordingly. In software architecture, MVC can be seen as a foundational pattern that supports layered architectures, especially when dealing with user interfaces.

:p How does the MVC pattern support layered architecture?
??x
The MVC pattern naturally maps to a layered architecture where:
- The **Model** layer handles data and business logic.
- The **View** layer manages UI rendering.
- The **Controller** layer coordinates between the two.
This separation allows each part to evolve independently, supporting the requirement for extensibility and specialization of roles, such as UI designers and DBAs.
x??

---

#### Separation of Responsibilities
Separation of responsibilities is a key principle in software architecture that involves dividing system functions into distinct parts so that each part has a single, well-defined responsibility. This principle helps in managing complexity, improving maintainability, and enabling specialization among team members. In the case of Naan & Pop, this means separating UI, data, and business logic into distinct components or layers.

:p Why is separation of responsibilities important in the Naan & Pop project?
??x
Separation of responsibilities ensures that each part of the system (e.g., UI, database, business logic) can be developed, tested, and maintained independently. This is especially important for a startup with part-time specialists (e.g., UI designers, DBAs), as it allows them to focus on their area of expertise without interfering with others. It also makes the system more scalable and extensible.
x??

---

#### Extensibility in Software Architecture
Extensibility refers to the ability of a system to be extended with new features or capabilities without requiring major changes to existing code. In the context of Naan & Pop, extensibility is important because the restaurant may want to add new user interfaces or integrate with delivery services in the future. A layered architecture supports this by isolating components and minimizing dependencies between layers.

:p How does a layered architecture support extensibility?
??x
A layered architecture supports extensibility by ensuring that each layer has a well-defined interface and minimal dependencies. For example, if a new user interface is needed, only the presentation layer needs to be modified, without affecting the business logic or data layers. This modularity allows the system to grow and adapt to new requirements easily.
x??

---

#### Trade-offs in Software Architecture
Choosing the right architecture involves balancing multiple constraints such as time to market, simplicity, extensibility, and resource availability. In the case of Naan & Pop, the team must choose an architecture that allows for rapid development while still being flexible enough for future growth. This often means selecting a style that is simple to implement but not overly rigid.

:p What are the main trade-offs faced by the Naan & Pop team in choosing an architecture?
??x
The main trade-offs include:
1. **Simplicity vs. Extensibility**: Using an existing framework may speed up development but limit extensibility.
2. **Time to Market vs. Quality**: A rushed solution may not be well-structured for future needs.
3. **Resource Constraints vs. Specialization**: Limited team members require a design that allows for specialization without tight coupling.
These trade-offs must be carefully balanced to meet the startup's goals.
x??

---

#### Layered Architecture Example in Java
In a layered architecture, each layer typically has a specific role. For example, the presentation layer (UI) interacts with the business logic layer, which in turn interacts with the data access layer. Here is a simplified example:

```java
// Business Logic Layer
public class OrderService {
    private OrderDAO orderDAO;

    public OrderService(OrderDAO orderDAO) {
        this.orderDAO = orderDAO;
    }

    public void placeOrder(Order order) {
        orderDAO.save(order);
    }
}

// Data Access Layer
public class OrderDAO {
    public void save(Order order) {
        // Save to database
    }
}
```

:p How does this Java example demonstrate layered architecture?
??x
This example demonstrates layered architecture by separating concerns:
- The `OrderService` class (business logic layer) handles order processing and delegates to `OrderDAO`.
- The `OrderDAO` class (data access layer) handles database interactions.
This separation ensures that changes in one layer do not directly affect another, supporting modularity and maintainability.
x??

---

---

