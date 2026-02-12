# Lab 05: Building a Distributed Booking Service with Log-based Transactions

**Book:** Understanding-Distributed-Systems-2021-Roberto-Vitillo--
**Chapters Covered:** Parts 09-10
**Estimated Time:** 4-6 hours

---

## 📋 Objectives

- Design and implement a distributed booking service using log-based transactions
- Implement consistency guarantees, idempotency, and eventual consistency in the system
- Integrate Sagas for distributed transactions and handle failures

## 🔑 Key Concepts

- **Log-based transactions**
- **Consistency guarantees**
- **Idempotency requirement**
- **Asynchronous consumers and checkpoints**
- **Replication and eventual consistency**
- **Sagas for distributed transactions**

## ✅ Prerequisites

- Understanding of asynchronous transactions and log-based transactions
- Familiarity with distributed systems concepts
- Basic knowledge of programming languages (e.g., Java, Python) and frameworks (e.g., Spring, Flask)

---

## 🧪 Exercises

### Exercise 1: Step 1: Design the Distributed Booking Service Architecture

Design a high-level architecture for the booking service, including Sagas and message queues

#### 💡 Hints

- Use a diagram or flowchart to visualize the system

#### ✓ Validation Criteria

Verify that the architecture is scalable and fault-tolerant

---

### Exercise 2: Step 2: Implement Log-based Transactions

Implement log-based transactions using a message queue (e.g., RabbitMQ, Apache Kafka)

#### Starter Code

```python
Using the chosen framework (e.g., Spring, Flask), create a log entry and append it to a message queue
```

#### 💡 Hints

- Use idempotent messages to ensure consistency

#### ✓ Validation Criteria

Verify that transactions are committed correctly using the message queue

---

### Exercise 3: Step 3: Implement Consistency Guarantees

Implement consistency guarantees (e.g., strong consistency, eventual consistency) in the system

#### Starter Code

```python
Using the chosen framework, implement a search index to verify consistency
```

#### 💡 Hints

- Use a cache or a database to store consistent data

#### ✓ Validation Criteria

Verify that the search index returns accurate results

---

### Exercise 4: Step 4: Implement Sagas for Distributed Transactions

Implement Sagas for distributed transactions, handling failures and compensating transactions as needed

#### Starter Code

```python
Using the chosen framework, create a Saga class that handles asynchronous consumers and checkpoints
```

#### 💡 Hints

- Use a transaction manager to manage Sagas

#### ✓ Validation Criteria

Verify that Sagas can handle failures correctly

---

### Exercise 5: Step 5: Integrate the System with a Serverless Cloud Compute Service

Integrate the booking service with a serverless cloud compute service (e.g., AWS Lambda, Google Cloud Functions)

#### Starter Code

```python
Using the chosen framework and cloud service, create a function that handles incoming requests
```

#### 💡 Hints

- Use event-driven programming to handle requests

#### ✓ Validation Criteria

Verify that the system can process requests correctly

---

### Exercise 6: Step 6: Test and Refine the System

Test the booking service thoroughly, refining it as needed for production use

#### 💡 Hints

- Use load testing tools to test the system

#### ✓ Validation Criteria

Verify that the system can handle a high volume of requests

---

## 🎯 Bonus Challenges

1. {'title': 'Challenge: Implement a Real-time Booking System with WebSockets', 'description': 'Implement a real-time booking system using WebSockets, allowing users to see updates in real-time', 'code_template': '', 'hints': ['Use a WebSocket library to handle real-time connections'], 'validation': 'Verify that the system can display updates correctly'}

## 🎓 Expected Outcomes

After completing this lab, you should have:

- A fully functional distributed booking service with log-based transactions and Sagas for distributed transactions
- Consistency guarantees, idempotency, and eventual consistency in the system
- The ability to handle failures and compensating transactions using Sagas

---

## 📝 Submission Checklist

- [ ] All exercises completed
- [ ] Code runs without errors
- [ ] Validation criteria met
- [ ] Code is documented
- [ ] (Optional) Bonus challenges attempted

---

*Generated from Parts 09-10 - Understanding-Distributed-Systems-2021-Roberto-Vitillo--*
