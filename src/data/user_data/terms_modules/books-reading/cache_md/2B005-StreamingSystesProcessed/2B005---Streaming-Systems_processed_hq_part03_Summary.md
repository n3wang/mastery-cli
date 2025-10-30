# High-Quality Flashcards: 2B005---Streaming-Systems_processed (Part 3)

**Rating threshold:** >= 8/10

**Starting Chapter:** Summary

---

**Rating: 8/10**

#### Streaming vs. Batch Processing
Streaming and batch processing are two distinct but related approaches to data processing, often categorized under "streaming." However, batch processing deals with fixed, bounded datasets that fit into memory, while streaming systems handle unbounded datasets where data keeps arriving over time.

:p What is the key difference between streaming and batch processing?
??x
Streaming processes unbounded datasets continuously, whereas batch processing handles fixed, bounded datasets. Streaming systems are designed to process incoming data as it arrives, making them suitable for real-time analysis, while batch systems typically operate on completed batches of data that fit into memory.

```java
public class BatchProcessingExample {
    public void processData(List<String> data) {
        // Process the entire dataset in one go
    }
}

public class StreamingProcessingExample {
    public void processEvent(Event event) {
        // Process each event as it arrives
    }
}
```
x??

---

#### Cardinality and Encoding of Large-Scale Datasets
Large-scale datasets can be categorized based on cardinality (bounded or unbounded) and encoding (tables vs. streams).

:p What are the two important dimensions when categorizing large-scale datasets?
??x
The two important dimensions for categorizing large-scale datasets are cardinality, which refers to whether the dataset is bounded or unbounded, and encoding, which differentiates between table-based and stream-based data.

```java
// Example of checking if a dataset is bounded or unbounded
public boolean isBoundedDataset(List<String> dataset) {
    return dataset.size() < 1000; // Threshold for small datasets
}

public boolean isUnboundedStream(Iterator<Event> events) {
    while (events.hasNext()) {
        events.next();
    }
    return true; // Stream-like behavior indicating unbounded data
}
```
x??

---

#### Correctness in Streaming Systems
Correctness is a critical aspect of streaming systems, especially when absolute accuracy is necessary. This involves materializing results for windows and refining them over time to handle window completeness.

:p What does correctness mean in the context of streaming systems?
??x
In streaming systems, correctness refers to ensuring that the processed data adheres to specific consistency guarantees, such as exactly-once processing, where each record is processed once and only once. This is crucial for applications like billing, where accuracy is paramount.

```java
public class CorrectnessGuaranteeExample {
    public void processRecords(List<Record> records) {
        // Ensure each record is processed exactly once using idempotent operations
    }
}
```
x??

---

#### Event Time vs. Processing Time
Event time and processing time are two crucial concepts in streaming systems, representing when an event actually occurred versus when the system processes it.

:p What is the difference between event time and processing time?
??x
Event time refers to the actual occurrence of events as they happen in the real world, while processing time represents when these events are processed by a system. Event time can be used for more accurate analysis, whereas processing time is simpler but less precise.

```java
public class TimeExample {
    public long getEventTime(Event event) {
        return event.getTimestamp();
    }

    public long getProcessingTime() {
        return System.currentTimeMillis();
    }
}
```
x??

---

#### Windowing in Streaming Systems
Windowing techniques are used to group events into time-based intervals for processing, either by processing time or event time. Common window types include fixed windows and sliding windows.

:p What is a window in the context of streaming systems?
??x
A window in streaming systems is a time-based interval used to group events together for processing. Windows can be fixed (with predefined start and end times) or sliding (where new events are added as they arrive, while older ones drop off).

```java
public class FixedWindowExample {
    public void processFixedWindow(List<Event> windowedEvents) {
        // Process the events within a fixed time interval
    }
}

public class SlidingWindowExample {
    public void processSlidingWindow(Stream<Event> stream) {
        // Process events in a sliding window, e.g., every 5 minutes
    }
}
```
x??

---

#### Microbatch Systems
Microbatch systems are a type of streaming system that uses repeated executions of batch processing engines to handle unbounded data. They combine the benefits of both batch and streaming approaches.

:p What is a microbatch system?
??x
A microbatch system processes unbounded data in small, bounded batches by repeatedly executing a batch processing engine. This approach allows for more deterministic and controllable processing compared to fully streamed systems but still maintains some real-time aspects.

```java
public class MicroBatchExample {
    public void processMicroBatch(Stream<Event> events) {
        // Process the current batch of events, then wait for the next one
    }
}
```
x??

---

#### Exactly-Once Processing Guarantee
Exactly-once processing is a consistency guarantee that ensures each record is processed once and only once. It's crucial in scenarios requiring high accuracy.

:p What does exactly-once processing mean?
??x
Exactly-once processing means ensuring that every record is processed exactly one time, without duplicates or omissions. This is important for applications like financial transactions where data integrity must be maintained.

```java
public class ExactlyOnceGuaranteeExample {
    public void processRecords(List<Record> records) {
        // Ensure each record is processed once using idempotent operations
    }
}
```
x??

---

#### Watermarks in Streaming Systems
Watermarks are used to represent the maximum known event time for a window. They help in dealing with late-arriving data and ensure that processing can proceed without getting stuck on incomplete windows.

:p What is a watermark in streaming systems?
??x
A watermark in streaming systems represents the latest known point at which all events within a window have arrived. It helps in managing state and ensuring that processing doesn't get stuck due to late-arriving data.

```java
public class WatermarkExample {
    public long getCurrentWatermark() {
        // Return the current watermark value, e.g., based on the latest known event time
    }
}
```
x??

---

**Rating: 8/10**

#### Triggers
Background context explaining triggers. Triggers are mechanisms for declaring when the output for a window should be materialized relative to some external signal. They provide flexibility in choosing when outputs should be emitted, acting as flow control mechanisms and allowing you to declare when to take snapshots of results over time.

:p What is a trigger?
??x
A trigger is a mechanism that dictates when the output for a window should be materialized based on an external signal. It acts like a shutter release on a camera, enabling you to decide when to capture a snapshot of the results being computed.
x??

---

#### Watermarks
Background context explaining watermarks. A watermark is a notion of input completeness with respect to event times. The value of a watermark indicates that all inputs with an event time less than or equal to the watermark have been observed.

:p What is a watermark?
??x
A watermark represents a metric of progress when observing unbounded data sources. It states that "all input data with event times less than X have been observed." This helps in determining the completeness of input data relative to their event times.
x??

---

#### Accumulation
Background context explaining accumulation modes and their relevance in unbounded data processing. Different accumulation modes specify how multiple results for the same window relate to each other, impacting semantics and costs.

:p What is an accumulation mode?
??x
An accumulation mode defines the relationship between multiple results observed for the same window. It specifies whether results are independent, build upon previous results, or both.
x??

---
#### What Results Are Calculated?
Background context explaining that this question pertains to the types of transformations within a pipeline. Common examples include computing sums, building histograms, and training machine learning models.

:p What does "What results are calculated" mean in unbounded data processing?
??x
This question refers to the types of transformations performed on the data within the pipeline. It involves operations like computing sums, creating histograms, or training machine learning models.
x??

---
#### Where in Event Time Are Results Calculated?
Background context explaining that this question is answered by the use of event-time windowing. Common examples include fixed and sliding windows, as well as more complex types.

:p "Where in event time are results calculated" refers to what exactly?
??x
This question relates to where and when in the timeline (event time) the data processing occurs. It involves using event-time windowing techniques such as fixed, sliding, or session-based windows.
x??

---
#### When in Processing Time Are Results Materialized?
Background context explaining that this is answered by triggers and watermarks. This can involve repeated updates or a single output per window.

:p "When in processing time are results materialized" refers to what exactly?
??x
This question concerns the timing of result outputs during processing, which is determined by the use of triggers and optionally watermarks. It involves deciding when to emit results based on the processing timeline.
x??

---
#### How Do Refinements of Results Relate?
Background context explaining that this pertains to how subsequent results relate to previous ones within a window. Common accumulation modes include discarding, accumulating, and accumulating and retracting.

:p "How do refinements of results relate" refers to what exactly?
??x
This question deals with the relationship between subsequent results in relation to previous ones within the same window. It involves understanding how new data influences or refines previously calculated results through different accumulation modes.
x??

---

**Rating: 8/10**

#### Batch Processing: What Results Are Calculated?

Background context explaining batch processing and transformations. In classic batch processing, the focus is on computing results based on a fixed dataset that has been collected over a period of time.

:p What are the "What" results calculated in batch processing?
??x
In batch processing, the primary goal is to compute aggregates or transformations over a static dataset. These calculations are performed offline and typically result in summarized data that can be used for reporting, analysis, or decision-making purposes. For instance, if you have a set of user scores reported by users' phones, you might want to calculate the total score for each team.

Example code snippet illustrating batch processing logic:
```java
PCollection<String> raw = IO.read(...);
PCollection<KV<Team, Integer>> input = raw.apply(new ParseFn());
PCollection<KV<Team, Integer>> totals = input.apply(Sum.integersPerKey());
```

x??

---

#### Batch Processing: Where in Event Time Are Results Calculated?

Background context on event time and processing time. In batch processing, the data is typically processed after it has been fully collected (infinite event-time window), so all events are observed before any results are produced.

:p Where do we calculate results for a batch process?
??x
In batch processing, results are calculated once all of the input events have been observed and processed. This means that the entire dataset is available at one point in time, allowing us to perform aggregate operations on it without worrying about ongoing data ingestion or real-time constraints.

Example code snippet showing batch processing:
```java
PCollection<String> raw = IO.read(...);
PCollection<KV<Team, Integer>> input = raw.apply(new ParseFn());
PCollection<KV<Team, Integer>> totals = input.apply(Sum.integersPerKey());
```

x??

---

#### Windowing in Batch Processing

Background context on windowing. Windowing is the process of slicing up a data stream into manageable chunks or windows to allow for time-based analysis and processing.

:p What does "Where" mean when discussing batch processing?
??x
When discussing "Where" in the context of batch processing, we are referring to where in event time the results are calculated. In batch processing, the entire dataset is available at a single point in time after it has been fully collected, so all events are considered for the window before any calculations are performed.

Example code snippet demonstrating how windows might be applied:
```java
PCollection<String> raw = IO.read(...);
PCollection<KV<Team, Integer>> input = raw.apply(new ParseFn());
PCollection<KV<Team, Integer>> totals = input.apply(Sum.integersPerKey())
                                               .apply(Window.into(FixedWindows.of(Duration.standardMinutes(1))));
```

x??

---

#### Time-Lapse Diagrams

Background context on time-lapse diagrams. These are visual representations of how data evolves over both event and processing times in a pipeline, helping to illustrate the flow and transformations step by step.

:p How do we visualize the execution of a batch process?
??x
Time-lapse diagrams provide a visual representation of the execution of a batch process over time, showing inputs and outputs in both event time (on the x-axis) and processing time (on the y-axis). Inputs are represented as circles that darken as they are observed by the pipeline. State is shown as rectangles (gray for state, blue for output), with aggregate values at the top.

Example of a time-lapse diagram:
```
Figure 2-3. Classic batch processing
Inputs: Circles representing scores (e.g., "5", "9"), darken as they are observed.
State and output: Rectangles showing accumulated results over event time, with outputs materialized once all inputs are seen.
```

x??

---

#### Key/Value PCollection in Apache Beam

Background context on PCollections and PTransforms. In the Apache Beam model, data is processed using transformations applied to collections of key-value pairs.

:p What are PCollections and PTransforms used for?
??x
PCollections represent datasets across which parallel transformations can be performed, while PTransforms are operations that transform one or more input PCollections into a new output PCollection. In the context of batch processing with Apache Beam, these concepts allow for efficient data processing pipelines.

Example code snippet demonstrating usage:
```java
PCollection<String> raw = IO.read(...);
PCollection<KV<Team, Integer>> input = raw.apply(new ParseFn());
PCollection<KV<Team, Integer>> totals = input.apply(Sum.integersPerKey());
```

x??

---

#### Summation Pipeline Example

Background context on a simple pipeline for summing scores. This example uses a PCollection of key-value pairs to accumulate and output the total score per team.

:p How would you set up a basic batch processing pipeline?
??x
To set up a basic batch processing pipeline, you typically start by reading in raw data from an input source, parsing it into key-value pairs, and then applying transformations to compute aggregate results. For example:
```java
PCollection<String> raw = IO.read(...); // Read in the raw data
PCollection<KV<Team, Integer>> input = raw.apply(new ParseFn()); // Parse scores into key-value pairs
PCollection<KV<Team, Integer>> totals = input.apply(Sum.integersPerKey()); // Sum up scores per team
```

x??

---

#### Processing Time vs. Event Time

Background context on the difference between processing time and event time. Processing time refers to when data is observed by the pipeline, while event time represents when events occurred in reality.

:p What are event time and processing time?
??x
Event time refers to the actual occurrence of an event (e.g., a user score), whereas processing time refers to when the pipeline observes that event. In batch processing, these times align as all data is collected before any computations are performed.

Example code snippet illustrating the difference:
```java
PCollection<String> raw = IO.read(...);
// Raw input is read at some point in time.
PCollection<KV<Team, Integer>> input = raw.apply(new ParseFn());
// Parsing and transformation happen after the data has been read (processing time).
PCollection<KV<Team, Integer>> totals = input.apply(Sum.integersPerKey());
// Final aggregation is performed once all inputs are observed.
```

x??

---

#### Handling Unbounded Data in Batch Processing

Background context on handling unbounded data sources. Classic batch processing may not be sufficient for unbounded datasets as it requires waiting until the end of all data.

:p How do we handle unbounded data in batch processing?
??x
Classic batch processing is not suitable for unbounded data sources because you cannot wait indefinitely for new data to arrive. To handle such cases, techniques like windowing can be applied to process data within defined windows or intervals, even if the data stream continues.

Example code snippet using windowing:
```java
PCollection<String> raw = IO.read(...);
PCollection<KV<Team, Integer>> input = raw.apply(new ParseFn());
PCollection<KV<Team, Integer>> totals = input.apply(Sum.integersPerKey())
                                               .apply(Window.into(FixedWindows.of(Duration.standardMinutes(1))));
// Process data in 1-minute windows.
```

x??

