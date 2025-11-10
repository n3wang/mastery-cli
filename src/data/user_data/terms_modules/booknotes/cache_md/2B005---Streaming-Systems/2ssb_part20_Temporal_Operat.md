# High-Quality Flashcards: 2B005---Streaming-Systems_processed (Part 20)


**Starting Chapter:** Temporal Operators

---


#### Event-Time vs Processing-Time Timestamps
Event-time timestamps capture the time at which an event occurred, whereas processing-time timestamps are supplied by the system and represent when records arrive. In SQL, these can be represented as additional columns.

:p What is the difference between event-time and processing-time timestamps?
??x
Event-time timestamps indicate the exact moment an event took place, while processing-time timestamps record when a record arrives in the system for processing.
For example:
- EventTime: When a user submits a score (e.g., 12:00:26)
- ProcTime: When the record is ingested into the database (e.g., 12:05:19)

```sql
-- SQL Example of a table with both event-time and processing-time columns
CREATE TABLE Scores (
    Name VARCHAR(255),
    Team VARCHAR(255),
    Score INT,
    EventTime TIMESTAMP,
    ProcTime TIMESTAMP
);
```
x??

---

#### Ordering Data by Event-Time and Processing-Time
Data can be ordered in SQL tables using `ORDER BY` clauses, either by event-time or processing-time. This is useful for understanding the sequence of events versus the order in which data is processed.

:p How can you order a table by event-time and by processing-time in SQL?
??x
In SQL, ordering by event-time and processing-time can be done as follows:

- **Event-Time Order:**
```sql
SELECT * FROM Scores ORDER BY EventTime;
```

- **Processing-Time Order:**
```sql
SELECT * FROM Scores ORDER BY ProcTime;
```

These commands sort the records based on the specified timestamps, allowing you to see how events are sequenced versus when they were processed.
x??

---

#### Temporal Validation Range (TVR) in SQL
Temporal validation range (TVR) is a concept that splits data into ranges based on event-time and processing-time. It helps in understanding the temporal context of each record.

:p What is a Temporal Validation Range (TVR) and how does it work?
??x
A Temporal Validation Range (TVR) splits records based on their event-time, showing the time intervals during which an event could have occurred. For example:

```sql
-- SQL Example to display TVR for Scores table
SELECT [EventTime1, EventTime2), Score, EventTime, ProcTime 
FROM (
    VALUES 
        ('[12:00:00, 12:05:19)', 5, '12:00:26', '12:05:19'),
        ...
) AS T(ScoreRange, Score, EventTime, ProcTime);
```

Each row represents a range of possible event times for the given score. This helps in validating whether an event could have occurred within the specified time frame.
x??

---

#### Unbounded vs Bounded Streams
Streams can be either unbounded (continuously receiving data) or bounded (finite datasets). Unbounded streams are commonly used for real-time processing, whereas bounded streams might represent historical data.

:p What is the difference between a bounded and an unbounded stream in SQL?
??x
- **Unbounded Stream:** Continuously receives new data over time. For example:
```sql
SELECT * FROM UNBOUNDED_STREAM;
```

- **Bounded Stream:** Contains a finite dataset that does not change after its initial load. For example:
```sql
SELECT * FROM BOUNDED_STREAM;
```
The unbounded stream is used for real-time processing, while the bounded stream is typically used for historical data analysis.
x??

---

#### Example of Unbounded Stream with Processing-Time
In SQL, handling an unbounded stream involves continuously updating the dataset as new records arrive. This is useful for applications that require up-to-date information.

:p How would you represent an unbounded stream in SQL with processing-time?
??x
To represent an unbounded stream with processing-time in SQL, you can use a `WINDOW` clause to define the current state of the data:

```sql
SELECT Score, EventTime, ProcTime 
FROM (
    SELECT *, ROW_NUMBER() OVER (ORDER BY ProcTime DESC) as RowNum 
    FROM UNBOUNDED_STREAM
) AS T 
WHERE RowNum = 1;
```

This query keeps track of the latest record based on processing-time and filters it to get the most recent data.
x??

---

#### Example of Bounded Stream with Processing-Time
Bounded streams are typically used for historical data. They have a fixed set of records that do not change over time.

:p How would you represent a bounded stream in SQL with processing-time?
??x
To represent a bounded stream in SQL, you can load the dataset once and treat it as a static dataset:

```sql
SELECT Score, EventTime, ProcTime 
FROM BOUNDED_STREAM;
```

This query simply selects all records from the bounded stream without any additional processing.
x??

--- 

These flashcards cover key concepts related to event-time and processing-time timestamps, ordering data in SQL, temporal validation ranges (TVR), and handling streams in a SQL context. Each card provides background information, relevant code examples, and prompts for understanding each concept deeply.


---
#### Retractions in SQL Pipelines
Retractions are a feature that allows a pipeline to explicitly remove elements that were previously emitted, making it easier to maintain idempotent and exactly-once semantics when writing incremental sessions or updates to storage systems like HBase. In scenarios where session windows evolve over time, retraction is crucial because the new session might replace an older one.

:p What are retractions in SQL pipelines?
??x
Retractions are a feature that allows a pipeline to explicitly remove elements (sessions) that were previously emitted, ensuring idempotent and exactly-once semantics when writing incremental updates or sessions to storage systems like HBase. This is particularly useful when new session windows overlap with old ones, requiring the replacement of previous session data.
x??

---
#### Session Windows Without Retractions
In a Beam pipeline without retractions, aggregation results are accumulated but do not remove older sessions that have been replaced by newer ones. This leads to potential overwrites in storage systems like HBase and complicates maintaining exactly-once semantics.

:p What happens if a session window is aggregated without using retractions?
??x
Without retractions, the Beam pipeline accumulates session windows but does not remove older sessions when they are replaced by new ones. As a result, the output stream will contain overlapping sessions that overwrite previous data in storage systems like HBase, making it difficult to maintain exactly-once semantics.

For example:
```sql
00:00 / 00:00 -------------------------------------------
| Total | Window               | EmitTime |
-------------------------------------------
| 5     | [12:00:26, 12:01:26) | 12:05:19 |
| 7     | [12:02:26, 12:03:26) | 12:05:39 |
| 3     | [12:03:39, 12:04:39) | 12:06:13 |
| 7     | [12:03:39, 12:05:19) | 12:06:46 |
```
x??

---
#### Session Windows With Retractions
When using retractions in a Beam pipeline, the system explicitly notifies about sessions that were added and those that were removed. This approach simplifies maintaining exactly-once semantics by providing clear changes to be applied.

:p How do retractions help in managing session windows?
??x
Retractions help in managing session windows by explicitly notifying the system about which sessions are being added or removed. This means the pipeline can maintain exactly-once semantics more effectively, as it knows precisely what changes need to be made to the storage systems like HBase.

For example:
```sql
00:00 / 00:00 -------------------------------------------
| Total | Window               | EmitTime |
-------------------------------------------
| 5     | [12:00:26, 12:01:26) | 12:05:19 |
| 7     | [12:02:26, 12:03:26) | 12:05:39 |
| 3     | [12:03:39, 12:04:39) | 12:06:13 |
| -7    | [12:03:39, 12:05:19) | 12:06:46 | (retraction)
| 3     | [12:06:39, 12:07:39) | 12:07:19 |
```
x??

---
#### Beam Code for Non-Retracting Pipeline
The provided Beam code shows a session window pipeline that accumulates totals but does not handle retractions. This setup can lead to issues when writing incremental sessions to key/value stores.

:p What is the Beam code snippet showing in Example 8-7?
??x
Example 8-7 shows a Beam code snippet for a session window pipeline that uses per-record triggering and accumulation but does not include any handling for retractions. This setup accumulates totals over time but does not remove old sessions when new ones are added, potentially causing issues with storage systems like HBase.

```java
PCollection<String> raw = IO.read(...);
PCollection<KV<Team, Integer>> input = raw.apply(new ParseFn());
PCollection<KV<Team, Integer>> totals = input
    .apply(Window.into(Sessions.withGapDuration(ONE_MINUTE))
        .triggering(Repeatedly(AfterCount(1)))
        .accumulatingFiredPanes())
    .apply(Sum.integersPerKey());
```
x??

---
#### SQL Output with Retractions
The provided SQL output shows how sessions are managed when retractions are used. Each session is either added or removed, making it clear what changes need to be applied.

:p What does the SQL output in Figure 8-13 show?
??x
Figure 8-13 demonstrates how sessions are managed with retractions enabled. The output shows both additions and removals of sessions explicitly, which helps in maintaining exactly-once semantics when writing incremental updates or sessions to storage systems like HBase.

For example:
```sql
00:00 / 00:00 -------------------------------------------
| Total | Window               | EmitTime |
-------------------------------------------
| 5     | [12:00:26, 12:01:26) | 12:05:19 |
| 7     | [12:02:26, 12:03:26) | 12:05:39 |
| -7    | [12:03:39, 12:05:19) | 12:06:46 | (retraction)
| 3     | [12:06:39, 12:07:39) | 12:07:19 |
```
x??

---


#### Handling Sessions and Retractions without Retractions Enabled

Background context: In scenarios where you need to process streams of incremental sessions, such as handling user activity or session-based data, managing superseded sessions can be complex. Without retractions enabled, each new session must overwrite previous ones through a series of read-modify-write operations, which are costly and non-idempotent.

:p How would processing sessions without enabling retractions work?
??x
Without enabling retractions, handling new sessions involves a significant cost because you need to compare and possibly delete old sessions before adding the new one. This process is not idempotent and can lead to loss of exactly-once semantics.

For example:
```java
// Pseudocode for processing a session without retractions
public void processSession(Session newSession) {
    // Read existing sessions from storage
    List<Session> existingSessions = readExistingSessions();
    
    // Compare each existing session with the new one to identify overlaps
    for (Session existing : existingSessions) {
        if (newSession.overlaps(existing)) {
            // Issue delete commands for obsolete sessions
            deleteSession(existing);
        }
    }

    // Write the new session after all deletions are completed
    writeSession(newSession);
}
```
x??

---

#### Handling Sessions and Retractions with Retractions Enabled

Background context: Enabling retractions simplifies managing superseded sessions by automatically generating retraction rows when a new session replaces an old one. This allows for more efficient updates to the state, ensuring that only the latest sessions are stored.

:p How does enabling retractions simplify the handling of superseded sessions?
??x
Enabling retractions makes it easier to manage superseded sessions because each new session automatically generates retraction rows for any previous sessions it replaces. This means you can simply write new sessions as they arrive and delete old ones using retraction rows.

For example:
```java
// Pseudocode for processing a session with retractions enabled
public void processSession(Session newSession) {
    // Write the new session to storage (redo row)
    writeSession(newSession);

    // Generate and apply retraction rows for any obsolete sessions
    List<Session> existingSessions = readExistingSessions();
    for (Session existing : existingSessions) {
        if (newSession.overlaps(existing)) {
            // Apply a retraction row for the obsolete session
            applyRetraction(existing);
        }
    }
}
```
x??

---

#### Discarding Mode vs. Accumulating and Retracting Mode

Background context: For specific use cases, discarding mode can be valuable as it allows simpler pipelines to partially aggregate high-volume input data and write them into a storage system that supports aggregation. However, outside of these narrow use cases, enabling discarding mode is confusing and error-prone.

:p How does incorporating retractions in SQL help with accumulating and retracting mode?
??x
Incorporating retractions in SQL helps by allowing for both accumulating and retracting modes naturally. Retractions ensure that only the latest sessions are stored, making it easier to manage state updates without complex read-modify-write operations.

For example:
```sql
-- SQL Query Example with Retractions
SELECT 
    SUM(Total) AS Total,
    Window
FROM (
    SELECT 
        5 AS Total,
        '[12:00:26, 12:01:26)' AS Window,
        '12:05:19' AS EmitTime
    UNION ALL
    SELECT 
        7 AS Total,
        '[12:02:26, 12:03:26)' AS Window,
        '12:05:39' AS EmitTime
    -- Additional rows...
) t
GROUP BY Window
```
x??

---

#### Discarding Mode in Specific Use Cases

Background context: Discarding mode can be useful for simple pipelines where high-volume data is aggregated using a single grouping operation, and the results are written to a storage system that supports aggregation. However, outside of these specific use cases, discarding mode is not recommended due to its complexity and error-prone nature.

:p Why might discarding mode be confusing and error-prone in general pipelines?
??x
Discarding mode can be confusing and error-prone because it requires careful management of state updates without retractions. In complex pipelines, ensuring that only the latest state is retained while correctly managing deletions can lead to bugs or incorrect results.

For example:
```java
// Pseudocode for a pipeline with discarding mode
public void processSession(Session newSession) {
    // Write the new session (ignoring any existing sessions)
    writeSession(newSession);

    // No need for retraction rows, but state updates must be carefully managed
}
```
x??

---


---
#### Streaming vs. Nonstreaming Data Processing: Key Difference
Background context explaining that streaming data processing differs from nonstreaming (point-in-time) data processing by adding a temporal dimension to the data's evolution over time. This leads to the concept of Time-Variable Relations (TVRs), which represent how relations change over time.
:p What is the key difference between streaming and nonstreaming data processing?
??x
The key difference lies in the added temporal dimension, where streaming data processes the evolution of a relation as it changes over time. This contrasts with nonstreaming or snapshot-based processing, which captures static points-in-time views of relations.

For example:
- Nonstreaming: A relation R(t) at time t is a fixed point-in-time view.
- Streaming: A TVR (Time-Variable Relation) represents the sequence of snapshots over time.

In SQL and relational algebra, this means that traditional operators like selection, projection, and join can still be applied in a streaming context without losing their closure property. This ensures that all SQL constructs remain functional even when dealing with evolving data.
x??

---
#### Time-Variable Relations (TVRs)
Background context explaining the concept of TVRs as sequences of snapshot relations over time, which capture the evolution of a relation dynamically. This maintains the closure properties of relational algebra and allows for robust stream processing within the same framework.

:p What are Time-Variable Relations (TVRs)?
??x
Time-Variable Relations (TVRs) represent how a relation changes over time as a sequence of snapshots at different points in time. They maintain the integrity of relational operations by ensuring that all standard SQL constructs and operators can be applied consistently, thus preserving the closure property.

For example:
```java
// Pseudocode for creating a TVR from a stream of data
TVR myRelation = Stream.of(data).collect(TVR::new);
```
x??

---
#### Beam Model vs. Classic SQL Model: Biases
Background context explaining that both the Beam model and classic SQL model have inherent biases, with Beam being stream-oriented and SQL being table-oriented. This distinction affects how data is processed and managed within each framework.

:p What are the key differences between the Beam model and the classic SQL model?
??x
The Beam model focuses on a stream-oriented approach, meaning it processes data in a continuous, event-driven manner. In contrast, the classic SQL model is table-oriented, handling data in discrete, snapshot-based views.

This difference impacts processing:
- Beam: Suitable for real-time analytics where data flows continuously.
- SQL: Best suited for batch processing and historical data analysis with static snapshots.

For example:
```java
// Pseudocode to illustrate stream vs. table processing
BeamPipeline pipeline = Pipeline.create();
pipeline.apply("ReadFromStream", Read.from(...))
       .apply("ProcessAsStream", ProcessAsStream())
       .apply("WriteToTable", Write.into(...));

SqlQuery query = "SELECT * FROM database WHERE timestamp > '2023-10-01'"; // Table-oriented
```
x??

---
#### Language Extensions for Stream Processing in SQL
Background context explaining the necessity of adding language extensions to support robust stream processing within SQL. This includes keywords like `TABLE`, `STREAM`, and `TVR` for specifying the type of data rendering.

:p What are the hypothetical language extensions needed for robust stream processing in SQL?
??x
The necessary language extensions include:
- **Table (`TABLE`)**: Specifies that a relation should be processed as a static, snapshot view.
- **Stream (`STREAM`)**: Indicates that a relation is to be processed in real-time with temporal considerations.
- **TVR (`Time-Variable Relation`)**: Represents the evolution of relations over time and allows for dynamic query execution.

For example:
```sql
SELECT * FROM customers TABLE; -- Table-oriented query
SELECT * FROM sales STREAM WHERE timestamp > '2023-10-01'; -- Stream-oriented query with a filter
```
x??

---
#### Windowing in SQL
Background context explaining the value of windowing operators for expressing complex, dynamic groupings like sessions. While some simple windows can be declared declaratively using existing SQL constructs, explicit windowing operators encapsulate the necessary computations and improve query expressiveness.

:p What are windowing operators in SQL?
??x
Windowing operators allow you to define and apply data windows over a set of rows in a table or stream. These operators help in performing complex aggregations and operations on subsets of data that change dynamically over time, such as session-based analysis.

For example:
```sql
-- Using an existing window function like ROW_NUMBER() OVER (PARTITION BY ...)
SELECT customer_id, timestamp, amount,
       ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY timestamp) as row_num
FROM transactions;

-- Explicit windowing operator for sessions
SELECT * FROM sales WINDOW session AS (
    SELECT customer_id, SUM(amount)
    FROM sales
    GROUP BY customer_id, session_start(timestamp, 1 HOUR)
);
```
x??

---
#### Watermarks in Stream Processing Systems
Background context explaining watermarks as a system-level feature used to manage the completeness of data and generate streams with authoritative versions. This is particularly useful for use cases where direct stream consumption is necessary.

:p What are watermarks in stream processing systems?
??x
Watermarks are used to track the progress of data in streaming applications, ensuring that all data up to a certain point is considered complete before it's processed further. They help manage the completeness of input data and generate authoritative versions of rows only after the system believes the input for those rows is fully available.

For example:
```java
// Pseudocode for watermark handling in a stream processing system
WatermarkManager manager = new WatermarkManager();
Stream<Row> output = input.apply("AssignTimestampsAndWatersmarks", new AssignerWithPeriodicWatermarks<>(
    new CustomAssigner(), new TimeSerializable(5000)));
```
x??


#### Watermark Triggers
Watermark triggers are used to yield a single output per window when the inputs to that window are believed to be complete. This is particularly useful for handling late-arriving data where the system needs to assert with confidence that no more updates will come.
:p What does a watermark trigger do in stream processing?
??x
A watermark trigger processes a window of data and generates one output per window when it believes all relevant data has arrived. It helps manage late events by asserting that no further updates are expected for the current window, allowing the system to finalize its state before moving on.
```sql
-- Example SQL using watermark triggers
SELECT * FROM stream_data WINDOW TUMBLING (SIZE 1 HOUR) WATERSHED BY event_timestamp;
```
x??

---

#### Repeated Delay Triggers
Repeated delay triggers are used for providing periodic updates. This type of trigger is useful when the application needs to receive regular, continuous data streams rather than single-shot or event-based outputs.
:p What does a repeated delay trigger do in stream processing?
??x
A repeated delay trigger generates output periodically, even if no new input events have arrived since the last output. It is ideal for scenarios where continuous monitoring and updates are required, such as real-time analytics or periodic data aggregation.
```java
// Pseudocode example of a repeated delay trigger implementation
public class RepeatedDelayTrigger {
    private long delayTime;
    
    public void onEvent(Event event) {
        // Process the event
        process(event);
        
        // Schedule next output after a delay
        scheduleNextOutput();
    }
    
    private void scheduleNextOutput() {
        // Schedule next output in delay time
        Timer.schedule(this, delayTime);
    }
}
```
x??

---

#### System Columns for Time-Varying Relations
System columns provide metadata that are useful when consuming time-varying relations (TVRs) as streams. These system columns include processing time, emit timing, emit index, and undo status.
:p What are some important system columns used in stream processing?
??x
Important system columns used in stream processing include:
- `Sys.MTime`: The processing time at which a row was last modified.
- `Sys.EmitTiming`: The timing of the row emit relative to the watermark (early, on-time, late).
- `Sys.EmitIndex`: The zero-based index of the emit version for this row.
- `Sys.Undo`: Indicates whether the row is a normal row or a retraction.

These columns help in managing data flow and handling retractions effectively.
```sql
-- Example SQL query with system columns
SELECT Sys.MTime, Sys.EmitTiming, Sys.EmitIndex, Sys.Undo FROM stream_data;
```
x??

---

#### Valid Relation Concept
A valid relation for an SQL query is one where the attributes used in the query exist within the relation. If a relation does not contain the required attribute, it is considered invalid and will result in a query execution error.
:p What defines a "valid relation" in SQL queries?
??x
A valid relation in SQL queries must contain all attributes referenced by the query. For example, for the query `SELECT x FROM y`, the relation `y` must have an attribute named `x`. If it does not, the query is invalid and will yield a query execution error.
```java
// Example code to check if a relation is valid
public boolean isValidRelation(Map<String, List<Object>> attributes) {
    String attributeNeeded = "x"; // Example attribute from SELECT statement
    return attributes.containsKey(attributeNeeded);
}
```
x??

---

#### Default Triggers in Stream Processing
If unspecified, the default trigger in stream processing is per-record triggering. This provides straightforward and natural semantics matching those of materialized views. Other useful triggers include watermark triggers for complete window outputs and repeated delay triggers for periodic updates.
:p What are the different types of triggers used in stream processing?
??x
Triggers in stream processing can be categorized as follows:
1. **Per-Record Triggering**: The default type, providing straightforward semantics similar to materialized views.
2. **Watermark Triggers**: Yield a single output per window when the inputs to that window are believed to be complete.
3. **Repeated Delay Triggers**: Provide periodic updates rather than event-based outputs.

These triggers help in managing data flow and ensuring correct processing of streams.
```sql
-- Example SQL with different types of triggers
SELECT * FROM stream_data PER_RECORD;
SELECT * FROM stream_data WINDOW TUMBLING (SIZE 1 HOUR) WATERSHED BY event_timestamp;
SELECT * FROM stream_data REPEAT_DELAY(INTERVAL 5 SECONDS);
```
x??

---


---
#### Streaming Joins Overview
Background context explaining that joins are grouping operations, and understanding them through a streaming perspective simplifies their complexity. Key points include:
- All joins can be considered as streaming joins.
- Tools for reasoning about time (windowing, watermarks, triggers) apply to streaming joins.

:p What is the primary concept introduced in this section?
??x
The primary concept introduced in this section is that all types of joins can be treated as streaming joins. This simplifies understanding by leveraging existing knowledge of grouping operations and applying it to streaming data.
x??

---
#### Joins as Grouping Operations
Explanation that joins are a specific type of grouping operation where data sharing some property (key) are collected into related groups.

:p How do joins differ from other grouping operations?
??x
Joins specifically group together data elements based on shared keys, creating related sets of data. This is distinct from simple grouping operations which may not necessarily rely on key matching.
x??

---
#### Streaming Grouping Operations
Explanation that streaming grouping operations consume streams and yield tables.

:p What happens during a streaming grouping operation?
??x
During a streaming grouping operation, the system processes incoming records in a stream and groups them based on shared keys. The result is a table where grouped data elements are presented.
x??

---
#### Applying Join Concepts to Streaming Data
Explanation that adding time dimensions complicates joins but can be managed using familiar tools like windowing and triggers.

:p How do streaming systems handle the complexity of join operations?
??x
Streaming systems handle join complexities by applying familiar techniques such as windowing, watermarks, and triggers. These tools allow for efficient processing of incoming data streams, making the concept of streaming joins more manageable.
x??

---
#### Example Datasets for Joins
Explanation that the datasets `Left` and `Right` are used to demonstrate various types of joins.

:p What datasets are introduced in this section?
??x
The datasets `Left` and `Right` are introduced. Each contains columns `Num`, `Id`, and `Time`. These datasets will be used throughout the text to illustrate different join operations.
x??

---
#### Key Columns in Datasets
Explanation of the key columns: `Num`, `Id`, and `Time`.

:p What are the column names and their purposes?
??x
The dataset columns include:
- `Num`: A single number identifier.
- `Id`: A unique identifier for each record, combining the table name prefix (`L` or `R`) with the `Num`.
- `Time`: The arrival time of the record in the system.

These columns are used to uniquely identify records and track their timing within the stream.
x??

---
#### Uniqueness of Join Keys
Explanation that initial datasets will have strictly unique join keys, introducing more complex cases later.

:p What is noted about the uniqueness of join keys initially?
??x
It is noted that the initial datasets will have strictly unique join keys. This simplifies the initial explanation but acknowledges that more complicated scenarios with duplicate keys will be introduced later.
x??

---

