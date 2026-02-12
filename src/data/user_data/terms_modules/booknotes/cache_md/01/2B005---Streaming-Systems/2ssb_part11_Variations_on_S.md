# High-Quality Flashcards: 2B005---Streaming-Systems_processed (Part 11)


**Starting Chapter:** Variations on Session Windows

---


#### Session Windows and Custom Windowing

Session windowing is a type of windowing that groups elements into sessions based on their timestamps, with each session potentially lasting until there is no activity for a certain period (gap duration). The implementation involves assigning windows to individual elements and then merging overlapping or adjacent windows during the grouping phase.

:p What are the key steps in implementing session windowing?
??x
The key steps in implementing session windowing include:

1. **Assignment**: Each element is initially placed into a proto-session window that begins at its timestamp and extends for the gap duration.
2. **Merging**: During the grouping phase, all eligible windows are sorted, and any overlapping or adjacent windows are merged together.

Here's an abbreviated implementation of session windowing in Java:

```java
public class Sessions extends WindowFn<Object, IntervalWindow> {
    private final Duration gapDuration;

    public Collection<IntervalWindow> assignWindows(AssignContext c) {
        return Arrays.asList(new IntervalWindow(c.timestamp(), gapDuration));
    }

    public void mergeWindows(MergeContext c) throws Exception {
        List<IntervalWindow> sortedWindows = new ArrayList<>();
        for (IntervalWindow window : c.windows()) {
            sortedWindows.add(window);
        }
        Collections.sort(sortedWindows);

        List<MergeCandidate> merges = new ArrayList<>();
        MergeCandidate current = new MergeCandidate();
        for (IntervalWindow window : sortedWindows) {
            if (current.intersects(window)) {
                current.add(window);
            } else {
                merges.add(current);
                current = new MergeCandidate(window);
            }
        }
        merges.add(current);

        for (MergeCandidate merge : merges) {
            merge.apply(c);
        }
    }

    private class IntervalWindow {
        private final Instant start;
        private final Duration duration;

        public IntervalWindow(Instant start, Duration duration) {
            this.start = start;
            this.duration = duration;
        }

        public Instant getStart() { return start; }
        public Instant getEnd() { return start.plus(duration); }
    }

    private class MergeCandidate implements Comparable<MergeCandidate> {
        private final List<IntervalWindow> windows;

        public MergeCandidate(IntervalWindow window) {
            this.windows = new ArrayList<>();
            add(window);
        }

        public void add(IntervalWindow window) {
            // Add logic to merge or keep the window
        }

        public boolean intersects(IntervalWindow other) {
            return !other.getStart().isAfter(this.getEnd()) && !this.getStart().isAfter(other.getEnd());
        }

        public IntervalWindow union() {
            // Return a merged interval window if applicable
            return null;
        }

        @Override
        public int compareTo(MergeCandidate o) {
            return windows.size() - o.windows.size();
        }
    }
}
```

x??

---

#### Bounded Sessions

Bounded sessions are a variant of session windows where the size of each session is limited, either in time or element count. This can be useful for semantic reasons or to prevent spam.

:p How does bounded session windowing differ from regular session windowing?
??x
Bounded session windowing differs from regular session windowing by imposing limits on the total duration and/or number of elements in each session. This is achieved through additional logic that checks if a merged window exceeds these predefined bounds, thus triggering the merging process earlier.

Here's an example implementation of bounded sessions:

```java
public class BoundedSessions extends WindowFn<Object, IntervalWindow> {
    private final Duration gapDuration;
    private final Duration maxSize;

    public Collection<IntervalWindow> assignWindows(AssignContext c) {
        return Arrays.asList(new IntervalWindow(c.timestamp(), gapDuration));
    }

    public static void mergeWindows(WindowFn<?, IntervalWindow>.MergeContext c) throws Exception {
        List<IntervalWindow> sortedWindows = new ArrayList<>();
        for (IntervalWindow window : c.windows()) {
            sortedWindows.add(window);
        }
        Collections.sort(sortedWindows);

        List<MergeCandidate> merges = new ArrayList<>();
        MergeCandidate current = new MergeCandidate();
        for (IntervalWindow window : sortedWindows) {
            MergeCandidate next = new MergeCandidate(window);
            if (current.intersects(window)) {
                current.add(window);
                if (windowSize(current.union()) <= (maxSize - gapDuration)) continue;
                // Current window exceeds bounds, so flush and move to next
                next = new MergeCandidate();
            }
            merges.add(current);
            current = next;
        }
        merges.add(current);

        for (MergeCandidate merge : merges) {
            merge.apply(c);
        }
    }

    private static Duration windowSize(IntervalWindow union) {
        return union == null ? Duration.ZERO : Duration.between(union.start(), union.end());
    }

    private class MergeCandidate implements Comparable<MergeCandidate> {
        private final List<IntervalWindow> windows;

        public MergeCandidate(IntervalWindow window) {
            this.windows = new ArrayList<>();
            add(window);
        }

        public void add(IntervalWindow window) {
            // Add logic to merge or keep the window
        }

        public boolean intersects(IntervalWindow other) {
            return !other.getStart().isAfter(this.getEnd()) && !this.getStart().isAfter(other.getEnd());
        }

        public IntervalWindow union() {
            // Return a merged interval window if applicable
            return null;
        }

        @Override
        public int compareTo(MergeCandidate o) {
            return windows.size() - o.windows.size();
        }
    }
}
```

x??

---

#### Custom Windowing for Bounded Sessions

Custom windowing allows users to implement their own specific logic, tailored to unique use cases. For bounded sessions, this involves adding custom checks and merging conditions.

:p How does customizing windowing help in implementing bounded sessions?
??x
Customizing windowing helps in implementing bounded sessions by allowing the user to define precise limits on session sizes (e.g., time duration or element count). This flexibility is crucial because different use cases may require varying definitions of what constitutes a valid session.

For instance, custom logic can ensure that no single session exceeds a certain size limit. If a session does exceed this limit, it gets split into smaller sessions to meet the bounded criteria.

Here's an example of how you might customize windowing for bounded sessions:

```java
// Custom logic in mergeWindows method
List<IntervalWindow> sortedWindows = new ArrayList<>();
for (IntervalWindow window : c.windows()) {
    sortedWindows.add(window);
}
Collections.sort(sortedWindows);

List<MergeCandidate> merges = new ArrayList<>();
MergeCandidate current = new MergeCandidate();
for (IntervalWindow window : sortedWindows) {
    MergeCandidate next = new MergeCandidate(window);
    if (current.intersects(window)) {
        current.add(window);
        if (windowSize(current.union()) <= (maxSize - gapDuration)) continue;
        // Current window exceeds bounds, so flush and move to next
        next = new MergeCandidate();
    }
    merges.add(current);
    current = next;
}
merges.add(current);

for (MergeCandidate merge : merges) {
    merge.apply(c);
}

private static Duration windowSize(IntervalWindow union) {
    return union == null ? Duration.ZERO : Duration.between(union.start(), union.end());
}
```

x??

---


#### Processing-Time Windows

Background context: In stream processing, windows are used to group data for processing. While event-time windowing is based on when events occur, processing-time windows focus on timestamps at which data arrives or processes.

:p What are processing-time windows and how do they differ from event-time windowing?
??x
Processing-time windows group incoming elements into fixed-size time bins based on the timestamps recorded by the system. Unlike event-time windowing, which waits for all events to occur before processing them, processing-time windows start aggregating data immediately as new elements arrive.

For example:
- A 5-minute processing-time window would aggregate data arriving in a stream every 5 minutes.
- The formula for the watermark is not necessary here since it's based on the system clock rather than event timestamps.

```java
public class ProcessingTimeWindowExample {
    // This method processes elements grouped by their arrival time
    public void processWindowElements(List<Element> elements) {
        // Logic to aggregate or process the elements
    }
}
```
x??

---

#### Session Windows

Background context: Session windows are a type of dynamic window that merges adjacent events based on a session timeout. The system automatically groups elements into sessions, making it easier to handle complex scenarios without custom logic.

:p What is a session window and how does it work?
??x
A session window dynamically merges consecutive events that fall within a specified gap (session timeout) between them. When the gap exceeds the defined threshold, the current session ends, and a new one starts for subsequent events. This approach simplifies event grouping without requiring explicit logic.

For example:
- If the session timeout is 5 minutes, any two events arriving less than 5 minutes apart are considered part of the same session.
```java
public class SessionWindowExample {
    private long sessionTimeout = 5 * 60 * 1000; // 5 minutes in milliseconds

    public void processSessionWindow(List<Element> elements) {
        boolean isNewSession = true;
        for (Element element : elements) {
            if (isNewSession || isWithinGap(element.getTimestamp())) {
                // Process the session
            } else {
                isNewSession = true; // Start a new session
            }
        }
    }

    private boolean isWithinGap(long timestamp) {
        return System.currentTimeMillis() - timestamp < sessionTimeout;
    }
}
```
x??

---

#### Custom Windows

Background context: While many systems offer predefined window types, custom windows allow users to define more complex groupings based on specific requirements. This flexibility is crucial for handling diverse and intricate data processing needs.

:p What are custom windows and why are they important?
??x
Custom windows enable developers to create tailored grouping strategies that fit the unique needs of their applications. These can include unaligned fixed windows, per-element fixed windows, and bounded session windows, among others. Custom windows provide more control over how data is aggregated, making it easier to meet specific business requirements.

For example:
- Unaligned fixed windows ensure a consistent output distribution.
- Per-element fixed windows allow for dynamic window sizes based on element attributes.
```java
public class CustomWindowExample {
    public void applyCustomWindow(String key, List<Element> elements) {
        // Implement custom logic to define and process the window
        int windowSize = determineWindowSize(key);
        for (int i = 0; i < elements.size(); i += windowSize) {
            processWindow(elements.subList(i, Math.min(i + windowSize, elements.size())));
        }
    }

    private int determineWindowSize(String key) {
        // Logic to determine the appropriate window size based on 'key'
        return 10; // Simplified example
    }
}
```
x??

---

#### Unaligned Fixed Windows

Background context: Unaligned fixed windows group data into regular-sized bins, but unlike aligned windows, they don't align with natural boundaries and can provide a more even distribution of output over time.

:p What are unaligned fixed windows?
??x
Unaligned fixed windows divide the stream into equal-sized segments regardless of event timestamps. This approach ensures that each window has a consistent size, which is useful for maintaining a steady rate of processing or when watermark triggers need to be managed carefully.

For example:
- A 1-minute unaligned fixed window would process data in chunks of one minute, even if the first element arrives at a random time.
```java
public class UnalignedFixedWindowExample {
    private int windowSize = 60 * 1000; // 1 minute in milliseconds

    public void applyUnalignedWindow(List<Element> elements) {
        long currentTime = System.currentTimeMillis();
        for (Element element : elements) {
            if ((currentTime - element.getTimestamp()) <= windowSize) {
                processWindow(element);
            }
        }
    }

    private void processWindow(Element element) {
        // Process the element in the current window
    }
}
```
x??

---

#### Per-Element Fixed Windows

Background context: Per-element fixed windows allow for dynamic sizing of fixed windows based on specific attributes of individual elements. This can be useful for handling data with varying characteristics, such as per-user or per-ad-campaign processing.

:p What are per-element fixed windows?
??x
Per-element fixed windows dynamically determine the size of each window based on a specific attribute in the element, providing greater flexibility and customization to the pipeline's semantics according to the use case.

For example:
- A system might process user interactions with different time windows depending on the user ID.
```java
public class PerElementFixedWindowExample {
    public void applyPerElementWindow(List<Element> elements) {
        for (Element element : elements) {
            int windowSize = determineWindowSize(element.getAttribute("userId"));
            // Process 'element' in a window of size 'windowSize'
        }
    }

    private int determineWindowSize(String userId) {
        // Logic to determine the appropriate window size based on 'userId'
        return 10; // Simplified example
    }
}
```
x??

---

#### Bounded Session Windows

Background context: Bounded session windows limit the duration of a session, ensuring that sessions do not grow indefinitely. This is useful for scenarios like spam detection or setting upper bounds on processing latency.

:p What are bounded session windows?
??x
Bounded session windows ensure that each session does not exceed a specified maximum length. This can help manage resource usage and prevent long-running sessions from dominating the pipeline, especially in cases where spam or delayed processing needs to be controlled.

For example:
- A system might limit a user's session to 15 minutes for tracking activities.
```java
public class BoundedSessionWindowExample {
    private int maxSessionDuration = 15 * 60 * 1000; // 15 minutes in milliseconds

    public void applyBoundedSessionWindow(List<Element> elements) {
        long currentTime = System.currentTimeMillis();
        for (Element element : elements) {
            if ((currentTime - element.getTimestamp()) <= maxSessionDuration) {
                processSession(element);
            } else {
                startNewSession(element);
            }
        }
    }

    private void processSession(Element element) {
        // Process 'element' in the current session
    }

    private void startNewSession(Element element) {
        // Start a new session for 'element'
    }
}
```
x??
---


#### Lambda Architecture Limitations

Background context explaining the limitations of the Lambda architecture, especially regarding latency and accuracy. The Lambda architecture is designed for handling large-scale data processing but doesn't inherently provide low-latency correct results.

:p What are some business use cases that require low-latency correct results?
??x
Low-latency use cases often include real-time monitoring systems, financial trading platforms, or any scenario where immediate feedback and decision-making based on the most current data is crucial. The Lambda architecture, while scalable, may not meet these requirements due to its batch-processing nature.

```java
// Example of a simple Lambda function that processes data with high latency
public void processRecord(String record) {
    // Simulated processing with a delay
    try {
        Thread.sleep(1000); // Simulate 1 second of processing time
    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
    }
    System.out.println("Processed record: " + record);
}
```
x??

---

#### Exactly-Once Processing in Beam

Background context on exactly-once processing, which ensures that records are processed exactly once and avoids data loss. This is crucial for reliable data processing.

:p What does the term "exactly-once" mean in the context of Beam and data processing?
??x
Exactly-once processing means that each record is processed exactly one time, ensuring both accuracy (no duplicates) and completeness (no data loss). In Beam, this feature helps users count on accurate results while avoiding risks of data loss.

```java
// Example configuration for a Beam pipeline to ensure at-least-once processing
Pipeline p = Pipeline.create(options);
PCollection<String> lines = p.apply(TextIO.read().from("input.txt"));
lines.apply(ParDo.of(new DoFn<String, String>() {
    @ProcessElement
    public void processElement(@Element String line, OutputReceiver<String> out) throws IOException {
        // Process the element here, ensuring it is processed exactly once.
        out.output(line);
    }
}));
```
x??

---

#### Accuracy vs. Completeness

Background context on how Beam pipelines handle late data and completeness. The accuracy of a pipeline ensures no records are dropped or duplicated, while completeness addresses whether all relevant data is processed.

:p How does Beam handle late arriving data in terms of accuracy?
??x
Beam allows users to configure a latency window during which late data can still be processed accurately. Any data arriving after this window is explicitly dropped, contributing to completeness but not affecting the accuracy of on-time records.

```java
// Example configuration for processing with a 5-minute grace period for late data
Pipeline p = Pipeline.create(options);
PCollection<String> lines = p.apply(TextIO.read().from("input.txt"));
lines.apply(Window.into(FixedWindows.of(Duration.standardMinutes(5))));
```
x??

---

#### Side Effects in Beam

Background context on custom code execution within a Beam pipeline and the challenges of ensuring it runs exactly once. Custom side effects can lead to issues if not managed properly.

:p How does Beam handle custom side effects during record processing?
??x
Beam does not guarantee that custom code is run only once per record, even for streaming or batch pipelines. Users must manage these side effects manually to ensure they do not cause data duplication or loss.

```java
// Example of a DoFn with potential side effects
public class ProcessRecord extends DoFn<String, String> {
    @ProcessElement
    public void processElement(@Element String record) throws IOException {
        // Custom processing that may have side effects
        System.out.println("Processing: " + record);
        // Additional code that might not be idempotent
    }
}
```
x??

---

