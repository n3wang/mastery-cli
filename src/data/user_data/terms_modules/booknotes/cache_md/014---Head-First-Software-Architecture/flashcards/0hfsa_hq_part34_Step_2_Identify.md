# High-Quality Flashcards: 014---Head-First-Software-Architecture_processed (Part 34)

**Starting Chapter:** Step 2 Identify logical components

---

#### Logical Component Identification in System Design
Logical components are abstract entities that represent parts of a system's structure and behavior. In software architecture, identifying these components helps in organizing functionality, defining responsibilities, and designing modular systems. This process often involves mapping actors (users or external systems) and their actions (use cases) to logical components such as data entities, actors, and system modules.

:p What is the purpose of identifying logical components in system design?
??x
The purpose of identifying logical components is to break down a system into manageable, well-defined parts that can be designed, implemented, and tested independently. It helps in understanding how different parts interact, supports scalability, and ensures clear separation of concerns. Using an actor/action approach allows us to define who interacts with the system and what actions they perform, which then guides us in mapping those interactions to logical components like actors, data entities, and system modules.
x??

---

#### Actor/Action Approach in Logical Architecture
The actor/action approach is a method used to identify logical components by analyzing the roles (actors) and their associated actions (use cases) within a system. Actors can be human users, external systems, or even time-based triggers. Each action performed by an actor leads to a specific interaction or module in the system.

:p How does the actor/action approach help in identifying logical components?
??x
The actor/action approach helps by clearly defining who (actors) does what (actions), which allows us to map these actions to logical components such as data entities, modules, or services. For example, a student signing in triggers a process that involves verifying credentials and storing test data, which maps to components like a "Student" entity, a "Sign-in" module, and a "Database" for storing answers.
x??

---

#### Synchronous vs Asynchronous Interactions
In system design, interactions between components can be either synchronous or asynchronous. Synchronous interactions occur when one component waits for a response from another, while asynchronous interactions allow components to communicate without waiting, often through message queues or event-driven mechanisms.

:p How do synchronous and asynchronous interactions differ in system design?
??x
Synchronous interactions involve one component waiting for a response from another before continuing execution, which can cause delays. Asynchronous interactions allow components to send messages and continue processing without waiting, improving system responsiveness and scalability. For example, in Make the Grade, a student signing in might involve synchronous validation with the database, while generating a report could be asynchronous, allowing the system to process it in the background.
x??

---

#### Microservices Architecture Overview
Microservices architecture is a method of developing software applications as a collection of loosely coupled services. Each service represents a specific business capability and can be developed, deployed, and scaled independently. This style is especially useful in systems where different components require different architectural characteristics.

:p What are the key characteristics of microservices architecture?
??x
Microservices are characterized by:
- **Decomposition by business capability**: Services are organized around business functions.
- **Independent deployment**: Each service can be deployed separately.
- **Scalability**: Services can be scaled independently based on demand.
- **Technology diversity**: Each service can use different technologies or frameworks.

Example in Java:
```java
@Service
public class StudentService {
    public Student getStudentById(Long id) {
        // Logic to fetch student from database
        return studentRepository.findById(id);
    }
}
```
This architecture allows for better modularity and maintainability but introduces complexity in managing inter-service communication.
x??

---

#### Event-Driven Architecture Overview
Event-driven architecture (EDA) is a design pattern where components communicate through events. An event is a notification that something has happened, and services react to these events asynchronously. This style is useful when the system needs to handle many asynchronous operations or respond to real-time triggers.

:p What is the core idea behind event-driven architecture?
??x
In event-driven architecture:
- **Events** are messages that represent occurrences (e.g., a student submits a test).
- **Event producers** emit events.
- **Event consumers** listen and react to events.
- Communication is **asynchronous**, which allows for loose coupling between components.

Example pseudocode:
```pseudocode
IF student.submits_test THEN
    PUBLISH test_submitted_event
END IF

ON test_submitted_event DO
    CALCULATE_GRADE
    STORE_RESULT
END ON
```
This approach supports scalability and real-time processing but can be complex to manage and debug.
x??

---

#### Comparing Microservices and Event-Driven Architecture
Both architectures are distributed, meaning components are spread across multiple systems. However, they differ in how they manage communication and data flow. Microservices often use synchronous communication (e.g., REST APIs), while event-driven systems rely on asynchronous message passing.

:p How do microservices and event-driven architectures differ in terms of communication?
??x
- **Microservices** typically use synchronous communication via APIs like REST or gRPC.
- **Event-driven systems** use asynchronous communication through message queues or event buses.

For example, in a microservices setup:
```java
// Synchronous call
Student student = studentService.getStudent(id);
Grade grade = gradeService.calculateGrade(student);
```

In an event-driven system:
```java
// Asynchronous event publishing
eventPublisher.publish(new TestSubmittedEvent(studentId));
```
The choice depends on system requirements such as data sharing, event frequency, and need for real-time processing.
x??

---

#### Choosing Between Microservices and Event-Driven Architecture
When selecting an architectural style, consider:
- Whether data is shared across services.
- The number of synchronous vs. asynchronous actions.
- System complexity and team capabilities.

:p What factors should be considered when choosing between microservices and event-driven architecture?
??x
Key factors include:
1. **Shared Data**: If most data is shared, microservices may not be ideal due to data consistency challenges.
2. **Synchronous vs. Asynchronous Actions**:
   - A high number of synchronous actions may make EDA less suitable.
   - If the system is event-heavy, EDA is preferred.
3. **System Complexity**:
   - Both styles introduce complexity, but EDA adds challenges like event ordering and failure recovery.
4. **Scalability Needs**:
   - EDA excels in handling high-volume, real-time events.
   - Microservices support independent scaling of components.

Example: In Make the Grade system, if many actions are triggered by events like "test submitted", event-driven architecture might be better.
x??

---

#### Architectural Decision Record (ADR)
An Architectural Decision Record (ADR) is a documented record of architectural decisions made during software development. It helps teams understand why certain choices were made, what trade-offs were considered, and the consequences of those decisions. ADRs are essential for maintaining architectural integrity and aiding future decision-making. Each ADR typically includes sections like Title, Status, Context, Decision, and Consequences.

:p What is the purpose of documenting an architectural decision using an ADR?
??x
The purpose of documenting an architectural decision using an ADR is to capture the rationale behind a decision, the context in which it was made, and the consequences that follow. This ensures that future developers or architects can understand why a specific architectural style or approach was chosen, especially when revisiting or modifying the system. It also helps in tracking trade-offs, such as sacrificing performance for better security or maintainability.
x??

---

#### Decision Section of an ADR
The Decision section clearly states the architectural choice made. It describes the selected solution or approach in detail, such as choosing a particular architectural style (e.g., microservices, monolithic, event-driven). This section should be precise and unambiguous.

:p How should the Decision section of an ADR be structured?
??x
The Decision section of an ADR should clearly state the architectural decision taken. For instance, if choosing a microservices architecture for Make the Grade, this section would explicitly state that decision. It should be written in a way that allows others to easily understand what was decided and why it was chosen over alternatives. This section is critical for maintaining clarity and traceability in architectural evolution.
x??

---

#### Consequences Section of an ADR
The Consequences section outlines the effects of the architectural decision, both positive and negative. Even if a decision seems straightforward, it always has trade-offs. These may include impacts on performance, maintainability, scalability, or cost. Documenting these consequences helps teams understand the implications of their choices.

:p Why is it important to document consequences in an ADR even if they seem minor?
??x
It's important to document consequences in an ADR because every architectural decision involves trade-offs. Even if the impact seems minor, it could affect long-term maintainability, scalability, or cost. For example, choosing a monolithic architecture may simplify initial development but could hinder scalability later. Documenting these consequences ensures transparency and supports informed future decisions.
x??

---

#### Trade-offs in Architectural Decisions
Trade-offs are central to architectural decisions. When choosing an architectural style or approach, one must often give up something in exchange for another benefit. For example, a system may sacrifice some performance for better security or easier testing.

:p What is the significance of trade-offs in architectural decision-making?
??x
Trade-offs are significant because they reflect the reality of resource constraints and competing goals in software design. For instance, choosing a RESTful API might improve interoperability but reduce performance compared to a more direct communication method like gRPC. Understanding and documenting these trade-offs helps teams make balanced decisions that align with project goals and constraints.
x??

---

#### ADR Template Example
An ADR template typically includes the following fields: Title, Status, Context, Decision, and Consequences. Each field serves a specific role in ensuring clarity and traceability in architectural decision-making.

:p What is the structure of a typical ADR template?
??x
A typical ADR template includes the following sections:
- **Title**: A concise name for the decision.
- **Status**: Whether the decision is proposed, accepted, or superseded.
- **Context**: The background and problem statement.
- **Decision**: The architectural choice made.
- **Consequences**: The implications and trade-offs of the decision.
This structure ensures that all relevant information is captured in a consistent and accessible format.
x??

---

#### Importance of ADRs in Software Development
ADR practices are essential for maintaining architectural consistency, especially in large or long-lived projects. They help avoid repeated discussions about past decisions, provide a historical record, and support onboarding new team members.

:p Why are ADRs important for long-term software projects?
??x
ADR practices are important for long-term software projects because they create a historical record of architectural decisions. This helps avoid rehashing old debates, ensures consistency in decision-making, and supports team onboarding by providing clear documentation of design choices. Without ADRs, teams may lose track of why certain architectural styles or patterns were chosen, leading to inconsistent or suboptimal decisions over time.
x??

---

