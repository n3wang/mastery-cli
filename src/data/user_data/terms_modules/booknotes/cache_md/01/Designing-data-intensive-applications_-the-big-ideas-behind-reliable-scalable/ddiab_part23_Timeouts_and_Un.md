# High-Quality Flashcards: Designing-data-intensive-applications_-the-big-ideas-behind-reliable-scalable_processed (Part 23)


**Starting Chapter:** Timeouts and Unbounded Delays

---


#### Network Faults and Reliability Challenges
Network faults can be surprisingly common, even in controlled environments like data centers. Studies have shown that network issues are frequent, with medium-sized data centers experiencing about 12 network faults per month on average. Components such as switches and load balancers fail at high rates. Redundant networking gear does not fully mitigate these failures due to human errors.

:p What is the frequency of network faults in a medium-sized data center?
??x
On average, a medium-sized data center experiences about 12 network faults per month.
x??

---


#### Network Partitions and Faults
A network partition occurs when one part of the network is cut off from the rest due to a fault. This can lead to deadlocks or data deletion if not handled properly.

:p What is a network partition?
??x
A network partition happens when part of the network is isolated from the rest, often due to a fault.
x??

---


#### Handling Network Faults in Software
Software must be designed to handle network faults because failures can occur. This includes defining and testing error handling mechanisms to prevent deadlocks or data loss.

:p Why do software systems need to handle network faults?
??x
Software needs to handle network faults to ensure reliable operation, as network failures can lead to serious issues like deadlocks or data deletion.
x??

---


#### Detecting Faulty Nodes

Automatic detection of faulty nodes is crucial in distributed systems. This involves mechanisms like load balancers stopping requests from dead nodes and leaders failing over to followers.

:p How can a load balancer detect that a node is dead?
??x
A load balancer can detect a dead node by ensuring the process on the node is listening on the correct port. If not, it considers the node unresponsive.

```java
public boolean checkNodeAlive(String ipAddress, int port) {
    try (Socket socket = new Socket(ipAddress, port)) {
        // If connection succeeds, the node is likely alive.
        return true;
    } catch (IOException e) {
        // Node not responding or process crashed.
        return false;
    }
}
```
x??

---


#### Detecting Faults in Distributed Systems

Fault detection can be challenging due to network unreliability. Specific cases include unreachable nodes, failed processes, and hardware-level failures.

:p How does the operating system help detect a node that has crashed?
??x
The operating system helps by closing or refusing TCP connections if no process is listening on the destination port after receiving a request.

```java
public boolean checkProcessAlive(String ipAddress, int port) {
    try (Socket socket = new Socket(ipAddress, port)) {
        // If connection fails with RST or FIN, the node is likely dead.
        return false;
    } catch (IOException e) {
        // Node might still be running but handling request.
        return true;
    }
}
```
x??

---


#### Handling Node Outages

In distributed databases, promoting a follower to leader status after the current leader fails is essential for maintaining system availability.

:p What happens when a leader node in a distributed database fails?
??x
When a leader node fails, one of its followers must be promoted to become the new leader. This ensures continuous operation and data integrity.

```java
public void promoteFollowerToLeader(Follower follower) {
    // Logic for promoting follower.
    System.out.println(follower.getName() + " is now the new leader.");
}
```
x??

---


#### Timeout and Unbounded Delays
Background context: When using timeouts to detect faults, there's a trade-off between the risk of declaring a node dead too early (prematurely) versus waiting too long before detecting a fault. A short timeout can quickly identify issues but may incorrectly declare nodes as dead due to temporary slowdowns or load spikes. Conversely, longer timeouts reduce the risk of false positives but increase wait times and potential user frustration.

A formula is not directly applicable here, but we can discuss the impact on system performance:
- Long timeouts mean users might experience delays.
- Short timeouts decrease detection time but can cause unnecessary node failures.

:p What are the trade-offs between using short and long timeouts in detecting faults?
??x
Short timeouts reduce the risk of false negatives by quickly identifying dead nodes, which is crucial for maintaining system reliability. However, they carry a higher risk of declaring nodes dead due to temporary issues like load spikes or network congestion, potentially causing double actions (e.g., sending emails twice) and increasing the overall load on the system.

On the other hand, long timeouts ensure that only genuine failures are detected but at the cost of increased wait times for users and potential error messages. This can be particularly problematic in high-load systems where nodes might just be temporarily slow rather than dead.
x??

---


#### Unreliable Networks
Background context: In many real-world systems, networks do not provide guarantees on maximum delays or server response times. Asynchronous networks may experience unbounded delays due to network congestion and queueing.

Formula: $\text{Timeout} = 2d + r $-$ d$: Maximum delay for packets.
- $r$: Time taken by a non-failed node to handle a request.

However, in practice, both these guarantees are rarely available. Therefore, the system must account for potential spikes in round-trip times which can throw off the timing calculations.

:p How would you determine an appropriate timeout value in systems with unreliable networks?
??x
Given that most real-world networks do not provide guaranteed maximum delays or response times, it is challenging to set a fixed timeout. Instead, you need to consider the worst-case scenario where round-trip times can spike due to network congestion and server load.

A practical approach would be to monitor historical data on average delays and add a buffer time that accounts for potential spikes. For example:
```java
public int calculateTimeout(int avgDelay, int bufferTime) {
    return 2 * avgDelay + bufferTime;
}
```
This method dynamically adjusts the timeout based on observed network behavior, ensuring it remains robust against transient issues without being overly conservative.

x??

---


#### Network Congestion and Queueing
Background context: Network congestion occurs when multiple nodes try to send packets to the same destination simultaneously. The switch must queue these packets before sending them one by one. If the queue fills up, packets are dropped and need to be resent, even if the network is functioning fine.

:p How does network congestion affect packet delivery?
??x
Network congestion affects packet delivery by causing delays and potential packet loss. When a node sends multiple packets to a congested switch or link, the switch queues these packets. If the incoming data rate exceeds the outgoing capacity of the switch, the queue can fill up, leading to packet drops.

To handle this in pseudocode:
```java
public class NetworkSwitch {
    private Queue<Packet> queue = new LinkedList<>();

    public void send(Packet packet) {
        if (queue.size() >= MAX_QUEUE_SIZE) {
            // Drop packet and log error
            System.out.println("Queue full, dropping packet: " + packet);
            return;
        }
        queue.add(packet);
        processQueue();
    }

    private void processQueue() {
        while (!queue.isEmpty()) {
            Packet packet = queue.remove();
            sendPacketToDestination(packet);
        }
    }

    private void sendPacketToDestination(Packet packet) {
        // Simulate sending packet to destination
        System.out.println("Sending packet: " + packet);
    }
}
```
In this example, the switch enforces a maximum queue size and drops packets when full. The `processQueue` method ensures that packets are sent in order.

x??

---

---


#### Switch Queueing Delays in Networks
When multiple machines send traffic to the same destination, switch queues can fill up. This occurs because all ports trying to send packets to the same destination compete for limited bandwidth.

:p How does network switching contribute to delays?
??x
Switches manage data flow between devices and can create queuing delays when there is a high volume of traffic destined for the same port. If multiple machines attempt to send packets simultaneously towards the same switch port, they may all be queued until the switch has capacity to handle their transmission.

```java
// Pseudocode for switch queue management
public void sendPacket(SwitchPort source, SwitchPort destination) {
    if (destinationQueueFull(destination)) { // Check if the destination queue is full
        addToSwitchQueue(source, destination); // Add packet to the switch's waiting queue
        waitUntilTransmitPossible(); // Wait until the destination port can transmit
    } else {
        transmitPacketImmediately(source, destination); // Send packet directly without queuing
    }
}
```
x??

---


#### TCP Retransmission Mechanism
TCP considers a packet lost if it is not acknowledged within a timeout period. Lost packets are automatically retransmitted, adding to the variability of network delays even when the application does not see these delays.

:p How does TCP handle packet loss?
??x
TCP uses a retransmission mechanism where it waits for an acknowledgment before considering a packet lost. If a packet is not acknowledged within the configured timeout period (calculated based on observed round-trip times), TCP assumes the packet was lost and resends it. This process introduces delays as the application must wait for timeouts to expire.

```java
// Pseudocode for TCP retransmission logic
public void sendPacket(Packet p) {
    transmit(p); // Send packet over the network
    if (!ackReceived(p)) { // Check if acknowledgment was received
        timeoutStart(p); // Start a timer for the packet's expected arrival
        while (!ackReceived(p) && !timeoutExpired()) { // Wait for acknowledgment or timeout
            doNothing(); // Just wait, no action needed here
        }
        if (timeoutExpired() && !ackReceived(p)) {
            retransmitPacket(p); // Resend the packet if still not acknowledged
        }
    }
}
```
x??

---


#### Network Variability and Noisy Neighbors
Background context: In public clouds and multi-tenant datacenters, shared resources can lead to network delays that are highly variable. This variability is often exacerbated by "noisy neighbors," where other customers use significant amounts of resources, affecting your application's performance.

:p How do noisy neighbors impact network reliability in a multi-tenant environment?
??x
Noisy neighbors can significantly increase network latency and packet loss, as the shared network resources are heavily utilized. This variability can make it challenging to predict and reliably service requests, especially in applications that require low-latency responses.
x??

---


#### Phi Accrual Failure Detector
Background context: The phi accrual failure detector is a mechanism used to detect failures based on observed response times rather than constant timeouts. It helps balance the trade-off between failure detection delay and risk of premature timeouts.

:p What is the phi accrual failure detector, and how does it work?
??x
The Phi Accrual Failure Detector is a technique that measures network round-trip times over an extended period across many machines to determine the expected variability of delays. It then uses this information to automatically adjust timeouts based on observed response time distributions.

Example pseudocode for phi accrual failure detector:
```java
public class PhiAccrualFailureDetector {
    private double phi;
    
    public void update(double responseTime) {
        // Update phi with the new response time
        // phi is a measure of the expected variability in delays
        phi = calculatePhi(responseTime);
    }
    
    public boolean isFailed() {
        // Check if the system has failed based on phi value
        return phi > failureThreshold;
    }
}

// Pseudocode for calculating phi (simplified)
public double calculatePhi(double responseTime) {
    // Implement logic to update phi based on observed response times
    // This involves statistical analysis of past and current response times
    // Example: phi = mean(responseTimes) + stdDev(responseTimes);
}
```
x??

---


#### Synchronous vs. Asynchronous Networks
Background context: Traditional fixed-line telephone networks provide reliable, low-latency connections due to the use of circuit switching. In contrast, datacenter networks and the internet use packet switching, which can suffer from unbounded delays and queueing.

:p What is the key difference between circuit-switched and packet-switched networks in terms of reliability?
??x
The key difference lies in how bandwidth is allocated and used:
- Circuit-switched networks allocate a fixed amount of bandwidth for each call, ensuring constant latency and reliable transmission.
- Packet-switched networks (like Ethernet and IP) dynamically allocate resources among multiple users, leading to variable delays but potentially higher utilization.

Example: In a circuit-switched network like ISDN, once a call is established, it gets guaranteed bandwidth. In contrast, in packet-switched networks, packets compete for bandwidth, which can lead to delays.
x??

---


#### Datacenter Network Utilization and Bursty Traffic
Background context: Datacenter networks are optimized for bursty traffic, dynamically allocating resources among multiple users. Circuit switching would be less efficient for these scenarios due to the need for frequent re-allocation of bandwidth.

:p Why do datacenter networks use packet switching instead of circuit switching?
??x
Datacenter networks use packet switching because it is better suited for handling bursty traffic:
- Packet switching dynamically allocates network resources, maximizing utilization.
- It allows multiple users to share bandwidth efficiently without the overhead of setting up fixed circuits.
- Circuits would be underutilized during periods of low demand and over-subscribed during spikes in demand.

Example: A web server might receive sporadic requests for data. With packet switching, the network can dynamically adjust resource allocation based on current demand.
x??

---


#### Quality of Service (QoS) and Admission Control
Background context: QoS and admission control mechanisms allow for more controlled resource sharing in packet-switched networks. These techniques can emulate circuit switching or provide statistically bounded delays.

:p How do QoS and admission control work to optimize network performance?
??x
Quality of Service (QoS) and admission control manage network resources by prioritizing and scheduling packets, and controlling the rate at which senders push data into the network:
- QoS involves prioritization and scheduling of packets based on application requirements.
- Admission control limits the number of users or the amount of traffic that can be admitted to ensure stable performance.

Example: InfiniBand uses end-to-end flow control to reduce queueing in networks, although it can still suffer from link congestion. By carefully managing QoS and admission control, statistically bounded delay can be achieved.
x??

---


#### Latency Guarantees vs. Utilization
Background context: Static resource partitioning (dedicated hardware) provides latency guarantees but reduces utilization due to fixed allocations. Dynamic resource sharing maximizes utilization but introduces variable delays.

:p What is the trade-off between latency guarantees and network utilization?
??x
The trade-off involves balancing:
- **Latency Guarantees**: Fixed resource allocation ensures low, predictable latency but may underutilize resources.
- **Utilization**: Dynamic resource sharing optimizes bandwidth usage but introduces variability in delay.

Example: In a datacenter, dedicating resources to a specific application provides guaranteed performance but may leave other applications with insufficient resources. Conversely, dynamically allocating resources among multiple applications maximizes overall throughput at the cost of increased latency variance.
x??

---

---


#### Peering Agreements and BGP
Peering agreements between internet service providers (ISPs) are similar to circuit switching mechanisms. ISPs can establish dedicated routes through Border Gateway Protocol (BGP) to exchange traffic directly, allowing for guaranteed bandwidth. However, internet routing operates at a network level rather than individual connections, and the timescale is longer.

At this level, it's possible to buy dedicated bandwidth, but such quality of service (QoS) is not currently enabled in multi-tenant datacenters or public clouds when communicating over the internet.
:p What does BGP enable ISPs to achieve?
??x
BGP enables ISPs to establish direct routes for traffic exchange, ensuring dedicated and potentially faster paths between networks. This can provide more control over network performance and reliability compared to standard IP routing mechanisms.
x??

---


#### Monotonic Clocks for Measuring Time Intervals
Monotonic clocks are used to measure durations such as timeouts or service response times. Unlike time-of-day clocks, monotonic clocks guarantee that they always move forward and do not jump back in time.

:What is the primary difference between a time-of-day clock and a monotonic clock?
??x
The primary difference lies in their use cases and behavior. Time-of-day clocks are used to get the current time of day and can jump backward if corrected by NTP, whereas monotonic clocks guarantee forward progress and are useful for measuring durations without worrying about external synchronization.

```java
// Example: Using System.nanoTime() as a monotonic clock.
public class MonotonicClockExample {
    public long measureTimeInterval() {
        long start = System.nanoTime(); // Start timing
        // Perform some operations...
        long end = System.nanoTime();   // End timing
        return end - start;             // Interval measured in nanoseconds
    }
}
```
x??

---


#### Clock Synchronization and Accuracy
Clock synchronization is crucial for maintaining consistency across distributed systems. However, hardware clocks like quartz oscillators can drift due to temperature changes, leading to inaccuracies.

:What challenges do hardware clocks face that affect their accuracy?
??x
Hardware clocks, such as those using quartz oscillators, can drift due to variations in temperature, causing them to run faster or slower than intended. This drift is a significant challenge for maintaining accurate timekeeping across distributed systems.

```java
// Example: Adjusting the clock rate based on drift detection.
public class ClockAdjustment {
    private final NTPClient ntpClient;
    private double driftFactor = 200e-6; // Google's assumption of 200 ppm

    public void adjustClock() throws Exception {
        long currentTime = System.currentTimeMillis();
        long lastSyncTime = getLastSyncTime(); // Get the last synchronized time
        if (currentTime - lastSyncTime > 30000) { // Check if it's been more than 30 seconds since sync
            double drift = calculateDriftFactor(); // Calculate drift based on temperature etc.
            ntpClient.adjustClockRate(drift * driftFactor);
        }
    }

    private double calculateDriftFactor() {
        // Code to measure and calculate the drift factor
        return driftFactor; // Placeholder for actual calculation logic
    }
}
```
x??

---

