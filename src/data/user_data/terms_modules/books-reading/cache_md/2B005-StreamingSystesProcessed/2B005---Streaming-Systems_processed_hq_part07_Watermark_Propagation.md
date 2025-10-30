# High-Quality Flashcards: 2B005---Streaming-Systems_processed (Part 7)

**Rating threshold:** >= 8/10

**Starting Chapter:** Watermark Propagation

---

**Rating: 9/10**

---
#### Input Watermark
Background context: In a multi-stage pipeline, an input watermark captures the progress of everything upstream of that stage. This helps understand how complete the input data is for the current stage.

:p Define and explain the concept of input watermark in a multi-stage pipeline.
??x
The input watermark at a specific stage represents the latest event time seen by all its upstream sources and stages combined. It essentially tracks when new data has arrived and processed up to that point.

For example, consider a two-stage pipeline where Stage 1 processes user-level aggregates from raw data and Stage 2 computes team-level aggregates based on these per-user results. The input watermark for Stage 2 would be the latest event time seen by all sources feeding into Stage 1.
```java
// Pseudocode to calculate input watermark at a stage
public long getInputWatermark() {
    List<Long> upstreamWatermarks = getUpstreamSources().stream()
        .map(Source::getCurrentWatermark)
        .collect(Collectors.toList());
    return Collections.min(upstreamWatermarks);
}
```
x??

---
#### Output Watermark
Background context: An output watermark captures the progress of a stage itself, defined as the minimum of the stage’s input watermark and the event times of all non-late data active messages within the stage.

:p Explain the concept of an output watermark in a multi-stage pipeline.
??x
The output watermark for a stage indicates when the stage has processed data up to a certain point. It is determined by taking the minimum of two values: 
1. The input watermark, which tells us how far we are from the latest event time seen upstream.
2. The event times of all non-late active messages within the current stage.

This helps in understanding when the stage can produce output data that is not late and meets the required processing level.

For instance, consider a windowed aggregation over 10 seconds:
```java
// Pseudocode to calculate output watermark at a stage
public long getOutputWatermark() {
    long inputWatermark = getInputWatermark();
    List<Long> activeMessages = getStageData().stream()
        .filter(message -> !isMessageLate(message))
        .map(Message::getEventTime)
        .collect(Collectors.toList());
    return Math.min(inputWatermark, Collections.min(activeMessages));
}
```
x??

---
#### Event-Time Latency and Lag
Background context: The difference between the input watermark and output watermark of a stage gives the amount of event-time latency or lag introduced by that stage. This indicates how delayed behind real time the output will be.

:p Define and explain event-time latency and lag in a multi-stage pipeline.
??x
Event-time latency, or simply "lag," is the difference between the input watermark (the latest event time seen upstream) and the output watermark (when the current stage has processed data up to that point). This value indicates how much delayed the output of each stage is behind both real-time and the latest input.

For a 10-second windowed aggregation, the lag would be at least 10 seconds because it takes at least 10 seconds from when the first event in the window arrives until all events have been aggregated.
```java
// Pseudocode to calculate stage latency
public long getLatency() {
    return getInputWatermark() - getOutputWatermark();
}
```
x??

---
#### Watermarks Across Multiple Buffers within a Stage
Background context: Within a single stage, processing is often segmented into multiple conceptual components (buffers) that contribute to the output watermark. Each buffer tracks its own watermark, and the overall output watermark of the stage is the minimum across all such buffers.

:p Explain how watermarks are tracked in different buffers within a single stage.
??x
Watermarks can be tracked individually for each buffer within a stage. Each buffer represents an active state where data resides before final processing or transmission to downstream stages. The overall output watermark for the stage is calculated as the minimum of the watermarks across all these buffers.

For example, in a streaming system with buffers:
```java
// Pseudocode to calculate output watermark from multiple buffers
public long getOutputWatermark() {
    List<Long> bufferWatermarks = new ArrayList<>();
    // Assuming we have three buffers (Buffer1, Buffer2, Buffer3)
    bufferWatermarks.add(Buffer1.getWatermark());
    bufferWatermarks.add(Buffer2.getWatermark());
    bufferWatermarks.add(Buffer3.getWatermark());
    return Collections.min(bufferWatermarks);
}
```
x??

---

**Rating: 8/10**

#### Watermark Propagation and Output Timestamps Overview
Background context: In processing pipelines, output timestamps play a crucial role in determining how watermarks progress through stages. Understanding these nuances helps in optimizing the pipeline's performance and correctness.

:p What are the key aspects of watermark propagation and output timestamps in data processing pipelines?
??x
Watermark propagation involves ensuring that watermarks move forward as new non-late elements arrive, but not backward. Output timestamps dictate when a window's results are considered finalized, impacting how watermarks progress through different stages.

For example, consider the following pipeline steps:
- **Stage 1**: A window is applied with a specific timestamp combiner.
- **Stage 2**: The output of Stage 1 sets the watermark based on certain conditions.

The choice of output timestamps can significantly affect watermark progression and overall performance. 
x??

---

#### End of Window as Output Timestamp
Background context: One common approach to setting output timestamps is using the end of the window, which ensures that the results are representative of the entire window period.

:p How does using the end of the window as an output timestamp impact watermark progression?
??x
Using the end of the window as an output timestamp allows for smooth watermark progress because watermarks can advance once all elements in a window have been processed. This approach is safe and ensures that late arriving data do not cause backtracking of watermarks.

```java
// Example using Apache Beam SDK (pseudo-code)
PCollection<Double> sessions = 
    PCollection.of(...).apply(
        Window.into(Sessions.withGapDuration(Duration.standardMinutes(1)))
               .triggering(AtWatermark())
               .withTimestampCombiner(EARLIEST)
               .discardingFiredPanes()
    ).apply(CalculateWindowLength());
```
x??

---

#### Timestamp of First Nonlate Element as Output Timestamp
Background context: Another approach is to use the timestamp of the first non-late element, which can make watermarks more conservative.

:p How does using the timestamp of the first nonlate element affect watermark progression?
??x
Using the timestamp of the first nonlate element ensures that watermarks are set based on early elements, making them more conservative. This approach minimizes false positives but may delay watermark progress due to potential late elements.

```java
// Example using Apache Beam SDK (pseudo-code)
PCollection<Double> sessions = 
    PCollection.of(...).apply(
        Window.into(Sessions.withGapDuration(Duration.standardMinutes(1)))
               .triggering(AtWatermark())
               .withTimestampCombiner(EARLIEST)
               .discardingFiredPanes()
    ).apply(CalculateWindowLength());
```
x??

---

#### Timestamp of a Specific Element as Output Timestamp
Background context: Sometimes, using the timestamp of a specific element that has processed results can be useful for certain use cases.

:p How does using the timestamp of a specific element impact watermark progression?
??x
Using the timestamp of a specific element (e.g., query or click in join operations) provides flexibility but must ensure that the element is not late. This approach can lead to more precise watermarks, though it requires careful validation of non-lateness.

```java
// Example using Apache Beam SDK (pseudo-code)
PCollection<Double> sessions = 
    PCollection.of(...).apply(
        Window.into(Sessions.withGapDuration(Duration.standardMinutes(1)))
               .triggering(AtWatermark())
               .withTimestampCombiner(EARLIEST)
               .discardingFiredPanes()
    ).apply(CalculateWindowLength());
```
x??

---

#### Comparison of Watermarks and Results
Background context: Different choices for output timestamps can affect watermark delays and the results produced.

:p How does choosing different output timestamps impact the overall pipeline?
??x
Choosing different output timestamps impacts watermark delays and the results. Using the end of the window as an output timestamp allows smoother watermark progression, whereas using the first nonlate element makes watermarks more conservative but may delay progress.

Example diagrams show:
- **Figure 3-7**: Watermarks at the end of session windows.
- **Figure 3-8**: Watermarks at the beginning of session windows (i.e., earliest timestamp).

In both figures, watermark delays and resulting average session lengths differ significantly due to these choices.
x??

---

#### Semantic Differences
Background context: The choice of output timestamps has semantic differences that affect how data is processed and watermarks are managed.

:p How do the semantic differences between different output timestamps manifest in a pipeline?
??x
Semantic differences arise from how watermarks progress and when windows are considered complete. Using the end of the window makes watermark progression smoother but may delay final results, while using the first nonlate element ensures early conservative watermarking but can be delayed by late elements.

For example:
- **End of Window**: Ensures all data is processed before finalizing.
- **First Nonlate Element**: More conservative and potentially earlier, but delays watermark progress.

These differences are crucial for balancing accuracy and latency in pipelines.
x??

---

**Rating: 8/10**

#### Session Timestamp Assignment Impact on Fixed Windows

Background context: When session timestamps are assigned to match the earliest non-late element within a session, individual sessions may end up in different fixed window buckets during subsequent calculations. This difference is not inherently right or wrong but critical for understanding and making choices based on specific use cases.

:p How does assigning session timestamps affect fixed windows?
??x
Assigning session timestamps to the earliest non-late element can cause sessions to be distributed across different fixed window buckets, leading to varying results in downstream processing. This assignment ensures correctness but may introduce delays due to watermark holding back mechanisms.
x??

---

#### Handling Sliding Windows with Overlapping

Background context: In sliding windows, a naive approach of setting output timestamps as the earliest element can lead to delayed emissions. This is because watermarks are held back based on this timestamp.

:p What issue arises when using overlapping sliding windows?
??x
Using the earliest element timestamp for output in overlapping sliding windows can cause delays. As elements move through multiple windows, later windows wait for earlier ones, even if they have completed their processing logic.
x??

---

#### Naive Approach to Sliding Windows

Background context: A naive approach to setting the output timestamp as the minimum event time often results in delayed emissions and watermark holding back issues.

:p Why might the naive approach of using the earliest element timestamp cause problems?
??x
The naive approach can lead to unnecessary delays because watermarks are held back based on the earliest event time. This means that even if a window has completed its processing, it may not be emitted downstream until all earlier windows have been processed and their watermarks have passed.
x??

---

#### Overlapping Windows with Special Logic

Background context: Beam provides special logic to ensure overlapping windows emit results in a timely manner by setting the output timestamp for each window \(N+1\) greater than the end of window \(N\).

:p How does Beam handle overlapping windows to avoid delays?
??x
Beam uses special logic where the output timestamp for each window \(N+1\) is set to be greater than the end time of window \(N\). This ensures that completed windows can be emitted promptly, avoiding unnecessary delays.
x??

---

#### Percentile Watermarks

Background context: Traditional watermarks track the minimum event time, but percentile watermarks use any percentile of the distribution. This allows for faster and smoother watermark advancement by discarding outliers.

:p What is a benefit of using percentile watermarks over traditional minimum event time tracking?
??x
Using percentile watermarks can provide faster and smoother watermark advancement by ignoring outliers in the long tail of the distribution. This means that the system can be more responsive to most events, even if some late events are still pending.
x??

---

#### Example Scenario with Percentile Watermark

Background context: In a scenario where event times form a compact distribution (Figure 3-9), percentile watermarks like the 90th percentile can approximate the 100th percentile closely. However, in cases with outliers (Figure 3-10), the 90th percentile significantly leads the 100th percentile.

:p How does a compact event time distribution affect percentile watermarking?
??x
In a compact distribution of event times, the 90th percentile watermark can be very close to the 100th percentile, meaning that most events are well within this watermark. This allows for efficient processing and smooth watermark advancement.
x??

---

#### Outlier Impact on Percentile Watermarks

Background context: In scenarios with outliers (Figure 3-10), percentile watermarks like the 90th can be significantly ahead of the 100th percentile, allowing the system to process most events more quickly.

:p How do outliers affect percentile watermarking?
??x
Outliers in event times can cause the 90th percentile watermark to be much earlier than the 100th percentile. By discarding these outliers, the system can advance its watermark more smoothly and efficiently, focusing on processing the bulk of events.
x??

---

