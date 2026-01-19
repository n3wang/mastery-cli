# High-Quality Flashcards: 009---Fundamentals-of-Enterprise-Architecture_processed (Part 17)

**Starting Chapter:** When Should a Standard Be Declared

---

#### Architecture Technology Standards
Architecture Technology Standards, sometimes referred to as a Technology Reference Model (TRM), define approved technology services, products, or software for an organization. These standards help streamline technology choices by guiding decisions around tools, platforms, and languages. For example, an organization might standardize on Java or Rust for software development, and the enterprise architecture strategy function should define principles to guide such choices. A champion/challenger model is often recommended to prevent standards from becoming outdated and to allow for innovation and evolution.

:p What is the purpose of a champion/challenger model in architecture technology standards?
??x
The champion/challenger model ensures that an approved standard remains relevant and effective by allowing new technologies or approaches (challengers) to be evaluated for potential replacement. The current standard acts as the "champion," while challengers are assessed based on predefined criteria. This prevents stagnation and promotes continuous improvement in technology adoption.
x??

---

#### Architecture Metamodel Standard
An architecture metamodel defines common terms, structures, and relationships among components in an enterprise’s technology landscape. It provides a shared understanding of concepts like application, platform, service, and capability, ensuring consistency across teams. It also defines attributes and metadata for each element, which are critical for governance, ownership tracking, and operational efficiency.

:p What role does the architecture metamodel play in enterprise governance?
??x
The architecture metamodel serves as a foundational framework that defines common terminology, structure, and relationships between components in an organization's technology landscape. It supports governance by providing clear definitions of attributes like ownership, lifecycle, and data quality rules, which are essential for managing compliance, accountability, and operational efficiency.
x??

---

#### NFRs in Enterprise Architecture
Non-functional Requirements (NFRs) are a key part of enterprise architecture standards and serve as constraints and requirements that guide application design. They ensure that applications meet quality attributes such as performance, security, scalability, and maintainability. NFRs act as the foundation for architectural decisions and help align technology with business goals.

:p What is the role of NFRs in application design?
??x
NFRs (Non-Functional Requirements) provide constraints and guidelines that shape how applications are designed. They define qualities such as performance, security, scalability, and maintainability, ensuring that the system meets business needs beyond just functional behavior. These requirements are crucial for guiding architectural decisions and ensuring systems are robust, secure, and scalable.
x??

---

#### Enablement Framework Overview
The enablement framework is a structured approach to assess current enablement practices and identify areas for improvement. It includes three main steps: specify, size, and simplify. The goal is to make adherence to standards effortless and frictionless for developers.

:p What are the steps in the enablement framework?
??x
The enablement framework consists of three steps:
1. **Specify**: Identify all necessary activities to comply with standards and determine when and how often they occur.
2. **Size**: Estimate the effort and time required for each activity, identifying bottlenecks.
3. **Simplify**: Improve processes and tools to eliminate friction and make compliance easy and efficient.
x??

---

#### Automated Standards Adherence
When standards are automated, developers or engineers are relieved of the cognitive load required to manually follow guidelines. Tools or processes guide them through compliance, reducing errors and effort. In the context of high availability (HA) NFRs, automation can enforce architectural decisions and best practices.

:p What does automated standards adherence mean in the context of software architecture?
??x
Automated standards adherence means that systems or tools are configured to enforce compliance with architectural standards without requiring manual intervention or deep understanding from developers. For example, in HA systems, this could involve pre-configured infrastructure templates or CI/CD pipelines that automatically validate deployment readiness based on HA criteria.

Example:
```java
// A CI/CD pipeline that enforces HA by checking for load balancer configuration
if (!pipeline.hasLoadBalancer()) {
    throw new DeploymentException("HA compliance failed: No load balancer detected");
}
```
x??

---

#### Designing High Availability Architecture
Designing a high availability architecture is a one-time, high-effort activity typically performed by application architects. It involves critical decisions around load balancing, scaling, traffic routing, and data consistency trade-offs. The complexity arises from balancing availability, consistency, and performance (often known as the CAP theorem).

:p Why is designing a high availability architecture considered a significant one-time activity?
??x
Designing a high availability architecture requires deep understanding of system components, scalability strategies, and trade-offs among availability, consistency, and performance. It's a one-time effort because changes to the architecture are infrequent and costly. For example, decisions like using master-slave replication or eventual consistency models are made once and affect the entire system.

$$
\text{Availability} = \frac{\text{Uptime}}{\text{Uptime} + \text{Downtime}}
$$

Example:
```java
public class HAConfig {
    private boolean useLoadBalancer;
    private boolean enableAutoScaling;
    private ConsistencyModel consistencyModel;

    // Constructor and methods...
}
```
x??

---

#### Reference Architectures and Templates
To simplify the process of building high availability systems, reference architectures and templates—either documented or as infrastructure-as-code (IaC)—can be used. These provide pre-defined blueprints that reduce design time and lower the risk of errors.

:p How can reference architectures help in implementing high availability?
??x
Reference architectures provide pre-defined blueprints or templates that simplify the implementation of HA systems. These can be in the form of documentation, IaC templates (like Terraform or CloudFormation), or even working reference implementations. For example, a reference architecture for microservices might include load balancers, auto-scaling groups, and multi-zone deployments to ensure redundancy.

Example:
```yaml
# Terraform template for HA deployment
resource "aws_lb" "main" {
  name               = "main-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.lb.id]
  subnets            = [aws_subnet.public.*.id]
}
```
x??

---

