# High-Quality Flashcards: Designing-data-intensive-applications_-the-big-ideas-behind-reliable-scalable_processed (Part 9)


**Starting Chapter:** Stars and Snowflakes Schemas for Analytics

---


#### OLTP Databases vs. Data Warehouses
Background context explaining how transaction processing (OLTP) databases and data warehouses differ, focusing on their data models, query patterns, and optimization goals.

Both OLTP databases and data warehouses provide SQL interfaces but are optimized for different types of queries:
- OLTP databases optimize for high-speed transactions with ACID properties.
- Data warehouses focus on complex analytical queries over large datasets.

Many database vendors specialize in either transaction processing or analytics workloads, though some like Microsoft SQL Server and SAP HANA offer both. However, they increasingly split into separate storage and query engines accessible through a common SQL interface.

:p How do OLTP databases and data warehouses differ?
??x
OLTP databases are optimized for high-speed transactions with ACID properties (atomicity, consistency, isolation, durability), whereas data warehouses focus on complex analytical queries over large datasets. Both provide SQL interfaces but have different internal optimizations.
x??

---


#### Star Schema in Data Warehouses
Background context explaining the star schema, a common data model used in data warehouses for analytic purposes.

Star schemas are used to represent data for analysis in a highly structured manner. The central table is called the fact table, containing facts (data points) and foreign key references to dimension tables that provide additional details about each fact.

:p What is a star schema?
??x
A star schema is a common data model used in data warehouses where a central fact table contains detailed information, with foreign keys linking to multiple dimension tables. This structure allows for efficient analysis.
x??

---


#### Fact Tables and Dimension Tables
Background context explaining the roles of fact tables and dimension tables within a star schema.

Fact tables store facts (data points) about events, while dimension tables provide additional details such as who, what, where, when, how, why of each event. This structure facilitates complex queries for analysis.

:p What are fact tables and dimension tables?
??x
- Fact tables store detailed information about events.
- Dimension tables provide additional context (who, what, where, when, how, why) of the events referenced in fact tables.
x??

---


#### Large Scale Data Warehouses
Background context explaining the scale and structure of large enterprise data warehouses.

Large enterprises like Apple, Walmart, or eBay may have tens of petabytes of transaction history in their data warehouses, mostly stored in fact tables. The schema is designed to support complex analytical queries efficiently.

:p What characteristics do large-scale data warehouses typically have?
??x
Large-scale data warehouses often contain tens of petabytes of transactional data, primarily in fact tables. They are optimized for handling complex analytical queries and provide detailed dimension information.
x??

---


#### Dremel and SQL-on-Hadoop Projects
Background context on how some open-source projects are inspired by Google's Dremel for efficient data processing.

Projects like Apache Drill draw inspiration from Google’s Dremel project for its ability to process semi-structured data efficiently. This approach is relevant in SQL-on-Hadoop environments.

:p How do some open-source projects relate to Google’s Dremel?
??x
Projects like Apache Drill are inspired by Google’s Dremel, which allows efficient processing of semi-structured data, making them suitable for large-scale analytics in Hadoop ecosystems.
x??

---

---


#### Star Schema
Background context: The star schema is a data warehouse design that organizes data around facts and dimensions. Fact tables store measurements, while dimension tables provide metadata about these facts. The name "star" comes from the visual representation of these tables in a database schema.

:p What is a star schema and how does it organize data?
??x
A star schema organizes data by centralizing fact tables surrounded by multiple dimension tables. Fact tables contain measurements or metrics, while dimension tables provide context through metadata.
Example:
```sql
-- Star Schema Example
CREATE TABLE fact_sales (
    sale_id INT,
    date_key INT,
    product_sk INT,
    quantity INT
);

CREATE TABLE dim_date (
    date_key INT PRIMARY KEY,
    year INT,
    month INT,
    day_of_week VARCHAR(10)
);

CREATE TABLE dim_product (
    product_sk INT PRIMARY KEY,
    category VARCHAR(50),
    brand_name VARCHAR(50)
);
```
x??

---


#### Column-Oriented Storage
Background context: In column-oriented storage, data is stored in columns rather than rows. This approach optimizes the storage and querying of large datasets by reducing the amount of disk I/O needed.

:p How does column-oriented storage work?
??x
Column-oriented storage organizes data into columns instead of rows, allowing queries to read only the necessary columns. This reduces unnecessary processing and enhances query performance.
Example:
```sql
-- Column-Oriented Storage Example
CREATE TABLE fact_sales (
    sale_id INT,
    date_key INT,
    product_sk INT,
    quantity INT,
    price DECIMAL(10,2),
    // many more attributes...
) WITH (ORIENTATION = COLUMN);
```
x??

---


#### Comparison of Row-Oriented vs. Column-Oriented Storage
Background context: Traditional row-oriented storage stores all columns in a single table row, while column-oriented storage separates data into individual files per column.

:p What are the key differences between row-oriented and column-oriented storage?
??x
Row-oriented storage stores all attributes together for each record, making it efficient for transactional workloads. Column-oriented storage organizes data by column, allowing queries to access only relevant columns, optimizing performance.
Example:
```sql
-- Row-Oriented Storage Example
CREATE TABLE fact_sales (
    sale_id INT,
    date_key INT,
    product_sk INT,
    quantity INT,
    price DECIMAL(10,2),
    // many more attributes...
);
```
x??

---


#### Query Optimization in Column-Oriented Storage
Background context: Queries on wide tables can benefit significantly from column-oriented storage because only the necessary columns are read and processed.

:p How does a query like Example 3-1 benefit from column-oriented storage?
??x
The query in Example 3-1 accesses fewer than 5 out of over 100 columns, which is efficient with column-oriented storage. Only these required columns are read, reducing the amount of data that needs to be processed.
Example SQL:
```sql
-- Query from Example 3-1
SELECT   dim_date.weekday, dim_product.category,
         SUM(fact_sales.quantity) AS quantity_sold 
FROM fact_sales
JOIN dim_date     ON fact_sales.date_key = dim_date.date_key
JOIN dim_product  ON fact_sales.product_sk = dim_product.product_sk
WHERE dim_date.year = 2013 AND dim_product.category IN ('Fresh fruit', 'Candy')
GROUP BY   dim_date.weekday, dim_product.category;
```
x??

---

---


#### Column-Oriented Storage Layout
Background context: In column-oriented storage, data is organized by columns rather than rows. This allows for more efficient query processing and compression techniques.

:p What is the main characteristic of column-oriented storage?
??x
Column-oriented storage organizes data by columns instead of rows.
x??

---


#### Column Compression Techniques
Background context: Column compression aims to reduce disk space usage while maintaining performance. Techniques like bitmap encoding are particularly effective in data warehouses due to repetitive sequences of values.

:p What is an example of a column compression technique used in data warehouses?
??x
Bitmap encoding is a technique that uses bitmaps to represent columns with few distinct values.
x??

---


#### Efficient Query Execution with Bitmaps
Background context: Bitmap indexes are particularly useful for common query operations in data warehouses, such as `IN` clauses.

:p How can bitmap encoding be used to efficiently execute WHERE product_sk IN queries?
??x
Bitmaps can be loaded for each value specified in the `IN` clause and then combined using bitwise OR operations. This process is highly efficient.
x??

---

