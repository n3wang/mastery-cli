# High-Quality Flashcards: 2B005---Streaming-Systems_processed (Part 14)

**Rating threshold:** >= 8/10

**Starting Chapter:** A Streams and Tables Analysis of MapReduce

---

**Rating: 8/10**

#### Streams and Tables Introduction
Background context explaining that this chapter introduces the relationship between Beam Model (as described previously) and the theory of "streams and tables." The latter is popularized by Martin Kleppmann and Jay Kreps, among others. It provides a lower-level understanding of how data processing works.
:p What are streams and tables in the context of data processing?
??x
Streams and tables represent two fundamental dimensions or perspectives on handling data in data processing systems. Streams refer to unbounded sequences of events or data points, while tables typically store bounded or finite datasets where each row can be uniquely identified by some key.
x??

---

#### Classical Mechanics vs. Quantum Mechanics Analogy
Background context explaining the analogy used to introduce streams and tables. It draws a parallel between how classical mechanics (as traditionally taught) is simplified but not entirely accurate, similar to how Beam Model focused on unbounded data without considering stream processing details.
:p How does the analogy of classical mechanics and quantum mechanics help understand streams and tables?
??x
The analogy helps illustrate that while the Beam Model provided insights into handling unbounded datasets (like streams), it didn't fully capture the complexities involved in stream processing. Just as quantum mechanics offers a more comprehensive view of physical phenomena than classical mechanics, understanding streams and tables provides a fuller picture of data processing.
x??

---

#### Stream and Table Theory
Background context explaining that stream and table theory helps describe low-level concepts underlying Beam Model. It clarifies how these theories can be integrated into SQL for robust stream processing.
:p Why is it important to understand stream and table theory in the context of Beam Model?
??x
Understanding stream and table theory is crucial because it offers a clearer, more comprehensive view of data processing mechanisms. This knowledge helps integrate robust stream processing concepts smoothly into SQL, enhancing both theoretical understanding and practical applications.
x??

---

#### Database Systems Overview
Background context explaining that databases typically use an append-only log for transactional updates. Transactions are recorded in logs, which are then applied to the table to update it.
:p What is the underlying data structure used by most databases according to this text?
??x
Most databases employ an append-only log as their underlying data structure. As transactions occur, they are recorded in a log, and subsequently, these updates are applied sequentially to the main database tables to reflect the changes made.
x??

---

#### Row Identification in Tables
Background context explaining that rows in a table are uniquely identified by some key (explicit or implicit). This is a core property of tables in databases.
:p How do tables identify unique rows?
??x
Tables identify unique rows through keys, which can be either explicit (like primary keys) or implicit. These keys ensure that each row in the table is uniquely identifiable, allowing for efficient retrieval and manipulation of data.
x??

---

**Rating: 8/10**

#### Table-to-Stream Conversion: Materialized Views

Background context explaining that materialized views allow you to specify a query on a table, which is then manifested as another first-class table. This view acts as a cached version of the query results and is kept up to date through changes in the source table.

The database logs any changes to the original table and applies these changes within the context of the materialized view's query, updating the destination materialized view accordingly.

:p How does a materialized view help in converting a table into a stream?
??x
A materialized view helps by acting as a cached version of the results from a specific query on a table. When changes are made to the source table, the database logs these changes and then evaluates them within the context of the materialized view's query. This process updates the materialized view with new data reflecting those changes.

For example, if you have a table `orders` and create a materialized view that calculates total sales for each product, every time an order is added or modified in `orders`, the database logs this change and then recalculates the total sales for the affected products. This stream of updates can be seen as a changelog representing changes to the original table over time.

```java
// Example Java code using Apache Beam to convert a table into a stream.
public class MaterializedViewToStream {
    PCollection<KV<String, Long>> calculateTotalSales(
            PTable<KV<String, Integer>> orders) {
        return orders
                .apply("Group by Product", GroupByKey.create())
                .apply("Sum Orders", Sum.intSum());
    }
}
```
x??

---

#### Streams and Tables in the Beam Model

Background context explaining that streams represent data in motion and tables as a snapshot of data at rest. The aggregation of updates over time yields a table, while observing changes to a table over time results in a stream.

:p How do streams and tables relate within the Beam Model?
??x
Streams and tables are related in the Beam Model through their dual nature: streams represent data in motion by capturing the evolution of datasets over time, whereas tables represent data at rest as snapshots of these evolving datasets at specific points in time. Streams can be viewed as a changelog for tables; any change to a table is recorded as an update in the stream, which can later be used to reconstruct or aggregate the original table.

```java
// Example Java code using Apache Beam to demonstrate the relationship.
public class StreamAndTableRelation {
    PCollection<String> processStream(PCollection<TableRow> table) {
        return table
                .apply("Extract Updates", ParDo.of(new DoFn<TableRow, String>() {
                    @ProcessElement
                    public void processElement(@Element TableRow row, OutputReceiver<String> out) {
                        // Logic to generate stream elements from table rows.
                        out.output(row.getKey() + " updated");
                    }
                }));
    }
}
```
x??

---

#### Bounded and Unbounded Data in Streams

Background context explaining the difference between bounded and unbounded datasets. Bounded datasets have a defined start and end, such as a file or a database snapshot, while unbounded datasets continue indefinitely, like real-time sensor data.

:p What is the distinction between bounded and unbounded datasets?
??x
Bounded datasets are those with a defined beginning and end, such as a file containing historical sales data or a database snapshot taken at a specific point in time. Unbounded datasets, on the other hand, continue indefinitely without any predefined end, such as real-time sensor data or live streaming applications.

In Apache Beam, bounded datasets can be processed using `PCollection` with a known size, whereas unbounded datasets are handled by `PCollectionView` or `PCollection` with a watermark mechanism to manage incoming elements continuously.

```java
// Example Java code in Apache Beam for processing both bounded and unbounded data.
public class BoundedUnboundedProcessing {
    PCollection<String> processBoundedData(PCollection<String> fileData) {
        // Processing logic for file data with known size.
    }

    PCollection<KV<String, String>> processUnboundedData(Publishers.Source<String> source) {
        return source
                .apply("Window into Time", Window.into(new GlobalWindows())
                        .withAllowedLateness(Duration.standardMinutes(5)))
                .apply("Process Data", ParDo.of(new DoFn<String, KV<String, String>>() {
                    // Processing logic for unbounded data.
                }));
    }
}
```
x??

---

#### The Four Ws and How in Streams/Tables

Background context explaining the importance of understanding `what`, `where`, `when`, `how` questions to map stream and table concepts. These questions help clarify how data changes over time, where these changes occur, when they happen, and how they are processed.

:p How do the four Ws (What, Where, When, How) relate to streams and tables?
??x
The four Ws—what, where, when, and how—are crucial in understanding the dynamics of stream and table processing. 

- **What**: Refers to the data itself and the nature of changes or queries being applied.
- **Where**: Indicates the location or source of these data changes.
- **When**: Specifies the timing and frequency of these updates or queries.
- **How**: Describes the mechanisms used to process, aggregate, or transform this data.

In Apache Beam, these questions can be addressed through various transformations like windowing, triggering, and combining logic that help manage how data is processed over time.

```java
// Example Java code in Apache Beam addressing the four Ws.
public class FourWsExample {
    PCollection<KV<String, Integer>> processSalesData(PCollection<TableRow> sales) {
        return sales
                .apply("Filter Sales", Filter.by(sale -> sale.getValue() > 100))
                .apply("Window into Time", Window.into(FixedWindows.of(Duration.standardMinutes(5))))
                .apply("Summarize Sales", Sum.intSum());
    }
}
```
x??

---

**Rating: 8/10**

#### MapReduce Job Analysis

Background context explaining the concept. The passage discusses how a traditional MapReduce job can be analyzed through the lens of streams and tables. It breaks down the process into six phases: MapRead, Map, MapWrite, ReduceRead, Reduce, and ReduceWrite.

:p What are the key phases in a traditional MapReduce job?
??x
The key phases in a traditional MapReduce job are:

1. **MapRead**: Consumes input data and preprocesses them.
2. **Map**: Processes preprocessed inputs into key/value pairs.
3. **MapWrite**: Groups mapped outputs by keys and writes them to temporary storage.
4. **ReduceRead**: Reads the saved shuffle data.
5. **Reduce**: Processes grouped values from ReduceRead.
6. **ReduceWrite**: Writes final output.

x??

---
#### Map Phase in Streams/Tables Context

Background context explaining the concept. The passage explains that the Map phase in a MapReduce job can be understood as consuming and processing key/value pairs, emitting zero or more key/value pairs.

:p What does the `map` function do in Java during the Map phase?
??x
The `map` function in Java during the Map phase is responsible for processing each key/value pair from the preprocessed input table. It emits zero or more key/value pairs as output.
```java
void map(KI key, VI value, Emit<KO, VO> emitter);
```
- **KI**: Key Input type.
- **VI**: Value Input type.
- **KO**: Key Output type.
- **VO**: Value Output type.

The `emitter` is used to emit the output pairs. This function will be invoked repeatedly for each key/value pair in the input table.

x??

---
#### MapWrite Phase

Background context explaining the concept. The passage explains that the MapWrite phase clusters together sets of map-phase outputs having identical keys and writes these groups to temporary persistent storage, essentially performing a group-by-key operation with checkpointing.

:p What is the role of the MapWrite phase in MapReduce?
??x
The MapWrite phase in MapReduce collects key/value pairs produced by the Map phase and writes them into (temporary) persistent storage. This step effectively groups values having the same key together, similar to a group-by-key operation with checkpointing.

This ensures that all values for each key are processed before moving on to the Reduce phase, maintaining data integrity across multiple map tasks.

x??

---
#### ReduceRead Phase

Background context explaining the concept. The passage describes the ReduceRead phase as consuming the saved shuffle data and converting it into a standard key/value-list form suitable for reduction operations.

:p What does the `reduce` function do in Java during the Reduce phase?
??x
The `reduce` function in Java during the Reduce phase consumes a single key along with its associated value-list of records. It processes these values and emits zero or more records, optionally keeping them associated with the same key.
```java
void reduce(KO key, Iterable<VO> values, Emit<KO, VO> emitter);
```
- **KO**: Key Output type.
- **VO**: Value Output type.

The `emitter` is used to emit the output pairs after processing. This function will be invoked for each key and its associated value-list from the saved shuffle data.

x??

---
#### Shuffle Phase

Background context explaining the concept. The passage notes that the MapWrite and ReduceRead phases are sometimes referred to as the Shuffle phase, though it suggests considering them independently.

:p What is the role of the Shuffle phase in MapReduce?
??x
The Shuffle phase involves two main steps: MapWrite and ReduceRead:
- **MapWrite**: Clusters together sets of map-phase output values having identical keys and writes these groups to (temporary) persistent storage.
- **ReduceRead**: Consumes the saved shuffle data, converting it into a standard key/value-list form for reduction.

These phases ensure that each reduce task has all the necessary input data before processing begins. The Shuffle phase is crucial for maintaining correct groupings of data across multiple map tasks and for distributing them to the appropriate reduce tasks.

x??

---

**Rating: 8/10**

#### MapRead Phase
Background context: The MapRead phase iterates over the data stored in a table and converts it into a stream of records. This is a crucial step where data at rest (in tables) are transformed into a form that can be processed by the Map phase.

:p What happens during the MapRead phase?
??x
During the MapRead phase, the system iterates over each record in the input table and converts it into a stream of elements. Each element is typically represented as a key-value pair (key, value) or a single value if no keys are involved. This transformation allows the subsequent phases to process data in a streaming fashion.

```java
public class MapReadExample {
    public Tuple2<String, Integer> mapRead(String record) {
        // Splitting the record into key and value parts
        String[] parts = record.split(",");
        return new Tuple2<>(parts[0], Integer.parseInt(parts[1]));
    }
}
```
x??

---

#### Map Phase
Background context: The Map phase processes the stream of elements generated by the MapRead phase. It performs element-wise transformations, which can include filtering or exploding records into multiple elements.

:p What does the Map phase do after consuming a stream?
??x
The Map phase consumes the stream produced by the MapRead phase and applies an element-wise transformation to each record. This could involve filtering out some records, transforming single records into multiple ones (expanding cardinality), or applying any user-defined logic to modify the data.

```java
public class MapExample {
    public Tuple2<String, Integer> map(Tuple2<String, Integer> input) {
        String key = input._1;
        int value = input._2;

        // Example: Filter out records with a value less than 50 and double the value for others
        if (value >= 50) {
            return new Tuple2<>(key, value * 2);
        } else {
            return null; // Filtering out this record
        }
    }
}
```
x??

---

#### MapWrite Phase
Background context: The MapWrite phase groups records by key and writes them to persistent storage. This is a critical step where the stream of transformed elements is converted back into a table-like structure.

:p What happens during the MapWrite phase?
??x
During the MapWrite phase, the system groups records by their keys and writes these grouped records to persistent storage. This conversion from a stream to a table helps in maintaining state across multiple operations and allows for per-key aggregation.

```java
public class MapWriteExample {
    public void mapWrite(Map<String, List<Integer>> groupedRecords) {
        // Writing the grouped records to persistent storage
        for (Map.Entry<String, List<Integer>> entry : groupedRecords.entrySet()) {
            String key = entry.getKey();
            List<Integer> values = entry.getValue();

            // Write logic here to persist the values under their respective keys
        }
    }
}
```
x??

---

#### Similarity Between MapRead and MapWrite Phases
Background context: The MapRead and MapWrite phases are symmetrical in nature. Both phases convert data between a table-like structure (stream) and persistent storage.

:p How do the MapRead and MapWrite phases compare?
??x
The MapRead and MapWrite phases share a similar structure but operate on opposite directions of data flow. While MapRead converts tables into streams, MapWrite does the reverse by converting streams back to tables or groupings. Both involve key-based operations: MapRead can be seen as reading keys from tables and producing a stream, whereas MapWrite reads streams and writes them out grouped by keys.

```java
public class SymmetryExample {
    public Tuple2<String, Integer> mapRead(String record) {
        // Convert table to stream
        String[] parts = record.split(",");
        return new Tuple2<>(parts[0], Integer.parseInt(parts[1]));
    }

    public void mapWrite(Map<String, List<Integer>> groupedRecords) {
        // Convert stream back to persistent storage
        for (Map.Entry<String, List<Integer>> entry : groupedRecords.entrySet()) {
            String key = entry.getKey();
            List<Integer> values = entry.getValue();

            // Write logic here
        }
    }
}
```
x??

---

#### ReduceRead Phase
Background context: The ReduceRead phase is similar to the MapRead phase but processes data that were produced by the MapWrite phase, stored as key/value pairs.

:p What does the ReduceRead phase do?
??x
The ReduceRead phase reads data from persistent storage where records have been grouped by keys. It converts these key-value lists back into a stream of elements (usually singleton lists) for further processing in the subsequent Reduce phase.

```java
public class ReduceReadExample {
    public Tuple2<String, List<Integer>> reduceRead(String line) {
        // Reading from a source that stores key/value pairs as strings, e.g., "key,value1,value2"
        String[] parts = line.split(",");
        return new Tuple2<>(parts[0], Arrays.asList(Integer.parseInt(parts[1]), Integer.parseInt(parts[2])));
    }
}
```
x??

---

**Rating: 8/10**

#### Batch Processing and Stream/Tables Theory
Background context explaining how batch processing fits into stream/table theory. Discuss the basic pattern of tables becoming streams, and then being processed until a grouping operation is hit, which turns them back into tables.

:p How does batch processing fit into stream/table theory?
??x
Batch processing can be seen as a special case of stream processing where the input data is read in its entirety (forming a table), transformed through a series of nongrouping operations, and then grouped to produce final results. The key difference lies in how the data flows: in batch processing, it's a one-time transformation of static data.

```java
// Example of reading a file into a PCollection (table) for batch processing
PCollection<String> raw = IO.readFromFile("input.txt");
```
x??

---

#### Bounded vs. Unbounded Data
Explanation on how streams relate to bounded and unbounded data, emphasizing that in the context of stream/table theory, streams are simply the in-motion form of data.

:p How do streams relate to bounded/unbounded data?
??x
Streams can represent both bounded and unbounded data. In batch processing, which is a subset of stream processing, the input is typically finite (bounded). However, from the perspective of stream/table theory, it's easier to see that both types of data can be processed as streams.

```java
// Example of reading a file for bounded data
PCollection<String> raw = IO.readFromFile("input.txt");
// Example of consuming events in real-time for unbounded data
PCollection<KV<Team, Integer>> input = KafkaConsumer.getEvents();
```
x??

---

#### Transformations: What and How
Explanation on the types of transformations (nongrouping and grouping) within stream/table theory. Discuss how these operations relate to building models, counting sums, filtering spam, etc.

:p What are the two main types of what transforms in stream/table theory?
??x
In stream/table theory, there are two main types of what transformations: nongrouping and grouping. Nongrouping transformations accept a stream of records and produce a new transformed stream (e.g., filters, exploders). Grouping transformations group the streams into tables by some key or rule (e.g., joins, aggregations).

```java
// Example of a nongrouping transformation: filtering spam messages
PCollection<String> nonSpam = raw.apply(new FilterFn());

// Example of a grouping transformation: summing team scores per team
PCollection<KV<Team, Integer>> totals = input.apply(Sum.integersPerKey());
```
x??

---

#### Streams and Tables in Classic Batch Processing
Explanation on the classic batch processing pipeline, including event-time/processing-time visualization.

:p How does a simple summation pipeline look in a streams and tables view?
??x
A simple summation pipeline reads data, parses it into individual team member scores, and then sums those scores per team. In a streams and tables view, this process can be represented as:

```java
PCollection<String> raw = IO.readFromFile("input.txt");
PCollection<KV<Team, Integer>> input = raw.apply(new ParseFn());
PCollection<KV<Team, Integer>> totals = input.apply(Sum.integersPerKey());
```

This pipeline sums team scores, but the streams and tables view emphasizes that grouping operations create tables where final results can be stored.

```java
// Example of a summation pipeline
PCollection<String> raw = IO.readFromFile("input.txt");
PCollection<KV<Team, Integer>> input = raw.apply(new ParseFn());
PCollection<KV<Team, Integer>> totals = input.apply(Sum.integersPerKey());
```
x??

---

#### Grouping and Ungrouping Operations
Explanation on the nature of grouping operations and their inverse "ungrouping" in stream processing.

:p What is the "ungrouping" inverse of a grouping operation?
??x
Grouping operations in stream/table theory group records together, transforming streams into tables. The ungrouping inverse would put these grouped records back into motion as separate elements within a stream. However, this concept is more theoretical and less commonly used directly.

```java
// Example of a grouping operation (creating a table)
PCollection<KV<Team, Integer>> totals = input.apply(Sum.integersPerKey());

// Theoretical example of ungrouping: This is not typically done in practice.
PCollection<Integer> ungrouped = totals.apply(UngroupFn());
```
x??

---

#### Stream Processors as Databases
Explanation on the idea that anywhere you have a grouping operation, it creates a table with potentially useful data.

:p Why can we read results directly from grouped operations?
??x
Grouping operations in stream processing create tables where final results are stored. If these final results don't need further transformation downstream, they can be read directly from the resulting table. This approach saves resources and storage space by eliminating redundant data storage and additional sink stages.

```java
// Example of reading results directly from a grouped operation
PCollection<KV<Team, Integer>> totals = input.apply(Sum.integersPerKey());
KV<Team, Integer> result = totals.peek();
```

This is particularly useful in scenarios where the values are your final results and don't require further processing.

```java
// Example of serving data directly from state tables (hypothetical)
PCollection<KV<Team, Integer>> results = StateTable.readFrom("team_scores");
```
x??

---

**Rating: 8/10**

#### Window Assignment
Background context explaining the concept. Window assignment involves placing a record into one or more windows, which effectively combines the window definition with the user-assigned key for that record to create an implicit composite key used at grouping time. This process is crucial for stream-to-table conversion because it drives how data are grouped and aggregated.

If applicable, add code examples with explanations:
```java
// Example of applying a windowing transform
PCollection<String> raw = IO.read(...);
PCollection<KV<Team, Integer>> input = raw.apply(new ParseFn());
PCollection<KV<Team, Integer>> totals = input
    .apply(Window.into(FixedWindows.of(TWO_MINUTES)))
    .apply(Sum.integersPerKey());
```
:p What is the primary purpose of window assignment in stream processing?
??x
The primary purpose of window assignment is to place a record into one or more windows, thereby combining the window definition with the user-assigned key for that record. This process results in an implicit composite key used at grouping time, which drives how data are grouped and aggregated.
x??

---

#### Window Merging
Background context explaining the concept. The effect of window merging is more complex than simple window assignment but still straightforward when considering logical operations. In a stream processing system, when grouping records into windows that can merge, the system must account for all possible merges involving the same key.

:p What is the impact of window merging on data grouping?
??x
Window merging impacts data grouping by requiring the system to consider all windows sharing the same key and potentially merging with new incoming data. This means that when a new element arrives, the system needs to determine which existing windows can merge with it and handle these merges atomically.

For example, in a batch engine, window merging might result in multiple mutations to the table:
1. Delete unmerged windows.
2. Insert merged windows.

This process ensures strong consistency for correctness guarantees.
x??

---

#### Streams and Tables View
Background context explaining the concept. The streams and tables view shows how data processing operates on both streaming and batch engines, where grouping by key and window is a core operation. In this view, each group of records in a stream forms a window, which is then processed to create a table.

:p How does the streams and tables view differ from an event-time/processing-time view?
??x
The streams and tables view differs from the event-time/processing-time view by focusing on how data are grouped into windows and transformed into tables. In the streams and tables view, each group of records in a stream forms a window, which is then processed to create a table. This view highlights the grouping operations that occur during stream processing and their impact on table creation.

For instance, if we have two windows (A and B) for a key, the system will first group all data by the key and then merge any overlapping or contiguous windows A and B into a single window.
x??

---

#### Hierarchical Key in Window Merging
Background context explaining the concept. In window merging, the system treats the user-assigned key and the window as part of a hierarchical composite key to handle complex grouping operations.

:p How does the system treat keys and windows during window merging?
??x
During window merging, the system treats the user-assigned key and the window as part of a hierarchical composite key. This allows the system to first group data by the root of the hierarchy (the user-assigned key) and then proceed with grouping by window within that key.

For example:
1. Grouping by key: User-assigned key
2. Merging windows: Window as a child component of the user-assigned key

This hierarchical treatment enables the system to handle complex merging operations efficiently.
x??

---

#### Atomicity/Parallelization in Window Merging
Background context explaining the concept. The atomicity and parallelization units are defined based on keys rather than key+window, ensuring strong consistency for correctness guarantees.

:p Why do systems that support window merging typically define the unit of atomicity as key?
??x
Systems that support window merging typically define the unit of atomicity as the key rather than key+window to ensure strong consistency. This is because the merging operation must inspect all existing windows for a given key, determine which can merge with new incoming data, and then commit these merges atomically.

By treating keys as the atomic units, systems can manage the complexity of window merging more efficiently while maintaining correctness guarantees.
x??

---

#### Window Merging Semantics
Background context explaining the concept. Detailed semantics of how window merging affects table mutations and changelogs over time.

:p How does window merging affect the changelog that dictates a table's contents?
??x
Window merging affects the changelog by modifying it to reflect the merged state of windows. For non-merging windows, each new element being grouped results in a single mutation (adding the element to its key+window group). However, with merging windows, grouping a new element can result in one or more existing windows merging with the new window.

The system must inspect all existing windows for a given key, determine which can merge with the new window, and then atomically commit deletes for unmerged windows while inserting the merged window into the table. This ensures that the changelog accurately reflects the current state of the data.
x??

---

