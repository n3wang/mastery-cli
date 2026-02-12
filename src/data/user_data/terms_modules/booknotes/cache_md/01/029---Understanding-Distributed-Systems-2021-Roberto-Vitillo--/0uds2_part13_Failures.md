# High-Quality Flashcards: 029---Understanding-Distributed-Systems-2021-Roberto-Vitillo--_processed (Part 13)


**Starting Chapter:** Failures

---


---
#### Channels and Message Delivery
Channels are point-to-point and support an arbitrary number of producers and consumers. Messages are delivered to consumers at least once, meaning a message may be processed more than once or not at all if there's a failure.

While a consumer is processing a message, the message remains persisted in the channel but other consumers cannot read it for the duration of the visibility timeout. The visibility timeout guarantees that if a consumer crashes while processing the message, the message will become visible to other consumers again when the timeout triggers. When the consumer is done processing the message, it deletes it from the channel, preventing it from being received by any other consumer in the future.

This guarantee is very similar to what cloud services such as Amazon’s SQS and Azure Storage Queues offer.
:p What are the key characteristics of a message in a channel regarding visibility timeout?
??x
The key characteristics include that while a consumer processes a message, it remains visible only to that specific consumer. Once the consumer finishes processing (or within the visibility timeout), the message becomes invisible again to other consumers. If the consumer crashes during this time, the message will be made visible again when the timeout triggers.
??x
This ensures that messages are not lost due to a crash but also prevents multiple consumers from attempting to process the same message simultaneously.
```java
// Example code for setting visibility timeout in pseudocode
void setVisibilityTimeout(Channel channel, Message msg) {
    // Logic to set visibility timeout on the message so it remains invisible
    // to other consumers while being processed by one consumer
}
```
x??
---

#### Exactly-once Processing Risk
A consumer must delete a message from the channel once it's done processing it, ensuring no duplication or loss. If a consumer deletes a message before processing it and crashes afterward, the message could be lost. Conversely, if a consumer only deletes a message after processing it and crashes, the same message might get reprocessed later.

Because of these risks, there is no such thing as exactly-once message delivery in practical implementations.
:p What are the potential risks when implementing exactly-once processing?
??x
The main risks include:
- Deleting a message before processing it: If a crash occurs after deletion but before processing, the message will be lost forever.
- Deleting a message only after processing it: A crash after processing and before deletion can cause the same message to be processed again.
```java
// Pseudocode for handling message processing with idempotence
class MessageProcessor {
    public void processMessage(Message msg) {
        // Process logic here
        markMessageAsProcessed(msg); // Marking as processed without deleting immediately
    }

    private void markMessageAsProcessed(Message msg) {
        // Logic to mark the message as processed (e.g., update a database)
    }
}
```
x??
---

#### Idempotent Messages for Simulating Exactly-once Delivery
To simulate exactly-once processing, consumers can require messages to be idempotent. This means that even if a message is delivered multiple times, executing it again will not change the state beyond what was achieved on the first execution.

:p How does requiring idempotence in messages help simulate exactly-once processing?
??x
Requiring messages to be idempotent allows for reprocessing without causing any side effects. If a message is processed more than once due to delivery failures, it will have no additional impact on the state since each operation behaves identically.

```java
// Example of an idempotent process method in pseudocode
class IdempotentProcess {
    public void executeMessage(Message msg) {
        // Process logic that ensures no side effects if called multiple times
    }
}
```
x??
---


---
#### Sharding Strategies Overview
Sharding is a technique used to distribute data across multiple nodes. When a dataset outgrows a single node, it needs to be partitioned into smaller datasets that can reside on different nodes. This ensures scalability and improves performance by distributing the load.

In this context, we will discuss how keys are mapped to partitions in a sharded key-value store.
:p What is sharding and why is it necessary?
??x
Sharding is a technique used when a dataset outgrows a single node, necessitating the distribution of data across multiple nodes. This approach helps in scaling applications by distributing the load and improving performance.

```java
public class ShardManager {
    private Map<String, Node> keyToNodeMap;

    public ShardManager() {
        // Initialize map to store key-to-node mappings
        this.keyToNodeMap = new HashMap<>();
    }

    public void addShard(String key, Node node) {
        keyToNodeMap.put(key, node);
    }

    public Node getNodeForKey(String key) {
        return keyToNodeMap.get(key);
    }
}
```
x??
---

#### Mapping Keys to Partitions
The mapping between keys and partitions is typically maintained in a strongly-consistent configuration store like etcd or Zookeeper. This ensures that the system has up-to-date information on how keys are distributed across nodes.

:p How is the key-to-node mapping managed in a sharded environment?
??x
In a sharded environment, the key-to-node mapping is often stored in a strongly-consistent configuration store such as etcd or Zookeeper. This ensures that all nodes have consistent and up-to-date information about which node is responsible for each key.

```java
public class ShardMappingService {
    private ConsistentConfigStore configStore;

    public ShardMappingService(ConsistentConfigStore configStore) {
        this.configStore = configStore;
    }

    public void updateShardMapping(String key, Node node) {
        configStore.putKeyToNodeMapping(key, node);
    }

    public Node getNodeForKey(String key) {
        return configStore.getKeyToNodeMapping(key);
    }
}
```
x??
---

#### Gateway Service for Routing
A gateway service can be used to route requests based on the mapping of keys to partitions and partitions to nodes. This service is crucial for handling read and write operations efficiently.

:p What role does a gateway service play in sharding?
??x
A gateway service acts as an intermediary between client requests and the shards (partitions) managed by different nodes. It routes requests based on the mapping of keys to partitions and ensures that each request goes to the correct node, optimizing performance and reliability.

```java
public class ShardGateway {
    private Map<String, Node> keyToNodeMap;

    public ShardGateway(Map<String, Node> keyToNodeMap) {
        this.keyToNodeMap = keyToNodeMap;
    }

    public void handleRequest(String key) {
        Node node = keyToNodeMap.get(key);
        if (node != null) {
            // Route request to the appropriate node
            node.handleRequest(key);
        } else {
            throw new IllegalArgumentException("Key not found in any shard");
        }
    }
}
```
x??
---


#### Range Partitioning
Range partitioning splits data into partitions based on a continuous range of keys. This is useful for scanning ranges efficiently but can lead to imbalanced partitions if the key distribution is uneven.

:p How does range partitioning work, and what are its potential issues?
??x
Range partitioning works by splitting the key space into contiguous ranges, where each partition holds a specific range of values. For example, if you partition data by date, one partition might hold all records from January 1 to March 31, another from April 1 to June 30, and so on.

However, this approach can lead to unbalanced partitions if the key distribution is uneven. Additionally, some access patterns, such as writing current-day data, may cause hotspots in a single partition, degrading performance.

```java
// Example of range partitioning by date
public class RangePartition {
    public static void main(String[] args) {
        // Assuming we have a list of dates and want to create partitions based on these dates.
        List<Date> dates = Arrays.asList(new Date(), new Date(), ...);
        
        int numPartitions = 4; // Define the number of partitions
        long stepSize = (dates.size() - 1) / numPartitions; // Calculate the size of each partition range
        
        for(int i = 0; i < dates.size(); i += stepSize) {
            Date start = dates.get(i);
            Date end = i + stepSize < dates.size() ? dates.get(i + stepSize) : null;
            
            System.out.println("Partition from " + start + " to " + (end != null ? end : "null"));
        }
    }
}
```
x??

---

#### Hash Partitioning
Hash partitioning uses a hash function to distribute keys uniformly across partitions, which can help balance the load. However, it doesn't guarantee an even distribution of access patterns.

:p How does hash partitioning work, and what are its potential issues?
??x
Hash partitioning assigns each key to a specific partition using a hash function. The idea is to map a potentially non-uniformly distributed key space into a uniformly distributed hash space. For example, simple modular hashing can be implemented as `hash(key) mod N`, where `N` is the number of partitions.

However, this approach doesn't eliminate hotspots if access patterns are not uniform. If a single key is accessed more frequently than others, all bets are off, and the partition containing that hotkey needs to be split further or the key itself can be split into multiple sub-keys.

```java
// Example of hash partitioning using modular hashing
public class HashPartition {
    public static void main(String[] args) {
        int numPartitions = 4; // Define the number of partitions
        String key = "exampleKey"; // The key to be hashed
        
        int hashValue = (key.hashCode() % numPartitions); // Simple modular hashing
        System.out.println("Partition: " + hashValue);
    }
}
```
x??

---

#### Stable Hashing and Ring Hashing
Stable hashing, such as ring hashing or consistent hashing, ensures that only a small subset of keys need to be rehashed when a new partition is added. This reduces the overhead of data shuffling.

:p What are stable hashing strategies like ring hashing and consistent hashing, and how do they work?
??x
Stable hashing strategies like ring hashing and consistent hashing ensure that the number of keys that need to be reassigned remains minimal when adding a new partition. For example, in consistent hashing, both partitions and keys are randomly distributed on a circle, and each key is assigned to the next partition in clockwise order.

When a new partition is added, only the keys mapped to it need to be reassigned. This minimizes the overhead of data shuffling.

```java
// Example of consistent hashing (simplified)
public class ConsistentHashing {
    public static void main(String[] args) {
        int numPartitions = 5; // Define the number of partitions
        String key1 = "key1"; // The first key to be hashed and assigned a partition
        String key2 = "key2"; // Another example key
        
        // Assume we have a circle with partition identifiers and keys distributed randomly.
        
        int hashKey1 = (key1.hashCode() % numPartitions); // Hash the first key
        int hashKey2 = (key2.hashCode() % numPartitions); // Hash the second key
        
        System.out.println("Partition for " + key1 + ": " + hashKey1);
        System.out.println("Partition for " + key2 + ": " + hashKey2);
    }
}
```
x??

---

#### Loss of Sort Order in Hash Partitioning
While hash partitioning loses the sort order over partitions, data within an individual partition can still be sorted based on a secondary key.

:p What is the main drawback of hash partitioning compared to range partitioning?
??x
The main drawback of hash partitioning compared to range partitioning is that it loses the natural sort order over partitions. Range partitioning maintains a continuous and ordered sequence within each partition, which can be useful for efficient scans and queries.

However, with hash partitioning, the data within an individual partition cannot maintain any specific order; sorting must be done based on secondary keys if needed.

```java
// Example of maintaining sort order in range partitioning vs. hash partitioning
public class SortOrder {
    public static void main(String[] args) {
        // Range Partitioning
        List<String> data = Arrays.asList("a", "b", "c", "d");
        int numPartitions = 2;
        
        for(int i = 0; i < data.size(); i += (data.size() / numPartitions)) {
            List<String> partition = data.subList(i, Math.min(data.size(), i + (data.size() / numPartitions)));
            System.out.println("Partition: " + partition);
        }
        
        // Hash Partitioning
        int hashData[] = new int[data.size()];
        for(int i = 0; i < data.size(); i++) {
            hashData[i] = Math.abs(data.get(i).hashCode() % numPartitions);
        }
        
        for (int i = 0; i < numPartitions; i++) {
            List<String> partition = new ArrayList<>();
            for(int j = 0; j < data.size(); j++) {
                if(hashData[j] == i) {
                    partition.add(data.get(j));
                }
            }
            System.out.println("Partition: " + partition);
        }
    }
}
```
x??

---

