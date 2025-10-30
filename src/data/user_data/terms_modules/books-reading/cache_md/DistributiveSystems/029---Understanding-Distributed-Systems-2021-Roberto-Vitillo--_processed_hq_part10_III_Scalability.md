# High-Quality Flashcards: 029---Understanding-Distributed-Systems-2021-Roberto-Vitillo--_processed (Part 10)

**Rating threshold:** >= 8/10

**Starting Chapter:** III Scalability

---

**Rating: 8/10**

#### Functional Decomposition
Functional decomposition involves breaking an application into separate services, each with its own well-defined responsibility. This approach enhances modularity and maintainability.

Background context: When developing applications, it's common to decompose code into functions, classes, or modules. Extending this idea, an entire application can be broken down into smaller, independently deployable services.

:p What is the main goal of functional decomposition in distributed systems?
??x
The primary goal of functional decomposition is to improve modularity and maintainability by breaking down a large application into smaller, more manageable pieces that can be deployed and scaled independently.
x??

---

#### API Gateway for Service Communication
An API gateway acts as a proxy for the application, routing, composing, and translating requests.

Background context: After decomposing an application into services, external clients need to communicate with these services. An API gateway facilitates this communication by providing a single entry point.

:p How does an API gateway help in managing communication between external clients and decomposed services?
??x
An API gateway helps manage communication by acting as a central hub that routes, composes, and translates requests from external clients to the appropriate service. It provides a unified interface for interacting with multiple services.
x??

---

#### Read-Path vs Write-Path Decoupling
Decoupling an API’s read path from its write path allows using different technologies that fit specific use cases.

Background context: In many applications, reading and writing data can be handled differently due to performance or technology constraints. By separating these paths, the system can optimize each part independently.

:p Why is decoupling the read-path from the write-path beneficial?
??x
Decoupling the read-path from the write-path allows using different technologies optimized for specific tasks. For example, the read path might use caching and asynchronous processing to enhance performance, while the write path could handle transactions and consistency.
x??

---

#### Asynchronous Messaging Channels
Asynchronous messaging channels decouple producers and consumers by sending messages between parties.

Background context: In a distributed system, direct synchronous communication can be problematic due to availability issues. Asynchronous messaging provides a more reliable way to communicate.

:p How do asynchronous messaging channels help in a distributed system?
??x
Asynchronous messaging channels help by decoupling the producer and consumer of messages. This ensures that producers can send messages even if consumers are temporarily unavailable, improving overall reliability.
x??

---

#### Partitioning Strategies
Partitioning involves distributing data across multiple nodes to handle larger datasets.

Background context: As applications grow, a single node may not be able to store or process all the data. Partitioning strategies like range and hash partitioning can help distribute the load more effectively.

:p What is the purpose of partitioning in distributed systems?
??x
The purpose of partitioning is to distribute data across multiple nodes, enabling larger datasets to be managed and processed more efficiently.
x??

---

#### Load Balancing Across Nodes
Load balancing distributes incoming requests among multiple nodes to manage traffic effectively.

Background context: Load balancers can route requests to different servers based on various criteria like round-robin or least connections. This ensures no single server becomes a bottleneck.

:p How does load balancing contribute to managing traffic in distributed systems?
??x
Load balancing contributes by distributing incoming requests among multiple nodes, ensuring that no single node is overwhelmed and maintaining consistent performance across the system.
x??

---

#### Data Replication Across Nodes
Data replication involves creating copies of data on multiple nodes to ensure availability.

Background context: Replicating data can help in achieving high availability and fault tolerance. Different strategies like single-leader, multi-leader, or leaderless systems are available with varying trade-offs.

:p What is the main benefit of replicating data across nodes?
??x
The main benefit of replicating data across nodes is improved availability and fault tolerance. Replicas ensure that even if one node fails, another can take over without service interruption.
x??

---

#### Caching Strategies
Caching involves storing frequently accessed data in a faster-access storage layer to improve performance.

Background context: In-memory caches like Redis or in-process caches can significantly reduce the load on database servers by caching frequently accessed data. However, they come with challenges like cache invalidation and consistency.

:p What are the key benefits of using caching in distributed systems?
??x
The key benefits of using caching include improved performance through faster access to frequently used data, reduced load on backend databases, and enhanced scalability by offloading read operations.
x??

---

**Rating: 8/10**

#### Monolithic Application Challenges
Background context: An application typically starts its life as a monolith, often a single-stateless web service that exposes a RESTful HTTP API and uses a relational database. It is composed of components or libraries implementing different business capabilities. As more feature teams contribute to the same codebase, the complexity increases over time.
:p What are some challenges faced by teams working on a monolithic application?
??x
The challenges include increased coupling between components as more features are added, leading to frequent stepping on each other’s toes and decreased productivity. The codebase becomes complex, making it difficult for anyone to fully understand every part of the system, which complicates implementing new features or fixing bugs.
??? 
---

#### Componentization of Monolithic Applications
Background context: Even if the backend is componentized into different libraries owned by different teams, changes still require redeploying the service. A change that introduces a bug like a memory leak can potentially affect the entire service. Rolling back a faulty build affects all teams' velocity.
:p How does componentization help in managing changes and bugs in a monolithic application?
??x
Componentization helps in managing changes by allowing different libraries to be updated independently, reducing the risk of breaking other components. However, it still requires redeploying the service whenever there is a change. A memory leak or similar bug can affect the entire service, emphasizing the need for careful testing and rollback strategies.
??? 
---

#### Microservices Architecture
Background context: To mitigate the growing pains of monolithic applications, splitting them into independently deployable services that communicate via APIs is one approach. This architectural style is called the microservice architecture. The term "micro" can be misleading as it does not imply small in size or functionality.
:p What is the key difference between a monolithic application and a microservices architecture?
??x
In a microservices architecture, independent services are deployed separately and communicate via APIs, creating boundaries that are harder to violate compared to components within the same process. This approach decouples services, reducing the impact of changes or bugs on other parts of the system.
??? 
---

#### Service-Oriented Architecture (SOA)
Background context: The term microservices is sometimes seen as misleading due to its implication of small size and functionality. A more appropriate name for this architecture could be service-oriented architecture (SOA), but it comes with its own set of baggage.
:p Why might "microservices" be considered a misleading term?
??x
The term "microservices" can be misleading because the services do not necessarily have to be small or lightweight; they are more about being independently deployable and loosely coupled. The true essence is in the service-oriented architecture, where services are designed to be self-contained and communicate via well-defined APIs.
??? 
---

**Rating: 8/10**

#### Benefits of Microservices
Breaking down the backend by business capabilities into a set of services allows each service to be developed and operated independently. This approach can significantly increase development speed for several reasons:
- Smaller teams are more effective as communication overhead grows quadratically with team size.
- Each team has its own release schedule, reducing cross-team communication time.
- Smaller codebases make it easier for developers to understand and ramp up new hires.
- Smaller codebases also improve developer productivity by not slowing down IDEs.

:p What are the benefits of breaking the backend into microservices?
??x
Breaking the backend into microservices allows each service to be developed and operated independently, which can increase development speed. This is due to several factors:
- Effective communication among smaller teams.
- Independent release schedules for each team.
- Smaller codebases that make it easier for developers to understand the system and onboard new hires.
- Improved developer productivity as IDEs are not slowed down by larger codebases.

??x
---
#### Costs of Microservices
Embracing microservices adds more moving parts to the overall system, which comes at a cost. The benefits must be amortized across many development teams for this approach to be worthwhile. Some key challenges include:

- Development Experience: Using different languages, libraries, and data stores in each microservice can lead to an unmanageable application.
  - Example: Developers may find it challenging to switch between teams if the software stack is completely different.
- Resource Provisioning: Supporting a large number of independent services requires simple and automated resource management.
  - Example: Teams should not have their own unique ways of provisioning resources, but rather rely on automation.
- Communication: Remote calls are expensive and come with issues like failures, asynchrony, and batching.
  - Example: Developers need to implement defense mechanisms to handle remote call failures.

:p What are the costs associated with fully embracing microservices?
??x
The costs associated with fully embracing microservices include:
- Increased complexity due to more moving parts in the system.
- Development experience challenges when using different languages, libraries, and data stores across multiple teams.
- Resource provisioning challenges that require standardization and automation for simplicity and consistency.
- Communication overhead and performance hits from remote calls.

??x
---
#### Standardization in Microservices
Standardization is needed to avoid an unmanageable application where each microservice uses a different language, library, or data store. This can be achieved by encouraging specific technologies while still allowing some freedom:
- Example: Providing a great development experience for teams that use recommended languages and technologies.

:p How does standardization play a role in microservices?
??x
Standardization is crucial to avoid an unmanageable application where each microservice uses different languages, libraries, or data stores. This can be achieved by encouraging the use of specific technologies while still providing some flexibility:
- Example: Teams can have their own development experience as long as they stick with the recommended portfolio of languages and technologies.

??x
---
#### Resource Management in Microservices
Resource management is crucial to support a large number of independent services. This requires simple resource provisioning and configuration, which should be handled through automation:
- Example: You don’t want every team to come up with their own way of provisioning resources; instead, use automation tools.

:p What are the key aspects of resource management in microservices?
??x
Key aspects of resource management in microservices include:
- Simple and automated resource provisioning for teams.
- Configuring provisioned resources once they have been set up.
- Using automation tools to manage resources consistently across all services.

??x
---
#### Continuous Integration, Delivery, and Deployment
Continuous integration ensures that code changes are merged into the main branch after an automated build and test suite has run. Once a change is merged, it should be automatically deployed to a production-like environment where additional tests ensure no dependencies or use cases are broken:
- Example: Individual microservices can be tested independently of each other, but testing their integration is much harder.

:p What does continuous integration involve in the context of microservices?
??x
Continuous integration involves merging code changes into the main branch after an automated build and test suite has run. Once merged, the code should be automatically deployed to a production-like environment where additional tests ensure no dependencies or use cases are broken:
- Example: While testing individual microservices is not more challenging than in monolithic applications, testing their integration can be much harder.

??x
---

