# High-Quality Flashcards: 2B004-Data-Governance_processed (Part 11)


**Starting Chapter:** Encryption

---


---
#### Service Accounts and Application Credentials
Service accounts provide both the application credential and an identity. They enable applications to access resources on behalf of a user or another service without requiring individual credentials for each interaction.

:p What is a service account, and what does it do?
??x
A service account is an identity in Google Cloud that provides both the application credential (service account key) and an identity. Service accounts allow applications to interact with Google Cloud resources securely on behalf of users or other services.
x??

---
#### Roles and Permissions
Roles determine the level of access granted to identities within a project. A role consists of a set of permissions, allowing granular control over what actions can be performed.

:p What is a role in IAM?
??x
A role in Identity and Access Management (IAM) defines the level of access an identity has within a project. Roles consist of a set of permissions that determine which actions are allowed.
x??

---
#### Custom Roles
Custom roles can be created to provide specific, granular access to resources. These roles allow you to combine or restrict predefined roles based on your organization's needs.

:p How do custom roles work?
??x
Custom roles enable the creation of roles with a tailored set of permissions that meet specific organizational requirements. You can build upon predefined roles or remove permissions from them to create more granular control over access.
x??

---
#### Role Assignment and Group Management
Roles are typically assigned to groups, which allows for easier management when users change job functions or responsibilities.

:p How do you manage role assignments for multiple users?
??x
Role assignments are often managed through groups. By assigning roles to a group, you can easily update access for all members of that group when they change jobs or responsibilities. This avoids the need to update permissions on a per-user basis.
x??

---
#### Predefined Roles and Permissions
Predefined roles like `dataViewer` provide specific sets of permissions. However, custom roles may be needed to restrict certain actions while allowing others.

:p What are predefined roles?
??x
Predefined roles in IAM come with built-in sets of permissions that define the level of access an identity has within a project. For example, the `dataViewer` role allows users to access metadata but not table data.
x??

---
#### Permission Granularity and Least Privilege Principle
IAM policies should be set up to provide the least amount of privileges necessary for each identity.

:p What is the principle of least privilege?
??x
The principle of least privilege (PoLP) states that users and applications should only have access to the resources and permissions they need to perform their tasks. This minimizes potential damage if an account or application is compromised.
x??

---
#### Resource-Level Permissions
Permissions are typically granted at a resource level, meaning identities receive specific permissions on individual datasets or tables rather than all resources in a project.

:p How are permissions managed in IAM?
??x
In IAM, permissions are usually assigned at the resource level. This means that an identity is granted access to specific datasets or tables, not just all resources within a project. This approach helps prevent permission creep and ensures that identities have only the necessary permissions.
x??

---
#### Identity-Aware Proxy (IAP)
Identity-Aware Proxy can be used as a central authorization layer for applications accessed via HTTPS, providing an application-level access control model.

:p What is IAP?
??x
Identity-Aware Proxy (IAP) acts as a central authorization layer for applications that are accessed via HTTPS. It allows you to define and enforce application-level access policies using groups, making it easier to manage access across multiple applications.
x??

---
#### Application-Level Access Control with IAP
IAP can be used to implement group-based application access control, allowing certain resources to be accessible by specific groups of users.

:p How does IAP help in managing application access?
??x
Identity-Aware Proxy (IAP) helps manage application access at the application level rather than relying on network-level firewalls. You can define policies centrally and apply them across all applications, ensuring that only authorized groups have access to resources.
x??

---


---
#### Policies
Policies are rules or guardrails that enable your developers to move quickly, but within the boundaries of security and compliance. These policies can be applied to users and resources.

:p What is a policy?
??x
A policy is a set of rules or guidelines designed to ensure secure and compliant operations while allowing flexibility for developers to work efficiently.
x??

---
#### Hierarchical Policies
Hierarchical policies allow you to create and enforce consistent policies across your organization. These can be assigned at the organizational level, business unit, project, or team levels.

:p How do hierarchical policies work?
??x
Hierarchical policies enable consistent enforcement of security and compliance rules by organizing them in a structured manner. Lower-level policies cannot override higher-level ones, ensuring that critical rules are managed centrally.
x??

---
#### Context-Aware Access
Context-Aware Access is an approach that works with the zero-trust network security model to enforce granular access control based on user identity and request context.

:p What is Context-Aware Access?
??x
Context-Aware Access is a method of enforcing fine-grained access control by considering various attributes such as the device being used, IP address, and other contextual factors. It improves security by limiting access based on real-time conditions.
x??

---
#### Identity-Aware Proxy (IAP)
Identity-Aware Proxy (IAP) enables employees to access corporate apps and resources from untrusted networks without using a Virtual Private Network (VPN).

:p What is IAP?
??x
Identity-Aware Proxy (IAP) is a service that allows secure access to internal applications and resources from external or untrusted networks. It works by verifying the user's identity before granting access.
x??

---
#### Cloud Identity and Access Management (Cloud IAM)
Cloud Identity and Access Management (IAM) manages permissions for cloud resources, enabling fine-grained control over who can access what.

:p What is Cloud IAM?
??x
Cloud IAM is a service that manages permissions and access controls for cloud resources. It provides granular control over who can perform specific actions on resources.
x??

---
#### Access Context Manager
Access Context Manager (ACM) is a rules engine that enables fine-grained access control based on context.

:p What is Access Context Manager?
??x
Access Context Manager is a rules engine that allows for dynamic and context-aware access policies. It evaluates user requests against predefined rules to determine whether access should be granted.
x??

---
#### Endpoint Verification
Endpoint verification involves collecting device details to ensure compliance and security of the devices accessing corporate resources.

:p What is endpoint verification?
??x
Endpoint verification is a process that collects information about user devices to ensure they meet certain security standards before granting network or resource access.
x??

---
#### Data Loss Prevention (DLP)
Data Loss Prevention (DLP) helps in identifying and protecting sensitive data by scanning data stores for known patterns.

:p What is DLP?
??x
Data Loss Prevention (DLP) is a system that scans data stores to identify and protect sensitive information. It uses pattern matching to detect sensitive data like credit card numbers, personal addresses, etc.
x??

---
#### Cloud Data Loss Prevention
Cloud DLP can be used with AI methods to scan tables and files for protecting sensitive data.

:p How does Cloud DLP work?
??x
Cloud Data Loss Prevention (DLP) leverages AI methods to automatically detect and protect sensitive data in tables and files. It scans the data using predefined patterns and rules to identify potential security risks.
x??

---
#### Example: Context-Aware Access Rules
Context-aware access can provide different levels of access based on device type, patch status, etc.

:p How does context-aware access determine user permissions?
??x
Context-aware access determines user permissions by evaluating multiple factors such as the device being used and its security posture. For example, an employee might get full edit access from a managed corporate device but only view access if accessing from a non-patched device.
```java
public class ContextAwareAccess {
    public boolean hasPermission(User user, Device device) {
        // Check device type and patch status
        if (device.isCorporateManaged() && !user.hasUnpatchedDevice()) {
            return true; // Allow full access
        } else {
            return false; // Grant limited or no access
        }
    }
}
```
x??

---


#### Access Transparency
Background context: It is crucial for safeguarding access to data that any access to user data in a production system is transparent. Only a small number of on-call engineers should be able to access it, and even then, only to ensure the safe running of the system. Notifications are required whenever someone in the IT department or cloud provider accesses your data.

:p What is Access Transparency used for?
??x
Access Transparency is used to monitor and log actions taken by personnel from the cloud provider when accessing your content on Google Cloud. This ensures that such access is only done for valid business reasons, such as fixing an outage or responding to a support request. It helps in verifying compliance with legal and regulatory obligations and aids in collecting and analyzing tracked access events using automated security information and event management (SIEM) tools.

??x
```java
// Example pseudocode for accessing user data in Google Cloud
if (isAuthorizedEngineer() && isSystemSafeRunning()) {
    logAccess();
} else if (needToFixOutage() || receivedSupportRequest()) {
    logProviderAccess();
}
```
x??

---

#### Keeping Data Protection Agile
Background context: Data protection policies need to be flexible and adaptable, considering changes in business processes and new threats. It involves regularly reviewing user permissions and data lineage.

:p Why is keeping data protection agile important?
??x
Keeping data protection agile is essential because it allows you to adapt to changing business needs and security landscapes. Regularly scanning the use of permissions by users helps in identifying overprivileged roles, which can be refined or reduced for better security practices. Understanding data lineage ensures that you can trace back issues related to data integrity and transformations.

??x
```java
// Pseudocode for periodic permission scans
public void scanPermissions() {
    List<UserRole> allRoles = getAllUserRoles();
    for (UserRole role : allRoles) {
        if (role.isOverprivileged()) {
            reduceRolePrivileges(role);
        }
    }
}
```
x??

---

#### Security Health Analytics
Background context: Continuously monitoring the permissions assigned to users helps in identifying unnecessary broad grants, ensuring that access is granular and controlled. This practice also involves tracking data lineage to understand transformations and errors.

:p What does Security Health Analytics help with?
??x
Security Health Analytics aids in continuously monitoring user roles to ensure they are appropriately scoped and not overly permissive. By periodically scanning users' permissions, you can refine role definitions or create more granular custom roles. Additionally, it helps in maintaining data lineage by tracking where data comes from, when it was ingested, transformations made, and any errors encountered during ingestion.

??x
```java
// Pseudocode for monitoring user-role combinations
public void monitorUserRoles() {
    List<UserRole> users = getAllUsers();
    for (UserRole user : users) {
        int usedPermissions = countUsedPermissions(user);
        if (usedPermissions < user.getGrantedPermissions().size()) {
            refineRole(user);
        }
    }
}
```
x??

---

#### Data Lineage
Background context: Understanding the history of data transformations is crucial for maintaining data integrity and troubleshooting. This involves tracking where data comes from, when it was ingested, what transformations were applied, who performed them, and any errors that occurred.

:p What role does data lineage play in data protection?
??x
Data Lineage plays a critical role in understanding the history of how data is transformed and used within an organization. By maintaining this information, you can trace back to identify sources of issues such as errors or inconsistencies. This helps in ensuring that all transformations are well-documented and auditable.

??x
```java
// Pseudocode for tracking data lineage
public class DataLineageTracker {
    Map<String, List<DataTransformationLog>> lineageMap = new HashMap<>();

    public void logDataIngestion(String source, String data) {
        // Log ingestion details
    }

    public void logTransformation(String transformer, String transformationDetails, String previousData) {
        // Log transformation steps and results
    }
}
```
x??

---


#### Network Security Logs Analysis
Background context explaining the importance of network security logs and their analysis. The goal is to find frequent causes of security incidents, such as multiple failed access attempts on specific files or tables.

:p How can analyzing network security logs help identify potential security issues?
??x
Analyzing network security logs helps in identifying patterns that could indicate a security breach. For example, if there are repeated failed login attempts from the same IP address, it might be an indication of brute force attacks. By monitoring these logs, one can detect anomalies and take preventive actions.

For instance, consider the following pseudocode:
```java
for (log : networkLogs) {
    if (log.attemptFailed() && log.sourceIsSameIP()) {
        incrementFailedAttemptsCounter(log.sourceIP());
        if (failedAttemptsCounter[log.sourceIP()] > threshold) {
            alertSecurityTeam("Potential brute force attack from IP: " + log.sourceIP());
        }
    }
}
```
x??

---

#### Anomalous Activity Detection
Background context explaining the importance of detecting anomalous activities to uncover threats, using AI models for behavior analysis.

:p How can an AI model be used to detect suspicious behavior in network traffic?
??x
An AI model can analyze normal behavior patterns and compare them with current activity to identify anomalies. For example, if a specific employee is logging into SSH frequently or from unusual locations, this might indicate data exfiltration attempts.

Pseudocode for anomaly detection:
```java
AIModel trainOnHistoricalBehavior(Employee e) {
    // Train the model on historical behavior of employees doing similar roles
    return trainedModel;
}

boolean detectAnomaly(AIModel model, EmployeeActivity activity) {
    if (model.predictBehavior(activity).isNormal()) {
        return false;
    } else {
        log("Potential suspicious activity: " + activity);
        return true;
    }
}
```
x??

---

#### Data Protection Best Practices
Background context explaining the importance of data protection in various industries, particularly healthcare and finance.

:p Why is data protection crucial for healthcare providers?
??x
Data protection is critical for healthcare providers due to the sensitive nature of medical records. Breaches can lead to significant privacy violations and legal consequences. For example, the ransomware attack on the NHS affected over 200,000 systems globally, highlighting the severe impact of such breaches.

Example code for securing access:
```java
class PatientRecordSystem {
    private Map<String, User> users;

    public void secureAccess(User user) {
        if (user.isAuthorized()) {
            grantAccess(user);
        } else {
            log("Unauthorized access attempt by: " + user.getName());
        }
    }

    private void grantAccess(User user) {
        // Grant specific permissions to the user
    }
}
```
x??

---

#### Equifax Data Breach Incident
Background context explaining the significant impact of a data breach incident in 2017.

:p What is an example of a major data breach and its consequences?
??x
The Equifax data breach in 2017 is a notable example. Cybercriminals accessed sensitive information from over 145 million customers, including personal data like full names, social security numbers, birth dates, addresses, and driver’s license numbers. This led to potential identity theft for many individuals.

Example code illustrating the severity:
```java
public class DataBreach {
    private Map<String, Customer> customerData;

    public void detectAndAlert(Customer customer) {
        if (customer.isSensitiveInfoCompromised()) {
            alertSecurityTeam("Customer data compromised: " + customer.getName());
        }
    }

    private boolean isSensitiveInfoCompromised(Customer customer) {
        // Check for sensitive info in the breach
        return true; // Placeholder logic
    }
}
```
x??

---

