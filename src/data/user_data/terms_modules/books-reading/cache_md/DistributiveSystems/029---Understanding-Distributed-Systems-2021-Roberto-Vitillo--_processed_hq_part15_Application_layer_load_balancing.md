# High-Quality Flashcards: 029---Understanding-Distributed-Systems-2021-Roberto-Vitillo--_processed (Part 15)

**Rating threshold:** >= 8/10

**Starting Chapter:** Application layer load balancing

---

**Rating: 8/10**

#### Application Layer Load Balancing (L7 LB)
Application layer load balancing is an HTTP reverse proxy that distributes requests across a pool of backend servers. At this level, the load balancer operates at the HTTP protocol and can inspect individual HTTP requests within the same TCP connection, which is crucial for handling modern protocols like HTTP/2 where multiple streams can be multiplexed over a single connection.
:p What is an application layer load balancer?
??x
An application layer load balancer, also known as L7 LB, functions as an HTTP reverse proxy that farms out requests to a pool of backend servers. It can inspect and route individual HTTP requests within the same TCP connection, making it more efficient for handling complex protocols like HTTP/2.
x??

---
#### Comparison with Layer 4 Load Balancers (L4 LB)
Layer 4 load balancers operate at the transport layer of the network stack, typically using TCP or UDP. They are faster but less feature-rich compared to L7 LBs as they do not understand the application-level protocols. This makes them suitable for protecting against certain DDoS attacks like SYN floods.
:p How does a Layer 4 load balancer differ from an Application Layer Load Balancer?
??x
A Layer 4 load balancer operates at the transport layer (TCP or UDP) and is faster because it deals with lower-level protocols. In contrast, an Application Layer Load Balancer (L7 LB) works at the application level and can understand and manipulate HTTP requests, which allows for advanced features such as rate limiting, TLS termination, and session persistence.
x??

---
#### Sticky Sessions in L4 vs. L7 LB
In both L4 and L7 load balancers, sticky sessions can be implemented using consistent hashing to map a session identifier (like a cookie) to a specific server. However, this can create hotspots if some sessions are more expensive to handle than others.
:p What is the role of sticky sessions in load balancing?
??x
Sticky sessions allow client requests to always be directed to the same backend server, typically implemented using consistent hashing with session identifiers like cookies. While useful for maintaining state across multiple requests from a single user, it can lead to hotspots if some servers are more loaded than others.
x??

---
#### Use Case of L7 LBs
L7 LBs are often used as the backend for an L4 load balancer to handle external client requests coming from the internet. They offer more functionality but have lower throughput compared to L4 LBs, making them less suitable for protecting against certain DDoS attacks.
:p How are L7 LBs typically utilized in a network architecture?
??x
L7 LBs are used as backends for L4 load balancers to manage and distribute HTTP requests from external clients. They provide advanced features like session persistence and protocol-level inspection, which L4 LBs lack due to their lower layer operation.
x??

---
#### Limitations of Dedicated Load Balancing Services
A potential drawback of using a dedicated load balancing service is that all traffic must go through it. If the load balancer goes down, services relying on it will also be affected. This highlights the importance of robust failover and redundancy strategies in network architectures.
:p What are the drawbacks of using a dedicated load balancing service?
??x
The main drawback of using a dedicated load balancing service is that all traffic must pass through it, which can introduce single points of failure. If the load balancer fails, it can disrupt the entire network's functionality. To mitigate this risk, robust failover and redundancy strategies are essential.
x??

---

**Rating: 8/10**

#### L7 Load Balancing with Sidecar Pattern

Background context: In modern microservices architectures, managing load balancing and other network-related functionalities can be complex. The traditional approach involves a dedicated load balancer service that needs to be scaled out and maintained separately from the application services.

The sidecar pattern addresses this by integrating these functionalities directly into the clients (in this case, applications) as processes running alongside them. This approach offloads the load balancing responsibilities from a central service to individual instances of the application, reducing the complexity and scaling requirements for the centralized load balancer.

:p How does the sidecar pattern work in load balancing?
??x
The sidecar pattern works by placing a process (sidecar) on each application node that handles network traffic. This process implements various functionalities such as load balancing, rate limiting, authentication, monitoring, etc., directly within the application's deployment environment. By doing so, it distributes these responsibilities across all nodes instead of relying on a single, potentially bottlenecked service.

This approach leverages proxies like NGINX, HAProxy, or Envoy to handle network traffic locally. For example, when an HTTP request comes in, the sidecar process first handles authentication and rate limiting before forwarding the request to the appropriate backend service.

```java
// Example of a simplified sidecar proxy logic
public class SidecarProcess {
    public void handleRequest(HttpRequest request) {
        // Check if the client is authenticated
        boolean isAuthenticated = authenticateClient(request);
        
        // Rate limit requests based on client IP and time window
        int remainingRequests = rateLimitRequest(request);
        
        // If authentication and rate limiting are successful, forward to backend service
        if (isAuthenticated && remainingRequests > 0) {
            String response = forwardToBackend(request);
            sendResponse(response);
        } else {
            logFailedRequest(request);
            rejectClient();
        }
    }
}
```
x??

---

#### Geo Load Balancing

Background context: Even with local load balancing, there can be latency issues when clients are located far from the server. Geo load balancing distributes traffic to data centers based on geographical proximity to reduce response times and improve performance.

DNS geoloadbalancing is an extension of DNS that considers a client's location (inferred from its IP) and returns a list of the closest L4 load balancers. The load balancer also needs to take into account the capacity and health status of each data center before routing traffic.

:p How does Geo Load Balancing ensure clients communicate with the geographically closest load balancer?
??x
Geo load balancing ensures that clients communicate with the geographically closest load balancer by leveraging DNS resolution techniques. The DNS server returns a list of IP addresses (VIPs) associated with the nearest data center based on the client's inferred location.

This process involves:
1. Determining the client's geographical location from its IP address.
2. Consulting a predefined mapping to find the closest data centers.
3. Returning the VIPs of these data centers in response to DNS queries.

For example, if a client is located in New York and querying for a service hosted globally, the DNS server might return the VIP of a load balancer in New York or another nearby region rather than one on the other side of the world.

```java
// Pseudocode for Geo Load Balancing logic
public class GeoLoadBalancer {
    public List<String> resolveNearestLoadBalancers(String service) {
        // Step 1: Determine client's geographical location based on IP address
        Location clientLocation = determineClientLocation(clientIP);
        
        // Step 2: Map the client's location to a list of nearest data centers
        List<DataCenter> nearestDataCenters = findNearestDataCenters(clientLocation);
        
        // Step 3: Return VIPs of these data centers
        return getLoadBalancerVIPs(nearestDataCenters);
    }
}
```
x??

--- 

Note: The Java code examples are simplified and serve to illustrate the concepts rather than providing a complete implementation.

**Rating: 8/10**

#### Single Leader Replication
Background context: This is a common approach to replicating data where client writes are exclusively sent to one leader node, which updates its local state and then asynchronously or synchronously replicates changes to followers. The Raft algorithm is an example of implementing this strategy.

:p What is the single leader replication model?
??x
In the single leader replication model, client writes are exclusively directed to a leader node, which handles the write operation and then asynchronously or synchronously updates its state before responding to the client. The leader then replicates these changes to one or more follower nodes.
??x

---

#### Asynchronous Replication
Background context: In asynchronous replication mode, when the leader receives a write request from a client, it sends out requests to followers for replication and responds back to the client even if the data hasn't been fully replicated. This approach is faster but not fault-tolerant.

:p What happens in an asynchronous replication scenario?
??x
In asynchronous replication, after receiving a write request from a client, the leader sends asynchronous requests to the followers to replicate the change. It responds back to the client before ensuring that the data has been fully replicated on all followers. This can lead to issues like data loss if the leader crashes before replicating the writes.
??x

---

#### Synchronous Replication
Background context: In synchronous replication, a write request is not considered complete until it is acknowledged by multiple replicas. This ensures strong consistency but may be slower due to waiting for all replicas.

:p What distinguishes synchronous replication from asynchronous?
??x
Synchronous replication requires that a write request be acknowledged by the majority of replicas before returning confirmation to the client. This approach provides stronger consistency guarantees but can introduce latency because it waits for multiple nodes to confirm the update.
??x

---

#### Trade-offs in Replication Strategies
Background context: Different replication strategies offer varying trade-offs between performance, fault tolerance, and data consistency.

:p What are the key trade-offs in replication strategies?
??x
Replication strategies balance factors such as performance (asynchronous vs. synchronous), fault tolerance (single leader with multiple followers), and data consistency (eventual vs. strong). Asynchronous replication is faster but can lead to inconsistencies if the leader fails, while synchronous ensures stronger consistency but introduces latency.
??x

