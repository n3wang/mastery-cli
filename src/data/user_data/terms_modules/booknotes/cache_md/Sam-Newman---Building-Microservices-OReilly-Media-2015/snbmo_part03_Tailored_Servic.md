# High-Quality Flashcards: Sam-Newman---Building-Microservices-OReilly-Media-2015_processed (Part 3)


**Starting Chapter:** Tailored Service Template

---


#### Heroku's 12 Factors
Explanation of the Heroku design principles and their relevance to creating applications that work well on Heroku. These factors can be adapted for other contexts as well.

:p What are Heroku’s 12 Factors, and how might they apply in a broader context?
??x
Heroku’s 12 Factors are guidelines structured around helping developers create applications that perform well on the Heroku platform. They include both principles and constraints. For example:

- **The twelve-factor app is configured via environment variables** - This principle can be adapted to other contexts where configuration should not be hard-coded.
- **松耦合的系统设计** - 这种约束可能在其他环境中也很有用，确保系统的各个部分尽可能独立工作。

```java
public class Example {
    // Using an environment variable in a method
    public int calculateFactor(String envVar) {
        return Integer.parseInt(System.getenv(envVar));
    }
}
```
x??

---


#### Trade-offs in Microservices
Explanation of the trade-offs involved in microservice architectures, including decisions about data storage and technology stacks.

:p What are some common trade-offs when designing a system with microservices?
??x
When designing a microservice architecture, several trade-offs come into play. For example:
- **Choosing a less familiar datastore for better scaling** - vs. sticking to something more tried-and-tested.
- **Deciding on technology stack diversity** - Is it okay to have two different stacks? Three?

```java
public class Example {
    // Pseudocode to decide on a data storage choice
    public DataStore chooseDataStore(String experience, String scalability) {
        if (experience < 5 && scalability > 3) return new NoSQL();
        else return new SQL();
    }
}
```
x??

---


#### Practices Definition and Role
Background context explaining what practices are, their purpose, and how they relate to principles. Practices ensure that principles are being carried out through detailed, task-oriented guidance. They often reflect technology-specific requirements and can change more frequently than principles.

:p What are practices in the context described?
??x
Practices are detailed, practical guidelines for performing tasks, ensuring that overarching principles are followed in a technical manner. They are specific to technologies and processes used by developers.
x??

---


#### Example of Practices
An example was provided about how a principle (delivery teams controlling the full lifecycle) can be underpinned by a practice (deploying services into isolated AWS accounts). This illustrates how practices provide concrete steps that align with broader principles.

:p Can you give an example of how a principle is translated into a practice?
??x
Sure, a principle stating that "delivery teams control the full lifecycle of their systems" could be translated into a practice such as "all services are deployed into isolated AWS accounts." This practice ensures self-service management and isolation from other teams, directly supporting the overarching principle.

For example:
```java
public class ServiceDeploymentManager {
    public void deployService(String serviceName, String awsAccount) {
        // Code to ensure service is deployed in an isolated AWS account
    }
}
```
x??

---


#### Combining Principles and Practices
The text suggests that for a smaller group or single team, combining principles and practices might be acceptable. However, larger organizations may need different sets of practices due to varying technologies and working practices, as long as they align with common principles.

:p How should large organizations handle the combination of principles and practices?
??x
Large organizations can have distinct sets of practices for different teams or technologies (e.g., .NET team vs. Java team) while maintaining a unified set of overarching principles. This approach ensures consistency in core values while allowing flexibility in implementation details.
x??

---


#### Real-World Example
A real-world example provided by Evan Bottcher shows how goals, principles, and practices interact. Practices change more frequently than principles over time.

:p Can you describe the importance of a diagram illustrating principles and practices?
??x
A diagram like the one described is crucial for visualizing how high-level goals map to specific principles and then down to detailed practices. It helps in communicating complex ideas clearly and ensuring everyone understands their roles and responsibilities.
x??

---


#### The Required Standard
Identifying what constitutes a "good citizen" service is key to maintaining system manageability. This involves defining required standards for services to ensure they do not bring down the entire system.

:p What is meant by "good citizen" in this context?
??x
A "good citizen" service refers to one that adheres to well-defined standards and behaviors, ensuring it does not negatively impact the overall stability and manageability of the system. This includes having necessary capabilities like self-management and isolation from other services.
x??

---

---


#### Monitoring System Health
Background context explaining the importance of monitoring system health. It's essential to have a cohesive view across services rather than just service-specific views for effective system-wide diagnosis and trend analysis.

:p How can we ensure coherent, cross-service views of our system health?
??x
We need to establish standardized metrics and monitoring practices that provide a holistic view of the system. This involves ensuring all services emit health and general monitoring-related metrics in the same way. For instance, you might choose a push mechanism where each service pushes its data into a central location like Graphite for metrics or Nagios for health checks.

```java
// Example of emitting metrics using a simplified model
public class ServiceMetrics {
    public void sendMetric(String metricName, double value) {
        // Code to send the metric to a centralized monitoring system
    }
}
```
x??

---


#### Interface Consistency Across Services
Background context explaining the importance of standardizing interfaces across services for better integration and maintainability. Using too many different integration styles can lead to complexity and maintenance issues.

:p How does picking a small number of defined interface technologies benefit microservices?
??x
Picking a few well-defined interface technologies, such as HTTP/REST with consistent conventions (e.g., using verbs or nouns), helps in integrating new consumers more easily. It reduces the learning curve for developers and ensures consistency across services. For instance, if you decide to use HTTP/REST, define clear rules around handling pagination of resources and versioning endpoints.

```java
// Example of defining REST API conventions
public class ResourceHandler {
    public String handleRequest(String verb, String resource) {
        // Code to handle different verbs (GET, POST, PUT, DELETE) on a given resource
        return "Handling request with method: " + verb + " and resource: " + resource;
    }
}
```
x??

---


#### Architectural Safety in Microservices
Background context explaining the importance of ensuring services are resilient against failures from downstream calls. This involves using techniques like connection pools, circuit breakers, and proper handling of HTTP response codes.

:p How can we ensure that one badly behaved service doesn't ruin the system's stability?
??x
To maintain system stability, we need to mandate architectural safety measures such as each microservice having its own connection pool and possibly using a circuit breaker pattern. This prevents a single failure from cascading into multiple services. Additionally, response codes should be handled correctly; for example, HTTP 2XX should not be used for errors, and the difference between 4XX and 5XX status codes must be respected.

```java
// Example of implementing a basic circuit breaker pattern
public class CircuitBreaker {
    private boolean isClosed;
    
    public void handleRequest() throws Exception {
        if (isClosed) {
            throw new ServiceUnavaliableException("Circuit breaker open");
        } else {
            // Proceed with the service request
        }
    }
}
```
x??

---


#### Importance of Clear Interface Definitions
Background context explaining that picking a few well-defined interface technologies helps in integrating new consumers and maintaining system consistency. The number of different integration styles should be kept to a minimum for simplicity.

:p What is the impact of having multiple integration styles among microservices?
??x
Having too many different integration styles among microservices can lead to increased complexity, making it harder to maintain and integrate with new services. It's better to have one or two well-defined standards that everyone adheres to. For instance, if you choose HTTP/REST as your primary interface technology, define clear conventions around resource handling and versioning.

```java
// Example of defining REST API versioning
public class VersionedResource {
    public String getVersionedUrl(String resourceName) {
        // Return the URL with the correct version in the path or query parameters
        return "/api/v1/" + resourceName;
    }
}
```
x??

---

---


#### Exemplars
Exemplars are real-world services that demonstrate best practices and can be used as a reference for developers. The purpose is to encourage others to follow established guidelines without deviating too far.

:p What are exemplars, and why are they useful?
??x
Exemplars are concrete implementations of your system's best practices that serve as practical references for developers. They help ensure that new services adhere to the same standards by providing a clear example of what "correct" implementation looks like in practice.

By using real-world services as exemplars, you can build confidence among team members that following these guidelines will lead to robust and maintainable systems. This approach is more compelling than just writing down rules because developers prefer seeing actual code they can run and explore.
x??

---


#### Service Templates
Service templates are pre-configured frameworks designed to streamline the implementation of services according to a set of predefined standards or best practices.

:p How do service templates help in implementing guidelines?
??x
Service templates provide a starting point for developers, reducing the initial effort required to implement core functionalities and aligning them with your organization's standards. By using tailored service templates, you can ensure that most of the code necessary for common services is already in place, allowing teams to focus on specific business logic rather than boilerplate code.

For example, if you use Dropwizard or Karyon as a base, these frameworks come with features like health checking and HTTP serving. By tailoring such templates, you can enforce additional requirements such as circuit breakers (e.g., integrating Hystrix) or centralized metrics collection (e.g., using Metrics from Dropwizard).

Here's an example of adding Hystrix to a Dropwizard service template:

```java
public class MyService extends Application<MyConfiguration> {
    private final HystrixDashboard hystrixDashboard;

    @Override
    public void initialize(Configuration config) throws Exception {
        super.initialize(config);
        
        // Initialize Hystrix Dashboard
        hystrixDashboard = new HystrixDashboard(config.getHystrixDashboardPort());
        hystrixDashboard.start();
    }

    @Override
    public String getName() {
        return "MyService";
    }

    @Override
    public void run(MyConfiguration configuration, Environment environment) throws Exception {
        // Existing Dropwizard services code...
        
        // Add Hystrix commands and metrics to the health check path
        environment.healthChecks().register("myServiceHealthCheck", new MyHealthCheck());
    }
}
```
x??

---


#### Real-World vs. Perfect Examples
Exemplars should be real-world services that have proven successful, rather than artificially perfect examples.

:p Why should exemplars be based on real-world services and not artificial examples?
??x
Exemplars should ideally come from actual production environments where they have been tested and proven effective over time. Artificially perfect examples can give a false sense of security or practicality because they might lack the nuances that arise in real-world scenarios.

Using real-world services as exemplars ensures that developers are exposed to solutions that have faced real challenges and have found ways to overcome them. This approach makes it more likely that new services will be robust and well-optimized for production use, rather than overly simplistic or theoretical.

For instance, if you choose a service template that has been used in multiple projects and has encountered various issues and resolved them, developers can learn from these experiences.
x??

---


---
#### Fault Tolerance and Service Design at Netflix
Netflix places a high emphasis on fault tolerance, which is crucial to ensure that outages in one part of their system do not bring down everything. This is achieved through robust client libraries for JVMs, which provide essential tools for maintaining service behavior.
:p How does Netflix ensure fault tolerance across its services?
??x
To achieve fault tolerance, Netflix uses client libraries on the JVM to help teams implement reliable services. They also use sidecar services that communicate locally with a JVM using appropriate libraries. This decentralized approach allows for better resilience and easier maintenance compared to a monolithic framework.
```java
// Example of a basic fault-tolerant service implementation
public class FaultTolerantService {
    private ClientLibrary clientLibrary;

    public FaultTolerantService(ClientLibrary clientLibrary) {
        this.clientLibrary = clientLibrary;
    }

    public void handleRequest() {
        try {
            clientLibrary.execute();
        } catch (Exception e) {
            // Log and handle exception
        }
    }
}
```
x??

---


#### Sidecar Services in Netflix Architecture
Netflix employs sidecar services to enhance fault tolerance. These services communicate locally with a JVM using appropriate libraries, ensuring that the failure of one component does not bring down the entire system.
:p What is a sidecar service and how does it work?
??x
A sidecar service acts as an intermediary between the application and the library, providing local communication to ensure fault tolerance. It helps maintain the reliability of services by allowing them to interact with libraries in a resilient manner without directly relying on networked components.
```java
// Example of a sidecar service implementation
public class SidecarService {
    private ClientLibrary clientLibrary;

    public SidecarService(ClientLibrary clientLibrary) {
        this.clientLibrary = clientLibrary;
    }

    public void communicateWithClient() {
        // Local communication with the JVM using appropriate libraries
        clientLibrary.performLocalOperation();
    }
}
```
x??

---


#### Centralized vs. Distributed Practices in Service Templates
Netflix's approach to service templates is decentralized, promoting collective responsibility among teams. This avoids centralizing control over implementation details, which can otherwise be detrimental to team morale and productivity.
:p How does Netflix handle the use of service templates?
??x
Netflix encourages a distributed approach where each team defines and updates its own service template collaboratively. This decentralization helps maintain team autonomy and reduces the risk of imposing overly strict frameworks that could stifle innovation and developer morale.
```java
// Example of a decentralized service template management
public class TeamServiceTemplate {
    private static void updateTemplate() {
        // Collectively decide on changes to be made to the template
        System.out.println("Updating team-specific service template...");
    }
}
```
x??

---


#### Coupling Risks in Shared Code
The potential for coupling between services increases when shared code is used carelessly. Netflix mitigates this by either manually copying the service template into each service or treating it as a binary dependency, ensuring that each service remains isolated.
:p How does Netflix manage to avoid coupling issues with its service templates?
??x
Netflix avoids coupling by either manually copying the service template code into each service to ensure independence or using shared binaries while preventing developers from enforcing DRY (Don't Repeat Yourself) principles too strictly. This helps maintain isolation and resilience across services.
```java
// Example of manual copy approach for avoiding coupling
public class ManualCopyService {
    public void applyTemplate() {
        // Manually copied template code
        System.out.println("Manually applied service template...");
    }
}
```
x??

---

---


#### Technical Debt
Background context: Technical debt is a term used to describe shortcuts or compromises made during software development that can impact the system's long-term maintainability and stability. The concept is based on the analogy of financial debt, where immediate gains are sacrificed for future costs.

:p What is technical debt in software development?
??x
Technical debt refers to the shortcuts or compromises taken during software development that can lead to increased maintenance costs and decreased system quality over time. Just like financial debt, it incurs ongoing costs and should be managed and paid down.
x??

---


#### Governance and Leading from the Center
Background context: Governance in software development ensures that enterprise objectives are met by setting direction, prioritizing tasks, making decisions, and monitoring performance against agreed-upon goals. Architects play a crucial role in ensuring technical vision alignment.

:p What is governance in the context of IT?
??x
Governance in IT ensures that enterprise objectives are achieved through evaluating stakeholder needs, setting direction via prioritization and decision-making, and monitoring performance, compliance, and progress against agreed-on directions and objectives.
x??

---


#### Architect's Responsibilities
Background context: Architects have a wide range of responsibilities including ensuring technical vision, guiding development principles, managing trade-offs, and leading teams. They must balance technical innovation with practical constraints.

:p What are the main roles of an architect?
??x
The main roles of an architect include ensuring there is a set of guiding principles for development, matching these principles to organizational strategy, avoiding practices that make developers miserable, staying updated on new technologies, making appropriate trade-offs, and carrying people along with them in their decisions.
x??

---


#### Autonomy for Teams
Autonomy involves finding the right balance between standardizing processes and enabling team members to make decisions about their specific parts of the system. This empowers teams but also requires clear guidelines.
:p How does autonomy benefit a microservices architecture?
??x
Autonomy benefits a microservices architecture by allowing different services to be developed, maintained, and scaled independently. However, it's crucial to establish standards or governance frameworks to ensure consistency across services while empowering teams to innovate and adapt as needed.
```java
public class AutonomyExample {
    public void defineStandards(String standard) {
        // Code to simulate defining a standard for microservices
        System.out.println("Defining " + standard + " for our microservices");
    }
}
```
x??

---


#### Governance in Microservices
Governance ensures that the implementation of the system aligns with the overall technical vision. This includes setting standards, policies, and procedures to maintain consistency and quality across services.
:p What is governance in the context of microservices?
??x
Governance in the context of microservices involves establishing a framework for managing the development, deployment, and maintenance of individual services while ensuring they collectively contribute to the overall technical vision. This includes setting standards for architecture, security, performance, and other critical aspects.
```java
public class GovernanceExample {
    public void enforceGovernance(String policy) {
        // Code to simulate enforcing a governance policy on microservices
        System.out.println("Enforcing " + policy + " across all services");
    }
}
```
x??

---

---


#### What Makes a Good Service
Background context: The text emphasizes the importance of loose coupling and high cohesion when designing microservices for MusicCorp. These principles are crucial in ensuring that changes to one service do not necessitate altering other parts of the system.
:p What two key concepts should be considered when defining good services?
??x
The two key concepts are **loose coupling** and **high cohesion**. Loose coupling means a change in one service should not require modifications in another, while high cohesion ensures that each service is tightly integrated with its own internal components but loosely coupled with other services.
x??

---


#### Loose Coupling
Background context: Loose coupling is critical for microservices to operate independently without affecting each other when changes are made. Tight coupling can hinder the agility of deploying new features or fixing bugs in one service, impacting others.
:p What does loose coupling mean in the context of microservices?
??x
Loose coupling means a change in one service should not require modifications in another. In microservices architecture, this is essential to ensure that any changes made to a single service can be deployed independently without affecting other services.
x??

---


#### Avoiding Tight Coupling
Background context: The text warns against common mistakes like picking integration styles that tightly bind services, leading to a situation where changes inside one service require corresponding changes in its consumers. This tight coupling is detrimental to the agility of microservices.
:p What are some causes of tight coupling between services?
??x
Tight coupling can be caused by choosing an integration style that binds one service too closely to another. For example, if Service A frequently makes calls to Service B and those calls are tightly integrated, changes in Service A could necessitate updates in Service B.
x??

---


#### Limiting Chatty Communication
Background context: Excessive communication between services can lead to tight coupling. The text suggests limiting the number of different types of calls from one service to another to maintain loose coupling and avoid performance issues.
:p How does excessive chatty communication between services impact microservices?
??x
Excessive communication, often referred to as "chatty" communication, can lead to tight coupling and make it harder to change or deploy individual services. It also might introduce performance bottlenecks because of the increased number of calls.
x??

---


#### Conclusion of Flashcards for Microservices Introduction
These flashcards cover key concepts around defining and designing microservices, focusing on loose coupling and high cohesion. Understanding these principles is crucial for implementing a successful microservices architecture at MusicCorp.
---

---


#### High Cohesion
Background context explaining the importance of high cohesion. This principle emphasizes that related behavior should be grouped together to facilitate easier and quicker changes, reducing deployment risks.
:p Why is it important to have high cohesion in a system?
??x
High cohesion ensures that related behaviors are grouped in one place, making changes faster and minimizing deployment risks by limiting the scope of affected components. By grouping related functionality, you reduce the complexity of individual modules, making them more manageable and easier to test.
x??

---


#### Bounded Context (Concept)
Background context explaining bounded contexts as introduced by Eric Evans in Domain-Driven Design. The concept helps define boundaries within a domain where models are specific to that context, ensuring loose coupling between different parts of a system.
:p What is the concept of a bounded context?
??x
A bounded context is a specific responsibility enforced by explicit boundaries, encapsulating related behaviors and data models. Each bounded context has its own language and logic, but can communicate with other contexts through well-defined interfaces.
x??

---


#### Explicit Interfaces in Bounded Contexts
Background context explaining the importance of explicit interfaces between bounded contexts. These interfaces ensure that communication is clear and controlled, reducing complexity and potential errors.
:p How do bounded contexts communicate with each other?
??x
Bounded contexts communicate via explicit interfaces where they define which models can be shared externally. Communication occurs through these defined boundaries using well-structured models to avoid sharing unnecessary details or complex logic.
x??

---


#### Warehouse Bounded Context Example
Background context explaining how the warehouse can be considered a bounded context within MusicCorp. This example illustrates the concept with practical details.
:p How does the warehouse exemplify a bounded context?
??x
The warehouse at MusicCorp is another clear bounded context, managing tasks like order management, stock handling, and forklift operations. These activities are encapsulated within this context and interact with other parts of the business through well-defined interfaces.
x??

---


#### Shared vs Hidden Models in Bounded Contexts
Background context explaining shared models (visible to external contexts) versus hidden models (internal to a bounded context).
:p What is the difference between shared and hidden models in a bounded context?
??x
Shared models are those that are communicated externally, while hidden models remain internal. For example, payroll data might be shared with other finance-related bounded contexts, but forklift truck details would likely stay within the warehouse context.
x??

---


#### Importance of Context Boundaries
Background context explaining why defining clear boundaries is crucial for managing complexity and ensuring modularity in software systems.
:p Why are context boundaries important?
??x
Defining clear boundaries helps manage complexity by isolating parts of a system that can be developed, tested, and deployed independently. This isolation reduces the risk of unintended side effects and makes it easier to make changes without affecting unrelated parts of the system.
x??

---

---


#### Shared Model Between Contexts
Background context explaining that different departments (finance and warehouse) need to share some information but not all. The finance department needs stock level information for accurate accounting, while internal details like storage locations remain hidden.

:p What is a shared model between the finance department and the warehouse?
??x
A shared model refers to information that both contexts need but are only exposed in a simplified form suitable for the external context. For example, the finance department needs to know stock levels, but it does not need to know about internal storage locations or specific processes like picking orders.

```java
public class StockItem {
    private int quantity; // Exposed quantity for finance
    private String warehouseLocation; // Not exposed to finance

    public void updateQuantity(int newQuantity) {
        this.quantity = newQuantity;
    }
}
```
x??

---


#### Internal and External Concerns
Explanation that internal concerns within a context are separate from the shared models used by external contexts.

:p What does it mean when we say "internal only representation" in the context of stock items?
??x
The internal only representation refers to detailed information about how stock items are managed within the warehouse, such as specific storage locations or detailed picking processes. This is not exposed to external systems like finance but remains an internal concern.

```java
public class InternalStockItem {
    private int quantity;
    private String warehouseLocation;

    public void updateQuantity(int newQuantity) {
        this.quantity = newQuantity;
    }
}
```
x??

---

---

