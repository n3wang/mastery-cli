# Lab 04: Building a Distributed System with Leader Election and Fault Tolerance

**Book:** Understanding-Distributed-Systems-2021-Roberto-Vitillo--
**Chapters Covered:** Parts 07-08
**Estimated Time:** 4-6 hours

---

## 📋 Objectives

- Design a distributed system with leader election and fault tolerance using the concepts from Understanding-Distributed-Systems-2021-Roberto-Vitillo.
- Implement leader election with TTL (Time To Live) and handle temporary unavailability of followers.
- Integrate ZooKeeper for leader verification and fencing tokens.

## 🔑 Key Concepts

- **Leader Election Overview**
- **Split Vote Scenario**
- **Election Timeout Mechanism**
- **Compare-and-Swap Operation with TTL**
- **Distributed Lock Implementation Example**
- **Fencing Tokens and Leader Verification**
- **ZooKeeper**
- **AppendEntries Message and Replication Process**

## ✅ Prerequisites

- Understanding of distributed systems, consensus protocols, and NoSQL databases.
- Experience with Java or Python programming languages.
- Familiarity with the concepts covered in Part 1: Practical considerations and Part 2: Sequential consistency.

---

## 🧪 Exercises

### Exercise 1: Designing the Distributed System Architecture

Create a high-level design of the distributed system, including the leader election algorithm, follower replication, and ZooKeeper integration.

#### 💡 Hints

- Use UML diagrams to visualize the system architecture.
- Research existing leader election algorithms and choose one to implement.

#### ✓ Validation Criteria

['The system architecture should include a clear leader election process with TTL.', 'Follower replication should be implemented using Compare-and-Swap Operation with TTL.', 'ZooKeeper should be integrated for leader verification and fencing tokens.']

---

### Exercise 2: Implementing Leader Election with TTL

Implement the leader election algorithm with TTL in your chosen programming language.

#### Starter Code

```python
java (or python) code template for leader election with TTL
```

#### 💡 Hints

- Use a timer to implement TTL.
- Handle temporary unavailability of followers.

#### ✓ Validation Criteria

['The system should elect a leader within the specified TTL.', 'Temporary unavailability of followers should not prevent election.']

---

### Exercise 3: Integrating ZooKeeper for Leader Verification and Fencing Tokens

Integrate ZooKeeper with your leader election system to verify leaders and fence tokens.

#### 💡 Hints

- Use the ZooKeeper Java API.
- Create a client to connect to ZooKeeper.

#### ✓ Validation Criteria

['Leaders should be verified using ZooKeeper.', 'Fencing tokens should be used to prevent leader elections during unavailability.']

---

### Exercise 4: Testing and Debugging the Distributed System

Test and debug your distributed system to ensure correct operation under various scenarios.

#### 💡 Hints

- Use a testing framework.
- Monitor system performance and behavior.

#### ✓ Validation Criteria

['The system should function correctly under normal conditions.', 'System performance and behavior should be within expected ranges.']

---

### Exercise 5: Bonus Challenge: Horizontal Scaling

Design a strategy for horizontal scaling of your distributed system to handle increased load.

#### 💡 Hints

- Research existing horizontal scaling strategies.
- Consider adding more nodes to the cluster.

#### ✓ Validation Criteria

['A clear plan should be in place for handling increased load.']

---

## 🎯 Bonus Challenges

1. {'title': 'Bonus Challenge: Fault Tolerance with Load Balancing', 'description': 'Implement a fault-tolerant system using load balancing to distribute incoming requests across multiple nodes.', 'code_template': '', 'hints': ['Use a load balancer library.', 'Implement health checks for nodes.'], 'validation': ['System should be able to handle node failures without losing functionality.']}

## 🎓 Expected Outcomes

After completing this lab, you should have:

- A functional distributed system with leader election and fault tolerance using ZooKeeper.
- Correct implementation of TTL-based leader election with handling temporary unavailability of followers.
- Integration of ZooKeeper for leader verification and fencing tokens.
- A well-designed horizontal scaling strategy to handle increased load.

---

## 📝 Submission Checklist

- [ ] All exercises completed
- [ ] Code runs without errors
- [ ] Validation criteria met
- [ ] Code is documented
- [ ] (Optional) Bonus challenges attempted

---

*Generated from Parts 07-08 - Understanding-Distributed-Systems-2021-Roberto-Vitillo--*
