# High-Quality Flashcards: Designing-data-intensive-applications_-the-big-ideas-behind-reliable-scalable_processed (Part 16)


**Starting Chapter:** Partitioning by Hash of Key

---


#### Partitioning Definition and Terminology
Grace Murray Hopper emphasized breaking away from sequential computing and stated that partitioning is crucial for future computer management. In database terminology, a **partition** is often referred to by different names across various systems:
- MongoDB: shard
- Elasticsearch: shard
- SolrCloud: shard
- HBase: region
- Bigtable: tablet
- Cassandra/Riak: vnode
- Couchbase: vBucket

However, the term partition remains the most established and is used throughout this chapter.
:p What are some different names for a "partition" in various database systems?
??x
Different names include shard (MongoDB, Elasticsearch), region (HBase), tablet (Bigtable), vnode (Cassandra and Riak), and vBucket (Couchbase).
x??

---

#### Partitioning Goals and Benefits
The primary goal of partitioning is to achieve scalability. By breaking large datasets into smaller partitions, each can be placed on different nodes in a shared-nothing cluster. This allows for data distribution across many disks and processors.

Each node can independently execute queries for its own partition, scaling query throughput by adding more nodes.
:p Why do we use partitioning?
??x
We use partitioning to scale the database by distributing large datasets across multiple nodes. Each node handles a subset of the data, allowing for parallel processing and improved performance through added nodes.
x??

---

#### Partitioning in NoSQL Databases
Partitioning was pioneered in the 1980s by systems like Teradata and Tandem NonStop SQL, which were later rediscovered by NoSQL databases and Hadoop-based data warehouses.

These systems can be designed for either transactional workloads or analytics, affecting their tuning but not fundamentally altering partitioning strategies.
:p What are some early pioneers of partitioning?
??x
Early pioneers include Teradata and Tandem NonStop SQL. These were later adopted by NoSQL databases and Hadoop-based data warehouses.
x??

---

#### Replication in Partitioned Databases
To ensure fault tolerance, replication is often combined with partitioning. Each partition can be stored on multiple nodes to prevent data loss.

A node may store more than one partition to handle this redundancy effectively.
:p How does replication work in a partitioned database?
??x
Replication works by storing each partition across multiple nodes for fault tolerance. This means that even though each record belongs to exactly one partition, it can be stored on several different nodes. A single node may store more than one partition to handle this redundancy effectively.
x??

---

#### Indexing and Partitioning Interaction
Indexing interacts with partitioning by allowing efficient querying within a partition. However, the choice of indexing strategy is critical as it impacts performance.

For example, choosing an index that optimizes read operations can significantly enhance query performance on partitions.
:p How does indexing interact with partitioning?
??x
Indexing interacts with partitioning by enabling efficient querying within each partition. The choice of indexing strategy is crucial because it directly affects the performance of queries operating on a single partition. Proper indexing ensures fast access to data, which in turn improves overall query efficiency.
x??

---

#### Rebalancing for Node Management
Rebalancing is necessary when nodes are added or removed from the cluster. This process involves redistributing partitions across the remaining nodes to maintain optimal distribution and performance.

Rebalancing ensures that no node becomes overloaded with too many partitions, thus maintaining system stability and performance.
:p What is rebalancing in partitioned databases?
??x
Rebalancing refers to the process of redistributing partitions when nodes are added or removed from a cluster. This ensures that data remains evenly distributed across all nodes, optimizing performance and preventing any single node from becoming overloaded with too many partitions.
x??

---

#### Data Routing in Partitioned Databases
Databases route requests to the appropriate partition based on key values or other criteria. This routing mechanism is crucial for executing queries efficiently.

The choice of routing algorithm can significantly impact query performance and should be carefully designed considering the data distribution strategy.
:p How do databases route requests in partitioned systems?
??x
Databases use a routing mechanism to direct requests to the appropriate partition based on key values or other criteria. This ensures that each request is processed by the correct node, optimizing query execution.

The routing algorithm must consider the specific data distribution strategy and be designed to minimize latency and maximize performance.
x??

---


#### Leader-Follower Replication Model
In a leader-follower replication model, each partition’s leader is assigned to one node, and its followers are assigned to other nodes. Each node may be the leader for some partitions and a follower for others. This setup allows for better scalability and fault tolerance.
:p What does the leader-follower replication model entail?
??x
The leader-follower replication model involves assigning leaders and followers for each partition. Leaders handle read and write operations, while followers replicate these operations to maintain data consistency. Nodes can switch between being leaders or followers based on system needs.
```
// Pseudocode example
class Node {
    boolean isLeader;
    List<Node> followers;

    void assignLeadership() {
        // Logic to determine if the node should be a leader
    }

    void replicateToFollowers(Transaction t) {
        // Replicate transaction to all follower nodes
    }
}
```
x??

---

#### Partitioning of Key-Value Data
The goal of partitioning key-value data is to distribute records and query load evenly across nodes. Random assignment can lead to hot spots, where some partitions handle disproportionately high loads, making the system less effective.
:p How should one avoid creating hot spots when partitioning key-value data?
??x
To avoid hot spots, you should use a consistent and fair method for distributing keys among partitions. One approach is to assign continuous ranges of keys (key ranges) to each partition. This ensures that each node handles an approximately equal amount of data.
```
// Pseudocode example
class Partition {
    String keyRangeStart;
    String keyRangeEnd;

    boolean containsKey(String key) {
        // Check if the key falls within this partition's range
    }
}

class Node {
    List<Partition> partitions;

    void assignPartitions() {
        // Logic to assign partitions based on key ranges
    }

    void handleRequest(String key, String value) {
        Partition p = findPartition(key);
        p.handleRequest(key, value); // Delegate request handling to the appropriate partition
    }
}
```
x??

---

#### Key Range Partitioning
Key range partitioning involves dividing data into continuous key ranges. This approach helps in evenly distributing the load across nodes by assigning a specific range of keys to each node.
:p How does key range partitioning work?
??x
In key range partitioning, you assign a continuous range of keys (from some minimum to some maximum) to each partition. By knowing the boundaries between ranges and which partitions are assigned to which nodes, you can efficiently route read/write requests to the appropriate nodes.
```
// Pseudocode example
class KeyRange {
    String startKey;
    String endKey;

    boolean isInRange(String key) {
        // Check if the key falls within this range
    }
}

class Partition {
    KeyRange keyRange;

    void handleRequest(String key, String value) {
        // Handle request based on the key's position in the range
    }
}
```
x??

---


#### Key Range Partitioning
Background context explaining the concept. When data is partitioned based on a key range, such as timestamps or IDs, it can lead to hot spots because writes are often clustered into the same partition.
If you have an application where the key is a timestamp (e.g., year-month-day-hour-minute-second), range scans allow fetching records within a specific time range easily. However, if all write operations happen at the same time, this can overload one partition and lead to performance issues.

:p What are potential downsides of using key range partitioning in an application with frequent writes?
??x
Using key range partitioning in applications with frequent writes can lead to hot spots where a single partition handles most of the writes. This happens because all write operations might cluster into one partition, typically the current time partition. As a result, this partition gets overloaded while other partitions remain idle.
To mitigate this issue, it's essential to distribute the writes more evenly across different partitions.

```java
// Example: Distributing sensor data by sensor name and timestamp
String key = "sensorName" + "-" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd-HH-mm-ss"));
```
x??

---

#### Hash Partitioning
Hash partitioning uses a hash function to distribute keys uniformly across partitions, reducing the risk of hot spots. A good hash function ensures that even similar inputs produce widely different outputs.
The goal is to use a suitable hash function (e.g., MD5) to convert each key into a unique integer value and then map these values to partitions.

:p How does hash partitioning help avoid the problem of hot spots in data stores?
??x
Hash partitioning helps avoid the problem of hot spots by distributing writes more evenly across all partitions. By using a well-distributed hash function, similar keys (e.g., measurements from different sensors) are mapped to distinct partitions. This ensures that no single partition gets overloaded with write operations.

For instance, in Cassandra or MongoDB, MD5 is often used as the hash function:
```java
// Example: Using MD5 for hash partitioning
import java.security.MessageDigest;
import javax.xml.bind.DatatypeConverter;

public class HashPartitioningExample {
    public static String hashKey(String key) throws Exception {
        MessageDigest md = MessageDigest.getInstance("MD5");
        byte[] digest = md.digest(key.getBytes());
        return DatatypeConverter.printHexBinary(digest).toLowerCase();
    }
}
```
x??

---

#### Partition Boundaries and Administrator Choice
The administrator can manually define partition boundaries or the database system can choose them automatically. For key range partitioning, administrators need to consider the access patterns and potential skew in data distribution.

:p What are the two methods for setting up partition boundaries?
??x
Partition boundaries can be set either manually by an administrator or chosen automatically by the database system. Manual setting involves defining specific ranges based on observed data patterns, while automatic setting allows the database to dynamically manage partitions according to its internal logic.

For example, in a sensor network application:
- Administrator-defined: `01-2023 -> 02-2023`, etc.
- Auto-defined by database: The database automatically handles partitioning based on key ranges without manual intervention.

```java
// Example of manually setting partitions (pseudocode)
public class PartitionManager {
    public void definePartitions(String[] timeRanges) {
        for (String range : timeRanges) {
            // Logic to create partitions for each range
        }
    }
}
```
x??

---

#### Range Scans in Key-Range Partitioning
Range scans are useful when you need to fetch records within a specific key range. For instance, if the key is a timestamp, a range scan can be used to retrieve all records from a particular time period.

:p How do range scans work in key-range partitioning?
??x
In key-range partitioning, range scans allow fetching records based on a specified key range. If the key is a timestamp (e.g., year-month-day-hour-minute-second), you can perform a range scan to retrieve all records from a specific time period easily.

For example:
- To fetch all sensor readings for January 2023: `select * from sensors where timestamp >= '2023-01-01' AND timestamp < '2023-02-01'`.

```java
// Example of range scan (pseudocode)
public class SensorDatabase {
    public List<SensorReading> getSensorReadingsInRange(String startTimestamp, String endTimestamp) throws Exception {
        // Query logic to fetch records within the specified timestamp range
        return sensorReadings;
    }
}
```
x??

---

#### Multi-column Indexes
Using a multi-column index (similar to composite indexes in SQL databases), you can treat keys as concatenated indices to fetch related records more efficiently.

:p How do multi-column indexes assist with fetching multiple related records?
??x
Multi-column indexes allow treating keys as concatenated indices, enabling efficient retrieval of multiple related records. For example, if the key is structured as `sensorName-timestamp`, you can perform a single query to fetch all readings from a particular sensor during a specific time period.

For instance:
- Query: `SELECT * FROM sensors WHERE sensorName = 'Sensor123' AND timestamp BETWEEN '2023-01-01T08:00:00Z' AND '2023-01-01T09:00:00Z'`.

```java
// Example of using multi-column indexes (pseudocode)
public class SensorDatabase {
    public List<SensorReading> fetchRelatedRecords(String sensorName, String startTime, String endTime) throws Exception {
        // Query logic to fetch related records based on the composite key
        return relatedRecords;
    }
}
```
x??


---
#### Partitioning by Hash of Key
Background context explaining how keys are distributed evenly among partitions. Consistent hashing is a technique that uses randomly chosen partition boundaries to avoid central control or distributed consensus, making it suitable for large-scale systems like content delivery networks (CDNs).
:p What is consistent hashing and its primary use case?
??x
Consistent hashing is a method of distributing keys across partitions in a way that minimizes the number of partitions that need to be remapped when nodes are added or removed. It's primarily used in distributed caching systems such as content delivery networks (CDNs) to ensure even load distribution without requiring central control or consensus among nodes.
??x
---

---
#### Key-Value Data Partitioning
Background context explaining how key-value data is partitioned using the hash of keys. This technique helps distribute keys fairly among partitions, with evenly spaced boundaries or pseudorandomly chosen ones (consistent hashing).
:p How does consistent hashing work in distributing load across a system?
??x
Consistent hashing works by assigning each key to a unique position on a virtual ring and then placing servers at specific points around this ring. When a hash of the key is calculated, it determines which server handles the request. This approach minimizes remapping when adding or removing nodes.
??x
---

---
#### Rebalancing Partitions
Background context explaining the challenges in rebalancing partitions using consistent hashing. The technique often doesn’t work well for databases due to its inability to support efficient range queries and maintain key order.
:p Why is consistent hashing not commonly used in databases?
??x
Consistent hashing is not widely used in databases because it doesn't support efficient range queries, which are crucial for many database operations. Range queries on the primary key cannot be efficiently performed when keys are scattered across partitions determined by their hash values.
??x
---

---
#### Hash Partitioning vs. Key-Range Partitioning
Background context explaining how using the hash of a key for partitioning can lead to scattering of adjacent keys, losing their sort order and making range queries inefficient. This method is used in MongoDB but not supported in other systems like Riak or Couchbase.
:p Why does hash partitioning result in poor performance for range queries?
??x
Hash partitioning results in poor performance for range queries because it distributes keys randomly based on the hash of the key, scattering adjacent keys across different partitions. This means that to perform a range query, all partitions must be queried, making the operation inefficient.
??x
---

---
#### Cassandra Partitioning Strategy
Background context explaining how Cassandra achieves a compromise between key-range and hash partitioning by hashing only part of the primary key and using other columns as a concatenated index for sorting data. This approach supports efficient queries while maintaining some key order.
:p How does Cassandra handle partitioning to support range queries?
??x
Cassandra handles partitioning by hashing only the first part of the compound primary key, which determines the partition, but uses other columns in the key as a concatenated index for sorting data within Cassandra's SSTables. This allows efficient range queries while maintaining some order among keys.
??x
---


#### Partitioning Secondary Indexes by Term

Background context explaining how secondary indexes are typically partitioned and why a global index is necessary. The main idea is that while local indices (one per partition) can be efficient, they become bottlenecks when scaled horizontally. To avoid this, a global secondary index is introduced but must itself be partitioned to manage load effectively.

:p What is the primary reason for using term-partitioning in global secondary indexes?
??x
Term-partitioning allows the global secondary index to efficiently handle queries while distributing the load across partitions, similar to how data is distributed. This ensures that reads are faster and more efficient since clients only need to query the relevant partition.
x??

---

#### Global Index Partitioning by Term

Background context explaining that a global secondary index must be partitioned differently from the primary key index, and how it can be partitioned based on terms like "color" or "make".

:p How is the term-partitioned global index different from local secondary indices?
??x
The term-partitioned global index covers data across all partitions, providing a unified view. It is designed to handle queries more efficiently by partitioning terms (like color:red) rather than individual documents, ensuring that reads only need to access specific partitions.
x??

---

#### Partitioning Logic

Background context explaining how the index can be partitioned either by term itself or using a hash of the term, and their respective advantages.

:p What are the two methods for partitioning a term-partitioned global index?
??x
The two methods are:
1. **Partitioning by Term Itself**: Useful for range scans on properties like asking price.
2. **Partitioning on a Hash of the Term**: Provides more even load distribution.

For example, if terms start with 'a' to 'r', they might go into partition 0, and those starting with 's' to 'z' into partition 1.
x??

---

#### Global Index Read Efficiency

Background context explaining how global secondary indexes can make reads more efficient by reducing the number of partitions that need to be queried.

:p How does a term-partitioned global index improve read efficiency?
??x
A term-partitioned global index improves read efficiency because it allows clients to directly query the partition containing the specific term they are interested in, rather than performing scatter/gather operations across all partitions.
x??

---

#### Global Index Write Complexity

Background context explaining the trade-offs between reads and writes when using a term-partitioned global index.

:p What is the main downside of using a term-partitioned global index for writes?
??x
The main downside is that writes are slower and more complicated. A write to a single document might now affect multiple partitions of the index, as each term in the document could be on a different partition.
x??

---

#### Implementation Challenges

Background context explaining the challenges faced with maintaining an up-to-date global secondary index due to the need for distributed transactions.

:p What challenge does using a term-partitioned global index pose in terms of updates?
??x
The challenge is that while the index should be updated immediately after writes, this often requires distributed transactions across all partitions affected by the write. Not all databases support this, leading to asynchronous updates where recent changes may not yet appear in the index.
x??

---

#### Real-world Examples

Background context explaining real-world applications and examples of term-partitioned global secondary indexes.

:p What are some real-world implementations that use term-partitioned global secondary indexes?
??x
Examples include:
- **Amazon DynamoDB**: It offers global secondary indexes that are updated within a fraction of a second.
- **Riak’s Search Feature**: Uses term-partitioned indices for efficient querying.
- **Oracle Data Warehouse**: Allows choosing between local and global indexing.

These systems demonstrate the practical application of term-partitioned secondary indexes in distributed databases.
x??

---


#### Fixed Number of Partitions
Background context explaining the concept. When partitioning data, it's important to manage how partitions are assigned to nodes in a cluster. One approach is to create more partitions than there are nodes, and assign several partitions to each node from the outset.

If a node is added or removed, only entire partitions are moved between nodes without changing the assignment of keys to partitions. This method ensures that data movement is minimized during rebalancing operations, making the process faster and reducing network and disk I/O load.

:p What is one strategy for managing partitions in a cluster where more partitions are created than there are nodes?
??x
One strategy involves creating many more partitions than there are nodes, assigning several partitions to each node from the beginning. When a new node joins or an existing one leaves the cluster, the system reassigns entire partitions rather than individual keys, ensuring minimal data movement.
x??

---

#### Not Using Hash Mod N for Rebalancing
Explanation of why the hash mod approach is not suitable for rebalancing due to excessive key movements.

:p Why is using `hash(key) % N` (where N is the number of nodes) problematic for rebalancing?
??x
Using `hash(key) % N` can cause frequent and unnecessary reassignment of keys when the number of nodes changes. For example, if a node is added or removed, many keys may need to move from one node to another because their hash values would change modulo the new number of nodes.

This approach leads to high overhead during rebalancing as large amounts of data are moved between nodes.
x??

---

#### Rebalancing with Fixed Partitions
Explanation and example of how fixed partitions can help in maintaining load balance without frequent key movements.

:p How does using a fixed number of partitions facilitate easier reassignment when the number of nodes changes?
??x
Using a fixed number of partitions means that each node is assigned multiple partitions from the start. When nodes are added or removed, only entire partitions are moved between existing nodes to achieve load balance. This minimizes the amount of data movement and thus speeds up the rebalancing process.

For example:
- Initially, 100 partitions are spread across 10 nodes.
- If a new node is added, this node can take over some partitions from each of the other nodes until the distribution becomes balanced again.

This method ensures that keys remain in their respective partitions and only partition assignments change, reducing the complexity and overhead during rebalancing.
x??

---

#### Rebalancing Strategies Overview
Summary of different strategies for managing partitions and ensuring efficient load balancing.

:p What are some key strategies for managing data partitions to handle changes in node count?
??x
Key strategies include:
- **Fixed Number of Partitions:** Creating many more partitions than there are nodes from the outset, assigning several partitions to each node. This allows for easy redistribution when adding or removing nodes by moving entire partitions.
- Avoiding Hash Mod N: Using hash functions directly (e.g., `hash(key) % N`) can lead to frequent and unnecessary key movements when the number of nodes changes.

These strategies aim to minimize data movement, maintain load balance, and ensure that the database continues accepting reads and writes during rebalancing.
x??

---


#### Adding Nodes to a Database Cluster

Background context: When expanding a database cluster, you can leverage node hardware differences by assigning more partitions to more powerful nodes. This approach helps balance the load among nodes.

:p How does adding more powerful nodes with more partitions help in balancing the load?
??x
By distributing more partitions (and thus data) to more powerful nodes, these nodes handle a larger share of the computational workload. This ensures that each node operates at or near its capacity, which is beneficial for performance and resource utilization.

For example, consider two nodes: Node A with 2 CPUs and Node B with 4 CPUs. If you assign 10 partitions to Node A and 20 partitions to Node B, Node B will handle a larger portion of the data and computation, reflecting its superior hardware capabilities.
??x

---

#### Fixed-Partition Databases

Background context: In fixed-partition databases, the number of partitions is set when the database is initialized and remains constant. This setup can simplify operations but poses challenges if the dataset size varies significantly.

:p What are the advantages and disadvantages of using a fixed number of partitions in a database?
??x
Advantages:
- Simpler operational management: No need to constantly split or merge partitions.
- Predictable performance: Each partition's data volume is known and manageable.

Disadvantages:
- Inflexibility with varying dataset sizes: If the dataset grows, each partition will become larger, increasing rebalancing overhead. Conversely, if the dataset shrinks, smaller partitions may be underutilized.

Example scenario in Java code to manage fixed partitions (pseudocode):
```java
public class FixedPartitionManager {
    private List<Partition> partitions;

    public void addNode(Node node) {
        // Allocate more partitions to powerful nodes.
        for (Partition p : partitions) {
            if (node.isPowerful()) {
                p.addMoreData();
            }
        }
    }

    public void removeNode(Node node) {
        // Reallocate fewer partitions from powerful nodes.
        for (Partition p : partitions) {
            if (p.getLoad() > 50%) {
                p.removeSomeData();
            }
        }
    }
}
```
??x

---

#### Dynamic Partitioning

Background context: Dynamic partitioning allows the number of partitions to change based on the size of the dataset. This approach is particularly useful for databases using key range partitioning.

:p How does dynamic partitioning handle uneven data distribution?
??x
Dynamic partitioning automatically splits large partitions and merges small ones, ensuring that data is evenly distributed across partitions as the dataset grows or shrinks.

For instance, when a partition in HBase exceeds 10 GB (the default threshold), it is split into two. Conversely, if a partition's size falls below a certain threshold due to deletions, it can be merged with an adjacent partition.

Example pseudocode for dynamic partition splitting:
```java
public class DynamicPartitionManager {
    public void handlePartitionGrowth(Partition p) {
        if (p.size() > 10GB) { // Default HBase threshold
            split(p);
        }
    }

    private void split(Partition p) {
        Partition newPartition = new Partition();
        int middleIndex = p.getData().size() / 2;
        for (int i = middleIndex; i < p.getData().size(); i++) {
            newPartition.addData(p.getData().get(i));
        }
        p.setData(p.getData().subList(0, middleIndex));
    }
}
```
??x

---

#### Pre-splitting in HBase and MongoDB

Background context: To mitigate the initial overhead when starting with a small dataset, these databases allow pre-splittings of partitions. This ensures that writes are distributed across multiple nodes from the start.

:p How does pre-splitting help in an empty database?
??x
Pre-splitting helps by initializing the database with predefined partition boundaries based on anticipated key ranges or data distribution patterns. This avoids the initial situation where all writes go to a single node, ensuring balanced load distribution right from the start.

Example code for MongoDB's `split` method:
```java
public class MongoDBManager {
    public void preSplitDatabase(String keyspace) {
        // Define an array of key ranges.
        String[] keyRanges = {"key1", "key2", "key3"};
        
        // Create initial partitions based on the key ranges.
        for (String range : keyRanges) {
            createPartition(range);
        }
    }

    private void createPartition(String range) {
        System.out.println("Creating partition for key range: " + range);
    }
}
```
??x

---

#### Partitioning Proportionally to Nodes

Background context: In dynamic partitioning, the number of partitions is proportional to the size of the dataset. This means that as data grows or shrinks, each partition's size remains within a predefined range.

:p How does dynamic partitioning ensure balanced load distribution across nodes?
??x
Dynamic partitioning ensures balance by splitting large partitions and merging small ones based on the current state of the dataset. As the dataset grows, more partitions are created to handle the increased data volume; conversely, as data is deleted or moved, some partitions can be merged to reduce overhead.

Example pseudocode for a balanced load distribution:
```java
public class PartitionBalancer {
    public void rebalancePartitions() {
        List<Partition> partitions = getPartitions();
        
        // Split large partitions.
        for (Partition p : partitions) {
            if (p.size() > MAX_SIZE) {
                split(p);
            }
        }

        // Merge small partitions.
        while (partitions.size() < MIN_PARTITIONS) {
            merge(partitions);
        }
    }

    private void split(Partition p) {
        Partition newPartition = new Partition();
        int middleIndex = p.getData().size() / 2;
        for (int i = middleIndex; i < p.getData().size(); i++) {
            newPartition.addData(p.getData().get(i));
        }
        p.setData(p.getData().subList(0, middleIndex));
    }

    private void merge(List<Partition> partitions) {
        // Logic to find and merge adjacent small partitions.
    }
}
```
??x
---


#### Partitioning Strategies Overview
Background context: This section discusses different strategies for partitioning data across nodes in a distributed system. The goal is to balance load and maintain performance as the dataset grows or the number of nodes changes.

:p What are the main strategies discussed for partitioning data?
??x
The main strategies include:
- Proportional to dataset size (fixed number of partitions, each growing with the dataset).
- Proportional to the number of nodes.
- Randomized hash-based partitioning used by Cassandra and Ketama. 
- The number of partitions is independent of the number of nodes in the first two cases.

??x
The answer includes explaining how each strategy works:
- Fixed number of partitions per node, growing with dataset size: This keeps partition sizes relatively stable as more data is added.
```java
// Pseudocode for adding a new node and splitting existing partitions
public void addNode() {
    Random r = new Random();
    int numPartitionsPerNode = 256; // Default in Cassandra
    List<Integer> selectedPartitions = new ArrayList<>();
    while (selectedPartitions.size() < numPartitionsPerNode) {
        int partitionIndex = r.nextInt(partitions.length);
        if (!selectedPartitions.contains(partitionIndex)) {
            selectedPartitions.add(partitionIndex);
        }
    }
    for (int partition : selectedPartitions) {
        // Split the partition and assign one half to the new node
    }
}
```
x??

#### Rebalancing Mechanisms
Background context: The text discusses automatic vs manual rebalancing strategies. Automatic rebalancing can be convenient but risky, while manual control allows for more deliberate management.

:p What are two approaches to handling rebalancing in distributed systems?
??x
The two approaches are:
- Fully automated: The system decides when and how partitions should be moved between nodes without administrator intervention.
- Manual: Administrators explicitly configure partition assignments which only change on explicit reconfiguration commands from the admin.

??x
Explanation includes potential drawbacks of automatic rebalancing:
```java
// Pseudocode for a simple manual rebalancing process
public void manualRebalance() {
    // Admin selects partitions to move and new node addresses
    List<Integer> partitionsToMove = getSelectedPartitions();
    List<String> newNodeAddresses = getNewNodeAddresses();

    for (int partition : partitionsToMove) {
        Node targetNode = getNodeFromAddress(newNodeAddresses.get(partition));
        movePartition(partition, targetNode);
    }
}
```
x??

#### Request Routing Mechanisms
Background context: Once the data is partitioned and possibly rebalanced, clients need to know which node to connect to make a request. This involves service discovery mechanisms.

:p How do distributed systems determine which node to route requests to?
??x
Distributed systems use one of these methods:
1. Round-robin load balancing where any node can handle the request and forward it if needed.
2. A routing tier that determines the appropriate node for each request.
3. Clients directly connect to the appropriate node knowing partitioning details.

??x
Explanation of client connection logic in method 3 (direct connection):
```java
// Pseudocode for direct client connection approach
public class DirectRouting {
    private Map<String, Node> partitionToNodeMap;

    public void routeRequest(String key) {
        Node targetNode = partitionToNodeMap.get(getPartitionForKey(key));
        if (targetNode != null) {
            // Connect to the determined node
            connect(targetNode);
        } else {
            throw new RoutingException("No valid node for this partition");
        }
    }

    private String getPartitionForKey(String key) {
        // Calculate the partition based on hash function of key
        return "partition_" + hash(key);
    }

    private void connect(Node node) {
        // Code to establish connection with the target node
    }
}
```
x??

---

