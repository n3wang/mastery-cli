# High-Quality Flashcards: Sam-Newman---Building-Microservices-OReilly-Media-2015_processed (Part 7)


**Starting Chapter:** Access by Reference

---


#### Services as State Machines
Background context: The core idea of services being state machines is crucial for microservices architecture. Each service owns its bounded context and handles all logic related to that context, ensuring coherence. This approach helps manage state changes effectively by centralizing decision-making within the respective service.

:p What does the concept of a "service as a state machine" imply in microservices?
??x
This implies that each service manages its own state and lifecycle events based on the bounded context it owns. The service decides whether to accept or reject requests, ensuring all related logic is encapsulated within the service itself.

Example: A customer service handles all operations related to customers.
```java
public class CustomerService {
    public boolean updateCustomerDetails(CustomerRequest request) {
        // Check if the customer exists and can be updated
        if (customerExistsAndNotRemoved(request.customerId)) {
            // Perform the update
            updateCustomer(request);
            return true;
        }
        return false;
    }

    private boolean customerExistsAndNotRemoved(String customerId) {
        // Logic to check if the customer is still active
    }

    private void updateCustomer(CustomerRequest request) {
        // Logic to update customer details
    }
}
```
x??

---


#### Reactive Extensions (Rx)
Background context: Reactive extensions are a mechanism for composing and reacting to multiple calls in an observable manner. They help manage asynchronous operations and handle concurrent calls more efficiently, making the code easier to reason about.

:p What is the main purpose of using reactive extensions in distributed systems?
??x
The main purpose is to abstract away the details of how calls are made and allow developers to focus on reacting to changes rather than managing asynchronous call chains. This makes handling multiple service calls for a single operation much simpler and more manageable.

Example: Observing the result of a downstream service call.
```java
import io.reactivex.rxjava3.core.Observable;

Observable<String> observeServiceCall(String serviceUrl) {
    return Observable.fromCallable(() -> makeServiceCall(serviceUrl));
}

private String makeServiceCall(String url) {
    // Simulated network call
    try {
        Thread.sleep(1000);
    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
    }
    return "Response from service";
}
```
x??

---


#### DRY and Code Reuse in Microservices
Background context: The DRY principle, or don't repeat yourself, is crucial for maintaining a clean and maintainable codebase. In microservices, it's essential to avoid duplicating behavior and knowledge across services while ensuring that the system remains cohesive.

:p How does the DRY principle apply differently in a microservice architecture?
??x
In microservices, DRY applies by avoiding duplicated logic within different services. Instead of replicating functionality in multiple services, common operations can be abstracted into shared libraries or functions. This ensures that changes are made in one place and propagated across services without duplicating effort.

Example: Reusing a function to check customer existence.
```java
public class CustomerService {
    private final boolean checkCustomerExists(String customerId) {
        // Logic to check if the customer exists
    }

    public boolean updateCustomerDetails(CustomerRequest request) {
        if (checkCustomerExists(request.customerId)) {
            // Proceed with updating details
        } else {
            return false;
        }
        return true;
    }
}
```
x??

---

---


#### DRY Principle in Microservices
Background context explaining the importance of DRY (Don't Repeat Yourself) principle and how it leads to reusability. However, it also mentions potential pitfalls when used incorrectly in microservice architectures.

:p What does DRY stand for and why is it important?
??x
The DRY principle stands for "Don't Repeat Yourself." It emphasizes the importance of reducing duplication in code to avoid errors due to inconsistent changes. When applied correctly, this leads to more maintainable and efficient code by abstracting common behaviors into reusable components.

However, in a microservice architecture, applying DRY across all services can lead to tight coupling between services. This is because any change in shared code may require updates in multiple services, leading to unnecessary disruptions and potential bugs.
x??

---


#### Coupling in Microservices
Explanation of the dangers of too much coupling between microservices, especially when shared common domain objects or libraries are used.

:p What can happen if shared common domain objects or libraries are not managed carefully in a microservice architecture?
??x
If shared common domain objects or libraries are not managed carefully, changes to these shared components can cause cascading updates across multiple services. This can lead to issues such as:
- Services needing to be updated and redeployed.
- Message queues becoming invalid due to changed message formats.
- Potential bugs arising from forgotten updates.

For example, if a common domain object in a library is changed, all services using this library will need to be updated, which can disrupt the system's operation and introduce new bugs if not done properly.
x??

---


#### Client Libraries in Microservices
Explanation of the pros and cons of creating client libraries for microservices, especially regarding logic leakage and technology constraints.

:p What are the potential problems with creating client libraries for your services?
??x
Creating client libraries can lead to several issues:
- **Logic Leakage:** If the same team creates both server APIs and client libraries, there is a risk that logic intended for the server starts leaking into the client library. This can cause maintenance issues where changes need to be rolled out in multiple clients.
- **Technology Constraints:** Mandating the use of specific client libraries can limit technology choices. For instance, if a client library must be used, developers might be forced to stick with certain programming languages or frameworks.

For example, if a server API method requires complex logic that should remain on the server side but is implemented in the client library, changes to this logic would need to be rolled out in all clients, causing unnecessary disruptions.
x??

---


#### Client Library Approach and Its Pitfalls

Background context: The client library approach is a method used to manage service communication in distributed systems, particularly at large scales like those seen by Netflix. It involves encapsulating common functionalities such as service discovery, failure handling, logging, etc., within the client code. This ensures that these aspects are consistently managed across different services, avoiding individual re-implementations and promoting reliability and scalability.

If applicable, add code examples with explanations:
```java
// Pseudocode for a simple service client library
public class ServiceClient {
    public void upgradeService() { /* logic to handle upgrades */ }
    public boolean handleFailureMode() { /* logic to manage failures */ }
}
```

:p What are the key benefits of using a client library in distributed systems?
??x
Using a client library in distributed systems ensures reliability and scalability by handling common functionalities such as service discovery, failure modes, logging, etc., consistently across different services. This approach minimizes code duplication and enhances maintainability.
x??

---


#### Client Library vs. Client Code Independence

Background context: The separation of client code from the underlying transport protocol is crucial to ensure that services can be upgraded independently without affecting each other. Netflix places significant emphasis on maintaining this independence, as over time, tight coupling between clients and servers can lead to problematic dependencies.

:p Why is it important for clients to manage when they upgrade their libraries?
??x
Clients should manage when they upgrade their client libraries to ensure that services can be released independently of each other. This separation allows for more flexible deployment strategies and reduces the risk of cascading failures during updates.
x??

---


#### Passing Domain Entities by Reference

Background context: In microservices architecture, domain entities such as `Customer` should have their lifecycle managed within a single service to maintain consistency and integrity. When retrieving data, it is important to consider the possibility that other services might have modified the entity since the last retrieval.

:p How can you ensure your system has up-to-date information about a domain entity?
??x
To ensure your system has up-to-date information about a domain entity, pass around references to the original resources instead of complete copies. Include this reference in any entity representations so that if changes are needed, the latest state can be retrieved from the source service.

For example:
```java
public class CustomerReference {
    private String customerId;
    public CustomerReference(String customerId) { this.customerId = customerId; }
    public String getCustomerId() { return customerId; }
}
```
x??

---


#### Managing Memory and State Consistency

Background context: In microservices, maintaining the integrity of domain entities is crucial. When you retrieve an entity from a service, it's important to understand that other services might have updated this entity since your last retrieval. Keeping a memory of what the entity looked like when you requested it can be useful but risks becoming stale.

:p What should you do to ensure you have the most recent state of a domain entity?
??x
To ensure you have the most recent state of a domain entity, pass around references to the original resources rather than complete copies. Include this reference in any entity representations so that if changes are needed, the latest state can be retrieved from the source service.

For example:
```java
public class Customer {
    private String id;
    private String name;
    public Customer(String id, String name) { this.id = id; this.name = name; }
    
    // Getter for ID to pass as a reference
    public String getId() { return id; }
}
```
x??

---

---


#### Resource Referencing vs. Including Full Data
In scenarios where services need to interact, it's often debated whether to send full data or just a reference. The decision hinges on performance, coupling, and the freshness of data.

:p How does sending a URI for Customer and Order resources instead of including all details affect service interactions?
??x
Sending a URI can reduce the load on the originating service by deferring the lookup of detailed information to the time when it is actually needed. This approach minimizes the amount of data passed in initial requests, which can be beneficial especially if dealing with many concurrent updates.

Example: 
If an email service is triggered upon shipping an order and needs customer details to compose an email, sending a URI for the Customer resource allows the email service to fetch the latest details when it's ready to send the email. This reduces the initial request payload but requires additional queries later.
```java
public class EmailService {
    public void sendEmailWhenOrderShipped(String customerId) {
        // Fetch customer details and order status from their respective services
        CustomerDetails customer = customerService.getCustomer(customerId);
        OrderStatus orderStatus = orderService.getOrderStatus(customerId);
        
        // Compose the email content using customer name, etc.
        String emailContent = "Dear " + customer.getName() + ", your order has been shipped. Details: " + orderStatus;
        sendEmail(customer.getEmail(), emailContent);
    }

    private void sendEmail(String emailAddress, String content) {
        // Logic to send the email
    }
}
```
x??

---


#### Event-Based Collaboration and Entity Updates
When using event-based collaboration, it's crucial to understand not only that something has happened but also what exactly changed. This approach requires careful handling of entity states.

:p Why is it important to know both "this happened" and "what happened" in an event-driven system?
??x
In an event-driven architecture, simply knowing that a certain event occurred might not be sufficient. The state or context under which the event took place is also critical. For instance, if a customer's address changes, it’s important to know what the previous address was and when this change happened.

Example: 
Consider an event triggered by a customer changing their payment method. While knowing that the event occurred is important, understanding the specifics of the change (e.g., from card to PayPal) can help in managing user experience or performing additional checks.
```java
public class CustomerEvent {
    private String customerId;
    private EventTimestamp timestamp;
    private ChangeDetails changeDetails;

    public CustomerEvent(String customerId, EventTimestamp timestamp, ChangeDetails changeDetails) {
        this.customerId = customerId;
        this.timestamp = timestamp;
        this.changeDetails = changeDetails;
    }

    // Getters and setters
}

public class ChangeDetails {
    private String previousPaymentMethod;
    private String newPaymentMethod;

    public ChangeDetails(String previousPaymentMethod, String newPaymentMethod) {
        this.previousPaymentMethod = previousPaymentMethod;
        this.newPaymentMethod = newPaymentMethod;
    }
}
```
x??

---


#### Caching and Freshness of Data
Caching is a common solution to reduce the load on services by storing recent data. However, managing cache freshness can be complex.

:p How does HTTP support caching in a service-oriented architecture?
??x
HTTP provides several mechanisms for controlling and managing cache freshness through headers such as `Cache-Control`, `ETag`, and `Last-Modified`. These headers allow services to specify how long cached content should remain fresh and under what conditions the cache should be invalidated.

Example: 
Using HTTP Cache Control Headers:
```java
import javax.servlet.http.HttpServletResponse;

public class CustomerController {
    @GetMapping("/customer/{id}")
    public ResponseEntity<Customer> getCustomer(@PathVariable Long id) {
        // Retrieve customer from database or service
        Customer customer = customerService.getCustomerById(id);
        
        // Set cache control headers to allow caching for 10 minutes
        HttpServletResponse response = (HttpServletResponse) HttpContext.current().getResponse();
        response.setHeader("Cache-Control", "public, max-age=600"); // Cache for 10 minutes
        
        return ResponseEntity.ok(customer);
    }
}
```
x??

---


#### Reducing Coupling with Dumb Services
In some architectures, dumb services are preferred over smart services that handle more logic. This can reduce coupling and simplify service interactions.

:p Why might an email service be designed to be "dumb" instead of receiving a full customer profile?
??x
Designing the email service to be "dumb" means it receives only necessary data like the customer’s name and email address, without detailed information about the customer. This approach minimizes coupling between services and reduces the risk of one service becoming dependent on another.

Example: 
An email service that receives minimal details:
```java
public class EmailService {
    public void sendEmail(String toAddress, String subject, String body) {
        // Logic to send an email using the provided information
    }
}

// Usage in another service or controller
public class OrderShipmentService {
    private final EmailService emailService;

    public OrderShipmentService(EmailService emailService) {
        this.emailService = emailService;
    }

    public void handleOrderShipped(Order order, Customer customer) {
        String subject = "Your Order Has Been Shipped";
        String body = "Dear " + customer.getName() + ", your order with ID " + order.getId() + " has been shipped.";
        
        // Send the email using minimal data
        emailService.sendEmail(customer.getEmail(), subject, body);
    }
}
```
x??

---

---


---
#### Defer Breaking Changes as Long as Possible
Background context: The best way to reduce the impact of making breaking changes is to avoid them altogether. This can be achieved by picking the right integration technology and encouraging good behavior from clients.

:p How can you defer a breaking change in a service?
??x
To defer a breaking change, you should design your service interfaces to be as flexible as possible so that even when internal structures or data fields are altered, external consumers are unaffected. This is achieved by using technologies that allow for loose coupling between services and clients.

For example, instead of tightly binding all fields from the database response, use a reader (like XPath in XML) that can selectively extract only necessary fields.
```xml
// Example of an XPATH query to extract needed fields
String xpathQuery = "/customer/(firstname | lastname | email)";
```
x??

---


#### Tolerant Reader Pattern
Background context: A tolerant reader is designed to ignore changes it doesn't care about, allowing the service provider to modify internal structures without breaking external consumers. This pattern aligns with Martin Fowler's principle of building services that can tolerate changes in their input/output.

:p What is a tolerant reader and how does it work?
??x
A tolerant reader is a design pattern where the consumer reads data from a service in such a way that it gracefully handles any changes to the format or structure of the data provided by the service. The idea is to make the reader as flexible as possible, so it can continue functioning even if the provider introduces new fields or restructures existing ones.

For instance, consider an email sending service that needs only `firstname`, `lastname`, and `email` from a customer's data. Instead of expecting these specific elements in a fixed location, use XPath (or equivalent) to dynamically locate them.
```xml
// Example using XPath
String xml = "<customer>    <firstname> Sam </firstname>    <lastname> Newman </lastname>    <email> sam@magpiebrain.com </email>    <telephoneNumber> 555-1234-5678 </telephoneNumber></customer>";
XPath xPath = XPathFactory.newInstance().newXPath();
String firstname = xPath.evaluate("//firstname", xml);
String lastname = xPath.evaluate("//lastname", xml);
String email = xPath.evaluate("//email", xml);
```
x??

---


#### Postel's Law (Robustness Principle)
Background context: This principle, also known as the robustness principle or "Be conservative in what you do, be liberal in what you accept from others," is a fundamental guideline for designing and interacting with systems that can tolerate changes. It applies particularly well to RESTful APIs where services might evolve over time.

:p What does Postel's Law state and how can it help manage versioning?
??x
Postel's Law states that software should be as conservative as possible in its behavior (i.e., strictly adhere to the defined protocol or specification) while being as liberal as possible in interpreting data received from others. In the context of managing microservices, this means designing services and clients to handle unexpected changes gracefully.

By following Postel’s Law, a service can remain robust even if an external client introduces new fields or modifies existing ones unexpectedly. This flexibility helps manage versioning more effectively by reducing the likelihood of breaking changes affecting downstream consumers.
```java
// Example of a Java method that follows Postel's Law
public void sendEmail(String customerId) {
    Customer customer = customerService.getCustomerById(customerId);
    String firstName = extractValue(customer, "firstname");
    String lastName = extractValue(customer, "lastname");
    String email = extractValue(customer, "email");

    // Send the email using the extracted values
}
```
x??

---

---


#### Catch Breaking Changes Early
Background context: It is essential to detect breaking changes early in a service's lifecycle. Consumer-driven contracts and running tests with client libraries can help identify these issues before they affect consumers.

:p How can you catch breaking changes early?
??x
To catch breaking changes early, use consumer-driven contracts as described in Chapter 7. Additionally, run integration tests using each supported client library against the latest service to ensure compatibility.
??x

---


#### Use Semantic Versioning
Background context: Semantic versioning is a specification that helps clients understand what changes will be backward compatible with their applications. The version number format (MAJOR.MINOR.PATCH) provides clear expectations.

:p What is semantic versioning and how does it work?
??x
Semantic versioning specifies the MAJOR, MINOR, and PATCH version numbers to indicate types of changes:
- Major: Backward incompatible changes.
- Minor: New functionality that should be backward compatible.
- Patch: Bug fixes for existing functionality.

Example use case:
If our helpdesk application works with customer service v1.2.0, it can safely upgrade to v1.3.0 (new minor version) but not v1.1.0 (backward incompatible changes). It may need changes when upgrading to v2.0.0.
??x

---


#### Coexist Different Endpoints
Background context: Coexisting different versions of endpoints allows gradual migration of consumers while maintaining the ability to release microservices independently.

:p How can you handle coexistence of different endpoint versions?
??x
To handle coexistence, deploy a new version of the service that exposes both old and new interfaces. Gradually transition consumers from using the old interface to the new one. Once all consumers are no longer using the old endpoint, remove it.
??x

---


#### Transforming Requests for Coexisting Endpoints
Background context: When coexisting different endpoint versions, a transformation layer can help manage transitions smoothly.

:p How does transforming requests work in coexisting endpoints?
??x
Transforming requests involves mapping older API calls to newer ones. For example, internally transform all V1 requests to V2 and then to the final version as consumers migrate.
??x

---


#### URI vs Header for Routing Requests
Background context: Deciding between using URIs or request headers for routing requests can impact design choices based on how clients interact with services.

:p How do you route requests when coexisting different endpoint versions?
??x
For HTTP, use both version numbers in request headers (e.g., `X-API-Version`) and in the URI path (e.g., `/v1/customer/` or `/v2/customer/`). For RPC, methods can be namespaced differently (e.g., `v1.createCustomer` and `v2.createCustomer`).
??x

---

