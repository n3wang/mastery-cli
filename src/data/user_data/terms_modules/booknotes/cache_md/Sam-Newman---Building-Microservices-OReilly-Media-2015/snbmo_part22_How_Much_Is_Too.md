# High-Quality Flashcards: Sam-Newman---Building-Microservices-OReilly-Media-2015_processed (Part 22)


**Starting Chapter:** How Much Is Too Much

---


#### Microservices and Developer Mindset
Background context explaining how microservices can change a developer’s mindset from thinking about code in isolation to considering network boundaries and operational concerns. It also discusses the challenges of moving developers from monolithic systems to microservices.

:p How might moving from a monolithic system to microservices affect a developer's role?
??x
Moving from a monolithic system, where developers may have used just one language and been oblivious to operational concerns, to a microservice environment requires a shift in mindset. Developers must now consider network boundaries, the implications of failure, and operational concerns more carefully.

For example, if a developer writes a function in a microservice that calls another service across a network boundary, they need to think about how failures or delays might impact their system.
x??

---


#### People Problem
Background context citing Gerry Weinberg’s quote that it's always a people problem. The text discusses how microservices can create a more complex operational environment for developers.

:p How does the transition to microservices impact organizational culture according to the provided text?
??x
The transition to microservices is not just about technology but also involves significant cultural shifts within an organization. Developers must now be aware of network boundaries, failure modes, and other operational concerns that were previously irrelevant in monolithic systems.

This shift can be challenging for developers who are used to working in a simpler environment where they could focus solely on coding without worrying about such complexities.
x??

---

---


#### Aligning Service Ownership to Colocated Teams
Background context: The text discusses aligning service ownership to colocated teams and bounded contexts within the organization. This alignment is crucial for avoiding tension points in microservice architectures.

:p Why is it important to align service ownership with colocated teams?
??x
Aligning service ownership with colocated teams ensures that teams are responsible for their specific parts of the system, which can improve communication and reduce complexity. Bounded contexts help define clear boundaries around services, ensuring that teams understand their responsibilities and avoid overlap.

```java
// Example of defining bounded context in a microservices architecture
public class BoundedContext {
    public void defineContext(String serviceName) {
        System.out.println("Defining bounded context for " + serviceName);
    }
}
```
x??

---


#### Challenges at Scale
Background context: The text highlights the challenges that arise as microservice architectures grow beyond simple examples. It mentions handling multiple service failures and managing a large number of services.

:p What are some challenges when dealing with complex microservice architectures?
??x
Challenges include handling the failure of multiple separate services, managing hundreds of services, and coping with the complexity introduced by more microservices than people can handle effectively. These issues require robust monitoring, testing, and management strategies to ensure system reliability and maintainability.

```java
// Example of error handling in a complex microservice architecture
public class ErrorHandling {
    public void handleFailures() {
        try {
            // Simulate service call
            String result = "Service Result";
            if (result == null) {
                throw new Exception("Service failed");
            }
        } catch (Exception e) {
            System.out.println("Handling failure: " + e.getMessage());
        }
    }
}
```
x??

---


#### Conway's Law and Service Design
Background context: The text introduces Conway’s law, which suggests that the structure of an organization influences the design of its systems. It emphasizes aligning service ownership with organizational boundaries to avoid tension points.

:p How does Conway’s law impact microservice architecture?
??x
Conway’s law states that the structure of a system mirrors the communication structure within an organization. Therefore, designing services should reflect the natural boundaries and team structures of the organization to ensure effective collaboration and reduce conflicts.

```java
// Example of applying Conway's Law in service design
public class ServiceDesign {
    public void alignWithOrganization() {
        System.out.println("Aligning microservices with organizational structure.");
    }
}
```
x??

---

---


#### Embracing Failure at Scale
Background context: In distributed systems, failure is an inevitable aspect that needs to be planned for and managed. Understanding this principle helps organizations make better trade-offs and design more resilient systems.

:p What are some reasons why embracing failure is important in large-scale systems?
??x
Embracing failure is crucial because it allows us to focus on making our system robust against failures rather than trying to prevent them entirely. By acknowledging that hardware can fail, we can adopt strategies like graceful degradation and planned outages, which are easier to handle than unexpected disruptions.

For example, consider a service that needs to be upgraded. Planning for the failure of an individual node means you can perform in-place upgrades more easily by simply bringing down one instance at a time without affecting the entire system's availability.

```java
// Pseudocode for graceful upgrade
public void upgradeService() {
    // Mark some nodes for upgrade
    List<Node> nodesToUpgrade = getNodesMarkedForUpgrade();

    for (Node node : nodesToUpgrade) {
        shutdownAndReplace(node);
    }
}
```
x??

---


#### Trade-offs in Resilience and Cost
Background context: When building resilient systems, it's important to balance the cost of implementing high-reliability solutions against the potential benefits. Sometimes, simpler designs can be more effective if failure is accounted for.

:p How can assuming that hardware will fail help in making trade-off decisions?
??x
Assuming hardware will fail helps by allowing you to focus on designing systems that are resilient and can handle failures gracefully. This mindset can lead to cost savings because you don't need to invest heavily in highly redundant or fault-tolerant hardware.

For example, using cheaper components with simpler failure handling mechanisms (like velcro-attached hard drives) might be sufficient if the system is designed to tolerate individual node failures without significant impact on overall service availability.

```java
// Pseudocode for cost-effective design
public void designSystem(String systemType) {
    if (systemType.equals("reporting")) {
        useCheapComponents();
    } else {
        useExpensiveButReliableComponents();
    }
}

private void useCheapComponents() {
    // Implement using bare motherboards and velcro hard drives
}
```
x??

---


#### Cross-Functional Requirements in Distributed Systems
Background context: Understanding cross-functional requirements helps in designing systems that meet durability, availability, throughput, and latency goals. However, the level of redundancy and fault tolerance required can vary based on the specific application.

:p How does understanding cross-functional requirements help in system design?
??x
Understanding cross-functional requirements is essential for designing robust distributed systems. By knowing exactly what levels of data durability, service availability, throughput, and acceptable latency are needed, you can make informed decisions about trade-offs between cost, complexity, and reliability.

For example, an application that only runs twice a month might not require the same level of redundancy as one that needs to be available 24/7. Autoscaling systems can be effective but might be overkill for applications with low demand patterns.

```java
// Pseudocode for implementing cross-functional requirements
public void configureSystem(Configuration config) {
    if (config.getRequirementLevel() == "high") {
        setupHighAvailability();
    } else if (config.getRequirementLevel() == "medium") {
        setupMediumAvailability();
    } else {
        setupBasicAvailability();
    }
}

private void setupHighAvailability() {
    // Implement high availability strategies
}
```
x??

---

---


---
#### Blue/Green Deployments
Blue/green deployments are a strategy to minimize downtime when updating or maintaining software. In this approach, two identical environments (blue and green) are maintained, with one environment serving live traffic while the other is updated or maintained.

:p How does blue/green deployment work?
??x
In blue/green deployment, you maintain two versions of your application: a current version (blue) that serves live traffic and a new version (green). The traffic can be switched between these environments without affecting users. This allows for smooth updates and maintenance.
```
// Example pseudocode to switch traffic from blue to green
function switchTraffic(newVersion) {
    if (newVersion === 'green') {
        // Redirect all requests to the green environment
        // Start scaling up the green environment gradually
    } else {
        // Continue using the blue environment for traffic
    }
}
```
x??

---


#### User Requirements and Tolerances
Understanding user requirements is crucial for designing a system that meets their needs. You need to identify how much downtime or latency users can tolerate, which depends on the nature of the service (e.g., ecommerce vs. corporate intranet).

:p What factors influence how much failure or latency a system can handle?
??x
The tolerance for failures and latency varies depending on the type of service:
- Ecommerce systems might require minimal downtime to avoid lost sales.
- Corporate intranets may tolerate more downtime since they are not as critical.

To determine these requirements, you need to ask questions about user expectations and help users understand the trade-offs between different levels of service. For instance, if a 90th percentile response time of 2 seconds is required with 200 concurrent connections per second, this is a specific requirement that needs to be documented.
```
// Example code snippet to measure response times
public class PerformanceMonitor {
    public void checkResponseTime(int connectionsPerSecond) {
        // Logic to simulate and measure response time under load
        long responseTime = simulateLoad(connectionsPerSecond);
        if (responseTime > 2000) { // Assuming 2 seconds is the threshold
            System.out.println("Response time exceeded expected limits.");
        } else {
            System.out.println("Performance within acceptable range.");
        }
    }

    private long simulateLoad(int connectionsPerSecond) {
        // Simulate load and return response time in milliseconds
        return 1500; // Example value
    }
}
```
x??

---


#### Response Time/Latency
Response times are critical for user satisfaction, especially on services with high traffic. Measuring these at different levels of concurrency helps understand how the system performs under various loads.

:p How can you measure response time effectively?
??x
To measure response time effectively:
1. Use a representative set of operations to test.
2. Test with varying numbers of concurrent users or connections.
3. Set targets based on percentiles, such as 90th percentile response times.
4. Document the expected performance under different load conditions.

For example, you might define: "We expect the website to have a 90th percentile response time of 2 seconds when handling 200 concurrent connections per second."

```java
public class ResponseTimeMonitor {
    public void measureResponseTime(int users) {
        long[] responseTimes = simulateLoad(users);
        
        // Calculate and print the 90th percentile response time
        double[] sortedResponseTimes = Arrays.stream(responseTimes).sorted().toArray();
        int index = (int) Math.round(sortedResponseTimes.length * 0.9);
        System.out.println("90th Percentile Response Time: " + sortedResponseTimes[index] + " ms");
    }
    
    private long[] simulateLoad(int users) {
        // Simulate load and return an array of response times
        long[] responses = new long[users];
        for (int i = 0; i < users; i++) {
            responses[i] = (long) Math.random() * 2500 + 1000;
        }
        return responses;
    }
}
```
x??

---


#### Availability
Availability refers to the uptime of a service. It is important for critical services where downtime could have significant consequences.

:p How do you measure availability?
??x
Measuring availability involves determining how often a system is available to users and ensuring it meets expected reliability standards. While measuring periods of acceptable downtime can be useful from a historical reporting perspective, the primary focus should be on whether the service is accessible when needed.

For example:
- A 99.9% uptime guarantee means only 0.1% of time could be down.
- Historical metrics might show that your system has been available 99.85% of the time over a year.

```java
public class AvailabilityMonitor {
    public double calculateAvailability(long totalUptime, long totalDowntime) {
        return (totalUptime * 100.0 / (totalUptime + totalDowntime));
    }
    
    public void monitorAvailability() {
        // Simulate uptime and downtime
        long uptime = 8760; // Assume the service was up for a year
        long downtime = 24; // Example downtime in hours
        
        double availability = calculateAvailability(uptime, downtime);
        System.out.println("Current Availability: " + availability + "%");
    }
}
```
x??

---


#### Degrading Functionality
Background context: The ability to safely degrade functionality is crucial when building a resilient system with microservices. Understanding which parts of the functionality are critical and knowing how to handle failures gracefully can significantly improve system resilience.

:p What is degrading functionality, and why is it important in a microservice architecture?
??x
Degrading functionality refers to designing your system so that if one or more microservices fail, you can still provide some level of service. This approach improves overall system resilience by ensuring that even if parts of the system are down, critical functionalities remain accessible. For example, if a shopping cart service is unavailable, you might still display product listings but hide or disable related UI elements.

In a monolithic application, system health is binary—either it's working or not. However, in microservice architectures, understanding and managing nuanced failure scenarios becomes essential.
x??

---


#### Architectural Safety Measures
Background context: To ensure that failures do not cause widespread issues, architectural safety measures such as bulkheads, timeouts, and circuit breakers are crucial. These measures help prevent a single point of failure from cascading into the entire system.

:p What is the purpose of implementing architectural safety measures in a microservice architecture?
??x
The purpose of implementing architectural safety measures is to protect the overall health of the system by preventing the impact of failures from spreading. This includes techniques like setting timeouts, using bulkheads (separate connection pools), and implementing circuit breakers to avoid sending requests to unhealthy services.

By standardizing these practices, you can ensure that your application remains stable even when parts of it fail.
x??

---


#### Strangler Application Example
Background context: The example describes a scenario where an online classified ads website was strangling older legacy applications by gradually replacing them with new microservices. This process can introduce vulnerabilities if not managed carefully.

:p What is the risk of failing to manage dependencies properly during the strangler application process?
??x
The risk of failing to manage dependencies properly during the strangler application process is that a single point of failure in an older, poorly maintained service can bring down the entire system. This is because modern services often depend on multiple legacy services, and if one of these dependencies fails, it can cause a cascade of failures throughout the system.

In the example provided, the slow response time of a downstream ad system, which handled only 5% of traffic, brought down the whole site due to its impact on request handling.
x??

---


#### Bulkheads
Background context: Bulkheads are a method of isolating parts of your application so that failures in one part do not affect others. This is particularly useful when dealing with external dependencies that may be unreliable.

:p What is the role of bulkheads in managing microservice architectures?
??x
The role of bulkheads in managing microservice architectures is to separate different connection pools or service boundaries, ensuring that a failure in one part of the system does not affect other parts. By isolating services, you can control resource consumption and prevent cascading failures.

For example, using separate HTTP connection pools for different downstream services helps limit the impact of a failing service on others.
x??

---


#### Circuit Breaker
Background context: A circuit breaker is a pattern used to handle faults by breaking the circuit when a certain threshold of failures is reached. This prevents further requests from being sent to unhealthy services, allowing them to recover.

:p How does a circuit breaker work in the context of microservice architectures?
??x
A circuit breaker works by monitoring the success rate of service calls. When a defined threshold of failures is reached, it trips and stops sending requests to that service. This allows the failing service time to recover without overwhelming the system with more failed requests.

In the example, implementing a circuit breaker would have prevented traffic from being sent to the unhealthy downstream service, allowing it to recover.
x??

---

---


#### Antifragile Organization Concept
Background context explaining that organizations like Netflix and Google have embraced a philosophy of building systems resilient to failure by regularly causing it. This is based on Nassim Taleb’s concept of antifragility, where systems benefit from disorder and failure.
:p What is the core idea behind an antifragile organization?
??x
The core idea is that organizations should be designed in such a way that they not only survive but thrive under conditions of uncertainty, stress, and disruption. This involves actively encouraging failure and building robust mechanisms to handle it. Organizations like Netflix and Google exemplify this by regularly causing system failures to ensure their systems are resilient.
x??

---


#### Game Days for Simulating Failures
Background context on how some organizations, including Google during my time there, simulate server failure through game days where teams practice reacting to such events. This is a form of preparing the organization for real-world scenarios.
:p What are game days in the context of simulating failures?
??x
Game days are exercises where organizations simulate system failures and have their teams react to them as if it were a real incident. The goal is to prepare the organization for potential real-world disruptions by providing practice under controlled conditions.
x??

---


#### Chaos Monkey: A Simian Army Tool
Background context on Netflix's use of tools like Chaos Monkey, which randomly turns off machines during certain hours, ensuring developers are prepared for failures in production environments.
:p What is the Chaos Monkey?
??x
Chaos Monkey is a tool developed by Netflix that periodically and unpredictably terminates random instances within its infrastructure. It runs daily to simulate failure scenarios in production, forcing developers to build resilient systems capable of handling unexpected outages.
x??

---


#### Latency Monkey: Simulating Network Delays
Background context on how the Latency Monkey simulates slow network connectivity between machines, adding another layer of complexity and unpredictability to test system resilience.
:p What is the Latency Monkey?
??x
Latency Monkey is a tool that simulates network delays by introducing artificial latency between different nodes in the system. It helps test whether applications can handle degraded network conditions without failing catastrophically.
x??

---


#### Preparing for Distributed System Failures
Background context on how distributed systems, due to their nature, are inherently more vulnerable to failure compared to centralized ones. The importance of preparing for such failures is highlighted by companies like Netflix and Google.
:p Why do distributed systems need special preparation?
??x
Distributed systems are more vulnerable to failures because they rely on multiple independent nodes that can fail independently. Unlike centralized systems, where a single point of failure might be easier to manage, distributed systems require robust mechanisms to handle individual node failures gracefully. Preparing for these failures ensures better system reliability and customer satisfaction.
x??

---

---

