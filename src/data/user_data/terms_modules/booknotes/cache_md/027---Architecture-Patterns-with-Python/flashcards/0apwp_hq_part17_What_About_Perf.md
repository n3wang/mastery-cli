# High-Quality Flashcards: 027---Architecture-Patterns-with-Python_processed (Part 17)

**Starting Chapter:** What About Performance

---

#### Aggregate Pattern and Performance Considerations
The Aggregate pattern is a design principle in domain-driven design (DDD) that groups related entities and value objects into a single unit, ensuring consistency and simplifying data access. In the context of inventory allocation, the `Product` aggregate includes `Batch` entities. This approach helps manage performance by reducing the number of database queries and transactions, as data is loaded and updated in bulk.

The performance benefits come from minimizing database round trips, which is especially important in systems that evolve over time and may become complex if not modeled properly. For example, instead of querying for individual batches repeatedly, we load all relevant batches in one go. Since each batch is small (a few strings and integers), loading hundreds of batches is still efficient.

:p What are the performance advantages of using the Aggregate pattern in database modeling?
??x
The Aggregate pattern reduces the number of database queries and transactions by grouping related data. It avoids the need for many ad-hoc queries, which can slow down performance as software evolves. Additionally, since data structures are minimal, loading large numbers of entities is fast. In this case, loading all batches for a product is acceptable because there are only a few active batches per product.
$$
\text{Performance} \propto \frac{1}{\text{Number of Queries}}
$$
```java
// Example: Loading all batches for a product in one query
Product product = uow.products.get(sku = line.sku);
// product.batches contains all relevant batches
```
x??

---

#### Lazy Loading for Large Datasets
When dealing with large datasets, such as thousands of active batches per product, lazy loading can be used to avoid loading all data at once. This technique allows the system to fetch data on-demand, improving performance by reducing memory usage and initial load times. SQLAlchemy supports lazy loading, where batches are fetched only when needed.

:p How can lazy loading improve performance when handling large aggregates?
??x
Lazy loading improves performance by fetching only the required data when needed, rather than loading all entities upfront. For example, if a product has thousands of batches, we can load only the necessary ones during allocation. This approach reduces memory consumption and speeds up initial access, especially in systems where not all data is accessed during a single operation.
$$
\text{Memory Usage} \propto \text{Number of Entities Fetched}
$$
```python
# Example: Lazy loading batches in SQLAlchemy
class Product(Base):
    __tablename__ = 'products'
    batches = relationship("Batch", lazy="select")
```
x??

---

#### Batch Allocation Logic
In the `allocate` function, a `Product` aggregate is retrieved, and a batch is selected based on capacity. The `Product.allocate()` method is called to assign the order line to an appropriate batch. This process ensures that the allocation respects inventory constraints and maintains consistency within the aggregate.

:p How does the allocation logic ensure consistency within the Product aggregate?
??x
The allocation logic ensures consistency by first retrieving the `Product` aggregate, which contains all its `Batch` entities. Then, the `Product.allocate()` method is invoked, which selects an appropriate batch based on availability. This keeps the state of the aggregate consistent and avoids race conditions. The use of a single transaction ensures atomicity of the operation.
$$
\text{Allocation Success} \iff \exists \text{ batch } b \text{ such that } b.available \geq \text{ order quantity}
$$
```python
def allocate(orderid: str, sku: str, qty: int, uow: unit_of_work.AbstractUnitOfWork) -> str:
    line = OrderLine(orderid, sku, qty)
    with uow:
        product = uow.products.get(sku=line.sku)
        if product is None:
            raise InvalidSku(f'Invalid sku {line.sku}')
        batchref = product.allocate(line)
        uow.commit()
    return batchref
```
x??

---

#### Handling Invalid SKUs
The `allocate` function checks whether the SKU exists in the system. If the SKU is invalid, an `InvalidSku` exception is raised. This validation ensures data integrity and prevents processing orders for non-existent products.

:p What happens if an invalid SKU is passed to the allocate function?
??x
If an invalid SKU is passed, the `allocate` function raises an `InvalidSku` exception. This prevents the system from proceeding with an order for a product that doesn't exist, maintaining data integrity and ensuring only valid SKUs are processed.
$$
\text{SKU Validity} = \text{exists}(sku \in \text{products})
$$
```python
if product is None:
    raise InvalidSku(f'Invalid sku {line.sku}')
```
x??

---

#### Implementing Product Aggregate
To implement the `Product` aggregate, we must define the relationship between `Product` and `Batch`, and implement the `allocate` method that selects a suitable batch for a given order line. The aggregate must encapsulate all logic for managing inventory and batch allocation.

:p What are the key steps to implement a Product aggregate?
??x
To implement a `Product` aggregate, define the relationship between `Product` and `Batch`, implement the `allocate` method to find a batch with sufficient capacity, and ensure that all operations are consistent within the aggregate. This includes handling batch selection, updating inventory, and ensuring atomicity of changes.
$$
\text{Batch Selection} = \arg\max_{b \in \text{batches}} (b.available \geq \text{required quantity})
$$
```python
class Product:
    def __init__(self, sku: str):
        self.sku = sku
        self.batches = []

    def allocate(self, line: OrderLine) -> str:
        for batch in self.batches:
            if batch.available >= line.qty:
                batch.allocate(line)
                return batch.reference
        raise OutOfStockError("No batch available")
```
x??

---

#### Versioning and SQLAlchemy Integration
In more advanced systems, version numbers can be used to prevent concurrent updates from overwriting each other. SQLAlchemy supports optimistic locking via version columns, which automatically increment when a record is updated. This ensures consistency when multiple processes try to modify the same data.

:p How can SQLAlchemy help manage versioning in aggregates?
??x
SQLAlchemy supports optimistic locking using version columns. When a record is updated, the version number increments, and if a concurrent update occurs, it will fail with a version mismatch. This prevents lost updates and maintains consistency in multi-user environments.
$$
\text{Version Check} = \text{old\_version} == \text{current\_version}
$$
```python
class Product(Base):
    __tablename__ = 'products'
    version = Column(Integer, default=1)
    # other fields
```
x??

---

#### Optimistic Concurrency with Version Numbers
Optimistic concurrency control is a strategy used in database systems to manage concurrent access to data without using locks. Instead of locking rows or tables, it allows multiple transactions to proceed and only checks for conflicts at commit time. This is particularly useful in high-throughput systems where locking would cause performance bottlenecks. The version number approach is one way to implement this. Each record has a version number that increments with every update. When a transaction tries to update a record, it must provide the current version number; if the version number has changed since the transaction started, the update is rejected.

:p What is the core idea behind optimistic concurrency control using version numbers?
??x
The core idea is to allow concurrent reads and writes without locking, but enforce consistency by checking if a record has been modified since it was read. This is done using a version number field. If a transaction attempts to update a record with an outdated version number, the update is rejected. For example, if two transactions read a product with version=3, and both try to update it, only one will succeed in updating it to version=4. The other will fail with a concurrency error.

```java
// Example of optimistic locking in a product update
public class Product {
    private Long id;
    private Integer version;
    private String name;

    public boolean updateAllocation(List<Batch> batches) {
        // Simulate read
        Product product = getProductById(id);
        if (product.getVersion() != version) {
            throw new OptimisticLockException("Product has been modified");
        }
        // Simulate write
        updateProductVersion(id, version + 1);
        return true;
    }
}
```
x??

---

#### Implementing Optimistic Locking in a Database
To implement optimistic locking, a version number is added to each row in the database. When a transaction reads a record, it also reads the version number. When updating, the transaction must include the version number in the WHERE clause of the UPDATE statement. If the version number in the database does not match the one provided, the update fails. This ensures that only one transaction can successfully update the record at a time, avoiding race conditions. This approach is efficient because it avoids holding locks for long periods.

:p How does optimistic locking using version numbers work at the database level?
??x
At the database level, optimistic locking works by including a version number in the UPDATE statement. For example, if a product with version=3 is being updated, the SQL statement might look like:

```sql
UPDATE products 
SET name = 'New Name', version = version + 1 
WHERE id = 1 AND version = 3;
```

If another transaction has already updated the product to version=4, this UPDATE will not affect any rows, and the application will detect that the update failed due to a concurrency conflict.

This mechanism ensures data integrity without holding locks, which improves performance.
x??

---

#### Why Not Use Serializable Isolation Level?
While serializable isolation level prevents all concurrency issues, it is often too expensive in terms of performance. It forces transactions to wait for each other, leading to high latency and reduced throughput. Optimistic concurrency with version numbers provides a better balance by allowing transactions to proceed concurrently and only checking for conflicts at commit time. This is more scalable and suitable for systems with high read-to-write ratios.

:p Why is serializable isolation not preferred for optimistic concurrency?
??x
Serializable isolation level ensures that transactions are executed in a way that is equivalent to running them one at a time, preventing all concurrency anomalies. However, this comes at a high performance cost because it often requires locking, which can lead to contention and blocking. In contrast, optimistic concurrency with version numbers allows concurrent access and only detects conflicts at commit time, reducing lock contention and improving throughput.

Example of a problematic serializable scenario:
```sql
BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;
SELECT * FROM products WHERE id = 1; -- Locks the row
UPDATE products SET name = 'Updated' WHERE id = 1; -- May block other transactions
COMMIT;
```

With version numbers, no locking is required during the read phase.
x??

---

#### Version Numbers Make Implicit Concepts Explicit
Using version numbers makes the concept of data consistency explicit in the code and database schema. Instead of relying on implicit locking or other mechanisms, version numbers provide a clear signal that a record has been modified. This makes the code easier to reason about and debug. It also makes it easier to implement retry logic for failed updates, as the application can detect that a conflict occurred and retry the operation.

:p How do version numbers improve code clarity and debugging in concurrent systems?
??x
Version numbers make the concept of data modification explicit. Rather than relying on implicit locking or other mechanisms, version numbers clearly indicate when a record has changed. This makes it easier to detect and handle conflicts. For example, if a transaction fails due to a version mismatch, the application knows exactly what went wrong. This also allows for retry logic, where a failed update can be retried after re-reading the data.

Example of handling a version mismatch:
```java
try {
    product.updateAllocation(batches);
} catch (OptimisticLockException e) {
    // Retry logic
    product = getProductById(productId);
    product.updateAllocation(batches);
}
```
x??

---

#### Version Number Implementation in Domain Layer
A version number can be implemented in the domain layer, where it is part of the `Product` aggregate. The `Product` class maintains a `version_number`, and each time a change occurs (e.g., allocation), the version is incremented. This keeps the logic centralized and makes it clear that versioning is part of the business logic.

:p How is version number implemented in the domain layer?
??x
In the domain layer, version numbers are part of the `Product` class. When an allocation occurs, the version number is incremented in the `allocate` method. This approach keeps versioning logic within the domain, making it explicit and easy to manage.
x??

---

#### Retry Logic in Concurrent Systems
When a conflict occurs in optimistic locking, the system typically retries the operation from the start. This ensures that any changes made by other threads are taken into account. For example, if a product's stock is updated by another thread, the retry will load the new state and attempt the allocation again.

:p How does retry logic work in optimistic concurrency control?
??x
Retry logic in optimistic concurrency control involves reloading the data and re-executing the operation. If a conflict is detected (e.g., due to a version mismatch), the system retries the operation from the beginning. This ensures that any updates from other concurrent threads are considered in the retry.
x??

---

#### Comparison of Version Number Implementation Approaches
There are three main approaches to implementing version numbers:
1. In the domain layer: Version is managed by the `Product` class.
2. In the service layer: The service layer increments the version before committing.
3. In the infrastructure layer: The Unit of Work or repository handles versioning automatically.

:p What are the three approaches to implementing version numbers, and which is preferred?
??x
The three approaches are:
1. Domain layer: Version is managed by the `Product` class.
2. Service layer: The service layer increments version before committing.
3. Infrastructure layer: The UoW or repository handles versioning automatically.
The domain layer approach is preferred because it keeps versioning logic clear and explicit, avoiding mixing responsibilities between layers.
x??

---

#### Example of Conflict Detection with Version Numbers
If two threads attempt to allocate stock for the same product, and both load version 1, one will succeed and increment the version to 2. The second thread will detect that the version has changed and must retry the operation. If enough stock remains, the second thread succeeds; otherwise, it throws an `OutOfStock` exception.

:p How does version number help detect conflicts in concurrent operations?
??x
When two threads load a product at the same version (e.g., version 1), and one successfully updates it, the version is incremented. If the second thread tries to commit with the old version, the system detects the mismatch and fails the commit. This forces the second thread to retry, ensuring consistency.
x??

---

