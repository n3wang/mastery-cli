# High-Quality Flashcards: Designing-data-intensive-applications_-the-big-ideas-behind-reliable-scalable_processed (Part 19)


**Starting Chapter:** Write Skew and Phantoms

---


---
#### Conflict Resolution in Replicated Databases
Replication introduces unique challenges to preventing lost updates. In traditional databases, locks and compare-and-set operations assume a single up-to-date copy of data. However, with multi-leader or leaderless replication, several writes can occur concurrently without guaranteeing a single up-to-date copy.

:p How does the traditional approach of using locks and compare-and-set operations differ in replicated databases?
??x
In traditional databases, these techniques rely on ensuring that only one transaction can modify data at a time. However, in replicated systems where multiple nodes might be writing to the same data concurrently without a centralized leader, it is impossible to guarantee a single up-to-date copy of data. Therefore, locks and compare-and-set operations are not directly applicable.

```java
// Example of traditional lock mechanism (simplified)
public void updateData(String key, String value) {
    if (lock(key)) { // Acquire the lock on key
        try {
            // Perform the update operation
            database.update(key, value);
        } finally {
            unlock(key); // Release the lock after operation
        }
    }
}
```
x??

---
#### Siblings in Replicated Databases
In replicated databases that allow concurrent writes and asynchronous replication, conflicting versions of a data value can arise. These conflicting versions are referred to as siblings.

:p What is a common approach for managing multiple conflicting versions (siblings) in a replicated database?
??x
A typical approach is to let the application code or special data structures resolve and merge these conflicting versions after they have been written. This way, no updates are lost despite concurrent modifications by different clients.

```java
public void handleSiblings(String key, String value1, String value2) {
    // Merge logic here to combine both values
    String mergedValue = mergeValues(value1, value2);
    database.update(key, mergedValue); // Update the key with the merged result
}

private String mergeValues(String v1, String v2) {
    // Implementation of merging strategy (e.g., concatenation, averaging)
    return v1 + " | " + v2;
}
```
x??

---
#### Atomic Operations in Replicated Databases
Atomic operations can be used effectively in replicated databases, particularly if they are commutative. Commutative operations allow the order of application on different replicas to not affect the final outcome.

:p How do atomic operations work in a replicated database context?
??x
Atomic operations ensure that an operation is completed atomically—meaning it either completes entirely or does not at all. In replicated databases, if such operations are commutative (can be applied in any order and still yield the same result), they can be used to prevent lost updates.

```java
public void incrementCounter(int key) {
    database.increment(key); // Assume this is a commutative operation
}

// Example of a non-commutative operation, which would not work well with replication
public void addToSet(String key, String value) {
    Set<String> set = database.getSet(key);
    set.add(value);
    database.updateSet(key, set);
}
```
x??

---
#### Last Write Wins (LWW)
LWW is a simple conflict resolution strategy where the last write overwrites any previous writes. However, it can lead to lost updates if concurrent writes are not properly handled.

:p What is an issue with using LWW in replicated databases?
??x
The primary issue with LWW is that it does not account for concurrent modifications. If two transactions modify the same data at nearly the same time, one of them (the last one) will overwrite the other's changes, leading to a potential loss of updates.

```java
// Example of Last Write Wins in pseudocode
if (transaction1.write(data)) {
    transaction2.write(data); // transaction2 overwrites the changes made by transaction1
}
```
x??

---
#### Write Skew and Phantoms
Write skew and phantoms are more subtle forms of race conditions that can occur during concurrent writes. They involve scenarios where a database must ensure certain consistency properties despite concurrent modifications.

:p Describe an example scenario involving write skew in a hospital application.
??x
In the described scenario, Alice and Bob, who are on-call doctors for a shift, both decide to give up their shifts because they feel unwell. The system should ensure that at least one doctor remains on call. If Alice and Bob try to give up their shifts simultaneously, the database might not enforce this constraint correctly, leading to no on-call doctors.

```java
public void relinquishShift(String doctorID) {
    // Check if there is another doctor available on the same shift before updating
    boolean shiftAvailable = checkAvailabilityOnSameShift(doctorID);
    if (shiftAvailable) {
        database.removeDoctorFromShift(doctorID); // Update the database
    } else {
        throw new IllegalStateException("No other doctors are available for this shift.");
    }
}

private boolean checkAvailabilityOnSameShift(String doctorID) {
    // Implementation to check availability of another doctor on the same shift
    return false; // Simplified example, would normally involve a complex query
}
```
x??

---


#### Write Skew Anomaly
Background context explaining write skew, including its definition and why it's problematic. Snapshot isolation is mentioned as a mechanism that might not prevent this issue.

:p What is write skew, and why is it an issue?
??x
Write skew occurs when two or more transactions read the same objects and then update some of those objects concurrently. This can lead to unintended behavior where certain constraints are violated because both transactions assume they can safely perform their updates without conflict. In the given example, this results in no doctors being on call even though at least one was supposed to be.

Example:
```java
// Pseudocode illustrating a race condition leading to write skew
Transaction T1 {
    Check if there are 2 or more doctors on call.
    Update Alice's record to take herself off call.
}

Transaction T2 {
    Check if there are 2 or more doctors on call.
    Update Bob's record to take himself off call.
}
```
x??

---
#### Consequences of Write Skew
Explanation of the specific consequences of write skew, such as violating application requirements.

:p What are some specific consequences of write skew in an application?
??x
Write skew can cause critical application bugs like violating essential constraints. For instance, in a healthcare setting where at least one doctor must always be on call, two doctors might incorrectly assume that they can both go off call simultaneously due to concurrent reads and writes under snapshot isolation.

This results in the application's requirement being violated, leaving no doctor on call, which could lead to operational issues or safety concerns.
x??

---
#### Types of Isolation Levels
Explanation of different isolation levels and their ability to detect/write skew. Highlighting that not all isolation levels can automatically prevent write skew.

:p What isolation levels are mentioned in the context, and do they help with write skew?
??x
The text mentions several isolation levels: snapshot isolation, repeatable read, serializable, and snapshot isolation (specific implementations like PostgreSQL’s repeatable read, MySQL/InnoDB’s repeatable read, Oracle’s serializable, and SQL Server’s snapshot). None of these automatically detect or prevent write skew.

For instance:
- **Repeatable Read**: Doesn’t detect write skew because it allows multiple readers but doesn't ensure no conflicting writes.
- **Serializable**: Can help in some cases but is not a general solution as it might still miss concurrent updates.

```sql
-- Example SQL to illustrate snapshot isolation limitations
BEGIN TRANSACTION;
SELECT * FROM doctors WHERE on_call = true AND shift_id = 1234 FOR UPDATE;
UPDATE doctors SET on_call = false WHERE name = 'Alice' AND shift_id = 1234;
COMMIT;
```
x??

---
#### Preventing Write Skew with Constraints
Explanation of how constraints can be used to prevent write skew, and the limitations in implementing such constraints.

:p How can constraints help in preventing write skew?
??x
Constraints can be a way to enforce certain business rules that would otherwise lead to write skew. However, most databases do not support complex multi-object constraints natively. For example, ensuring at least one doctor is always on call involves updating multiple related records and could require custom logic like triggers or materialized views.

Example:
```sql
-- Pseudocode for implementing a constraint using a trigger
CREATE TRIGGER ensure_one_doctor_on_call
BEFORE UPDATE ON doctors
FOR EACH ROW
WHEN (NEW.on_call = false AND OLD.on_call = true)
EXECUTE PROCEDURE check_at_least_one_doctor();
```
x??

---
#### Locking Mechanism to Prevent Write Skew
Explanation of how explicitly locking rows can help in preventing write skew.

:p What is a recommended approach for preventing write skew if using a non-serializable isolation level?
??x
A good approach when using a non-serializable isolation level is to explicitly lock the rows that transactions depend on. This ensures that only one transaction at a time modifies those rows, thereby avoiding concurrent updates and the race condition.

Example:
```sql
BEGIN TRANSACTION;
SELECT * FROM doctors WHERE on_call = true AND shift_id = 1234 FOR UPDATE; -- Locks the relevant rows
UPDATE doctors SET on_call = false WHERE name = 'Alice' AND shift_id = 1234;
COMMIT;
```
x??

---


#### Write Skew and Its Examples
Background context: Write skew is a form of data inconsistency that can occur when concurrent transactions modify related but independent data. It often happens during operations like booking systems, multiplayer games, or financial services where different parts of an application are writing to the database based on conditions derived from existing data.
:p What is write skew and provide examples?
??x
Write skew occurs when concurrent transactions modify related but independent data in a way that results in inconsistent state. For example:
- In a meeting room booking system, two users might try to book the same room at different times, leading to overlapping bookings if not handled properly.
- In a multiplayer game, players could move figures to the same position on the board, violating game rules.
- In a username claiming scenario, two users might simultaneously check for availability and create accounts with the same name.

Code example in SQL for booking:
```sql
BEGIN TRANSACTION;
-- Check for existing bookings that overlap
SELECT COUNT(*) FROM bookings WHERE room_id = 123 AND end_time > '2015-01-01 12:00' AND start_time < '2015-01-01 13:00';
-- If the count is zero, insert a new booking
INSERT INTO bookings (room_id, start_time, end_time, user_id) VALUES (123, '2015-01-01 12:00', '2015-01-01 13:00', 666);
COMMIT;
```
x??

---

#### Meeting Room Booking System Example
Background context: This example illustrates a scenario where two users might try to book the same meeting room at different times, leading to overlapping bookings if not handled properly. Snapshot isolation does not prevent this issue; serializable isolation is required to ensure no scheduling conflicts.
:p How can write skew occur in a meeting room booking system?
??x
Write skew can occur when two users attempt to book the same meeting room at different times and both transactions succeed, leading to overlapping bookings. This happens because:
- The first transaction checks for existing bookings that overlap with the requested time slot but does not lock the rows.
- If no conflicting bookings are found, it inserts a new booking.
- However, another user can concurrently insert a conflicting booking before the first transaction commits.

Example SQL code:
```sql
BEGIN TRANSACTION;
-- Check for any conflicting bookings
SELECT COUNT(*) FROM bookings WHERE room_id = 123 AND end_time > '2015-01-01 12:00' AND start_time < '2015-01-01 13:00';
-- If the count is zero, insert a new booking
INSERT INTO bookings (room_id, start_time, end_time, user_id) VALUES (123, '2015-01-01 12:00', '2015-01-01 13:00', 666);
COMMIT;
```
x??

---

#### Multiplayer Game Example
Background context: In a multiplayer game, two players might move figures to the same position on the board or make other moves that violate game rules. This can happen if transactions are not serialized properly.
:p How does write skew occur in a multiplayer game?
??x
Write skew occurs when two players attempt to move figures to the same position on the board simultaneously, leading to invalid states in the game. For example:
- Player 1 checks the board for an open position and makes a move.
- Before Player 1's transaction commits, Player 2 does the same check and makes the same move.

This can be prevented by using proper serialization mechanisms like serializable isolation levels.
x??

---

#### Username Claiming Example
Background context: On a website where usernames are unique, two users might try to register with the same username at the same time. Snapshot isolation does not prevent this issue; unique constraints ensure that only one transaction succeeds.
:p How can write skew occur during username claiming?
??x
Write skew can occur when two users simultaneously check if a username is available and attempt to claim it, both succeeding if snapshot isolation is used. To avoid this:
- Use a unique constraint on the usernames column in the database.
- The second user's transaction will be rolled back due to violating the unique constraint.

Example SQL code for checking and claiming a username:
```sql
BEGIN TRANSACTION;
-- Check if username is available
SELECT COUNT(*) FROM users WHERE username = 'exampleUser';
-- If count is zero, insert a new user with this username
INSERT INTO users (username) VALUES ('exampleUser');
COMMIT;
```
x??

---

#### Preventing Double-Spending Example
Background context: In financial services, transactions need to ensure that a user does not spend more than they have. Write skew can occur if two transactions concurrently insert spending items leading to an incorrect balance.
:p How can write skew affect a double-spending prevention system?
??x
Write skew can cause issues in preventing double-spending by allowing two transactions to concurrently insert spending items, potentially reducing the account balance below zero. To avoid this:
- Use serialized operations or unique constraints on spending amounts.

Example logic for adding spending items and checking balance:
```sql
BEGIN TRANSACTION;
-- Insert tentative spending item
INSERT INTO spendings (user_id, amount) VALUES (123, 50);
-- Update user's account balance
UPDATE users SET balance = balance - 50 WHERE id = 123;
COMMIT;
```
x??

---

#### Phantom Entries Causing Write Skew
Background context: Phantoms refer to rows that exist in the database but were not visible during a SELECT query due to concurrent modifications. These can cause write skew by changing the preconditions of subsequent decisions.
:p How does phantom entries relate to write skew?
??x
Phantom entries occur when new rows are inserted into the database concurrently with a SELECT statement, making them invisible initially but visible later. This can lead to write skew if:
- A transaction checks for existing conditions (e.g., no existing bookings).
- It performs a write based on these conditions.
- Another concurrent transaction inserts data that affects those conditions.

Example scenario:
1. User checks for available room times without locking.
2. Before committing, another user books the same time slot, making it visible in future queries.

This can be mitigated by using serializable isolation levels or row-level locks.
x??


---
#### Write Skew and Phantom Read Problem
Background context: In database transactions, write skew and phantom read problems can occur when a transaction reads data that later gets modified by another concurrent transaction. The `SELECT FOR UPDATE` mechanism locks rows returned by a query to prevent modifications from other transactions. However, for queries that check the absence of rows and then insert new ones, this approach fails because there are no rows to lock initially.
:p What is write skew?
??x
Write skew occurs when a transaction reads data and later encounters changes made by another concurrent transaction after it has started modifying its own data. This can lead to inconsistent states where multiple transactions might interfere with each other in unexpected ways.
x??

---
#### Phantom Read Problem
Background context: The phantom read problem arises when a query that checks for the absence of rows returns no results, and then a write operation inserts rows that match the same condition. Since `SELECT FOR UPDATE` locks cannot be applied to non-existent rows, this issue can cause unintended modifications.
:p How does snapshot isolation address the phantom read problem?
??x
Snapshot isolation addresses the phantom read problem by allowing transactions to see a consistent snapshot of the database at the start of their execution, regardless of subsequent changes. This means that even if new rows are inserted by other transactions after a read operation, they will not be visible to the current transaction until it commits.
x??

---
#### Materializing Conflicts
Background context: To mitigate phantom reads and write skew issues, an approach called "materializing conflicts" can be used. It involves creating a table of pre-defined combinations that act as lock objects for concurrent transactions. When a transaction wants to make a change, it locks the corresponding rows in this predefined table.
:p How does materializing conflicts work?
??x
Materializing conflicts works by introducing an auxiliary table filled with possible combinations (e.g., rooms and time slots) into the database. Each row in this table represents a potential lock object. When a transaction needs to insert or modify data that matches these conditions, it locks the corresponding rows in the auxiliary table using `SELECT FOR UPDATE`. After acquiring the locks, it can safely check for conflicts and proceed with its operation.
x??

---
#### Serializability
Background context: The serializable isolation level ensures that transactions are processed as if they were executed one after another, without interfering with each other. This is particularly important to avoid race conditions like write skew and phantom reads.
:p Why is the serializable isolation level preferable?
??x
The serializable isolation level is preferable because it provides a clear and consistent behavior across different databases and transaction management systems. Unlike lower levels of isolation (like read committed or repeatable read), serialization ensures that transactions do not interfere with each other, making it easier to reason about the correctness of concurrent operations.
x??

---
#### Challenges in Implementing Isolation Levels
Background context: Understanding and implementing various isolation levels can be challenging due to inconsistencies across different database systems. For instance, the meaning of "repeatable read" varies significantly between databases.
:p What are some difficulties in understanding and implementing isolation levels?
??x
Some difficulties include:
1. **Inconsistent Implementation**: Different database management systems implement isolation levels differently, leading to confusion about expected behaviors.
2. **Complexity in Code**: Determining whether your application code is safe at a particular isolation level can be complex, especially in large applications with many concurrent interactions.
3. **Hidden Concurrency Issues**: Developers might not be aware of all the potential race conditions and concurrency issues in their application.
x??

---


---
#### Lack of Good Tools for Detecting Race Conditions
Background context: The provided text discusses the challenges of detecting and preventing race conditions, especially within databases. Static analysis could potentially help but has not yet been widely adopted due to practical limitations.

:p What is a major challenge in detecting race conditions?
??x
Race conditions are hard to detect because they often occur based on non-deterministic timing issues. Problems only appear if the timing of transactions' execution leads to conflicts, making it difficult to predict and test all scenarios.
x??

---
#### Serializable Isolation Level
Background context: The text explains that serializable isolation is a strong method to prevent race conditions by ensuring transactions behave as if they were executed sequentially.

:p What does serializable isolation guarantee?
??x
Serializable isolation guarantees that even when multiple transactions run in parallel, the end result would be the same as if the transactions had executed one after another. This means that all possible race conditions are prevented.
x??

---
#### Options for Implementing Serializable Isolation
Background context: There are three main techniques to implement serializable isolation: actual serial execution, two-phase locking (2PL), and optimistic concurrency control like serializable snapshot isolation (SSI).

:p What is the simplest way to avoid concurrency problems?
??x
The simplest way to avoid concurrency problems is by executing transactions in a serial order, one after another. This ensures that there are no race conditions because only one transaction runs at a time.
x??

---
#### Actual Serial Execution
Background context: This technique involves running all database operations sequentially on a single thread to prevent race conditions.

:p How does actual serial execution ensure the absence of race conditions?
??x
Actual serial execution ensures the absence of race conditions by executing transactions in a strict, sequential order. Since only one transaction is active at any given time, there can't be conflicts between them.
x??

---
#### Two-Phase Locking (2PL)
Background context: For decades, two-phase locking was the primary method for ensuring serializable isolation.

:p What does two-phase locking do?
??x
Two-phase locking (2PL) ensures that transactions acquire and release locks in a way that prevents race conditions. Transactions first acquire all necessary locks during their acquisition phase and then release them during the release phase.
x??

---
#### Optimistic Concurrency Control Techniques
Background context: These techniques, like serializable snapshot isolation (SSI), assume conflicts are unlikely and only check for consistency at transaction commit.

:p What is the main idea behind optimistic concurrency control?
??x
Optimistic concurrency control assumes that most transactions will not conflict with each other. It performs minimal locking or none during execution and checks for inconsistencies when a transaction tries to commit.
x??

---


#### Long-Running Analytic Queries and Snapshot Isolation

Background context explaining the concept. Typically, long-running analytic queries are read-only operations that can be performed on a consistent snapshot using snapshot isolation. This approach avoids the need for serial execution loops, which can improve performance by reducing coordination overhead.

:p How can long-running analytic queries benefit from snapshot isolation?
??x
Long-running analytic queries can benefit from snapshot isolation because they do not require real-time updates and can operate on a consistent view of the data at the time the query is started. This reduces contention with other transactions, allowing for more efficient execution.
??x

---

#### Serial Execution of Transactions in Databases

Background context explaining the concept. In some systems designed for single-threaded execution, transactions are executed serially to avoid coordination overhead associated with locking mechanisms.

:p Why might a system that supports single-threaded transaction execution perform better than one that allows concurrency?
??x
A system that supports single-threaded transaction execution may perform better because it can avoid the overhead of coordinating multiple threads and managing locks. However, this approach limits throughput to that of a single CPU core.
??x

---

#### Encapsulating Transactions in Stored Procedures

Background context explaining the concept. Early database designs intended for long transactions encompassing entire user flows have evolved, leading modern applications to keep transactions short by encapsulating them as stored procedures.

:p Why do most OLTP applications avoid interactively waiting for a user within a transaction?
??x
Most OLTP applications avoid interactively waiting for a user within a transaction because users are slow to make decisions and respond. Allowing such delays would require supporting a large number of concurrent, mostly idle transactions, which is inefficient.
??x

---

#### Interactive Style of Transaction Processing

Background context explaining the concept. In interactive systems, transactions process one statement at a time, with queries and results exchanged between the application and database over a network.

:p What is an issue with processing long-running transactions in an interactive style?
??x
An issue with processing long-running transactions in an interactive style is that it involves significant network communication overhead. This can lead to poor performance if each transaction needs to wait for multiple round trips.
??x

---

#### Single-Threaded Transaction Processing Systems

Background context explaining the concept. To achieve high throughput, single-threaded systems must process multiple transactions concurrently, even though they only execute one at a time.

:p Why do single-threaded transaction processing systems not allow interactive multi-statement transactions?
??x
Single-threaded transaction processing systems do not allow interactive multi-statement transactions to ensure that the system can efficiently manage and process multiple transactions without excessive waiting times.
??x

---

#### Storing Transaction Logic in Stored Procedures

Background context explaining the concept. To optimize performance, applications store all transaction logic within stored procedures, which are executed as a single unit on the database server.

:p How does storing transaction logic in stored procedures help with performance?
??x
Storing transaction logic in stored procedures helps with performance by consolidating all transaction steps into a single execution path. This reduces network latency and simplifies transaction handling on the database side.
??x


---
#### Two-Phase Locking (2PL)
Background context explaining the concept. For around 30 years, two-phase locking (2PL) was the primary algorithm for ensuring serializability in databases. It is distinct from two-phase commit (2PC). In 2PL, a transaction must either acquire and hold both shared and exclusive locks or not acquire any locks at all.

:p What does Two-Phase Locking (2PL) ensure in database transactions?
??x
Two-Phase Locking (2PL) ensures serializability by preventing race conditions such as lost updates and write skew. It requires that a transaction either hold both shared and exclusive locks or none, ensuring that readers do not block writers and vice versa.
x??

---
#### Reader-Writer Blocking in 2PL
Explanation of how readers and writers are blocked during execution.

:p How does Two-Phase Locking (2PL) handle concurrent read and write operations?
??x
In Two-Phase Locking (2PL), when a transaction wants to read an object, it must first acquire the lock in shared mode. Multiple transactions can hold shared locks simultaneously, but if another transaction has an exclusive lock on the object, these shared lock holders must wait. If a transaction wants to write to an object, it must first acquire the lock in exclusive mode; no other transaction may hold the same lock (either in shared or exclusive mode). Thus, readers are blocked by writers and vice versa.
x??

---
#### Lock Modes in 2PL
Explanation of different lock modes used.

:p What are the two types of lock modes in Two-Phase Locking (2PL)?
??x
In Two-Phase Locking (2PL), locks can be either in shared mode or exclusive mode. Shared locks allow multiple transactions to read an object simultaneously, but no write operations. Exclusive locks prevent any other transaction from holding a lock on the same object, ensuring that only one transaction can modify it.
x??

---
#### Acquiring and Holding Locks
Explanation of how locks are acquired and held during transaction execution.

:p How does Two-Phase Locking (2PL) manage locking during transaction execution?
??x
In Two-Phase Locking (2PL), a transaction must acquire all necessary locks before starting. Once acquired, these locks must be held until the end of the transaction (commit or abort). The "two-phase" in 2PL refers to acquiring locks during the first phase and releasing them at the end of the transaction in the second phase.
x??

---
#### Deadlock Detection and Resolution
Explanation of deadlock detection and resolution mechanisms.

:p What happens if transactions get stuck waiting for each other's locks in Two-Phase Locking (2PL)?
??x
If multiple transactions get stuck waiting for each other, creating a deadlock situation, the database automatically detects this. It then aborts one of the transactions to allow others to make progress. The aborted transaction must be retried by the application.
x??

---


#### Two-Phase Locking Performance Issues
Background context: Two-phase locking (2PL) is a method used to ensure serializability of transactions by acquiring and releasing locks appropriately. However, it often results in lower transaction throughput and response times compared to weaker isolation levels due to lock overhead and reduced concurrency.
:p What are the main performance issues associated with two-phase locking?
??x
The primary performance issues include:
- Increased overhead from acquiring and releasing all necessary locks.
- Reduced concurrency as transactions wait for each other, potentially forming queues.

```java
public class TransactionManager {
    // Code to manage transaction start and commit/rollback with lock handling
}
```
x??

---

#### Predicate Locks
Background context: Serializability in 2PL requires preventing write skew and phantom issues. A predicate lock allows a transaction to read or modify objects matching specific conditions.
:p What is the purpose of predicate locks?
??x
Predicate locks ensure that transactions do not interfere with each other by locking all potential matching objects, thus preventing phantoms and write skew.

```java
// Example pseudo-code for acquiring a shared-mode predicate lock
if (transactionA.wantsToReadObjectsMatchingConditions()) {
    transactionA.acquireSharedModePredicateLock(query);
}
```
x??

---

#### Index-Range Locks
Background context: To improve performance, most databases implement index-range locking as an approximation of predicate locks. This method uses indexes to attach shared locks to ranges of values.
:p What is the primary benefit of using index-range locks over predicate locks?
??x
Index-range locks are more efficient because they lock a broader range of objects, reducing the overhead associated with checking for matching locks.

```java
// Example pseudo-code for attaching an index-range lock
if (database.hasIndexOnRoomId()) {
    database.attachSharedLockToIndexEntry(roomId);
}
```
x??

---

#### Summary of Key Concepts
This card consolidates the main points discussed in the text.
:p Summarize the key concepts regarding two-phase locking, predicate locks, and index-range locks.
??x
Two-phase locking (2PL) is a method to ensure serializability but can reduce performance due to overhead and reduced concurrency. Predicate locks prevent phantoms and write skew by locking objects that match specific conditions, while index-range locks approximate this with broader range locking for better performance.

```java
// Example pseudo-code combining concepts
public class TransactionManager {
    public void manageTransaction(Transaction transaction) {
        // Acquire 2PL locks or predicate/index-range locks as needed
        if (transaction.requiresLocks()) {
            if (database.hasPredicateLock(transaction.getConditions())) {
                database.acquireSharedModePredicateLock(transaction.getConditions());
            } else if (database.hasIndexRangeLock(transaction.getTimeRange())) {
                database.attachSharedLockToIndexEntry(transaction.getTimeRange());
            }
        }
    }
}
```
x??

---

