# High-Quality Flashcards: 2B005---Streaming-Systems_processed (Part 15)


**Starting Chapter:** When Triggers

---


#### Triggers in Data Processing

Triggers are mechanisms used to dictate when the contents of a window will be materialized, particularly useful with unbounded data. Watermarks provide signals for input completeness, which can trigger the materialization process.

:p What is the role of triggers in handling unbounded data streams?
??x
Triggers play a crucial role in determining when to send grouped (windowed) data downstream as a stream. This is essential for processing unbounded data because it helps manage and convert the state from tables back into streams at appropriate moments, ensuring that all relevant data has been received before aggregation or further processing.

For example, using a trigger like `AfterCount(1)` in Apache Beam means emitting results every time a new record arrives. This continuous materialization can be useful but may not always align with business needs for more controlled batch-like operations.

```java
PCollection<KV<Team, Integer>> totals = input.apply(
    Window.into(FixedWindows.of(TWO_MINUTES))
          .triggering(Repeatedly(AfterCount(1)))
);
```
x??

---

#### Per-Record Trigger Example

Per-record triggers emit results for every new record that arrives in the stream. This can be useful when you want to immediately process each incoming piece of data.

:p How does a per-record trigger work in practice?
??x
A per-record trigger processes and emits results as soon as it receives a new record, effectively making the aggregation or processing result available on-the-fly. This is particularly useful for real-time applications where immediate feedback is required.

Example: In Apache Beam, using `Repeatedly(AfterCount(1))` as the triggering condition means that a new window will be triggered every time a single record arrives in the stream.

```java
PCollection<KV<Team, Integer>> totals = input.apply(
    Window.into(FixedWindows.of(TWO_MINUTES))
          .triggering(Repeatedly(AfterCount(1)))
);
```
x??

---

#### Watermark-based Trigger Example

Watermark-based triggers emit results when the watermark passes a certain threshold, indicating that no more data will arrive for the current window.

:p How do watermark-based triggers work?
??x
Watermark-based triggers are used to ensure that all late-arriving data have been processed before emitting results. This is particularly useful in batch-like operations where you want to wait until an approximate end of input (EoI) signal is received, such as a watermark passing the current window's end.

Example: In Apache Beam, using `AfterWatermark.pastEndOfWindow()` means that results will be emitted when the watermark passes the end of the window, ensuring that no late data can affect the result.

```java
PCollection<KV<Team, Integer>> totals = input.apply(
    Window.into(FixedWindows.of(TWO_MINUTES))
          .triggering(AfterWatermark.pastEndOfWindow())
);
```
x??

---

#### Grouping and Triggers

Grouping in data processing is about aggregating streams into tables (or stateful windows), while triggers determine when these aggregated results should be sent back to the stream as a new, ungrouped result.

:p How do grouping and triggers complement each other in data processing?
??x
Grouping and triggers complement each other by first transforming a stream into a table through windowing operations, then using triggers to decide when to emit results from these tables as streams. Grouping helps manage state and perform aggregations over windows of time or conditions, while triggers ensure that the processed data is sent back to the stream at appropriate times.

Example: In Apache Beam, grouping data into windows and applying a trigger like `AfterWatermark.pastEndOfWindow()` ensures that results are only emitted when the watermark indicates no more late data will arrive.

```java
PCollection<KV<Team, Integer>> totals = input.apply(
    Window.into(FixedWindows.of(TWO_MINUTES))
          .triggering(AfterWatermark.pastEndOfWindow())
);
```
x??

---


#### Watermark Completeness Trigger
Background context: In Apache Beam, a watermark is used to determine when enough data has arrived for processing. A watermark completeness trigger ensures that windows are processed once the watermark passes their end boundaries.

:p What is a watermark completeness trigger and how does it work in Apache Beam?
??x
A watermark completeness trigger is designed to materialize windows when the watermark reaches the end of each window, enabling progressive emission of results from an unbounded input stream. This allows for real-time processing while ensuring that all relevant data has been processed.

For example, consider a scenario where you are analyzing user activity in a two-minute sliding window:

```java
PCollection<String> raw = IO.read(...);
PCollection<KV<Team, Integer>> input = raw.apply(new ParseFn());
PCollection<KV<Team, Integer>> totals = input
    .apply(Window.into(FixedWindows.of(TWO_MINUTES))
                 .triggering(AfterWatermark()))
    .apply(Sum.integersPerKey());
```

Here, `AfterWatermark()` triggers the windows to be processed as soon as the watermark passes their end.

x??

---

#### Early/Fire/On-Time/Late Trigger
Background context: In Apache Beam, more complex triggering mechanisms can be defined using early firings and late firings. This allows for handling early data (data that arrives before the watermark), on-time data, and late data (data that arrives after the watermark).

:p How does an early/on-time/late trigger work in Apache Beam?
??x
An early/on-time/late trigger in Apache Beam is a more comprehensive mechanism that allows you to specify conditions under which windows should be processed. It includes mechanisms for handling early data, on-time data, and late data:

```java
PCollection<String> raw = IO.read(...);
PCollection<KV<Team, Integer>> input = raw.apply(new ParseFn());
PCollection<KV<Team, Integer>> totals = input
    .apply(Window.into(FixedWindows.of(TWO_MINUTES))
                 .triggering(
                     AfterWatermark()
                         .withEarlyFirings(AlignedDelay(ONE_MINUTE))
                         .withLateFirings(AfterCount(1))))
    .apply(Sum.integersPerKey());
```

- `AfterWatermark()` ensures that windows are processed when the watermark passes.
- `WithEarlyFirings(AlignedDelay(ONE_MINUTE))` allows early data to be processed with a delay of one minute.
- `WithLateFirings(AfterCount(1))` processes late data once it arrives.

This setup enables a more nuanced handling of different types of data, ensuring that the system can emit results in a timely manner while still processing all relevant data.

x??

---

#### Batch Processing Triggers
Background context: In traditional batch processing, triggers are used to signal when the input is complete. This ensures that the entire pipeline waits for the final state before emitting the result.

:p How do batch processing triggers work?
??x
In Apache Beam, classic batch processing scenarios use a trigger that fires when all data in the input source is considered complete. This means that once the initial MapRead stage of a MapReduce job has all its data available, it can start processing. For example:

```java
PCollection<String> raw = IO.read(...);
// Map and Reduce stages would follow, but not shown here.
```

For table-to-stream conversions in the middle of the pipeline (like the ReduceRead stage), a similar trigger mechanism is used, but it waits for all data to be written to the shuffle before proceeding.

This ensures that batch pipelines wait until they have processed all input data before emitting their final results.

x??

---

#### Ungrouping Effect
Background context: Triggers in Apache Beam can cause an ungrouping effect on state tables. As windows are materialized, the state is separated into individual window streams, reflecting the processing of each window independently.

:p What is the ungrouping effect caused by triggers in Apache Beam?
??x
The ungrouping effect occurs when a trigger causes windows to be processed and their results to be emitted separately from other data. For instance, if you have a stream with windows defined over two minutes:

```java
PCollection<String> raw = IO.read(...);
// Apply windowing and triggers here.
```

With an `AfterWatermark()` trigger, as the watermark passes each window's end boundary, that window's results are separated from others. This is evident in the streams and tables view of the pipeline.

For example, consider the following setup:

```java
PCollection<String> raw = IO.read(...);
PCollection<KV<Team, Integer>> input = raw.apply(new ParseFn());
PCollection<KV<Team, Integer>> totals = input
    .apply(Window.into(FixedWindows.of(TWO_MINUTES))
                 .triggering(AfterWatermark()))
    .apply(Sum.integersPerKey());
```

As the watermark passes each window's end boundary, the state table ungroups into separate streams for each window.

x??

---


---
#### Trigger Guarantees and Asynchronicity
In most batch processing systems, triggers are not finely granular due to their lock-step nature. Triggers like `AfterWatermark` or `AfterCount(N)` do not provide precise timing but rather a lower bound of when data might be processed.

:p What is the nature of trigger guarantees in batch and streaming systems?
??x
In most existing batch processing systems, triggers are less granular due to their lock-step read-process-group-write-repeat sequence. For instance, `AfterWatermark` does not guarantee that it will fire exactly at the end of a window but rather after some time has passed since the watermark was last updated. Similarly, `AfterCount(N)` only guarantees that at least N elements have been processed.

```java
// Example of an AfterWatermark trigger in Java
public class WatermarkTrigger {
    public boolean shouldProcess(long currentTimestamp) {
        // Check if the watermark has passed the end of the window
        return currentTimestamp >= watermark;
    }
}
```
x??

---
#### Trigger Names and Asynchronous Behavior
The naming conventions of triggers like `AfterWatermark` or `AfterCount(N)` are designed to accommodate both batch and streaming systems. These names reflect the natural asynchronicity and nondeterminism inherent in triggering mechanisms.

:p Why were specific trigger names chosen?
??x
Specific trigger names such as `AfterWatermark` and `AfterCount(N)` were chosen not just for compatibility with batch systems but also to reflect their behavior within a streaming context. For example, `AfterWatermark` does not guarantee firing exactly at the end of a window but rather after some time has passed since the watermark was last updated. Similarly, `AfterCount(N)` only guarantees that at least N elements have been processed.

```java
// Example of an AfterCount trigger in Java
public class CountTrigger {
    private int count = 0;
    public boolean shouldProcess(int element) {
        // Increment count and check if it reaches the threshold
        count++;
        return count >= threshold;
    }
}
```
x??

---
#### Blending Batch and Streaming Systems
The main difference between batch and streaming systems is their ability to handle incremental data processing. However, this difference is more of a latency/throughput trade-off rather than a fundamental semantic distinction.

:p What is the main difference between batch and streaming systems?
??x
The primary difference between batch and streaming systems lies in their handling of incremental data processing. Batch systems are designed for large, bounded datasets with lower latency but higher throughput, while streaming systems handle unbounded streams with potentially higher latencies but better real-time processing capabilities. This trade-off is highlighted by the ability to trigger tables incrementally in streaming systems, which is not as straightforward in batch systems.

```java
// Example of a simple stream processing pipeline in Java
public class StreamProcessor {
    public void processStream(Stream<String> data) {
        // Process each element and emit results
        data.map(element -> transformElement(element))
             .filter(result -> isRelevant(result))
             .forEach(result -> sendToStorage(result));
    }
}
```
x??

---
#### Efficiency Differences Between Batch and Streaming Systems
Batch and streaming systems differ primarily in efficiency (batch has higher throughput at the cost of latency) and natural handling of unbounded data streams.

:p What are the main differences between batch and streaming systems?
??x
The main difference between batch and streaming systems lies in their efficiency and how they handle data. Batch processing is optimized for high-throughput with potentially higher latencies, suitable for large, bounded datasets. Streaming systems, on the other hand, are designed to process unbounded streams of data more efficiently, often at the cost of some latency but with real-time capabilities.

```java
// Example comparison in Java
public class BatchVsStreaming {
    public void batchProcessing() {
        // Process entire dataset before returning results
    }

    public void streamProcessing() {
        // Continuously process incoming data and emit results immediately
    }
}
```
x??

---


#### Latency vs. Throughput Trade-off
Background context: The efficiency delta between systems often comes from balancing latency with throughput. Larger bundle sizes can enhance throughput at the cost of increased latency, and more efficient shuffle implementations can improve performance without significant trade-offs.

:p How does larger bundle size affect system efficiency?
??x
Larger bundle sizes increase overall throughput by allowing more data to be processed in parallel, but they also introduce higher latency because processing each batch takes longer. This is a common trade-off between maximizing the amount of work done at once and minimizing the time taken for individual operations.

```java
// Example of setting a large bundle size
PipelineOptions options = PipelineOptionsFactory.create();
options.setNumShards(100); // Large number of shards can increase throughput but may introduce higher latency.
```
x??

---

#### Apache Beam's Unification Approach
Background context: Apache Beam aims to unify batch and streaming processing by providing a general data processing model that can handle both efficiently. It achieves this through transparently tuning implementation details such as bundle sizes, shuffle implementations, etc., under the covers.

:p How does Apache Beam aim to unify batch and streaming?
??x
Apache Beam unifies batch and streaming by offering a unified programming model that can seamlessly process both types of data without the need for separate batch and stream processing engines. This is achieved through adaptive tuning of internal parameters like bundle sizes, shuffle implementations, etc., which automatically adjust based on the specific use case to balance latency, throughput, and cost.

```java
// Example of configuring Beam pipeline options
PipelineOptions options = PipelineOptionsFactory.create();
options.setStreaming(true); // Configuring for streaming processing.
```
x??

---

#### Accumulation Modes in Apache Beam
Background context: Accumulation modes define how results are refined over time as new data arrives. In Beam, there are three accumulation modes: discarding, accumulating, and accumulating and retracting.

:p What are the three accumulation modes in Apache Beam?
??x
The three accumulation modes in Apache Beam are:
1. **Discarding Mode**: The system either throws away the previous value or keeps a copy to compute the delta.
2. **Accumulating Mode**: No additional work is needed; the current value for the window is emitted directly.
3. **Accumulating and Retracting Mode**: Keeps copies of all previously triggered (but not yet retracted) values, necessary for correctly reverting effects.

```java
// Example configuration in Beam code
Window<PCollection<String>> windowed = pcoll.apply(Window.into(FixedWindows.of(Duration.standardMinutes(1))));
```
x??

---

#### Streams and Tables in Beam Model
Background context: The Beam model integrates concepts from streams and tables to handle both batch and streaming data. Understanding how these integrate helps in designing pipelines that can efficiently process any type of data.

:p How does the Beam model represent streams and tables?
??x
In the Beam model, streams and tables are unified into a single processing framework where:
- Streams represent continuous data flows.
- Tables provide stateful transformations with windowing and accumulation mechanisms.
This integration allows for handling both batch and streaming data by leveraging the best of both worlds: bounded data processed like traditional batches and unbounded data handled with stream-like semantics.

```java
// Example of a Beam pipeline using both streams and tables
Pipeline p = Pipeline.create(options);
PCollection<String> pcoll = p.apply("ReadFromSource", TextIO.read().from("path/to/data"));
pcoll.apply(Window.into(FixedWindows.of(Duration.standardMinutes(1))));
```
x??

---


---
#### Logical versus Physical Operations
Logical operations are user-defined, while physical operations are those executed by the underlying engine. The optimizer converts logical operations into a sequence of primitive, supported operations.

:p How does the optimization process convert logical operations to physical ones?
??x
The optimization process translates high-level, abstract operations (like Parse) into concrete, low-level operations that can be directly executed by the engine. For instance, if you use `ParseFn`, it might need to be broken down into multiple primitive steps such as splitting strings and converting them to integers.

```java
// Pseudocode for a simplified Parse operation
public class ParseFn extends DoFn<String, KV<Team, Integer>> {
    public void processElement(BatchModeProcessContext<String> c) {
        String raw = c.element();
        // Split the string into team name and score
        String[] parts = raw.split(",");
        Team team = parseTeam(parts[0]);
        int score = parseInt(parts[1]);
        c.output(KV.of(team, score));
    }
}
```
x??

---
#### Physical Stages and Fusion
Physical stages are groups of operations that can be executed together to reduce overheads like serialization and network communication.

:p What is the benefit of fusing physical operations into a single stage?
??x
Fusing physical operations reduces unnecessary overheads such as serialization, network communication, and deserialization. By combining multiple logical phases into one physical stage, the pipeline can operate more efficiently, leading to better performance.

For example, if you have two consecutive operations that process raw data, they might be fused into a single stage to reduce intermediate processing steps:

```java
// Pseudocode for fusion of ReadFromSource and Parse in a single stage
public void optimizePlan(PCollection<String> raw) {
    // Fused into one physical stage
    return raw.apply(new CoProcessor<>(ReadFromSource.class, ParseFn.class));
}
```
x??

---
#### Keys, Values, Windows, and Partitioning
These determine how data is grouped for processing. The optimizer annotates each PCollection to reflect these characteristics.

:p What do keys, values, windows, and partitioning represent in the context of a pipeline?
??x
Keys, values, windows, and partitioning are critical components that define how data is processed within a pipeline:

- **Key**: Defines groups of records (e.g., `KV<Team, Integer>`).
- **Value**: The actual data within each group.
- **Window**: Time-based grouping to process elements in chunks over time.
- **Partitioning**: How the data is distributed across parallel processing units.

For example:
```java
// Applying windowing and partitioning
PCollection<KV<Team, Integer>> input = raw.apply(
    Window.into(FixedWindows.of(TWO_MINUTES))
           .triggering(AfterWatermark()
                       .withEarlyFirings(AlignedDelay(ONE_MINUTE))
                       .withLateFirings(AfterCount(1)))
).apply(Sum.integersPerKey());
```
This code groups elements by `Team` and processes them in fixed 2-minute windows, triggering sums every minute for early firings.

x??

---
#### Logical Phases of a Team Score Summation Pipeline
The pipeline breaks down into logical phases with specific intermediate PCollection types that represent data transformations and operations.

:p What are the main differences between Figures 6-13 and 6-14 in terms of logical versus physical operations?
??x
In Figure 6-13, we see a high-level, logical view of the pipeline. In contrast, Figure 6-14 shows how this is translated into physical stages with primitive operations:

- **Logical Operations**: High-level abstractions (e.g., `Parse`, `Sum`).
- **Physical Stages**: Primitive operations executed by the engine.

For example:
```java
// Logical and Physical Phases
PCollection<String> raw = IO.read(...);
PCollection<KV<Team, Integer>> input = raw.apply(new ParseFn());
PCollection<KV<Team, Integer>> totals = input
    .apply(Window.into(FixedWindows.of(TWO_MINUTES)))
    .apply(Sum.integersPerKey());
```

x??

---


---
#### Parse Operation
The `Parse` operation extracts a key (team ID) and value (user score) from raw strings. It is a nongrouping operation, meaning that the stream it consumes remains a stream on the other side.

:p What does the `Parse` operation do in the context of processing data streams?
??x
The `Parse` operation takes raw input strings and extracts two pieces of information: a key (team ID) and a value (user score). This process is straightforward and ensures that the output remains as a stream, not altering its structure.

```java
public class ParseExample {
    public static void main(String[] args) {
        String input = "Team123 85";
        String[] parts = input.split(" ");
        String teamId = parts[0];
        int score = Integer.parseInt(parts[1]);
        System.out.println("Team ID: " + teamId + ", Score: " + score);
    }
}
```
x??

---
#### Window+Trigger Operation
The `Window+Trigger` operation involves two main steps:
1. **Window Assignment**: Each element is assigned to a set of windows, done through the `AssignWindows` operation.
2. **Triggering**: This happens after grouping and converts the table created by grouping back into a stream.

:p What are the two primary operations that make up the `Window+Trigger` process?
??x
The `Window+Trigger` process consists of:
1. **Window Assignment**: This step assigns each element to specific windows using the `AssignWindows` operation, which is nongrouping and simply annotates elements with their respective window(s), maintaining the stream structure.
2. **Triggering**: After grouping, this step converts the resulting table back into a stream, typically through its own dedicated operation following `GroupMergeAndCombine`.

```java
public class WindowExample {
    public void assignWindows() {
        // Logic to assign windows to elements
    }

    public void triggerEvents() {
        // Logic to convert grouped tables back into streams
    }
}
```
x??

---
#### Sum Operation
Summation in Beam is a composite operation that involves partitioning and aggregation. Key steps are:
1. **Partitioning**: Redirects elements with the same keys to the same physical machine, often referred to as shuffling.
2. **Grouping**: Merges windows and groups by key and window.
3. **Combining**: Aggregates individual elements incrementally.

:p What does the `Sum` operation involve in detail?
??x
The `Sum` operation is a composite process involving:
1. **Partitioning**: This nongrouping operation redirects elements to physical machines based on keys, ensuring that elements with the same key end up together.
2. **Grouping**: Involves window merging and grouping by key and window.
3. **Combining**: Aggregates individual elements incrementally using a `CombineFn` in Beam.

```java
public class SumExample {
    public void partitionElements() {
        // Logic to redirect elements based on keys
    }

    public void groupAndMergeWindows() {
        // Logic to merge windows and group by key and window
    }

    public void combineElements() {
        // Incremental aggregation logic using CombineFn
    }
}
```
x??

---
#### WriteToSink Operation
The `WriteToSink` operation writes the stream produced by triggering (a table or a stream) into an output data sink. It involves grouping if writing to a table, and no additional grouping if writing to a stream.

:p What is the role of the `WriteToSink` operation in the process?
??x
The `WriteToSink` operation writes the stream produced by triggering (either a table or a stream) into an output data sink. It requires:
- **Grouping**: If writing to a table, grouping may be necessary.
- **No Grouping**: No additional grouping is required if writing to a stream.

```java
public class WriteToSinkExample {
    public void writeData() {
        // Logic to write the stream into an output sink
    }
}
```
x??

---


---
#### Data Processing Pipelines
Data processing pipelines consist of tables, streams, and operations upon them. Tables are data at rest, while streams represent data in motion over time.

:p What is a table in the context of data processing?
??x
A table represents data that is "at rest" or accumulated over time. It acts as a container for storing data that can be observed and analyzed, but does not change its form within the table until explicitly modified by operations.
x??

---
#### Streams vs Tables
Streams are data in motion, encoding a discretized view of how tables evolve over time.

:p What is a stream?
??x
A stream consists of data points flowing continuously or intermittently. It captures the evolution of a table over time and represents the data as it moves through processing stages.
x??

---
#### Nongrouping Operations (stream → stream)
Nongrouping operations apply to streams, altering their content while keeping them in motion.

:p What are nongrouping operations?
??x
Nongrouping operations modify individual elements within a stream without changing the structure or grouping of the data. They preserve the cardinality and continuity of the stream.
x??

---
#### Grouping Operations (stream → table)
Grouping operations bring data from streams to rest, forming tables that evolve over time.

:p What are grouping operations?
??x
Grouping operations aggregate data within a stream by key or window, effectively "bringing" them to rest in a new tabular form. These operations can include windowing which incorporates event-time dimensions.
x??

---
#### Windowing Operations (stream → table)
Windowing operations incorporate the dimension of event time into grouping.

:p What is windowing?
??x
Windowing is a technique that segments data streams based on time intervals, allowing for analysis within those specific time windows. It captures data points that fall within the same time frame to perform aggregations.
x??

---
#### Merging Windows (stream → table)
Merging windows dynamically combine over time, reshaping in response to observed data.

:p How do merging windows work?
??x
Merging windows continuously update their state as new data arrives. They dynamically adjust to include or exclude data based on the current window's boundaries and the event-time conditions specified.
x??

---
#### Ungrouping Operations (table → stream)
Ungrouping operations trigger data within tables into motion, forming streams.

:p What are ungrouping operations?
??x
Ungrouping operations take data that is in a table form, ungroup them, and move them to a stream. This process captures the evolution of the table over time.
x??

---
#### Watermarks (table → stream)
Watermarks provide a notion of input completeness relative to event time.

:p What are watermarks used for?
??x
Watermarks are used in stream processing to indicate when all events with an earlier timestamp have been received. They help manage input data completeness and ensure that processing does not lag behind the event-time window.
x??

---
#### Accumulation Mode (table → stream)
The accumulation mode of triggering determines the nature of the resulting stream.

:p What role does the accumulation mode play?
??x
The accumulation mode dictates whether the stream contains deltas or values, and if it provides retraction for previous deltas. This setting is crucial in defining how data changes are tracked and managed over time.
x??

---
#### Table to Table Operations (table → table)
There are no operations that consume a table and yield a table.

:p Why can't there be direct table-to-table operations?
??x
Direct modifications between tables without converting to streams first are not possible because the state of data must change from rest to motion for processing. All changes to a table require conversion to stream, modification, and then back to a table.
x??

---

