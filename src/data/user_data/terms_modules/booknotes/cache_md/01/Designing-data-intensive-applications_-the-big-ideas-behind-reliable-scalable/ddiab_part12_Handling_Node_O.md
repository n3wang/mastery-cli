# High-Quality Flashcards: Designing-data-intensive-applications_-the-big-ideas-behind-reliable-scalable_processed (Part 12)


**Starting Chapter:** Handling Node Outages

---


#### Leader and Synchronous Follower Replication
Leader-based replication involves a single leader node that coordinates writes to the database. Followers are synchronous followers, meaning they must acknowledge receipt of a write before it is considered durable by the system. This setup can be seen as semi-synchronous [7]. However, this configuration often allows for completely asynchronous operation.
:p What does a leader and one synchronous follower configuration imply in terms of durability?
??x
This configuration ensures that writes are acknowledged only after they have been successfully replicated to at least one follower. If the leader fails without replicating data to all followers, some writes may be lost depending on the degree of asynchrony.
```java
public class ReplicationSetup {
    public void setupSynchronousFollower() {
        // Code to ensure acknowledgment from a follower before marking write durable
    }
}
```
x??

---

#### Asynchronous Replication and Durability Trade-offs
In an asynchronous replication setup, the leader may continue processing writes even if followers have fallen behind. This can lead to data loss in case of a leader failure because unreplicated writes are lost.
:p Why is asynchrony often used despite potential durability issues?
??x
Asynchronous replication allows for continuous write processing by the leader without waiting for acknowledgments from followers, which enhances performance and availability, especially with many or geographically distributed followers. However, this comes at the cost of potential data loss in case of a leader failure.
```java
public class AsynchronousReplication {
    public void processWrites() {
        // Leader processes writes immediately, without waiting for followers to acknowledge
    }
}
```
x??

---

#### Chain Replication
Chain replication is a variant of synchronous replication that involves multiple layers or "chains" of replicas. It aims to provide strong consistency while maintaining high availability and performance.
:p What is the primary benefit of chain replication over traditional synchronous replication?
??x
Chain replication enhances fault tolerance by distributing writes across multiple layers, reducing the likelihood of a single point of failure. This approach helps in maintaining consistent data access even when individual replicas fail.
```java
public class ChainReplication {
    public void setupChain() {
        // Code to set up multi-layered replication chain for enhanced consistency and availability
    }
}
```
x??

---

#### Setting Up New Followers
To ensure a new follower has an accurate copy of the leader’s data, you cannot simply copy files from another node. Instead, take a consistent snapshot, copy it to the new follower, and then apply any subsequent changes.
:p How do you set up a new follower in an asynchronous replication system?
??x
First, create a consistent snapshot of the leader's database without locking it (to maintain availability). Then, transfer this snapshot to the new follower node. Finally, have the follower catch up by processing all pending data changes since the snapshot was taken.
```java
public class SetupNewFollower {
    public void setup() {
        // Take a consistent snapshot of the leader and copy it to the new follower
        // Apply backlog of data changes after the snapshot
    }
}
```
x??

---

#### Handling Node Outages in Leader-based Replication
In systems using leader-based replication, individual nodes can fail due to various reasons like hardware issues or planned maintenance. The goal is to maintain system availability despite node failures.
:p How does a system handle node outages in leader-based replication?
??x
For followers, they use their local log of received data changes to reconnect and catch up with the leader when restarted. For leaders, failover mechanisms are needed where another follower takes over as the new leader after the old one fails. This involves reconfiguring clients and other nodes.
```java
public class NodeOutageHandling {
    public void handleFailure() {
        // Detect failure, select a new leader, configure system to use new leader
    }
}
```
x??

---

#### Failover in Leader-based Replication
Failover is the process of promoting a follower to become the new leader after the current leader fails. This involves reconfiguring clients and ensuring the old leader stops acting as a leader.
:p What are the main steps involved in failover?
??x
1. Detect that the leader has failed (through timeouts).
2. Elect a new leader, either by majority vote or designated controller node.
3. Configure the system to use the new leader and stop the old one from acting as a leader.
```java
public class FailoverProcess {
    public void performFailover() {
        // Detect failure, elect new leader, reconfigure clients and nodes
    }
}
```
x??

---

#### Challenges in Automatic Failover
Automatic failover can face issues like conflicting writes if the new leader has processed data that overlaps with unreplicated writes from the old leader. Discarding writes may violate durability expectations.
:p What are some challenges of automatic failover?
??x
Challenges include potential loss of unreplicated writes, coordination issues with other storage systems, and ensuring data consistency across all replicas. Solutions often involve discarding writes or using more complex consensus mechanisms.
```java
public class AutomaticFailover {
    public void handleConflicts() {
        // Handle conflicts by discarding unreplicated writes or using advanced consensus
    }
}
```
x??

---


#### STONITH and Leader Detection
Background context: This section discusses a technique called STONITH (Shoot The Other Node In The Head), which is used to handle node failures in distributed systems. It ensures that only one leader exists at any given time, preventing split brain scenarios where multiple nodes might believe they are the leader.

:p What does STONITH stand for and what problem does it address?
??x
STONITH stands for "Shoot The Other Node In The Head" and is a technique used to ensure there is only one active leader in distributed systems. It addresses the issue of split brain, where multiple nodes might simultaneously believe they are the leaders, potentially leading to data corruption or loss.

???x
The technique works by shutting down another node if two nodes detect each other as leaders, ensuring that only one node remains operational and can continue to manage the system.
```java
public class STONITHHandler {
    private Node activeNode;
    
    public void handleFailure(Node node) {
        if (activeNode != null && node.isLeader()) {
            // Shut down the detected leader
            node.shutdown();
        }
    }
}
```
x??

---

#### Split Brain and Conflict Resolution
Background context: The text explains that in certain fault scenarios, two nodes might both believe they are leaders. This situation is called a split brain and can lead to data corruption if not handled properly.

:p What is a split brain scenario in distributed systems?
??x
A split brain scenario occurs when multiple nodes in a distributed system simultaneously believe they are the primary leader despite being disconnected from each other or experiencing network partitions. This situation can lead to inconsistencies and loss of data integrity because both nodes might process writes independently without knowing about the other's actions.

???x
To prevent such scenarios, systems often have mechanisms to detect split brain and shut down unnecessary nodes, but this requires careful design to avoid shutting down all nodes.
```java
public class SplitBrainDetector {
    private Set<Node> potentialLeaders;
    
    public void detectSplitBrain(Set<Node> nodes) {
        for (Node node : nodes) {
            if (node.isLeader()) {
                potentialLeaders.add(node);
            }
        }
        
        // Check for multiple leaders
        if (potentialLeaders.size() > 1) {
            handleSplitBrain(potentialLeaders.stream().findAny());
        }
    }
    
    private void handleSplitBrain(Optional<Node> detectedLeader) {
        detectedLeader.ifPresent(node -> node.shutdown());
    }
}
```
x??

---

#### Leader-Based Replication Methods
Background context: The text explains different methods of leader-based replication, including statement-based replication, write-ahead log (WAL) shipping, and logical (row-based) log replication. Each method has its advantages and disadvantages.

:p What is statement-based replication?
??x
Statement-based replication logs every SQL write request (statement) executed by the leader and sends these statements to followers for execution. This approach is simple but can have limitations due to nondeterministic functions, autoincrementing columns, and side effects like triggers or stored procedures.

???x
While this method works well in some scenarios, it faces challenges such as generating different values from nondeterministic functions across replicas and requiring precise order of statement execution for dependent statements. 
```java
public class StatementBasedReplicator {
    private List<String> statementLog;
    
    public void logStatement(String statement) {
        statementLog.add(statement);
    }
    
    public void replicateToFollowers(List<DatabaseNode> followers) {
        for (String stmt : statementLog) {
            for (DatabaseNode follower : followers) {
                follower.executeSQL(stmt);
            }
        }
    }
}
```
x??

---

#### Write-Ahead Log (WAL) Shipping
Background context: This method involves sending a write-ahead log to followers, which helps in building an exact copy of the database on another node. The log is used by the leader for both writing to disk and sending across the network.

:p What is WAL shipping?
??x
Write-Ahead Log (WAL) shipping is a replication technique where every write operation is first appended to a log before being applied to the main storage engine. This log is then sent to followers, allowing them to reconstruct the database state exactly as on the leader.

???x
This method ensures data consistency but can be tightly coupled with the storage engine, making it challenging to use different versions of software or storage engines on the leader and followers.
```java
public class WALShipper {
    private List<LogRecord> logRecords;
    
    public void recordWrite(LogRecord write) {
        logRecords.add(write);
    }
    
    public void sendToFollowers(List<DatabaseNode> followers) {
        for (LogRecord record : logRecords) {
            for (DatabaseNode follower : followers) {
                follower.applyLog(record);
            }
        }
    }
}
```
x??

---

#### Logical (Row-Based) Log Replication
Background context: This method uses a logical representation of changes to the database, which is easier to parse and more flexible compared to statement-based or WAL methods. It logs changes at the granularity of rows.

:p What is logical log replication?
??x
Logical log replication involves logging changes to the database at a row level rather than sending entire statements. This allows for better flexibility in handling different versions of software or storage engines while maintaining data consistency.

???x
Logical logs are easier to parse by external applications and can be backward compatible, making it simpler to perform zero-downtime upgrades. For example, MySQL's binlog uses this approach.
```java
public class LogicalLogReplicator {
    private List<RowChangeRecord> rowChanges;
    
    public void logInsert(RowInsertionRecord record) {
        rowChanges.add(record);
    }
    
    public void logUpdate(RowUpdateRecord record) {
        rowChanges.add(record);
    }
    
    public void sendToFollowers(List<DatabaseNode> followers) {
        for (RowChangeRecord change : rowChanges) {
            for (DatabaseNode follower : followers) {
                follower.applyRowChange(change);
            }
        }
    }
}
```
x??


#### Change Data Capture
Change data capture (CDC) is a technique used for capturing and transmitting changes made to a database. It allows for creating custom indexes, caches, or offline analysis. This method is particularly useful when dealing with large datasets where real-time updates are not necessary.

:p What is change data capture?
??x
Change Data Capture (CDC) involves tracking the changes that occur in a database and propagating those changes to other systems or for various analytical purposes. It's used for building custom indexes, caches, or performing offline analysis on data without needing immediate real-time updates.
x??

---

#### Trigger-based Replication
Trigger-based replication is an alternative approach to traditional database replication methods where the application code can be involved in handling data changes and replicating them to another system. This method uses triggers to automatically execute custom application code when a write transaction occurs, allowing more flexibility than built-in database replication.

:p What is trigger-based replication?
??x
Trigger-based replication involves using database triggers to execute custom application logic whenever a data change (write transaction) happens in the database. These triggers can log changes into a separate table from which an external process reads and replicates the data to another system. This approach provides more flexibility but comes with increased overheads and potential for bugs.

```java
// Example of a simple trigger in pseudo-code
public class DatabaseTrigger {
    @OnWriteTransaction
    public void onWrite(Transaction transaction) {
        // Log change into a separate table
        logChange(transaction.getDetails());
        
        // Replicate data using external process logic
        replicateData(transaction.getDetails());
    }
}
```
x??

---

#### Leader-based Replication and Read Scaling
Leader-based replication ensures all writes go through one primary node (leader), while reads can be distributed across multiple follower nodes. This setup is suitable for workloads with mostly read operations, allowing load distribution and geographical proximity to users.

:p What is leader-based replication?
??x
In leader-based replication, all write transactions must go through a single leader node. Read-only queries can then be directed to any of the follower nodes, which helps in distributing the read load across multiple instances. This architecture enhances scalability by allowing reads to be served from nearby replicas, improving overall performance and user experience.

```java
// Pseudo-code for a simple leader-based replication system
class ReplicationManager {
    Node leader;
    
    void handleWriteTransaction(Transaction transaction) {
        leader.applyTransaction(transaction);
    }
    
    void handleReadRequest(ReadRequest request) {
        // Determine the best replica based on proximity and load
        Node replica = getBestReplica();
        replica.serveRequest(request);
    }
}
```
x??

---

#### Eventual Consistency
Eventual consistency is a state where data across all nodes in a distributed system becomes consistent, but not necessarily immediately. It allows for high availability by accepting some degree of inconsistency temporarily until eventual synchronization.

:p What is eventual consistency?
??x
Eventual consistency refers to a situation in which data across all nodes in a distributed database will eventually become consistent, even if changes are initially visible only on certain nodes or take time to propagate. This concept is particularly relevant in systems where real-time full consistency isn't critical and trade-offs can be made for increased availability and performance.

```java
// Example of eventual consistency implementation in pseudo-code
class DatabaseManager {
    void writeData(Data data) {
        // Write data to the leader node first
        leader.write(data);
        
        // Allow followers to eventually catch up
        notifyFollowersToSync();
    }
    
    void readData(Node node) {
        if (node.isLeader()) {
            return node.read();
        } else {
            followerRead(node);
        }
    }
}
```
x??

---

#### Reading Your Own Writes
Reading your own writes is a concept where an application ensures that after a user submits data, they can reliably see their latest updates. This is particularly important in systems with asynchronous replication to avoid stale data issues.

:p How does read-after-write consistency ensure reading one's own writes?
??x
Read-after-write consistency, also known as read-your-writes consistency, guarantees that if a user reloads the page after making a write, they will always see their updates. This is crucial in systems with asynchronous replication where there might be delays before changes propagate to all replicas.

```java
// Pseudo-code for implementing read-after-write consistency
class DataPersistenceManager {
    void saveData(User user, Data data) {
        // Write data to the leader first
        writeLeader(user.id, data);
        
        // Optionally, cache the latest version on the client-side
        updateClientCache(user.id, data);
    }
    
    Data readLatestData(User user) {
        if (isLeaderAvailable()) {
            return readFromLeader(user.id);
        } else {
            return readFromFollower(user.id);
        }
    }
}
```
x??

---

