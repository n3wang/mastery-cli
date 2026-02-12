# High-Quality Flashcards: 009---Fundamentals-of-Enterprise-Architecture_processed (Part 15)

**Starting Chapter:** Summary

---

#### Enterprise Architecture Standard Communication
When defining enterprise architecture standards, it's critical to consider how the standard will be communicated and adopted across the organization. In the case of EA Example Company, a new software language standard was introduced, but communication was limited to one-time announcements via newsletters and website posts. This approach failed to ensure that all relevant stakeholders—especially new hires or those not actively monitoring communications—were aware of the standard.

:p What was the core problem with how the new enterprise architecture standard was communicated?
??x
The core issue was reliance on a one-time push campaign, which is not sustainable for long-term adoption. It failed to account for user turnover, lack of proactive awareness, and absence of integration into development workflows. The standard was not embedded into onboarding, development processes, or enforcement mechanisms. As a result, engineers like Sasha, Tony, and Gina either discovered the standard by chance or ignored it due to lack of integration into their work practices.
x??

---

#### Integration of Standards into Development Processes
For a standard to be effective, it must be integrated into the tools and processes engineers use daily. In the EA Example Company case, the standard was published but not enforced within development tools or CI/CD pipelines. This led to continued use of non-approved software languages despite the existence of a formal policy.

:p How can standards be effectively embedded into software development processes?
??x
Standards should be embedded into development workflows through automation and process integration. For example, build tools or linters can be configured to enforce the use of approved software languages. A pseudocode example would be:
```pseudocode
IF current_language NOT IN approved_languages THEN
    DISPLAY_ERROR("Use an approved language")
    STOP_BUILD
END IF
```
This ensures that even if a developer unintentionally uses a non-approved language, the system flags it early in the process, enforcing compliance without relying solely on human awareness.
x??

---

#### Enforcement Mechanisms in Software Development
Enforcement mechanisms are crucial for ensuring that standards are followed. In the EA Example Company case, there was no enforcement mechanism in place to check that engineers used approved software languages. As a result, engineers continued to use non-approved languages despite the policy.

:p What role do enforcement mechanisms play in standard compliance?
??x
Enforcement mechanisms ensure that standards are not just guidelines but are actively enforced in practice. These can include automated checks in development environments, code review policies, or CI/CD pipeline integrations. For example, a CI/CD pipeline could be configured to fail builds if a non-approved language is detected:
$$
\text{Build Status} = 
\begin{cases}
\text{Failed}, & \text{if language not in approved list} \\
\text{Passed}, & \text{otherwise}
\end{cases}
$$
This makes adherence to standards mandatory rather than optional.
x??

---

#### Best Practices EA Example
This scenario illustrates a common failure in enterprise architecture (EA) when trying to promote reuse of architectural patterns. Even though the EA team documented best practices and published them in a knowledge base, engineers did not adopt them. The root issue lies in the lack of usability, discoverability, and integration into daily workflows. This is a failure of knowledge management and user experience design principles that are critical for effective reuse.

:p Why did the engineers not use the published best practices despite their availability?
??x
The best practices were not effectively reused because the knowledge base was not designed with usability or user experience in mind. Engineers preferred internet searches and peer-to-peer communication because the published documents were not consumable or accessible enough to be part of their regular problem-solving process. Effective reuse requires that patterns be embedded in tools and processes that engineers already use, not just stored in a portal. Additionally, without incentives or integration into performance management, there's little motivation to adopt these resources.
x??

---

#### Static Artifact EA Example
This scenario demonstrates how architectural artifacts can become outdated and ineffective when they are not maintained or integrated into the development lifecycle. The artifact was created to satisfy a compliance requirement, but once the application was approved, it was never updated. This leads to a static artifact that becomes a liability rather than an asset, especially when teams need to understand the system architecture during incidents or onboarding.

:p What is the problem with static architectural artifacts that are not updated over time?
??x
Static architectural artifacts, like diagrams or documentation, become obsolete quickly if not maintained. They are often created only to meet compliance or approval requirements, not to serve as living documents. As systems evolve, outdated artifacts mislead developers, increase onboarding time, and reduce the ability to troubleshoot effectively. Without integration into the development process or a clear ownership model for updates, such artifacts lose value and may even cause confusion.
x??

---

#### Architecture Pattern Reuse
Architecture patterns are reusable solutions to common design problems. They should be tailored to the organization’s needs, documented clearly, and integrated into development tools and processes to encourage adoption. When patterns are isolated in a knowledge base without embedding them into engineering workflows, they are unlikely to be reused effectively.

:p How can architecture patterns be made more effective for reuse?
??x
To make architecture patterns more effective for reuse, they must be embedded into engineering processes and tools, such as IDEs, CI/CD pipelines, or architectural decision records (ADRs). They should also be incentivized through gamification or performance reviews. Furthermore, they must be relevant to the engineers’ daily tasks and not just abstract concepts. Clear, concise documentation with examples, and integration into existing workflows, helps ensure engineers see the value and use them.
x??

---

#### Embedding Patterns in Engineering Tools
Effective reuse of architecture patterns requires embedding them into the tools engineers use daily. For example, IDE plugins, architecture decision logs, or design templates can make patterns part of the engineering workflow. This ensures that engineers are exposed to best practices without having to actively seek them out.

:p How can architecture patterns be embedded into engineering workflows?
??x
Patterns can be embedded in engineering tools by integrating them into IDEs, design templates, or architectural decision frameworks. For example, an IDE plugin could suggest patterns when code is being written, or a design template could include standard architectural components. This makes the reuse of patterns seamless and automatic, reducing the friction that prevents engineers from using them.
x??

---

#### Architecture Decision Records (ADRs)
Architecture Decision Records (ADRs) are documents that capture important architectural decisions made during a project, including the context, decision, and consequences. ADRs help ensure that architectural choices are well-documented and can be revisited if needed.

:p What is the role of ADRs in maintaining architectural integrity?
??x
ADR records help maintain architectural integrity by documenting decisions and their rationale. This ensures that future developers understand why certain choices were made and can evaluate if those decisions still apply. When patterns or artifacts are embedded in ADRs, they are more likely to be reused and maintained over time. ADRs also support knowledge transfer and prevent tribal knowledge from being lost.
x??

---

#### Avoiding Duplication of Existing Knowledge
A key principle in EA is to avoid duplicating information that already exists elsewhere, such as in public documentation or internal wikis. Duplication leads to inconsistencies and makes it harder for engineers to find the right information.

:p Why is it important to avoid duplicating information in EA knowledge repositories?
??x
Duplicating information leads to inconsistencies and confusion. If the same information exists in multiple places, engineers may not know which source is authoritative. It also increases maintenance overhead and reduces trust in the knowledge base. Instead, EA should focus on curating and linking to existing high-quality sources while adding value through organization, context, or integration into engineering workflows.
x??

---

#### Relevance of Patterns in Engineering Contexts
Patterns must be relevant to engineers' actual tasks. If engineers don’t see the direct value of a pattern in solving a problem, they will not use it. Patterns must be contextualized and aligned with the tools and processes engineers use.

:p How can architectural patterns be made relevant to engineers' daily work?
??x
Patterns should be contextualized by showing how they apply to real engineering tasks, such as logging, caching, or security. They should be included in design templates, code examples, or integrated into tools. For example, a logging pattern should be shown with a code snippet that engineers can directly use. When patterns are relevant and practical, they become part of the engineer’s toolkit rather than just documentation.
x??

---

#### Architecture Artifact Maintenance and Documentation
Architecture artifacts are critical for system launches but often become outdated due to lack of maintenance processes. When artifacts are not updated regularly, especially in manual environments, they lose relevance and can mislead stakeholders. Without standardized templates or guidance, consistency across applications suffers, leading to fragmented and inconsistent architecture documentation.

:p What is the core issue with architecture artifact maintenance in enterprise systems?
??x
The main issue is that although artifacts are documented as required for initial system launch, they are not kept up to date due to the absence of refresh requirements and the high manual effort needed to maintain them. This leads to outdated documentation that no longer reflects system reality.
x??

---

#### Use of Modeling Standards for Architecture Diagrams
To maintain consistency and clarity in architecture diagrams, standards such as ArchiMate, C4 model, and UML are recommended. These models provide predefined structures and notations that help in creating uniform, understandable diagrams across different teams and projects. Using such standards ensures that diagrams are not only consistent but also easily interpretable by various stakeholders.

:p Why are modeling standards like ArchiMate and UML important in architecture documentation?
??x
Modeling standards like ArchiMate and UML provide consistent frameworks for diagramming, making it easier for stakeholders to interpret and use the architecture information. They reduce ambiguity, ensure uniformity, and support better collaboration across teams.
x??

---

#### Living vs Static Architecture Diagrams
Architecture diagrams should not be static one-time documents but should evolve with the system. This means they must be updated frequently as part of change management, and ideally, automated triggers can prompt updates. Queryable diagrams allow for comparing actual system behavior with intended architecture, helping identify implementation gaps and compliance issues.

:p How should architecture diagrams be treated to ensure their relevance and utility?
??x
Architecture diagrams should be treated as "living documents" that are updated regularly, ideally through automated triggers. They should also be queryable so that their content can be compared with real system behavior to detect discrepancies and enforce compliance.
x??

---

#### Architecture Decision Points and Inputs
In architecture decision-making, it is essential to define when decisions are made, what tools and processes are involved, who is responsible, and what information is needed as input. This ensures that all relevant architecture data is available at the right time to support informed decision-making.

:p How should architecture decision points be defined to support effective decision-making?
??x
Architecture decision points should be defined by specifying when decisions are made, the process and tools used, the decision-makers involved, and the architecture information required as inputs. This ensures decisions are well-informed and consistent.
x??

---

#### Embedding Architecture Information in Real-Time
To make architecture information truly useful, it must be embedded and accessible just-in-time at the decision points. This requires understanding how and where information is consumed and ensuring that it is delivered in a format and time that supports decision-making effectively.

:p What is the key to embedding architecture information effectively in decision-making processes?
??x
The key is to understand how and where architecture information is consumed and then deliver it just-in-time in a format that supports decision-making. This requires embedding the information in the right tools and processes at the right time.
x??

---

#### Continuous Improvement in Architecture Practices
Architecture practices should be continuously improved based on feedback and effectiveness measurements. This includes setting up feedback loops, tracking usage of architecture artifacts, and using data to refine and enhance the architecture information delivery process.

:p How can continuous improvement be implemented in architecture practices?
??x
Continuous improvement in architecture practices involves setting up feedback loops, measuring the effectiveness of architecture information delivery, and using this data to refine approaches and enhance usability and relevance.
x??

---

#### Operational Efficiency Through Standards
Standards contribute to operational efficiency by optimizing processes, reducing costs, increasing productivity, and aligning decisions with business needs. They simplify complex technology landscapes by minimizing redundant solutions.
:p How do standards improve operational efficiency?
??x
Standards streamline operations by eliminating redundant or inconsistent practices. For example, standardizing plug types allows for universal device compatibility, reducing the need for custom power solutions. Similarly, using common terminologies (like traffic signals) reduces cognitive load and improves decision-making speed. In enterprise architecture, this leads to better resource allocation and improved agility.
x??

---

#### Innovation and Interoperability
Innovation is supported when systems are designed to work together through shared standards. This allows for new technologies to be integrated without disrupting existing infrastructure, enabling scalability and resilience.
:p How do enterprise architecture standards promote innovation?
??x
Standards facilitate innovation by ensuring interoperability between systems. When components follow common formats and protocols, new technologies can be easily integrated into existing environments. This supports agility, scalability, and resilience. For example, standardized data formats allow different platforms to exchange information seamlessly, encouraging creative solutions while maintaining compatibility.
x??

---

#### Best Practices vs. Rules
Best practices are recommended methods or approaches that lead to effective outcomes, but they are not legally binding like rules. Violating best practices may not have immediate consequences but can lead to long-term problems.
:p What distinguishes best practices from rules in enterprise architecture?
??x
Rules are mandatory standards with clear consequences for non-compliance, such as legal regulations or building codes. Best practices, on the other hand, are proven methods that improve outcomes but do not carry immediate penalties. For example, brushing teeth twice daily is a best practice; missing it doesn’t result in a fine, but it can affect oral health over time. In architecture, following best practices ensures quality and efficiency without strict enforcement mechanisms.
x??

---

#### Enterprise Architecture Standard
An enterprise architecture standard is a codified set of requirements that define how technology solutions should be designed, developed, and managed to align with business objectives. These standards are typically documented in governance documents and guide decision-making across the enterprise.

:p What is the purpose of an enterprise architecture standard?
??x
Enterprise architecture standards provide a structured approach to technology development by ensuring consistency, alignment with business goals, and adherence to best practices. They support decision-making for acquiring, creating, deploying, and managing technology solutions.
x??

---

#### Governance Document Ontology
Governance documents form a hierarchy that supports enterprise architecture standards. These include policy documents (defining the 'why'), procedure documents (detailing the 'how'), and pattern documents (showcasing best practices).

:p How do governance documents support enterprise architecture standards?
??x
Governance documents provide a structured framework for implementing standards. Policy documents define business objectives and risks, procedure documents outline operational steps, and pattern documents illustrate proven approaches to solving architectural challenges.
x??

---

#### Nonfunctional Requirements (NFRs)
Nonfunctional requirements define qualities or constraints that a system must satisfy, such as stability, availability, and reliability. These requirements ensure that a system not only performs its intended functions but also behaves reliably under various conditions.

:p Why are nonfunctional requirements important in enterprise architecture?
??x
NFRs ensure that systems are resilient, available, and reliable. They define how a system should behave under stress or failure conditions, which is crucial for maintaining business continuity and user satisfaction.
x??

---

#### Resiliency
Resiliency refers to the ability of a system to tolerate failures without significant impact. It involves designing systems that can detect and recover from failures quickly, often measured using Mean Time To Repair (MTTR).

:p How is resiliency measured and why is it important?
??x
Resiliency is typically measured using MTTR (Mean Time To Repair), which indicates how quickly a system can recover from a failure. Lower MTTR means better resilience, enabling systems to maintain performance even during disruptions.
$$
MTTR = \frac{\text{Total downtime}}{\text{Number of failures}}
$$
x??

---

#### Recoverability
Recoverability is the ability to restore system capabilities after a failure occurs. It is often quantified using Recovery Time Objective (RTO) and Recovery Point Objective (RPO).

:p What are RTO and RPO, and how do they relate to recoverability?
??x
RTO defines the maximum acceptable time to restore services after a failure, while RPO specifies the maximum acceptable amount of data loss. Together, they define the system’s ability to recover effectively.
$$
RTO = \text{Time to restore services}
$$
$$
RPO = \text{Maximum data loss allowed}
$$
x??

---

#### Availability
Availability measures the proportion of time a system remains operational and accessible. It is often expressed as a percentage and defined in SLAs or SLOs.

:p How is availability calculated and what does it signify?
??x
Availability is calculated as:
$$
\text{Availability} = \frac{\text{Uptime}}{\text{Total Time}} \times 100\%
$$
It signifies how often the system is functioning and accessible to users.
x??

---

#### Reliability
Reliability refers to the consistency of a system's performance over time. A system can be resilient but unreliable if it fails frequently despite quick recovery.

:p What distinguishes reliability from resiliency?
??x
While resiliency focuses on how quickly a system can recover from failures, reliability focuses on how consistently the system performs without failures. A system may have low MTTR but still be unreliable if it fails often.
x??

---

#### Durability
Durability ensures that data is protected from loss or corruption. It includes strategies like backups, replication, and data integrity checks to safeguard information.

:p Why is durability critical in enterprise architecture?
??x
Durability ensures that data remains intact and recoverable even in the event of hardware or software failures. It includes practices such as regular backups, replication across zones, and point-in-time restores.
x??

---

#### Observability
Observability enables transparency into a system's behavior, supporting troubleshooting and root cause analysis. It involves logging, monitoring, and alerting mechanisms.

:p How does observability contribute to system resilience?
??x
Observability helps reduce Mean Time To Detect (MTTD) by providing real-time insights into system behavior. This allows faster identification and resolution of issues, reducing overall MTTR and improving resilience.
$$
MTTD = \text{Average time to identify root cause}
$$
x??

---

#### Routing Decisions in Redundancy
When designing resilient systems, routing decisions must consider traffic policies, load balancing, scaling groups, and fault domains to ensure redundancy and failover capabilities.

:p What routing decisions are important for resilient architecture?
??x
Key routing decisions include:
- Traffic routing policies (geographically pinned, latency-based)
- Load balancing strategies
- Scaling policies
- Fault domain design (e.g., multi-zone or multi-region redundancy)
These decisions impact failover capability and cost efficiency.
```java
// Example: Load balancing logic
if (serverStatus == "down") {
    routeToBackupServer();
}
```
x??

---

#### Compute to Data Interaction
Designing interactions between compute and data layers involves considerations like consistency models, caching, and replication strategies.

:p How does consistency affect compute-to-data interaction?
??x
Consistency models determine how data is synchronized between compute and data layers:
- Strong consistency ensures immediate updates
- Eventual consistency allows temporary inconsistencies for performance
Caching may be used to buffer demands and reduce latency.
x??

---

#### Data Management in NFRs
Data management includes replication, backup strategies, and durability requirements to meet availability and consistency needs.

:p What are key data management decisions in enterprise architecture?
??x
Key decisions include:
- Replication strategy (e.g., quorum-based)
- Backup frequency and type (full vs incremental)
- Snapshot support and point-in-time recovery
- Data consistency requirements (strong, eventual)
These decisions ensure data integrity and availability.
x??

---

#### Self-Healing Systems
Self-healing systems automatically detect and recover from failures without manual intervention, improving resilience and reducing MTTR.

:p How does self-healing improve system resilience?
??x
Self-healing systems use automation to detect failures and initiate recovery processes. This reduces MTTR and minimizes human intervention, leading to faster recovery and improved uptime.
```java
// Example: Self-healing logic
if (healthCheck() == "unhealthy") {
    restartService();
    notifyAdmin();
}
```
x??

---

#### Dependency Management
Dependencies refer to external or internal components that an application relies on for functionality at both design and runtime.

:p Why is dependency management important in enterprise architecture?
??x
Dependency management ensures that applications are built and run correctly by tracking external and internal dependencies. It helps avoid issues like version conflicts, integration problems, and runtime failures.
x??

---

