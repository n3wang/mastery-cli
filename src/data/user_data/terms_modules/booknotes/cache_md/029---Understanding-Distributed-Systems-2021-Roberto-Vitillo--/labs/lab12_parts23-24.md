# Lab 12: Building a Distributed Logging System

**Book:** Understanding-Distributed-Systems-2021-Roberto-Vitillo--
**Chapters Covered:** Parts 23-24
**Estimated Time:** 4-6 hours

---

## 📋 Objectives

- Design a distributed logging system using OpenTracing and Azure Storage
- Implement logging levels and cost control for optimal resource utilization
- Troubleshoot issues with tracing and identify bottlenecks in the system

## 🔑 Key Concepts

- **OpenTracing and Span representation**
- **Azure Storage and Log Collector integration**
- **Logging levels and cost control**
- **Tracing and distributed tracing overview**

## ✅ Prerequisites

- Understanding of Linux command-line interface and basic programming concepts
- Familiarity with distributed systems and observability principles
- Knowledge of OpenTracing and Azure Storage concepts from previous chapters

---

## 🧪 Exercises

### Exercise 1: Setting up the Logging System

Create a new Azure Storage account and set up a Log Collector to forward logs from your application.

#### Starter Code

```python
None (students will create their own)
```

#### 💡 Hints

- Use the Azure CLI to create a new storage account
- Configure log forwarding in the Log Collector settings

#### ✓ Validation Criteria

Verify that logs are being forwarded correctly and stored in the Azure Storage account

---

### Exercise 2: Implementing Logging Levels and Cost Control

Modify your logging code to use OpenTracing's logging levels (e.g. info, warn, error) and implement cost control by sampling logs.

#### Starter Code

```python
LoggerExample with tracing-level logging and cost control
```

#### 💡 Hints

- Use OpenTracing's `setTag` method to set log levels
- Configure the Log Collector to sample logs at 1% frequency

#### ✓ Validation Criteria

Verify that logs are being logged at the correct level and sampled correctly

---

### Exercise 3: Implementing Tracing in Your Application

Instrument your application with OpenTracing's `Span` class to track requests and identify bottlenecks.

#### Starter Code

```python
OpenTracingExample with tracing spans
```

#### 💡 Hints

- Use the `startActiveSpan` method to begin a new trace
- Use the `endActiveSpan` method to complete a trace

#### ✓ Validation Criteria

Verify that traces are being started and completed correctly

---

### Exercise 4: Identifying Bottlenecks with Tracing

Analyze tracing data to identify performance bottlenecks in your application.

#### Starter Code

```python
OpenZipkinExample with tracing analysis
```

#### 💡 Hints

- Use OpenZipkin's dashboard to visualize traces
- Focus on spans with high latency values

#### ✓ Validation Criteria

Verify that you have identified a bottleneck and proposed a solution

---

### Exercise 5: Troubleshooting Issues with Tracing

Use tracing data to troubleshoot issues with your application's performance.

#### Starter Code

```python
TracingExample with error analysis
```

#### 💡 Hints

- Use the `get` method to retrieve a specific span
- Focus on spans with error values

#### ✓ Validation Criteria

Verify that you have successfully identified and addressed an issue

---

## 🎯 Bonus Challenges

1. {'title': 'Implementing Distributed Tracing', 'description': 'Extend your tracing system to include distributed tracing capabilities.', 'code_template': 'ServiceMeshClientExample with distributed tracing', 'hints': ["Use OpenTracing's `Span` class to create a distributed trace", 'Configure the Service Mesh client to forward spans']}
2. {'title': 'Optimizing Log Collection', 'description': 'Implement advanced log collection techniques, such as compression and encryption.', 'code_template': 'LogEmitterExample with compression and encryption', 'hints': ["Use OpenTracing's `setCompress` method to enable compression", 'Configure the Log Collector to use encryption']}

## 🎓 Expected Outcomes

After completing this lab, you should have:

- A fully functional distributed logging system using OpenTracing and Azure Storage
- Understanding of how to implement logging levels, cost control, tracing, and distributed tracing in a real-world scenario
- Ability to troubleshoot issues with tracing data and identify performance bottlenecks

---

## 📝 Submission Checklist

- [ ] All exercises completed
- [ ] Code runs without errors
- [ ] Validation criteria met
- [ ] Code is documented
- [ ] (Optional) Bonus challenges attempted

---

*Generated from Parts 23-24 - Understanding-Distributed-Systems-2021-Roberto-Vitillo--*
