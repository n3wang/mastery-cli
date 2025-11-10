# High-Quality Flashcards: Designing-data-intensive-applications_-the-big-ideas-behind-reliable-scalable_processed (Part 25)


**Starting Chapter:** Relying on Linearizability

---


#### Linearizability in Distributed Systems
In distributed systems, linearizability is a consistency model that ensures operations appear to be executed atomically and sequentially as if they were operating on a single node. This property is crucial for ensuring correctness in scenarios where multiple nodes interact with shared state.

:p In what situation would you need linearizability?
??x
Linearizability is necessary when the system requires that all nodes agree on a single up-to-date value, such as in enforcing uniqueness constraints or implementing distributed locks and leader election. It ensures that operations on the system are ordered and consistent across all nodes, preventing issues like split brain where multiple nodes might think they are the leader.

---
#### Locking and Leader Election
Locking is used to ensure mutual exclusion in distributed systems by allowing only one node to perform critical operations at a time. In leader election, a single node must be chosen as the primary for decision-making processes. Both tasks require linearizable operations to ensure that all nodes agree on the outcome.

:p How does linearizability impact locking and leader election?
??x
Linearizability is essential for locking and leader election because it ensures that all nodes see the same sequence of operations, preventing issues like split brain where multiple nodes might think they are the leader. For example, a lock acquisition must be seen as a single atomic operation by all nodes to prevent race conditions.

---
#### Uniqueness Constraints
Uniqueness constraints ensure that certain pieces of data are unique across the system, such as usernames or file paths. These constraints need to be enforced linearly so that concurrent operations can either succeed or fail atomically, ensuring that no two users have the same username or no two files share the same path.

:p Why is linearizability important for enforcing uniqueness constraints?
??x
Linearizability is critical because it ensures that all nodes agree on a single up-to-date value. For example, when registering a user with a unique username, if the username already exists, the operation must fail atomically to ensure no two users can have the same name. Without linearizability, such constraints could be violated.

---
#### Cross-Channel Timing Dependencies
Timing dependencies in distributed systems often involve additional communication channels beyond the data flow. For instance, if a user updates their profile and another user refreshes their page, linearizability ensures that the second user sees an updated state, even if the first update happened seconds earlier.

:p How does linearizability affect timing dependencies?
??x
Linearizability helps manage cross-channel timing dependencies by ensuring that operations appear to be completed in a specific order, even when additional communication channels are involved. This prevents inconsistencies where one user might see outdated information because another action happened slightly before their refresh.

---
#### Example of Cross-Channel Timing with Image Resizing
Consider an architecture where users upload photos, and these images need to be resized for faster download. The web server writes the photo to a storage service and then places a message on a queue instructing the resizer to perform the job.

:p How is linearizability applied in this scenario?
??x
Linearizability ensures that the write operation completes before the resizing instruction is placed on the queue, preventing any node from seeing an inconsistent state. This guarantees that once a user uploads a photo, it will be resized and available for download without intermediate states causing confusion.

---
#### Summary of Linearizable Operations
Operations in distributed systems need to be linearizable when they involve critical shared data or require atomicity and consistency across multiple nodes. Ensuring these properties helps maintain the integrity and correctness of the system.

:p In what scenarios should you implement linearizable operations?
??x
Linearizable operations are essential for scenarios like enforcing uniqueness constraints, implementing distributed locks and leader election, ensuring cross-channel timing dependencies, and maintaining critical state in distributed databases. They help prevent issues where nodes might disagree on the order or outcome of operations.


#### Linearizability and File Storage Consistency
In the context of distributed systems, ensuring linearizable consistency is crucial for maintaining data integrity across multiple nodes. A system is said to be linearizable if it behaves as though there were only one copy of the data being accessed atomically by all operations.
:p What does linearizability ensure in a distributed system?
??x
Linearizability ensures that operations on shared data appear to happen in some total order, and each operation appears instantaneous. This means that if an operation A is performed before B, it will be reflected as such in the outcome of any subsequent read operation.
x??

---

#### Race Conditions Between File Storage and Message Queue
A race condition can occur when two or more operations compete for access to shared resources but operate independently without coordination. In the given context, a web server and an image resizer communicate through both file storage and a message queue, which can lead to inconsistencies if not managed properly.
:p What is a potential issue with using file storage and a message queue in parallel?
??x
A race condition may occur where the message queue processes messages faster than the internal replication inside the file storage service. This could result in the resizer fetching an old version of the image, leading to inconsistent data stored in the file storage.
x??

---

#### Implementing Linearizable Systems
To implement a linearizable system, you need to ensure that operations on shared data appear as though they are executed atomically and in some total order. One common approach is to use replication across multiple nodes, with mechanisms to handle leader failures and concurrent writes.
:p How can a single-leader replicated database be made linearizable?
??x
A single-leader replicated database can potentially be made linearizable by ensuring that reads and writes are performed through the leader node only. This guarantees that operations appear atomic and in a consistent order as seen from any client. However, it requires all read and write requests to go through the leader, which may not be fault-tolerant.
x??

---

#### Partitioning (Sharding) for Linearizability
Partitioning or sharding a single-leader database does not affect linearizability since it still operates under the assumption of a single authoritative copy per partition. However, cross-partition transactions can introduce issues if not handled properly.
:p How does sharding a single-leader database impact linearizability?
??x
Sharding a single-leader database into multiple partitions does not inherently affect its ability to provide linearizable consistency because each partition still has a single leader that ensures the illusion of a single copy. However, cross-partition transactions require additional coordination mechanisms to ensure consistent and linearizable behavior.
x??

---

#### Consensus Algorithms for Linearizability
Consensus algorithms like ZooKeeper and etcd can implement linearizable storage by incorporating measures to prevent split brain scenarios and stale replicas. These algorithms ensure that all operations are coordinated across nodes, maintaining the illusion of a single copy of data.
:p How do consensus algorithms achieve linearizable consistency?
??x
Consensus algorithms achieve linearizable consistency through mechanisms such as leader election, quorum-based agreement protocols, and fault tolerance measures. For example, ZooKeeper uses ZAB (ZooKeeper Atomic Broadcast) to ensure that all nodes agree on the state changes in a linear order.
```java
// Pseudocode for a simple consensus algorithm step
public void proposeCommand(Command cmd) {
    if (!isLeader()) return; // Only leader can propose commands
    
    // Send command to followers, wait for majority acknowledgment
    List<Future<Vote>> responses = sendToFellows(cmd);
    
    try {
        // Await acknowledgments from quorum size of nodes
        for (Future<Vote> response : responses) {
            response.get(); // Block until vote is received
        }
        
        applyCommand(cmd); // Apply command to state if majority agrees
    } catch (InterruptedException | ExecutionException e) {
        log.error("Failed to propose command", e);
    }
}
```
x??

---

#### Multi-Leader Replication and Linearizability
Multi-leader replication, where multiple nodes can accept write operations independently, generally does not provide linearizable consistency due to the concurrent processing of writes. This can lead to conflicts that require resolution mechanisms.
:p Why is multi-leader replication not suitable for implementing linearizability?
??x
Multi-leader replication fails to maintain linearizability because it allows concurrent writes on multiple nodes without a single point of control. Without coordination, these concurrent writes may conflict and result in inconsistent data states that are hard to resolve.
x??

---

#### Leaderless Replication and Linearizability
In leaderless replication models like Dynamo, achieving strong consistency is challenging due to the absence of a central leader. While quorum reads and writes can provide some level of consistency, clock skew and sloppy quorums can introduce non-linearizable behavior.
:p What challenges does leaderless replication pose for linearizability?
??x
Leaderless replication poses significant challenges for linearizability because it lacks a single authoritative node to coordinate operations. Without a central leader, concurrent write requests can lead to inconsistent states, especially when clock skew and sloppy quorums are involved.
```java
// Pseudocode for a leaderless read operation
public void readValue(int key) {
    List<Node> nodes = getReadQuorum(); // Select nodes based on the read quorum
    
    try (var client = new CassandraClient()) {
        for (Node node : nodes) {
            Result futureResult = client.executeReadCommand(key); // Asynchronous execution
            if (!futureResult.isFailed()) return; // Return on first successful read
        }
        
        throw new ConsistencyException("Failed to get value from quorum"); // Last resort
    } catch (TimeoutException e) {
        log.error("Timeout during read operation", e);
    }
}
```
x??

---

#### Linearizability and Quorums
Even with strict quorums, linearizable behavior can still be compromised in a Dynamo-style system due to variable network delays. The race condition demonstrated in Figure 9-6 shows that even if the quorum conditions are met, non-linearizable outcomes are possible.
:p What issue does Figure 9-6 illustrate regarding linearizability?
??x
Figure 9-6 illustrates how strict quorums can still result in non-linearizable behavior due to variable network delays. The example shows a situation where concurrent read and write operations lead to inconsistent states, violating the linearizability requirement.
```java
// Pseudocode for demonstrating race condition with quorum reads and writes
public void simulateRaceCondition(int key) {
    // Simulate initial state of x = 0
    
    Writer writer = new Writer(key); // Writer updates value to 1
    Reader readerA = new Reader(key, 2); // Reader A reads from a different quorum
    Reader readerB = new Reader(key, 2); // Reader B reads from the same quorum as A
    
    writer.startUpdate(); // Start write operation
    readerA.startRead(); // Simultaneous read by reader A
    readerB.startRead(); // Simultaneous read by reader B
    
    try {
        writer.waitForAck(); // Wait for acknowledgment of update
        if (readerB.isValueUpdated()) { // Check if reader B saw the new value
            System.out.println("Non-linearizable execution detected!");
        }
    } catch (TimeoutException e) {
        log.error("Operation timed out", e);
    }
}
```
x??


---
#### Dynamo-Style Quorum Consistency
Background context: In the context of distributed systems, Dynamo-style quorums can offer linearizable consistency. However, achieving this comes with trade-offs.

:p What is a potential method to achieve linearizability using Dynamo-style quorums?
??x
To achieve linearizability in a system that uses Dynamo-style quorums, a reader must perform read repair synchronously before returning results to the application, and a writer must read the latest state of a quorum of nodes before sending its writes. This ensures that the operation appears to happen atomically and serially from the perspective of a single client.
x??

---
#### Performance Considerations for Read Repair
Background context: Linearizability can be achieved in systems like Dynamo by performing read repair synchronously, but this comes at a performance cost.

:p Why does Riak not perform synchronous read repair?
??x
Riak avoids synchronous read repair because it incurs a significant performance penalty. By deferring the read repair operation to background processes, Riak maintains better performance while still attempting to maintain data consistency through asynchronous mechanisms.
x??

---
#### Cassandra's Approach to Read Repair
Background context: Cassandra performs read repair synchronously on quorum reads, which helps in maintaining data consistency but can lead to loss of linearizability under certain conditions.

:p How does Cassandra ensure data consistency during read operations?
??x
Cassandra ensures data consistency by performing read repair synchronously when a quorum of nodes is involved. This means that the system waits for the read-repair process to complete before returning results, which helps in maintaining data consistency.
x??

---
#### Last-Write-Wins Conflict Resolution
Background context: Cassandra uses last-write-wins (LWW) conflict resolution, which can compromise linearizability when multiple concurrent writes occur.

:p What is a limitation of using LWW for conflict resolution in Cassandra?
??x
Using LWW for conflict resolution in Cassandra can lead to loss of linearizability. This is because if multiple concurrent writes attempt to modify the same data simultaneously, only the last write will be preserved, and earlier writes may be lost. This can result in non-linearizable behavior from the perspective of a single client.
x??

---
#### Linearizability vs. Availability
Background context: The choice between linearizability and availability is often framed as a trade-off between consistency (CP) and availability (AP).

:p What are CP and AP strategies, and why are they sometimes avoided?
??x
CP stands for "consistent but not available under network partitions," while AP stands for "available but not consistent under network partitions." These terms describe the trade-offs in distributed systems. It is best to avoid overly categorizing these choices as either-or because both consistency and availability can be important depending on the application requirements. The classification scheme can oversimplify complex scenarios, leading to suboptimal design decisions.
x??

---
#### Multi-Leader Replication for Datacenters
Background context: Multi-leader replication allows datacenter autonomy in handling writes, which is useful for multi-datacenter setups.

:p How does multi-leader replication benefit multi-datacenter operations?
??x
Multi-leader replication benefits multi-datacenter operations by allowing each datacenter to have its own leader. This means that when network partitions occur, the local database can continue operating normally as writes are queued and synchronized once network connectivity is restored. Clients connected to follower nodes in one datacenter do not experience downtime or reduced availability during a partition.
x??

---
#### Single-Leader Replication Impact
Background context: In a single-leader setup, any read or write operations must go through the leader node, which can impact availability and performance during network partitions.

:p What are the challenges of using a single-leader replication model in multi-datacenter scenarios?
??x
In a single-leader setup, the challenge is that all read and write requests for linearizable operations must be directed to the leader. If there's a network partition between datacenters, clients connected to follower nodes cannot reach the leader and thus are unable to perform any writes or linearizable reads. This can lead to reduced availability and potential staleness in data.
x??

---


#### Linearizability and Network Interruptions
Background context explaining the concept. The CAP theorem states that for a distributed system, it is impossible to simultaneously achieve consistency (C), availability (A), and partition tolerance (P). If an application requires linearizable reads and writes, network interruptions can cause unavailability in certain datacenters.
:p What happens if an application requires linearizability and faces network interruptions?
??x
If the application requires linearizability and some replicas are disconnected from others due to a network problem, those replicas cannot process requests while they are disconnected. They must either wait until the network issue is resolved or return an error, making them unavailable during this period.
```java
// Pseudocode for handling network interruptions in a leader-based system
public void handleRequest(Request request) {
    if (isLeader() && isConnectedToOtherReplicas()) {
        processRequest(request);
    } else {
        // Wait for network to be fixed or return an error
        waitOrReturnError();
    }
}
```
x??

---

#### Multi-leader Replication and Availability
Background context explaining the concept. If an application does not require linearizability, it can implement multi-leader replication to ensure availability in case of network issues.
:p How can a system remain available if it does not need linearizability?
??x
A system that does not need linearizability can be designed so that each replica processes requests independently even when disconnected from other replicas. This approach, known as multi-leader replication, ensures that the application remains available during network issues.
```java
// Pseudocode for a multi-leader replication mechanism
public void handleRequest(Request request) {
    if (isLeader()) {
        processAndPropagateRequest(request);
    } else {
        processLocalRequest(request);
    }
}
```
x??

---

#### Partitioning and Sharding in Distributed Systems
Background context explaining the concept. The book uses partitioning to refer to deliberately breaking down a large dataset into smaller ones, which is known as sharding (Chapter 6). A network partition is a type of fault that can occur, leading to unavailability.
:p What does partitioning mean in distributed systems?
??x
Partitioning in distributed systems involves splitting a large dataset into smaller subsets. This process, also known as sharding, helps manage data distribution and improve performance. However, it introduces the risk of network partitions, which are specific types of faults where parts of the system become isolated from each other.
```java
// Pseudocode for sharding data across multiple servers
public void shardData(List<Data> data) {
    List<Shard> shards = divideDataIntoShards(data);
    distributeShardsToServers(shards);
}
```
x??

---

#### CAP Theorem and Its Impact on Design Choices
Background context explaining the concept. The CAP theorem highlights the trade-offs between consistency, availability, and partition tolerance in distributed systems.
:p What is the CAP theorem?
??x
The CAP theorem states that it is impossible for a distributed system to simultaneously achieve all three of the following properties: Consistency (C), Availability (A), and Partition Tolerance (P). Designers must choose two out of these three guarantees. The theorem has influenced database design by encouraging engineers to explore various trade-offs.
```java
// Pseudocode illustrating CAP theorem in action
public void ensureConsistency() {
    if (isPartitioned()) {
        // Handle partitioned state with careful design choices
    } else {
        enforceConsistencyRules();
    }
}
```
x??

---

#### Unhelpful Presentation of the CAP Theorem
Background context explaining the concept. While useful, the phrase "Consistency, Availability, Partition tolerance: pick 2 out of 3" can be misleading as it implies a choice between fault types.
:p Why is presenting the CAP theorem as "Consistency, Availability, Partition tolerance: pick 2 out of 3" considered unhelpful?
??x
Presenting the CAP theorem this way can be misleading because network partitions are not a choice but a reality that systems must deal with. Designers do not get to avoid partition faults; they need to design for their occurrence and plan accordingly.
```java
// Pseudocode demonstrating how to handle network partitions
public void handleNetworkPartition() {
    if (isPartitioned()) {
        // Implement strategies like quorum voting or local processing
    } else {
        continueNormalOperations();
    }
}
```
x??

---


#### CAP Theorem Overview
Background context explaining the CAP theorem. It states that a distributed system can at most provide two of the following three guarantees: Consistency, Availability, and Partition tolerance. When a network fault occurs, you have to choose between either linearizability or total availability.

:p What does the CAP theorem state about distributed systems?
??x
The CAP theorem asserts that in a distributed system, it is impossible to simultaneously achieve consistency (every node sees the same sequence of updates), availability (every request receives a response indicating success or failure), and partition tolerance (the system continues to operate despite arbitrary message loss). At least one of these guarantees must be sacrificed.
x??

---

#### Linearizability in Distributed Systems
Background context explaining linearizability, which is a consistency model ensuring that operations appear to users as if they were executed atomically by a single thread. This is contrasted with partition tolerance and network delays.

:p What is the primary concern of linearizability?
??x
Linearizability ensures that each operation in a distributed system appears to have completed before any subsequent operation, making it behave as if it were executed sequentially on a single machine. However, this comes at a cost: it can significantly impact performance due to network delays and the need for strong consistency guarantees.
x??

---

#### Performance vs. Fault Tolerance
Background context explaining that many systems choose not to provide linearizable guarantees primarily to increase performance rather than enhance fault tolerance.

:p Why do many distributed databases drop linearizability?
??x
Many distributed databases sacrifice linearizability to improve performance. In scenarios where strong consistency is not strictly required, weaker consistency models can be used to reduce latency and improve overall system responsiveness.
x??

---

#### Memory Consistency Models in Modern CPUs
Background context explaining the limitations of modern CPU memory consistency models due to multi-core architectures and cache hierarchies.

:p Why are RAM writes on modern multi-core CPUs not linearizable?
??x
Modern multi-core CPUs use a caching mechanism where each core has its own local cache. Writes from one core may not be immediately visible to other cores, leading to situations where reads by another thread might not see the latest value written by a different thread. This is due to the asynchronous nature of cache coherence protocols like MESI (Modified, Exclusive, Shared, Invalid).
x??

---

#### Impossibility Result in Distributed Systems
Background context explaining that there are more precise results than CAP that supersede it.

:p What has replaced the CAP theorem as being of practical value for designing systems?
??x
The CAP theorem is now considered largely historical and has been superseded by more precise impossibility results in distributed systems. These newer results provide a clearer understanding of trade-offs between consistency, availability, and fault tolerance.
x??

---

#### Trade-off Between Linearizability and Performance
Background context explaining the inherent performance trade-offs associated with linearizability.

:p Why is achieving linearizability slow?
??x
Achieving linearizability in distributed systems can be slow because it requires ensuring that operations appear to have been executed atomically, even when network delays are variable. This means response times for read and write requests are at least proportional to the uncertainty of delays in the network.
x??

---

#### Alternatives to Linearizable Consistency
Background context explaining that weaker consistency models can be much faster than linearizable ones.

:p What is a benefit of using weaker consistency models over linearizability?
??x
Weaker consistency models, such as eventual consistency or session consistency, can provide significantly lower latency and higher performance compared to linearizability. This makes them more suitable for systems where strict ordering of operations is not critical.
x??

---

#### Handling Network Delays and Partitions
Background context explaining that network delays and partitions can impact the performance and consistency of distributed systems.

:p How do network delays affect the response time in linearizable reads and writes?
??x
Network delays significantly affect the response time for linearizable reads and writes. Since linearizability requires coordination across nodes, which is delayed by network latency, these operations can be slower, especially in networks with highly variable or unbounded delays.
x??

---

