# High-Quality Flashcards: Sam-Newman---Building-Microservices-OReilly-Media-2015_processed (Part 25)


**Starting Chapter:** CAP Theorem

---


---
#### CAP Theorem Overview
Background context: The CAP theorem, proposed by Eric Brewer and later mathematically proven, dictates that in a distributed system, we can only achieve two out of three desirable properties—consistency, availability, and partition tolerance—simultaneously. This theorem has significant implications for the design of distributed systems.

:p What is the CAP theorem about?
??x
The CAP theorem asserts that in a distributed system, it's impossible to simultaneously achieve consistency, availability, and partition tolerance. We can choose any two out of these three properties but not all three.
x??

---


#### Consistency in Distributed Systems
Background context: In a distributed system, consistency ensures that every read operation will return the most recent write operation made by any node. However, achieving strong consistency across a network where nodes might fail or be partitioned is challenging.

:p What does consistency mean in distributed systems?
??x
Consistency means that all nodes in a distributed system view the data as being up-to-date and correct, such that if one node has updated some data, any subsequent read operation from another node should return the latest version of that data. This property ensures there are no stale or inconsistent reads.
x??

---


#### Availability in Distributed Systems
Background context: Availability refers to the system's ability to process requests at all times. In a highly available distributed system, every request should receive a response, even if some parts of the system fail.

:p What does availability mean in distributed systems?
??x
Availability means that the system can handle any number of requests without failing or significantly degrading performance. The goal is to ensure that users always get a response from the service, regardless of potential failures within the system.
x??

---


#### Partition Tolerance in Distributed Systems
Background context: Partition tolerance ensures that the system continues to operate and maintain consistency even when communication between nodes fails (i.e., network partitions occur).

:p What does partition tolerance mean in distributed systems?
??x
Partition tolerance means that a system should continue to function correctly and consistently, even if some parts of it are isolated from each other due to network failures or disconnections. The system must handle such partitions without compromising its consistency.
x??

---


#### Example Scenario with Two Data Centers
Background context: Consider an inventory service deployed across two data centers with databases in each center that synchronize via replication. This setup can help distribute the load and ensure high availability, but it introduces challenges related to consistency and partition tolerance.

:p In this scenario, what could happen if the network link between the two data centers fails?
??x
If the network link between the two data centers fails, writes made to one database might not be propagated to the other. This can lead to inconsistencies where reads from one node might return different versions of data than those read from another node due to unreplicated updates.
x??

---


#### Handling Partition Failures with Replication
Background context: When partition failures occur in a distributed system, replication techniques are used to ensure that changes made in one part of the network can eventually be propagated to other parts. However, this introduces challenges in maintaining consistency across all nodes.

:p How does replication help handle partition failures?
??x
Replication helps by ensuring that data is copied and synchronized between multiple nodes. Even if a node becomes isolated (partitioned), it will still have access to the most recent data from its local or other replicated sources, thus maintaining availability and helping to recover consistency when communication is restored.
x??

---


#### Trade-offs in Distributed Systems
Background context: The CAP theorem highlights that achieving all three properties—consistency, availability, and partition tolerance—is not possible in a distributed system. Designers must choose which two of these properties are most critical for their specific use case.

:p What does the CAP theorem imply about designing distributed systems?
??x
The CAP theorem implies that when designing distributed systems, designers must make trade-offs between consistency, availability, and partition tolerance. For example, a system might prioritize strong consistency over availability in certain scenarios or choose high availability and eventual consistency to better handle network partitions.
x??

---

---


---
#### AP System
Background context: In a scenario where we don’t shut down the inventory service entirely, changes made to data in one data center (DC1) may not be immediately reflected in another data center (DC2). This leads to potentially stale data being served by nodes in DC2.
:p What does an AP system imply?
??x
An AP system refers to a situation where availability and partition tolerance are prioritized over consistency. Changes made in one node might not be seen by other nodes due to network partitions, resulting in some users seeing outdated or inconsistent data.
??x

---


#### Eventually Consistent Systems
Background context: To maintain high availability and partition tolerance (AP), systems often accept that data inconsistencies will exist temporarily. This means updates may take time to propagate across all nodes, leading to a state of eventual consistency.
:p What is the definition of an eventually consistent system?
??x
An eventually consistent system accepts that after a network partition heals, all nodes will eventually converge on the same state, but this synchronization might not happen immediately. Users might experience outdated data during the transition period.
??x

---


#### Sacrificing Availability for Consistency (CP System)
Background context: To ensure consistency across multiple nodes, nodes must communicate and coordinate updates. During a partition, if nodes cannot talk to each other, they lose the ability to enforce consistency rules, leading to potential inconsistency issues.
:p What happens when we need to maintain consistency but sacrifice availability?
??x
When maintaining consistency (C), nodes must stay in sync even during partitions. If nodes can't communicate, they might not be able to coordinate updates, resulting in an inability to serve requests until the partition heals and resynchronization occurs.
??x

---


#### Distributed Locking Challenges
Background context: Ensuring consistent reads across multiple database nodes requires transactional reads that involve locking mechanisms. However, implementing and managing these locks can lead to significant performance issues and complications.
:p What are the challenges of distributed locking in a multi-node system?
??x
Distributed locking is challenging because it involves coordinating between different nodes, which can be slow due to network latency. Additionally, ensuring consistency during reads and writes requires complex logic that might block other operations, making it difficult to implement reliably across multiple nodes.
??x

---


#### Example of Distributed Locking in Java
Background context: Implementing a distributed lock mechanism typically involves using external services like Redis or implementing custom solutions with care due to the complexity involved.
:p How can we illustrate the concept of distributed locking in Java?
??x
Implementing a distributed lock in Java might involve using an external service like Redis. Here is an example using Jedis, which provides a way to handle distributed locks:
```java
import redis.clients.jedis.Jedis;
import java.util.concurrent.TimeUnit;

public class DistributedLockExample {
    private final String lockKey = "lockKey";
    private static final int EXPIRE_TIME_IN_SECONDS = 30;

    public void acquireLock(Jedis jedis) throws InterruptedException {
        String result = jedis.set(lockKey, "1", "NX", "EX", EXPIRE_TIME_IN_SECONDS);
        if (result == null) {
            // Retry acquiring the lock after a brief delay
            Thread.sleep(500);  // Sleep for half a second before retrying
            acquireLock(jedis);
        }
    }

    public void releaseLock(Jedis jedis) {
        String script = "if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end";
        jedis.eval(script, 1, lockKey, "1");
    }
}
```
The `acquireLock` method attempts to set a key with an expiry time. If the lock is not acquired, it retries after a brief delay. The `releaseLock` method checks if the current client owns the lock before releasing it.
??x

---


#### CAP Theorem Overview
Background context explaining the core idea of the CAP theorem. It states that in distributed computer systems, it is impossible to simultaneously guarantee all three of these properties: Consistency (C), Availability (A), and Partition Tolerance (P). Typically, a system can only have at most two of these guarantees.
:p What does the CAP theorem state about distributed systems?
??x
The CAP theorem states that in any distributed system, it is impossible to simultaneously guarantee all three properties: Consistency (C), Availability (A), and Partition Tolerance (P). A system must sacrifice one of these properties. For instance, a system can be both consistent and available but not partition-tolerant.
x??

---


#### CP vs AP Systems
Background context discussing the trade-offs between CP and AP systems in distributed environments. Consistent, Partition-Tolerant (CP) systems prioritize consistency over availability and partition tolerance. Available, Partition-Tolerant (AP) systems sacrifice consistency for availability and partition tolerance. The decision on which to choose depends heavily on the specific requirements of the application.
:p What are the trade-offs between CP and AP systems?
??x
The trade-offs between CP and AP systems involve balancing consistency with availability and partition tolerance. CP systems ensure data is consistent across all nodes, but this can reduce availability if a node fails or network partitions occur. AP systems guarantee high availability by allowing stale reads during network partitions but may return inconsistent data. The choice depends on the application's requirements.
x??

---


#### Eventual Consistency
Background context explaining eventual consistency in distributed systems. In an eventually consistent system, all operations are processed and eventually completed successfully. Eventually, all nodes will reflect the same state; however, until that point, reads might return stale data.
:p What is eventual consistency?
??x
Eventual consistency ensures that all updates to a distributed database will be propagated across all replicas, but there may be a transient period where read operations can return inconsistent results due to concurrent writes. The system guarantees that if no new updates are made, eventually the state of all nodes will converge.
x??

---


#### Choosing Between AP and CP
Background context discussing how to decide between an AP or CP system based on business requirements. The decision depends on understanding whether a small amount of inconsistency is acceptable (AP) or if strong consistency is necessary at all times (CP).
:p How do you choose between AP and CP systems?
??x
You choose between AP and CP systems by assessing the impact of inconsistency in your application. If occasional stale reads are acceptable, such as in an inventory system where a few minutes of outdated data might be fine, then an AP system is suitable. For financial applications like banking, where every transaction must be consistent to avoid issues like double spending, a CP system is necessary.
x??

---


#### Microservice Consistency
Background context on how different services within the same application can have varying consistency requirements. An entire system doesn't need to be uniformly CP or AP; individual microservices can have different guarantees based on their specific use cases.
:p How can you design microservices with varying consistency needs?
??x
Designing microservices with varying consistency needs involves identifying critical paths where strong consistency is required and less-critical areas that can tolerate eventual consistency. For example, a catalog service might be AP to allow for better scalability, while an inventory or financial transaction service must be CP to ensure transactions are consistent.
x??

---


#### Sacrificing Partition Tolerance
Background context on the challenges of building systems without partition tolerance. A system without partition tolerance cannot operate over a network and must run as a single process locally, making it impractical for distributed applications.
:p Can a system sacrifice partition tolerance?
??x
A system can theoretically sacrifice partition tolerance by running as a single process on a local machine, but this makes the system unsuitable for distributed environments. Partition-tolerant systems are necessary when operations need to be performed across multiple nodes, ensuring availability and consistency in case of network partitions.
x??

---

---


#### Trade-offs in CAP Theorem
Background context explaining the trade-offs between Consistency, Availability, and Partition Tolerance as described by the CAP theorem. It's important to understand that while a system can fully achieve either consistency or availability (and sometimes both) in the absence of partitioning, in the presence of partitions, the choice is forced.

In practice, systems often provide nuanced trade-offs within these constraints. For example, with Cassandra, you can make different decisions for individual calls regarding how strictly consistent they need to be.

:p What are the key aspects of the CAP theorem as discussed?
??x
The key aspects of the CAP theorem revolve around the choices that must be made between Consistency (C), Availability (A), and Partition Tolerance (P). In practice, systems can offer a range of trade-offs within these constraints. For instance, in Cassandra, you have flexibility to decide how consistency is enforced on a per-operation basis.

```java
// Example pseudocode for different levels of read consistency in Cassandra
public class CassandraReadConsistency {
    public void readWithStrongConsistency() {
        // Perform read that blocks until all replicas confirm the value
    }

    public void readWithQuorumConsistency() {
        // Perform read with a quorum of replicas confirming the value
    }

    public void readWithSingleNodeConsistency() {
        // Perform read without waiting for any other replica
    }
}
```
x??

---


#### Nuanced Trade-offs in Cassandra
Background context explaining how Cassandra allows for nuanced trade-offs between consistency and availability, offering different levels of quorum settings.

:p How can you make different trade-offs with Cassandra?
??x
You can tailor the level of consistency for each read operation by choosing from various quorum settings. For example:
- You can wait until all replicas confirm the value (strong consistency).
- Or, use a quorum setting that requires confirmation from a majority but is faster.
- Alternatively, you can perform reads without waiting for any other replica to respond.

Here's an illustration:

```java
// Example pseudocode for different read consistency settings in Cassandra
public class CassandraReadConsistency {
    public void readWithStrongConsistency() {
        // Perform read that blocks until all replicas confirm the value
    }

    public void readWithQuorumConsistency() {
        // Perform read with a quorum of replicas confirming the value
    }

    public void readWithSingleNodeConsistency() {
        // Perform read without waiting for any other replica
    }
}
```
x??

---


#### Service Discovery in Microservices
Background context explaining how service discovery becomes critical as the number of microservices increases, highlighting its importance for monitoring and inter-service communication.

:p What is the primary challenge with managing multiple microservices?
??x
The primary challenge with managing multiple microservices lies in knowing where each service instance is running. This is crucial for tasks such as monitoring, load balancing, and ensuring that services can communicate effectively. With a growing number of microservices, this becomes increasingly complex.

For example:
- You might need to know which environment hosts the accounts service.
- Microservices that use the accounts service must have reliable information on where it resides.

```java
// Example pseudocode for basic service discovery
public class ServiceDiscovery {
    public String discoverServiceLocation(String serviceName) {
        // Logic to find and return the location of a given service
        return "http://localhost:8080";
    }
}
```
x??

---

---


#### DNS Service Discovery
Background context: DNS (Domain Name System) is a fundamental part of the internet, allowing us to map human-readable domain names to IP addresses. In microservices architecture, using DNS for service discovery can help developers quickly locate services without knowing their current IP addresses.

Relevant formulas or data: DNS has Time To Live (TTL) values which determine how long a client can cache an entry before checking if it has been updated. 

:p What is the main advantage of using DNS for service discovery in microservices?
??x
The main advantage of using DNS for service discovery is its simplicity and widespread support across different technology stacks. It allows services to be referred to by names rather than IP addresses, making it easier to manage instances that might change over time.

```java
// Example Java code snippet to resolve a domain name to an IP address
import java.net.InetAddress;
InetAddress ipAddress = InetAddress.getByName("accounts.musiccorp.com");
```
x??

---


#### Using Load Balancers with DNS
Background context: To mitigate the issues of stale entries and frequent updates, one can use DNS to point to a load balancer. The load balancer then manages routing traffic to individual instances.

Relevant formulas or data: Load balancing algorithms distribute incoming requests among available backend servers.

:p How does using a load balancer with DNS improve service discovery in microservices?
??x
Using a load balancer with DNS improves service discovery by decoupling the IP addresses of service instances from their domain names. The load balancer handles routing traffic to individual instances, which can be dynamically managed and updated without affecting the DNS entries.

```java
// Example Java code snippet for configuring a load balancer
import com.example.LoadBalancerConfig;

LoadBalancerConfig config = new LoadBalancerConfig();
config.addServer("192.0.2.1"); // Add an instance to the load balancer
config.removeServer("192.0.2.2"); // Remove an instance from the load balancer
```
x??

---

