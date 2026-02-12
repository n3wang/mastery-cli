# High-Quality Flashcards: Sam-Newman---Building-Microservices-OReilly-Media-2015_processed (Part 9)


**Starting Chapter:** On Your Own Terms

---


#### Fragment-Based Assembly for Websites vs Backends-for-Frontends for Mobile Apps
This concept involves leveraging different architectural approaches depending on the use case. The key is to maintain cohesion and ensure that logic associated with core operations lives within dedicated services, rather than being scattered throughout the system.
:p How can an organization effectively utilize a hybrid approach when developing both websites and mobile applications?
??x
An organization can adopt fragment-based assembly for building a website, focusing on modular components. Simultaneously, it can use a backends-for-frontends approach for its mobile application to optimize performance and user experience specific to the device. This way, the logic associated with core functionalities like ordering music or updating customer details remains encapsulated within their respective services.
??x
The organization benefits from maintaining clear boundaries between components, ensuring that the website's front-end is assembled from reusable fragments while the mobile app communicates efficiently with backend APIs tailored for mobile devices.
```java
// Pseudocode for fragment-based assembly in a web application
public class WebsiteBuilder {
    public void assembleWebPage(Fragment[] fragments) {
        // Assemble web page using provided fragments
    }
}

// Pseudocode for backends-for-frontends approach in a mobile app
public class MobileAppServiceClient {
    private String backendUrl;

    public MobileAppServiceClient(String url) {
        this.backendUrl = url;
    }

    public void fetchCustomerDetails() {
        // Make request to the backend API to fetch customer details
    }
}
```
x??

---


#### Integration Spaghetti and Proprietary Protocols
The integration process can become overly complex when tools use different protocols or allow direct access to their data stores, leading to coupling issues.
:p What challenges arise from the use of proprietary protocols and direct database access in integrating with software products?
??x
Challenges include:
1. **Protocol Incompatibility**: Tools might use various communication protocols (e.g., proprietary binary, SOAP, XML-RPC), making integration difficult and potentially requiring custom solutions for each.
2. **Direct Database Access**: Allowing direct access to the database can lead to tight coupling between your application and the product’s internal structure, increasing maintenance complexity.
3. **Lack of Standardization**: Without a standard protocol or API, integrating multiple tools can result in spaghetti code, making the system hard to maintain and extend.
??x
These issues emphasize the need for standardized integration methods and careful consideration when selecting tools that will be integrated into your ecosystem.
```java
// Pseudocode to illustrate potential integration complexity
public class IntegrationManager {
    public void integrateTool(String toolName) {
        if (toolSupportsStandardProtocol(toolName)) {
            // Use standard protocol
        } else if (toolHasCustomAPI(toolName)) {
            // Use custom API
        } else if (toolAllowsDirectDBAccess(toolName)) {
            // Handle direct DB access with caution
        }
    }

    private boolean toolSupportsStandardProtocol(String toolName) {
        return true; // Example placeholder
    }

    private boolean toolHasCustomAPI(String toolName) {
        return false; // Example placeholder
    }

    private boolean toolAllowsDirectDBAccess(String toolName) {
        return false; // Example placeholder
    }
}
```
x??

---


#### Multirole CRM System
The text discusses the challenges of using Customer Relationship Management (CRM) tools in an enterprise environment. These tools often try to do everything and can become a single point of failure due to their extensive feature sets.

Over time, such tools can lead to a tangled web of dependencies between various internal systems that use the CRM APIs for integration. This can make it difficult to control the direction and choices made around the system, which are typically dictated by the vendor rather than the enterprise itself.

To regain some control over the system, the text suggests identifying core domain concepts currently handled by the CRM and creating façade services that abstract these concepts. These services expose resources in a RESTful manner, making it easier for external systems to integrate with them.

By using façade services, internal systems can be decoupled from the CRM's APIs, allowing for more flexible and maintainable integration points. This approach lays the groundwork for potential migrations or replacements of the CRM tool.

:p How does creating façade services help in managing dependencies on a multirole CRM system?
??x
Creating façade services helps in managing dependencies on a multirole CRM system by abstracting away the underlying complexities and exposing only necessary domain concepts as RESTful resources. This decouples internal systems from the CRM's APIs, making it easier to integrate with them.

The advantage is that each internal system can interact with these façade services using standard HTTP requests, reducing the complexity of integration. Additionally, if a different CRM tool needs to be chosen or replaced in the future, the change can be implemented by updating the façades rather than rewriting all integrations directly against the new system's APIs.

```java
public class ProjectService {
    private final CRM crm;

    public ProjectService(CRM crm) {
        this.crm = crm;
    }

    // Method to fetch project details from the CRM
    @GetMapping("/projects/{projectId}")
    public ResponseEntity<ProjectResource> getProject(@PathVariable String projectId) {
        Project project = crm.getProject(projectId);
        return new ResponseEntity<>(new ProjectResource(project), HttpStatus.OK);
    }

    // Internal method for converting project model to resource
    private ProjectResource convertToResource(Project project) {
        return new ProjectResource(
            project.getId(),
            project.getName(),
            project.getDescription()
        );
    }
}
```
x??

---

---


#### Strangler Application Pattern
The Strangler Application Pattern is a useful approach when dealing with legacy or third-party systems that are not fully under our control. This pattern allows us to gradually replace existing functionality without requiring a full rewrite, making it easier to manage and transition away from older, less maintainable systems.
:p What is the Strangler Application Pattern used for?
??x
The Strangler Application Pattern is used to capture and intercept calls to old legacy or third-party systems. By routing these calls through new code, you can replace functionality over time, allowing for a gradual migration rather than a complete rewrite. This approach helps in reducing risk and complexity during the transition.
```java
// Example of intercepting calls using a proxy class
public class LegacySystemProxy {
    private final LegacySystem legacySystem;

    public LegacySystemProxy() {
        this.legacySystem = new LegacySystem();
    }

    public void performAction(String input) {
        // Check if we can route the call to new code or old system
        boolean isNewCodeAvailable = checkForNewCode(input);
        
        if (isNewCodeAvailable) {
            // Direct the call to new code
            newCode.performAction(input);
        } else {
            // Route the call to legacy system
            legacySystem.performAction(input);
        }
    }

    private boolean checkForNewCode(String input) {
        // Logic to determine if new code is available for this input
        return false;
    }
}
```
x??

---


#### Microservices Interception with Proxies
When dealing with microservices, a single monolithic application intercepting all calls to an existing legacy system may not be practical. Instead, you can use a series of microservices to capture and redirect original calls. This approach might require the use of proxies to handle capturing and routing these calls.
:p How do microservices interception using proxies work?
??x
Microservices interception using proxies involves creating multiple small services that collectively handle the redirection of requests from legacy systems to new code. Proxies act as intermediaries, intercepting the original calls and deciding whether to route them to existing legacy code or new microservices. This method allows for a more modular and scalable approach compared to a single monolithic application.
```java
// Example of using a proxy service to intercept calls in microservices architecture
public class LegacyCallProxy {
    private final MicroserviceA microserviceA;
    private final MicroserviceB microserviceB;

    public LegacyCallProxy(MicroserviceA microserviceA, MicroserviceB microserviceB) {
        this.microserviceA = microserviceA;
        this.microserviceB = microserviceB;
    }

    public void processRequest(String input) {
        // Determine which service to route the request to based on input
        if (input.startsWith("A")) {
            microserviceA.handle(input);
        } else if (input.startsWith("B")) {
            microserviceB.handle(input);
        }
    }
}
```
x??

---


#### Avoiding Database Integration in Microservices
Database integration can tightly couple microservices, making it harder to evolve and maintain them independently. To avoid this, it's recommended to use API-based communication where possible. This approach helps keep services decoupled, as changes in one service do not necessarily require updates in others.
:p Why should you avoid database integration in microservices?
??x
Avoiding database integration in microservices is crucial because it tightly couples the services, making them harder to evolve and maintain independently. Instead of directly accessing databases, microservices should communicate through APIs or other message-passing mechanisms. This approach ensures that changes in one service do not necessarily require updates in others.
```java
// Example of API-based communication instead of database integration
public class OrderService {
    public void createOrder(Order order) {
        // Instead of directly inserting into the database, send a request to PaymentService
        PaymentService paymentService = new PaymentService();
        paymentService.createPaymentFor(order);
    }
}

public class PaymentService {
    public void createPaymentFor(Order order) {
        // Logic to handle creating payment for the order through an API call
    }
}
```
x??

---


#### Choreography Over Orchestration in Microservices
Choreography and orchestration are two different ways of managing interactions between microservices. In choreography, each service independently handles its responsibilities, and communication is based on events or messages. In contrast, orchestration centralizes control over the flow of operations.
:p What's the difference between choreography and orchestration in microservices?
??x
Choreography and orchestration are two different paradigms for managing interactions between microservices.

- **Orchestration**: Centralizes control over the flow of operations. A single service dictates the sequence of actions that need to be performed by other services.
- **Choreography**: Each service independently handles its responsibilities, and communication is based on events or messages. There is no centralized authority dictating the interactions between services.

Choreography is generally more flexible but requires more coordination among services, while orchestration provides better control over the flow of operations but can become complex as the number of services increases.
```java
// Example of choreography (each service handles its own logic independently)
public class NotificationService {
    public void sendNotification(Order order) {
        // Logic to send notification for a new order
    }
}

public class PaymentService {
    public void processPayment(Order order) {
        // Logic to handle payment processing
        NotificationService notificationService = new NotificationService();
        notificationService.sendNotification(order);
    }
}
```
x??

---


#### Postel's Law and Tolerant Readers in Microservices
Postel's Law, also known as the robustness principle, suggests that software should be conservative in its sending and liberal in its receiving. In microservices, this translates to tolerant readers: services should be designed to handle unexpected data gracefully without breaking.
:p What is Postel's Law and why is it important in microservices?
??x
Postel's Law, also known as the robustness principle, suggests that software should be conservative in its sending and liberal in its receiving. In microservices, this means designing services to handle unexpected data or messages gracefully without breaking.

- **Conservative in Sending**: Ensure that your service adheres strictly to the protocol specifications when sending data.
- **Liberal in Receiving**: Be prepared to handle unexpected data formats or malformed messages from other services.

This approach helps ensure robustness and resilience, as services can continue functioning even if they encounter issues with incoming data.
```java
// Example of a tolerant reader design following Postel's Law
public class OrderProcessor {
    public void processOrder(Order order) {
        try {
            // Logic to process the order
        } catch (IllegalArgumentException e) {
            // Handle invalid input gracefully
            System.out.println("Received an invalid order: " + e.getMessage());
        }
    }
}
```
x??

---


#### Decomposing Monolithic Applications into Microservices
Monolithic applications grow over time and can become unwieldy, making it difficult to evolve their design. To address this, you can decompose the monolith into smaller microservices, each handling a specific domain or functionality.
:p How do you handle decomposing monolithic applications into microservices?
??x
Decomposing monolithic applications into microservices involves breaking down the large application into smaller, independent services that focus on specific functionalities. This approach allows for better scalability, maintainability, and easier evolution of individual components.

To start this process:
1. **Identify bounded contexts**: Determine the different domains or subdomains within your application.
2. **Design microservices**: Create small, loosely coupled services based on these bounded contexts.
3. **Ensure loose coupling**: Services should communicate through APIs rather than sharing databases directly.
4. **Gradual migration**: Start with small changes and gradually replace functionality in the monolith with new microservices.

By following these steps, you can effectively decompose a monolithic application into more manageable and scalable microservices.
```java
// Example of identifying bounded contexts for decomposition
public class BoundedContext {
    public static void main(String[] args) {
        // Identify different domains or subdomains (bounded contexts)
        String contextA = "User Management";
        String contextB = "Order Processing";

        // Decompose into microservices based on these contexts
        MicroserviceA microserviceA = new MicroserviceA(contextA);
        MicroserviceB microserviceB = new MicroserviceB(contextB);

        // Gradually replace functionality in the monolith with these services
    }
}

class MicroserviceA {
    public MicroserviceA(String context) {
        System.out.println("Initializing " + context);
    }

    public void handleUserRequest(UserRequest request) {
        // Logic to handle user requests
    }
}
```
x??

---

