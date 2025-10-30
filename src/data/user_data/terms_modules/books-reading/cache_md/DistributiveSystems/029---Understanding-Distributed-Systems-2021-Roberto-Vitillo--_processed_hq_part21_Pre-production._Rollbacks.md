# High-Quality Flashcards: 029---Understanding-Distributed-Systems-2021-Roberto-Vitillo--_processed (Part 21)

**Rating threshold:** >= 8/10

**Starting Chapter:** Pre-production. Rollbacks

---

**Rating: 8/10**

#### Pre-production Environment
During this stage, the artifact is deployed and released to a synthetic pre-production environment. Although this environment lacks the realism of production, it's useful to verify that no hard failures are triggered (e.g., a null pointer exception at startup due to a missing configuration setting) and that end-to-end tests succeed. Because releasing a new version to pre-production requires significantly less time than releasing it to production, bugs can be detected earlier.

AWS, for example, uses multiple pre-production environments: Alpha, Beta, and Gamma.

:p What is the purpose of using a pre-production environment?
??x
The purpose of using a pre-production environment is to identify any potential hard failures or issues early in the deployment process before they reach the production environment. This helps ensure that the artifact is thoroughly tested and meets all necessary criteria before being deployed to actual users.

For example, you can deploy an artifact to one of these environments and run end-to-end tests to verify its functionality without affecting real user data.
x??

---

#### Canary Testing in Production
Once an artifact has been rolled out to pre-production successfully, the CD pipeline can proceed to the final stage and release it to production. The goal is to start by releasing it to a small number of production instances first.

This approach is also referred to as canary testing, where you gradually release new features or versions to a subset of your user base before rolling out to all users. This allows you to quickly identify any issues that might arise and mitigate them before they affect the entire user base.

:p How does canary testing work in production?
??x
Canary testing works by deploying the new artifact (or version) to a small number of production instances first, allowing you to monitor its behavior closely. This gradual rollout helps detect and address any issues early on without impacting all users at once.

For example:
```java
public class CanaryDeployment {
    public void deployToProduction(String artifact) {
        int totalInstances = 100; // Total number of production instances
        int canaryInstances = 10;  // Number of canary instances

        for (int i = 1; i <= totalInstances; i++) {
            if (i > totalInstances - canaryInstances) { // Start deploying to the rest
                System.out.println("Deploying artifact " + artifact + " to instance " + i);
                // Logic to apply the artifact on the production environment
            } else {
                continue; // Skip for now, continue with regular instances
            }
        }
    }
}
```
x??

---

#### Rollbacks in Continuous Delivery
After each step of the CD pipeline, it needs to assess whether the artifact deployment is healthy. If not, the release should stop and be rolled back.

Various health signals can be used to make that decision, such as end-to-end test results, latency metrics, error rates, alerts, and custom health endpoints. The pipeline should also monitor the health of upstream and downstream services to detect any indirect impacts of the rollout.

Additionally, there needs to be enough time (backtime) between steps to ensure they are successful. The CD pipeline can further gate backtime based on the number of requests seen for specific API endpoints to guarantee that the API surface has been properly exercised.

:p How does a rollback work in Continuous Delivery?
??x
A rollback in Continuous Delivery occurs when the health signals indicate an issue with the newly deployed artifact. If any health metric, such as latency or error rate, exceeds acceptable limits, the CD pipeline will stop and either automatically roll back to the previous version or trigger an alert for human intervention.

For example:
```java
public class RollbackMechanism {
    private boolean isHealthy = true; // Assume initial state is healthy

    public void checkHealth() {
        if (!isHealthy) { // If health signals indicate a problem
            System.out.println("Artifact deployment detected issues, rolling back...");
            // Logic to revert the artifact to previous version
        } else {
            System.out.println("Artifact deployment passed all checks.");
            // Continue with further deployments
        }
    }

    public void triggerAlert() {
        if (isHealthy) {
            return; // No need for an alert
        }
        System.out.println("Rollback triggered due to health issues.");
        // Logic to notify the on-call engineer and initiate rollback process
    }
}
```
x??

---

#### Backward Compatibility in Changes
One of the most common causes of backward-incompatibility is changing the serialization format used for persistence or inter-process communication (IPC). To safely introduce a backward-incompatible change, it should be broken down into multiple backward-compatible changes.

For example, if you need to change a messaging schema between a producer and consumer service in a backward incompatible way, this can be achieved by breaking it into three smaller steps:

1. **Prepare Change**: Modify the consumer to support both new and old formats.
2. **Activate Change**: Modify the producer to write messages in the new format.
3. **Cleanup Change**: Stop supporting the old format altogether once confidence is built that the activated change won't need a rollback.

:p How can you safely introduce backward-incompatible changes?
??x
To safely introduce backward-incompatible changes, they should be broken down into multiple smaller, backward-compatible steps. This ensures that the risk of breaking existing functionality is minimized and allows for easier rollbacks if needed.

For example:
```java
public class BackwardCompatibilityHandler {
    public void prepareChange() {
        System.out.println("Preparing to support both old and new formats.");
        // Logic to modify consumer service to handle dual format
    }

    public void activateChange() {
        System.out.println("Activating the new format for producers.");
        // Logic to modify producer service to write in new format
    }

    public void cleanupChange() {
        System.out.println("Cleanup: Stopping support for old format.");
        // Logic to remove old format support from consumer service
    }
}
```
x??

---

**Rating: 8/10**

#### Blackbox Monitoring vs White-box Monitoring
Background context: The text discusses two types of monitoring techniques used to assess system health and performance. Blackbox monitoring focuses on external visibility, while white-box monitoring delves into internal details via application-level measurements.

:p What are the key differences between blackbox and white-box monitoring?
??x
Blackbox monitoring reports whether a service is up or down from an external perspective without much internal visibility. It uses scripts to periodically test API endpoints and measure response times. In contrast, white-box monitoring provides detailed insights into the application's internal state through instrumented code that emits metrics.

Whitebox monitoring can help identify root causes of known hard-failure modes before they affect users.
x??

---

#### Metrics in Monitoring
Background context: Metrics are numeric representations of information collected over time and used to monitor system health. Modern monitoring systems allow tags (key-value pairs) to be added to metrics, increasing their dimensionality.

:p What is a metric in the context of monitoring?
??x
A metric in monitoring is an numeric representation of information measured over a time interval, often represented as a time-series. It consists of samples where each sample includes a floating-point number and a timestamp. Metrics can be tagged with key-value pairs (labels) to provide additional context, making it easier to slice and dice the data.

For example:
```json
{
    "metricName": "responseTime",
    "value": 100,
    "timestamp": "2023-04-05T10:00:00Z",
    "labels": {
        "cluster": "prod",
        "node": "node1"
    }
}
```
x??

---

#### Instrumentation for Metrics
Background context: To effectively monitor a service, developers need to instrument their code to emit metrics. This involves adding specific code that records various aspects of the system's operation.

:p How can you implement instrumentation in a Python-based HTTP handler?
??x
To implement instrumentation in an HTTP handler, you should add logging and timing details for each request:

```python
import time

def get_resource(id):
    resource = self._cache.get(id)
    
    # Cache hit or miss
    if resource is None:
        resource = self._repository.get(id)  # Remote call
    
    # Cache update
    self._cache[id] = resource
    
    # Timing and other metrics
    start_time = time.time()
    response_time = time.time() - start_time
    
    return resource

# Example of logging metrics
if not resource:
    log_metric('request.failed', 1, {'serviceRegion': 'EastUs2'})
```

Here, `log_metric` is a hypothetical function that logs the metric with appropriate labels.
x??

---

#### Event-based Metrics
Background context: Event-based metrics record events as they occur and are aggregated by a telemetry agent. This approach can be expensive due to high event ingestion rates.

:p What is an example of how event-based metrics could be implemented?
??x
Event-based metrics involve logging individual events whenever a service instance fails to handle a request:

```json
{
    "failureCount": 1,
    "serviceRegion": "EastUs2",
    "timestamp": 1614438079
}
```

This event is then sent to a telemetry agent, which batches and emits them periodically to a remote telemetry service for storage. This method allows for detailed tracking of issues but can be costly in terms of processing overhead.

To reduce cost at query time, pre-aggregation can be applied during ingestion.
x??

---

#### Pre-aggregation
Background context: To optimize event-based metrics, pre-aggregation is performed by aggregating samples over predefined time periods and storing summarized statistics. This reduces the load on the backend when querying historical data.

:p How does pre-aggregation work for metrics?
??x
Pre-aggregation involves summarizing metric values into a series of summary statistics (e.g., sum, average, percentiles) over predefined time intervals (1 second, 5 minutes, 1 hour). During ingestion, the telemetry backend can aggregate these samples.

For example:
```json
{
    "failureCount": {
        "EastUs2": [
            {"time": "00:00", "value": 561},
            {"time": "01:00", "value": 42},
            ...
        ]
    }
}
```

At query time, the best pre-aggregated period that satisfies the query is chosen. This minimizes the load on the backend and speeds up queries.
x??

---

**Rating: 8/10**

#### Pre-Aggregation on Clientside
Background context: To reduce bandwidth, compute, and storage requirements for metrics, we can pre-aggregate metrics on the clientside before sending them to a telemetry backend like AWS Watch6. This approach involves aggregating data at the source rather than waiting until it reaches the backend.

However, this comes with a trade-off: operators lose flexibility in re-aggregating metrics after ingestion since they no longer have access to the original events that generated these pre-aggregated metrics. For example, if you pre-aggregate over a 1-hour period and need to later analyze the data on a 5-minute granularity, it would require the original events.

Metrics are typically persisted in a time-series database in their pre-aggregated form because querying pre-aggregated data can be several orders of magnitude more efficient than processing raw events.
:p What is the main benefit of clientside pre-aggregation?
??x
The main benefits include reduced bandwidth, compute, and storage requirements. By aggregating metrics on the client side before sending them to the backend, you minimize the amount of data that needs to be transmitted and processed. This is particularly useful for applications with high data volume or limited network resources.
x??

---

#### Service-Level Indicators (SLIs)
Background context: SLIs are specific metric categories used primarily for alerting purposes. They measure one aspect of the service level provided by a service to its users, such as response time, error rate, throughput, availability, quality, and data completeness.

SLIs are typically represented with summary statistics like average or percentiles and defined using a ratio: good events over total number of events. This makes them easy to interpret; a value of 0 indicates the service is broken, while a value of 1 means everything is working as expected.
:p What is an example of a Service-Level Indicator (SLI)?
??x
An example of an SLI is response time, which measures the fraction of requests that are completed faster than a given threshold. It can be represented using percentiles to give a better understanding of the distribution of response times.
x??

---

#### Measuring Response Times
Background context: When measuring response times, it’s crucial to choose the right metric source and represent the data accurately. While metrics reported by services or load balancers can provide some insights, client-side metrics are often more meaningful because they account for end-to-end delays.

Response times should be represented with a distribution (e.g., percentiles) instead of an average, as averages can be skewed by extreme outliers.
:p Why is the response time measured using percentiles better than using the average?
??x
Measuring response time using percentiles is better than using the average because it provides a more accurate representation of the overall performance. Percentiles give insight into how many requests are experiencing specific response times, whereas averages can be skewed by extreme outliers.

For example:
```java
// Example code to calculate 90th and 99th percentile response times
public class ResponseTimeCalculator {
    List<Long> responseTimes = new ArrayList<>();
    
    public void logResponseTime(long time) {
        responseTimes.add(time);
    }
    
    public double getPercentile(double percentile) {
        Collections.sort(responseTimes);
        int index = (int)(responseTimes.size() * percentile);
        return responseTimes.get(index);
    }
}
```
In this example, logging response times and calculating percentiles helps in understanding the distribution of response times without being skewed by outliers. The 90th and 99th percentiles can be used to identify performance issues affecting a significant number of requests.
x??

---

#### Long-Tail Latencies
Background context: Long-tail latencies refer to extreme delays that occur infrequently but have a significant impact on user experience, especially for high-volume users. These delays are often represented using higher percentile values (e.g., 99th and 99.9th percentiles).

High variance in response times makes the average less representative of typical user experiences. Percentiles help in identifying such extreme cases that affect a small fraction of requests but can impact key performance metrics.
:p How do long-tail latencies impact service performance?
??x
Long-tail latencies significantly impact service performance because they represent extreme delays experienced by a small fraction of high-volume users. These delays, while infrequent, can have a substantial negative effect on user experience and overall system health.

For instance, even if 99% of requests are served quickly (e.g., within 1 second), a single request taking 10 minutes can severely skew the average response time, making it unrepresentative of typical performance. This is problematic because these high-latency events can impact the most profitable or critical users.
x??

---

#### Example for Conversion Rates
Background context: Studies have shown that high latencies can negatively affect conversion rates. Even a small delay in load times (100 milliseconds) can decrease conversion rates by 7%.

This emphasizes the importance of monitoring and addressing long-tail behaviors to maintain service performance and user satisfaction.
:p What is an example of how high latency impacts business metrics?
??x
An example of how high latency impacts business metrics is that a mere 100-millisecond delay in load times can hurt conversion rates by 7%. This highlights the critical importance of monitoring response times and long-tail latencies to ensure optimal user experience and maintain positive revenue outcomes.
x??

---

