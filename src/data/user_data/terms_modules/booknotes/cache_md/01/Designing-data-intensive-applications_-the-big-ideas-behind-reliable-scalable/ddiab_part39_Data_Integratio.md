# High-Quality Flashcards: Designing-data-intensive-applications_-the-big-ideas-behind-reliable-scalable_processed (Part 39)


**Starting Chapter:** Data Integration

---


#### Future of Data Systems
In this final chapter, the discussion shifts towards envisioning how data systems and applications should be designed and built for the future. The aim is to explore ideas that could fundamentally improve reliability, scalability, and maintainability of applications.

The context drawn from St. Thomas Aquinas' philosophy highlights the importance of having a higher purpose or end goal beyond just preservation or maintenance. This principle extends to modern software development, where merely ensuring the survival of an application (e.g., keeping it running indefinitely) is not sufficient; instead, the focus should be on creating applications that are robust, correct, and capable of evolving over time.

The objective here is to start a productive discussion about potential improvements in designing future data systems. This includes approaches like fault-tolerance algorithms for reliability, partitioning strategies for scalability, and mechanisms for evolution and abstraction to enhance maintainability.
:p What does the author suggest as the primary goal for future applications?
??x
The author suggests that the primary goal for future applications should be to create robust, correct, evolvable, and ultimately beneficial systems. This means moving beyond just maintaining an application by ensuring it is reliable, scalable, and easy to maintain over time.
x??

---


#### Reliability in Future Data Systems
Reliability is a crucial aspect of modern data systems. The discussion here revolves around fault-tolerance algorithms that can help ensure the robustness of applications.

Fault-tolerance refers to the ability of a system to continue operating correctly even if some (but not all) of its components fail. Key techniques include replication, redundancy, and load balancing.
:p What is fault-tolerance in the context of future data systems?
??x
Fault-tolerance in the context of future data systems refers to the capability of an application or system to continue functioning correctly despite failures of some of its components. This involves strategies like replication (redundant copies of data and processes), redundancy, and load balancing.
x??

---


#### Scalability in Future Data Systems
Scalability is another critical aspect discussed for future applications. Partitioning strategies are mentioned as a way to improve scalability.

Partitioning involves breaking down large datasets or tasks into smaller chunks that can be processed independently. This not only improves performance but also enhances the ability of an application to handle increased load.
:p What does partitioning mean in the context of improving scalability?
??x
Partitioning means dividing large datasets or complex tasks into smaller, manageable parts that can be processed independently. This approach helps improve performance and scalability by allowing different components of a system to operate more efficiently and manage larger workloads without becoming overwhelmed.
x??

---


#### Maintainability in Future Data Systems
Maintainability is discussed as another important aspect for future applications. The chapter emphasizes the need for mechanisms that facilitate evolution and abstraction.

Mechanisms such as modular design, version control, and automation tools can significantly enhance maintainability by making it easier to modify and update systems over time.
:p What are some key mechanisms mentioned in improving maintainability?
??x
Key mechanisms mentioned in improving maintainability include:
- Modular design: Breaking down the system into manageable, reusable components.
- Version control: Tracking changes and managing different versions of code or configurations.
- Automation tools: Tools that help with repetitive tasks, reducing human error and increasing efficiency.

These mechanisms facilitate easier modifications and updates to systems over time.
x??

---


#### Evolution in Future Data Systems
Evolution involves the ability of an application or system to adapt and improve over time. The chapter suggests that this is essential for creating applications that are not just functional but also beneficial to humanity.

The idea here is to design applications that can evolve their functionalities, performance, and even purpose as technology advances.
:p What does evolution mean in the context of future data systems?
??x
Evolution in the context of future data systems means designing applications with the ability to adapt and improve over time. This involves creating systems that can be updated, optimized, and expanded upon as new technologies and needs arise, ensuring they remain relevant and beneficial.
x??

---

---


#### Data Integration Challenges
In this book, various solutions to data storage and retrieval problems have been discussed. For instance, different storage engines (log-structured storage, B-trees, column-oriented storage) and replication strategies (single-leader, multi-leader, leaderless) are mentioned in Chapters 3 and 5 respectively. Each solution has its pros, cons, and trade-offs.
:p What is the main challenge when choosing a solution for data integration?
??x
The primary challenge lies in mapping the appropriate software tool to specific usage circumstances. Given that no single piece of software can fit all possible scenarios due to varying use cases, it often requires combining different tools to meet diverse requirements.
For example, integrating an OLTP database with a full-text search index is common. While some databases include basic full-text indexing features (e.g., PostgreSQL), more complex searches may necessitate specialized information retrieval tools.
??x

---


#### Combining Specialized Tools for Data Integration
Data integration becomes increasingly challenging as the number of different representations of data increases. To handle diverse use cases, it is often necessary to integrate various types of software tools, such as databases and search indexes, with other systems like analytics platforms, caching layers, machine learning models, or notification systems.
:p How can one approach integrating an OLTP database with a full-text search index?
??x
To integrate an OLTP database with a full-text search index, you would typically need to maintain two separate data stores. The OLTP database can handle transactional operations efficiently, while the full-text search index provides fast keyword queries.
Here is an example of how this could be achieved using a simple Java-based integration layer:
```java
public class DataIntegrationLayer {
    private Database db;
    private SearchIndex search;

    public DataIntegrationLayer(Database db, SearchIndex search) {
        this.db = db;
        this.search = search;
    }

    // Method to insert data into both the database and the search index
    public void addData(String data) {
        db.insert(data);
        search.indexDocument(data);
    }

    // Method to perform a full-text search query
    public List<String> searchDocuments(String keyword) {
        return search.query(keyword);
    }
}
```
This integration layer ensures that updates in the OLTP database are reflected in the search index, maintaining consistency across both systems.
??x
---

---


#### Dataflows Across an Organization
Background context: When dealing with data across multiple storage systems, understanding dataflows becomes crucial. Ensuring that data writes are managed correctly is essential to maintain consistency and avoid conflicts between different storage systems.
:p How can ensuring the correct order of data writes help in maintaining consistency?
??x
Ensuring the correct order of data writes helps maintain consistency by preventing conflicts between different storage systems. For example, if changes are first written to a system-of-record database and then applied to a search index in the same order, the search index will always be derived from the system-of-record, ensuring consistency (assuming no bugs in the software).

Example code:
```java
// Pseudocode for applying changes in the correct order
public void applyChanges(int orderId) {
    // Step 1: Write to the database first
    database.write(orderId, newOrderDetails);
    
    // Step 2: Apply changes to the search index next
    searchIndex.updateFromDatabase(orderId, newOrderDetails);
}
```
x??

---


#### Change Data Capture (CDC)
Background context: Change Data Capture is a technique used to capture and apply changes made to a database in real-time. This ensures that all derived systems are consistent with the source of truth.
:p What is change data capture (CDC) and why is it important?
??x
Change Data Capture (CDC) is a method for capturing and applying changes from a system-of-record database to other storage systems, such as search indices, in real-time. It ensures that all derived data systems are consistent with the source of truth.

Example:
```java
// Pseudocode for CDC
public void applyChanges(int orderId) {
    // Step 1: Capture and store changes in a change log
    changelogService.logChange(orderId, newOrderDetails);
    
    // Step 2: Apply these changes to the search index in the same order
    searchIndex.applyFromChangelog(orderId, newOrderDetails);
}
```
x??

---


#### Handling Concurrent Writes Without CDC
Background context: If data is written directly to multiple systems without using change data capture (CDC), conflicts can arise due to different processing orders.
:p What issue arises from allowing direct writes to both the database and search index by applications?
??x
Allowing direct writes to both the database and search index by applications introduces the problem of conflicting writes being processed in a different order. This leads to inconsistencies between the database and the search index.

Example:
```java
// Pseudocode for concurrent writes without CDC
public void applyConcurrentWrites() {
    // Client 1 writes to database then search index
    client1.writeToDatabase(orderId, newOrderDetails);
    client1.writeToSearchIndex(orderId, newOrderDetails);
    
    // Client 2 writes to search index then database
    client2.writeToSearchIndex(orderId, newOrderDetails);
    client2.writeToDatabase(orderId, newOrderDetails);
}
```
In this scenario, the two storage systems may make contradictory decisions and become permanently inconsistent with each other.

x??

---


#### Total Order Replication Approach
Background context: To ensure consistent data across multiple storage systems, a total order replication approach can be used. This involves deciding on an ordering for all writes through a single system.
:p How does the state machine replication approach help in ensuring consistency?
??x
The state machine replication approach ensures consistency by funneling all user input through a single system that decides the order of all writes. This makes it easier to derive other representations of data by processing the writes in the same order.

Example:
```java
// Pseudocode for total order replication
public void applyTotalOrderWrites() {
    // Single system decides on write ordering
    coordinatorService.processWrite(orderId, newOrderDetails);
    
    // Apply changes to both database and search index based on ordered writes
    database.applyWrite(orderId, newOrderDetails);
    searchIndex.applyFromCoordinator(orderId, newOrderDetails);
}
```
x??

---


#### Event Sourcing for Derived Data Systems
Background context: Event sourcing involves storing all state changes as a sequence of events. This can make it easier to update derived data systems deterministically and idempotently.
:p How does event sourcing help in updating derived data systems?
??x
Event sourcing helps in updating derived data systems by making the process deterministic and idempotent, which simplifies fault recovery. By storing all state changes as a sequence of events, it becomes easier to apply these changes consistently across different storage systems.

Example:
```java
// Pseudocode for event sourcing updates
public void updateDerivedSystem(int orderId) {
    // Apply events in the order they were recorded
    derivedData.applyEvents(orderId);
}
```
x??

---


#### Distributed Transactions vs. Derived Data Systems
Background context: Both distributed transactions and derived data systems aim to keep different data systems consistent, but they do so by different means. Distributed transactions enforce consistency through coordination, while derived data systems rely on a total order of writes.
:p How does the approach of using derived data systems compare to that of distributed transactions?
??x
The approach of using derived data systems compares to distributed transactions in terms of achieving similar goals (consistency across different storage systems) but via different means. Distributed transactions enforce consistency through coordination, while derived data systems rely on a total order of writes.

Example:
```java
// Pseudocode for distributed transaction
public void performDistributedTransaction() {
    // Begin transaction
    TransactionManager.begin();
    
    try {
        database.write(orderId, newOrderDetails);
        searchIndex.updateFromDatabase(orderId, newOrderDetails);
        
        // Commit transaction
        TransactionManager.commit();
    } catch (Exception e) {
        // Rollback transaction if something goes wrong
        TransactionManager.rollback();
    }
}
```

Example for derived data systems:
```java
// Pseudocode for total order replication
public void applyTotalOrderWrites() {
    coordinatorService.processWrite(orderId, newOrderDetails);
    
    database.applyWrite(orderId, newOrderDetails);
    searchIndex.applyFromCoordinator(orderId, newOrderDetails);
}
```
Both approaches aim to ensure consistency but use different mechanisms.

x??

---

---


---
#### Distributed Transactions and Ordering Mechanisms
Distributed transactions decide on an ordering of writes by using locks for mutual exclusion (see “Two-Phase Locking (2PL)” on page 257), while CDC and event sourcing use a log for ordering. Distributed transactions use atomic commit to ensure that changes take effect exactly once, while log-based systems are often based on deterministic retry and idempotence.
:p What mechanism do distributed transactions use for deciding the order of writes?
??x
Distributed transactions use locks for mutual exclusion (Two-Phase Locking) to decide the order of writes. This ensures that only one transaction can access a resource at a time, maintaining consistency across the system.
x??

---


#### Atomic Commit and Consistency Guarantees
Distributed transactions use atomic commit to ensure changes take effect exactly once, whereas log-based systems often rely on deterministic retry and idempotence for consistency. Transaction systems typically provide linearizability (see “Linearizability” on page 324), offering useful guarantees such as reading your own writes.
:p What does atomic commit in distributed transactions guarantee?
??x
Atomic commit in distributed transactions guarantees that changes take effect exactly once, ensuring a consistent state across the system. This means either all operations succeed or none do, maintaining integrity and consistency.
x??

---


#### Linearizability and Timing Guarantees
Transaction systems usually provide linearizability (see “Linearizability” on page 324), which implies useful guarantees such as reading your own writes (see “Reading Your Own Writes” on page 162). On the other hand, derived data systems are often updated asynchronously and do not offer the same timing guarantees.
:p What is linearizability?
??x
Linearizability is a consistency model in distributed systems where all operations appear to be executed atomically and sequentially. This means that any sequence of operations can be reordered without changing the outcome, ensuring strong consistency. It provides useful guarantees like reading your own writes, meaning that once you have written something, you will always see it.
x??

---


#### Limitations of Total Ordering
With systems that are small enough, constructing a totally ordered event log is entirely feasible (as demonstrated by databases with single-leader replication). However, as systems scale toward bigger and more complex workloads, limitations begin to emerge. These include the need for leader nodes in each datacenter to handle network delays efficiently.
:p What are the challenges of maintaining total ordering across multiple geographically distributed datacenters?
??x
Maintaining total ordering across multiple geographically distributed datacenters is challenging due to network latency and throughput constraints. To address this, separate leaders are typically used in each datacenter, but this introduces ambiguity in the order of events originating from different datacenters.
x??

---


#### Total Order Broadcast and Consensus Algorithms
Deciding on a total order of events is known as total order broadcast (equivalent to consensus). Most consensus algorithms assume sufficient throughput for a single node. Designing scalable consensus algorithms that work well in geographically distributed settings remains an open research problem.
:p What does total order broadcast refer to?
??x
Total order broadcast refers to the process of deciding on a total order of events, which is equivalent to solving the consensus problem. This ensures that all nodes agree on the sequence of events despite network delays and partitioning.
x??

---


#### Microservices and Event Ordering
When applications are deployed as microservices, each service and its durable state are deployed independently with no shared state between services. This can lead to undefined order of events originating from different services, making total ordering more difficult.
:p How does deploying applications as microservices affect event ordering?
??x
Deploying applications as microservices leads to independent units of deployment where services have their own state and do not share it. Consequently, events originating in different services lack a defined order, complicating the process of total ordering.
x??

---


#### Offline Client Operations and Event Ordering
Some applications maintain client-side state that is updated immediately on user input without waiting for server confirmation and can continue to work offline. This often leads to clients and servers seeing events in different orders.
:p How do client-side updates affect event ordering?
??x
Client-side updates occur independently of server confirmation, allowing immediate changes. However, this can result in clients and servers seeing events in different orders, making it difficult to maintain a consistent total order across the system.
x??
---

---


#### Causal Dependencies in Event Systems
Background context: The example discusses a scenario where two events, "unfriend" and "send message," need to be processed in a specific order. If not handled correctly, it can lead to incorrect behavior like sending notifications to an ex-partner who should not see the message.
:p What is the issue with causal dependencies in this social networking service example?
??x
The issue arises because the ordering of events matters for certain behaviors (like ensuring the ex-partner does not receive a notification). If the "send message" event is processed before the "unfriend" event, the system might incorrectly notify the ex-partner.
```java
// Pseudocode illustrating the scenario
class User {
    void removeFriend(User friend) {
        // Remove friend from list
        friends.remove(friend);
    }

    void sendMessage(String message, List<User> recipients) {
        // Send message to all recipients
        for (User recipient : recipients) {
            if (!recipient.equals(exPartner)) {  // Assuming exPartner is a known user
                notify(recipient, message);  // Notify should check friend status before sending notification
            }
        }
    }

    void notify(User recipient, String message) {
        // Send the message to the recipient if they are still friends
        if (friends.contains(recipient)) {
            System.out.println(recipient.getName() + " received: " + message);
        } else {
            System.out.println("Notification not sent as user is no longer a friend.");
        }
    }
}
```
x??

---


#### Logical Timestamps for Ordering Events
Background context: Logical timestamps are mentioned as a way to provide total ordering without needing coordination between systems. They can help maintain the correct sequence of events, especially when total order broadcast is not feasible.
:p How do logical timestamps ensure the correct order of events?
??x
Logical timestamps ensure that each event gets a unique timestamp based on when it occurred relative to other events in the system. This allows for sorting and processing events in the right order without needing direct coordination between different systems.
```java
// Pseudocode showing how logical timestamps could be implemented
class Event {
    private long logicalTimestamp;

    public Event() {
        this.logicalTimestamp = System.currentTimeMillis();  // Assign a timestamp based on current time
    }

    public long getLogicalTimestamp() {
        return logicalTimestamp;
    }
}

public class EventProcessor {
    public void process(Event event) {
        events.sort(Comparator.comparingLong(Event::getLogicalTimestamp));  // Sort events by their timestamps
        for (Event e : events) {
            handleEvent(e);  // Process each event in the sorted order
        }
    }

    private void handleEvent(Event event) {
        System.out.println("Processing event with timestamp: " + event.getLogicalTimestamp());
    }
}
```
x??

---


#### Logging State to Capture Causal Dependencies
Background context: The text suggests that logging a state snapshot before an action can help capture causal dependencies, allowing later events to reference this state. This method is useful for maintaining the correct processing order of events.
:p How does logging state snapshots help in capturing causal dependencies?
??x
Logging state snapshots ensures that every decision or event recorded by a system has a reference to its preceding state. Later events can then refer to these states, ensuring they are processed based on the context they were made in.

For example, if a user removes an ex-partner as a friend and then sends a message, logging the state before sending the message would ensure that any later processing (like notifications) checks this state.
```java
// Pseudocode illustrating state logging
class UserSession {
    private boolean isFriend;

    public void updateState(boolean isFriend) {
        this.isFriend = isFriend;
    }

    public boolean getIsFriend() {
        return isFriend;
    }
}

public class NotificationSystem {
    private Map<Long, UserSession> sessionLog;  // Log user sessions before actions

    public void logSession(UserSession session) {
        long timestamp = System.currentTimeMillis();
        sessionLog.put(timestamp, session);
    }

    public boolean checkCausality(long messageTimestamp, UserSession messageSession) {
        Long earliestLogTime = null;
        for (long key : sessionLog.keySet()) {
            if (key <= messageTimestamp && (earliestLogTime == null || key > earliestLogTime)) {
                earliestLogTime = key;
            }
        }
        return sessionLog.get(earliestLogTime).getIsFriend();
    }

    public void sendNotification(UserSession session) {
        boolean isStillAFriend = checkCausality(session.getTime(), session);
        if (isStillAFriend) {
            // Send notification
        } else {
            System.out.println("Not sending notification as user is no longer a friend.");
        }
    }
}
```
x??

---


#### Batch and Stream Processing Overview
Background context: This section discusses the goals of data integration, which involve consuming inputs, transforming, joining, filtering, aggregating, training models, and writing to outputs. It highlights that batch and stream processors are tools for achieving these goals.
:p What is the primary goal of data integration in batch and stream processing?
??x
The primary goal of data integration in batch and stream processing is to ensure that data ends up in the right form at all the correct places, involving a series of steps such as consuming inputs, transforming, joining, filtering, aggregating, training models, evaluating, and eventually writing outputs.
```java
// Pseudocode illustrating a simple batch workflow
class BatchWorkflow {
    public void processBatch(List<Event> events) {
        List<DerivedDataItem> processedItems = new ArrayList<>();
        
        for (Event event : events) {
            DerivedDataItem item = transform(event);
            if (item != null && shouldInclude(item)) {
                processedItems.add(item);
            }
        }

        writeProcessedData(processedItems);  // Write the derived data to an appropriate output
    }

    private DerivedDataItem transform(Event event) {
        // Logic to transform each event into a derived data item
        return new DerivedDataItem();  // Placeholder for actual transformation logic
    }

    private boolean shouldInclude(DerivedDataItem item) {
        // Logic to decide if the item should be included in the output
        return true;  // Placeholder for actual inclusion logic
    }

    private void writeProcessedData(List<DerivedDataItem> items) {
        // Writing the processed data to an appropriate output
    }
}
```
x??

---


#### Differences Between Batch and Stream Processing
Background context: The text explains that while batch and stream processing share many principles, their main difference lies in handling unbounded datasets for streams versus known, finite-size inputs for batches. Additionally, modern implementations are blurring the lines between these two paradigms.
:p How do batch and stream processing differ fundamentally?
??x
Batch processing deals with data of a known, finite size, typically ingesting all available data at once to perform transformations and produce outputs. Stream processing, on the other hand, handles unbounded datasets where data arrives continuously over time.

Modern systems often blur these lines, with frameworks like Apache Flink performing batch operations by treating them as special cases of stream processing, and Spark using microbatches for real-time processing.
```java
// Pseudocode illustrating batch vs. stream differences
public class DataProcessor {
    public void processBatch() {
        List<Event> events = fetchEvents();  // Fetch all known events at once

        // Process the entire batch of events
        for (Event event : events) {
            handleEvent(event);
        }
    }

    public void processStream() {
        Stream<Event> eventsStream = fetchEventsStream();  // Continuously fetch new events

        eventsStream.forEach(this::handleEvent);  // Process each incoming event as they arrive
    }

    private void handleEvent(Event event) {
        // Logic to handle individual events
    }
}
```
x??

---


#### Functional Flavor of Batch Processing

Batch processing has a strong functional flavor, encouraging deterministic, pure functions where outputs depend only on inputs, with no side effects. This approach treats inputs as immutable and outputs as append-only.

:p What are the key characteristics of functional programming in batch processing?
??x
In batch processing, each function is designed to be:
- Deterministic: The output is solely dependent on the input.
- Pure: Functions have no side effects other than explicitly returning a value.
- Immutable inputs: Inputs are treated as unchangeable and not modified.
- Append-only outputs: Outputs are added to existing data without overwriting it.

This design helps in creating reliable and predictable pipelines, which is crucial for maintaining state across failures (see “Idempotence”).

Example:
```java
public class BatchProcessor {
    public List<Integer> processData(List<String> input) {
        return input.stream()
                    .map(s -> Integer.parseInt(s))
                    .filter(i -> i > 10)
                    .collect(Collectors.toList());
    }
}
```
x??

---


#### Stream Processing and Managed State

Stream processing extends batch processing by allowing the management of state. This means that while processing a stream, you can maintain a state that persists even if parts of the system fail.

:p How does stream processing differ from batch processing in terms of state handling?
??x
Batch processing is more static, where each batch is processed independently without retaining any state between batches. In contrast, stream processing allows maintaining and managing state across multiple events or operations. This managed state helps in dealing with complex logic such as aggregations over time.

For instance, consider a scenario where you need to calculate the average of incoming numbers. Batch processing would compute this for each batch separately, whereas stream processing can maintain an ongoing sum and count to dynamically update the average.

Example:
```java
public class StreamProcessor {
    private int sum = 0;
    private int count = 0;

    public void processNumber(int number) {
        sum += number;
        count++;
        System.out.println("Current Average: " + (double)sum / count);
    }
}
```
x??

---


#### Synchronous vs Asynchronous Maintenance of Derived Data

Synchronous maintenance updates derived data at the same time as primary data, similar to how a database updates secondary indexes. However, asynchronous methods are more robust and scalable.

:p What is the advantage of using asynchronous maintenance for derived data?
??x
Asynchronous maintenance allows local containment of failures within specific parts of the system. In contrast, synchronous operations can spread failures across the entire distributed transaction if any participant fails, potentially leading to cascading issues.

For instance, consider a scenario where you maintain an index in a document-partitioned system asynchronously. If one partition experiences an issue, only that partition's processing is halted or delayed; other partitions continue unaffected. This contrasts with synchronous updates where any failure could abort the entire transaction and impact all participants.

Example:
```java
public class AsynchronousIndexUpdater {
    public void updateIndex(String key, String value) {
        // Asynchronous call to maintain index without blocking primary data processing
        indexService.update(key, value);
    }
}
```
x??

---


#### Reprocessing for Application Evolution

Reprocessing involves reanalyzing existing data to support new features or changed requirements. Both batch and stream processing can be used to achieve this.

:p How does reprocessing help in maintaining a system as it evolves?
??x
Reprocessing allows the integration of new features or changing requirements by analyzing historical data. For example, if an application needs to add a new feature like a machine learning model training on past data, reprocessing existing data can provide the necessary insights.

Batch processing is particularly useful here because it can handle large volumes of historical data efficiently. Stream processing, while not ideal for bulk history, can still be used to continuously update models or views as new data arrives.

Example:
```java
public class Reprocessor {
    public void reprocessData(String startDate) {
        // Read historical data from the start date and process it in batches
        List<DataRecord> historicalRecords = fetchDataFrom(startDate);
        for (DataRecord record : historicalRecords) {
            processData(record);
        }
    }

    private List<DataRecord> fetchDataFrom(String startDate) {
        // Fetch records starting from the specified date
        return dataStore.fetchRecords(startDate);
    }

    private void processData(DataRecord record) {
        // Process each record and update derived systems accordingly
        process(record);
    }
}
```
x??

---

---


#### Derived Views for Gradual Data Schema Evolution
Background context: To restructure a dataset without a sudden switch, derived views can be used. These allow maintaining both the old schema and the new schema side by side as two independently derived views onto the same underlying data. Users can gradually shift to the new view while continuing to use the old one.
:p How does derived view facilitate gradual evolution of a dataset?
??x
Derived views enable gradual changes in datasets by creating separate read-optimized views for both the old and new schemas that access the same underlying data. Users can start testing the new schema with a small number of users, gradually increasing their use until the entire system transitions to the new schema.
??x

---


#### Lambda Architecture
Background context: The lambda architecture addresses combining batch processing (historical data) and stream processing (recent updates). It uses an immutable event sourcing approach where events are appended to a dataset. Two parallel systems—batch processing for accurate but slower updates, and stream processing for fast approximate updates—are run.
:p What is the lambda architecture used for?
??x
The lambda architecture integrates batch and stream processing by maintaining an always-growing dataset of immutable events. It runs two parallel systems: a batch processor using Hadoop MapReduce for precise, slower updates; and a stream processor using Storm for fast, approximate updates. This design aims to balance reliability with performance.
??x

---


#### Code Example for Stream Processing in Lambda Architecture
Background context: In the lambda architecture, the stream processing system consumes events from an event store and produces approximate updates quickly.
:p Provide pseudocode for a simple stream processor in the lambda architecture.
??x
```java
// Pseudocode for a simple stream processor in the lambda architecture
public class StreamProcessor {
    private EventStore eventStore;

    public StreamProcessor(EventStore eventStore) {
        this.eventStore = eventStore;
    }

    // Consume events and produce approximate updates
    public void processEvent(Event event) {
        // Process the event (e.g., update a derived view)
        DerivedView updatedView = updateDerivedView(event);
        
        // Publish the update to a distributed system or cache
        publishUpdatedView(updatedView);
    }
    
    private DerivedView updateDerivedView(Event event) {
        // Logic to update the derived view based on the event
        return new DerivedView();
    }

    private void publishUpdatedView(DerivedView view) {
        // Publish the updated view to a distributed system or cache for quick access
    }
}
```
x??

---


#### Code Example for Batch Processing in Lambda Architecture
Background context: The batch processing system consumes events from an event store and produces accurate, slower updates.
:p Provide pseudocode for a simple batch processor in the lambda architecture.
??x
```java
// Pseudocode for a simple batch processor in the lambda architecture
public class BatchProcessor {
    private EventStore eventStore;
    
    public BatchProcessor(EventStore eventStore) {
        this.eventStore = eventStore;
    }

    // Consume events and produce accurate updates
    public void processEvents(List<Event> events) {
        for (Event event : events) {
            // Process the event (e.g., update a derived view)
            DerivedView updatedView = updateDerivedView(event);
            
            // Store or publish the final, accurate updated view
            storeUpdatedView(updatedView);
        }
    }

    private DerivedView updateDerivedView(Event event) {
        // Logic to update the derived view based on the event
        return new DerivedView();
    }

    private void storeUpdatedView(DerivedView view) {
        // Store or publish the final, accurate updated view
    }
}
```
x??

---

---


#### Lambda Architecture Challenges
Background context: The lambda architecture introduced a method for processing both batch and stream data, but faced practical issues such as additional effort required for maintaining logic across systems, merging outputs from separate pipelines, and the cost of frequent reprocessing.
:p What are some of the challenges associated with implementing the lambda architecture?
??x
The challenges include:
- Maintaining the same logic in both batch and streaming frameworks is significantly more complex.
- Merging results from stream and batch pipelines requires handling different types of computations (aggregations, joins, etc.).
- Reprocessing historical data frequently can be expensive on large datasets, leading to setup for incremental processing rather than full reprocessing.

This leads to operational complexity in debugging, tuning, and maintaining two separate systems.
??x

---


#### Data Merging in Lambda Architecture
Background context: In the lambda architecture, stream pipelines and batch pipelines produce separate outputs that need to be merged before responding to user requests. This merging process is straightforward for simple aggregations but becomes complex when dealing with more advanced operations or non-time series outputs.
:p What are some issues related to data merging in the lambda architecture?
??x
Issues include:
- Easy merging only works for simple aggregation over tumbling windows.
- More complex operations such as joins and sessionization complicate merging.
- Non-time-series output complicates the merging process further.

The merging complexity increases when dealing with more sophisticated computations, making it harder to integrate stream and batch outputs seamlessly.
??x

---


#### Batch Processing Incremental Batches
Background context: The lambda architecture often requires setting up a batch pipeline to process incremental batches rather than reprocessing everything due to the high cost of full reprocessing on large datasets. This setup introduces challenges in handling stragglers and window boundaries between batches.
:p How does incremental processing affect the lambda architecture?
??x
Incremental processing affects the lambda architecture by:
- Introducing complexity similar to streaming layers, which runs counter to keeping batch systems simple.
- Requiring solutions for handling straggler tasks and ensuring that windows do not cross batch boundaries.

This approach aims to balance between reprocessing efficiency and maintaining a simpler batch system design.
??x

---


#### Unifying Batch and Stream Processing
Background context: Recent work has aimed to unify batch and stream processing in one system, combining the benefits of both while mitigating their downsides. This unification requires features such as replaying historical events through the same engine that handles recent events, ensuring exactly-once semantics, and windowing by event time.
:p What are the key features required for unifying batch and stream processing?
??x
Key features include:
- Replay of historical events using the same processing engine (e.g., log-based message brokers).
- Exactly-once semantics to ensure fault-tolerance in stream processors.
- Windowing by event time, not processing time.

Tools like Apache Beam provide APIs for expressing such computations that can be run on platforms like Apache Flink or Google Cloud Dataflow.
??x

---


#### Code Example for Event Time Windowing with Apache Beam
Background context: Apache Beam provides an API for handling windows based on event times rather than processing times, which is crucial when reprocessing historical data.
:p Provide a code snippet demonstrating event time windowing in Apache Beam?
??x
```java
public class EventTimeWindow {
    // Define a PCollection of elements with timestamps
    PCollection<String> words = p.apply(Create.of("a", "b", "c"));

    // Apply windowing by event time and grouping
    PCollection<KV<WindowedValue<String>, Integer>> counts =
            words.apply(Window.into(FixedWindows.of(Duration.standardMinutes(5))))
                          .apply(GroupBy.extractKey((String s) -> s))
                          .apply(Count.perKey());

    // Process the output
    counts.apply(MapElements.via(new SimpleFunction<KV<WindowedValue<String>, Integer>, String>() {
        @Override
        public String apply(KV<WindowedValue<String>, Integer> input) throws Exception {
            return input.getKey().getTimestampOnly() + ": " + input.getValue();
        }
    }));

    p.run();
}
```

This code demonstrates how to window elements by event time and process them using Apache Beam.
??x
---

---

