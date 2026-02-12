# High-Quality Flashcards: 029---Understanding-Distributed-Systems-2021-Roberto-Vitillo--_processed (Part 7)


**Starting Chapter:** Practical considerations

---


#### Leader Election Overview
Raft's leader election algorithm is a modern approach optimized for simplicity and understandability. It ensures that there is always one leader among the followers, but it can face challenges like split votes or race conditions if no process manages to win an election.

:p What is Raft's leader election algorithm designed to ensure?
??x
Raft's leader election algorithm ensures that during any given time in a system, only one node acts as the leader. This single-leader approach simplifies the management of state machine replication and command ordering.
x??

---
#### Split Vote Scenario
In cases where multiple candidates become leaders simultaneously without achieving a majority vote, this situation is referred to as a split vote. Raft's algorithm ensures that if no candidate receives a majority, they will eventually time out and start a new election.

:p What happens during a split vote in Raft?
??x
During a split vote, none of the candidates manage to receive a majority of votes needed for leadership. As a result, all of them will eventually timeout and initiate a new leader election.
x??

---
#### Election Timeout Mechanism
Raft's leader election uses a random interval for election timeouts to reduce the likelihood of another split vote in subsequent elections.

:p How does Raft handle election timeouts?
??x
Raft selects an election timeout randomly from a fixed interval. This randomness helps mitigate the risk of repeated split votes during consecutive elections.
x??

---
#### Leader Election Implementation Considerations
Many modern systems use external key-value stores like etcd or ZooKeeper to implement leader election. These tools offer primitives such as compare-and-swap operations with TTLs, which help in managing distributed locks.

:p Why might you use an external store for implementing leader election?
??x
You might use an external store for leader election because these systems provide abstractions that simplify the implementation of distributed locks and leader elections. They often include basic primitives like compare-and-swap and even full-featured distributed mutexes.
x??

---
#### Compare-and-Swap Operation with TTL
A compare-and-swap operation updates a key's value if it matches an expected value, while an expiration time (TTL) defines how long the key lives before expiring. The first process to successfully acquire the lock by performing a compare-and-swap using a specific TTL becomes the leader.

:p What is a compare-and-swap operation with TTL used for?
??x
A compare-and-swap operation with TTL is used to implement distributed locks. It allows processes to attempt acquiring a lease, and the first process that succeeds in the comparison and swap operation becomes the leader.
x??

---
#### Distributed Lock Implementation Example
In implementing a distributed lock, if multiple processes need exclusive access to update a file on a shared blob store, they can use a compare-and-swap operation with TTL. However, there is still a risk of race conditions due to potential timeouts between reading and writing.

:p How do you implement a distributed lock using compare-and-swap?
??x
To implement a distributed lock using compare-and-swap, each process tries to acquire the lock by creating a new key with compare-and-swap using a specific TTL. The first process that succeeds in this operation becomes the leader. However, there is still a risk of race conditions if another process acquires the lock before the current one can write back.

```python
if lock.acquire():
    try:
        content = store.read(blob_name)
        new_content = update(content)
        store.write(blob_name, new_content)
    except:
        lock.release()
```

x??

---
#### Fencing Tokens and Leader Verification
Fencing tokens are used to ensure that only the current leader writes to the storage. A fencing token is an incrementing number passed with each write operation by the leader, ensuring that only requests from the current leader are accepted.

:p What is a fencing token used for?
??x
A fencing token is used to verify that requests are being sent by the current leader when writing to storage. Each time a distributed lock is acquired, the system increments a logical clock (token), which is passed with each write operation. The storage remembers the last token and only accepts writes with greater values.
x??

---
#### Leader as a Scalability Bottleneck
Having a single leader can introduce a bottleneck if many operations need to be performed by the leader, leading to potential issues where it cannot keep up. This might force re-designing the entire system.

:p How does having a leader act as a scalability bottleneck?
??x
Having a single leader acts as a scalability bottleneck when numerous operations need to be handled by this one node. If the leader can't process these operations efficiently, it may become a point of failure or performance limitation, forcing re-designs or additional complexity in managing partitions and multiple leaders.
x??

---
#### Single Point of Failure with Leaders
A single leader introduces a single point of failure because if the election process fails or if the leader malfunctions, the entire system can be brought down.

:p Why is having a leader considered a single point of failure?
??x
Having a leader introduces a single point of failure because the failure of the election process or the malfunctioning of the current leader can bring down the entire system. This makes the system vulnerable to failures at that critical node.
x??

---


#### State Machine Replication
State machine replication is a core technique used in distributed systems to ensure that replicated state machines operate consistently. This approach involves having one leader process and multiple follower processes. The leader executes operations, logs them in its local log, and then sends these entries to followers for execution.

:p What is the role of the leader in state machine replication?
??x
The leader's role is critical as it makes all changes to the replicated state by appending new entries to its log and broadcasting these entries to follower processes. It ensures that all operations are recorded and propagated consistently across the system.
```java
public class Leader {
    public void appendLogEntry(String operation) {
        // Append the operation to the local log
        log.append(operation);
        // Send an AppendEntries request to followers
        sendAppendEntriesRequest(log.getLastEntry());
    }
}
```
x??

---

#### Log Structure and Entries
Each entry in the replicated state machine's log contains details such as the operation to be applied, its index within the log, and a term number. This structure helps maintain consistency among different replicas.

:p What does each entry in the log contain?
??x
Each log entry consists of three components: 
1. The operation that needs to be applied.
2. An index indicating the position of the entry in the log.
3. A term number representing the sequence of operations across different terms or election cycles.
```java
class LogEntry {
    String operation;
    int index;
    int term;

    public LogEntry(String op, int idx, int trm) {
        this.operation = op;
        this.index = idx;
        this.term = trm;
    }
}
```
x??

---

#### Leader Election and Fault Tolerance
In the absence of a leader, followers can elect a new leader if necessary. The election process ensures that only an up-to-date replica can become the new leader.

:p How does the system ensure fault tolerance in state machine replication?
??x
Fault tolerance is ensured through mechanisms like leader elections and the requirement for leaders to have all committed entries. A follower can only win an election if its log is at least as up-to-date as any other process involved. This ensures that a new leader always has all committed entries.
```java
public class Election {
    public void electNewLeader() {
        // Compare logs of potential candidates
        for (Process candidate : processes) {
            if (candidate.getLog().isUpToDate(log)) {
                // Candidate can proceed with election
            }
        }
    }
}
```
x??

---

#### AppendEntries Message and Replication Process
The leader sends an `AppendEntries` message to followers, which includes the latest log entry. Followers append this entry to their logs if it’s new.

:p What happens when a leader sends an `AppendEntries` request?
??x
When a leader sends an `AppendEntries` request, it includes the latest log entry. If the follower has not yet committed that entry, it will append it to its own log and send back an acknowledgment. The leader waits for a majority of acknowledgments before considering the operation as committed.
```java
public class Leader {
    public void sendAppendEntriesRequest(LogEntry entry) {
        // Send AppendEntries request to followers
        for (Process follower : followers) {
            if (!follower.getLog().contains(entry)) {
                follower.append(entry);
                follower.sendAck();
            }
        }
    }
}
```
x??

---

#### Handling Temporary Unavailability of Followers
When a follower temporarily becomes unavailable, it will eventually receive an `AppendEntries` message. The leader ensures that the log entries are correctly appended to maintain consistency.

:p What happens when a previously offline follower comes back online?
??x
When a follower re-joins the system, it will receive an `AppendEntries` message from the current leader. This message includes the index and term of the entry immediately preceding the one being appended. If the follower cannot find such an entry in its log, it rejects the message to ensure no gaps are created.
```java
public class Follower {
    public void handleAppendEntries(LogEntry previousEntry) {
        if (!log.contains(previousEntry)) {
            // Reject the request as there's a gap in the log
            reject();
        } else {
            append(previousEntry);
        }
    }
}
```
x??

---

#### Election Mechanism and Log Consistency
The election process ensures that only an up-to-date replica can become the new leader. This is crucial for maintaining consistency and avoiding conflicts.

:p How does the system determine which process becomes the new leader?
??x
The system determines a new leader by ensuring that any candidate’s log must be at least as up-to-date as any other process involved in the election. This means comparing the index and term of the last entries in each process's log to decide on the winner.
```java
public class LeaderElection {
    public Process electNewLeader() {
        int maxTerm = -1;
        Process leaderCandidate = null;
        for (Process candidate : processes) {
            if (candidate.getLog().getTerm() > maxTerm) {
                maxTerm = candidate.getLog().getTerm();
                leaderCandidate = candidate;
            }
        }
        return leaderCandidate;
    }
}
```
x??

---


#### Consensus Problem Overview
Background context explaining the consensus problem, including its fundamental aspects and importance in distributed systems. The problem requires a set of processes to agree on a value in a fault-tolerant manner.
:p What is the consensus problem in distributed systems?
??x
The consensus problem involves a group of processes agreeing on a single value despite potential failures or faults among them. It ensures that every non-faulty process eventually agrees and makes the same decision, with the agreed-upon value being proposed by one of the processes.
x??

---
#### State Machine Replication Application
Explanation on how state machine replication can be used beyond data replication to solve the consensus problem in distributed systems.
:p How is state machine replication applied in solving consensus problems?
??x
State machine replication can be used for consensus because it allows a set of processes to agree on a value. This solution addresses the fundamental consensus problem by ensuring that all non-faulty processes eventually agree, make the same decision everywhere, and the agreed-upon value has been proposed by a process.
x??

---
#### Consistency Models in Replicated Stores
Explanation about how requests are processed in replicated stores and the challenges faced due to network latency.
:p What happens when a client sends a write request to a replicated store?
??x
When a client sends a write request to a replicated store, it must reach the leader, which processes it before sending back a response. Due to network delays, this process is not instantaneous. The system can only guarantee that the request executes somewhere between its invocation and completion time.
x??

---
#### Example of Request Processing
Illustration of how a write request travels through a replicated store, emphasizing the delay in processing.
:p Describe the journey of a write request in a replicated system.
??x
A write request first needs to reach the leader. The leader processes it and then sends back a response to the client. This entire process involves several steps that take time, leading to delays in the request's execution.
```java
// Pseudocode for processing a write request
public class ReplicatedStore {
    void handleWriteRequest(String request) {
        // Leader receives the request
        if (isLeader()) {
            // Process the request locally and send response
            processAndRespond(request);
        } else {
            // Forward to leader
            forwardToLeader(request);
        }
    }

    private void processAndRespond(String request) {
        // Simulate processing time
        Thread.sleep(1000); // Sleep for demonstration purposes

        // Respond back to client
        respondBack("Request processed");
    }

    private void forwardToLeader(String request) {
        // Forward request to leader
        Leader.forward(request);
    }
}
```
x??

