# High-Quality Flashcards: 2B004-Data-Governance_processed (Part 5)


**Starting Chapter:** Chapter 4. Data Governance over a Data Life Cycle

---


#### Tool Sufficiency Issues
Background context: The text discusses situations where governance/data management tools are not sufficient on their own, meaning they lack comprehensive functionality desired by companies. This leads to issues such as unauthorized data access and misuse, non-compliance with established processes, and a general gap in meeting governance standards.

:p Describe the scenario where company tools are insufficient for effective data governance.
??x
In this scenario, while some tools exist, they fall short of providing all necessary functionality for comprehensive data governance. As a result, there can be instances of people accessing or using data improperly (intentionally or unintentionally), and processes not being followed, leading to non-compliance issues.

---
#### Unauthorized Data Access
Background context: The text highlights the problem of employees accessing data they should not have, which is a significant issue in data governance. This can happen due to lack of proper access controls or simply because individuals are unaware of the correct procedures.

:p Explain how unauthorized data access occurs and its consequences.
??x
Unauthorized data access typically happens when users gain access to sensitive information beyond their designated roles or permissions. Consequences include potential breaches of privacy, regulatory non-compliance, and increased risk of data misuse. This issue can stem from both intentional actions (e.g., malicious insiders) and unintentional mistakes (e.g., employees using data in ways not intended by the company).

---
#### Non-Compliance with Processes
Background context: The text points out that even when processes are established, people may not follow them due to various reasons. This results in a gap between what is expected and actual behavior.

:p Describe how non-compliance with processes can arise.
??x
Non-compliance with processes often occurs because of several factors: lack of awareness or understanding of the procedures, personal judgment overriding formal guidelines, or resistance to change. For example, employees might bypass established data handling protocols out of convenience or urgency, leading to breaches in governance standards.

---
#### Educating People on Governance
Background context: The text suggests that educating people on proper behavior is sometimes seen as a solution when tools and processes are already in place but not fully effective. However, education alone may be insufficient for ensuring compliance.

:p Explain the limitations of relying solely on education to enforce data governance.
??x
While educating employees about the importance of following data governance practices is essential, it cannot replace robust tools and well-defined processes. Simply telling people what to do does not guarantee adherence, especially if they have no means or incentives to follow through with those instructions.

---
#### Data Culture Importance
Background context: The text emphasizes that a collective data culture encompassing tools, people, and processes is crucial for effective data governance. This holistic approach ensures that all aspects of the strategy are integrated and work together seamlessly.

:p Explain why a collective data culture is important for data governance.
??x
A collective data culture is vital because it integrates tools, people, and processes into a cohesive framework. This approach ensures that everyone in the organization understands their role and responsibilities related to data governance. Tools help automate certain tasks, people provide the necessary expertise and oversight, and well-defined processes ensure consistent application of best practices.

---
#### Implementation of Data Governance
Background context: The text outlines that data governance is not just about implementing tools but also involves understanding how data should be handled from the start, continuously reclassifying it, and defining roles for those who manage this process. This holistic view is necessary to create a successful data governance program.

:p Describe the key elements of a successful data governance implementation.
??x
A successful data governance implementation includes:
- Robust tools for managing data.
- Skilled personnel responsible for data management tasks.
- Defined processes that outline how data should be handled and classified.
- Ongoing reclassification and recategorization to keep up with changing needs.
- A culture that promotes the use of these elements in a coordinated manner.

---
#### Summary of People and Processes
Background context: The text summarises multiple considerations for people and processes in data governance, highlighting that a successful program requires more than just tools. It involves understanding how data should be thought about and handled throughout its lifecycle.

:p Summarize the key points discussed regarding people and processes in data governance.
??x
The key points include:
- Tools are necessary but not sufficient; they need to be accompanied by well-defined processes and informed personnel.
- Unauthorized access, non-compliance with processes, and gaps in meeting standards can arise when only one or two elements of the strategy are present.
- Educating people alone is insufficient without comprehensive tools and procedures.
- A collective data culture that integrates tools, people, and processes ensures effective governance.

x??


#### What is a Data Life Cycle?

Data life cycle management involves understanding and managing data from its initial creation to eventual archival or deletion. The concept varies across different authors and organizations, but generally includes stages that data goes through.

Background context: The definition of a data life cycle can vary widely, making it complex. It typically covers the stages from generation or capture to archiving or deletion. This involves understanding how data is handled at each stage to ensure its effective use and governance.
:p What defines a data life cycle?
??x
A data life cycle describes the order of stages that data goes through from initial creation or capture to eventual archival or deletion. Each phase has distinct characteristics, and the way governance is applied varies depending on these phases.

---

#### Data Creation Phase

Data can be generated from multiple sources in various formats (structured/unstructured) at different frequencies (batch/stream). This phase includes capturing metadata about the data as well.

Background context: Data creation involves generating new data or funneling existing data into a system. Metadata is crucial for understanding and managing this process.
:p What are the key characteristics of the data creation phase?
??x
The key characteristics of the data creation phase include:
- Generation of data from multiple sources in various formats (structured/unstructured).
- Data can be generated at different frequencies (batch/stream).
- Capture of metadata about the data, which is important for governance and management.
x??

---

#### Types of Data Acquisition

Data can be acquired from third-party organizations, manually entered by humans or devices, or captured from IoT sensors.

Background context: Different methods of acquiring data present unique challenges. Understanding these methods helps in formulating effective governance strategies.
:p What are the three main ways data is created?
??x
The three main ways data is created are:
1. Data acquisition - when an organization acquires data produced by a third-party organization.
2. Data entry - when new data is manually entered by humans or devices within the organization.
3. Data capture - when data generated by various devices in an organization, such as IoT sensors, is captured.

These methods offer significant governance challenges that need to be addressed.
x??

---

#### Governance Considerations for Data Creation

Different checks and balances are needed depending on how data is acquired from outside the organization. Contracts, agreements, and access controls must be considered.

Background context: The process of acquiring external data involves various legal and organizational considerations that impact governance strategies.
:p What challenges does data acquisition pose for governance?
??x
Data acquisition poses significant governance challenges such as:
- Understanding contracts and agreements outlining how the enterprise is allowed to use this data and for what purposes.
- Determining who can access specific data, which may be limited.

These factors require careful consideration when designing a governance strategy.
x??

---

#### Transactional vs Analytical Data

Transactional systems are optimized for day-to-day operations, while analytical systems handle historical data from various sources for analysis.

Background context: Understanding the difference between transactional and analytical data helps in managing their respective life cycles effectively.
:p What is the difference between transactional and analytical systems?
??x
The key differences between transactional and analytical systems are:
- **Transactional Systems**: Optimized for running day-to-day transactional operations, allowing high concurrency and a variety of transaction types. They do not focus on analytics.

- **Analytical Systems**: Optimized for running analytical processes, storing historical data from various sources (CRM, IoT sensors, logs, transactional data) to support data analysis, queries, and reports.
x??

---

#### Phases of the Data Life Cycle

The data life cycle phases are creation/capture, storage, usage, archiving, and deletion.

Background context: Each phase has distinct characteristics that impact governance. Proper management across these phases ensures effective use and protection of data.
:p What phases does the data life cycle typically include?
??x
The typical phases of the data life cycle include:
- **Creation/Capture**: Data is generated or captured from various sources.
- **Storage**: Data is stored in a platform or storage system.
- **Usage**: Data is analyzed, visualized, and used for decision-making.
- **Archiving**: Data is archived for long-term storage.
- **Deletion**: Data is deleted at the end of its useful life.

Each phase has distinct characteristics that require specific governance measures.
x??

---

#### Importance of Data Governance

Proper oversight throughout the data life cycle optimizes data usefulness and minimizes errors. Effective data governance is essential for businesses to leverage data effectively.

Background context: Ensuring proper oversight from creation to deletion helps in optimizing data's value while minimizing risks. This is critical for businesses that rely on data-driven decisions.
:p Why is data governance important?
??x
Data governance is crucial because it:
- Optimizes the usefulness of data by ensuring its integrity, security, and accessibility.
- Minimizes potential errors through consistent management practices.
- Enables businesses to make informed decisions based on accurate and reliable data.

Effective data governance ensures that data is managed consistently across all life cycle phases.
x??

---


#### Data Processing
Data processing involves capturing data and preparing it for storage and eventual analysis through integration, cleaning, scrubbing, or ETL processes. This phase is crucial for ensuring that data meets quality standards before further use.

:p What are the governance implications during the data processing phase?
??x

During this phase, key governance considerations include tracking data lineage, maintaining data quality, and classifying sensitive information to ensure it doesn’t fall into unauthorized hands. Encryption of data both in transit and at rest is also essential.
x??

---

#### Data Lineage Tracking
Data lineage tracking helps trace the origin and transformation history of data throughout its lifecycle, ensuring transparency and accountability.

:p How do you track data lineage during processing?
??x

To track data lineage, implement metadata management tools that capture where data comes from (source systems), how it changes as it moves through different stages (ETL processes), and where it ends up (target systems). This involves creating a detailed audit trail of data transformations.
```java
// Example pseudocode for logging data transformation steps
public class DataTransformer {
    private List<String> logs;

    public void transformData(String source, String destination) {
        logs.add("Transformed from: " + source);
        // Perform ETL operations here...
        logs.add("Transformed to: " + destination);
    }

    public List<String> getLogs() {
        return logs;
    }
}
```
x??

---

#### Data Quality Checking
Data quality checking ensures that data is accurate, complete, consistent, and valid before it is stored or used for analysis.

:p Why is data quality checking important?
??x

Data quality checking is critical because poor-quality data can lead to incorrect insights, flawed business decisions, and wasted resources. It involves validating data against predefined standards and cleaning it as necessary.
```java
// Example pseudocode for basic data validation
public class DataValidator {
    public boolean isValid(String value) {
        if (value == null || value.isEmpty()) return false;
        // Add more validation rules here...
        return true;
    }
}
```
x??

---

#### Data Classification
Data classification involves categorizing and labeling data based on its sensitivity and the level of protection required.

:p How do you manage sensitive information?
??x

Managing sensitive information requires implementing strict access controls, encryption techniques, and regular audits. Identify sensitive data types (e.g., PII, financial data) and apply appropriate security measures to protect them.
```java
// Example pseudocode for classifying data based on sensitivity
public enum DataSensitivity {
    PUBLIC,
    CONFIDENTIAL,
    RESTRICTED
}

public class DataClassifier {
    public static DataSensitivity getClassification(String data) {
        if (data.contains("PII")) return DataSensitivity.RESTRICTED;
        // Add more conditions here...
        return DataSensitivity.PUBLIC;
    }
}
```
x??

---

#### Data Storage
Data storage involves storing both data and metadata on appropriate systems with adequate protection measures.

:p What are the key aspects of data storage?
??x

Key aspects include choosing the right storage system (data warehouse, data mart, or data lake), encrypting data at rest to protect it from intrusions, backing up data for redundancy, and ensuring proper access controls. This phase is crucial in maintaining the integrity and availability of stored data.
```java
// Example pseudocode for storing and protecting data
public class DataStorage {
    public void storeData(String data, String dataType) {
        if (dataType.equals("sensitive")) {
            // Encrypt data before storage
            encryptData(data);
        }
        // Store data in the appropriate system
        saveToStorageSystem(data);
    }

    private void encryptData(String data) {
        // Encryption logic here...
    }

    private void saveToStorageSystem(String data) {
        // Storage system interaction code here...
    }
}
```
x??

---

#### Data Usage
The data usage phase involves analyzing and visualizing data to support business operations and decision-making.

:p How does data become useful in the usage phase?
??x

Data becomes useful when it is analyzed, visualized, or queried via user interfaces or BI tools. This phase ensures that data can be used to derive meaningful insights and support informed business decisions.
```java
// Example pseudocode for querying and visualizing data
public class DataAnalyzer {
    public void analyzeAndVisualize(String query) {
        // Execute the query on the storage system
        ResultSet resultSet = executeQuery(query);
        // Process results and generate a visualization
        generateVisualization(resultSet);
    }

    private ResultSet executeQuery(String query) {
        // Code to interact with the data storage system
    }

    private void generateVisualization(ResultSet resultSet) {
        // Code to create visual representations of the data
    }
}
```
x??

---

