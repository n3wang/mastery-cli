# High-Quality Flashcards: Sam-Newman---Building-Microservices-OReilly-Media-2015_processed (Part 5)


**Starting Chapter:** Orchestration Versus Choreography

---


#### Synchronous Communication
Background context explaining synchronous communication. Synchronous communication involves a call to a remote server, which blocks until the operation completes. This method is straightforward and easy to reason about since we know when things have completed successfully or not.
:p What is synchronous communication?
??x
Synchronous communication refers to a mode of interaction where a client waits for an operation to complete before proceeding. If a request is made to a remote server, it will block until the response is received. This approach ensures that the calling code does not continue execution until it receives the result.
x??

---


#### Asynchronous Communication
Background context explaining asynchronous communication. In contrast to synchronous calls, with asynchronous communication, the caller doesn’t wait for the operation to complete before returning. This model is particularly useful for long-running jobs and maintaining low latency in applications where blocking a call would degrade performance.
:p What is asynchronous communication?
??x
Asynchronous communication allows a client to initiate an operation without waiting for it to complete. The caller can proceed with other tasks while the server processes the request. Once completed, the server can notify the client through callbacks or events. This approach helps maintain application responsiveness and manage long-running operations efficiently.
x??

---


#### Request/Response Collaboration
Background context explaining the request/response model in collaboration. This model is closely aligned with synchronous communication where a client initiates a request and waits for a response before proceeding. It can also work for asynchronous communication, using callbacks or event-driven mechanisms to handle responses.
:p What is the request/response collaboration model?
??x
The request/response collaboration model involves a client sending a request to a server and waiting for a response. In synchronous scenarios, this means blocking until the operation completes. For asynchronous implementations, it can involve registering callbacks that get invoked once the server has processed the request.
x??

---


#### Event-Based Collaboration
Background context explaining event-based collaboration. This approach inverts the traditional model by having services emit events and allowing other parties to react to them. Events are typically used for handling long-running processes or low-latency scenarios where immediate responses from a central authority are not practical.
:p What is event-based collaboration?
??x
Event-based collaboration allows services to notify others of events that have occurred without directly commanding actions. Other services can subscribe to these events and react accordingly. This model promotes loose coupling and asynchronous communication, making it suitable for complex business processes across multiple services.
x??

---


#### Orchestration vs. Choreography
Background context explaining the differences between orchestration and choreography in managing complex logic spanning service boundaries. Orchestration relies on a central authority to guide and drive processes, while choreography distributes responsibility among collaborating services, allowing them to handle their parts independently.
:p What is orchestration?
??x
Orchestration involves having a central brain (like the customer service in the example) that coordinates and manages the flow of operations. This centralized approach ensures that each step in a process is tracked and monitored, providing visibility into the overall state of the operation.
x??

---


#### Orchestration Example: Customer Creation
Background context providing an example of orchestration for handling complex processes like customer creation. In this scenario, the customer service acts as the central brain, initiating requests to other services (loyalty points bank, email service, and postal system) through request/response calls.
:p What is the orchestration approach in handling customer creation?
??x
The orchestration approach handles customer creation by having a centralized service (customer service) coordinate all actions. For example, when creating a new customer, it might talk to the loyalty points bank, email service, and postal system using synchronous request/response calls. The central brain can track each step's completion status.
```java
// Pseudocode for orchestration approach in Java
public void createCustomer(Customer customer) {
    // Step 1: Create a record in the loyalty points bank
    LoyaltyPointsBank.createRecord(customer);
    
    // Step 2: Send out a welcome pack via postal system
    PostalService.sendWelcomePack(customer);
    
    // Step 3: Send a welcome email to the customer
    EmailService.sendEmail(customer);
}
```
x??

---


#### Choreography Example: Customer Creation
Background context providing an example of choreography for handling complex processes like customer creation. In this scenario, services emit events (e.g., "Customer created") and other services subscribe to these events to react accordingly.
:p What is the choreographed approach in handling customer creation?
??x
The choreographed approach handles customer creation by having the customer service emit an event without directly managing subsequent actions. Other services can subscribe to this event and handle their respective tasks independently.
```java
// Pseudocode for choreography approach in Java
public void createCustomer(Customer customer) {
    // Emit an event that other services can react to
    EventPublisher.emit("Customer created", customer);
}
```
x??

---

---


#### Remote Procedure Calls (RPC)
Background context: Remote procedure call (RPC) is a protocol that allows a program to execute a function on a different machine. It enables a local call to appear as if it were remote, making communication between systems seamless and transparent. RPC technologies can vary in how they handle interface definitions, networking protocols, and the coupling between client and server.

:p What are some types of RPC technology mentioned in the text?
??x
Some types of RPC technology include Java RMI, SOAP, Thrift, Protocol Buffers. These technologies differ in their approach to interface definition, networking protocols used, and how tightly they couple clients with servers.
x??

---


#### Interface Definition for Remote Services
Background context: For some RPC technologies like SOAP, Thrift, or Protocol Buffers, the use of an interface definition is crucial. This helps in generating client and server stubs that can be implemented across different technology stacks.

:p What are the advantages of using a separate interface definition for RPC services?
??x
The main advantage of using a separate interface definition is the ease of generating client and server stubs for various technology stacks, such as Java on one end and .NET on the other. This means that developers can leverage existing tools to create these stubs from a common interface description, simplifying cross-language integration.

Example: Using Thrift to generate client and server stubs:
```bash
thrift --gen java service.thrift
```
This command generates Java code for both the client and server, based on the `service.thrift` file.
x??

---


#### Technology Coupling in RPC
Background context: Some RPC mechanisms are tightly coupled to a specific platform or technology stack. For instance, Java RMI is closely tied to the JVM environment.

:p What are some downsides of tight coupling in RPC technologies?
??x
Tight coupling can limit flexibility and interoperability between clients and servers that use different programming languages or frameworks. For example, using Java RMI means both the client and server must run on JVMs, which may not be feasible if one side needs to use a different runtime environment.

Example: Tight coupling in Java RMI:
```java
// Client code
Remote stub = ...;
CustomerRemote customerService = (CustomerRemote) PortableRemoteObject.narrow(stub, CustomerRemote.class);
Customer customer = customerService.findCustomer("id");

// Server code
public class MyServiceImpl implements CustomerRemote {
    public Customer findCustomer(String id) throws RemoteException {
        // Implementation...
    }
}
```
x??

---


#### Performance Considerations for RPC
Background context: While RPC can make remote calls appear local, there are significant performance differences between making a local call and a networked one. The overhead of marshalling/unmarshalling payloads and sending data over the network can be substantial.

:p Why is it important to consider the difference between local and remote method calls in API design?
??x
It's crucial because local method calls (in-process) are generally faster due to minimal overhead, while remote method calls involve network latency, serialization/deserialization costs, and potential failure points. Developers should optimize remote interfaces differently from local ones, considering factors like performance and reliability.

Example: Comparing local vs. remote call performance:
```java
// Local call (in-process)
public Customer findCustomerLocal(String id) {
    return customers.get(id);
}

// Remote call (networked)
public Customer findCustomerRemote(String id) throws RemoteException {
    // Network latency, serialization, and deserialization overhead
}
```
x??

---


#### Brittleness in RPC Implementation
Background context: Some popular RPC implementations can lead to brittle systems due to the tight coupling of interfaces. Changes in the interface can require updates across multiple clients and servers.

:p What are some ways changes in an RPC interface can cause brittleness?
??x
Changes like adding new methods or fields, removing existing ones, or restructuring data types can propagate throughout the system if not managed carefully. For example, modifying a Java RMI interface may necessitate regenerating stubs for all clients and ensuring server implementations are updated.

Example: Brittleness due to method addition in Java RMI:
```java
// Original interface
public interface CustomerRemote extends Remote {
    public Customer findCustomer(String id) throws RemoteException;
}

// New method added
public interface CustomerRemote extends Remote {
    public Customer findCustomer(String id) throws RemoteException;
    public Customer createCustomer(String emailAddress) throws RemoteException;
}
```
x??

---


#### Network Reliability and Resiliency
Background context: The first fallacy of distributed computing is that "the network is reliable." However, networks can fail or behave unpredictably. Developers must design systems to handle these failures gracefully.

:p What are some considerations for designing resilient RPC services?
??x
Developers should consider the possibility of network unreliability and implement strategies such as retries, timeouts, fallbacks, and circuit breakers. These mechanisms help in maintaining service availability even when network issues occur.

Example: Implementing a retry mechanism:
```java
public Customer findCustomer(String id) {
    int attempts = 3;
    for (int i = 0; i < attempts; i++) {
        try {
            return customerService.findCustomer(id);
        } catch (RemoteException e) {
            if (i == attempts - 1) throw e; // Final attempt, rethrow exception
            log.error("Failed to find customer", e);
        }
    }
}
```
x??

---

---


#### RPC (Remote Procedure Call)
Background context explaining RPC and its common implementations. Highlight the challenges associated with RMI (Remote Method Invocation) and how modern mechanisms like Protocol Buffers or Thrift mitigate some of these issues by avoiding lock-step releases.

:p What are the main characteristics of RPC in terms of implementation?
??x
RPC, particularly older implementations such as RMI, can pose several challenges. One significant issue is that client and server code need to be developed synchronously, leading to potential versioning problems and tight coupling between them. Modern mechanisms like Protocol Buffers or Thrift provide a more flexible approach by abstracting away the serialization/deserialization process of messages, thus reducing the need for synchronous releases.

```java
// Example using Protocol Buffers (protobuf)
message Customer {
  string name = 1;
  int32 id = 2;
}

Service CustomerService {
  rpc GetCustomerById(CustomerId) returns (Customer);
}
```
x??

---


#### Potential Pitfalls of RPC
Background context on common issues that arise with RPC, including how to avoid making remote calls opaque to clients and ensuring the ability to evolve server interfaces without requiring simultaneous client upgrades.

:p What should developers be cautious about when using RPC?
??x
Developers should ensure that their remote calls are not abstracted in such a way that it's impossible for clients to understand they involve network operations. This means avoiding layers of abstraction that obscure network dependencies, which can lead to hidden latency and performance issues. Additionally, the server interface should be designed with future changes in mind, allowing updates without forcing all client code to be upgraded simultaneously.

```java
// Example of a poorly abstracted remote call (bad practice)
public Customer getCustomerById(int id) {
    return customerService.getCustomer(id);
}

// A better approach would be:
public Customer getCustomerById(int id) throws RemoteCallException {
    try {
        return customerService.getCustomer(id);
    } catch (IOException e) {
        throw new RemoteCallException("Network error", e);
    }
}
```
x??

---


#### REST (REpresentational State Transfer)
Background context on REST and its architectural principles. Emphasize the concept of resources, representations, and how HTTP verbs can be used to interact with these resources.

:p What does REST stand for and what are the key concepts it introduces?
??x
REST stands for REpresentational State Transfer, an architectural style inspired by the World Wide Web. The core idea is that a client interacts with server resources through different representations (e.g., JSON, XML). Each resource can be accessed using HTTP verbs like GET, POST, PUT, DELETE to manipulate its state.

```java
// Example of RESTful service interaction
@GetMapping("/customers/{id}")
public ResponseEntity<Customer> getCustomer(@PathVariable Long id) {
    Customer customer = customerRepository.findById(id);
    if (customer == null) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    return new ResponseEntity<>(customer, HttpStatus.OK);
}

@PostMapping("/customers")
public ResponseEntity<Void> createCustomer(@RequestBody Customer customer) {
    Customer savedCustomer = customerRepository.save(customer);
    HttpHeaders headers = new HttpHeaders();
    headers.setLocation(URI.create("/customers/" + savedCustomer.getId()));
    return new ResponseEntity<>(headers, HttpStatus.CREATED);
}
```
x??

---


#### Comparison of REST and HTTP
Background context on the relationship between REST and HTTP. Explain how HTTP verbs provide a natural fit for implementing RESTful services.

:p What are the advantages of using HTTP for implementing REST?
??x
HTTP provides several built-in features that simplify implementing RESTful services, such as predefined verbs (GET, POST, PUT, DELETE) with well-defined semantics. These verbs can be used to perform common CRUD operations on resources. For example, GET is typically used to retrieve a resource, POST for creating new ones, PUT for updating existing ones, and DELETE for removing them.

```java
// Example of using HTTP methods in RESTful service interactions
@GetMapping("/customers/{id}")
public ResponseEntity<Customer> getCustomer(@PathVariable Long id) {
    Customer customer = customerRepository.findById(id);
    if (customer == null) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    return new ResponseEntity<>(customer, HttpStatus.OK);
}

@PostMapping("/customers")
public ResponseEntity<Void> createCustomer(@RequestBody Customer customer) {
    Customer savedCustomer = customerRepository.save(customer);
    HttpHeaders headers = new HttpHeaders();
    headers.setLocation(URI.create("/customers/" + savedCustomer.getId()));
    return new ResponseEntity<>(headers, HttpStatus.CREATED);
}
```
x??

---

---


#### Hypermedia as the Engine of Application State (HATEOAS)
HATEOAS suggests that clients should navigate and interact with resources via hyperlinks, rather than hardcoding URIs.
:p What does HATEOAS stand for?
??x
Hypermedia As the Engine of Application State (HATEOAS) is a principle in RESTful design where interactions are driven by links embedded within responses. Instead of clients knowing specific URI formats, they follow hyperlinks to navigate and perform actions.

```java
// Example of HATEOAS in Java (pseudocode)
public class CustomerController {
    public String getCustomer(String customerId) {
        // Fetch customer details from the server with a link
        return "GET /customer/" + customerId;
    }

    public void processLink(Link link) {
        // Follow the link to perform an action
        System.out.println("Following link: " + link.getHref());
    }
}
```
x??

---

---


#### Hypermedia Controls Overview
Hypermedia controls are a way to provide instructions and navigation within web APIs, similar to how humans interact with shopping carts on websites. This allows clients to discover available actions by following links provided in API responses.

:p What is hypermedia control?
??x
Hypermedia controls are mechanisms within an API that guide the client's interaction by providing links to resources and operations, much like a human user navigating through a website's features such as viewing items in a shopping cart. These controls help clients discover available actions without needing prior knowledge of the exact URIs or APIs.
x??

---


#### Understanding Hypermedia Controls
In Example 4-2, hypermedia controls are represented within an XML document for an album listing. The `link` elements with specific relations like `/artist` and `/instantpurchase` indicate where to navigate.

:p What does a `link` element in the provided example signify?
??x
A `link` element in the provided example signifies navigation points or actions available on the API resource. For instance, `<link rel="/artist" href="/artist/theBrakes"/>` indicates that navigating to `/artist/theBrakes` will provide information about the artist associated with the album. Similarly, `<link rel="/instantpurchase" href="/instantPurchase/1234"/>` suggests a path for purchasing the album.

```xml
<album>
    <name> Give Blood </name>
    <link rel="/artist" href="/artist/theBrakes"/>
    <description> Awesome, short, brutish, funny and loud. Must buy. </description>
    <link rel="/instantpurchase" href="/instantPurchase/1234"/>
</album>
```
x??

---


#### Decoupling Client from Server
Hypermedia controls enable decoupling between the client and server by abstracting the underlying details of API implementations. Changes in how hypermedia controls are displayed or structured should not affect clients as long as the semantics remain consistent.

:p How does hypermedia control help in decoupling a client from a server?
??x
Hypermedia controls help in decoupling a client from a server by abstracting the underlying implementation details of API resources. Clients need to understand that certain links represent specific actions (e.g., `/artist` for artist information, `/instantpurchase` for purchasing) rather than knowing precise URIs or complex protocols. This abstraction means that changes in how these controls are displayed or structured do not necessarily break clients as long as the semantics of each control remain consistent.

For example, a shopping cart might change from being a simple link to a more complex JavaScript widget, but the client still follows the same control logic.
x??

---


#### Benefits and Trade-offs
Using hypermedia controls provides significant benefits like progressive discovery of API endpoints and reduced coupling. However, it can be chatty as clients need to follow multiple links to find specific operations.

:p What are some trade-offs when using hypermedia controls?
??x
When using hypermedia controls, one of the trade-offs is increased chattiness or more network requests because clients often need to follow multiple links to find and perform specific actions. Despite this, the benefits include significant decoupling between the client and server, progressive discovery capabilities, and reduced coupling that can be advantageous over time.

```java
public class ClientExample {
    public void navigateAlbum() throws IOException {
        // Follow link to artist info
        String artistInfoUrl = "http://example.com/artist/theBrakes";
        
        // Follow another link for purchasing
        String purchaseUrl = "http://example.com/instantPurchase/1234";
        
        // Perform operations based on links found
    }
}
```
x??

---


#### Initial Upfront Work and Long-term Benefits
While hypermedia controls require some initial work to set up, they offer long-term benefits such as flexibility in API changes without breaking existing clients.

:p What are the initial challenges with implementing hypermedia controls?
??x
The initial challenge with implementing hypermedia controls is that it requires upfront work to understand and integrate these controls into client applications. However, this initial effort often pays off over time by providing greater flexibility in how APIs can evolve without disrupting existing clients. This approach allows for progressive discovery of API endpoints and reduced coupling between the client and server.

```java
public class HypermediaSetup {
    public void setupHypermediaControls() throws IOException {
        // Logic to set up hypermedia controls and understand their semantics
    }
}
```
x??

---

---

