# High-Quality Flashcards: 2B002---Fundamentals-of-Data-Engineering_processed (Part 22)


**Starting Chapter:** Time to Live. Message Size. Consumer Pull and Push

---


---
#### Replay
Replay allows readers to request a range of messages from the history, enabling you to rewind your event history to a particular point in time. This feature is crucial for reingesting and reprocessing data over specific periods.

:p How does replay function in streaming ingestion platforms?
??x
Replay functions by allowing users to specify a range of historical events they want to retrieve and process again. For example, if you need to rerun the processing logic on messages that were ingested between two timestamps, you can use the replay functionality provided by your stream-ing platform.

In Kafka, this can be achieved using the `kafka-console-consumer` tool with the appropriate topic and timestamp parameters:

```shell
bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --from-beginning --topic my-topic \
--property print.key=false --property key.separator= \
--property print.value=true --property value.separator= \
--timestamp 1633072800000 # Unix timestamp in milliseconds
```

x??

---
#### Time to Live (TTL)
The time-to-live (TTL) parameter determines how long event records will be preserved before they are automatically discarded. This is a critical configuration for managing backpressure and the volume of unprocessed events.

:p What impact does TTL have on an event-ingestion pipeline?
??x
TTL impacts the balance between data availability and processing efficiency in your pipeline:

- **Short TTLs**: Messages may disappear too soon, preventing them from being fully processed. This can cause issues if a message was only partially ingested or if downstream processes depend on complete data.
  
- **Long TTLs**: Messages stay alive for extended periods, leading to potential backlogs of unprocessed messages and increasing wait times.

A well-balanced TTL ensures that events are available long enough for necessary processing while minimizing storage costs and avoiding unnecessary delays. For instance, in Google Cloud Pub/Sub, the maximum retention period is 7 days, which can be adjusted based on specific needs:

```java
// Pseudocode to set TTL in a managed service like Google Cloud Pub/Sub
Message message = publisher.publish(topicName, data);
message.getMessageId().ackDeadlineSecs = 60; // Set ack deadline (TTL) to 1 minute
```

x??

---
#### Message Size
Message size is another crucial parameter that must be considered when using streaming frameworks. The maximum message size defines the upper limit of data you can send in a single event.

:p What are the limitations and configurations for message sizes in Amazon Kinesis?
??x
Amazon Kinesis supports a maximum message size of 1 MB by default. However, this limit can be increased up to 20 MB or more through configuration settings:

```java
// Pseudocode to set message size in Kinesis
PutRecordRequest request = new PutRecordRequest();
request.setStreamName("my-stream");
request.setData(ByteBuffer.wrap(data.getBytes())); // Set data within the limits (up to 20MB)
```

You can adjust these configurations based on your specific requirements, ensuring that messages do not exceed the maximum size limit.

x??

---
#### Error Handling and Dead-Letter Queues
Error handling mechanisms are essential for managing events that fail to be ingested. When an event fails due to issues such as sending it to a non-existent topic or exceeding message size limits, these events should be rerouted to a separate location known as a dead-letter queue (DLQ).

:p How do you handle failed messages in Kafka?
??x
In Kafka, when a message fails to be ingested due to errors like being sent to an invalid topic, it can be rerouted and stored in a DLQ. This allows for later manual inspection or reprocessing of the failed events.

Here's how you might configure a dead-letter queue using `kafka-console-consumer`:

```shell
bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --from-beginning --topic dlq-topic \
--property print.key=false --property key.separator= \
--property print.value=true --property value.separator=
```

This consumer will listen for messages in the DLQ and output them, allowing you to inspect or reprocess these failed events.

x??

---


---
#### Java Virtual Machine (JVM)
The JVM is a standard, portable virtual machine that supports running compiled code. It offers performance through just-in-time (JIT) compilation and is used extensively for cross-platform applications due to its portability across hardware architectures and operating systems.
:p What is the role of the Java Virtual Machine (JVM)?
??x
The Java Virtual Machine acts as a runtime environment that executes bytecode, ensuring code written in Java or compatible languages can run on any platform where a JVM implementation is available. It provides memory management, security, and performance optimizations through JIT compilation.
```java
public class Example {
    public static void main(String[] args) {
        // The JVM compiles this to machine code at runtime using JIT.
    }
}
```
x??

---
#### Just-In-Time (JIT) Compiler
The just-in-time compiler is a component of the Java Virtual Machine that compiles bytecode into native machine code at runtime, enhancing performance by executing optimized versions of frequently used methods directly on the underlying hardware.
:p What does the JIT compiler do in the context of JVM?
??x
The JIT compiler takes compiled Java bytecode and converts it into machine-specific instructions before execution. This process is performed dynamically based on method usage frequency to optimize performance. Here's a simplified example:
```java
public class Example {
    public static void main(String[] args) {
        long start = System.currentTimeMillis();
        
        // Method that might be JIT-compiled during its frequent calls.
        for (int i = 0; i < 1000000; i++) {
            doSomething(i);
        }
        
        long end = System.currentTimeMillis();
        System.out.println("Time taken: " + (end - start) + " ms");
    }

    private static void doSomething(int i) {
        // Some method implementation.
    }
}
```
x??

---
#### JDBC vs. ODBC
JDBC (Java Database Connectivity) and ODBC (Open Database Connectivity) are standards for accessing databases from Java applications, providing portability across different operating systems and architectures. While ODBC requires separate binaries for each architecture/OS version, JDBC is compatible with any JVM language and framework.
:p How does JDBC compare to ODBC in terms of compatibility?
??x
JDBC offers better cross-platform compatibility because it works seamlessly with any JVM language (Java, Scala, Clojure, Kotlin) and data frameworks like Spark. In contrast, ODBC necessitates separate binaries for different operating systems and architectures, requiring more maintenance from the vendor.
```java
// Example JDBC connection setup
public class DatabaseConnection {
    public static Connection connectToDatabase() throws SQLException {
        String url = "jdbc:mysql://localhost:3306/mydatabase";
        String username = "root";
        String password = "password123";
        
        return DriverManager.getConnection(url, username, password);
    }
}
```
x??

---
#### Parallel Data Ingestion
Parallel data ingestion involves using multiple simultaneous connections to a database to pull data in parallel, which can significantly speed up the process. However, this approach increases load on the source database.
:p How does parallel data ingestion work?
??x
Parallel data ingestion allows reading and processing data from multiple sources concurrently, reducing overall data ingestion time. This is achieved by creating and managing multiple connections that operate simultaneously. While it speeds up the process, it can also increase the load on the source database.
```java
public class ParallelIngestion {
    public static void main(String[] args) throws SQLException {
        int numConnections = 5; // Number of parallel connections to create
        List<Connection> connections = new ArrayList<>();
        
        for (int i = 0; i < numConnections; i++) {
            connections.add(DatabaseConnection.connectToDatabase());
        }
        
        // Process data from each connection concurrently.
    }
}
```
x??

---
#### Change Data Capture (CDC)
Change Data Capture is the process of ingesting changes made to a database, such as updates or inserts. It's commonly used in analytics and data warehousing applications where real-time or near-real-time data processing is required.
:p What is change data capture (CDC)?
??x
Change Data Capture (CDC) captures modifications in a source database system for further analysis or processing. For example, it can be used to periodically or continuously ingest table changes from a PostgreSQL database for analytics purposes. This process helps maintain up-to-date data without manual intervention.
```java
public class CDCExample {
    public static void main(String[] args) throws SQLException {
        Connection sourceDB = DatabaseConnection.connectToDatabase();
        
        // SQL statement to capture changes in the database
        String sql = "SELECT * FROM table WHERE version_column > last_version";
        
        try (Statement stmt = sourceDB.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                // Process each row of changed data.
            }
        }
    }
}
```
x??

---


#### CDC Replication and Asynchronous Considerations
CDC (Change Data Capture) replication involves capturing changes made to a database and replicating them to another database. This method is crucial for maintaining data consistency across different systems, especially important for analytical applications that need real-time or near-real-time data.

Asynchronous CDC allows the replica to be delayed slightly from the primary database, making it suitable for environments where this delay does not significantly impact operations. It provides a loosely coupled architecture pattern, which can direct events to various targets like object storage and streaming analytics processors simultaneously.

However, asynchronous CDC is not without its drawbacks. It consumes resources such as memory, disk bandwidth, storage, CPU time, and network bandwidth on the primary database. Therefore, engineers must conduct thorough tests before deploying CDC in production environments to avoid operational issues.

:p What are the key considerations for implementing asynchronous CDC replication?
??x
Key considerations include resource consumption on the primary database (memory, disk bandwidth, storage, CPU time, and network bandwidth), testing in a non-production environment to ensure stability, and understanding that slight delays may be acceptable due to its loosely coupled nature. Additionally, engineers must balance the need for real-time data with potential operational impacts.
x??

---

#### API Data Ingestion Challenges
APIs play a significant role as data sources, particularly in organizations with numerous external data sources such as SaaS platforms or partner companies. However, there is no standardized method for exchanging data over APIs, leading to challenges like reading documentation and writing maintenance-heavy code.

To address these challenges, three trends are emerging: 
1. API client libraries that simplify access by various programming languages.
2. Data connector platforms providing turnkey solutions with frameworks for custom connectors.
3. Data sharing through platforms like BigQuery, Snowflake, Redshift, or S3, which facilitate storing and processing data without the need for direct API access.

:p How can engineers reduce time spent on API connection code?
??x
Engineers can leverage existing managed services and API client libraries that provide standardized solutions, reducing the need to write custom connectors from scratch. Managed services often support building custom API connectors with standard formats or in serverless function frameworks like AWS Lambda, which handle scheduling and synchronization. This approach saves time and resources.
x??

---

#### Message Queues and Event-Streaming Platforms
Message queues and event-streaming platforms are essential for ingesting real-time data from web applications, mobile apps, IoT sensors, and smart devices. They allow events to be consumed at the individual event level or aggregated into ordered logs.

Messages handle events individually and transiently, acknowledging and removing them once processed. Streams, on the other hand, ingest events into an ordered log that persists for extended periods, allowing complex queries and transformations over time.

:p What is the main difference between messages and streams?
??x
The main difference lies in their handling of data:
- **Messages**: Handle individual events transiently; once consumed, they are acknowledged and removed from the queue.
- **Streams**: Ingest events into an ordered log that can persist for long periods, enabling complex queries, aggregations, and transformations over time.

Example Code (Pseudocode):
```pseudocode
if message:
    process_message(message)
else if stream:
    process_stream(stream)
```
x??

---

#### Managed Data Connectors Overview
Managed data connectors are services that provide pre-built connectors for various data sources, eliminating the need for custom development. These platforms offer turnkey solutions with frameworks for writing and managing custom connectors.

They support various ingestion methods like CDC (Change Data Capture), replication, truncate and reload, and allow setting permissions, credentials, and update frequencies to begin syncing data automatically. Vendors or cloud providers manage and monitor data syncs, alerting on failures with detailed error logs.

:p When should engineers consider using managed data connectors?
??x
Engineers should consider using managed data connectors when there are well-supported data sources that don't require custom development, as it saves time and resources. Managed services can provide standard API technical specifications or run connector code in serverless function frameworks while handling scheduling and synchronization details.

This approach is particularly valuable for high-value work where engineers can focus on more critical tasks.
x??

---

