# High-Quality Flashcards: 2B005---Streaming-Systems_processed (Part 6)


**Starting Chapter:** 3. Watermarks. Definition

---


#### Watermark Introduction
Background context: In event-time processing, we need to determine when it is safe to consider an event-time window closed. This involves understanding where in event time data are processed and when results are materialized.

:p What is a watermark used for in stream processing?
??x
A watermark is used to indicate the progress of the pipeline relative to its unbounded input, allowing us to determine when it is safe to close an event-time window without missing any more data. It helps in ensuring correctness by tracking the oldest unprocessed message's timestamp.
x??

---
#### Naive Approaches Explained
Background context: Two naive approaches for solving the event-time windowing problem are considered but found wanting due to their lack of robustness.

:p Why is simply basing event-time windows on processing time not a good strategy?
??x
Basing event-time windows solely on processing time is problematic because processing and event times rarely coincide. Delays in data processing or transmission can lead to incorrect window assignments, making this approach unreliable for ensuring correctness.
x??

---
#### Rate-Based Approach Limitations
Background context: Considering the rate of messages processed by the pipeline also has limitations as it does not address completeness or guarantee that all messages for a specific time interval have been seen.

:p Why is relying on processing rate insufficient to determine when an event-time window can be closed?
??x
Reliance on processing rate alone is insufficient because rates can vary widely based on input variability, resource availability, and other factors. It does not provide information about whether all messages for a specific time interval have been processed, which is crucial for correctness.
x??

---
#### Event Timestamp Assumption
Background context: Each message in the stream has an associated logical event timestamp that represents when the event occurred.

:p What is the significance of each message having a logical event timestamp?
??x
The significance of each message having a logical event timestamp is that it allows us to track and manage progress in processing unbounded data. This helps in determining the watermark, which indicates where we are relative to the oldest unprocessed event.
x??

---
#### Watermark Calculation
Background context: The watermark is defined as the leftmost edge of the "in-flight" distribution of messages, representing the oldest unprocessed event timestamp.

:p How do you calculate a watermark from message timestamps?
??x
To calculate a watermark, we examine the distribution of event timestamps for active in-flight messages. The watermark is set at the leftmost edge of this distribution, which corresponds to the oldest unprocessed event timestamp.
```java
// Pseudocode to calculate watermark
public int getWatermark(List<Integer> timestamps) {
    if (timestamps.isEmpty()) return -1; // No messages ingested yet
    return Collections.min(timestamps); // Find and return the minimum timestamp
}
```
x??

---
#### Watermark Propagation
Background context: Watermarks propagate through a data processing pipeline, affecting how output timestamps are determined.

:p How do watermarks affect the processing of an event-time window?
??x
Watermarks affect the processing of an event-time window by ensuring that only messages with timestamps greater than or equal to the watermark can be considered for inclusion in the current window. This helps maintain correctness by excluding any outdated events.
x??

---
#### Output Timestamps and Watermarks
Background context: The presence of watermarks influences when results are materialized, ensuring completeness.

:p How do watermarks influence output timestamps?
??x
Watermarks influence output timestamps by effectively marking the boundary between processed and unprocessed data. When a watermark is advanced, it signifies that we have seen all messages up to that point in time, thus allowing us to close the window and produce results accordingly.
```java
// Pseudocode for materializing results based on watermarks
public void materializeResults(List<Integer> timestamps) {
    int latestWatermark = getLatestWatermark(timestamps);
    for (int timestamp : timestamps) {
        if (timestamp >= latestWatermark) {
            processAndOutput(timestamp); // Process and output valid messages
        }
    }
}
```
x??

---
#### Robust Progress Measure
Background context: Watermarks provide a more robust measure of progress than rate-based metrics.

:p Why is the watermark a better measure of progress compared to processing rates?
??x
Watermarks are a better measure of progress because they directly track the oldest unprocessed event, ensuring that we have seen all relevant data up to that point. In contrast, processing rates can vary widely and do not guarantee completeness or correctness.
x??

---


#### Watermark Concept
Watermarks are a critical mechanism used in stream processing to determine when to close windows and ensure correctness. The watermark is a monotonically increasing timestamp of the oldest work not yet completed.
:p What is a watermark in the context of stream processing?
??x
A watermark is a monotonic timestamp that indicates the oldest unprocessed data within a windowed processing system. It helps in determining when to emit results and close windows, ensuring completeness and visibility.
x??

---
#### Completeness Property
The watermark allows you to correctly emit any aggregations at or before the current watermark timestamp $T$, as no more on-time events will occur past this timestamp due to its monotonic nature.
:p What does the completeness property of a watermark guarantee?
??x
The completeness property guarantees that once the watermark has advanced past some timestamp $T $, no more processing will occur for on-time (non-late) data at or before $ T$. This ensures that any aggregations emitted up to this point are complete and can be trusted.
x??

---
#### Visibility Property
A message stuck in the pipeline prevents the watermark from advancing, allowing you to identify the source of delays by examining the message blocking progress.
:p What does the visibility property allow us to do?
??x
The visibility property allows us to pinpoint where a delay or blockage is occurring within the pipeline. If messages are getting delayed, it helps in identifying and resolving issues by looking at the specific message that is preventing the watermark from advancing.
x??

---
#### Watermark Creation Source
Watermarks for data sources can be created either perfectly or heuristically. Perfect watermarks ensure accurate timestamps on every event, while heuristic methods approximate these values based on observed behavior.
:p Where do watermarks come from?
??x
Watermarks are generated by assigning logical event timestamps to messages as they enter the pipeline from their source. The method used can be either perfect, where exact timestamps are assigned, or heuristic, where approximations are made based on observed data patterns.
x??

---
#### Perfect Watermark Example
Perfect watermarks guarantee precise timestamps for every message, ensuring no late events slip through undetected. In a windowed summation example, each event gets its timestamp accurately placed.
:p What is the role of perfect watermarks in stream processing?
??x
Perfect watermarks ensure that every message has an accurate timestamp, allowing for precise handling of on-time and late data. This guarantees correctness but may be more resource-intensive compared to heuristic methods.
x??

---
#### Heuristic Watermark Example
Heuristic watermarks approximate timestamps based on observed patterns or heuristics within the stream. They are less precise than perfect watermarks but can still provide useful information for windowing and watermarking operations.
:p How do heuristic watermarks differ from perfect ones?
??x
Heuristic watermarks use approximations based on observed behavior in the data stream, making them less precise but more efficient than perfect watermarks. This approach balances accuracy with computational efficiency.
x??

---
#### Example Code: Watermark Creation
Here's a simplified example of how watermarks can be created using pseudocode:
```java
public class Event {
    private long timestamp;
    // other fields and methods
}

public class WatermarkCreator {
    private long latestWatermark;

    public void update(Event event) {
        if (event.timestamp > latestWatermark) {
            latestWatermark = event.timestamp; // Update watermark based on the new event's timestamp
        }
    }

    public long getLatestWatermark() {
        return latestWatermark;
    }
}
```
:p How would you implement a basic watermark creator in Java?
??x
You can implement a watermark creator by maintaining a variable to track the latest timestamp seen. Whenever an event is received, check its timestamp against this value and update if necessary:
```java
public class Event {
    private long timestamp;
    // other fields and methods
}

public class WatermarkCreator {
    private long latestWatermark;

    public void update(Event event) {
        if (event.timestamp > latestWatermark) {
            latestWatermark = event.timestamp; // Update watermark based on the new event's timestamp
        }
    }

    public long getLatestWatermark() {
        return latestWatermark;
    }
}
```
This ensures that the watermark always reflects the most recent processing point, helping to manage windows correctly.
x??


#### Perfect Watermark Creation
Background context: Perfect watermark creation ensures that no data with event times less than the watermark will ever be seen again from this source. This method provides a strict guarantee, making pipelines using perfect watermarks free from late data. However, it requires perfect knowledge of the input, which is impractical for many real-world distributed inputs.

:p What is perfect watermark creation in the context of stream processing?
??x
Perfect watermark creation assigns timestamps to incoming messages such that the resulting watermark guarantees no data with event times less than the watermark will be seen again from this source. It provides a strict guarantee and ensures pipelines do not have to deal with late data, as all future data will have event times greater than or equal to the watermark.

Example: Consider a system where ingress timestamps are used for assigning event times. The watermark then tracks the current processing time relative to the arrival of new messages in the pipeline.
??x
---

#### Heuristic Watermark Creation
Background context: Heuristic watermark creation offers an estimate that no data with event times less than the watermark will be seen again, but this estimation might include some late data. This method is more flexible and practical for many real-world distributed inputs where perfect knowledge of all input sources is not feasible.

:p What distinguishes heuristic watermark creation from perfect watermark creation?
??x
Heuristic watermark creation provides an estimate that no data with event times less than the watermark will be seen again, which might include some late data. Unlike perfect watermark creation, it does not provide a strict guarantee and may require pipelines to handle late data.

Example: In dynamic sets of time-ordered logs, tracking the minimum unprocessed event times across existing files can create an accurate heuristic watermark by leveraging available knowledge about the input.
??x
---

#### Use Cases for Perfect Watermark Creation
Background context: Perfect watermarks are ideal in scenarios where input timestamps can be assigned perfectly, such as ingress timestamping and static sets of time-ordered logs. These cases offer a strict guarantee that no late data will occur.

:p Which use case exemplifies perfect watermark creation with ingress timestamps?
??x
Ingress timestamping is an example of perfect watermark creation. It involves assigning event times based on the current processing time as messages enter the system, ensuring that the watermark tracks the progress of data relative to their arrival in the system without losing event times.

Example: 
```java
public class IngressTimestamping {
    private long currentTime;

    public void processMessage(Message message) {
        message.setEventTime(currentTime++);
        // Process the message
    }
}
```
??x
---

#### Use Cases for Heuristic Watermark Creation
Background context: Heuristic watermarks are more practical in scenarios where perfect knowledge of all input sources is not feasible, such as dynamic sets of time-ordered logs and Google Cloud Pub/Sub. These use cases require creating an accurate estimate to manage late data.

:p Which example illustrates the application of heuristic watermark creation with dynamic sets of time-ordered logs?
??x
Dynamic sets of time-ordered logs represent a scenario where heuristic watermark creation can be effectively used. By tracking the minimum unprocessed event times across existing files and monitoring growth rates, an accurate heuristic watermark can be established even without perfect knowledge of all inputs.

Example: 
```java
public class HeuristicWatermarkCreator {
    private Map<String, Long> minEventTimes = new HashMap<>();

    public void updateWatermark(String logFile, long minEventTime) {
        minEventTimes.put(logFile, Math.min(minEventTimes.getOrDefault(logFile, 0L), minEventTime));
    }

    public long getWatermark() {
        return Collections.min(minEventTimes.values());
    }
}
```
??x
---

