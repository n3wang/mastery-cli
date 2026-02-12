# High-Quality Flashcards: 024---Mastering-API-Architecture_processed (Part 24)

**Starting Chapter:** Summary

---

#### Introducing API Abstractions to Improve Maintainability
API abstractions can help decouple components, making the system more modular and easier to evolve. When a subsystem is problematic, creating an abstraction layer can allow for gradual refactoring or replacement using techniques like the strangler fig pattern.
:p How can API abstractions help with system evolution?
??x
API abstractions provide a clean interface that separates internal implementation from external consumers. This allows for internal refactoring or replacement without affecting dependent systems. Techniques like the strangler fig can be used to gradually migrate to a new system.
x??

---

#### Breaking Dependencies in Distributed Systems
In a distributed system, breaking dependencies is crucial for enabling independent evolution of services. Synchronized releases or tightly coupled services can slow down development and increase risk.
:p How does breaking dependencies improve system evolution?
??x
Breaking dependencies allows services to evolve independently, reducing the risk of release conflicts and enabling faster deployment cycles. It promotes modularity and scalability, which are key in distributed systems.
x??

---

#### API-Driven Architecture and System Decomposition
APIs provide natural seams in a system, allowing for modular decomposition. They support the evolution of systems toward service-based architectures by enabling loose coupling and clear interfaces.
:p How do APIs support system decomposition?
??x
APIs act as boundaries between modules or services, enabling clear separation of concerns. This supports modular design, allowing teams to evolve individual services independently while maintaining system integrity.
x??

---

#### Coupling and Cohesion in System Design
Coupling refers to how closely connected modules are, while cohesion refers to how closely related the elements within a module are. Low coupling and high cohesion are key principles for maintainable systems.
:p What are the principles of coupling and cohesion in system design?
??x
Low coupling means modules depend minimally on each other, making systems easier to change and test. High cohesion means elements within a module are closely related, making modules more focused and manageable.
x??

---

#### API Gateway in Cloud Migration
API gateways play a crucial role in cloud migration by providing a centralized entry point for APIs, enabling traffic routing, security, and monitoring. They offer location transparency, allowing services to be moved to the cloud without breaking client integrations. This enables gradual migration strategies, where traffic is shifted from legacy services to new cloud-hosted services.

:p How does an API gateway support cloud migration and provide location transparency?
??x
An API gateway acts as a proxy for API requests, enabling centralized management of APIs. It allows for routing traffic to different services, whether they are on-premises or in the cloud, by abstracting the physical location of the service.

This location transparency is essential for gradual migration strategies. For example, an API gateway can route some requests to the legacy service and others to the new cloud-hosted service, enabling a phased migration with minimal impact on consumers.

Example code in Java using a basic API gateway abstraction:
```java
public class APIGateway {
    public void routeRequest(String endpoint, Request request) {
        if (isCloudService(endpoint)) {
            sendToCloudService(endpoint, request);
        } else {
            sendToLegacyService(endpoint, request);
        }
    }
}
```
x??

---

#### API Design in Cloud Migration
APIs are often the closest business-driven component to the user and serve as the primary point of ingress for most requests. Therefore, they are critical in evaluating migration strategies. When designing or evolving APIs during cloud migration, considerations such as protocol choice, data format, and communication patterns must align with cloud-native principles. For instance, APIs should be designed to support asynchronous communication, use REST or GraphQL appropriately, and be scalable across network boundaries.

:p How should APIs be designed to support cloud-native migration strategies?
??x
APIs should be designed with scalability, modularity, and resilience in mind to support cloud-native migration. They should support asynchronous communication patterns, such as event-driven architectures, to reduce latency and improve performance across network boundaries. Protocols like REST or GraphQL should be chosen based on use cases, with REST for resource-based interactions and GraphQL for flexible querying. Additionally, APIs should be stateless, versioned, and capable of handling high traffic efficiently. When migrating, APIs must also be designed to integrate smoothly with cloud services like load balancers, monitoring tools, and container orchestration platforms. This ensures that the API layer can evolve alongside the underlying infrastructure.
x??

---

---

