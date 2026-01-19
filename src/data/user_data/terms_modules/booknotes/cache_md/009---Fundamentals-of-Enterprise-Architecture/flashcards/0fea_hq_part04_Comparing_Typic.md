# High-Quality Flashcards: 009---Fundamentals-of-Enterprise-Architecture_processed (Part 4)

**Starting Chapter:** Comparing Typical Architect Roles

---

#### Solution Architect Role
Solution architects bridge the gap between business needs and technology capabilities. They focus on designing solutions that support business outcomes by understanding both business objectives and technical feasibility. They often specialize in specific architectural domains and use techniques like domain-driven design (DDD) to define logical boundaries and contexts. Their work involves evaluating whether capabilities should be delivered via products, platforms, or services, and how to integrate solutions for new business use cases.

:p What are typical problems solution architects solve?
??x
Solution architects solve problems such as:
- Would this capability be better serviced by a product, a platform, or a service?
- Where do we need to invest in new capabilities or deprecate existing ones?
- How should solutions integrate to support a new business use case?

They operate at the domain level, meaning their decisions may or may not be enterprise-wide, but they focus on aligning business capabilities with appropriate technical solutions.
x??

---

#### Application Architect Role
Application architects are focused on the technical implementation of systems, applications, and platforms. They work closely with engineering teams and are typically experts in the technologies used by those teams. Their role can vary in seniority depending on the complexity and criticality of the system they support. There's a current industry trend to merge this role with that of a tech lead or senior engineer, where the person is responsible for both architectural decisions and engineering delivery.

:p What are typical problems application architects solve?
??x
Application architects solve problems such as:
- How can this application be highly available to provide four nines (99.99 percent)?
- Should this application use a microservices architecture or not?
- What is the best method of integration between this application and another?
- Where does this application have a critical dependency on another, and how can that dependency be mitigated?

They operate at the most granular level of a given application or solution, and their decisions are often highly technical and specific to the application in question.
x??

---

#### Conceptual Architecture
Conceptual architecture represents the most abstract level of architecture, focusing on high-level concepts and business capabilities rather than technical details. It provides a broad view of what the system should achieve in terms of business outcomes. It is often used to communicate architecture at a strategic level to stakeholders who are not deeply technical.

:p What is the purpose of conceptual architecture?
??x
Conceptual architecture:
- Focuses on business capabilities and high-level concepts.
- Provides a strategic overview of the system’s purpose.
- Is used to communicate architecture to non-technical stakeholders.
- Helps align business and technology strategies at a high level.

Example:
$$
\text{Business Outcome} = f(\text{Capabilities}, \text{Strategic Goals})
$$

In code, conceptual architecture might be represented as:
```java
public class ConceptualArchitecture {
    private List<BusinessCapability> capabilities;
    private StrategicGoal goal;
}
```
x??

---

#### Logical Architecture
Logical architecture is concerned with the functional units and boundaries of solutions. It defines how components are organized and how they interact with each other without specifying the actual technology used. It provides a clear structure that helps in understanding the relationships between different parts of the system.

:p What does logical architecture define?
??x
Logical architecture defines:
- Functional units and their boundaries.
- How components interact with each other.
- The structure of the system in terms of capabilities and modules.
- Does not specify the actual technology stack or implementation details.

Example:
$$
\text{System} = \text{Component}_1 + \text{Component}_2 + \ldots + \text{Component}_n
$$

In code:
```java
public class LogicalArchitecture {
    private List<Component> components;
    private ComponentRelationship relationship;
}
```
x??

---

#### Physical Architecture
Physical architecture focuses on the actual technical implementation details of an architecture solution. It includes information about hardware, software, networks, and deployment configurations. It is the most concrete level of architecture and is used during the implementation phase.

:p What does physical architecture include?
??x
Physical architecture includes:
- Hardware and software configurations.
- Network topologies.
- Deployment details.
- Technology stack and tools used.
- Implementation-level details such as servers, databases, and APIs.

Example:
$$
\text{Deployment} = \text{Server} + \text{Database} + \text{Network}
$$

In code:
```java
public class PhysicalArchitecture {
    private Server server;
    private Database database;
    private Network network;
}
```
x??

---

#### Scope of Architect Roles
Scope refers to both the breadth of context considered in making decisions and the impact of those decisions. Enterprise architects operate at the enterprise level, dealing with broad, impactful decisions. Solution architects work at the domain level, which can be either enterprise-wide or more limited. Application architects focus on the granular level of individual applications or solutions.

:p How does scope differ among enterprise, solution, and application architects?
??x
Scope varies among architect roles:
- **Enterprise Architects**: Broad context, enterprise-wide impact. Infrequent but highly impactful decisions.
- **Solution Architects**: Domain-level scope. Some domains are enterprise-wide, others are not.
- **Application Architects**: Granular level. Focused on specific applications or solutions, which may or may not be enterprise-wide.

Example:
$$
\text{Enterprise Scope} > \text{Domain Scope} > \text{Application Scope}
$$
x??

---

#### Volume of Decision Making
Volume refers to the frequency and amount of decisions made by architects. Enterprise architects make fewer but more strategic decisions, while application architects make many more frequent but less impactful decisions. Solution architects fall in between, making decisions of moderate frequency and impact.

:p How does decision volume vary across architect roles?
??x
Decision volume varies as follows:
- **Enterprise Architects**: Low volume, infrequent but high-impact decisions.
- **Solution Architects**: Moderate volume, decisions that are frequent but not always enterprise-wide.
- **Application Architects**: High volume, frequent but granular decisions.

Example:
$$
\text{Volume}_{\text{Enterprise}} < \text{Volume}_{\text{Solution}} < \text{Volume}_{\text{Application}}
$$
x??

---

#### Security-Focused Architect Roles
Security-focused architects bring deep understanding of cybersecurity and threat analysis to problem-solving. They design and implement security strategies at enterprise, solution, and application levels. Security architects use threat modeling techniques to define security architecture and ensure that systems are protected against potential threats.

:p How does a security-focused application architect approach system design?
??x
A security-focused application architect uses threat modeling techniques to define the security architecture of an application. They identify potential security threats, evaluate vulnerabilities, and design controls to mitigate risks. This approach ensures that security is built into the application from the ground up, rather than being added as an afterthought. The architect must understand both the application's functionality and the security landscape to design robust defenses.
x??

---

#### Network-Focused Architect Roles
Network-focused architects bring deep understanding of network design and constraints to problem-solving. They define strategies such as zero trust, establish routing patterns, and solve specific network problems like virtual private networks. These architects ensure that network architecture supports business requirements and security policies.

:p What is the role of a network-focused enterprise architect?
??x
A network-focused enterprise architect defines enterprise-wide network strategies such as zero trust architecture. They ensure that network design supports business requirements, security policies, and scalability needs. This involves understanding network constraints, designing secure and efficient network topologies, and aligning network architecture with overall enterprise goals.
x??

---

#### Cloud-Focused Architect Roles
Cloud-focused architects bring deep understanding of cloud architecture and patterns to problem-solving. They define multicloud strategies, design cloud execution environments, and create highly available cloud-native applications. These architects must understand cloud platforms, services, and best practices to design scalable and resilient solutions.

:p How does a cloud-focused solution architect approach a domain-specific problem?
??x
A cloud-focused solution architect solves domain-specific problems by defining the cloud execution environment for all applications in that domain. They assess requirements for scalability, availability, and performance, then design appropriate cloud services and architectures. This involves selecting the right cloud platforms, services, and patterns that meet business needs while ensuring cost-effectiveness and security.
x??

---

#### Site Reliability-Focused Architect Roles
Site reliability-focused architects bring deep understanding of operational automation to enable swift incident recovery. They define observability strategies, standard tooling for monitoring and alerting, and service-level objectives (SLOs) and indicators (SLIs) for applications. These architects ensure that systems are reliable, maintainable, and performant.

:p What are SLOs and SLIs in the context of site reliability?
??x
SLOs (Service-Level Objectives) are targets for system performance or availability that a service should meet. SLIs (Service-Level Indicators) are measurable metrics used to track whether SLOs are being met. For example, an SLO might be "99.9% availability," and an SLI might be "percentage of requests that complete within 200ms." Site reliability architects define these metrics to ensure that applications meet business requirements for performance and reliability.
x??

---

#### Data-Focused Architect Roles
Data-focused architects bring deep understanding of data structures, data modeling, and data management to problem-solving. They define data management standards, establish data lakes or lakehouses, and design data replication strategies. These architects ensure that data is managed effectively to support business needs.

:p How does a data-focused application architect determine the right data stores?
??x
A data-focused application architect determines the right data stores by understanding business needs such as consistency requirements, performance needs, and scalability requirements. They evaluate different types of databases (relational, NoSQL, graph, etc.) and select those that best meet the application's functional and non-functional requirements. For example, they might choose a document database for flexible schema requirements or a time-series database for performance monitoring data.
x??

---

#### Enterprise Chief Architect (ECA)
The Enterprise Chief Architect (ECA) is the head of enterprise architecture, with approval authority to make enterprise architecture decisions. They are usually senior-level executives who report to the CIO or CTO. The ECA is responsible for defining enterprise-wide architecture strategy, ensuring alignment with business goals, and overseeing the implementation of architectural decisions across the organization.

:p What is the role of an Enterprise Chief Architect (ECA)?
??x
The Enterprise Chief Architect (ECA) is the head of enterprise architecture with approval authority for enterprise architecture decisions. They are typically senior-level executives who report to the CIO or CTO. The ECA is responsible for defining enterprise-wide architecture strategy, ensuring alignment with business goals, and overseeing the implementation of architectural decisions across the organization. They serve as the primary decision-maker for enterprise architecture initiatives.
x??

---

#### Centralized Architecture
Centralized architecture refers to an organizational design where a dedicated team of architects is consolidated at either the enterprise or divisional level. These teams hold decision-making powers and support the respective organizational layer. This model ensures consistency in architecture decisions and aligns with a shared vision. It is particularly effective in large organizations that require strong governance and alignment across units.

:p What are the key characteristics of centralized architecture?
??x
In centralized architecture, there is a dedicated and independent team of architects who are not tied to the delivery teams. They make decisions based on the common good rather than individual team benefits. This model facilitates consistent, efficient decision-making and collaboration across business units, but it may cause architects to be perceived as bottlenecks due to distance from delivery teams.
x??

---

#### Federated Architecture
Federated architecture is the opposite of centralized architecture, where the architect role is embedded into delivery teams, typically as part-time roles. These teams make their own architecture decisions, empowering them to respond quickly to business needs. This model is more scalable and allows teams to upskill and take ownership of their architectural choices. However, it risks losing objectivity and can lead to duplicated efforts or siloed decision-making.

:p What are the pros and cons of a federated architecture model?
??x
Pros of federated architecture include scalability, team empowerment, and faster decision-making. Teams are self-sufficient and can tailor decisions to their specific domain. Cons include loss of objectivity (as teams may favor their own goals), difficulty in performance management, and potential for redundant efforts or siloed decisions due to lack of centralized oversight.
x??

---

#### Hybrid Architecture
Hybrid architecture combines both centralized and federated models. In this approach, some architectural roles are centralized (e.g., enterprise strategy and oversight), while others are decentralized (e.g., domain-specific or delivery team-level architects). This model is often preferred as it balances governance with agility, allowing for both consistency and scalability. It's especially useful in large organizations that must align with both strategic and operational needs.

:p How does hybrid architecture balance centralized and federated models?
??x
In hybrid architecture, enterprise-level roles such as enterprise architects are centralized to ensure strategic alignment and governance, while solution or application architects may be federated into delivery teams for agility. This structure allows for consistent standards and vision while enabling teams to make quick, domain-specific decisions. It mitigates risks of siloing through strong enterprise standards and processes.
x??

---

#### Enterprise vs. Solution vs. Application Architects
Enterprise architects focus on overall strategy, enablement, and oversight. Solution architects are often centralized or hybrid, responsible for designing solutions that align with enterprise goals. Application architects are typically decentralized, embedded within delivery teams, and responsible for the day-to-day technical decisions. The decentralized nature of application architects is balanced by centralized standards and processes to ensure consistency.

:p How do the roles of enterprise, solution, and application architects differ in a hybrid model?
??x
Enterprise architects define the strategic vision and governance, solution architects design solutions aligned with that vision, and application architects make technical decisions within teams. In a hybrid model, enterprise and solution architects are often centralized, while application architects are federated. Centralized standards and processes ensure that decentralized decisions align with overall architecture.
x??

---

