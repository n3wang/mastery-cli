# High-Quality Flashcards: 029---Understanding-Distributed-Systems-2021-Roberto-Vitillo--_processed (Part 5)

**Rating threshold:** >= 8/10

**Starting Chapter:** II Coordination

---

**Rating: 8/10**

#### Formal Models for Distributed Systems
Background context: To understand and reason about distributed systems, we use formal models that abstract away the complexities of implementation. These models help us define assumptions about node behavior, communication links, and timing. 

:p What are formal models used for in distributed systems?
??x
Formal models encode our assumptions about nodes, communication links, and timing to allow reasoning about distributed systems without getting into the specifics of technology implementations.
x??

---

#### Detecting Unreachable Remote Processes
Background context: In distributed systems, processes can crash or become unreachable. Failure detection mechanisms are necessary to ensure reliable communication between processes.

:p How do we detect that a remote process is unreachable?
??x
We need to implement failure detection algorithms to handle cases where a remote process might be unreachable due to network issues or crashes.
x??

---

#### Time and Order in Distributed Systems
Background context: Agreeing on the sequence of events and time can be challenging in distributed systems. Clocks that measure actual time may not be available, so alternative methods are used.

:p Why is agreeing on time harder in distributed systems?
??x
Agreeing on a common notion of time across multiple nodes is difficult because network delays and node clocks might differ significantly.
x??

---

#### Election Algorithms for Distributed Systems
Background context: A group of processes may need to elect a leader who can perform specific tasks, such as accessing shared resources or coordinating actions.

:p How do distributed systems elect a leader?
??x
Processes in a distributed system use election algorithms to choose a leader among themselves. This involves sending messages and following certain rules to ensure the leader is chosen correctly.
x??

---

#### Replication and Consistency Tradeoffs
Background context: Keeping data consistent across multiple nodes can be challenging due to network partitions. There is often a tradeoff between consistency and availability.

:p What is the Raft algorithm used for in distributed systems?
??x
The Raft algorithm is used to manage replicated state machines, ensuring that data remains consistent across multiple nodes even when some nodes are down.
x??

---

#### Distributed Transactions Across Nodes
Background context: Transactions spanning multiple nodes require special handling to ensure atomicity and consistency despite network partitions.

:p What is the purpose of implementing transactions in distributed systems?
??x
The purpose of implementing transactions in distributed systems is to handle scenarios where data is partitioned across multiple nodes or services, ensuring that operations are executed reliably even if some nodes fail.
x??

---

**Rating: 8/10**

#### Fair-Loss Link Model
Background context: The fair-loss link model assumes that messages may be lost and duplicated. If the sender keeps retransmitting a message, eventually it will be delivered to the destination. This model is often used as an abstraction for communication links where reliability can vary.
:p What does the fair-loss link model assume about message delivery?
??x
The model assumes that messages might be lost or duplicated but if sent multiple times, they will eventually reach their destination.
x??

---

#### Reliable Link Model
Background context: The reliable link model assumes that a message is delivered exactly once, without loss or duplication. This can be implemented on top of a fair-loss link by de-duplicating messages at the receiving side.
:p How does the reliable link model ensure message delivery?
??x
The model ensures message delivery by assuming that each message is sent only once and is reliably received without being lost or duplicated. At the receiver, duplicates are discarded to maintain reliability.
x??

---

#### Authenticated Reliable Link Model
Background context: The authenticated reliable link model makes the same assumptions as the reliable link but adds the assumption that the receiver can authenticate the sender of the message.
:p What additional assumption does the authenticated reliable link model make compared to the reliable link?
??x
The model assumes that the receiver can verify the identity of the message's sender, ensuring not only that the message is delivered reliably but also that it comes from the correct source.
x??

---

#### Arbitrary-Fault (Byzantine) Model
Background context: The arbitrary-fault model, historically referred to as the "Byzantine" model, assumes that a node can deviate from its algorithm in arbitrary ways. It has been theoretically proven that systems with Byzantine nodes can tolerate up to 1/3 of faulty nodes and still operate correctly.
:p What is the key characteristic of nodes under the arbitrary-fault (Byzantine) model?
??x
Nodes in this model can behave arbitrarily, including crashing or exhibiting unexpected behavior due to bugs or malicious activity. They cannot be trusted to follow the algorithm as specified.
x??

---

#### Crash-Recovery Model
Background context: The crash-recovery model assumes that a node doesn't deviate from its algorithm but can crash and restart at any time, losing its in-memory state. Algorithms for this model need to handle crashes gracefully.
:p What is the behavior of nodes under the crash-recovery model?
??x
Nodes follow their algorithms correctly but are prone to crashing and restarting at unpredictable times, causing them to lose their in-memory states during operation.
x??

---

#### Crash-Stop Model
Background context: The crash-stop model assumes that a node doesn't deviate from its algorithm but if it crashes, it never comes back online. This model is stricter than the crash-recovery model as nodes are assumed to be completely dead after crashing.
:p How does the crash-stop model differ from the crash-recovery model?
??x
In contrast to the crash-recovery model, where nodes can restart and potentially regain functionality, the crash-stop model assumes that once a node crashes, it will never come back online and is considered fully dead.
x??

---

#### Synchronous Model
Background context: The synchronous model assumes that sending a message or executing an operation never takes over a certain amount of time. This assumption is unrealistic in practice, as network delays can be significant.
:p What does the synchronous model assume about operations?
??x
The model assumes that operations like sending messages or executing tasks take constant time and do not depend on external factors such as network latency or system load.
x??

---

#### Asynchronous Model
Background context: The asynchronous model assumes that sending a message or executing an operation can take an unbounded amount of time. Many problems cannot be solved under this assumption, as algorithms might get stuck indefinitely if messages never arrive.
:p What does the asynchronous model assume about operations?
??x
The model assumes that operations may take any arbitrary amount of time to complete, possibly due to network delays or other system constraints.
x??

---

#### Partially Synchronous Model
Background context: The partially synchronous model assumes that the system behaves synchronously most of the time but can occasionally regress to an asynchronous mode. This model is typically representative enough for practical systems.
:p How does the partially synchronous model differ from the fully synchronous and asynchronous models?
??x
The model assumes that while the system generally behaves in a synchronous manner, it may occasionally degrade to an asynchronous state due to temporary disruptions or delays.
x??

---

**Rating: 8/10**

#### Timeout Mechanism for Server Unavailability
Background context explaining the concept. In scenarios where a client sends a request to a server, it may not receive a response due to various issues like network delays or server crashes. To handle such situations, clients can set up timeouts that trigger if no response is received after a certain amount of time.
If the timeout triggers, the client assumes the server is unavailable and throws an error.

:p What is the purpose of setting up a timeout in server communication?
??x
The purpose of setting up a timeout is to determine whether the server has failed or is unreachable due to network issues by detecting when no response is received within a specified period. This helps avoid indefinite waiting for non-arriving responses.
```java
// Example Java code snippet for timeout mechanism
public class Client {
    private int timeout = 5000; // Timeout set in milliseconds

    public void sendRequest(String request) {
        long startTime = System.currentTimeMillis();
        boolean receivedResponse = false;

        while (!receivedResponse && (System.currentTimeMillis() - startTime < timeout)) {
            try {
                String response = server.send(request); // Simulate sending request
                if (response != null) {
                    receivedResponse = true;
                }
            } catch (Exception e) {
                // Handle exceptions
            }
        }

        if (!receivedResponse) {
            throw new RuntimeException("Timeout occurred: Server is unreachable");
        }
    }
}
```
x??

---

#### Importance of Timeouts in Failure Detection
Background context explaining the concept. Setting up appropriate timeouts can help clients distinguish between slow servers and servers that are actually down or inaccessible due to network issues.

:p Why is it challenging to define an optimal timeout duration?
??x
Defining an optimal timeout duration is difficult because if it's too short, a reachable server might be incorrectly flagged as unavailable; conversely, if the timeout is too long, a truly unreachable server may cause unnecessary blocking. Thus, finding the right balance requires careful consideration.
```java
// Example Java code snippet for dynamic timeout adjustment based on network conditions
public class NetworkMonitor {
    public int getTimeout() {
        // Logic to adjust timeout based on network latency and packet loss
        if (networkLatency > 100 && packetLossRate > 5) {
            return 6000; // Increase timeout for better reliability
        } else {
            return 3000; // Default timeout value
        }
    }

    private int networkLatency;
    private int packetLossRate;
}
```
x??

---

#### Pings and Heartbeats for Process Availability
Background context explaining the concept. Processes can proactively maintain a list of available processes using pings or heartbeats to check if other processes are still reachable.

:p What is a ping in the context of process communication?
??x
A ping is a periodic request sent by one process to another to verify its availability. The sending process expects a response within a specific timeframe, and if no response is received, it triggers a timeout that marks the destination as unavailable.
```java
// Example Java code snippet for pings
public class PingManager {
    private static final int PING_INTERVAL = 5000; // Time between pings in milliseconds

    public void sendPing(String processId) {
        long startTime = System.currentTimeMillis();
        boolean receivedResponse = false;

        while (!receivedResponse && (System.currentTimeMillis() - startTime < PING_INTERVAL)) {
            try {
                String response = otherProcess.checkAvailability(processId); // Simulate ping
                if (response != null) {
                    receivedResponse = true;
                }
            } catch (Exception e) {
                // Handle exceptions
            }
        }

        if (!receivedResponse) {
            markProcessAsDead(processId);
        }
    }

    private void markProcessAsDead(String processId) {
        // Logic to handle a dead process
    }
}
```
x??

---

#### Heartbeats for Process Availability
Background context explaining the concept. A heartbeat is a message sent periodically by one process to another to inform it that the sending process is still up and running.

:p What is a heartbeat in the context of process communication?
??x
A heartbeat is a message sent periodically by one process to indicate its operational status to another process. If no heartbeat is received within a specific timeframe, a timeout triggers, marking the sender as dead.
```java
// Example Java code snippet for heartbeats
public class HeartbeatManager {
    private static final int HEARTBEAT_INTERVAL = 3000; // Time between heartbeats in milliseconds

    public void sendHeartbeat(String processId) {
        long startTime = System.currentTimeMillis();
        boolean receivedResponse = false;

        while (!receivedResponse && (System.currentTimeMillis() - startTime < HEARTBEAT_INTERVAL)) {
            try {
                otherProcess.receiveHeartbeat(processId); // Simulate heartbeat
            } catch (Exception e) {
                // Handle exceptions
            }
        }

        if (!receivedResponse) {
            markProcessAsDead(processId);
        }
    }

    private void markProcessAsDead(String processId) {
        // Logic to handle a dead process
    }
}
```
x??

---

#### Active Monitoring Using Pings and Heartbeats
Background context explaining the concept. Processes can actively monitor each other's availability using pings or heartbeats, ensuring they receive immediate feedback if a peer becomes unreachable.

:p How do pings and heartbeats help in detecting failures?
??x
Pings and heartbeats help detect failures by providing periodic checks on the availability of processes. If no response is received within the expected timeframe, it triggers a timeout that marks the process as dead or unavailable. This allows for quick action to be taken when a failure occurs.
```java
// Example Java code snippet for active monitoring with pings and heartbeats
public class ActiveMonitor {
    private static final int PING_INTERVAL = 5000;
    private static final int HEARTBEAT_INTERVAL = 3000;

    public void monitorProcess(String processId) {
        new Thread(() -> {
            while (true) {
                try {
                    sendPing(processId); // Periodically send pings
                    sendHeartbeat(processId); // Periodically send heartbeats
                    Thread.sleep(Math.max(PING_INTERVAL, HEARTBEAT_INTERVAL)); // Wait before next check
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        }).start();
    }

    private void sendPing(String processId) {
        // Send ping logic
    }

    private void sendHeartbeat(String processId) {
        // Send heartbeat logic
    }
}
```
x??

