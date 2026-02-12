# High-Quality Flashcards: 2B001--Financial-Data-Engineering_processed (Part 20)


**Starting Chapter:** Data Observability

---


#### Observability Engineering Definition
Background context explaining the concept. Charity Majors, Liz Fong-Jones, and George Miranda (Observability Engineering, O’Reilly, 2022) describe a software system as observable if you can:
- Understand the inner workings of your application.
- Understand any system state your application may have gotten itself into, even new ones you have never seen before and couldn’t have predicted.
- Understand the inner workings and system state solely by observing and interrogating with external tools.
- Understand the internal state without shipping any new custom code to handle it.

:p What does Observability Engineering define as an observable software system?
??x
Observability Engineering defines an observable software system as one where you can:
1. Understand its inner workings.
2. Grasp any system state, including unexpected states.
3. Determine the internal state by observing and using external tools without needing to add custom code.

This means that with proper observability practices, teams can proactively handle issues and gain deep insights into their systems.

x??

---

#### Data Observability Definition
Background context explaining the concept. Andy Petrella of Fundamentals of Data Observability (O’Reilly, 2023) defines data observability as:
- The capability of a system to generate information on how the data influences its behavior and vice versa.
Financial data engineers should be able to ask and answer questions like "Why is workflow A running slowly?" or "What caused the data quality issue in dataset Y?"

:p What does Andy Petrella define Data Observability as?
??x
Andy Petrella defines data observability as:
- The capability of a system to generate information on how the data influences its behavior and vice versa.

This means that with proper data observability, teams can understand how changes or issues in data affect system performance and behavior, and also identify the root causes of such issues directly from the data itself without making assumptions or requiring new custom code.

x??

---

#### Building Blocks of Data Observability
Background context explaining the concept. Key components include metrics, events, logs, and traces, as well as concepts like automated monitoring, logging, root cause analysis, data lineage, contextual observability, SLAs, telemetry/OpenTelemetry, instrumentation, tracking, tracing, and alert analysis.

:p What are the main building blocks of data observability?
??x
The main building blocks of data observability are:
- Metrics: Quantitative measures that provide information about system state.
- Events: Discrete occurrences that can be logged or traced.
- Logs: Human-readable records of events and actions.
- Traces: Contextual information to understand the flow of requests across services.

Additionally, other concepts include automated monitoring and logging, root cause analysis, data lineage, contextual observability, SLAs (Service-Level Agreements), telemetry/OpenTelemetry, instrumentation, tracking, tracing, and alert analysis and triaging.

x??

---

#### OpenTelemetry Overview
Background context explaining the concept. OpenTelemetry is an open-source framework for collecting and managing telemetry data (traces, metrics, and logs) from applications and services to gain insights into their behavior, performance, and reliability.

:p What is OpenTelemetry?
??x
OpenTelemetry is an open-source framework that provides standardized instrumentation and integration capabilities for various programming languages, frameworks, and platforms. It allows engineers to collect telemetry data (traces, metrics, and logs) from applications and services, which can then be sent to different backends or observability platforms for storage, analysis, visualization, and alerting.

```java
// Example of OpenTelemetry instrumentation in Java
import io.opentelemetry.api.trace.Span;
import io.opentelemetry.api.trace.Tracer;

public class Example {
    private static final Tracer tracer = Tracing.getTracer("example-tracer");

    public void processRequest() {
        Span span = tracer.spanBuilder("process-request").startSpan();
        
        // Code to be instrumented
        try {
            // Your business logic here
        } finally {
            span.end(); // Ensure the span is properly closed
        }
    }
}
```

x??

---

#### Benefits of Data Observability for Financial Institutions
Background context explaining the concept. Implementing a data observability system can bring several benefits, including higher data quality, operational efficiency, improved communication and trust between teams, enhanced client trust, maintaining reliability, and ensuring regulatory compliance.

:p What are the key benefits of implementing a data observability system in financial institutions?
??x
The key benefits of implementing a data observability system in financial institutions include:
- Higher Data Quality: By monitoring and analyzing data quality metrics.
- Operational Efficiency: Reduced Time to Detect (TTD) and Time to Resolve (TTR).
- Improved Communication and Trust: Better coordination between risk management, trading desk, and other teams.
- Enhanced Client Trust: Ability to detect and understand issues that may affect clients.
- Reliable Complex Data Pipelines: Maintaining visibility into data ingestion and transformation processes.
- Regulatory Compliance: Ensuring data privacy and security.

x??

---

#### Financial Data Engineers Role in Data Observability
Background context explaining the concept. Financial data engineers are crucial in embedding data observability capabilities within financial data infrastructure. They need to instrument systems to generate vast amounts of heterogeneous data points, which must be indexed, stored, and queried efficiently.

:p What is the role of a financial data engineer in implementing data observability?
??x
The role of a financial data engineer in implementing data observability includes:
- Instrumenting systems to generate large volumes of diverse data.
- Efficiently indexing, storing, and querying this data in near-real time.
- Ensuring comprehensive visibility into various components of the financial data infrastructure, including ingestion, storage, processing, workflows, quality, compliance, and governance.

This requires a deep understanding of both technical and business aspects to ensure that the observability system meets the needs of different stakeholders.

x??

---


#### Monitoring's Role in Financial Data Engineering Lifecycle
Monitoring is crucial for ensuring the reliability, performance, security, and compliance of financial data infrastructures. It covers various types such as metric, event, log, and trace monitoring to track application activities and diagnose potential issues.

:p What are the key layers discussed in the financial data engineering lifecycle?
??x
The financial data engineering lifecycle includes several key layers: data acquisition, transformation, storage, access, analysis, monitoring, and observability. Monitoring specifically deals with ensuring the reliability, performance, security, and compliance of these infrastructures.
x??

---

#### Importance of Metric, Event, Log, and Trace Monitoring
Metric, event, log, and trace monitoring are essential components that help in tracking application activities and diagnosing potential issues. Metrics provide numerical data about system performance, events capture specific actions or conditions, logs contain detailed information about what happened, and traces follow a request through the system to identify bottlenecks.

:p What types of monitoring are crucial for financial data engineering?
??x
Crucial types of monitoring in financial data engineering include metric, event, log, and trace monitoring. Metrics provide numerical performance data, events capture specific actions or conditions, logs contain detailed information about what happened, and traces follow a request through the system to identify bottlenecks.
x??

---

#### Data Quality, Performance, and Cost Monitoring
Data quality, performance, and cost are key areas in monitoring financial data infrastructures. Techniques for these include setting up alerts based on thresholds, using analytics tools, and conducting regular reviews of data and costs.

:p What aspects of monitoring are important in a financial context?
??x
In a financial context, it is essential to monitor data quality, performance, and cost. This involves setting up alerts based on predefined thresholds, utilizing analytics tools for detailed analysis, and regularly reviewing both data integrity and cost efficiency.
x??

---

#### Business and Analytical Monitoring for Insights
Business and analytical monitoring provide actionable insights that support informed decision-making within financial institutions. This includes tracking key business metrics and using advanced analytics to uncover patterns and trends.

:p What is the role of business and analytical monitoring in financial data engineering?
??x
The role of business and analytical monitoring in financial data engineering is to provide actionable insights that support informed decision-making. It involves tracking key business metrics and utilizing advanced analytics to uncover patterns, trends, and other valuable information.
x??

---

#### Introduction to Data Observability
Data observability is an emerging topic that provides deep insights into the internals and behavior of various data infrastructure components. It helps in understanding how different parts of the system interact and function.

:p What is data observability?
??x
Data observability is a concept that offers detailed insights into the internal workings and behaviors of various data infrastructure components. It aids in comprehending how different parts of the system interact and function.
x??

---

#### Data Workflows for Modularity
Smaller data processing components known as data workflows are commonly developed to enhance modularity in financial data infrastructures. These workflows help in breaking down complex processes into simpler, more manageable tasks.

:p What are data workflows?
??x
Data workflows are smaller data processing components used to enhance the modularity of financial data infrastructures. They help in breaking down complex processes into simpler and more manageable tasks.
x??

---


#### Workflow-Oriented Software Architectures (WOSA)
Background context: As companies grow, their technological stacks increase in size and complexity. This creates numerous interdependencies among system components, requiring organized software transactions into structured workflows that can be defined, coordinated, managed, monitored, and scaled following a specific business logic.

:p What is the purpose of Workflow-Oriented Software Architectures (WOSA)?
??x
The primary purpose of WOSAs is to manage complex processes by organizing them into structured workflows. This approach enhances modularity, efficiency, and manageability in software systems, ensuring that various system components can interact logically and follow specific business rules.

Code examples are less relevant here as it's more about the concept rather than implementation:
```java
// Example of defining a simple workflow in pseudocode
class Workflow {
    void defineSteps() {
        step1 = new Step("InitiateTrade");
        step2 = new Step("ExecuteTrade");
        step3 = new Step("CaptureTrade");

        step1.nextStep(step2);
        step2.nextStep(step3);
    }
}
```
x??

---

#### Data Workflow
Background context: A data workflow is a repeatable process that involves applying a structured sequence of data processing steps to an initial dataset, producing a desired output. These workflows are essential in financial data engineering and can be abstracted using the dataflow paradigm.

:p What defines a data workflow?
??x
A data workflow is defined as a repeatable process where a structured sequence of data processing steps is applied to an initial dataset, resulting in a desired output. This process often involves organizing tasks into a directed computational graph (DAG) with nodes representing individual computation steps and links expressing data dependencies.

Code examples are relevant here to illustrate the concept:
```java
// Example of defining a linear DAG in pseudocode
class DataWorkflow {
    Node task1 = new TaskNode("DataIngestion");
    Node task2 = new TaskNode("DataTransformation");
    Node task3 = new TaskNode("DataValidation");

    void createDAG() {
        task1.next(task2);
        task2.next(task3);
    }
}
```
x??

---

#### Linear Directed Acyclic Graph (DAG)
Background context: A linear DAG organizes tasks in a sequential order where each task N can have at most one preceding task (N–1) and one subsequent task (N+1). This structure is often used to represent simple data workflows.

:p What characterizes a linear Directed Acyclic Graph (DAG)?
??x
A linear Directed Acyclic Graph (DAG) organizes tasks in a sequential order where each task N can have at most one preceding task (N–1) and one subsequent task (N+1). In this structure, the graph does not contain any cycles.

Code examples are relevant to illustrate the concept:
```java
// Example of creating a linear DAG in pseudocode
class TaskNode {
    String name;
    TaskNode next;

    TaskNode(String name) {
        this.name = name;
    }

    void next(TaskNode task) {
        next = task;
    }
}

void createLinearDAG() {
    Node task1 = new TaskNode("DataIngestion");
    Node task2 = new TaskNode("DataTransformation");
    Node task3 = new TaskNode("DataValidation");

    task1.next(task2);
    task2.next(task3);
}
```
x??

---

#### Complex Directed Acyclic Graph (DAG)
Background context: In complex DAGs, a specific computing task may depend on multiple preceding tasks. This structure is more intricate than the linear case and requires careful design to ensure that data dependencies are properly managed.

:p What characterizes a complex Directed Acyclic Graph (DAG)?
??x
A complex Directed Acyclic Graph (DAG) allows for dependencies where a specific computing task can rely on multiple preceding tasks. Unlike a linear DAG, this structure is more intricate and requires careful design to ensure that data dependencies are properly managed without creating cycles.

Code examples are relevant:
```java
// Example of creating a complex DAG in pseudocode
class TaskNode {
    String name;
    List<TaskNode> predecessors;

    TaskNode(String name) {
        this.name = name;
        this.predecessors = new ArrayList<>();
    }

    void addPredecessor(TaskNode task) {
        predecessors.add(task);
    }
}

void createComplexDAG() {
    Node task1 = new TaskNode("DataIngestion");
    Node task2 = new TaskNode("DataTransformation");
    Node task3 = new TaskNode("DataValidation");

    // Complex dependency: Task 6 depends on tasks 3, 4, and 5
    Node task6 = new TaskNode("ComplexTaskDependentOnMultipleTasks");

    task1.addPredecessor(task2);
    task2.addPredecessor(task3);
    task3.addPredecessor(task4);
    task4.addPredecessor(task5);
    task5.addPredecessor(task6);
}
```
x??

---

#### Task Abstraction and Best Practices
Background context: When defining computational DAGs, it is essential to consider the nature of tasks. Tasks should be atomic units of execution that either succeed or fail as a whole. They should also be idempotent to allow for retry operations without causing side effects.

:p What are best practices when defining tasks in a data workflow?
??x
Best practices for defining tasks in a data workflow include ensuring they are atomic, meaning they either succeed or fail as a whole. Additionally, tasks should be idempotent, which means running the same task multiple times will yield the same result without causing any unexpected side effects. This allows for checkpoint features to resume from failed steps rather than re-executing them entirely.

Code examples are relevant:
```java
// Example of ensuring a task is atomic and idempotent in pseudocode
class Task {
    void execute() {
        // Execute logic that should be atomic and idempotent
    }

    boolean canRetryOnFailure() {
        return true; // Indicate if the task can be retried on failure
    }
}

// Example of a retry mechanism in pseudocode
void runTaskWithRetry(Task task) {
    int retries = 3;
    while (retries > 0) {
        try {
            task.execute();
            break; // Exit loop if execution succeeds
        } catch (Exception e) {
            retries--;
        }
    }
}
```
x??

---

#### Task Size in Computational DAGs
Background context: The size of tasks within a computational DAG should be balanced to facilitate debugging and traceability while avoiding unnecessary overhead. Tasks that are too small can introduce overhead, whereas overly large tasks may constrain debuggability.

:p What considerations should be taken into account when defining the size of tasks in a computational DAG?
??x
When defining the size of tasks within a computational DAG, consider balancing task size to facilitate debugging and traceability without introducing unnecessary overhead. Tasks that are too small can introduce overhead due to frequent execution and management costs. Conversely, overly large tasks may constrain debuggability and lead to costly retry operations.

Code examples are relevant:
```java
// Example of defining a balanced task in pseudocode
class Task {
    int size = 100; // Define an appropriate size for the task

    void execute() {
        // Execute logic that should be small enough to facilitate debugging but not too large
    }
}

void defineTaskSize(Task task) {
    if (task.size < MIN_SIZE || task.size > MAX_SIZE) {
        throw new IllegalArgumentException("Task size out of bounds");
    }
}
```
x??

---

