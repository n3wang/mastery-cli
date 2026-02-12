# High-Quality Flashcards: Designing-data-intensive-applications_-the-big-ideas-behind-reliable-scalable_processed (Part 20)


**Starting Chapter:** Serializable Snapshot Isolation SSI

---


---
#### Two-Phase Locking
Background context explaining two-phase locking. It is a mechanism that ensures serializability by holding locks on data until the transaction commits or aborts. The primary issue with this approach is its performance, as it can lead to high overhead and contention.

:p What is two-phase locking?
??x
Two-phase locking is a concurrency control mechanism that ensures transactions are serializable by maintaining a set of locks throughout the transaction's lifecycle. It acquires necessary locks at the beginning (phase 1) and holds them until the end when the transaction commits or aborts in phase 2.
x??

---
#### Shared Locking
Background context explaining shared locking, where multiple transactions can read data but only one can write to it simultaneously.

:p How does shared locking work?
??x
Shared locking allows multiple readers (transactions) to access data concurrently while ensuring that a writer has exclusive access. When a transaction reads data, it acquires a shared lock on the necessary records, preventing other transactions from modifying those records until the reading transaction releases its locks.
x??

---
#### Range Locking
Background context explaining range locking, which is used when a range of keys needs to be locked for writing.

:p What is range locking?
??x
Range locking is employed when multiple rows in a table need to be updated. It acquires locks on the start and end points of a key range, allowing transactions to read but not modify data within that range until the lock is released.
x??

---
#### Serializable Snapshot Isolation (SSI)
Background context explaining SSI as an algorithm that provides full serializability with minimal performance overhead compared to snapshot isolation.

:p What is Serializable Snapshot Isolation (SSI)?
??x
Serializable Snapshot Isolation (SSI) is a concurrency control mechanism that ensures transactions are serializable by providing strong consistency guarantees while minimizing the performance penalty. It operates by maintaining versions of data, ensuring that each transaction sees a consistent snapshot of the database as it started, and only allows commits if no conflicting transactions have modified the same data in between.
x??

---
#### Pessimistic vs Optimistic Concurrency Control
Background context explaining pessimistic concurrency control (like two-phase locking) versus optimistic concurrency control (like SSI). Pessimistic techniques are more restrictive but can handle high contention, while optimistic methods allow transactions to proceed even if they may conflict.

:p What is the difference between pessimistic and optimistic concurrency control?
??x
Pessimistic concurrency control, such as two-phase locking, assumes that conflicts will occur frequently and thus aggressively locks data early in a transaction. Optimistic concurrency control, like SSI, allows transactions to proceed without immediate locking, relying on post-commit checks for consistency. Pessimism can lead to high overhead but ensures fewer conflicts, while optimism reduces contention by allowing more concurrent operations.
x??

---
#### Commutative Atomic Operations
Background context explaining commutative atomic operations and how they can reduce contention in scenarios where the order of operations does not affect the final outcome.

:p What are commutative atomic operations?
??x
Commutative atomic operations are a type of operation that can be performed concurrently without conflicting, even if their order is changed. An example is incrementing a counter; regardless of which transaction increments it first, the final value will be correct. This reduces contention by allowing multiple such operations to run in parallel.
x??

---


#### Concurrency Control and Transaction Isolation Levels

Background context: In database management, ensuring data consistency under concurrent access is crucial. Transactions are used to achieve this by providing a level of abstraction that manages the interactions between different operations on the database. Various isolation levels are defined to control how transactions interact with each other.

:p What are the main issues addressed by different transaction isolation levels?
??x
Isolation levels help address several concurrency problems such as dirty reads, non-repeatable reads (read skew), and phantom reads. Each level provides a different balance between performance and data consistency.
??

---

#### Dirty Reads

Background context: A dirty read occurs when one transaction reads data that has been written by another transaction but not yet committed. This can lead to inconsistent views of the database.

:p What is a dirty read, and why is it problematic?
??x
A dirty read happens when a transaction reads data that has been modified by another transaction but hasn't been committed yet. This can result in a view of the database that may not be accurate because the changes might be rolled back.
??

---

#### Snapshot Isolation

Background context: Snapshot isolation, also known as repeatable read, ensures that once a transaction starts reading data, it will see all versions of that data unchanged until the transaction ends. This is achieved using multi-version concurrency control (MVCC).

:p What is snapshot isolation, and how does it prevent non-repeatable reads?
??x
Snapshot isolation prevents non-repeatable reads by allowing transactions to read from a consistent snapshot of the database at a particular point in time. This means that even if another transaction modifies data after the first transaction starts reading, the original transaction will still see the initial state of the data.
??

---

#### Lost Updates

Background context: A lost update occurs when two transactions modify the same piece of data, and one transaction overwrites the changes made by the other without incorporating its updates. This results in a loss of some modifications.

:p What is a lost update, and how can it be prevented?
??x
A lost update happens when multiple transactions concurrently read and write to the same data, with one transaction overwriting another's updates. Snapshot isolation often prevents this issue automatically by managing versions of data. Manual locks such as `SELECT FOR UPDATE` can also prevent lost updates.
??

---

#### Write Skew

Background context: Write skew occurs when a transaction reads some data, makes decisions based on it, and writes the decision to the database after some time, but the initial state may have changed by then.

:p What is write skew, and how does it affect transactions?
??x
Write skew happens when a transaction reads some data, makes decisions based on that data, and writes those decisions back to the database. By the time the transaction commits, the underlying data might have changed, making the decision irrelevant or incorrect.
??

---

#### Concurrency Control Implementation

Background context: Various techniques are used to implement concurrency control in databases, including multi-version concurrency control (MVCC) for snapshot isolation.

:p How does MVCC help prevent certain types of anomalies?
??x
MVCC helps prevent dirty reads, non-repeatable reads, and phantom reads by maintaining multiple versions of data. Each transaction sees a consistent snapshot of the database as it was at the start of the transaction, ensuring that concurrent transactions do not interfere with each other.
??

---

#### Transaction Performance Considerations

Background context: While transactions help ensure data consistency, they can impact performance due to additional overhead and potential for aborts.

:p How does long-running read-write transactions affect SSI?
??x
Long-running read-write transactions in SSI are more likely to encounter conflicts and abort because of ongoing changes by other transactions. Shorter transactions are preferred as they minimize the window for such conflicts.
??

---

#### Transaction Aborts

Background context: Transactions may need to be aborted due to conflicts, errors, or other issues. The rate of aborts affects overall system performance.

:p Why is minimizing transaction length important in SSI?
??x
Minimizing transaction length in SSI reduces the likelihood of conflicts and subsequent aborts, which can degrade system performance. Shorter transactions allow for more efficient use of resources and reduce contention.
??

---

#### Error Handling with Transactions

Background context: By abstracting away certain concurrency problems and hardware/software faults, transactions make it easier to handle errors and ensure data consistency.

:p How do transactions simplify error handling in applications?
??x
Transactions simplify error handling by reducing complex error scenarios to a single issue of transaction aborts. Applications can retry failed transactions until they succeed, making the overall process more manageable.
??

---

#### Example of Dirty Reads

Background context: An example scenario helps illustrate how dirty reads can occur.

:p Can you provide an example where a dirty read might happen?
??x
Suppose two transactions, T1 and T2, are running concurrently. If T1 starts reading data D at time t1, and before it commits, T2 modifies D (but does not commit yet), then T1 reads the modified version of D. This is a dirty read because T1 sees uncommitted changes.
??

---


#### Single Computer Reliability
In a single computer environment, software typically behaves predictably. Either it works perfectly or fails entirely due to hardware issues like memory corruption. The system is deterministic under normal conditions.

:p What are the typical behaviors of software on a single computer?
??x
Software on a single computer either works correctly or fails completely, but does not exhibit intermediate behavior.
x??

---
#### Pessimism in Distributed Systems
Real-world distributed systems often encounter unexpected issues, leading to increased complexity. The chapter emphasizes that it is reasonable to assume everything can go wrong.

:p What attitude does the chapter adopt towards potential issues in distributed systems?
??x
The chapter takes a pessimistic view, assuming that anything that can go wrong will indeed go wrong.
x??

---
#### Challenges of Distributed Systems
Distributed systems present unique challenges not found in single-computer applications. These include network unreliability and clock synchronization issues.

:p What are the main differences between distributed systems and traditional single-computer software?
??x
Distributed systems have more unpredictable failures, such as unreliable networks and timing discrepancies. Unlike a single computer, where faults usually result in total system failure or correct operation, distributed systems can exhibit partial failures.
x??

---
#### Network Unreliability
Networks in distributed systems are often slow or unreliable. The chapter notes that network partitioning is a significant problem.

:p What is the impact of network unreliability on distributed systems?
??x
Network unreliability can lead to network partitions, where different parts of the system cannot communicate with each other. This can cause serious issues like split-brain scenarios.
x??

---
#### Unreliable Clocks
Clock synchronization in distributed systems can be problematic due to clock drift and asynchrony.

:p What are the challenges associated with unreliable clocks in distributed systems?
??x
Unreliable clocks can lead to timing discrepancies, making it difficult to coordinate operations across nodes. This can result in incorrect state transitions or race conditions.
x??

---
#### Knowledge, Truth, and Lies
Understanding the state of a distributed system is complex due to partial failures and misinformation.

:p How do you reason about the state of a distributed system?
??x
Reasoning about a distributed system's state involves understanding what each node believes (knowledge), what might be true (truth), and what could be false (lies). This helps in diagnosing issues caused by partial failures.
x??

---
#### Partial Failures in Distributed Systems
Partial failures occur when parts of the system work while others do not, complicating fault tolerance.

:p What is a common outcome in distributed systems when some components are working and others are failing?
??x
When some components in a distributed system fail while others continue to function, it leads to partial failure scenarios. This can cause inconsistencies and require careful design of fault-tolerant mechanisms.
x??

---


#### Distributed Systems Challenges
Background context explaining the challenges in distributed systems, including the concept of partial failures and nondeterminism. Partial failures are unpredictable issues where parts of a system may be broken while other parts work fine. Nondeterminism refers to situations where outcomes can vary unpredictably due to network delays or hardware failures.

:p What are some examples of partial failures in distributed systems mentioned by Coda Hale?
??x
Partial failures include long-lived network partitions, power distribution unit (PDU) failures, switch failures, accidental power cycles of whole racks, data center backbone failures, and even physical accidents like a driver crashing into the HVAC system.

??x
The answer with detailed explanations.
Coda Hale lists various examples such as:
- **Network Partitions:** Disruptions in network connections that split the system.
- **PDU Failures:** Issues with power distribution units which can cause parts of the infrastructure to lose power.
- **Switch Failures:** Hardware malfunctions in networking equipment.
- **Power Cycles:** Accidental power-off and on cycles of entire racks or data centers.
- **Backbone Failures:** Widespread network failures within a single data center.
- **Power Failures:** Complete loss of power to an entire data center.
- **Physical Accidents:** Anecdotal examples like a driver crashing into the HVAC system.

These examples highlight how even in modern, well-managed systems, hardware and environmental factors can introduce unpredictable issues that affect distributed computing.

```java
public class ExampleFaultTolerance {
    public static void main(String[] args) {
        // Simulating network partition failure
        boolean isNetworkPartition = true;
        if (isNetworkPartition) {
            System.out.println("Network Partition detected! Handling partial failure.");
        } else {
            System.out.println("System operating normally.");
        }
    }
}
```
This code simulates checking for a network partition and handling it appropriately.

x??

---

#### Cloud Computing vs. Supercomputing
Background context explaining the differences between cloud computing, supercomputing, and traditional enterprise datacenters in terms of fault tolerance strategies. Supercomputers typically handle large-scale scientific tasks by checkpointing computation states to durable storage and restarting from checkpoints if failures occur. Cloud computing aims for high availability through elastic resource allocation but often sacrifices some reliability.

:p What is a typical approach to handling faults in supercomputers?
??x
In supercomputers, a common approach to handling faults involves periodic checkpointing of the state of computations. If a node fails, the computation can be restarted from the last saved checkpoint.

??x
The answer with detailed explanations.
A typical approach for fault tolerance in supercomputers is to implement periodic checkpoints where the current state of the computation is saved to durable storage (such as disk). In case of a failure, the system can revert to the most recent checkpoint and resume execution from there. This method ensures that the entire cluster workload stops temporarily but can be resumed without losing significant progress.

```java
public class CheckpointExample {
    public static void main(String[] args) {
        boolean isCheckpointTime = true;
        if (isCheckpointTime) {
            System.out.println("Taking a checkpoint of current computation state.");
            // Code to save the current state to storage
        } else {
            System.out.println("Continuing normal operation without checkpoints.");
        }
    }
}
```
This code demonstrates how periodic checkpoints can be implemented in a system.

x??

---

#### Cloud Computing Characteristics
Background context explaining cloud computing as associated with multi-tenant datacenters, commodity computers connected via an IP network (often Ethernet), and elastic/on-demand resource allocation. The goal is to provide scalable and flexible computing resources through metered billing.

:p What are the key characteristics of cloud computing mentioned in the text?
??x
Key characteristics of cloud computing include:
- **Multi-tenant Datacenters:** Shared infrastructure among multiple users.
- **Commodity Computers:** Use of standard, off-the-shelf hardware.
- **IP Network Connectivity:** Networking through IP-based networks (often Ethernet).
- **Elastic/On-Demand Resource Allocation:** Ability to scale resources up or down as needed.
- **Metered Billing:** Pay-as-you-go pricing model.

??x
The answer with detailed explanations.
Cloud computing is characterized by its use of shared infrastructure, often referred to as multi-tenant datacenters. These environments allow multiple users to access a pool of computing resources on an as-needed basis. The hardware used in these environments is typically commodity-level, which reduces costs and increases flexibility.

The systems are connected using IP networks, providing standard networking capabilities similar to those found in many organizations. This connectivity enables the seamless transfer of data between different components of the cloud infrastructure.

Elastic resource allocation means that users can dynamically scale their resources up or down based on demand without manual intervention. Metered billing ensures that users only pay for the resources they consume, making it cost-effective and efficient.

```java
public class CloudResourceAllocation {
    public static void main(String[] args) {
        boolean isScalingUp = true;
        if (isScalingUp) {
            System.out.println("Scaling up resource allocation to meet increased demand.");
            // Code to allocate additional resources
        } else {
            System.out.println("No change in resource allocation required at this time.");
        }
    }
}
```
This code simulates the process of scaling resources based on demand.

x??

---

#### Supercomputing Philosophy
Background context explaining supercomputing as used for computationally intensive tasks like weather forecasting or molecular dynamics. The focus is on high-performance computing with thousands of CPUs, where faults are handled by checkpointing and restarting from checkpoints if a node fails.

:p What kind of tasks are typically performed in high-performance computing (HPC)?
??x
High-performance computing (HPC) is used for computationally intensive tasks such as weather forecasting, molecular dynamics simulations, and other scientific computations that require large amounts of processing power.

??x
The answer with detailed explanations.
High-performance computing focuses on running complex, data-intensive applications that require significant computational resources. These tasks can include:
- **Weather Forecasting:** Predictive models for meteorology and climatology.
- **Molecular Dynamics:** Simulations to understand the behavior of atoms and molecules over time.

These tasks are resource-intensive and benefit from having access to thousands of CPUs working in parallel to process large datasets quickly.

```java
public class HPCSimulation {
    public static void main(String[] args) {
        boolean isRunningSimulation = true;
        if (isRunningSimulation) {
            System.out.println("Starting a molecular dynamics simulation.");
            // Code for running the simulation
        } else {
            System.out.println("No simulations are currently running.");
        }
    }
}
```
This code simulates starting a computational task that might be run on an HPC cluster.

x??

---

