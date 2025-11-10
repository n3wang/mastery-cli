# High-Quality Flashcards: Designing-data-intensive-applications_-the-big-ideas-behind-reliable-scalable_processed (Part 38)


**Starting Chapter:** Stream Joins

---


---
#### Tumbling Window
Background context explaining the concept. A tumbling window has a fixed length and every event belongs to exactly one window. For example, if you have a 1-minute tumbling window, all events with timestamps between 10:03:00 and 10:03:59 are grouped into one window, events between 10:04:00 and 10:04:59 into the next window, and so on. You could implement a 1-minute tumbling window by taking each event timestamp and rounding it down to the nearest minute to determine the window that it belongs to.

:p How is an event assigned to a tumbling window?
??x
An event is assigned to a tumbling window based on its timestamp, where events are grouped into fixed-length intervals. To implement this, you would round down each event's timestamp to the nearest boundary of the specified interval (e.g., minutes).

```java
public int getTumblingWindowIndex(long timestamp) {
    // Round down the timestamp to the nearest minute
    long roundedTimestamp = Math.floorDiv(timestamp, 60_000);
    return (int) roundedTimestamp;
}
```
x??

---


#### Hopping Window
Background context explaining the concept. A hopping window also has a fixed length but allows windows to overlap in order to provide some smoothing. For example, a 5-minute window with a hop size of 1 minute would contain events between 10:03:00 and 10:07:59, then the next window would cover events between 10:04:00 and 10:08:59, and so on. You can implement this hopping window by first calculating 1-minute tumbling windows, and then aggregating over several adjacent windows.

:p How does a hopping window differ from a tumbling window?
??x
A hopping window differs from a tumbling window in that it allows overlapping windows, which helps to smooth the aggregation results. Events are aggregated over multiple adjacent intervals, providing more continuous data points compared to non-overlapping tumbling windows.

```java
public List<WindowEvent> getHoppingWindows(List<Event> events, int windowSize, int hopSize) {
    List<WindowEvent> result = new ArrayList<>();
    for (int i = 0; i < events.size(); i += hopSize) {
        WindowEvent window = new WindowEvent();
        // Collect events from the current index to the next index
        while (i < events.size() && !events.get(i).isExpired(windowSize)) {
            window.addEvent(events.get(i));
            i++;
        }
        result.add(window);
    }
    return result;
}
```
x??

---


#### Sliding Window
Background context explaining the concept. A sliding window contains all the events that occur within some interval of each other. For example, a 5-minute sliding window would cover events at 10:03:39 and 10:08:12, because they are less than 5 minutes apart (note that tumbling and hopping 5-minute windows would not have put these two events in the same window, as they use fixed boundaries). A sliding window can be implemented by keeping a buffer of events sorted by time and removing old events when they expire from the window.

:p How does a sliding window differ from a tumbling or hopping window?
??x
A sliding window differs from a tumbling or hopping window because it does not have fixed boundaries. Instead, it groups events based on their relative timing to each other within a specified interval. Events are continuously added and removed as new events come in, maintaining the current state of events that fall within the window's duration.

```java
public List<Event> getSlidingWindowEvents(List<Event> events, int windowSize) {
    PriorityQueue<Event> buffer = new PriorityQueue<>(Comparator.comparingLong(Event::getTimestamp));
    
    // Add initial events to the buffer
    for (Event event : events) {
        if (!event.isExpired(windowSize)) {
            buffer.add(event);
        }
    }
    
    return new ArrayList<>(buffer); // Return all non-expired events in the current window
}
```
x??

---


#### Session Window
Background context explaining the concept. Unlike other windows, a session window has no fixed duration and is defined by grouping together all events for the same user that occur closely together in time, with the window ending when the user has been inactive for some time (e.g., if there have been no events for 30 minutes). Sessionization is common in website analytics.

:p How does a session window differ from other types of windows?
??x
A session window differs from other types of windows because it groups events based on user activity over variable intervals. The duration of the window varies depending on when users become inactive, typically ending after a period of inactivity (e.g., 30 minutes). This is useful for analyzing sequences of user interactions.

```java
public Session getSession(List<Event> events) {
    Map<Long, List<Event>> sessions = new HashMap<>();
    
    for (Event event : events) {
        if (!sessions.containsKey(event.getUserId())) {
            // Start a new session
            sessions.put(event.getUserId(), new ArrayList<>());
        }
        
        sessions.get(event.getUserId()).add(event);
    }
    
    // End inactive sessions after inactivity period
    long inactivityPeriod = 30 * 60_000; // 30 minutes in milliseconds
    List<Event> currentTimeEvents = events.stream().filter(e -> System.currentTimeMillis() - e.getTimestamp() <= inactivityPeriod).collect(Collectors.toList());
    
    for (Event event : currentTimeEvents) {
        if (!sessions.containsKey(event.getUserId())) {
            sessions.put(event.getUserId(), new ArrayList<>());
        }
        
        sessions.get(event.getUserId()).add(event);
    }
    
    return new Session(sessions); // Return the session data structure
}
```
x??

---


#### Stream-Stream Join (Window Join)
Background context explaining the concept. In stream processing, joins on streams are more challenging than in batch jobs because events can appear at any time. To join two streams of events, you need to find matching events based on a common key or condition, such as session IDs.

:p How is a stream-stream join implemented?
??x
A stream-stream join (window join) involves finding pairs of events from two streams that match based on a shared key, like session IDs. You can implement this by maintaining a buffer for one stream and checking it against the other stream's current state to find matching events.

```java
public List<JoinedEvent> performStreamStreamJoin(Stream<Event> stream1, Stream<Event> stream2) {
    Map<Long, Event> sessionEvents = new HashMap<>(); // Buffer for stream 1 events
    
    return stream2.filter(event -> {
        long sessionId = event.getSessionId();
        
        if (sessionEvents.containsKey(sessionId)) {
            // Join with existing events from buffer
            List<Event> matchingEvents = sessionEvents.get(sessionId);
            joined.add(new JoinedEvent(matchingEvents, Arrays.asList(event)));
            
            // Update the buffer for future joins
            if (!matchingEvents.contains(event)) {
                matchingEvents.add(event);
            }
        } else {
            // Add event to buffer
            sessionEvents.put(sessionId, new ArrayList<>(Arrays.asList(event)));
        }
        
        return true; // Continue processing
    }).collect(Collectors.toList());
}
```
x??

---

---


#### Click-Search Join for Ad Systems
Clicks and searches are highly variable events where a user might abandon their search or revisit it later. To measure accurate click-through rates, both search and click events need to be analyzed together. A stream processor needs to maintain state by indexing recent events (e.g., last hour) using session IDs.
:p How does a stream processor handle the click-search join for ad systems?
??x
A stream processor manages this by maintaining an index of all relevant events within a certain window, typically based on time or session ID. For instance, it could maintain a state where it indexes search and click events in the last hour to ensure timely joins.
```java
public class StreamProcessor {
    Map<String, List<Event>> sessionEvents = new HashMap<>(); // Stores recent events by session ID

    public void processEvent(Event event) {
        String sessionId = getSessionId(event);
        
        if (event instanceof SearchEvent) {
            addToSession(sessionId, event);
        } else if (event instanceof ClickEvent) {
            handleClick(sessionId, event);
        }
    }

    private void addToSession(String sessionId, Event event) {
        sessionEvents.computeIfAbsent(sessionId, k -> new ArrayList<>()).add(event);
    }

    private void handleClick(String sessionId, ClickEvent clickEvent) {
        List<Event> recentSearches = sessionEvents.get(sessionId);
        
        for (Event searchEvent : recentSearches) {
            if (canJoin(searchEvent, clickEvent)) { // Logic to determine join condition
                emitJoinedEvent(searchEvent, clickEvent);
            }
        }

        removeExpiredSession(sessionId); // Remove sessions that have expired
    }

    private boolean canJoin(Event searchEvent, ClickEvent clickEvent) {
        return isWithinWindow(searchEvent, clickEvent);
    }

    private void emitJoinedEvent(Event searchEvent, ClickEvent clickEvent) {
        // Logic to emit the joined event
    }

    private void removeExpiredSession(String sessionId) {
        // Remove expired sessions from state management
    }
}
```
x??

---


#### Stream-Table Join for Enrichment
A stream-table join enriches a stream of events with information from a database. The goal is to augment each activity event in the stream with additional user profile data.
:p How does a stream processor perform a stream-table join for enriching user activity events?
??x
The stream processor processes each activity event, looks up the corresponding user ID in the database, and then adds relevant user profile information to the event. This process can be optimized by keeping a local copy of the database in memory or on disk.
```java
public class StreamEnricher {
    Map<String, UserProfile> userIdToProfileMap = new HashMap<>(); // Local cache for profiles

    public void enrichEvent(ActivityEvent event) {
        String userId = event.getUserId();
        
        if (userIdToProfileMap.containsKey(userId)) {
            UserProfile profile = userIdToProfileMap.get(userId);
            event.enrichWithProfile(profile); // Augment the activity event with user profile
        } else {
            fetchAndCacheProfile(event, userId);
        }
    }

    private void fetchAndCacheProfile(ActivityEvent event, String userId) {
        // Logic to query the database and cache the result in userIdToProfileMap
    }
}
```
x??

---


#### Batch Job vs. Continuous Stream Processing
Batch jobs typically process data offline or with periodic intervals, while stream processors handle continuous data streams in real-time.
:p How does a batch job differ from a continuous stream processor?
??x
A batch job processes large datasets at regular intervals without immediate feedback, whereas a stream processor handles and processes events as they arrive continuously. A stream processor can provide real-time insights, but it requires efficient state management to handle the incoming data flow.
```java
public class BatchJob {
    List<ActivityEvent> activityEvents = readFromFile(); // Read data from file

    public void process() {
        for (ActivityEvent event : activityEvents) {
            enrichEvent(event);
            saveProcessedDataToFile(event); // Save processed events to file
        }
    }

    private void enrichEvent(ActivityEvent event) {
        UserProfile profile = fetchUserProfileFromDatabase(event.getUserId());
        event.enrichWithProfile(profile);
    }

    private UserProfile fetchUserProfileFromDatabase(String userId) {
        // Logic to fetch user profile from the database
    }
}
```
x??

---

---


---
#### Stream Processor vs Batch Job
Stream processors and batch jobs process data differently. A batch job uses a snapshot of the database at a specific point in time, whereas a stream processor processes continuously changing data in real-time.

:p What is the main difference between a batch job and a stream processor?
??x
A batch job processes data using a point-in-time snapshot of the database, while a stream processor processes continuously changing data in real-time.
x??

---


#### Change Data Capture (CDC)
To keep up with changes in the database over time, change data capture (CDC) is used. CDC allows a stream processor to subscribe to a changelog of user profile updates and activity events.

:p How can a stream processor keep its local copy of the database updated using CDC?
??x
A stream processor uses change data capture (CDC) to subscribe to a changelog of the user profile database and the stream of activity events. When profiles are created or modified, the stream processor updates its local copy.
x??

---


#### Stream-Table Join
In a stream-table join, a stream is joined with a materialized view of a table. This join can be conceptualized as having an infinitely long window for one input (the changelog stream) and no window at all for the other input (the activity stream).

:p What does a stream-table join involve?
??x
A stream-table join involves joining a changelog stream with a materialized view of a table. The changelog stream is joined using an infinitely long window, while the other input might not maintain any window.
x??

---


#### Twitter Timeline Example
The timeline for a user in Twitter is created by maintaining a cache of tweets based on follow relationships and tweet events.

:p How does the system maintain the Twitter timeline?
??x
To maintain the Twitter timeline, the system needs to process streams of events for tweets (sending and deleting) and for follow relationships (following and unfollowing). When a new tweet is sent or a user follows/unfollows another user, the system updates the timelines accordingly.
x??

---


#### Slowly Changing Dimensions (SCD)
Background context: In data warehousing, slowly changing dimensions occur when data changes over time but still needs to be tracked accurately. For example, tax rates change and need to be applied correctly for historical sales records.
:p How can SCDs be managed in a database?
??x
SCDs are typically managed by using unique identifiers for each version of the joined record. Every time a tax rate changes, it gets a new identifier, and invoices include this identifier corresponding to the tax rate at the time of sale. This ensures that all versions of records must be retained.
x??

---


#### Fault Tolerance in Stream Processing
Background context: Unlike batch processing, stream processing deals with infinite data streams, making fault tolerance more complex. Retrying tasks and ensuring exactly-once semantics is crucial but challenging due to ongoing input.
:p What approach can be used for fault tolerance in stream processing?
??x
Microbatching and checkpointing are techniques used in stream processing frameworks like Spark Streaming and Apache Flink. Microbatching breaks the stream into small blocks, treating each as a mini-batch process, while periodic rolling checkpoints allow recovery from failures by restarting from the last successful checkpoint.
x??

---


#### Exactly-Once Semantics
Background context: Ensuring exactly-once semantics in stream processing means that every record is processed exactly once, even if tasks fail and are retried. This avoids duplicate processing and ensures consistency.
:p How do microbatching and checkpointing provide exactly-once semantics?
??x
Microbatching and checkpointing allow for exactly-once semantics within the confines of the stream processor. By breaking streams into small blocks (microbatches) and writing periodic checkpoints, the framework can recover from failures by restarting from the last successful checkpoint without duplicate processing.
However, once output leaves the stream processor, ensuring exactly-once becomes challenging due to external side effects like database writes or message broker interactions.
x??

---


#### Idempotence in Stream Processing
Background context: Ensuring idempotent operations can help achieve exactly-once semantics. An operation is idempotent if performing it multiple times has the same effect as doing it once.
:p How does relying on idempotence help in stream processing?
??x
Relying on idempotent operations can prevent partial output from being applied twice when tasks fail and are retried. For example, including metadata like message offsets or timestamps can ensure that updates are only applied once, even if they're processed multiple times.
```java
// Example of making an operation idempotent in Java
public class IdempotentUpdater {
    private Map<Long, Boolean> processedMessages = new HashMap<>();
    
    public void updateValue(long offset, String value) {
        if (!processedMessages.containsKey(offset)) {
            // Perform the update only once per message offset
            processedMessages.put(offset, true);
            // Apply the value to a database or other system
            applyValueToSystem(value);
        }
    }
}
```
x??

---


#### State Recovery in Stream Processing
Background context: Maintaining and recovering state is crucial for operations like windowed aggregations and joins. Ensuring that state can be reconstructed after failures is key to achieving consistency.
:p How can state recovery be ensured after a failure?
??x
State recovery can be ensured by keeping the state in remote data stores and replicating it. This allows state to be reloaded from a durable storage medium, ensuring consistent operation even after failures. However, querying remote databases for each message can introduce performance overhead.
```java
// Pseudocode for state recovery using a remote store
public class StateRecoveryManager {
    private Datastore datastore;
    
    public void recoverState() {
        // Load the latest state from the datastore
        Map<String, String> recoveredState = datastore.loadLatestState();
        
        // Apply recovered state to processing logic
        applyState(recoveredState);
    }
}
```
x??

---


#### Stream-table join (stream enrichment)
Stream-table join is a technique where data from a stream is enriched by joining it with data stored in a table. This can be particularly useful when processing real-time or event-driven data, as it allows for dynamic and flexible data augmentation.

:p What is the purpose of using "stream-table join" in stream processing?
??x
The purpose of using "stream-table join" (or stream enrichment) is to enrich incoming streaming data with static or semi-static information from a table. This can enhance real-time analytics, enable complex event processing, and provide more context-rich events for decision-making processes.

For example, if you are processing transaction streams in financial applications, joining these transactions with customer profiles stored in a database would allow you to personalize the transaction messages with user-specific details.
??x

---


#### Local State Replication
Replicating state locally within stream processors can prevent data loss during recovery from failures. This approach ensures that when a task fails and is reassigned, it can resume processing where it left off without missing any events.

:p How does local state replication help in recovering from failures?
??x
Local state replication helps by keeping the state of operations local to each stream processor instance. When a failure occurs and the task is reassigned to a new instance, that new task can read the replicated state to resume processing. This prevents data loss because the state can be restored without needing external storage or coordination.

For example, in Apache Flink, operators maintain their states locally and periodically capture snapshots of these states, which are then stored durably. During recovery, the new task reads from the latest snapshot.
??x

---


#### Periodic State Snapshots
Periodic state snapshots involve capturing a consistent view of the operator's state at regular intervals and storing it in durable storage.

:p What is periodic state snapshotting used for?
??x
Periodic state snapshotting is used to ensure that during recovery from failures, the stream processor can resume processing from the latest known consistent state. This approach helps maintain data integrity by reducing the risk of partial or duplicate processing.

For instance, Apache Flink periodically takes snapshots of operator states and writes them to a durable storage like HDFS.
??x

---


#### Log Compaction
Log compaction is a mechanism where older log entries are discarded if newer ones with the same key overwrite them. This helps in managing large volumes of log data efficiently.

:p How does log compaction work?
??x
Log compaction works by retaining only the latest log entry for each unique key, effectively compacting the log data. When old log entries can be safely discarded because they have been superseded by newer ones, storage space is conserved, and processing overhead is reduced.

For example, in Kafka Streams, state changes are logged to a dedicated topic with log compaction enabled. This ensures that only the latest updates are retained.
??x

---


#### Message Brokers Comparison
Message brokers like AMQP/JMS-style message brokers and log-based message brokers serve different purposes and have distinct characteristics regarding how messages are handled.

:p What is an example use case for an AMQP/JMS-style message broker?
??x
An example use case for an AMQP/JMS-style message broker includes task queues where the exact order of message processing is not crucial, and there's no need to revisit processed messages. This type of broker assigns each message individually to a consumer, which acknowledges the message upon successful processing. Once acknowledged, the message is deleted from the queue.

```java
// Pseudocode for AMQP/JMS-style message broker interaction
public class TaskQueue {
    public void sendMessage(String message) {
        // Send the message to a specific consumer
    }

    public boolean acknowledgeMessage(String messageId) {
        // Acknowledge the receipt and processing of the message by the consumer
        return true;  // Return true if acknowledged successfully
    }
}
```
??x

---


#### Log-based Message Broker with Checkpointing
Log-based message brokers retain messages on disk, allowing for replay or checking progress through offsets. This is useful in scenarios where historical data needs to be accessed.

:p How does a log-based message broker ensure parallel processing?
??x
A log-based message broker ensures parallel processing by partitioning the stream of messages across multiple consumer nodes. Each consumer tracks its progress by checkpointing the offset of the last message it has processed. This allows for fault tolerance and scalability, as consumers can resume from their last known position without needing to start over.

For example, in Kafka Streams:
```java
// Pseudocode for a log-based message broker with checkpointing
public class LogBasedMessageBroker {
    public void assignPartitionToConsumer(String partition) {
        // Assign the given partition to the consumer
    }

    public boolean checkpointOffset(long offset) {
        // Checkpoint the current processing position of the consumer
        return true;  // Return true if checkpoint successful
    }
}
```
??x

---

---


#### Log-Based Approach Overview
Log-based approaches are similar to database replication logs and log-structured storage engines. They are particularly useful for stream processing systems that consume input streams and generate derived state or output streams. Streams can originate from various sources such as user activity events, periodic sensor readings, data feeds (e.g., financial market data), and even database changes.
:p What is the key similarity between the log-based approach and other storage methods?
??x
The log-based approach shares similarities with replication logs in databases and log-structured storage engines. It is especially useful for stream processing systems that need to derive state or output streams from input events.
x??

---


#### Representing Databases as Streams
Representing databases as streams allows for keeping derived data systems continually up-to-date by consuming the changelog of database changes. This can involve implicit change data capture or explicit event sourcing.
:p How does representing a database as a stream benefit derived data systems?
??x
Representing a database as a stream helps keep derived data systems (like search indexes, caches, and analytics) continuously updated. By consuming the changelog that captures all database changes, these derived systems can be kept in sync with the latest state of the data.
x??

---


#### Stream Processing Techniques
Stream processing involves several techniques such as complex event processing, windowed aggregations, and materialized views. These techniques help in searching for patterns, computing aggregations over time windows, and maintaining up-to-date views on derived data.
:p List three purposes of stream processing mentioned in the text.
??x
The three purposes of stream processing mentioned are:
1. Searching for event patterns (complex event processing)
2. Computing windowed aggregations (stream analytics)
3. Keeping derived data systems up to date (materialized views)
x??

---


#### Time Reasoning in Stream Processors
Stream processors must handle time reasoning, distinguishing between processing time and event timestamps. They also need to deal with straggler events that arrive after the window of interest is considered complete.
:p What are the two types of times that stream processors must distinguish?
??x
Stream processors must distinguish between:
1. Processing time: The time at which a message is processed by the system.
2. Event timestamps: The actual timestamp associated with the event, as recorded in the input data.
x??

---


#### Stream Joins
Stream joins can be categorized into three types based on their inputs: stream-stream joins (with self-joins), stream-table joins, and table-table joins. Each type involves different strategies for joining streams or tables to produce derived outputs.
:p Name the three types of joins mentioned in the text.
??x
The three types of joins mentioned are:
1. Stream-stream joins
2. Stream-table joins
3. Table-table joins
x??

---


#### Fault Tolerance and Exactly-Once Semantics
Techniques for achieving fault tolerance and exactly-once semantics involve methods to ensure that messages are processed reliably, even in the presence of failures or retries.
:p What is the goal of ensuring exactly-once semantics in stream processing?
??x
The goal of ensuring exactly-once semantics in stream processing is to guarantee that each message is processed exactly once, preventing duplicates and ensuring data integrity despite potential failures or retries.
x??

---

---

