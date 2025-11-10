# High-Quality Flashcards: 2B005---Streaming-Systems_processed (Part 10)


**Starting Chapter:** Processing-Time Windowing via Ingress Time

---


#### Windowing via Event-Time Panes
Background context: In this approach, we emulate processing-time windows using event-time panes. This method allows for a more flexible handling of time-based computations on streaming data.

:p How does emulating processing-time windows with event-time panes work?
??x
Emulating processing-time windows with event-time panes involves defining global event-time windows and periodically triggering these windows based on the desired size of the processing-time windows. Each pane acts like an independent processing-time window, ensuring that results are computed independently for each time interval.

Example code:
```java
PCollection<KV<Team, Integer>> totals = input
    .apply(Window.triggering(Repeatedly(AlignedDelay(ONE_MINUTE)))
             .discardingFiredPanes())
    .apply(Sum.integersPerKey());
```
x??

---

#### Processing-Time Windowing via Triggers
Background context: This method involves using triggers to define processing-time windows over event-time data. The key idea is to use a trigger mechanism that fires based on the arrival of new elements, allowing for accurate and timely computations.

:p How does processing-time windowing via triggers work?
??x
Processing-time windowing via triggers works by setting up a trigger that periodically checks if any new events have arrived within the defined time frame. Once the watermark passes the end of the window, the trigger fires, and the elements are processed.

Example code:
```java
PCollection<KV<Team, Integer>> totals = input
    .apply(Window.info(FixedWindows.of(TWO_MINUTES)))
    .apply(Sum.integersPerKey());
```
x??

---

#### Windowing via Ingress Time
Background context: This approach involves mapping the event times of incoming data to their ingress time (processing time at arrival). By doing so, we can effectively emulate processing-time windows on top of a streaming system.

:p How does windowing via ingress time work?
??x
Windowing via ingress time works by overwriting the event times of input elements with their ingress time. This allows us to use standard event-time fixed windows and triggers based on these new timestamps, which are effectively the processing times at arrival.

Example code:
```java
PCollection<String> raw = IO.read()
    .apply(ParDo.of(new DoFn<String, String>() {
        public void processElement(ProcessContext c) {
            c.outputWithTimestamp(new Instant());
        }
    }));

PCollection<KV<Team, Integer>> totals = input
    .apply(Window.info(FixedWindows.of(TWO_MINUTES)))
    .apply(Sum.integersPerKey());
```
x??

---

---


#### Session Windows Overview
Session windows are a type of event-time window that captures periods of activity terminated by a gap of inactivity. They are particularly useful for analyzing user activities over specific time frames where correlation within sessions is needed.

:p What are session windows used for?
??x
Session windows are used to analyze data based on periods of activity, often correlating the events within these periods to understand user engagement or behavior patterns.
x??

---

#### Data-Driven Windows
Session windows exemplify a data-driven window approach where the location and size of the windows depend directly on the input data. This is different from fixed or sliding windows which are based on predefined time intervals.

:p What makes session windows unique compared to fixed or sliding windows?
??x
Session windows are unique because their boundaries (start and end) are determined by patterns in the incoming data, specifically by periods of activity followed by gaps of inactivity. Fixed and sliding windows have pre-defined sizes that do not change based on the input.
x??

---

#### Unaligned Windows
Unlike aligned windows which apply uniformly across all data, session windows are unaligned as they only apply to specific subsets of the data, such as per user sessions.

:p How does a session window differ from an aligned window?
??x
A session window differs from an aligned window in that it is applied to specific subsets of data (like per-user activities) rather than uniformly across all input. Aligned windows like fixed or sliding apply the same window size and boundaries consistently.
x??

---

#### Constructing Sessions with Out-of-Order Data
When dealing with out-of-order data, session windows can still be constructed by merging together overlapping proto-sessions within a predefined gap duration timeout.

:p How are sessions created from out-of-order data?
??x
Sessions are created from out-of-order data by identifying overlapping proto-sessions that fall within the gap duration timeout. These proto-sessions are merged to form larger, continuous session windows as new data arrives.
x??

---

#### Example Code for Session Windows
The following code snippet shows how to set up and use session windows in a PCollection with a one-minute gap duration timeout.

:p What does this code do?
??x
This code sets up a `PCollection` that uses session windows with a one-minute gap duration timeout. It triggers firings both early (aligned delay) and late (after count), ensuring robust handling of incoming data.
```java
PCollection<KV<Team, Integer>> totals = input
    .apply(Window.into(Sessions.withGapDuration(ONE_MINUTE)))
    .triggering(
        AfterWatermark().withEarlyFirings(AlignedDelay(ONE_MINUTE))
                         .withLateFirings(AfterCount(1)))
    .apply(Sum.integersPerKey());
```
x??

---

#### Merging Proto-Sessions into Sessions
Proto-sessions are initially created for each record, with overlaps merged to form complete sessions. The key is that the final session is a composition of smaller overlapping windows separated by inactivity gaps no longer than the timeout.

:p How does merging proto-sessions work?
??x
Merging proto-sessions works by first creating individual proto-sessions for each incoming event and then combining those that overlap within the allowed gap duration. This process continues as new events arrive, ensuring that complete sessions are formed over time.
x??

---

#### Early/Future Firings in Session Windows
Session windows handle early firings using an aligned delay based on the session timeout, while late firings occur after a count of one event, allowing partial results to be materialized even if not all data has arrived.

:p What triggers early and late firings in session windows?
??x
Early firings in session windows are triggered by an aligned delay that matches the session timeout. Late firings occur after a count of one event, enabling partial or speculative materialization before all data for the session is complete.
x??

---

#### Materializing Sessions on Streaming Engines
On a streaming engine, sessions are materialized as complete when the watermark passes the end of the final proto-session window, ensuring that only full and accurate results are produced.

:p How are sessions materialized in a streaming environment?
??x
In a streaming environment, sessions are materialized once the watermark passes the end of the last proto-session window. This ensures that only complete and accurate session results are outputted, even as new data continuously arrives.
x??

---


#### Custom Windowing Overview
Background context explaining the concept. Custom windowing allows users to define their own windowing strategies beyond fixed, sliding, and session windows. This flexibility can be crucial for handling specific business requirements that don't fit into predefined window types.

The objective is to understand how custom windowing works in Beam, which includes defining both initial window assignment and optional merging logic.
:p What is the main purpose of custom windowing in Beam?
??x
Custom windowing allows users to define their own windowing strategies beyond the standard fixed, sliding, and session windows. This flexibility is essential for handling specific business requirements that don't fit into predefined window types.
x??

---
#### Fixed Window Assignment Logic
Background context: The stock fixed-window implementation places each element into an appropriate fixed-window based on its timestamp and the window’s size and offset parameters.

:p What is the process of assigning elements to a fixed window?
??x
The process involves determining which fixed window an element belongs to by comparing its timestamp with the start and end timestamps defined by the window's size and offset. For example, if you have a fixed window with a size of 10 minutes and an offset of 5 minutes, each element is assigned to the window that starts at 5 minutes before its timestamp.
```java
public class FixedWindowAssignment {
    private final Duration windowSize;
    private final Duration offset;

    public Window assign(WindowedValue<?> value) {
        Instant timestamp = value.timestamp();
        // Calculate start and end of the window
        Instant start = timestamp.minus(offset);
        Instant end = start.plus(windowSize);

        return new Window(start, end);
    }
}
```
x??

---
#### Session Windows with Retractions
Background context: Session windows are a type of custom window that merges adjacent time intervals where there is no activity. These windows emit values when they begin and retract them when the session ends or times out.

:p How do session windows handle late data?
??x
Session windows handle late data by emitting retractions for previously emitted windows when new events arrive. This ensures that only the most recent state of the windowed data is retained.
```java
public class SessionWindowHandling {
    public void processLateData(WindowedValue<?> value) {
        // Get the current session window for this element
        Window currentWindow = getCurrentSessionWindow(value.timestamp());

        // Emit retractions for any windows that should be ended due to late data
        emitRetractions(currentWindow);

        // Emit the new state of the window with the late event
        emitNewState(value);
    }

    private void emitRetractions(Window window) {
        // Logic to retracted old session window states
    }

    private void emitNewState(WindowedValue<?> value) {
        // Logic to emit the updated state of the current session window
    }
}
```
x??

---
#### Custom Windowing with Merging
Background context: In Beam, custom windowing can include both initial window assignment and optional merging logic. This allows windows to evolve over time, as seen in session windows.

:p What is the role of merging in custom windowing?
??x
Merging in custom windowing allows windows to combine or evolve over time based on certain conditions. For example, in a session window, adjacent inactive intervals merge into a single active interval.
```java
public class CustomWindowMerging {
    public void mergeWindows(Window currentWindow, Window otherWindow) {
        if (currentWindow.isAdjacentTo(otherWindow)) {
            // Merge the windows if they are adjacent and have no activity in between
            currentWindow.merge(otherWindow);
        }
    }
}
```
x??

---
#### Fixed Windows vs. Custom Windows
Background context: While fixed windows follow a straightforward logic of assigning elements to predefined time intervals, custom windowing allows more flexibility by defining unique assignment and merging rules.

:p How does fixed windowing differ from custom windowing?
??x
Fixed windows place each element into an appropriate fixed-window based on its timestamp and the window’s size and offset parameters. In contrast, custom windowing involves defining both initial window assignment and optional merging logic to handle more complex scenarios that don't fit into predefined window types.
```java
public class CustomWindowExample {
    public Window assign(WindowedValue<?> value) {
        // Custom logic for assigning elements to windows
    }

    public void mergeWindows(Window currentWindow, Window otherWindow) {
        if (currentWindow.isAdjacentTo(otherWindow)) {
            // Merge the windows if they are adjacent and have no activity in between
            currentWindow.merge(otherWindow);
        }
    }
}
```
x??

---
#### Stock Implementation of Fixed Windows in Beam
Background context: The stock fixed-window implementation in Beam is straightforward, focusing on placing elements into appropriate time intervals based on their timestamps.

:p How does the stock fixed window implementation work?
??x
The stock fixed-window implementation assigns each element to a fixed window based on its timestamp and predefined window size and offset parameters. This allows for easy partitioning of data into regular time intervals.
```java
public class FixedWindowAssignment {
    private final Duration windowSize;
    private final Duration offset;

    public Window assign(WindowedValue<?> value) {
        Instant timestamp = value.timestamp();
        // Calculate start and end of the window
        Instant start = timestamp.minus(offset);
        Instant end = start.plus(windowSize);

        return new Window(start, end);
    }
}
```
x??

---


---
#### Aligned Fixed Windows
Background context: In a typical fixed-windows implementation, windows are aligned across all data points. For instance, if you have a team with window intervals from noon to 1 PM and another team also has window intervals from noon to 1 PM, these windows align perfectly. This alignment is beneficial for comparing like windows between different dimensions, such as between teams.

However, this alignment comes with a subtle cost: during the end of each window (e.g., 1 PM), all active windows across multiple keys become complete simultaneously. Consequently, the system faces a massive load of window materialization at regular intervals, which can cause synchronization issues and bursty workloads.

:p What is the issue associated with aligned fixed windows?
??x
The issue is that during the end of each window, all active windows for different keys (e.g., teams) become complete simultaneously. This leads to a synchronized burst of window materialization events in the system.
```java
// Example of how this might be handled internally
public Collection<IntervalWindow> assignWindow(AssignContext c) {
    long start = c.timestamp().getMillis() - c.timestamp()
            .plus(size)
            .minus(offset)
            .getMillis();
    return Arrays.asList(new IntervalWindow(new Instant(start), size));
}
```
x??

---
#### Load Burstiness in Fixed Windows
Background context: The load burstiness mentioned refers to the fact that, in a fixed-windows implementation with multiple keys (like teams), all windows for different keys become complete at the same time. This leads to a sudden influx of window materialization tasks during each window's end, which can overwhelm the system.

This is especially problematic when there are many keys involved, potentially causing significant load spikes every window ends.

:p How does load burstiness affect the system in fixed windows?
??x
Load burstiness affects the system by causing it to handle a large number of window materialization tasks simultaneously at the end of each window. This can lead to performance bottlenecks and resource contention, particularly when dealing with a high number of keys.

For example, if you have 1000 teams, all their windows might become complete at the same time, causing a massive load spike every two minutes.
```java
// Example of how this might be handled internally during watermark processing
public PCollection<KV<Team, Integer>> processWatermark(PCollection<KV<Team, Integer>> input) {
    return input.apply(Window.into(FixedWindows.of(TWO_MINUTES))
            .triggering(AfterWatermark())
            .discardingFiredPanes())
            .apply(Sum.integersPerKey());
}
```
x??

---
#### Window Alignment for Comparison
Background context: Fixed windows are often used to compare data across different dimensions, such as between teams or in time series analysis. The alignment of these windows ensures that the comparison is meaningful and consistent.

For instance, if you have a dataset with multiple teams, each team's window from noon to 1 PM will align perfectly, allowing for easy comparison at this specific interval.

:p Why are aligned fixed windows useful for comparisons?
??x
Aligned fixed windows are useful for comparisons because they ensure that data across different dimensions (e.g., teams) is grouped into the same intervals. This alignment allows you to compare like windows between different keys directly, ensuring consistency in your analysis.
```java
// Example of windowing strategy with aligned fixed windows
public class FixedWindows extends WindowFn<Object, IntervalWindow> {
    private final Duration size;
    private final Duration offset;

    public Collection<IntervalWindow> assignWindow(AssignContext c) {
        long start = c.timestamp().getMillis() - c.timestamp()
                .plus(size)
                .minus(offset)
                .getMillis();
        return Arrays.asList(new IntervalWindow(new Instant(start), size));
    }
}
```
x??

---


#### Unaligned Fixed Windows Implementation
Background context: The system aims to make load more predictable by allowing unaligned fixed windows. This can reduce provisioning requirements for handling peak loads, but it comes at a cost of reduced ability to compare across keys.

Code changes involve modifying the default fixed-windowing strategy to support unaligned windows. The key idea is that while elements with the same key have aligned windows, elements with different keys will typically have unaligned windows.

:p What is the primary change made in the `UnalignedFixedWindows` implementation?
??x
The primary change involves adjusting the window start time based on a hash function of the key and current timestamp. The `assignWindow` method calculates the start of the interval window by incorporating the key's hash value, ensuring that windows for elements with the same key are aligned.

```java
public class UnalignedFixedWindows extends WindowFn<KV<K, V>, IntervalWindow> {
    private final Duration size;
    private final Duration offset;

    public Collection<IntervalWindow> assignWindow(AssignContext c) {
        long perKeyShift = (hash(c.element().key()) % 0);
        long start = perKeyShift + c.timestamp().getMillis()
                     - c.timestamp().plus(size).minus(offset);
        return Arrays.asList(IntervalWindow.of(new Instant(start), size));
    }
}
```
x??

---
#### Pipeline Using Unaligned Fixed Windows
Background context: To implement the new windowing strategy, the pipeline needs to be updated. This involves changing the existing fixed windows configuration to `UnalignedFixedWindows`.

:p How does one switch a pipeline from default fixed windows to unaligned fixed windows?
??x
To switch the pipeline, you would use the `Window.into()` method with the custom `UnalignedFixedWindows` implementation and apply triggers as needed. For example:

```java
PCollection<KV<Team, Integer>> totals = input
    .apply(Window.into(UnalignedFixedWindows.of(TWO_MINUTES)))
    .triggering(AfterWatermark())
    .apply(Sum.integersPerKey());
```

This configuration ensures that windows for elements with the same key are aligned but may be unaligned across different keys. This approach can help in reducing peak resource provisioning requirements.

x??

---
#### Visualization of Unaligned Fixed Windows
Background context: The implementation allows for better load distribution by spreading window completion tasks out, which is beneficial when processing large datasets efficiently. However, this comes at the cost of reduced comparability between windows from different keys.

:p How does using unaligned fixed windows affect the load pattern compared to traditional aligned fixed windows?
??x
Using unaligned fixed windows results in a more even distribution of window completion tasks over time. This is because elements with different keys may have windows that start at different times, reducing the peak load on the system during window processing.

For example:
- With traditional aligned fixed windows: Multiple panes might be emitted simultaneously for different keys.
- With unaligned fixed windows: Panes from different keys arrive more evenly spaced out in time.

This can significantly reduce the need for high provisioning to handle peak loads, making it easier to manage resources efficiently.

x??

---
#### Per-Element/Key Fixed Windows
Background context: This variation on fixed windows is specifically tailored to the data being processed. It's an advanced feature that Cloud Dataflow supports and was initially adopted by early users of the service.

:p What is the key characteristic of per-element/key fixed windows?
??x
The key characteristic of per-element/key fixed windows is that they are designed to be more closely aligned with the specific patterns or characteristics in the data being processed. This means that each element or key can have its own customized windowing strategy, potentially providing a better fit for the underlying data distribution and processing requirements.

This approach allows for fine-grained control over how different elements are grouped and processed within windows, optimizing performance based on the nature of the input data.

x??

---


#### Custom Window Sizes per Customer

Background context: This concept explains how a company generates analytics data for its customers, where each customer can configure their own window size for aggregating metrics. The challenge arises when supporting arbitrary fixed windows versus predefined options.

:p How does the company support different window sizes per customer?
??x
The solution involves modifying the `FixedWindows` implementation to use per-element window sizes based on metadata in each record. By doing this, the pipeline can dynamically assign intervals according to the specific needs of each customer.

The modified code changes how windows are assigned by utilizing the `HasWindowSize` interface and adjusting the timestamp calculation accordingly:

```java
public class PerElementFixedWindows<T extends HasWindowSize> 
    extends WindowFn<T, IntervalWindow> {
    private final Duration offset;

    public Collection<IntervalWindow> assignWindow(AssignContext c) { 
        long perElementSize = c.element().getWindowSize(); 
        long start = perKeyShift + c.timestamp().getMillis() 
            - c.timestamp()
            .plus(perElementSize)
            .minus(offset)
            .getMillis();
        
        return Arrays.asList(new IntervalWindow(
            new Instant(start), perElementSize));
    }
}
```
x??

---

#### Pipeline Code for Custom Window Sizes

Background context: After implementing the custom `PerElementFixedWindows` class, integrating it into the pipeline code is straightforward. The example shows how to apply this windowing strategy and aggregate data accordingly.

:p How does the pipeline code handle custom per-element fixed windows?
??x
The pipeline code uses the new `PerElementFixedWindows` implementation by specifying a duration (like 2 minutes) and applying it with a watermark trigger mechanism. This ensures that elements are processed within their designated window sizes as defined in the metadata.

Example pipeline code:

```java
PCollection<KV<Team, Integer>> totals = input 
    .apply(Window.into(PerElementFixedWindows.of(TWO_MINUTES)))
    .triggering(AfterWatermark())
    .apply(Sum.integersPerKey());
```

In this example:
- `input` is the original PCollection.
- `Window.into(...)` specifies the custom window function.
- `AfterWatermark()` is used as the trigger strategy.
- `Sum.integersPerKey()` aggregates values per key.

This setup allows processing elements with different window sizes based on metadata, making the pipeline flexible to customer-specific requirements.
x??

---

#### Visual Representation of Custom Window Sizes

Background context: The visual representation in Figure 4-10 illustrates how keys (e.g., A and B) have distinct window sizes. Key A uses a two-minute window, while Key B uses a one-minute window.

:p How does the visualization demonstrate custom window sizes?
??x
The figure shows that different elements grouped under various keys are processed within windows of varying durations as dictated by metadata associated with each element. For instance, all elements for Key A fall into 2-minute windows, whereas those for Key B fit into 1-minute windows.

This visual depiction highlights the dynamic nature of window sizes, allowing for flexible analytics tailored to specific customer needs.
x??

---

#### Flexibility in Windowing

Background context: This section emphasizes the importance of custom windowing strategies over fixed options. It explains why built-in APIs often do not cater to such use cases but underscores the value of flexibility they offer.

:p Why is custom windowing powerful for this scenario?
??x
Custom windowing is powerful because it allows each customer to define their own window sizes based on specific requirements, rather than being constrained by predefined options. This flexibility enables more accurate and relevant analytics tailored to individual customer needs without requiring significant changes to the underlying system architecture.

While implementing such custom solutions can be complex, they provide a scalable approach that can handle a wide range of windowing scenarios.
x??

