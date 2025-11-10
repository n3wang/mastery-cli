# High-Quality Flashcards: 2B005---Streaming-Systems_processed (Part 2)


**Starting Chapter:** On the Greatly Exaggerated Limitations of Streaming

---


---
#### Streaming vs. Tables
Background context: The text discusses the relationship between streams and tables, emphasizing that SQL systems traditionally deal with tables while MapReduce lineage data processing systems handle streams. It also highlights the importance of understanding time-varying relations in these contexts.

:p What is the difference between a holistic view (tables) and an element-by-element view (streams)?
??x
The key distinction lies in how data is processed: 
- **Tables**: Represent a complete snapshot or historical dataset at a specific point in time, providing a holistic view of the data.
- **Streams**: Offer an element-by-element view showing how the dataset evolves over time. They are more suited for real-time processing and dynamic updates.

In terms of implementation:
```java
// Example: Processing a table (snapshot)
public class TableProcessor {
    public void processTable() {
        // Code to read from and write to a complete dataset snapshot
    }
}

// Example: Processing a stream (dynamic view)
public class StreamProcessor {
    public void processStream() {
        // Code to handle data as it arrives, making decisions or updates in real-time
    }
}
```
x??

---
#### Lambda Architecture
Background context: The text explains the Lambda Architecture, which combines batch and streaming systems to provide both low-latency (inaccurate) results from a stream and eventually correct results from a batch system.

:p What is the Lambda Architecture?
??x
The Lambda Architecture is a design pattern that involves running two pipelines in tandem:
- **Batch Pipeline**: Provides accurate but potentially slower results through a traditional batch processing approach.
- **Streaming Pipeline**: Offers low-latency, speculative or approximate results using a stream processing engine.

The aim is to leverage the strengths of both: real-time responsiveness from streaming and accuracy from batch. However, maintaining such a setup can be complex due to the need for managing two separate pipelines and merging their outputs.

Example of how the Lambda Architecture might be implemented:
```java
public class LambdaArchitect {
    private BatchPipeline batchPipeline;
    private StreamPipeline streamPipeline;

    public void runLambdaArchitecture() {
        // Run both pipelines in parallel and merge results at a later stage
        this.batchPipeline.run();
        this.streamPipeline.run();
        // Logic to merge and reconcile outputs from batch and stream pipelines
    }
}
```
x??

---
#### Kappa Architecture
Background context: Proposed by Jay Kreps, the Kappa Architecture suggests running a single pipeline using well-designed systems that can handle both bounded and unbounded data.

:p What is the Kappa Architecture?
??x
The Kappa Architecture advocates for a unified approach where a single system (ideally designed to be robust) handles both batch processing and stream processing. This avoids the complexity of maintaining dual pipelines as seen in the Lambda Architecture.

Example code illustrating a Kappa Architecture approach:
```java
public class KappaProcessor {
    public void processUnboundedData() {
        // Code logic that can handle both streaming and batch inputs effectively
    }
}
```
x??

---
#### Efficiency Differences Between Batch and Streaming
Background context: The text discusses the efficiency differences between batch and stream processing systems, attributing these differences largely to design choices in handling data bundles and shuffle transports.

:p What are the main reasons for efficiency differences between batch and streaming systems?
??x
The primary reasons for efficiency differences include:
- **Increased Bundling**: Batch systems often bundle data more efficiently, optimizing storage and processing.
- **Sophisticated Optimizations**: Modern batch systems use advanced techniques to achieve high throughput with fewer resources.

To bridge this gap, the text suggests that clever optimizations found in batch systems could be applied to streaming systems for better efficiency. An example of such an approach might involve:
```java
public class HybridProcessor {
    public void optimizeForEfficiency() {
        // Code that incorporates both batch and stream processing techniques
        // For instance, using efficient data structures or parallel processing strategies
    }
}
```
x??

---


#### Event Time vs Processing Time
In data processing, especially for unbounded and unordered data, it is crucial to understand the difference between event time and processing time. Event time represents when events actually occurred, while processing time refers to when they are observed by the system.

The key takeaway here is that in an ideal world, these two times would be equal, but due to various real-world factors like network issues, software limitations, and data characteristics, this is rarely the case. A typical scenario involves a lag or skew between event time and processing time.

:p Explain the difference between event time and processing time.
??x
Event time is the actual occurrence of events as they happen in the real world. Processing time refers to when these events are observed by the system. The skew between these two times can be significant due to various factors such as network delays, software contention, or data distribution.

For example:
- A user logs into a system at 10:00 AM (event time).
- The system receives this log in at 10:30 AM (processing time), showing a 30-minute lag.
??x
---

#### Time-Domain Mapping
The mapping between event time and processing time is visualized on an x-y axis where the x-axis represents event-time completeness, meaning the total amount of data that has been observed up to a given point in event time. The y-axis represents normal clock time as observed by the system.

In real-world systems, the actual progress often looks like the red line in Figure 1-1. This line shows how processing time and event time can be out of sync due to various factors.

:p Describe the x-y axis mapping in a data processing context.
??x
The x-axis represents event-time completeness, showing all events with an occurrence before X have been observed by the system. The y-axis represents the progress of processing time, which is measured as normal clock time from when the processing starts. For instance, if at 10:30 AM (y-axis), the system has seen all events up to 10:00 AM (x-axis), this point would be plotted.

For example:
- At 9:00 AM, event-time completeness is 85%.
- By 10:30 AM, processing time might have completed only 60% of the data due to delays or processing issues.

The red line in Figure 1-1 illustrates this mapping. The black dashed line with a slope of 1 represents an ideal scenario where event and processing times are synchronized.
??x
---

#### Lag/Skew Between Event Time and Processing Time
Lag refers to the vertical distance between the ideal and the actual processing-time line, indicating delay in processing events. Skew is the horizontal distance from the ideal line, showing how far behind in event time the pipeline currently is.

These skews can vary over time due to dynamic factors like network congestion or data throughput variability. Importantly, lag/skew cannot be ignored if you need correct analysis based on actual event times.

:p Define and explain lag and skew in data processing.
??x
Lag refers to the delay observed between when events occur and when they are processed by the system. It is represented as the vertical distance between the ideal line (event time = processing time) and the red line showing reality. Skew, on the other hand, is the horizontal distance from the ideal line, representing how far behind in event time the current state of the pipeline is.

For example:
- At 10:30 AM, if events occurring at 10:00 AM are not processed until 10:45 AM, there’s a 15-minute lag.
- If by 10:30 AM, only events up to 9:45 AM have been processed, the skew is 15 minutes.

Lag and skew can be identical if both delays are due to processing issues, or they may differ based on factors like data distribution or network delay.
??x
---

#### Windowing for Unbounded Data Processing
Windowing is a technique used in unbounded data processing to manage and analyze large volumes of data by dividing them into manageable chunks. This allows systems to process data in finite pieces along temporal boundaries, making it easier to handle delays and skews between event time and processing time.

Typically, windowing involves defining windows based on the current processing time rather than the actual event times. However, if correctness is needed (i.e., analyzing data as they occur), these windows must be defined using event time instead of processing time.

:p What is windowing in unbounded data processing?
??x
Windowing is a technique to handle large and potentially infinite datasets by dividing them into manageable temporal chunks. These windows can be defined in different ways, but for correctness, it's crucial to define them based on actual event times rather than the system’s current processing time.

For example:
- If you want to analyze user behavior over a specific hour using data up to 10:00 AM, you would create an event-time window from 9:00 AM to 10:00 AM.
- However, if the system is lagging and has only processed events up to 9:30 AM, using processing time (e.g., 9:00 AM - 10:00 AM) would misplace data.

In summary, windowing helps in managing unbounded datasets but requires careful consideration of event times for accurate analysis.
??x
---


#### Completeness Problem in Event-Time Windows
Background context explaining the concept. When dealing with unbounded data, especially using event-time windows, there's a challenge in determining when all relevant data for an event time X has been observed due to the lack of a predictable mapping between processing time and event time.
This issue arises because in unbounded datasets, new data can continuously arrive, making it difficult to ascertain that you've seen everything related to a particular event time. 
:p How does the completeness problem affect the use of event-time windows with unbounded data?
??x
The completeness problem means that without a clear mapping between processing time and event time, determining when all data relevant to an event time X has been processed is challenging. This is problematic because many data processing systems rely on assumptions about completeness to function correctly.
In practical terms, this can mean that a system might continue to process new incoming data for what it thinks is the same event period, leading to potential inaccuracies or delays in results.

```java
public class EventTimeWindowExample {
    public void handleEvent(Event e) {
        // Logic to handle events
        if (isEventTimeCompleted(e)) {
            // Process the window of events
            processEventsForTime(e.getTime());
        }
    }

    private boolean isEventTimeCompleted(Event e) {
        // Check if all relevant data for the event time has been seen.
        return false; // Placeholder logic, actual implementation depends on system design
    }
}
```
x??

---

#### Data Processing Patterns: Bounded vs. Unbounded

Background context explaining the concept. In bounded data processing, we have a finite dataset that is processed to extract structured and valuable information using batch or streaming engines. For unbounded data, the approach needs to accommodate continuous incoming data.
:p What distinguishes bounded from unbounded data processing?
??x
Bounded data processing involves working with a fixed amount of data, typically input once and then processed through various stages such as mapping, reducing, and aggregating. The result is usually a structured dataset that can be stored or further analyzed.

Unbounded data processing deals with streams of incoming data where the total volume is unknown and potentially infinite. This requires handling real-time updates, reprocessing old data, and dealing with uncertainties in the completeness of data.
x??

---

#### Fixed Windows for Unbounded Data

Background context explaining the concept. To process unbounded datasets using batch engines, a common approach is to break down the stream into fixed-size windows, treating each window as an independent bounded dataset that can be processed by the batch engine.

:p What is a typical method for processing unbounded data with batch engines?
??x
A typical method involves dividing the incoming data stream into fixed-sized windows and then running each of these windows through the batch engine. This approach ensures that the batch engine can handle the data in manageable chunks, treating each window as an independent, bounded dataset.
This method is known as "tumbling windows" because the windows do not overlap and slide a fixed amount at a time.

```java
public class FixedWindowProcessor {
    private int windowSize;

    public void processUnboundedData(Stream<Event> events) {
        // Create sliding windows of size 'windowSize'
        for (int i = 0; i < events.size(); i += windowSize) {
            List<Event> window = events.subList(i, Math.min(i + windowSize, events.size()));
            batchEngine.process(window); // Process the bounded data in a batch engine
        }
    }

    private boolean isWindowComplete(List<Event> window) {
        // Logic to check if the current window has all necessary data
        return true; // Placeholder logic
    }
}
```
x??

---


#### Time-Based Shuffle for Logs Processing
Background context explaining how logs can be processed using time-based shuffles. Events are written into directory and file hierarchies whose names encode the window they correspond to, making initial processing seem straightforward but with inherent challenges.

:p What is a time-based shuffle in the context of log processing?
??x
A time-based shuffle involves organizing events into appropriate windows based on their event times before processing them. This makes it appear initially that the data can be easily processed by placing each event in its corresponding window.
x??

---

#### Completeness Problem in Logs Processing
Background explaining the issue where some events might be delayed or not collected due to network partitions, global collection, and mobile device limitations.

:p What is a completeness problem in logs processing?
??x
A completeness problem arises when some events are delayed en route to logs, possibly due to network issues, the need for events to be transferred globally before processing, or delays from mobile devices. This means that you cannot always assume all relevant data will be available at once.
x??

---

#### Delayed Processing and Reprocessing in Logs Processing
Explanation of dealing with completeness problems by delaying processing until sure all events are collected or reprocessing the entire batch.

:p How do systems handle delayed events during logs processing?
??x
Systems often delay processing until they are confident that all relevant events have been collected. Alternatively, they may reprocess the entire batch for a given window whenever late data arrive.
x??

---

#### Sessions with Ad Hoc Fixed Windows and Batch Engines
Explanation of how sessions are typically defined and broken down when using batch engines.

:p How do ad hoc fixed windows affect session calculation?
??x
Sessions are periods of activity terminated by inactivity gaps. Using batch engines, these sessions might be split across batches, leading to inefficiencies. Increasing batch sizes reduces splits but increases latency. Alternatively, stitching logic can help, adding complexity.
x??

---

#### Streaming Systems for Unbounded Data
Explanation of why streaming systems are suitable for unbounded data and characteristics of such data.

:p Why are streaming systems better suited for unbounded data?
??x
Streaming systems are designed to handle unbounded data effectively. Unbounded data often have highly unordered event times, varying event-time skews, and other complexities that batch engines struggle with efficiently.
x??

---

#### Time-Agnostic Approaches
Explanation of the time-agnostic approach in dealing with unbounded data.

:p What is a time-agnostic approach to processing unbounded data?
??x
A time-agnostic approach involves designing systems where the timing of events does not significantly impact their processing. This can involve complex logic to handle unordered and skewed event times.
x??

---

#### Approximation Methods for Unbounded Data Processing
Explanation of approximation methods used in dealing with highly unordered and skewed event-time data.

:p What are some approximation methods for handling unbounded data?
??x
Approximation methods include techniques that trade off accuracy for performance, often involving sampling or heuristic approaches to manage the complexity of unbounded data.
x??

---

#### Windowing by Processing Time
Explanation of windowing strategies based on processing time rather than event time.

:p How does windowing by processing time differ from windowing by event time?
??x
Windowing by processing time involves organizing data around when they are processed, not when they occurred. This is useful in scenarios where the exact timing of events is less critical.
x??

---

#### Windowing by Event Time
Explanation of windowing strategies based on event time.

:p How does windowing by event time work?
??x
Windowing by event time involves organizing data around their occurrence times, allowing for more accurate analysis of temporal data. This approach requires handling issues like delayed events and data skew.
x??

---


#### Time-Agnostic Processing
Time-agnostic processing is used for cases where time is essentially irrelevant, meaning that all logic is data-driven. Since the processing depends solely on the arrival of new data, streaming engines do not need to support specific temporal operations other than basic data delivery.

Batch systems can also handle unbounded data sources by dividing them into smaller bounded datasets and processing each dataset independently.
:p What is time-agnostic processing?
??x
Time-agnostic processing refers to scenarios where the logic does not depend on the timestamp or sequence of events, but rather focuses on the data itself. In such cases, all relevant operations are driven by new incoming data.

Batch systems can process unbounded data sources by breaking them down into smaller, manageable datasets for independent processing.
x??

---

#### Filtering
Filtering is a basic form of time-agnostic processing where you examine each record as it arrives and drop or retain it based on specific criteria. This operation does not depend on the temporal order or event-time skew.

Here’s an example in pseudocode:
```java
for (each log entry in web traffic logs) {
    if (entry.domain == domainOfInterest) {
        // retain the record
    } else {
        drop the record;
    }
}
```
:p What is filtering in time-agnostic processing?
??x
Filtering involves examining each incoming data element and deciding whether to keep or discard it based on a specific criterion. This process does not depend on the order or timing of the events.

For example, when processing web traffic logs, you would check if an entry belongs to a specific domain; if so, retain it; otherwise, drop it.
x??

---

#### Inner Joins
An inner join in time-agnostic processing means joining two unbounded data sources based on matching elements from both. The logic only cares about the presence of corresponding elements, not their temporal sequence.

Here’s an example in pseudocode:
```java
Set<String> bufferA = new HashSet<>();
for (elementA : sourceA) {
    bufferA.add(elementA);
}

for (elementB : sourceB) {
    if (bufferA.contains(elementB)) {
        emit joined record;
    }
}
```
:p What is an inner join in time-agnostic processing?
??x
An inner join in time-agnostic processing involves joining two unbounded data sources by matching elements from both. The process buffers elements from one source and checks them against the other when corresponding elements are observed.

For instance, you buffer up elements from `sourceA` and then check each element of `sourceB` to see if it exists in the buffer; if so, emit a joined record.
x??

---

#### Approximation Algorithms
Approximation algorithms include methods like approximate Top-N, streaming k-means, etc., which provide solutions that are not exact but close enough for many practical purposes.

:p What is an approximation algorithm?
??x
An approximation algorithm provides solutions that are nearly correct but not necessarily precise. These algorithms are useful when exact answers are computationally expensive or infeasible.

For example, approximate Top-N can be used to find the top N elements from a stream of data without sorting all the elements.
x??

---


#### Sliding Windows Overview
Background context explaining sliding windows, their typical alignment and use cases. Note that while they are drawn to suggest motion, all windows apply across the entire dataset.
:p What are sliding windows used for?
??x
Sliding windows are often used for analyzing data in a dynamic manner where elements are processed in a moving window fashion. They allow for real-time analysis by breaking down the data into manageable chunks that can be processed as they come in, providing insights at different points in time.
x??

---

#### Sessions in Windowing
Sessions refer to sequences of events terminated by gaps of inactivity greater than some timeout. They are used for analyzing user behavior over time, grouping temporally related events such as a sequence of videos watched consecutively.
:p What is the definition and use case for sessions?
??x
Sessions are defined as sequences of events that are grouped together until there is a gap in activity larger than a specified timeout period. This technique is commonly used to analyze user behavior over time, where each session represents a series of actions taken by a user during a single sitting or period.
x??

---

#### Processing-Time Windowing
Processing-time windowing buffers incoming data into windows based on the order they arrive until a certain amount of processing time has passed. For example, five-minute fixed windows buffer data for five minutes before sending it downstream.
:p What is processing-time windowing?
??x
Processing-time windowing involves buffering incoming data into windows according to the order in which the data arrives and processing them when a certain amount of processing time (e.g., 5 minutes) has elapsed. This method ensures that all data for a particular window are processed together, making it suitable for scenarios where real-time analysis is critical.
x??

---

#### Properties of Processing-Time Windowing
Processing-time windowing has several advantages: simplicity in implementation due to straightforward buffering logic and judging window completeness with perfect knowledge of input arrival times. However, it requires event-time ordered data for accurate results.
:p What are the key properties of processing-time windowing?
??x
Key properties include:
- **Simplicity**: Easy to implement as you just buffer incoming data until a window closes.
- **Judging Window Completeness**: The system can determine when a window is complete with perfect accuracy due to knowing all inputs have arrived.
- **Late Data Handling**: No need for dealing with "late" data since the system always has full knowledge of input arrival times.

However, it relies on event-time ordered data, which is often not available in real-world distributed systems.
x??

---

#### Disadvantage of Processing-Time Windowing
One major downside to processing-time windowing is that if the incoming data have associated event times, they must arrive in order for accurate results. This can be challenging with many real-world input sources.
:p What is a significant drawback of processing-time windowing?
??x
A significant drawback is that processing-time windows require the data to arrive in the correct event time order to accurately reflect when events happened. In practice, this is often difficult to achieve, especially with distributed and disparate input sources where event times might not be strictly ordered.
x??

---


#### Event-Time Windowing Basics
Background context: In scenarios where data arrives out of order due to network issues or other delays, processing the data strictly by event time rather than processing time is crucial. This method ensures that data is grouped and processed according to when it actually occurred, not just when it arrived.
:p What is event-time windowing used for?
??x
Event-time windowing is used in situations where data can arrive out of order due to network issues or other delays. It ensures that the processing is based on the actual occurrence times of events rather than the arrival times at a processing pipeline, providing more accurate and useful insights.
x??

---
#### Fixed-Size Event-Time Windows
Background context: Fixed-size event-time windows are used when we need to process data in finite chunks that reflect the times at which those events occurred. This method is particularly useful for scenarios where the exact timing of events is critical.
:p How do fixed-sized event-time windows work?
??x
Fixed-sized event-time windows work by dividing the stream of events into time-based segments, each representing a fixed duration (e.g., one hour). Each segment processes all the data that occurred within its specific timeframe. This ensures that even if data arrives out of order, it will still be grouped correctly based on when the events actually happened.
x??

---
#### Session Windows in Event-Time
Background context: Session windows are used to capture bursts of activity over a period where individual sessions may vary in duration but are generally short-lived and closely related. Event-time session windows allow for dynamic window sizes, making them ideal for tracking user behavior or other transient activities.
:p How do event-time session windows differ from fixed-size windows?
??x
Event-time session windows differ from fixed-size windows because they dynamically group data based on the actual occurrence times of events. This means that sessions can vary in length and are defined by periods of activity, rather than being constrained to a predefined duration. For example, a user’s session might end when there is no activity for a certain period, not necessarily at the start or end of an hour.
x??

---
#### Challenges with Event-Time Windows
Background context: While event-time windowing provides accurate processing based on actual event occurrence times, it comes with challenges such as increased buffering requirements and uncertainty in determining when a window is complete. These issues must be managed to ensure effective data processing.
:p What are the main drawbacks of using event-time windows?
??x
The main drawbacks of using event-time windows include:
1. **Buffering**: Data must often live longer than the actual window length, requiring more buffering and storage.
2. **Completeness Uncertainty**: There is no good way to know when all data for a given window has arrived, making it challenging to determine when results are ready.
x??

---
#### Buffering in Event-Time Windows
Background context: The extended lifetimes of event-time windows mean that more data must be buffered while waiting for the entire set. This can lead to increased storage needs but is often manageable due to the relatively low cost of persistent storage compared to other resources like CPU and network bandwidth.
:p How does buffering work in event-time windowing?
??x
Buffering in event-time windowing involves keeping more data available as windows extend their lifetimes. This ensures that all relevant data for a specific time period is processed together, even if it arrives late. While this increases storage requirements, modern data processing systems often have efficient persistent storage and caching layers to mitigate these costs.
x??

---
#### Completeness in Event-Time Windows
Background context: Determining when windows are complete can be challenging because there’s no reliable way to know if all relevant data for a window has been received. This uncertainty impacts the timing of result materialization, requiring heuristic methods or watermarks to estimate completion.
:p How is completeness determined in event-time windows?
??x
Completeness in event-time windows is often determined using heuristics like watermarks. A watermark represents an estimated point beyond which no new events will arrive for a particular window. When the current processing time exceeds the watermark, it can be assumed that the window is complete and results can be materialized.
x??

---

