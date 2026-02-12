# High-Quality Flashcards: Designing-data-intensive-applications_-the-big-ideas-behind-reliable-scalable_processed (Part 21)


**Starting Chapter:** Unreliable Networks

---


#### Fault Handling in Distributed Systems
Fault handling is crucial for ensuring reliability, especially in distributed systems where components can fail unpredictably. The software must be designed to handle various faults gracefully and provide expected behavior under unexpected conditions.

The objective is not just memorization but understanding how to design robust fault-handling mechanisms that account for a wide range of potential failures.
:p What should the operator expect regarding fault handling in their distributed system?
??x
In distributed systems, it is essential to anticipate all possible faults and design the software to handle them gracefully. This includes understanding expected behaviors during faults such as network outages, node failures, or data loss.

For example, consider a scenario where a request might get lost:
```java
public class FaultHandler {
    public void processRequest(Request req) {
        try {
            // Attempt to send the request
            Network.send(req);
        } catch (Exception e) {
            // Handle the failure gracefully
            log.error("Failed to send request: " + e.getMessage());
            handleFailure(req);
        }
    }

    private void handleFailure(Request req) {
        // Implement logic to retry, failover, or notify stakeholders
    }
}
```
x??

---

#### Building Reliable Systems from Unreliable Components
The idea is that a system can be built using unreliable components but still achieve overall reliability through layered protocols and techniques. Error-correcting codes and transport protocols like TCP are examples where higher-level systems provide more reliable services over less reliable underlying networks.

The objective here is to understand how combining multiple layers of protocols can lead to more reliable operation despite the inherent unreliability at lower levels.
:p Can you give an example of building a more reliable system from unreliable components?
??x
Certainly! Error-correcting codes (ECC) and TCP are good examples:

1. **Error-Correcting Codes**: These allow data transmission over channels that occasionally corrupt bits, such as in wireless networks.

2. **TCP Over IP**: TCP runs on top of an unreliable network layer like IP. While IP may drop packets, TCP ensures retransmission of lost packets and handles reordering and duplication.

Here’s a simplified pseudocode for handling packet loss using TCP over IP:
```java
public class ReliableTransport {
    public void sendPacket(Packet p) {
        try {
            // Send the packet through unreliable network (IP)
            Network.send(p);
        } catch (TimeoutException e) {
            // Retry sending if timeout occurs due to packet loss
            retrySend(p);
        }
    }

    private void retrySend(Packet p) {
        // Implement exponential backoff and retransmission logic
        int retries = 0;
        while (!Network.send(p)) {
            if (retries++ >= MAX_RETRIES) break;
            Thread.sleep(retryInterval * Math.pow(2, retries));
        }
    }
}
```
x??

---

#### Unreliable Networks in Distributed Systems
Unreliable networks pose significant challenges for distributed systems because they can lead to various failures like packet loss, network partitioning, node crashes, and delayed responses. The shared-nothing architecture is a common approach that leverages these unreliable networks effectively.

The objective here is to understand the impact of network unreliability on distributed system design.
:p How does shared-nothing architecture address network unreliability in distributed systems?
??x
Shared-nothing architecture mitigates network unreliability by ensuring that each node has its own memory and disk, with no direct access between nodes except through a network. This approach can achieve high reliability through redundancy across multiple geographically distributed data centers.

For example, consider a scenario where two nodes need to communicate:
```java
public class SharedNothingSystem {
    public void sendMessage(Node sender, Node receiver, Message msg) {
        try {
            // Send message via unreliable network (Ethernet/IP)
            Network.sendMessage(sender, receiver, msg);
        } catch (IOException e) {
            // Handle potential failure like network outage
            log.error("Failed to send message: " + e.getMessage());
            handleNetworkFailure();
        }
    }

    private void handleNetworkFailure() {
        // Implement retry logic or failover strategies
    }
}
```
x??

---

#### Network Partitions and Failures in Distributed Systems
Network partitions can lead to partial failures where parts of the system are isolated from others. Understanding these scenarios is crucial for designing resilient systems.

The objective here is to understand how network partitions affect distributed systems and how they should be handled.
:p What happens when a network partition occurs in a distributed system?
??x
In a network partition, different parts of the system become isolated from each other. This can lead to various issues such as inconsistent state across nodes, conflicting operations, or split brain scenarios.

To handle this:
```java
public class NetworkPartitionHandler {
    public void handlePartition(Node node1, Node node2) {
        if (isNetworkDown(node1, node2)) {
            // Implement a strategy like quorum-based decision making
            boolean isQuorumNode1 = getQuorumForNode(node1);
            boolean isQuorumNode2 = getQuorumForNode(node2);

            if (isQuorumNode1) {
                // Node 1 should proceed with operations
            } else if (isQuorumNode2) {
                // Node 2 should proceed with operations
            } else {
                // Handle the scenario where both nodes are not in quorum
                log.error("Both nodes failed to reach a quorum.");
            }
        }
    }

    private boolean isNetworkDown(Node node1, Node node2) {
        // Check if network between node1 and node2 is down
        return Network.isPartitioned(node1, node2);
    }

    private boolean getQuorumForNode(Node node) {
        // Determine the quorum status of a given node
        return QuorumSystem.checkQuorumStatus(node);
    }
}
```
x??

---

#### The End-to-End Argument
The end-to-end argument suggests that the properties of an application should be determined by its endpoints rather than intermediate nodes. This concept helps in designing systems where faults are managed at higher levels.

The objective here is to understand how the end-to-end principle can mitigate issues caused by unreliable networks.
:p How does the end-to-end argument help in managing network unreliability?
??x
The end-to-end argument posits that the overall reliability and behavior of an application should be determined by its endpoints rather than intermediate nodes. This approach helps manage network unreliability because faults are addressed at higher levels, making lower-level issues less critical.

For example:
```java
public class EndToEndReliability {
    public void sendRequest(Request req) {
        try {
            // Send request through the network (unreliable)
            Network.send(req);
        } catch (IOException e) {
            // Handle failure at higher levels
            log.error("Failed to send request: " + e.getMessage());
            handleApplicationFailure(req);
        }
    }

    private void handleApplicationFailure(Request req) {
        // Implement application-level recovery, such as retries or fallbacks
        if (shouldRetry(req)) {
            retryRequest(req);
        } else {
            failRequest(req);
        }
    }

    private boolean shouldRetry(Request req) {
        // Logic to decide whether to retry the request based on policy
        return true; // Simplified example
    }

    private void retryRequest(Request req) {
        // Implement retry logic
        sendRequest(req);
    }

    private void failRequest(Request req) {
        // Handle failure, e.g., by logging or notifying stakeholders
    }
}
```
x??

---


#### Network Reliability Challenges
Background context explaining the concept. Network reliability is a critical aspect of computer networks, where packets may be lost or delayed, making it impossible for the sender to determine if the message was delivered without receiving confirmation. The usual approach involves setting timeouts to manage this uncertainty, but even with timeouts, the network's state remains unknown.
:p What are the primary challenges in ensuring reliable communication over a network?
??x
The main challenges include packet loss and delay, making it impossible for the sender to determine if the message was delivered without receiving a response. Timeouts are used, but they don't provide definitive information about whether the request was successfully received or not.
x??

---
#### Network Faults in Practice
This section highlights the common occurrence of network faults even in controlled environments like datacenters and cloud services. Studies have shown that network issues can be frequent and unpredictable, impacting various components such as switches and load balancers. Human error is a significant factor contributing to outages.
:p What evidence supports the prevalence of network faults?
??x
Studies indicate that network faults are surprisingly common in even controlled environments like datacenters and cloud services. For example, one study found about 12 network faults per month in a medium-sized datacenter, with half disconnecting single machines and the other half an entire rack. Public cloud services also experience frequent transient glitches.
x??

---
#### Network Partitions
A network partition occurs when part of the network is cut off from the rest due to a fault. This can lead to issues such as deadlocks or even data loss if error handling mechanisms are not properly defined and tested. The term "network fault" is used in this context to avoid confusion with storage system partitions.
:p What is a network partition?
??x
A network partition occurs when part of the network becomes isolated from the rest due to a fault, such as a switch misconfiguration or physical cable damage. This can lead to situations where nodes cannot communicate with each other, potentially causing deadlocks or data loss if not properly managed.
x??

---
#### Handling Network Faults
The text emphasizes that even in environments with few network faults, software must be designed to handle these issues robustly. Unreliable communication is a reality, and error handling mechanisms are crucial to prevent serious consequences such as cluster deadlock or data corruption.
:p Why is it important for software to handle network faults?
??x
It's essential for software to handle network faults because even in environments with few faults, communication over networks can still fail. Failing to define and test error handling can lead to severe issues like permanent deadlocks or data loss when the network recovers.
x??

---
#### Example of Network Faults
The text mentions various examples of network faults, including misconfigurations, hardware failures, and even natural disasters affecting undersea cables. These instances highlight the unpredictability of network reliability.
:p Provide an example of a network fault mentioned in the text.
??x
An example of a network fault is when a problem during a software upgrade for a switch triggers a network topology reconfiguration, causing delays in network packets for over a minute. Another example includes undersea cable damage by sharks.
x??

---
#### Network Faults and Redundancy
The text notes that adding redundant networking equipment does not significantly reduce faults because it doesn't guard against human error such as misconfigurations of switches. This underscores the importance of comprehensive fault management strategies.
:p How do network failures impact redundancy?
??x
Network failures can still occur even with redundant networking gear, primarily due to human errors like misconfigured switches. Adding redundancy doesn't significantly reduce faults since it fails to address these root causes, highlighting the need for robust error handling mechanisms.
x??

---
#### Conclusion: Network Faults and Their Impact
The text concludes by emphasizing that network faults are common in various environments and software must be designed with fault tolerance in mind to ensure reliable operation. Proper testing of error-handling strategies is crucial to prevent severe consequences.
:p What key takeaway should developers take from this section?
??x
Developers should understand that network faults can occur frequently, even in controlled environments like datacenters and cloud services. They must design software to handle these issues robustly through proper error handling and fault tolerance mechanisms to avoid severe consequences such as deadlocks or data loss.
x??

---


#### Detecting Faulty Nodes
Detecting faulty nodes is crucial for maintaining system reliability, especially in distributed systems. Network unreliability can make it challenging to determine whether a node is genuinely down or merely experiencing temporary issues.

:p How can load balancers detect and handle dead nodes?
??x
Load balancers often use health checks to detect when a node has failed. If the load balancer cannot establish that a node is processing requests correctly (e.g., by failing to receive expected responses), it will stop sending traffic to that node, taking it out of rotation.

For example:
- If no process is listening on the destination port, the operating system sends a RST or FIN packet.
- A script can notify other nodes about a crash so they can take over quickly without waiting for a timeout.
```java
public class HealthChecker {
    public boolean checkNodeHealth(String nodeAddress) {
        // Code to attempt connection and send requests to the node
        try (Socket socket = new Socket(nodeAddress, destinationPort)) {
            // Send a request and wait for a response
            OutputStream outputStream = socket.getOutputStream();
            PrintWriter writer = new PrintWriter(outputStream);
            writer.write("Ping");
            writer.flush();

            BufferedReader reader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            String response = reader.readLine();

            return "Pong".equals(response); // Example check
        } catch (IOException e) {
            // Node is not responding, treat as dead
            return false;
        }
    }
}
```
x??

---

#### Promoting a New Leader in Distributed Databases
In distributed databases with single-leader replication, if the current leader fails, another node must be promoted to take its place. This requires detecting the failure of the leader and then selecting an appropriate follower.

:p How can a new leader be elected when the old one fails?
??x
When the old leader fails, a mechanism should be in place for promoting one of the followers to become the new leader. This involves monitoring the status of all nodes and triggering a promotion if the leader is determined to be unresponsive or unavailable.

For example:
- A follower node can monitor the health of the leader and initiate a leadership election when it detects that the leader is down.
```java
public class FollowerNode {
    private LeaderManager leaderManager;

    public void monitorLeaderHealth() {
        while (true) {
            if (!leaderManager.isLeaderAlive()) { // Check with leader manager
                promoteNewLeader(); // Code to initiate leadership election
                break;
            }
            try {
                Thread.sleep(1000); // Wait before checking again
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
    }

    private void promoteNewLeader() {
        // Code to elect a new leader among followers
        LeaderManager.chooseNewLeader(this);
    }
}
```
x??

---

#### Network Faults and Their Detection
Handling network faults can be challenging due to the unreliable nature of network communications. Detecting faults is essential, but reliable detection methods are limited.

:p How does a load balancer typically handle a node that has failed?
??x
A load balancer handles a failing node by stopping the distribution of requests to it. This is often done through health checks where the load balancer verifies if the node can process incoming requests correctly. If a node fails these checks, it is taken out of rotation.

For example:
- Health checks involve trying to establish communication with the node and ensuring responses are received.
```java
public class LoadBalancer {
    private List<Node> nodes;

    public void updateNodeStatus(Node node) {
        if (!node.isHealthy()) { // Node health check logic
            removeNodeFromRotation(node);
        }
    }

    private void removeNodeFromRotation(Node node) {
        synchronized (nodes) {
            nodes.remove(node); // Remove from active list
        }
    }
}
```
x??

---

#### Using Scripts to Notify Other Nodes of Crashes
Scripts can be used to notify other nodes in the system about a crash, allowing them to take over quickly and avoid waiting for timeouts.

:p How does HBase handle node crashes?
??x
HBase uses scripts to notify other nodes about a crash so that another node can take over quickly. This avoids waiting for a timeout to expire before taking action on the failed node.

For example:
- A script runs when a process crashes and sends a notification to other nodes.
```java
public class HBaseCrashNotification {
    private List<Node> nodes;

    public void notifyNodesOfCrash(Node crashedNode) {
        for (Node node : nodes) {
            if (!node.equals(crashedNode)) { // Avoid sending notification to self
                sendNotification(node); // Send a message to the node
            }
        }
    }

    private void sendNotification(Node recipientNode) {
        // Code to send notification, e.g., via a messaging system or script
    }
}
```
x??

---

#### Handling Unreliable Network Feedback
Network unreliability can make it difficult to determine if a node is truly down. Some methods provide feedback on connectivity but are not always reliable.

:p What methods can be used to detect link failures in a datacenter?
??x
Detecting link failures within a datacenter can be done using the management interfaces of network switches, which allow querying hardware-level link status. This method is useful when you have access to these interfaces and they are functioning correctly.

For example:
- Querying switch interfaces for link status.
```java
public class SwitchLinkMonitor {
    private NetworkSwitchManager switchManager;

    public void checkLinkStatus(String ipAddress) throws Exception {
        boolean isConnected = switchManager.checkLink(ipAddress);
        if (!isConnected) {
            // Handle the case where the node is powered down or unreachable
        }
    }
}
```
x??

---


#### Timeout Considerations

Background context: When designing distributed systems, timeouts are a critical mechanism for detecting faults. However, choosing an appropriate timeout value is challenging due to potential false positives and negatives.

:p How does the length of a timeout impact system performance?
??x
A long timeout increases wait times before declaring a node dead, which can frustrate users or cause error messages. Conversely, shorter timeouts reduce the risk of incorrectly marking nodes as dead but may misidentify temporary slowdowns as failures.
```java
public class TimeoutExample {
    int shortTimeout = 10; // seconds
    int longTimeout = 30; // seconds

    public void checkNodeStatus(int timeout) {
        if (timeout == shortTimeout) {
            System.out.println("Checking with a shorter timeout to avoid false negatives.");
        } else if (timeout == longTimeout) {
            System.out.println("Checking with a longer timeout to reduce user frustration.");
        }
    }
}
```
x??

---

#### Unreliable Networks

Background context: In systems where packet delays are unpredictable, setting timeouts becomes more complex. The goal is to ensure that failures are detected quickly while minimizing the risk of false positives.

:p What guarantee would make setting a reliable timeout feasible in networks?
??x
If packets were guaranteed to be delivered within some time $d $ or dropped, and non-failed nodes always handled requests within time$r $, then you could set a reasonable timeout as$2d + r$. This ensures that if no response is received within this period, the network or node failure can be detected.
```java
public class ReliableNetworkExample {
    int deliveryTime = 5; // seconds (guaranteed max delay for packets)
    int requestHandlingTime = 3; // seconds (max time non-failed nodes handle requests)

    public void setTimeout() {
        int timeout = 2 * deliveryTime + requestHandlingTime;
        System.out.println("Setting a reliable timeout of " + timeout + " seconds.");
    }
}
```
x??

---

#### Asynchronous Networks and Unbounded Delays

Background context: Most modern networks and server implementations do not provide guarantees on packet delivery times or response handling, making it difficult to set appropriate timeouts.

:p What are the implications of unbounded delays in asynchronous networks for failure detection?
??x
In asynchronous networks, there is no upper limit on how long packets may take to arrive. This variability complicates setting an effective timeout because a short timeout risks false positives (incorrectly declaring nodes dead), while a longer timeout can lead to prolonged user wait times or error messages.
```java
public class UnboundedDelaysExample {
    // Simulating unbounded delays in network communication
    public boolean checkNodeStatus(int[] delay) {
        for (int d : delay) {
            if (d > 30) { // Assuming a high delay threshold
                System.out.println("Potential timeout triggered by delay: " + d);
                return false; // Node is considered dead due to unbounded delays
            }
        }
        return true; // No timeouts, node is presumed alive
    }
}
```
x??

---

#### Network Congestion and Queueing

Background context: Packet delays in networks are often due to queueing at network switches. This can lead to congestion where packets wait for a slot before being transmitted.

:p How does network congestion affect packet delivery?
??x
Network congestion occurs when several nodes simultaneously try to send data to the same destination, causing the switch to queue up these packets. As illustrated in Figure 8-2, on busy links, packets may have to wait until they can be fed into the destination link one by one. If the queue fills up, packets are dropped and need to be resent.
```java
public class CongestionExample {
    public void simulateNetworkQueue(int[] packetSizes) {
        int maxQueueSize = 10; // Example maximum queue size
        for (int size : packetSizes) {
            if (size > maxQueueSize) {
                System.out.println("Packet dropped due to congestion.");
            } else {
                System.out.println("Packet queued and will be sent soon.");
            }
        }
    }
}
```
x??

---


#### Packet Queuing at Destination Machine
When a packet reaches the destination machine, if all CPU cores are currently busy, the incoming request is queued by the operating system. The length of time before the application can handle it depends on the load on the machine.

:p What happens when packets arrive while the CPU is busy?
??x
Packets are queued by the operating system until the application becomes available to process them. The queuing delay can vary depending on how long the CPUs remain busy.
x??

---
#### Virtual Machine Queuing in Virtualized Environments
In virtualized environments, a running operating system may be paused for tens of milliseconds while another virtual machine uses a CPU core. This pause prevents the VM from consuming network data during this time.

:p How does virtualization affect network traffic handling?
??x
Virtualization can cause delays as the operating system can be paused to allocate resources to other VMs, leading to buffering by the virtual machine monitor (VMM). This increases variability in network delays.
x??

---
#### TCP Flow Control and Congestion Avoidance
TCP performs flow control (congestion avoidance or backpressure), where a node limits its rate of sending data to avoid overloading network links or receiving nodes. This can introduce additional queueing at the sender before packets even enter the network.

:p What is flow control in TCP?
??x
Flow control in TCP ensures that the sender does not overwhelm the receiver by limiting the rate of data transmission. It introduces an initial queueing delay as the sender waits for acknowledgment signals.
x??

---
#### Switch Queue Filling with Network Traffic
When multiple machines send network traffic to the same destination, a switch may fill up its queue. For example, ports 1, 2, and 4 are trying to send packets to port 3 simultaneously.

:p How can switch queues affect network performance?
??x
Switch queues can fill up when multiple sources try to transmit data to the same destination at once. This causes delays as packets wait in line before being forwarded.
x??

---
#### TCP Packet Loss and Retransmission
TCP considers a packet lost if it is not acknowledged within a timeout period, which is based on observed round-trip times. Lost packets are automatically retransmitted, causing additional delay.

:p How does TCP handle packet loss?
??x
TCP handles packet loss by assuming that unacknowledged packets have been lost and will retransmit them after the timeout expires. This process adds to overall network latency.
x??

---
#### UDP vs. TCP for Latency-Sensitive Applications
UDP is used in applications like videoconferencing and VoIP because it avoids flow control and packet retransmission, reducing variability in delays but compromising reliability.

:p What are the trade-offs between TCP and UDP?
??x
TCP provides reliable data transmission with fewer delays due to its flow control mechanisms. In contrast, UDP offers lower latency by avoiding these controls but risks lost packets. Applications like VoIP prioritize low delay over reliability.
x??

---
#### Variability of Network Delays in Distributed Systems
All the factors mentioned—packet queuing, virtualization scheduling, TCP flow control, switch queueing, and packet loss with retransmission—contribute to variable network delays, especially near system capacity.

:p What causes variability in network delays?
??x
Variability in network delays is caused by multiple factors including CPU busy periods, virtual machine scheduling, TCP flow control, switch queuing, and packet loss. These factors are particularly pronounced when systems are close to their maximum capacity.
x??

---


#### Network Delays and Queues
Network resources can be shared among many customers, leading to variable delays. High utilization can cause queues to build up quickly. In public clouds and multi-tenant datacenters, network links and switches are shared.

:p How do shared resources impact network delays in distributed systems?
??x
In distributed systems, especially those running on public clouds or in multi-tenant environments like a datacenter, network resources such as bandwidth and buffers are shared among multiple users. When one user heavily utilizes these resources (a "noisy neighbor"), it can lead to increased network congestion, causing delays for other users sharing the same links. This variability makes it challenging to predict and manage network performance accurately.

This is particularly relevant in systems like MapReduce, where heavy workloads can saturate network links, leading to unpredictable delays. To handle this, you might need to experimentally measure round-trip times over extended periods across many machines to determine the expected variability of delays.
x??

---

#### Noisy Neighbors and Timeout Strategies
Network delays are highly variable due to "noisy neighbors" who use a lot of shared resources. Traditional timeout strategies often fail in such environments.

:p How do noisy neighbors affect distributed systems?
??x
Noisy neighbors refer to other users or processes that share the same network resources as your application. If these neighbors suddenly start using a lot of bandwidth, they can significantly increase network congestion and delay your application's communications. This variability makes it difficult to set fixed timeouts because the delays can be unpredictable.

To handle this, you might need to implement more sophisticated timeout strategies such as measuring the distribution of round-trip times over an extended period and adjusting timeouts based on observed variability. For instance, using a Phi Accrual failure detector in systems like Akka or Cassandra helps automatically adjust timeouts according to the observed response time distribution.
x??

---

#### Synchronous vs Asynchronous Networks
Datacenter networks use packet-switched protocols (like TCP) which can suffer from unbounded delays due to queueing. Traditional fixed-line telephone networks, however, use circuit switching for reliable and predictable transmission.

:p What is the difference between a circuit in a telephone network and a TCP connection?
??x
A circuit in a telephone network and a TCP connection serve different purposes:

- **Circuit**: In a telephone network, a circuit reserves a fixed amount of bandwidth along the entire path between two callers. This reservation ensures constant latency and no queueing, making it reliable for audio or video calls.
  
- **TCP Connection**: In contrast, TCP is packet-switched and dynamically allocates bandwidth as needed. It does not reserve a specific amount of bandwidth in advance but tries to transfer data as quickly as possible using whatever network resources are available at the moment.

This difference means that while circuits provide guaranteed low latency and no queueing, TCP connections can be more flexible but come with variable delays.
x??

---

#### Circuit Switched Networks
Circuit-switched networks like ISDN allocate bandwidth for specific durations. This is in contrast to packet-switched protocols used by datacenter networks and the internet.

:p What does an ISDN network do differently from a datacenter network?
??x
An ISDN (Integrated Services Digital Network) network operates on a circuit-switched model, where it allocates a fixed amount of bandwidth for the duration of a call. For example:

- **ISDN Allocation**: In ISDN, each voice channel uses 16 bits per frame, and the network guarantees that each side can send exactly 16 bits every 250 microseconds.

- **Datacenter Networks**: Datacenter networks use packet-switched protocols like TCP over Ethernet/IPv4. These protocols do not allocate fixed bandwidth; instead, they share available bandwidth dynamically among all users.

The key differences are:
- **Guaranteed Bandwidth in ISDN**: Fixed and guaranteed for the entire duration of the call.
- **Dynamic Allocation in Datacenter Networks**: Flexible but potentially variable based on current network conditions.

This makes datacenter networks more flexible but less predictable compared to circuit-switched networks.
x??

---

#### Latency and Resource Utilization
Latency in networks is a result of dynamic resource partitioning. Static allocation (like in ISDN) guarantees fixed latency, while dynamic allocation (like in TCP/IP) maximizes utilization but comes with variable delays.

:p How does dynamic vs static allocation affect network performance?
??x
Dynamic resource allocation (used by protocols like TCP over Ethernet/IPv4):

- **Maximizes Utilization**: Uses available bandwidth efficiently.
- **Variable Delays**: Queues can build up, leading to unpredictable latency.

Static resource allocation (like in ISDN):

- **Guaranteed Latency**: Fixed and predictable delays because the bandwidth is reserved for specific calls.
- **Lower Utilization**: If not fully utilized, some capacity is wasted.

The choice between these models depends on whether you prioritize low-latency guarantees or efficient use of resources. Dynamic allocation optimizes resource utilization but sacrifices predictability, while static allocation ensures consistent performance at the cost of lower efficiency.
x??

---

