# High-Quality Flashcards: 2B005---Streaming-Systems_processed (Part 17)


**Starting Chapter:** Incremental Combining

---


#### Raw Grouping vs Incremental Combining

Background context explaining the concept. We compare raw grouping, which stores all input values for a window and computes the sum at once, with incremental combining, where we store partial sums (accumulators) that can be combined incrementally.

:p Which method stores more data in each window?
??x
Raw grouping stores all individual inputs for the window, whereas incremental combining uses accumulators to keep track of intermediate results. This means raw grouping requires significantly more memory.
x??

---
#### Incremental Combining

Incremental combining is a form of automatic state built upon a user-defined associative and commutative combining operator. It allows for efficient aggregation by storing partial results (accumulators) that can be combined in any order.

:p What are the key properties that allow incremental combining to work efficiently?
??x
The key properties are commutativity and associativity. These ensure that the order of combination does not matter, allowing us to combine inputs and partial aggregates in an optimal manner.
x??

---
#### CombineFn API

The `CombineFn` class provides a structured way to perform incremental combining by defining methods for creating accumulators, adding inputs, merging accumulators, and extracting outputs.

:p What is the purpose of the `CombineFn` class?
??x
The purpose of `CombineFn` is to provide a framework for performing efficient aggregations. It handles the creation of accumulators, addition of new data, merging of these accumulators, and extraction of final results.
x??

---
#### Accumulators

Accumulators are intermediate values that represent partial progress in an aggregation. They store information more compactly than raw input data.

:p What is an accumulator used for?
??x
An accumulator stores the intermediate state during the aggregation process. It allows efficient incremental computation and merging, reducing memory usage and improving performance.
x??

---
#### Commutativity and Associativity

These properties ensure that operations can be combined in any order without changing the outcome.

:p Define commutativity and associativity in the context of combining operators.
??x
- **Commutativity**: `COMBINE(a, b) == COMBINE(b, a)` - The order of individual elements does not matter.
- **Associativity**: `COMBINE(COMBINE(a, b), c) == COMBINE(a, COMBINE(b, c))` - The way in which elements are grouped for combination also does not matter.
x??

---
#### Incremental Aggregation

Incremental aggregation uses accumulators to store partial results of aggregations, making them more compact and easier to manage.

:p How do incremental aggregations benefit from using accumulators?
??x
Incremental aggregations benefit by using accumulators that are smaller in size than raw input data. This reduces memory usage and allows for efficient merging of partial results.
x??

---
#### Parallelization

The ability to parallelize computations based on the properties of commutativity and associativity is crucial for distributed systems.

:p How does parallelism work with incremental combining?
??x
Parallelism works by allowing partial aggregates (accumulators) from different parts of a system to be combined independently. This can lead to significant performance gains in distributed computing environments.
x??

---
#### Example: Incremental Summation

A practical example using `Sum.integersPerKey()` shows how incremental combining can be applied.

:p How is the summation implemented in the given example?
??x
The summation is implemented using `Sum.integersPerKey()`, which automatically handles the creation and merging of accumulators. Here's a simplified version:

```java
PCollection<String> raw = IO.read(...);
PCollection<KV<Team, Integer>> input = raw.apply(new ParseFn());
PCollection<KV<Team, Integer>> totals = input
    .apply(Window.into(FixedWindows.of(TWO_MINUTES))
        .triggering(AfterWatermark().withEarlyFirings(AlignedDelay(ONE_MINUTE)).withLateFirings(AfterCount(1))))
    .apply(Sum.integersPerKey());
```

The `Sum.integersPerKey()` automatically manages the accumulation and merging of sums.
x??


#### Raw Grouping Method Limitations
Background context explaining that raw grouping requires buffering all inputs before processing. This means no partial processing is possible, making it inflexible for streaming data.

:p What are the limitations of the raw grouping method?
??x
The raw grouping method requires buffering all input elements before any processing can occur. This means you cannot process parts of the data incrementally; everything must be buffered and processed as a whole. This makes it unsuitable for real-time or streaming applications where partial results are needed.

```java
// Pseudocode example:
public void processRawGrouping(PCollection<String> input) {
    PCollection<Iterable<String>> grouped = input.groupBy((String key, String value) -> key);
    // All elements must be buffered here before any processing can occur.
}
```
x??

---

#### Incremental Combination Approach
Background context explaining that incremental combination allows partial processing of data but requires commutative and associative operations. This approach is more flexible than raw grouping.

:p What does the incremental combination approach allow?
??x
The incremental combination approach allows for partial processing of data as records arrive one by one, provided that the operations are commutative and associative. This means you can process parts of the stream incrementally without needing to buffer all elements at once.

```java
// Pseudocode example:
public void processIncrementalCombination(PCollection<String> input) {
    PCollection<AccumulationResult> combined = input.apply(Combine.globally(new AccumulatorFn()));
    // Elements can be processed as they arrive, maintaining commutative and associative properties.
}
```
x??

---

#### Generalized State Approach
Background context explaining the need for a more flexible approach to support different data structures, write/ read granularity, and processing scheduling. This is crucial for real-world use cases where specific data types and access patterns are needed.

:p What does Beam provide for supporting generalized state?
??x
Beam provides flexibility in data types, write/read granularity, and processing scheduling through its `DoFn` mechanism. It allows declaring multiple state fields with different types, tailoring the amount of data written or read at any given time, and binding specific processing to event-time or processing-time schedules via timers.

```java
// Example of declaring multiple state fields:
public class MyDoFn extends DoFn<String, String> {
    @StateId("visits")
    private StateSpec<BagState<String>> visitsState;

    @StateId("impressions")
    private StateSpec<MapState<Long, String>> impressionsState;
}
```
x??

---

#### Data Structure Flexibility
Background context explaining the need to support different data structures like maps, trees, and graphs for efficient processing.

:p Why is flexibility in data structures important?
??x
Flexibility in data structures is important because real-world use cases often require specific data types that are most appropriate and efficient for the task at hand. For example, using a map might be more suitable than a list if you need fast lookups, or a tree might be better for hierarchical relationships.

```java
// Example of declaring different state fields with different types:
public class MyDoFn extends DoFn<String, String> {
    @StateId("dataMap")
    private StateSpec<BagState<Map<String, Integer>> dataMapState;

    @StateId("dataList")
    private StateSpec<BagState<List<String>>> dataListState;
}
```
x??

---

#### Write and Read Granularity Flexibility
Background context explaining the need to write and read precisely the necessary amount of data at any given time for optimal efficiency.

:p What does Beam offer for granular writes and reads?
??x
Beam offers granular writes and reads by allowing fine-grained access to state fields through datatype-specific APIs. This enables writing and reading only the necessary amount of data, and supporting parallel operations where possible.

```java
// Example of granular write and read:
public class MyDoFn extends DoFn<String, String> {
    @StateId("partialData")
    private StateSpec<BagState<String>> partialDataState;

    // Write example
    public void processElement(ProcessContext c) {
        List<String> data = c.getState(partialDataState);
        if (data.size() > 100) {
            c.output(data);
            data.clear();
        }
    }

    // Read example
    public void merge(Bag<String> partial, Bag<String> full) {
        for (String item : partial.iterate()) {
            full.add(item);
        }
    }
}
```
x??

---

#### Scheduling of Processing with Timers
Background context explaining the need to bind processing to specific points in time using timers.

:p How does Beam provide flexible scheduling?
??x
Beam provides flexible scheduling through timers, which allow binding specific points in time (in either event-time or processing-time domains) to methods that should be called at those times. This enables delaying specific bits of processing until a more appropriate future time.

```java
// Example of using timers:
public class MyDoFn extends DoFn<String, String> {
    @StateId("eventTimeTimer")
    private StateSpec<TimerState<EventTime>> eventTimeTimerState;

    // Process element and set timer
    public void processElement(ProcessContext c) {
        if (/* condition */) {
            c.state(eventTimeTimerState).get().setTimer(/* timestamp */);
        }
    }

    // Timer expiring function
    @OnTimer("eventTimeTimer")
    public void onEventTimeTimerExpiry(TimerData timerData, ProcessContext c) {
        // Perform delayed processing here.
    }
}
```
x??

---


#### Conversion Attribution Overview
Conversion attribution is a technique widely used in advertising to provide concrete feedback on the effectiveness of advertisements. It involves attributing specific advertisement impressions to user actions that result in goals being achieved, such as making a purchase or signing up for a mailing list.

:p What is conversion attribution and why is it important?
??x
Conversion attribution is a method used to track how ad impressions lead to desired outcomes on websites. It helps advertisers understand the effectiveness of their campaigns by attributing specific ads to user actions like purchases or sign-ups. This information is crucial for optimizing advertising strategies and improving ROI.
x??

---
#### Challenges in Conversion Attribution
Handling out-of-order data, high volume processing, spam protection, and performance optimization are critical challenges when building a robust conversion attribution pipeline.

:p What challenges must be considered in building a conversion attribution system?
??x
Building a robust conversion attribution system requires addressing several key challenges:
- **Out-of-order Data Handling**: Data from different systems might arrive out of order.
- **High Volume Processing**: The system needs to handle large volumes of data for multiple users.
- **Spam Protection**: Measures must be in place to prevent unfair charging due to spam attacks.
- **Performance Optimization**: Efficient processing is necessary to handle the scale and complexity.

These challenges are critical because they ensure the pipeline can operate correctly even when data arrives out of sequence, process large volumes without loss of performance, protect against fraudulent activities, and deliver timely results.
x??

---
#### Out-of-order Data Handling
Out-of-order data arrival is a significant issue due to distributed collection services that might send data in an unpredictable order.

:p How does out-of-order data impact the pipeline?
??x
Out-of-order data can severely affect the accuracy of conversion attribution because it introduces inconsistencies. For instance, if impressions and visits are received out of sequence, it becomes difficult to correctly attribute conversions to specific advertisements. This requires the system to have robust mechanisms to handle such disorder.

The impact is that without proper handling, the pipeline might incorrectly attribute conversions or fail to capture them altogether.
x??

---
#### High Volume Processing
High volume processing is necessary due to the large number of independent users and potential data storage needs for multiple months.

:p What are the implications of high volumes in a conversion attribution system?
??x
High volumes in a conversion attribution system imply significant data throughput, requiring efficient handling mechanisms. The system must process data for many independent users simultaneously, which can lead to substantial storage demands. For example, storing 90 days' worth of visit, impression, and goal data per user could be necessary.

The implications include the need for scalable infrastructure to manage high incoming data rates and sufficient storage capacity to hold historical data.
x??

---
#### Spam Protection
Spam protection is crucial to prevent unfair charging by ensuring each visit and impression is counted only once within a certain time frame.

:p How does spam protection work in conversion attribution?
??x
Spam protection involves mechanisms to ensure that visits and impressions are accounted for exactly once, often within a defined time window (e.g., within the same day). This prevents fraudulent clicks or multiple counts of the same event. For example, if an ad is clicked multiple times by the same user in quick succession, these events must be treated as duplicates.

The protection ensures that advertisers are not charged unfairly and maintains the integrity of the attribution data.
x??

---
#### Performance Optimization
Performance optimization involves balancing between handling large volumes of data efficiently while ensuring low latency for processing and reporting.

:p Why is performance optimization important in a conversion attribution system?
??x
Performance optimization is essential because it impacts the real-time nature of the system. High throughput and fast response times are crucial to provide timely insights into ad effectiveness. Efficient algorithms and optimized pipelines can handle large volumes of data quickly, ensuring that reports and analytics are generated rapidly.

Without proper performance optimization, the system might become bottlenecked, leading to delays in analysis and decision-making.
x??

---
#### Example Scenario
Consider a scenario where user actions like impressions, visits, and goals are represented as events in an unbounded stream. These events need to be processed to attribute conversions accurately despite potential out-of-order arrivals.

:p How would you model the conversion attribution process?
??x
To model the conversion attribution process, you can use a stream processing framework that supports event-time processing and state management. Here’s a simplified pseudocode example:

```java
class ConversionAttribution {
    private final Map<String, VisitedPage> userVisits = new ConcurrentHashMap<>();
    private final Set<AdImpression> recentImpressions = new ConcurrentLinkedQueue<>();

    public void processEvent(Event event) {
        switch (event.getType()) {
            case VISIT:
                handleVisit(event);
                break;
            case IMPRESSION:
                handleImpression(event);
                break;
            case GOAL:
                handleGoal(event);
                break;
        }
    }

    private void handleVisit(VisitEvent event) {
        userVisits.put(event.getUserId(), event.getVisitedPage());
    }

    private void handleImpression(ImpressionEvent event) {
        recentImpressions.add(event.getImpression());
    }

    private void handleGoal(GoalEvent event) {
        String userId = event.getUserId();
        VisitedPage goalPage = userVisits.get(userId);
        if (goalPage != null && isWithinTimeWindow(goalPage, event.getVisitedPage())) {
            // Attribute the conversion
            logConversion(userId, goalPage);
        }
    }

    private boolean isWithinTimeWindow(VisitedPage from, VisitedPage to) {
        // Logic to check time window for duplicate impressions
        return true; // Simplified
    }

    private void logConversion(String userId, VisitedPage page) {
        // Log the conversion event
    }
}
```

This example shows how events can be processed in a stream and state maintained to attribute conversions accurately.
x??

---

