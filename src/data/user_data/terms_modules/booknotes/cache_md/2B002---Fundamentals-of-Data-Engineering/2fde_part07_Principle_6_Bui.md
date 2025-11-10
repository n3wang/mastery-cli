# High-Quality Flashcards: 2B002---Fundamentals-of-Data-Engineering_processed (Part 7)


**Starting Chapter:** Principle 6 Build Loosely Coupled Systems

---


#### Technical Leadership and Data Architecture
Background context: Martin Fowler describes an ideal software architect who focuses on mentoring the development team to improve their skills. This approach provides greater leverage than being a sole decision-maker, avoiding becoming an architectural bottleneck.

:p Who is responsible for improving the development team’s ability in this scenario?
??x
An ideal data architect is responsible for improving the development team's ability. They mentor current data engineers, make careful technology choices in consultation with their organization, and disseminate expertise through training and leadership.
x??

---

#### Principle 5: Always Be Architecting
Background context: This principle encourages data architects to constantly design new things based on business and technological changes rather than just maintaining the existing state. Architects need to develop a baseline architecture, target architecture, and sequencing plan.

:p What does an architect’s job entail according to this principle?
??x
An architect’s job involves developing deep knowledge of the baseline architecture (current state), developing a target architecture, and mapping out a sequencing plan to determine priorities and the order of architecture changes. Modern architecture should not be command-and-control or waterfall but collaborative and agile.
x??

---

#### Principle 6: Build Loosely Coupled Systems
Background context: This principle promotes creating systems where components can operate independently with minimal dependencies on each other, enabling teams to test, deploy, and change systems without communication bottlenecks.

:p What are the key properties of a loosely coupled system?
??x
The key properties of a loosely coupled system include:
1. Systems broken into many small components.
2. Interfaces with other services through abstraction layers such as a messaging bus or an API.
3. Internal changes to a system component do not require changes in other parts because details are hidden behind stable APIs.
4. Each component can evolve and improve separately, leading to no global release cycle but separate updates for each component.
x??

---

#### Bezos API Mandate
Background context: The Bezos API mandate is a set of guidelines issued by Amazon's CEO in 2002 that required all teams to expose data and functionality through service interfaces, enabling loose coupling and eventually leading to the development of AWS.

:p What are the key requirements of the Bezos API mandate?
??x
The key requirements of the Bezos API mandate include:
1. All teams must expose their data and functionality through service interfaces.
2. Teams must communicate with each other exclusively through these interfaces (no direct linking, no shared memory model).
3. Service interfaces must be designed from the ground up to be externalizable, meaning they should plan for potential exposure to developers outside the company.
x??

---

#### Loosely Coupled Systems in Organizations
Background context: The principles of building loosely coupled systems can be translated into organizational characteristics, promoting independence and agility among teams.

:p How does a loosely coupled system benefit organizations?
??x
A loosely coupled system benefits organizations by breaking down components into small parts that interface with each other through abstraction layers such as messaging buses or APIs. This design hides internal details, reducing the need for changes in other parts due to internal updates. Consequently, there is no global release cycle; instead, components can be updated independently.
x??

---


#### Distributed System Design - Loose Coupling and Iterative Improvement
Background context: The passage describes a distributed system where many small teams independently work on different components of a large, complex system. These teams communicate via APIs and messages, enabling them to evolve their parts without worrying about others' internal details.

:p What is the principle behind each team's ability to rapidly improve its component independently?
??x
This principle leverages loose coupling, which means that changes in one part do not affect other parts directly. Teams can make iterative improvements to their components and publish new features or updates with minimal impact on the system as a whole.

The key is that teams are responsible for only their specific module's details but rely on published APIs to interact with others, ensuring flexibility and independent evolution.
x??

---

#### Reversible Decisions in Architecture
Background context: The text emphasizes making reversible decisions to keep architecture agile. A reversible decision or "two-way door" allows changes without irreparable impacts.

:p Why is aiming for two-way doors important?
??x
Aiming for two-way doors is crucial because it ensures flexibility and reversibility, allowing the system to adapt quickly to changing requirements or technologies. This approach minimizes risk and simplifies maintenance by providing options to revert changes if needed.
x??

---

#### Cloud-Native Architecture Principles
Background context: The passage mentions five principles of cloud-native architecture from Tom Grey’s article on Google Cloud blog.

:p What does the principle "Prioritize Security" entail for data engineers?
??x
The principle emphasizes that every data engineer must take responsibility for securing the systems they build and maintain. This involves focusing on two main ideas: zero-trust security and the shared responsibility model, ensuring robust security practices are implemented.
x??

---

#### Zero-Trust Security Model
Background context: The text outlines the importance of zero-trust security, a model that assumes no entity should be automatically trusted based on network location alone.

:p Explain what zero-trust security means in practical terms?
??x
Zero-trust security requires verification and validation for every access request—regardless of whether it comes from inside or outside the perimeter. This approach ensures that all entities must provide credentials to prove their identity before they can gain access, thereby enhancing security by reducing unauthorized access risks.

In practice, this means implementing multi-factor authentication (MFA), strict access controls, and continuous monitoring for unusual activities.
x??

---

#### Shared Responsibility Model
Background context: The text discusses the shared responsibility model in cloud security, where both the service provider and the customer share responsibilities to maintain a secure environment.

:p How does the shared responsibility model work between AWS and its customers?
??x
In the shared responsibility model, AWS is responsible for securing the infrastructure (cloud platform) and the operations that run on it. Customers are responsible for securing their applications, data, and configurations within the cloud environment. This division ensures a balanced approach to security where both parties have specific roles in maintaining overall system security.

For example:
- **AWS:** Manages encryption keys, secure network boundaries, and physical hardware.
- **Customer:** Manages application code, user management, and access controls.
x??

---


#### Hardened-Perimeter vs Zero-Trust Security Models
Background context: The traditional hardened-perimeter security model has been widely used but is now considered vulnerable to both insider and external threats. This model assumes that everything inside the perimeter is trusted, while anything outside is untrusted. However, as security breaches through human targets have increased, this assumption becomes less reliable.
:p What are the limitations of the traditional hardened-perimeter security model?
??x
The limitations include:
- Vulnerability to insider attacks due to trusted insiders potentially compromising internal assets.
- Difficulty in protecting against external threats that can exploit human weaknesses within an otherwise secure network.

Code examples and explanations would not be applicable here as this is a theoretical concept. However, you could illustrate with a simple pseudocode example showing how a traditional security check might be bypassed through social engineering:
```pseudocode
if (userIsInTrustedNetwork) {
    grantAccess();
} else if (canBypassAuthentication(user)) { // Example condition for insider threat
    grantAccess(); // This should not happen in modern security practices
}
```
x??

---

#### Zero-Trust Security Model
Background context: The zero-trust security model is an alternative approach that does not assume anything inside or outside a network to be inherently trusted. It enforces strict authentication and authorization for all entities, regardless of their location.
:p What is the core principle of the zero-trust security model?
??x
The core principle of the zero-trust security model is that no user, device, application, or service should be automatically trusted just because it's inside a network perimeter. Access must be explicitly granted based on least privilege and continuous verification.

Code examples:
```java
public class ZeroTrustAuthenticator {
    public boolean authenticateUser(String username, String password) {
        // Check credentials against the database or identity provider
        if (isValidUser(username, password)) {
            return true;
        } else {
            logFailedAuthenticationAttempt(username);
            return false;
        }
    }

    private boolean isValidUser(String username, String password) {
        // Implementation to validate user credentials
        return users.contains(username) && passwords.get(username).equals(password);
    }

    private void logFailedAuthenticationAttempt(String username) {
        // Log the failed attempt for monitoring and security purposes
    }
}
```
x??

---

#### Shared Responsibility Model in Cloud Providers
Background context: The shared responsibility model divides security responsibilities between cloud providers and their customers. AWS, as an example, is responsible for securing its infrastructure and services, while users are responsible for securing their applications and data.
:p What does the shared responsibility model entail in a cloud environment?
??x
In a cloud environment, the shared responsibility model entails that:
- Cloud providers like AWS are responsible for securing the underlying infrastructure running their services (cloud).
- Users are responsible for securing their own applications, data, and how they use the services provided by the cloud provider.

Code examples illustrating this concept might include setting up security policies in an AWS environment. Here’s a simple example of configuring a VPC with no external connectivity:
```java
// Pseudocode to set up a VPC with restricted access
public class VpcSetup {
    public void configureVpc(String vpcId) {
        // Set up VPC rules to allow only necessary traffic and restrict everything else
        if (isInternalTraffic(vpcId)) {
            grantAccess();
        } else {
            denyAccess();
        }
    }

    private boolean isInternalTraffic(String vpcId) {
        // Logic to determine if the traffic is internal or external
        return true; // Simplified example
    }

    public void grantAccess() {
        // Grant necessary access
    }

    public void denyAccess() {
        // Deny all other access
    }
}
```
x??

---

#### Data Engineers as Security Engineers
Background context: With the shift to cloud-native architectures and the erosion of traditional perimeter security, data engineers are increasingly responsible for designing and implementing robust security measures. This includes understanding the shared responsibility model and taking an active role in securing applications and data.
:p Why should data engineers consider themselves security engineers?
??x
Data engineers should consider themselves security engineers because:
- They are often responsible for the security of the applications and data they develop, even if not explicitly in a security role.
- Traditional perimeter-based security is less effective due to increased internal threats from human targets and external threats that can exploit connected devices.

Code examples might involve implementing encryption or access controls within an application developed by a data engineer:
```java
public class DataSecurityManager {
    public void encryptData(String data) {
        // Implementation of data encryption logic
        String encryptedData = encrypt(data);
        storeEncryptedData(encryptedData); // Store the encrypted data securely
    }

    private String encrypt(String data) {
        // Logic to encrypt the data
        return "ENCRYPTED_" + data;
    }

    private void storeEncryptedData(String encryptedData) {
        // Securely storing the encrypted data, e.g., in a database with access controls
    }
}
```
x??

---


#### Tight Versus Loose Coupling: Tiers, Monoliths, and Microservices
Background context explaining the concept of coupling in data architecture. This involves understanding how dependencies within domains and services can be either tightly or loosely coupled, which affects the reliability and flexibility of the system.

If applicable, add code examples with explanations.
:p What is a key difference between tight and loose coupling in the context of data architecture?
??x
In tight coupling, every part of a domain and service is vitally dependent upon every other domain and service. In contrast, loosely coupled systems have decentralized domains and services that do not strictly depend on each other. Loose coupling allows for greater flexibility and reliability since changes or failures in one area are less likely to impact others.

For example:
- Tight Coupling: A change in the business logic layer requires recompiling and redeploying the entire application.
- Loose Coupling: A change in a specific service only affects that service, without impacting other services.
??x
The answer with detailed explanations.
```java
// Example of tight coupling
public class App {
    private Database db;
    private Logic logic;

    public App() {
        this.db = new Database();
        this.logic = new Logic(db);
    }
}

// Example of loose coupling
public class ServiceA {
    private IDatabaseService dbService;

    public ServiceA(IDatabaseService dbService) {
        this.dbService = dbService;
    }

    // Methods using dbService without direct dependency on specific implementations
}
```
x??

---

#### Single-Tier Architecture
Background context explaining the concept of a single-tier architecture, where the database and application are tightly coupled on a single server. This setup is good for prototyping but not suitable for production environments due to its vulnerabilities.

:p What is an example scenario where a single-tier architecture would be used?
??x
A single-tier architecture is often used in development environments or during the early stages of application development when simplicity and ease of deployment are more critical than robustness. For instance, it might be employed on a developer’s local machine for testing purposes.

:p What are some limitations of using a single-tier architecture in production?
??x
Single-tier architectures present significant limitations in production due to their tightly coupled nature:

- Single points of failure: If the server fails, all services fail.
- Resource contention: The database and application compete for limited resources (disk, CPU, memory), which can lead to performance issues or even system downtime.
- Inability to run complex queries against the production database without risking system availability.

:p How does a single-tier architecture handle redundancy?
??x
Even when redundancies are implemented, such as failover replicas, single-tier architectures still face limitations. For example, running analytics queries on the main application database could overwhelm it and cause the entire system to become unavailable.

:x
The answer with detailed explanations.
```java
// Example of a simple single-tier setup
public class MyApp {
    private Database db;
    private ApplicationLogic logic;

    public MyApp() {
        this.db = new Database();
        this.logic = new ApplicationLogic(db);
    }
}
```
x??

---

#### Multitier Architecture
Background context explaining the concept of multitier architecture, where layers are separated to achieve maximum reliability and flexibility. A common example is a three-tier architecture.

:p What are the benefits of using a multitier architecture?
??x
The primary benefit of a multitier architecture is improved reliability and flexibility:

- Separation of concerns: Each layer can be developed and maintained independently.
- Scalability: Resources can be distributed across layers, allowing for better performance management.
- Fault isolation: If one service fails, it does not necessarily affect the entire system.

:p What are the different tiers typically found in a multitier architecture?
??x
A typical multitier architecture consists of:

1. Data Tier: Handles data storage and retrieval.
2. Application Logic Tier: Contains business rules and application logic.
3. Presentation Tier: Manages user interfaces and interactions.

:p How does resource contention play into the design considerations for a multitier architecture in distributed systems?
??x
In a distributed system, designers need to consider whether nodes should handle requests independently (shared-nothing architecture) or share resources such as memory, disk, and CPU. Decisions here can significantly impact performance and reliability.

:p How does resource sharing affect data access and performance in a multitier architecture?
??x
Resource sharing can improve performance by allowing multiple nodes to handle requests concurrently, but it also increases the risk of contention for shared resources (e.g., database connections). In a shared-nothing architecture, each node handles its own requests without relying on other nodes. However, this approach may limit scalability.

:x
The answer with detailed explanations.
```java
// Example of a simple multitier setup
public class DataTier {
    // Data handling logic
}

public class ApplicationLogicTier {
    private DataTier dataTier;

    public ApplicationLogicTier(DataTier dataTier) {
        this.dataTier = dataTier;
    }

    // Business logic and application processing
}

public class PresentationTier {
    private ApplicationLogicTier appLogicTier;

    public PresentationTier(ApplicationLogicTier appLogicTier) {
        this.appLogicTier = appLogicTier;
    }

    // UI logic and user interaction handling
}
```
x??

---

#### Monoliths
Background context explaining the concept of monolithic architectures, where all components are tightly coupled within a single codebase. Discusses technical and domain coupling.

:p What is an example scenario where a monolith would be used?
??x
Monoliths are often used in small-scale applications or during the early stages of development when simplicity and rapid deployment are more critical than scalability or maintainability. They can simplify initial development by reducing complexity, as all components are tightly coupled within one codebase.

:p What is technical coupling in a monolith?
??x
Technical coupling refers to how different architectural tiers (e.g., data, application logic) are intertwined within the single codebase of a monolith. This tight integration makes it difficult to isolate or replace specific components without affecting others.

:p How does domain coupling differ from technical coupling in a monolith?
??x
Domain coupling refers to how different domains (business units, services) interact and depend on each other within a monolith. While technical coupling is about the architectural tiers, domain coupling involves the logical integration of various business functions.

:p What are some challenges when refactoring a monolith into microservices?
??x
Refactoring a monolith into microservices can be complex due to the tight dependencies between components and services:

- High initial effort: Extracting and defining boundaries for each service requires significant rework.
- Risk of unintended consequences: Improving one component might negatively impact others, leading to "whack-a-mole" scenarios.

:p How does a monolith evolve into a big ball of mud?
??x
A big ball of mud occurs when the complexity of a monolithic architecture grows without proper refactoring or modularization. Over time, the codebase becomes harder to understand and maintain, with many dependencies that are difficult to untangle.

:x
The answer with detailed explanations.
```java
// Example of a complex monolith
public class Monolith {
    private Data data;
    private Logic logic;

    public Monolith() {
        this.data = new Data();
        this.logic = new Logic(data);
    }

    // Complex interdependencies between components
}
```
x??

---

#### Microservices Architecture
Background context explaining the concept of microservices, which are separate and loosely coupled services that provide specific functions. Discusses the differences from monoliths.

:p How does a microservices architecture differ from a monolithic architecture?
??x
Microservices architecture differs fundamentally from monoliths by introducing decentralization and loose coupling:

- **Decentralized Services:** Each service has its own database, making it independent.
- **Loose Coupling:** Services operate independently; failure in one service does not affect others.

:p What is a common approach to converting an existing monolith into microservices?
??x
Converting a monolith into microservices typically involves the following steps:

1. Identify bounded contexts: Determine distinct business domains that can become individual services.
2. Extract components: Gradually refactor and separate parts of the monolith into standalone services.
3. Introduce service boundaries: Clearly define APIs for communication between services.

:p What are the benefits of a microservices architecture?
??x
Benefits of microservices include:

- **Scalability:** Services can scale independently based on demand.
- **Resilience:** Failure in one service does not bring down others.
- **Maintainability:** Smaller, more focused services are easier to develop and maintain.

:p What challenges might arise when implementing a microservices architecture?
??x
Challenges include:

- Complexity: Managing multiple services can be complex due to distributed nature.
- Deployment complexity: Each service needs its own deployment strategy.
- Dependency management: Services depend on each other, requiring careful API design.

:x
The answer with detailed explanations.
```java
// Example of a microservices-based architecture
public interface IDatabaseService {
    // Service-specific database operations
}

public class ServiceA implements IDatabaseService {
    private Database db;

    public ServiceA(Database db) {
        this.db = db;
    }

    @Override
    public void performAction() {
        // Specific logic for ServiceA
    }
}
```
x??

---

