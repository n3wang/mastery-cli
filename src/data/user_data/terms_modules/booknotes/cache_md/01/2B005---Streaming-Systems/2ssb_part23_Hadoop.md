# High-Quality Flashcards: 2B005---Streaming-Systems_processed (Part 23)


**Starting Chapter:** Hadoop

---


#### MapReduce Overview
MapReduce introduced a simple and scalable programming model for processing large datasets. It abstracts away complex distributed system details, allowing developers to focus on writing map and reduce functions.

:p What does MapReduce provide that makes it suitable for massive-scale data processing?
??x
MapReduce provides a straightforward API where users can define mapping and reducing functions. This abstraction allows the underlying system to handle the complexities of distributing tasks across multiple nodes and managing distributed storage, making it easier to process big data.

```java
// Pseudocode for MapReduce job
public void runJob() {
    // Step 1: Map phase - Process input records into key-value pairs.
    List<Output> outputs = mapFunction(inputRecords);

    // Step 2: Shuffle and sort - Combine similar keys from the map phase, then sort them.
    Map<Key, List<Value>> groupedOutputs = shuffleAndSort(outputs);

    // Step 3: Reduce phase - Process the grouped key-value pairs to produce final results.
    Map<Key, Value> reducedResults = reduceFunction(groupedOutputs);
}
```
x??

---

#### Hadoop Introduction
In 2005, Doug Cutting and Mike Cafarella developed Hadoop based on the MapReduce model. Their goal was to create a distributed web crawler using an existing version of Google’s distributed filesystem (later named HDFS).

:p What triggered the development of Hadoop?
??x
Hadoop was developed in 2005 when Doug Cutting and Mike Cafarella needed a distributed system for their Nutch webcrawler project. They had already created HDFS, and adding MapReduce functionality seemed like a natural progression.

```java
// Pseudocode for basic Hadoop setup
public void setupHadoop() {
    // Step 1: Initialize HDFS file system.
    FileSystem fs = FileSystem.get(conf);
    
    // Step 2: Create or open a file in HDFS.
    FSDataOutputStream out = fs.create(new Path("/example.out"));
    
    // Step 3: Write data to the file.
    out.writeBytes("Hello, Hadoop!");
    
    // Step 4: Close the output stream and finalize operations.
    out.close();
}
```
x??

---

#### Open Sourcing Hadoop
Hadoop was open sourced in 2006 by Yahoo!, giving it a significant boost. The source code for both HDFS and MapReduce was made available under an Apache license.

:p Why did Yahoo! decide to open source Hadoop?
??x
Yahoo! decided to open source Hadoop because they believed in the power of community-driven development and wanted to accelerate innovation by making Hadoop’s source code publicly accessible. This move helped establish Hadoop as a robust, widely-used framework for big data processing.

```java
// Pseudocode for opening Hadoop
public void openHadoop() {
    // Step 1: Set up the Hadoop configuration.
    Configuration conf = new Configuration();
    
    // Step 2: Initialize the FileSystem and start using it.
    FileSystem fs = FileSystem.get(conf);
    
    // Step 3: Perform operations on files in the HDFS.
    Path[] paths = fs.listFiles(new Path("/"));
    for (Path path : paths) {
        System.out.println(path.getName());
    }
}
```
x??

---

#### Growth of the Hadoop Ecosystem
With Yahoo!’s support, Hadoop attracted significant attention and contributed to the growth of an ecosystem of open-source data processing tools. The community-driven development model further propelled its adoption.

:p How did the ecosystem surrounding Hadoop grow?
??x
The open sourcing of Hadoop led to a rapid expansion of its ecosystem as developers from around the world contributed additional tools, libraries, and enhancements. This collaborative approach fostered innovation and made Hadoop an integral part of many big data solutions.

```java
// Pseudocode for adding a tool to Hadoop
public void addTool() {
    // Step 1: Define a custom MapReduce job.
    JobConf conf = new JobConf();
    
    // Step 2: Add the path to your custom Hadoop tool jar file.
    FileInputFormat.addInputPath(conf, new Path("/input"));
    FileOutputFormat.setOutputPath(conf, new Path("/output"));
    
    // Step 3: Run the job with the added tool.
    JobClient.runJob(conf);
}
```
x??

---


#### Spark's Origins and Early Success
Background context: Apache Spark was developed around 2009 at UC Berkeley's AMPLab. It gained fame due to its ability to perform most calculations in memory, significantly improving performance over traditional Hadoop jobs by leveraging Resilient Distributed Datasets (RDDs). RDDs capture the lineage of data and allow for efficient recomputation after failures.

:p What was Spark’s initial contribution that made it famous?
??x
Spark's initial contribution was its ability to perform most calculations in memory, significantly improving performance over traditional Hadoop jobs. This was achieved using Resilient Distributed Datasets (RDDs), which capture the lineage of data and allow for efficient recomputation after failures.
x??

---

#### Spark Streaming Introduction
Background context: Tathagata Das, a graduate student at UC Berkeley’s AMPLab, realized that Spark's fast batch processing engine could be repurposed to handle streaming data. This led to the development of Spark Streaming in 2013.

:p How did Spark Streaming come into existence?
??x
Spark Streaming came into existence when Tathagata Das, a graduate student at UC Berkeley’s AMPLab, realized that Spark's fast batch processing engine could be repurposed to handle streaming data. This insight led to the development of Spark Streaming.
x??

---

#### Processing-Time Windowing in Spark Streaming
Background context: Spark Streaming initially supported only processing-time windowing, which was a significant limitation for use cases requiring event time or handling late data.

:p What was the main limitation of the original version of Spark Streaming?
??x
The main limitation of the original version of Spark Streaming (1.x variants) was that it provided support only for processing-time windowing. This meant that any use case that cared about event time, needed to deal with late data, or required out-of-order data could not be handled out of the box without additional user-implemented code.
x??

---

#### Microbatch vs True Streaming Debate
Background context: Spark Streaming uses a microbatch approach, which has been criticized for being less flexible than true streaming engines. However, its performance in terms of latency and throughput is still quite good.

:p What is the primary criticism against Spark Streaming’s microbatch architecture?
??x
The primary criticism against Spark Streaming's microbatch architecture is that it processes data at a global level, which limits flexibility compared to true streaming engines. Critics argue that this approach cannot achieve both low per-key latency and high overall throughput simultaneously.
x??

---

#### Spark Streaming's Impact on Stream Processing
Background context: Spark Streaming provided strong consistency semantics for in-order data or event-time-agnostic computations, making it a significant milestone in stream processing.

:p What was the key contribution of Spark Streaming to the field of stream processing?
??x
The key contribution of Spark Streaming was that it offered strong consistency semantics for in-order data or event-time-agnostic computations. This made it the first publicly available large-scale stream processing engine with correctness guarantees akin to batch systems.
x??

---

#### Current State of Spark and Spark Streaming
Background context: As of today, Spark 2.x variants are expanding on Spark Streaming's semantic capabilities while addressing some of its limitations through a new true streaming architecture.

:p What is the current direction of development for Spark?
??x
The current direction of development for Spark includes expanding on Spark Streaming’s semantic capabilities in Spark 2.x variants. These newer versions incorporate many parts of the model described in this book and attempt to simplify complex pieces. Additionally, there are efforts to develop a new true streaming architecture to address microbatch criticisms.
x??

---


#### MillWheel Overview
Background context explaining the concept of MillWheel and its initial focus. MillWheel was Google’s original, general-purpose stream processing architecture founded by Paul Nordstrom around when Google opened its Seattle office in 2008.

:p What is MillWheel?
??x
MillWheel is a stream processing architecture developed at Google that originally aimed for low-latency data processing with weak consistency but later shifted to support strong consistency and robust out-of-order processing due to customer needs. It’s well known for providing exactly-once guarantees, persistent state, watermarks, and persistent timers.
x??

---

#### Exactly-Once Guarantees
Background context explaining the importance of exactly-once guarantees in stream processing pipelines. These guarantees ensure that each message is processed only once, which is crucial for correctness.

:p What are exactly-once guarantees?
??x
Exactly-once guarantees ensure that each message in a stream is processed precisely one time, preventing both duplication and omission. This is critical to maintaining the integrity of long-running pipelines executing on unreliable hardware.
x??

---

#### Persistent State
Background context explaining persistent state's role in maintaining correctness across pipeline executions. Persistent state helps maintain consistency even when hardware failures occur.

:p What is persistent state?
??x
Persistent state refers to the ability to store and recover data consistently, ensuring that the state of a stream processing pipeline remains intact despite hardware failures or restarts. This feature provides the foundation for maintaining long-term correctness.
x??

---

#### Watermarks
Background context explaining watermarks' role in reasoning about out-of-order input data. Watermarks help track progress and completeness of input streams.

:p What are watermarks?
??x
Watermarks are used to track the known progress or completeness of inputs being provided to a stream processing system, especially useful for handling out-of-order data. They allow the system to determine when it has seen enough data to make accurate decisions about the state of an input.
x??

---

#### Persistent Timers
Background context explaining persistent timers' role in linking watermarks with pipeline business logic. Persistent timers help manage time-based operations crucial for anomaly detection and other use cases.

:p What are persistent timers?
??x
Persistent timers enable the tracking of time across multiple processing cycles, which is essential for managing state that depends on elapsed time. They provide a link between watermarks and the pipeline’s business logic, ensuring accurate timing even when data arrives out-of-order.
x??

---

#### True Streaming Use Cases
Background context explaining the difference between true streaming use cases and materialized view semantics. True streaming use cases require continuous processing and immediate responses, while materialized views are suitable for periodic updates.

:p What are true streaming use cases?
??x
True streaming use cases involve scenarios where results need to be processed and consumed in real-time, such as anomaly detection or generating live analytics. These use cases require continuous, record-by-record processing and immediate response times rather than batch updates.
x??

---

#### Zeitgeist Pipeline Example
Background context explaining the specific needs of the Zeitgeist pipeline for anomaly detection. The pipeline required a way to identify anomalies without polling an output table.

:p What was the challenge faced by the Zeitgeist pipeline?
??x
The Zeitgeist pipeline faced the challenge of identifying anomalies in search query traffic, particularly for anomalous dips (decreases in query traffic). It needed a mechanism that could accurately detect these anomalies based on the completeness of input data without relying on processing-time delays.
x??

---

#### Watermarks and Input Completeness
Background context explaining how watermarks track input completeness. Watermarks help in dealing with out-of-order data by providing a metric for reasoning about the progress of inputs.

:p How do watermarks work?
??x
Watermarks work by tracking the known progress or completeness of inputs, allowing the system to determine when it has seen enough data to make accurate decisions. For simple sources, perfect watermarks can be computed; for complex sources, heuristics are used.
x??

---

#### MillWheel Paper and Contributions
Background context explaining the focus of the "MillWheel: Fault-Tolerant Stream Processing at Internet Scale" paper. The paper highlights challenges in providing correctness in a system like MillWheel.

:p What does the MillWheel paper focus on?
??x
The MillWheel paper focuses on the difficulties of providing correctness in systems like MillWheel, particularly emphasizing consistency guarantees and watermarks as key areas of focus.
x??

---

