# High-Quality Flashcards: 014---Head-First-Software-Architecture_processed (Part 31)

**Starting Chapter:** Monolithic database

---

#### Monolithic Database Topology in EDA
In event-driven architecture (EDA), a monolithic database topology refers to a design where all services share a single database. This setup simplifies data access because services can query directly without making synchronous calls to other services. However, this approach introduces tight coupling at the data level, which can complicate system scalability, fault tolerance, and change management.

:p What are the main advantages and disadvantages of using a monolithic database in EDA?
??x
**Advantages:**
- Services can directly access data without synchronous communication.
- Simplifies complex queries and joins handled by the database.
- Fast data retrieval due to direct access.

**Disadvantages:**
- Changes to database schema can impact multiple services, leading to brittle systems.
- Single point of failure for the entire system.
- Scaling becomes difficult as the database must scale with services.
- Testing and releasing become complex and error-prone.

Example pseudocode for a service accessing inventory data directly:
```pseudocode
function getOrderDetails(orderId):
    inventory = db.query("SELECT * FROM inventory WHERE product_id = ?", productId)
    shipping = db.query("SELECT * FROM shipping WHERE region = ?", region)
    return { inventory, shipping }
```
This shows how services bypass inter-service communication by querying the shared database directly.
x??

---

#### Domain-Partitioned Database Topology
A domain-partitioned database topology is a hybrid model where the database is split into partitions based on business domains or features, but services still share some level of data access. This approach reduces the coupling compared to a monolithic database, but still introduces some shared state that can cause synchronization issues.

:p How does a domain-partitioned database differ from a monolithic one in EDA?
??x
A domain-partitioned database splits data into logical sections based on business domains (e.g., customer, order, inventory). Unlike a monolithic database where all services access the same database, this approach allows some level of decoupling while still sharing a database infrastructure. However, it still requires careful coordination when data is needed across domains.

For example, an order service might access a partitioned inventory table:
```sql
SELECT stock_level FROM inventory_partition WHERE product_id = ?;
```
This is more structured than a monolithic schema, but still introduces potential bottlenecks or coupling if partitions are not well-defined or if cross-partition queries are required.
x??

---

#### Database-per-Service Pattern in EDA
The database-per-service pattern is a core concept in microservices and EDA, where each service owns its own database. This promotes strong decoupling between services, allowing them to evolve independently. It also supports better scalability, fault tolerance, and maintainability. However, it introduces challenges such as eventual consistency and cross-service data access.

:p What is the primary benefit of the database-per-service pattern in EDA?
??x
The primary benefit is **strong decoupling** of services. Each service owns its data and is responsible for managing its own database. This allows services to evolve independently, adopt different data models, and scale separately.

Example:
```java
class OrderService {
    void processOrder(Order order) {
        // Store order in its own DB
        orderRepository.save(order);
        // Publish event for fulfillment
        eventPublisher.publish(new OrderPlacedEvent(order.getId()));
    }
}
```
This ensures that order processing doesn't block or depend on other services' data availability. However, it requires event-driven communication to propagate changes and maintain consistency.
x??

---

#### Trade-offs of Database Topologies in EDA
Each database topology in EDA comes with trade-offs related to coupling, scalability, fault tolerance, and complexity. Choosing the right topology depends on system requirements such as consistency needs, data access patterns, and team structure.

:p What factors should be considered when choosing a database topology in EDA?
??x
Key factors include:
- **Consistency Requirements**: Strong consistency may favor monolithic or domain-partitioned, while eventual consistency supports database-per-service.
- **Scalability Needs**: Database-per-service supports better horizontal scaling.
- **Fault Tolerance**: Monolithic databases are a single point of failure; database-per-service improves resilience.
- **Development Team Structure**: Teams may prefer ownership of data and DBs (database-per-service).
- **Complexity of Queries**: Monolithic databases simplify complex joins, whereas service-owned DBs require event-based coordination.

Example decision matrix:
| Topology             | Coupling | Scalability | Fault Tolerance | Complexity |
|----------------------|----------|-------------|------------------|------------|
| Monolithic           | High     | Low         | Low              | Low        |
| Domain-Partitioned   | Medium   | Medium      | Medium           | Medium     |
| Database-per-Service | Low      | High        | High             | High       |

This helps teams choose based on their system’s priorities.
x??

---

#### Event-Driven Data Access in EDA
In EDA, services often use events to communicate data changes instead of direct database access. This supports loose coupling and asynchronous processing. Events can be used to propagate updates, trigger downstream actions, or notify other services about data changes.

:p How do events facilitate data access in EDA?
??x
Events in EDA allow services to communicate without direct data access. When a service updates its data, it publishes an event that other services can react to. This enables eventual consistency and decouples services from each other.

Example:
```java
class InventoryService {
    void updateStock(Product product, int quantity) {
        inventoryRepository.update(product, quantity);
        eventPublisher.publish(new StockUpdatedEvent(product.getId(), quantity));
    }
}

class OrderService {
    @EventListener
    void handleStockUpdate(StockUpdatedEvent event) {
        // React to stock change without querying inventory directly
        if (event.getQuantity() > 0) {
            // Proceed with order fulfillment
        }
    }
}
```
This pattern avoids tight coupling and supports asynchronous processing.
x??

---

#### Consistency Challenges in EDA
In EDA, especially with database-per-service, consistency becomes a challenge. Services may not see the latest data immediately due to asynchronous communication. Techniques like eventual consistency, sagas, or event sourcing are often used to manage this.

:p What are common consistency challenges in EDA and how are they addressed?
??x
Common challenges include:
- **Eventual Consistency**: Services may temporarily see inconsistent data.
- **Data Synchronization**: Cross-service data access becomes difficult.
- **Transaction Boundaries**: Distributed transactions are hard to implement.

Solutions include:
- **Event Sourcing**: Store all changes as events to reconstruct state.
- **Saga Pattern**: Manage distributed transactions across services.
- **CQRS (Command Query Responsibility Segregation)**: Separate read and write models.

Example with saga:
```java
class OrderSaga {
    void startOrderProcess(Order order) {
        // Step 1: Reserve inventory
        inventoryService.reserve(order.getProductId(), order.getQuantity());
        // Step 2: Charge payment
        paymentService.charge(order.getCustomerId(), order.getAmount());
        // Step 3: Fulfill order
        fulfillmentService.fulfill(order);
    }
}
```
This ensures that if any step fails, compensation logic can be applied to maintain consistency.
x??

---

---

#### Domain-Partitioned Databases Overview
In domain-partitioned databases, each domain in a system has its own dedicated database. This approach aligns with the concept of physical bounded contexts, where services within a domain share a common database. For example, services like Order Placement, Payment, and Inventory in the Order Placement domain all access the same physical database. However, services in one domain cannot directly access another domain’s database, which enforces loose coupling but introduces synchronous communication between domains.

:p What is the main characteristic of domain-partitioned databases?
??x
The main characteristic is that each domain has its own physical database, and services within a domain share that database. Cross-domain access is restricted, requiring services to make synchronous calls to other services for data, which introduces coupling.
x??

---

#### Service Coupling in Domain-Partitioned Databases
In a domain-partitioned topology, services within the same domain are highly decoupled due to shared access to the same database. However, when a service needs data from another domain, it must make a synchronous call to the external service. This leads to tight coupling between services across domains, as changes in one service may affect others due to direct dependencies.

:p How does domain-partitioned architecture affect service coupling?
??x
Services within the same domain are decoupled because they share a database, but services from different domains are coupled because they must make synchronous calls to retrieve data from one another.
x??

---

#### Performance Considerations in Domain-Partitioned Databases
Accessing data within a domain is fast because services access the database directly. However, when services need data from another domain, they must make synchronous calls, which introduces latency and reduces overall performance. This synchronous communication can become a bottleneck in high-throughput systems.

:p What impact does synchronous communication have on performance in domain-partitioned systems?
??x
Synchronous calls between services from different domains increase latency and reduce performance compared to direct database access within a domain.
x??

---

#### Simplicity and Change Impact in Domain-Partitioned Systems
Domain-partitioned databases are less complex than fully distributed architectures, but more complex than monolithic systems. Changes to a database table only affect services within that domain, limiting the scope of impact. This makes it easier to manage and evolve individual domains independently.

:p How does domain partitioning affect the complexity and change impact in a system?
??x
Domain partitioning simplifies the system compared to fully distributed systems but is more complex than monolithic designs. Changes to a database table only affect services within the same domain, reducing the scope of impact.
x??

---

#### Fault Tolerance in Domain-Partitioned Databases
Database failures in a domain only affect services within that domain. This provides better fault tolerance compared to monolithic systems, where a single database failure can bring down the entire application. However, the system is still vulnerable to failures in inter-domain communication.

:p How does domain partitioning improve fault tolerance?
??x
Database failures only affect services within the same domain, isolating faults and improving system resilience compared to monolithic architectures.
x??

---

#### Scalability in Domain-Partitioned Databases
Scalability in domain-partitioned systems is improved compared to monolithic systems. Databases can be scaled independently at the domain level, rather than scaling the entire system. This allows for more efficient resource allocation and better performance under load.

:p How does domain partitioning improve scalability?
??x
Databases can be scaled at the domain level, allowing for more efficient resource usage and better performance under load, compared to scaling the entire system in monolithic architectures.
x??

---

#### Example Code for Synchronous Call Between Services
In a domain-partitioned system, a service might need to call another service to retrieve data. For example, the Order Placement service calls the Shipping service to get shipping options. This is typically implemented using synchronous HTTP or RPC calls.

:p What is an example of a synchronous service call in a domain-partitioned system?
??x
An example is the Order Placement service calling the Shipping service via an HTTP endpoint like `GET /shipping/options` to retrieve shipping data, which requires a synchronous response.
x??

```java
// Pseudocode for synchronous call
class OrderPlacementService {
    ShippingService shippingService;

    void placeOrder(Order order) {
        ShippingOptions options = shippingService.getShippingOptions(order);
        // Process order with shipping options
    }
}
```

---

#### Database-per-Service Topology
This architectural pattern assigns a dedicated database to each service, enforcing a tight physical bounded context. Unlike domain-partitioned topologies, where data may be shared or partitioned across services, the database-per-service approach ensures that each service owns and controls its data entirely. This leads to better scalability and fault tolerance because failures are isolated to individual services. However, it introduces strong coupling through synchronous calls when services need data from others.

:p What are the main drawbacks of the database-per-service topology?
??x
The main drawbacks include:
1. **High Service Coupling**: Services must make synchronous calls to other services to fetch data, which tightly couples them.
2. **Performance Degradation**: Synchronous communication slows down overall system performance.
3. **Complexity in Data Changes**: Since data is split into small bounded contexts, modifying database structures becomes harder due to dependencies like foreign keys, triggers, and views.
4. **Increased Communication Overhead**: Every data request between services requires explicit communication, increasing complexity and cost.

Example:
```java
// Service A needs inventory data from Service B
Inventory inventory = inventoryService.getInventory(productId); // synchronous call
```
This synchronous call introduces tight coupling between services and impacts performance.
x??

---

#### Service Coupling in Database-per-Service
In a database-per-service topology, service coupling occurs when one service makes a direct synchronous call to another to retrieve data. While this pattern promotes loose coupling at the domain level, it introduces tight coupling at the service level, which is contrary to the principles of event-driven architecture.

:p Why does database-per-service lead to high service coupling?
??x
In the database-per-service topology:
- Each service only owns its own data.
- When a service needs data from another, it must make a synchronous request.
- This synchronous interaction creates tight coupling between services.
- As a result, changes in one service may break dependent services, reducing modularity and agility.

For example, if the Order Placement Service calls the Inventory Service synchronously:
```java
boolean isAvailable = inventoryService.checkStock(productId);
```
If `inventoryService` is down or changes its API, `Order Placement Service` is affected.
x??

---

#### Fault Tolerance in Database-per-Service
The database-per-service topology enhances fault tolerance because each service's database is isolated. If one service fails, it does not affect other services. This makes the system more resilient and allows for better recovery mechanisms.

:p How does the database-per-service topology improve fault tolerance?
??x
In the database-per-service topology:
- Each service has its own database, so failures are isolated.
- If one service crashes or becomes unavailable, only that service is impacted.
- Other services continue to operate independently.
- This is in contrast to monolithic systems where a single failure can bring down the entire application.

Example:
$$
\text{Fault Tolerance} = \frac{\text{Number of Services}}{\text{Number of Failures}}
$$
If a system has 5 services and only one fails, the rest remain operational.
x??

---

#### Scalability in Database-per-Service
This topology supports high scalability and elasticity because each database scales independently with its associated service. As demand increases, only the necessary services and databases need to be scaled up, rather than scaling the entire system.

:p What makes database-per-service topology scalable?
??x
Scalability is improved in the database-per-service topology because:
- Each service and its database can scale independently.
- Resources are allocated based on service-specific needs.
- Load distribution is more efficient.
- Elasticity is supported, allowing dynamic scaling of individual components.

Example:
```java
// Scaling individual services
OrderPlacementService.scaleUp();
InventoryService.scaleUp();
PaymentService.scaleDown(); // Only this service scaled down
```
This granular scaling increases efficiency and reduces resource waste.
x??

---

#### Comparison with Monolithic Topology
The database-per-service topology is the exact opposite of a monolithic architecture. While monoliths share a single database and tightly couple services, the database-per-service approach decouples services at the data level. It offers better fault tolerance and scalability but at the cost of increased complexity and performance overhead.

:p How does database-per-service differ from monolithic topology in terms of pros and cons?
??x
| Aspect | Monolithic | Database-per-Service |
|--------|------------|-----------------------|
| Coupling | Low at data level, high at service level | High at service level |
| Performance | Faster due to shared DB | Slower due to sync calls |
| Fault Tolerance | Poor | Excellent |
| Scalability | Poor | Excellent |
| Data Management | Centralized | Decentralized |

Monolithic systems are simpler but less flexible, while database-per-service systems are more complex but highly scalable and fault-tolerant.
x??

---

#### Event-Driven Architecture vs Microservices
Though they may appear similar, EDA and microservices are distinct architectural styles. While both support scalability, agility, and fault tolerance, EDA uses events to communicate between services, whereas microservices typically use synchronous APIs or message queues.

:p What are the key differences between EDA and microservices?
??x
Key differences:
1. **Communication Style**:
   - EDA: Uses asynchronous events (e.g., publish-subscribe).
   - Microservices: Often use synchronous calls or RESTful APIs.

2. **Coupling**:
   - EDA: Loosely coupled via events.
   - Microservices: Can be tightly coupled via direct calls.

3. **Data Consistency**:
   - EDA: Eventual consistency.
   - Microservices: May use eventual or strong consistency models.

4. **Design Philosophy**:
   - EDA: Event-driven, reactive systems.
   - Microservices: Service-oriented, modular design.

Example:
```java
// EDA approach
eventPublisher.publish(new OrderPlacedEvent(orderId));

// Microservice approach
orderService.placeOrder(order);
```
In EDA, the `OrderPlacedEvent` is consumed by multiple services asynchronously, reducing coupling.
x??

---

---

