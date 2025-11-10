# High-Quality Flashcards: Designing-data-intensive-applications_-the-big-ideas-behind-reliable-scalable_processed (Part 18)


**Starting Chapter:** Read Committed

---


#### Weak Isolation Levels
Background context explaining the concept of weak isolation levels. Concurrency issues arise when transactions read or write data that is concurrently modified by another transaction. These issues are hard to find and reproduce, making them a challenge for application developers.

:p What is the main issue with concurrency in databases?
??x
Concurrency bugs can occur when one transaction reads or writes data that is being modified by another transaction simultaneously. This leads to race conditions, which are difficult to predict and test. For example, two transactions may try to update the same piece of data at the same time, leading to inconsistent results.
x??

---
#### Read Committed Isolation Level
Explanation of read committed isolation level, where no dirty reads or writes occur. Dirty reads happen when a transaction sees uncommitted changes made by another transaction. Dirty writes occur when a transaction overwrites an uncommitted value.

:p What does read committed isolation guarantee?
??x
Read committed guarantees that transactions will only see committed data (no dirty reads) and that transactions will not overwrite data from uncommitted transactions (no dirty writes).

For example, if User 1 updates `x = 3` but has not yet committed the transaction, User 2 should not be able to read this new value until User 1 commits. Similarly, both transactions must wait for the first write's transaction to commit or abort before overwriting data.

```java
// Pseudocode example of read committed isolation
void updateValue(int newValue) {
    lock(x); // Acquire a lock on x
    try {
        if (transaction.commit()) { // Check if the current transaction is committed
            x = newValue; // Update value safely
        } else {
            throw new Exception("Transaction not committed");
        }
    } finally {
        unlock(x); // Release the lock after update or exception handling
    }
}
```
x??

---
#### No Dirty Reads
Explanation of no dirty reads in read committed isolation, ensuring that transactions only see fully committed data.

:p How do we prevent dirty reads?
??x
To prevent dirty reads, a transaction must wait until another transaction has committed its changes before reading. This can be achieved by acquiring row-level locks on the objects being read and releasing them immediately after the read operation is complete.

For example:

```java
// Pseudocode for preventing dirty reads
void readValue() {
    lock(x); // Acquire a lock on x
    try {
        int value = get(x); // Read the value of x safely
    } finally {
        unlock(x); // Release the lock after reading
    }
}
```
x??

---
#### No Dirty Writes
Explanation of no dirty writes in read committed isolation, ensuring that transactions do not overwrite uncommitted changes.

:p How does read committed prevent dirty writes?
??x
Read committed prevents dirty writes by delaying the second write until the first transaction has committed or aborted. This ensures that the later write overwrites only committed data and not uncommitted values.

For example:

```java
// Pseudocode for preventing dirty writes
void updateValue(int newValue) {
    lock(x); // Acquire a lock on x
    try {
        if (transaction.commit()) { // Check if the current transaction is committed
            x = newValue; // Update value safely
        } else {
            throw new Exception("Transaction not committed");
        }
    } finally {
        unlock(x); // Release the lock after update or exception handling
    }
}
```
x??

---
#### Implementing Read Committed
Explanation of how databases implement read committed isolation, typically using row-level locks to prevent dirty reads and writes.

:p How do most databases implement read committed?
??x
Most databases implementing read committed use row-level locks. When a transaction wants to modify an object (row or document), it must first acquire a lock on that object. It then holds the lock until the transaction is committed or aborted. Only one transaction can hold the lock for any given object; if another transaction wants to write to the same object, it must wait until the first transaction is committed or aborted before it can acquire the lock and continue.

For example:

```java
// Pseudocode for implementing read committed with locks
void updateValue(int newValue) {
    lock(x); // Acquire a lock on x
    try {
        if (transaction.commit()) { // Check if the current transaction is committed
            x = newValue; // Update value safely
        } else {
            throw new Exception("Transaction not committed");
        }
    } finally {
        unlock(x); // Release the lock after update or exception handling
    }
}
```
x??

---


#### Read Committed Isolation
Background context: The read committed isolation level is a common transactional isolation level used by databases. It ensures that transactions cannot read uncommitted data, thus preventing dirty reads (reading data that might be rolled back). However, it does not prevent non-repeatable reads and phantoms.
:p What is the main characteristic of Read Committed Isolation?
??x
Read committed isolation ensures that a transaction can only read data that has been committed by other transactions. It prevents reading uncommitted data but allows dirty reads if the transaction is reading old data that might be rolled back.
x??

---

#### Write Locks and Old Values
Background context: In Read Committed Isolation, for every object that is written to, the database remembers both the old committed value and the new value. During a write operation, other transactions are given the old value of the object until the transaction holding the write lock commits its changes.
:p How does a database handle read operations during a write in Read Committed Isolation?
??x
During a write, the database retains both the old committed value and the new value for an object. Transactions that wish to read this object while it is being written are provided with the old value until the transaction holding the write lock commits its changes.
```pseudocode
if (transaction.isWriting(object)) {
    // Remember old value
    old_value = get(object);
    set(object, new_value); // Write new value
} else {
    return get(object); // Return old value to readers
}
```
x??

---

#### Nonrepeatable Read and Read Skew
Background context: A non-repeatable read occurs when a transaction sees different values of the same data during its execution. In the case of read skew, a transaction might see different states of the database at different points in time, leading to inconsistent readings.
:p What is an example scenario that leads to nonrepeatable reads and read skew?
??x
An example where a nonrepeatable read or read skew occurs is when Alice observes her bank account balances in the middle of a transaction. If she checks her balance during a transfer process, she might see one account with $500 (before the transfer) and another with $400 (after the transfer), leading to an incorrect total.
x??

---

#### Backup Consistency Issues
Background context: During a database backup, parts of the backup may contain older data while other parts have newer data due to ongoing writes. This can lead to inconsistencies in the backup if it is not taken atomically.
:p How do backups potentially create issues with read committed isolation?
??x
Backups can create issues because they might capture some data from a previous state and other data from a more recent state, leading to inconsistent snapshots of the database. If a backup spans multiple points in time due to ongoing writes, restoring such a backup could result in permanent inconsistencies.
```java
// Pseudocode for handling backups
if (takingBackup) {
    // Take snapshot of current database state
} else {
    // Process regular reads and writes
}
```
x??

---


#### Snapshot Isolation Overview
Snapshot isolation is a technique used to ensure that transactions read consistent data from the database. This is particularly useful for long-running, read-only queries and periodic integrity checks. The idea behind snapshot isolation is that each transaction reads from a consistent snapshot of the database—that is, the transaction sees all the data that was committed in the database at the start of the transaction.
:p What is snapshot isolation?
??x
Snapshot isolation ensures transactions see a consistent view of the database by reading from a snapshot taken when the transaction begins. This prevents inconsistent results from observing data changes made by other transactions since the transaction started.
x??

---
#### Implementation of Snapshot Isolation
Implementations of snapshot isolation use write locks to prevent dirty writes, similar to how read-committed isolation works. However, reads do not require any locks under snapshot isolation. From a performance perspective, this means that readers never block writers and writers never block readers, allowing long-running read queries on a consistent snapshot while processing writes normally.
:p How does snapshot isolation handle locking in comparison to read-committed isolation?
??x
In snapshot isolation, write operations acquire locks to prevent dirty writes but do not affect reader transactions. Reader transactions can proceed without waiting for writers, and vice versa. This is different from read-committed isolation where both readers and writers must coordinate through locking.
```java
// Example of a transaction with snapshot isolation
public void longRunningReadQuery() {
    // Start the transaction in snapshot isolation mode
    connection.setTransactionIsolation(Connection.TRANSACTION_SNAPSHOT);
    
    try (Statement stmt = connection.createStatement()) {
        ResultSet rs = stmt.executeQuery("SELECT * FROM my_table");
        
        while (rs.next()) {
            // Process each row from the consistent snapshot
            System.out.println(rs.getString("column_name"));
        }
    } finally {
        // Ensure the transaction commits or rolls back appropriately
        connection.commit();
    }
}
```
x??

---
#### Multi-Version Concurrency Control (MVCC)
Multi-version concurrency control (MVCC) is used to implement snapshot isolation. It allows several different versions of an object to coexist, enabling transactions to see a consistent state even if the data has been modified by other transactions.
:p What is MVCC and how does it relate to snapshot isolation?
??x
MVCC is a technique that supports multiple versions of database objects simultaneously. This allows snapshot isolation to provide each transaction with a view of the database as it was at the start of the transaction, even if changes have been made by other transactions since then.
```java
// Example of how MVCC can be used in PostgreSQL
public class MVCCExample {
    public void readConsistentSnapshot() {
        // Connect to the database and set snapshot isolation level
        Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost/db", "user", "password");
        conn.setTransactionIsolation(Connection.TRANSACTION_SNAPSHOT);
        
        try (Statement stmt = conn.createStatement()) {
            ResultSet rs = stmt.executeQuery("SELECT * FROM my_table FOR NO KEY UPDATE");
            
            while (rs.next()) {
                // Read data from a consistent snapshot
                System.out.println(rs.getString("column_name"));
            }
        } finally {
            // Close the connection properly
            conn.close();
        }
    }
}
```
x??

---
#### Long-Running Queries and Analytics
Snapshot isolation is particularly useful for long-running, read-only queries such as backups and analytics. These types of queries need to ensure that they observe a consistent view of the database without being affected by concurrent write operations.
:p How does snapshot isolation benefit analytics and backup processes?
??x
Snapshot isolation benefits analytics and backup processes by allowing these tasks to run on a consistent snapshot of the data, unaffected by ongoing changes from other transactions. This ensures that results are reliable and make sense as they reflect a single point in time rather than a mix of states.
```java
// Example of using snapshot isolation for an analytics query
public void runAnalyticsQuery() {
    // Establish connection with snapshot isolation mode
    Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost/db", "user", "password");
    conn.setTransactionIsolation(Connection.TRANSACTION_SNAPSHOT);
    
    try (Statement stmt = conn.createStatement()) {
        ResultSet rs = stmt.executeQuery("SELECT * FROM sales_data FOR NO KEY UPDATE");
        
        while (rs.next()) {
            // Process each row for analytics
            System.out.println(rs.getString("product_id") + ": " + rs.getInt("quantity_sold"));
        }
    } finally {
        conn.close();
    }
}
```
x??

---
#### Vacuum Process in PostgreSQL
The vacuum process in PostgreSQL performs cleanup to ensure that overflow does not affect the data. This is important for maintaining database integrity and performance, especially when transactions are frequent.
:p What role does the vacuum process play in PostgreSQL?
??x
In PostgreSQL, the vacuum process cleans up old versions of data and reclaims space. It ensures that tables do not overflow by compacting storage. Since transaction IDs are 32-bit integers, they eventually overflow after approximately 4 billion transactions. The vacuum process helps prevent this from impacting data integrity.
```java
// Example of running a vacuum command in PostgreSQL
public void runVacuum() {
    // Connect to the database and execute a vacuum command
    Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost/db", "user", "password");
    
    try (Statement stmt = conn.createStatement()) {
        stmt.executeUpdate("VACUUM ANALYZE sales_data");
    } finally {
        conn.close();
    }
}
```
x??

---


---
#### Transaction ID and Versioning
Transaction IDs (txids) are assigned to transactions when they start, always increasing. Each write operation by a transaction is tagged with this transaction ID.

:p How does the database assign and use transaction IDs during writes?
??x
The database assigns a unique and always-increasing transaction ID at the beginning of each transaction. When a transaction performs a write operation (whether it's an insert, update, or delete), the data written to the database is tagged with this transaction ID.

For example:
- If transaction 13 deletes a row, the deleted_by field in that row will be set to 13.
- If transaction 13 updates a row by changing its balance, it essentially creates a new version of the row (with the updated data) and marks the old version as deleted.

```java
// Pseudocode for updating an account
public void updateAccount(int accountId, int amount) {
    TransactionId currentTxId = getCurrentTransactionId();
    // Fetch the existing record or insert a new one if it doesn't exist
    AccountRecord record = fetchOrInsert(accountId);
    
    // Mark old version as deleted and create new version
    record.deleted_by = currentTxId;
    record.balance = amount;  // New balance
}
```
x??

---
#### Snapshot Isolation Visibility Rules
The database implements snapshot isolation using a set of visibility rules that determine what data is visible to ongoing transactions.

:p What are the key visibility rules for implementing snapshot isolation?
??x
There are four main visibility rules:

1. Ignore writes made by other transactions that have not yet committed.
2. Ignore writes made by aborted transactions.
3. Ignore writes made by transactions with a later transaction ID (i.e., started after the current transaction).
4. All other writes are visible.

In summary, an object is considered visible if:
- The creating transaction has already committed before the reader’s transaction started.
- The object is not marked for deletion or, if it is, the deleting transaction had not yet committed at the start of the reader's transaction.

For example:
- In Figure 7-7, when transaction 12 reads from account 2, it sees a balance of $500 because the deletion made by transaction 13 was ignored (rule 3), and the creation of the new balance is not visible yet.

```java
// Pseudocode for checking visibility
public boolean isObjectVisible(TransactionId readerTxId, TransactionId writerTxId) {
    return !writerTxId.isLaterThan(readerTxId); // Ignore later writers
}
```
x??

---
#### Multi-Version Deletion and Garbage Collection
In a multi-version database, rows are not physically deleted but marked for deletion. A garbage collection process removes these marked rows when no longer needed.

:p How does the database handle deletions under snapshot isolation?
??x
When a transaction deletes a row, it doesn't actually delete the row from storage; instead, it marks the row as deleted by setting the `deleted_by` field to its own transaction ID. This allows ongoing transactions to still see the old data until they are certain that no more transactions will read it.

Later, when garbage collection runs, it removes any rows marked for deletion and frees their space if it's certain that these rows are no longer visible to any active transactions.

For example:
- If transaction 13 deletes a row with `balance = $500`, the database sets `deleted_by` to 13.
- Later, garbage collection will remove this row when it can be sure that no more transactions need it.

```java
// Pseudocode for garbage collection
public void performGarbageCollection() {
    for (Row row : rows) {
        if (row.deleted_by.isNotCommittedYet()) { // Check deletion status and transaction state
            freeSpace(row); // Free the space of this deleted row
        }
    }
}
```
x??

---
#### Indexes in Multi-Version Databases
Indexes work by pointing to all versions of an object, allowing queries to filter out invisible versions.

:p How do indexes function in a multi-version database?
??x
In a multi-version database, the index points to all versions of each object. An index query then filters out any object versions that are not visible according to the visibility rules.

When garbage collection removes old and no longer visible object versions, corresponding index entries can also be removed for efficiency.

For example:
- If transaction 12 reads from an account and sees a balance of $500, it considers only the version marked by transactions with earlier IDs (like 13).

```java
// Pseudocode for index query in multi-version database
public List<Row> indexQuery(int key) {
    List<Row> results = new ArrayList<>();
    for (IndexEntry entry : index.entriesForKey(key)) {
        if (entry.version.isVisibleTo(currentTxId)) { // Check visibility using current Tx ID
            results.add(entry.row);
        }
    }
    return results;
}
```
x??

---


#### Append-Only B-Trees
Background context explaining the concept. The described approach avoids overwriting pages of a B-tree when updated by creating new copies and updating parent pointers. This ensures that immutable versions of data are preserved, while allowing for consistent snapshots at write transaction points.

:p How does the append-only/copy-on-write variant of B-trees work in databases like CouchDB?
??x
In this approach, instead of overwriting existing pages when a tree needs to be updated, new copies of the affected pages and parent nodes (up to the root) are created. This ensures that the original data remains immutable.

For example, consider updating a node in the B-tree:
1. A new version of the node is created.
2. Parent nodes are copied and updated to point to the new child node if necessary.
3. The database maintains multiple versions of the tree at different points in time, allowing for consistent snapshots.

This method ensures that any write transaction creates a new root, representing a snapshot of the database state at the moment of the update.
??x
---
#### Snapshot Isolation Levels
Background context explaining the concept. Snapshot isolation levels are used to manage concurrent read and write operations without overwriting existing data, allowing for consistent transactions.

:p What is snapshot isolation in databases like Oracle, PostgreSQL, and MySQL?
??x
Snapshot isolation is a database isolation level that allows transactions to see a consistent view of the database as it was at the start of the transaction. It achieves this by creating a snapshot or consistent read of the data based on the state of the database at the time the transaction begins.

For example:
- In Oracle, snapshot isolation is called "serializable".
- In PostgreSQL and MySQL, it's referred to as "repeatable read".

This ensures that a transaction sees an unchanging view of the database without needing to lock rows or use versioning.
??x
---
#### Preventing Lost Updates
Background context explaining the concept. Lost updates occur when two transactions write to the same data concurrently, potentially overwriting each other's changes.

:p What is a lost update and how can it be prevented?
??x
A lost update happens when one transaction overwrites the changes made by another concurrent transaction on the same piece of data. This results in only one set of updates being saved while the other is lost.

To prevent lost updates, techniques like pessimistic locking or optimistic concurrency control can be used:
- Pessimistic Locking: A lock is acquired before the transaction starts and released after completion.
- Optimistic Concurrency Control (OCC): The transaction reads a snapshot and assumes it won't have conflicts. If conflicts arise upon commit, a retry mechanism might be necessary.

Example of OCC in pseudocode:
```pseudocode
function updateDocument(docId) {
    oldSnapshot = readDocument(docId)
    while(true) {
        newSnapshot = readDocument(docId)
        if (newSnapshot is same as oldSnapshot) {
            // Apply changes to the document with oldSnapshot
            writeDocument(docId, oldSnapshot)
            return true
        } else {
            // Conflict detected; retry update
            oldSnapshot = newSnapshot
        }
    }
}
```
??x
---
#### Automatic Conflict Resolution in Text Editing
Background context explaining the concept. The editing of text documents can be modeled as a series of atomic mutations, which can help resolve conflicts automatically.

:p Can you explain how automatic conflict resolution works in text editing?
??x
In text editing, operations like insertions, deletions, and replacements are treated as atomic mutations that can be applied to the document. Automatic conflict resolution involves tracking these changes and reconciling them when conflicts arise.

For example:
- If two users try to edit overlapping regions of a document simultaneously, their edits might conflict.
- The system could detect this conflict and use heuristics or rules (e.g., "insertions take precedence over deletions") to resolve the conflict automatically.

Example pseudocode for detecting and resolving conflicts:
```pseudocode
function resolveConflicts(document, userEdits) {
    for each edit in userEdits {
        if conflictDetected(edit, document) {
            resolvedEdit = applyConflictResolutionRules(edit)
            applyResolvedEdit(resolvedEdit, document)
        } else {
            applyEdit(edit, document)
        }
    }
}
```
??x
---


---
#### Lost Update Problem
The lost update problem occurs when two transactions concurrently read, modify, and write back a value to the database. If one transaction reads the data after another has modified it but before that modification is written back, the first transaction's changes can be "lost" or overwritten by the second transaction.
:p What is the lost update problem?
??x
The lost update problem happens when two transactions concurrently read and write to the same piece of data. If one transaction reads a value after another has updated it but before that update is committed, the first transaction's changes can be lost because the second transaction overwrites the database with its own updated value.
```java
public class CounterExample {
    private int counter = 0;

    public void increment() {
        // Thread A: Reads current value (counter == 0)
        int currentValue = this.counter;
        try {
            // Thread B starts here and reads the same value as Thread A
            // Thread A calculates new value (currentValue + 1) and writes it back to counter.
            // Thread B increments its local copy of the value instead of using the updated database value, overwriting Thread A's change.
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
```
x??

---
#### Atomic Write Operations
Atomic write operations are a feature provided by many databases that allows performing update operations in one single step. This eliminates the need for implementing read-modify-write cycles at the application level, which helps avoid concurrency issues like lost updates.
:p What are atomic write operations?
??x
Atomic write operations allow an entire database operation to be executed as a single transaction, ensuring that all parts of the operation either complete successfully or fail entirely. This reduces the risk of losing changes due to concurrent modifications and simplifies programming by abstracting away the complexity of managing transactions.
```sql
-- Example SQL query for atomic update in most relational databases:
UPDATE counters SET value = value + 1 WHERE key = 'foo';
```
x??

---
#### Explicit Locking
Explicit locking is a method used to prevent lost updates by forcing other transactions to wait until an object is updated. By acquiring locks on objects that need to be modified, the application can ensure that only one transaction at a time performs read-modify-write cycles.
:p What is explicit locking?
??x
Explicit locking involves manually managing locks around critical sections of code where changes are made to shared resources. When a transaction acquires a lock, no other transaction can modify the same resource until the lock is released. This prevents concurrent modifications and ensures data integrity.
```java
public class ExplicitLockExample {
    private final Object lock = new Object();

    public void updateCounter() {
        synchronized (lock) { // Acquire lock
            try {
                int currentValue = this.counter;
                int newValue = currentValue + 1; // Perform local modification
                this.counter = newValue; // Write back the updated value
            } finally {
                lock.notifyAll(); // Release lock after operation is complete
            }
        }
    }
}
```
x??

---


---
#### Atomic Operations and Locking
Background context: In a multiplayer game, ensuring that players' moves abide by the rules requires more than just atomic operations. The application logic needs to ensure that only one player can move a piece at a time, which involves locking rows to prevent lost updates.

:p What is the purpose of using locks in concurrent operations?
??x
Locks are used to prevent two or more transactions from modifying the same data concurrently, ensuring consistency and preventing race conditions. By taking out a lock on a row before modifying it, you ensure that only one transaction can modify the row at any given time.
x??

---
#### Lost Update Detection in Databases
Background context: Some databases automatically detect lost updates when using snapshot isolation levels like PostgreSQL’s repeatable read or Oracle’s serializable. This feature ensures that if another transaction modifies data between your read and write operations, your update will be aborted, forcing you to retry the operation.

:p How do snapshot isolation levels help in detecting lost updates?
??x
Snapshot isolation levels allow the database to maintain a consistent view of the data as it was when the transaction started. If another transaction changes the data while your transaction is running (but before committing), your update will fail, and you'll have to retry the operation.

For example, if you read a value `v` in one transaction and try to write a new value `v'`, but another transaction has changed `v` to `w` by the time your write operation executes, your update will be detected as a lost update and rolled back.
x??

---
#### Compare-and-Set Operation
Background context: In databases without transactions, an atomic compare-and-set operation is used to avoid lost updates. This operation allows an update to occur only if the current value matches what was read previously.

:p What is the purpose of a compare-and-set operation?
??x
The purpose of a compare-and-set operation is to ensure that an update occurs only if the data has not changed since it was last read by the transaction. If the current value does not match the expected value, the update fails, and the transaction must retry.

For example:
```sql
UPDATE wiki_pages 
SET content = 'new content' 
WHERE id = 1234 AND content = 'old content';
```
If another transaction has changed `content` to something other than `'old content'`, this statement will not update the row, and you'll need to retry the operation.
x??

---

