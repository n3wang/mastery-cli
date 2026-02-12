# High-Quality Flashcards: 029---Understanding-Distributed-Systems-2021-Roberto-Vitillo--_processed (Part 9)


**Starting Chapter:** Asynchronous transactions. Log-based transactions

---


#### Log-based Transactions
Log-based transactions involve using a message log to coordinate updates across multiple data stores. This approach is particularly useful when traditional two-phase commit (2PC) cannot be used due to compatibility or performance reasons.

:p What is the primary challenge addressed by log-based transactions?
??x
The primary challenge addressed by log-based transactions is achieving consistency and ensuring atomicity in distributed systems without blocking the application, especially when dealing with data stores that do not support 2PC.
x??

---
#### Consistency Guarantees
In a log-based transaction, two data stores (e.g., relational database and search index) are kept in sync through an append-only message log. This approach allows for eventual consistency, where the system state eventually converges to be consistent.

:p How does the log-based transaction ensure that both data stores remain up-to-date?
??x
The log-based transaction ensures that both data stores remain up-to-date by writing a transaction record (e.g., product creation message) into an append-only log. The relational database and search index are asynchronous consumers of this log, reading entries in the order they were appended. This guarantees eventual consistency as long as all updates are recorded and eventually processed.

Example:
- Catalog service appends a "product creation" message to the log.
- Relational database reads from the log and updates its state.
- Search index reads from the log and updates its state.

```java
public class LogBasedTransaction {
    private MessageLog log;

    public void processProductCreation(Product product) {
        // Append a transaction record to the log
        String message = "CREATE_PRODUCT_" + product.getId();
        log.append(message);
        
        // Asynchronous consumers update their states in order
        Database db = new Database();
        db.updateState(log.getLastMessage());
        
        SearchIndex index = new SearchIndex();
        index.updateState(log.getLastMessage());
    }
}
```
x??

---
#### Idempotency Requirement
To ensure that messages can be processed multiple times without affecting the outcome, each message must be idempotent. This means that processing a message n times has the same effect as processing it once.

:p Why is idempotency crucial in log-based transactions?
??x
Idempotency is crucial in log-based transactions because consumers may read messages more than once due to crashes or delays. If a message were not idempotent, reading it multiple times could lead to incorrect updates, resulting in inconsistent states across data stores.

Example of an idempotent message:
- A "product creation" message contains a unique identifier (ID) that is ignored during processing unless the ID has not been seen before.
```java
public class IdempotentMessage {
    private String id;
    private String action;

    public boolean isIdempotent(String previousIds) {
        return !previousIds.contains(id);
    }

    // Process method ensures no duplicate effects
}
```
x??

---
#### Asynchronous Consumers and Checkpoints
Asynchronous consumers in the log-based transaction read messages from a message log at their own pace. To ensure data integrity, they periodically checkpoint the index of the last processed message to resume reading from where they left off.

:p How does the use of checkpoints help in asynchronous transactions?
??x
Checkpoints help in asynchronous transactions by ensuring that consumers can recover and continue processing messages even if they crash or are offline for some time. By storing the index of the last processed message, consumers can resume reading from that point once they come back online.

Example:
- A consumer processes a message and checkpoints its state.
- If the consumer crashes, it resumes reading from the last checkpoint upon coming back online.

```java
public class Consumer {
    private MessageLog log;
    private int lastCheckpoint;

    public void consume() {
        while (true) {
            String message = log.readNext();
            // Process the message
            
            // Checkpoint the index of the last processed message
            lastCheckpoint++;
        }
    }
}
```
x??

---
#### Replication and Eventual Consistency
Replicating data across multiple data stores using a message log allows for eventual consistency. This means that while there might be temporary inconsistencies, over time all data stores will converge to reflect the same state.

:p What is eventual consistency in the context of log-based transactions?
??x
Eventual consistency in the context of log-based transactions means that despite potential temporary inconsistencies across different data stores (e.g., a relational database and a search index), these stores will eventually be updated to reflect the correct state. This approach ensures that over time, all updates are processed, leading to convergence.

Example:
- A new product is created.
- The transaction log records "CREATE_PRODUCT_123".
- Both the relational database and search index eventually process this message and update their states.

```java
public class EventualConsistency {
    private MessageLog log;

    public void handleProductCreate(Product product) {
        // Append to log
        String message = "CREATE_PRODUCT_" + product.getId();
        log.append(message);
        
        // Asynchronous consumers ensure eventual consistency
        Database db = new Database();
        db.updateState(log.getLastMessage());
        
        SearchIndex index = new SearchIndex();
        index.updateState(log.getLastMessage());
    }
}
```
x??

---


#### Log Abstraction and Messaging
Log abstraction is a method used for state machine replication where changes to the system's state are recorded. In this context, we see logs as part of messaging interaction styles. Messaging involves communication through channels (brokers) rather than direct request-response methods. Messages have headers containing metadata like unique IDs and bodies with actual content.
:p What is log abstraction in the context of messaging?
??x
Log abstraction in the context of messaging refers to recording changes to the system's state as messages, which are then replicated across different systems like databases and search indexes. This allows for a form of state machine replication where each transaction or change is logged before being applied.
```java
public class LogEntry {
    private String messageID;
    private Object body;

    public LogEntry(String messageID, Object body) {
        this.messageID = messageID;
        this.body = body;
    }
}
```
x??

---

#### Sagas for Distributed Transactions
Sagas are a pattern used to implement distributed transactions where multiple services must coordinate their actions. Each local transaction within a saga has a corresponding compensating transaction that undoes its changes if the primary transaction fails.
:p What is a Saga in distributed systems?
??x
A Saga in distributed systems is a pattern for implementing complex workflows involving multiple services. It consists of a series of local transactions (T1, T2, ..., Tn) and their respective compensating transactions (C1, C2, ..., Cn). If any transaction fails, the compensating transaction undoes the effects of the failed transaction(s), ensuring atomicity.
```java
public class Saga {
    private List<LocalTransaction> localTransactions;
    private List<CompensatingTransaction> compensatingTransactions;

    public void execute() {
        for (LocalTransaction lt : localTransactions) {
            try {
                lt.execute();
            } catch (Exception e) {
                rollback(lt);
                throw new TransactionFailedException("Transaction failed");
            }
        }
    }

    private void rollback(LocalTransaction lt) {
        CompensatingTransaction ct = compensatingTransactions.get(localTransactions.indexOf(lt));
        ct.execute();
    }
}
```
x??

---

#### Orchestrator in Sagas
The orchestrator is a component that manages the execution of local transactions across processes. It initiates and coordinates these transactions, ensuring atomicity by rolling back if any part fails.
:p What role does an orchestrator play in sagas?
??x
An orchestrator plays a crucial role in sagas by managing the execution of multiple local transactions across different services. The orchestrator sends requests to initiate each transaction and listens for responses or failures. If any transaction fails, it triggers compensating transactions to revert changes made.
```java
public class Orchestrator {
    public void startTransaction() {
        LocalTransaction flightBooking = new FlightBookingService();
        LocalTransaction hotelBooking = new HotelBookingService();

        try {
            flightBooking.execute();
            hotelBooking.execute();
        } catch (Exception e) {
            // Rollback all transactions if any fail
            rollback(hotelBooking);
            rollback(flightBooking);
            throw new TransactionFailedException("Transaction failed");
        }
    }

    private void rollback(LocalTransaction transaction) {
        CompensatingTransaction compensating = getCompensationFor(transaction);
        compensating.execute();
    }

    private CompensatingTransaction getCompensationFor(LocalTransaction transaction) {
        // Logic to find corresponding compensation
    }
}
```
x??

---

#### Transaction State Management in Sagas
In sagas, the orchestrator needs to persist the state of transactions as they progress. This ensures that if an orchestrator crashes and restarts, it can resume from where it left off using checkpoints.
:p How does an orchestrator handle transaction states?
??x
An orchestrator handles transaction states by persisting them in a database during each step of the saga execution. Checkpoints are saved to ensure recoverability in case of failures. When starting or resuming a transaction, the orchestrator reads the last checkpoint from the database.
```java
public class Orchestrator {
    private Database db;

    public void startTransaction() {
        // Save initial state as checkpoint
        db.saveCheckpoint(initialState);

        try {
            LocalTransaction flightBooking = new FlightBookingService();
            LocalTransaction hotelBooking = new HotelBookingService();

            if (flightBooking.execute()) {
                db.saveCheckpoint(flightBooking.getState());
                if (!hotelBooking.execute()) {
                    // Rollback to previous checkpoint
                    db.rollbackToCheckpoint(getPreviousCheckpointState());
                }
            } else {
                rollback(flightBooking);
            }

        } catch (Exception e) {
            rollbackAllTransactions();
            throw new TransactionFailedException("Transaction failed");
        }
    }

    private void rollbackAllTransactions() {
        // Logic to handle rolling back all transactions
    }
}
```
x??

---

#### Messaging Channels and Inbound Adapters
Inbound messaging adapters are part of a service’s API surface, allowing services to receive messages from channels. These adapters facilitate communication through message-based interactions rather than direct request-response methods.
:p What role do inbound messaging adapters play in services?
??x
Inbound messaging adapters enable services to handle asynchronous communication via message channels. They allow services to listen for and process incoming messages, making them a key part of implementing distributed systems with messaging architectures.
```java
public class InboundAdapter {
    public void receiveMessage(Message message) {
        String messageID = message.getHeader().getMessageID();
        Object body = message.getBody();

        if (messageID.equals("bookFlight")) {
            FlightBookingService.bookFlight(body);
        } else if (messageID.equals("bookHotel")) {
            HotelBookingService.bookHotel(body);
        }
    }
}
```
x??

---


#### Idempotent Messages
Background context: In a workflow implementing asynchronous transactions, messages might appear twice at the receiving end. This can lead to duplication issues if actions are not designed to handle such cases. To address this, participants need to make their messages idempotent, meaning that applying the operation multiple times has the same effect as applying it once.
:p What is meant by an idempotent message in the context of asynchronous transactions?
??x
An idempotent message is one where repeating the action (like sending a message) does not change the outcome beyond the initial application. For example, if a message represents a payment transaction, sending the same message twice should result in only one payment being processed, not two.
??x
To ensure messages are idempotent, you might design your system so that each message contains enough information to handle retries without causing side effects.

```java
public class PaymentMessage {
    private String orderId;
    private BigDecimal amount;

    public PaymentMessage(String orderId, BigDecimal amount) {
        this.orderId = orderId;
        this.amount = amount;
    }

    // Methods to ensure idempotency like checking if the payment has already been processed
}
```
x??

---

#### Serverless Cloud Compute Services for Workflows
Background context: Implementing complex workflows can be challenging, especially when dealing with synchronous and asynchronous transactions. Serverless cloud compute services like AWS Step Functions or Azure Durable Functions simplify this by providing managed environments where you can define and run workflows without managing the underlying infrastructure.
:p How do serverless cloud compute services help in implementing workflows?
??x
Serverless cloud compute services automate much of the infrastructure management required to implement complex workflows. They allow developers to focus on defining the logic of the workflow using a visual editor or programming interfaces, abstracting away the details of scaling and managing servers. This makes it easier to build scalable and fault-tolerant applications without the overhead of traditional server management.
??x
For instance, AWS Step Functions use state machines to define workflows, allowing you to chain multiple tasks together with conditional logic.

```json
{
    "Comment": "A simple example of a state machine",
    "StartAt": "SendEmail",
    "States": {
        "SendEmail": {
            "Type": "Task",
            "Resource": "arn:aws:lambda:<region>:<account-id>:function:<function-name>",
            "Next": "SendSNS"
        },
        "SendSNS": {
            "Type": "Task",
            "Resource": "arn:aws:sns:<region>:<account-id>:<topic-name>",
            "End": true
        }
    }
}
```
x??

---

#### Isolation in Asynchronous Transactions
Background context: The two-phase commit (2PC) protocol provides strong isolation guarantees, but it is blocking. To achieve non-blocking transaction processing with Sagas, we had to give up on these traditional ACID guarantees. However, it turns out that there are ways to work around the lack of isolation.
:p How can the lack of isolation in asynchronous transactions be mitigated?
??x
The lack of isolation in asynchronous transactions can be mitigated using techniques such as semantic locks. The idea is that any data modified by Sagas is marked with a "dirty" flag, which is only cleared at the end of the transaction when it completes. Another transaction attempting to access a dirty record would either fail and roll back its changes or block until the dirty flag is cleared.
??x
This approach can introduce deadlocks, requiring strategies to mitigate them. For example, you could implement a timeout mechanism where if a lock does not clear within a certain period, the transaction fails.

```java
public class LockManager {
    private Map<String, Boolean> locks;

    public boolean tryLock(String resource) {
        // Logic to acquire and release locks
        return locks.putIfAbsent(resource, true) == null;
    }

    public void unlock(String resource) {
        if (locks.remove(resource) != null) {
            // Handle successful unlock
        }
    }
}
```
x??

---

#### Semantic Locks for Isolation in Sagas
Background context: To work around the lack of isolation guarantees in asynchronous transactions, semantic locks can be used. Any data modified by Sagas is marked with a "dirty" flag that gets cleared only when the transaction completes. Transactions accessing dirty records may fail and rollback or block until the flag is cleared.
:p How do semantic locks work to provide some level of isolation?
??x
Semantic locks work by marking data as "dirty" whenever it's modified during a transaction. This means that any subsequent transactions attempting to modify the same data will detect the dirty state and handle it accordingly. If another transaction tries to access a dirty record, it can either fail and rollback its changes or block until the dirty flag is cleared.
??x
This approach ensures that modifications are processed atomically, even in an asynchronous setting.

```java
public class TransactionManager {
    private Map<String, Boolean> dirtyRecords;

    public void markRecordAsDirty(String recordId) {
        dirtyRecords.put(recordId, true);
    }

    public boolean isRecordDirty(String recordId) {
        return dirtyRecords.containsKey(recordId);
    }
}
```
x??

