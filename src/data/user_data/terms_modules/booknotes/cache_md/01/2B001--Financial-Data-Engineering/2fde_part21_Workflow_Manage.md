# High-Quality Flashcards: 2B001--Financial-Data-Engineering_processed (Part 21)


**Starting Chapter:** Workflow Management Systems. Flexibility. Scalability

---


---
#### Flexibility of WMS
Flexibility is a crucial property for a Workflow Management System (WMS) as it enables handling a wide variety of tasks and workflows. A flexible WMS should support both simple linear workflows and complex ones, with options to initiate workflows either through scheduling or events.

:p What does flexibility in WMS allow?
??x
A flexible WMS allows managing diverse tasks and workflows. It supports the creation of simple linear workflows as well as more complex ones, and offers flexibility in initiating workflows—both scheduled executions and event-triggered actions.
x??

---
#### Configurability of WMS
Configurability is another essential feature where users can define workflow specifications using Infrastructure-as-Code (IaC) methodologies. This allows defining workflows and tasks through programming languages like Python or Domain-Specific Languages (DSLs) such as JSON.

:p How does configurability enable workflow definition?
??x
Configurability enables users to programmatically define workflow and task specifications, including dependency structures, input/output parameters, error handling, timeout policies, retry logic, status updates, triggers, execution limits, and logging. For example, using a DSL like JSON or Python scripts, users can specify these details.
x??

---
#### Dependency Management in WMS
Dependency management is critical for WMS as it allows managing dependencies between tasks and workflows. More advanced WMSs support parallel workflow/task execution, dynamic task creation, and information passing.

:p How do more advanced WMSs manage dependencies?
??x
More advanced WMSs allow for parallel execution of workflows/tasks, dynamic task generation based on conditions, and the exchange of information between tasks. For instance, in Figure 11-4(a), tasks 3 and 4 are conditionally executed after task 2 based on a specific condition. In contrast, (b) illustrates a workflow that generates a variable number of tasks at runtime.
x??

---
#### Coordination Patterns in WMS
Coordination patterns in WMS describe how components like workflows and tasks interact with each other. Two notable patterns are the Synchronous Blocking Pattern (SBP) and the Asynchronous Non-Blocking Pattern (ANBP).

:p What are coordination patterns used for in WMS?
??x
Coordination patterns define interaction methods between workflows and tasks within a WMS. The Synchronous Blocking Pattern involves sequential task execution where each task waits for the previous one to complete, while the Asynchronous Non-Blocking Pattern allows running tasks independently and without waiting for responses.
x??

---
#### Example of SBP in WMS
The Synchronous Blocking Pattern (SBP) is used when components call each other and wait for a response. This pattern is typical in systems using HTTP and RESTful APIs.

:p Provide an example of the Synchronous Blocking Pattern in WMS?
??x
In an SBP, tasks within a workflow are executed sequentially within the same process, with each task waiting for the previous one to complete before proceeding. Here's a simple pseudocode example:
```pseudocode
function executeWorkflow(task1, task2, task3) {
    result1 = task1.execute()
    result2 = task2.execute(result1)
    result3 = task3.execute(result2)
}
```
x??

---
#### Example of ANBP in WMS
The Asynchronous Non-Blocking Pattern (ANBP) operates in a fire-and-forget mode, where components send requests or messages without waiting for responses. This can be implemented by running each workflow task independently and using a dedicated queue.

:p Provide an example of the Asynchronous Non-Blocking Pattern in WMS?
??x
In ANBP, tasks are executed independently on separate processes or machines with a dedicated task queue handling incoming messages. Here's a pseudocode example:
```pseudocode
function executeWorkflow(taskQueue) {
    task1.submitToQueue()
    task2.submitToQueue()
    // more tasks can be submitted to the queue
}
```
x??

---


---
#### Synchronous Blocking Pattern vs. Asynchronous Non-Blocking Pattern Scalability
The scalability of a Workflow Management System (WMS) is crucial for handling concurrent executions and tasks, especially in event-driven or high-volume systems. The ability to scale efficiently depends on how the WMS manages its workflows and tasks.
:p What are the key differences between synchronous blocking pattern and asynchronous non-blocking pattern in terms of scalability?
??x
The synchronous blocking pattern can become a bottleneck as it waits for each task to complete before proceeding, which limits the number of concurrent tasks that can be handled. In contrast, the asynchronous non-blocking pattern allows multiple tasks to run concurrently without waiting for others to finish, thus enhancing scalability.
```java
// Example of synchronous blocking pattern (pseudo-code)
public void processTasksSynchronously(List<Task> tasks) {
    for (Task task : tasks) {
        executeTask(task);
        // Wait for the task to complete before proceeding
    }
}
```
```java
// Example of asynchronous non-blocking pattern (pseudo-code)
public void processTasksAsynchronously(List<Task> tasks) {
    List<Future<TaskResult>> futures = new ArrayList<>();
    ExecutorService executor = Executors.newFixedThreadPool(tasks.size());
    for (Task task : tasks) {
        Future<TaskResult> future = executor.submit(task);
        futures.add(future);
    }
    // Process results without blocking
    for (Future<TaskResult> future : futures) {
        TaskResult result = future.get();
        process(result);
    }
}
```
x??

---
#### Scalability Requirements in WMSs
The scalability requirements of a WMS vary based on the nature and volume of tasks it handles. Event-driven systems, which deal with real-time events or continuous data streams, require more robust scalability to manage high volumes of concurrent tasks. In contrast, scheduled batch-oriented systems operate on predefined schedules and can process tasks in batches.
:p How do event-driven and high-volume WMSs typically differ from scheduled batch-oriented WMSs in terms of scalability requirements?
??x
Event-driven and high-volume WMSs require robust scalability capabilities to handle large volumes of tasks triggered by real-time events or continuous data streams. They need to efficiently manage a high number of concurrent executions without bottlenecks.
Scheduled batch-oriented WMSs, on the other hand, operate based on predefined schedules and process tasks in batches. Their scalability requirements are generally less stringent as they do not handle a large number of simultaneous tasks but focus on efficient processing during specific time intervals.
x??

---
#### Integration Capabilities in WMSs
A key feature of modern Workflow Management Systems is their seamless integration with other tools and technologies, particularly those that the WMS manages or coordinates. For example, cloud-based WMSs can integrate easily with cloud services running applications, making orchestration more convenient.
:p What makes a highly desired feature for WMSs in terms of integration?
??x
A highly desired feature for WMSs is their capability to seamlessly integrate with other tools and technologies, especially those that the WMS manages or coordinates. This includes being able to work smoothly with cloud services, databases, APIs, and other systems.
For instance, a cloud-based WMS can easily integrate with cloud services running applications, making orchestration more convenient as it leverages existing infrastructure without additional complexity.
x??

---


#### ETL Workflows Overview
ETL (Extract-Transform-Load) workflows are fundamental to data warehousing and involve three phases: extraction, transformation, and loading. They streamline the process of moving and transforming raw data from various sources into a target destination, typically an enterprise data warehouse.

:p What is the purpose of ETL workflows?
??x
ETL workflows facilitate the movement and transformation of raw data into a structured format that can be easily analyzed and used by decision-makers. The primary goal is to clean, integrate, and enrich data before it enters the data warehouse.
x??

---

#### Stages of ETL Workflow
The ETL workflow consists of three main stages: extraction, transformation, and loading.

:p What are the three phases involved in an ETL workflow?
??x
1. **Extraction:** Data is retrieved from one or more sources.
2. **Transformation:** Raw data undergoes processing to clean, normalize, and enrich it.
3. **Loading:** Cleaned and transformed data is stored in a target destination (data warehouse).
x??

---

#### Transformation Process
During the transformation phase, raw data undergoes various operations such as cleaning (removing duplicates, handling null values), normalization (scaling, standardization), and enrichment (adding new features).

:p What are some common transformations applied during the ETL process?
??x
Common transformations include:
- Data quality checks: Removing duplicate records, handling null or invalid values.
- Data cleaning: Dropping rows with erroneous data.
- Standardization: Ensuring consistent field formats.
- Feature engineering: Adding derived fields (e.g., calculating new metrics based on existing data).
x??

---

#### Staging Area
Raw data is initially extracted and stored in a staging area within the data lake before undergoing transformation.

:p Where is raw data first stored during an ETL process?
??x
Raw data is first stored in a staging area. This staging area acts as a buffer zone where raw, unprocessed data from various sources can be temporarily stored before it undergoes transformation.
x??

---

#### Target Destination
The transformed and cleaned data is then stored in the enterprise data warehouse.

:p Where is the final product of an ETL workflow typically stored?
??x
The final product of an ETL workflow is typically stored in the enterprise data warehouse, which serves as a central repository for decision support systems and analytics.
x??

---

#### Types of ETL Workflows
ETL workflows can vary based on complexity, requirements, and the nature of the business problems they are designed to solve.

:p How do ETL workflows differ from each other?
??x
ETL workflows can differ in terms of:
- Complexity: Some may be simple batch processes, while others might involve real-time or event-driven data streams.
- Performance Requirements: Traditional workflows are often linear and scheduled for batches, but modern requirements might necessitate parallel processing to handle larger volumes of data.
- Data Arrival Processes: Workflows need to adapt to regular batch arrivals as well as event-based single data entries.
x??

---

#### ETL Tools Overview
There is a wide variety of ETL tools available, ranging from commercial enterprise tools to open-source and cloud-based options.

:p What are some common types of ETL tools?
??x
Common ETL tools include:
- **Commercial Enterprise Tools:** IBM DataStage, Oracle Data Integrator, Talend, Informatica.
- **Open Source Tools:** Apache Airflow, Prefect, Mage, Apache Spark.
- **Cloud-Based Tools:** AWS Glue, Google Dataprep.
- **Custom Tools:** Simple job schedulers or managed services like AWS Lambda or AWS Batch.
x??

---

#### Apache Airflow
Apache Airflow is a popular open-source tool for data workflow management. It supports the definition of workflows as Python code and offers extensive features.

:p Why has Apache Airflow become so popular?
??x
Apache Airflow has gained popularity due to its comprehensive feature set, including:
- Defining workflows using Python.
- Extensive support for operators and triggers.
- Customizable plugins and flexible flow design (dynamic tasks, cross-DAG dependencies).
- SLA features, a security model, rich UI, and operational control options.
- Versatility in handling various types of workflows like data pipelines, machine learning pipelines, batch processing, reporting, etc.

Airflow supports passing data between tasks using XCOM but lacks highly reliable and scalable methods for cross-task data sharing. It primarily focuses on batch processing and does not natively support real-time or event-driven data streams.
x??

---

#### ETL Use Cases in Finance
ETL workflows are widely used in financial institutions for subscription-based data extraction, data aggregation, report generation, risk analysis, and historical data processing.

:p What are some common use cases of ETL workflows in finance?
??x
Common use cases of ETL workflows in finance include:
- **Subscription-Based Data Extraction:** Automating the retrieval of subscription-based data from financial data vendors.
- **Data Aggregation:** Consolidating various types of data from multiple sources into a single repository (data warehouse).
- **Report Generation:** Automating the generation of risk and analytical reports for internal use, dashboarding systems, and compliance.
- **Historical Data Analysis:** Analyzing historical data for research purposes, financial analysis, risk calculations, portfolio reconciliation, and performance tracking.
x??

---

