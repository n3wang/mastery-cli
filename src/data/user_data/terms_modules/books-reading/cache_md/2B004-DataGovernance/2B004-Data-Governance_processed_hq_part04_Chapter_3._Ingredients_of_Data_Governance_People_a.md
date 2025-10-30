# High-Quality Flashcards: 2B004-Data-Governance_processed (Part 4)

**Rating threshold:** >= 8/10

**Starting Chapter:** Chapter 3. Ingredients of Data Governance People and Processes. User Hats Defined

---

**Rating: 8/10**

#### Data Ownership and Technical Expertise
Background context: The passage discusses how data ownership responsibilities are often held by individuals with technical expertise rather than strictly business-oriented roles. These duties include ideation, creation, monitoring, and maintenance of the data architecture.

:p Who typically owns the data in practical scenarios?
??x
In practical scenarios, data ownership tasks, including ideation, creation, monitoring, and maintenance of the company's data architecture, are often performed by individuals with technical expertise, such as engineers.
x??

---

#### Data Stewardship and Manual Tasks
Background context: The role of a data steward is crucial for defining and labeling data to enable governance. However, this task is highly manual and time-consuming, leading to incomplete or non-existent categorization in many organizations.

:p What are the key challenges associated with the role of a data steward?
??x
The key challenges associated with the role of a data steward include its high level of manual labor and extreme time consumption. Due to these factors, full data categorization/classification is often not done well or at all.
x??

---

#### Conflation of Data Owner and Data Steward Roles
Background context: In practice, the distinction between data owners and data stewards can be blurred, with technical experts often handling both roles.

:p How are the roles of data owner and data steward typically conflated in practice?
??x
In practice, the roles of data owner and data steward are often conflated. Technical experts who have a background in engineering tend to handle both ideation/creation of data architecture and categorization/classification duties.
x??

---

#### Privacy Tsar's Governance Strategy
Background context: The privacy tsar is responsible for laying out processes and strategies that the data owner must implement, such as physically implementing these processes or creating data architecture.

:p What are the responsibilities of a data owner in relation to the privacy tsar’s strategy?
??x
A data owner is responsible for physically implementing the processes and/or strategies laid out by the privacy tsar. This includes ideation and creation of the data architecture, choosing and implementing tooling, and monitoring and maintaining the data pipeline and storage.
x??

---

#### Exposure Notification Technology
Background context: The text provides an excerpt from the Google/Apple guide to exposure notification technology, which is relevant in managing privacy while sharing crucial health information.

:p What is the purpose of the Google/Apple guide on exposure notification technology?
??x
The purpose of the Google/Apple guide on exposure notification technology is to share information about how privacy can be maintained when notifying individuals that they have been near a positively diagnosed individual, without revealing specific identifying information.
x??

---

#### Data Governance Roles and Processes
Background context: The text discusses different roles in data governance such as data owner and steward. It highlights the challenges of implementing these roles due to their manual nature.

:p Why is full data categorization/classification often not done well or at all?
??x
Full data categorization/classification is often not done well or at all because the task is highly manual, time-consuming, and there are rarely dedicated individuals to perform it. This leads to incomplete governance.
x??

---

**Rating: 8/10**

#### Complexity of Data Governance
Background context explaining the complexity involved when dealing with disparate data storage systems, different data definitions and catalogs. The process becomes almost impossible due to the sheer volume and variability of data.

:p What is the main issue discussed regarding data governance?
??x
The main issue discussed involves the complexity and difficulty in managing data across various storage systems with differing definitions and catalogs. This complexity makes it nearly impossible for companies, leading them to rely on a few tools and half-strategies while hoping that educating employees will be enough.

---
#### Access Controls Evolution
Background context explaining how access controls have evolved from simple permissions to more nuanced policies based on user intent and varying levels of data sensitivity.

:p How has the complexity of user access control changed over time?
??x
Access controls have become significantly more complex due to the increasing number of users who may need to interact with data in various ways. Historically, access was straightforward—simple permissions were assigned to specific roles or individuals. However, today's data-driven businesses require a more nuanced approach that considers different tasks and varying levels of access and security privileges.

---
#### Regulation Compliance
Background context explaining the challenges companies face when dealing with regulations like GDPR and CCPA, especially for those who have not previously had such regulatory requirements.

:p What is one major challenge companies face in complying with new data protection regulations?
??x
One major challenge is ensuring compliance with regulations like GDPR and CCPA, which require detailed data management practices. Companies that did not previously need to comply with strict regulations may struggle due to a lack of established processes and infrastructure. For example, the "right to be forgotten" in GDPR necessitates the ability to find and delete all permutations of an individual's data across various systems.

---
#### Case Study: Gaming of Metrics
Background context explaining the case study about Washington, DC’s school system and how metrics can influence human behavior negatively if not designed carefully.

:p What is a key lesson from the Washington, DC school system case study?
??x
A key lesson is that when introducing new metrics or systems, it's crucial to consider the human response. The IMPACT ranking system was intended to promote "good" teachers and improve education but failed due to poorly designed metrics that led to negative gaming behaviors among educators.

---
#### Data Findability and Governance
Background context explaining the importance of data findability in both analysis and compliance with regulations like GDPR, where finding specific data is critical.

:p Why is data findability important for data governance?
??x
Data findability is crucial because it supports both analytical purposes—finding the right data to analyze—and regulatory requirements—such as deleting all permutations of an individual's data. This dual-purpose nature underscores why robust data management and findability practices are essential in modern organizations.

---
#### Varying Levels of Access Control
Background context explaining the different levels of access control, from plain text to hashed or aggregated data, and how user intent affects permissions.

:p How does user intent influence access controls?
??x
User intent significantly influences access controls. For instance, a shipping address may be accessible for fulfillment purposes but restricted for marketing if the customer has opted out of promotional emails. This requires dynamic access policies that consider not just who can access data but also why they need it and how it will be used.

---
#### Summary of Concepts
Background context summarizing key points about data governance, access controls, regulation compliance, findability, and user intent.

:p What are the main challenges in modern data governance?
??x
The main challenges include the complexity of managing disparate data systems, evolving access control needs, regulatory compliance for new types of data (like GDPR), ensuring data findability, and accounting for user intent in permissions. These factors make comprehensive data governance difficult but essential for organizations today.

x??
---

**Rating: 8/10**

#### On-Premises vs. Cloud Data Strategy
Background context: This concept discusses strategies for managing data, specifically differentiating between on-premises and cloud environments. The focus is on how curating data before moving it to a public cloud or keeping sensitive information within an organization can impact security, governance, and analytics capabilities.

:p What are the key differences in handling curated versus uncurated datasets when considering on-premises storage compared to public clouds?
??x
The primary differences lie in the level of protection against leaks or unauthorized access. On-premises, if sensitive data is leaked, it can only be accessed by internal employees due to physical security and network controls. In contrast, cloud storage increases the risk since sensitive data could be accessed by anyone if compromised.

For example:
- On-premises: If you have a dataset with credit card numbers and customer names, attaching metadata such as "credit card number" or "customer name" helps in applying governance controls (encryption, hashing) to protect against leaks.
- Cloud: The same data might be exposed if not properly secured.

??x
The answer with detailed explanations:
On-premises storage provides a layer of security due to physical and network controls. This means that even if the data is leaked, it can only be accessed by those within the organization's premises. However, in the public cloud, sensitive data could be exposed to anyone who gains unauthorized access.

For example, consider a dataset with credit card numbers and customer names:
- On-premises: You would enrich this data before moving it to ensure that fields are labeled correctly (e.g., "credit card number", "customer name"). This allows for proper governance controls like encryption and hashing.
- Cloud: Without such measures, the same data could be exposed if a public cloud is hacked.

```java
public class DataEnrichmentExample {
    // Method to enrich data with metadata before moving it to the cloud or on-premises storage
    private void enrichData(String[] rawData) {
        String[] enrichedData = new String[rawData.length];
        
        for (int i = 0; i < rawData.length; i++) {
            if (isValidCreditCardNumber(rawData[i])) {
                enrichedData[i] = "credit card number: " + rawData[i];
            } else if (isCustomerName(rawData[i])) {
                enrichedData[i] = "customer name: " + rawData[i];
            } else {
                enrichedData[i] = rawData[i];
            }
        }
        
        // Apply governance controls
        for (int i = 0; i < enrichedData.length; i++) {
            if (enrichedData[i].contains("credit card number")) {
                encrypt(enrichedData[i]);
            } else if (enrichedData[i].contains("customer name")) {
                hash(enrichedData[i]);
            }
        }
    }

    private boolean isValidCreditCardNumber(String data) {
        // Logic to validate credit card numbers
        return true;
    }

    private boolean isCustomerName(String data) {
        // Logic to identify customer names
        return true;
    }

    private void encrypt(String data) {
        // Encryption logic
    }

    private void hash(String data) {
        // Hashing logic
    }
}
```
x?

---

#### Segregated vs. Layered Data Strategy in the Cloud
Background context: This concept focuses on managing sensitive data within a cloud environment by segregating it into different layers or zones, each with varying levels of access control.

:p What is the main difference between segregated and layered data strategies when implementing them in the cloud?
??x
The key difference lies in how data is managed and accessed. Segregated strategy involves keeping curated and uncurated datasets in separate environments (on-premises vs. public clouds), whereas a layered approach keeps both types within the same cloud but controls access through different zones.

For example:
- Segregated: Curated, cleaned data on top tier; uncurated raw data at bottom.
- Layered: Curated and cleaned data in uppermost layer; unstructured, uncurated data below.

??x
The answer with detailed explanations:
In a segregated approach, curated and uncategorized datasets are stored separately—on-premises for sensitive information and in the public cloud for non-sensitive or less critical data. This keeps security high but complicates cross-storage analytics due to separation.
In contrast, a layered strategy maintains both types of data within the same cloud environment but enforces access controls through different zones, balancing accessibility with security.

For example:
- Insights zone: Contains known, enriched, and curated data with governance controls like encryption, hashing. High-level access for most analysts.
- Staging zone: Holds more structured data from multiple sources that are being prepared for insights analysis. Moderate access for data engineers.
- Raw zone: Stores any type of unstructured or uncategorized data, including videos or text files. Restricted access.

```java
public class CloudDataLayeringExample {
    // Method to represent different layers in a cloud environment
    public void manageLayers(String[] rawData) {
        String insightsZone = enrichAndSecure(rawData);
        String stagingZone = prepareForInsights(insightsZone);
        String rawZone = storeRaw(insightsZone, stagingZone);
        
        // Manage access control for each layer
        manageAccessControl(insightsZone, "high");
        manageAccessControl(stagingZone, "moderate");
        manageAccessControl(rawZone, "restricted");
    }

    private String enrichAndSecure(String[] rawData) {
        // Enrich data with metadata and apply governance controls
        return processData(rawData);
    }

    private String prepareForInsights(String insightsZone) {
        // Prepare data for analysis by cleaning and structuring
        return cleanData(insightsZone);
    }

    private String storeRaw(String insightsZone, String stagingZone) {
        // Store raw data separately from curated and structured data
        return insightsZone + " - " + stagingZone;
    }

    private void manageAccessControl(String layer, String level) {
        // Implement access control for each layer based on the defined security levels
        if (level.equals("high")) {
            allowFullAccess(layer);
        } else if (level.equals("moderate")) {
            allowPartialAccess(layer);
        } else if (level.equals("restricted")) {
            restrictAccess(layer);
        }
    }

    private void allowFullAccess(String layer) {
        // Code to grant full access
    }

    private void allowPartialAccess(String layer) {
        // Code to grant partial access
    }

    private void restrictAccess(String layer) {
        // Code to restrict access
    }
}
```
x?

---

#### Cross-Storage Analytics Challenges
Background context: This concept highlights the difficulties in performing cross-storage analytics when data is segregated across on-premises and public cloud environments. It emphasizes the importance of being able to run powerful analytics, which can be hindered by this separation.

:p Why might cross-storage analytics be difficult or impossible if data is stored separately between on-premises and cloud environments?
??x
The challenge arises because running comprehensive analytics requires seamless access to all relevant data, regardless of where it resides. If data is segregated—some on premises and some in the public cloud—analyzing this data holistically becomes complex due to differing security protocols, network latency, and data transfer requirements.

For example:
- On-premises data might be highly governed with strict access controls.
- Cloud data could have less restrictive access but require adherence to different policies and regulations.

??x
The answer with detailed explanations:
Cross-storage analytics can be challenging or even impossible when data is stored separately between on-premises and public cloud environments. This separation creates a barrier for analysts who need seamless, end-to-end visibility into the entire dataset.

For example, consider an organization that needs to analyze customer behavior across both physical locations and online interactions:
- On-premises: Data might be highly governed with strict access controls.
- Cloud: The same data could have less restrictive access but still require adherence to different policies and regulations.

To perform cross-storage analytics effectively, the system would need to bridge these environments while ensuring security and compliance. This often requires robust data integration, middleware solutions, or custom-built connectors that can handle data transfers between the two environments efficiently.

```java
public class CrossStorageAnalyticsExample {
    // Method to represent a scenario where cross-storage analytics is needed
    public void performCrossStorageAnalysis() {
        String onPremisesData = fetchDataFromOnPremises();
        String cloudData = fetchDataFromCloud();
        
        // Analyze data from both environments
        analyzeData(onPremisesData, cloudData);
    }

    private String fetchDataFromOnPremises() {
        // Code to fetch data from on-premises environment
        return "on-premises data";
    }

    private String fetchDataFromCloud() {
        // Code to fetch data from public cloud environment
        return "cloud data";
    }

    private void analyzeData(String onPremisesData, String cloudData) {
        // Code to perform analytics across both environments
        System.out.println("Analyzing: " + onPremisesData);
        System.out.println("Analyzing: " + cloudData);
    }
}
```
x?

---

#### Access Control and Governance in Cloud Environments
Background context: This concept discusses the implementation of access controls and governance measures within cloud storage environments, particularly focusing on different zones or layers with varying degrees of access.

:p How do companies typically implement access control and governance in cloud environments using different zones?
??x
Companies often implement a tiered approach where data is stored in multiple layers or zones, each with its own set of access controls. This ensures that sensitive data remains protected while allowing necessary users to access the required information for their roles.

For example:
- Insights zone: High-level access for most data analysts and scientists.
- Staging zone: Moderate access for data engineers responsible for preparing datasets.
- Raw zone: Very restricted access for storage of unstructured or uncategorized data.

??x
The answer with detailed explanations:
Companies typically implement a tiered approach to access control and governance in cloud environments using different zones. Each zone has its own set of rules and controls, ensuring that sensitive data is protected while still allowing necessary users to perform their roles.

For example:
- Insights Zone: Contains known, enriched, and curated data with high-level access controls like encryption, hashing, etc.
- Staging Zone: Holds more structured data from multiple sources that are being prepared for insights analysis. Moderate access for data engineers.
- Raw Zone: Stores any type of unstructured or uncategorized data, including videos or text files. Restricted access.

To manage these zones effectively, companies need to implement robust access controls and governance policies:

```java
public class AccessControlExample {
    // Method to represent different access control levels in a cloud environment
    public void manageAccessControl() {
        String insightsZone = manageInsightsZone();
        String stagingZone = manageStagingZone();
        String rawZone = manageRawZone();
        
        // Assign appropriate roles and permissions for each zone
        assignRoles(insightsZone, "high");
        assignRoles(stagingZone, "moderate");
        assignRoles(rawZone, "restricted");
    }

    private String manageInsightsZone() {
        // Code to manage access control in the insights zone
        return "insights data";
    }

    private String manageStagingZone() {
        // Code to manage access control in the staging zone
        return "staging data";
    }

    private String manageRawZone() {
        // Code to manage access control in the raw zone
        return "raw data";
    }

    private void assignRoles(String zone, String level) {
        // Code to assign roles and permissions based on the defined security levels
        if (level.equals("high")) {
            allowFullAccess(zone);
        } else if (level.equals("moderate")) {
            allowPartialAccess(zone);
        } else if (level.equals("restricted")) {
            restrictAccess(zone);
        }
    }

    private void allowFullAccess(String zone) {
        // Code to grant full access
    }

    private void allowPartialAccess(String zone) {
        // Code to grant partial access
    }

    private void restrictAccess(String zone) {
        // Code to restrict access
    }
}
```
x?

**Rating: 8/10**

#### Data Ownership and Management
Background context: In our example, the data owner is responsible for setting up and managing pipelines, handling requests, monitoring, troubleshooting, fixing data quality issues, implementing governance policies, etc., all within a specific line of business like marketing.

:p Who manages the pipelines in each line of business?
??x
The data owner is tasked with managing the pipelines that handle data ingress and egress for their respective lines of business. They also manage requests for new pipelines and ingestion sources.
x??

---
#### Data Stewardship and Compliance
Background context: The data steward acts as an SME, knowing the nuances of the data within their line of business, ensuring it is compliant with regulations and policies.

:p What role does the data steward play in their line of business?
??x
The data steward serves as a subject matter expert (SME), understanding the data's meaning, categorization, sensitivity, and compliance requirements. They also act as a liaison between the business unit and the central governing body.
x??

---
#### Business Analyst Role
Background context: The business analyst focuses on the business implications of data and how it fits into the broader enterprise strategy.

:p What is the role of the business analyst in their line of business?
??x
The business analyst is responsible for understanding the business implications of the data, ensuring that relevant data from their line of business is used in enterprise analytics. They also identify additional/new data needed to answer current or future business questions.
x??

---
#### Data Silos and Cross-Company Analytics
Background context: While dividing data by lines of business can enhance specific data analytics teams' efficiency, it can lead to data silos that inhibit cross-company analytics.

:p How does segregating data by line of business potentially hinder cross-company analytics?
??x
Segregating data into silos within different lines of business can limit the ability to run comprehensive analytics across multiple departments. For instance, specific data may reside only in one storage area, making it difficult to analyze patterns that span different lines of business.
x??

---
#### Data Pipelines and Storage Solutions
Background context: Data pipelines are common practices for handling data, typically landing it in a single storage solution to avoid duplication costs.

:p What is the role of data pipelines in managing data?
??x
Data pipelines are used to manage how data flows from its source into storage solutions. They help in ingesting and processing data efficiently by ensuring that data lands in specific storage areas without unnecessary duplication.
x??

---
#### Example Retail Company Scenario
Background context: The example provided involves a large retail company that divided its data by lines of business, creating silos for better governance but hindering cross-departmental analytics.

:p What challenge did the retail company face after implementing data segmentation?
??x
The retail company faced challenges in running analytics across different lines of business because specific data was stored only within designated storage areas, preventing comprehensive analysis that could reveal patterns between departments.
x??

---

