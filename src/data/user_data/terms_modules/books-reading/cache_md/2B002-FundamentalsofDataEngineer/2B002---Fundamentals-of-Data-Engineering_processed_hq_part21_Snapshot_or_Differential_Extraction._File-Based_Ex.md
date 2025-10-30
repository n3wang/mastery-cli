# High-Quality Flashcards: 2B002---Fundamentals-of-Data-Engineering_processed (Part 21)

**Rating threshold:** >= 8/10

**Starting Chapter:** Snapshot or Differential Extraction. File-Based Export and Ingestion. Inserts Updates and Batch Size

---

**Rating: 8/10**

---
#### Full Snapshots vs. Differential Updates
Background context: Data engineers have to decide between capturing full snapshots of a source system or using differential updates (incremental updates). Full snapshots capture the entire current state, whereas differential updates only pull changes since the last read.

:p What is the difference between full snapshot and differential update methods?
??x
Full snapshot reads involve grabbing the entire current state of the source system on each update. Differential updates, on the other hand, allow engineers to pull only the updates and changes that have occurred since the last read from the source system. Differential updates are preferred for minimizing network traffic and target storage usage.

Code Example:
```java
// Full Snapshot Method
void fullSnapshot() {
    // Logic to fetch the entire current state of the source system.
}

// Differential Update Method
void differentialUpdate(long lastReadTimestamp) {
    // Logic to fetch only changes made after 'lastReadTimestamp'.
}
```
x??

---
#### File-Based Export and Ingestion
Background context: Data is often moved between databases using files. Data is serialized into files in an exchangeable format, which are then provided to an ingestion system. This method provides a push-based approach where the export processes run on the source system side.

:p What are the key advantages of file-based export and ingestion?
??x
Key advantages include:
- Security: Direct access to backend systems is often undesirable due to security reasons.
- Control: Source system engineers have complete control over what data gets exported and how it is preprocessed.
- Flexibility: Files can be provided to target systems in various ways, such as object storage, SFTP, EDI, or SCP.

Code Example:
```java
// Pseudocode for File-Based Export
public void exportDataToFile(String filePath) {
    // Logic to serialize and save data into a file at 'filePath'.
}

// Pseudocode for Ingestion from File
public void ingestDataFromFile(String filePath) {
    // Logic to read the file and process the data.
}
```
x??

---
#### ETL vs. ELT
Background context: Chapter 3 introduced ETL (Extract, Transform, Load) and ELT (Extract, Load, Transform), both common ingestion, storage, and transformation patterns in batch workloads.

:p What does the 'extract' part of ETL and ELT refer to?
??x
The extract part involves getting data from a source system. While it often implies pulling data, extraction can also be push-based. It may require reading metadata and schema changes.

Code Example:
```java
// Pseudocode for Extract in ETL
public void extractData() {
    // Logic to get data from the source system.
}

// Pseudocode for Extract in ELT
public void extractData() {
    // Logic to get data from the source system.
}
```
x??

---
#### Loading Data (ETL and ELT)
Background context: Once data is extracted, it can either be transformed before loading into a storage destination or loaded directly with transformation happening later.

:p What considerations should be kept in mind when loading data?
??x
When loading data:
- Type of system being loaded.
- Schema of the data.
- Performance impact of loading large volumes of data.

Code Example:
```java
// Pseudocode for Loading Data (ETL)
public void loadData() {
    // Logic to load transformed data into a storage destination.
}

// Pseudocode for Loading Data (ELT)
public void loadData() {
    // Logic to load raw or partially transformed data into storage, then transform later.
}
```
x??

---

**Rating: 8/10**

---
#### Batch Operations Performance
Background context explaining that batch operations can lead to suboptimal performance in some databases, especially when dealing with many small transactions. For example, inserting rows one at a time is less efficient than bulk inserts for columnar databases due to the overhead of creating multiple small files and running numerous create object operations.
:p How does performing many small-batch operations affect the performance of certain databases?
??x
Many small-batch operations can lead to suboptimal performance in databases, particularly in columnar databases. This is because each operation may result in the creation of a new file or the execution of multiple create object operations, which are resource-intensive and slow down the overall process.
```java
// Pseudocode for bulk insert example
public void bulkInsert(List<Map<String, Object>> rows) {
    // Process the list of rows to prepare them for insertion
    List<Row> preparedRows = preprocessRows(rows);
    
    // Insert all rows in a single batch
    db.batchInsert(preparedRows);
}
```
x??
---

#### Update Operations Performance
Background context explaining that performing many small update operations can be problematic, as it requires scanning existing column files to apply the changes, leading to increased overhead and slower performance.
:p How does performing multiple small in-place updates affect database performance?
??x
Performing numerous small in-place updates is inefficient because each operation necessitates a full scan of the existing column files to update specific data. This leads to high overhead and significantly slows down the process compared to bulk operations.
```java
// Pseudocode for batch update example
public void batchUpdate(Map<String, Object> updates) {
    // Process the updates to prepare them for application
    List<Row> preparedUpdates = preprocessUpdates(updates);
    
    // Apply all updates in a single batch operation
    db.batchApplyUpdates(preparedUpdates);
}
```
x??
---

#### High Insert Rate Handling
Background context explaining that certain databases are designed to handle high insert rates efficiently. Apache Druid, Apache Pinot, and SingleStore are examples of tools optimized for handling large volumes of data insertion.
:p Which tools can handle high insert rates effectively?
??x
Apache Druid, Apache Pinot, and SingleStore are well-suited for handling high insert rates. These systems are designed to manage the overhead associated with frequent inserts efficiently, making them suitable for use cases requiring continuous data ingestion.
```java
// Pseudocode for inserting data into a tool that handles high insert rates
public void insertData(List<Map<String, Object>> data) {
    // Prepare the data for insertion
    List<Row> preparedData = preprocessData(data);
    
    // Insert the data in bulk
    db.batchInsert(preparedData);
}
```
x??
---

#### Data Migration Overview
Background context explaining that migrating data between databases or environments can be complex, involving the transfer of large volumes of data and potential schema differences. Proper planning and testing are crucial to ensure a smooth migration.
:p What challenges are associated with moving data from one database system to another?
??x
Migrating data from one database system to another is challenging due to several factors: handling large data volumes, managing schema differences, ensuring data integrity during the transfer, and maintaining data pipeline connections. Proper planning, including testing a sample of data before full migration, is essential.
```java
// Pseudocode for migrating data between systems
public void migrateData(SourceDB sourceDB, TargetDB targetDB) {
    // Test the schema compatibility by migrating a small sample
    List<Map<String, Object>> sampleData = fetchSample(sourceDB);
    
    // Migrate the full dataset
    List<Map<String, Object>> migratedData = migrate(sampleData, sourceDB, targetDB);
    
    // Ensure all connections to old systems are updated or redirected
    updatePipelineConnections(targetDB);
}
```
x??
---

#### Bulk Data Ingestion
Background context explaining that data ingestion should ideally be done in bulk rather than as individual rows or events. Using file or object storage as an intermediate stage can facilitate efficient data transfer.
:p Why is it beneficial to ingest data in bulk rather than one row at a time?
??x
Ingesting data in bulk, rather than one row at a time, is more efficient because it reduces the overhead associated with each individual operation. This approach minimizes the number of operations required and speeds up the overall process.
```java
// Pseudocode for bulk ingestion example
public void ingestData(List<Map<String, Object>> data) {
    // Prepare the data for ingestion
    List<Row> preparedData = preprocessData(data);
    
    // Ingest all data in a single batch operation
    storage.store(preparedData);
}
```
x??

**Rating: 8/10**

---
#### Schema Evolution
Schema evolution involves changes to the structure of your data over time, such as adding or removing fields and changing field types. This can impact your data pipelines and downstream systems if not handled correctly.

:p What are some common scenarios leading to schema evolution?
??x
Common scenarios include firmware updates for IoT devices that introduce new fields, third-party API changes in event payloads, and any other updates that alter the structure of ingested events.
x??

---
#### Use of Schema Registry
Using a schema registry helps manage and version your data schemas. This is crucial when dealing with schema evolution as it allows you to track different versions of your schema.

:p How does using a schema registry help with managing changes in event data?
??x
Using a schema registry helps because it tracks the versions of your data schemas, allowing for smooth integration of new or updated fields without breaking existing pipelines. It ensures that both producers and consumers are aware of which version of the schema to use.
x??

---
#### Dead-Letter Queues (DLQ)
Dead-letter queues are used to handle events that cannot be processed by the intended processing system due to errors.

:p How can dead-letter queues assist in debugging issues with event data?
??x
Dead-letter queues help identify and debug problems with unprocessable events. When an event fails to process, it is moved to a DLQ where you can investigate why it failed, making troubleshooting easier.
x??

---
#### Proactive Communication for Schema Changes
Maintaining open lines of communication with upstream stakeholders about potential schema changes helps in managing them proactively rather than reactively.

:p Why is proactive communication important when dealing with schema evolution?
??x
Proactive communication ensures that you are prepared for upcoming schema changes, reducing the impact on your systems. It allows teams to make adjustments before changes occur, minimizing disruptions.
x??

---
#### Late-Arriving Data Handling
Late-arriving data refers to events that take longer than expected to be processed or ingested.

:p How should late-arriving data affect downstream processing?
??x
Late-arriving data can impact the accuracy of your reports and analysis. To handle it, you need to define a cutoff time after which late data will no longer be considered for processing.
x??

---
#### Cutoff Time for Late-Arriving Data
Setting a cutoff time helps in managing late-arriving data by deciding when to stop processing events that are too delayed.

:p What is the importance of defining a cutoff time for handling late-arriving data?
??x
Defining a cutoff time ensures that your system can handle delays without compromising on accuracy. This prevents unnecessary processing of very old or irrelevant data.
x??

---
#### Handling Out-of-Order Messages
Out-of-order messages are common in distributed systems where messages might not always arrive in the order they were sent.

:p How do you manage out-of-order messages?
??x
To handle out-of-order messages, consider implementing a mechanism to resequence messages if necessary. This could involve maintaining state or using timestamps to ensure that messages are processed in the correct order.
x??

---
#### At-Least-Once Delivery Guarantees
At-least-once delivery ensures that each message is processed at least once, but it might be processed more than once.

:p What does "at-least-once" delivery mean in streaming platforms?
??x
"At-least-once" delivery means that every message will be delivered to the consumer at least once. However, there's a possibility that some messages may be delivered more than once due to retries or other factors.
x??

---

