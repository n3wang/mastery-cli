# High-Quality Flashcards: 014---Head-First-Software-Architecture_processed (Part 11)

**Starting Chapter:** Step 1 Identifying initial core components

---

#### Identifying Initial Core Components
When creating a logical architecture, the first step involves identifying initial core components. These are high-level, conceptual elements that represent major functions or responsibilities in a system. The process is often described as a "guessing game" because it's based on early understanding and assumptions about the system's purpose. The components identified at this stage are not yet assigned specific responsibilities or detailed behavior; they're more like empty jars that will later be filled with logic.

:p What is the purpose of identifying initial core components in logical architecture design?
??x
The purpose of identifying initial core components is to begin structuring the system’s logical architecture by recognizing the main functional areas or responsibilities. These components are a starting point for further analysis and assignment of responsibilities. For example, in an auction system, you might initially identify components like "Live Auction Session", "Video Streamer", and "Bid Capture". These components are conceptual placeholders that help organize the system's structure before detailed design and implementation.
```java
// Pseudocode for initial component identification
class AuctionSystem {
    Component liveAuctionSession;
    Component videoStreamer;
    Component bidCapture;
}
```
x??

---

#### Workflow Approach to Component Identification
One method for identifying initial core components is the workflow approach. This involves analyzing the sequence of actions or steps that occur within the system. By mapping out the workflows, you can determine which parts of the system perform specific tasks. This approach helps to understand how data flows through the system and what major processes need to be supported.

:p How does the workflow approach help in identifying logical components?
??x
The workflow approach helps identify components by examining the sequence of activities or steps in a system. For instance, in an auction system, the workflow might be: participant joins auction → auction is streamed → bids are captured. Each step can be mapped to a component. This method ensures that components align with actual system operations rather than arbitrary groupings. It provides a structured way to break down complex systems into manageable parts.
$$
\text{Workflow} = \text{Step 1} \rightarrow \text{Step 2} \rightarrow \dots \rightarrow \text{Step N}
$$
```java
// Example workflow-based component mapping
public class AuctionWorkflow {
    void joinAuction() { /* handles joining logic */ }
    void streamAuction() { /* handles streaming logic */ }
    void captureBid() { /* handles bid capture logic */ }
}
```
x??

---

#### Actor/Action Approach to Component Identification
Another common method for identifying initial core components is the actor/action approach. This method focuses on the entities (actors) involved in the system and the actions they perform. It’s particularly useful in systems where user interaction plays a key role. By listing the actors and their responsibilities, you can derive components that encapsulate these roles and actions.

:p What is the advantage of using the actor/action approach for identifying components?
??x
The actor/action approach is advantageous because it centers on the behavior and roles of entities within the system. It helps to define components based on who or what interacts with the system and what they do. For example, in an auction system, actors might be "Participant", "Auctioneer", and "System", with actions like "Place Bid", "Start Auction", and "Stream Auction". This approach ensures that components reflect real-world interactions and responsibilities, making the architecture more intuitive and easier to maintain.
$$
\text{Component} = f(\text{Actor}, \text{Action})
$$
```java
// Pseudocode showing actor/action mapping
class Participant {
    void placeBid(Trip trip) { /* logic for placing bid */ }
}

class Auctioneer {
    void startAuction() { /* logic for starting auction */ }
}
```
x??

---

#### Refactoring Components During Architecture Design
As the system evolves, the initial components often need to be refactored. This is a normal part of the development lifecycle. Refactoring occurs when new requirements are introduced or when the understanding of the system deepens. It ensures that components remain appropriately sized and that they fulfill their intended responsibilities. The process of identifying, assigning, and refining components continues throughout the life of the system.

:p Why is refactoring of components necessary during architecture design?
??x
Refactoring is necessary because initial assumptions about system structure may not hold true as more details emerge. As new features are added or requirements change, components may become too large or too small, or their responsibilities may overlap or be unclear. Refactoring ensures that components remain aligned with system needs, improving maintainability and scalability. This iterative process is essential for avoiding the "big ball of mud" architecture, where components are poorly organized and hard to manage.
$$
\text{Refactor} = \text{Adjust Components} \rightarrow \text{Improve Alignment}
$$
```java
// Example of refactoring a component
class BidCapture {
    void processBid(Bid bid) { /* original logic */ }
}

// After refactoring, split into:
class BidValidator {
    boolean validate(Bid bid) { /* validation logic */ }
}

class BidProcessor {
    void process(Bid bid) { /* processing logic */ }
}
```
x??

---

#### Logical Architecture and System Maintainability
Poor attention to logical architecture often leads to unmaintainable systems. A well-defined logical architecture ensures that components are appropriately sized and have clear, distinct responsibilities. This prevents the system from becoming a tangled mess where changes affect multiple unrelated parts. Regularly applying the steps of component identification, assignment, and analysis helps maintain a clean and scalable architecture.

:p How does logical architecture contribute to system maintainability?
??x
Logical architecture contributes to maintainability by ensuring components have well-defined roles and responsibilities. When components are clearly separated, changes in one area are less likely to affect others. This modular design makes it easier to understand, debug, and extend the system. Without a clear logical architecture, systems often become "big ball of mud" where dependencies are unclear, and modifications can cause unexpected side effects. Applying steps like identifying core components, assigning responsibilities, and analyzing architectural characteristics helps maintain this clarity.
$$
\text{Maintainability} \propto \frac{1}{\text{Interdependencies}}
$$
```java
// Example: Clear separation of concerns
class LiveAuctionSession {
    void startSession() { /* handles session start */ }
}

class VideoStreamer {
    void stream() { /* handles video streaming */ }
}
```
x??

---

#### Workflow Approach in System Design
The workflow approach is a method used in software architecture to identify initial core components by mapping out the major processes or journeys a user takes through a system. Instead of diving into every detail, this approach starts with high-level steps and progressively refines them. It helps in understanding how different parts of a system interact and what responsibilities each component should have.

:p What is the purpose of using the workflow approach when identifying system components?
??x
The purpose of the workflow approach is to simplify the identification of core components by focusing on major user journeys or system processes. This method allows architects to start with a broad view and then drill down into more granular details. For example, in an auction system, workflows like "Register for an auction", "Join the auction", and "Bid on a trip" help define components such as "Auction Registration", "Live Auction Session", and "Bid Capture". This structured way of thinking ensures that all major functional areas are considered without getting overwhelmed by low-level details.
x??

---

#### Role of Third-Party Services in Logical Architecture
Even if a team decides to use a third-party library or service for certain functionality (e.g., video streaming), that service still forms part of the logical architecture. The component representing that service must be included in the design to reflect how it integrates into the overall system.

:p Should third-party services be included in the logical architecture even if they are not developed in-house?
??x
Yes, third-party services should be included in the logical architecture because they are part of the system's design and integration plan. For example, if the auction system uses a third-party video streaming service, the component "Video Streamer" is still part of the logical architecture. It represents the interface or abstraction through which the system interacts with the external service. This ensures that dependencies and interactions are clearly defined, even if the implementation is outsourced.
x??

---

#### Core Component Identification from Workflow Steps
Identifying core components from workflow steps requires understanding both the flow and the responsibilities. A workflow step may map to one or more components, and not all steps require a unique component. The key is to focus on functional grouping rather than rigid one-to-one mapping.

:p What is the best practice for assigning workflow steps to components?
??x
The best practice is to group related workflow steps into components based on functional cohesion. One component may handle multiple steps if they logically belong together. For example, in an auction system, "Viewing the auction", "Placing a bid", and "Processing payment" can be grouped under "Bid Capture". Conversely, distinct functions like "Register for auction" and "Manage auction" might warrant separate components. The goal is clarity, maintainability, and logical separation of concerns.
x??

---

#### Actor/Action Approach Overview
The actor/action approach is a method used in system design to identify components by analyzing the actors (users or external systems) and their actions within a system. This approach is particularly useful when there are multiple actors involved, such as in a marketplace or auction system. It helps in mapping out the logical components by associating each action with a component that handles it. This technique is foundational in object-oriented design and helps in structuring a system's architecture.

:p What is the purpose of the actor/action approach in system design?
??x
The purpose of the actor/action approach is to identify and map out the logical components of a system by analyzing the roles of actors (users or external systems) and the actions they perform. This method aids in breaking down the system into manageable parts and assigning responsibilities to components. For example, in an auction system, the bidder and auctioneer are actors, and their actions like placing a bid or starting an auction are mapped to components like Bid Capture or Auction Session.
x??

---

