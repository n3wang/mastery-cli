# High-Quality Flashcards: Designing-data-intensive-applications_-the-big-ideas-behind-reliable-scalable_processed (Part 7)


**Starting Chapter:** Summary

---


#### Data Models Overview
Data models are essential for organizing and storing data efficiently. Historically, hierarchical models were used but didn't handle many-to-many relationships well. Relational databases addressed this issue with tables and SQL, while more recent NoSQL databases offer alternatives like document and graph databases.

:p What is the main limitation of the hierarchical model in handling relationships?
??x
The hierarchical model struggled to represent many-to-many relationships effectively.
x??

---


#### Hierarchical Model Limitation
As mentioned, the hierarchical model was good for simple tree-like structures but didn’t handle complex relationships well. For example, a user could be friends with multiple users, and each of those users could have multiple friends.

:p How does the hierarchical model fail to represent many-to-many relationships?
??x
In a hierarchical model, data is structured in a tree or linear hierarchy where one node can only relate directly to its parent or child nodes. This structure makes it difficult to establish bidirectional or cross-node relationships.
x??

---


#### Relational Model Introduction
The relational model introduced tables and SQL (Structured Query Language) to better handle many-to-many relationships through the use of primary keys, foreign keys, and joins.

:p What is a key advantage of the relational model over hierarchical models?
??x
The relational model allows for more complex data relationships via primary and foreign keys, enabling efficient management of many-to-many relationships.
x??

---


#### NoSQL Databases Overview
NoSQL databases diverged into document and graph databases. Document databases store self-contained documents, while graph databases handle highly interconnected data.

:p What are the main differences between document and graph databases?
??x
Document databases store self-contained documents with a flexible schema, whereas graph databases focus on representing relationships between entities in a more complex manner.
x??

---


#### Graph Databases Use Case
Graph databases excel at handling applications where entities have many connections to other entities. For example, social networks or recommendation engines.

:p What type of application is best suited for graph databases?
??x
Applications that require modeling and querying highly interconnected data, such as social networks, recommendation systems, or complex network analysis.
x??

---


#### Query Languages Overview
Various query languages exist for different data models: SQL (relational), Cypher (graph), MongoDB's aggregation pipeline (document), etc.

:p What is the primary purpose of SQL in database management?
??x
SQL is used to manage and query relational databases, providing structured queries for inserting, updating, deleting, and retrieving data.
x??

---


#### MongoDB Aggregation Pipeline
MongoDB's aggregation pipeline processes documents through a series of stages, similar to SQL joins but more flexible. It can be used to aggregate data in complex ways.

:p How does the MongoDB aggregation pipeline work?
??x
The MongoDB aggregation pipeline processes documents stage by stage, allowing for complex operations such as filtering, grouping, and projecting.
```javascript
db.collection.aggregate([
   { $match: { field: "value" } },
   { $group: { _id: "$ field", count: {$sum: 1 } } }
])
```
x??

---


#### Lookup Performance

Background context: The `db_get` function in the example performs poorly for large databases as it searches through the entire file. This is inefficient, leading to a linear search time complexity of O(n).

:p Why does the `db_get` function have poor performance?
??x
The `db_get` function has poor performance because it scans the entire database file from beginning to end each time a key lookup is requested. This results in a linear time complexity, making it inefficient for large datasets.
x??

---


#### Log-Structured Storage Engines

Background context: Many databases use log-based storage engines where data is appended only and can help with high write throughput but complicate read operations.

:p What is the advantage of using a log in database storage?
??x
The primary advantage of using a log in database storage is that it allows for efficient append-only writes, which can provide high write throughput. However, this simplifies the data structure at the cost of making random reads more complex.
x??

---


#### Indexing for Efficient Lookups

Background context: To improve lookup performance, databases use indexes to maintain additional metadata that helps locate specific data efficiently.

:p What is an index in database terms?
??x
An index in database terms is a separate data structure derived from the primary data. It acts as a signpost and speeds up read queries by providing quick access to data.
x??

---


#### Trade-offs Between Indexing

Background context: Indexes improve read performance but can slow down writes due to additional overhead.

:p What are the trade-offs of using indexes?
??x
Indexes improve read performance by reducing lookup times. However, they introduce overhead during write operations as the index needs to be updated every time data is written, slowing down write performance.
x??

---


#### Selecting Appropriate Storage Engines

Background context: Different types of workloads require different storage engines; for instance, transactional workloads differ from analytics workloads.

:p Why should application developers care about storage engine selection?
??x
Application developers need to choose the appropriate storage engine based on their workload. Proper selection can optimize performance and meet specific requirements, such as high throughput or complex query handling.
x??

---


#### Log-Structured vs Page-Oriented Storage

Background context: Two main types of storage engines are log-structured and page-oriented, with B-trees being an example of the latter.

:p What is the difference between log-structured and page-oriented storage?
??x
Log-structured storage is append-only, ideal for high write throughput scenarios. Page-oriented storage, such as B-trees, supports both reads and writes more efficiently but can handle larger datasets.
x??

---

---


#### SSTables and Sorted String Tables
Background context: In database systems, especially for storage engines like those used in Cassandra or RocksDB, handling large volumes of data efficiently is crucial. Log-structured merge-trees (LSM-Trees) are a common approach to achieve this. Each log-structured storage segment initially stores key-value pairs in the order they were written, but values later in the log take precedence over earlier ones for the same key.

The introduction of SSTables (Sorted String Tables) modifies these segments by requiring keys to be sorted within each file. This allows for more efficient merging and reading operations, while still maintaining sequential write performance.

:p What is an SSTable?
??x
An SSTable is a segment file in which the sequence of key-value pairs is sorted by key. It retains all values written during some period but ensures that only the most recent value per key is kept across segments. This format enables efficient merging, index-free seeks, and compression.
x??

---


#### Merging SSTables
Background context: When dealing with multiple SSTable files, merging them to reduce fragmentation and improve performance is necessary. The merge process is designed to be simple and efficient, leveraging the sorted nature of each file.

:p How does the merge process work for SSTables?
??x
The merge process involves reading input files side by side and writing out the lowest key (according to the sort order) to the output file repeatedly until all files are exhausted. This results in a new merged segment file that is also sorted.
```java
// Pseudocode for merging SSTables
while (!files.isEmpty()) {
    KeyMinEntry minEntry = null;
    int index = -1;

    for (int i = 0; i < files.size(); ++i) {
        if (minEntry == null || compare(files.get(i).key, minEntry.key) < 0) {
            minEntry = files.get(i);
            index = i;
        }
    }

    output.append(minEntry.key, minEntry.value);
    if (!files.get(index).nextKey()) { // If no more keys in the file
        files.remove(index); // Remove it from the list of open files
    }
}
```
x??

---


#### Efficient Search with SSTables
Background context: With SSTables, searching for a specific key does not require an index if the file is sorted. Instead, you can leverage the sorted order to perform efficient range scans and locate keys without needing in-memory indices.

:p How can one efficiently search for a key in an SSTable?
??x
To find a key in an SSTable, you don't need an in-memory index of all keys. You use the sorted nature of the file: if you know the offsets of two surrounding keys and their values, you can jump to the offset of the lower key and scan sequentially until you find the target key or exhaust the range.
```java
// Pseudocode for binary search-like approach with SSTables
int start = 0;
int end = segmentFile.length - 1;

while (start < end) {
    int mid = (start + end) / 2;
    
    if (keyAt(mid).equals(targetKey)) {
        return valueAt(mid);
    } else if (keyAt(mid).compareTo(targetKey) < 0) {
        start = mid + 1;
    } else {
        end = mid - 1;
    }
}
return null; // If key not found
```
x??

---


#### Compaction and Memtables
Background context: To manage writes efficiently, the storage engine uses a combination of in-memory structures (memtables) and on-disk sorted files (SSTables). Memtables are used for active writes, while SSTables store historical data. Periodic compaction processes merge these to optimize disk usage.

:p What is the role of memtables in an LSM-Tree?
??x
Memtables act as an in-memory storage structure that receives incoming writes. They maintain a sorted order of key-value pairs. When they reach a certain size threshold, they are flushed to disk as SSTables, becoming part of the immutable on-disk storage.
```java
// Pseudocode for memtable management
class Memtable {
    private TreeMap<Key, Value> entries;

    public void put(Key key, Value value) {
        if (entries.size() > MAX_MEMTABLE_SIZE) flushToDisk();
        entries.put(key, value);
    }

    // Method to create an SSTable from the current state of memtable
    public void flushToDisk() {
        // Convert TreeMap to a byte[] and write it as an SSTable file
    }
}
```
x??

---

---

