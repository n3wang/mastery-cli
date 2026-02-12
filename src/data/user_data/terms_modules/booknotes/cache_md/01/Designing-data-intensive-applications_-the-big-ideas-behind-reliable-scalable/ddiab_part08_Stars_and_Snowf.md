# High-Quality Flashcards: Designing-data-intensive-applications_-the-big-ideas-behind-reliable-scalable_processed (Part 8)


**Starting Chapter:** Stars and Snowflakes Schemas for Analytics

---


#### OLTP Databases vs Data Warehouses
Background context explaining the divergence between OLTP databases and data warehouses. These systems often share a SQL query interface but are optimized for very different types of queries, with OLTP focusing on transaction processing and data warehousing focused on analytics.

:p What is the main difference in optimization between OLTP databases and data warehouses?
??x
The main difference lies in their primary use case: OLTP databases are optimized for high transaction throughput and fast reads/writes typical of online transactional processing, whereas data warehouses are designed to handle complex analytical queries and large datasets. This leads to differences in storage structures, indexing strategies, and query optimization techniques.
x??

---

#### SQL-on-Hadoop Projects
Background context explaining the emergence of open source projects that combine SQL with Hadoop for analytics.

:p What is a SQL-on-Hadoop project?
??x
SQL-on-Hadoop projects are designed to provide SQL querying capabilities over data stored in distributed file systems such as HDFS, allowing users to run SQL-like queries on big datasets without needing to use the lower-level MapReduce framework.
x??

---

#### Star Schema and Data Warehousing
Background context explaining the common schema used in data warehouses, known as a star schema.

:p What is a star schema?
??x
A star schema is a type of data warehouse schema that organizes data around facts with dimensions. It consists of a central fact table linked to several dimension tables through foreign keys. This structure simplifies querying and helps improve performance for analytical queries.
x??

---

#### Fact Tables in Data Warehouses
Background context explaining the role of fact tables in star schemas.

:p What is a fact table?
??x
A fact table in a star schema contains measurements or facts about events, such as sales transactions. Each row represents an event with attributes like date, product ID, and quantity sold. Fact tables are usually very large due to their need to store detailed transactional data.
x??

---

#### Dimension Tables in Data Warehouses
Background context explaining the role of dimension tables in star schemas.

:p What is a dimension table?
??x
A dimension table in a star schema contains information about the attributes or characteristics of events, such as product details, customer profiles, and geographical information. Each row represents an attribute value that can be used to filter or categorize facts.
x??

---

#### Example Star Schema: Grocery Retailer Data Warehouse
Background context explaining the example provided in the text.

:p What is the star schema example given for a grocery retailer data warehouse?
??x
The example shows a grocery retailer's data warehouse with a central fact table `fact_sales` that records each customer’s purchase of a product. There are also dimension tables such as `dim_product`, which contains information about the products, and possibly other dimensions like time or location.
x??

---

#### Diversification in Data Warehouse Vendors
Background context explaining the trend towards specialized solutions for transaction processing and analytics.

:p Why do data warehouse vendors often specialize?
??x
Data warehouse vendors often specialize because many database systems are increasingly focusing on either transaction processing (OLTP) or analytics workloads. Specializing allows them to optimize their engines more effectively, leading to better performance in their primary use cases.
x??

---

#### Open Source SQL-on-Hadoop Projects
Background context explaining the recent trend towards open source solutions for big data analytics.

:p What are some popular open-source SQL-on-Hadoop projects?
??x
Popular open-source SQL-on-Hadoop projects include Apache Hive, Spark SQL, Cloudera Impala, Facebook Presto, Apache Tajo, and Apache Drill. These tools aim to provide SQL querying capabilities over large datasets stored in HDFS or other distributed file systems.
x??

---

#### Google’s Dremel Influence
Background context explaining the influence of Google's Dremel on some open-source projects.

:p How does Google's Dremel influence modern SQL-on-Hadoop projects?
??x
Google's Dremel project introduced a query system designed to handle massive, nested data. This has influenced many modern SQL-on-Hadoop projects by inspiring them to develop more efficient and scalable querying mechanisms for big data.
x??

---


#### Star Schema Overview
Background context: A star schema is a type of database schema used for data warehousing and business intelligence. It consists of fact tables surrounded by dimension tables, forming a "star" shape when visualized. This structure allows efficient querying and aggregation of data.

:p What is a star schema?
??x
A star schema is a database design pattern used in data warehousing where the central table (fact table) is connected to several smaller auxiliary tables (dimension tables). The fact table contains metrics and measures, while dimension tables provide context or metadata about those metrics.
x??

---

#### Snowflake Schema Overview
Background context: A snowflake schema is an extension of a star schema. In this design, dimensions are broken down into subdimensions, creating a more normalized structure.

:p What differentiates a snowflake schema from a star schema?
??x
A snowflake schema differs from a star schema by breaking down dimension tables into multiple related tables (subdimensions), making the schema more normalized but potentially harder to query due to increased complexity.
x??

---

#### Wide Tables in Data Warehouses
Background context: In data warehousing, fact and dimension tables are often very wide with many columns. However, typical queries only require a few columns.

:p Why do fact and dimension tables in data warehouses tend to be wide?
??x
Fact and dimension tables are wide because they store extensive metadata for analysis. Fact tables can have over 100 columns, while dimension tables may include various details relevant for analysis, such as store services, square footage, and historical information.
x??

---

#### Column-Oriented Storage Benefits
Background context: Column-oriented storage is used to improve the efficiency of querying large datasets by storing values of each column in separate files. This allows queries to access only needed columns rather than loading entire rows.

:p How does column-oriented storage improve query performance?
??x
Column-oriented storage improves query performance by storing data in a way that allows selective reading of specific columns. Since most queries access only a few columns, the database can efficiently load and process just those required values without processing unnecessary attributes.
x??

---

#### Example of Column-Oriented Storage Query
Background context: The example provided illustrates how column-oriented storage can be used to improve query performance by accessing only necessary data.

:p Explain the SQL query in Example 3-1 and its optimization for column-oriented storage?
??x
The SQL query in Example 3-1 selects specific columns from multiple tables, filtering based on date and product category. By using column-oriented storage, the database can efficiently read and process only the `date_key`, `product_sk`, and `quantity` columns needed for this aggregation.

```sql
-- SQL Query
SELECT   dim_date.weekday,
         dim_product.category ,
         SUM(fact_sales.quantity ) AS quantity_sold 
FROM fact_sales 
JOIN dim_date ON fact_sales.date_key = dim_date.date_key 
JOIN dim_product  ON fact_sales.product_sk = dim_product.product_sk 
WHERE dim_date.year = 2013 AND dim_product.category IN ('Fresh fruit', 'Candy') 
GROUP BY   dim_date.weekday, dim_product.category ;
```
x??

---

#### Row-Oriented vs Column-Oriented Storage
Background context: Traditional row-oriented storage stores all fields of a record together, while column-oriented storage separates data into columns.

:p What is the difference between row-oriented and column-oriented storage?
??x
Row-oriented storage stores entire records contiguously in memory, whereas column-oriented storage organizes data by column. This means that row-oriented databases are optimized for transactional workloads where whole rows are inserted or updated frequently, while column-oriented databases excel at querying large datasets with selective columns.
x??

---

#### Columnar Storage Format Example: Parquet
Background context: Parquet is a columnar storage format used in big data processing.

:p What is Parquet and how does it fit into the columnar storage concept?
??x
Parquet is a columnar storage format designed for efficient query performance on large datasets. It stores data by columns rather than rows, making it particularly useful for analytics where specific columns are frequently accessed during queries.
x??

---


#### Column-Oriented Storage Layout
Column-oriented storage organizes data by columns rather than rows, which is advantageous for data warehousing and analytics. This layout allows for efficient querying of large datasets because it only loads the necessary columns from disk.

:p What is column-oriented storage?
??x
Column-oriented storage is a method of organizing data in databases where each column is stored as a separate file or segment on disk. This contrasts with row-oriented storage, which stores all attributes of an entity together in one contiguous record. The primary advantage lies in the ability to quickly scan and retrieve large portions of a single column for analytics purposes.

x??

---

#### Column Compression
Column compression further optimizes data storage by reducing the amount of space required on disk. This is achieved through various techniques that take advantage of the repetitive nature of data within columns.

:p How does column compression work?
??x
Column compression works by identifying patterns and repetitions in a dataset, then encoding these patterns to reduce storage requirements. A common technique used in data warehouses is bitmap encoding.

For example, consider a column with 100 distinct values out of millions of rows. We can represent each value as a separate bitmap where each bit indicates whether the corresponding row contains that value. If the number of distinct values (n) is small compared to the number of rows, these bitmaps are stored efficiently.

x??

---

#### Bitmap Encoding
Bitmap encoding is particularly effective in column-oriented databases for columns with few distinct values. It involves creating a bitmap for each unique value in the column.

:p What is bitmap encoding?
??x
Bitmap encoding creates one or more bitmaps to represent the presence or absence of specific values within a column. Each row in the database corresponds to a single bit, which is set if the row contains that particular value and unset otherwise.

For instance, if we have a `product_sk` column with 100 distinct products out of millions of rows, we can create one bitmap for each product where bits are set based on whether the corresponding row contains that product. This technique is especially useful in data warehouses due to its efficiency in handling sparse data.

x??

---

#### Run-Length Encoding
Run-length encoding (RLE) is a form of lossless data compression where sequences of identical data values are stored as single values and counts. In column storage, RLE can be applied after bitmap encoding for columns with many zeros.

:p How does run-length encoding work?
??x
Run-length encoding works by compressing sequences of the same value into a smaller representation. For example, instead of storing "0 0 1 0 0", it stores something like "2 0s, 1 1, 3 0s". This is particularly effective for sparse data.

In the context of bitmap encoding, if most bitmaps contain mostly zeros (sparse data), run-length encoding can further reduce the storage requirements by storing consecutive zeros as a count and a single bit value.

x??

---

#### Query Optimization with Bitmap Indexes
Bitmap indexes are used in column-oriented databases to speed up queries involving conditions on columns. They leverage the bitmap representation of values to perform efficient bitwise operations.

:p How do bitmap indexes work?
??x
Bitmap indexes use bitmaps to represent the presence or absence of specific values within a column, allowing for fast evaluation of conditions. For example, if you need to find rows where `product_sk` is 30, 68, or 69, you can load the corresponding bitmaps and perform a bitwise OR operation to get the result.

```java
// Pseudocode for bitmap index query execution
public boolean[] findRowsWithBitmapIndex(int productSk) {
    // Load the bitmap for the given product_sk
    BitSet bitmap = loadBitmapForProduct(productSk);
    
    // Initialize an array of bits corresponding to the rows
    boolean[] result = new boolean[rowCount];
    
    // Mark all positions where the bit is set (1)
    for (int i = 0; i < rowCount; i++) {
        if (bitmap.get(i)) {
            result[i] = true;
        }
    }
    
    return result;
}
```

x??

