# High-Quality Flashcards: Sam-Newman---Building-Microservices-OReilly-Media-2015_processed (Part 23)


**Starting Chapter:** Circuit Breakers

---


---
#### Timeouts
Timeouts are crucial for handling downstream system failures, ensuring that a system does not hang indefinitely while waiting for a response. The right timeout value balances between responsiveness and reliability.

If you wait too long before considering a call to have failed, your system may become unresponsive or slow down significantly. Conversely, if you set the timeout too low, legitimate requests might be considered failures prematurely, leading to incorrect handling of service calls.

To manage this effectively, it is recommended to:
1. **Set default timeouts**: Choose sensible defaults for timeouts that apply across your application.
2. **Log and adapt**: Monitor when timeouts occur and adjust the timeout values as necessary based on observed behavior.

:p What is the importance of setting appropriate timeouts in a downstream system?
??x
Appropriate timeouts are essential to ensure that your system does not hang indefinitely while waiting for responses from other services. Too long of a timeout can slow down your system, making it unresponsive or prone to delays. Conversely, too short of a timeout might incorrectly flag a call as failed before the actual response is received.

Setting default timeouts and monitoring their effectiveness through logging help in fine-tuning these values.
x??

---


#### Circuit Breakers
Circuit breakers are inspired by electrical circuit protection mechanisms. They work by automatically stopping further requests to a downstream service that is experiencing issues, preventing cascading failures across dependent systems.

A common implementation strategy involves:
1. **Blowing the breaker**: When a certain number of consecutive requests fail (e.g., due to timeouts or errors), the circuit breaker trips and stops all subsequent calls.
2. **Graceful recovery**: After some time, the system sends out probes to check if the downstream service has recovered. If enough successful responses are received, the breaker is reset.

:p What is a circuit breaker and how does it work in software systems?
??x
A circuit breaker acts as a protection mechanism for software services by automatically stopping further requests when a downstream service starts experiencing issues. This prevents cascading failures that could otherwise affect multiple parts of your application.

Here’s a simplified example in pseudocode:
```pseudocode
circuitBreaker = new CircuitBreaker()

function sendRequest(url) {
    if (circuitBreaker.isOpen()) {
        return handleFailure()
    }
    
    try {
        response = makeHttpCall(url)
        circuitBreaker.success(response)
    } catch (TimeoutException | IOException e) {
        circuitBreaker.failure(e)
        if (breakerFailedThresholdReached()) {
            circuitBreaker.open()
        }
    }
}

function breakerFailedThresholdReached() {
    // Logic to check if the failure threshold has been reached
}
```

When a certain number of calls fail, the circuit breaker trips, and all subsequent requests are failed immediately without making actual calls. After some time, it attempts to reset by sending test requests.
x??

---

---


#### Bulkheads Concept
In software architecture, bulkheads are mechanisms to isolate parts of a system from failure. They help contain and limit the impact of an outage or error in one component to avoid cascading failures throughout the entire system. This is similar to how physical bulkheads on ships protect against flooding.
:p What is a bulkhead in the context of software architecture?
??x
A bulkhead in software architecture is a mechanism used to isolate parts of a system from failure, such as different connection pools or microservices, to limit the impact of an outage or error to that specific part. This helps prevent cascading failures.
x??

---


#### Connection Pooling for Bulkheads
Connection pooling is a technique where multiple connections are pre-established and managed in a pool so they can be reused rather than being created and destroyed on each request. This reduces overhead and improves performance, but it also means that if one connection pool becomes saturated or exhausted, other pools may also be affected.
:p How can separate connection pools for downstream services help implement bulkheads?
??x
Separate connection pools for downstream services ensure that if one connection pool gets exhausted due to resource constraints or high load, the others remain unaffected. This prevents a single point of failure from impacting the entire system and allows other parts to continue functioning normally.
x??

---


#### Separation of Concerns for Bulkheads
Separating concerns into separate microservices can act as bulkheads by reducing the likelihood of an outage in one area affecting another. By teasing apart functionality, you create boundaries that limit the spread of failures.
:p How does separation of concerns help implement bulkheads?
??x
Separation of concerns helps implement bulkheads by creating distinct boundaries between different parts of a system. If one microservice fails or experiences issues, it is isolated from other services, preventing the failure from spreading and impacting the entire system.
x??

---


#### Circuit Breakers for Bulkheads
Circuit breakers are an automatic mechanism that can be used to limit the spread of failures in real-time by shutting down a failing service before it causes further damage. They act as a bulkhead, protecting both the consumer and the downstream service from additional calls.
:p What is the role of circuit breakers in implementing bulkheads?
??x
Circuit breakers serve as automatic bulkheads that shut down a failing service to prevent it from causing further damage. They protect both the consumer (by preventing more requests) and the downstream service (from being overwhelmed by additional calls). This helps contain failures and prevents cascading issues.
x??

---


#### Load Shedding with Hystrix
Load shedding is a technique where, when resources become saturated, requests are rejected to prevent further overload. The Netflix Hystrix library provides mechanisms for implementing this, allowing bulkheads that reject requests under certain conditions to avoid resource saturation.
:p How does load shedding help in preventing cascading failures?
??x
Load shedding helps prevent cascading failures by rejecting additional requests when resources are saturated. This ensures that important systems don't become overwhelmed and act as bottlenecks for multiple upstream services, thereby maintaining overall system stability.
```java
// Example Hystrix command with fallback logic
import com.netflix.hystrix.HystrixCommand;
import com.netflix.hystrix.HystrixCommandGroupKey;

public class MyCommand extends HystrixCommand<String> {
    public MyCommand() {
        super(HystrixCommandGroupKey.Factory.asKey("MyCommand"));
    }

    @Override
    protected String run() throws Exception {
        // Logic to execute the command and return a result
        return "Result";
    }
}
```
x??

---


#### Summary of Bulkheads
Bulkheads are crucial in software architecture for containing failures, ensuring that one part of a system does not bring down another. Implementing bulkheads through separation of concerns, connection pooling, and circuit breakers helps maintain the robustness and reliability of complex systems.
:p What are the main benefits of implementing bulkheads in a system?
??x
Implementing bulkheads provides several key benefits: it contains failures to limit their impact, ensures that one part of the system does not bring down another, and prevents cascading failures. This leads to more robust and reliable software architectures capable of handling unexpected issues without total system failure.
x??

---

---


---
#### Service Isolation
Service isolation refers to the technique of minimizing dependencies between services so that the failure or maintenance of one service does not significantly impact others. This can be achieved through various integration techniques that allow a downstream server to be offline while upstream services continue functioning without disruption.

:p How does increasing isolation between services help?
??x
Increasing isolation between services reduces the need for coordination, allowing teams more autonomy and flexibility in managing their respective services. When services depend less on each other being up, they are less affected by outages or planned downtime.
x??

---


#### Idempotency
Idempotent operations ensure that performing an operation multiple times has no additional effect beyond performing it once. This is particularly useful for recovery scenarios where messages might be retransmitted.

:p What does idempotency mean in the context of service calls?
??x
In the context of service calls, idempotency means that making a call with identical parameters again and again will have no additional effect after the first successful execution. For example, if a call to add points is made multiple times, only one set of points should be added regardless of how many times the call was executed.

Example in XML for adding points:
```xml
<credit>
  <amount>100</amount>
  <forAccount>1234</account>
  <reason>
    <forPurchase>4567</forPurchase>
  </reason>
</credit>
```

This mechanism ensures that even if the message is processed multiple times, only one credit for a specific order will be recorded. This can prevent overprocessing or double-counting.
x??

---

