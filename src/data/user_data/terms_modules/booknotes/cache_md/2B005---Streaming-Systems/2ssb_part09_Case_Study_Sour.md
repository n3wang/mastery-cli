# High-Quality Flashcards: 2B005---Streaming-Systems_processed (Part 9)


**Starting Chapter:** Case Study Source Watermarks for Google Cloud PubSub

---


#### Pub/Sub Workflow Overview
Background context explaining how Google Cloud Pub/Sub works. Messages are published on topics, which can be subscribed to by any number of subscriptions. The same messages are delivered on all subscriptions for a given topic.

:p What does Pub/Sub do with messages published on a topic?
??x
Google Cloud Pub/Sub delivers the same messages to all subscriptions associated with a specific topic. This ensures that every subscribing client receives the same data.
x??

---

#### Base and Tracking Subscriptions
Explanation of the two types of subscriptions used in the watermark estimation process: base subscription for actual data processing and tracking subscription for metadata collection.

:p How are the base and tracking subscriptions utilized in the Pub/Sub environment?
??x
The base subscription is used by the pipeline to read and process data. The tracking subscription is used exclusively for gathering metadata, such as event timestamps of unacknowledged messages, to estimate a watermark.

Example:
- Base Subscription: `SUBSCRIBE topic`
- Tracking Subscription: `SUBSCRIBE topic track-metadata`

This setup allows the system to monitor backlog conditions without affecting the main processing flow.
x??

---

#### Watermark Estimation Process
Explanation of how the minimum event timestamp from unacknowledged messages is used to create a watermark, considering reordering bounds.

:p How does the tracking subscription contribute to estimating watermarks?
??x
The tracking subscription helps by inspecting the backlog of unacknowledged messages on the base subscription and taking the minimum of their event timestamps. This value is then used as an estimate for the watermark, allowing the pipeline to handle reordering up to a defined estimation band.

Example:
```python
# Pseudocode for Watermark Estimation
def estimate_watermark(base_sub):
    min_event_time = float('inf')
    
    while not base_sub.has_backlog():
        msg = base_sub.pull_next_message()
        
        if msg.ack_id == 'unacked':
            event_timestamp = msg.event_timestamp
            if event_timestamp < min_event_time:
                min_event_time = event_timestamp
    
    watermark = min_event_time - estimation_band
    return watermark

# Example call to estimate_watermark
estimated_wm = estimate_watermark(base_subscription)
```
x??

---

#### Handling Backlog and Late Data
Explanation of managing the backlog by acknowledging messages as soon as possible, ensuring that late data do not impact the pipeline.

:p How is the backlog managed in the Pub/Sub watermark estimation?
??x
Backlog management involves continuously pulling from the tracking subscription to inspect unacknowledged messages. Messages on this subscription are acknowledged immediately after their metadata (publish and event timestamps) is durably saved, using a sparse histogram format for efficient storage and writes.

Example:
```python
# Pseudocode for Managing Backlog
def manage_backlog(subscription):
    while not subscription.is_empty():
        msg = subscription.pull_message()
        
        if msg.ack_id == 'unacked':
            save_metadata(msg)
            acknowledge_message(msg)

def save_metadata(msg):
    # Save publish and event timestamps in a sparse histogram format

def acknowledge_message(msg):
    # Acknowledge the message to remove it from backlog
```
x??

---

#### Estimation Band Consideration
Explanation of why an estimation band is necessary and how it affects watermark calculation.

:p What is the role of the estimation band in the watermark calculation?
??x
The estimation band represents the allowed reordering time for timestamps, ensuring that messages within this 10-second window are considered on-time. The watermark is set to be 10 seconds behind real time to account for potential reordering. This means any message sent within the last 10 seconds before being published will not be marked as late.

Example:
```python
# Example of setting up an estimation band
estimation_band = 10  # in seconds

def calculate_watermark(oldest_unacked_timestamp):
    return oldest_unacked_timestamp - estimation_band
```
x??

---

#### Watermark Advance Conditions
Explanation of the conditions under which the watermark is advanced, including when to stop advancing it.

:p Under what conditions does the system advance the watermark?
??x
The watermark is advanced based on two main conditions: 
1. The tracking subscription must be ahead by at least the estimation band.
2. Alternatively, if there is no backlog in the tracking subscription (it is sufficiently close to real time).

Example:
```python
def should_advance_watermark(tracking_sub, base_sub):
    oldest_unacked = base_sub.oldest_unacknowledged_message()
    
    if tracking_sub.is_ahead_of(base_sub, by=estimation_band) or \
       not tracking_sub.has_backlog():
        return True
    
    return False
```
x??

---

#### Sparse Histogram for Metadata Storage
Explanation of using a sparse histogram to store metadata efficiently.

:p How does the system use a sparse histogram for storing metadata?
??x
A sparse histogram is used to store event and publish timestamps efficiently, minimizing storage space and write operations. This approach ensures that only relevant data are saved, making it optimal for long-term backlogs.

Example:
```python
class SparseHistogram:
    def __init__(self):
        self.histogram = {}
    
    def save_timestamp(self, timestamp_type, timestamp):
        if timestamp not in self.histogram[timestamp_type]:
            self.histogram[timestamp_type][timestamp] = 1
    
    def get_min_timestamp(self, timestamp_type):
        min_time = float('inf')
        for time in self.histogram[timestamp_type].keys():
            if time < min_time:
                min_time = time
        return min_time

# Example usage
histogram = SparseHistogram()
histogram.save_timestamp("event", 1609459200)
print(histogram.get_min_timestamp("event"))  # Output: 1609459200
```
x??

---

#### Watermark Estimation in Sparse Data Scenarios
Explanation of the behavior when data are sparse or infrequent, leading to potential delays in watermark advancement.

:p What happens if there is not enough recent data for a reasonable watermark estimate?
??x
In cases where the input data are sparse or infrequent, the system might not have enough recent messages to build a reliable watermark. To ensure continuous progress, the watermark can be advanced to near real time after more than two minutes with no backlog.

Example:
```python
def estimate_watermark_sparce_data(tracking_sub):
    if tracking_sub.has_backlog() or \
       (not tracking_sub.has_messages_in_last_two_minutes()):
        return calculate_watermark(tracking_sub.oldest_unacknowledged_message())
    
    return near_real_time()

# Example call to estimate_watermark_sparce_data
estimated_wm = estimate_watermark_sparce_data(tracking_subscription)
```
x??

---


#### Event Time Timestamp Reordering and Late Data Handling
Explanation: The text mentions that source data-event timestamp reordering within a specific estimation band will ensure no additional late data is introduced. This concept is crucial for understanding how data processing systems handle out-of-order events.

:p What does it mean for source data-event timestamps to be reordered within an estimation band?
??x
Reordered event timestamps are considered acceptable if their reordering falls within a predefined time window or tolerance level (the estimation band). If the reordering is outside this band, additional late data could potentially occur, leading to processing issues.

```java
public class EventTimestampChecker {
    private static final int ESTIMATION_BAND = 10; // in milliseconds

    public boolean isWithinEstimationBand(long timestampA, long timestampB) {
        return Math.abs(timestampA - timestampB) <= ESTIMATION_BAND;
    }
}
```
x??

---

#### Watermarks and Event Time Processing
Explanation: The text discusses the role of watermarks in defining progress in event time processing systems. Watermarks help determine where in event time processing is taking place and when results are materialized.

:p How do watermarks contribute to determining the progress in event time processing?
??x
Watermarks act as markers that indicate the furthest point in event time from which we have received all data with timestamps before or equal to this watermark. This helps in understanding where in the stream of events processing has reached and when results should be materialized.

```java
public class WatermarkEmitter {
    private long currentMaxTimestamp;

    public void onEvent(long timestamp) {
        if (timestamp > currentMaxTimestamp) {
            currentMaxTimestamp = timestamp;
        }
    }

    public long getCurrentWatermark() {
        return currentMaxTimestamp - ESTIMATION_BAND; // Adjust for the estimation band
    }
}
```
x??

---

#### Monotonicity of Watermarks
Explanation: The text points out that watermarks need to be monotonic, meaning they should not decrease once increased. However, if only considering the oldest in-flight event time, this is not always guaranteed.

:p Why is ensuring the monotonicity of watermarks important?
??x
Ensuring the monotonicity of watermarks is crucial because it guarantees that as more data arrives, the watermark can only increase or stay the same but never decrease. This prevents overwriting processed results and ensures consistency in the stream processing system.

```java
public class MonotonicWatermarkChecker {
    private long previousWatermark;

    public boolean checkMonotonicity(long currentWatermark) {
        return currentWatermark >= previousWatermark;
    }

    public void updateWatermark(long newWatermark) {
        if (checkMonotonicity(newWatermark)) {
            this.previousWatermark = newWatermark;
        } else {
            throw new IllegalArgumentException("Watermark is not monotonic.");
        }
    }
}
```
x??

---

#### Input Source Considerations
Explanation: The text mentions that the number of logs at any given time must be known a priori by the system. If the input source is dynamic and the number of logs changes, a heuristic watermark might be necessary.

:p How does the system determine when to use a heuristic watermark?
??x
The system determines whether to use a heuristic watermark based on whether the number of log sources (inputs) is known and static. For dynamic inputs where the number of logs changes unpredictably, a heuristic approach must be used to estimate the watermark accurately.

```java
public class InputSourceChecker {
    private boolean isDynamic;

    public void setDynamicInput(boolean isDynamic) {
        this.isDynamic = isDynamic;
    }

    public boolean useHeuristicWatermark() {
        return isDynamic;
    }
}
```
x??

---

#### Window Start and Watermark Correctness
Explanation: The text notes that the start of a window is not a safe choice for watermark correctness because the first event might arrive after the window has started, causing the watermark to be too conservative.

:p Why is using the start of the window as a watermark not a good idea?
??x
Using the start of the window as a watermark can lead to overestimation issues. Events that arrive after the window has started but before the watermark are not processed until the next watermark, causing unnecessary delays and potentially incorrect results.

```java
public class WindowStartChecker {
    private long windowStart;

    public void setWindowStart(long start) {
        this.windowStart = start;
    }

    public boolean isSafeToUseAsWatermark() {
        // Events may arrive after the window has started
        return false;
    }
}
```
x??

---

#### Percentile Watermark Triggering Scheme
Explanation: The text mentions that a percentile watermark triggering scheme, though not currently implemented in Beam, can be used by other systems to dynamically adjust watermarks based on event distribution.

:p What is the percentile watermark triggering scheme?
??x
The percentile watermark triggering scheme adjusts the watermark based on the distribution of events. It ensures that the watermark reflects where a certain percentage (e.g., 90th percentile) of the events in the window have arrived, providing more dynamic and accurate watermark placement compared to static methods.

```java
public class PercentileWatermarkTrigger {
    private double percentile;

    public PercentileWatermarkTrigger(double percentile) {
        this.percentile = percentile;
    }

    public long getPercentileWatermark(List<Long> timestamps) {
        Collections.sort(timestamps);
        int index = (int) Math.ceil((timestamps.size() - 1) * percentile);
        return timestamps.get(index);
    }
}
```
x??

---


---
#### Processing-Time Windows: Objective and Use Cases
Processing-time windowing is critical for scenarios where you need to analyze data streams as they are observed, without waiting for all events within a given time period. This approach is particularly useful for metrics that depend on real-time observations.

:p Why is processing-time windowing appropriate in certain use cases?
??x
Processing-time windowing is suitable when the order of events and their timing matter for analysis, such as usage monitoring (e.g., web service traffic QPS). It allows you to make decisions based on current data without waiting for all events within a time window.
x??

---
#### Processing-Time Windows: Triggers Method
In this method, event times are ignored, and the system uses triggers to capture snapshots of processing-time windows. This is useful when you need to analyze data as it arrives in real-time.

:p How does the triggers method work for processing-time windowing?
??x
The triggers method involves ignoring event times and creating global windows that span all observed events. Triggers then capture snapshots at specific points in time on the processing-time axis, allowing real-time analysis of incoming streams.
x??

---
#### Processing-Time Windows: Ingress Time Method
In this approach, event times are assigned as ingress times upon data arrival. Then, standard event-time windowing techniques can be applied.

:p How does the ingress time method achieve processing-time windowing?
??x
The ingress time method assigns event times to incoming data based on when they arrive (ingress time). This allows for the application of normal event-time windowing, effectively transforming the problem into one that can handle real-time data streams.
x??

---
#### Differences Between Processing-Time and Event-Time Windowing
Understanding these differences is crucial because many streaming systems use processing-time windowing by default.

:p What are the key differences between processing-time and event-time windowing?
??x
Processing-time windowing analyzes data as it arrives, making decisions based on current observations. Event-time windowing waits for a complete time window before processing data. The main difference lies in when you can make decisions: real-time (processing-time) versus after the entire period has passed (event-time).
x??

---
#### Use Cases for Processing-Time Windowing
Specific scenarios where processing-time windowing is beneficial, such as usage monitoring or anomaly detection.

:p In which use cases would processing-time windowing be the appropriate approach?
??x
Processing-time windowing is ideal for metrics that need real-time updates, like web service traffic QPS or real-time anomaly detection. It allows you to make decisions based on current data without waiting for a complete time window.
x??

---
#### Challenges of Processing-Time Windowing
The main challenge with processing-time windowing is the variability in window contents due to changes in input observation order.

:p What are the downsides of using processing-time windowing?
??x
One major downside of processing-time windowing is that the contents of windows can change significantly if the order of incoming events varies. This makes it challenging to ensure consistent results across different execution orders.
x??

---

