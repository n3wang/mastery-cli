# High-Quality Flashcards: 2B005---Streaming-Systems_processed (Part 8)


**Starting Chapter:** Processing-Time Watermarks

---


#### Percentile Watermarks
Background context explaining how percentile watermarks are used to draw window boundaries. They help in early triggering of windows but trade off with increased late data marking.
:p What is a percentile watermark, and what does it allow?
??x
A percentile watermark tracks the timestamp percentiles of the arrived data to draw earlier window boundaries. For example, a 33rd percentile watermark allows for earlier window closure based on the 33rd percentile timestamp in the data distribution, while still including some late events.
```java
// Pseudocode for calculating a 33rd Percentile Watermark
double calculateWatermark(double[] timestamps) {
    Arrays.sort(timestamps);
    int index = (int)(0.33 * timestamps.length); // Adjusted for percentile calculation
    return timestamps[index];
}
```
x??

---
#### Effects of Varying Watermark Percentiles
Explaining how different percentiles affect the number of events included and the processing time delay.
:p How do varying watermark percentiles impact window boundaries in a streaming system?
??x
Different watermark percentiles (e.g., 33rd, 66th, and 100th) allow for earlier or later window closures based on where they are set. The higher the percentile, the more events will be included but with greater processing delay.
For instance:
- A 33rd percentile watermark might include fewer events but can close windows faster, leading to lower materialization time (e.g., 12:06).
- A 66th percentile watermark would include more events and may delay window closure slightly longer, e.g., until 12:07.
- The full (100th) percentile watermark includes all data but delays the window materialization to its latest timestamp (e.g., 12:08).
x??

---
#### Processing-Time Watermarks
Explanation of processing-time watermarks and their distinction from event-time watermarks. Discussing how operations in a stream processing system contribute to processing delay.
:p What is a processing-time watermark, and why is it necessary?
??x
A processing-time watermark tracks the timestamp of the oldest operation that has not yet been completed within the pipeline. It helps distinguish between delays caused by data buffering (event-time delay) and those due to stuck operations in the system itself.

For example:
- If a network issue or failure causes a stuck message delivery, it will show up as an increase in processing-time watermark delay.
- Buffering state for window aggregation shows up as increased event-time watermark delay but stable processing-time watermark delay.
```java
// Pseudocode for calculating Processing-Time Watermark
class ProcessingTimeWatermark {
    private long oldestPendingOperationTimestamp;

    public void update(long currentTimestamp) {
        if (oldestPendingOperationTimestamp > currentTimestamp) {
            // Update to the latest timestamp of an uncompleted operation
            oldestPendingOperationTimestamp = currentTimestamp;
        }
    }

    public long get() {
        return oldestPendingOperationTimestamp;
    }
}
```
x??

---
#### Distinction Between Data Delay and System Processing Delay
Illustrating how processing-time watermarks help in distinguishing between delays due to data buffering and system processing issues.
:p How do event-time and processing-time watermarks differ, and why are both necessary?
??x
Event-time watermarks track the oldest timestamp of uncompleted work based on the timestamps within the data. Processing-time watermarks track the timestamp of the oldest uncompleted operation in the pipeline.

For instance:
- In Figure 3-12, an increase in event-time watermark delay might indicate buffering.
- In Figure 3-13, an increase in processing-time watermark delay indicates a system issue (e.g., stuck operations).

By monitoring both watermarks, you can determine whether delays are due to data buffering or system processing issues. 
```java
// Example of comparing Event-Time and Processing-Time Watermarks
public class WatermarkMonitor {
    private long eventTimeWatermark;
    private long processingTimeWatermark;

    public void checkStatus() {
        if (eventTimeWatermark > processingTimeWatermark) {
            System.out.println("Possible data buffering issue.");
        } else if (processingTimeWatermark > eventTimeWatermark) {
            System.out.println("System processing delay detected.");
        }
    }
}
```
x??

---


#### GroupByKey Operation in Dataflow
Background context: In Google Cloud Dataflow, a `GroupByKey` operation is used to group elements by their keys. This often necessitates shuffling data between different workers responsible for processing different key ranges.

:p What is the purpose of a `GroupByKey` operation?
??x
The purpose of a `GroupByKey` operation is to aggregate elements with the same key, ensuring that all elements with the same key are processed together. This operation requires data shuffling because it may involve moving data from one worker's processing step to another based on the keys.
```java
// Pseudocode for GroupByKey
public class GroupByKey {
    public void processElement(Pair<K, V> element) {
        K key = element.getKey();
        V value = element.getValue();
        
        // Perform grouping logic here
        if (groupMap.containsKey(key)) {
            groupMap.get(key).add(value);
        } else {
            List<V> values = new ArrayList<>();
            values.add(value);
            groupMap.put(key, values);
        }
    }
}
```
x??

---

#### Watermark Aggregation in Dataflow
Background context: Google Cloud Dataflow maintains watermarks for each key range and aggregates them to ensure correctness. The watermark must be propagated across the distributed system to handle late data correctly.

:p How does Dataflow aggregate watermarks?
??x
Dataflow aggregates watermarks by computing the minimum watermark value across all ranges. This ensures that the overall watermark reflects the slowest progress among all processing steps, thus handling late data appropriately without prematurely advancing the watermark.
```java
// Pseudocode for Watermark Aggregation
public class WatermarkAggregator {
    private Map<String, Long> watermarksPerRange = new HashMap<>();

    public void updateWatermark(String key, long watermark) {
        if (watermarksPerRange.containsKey(key)) {
            watermarksPerRange.put(key, Math.min(watermarksPerRange.get(key), watermark));
        } else {
            watermarksPerRange.put(key, watermark);
        }
    }

    public long getGlobalWatermark() {
        return watermarksPerRange.values().stream()
                             .min(Long::compare)
                             .orElse(Long.MAX_VALUE);
    }
}
```
x??

---

#### Watermark Correctness in Dataflow
Background context: Ensuring that the watermark is correctly managed to avoid premature advancement, which could turn on-time data into late data. This involves checking state ownership leases.

:p How does Dataflow ensure watermark correctness?
??x
Dataflow ensures watermark correctness by validating that a worker process still holds a lease on its persistent state before allowing it to update the watermark. This prevents premature updates that would make on-time data appear as late data.
```java
// Pseudocode for Watermark Update Protocol
public class WatermarkUpdater {
    private Map<String, String> leases = new HashMap<>();

    public void requestLease(String key) {
        // Grant lease to worker
        leases.put(key, "leased");
    }

    public boolean updateWatermark(String key, long watermark) {
        if (leases.containsKey(key) && leases.get(key).equals("leased")) {
            // Update the watermark and return true
            // ...
            return true;
        } else {
            // Return false to indicate lease validation failed
            return false;
        }
    }
}
```
x??

---

#### Watermark Aggregation via Centralized Agent in Dataflow
Background context: Google Cloud Dataflow uses a centralized aggregator agent for efficient watermark aggregation. This agent must handle state ownership leases to ensure correctness.

:p How does the centralized aggregator manage watermarks?
??x
The centralized aggregator manages watermarks by aggregating them from individual workers and ensuring that updates are only accepted if the worker still holds the necessary lease on its persistent state, thus maintaining correct and consistent watermark values.
```java
// Pseudocode for Centralized Watermark Aggregation
public class CentralizedAggregator {
    private Map<String, Long> watermarksPerRange = new HashMap<>();

    public void updateWatermark(String key, long watermark) {
        if (requestLease(key)) { // Request lease from worker
            if (watermarksPerRange.containsKey(key)) {
                watermarksPerRange.put(key, Math.min(watermarksPerRange.get(key), watermark));
            } else {
                watermarksPerRange.put(key, watermark);
            }
        }
    }

    private boolean requestLease(String key) {
        // Logic to request and validate lease
        return true; // Placeholder for actual validation logic
    }
}
```
x??

---

#### Late Data Handling in Flink
Background context: Apache Flink is designed to handle late data effectively, ensuring that data processing systems can deal with out-of-order or delayed data. This involves maintaining state and reprocessing elements when necessary.

:p How does Flink manage late data?
??x
Apache Flink manages late data by maintaining the state of processed elements and reprocessing them if they arrive after a certain latency threshold has been reached. This ensures that all data is processed as accurately as possible, even if it arrives out of order or with significant delays.
```java
// Pseudocode for Late Data Handling in Flink
public class LateDataHandler {
    private Map<String, State> stateTable = new HashMap<>();

    public void processElement(T element) {
        String key = getKey(element);
        State currentState = stateTable.get(key);

        if (currentState == null || !currentState.isFinal()) {
            // Process the element and update its state
            processAndUpdateState(currentState, element);
        } else {
            // Handle late data by reprocessing
            reprocessElement(element);
        }
    }

    private void processAndUpdateState(State currentState, T element) {
        // Logic to process and update state
        currentState.update(element);
    }

    private void reprocessElement(T element) {
        // Logic to reprocess the element
        // ...
    }
}
```
x??

---


#### In-Band Watermarks in Flink
In Flink, watermarks are tracked and aggregated directly within the pipeline without relying on a centralized agent. This approach allows for more efficient and lower latency watermark propagation compared to Google Cloud Dataflow's out-of-band method.

:p What is the key difference between Flink’s in-band watermark tracking and Google Cloud Dataflow’s watermark aggregation?
??x
Flink performs watermark tracking and aggregation within the processing pipeline itself, whereas Google Cloud Dataflow uses a centralized watermark aggregator. The in-band approach means that watermark checkpoints are sent synchronously with data streams, leading to reduced latency and no single point of failure for watermark delays.

In contrast, the out-of-band method in Google Cloud Dataflow requires watermarks to be aggregated centrally, which can introduce additional latency and single points of failure.
x??

---
#### Reduced Watermark Propagation Latency
Flink’s in-band approach allows watermarks to propagate more quickly because they are sent directly with the data stream. This reduces the overall latency compared to an out-of-band method that requires watermark data to traverse multiple hops.

:p How does Flink's in-band watermark propagation reduce latency?
??x
In Flink, watermarks are propagated synchronously within the data streams, meaning that when a watermark checkpoint is emitted for a certain timestamp, it guarantees that no non-late data will be emitted with timestamps behind this value. This avoids the need to aggregate watermarks through multiple hops and central agents, thereby reducing latency.

Here’s an example of how Flink might handle watermarks:
```java
// Pseudo code for generating and emitting watermarks in a Flink pipeline
public class WatermarkGenerator {
    private long currentWatermark;

    public void processElement(Data data) {
        // Update the watermark based on the element's timestamp
        if (data.getTimestamp() > currentWatermark) {
            currentWatermark = data.getTimestamp();
            // Emit the updated watermark checkpoint
            emitWatermark(currentWatermark);
        }
    }

    private void emitWatermark(long timestamp) {
        // Code to send the watermark with the data stream
    }
}
```
x??

---
#### No Single Point of Failure for Watermark Aggregation
Flink’s in-band approach eliminates a single point of failure by distributing watermark aggregation throughout the pipeline. If part of the pipeline fails, it does not affect the overall watermark propagation.

:p How does Flink's in-band method prevent single points of failure?
??x
In an in-band watermark approach, each operator within the Flink pipeline handles its own watermarking logic and emits checkpoints with data streams. This means that even if one part of the pipeline fails, it won’t delay watermarks for other parts of the pipeline, ensuring more robust reliability.

For example, consider a scenario where source A stops processing:
- If there’s an unavailability in the central watermark aggregator, all downstream operators may experience delays.
- With Flink's in-band method, only the specific part of the pipeline that failed would be affected, not the entire system.

```java
// Pseudo code for handling watermarks in a failing scenario
public class Operator {
    private long currentWatermark;

    public void processElement(Data data) throws Exception {
        try {
            // Process and update watermark
            if (data.getTimestamp() > currentWatermark) {
                currentWatermark = data.getTimestamp();
                emitWatermark(currentWatermark);
            }
        } catch (Exception e) {
            throw new RuntimeException("Operator failed", e);
        }
    }

    private void emitWatermark(long timestamp) throws Exception {
        // Send watermark with the data stream
        sendWatermark(timestamp);
    }
}
```
x??

---
#### Inherent Scalability of Flink’s In-Band Watermarks
Flink’s in-band approach inherently scales better than out-of-band methods because it does not rely on a single central service for watermark aggregation. This reduces the complexity required to scale the system.

:p Why is Flink's in-band method more scalable compared to Google Cloud Dataflow?
??x
The scalability of Flink’s in-band watermark approach comes from its distributed nature, where each operator handles its own watermarking logic independently. Unlike a centralized service that might bottleneck or require complex coordination, Flink ensures that watermarks are managed locally within the pipeline.

For instance, if you have multiple parallel instances of operators:
- Each instance can generate and send watermarks independently.
- This local management reduces the overall load on any single point in the system, making it easier to scale horizontally.

```java
// Pseudo code for distributed watermark handling
public class DistributedOperator {
    private long currentWatermark;

    public void processElement(Data data) throws Exception {
        try {
            // Local watermark update and emission
            if (data.getTimestamp() > currentWatermark) {
                currentWatermark = data.getTimestamp();
                emitWatermark(currentWatermark);
            }
        } catch (Exception e) {
            throw new RuntimeException("Operator failed", e);
        }
    }

    private void emitWatermark(long timestamp) throws Exception {
        // Local send of watermark with the data stream
        sendLocalWatermark(timestamp);
    }
}
```
x??

---
#### Single Source of Truth for Watermarks in Google Cloud Dataflow
Google Cloud Dataflow’s out-of-band approach provides a centralized service that acts as a single source of truth for watermarks, which can be advantageous for debugging and monitoring the pipeline.

:p Why is having a central watermark service beneficial for debugging and monitoring?
??x
A central watermark service in Google Cloud Dataflow offers several benefits:
1. **Centralized Monitoring**: It provides a unified view of the progress across all components of the pipeline.
2. **Debugging Ease**: Engineers can easily track and debug issues by referring to a single source of truth for watermarks.
3. **Input Throttling**: Watermark values can be used to control the rate at which data is processed, allowing better resource management.

For example:
- If you need to throttle input based on pipeline progress, having a central service that provides watermark values makes it simpler to implement such logic.
- Debugging becomes easier because all components reference the same watermark values generated by the central service.

```java
// Pseudo code for monitoring and controlling input rate using watermarks
public class Throttler {
    private WatermarkService watermarkService;

    public void processElement(Data data) throws Exception {
        long currentWatermark = watermarkService.getCurrentWatermark();
        if (data.getTimestamp() > currentWatermark) {
            // Process the element
        } else {
            // Throttle input based on the watermark
        }
    }
}
```
x??

---
#### Source Watermarks in Google Cloud Pub/Sub
Source watermarks in Google Cloud Pub/Sub require global information to generate accurate checkpoints. This is easier to achieve with a centralized service that can gather and disseminate this information.

:p How do source watermarks for Google Cloud Pub/Sub differ from those generated by Flink?
??x
In Google Cloud Pub/Sub, generating source watermarks often requires gathering information from the entire system or global state, which is more straightforward when managed centrally. For example:
- Pub/Sub sources might need to know about idle periods, low data rates, or other external conditions that affect watermark generation.
- A centralized service can aggregate and distribute this information efficiently.

In contrast, Flink’s in-band approach relies on local processing where each operator updates its watermark based on the incoming data. This makes it challenging for a single source (like Pub/Sub) to provide comprehensive global state needed for accurate watermarks without additional coordination.

```java
// Pseudo code for generating source watermarks in Google Cloud Pub/Sub
public class PubSubSource {
    private WatermarkService watermarkService;

    public void processMessage(Message message) throws Exception {
        long currentWatermark = watermarkService.getCurrentGlobalWatermark();
        if (message.getTimestamp() > currentWatermark) {
            // Update and emit the watermark
        }
    }
}
```
x??

