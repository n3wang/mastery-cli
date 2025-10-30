# High-Quality Flashcards: 2B005---Streaming-Systems_processed (Part 13)

**Rating threshold:** >= 8/10

**Starting Chapter:** Other Systems

---

**Rating: 8/10**

#### Duplicate Inserts Handling in BigQuery Sink
Background context: When using a BigQuery sink in Dataflow, it is crucial to handle duplicate inserts effectively. To ensure that only unique records are inserted into BigQuery, a unique identifier (ID) must be generated for each record before attempting an insert operation. This process involves two steps: generating statistically unique IDs and ensuring these IDs remain stable across retries.

:p What is the purpose of using `UUID.randomUUID()` in this context?
??x
The purpose of using `UUID.randomUUID()` is to generate a universally unique identifier (UUID) that can be used as a unique ID for each record. This ensures that each record processed by Dataflow gets a distinct and statistically unique identifier, which helps in filtering out duplicate records during BigQuery insert operations.

```java
String uniqueId = UUID.randomUUID().toString();
```
x??

---

#### Reshuffling for Stability Across Retries
Background context: After generating the unique identifiers for records, it is essential to reshuffle the data. This step ensures that the applied identifiers remain stable and do not change across different Dataflow retries. By doing so, any duplicate attempts to insert into BigQuery will use the same UUID.

:p What does the `Reshuffle` transform do in this scenario?
??x
The `Reshuffle` transform ensures that the data is re-partitioned randomly after the unique identifiers are generated. This randomization guarantees that even if a Dataflow job is retried, the UUIDs assigned to each record will remain the same, thereby maintaining consistency across retries.

```java
// Reshuffle the data so that the applied identifiers are stable and will not change.
.data.apply(Reshuffle.of());
```
x??

---

#### Inserting into BigQuery with Unique IDs
Background context: Once the unique IDs have been assigned to each record and the data has been reshuffled, the next step is to insert these records into BigQuery. The unique IDs are used to filter out duplicate inserts.

:p How does the `ParDo` transform handle inserting into BigQuery?
??x
The `ParDo` transform processes each element with a custom DoFn that extracts the record and its associated unique ID, then inserts it into BigQuery. This transformation ensures that only records with unique IDs are inserted, effectively filtering out duplicates.

```java
.apply(ParDo.of(new DoFn<RecordWithId, Void>() {
    @ProcessElement
    public void processElement(ProcessContext context) {
        insertIntoBigQuery(context.element().record(), context.element().id());
    }
}));
```
x??

---

#### Non-Idempotent and Idempotent Steps in Dataflow Pipeline
Background context: In the provided pseudocode, the pipeline is split into two steps: a non-idempotent step for generating unique identifiers and an idempotent step for inserting records into BigQuery. The non-idempotent step generates UUIDs, while the idempotent step ensures that inserts can be retried without causing duplicates.

:p What are the characteristics of a non-idempotent step in this Dataflow pipeline?
??x
A non-idempotent step in this Dataflow pipeline is responsible for generating unique identifiers. The key characteristic here is that it produces different results each time it is executed, even if the same input data is processed multiple times. This is achieved through the use of `UUID.randomUUID()`, which generates a new UUID every time.

```java
String uniqueId = UUID.randomUUID().toString();
```
x??

---

#### Idempotent Step for BigQuery Insertion
Background context: The idempotent step in the pipeline ensures that once records are inserted into BigQuery, subsequent attempts to insert them will not result in duplicate entries. This is achieved by leveraging the stable UUIDs generated during the non-idempotent step.

:p What makes a step idempotent in this Dataflow scenario?
??x
An idempotent step in this Dataflow scenario ensures that any number of retries or resubmissions do not change the outcome beyond the initial successful execution. In the provided code, the insertion into BigQuery is idempotent because it uses the same UUIDs generated during the non-idempotent step. If an insert attempt fails and is retried, it will still use the same UUID, ensuring that no duplicates are created.

```java
.insertIntoBigQuery(context.element().record(), context.element().id());
```
x??

**Rating: 8/10**

#### Spark Streaming Microbatch Architecture
Background context: Apache Spark Streaming uses a microbatch architecture for continuous data processing. This approach allows users to logically deal with streams as if they were discrete batches, leveraging Spark's batch processing capabilities.

:p How does Spark Streaming handle streaming data?
??x
Spark Streaming handles streaming data by dividing the stream into small microbatches that can be processed like regular RDD (Resilient Distributed Datasets). It relies on the exactly-once nature of batch processing to ensure correctness. Each RDD in a microbatch is processed independently, and techniques for correct batch shuffles are used.

To illustrate how Spark processes data in a microbatch, consider the following example:

```java
// Pseudocode for processing a single batch
for (Batch b : stream) {
    // Process each RDD within the batch
    foreach (RDD rdd : b.getRdds()) {
        transformedData = transform(rdd);
    }
}

// Transform function could be defined as:
public static Dataset<Row> transform(RDD<Row> input) {
    // Apply transformations to achieve exactly-once processing
    return input.map(row -> ...).reduceByKey(...);
}
```
x??

---

#### Apache Flink Snapshots for Consistency
Background context: Apache Flink provides exactly-once processing by computing consistent snapshots of the entire streaming pipeline periodically. These snapshots help in maintaining state and ensuring that data is processed correctly even after failures.

:p How does Apache Flink ensure exactly-once processing?
??x
Apache Flink ensures exactly-once processing through its mechanism of computing consistent snapshots at regular intervals. Each snapshot represents a consistent point-in-time state of the entire pipeline, allowing the system to roll back to a previous snapshot in case of failures without losing data.

Here's how it works:
1. **Insert Snapshot Markers**: Special numbered snapshot markers are inserted into the streams from sources.
2. **Operator Snapshots**: As each operator receives these markers, it copies its state to an external location and propagates the marker to downstream operators.
3. **Completion of Snapshots**: After all operators have completed their snapshot algorithms, a complete snapshot is available.

In pseudocode:

```java
// Pseudocode for Flink's snapshot mechanism
public void createSnapshot() {
    // Insert snapshot markers into streams
    insertSnapshotMarkersIntoStreams();

    // Operator processes and copies state to external storage
    foreach (Operator op : operators) {
        op.snapshot();
    }

    // Propagate snapshot marker downstream
    propagateSnapshotMarker();
}

// Example of an operator's snapshot method
public void snapshot() {
    // Copy current state to external location
    copyStateToExternalStorage();
}
```
x??

---

#### Spark Streaming vs. Flink Latency Considerations
Background context: Both Apache Spark Streaming and Apache Flink handle streaming data, but they differ in how they manage latency and exactly-once processing.

:p How does Spark Streaming's microbatch approach affect its output latency?
??x
Spark Streaming's microbatch approach introduces increased latency due to the batch processing nature. Each batch is processed as a single unit, which can lead to higher latencies for deep pipelines and large volumes of input data. To mitigate this, careful tuning is often required.

For example:

```java
// Pseudocode illustrating Spark's batch processing
public void processStream(Stream stream) {
    while (true) {
        // Process each microbatch as a single unit
        Batch currentBatch = stream.takeNextMicroBatch();
        
        foreach (RDD rdd : currentBatch.getRdds()) {
            transformedData = transform(rdd);
        }
    }
}
```
x??

---

#### Apache Flink's Distributed Snapshots
Background context: Flink's distributed snapshots are a key mechanism for achieving exactly-once processing by ensuring that the system can roll back to previous states if necessary.

:p How does Flink handle state recovery using snapshots?
??x
Flink handles state recovery by leveraging its distributed snapshot mechanism. When a failure occurs, the pipeline rolls back its state from the last complete snapshot. This ensures that no data is lost and that processing resumes correctly.

Here's an example of how this works in pseudocode:

```java
// Pseudocode for Flink's state recovery using snapshots
public void recoverStateFromSnapshot() {
    // Wait until a snapshot completes
    waitForSnapshotCompletion();

    // Load the last complete snapshot into memory or external storage
    loadSnapshotDataIntoState();

    // Resume processing from the loaded state
    resumeProcessing();
}

// Example of waiting for a snapshot to complete
public void waitForSnapshotCompletion() {
    while (!snapshotCompleteCallback.hasCompleted()) {
        wait();
    }
}
```
x??

---

#### Flink's Assumptions and Challenges
Background context: Apache Flink's distributed snapshots offer an elegant way to deal with consistency in streaming pipelines, but this approach comes with several assumptions about the system.

:p What are some key assumptions made by Flink's snapshot mechanism?
??x
Flink makes several key assumptions about its system:
1. **Rarity of Failures**: It assumes that failures are rare because rolling back to a previous snapshot can have substantial impacts.
2. **Quick Snapshots**: It also assumes that snapshots can be completed quickly to maintain low-latency output.

These assumptions might pose challenges in very large clusters with higher failure rates and longer snapshot times.

For example, consider the following pseudocode for handling failures:

```java
// Pseudocode illustrating Flink's handling of worker failures
public void handleWorkerFailure() {
    // Wait until a new complete snapshot is available
    while (!hasNewCompleteSnapshot()) {
        wait();
    }

    // Rollback to the last complete snapshot state
    rollbackToLastSnapshot();

    // Restart processing from the last known good state
    resumeProcessingFromSnapshot();
}
```
x??

---

**Rating: 8/10**

#### Task Allocation and Data Transport

Background context: Flink simplifies task allocation by assuming static task placement within a single snapshot epoch. This allows for easier exactly-once data transport since the same worker will handle repeated tasks.

:p How does Flink simplify its task allocation to achieve exactly-once processing?

??x
Flink achieves exactly-once processing through static task allocation, ensuring that if a connection fails, the same data can be pulled in order from the same worker. This simplification allows for straightforward management of exactly-once data transport.
```java
// Example of task assignment logic (pseudocode)
public class TaskAssignment {
    public void assignTasks(TaskManager tm) {
        // Assign tasks based on static allocation
        for (Task t : tasks) {
            t.assignTo(tm);
        }
    }
}
```
x??

---

#### Load Balancing and Dataflow

Background context: Unlike Flink, Dataflow constantly load balances tasks among workers, making it challenging to assume that the same data will always be pulled from the same worker. This necessitates a more complex transport layer for exactly-once processing.

:p Why is load balancing in Dataflow problematic for achieving exactly-once processing?

??x
Load balancing in Dataflow complicates exactly-once processing because tasks are frequently reassigned to different workers, making it difficult to guarantee that the same data will be processed by the same worker. This requires a more sophisticated transport mechanism to ensure data integrity.
```java
// Example of load balancing (pseudocode)
public class LoadBalancer {
    public void balanceTasks(TaskManager[] managers) {
        // Reassign tasks based on current load and availability
        for (Task t : tasks) {
            t.reassignTo(randomManager(managers));
        }
    }
}
```
x??

---

#### Exactly-Once Data Processing

Background context: Both Flink and Apache Spark Streaming provide exactly-once data processing by checkpointing and leveraging batch runners. This ensures that each task processes data only once, maintaining consistency.

:p How do systems like Flink and Apache Spark ensure exactly-once data processing?

??x
Systems like Flink and Apache Spark achieve exactly-once data processing through checkpointing mechanisms. These checkpoints are used to restore the state of the system if a failure occurs, ensuring that each task processes data only once.

For example, Flink uses Chandy-Lamport distributed snapshots to ensure a consistent running state, which can be leveraged for exactly-once processing:
```java
// Example of checkpointing in Flink (pseudocode)
public class CheckpointManager {
    public void createCheckpoint() {
        // Save the current state of the system
        saveState();
    }

    public void restoreCheckpoint() {
        // Restore the state from a previous checkpoint
        loadState();
    }
}
```
x??

---

#### Batch vs. Streaming Pipelines

Background context: Historical batch systems handle duplicates more easily because they can rely on checkpoints and shuffles to detect and remove them. However, streaming systems face additional challenges due to the continuous nature of data ingestion.

:p Why are batch pipelines better suited for handling duplicates compared to streaming pipelines?

??x
Batch pipelines are better suited for handling duplicates because they process data in discrete batches, allowing them to rely on checkpoints and shuffles to detect and remove duplicates. Streaming pipelines, on the other hand, need to continuously handle incoming data, making duplicate detection more challenging.

For example, Spark Streaming delegates duplicate detection to a batch shuffler:
```java
// Example of duplicate detection in Spark Streaming (pseudocode)
public class DuplicateDetection {
    public boolean isDuplicate(long timestamp) {
        // Check if the current timestamp matches any previously seen timestamps
        return knownTimestamps.contains(timestamp);
    }
}
```
x??

---

#### Schema and Access Pattern Optimization

Background context: To optimize checkpointing, systems need to consider schema and access pattern optimizations that are tailored to the underlying key/value store. These optimizations help in efficiently managing state and reducing unnecessary data processing.

:p How do schema and access pattern optimizations contribute to efficient checkpointing?

??x
Schema and access pattern optimizations play a crucial role in efficient checkpointing by aligning with the characteristics of the underlying key/value store. This ensures that only necessary data is processed during checkpoints, improving performance.

For example, Flink optimizes schema and access patterns for efficient state management:
```java
// Example of schema optimization in Flink (pseudocode)
public class SchemaOptimizer {
    public void optimizeSchema() {
        // Analyze the schema to identify redundant or unnecessary fields
        analyzeSchema();
        
        // Remove redundant fields from the state storage
        pruneFields();
    }
}
```
x??

---

#### Deterministic Processing-Time Timestamps

Background context: To ensure exactly-once processing, Flink assigns deterministic processing-time timestamps to data. These timestamps must be strictly increasing and maintained across worker restarts.

:p How does Flink handle deterministic processing-time timestamps?

??x
Flink handles deterministic processing-time timestamps by ensuring that each sender guarantees its generated system timestamps are strictly increasing. This guarantee is crucial for maintaining the order of events during recovery from failures.

For example, a sender must implement this logic:
```java
// Example of timestamp generation in Flink (pseudocode)
public class TimestampGenerator {
    private long lastTimestamp = 0;

    public long generateTimestamp() {
        // Ensure strictly increasing timestamps
        return ++lastTimestamp;
    }
}
```
x??

---

#### SplittableDoFn API

Background context: The SplittableDoFn API in Apache Beam allows for more flexible handling of data processing, including the ability to handle duplicate detection lazily. This can improve performance by deferring some operations until necessary.

:p How does the SplittableDoFn API support lazy duplicate detection?

??x
The SplittableDoFn API supports lazy duplicate detection by providing methods that users can override to determine when and how to perform duplicate checks. By default, Beam systems delegate duplicate detection to batch shufflers, but this can be customized using the `requiresDedupping` method.

For example, a custom SplittableDoFn implementation might look like this:
```java
// Example of custom SplittableDoFn with lazy deduplication (pseudocode)
public class CustomSplittableDoFn extends DoFn<PCollection<T>, PCollection<T>> {
    @Override
    public void processElement(ProcessContext c) {
        // Process the element lazily
        if (!c.window().isFirst()) {
            long timestamp = generateTimestamp(c.element());
            if (timestamp > lastProcessedTimestamp) {
                lastProcessedTimestamp = timestamp;
                // Perform actual processing
                c.output(transform(c.element()));
            }
        } else {
            // First element, just pass through
            c.output(c.element());
        }
    }

    private long generateTimestamp(T element) {
        // Generate a deterministic timestamp for the element
        return new TimestampGenerator().generateTimestamp();
    }
}
```
x??

---

#### BigQuery and Duplicates

Background context: While BigQuery ensures uniqueness within its service, it does not guarantee that all duplicates are removed during streaming inserts. Users must periodically run queries to clean up any missed duplicates.

:p How can users handle duplicate records in BigQuery?

??x
Users can handle duplicate records in BigQuery by periodically running a query to remove any duplicates that were not caught during the initial insert process. This is necessary because while BigQuery ensures uniqueness within its service, it does not guarantee complete removal of all duplicates.

For example, a user might run the following SQL query:
```sql
-- Example query to remove duplicates in BigQuery (SQL)
DELETE FROM `project.dataset.table`
WHERE _PARTITIONTIME = TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 DAY)
AND ROW_NUMBER() OVER (
    PARTITION BY column1, column2
    ORDER BY _INSERT_TIME DESC
) > 1;
```
x??

---

#### Resilient Distributed Datasets (RDDs)

Background context: RDDs in Apache Spark represent a distributed dataset abstraction similar to PCollections in Beam. These datasets are resilient and can be recovered from failures by re-executing lost tasks.

:p What is an RDD and how does it differ from a PCollection?

??x
An RDD (Resilient Distributed Dataset) in Apache Spark represents a distributed collection of objects. It differs from a PCollection in Beam, as both provide abstractions for distributed data processing but are implemented differently to suit their respective frameworks.

For example, an RDD can be created and operated on like this:
```java
// Example of creating and operating on an RDD (pseudocode)
JavaRDD<String> rdd = sc.textFile("hdfs://path/to/file");
JavaRDD<Integer> counts = rdd.flatMap(line -> Arrays.asList(line.split(" ")).iterator())
                              .mapToInt(String::length);
```
x??

---

#### Sequence Numbers for Snapshots

Background context: Flink uses sequence numbers to track the progress of snapshots. These sequence numbers are unique per connection and unrelated to snapshot epoch numbers, helping in ensuring exactly-once processing.

:p How do sequence numbers help in Flink's exactly-once processing?

??x
Sequence numbers in Flink help ensure exactly-once processing by providing a unique identifier for each data item during the snapshot process. These numbers are assigned to connections independently of snapshot epochs, ensuring that duplicate data items can be identified and handled correctly.

For example, sequence number assignment might look like this:
```java
// Example of assigning sequence numbers (pseudocode)
public class SequenceManager {
    private long nextSequenceNumber = 0;

    public long getNextSequenceNumber() {
        return ++nextSequenceNumber;
    }
}
```
x??

---

#### Nonidempotent Sinks

Background context: For nonidempotent sinks, Flink requires the pipeline to wait for snapshot completion before processing new data. Idempotent sinks do not need this additional step.

:p When does Flink require waiting for snapshot completion?

??x
Flink requires waiting for snapshot completion when using nonidempotent sinks. This ensures that duplicate records are handled correctly and prevents any inconsistencies in the final output. Idempotent sinks, which guarantee no side effects from repeated processing, do not need to wait.

For example, a nonidempotent sink might look like this:
```java
// Example of a nonidempotent sink (pseudocode)
public class NonIdempotentSink implements SinkFunction<String> {
    @Override
    public void invoke(String value) throws Exception {
        // Ensure snapshot completion before processing
        if (!snapshotCompleted()) {
            throw new RuntimeException("Snapshot not completed yet");
        }
        
        processValue(value);
    }

    private boolean snapshotCompleted() {
        // Check if the current snapshot has completed
        return FlinkContext.isSnapshotComplete();
    }

    private void processValue(String value) {
        // Process the value (e.g., write to database)
    }
}
```
x??

---

#### Mean Time to Worker Failure

Background context: For Flink pipelines, it is assumed that the mean time to worker failure is less than the time required for a snapshot. This assumption ensures that the pipeline can recover without getting stuck if a failure occurs.

:p What assumption does Flink make about worker failures and snapshots?

??x
Flink assumes that the mean time between worker failures is shorter than the time needed to complete a snapshot. This allows the system to recover from failures before losing too much progress, ensuring that the pipeline can continue processing without getting stuck due to worker failures.

For example, this assumption might be checked as follows:
```java
// Example of checking failure assumptions (pseudocode)
public class FailureAssumptionChecker {
    public boolean checkAssumptions(double meanTimeToFailure) {
        double snapshotTime = 30; // Example time for a snapshot in seconds
        
        return meanTimeToFailure < snapshotTime;
    }
}
```
x??

