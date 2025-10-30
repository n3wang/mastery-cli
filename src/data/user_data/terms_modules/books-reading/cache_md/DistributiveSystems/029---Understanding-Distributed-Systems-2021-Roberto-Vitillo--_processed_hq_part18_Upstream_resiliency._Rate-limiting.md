# High-Quality Flashcards: 029---Understanding-Distributed-Systems-2021-Roberto-Vitillo--_processed (Part 18)

**Rating threshold:** >= 8/10

**Starting Chapter:** Upstream resiliency. Rate-limiting

---

**Rating: 8/10**

#### Load Shedding
Background context: Servers receive requests without much control over their quantity, which can significantly impact performance. When servers operate at capacity, they should start rejecting excess requests to focus on processing existing ones.

The general idea is that overload should be measurable and actionable. For example, the number of concurrent requests being processed is a good candidate to measure server load; you just need to increment a counter when a new request comes in and decrease it when the server has processed and responded to the client.

:p What does the term "load shedding" refer to in this context?
??x
Load shedding refers to the process where a server starts rejecting incoming requests as soon as it detects that it is overloaded. This allows the server to focus on processing existing requests rather than handling new ones, which can degrade service quality further.
x??

---

#### Load Leveling
Background context: Load leveling introduces a messaging channel between clients and services to decouple load directed to the service from its capacity. The service processes requests at its own pace by pulling them from the channel instead of being pushed by the clients.

The pattern is well suited for fending off short-lived spikes, which the channels smooth out. This can be visualized as a buffer that averages out sudden bursts of traffic over time.

:p What is the purpose of load leveling in server architecture?
??x
Load leveling aims to protect a service from getting overloaded by introducing a messaging channel between clients and services. By smoothing out short-lived spikes, it allows the service to process requests at its own pace rather than being overwhelmed by sudden bursts of traffic.
x??

---

#### Rate Limiting
Background context: Rate limiting or throttling rejects a request when a specific quota is exceeded. This can be applied based on various factors like the number of requests seen within a time interval, the number of bytes received, etc. Quotas are typically applied to users, API keys, or IP addresses.

:p How does rate-limiting work in server architecture?
??x
Rate limiting works by rejecting a request when a specific quota is exceeded. For example, if a service has a quota of 10 requests per second per API key and receives an average of 12 requests per second from a particular API key, it will reject on average two requests per second tagged with that API key.

The server returns a response with a status code like 429 (Too Many Requests) along with additional details about the quota breach and a Retry-After header indicating how long to wait before making another request.
x??

---

#### Autoscaling
Background context: When services are under heavy load, they need to be scaled out. However, load shedding and load leveling can only help so much; if the load keeps increasing, eventually, rejecting requests starts to degrade service performance.

Autoscaling detects when a service is running hot and automatically increases its scale to handle additional load. This is often combined with rate limiting and load leveling to provide comprehensive protection against increased load.

:p What role does autoscaling play in handling increased load?
??x
Autoscaling plays the crucial role of automatically increasing the scale of a service when it detects that the service is running hot due to heavy load. This helps handle more requests without degrading performance by adding more resources or instances to distribute the load effectively.

```java
// Example of an auto-scaling policy in pseudocode
public class AutoScalingPolicy {
    private int currentScale;
    private int targetLoad;

    public void checkAndAdjustScale() {
        // Check if current scale is below target based on load metrics
        if (currentLoad > targetLoad) {
            increaseScale();
        } else {
            decreaseScale();
        }
    }

    private void increaseScale() {
        // Logic to add more resources or instances
        currentScale++;
    }

    private void decreaseScale() {
        // Logic to remove resources or instances
        currentScale--;
    }
}
```
x??

---

#### DDoS Attacks and Protection
Background context: Rate limiting doesn't fully protect against denial-of-service (DDoS) attacks, as throttled clients can continue hammering a service after getting 429s. However, rate limiting helps reduce the impact of such attacks.

Economies of scale offer true protection against DDoS attacks by distributing the load across multiple services behind a large frontend service. The cost is amortized among all services using it.

:p How do economies of scale protect against DDoS attacks?
??x
Economies of scale provide true protection against DDoS attacks by running multiple services behind a single large frontend service. Even if some backend services are attacked, the frontend can reject upstream traffic and withstand the attack. The cost of running this frontend is amortized across all services using it, making it more resilient to high volumes of unexpected traffic.

```java
// Pseudocode for handling DDoS with economies of scale
public class FrontendService {
    private List<Service> backendServices;

    public void processRequest(Request request) {
        // Check if the service is under attack
        if (isUnderAttack()) {
            rejectRequest();
        } else {
            distributeRequestToBackend(request);
        }
    }

    private boolean isUnderAttack() {
        // Logic to detect DDoS attacks based on metrics
        return getCurrentTraffic() > threshold;
    }

    private void distributeRequestToBackend(Request request) {
        // Distribute the request to a backend service
        Service backendService = getAvailableBackend();
        backendService.handleRequest(request);
    }

    private void rejectRequest() {
        // Reject the request and send 429 response
        sendResponse(429, "Too Many Requests");
    }
}
```
x??

---

**Rating: 8/10**

#### Rate-Limiting Overview
Rate-limiting is a technique used to restrict the number of requests that can be made to an API within a given time period. This is different from load shedding, which rejects traffic based on the local state of a process (like concurrent requests processed by it), whereas rate-limiting considers the global state of the system, such as total concurrent requests for a specific API key across all service instances.

:p What distinguishes rate-limiting from load shedding in terms of how they handle request rejection?
??x
Rate-limiting rejects traffic based on the global state of the system (like the total number of requests concurrently processed for a specific API key), whereas load shedding rejects traffic based on the local state of a process (like the number of requests currently processed by it).

x??

---

#### Single-Process Implementation of Rate-Limiting
In a single-process implementation, we aim to enforce a quota such as 2 requests per minute per API key. A naive approach involves using a doubly-linked list for each API key to store timestamps of recent requests and periodically purging old entries.

:p How does the naive single-process rate-limiting implementation work?
??x
The naive single-process rate-limiting implementation works by maintaining a doubly-linked list for each API key, storing the timestamps of the last N requests. When a new request comes in, it appends an entry to the list with its corresponding timestamp. Periodically, entries older than one minute are purged from the list. The process then checks if the list’s length exceeds the quota (e.g., 2 requests per minute) and denies further requests if necessary.

```java
public class RateLimiter {
    private Map<String, DoublyLinkedList<Long>> apiKeysToRequests;

    public RateLimiter() {
        apiKeysToRequests = new HashMap<>();
    }

    public boolean shouldRateLimit(String apiKey) {
        if (!apiKeysToRequests.containsKey(apiKey)) {
            apiKeysToRequests.put(apiKey, new DoublyLinkedList<>());
        }
        DoublyLinkedList<Long> requests = apiKeysToRequests.get(apiKey);
        
        // Append current timestamp
        long currentTime = System.currentTimeMillis();
        requests.add(currentTime);
        
        // Purge old timestamps
        Iterator<Long> iterator = requests.iterator();
        while (iterator.hasNext()) {
            long time = iterator.next();
            if (currentTime - time > 60_000) { // 1 minute in milliseconds
                iterator.remove();
            }
        }
        
        return requests.size() > 2; // Example quota of 2 requests per minute
    }
}
```

x??

---

#### Bucketing for Memory-Efficient Rate-Limiting
Bucketing involves dividing time into fixed-duration intervals and tracking the number of requests within each interval. This approach reduces memory consumption by avoiding the need to store individual timestamps.

:p How does bucketing help in implementing rate-limiting more efficiently?
??x
Bucketing helps in implementing rate-limiting more efficiently by reducing memory usage. Instead of storing individual timestamps, we divide time into fixed-duration intervals (buckets) and keep track of how many requests have been seen within each interval. This method ensures that the storage requirement does not grow as the number of requests increases.

```java
public class Bucket {
    private int counter;

    public void incrementCounter() {
        this.counter++;
    }

    public int getCounter() {
        return this.counter;
    }
}

public class RateLimiterBucketed {
    private Map<String, Bucket> buckets;
    private long currentTime;
    
    public RateLimiterBucketed() {
        buckets = new HashMap<>();
        resetTime();
    }
    
    public void requestReceived(String apiKey) {
        if (!buckets.containsKey(apiKey)) {
            buckets.put(apiKey, new Bucket());
        }
        
        String bucketKey = getBucketKey(currentTime);
        Bucket bucket = buckets.get(bucketKey);
        
        // Increment counter for the relevant bucket
        bucket.incrementCounter();
    }
    
    private void resetTime() {
        currentTime = System.currentTimeMillis();
    }
    
    private String getBucketKey(long time) {
        return (time / 60_000) + "min"; // Example of a 1-minute bucket
    }
}
```

x??

---

#### Sliding Window for Accurate Rate-Limiting
A sliding window is used to track the number of requests within a specific interval, providing accurate rate-limiting even when buckets overlap.

:p How does the sliding window technique work in rate-limiting?
??x
The sliding window technique works by maintaining a moving window that tracks the number of requests over a fixed duration. For example, if we are enforcing a quota of 2 requests per minute, the sliding window would move through the buckets to count the number of requests within its current position.

```java
public class SlidingWindowRateLimiter {
    private List<Bucket> buckets;
    
    public SlidingWindowRateLimiter(int bucketCount) {
        this.buckets = new ArrayList<>(bucketCount);
        for (int i = 0; i < bucketCount; i++) {
            this.buckets.add(new Bucket());
        }
    }
    
    public boolean shouldRateLimit(String apiKey, long currentTime) {
        // Determine the current bucket based on the sliding window
        int currentBucketIndex = (int)(currentTime / 60_000); // Example of a 1-minute bucket
        
        // Increment counter for the relevant bucket
        Bucket bucket = buckets.get(currentBucketIndex);
        if (!buckets.containsKey(apiKey)) {
            buckets.put(apiKey, new Bucket());
        }
        
        Bucket apiKeyBucket = buckets.get(apiKey);
        apiKeyBucket.incrementCounter();
        
        return sumOfWeights(buckets) > 2; // Example quota of 2 requests per minute
    }
    
    private int sumOfWeights(List<Bucket> buckets) {
        int totalRequests = 0;
        for (int i = Math.max(0, currentBucketIndex - windowLength); i <= currentBucketIndex; i++) {
            Bucket bucket = buckets.get(i);
            totalRequests += bucket.getCounter();
        }
        
        return totalRequests;
    }
}
```

x??

---

**Rating: 8/10**

#### Upstream Resiliency Approach for Rate Limiting

Background context: The chapter discusses an efficient approach to implementing rate limiting for API keys using a sliding window technique. This method involves maintaining two buckets per API key, each representing different time intervals (e.g., one-minute and three-minute windows). Each bucket holds the count of requests within its respective interval.

:p What is the primary challenge when implementing rate limiting for multiple service instances?
??x
The primary challenge is ensuring that the quota is enforced across all service instances since local state might not suffice.
x??

---

#### Distributed Implementation for Rate Limiting

Background context: When multiple processes handle requests, a shared data store is required to track the number of requests per API key. However, using transactions or batch updates can be costly and may lead to performance issues.

:p How does using an atomic get-and-increment operation help in managing rate limiting across multiple service instances?
??x
Using an atomic get-and-increment operation provides better performance compared to transactions. This approach allows processes to update the database asynchronously, reducing the load on the database.
x??

---

#### Bulkhead Pattern for Fault Isolation

Background context: The bulkhead pattern is used to isolate faults in one part of a service from affecting the entire system by partitioning shared resources.

:p What is the main benefit of using virtual partitions within the bulkhead pattern?
??x
The main benefit is that it makes it much less likely for another user to be allocated to the exact same virtual partition as a problematic user, thereby providing better fault isolation.
x??

---

#### Implementation Details of Virtual Partitions

Background context: Virtual partitions can be implemented by dividing service instances into smaller groups (partitions) and assigning each user to a specific partition. This limits the impact of one user's issue on other users.

:p How does introducing virtual partitions help in managing resource allocation?
??x
Introducing virtual partitions helps manage resource allocation by ensuring that a problematic user can only degrade resources within their assigned partition, thus minimizing the overall impact.
x??

---

#### Careful Application of Bulkhead Pattern

Background context: The bulkhead pattern is effective for isolating faults but must be applied carefully to avoid over-partitioning, which could negate the benefits of sharing resources across users.

:p What is a potential downside of creating too many partitions in the bulkhead pattern?
??x
Creating too many partitions can negate the economy-of-scale benefits of shared resources and introduce scaling problems. Some partitions may become much hotter than others.
x??

---

