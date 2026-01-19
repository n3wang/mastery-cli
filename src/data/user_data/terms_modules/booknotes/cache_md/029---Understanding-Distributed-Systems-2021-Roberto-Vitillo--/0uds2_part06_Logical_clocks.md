# High-Quality Flashcards: 029---Understanding-Distributed-Systems-2021-Roberto-Vitillo--_processed (Part 6)


**Starting Chapter:** Logical clocks

---


#### Physical Clocks
Physical clocks are based on quartz crystals and are inexpensive but not very accurate. The rate at which a clock runs is called clock drift, while the difference between two clocks at a specific point in time is referred to as clock skew.

The Network Time Protocol (NTP) is used to synchronize physical clocks across different machines, considering network latency. However, this introduces challenges due to unpredictable network latencies.
:p What are physical clocks based on?
??x
Physical clocks are typically based on quartz crystals, which can vary slightly in their frequency due to manufacturing differences and temperature changes, leading to clock drift.
x??

---

#### Monotonic Clocks
Monotonic clocks measure the number of seconds elapsed since an arbitrary point, such as when a node started up. Unlike physical clocks, monotonic clocks can only move forward in time and are not affected by time jumps.

This type of clock is useful for measuring the elapsed time between two timestamps on the same node but cannot be used to compare timestamps from different nodes.
:p What is the main characteristic of a monotonic clock?
??x
The main characteristic of a monotonic clock is that it can only move forward in time and cannot jump back. It measures the number of seconds elapsed since an arbitrary point, like when a node started up.
x??

---

#### Lamport Clocks
Lamport clocks are a type of logical clock used to capture causal relationships between operations in distributed systems. Each process has its own local logical clock implemented with a numerical counter that follows specific rules: initialize the counter to 0, increment it before executing an operation, and update the counter when receiving messages.

This approach helps in determining causality without relying on physical time.
:p How does Lamport's algorithm ensure causal ordering between operations?
??x
Lamport's algorithm ensures causal ordering by having each process increment its local clock counter before performing an operation. When a message is sent, it includes the sender's current logical timestamp, and upon receiving a message, the receiver updates its clock to be 1 plus the maximum of its current logical timestamp or the received timestamp.

This way, if operation $O_1 $ happened-before operation$O_2 $, the logical timestamp of$ O_1 $will always be less than that of$ O_2$.

Example code:
```java
public class Process {
    private int clock;

    public void incrementClock() {
        this.clock++;
    }

    public synchronized void send(int timestamp, Message message) {
        // Increment local clock before sending the message
        incrementClock();
        message.setTimestamp(this.clock);
        sendMessage(message);
    }

    public synchronized void receive(Message message) {
        // Update the local clock to be 1 plus the maximum of its current value or the received timestamp
        this.clock = Math.max(this.clock, message.getTimestamp()) + 1;
    }
}
```
x??

---

#### Clock Synchronization Challenges
In distributed systems, synchronizing physical clocks perfectly is challenging due to unpredictable network latencies. NTP helps in estimating clock skew by correcting timestamps with estimated network latency.

However, this introduces errors when measuring the elapsed time between two points in time.
:p What are the main challenges in using physical clocks for ordering operations in a distributed system?
??x
The main challenges in using physical clocks for ordering operations in a distributed system include:

1. **Clock Drift**: Physical clocks can drift over time due to manufacturing differences and temperature changes, leading to inaccuracies.
2. **Network Latency**: Network delays introduce unpredictability when synchronizing clocks across different processes.
3. **Time Jumps**: Clocks can jump forward or backward in time due to system updates or corrections.

To overcome these challenges, logical clocks like Lamport clocks are used to capture causal relationships between operations without relying on physical time.
x??

---


#### Vector Clocks: Introduction and Basic Concepts
Vector clocks are a type of logical clock used to track causality between operations across distributed systems. Unlike physical clocks, vector clocks can handle partial orderings of events that happen on different processes. The basic idea is to use an array of counters, one for each process in the system.

If a system has 3 processes $P_1, P_2,$ and $P_3$, then each process maintains its own vector clock with an array of three counters: [𝐶𝑃₁, 𝐶𝑃₂, 𝐶𝑃₃].

:p What is the purpose of vector clocks in distributed systems?
??x
Vector clocks are used to determine the order of events that occur across different processes in a distributed system. They help in maintaining causality by providing a way to partially order operations based on their logical timestamps.

For example, if $P_1 $ sends a message to$P_2$, both will increment their respective counters.
x??

---
#### Vector Clocks: Initialization and Increment Rules
Each vector clock is initialized with all counters set to zero. When an operation occurs or when a message is sent, the sending process increments its own counter.

:p How does a process update its local vector clock?
??x
A process updates its local vector clock by incrementing the corresponding counter in the array whenever an operation occurs or when it sends a message. The receiving process then merges the received vector clock with its own by taking the maximum value of each counter and finally increments its own counters.

```java
public class VectorClock {
    private int[] counters;
    
    public VectorClock(int numProcesses) {
        this.counters = new int[numProcesses];
    }
    
    public void incrementLocalCounter() {
        for (int i = 0; i < counters.length; i++) {
            counters[i]++;
        }
    }
}
```
x??

---
#### Vector Clocks: Merging Counter Arrays
When a process receives a message, it merges the received vector clock with its own by taking the maximum value of each counter. After merging, the receiving process increments its own local counter array.

:p What is the rule for merging two vector clocks?
??x
To merge two vector clocks, take the element-wise maximum of their corresponding counters. This ensures that if a counter in one vector clock is greater than or equal to the same counter in another vector clock, it remains unchanged. After merging, increment each local counter by one.

```java
public VectorClock merge(VectorClock receivedClock) {
    for (int i = 0; i < counters.length; i++) {
        this.counters[i] = Math.max(this.counters[i], receivedClock.counters[i]);
    }
    // Increment after merging to capture the local event
    incrementLocalCounter();
}
```
x??

---
#### Vector Clocks: Ordering Operations
Operations can be ordered based on their vector clock timestamps. If one operation's timestamp is a sub-vector of another's, and there is at least one counter that strictly decreases in the first vector compared to the second, then the first operation happened before the second.

:p How are operations ordered using vector clocks?
??x
Operations are ordered by comparing their vector clock timestamps. Specifically, if $T1 $(timestamp from one operation) has every counter less than or equal to the corresponding counter in $ T2 $, and there is at least one counter that strictly decreases, then the operation with$ T1 $ happened before the operation with $ T2$.

For example:
- If $T1 = [0, 3]$ and $T2 = [1, 5]$, then $ O1$happened before $ O2$.
- If both are equal or no strict decrease is present, operations are considered concurrent.

```java
public boolean happenedBefore(VectorClock other) {
    for (int i = 0; i < counters.length; i++) {
        if (counters[i] > other.counters[i]) return false;
    }
    // Check for a strictly less counter to confirm causality
    for (int i = 0; i < counters.length; i++) {
        if (counters[i] < other.counters[i]) return true;
    }
    return false;
}
```
x??

---
#### Vector Clocks: Concurrent Operations
If operations cannot be ordered based on vector clocks, they are considered concurrent. This occurs when no counter in one vector is strictly less than the corresponding counter in another.

:p What happens if two operations can't be ordered by their vector clock timestamps?
??x
If there is no counter that is strictly less between two operations' vector clock timestamps, then the operations are considered to be concurrent. For instance, in Figure 8.2, operations E and C cannot be ordered and thus are deemed concurrent.

```java
public boolean isConcurrentWith(VectorClock other) {
    for (int i = 0; i < counters.length; i++) {
        if (counters[i] > other.counters[i]) return false;
    }
    // Check all counts to confirm no strict decrease, indicating concurrency
    for (int i = 0; i < counters.length; i++) {
        if (counters[i] < other.counters[i]) return true;
    }
    return false;
}
```
x??

---
#### Vector Clocks: Limitations and Practical Use Cases
While vector clocks are powerful tools, physical clocks cannot accurately determine the order of events across different processes due to network delays and non-deterministic factors.

:p Why can't we use physical clocks for ordering operations in distributed systems?
??x
Physical clocks cannot be used reliably for ordering operations in distributed systems because they do not account for the time differences between nodes. Network delays, clock skew, and other non-deterministic factors make it impossible to accurately determine causality based on wall-clock times alone.

Logical clocks like vector clocks provide a more robust solution by maintaining partial orderings that can be used to infer causality in distributed systems.
x??

---


#### Raft Leader Election Overview
Raft is a consensus algorithm used to manage distributed systems, ensuring that all nodes agree on the state of the system. In this context, leader election is crucial for determining which process has special powers such as access to shared resources or task assignment.

The Raft leader election algorithm operates in a state machine with three states: follower, candidate, and leader. Time is divided into election terms, each term having its own unique identifier.

:p What are the three states of the Raft leader election algorithm?
??x
The three states of the Raft leader election algorithm are:
- Follower: In this state, a process recognizes another process as the current leader.
- Candidate: A process transitions to this state when it initiates an election, proposing itself as the new leader.
- Leader: The process that is elected as the leader.

In each term, only one leader can exist. This ensures safety and liveliness in the system.
x??

#### Triggering a New Election
The Raft algorithm starts with all processes in the follower state when the system initializes. A follower expects periodic heartbeats from the current leader containing the leader's election term number.

:p What triggers a new election according to the Raft algorithm?
??x
A new election is triggered when a follower does not receive any heartbeat messages within a certain timeout period. If this happens, it assumes the current leader is dead and starts an election by incrementing its current election term and transitioning into the candidate state.

The process then votes for itself and sends a request to all other processes in the system to vote for it, stamping the request with the current election term.
x??

#### Candidate State Logic
In the candidate state, a process proposes itself as the new leader. It does this by incrementing its election term and sending a request to all other processes to vote for it.

:p What actions do candidates take in their initial attempt to become leaders?
??x
Initially, a candidate in Raft performs the following steps:
1. Increment its current election term.
2. Send a vote request stamped with the new election term to all other processes in the system.
3. Vote for itself as the leader on a first-come-first-served basis.

The candidate remains in this state until one of three things happens: it wins the election, another process wins the election, or there is no winner after some time.
x??

#### Winning an Election
For a candidate to win an election, it must receive votes from more than half of the processes (majority rule). Each process can vote for at most one candidate per term.

:p How does a candidate win the election in Raft?
??x
A candidate wins the election if it receives votes from a majority of the processes. Here's how the logic works:

1. The candidate sends out vote requests to all other processes, stamping each request with its current election term.
2. Each process can only vote for one candidate per term based on a first-come-first-served basis.
3. If the candidate receives more than half of the votes from the other processes, it transitions into the leader state.

Once in the leader state, the candidate starts sending heartbeats to all other processes.
x??

#### Handling Heartbeats and Losing Elections
If a candidate receives a heartbeat message from another process claiming to be the leader with an election term greater than or equal to its own, it should accept the new leader and transition back to the follower state.

:p What happens if a candidate receives a heartbeat from a higher-term leader?
??x
If a candidate receives a heartbeat from another process that claims to be the leader with an election term greater than or equal to its own, the candidate should:

1. Accept the newer leader.
2. Transition back into the follower state.

This ensures that only one leader exists at any given time, maintaining system safety and liveliness.
x??

--- 

These flashcards cover key aspects of the Raft leader election algorithm, including state transitions, term management, and how a candidate becomes or loses an election.

