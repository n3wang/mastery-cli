# High-Quality Flashcards: 006---Designing-Machine-Learning-Systems_processed (Part 5)

**Starting Chapter:** Text vs. Binary Format

---

#### Columnar Storage in Parquet
Parquet is a columnar storage format that stores data by columns rather than rows, which improves compression and query performance. This structure allows for efficient data retrieval and is especially beneficial for analytical workloads.

:p What is the benefit of columnar storage in Parquet?
??x
Columnar storage in Parquet stores data by columns, which allows for better compression and faster query performance. Since data of the same type is grouped together, compression algorithms can work more effectively. Additionally, analytical queries that only need specific columns can read only those parts of the file, reducing I/O. This is particularly useful for large datasets in data science and analytics.
$$
\text{Columnar storage} = \text{Grouping data by columns} \Rightarrow \text{Better compression and performance}
$$
```java
// Example: Querying specific columns in Parquet
ParquetFile parquet = new ParquetFile("data.parquet");
List<String> columns = Arrays.asList("name", "age"); // Only read these columns
```
x??

---

#### Parquet vs CSV Storage Efficiency
Background context: When storing data in Amazon S3, Parquet format offers significant storage savings compared to text formats like CSV. For instance, an interview file that is 14MB in CSV format reduces to 6MB in Parquet. AWS recommends Parquet because it's up to 2x faster to unload and consumes up to 6x less storage. This efficiency comes from Parquet's columnar storage, compression, and metadata optimization.
:p What are the advantages of using Parquet over CSV for data storage?
??x
Parquet is more efficient for storage and query performance due to its columnar format, built-in compression, and metadata. Unlike CSV, which is row-based and less compact, Parquet stores data in columns and uses encoding techniques such as run-length encoding and dictionary encoding. This results in reduced I/O, faster reads, and lower storage costs. For example, if you have a large dataset with many repeated values in a column, Parquet can compress it significantly.

```java
// Example of how Parquet is structured vs CSV
// CSV:
// name,age,salary
// John,25,50000
// Jane,30,60000

// Parquet stores data in columns, so age and salary are stored together,
// enabling efficient compression and fast filtering.
```
x??

---

#### Transactional vs Analytical Processing
Background context: In production systems, data is often processed using two main types of queries: transactional and analytical. Transactional queries are fast, real-time, and support ACID properties. Analytical queries involve aggregations and insights over large datasets and are often batch-oriented. Historically, these were handled by separate systems (OLTP vs OLAP), but modern systems are merging.
:p What are the key differences between transactional and analytical processing?
??x
Transactional processing (OLTP) focuses on fast, real-time operations like inserts, updates, and deletes. It ensures ACID compliance: Atomicity (all steps succeed or fail), Consistency (data follows rules), Isolation (concurrent operations don’t interfere), and Durability (committed transactions persist). Analytical processing (OLAP) supports aggregations, complex queries, and data analysis over time. Modern systems like CockroachDB and Apache Iceberg blur the lines between OLTP and OLAP by supporting both types of workloads.
x??

---

#### OLTP vs OLAP Evolution
Background context: Originally, OLTP (Online Transaction Processing) and OLAP (Online Analytical Processing) were distinct systems. OLTP handled fast, real-time transactions, while OLAP supported complex analytical queries. However, with modern technologies, these boundaries are blurring. Systems like CockroachDB and Apache Iceberg now support both transactional and analytical queries.
:p Why are the terms OLTP and OLAP considered outdated?
??x
The terms OLTP and OLAP are outdated because:
1. **Technology advancements**: Modern databases like CockroachDB and Apache Iceberg support both transactional and analytical workloads.
2. **Decoupling storage and compute**: Systems like Snowflake and BigQuery separate data storage from processing engines, allowing flexible querying.
3. **Overloaded term "online"**: The term "online" now refers to processing speed (real-time, nearline, offline) rather than just being connected to the internet.

This evolution allows for more flexible and efficient data systems.
x??

---

#### ETL Process in ML Systems
Background context: ETL (Extract, Transform, Load) is a core process in building ML systems. It involves extracting raw data from sources, transforming it into a usable format, and loading it into a target system like a data warehouse or ML pipeline. This process ensures data is clean, consistent, and ready for analysis or model training.
:p What is the ETL process and why is it important in ML system development?
??x
ETL stands for:
1. **Extract**: Pull data from various sources (databases, APIs, files).
2. **Transform**: Clean, normalize, and structure data for analysis.
3. **Load**: Store transformed data into a target system (e.g., data warehouse or ML pipeline).

In ML systems, ETL ensures that data is consistent, high-quality, and in the right format for training models. Without ETL, raw data may be messy or incompatible with ML algorithms.
```java
// Pseudocode for ETL
Extract(source) -> rawData
Transform(rawData) -> cleanData
Load(cleanData, target)
```
x??

---

#### Stream vs Batch Processing
Background context: While not covered in this chapter, stream processing is an important concept in data engineering. Unlike batch processing, which processes data in large chunks, stream processing handles data as it arrives. This is critical for real-time applications like fraud detection or live dashboards.
:p Why is stream processing important in modern data systems?
??x
Stream processing handles data as it arrives, enabling real-time insights and actions. Unlike batch processing, which waits for data to accumulate, stream processing is essential for applications like fraud detection, live dashboards, or IoT analytics. It allows systems to respond instantly to changes, improving user experience and system responsiveness.
$$
\text{Example: Fraud detection} \Rightarrow \text{Transaction stream} \Rightarrow \text{Instant alert if suspicious}
$$
x??

---

---

#### ETL Process Overview
The ETL (Extract, Transform, Load) process is a foundational data integration approach used in data engineering and machine learning pipelines. It involves three main steps: extracting data from various sources, transforming it into a consistent format, and loading it into a target system such as a database or data warehouse. This process ensures that data is clean, standardized, and ready for analysis or model training.

:p What are the three stages of ETL and their roles in data processing?
??x
1. **Extract**: Data is pulled from multiple sources (databases, APIs, files, etc.). During this stage, validation occurs to ensure data integrity. Corrupted or malformed data may be rejected and flagged for correction.
2. **Transform**: This is where most of the data processing happens. Data from different sources is cleaned, standardized, joined, deduplicated, and enriched. For example, converting "M" and "F" to "Male" and "Female", or aggregating daily sales into monthly totals.
3. **Load**: Transformed data is loaded into a target destination like a data warehouse or database, often scheduled for regular updates.
x??

---

#### ELT vs ETL Paradigm
In ETL, data is transformed before being loaded into the target system. In ELT, data is first loaded into a storage layer (like a data lake), then transformed later by analytical tools or applications. ELT became popular with the rise of cloud computing and big data, as it allows fast ingestion of raw data without upfront transformation.

:p When did the shift from ETL to ELT occur, and what was the motivation?
??x
The shift to ELT occurred with the rise of cloud computing and powerful infrastructure, which made storing large volumes of raw data cheaper and more scalable. Companies began using data lakes to store raw data and perform transformations later using tools like Spark or SQL engines, reducing the upfront cost of data processing.
x??

---

