# High-Quality Flashcards: 2B002---Fundamentals-of-Data-Engineering_processed (Part 32)

**Rating threshold:** >= 8/10

**Starting Chapter:** Security Theater Versus Security Habit. The Principle of Least Privilege

---

**Rating: 8/10**

---
#### At Face Value - Handling Sensitive Data and Credentials
Sensitive data includes personal information, financial details, or any other confidential information that should not be shared casually. As a first line of defense, you must ensure that your actions respect privacy and ethical standards. If you have concerns about the way data is being handled in a project, it's important to raise these issues with colleagues and leadership.
:p When asked for credentials or sensitive data, what should you do?
??x
When asked for credentials or sensitive data, handle such requests carefully and ensure that they are legitimate and necessary. Raise any ethical concerns with your colleagues and leadership to maintain privacy standards. 
If the request seems suspicious or unnecessary:
```java
if (isRequestLegitimate()) {
    provideData();
} else {
    raiseConcernsToColleaguesAndLeadership();
}
```
x??
---

#### Security Processes - Making Security a Habit
Regular security processes make security an integral part of everyone's job. Practices like the principle of least privilege and understanding shared responsibility models in cloud environments are crucial. These practices should be ingrained as habits.
:p How can you ensure that security becomes part of your daily routine?
??x
To ensure that security is part of your daily routine, follow established security processes regularly. This includes practicing real security measures such as:
```java
// Example of implementing least privilege
public void restrictAccess() {
    if (userIsAdmin()) {
        grantFullAccess();
    } else {
        grantLimitedAccess();
    }
}
```
Understanding the shared responsibility model in cloud environments, like AWS or Azure, is also important. This involves knowing what services are managed by you and what services are managed by the provider.
x??
---

#### Security Theater Versus Security Habit
Security theater focuses on compliance but lacks real commitment to security practices that can lead to gaping vulnerabilities. Real security requires simplicity, effectiveness, and habituation throughout an organization.
:p What is the difference between security theater and a genuine security habit?
??x
Security theater involves focusing on compliance (e.g., SOC-2, ISO 27001) without real commitment to effective practices. A genuine security habit emphasizes simplicity, effectiveness, and embedding these principles into organizational culture through regular training.
For example:
```java
public class SecurityTraining {
    public void monthlyReview() {
        // Code for monthly review of policies
    }
}
```
This approach ensures that security is not just a box-ticking exercise but an integral part of daily operations.
x??
---

#### Active Security - Dynamic Threat Research
Active security involves continuously researching and thinking about potential threats, rather than relying on static, scheduled simulations. It requires dynamic analysis to identify and mitigate specific vulnerabilities relevant to your organization.
:p How can you adopt an active security posture in your work?
??x
To adopt an active security posture, regularly research successful phishing attacks and analyze organizational security vulnerabilities dynamically:
```java
public void dynamicSecurityAnalysis() {
    // Code for researching successful phishing attacks
    List<String> threats = getRecentPhishingThreats();
    
    for (String threat : threats) {
        if (isOrganizationalVulnerability(threat)) {
            updateSecurityPolicies();
        }
    }
}
```
This approach ensures that security measures are tailored to the specific risks faced by your organization, making them more effective.
x??
---

**Rating: 8/10**

#### Principle of Least Privilege
The principle of least privilege (PoLP) ensures that individuals and systems are granted only the minimum level of access necessary to perform their job functions. This minimizes potential damage from security breaches or errors.

:p What is the principle of least privilege, and why is it important?
??x
The principle of least privilege means providing users and systems with the minimum permissions needed for them to complete their tasks. It's crucial because granting excessive access increases the risk of accidental data exposure or intentional misuse by unauthorized personnel.

Example: In cloud environments, regular users should not have administrative access unless absolutely necessary; instead, they should be assigned specific IAM roles required for their role.
x??

---

#### Service Account Management
Service accounts in cloud environments are treated similarly to human users when it comes to privilege management. They should also adhere to the principle of least privilege by being given only the permissions needed to perform their tasks.

:p How do you manage service account privileges according to PoLP?
??x
Service accounts should be assigned only the necessary IAM roles required for their specific functions and have these roles removed when no longer needed. This ensures that any potential security breaches are contained within a limited scope.

Example: A database read-only role can be assigned to a service account, ensuring it has access solely to perform its intended task without broader administrative privileges.
x??

---

#### Data Access Controls
Implementing fine-grained data access controls helps protect sensitive information by limiting who can view or modify the data. This includes column-level, row-level, and cell-level controls.

:p What are some ways to implement data access controls for sensitive information?
??x
To ensure that only necessary personnel can access sensitive data, use tools like column, row, and cell-level access controls. Additionally, consider masking personal identifiable information (PII) and creating views that contain only the essential data required by viewers.

Example: In a database management system, set up row-level security policies to restrict access based on user roles.
x??

---

#### Shared Responsibility in Cloud Security
Cloud providers are responsible for securing their infrastructure, while users are responsible for securing their applications and systems built within the cloud. This shared responsibility model applies to both human users and automated service accounts.

:p What is the shared responsibility model in cloud security?
??x
The shared responsibility model in cloud security means that cloud vendors take care of physical security and infrastructure management, whereas users must manage application-level security, including configuration, access controls, and data protection within their own resources.

Example: A company using a cloud provider should ensure proper IAM role assignments, regular backups, and secure handling of sensitive data.
x??

---

#### Regular Data Backups
Regularly backing up critical data is essential to maintain business continuity and prevent data loss. This includes testing backup restoration regularly to ensure it works as expected.

:p Why are regular data backups important?
??x
Regular data backups are crucial for disaster recovery and maintaining business operations. They protect against data loss due to hardware failures, human errors, or ransomware attacks. Testing the restoration process ensures that critical data can be quickly recovered when needed.

Example: Implement a backup schedule (daily, weekly) and verify that the restored data matches the original.
x??

---

#### Security Policy for Credentials
A strong security policy should include guidelines on protecting credentials to prevent unauthorized access. This includes practices like using single sign-on (SSO), multifactor authentication, and disabling old credentials.

:p What are some best practices for securing credentials?
??x
Best practices for securing credentials involve using SSO whenever possible, enabling multifactor authentication, avoiding password sharing, being vigilant against phishing attempts, and regularly cleaning up old or unused credentials. Always apply the principle of least privilege to limit access rights.

Example: Implement an SSO system with MFA enabled and disable or delete unnecessary user accounts.
x??

---

#### Device Security
Protecting company devices is essential for maintaining overall security. This includes managing devices, using multifactor authentication, and ensuring that all devices use company email credentials.

:p How should you secure company devices?
??x
To secure company devices, implement device management solutions to remotely wipe data if a device is lost or an employee leaves. Use multifactor authentication for all devices, sign in with company email credentials, and ensure all security policies apply to these devices.

Example: Enable device management tools like MDM (Mobile Device Management) to enforce security policies across all company-issued devices.
x??

---

**Rating: 8/10**

#### Security Practices for Personal Devices
Background context: This section emphasizes the importance of treating company-issued devices as personal extensions and maintaining them closely. It also discusses best practices during screen sharing, such as protecting sensitive information and only sharing what is necessary.

:p How should you handle your assigned device(s)?
??x
You should treat your assigned device(s) as an extension of yourself and ensure that they do not go out of your sight. This practice helps in maintaining the security posture by preventing unauthorized access or loss.
x??

---

#### Screen Sharing Guidelines
Background context: The text provides guidelines on how to use screen sharing responsibly, ensuring sensitive information is protected. It mentions what should be shared and when to use "do not disturb" mode.

:p What are the best practices for using screen sharing?
??x
When using screen sharing, share only single documents, browser tabs, or windows; avoid sharing your full desktop. Additionally, during video calls, use “do not disturb” mode to prevent messages from appearing during calls or recordings.
x??

---

#### Software Update Policy
Background context: This section outlines the company's stance on software updates and provides recommendations for different types of devices.

:p What are the update practices recommended by the company?
??x
For web browsers, restart when an update alert appears. For minor OS updates, run them on both company and personal devices. Critical major OS updates will be identified and guided by the company. Avoid beta versions and wait a week or two before using new major OS versions.
x??

---

#### Patching and Updating Systems Software
Background context: The text stresses the importance of regularly patching and updating operating systems and software to avoid exposing security flaws.

:p How should you manage updates for your systems?
??x
Regularly update operating systems and software with new patches. For SaaS and cloud-managed services, these often automatically handle upgrades and maintenance. Manually update your own code and dependencies by either automating builds or setting alerts on releases and vulnerabilities.
x??

---

#### Security Awareness for People
Background context: This section highlights the importance of security awareness among employees as they are considered the weakest link in security.

:p Why is people's role crucial in maintaining security?
??x
People play a critical role in maintaining security because they can unintentionally introduce vulnerabilities through mistakes or lack of knowledge. Enhancing security awareness helps prevent human errors that could compromise systems.
x??

---

#### Technology for Security
Background context: The text emphasizes the importance of leveraging technology to secure systems and data assets, focusing on patching and updating.

:p What are the key areas to prioritize in technology for security?
??x
Prioritize patching and updating operating systems and software to avoid exposing security flaws. Use automation for manual updates where necessary and set alerts for vulnerabilities.
x??

---

#### Automation of Builds and Dependency Updates
Background context: This part of the text suggests automating builds and setting up notifications for dependency updates.

:p How can you ensure timely updates for your code?
??x
Automate builds to perform regular checks and updates. Alternatively, set up alerts for new releases and vulnerabilities so that manual updates can be prompted.
x??

---

#### Beta Version Usage
Background context: The text advises against using beta versions of operating systems due to potential instability.

:p Why should you avoid using the beta version of an OS?
??x
Avoid using the beta version of an OS because they are not fully tested and may contain bugs or other issues that could impact system stability.
x??

---

#### New Major OS Version Release Timing
Background context: The text recommends waiting a week or two before using new major versions to ensure stability.

:p When should you consider using a new major OS version?
??x
Wait a week or two after the release of a new major OS version to allow for any issues to be identified and addressed by the developers.
x??

---

