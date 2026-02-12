# High-Quality Flashcards: 029---Understanding-Distributed-Systems-2021-Roberto-Vitillo--_processed (Part 19)


**Starting Chapter:** Health endpoint. Watchdog

---


#### Health Endpoint Mechanism
Health endpoints allow a server to signal its state to a load balancer. When queried, these endpoints can return 200 (OK) if the process is capable of serving requests or an error code if it is overloaded and cannot handle more requests.

If the health endpoint returns an error or times out, the load balancer considers the process unhealthy and removes it from the rotation. This mechanism is crucial for maintaining high availability as unresponsive servers can significantly reduce service reliability.
:p How does a health endpoint contribute to server resiliency?
??x
A health endpoint provides a way for a server behind a load balancer to inform the balancer about its operational state. By periodically querying this endpoint, the load balancer can determine if a server is capable of handling requests or is overloaded and needs to be taken out of rotation. This helps in maintaining service availability by ensuring that only healthy servers process incoming traffic.
x??

---

#### Aliveness Health Test
An aliveness health test involves performing a basic HTTP request from the load balancer to check if the process responds with a 200 (OK) status code, indicating it is alive and capable of serving requests.

This type of health check is simple but can be limited in scenarios where more granular monitoring is required.
:p What does an aliveness health test involve?
??x
An aliveness health test involves the load balancer sending a basic HTTP request to the process. If the response status code is 200 (OK), it indicates that the process is operational and can handle requests.

```java
public class HealthCheck {
    public int performHealthTest(String endpoint) {
        // Code to send HTTP GET request to endpoint
        return restTemplate.getForObject(endpoint, Integer.class);
    }
}
```
x??

---

#### Local Health Test
A local health test checks if the process is in a degraded or faulty state by monitoring local resources such as memory, CPU, and disk usage. The process sets threshold values for these metrics and reports itself as unhealthy when any metric breaches these thresholds.

This method provides a more detailed view of the server's condition compared to an aliveness check.
:p What does a local health test monitor?
??x
A local health test monitors internal resource states such as memory, CPU, and disk usage. The process defines upper and lower threshold values for these metrics. If any metric breaches one of these thresholds (either going above the upper limit or below the lower limit), the process reports itself as unhealthy.

```java
public class LocalHealthTest {
    private int memThreshold = 80; // Memory usage percentage threshold
    private long diskThreshold = 500 * 1024 * 1024; // Disk space threshold in bytes

    public boolean checkHealth() {
        int memoryUsage = getMemoryUsage();
        long freeDiskSpace = getFreeDiskSpace();

        if (memoryUsage > memThreshold || freeDiskSpace < diskThreshold) {
            return false;
        }
        return true;
    }

    private int getMemoryUsage() {
        // Code to retrieve current memory usage
        return 75; // Example value
    }

    private long getFreeDiskSpace() {
        // Code to retrieve free disk space
        return 1024 * 1024 * 600; // Example value
    }
}
```
x??

---

#### Dependency Health Check
A dependency health check monitors the performance of remote dependencies like databases. It measures response times, timeouts, and errors in interactions with these dependencies. If any measure breaches predefined thresholds, the process reports itself as unhealthy to reduce load on downstream services.

This type of health check is essential for ensuring that service reliability is not compromised due to failing external systems.
:p What does a dependency health check monitor?
??x
A dependency health check monitors response times, timeouts, and errors when interacting with remote dependencies such as databases. If any metric breaches predefined thresholds, the process reports itself as unhealthy.

```java
public class DependencyHealthCheck {
    private int maxResponseTime = 200; // Max allowed response time in ms
    private int maxTimeouts = 5; // Maximum number of allowed timeouts

    public boolean checkDependencyHealth() {
        long responseTime = getResponseTime();
        int numErrors = getNumErrors();

        if (responseTime > maxResponseTime || numErrors >= maxTimeouts) {
            return false;
        }
        return true;
    }

    private long getResponseTime() {
        // Code to retrieve database response time
        return 150; // Example value
    }

    private int getNumErrors() {
        // Code to count errors or timeouts
        return 2; // Example value
    }
}
```
x??

---

#### Watchdog Mechanism
A watchdog is a background thread in a process that periodically monitors its health. If any monitored metric breaches a configured threshold, the watchdog considers the process degraded and restarts it.

This mechanism provides self-healing capabilities by allowing processes to recover from transient issues without requiring manual intervention.
:p What is the role of a watchdog in maintaining system reliability?
??x
A watchdog is a background thread that monitors the health of a process. If any monitored metric breaches a configured threshold, the watchdog restarts the process. This mechanism helps maintain system reliability by automatically handling temporary issues and providing self-healing capabilities.

```java
public class Watchdog {
    private int memThreshold = 80; // Memory usage percentage threshold

    public void run() {
        while (true) {
            if (!checkHealth()) {
                restartProcess();
            }
            try {
                Thread.sleep(60000); // Sleep for 1 minute
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
    }

    private boolean checkHealth() {
        int memoryUsage = getMemoryUsage();

        if (memoryUsage > memThreshold) {
            return false;
        }
        return true;
    }

    private int getMemoryUsage() {
        // Code to retrieve current memory usage
        return 85; // Example value
    }

    private void restartProcess() {
        // Code to restart the process
    }
}
```
x??

---


#### Introduction to Testing and Operations
Historically, developers, testers, and operators were part of different teams. Developers handed over their software to a QA team for testing, then it moved to an operations team responsible for deployment, monitoring, and responding to alerts. This model is evolving as development teams now handle testing and operations themselves.
:p What does the evolution in the roles within development, testing, and operations signify?
??x
The evolution signifies that developers are now expected to have a broader perspective on their application's lifecycle, including testing and maintaining its functionality post-deployment. They must understand potential failures and prepare strategies to manage them effectively.
x??

---

#### Types of Tests
There are different types of tests such as unit, integration, and end-to-end tests which help in building confidence that distributed applications work as expected.
:p What are the three main categories of tests mentioned?
??x
The three main categories of tests are:
1. Unit tests - Test individual components or modules to ensure they function correctly independently.
2. Integration tests - Verify how different parts of the application interact with each other.
3. End-to-end tests - Simulate user scenarios to test the entire flow from start to finish.

For example, a unit test might look like this:
```java
public class CalculatorTest {
    @Test
    public void testAddition() {
        Calculator calc = new Calculator();
        assertEquals(5, calc.add(2, 3));
    }
}
```
x??

---

#### Continuous Delivery and Deployment Pipelines
Continuous delivery and deployment pipelines are used to release changes safely and efficiently into production.
:p What is the purpose of continuous delivery and deployment pipelines?
??x
The primary purpose of continuous delivery and deployment pipelines is to automate the process of integrating code changes, testing them, and deploying them to production environments. This ensures that new features or bug fixes can be delivered reliably without manual intervention.

Example pipeline steps might include:
1. Source Code Management (SCM)
2. Build
3. Test
4. Package
5. Deploy

Here is a simplified example of what the CI/CD setup might look like in YAML for Jenkins:

```yaml
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building code'
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying to production'
            }
        }
    }
}
```
x??

---

#### Monitoring Distributed Systems
Metrics and service-level indicators are used to monitor the health of distributed systems. This helps in defining objectives that trigger alerts when breached.
:p What tools can be used for monitoring the health of a distributed system?
??x
Tools like Prometheus, Grafana, ELK Stack (Elasticsearch, Logstash, Kibana), and others can be used for monitoring the health of distributed systems. These tools help in collecting metrics, storing them, visualizing data, and setting up alerts based on predefined thresholds.

For example, using Prometheus to set up a simple alert rule:
```yaml
groups:
- name: ExampleAlerts
  rules:
  - alert: HighRequestLatency
    expr: http_request_duration_seconds_count{job="my_job",le="10"} / sum(http_request_duration_seconds_count{job="my_job"}) * 100 > 25
    for: 5m
    labels:
      severity: warning
    annotations:
      summary: "High request latency detected"
```
x??

---

#### Observability in Monitoring
Observability is the ability to understand the internal state of a system by looking at its external outputs. Traces and logs can help developers debug their systems.
:p What does observability enable in software development?
??x
Observability enables developers to understand the internal behavior of a system by observing its external interactions and outputs. By using traces and logs, developers can trace requests through various services and pinpoint issues that might not be immediately visible.

Example of tracing with Zipkin:
```java
public class ExampleService {
    private final ZipkinTracer tracer;
    
    public void processRequest(Request request) {
        Span span = tracer.newSpan();
        
        try (Scope scope = tracer.withSpan(span)) {
            // Process the request
        } catch (Exception e) {
            span.addAnnotation("Error processing request");
            span.error(e);
        }
        
        tracer.reporter().report(span);
    }
}
```
x??

---

#### Best Practices for Dashboard Design
Dashboards are essential tools for monitoring system health. Best practices include clear visualization, relevant metrics, and easy alerting.
:p What are some best practices for designing a dashboard?
??x
Some best practices for designing a dashboard include:
1. **Clarity**: Use clear visualizations such as charts, graphs, and gauges to represent data effectively.
2. **Relevance**: Include only the most relevant metrics that provide actionable insights.
3. **Ease of Alerting**: Set up alerts for critical thresholds to ensure quick responses.

Example of a dashboard design consideration:
- Use color-coding to indicate status (e.g., green for normal, yellow for caution, red for error).
- Provide drill-down capabilities from high-level summaries to detailed information.
```json
{
  "dashboard": {
    "title": "System Health Dashboard",
    "sections": [
      {
        "id": "cpu_usage",
        "name": "CPU Usage",
        "metrics": [
          { "metric": "system.cpu.utilization", "type": "gauge" }
        ]
      },
      {
        "id": "memory_usage",
        "name": "Memory Usage",
        "metrics": [
          { "metric": "system.memory.usage", "type": "gauge" }
        ]
      }
    ],
    "alerts": [
      {
        "title": "High CPU Usage Alert",
        "condition": "system.cpu.utilization > 80%",
        "severity": "critical"
      }
    ]
  }
}
```
x??


#### Testing Importance and Early Bug Detection
Background context: The provided text emphasizes that early detection of bugs through testing is crucial. It states that the longer it takes to detect a bug, the more expensive it becomes to fix it. Testing helps catch bugs as early as possible, allowing developers to make changes without breaking existing functionality.

:p What is the primary benefit of catching bugs early in the development process?
??x
The primary benefits include:
- Reducing the cost and effort required to fix bugs later.
- Allowing developers to confidently refactor code or add new features without worrying about breaking existing functionality.
- Increasing the speed at which new features can be shipped.

??x
---
#### System Under Test (SUT)
Background context: The text introduces different types of tests, including unit tests, integration tests, and end-to-end tests. Each type has a specific scope of testing that it focuses on.

:p What is meant by "System Under Test" (SUT)?
??x
The term "System Under Test" (SUT) refers to the part of the codebase or application that a test is actually validating. It represents the scope of the test, and depending on this scope, tests can be categorized as unit tests, integration tests, or end-to-end tests.

??x
---
#### Unit Tests
Background context: Unit tests are used to validate small parts of the codebase, typically individual classes or functions. They ensure that these components behave as expected in isolation from other parts of the system.

:p What are the key characteristics of a good unit test?
??x
A good unit test should be:
- Relatively static over time.
- Only change when the behavior of the SUT (System Under Test) changes, such as through refactoring, fixing bugs, or adding new features.
- Use only the public interfaces of the SUT.
- Test for state changes and behaviors within the SUT without relying on predetermined sequences of actions.

??x
---
#### Integration Tests vs. End-to-End Tests
Background context: The text differentiates between integration tests and end-to-end tests, noting that while both test interactions with dependencies, their scopes differ significantly.

:p What is the main difference between an integration test and an end-to-end test?
??x
The main differences are:
- **Integration Test**: Verifies how a service interacts with its external dependencies.
  - Can be narrow (testing specific code paths) or broad (testing multiple services).
  
- **End-to-End Test**: Validates behavior that spans multiple services in the system, simulating user-facing scenarios.

??x
---
#### End-to-End Tests and User Journey Tests
Background context: The text discusses how end-to-end tests validate behaviors across multiple services, often running in shared environments. It also mentions using user journey tests to minimize the number of end-to-end tests needed.

:p What is a user journey test, and why might it be preferred over traditional end-to-end tests?
??x
A **user journey test** simulates multi-step interactions with the system (e.g., creating an order, modifying it, and finally canceling it). It typically runs faster than splitting these interactions into multiple separate end-to-end tests.

- User journey tests are preferred because they require less time to run compared to individual end-to-end tests.
- They help cover scenarios that span multiple services more efficiently.

??x
---
#### Trade-off in Test Coverage
Background context: The text suggests a balanced approach to testing, with many unit tests and fewer integration and end-to-end tests. This balance helps maintain reliability, speed, and cost-effectiveness.

:p What is the recommended trade-off for test coverage as suggested by the text?
??x
A good trade-off is:
- A large number of unit tests.
- A smaller fraction of integration tests.
- Even fewer end-to-end tests (see Figure 18.1).

This approach aims to balance reliability, speed, and cost-effectiveness.

??x
---

