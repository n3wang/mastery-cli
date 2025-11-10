# High-Quality Flashcards: 2B005---Streaming-Systems_processed (Part 4)


**Starting Chapter:** Going Streaming When and How

---


#### Windowing Strategies Overview
Background context: The text introduces different windowing strategies used in data processing, such as fixed windows, sliding windows, and session windows. These techniques are essential for breaking down streaming data into manageable chunks to process it effectively.

:p What are some common windowing strategies mentioned?
??x
Common windowing strategies include fixed windows, sliding windows, and session windows. Fixed windows apply a uniform duration across all data points, while sliding windows allow overlapping time intervals, and session windows group events based on idle periods between them.
x??

---

#### Example of Fixed Windows in Beam
Background context: The text demonstrates how to implement a windowing strategy using Apache Beam by applying a `Window.into` transform for fixed windows. This example specifically highlights the use of fixed two-minute windows.

:p How can you apply fixed windows with a two-minute duration in Apache Beam?
??x
You can apply fixed windows with a two-minute duration using the `FixedWindows.of(TWO_MINUTES)` method within the `Window.into` transform.
```java
PCollection<KV<Team, Integer>> totals = input
    .apply(Window.into(FixedWindows.of(TWO_MINUTES)))
    .apply(Sum.integersPerKey());
```
This code snippet illustrates how to window the input data into fixed two-minute intervals and then sum the integers per key within each window.
x??

---

#### Batch Execution of Windowed Pipeline
Background context: The text mentions that while batch processing can be thought of as a subset of streaming, it uses batch engines for simplicity in understanding the mechanics before moving to streaming. The example provided demonstrates executing the windowed pipeline on a batch engine.

:p How does Beam handle both batch and streaming pipelines?
??x
Apache Beam provides a unified model where semantically, batch processing is considered a special case of streaming with no out-of-order or late data. This means that the same code can be used for both batch and streaming scenarios.
x??

---

#### Visualizing Windowing Strategies
Background context: The text refers to Figure 2-4 which visually demonstrates aligned and unaligned windows across different keys, helping to understand how these strategies differ.

:p What are aligned and unaligned windows in the context of windowing strategies?
??x
Aligned windows apply the same windowing strategy across all data points, ensuring consistency. Unaligned windows can vary based on specific conditions, such as idle periods for session windows or overlapping intervals for sliding windows.
x??

---

#### Streaming vs Batch Execution
Background context: The text indicates that while the example provided is executed on a batch engine for clarity, switching to a streaming engine would be the next step.

:p What does Beam's unified model imply for batch and streaming processing?
??x
Beam’s unified model implies that batch processing can be seen as a special case of streaming where there are no out-of-order events or late data. The same pipeline code can be used for both scenarios, making it easier to transition between them.
x??

---


#### Windowed Summation on a Batch Engine
Windowing is a technique where data is grouped into windows based on time or value. In this context, windowed summation involves accumulating inputs over a fixed time interval (e.g., two minutes) before producing output.
:p What does windowing involve in the context of batch engines?
??x
Windowing involves grouping input data into fixed-sized windows, typically based on event-time intervals like two minutes. The system accumulates data within these windows until they are consumed entirely and then produces a single output for each window.
x??

---
#### Triggers in Streaming Systems
Triggers determine when to materialize results during the processing of unbounded streams. They help manage the timing of result generation, balancing latency with correctness.
:p What is the primary function of triggers in streaming systems?
??x
The primary function of triggers is to define when output for a window should be generated during the processing of an unbounded stream. Triggers can generate updates periodically or wait until they believe input for a window is complete before producing results.
x??

---
#### Repeated Update Triggers
Repeated update triggers provide periodic updates to windows as their contents evolve. These are common in streaming systems, offering simple and useful semantics for continuous aggregation tasks.
:p What are repeated update triggers used for?
??x
Repeated update triggers are used to provide regular, incremental updates to the results of windowed aggregations. They generate panes of output periodically based on new input data, allowing for near-real-time processing with eventual consistency.
x??

---
#### Completeness Triggers
Completeness triggers wait until they believe that the input for a window is complete before producing a pane of output. This approach mirrors batch processing semantics but applied to individual windows in a streaming context.
:p What does a completeness trigger do?
??x
A completeness trigger waits until it determines that the input for a specific window is believed to be complete, then generates an output pane based on this data. This ensures results are only produced when all expected events have arrived within the window, similar to batch processing but scoped per-window.
x??

---
#### Per-Record Triggering
Per-record triggering fires after each new record is processed, generating a separate pane for each input record in a window. It works well with systems where updates can be frequently polled.
:p What does per-record triggering do?
??x
Per-record triggering generates a pane of output for every new record as it arrives within the window. This approach is useful when results need to be available immediately, but may result in frequent, small updates that are "chatty" and resource-intensive.
x??

---
#### Aligned Delays in Triggers
Aligned delays schedule updates based on fixed processing-time intervals that align across all keys and windows. This approach provides predictable updates at regular intervals.
:p What is an aligned delay trigger?
??x
An aligned delay trigger schedules updates at fixed, periodic intervals, such as every two minutes. This ensures consistent, predictable updates across all windows, similar to microbatch systems like Spark Streaming.
Example code:
```java
PCollection<KV<Team, Integer>> totals = input
    .apply(Window.into(FixedWindows.of(TWO_MINUTES)))
    .triggering(Repeatedly(AlignedDelay(TWO_MINUTES)))
    .apply(Sum.integersPerKey());
```
x??

---
#### Unaligned Delays in Triggers
Unaligned delays schedule updates based on the observed data within each window, potentially leading to more even load distribution over time. This approach reduces burstiness.
:p What is an unaligned delay trigger?
??x
An unaligned delay trigger schedules updates relative to the data observed within a given window, which can lead to a more evenly distributed workload over time. Unlike aligned delays, these updates are not fixed and may vary per window.
Example code:
```java
PCollection<KV<Team, Integer>> totals = input
    .apply(Window.into(FixedWindows.of(TWO_MINUTES)))
    .triggering(Repeatedly(UnalignedDelay(TWO_MINUTES)))
    .apply(Sum.integersPerKey());
```
x??

---
#### Watermarks in Streaming Systems
Watermarks are used to track the progress of event-time data and provide a mechanism for handling late data. They help maintain correctness by ensuring that only complete windows produce outputs.
:p What role do watermarks play in streaming systems?
??x
Watermarks track the latest known timestamp of unprocessed events, helping to manage the completeness of data within windows. They are crucial for dealing with late data and maintaining correct results by delaying output until all expected events have arrived.
x??

---


#### Watermarks Overview
Background context explaining watermarks. Watermarks are temporal notions of input completeness in the event-time domain, used to measure progress and completeness relative to the event times of records being processed. They represent a function \( F(P) \rightarrow E \), where \( P \) is processing time and \( E \) is event time.
:p What are watermarks?
??x
Watermarks help track the completeness of input data in terms of event time, allowing for proper handling of late data in stream processing systems. They serve as a function that maps processing time to event time, indicating the latest event time for which all inputs have been observed or will be seen.
```java
// Pseudo-code example:
class Watermark {
    public int F(P) { // Function mapping processing time to event time
        return E; // Event time up to which all data with event times less than E are considered complete
    }
}
```
x??

---

#### Perfect vs. Heuristic Watermarks
Explanation of the difference between perfect and heuristic watermarks, including their practical applications.
:p What types of watermarks exist?
??x
Perfect watermarks provide a strict guarantee that no more data with event times less than \( E \) will be seen again, ideal for scenarios where complete input knowledge is available. Heuristic watermarks use available information to estimate completeness, making them useful when perfect knowledge is impractical or too expensive to calculate.
```java
// Pseudo-code example:
class PerfectWatermark {
    public int F(P) { // Function mapping processing time to event time with strict guarantees
        return E; 
    }
}

class HeuristicWatermark {
    public int F(P) { // Function mapping processing time to event time based on heuristics
        return estimatedE;
    }
}
```
x??

---

#### Watermarks and Completeness Triggers
Explanation of how watermarks enable the use of completeness triggers in stream processing.
:p How do watermarks support completeness triggers?
??x
Watermarks facilitate the implementation of completeness triggers by providing a measure of input completeness based on event time. This allows the system to determine when all expected data for a given window have been observed, ensuring that late data does not delay the completion of results.

```java
// Pseudo-code example:
PCollection<KV<Team, Integer>> totals = input 
    .apply(Window.into(FixedWindows.of(TWO_MINUTES)))
    .triggering(AfterWatermark())
    .apply(Sum.integersPerKey());
```
x??

---

#### Example Pipeline with Watermarks
Explanation of an example pipeline that uses watermarks.
:p What does the provided example pipeline demonstrate?
??x
The example demonstrates a pipeline where `PCollection` elements are processed within fixed windows and use an after-watermark trigger to ensure completeness before producing results. This setup allows for accurate computation even when dealing with late arriving data.

```java
// Pseudo-code example:
PCollection<KV<Team, Integer>> totals = input 
    .apply(Window.into(FixedWindows.of(TWO_MINUTES)))
    .triggering(AfterWatermark())
    .apply(Sum.integersPerKey());
```
x??

---

#### Watermarks and Different Implementations
Explanation of how the same dataset can use different watermark implementations.
:p How can watermarks vary in implementation?
??x
Watermarks can differ based on the specific algorithm used to calculate them. For scenarios with perfect input knowledge, a perfect watermark can be implemented, providing strict guarantees. However, for cases lacking this information or where it's computationally expensive, heuristic watermarks are more practical and provide an educated estimate.

```java
// Pseudo-code example:
class PerfectWatermark {
    public int F(P) { 
        return E; // Strict guarantee of completeness 
    }
}

class HeuristicWatermark {
    public int F(P) { 
        return estimatedE; // Estimate based on available data 
    }
}
```
x??

---


#### Watermarks and Their Importance in Event-Time Processing

Background context explaining the concept. In event-time processing, watermarks are used to capture the completeness of input data. They help in determining when an output for a window can be considered complete based on the time events could have arrived.

:p What is the role of watermarks in event-time processing?
??x
Watermarks serve as a marker indicating that all input events with timestamps before or equal to the watermark value are expected to have been received. This helps in determining when a window's output can be considered complete, thus enabling proper handling of late data and reasoning about missing data.

```java
// Pseudocode for updating watermarks
public void updateWatermark(long currentEventTime) {
    if (currentEventTime > lastKnownEarliestUnprocessedTimestamp) {
        lastKnownEarliestUnprocessedTimestamp = currentEventTime;
    }
}
```
x??

---

#### Perfect vs. Heuristic Watermarks

Background context explaining the concept. The text contrasts two types of watermarks: perfect and heuristic. A perfect watermark precisely marks when all events before a certain time have been received, whereas a heuristic watermark makes an educated guess about completeness based on observed patterns.

:p What is the difference between a perfect watermark and a heuristic watermark?
??x
A **perfect watermark** accurately captures the event-time completeness of the pipeline as it progresses. It ensures that once a watermark reaches a window's end, all possible input events for that window have been received.

In contrast, a **heuristic watermark** is an approximation based on observed patterns in the data stream. While it can provide early results and reduce latency, it may incorrectly trigger output before all relevant data has arrived, leading to potential correctness issues.

```java
// Example of heuristic watermark logic
public class HeuristicWatermark {
    private long lastProcessedTimestamp;
    
    public void update(long currentEventTime) {
        if (currentEventTime > lastProcessedTimestamp + threshold) {
            // Advance the watermark based on observed patterns
            lastProcessedTimestamp = currentEventTime - threshold;
        }
    }
}
```
x??

---

#### Latency Issues with Watermarks

Background context explaining the concept. The text discusses two main latency issues related to watermarks: they can be too slow or too fast, impacting the performance and correctness of event-time processing systems.

:p What are the latency issues associated with using watermarks in event-time processing?
??x
Watermarks can suffer from being **too slow** when known unprocessed data delays their advancement. This results in delayed output as the watermark waits for all possible input events before advancing.

Conversely, they can be **too fast**, causing late data to be incorrectly processed by triggering output prematurely. This issue is more common with heuristic watermarks, which make assumptions about completeness that may not always hold true.

```java
// Example of delayed watermark logic (slow)
public void processEvent(long eventTime) {
    if (eventTime > lastWatermark + knownDelayThreshold) {
        lastWatermark = eventTime;
        // Advance the watermark only when all events are expected to have arrived
    }
}
```

x??

---

#### Combining Repeated Updates and Watermarks

Background context explaining the concept. The text suggests that combining repeated update triggers for low latency with watermarks for completeness can provide a balanced approach to event-time processing.

:p How can we combine repeated updates and watermarks for better performance?
??x
To combine the benefits of both repeated updates and watermarks, one could implement a strategy where:

1. **Repeated Updates:** Continuously process new data as they arrive, providing early results.
2. **Watermark Advancement:** Use watermarks to ensure that output is only materialized when all relevant input events are likely complete.

This hybrid approach can provide the best of both worlds: low latency from repeated updates and correctness from watermark-based completeness checks.

```java
// Pseudocode for combining repeated updates and watermarks
public class HybridTrigger {
    private long lastWatermark;
    
    public void processEvent(long eventTime) {
        // Repeated update logic
        if (eventTime > lastProcessedTimestamp) {
            // Process the event immediately
            lastProcessedTimestamp = eventTime;
            emitResults();
        }
        
        // Watermark logic
        if (eventTime > lastWatermark + knownDelayThreshold) {
            lastWatermark = eventTime;
            // Ensure all events with timestamps <= watermark have been processed
            if (allEventsProcessed(lastWatermark)) {
                emitFinalResults();
            }
        }
    }
}
```
x??

---

