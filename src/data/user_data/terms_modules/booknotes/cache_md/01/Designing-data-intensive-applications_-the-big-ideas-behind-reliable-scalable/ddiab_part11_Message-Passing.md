# High-Quality Flashcards: Designing-data-intensive-applications_-the-big-ideas-behind-reliable-scalable_processed (Part 11)


**Starting Chapter:** Message-Passing Dataflow

---


#### RESTful APIs and Evolution

Background context: The text discusses the evolution of RESTful APIs, focusing on backward and forward compatibility. It mentions that JSON is commonly used for responses and request parameters in RESTful APIs.

:p What are the typical scenarios where backward and forward compatibility need to be maintained in RESTful APIs?
??x
In RESTful APIs, especially those used across organizational boundaries, maintaining backward and forward compatibility is crucial because the service provider often has no control over its clients. Clients might not be updated immediately after a new version of the API is deployed, so changes that do not break existing clients are preferred.

Adding optional request parameters or adding new fields to response objects are usually considered compatible changes in RESTful APIs. However, compatibility needs to be maintained for a long time, sometimes indefinitely, due to the potential for multiple versions coexisting.
x??

---

#### RPC and Service Compatibility

Background context: The text describes how RPC (Remote Procedure Call) frameworks handle service evolution compared to RESTful APIs. It notes that RPC is often used within an organization or datacenter.

:p How does maintaining compatibility in RPC differ from RESTful APIs?
??x
In RPC, compatibility is harder to maintain because services are often used across organizational boundaries where the provider has no control over the clients. This means that service providers must ensure backward and forward compatibility for a long time, potentially indefinitely. If necessary, they might have to maintain multiple versions of their API simultaneously.

For RESTful APIs, common approaches include using version numbers in URLs or HTTP Accept headers, while RPC frameworks like Thrift, gRPC (Protocol Buffers), and Avro can evolve according to the encoding format's compatibility rules.
x??

---

#### Message-Passing Dataflow

Background context: The text introduces message-passing systems as a hybrid between RESTful APIs and databases. It explains how messages are sent through a broker or queue.

:p What advantages do message brokers offer over direct RPC?
??x
Message brokers provide several advantages:
- Buffering for unavailable or overloaded recipients, improving system reliability.
- Automatic redelivery of messages to crashed processes, preventing loss.
- Avoidance of the sender needing to know the recipient's IP address and port number (useful in cloud deployments).
- Ability to send a single message to multiple recipients.
- Logical decoupling between sender and receiver.

These features make message brokers more flexible and resilient compared to direct RPC.
x??

---

#### Distributed Actor Frameworks

Background context: The text introduces distributed actor frameworks, which use an actor model for concurrency across multiple nodes. It mentions the importance of message encoding compatibility in such systems.

:p How do distributed actor frameworks handle message encoding?
??x
Distributed actor frameworks integrate a message-passing mechanism that works whether the sender and recipient are on the same node or different nodes. Messages may be lost due to error scenarios, but each actor processes only one message at a time, simplifying thread management. The framework transparently encodes messages into byte sequences for network transmission and decodes them on the other side.

For rolling upgrades in actor-based applications, compatibility between old and new versions is crucial since messages might traverse nodes running different versions of the application.
x??

---


#### Nonuniform Memory Access (NUMA)
Background context explaining NUMA. In a large machine, although any CPU can access any part of memory, some banks of memory are closer to one CPU than to others. This is called nonuniform memory access (NUMA). To make efficient use of this architecture, processing needs to be broken down so that each CPU mostly accesses memory that is nearby—which means that partitioning is still required, even when ostensibly running on one machine.
If applicable, add code examples with explanations.
:p What is NUMA and why does it require partitioning?
??x
NUMA refers to the situation where different CPUs in a multi-processor system have different access times to various parts of the memory. This means that some portions of memory are physically closer to certain CPUs than others. In such cases, if not properly managed, accessing memory far from a CPU can significantly reduce performance.

To optimize performance and ensure efficient use of this architecture, it is essential to partition the workload so that each CPU primarily accesses nearby memory. This requires careful distribution of tasks and data across the nodes (CPUs) to minimize cross-node communication and maximize local processing.
??x
The answer with detailed explanations:
NUMA involves a multi-processor system where different CPUs have varying access times to various parts of the memory due to physical proximity. To achieve optimal performance, workloads need to be partitioned so that each CPU handles tasks involving nearby memory. This reduces cross-node communication and enhances local processing.

Code example (Pseudocode):
```java
// Pseudocode for NUMA-aware task distribution
for (int i = 0; i < numCPUs; i++) {
    for (Node node : nodes) {
        if (node.getMemoryDistance(i) <= threshold) { // Determine if memory is nearby
            assignTasksToNode(node, tasks);
        }
    }
}
```
This pseudocode outlines a simple approach to distributing tasks based on the proximity of the CPU and its associated memory. It ensures that tasks are assigned to nodes with nearby memory, optimizing performance.
x??

---

#### Network Attached Storage (NAS) or Storage Area Network (SAN)
Background context explaining NAS and SAN. These technologies allow for network-attached storage where data is stored on a dedicated file server accessible over the network. Scaling to higher load can be achieved by using more powerful machines with many CPUs, RAM chips, and disks joined under one operating system.
If applicable, add code examples with explanations.
:p What are NAS and SAN, and how do they help in scaling?
??x
Network Attached Storage (NAS) and Storage Area Network (SAN) are technologies that allow data to be stored on a dedicated file server accessible over the network. These solutions can help scale applications by providing more storage capacity, faster access times, and improved fault tolerance.

Specifically:
- NAS provides file-level storage over a network.
- SAN offers block-level storage over a high-speed network.
These systems can be scaled to higher loads using more powerful machines with multiple CPUs, RAM chips, and disks joined under one operating system. The fast interconnects allow any CPU to access any part of the memory or disk, treating all components as a single machine.

However, there are some challenges:
- The cost grows faster than linearly; a machine with twice the resources costs significantly more.
- Due to bottlenecks, doubling the size of the system may not double its performance.
- NAS and SAN systems have limited fault tolerance but are tied to a single geographic location.

Code example (Pseudocode):
```java
// Pseudocode for accessing data from NAS or SAN
public class StorageAccess {
    private String ipAddress;
    private int port;

    public StorageAccess(String ipAddress, int port) {
        this.ipAddress = ipAddress;
        this.port = port;
    }

    public byte[] readData(String filePath) throws IOException {
        // Code to establish network connection and read data from NAS or SAN
        return new byte[0]; // Placeholder for actual implementation
    }
}
```
This pseudocode demonstrates a basic class that can be used to access data stored on a NAS or SAN system. It sets up a network connection using the provided IP address and port, then reads data from a specified file path.
x??

---

#### Shared-Memory Architecture
Background context explaining shared-memory architecture. This approach involves joining multiple CPUs, RAM chips, and disks under one operating system with a fast interconnect allowing any CPU to access any part of memory or disk. While it offers linear scalability, the cost grows faster than linearly, and there are potential bottlenecks that limit performance.

Shared-memory systems may provide limited fault tolerance through hot-swappable components but are constrained to a single geographic location.
:p What is shared-memory architecture, and what are its limitations?
??x
Shared-memory architecture involves integrating multiple CPUs, RAM chips, and disks under one operating system with fast interconnects allowing any CPU to access any part of the memory or disk. This approach aims for linear scalability but has several limitations:

- Cost Growth: A machine with twice as many resources typically costs significantly more than double.
- Performance Bottlenecks: Doubling the size does not always lead to doubling performance due to potential bottlenecks.
- Geographic Constraints: Shared-memory systems are limited to a single geographic location.

Code example (Pseudocode):
```java
// Pseudocode for shared-memory architecture setup
public class SharedMemorySystem {
    private List<CPU> cpus;
    private List<MemoryChip> memoryChips;
    private List<Disk> disks;

    public SharedMemorySystem(List<CPU> cpus, List<MemoryChip> memoryChips, List<Disk> disks) {
        this.cpus = cpus;
        this.memoryChips = memoryChips;
        this.disks = disks;
    }

    public void initialize() {
        // Code to initialize the shared-memory system
        for (CPU cpu : cpus) {
            cpu.connectToMemory(memoryChips.get(cpu.getId()));
        }
    }
}
```
This pseudocode outlines a basic structure of a shared-memory system, initializing CPUs with their corresponding memory chips. It demonstrates how multiple components are interconnected and accessed.

Limitations:
- Cost: Doubling resources does not just double the cost.
- Performance: Bottlenecks can limit scaling beyond a certain point.
- Geographical Constraints: Systems remain tied to a single location.
x??

---

#### Shared-Disk Architecture
Background context explaining shared-disk architecture. This approach uses multiple machines with independent CPUs and RAM but stores data on an array of disks that is shared between the machines, connected via a fast network. It's used for some data warehousing workloads but faces challenges like contention and overhead from locking mechanisms.
:p What is a shared-disk architecture, and what are its limitations?
??x
Shared-disk architecture involves using multiple machines with independent CPUs and RAM that share an array of disks accessible over a fast network. This setup allows these machines to access the same data stored on the shared disk array.

While useful for some applications like data warehousing, this approach faces several limitations:

- Contention: Multiple nodes trying to read or write to the same disk can lead to contention.
- Overhead from Locking: Managing locks across multiple nodes adds complexity and overhead.

Code example (Pseudocode):
```java
// Pseudocode for shared-disk architecture setup
public class SharedDiskSystem {
    private List<Node> nodes;
    private DiskArray diskArray;

    public SharedDiskSystem(List<Node> nodes, DiskArray diskArray) {
        this.nodes = nodes;
        this.diskArray = diskArray;
    }

    public void initialize() {
        // Code to initialize the shared-disk system
        for (Node node : nodes) {
            node.connectToDiskArray(diskArray);
        }
    }
}
```
This pseudocode outlines a basic structure of a shared-disk system, initializing each node with access to the disk array.

Limitations:
- Contention: Nodes may compete for access to shared disks.
- Locking Overhead: Managing locks across nodes adds complexity and overhead.
x??

---

#### Shared-Nothing Architecture
Background context explaining shared-nothing architecture. This approach involves using multiple independent machines or virtual machines where each node uses its own CPUs, RAM, and disks without relying on shared resources. Coordination between nodes is done at the software level over a conventional network.

Shared-nothing systems offer several advantages like reduced costs, better scalability, and potential geographic distribution but come with added complexity for applications.
:p What is shared-nothing architecture, and what are its benefits?
??x
Shared-nothing architecture involves using multiple independent machines or virtual machines where each node uses its own CPUs, RAM, and disks without relying on shared resources. Coordination between nodes is done at the software level over a conventional network.

Benefits include:
- Reduced Costs: You can use whatever machine offers the best price/performance ratio.
- Better Scalability: Can distribute data across multiple geographic regions to reduce latency and potential loss of an entire datacenter.
- Cloud Flexibility: Suitable for cloud deployments, making distributed architectures feasible even for small companies.

Code example (Pseudocode):
```java
// Pseudocode for shared-nothing architecture setup
public class SharedNothingSystem {
    private List<Node> nodes;

    public SharedNothingSystem(List<Node> nodes) {
        this.nodes = nodes;
    }

    public void initialize() {
        // Code to initialize the shared-nothing system
        for (Node node : nodes) {
            node.initialize();
        }
    }
}
```
This pseudocode outlines a basic structure of a shared-nothing system, initializing each node independently.

Benefits:
- Reduced Costs: No need for expensive shared hardware.
- Better Scalability: Can distribute data across multiple geographic regions.
- Cloud Flexibility: Suitable for cloud deployments with virtual machines.
x??

---

#### Replication
Background context explaining replication. Replication involves keeping a copy of the same data on several different nodes, potentially in different locations to provide redundancy and improve performance.

Replication can be done using various techniques like primary-replica models or multi-master replication.
:p What is replication, and how does it work?
??x
Replication involves keeping a copy of the same data on multiple different nodes, which can be in different locations. This provides redundancy, ensuring that if some nodes are unavailable, the data can still be served from the remaining nodes.

Replication can also help improve performance by reducing read latency and load balancing writes across multiple nodes.

Code example (Pseudocode):
```java
// Pseudocode for replication setup
public class ReplicationSystem {
    private List<Node> nodes;
    private Data data;

    public ReplicationSystem(List<Node> nodes, Data data) {
        this.nodes = nodes;
        this.data = data;
    }

    public void replicateData() {
        // Code to replicate data across multiple nodes
        for (Node node : nodes) {
            node.store(data);
        }
    }
}
```
This pseudocode demonstrates a simple replication setup where data is stored on multiple nodes.

How it works:
- Data is copied to each replica.
- Nodes can serve read requests from any replica, improving performance.
- In case of node failure, remaining replicas ensure data availability.
x??

---

#### Partitioning
Background context explaining partitioning. Partitioning involves splitting a large database into smaller subsets called partitions, which can be assigned to different nodes (also known as sharding). This allows for more efficient and scalable storage and retrieval.

Partitioning helps in distributing the load across multiple nodes, improving performance and reducing data contention.
:p What is partitioning, and how does it work?
??x
Partitioning involves splitting a large database into smaller subsets called partitions, which can be assigned to different nodes. This technique allows for more efficient and scalable storage and retrieval.

By distributing the data across multiple nodes, partitioning helps in:
- Distributing the load: Reduces the pressure on any single node.
- Improving Performance: Allows parallel processing of queries.
- Managing Large Datasets: Makes it easier to handle very large datasets.

Code example (Pseudocode):
```java
// Pseudocode for partitioning setup
public class PartitionedSystem {
    private List<Node> nodes;
    private Data data;

    public PartitionedSystem(List<Node> nodes, Data data) {
        this.nodes = nodes;
        this.data = data;
    }

    public void partitionData() {
        // Code to partition data across multiple nodes
        for (Node node : nodes) {
            node.storePartition(data.getPartitions().get(node.getId()));
        }
    }
}
```
This pseudocode demonstrates a basic structure of a partitioned system, where data is divided into partitions and stored on different nodes.

How it works:
- Data is divided into smaller partitions.
- Each node stores one or more partitions.
- Queries are directed to the appropriate node based on the partition key.
x??

---


#### Leader-Based Replication (Master-Slave)
Background context: In leader-based replication, also known as master-slave or active/passive replication, one replica is designated as the leader that handles all write operations. Other replicas are called followers and only handle reads from clients. The leader writes new data to its local storage and then synchronizes this change with its followers.
If a follower encounters an issue, it will not be able to apply changes from the leader.

:p How does leader-based replication (master-slave) work in terms of handling write operations?
??x
In leader-based replication:
- The leader replica is responsible for accepting all write requests and writing them to local storage.
- After successfully writing data locally, the leader sends an update to its followers via a replication log or change stream.
- Followers apply these updates to their local copies in the same order as they were received from the leader.

The process can be summarized with this pseudocode:
```pseudocode
leader {
    write_request: function(data) {
        // Write data locally
        write_to_local_storage(data)
        
        // Send update to all followers
        send_replication_log(to_followers, data)
    }
}

follower {
    replication_log: function(log_entry) {
        apply_data(log_entry.data)
    }
}
```
x??

---

#### Synchronous vs. Asynchronous Replication
Background context: In synchronous replication, the leader waits for confirmation from followers before reporting success to the client. This ensures that all replicas have up-to-date and consistent data. However, this can introduce latency in processing writes.

:p What is the difference between synchronous and asynchronous replication?
??x
In synchronous replication:
- The leader sends write commands to all followers.
- It waits for acknowledgment from each follower before confirming success to the client.
- Data consistency across all replicas is guaranteed due to this blocking mechanism.

In contrast, asynchronous replication:
- The leader does not wait for confirmation from followers after sending write commands.
- Acknowledgment to the client happens immediately upon local storage completion.
- Consistency guarantees are lower since replicas may lag behind the leader.

The decision between these modes depends on requirements such as data consistency and acceptable latency.
x??

---

#### Trade-offs in Replication
Background context: When implementing replication, there are various trade-offs to consider. These include choices like whether to use synchronous or asynchronous replication, handling failed replicas, and ensuring that reads can be served from followers while writes go only to the leader.

:p What are some key trade-offs when setting up a replicated system?
??x
Key trade-offs in setting up a replicated system involve:
- Synchronous vs. Asynchronous Replication: 
  - Synchronous ensures data consistency but introduces potential latency.
  - Asynchronous can handle more writes faster but risks data loss if followers fail.

- Handling Failed Replicas:
  - Strategies like promoting an asynchronous follower to synchronous status ensure continuous operation.
  
- Read and Write Distribution:
  - Reads from followers vs. writes only on the leader impact performance and availability.
x??

--- 

Note: The content is derived from the provided text, structured into flashcard-style questions for easy memorization and understanding of key concepts in replication systems.

