# High-Quality Flashcards: Designing-data-intensive-applications_-the-big-ideas-behind-reliable-scalable_processed (Part 38)


**Starting Chapter:** The End-to-End Argument for Databases

---


---

#### Application Bugs and Data Corruption

Background context: The passage discusses how even with strong safety properties from databases, application bugs can still introduce data corruption. It highlights that serializable transactions might not prevent issues if an application writes incorrect or deletes data due to a bug.

:p What are the risks of application bugs in terms of database integrity?
??x
Application bugs pose significant risks to database integrity because they can lead to writing incorrect data, deleting important information, or corrupting data in unpredictable ways. Even with strong safety guarantees like serializable transactions, if an application itself is flawed, these protections won't prevent the corruption.

Example: Consider a scenario where a piece of code mistakenly deletes customer records instead of updating them. Serializability cannot protect against this mistake since it focuses on transactional consistency rather than preventing logical errors in the application logic.
x??

---

#### Exactly-once Execution Semantics

Background context: The passage introduces the concept of exactly-once execution semantics, which aims to ensure that operations are processed only once even if there are failures. This is important for tasks like processing messages or transactions where duplicate processing can lead to data corruption.

:p What does "exactly-once" execution mean in the context of message processing?
??x
Exactly-once execution means ensuring that an operation is processed exactly one time, regardless of any faults that may occur during its execution. This prevents issues such as double billing or incorrect state updates due to retries.

Example: In a system where messages represent financial transactions, if a transaction gets processed twice (due to a network failure and subsequent retry), it would result in the customer being charged more than once for the same service.
x??

---

#### Idempotence

Background context: The passage explains that making operations idempotent is an effective way to achieve exactly-once execution semantics. An idempotent operation has no different effect regardless of how many times it is applied.

:p What does it mean for an operation to be idempotent?
??x
An operation is idempotent if applying it multiple times, with the same input, results in the same state as applying it once. This property ensures that repeated execution will not change the system's state beyond the first application of the operation.

Example: A RESTful API endpoint for updating a customer's address should be idempotent so that calling it twice or more does not result in two different addresses being stored, only one.
```java
public class UpdateAddressService {
    public void updateCustomerAddress(String customerId, String newAddress) {
        // Logic to ensure the operation is idempotent
        if (!customerRepository.get(customerId).getAddress().equals(newAddress)) {
            customerRepository.updateAddress(customerId, newAddress);
        }
    }
}
```
x??

---


---
#### Duplicate Suppression in Stream Processing and Beyond
Duplicate suppression is a common requirement not only in stream processing but also in various network protocols like TCP. In TCP, sequence numbers are used to maintain packet order and identify lost or duplicated packets during transmission.

:p What does duplicate suppression entail?
??x
Duplicate suppression involves handling duplicates that may occur across different stages of data transfer, ensuring that each piece of data is processed exactly once. This is crucial for maintaining the integrity of transactions and preventing issues like double counting or erroneous operations.
x??

---
#### Transactional Integrity in Database Systems
In database systems, a transaction typically spans a single TCP connection. However, if there's a network interruption during a transaction’s execution, such as after sending a `COMMIT` but before receiving a response from the server, it can lead to ambiguity about whether the transaction has been committed or aborted.

:p What happens if a client sends a `COMMIT` and then experiences a network timeout?
??x
If a client sends a `COMMIT` and experiences a network timeout before receiving a response from the database server, the client will be unaware of the transaction's outcome. The client might reconnect and retry the transaction, but now it is outside the scope of TCP duplicate suppression because transactions are not idempotent.
x??

---
#### Non-Idempotent Transactions
Non-idempotent transactions, like transferring money between accounts, must handle retries carefully since executing them multiple times could result in unintended consequences. For example, Example 12-1 involves updating two different account balances.

:p Why is the transaction in Example 12-1 problematic?
??x
The transaction in Example 12-1 is non-idempotent and may lead to double deductions or credits if retried. Specifically, sending the `COMMIT` again after a network timeout could result in $22 being transferred instead of just $11.

```java
public void transferFunds(int accountIdFrom, int accountIdTo, double amount) {
    // Assume this method is called multiple times due to retries
    updateBalance(accountIdFrom, -amount);
    updateBalance(accountIdTo, +amount);
}
```
x??

---
#### Two-Phase Commit (2PC)
Two-phase commit protocols break the 1:1 mapping between TCP connections and transactions. They allow a transaction coordinator to reconnect to a database after a network fault and instruct it on whether to commit or abort an in-doubt transaction.

:p What is the role of Two-Phase Commit (2PC) in transaction management?
??x
Two-Phase Commit (2PC) protocols manage distributed transactions by ensuring that all participating nodes either commit or abort the transaction together, even if a network fault occurs. This protocol separates the decision-making process from the data processing, allowing for robust handling of retries and failures.

```java
public void twoPhaseCommit(String coordinatorId, List<String>参与者) {
    // Phase 1: Prepare
    for (String participant : participants) {
        sendPrepareRequest(participant);
        if (!waitForAcknowledgment(participant)) {
            return ABORT;
        }
    }

    // Phase 2: Commit or Abort based on majority response
    for (String participant : participants) {
        sendCommitOrAbortRequest(participant, getMajorityResponse());
    }
}
```
x??

---
#### Network-Level Retries and Web Browsers
In web applications using HTTP POST requests, network interruptions can cause retries at the client level. These retries are separate from TCP duplicate suppression mechanisms because each request is treated as an independent transaction.

:p How does a weak cellular connection affect a web browser's interaction with a server?
??x
A weak cellular connection can cause a user to send an HTTP POST request successfully but then lose network signal before receiving the response. This situation requires the client (web browser) to handle retries, which are treated as separate transactions by both the server and the database.

```java
public void sendDataToServer(String data) {
    try {
        // Send POST request
        sendRequest(data);
        receiveResponse();
    } catch (TimeoutException e) {
        retrySendDataToServer(data);  // Handle retries
    }
}

public void retrySendDataToServer(String data) {
    sendRequest(data);  // Retry the POST request
}
```
x??

---


#### Unique Identifier for Idempotent Operations
Background context: When dealing with idempotent operations across multiple network hops, traditional transaction mechanisms might not suffice. To ensure that a request is processed only once despite being submitted multiple times (e.g., due to timeouts), you need an end-to-end mechanism involving unique identifiers.

:p How can you generate a unique identifier for an operation in a client application?
??x
To generate a unique identifier, you could use a UUID or calculate a hash of relevant form fields. This ensures that if the web browser submits the POST request twice, both requests will have the same operation ID.
```java
// Example using Java's UUID
String requestId = UUID.randomUUID().toString();
```
x??

---

#### Database Uniqueness Constraint for Duplicate Requests
Background context: Once you have a unique identifier, it can be stored in the database to prevent duplicate operations. A uniqueness constraint on the request_id column ensures that only one operation with a given ID is executed.

:p How does adding a UNIQUE constraint to the `requests` table help in suppressing duplicate requests?
??x
Adding a UNIQUE constraint to the `requests` table guarantees that if a transaction attempts to insert an existing ID, the INSERT fails and the transaction is aborted. This prevents duplicate operations from being processed twice.
```sql
ALTER TABLE requests ADD UNIQUE (request_id);
```
x??

---

#### Event Sourcing with Request Events
Background context: In addition to suppressing duplicates, the `requests` table can act as a log of events. These events can be used downstream to update account balances or perform other operations.

:p How does the `requests` table serve as an event log?
??x
The `requests` table serves as an event log by recording each operation uniquely. Even if the balance updates are redundant and could be derived from the request event, ensuring that events are processed exactly once using the request ID helps maintain consistency.
```sql
ALTER TABLE requests ADD UNIQUE (request_id);
BEGIN TRANSACTION;
INSERT INTO requests (request_id , from_account , to_account , amount)
VALUES('0286FDB8-D7E1-423F-B40B-792B3608036C' , 4321, 1234, 11.00);
UPDATE accounts SET balance = balance + 11.00 WHERE account_id = 1234;
UPDATE accounts SET balance = balance - 11.00 WHERE account_id = 4321;
COMMIT;
```
x??

---

#### End-to-End Argument for Idempotent Operations
Background context: The end-to-end argument suggests that the function of idempotence must be implemented considering the entire communication flow, not just at a single layer (like TCP or database transactions).

:p What is the end-to-end argument in the context of idempotent operations?
??x
The end-to-end argument states that to correctly implement idempotence, you need to consider the entire request from start to finish. Relying solely on mechanisms like TCP for duplicate suppression or transactional integrity within a database may not be sufficient because the problem can occur at any point in the communication flow.
```java
// Example of checking for unique IDs across layers
public class IdempotentService {
    private Set<String> processedRequests = new HashSet<>();

    public void processRequest(String requestId, String fromAccount, String toAccount, double amount) {
        if (processedRequests.contains(requestId)) return; // Check before processing

        // Process the request
        processedRequests.add(requestId);
    }
}
```
x??

---

These flashcards cover key concepts related to handling idempotent operations and the importance of considering the entire communication flow.


---
#### End-to-End Transaction Identifier and Integrity Checks
Background context: The text emphasizes the need for an end-to-end solution that includes a transaction identifier to ensure data integrity and correctness. It mentions that while checksums can help detect corruption in network packets, they are insufficient without ensuring checks at both ends of the communication.

:p What is required to fully address potential sources of data corruption?
??x
To fully address all possible sources of data corruption, an end-to-end solution is needed. This involves implementing a transaction identifier that travels from the client to the database and back, as well as using checksums throughout the system, not just at the network level.

Example:
```java
public class TransactionIdentifier {
    private String id;

    public TransactionIdentifier(String id) {
        this.id = id;
    }

    // Methods to get and set the transaction ID
}
```
x??

---
#### End-to-End Encryption and Authentication
Background context: The text discusses the limitations of encryption mechanisms at different levels. It states that while local WiFi security protects against eavesdropping, TLS/SSL can protect against network attackers but not server compromises. Only end-to-end encryption and authentication can address all these issues.

:p What mechanism is needed to ensure comprehensive protection?
??x
To ensure comprehensive protection, end-to-end encryption and authentication are required. These mechanisms should cover not just the network level (like TLS/SSL), but also the application level to protect against server compromises.

Example:
```java
public class EndToEndEncryption {
    public String encryptData(String data) {
        // Encryption logic here
        return encryptedData;
    }

    public boolean verifyAuthentication(String authToken) {
        // Authentication verification logic here
        return isAuthentic;
    }
}
```
x??

---
#### Importance of Fault-Tolerance Mechanisms in Data Systems
Background context: The text highlights the limitations of relying solely on data system safety properties like serializable transactions. It argues that application-level measures, such as duplicate suppression, are necessary to ensure end-to-end correctness.

:p Why is end-to-end thinking important in data systems?
??x
End-to-end thinking is crucial because even if a data system provides strong safety properties (like serializable transactions), applications still need to implement additional fault-tolerance mechanisms. This ensures that data integrity and consistency are maintained across the entire system, from client to server.

Example:
```java
public class FaultToleranceMechanism {
    public void handleDuplicateRequests() {
        // Logic to suppress duplicate requests
    }

    public boolean checkTransactionConsistency(TransactionIdentifier id) {
        // Logic to verify transaction consistency
        return isConsistent;
    }
}
```
x??

---
#### Challenges with Distributed Transactions and Concurrency
Background context: The text discusses the difficulties in implementing fault-tolerance mechanisms at the application level. It mentions that while transactions are useful, they can be expensive, especially when dealing with heterogeneous storage technologies. This often leads to reimplementation of these mechanisms in application code.

:p What is a potential issue when using distributed transactions?
??x
A potential issue with distributed transactions is their high cost and complexity, particularly when dealing with different storage technologies. Distributed transactions are expensive because they require coordination across multiple nodes, which can lead to performance bottlenecks and operational challenges. As a result, developers often need to implement fault-tolerance mechanisms directly in application code.

Example:
```java
public class TransactionManager {
    public void handleDistributedTransaction() throws Exception {
        // Code for handling distributed transactions
    }
}
```
x??

---
#### Exploration of New Fault-Tolerance Abstractions
Background context: The text concludes by suggesting that there is a need to explore new fault-tolerance abstractions that are easier to implement and maintain, while still providing good performance in large-scale distributed environments.

:p What does the author suggest for future data systems?
??x
The author suggests exploring new fault-tolerance abstractions that make it easy to provide application-specific end-to-end correctness properties. These abstractions should also maintain good performance and operational characteristics in a large-scale distributed environment, aiming to reduce the complexity of implementing fault-tolerance mechanisms at the application level.

Example:
```java
public class NewFaultToleranceAbstraction {
    public void implementCustomFaultTolerance() {
        // Code for implementing custom fault tolerance logic
    }
}
```
x??

---


#### Uniqueness Constraints and Consensus

Background context: In distributed systems, enforcing uniqueness constraints requires consensus among nodes. This is because several concurrent requests with the same value can arise, necessitating a decision on which operation to accept and which to reject.

:p How does a single leader node help enforce uniqueness constraints in a distributed system?
??x
A single leader node acts as a central authority that makes decisions on behalf of all nodes, ensuring that only one operation is accepted when multiple conflicting requests are made. This approach works well for systems where a single point of failure is acceptable.

```java
class LeaderNode {
    private Map<String, String> uniqueValues = new HashMap<>();
    
    public void processRequest(String value) {
        if (uniqueValues.containsKey(value)) {
            // Reject the request as it violates uniqueness constraint
        } else {
            uniqueValues.put(value, value);
            // Accept and log the request
        }
    }
}
```
x??

---

#### Partitioning for Uniqueness

Background context: To scale out uniqueness checks in a distributed system, partitions can be used based on the value that needs to be unique. This ensures that all requests with the same value are processed by the same partition.

:p How does partitioning by username ensure uniqueness?
??x
Partitioning by hash of username allows each request for a specific username to be routed to the same partition. A stream processor within this partition can then maintain state (e.g., in a local database) to check and enforce the uniqueness constraint deterministically.

```java
class UsernameUniquenessCheck {
    private Map<String, Boolean> usernames = new HashMap<>();
    
    public void processRequest(String username) {
        if (!usernames.containsKey(username)) {
            usernames.put(username, true);
            // Emit success message
        } else {
            // Emit rejection message as the username is already taken
        }
    }
}
```
x??

---

#### Uniqueness in Log-based Messaging

Background context: In log-based messaging systems, all consumers see messages in a total order due to the nature of logs. This can be leveraged to enforce uniqueness constraints by processing requests sequentially within partitions.

:p How does a stream processor enforce uniqueness during username registration?
??x
A stream processor consumes messages from a partitioned log based on the hash of the username. It maintains state (e.g., in a local database) to track which usernames are taken and processes each request deterministically, either accepting or rejecting it based on availability.

```java
class UsernameRegistrationProcessor {
    private Map<String, Boolean> usernames = new HashMap<>();
    
    public void processRequest(String username) {
        if (!usernames.containsKey(username)) {
            usernames.put(username, true);
            // Emit success message
        } else {
            // Emit rejection message as the username is already taken
        }
    }
}
```
x??

---

#### Multi-partition Request Processing

Background context: When multiple partitions are involved in a transaction, ensuring atomicity and constraint satisfaction becomes more complex. However, by using partitioned logs and processing requests sequentially, equivalent correctness can be achieved without an atomic commit.

:p How does the unbundled database approach handle money transfer between accounts?
??x
The unbundled database approach uses log partitions for each account (payer and payee). A stream processor generates debit and credit instructions based on a unique request ID, ensuring that both operations are applied atomically even across different partitions. This avoids the need for a distributed transaction.

```java
class MoneyTransferProcessor {
    private Map<String, Integer> payerAccounts = new HashMap<>();
    private Map<String, Integer> payeeAccounts = new HashMap<>();

    public void processRequest(String requestId, String payerAccount, String payeeAccount, int amount) {
        if (payerAccounts.get(payerAccount) >= amount) {
            // Deduct from payer account
            payerAccounts.put(payerAccount, payerAccounts.get(payerAccount) - amount);
            
            // Credit to payee account
            payeeAccounts.put(payeeAccount, payeeAccounts.getOrDefault(payeeAccount, 0) + amount);
            
            // Emit credit and debit instructions with requestId
        } else {
            // Handle insufficient funds
        }
    }
}
```
x??

---


#### Multiple Partition Data Processing
Background context: The idea of using multiple differently partitioned stages is similar to what we discussed in “Multi-partition data processing” on page 514 (see also “Concurrency control” on page 462). This technique allows for parallel processing but requires careful management to ensure data consistency.
:p What concept does the term "multiple partition data processing" refer to, and how is it related to concurrency control?
??x
This concept refers to dividing a dataset into multiple partitions that can be processed in parallel. It relates to concurrency control because managing access to these partitions ensures that operations do not conflict with each other, maintaining consistency.
```java
// Pseudocode for partitioned processing
public void processPartition(int partitionId) {
    // Logic to process the specific partition
}
```
x??

---

#### Linearizability of Transactions
Background context: Transactions are typically linearizable (see “Linearizability” on page 324): that is, a writer waits until a transaction is committed, and thereafter its writes are immediately visible to all readers. This property ensures strong consistency.
:p What does the term "linearizability" mean in the context of transactions?
??x
Linearizability means that a sequence of operations appears as if they are executed one after another by a single processor without interleaving with other processors' operations. It provides a total order on all operations, ensuring that each operation is visible to all readers immediately after it commits.
```java
// Pseudocode for linearizable transaction
public void writeValue(int value) {
    // Acquire lock
    // Perform write
    // Release lock
}
```
x??

---

#### Asynchronous Consumers in Stream Processing
Background context: In stream processing, consumers of a log are asynchronous by design. A sender does not wait until its message has been processed by consumers.
:p Why is it important for consumers to be asynchronous in stream processing?
??x
Asynchronous consumers allow the system to handle high throughput and scalability. They ensure that producers do not block waiting for acknowledgments, thus maintaining a steady flow of data without backpressure.
```java
// Pseudocode for sending messages asynchronously
public void sendMessage(String message) {
    // Send message to stream processor
    // Do not wait for acknowledgment
}
```
x??

---

#### Uniqueness in Log-based Messaging
Background context: A client can wait for a message to appear on an output stream, ensuring the uniqueness constraint is satisfied. This example demonstrates how waiting only informs the sender of the outcome without affecting processing.
:p How does waiting for a message's appearance on an output stream ensure uniqueness?
??x
Waiting ensures that the client receives confirmation that the message has been processed correctly and uniquely, decoupling this check from the actual message processing logic.
```java
// Pseudocode for checking message uniqueness
public boolean checkUniqueness(String message) {
    // Logic to wait for message appearance on output stream
    return isUnique;
}
```
x??

---

#### Consistency vs. Timeliness
Background context: Consistency and timeliness are two different requirements that need separate consideration in data systems. Consistency ensures absence of corruption, while timeliness ensures users observe the system in an up-to-date state.
:p What distinguishes consistency from timeliness in data systems?
??x
Consistency refers to maintaining integrity—no data loss or false data. Timeliness means ensuring timely updates so that users see an accurate state of the system. Violations of timeliness can be fixed by waiting, but violations of integrity require explicit checking and repair.
```java
// Pseudocode for consistency check
public boolean isConsistent() {
    // Logic to verify data integrity
    return consistent;
}
```
x??

---

#### CAP Theorem
Background context: The CAP theorem (see “The Cost of Linearizability” on page 335) states that a distributed system can at most satisfy two out of the three properties: Consistency, Availability, and Partition Tolerance. Linearizability is a strong way to achieve consistency.
:p What does the CAP theorem state about the trade-offs in distributed systems?
??x
The CAP theorem states that in a distributed system, you can only have two of the following guarantees: Consistency (all nodes see the same data at the same time), Availability (every request receives a response), and Partition Tolerance (the system continues to operate despite network partitions). Linearizability is often used as a way to achieve strong consistency.
```java
// Pseudocode for handling CAP trade-offs
public void handleCAPTradeoffs() {
    // Logic to decide on the three properties based on requirements
}
```
x??

---

#### Read-After-Write Consistency
Background context: Weaker timeliness properties like read-after-write (RAW) consistency can also be useful. RAW ensures that a read operation sees all writes made before it, even if they are not yet visible to other readers.
:p What is the purpose of read-after-write (RAW) consistency in distributed systems?
??x
Read-after-write consistency ensures that after a write has been performed, subsequent reads by the same client will see that update. This is useful for maintaining coherence and ensuring that writes have taken effect before further operations are executed.
```java
// Pseudocode for read-after-write check
public boolean readAfterWrite(int value) {
    // Logic to ensure local visibility of write operation
    return hasRead;
}
```
x??

---

#### Integrity in Data Systems
Background context: Integrity means the absence of corruption—no data loss, and no contradictory or false data. Maintaining integrity is crucial for the usefulness of derived datasets.
:p How can integrity be ensured in a distributed database system?
??x
Integrity can be ensured through mechanisms like ACID transactions, where atomicity, consistency, isolation, and durability are key. For example, ensuring that indexes correctly reflect the contents of the database prevents data corruption.
```java
// Pseudocode for maintaining database integrity
public void maintainDatabaseIndex() {
    // Logic to update index with new records or remove missing ones
}
```
x??


#### Lag in Transaction Systems
Background context explaining why lag can occur and its normalcy. Highlight that banks reconcile transactions asynchronously, which allows for some delay without compromising system integrity.
:p What is the reason behind a transaction from the last 24 hours not appearing on a credit card statement immediately?
??x
It is normal due to the asynchronous nature of bank reconciliation processes, where timeliness is not critical as long as the system maintains the integrity of transactions over time. This means that while transactions are processed and reconciled asynchronously, any delays do not violate the ACID properties of transactional systems.
x??

---

#### Integrity in Dataflow Systems
Explanation of how dataflow systems decouple timeliness from integrity, emphasizing the importance of maintaining integrity through mechanisms like exactly-once or effectively-once semantics. Mention fault tolerance as a key factor in preserving system integrity.
:p How do event-based dataflow systems ensure the integrity of their transactions?
??x
Event-based dataflow systems maintain integrity by ensuring that each event is processed exactly once, using techniques such as idempotent operations and reliable stream processing. This approach helps prevent issues like losing events or processing them twice. For example, messages are made immutable, allowing for reprocessing while maintaining the correct state.
```java
public class MessageProcessor {
    public void processMessage(String message) {
        // Process message using deterministic logic
        if (isImmutable(message)) {
            updateState(message);
        }
    }

    private boolean isImmutable(String message) {
        // Check if the message content has not changed
        return true; // Assume immutability for simplicity
    }

    private void updateState(String message) {
        // Update state based on deterministic logic
    }
}
```
x??

---

#### Exactly-Once Semantics
Explanation of exactly-once semantics in stream processing, which is crucial for maintaining data integrity. Mention how these mechanisms help prevent issues like duplicate events or lost events.
:p What does exactly-once semantics mean in the context of event streams?
??x
Exactly-once semantics ensures that each event in a stream is processed exactly once. This is critical to maintain data integrity by preventing duplicates and ensuring no events are lost. Techniques such as idempotent operations help achieve this, making sure that even if a message fails or is delivered multiple times, the processing logic does not alter the state inconsistently.
```java
public class ExactlyOnceProcessor {
    private Map<String, Boolean> processedMessages = new HashMap<>();

    public void processEvent(String event) {
        String requestId = getRequestId(event);
        
        if (!processedMessages.containsKey(requestId)) {
            // Process event only once
            updateState(event);
            processedMessages.put(requestId, true);
        }
    }

    private String getRequestId(String event) {
        // Extract a unique request ID from the event
        return UUID.randomUUID().toString();
    }

    private void updateState(String event) {
        // Update state based on the event
    }
}
```
x??

---

#### Uniqueness Constraint in Streams
Explanation of how uniqueness constraints are enforced and their limitations, noting that traditional forms require consensus through a single node. Mention why this is unavoidable for certain types of constraints.
:p How does enforcing a uniqueness constraint work in stream processing?
??x
Enforcing a uniqueness constraint typically requires consensus across the system, often implemented by funneling all events into a single node. This ensures that each event is processed only once globally, which is necessary to maintain data integrity. However, this approach comes with limitations and overhead due to the need for coordinated processing and potential bottleneck at the single node.
```java
public class UniquenessEnforcer {
    private Set<String> uniqueIds = new HashSet<>();

    public boolean processEvent(String id) {
        if (uniqueIds.contains(id)) {
            return false; // Duplicate event
        }
        
        uniqueIds.add(id);
        // Process event further
        return true;
    }
}
```
x??

---


#### Compensating Transactions
Compensating transactions are a mechanism to handle violations of constraints by making compensatory changes that correct the mistake. This is often used when strict uniqueness or other constraints cannot be enforced immediately, but can be corrected later.

:p What is a compensating transaction?
??x
A compensating transaction involves correcting a constraint violation by performing an additional operation that nullifies the effect of the original erroneous action. For example, if two users try to register the same username, one user might get a message asking them to choose another name, and the system will update its state accordingly.
x??

---
#### Apology Workflow
The apology workflow is part of business processes where constraints are temporarily violated due to unexpected circumstances. This approach involves sending an apology message or providing compensation when a constraint is breached.

:p What is an example of an apology workflow?
??x
An example is when customers order more items than the warehouse has in stock. In this case, you can order additional inventory, apologize for the delay, and offer customers a discount. This compensatory approach is similar to dealing with unforeseen issues like lost inventory.
x??

---
#### Overbooking Practices
Overbooking practices are used by businesses like airlines and hotels where they intentionally violate constraints (such as one person per seat) because it is expected that some customers will not use their reservations.

:p How do overbooking practices work?
??x
Overbooking practices involve accepting more bookings than the available capacity allows, expecting that a certain number of customers will cancel or miss their reservation. When demand exceeds supply, compensation processes such as refunds, upgrades, or providing complimentary services are put in place to handle the situation.
x??

---
#### Bank Overdrafts and Compensation
Banks often use overdraft fees and subsequent refunds to manage situations where more money is withdrawn than available in an account.

:p How does a bank handle overdrawn accounts?
??x
If someone withdraws more money than they have, the bank can charge them an overdraft fee and ask for repayment. By limiting total withdrawals per day, the risk to the bank is controlled. If necessary, the bank can refund one of the charges, ensuring that overall integrity is maintained despite temporary violations.
x??

---
#### Optimistic Validation
Optimistic validation involves writing data before checking constraints, allowing operations to proceed under the assumption that they will eventually pass all checks.

:p What is optimistic validation?
??x
Optimistic validation allows for a write operation to occur before enforcing constraints. The system assumes that despite potential temporary violations, integrity can be maintained by performing compensatory actions later if needed. This approach reduces overhead compared to strict pre-validation.
x??

---
#### Dataflow Systems and Integrity Guarantees
Dataflow systems can maintain integrity guarantees on derived data without requiring atomic commit or linearizability.

:p How do dataflow systems handle integrity?
??x
Dataflow systems ensure that integrity is preserved through mechanisms like compensating transactions, allowing constraints to be checked after the fact rather than strictly before writing data. This approach maintains correctness while reducing the need for synchronous cross-partition coordination.
x??

---

