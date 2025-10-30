# High-Quality Flashcards: 2B001--Financial-Data-Engineering_processed (Part 12)

**Rating threshold:** >= 8/10

**Starting Chapter:** Data Ingestion Technologies. Financial APIs

---

**Rating: 8/10**

---
#### Service APIs Overview
Service APIs are used to create and trigger instances of services, such as initiating a payment or balance inquiry. They facilitate seamless data exchange and communication between applications through an API infrastructure.
:p What is the primary use case for service APIs?
??x
Service APIs are primarily used to initiate specific actions, such as payments or balance inquiries, by creating and triggering instances of these services. This enables applications to interact with backend systems in a controlled and secure manner.
x??

---
#### API Integration Strategy
API integration involves connecting different applications using their APIs to facilitate data exchange and communication, thereby enabling creativity and innovation within the infrastructure.
:p What is the goal of an API integration strategy?
??x
The goal of an API integration strategy is to create a seamless infrastructure for data exchange and communication between various applications, fostering creativity and innovation through interconnected systems.
x??

---
#### Performance Metrics for APIs
API performance is measured by its ability to handle large numbers of concurrent requests and the request response time. Common metrics include hits per second (HPS) and requests per second (RPS).
:p What are common API performance metrics?
??x
Common API performance metrics include hits per second (HPS) and requests per second (RPS). These metrics measure the ability of an API to handle a large number of concurrent requests in one second.
x??

---
#### Performance Optimization Techniques
Performance optimization techniques for APIs include load balancing, caching, rate limiting, and throttling. These methods help manage and control high volumes of traffic efficiently.
:p What are some common performance optimization techniques?
??x
Common performance optimization techniques for APIs include:
- Load Balancing: Distributes incoming network traffic across multiple servers to ensure no single server is overwhelmed.
- Caching: Stores frequently accessed data in temporary storage (cache) to reduce the number of requests to the backend and improve response times.
- Rate Limiting: Limits the rate at which clients can request resources from the API, preventing abuse or overwhelming the system.
- Throttling: Similar to rate limiting but often used for more fine-grained control over access.

Example pseudocode for rate limiting:
```python
def rate_limit(user_ip):
    if user_ip in rate_limited_ips:
        return False
    else:
        add_user_to_rate_limited_ips(user_ip)
        return True
```
x??

---
#### Security Elements of APIs
Security elements include authentication and authorization to control how and who can interact with the API. Tools like firewalls, OAuth 2.0, API keys, and API gateways are commonly used for securing APIs.
:p What are key security considerations when designing an API?
??x
Key security considerations when designing an API involve:
- Authentication: Ensuring that only authorized entities can access the API. Common methods include API keys, tokens, and OAuth 2.0.
- Authorization: Controlling what actions users or applications are allowed to perform once authenticated.

Example pseudocode for simple authentication using API keys:
```java
public boolean authenticate(String apiKey) {
    if (apiKey.equals(secretApiKey)) {
        return true;
    } else {
        return false;
    }
}
```
x??

---
#### SQL Injection Attack
An SQL injection attack allows a cybercriminal to exploit vulnerabilities in an application’s input validation mechanisms, injecting malicious inputs that alter the behavior of backend SQL queries.
:p What is SQL injection and how does it work?
??x
SQL injection (SQLi) is an attack where a cybercriminal exploits vulnerabilities in an application's input validation mechanisms by injecting malicious SQL statements. This can lead to unauthorized access to data or even complete system compromise.

Example:
A naive user ID validation mechanism could be vulnerable to SQLi if not properly sanitized.
```java
String userId = request.getParameter("user_id");
// Vulnerable query
String sqlQuery = "SELECT first_name, last_name, account_balance FROM user_accounts WHERE user_id = " + userId;
```
??x
In the above example, if `userId` is directly concatenated into the SQL query without sanitization, an attacker could inject malicious input like `"267 OR 1=1"`, leading to a SQL injection attack.

To prevent this, use prepared statements:
```java
String sqlQuery = "SELECT first_name, last_name, account_balance FROM user_accounts WHERE user_id = ?";
PreparedStatement statement = connection.prepareStatement(sqlQuery);
statement.setString(1, userId);
ResultSet rs = statement.executeQuery();
```
x??

---

**Rating: 8/10**

#### Secure File Transfer Protocol (SFTP)
Background context: SFTP is a widely used protocol for secure file transfer, leveraging SSH to encrypt both data and commands. It offers security, reliability, and platform independence, making it suitable for bulk and large file transfers. However, it may not be the best option in high-speed and large-volume systems due to its slower performance compared to alternatives.
If applicable, add code examples with explanations:
```java
// Example of an SFTP setup using Java
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;

public class SFTPExample {
    public void transferFile(String hostname, int port, String user, String password, String remotePath) throws Exception {
        JSch jsch = new JSch();
        Session session = jsch.getSession(user, hostname, port);
        session.setPassword(password);

        // Avoid asking for key confirmation
        java.util.Properties config = new java.util.Properties();
        config.put("StrictHostKeyChecking", "no");
        session.setConfig(config);
        session.connect();

        ChannelSftp channelSftp = (ChannelSftp) session.openChannel("sftp");
        channelSftp.connect();
        // Further code to transfer files
    }
}
```
:p What is SFTP and how does it work?
??x
SFTP stands for Secure File Transfer Protocol, which uses SSH (Secure Shell) protocol for secure file transfers. It encrypts both the data and commands sent between machines, ensuring security during the transfer process. This makes it suitable for transferring sensitive financial information.
x??

---

#### Managed File Transfer Solutions (MFT)
Background context: MFT solutions enhance SFTP with additional enterprise-level functionalities such as enhanced security, performance optimization, compliance management, and advanced reporting. These solutions are designed to simplify complex file transfer processes while maintaining high standards of security and efficiency.
If applicable, add code examples with explanations:
```java
// Example of using a managed file transfer solution (MFT)
import com.example.managed.file.transfer.MFTClient;

public class MFTExample {
    public void initiateFileTransfer(String sourcePath, String destinationPath) throws Exception {
        MFTClient mftClient = new MFTClient();
        // Configure the client with necessary details
        mftClient.configureSource(sourcePath);
        mftClient.configureDestination(destinationPath);

        // Start the file transfer process
        mftClient.transferFiles();
    }
}
```
:p What is Managed File Transfer (MFT) and how does it differ from SFTP?
??x
Managed File Transfer (MFT) solutions extend the functionality of standard SFTP by providing enhanced security, performance optimization, compliance management, and advanced reporting capabilities. They simplify complex file transfer processes while maintaining high standards.
x??

---

#### Cloud-Based Data Sharing and Access
Background context: Cloud-based data sharing and access offer a reliable and convenient method for exchanging data between entities. Users can leverage various cloud features when working with the data, such as user interfaces, querying capabilities, data management, search functions, and more. This approach also offers cost-saving benefits and seamless integration with other cloud services.
If applicable, add code examples with explanations:
```java
// Example of using Google Cloud for accessing data
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.google.api.client.http.HttpRequest;

public class CloudDataAccess {
    public void downloadFileFromCloud(String bucketName, String fileName) throws Exception {
        Storage storage = StorageOptions.getDefaultInstance().getService();
        // Download the file from Google Cloud Storage
        HttpRequest req = storage.get(bucketName, fileName).executeMediaAsInputStream();
        // Further code to process or save the downloaded file
    }
}
```
:p How does cloud-based data sharing and access work?
??x
Cloud-based data sharing and access involves creating a storage bucket or database within a dedicated and isolated cloud environment. The provider uploads data, and the target user is authorized to access and manipulate it. Updates are continuously pushed to the storage location, providing immediate access for users.
x??

---

#### Case Study: FactSet Integration with AWS Redshift and Snowflake
Background context: FactSet integrates its financial datasets into popular cloud data warehouse services like AWS Redshift and Snowflake, offering a centralized platform for accessing and querying data. This integration saves clients the need to clean, model, and normalize data manually.
If applicable, add code examples with explanations:
```java
// Example of using AWS Redshift
import com.amazonaws.services.redshift.AmazonRedshift;
import com.amazonaws.services.redshift.AmazonRedshiftClientBuilder;

public class RedshiftExample {
    public void queryData(String query) throws Exception {
        AmazonRedshift redshift = AmazonRedshiftClientBuilder.defaultClient();
        // Execute the SQL query
        String result = redshift.executeStatement(query).getRows().toString();
        System.out.println("Query Result: " + result);
    }
}
```
:p How does FactSet's cloud-based data delivery work?
??x
FactSet integrates its financial datasets into popular cloud data warehouse services like AWS Redshift and Snowflake, making the data ready for querying. Clients can access this pre-populated data without needing to clean, model, or normalize it, simplifying workflow management.
x??

---

#### Financial Data Marketplaces in Cloud Computing
Background context: Financial data marketplaces are managed cloud solutions that allow financial data providers to distribute and share their data through a single cloud interface. This eliminates the need for providers to build and maintain infrastructure for storage, distribution, billing, and user management.
If applicable, add code examples with explanations:
```java
// Example of using AWS Data Exchange for Financial Services
import com.amazonaws.services.datasync.AWSDataSync;

public class DataExchangeExample {
    public void subscribeToDataset(String datasetArn) throws Exception {
        AWSDataSync dataSync = AWSDataSyncClientBuilder.defaultClient();
        // Subscribe to the dataset
        dataSync.subscribeToDataset(datasetArn);
    }
}
```
:p What are financial data marketplaces and how do they work?
??x
Financial data marketplaces are managed cloud solutions that allow financial data providers to distribute and share their data through a single cloud interface, eliminating the need for them to build and maintain infrastructure.
x??

---

**Rating: 8/10**

---
#### Incremental Change
Incremental change involves making small and gradual modifications to a system, rather than large, potentially risky changes all at once. This approach is particularly useful when dealing with complex systems or environments where any disruption could have significant consequences.

:p How does incremental change work in the context of data ingestion layers?
??x
Incremental change works by introducing changes in smaller steps, making it easier to identify and mitigate issues that arise during the transition. By breaking down changes into manageable chunks, teams can ensure that each step is thoroughly tested before being rolled out to production.

This approach helps reduce the risk of errors and disruptions. For example, if you need to update a data schema, instead of changing all fields at once, you might first add new columns or modify existing ones one by one.
```java
// Pseudocode for incremental change in Java
public void incrementallyUpdateSchema() {
    try (Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/mydb", "user", "pass")) {
        // Step 1: Add a new column
        String addColumnQuery = "ALTER TABLE myTable ADD COLUMN newColumn VARCHAR(255)";
        Statement stmt = conn.createStatement();
        stmt.executeUpdate(addColumnQuery);

        // Step 2: Migrate existing data to the new column (if necessary)
        String migrateDataQuery = "UPDATE myTable SET newColumn = 'defaultValue'";
        stmt.executeUpdate(migrateDataQuery);

        // Step 3: Drop old columns or update them as needed
    } catch (SQLException e) {
        e.printStackTrace();
    }
}
```
x??

---
#### Isolated Change
Isolated change involves developing and testing changes in a separate environment before deploying them to production. This ensures that any potential issues can be identified and resolved without affecting the live system.

:p What is the importance of isolated change?
??x
The importance of isolated change lies in ensuring that changes are thoroughly tested and validated before being deployed into the main production environment. By working on a separate instance or sandbox, developers can simulate real-world conditions and catch any bugs or issues early in the process.

This approach helps maintain system stability and minimizes the risk of downtime or service disruption during deployments.
```java
// Pseudocode for isolated change in Java
public void testAndDeployChanges() {
    // Step 1: Clone production environment in a sandbox
    SandboxManager.cloneProductionEnvironment("sandboxEnv");

    // Step 2: Apply changes on the sandbox environment
    DataIngestionLayer.applyUpdatesToSandbox();

    // Step 3: Test the updated system to ensure all works as expected
    if (TestRunner.runTestsOnSandbox()) {
        // Step 4: Deploy successful changes to production
        ProductionManager.deployChanges();
    } else {
        System.out.println("Deployment failed due to tests not passing.");
    }
}
```
x??

---
#### Documented Change
Documented change ensures that all modifications and their rationale are clearly recorded, allowing other stakeholders to understand the changes made. This documentation is crucial for maintaining transparency and enabling smoother collaboration among team members.

:p What benefits does documented change provide?
??x
Documented change provides several key benefits:
1. **Clarity**: It helps clarify the purpose and impact of the changes.
2. **Traceability**: Documentation makes it easier to trace back any issues or problems that arise post-deployment.
3. **Knowledge Sharing**: Detailed documentation serves as a knowledge repository, helping new team members understand previous decisions and practices.

For example, if you are updating data validation rules, your document should explain the reasons behind these changes and how they align with business objectives.
```markdown
# Change Documentation

## Changes Made:
- Updated validation rule for field `accountNumber` to accept only alphanumeric characters.
- Added new validator for CSV files to check for missing header rows.

## Rationale:
The changes were made to improve data quality and ensure compliance with industry standards. The updated rules will help prevent errors in financial transactions.
```
x??

---
#### Zero Downtime Deployment Techniques
Zero downtime deployment techniques are methods used to deploy updates or changes without interrupting the service provided to users. These techniques involve creating redundant environments (like Blue/Green) where new versions can be tested and validated before being swapped with the live environment.

:p What are some common zero downtime deployment techniques?
??x
Common zero downtime deployment techniques include:
1. **Blue/Green Deployment**: Deploy a new version of an application to a secondary "green" environment that mirrors the production "blue" environment. Once the green environment is fully operational, traffic is switched from blue to green.
2. **Canary Release**: Gradually introduce a new version to a small subset of users (the canary) and monitor their performance before rolling out to all users.
3. **Rolling Updates**: Deploy updates incrementally in batches, allowing for gradual rollbacks if issues are detected.

Here’s an example of how Blue/Green deployment might be implemented:
```java
// Pseudocode for Blue/Green Deployment
public void blueGreenDeploy() {
    // Step 1: Bring up the new version (green) and deploy it to a subset of instances
    String greenDeploymentCommand = "deploy-to-green";
    if (!deploy(greenDeploymentCommand)) return;

    // Step 2: Wait for the green environment to be fully operational
    waitForGreenEnvironmentToBeHealthy();

    // Step 3: Switch traffic from blue to green
    switchTrafficToGreen();
}
```
x??

---

