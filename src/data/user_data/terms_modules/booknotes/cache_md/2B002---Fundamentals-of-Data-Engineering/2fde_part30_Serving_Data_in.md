# High-Quality Flashcards: 2B002---Fundamentals-of-Data-Engineering_processed (Part 30)


**Starting Chapter:** Serving Data in Notebooks

---


#### Federated Queries
Background context: Federated queries allow users to perform analysis on data stored across multiple sources without physically moving the data. This is particularly useful when you need to blend data from various systems for ad hoc analyses or when source data needs tight control.

Federated queries can be ideal in scenarios where setting up complex ETL processes might not be necessary, and flexibility in querying different datasets is required.

:p What are federated queries used for?
??x
Federated queries are used to perform analysis on data stored across multiple sources without moving the data. They provide a way to blend data from various systems for ad hoc analyses and ensure that source data remains tightly controlled.
x??

---

#### Data Sharing in Cloud Environments
Background context: Data sharing through massively multitenant storage systems in cloud environments allows organizations to serve data securely and control access. This is especially useful when serving data internally within an organization, providing public data access, or sharing with partner businesses.

:p How does data sharing work in a cloud environment?
??x
Data sharing works by allowing consumers (analysts and data scientists) to query data hosted on storage systems without the engineers who source the data needing to handle actual queries. This is facilitated through secure mechanisms that control access and ensure compliance.
x??

---

#### Metrics Layer Tools
Background context: A metrics layer maintains and computes business logic, ensuring quality in analytics. Tools like Looker and dbt help define standard metrics and reference them in downstream queries.

:p What are metrics layer tools?
??x
Metrics layer tools maintain and compute business logic. They help ensure the quality of data used for analytics by defining and maintaining standard metrics across multiple queries. Examples include Looker and dbt.
x??

---

#### Serving Data in Notebooks
Background context: Data scientists often use notebooks to explore data, engineer features, or train models. These notebooks can access data from various sources like APIs, databases, data warehouses, or data lakes.

:p How do data scientists access data in Jupyter notebooks?
??x
Data scientists programmatically connect to a data source using appropriate libraries (e.g., pandas for Python) within Jupyter notebooks. They load files, connect to API endpoints, or make ODBC connections to databases.
x??

---

#### Credential Handling
Background context: Incorrectly handled credentials pose significant security risks in data science projects. Credentials should never be embedded in code but managed through credential managers or CLI tools.

:p How can data engineers help manage credentials?
??x
Data engineers can set standards for handling credentials, ensuring they are not embedded in code and using secure methods like credential managers or CLI tools to handle access.
x??

---


#### Handling Large Datasets Beyond Local Memory
Background context: When working with datasets that exceed the available memory on a local machine, data scientists face significant limitations. This can lead to performance bottlenecks and computational inefficiencies. To address this issue, various scalable options are available.

:p What is one solution when your dataset exceeds local machine memory?
??x
One solution is to move to a cloud-based notebook where the underlying storage and memory for the notebook can be flexibly scaled.
x??

---
#### Distributed Execution Systems
Background context: As datasets grow beyond what can be managed on a single machine, distributed execution systems such as Dask, Ray, and Spark become essential tools. These systems allow for parallel processing across multiple machines.

:p What are some popular Python-based options for handling large-scale data processing?
??x
Popular Python-based options for handling large-scale data processing include Dask, Ray, and Apache Spark.
x??

---
#### Cloud-Based Data Science Workflows
Background context: For projects that outgrow cloud notebooks, setting up a full-fledged cloud-managed offering using services like Amazon SageMaker, Google Cloud Vertex AI, or Microsoft Azure Machine Learning becomes necessary. These platforms provide scalable environments for data science workflows.

:p What are some advantages of using cloud-based ML workflow options like Amazon SageMaker?
??x
Some advantages include access to powerful computing resources, automatic scaling capabilities, and the ability to manage larger datasets efficiently without local hardware constraints.
x??

---
#### Data Science Ops (DSOps)
Background context: As data science operations become more complex, DSOps becomes crucial. It involves managing versions, updates, access control, and maintaining service level agreements (SLAs) in cloud environments.

:p What is the role of a data engineer or ML engineer in facilitating scalable cloud infrastructure?
??x
Data engineers and ML engineers play a key role by setting up cloud infrastructure, overseeing environment management, and training data scientists on cloud-based tools. They are responsible for operational tasks such as managing versions, updates, access control, and maintaining SLAs.
x??

---
#### Reverse ETL (Bidirectional Load and Transform)
Background context: Reverse ETL involves loading processed data back into source systems from OLAP databases, enhancing data accessibility and reducing friction for end-users.

:p How does reverse ETL benefit the sales team in a lead scoring model scenario?
??x
Reverse ETL benefits the sales team by loading scored leads directly back into their CRM system. This ensures that the sales team has immediate access to relevant information without needing to rely on separate dashboards or Excel files.
x??

---
#### Implementation of Reverse ETL
Background context: To implement reverse ETL, you can use off-the-shelf solutions or roll your own. Open-source and commercial managed services are available.

:p What is the main challenge in implementing reverse ETL?
??x
The main challenge is selecting a robust solution from the rapidly changing landscape of reverse ETL products.
x??

---
#### Conclusion on Reverse ETL
Background context: The term "reverse ETL" might change, but the practice of loading data back into source systems remains important.

:p Why should you consider using reverse ETL for serving data in your organization?
??x
You should consider reverse ETL to reduce friction with end-users and ensure that processed data is readily available where it’s needed most.
x??

---


#### Data Health and Downtime
Data health is crucial for ensuring that data is available, accurate, and up-to-date. It includes monitoring for data downtime to minimize disruptions. A common metric used here might be Mean Time Between Failures (MTBF) or Mean Time To Repair (MTTR).
:p What does the concept of "data health" encompass in relation to DataOps?
??x
Data health involves ensuring that your data is available, accurate, and up-to-date. It includes monitoring for data downtime to minimize disruptions. Key metrics might include MTBF (Mean Time Between Failures) or MTTR (Mean Time To Repair), which help measure the reliability and recoverability of your data systems.
x??

---
#### Latency in Data Systems
Latency refers to the delay between when a request is made and when the response is received from a system. In the context of dashboards, databases, etc., it can significantly impact user experience. Minimizing latency requires optimizing query performance and network efficiency.
:p What does latency measure in data systems?
??x
Latency measures the delay between when a request is made and when the response is received from a system. It impacts the responsiveness of applications such as dashboards and databases, where users expect quick results. Optimizing query performance and network efficiency can help reduce latency.
x??

---
#### Data Quality
Ensuring data quality involves maintaining accurate, complete, consistent, and relevant information across all stages of the data lifecycle. Tools like data observability aim to monitor and improve data quality, often extending beyond traditional data management systems into machine learning models.
:p What is a key aspect of ensuring "data quality" in DataOps?
??x
Ensuring data quality involves maintaining accurate, complete, consistent, and relevant information across all stages of the data lifecycle. Tools like data observability help monitor and improve data quality, often extending beyond traditional data management systems into machine learning models to ensure that data is reliable for both analytical and predictive uses.
x??

---
#### Data and System Security
Security measures are essential to protect sensitive data from unauthorized access or breaches. This includes securing databases, implementing role-based access controls (RBAC), and ensuring secure connections between different systems.
:p What aspects of security should be considered in DataOps?
??x
In DataOps, security involves protecting sensitive data from unauthorized access or breaches. Key considerations include securing databases, implementing role-based access controls (RBAC), and ensuring secure connections between different systems to prevent data leaks or tampering.
x??

---
#### Data and Model Versions
Tracking versions of data and models is crucial for maintaining a consistent and traceable lineage. This helps in understanding changes over time and ensures that the correct version of the data is being used at any given point.
:p How do you manage "data and model versions" in DataOps?
??x
Managing data and model versions involves tracking different iterations to maintain a consistent and traceable lineage. This helps understand changes over time and ensures using the correct version of the data or models. Tools can automate this process, allowing teams to version control their datasets and models.
x??

---
#### Uptime for Service-Level Objectives (SLO)
Uptime is critical for meeting service-level objectives (SLOs). Ensuring high availability helps in maintaining consistent performance and reliability, reducing downtime that could impact users or business operations.
:p What does "uptime" mean in the context of achieving SLO?
??x
In the context of achieving Service-Level Objectives (SLO), uptime refers to the percentage of time a system is operational without interruption. Ensuring high availability helps maintain consistent performance and reliability, reducing downtime that could impact users or business operations.
x??

---
#### Data Observability Tools
Data observability tools aim to minimize data downtime by providing comprehensive monitoring capabilities. These tools can extend their scope into machine learning models to support end-to-end visibility of the data pipeline.
:p What are "data observability" tools used for?
??x
Data observability tools aim to minimize data downtime by providing comprehensive monitoring and alerting mechanisms, ensuring that issues are detected early. They can monitor not just data pipelines but extend their scope into machine learning models to support end-to-end visibility of the data pipeline.
x??

---
#### DevOps Monitoring in DataOps
DevOps monitoring is crucial for maintaining stable connections among storage, transformation, and serving systems. Tools like Prometheus or Grafana help in setting up continuous monitoring and alerting mechanisms.
:p How does DevOps monitoring apply to DataOps?
??x
In DataOps, DevOps monitoring ensures stable connections among storage, transformation, and serving systems. Tools like Prometheus or Grafana are used to set up continuous monitoring and alerting mechanisms to detect and resolve issues promptly.
x??

---
#### Version Control and Deployment in Data Engineering
Version control and deployment processes for analytical code, data logic code, ML scripts, and orchestration jobs should be managed through multiple stages (dev, test, prod) to ensure that the right version is deployed at the right time. This helps in maintaining consistency and traceability.
:p What are the key steps in "version-control code and operationalize deployment" in DataOps?
??x
In DataOps, version control and deployment processes for analytical code, data logic code, ML scripts, and orchestration jobs should be managed through multiple stages (dev, test, prod). This ensures that the right version is deployed at the right time, maintaining consistency and traceability. Tools like Git or Jenkins can help in managing these deployments.
x??

---
#### Data Architecture for Serving
Serving data requires the same architectural considerations as other stages of the data engineering lifecycle. Feedback loops must be fast and tight to ensure users access needed data quickly when required.
:p What are key architectural considerations for "data serving"?
??x
For data serving, key architectural considerations include ensuring feedback loops are fast and tight so that users can access needed data quickly when required. The architecture should support high availability and scalability to meet demand efficiently.
x??

---

