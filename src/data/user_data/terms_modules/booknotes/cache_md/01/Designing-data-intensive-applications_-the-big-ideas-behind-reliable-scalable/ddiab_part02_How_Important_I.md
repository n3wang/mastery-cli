# High-Quality Flashcards: Designing-data-intensive-applications_-the-big-ideas-behind-reliable-scalable_processed (Part 2)


**Starting Chapter:** How Important Is Reliability

---


#### Reliability Definition and Faults
Background context explaining reliability, faults, and failures. Typically, a reliable system should perform as expected under various conditions, including user errors and unexpected use cases.

A fault is usually defined as one component of the system deviating from its specification, whereas a failure is when the system as a whole stops providing the required service to the user.
:p What is a fault in the context of software reliability?
??x
A fault occurs when a component of the system does not adhere to its specified behavior. For instance, if a function is supposed to return a specific value but returns an incorrect one, it has a fault.
x??

---


#### Fault-Tolerant Systems and Tolerance Mechanisms
Background context explaining how fault-tolerant systems are designed to handle faults without causing failures.

Fault-tolerant or resilient systems are those that anticipate potential faults and have mechanisms in place to cope with them. These mechanisms aim to prevent faults from leading to system failure.
:p How do fault-tolerant systems ensure reliability?
??x
Fault-tolerant systems design their architecture to handle component-level deviations (faults) without the entire system failing. This is often achieved through redundancy, error detection, and recovery mechanisms.

For example, a simple approach could involve replicating critical components:
```java
public class FaultTolerantComponent {
    private Component primary;
    private Component backup;

    public FaultTolerantComponent(Component primary, Component backup) {
        this.primary = primary;
        this.backup = backup;
    }

    public void processRequest() {
        try {
            // Attempt to use the primary component
            primary.process();
        } catch (Exception e) {
            // If an error occurs, switch to the backup
            backup.process();
        }
    }
}
```
x??

---


#### Deliberate Fault Injection for Testing
Background context explaining why deliberate fault injection is used in testing fault-tolerant systems.

Deliberately introducing faults into a system can help ensure that the fault-tolerance mechanisms are robust and will handle real-world errors correctly.
:p Why would one want to introduce faults deliberately into a system?
??x
Deliberate fault injection helps test how well fault-tolerance mechanisms work in practice. By simulating unexpected conditions, developers can verify that their systems handle these scenarios gracefully without failing.

For example, randomly killing processes can be used as follows:
```java
public class FaultInjection {
    private List<Process> processes;

    public void injectFault() {
        Random random = new Random();
        int index = random.nextInt(processes.size());
        Process processToKill = processes.get(index);
        // Simulate a crash or failure of the selected process
        processToKill.fail();
    }
}
```
x??

---


#### Distinguishing Between Faults and Failures
Background context explaining that faults do not necessarily lead to failures, but it is important to design systems to prevent this from happening.

While a fault (a deviation from specifications) might occur, the system should be designed such that these deviations do not result in a failure (loss of service). The goal is to ensure that individual component issues are contained and do not cascade into larger system failures.
:p How can faults be managed to avoid system failures?
??x
Faults must be managed by ensuring they do not lead to failures. This involves designing fault-tolerant mechanisms such as redundancy, error detection, and recovery processes.

For example, a simple mechanism could involve logging and retrying:
```java
public class ErrorHandling {
    private Logger logger;

    public void handleRequest(Request request) {
        try {
            processRequest(request);
        } catch (Exception e) {
            logger.log(e);
            // Retry or fallback logic can be implemented here
        }
    }

    private void processRequest(Request request) {
        // Process the request and throw an exception if something goes wrong
        if (shouldFail()) {
            throw new RuntimeException("Simulated failure");
        }
        // Normal processing
    }

    private boolean shouldFail() {
        // Randomly decide to fail for testing purposes
        return new Random().nextBoolean();
    }
}
```
x??

---

---


#### Chaos Monkey and Fault Tolerance
Background context: The Netflix Chaos Monkey is a tool that introduces random failures into the system to ensure that it remains resilient. This approach tests whether the system can handle unexpected failures gracefully, promoting fault tolerance over absolute prevention of faults. While it's generally better to tolerate faults, there are instances where prevention might be more critical, such as in security matters.
:p What is the Netflix Chaos Monkey and why is it used?
??x
The Netflix Chaos Monkey is a tool that introduces random failures into the system to ensure resilience. It tests whether the system can handle unexpected failures gracefully, promoting fault tolerance over absolute prevention of faults.
x??

---


#### Redundancy and RAID Configurations
Background context: To reduce the failure rate of systems due to hardware components, redundancy is often used. Common techniques include setting up hard disks in a RAID configuration or using dual power supplies for servers. Datacenters may also have backup power solutions like batteries and diesel generators.
:p How can redundancy be implemented at the disk level?
??x
Redundancy at the disk level can be implemented through RAID configurations. For example, RAID 5 spreads data across multiple disks, allowing the system to continue operating even if one drive fails. RAID 6 provides similar functionality but with two parity drives for enhanced fault tolerance.
x??

---


#### Software Fault Tolerance in Cloud Platforms
Background context: As applications demand more resources and data volumes increase, cloud platforms like AWS are designed to prioritize flexibility and elasticity over single-machine reliability. This can lead to the loss of entire virtual machine instances without warning. To handle such failures, software fault-tolerant techniques are used.
:p What is the trade-off in cloud platforms like AWS?
??x
In cloud platforms like AWS, there is a trade-off between single-machine reliability and overall system flexibility and elasticity. AWS designs prioritize being able to spin up or shut down virtual machine instances quickly for better resource utilization, which can result in unexpected downtime of individual machines.
x??

---


#### Rolling Upgrades and Node-Level Patching
Background context: Systems that can tolerate the loss of entire machines are favored over single-server systems because they allow for patching one node at a time without affecting the whole system. This is known as a rolling upgrade, which is detailed in Chapter 4.
:p What is a rolling upgrade?
??x
A rolling upgrade is a process where changes or updates are applied to individual nodes of a distributed system while ensuring minimal disruption to the overall service availability. Nodes are patched one at a time, allowing the system to remain operational during the update process.
x??

---


#### Example Code for Rolling Upgrade
Background context: The following pseudocode illustrates how a rolling upgrade might be implemented in a simplified manner.

```java
public class RollingUpgrade {
    private List<Node> nodes;
    private int currentPatchIndex;

    public void performRollingUpgrade() {
        while (currentPatchIndex < nodes.size()) {
            Node node = nodes.get(currentPatchIndex);
            if (!node.isDown()) { // Check if the node is already down for maintenance
                applyUpdate(node); // Apply the update to the node
            }
            currentPatchIndex++;
        }
    }

    private void applyUpdate(Node node) {
        try {
            node.reboot(); // Reboot the node to apply updates
        } catch (Exception e) {
            log.error("Failed to reboot node: " + node.getId(), e);
        }
    }
}
```
:p How does this pseudocode illustrate a rolling upgrade?
??x
This pseudocode illustrates a rolling upgrade by iterating through each node in the system, applying an update to one node at a time while ensuring that the rest of the system remains operational. The `performRollingUpgrade` method ensures that only nodes not currently down for maintenance are patched, and it handles potential exceptions during the patch process.
x??

---


#### Systematic Software Errors
Background context: Systematic software errors are harder to anticipate and correlate across nodes. Examples include bugs that cause widespread crashes or resource exhaustion issues.

:p What is an example of a systematic software error?
??x
An example of a systematic software error is a bug in the Linux kernel, which caused many applications to hang simultaneously during a leap second on June 30, 2012.

For instance:
```java
public void handleLeapSecond(String input) {
    if (input.contains("leap")) {
        // Incorrectly handling the leap second can cause the application to crash.
        throw new RuntimeException("Leap second error");
    }
}
```
x??

---


#### Cascading Failures
Background context: Cascading failures occur when a small fault in one component triggers faults in other components, leading to further failures. These are particularly dangerous as they can propagate and affect the entire system.

:p What is a cascading failure?
??x
A cascading failure is a scenario where an initial fault or error in one part of a system leads to subsequent failures in other parts, often amplifying the impact and potentially causing widespread issues across the entire system. For example:
```java
public void processRequest(Request request) {
    try {
        // Process step 1
        if (stepOneFails()) throw new FailureException("Step 1 failed");

        // Process step 2
        if (stepTwoFails()) throw new FailureException("Step 2 failed");

        // Process step 3, which depends on steps 1 and 2
        if (!stepThreeDependsOnPreviousSteps()) throw new FailureException("Step 3 failed due to previous steps");
    } catch (FailureException e) {
        // Handle failure by potentially restarting or rolling back processes.
    }
}
```
x??

---


#### Quick Recovery from Human Errors
Background context: The importance of having mechanisms for quick recovery from human errors is crucial to minimize the impact when failures occur. This includes tools and processes that allow easy rollback of configuration changes, gradual rollout of new code, and reprocessing data if necessary.

:p What are some strategies to ensure a system can recover quickly from human errors?
??x
Strategies include:
1. **Rollback Mechanisms**: Implementing automated rollback capabilities for configuration changes.
2. **Gradual Rollouts**: Deploying new code in small increments to limit the impact of any unexpected bugs or issues.
3. **Data Recomputation Tools**: Providing tools to recompute data if it is discovered that the old computation was incorrect.

These strategies help maintain system stability and reduce downtime when errors occur.
x??

---


#### Detailed Monitoring (Telemetry)
Background context: Setting up detailed monitoring, often referred to as telemetry, is essential for tracking system performance and diagnosing issues. This includes collecting metrics like performance and error rates, which can provide early warning signals.

:p What does telemetry involve in software systems?
??x
Telemetry involves setting up comprehensive monitoring tools that collect various types of data such as:
- Performance Metrics: CPU usage, memory usage, response times.
- Error Rates: Counters for errors, exceptions, or failed operations.

This data helps in understanding system behavior and identifying potential issues before they escalate into critical problems. Monitoring can also be used to validate assumptions and constraints on the system's performance.

Example code snippet:
```java
public class Telemetry {
    public void logPerformanceMetric(String metricName, double value) {
        // Code to record a performance metric
    }
    
    public void reportError(String errorMessage) {
        // Code to log an error message
    }
}
```
x??

---


#### Importance of Reliability
Background context: While often associated with critical systems like nuclear power stations and air traffic control, reliability is crucial for all applications. Bugs in business applications can lead to productivity losses, while outages on e-commerce sites can result in significant financial damage.

:p Why is reliability important even for non-critical applications?
??x
Reliability is essential because:
- **Legal Risks**: Incorrect data reporting can lead to legal issues.
- **Financial Losses**: Outages of e-commerce sites can result in lost revenue and reputational damage.
- **User Trust**: Users expect consistent performance, especially in services that store personal or important data.

Even non-critical applications have a responsibility to ensure data integrity and service availability. For instance, if a photo application stores valuable memories for users, it must provide reliable backup mechanisms to avoid data corruption.
x??

---


#### Scalability
Background context: Scalability refers to the ability of a system to handle increased load over time. This is important because today's performance does not guarantee future reliability without considering how the system will scale.

:p What are the key factors in discussing scalability?
??x
Key factors include:
- **Load Parameters**: Describing the current load using relevant metrics such as requests per second, read/write ratios, or active users.
- **Growth Considerations**: Anticipating changes in load and planning how to cope with increased demand.

Example of describing Twitter's operations:
```java
public class TwitterOperations {
    public void postTweet(int tweetRate) {
        // Logic to handle posting tweets at a given rate
    }
    
    public void processHomeTimeline(int timelineReadsPerSecond) {
        // Logic to handle home timeline requests
    }
}
```
x??

---


#### Describing Load with Parameters
Background context: To discuss scalability, it is necessary to first define the current load on the system using specific metrics known as "load parameters." These parameters help in understanding how different parts of the system are stressed.

:p What are load parameters and why are they important?
??x
Load parameters are measurable values that describe the current state or expected growth of a system. They are crucial because:
- **Identification of Bottlenecks**: Helps identify which part of the system is under stress.
- **Future Planning**: Enables informed decisions about scaling strategies.

Example: For Twitter, load parameters might include:
- Tweets per second (write operations).
- Home timeline reads per second (read operations).

These metrics help in understanding the current state and planning for future growth.
x??

---


#### Example of Scalability Challenges - Twitter
Background context: Twitter's example illustrates how scalability challenges can arise from increasing load. The key operation is handling fan-out, where a user follows many people or is followed by many others.

:p How does Twitter handle its main operations of posting tweets and reading home timelines?
??x
Twitter handles these operations in two ways:
1. **Global Collection Approach**:
   - **Posting Tweets**: Insert the tweet into a global collection.
   - **Reading Home Timeline**: Query all users being followed, merge their tweets.

2. **Caching Approach**:
   - **Posting Tweets**: Update caches for each user's home timeline.
   - **Reading Home Timeline**: Quick retrieval from cached data.

The caching approach is more scalable because it reduces the load on read operations but increases write operations significantly.

Example code snippet (simplified):
```java
public class TwitterTimeline {
    public void postTweet(String tweet) {
        // Update global collection and caches for followers.
    }
    
    public List<String> getHomeTimeline(int userId) {
        // Retrieve from cache or merge data from database if cache is empty.
    }
}
```
x??

---


#### Batch Job Running Time in Theory vs. Practice

Background context: In an ideal world, the running time of a batch job is simply the size of the dataset divided by the throughput. However, in reality, there are additional factors that can increase this running time, such as data skew and waiting for the slowest task to complete.

:p How does the actual running time of a batch job differ from its theoretical running time?
??x
The actual running time is often longer than the theoretical running time due to issues like data skew and the need to wait for slower tasks. 
```java
// Example code snippet illustrating how skew can affect performance
public void processDataset(List<DataRecord> dataset, int numWorkers) {
    // Assume some records are much larger or take more time to process
    long startTime = System.currentTimeMillis();
    
    List<Future<Void>> futures = new ArrayList<>();
    for (int i = 0; i < numWorkers; i++) {
        Future<Void> future = executor.submit(() -> {
            for (DataRecord record : dataset) {
                if (record.getSkewFactor() > threshold) {
                    Thread.sleep(record.getSkewFactor()); // Simulate skew
                }
                process(record);
            }
            return null;
        });
        futures.add(future);
    }
    
    for (Future<Void> future : futures) {
        try {
            future.get(); // Wait for all workers to complete
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    long endTime = System.currentTimeMillis();
    double actualRunningTime = (endTime - startTime) / 1000.0;
    return actualRunningTime;
}
```
x??

---


#### Twitter's Scalability Challenge

Background context: Managing the high volume of data writes in real-time is a significant challenge for platforms like Twitter, where a single tweet can result in millions of write operations to home timelines within just five seconds. The distribution of followers per user (weighted by activity) plays a crucial role in determining the fan-out load.

:p What are some key factors that influence scalability in systems with high fan-out loads?
??x
Key factors include:
- The number of followers a user has.
- How often those users tweet, which can affect their write volume.
- Network and system resources available to handle these writes efficiently.
```java
// Pseudocode for calculating the effective load on a Twitter timeline
public double calculateEffectiveLoad(User user) {
    int fanOut = user.getFollowersCount();
    double tweetsPerSecond = getTweetsPerSecond(user);
    
    return fanOut * tweetsPerSecond;
}
```
x??

---


#### Performance Parameters in Batch Processing

Background context: In batch processing systems like Hadoop, the throughput is a crucial performance metric. Throughput refers to the number of records processed per second or the total time taken for running a job on a dataset of a certain size.

:p What does throughput measure in batch processing?
??x
Throughput measures the speed at which a system processes data in batch jobs, typically represented as the number of records processed per second or the total time to run a job over a specific dataset.
```java
// Example Hadoop MapReduce Job through- put calculation
public double calculateThroughput(long startTime, long endTime, int recordCount) {
    long duration = (endTime - startTime);
    return (double) recordCount / duration; // Records processed per second
}
```
x??

---


#### Response Time in Online Systems

Background context: In online systems, response time is critical as it represents the delay between a client sending a request and receiving a response. Latency refers to the waiting period during which a request is pending service.

:p What are latency and response time, and how do they differ?
??x
Latency and response time are often used interchangeably but differ slightly:
- Response Time: The total time from when a client sends a request until it receives a response. This includes actual processing time (service time), network delays, and queueing delays.
- Latency: The duration during which a request is waiting to be handled—this excludes the service time.

Example:
```java
// Simulating response time measurement in Java
public double measureResponseTime(Request request) {
    long startTime = System.currentTimeMillis();
    
    // Process request (service time)
    Service.process(request);
    
    long endTime = System.currentTimeMillis();
    
    return (endTime - startTime); // This represents the entire response time
}
```
x??

---


#### Measuring Performance as a Distribution

Background context: When measuring performance in systems, it's essential to consider the variability and distribution of response times rather than treating them as single values. This is because real-world systems handle various requests that can have different processing times.

:p Why do we need to think of response time as a distribution rather than a single value?
??x
We need to treat response time as a distribution because:
- Real-world systems process varied types and amounts of data, leading to different processing times.
- The same request might take different times each time it's sent due to varying conditions in the system.

```java
// Example code snippet measuring response time distribution
public List<Double> measureResponseTimes(int numRequests) {
    List<Double> responseTimes = new ArrayList<>();
    
    for (int i = 0; i < numRequests; i++) {
        long startTime = System.currentTimeMillis();
        
        // Simulate processing request
        Service.process(request);
        
        long endTime = System.currentTimeMillis();
        double duration = (endTime - startTime);
        responseTimes.add(duration);
    }
    
    return responseTimes;
}
```
x??

---


#### Outliers and High Percentiles
Background context explaining the concept. Include any relevant formulas or data here.
:p Why are high percentiles (tail latencies) important for understanding user experience, even if they affect a small percentage of requests?
??x
High percentiles, also known as tail latencies, are crucial because they directly impact the overall user experience. For instance, Amazon focuses on the 99.9th percentile to ensure that even the slowest 0.1% of requests (often valuable customers) have a fast experience.
```java
// Example calculation of high percentiles in milliseconds
public double calculateHighPercentile(List<Double> responseTimes, int percentile) {
    Collections.sort(responseTimes);
    int size = responseTimes.size();
    return responseTimes.get((int) Math.ceil((percentile / 100.0) * size - 1));
}
```
x??

---


#### Example Application: Amazon's Service Requirements
Background context explaining the concept. Include any relevant formulas or data here.
:p How does Amazon use percentiles to define service requirements, and why is this approach effective?
??x
Amazon defines response time requirements in terms of high percentiles, such as the 99.9th percentile, even though it only affects 1 in 1,000 requests. This approach ensures that valuable customers (those with more data on their accounts) have a good experience, which can improve overall satisfaction and sales.
```java
// Example of setting service requirements based on percentiles
public void setServiceRequirements(List<Double> responseTimes) {
    double p99 = calculateHighPercentile(responseTimes, 99);
    // Use p99 as the threshold for acceptable performance
}
```
x??

---


#### Trade-offs in Optimizing Percentiles
Background context explaining the concept. Include any relevant formulas or data here.
:p Why might optimizing very high percentiles (e.g., 99.99th percentile) be too expensive and not yield enough benefit?
??x
Optimizing very high percentiles can be costly because they are easily affected by random events outside of your control, such as network packet loss or mechanical vibrations in the server rack. The benefits from optimizing these extreme cases may not justify the costs due to diminishing returns.
```java
// Example cost-benefit analysis for optimizing percentiles
public boolean shouldOptimizeHighPercentile(List<Double> responseTimes) {
    double p999 = calculateHighPercentile(responseTimes, 99.9);
    // If the improvement is marginal and not significant enough, do not optimize further
    return (p999 - previousP999) < threshold;
}
```
x??

---

---


#### Service Level Objectives (SLOs) and Service Level Agreements (SLAs)
Background context explaining SLOs and SLAs, their purpose, and how they are used to define expected performance levels for services. The median response time and 99th percentile are often used as key metrics.
:p What is the primary role of an SLA in service management?
??x
An SLA defines the expected performance and availability of a service, ensuring that clients have clear expectations and can demand refunds if these standards are not met.
x??

---


#### Head-of-Line Blocking
Explanation of head-of-line blocking and its impact on response times. This phenomenon occurs when slow requests hold up the processing of subsequent requests, leading to increased overall latency.
:p What is head-of-line blocking?
??x
Head-of-line blocking is an effect where a single slow request in a queue can delay the processing of all subsequent requests, even if they are faster.
x??

---


#### Percentiles and Tail Latency Amplification
Explanation of how high percentiles (e.g., 99th percentile) are important indicators of tail latency, especially in services called multiple times per request. Discusses the concept of tail latency amplification where an end-user request can be slow due to a single slow backend call.
:p How does tail latency amplification affect service performance?
??x
Tail latency amplification refers to how a small number of slow backend calls can significantly impact the overall response time of an end-user request, even if most calls are fast. This is because the end-user request must wait for all parallel backend calls to complete before it finishes.
x??

---


#### Efficient Percentile Calculation
Explanation of why efficient calculation of percentiles over a rolling window of recent data points is important. Discusses methods like forward decay and t-digest that can approximate percentiles with minimal computational overhead.
:p What are some techniques for efficiently calculating response time percentiles?
??x
Techniques such as forward decay, t-digest, and HdrHistogram allow for efficient calculation of percentiles by minimizing CPU and memory usage. These algorithms help in maintaining performance while monitoring the distribution of response times over a rolling window.
For example, using the `t-digest` algorithm:
```java
import org.apache.commons.math3.ml.clustering.TDigest;

public class PercentileCalculator {
    private TDigest tdigest = new TDigest(0.01); // 99th percentile
    
    public void addResponseTime(double time) {
        tdigest.addPoint(time);
    }
    
    public double get99thPercentile() {
        return tdigest.percentile(0.99);
    }
}
```
x??

---

---

