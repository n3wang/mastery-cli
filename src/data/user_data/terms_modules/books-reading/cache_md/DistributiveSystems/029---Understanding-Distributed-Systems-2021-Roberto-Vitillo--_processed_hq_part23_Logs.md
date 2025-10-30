# High-Quality Flashcards: 029---Understanding-Distributed-Systems-2021-Roberto-Vitillo--_processed (Part 23)

**Rating threshold:** >= 8/10

**Starting Chapter:** Logs

---

**Rating: 8/10**

#### Observability Overview
Observability is a set of tools that provide granular insights into a system's behavior, enabling operators to understand and debug complex emergent failures. These tools help minimize time-to-validate hypotheses by providing rich contextual information.

:p What are the core components of an observability platform?
??x
The core components include telemetry sources like metrics, event logs, and traces. Metrics provide high-throughput monitoring data, while event logs and traces handle high-dimensional data well.
x??

---

#### Telemetry Sources
Metrics, event logs, and traces form the foundation of observability. Each has unique strengths: metrics are used for monitoring health, whereas logs and traces aid in debugging.

:p What are some common types of telemetry sources?
??x
Common types include:
- Metrics: Time-series data stored in high-throughput stores.
- Event Logs: Immutable lists of time-stamped events that can be structured or free-form text.
- Traces: Detailed sequences of interactions, often used for debugging complex failures.
x??

---

#### Metrics
Metrics are crucial for monitoring the health and performance of a system. They provide aggregated data over time but struggle with high-dimensional data.

:p What is an example scenario where metrics would be useful?
??x
An example scenario where metrics would be useful is tracking the overall response time and request count of a service to identify trends or anomalies in its performance.
x??

---

#### Event Logs
Event logs capture detailed information about system events, which can help trace root causes and investigate long-tail behaviors.

:p How do event logs differ from metrics?
??x
Event logs provide granular insights with rich context, whereas metrics offer high-level aggregated data. Metrics are better for monitoring overall health, while logs are essential for debugging specific issues.
x??

---

#### Logs in Detail
Logs are immutable lists of time-stamped events that can be structured or free-form text. They are used extensively for debugging and investigating long-tail behaviors.

:p What are the advantages and disadvantages of using textual logs?
??x
Advantages:
- Simple to emit, especially free-form ones.
Disadvantages:
- High noise-to-signal ratio due to their fine-grained nature.
- Can introduce overhead if not managed properly (e.g., asynchronous logging).
- Potential issues if disk fills up with excessive logging.

Example of emitting a structured log in Java:
```java
public class LogEmitter {
    public void logEvent(String failureCount, String serviceRegion) {
        // Emitting a structured log
        System.out.println("{ \"failureCount\" : " + failureCount + ", \"serviceRegion\" : \"" + serviceRegion + "\" }");
    }
}
```
x??

---

#### Best Practices for Logging
Best practices include emitting logs in a single event per work unit, containing all relevant information about the operation performed.

:p How can developers ensure that logs are useful for debugging?
??x
Developers should:
- Store data about specific work units in a single log event.
- Include context and measurements (e.g., timestamps, operation times).
- Instrument every network call to log response status codes and times.
- Sanitize sensitive information before logging.

Example of sanitizing logs:
```java
public class SafeLogger {
    public void safeLog(String userInput) {
        // Sanitizing potentially sensitive data
        String sanitizedUserInput = sanitize(userInput);
        System.out.println("{ \"userInput\" : \"" + sanitizedUserInput + "\" }");
    }

    private String sanitize(String input) {
        return input.replaceAll("[^a-zA-Z0-9]", "");
    }
}
```
x??

---

**Rating: 8/10**

#### Logging Levels and Cost Control
Background context: To understand why a remote call failed, it's important to have detailed logs. However, logging everything can be costly. Different logging levels like debug, info, warning, error help control the amount of log data generated.

If applicable, add code examples with explanations:
```java
// Example of setting logging level in Java using Log4j2
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class LoggerExample {
    private static final Logger logger = LogManager.getLogger(LoggerExample.class);

    public void someMethod() {
        // Setting log level to debug for investigation purposes
        logger.debug("Debugging this message");
    }
}
```
:p What is the purpose of having different logging levels?
??x
The purpose of having different logging levels (debug, info, warning, error) is to allow operators to increase logging verbosity for investigation purposes and reduce costs when granular logs are not needed. This helps in managing the volume of log data generated.
x??

---
#### Sampling for Cost Control
Background context: Logging all events can be expensive, so sampling techniques like only logging every nth event or prioritizing events based on their signal-to-noise ratio can help reduce verbosity.

:p What is an example of a sampling technique to reduce the verbosity of logs?
??x
An example of a sampling technique is logging only one out of every n events. For instance, if you set n=10, your service would log every 10th event.
x??

---
#### Log Collectors and Rate Limiting
Background context: As nodes scale out, the volume of logs increases. To avoid overwhelming the logging pipeline, log collectors need to be able to rate-limit requests. If using a third-party service for ingesting, storing, and querying logs, there might already be a quota in place.

:p How can you prevent your logging pipeline from being overwhelmed?
??x
To prevent your logging pipeline from being overwhelmed, log collectors should be capable of rate-limiting requests. This ensures that the volume of data does not exceed the system's capacity. If using a third-party service, check if there is already a quota in place.
x??

---
#### Tracing Requests in Distributed Systems
Background context: Tracing captures the entire lifespan of a request as it propagates through services in a distributed system. A trace represents causally related spans that show the execution flow of a request.

If applicable, add code examples with explanations:
```java
// Example of tracing in Java using OpenTracing
import io.opentracing.Span;
import io.opentracing.Tracer;

public class TracingExample {
    private static final Tracer tracer = ...; // Initialize tracer

    public void processRequest() {
        Span span1 = tracer.buildSpan("Operation1").start();
        try (Scope scope = tracer.activateSpan(span1)) {
            // Simulate operation
            doSomething();
        } finally {
            span1.finish();
        }
    }

    private void doSomething() {
        Span span2 = tracer.buildSpan("Operation2").start();
        try (Scope scope = tracer.activateSpan(span2)) {
            // Simulate another operation
            ...
        } finally {
            span2.finish();
        }
    }
}
```
:p What is a trace in the context of distributed systems?
??x
A trace in the context of distributed systems is a list of causally related spans that represent the execution flow of a request. Each span represents an interval of time mapping to a logical operation or work unit, and it contains key-value pairs.
x??

---
#### Identifying Bottlenecks with Traces
Background context: Traces help identify bottlenecks in the end-to-end request path by providing detailed information about each step taken during a request.

:p How can traces be used to identify bottlenecks?
??x
Traces can be used to identify bottlenecks in the end-to-end request path. By examining the execution flow captured in spans, developers can pinpoint where delays or issues occur. This is useful for debugging both frequent and rare issues.
x??

---
#### Resource Attribution with Traces
Background context: Traces also help attribute which clients hit which downstream services and in what proportion, which can be used for rate-limiting or billing purposes.

:p How can traces assist in attributing resource usage?
??x
Traces can assist in attributing resource usage by identifying which clients hit which downstream services and the frequency of these hits. This information is valuable for rate-limiting services based on client behavior or for implementing billing mechanisms.
x??

---

**Rating: 8/10**

#### Distributed Tracing Overview
Background context: In a distributed system, tracking the flow of requests can be challenging. Each component needs to send detailed information about its interactions with other services, which is where tracing comes into play. This involves creating spans that represent stages in the request lifecycle and emitting them for collection.
:p What is distributed tracing?
??x
Distributed tracing is a method used to monitor and debug the flow of requests in complex, distributed systems. It helps understand how different components interact with each other by creating spans (events) at various stages of request processing. These spans are then collected and assembled into traces for analysis.
x??

---
#### Span Representation
Background context: Spans represent events in a trace. They contain the trace ID and capture detailed information about interactions between services or stages in the request path. When a span ends, it is emitted to a collector service that assembles it with other spans related to the same trace.
:p What are spans used for?
??x
Spans are used to represent individual events within a trace. They contain metadata such as the trace ID and capture detailed information about interactions between services or stages in the request path. This allows for detailed tracking of each component's role in processing a request.
x??

---
#### Trace Assembly
Background context: Spans are emitted to collectors, which assemble them into complete traces by stitching spans that belong to the same trace together. Popular collectors include OpenZipkin and AWS X-ray. The process involves aggregating data from individual spans to form a comprehensive view of the entire request flow.
:p How do collectors assemble traces?
??x
Collectors receive individual spans emitted from different services and assemble them into complete traces by stitching spans that belong to the same trace together. This involves collecting, sorting, and correlating span data to provide an end-to-end view of the request flow.

For example, using OpenZipkin:
```java
// Pseudocode for emitting a span
public void emitSpan(Span span) {
    collectorService.send(span);
}

// Pseudocode for assembling traces
public Trace assembleTrace(List<Span> spans) {
    // Sort and correlate spans based on trace ID
    List<Span> sortedSpans = sortSpansByTraceId(spans);
    return new Trace(sortedSpans);
}
```
x??

---
#### Retrospective Challenges of Tracing
Background context: Implementing tracing can be challenging, especially in existing systems. Every component in the request path must propagate the trace context from one stage to another. Additionally, third-party services and frameworks also need to support tracing.
:p Why is it hard to retrofit tracing into an existing system?
??x
Retrofitting tracing into an existing system can be difficult because every component in the request path must modify their code to propagate the trace context from one stage to another. This includes not only your own components but also third-party services and frameworks that you rely on, which also need to support tracing.
x??

---
#### Event Logs vs Traces and Metrics
Background context: Event logs are fine-grained and service-specific, making it challenging to debug the entire request flow from a single user action. Metrics and traces help by providing higher-level abstractions derived from event logs, tuned for specific use cases.

Metrics aggregate counters or observations over multiple work units, while traces aggregate events related to a specific user request into an ordered list.
:p How do metrics and traces differ from event logs?
??x
Event logs are fine-grained and service-specific, making it difficult to get an overview of the entire request flow. Metrics provide summary statistics by aggregating counters or observations over multiple work units, while traces aggregate events related to a specific user request into an ordered list.

For example:
```java
// Pseudocode for emitting metrics
public void emitMetrics(Metric metric) {
    collectorService.send(metric);
}

// Pseudocode for assembling a trace
public Trace assembleTrace(List<Event> events) {
    // Aggregate events based on the lifecycle of a user request
    return new Trace(events.stream().collect(Collectors.groupingBy(event -> event.getTraceId())));
}
```
x??

---
#### Service Mesh and Tracing
Background context: The service mesh pattern can help retrofit tracing by providing a transparent way to collect and manage distributed traces. This approach minimizes the need for modifying application code directly.
:p How does the service mesh pattern support tracing?
??x
The service mesh pattern supports tracing by providing a transparent infrastructure layer that collects and manages distributed traces without requiring direct modifications to application code. This allows for centralized management of tracing data, making it easier to integrate and manage across multiple services.

For example:
```java
// Pseudocode for using a service mesh
public class ServiceMeshClient {
    public void makeRequest(String endpoint) {
        // The service mesh handles trace context propagation transparently
        client.sendRequest(endpoint);
    }
}
```
x??

---

