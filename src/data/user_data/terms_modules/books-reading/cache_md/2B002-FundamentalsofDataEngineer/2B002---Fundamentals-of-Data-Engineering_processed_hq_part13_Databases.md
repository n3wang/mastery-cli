# High-Quality Flashcards: 2B002---Fundamentals-of-Data-Engineering_processed (Part 13)

**Rating threshold:** >= 8/10

**Starting Chapter:** Databases

---

**Rating: 8/10**

---
#### Message Concept
Messages are raw data communicated between two or more systems. They can be sent from a publisher to a consumer through a message queue. Once delivered, messages are typically removed from the queue.

:p What is a message in the context of data engineering?
??x
A message is raw data that is transmitted across multiple systems. It is often used in event-driven architectures where one system sends information (e.g., temperature readings) to another for processing or action.
??x

---
#### Stream Concept
Streams are append-only logs of event records, meaning they accumulate events in an ordered sequence over time. They are stored in event-streaming platforms and can be persisted over weeks or months.

:p What is a stream?
??x
A stream is a continuous log of events that are recorded chronologically and stored in event-streaming platforms. Events are added to the end of the stream but cannot be removed, hence "append-only." This allows for long-term storage and analysis.
??x

---
#### Message vs Stream Comparison
Messages and streams serve different purposes within data systems. Messages are discrete signals used for real-time processing or actions based on single events, whereas streams handle continuous event data suitable for complex operations like aggregations.

:p What distinguishes a message from a stream?
??x
A message is a singular signal sent between systems in an event-driven system, often processed immediately after delivery. A stream, however, is a continuous log of events that can be processed over time due to its persistent storage and append-only nature.
??x

---
#### Event Time Concept
Event time refers to the timestamp when an event is generated in the source system. It is crucial for understanding the context of the data being ingested, especially in streams where events are continuous.

:p What is event time?
??x
Event time indicates the actual moment an event occurred in the source system, usually marked by a timestamp. This is particularly important when dealing with streaming data to understand when the event happened.
??x

---
#### Ingestion and Processing Time Concept
In data processing, ingestion time refers to when an event enters the system for processing, while process time indicates how long it takes to process that event. These are key aspects of tracking the lifecycle of a data event.

:p What does ingestion and process time refer to in data systems?
??x
Ingestion time is the moment when an event is received by a system, whereas process time is the duration required to process that event. Together, they help track the lifecycle of a data event from creation to processing.
??x

---

**Rating: 8/10**

---
#### Ingestion Time
Background context explaining when ingestion time occurs. It indicates when an event is ingested from source systems into a message queue, cache, memory, object storage, a database, or any place else that data is stored.

:p What does ingestion time indicate?
??x
Ingestion time signifies the moment when data from source systems is first received and stored in some form of data repository. This can be anywhere from a message queue to an object storage system.
x??

---
#### Process Time
Background context explaining process time, which occurs after ingestion time, indicating how long it takes for data to be processed or transformed.

:p What does process time indicate?
??x
Process time refers to the duration taken by the system to process (typically transform) ingested data. This is measured in seconds, minutes, hours, etc., and indicates the latency of processing within your data pipeline.
x??

---
#### Database Management System (DBMS)
Background context explaining what a DBMS is, including its components such as storage engine, query optimizer, disaster recovery.

:p What is a database management system?
??x
A database management system (DBMS) is a software system used to store and serve data. It comprises several key components: a storage engine for managing the physical storage of data, a query optimizer that determines efficient ways to retrieve information from the storage, mechanisms for handling disasters, and other critical functions like transaction management and concurrency control.
x??

---
#### Lookups in Databases
Background context explaining how databases find and retrieve data. Indexes can speed up lookups but are not present in all databases.

:p How does a database perform lookups?
??x
Databases use indexes to accelerate the process of finding and retrieving data. However, not all databases utilize indexes; those that do should have well-designed and maintained indexing strategies to optimize performance.
x??

---
#### Query Optimizer
Background context explaining what a query optimizer is and its importance in database operations.

:p What is a query optimizer?
??x
A query optimizer is an algorithm within a DBMS designed to find the most efficient way to retrieve data from the storage engine. It evaluates different execution plans for SQL queries and chooses the one with the least cost, considering factors like I/O and CPU usage.
x??

---
#### Scaling and Distribution of Databases
Background context explaining how databases scale in response to demand.

:p How does a database scale?
??x
Databases can scale either horizontally by adding more nodes to handle increased load or vertically by increasing the resources (like CPU, memory) on existing nodes. The choice depends on the specific requirements and constraints of your application.
x??

---
#### Modeling Patterns for Databases
Background context explaining different modeling patterns that work best with databases.

:p What are some common database modeling patterns?
??x
Common database modeling patterns include data normalization to reduce redundancy or wide tables which store more data in a single row, simplifying certain operations. The choice between these depends on the specific use case and performance requirements.
x??

---

**Rating: 8/10**

#### NoSQL Databases Overview
Background context explaining the limitations of relational databases and the rise of nonrelational or NoSQL databases. Discuss the term "NoSQL" and its origins, emphasizing that it stands for not only SQL and refers to a class of databases abandoning traditional relational database management systems (RDBMS) paradigms.
:p What is NoSQL and how does it differ from traditional RDBMS?
??x
NoSQL is a term used to describe a class of nonrelational or distributed databases that primarily abandon the relational model and its associated constraints, such as strong consistency, joins, and fixed schemas. The term "NoSQL" stands for "Not Only SQL," indicating that these databases are not confined to just SQL-based operations but can also handle data in various formats.

Background context emphasizes that while NoSQL databases offer benefits like improved performance, scalability, and schema flexibility, they come with trade-offs such as potential inconsistency or lack of support for complex query operations.
??x
:p Why might a company consider using a NoSQL database over an RDBMS?
??x
A company might consider using a NoSQL database over an RDBMS when the traditional relational model is not sufficient to handle specific use cases, such as handling large volumes of data, high scalability requirements, or when schema flexibility is needed. For example, social media platforms require real-time updates and fast reads/writes, which may not be efficiently handled by a traditional RDBMS.

NoSQL databases are often chosen for applications that need to scale horizontally easily, support unstructured or semi-structured data, or require eventual consistency over strong consistency.
??x
:p What historical context led to the development of NoSQL databases?
??x
The development of NoSQL databases began in the early 2000s when tech giants like Google and Amazon outgrew their relational database limitations. These companies pioneered new distributed, nonrelational databases to scale their web platforms. The term "NoSQL" was first coined by Eric Evans around this time, although the origins can be traced back to 1998.

In a 2009 blog post, Evans explained how he contributed to the name "NoSQL," but expressed regret over its vagueness, which allowed for broader interpretations than intended. The term was originally meant to describe databases designed for Big Data and linearly scalable distributed systems.
??x
:p What are some common types of NoSQL databases?
??x
Some common types of NoSQL databases include key-value, document, wide-column, graph, search, and time series databases. These databases are popular and widely adopted because they offer various benefits depending on the use case.

Key-Value Stores: Simple key-value pairs with fast read/write operations.
Document Databases: Store data in a flexible, structured JSON-like format.
Wide Column Stores: Use columns to store similar data for efficient querying.
Graph Databases: Optimize for storing and querying graph-based data.
Search Databases: Designed for full-text search capabilities.
Time Series Databases: Specialize in handling time-series data with high write performance.

These types of databases are crucial for understanding the data engineering lifecycle, as a data engineer should be familiar with their structures, usage considerations, and how to leverage them effectively.
??x
:p How might a data engineer choose between different NoSQL database types?
??x
A data engineer would choose between different NoSQL database types based on the specific requirements of the project. For example:

- **Key-Value Stores**: Suitable for applications needing fast read/write operations, such as caching layers or simple data storage.
- **Document Databases**: Ideal for storing semi-structured and unstructured data, often used in content management systems or log aggregation.
- **Wide Column Stores**: Best for scenarios where you need to store large amounts of time-series data efficiently.
- **Graph Databases**: Optimal when dealing with complex relationships between entities, such as social networks or recommendation engines.
- **Search Databases**: Useful for applications requiring advanced full-text search capabilities.
- **Time Series Databases**: Perfect for applications that need high write performance and efficient querying of time-stamped data.

Understanding these types helps in making informed decisions about which database is best suited to the task at hand.
??x
:p Why might a NoSQL database be chosen over an RDBMS?
??x
A NoSQL database might be chosen over an RDBMS when there are specific needs that traditional relational databases cannot efficiently address. Key reasons include:

- **Scalability**: NoSQL databases can scale horizontally, making them suitable for handling large amounts of data.
- **Schema Flexibility**: They support flexible schema designs and can handle unstructured or semi-structured data more easily.
- **Performance**: For real-time applications requiring fast read/write operations, NoSQL databases often offer better performance than RDBMS.
- **Complexity**: When dealing with complex queries or graph-based relationships, the overhead of SQL in RDBMS can be a disadvantage.

These characteristics make NoSQL databases particularly appealing for modern web and mobile applications that require high scalability and flexibility.

**Rating: 8/10**

#### Document Databases Overview
Background context explaining the concept. Document databases store data as structured JSON-like documents, where each document is a collection of fields and nested sub-documents. These databases support flexible schema and are optimized for querying based on specific properties.

:p What are key features of document databases?
??x
Key features include flexible schemas, rich query capabilities through indexing, and the ability to store complex data structures within single documents. Document databases often allow retrieval by specific properties using indexes.
```java
// Example code snippet in Java using a hypothetical DocumentDB class
DocumentDB db = new DocumentDB();
Document doc1 = new Document(1234, "Joe", "Reis", Arrays.asList("AC/DC", "Slayer"));
db.insert(doc1);
```
x??

---

#### Indexing in Document Databases
Background context explaining the concept. Indexing is crucial for efficient querying and retrieval of documents based on specific properties. Unlike ACID-compliant relational databases, most document stores support indexing to improve performance.

:p How do you set up an index on a property in a document database?
??x
To set up an index on a property like `name` in a document database, the following steps are typically involved:
1. Choose the property or field that needs to be indexed.
2. Create the index using the database's indexing mechanism.
3. Query the documents by this indexed property.

```java
// Example code snippet in Java using a hypothetical DocumentDB class
DocumentDB db = new DocumentDB();
Index indexName = new Index("name");
db.createIndex(indexName);
```
x??

---

#### Eventually Consistent Databases
Background context explaining the concept. In eventually consistent databases, writes are acknowledged as successful even before data is available to all nodes in the cluster. This characteristic can lead to inconsistencies but allows for high scalability and performance.

:p What does "eventually consistent" mean in a database?
??x
Eventually consistent means that after a write operation, data might not be immediately available across all nodes in the database cluster. It guarantees consistency only over time, making it suitable for applications where some temporary inconsistency can be tolerated in exchange for high scalability and performance.

```java
// Example code snippet in Java using a hypothetical DocumentDB class
DocumentDB db = new DocumentDB();
db.writeData(new Document(1236, "Alice", "Smith", Arrays.asList("The Beatles", "Rolling Stones")));
```
x??

---

#### Wide-Column Databases Overview
Background context explaining the concept. Wide-column databases are optimized for storing large amounts of data with high transaction rates and low latency. They support petabytes of data, millions of requests per second, and sub-millisecond latencies.

:p What are the key characteristics of wide-column databases?
??x
Key characteristics include:
- High write rates and vast storage capacity.
- Extremely low latency.
- Support for petabytes of data and millions of requests per second.

```java
// Example code snippet in Java using a hypothetical WideColumnDB class
WideColumnDB db = new WideColumnDB();
db.insertRow(1234, "first", "Joe");
db.insertRow(1234, "last", "Reis");
```
x??

---

#### Schema Design for Wide-Column Databases
Background context explaining the concept. Proper schema design is critical in wide-column databases to optimize performance and avoid common operational issues like hotspots.

:p How do you design a suitable schema for a wide-column database?
??x
Designing a suitable schema involves:
1. Choosing an appropriate row key that balances uniqueness and query efficiency.
2. Normalizing data where possible but avoiding unnecessary joins.
3. Using counters or specific columns to track aggregate values if needed.

```java
// Example code snippet in Java using a hypothetical WideColumnDB class
WideColumnDB db = new WideColumnDB();
db.setRowKey(1234, "Joe_Reis");
db.addColumn(1234, "favorite_bands", Arrays.asList("AC/DC", "Slayer"));
```
x??

---

**Rating: 8/10**

#### Rapid Scan Databases
Rapid scan databases support rapid scans of massive amounts of data but do not support complex queries. They typically use a single index (the row key) for lookups, making them inefficient for complex querying scenarios.

:p What are the limitations of rapid scan databases?
??x
These databases are limited in their ability to handle complex queries due to their design focused on rapid scanning rather than intricate data manipulation and retrieval. They rely heavily on primary keys or single indexing mechanisms like row keys, which do not support multi-level traversals or complex joins.

For example:
```java
// Example of a simple scan operation using a row key in Java
public class SimpleScanExample {
    public void performScan(String rowKey) {
        // Logic to retrieve data based on the row key
        System.out.println("Scanning for row: " + rowKey);
    }
}
```
x??

---

#### Graph Databases
Graph databases store and process data in a graph structure, consisting of nodes (representing entities or objects) and edges (representing relationships between these entities). This makes them well-suited for scenarios where understanding the connectivity between elements is crucial.

:p What type of scenario would benefit most from using a graph database?
??x
Scenarios involving complex relationships and traversals are ideal for graph databases. For example, in social media applications, determining connections or paths between users (friend circles, recommendations) requires understanding the graph structure rather than simple key-value lookups.

For instance:
```java
// Example of representing a user's connection in Neo4j using Cypher query language
public class UserConnectionExample {
    public void addUserConnection(String user1, String user2) {
        // Using Cypher to create a relationship between two users
        String cypherQuery = "CREATE (u1:User {name: $user1})-[:FOLLOWS]->(u2:User {name: $user2})";
        // Execute the query
    }
}
```
x??

---

#### Search Databases
Search databases are designed for fast, complex text search and log analysis. They excel in scenarios requiring semantic and structural characteristic matching, such as keyword searches or anomaly detection.

:p What types of use cases can benefit from a search database?
??x
Use cases that involve searching large bodies of text for keywords, phrases, or semantically similar matches are well-suited to search databases. Examples include product search on e-commerce sites, real-time monitoring in operational contexts, and security analytics. These systems are optimized for index-based searches, enabling quick retrieval of relevant data.

For instance:
```java
// Example of a text search using Elasticsearch in Java
public class TextSearchExample {
    public List<String> searchText(String query) {
        // Using Elasticsearch client to perform a text search
        String searchQuery = "GET /products/_search?q=" + query;
        // Execute the search and return matching documents
        return executeSearch(searchQuery);
    }

    private List<String> executeSearch(String query) {
        // Code for executing the search and processing results
        return new ArrayList<>();
    }
}
```
x??

---

#### Time Series Databases
Time series databases are optimized for handling and analyzing time-ordered data, such as stock prices or weather sensor readings. They support efficient retrieval and statistical processing of temporal data.

:p What is a key feature of time series databases?
??x
A key feature of time series databases is their ability to efficiently store and retrieve data that is organized by time. This allows for real-time monitoring and analysis, making them ideal for applications where the timing of events is critical, such as financial markets or environmental monitoring.

For instance:
```java
// Example of storing a time series data point in a database
public class TimeSeriesDataExample {
    public void storeTemperature(double temperature, String timestamp) {
        // Code to insert a temperature reading at a specific timestamp into the database
        System.out.println("Stored: Temperature " + temperature + " at " + timestamp);
    }
}
```
x??

---

**Rating: 8/10**

#### Time-Series Databases Overview
Time-series databases are specialized for handling data generated at regular intervals or events, often used in IoT and log-based applications. They handle high write volumes and support fast read/write operations through memory buffering.

:p What is a time-series database?
??x
A time-series database is designed to store and manage large volumes of timestamped data from sensors, logs, or other event-based systems. These databases optimize for high write throughput and fast access times by using in-memory buffers and efficient storage mechanisms.
x??

---

#### Measurement vs. Event-Based Data
Measurement data are regularly generated, like sensor readings (temperature), while event-based data is irregular, such as motion detection.

:p How do measurement and event-based data differ?
??x
Measurement data typically comes from sensors that generate regular updates at fixed intervals or based on specific conditions, whereas event-based data is created sporadically when a particular event occurs. For example, temperature readings are continuous measurements, while a motion sensor triggers an event only when it detects movement.
x??

---

#### Schema Characteristics of Time-Series Databases
Time-series databases typically store a timestamp and a few key fields, with the data ordered by timestamps.

:p What is typical schema for time-series databases?
??x
The schema in time-series databases usually includes a timestamp and a small set of fields. The data is ordered based on the timestamp, making it ideal for operational analytics but less suitable for business intelligence (BI) use cases.
x??

---

#### Time-Series Databases Use Cases
Time-series databases are used in various applications like IoT, event logs, ad tech, and fintech where real-time data processing and storage are critical.

:p In which scenarios would you typically use a time-series database?
??x
You would typically use a time-series database for applications involving high-frequency data collection from devices (IoT), monitoring systems (ad tech, fintech), and log management. These databases excel in handling write-heavy workloads with fast read/write access.
x??

---

#### REST API Paradigm
REST stands for representational state transfer, defined by Roy Fielding in his PhD dissertation. It uses HTTP verbs like GET and PUT to make interactions stateless.

:p What is REST?
??x
REST (Representational State Transfer) is an architectural style for designing networked applications that defines principles and constraints for creating scalable web services. It leverages the HTTP protocol to manage statelessness, where each interaction operates independently without maintaining session-specific state.
x??

---

#### Stateless vs. Stateful Interactions in REST
In contrast to traditional sessions with associated state variables, REST interactions are stateless; they operate on a global system state rather than per-session state.

:p What is the key feature of stateless interactions in REST?
??x
The key feature of stateless interactions in REST is that each request from any client contains all the information needed by the server to understand and complete the request. There is no session or state maintained on the server, meaning each interaction operates independently.
x??

---

#### Client Libraries for REST APIs
Client libraries help developers interact with REST APIs more easily, handling tasks like authentication and mapping methods.

:p What role do client libraries play in interacting with REST APIs?
??x
Client libraries simplify interactions with REST APIs by abstracting away details such as authentication mechanisms and HTTP method mappings. They provide a higher-level API that makes it easier to work with the underlying implementation.
x??

---

#### GraphQL vs. REST
GraphQL allows for more flexible queries over multiple data models, whereas REST restricts query results to a specific model.

:p How does GraphQL differ from REST?
??x
GraphQL provides a query language for fetching data in a structured manner that can retrieve multiple data models in a single request, offering more flexibility compared to REST, which typically follows a predefined schema and returns only the specified data.
x??

---

#### Data Ingestion Pipelines with APIs
Setting up data ingestion pipelines from REST or GraphQL APIs involves using client libraries and managing synchronization tasks.

:p What tools can help set up data ingestion pipelines?
??x
Various tools, including client libraries for specific languages (like Python) and services like SaaS connectors or open-source libraries, simplify the setup of data ingestion pipelines. These tools handle tasks such as authentication, mapping API methods to classes, and managing data synchronization.
x??

---

**Rating: 8/10**

#### Webhooks
Background context: Webhooks are a simple event-based data-transmission pattern where, when specific events happen in the source system, this triggers a call to an HTTP endpoint hosted by the data consumer. This is often referred to as "reverse APIs" because the connection goes from the source system to the data sink, rather than the typical API model which moves in the opposite direction.
:p What are webhooks and how do they differ from traditional APIs?
??x
Webhooks enable a source system to send data to a consumer through an HTTP endpoint when specific events occur. They allow for real-time updates and notifications as opposed to periodic polling or checks that traditional APIs might perform.

They differ from typical APIs in that:
- Webhooks are triggered by events, while APIs are usually called explicitly.
- Webhooks can be bidirectional (though often used unidirectionally), while most APIs are request-response.
- Webhooks send data directly when an event is fired, whereas APIs typically return a response after receiving a request.

Example of a webhook implementation:
```java
public class WebhookListener {
    public void handleEvent(String eventData) {
        // Code to process the incoming event and possibly trigger downstream processes
    }
}
```
x??

---
#### Reverse APIs
Background context: Reverse APIs, as mentioned in the text, refer to webhooks which are a type of API connection where data is sent from the source system to the data consumer. This contrasts with traditional client-server APIs where the client initiates requests and the server responds.
:p What do reverse APIs (webhooks) do?
??x
Reverse APIs (webhooks) allow data consumers to receive notifications or updates directly when specific events occur in the source system. They are "push" mechanisms, sending data to the consumer rather than requiring the consumer to make periodic requests.

Example of a webhook being used:
```java
public class DataConsumer {
    public void registerWebhook(EventHandler handler) {
        // Code to register the event handler to receive notifications when events occur
    }
}
```
x??

---
#### RPC and gRPC
Background context: Remote Procedure Call (RPC) is a programming paradigm in distributed computing, allowing you to run procedures on remote systems as if they were local. gRPC is an open-source framework for building efficient, modern, and high-performance services that use the HTTP/2 protocol.
:p What is gRPC?
??x
gRPC is a high-performance, open-source framework developed by Google for building robust distributed systems. It uses the Protocol Buffers data format to serialize messages and relies on HTTP/2 for transport.

Key features of gRPC include:
- Bidirectional streaming over a single TCP connection.
- Efficient use of CPU, power, battery life, and bandwidth through optimized protocols.
- Common client libraries available in multiple languages.

Example of a simple gRPC service definition:
```proto
syntax = "proto3";

package calculator;

service Calculator {
    rpc Multiply (Request) returns (Response);
}

message Request {
    int64 a = 1;
    int64 b = 2;
}

message Response {
    int64 result = 1;
}
```
x??

---
#### Message Queues and Event Streams
Background context: Message queues are used to ingest data at high velocity and volume, often in the context of event-driven architectures. They allow for decoupling between systems by queuing messages until a receiver is ready to process them.
:p What role do message queues play?
??x
Message queues act as intermediaries that temporarily store messages from producers (e.g., source systems) before they are processed by consumers (e.g., backend services). This helps in managing asynchronous and reliable data flows, ensuring that even if a consumer is not available when a producer sends a message, the message will be held until it can be processed.

Example of using a message queue:
```java
public class Producer {
    public void sendMessage(String message) {
        // Code to send the message to the queue
    }
}

public class Consumer {
    public void receiveMessage() {
        // Code to receive and process messages from the queue
    }
}
```
x??

---
#### Data Sharing in Multitenant Systems
Background context: In multitenant systems, data can be shared among multiple tenants while maintaining security policies. This is particularly useful in cloud environments where different organizations or teams need access to common datasets.
:p How does data sharing work in a multitenant system?
??x
Data sharing in multitenant systems allows for the secure and controlled exchange of data between different tenants (users, departments, or organizations) within a shared environment. Fine-grained permission systems ensure that only authorized users have access to specific parts of the data.

Example of setting up permissions:
```java
public class DataSharingManager {
    public void grantAccess(String tenantId, String dataSet, Set<String> roles) {
        // Code to set permissions for the specified tenant on a dataset with given roles
    }
}
```
x??

---

