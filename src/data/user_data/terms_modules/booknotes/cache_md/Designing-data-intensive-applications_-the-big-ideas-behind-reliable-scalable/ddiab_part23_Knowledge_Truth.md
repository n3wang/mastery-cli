# High-Quality Flashcards: Designing-data-intensive-applications_-the-big-ideas-behind-reliable-scalable_processed (Part 23)


**Starting Chapter:** Knowledge Truth and Lies. The Truth Is Defined by the Majority

---


#### Node Uncertainty in Distributed Systems
In distributed systems, nodes cannot rely on shared memory and must communicate via an unreliable network. Delays and partial failures are common issues. Nodes can only make guesses based on messages they receive or don't receive.
:p How does node uncertainty affect communication in a distributed system?
??x
Node uncertainty affects communication by making it difficult for a node to determine the state of other nodes accurately. Since there is no shared memory, nodes must rely on unreliable network communications that may have delays or even failures. This leads to situations where nodes might not receive expected responses from others.
```java
// Example: Sending a message and receiving a response in an unreliable network
public void sendMessage(String message) {
    try {
        // Attempt to send the message over the network
        Network.send(message);
        // Wait for a response with potential timeouts
        String response = Network.receive();
        if (response != null) {
            System.out.println("Received: " + response);
        } else {
            System.out.println("No response received.");
        }
    } catch (TimeoutException e) {
        System.err.println("Message timed out.");
    }
}
```
x??

---

#### Asymmetric Faults in Distributed Systems
Consider a scenario where one node can receive messages but cannot send them due to dropped or delayed outgoing messages. This situation can lead to incorrect assumptions about the state of the faulty node.
:p Describe an asymmetric fault and its consequences in a distributed system?
??x
An asymmetric fault occurs when a node can still receive messages but fails to acknowledge sending them, leading other nodes to misinterpret its state. For example, if Node A can receive messages from Node B but cannot send any responses back, Node B might assume that Node A is dead or malfunctioning due to the lack of acknowledgment.
```java
// Example: Handling an asymmetric fault in a network communication
public void handleAsymmetricFault(String message) {
    try {
        // Attempt to send and receive messages
        Network.send(message);
        String response = Network.receive();
        if (response == null) {
            System.out.println("Node appears dead or faulty.");
        } else {
            System.out.println("Received: " + response);
        }
    } catch (Exception e) {
        // Handle exceptions related to network communication
        System.err.println("Network error occurred: " + e.getMessage());
    }
}
```
x??

---

#### Majority Rule for Determining Node State
In a distributed system, the state of a node can be determined by a majority rule. If a significant number of nodes agree on something, that agreement is taken as truth.
:p How does the majority rule work in determining the state of a node?
??x
The majority rule works by having multiple nodes participate in a consensus mechanism. When a node’s status or data is in question, a vote or message exchange among several nodes determines its state based on a simple majority. If more than 50% of nodes agree that a node is functioning correctly, then the system assumes it to be true.
```java
// Example: Majority rule for determining if a node is alive
public boolean checkNodeAlive(List<String> nodes) {
    int aliveCount = 0;
    for (String node : nodes) {
        // Check if the node responds within a timeout period
        try {
            Network.send(node, "Ping");
            String response = Network.receive(node);
            if ("Pong".equals(response)) {
                aliveCount++;
            }
        } catch (TimeoutException e) {
            // Node did not respond in time
        }
    }
    return aliveCount > nodes.size() / 2;
}
```
x??

---

#### Long Garbage Collection Pauses
A node may experience long stop-the-world garbage collection pauses, which can be mistaken for a failure. This can lead to incorrect assumptions about the state of the node.
:p How do long garbage collection pauses affect a node's perceived state in a distributed system?
??x
Long garbage collection (GC) pauses can cause a node to appear unresponsive or faulty because during these periods, the node is not processing any messages. Other nodes might interpret this as the node being dead or having failed, even though it is functioning correctly.
```java
// Example: Handling long GC pauses in a distributed system
public void handleGCPauses() {
    try {
        // Simulate start of garbage collection
        System.gc();
        // Wait for a significant period (e.g., 10 seconds)
        Thread.sleep(10000);
        // Process messages after the pause
        Network.receiveAndProcessMessages();
    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
        System.err.println("Interrupted during GC.");
    }
}
```
x??

---


#### GC Preemption and Node Failure Handling
Background context: This concept discusses how garbage collection (GC) can preempt all threads of a node, causing it to pause for an extended period. During this time, no requests are processed or responses sent, leading other nodes to declare the failed node dead due to inactivity. The GC eventually completes, and the node resumes operation as if nothing happened.

:p What happens when garbage collection preempts all threads of a node?
??x
When garbage collection preempts all threads of a node, it causes the node to pause for an extended period, typically long enough for other nodes in the distributed system to declare it dead due to lack of response. During this pause, no requests are processed or responses sent.
x??

---
#### Quorum-based Decision Making
Background context: This concept explains how decisions in a distributed system should be made by consensus among multiple nodes rather than relying on a single node's judgment. A quorum ensures that the majority (more than half) of nodes agree before making a decision, reducing the risk of split brain or incorrect state.

:p What is a quorum and why is it important?
??x
A quorum in a distributed system refers to a minimum number of votes from several nodes required to make decisions. It ensures that not just one node but a majority agrees on any action or decision, preventing split brain scenarios where multiple conflicting states can arise if decisions are based solely on individual node judgments.
x??

---
#### Handling Node Failures with Quorums
Background context: This concept illustrates how quorums help in making decisions about node failures. If a quorum of nodes declares another node dead, then that node must be considered dead even if it feels alive from its own perspective.

:p How does a quorum handle the declaration of a failed node?
??x
A quorum of nodes can declare another node as dead by reaching a consensus among themselves. Even if the node itself believes it is still operational, once a majority of nodes have declared it dead, that decision must be adhered to, ensuring the system does not get stuck in an inconsistent state.
x??

---
#### Leader Election and Locking Mechanisms
Background context: This concept discusses the necessity of having only one leader or lock holder for critical operations in distributed systems. It ensures that there is no split brain scenario where multiple nodes think they are leaders or hold locks, leading to potential data corruption.

:p What issues arise from having more than one leader in a distributed system?
??x
Having more than one leader in a distributed system can lead to the "split brain" problem, where different parts of the system take conflicting actions because there is no agreement on which node should be considered the true leader. This can result in data corruption or inconsistent states.
x??

---
#### Consensus Algorithms and Quorums
Background context: The text hints that detailed discussion on consensus algorithms will come later in Chapter 9, emphasizing the importance of quorum-based decision making for ensuring system reliability.

:p What role do consensus algorithms play in distributed systems?
??x
Consensus algorithms are crucial in distributed systems as they help ensure agreement among nodes about decisions or states. By relying on quorums, these algorithms can achieve reliable and consistent operation even when some nodes fail, preventing split brain scenarios.
x??

---
#### Example of Node Health Check
Background context: This example shows how a node might incorrectly continue to believe it is the leader after being declared dead by a majority of other nodes.

:p How does an incorrect belief in leadership manifest in distributed systems?
??x
An incorrect belief in leadership can occur when a node continues to act as if it holds a leadership role despite having been declared dead by a quorum. This can lead to miscommunication and inconsistencies within the system, as other nodes may not recognize its authority.
```java
public class NodeHealthCheck {
    private boolean isLeader;
    
    public void checkLeadershipStatus() {
        // Simulate checking if the node is still considered leader
        if (!isLeader) {
            System.out.println("Node believes it's still the leader, but has been declared dead.");
        } else {
            System.out.println("Node correctly recognizes its current status as not being a leader.");
        }
    }
}
```
x??

---


#### Data Corruption Bug Due to Incorrect Lock Implementation
Background context explaining that a distributed system can face issues when implementing locks incorrectly. The example provided is from HBase, where a bug occurred due to an incorrect implementation of locking. This issue arises because if a client holding a lease (or lock) pauses for too long, its lease expires while another client acquires the same resource.

:p Describe the scenario leading to data corruption in distributed systems when implementing locks incorrectly.
??x
In this scenario, client 1 obtains a lease from a lock service and believes it still has a valid lease even after the lease has expired. Meanwhile, client 2 acquires the same lease and starts writing to the file. When client 1 resumes operation, believing its lease is still valid, both clients attempt to write to the file simultaneously, causing corruption.

??x
The problem arises because:
- The lock service grants a lease but does not monitor if the client holding it becomes unresponsive.
- If the client with the lease pauses for too long, another client can acquire the same resource and begin writing.
- Upon resuming operation, the first client incorrectly assumes its lease is still valid.

This situation highlights the need for mechanisms to ensure that a node that has falsely assumed it holds a lock cannot disrupt the system.
x??

---

#### Fencing Tokens
Background context explaining the concept of fencing tokens as a method to protect resources in distributed systems. Fencing ensures that only writes with the latest token can be processed, preventing conflicts when multiple clients attempt to write to the same resource.

:p What is a fencing token and how does it prevent data corruption?
??x
A fencing token is a mechanism used in distributed systems to ensure that only requests from the most recently granted lock are processed. It works by requiring each client to include its current fence token (which increases with each new lock grant) when sending write requests.

If a client holding an old lease attempts to write after another client has obtained the same resource, the storage service will reject the request based on the fencing token.

??x
The logic behind this is:
- Each time a lock is granted, the fence token increments.
- Write requests must include their current fence token.
- The storage service checks if the received fence token is higher than any previously processed token for that resource.

If the new token is not newer (higher), the request is rejected to prevent data corruption.

Code Example:
```java
public class FencingTokenCheck {
    private Map<String, Integer> processedTokens = new HashMap<>();

    public boolean processWrite(String resourceName, int fenceToken) {
        if (processedTokens.containsKey(resourceName)) {
            return fenceToken > processedTokens.get(resourceName);
        }
        // Process the write and update the token.
        processedTokens.put(resourceName, fenceToken);
        return true;
    }
}
```
x??

---

#### Fencing with ZooKeeper
Background context explaining that ZooKeeper can be used as a lock service in distributed systems. It provides mechanisms like transaction IDs (`zxid`) or node version numbers (`cversion`) which act as fencing tokens.

:p How does using ZooKeeper for locking and fencing work?
??x
Using ZooKeeper for locking and fencing involves:
- Every time ZooKeeper grants a lock, it returns a unique `zxid` (transaction ID) or a `cversion` (node version number).
- These IDs are guaranteed to be monotonically increasing.
- Each write request includes the current fence token with its corresponding resource.

If a client’s request is processed by the storage service and has an older fence token, the request will be rejected.

??x
Explanation:
- ZooKeeper's `zxid` or `cversion` ensures that every lock grant increments uniquely.
- When a write request comes in, it checks against the stored highest fence token for the resource.
- If the current token is lower than the stored one, the request is rejected to maintain data integrity.

Example Usage:
```java
public class ZooKeeperFencing {
    private Map<String, Integer> processedTokens = new HashMap<>();

    public boolean processWrite(String resourceName, int zxid) {
        if (processedTokens.containsKey(resourceName)) {
            return zxid > processedTokens.get(resourceName);
        }
        // Process the write and update the token.
        processedTokens.put(resourceName, zxid);
        return true;
    }
}
```
x??

---


#### Byzantine Faults and Fencing Tokens
Background context: The concept of Byzantine faults is introduced, where nodes may act unpredictably or maliciously. This contrasts with typical failures that are predictable and can be handled by simple mechanisms like fencing tokens. In a distributed system, it's critical to distinguish between honest but unreliable nodes and potentially malicious ones.

:p What is the primary difference between Byzantine faults and typical node failures?
??x
Byzantine faults involve nodes that may act arbitrarily or lie about their state, whereas typical node failures are predictable and can be managed by simpler mechanisms like fencing tokens. In a Byzantine fault scenario, nodes may send false messages, making it challenging to ensure the integrity of communication.
x??

---

#### The Byzantine Generals Problem
Background context: This problem illustrates the challenge of achieving consensus among nodes when some nodes might lie or behave maliciously. It's based on the historical analogy of generals needing to agree on a battle plan despite potential traitors and unreliable messengers.

:p What is the core issue in the Byzantine Generals Problem?
??x
The core issue is reaching agreement among parties (generals) even when some of them may send false or misleading messages. The problem highlights how difficult it is to ensure trust in a distributed system where nodes might behave unpredictably or maliciously.
x??

---

#### Byzantine Fault-Tolerant Systems
Background context: A system is considered Byzantine fault-tolerant if it can continue operating correctly even when some nodes are malfunctioning or being malicious. This concept is crucial for critical systems, such as aerospace, where failures could have severe consequences.

:p What makes a system Byzantine fault-tolerant?
??x
A system is Byzantine fault-tolerant if it can continue to operate correctly in the presence of faulty or malicious nodes. Typically, this requires more than two-thirds of the nodes to be functioning correctly and adhering to the protocol.
x??

---

#### Practical Considerations for Distributed Systems
Background context: In most server-side data systems controlled by an organization, Byzantine fault-tolerant solutions are impractical due to costs and the reliable nature of the environment. However, peer-to-peer networks like Bitcoin rely more on such fault-tolerance mechanisms.

:p Why are Byzantine fault-tolerant protocols typically not used in typical server-side data systems?
??x
Byzantine fault-tolerant protocols are often impractical in typical server-side data systems because they require significant resources and assume a high likelihood of malicious behavior, which is less common in controlled environments. The costs associated with implementing such robust mechanisms usually outweigh the benefits.
x??

---

#### Input Validation and Client Behavior
Background context: Client behavior on web applications must be validated and sanitized to prevent attacks like SQL injection or cross-site scripting. Byzantine fault-tolerant protocols are not necessary here as the server acts as the authority.

:p Why is input validation important in web applications?
??x
Input validation is crucial in web applications because it helps protect against common security threats such as SQL injection, cross-site scripting (XSS), and other forms of malicious client behavior. By validating inputs, developers ensure that only safe data is processed by the application.
x??

---

#### Byzantine Fault-Tolerance in Peer-to-Peer Networks
Background context: In peer-to-peer networks like Bitcoin, where there's no central authority, Byzantine fault-tolerance is essential to maintain consensus on the validity of transactions.

:p Why is Byzantine fault tolerance more relevant in peer-to-peer networks?
??x
Byzantine fault tolerance is more relevant in peer-to-peer networks because these systems lack a central authority. Without a trusted intermediary, nodes must ensure that messages are not tampered with or sent maliciously to maintain the integrity of the network and transactions.
x??

---

#### Limitations of Byzantine Fault-Tolerance Against Software Bugs
Background context: While Byzantine fault-tolerant algorithms can handle malicious behavior, they may be ineffective against bugs in software implementations. Multiple independent implementations are needed for such systems.

:p How effective are Byzantine fault-tolerant algorithms at handling software bugs?
??x
Byzantine fault-tolerant algorithms are not effective at handling software bugs unless multiple independent implementations of the same software are used and hope that a bug only appears in one of them. This is impractical due to the complexity and cost involved.
x??

---


---
#### Asynchronous Model
Background context: In an asynchronous model, algorithms cannot make timing assumptions and do not have a clock. This makes design challenging due to the inherent restrictions and unpredictability of node failures.

:p What is the asynchronous model?
??x
The asynchronous model is a system where algorithms cannot rely on any timing assumptions or use timeouts. Nodes can fail at any moment and may never come back, which complicates algorithm design significantly.
x??

---
#### Crash-Stop Faults
Background context: In this fault model, nodes can only stop responding abruptly without the possibility of restarting.

:p What is a crash-stop fault?
??x
A crash-stop fault occurs when a node stops functioning abruptly and does not come back online. The node ceases to respond and remains offline permanently.
x??

---
#### Crash-Recovery Faults
Background context: Nodes in this model can fail at any time, but they retain their stable storage even after restarting.

:p What is a crash-recovery fault?
??x
A crash-recovery fault describes nodes that can fail at any moment. However, these nodes have persistent storage (nonvolatile) which retains data during crashes, while their memory state may be lost.
x??

---
#### Byzantine Faults
Background context: This model assumes the most challenging scenario where nodes can exhibit arbitrary and potentially malicious behavior.

:p What is a Byzantine fault?
??x
A Byzantine fault is when nodes in the system can behave arbitrarily, including deception or failure in unpredictable ways. They may attempt to trick other nodes, making it difficult for algorithms to predict their actions.
x??

---
#### System Model: Partially Synchronous with Crash-Recovery Faults
Background context: This model combines elements of both synchronous and asynchronous models, focusing on the scenario where some level of synchronization can be assumed but nodes can still fail unpredictably.

:p What is the partially synchronous model with crash-recovery faults?
??x
The partially synchronous model assumes that while there might be some degree of predictability in timing (asynchronous), nodes can still fail and recover unpredictably. It combines elements of both asynchronous and synchronous models, making it a practical choice for real-world systems.
x??

---
#### Correctness of Algorithms
Background context: Defining correctness involves specifying the desired properties an algorithm should satisfy under various scenarios.

:p How is correctness defined in distributed algorithms?
??x
Correctness in distributed algorithms is defined by specifying the desired properties that must be satisfied. For instance, a sorting algorithm might need to ensure that for any two distinct elements of the output list, the element further left is smaller than the one further right.
x??

---
#### Safety and Liveness Properties
Background context: Safety properties ensure nothing bad happens, while liveness properties guarantee something good eventually occurs.

:p What are safety and liveness properties in distributed algorithms?
??x
Safety properties ensure that no bad things happen (e.g., uniqueness and monotonic sequence). Liveness properties guarantee that something good will eventually occur (e.g., availability), often involving the word "eventually."
x??

---
---


#### Safety Properties
Safety properties are those that, once violated, cannot be undone. They guarantee correctness at all times and can pinpoint a specific time when they were broken.

:p Define safety properties in the context of distributed systems.
??x
Safety properties in distributed systems ensure that certain conditions always hold true under any circumstances. If a safety property is violated, it means an incorrect state has occurred, such as duplicate operations or data inconsistencies. Once this violation happens, it cannot be corrected because its effects are permanent.

For example, if the uniqueness property of a fencing token was violated and a duplicate token was issued, the system would have to handle the consequences, possibly by rolling back transactions or marking certain states as invalid.
x??

---

#### Liveness Properties
Liveness properties ensure that the system eventually behaves correctly over time. They allow for temporary violations but require eventual compliance.

:p Describe liveness properties in distributed systems.
??x
In distributed systems, liveness properties guarantee that the system will continue to make progress and eventually satisfy its requirements, even if it has violated them temporarily. Unlike safety properties, which are concerned with correctness at all times, liveness focuses on ensuring that operations or conditions are met over a period.

For example, in a distributed database, sending a write request might not immediately receive an acknowledgment due to network issues; however, the system should eventually acknowledge receipt of the request once the network recovers.
x??

---

#### System Models and Real-World Mismatch
System models used for analyzing algorithms are idealized abstractions. In practice, real-world conditions often deviate from these models.

:p Explain how system models can differ from real-world scenarios in distributed systems.
??x
System models in distributed computing are simplified representations designed to analyze properties like safety and liveness under controlled assumptions. However, implementing these algorithms in a real-world environment introduces complexities that the models don't account for. For instance, stable storage may fail during crashes, nodes might have firmware bugs, or network interruptions could be more frequent and prolonged than assumed.

For example, consider an algorithm designed to operate correctly even if half of the nodes crash (crash-recovery model). In reality, data on disk might get corrupted due to hardware failure, wiping out previously stored information.
x??

---

#### Quorum Algorithms
Quorum algorithms rely on nodes agreeing on a state by checking with a majority. Issues can arise when nodes fail to remember or misremember their states.

:p What issues can arise in quorum-based distributed systems?
??x
In quorum-based distributed systems, the reliability of data storage and node memory is critical. If a node experiences amnesia and fails to recall previously stored data, it can disrupt the quorum condition necessary for correct operation. This scenario violates safety properties as incorrect states can persist.

For example, imagine a distributed file system where nodes must agree on which version of a file to serve (quorum). If one node loses track of its previous state due to memory failure and incorrectly claims to have stored an older version of the file, it disrupts the quorum and corrupts the consistency of the system.
x??

---

