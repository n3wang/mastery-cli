# High-Quality Flashcards: 009---Fundamentals-of-Enterprise-Architecture_processed (Part 16)

**Starting Chapter:** Release NFRs

---

#### Failure Mode Effects Analysis (FMEA)
FMEA is a systematic approach used to identify potential failures in a system, assess their impact, and prioritize mitigation strategies. It is critical in determining which dependencies are "critical" — meaning if they fail, the application will also fail. The process involves evaluating the probability of failure, the impact of that failure, and calculating a criticality score by multiplying these two values.

The criticality score helps teams understand which components to focus on for resilience planning. For example, a dependency with a high probability of failure and high impact would have a criticality score of 25 (5 × 5), making it a top priority.

:p What is the purpose of conducting an FMEA for application dependencies?
??x
The purpose of conducting an FMEA is to identify and analyze potential failure modes in application dependencies, evaluate their probability and impact, and assign a criticality score to prioritize risk mitigation efforts. This ensures that critical dependencies are protected and monitored, reducing the risk of application-wide outages. By understanding the criticality of each dependency, teams can implement targeted strategies such as redundancy, alerts, or failover mechanisms.
x??

---

#### Critical Dependencies in Application Architecture
Critical dependencies are components or services that, if they fail, will cause the application to fail or become non-operational. Identifying these dependencies is essential for maintaining application stability and resilience. In an FMEA, dependencies are assessed using a 1 to 5 scale for both probability of failure and impact of failure, and their product determines criticality.

Dependencies like databases, authentication services, or external APIs often fall into this category because they are essential for core functionality.

:p How do you determine if a dependency is critical for an application?
??x
A dependency is considered critical if its failure leads to application downtime or severe degradation of service. This is determined using FMEA, where each dependency is scored on a scale of 1 to 5 for both probability of failure and impact. The product of these two scores gives a criticality score. A higher score indicates a more critical dependency that requires stronger resilience mechanisms such as redundancy, monitoring, or circuit breaking.
x??

---

#### Resiliency Testing and Chaos Engineering
Resiliency testing ensures that applications can withstand and recover from failures gracefully. Techniques like chaos engineering involve introducing controlled failures (e.g., killing a service, dropping network packets) to observe how the system behaves under stress. This helps tune monitoring systems, logs, and alerting mechanisms.

:p What is the role of chaos engineering in improving application resiliency?
??x
Chaos engineering is used to proactively test an application’s resilience by injecting failures into the system in a controlled manner. This allows teams to identify weaknesses in the system before they cause real-world outages. It helps validate monitoring, alerting, and recovery mechanisms, ensuring the application can degrade gracefully or recover quickly from unexpected failures.
x??

---

#### Testability NFRs (Non-Functional Requirements)
Testability refers to how easily a system can be tested, especially through automation. This is a key NFR that influences the modularity and composability of an application. Well-designed systems are easier to test, which leads to better quality and fewer bugs.

:p How does testability affect the design of an application?
??x
Testability influences application design by encouraging modularity and composability, which make it easier to isolate components for testing. Techniques like behavior-driven development (BDD) and test-driven development (TDD) promote testability by ensuring that code is written with testing in mind. Automated testing reduces the risk of defects and improves the reliability of software releases.
x??

---

#### Deployment Strategies: All-in-One, Blue/Green, Canary
Deployment strategies define how software updates are rolled out to users. Common strategies include:

- **All-in-One**: Instantly shifts all traffic to the new version.
- **Blue/Green**: Deploys a new version in a separate environment and switches traffic after testing.
- **Canary**: Gradually shifts traffic to the new version over time.

:p What are the differences between all-in-one, blue/green, and canary deployment strategies?
??x
All-in-one deployment shifts all traffic to the new version instantly, minimizing deployment time but increasing risk. Blue/Green deployment uses two environments (blue = current, green = new), switching traffic after validation. Canary deployment gradually shifts traffic to the new version over time, allowing for testing under increasing load and reducing risk. Each strategy balances deployment speed and risk tolerance differently.
x??

---

#### Modular and Composable Application Design
Modular design refers to building applications using loosely coupled, independent components. Composability allows these modules to be combined and reused in different configurations. This design approach improves testability, maintainability, and scalability.

:p How does modular and composable design improve application quality?
??x
Modular and composable design improves application quality by making it easier to test, debug, and maintain individual components. It also supports reusability, reduces coupling, and allows for faster development cycles. These design principles are essential for achieving testability, deployability, and agility, which are key to modern software delivery.
x??

---

#### Deployment Strategy Overview
Deployment strategies like blue/green and canary are essential for testing changes in production without fully committing to them. These strategies require running multiple versions of software simultaneously, which implies that changes must be backward-compatible. Monitoring and alerting systems are critical to detect performance issues early, and rollback or rollforward decisions must be made when problems arise.

:p What are the key considerations for implementing a blue/green or canary deployment strategy?
??x
In blue/green deployments, traffic is switched from the old version (blue) to the new version (green) after testing. The original stack remains available until traffic is fully switched, but it may also be kept longer for rollback purposes. In canary deployments, only a small subset of users is exposed to the new version. Monitoring and alerting systems must be in place to detect performance degradation or errors. If an issue is detected, the strategy should define whether to rollback to the previous version or roll forward if the problem is resolved. This approach supports agile development by enabling frequent, safe releases.
x??

---

#### Quantum of Deployment
The "quantum of deployment" refers to the size and complexity of a change. Smaller, atomic changes are easier to deploy, troubleshoot, and roll back. Large, bundled changes increase overhead and risk. The goal is to maintain agility and ensure high-quality releases by keeping deployments small and manageable.

:p What does the term "quantum of deployment" mean and why is it important for agility?
??x
The quantum of deployment refers to the size and complexity of a change being deployed. Smaller, atomic changes are easier to manage, deploy, and rollback, which supports faster and more reliable releases. Large, complex changes introduce more risk, increase overhead, and make it harder to isolate problems. Agile development emphasizes frequent, small deployments to maintain speed and quality. For example, deploying a single bug fix is a small quantum, whereas deploying a new feature with several integrated components is a large quantum.
x??

---

#### Operational Efficiency NFRs
Operational efficiency Non-Functional Requirements (NFRs) aim to ensure applications are performant, scalable, and cost-efficient. These include performance (latency and throughput), scalability (vertical vs horizontal), elasticity (auto-scaling), flexibility, simplicity, practicality, cost efficiency, feasibility, and usability.

:p What are the key characteristics of operational efficiency NFRs in well-architected applications?
??x
Operational efficiency NFRs focus on optimizing performance, scalability, and cost. Key characteristics include:
- Performance: Measured by latency and throughput. Lower latency and higher throughput improve user experience.
- Scalability: Ability to grow capacity using vertical (scale-up) or horizontal (scale-out) strategies.
- Elasticity: Automatically adjusting resources based on demand.
- Flexibility: Adapting to changes over time.
- Simplicity: Easy to understand and maintain.
- Practicality: Implementation within constraints.
- Cost Efficiency: Minimizing total cost of labor, including infrastructure, operation, and maintenance.
- Feasibility: Ensuring the solution can be implemented within constraints.
- Usability: Easy and delightful for end users.
These qualities ensure that applications remain efficient and effective under varying conditions.
x??

---

#### Performance and Throughput
Performance is defined by how quickly an application responds to a demand, typically measured by latency and throughput. Latency refers to the time taken for a request to be processed, and throughput refers to the number of requests processed per unit time. Lower latency and higher throughput indicate better performance.

:p How is performance measured in software applications?
??x
Performance in software applications is measured using two key metrics: latency and throughput. Latency is the time taken to process a request, and throughput is the number of requests processed per second. For example, a web server with low latency and high throughput delivers a better user experience. These metrics are often monitored using tools like Prometheus or Grafana. A simple Java-based performance test might look like:

```java
long startTime = System.currentTimeMillis();
// Simulate a request
doWork();
long endTime = System.currentTimeMillis();
long latency = endTime - startTime;
System.out.println("Latency: " + latency + " ms");
```
This helps determine how efficiently the system handles requests.
x??

---

#### Scaling Strategies: Vertical vs Horizontal
Scaling strategies include vertical scaling (scale-up) and horizontal scaling (scale-out). Vertical scaling involves adding more resources (CPU, memory) to existing instances, while horizontal scaling involves adding more identical instances to distribute load. Load balancing is essential for horizontal scaling to ensure even distribution of traffic.

:p What are vertical and horizontal scaling, and how do they differ?
??x
Vertical scaling (scale-up) increases capacity by adding more resources to existing compute instances. For example, upgrading a server from 4GB RAM to 8GB RAM. Horizontal scaling (scale-out) increases capacity by adding more identical compute instances. This approach relies on load balancing to distribute traffic across instances. For instance, adding more web servers behind a load balancer. Horizontal scaling is more flexible and scalable for cloud environments, while vertical scaling can hit hardware limits.
$$
\text{Throughput} = \frac{\text{Number of Requests}}{\text{Time}}
$$
Load balancing ensures that each new instance handles an equal share of the workload.
x??

---

#### Elasticity in Cloud Environments
Elasticity is the ability to automatically scale resources up or down based on demand. This feature is crucial for cloud environments and supports cost efficiency and performance optimization. Automation tools like AWS Auto Scaling or Kubernetes can be used to implement elasticity.

:p How does elasticity support operational efficiency in cloud deployments?
??x
Elasticity allows systems to automatically adjust resources in response to demand. For example, during peak hours, more instances are spun up, and during low traffic, instances are scaled down. This ensures optimal resource usage and cost efficiency. In Java or cloud environments, elasticity can be implemented using frameworks like Kubernetes or AWS Auto Scaling. For example:
```java
// Simulated scaling logic
if (requestCount > threshold) {
    scaleUp();
} else if (requestCount < threshold) {
    scaleDown();
}
```
This dynamic behavior reduces waste and ensures consistent performance.
x??

---

#### Simplicity and Practicality in Architecture
Simplicity ensures that applications are easy to understand, maintain, and modify. Practicality means the architecture can be implemented within real-world constraints such as time, budget, and team expertise. These characteristics are important for long-term maintainability and reduce the risk of complexity leading to errors.

:p Why are simplicity and practicality important in system design?
??x
Simplicity ensures that systems are understandable and easy to maintain. Complex systems are harder to debug, extend, and scale. Practicality ensures that designs are feasible within constraints like time, budget, and team capabilities. For example, using a microservices architecture may be ideal in theory, but if the team lacks experience, a monolithic approach might be more practical. A balance between simplicity and practicality leads to systems that are robust, maintainable, and aligned with organizational goals.
x??

---

#### Operational Efficiency NFRs - Resource Utilization
Operational efficiency Non-Functional Requirements (NFRs) focus on how an application performs under real-world conditions, including resource consumption. Choices made regarding CPU, memory, disk I/O, and storage directly impact performance, scalability, and cost. For example, choosing synchronous over asynchronous interactions affects latency tolerance and system responsiveness. Container image dependencies and binary sizes also influence startup time and memory usage. Efficient resource utilization ensures that applications can scale effectively without unnecessary overhead.

:p What are some key decisions related to resource utilization in operational efficiency NFRs?
??x
Key decisions include:
- Choosing between synchronous and asynchronous communication to balance latency and throughput.
- Selecting compute and storage types (e.g., SSD vs HDD) based on access patterns.
- Optimizing container image sizes to reduce deployment time and memory footprint.
- Using efficient data structures and algorithms to minimize CPU and memory usage.
- Monitoring and managing binary size and dependency footprint to avoid bloat.

Example pseudocode:
```pseudocode
IF communication_type == "asynchronous" THEN
    use_message_queue()
ELSE
    use_direct_call()
END IF
```
This decision impacts both latency and system reliability.
x??

---

#### Operational Efficiency NFRs - Capacity Planning
Capacity planning involves balancing cost and availability by deciding whether to pre-allocate resources or use elasticity. Pre-allocation offers assurance of availability but increases costs, whereas elasticity allows scaling based on demand, reducing idle resource costs. Horizontal scaling enables adding more units to distribute load, requiring defined minimum and maximum units and load-balancing strategies.

:p How does capacity planning influence architectural decisions in operational efficiency?
??x
Capacity planning affects architecture through:
- Reserving or pre-allocating resources for peak demand to ensure availability.
- Implementing auto-scaling to dynamically adjust resources using elasticity.
- Designing horizontal scaling capabilities with defined min/max units.
- Applying load-balancing strategies (round-robin, weighted round-robin, etc.) to distribute traffic efficiently.

Example Java code snippet:
```java
public class ScalingStrategy {
    private int minUnits = 2;
    private int maxUnits = 10;
    private LoadBalancer loadBalancer = new RoundRobinLoadBalancer();

    public void scale(int currentLoad) {
        if (currentLoad > threshold) {
            increaseUnits();
        } else if (currentLoad < lowThreshold) {
            decreaseUnits();
        }
    }
}
```
This helps manage system load efficiently while minimizing waste.
x??

---

#### Interoperability NFRs - Extensibility
Extensibility refers to the ability to easily add new capabilities to an application without disrupting existing functionality. It promotes innovation and agility by allowing modular enhancements. A well-designed system should allow extensions through plugins, APIs, or configuration files.

:p How does extensibility support innovation in application design?
??x
Extensibility supports innovation by:
- Enabling developers to add features without modifying core logic.
- Supporting third-party integrations via well-defined interfaces.
- Facilitating rapid prototyping and feature experimentation.

Example pseudocode:
```pseudocode
INTERFACE Plugin {
    void execute();
}

CLASS NewFeaturePlugin IMPLEMENTS Plugin {
    void execute() {
        // Implementation logic
    }
}

// Register plugin dynamically
pluginRegistry.register(new NewFeaturePlugin());
```
This approach allows systems to evolve without breaking existing functionality.
x??

---

#### Interoperability NFRs - Interoperability
Interoperability ensures that systems can exchange data and collaborate effectively. It reduces silos and supports integration across platforms. Standardized contracts (like REST APIs) and message formats enable seamless communication between different applications.

:p Why is interoperability important in enterprise architecture?
??x
Interoperability is critical because:
- It enables integration across siloed systems.
- Supports reuse of components across multiple applications.
- Allows for loosely coupled architectures that are easier to maintain and adapt.

Example:
```java
// REST API contract
@RestController
@RequestMapping("/api/data")
public class DataController {
    @PostMapping
    public ResponseEntity<String> postData(@RequestBody DataRequest request) {
        return ResponseEntity.ok("Data received");
    }
}
```
Using standardized contracts like JSON over HTTP ensures compatibility and ease of integration.
x??

---

#### Interoperability NFRs - Portability
Portability refers to the ability to transfer capabilities from one system to another with minimal effort. It supports migration, reuse, and multi-environment deployment. Containerization and abstraction layers enhance portability.

:p How does portability impact system design?
??x
Portability influences design by:
- Encouraging abstraction of platform-specific logic.
- Supporting containerization and cloud-native deployment.
- Ensuring that components can be moved between environments.

Example:
```dockerfile
# Dockerfile example for portability
FROM openjdk:11-jre-slim
COPY target/app.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
```
This allows the same application to run on any system with Docker support.
x??

---

#### Interoperability NFRs - Reusability
Reusability ensures that components or modules can be used across multiple systems or applications. It reduces development time and promotes consistency. Well-defined interfaces and modular architecture are key enablers of reusability.

:p What architectural elements promote reusability?
??x
Elements promoting reusability include:
- Modular components with well-defined interfaces.
- Shared libraries or microservices.
- Standardized APIs and protocols.
- Configuration-driven designs.

Example:
```java
// Reusable utility class
public class StringUtils {
    public static boolean isEmpty(String str) {
        return str == null || str.isEmpty();
    }
}
```
This utility can be reused across various projects without duplication.
x??

---

#### Interoperability NFRs - Adaptability
Adaptability ensures that systems can evolve over time with minimal rework. It supports future-proofing by using abstraction, modularity, and loosely coupled components. This allows systems to adapt to changing business needs.

:p How does adaptability influence system architecture?
??x
Adaptability influences architecture by:
- Encouraging modular and loosely coupled components.
- Using abstraction layers to isolate changes.
- Supporting feature flags or configuration-driven behavior.

Example:
```java
// Feature flag-based adaptability
public class FeatureToggle {
    private boolean featureEnabled = false;

    public void toggleFeature(boolean enabled) {
        this.featureEnabled = enabled;
    }

    public void execute() {
        if (featureEnabled) {
            // New logic
        } else {
            // Legacy logic
        }
    }
}
```
This allows gradual adoption of new features without full system overhaul.
x??

---

#### Security NFRs - Data Protection
Data protection ensures that sensitive information is safeguarded at rest and in transit. It includes encryption, key management, and data isolation practices. Proper handling of encryption keys and certificates is essential to maintain data integrity and confidentiality.

:p What are key aspects of data protection in security NFRs?
??x
Key aspects include:
- Encrypting data at rest and in transit.
- Managing encryption keys securely using tools like AWS KMS or HashiCorp Vault.
- Isolating data to prevent unauthorized access.
- Using field-level encryption for sensitive fields.

Example:
```java
// Java encryption example
Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
SecretKey key = KeyGenerator.getInstance("AES").generateKey();
cipher.init(Cipher.ENCRYPT_MODE, key);
byte[] encrypted = cipher.doFinal(data);
```
Ensures that even if data is intercepted, it remains unreadable.
x??

---

#### Security NFRs - Access Control
Access control defines who can access what resources and under what conditions. It involves authentication, authorization, and least-privileged access principles. Identity boundaries and network segmentation are crucial for preventing unauthorized access.

:p How does access control affect application design?
??x
Access control affects design by:
- Implementing authentication mechanisms (OAuth, JWT).
- Enforcing role-based access control (RBAC).
- Applying least-privileged access to limit user permissions.
- Defining clear identity and network boundaries.

Example:
```java
// RBAC example
@PreAuthorize("hasRole('ADMIN')")
public void deleteResource() {
    // Only admins can delete
}
```
This ensures that only authorized users can perform sensitive operations.
x??

---

#### Security NFRs - Audit and Compliance
Audit logging captures security-relevant events and actions for compliance and forensic analysis. Logs must be secure, persistent, and actionable. Audit trails support incident response, regulatory compliance, and system accountability.

:p Why is audit logging important in security NFRs?
??x
Audit logging is important because:
- Provides evidence of system behavior for compliance.
- Enables forensic analysis after security incidents.
- Helps detect anomalies and unauthorized access attempts.
- Supports accountability and transparency.

Example:
```java
// Audit logging example
public class SecurityLogger {
    public void logAction(String user, String action) {
        System.out.println("User: " + user + " performed: " + action);
        // Store in secure log file or database
    }
}
```
Logs should be immutable and accessible only to authorized personnel.
x??

---

