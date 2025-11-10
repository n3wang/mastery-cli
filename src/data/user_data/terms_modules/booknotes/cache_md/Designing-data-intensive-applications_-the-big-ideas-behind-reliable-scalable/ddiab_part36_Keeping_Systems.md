# High-Quality Flashcards: Designing-data-intensive-applications_-the-big-ideas-behind-reliable-scalable_processed (Part 36)


**Starting Chapter:** Keeping Systems in Sync

---


#### Log-Based Message Brokers vs. Traditional Message Brokers
Log-based message brokers store messages in a persistent log, allowing consumers to replay old messages without affecting other consumers or services. This is different from traditional message brokers where shutting down a consumer can disrupt service due to accumulated messages in queues.

:p What is the key difference between log-based and traditional message brokers when it comes to handling consumer shutdowns?
??x
Log-based message brokers allow a single consumer to stop consuming without disrupting other consumers or services. Traditional message brokers may leave lingering messages that continue to take up resources, potentially affecting active consumers.
```java
// Example of how offsets work in log-based messaging
public void consumeMessages() {
    // Consumer starts from offset X and processes messages sequentially
    for (Message msg : log.getMessageStream(offset)) {
        process(msg);
        moveOffsetForward(); // Update the offset to the next message
    }
}
```
x??

---


#### Event Streams and Databases
In a database context, events can be seen as records of data changes that need to be processed. Replication logs in databases are streams of write events, ensuring replicas end up in the same state through deterministic processing.

:p How do event streams relate to database replication?
??x
Event streams describe data changes in a database. In replication, these events are processed by followers, which apply them to their own copies of the database to maintain consistency across all replicas.
```java
// Pseudocode for applying write events from a leader to a follower
public void applyWriteEvents(List<WriteEvent> events) {
    for (WriteEvent event : events) {
        apply(event); // Apply each write event to the local database copy
    }
}
```
x??

---


#### Synchronization Across Heterogeneous Systems
In complex applications, different systems store data in optimized representations. Ensuring these systems stay synchronized can be challenging due to race conditions and inconsistent updates when using dual writes.

:p What is a common challenge with maintaining consistency across heterogeneous systems?
??x
Race conditions and inconsistencies arise when multiple clients concurrently update the same piece of data. Dual writes may result in different systems holding outdated or conflicting versions of the same data.
```java
// Pseudocode for handling concurrent updates to ensure consistency
public void handleConcurrentWrites() {
    // Ensure both database and search index are updated atomically
    if (updateDatabase(newValue)) {
        updateSearchIndex(newValue);
    }
}
```
x??

---


#### Atomic Commit Problem in Synchronization
Ensuring that changes across multiple systems succeed or fail together is challenging. The atomic commit problem, often solved using Two-Phase Commit (2PC), can be expensive and complex.

:p What is the atomic commit problem in the context of data synchronization?
??x
The atomic commit problem arises when updates need to be applied consistently across multiple systems. Ensuring that all systems either succeed or fail together requires coordination mechanisms like 2PC, which can be resource-intensive.
```java
// Pseudocode for a simplified Two-Phase Commit (2PC)
public void twoPhaseCommit() {
    if (prepare()) { // Prepare the transaction on both sides
        commit(); // Commit on both sides
    } else {
        abort(); // Abort on both sides
    }
}
```
x??

---

---


#### Change Data Capture (CDC) Overview
Change data capture involves observing and extracting all data changes made to a database so they can be replicated to other systems. Historically, databases have treated their replication logs as internal implementation details, making it difficult for clients to leverage them directly.

:p What is the main challenge with traditional database replication logs?
??x
The primary challenge is that databases traditionally consider their replication logs as internal and not exposed as a public API. Clients are expected to interact with the database through its data model and query language rather than parsing the log to extract changes.
x??

---


#### Use of CDC in Stream Processing
CDC allows for continuous application of changes to other systems, ensuring consistency across different storage technologies like search indices, caches, or data warehouses.

:p How can change data capture be used to maintain consistency between a database and another system?
??x
Change data capture can be used by continuously applying the changes from one database (the source) to another system (the target). For instance, capturing changes in a database and applying them in real-time to a search index ensures that both systems remain consistent. This process can be implemented using log-based message brokers or through triggers within the database.
x??

---


#### Implementation of Change Data Capture
Implementing CDC often involves setting up mechanisms like log consumers (derived data systems) that observe changes from the source database and apply them to other systems.

:p What are some common methods for implementing change data capture?
??x
Common methods include using database triggers, parsing replication logs, or leveraging specialized tools. For example, LinkedIn's Databus, Facebook’s Wormhole, and Yahoo’s Sherpa use these techniques at scale. PostgreSQL's Bottled Water uses an API to decode write-ahead logs, while Maxwell and Debezium parse MySQL binlogs.
x??

---


#### Asynchronous Nature of CDC
CDC systems are typically asynchronous, meaning the source database does not wait for changes to be applied to consumers before committing.

:p What is a key characteristic of change data capture implementations?
??x
A key characteristic is its asynchronous nature. The system of record commits changes without waiting for acknowledgment from downstream consumers. This approach provides operational flexibility but introduces challenges related to replication lag.
x??

---


#### Initial Snapshot in CDC
Initial snapshot involves taking a full copy of the database state before applying logs, ensuring complete data consistency.

:p What role does an initial snapshot play in change data capture?
??x
An initial snapshot is crucial for obtaining a consistent starting point. Without it, only incremental changes may miss out on older or outdated data. For example, building a new full-text index requires the entire database copy to ensure all data is included.
x??

---


#### Log Compaction in CDC
Log compaction helps manage storage by keeping only recent updates and removing duplicates.

:p What technique can be used to reduce log size while maintaining data integrity in change data capture?
??x
Log compaction can help reduce storage requirements. It periodically identifies duplicate records, retains the most recent update for each key, and discards older versions. For instance, a tombstone (a null value) might indicate deletions during log compaction.
x??

---


#### API Support for Change Streams
Modern databases are increasingly supporting change streams as a first-class interface.

:p How do modern databases support change data capture?
??x
Modern databases like RethinkDB, Firebase, CouchDB, and Meteor provide built-in mechanisms for change streams. For example, RethinkDB allows subscribing to notifications when query results change, while MongoDB's oplog is used by VoltDB for continuous data export.
x??

---

---


#### Change Data Capture
Change data capture (CDC) involves writing transactions to a special table that cannot be queried, but whose log of committed tuples is consumed by external systems. This allows for asynchronous updates and stream processing.

:p What does CDC involve?
??x
CDC involves writing transactions to a non-queryable special table where only the committed tuples are inserted. The log from this table captures all changes made by committed transactions in an order that matches their actual write time, avoiding race conditions.
x??

---


#### Kafka Connect for Change Data Capture
Kafka Connect integrates change data capture tools with Kafka, allowing stream of change events to be used to update derived data systems and feed into stream processing.

:p What does Kafka Connect do?
??x
Kafka Connect connects various database systems to Kafka, enabling the extraction and streaming of change events directly into Kafka topics. This integration supports updating derived data systems like search indexes and feeding event streams into other stream processing frameworks.
x??

---


#### Event Sourcing Technique
Event sourcing stores all changes to application state as a log of immutable events. Unlike CDC, which works at a lower level and captures database writes, event sourcing focuses on capturing high-level application actions.

:p What is the key difference between change data capture and event sourcing?
??x
The key difference lies in their abstraction levels: Change Data Capture (CDC) operates at the database level by extracting changes from low-level write operations. Event Sourcing works at a higher application level, storing every user action as immutable events that represent high-level actions rather than state changes.
x??

---


#### Benefits of Event Sourcing
Event sourcing offers several advantages such as easier debugging, better application evolution, and guarding against bugs.

:p What are the main benefits of using event sourcing?
??x
The main benefits include:
- Easier debugging due to a clear historical record of actions.
- Facilitating application evolution since events can be chained easily with new features.
- Preventing common bugs by recording user actions neutrally without embedding assumptions about later use cases.

Example: Storing "student cancelled their course enrollment" is clearer than multiple database updates.
x??

---


#### Deriving Current State from Event Log
To present current state, applications using event sourcing need to transform the log of events into a form suitable for users. This transformation should be deterministic and allow reconstruction of the system’s current state by replaying the logs.

:p How do applications derive current state from an event log?
??x
Applications derive current state by applying arbitrary logic on top of the immutable event log to create a view that reflects the current state of the application. This process is deterministic, ensuring consistency across different reads of the same events.
x??

---


#### Log Compaction in Event Sourcing
Log compaction is handled differently in CDC and event sourcing. In CDC, it discards redundant events by keeping only the latest version for primary keys. In contrast, event sourcing requires retaining all history to reconstruct final state accurately.

:p How does log compaction differ between change data capture and event sourcing?
??x
In Change Data Capture (CDC), log compaction can discard previous events for a given key after recording the most recent update because each CDC event contains the full new record version. However, in Event Sourcing, events model user actions rather than state changes, so later events do not override earlier ones; thus, retaining all history is necessary to reconstruct the final state.
x??

---


#### Using Snapshots for Performance Optimization
Applications using event sourcing often store snapshots of current states derived from the log of events. These are used for performance optimization by speeding up reads and recovery.

:p What is a common practice in applications that use event sourcing?
??x
A common practice is to store snapshots of the current state derived from the event log. This helps optimize performance by allowing faster reads and easier recovery post-crash, while still maintaining the ability to reprocess full logs if needed.
x??

---

---

