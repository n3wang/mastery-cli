# High-Quality Flashcards: 029---Understanding-Distributed-Systems-2021-Roberto-Vitillo--_processed (Part 8)

**Rating threshold:** >= 8/10

**Starting Chapter:** Sequential consistency

---

**Rating: 8/10**

#### Strong Consistency

In a strongly consistent system, all read and write operations go through the leader. This ensures that from each client's perspective, there is only one single copy of the data at any given time.

:p What does strong consistency mean for Raft replication?

??x
Strong consistency in Raft replication means that every request appears to take place atomically at a specific point in time as if there was a single copy of the data. This ensures that clients always query the leader directly, and from their perspective, all operations on the system appear to be serializable.

Code example:
```java
public class Leader {
    // Code for handling read and write requests exclusively through the leader.
    public void handleRequest(Request request) {
        if (isLeader()) { // Check if this node is the current leader
            executeRequest(request); // Execute the request on behalf of the client
        } else {
            throw new RuntimeException("Not a leader, cannot handle request.");
        }
    }

    private boolean isLeader() {
        // Logic to determine if the current node is the leader.
    }

    private void executeRequest(Request request) {
        // Code for executing the request on behalf of the client.
    }
}
```
x??

---

#### Linearizability

Linearizability is a stronger consistency guarantee that ensures every operation appears to take effect in some instantaneous point in time, and subsequent operations see the effects of previous ones. This means that if a request completes at time t1, its side-effects are visible immediately to all observers.

:p What is linearizability in Raft replication?

??x
Linearizability in Raft replication ensures that every request appears to take place atomically at a very specific point in time as if there was a single copy of the data. Once a request completes, its side-effects become visible to all other participants immediately.

Code example:
```java
public class Leader {
    // Code for executing requests and making their effects visible.
    public void executeRequest(Request request) {
        // Execute the request on behalf of the client.
        notifyObservers(); // Notify observers about the completion of the request.
    }

    private void notifyObservers() {
        // Logic to inform all followers about the new state after the request.
    }
}
```
x??

---

#### Sequential Consistency

Sequential consistency is a weaker form of consistency where operations occur in the same order for all observers, but there are no guarantees about when the side-effects of an operation become visible. This means that if a client reads or writes data, their view of the system's state evolves over time as updates propagate.

:p What is sequential consistency in Raft replication?

??x
Sequential consistency in Raft replication means that operations occur in the same order for all observers but does not provide any real-time guarantees about when an operation’s side-effects become visible to them. This allows followers to lag behind the leader while still ensuring that updates are processed in the same order.

Code example:
```java
public class Follower {
    private List<Operation> operations = new ArrayList<>();

    public void processRequest(Request request) {
        synchronized (operations) {
            operations.add(request); // Add operation to the queue.
            notifyObservers(); // Notify observers about pending updates.
        }
    }

    private void notifyObservers() {
        // Logic to inform all other followers about the current state of operations.
    }
}
```
x??

---

#### Leader Verification

To ensure that a client’s read request is served by the correct leader, the presumed leader first contacts a majority of replicas to confirm its leadership status before executing any requests.

:p How does Raft handle potential leadership changes during read requests?

??x
Raft handles potential leadership changes during read requests by having the presumed leader first contact a majority of replicas to confirm its leadership status. Only if it is confirmed as the leader can it execute the request and send a response to the client. This step ensures that the system remains strongly consistent even if the current leader has been deposed.

Code example:
```java
public class Leader {
    public void handleReadRequest(Request readRequest) {
        // Check with majority of replicas.
        boolean isLeader = contactMajorityReplicas();
        
        if (isLeader) {
            executeReadRequest(readRequest); // Execute the request and send response to client.
        } else {
            throw new RuntimeException("Not a leader, cannot handle read request.");
        }
    }

    private boolean contactMajorityReplicas() {
        // Logic to contact majority of replicas and confirm leadership status.
    }

    private void executeReadRequest(Request readRequest) {
        // Execute the read request and send response to client.
    }
}
```
x??

**Rating: 8/10**

#### Producer/Consumer Model
Background context explaining the producer/consumer model. In this pattern, a producer process writes items to a queue, and a consumer reads from it. The producer and consumer see the items in the same order, but the consumer lags behind the producer.
:p What is the producer/consumer model?
??x
The producer/consumer model involves two processes: one that generates or produces data (the producer) and another that consumes the produced data (the consumer). Both processes interact with a shared queue where items are written by producers and read by consumers in the same order. The main characteristic is the asynchronous communication between the producer and consumer.
x??

---

#### Eventual Consistency
Background context explaining eventual consistency. To increase read throughput, clients were pinned to followers, but this came at the cost of consistency. If two followers have different states due to lag, a client querying them sequentially might see inconsistent states.
:p What is eventual consistency?
??x
Eventual consistency is a model where data becomes consistent across all nodes in a distributed system over time. It allows for reads and writes on any node but guarantees that after a write operation, eventually, all nodes will converge to the same final state. This means that while there might be temporary inconsistencies, all reads from different nodes will reflect the latest written value if no new writes are made.
x??

---

#### CAP Theorem
Background context explaining the CAP theorem. When network partitions occur, systems must choose between availability and consistency, as choosing both is impossible due to network failures.
:p What is the CAP theorem?
??x
The CAP theorem states that in a distributed system, it's impossible for a system to simultaneously provide all three of the following guarantees: 
- Consistency (C): every read receives the most recent write or an error.
- Availability (A): every request receives a response about whether it succeeded or failed; there is no delay involved in this requirement. 
- Partition tolerance (P): the system continues to operate despite arbitrary message loss or failure of part of the system.

In practice, you can only achieve two out of these three guarantees at any given time.
x??

---

#### PACELC Theorem
Background context explaining the PACELC theorem. It expands on the CAP theorem by adding latency (L) as a dimension to consider in a distributed system during normal operations without network partitions.
:p What is the PACELC theorem?
??x
The PACELC theorem extends the CAP theorem by introducing an additional guarantee, latency (L), which measures how long it takes for data to propagate across the system. It states that in case of network partitioning:
- One must choose between availability (A) and consistency (C).
- Even when there are no partitions, one has to choose between latency (L) and consistency (C).

This theorem provides a more nuanced view on how to balance these guarantees.
x??

---

#### Practical Considerations for NoSQL Stores
Background context explaining the trade-offs in using off-the-shelf distributed data stores like NoSQL. These systems often offer counter-intuitive consistency models, allowing you to adjust performance and consistency settings based on your application's needs.
:p What are practical considerations when using NoSQL stores?
??x
When using NoSQL stores, it's crucial to understand the trade-offs between availability, consistency, partition tolerance, and latency. Different applications may require different levels of these guarantees. For example:
- Azure Cosmos DB offers various consistency levels that you can configure based on your application’s needs.
- Cassandra allows you to fine-tune consistency settings for write operations.

Understanding these trade-offs helps in designing systems that meet the specific requirements of the application.
x??

---

**Rating: 8/10**

#### Concurrency Control Concepts
Concurrency control is essential to ensure that transactions run smoothly without conflicts. Two common methods are pessimistic concurrency control and optimistic concurrency control.

:p What are two main types of concurrency control discussed?
??x
Pessimistic concurrency control uses locks, while optimistic concurrency control checks for conflicts only at the end.
x??

---

#### Pessimistic Concurrency Control: Two-Phase Locking (2PL)
In 2PL, transactions acquire read and write locks. Read locks can be shared by multiple transactions, but a write lock is exclusive.

:p What does two-phase locking (2PL) do?
??x
Two-phase locking (2PL) ensures that once a transaction acquires a lock, it cannot release the lock until committing or aborting. The protocol has an expanding phase for acquiring locks and a shrinking phase for releasing them.
x??

---

#### Optimistic Concurrency Control with Multi-Version Concurrency Control (MVCC)
Optimistic concurrency control avoids blocking by checking for conflicts at transaction commit time.

:p How does optimistic concurrency control work?
??x
Optimistic concurrency control uses MVCC, where transactions can read past versions of data. If a conflict is detected during commit, the transaction either aborts or retries from the beginning.
x??

---

#### Serializability and Guaranteeing Consistency
Serializability guarantees that concurrent transactions produce the same result as if they were executed in serial.

:p What is serializability?
??x
Serializability ensures that a database operation appears to be performed sequentially, even when multiple transactions run concurrently. This can be achieved using pessimistic (2PL) or optimistic concurrency control.
x??

---

#### Two-Phase Commit Protocol (2PC)
The 2PC protocol helps ensure atomicity across distributed systems by involving both a coordinator and participants.

:p What is the two-phase commit protocol (2PC)?
??x
The 2PC protocol involves a prepare phase where the coordinator asks participants if they are ready to commit. If all agree, it commits; otherwise, it aborts. This ensures that transactions either fully succeed or fail atomically.
x??

---

#### Atomicity and Two-Phase Commit Protocol (2PC)
Atomicity is crucial in distributed systems to ensure that a transaction’s changes are committed or not at all.

:p How does the two-phase commit protocol achieve atomicity?
??x
In 2PC, once a participant replies affirmatively to a prepare message, it must either commit or abort. The coordinator decides based on responses and cannot change its decision later, ensuring atomic commitment.
x??

---

#### Consensus in Two-Phase Commit Protocol (2PC)
Uniform consensus in 2PC requires all processes to agree, even faulty ones.

:p What is uniform consensus in the context of two-phase commit?
??x
Uniform consensus ensures that all processes, including potential faults, agree on a transaction’s outcome. This is harder than regular consensus but can be achieved using algorithms like Raft to replicate the coordinator.
x??

---

