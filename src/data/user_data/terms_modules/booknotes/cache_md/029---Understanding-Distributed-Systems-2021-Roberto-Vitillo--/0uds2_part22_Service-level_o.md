# High-Quality Flashcards: 029---Understanding-Distributed-Systems-2021-Roberto-Vitillo--_processed (Part 22)


**Starting Chapter:** Service-level objectives

---


#### Little's Law
Little's Law is a fundamental principle used to understand queuing systems. It states that the average number of items in a system (\(L\)) equals the average arrival rate (\(\lambda\)) multiplied by the average time an item spends in the system (\(W\)), or mathematically, \(L = \lambda W\).

:p What does Little's Law describe in terms of queuing systems?
??x
Little's Law describes that the number of items (or requests) in a system is equal to the rate at which items arrive multiplied by the average time each item spends in the system. This relationship helps predict and manage system performance, especially in scenarios involving threads and request handling.
x??

---

#### Impact of Network Congestion
When network congestion occurs, it can significantly affect the performance of services that rely on network communication. The example provided illustrates how even a small fraction of requests (1%) experiencing high latency due to network issues can drastically increase the response time for those specific requests.

:p How does network congestion impact service performance?
??x
Network congestion can lead to increased response times for affected requests, potentially causing service degradation. For instance, if 1% of requests experience a delay that is significantly higher than usual (e.g., 20 seconds instead of 200 ms), the system would need to allocate more resources (threads in this case) to handle these slow requests.

```java
// Pseudocode to illustrate thread allocation based on request processing time
public class ThreadManager {
    private int totalThreads = 2048; // Initial number of threads

    public void manageRequests(int requestsPerSecond, double avgResponseTime) {
        double highLatencyRequests = (requestsPerSecond * 0.01);
        long highLatencyTime = 20000; // 20 seconds in milliseconds
        int requiredThreadsForHighLatency = (int) Math.ceil((highLatencyRequests * highLatencyTime) / avgResponseTime);

        if (requiredThreadsForHighLatency > totalThreads) {
            totalThreads += requiredThreadsForHighLatency - totalThreads;
        }
    }
}
```
x??

---

#### Service-Level Objectives (SLO)
Service-Level Objectives are defined ranges of acceptable values for a Service-Level Indicator (SLI). They help in setting expectations and measuring the performance of services. An SLO can also be used to establish an SLA, which includes financial consequences when the SLO is not met.

:p What is the purpose of Service-Level Objectives?
??x
Service-Level Objectives define acceptable ranges for service performance metrics (SLIs) to ensure that a service operates as expected. They are crucial for alerting and prioritizing tasks, setting user expectations, and ensuring service reliability. For instance, an SLO might state that 99% of API calls should complete within 200 ms over a rolling window of one week.

```java
// Pseudocode to check if the current latency meets the SLO
public class ServicePerformance {
    private int totalRequests = 10000; // Number of requests per second
    private double errorBudget = 0.01; // 1% error budget

    public boolean isWithinSLO(double latency) {
        if (latency > 200) { // Latency threshold in ms
            return false;
        }
        return true;
    }

    public void updateErrorBudget(int failedRequests) {
        double currentFailedPercentage = (failedRequests / totalRequests);
        if (currentFailedPercentage >= errorBudget) {
            System.out.println("SLO violated. Error budget exceeded.");
        } else {
            System.out.println("Service is within SLO.");
        }
    }
}
```
x??

---

#### Importance of Error Budget
The error budget represents the tolerance for failure that a service can handle before it fails to meet its predefined performance targets. Monitoring and managing this budget helps in maintaining high service availability.

:p What does an error budget represent?
??x
An error budget defines how many failures (or latencies exceeding the threshold) are acceptable within a given time window without violating the SLO. For example, if 1% of requests can have latency higher than 200 ms over one week, then up to 100 out of 10,000 requests per second can experience delays.

```java
// Pseudocode for managing error budget
public class ErrorBudgetManager {
    private int totalRequestsPerSecond = 10000; // Total requests in the window
    private double maxErrorRate = 0.01; // Maximum allowable error rate

    public boolean isWithinBudget(int failedRequests) {
        double currentErrorRate = (failedRequests / totalRequestsPerSecond);
        if (currentErrorRate <= maxErrorRate) {
            return true;
        } else {
            System.out.println("Error budget exceeded.");
            return false;
        }
    }

    public void updateBudget(double newThreshold) {
        maxErrorRate = newThreshold;
    }
}
```
x??

---

#### Multiple SLOs with Different Time Windows
Having multiple SLOs with different time windows allows for more granular control over service performance and helps in making timely decisions. Shorter windows force quick action, while longer windows are better suited for long-term planning.

:p Why is it beneficial to have multiple SLOs?
??x
Having multiple SLOs with varying time windows provides a balance between immediate responsiveness and long-term strategic planning. Shorter windows ensure that issues are addressed promptly, reducing the impact on user experience. Longer windows allow for more strategic decision-making about resource allocation and feature development.

```java
// Pseudocode to manage multiple SLOs
public class MultiSLOManager {
    private double shortWindowThreshold = 0.99; // 99% threshold for a week
    private double longWindowThreshold = 0.95; // 95% threshold for a month

    public boolean checkShortWindowSLI(double latency) {
        if (latency > 200) {
            return false;
        }
        return true;
    }

    public boolean checkLongWindowSLI(double latency) {
        if (latency > 300) {
            return false;
        }
        return true;
    }
}
```
x??

---

#### Importance of Choosing the Right SLO Range
Choosing an appropriate range for SLOs is critical. Too loose a target will not detect user-facing issues, while too strict targets can lead to unnecessary micro-optimizations and diminishing returns.

:p How does the choice of SLO range impact service management?
??x
The choice of SLO range significantly affects how well you manage your service's performance. A too loose threshold might miss critical issues affecting users, leading to poor service quality. Conversely, a too strict threshold can result in excessive focus on minor optimizations that do not improve the overall user experience, leading to wasted engineering resources.

```java
// Pseudocode for setting SLO ranges
public class SLOSetting {
    private double initialRange = 0.9; // Initial comfortable range
    private double targetRange = 0.95; // Target stricter range

    public void adjustSLO(double userFeedback) {
        if (userFeedback == "good") {
            setTargetRange(targetRange);
        } else if (userFeedback == "bad") {
            setTargetRange(initialRange);
        }
    }

    private void setTargetRange(double newRange) {
        // Logic to update SLO range
    }
}
```
x??

---

#### Incident Importance and Error Budget
The importance of an incident can be measured by the amount of the error budget that it consumes. This helps in prioritizing repair tasks over features.

:p How is the importance of an incident determined?
??x
The importance of an incident is often measured by how much of the error budget it has consumed or will consume. For example, an incident that burns 20% of the error budget requires more attention than one consuming only 1%.

```java
// Pseudocode to measure incident impact
public class IncidentImpact {
    private double totalErrorBudget = 0.1; // 10% error budget in a week
    private double currentErrorBudgetUsage = 0.05; // Current usage

    public void updateErrorBudgetUsage(double additionalConsumption) {
        currentErrorBudgetUsage += additionalConsumption;
        if (currentErrorBudgetUsage > totalErrorBudget) {
            System.out.println("Critical incident detected.");
        }
    }

    public boolean isWithinThreshold(double newUsage) {
        return (currentErrorBudgetUsage + newUsage <= totalErrorBudget);
    }
}
```
x??

---

#### Documenting and Reviewing SLOs
Documentation and periodic review of SLOs ensure that they remain relevant and aligned with user needs. Regular updates help in adjusting targets based on changing requirements.

:p Why is it important to document and regularly review SLOs?
??x
Documenting and reviewing Service-Level Objectives (SLOs) ensures their relevance and effectiveness. It helps align the objectives with current user needs and business goals, preventing SLOs from becoming outdated or irrelevant over time.

```java
// Pseudocode for documenting and reviewing SLOs
public class SLOReview {
    private List<SLO> existingSLOs = new ArrayList<>(); // List of SLOs

    public void addNewSLO(SLO newSLO) {
        existingSLOs.add(newSLO);
    }

    public void reviewExistingSLOs() {
        for (SLO s : existingSLOs) {
            if (!s.isMet()) {
                System.out.println("Review SLO: " + s.getName());
            }
        }
    }

    public class SLO {
        private String name;
        private double target;
        private double current;

        public boolean isMet() {
            return current <= target;
        }

        // Constructor and other methods
    }
}
```
x??

---

#### Chaos Engineering for SLO Validation
Chaos engineering involves injecting controlled failures into production environments to test the resilience of services. This helps validate that resilience mechanisms work as expected and ensures dependencies can handle targeted service levels.

:p How does chaos testing help in validating SLOs?
??x
Chaos testing helps ensure that systems are resilient under unexpected conditions by simulating failures. For example, you might inject network latency or simulate high traffic to test if the system can still meet its SLOs despite these challenges. This approach not only validates resilience but also helps identify potential weaknesses in the service architecture.

```java
// Pseudocode for chaos testing
public class ChaosTesting {
    private double injectedLatency = 500; // Injected latency in ms

    public void testService() {
        int requests = simulateHighTraffic();
        long start = System.currentTimeMillis();

        for (int i = 0; i < requests; i++) {
            try {
                performRequest(); // Simulate request processing
                Thread.sleep(injectedLatency);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        long end = System.currentTimeMillis();
        double avgResponseTime = ((end - start) * 1000) / requests;

        if (avgResponseTime <= 200) {
            System.out.println("Service passed the test.");
        } else {
            System.out.println("Service failed the test. Latency too high.");
        }
    }

    private int simulateHighTraffic() {
        // Logic to simulate high traffic
        return 100;
    }

    private void performRequest() {
        // Simulate request processing logic
    }
}
```
x??


#### Alerting and Its Types

Alerting is a critical part of monitoring systems, where specific conditions trigger actions. Depending on severity and type, these actions can range from running automation to notifying human operators.

:p What are the two main types of alerts described in this context?
??x
The two main types of alerts are:

1. **Automation-Driven Alerts:** These involve running some form of automated action, such as restarting a service instance.
2. **Human-Driven Alerts:** These require immediate attention from human operators who might be on-call.

These alerts are designed to be actionable and not require the operator to spend time digging into dashboards for context.

x??

---

#### Precision vs Recall in Alerts

Alerting systems need to balance precision (the fraction of significant events over total number of alerts) with recall (the ratio of significant events that trigger an alert). High recall means more alerts, which can be useful but may also lead to noise. Conversely, high precision ensures fewer false positives but might miss critical issues.

:p How does the trade-off between precision and recall manifest in alerting systems?
??x
The trade-off between precision and recall is crucial for effective alerting:
- **Precision:** The fraction of significant events over total number of alerts.
- **Recall:** The ratio of significant events that triggered an alert.

High recall means more alerts, potentially leading to noise, while high precision ensures fewer false positives but might miss critical issues. 

For example, if you have a 99% availability SLO and want to configure an alert for it:
- A naive approach is to trigger an alert whenever availability goes below 99% in a short time window (e.g., an hour).
- This has high recall because the alert triggers frequently but low precision as it often doesn't capture the actual impact on the error budget.

:x??

---

#### Error Budget and Alerting

An SLO's error budget can be monitored to trigger alerts when a large fraction of it has been consumed. For instance, with a 99% availability SLO over 30 days:
- A naive alert might trigger after just one hour if the availability drops below 99%.

However, this approach has low precision because only 0.14% of the error budget is used (1 hour out of 30 days).

:p What issue arises when setting an alert based on a short time window?
??x
When setting an alert based on a short time window, the main issue is low precision due to noise and infrequent true positives.

For example:
- If you set an alert for availability going below 99% within one hour in a 30-day period:
  - Only 0.14% of the error budget is consumed when the alert triggers.
  
This means that being notified about such a small fraction of the error budget being used might not be critical.

:x??

---

#### Burn Rate and Alerting

The burn rate measures how fast the error budget is being consumed. It’s defined as the percentage of the error budget consumed over the percentage of the SLO time window elapsed. For an SLO with a 99% availability over 30 days, a burn rate of 1 means the error budget will be exhausted in 30 days.

:p How do you calculate the alert threshold for a given burn rate?
??x
To calculate the alert threshold:
- Rearrange the formula to find the burn rate that triggers an alert when a specific percentage of the error budget has been consumed within a specified window.
  
For example, to trigger an alert when 2% of the error budget has been burned in one hour (30 days SLO):
1. **Given:**
   - Error budget consumed = 0.02
   - Time period elapsed = 1 hour = 720 hours
   - SLO period = 1 day = 720 hours

2. **Burn rate calculation:**
   \[
   \text{burnrate} = \frac{\text{errorbudgetconsumed}}{\text{timeperiodelapsed}} = \frac{0.02}{\frac{1 \, \text{day}}{30 \, \text{days}}} = 6
   \]

3. **Set the threshold:**
   - The burn rate should be set to 14.4 to trigger an alert when 2% of the error budget has been burned in one hour.

:x??

---

#### Multiple Alerts Based on Burn Rate

Using multiple alerts with different thresholds can improve recall by ensuring that critical issues are not missed due to false negatives. For example, a burn rate below 2 could be a low-severity alert that sends an email and is investigated during working hours.

:p How does setting multiple alerts with different thresholds help in monitoring SLOs?
??x
Setting multiple alerts with different thresholds helps improve recall while managing precision effectively:

- **Low-Severity Alerts:** For instance, if the burn rate is below 2 (indicating a slower consumption of the error budget), this could be set up to send an email and be investigated during working hours.
  
This approach ensures that operators are alerted only when necessary, reducing noise while maintaining critical oversight.

:x??

---


#### Alerting for Known Hard-Failure Modes
Background context: In monitoring systems, it's crucial to define alerts based on Service Level Objectives (SLOs) as they provide a clear threshold of service quality. However, there are scenarios where known issues persist without immediate solutions or design fixes. These can trigger hard-failure modes that need automated responses.
:p What is the purpose of defining an alert for a known memory leak in a service?
??x
Defining an alert for a known memory leak helps ensure the system remains resilient even if the root cause isn't resolved immediately. By automating a restart process when a service instance runs out of memory, you can prevent further degradation and potential cascading failures.
```java
// Example pseudocode for automated restart mechanism
public class MemoryLeakHandler {
    public void handleMemoryError() {
        // Log error
        System.out.println("Service is running low on memory. Initiating restart...");
        
        // Perform graceful shutdown or failover
        Service.instance().shutdown();
        
        // Restart the service automatically
        Service.instance().start();
    }
}
```
x??

---

#### SLO Dashboard
Background context: The SLO dashboard is designed for various stakeholders across an organization to gain visibility into system health based on SLOs. During incidents, it quantifies the impact on users by providing a summary of how well the service meets its defined objectives.
:p What is the primary function of an SLO dashboard?
??x
The primary function of an SLO dashboard is to provide stakeholders with an overview of the system's health in relation to predefined Service Level Objectives. It helps quantify and visualize the impact on users during incidents, ensuring transparency and accountability.
```java
// Example pseudocode for SLO dashboard component
public class SLODashboard {
    public void updateSLOData(double[] serviceLevels) {
        // Update dashboard with current SLO data
        for (double s : serviceLevels) {
            System.out.println("Current SLO: " + s);
        }
    }
}
```
x??

---

#### Public API Dashboard
Background context: The Public API dashboard is specifically designed to monitor metrics related to the system's public API endpoints. It helps operators identify problematic paths during incidents by providing detailed insights into request handling and response times.
:p What are some key metrics that a Public API dashboard should display?
??x
Key metrics that a Public API dashboard should display include:
- Number of requests received or messages pulled from a messaging broker
- Request size, authentication issues, etc.
- Request handling duration, availability, and response time of external dependencies
- Counts per response type, response sizes, etc.

Example pseudocode:
```java
// Example pseudocode for Public API dashboard component
public class PublicAPIDashboard {
    public void displayAPIMetrics() {
        System.out.println("Number of Requests: " + getRequestsReceived());
        System.out.println("Request Size (avg): " + getAverageRequestSize());
        System.out.println("Authentication Issues: " + getAuthIssuesCount());
        System.out.println("Response Duration: " + getHandlingDuration());
        System.out.println("External Dependency Availability: " + getDependencyAvailability());
    }
}
```
x??

---

#### Service Dashboard
Background context: The service dashboard is a broader category that covers various aspects of the system's health beyond just SLOs and API metrics. It provides operators with an overview of the overall service performance.
:p What are some categories of dashboards presented in the text?
??x
The categories of dashboards presented in the text include:
- **SLO Dashboard**: Designed for various stakeholders to gain visibility into system health based on SLOs.
- **Public API Dashboard**: Monitors metrics related to public API endpoints, helping operators identify problematic paths during incidents.

```java
// Example pseudocode for Service dashboard component
public class ServiceDashboard {
    public void displayServiceHealth() {
        System.out.println("SLO Health: " + getSLOHealthSummary());
        System.out.println("Public API Metrics: " + getAPIMetrics());
    }
}
```
x??

---

