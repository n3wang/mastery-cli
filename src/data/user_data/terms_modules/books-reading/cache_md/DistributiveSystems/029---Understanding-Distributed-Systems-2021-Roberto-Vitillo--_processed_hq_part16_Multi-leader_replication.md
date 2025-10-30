# High-Quality Flashcards: 029---Understanding-Distributed-Systems-2021-Roberto-Vitillo--_processed (Part 16)

**Rating threshold:** >= 8/10

**Starting Chapter:** Multi-leader replication

---

**Rating: 8/10**

#### Synchronous and Asynchronous Replication
Synchronous replication ensures that a write operation is acknowledged only after it has been successfully written to all replicas. Conversely, asynchronous replication allows a write to be acknowledged immediately, with the replica catching up later. This can lead to performance penalties but offers flexibility in handling high write throughput.
:p What are the key differences between synchronous and asynchronous replication?
??x
Synchronous replication requires all replicas to acknowledge a write operation before returning confirmation to the client. This ensures data consistency but incurs higher latency due to waiting for acknowledgments from each replica. Asynchronous replication, on the other hand, returns acknowledgment immediately after writing locally, allowing the system to handle more writes per second at the cost of potential data inconsistency in case of a failure.
x??

---

#### Multi-Leader Replication
Multi-leader replication allows multiple nodes to accept write operations, providing higher write throughput and redundancy across different geographic locations. However, it introduces complexity due to the possibility of conflicting writes when two leaders update the same piece of data simultaneously.
:p What is multi-leader replication, and what are its primary challenges?
??x
Multi-leader replication involves having multiple nodes capable of accepting write operations independently. This setup increases write throughput and can improve availability by distributing writes across different geographical locations. However, it poses a significant challenge in resolving conflicting writes that occur when two leaders update the same data item concurrently.
x??

---

#### Conflict Resolution Strategies in Multi-Leader Replication
Conflict resolution is crucial in multi-leader replication to handle situations where multiple nodes attempt to modify the same piece of data simultaneously. Common strategies include designing systems to avoid conflicts, using timestamps, or leveraging logical clocks for more reliable conflict detection and resolution.
:p What are some common methods used to resolve conflicts in multi-leader replication?
??x
Common methods for resolving conflicts in multi-leader replication include:
1. **Avoiding Conflicts**: Design the system so that conflicts can be prevented. For example, routing all requests from a specific region to a single leader within that region.
2. **Timestamp-Based Resolution**: Using timestamps to determine which write is more recent and should take precedence. However, this method may not be entirely reliable due to clock skew between nodes.
3. **Logical Clocks**: Implementing logical clocks to provide more accurate and consistent conflict resolution across distributed systems.
x??

---

#### Handling Conflicts in Multi-Leader Replication
In multi-leader replication, when a client requests a write operation that could potentially conflict with another leader's updates, the system must handle these conflicts. One approach is to store concurrent writes and present them to the next reader, allowing the application logic to resolve them.
:p How does the "push the can down the road" method work in resolving conflicts?
??x
The "push the can down the road" method involves storing conflicting writes and returning them to the client that reads the data later. The client then resolves these conflicts by updating the database with its chosen solution, effectively passing the responsibility of conflict resolution back to the application layer.
x??

---

#### Advanced Conflict Resolution Methods
Advanced conflict resolution methods include using logical clocks or custom conflict resolution algorithms provided by clients. These mechanisms help in reliably detecting and resolving conflicts without relying solely on timestamps that might not be perfectly synchronized across nodes.
:p What are some advanced techniques for conflict resolution in multi-leader replication?
??x
Some advanced techniques for conflict resolution in multi-leader replication include:
1. **Logical Clocks**: Using logical clocks to ensure more reliable detection of causality and resolving conflicts based on the order of events, rather than relying solely on timestamps.
2. **Custom Conflict Resolution Algorithms**: Allowing clients to provide their own logic for resolving conflicts when they encounter concurrent writes, enabling fine-grained control over how data is managed in distributed systems.
x??

---

**Rating: 8/10**

#### Conflict Resolution Procedure
Conflict resolution procedures can be executed by a data store whenever a conflict is detected. This ensures that inconsistencies are resolved systematically.

:p What is a conflict resolution procedure?
??x
A conflict resolution procedure is an automated or manual process executed by a data store to handle and resolve conflicts when multiple operations modify the same data simultaneously, ensuring consistency.
x??

---

#### Conflict-Free Replicated Data Types (CRDTs)
CRDTs are special data structures that can be replicated across multiple nodes. They allow each replica to update its local version independently while resolving inconsistencies in a mathematically sound way.

:p What is CRDT?
??x
A Conflict-Free Replicated Data Type (CRDT) is a data structure designed for distributed systems where replicas can operate independently and later merge changes without conflicts. Each replica updates its local state based on operations, and mathematical rules ensure consistency when merging states.
x??

---

#### Leaderless Replication with Invariant
In leaderless replication, any replica can accept write requests from clients. Clients handle the responsibility of replicating data and resolving conflicts without a designated leader.

:p What is an invariant in leaderless replication?
??x
In leaderless replication, an invariant is a condition that must be satisfied to ensure consistency and correct operation. Specifically, for the datastore with N replicas:
- When a client sends a write request, it waits for at least W replicas to acknowledge it before proceeding.
- For reads, the client queries R replicas and uses the most recent value from the responses.

The invariant is: \( W + R > N \), which guarantees that at least one record in the read set will reflect the latest write. This ensures consistent updates even without a leader.
x??

---

#### Write and Read Parameters
In leaderless replication, parameters like W (number of replicas to wait for acknowledgment) and R (number of replicas to query for reads) determine the system's consistency and availability.

:p What do W and R represent in leaderless replication?
??x
W represents the number of replicas that must acknowledge a write request before it is considered committed. R stands for the number of replicas queried when reading data to ensure the most recent value is obtained.

The values of W and R affect the system's consistency and availability:
- Smaller R improves read performance but may reduce consistency.
- Larger W increases write latency but ensures stronger consistency.
x??

---

#### Edge Cases in Leaderless Replication
Even if \( W + R > N \), edge cases can still lead to inconsistent states, particularly when not all replicas successfully receive the writes.

:p What are some edge cases in leaderless replication?
??x
Edge cases in leaderless replication include situations where a write operation succeeds on fewer than W replicas and fails on others. This can leave replicas in an inconsistent state despite \( W + R > N \).

For example, if a client sends a write request but only \( W - 1 \) replicas successfully acknowledge it, the remaining replica might not have the latest data. This inconsistency persists unless additional mechanisms handle such cases.
x??

---

#### Conclusion on Leaderless Replication
Leaderless replication distributes responsibilities among clients for replication and conflict resolution, offloading these tasks from a single leader.

:p What are the main benefits of leaderless replication?
??x
The main benefits of leaderless replication include:
- No single point of failure or bottleneck (leader).
- Distributed responsibility for data consistency.
- Improved availability and performance by decentralizing operations.

However, it requires careful management of W and R to ensure consistency and can be more complex due to the edge cases involved.
x??

---

**Rating: 8/10**

---
#### Memory Leaks and Scaling Out Applications
Background context: When you scale out your applications, various failures can occur. For example, a service that leaks 1 MB of memory on average every hundred requests might seem manageable with fewer requests but could become significant at higher request volumes.

:p What is the impact of memory leaks in services scaled to handle more requests?
??x
The impact of memory leaks increases significantly as the number of requests increases. For instance, a service that leaks 1 MB per 100 requests will accumulate less memory over time with fewer requests compared to when it processes 10 million requests per day. This can lead to system instability and performance degradation.

For example:
- If the service does 1000 requests/day, the leak is manageable.
- If the service does 10 million requests/day, a 1 MB leak every 100 requests results in 100 GB lost by the end of the day.

This can cause constant swapping and performance issues. The amount of memory available to the system is crucial; once it runs out, the servers may start thrashing due to excessive disk paging.
x??

---
#### Failure Probability and System Scalability
Background context: As you scale your application, the total number of failures increases with the increase in operations performed. This means that more components lead to a higher probability of failure.

:p How does the total number of failures change with an operation that has a certain probability of failing?
??x
The total number of failures increases linearly with the total number of operations performed. If an operation has a probability \( p \) of failing, and you perform \( N \) such operations, then the expected number of failures is approximately \( N \times p \).

For example:
If each request to a service has a 0.1% chance of failing and the service processes 10 million requests per day, the expected number of failures would be:

\[ \text{Expected Failures} = 10,000,000 \times 0.001 = 10,000 \]

This indicates that without proper resiliency patterns, a significant number of operations might fail.
x??

---
#### Availability and "Nines"
Background context: The availability of a system is often discussed in terms of "nines," which represent the uptime percentage. For example, two nines (\(2\text{nines}\)) means 99% uptime or 0.536 minutes down per day.

:p What does "two nines" mean in terms of availability?
??x
"Two nines" means a system is available 99% of the time, which translates to about 0.536 minutes of downtime per day (or \(15\) minutes).

For example:
If you need at least two nines (\(2\text{nines}\)) of availability:

\[ \text{Downtime} = 1 - 0.99 = 0.01 \]

This is approximately 1% downtime, meaning the system can be unavailable for up to \(86400 \times 0.01 = 864\) seconds or about \(15\) minutes per day.
x??

---
#### Self-Healing Mechanisms
Background context: To mitigate the impact of failures, implementing self-healing mechanisms is crucial. These can include automatic restarting of services, recovering from errors, and other methods to keep your system running smoothly.

:p What are self-healing mechanisms in a distributed system?
??x
Self-healing mechanisms in a distributed system are automated processes designed to detect and recover from faults or failures without human intervention. This includes features like auto-restarting failed services, error recovery strategies, and dynamic scaling based on load conditions.

For example:
- **Auto-restart:** A service can be configured to restart automatically if it detects an issue.
- **Error Recovery:** Implementing retries with exponential backoff can help recover from transient failures.

Here’s a simple pseudocode for auto-restarting a service:

```java
public class AutoRestartService {
    private int maxRetries = 3;
    private int retryDelayMs = 1000;

    public void run() {
        try {
            performWork();
        } catch (Exception e) {
            if (attempts < maxRetries) {
                attempts++;
                System.out.println("Attempt " + attempts);
                Thread.sleep(retryDelayMs);
                run(); // Recursive call to retry
            } else {
                throw new RuntimeException("Failed after maximum retries", e);
            }
        }
    }

    private void performWork() throws Exception {
        // Simulate work that might fail
        if (Math.random() < 0.1) { // 10% chance of failure
            throw new Exception("Simulated failure");
        }
        System.out.println("Work completed successfully.");
    }
}
```

This example shows a recursive function that retries the operation up to three times with increasing delays.
x??

---

