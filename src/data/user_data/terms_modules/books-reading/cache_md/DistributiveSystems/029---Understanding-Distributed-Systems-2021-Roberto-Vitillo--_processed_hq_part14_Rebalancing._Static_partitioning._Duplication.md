# High-Quality Flashcards: 029---Understanding-Distributed-Systems-2021-Roberto-Vitillo--_processed (Part 14)

**Rating threshold:** >= 8/10

**Starting Chapter:** Rebalancing. Static partitioning. Duplication

---

**Rating: 8/10**

#### Rebalancing

Rebalancing is a process that occurs when the number of requests to the data store becomes too large, or the dataset's size becomes too large. To handle this, the number of nodes serving partitions needs to be increased. Conversely, if the dataset’s size keeps shrinking, the number of nodes can be reduced to minimize costs.

Rebalancing must be implemented in a way that minimizes disruption to the data store, ensuring it continues to serve requests efficiently. The amount of data transferred during rebalancing needs to be minimized to avoid impacting performance and availability.

:p What is rebalancing?
??x
Rebalancing refers to the process of adjusting the number of nodes serving partitions in a distributed system when the load or dataset size changes significantly. It aims to maintain an optimal distribution of work across nodes to ensure efficient data processing while minimizing disruption.
x??

---

#### Static Partitioning

In static partitioning, the idea is to create more partitions than necessary during the initialization phase and assign multiple partitions per node. When a new node joins, some existing partitions are moved to the new node, maintaining an always-balanced state.

However, this approach has limitations because the number of partitions is set at the beginning and can't be easily changed afterward. Having too many or too few partitions can lead to performance overhead or scalability issues respectively.

:p What is static partitioning?
??x
Static partitioning involves creating more partitions than necessary during system initialization and assigning multiple partitions per node. When a new node joins, existing partitions are redistributed to maintain balance. The main drawback is that the number of partitions cannot be easily changed after initialization.
x??

---

#### Dynamic Partitioning

Dynamic partitioning is an alternative where partitions are created on-demand rather than upfront. It starts with a single partition and splits it when it grows too large or becomes 'too hot'. Conversely, if adjacent partitions become small enough, they can be merged.

:p What is dynamic partitioning?
??x
Dynamic partitioning involves creating partitions as needed rather than upfront. It begins with a single partition that is split into smaller ones when necessary due to growth or high load (becoming "too hot"). Similarly, adjacent small partitions can be combined if they shrink in size.
x??

---

#### Practical Considerations

Introducing partitions adds complexity to the system even though it might seem simple on the surface. Ensuring balanced partitioning is crucial as a single hot partition can become a bottleneck and limit scalability.

Each partition operates independently, requiring atomic updates across multiple partitions for transactions.

:p What are practical considerations in introducing partitions?
??x
Practical considerations include added complexity due to partition management and the risk of partition imbalance leading to bottlenecks. Each partition being independent necessitates atomic transaction handling across multiple partitions.

Code Example:
```java
public class PartitionManager {
    public void updateMultiplePartitions(Transaction tx) {
        // Logic to ensure updates are atomic across multiple partitions
    }
}
```
x??

---

**Rating: 8/10**

#### Network Load Balancing
Network load balancing involves distributing network traffic across multiple servers to manage and balance the workload. This technique is particularly useful for horizontally scaling services by creating more instances of a service and using a load balancer (LB) to route requests to these instances.

:p What are the benefits of using network load balancing?
??x
The primary benefits include improved scalability, enhanced availability, and better resource utilization. By distributing requests across multiple servers, you can handle more traffic and avoid bottlenecks, especially when dealing with shared resources like databases or file systems. Additionally, the use of a load balancer abstracts the client from knowing which server is handling their request, allowing for transparent scaling.

```java
public class LoadBalancer {
    private List<Server> servers;
    
    public void distributeRequest(Request request) {
        Server selectedServer = selectRandomServer();
        selectedServer.handleRequest(request);
    }
    
    private Server selectRandomServer() {
        // Logic to randomly select a server from the list of servers.
        return this.servers.get(random.nextInt(this.servers.size()));
    }
}
```
x??

---

#### Load Balancing Algorithms
Load balancing algorithms are used to route requests to different servers in a pool. These algorithms can range from simple round-robin to more complex ones that consider factors like current load and server health.

:p What is an example of a simple load balancing algorithm?
??x
A common and simple approach is the round-robin algorithm, where requests are distributed cyclically among the available servers. This method ensures that each server gets roughly equal traffic over time.

```java
public class RoundRobinLoadBalancer {
    private List<Server> servers;
    private int currentIndex = 0;
    
    public void distributeRequest(Request request) {
        Server selectedServer = this.servers.get(currentIndex);
        selectedServer.handleRequest(request);
        currentIndex = (currentIndex + 1) % this.servers.size();
    }
}
```
x??

---

#### Load Metrics and Herding Effect
Load metrics are used by load balancers to determine the current state of servers. However, using these metrics can lead to a herding effect, where all requests are directed towards one server when it reports low load.

:p How does the herding effect work in load balancing?
??x
The herding effect occurs when a load metric is used without considering the overall load distribution. For instance, if a server reports a low load, but it's actually under heavy load due to recent requests, the load balancer might start sending more requests to that server. This can lead to an oscillation where the server alternates between being very busy and not at all, as seen in the example provided.

```java
public class LoadBalancerWithHerding {
    private List<Server> servers;
    
    public void distributeRequest(Request request) {
        Server selectedServer = selectLeastLoadedServer();
        selectedServer.handleRequest(request);
    }
    
    private Server selectLeastLoadedServer() {
        // Logic to select the least loaded server from a list.
        return this.servers.stream()
                           .min(Comparator.comparingInt(server -> getLoadMetric(server)))
                           .orElse(null);
    }
}
```
x??

---

#### Service Discovery Mechanisms
Service discovery is essential for load balancers as it allows them to find and route requests to available servers. There are several methods to implement service discovery, including static configuration files, DNS, and data stores.

:p What is a simple way to implement service discovery?
??x
A simple method involves using static configuration files that list the IP addresses of all servers. While this approach is straightforward, it can be challenging to manage and keep up-to-date as the number of servers grows.

```java
public class StaticServiceDiscovery {
    private List<String> serverIPs;
    
    public void discoverServers() {
        // Load the IP addresses from a static configuration file.
        String[] lines = loadFromFile("servers.conf");
        for (String line : lines) {
            this.serverIPs.add(line.trim());
        }
    }
}
```
x??

---

#### Health Checks
Health checks are used to detect when a server can no longer serve requests and needs to be temporarily removed from the pool. They can be passive or active.

:p What is an example of a passive health check?
??x
A passive health check is performed by the load balancer as it routes incoming requests to servers downstream. If a server is not reachable, the request times out, or the server returns a non-retriable status code (e.g., 503), the load balancer can decide to take that server out of the pool.

```java
public class PassiveHealthCheck {
    private List<Server> servers;
    
    public void performHealthChecks() {
        for (Server server : this.servers) {
            try {
                Request request = new Request();
                Response response = server.sendRequest(request);
                if (!response.isRetriable()) {
                    // Remove the server from the pool.
                    removeServer(server);
                }
            } catch (TimeoutException e) {
                // Remove the server from the pool due to timeout.
                removeServer(server);
            }
        }
    }
    
    private void removeServer(Server server) {
        this.servers.removeIf(s -> s.equals(server));
    }
}
```
x??

---

**Rating: 8/10**

#### DNS Load Balancing
Background context: DNS load balancing involves configuring a domain name system (DNS) to distribute incoming network traffic across multiple servers. This method uses DNS records that point to different IP addresses of the backend servers. When a client makes a request, it resolves the DNS record and connects to one of the available servers.
If applicable, add code examples with explanations:
:p How does DNS load balancing work?
??x
DNS load balancing works by updating the DNS records associated with a domain name to point to multiple IP addresses. Clients resolve the domain name and connect to any of the backend servers pointed to by the updated DNS record.

For example, suppose you have two web servers with IPs 192.0.2.1 and 192.0.2.2. You can add these IP addresses in your DNS records for `example.com`. When a client requests `http://example.com`, the DNS resolver will return one of these IPs, directing the request to either server.

```java
// Pseudo-code for adding multiple IP addresses to a DNS record
public class DnsRecordManager {
    public void addServersToDns(String domainName, List<String> ipAddresses) {
        // Update the DNS zone file or use an API to set the A records
        // For example:
        for (String ipAddress : ipAddresses) {
            updateARecord(domainName, ipAddress);
        }
    }

    private void updateARecord(String domainName, String ipAddress) {
        // Code to update the A record in the DNS zone file or via an API call
    }
}
```
x??

---

#### Transport Layer Load Balancing
Background context: Transport layer load balancing operates at the TCP level of the network stack and is also referred to as Layer 4 (L4) load balancing. It involves a load balancer that sits between clients and servers, distributing traffic among multiple backend servers based on a connection tuple.
:p How does transport layer load balancing work?
??x
Transport layer load balancing works by maintaining a pool of backend servers and using a load balancer to distribute incoming TCP connections across these servers. The load balancer uses a combination of IP addresses, ports, and hashing mechanisms to assign connections to specific servers.

For example, when a client initiates a connection with the load balancer's VIP (Virtual IP), the load balancer selects one of the backend servers based on a hash function applied to the source and destination tuples. The load balancer then forwards packets between the client and the chosen server, translating addresses as necessary.

```java
// Pseudo-code for transport layer load balancing
public class TransportLoadBalancer {
    private List<String> backendServers;

    public TransportLoadBalancer(List<String> servers) {
        this.backendServers = servers;
    }

    public String selectServer(String clientIP, int clientPort, String serverIP, int serverPort) {
        // Implement a consistent hashing algorithm to select a server
        // For example:
        String key = createKey(clientIP, clientPort, serverIP, serverPort);
        int hashValue = getHash(key);
        return backendServers[hashValue % backendServers.size()];
    }

    private String createKey(String clientIP, int clientPort, String serverIP, int serverPort) {
        // Create a unique key based on the connection tuple
        return clientIP + ":" + clientPort + "-" + serverIP + ":" + serverPort;
    }

    private int getHash(String key) {
        // Generate a hash value for the key
        // Example: use Java's built-in hashCode() method or a custom hashing function
        return Integer.parseInt(key.hashCode()) % backendServers.size();
    }
}
```
x??

---

#### Consistent Hashing
Background context: Consistent hashing is a technique used in load balancing to minimize disruption when adding or removing servers from the pool. It ensures that a small change (adding or removing a server) causes only a small number of connections to be reassigned.
:p What is consistent hashing and how does it work?
??x
Consistent hashing is a method used in load balancing where a hash function maps connection tuples to a ring, allowing for efficient reassignment when servers are added or removed. This technique minimizes the disruption caused by changes in the server pool.

For example, consider a circular hash ring with a set of server IDs hashed along it. When a new server is added, only a few segments of the ring need to be reassigned, ensuring minimal impact on existing connections.

```java
// Pseudo-code for consistent hashing implementation
public class ConsistentHashRing {
    private List<String> servers;

    public ConsistentHashRing(List<String> servers) {
        this.servers = servers;
    }

    public String getServer(String key) {
        int hashKey = hash(key);
        int minDist = Integer.MAX_VALUE;
        String closestNode = null;

        for (String server : servers) {
            int dist = Math.abs(hash(server) - hashKey);
            if (dist < minDist) {
                minDist = dist;
                closestNode = server;
            }
        }

        return closestNode;
    }

    private int hash(String value) {
        // Implement a custom or built-in hashing function
        return Integer.parseInt(value.hashCode());
    }
}
```
x??

---

#### Health Checks and Passive vs. Active Health Checks
Background context: Load balancers use health checks to determine the status of backend servers. These can be passive (listening for server-initiated heartbeats) or active (sending periodic probes to check server availability).
:p What are the differences between passive and active health checks?
??x
Passive health checks involve listening for heartbeat signals from the servers, while active health checks require the load balancer to periodically probe the servers directly.

For example, a passive health check might listen for TCP or HTTP keep-alive packets sent by the server. An active health check would send a request to the server's configured health endpoint and verify its response status.

```java
// Pseudo-code for implementing an active health check
public class HealthChecker {
    private String serverHealthEndpoint;

    public HealthChecker(String endpoint) {
        this.serverHealthEndpoint = endpoint;
    }

    public boolean isHealthy() {
        // Send a request to the health endpoint and evaluate its response
        try {
            URL url = new URL(serverHealthEndpoint);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            int statusCode = connection.getResponseCode();

            if (statusCode == 200) { // Example: assume 200 means healthy
                return true;
            }
        } catch (IOException e) {
            // Handle exceptions and consider the server unhealthy
        }

        return false;
    }
}
```
x??

---

#### Direct Server Return (DSR)
Background context: DSR is a mechanism that allows servers to bypass the load balancer and respond directly to clients, reducing latency. This is particularly useful when servers handle more data than they send.
:p What is direct server return (DSR) in the context of load balancing?
??x
Direct Server Return (DSR) is a technique where backend servers can bypass the load balancer and send responses directly to the client without passing through the load balancer. This reduces latency, especially when the amount of data sent by servers is significantly larger than the data they receive.

For example, in an HTTP setup, if a server has more incoming traffic (requests) than outgoing traffic (responses), it can be beneficial for the server to respond directly to clients without involving the load balancer.

```java
// Pseudo-code for enabling DSR
public class LoadBalancer {
    private List<String> backendServers;

    public void enableDirectServerReturn() {
        // Configure each backend server to return responses directly to clients
        for (String server : backendServers) {
            configureDsr(server);
        }
    }

    private void configureDsr(String server) {
        // Code to set up DSR configuration on the server
        // Example: update firewall rules or use specific API calls
    }
}
```
x??

