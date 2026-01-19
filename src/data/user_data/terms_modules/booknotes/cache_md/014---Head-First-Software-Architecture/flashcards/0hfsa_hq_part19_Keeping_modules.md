# High-Quality Flashcards: 014---Head-First-Software-Architecture_processed (Part 19)

**Starting Chapter:** Keeping modules modular

---

#### Modular Monoliths: Definition and Purpose
A modular monolith is a single codebase that is organized into distinct modules based on domain boundaries, but deployed as one unit. The goal is to achieve loose coupling between modules while maintaining the simplicity of a monolithic deployment. This approach allows cross-functional teams to work independently without the complexity of distributed systems.

:p What is the main challenge in maintaining modularity within a monolithic application?
??x
The main challenge is that developers may accidentally create tight coupling between modules by directly referencing code from one module in another. This can happen easily due to features like auto-import in IDEs, leading to a "big ball of mud" where module boundaries become blurred over time.
x??

---

#### Module Boundaries and Coupling
In a modular monolith, each module should expose only a public API to other modules, hiding its internal implementation. This design prevents unintended dependencies and ensures that changes in one module don't affect others, thereby reducing overall coupling.

:p How can we enforce module boundaries to prevent accidental coupling?
??x
We can enforce module boundaries through several mechanisms:
1. **Language-level features**: Java's JPMS (Java Platform Module System) or .NET’s `internal` keyword.
2. **Project structure**: Organizing modules as separate folders or repositories.
3. **Build tools**: Using Gradle subprojects or multi-module builds.
4. **Architectural governance tools**: Tools like ArchUnit for Java or ArchUnit.NET can enforce rules during builds.
These techniques help ensure that modules communicate only via their defined APIs.
x??

---

#### Using Folders and Repositories for Module Separation
When language-level module support is not available or insufficient, developers can separate modules using folder structures or even different repositories. Each module becomes a subproject within a larger build system, such as Gradle or Maven.

:p What are the benefits of structuring modules as separate folders or repositories?
??x
Separating modules into folders or repositories enforces physical isolation:
- It makes it harder to accidentally access internal code.
- It aligns well with build tools like Gradle, which support multi-module projects.
- It allows teams to manage each module independently.
For example, in a Gradle project:
```groovy
subprojects {
    apply plugin: 'java'
}
```
This structure forces clear separation between modules and discourages tight coupling.
x??

---

#### Modularizing Data in Modular Monoliths
While modularizing code is important, if all modules share the same database, they remain coupled at the data level. This can lead to issues similar to those in a traditional monolith, where changes in one part of the database affect others.

:p Why is it important to consider modularizing the database in a modular monolith?
??x
Modularizing the database ensures that each domain module owns its data and interacts with others only through well-defined APIs. This reduces data-level coupling and supports true modularity.

However, this approach requires careful planning and may be too ambitious initially. A better strategy is to start by modularizing the codebase and then evolve the data architecture over time.
x??

---

#### Architectural Governance Tools
Tools like ArchUnit for Java and ArchUnit.NET help enforce architectural constraints by checking code during the build process. These tools can be used to enforce rules like “no module should depend on another module’s internal package.”

:p How do architectural governance tools like ArchUnit help in enforcing modularity?
??x
ArchUnit allows developers to define rules that enforce architectural boundaries. For example, a rule might prevent access to internal packages from other modules.

Example rule in Java:
```java
classes().that().resideInAPackage("..order..")
    .should().onlyAccessClassesThat().resideInAPackage("..order..")
```
This rule ensures that the order module only accesses its own packages, preventing accidental cross-module dependencies.
x??

---

#### Modular Monoliths vs. Distributed Systems
Modular monoliths offer a middle ground between monoliths and microservices. They allow for better team autonomy and modularity while avoiding the complexity of distributed systems.

:p What are the trade-offs of choosing a modular monolith over microservices?
??x
Modular monoliths require more discipline and tooling compared to traditional monoliths, but they provide:
- Clearer module boundaries.
- Easier deployment and debugging.
- Better team autonomy due to domain-based separation.
- Reduced complexity compared to microservices.

However, they do not eliminate all coupling, especially at the data level, so further architectural evolution may be needed.
x??

---

#### Evolving Architecture Over Time
It's important to evolve your architecture gradually. Starting with modularizing the codebase is often a good first step before considering more advanced patterns like modularizing the database.

:p Should I modularize the database immediately when adopting modular monoliths?
??x
No, it's not necessary to modularize the database right away. Start with modularizing the codebase, focusing on domain-driven design principles. Once the team is comfortable with modular thinking, consider evolving the data architecture.

This incremental approach reduces risk and allows teams to adapt without overwhelming complexity.
x??

---

#### Modular Monolith Overview
A modular monolith is a single application deployment that maintains modularity at the code level, but still uses a single database. This approach combines the simplicity of a monolithic architecture with the organizational benefits of modular design. The main advantage is that developers can work with a single database, avoiding complexities like distributed transactions and eventual consistency. However, modularity is only truly maintained if each module accesses only its own data.

:p What is the key principle for maintaining modularity in a modular monolith?
??x
The key principle is that every module should access only its own tables. This ensures data encapsulation and prevents modules from interfering with each other's data, even though they share the same database.
x??

---

#### Database Schema Separation
In a modular monolith, each module is assigned its own schema to house its tables. This approach extends modularity all the way to the database level. For example, in the Naan & Pop application, the schemas O (Order), I (Inventory), R (Recipe), and so on, are used to separate data for each module. This structure ensures that data belonging to one module cannot be directly accessed by another module, maintaining clean boundaries.

:p How does schema separation help maintain modularity in a modular monolith?
??x
Schema separation ensures that each module's data is isolated within its own schema. This prevents accidental cross-module data access and enforces modularity at the database level, even though all schemas reside in a single database.
x??

---

#### Modular Monolith Pros and Cons
A modular monolith offers several advantages: simplicity of deployment, single database management, and ease of development. However, it also has drawbacks: limited scalability, tight coupling between modules (even if data is separated), and the potential for data inconsistency if not carefully managed. Despite these limitations, modular monoliths are often preferred for their balance of simplicity and modularity.

:p What are the main advantages of using a modular monolith architecture?
??x
The main advantages include simplicity of deployment, single database management, and ease of development. Developers can work with one database, avoiding complex distributed transactions and eventual consistency issues.
x??

---

#### Modular Monolith Cons
While modular monoliths provide modularity at the code level, they do not fully decouple modules in terms of deployment or scaling. All modules are deployed together, and performance bottlenecks in one module can affect the entire system. Additionally, even though data is separated into schemas, there is still a single point of failure (the database) and no true isolation between modules.

:p What is a major limitation of modular monoliths regarding scalability?
??x
A major limitation is that all modules are deployed together, so scaling one module independently is not possible. Additionally, a single point of failure exists in the database, and performance issues in one module can affect the entire system.
x??

---

#### Modular Monolith vs Microservices
While modular monoliths maintain modularity at the code and data level, they differ from microservices in that they are deployed as a single unit and share a database. Microservices, on the other hand, are deployed independently and typically use separate databases. Modular monoliths are often chosen as a stepping stone toward microservices, offering a middle ground between simplicity and scalability.

:p How does a modular monolith differ from a microservices architecture?
??x
A modular monolith is deployed as a single unit and shares a database, whereas microservices are deployed independently and use separate databases. Modular monoliths offer modularity with simplicity, while microservices offer true scalability and independence.
x??

---

#### Data Encapsulation in Modular Monoliths
In a modular monolith, data encapsulation is achieved by ensuring that each module only accesses its own schema. This prevents unintended data access and maintains clear boundaries between modules. This approach allows teams to develop and maintain modules independently, even though they are deployed together.

:p What is the purpose of data encapsulation in modular monoliths?
??x
Data encapsulation ensures that each module only accesses its own data, preventing unintended cross-module data access and maintaining clear boundaries between modules. This supports independent development and maintenance.
x??

---

#### Schema-Based Module Isolation
Each module in a modular monolith is associated with a schema, and all tables related to that module are placed within that schema. This schema-based isolation ensures that modules are not tightly coupled at the data level. It also simplifies data access and management, as developers know exactly which schema to query for a specific module.

:p How does schema-based isolation improve data management in modular monoliths?
??x
Schema-based isolation improves data management by clearly defining which data belongs to which module, making queries more predictable and reducing the risk of accidental data access. It also simplifies database maintenance and access control.
x??

---

#### Modular Monolith vs Traditional Monolith
A traditional monolith has no modularity at all, with all code and data tightly coupled. In contrast, a modular monolith introduces modularity at the code level and extends it to the database by using separate schemas. This makes it easier to manage, test, and scale parts of the application, even though it remains a single deployment unit.

:p What is the key difference between a modular monolith and a traditional monolith?
??x
The key difference is that a modular monolith introduces modularity at both the code and database levels, using separate schemas for each module, while a traditional monolith has no modularity and all code and data are tightly coupled.
x??

---

#### Modular Monoliths Overview
Modular monoliths are a software architecture style that combines the simplicity of a monolithic application with the organization benefits of modularity. In this approach, business domains are separated into distinct modules, each containing its own data and logic, but all running within a single application process. This structure allows teams to work independently on different modules while maintaining a unified system. It encourages domain-based alignment, where teams specialize in specific business subdomains rather than technical layers. The key idea is to keep modules loosely coupled and well-defined, even though they exist within a single deployable unit.

:p What is the main idea behind modular monoliths?
??x
The main idea of modular monoliths is to organize a large application into distinct modules, each representing a business domain, allowing cross-functional teams to work independently while keeping the system as a single deployable unit. This approach supports maintainability, testability, and domain alignment without the complexity of distributed systems.
x??

---

#### Avoiding Cross-Module Joins
In modular monoliths, it's important to avoid accidental SQL joins across tables from different modules, as this reintroduces tight coupling and undermines modularity. Instead of using foreign key constraints that enforce referential integrity across modules, modules can store IDs of records from other modules as plain integers or strings. When additional information is needed, the module calls the appropriate domain's API using the stored ID, which allows for loose coupling and preserves module boundaries.

:p How do modular monoliths handle relationships between modules?
??x
Modular monoliths store IDs from one module in another module's tables without enforcing foreign key relationships. When more data is needed, the module makes an API call to the relevant domain using the stored ID. This avoids tight coupling through joins and keeps modules loosely coupled.
x??

---

#### Example: Order Domain Using Recipe Item ID
Consider an order domain that needs to reference recipe items. It stores the `recipe_item_id` in its own table but does not create a foreign key constraint. If it needs detailed information about the recipe item, it calls the Recipe module's API, passing the `recipe_item_id`. This pattern ensures that the order module doesn't directly depend on the recipe module's schema, thus preserving modularity.

:p Can you give an example of how one module references another in a modular monolith?
??x
In the example, the Order domain stores `recipe_item_id` in its own table but doesn’t enforce a foreign key. When it needs details about the recipe item, it invokes the Recipe module’s API with the ID. This design avoids tight coupling and keeps the modules independent.
x??

---

#### Modular Monolith Superpowers: Maintainability
One of the major advantages of modular monoliths is improved maintainability. Since modules are clearly separated by business concerns, changes within a module are less likely to affect others. Cross-functional teams can focus on their respective subdomains, making it easier to understand and modify code. Additionally, since modules are self-contained, developers can make targeted changes without worrying about breaking unrelated parts of the system.

:p Why is maintainability better in modular monoliths?
??x
In modular monoliths, each module corresponds to a business domain, and teams are specialized in those domains. This leads to better understanding and easier maintenance. Changes are localized to a module, reducing risk and complexity compared to a fully flat monolith.
x??

---

#### Modular Monolith Superpowers: Testability
Modular monoliths offer strong testability because each module can be tested in isolation. Since modules are bounded and contain all necessary logic and data, developers can build comprehensive test suites, including integration, smoke, and end-to-end tests. Teams can write tests that cover their domain thoroughly, knowing that changes won't unexpectedly impact other modules.

:p How does modularity improve testability?
??x
Each module in a modular monolith encapsulates its own logic and data. This allows teams to write focused tests for their module without worrying about side effects from other modules. As a result, testing becomes more predictable and manageable.
x??

---

#### Modular Monolith Superpowers: Performance
Performance in modular monoliths is typically high because there are no inter-module network calls. All data processing occurs within a single application, which reduces latency and overhead. Since modules communicate through in-memory calls or APIs, performance remains stable and predictable, especially for systems that do not require high scalability or distributed processing.

:p Why do modular monoliths often perform well?
??x
Modular monoliths avoid network overhead by keeping all components within the same application process. All data access and processing happen locally, leading to faster response times and predictable performance.
x??

---

#### Modular Monolith Superpowers: Domain-Based Alignment
Modular monoliths align teams with business domains rather than technical layers. This encourages cross-functional teams that understand both the business and technical aspects of their module. Such alignment improves communication, reduces friction between teams, and results in better software design that reflects real-world business processes.

:p How does domain-based alignment benefit modular monoliths?
??x
Domain-based alignment ensures that teams are responsible for both business logic and implementation details of a specific domain. This leads to better ownership, clearer communication, and more cohesive development compared to traditional layered architectures where teams may work on unrelated technical layers.
x??

---

#### Modular Monolith Kryptonite: Operational Characteristics
Despite their benefits, modular monoliths share the limitations of traditional monoliths. They lack elasticity and fault tolerance, as they are deployed as a single unit. Scaling individual components independently is difficult, and a failure in one part of the system can bring down the entire application. These traits make them less suitable for systems requiring high availability or dynamic scaling.

:p What are the operational drawbacks of modular monoliths?
??x
Modular monoliths are still single units, so they lack elasticity and fault tolerance. Scaling individual modules is hard, and a failure in one module can crash the whole system, unlike distributed systems that can isolate failures.
x??

---

#### Modular Monolith Kryptonite: Hard to Reuse Logic
Because modules are structured around business domains, sharing logic across modules is challenging. Common utilities or services must be extracted into shared dependencies, increasing coupling. This makes it harder to reuse code between modules compared to systems with explicit shared libraries or microservices.

:p Why is it hard to reuse logic in modular monoliths?
??x
Modules are tightly scoped to business domains, so reusing code across modules requires extracting shared logic into dependencies. This introduces coupling and reduces modularity, making reuse less natural than in systems with explicit shared components.
x??

---

#### Modular Monolith Kryptonite: Fragile Boundaries
Module boundaries in modular monoliths are not enforced by tooling or language constructs, making them fragile. Accidental coupling can occur through improper use of shared classes, databases, or even SQL joins. Governance is required to maintain boundaries, and this can be difficult to enforce in large teams or evolving systems.

:p How can module boundaries become fragile in modular monoliths?
??x
Module boundaries are not enforced by language or tooling. Without strong governance, developers may accidentally introduce tight coupling via shared code, SQL joins, or improper data access patterns, weakening the modularity.
x??

---

#### Modular Monolith Star Rating Chart
Modular monoliths receive high ratings for maintainability, testability, and simplicity, but lower scores for scalability, elasticity, and fault tolerance. While they offer better process characteristics than layered architectures, they require more planning, governance, and tooling. Overall, they're a good choice for systems that don't require complex distribution or scaling, but are more expensive to manage than simpler architectures.

:p How do modular monoliths rate on architectural characteristics?
??x
Modular monoliths score highly on maintainability, testability, and simplicity, but poorly on scalability, elasticity, and fault tolerance. They are more expensive to manage due to the need for governance and planning, but outperform layered architectures in process-related aspects.
x??

---

#### Choosing Systems for Modular Monolith Architecture
Systems suited for modular monoliths typically involve bounded business domains with clear separation of concerns. Examples include small to medium-sized businesses with evolving needs, systems that benefit from domain-based alignment, or those not requiring extreme scalability or fault isolation. Large financial systems or highly distributed systems are generally not well-suited due to their complexity and operational requirements.

:p Which systems are well-suited for modular monoliths?
??x
Systems with clear business domains, such as small bakeries, trouble ticket systems, or new business lines expecting frequent changes, are well-suited for modular monoliths. Large, complex systems like financial transfers or high-scale distributed systems are not ideal.
x??

---

---

