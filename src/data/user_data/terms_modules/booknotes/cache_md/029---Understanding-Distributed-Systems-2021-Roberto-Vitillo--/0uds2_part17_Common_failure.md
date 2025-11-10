# High-Quality Flashcards: 029---Understanding-Distributed-Systems-2021-Roberto-Vitillo--_processed (Part 17)


**Starting Chapter:** Common failure causes. Risk management

---


#### Single Point of Failure (SPoF)
Background context: A single point of failure is a component that, if it fails, will bring down the entire system. This issue is particularly prominent in distributed systems where having a critical component as a singular point can lead to catastrophic failures.

:p What is a single point of failure and why is it problematic?
??x
A single point of failure (SPoF) occurs when a single component's failure can bring down an entire system. For example, if a service reads configuration from a non-replicated database, the database being unavailable means the service cannot start or restart.
```java
// Example code where a database is used as a single point of failure
public void startService() {
    try {
        // Reading config from a non-replicated database
        Config config = readConfigFromDatabase();
        // Rest of the service logic
    } catch (DatabaseUnreachableException e) {
        System.out.println("Service cannot start due to database unavailability.");
    }
}
```
x??

---

#### Unreliable Network
Background context: In distributed systems, network unreliability can cause delays or loss of requests and responses. Understanding the reasons for network unreliability is crucial for designing robust systems.

:p What are some common reasons why a client might not receive a response from a server?
??x
There could be several reasons:
1. The server is slow.
2. The client's request was dropped by a network switch, router, or proxy.
3. The server has crashed while processing the request.
4. The server’s response was dropped by a network switch, router, or proxy.

Example of how these issues can manifest in code (using HTTP requests):
```java
// Pseudocode for making an HTTP request and handling potential issues
public void makeRequest() {
    try {
        // Making an HTTP GET request with no timeout
        HttpURLConnection conn = (HttpURLConnection) new URL("http://example.com/api").openConnection();
        int responseCode = conn.getResponseCode();
        if(responseCode == 200) {
            // Handle success
        }
    } catch (IOException e) {
        System.out.println("Request failed: " + e.getMessage());
    }
}
```
x??

---

#### Slow Processes and Resource Leaks
Background context: Slow processes can significantly impact system performance, especially if they are caused by resource leaks. Memory leaks are a common type of leak that can lead to increased memory consumption over time.

:p What is a memory leak and how does it affect the system?
??x
A memory leak occurs when allocated resources (especially memory) are not properly released back into the pool, causing a steady increase in memory usage over time. This leads to excessive resource consumption until eventually, the system runs out of physical memory or swap space.

Example code demonstrating a memory leak:
```java
// Pseudocode for a potential memory leak due to reference leakage
public class MemoryLeakExample {
    public void run() {
        List<Thread> threads = new ArrayList<>();
        while (true) {
            Thread t = new Thread(() -> {
                // Simulate long-running task that holds onto references
                while(true);
            });
            threads.add(t);
            t.start();
        }
    }
}
```
x??

---

#### Unexpected Load
Background context: Distributed systems must handle unexpected load gracefully. The system's performance can degrade when faced with sudden spikes in traffic, which might not be anticipated during regular operations.

:p How can an unexpected load impact a system and what are some examples?
??x
An unexpected load can significantly impact a system by causing it to exceed its capacity, leading to timeouts, failed requests, and service degradation. For example:
- Seasonal changes in request rates.
- Malicious attacks like DDoS.
- Malicious users using the application in ways not intended.

Example of handling unexpected load with rate limiting:
```java
// Pseudocode for implementing rate limiting
public class RateLimiter {
    private final int maxRequestsPerMinute;
    private long lastRequestTime = 0;

    public RateLimiter(int maxRequestsPerMinute) {
        this.maxRequestsPerMinute = maxRequestsPerMinute;
    }

    public boolean canProceed() {
        long now = System.currentTimeMillis();
        if (now - lastRequestTime < 60000) { // 1 minute
            return false;
        }
        lastRequestTime = now;
        return true;
    }
}
```
x??

---

#### Cascading Failures
Background context: Cascading failures occur when a failure in one part of the system leads to subsequent failures, spreading throughout the entire system. This phenomenon can be devastating and hard to manage once it starts.

:p What is a cascading failure and how does it manifest?
??x
A cascading failure happens when a portion of an overall system fails, increasing the probability that other parts will fail as well. For example:
- A load balancer managing two database replicas (A & B).
- When one replica (B) becomes unavailable due to network issues.
- The remaining replica (A) takes on additional load, causing it to become unavailable.

Example of a cascading failure scenario:
```java
// Pseudocode for simulating a cascading failure
public class LoadBalancer {
    private final List<DatabaseReplica> replicas;
    private int totalLoad = 0;

    public LoadBalancer(List<DatabaseReplica> replicas) {
        this.replicas = replicas;
    }

    public void addLoad(int load, DatabaseReplica replica) {
        if (replica.isAvailable()) {
            totalLoad += load;
            // Simulate additional load on A
        } else {
            System.out.println("Replica B is down; shifting load to A.");
        }
    }
}
```
x??

---

#### Risk Management
Background context: Managing risks in distributed systems involves assessing the probability of failure and its potential impact. By calculating a risk score, teams can prioritize which failures to address based on their likelihood and consequences.

:p How do you calculate a risk score for a specific failure?
??x
A risk score is calculated by multiplying the probability of a failure happening with the impact it would have if it does occur. This helps in deciding which failures to prioritize and act upon.
```java
// Pseudocode for calculating risk score
public class RiskManager {
    public int calculateRiskScore(double probability, double impact) {
        return (int)(probability * impact);
    }
}
```
x??


#### Timeout Mechanism for Network Calls
Timeouts are crucial when making network calls to prevent indefinite blocking and resource leaks. Without a timeout, your application might hang indefinitely if the network call fails or is slow to respond.

:p What is the importance of setting timeouts in network requests?
??x
Setting timeouts ensures that your application doesn't get stuck waiting for responses that may never come due to network issues or other problems. This helps in maintaining system responsiveness and prevents resource leaks such as unclaimed sockets. 

```javascript
// Example of using setTimeout with fetch API
const controller = new AbortController();
const signal = controller.signal;
const fetchPromise = fetch(url, {signal});
// No timeout by default.
setTimeout(() => controller.abort(), 10000);
fetchPromise.then(response => {
    // Request finished
});
```
x??

---

#### Default Timeouts in Popular Libraries
Many popular libraries and frameworks provide default timeouts that can lead to indefinite blocking if not properly configured. These defaults can cause issues such as resource leaks or unresponsive applications.

:p Which library has an infinite timeout by default, and why is this problematic?
??x
The `requests` library for Python uses a default timeout of infinity, meaning it will hang indefinitely if the network request fails to respond. This can lead to resource exhaustion and make your application non-responsive.

```python
# Example of using requests with no timeout
response = requests.get('https://github.com/', timeout=10)
```
x??

---

#### Configuration of Timeouts in .NET Core HttpClient
Modern HTTP clients often come with built-in timeout mechanisms, but they can be overridden or configured to suit specific needs. In .NET Core, the `HttpClient` has a default timeout that can be adjusted.

:p What is the default timeout for `.NET Core Http Client`, and how does it impact application behavior?
??x
The default timeout for `.NET Core HttpClient` is 100 seconds. This means if no response is received within 100 seconds, the request will time out. This setting can prevent indefinite blocking but should be adjusted based on the expected average response times.

```csharp
// Example of configuring a custom timeout in .NET Core Http Client
var client = new HttpClient {
    Timeout = TimeSpan.FromSeconds(60)
};
```
x??

---

#### Measuring False Timeout Rate and Monitoring Network Calls
To achieve optimal performance, it's essential to set timeouts based on the desired false timeout rate. This involves measuring the response time of remote calls and setting the timeout at a higher percentile to minimize false positives.

:p How should you determine the appropriate timeout value for network requests?
??x
You should set your timeouts based on the 99.9th percentile of the remote call's response time, which can be measured empirically. This approach helps in minimizing false timeouts while ensuring high availability.

```java
// Pseudocode to measure and set timeout based on empirical data
long latency = measureRemoteCallLatency();
double desiredFalseTimeoutRate = 0.1; // 0.1% false timeoutrate
long timeout = (long) (latency * (1 - Math.log(1 - desiredFalseTimeoutRate)));
```
x??

---

#### Client-Side vs Server-Side Timeouts
Timeouts are necessary on both client and server sides to handle network latencies, resource management, and prevent indefinite blocking. Client-side timeouts manage resources like sockets efficiently.

:p Why is setting a timeout important for client-side operations?
??x
Setting a timeout on the client side prevents socket exhaustion by ensuring that unresponsive or slow servers do not hold onto resources indefinitely. This helps in maintaining the application's responsiveness and stability.

```javascript
// Example of setting a client-side timeout using XMLHttpRequest
var xhr = new XMLHttpRequest();
xhr.open('GET', '/api', true);
xhr.timeout = 10000; // Set timeout to 10 seconds
xhr.onload = function () {
    // Request finished
};
xhr.ontimeout = function (e) {
    // Request timed out
};
xhr.send(null);
```
x??

---

#### Integration Monitoring for Network Calls
Proper monitoring of network calls is essential to track their lifecycle, including duration, status codes, and timeout triggers. This helps in diagnosing issues and optimizing application performance.

:p What should be included in the monitoring of network calls?
??x
Monitoring should include metrics such as call duration, status codes received, and whether a timeout was triggered. These metrics help in understanding the health and performance of your network operations.

```java
// Example of logging important details from a network call
public void logNetworkCallMetrics(HttpResponse response) {
    long startTime = System.currentTimeMillis();
    String statusCode = response.getStatusCode();
    boolean timedOut = response.wasTimedOut();

    // Log or store these metrics for analysis
    logger.info("Request took " + (System.currentTimeMillis() - startTime) + " ms, Status: " + statusCode);
}
```
x??


#### Exponential Backoff and Random Jitter
Background context: When a network request fails or times out, it is important to handle retries intelligently. Exponential backoff is a common strategy where each retry has an exponentially increasing delay before the next attempt. However, this can lead to simultaneous retries from multiple clients, causing load spikes and further degrading service performance.

If applicable, add code examples with explanations:
```java
public void makeNetworkCall() {
    int initialBackOff = 2; // seconds
    int cap = 8; // seconds
    for (int attempt = 1; ; attempt++) {
        long delay = Math.min(cap, initialBackOff * Math.pow(2, attempt - 1));
        try {
            // Make the network call with timeout and backoff handling
            break;
        } catch (Exception e) {
            // Log the exception or retry after exponential backoff
            Thread.sleep(delay);
        }
    }
}
```
:p How does exponential backoff work to handle retries in a network request?
??x
Exponential backoff works by increasing the delay between each retry attempt. The initial delay is multiplied by an exponentially growing factor (typically 2) for each subsequent retry until it reaches a maximum cap value.

For example, if `initialBackOff` is set to 2 seconds and `cap` is set to 8 seconds:
- First retry: 2 seconds
- Second retry: 4 seconds (2 * 2)
- Third retry: 8 seconds (4 * 2)

The delay will be capped at 8 seconds after the third attempt.
x??

---
#### Random Jitter in Exponential Backoff
Background context: To avoid simultaneous retries from multiple clients, which can cause load spikes, random jitter is introduced into the backoff strategy. This spreads out the retry times over a period of time, reducing the risk of overwhelming the downstream service.

:p How does introducing random jitter help in managing retries?
??x
Introducing random jitter helps by adding variability to the delay between retry attempts. Instead of all clients retrying at exactly the same calculated delay, some randomness is added so that the retry times spread out over a range of time. This reduces the likelihood of multiple clients hitting the service simultaneously.

For example, with an initial backoff of 2 seconds and a cap of 8 seconds:
- Delay = random(0, Math.min(cap, initialBackOff * 2^attempt))
x??

---
#### Retry Amplification
Background context: When retries are implemented at multiple levels in a dependency chain, it can lead to retry amplification. If an intermediate service retries its request, the upstream service will see a longer execution time for its own request. This can trigger additional retries by the upstream service, causing a cascade of retries that potentially overwhelm the entire system.

:p How does retry amplification occur in a service dependency chain?
??x
Retry amplification occurs when retries are implemented at multiple levels within a dependency chain. If an intermediate service retries its request, it will take longer for the upstream service to receive a response. This increased latency can cause the upstream service to also retry, leading to more retries and potentially overwhelming the system.

For example:
- Client -> Service A -> Service B (fails) -> Service C (retries)
- Service A sees increased delay due to B's retry
- Service A retries its request to the client
x??

---
#### Circuit Breaker Overview
Background context: When a service relies on timeouts and retries for handling failures, it may continue retrying requests even when the issue is non-transient. This can lead to performance degradation and cascading failures. A circuit breaker helps by detecting long-term degradation of downstream dependencies and blocking new requests from being sent.

:p What is a circuit breaker?
??x
A circuit breaker is a mechanism that detects long-term degradation of downstream dependencies and prevents new requests from being sent to them, thus preventing the system from overloading. It allows sub-systems to fail gracefully without bringing down the entire system.

The circuit breaker has three states: open, closed, and half-open.
- **Closed**: Acts as a pass-through for network calls, tracking failures.
- **Open**: Blocks all requests until a threshold is met again.
- **Half-Open**: Allows one request through to test if the service is stable.
x??

---
#### Circuit Breaker State Machine
Background context: The circuit breaker operates using a state machine with three states: open, closed, and half-open. In the closed state, it tracks failures; in the open state, it blocks new requests. When a certain number of consecutive failures occur within a predefined interval, the circuit trips to the open state.

:p What are the three states of a circuit breaker?
??x
The three states of a circuit breaker are:
1. **Closed**: Acts as a pass-through for network calls and tracks failures.
2. **Open**: Blocks all requests until the service recovers.
3. **Half-Open**: Allows one request through to test if the service is stable.

In the closed state, it monitors failure rates; in the open state, no new requests are sent; and in the half-open state, a single request is allowed to see if the service has recovered before transitioning back to the closed state.
x??

---
#### Circuit Breaker Logic
Background context: The circuit breaker transitions between states based on failure counts and time intervals. If failures exceed a threshold within a predefined interval, it trips to the open state, blocking new requests until they stabilize.

:p How does the circuit breaker determine when to trip to the open state?
??x
The circuit breaker determines whether to trip to the open state by tracking failure rates over a defined time interval. When the number of failures exceeds a certain threshold within that interval, it trips and goes into the open state, blocking new requests.

For example:
- Track errors/timeouts in a 5-minute window.
- If more than X failures occur in this interval, trip to open state.
x??

---
#### Graceful Degradation with Circuit Breaker
Background context: When a downstream dependency is critical and must be maintained, the circuit breaker can degrade gracefully by redirecting requests or applying fallback logic instead of failing completely. This ensures that the overall system remains stable.

:p How does graceful degradation work with a circuit breaker?
??x
Graceful degradation works by allowing the circuit breaker to handle failures without crashing the entire system. When a critical dependency is down, it can degrade gracefully by using fallback logic or redirecting requests. For example:
- An airplane might lose a non-critical subsystem but still function and land.
- Amazon’s front page might render without recommendations if the recommendation service fails.

This ensures that partial failure does not cascade into full system failure.
x??

---

