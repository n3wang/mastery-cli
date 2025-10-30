# High-Quality Flashcards: 2B005---Streaming-Systems_processed (Part 5)

**Rating threshold:** >= 8/10

**Starting Chapter:** When Allowed Lateness i.e. Garbage Collection

---

**Rating: 8/10**

#### Allowed Lateness Concept
Background context: In out-of-order stream processing systems, late data is a significant challenge. The allowed lateness concept helps manage this by setting a limit on how late records can be and still be processed. This is critical for maintaining system efficiency and managing resources effectively.

:p What is allowed lateness in the context of stream processing?
??x
Allowed lateness allows us to set a horizon on how late any given record may be relative to the watermark for the system to bother processing it. Any data arriving after this horizon are simply dropped, preventing state from lingering indefinitely and saving resources.
```
allowedLateness = 1 minute; // Example setting in code
```
x??

---

#### Garbage Collection Concept
Background context: In long-lived out-of-order stream processing systems, persistent state for windows needs to be managed carefully. Persistent state can consume significant disk space or computational resources if not handled properly. Therefore, garbage collection policies are necessary.

:p What is the purpose of garbage collection in stream processing?
??x
The purpose of garbage collection is to ensure that system state does not linger indefinitely, which could lead to resource exhaustion (disk space) and inefficiency. By defining a horizon on allowed lateness, the system can decide when it's safe to discard old data.
```
// Pseudocode for garbage collection logic
if (watermark > windowEnd + allowedLateness) {
  // Discard state of the window
}
```
x??

---

#### Watermarks and Lateness Concept
Background context: Watermarks are used in stream processing to denote the progress of event-time. Low watermarks pessimistically attempt to capture the oldest unprocessed record, while high watermarks optimistically track the newest known record. Allowed lateness allows setting a horizon for late data.

:p What is the difference between low and high watermarks?
??x
Low watermarks are used to pessimistically track the event-time of the oldest unprocessed record in the system. They ensure that processing does not miss any potentially relevant data, even if it arrives late.
High watermarks optimistically track the event-time of the newest known record, allowing the system to drop older records beyond a specified lateness threshold.

Example code snippet for low watermark:
```java
// Example setting for low watermark logic
if (watermark > oldestUnprocessedRecord) {
  // Process data accordingly
}
```

Example code snippet for high watermark with allowed lateness:
```java
// Example setting for high watermark with allowed lateness
if (currentWatermark + allowedLateness > newestProcessedRecord) {
  // Decide to discard older records
}
```
x??

---

#### Early/Fire and Late Firings Concept
Background context: In stream processing, early firings and late firings are used to handle the timing of window triggers. Early firings allow partial results before all data is available, while late firings ensure that final results include any late data.

:p What do early firings and late firings refer to in stream processing?
??x
Early firings and late firings are strategies for handling window triggers. Early firings enable the system to emit intermediate results even when not all input data has arrived, which can improve responsiveness. Late firings ensure that final results include any late-arriving data.

Example code snippet with early and late firings:
```java
PCollection<KV<Team, Integer>> totals = input
  .apply(Window.into(FixedWindows.of(TWO_MINUTES))
    .triggering(
      AfterWatermark()
        .withEarlyFirings(AlignedDelay(ONE_MINUTE))
        .withLateFirings(AfterCount(1)))
    .withAllowedLateness(ONE_MINUTE))
  .apply(Sum.integersPerKey());
```
x??

---

#### Example of Early/Fire and Late Firings with Allowed Lateness
Background context: The provided example illustrates how early firings, late firings, and allowed lateness can be combined to process data effectively in a stream processing pipeline.

:p What does the following code snippet demonstrate?
```java
PCollection<KV<Team, Integer>> totals = input
  .apply(Window.into(FixedWindows.of(TWO_MINUTES))
    .triggering(
      AfterWatermark()
        .withEarlyFirings(AlignedDelay(ONE_MINUTE))
        .withLateFirings(AfterCount(1)))
    .withAllowedLateness(ONE_MINUTE))
  .apply(Sum.integersPerKey());
```
??x
The code snippet demonstrates a stream processing pipeline where windows of data are triggered for early firings (after one minute) and late firings (after the first late record). Additionally, it includes an allowed lateness of one minute, meaning that any data arriving within this period can still be processed.

This setup ensures timely partial results while accommodating potential late data.
x??

---

**Rating: 8/10**

#### Discarding Accumulation Mode
Discarding accumulation mode is where every time a pane is materialized, any stored state is discarded. This means each successive pane is independent from any that came before it. This approach can be useful when the downstream consumer performs its own aggregation.

:p In discarding mode, how do subsequent panes relate to each other?
??x
In discarding mode, each pane operates independently and does not retain any state from previous panes. Each new pane starts with a clean slate.
```java
// Pseudo-code for discarding accumulation mode in Apache Beam:
PCollection<KV<Team, Integer>> totals = input
    .apply(Window.into(FixedWindows.of(TWO_MINUTES))
        .triggering(
            AfterWatermark()
                .withEarlyFirings(AlignedDelay(ONE_MINUTE))
                .withLateFirings(AtCount(1)))
        .discardingFiredPanes())
    .apply(Sum.integersPerKey());
```
x??

---

#### Accumulating Accumulation Mode
Accumulating accumulation mode retains any stored state when a pane is materialized, and future inputs are accumulated into the existing state. This means each successive pane builds upon the previous ones.

:p In accumulating mode, how do subsequent panes build on each other?
??x
In accumulating mode, the state from previous panes is retained, so new values can be added to the existing aggregated result without starting over. Each new pane updates the accumulated state.
```java
// Pseudo-code for accumulating accumulation mode in Apache Beam:
PCollection<KV<Team, Integer>> totals = input
    .apply(Window.into(FixedWindows.of(TWO_MINUTES))
        .triggering(
            AfterWatermark()
                .withEarlyFirings(AlignedDelay(ONE_MINUTE))
                .withLateFirings(AtCount(1)))
        .accumulatingAndRetractingFiredPanes())
    .apply(Sum.integersPerKey());
```
x??

---

#### Accumulating and Retracting Mode
Accumulating and retracting mode combines the benefits of both accumulating and discarding modes. It retains state for accumulation but also produces retractions when producing a new pane, which helps in cleaning up old values.

:p How does accumulating and retracting mode handle previous states?
??x
In accumulating and retracting mode, each new pane not only accumulates new data into the existing state but also retracts (removes) the previous state. This is useful for scenarios where data needs to be regrouped by a different dimension or when dynamic windows require replacing multiple old windows.
```java
// Pseudo-code for accumulating and retracting mode in Apache Beam:
PCollection<KV<Team, Integer>> totals = input
    .apply(Window.into(FixedWindows.of(TWO_MINUTES))
        .triggering(
            AfterWatermark()
                .withEarlyFirings(AlignedDelay(ONE_MINUTE))
                .withLateFirings(AtCount(1)))
        .accumulatingAndRetractingFiredPanes())
    .apply(Sum.integersPerKey());
```
x??

---

#### Example of Discarding Accumulation Mode
Example 2-9 illustrates the discarding mode in action, where each pane only incorporates values from that specific pane and does not retain state from previous panes.

:p How does the output differ between accumulating and discarding modes?
??x
In discarding mode, the final value observed in a pane does not include data from previous panes. However, summing all independent panes will give the correct total. This contrasts with accumulating mode where each new pane builds upon the existing state, leading to potential double-counting if summed separately.
```java
// Output example for discarding and accumulating modes:
Table 2-1. Comparing accumulation modes using the second window from Figure 2-11

| Pane      | Discarding Mode | Accumulating Mode | Accumulating & Retracting Mode |
|-----------|-----------------|------------------|--------------------------------|
| Pane 1:   | inputs=[3]       | 3                | 3                              |
| Pane 2:   | inputs=[8, 1]    | 9 (3 + 8 + 1)    | 12 (3 + 8 + 1 - 3)              |
| Value of final normal pane | 9              | 12               | 12                             |
| Sum of all panes   | 12             | 15               | 12                             |
```
x??

---

---

**Rating: 8/10**

#### Event Time vs Processing Time
Background context: Understanding event time versus processing time is crucial for robust stream processing. Event time refers to when events occur, while processing time refers to when they are observed by your data processing system.

:p What is the difference between event time and processing time?
??x
Event time is about when an event occurs in reality, whereas processing time is about when it's processed by your system. This distinction is important for ensuring correct results even if there's a delay or out-of-order events.
x??

---

#### Windowing
Background context: Windowing is used to manage unbounded data by slicing it along temporal boundaries. In the Beam Model, windowing is specifically defined within event time.

:p What does windowing do in stream processing?
??x
Windowing slices continuous data streams into manageable segments (windows) for processing. This allows for batch-like operations on a streaming system.
x??

---

#### Triggers
Background context: Triggers define when materialization of output makes sense for your particular use case, providing flexibility in how results are calculated and when they're produced.

:p What is the purpose of triggers in stream processing?
??x
Triggers specify when to emit or update results based on the current state of data within a window. They help control the timing of result materialization.
x??

---

#### Watermarks
Background context: Watermarks provide a notion of progress in event time, enabling reasoning about completeness and missing data in out-of-order processing systems.

:p What is the role of watermarks in stream processing?
??x
Watermarks track the latest known event timestamp, allowing the system to determine when enough data has arrived for a window. This helps manage late-arriving data.
x??

---

#### Accumulation Modes
Background context: Accumulation modes describe how results are refined as windows evolve and materialize multiple times.

:p What are the different accumulation modes in stream processing?
??x
The accumulation modes include discarding, accumulating, and accumulating and retracting. Each mode offers a trade-off between correctness, latency, and cost.
x??

---

#### Discarding Mode
Background context: In discarding mode, previous results are discarded when new data arrives.

:p How does the discarding mode work in stream processing?
??x
In discarding mode, each window is processed independently. As new windows come in, old results are discarded, making it cheaper but potentially less correct.
x??

---

#### Accumulating Mode
Background context: In accumulating mode, previous results accumulate to form a running total.

:p How does the accumulating mode work in stream processing?
??x
In accumulating mode, results from previous windows accumulate with new data. This provides more accurate results at the cost of increased storage and computation.
x??

---

#### Accumulating and Retracting Mode
Background context: In accumulating and retracting mode, both accumulation and retraction of results are performed as windows evolve.

:p How does the accumulating and retracting mode work in stream processing?
??x
In this mode, results from previous windows accumulate with new data, but older results are also retracted when they expire. This balances between correctness and cost.
x??

---

#### Fixed Windows in Event Time
Background context: Fixed windowing slices data into time-based intervals for processing.

:p What is fixed windowing in event time?
??x
Fixed windowing divides the stream into non-overlapping segments based on a predefined duration, ensuring each window has a distinct start and end.
x??

---

#### Heuristic Watermark Triggers
Background context: Heuristic watermarks are used to approximate the progress of data arrival.

:p How do heuristic watermark triggers work in stream processing?
??x
Heuristic watermark triggers estimate when enough data is likely available by looking at patterns or heuristics, rather than waiting for a perfect watermark.
x??

---

#### Early/On-Time/Late Trigger Mode
Background context: Trigger modes determine the timing of result materialization based on various conditions.

:p What are the different trigger modes in early/on-time/late?
??x
The trigger modes include early (materializing results before all data is known), on-time (materializing when expected), and late (waiting for more data).
x??

---

#### Summary of Concepts
Background context: This summary recaps the major concepts and questions addressed throughout the chapter, providing a framework for understanding stream processing.

:p What are the key concepts covered in this chapter?
??x
The key concepts include event time vs. processing time, windowing, triggers, watermarks, accumulation modes, and fixed windows in event time.
x??

---

#### Summary of Questions
Background context: The questions used to frame the exploration help in understanding the stream processing model.

:p What are the four questions framing our exploration?
??x
The questions are: what results are calculated (transformations), where in event time are results calculated (windowing), when in processing time are results materialized (triggers plus watermarks), and how do refinements of results relate (accumulation).
x??

---

#### Flexibility in Stream Processing Models
Background context: The Beam Model offers various output variations with minimal code changes, allowing for different trade-offs.

:p How can the Beam Model be used to achieve different outputs?
??x
The Beam Model uses different accumulation modes and trigger configurations to produce varying results, balancing correctness, latency, and cost.
x??

---

#### Watermarks in Detail
Background context: This section delves deeper into watermarks, providing more details on their implementation and usage.

:p What is the role of a heuristic watermark in stream processing?
??x
A heuristic watermark approximates when enough data has arrived for a window to be processed. It's less precise but can achieve faster results by dropping late-arriving data.
x??

---

#### Trade-offs in Accumulation Modes
Background context: Understanding the trade-offs between different accumulation modes is crucial for choosing the right approach.

:p What are the trade-offs of accumulating and retracting mode?
??x
Accumulating and retracting mode balances correctness with cost by both accumulating new data and retraction old data as windows evolve.
x??

---

#### Discarding Mode vs. Accumulating Mode
Background context: Comparing discarding and accumulating modes highlights their differences in handling windowed results.

:p How does the discarding mode differ from the accumulating mode?
??x
Discarding mode discards previous results, making it cheaper but potentially less correct. Accumulating mode retains old results, providing more accurate but costly results.
x??

---

#### Future Directions
Background context: The chapter concludes by hinting at future directions in stream processing and Beam Model.

:p What future directions are mentioned for the Beam Model?
??x
Future iterations of the Beam Model will simplify triggers, introduce sink triggers for accumulating modes, and support SQL with new features like beam 3.0.
x??
---

