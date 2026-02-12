# High-Quality Flashcards: 024---Mastering-API-Architecture_processed (Part 13)

**Starting Chapter:** How Does a Service Mesh Integrate with Other Networking Technologies

---

#### Example: Session Service Extraction and Service Mesh
In a case study involving a legacy conference system and an Attendee service, a Session service is extracted and called from both systems. A service mesh facilitates this by enabling secure, observable communication between services, applying policies like rate limiting or authentication, and supporting distributed tracing.

:p How does a service mesh support the extraction and reuse of a Session service in a legacy system?
??x
A service mesh enables the extraction of a Session service by providing secure communication, policy enforcement, and observability across services. It allows both the legacy conference system and the Attendee service to call the Session service with consistent authentication, rate limiting, and tracing. This ensures that the new service can be reused without modifying application code.
x??

---

#### Dynamic Service Routing
In dynamic environments like cloud infrastructures, IP addresses of services change frequently due to ephemeral computing resources. Traditional hardcoding of IP addresses leads to frequent redeployments and maintenance overhead. Service meshes solve this by providing dynamic service discovery and transparent routing without requiring code changes or restarts. They normalize service names across environments using configuration-driven mappings.

:p How does a service mesh handle dynamic service locations?
??x
By implementing external service discovery directories or registries, a service mesh dynamically maps service names to their current locations (IPs and ports). It supports environment-aware naming where a service like `sessions-service` maps to `AWS-us-east-1a/prod/sessions/v2` in production and `internal-staging-server-a/stage/sessions/v3` in staging without modifying application code.
x??

---

#### Reliability Patterns in Microservices
Microservices must handle distributed computing challenges like connection interruptions, temporary unavailability, and slow responses. Common reliability patterns include retries, timeouts, circuit breakers, bulkheads, and fallbacks. Implementing these patterns consistently across services is difficult without a centralized mechanism. A service mesh centralizes these patterns to ensure uniform behavior and graceful degradation.

:p Why is implementing reliability patterns challenging in microservices?
??x
Because each service must independently implement patterns like circuit breakers and retries, leading to inconsistent behavior across languages and platforms. A service mesh centralizes these patterns, ensuring consistent fault tolerance and graceful degradation across all services.
x??

---

#### Cross-Language Communication Support
Modern microservice architectures often involve services written in different programming languages. Implementing reliability and security features consistently across these languages is challenging. A service mesh abstracts these concerns, offering uniform behavior regardless of the underlying language or platform.

:p Why is cross-language communication support important in a service mesh?
??x
Because different languages have varying implementations of reliability and security patterns. A service mesh ensures consistent behavior by handling these concerns at the infrastructure level, abstracting away language-specific differences and providing uniform features like retries, timeouts, and authentication.
x??

---

#### Comparison with API Gateways
While API gateways manage external traffic and expose APIs to clients, service meshes focus on internal service-to-service communication. API gateways are typically deployed at the edge, whereas service meshes operate within the cluster. Service meshes offer better control over internal traffic, reliability, and cross-cutting concerns.

:p What is the difference between an API gateway and a service mesh?
??x
An API gateway manages external traffic and exposes APIs to clients, typically deployed at the edge. A service mesh focuses on internal service-to-service communication, offering fine-grained control over routing, reliability, security, and observability within the cluster.
x??

---

#### The 8 Fallacies of Distributed Computing
The 8 Fallacies of Distributed Computing highlight common assumptions in distributed systems that often lead to failures. These include assumptions like "the network is reliable," "latency is zero," and "bandwidth is infinite." Service meshes help mitigate these issues by providing built-in reliability and fault tolerance.

:p What are the 8 Fallacies of Distributed Computing and how does a service mesh address them?
??x
The 8 Fallacies include assumptions like network reliability, zero latency, infinite bandwidth, and more. A service mesh addresses these by implementing retries, timeouts, circuit breakers, and fallbacks to ensure robustness in distributed systems.
x??

---

#### Cross-Language Communication Support
When moving from in-process to out-of-process communication, handling routing, reliability, observability, and security becomes more complex. Implementing these features in each language-specific library increases maintenance overhead. A service mesh solves this using the sidecar pattern, where a single proxy handles all communication for a service regardless of language.

:p Why is the sidecar pattern beneficial in a polyglot microservice environment?
??x
In a polyglot system, implementing cross-functional features like routing, reliability, and observability in each service's language-specific library leads to duplication and increased maintenance burden. The sidecar pattern allows a single proxy to manage these concerns for all services, regardless of the programming language used. This reduces code duplication and ensures consistent behavior across services.
```java
// Sidecar proxy configuration example
sidecar {
    listen_port: 15001
    outbound_traffic_policy: {
        mode: "REGISTRY_ONLY"
    }
    cluster {
        name: "backend-service"
        connect_timeout: "30s"
        type: "strict_dns"
    }
}
```
x??

---

#### North-South vs East-West Traffic
North-south (n/s) traffic refers to ingress from external sources like users or third parties into a system, whereas east-west (e/w) traffic is internal service-to-service communication within a trust boundary. The distinction is important because n/s and e/w traffic have different security, authentication, and routing requirements. For example, n/s traffic often requires user-level authentication, while e/w traffic may rely on service identity or mutual TLS. These differences influence which tools are used—API gateways for n/s and service meshes for e/w.

:p What are the key differences between north-south and east-west traffic in microservices architecture?
??x
North-south traffic originates externally (e.g., from users or third-party APIs) and typically involves user authentication, public-facing APIs, and one-way TLS. East-west traffic is internal between services within the same trust domain, often using mutual TLS, service identity-based authorization, and service mesh technologies. The control planes for API gateways and service meshes must support these distinct requirements.
x??

---

#### API Gateway vs Service Mesh
API gateways manage north-south traffic (external clients to services), providing features like authentication, rate limiting, and protocol translation. Service meshes manage east-west traffic (service-to-service), offering features like traffic splitting, resilience (circuit breaking), and secure communication via mutual TLS. Each tool has distinct ownership and configuration models.

:p What is the main difference between an API gateway and a service mesh in managing traffic?
??x
API gateways are used for managing north-south traffic (external clients to services), handling tasks like authentication, rate limiting, and request routing. Service meshes manage east-west traffic (internal service communication), focusing on resilience, secure service-to-service communication, and traffic management within the cluster. Their control planes and data planes are optimized for these distinct use cases.
x??

---

#### Authentication in Ingress vs Service-to-Service Traffic
Authentication in ingress traffic is typically user-focused, involving real-world identities like OAuth or JWT tokens. In contrast, service-to-service traffic often uses machine-based authentication, such as service identities or mutual TLS, where services authenticate each other rather than users.

:p How does authentication differ between ingress and service-to-service traffic?
??x
Ingress traffic (north-south) is usually authenticated using user-level identities, such as OAuth tokens or JWTs. Service-to-service traffic (east-west) uses machine identities, often enforced through mutual TLS or service accounts. The former focuses on “who” is making the request, while the latter focuses on “which service” is making it.
x??

---

#### Example: Session Service Authorization
In a case study, the Session service team may define strict authorization rules—e.g., only allowing calls from the legacy conference app and Attendee service. In contrast, the Attendee service team typically does not define who can call the public API; this responsibility lies with the gateway or networking team.

:p How does authorization differ between internal service calls and public API access?
??x
Internal service authorization (e/w) is often strict and defined by service teams, e.g., the Session service only allows calls from specific services. Public API access (n/s) is typically governed by the gateway or networking team, who enforce policies like rate limits or authentication for external clients. The distinction helps separate concerns and improve security.
x??

---

#### Microservice Prerequisites and Standardized RPC
Phil Calçado, building upon Martin Fowler’s microservice prerequisites, emphasized the importance of "standardized RPC" as a key prerequisite for microservices. This concept recognizes that in distributed systems, engineers must explicitly address the fallacies of distributed computing. Standardized RPC helps ensure consistent communication between services and is foundational to robust microservice architectures.

:p Why is standardized RPC considered a key prerequisite for microservices?
??x
Standardized RPC (Remote Procedure Call) is considered a key prerequisite for microservices because it ensures consistent and reliable communication between services in a distributed system. It helps address several fallacies of distributed computing, such as latency, reliability, and bandwidth limitations.

In a microservices architecture, services need to communicate reliably and efficiently. Standardized RPC provides a common interface for this communication, reducing complexity and increasing interoperability. It allows engineers to abstract away the complexities of network communication and focus on business logic.

For example, in a Java-based microservice:
```java
public interface OrderService {
    Order createOrder(OrderRequest request);
}
```
This interface defines a standardized way for services to communicate, which is essential for scalable and maintainable systems.
x??

---

#### Importance of Addressing Fallacies in Modern Systems
Understanding the fallacies of distributed computing is critical when designing modern systems, especially in the context of microservices. These fallacies, though originally identified in the 1990s, remain relevant due to the persistent nature of distributed system challenges.

:p Why is it important to address the fallacies of distributed computing in modern system design?
??x
Addressing the fallacies of distributed computing is critical in modern system design because these fallacies represent fundamental truths about how networks behave in practice. Even though technologies have evolved, the core challenges remain:

1. **Network Reliability**: Networks are inherently unreliable; services must handle failures gracefully.
2. **Latency**: Network latency is not zero and must be accounted for in system design.
3. **Bandwidth**: Bandwidth is finite, and communication must be efficient.
4. **Security**: Networks are not secure; encryption and authentication are necessary.
5. **Topology Changes**: Network topologies change frequently; systems must be resilient.
6. **Admin Overhead**: There may not be a single administrator; distributed systems must be self-managing.
7. **Cost**: Transport costs are not zero; bandwidth usage has economic implications.
8. **Homogeneity**: Networks are heterogeneous; systems must support diverse environments.

These fallacies guide engineers to build resilient systems that explicitly handle these challenges rather than assuming they don’t exist. For example, in a microservices architecture, retry logic, circuit breakers, and timeouts are essential mechanisms to deal with network unreliability and latency.
x??

---

#### Sidecar Model vs. Library-Based Service Mesh
The sidecar model is a deployment pattern where a dedicated proxy (sidecar) is deployed alongside each service instance to handle cross-cutting concerns like traffic management, observability, and security. This contrasts with earlier approaches that used libraries or frameworks embedded directly within services. The sidecar model allows for language-agnostic implementation, reduces code duplication, and simplifies the service code itself by delegating infrastructure concerns to the proxy.

:p What is the main difference between the sidecar model and library-based approaches for service mesh implementation?
??x
In the sidecar model, a proxy is deployed as a sidecar container alongside each service, handling traffic and infrastructure concerns without requiring changes to the service code. In contrast, library-based approaches embed networking logic directly into the application code using SDKs or frameworks, which can lead to language-specific implementations and code duplication. The sidecar model is more flexible and scalable, especially in polyglot environments, since it abstracts away the underlying runtime and language specifics.
x??

---

#### Sidecar Pattern in Microservices
The sidecar pattern involves running a separate proxy process alongside each service in a microservices architecture. This proxy handles networking concerns like service discovery, load balancing, and circuit breaking, allowing the main application to focus on business logic. It's particularly useful in polyglot environments where services are written in different languages.

:p What is the primary purpose of a sidecar proxy in microservices?
??x
A sidecar proxy acts as an intermediary that handles all networking concerns for a service, such as service discovery, load balancing, and circuit breaking, while the main application focuses on business logic. This pattern allows services to communicate through the sidecar, which provides consistent networking abstractions across different runtimes.
```java
// Pseudocode representing how a service communicates via sidecar
Service A -> Sidecar Proxy -> Service B
```
x??

---

