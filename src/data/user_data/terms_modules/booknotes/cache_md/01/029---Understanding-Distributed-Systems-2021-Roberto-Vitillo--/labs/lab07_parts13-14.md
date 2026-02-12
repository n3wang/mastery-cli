# Lab 07: Designing a Distributed System with Messaging and Sharding

**Book:** Understanding-Distributed-Systems-2021-Roberto-Vitillo--
**Chapters Covered:** Parts 13-14
**Estimated Time:** 4 hours

---

## 📋 Objectives

- Understand how to design a distributed system with messaging and sharding
- Learn how to implement exactly-once processing using idempotent messages
- Implement sharding strategies and map keys to partitions
- Develop a gateway service for routing and handle range partitioning

## 🔑 Key Concepts

- **MessageProcessor and IdempotentProcess concepts**
- **Sharding strategies (Range Partitioning, Hash Partitioning)**
- **Stable Hashing and Ring Hashing**
- **Gateway Service for Routing**

## ✅ Prerequisites

- Basic understanding of distributed systems and messaging concepts
- Familiarity with Java or similar programming language

---

## 🧪 Exercises

### Exercise 1: Implement a basic MessageProcessor with idempotent messages

Create a simple MessageProcessor that sends messages to channels. Implement idempotence in the message processing logic.

#### Starter Code

```python
./src/main/java/MessageProcessor.java
```

#### 💡 Hints

- Use Java's built-in concurrency features for safe message processing

#### ✓ Validation Criteria

Verify that duplicate messages are handled correctly

---

### Exercise 2: Design and implement a sharding strategy using Range Partitioning

Create a ShardManager that maps keys to partitions. Implement range partitioning for a given dataset.

#### Starter Code

```python
./src/main/java/ShardManager.java
```

#### 💡 Hints

- Use Java's built-in data structures (HashMap) for efficient key mapping

#### ✓ Validation Criteria

Verify that the ShardManager correctly maps keys to partitions

---

### Exercise 3: Develop a gateway service for routing using ConsistentConfigStore

Create a GatewayService that routes messages to channels based on a consistent config store.

#### Starter Code

```python
./src/main/java/GatewayService.java
```

#### 💡 Hints

- Use Java's built-in concurrency features for safe message routing

#### ✓ Validation Criteria

Verify that the GatewayService correctly routes messages to channels

---

### Exercise 4: Implement stable hashing and ring hashing for partitioning

Create a ShardManager that uses stable hashing and ring hashing for partitioning. Implement range partitioning for a given dataset.

#### Starter Code

```python
./src/main/java/ShardManager.java
```

#### 💡 Hints

- Use Java's built-in data structures (HashMap) for efficient key mapping

#### ✓ Validation Criteria

Verify that the ShardManager correctly maps keys to partitions using stable hashing and ring hashing

---

### Exercise 5: Handle loss of sort order in hash partitioning

Create a ShardManager that handles loss of sort order in hash partitioning. Implement range partitioning for a given dataset.

#### Starter Code

```python
./src/main/java/ShardManager.java
```

#### 💡 Hints

- Use Java's built-in data structures (HashMap) for efficient key mapping

#### ✓ Validation Criteria

Verify that the ShardManager correctly handles loss of sort order in hash partitioning

---

## 🎯 Bonus Challenges

1. {'number': 6, 'title': 'Add error handling and logging to the MessageProcessor', 'description': 'Implement error handling and logging for the MessageProcessor. Handle exceptions and log important events.'}
2. {'number': 7, 'title': 'Optimize the GatewayService for performance', 'description': "Optimize the GatewayService for performance. Use Java's concurrency features to improve message routing efficiency."}

## 🎓 Expected Outcomes

After completing this lab, you should have:

- A working distributed system with messaging and sharding
- Exactly-once processing using idempotent messages
- Sharding strategies implemented correctly (Range Partitioning, Hash Partitioning)
- Gateway Service for Routing that handles range partitioning

---

## 📝 Submission Checklist

- [ ] All exercises completed
- [ ] Code runs without errors
- [ ] Validation criteria met
- [ ] Code is documented
- [ ] (Optional) Bonus challenges attempted

---

*Generated from Parts 13-14 - Understanding-Distributed-Systems-2021-Roberto-Vitillo--*
