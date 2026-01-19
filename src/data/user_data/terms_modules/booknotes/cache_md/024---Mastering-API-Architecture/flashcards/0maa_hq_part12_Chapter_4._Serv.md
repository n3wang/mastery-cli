# High-Quality Flashcards: 024---Mastering-API-Architecture_processed (Part 12)

**Starting Chapter:** Chapter 4. Service Mesh Service-to-Service  Traffic Management. Guideline Should You Adopt Service Mesh

---

#### Service Mesh vs API Gateway
While API gateways are used for managing external traffic from clients and external systems, service meshes are designed for internal traffic between services. Using an API gateway for internal service communication can be suboptimal because it adds unnecessary overhead and complexity. A service mesh, on the other hand, is specifically built to handle internal communication with features like traffic splitting, circuit breaking, and distributed tracing.

:p Why is using an API gateway for internal service communication suboptimal?
??x
Using an API gateway for internal service communication is suboptimal because API gateways are optimized for external traffic and often introduce unnecessary complexity, such as request transformation, rate limiting, and authentication for client-facing APIs. In contrast, service meshes are designed for internal service-to-service communication and offer advanced features like automatic retries, circuit breaking, and distributed tracing. These features are not typically needed for external traffic and can be overkill or even detrimental in internal communication scenarios.
$$
\text{Internal Traffic} \neq \text{External Traffic}
$$
For example, an API gateway might enforce strict rate limits on external users, but in internal communication, these limits could hinder performance or cause unintended service failures.
```java
// Example: Internal communication handled by service mesh
public class ConferenceService {
    public void processSession() {
        // No need to manually handle retries or observability
        // Service mesh handles it transparently
    }
}
```
x??

---

#### Extracting Services from Legacy Systems
When extracting functionality from a legacy monolithic system into new services, communication challenges arise. These include service discovery, handling of inter-service dependencies, and maintaining backward compatibility. A service mesh helps overcome these challenges by abstracting service communication and providing consistent policies for traffic management across services.

:p How does a service mesh help when extracting services from a legacy system?
??x
When extracting services from a legacy system, a service mesh helps by providing a consistent way to manage communication between services, even if they are deployed in different environments or use different protocols. It offers service discovery, traffic routing, and observability without requiring changes to the application code. This allows legacy systems to gradually evolve into microservices without disrupting existing functionality.
$$
\text{Legacy System} \rightarrow \text{New Services} \rightarrow \text{Service Mesh}
$$
For example, a session-handling functionality extracted from a monolith can be exposed as a new service, and the service mesh ensures it can communicate reliably with other services in the system.
```java
// Example: Session service being extracted
public class SessionService {
    public void handleSession() {
        // Service mesh handles retries, logging, and routing
        // Legacy system doesn't need to know about these concerns
    }
}
```
x??

---

#### Service Mesh vs Libraries for Service-to-Service Communication
Background context: When managing communication between services in a microservices architecture, developers often choose between using language-specific libraries (like SDKs or database drivers) or adopting a service mesh. Libraries map application calls to API requests and manage traffic via protocols like HTTP or TCP/IP. A service mesh, on the other hand, provides a dedicated infrastructure layer for handling service-to-service communication with added features such as reliability, observability, and security.

:p What are the key differences between using libraries and service meshes for service-to-service communication?
??x
Libraries are language-specific and manage traffic via protocols like HTTP or TCP/IP, mapping application calls to API requests. They are simpler and sufficient for basic routing needs. Service meshes, however, offer advanced cross-functional features like authentication, authorization, rate limiting, and centralized traffic management. They are more scalable, maintainable, and secure, especially in enterprise environments with multiple technology stacks. In summary, libraries are good for simple, single-language scenarios, while service meshes are preferred for complex, multi-language systems requiring robust infrastructure support.
x??

---

#### When to Choose a Service Mesh Over Libraries
Background context: Organizations using a single programming language or framework may find libraries sufficient for service-to-service communication. However, when cross-functional requirements such as authentication, authorization, or rate limiting are needed, especially across services using different languages or stacks, a service mesh becomes the better option.

:p Under what conditions should an organization prefer a service mesh over libraries for service-to-service communication?
??x
An organization should prefer a service mesh when there are advanced cross-functional requirements, such as authentication, authorization, or rate limiting, especially in environments where services use different programming languages or technology stacks. Additionally, if there are organizational mandates requiring all traffic to go through specific components, or if scalability and maintainability are key concerns, a service mesh is typically the better solution. Libraries are more suitable for simple, single-language environments where minimal overhead is acceptable.
x??

---

#### Sidecar Pattern in Service Mesh
The sidecar pattern is a general-purpose architectural pattern where a separate process (sidecar) is attached to a parent application to extend or enhance its functionality. In service mesh, sidecars are implemented using proxies. These proxies are deployed alongside each service and handle all service-to-service communication transparently.
:p What is the role of a sidecar proxy in a service mesh?
??x
A sidecar proxy is a component that runs alongside a service in the same pod (in Kubernetes) and handles all communication between services. It intercepts and manages traffic, enforces policies, and provides observability without requiring changes to the application code. This allows for consistent behavior across services, regardless of the programming language or framework used.
x??

---

#### API Gateway Loopback Antipattern
The API gateway loopback antipattern occurs when internal services call each other through an external API gateway. This leads to unnecessary network overhead, potential performance degradation, and security risks. It also increases cloud costs by routing traffic outside the cluster unnecessarily.
:p Why is routing internal traffic through an external API gateway problematic?
??x
Routing internal traffic through an external API gateway creates a loopback scenario that bypasses the service mesh optimizations. It leads to increased latency, higher cloud costs due to external traffic, and potential security vulnerabilities. It also makes the system less efficient and harder to manage, as the traffic is not handled within the optimized internal network.
x??

---

#### Sidecar Proxy Implementation in Kubernetes
In Kubernetes, sidecar proxies are typically deployed as part of each pod alongside the main application. These proxies intercept all incoming and outgoing traffic for that pod, allowing the service mesh to enforce policies, route traffic, and collect telemetry.
:p What are the benefits of deploying sidecar proxies in Kubernetes?
??x
Sidecar proxies in Kubernetes provide transparent traffic management, enabling policies to be enforced without modifying application code. They offer observability, security, and resilience features like retries, timeouts, and circuit breaking. Since they run in the same pod, they can intercept all communication without requiring application-level changes, making them a powerful tool for managing microservices.
x??

---

