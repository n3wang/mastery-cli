# High-Quality Flashcards: 2B002---Fundamentals-of-Data-Engineering_processed (Part 26)

**Rating threshold:** >= 8/10

**Starting Chapter:** Batch Transformations

---

**Rating: 8/10**

#### Data Transformations Overview
Background context: Bill Inmon emphasizes the importance of data transformations for unifying and integrating data. Transformations manipulate, enhance, and save data for downstream use, increasing its value in a scalable, reliable, and cost-effective manner.

:p Why are data transformations necessary?
??x
Data transformations are necessary because they allow you to persist the results of complex queries, making subsequent queries more efficient and reducing computational overhead. This is crucial when dealing with large datasets or frequent query execution.
```java
// Example: Simplifying repeated query executions
public class DataTransformer {
    public void runComplexQueryAndPersistResults() {
        // Complex query logic here
        String query = "SELECT * FROM table1 JOIN table2 ON table1.id=table2.id";
        
        // Persist the results of the query for future use
        saveQueryResults(query, "results.csv");
    }

    private void saveQueryResults(String query, String filePath) {
        // Save the results of the complex query to a file or database
    }
}
```
x??

---

#### Query vs. Transformation
Background context: Queries retrieve data based on filtering and join logic, whereas transformations persist the results for consumption by additional transformations or queries.

:p What is the difference between a query and a transformation?
??x
A query retrieves data from various sources based on filtering and join logic, while a transformation persists the results of complex operations for future use. Transformations are essential for reducing redundancy and improving efficiency.
```java
// Example: Running a query versus persisting its results as a transformation
public class QueryVsTransformation {
    public void runQuery() {
        // Complex query execution
        String query = "SELECT * FROM table1 JOIN table2 ON table1.id=table2.id";
        
        // Run the query and store the result for later use
        saveResults(query);
    }

    private void saveResults(String query) {
        // Save the results to a temporary or permanent storage
    }
}
```
x??

---

#### Batch Transformations Overview
Background context: Batch transformations run on discrete chunks of data, typically at fixed intervals such as daily, hourly, or every 15 minutes. They are used for ongoing reporting, analytics, and machine learning models.

:p What is a batch transformation?
??x
A batch transformation processes data in discrete chunks over predefined intervals, supporting tasks like ongoing reporting, analytics, and ML model training.
```java
// Example: Running a batch transformation at fixed intervals
public class BatchTransformation {
    public void runBatchTransformation() {
        // Define the schedule for running the batch transformation
        Schedule schedule = new Schedule("daily", "0 0 * * *");

        while (true) {
            if (schedule.isTimeToRun()) {
                performDataProcessing();
            }
            sleepForInterval(schedule.getInterval());
        }
    }

    private void performDataProcessing() {
        // Perform the batch transformation logic here
    }

    private void sleepForInterval(String interval) throws InterruptedException {
        // Sleep for the specified interval before checking again
        Thread.sleep(TimeUnit.MINUTES.toMillis(Integer.parseInt(interval)));
    }
}
```
x??

---

#### Distributed Joins Overview
Background context: Distributed joins break down a logical join into smaller node joins that run on individual servers in a cluster. This pattern is used across various systems like MapReduce, BigQuery, Snowflake, or Spark.

:p What is the purpose of distributed joins?
??x
The purpose of distributed joins is to distribute the workload across multiple nodes for efficient and scalable processing of large datasets.

```java
// Example: Implementing a distributed join in a simplified manner
public class DistributedJoin {
    public void performDistributedJoin() {
        // Define the tables and their respective data sources
        Table table1 = new Table("source1", "tableA");
        Table table2 = new Table("source2", "tableB");

        // Break down the logical join into smaller node joins
        NodeJoin nodeJoin1 = new NodeJoin(table1, table2, "id");
        NodeJoin nodeJoin2 = new NodeJoin(table2, table3, "id");

        // Process each node join on individual servers in the cluster
        processNodeJoin(nodeJoin1);
        processNodeJoin(nodeJoin2);
    }

    private void processNodeJoin(NodeJoin nodeJoin) {
        // Logic to process each node join
    }
}

class NodeJoin {
    String table1;
    String table2;
    String key;

    public NodeJoin(Table table1, Table table2, String key) {
        this.table1 = table1.name;
        this.table2 = table2.name;
        this.key = key;
    }
}
```
x??

**Rating: 8/10**

#### Broadcast Join
Background context: A broadcast join is a type of join operation used in distributed data processing frameworks, such as Apache Spark. It is particularly useful when one table (smaller table) can fit on a single node and the other table (larger table) needs to be distributed across multiple nodes. The smaller table is "broadcasted" or replicated to all nodes, reducing the amount of shuffling required during the join operation.

:p What is a broadcast join used for in data processing?
??x
A broadcast join is used when one side of the join is small enough to fit on a single node and can be distributed (broadcasted) across all nodes. This approach reduces the need for complex shuffle operations, making the join process more efficient.
??
Broadcast joins are ideal when you have a smaller table that fits on a single node, which is then broadcasted or replicated across all nodes in the cluster to join with larger tables. This method minimizes data shuffling and can significantly improve performance.

```java
// Pseudocode for broadcasting a small table (A) to all nodes
public class BroadcastJoinExample {
    public void broadcastTableBroadcast(Map<Integer, String> tableA, List<String> tableBNodes) {
        // Assume 'tableA' is the smaller table that fits on a single node
        // 'tableBNodes' contains references to all nodes in the cluster

        // Step 1: Broadcast table A to all nodes
        for (String node : tableBNodes) {
            sendTableToNode(node, tableA);
        }

        // Step 2: Perform join on each node
        for (String node : tableBNodes) {
            Map<String, String> joinedData = performJoinOnNode(node, tableA, getLocalTableB(node));
            processJoinedData(joinedData);
        }
    }

    private void sendTableToNode(String node, Map<Integer, String> tableA) {
        // Code to replicate and distribute table A to the specified node
    }

    private Map<String, String> performJoinOnNode(String node, Map<Integer, String> tableA, Map<Integer, String> tableB) {
        // Code to join tables on each node
        return joinedData;
    }

    private void processJoinedData(Map<String, String> joinedData) {
        // Process the joined data as required
    }
}
```
x??

---

#### Shuffle Hash Join
Background context: A shuffle hash join is used when neither of the tables involved in a join operation can fit on a single node. This method involves partitioning and shuffling the data across nodes based on a hashing scheme before performing the actual join operations. It typically results in higher resource consumption compared to broadcast joins.

:p What is a shuffle hash join?
??x
A shuffle hash join is used when neither of the tables involved can fit on a single node, requiring data to be partitioned and shuffled across multiple nodes based on a hashing scheme before performing the join operation.
??
Shuffle hash joins are necessary when both sides of the join are large and cannot fit in memory or on a single node. The process involves:

1. Partitioning the tables by hash key across all nodes.
2. Shuffling the data to ensure that matching keys end up on the same nodes.
3. Performing the actual join operations.

Here's an example of how this might be implemented:
```java
// Pseudocode for shuffle hash join
public class ShuffleHashJoinExample {
    public void performShuffleHashJoin(Map<Integer, String> tableA, Map<Integer, String> tableB) {
        // Step 1: Partition the tables by hash key
        Map<Integer, List<Map.Entry<Integer, String>>> partitionedTableA = partitionByHashKey(tableA);
        Map<Integer, List<Map.Entry<Integer, String>>> partitionedTableB = partitionByHashKey(tableB);

        // Step 2: Shuffle data to ensure matching keys are on the same nodes
        for (int hashKey : partitionedTableA.keySet()) {
            if (partitionedTableB.containsKey(hashKey)) {
                joinOnNode(hashKey, partitionedTableA.get(hashKey), partitionedTableB.get(hashKey));
            }
        }
    }

    private Map<Integer, List<Map.Entry<Integer, String>>> partitionByHashKey(Map<Integer, String> table) {
        // Code to hash and partition the entries based on a key
        return partitionedMap;
    }

    private void joinOnNode(int hashKey, List<Map.Entry<Integer, String>> tableAPartition, List<Map.Entry<Integer, String>> tableBPartition) {
        // Perform join operations on the local data of each node with matching keys
    }
}
```
x??

---

#### ETL and ELT Patterns
Background context: Extract, Transform, Load (ETL) and Extract, Load, Transform (ELT) are common patterns used in data warehousing to prepare data for analysis. ETL involves external transformation systems that pull, transform, and clean data before loading it into the target system, while ELT loads raw data directly into a target system where transformations occur.

:p What is the difference between ETL and ELT?
??x
ETL (Extract, Transform, Load) and ELT (Extract, Load, Transform) are two common patterns used in data warehousing. The key differences lie in when the transformation occurs:

- **ETL**: Data is first extracted from source systems, then transformed using an external system or pipeline, cleaned, and finally loaded into a target system like a data warehouse.
- **ELT**: Raw data is directly extracted and loaded into a target system (often a more flexible storage layer such as a cloud data lake), where transformations are applied.

??
ETL involves extracting data from source systems, transforming it using an external system or pipeline, cleaning the data, and then loading it into the target system. This approach was historically driven by the limitations of both source and target systems, with extraction being a major bottleneck due to constraints in source RDBMS capabilities. On the other hand, ELT extracts raw data directly into a more flexible storage layer (such as a cloud data lake), where transformations are performed. This approach leverages the power and flexibility of modern data processing frameworks for transformation.

```java
// Pseudocode example for ETL pattern
public class ETLExample {
    public void executeETL() {
        // Step 1: Extract data from source systems
        List<Map<String, Object>> extractedData = extractFromSources();

        // Step 2: Transform and clean the extracted data
        List<Map<String, Object>> transformedData = transformAndClean(extractedData);

        // Step 3: Load the transformed data into the target system
        loadIntoTargetSystem(transformedData);
    }

    private List<Map<String, Object>> extractFromSources() {
        // Code to extract data from source systems
        return extractedData;
    }

    private List<Map<String, Object>> transformAndClean(List<Map<String, Object>> extractedData) {
        // Code to clean and transform the extracted data
        return cleanedTransformedData;
    }

    private void loadIntoTargetSystem(List<Map<String, Object>> transformedData) {
        // Code to load the transformed data into the target system (e.g., a data warehouse)
    }
}
```
x??

---

**Rating: 8/10**

#### SQL for Complex Data Transformations
Background context explaining that while SQL can be used to build complex Directed Acyclic Graphs (DAGs) using common table expressions or orchestration tools, it has certain limitations. The focus is on batch transformations where engineers might opt for native Spark or PySpark code over SQL due to readability and maintainability.
:p When would you prefer to use native Spark/PySpark over SQL for complex data transformations?
??x
When dealing with complex data transformations that are difficult to implement in SQL, or when the resulting SQL code will be unreadable and hard to maintain. For instance, implementing word stemming through a series of joins, functions, and substrings might be overly complicated and less efficient than using Spark's powerful procedural capabilities.
```python
# Example PySpark Code for Stemming Words
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("Stemming").getOrCreate()

suffixes = spark.createDataFrame([("ing", "i"), ("ed", "e")], ["suffix", "stem"])
words = spark.createDataFrame([("cleaning",), ("learning",)], ["word"])

stemmed_words = words.join(suffixes, on=words.word.endsWith(suffixes.suffix), how="left").select(
    words.word, suffixes.stem
).fillna({"stem": ""})

stemmed_words.show()
```
x??

---

#### Trade-offs Between SQL and Spark
Background context explaining the trade-offs when deciding between using native Spark/PySpark or SQL for transformations. The key questions to consider are: how difficult is it to code the transformation in SQL, how readable will the resulting code be, and should some of the transformation code be reused.
:p What are the key considerations when deciding whether to use native Spark or PySpark over SQL?
??x
The key considerations include:
1. **Complexity of Implementation**: Is the transformation straightforward in SQL? If not, native Spark/PySpark might be more appropriate.
2. **Readability and Maintainability**: Will the SQL code be readable and maintainable? If it's complex or difficult to understand, consider using Spark for better clarity.
3. **Future Reusability**: Should parts of the transformation logic be reusable across your organization? This can be easier in PySpark with UDFs and libraries.

For example, implementing word stemming might require a series of joins and functions that are not as readable or maintainable in SQL compared to using Spark's procedural capabilities.
```python
# Example PySpark Code for Stemming Words
from pyspark.sql import functions as F

words = spark.createDataFrame([("cleaning",), ("learning",)], ["word"])

stemmed_words = (
    words.withColumn("suffix", F.substring(F.col("word"), -3))
         .join(suffixes, suffixes.suffix == stemmed_words.suffix, "left")
         .select(F.when(stemmed_words.suffix.isNotNull(), stemmed_words.stem).otherwise(""))
)

stemmed_words.show()
```
x??

---

#### Reusability in SQL and Spark
Background context explaining that while SQL has limitations in terms of reusability due to the lack of a natural notion of libraries, Spark offers easier creation and reuse of reusable libraries.
:p How can you make SQL queries more reusable?
??x
SQL queries can be made more reusable by committing their results to a table or creating views. This process is often best handled using an orchestration tool like Airflow, which ensures that downstream queries start only after the source query has finished executing.

Additionally, tools like dbt (Data Build Tool) facilitate the reuse of SQL statements and offer a templating language for easier customization.
```sql
-- Example of creating a view in SQL
CREATE VIEW stemmed_words AS
SELECT word,
       CASE
           WHEN SUBSTR(word, -3) IN ('ing', 'ed') THEN LEFT(word, LENGTH(word)-3)
       END as stem
FROM words;
```
x??

---

#### Control Over Data Processing with Spark
Background context explaining that while SQL engines optimize and compile SQL statements into processing steps, this can limit control over data transformations. However, there is a trade-off where the optimized nature of SQL queries can sometimes outperform custom PySpark implementations.
:p What are the limitations of SQL in terms of control over data processing?
??x
SQL engines optimize and compile SQL statements into processing steps, which can limit direct control over how data is transformed. While this optimization might not always be optimal for complex transformations, it often provides better performance due to the engine's expertise in handling large datasets efficiently.

However, if you need more granular control over the processing pipeline, using native Spark or PySpark allows you to write custom code that can push down operations and optimize transformations at a lower level.
```python
# Example of pushing down a transformation in PySpark
from pyspark.sql import functions as F

words = spark.createDataFrame([("cleaning",), ("learning",)], ["word"])

stemmed_words = (
    words.withColumn("stem", F.when(F.substring(F.col("word"), -3) == "ing", F.substr(F.col("word"), 0, -3))
                      .when(F.substring(F.col("word"), -2) == "ed", F.substr(F.col("word"), 0, -2)))
)

stemmed_words.show()
```
x??

**Rating: 8/10**

#### Filter Early and Often
Background context: Efficient data processing is crucial when using Spark. Filtering early and often can significantly reduce the amount of data that needs to be processed, improving performance.
:p What is the benefit of filtering early and often in Spark?
??x
By filtering early and often, you reduce the volume of data that subsequent stages need to process, which can lead to significant improvements in performance. This strategy helps to minimize unnecessary computations and improve the efficiency of your Spark jobs.

```scala
// Example in Scala
val filteredData = originalDataFrame.filter(col("age") > 18)
```

x??

#### Rely on Core Spark API
Background context: The core Spark API is designed for efficient data processing. Understanding how to use it effectively can help optimize performance.
:p Why should you rely heavily on the core Spark API?
??x
Relying on the core Spark API allows you to leverage its built-in optimizations and transformations, which are designed for high-performance big data processing. This approach helps ensure that your code takes full advantage of Spark's capabilities without unnecessary overhead.

```scala
// Example in Scala
val transformedData = originalDataFrame.groupBy("category").sum("value")
```

x??

#### Use Well-Maintained Libraries
Background context: When the core Spark API doesn't support a specific use case, using well-maintained libraries can be more efficient and effective.
:p How should you approach when the native Spark API does not fully meet your needs?
??x
When the native Spark API is insufficient for your needs, consider relying on well-maintained public libraries. These libraries are often optimized for performance and have been tested extensively, making them a reliable choice.

```scala
// Example in Scala using a hypothetical library
val processedData = externalLibrary.processDataFrame(originalDataFrame)
```

x??

#### Be Careful with UDFs (User-Defined Functions)
Background context: User-defined functions can be less efficient when used in PySpark because they force data to be passed between Python and the JVM.
:p Why should you be cautious about using UDFs in PySpark?
??x
Using UDFs in PySpark is generally discouraged because it forces data to be serialized and deserialized between Python and the JVM, which can significantly degrade performance. Whenever possible, use native Spark transformations and actions for better efficiency.

```scala
// Example of a UDF in Scala (not recommended)
val ageUDF = udf((name: String) => {
  if(name.contains("John")) 20 else 30
})
```

x??

#### Consider Mixing SQL with Native Spark Code
Background context: Combining SQL and native Spark code can help leverage the optimizations provided by both paradigms, achieving a balance between flexibility and performance.
:p How can mixing SQL with native Spark code benefit your data processing?
??x
Mixing SQL with native Spark code allows you to take advantage of the strengths of both. SQL is often easier to write and maintain for simple operations, while native Spark code provides powerful general-purpose functionality. This combination lets you achieve optimal performance by using the right tool for each task.

```scala
// Example in Scala combining SQL and native transformations
val result = spark.sql("SELECT * FROM table WHERE age > 20")
  .filter(col("value") < 100)
```

x??

---

**Rating: 8/10**

---
#### Upsert Pattern Overview
The upsert pattern, also known as an "upsert" or "upsert/merge," is a common update operation used to either insert a new record or replace an existing one based on a unique identifier (primary key). This approach is particularly useful in scenarios where data might be updated infrequently but needs to be preserved.

:p What is the upsert pattern, and how does it work?
??x
The upsert pattern combines the functionalities of an "insert" and an "update." It searches for records that match a given primary key or another unique identifier. If such a record exists, it updates (replaces) the existing record with new data. If no matching record is found, the system inserts the new record into the database.

```java
public class UpsertExample {
    public void upsertRecord(Map<String, Object> recordData, String primaryKey) {
        // Logic to find or insert a record based on primary key
        if (recordExists(primaryKey)) {
            updateExistingRecord(recordData);
        } else {
            insertNewRecord(recordData);
        }
    }

    private boolean recordExists(String primaryKey) {
        // Check if the record exists in the database using a query
        return false;  // Placeholder, actual implementation needed
    }

    private void updateExistingRecord(Map<String, Object> recordData) {
        // Update existing record with new data
    }

    private void insertNewRecord(Map<String, Object> recordData) {
        // Insert new record into the database
    }
}
```
x??

---
#### Merge Pattern Overview
The merge pattern extends the upsert pattern by adding support for deletion. It allows you to update or delete records based on a unique identifier (primary key). If a match is found, it can either update the existing record with new data or mark it as deleted.

:p How does the merge pattern differ from the upsert pattern?
??x
The merge pattern differs from the upsert pattern by providing additional functionality to handle deletions. While both patterns allow for updating records based on a primary key, the merge pattern also enables marking records as deleted when no new data is provided or specific conditions are met.

```java
public class MergeExample {
    public void mergeRecord(Map<String, Object> recordData, String primaryKey) {
        // Logic to find or insert a record and potentially delete it based on conditions
        if (recordExists(primaryKey)) {
            updateExistingRecord(recordData);
        } else {
            insertNewRecord(recordData);
        }
    }

    private boolean recordExists(String primaryKey) {
        // Check if the record exists in the database using a query
        return false;  // Placeholder, actual implementation needed
    }

    private void updateExistingRecord(Map<String, Object> recordData) {
        // Update existing record with new data or mark it as deleted if no data is provided
        if (recordData.isEmpty()) {
            markForDeletion(primaryKey);
        } else {
            // Actual update logic here
        }
    }

    private void insertNewRecord(Map<String, Object> recordData) {
        // Insert new record into the database
    }

    private void markForDeletion(String primaryKey) {
        // Mark the existing record as deleted in the database
    }
}
```
x??

---
#### Performance Considerations for Updates and Merges
When dealing with updates or merges, especially in distributed columnar data systems, performance can be significantly impacted. These systems typically use copy-on-write (COW) mechanisms to manage changes, which means rewriting the entire table is not necessary.

:p What are some key considerations when implementing updates and merges in a columnar database?
??x
When implementing updates and merges in a columnar database, several factors need to be considered to ensure optimal performance:

1. **Partitioning Strategy**: Proper partitioning can help minimize the number of files that need to be rewritten.
2. **Clustering Strategy**: Clustering can group related data together, improving read efficiency.
3. **COW Mechanism**: Understanding how COW operates at different levels (partition, cluster, block) helps in designing efficient update strategies.

To develop an effective partitioning and clustering strategy:
- Identify the most frequently accessed columns or fields.
- Partition by these fields to reduce the size of data chunks that need to be rewritten during updates.

Example pseudo-code for a partitioning strategy:
```java
public class PartitioningStrategy {
    public void applyPartitioning(Map<String, Object> recordData) {
        String partitionKey = getPartitionKey(recordData);
        Map<String, List<Map<String, Object>>> partitions = loadPartitions(partitionKey);

        // Apply changes to the relevant partition
        if (partitions.containsKey(partitionKey)) {
            partitions.get(partitionKey).add(recordData);
        } else {
            partitions.put(partitionKey, new ArrayList<>(List.of(recordData)));
        }
    }

    private String getPartitionKey(Map<String, Object> recordData) {
        // Logic to determine the partition key based on record data
        return "partition_key";  // Placeholder, actual implementation needed
    }

    private Map<String, List<Map<String, Object>>> loadPartitions(String partitionKey) {
        // Load existing partitions from storage or database
        return new HashMap<>();  // Placeholder, actual implementation needed
    }
}
```
x??

---
#### Challenges with Early Big Data Technologies and Update Operations
Early adopters of big data and data lakes faced significant challenges when dealing with updates due to the nature of file-based systems. These systems do not support in-place updates because they use copy-on-write (COW) mechanisms, which require rewriting entire files for any change.

:p Why did early adopters of big data technologies prefer an insert-only pattern?
??x
Early adopters of big data and data lakes preferred an insert-only pattern due to the complexity associated with managing file-based systems. In such systems, in-place updates are not supported because they use a copy-on-write (COW) mechanism. This means that any update or deletion operation requires rewriting the entire file, which can be resource-intensive.

To avoid these complexities, early adopters assumed that data consumers would determine the current state of the data at query time or through downstream transformations. By sticking to an insert-only pattern, they could manage updates more easily and maintain simplicity in their data management processes.

```java
public class InsertOnlyPatternExample {
    public void processRecord(Map<String, Object> recordData) {
        // Logic to handle records as insert operations only
        storeNewRecord(recordData);
    }

    private void storeNewRecord(Map<String, Object> recordData) {
        // Store the new record in a database or file system without updating existing ones
    }
}
```
x??

---

**Rating: 8/10**

#### CDC Performance Issues
Background context: Engineering teams often try to run near real-time merges from Change Data Capture (CDC) directly into columnar data warehouses, but this approach frequently fails due to performance limitations. Columnar databases are not optimized for frequent updates and can become overloaded with high update frequency.
:p Why does trying to merge every record from CDC into a columnar database in near real-time cause issues?
??x
Trying to merge every record from CDC directly into the database results in excessive write operations, overwhelming the database's ability to handle such high-frequency changes. Columnar databases are optimized for read-heavy workloads and do not perform well under frequent updates.
x??

---

#### BigQuery Streaming with Materialized Views
Background context: BigQuery supports streaming inserts which can be used to add new records into a table. It also provides materialized views, which offer an efficient way to present near real-time data that has been deduplicated or aggregated in some manner.
:p How does BigQuery allow for near real-time updates while maintaining efficiency?
??x
BigQuery allows near real-time updates through streaming inserts and leverages specialized materialized views. Materialized views store precomputed results, reducing the need for complex queries on the fly. This approach ensures that even with frequent updates, the query performance remains efficient.
```sql
-- Example of creating a materialized view in BigQuery
CREATE MATERIALIZED VIEW my_dataset.my_view AS
SELECT column1, SUM(column2) as total FROM my_table GROUP BY column1;
```
x??

---

#### Schema Update Challenges in Columnar Databases
Background context: While updating data in columnar databases can be more challenging, schema updates are often simpler. Columns can typically be added, deleted, and renamed without significant disruption. However, managing these changes organizationally is a different matter.
:p How does the process of adding or deleting columns differ from row-based systems?
??x
In columnar databases, adding or deleting columns involves modifying the metadata rather than the data itself, which is less disruptive compared to row-based systems where each record needs to be updated. However, practical schema management requires careful planning and often a review process.
```sql
-- Example of altering a table in BigQuery
ALTER TABLE my_table ADD COLUMN new_column VARCHAR;
```
x??

---

#### Streamlining Schema Updates with Fivetran
Background context: Tools like Fivetran automate the replication from sources, reducing manual schema management. However, automated updates can introduce risks if downstream processes rely on specific column names or schemas.
:p What are some potential issues when automating schema updates?
??x
Automating schema updates through tools like Fivetran can streamline the process but introduces risks such as breaking downstream transformations that depend on specific column names or schemas. Automated changes require thorough testing to ensure they do not disrupt existing processes.
```java
// Example of a review process for schema updates in Java
public void updateSchema(String tableName, String[] newColumns) {
    // Check if the columns already exist
    // If any new column is missing, raise an exception
}
```
x??

---

#### Flexible Data Storage with JSON Fields
Background context: Modern cloud data warehouses support storing semistructured data using JSON fields. This approach allows for flexible schema updates by adding or removing fields over time without disrupting the entire table structure.
:p How does storing frequently accessed data in adjacent flattened fields alongside raw JSON help?
??x
Storing frequently accessed data in adjacent flattened fields reduces the need to query the full JSON field, improving performance. Raw JSON is kept for flexibility and advanced querying needs, while commonly used data can be added directly into the schema over time.
```sql
-- Example of adding a frequently accessed field in PostgreSQL
ALTER TABLE my_table ADD COLUMN email VARCHAR;
```
x??

---

#### Data Wrangling for Messy Data
Background context: Data wrangling is the process of transforming messy, malformed data into clean and useful data. This typically involves batch transformations to standardize formats, handle missing values, and ensure consistency.
:p What are some common techniques used in data wrangling?
??x
Common techniques in data wrangling include handling missing values (e.g., filling with default values or removing rows), standardizing formats (e.g., date parsing), and ensuring consistency across datasets. These steps help prepare data for further analysis and reduce errors.
```python
# Example of cleaning a dataset using Python's pandas library
import pandas as pd

def clean_data(df):
    # Fill missing values with default value
    df['age'].fillna(30, inplace=True)
    # Convert date strings to datetime objects
    df['date'] = pd.to_datetime(df['date'])
    return df
```
x??

**Rating: 8/10**

#### Data Wrangling Overview
Data wrangling involves cleaning and transforming raw data into a format that can be easily analyzed. This process often requires significant effort from data engineers, who must handle malformed data and perform extensive preprocessing before downstream transformations can begin.

:p What is data wrangling?
??x
Data wrangling refers to the process of cleaning and transforming raw data into a format suitable for analysis. It involves several steps such as ingestion, parsing, and fixing data issues like mistyped values or missing fields.
x??

---

#### Ingestion Process in Data Wrangling
During data wrangling, developers often receive unstructured or malformed data that needs to be ingested before any transformation can take place.

:p What is the initial step in data wrangling?
??x
The initial step in data wrangling involves trying to ingest the raw data. This might include handling data as a single text field table and then writing queries to parse and break apart the data.
x??

---

#### Text Preprocessing in Data Wrangling
Text preprocessing often forms a significant part of the data wrangling process, especially when dealing with unstructured data.

:p What is common during the text preprocessing step?
??x
During text preprocessing, developers may need to handle issues like mistyped data and split text fields into multiple parts. This can involve using regular expressions or other string manipulation techniques.
x??

---

#### Use of Data Wrangling Tools
Data wrangling tools aim to automate parts of the data preparation process, making it easier for data engineers.

:p Why are data wrangling tools useful?
??x
Data wrangling tools simplify some aspects of the data preparation process by providing graphical interfaces and automated steps. This allows data engineers to focus on more interesting tasks rather than spending excessive time on parsing nasty data.
x??

---

#### Graphical Data Wrangling Tools
Graphical data-wrangling tools present a sample of data visually, allowing users to add processing steps to fix issues.

:p What do graphical data wrangling tools provide?
??x
Graphical data wrangling tools offer visual interfaces for data exploration and manipulation. Users can add processing steps such as dealing with mistyped data or splitting text fields. The job is typically pushed to a scalable system like Spark for large datasets.
x??

---

#### Example of Data Transformation in Spark
An example provided involves building a pipeline that ingests JSON data from three API sources, converts it into a relational format using Spark, and combines the results.

:p Describe the process mentioned in the text?
??x
The process described includes:
1. Ingesting data from three JSON sources.
2. Converting each source into a dataframe.
3. Combining the three dataframes into a single table.
4. Filtering the combined dataset with SQL statements using Spark.
x??

---

#### Training Data Wrangling Specialists
Organizations may benefit from training specialists in data wrangling, especially when dealing with frequently changing and unstructured data sources.

:p Why might organizations train specialists in data wrangling?
??x
Organizations should consider training specialists in data wrangling if they often need to handle new and messy data sources. These specialists can help streamline the data preparation process, reducing the burden on existing data engineers.
x??

---

**Rating: 8/10**

#### Data Ingestion and Processing Pipeline
Spark processes data through a series of steps, including ingestion, joining, shuffling, filtering, and writing to S3. The pipeline can involve spill operations when cluster memory is insufficient for processing large datasets.

:p Describe the data processing flow in Spark for this particular use case.
??x
The data processing flow starts with ingesting raw data into cluster memory. For larger sources, some data spills to disk during ingestion. A join operation then requires a shuffle, which may also spill to disk as data is redistributed across nodes. In-memory operations follow where SQL transformations filter out unused rows. Finally, the processed data gets converted into Parquet format and compressed before being written back to S3.

```scala
val df = spark.read.format("csv").option("header", "true").load("/path/to/large/csv")
df.write.mode(SaveMode.Append).format("delta").save("/path/to/delta/table")
```
x??

---

#### Shuffle Operations and Spills
Shuffle operations in Spark are necessary for redistributing data across nodes. During these operations, if memory is insufficient, data spills to disk.

:p Explain the concept of a shuffle operation during data processing.
??x
A shuffle operation in Spark involves the redistribution of data partitions based on a key. This process often requires significant resources and can lead to data spilling to disk if there isn't enough cluster memory. For example, when performing a join, data is shuffled according to the join key, which may require writing intermediate data to disk.

```scala
val joinedDF = df1.join(df2, df1("id") === df2("id"), "inner")
```
x??

---

#### Business Logic and Derived Data
Transformations involving business logic are complex and can involve multiple layers of computations. These transformations often rely on specialized internal metrics that account for various factors like fraud detection.

:p How does Spark handle complex business logic during data processing?
??x
Spark handles complex business logic through intricate SQL transformations and operations. For instance, calculating profits before and after marketing costs involves numerous steps, such as handling fraudulent orders, estimating cancellations, and attributing marketing expenses accurately. These tasks require sophisticated models that integrate various factors.

```scala
val profitBeforeMarketing = df.filter(!fraudulentOrders).groupBy("date").sum("revenue") - sum("marketingCosts")
val profitAfterMarketing = df.join(marketingAttribution, "order_id").filter(!fraudulentOrders).groupBy("date").sum("revenue") - sum("totalAttributedMarketingCosts")
```
x??

---

#### Fraud Detection and Estimation
Fraud detection in business logic transformations often involves estimating the impact of potential fraud before it is fully confirmed. This estimation requires assumptions about order cancellations and fraudulent behavior.

:p How does Spark incorporate fraud detection into its data processing pipeline?
??x
Spark incorporates fraud detection by integrating models that estimate the probability and impact of fraud on orders. For example, if a database has a flag indicating high probability of fraud, Spark can use this to filter out or adjust estimates for potential cancellations due to fraudulent behavior.

```scala
val potentiallyFraudulentOrders = df.filter(fraudDetectionFlag)
val estimatedLosses = potentiallyFraudulentOrders.groupBy("order_id").sum("revenue").withColumn("loss_estimate", col("sum(revenue)") * 0.1) // Assuming 10% of revenue is lost to fraud
```
x??

---

#### Marketing Cost Attribution
Marketing cost attribution can vary widely, from simple models based on item price to sophisticated ones that consider user interactions and ad clicks.

:p How does Spark handle marketing cost attribution in its data processing?
??x
Spark handles marketing cost attribution by integrating different levels of complexity. For instance, a company might use a naive model where marketing costs are attributed based on the price of items. More advanced models could attribute costs per department or item category, and highly sophisticated organizations might track individual item-level ad clicks.

```scala
val marketingAttribution = df.join(marketingCostsDF, "item_id", "left_outer").select("order_id", "totalAttributedMarketingCosts")
```
x??

---

#### Summary of Key Concepts
This series of flashcards covers the data ingestion process in Spark, shuffle operations, handling complex business logic, fraud detection, and marketing cost attribution. Each step is crucial for understanding how data is processed and transformed within a business context.

:p What are the key concepts covered in these flashcards?
??x
The key concepts cover:
1. Data ingestion and processing flow using Spark.
2. Shuffle operations and disk spills during join operations.
3. Handling complex business logic through SQL transformations.
4. Integrating fraud detection into data processing pipelines.
5. Marketing cost attribution methods used in business logic.

These concepts are essential for understanding the intricacies of data processing in a business context, especially when dealing with large datasets and complex calculations.
x??
---

**Rating: 8/10**

#### Apache Spark vs Hadoop MapReduce
Background context: The passage compares Apache Spark and Hadoop MapReduce, highlighting their differences in handling data processing tasks. While both frameworks support distributed computing, they differ in how they manage memory, disk usage, and overall performance.

:p What is the main difference between Apache Spark and Hadoop MapReduce?
??x
Apache Spark offers better performance due to its ability to cache data in memory, whereas Hadoop MapReduce relies heavily on disk operations. This means that Spark can process data much faster by keeping frequently accessed data in RAM, which reduces I/O overhead.
??x

---

#### In-Memory Processing and Disk Usage
Background context: The text emphasizes the importance of in-memory processing over traditional disk-based storage methods used in Hadoop MapReduce.

:p How does Apache Spark handle memory management differently from Hadoop MapReduce?
??x
Apache Spark leverages in-memory caching to store data in RAM, which speeds up processing times significantly. It allows for efficient data manipulation and reduces the need for frequent reads/writes to disk.
??x

---

#### Materialized Views
Background context: The passage introduces materialized views as a technique that precomputes query results to improve performance.

:p What is a materialized view?
??x
A materialized view is a database object that stores the result of a query. Unlike regular views, it precomputes and caches the data, allowing for faster retrieval when queried.
??x

---

#### Composable Materialized Views
Background context: The text discusses the limitations of traditional materialized views and introduces composable materialized views as an advanced technique.

:p What is the difference between a traditional materialized view and a composable one?
??x
A traditional materialized view cannot select from another materialized view, while a composable one can. This allows for more complex transformations and chaining of precomputed results.
??x

---

#### Federation Queries
Background context: The passage explains how federated queries enable OLAP databases to query external data sources.

:p What are federation queries?
??x
Federation queries allow an OLAP database to select from multiple external data sources, such as object storage or relational databases. They combine results from different sources into a unified result set.
??x

---

#### Data Virtualization
Background context: The text describes how data virtualization abstracts away the underlying data storage and provides a unified interface for querying.

:p What is data virtualization?
??x
Data virtualization refers to a system that does not store data internally but instead processes queries against external sources. This allows for flexible querying of various data sources without needing to move or replicate data.
??x

**Rating: 8/10**

#### Query Pushdown
Background context explaining query pushdown. This technique involves moving as much work as possible to the source databases, thereby offloading computation from virtualization layers and potentially reducing data transfer over the network.

Engineers often use this approach with data virtualization tools like Trino to improve performance by leveraging the native capabilities of underlying systems. Filtering predicates are pushed down into queries on source databases whenever feasible.

:p What is query pushdown in the context of database management?
??x
Query pushdown refers to the practice of moving as much work, particularly filtering operations, down to the source databases where it can be executed more efficiently.
x??

---
#### Data Virtualization
Background context explaining data virtualization. It involves abstracting away barriers between different data sources and presenting them in a unified view without physically consolidating the data.

Data virtualization is useful for organizations dealing with data scattered across various systems, but should be used judiciously to avoid overloading production databases with analytical workloads.

:p How does data virtualization help manage data from multiple sources?
??x
Data virtualization helps by creating a unified view of data stored in disparate sources without physically moving or consolidating the data. This abstraction allows different parts of an organization to access and use data as if it were stored in one place.
x??

---
#### Streaming Transformations vs Queries
Background context explaining the difference between streaming transformations and queries. Both run dynamically, but while queries present a current view of data, transformations aim to prepare data for downstream consumption.

:p What is the key difference between streaming transformations and streaming queries?
??x
The key difference lies in their purpose: streaming queries are used to provide real-time views of data, whereas streaming transformations focus on enriching or modifying incoming streams to prepare them for further processing.
x??

---
#### Streaming DAGs (Directed Acyclic Graph)
Background context explaining the concept of a streaming DAG. This idea is about dynamically combining and transforming multiple streams in real time.

A simple example involves merging website clickstream data with IoT data, then preprocessing each stream into a standard format before enriching them to provide a unified view.

:p What is a streaming DAG?
??x
A streaming DAG (Directed Acyclic Graph) represents the dynamic combination and transformation of multiple streams in real-time. It allows for complex operations on incoming streams, such as merging, splitting, and enriching data.
x??

---
#### Micro-batch vs True Streaming
Background context explaining the difference between micro-batch and true streaming approaches. Micro-batching involves breaking down long-running processes into smaller batches to improve performance.

:p What is the main difference between micro-batch and true streaming?
??x
The main difference lies in their approach to processing: micro-batching breaks down large tasks into smaller, more manageable chunks (micro-batches), whereas true streaming processes data events one at a time with minimal batch intervals.
x??

---
#### Code Example for Streaming DAG
Background context explaining how Pulsar simplifies the creation of streaming DAGs.

:p Provide an example in pseudocode for defining a simple streaming DAG using Pulsar.
??x
```java
public class SimpleStreamingDAG {
    // Define topics and transformations
    Topic clickstreamTopic = createTopic("clickstream");
    Topic iotTopic = createTopic("iot");

    // Process clickstream data
    Stream<String> clickstreamStream = consume(clickstreamTopic);

    // Preprocess clickstream data
    clickstreamStream.map(event -> enrichClickstreamEvent(event));

    // Process IoT data
    Stream<DeviceEvent> iotStream = consume(iotTopic);

    // Enrich IoT events with metadata
    iotStream.joinOnMetadata(deviceId -> enrichIoTEventWithMetadata(deviceId));

    // Combine enriched streams
    clickstreamStream.merge(iotStream);
}
```
The code demonstrates defining topics, consuming and processing streams, and combining them to create a streaming DAG.
x??

---

