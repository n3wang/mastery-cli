# High-Quality Flashcards: 029---Understanding-Distributed-Systems-2021-Roberto-Vitillo--_processed (Part 1)

**Rating threshold:** >= 8/10

**Starting Chapter:** Coordination

---

**Rating: 8/10**

#### Distributed Systems Overview
Distributed systems are complex as they involve nodes that communicate and coordinate over a network. The failure of any node can render parts of the system unusable, highlighting the need for robust design and architecture.
:p What is a distributed system?
??x
A distributed system consists of multiple autonomous computers that communicate with each other through a network to achieve a common goal or task. Each computer (node) can be a physical machine like a phone or a software process like a browser.
x??

---

#### Why Build Distributed Systems?
Building distributed systems allows for addressing applications that are inherently distributed, require high availability, and can handle large workloads that single nodes cannot manage. Examples include web applications, data replication, and handling massive search requests.
:p What are the main reasons to build distributed systems?
??x
The primary reasons include:
1. **Inherent Distribution**: Applications like the web naturally involve multiple components communicating over a network.
2. **High Availability**: Ensuring that single node failures do not cause system downtime, such as in cloud storage services like Dropbox.
3. **Scalability**: Handling large workloads that cannot fit on a single node, e.g., search requests at Google.
x??

---

#### Communication Challenges
Communication between nodes is fundamental but fraught with challenges. Messages are sent over the network and can face issues like temporary outages or corrupted bits due to faulty switches.
:p How do request and response messages get represented over the wire in distributed systems?
??x
Request and response messages must be properly formatted for transmission over the network. Protocols like HTTP handle this by defining a structure for data exchange, ensuring that both sender and receiver understand how the information is structured.

Example: An HTTP GET request:
```http
GET /api/data HTTP/1.1
Host: www.example.com
```

Response:
```http
HTTP/1.1 200 OK
Content-Type: application/json

{"data": "example"}
```
x??

---

#### Network Abstractions and Stack Understanding
Network abstractions can be useful, but they often leak details that are critical for system design and troubleshooting. Developers must understand how the network stack works to ensure robust communication.
:p What is meant by "abstractions leak" in networking?
??x
Abstractions leak refers to situations where high-level abstractions used in programming (like socket APIs) expose implementation details, affecting the reliability and performance of distributed systems.

Example: A common issue with TCP sockets involves buffering issues:
```java
// Pseudocode showing a potential buffer overflow scenario
BufferedReader reader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
String line;
while ((line = reader.readLine()) != null) {
    // Process each line, potentially causing an overflow if too many lines are read
}
```
x??

---

#### Designing for Resilience and Scalability
Distributed systems must be designed with resilience to handle node failures and scalability to manage large workloads. Techniques like data replication ensure that the loss of a single node does not lead to system failure.
:p How can data be replicated in distributed systems to ensure high availability?
??x
Data replication involves duplicating data across multiple nodes so that if one node fails, others can still provide the necessary service.

Example: Simple data replication strategy:
```java
// Pseudocode for a basic data replication approach
public class DataReplicator {
    private Map<String, String> replicatedData = new HashMap<>();
    
    public void replicate(String key, String value) {
        // Store in multiple nodes
        replicatedData.put(key, value);
        // Optionally, send updates to other nodes via network communication
    }
}
```
x??

---

#### Operation and Maintenance Challenges
Operating distributed systems requires continuous monitoring and maintenance. Issues can arise from various factors such as hardware failures, software bugs, or external attacks.
:p What are some common operations challenges in managing distributed systems?
??x
Common operations challenges include:
1. **Hardware Failures**: Nodes can fail due to physical issues or component malfunctions.
2. **Software Bugs**: Errors in code can lead to unexpected behavior, impacting system performance and reliability.
3. **Security Threats**: External attacks like DDoS can disrupt services.
4. **Load Balancing**: Ensuring even distribution of load across nodes.

Example: Handling node failures:
```java
// Pseudocode for basic failure handling
public class NodeManager {
    private List<Node> nodeList = new ArrayList<>();
    
    public void addNode(Node newNode) {
        // Add a new node to the list, potentially triggering rebalancing or failover logic
        nodeList.add(newNode);
    }
}
```
x??

---

#### The Author’s Experience and Motivation
The author has extensive experience in building large-scale distributed systems at companies like Microsoft and Mozilla. His motivation is to provide a guide for practitioners and system architects who need to understand the fundamentals of designing, building, and operating such systems.
:p What motivated the author to write this book?
??x
The author was motivated by his personal journey of learning about distributed systems and the lack of accessible resources that could bridge the gap between theory and practical application. His goal is to help developers and system architects understand the core challenges in designing robust, scalable, and reliable distributed systems.
x??

---

#### Feedback Mechanism
The book is regularly updated based on feedback from readers. The author encourages users to report errors or suggest improvements to enhance the quality of the content.
:p How can readers provide feedback for this book?
??x
Readers can provide feedback by contacting the author directly via email at `roberto@understandingdistributed.systems` or subscribing to updates through the book’s landing page: [Understanding Distributed Systems](https://understandingdistributed.systems/).
x??

---

**Rating: 8/10**

#### Coordination in Distributed Systems
Background context: The challenge of coordinating nodes in a distributed system to ensure they operate as a single coherent entity despite potential failures is complex. A famous example, the "two generals" problem, illustrates this issue where two generals need to agree on an attack time using messengers who might be captured or delayed.

:p How does the "two generals" problem demonstrate the difficulty of coordination in distributed systems?
??x
The "two generals" problem shows that even with multiple attempts to communicate (using messengers), there is no guaranteed way for both generals to know if their messages were received. This uncertainty arises from potential failures such as message interception by the enemy or delay due to injury or distance.

Code examples are not directly applicable here, but the logic can be explained through pseudocode:
```pseudocode
// Pseudocode for the two generals problem
general1_sends_proposal_time = function(proposal_time) {
    messenger.send(proposal_time);
}

messenger.receive_and_forward(proposal_time) {
    if (message_received) {
        general2.received_message(proposal_time);
    }
}

general2.received_message(proposal_time) {
    // General 2 decides whether to respond or not
}
```
x??

---

#### Fault Tolerance in Distributed Systems
Background context: A system is fault-tolerant if it can continue operating despite one or more component failures. In the "two generals" problem, this means both generals need to ensure their armies will attack at the same time even if some messengers fail.

:p What does a fault-tolerant system mean in the context of distributed systems?
??x
A fault-tolerant system can continue operating without failure when one or more components (like nodes or communication channels) fail. In the "two generals" problem, this means both generals need to be confident that their armies will attack at the same time even if some messengers are captured or delayed.

Code examples are not directly applicable here, but the logic can be explained through pseudocode:
```pseudocode
// Pseudocode for handling faults in a distributed system
if (messenger.failed) {
    resend_message();
} else {
    process_received_message();
}
```
x??

---

#### Scalability in Distributed Systems
Background context: The performance of a distributed system is measured by its throughput and response time. Throughput indicates the number of operations processed per second, while response time measures the total time between a client request and its response. As load increases, it eventually reaches the system's capacity where performance plateaus or worsens.

:p What does scalability in distributed systems refer to?
??x
Scalability refers to how efficiently a distributed system handles increasing loads. It is typically measured by throughput (number of operations per second) and response time (time between client request and response). As load increases, the system's performance either plateaus or worsens until it reaches its capacity.

Code examples are not directly applicable here, but the logic can be explained through pseudocode:
```pseudocode
// Pseudocode for measuring scalability
if (load < capacity) {
    throughput = operations_per_second();
    response_time = calculate_response_time();
} else {
    log("System performance is degrading.");
}
```
x??

---

#### Capacity of Distributed Systems
Background context: The capacity of a distributed system depends on its architecture and physical limitations such as node memory size, clock cycle speed, network bandwidth, and latency. Increasing the capacity can be achieved by upgrading hardware.

:p How does capacity relate to the performance of a distributed system?
??x
Capacity refers to the maximum load a distributed system can handle before its performance plateaus or degrades. It is influenced by factors like node memory size, clock cycle speed, network bandwidth, and latency. Increasing these physical limitations can improve the system's capacity.

Code examples are not directly applicable here, but the logic can be explained through pseudocode:
```pseudocode
// Pseudocode for determining if a system has reached its capacity
if (current_load > max_capacity) {
    log("System is at maximum load.");
} else {
    // Increase capacity by upgrading hardware or optimizing code.
}
```
x??

---

**Rating: 8/10**

#### Scaling Up vs. Scaling Out

Background context: The text discusses two primary strategies for handling increased load on a system—scaling up and scaling out. Scaling up involves upgrading the existing hardware, while scaling out means adding more machines to handle the load.

:p What is scaling up in the context of system architecture?

??x
Scaling up refers to enhancing the performance or capacity of a single machine by upgrading its hardware components such as CPU, memory, storage, etc.
x??

---

#### Functional Decomposition, Duplication, and Partitioning

Background context: The third part of the book will focus on architectural patterns that can be used to scale out applications. These include functional decomposition, duplication, and partitioning.

:p What are the three main architectural patterns mentioned for scaling out applications in this section?

??x
The three main architectural patterns for scaling out applications are:
1. Functional Decomposition: Breaking down a system into smaller parts with specific responsibilities.
2. Duplication: Creating multiple instances of services or components to handle load.
3. Partitioning: Dividing the data and workload among different nodes.
x??

---

#### Resiliency

Background context: Resilience in distributed systems refers to the ability of the system to continue functioning despite failures.

:p What is resiliency, and why is it important for large-scale systems?

??x
Resiliency in a distributed system means that the system can continue its operations even when some components fail. It's crucial because as the scale increases, so do the chances of failure. Resilience ensures high availability by using techniques like redundancy and self-healing mechanisms.
x??

---

#### Availability and Nines

Background context: The text defines availability in terms of downtime per day and discusses how it is often described using "nines."

:p How is system availability measured, and what do the different levels of nines mean?

??x
System availability is defined as the percentage of time an application can serve requests over a given period. It's commonly measured with nines:
- 90% (one nine): 2.4 hours downtime per day
- 99% (two nines): 14.4 minutes downtime per day
- 99.9% (three nines): 1.44 minutes downtime per day
- 99.99% (four nines): 8.64 seconds downtime per day
- 99.999% (five nines): 864 milliseconds downtime per day

These levels represent the maximum allowable downtime in a given period.
x??

---

#### Operations and DevOps

Background context: The rise of microservices and DevOps has led to teams being responsible for both developing and operating applications.

:p How have development practices changed with the advent of microservices and DevOps?

??x
With microservices and DevOps, the same team that designs a system is also responsible for its live-site operation. This change allows for better understanding of where the system falls short since engineers are on call when issues arise. Continuous safe deployments and observability are crucial to ensure availability without downtime.
x??

---

#### Anatomy of Distributed Systems

Background context: The text describes how distributed systems can be decomposed into services, which are loosely coupled components that communicate via IPC mechanisms like HTTP.

:p What is the core component in a service's implementation?

??x
The core component in a service's implementation is the business logic. It exposes interfaces (inbound and outbound) to communicate with other parts of the system or external services.
x??

---

#### Inbound and Outbound Interfaces

Background context: The text explains that inbound interfaces define operations for clients, while outbound interfaces allow the business logic to access external services.

:p How do inbound and outbound adapters work in a distributed system?

??x
Inbound adapters handle requests from IPC mechanisms like HTTP by invoking operations defined in the inbound interfaces. Outbound adapters implement the service's outbound interfaces, enabling the business logic to interact with external services such as data stores or messaging services.
x??

---

#### Servers and Clients

Background context: The text describes how processes that run services are referred to as servers, while those sending requests to a server are clients.

:p What is the relationship between a process being both a client and a server?

??x
A process can be both a client and a server because these roles aren't mutually exclusive. A single instance of a service might handle requests from other services (client) and also send requests to external systems or internal services (server).
x??

---

#### Different Architectural Points of View

Background context: The book uses various architectural viewpoints to discuss distributed systems, including physical, runtime, implementation, and logical perspectives.

:p What are the different architectural points of view used in this book?

??x
The book uses these architectural viewpoints:
1. Physical perspective: Machines communicating over network links.
2. Runtime perspective: Software processes communicating via IPC mechanisms like HTTP.
3. Implementation perspective: Loosely coupled services that can be deployed and scaled independently.
4. Logical perspective: Core business logic and its interfaces.
x??

