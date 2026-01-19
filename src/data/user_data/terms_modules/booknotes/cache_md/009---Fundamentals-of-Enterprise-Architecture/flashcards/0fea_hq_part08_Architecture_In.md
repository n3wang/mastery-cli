# High-Quality Flashcards: 009---Fundamentals-of-Enterprise-Architecture_processed (Part 8)

**Starting Chapter:** Architecture Information Powers Architecture Decisions

---

#### Architecture Best Practices Definition
Architecture best practices should be tailored to the specific needs and goals of an organization, such as cloud modernization. They must align with strategic objectives like migration and operation in cloud environments rather than on-premises solutions. The value of these practices is realized when they are embedded and accessible to end users.
:p What is the rationale behind customizing architecture best practices for an organization?
??x
Customized best practices ensure that architectural decisions support organizational goals, such as modernization or scalability. When these practices are embedded and accessible, they guide teams effectively, increasing reuse and reducing inefficiencies. For example, in a cloud-first strategy, best practices should focus on migration and cloud-native operations instead of legacy on-premises maintenance.
x??

---

#### Architecture Diagrams and Standards
Architecture diagrams are visual representations of solutions or processes. They help illustrate logical boundaries, workflows, and sequences. To maintain consistency and clarity, enterprise architecture functions should define standards for diagramming including types of diagrams, modeling tools, industry standards (like UML), and legend conventions (colors, shapes, lines).
:p How do enterprise architecture standards ensure clarity in architecture diagrams?
??x
Standards ensure that all diagrams across the organization are consistent and interpretable. This includes using specific tools, applying industry models like UML, and maintaining a common legend for shapes, colors, and lines. This uniformity helps stakeholders quickly understand and act on the diagrams, reducing misinterpretation and outdated information.
x??

---

#### Living Architecture Diagrams
A living architecture diagram is one that is kept up-to-date and dynamically generated from code. This can be achieved by codifying the diagram structure, making it queryable and auto-updatable. Tools like infrastructure-as-code (IaC) or architecture description languages (ADLs) can support this.
:p What are the benefits of codifying architecture diagrams?
??x
Codifying architecture diagrams allows them to be version-controlled, automatically updated, and queried programmatically. This ensures that diagrams reflect real-time changes in the system. For example, using tools like Terraform or AWS CDK, infrastructure can be described in code and rendered into diagrams dynamically. This approach eliminates stale diagrams and supports continuous integration/continuous deployment (CI/CD) pipelines.
x??

---

#### Architecture Metrics
Architecture metrics are quantifiable measurements that inform architectural decisions. They can include cost of ownership, return on investment, adoption of standards, and compliance with requirements. These metrics help evaluate architectural outcomes and guide decisions on technology choices or design patterns.
:p How do architecture metrics influence architectural decisions?
??x
Metrics like total cost of ownership or return on investment provide concrete data to evaluate trade-offs between technologies. For instance, if one technology has a lower $COO$ but higher compliance risk, metrics can help decision-makers weigh these factors. Similarly, metrics on standard adoption can highlight gaps and guide enforcement strategies.
$$
\text{ROI} = \frac{\text{Net Profit}}{\text{Cost of Investment}} \times 100\%
$$
x??

---

#### Architecture Information Types and Decision Making
Architecture information includes principles, guidelines, standards, requirements, patterns, best practices, decisions, and diagrams. These elements support architecture decisions by providing context and data. For example, when deciding on high availability, inputs include recovery time objectives, fault domain definitions, and previous decisions on monitoring and scaling.
:p What role does architecture information play in decision-making?
??x
Architecture information provides the necessary context and data to support informed decisions. For example, when designing a high availability system, inputs such as recovery time objective (RTO), fault domain principles, and prior scaling or monitoring decisions guide the decision-making process. These inputs help align architectural choices with business outcomes.
x??

---

#### Embedding and Accessibility of Architecture Information
For architecture information to be effective, it must be embedded within development and operational workflows and made accessible to relevant stakeholders. This ensures that decisions are informed and that standards are adhered to consistently.
:p Why is embedding and accessibility of architecture information critical?
??x
Embedded and accessible information ensures that architectural decisions are made with real-time, accurate data. For example, if a developer is designing a new feature, they should have access to current architecture diagrams, best practices, and compliance metrics. This reduces misalignment and improves decision quality, leading to better adherence to enterprise standards.
x??

---

#### Example: High Availability Design Decision
When making a high availability design decision, inputs such as business requirements, architectural principles, standards, and previous decisions are used to guide the process. For example, a requirement might be a $RTO$ of 1 hour, and a previous decision might be to use a microservices pattern.
:p How are inputs used to make a high availability design decision?
??x
Inputs like business requirements (e.g., RTO of 1 hour), architectural principles (e.g., fault domain definition), and prior decisions (e.g., microservices pattern) guide the design. For instance, if a previous decision was to use a microservices architecture, the team may choose to implement circuit breakers and load balancers to meet the RTO.
x??

---

#### Example: New Capability Investment Decision
When investing in a new capability, inputs such as principles (e.g., modernization), frameworks (e.g., build vs. buy), and previous decisions (e.g., related capabilities) are used to guide the decision.
:p How do inputs influence a decision to invest in a new capability?
??x
Inputs such as modernization principles, frameworks like domain-driven design, and prior decisions on similar capabilities help determine whether to build or buy. For example, if a prior decision was to adopt a service-oriented architecture, the team might choose a reusable component over a custom build.
x??

---

#### Example: Technology Standard Adoption Decision
When deciding on a new technology standard (e.g., database type), principles (e.g., vendor stickiness), frameworks (e.g., analysis of alternatives), and past decisions (e.g., previous database choices) are considered.
:p How do principles and frameworks guide technology standard decisions?
??x
Principles like vendor stickiness or modernization guide the selection of technologies. Frameworks like analysis of alternatives (AoA) provide structured methods to compare options. For example, if a prior decision was to standardize on PostgreSQL, and the current goal is to reduce vendor lock-in, a framework might recommend evaluating open-source alternatives.
x??

---

#### Architecture Information and Reuse
The more embedded and accessible architecture information is, the more reuse and efficiency can be achieved. This leads to better adherence to standards and more effective decision-making.
:p Why is it important to make architecture information embedded and accessible?
??x
When architecture information is embedded in workflows and accessible to all stakeholders, it reduces ambiguity, improves consistency, and supports reuse. For example, a reusable pattern or a well-documented standard can be applied across multiple projects, reducing development time and increasing quality.
x??

---

#### Impact of Poor Enforcement on Compliance
Even if standards are well-enabled, lack of enforcement leads to opt-in behavior. Some teams may choose to skip standards to speed up delivery, especially when compliance requires extra effort. This can expose the organization to risks like increased MTTR, degraded system reliability, and reduced operational visibility.

:p What happens when architecture standards are enabled but not enforced?
??x
When standards are enabled but not enforced, teams may opt out of compliance to reduce effort or accelerate delivery. This leads to inconsistent adherence, increased risk, and reduced benefits of the standard. For example, in logging, teams might skip logging to reduce build time, leading to poor troubleshooting and operational inefficiencies.
```java
class ComplianceTracker {
    List<String> nonCompliantApps = new ArrayList<>();

    void trackEnforcement(String app, boolean compliant) {
        if (!compliant) {
            nonCompliantApps.add(app);
        }
    }
}
```
x??

---

#### Key Performance Indicators (KPIs) for Enable and Enforce
KPIs such as adoption rate, convergence to standard solutions, effort reduction, satisfaction scores, and automation levels are used to measure success in enabling and enforcing architecture standards. These KPIs help track how well standards are being adopted and whether the balance between enablement and enforcement is effective.

:p What are some key performance indicators for measuring enablement and enforcement of architecture standards?
??x
Key KPIs include:
- 100% adoption of architecture standards in new development
- 20% reduction in effort to adhere to standards
- 20% increase in satisfaction scores
- 20% increase in enablement and enforcement automation
These KPIs help assess whether the organization is effectively balancing enablement and enforcement.
x??

---

#### Leading and Lagging Indicators in Architecture Compliance
Leading indicators, such as preventive controls and automation levels, show proactive efforts toward compliance. Lagging indicators, such as number of violations or overrides, show the outcomes of past efforts. These indicators help assess whether enablement and enforcement are working effectively.

:p How do leading and lagging indicators help assess architecture compliance?
??x
Leading indicators (e.g., number of preventive controls, automation levels) show proactive steps toward compliance. Lagging indicators (e.g., number of violations, overrides) reflect the outcomes of past efforts. A downward trend in violations and overrides indicates effective enablement and enforcement, while increasing trends suggest issues in either process or standard design.
$$
\text{Compliance Health} = \frac{\text{Preventive Controls}}{\text{Violations}}
$$
x??

---

---

#### Automated Controls Over Time
Automated controls are mechanisms that enforce policies or standards without manual intervention. The ideal trend for automated controls is an increase over time, aiming for 100% coverage. Automation is more sustainable and scalable than manual enforcement, making it a key objective in governance and compliance.
:p What is the expected trend for automated controls over time?
??x
The percentage of automated controls should increase over time, ideally approaching 100%, because automation is more sustainable and scalable than manual enforcement. It reduces human error and ensures consistent application of standards.
x??

---

#### Automated Enablement Activities Over Time
Automated enablement activities refer to the processes that support the implementation of standards, such as automated provisioning, configuration, or policy enforcement. Like automated controls, these should increase over time, aiming for full coverage, as automation improves scalability and reduces reliance on manual effort.
:p What is the expected trend for automated enablement activities?
??x
The percentage of automated enablement activities should increase over time, approaching 100% coverage. This ensures that standards are implemented efficiently and consistently, without reliance on manual intervention, thereby improving scalability and reducing operational overhead.
x??

---

#### High-Quality Target Architecture
A high-quality target architecture refers to a well-designed system that meets a set of criteria such as scalability, resilience, reliability, cost optimization, and alignment with business needs. These criteria ensure that the architecture supports long-term success and adaptability.
:p What are the characteristics of a high-quality target architecture?
??x
A high-quality target architecture is scalable, resilient, reliable, cost-optimized, functional, future-proof, aligned, secure, modular, extensible, and compliant. These characteristics ensure that the architecture can adapt to changes, handle failures, and meet business and regulatory requirements.
x??

---

#### Cost to Deliver Application as a Leading Indicator
The cost to deliver an application is a leading indicator of architectural quality. If the cost exceeds expectations, it may suggest inefficiencies in the architecture, such as poor cost optimization or lack of modularity.
:p What does a high cost to deliver indicate about an application's architecture?
??x
A high cost to deliver an application may indicate that it is not cost-optimized. This can lead to reduced profitability and inefficiencies in deployment architecture, potentially due to lack of modularity or unnecessary complexity.
x??

---

#### Number of Approved Architecture Exceptions as a Lagging Indicator
Approved exceptions to architecture standards are a lagging indicator. If there are too many exceptions, it may mean that risk has been accepted in the application, which could affect its compliance and operational posture.
:p What does a high number of approved exceptions suggest?
??x
A high number of approved exceptions suggests that risk has been accepted in the application, potentially compromising its compliance and operational integrity. This may indicate a need for stricter adherence to standards or better architectural design.
x??

---

#### Modular Application Design
A modular application is one that can be independently deployed and reused without negatively affecting other systems. This promotes interoperability and reusability, which are key to scalable and maintainable systems.
:p What is the benefit of a modular application design?
??x
A modular application design allows independent deployment and reuse across ecosystems, promoting interoperability and reducing the risk of adverse impacts on other systems. It enhances scalability and maintainability.
x??

---

#### Extensible Application Design
An extensible application has well-defined interfaces that allow for growth and interoperability. This ensures that the application can evolve with changing business needs and integrate with new systems.
:p Why is extensibility important in application architecture?
??x
Extensibility ensures that an application can grow and integrate with new systems through well-defined interfaces. This allows for adaptability to changing requirements and supports long-term sustainability.
x??

---

#### Reliable Application Design
Reliable application design reduces the risk of critical failures caused by dependencies or deployment architecture. It ensures that the application can withstand failures without losing data or critical transactions.
:p What does it mean for an application to be reliable?
??x
A reliable application mitigates the risk of critical failures, ensuring that it can withstand failures without data loss or disruption of critical transactions. This is essential for maintaining business continuity.
x??

---

#### Resilient Application Design
A resilient application can recover swiftly from failure, typically through automated means. This ensures that the system remains operational even under adverse conditions.
:p What is the role of resilience in application design?
??x
Resilience ensures that an application can recover quickly from failures, usually through automated mechanisms. This minimizes downtime and maintains system availability, enhancing user experience and business continuity.
x??

---

