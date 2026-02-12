# High-Quality Flashcards: Designing-data-intensive-applications_-the-big-ideas-behind-reliable-scalable_processed (Part 20)


**Starting Chapter:** Snapshot Isolation and Repeatable Read

---


#### Read Committed Isolation
Background context explaining the concept. Read committed isolation ensures that transactions only see committed data, preventing dirty reads but not addressing all concurrency issues. It is used by IBM DB2 and Microsoft SQL Server with `read_committed_snapshot=off` configuration.

:p What is read committed isolation?
??x
Read committed isolation is a transaction isolation level where transactions can only read data that has been committed by other transactions. This means that uncommitted data modifications are not visible, which prevents dirty reads. However, it does not prevent non-repeatable reads and phantom reads.
x??

---


#### Non-Repeatable Read (Read Skew)
Background context explaining the concept. Non-repeatable read or read skew occurs when a transaction sees different versions of the same data during its execution.

:p What is non-repeatable read in the context of database transactions?
??x
Non-repeatable read, also known as read skew, happens when a transaction reads a value that has been updated by another transaction. This can lead to inconsistent results if the transaction needs to read the same data multiple times.
For example:
- Alice observes her $1,000 in two accounts at different moments and sees only $900 instead of the expected $1,000 after a transfer between the accounts.

x??

---


#### Read Skew Example
Background context explaining the concept. An illustration of how read skew can occur.

:p Explain the example given for non-repeatable reads or read skew.
??x
In the provided example:
- Alice has two bank accounts each with $500, totaling$1,000.
- A transaction transfers $100 from one account to the other.
- If Alice checks her balances at a time when the transfer is being processed, she might see an inconsistent state: one account with $400 and the other with$600.

x??

---


#### Snapshot Isolation
Background context explaining the concept. Snapshot isolation maintains consistency across transactions by remembering old values of data objects during write operations.

:p How does snapshot isolation prevent non-repeatable reads?
??x
Snapshot isolation prevents non-repeatable reads by maintaining a snapshot of the data before any write operation occurs. For every object written, the database keeps track of both the old committed value and the new value set by the transaction holding the write lock. Other transactions reading the same object during the ongoing transaction get the old value until the new value is fully committed.

x??

---


#### Repeatable Read vs. Snapshot Isolation
Background context explaining the concept. Repeatable read ensures that a transaction can read the same data multiple times, and it will see the same values throughout its duration.

:p What is repeatable read in database transactions?
??x
Repeatable read guarantees that once a transaction reads some data, that data cannot be modified by other transactions until the current transaction commits. This means that if Alice starts reading account balances at time T1 and continues to read them later (at time T2), she will see the same values as seen at T1.

x??

---


#### Concurrency Issues in Read Committed Isolation
Background context explaining the concept. Even with read committed isolation, there can still be concurrency issues such as non-repeatable reads and phantom reads.

:p What are some concurrency issues that read committed isolation does not fully address?
??x
Read committed isolation does not prevent non-repeatable reads (read skew) and phantom reads. A transaction might observe different values for the same data during its execution, leading to inconsistencies. For example:
- Non-repeatable reads: Alice sees different account balances at different times.
- Phantom reads: New rows appear or disappear in a table that matches the criteria of a query.

x??

---

---


#### Consistent Snapshot Concept
Background context: With snapshot isolation, transactions see the state of the database as it existed at a specific point in time rather than the current state during execution.

:p How does snapshot isolation work?
??x
Each transaction starts with a consistent snapshot of the database's state. This means that all reads within the transaction are based on this snapshot, not the current state. Other transactions can modify the data, but these changes do not affect the currently executing transaction.
x??

---


#### Implementation of Snapshot Isolation
Background context: Implementing snapshot isolation involves managing multiple versions of database objects to ensure consistency across different transactions.

:p What is a key principle of implementing snapshot isolation?
??x
A key principle is that readers never block writers, and writers never block readers. This allows the database to handle long-running read queries on a consistent snapshot while processing writes normally.
x??

---


#### Multi-Version Concurrency Control (MVCC)
Background context: MVCC is used in snapshot isolation to maintain multiple versions of an object, allowing transactions to see different states.

:p How does MVCC support snapshot isolation?
??x
MVCC supports snapshot isolation by maintaining several committed versions of database objects. This allows transactions to read from a specific point in time without blocking other writes or reads.
x??

---


#### Example of MVCC in PostgreSQL
Background context: PostgreSQL uses MVCC for snapshot isolation, storing multiple versions of an object.

:p How is MVCC implemented in PostgreSQL?
??x
In PostgreSQL, MVCC is used by keeping several versions of an object. For example, a transaction can read the committed version as it existed at the start of the transaction. This allows long-running reads to operate on consistent snapshots without blocking writes.
Example code in pseudocode:
```pseudocode
// Pseudo-code for MVCC implementation in PostgreSQL
function getTransactionSnapshot(transaction_id) {
    return getCommittedVersionsBefore(transaction_id);
}

function readCommittedVersion(obj, snapshot) {
    return getObjectFromVersion(obj, snapshot.committed_version);
}
```
x??

---


#### Read Committed vs. Snapshot Isolation
Background context: While both ensure no dirty reads, they differ in how they manage snapshots.

:p How do read committed isolation and snapshot isolation differ?
??x
Read committed isolation ensures that a transaction sees the results of any committed transactions that occurred before it started. Snapshot isolation goes further by allowing each transaction to see the database state at a specific point in time, even if changes occur after the transaction starts.
x??

---


#### Transaction IDs and Multi-Version Concurrency Control (MVCC)
Transaction IDs are assigned to each transaction started. Each write operation is tagged with the writer's transaction ID. This system allows for maintaining a snapshot of the database at any point in time, supporting transactions without blocking others.

:p How does the MVCC system ensure that transactions can read a consistent snapshot?
??x
The MVCC system ensures consistency by using transaction IDs to determine which versions of data are visible to each transaction. A transaction can only see changes made by earlier transactions and ignores writes from later transactions or aborted transactions. This way, multiple transactions can read the database simultaneously without interfering with each other.

```java
public class Transaction {
    private int txid; // Unique transaction ID
    
    public void write(int txid, Object data) {
        this.txid = txid;
        // Tagging data with current txid and storing in the MVCC system
    }
    
    public Object read() {
        // Return data based on visibility rules using current txid
        return data; 
    }
}
```
x??

---


#### Multi-Version Objects and Garbage Collection
In a multi-version system, objects are not deleted but marked for deletion. A garbage collection process removes these marked rows at an appropriate time to free up space.

:p How does the database handle deletions in a snapshot isolation environment?
??x
Deletions in a snapshot isolation environment do not actually remove data from the database; instead, they mark the row as deleted using a `deleted_by` field. The garbage collection process later identifies and removes these marked rows to free up space.

```java
public class Row {
    private int balance;
    private int created_by;
    private int deleted_by = -1; // Marked for deletion
    
    public void markForDeletion(int txid) {
        this.deleted_by = txid;
    }
    
    public boolean isMarkedForDeletion() {
        return deleted_by != -1;
    }
}
```
x??

---


#### Update as Delete and Create
An update operation in a snapshot isolation database translates into deleting the old version of the row and creating a new one. This ensures that multiple transactions can read different versions of the data simultaneously.

:p How is an update operation implemented in a multi-version system?
??x
In a multi-version system, an update operation does not modify the existing row but instead deletes the old row version and creates a new one with updated values. This approach allows concurrent reads to see consistent snapshots without interference from other writes.

```java
public class Account {
    public void updateBalance(int accountId, int newBalance) {
        Row oldRow = getRow(accountId); // Get the current balance
        oldRow.markForDeletion(currentTxid);
        
        Row newRow = new Row(newBalance);
        newRow.created_by = currentTxid; // Mark with current transaction ID
        
        addRow(newRow); // Add the new row to storage
    }
}
```
x??

---


#### Indexes in Multi-Version Databases
Indexes must handle versions of objects accurately. They point to all versions of an object, and index queries filter out non-visible versions. Old versions can be garbage collected when no longer visible.

:p How do indexes work with multi-version data?
??x
Indexes in a multi-version database store pointers to all versions of each object. During read operations, the index query filters out any versions that are not visible according to the current transaction's txid. Old versions marked for deletion can be removed by garbage collection when they are no longer needed.

```java
public class Index {
    private List<Integer> rowVersions; // Pointers to all object versions
    
    public void addRow(int version) {
        this.rowVersions.add(version);
    }
    
    public List<int> getVisibleRows() {
        return this.rowVersions.stream()
                               .filter(version -> !isObjectDeleted(version))
                               .collect(Collectors.toList());
    }
}
```
x??

---

---


#### Append-Only B-Trees
Background context explaining how append-only B-trees work, including that they are used in systems like CouchDB, Datomic, and LMDB. These systems use an append-only/copy-on-write variant of B-trees to manage updates without overwriting existing pages.

:p How do append-only B-trees handle updates?
??x
Append-only B-trees create a new copy of each modified page instead of overwriting the old one. Parent pages up to the root are updated to point to these new versions. This ensures that any page not affected by a write remains immutable.
For example, if updating node `A` in the B-tree, a new version of `A` is created and all parent nodes (including the root) are updated to reference this new version.

```java
// Pseudocode for modifying a node in an append-only B-tree
public void updateNode(Node oldNode, Node newNode) {
    // Create a copy of the new node with the changes
    Node copiedNewNode = copy(newNode);
    
    // Update parent pointers to point to the new node
    for (ParentNode parent : parentsOf(oldNode)) {
        parent.updateChildPointer(oldNode, copiedNewNode);
    }
    
    // Replace the old node in the tree with the copied new node
    replaceNodeInParents(oldNode, copiedNewNode);
}
```
x??

---


#### Lost Update Problem
The lost update problem occurs when two transactions concurrently read a value from the database, modify it, and write back the modified value. If this happens, one of the modifications can be lost because the second transaction overwrites the first.

:p What is the lost update problem?
??x
The lost update problem is an issue that arises in concurrent operations where multiple transactions try to read a shared resource (like a database), modify it locally, and write back the modified value. If two or more transactions do this concurrently, one of their updates can be lost because the last transaction's update overwrites the earlier ones.

For example:
- Two users incrementing a counter.
- Two users updating an account balance.
```java
// Pseudocode for Lost Update Problem Example
public class Counter {
    private int value = 0;

    public void increment() {
        int current = this.value; // Read from database
        this.value = current + 1; // Modify locally
        updateValue(current + 1); // Write back to database
    }

    private void updateValue(int newValue) {
        // Code to write the new value back to the database
    }
}
```
x??

---


#### Atomic Write Operations
Atomic write operations are designed to eliminate the need for read-modify-write cycles by providing a single, atomic operation that can be performed directly on the database. This is particularly useful in scenarios where updating a counter or an account balance is required.

:p What are atomic write operations?
??x
Atomic write operations allow transactions to update data in one step without needing to perform intermediate steps like reading and writing separately. These operations ensure that either all parts of the operation succeed, or none do, maintaining consistency.

For example:
```sql
-- SQL Example for Atomic Write Operation
UPDATE counters SET value = value + 1 WHERE key = 'foo';
```
This SQL statement is atomic because it increments the counter in a single step. No intermediate steps are involved, reducing the risk of lost updates and ensuring data integrity.
x??

---


#### Explicit Locking Mechanism
Explicit locking involves application-level mechanisms where transactions explicitly lock objects that they intend to update. This ensures that only one transaction can read or write an object at a time, thereby preventing concurrent modifications.

:p What is explicit locking?
??x
Explicit locking is a technique where the application code directly controls access to shared resources by locking them during the update process. If another transaction tries to access the same resource while it's locked, that transaction will be forced to wait until the lock is released.

For example:
```java
// Pseudocode for Explicit Locking Example
public class Counter {
    private int value = 0;
    private final Object lock = new Object();

    public synchronized void increment() {
        synchronized (lock) { // Acquire the lock
            int current = this.value; // Read from database
            this.value = current + 1; // Modify locally
            updateValue(current + 1); // Write back to database
        }
    }

    private void updateValue(int newValue) {
        // Code to write the new value back to the database
    }
}
```
In this example, the `increment` method is synchronized, which acts as a lock. This ensures that only one thread can execute the `increment` method at any given time.
x??

---

---


#### Atomic Operations and Locking Mechanisms
Background context: In multiplayer games or complex applications, ensuring that concurrent operations do not lead to data inconsistencies is crucial. One approach involves using atomic operations and locks to manage these scenarios.

If a single operation (atomic) cannot cover all necessary checks, locks are employed to ensure exclusive access to the data during critical sections of code. For example, in a game where multiple players can move the same figure concurrently, you might need both logical checks and locking mechanisms to prevent conflicts.

:p What is an atomic operation?
??x
An atomic operation is a single, indivisible unit of work that is performed as a whole without interruption or interference from other processes. If it fails, no part of the operation should be committed, ensuring data integrity.
```sql
BEGIN TRANSACTION;
SELECT * FROM figures   WHERE name = 'robot' AND game_id = 222   FOR UPDATE; -- Locks the rows for update

-- Check if move is valid and then update position
UPDATE figures SET position = 'c4' WHERE id = 1234;

COMMIT;
```
x??

---


#### Compare-and-Set Operation
Background context: In systems without transactions, a compare-and-set operation can be used to ensure that an update only occurs if the current value matches the expected value. This avoids lost updates by comparing and setting the new value conditionally.

:p What is a compare-and-set operation?
??x
A compare-and-set (CAS) operation allows updating a data item only if its current state matches a specific expected state. If the actual state differs, the update fails, and you must retry with updated expectations.
For example:
```sql
-- Attempt to update wiki page content in PostgreSQL
UPDATE wiki_pages SET content = 'new content' WHERE id = 1234 AND content = 'old content';
```
If another transaction has modified `content` since the read, this operation will fail and require retrying with an updated expected value.
x??

---


#### Weak Isolation Levels
Background context: Different isolation levels in databases can affect how transactions handle concurrent updates. Weak isolation levels (like Read Committed) may not enforce strict serializability, which means they are more prone to issues like dirty reads or non-repeatable reads.

:p What is the difference between strong and weak isolation levels?
??x
Strong isolation levels (Serializable, Repeatable Read in PostgreSQL/Oracle, Snapshot Isolation in SQL Server) ensure that transactions operate as if they were executed serially, preventing issues like dirty reads, non-repeatable reads, or phantom reads. Weak isolation levels (Read Committed) only enforce a basic order of execution and may allow these types of inconsistencies.
For example:
```sql
-- PostgreSQL Repeatable Read Isolation Level Example
BEGIN;
SELECT * FROM figures WHERE name = 'robot' AND game_id = 222 FOR UPDATE; -- Locks rows for update

-- Check if move is valid and then update position
UPDATE figures SET position = 'c4' WHERE id = 1234;

COMMIT;
```
x??

---

---


#### Conflict Resolution and Replication
Replicated databases face unique challenges when it comes to preventing lost updates, especially with multi-leader or leaderless replication where concurrent writes are common. Traditional techniques like locks or compare-and-set rely on a single up-to-date copy of data, which is not the case in many replicated systems.
:p What technique can be used for conflict resolution in replicated databases?
??x
Techniques such as allowing concurrent writes to create conflicting versions (siblings) and using application code or special data structures to resolve and merge these versions after the fact. Atomic operations that are commutative, like incrementing a counter or adding an element to a set, can also work well.
??x

---


#### Last Write Wins (LWW)
The last write wins conflict resolution method is prone to lost updates, as it discards concurrent writes without attempting to merge them. This can be a default in many replicated databases.
:p What is the downside of using LWW for conflict resolution?
??x
The main issue with LWW is that it can lead to lost updates because it simply overwrites any previous changes made by other transactions, without merging or resolving conflicts between them.
```java
// Pseudocode for LWW conflict resolution
public class LastWriteWins {
    public void updateValue(String key, String value) {
        // Overwrite the existing value with the new one
        values.put(key, value);
    }
}
```
x??

---


#### Dirty Writes
Dirty writes occur when concurrent transactions write to the same objects, potentially leading to data inconsistencies. This is one type of race condition in replicated databases.
:p What is a dirty write?
??x
A dirty write happens when multiple transactions concurrently try to update the same object without proper conflict resolution mechanisms in place, potentially resulting in inconsistent or incorrect data states.
```java
// Pseudocode for detecting and handling dirty writes
public class TransactionManager {
    public void handleDirtyWrites(Transaction t1, Transaction t2) {
        // Logic to detect conflicts and resolve them
    }
}
```
x??

---


#### Lost Updates
Lost updates occur when a transaction is overwritten by another transaction that happens after it. This can happen in replicated databases where concurrent writes are common.
:p How do lost updates typically arise?
??x
Lost updates arise when a transaction's changes to data are not properly protected from being overwritten by subsequent transactions, especially in systems with multi-leader or leaderless replication where concurrent writes can occur without a single up-to-date copy of the data.
```java
// Pseudocode for preventing lost updates
public class UpdateManager {
    public void preventLostUpdates(String key, String value) {
        // Logic to ensure that updates are not lost
    }
}
```
x??
---

---


#### Write Skew Anomaly
Background context: The provided text describes a scenario where two transactions, Alice and Bob, try to update their on-call status simultaneously. Both transactions check that there are at least two doctors currently on call before proceeding. Since snapshot isolation is used, both checks return 2, allowing both transactions to proceed and commit, resulting in no doctor being on call despite the requirement.
:p What is write skew?
??x
Write skew occurs when two or more transactions read the same state of data and then update different but related objects concurrently. In this case, Alice and Bob both check that there are at least two doctors on call before updating their own status, leading to a situation where no doctor is on call even though initially, there were enough.
x??

---


#### Characterizing Write Skew
Background context: The text explains write skew as an anomaly distinct from dirty writes or lost updates. It occurs when multiple transactions read the same objects and then update some of those objects concurrently.
:p How does write skew differ from a lost update?
??x
Write skew differs from a lost update because it involves concurrent updates to different but related objects, whereas a lost update happens when one transaction overwrites the changes made by another transaction. In the example given, Alice and Bob both update their records, while in a lost update scenario, only one record would be updated.
x??

---


#### Preventing Write Skew
Background context: The text outlines various strategies to prevent write skew, including serializable isolation levels and explicit locking of dependent rows.
:p What are some methods to prevent write skew?
??x
Some methods to prevent write skew include using true serializable isolation levels, which ensure that transactions run as if they were executed one after another. Alternatively, explicitly locking the rows that a transaction depends on can also be effective. For example:
```sql
BEGIN TRANSACTION;
SELECT * FROM doctors WHERE on_call = true AND shift_id = 1234 FOR UPDATE;
UPDATE doctors SET on_call = false WHERE name = 'Alice' AND shift_id = 1234;
COMMIT;
```
This ensures that the rows are locked until the transaction is committed, preventing other transactions from modifying them concurrently.
x??

---


#### Example of Explicit Locking
Background context: The provided code snippet demonstrates how to explicitly lock rows to prevent write skew in a database transaction.
:p How does explicit locking work in this example?
??x
Explicit locking works by first selecting and locking the relevant rows using `FOR UPDATE`. This prevents other transactions from modifying these rows until the current transaction is committed. In the given example, both Alice's and Bob's records are locked before any updates are made, ensuring that no other transactions can change them concurrently.
```sql
BEGIN TRANSACTION;
SELECT * FROM doctors WHERE on_call = true AND shift_id = 1234 FOR UPDATE;  -- Lock rows for update
UPDATE doctors SET on_call = false WHERE name = 'Alice' AND shift_id = 1234;  -- Update Alice's record
COMMIT;
```
x??

---


#### Generalization of Lost Update Problem
Background context: The text explains that write skew is a generalization of the lost update problem, where multiple transactions read and potentially update different but related objects.
:p How does write skew generalize the lost update problem?
??x
Write skew generalizes the lost update problem by involving more than one object being updated. In a lost update scenario, only one record is modified, while in write skew, multiple records are involved. This can lead to situations where requirements for maintaining consistency among related objects are violated.
x??

---

---


#### Write Skew in Database Transactions
Background context: Write skew is a specific type of transaction anomaly where concurrent transactions can make changes to different rows that should logically be part of the same transaction. This issue often arises when an application performs read-write operations based on the results of previous reads, which may not reflect the current state of the database due to concurrency issues.

If applicable, add code examples with explanations:
```sql
BEGIN TRANSACTION;
-- Check for any existing bookings that overlap with the period of noon-1pm
SELECT COUNT(*) FROM bookings WHERE room_id = 123 AND end_time > '2015-01-01 12:00' AND start_time < '2015-01-01 13:00';
-- If the previous query returned zero:
INSERT INTO bookings (room_id, start_time, end_time, user_id) VALUES (123, '2015-01-01 12:00', '2015-01-01 13:00', 666);
COMMIT;
```
:p What is write skew in the context of database transactions?
??x
Write skew occurs when multiple transactions interact with different rows in a way that can lead to inconsistencies, even if each transaction individually appears correct. This happens because one transaction reads data at a point in time, and another transaction modifies data based on this read, without considering changes made by other concurrent transactions.

For example, in the meeting room booking scenario, a SELECT query checks for conflicting bookings before inserting a new booking. If two users run such queries concurrently, they might both think that no conflicts exist (because their reads were taken at different times) and both insert conflicting bookings.
x??

---


#### Meeting Room Booking System Example
Background context: This example illustrates how write skew can occur in a meeting room booking system where you want to ensure there are no overlapping bookings for the same room. Snapshot isolation does not prevent this issue, so serializable isolation is required.

:p How does write skew affect the meeting room booking system?
??x
Write skew affects the meeting room booking system because even with snapshot isolation, two concurrent transactions might both read that a room is available during a certain time period and then insert conflicting bookings. This happens because each transaction sees a different snapshot of the database state due to concurrency, leading to potential scheduling conflicts.
x??

---


#### Multiplayer Game Example
Background context: In multiplayer games, write skew can occur when enforcing rules across multiple game elements (like positions on a board). Locks prevent lost updates but not write skew. Unique constraints might help in some cases, but otherwise, you are vulnerable to write skew.

:p How does write skew affect multiplayer games?
??x
Write skew affects multiplayer games because even if locks are used to prevent concurrent modifications of the same game element, two players can still make conflicting moves that violate the rules of the game. For example, both might move figures to the same position on the board at the same time without realizing each other's actions.
x??

---


#### Username Claiming Example
Background context: In a system where usernames are unique and users try to claim them simultaneously, snapshot isolation can lead to conflicts because one user might read that a username is available while another user claims it before their transaction commits.

:p How does write skew affect username claiming?
??x
Write skew affects username claiming when two users attempt to register the same username at the same time. Even though a unique constraint would prevent this under snapshot isolation, in practice, one user might read that the username is available while another claims it before the first transaction commits, leading to potential conflicts.
x??

---


#### Preventing Double-Spending Example
Background context: A service that allows users to spend money or points needs to ensure that users do not spend more than they have. This can be implemented by inserting a tentative spending item and checking the balance. However, write skew can cause two concurrent transactions to mistakenly believe there is enough balance for their operations.

:p How does write skew affect preventing double-spending?
??x
Write skew affects preventing double-spending because two transactions might concurrently insert items into a user's account without considering each other's actions. This can lead to both transactions successfully inserting spending items that together cause the balance to go negative, even though neither transaction notices the conflict due to concurrency.
x??

---

