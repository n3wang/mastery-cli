# High-Quality Flashcards: 2B005---Streaming-Systems_processed (Part 16)


**Starting Chapter:** Summary

---


#### Streams and Tables Relativity

Streams and tables are two sides of the same coin, with streams representing data in motion and tables representing static data. The aggregation of a stream over time yields a table, while observing changes to a table over time produces a stream.

:p How do we define streams and tables relative to each other?
??x
Streams can be transformed into tables through aggregation operations, where the stream represents updates over time that are collected into a table. Conversely, tables can be viewed as a snapshot of data at rest, which can be observed for changes in real-time to produce a stream.

For example:
```java
// Example code to transform a stream into a table using Apache Beam
PCollection<KV<String, Integer>> input = ...; // Stream of updates
PCollection<KV<String, Integer>> aggregatedTable = input
    .groupByKey() // Grouping operation
    .apply("Summarize", Sum.<Integer>create()); // Aggregation to sum values by key
```
x??

---
#### Nongrouping Operations

Nongrouping operations process elements of a stream independently, maintaining the stream's inherent motion.

:p What characterizes nongrouping operations in data processing pipelines?
??x
Nongrouping operations operate on individual elements within a stream without aggregating them into groups. These operations are element-wise and do not alter the fundamental nature of the stream as data in motion.

For example:
```java
// Example code for an nongrouping operation using Apache Beam
PCollection<String> input = ...; // Stream of strings
PCollection<String> output = input.apply("Transform", ParDo.of(new DoFn<String, String>() {
    @ProcessElement
    public void processElement(@Element String element, OutputReceiver<String> out) {
        out.output(element.toUpperCase());
    }
}));
```
x??

---
#### Grouping Operations

Grouping operations are crucial as they turn streams into tables by aggregating elements based on a key.

:p What is the role of grouping operations in data processing pipelines?
??x
Grouping operations are essential because they take a stream and aggregate it over keys, transforming it into a table. This operation pauses the flow of data to group related records together, effectively bringing the stream to rest as a table where further aggregation or analysis can be performed.

For example:
```java
// Example code for grouping using Apache Beam
PCollection<KV<String, Integer>> input = ...; // Stream with key-value pairs
PCollection<KV<String, Integer>> aggregatedTable = input
    .groupByKey() // Grouping by keys
    .apply("Summarize", Sum.<Integer>create()); // Aggregation to sum values by key
```
x??

---
#### Ungrouping Operations

Ungrouping operations, or triggering operations, are used to revert the transformation from a table back into a stream, allowing for further processing.

:p What is the purpose of ungrouping (triggering) operations in data processing pipelines?
??x
Ungrouping operations, also known as triggering operations, reverse the effect of grouping by turning tables back into streams. These operations are necessary when you need to process aggregated data in a way that respects time or other constraints, essentially reactivating the flow of data.

For example:
```java
// Example code for ungrouping using Apache Beam (hypothetical)
PCollection<KV<String, Integer>> table = ...; // Aggregated table
PCollection<KV<String, Integer>> stream = table.apply("Trigger", Trigger.<String, Integer>eventTime());
```
x??

---
#### Batch vs. Streaming in Streams-and-Tables Perspective

The streams-and-tables perspective reveals that batch and streaming are fundamentally the same conceptually, differing only in how data is managed over time.

:p How do batch and streaming processes align from a streams-and-tables perspective?
??x
From a streams-and-tables perspective, both batch and streaming processes treat data as either static tables or dynamic streams. The key difference lies in the nature of the processing pipeline—whether it reads from a static table or a continuous stream—and how data flows through the system over time.

For example:
```java
// Example code for batch job using Apache Beam (static input)
PCollection<KV<String, Integer>> inputFile = ...; // Static dataset
PCollection<KV<String, Integer>> outputTable = inputFile
    .groupByKey() // Grouping operation
    .apply("Summarize", Sum.<Integer>create()); // Aggregation to sum values by key

// Example code for streaming job using Apache Beam (continuous input)
PInputDataStream<String> inputStream = ...; // Continuous stream of data
PCollection<KV<String, Integer>> outputTable = inputStream
    .apply("Transform", ParDo.of(new DoFn<String, KV<String, Integer>>() {
        @ProcessElement
        public void processElement(@Element String element, OutputReceiver<KV<String, Integer>> out) {
            // Transform and group by key
        }
    }))
    .groupByKey()
    .apply("Summarize", Sum.<Integer>create());
```
x??

---


#### Motivation for Persistent State
Background context: The text explains that people write books to capture ephemeral ideas so they can be revisited. Similarly, persistent state is required in data processing pipelines to store and revisit data over time.

:p What motivates the need for persistent state in data processing pipelines?
??x
Persistent state is necessary because it allows us to capture and revisit data over time, which is crucial for operations that require historical context or long-term analysis. Without persistent state, transient computations would be lost, making it impossible to review past data or build upon previous results.
x??

---
#### Implicit State in Pipelines
Background context: The text mentions that two forms of implicit state are often found within pipelines but do not meet the criteria for robust storage.

:p What are the two forms of implicit state typically found in pipelines?
??x
The two forms of implicit state are:
1. Data stored on local disk, which is unreliable and can be lost.
2. Data stored in memory, which is volatile and prone to loss during system crashes or restarts.
x??

---
#### Advertising Conversion Attribution Use Case
Background context: The text uses the advertising conversion attribution as an example of a use case that struggles with implicit state.

:p How does the advertising conversion attribution use case illustrate the limitations of implicit state?
??x
The advertising conversion attribution use case illustrates the limitations of implicit state because it requires tracking events over time and correlating them to specific ad campaigns. Implicit state, stored in memory or local disk, cannot reliably capture this historical data, making it difficult to accurately attribute conversions to different ads.

This is problematic because:
- Data must be retained across multiple sessions.
- Historical context is crucial for accurate attribution.
x??

---
#### Explicit State Management
Background context: The text explains the need for an explicit form of persistent state management that can handle robust storage requirements.

:p What are the key features of a general, explicit form of persistent state management?
??x
A general, explicit form of persistent state management should have these key features:
- Robust and durable storage.
- Ability to handle large volumes of data.
- Support for distributed computing environments.
- Consistency across multiple nodes or machines.

These features ensure that the state can be reliably stored and accessed even in the face of failures or scaling requirements.
x??

---
#### Apache Beam State API
Background context: The text introduces a concrete manifestation of one such state API, as found in Apache Beam, to manage persistent state explicitly.

:p What is an example of a state API for managing persistent state, as mentioned in the text?
??x
Apache Beam provides a state API that allows developers to explicitly manage persistent state. This API supports operations like reading from and writing to state, handling state changes during processing, and ensuring consistent behavior across distributed systems.

Example code in Pseudocode:
```java
public class AdConversionAttribution {
    private StateSpec<Long> impressionsCount;

    public void processElement(PaneElement<String> element) {
        // Read the count of impressions for this ad
        long count = state.impressionsCount.read().get();

        // Increment the count and write back to state
        count += 1;
        state.impressionsCount.write(count);
    }
}
```
This example shows how to read from and write to a state object in Apache Beam, ensuring that the state is managed explicitly and robustly.
x??

---


#### Inevitability of Failure
Background context explaining why long-running pipelines need some form of persistent state. This is critical for unbounded data processing, where pipelines are expected to run indefinitely but face interruptions due to various reasons like machine failures or code changes.

:p Why is persistent state necessary in the case of long-running pipelines processing unbounded input data?
??x
Persistent state is necessary because long-running pipelines must be able to resume from their last known checkpoint after encountering an interruption. This ensures that they can continue processing without losing progress due to unforeseen interruptions such as machine failures, planned maintenance, or misconfigured commands.

```java
public class ExamplePipeline {
    public void processUnboundedData() {
        // Logic for handling unbounded data with persistent state
        while (true) {
            try {
                // Process the next batch of data
                handleBatchOfData(getNextBatch());
            } catch (Exception e) {
                log.error("Pipeline interrupted, saving checkpoint and retrying.");
                saveCheckpoint();
                continue;
            }
        }
    }

    private void handleBatchOfData(List<DataRecord> records) {
        // Process the records here
    }

    private List<DataRecord> getNextBatch() {
        // Fetch the next batch of data from the source
        return dataSource.getRecords();
    }

    private void saveCheckpoint() {
        // Save the current state to a persistent storage like a database or file system
    }
}
```
x??

---

#### Bounded vs. Unbounded Data Processing
Background context explaining how bounded and unbounded datasets are historically processed differently, with batch systems often assuming reprocessing is possible and streaming systems built for infinite data.

:p Why do batch pipelines use persistent state, if at all?
??x
Batch pipelines typically do not require as much persistent state because they can assume that input data can be reprocessed in their entirety upon failure. However, some level of checkpointing might still be used to minimize the cost of recomputations and ensure correctness.

```java
public class ExampleBatchPipeline {
    public void processBoundedData() {
        // Logic for handling bounded data without needing persistent state
        try (BufferedReader reader = new BufferedReader(new FileReader("input.txt"))) {
            String line;
            while ((line = reader.readLine()) != null) {
                processDataLine(line);
            }
        } catch (Exception e) {
            log.error("Pipeline interrupted, but can be restarted from the beginning.");
        }
    }

    private void processDataLine(String line) {
        // Process each data line here
    }
}
```
x??

---

#### Correctness and Efficiency Through Checkpointing
Background context explaining how persistent state helps maintain correctness in light of ephemeral inputs and minimizes redundant work.

:p How does checkpointing help with minimizing duplicated work and data persisted during failures?
??x
Checkpointing helps by recording the intermediate state of a pipeline, allowing it to resume from a known point after a failure without needing to recompute all previous steps. This reduces both the computational overhead and storage requirements needed for recovery.

```java
public class ExampleCheckpointedPipeline {
    public void processStreamWithCheckpoints() {
        try (KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props)) {
            Properties props = new Properties();
            // Initialize properties with broker addresses etc.
            while (true) {
                consumer.poll(Duration.ofMillis(100)); // Consume data
                try {
                    // Process the batch of records
                    processBatch(consumer);
                } catch (Exception e) {
                    log.error("Pipeline interrupted, saving checkpoint and retrying.");
                    saveCheckpoint();
                    continue;
                }
            }
        }
    }

    private void processBatch(KafkaConsumer<String, String> consumer) {
        // Logic to process each batch of records
    }

    private void saveCheckpoint() {
        // Save the current state to a persistent storage like a Kafka offset or file system
    }
}
```
x??

---

#### Intermediate Data and Checkpointing
Background context explaining how checkpointing intermediate data can significantly reduce the amount of data stored during failures, making recovery more efficient.

:p How does checkpointing partial results help in reducing redundant work?
??x
Checkpointing partial results helps by storing only essential parts of the ongoing computation. This means that upon failure, only these critical pieces need to be reprocessed, greatly reducing both the computational and storage overheads compared to recomputing everything from scratch.

```java
public class ExampleMeanCalculation {
    public double calculateMean() {
        int count = 0;
        long sum = 0;
        try (BufferedReader reader = new BufferedReader(new FileReader("input.txt"))) {
            String line;
            while ((line = reader.readLine()) != null) {
                if (count % CHECKPOINT_INTERVAL == 0 && count > 0) {
                    saveCheckpoint(count, sum);
                }
                long value = Long.parseLong(line); // Simplified for example
                sum += value;
                ++count;
            }
        } catch (Exception e) {
            log.error("Pipeline interrupted, saving checkpoint and retrying.");
            saveCheckpoint(count, sum);
        }
        return sum / count;
    }

    private void saveCheckpoint(int count, long sum) {
        // Save the current state to a persistent storage
        log.info("Checkpoint saved at count: {}, sum: {}", count, sum);
    }
}
```
x??

---

