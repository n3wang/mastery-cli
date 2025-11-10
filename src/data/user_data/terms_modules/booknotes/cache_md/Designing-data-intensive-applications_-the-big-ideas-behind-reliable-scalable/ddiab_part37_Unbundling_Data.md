# High-Quality Flashcards: Designing-data-intensive-applications_-the-big-ideas-behind-reliable-scalable_processed (Part 37)


**Starting Chapter:** Unbundling Databases. Composing Data Storage Technologies

---


#### Database vs. Operating System Fundamentals
Background context explaining how databases and operating systems manage data. Both store data but serve different purposes: filesystems manage files, while databases handle structured records.

:p How do databases and operating systems fundamentally differ in managing data?
??x
Databases typically store structured data (e.g., rows in tables, documents) and provide higher-level abstractions like SQL for querying and processing this data. Operating systems' file systems store data as files and are more focused on low-level file operations.

```java
// Example of a simple database query using Java with JDBC
import java.sql.*;

public class DatabaseExample {
    public static void main(String[] args) {
        try (Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/mydb", "user", "pass")) {
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM users WHERE age > 25");
            while (rs.next()) {
                System.out.println(rs.getString("name"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
```
x??

---

#### Unix and Relational Databases
Explanation of the philosophical differences between Unix and relational databases. Unix provides a low-level hardware abstraction, while relational databases offer high-level abstractions with powerful infrastructure.

:p What are the key philosophical differences between Unix and relational databases?
??x
Unix views its purpose as providing programmers with a logical but fairly low-level hardware abstraction. Relational databases aim to give application programmers a high-level abstraction that hides complexities like data structures on disk, concurrency, crash recovery, etc.

```java
// Example of using pipes in Unix-like systems
import java.io.*;

public class PipeExample {
    public static void main(String[] args) throws IOException {
        ProcessBuilder pb = new ProcessBuilder("ls", "-l");
        Process process = pb.start();
        
        InputStream inputStream = process.getInputStream();
        BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
        
        String line;
        while ((line = reader.readLine()) != null) {
            System.out.println(line);
        }
    }
}
```
x??

---

#### Secondary Indexes
Explanation of secondary indexes and how they allow efficient searching based on field values.

:p What are secondary indexes, and why are they important in databases?
??x
Secondary indexes provide a way to efficiently search for records based on the value of a specific field without scanning all records. They improve query performance by storing an index that maps fields to record IDs.

```java
// Pseudocode for creating a secondary index
function createSecondaryIndex(tableName, columnIndex) {
    indexMap = {}
    
    // Iterate over each row in the table
    for (row in tableName.rows) {
        fieldValue = row[columnIndex]
        
        if (indexMap.containsKey(fieldValue)) {
            indexMap[fieldValue].append(row.id)
        } else {
            indexMap[fieldValue] = [row.id]
        }
    }
    
    // Store indexMap to a separate structure for quick lookups
}
```
x??

---

#### Materialized Views
Explanation of materialized views and their role as precomputed caches of query results.

:p What are materialized views, and how do they benefit database performance?
??x
Materialized views store the result of a query as a precomputed cache. This reduces the need to execute complex queries repeatedly, improving performance by providing quick access to frequently queried data.

```java
// Pseudocode for maintaining a materialized view
function maintainMaterializedView(viewName, baseQuery) {
    oldResult = getExistingResultForView(viewName)
    
    // Execute the query and store results
    newResult = executeQuery(baseQuery)
    
    if (newResult != oldResult) {
        updateCache(viewName, newResult)
        notifySubscribers(viewName)
    }
}
```
x??

---

#### Replication Logs
Explanation of replication logs and how they keep copies of data up to date across nodes.

:p What are replication logs, and why are they important for distributed systems?
??x
Replication logs maintain consistent copies of data on multiple nodes. They ensure that changes made in one node are propagated to other nodes, maintaining consistency across the system.

```java
// Pseudocode for implementing a simple replication log
function applyChangesToLog(changes) {
    // Append changes to the end of the log file
    appendToFile(replicationLogFile, changes)
    
    // Notify all subscribers about new changes
    notifySubscribers()
}

function handleReplicationLog() {
    while (true) {
        change = readFromLog(replicationLogFile)
        
        if (change != null) {
            applyChange(change)
            removeProcessedChange(change)
        }
    }
}
```
x??

---

#### Full-Text Search Indexes
Explanation of full-text search indexes and their role in enabling keyword searches.

:p What are full-text search indexes, and why are they useful?
??x
Full-text search indexes enable efficient keyword-based searches on text data. They improve the performance of complex queries by storing inverted indices that map keywords to document IDs.

```java
// Pseudocode for building a simple full-text search index
function buildIndex(documents) {
    index = {}
    
    // Iterate over each document and its words
    foreach (doc in documents) {
        words = tokenize(doc.text)
        
        foreach (word in words) {
            if (index.containsKey(word)) {
                index[word].add(doc.id)
            } else {
                index[word] = [doc.id]
            }
        }
    }
    
    // Store the index for quick lookup
}
```
x??

---


#### Creating an Index Process

When you run `CREATE INDEX` to create a new index, the database must perform several steps. It first takes a consistent snapshot of the table, extracts and sorts the indexed field values, writes them out as the index. After this, it processes any pending write operations that happened since taking the consistent snapshot (assuming the table was not locked during index creation). The database also needs to keep the index updated whenever there are transactions writing to the table.

The process is similar to setting up a new follower replica or bootstrapping change data capture in a streaming system. Essentially, it reprocesses the existing dataset and derives the index as a new view onto the data. The existing data can be considered a snapshot of state rather than a log of all changes.

:p What does running `CREATE INDEX` involve in terms of database operations?
??x
Running `CREATE INDEX` involves several steps:
1. Taking a consistent snapshot of the table.
2. Extracting and sorting the indexed field values from the table data.
3. Writing out these sorted values as the index.
4. Processing any pending write operations that occurred since taking the snapshot.
5. Keeping the index updated whenever there are transactions writing to the table.

The process is akin to setting up a new follower replica or bootstrapping change data capture in a streaming system, effectively reprocessing and indexing an existing dataset.
x??

---

#### Federated Databases

Federated databases provide a unified query interface to multiple underlying storage engines and processing methods. This approach allows applications to access specialized data models or query interfaces directly while also enabling users to combine data from different sources via the federated interface.

The main advantage is that it follows the relational tradition of an integrated system with a high-level query language, yet it has a complex implementation due to managing multiple storage engines and processing methods.

:p How does a federated database unify reads across various storage engines?
??x
A federated database unifies reads by providing a single unified query interface that can access data from multiple underlying storage engines. Applications can use this interface to directly access the specialized data models or query interfaces of individual storage engines, while users can combine data from different sources seamlessly through the federated interface.

The implementation is complex because it needs to handle and coordinate queries across various storage systems, but it offers a unified experience for querying diverse data sources.
x??

---

#### Unbundled Databases

Unbundled databases focus on unifying writes across multiple storage engines. While federation addresses read operations from different systems, it lacks an effective solution for synchronizing write operations among these systems.

:p How do unbundled databases address the challenge of unified writes?
??x
Unbundled databases address the challenge of unified writes by managing and coordinating write operations across multiple storage engines. Unlike federated databases which focus on read operations, unbundled databases provide a mechanism to ensure consistency and synchronization during write operations.

This approach is necessary because different storage systems might have varying performance characteristics or be optimized for specific types of data access. By unbundling the handling of writes, it allows for better tailoring of storage solutions to individual needs while maintaining overall system integrity.
x??

---

#### Derived Data Systems

In the context of derived data systems, batch and stream processors can act as elaborate implementations of triggers, stored procedures, and materialized view maintenance routines. The derived data maintained by these systems are akin to different index types in a relational database.

:p How do derived data systems relate to traditional databases?
??x
Derived data systems relate to traditional databases by leveraging various software components running on different machines and administered by different teams to provide the functionalities that were traditionally integrated within single database products. 

For example, while a relational database might support B-tree indexes, hash indexes, and other index types, derived data systems decompose these functionalities into separate pieces of software. This approach allows for more flexible and specialized handling of data processing tasks.

Derived data systems maintain different views or indexes (like B-trees, hashes, spatial indexes) on the underlying data, providing a more modular and adaptable architecture.
x??

---

#### State, Streams, and Immutability

The existing data can be seen as a snapshot of state rather than a log of all changes. This perspective is closely related to the concepts of state, streams, and immutability in data systems.

:p How does viewing data as a snapshot relate to state, streams, and immutability?
??x
Viewing data as a snapshot relates to state, streams, and immutability by considering that the current state of the system is represented at a specific point in time. This snapshot might not capture every change that has occurred, but it provides an immutable view of the data as it exists at that moment.

Streams represent a continuous flow of changes or updates over time, while state represents the current snapshot of the data. By understanding these concepts together, you can design systems that efficiently manage and process both historical and real-time data.
x??

---


#### Consistent Index Creation within a Single Database
Background context: Within a single database, creating consistent indexes is a built-in feature. This means that when data changes occur, the database ensures these changes are reflected consistently across all relevant indexes.

:p How does a database maintain consistent indexes internally?
??x
A database maintains consistent indexes by automatically updating them whenever data modifications are made through transactions or other update operations. The database uses internal mechanisms such as transaction logs and lock management to ensure that index entries remain up-to-date with the base table content.
```java
// Pseudocode for a simple transaction log entry
public class TransactionLogEntry {
    String tableName;
    int rowId;
    boolean isInsert;
}
```
x??

---

#### Synchronizing Data Across Multiple Storage Systems
Background context: When composing multiple storage systems, ensuring that data changes are reliably propagated to all relevant components can be challenging. This requires mechanisms like change data capture (CDC) and event logs.

:p What mechanism can be used to synchronize writes across different storage systems?
??x
An asynchronous event log with idempotent writes is a robust approach for synchronizing writes across different storage systems. Change Data Capture (CDC) or event logs record changes made to the database, which can then be applied to other storage systems in an ordered and reliable manner.

```java
// Pseudocode for implementing CDC using events
public class EventLog {
    List<Event> events = new ArrayList<>();

    public void append(Event event) {
        events.add(event);
    }

    public Iterator<Event> iterator() {
        return events.iterator();
    }
}

class Event {
    String tableName;
    long rowId;
    boolean isInsert;
}
```
x??

---

#### Federation and Unbundling
Background context: Federation and unbundling are techniques to compose reliable, scalable, and maintainable systems from diverse components. Unbundling refers to separating features into smaller tools that communicate through standard APIs.

:p How does unbundling databases follow the Unix philosophy?
??x
Unbundling databases follows the Unix philosophy of small tools that do one thing well and can be composed using higher-level languages or tools, like shell scripting. This approach involves breaking down a database's functionality into smaller components that can communicate through uniform APIs (like pipes).

```java
// Example pseudocode for unbundled database components
public class DataProducer {
    public void produceData() {
        // Logic to generate data events
    }
}

public class DataConsumer {
    public void consumeData(List<Event> events) {
        // Process each event
    }
}
```
x??

---

#### Handling Faults in Distributed Systems
Background context: Asynchronous event logs with idempotent consumers provide loose coupling and resilience against component failures. This approach buffers messages when a consumer is slow or fails, allowing the system to recover more gracefully.

:p What are the advantages of using an asynchronous event log for fault tolerance?
??x
The main advantage of using an asynchronous event log for fault tolerance is that it allows the system to buffer messages while a consumer is slow or fails. This means other consumers can continue processing unaffected. When the faulty consumer recovers, it can catch up without missing any data.

```java
// Pseudocode for handling buffered events in an asynchronous event log
public class AsyncEventLogBuffer {
    private Queue<Event> queue = new LinkedList<>();

    public void buffer(Event event) {
        synchronized (queue) {
            queue.add(event);
            queue.notify();
        }
    }

    public Event getNext() throws InterruptedException {
        synchronized (queue) {
            while (queue.isEmpty()) {
                queue.wait();
            }
            return queue.poll();
        }
    }
}
```
x??

---

#### Distributed Transactions vs. Idempotent Writes
Background context: Traditional distributed transactions across heterogeneous storage systems are complex and often impractical. Instead, using an asynchronous event log with idempotent writes is a more robust approach.

:p Why might synchronous distributed transactions be difficult to implement in practice?
??x
Synchronous distributed transactions can be difficult to implement in practice because they require coordination between different components, which introduces complexity and potential failure points. Additionally, the lack of standardized transaction protocols when integrating systems written by different groups makes it hard to achieve reliable and scalable solutions.

```java
// Pseudocode for a simplified synchronous transaction example (hypothetical)
public class DistributedTransaction {
    public void commit() throws Exception {
        // Attempt to commit transactions in all involved storage systems
        if (!allCommitSucceeded()) {
            rollback();
        }
    }

    private boolean allCommitSucceeded() {
        // Logic to check if all commits were successful
        return true;
    }

    private void rollback() {
        // Logic to roll back the transaction
    }
}
```
x??

---


---
#### Unbundling Data Systems
Unbundling data systems refers to the practice of breaking down complex software applications into smaller, more specialized components that can be developed and maintained independently. This approach allows teams to specialize in specific areas, leading to greater efficiency and innovation.

The key benefits include:
- **Specialization**: Each team focuses on a single aspect of the application.
- **Well-defined Interfaces**: Clear communication channels between different components.
- **Event Logs**: Provide mechanisms for capturing and processing data changes.

:p What is the main benefit of unbundling data systems in terms of team specialization?
??x
By allowing teams to specialize in specific areas, unbundled systems enhance efficiency and innovation. Each team can focus on optimizing a particular part of the system without worrying about the complexities introduced by other components.
x??

---
#### Event Logs as an Interface
Event logs serve as powerful interfaces that ensure strong consistency properties due to their durability and ordered nature. They are versatile enough to be used across various types of data, enabling developers to manage changes in real-time.

:p How do event logs contribute to the reliability and flexibility of unbundled systems?
??x
Event logs provide a robust mechanism for maintaining state and ensuring that all modifications are captured and processed in an ordered manner. This consistency is crucial for keeping data integrity across different components.
x??

---
#### Complexity Management in Unbundled Systems
While unbundling offers numerous benefits, managing several pieces of infrastructure can introduce complexity due to learning curves, configuration issues, and operational quirks.

:p Why might deploying a single integrated software product be preferred over multiple tools when running an application?
??x
Deploying fewer moving parts reduces the overall complexity, making it easier to manage and maintain the system. A single integrated product often achieves better performance predictability for its designed workloads compared to a composed system.
x??

---
#### Advantages of Unbundling and Composition
Unbundled systems allow combining different data bases to achieve good performance across a wide range of workloads, whereas a single database may be too specialized or inflexible.

:p What are the primary advantages of unbundling and composition in terms of achieving broader applicability?
??x
Unbundling enables the combination of various databases to handle diverse workloads more effectively than a single product. This approach focuses on breadth rather than depth, allowing flexibility and adaptability.
x??

---
#### Missing Components for Unbundled Systems
One significant gap is the lack of a high-level language or tool for composing data systems in a simple and declarative way, akin to Unix pipes.

:p What is currently missing in the tools for unbundling and composition?
??x
The primary missing component is an equivalent to the Unix shell but tailored for data systems. This would be a high-level language enabling easy integration of storage and processing systems without needing custom application code.
x??

---
#### Example: Composing Data Systems with Shell-like Syntax
An ideal tool might allow commands like `mysql | elasticsearch`, where all documents from MySQL are indexed in Elasticsearch, and changes are automatically applied.

:p How could the Unix shell concept be adapted for data systems?
??x
A high-level language that allows simple composition of storage and processing components. For example:
```shell
mysql | elasticsearch
```
This would index MySQL database content into an Elasticsearch cluster and keep them synchronized without writing custom application code.
x??

---


#### Materialized Views and Caching
Background context: Materialized views are essentially precomputed caches. They can be used to improve query performance by storing the results of complex queries or recursive graph queries, thus avoiding repeated computations.
If applicable, add code examples with explanations:
```sql
CREATE MATERIALIZED VIEW sales_summary AS
SELECT product_id, SUM(quantity) as total_quantity
FROM sales
GROUP BY product_id;
```
:p How can materialized views help in improving query performance?
??x
Materialized views help in improving query performance by storing the results of complex queries or recursive graph queries. When a query is run that matches the structure of the materialized view, the database engine can fetch the precomputed result instead of executing the full query, which saves time and resources.
```sql
-- Example usage
SELECT * FROM sales_summary WHERE product_id = 123;
```
x??

---

#### Dataflow Programming in Databases
Background context: The "database inside-out" approach involves composing specialized storage and processing systems with application code. This is akin to dataflow programming where a change in one part of the system automatically triggers updates in dependent parts.
If applicable, add code examples with explanations:
```java
// Pseudocode for a simple dataflow graph
class DataFlowGraph {
    void addNode(Node node) {
        // Add node to the graph and set up dependencies
    }
    
    void addEdge(Node from, Node to) {
        // Connect nodes in the graph
    }
    
    void triggerEvent(Event event) {
        // Trigger an event that propagates through the graph
    }
}
```
:p How does dataflow programming work in databases?
??x
Dataflow programming in databases works by setting up a network of nodes and edges, where each node represents a piece of data or computation. When a change occurs (an "event"), it triggers a recomputation that propagates through the graph to update dependent pieces of data.
```java
// Example usage
DataFlowGraph graph = new DataFlowGraph();
Node customerOrders = new Node("customer_orders");
Node orderDetails = new Node("order_details");

graph.addNode(customerOrders);
graph.addNode(orderDetails);
graph.addEdge(customerOrders, orderDetails);

// Simulate a change in the customer orders node
graph.triggerEvent(new Event("customer_orders_changed"));
```
x??

---

#### Unbundling Databases and Application Code
Background context: The "database inside-out" approach unbundles databases by integrating specialized storage and processing systems with application code. This allows for more flexibility and integration of different technologies.
:p What is the "database inside-out" approach?
??x
The "database inside-out" approach refers to a design pattern where databases are composed of specialized storage and processing systems that work in conjunction with application code, rather than being monolithic solutions. This approach allows for better scalability, fault tolerance, and integration of various technologies.
```java
// Pseudocode example
class Application {
    Database db;
    
    public void updateOrder(int orderId) {
        // Update the order in the database
        db.update(orderId);
        
        // Trigger updates to dependent systems
        notifyDependencies();
    }
}
```
x??

---

#### Fault Tolerance and Durability in Data Systems
Background context: Modern data systems need to be fault-tolerant, scalable, and durable. They must handle changes across time, ensure that data is not lost, and scale to meet varying demands.
:p What are the key features of modern data systems?
??x
Modern data systems should have several key features:
- **Fault Tolerance**: The system should continue operating correctly even if some parts fail.
- **Scalability**: It should be able to handle increasing amounts of data or requests without compromising performance.
- **Durability**: Data must remain accessible and consistent, even after failures.

```java
// Pseudocode for handling durability in a database
class FaultTolerantDatabase {
    void saveData(Data data) {
        // Save the data to persistent storage
        storePersistence(data);
        
        // Ensure eventual consistency across all nodes
        ensureConsistency();
    }
}
```
x??

---

#### Spreadsheets and Dataflow Programming
Background context: Spreadsheets provide a form of dataflow programming where changes in one cell automatically update dependent cells. This is a key feature that modern data systems should emulate.
:p How does spreadsheet technology relate to dataflow programming?
??x
Spreadsheets demonstrate how data can be interconnected through formulas, where changing the value of one cell automatically recalculates dependent cells. Modern data systems should aim for similar behavior—where changes in a record should automatically update any indexes or cached views that depend on that record.
```java
// Pseudocode example for spreadsheet-like behavior
class SpreadsheetCell {
    String formula;
    
    void setValue(double value) {
        // Store the new value
        this.value = value;
        
        // Recalculate all dependent cells
        recalculateDependents();
    }
}
```
x??


#### Web Application Model
Background context: The typical web application model involves deploying stateless services, where any user request can be routed to any server, and the server forgets about the request after sending a response. This state needs to be stored in databases. Over time, there has been a trend towards separating application logic from database management.
:p What is the main characteristic of web applications in terms of state management?
??x
The application runs as stateless services where requests can be handled by any server, and the server does not retain information about previous requests after replying to them. The state needs to be stored separately, typically in a database.
x??

---
#### Database as Mutable Shared Variable
Background context: Databases are often used as mutable shared variables that applications can read from and write to. These databases manage durability, concurrency control, and fault tolerance. However, the application must periodically poll for changes since most languages lack built-in support for subscribing to these changes.
:p How do applications typically interact with databases in terms of state changes?
??x
Applications read from and update a database that acts as a mutable shared variable. The application polls the database to check for updates because it cannot be notified directly when the data changes.
x??

---
#### Dataflow and State Changes
Background context: Thinking about applications through the lens of dataflow means rethinking the relationship between application code and state management. Instead of treating databases passively, developers should focus on how state changes interact with application logic.
:p What does dataflow thinking suggest regarding the interaction between application code and state?
??x
Dataflow thinking suggests that application code should actively respond to state changes and trigger further state changes as needed. This approach emphasizes collaboration between state, state changes, and the code processing them.
x??

---
#### Tuple Spaces Model
Background context: The tuple spaces model explored expressing distributed computations in terms of processes that observe state changes and react to them, dating back to the 1980s. It is a concept relevant to how dataflow systems can handle interactions between different parts of an application.
:p How does the tuple spaces model work?
??x
In the tuple spaces model, processes observe state changes in a database (referred to as a tuple space) and react accordingly. This allows for distributed computations where multiple processes interact based on observed changes in shared state.
x??

---
#### Message-Passing Dataflow Systems
Background context: Message-passing systems like actors are used to handle events by responding to them, similar to how dataflow concepts work. These systems allow for asynchronous communication between different parts of the application.
:p How do message-passing systems (like actors) handle event-driven interactions?
??x
Message-passing systems use actors that can send and receive messages asynchronously. When an actor receives a message, it processes it and may send more messages in response, effectively triggering state changes and interactions across the system.
x??

---


#### Unbundling Databases and Derived Data
Background context: Unbundling databases involves taking actions that are traditionally done within a database (like triggers or secondary index updates) and applying them to create derived datasets outside of the primary database. This includes caches, full-text search indexes, machine learning models, and analytics systems.
:p What is the importance of maintaining derived data in terms of order?
??x
Maintaining derived data often requires processing events in a specific order because several views or applications are derived from an event log. Forgetting to process these events in the same sequence can lead to inconsistencies among different derived datasets.

For example, if multiple views depend on the same set of events, they need to be processed in the exact same order to remain consistent with each other.
x??

---
#### Message Redelivery and Dual Writes
Background context: When maintaining derived data, reliable message ordering is crucial. Many message brokers do not guarantee that unacknowledged messages will be redelivered in the same order as they were sent (see "Acknowledgments and redelivery" on page 445). Additionally, dual writes are often ruled out because they can lead to inconsistencies if one write fails.
:p Why are dual writes problematic for maintaining derived data?
??x
Dual writes are risky when maintaining derived data because if one of the writes fails, it can leave the state of the system in an inconsistent state. For example, if you have a database update and a corresponding derived dataset update, both need to succeed together or fail together to maintain consistency.
x??

---
#### Stream Processing for Dataflow
Background context: Stream processing involves continuously processing data streams as they arrive rather than batch processing. This approach is useful for maintaining derived datasets in real-time.
:p What are the key differences between stream processing and traditional messaging systems?
??x
Stream processing focuses on processing data in a continuous flow, ensuring stable message ordering and fault tolerance. Traditional messaging systems are typically designed for asynchronous job execution, where order of delivery may not be critical.

In contrast, when maintaining derived datasets, the order of state changes is often crucial to ensure consistency across different views or applications.
x??

---
#### Microservices vs Dataflow Approach
Background context: In a microservices approach, services communicate via synchronous network requests (REST APIs). In dataflow approaches, services process streams of events asynchronously. Both can be used to implement the same functionality but with different underlying mechanisms and advantages.
:p How does the dataflow approach handle exchange rate updates differently from the microservices approach?
??x
In a microservices approach, the code that processes purchases would query an exchange-rate service or database for current rates.

In contrast, in a dataflow approach, the purchase processing code subscribes to a stream of exchange rate updates and stores these updates locally. During the purchase process, it queries this local cache instead of making another network request.
x??

---
#### Performance Benefits of Dataflow Systems
Background context: Dataflow systems can achieve better performance by reducing the need for synchronous network requests. They process data in streams, which can be more efficient and robust.

Example scenario: A customer purchases an item priced in one currency but pays with another. The exchange rate is needed for conversion.
:p How does the dataflow approach improve performance compared to the microservices approach?
??x
The dataflow approach improves performance by substituting a synchronous network request with a local database query. This reduces latency and makes the system more robust because it avoids external dependencies.

Example:
```java
// Microservices Approach
purchaseService.getCurrentExchangeRate(cryptoCurrency, fiatCurrency);

// Dataflow Approach
localDatabase.getLatestExchangeRate(cryptoCurrency);
```

The dataflow approach is faster and more reliable as it eliminates the need for network requests.
x??

---


#### Time-Dependent Joins
Time-dependence refers to how events that occur at different times can affect derived datasets. In the context of financial services, exchange rates change over time, and these changes need to be considered when reprocessing data.

:p What is a time-dependent join in the context of data processing?
??x
A time-dependent join occurs when events from two streams are joined based on their timestamps. If you reprocess purchase events at a later date, the current exchange rate might have changed, requiring you to use historical exchange rates that were valid at the time of the original purchase.

For example, if you are processing purchase events and need to calculate costs using exchange rates, the exchange rate used must be the one applicable at the time of the purchase, not the current rate. This necessitates storing or querying historical data based on timestamps.

```java
// Pseudocode for handling a time-dependent join
public class TimeDependentJoinHandler {
    private Map<Long, Double> historicalExchangeRates; // Timestamp -> Exchange Rate

    public double getExchangeRateForPurchase(PurchaseEvent purchase) {
        long timestamp = purchase.getTimestamp();
        return historicalExchangeRates.get(timestamp);
    }
}
```
x??

---

#### Stream-table Join (Stream Enrichment)
Stream-table joins combine data from a stream with data stored in a table, typically enriching the stream events with relevant information.

:p What is a stream-table join and how does it work?
??x
A stream-table join enriches real-time event streams by combining them with static or semi-static data stored in tables. This process can be used to update purchase events with current exchange rates when processing financial transactions.

For example, if you have a stream of purchase events and a table containing current exchange rates, the stream-table join will enrich each purchase event with its corresponding exchange rate at the time of the purchase.

```java
// Pseudocode for a stream-table join
public class StreamTableJoinHandler {
    private Map<Long, Double> exchangeRates; // Timestamp -> Exchange Rate

    public double getExchangeRateForPurchase(PurchaseEvent purchase) {
        long timestamp = purchase.getTimestamp();
        return exchangeRates.get(timestamp);
    }
}
```
x??

---

#### Write Path and Read Path
The write path involves processing data as it is written to the system, while the read path only processes data when a query or request is made.

:p What are the write path and read path in data processing?
??x
In data processing, the write path refers to the precomputed stages where data is collected, processed, and stored. This process happens as soon as new data comes in, regardless of whether it has been requested for queries. The read path involves retrieving and processing the derived dataset only when a query or request is made.

For example, in a search index application:
- **Write Path**: When a document is updated, its content goes through multiple stages of batch and stream processing to update the search index.
- **Read Path**: When a user performs a search query, the system retrieves and processes data from the search index to provide relevant results.

```java
// Pseudocode for handling write and read paths in a search index
public class SearchIndexHandler {
    private Map<String, Document> documents; // Document ID -> Document

    public void updateDocument(String docId, String content) {
        // Update document content and reindex as needed
    }

    public List<Document> search(String query) {
        // Retrieve relevant documents from the index based on the query
        return ...;
    }
}
```
x??

---

#### Eager vs. Lazy Evaluation in Dataflow Systems
Eager evaluation processes data immediately, while lazy evaluation delays processing until it is needed.

:p How does eager and lazy evaluation apply to dataflow systems?
??x
In dataflow systems, eager evaluation corresponds to the write path where data is processed as soon as it comes in, regardless of whether a query has been made. Lazy evaluation corresponds to the read path where processing only happens when a query or request is made.

For example:
- **Eager Evaluation**: Updating a search index whenever new documents are added.
- **Lazy Evaluation**: Serving queries by retrieving and processing data from the search index only when needed.

```java
// Pseudocode for eager evaluation in write path
public class EagerEvaluationHandler {
    public void processDocument(Document doc) {
        // Process document immediately (e.g., add to index)
    }
}

// Pseudocode for lazy evaluation in read path
public class LazyEvaluationHandler {
    public List<Document> serveQuery(String query) {
        // Retrieve and process relevant documents from the index only when a query is made.
        return ...;
    }
}
```
x??

---


#### Materialized Views and Caching Overview
Materialized views and caching are techniques that shift the boundary between write-time and read-time work. They allow for more efficient reads by precomputing some results, which comes at the cost of increased write-time effort.

:p What is a materialized view in data systems?
??x
A materialized view is a precomputed result set that is stored persistently. It allows for faster read operations since the computed results are available without the need to recompute them each time they are accessed, thus reducing the load on the write path but increasing it during updates.

Example of how materialized views can be used in practice:
```java
// Pseudocode for updating a materialized view
void updateMaterializedView(String document) {
    // Update index entries for all terms that appear in the document
    for (String term : document.getTerms()) {
        index.updateEntry(term);
    }
}

// Pseudocode for searching using a materialized view
List<SearchResult> searchIndex(String queryWords) {
    List<SearchResult> results = new ArrayList<>();
    for (String word : queryWords.split(" ")) {
        List<Document> documentsWithWord = index.getDocumentsContaining(word);
        // Apply Boolean logic to find relevant documents
        if (queryWords.contains("AND")) {
            // Intersection of all documents containing each word
            ...
        } else if (queryWords.contains("OR")) {
            // Union of documents containing any synonym or the exact term
            ...
        }
    }
    return results;
}
```
x??

---

#### Full-Text Search Indexing
A full-text search index is a common application where write-time updates are made to maintain an index, and read-time operations use this index for efficient searches.

:p How does a full-text search index affect the workload of writes and reads?
??x
Writes involve updating the index entries for all terms that appear in the document. Reads involve searching the index for keywords, applying Boolean logic (AND, OR) to find relevant documents. Without an index, reads would need to scan through all documents, which is expensive with a large number of documents.

Example of indexing and searching:
```java
// Pseudocode for updating the full-text search index
void updateIndex(String documentText) {
    // Tokenize text into terms
    List<String> terms = tokenize(documentText);
    // Update index entries for each term
    for (String term : terms) {
        index.updateEntry(term);
    }
}

// Pseudocode for searching using the full-text search index
List<Document> searchIndex(String query, boolean useAndOperator) {
    List<String> queryTerms = tokenize(query);
    Set<Document> potentialResults = new HashSet<>();
    // Find documents containing each term
    for (String term : queryTerms) {
        Set<Document> docsWithTerm = index.getDocumentsContaining(term);
        if (!useAndOperator) {
            potentialResults.addAll(docsWithTerm);  // OR logic
        } else {
            potentialResults.retainAll(docsWithTerm);  // AND logic
        }
    }
    return new ArrayList<>(potentialResults);
}
```
x??

---

#### Caching Common Search Results
Caching common search results can reduce read-time computation by storing frequently accessed data. However, this approach requires precomputing the results for a fixed set of queries.

:p What is caching in the context of search?
??x
Caching involves storing precomputed results to serve common or frequently accessed queries quickly. This reduces read-time workloads but increases write-time effort as new documents need to be incorporated into cached results.

Example of caching:
```java
// Pseudocode for a cache-based search system
Cache<String, List<Document>> commonQueriesCache = new Cache<>();

List<Document> getCachedSearchResults(String query) {
    if (commonQueriesCache.containsKey(query)) {
        return commonQueriesCache.get(query);
    } else {
        // Compute results from index and store in cache
        List<Document> results = computeSearchResults(query);
        commonQueriesCache.put(query, results);
        return results;
    }
}
```
x??

---

#### Shift Between Write-Path and Read-Path Workload
The shift between the write-path and read-path workload can be adjusted by using techniques like materialized views or caching. This allows optimizing performance based on query patterns.

:p How does shifting the boundary between writes and reads affect system design?
??x
Shifting the boundary involves deciding where to do more work: during writes (by precomputing results) or during reads (by reducing computation). Techniques like materialized views, full-text search indexes, and caching help in this trade-off. For instance, using an index reduces read-time complexity but increases write-time effort.

Example of shifting the boundary:
```java
// Pseudocode for adjusting workload between writes and reads
void processDocument(String documentText) {
    // Update materialized view (write-heavy operation)
    updateIndex(documentText);

    if (commonQueriesCache.containsKey(query)) {
        return commonQueriesCache.get(query);
    } else {
        // Full read-time computation with index lookup
        List<Document> results = searchIndex(documentText, true);  // AND logic
        commonQueriesCache.put(query, results);
        return results;
    }
}
```
x??

---


---
#### Client/Server Model Transition
Background context explaining the traditional client/server model and how it has evolved. The traditional web application assumes that clients are largely stateless, while servers maintain all authority over data. However, modern single-page JavaScript applications have gained significant stateful capabilities, allowing them to store local state on the device without frequent round-trips to the server.
:p What is the traditional client/server model in web development?
??x
The traditional model assumes that clients are largely stateless and communicate with a central server, which manages all data. The server sends static HTML pages or dynamically generated content to the client, which then displays it on the user's screen.
```java
// Pseudocode for a typical client/server interaction
public class Server {
    public String getData() { return "Static Data"; }
}

public class Client {
    private Server server;

    public void fetchData() {
        String data = server.getData();
        // Display or process data on the UI
    }
}
```
x??
---
#### Offline-First Applications
Background context explaining how modern web applications can operate offline by using local databases and syncing with remote servers when a network connection is available. This approach leverages the changing capabilities of single-page JavaScript apps and mobile devices, which store state locally and don’t require frequent server interactions.
:p What are offline-first applications?
??x
Offline-first applications refer to software that primarily operates using local data stored on end-user devices. They sync with remote servers in the background when a network connection is available. This approach enhances user experience by reducing reliance on internet connectivity for most operations.
```javascript
// Pseudocode for an offline-first application
class OfflineApp {
    constructor() {
        this.localDB = new LocalStorage();
        this.serverURL = "https://example.com/api";
    }

    fetchData() {
        if (navigator.onLine) {
            fetch(this.serverURL).then(response => response.json()).then(data => {
                // Update local state with remote data
                this.localDB.updateData(data);
            });
        } else {
            // Use cached local data for UI rendering
            return this.localDB.getData();
        }
    }
}
```
x??
---
#### Server-Sent Events (SSE)
Background context explaining how server-sent events allow a web browser to maintain an open connection with the server and receive real-time updates. This is different from traditional HTTP requests where the client needs to periodically check for updates.
:p What are server-sent events (SSE)?
??x
Server-sent events (SSE) enable the server to push messages to the client over a single, long-lived HTTP connection. The client can open an event stream and receive data pushed from the server in real-time without needing to make additional requests.
```java
// Pseudocode for using Server-Sent Events in Java (using WebSocket API as an example)
public class SSEClient {
    private WebSocket webSocket;

    public void connectToServer() throws IOException {
        URL url = new URL("https://example.com/events");
        this.webSocket = (WebSocket) ((HttpURLConnection) url.openConnection()).getOutputStream();
        // Open the connection and start receiving messages
    }

    public void receiveMessage() throws IOException, InterruptedException {
        String message = this.webSocket.readUTF(); // Blocking method to read next message from server
        System.out.println("Received: " + message);
    }
}
```
x??
---


#### End-to-End Event Streams
Background context: The text discusses extending stream processing and messaging ideas to end-user devices, allowing state changes to flow through an end-to-end write path from device interactions to user interfaces. This involves managing offline scenarios for devices and propagating state changes with low delay.

:p What is the concept of end-to-end event streams?
??x
End-to-end event streams refer to a scenario where state changes are propagated efficiently from the point of interaction on one device through various processing steps (event logs, derived data systems) to another device's user interface. This ensures that even when devices are offline for periods, they can re-establish their state seamlessly and quickly once back online.

??x
The key advantage here is maintaining low-latency state updates despite potential network interruptions.
x??

---

#### Offline Support and Consumer Offsets
Background context: The text mentions how a consumer of a log-based message broker can reconnect after disconnection and avoid missing messages. This technique is extended to individual users who are small subscribers to streams of events.

:p How does the concept of consumer offsets relate to offline support?
??x
Consumer offsets in messaging systems help maintain state across disconnects, ensuring that consumers can re-sync with a log-based message broker without missing any messages after reconnection. For end-users, this means that when devices go offline, they can reconnect and resume receiving updates from where they left off.

??x
This technique ensures continuous data flow even in the presence of network disruptions.
x??

---

#### Real-Time Architecture for Applications
Background context: The text suggests extending programming models like Elm and Facebook’s React, Flux, and Redux to push state-change events directly to client-side event pipelines. This could enable real-time interaction flows where state changes are propagated with low delay.

:p Why is the transition to a real-time architecture beneficial?
??x
The transition to a real-time architecture can significantly improve user experience by reducing latency between actions on one device and their reflection in another user interface. This makes interactions more responsive, enhancing the overall usability of applications like instant messaging or online games where low delay is crucial.

??x
Real-time architectures provide faster feedback loops, leading to better engagement and satisfaction among users.
x??

---

#### Request/Response vs Publish/Subscribe
Background context: The text points out that many current systems are built on request/response interactions. However, moving towards a publish/subscribe model could enable more efficient state propagation across distributed systems.

:p Why is the shift from request/response to publish/subscribe important?
??x
The shift from request/response to publish/subscribe is significant because it allows for more dynamic and scalable data flows. In a publish/subscribe model, multiple subscribers can receive updates as events occur, making it easier to manage state across different components or devices without relying on traditional synchronous calls.

??x
This model promotes better scalability and responsiveness in distributed systems.
x??

---

#### Reads Are Events Too
Background context: The text explains that reads can also be treated as events, especially when derived data is written to a store. This helps in optimizing queries by leveraging the event log for random access.

:p How do reads become events in the described model?
??x
In this model, reads are considered events because they act as another type of interaction with the system. When a stream processor writes derived data to a store (database, cache, or index), and user requests query that store, the read operation can be seen as an event that is part of the overall event log.

??x
This approach allows for more efficient queries by leveraging the event log's structure, reducing the need for full scans.
x??

---


---
#### Representing Reads as Streams of Events
Stream processors typically handle writes through an event log, while reads are handled via transient network requests. This traditional setup is efficient but not the only possible design.

:p How can read requests be transformed to align more closely with write operations in a stream processor?
??x
By representing read requests as streams of events and sending both read and write events to a common stream operator. The processor responds to these read events by emitting results, effectively performing a stream-table join between the queries and the database.

For example:
```java
// Pseudocode for handling read requests as part of event processing
public class EventProcessor {
    public void processEvent(Event event) {
        if (event.isWrite()) {
            // Process write operation
        } else if (event.isRead()) {
            // Respond to read request by emitting result
        }
    }
}
```
x??

---
#### Read Event Logging for Tracking Dependencies
Recording logs of read events can provide valuable insights into causal dependencies and data provenance. This is particularly useful in complex systems where understanding the impact of historical data on current decisions is critical.

:p How might logging read requests benefit a system, especially in terms of tracking user decision-making processes?
??x
Logging read requests allows for reconstructing what users saw before making specific decisions, which can be crucial for analyzing behavior and improving services. For instance, in an online shop, recording the results of inventory status queries can help understand how shipping predictions affect purchase decisions.

```java
// Pseudocode to log read events
public class RequestLogger {
    public void logReadRequest(String queryId) {
        // Log the request details and its result if available
    }
}
```
x??

---
#### Multi-partition Data Processing with Stream Processors
For queries that span multiple partitions, leveraging a stream processor’s infrastructure for message routing, partitioning, and joining can simplify complex operations. This approach allows distributed execution of queries combining data from several partitions.

:p How does using a stream processor facilitate multi-partition query processing?
??x
Stream processors provide an efficient framework for handling distributed data by managing message routing, partitioning, and joining across multiple nodes. For instance, in a Twitter application, computing the number of unique users who have seen a URL involves combining results from various follower sets, which can be executed through the stream processor’s infrastructure.

```java
// Pseudocode to compute aggregated query results
public class QueryAggregator {
    public void processTweetUrlQuery(String url) {
        // Route requests to appropriate partitions and aggregate results
    }
}
```
x??

---

