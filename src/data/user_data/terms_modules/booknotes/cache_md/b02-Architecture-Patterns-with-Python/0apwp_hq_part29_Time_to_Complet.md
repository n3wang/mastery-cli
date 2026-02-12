# High-Quality Flashcards: 027---Architecture-Patterns-with-Python_processed (Part 29)

**Starting Chapter:** Time to Completely Jump the Shark

---

#### Raw SQL in Views
When building applications, especially those using a domain-driven design approach, developers often rely on ORMs and repositories to abstract database interactions. However, in some cases, particularly for read-heavy operations like views, developers may opt to write raw SQL directly. This approach bypasses the repository abstraction and directly queries the database using SQL strings, which can be more efficient and flexible for complex queries involving joins.

:p Why might a developer choose to use raw SQL in a view function instead of the repository pattern?
??x
Using raw SQL in views allows for more control over the query execution, especially for complex joins or aggregations that are cumbersome or inefficient to express using an ORM. It also avoids the overhead of mapping objects and can be faster for read-only operations. The repository pattern is more suited for write operations or when the domain model needs to be preserved, but for read-heavy views, direct SQL can be a pragmatic choice. In the example, the function `allocations` executes a raw SQL query to join `allocations`, `batches`, and `order_lines` tables to fetch allocation data for a specific order.
```python
def allocations(orderid: str, uow: unit_of_work.SqlAlchemyUnitOfWork):
    with uow:
        results = list(uow.session.execute(
            'SELECT ol.sku, b.reference'
            ' FROM allocations AS a'
            ' JOIN batches AS b ON a.batch_id = b.id'
            ' JOIN order_lines AS ol ON a.orderline_id = ol.id'
            ' WHERE ol.orderid = :orderid',
            dict(orderid=orderid)
        ))
    return [{'sku': sku, 'batchref': batchref} for sku, batchref in results]
```
x??

---

#### Command-Query Separation (CQS)
Command-Query Separation is a principle that distinguishes between methods that perform an action (commands) and those that return data (queries). In software architecture, especially in systems using CQRS (Command Query Responsibility Segregation), this separation is enforced to improve clarity, maintainability, and scalability. Commands modify state and typically return nothing, while queries return data without side effects.

:p How does Command-Query Separation apply to the codebase described in the text?
??x
In the codebase, commands such as `CreateBatch` and `Allocate` modify the system state and are handled by event handlers, which are part of the command side. The view functions like `allocations` are read-only and return data without modifying the state, forming the query side. This clear distinction helps in organizing the codebase, making it easier to test and reason about. The `views.allocations` function is a query that retrieves allocation data for an order, following the principle that queries should not alter the system state.
x??

---

#### CQRS and Read-Only Views
CQRS (Command Query Responsibility Segregation) is a pattern that separates the operations that read data from those that write data. In this approach, read operations are often decoupled from write operations, which can lead to better performance, scalability, and maintainability. Views in CQRS are typically read-only and can be optimized for querying, often using raw SQL or specialized read models.

:p How does the use of raw SQL in views align with the principles of CQRS?
??x
In CQRS, views are optimized for read operations and are often implemented separately from the command side. Using raw SQL in views aligns with this because it allows for direct, efficient querying of the database tailored to the view's needs. It avoids the overhead of domain model mapping and leverages database strengths for complex queries. This supports the CQRS principle that read and write operations should be optimized independently, with read operations using the most efficient data access patterns.
x??

---

#### Repository Pattern vs Raw SQL
The repository pattern abstracts the data access layer, providing a cleaner separation between domain logic and database concerns. It typically encapsulates the logic for fetching and persisting domain objects. However, in some cases—especially for read-heavy views—using raw SQL directly may be more efficient or expressive than going through the repository abstraction.

:p What are the trade-offs between using a repository pattern and raw SQL in a view function?
??x
The repository pattern provides abstraction, consistency, and ease of testing, but can be less efficient for complex queries or when performance is critical. Raw SQL allows for more control, better performance for complex joins, and direct access to database features, but it reduces abstraction and increases the risk of SQL injection if not handled carefully. For views, where performance and flexibility are often more critical, raw SQL may be preferred despite the loss of abstraction.
x??

---

#### Repository Helper Method for Order Allocations
When building a system that needs to retrieve allocation information for a specific order, it’s often useful to add helper methods to existing repositories. In this case, we introduce a `.for_order()` method on the `products` repository to fetch all products associated with a given order ID. This allows us to build a view function that retrieves relevant batch references for the order.

The logic involves:
1. Fetching products using `uow.products.for_order(orderid=orderid)`
2. Flattening all batches from those products
3. Filtering batches to only those that are allocated to the given order

:p What is the purpose of adding a `.for_order()` helper method to the repository?
??x
The `.for_order()` helper method simplifies querying for all products related to a specific order. It encapsulates the logic of fetching products and then extracting their batches, making the view function cleaner and more focused on presentation logic. It also abstracts away the complexity of navigating the domain model, keeping tests decoupled from implementation details.

```python
def allocations(orderid: str, uow: unit_of_work.AbstractUnitOfWork):
    with uow:
        products = uow.products.for_order(orderid=orderid)
        batches = [b for p in products for b in p.batches]
        return [
            {'sku': b.sku, 'batchref': b.reference}
            for b in batches
            if orderid in b.orderids
        ]
```
x??

---

#### Batch Allocation Tracking via `orderids` Property
In the domain model, each `Batch` object tracks which orders it has been allocated to. To support filtering of batches by order, we implement a property `orderids` on the `Batch` class. This property aggregates all order IDs from the batch’s allocations using a set comprehension.

:p Why is a `orderids` property added to the `Batch` class?
??x
The `orderids` property allows us to quickly determine which orders a batch has been allocated to without manually iterating through allocations. This is essential for filtering batches in the `allocations` view function. It provides an efficient way to query the domain model for read operations, even though the model was primarily designed for write operations.

$$
\text{orderids} = \{ l.orderid \mid l \in \text{self._allocations} \}
$$

```python
class Batch:
    ...
    @property
    def orderids(self):
        return {l.orderid for l in self._allocations}
```
x??

---

#### Domain Model Optimization for Read vs Write Operations
Domain models are typically optimized for write operations, such as managing state transitions and enforcing business rules. However, read-heavy operations often require different structures or optimizations that aren’t naturally supported by a write-optimized model.

:p Why does reusing a domain model for read operations feel clunky?
??x
Because domain models are built around business workflows and rules, they are not inherently optimized for efficient querying. Read-heavy operations like filtering or aggregating data across entities require loops and filtering in Python, which are inefficient compared to what a database could do natively. This mismatch leads to performance bottlenecks and awkward code.

$$
\text{Read Performance} \propto \frac{1}{\text{Database Efficiency}}
$$

This issue highlights the need for patterns like CQRS (Command Query Responsibility Segregation), where separate models are used for reads and writes.
x??

---

#### CQRS Justification Based on Domain Complexity
CQRS is often justified when domain logic becomes complex, making it difficult to maintain a single model that works well for both reads and writes. In simple CRUD applications, a unified model may suffice, but in complex domains, separating concerns improves maintainability and performance.

:p How does domain complexity influence the decision to use CQRS?
??x
In complex domains, a single domain model may become cumbersome for both reads and writes. As complexity grows, it becomes harder to optimize a single model for both operations. CQRS addresses this by using distinct models for commands (writes) and queries (reads), allowing each to be optimized independently.

Example: A domain with many state transitions and validation rules might benefit from a command model, while a read model can be optimized for fast querying.
x??

---

#### SELECT N+1 Problem in ORMs
The SELECT N+1 problem is a common performance issue in ORMs where a query retrieves a list of objects and then issues an additional query for each individual object to fetch related data. This can lead to significant performance degradation, especially when dealing with foreign-key relationships. For example, if you fetch 100 orders and each order has a related customer, the ORM might perform 101 queries: 1 to get the orders and 100 to get the customers.

:p What is the SELECT N+1 problem in ORMs and why is it a concern?
??x
The SELECT N+1 problem occurs when an ORM retrieves a list of objects and then performs an additional query for each object to fetch related data. This leads to a large number of database round trips, which can severely degrade performance. For example, fetching 100 orders with related customer data could result in 101 queries (1 for orders, 100 for customers). Although SQLAlchemy is quite good at avoiding this issue, explicit eager loading can help prevent it when needed.
x??

---

#### ORM vs Raw SQL Performance Trade-offs
While ORMs like SQLAlchemy offer convenience and abstraction, they can sometimes introduce performance bottlenecks, especially when complex joins are involved. Raw SQL gives more control over query execution and can be more efficient, particularly in read-heavy scenarios. However, writing and maintaining raw SQL can be more error-prone and harder to read.

:p How do ORMs compare to raw SQL in terms of performance and maintainability?
??x
ORMs abstract database operations and can simplify development, but they may introduce performance issues like SELECT N+1 or inefficient query generation. Raw SQL allows fine-grained control and often better performance, especially for complex queries or read-heavy workloads. However, raw SQL requires more careful handling and is harder to maintain. The choice depends on the balance between development speed and performance needs.
x??

---

#### Read Replica and Horizontal Scaling
Read replicas are copies of the database used for read operations, allowing horizontal scaling of read-heavy systems. Unlike write operations, which require locks and can cause contention, read operations can be distributed across multiple replicas, improving scalability and performance.

:p How do read replicas enable horizontal scaling in database systems?
??x
Read replicas are copies of the database used for read-only operations, allowing multiple clients to query simultaneously without locking the primary database. This enables horizontal scaling of read-heavy workloads. Since there’s no write contention, you can add as many replicas as needed. However, replicas may be eventually consistent, so they are suitable for read-heavy systems where slight delays in synchronization are acceptable.
x??

---

#### Event-Driven Architecture for Read Model Synchronization
Event-driven architecture can be used to keep denormalized read models in sync with the primary database. When changes occur in the write model, events are emitted, and listeners update the read model accordingly. This decouples the read and write sides and avoids reliance on database-specific features like triggers.

:p How does event-driven architecture help synchronize read models?
??x
In event-driven architectures, changes to the write model emit events that are consumed by read model updaters. This approach decouples the read and write sides, avoids database-specific features like triggers, and allows for more flexible and scalable solutions. For example, when a batch is allocated, an event can be emitted to update the `allocations_view` table, ensuring consistency without relying on triggers or materialized views.
x??

---

#### Performance Benefits of Direct Table Queries
Direct table queries (e.g., `SELECT * FROM mytable WHERE key = :value`) are typically the fastest because they avoid joins and complex logic. They are efficient for point lookups, especially when indexed properly.

:p Why are direct table queries faster than joins in relational databases?
??x
Direct table queries like `SELECT * FROM mytable WHERE key = :value` are faster because they avoid expensive operations like joins, which require scanning multiple tables. They leverage indexes effectively and minimize CPU usage. In contrast, joins involve complex operations that consume more resources, especially in large datasets. Direct queries are ideal for read-heavy, indexed lookups.
x??

---

#### Event Handler Registration for Read Model Updates
When implementing event-driven architectures, it's essential to register event handlers that update read models. In this case, we're extending the `EVENT_HANDLERS` dictionary to include a new handler for the `Allocated` event that updates a read model.

The `EVENT_HANDLERS` dictionary maps events to lists of handler functions. For the `Allocated` event, we add two handlers: one for publishing the event and another for updating the read model.

:p What is the purpose of registering multiple handlers for the Allocated event?
??x
The purpose is to decouple the core business logic from read model updates. One handler publishes the event for other services to consume, while the other updates the read model to reflect the allocation. This ensures that the system remains consistent and that downstream consumers can query the current state without blocking the main business flow.
$$
\text{EVENT\_HANDLERS}[Allocated] = [\text{publish\_allocated\_event}, \text{add\_allocation\_to\_read\_model}]
$$
This pattern supports the CQRS (Command Query Responsibility Segregation) pattern where commands modify state and queries read from optimized views.
```python
EVENT_HANDLERS = {
    events.Allocated: [
        handlers.publish_allocated_event,
        handlers.add_allocation_to_read_model
    ],
    events.Deallocated: [
        handlers.remove_allocation_from_read_model,
        handlers.reallocate
    ]
}
```
x??

---

#### Read Model Consistency and Eventual Consistency
The read model updates are implemented using event handlers, which follow an eventual consistency model. Changes made in response to events are not immediately visible but are guaranteed to be consistent over time.

:p Why is eventual consistency acceptable for read models in event-driven systems?
??x
In event-driven systems, read models are often updated asynchronously in response to events, ensuring eventual consistency. This approach decouples the write and read sides, allowing for better scalability and performance. While there may be a delay between an event being processed and the read model being updated, this is acceptable for most use cases where real-time consistency is not required. The system guarantees that all events will be processed and the read model will eventually reflect the correct state.
$$
\text{Event} \rightarrow \text{Handler} \rightarrow \text{Read Model Update}
$$
This model allows for horizontal scaling of read models and improves the overall responsiveness of the system.
x??

---

---

#### Event-Driven Read Model Reconstruction
In event-sourced systems, read models are often built from events emitted by the write model. If a read model becomes stale due to a bug or outage, it can be rebuilt from the current state of the write model using a reconstruction tool. This process ensures system consistency even when asynchronous updates fail.

:p What is the purpose of rebuilding a read model from scratch?
??x
Rebuilding a read model ensures consistency in the system by reconstructing the read model's state from the current write model. It involves querying the write side to determine the current allocations and then calling handlers to update each item in the read model. This technique allows for recovery from failures without losing data integrity.
$$
\text{Rebuild Read Model} = \text{Query Write Model} \rightarrow \text{Invoke Handlers}
$$
```python
# Pseudocode for rebuilding read model
def rebuild_read_model():
    current_allocations = query_write_model()
    for item in current_allocations:
        add_allocation_to_read_model(item)
```
x??

---

#### Asynchronous Updates and Failure Handling
In systems with separate write and read models, events are used to propagate changes. If an event fails to update the read model, it can lead to inconsistency. However, since the write model is the source of truth, the system can detect and correct such inconsistencies through tools or processes that reprocess events or rebuild the read model.

:p How does the system handle failures in read model updates?
??x
Failures in read model updates are handled by treating them as recoverable inconsistencies. The system can detect that the read model is out of sync and rebuild it from the write model. Since events are the source of truth, the system can replay or reprocess events to ensure the read model reflects the correct state.
$$
\text{Failure} \rightarrow \text{Rebuild Read Model} \rightarrow \text{Restore Consistency}
$$
```python
# Example: Handling event failure
def handle_event_failure(event):
    if not update_read_model(event):
        rebuild_read_model_from_write_side()
```
x??

---

#### Flexibility in Read Model Implementation
An event-driven architecture allows for easy switching between different storage engines for read models. For example, a read model originally stored in a database can be migrated to Redis without changing the core logic or integration tests, as long as the abstraction layer remains consistent.

:p How does an event-driven architecture support changing read model storage engines?
??x
By abstracting the read model access through service layers, switching storage engines like from a database to Redis is straightforward. Handlers are updated to use the new backend (e.g., Redis), and the view logic adapts slightly to fetch data from the new storage. The core logic and tests remain unchanged, ensuring decoupling and reusability.
$$
\text{Storage Change} = \text{Update Handlers} + \text{Adapt View Layer}
$$
```python
# Example: Redis-based read model handler
def add_allocation_to_read_model(event):
    redis_eventpublisher.update_readmodel(event.orderid, event.sku, event.batchref)
```
x??

---

#### Integration Tests and Abstraction
Integration tests written at a high level of abstraction ensure that changes to the read model implementation do not break existing functionality. These tests validate behavior rather than implementation details, allowing flexibility in backend choices.

:p Why do integration tests remain valid when changing read model storage?
??x
Integration tests are written at a level of abstraction that decouples them from the underlying storage engine. As long as the interface remains consistent, tests validate the expected behavior, not the specific implementation. This allows for seamless migration between storage engines without needing to rewrite tests.
$$
\text{Test Validity} = \text{Abstraction} \rightarrow \text{Decoupled Implementation}
$$
```python
# Example: Integration test remains unchanged
def test_allocation_view():
    # Validates behavior, not storage details
    assert view.allocations("order123") == expected_result
```
x??

---

