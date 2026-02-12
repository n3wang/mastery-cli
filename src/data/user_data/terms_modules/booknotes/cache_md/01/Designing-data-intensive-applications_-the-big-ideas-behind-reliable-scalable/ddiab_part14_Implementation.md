# High-Quality Flashcards: Designing-data-intensive-applications_-the-big-ideas-behind-reliable-scalable_processed (Part 14)


**Starting Chapter:** Implementation of Replication Logs

---


#### Split Brain Scenario
Background context: A split brain scenario occurs when two nodes in a distributed system both believe they are the leader. Without proper conflict resolution, this can lead to data loss or corruption.
:p What is a split brain scenario and why is it dangerous?
??x
A split brain scenario happens when two nodes in a distributed system erroneously think they are the leaders simultaneously due to network partitioning or other issues. This situation is dangerous because both nodes might accept writes, leading to inconsistencies and data loss if there's no mechanism to resolve conflicts.

For example:
- Node A and Node B are part of a cluster.
- Due to a network glitch, communication between them is lost.
- Both nodes continue running assuming they are the leader.
- If both nodes accept writes without coordination, this can lead to conflicting states that cannot be resolved, causing data corruption.

x??

---


#### Timeout for Leader Detection
Background context: Determining when a node should be declared dead involves setting an appropriate timeout. A longer timeout means slower recovery in case of failure but shorter timeouts may trigger unnecessary failovers.
:p What factors are considered when determining the right timeout for leader detection?
??x
Factors to consider include:
- **Failure Recovery Time**: Longer timeouts allow more time for nodes to recover from temporary issues like network latency or load spikes.
- **Unnecessary Failovers**: Shorter timeouts might cause failovers due to temporary conditions, leading to suboptimal performance.

For example, a system might choose a timeout based on expected network conditions and node responsiveness:
```java
public class LeaderTimeoutConfig {
    private int timeoutMs;

    public void configure(int networkLatency) {
        // Adjust the timeout based on expected network latency
        if (networkLatency < 100) {
            timeoutMs = 500; // Shorter timeout for low-latency networks
        } else {
            timeoutMs = 2000; // Longer timeout for high-latency networks
        }
    }

    public int getTimeout() {
        return timeoutMs;
    }
}
```
x??

---


#### Statement-Based Replication
Background context: Statement-based replication logs every write request executed by the leader and sends these statements to followers. While simple, it can lead to issues with non-deterministic functions, autoincrement columns, and side effects.
:p What is statement-based replication and what are its limitations?
??x
Statement-based replication involves logging all SQL statements (INSERT, UPDATE, DELETE) executed by the leader and sending them to followers. Each follower then parses and executes these statements as if they were received from a client.

Limitations include:
- Non-deterministic functions like `NOW()` or `RAND()` can produce different values on each replica.
- Autoincrement columns may require specific order of execution across replicas.
- Side effects, such as triggers or stored procedures, might not be deterministic between replicas.

For example, handling non-deterministic functions by replacing them with fixed return values:
```java
public class StatementReplicator {
    private Map<String, String> functionReplacements;

    public void logStatement(String statement) {
        // Replace non-deterministic functions with fixed values
        if (statement.contains("NOW()")) {
            statement = statement.replace("NOW()", "'2023-10-01'");
        }
        // Add more replacements as needed
    }

    public String getReplacementFunction(String funcName) {
        return functionReplacements.getOrDefault(funcName, funcName);
    }
}
```
x??

---


#### Write-Ahead Log (WAL) Shipping
Background context: WAL shipping logs all writes to an append-only log that followers can process to build replicas. This method is used in PostgreSQL and Oracle but can be coupled closely with the storage engine.
:p What is WAL shipping and its main advantages?
??x
Write-ahead logging involves maintaining a write-ahead log (WAL) where every database write is first appended before being applied to the main data files. Followers read this log to build replicas, ensuring data consistency.

Advantages include:
- Replication can be decoupled from the storage engine's internals.
- Allows backward compatibility between leader and follower versions.

For example, a simple WAL shipping mechanism in PostgreSQL:
```java
public class WALShippingHandler {
    private List<WriteOperation> logEntries;

    public void appendLogEntry(WriteOperation entry) {
        // Append new write operation to the log
        logEntries.add(entry);
    }

    public void processLogOnFollower() {
        for (WriteOperation entry : logEntries) {
            entry.applyToDatabase(); // Apply operations on the follower
        }
    }

    static class WriteOperation {
        private String sql;
        
        public void applyToDatabase() {
            // Logic to apply the write operation
        }
    }
}
```
x??

---


#### Logical (Row-Based) Log Replication
Background context: Logical log replication logs writes at a row level, decoupling from the storage engine's internals. This allows more flexibility in running different versions of database software on leader and follower nodes.
:p What is logical (row-based) log replication and why is it useful?
??x
Logical log replication involves logging write operations at the row-level rather than at the statement level, allowing decoupling from the storage engine's internal representations. This method is used in MySQL with its binary logs.

Benefits include:
- Flexibility to run different versions of database software on leader and follower nodes.
- Easier parsing by external applications for data transfer or auditing purposes.

For example, a logical log entry for row-based replication:
```java
public class LogicalLogEntry {
    private String tableName;
    private int opType; // INSERT, DELETE, UPDATE
    private Map<String, Object> values;

    public void applyToDatabase() {
        if (opType == INSERT) {
            // Insert new row
        } else if (opType == DELETE) {
            // Delete existing row by primary key
        } else if (opType == UPDATE) {
            // Update existing row with new values
        }
    }

    public void logInsert(String tableName, Map<String, Object> values) {
        this.tableName = tableName;
        this.values = values;
        opType = INSERT;
    }

    public void logDelete(String tableName, int primaryKey) {
        this.tableName = tableName;
        this.opType = DELETE;
    }

    public void logUpdate(String tableName, Map<String, Object> beforeValues, Map<String, Object> afterValues) {
        this.tableName = tableName;
        this.values = afterValues; // Use new values
        opType = UPDATE;
    }
}
```
x??

---


#### Change Data Capture (CDC)
Background context: Change data capture is a technique used to track and record changes made to data in a database, which can be used for offline analysis or building custom indexes. This technique allows developers to react to and process these changes as they happen.

:p What is change data capture?
??x
Change data capture (CDC) is a method that tracks and records the changes made to data in a database system. These changes are then available for various purposes such as offline analysis or building custom indexes, enabling real-time processing of data modifications.
x??

---


#### Trigger-based Replication Overview
Background context: In some cases, the default replication mechanisms provided by databases may not suffice due to specific requirements like replicating only certain subsets of data, handling different types of database systems, or implementing conflict resolution logic. Trigger-based replication allows more flexibility by using application code to handle these scenarios.

:p What is trigger-based replication?
??x
Trigger-based replication involves the use of triggers and stored procedures within the application layer to replicate data changes from one system to another. Triggers are pieces of custom application code that automatically execute when a data change (write transaction) occurs in the database, logging these changes for external processes to read and apply necessary logic.

:p How does trigger-based replication work?
??x
Trigger-based replication works by having triggers register custom application code that executes on data changes. These triggers can log changes into separate tables, which are then read by an external process where any required application logic is applied before replicating the data change to another system.

Example:
```java
// Pseudocode for a trigger in SQL

CREATE TRIGGER log_changes
AFTER INSERT ON customers
FOR EACH ROW
BEGIN
    INSERT INTO change_log (customer_id, action, timestamp)
    VALUES (NEW.customer_id, 'INSERT', NOW());
END;
```
This example shows how a `log_changes` trigger logs insert operations into the `change_log` table.

x??

---


#### Problems with Replication Lag: Read-Your-Writes Consistency
Background context: Asynchronous replication can lead to issues where reads from replicas may not reflect the latest writes, causing apparent inconsistencies in applications. Ensuring read-after-write consistency (also known as read-your-writes) is crucial for maintaining user trust and application reliability.

:p What is read-after-write consistency?
??x
Read-after-write consistency ensures that if a user reloads the page after submitting data, they will always see any updates they submitted themselves. This guarantee provides assurance to users that their input has been saved correctly, even when reads are served from replicas.

:p How can we implement read-after-write consistency in a system with leader-based replication?
??x
Implementing read-after-write consistency involves techniques such as reading data the user may have modified from the leader and other data from followers. Criteria for deciding whether to read from the leader or follower include:
- Always reading a user's own profile from the leader.
- Tracking the last update time and making all reads from the leader within one minute of the last update.
- Monitoring replication lag on followers and preventing queries on any follower more than one minute behind the leader.

Example code snippet in Java:
```java
public class ReadConsistencyService {
    public boolean shouldReadFromLeader(String userId) {
        // Check if user's profile has been updated recently
        long lastUpdateTimestamp = getLastUpdateTimestamp(userId);
        long currentTime = System.currentTimeMillis();
        
        return (currentTime - lastUpdateTimestamp) < 60000;
    }
}
```
This example checks the timestamp of the most recent update for a user and ensures that reads are always from the leader if the update was within one minute.

x??

---

---


#### Logical Timestamps and Clock Synchronization
Logical timestamps can be used to indicate the ordering of writes, such as log sequence numbers. Actual system clocks require clock synchronization across replicas, which is crucial for correct functioning.
:p What are logical timestamps and why are they important?
??x
Logical timestamps provide a way to order writes without relying on real-time clocks. They ensure that operations are processed in the correct order, even if the actual time on different machines is not synchronized.

For example:
- A log sequence number can be used as a logical timestamp.
```java
public class Transaction {
    private long seqNumber;
    
    public void setSeqNumber(long seqNumber) {
        this.seqNumber = seqNumber;
    }
}
```
x??

---


#### Cross-Device Read-After-Write Consistency
To ensure that users see the latest updates on multiple devices, you need to manage timestamps or other metadata centrally. With distributed replicas across datacenters, routing requests to the same datacenter becomes a challenge.
:p How can cross-device read-after-write consistency be achieved?
??x
Cross-device read-after-write consistency requires maintaining consistent state across different devices and potentially centralizing timestamp information. One approach is using a centralized service or database that tracks the last update time for each user.

For example, to implement this in Java:
```java
public class UserConsistencyService {
    private Map<Long, Long> lastUpdateTimeMap; // Maps user ID to last update time
    
    public void recordUpdate(Long userId) {
        lastUpdateTimeMap.put(userId, System.currentTimeMillis());
    }
    
    public long getLastUpdateTime(Long userId) {
        return lastUpdateTimeMap.getOrDefault(userId, 0L);
    }
}
```
x??

---


#### Monotonic Reads
Monotonic reads ensure that a user does not see the system go backward in time when performing multiple queries. This is achieved by ensuring all reads are from the same replica.
:p What is the purpose of monotonic reads?
??x
The purpose of monotonic reads is to prevent users from seeing the system revert to older states after having seen newer states during a sequence of queries.

For example, in Java:
```java
public class MonotonicReadService {
    private Map<Long, Long> userReplicaMap; // Maps user ID to replica ID
    
    public void setReplicaForUser(Long userId, long replicaId) {
        userReplicaMap.put(userId, replicaId);
    }
    
    public long getReplicaForUser(Long userId) {
        return userReplicaMap.getOrDefault(userId, -1L); // Default to a fallback replica
    }
}
```
x??

---


#### Consistent Prefix Reads
Consistent prefix reads ensure that writes appear in the same order when read from any replica. This is crucial for maintaining causality in distributed systems.
:p How does consistent prefix reading prevent anomalies?
??x
Consistent prefix reads ensure that if a sequence of writes happens in a certain order, anyone reading those writes will see them in the same order, thus preventing causality violations.

For example, to maintain consistent prefix reads:
```java
public class ConsistentPrefixService {
    private List<WriteOperation> writeOperations; // Sequence of writes
    
    public void addWrite(WriteOperation operation) {
        writeOperations.add(operation);
    }
    
    public boolean isConsistentPrefix(long replicaId) {
        for (int i = 0; i < writeOperations.size(); i++) {
            if (!writeOperations.get(i).isApplied(replicaId)) return false;
        }
        return true;
    }
}
```
x??

---

---

