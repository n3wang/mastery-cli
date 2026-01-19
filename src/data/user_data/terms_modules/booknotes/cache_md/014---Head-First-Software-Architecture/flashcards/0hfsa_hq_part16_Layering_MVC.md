# High-Quality Flashcards: 014---Head-First-Software-Architecture_processed (Part 16)

**Starting Chapter:** Layering MVC

---

#### Model-View-Controller (MVC) Design Pattern
The Model-View-Controller (MVC) design pattern is a structural pattern that separates an application into three interconnected components: Model, View, and Controller. This separation helps manage complexity by dividing responsibilities—business logic, user interface, and workflow—into distinct parts. The Model encapsulates data and business logic, the View handles the display and user interaction, and the Controller manages the flow between the two.

:p What are the responsibilities of each component in the MVC pattern?
??x
- **Model**: Represents business logic and domain entities. It encapsulates the data and rules of the application. For example, in a banking app, the model might include account details and transaction logic.
- **View**: Represents the user interface (UI). It displays data from the model and sends user inputs to the controller.
- **Controller**: Manages the interaction between the model and the view. It receives user input, processes it (often using the model), and updates the view accordingly.

Example pseudocode:
```pseudocode
Controller {
    handleUserInput(input) {
        model.update(input)
        view.render(model.getData())
    }
}
```
x??

---

#### Layered Architecture Overview
Layered architecture organizes an application into distinct horizontal layers, each with a specific responsibility. Common layers include Presentation, Workflow (Business Logic), and Persistence. This structure promotes modularity, maintainability, and separation of concerns. Each layer interacts only with the layer directly below it (in the case of strict layering) or with adjacent layers, depending on the design.

:p What is the purpose of layered architecture in software design?
??x
Layered architecture improves modularity, maintainability, and scalability by organizing code into distinct functional areas. For example, in a typical layered system:
- **Presentation Layer**: Handles UI and user interaction.
- **Workflow Layer**: Contains business logic, validations, and workflows.
- **Persistence Layer**: Manages data access and storage, such as databases or file systems.

This structure allows teams to work on different layers independently, and changes in one layer do not necessarily affect others.

Example:
```java
// Presentation Layer
public class UserInterface {
    private Controller controller;
    public void processInput(String input) {
        controller.handleInput(input);
    }
}

// Workflow Layer
public class UserController {
    private UserService userService;
    public void handleInput(String input) {
        userService.process(input);
    }
}
```
x??

---

#### Layered Monolith Architecture
A layered monolith combines the principles of layered architecture with a monolithic deployment model. In such an architecture, all components (presentation, workflow, persistence) are deployed together as a single unit. This approach simplifies deployment and communication between components but can make scaling more difficult.

:p How does a layered monolith differ from a distributed system?
??x
In a **layered monolith**, all parts of the application (UI, business logic, database) are packaged and deployed together as one unit. This simplifies deployment and reduces inter-service communication overhead.

In contrast, a **distributed system** splits components across multiple services or servers, often using APIs for communication. While more complex to manage, it allows for better scalability and independent development.

Example:
```java
// In a monolithic layered app, all components are within one JAR
public class MainApp {
    public static void main(String[] args) {
        new PresentationLayer().start();
    }
}
```
x??

---

#### Separation of Concerns in MVC and Layers
Separation of concerns is a core principle in both MVC and layered architecture. It ensures that each component or layer has a single responsibility, making the system easier to understand, modify, and test. For instance, in a layered architecture, the presentation layer should not contain business logic, and the persistence layer should not handle UI rendering.

:p Why is separation of concerns important in layered architecture?
??x
Separation of concerns enhances maintainability and reduces coupling between components. For example:
- If a team wants to switch databases, they only need to modify the persistence layer.
- If the UI needs to change, only the presentation layer is affected.

This modularity allows for easier updates, testing, and debugging. It also supports team collaboration, where different teams can work on different layers without interfering with each other.

Example:
$$
\text{Separation of Concerns} = \text{Single Responsibility Principle}
$$
x??

---

#### Layered Architecture and Domain-Driven Design (DDD)
While layered architecture focuses on technical separation, Domain-Driven Design (DDD) emphasizes business or domain separation. Layers in a layered architecture may contain parts of the domain logic, but DDD encourages organizing code around business concepts. The two can coexist, with DDD elements distributed across layers.

:p How do layered architecture and Domain-Driven Design relate?
??x
Layered architecture focuses on **technical separation**, organizing code into layers like presentation, workflow, and persistence. DDD focuses on **business separation**, organizing code around domain entities and bounded contexts.

They can complement each other: for example, a domain entity like `Customer` might be represented in the workflow layer, while its persistence is handled in the persistence layer. This allows teams to use both approaches to manage complexity effectively.

Example:
```java
// DDD Domain Entity
public class Customer {
    private String name;
    private List<Order> orders;
}

// Layered Architecture: Customer handled in workflow and persistence layers
```
x??

---

#### Layered Architecture and Monolithic Deployment
In a monolithic deployment, the entire application is packaged and deployed as a single unit. This is common in layered architectures because it simplifies deployment and avoids complexities of inter-service communication. Teams often use layered architecture within a monolith to keep code organized.

:p What are the benefits of using layered architecture within a monolithic deployment?
??x
Using layered architecture in a monolithic deployment offers:
- **Simplified deployment**: Everything is packaged together.
- **Easier debugging and testing**: No need for inter-service communication.
- **Clear separation of concerns**: Each layer has a defined role.
- **Team collaboration**: Different teams can work on different layers without coordination overhead.

Example:
```java
// A monolithic app with layered structure
public class MonolithApp {
    public static void main(String[] args) {
        new PresentationLayer().start();
    }
}
```
x??

---

---

#### Layered Architecture Overview
Layered architecture is a technically partitioned architectural style where the application is divided into distinct layers, each responsible for specific technical functions such as presentation, workflow (business logic), and persistence. These layers are typically implemented using packages or namespaces in languages like Java or .NET. This separation helps maintain clear responsibilities and modularity.

:p What is the purpose of a layered architecture?
??x
The purpose of a layered architecture is to separate concerns by organizing an application into distinct technical layers—presentation, workflow (business logic), and persistence. This separation improves maintainability, scalability, and modularity by ensuring that each layer handles a specific aspect of the system's functionality.
x??

---

#### Presentation Layer
The presentation layer, also known as the UI layer, is responsible for interacting with users. It receives input from the user, displays output, and often serves as the view component in an MVC architecture. It acts as the entry point for all user interactions and forwards requests to the workflow layer.

:p What does the presentation layer do in a layered architecture?
??x
The presentation layer is responsible for user interaction, including receiving input and displaying output. It acts as the interface between the user and the system, often functioning as the view in an MVC pattern. It forwards user requests to the workflow layer for processing.
x??

---

#### Workflow Layer
The workflow layer, also referred to as the business logic layer, processes the data received from the presentation layer. It applies business rules, performs data validation, and orchestrates the flow of data between the presentation and persistence layers. It ensures that the system behaves according to the defined logic.

:p What is the role of the workflow layer?
??x
The workflow layer processes data from the presentation layer, applies business logic, and manages the flow of information between the presentation and persistence layers. It ensures that business rules are enforced and that the system behaves correctly according to its intended functionality.
x??

---

#### Persistence Layer
The persistence layer is responsible for accessing and managing data in the database. It abstracts the data access logic and provides an interface for retrieving and storing data. It ensures that data is handled consistently and securely, often using data access objects or similar patterns.

:p What is the function of the persistence layer?
??x
The persistence layer handles data access and storage, abstracting the interaction with the database. It retrieves and stores data, ensuring that data operations are consistent and secure. This layer typically uses data access methods or objects to communicate with the database.
x??

---

#### Domain Components vs Layers
While domain components reflect the logical behavior of the application (based on the problem domain), layers represent technical capabilities (e.g., UI, business logic, data access). Domain behavior can span multiple layers, meaning that the same logical component may involve code across different technical layers.

:p How do domain components relate to architectural layers?
??x
Domain components represent the logical behavior of the application based on the problem being solved. In contrast, layers represent technical capabilities such as UI, business logic, and data access. Domain behavior often spans across multiple layers, meaning that a single logical component may involve code in more than one technical layer.
x??

---

#### Layered Architecture Philosophy
Layered architecture is a technically partitioned architectural style, typically deployed as a monolith. It is not tied to any specific domain or design pattern but rather provides a general structure for organizing software components based on their responsibilities.

:p What category and philosophy does layered architecture belong to?
??x
Layered architecture is categorized as a technically partitioned architectural style and is typically deployed as a monolith. Its philosophy is centered around organizing the application into distinct layers, each with a specific technical responsibility, to improve modularity and maintainability.
x??

---

#### Layered Architecture Overview
In a layered architecture, components are organized into distinct horizontal layers such as Presentation, Workflow, and Persistence. This structure helps separate concerns and allows for modular development. The main layers typically include:  
- **Presentation Layer**: Handles user interaction and UI  
- **Workflow Layer**: Manages business logic and processes  
- **Persistence Layer**: Deals with data storage and retrieval  

The layered architecture is popular because it's simple, maps well to MVC, aligns with team skill sets, and enables rapid project development. However, it often leads to components being smeared across multiple layers, as logical components may span across different capabilities.

:p How does a layered architecture handle components that logically belong to multiple domains?
??x
In layered architectures, components are split according to capabilities rather than logical behavior. For example, an "Order" component may include concepts from both workflow (e.g., payment processing) and persistence (e.g., saving order data). This causes logical components to be distributed across multiple physical layers, which can complicate mapping between domain logic and architecture.
x??

---

#### Logical vs Physical Components in Layered Architecture
Logical components represent the real-world problem domain, such as "Place Order", "Manage Recipes", or "Customer". However, in a layered architecture, these must be mapped into physical layers like Presentation, Workflow, and Persistence. A logical component like "Order" may involve UI (Presentation), business rules (Workflow), and database operations (Persistence).

:p Why do logical components need to be split for layered architecture?
??x
Logical components reflect the actual domain behavior but are split to fit into architectural layers. For example, a "Place Order" workflow involves entities like Order, Customer, and Payment, which must be placed in appropriate layers (e.g., Presentation for UI, Workflow for business logic, Persistence for data). This mapping ensures architectural constraints are respected while preserving domain functionality.
x??

---

#### Component Mapping to Layers
Components such as Employee Information, Billing Address, and Inventory Management may appear in multiple layers. For example, Employee Info is needed in Workflow (for driver details) and Persistence (to store in DB), but not in Presentation. Similarly, a component like "Sales Promotion" might be used in both Workflow and Presentation.

:p Which layers should a component like Employee Information be placed in?
??x
Employee Information should reside in both Workflow and Persistence layers. It's used in workflows (e.g., assigning a driver to a delivery) and must be persisted in the database. However, it doesn't belong in the Presentation layer unless directly shown to users.
x??

---

#### Persistence Layer and Data Storage
In layered architectures, the persistence layer typically handles all data storage, often mapping directly to a database. Any data that needs to be saved (e.g., orders, customers, inventory) is placed in this layer. Components like Blacklisted Customers, Frequent Diner Rewards, and Ingredients are usually part of persistence.

:p What is the role of the persistence layer in layered architecture?
??x
The persistence layer is responsible for data storage and retrieval. It maps components like Blacklisted Customers, Frequent Diner Rewards, and Ingredients to the database. Data in this layer is often accessed via repositories or DAOs (Data Access Objects) and ensures data integrity and consistency.
x??

---

#### Workflow Layer and Business Logic
The workflow layer contains business logic, orchestrating processes like order placement, recipe management, and delivery scheduling. It interacts with both Presentation and Persistence layers. For example, a "Place Order" workflow may involve validating customer info, calculating price, and storing the order in the database.

:p What role does the workflow layer play in layered architecture?
??x
The workflow layer manages business logic and processes. It orchestrates actions like "Place Order", "Deliver Order", and "Manage Recipes". It interacts with the presentation layer for user input and with the persistence layer for data storage. This layer is central to maintaining the system's core logic.
x??

---

#### Presentation Layer and User Interaction
The presentation layer handles user interaction, displaying data and accepting inputs. It includes UI components like Order UI, Recipe UI, and Inventory UI. It typically doesn’t contain business logic or data access code.

:p How is the presentation layer used in layered architecture?
??x
The presentation layer handles user interaction and displays information. For example, a "Place Order" UI allows users to enter details, and a "Recipe UI" shows available dishes. It doesn't contain business logic or data storage but communicates with Workflow and Persistence layers to render and submit data.
x??

---

#### Domain Smearing Across Layers
In layered architectures, domains often "smear" across physical layers. For instance, the concept of an "Order" spans Presentation (UI), Workflow (processing), and Persistence (database). This can lead to challenges in mapping logical domain entities to physical layers.

:p What does it mean for domains to "smear" across layers?
??x
"Smearing" refers to the fact that logical domain concepts (like "Order") span across multiple physical layers. For example, an "Order" might involve a UI (Presentation), business logic (Workflow), and data storage (Persistence). This makes mapping logical components to physical architecture more complex and requires careful design.
x??

---

#### Mapping Logical Components to Architecture
Logical components are broken down to fit the constraints of a layered architecture. This process involves identifying which parts of a component belong in which layer. For example, a "Customer" entity might be in the Workflow layer (for business logic) and Persistence layer (for data storage).

:p How do you map logical components to a layered architecture?
??x
To map logical components to a layered architecture, you first identify the logical behavior (e.g., Place Order, Manage Recipes). Then, you split these into components that fit into Presentation, Workflow, and Persistence layers. For example, "Place Order" involves UI (Presentation), business logic (Workflow), and data (Persistence). This ensures alignment with architectural constraints.
x??

---

#### Trade-offs of Layered Architecture
While layered architecture is simple and widely used, it introduces trade-offs. It doesn’t perfectly map to the problem domain, forcing developers to split logical components. However, it’s efficient for teams organized by skill set and supports rapid development.

:p What are the trade-offs of using a layered architecture?
??x
Layered architecture simplifies development and aligns with team skill sets but forces logical components to be split across layers. This leads to domain smearing and can complicate mapping between real-world logic and architecture. While it's easy to understand and implement, it introduces architectural constraints that may not perfectly reflect the domain.
x??

---

