# High-Quality Flashcards: Designing-data-intensive-applications_-the-big-ideas-behind-reliable-scalable_processed (Part 24)


**Starting Chapter:** Relying on Synchronized Clocks

---


#### Robust Software Design for Clocks
Background context explaining the necessity of designing robust software to handle faulty network conditions and incorrect clock behavior gracefully. The text emphasizes that while networks are generally reliable, software should anticipate faults and manage them appropriately.

:p Why is it important to design software to handle incorrect clocks?
??x
It is crucial because even though clocks work well most of the time, they can drift due to various issues such as misconfigured NTP or defective hardware. Robust software must be prepared to deal with these situations without causing significant damage.
x??

---


#### Clock Monitoring and Cluster Management
Background context explaining how monitoring clock offsets between nodes is essential to detect and manage incorrect clocks in a cluster. Nodes that drift too far from others should be identified and removed to prevent data loss or other issues.

:p Why is monitoring clock offsets important?
??x
Monitoring clock offsets ensures that any node with an incorrectly synchronized clock is detected before it causes significant damage, such as silent data loss. This helps maintain the integrity of distributed systems where accurate timestamps are critical.
x??

---


#### Timestamps for Ordering Events
Background context explaining why relying on time-of-day clocks to order events can be dangerous in a distributed system. Example given involves a database with multi-leader replication, where timestamps may not correctly reflect causality.

:p Why is it risky to use time-of-day clocks for ordering events?
??x
Using time-of-day clocks for ordering events can lead to incorrect conclusions about the sequence of events due to clock drift or skew between nodes. For example, in a distributed database with multi-leader replication, timestamps may not accurately reflect which write occurred first if the clocks are not synchronized.
x??

---


#### Example of Timestamp Inconsistency
Background context includes an example where client B’s timestamp is earlier than client A’s despite causally later events.

:p What does Figure 8-3 illustrate about time-of-day clock usage?
??x
Figure 8-3 illustrates that even with good clock synchronization (skew < 3 ms), timestamps based on local clocks may not correctly order events. Client B's write x = 2, which occurred causally after client A’s write x = 1, has an earlier timestamp due to the way timestamps are generated.
x??

---

---


---
#### Last Write Wins (LWW) Conflict Resolution Strategy
Background context explaining the concept of LWW, its usage in distributed databases like Cassandra and Riak. The strategy involves keeping the last written value and discarding concurrent writes.

:p What is the fundamental problem with using Last Write Wins (LWW) for conflict resolution?
??x
The primary issue with LWW is that database writes can mysteriously disappear if a node with a lagging clock attempts to overwrite values written by a faster clock. This can lead to data being silently dropped without any error reports, as the system might interpret the slower clock's write as an older version and thus discard it.

Example:
If Client A writes "1" at time T1, and Client B tries to increment to "2" at time T2 but node A has a faster clock than node B, then according to LWW, Client B’s write might be discarded if the clocks are not perfectly synchronized.
x??

---


#### Causality Tracking Mechanisms in Distributed Systems
Background context on why LWW alone is insufficient for distinguishing between sequentially ordered writes and concurrent writes. Introduction of causality tracking mechanisms like version vectors.

:p Why are causality tracking mechanisms necessary with Last Write Wins (LWW)?
??x
Causality tracking mechanisms, such as version vectors, are essential because LWW cannot reliably distinguish between sequentially ordered writes and truly concurrent writes. Without additional information about the order of events, it's impossible to ensure that the system respects the actual causal relationships.

Example:
In Figure 8-3, if Client B’s increment operation is supposed to occur after Client A’s write but they are both considered concurrent by LWW, causality tracking would help identify that Client B's action is actually a follow-up to Client A's write.
```java
// Pseudocode for version vector implementation
public class VersionVector {
    private Map<String, Integer> vector;

    public void incrementVersion(String key) {
        vector.put(key, vector.getOrDefault(key, 0) + 1);
    }

    // Check if two operations are concurrent or sequential using version vectors
    public boolean areConcurrent(VersionVector other) {
        for (Map.Entry<String, Integer> entry : vector.entrySet()) {
            if (!other.vector.containsKey(entry.getKey()) || other.vector.get(entry.getKey()) <= entry.getValue()) {
                return false;
            }
        }
        // Similarly check other's vector against this
        return true; // If all checks pass, they are concurrent
    }

    public static void main(String[] args) {
        VersionVector v1 = new VersionVector();
        v1.incrementVersion("A");
        v1.incrementVersion("B");

        VersionVector v2 = new VersionVector();
        v2.incrementVersion("C");

        System.out.println(v1.areConcurrent(v2)); // Should print false
    }
}
```
x??

---


#### Logical Clocks for Event Ordering
Background context on the limitations of physical clocks and why logical clocks are a safer alternative. Explanation that logical clocks focus on relative ordering rather than time-of-day or elapsed seconds.

:p What are logical clocks, and how do they differ from physical clocks?
??x
Logical clocks are a method for ordering events based on incrementing counters instead of oscillating quartz crystals like traditional physical clocks. Logical clocks measure the relative ordering of events (whether one happened before another) rather than providing an absolute time-of-day or monotonic time measurement.

Example:
In logical clocks, each event is assigned a unique sequence number that increases with each occurrence. This allows for distinguishing between concurrent and sequential writes without relying on potentially unreliable local time clocks.
```java
// Pseudocode for implementing a simple logical clock
public class LogicalClock {
    private static int nextSequenceNumber = 0;

    public synchronized int getNextTimestamp() {
        return ++nextSequenceNumber;
    }

    // Method to compare two timestamps for ordering
    public boolean isBefore(int t1, int t2) {
        return t1 < t2;
    }
}

public class LogicalClockExample {
    public static void main(String[] args) {
        LogicalClock clock = new LogicalClock();
        int timestamp1 = clock.getNextTimestamp();
        int timestamp2 = clock.getNextTimestamp();

        System.out.println("Is " + timestamp1 + " before " + timestamp2 + "? " + clock.isBefore(timestamp1, timestamp2));
    }
}
```
x??

---

---


#### TrueTime API in Spanner
Background context: Google's TrueTime API is designed for distributed systems where precise time information is critical, particularly in applications requiring strong consistency and accurate timestamps. It provides explicit confidence intervals around the local clock reading.

:p What does TrueTime API provide to users?
??x
TrueTime API returns two values: [earliest, latest], representing the earliest possible and the latest possible timestamp. This interval reflects the uncertainty of the current time based on the system's calculations.
```java
// Example usage of TrueTime API (pseudo-code)
long[] timestamps = trueTimeAPI.getCurrentTimestamp();
long earliestTimestamp = timestamps[0];
long latestTimestamp = timestamps[1];

// Users can use these values to ensure operations are within a certain time range.
```
x??

---


#### Synchronized Clocks for Global Snapshots
Background context: Snapshot isolation is a technique used in distributed databases to support both fast read-write transactions and long-running read-only transactions without locking. It requires monotonically increasing transaction IDs to determine visibility of writes.

:p How does snapshot isolation handle global transactions across multiple nodes?
??x
To achieve snapshot isolation, the system uses a monotonically increasing transaction ID that reflects causality. This means if transaction B reads data written by transaction A, B must have a higher transaction ID than A. On a single-node database, a simple counter suffices. However, in distributed systems, generating such an ID across multiple nodes and data centers is challenging due to the need for global coordination.

```java
// Pseudo-code for generating transaction IDs on a single node
public class TransactionManager {
    private int nextTransactionId = 0;

    public synchronized long generateNextTransactionId() {
        return ++nextTransactionId;
    }
}
```
x??

---


#### Monotonically Increasing Transaction IDs in Distributed Systems
Background context: In distributed databases, maintaining a monotonically increasing transaction ID that reflects causality is crucial for snapshot isolation. However, generating such an ID across multiple nodes and data centers requires coordination to ensure the order of transactions.

:p What challenges arise when generating monotonically increasing transaction IDs in a distributed system?
??x
Challenges include ensuring causality (transaction B must have a higher ID than A if B reads data written by A) and maintaining global coordination. Without proper synchronization, it can be difficult to generate globally consistent transaction IDs that reflect the correct order of transactions across multiple nodes.

```java
// Pseudo-code for generating transaction IDs in a distributed system with coordination
public class DistributedTransactionManager {
    private Map<String, Long> lastKnownTxnIds = new HashMap<>();

    public long generateNextTransactionId(String nodeID) {
        // Fetch the latest known ID from this node or other nodes
        long lastKnownId = lastKnownTxnIds.getOrDefault(nodeID, 0L);
        
        // Increment and update in a synchronized manner to maintain causality
        synchronized (lastKnownTxnIds) {
            long newId = ++lastKnownId;
            lastKnownTxnIds.put(nodeID, newId);
            return newId;
        }
    }
}
```
x??

---

---


#### Distributed Sequence Number Generators (Snowflake)
Background context: Distributed systems require unique IDs for transactions and other operations. Snowflake is a popular example of such a generator used by Twitter, which allocates blocks of ID space to different nodes in a scalable way. However, these sequences do not guarantee causal ordering due to the time scale at which block allocations occur.
:p What are the limitations of distributed sequence number generators like Snowflake?
??x
The main limitation is that they cannot guarantee consistent ordering with causality because the block allocation timescale is often longer than the database operations' timescale. This can lead to situations where transactions that logically should have happened later get IDs earlier than those that occurred after them.
x??

---


#### Using Timestamps for Transaction IDs (Spanner Example)
Background context: Spanner uses clock confidence intervals to ensure transaction timestamps reflect causality, which is crucial in distributed systems with small and rapid transactions. The TrueTime API provides these confidence intervals, allowing Spanner to determine order without ambiguity.
:p How does Spanner use clock uncertainty to ensure causality in its transaction IDs?
??x
Spanner ensures causality by waiting for the length of the confidence interval before committing a read-write transaction. This ensures that any potential reader sees data from a later time, avoiding overlapping intervals. For instance, if one transaction has a confidence interval [Aearliest, Alatest] and another [Bearliest, Blatest], non-overlapping intervals guarantee B happened after A.
x??

---


#### Clock Synchronization for Distributed Transactions
Background context: Clock synchronization is critical in distributed systems to ensure accurate timestamps and proper ordering of transactions. Spanner uses TrueTime API confidence intervals to mitigate uncertainty caused by clock inaccuracies. Google maintains minimal clock uncertainty through GPS receivers or atomic clocks in each datacenter.
:p Why does Spanner wait for the length of the confidence interval before committing a transaction?
??x
Spanner waits for the length of the confidence interval to ensure that any potential reader sees data from a later time, thus avoiding overlapping intervals. This practice prevents the uncertainty that would arise if transactions could read conflicting data.
x??

---


#### Lease Management in Distributed Systems
Background context: In distributed systems with single leaders per partition, nodes must frequently check their leadership status using leases. A lease is akin to a timeout lock and allows only one node to be the leader at any time. Nodes renew their leases periodically to maintain leadership.
:p What potential issue does relying on synchronized clocks for lease renewal pose?
??x
Relying on synchronized clocks for lease renewal can lead to issues if clock synchronization isn't perfect, as seen in the example where the local system clock is compared with a remote expiry time. Any discrepancy could cause nodes to prematurely or incorrectly renew leases.
x??

---

---


#### Concept of Garbage Collection Pauses
Garbage collection (GC) is a feature in many programming language runtimes, like the Java Virtual Machine (JVM). It periodically stops all running threads to reclaim memory. These "stop-the-world" GC pauses can last for several minutes and significantly impact lease management.

:p What are stop-the-world garbage collection pauses?
??x
Stop-the-world garbage collection pauses are periods during which all threads in a JVM are paused while the garbage collector runs to free up unused memory. Although concurrent garbage collectors like the HotSpot JVM’s CMS try to minimize these pauses, they still require occasional full GC cycles that can last for several minutes.

```java
public class GarbageCollectorPause {
    // This method simulates a garbage collection pause.
    public static void simulateGC() {
        System.out.println("Simulating GC pause...");
        // Simulate a long pause here.
        try {
            Thread.sleep(60000);  // Sleep for 1 minute as an example.
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
```
x??

---


#### I/O Pauses and GC Pauses
I/O pauses can occur due to various reasons, including network filesystems or block devices like Amazon’s EBS. Additionally, garbage collection (GC) may cause delays as it pauses the execution of threads to clean up unused memory.

Network filesystems introduce variability in I/O latency, making it unpredictable.
:p How do network filesystems affect I/O performance?
??x
Network filesystems can significantly increase I/O latencies due to the additional network layer. This can lead to variable and potentially high delays when reading or writing data compared to local storage. For example, if a file is stored on an EBS volume in AWS, any read or write operations will be subject to both the local drive performance and the network latency between your instance and the EBS service.
x??

---


#### Paging Mechanism
Paging occurs when the operating system allows swapping of pages from memory to disk. This can cause delays during simple memory accesses, especially under high memory pressure.

A page fault can occur due to a lack of available physical memory, requiring data to be swapped out to disk and then back in.
:p What is paging and how does it affect thread execution?
??x
Paging allows the operating system to swap entire pages (chunks) of virtual memory to and from disk. This mechanism helps manage limited physical RAM by allowing processes to use more than what's physically available at any given time.

During a page fault, if a process tries to access data that isn't currently in physical memory, the operating system pauses the thread to load the necessary data from disk into memory. If the memory is under high pressure, this can result in further context switches as pages are swapped out and then back in.
x??

---


#### Thrashing
Thrashing occurs when a system spends most of its time swapping pages between disk and memory, leading to poor performance and minimal actual work being done.

This condition often happens when the working set of processes exceeds the available physical memory.
:p What is thrashing and how does it manifest?
??x
Thrashing is a state where a computer system spends most of its CPU cycles managing page faults due to inadequate physical memory. This results in minimal useful work being performed, as the operating system focuses on swapping pages between disk and RAM instead.

To mitigate this, paging can be disabled on server machines, allowing the operating system to terminate processes that are consuming excessive memory rather than causing thrashing.
x??

---


#### Distributed Systems Challenges
In distributed systems, nodes must handle the possibility of arbitrary pauses without shared memory. Context switches in these environments are more unpredictable compared to single-machine scenarios.

Nodes in a distributed system should be designed to handle significant delays or even crashes.
:p How do distributed systems manage delays and context switches?
??x
Distributed systems operate over unreliable networks, making it challenging to maintain consistent behavior across nodes. Each node must assume that its execution can be paused for an extended period at any time, as the network may introduce arbitrary delays.

To handle these challenges, distributed systems often rely on mechanisms like timeouts, retries, and leader election algorithms rather than shared memory. These techniques ensure that the system remains functional even when individual components experience significant delays or crashes.

For example, a distributed consensus algorithm might use a timeout mechanism to detect unresponsive nodes and trigger failover processes.
x??

---

---


#### Safety-Critical Embedded Devices
Background context: Real-time systems are most commonly used in safety-critical embedded devices, such as cars, where delays could be catastrophic.

:p Why are real-time guarantees particularly important in safety-critical embedded devices?
??x
Real-time guarantees are crucial in safety-critical embedded devices because they ensure that critical operations, like airbag deployment, occur within specified time constraints. Delays can have severe consequences.
x??

---


#### Testing and Measurement
Background context: Extensive testing and measurement are necessary to ensure that real-time guarantees are being met in a system.

:p Why is extensive testing and measurement crucial in real-time systems?
??x
Extensive testing and measurement are crucial because they verify that all components of the system meet their timing requirements under various conditions, ensuring reliable operation.
x??

---


#### Node Restarting Strategy
Background context: A strategy is proposed where nodes are restarted periodically, limiting long-lived object accumulation.

:p What is the strategy of restarting processes in real-time systems?
??x
The strategy involves restarting processes periodically to limit the accumulation of long-lived objects that require full GC pauses. One node can be restarted at a time, and traffic can be shifted away from it before the planned restart.
x??

---


#### Uncertainty in Distributed Systems
Background context: In distributed systems, nodes cannot be sure about the state or behavior of other nodes. They can only make guesses based on messages received through an unreliable network with variable delays. Partial failures and unreliable clocks further complicate the situation.

:p How does the uncertainty in distributed systems affect node behavior?
??x
In distributed systems, nodes must make decisions based on partial and potentially unreliable information from their peers. Because of the unreliable nature of message passing and potential partial failures, a node cannot be certain about another node’s state or availability. For instance, if a node fails to receive a response within a timeout period, it might incorrectly assume that the other node is dead.

```java
// Pseudocode for handling timeouts in distributed systems
public void handleMessage(Node sender, Message msg) {
    if (System.currentTimeMillis() - lastReceived[msg.source] > timeout) {
        markNodeAsDead(msg.source);
    }
}

private void markNodeAsDead(int nodeId) {
    // Update local state to reflect that the node is assumed dead
}
```
x??

---


#### Asymmetric Faults in Distributed Systems
Background context: An asymmetric fault occurs when a node can receive messages but not send them, leading other nodes to mistakenly declare it as faulty.

:p How does an asymmetric fault manifest in a distributed system?
??x
An asymmetric fault happens when a node is able to receive all incoming messages but cannot send any outgoing ones. This situation can lead to other nodes wrongly declaring the node dead or malfunctioning because they do not receive acknowledgments from it. The node might be fully functional and receiving requests, but without sending responses, it appears non-responsive.

```java
// Pseudocode for detecting an asymmetric fault
public class Node {
    private boolean isFaulty = false;

    public void receiveMessage(Message msg) {
        // Process the incoming message
        if (!sendAck(msg)) {  // sendAck() returns false due to faulty network or local failure
            markNodeAsDead();
        }
    }

    private boolean sendAck(Message msg) {
        // Simulate sending an acknowledgment, which might fail
        return Math.random() < 0.5;  // Randomly decide if the send is successful
    }

    private void markNodeAsDead() {
        isFaulty = true;
        notifyOtherNodes();
    }
}
```
x??

---


#### Majority Decisions in Distributed Systems
Background context: In distributed systems, decisions often rely on majority consensus. If a node does not hear from others within a timeout period or if it notices discrepancies, it may take actions based on the majority view.

:p How can a node determine the state of another node when faced with network delays and unresponsive nodes?
??x
A node can determine the state of another node by sending messages and waiting for responses. If no response is received within a timeout period or if the node notices that its messages are not being acknowledged, it may infer that there might be an issue but cannot be certain unless a majority of other nodes agree on the state.

```java
// Pseudocode for determining node state based on majority consensus
public class Node {
    private Map<Node, Boolean> receivedResponses;

    public void requestState(Node target) {
        sendRequest(target);
        waitForResponse(target);

        if (isTimeout()) {
            markNodeAsDead(target);
        }
    }

    private void sendRequest(Node target) {
        // Send a request to the target node
        receivedResponses.put(target, false);
    }

    private void waitForResponse(Node target) {
        // Simulate waiting for response from the target node
        if (!receivedResponses.get(target)) {
            markNodeAsDead(target);
        }
    }

    private boolean isTimeout() {
        // Check if the timeout period has expired
        return true;  // Simplified check, in reality, it would be more complex
    }

    private void markNodeAsDead(Node target) {
        // Update local state to reflect that the node is assumed dead
    }
}
```
x??

---


#### Long Garbage Collection Pauses
Background context: In distributed systems, a node might experience long pauses during garbage collection. This can affect its ability to respond to messages in a timely manner.

:p How can a node handle long garbage collection pauses while maintaining system reliability?
??x
During long garbage collection (GC) pauses, nodes may not be able to process or send messages in a timely fashion. To maintain system reliability, nodes should implement strategies such as queuing incoming requests and attempting to resume processing as soon as the pause ends.

```java
// Pseudocode for handling long GC pauses
public class Node {
    private Queue<Message> messageQueue;

    public void handleRequest(Message msg) {
        if (isGCInProgress()) {  // Simulate checking if a garbage collection is in progress
            queueMessage(msg);
        } else {
            processMessageImmediately(msg);
        }
    }

    private void queueMessage(Message msg) {
        // Add the message to the queue for processing after GC finishes
        messageQueue.add(msg);
    }

    private void processMessageImmediately(Message msg) {
        // Process the message as soon as possible
        handleMessage(msg);
    }

    private boolean isGCInProgress() {
        return System.currentTimeMillis() - lastGCEnd > gcPauseThreshold;
    }
}
```
x??

---

---


#### GC Paused Nodes and Quorum Decisions
Background context: This concept explains how garbage collection (GC) pauses can affect a node's operation within a distributed system, leading to scenarios where nodes may incorrectly declare each other as dead. It emphasizes the importance of quorums in making decisions about the state of nodes.

:p What is the impact of GC on a node in a distributed system?
??x
During a garbage collection (GC) pause, all threads of a node are preempted and paused, preventing any request processing or response sending. This can lead to other nodes waiting for an extended period before concluding that the node has failed and removing it from service.
```java
// Pseudocode example showing GC pause effect
public void handleRequest() {
    try {
        // Simulate request handling
        processRequest();
    } catch (ThreadInterruptionException e) {
        System.out.println("GC paused, unable to process request.");
    }
}
```
x??

---


#### Quorum Voting Mechanism
Background context: The use of quorums in distributed systems ensures that decisions are made based on the agreement of a majority of nodes. This prevents single-node failures from causing system-wide issues.

:p How does a quorum mechanism help in decision-making within a distributed system?
??x
A quorum mechanism helps by requiring a minimum number of votes (a majority) from several nodes to make a decision, thereby reducing reliance on any single node. For example, with five nodes, at least three must agree for a decision to be valid.
```java
// Pseudocode example of a simple quorum voting system
public boolean makeDecision() {
    int votes = 0;
    // Simulate voting process
    if (vote(true)) votes++;
    if (vote(false)) votes++;
    return votes > 2; // Return true if more than half voted yes
}
```
x??

---


#### Handling Node Failures and Split Brain
Background context: In distributed systems, split brain occurs when nodes diverge into two separate groups that think they are the primary node. This can lead to data corruption or service failures.

:p What is split brain in a distributed system?
??x
Split brain happens when two or more nodes believe they should be the leader (primary) for a resource, leading them to make conflicting decisions and potentially causing data corruption or service outages.
```java
// Pseudocode example of handling potential split brain scenario
public void electLeader() {
    if (checkMajorityConsensus(true)) {
        // Leader elected
    } else {
        // Handle failed leader election process
    }
}
```
x??

---


#### Importance of Quorums in Consensus Algorithms
Background context: Quorums are crucial in ensuring that decisions made by distributed systems are consistent and reliable, even when some nodes fail. This is particularly important for consensus algorithms where agreement among multiple nodes is necessary.

:p Why are quorums essential in the implementation of consensus algorithms?
??x
Quorums ensure consistency and reliability in a distributed system by requiring a majority vote from several nodes to make decisions. This prevents single-node failures from causing incorrect state changes or service disruptions, maintaining the integrity of the system.
```java
// Pseudocode example of quorum-based decision making
public boolean consensus(String decision) {
    int requiredMajority = (nodes.size() / 2) + 1;
    int votesForDecision = 0;
    for (Node node : nodes) {
        if (node.decide(decision)) {
            votesForDecision++;
        }
    }
    return votesForDecision >= requiredMajority;
}
```
x??

---


#### Distributed System Reliability Through Redundancy
Background context: In a distributed system, relying on a single node can lead to failure and downtime. Therefore, implementing redundancy through quorums helps ensure that the system remains operational even when some nodes fail.

:p How does redundancy improve the reliability of a distributed system?
??x
Redundancy improves reliability by ensuring that decisions are based on multiple nodes rather than just one. Quorum-based systems can handle node failures gracefully because they require agreement from a majority of nodes before making decisions, reducing the risk of incorrect state changes or service disruptions.
```java
// Pseudocode example of handling node failure and redundancy
public void ensureRedundancy() {
    List<Node> aliveNodes = getAliveNodes();
    if (aliveNodes.size() >= requiredMajority) {
        // Continue operation with quorum support
    } else {
        // Handle failure scenario
    }
}
```
x??

---

---


#### Distributed Lock Implementation Bug
Background context: In a distributed system, ensuring exclusive access to a resource (like a file) by a single client at a time is crucial. An incorrect implementation of locking can lead to data corruption when a lease expires but the client continues to believe it has valid access.
:p What issue arises due to an incorrect implementation of a distributed lock?
??x
The issue is that if a client holding a lease pauses for too long, its lease might expire while another client acquires the lease. When the original client resumes, it mistakenly believes it still holds the valid lease and tries to write to the file, leading to data corruption.
x??

---


#### Fencing Tokens Concept
Background context: To prevent such issues in distributed systems where a resource (like storage) is accessed under lock, fencing tokens are used. These tokens ensure that writes occur only in the order of increasing numbers, thus preventing overlapping writes from different clients.
:p What mechanism can be used to protect against a client acting on an expired lease?
??x
A mechanism called fencing tokens can be used. Every time a lock or lease is granted by the server, it returns a token that increases each time a new lock is acquired. Clients must include this token with their write requests. If a paused client resumes and attempts to write without a valid newer token, the storage service rejects the request.
x??

---

