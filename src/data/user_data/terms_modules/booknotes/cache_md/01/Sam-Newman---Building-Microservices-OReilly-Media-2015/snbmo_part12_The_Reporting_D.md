# High-Quality Flashcards: Sam-Newman---Building-Microservices-OReilly-Media-2015_processed (Part 12)


**Starting Chapter:** The Reporting Database

---


#### Retrying Operations
Background context: Sometimes, operations that fail to insert into a warehouse’s picking table can be retried later. This approach is often used when dealing with long-lived business operations, ensuring eventual consistency rather than strict transactional consistency upon failure.

:p What is the retry strategy for failed operations?
??x
The retry strategy involves queuing up the operation and attempting it again at a later date. This approach leverages eventual consistency, where the system gets into a consistent state eventually without immediate guarantees.
```java
// Pseudocode example of retry mechanism
public void processOrder(Order order) {
    boolean success = false;
    
    while (!success && shouldRetry(order)) {
        try {
            insertIntoPickingTable(order);
            success = true;
        } catch (Exception e) {
            logError("Failed to process order: " + order, e);
            queueForRetryingLater(order);
            Thread.sleep(retryDelay); // Wait before retrying
        }
    }
    
    if (!success) {
        handleFailure(order);
    }
}
```
x??

---


#### Compensating Transactions
Background context: When an operation fails and cannot be retried, compensating transactions are used to undo the effects of a failed transaction. This ensures that the system remains in a consistent state despite individual failures.

:p What is a compensating transaction?
??x
A compensating transaction is a mechanism used to reverse or undo the changes made by a failed operation, bringing the system back into a consistent state. For example, if an order was placed but the corresponding pick instruction could not be inserted, issuing a `DELETE` statement on the order would compensate for the failure.

```java
// Pseudocode example of compensating transaction
public void handleOrderFailure(Order order) {
    try {
        // Simulate picking operation
        insertIntoPickingTable(order);
    } catch (Exception e) {
        logError("Failed to process order: " + order, e);
        
        // Compensate by removing the order from the database
        deleteFromOrderTable(order);
        
        notifyUserOfFailure();
    }
}
```
x??

---


#### Distributed Transactions and Two-Phase Commit
Background context: For operations involving multiple systems or databases, distributed transactions can ensure consistency across them. The two-phase commit (2PC) protocol is a common method used in this scenario.

:p What is the two-phase commit process?
??x
The two-phase commit process involves a preparatory phase and a commitment phase:
1. **Preparation Phase**: Each participant (e.g., databases or services) votes to either prepare for the transaction or abort.
2. **Commit Phase**: If all participants voted to prepare, they proceed with committing; otherwise, the transaction is aborted.

```java
// Pseudocode example of two-phase commit
public void performTwoPhaseCommit(TransactionManager manager) {
    // Preparation phase
    if (manager.prepare()) {
        // Commit phase
        if (manager.commit()) {
            logInfo("Transaction committed successfully.");
        } else {
            logError("Transaction failed during the commit phase.");
        }
    } else {
        logError("Transaction was not prepared.");
    }
}
```
x??

---

---


#### Distributed Transaction Voting Process
Background context: In a distributed transaction, each participant (cohort) communicates with the central transaction manager to decide whether it can proceed. The transaction manager aggregates these decisions and either commits or rolls back all transactions based on the outcome.
:p How does the voting process work in distributed transactions?
??x
In the voting process, every cohort (participant) in a distributed transaction independently decides if it thinks its local transaction can go ahead. This decision is sent to the central transaction manager. If all cohorts vote 'yes', the transaction manager commits all participants; if any participant votes 'no', the transaction manager rolls back all transactions.
The voting process ensures that only when consensus is reached among all participants does a commit occur, thus maintaining transaction integrity in a distributed system.

```java
// Pseudocode for Voting Process
public class TransactionManager {
    public void startVoting() {
        // Assume cohorts are stored as a list of Cohort objects
        List<Cohort> cohorts = getParticipants();
        
        // Each cohort makes its decision and sends to the manager
        Map<String, Boolean> votes = new HashMap<>();
        for (Cohort cohort : cohorts) {
            boolean voteResult = cohort.decide(); // Simulates voting logic
            votes.put(cohort.getName(), voteResult);
        }
        
        // Aggregate results from all participants
        if (votes.values().stream().allMatch(vote -> vote)) {
            commitTransactions(could);
        } else {
            rollbackTransactions();
        }
    }
}
```
x??

---


#### Central Coordination and Outages in Distributed Transactions
Background context: The voting process relies on central coordination, meaning that all parties must halt until the transaction manager tells them to proceed. This reliance can lead to issues during outages or when participants fail to respond.
:p What are the risks associated with relying on a single transaction manager for distributed transactions?
??x
The primary risk of relying on a single transaction manager is system availability and reliability. If the transaction manager fails or goes down, all pending transactions that require coordination will be stuck in an indefinite state, neither committed nor rolled back.

Furthermore, if any cohort fails to respond during the voting phase, the entire process can block, leading to potential deadlocks or inconsistent states across the distributed system. Additionally, even after a commit vote is given, failure of a participant to complete its transaction can leave the overall transaction in an uncertain state, violating the ACID properties.

```java
// Pseudocode for Handling Outages
public class TransactionManager {
    public void handleOutage() {
        if (isTransactionManagerDown()) {
            // Try to manually manage pending transactions or fallback to a simpler strategy
            // such as compensating retries or optimistic concurrency control.
            System.out.println("Transaction Manager is down, attempting manual recovery.");
            
            // Example of compensating retry logic
            for (Cohort cohort : cohorts) {
                try {
                    if (!cohort.isCompleted()) {
                        retry(cohort);
                    }
                } catch (Exception e) {
                    log.error("Failed to recover transaction", e);
                }
            }
        }
    }

    private void retry(Cohort cohort) {
        // Logic to attempt another round of voting or manual intervention
    }
}
```
x??

---


#### Complexity and Scalability Issues in Distributed Transactions
Background context: Distributed transactions introduce significant complexity due to the need for central coordination, which can lead to performance bottlenecks, lock contention, and overall system scalability issues. The use of compensating retry logic adds further layers of complexity.
:p Why are distributed transactions difficult to scale and maintain?
??x
Distributed transactions are inherently complex because they require centralized coordination among all participants. This coordination introduces several challenges:

1. **Centralization Bottleneck**: A single transaction manager handles the voting process, making it a critical point of failure that can become a bottleneck as the system scales.
2. **Lock Contention**: During the voting phase and execution, cohorts might hold locks on resources, leading to contention when multiple transactions attempt to access the same resource simultaneously. This can significantly degrade performance and make scaling difficult.
3. **Compensating Retry Logic**: In cases where a transaction fails after the initial commit vote, compensating retry logic must be implemented to fix inconsistencies. This adds complexity and can lead to more complex error handling mechanisms.

```java
// Pseudocode for Compensating Retry Logic
public class TransactionManager {
    public void handleCompensation() {
        Map<String, Boolean> votes = getVotes();
        
        if (votes.values().stream().anyMatch(vote -> !vote)) { // Check if any participant voted 'no'
            rollbackTransactions(); // Rollback all transactions
            
            for (Cohort cohort : cohorts) {
                tryCompensate(cohort);
            }
        } else {
            commitTransactions();
        }
    }

    private void tryCompensate(Cohort cohort) {
        // Logic to attempt compensation based on the state of the transaction
        if (!cohort.isCommitted()) {
            cohort.compensate(); // Attempt to roll back changes in case of failure
        }
    }
}
```
x??

---


#### Alternatives and Best Practices for Distributed Transactions
Background context: When considering distributed transactions, it's crucial to evaluate whether the operations truly require such complexity. Simplifying or avoiding the splitting of state can lead to more scalable and maintainable systems.
:p How should one approach designing a system that needs distributed transactions?
??x
When encountering business operations that currently occur within a single transaction, assess whether they genuinely need to be part of a distributed transaction. Consider if these operations can be broken down into smaller, local transactions that operate under the principle of eventual consistency.

This approach leverages simpler, more scalable mechanisms and reduces complexity by avoiding the pitfalls associated with centralized coordination. If state must remain consistent across multiple systems, ensure it is not fragmented to begin with. Create a concrete concept or entity (e.g., an "in-process-order") that represents the transaction end-to-end, providing a clear structure for managing transactions and their compensating actions.

```java
// Example of In-Process-Order Concept
public class OrderManager {
    public void processOrder(Order order) throws Exception {
        try {
            // Local transaction within one system or microservice
            orderService.placeOrder(order);
            
            // Simulate a long-running operation that might fail
            if (Math.random() < 0.1) {
                throw new RuntimeException("Simulated failure during processing");
            }
            
            // Further local operations
            billingService.chargeCustomer(order);
        } catch (Exception e) {
            // Handle exception and retry logic if necessary
            handleFailure(order, e);
        }
    }

    private void handleFailure(Order order, Exception cause) {
        // Log the failure and attempt to rollback or compensate as needed
        tryCompensate(order, cause);
    }

    private void tryCompensate(Order order, Exception cause) {
        if (order.isCommitted()) {
            orderService.rollbackOrder(order);
            billingService.refundCustomer(order);
        }
    }
}
```
x??

---

---


#### Reporting in Microservices Architecture
Background context: When splitting a service into smaller parts, we also need to consider how data is stored and managed. This becomes crucial for reporting use cases since traditional monolithic architectures store all data in one database, making it easier to generate reports.

:p What are the challenges faced when moving from a monolithic architecture to a microservices architecture regarding data storage and reporting?
??x
The challenges include:
1. **Shared Schema**: Changes in schema need careful management.
2. **Limited Optimization Options**: The database is optimized for either the live system or the reporting system, but not both.
3. **Database Choice Limitations**: Being constrained to a single type of database limits exploration of new options like graph databases (Neo4j) and column-oriented databases (Cassandra).

For example:
- In a monolithic architecture: 
```sql
SELECT gl.transaction_id, c.product_name, p.price
FROM general_ledger gl
JOIN catalog c ON gl.product_id = c.id
JOIN purchases p ON gl.purchase_id = p.id;
```
This SQL query joins data from the general ledger with descriptions and prices.

In a microservices architecture:
- You might need to use read replicas or even different databases for each service, leading to more complex reporting logic.
x??

---


#### Challenges in Microservices Reporting
Background context: When moving to a microservices architecture, data is split across multiple databases. This requires a different approach for generating reports since each service might have its own database schema and storage solution.

:p What are the downsides of using read replicas in monolithic architectures for reporting?
??x
The main downsides include:
1. **Shared Schema Impediment**: Changes to the shared schema can be difficult to coordinate.
2. **Limited Optimization**: The database cannot be optimized efficiently for both live use and reporting, often resulting in a compromise schema that is suboptimal for both purposes.

For example, if you have different services with distinct schemas:
```sql
// Service 1: General Ledger
SELECT * FROM general_ledger;

// Service 2: Catalog
SELECT * FROM catalog;
```
Generating a report that requires joining data from these two services becomes complex and potentially inefficient.
x??

---


#### Alternatives to Traditional Reporting Databases
Background context: As data storage in microservices architectures diversifies, traditional approaches to reporting may no longer be the best solution. There are multiple alternatives available to bring together data for reporting purposes.

:p What are some viable alternatives to the standard reporting database model?
??x
Some viable alternatives include:
1. **Unified Data Lake**: Centralize all data in a unified storage system like Hadoop or AWS S3, then use analytics tools like Apache Spark for querying.
2. **Event-Driven Architecture**: Use event streams (e.g., Kafka) to capture and aggregate events from different services for reporting.
3. **Data Mesh**: Implement a microservices approach where each service has its own data store but also shares a common data catalog.

For example, using a unified data lake:
```python
# Pseudo code for reading from a data lake in Python
from pyspark.sql import SparkSession

def read_data_lake():
    spark = SparkSession.builder.appName("ReportingApp").getOrCreate()
    df = spark.read.parquet("/path/to/data/lake")
    return df
```
x??

---

---


#### Batch APIs for Reporting Systems
Background context: The text suggests that traditional APIs might not be optimized for reporting needs. A potential solution is using batch APIs where a list of IDs can be passed to retrieve multiple records in one go.

:p How do batch APIs help with data retrieval for reporting?
??x
Batch APIs improve efficiency by allowing the calling system to pass a list of IDs and receive all relevant data in a single call, reducing the number of API requests. This is particularly useful when dealing with large volumes of data.

Example code:
```java
public class CustomerService {
    public void exportCustomers(List<CustomerID> ids, String location) {
        // Process batch request to fetch customers from the list and save file at given location
        File exportedData = new File(location);
        for (CustomerID id : ids) {
            CustomerDetails customer = fetchCustomerDetails(id);
            exportedData.append(customer.toString());
        }
    }
}
```
x??

---


#### Materialized Views for Aggregation
Explanation of using materialized views to reduce coupling and improve performance in relational databases. This technique allows the creation of a single monolithic reporting schema by exposing only the necessary data.

:p How can materialized views be used to mitigate database integration challenges?
??x
Materialized views can be utilized to create an aggregated view of data from multiple services within a single schema, thereby mitigating traditional DB integration challenges. By having one schema in the reporting database for each service and using materialized views, only the necessary data is exposed to the customer data pump.

This approach reduces coupling by isolating the reporting schema as a published API that is harder to change. However, its effectiveness depends on the capabilities of the chosen database.

```java
public class MaterializedView {
    private final ReportingDatabase reportingDatabase;
    private final ServiceSchema serviceSchema;

    public MaterializedView(ReportingDatabase reportingDatabase, ServiceSchema serviceSchema) {
        this.reportingDatabase = reportingDatabase;
        this.serviceSchema = serviceSchema;
    }

    public void createMaterializedView() {
        String query = "CREATE MATERIALIZED VIEW agg_data AS SELECT * FROM service_schema";
        reportingDatabase.execute(query);
    }
}
```
x??

---

---

