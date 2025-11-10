# High-Quality Flashcards: Designing-data-intensive-applications_-the-big-ideas-behind-reliable-scalable_processed (Part 7)


**Starting Chapter:** B-Trees

---


#### Log-Structured Merge (LSM) Storage Engines

Background context explaining the concept. The LSM storage engines are designed to handle very large datasets that may not fit entirely into memory. By merging and compacting sorted files, they balance read and write operations efficiently.

:p What is an LSM storage engine?

??x
An LSM storage engine is a type of storage architecture used in databases where data is stored as a sequence of merged and compacted sorted files. This design allows for efficient writes by appending new data to memory buffers (memtables), which are then periodically flushed and merged into immutable, on-disk structures known as SSTables.

The key advantage of LSM-trees is their ability to support high write throughput while maintaining the ability to perform fast read operations through background compaction. Here's a simplified pseudocode example of how data might be handled in an LSM engine:

```java
class LSMStorageEngine {
    private MemTable memTable;
    private List<SSTable> sstables;

    public void put(String key, String value) {
        // Insert into memtable first
        memTable.put(key, value);
        if (memTable.isFull()) {
            SSTable newSSTable = memTable.flushToDisk();
            sstables.add(newSSTable);
        }
    }

    public boolean get(String key) {
        // First check in memtable
        String value = memTable.get(key);
        if (value != null) return true;
        
        // Then search in SSTables
        for (SSTable sstable : sstables) {
            value = sstable.get(key);
            if (value != null) return true; // Return the found value
        }
        return false; // Key not found
    }

    private void compact() {
        // Merge smaller SSTables into larger ones to optimize storage and performance
        while (sstables.size() > maxLevels) {
            List<SSTable> candidates = getLeastRecentlyUsedSSTables();
            new SSTable mergeCandidates(candidates);
            sstables.remove(candidates);  // Remove merged tables from the list
        }
    }
}
```

x??

---

#### Bloom Filters in LSM Storage Engines

Background context explaining the concept. To optimize read operations, especially for non-existent keys, storage engines often use additional data structures like Bloom filters to approximate whether a key is present or not without reading from disk.

:p What are Bloom filters and how do they improve performance?

??x
Bloom filters are memory-efficient probabilistic data structures used to test whether an element is a member of a set. They provide a space-efficient way to answer membership queries with a trade-off: false positives are possible, but false negatives are not. This means that if a Bloom filter returns "not in the set," you can be sure it's correct; however, if it says "in the set," there is a small chance of error.

Bloom filters work by using multiple hash functions to map elements into bit arrays. If an element is present in the set, all bits at the positions specified by the hashes will be set. When querying for membership, these same positions are checked; if any of them is not set, the element is definitely not in the set, but if they are all set, it's likely that the element is in the set.

:p How can Bloom filters be implemented to optimize read operations in LSM storage engines?

??x
Bloom filters can be implemented as follows:

```java
class BloomFilter {
    private BitSet bits;
    private int numHashFunctions;

    public BloomFilter(int size, int hashFunctions) {
        this.bits = new BitSet(size);
        this.numHashFunctions = hashFunctions;
    }

    // Add an element to the filter
    public void add(String key) {
        for (int i = 0; i < numHashFunctions; i++) {
            int index = hashFunction(key, i);
            bits.set(index, true);
        }
    }

    // Check if a key might be in the set
    public boolean mightContain(String key) {
        for (int i = 0; i < numHashFunctions; i++) {
            int index = hashFunction(key, i);
            if (!bits.get(index)) return false;
        }
        return true; // Possible match, but not a definitive proof
    }

    private int hashFunction(String key, int idx) {
        // A simple hash function for demonstration purposes
        long h = 0x123456789ABCDEFL;
        h += (long)(key.hashCode() * idx);
        return Math.abs((int)(h % bits.length()));
    }
}
```

By using Bloom filters, storage engines can quickly determine that a key is not present in the database and avoid unnecessary disk reads for non-existent keys.

x??

---

#### Compaction Strategies in LSM Storage Engines

Background context explaining the concept. Compaction strategies are crucial for managing the growth of SSTables over time. Different strategies aim to balance between memory usage, performance, and storage efficiency.

:p What are compaction strategies in LSM storage engines?

??x
Compaction strategies refer to the methods used by LSM storage engines to manage the merging and consolidation of multiple small SSTables into larger ones. The goal is to reduce the number of files on disk, improve read performance, and reclaim space more efficiently.

There are two common compaction strategies: size-tiered and leveled compaction.

- **Size-Tiered Compaction**: This strategy merges newer and smaller SSTables into older and larger ones based on their sizes. The idea is to avoid creating too many small files that can impact read performance.

- **Leveled Compaction**: In this approach, the key range is split into smaller SSTables, and older data is moved to separate "levels." This strategy allows compaction to proceed more incrementally and uses less disk space by reducing the number of merges required.

:p Which databases use size-tiered and leveled compaction strategies?

??x
- **Size-Tiered Compaction**: HBase uses this strategy.
- **Leveled Compaction**: LevelDB (hence its name) and RocksDB use this approach.

These strategies help in managing the growth of SSTables efficiently, balancing between memory usage and performance. By minimizing the number of files, compaction can reduce overhead and improve overall system performance.

x??

---


#### B-Tree Structure and Segmentation
B-trees break down databases into fixed-size blocks or pages, traditionally 4 KB in size. Each page can be identified using an address or location, allowing one page to refer to another—similar to a pointer but on disk instead of in memory.
:p How does a B-tree structure the database?
??x
A B-tree organizes data by dividing it into fixed-size pages (usually 4 KB). These pages are linked together through pointers, forming a hierarchical tree structure. Each page contains keys and references to child pages, which further break down key ranges.
x??

---

#### Branching Factor in B-Trees
The number of references to child pages in one page of the B-tree is called the branching factor. For example, in Figure 3-6, the branching factor is six. In practice, it typically depends on the amount of space required for storing page references and range boundaries.
:p What is the branching factor in a B-tree?
??x
The branching factor in a B-tree indicates the number of child pages that can be referenced from a single parent page. It affects how keys are distributed across levels of the tree, influencing its performance and balance.

For example:
```java
// Pseudocode to illustrate branching factor calculation
int calculateBranchingFactor(int keyCount) {
    // Assume each reference takes 4 bytes and each key is 8 bytes
    int pageSize = 4096; // 4 KB page size in bytes
    int referenceSize = 4; // Size of a single reference (pointer)
    int keySize = 8; // Size of a single key

    return (pageSize - (keyCount * keySize)) / referenceSize;
}
```
x??

---

#### Inserting Keys into B-Trees
Inserting a new key is straightforward, but deleting one requires maintaining the tree's balance. Each page in a B-tree contains keys and references to child pages, with each child responsible for a continuous range of keys.
:p How do you insert a new key into a B-tree?
??x
To insert a new key, start from the root and traverse down through the tree until reaching a leaf node (a page containing individual keys). If there is enough space in the leaf, add the new key. Otherwise, split the leaf into two half-full pages and update the parent to reflect this change.

Example:
```java
void insertIntoBTree(Node root, int key) {
    Node leaf = findLeaf(root, key); // Find the leaf where the key should be inserted
    
    if (leaf.hasSpaceForKey()) {
        leaf.insertKey(key); // Insert key directly if space is available
    } else {
        splitAndInsert(leaf, key); // Split the page and update parent nodes accordingly
    }
}
```
x??

---

#### Deleting Keys from B-Trees
Deleting a key in a B-tree involves more complexity due to maintaining tree balance. It requires updating references and potentially splitting or merging pages.
:p How do you delete a key from a B-tree?
??x
Deleting a key typically involves the following steps:
1. Traverse down to the leaf page containing the key.
2. If the key is found, remove it. Check if there are enough keys in adjacent sibling nodes; merge them if necessary.
3. Update parent references and balance the tree as needed.

Example:
```java
void deleteKeyFromBTree(Node root, int key) {
    Node leaf = findLeaf(root, key); // Find the leaf containing the key
    
    if (leaf.removeKey(key)) { // Remove the key from the leaf
        // Handle page underflow and rebalance as needed
        mergeOrSplit(leaf);
    } else {
        System.out.println("Key not found.");
    }
}
```
x??

---

#### Updating Values in B-Trees
Updating a value for an existing key involves finding the correct leaf node, updating the value there, and writing it back to disk. References remain valid.
:p How do you update a value in a B-tree?
??x
To update a value:
1. Find the leaf page containing the key.
2. Update the value within that page.
3. Write the updated page back to disk.

Example:
```java
void updateValueInBTree(Node root, int key, Object newValue) {
    Node leaf = findLeaf(root, key); // Find the leaf with the given key
    
    if (leaf.containsKey(key)) { // Check if the key exists in the leaf
        leaf.updateKey(key, newValue); // Update the value of the key
        writePageToDisk(leaf); // Write the updated page back to disk
    } else {
        System.out.println("Key not found.");
    }
}
```
x??

---

#### Growing a B-Tree by Splitting Pages
Splitting a full page into two half-full pages and updating parent references ensures that the tree remains balanced.
:p How does splitting a page in a B-tree work?
??x
When a page fills up, it is split into two half-full pages. The middle key is promoted to its parent node (if any), rebalancing the structure.

Example:
```java
void splitAndInsert(Node parent, int key) {
    Node leftPage = new Node(); // Create new left child page
    Node rightPage = new Node(); // Create new right child page
    
    // Copy keys and references to appropriate pages
    copyKeysToPages(leftPage, rightPage, parent);
    
    if (parent != null) { // Update the parent node with split information
        addSplitKey(parent, key, leftPage, rightPage);
    }
}
```
x??

---

#### B-Tree Depth and Performance
A B-tree with \( n \) keys always has a depth of \( O(\log n) \). Most databases fit into a tree that is three or four levels deep.
:p What determines the depth of a B-tree?
??x
The depth of a B-tree is determined by the number of keys it contains. Specifically, for a B-tree with \( n \) keys, the depth is logarithmic in nature, i.e., \( O(\log n) \). This ensures efficient lookup and traversal.

For example:
```java
int logBase2(int n) {
    return (int)(Math.log(n) / Math.log(2)); // Logarithm base 2 of n
}
```
x??

---

#### Overwriting Pages in B-Trees
Overwriting a page on disk with new data is the basic underlying write operation for B-trees.
:p What is the fundamental write operation in B-trees?
??x
The fundamental write operation in B-trees involves overwriting a page on disk with updated data. This ensures that changes are persisted and can be retrieved later.

Example:
```java
void writePageToDisk(Node page) {
    // Code to write the node's contents to disk
}
```
x??

---


#### Disk Overwrite Operation

Background context: When data is updated in a B-tree, the page containing the old data must be overwritten with new data. This operation occurs on both magnetic hard drives and SSDs but involves different mechanisms due to their underlying technology.

On a magnetic hard drive, overwriting involves moving the disk head to the correct position, waiting for the right sector on the spinning platter to come around, and then writing the new data.

On SSDs, more complex operations are required because of their block-based architecture. An entire block (which is much larger than a single page) must be erased and rewritten each time a page within that block is updated.

:p What does overwriting mean in the context of disk storage for B-trees?
??x
In the context of disk storage, overwriting means replacing data on an existing page with new data. This involves physically changing the content stored at the same location on the hard drive or SSD.
??x

---

#### Log-Structured Merge Trees (LSM-Trees)

Background context: LSM-trees are a different approach to managing B-tree structures where updates are appended to files rather than being written in place. LSM-trees offer better performance for write-heavy workloads but require periodic compaction processes to consolidate the accumulated data.

:p What is an LSM-tree and how does it differ from traditional B-tree implementations?
??x
An LSM-tree (Log-Structured Merge Tree) is a type of storage structure that stores updates in append-only files. Unlike traditional B-trees, where pages are overwritten, LSM-trees only append new data to existing files and eventually delete obsolete ones. This approach improves write performance but requires periodic compaction to merge the logs into more efficient structures.
??x

---

#### Write-Ahead Log (WAL)

Background context: WAL is used in B-tree implementations to ensure that all modifications are written to a log file before they are applied to the actual tree pages, providing crash recovery. The log acts as an append-only journal that records every change.

:p What is a write-ahead log (WAL) and why is it necessary?
??x
A write-ahead log (WAL), also known as a redo log, is a special file used in database systems to ensure data consistency. It logs all modifications before they are applied to the actual tree pages. This mechanism ensures that if a crash occurs after some modifications but before others, the system can recover by replaying the WAL.

```java
public class WriteAheadLog {
    private List<Modification> log = new ArrayList<>();

    public void logChange(Modification change) {
        log.add(change);
    }

    public void applyChanges() throws IOException {
        // Apply all changes in the log to the tree pages
        for (Modification m : log) {
            m.apply();
        }
    }
}
```
??x

---

#### Concurrency Control in B-Trees

Background context: When multiple threads attempt to access and modify a B-tree at the same time, careful concurrency control is necessary to ensure consistency. Latches are often used as lightweight locks to protect critical sections of code.

:p How do you handle concurrency issues in B-trees?
??x
Concurrency issues in B-trees can be managed using latches (lightweight locks). Each thread that needs to modify a page or traverse the tree must acquire a latch on the relevant data structure. This ensures that only one thread modifies the critical section at any time, preventing inconsistent states.

```java
public class BTree {
    private Latch latch;

    public void updatePage(Page page) throws InterruptedException {
        synchronized (latch) {
            // Critical section: modify the page
            page.update();
        }
    }

    public Page readPage(int key) throws InterruptedException {
        synchronized (latch) {
            // Critical section: read the page
            return findPage(key);
        }
    }
}
```
??x

---

#### B-Tree Optimizations

Background context: Over time, numerous optimizations have been developed for B-trees to improve performance and efficiency. These include techniques like copy-on-write, where modifications create a new version of data rather than overwriting existing pages.

:p What is the copy-on-write scheme in B-trees?
??x
The copy-on-write scheme in B-trees involves creating a new page instead of overwriting an existing one when a modification occurs. This approach ensures that the original tree remains intact until the modification is fully applied, thus preventing data loss and maintaining consistency.

```java
public class BTree {
    private Page oldPage;
    private Page newPage;

    public void copyOnWrite(Page oldPage) throws IOException {
        // Create a new page from an existing one if needed
        this.oldPage = readPage(oldPage.getKey());
        this.newPage = makeNewPage(oldPage);
    }

    public void commitChanges() throws IOException {
        // Update references and finalize the changes
        writePage(newPage);
        oldPage.delete();
    }
}
```
??x

---


#### B+ Tree Optimization
B+ trees are a type of balanced tree that is optimized for disk storage and retrieval. They are often used in databases due to their efficient use of space and time on disk. In B+ trees, non-leaf nodes store keys, which are used to direct queries to the appropriate leaf node. The leaves contain actual data records.
:p What is a key aspect of B+ tree optimization?
??x
B+ tree optimization includes not storing entire keys in every page but only enough information to act as boundaries between key ranges. This allows more keys to fit into each page, increasing the branching factor and reducing the number of levels needed in the tree.
x??

---

#### Page Layout in B-Trees
Pages in a B-tree can be positioned anywhere on disk, which means that pages with nearby key ranges do not necessarily have to be close together. This layout can make sequential scans inefficient because it might require a disk seek for every page read.
:p Why is the layout of pages in B-trees an issue during sequential scans?
??x
The layout of pages in B-trees is problematic during sequential scans because pages are scattered randomly on disk, leading to frequent disk seeks. This can significantly reduce performance when reading data in sorted order.
x??

---

#### Sequential Layout for Leaf Pages
To improve sequential access and minimize disk seeks, many B-tree implementations lay out leaf pages in sequential order on the disk. However, maintaining this layout as the tree grows is challenging.
:p How do B-trees typically arrange their leaf nodes to enhance performance?
??x
B-trees often arrange leaf nodes in sequential order on the disk to facilitate efficient sequential scans and reduce the need for disk seeks. This arrangement helps in minimizing I/O operations when reading data in sorted order, but it can be difficult to maintain as the tree grows.
x??

---

#### Additional Pointers in B-Tree Variants
Some B-tree variants add additional pointers between leaf nodes. These pointers enable scanning keys in order without jumping back to parent pages, which improves performance for sequential reads.
:p What is an advantage of adding additional pointers between leaf nodes in B-trees?
??x
Adding additional pointers between leaf nodes allows for more efficient sequential scans by enabling direct traversal from one node to the next, without having to return to parent nodes. This can significantly improve read performance in scenarios where data needs to be accessed in order.
x??

---

#### Fractal Trees and LSM-Trees
Fractal trees and LSM-trees borrow ideas from log-structured storage to reduce disk seeks and improve write efficiency. While fractal trees are a B-tree variant, they incorporate some log-like structures for better performance.
:p How do fractal trees differ from traditional B-trees?
??x
Fractal trees differ from traditional B-trees by borrowing some log-structured ideas to reduce disk seeks. They maintain a high branching factor and use a combination of tree-based indexing and log-structured merging techniques to improve write efficiency and sequential access.
x??

---

#### Comparing B-Trees and LSM-Trees: Write Performance
LSM-trees are generally faster for writes compared to B-trees because they rewrite data in bulk during compaction, reducing the number of disk writes. This can be particularly beneficial on SSDs where random writes are slower than sequential writes.
:p Why might LSM-trees perform better than B-trees for write operations?
??x
LSM-trees perform better than B-trees for write operations because they rewrite data in bulk during compaction, reducing the number of disk writes. This is advantageous especially on SSDs where random writes are slower compared to sequential writes.
x??

---

#### Write Amplification in LSM-Trees
Write amplification refers to the phenomenon where one write to the database results in multiple writes to the disk over time due to repeated compaction and merging of SSTables. This can be a significant performance bottleneck, especially on SSDs.
:p What is write amplification, and why is it problematic?
??x
Write amplification occurs when one write to the database causes multiple writes to the disk over its lifetime due to repeated compaction and merging of SSTables. On SSDs, this can be particularly problematic as they have a limited number of writable blocks before failing. Reducing write amplification improves overall performance.
x??

---

#### Compaction in LSM-Trees
Compaction in LSM-trees involves periodically rewriting large segments of the storage to remove fragmentation and reduce overhead. This helps in maintaining higher write throughput and better disk utilization.
:p How does compaction help improve performance in LSM-trees?
??x
Compaction helps improve performance in LSM-trees by periodically rewriting large segments of storage, removing fragmentation, and reducing overhead. This leads to more efficient use of disk space and sustained high write throughput.
x??

---

#### Fragmentation in B-Tree Storage Engines
B-tree storage engines can suffer from fragmentation due to splitting pages or when rows do not fit into existing pages. This results in unused space within the tree structure, leading to higher storage overheads.
:p What is a disadvantage of B-tree storage engines related to fragmentation?
??x
A disadvantage of B-tree storage engines related to fragmentation is that they leave some disk space unused due to splitting pages or when rows do not fit into existing pages. This results in fragmented pages and increased storage overhead, reducing the efficiency of data storage.
x??

---


#### Online Transaction Processing (OLTP)
Background context explaining OLTP. It involves processing business transactions, with a focus on low-latency reads and writes. The access pattern is characterized by small numbers of records fetched by keys.

:p What does OLTP stand for and what are its main characteristics?
??x
OLTP stands for Online Transaction Processing, which refers to the processing of business transactions with a focus on providing quick responses (low latency) and handling small numbers of records per query. It is characterized by:

- **Main read pattern**: Small number of records per query, fetched by key.
- **Main write pattern**: Random-access, low-latency writes from user input.

Example code in Java to illustrate fetching a record by key:
```java
public class OLTPExample {
    // Assume we have a database connection and a key for the record
    public Record getRecordByKey(String key) throws SQLException {
        String sql = "SELECT * FROM records WHERE id = ?";
        
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, key);
            ResultSet resultSet = stmt.executeQuery();
            
            if (resultSet.next()) {
                // Assuming the record has fields: id, name, value
                Record record = new Record(
                    resultSet.getString("id"),
                    resultSet.getString("name"),
                    resultSet.getDouble("value")
                );
                return record;
            }
        }
        
        return null;
    }
}
```
x??

---

#### Online Analytic Processing (OLAP)
Background context explaining OLAP. It involves data analytics, focusing on queries that scan over large numbers of records and calculate aggregate statistics.

:p What does OLAP stand for and what are its main characteristics?
??x
OLAP stands for Online Analytic Processing, which refers to using databases for data analysis with the ability to handle a large number of records efficiently. It is characterized by:

- **Main read pattern**: Aggregate over large numbers of records.
- **Main write pattern**: Bulk import (ETL) or event stream.

Example code in Java to illustrate calculating an aggregate statistic:
```java
public class OLAPExample {
    // Assume we have a list of sales transactions and want to calculate total revenue for each store
    public Map<String, Double> calculateTotalRevenue(List<SalesTransaction> transactions) {
        Map<String, Double> revenuePerStore = new HashMap<>();
        
        for (SalesTransaction transaction : transactions) {
            String storeId = transaction.getStoreId();
            
            if (!revenuePerStore.containsKey(storeId)) {
                revenuePerStore.put(storeId, 0.0);
            }
            
            double currentRevenue = revenuePerStore.get(storeId);
            revenuePerStore.put(storeId, currentRevenue + transaction.getAmount());
        }
        
        return revenuePerStore;
    }
}
```
x??

---

#### Data Warehousing
Background context explaining data warehousing. It is a separate database used by internal analysts for decision support and business intelligence. The process of getting data into the warehouse involves Extract–Transform–Load (ETL).

:p What is a data warehouse and what are its main characteristics?
??x
A data warehouse is a separate database that contains a read-only copy of data from various OLTP systems within an enterprise, used by internal analysts for decision support and business intelligence. The main characteristics include:

- **Main read pattern**: History of events that happened over time.
- **Main write pattern**: Bulk import (ETL) or event stream.

Example code in Java to illustrate the ETL process:
```java
public class ETLProcess {
    // Assume we have a connection to an OLTP database and a data warehouse
    public void extractTransformLoad(List<Transaction> transactions, Connection oltpConnection, Connection warehouseConnection) throws SQLException {
        for (Transaction transaction : transactions) {
            String sqlExtract = "SELECT * FROM oltp_transactions WHERE id = ?";
            
            try (PreparedStatement stmtExtract = oltpConnection.prepareStatement(sqlExtract)) {
                stmtExtract.setInt(1, transaction.getId());
                ResultSet resultSet = stmtExtract.executeQuery();
                
                if (resultSet.next()) {
                    // Transform and Load
                    String warehouseSql = "INSERT INTO warehouse_transactions VALUES (?, ?, ?)";
                    
                    try (PreparedStatement stmtLoad = warehouseConnection.prepareStatement(warehouseSql)) {
                        stmtLoad.setInt(1, transaction.getId());
                        stmtLoad.setString(2, resultSet.getString("description"));
                        stmtLoad.setDouble(3, resultSet.getDouble("amount"));
                        
                        stmtLoad.executeUpdate();
                    }
                }
            }
        }
    }
}
```
x??

---

#### Difference Between OLTP and OLAP
Background context explaining the differences between OLTP and OLAP systems. The main difference is in their access patterns.

:p What are the key differences between OLTP and OLAP?
??x
The key differences between OLTP (Online Transaction Processing) and OLAP (Online Analytic Processing) systems lie in their access patterns:

- **OLTP**: 
  - Main read pattern: Small number of records per query, fetched by key.
  - Main write pattern: Random-access, low-latency writes from user input.

- **OLAP**:
  - Main read pattern: Aggregate over large numbers of records.
  - Main write pattern: Bulk import (ETL) or event stream.

Example code in Java to illustrate these differences:
```java
public class OLTPvsOLAP {
    // Example for OLTP
    public Record getRecordByKey(String key) throws SQLException {
        String sql = "SELECT * FROM records WHERE id = ?";
        
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, key);
            ResultSet resultSet = stmt.executeQuery();
            
            if (resultSet.next()) {
                return new Record(
                    resultSet.getString("id"),
                    resultSet.getString("name"),
                    resultSet.getDouble("value")
                );
            }
        }
        
        return null;
    }

    // Example for OLAP
    public Map<String, Double> calculateTotalRevenue(List<SalesTransaction> transactions) {
        Map<String, Double> revenuePerStore = new HashMap<>();
        
        for (SalesTransaction transaction : transactions) {
            String storeId = transaction.getStoreId();
            
            if (!revenuePerStore.containsKey(storeId)) {
                revenuePerStore.put(storeId, 0.0);
            }
            
            double currentRevenue = revenuePerStore.get(storeId);
            revenuePerStore.put(storeId, currentRevenue + transaction.getAmount());
        }
        
        return revenuePerStore;
    }
}
```
x??

---

