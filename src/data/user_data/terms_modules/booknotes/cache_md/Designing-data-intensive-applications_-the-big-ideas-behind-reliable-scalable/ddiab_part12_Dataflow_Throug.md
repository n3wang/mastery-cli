# High-Quality Flashcards: Designing-data-intensive-applications_-the-big-ideas-behind-reliable-scalable_processed (Part 12)


**Starting Chapter:** Dataflow Through Services REST and RPC

---


---
#### Schema Evolution
Schema evolution allows for databases to maintain a single, consistent view despite containing records encoded with different schema versions. This is achieved through encoding historical data in a way that appears uniform under certain conditions.

:p What is schema evolution and how does it help in database management?
??x
Schema evolution helps in managing databases where records might be stored using different schema versions over time. By encoding these records in a manner consistent with the latest schema, the database can present a single, unified view to applications or processes that interact with it.

For example, if your application writes data at two points in time and each writing operation uses a different schema version, you might encounter inconsistencies when querying the data later on. Schema evolution addresses this by ensuring all stored records conform to the latest schema during retrieval, even though they were originally written under older schemas.
x??

---


#### Dataflow Through Services: REST and RPC
Dataflow through services refers to communication between clients and servers over a network. Clients make requests to servers which expose APIs (Application Programming Interfaces).

:p What are the roles in dataflow through services?
??x
In dataflow through services, there are two primary roles: **clients** and **servers**. Servers expose an API that clients can connect to for making requests.

Clients include various types of software such as web browsers, native mobile or desktop applications, and client-side JavaScript applications. Servers handle these requests using standardized protocols like HTTP, with data formats including JSON, XML, etc.

For example:
```java
// Pseudocode for a simple GET request in Java
public class HttpRequest {
    public static void sendGetRequest(String url) {
        try {
            URL obj = new URL(url);
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();
            // Set the request method to GET
            con.setRequestMethod("GET");
            // Get the response code
            int responseCode = con.getResponseCode();
            System.out.println("GET Response Code :: " + responseCode);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```
x??

---


#### Service-Oriented Architecture (SOA)
Service-oriented architecture (SOA) is a design approach where applications are decomposed into smaller, loosely coupled services that can communicate over networks.

:p What is SOA and how does it help in application development?
??x
Service-oriented architecture (SOA) is an architectural style for developing software as modular components. These components (services) interact with each other to provide functionality and data to applications. The key benefits of SOA include improved modularity, easier maintenance, and the ability to scale independently.

In an SOA, services can be developed, deployed, and managed separately from each other. This allows for better reuse of existing services and simplifies the development process by breaking down complex systems into manageable parts.

For example, in a typical web application:
- The front-end (client) might make requests to multiple back-end services.
- One service might handle user authentication while another handles data retrieval or modification.
```java
// Pseudocode for a simple service invocation in Java
public class UserService {
    public String authenticateUser(String username, String password) {
        // Authentication logic
        if (isValid(username, password)) {
            return "Authentication successful";
        } else {
            return "Invalid credentials";
        }
    }

    private boolean isValid(String username, String password) {
        // Validation logic
        return true; // Simplified for example
    }
}
```
x??

---

---


#### Services vs Databases
Services and databases both allow data interactions, but services expose application-specific APIs while databases permit arbitrary queries using query languages. This difference provides encapsulation by restricting client actions based on business logic.

:p How do services differ from databases in terms of query capabilities?
??x
Services typically restrict clients to predetermined inputs and outputs due to the specific business logic defined within them. Databases, however, allow more flexible querying via dedicated query languages like SQL. This restriction in services offers better control over client behavior and data access.

---


#### Web Services Overview
Web services use HTTP as a protocol for service communication, though they are not limited to web usage. They can be categorized into three main contexts: intra-organization microservices, inter-organization data exchanges, and public APIs provided by online services.

:p What types of interactions constitute web services?
??x
Web services involve various interactions such as client applications making requests to a service over HTTP, one service querying another within the same organization, or external services communicating via the internet. This includes scenarios like native apps on mobile devices using HTTP for data exchange and public APIs for interoperability between different organizations.

---


#### REST vs SOAP
REST (Representational State Transfer) and SOAP (Simple Object Access Protocol) are two primary approaches to web services with contrasting philosophies. REST relies on simple data formats, URLs for resource identification, and HTTP features for caching, authentication, and content negotiation, while SOAP is a more structured XML-based protocol.

:p How do REST and SOAP differ in their approach?
??x
REST emphasizes simplicity and leverage of existing standards like HTTP methods (GET, POST) and URL structure. It uses lightweight formats such as JSON or XML for data exchange. In contrast, SOAP operates over various protocols but typically uses XML for messages, which can be more verbose and complex.

---


#### HATEOAS Principle
HATEOAS stands for Hypermedia as the Engine of Application State and is a principle often discussed in RESTful services. It suggests that links within responses guide clients on what actions they can take next based on current state information.

:p What does HATEOAS mean, and why is it significant?
??x
HATEOAS means hypermedia controls are used to drive the application's state transitions. Essentially, resources include hyperlinks or references that point to other services or actions a client can invoke. This principle enhances discoverability and flexibility in RESTful web services by allowing clients to navigate through the API dynamically.

---


#### SOA vs Microservices
Service-oriented architecture (SOA) aims for modular application design where services are independently deployable and evolvable, promoting easier maintenance and change management. Microservices take this further by treating applications as a collection of small, independent services that communicate over well-defined APIs.

:p What is the difference between SOA and microservices?
??x
SOA focuses on creating reusable service components to build complex applications. Microservices go beyond this by emphasizing extreme modularity where each service can be developed and deployed independently. This allows for more frequent updates without impacting other parts of the system, enhancing scalability and resilience.

---


#### REST vs SOAP

Background context: This section contrasts two popular web service protocols, REST and SOAP. It highlights their differences in complexity, ease of use, and popularity across different organizations.

:p What is a primary reason for the increased adoption of REST over SOAP?
??x
REST has gained popularity due to its simplicity compared to SOAP’s complex and sprawling set of standards (WS-*). It is often associated with microservices and is preferred by smaller companies and newer enterprises.
x??

---


#### RESTful APIs

Background context: A RESTful API is designed according to the principles of Representational State Transfer. This includes concepts such as statelessness, caching, and use of HTTP methods.

:p What does an API that follows REST principles typically rely on?
??x
RESTful APIs typically rely on HTTP methods (GET, POST, PUT, DELETE) for data manipulation, making them simpler to implement and integrate.
x??

---


#### Remote Procedure Calls (RPC)

Background context: RPC models aim to make remote network service requests look similar to local function calls. However, this abstraction has significant issues when applied over a network.

:p What is a key issue with the RPC model that makes it fundamentally flawed?
??x
A key issue with the RPC model is that a network request is unpredictable and cannot be relied upon in the same way as a local function call. Network problems such as latency, loss, or unavailability of remote services are uncontrollable by the client and require handling through retries and other mechanisms.
x??

---


#### Location Transparency

Background context: The concept of location transparency in RPC models refers to making remote calls appear as if they were local. However, this abstraction breaks down when dealing with network unreliability.

:p How does the unpredictability of network requests differ from local function calls?
??x
Unlike local function calls which are predictable and succeed or fail based on controllable parameters, network requests can be unpredictable due to potential issues like network failures, slow remote machines, or unavailability. These problems require additional handling mechanisms such as retries.
x??

---

---


#### Retrying Failed Network Requests

Background context: Retrying failed network requests might cause unintended actions due to potential idempotence issues. Idempotent operations can be performed multiple times without different results, but non-idempotent operations may produce inconsistent outcomes if retried.

:p What is the risk of retrying a failed network request?

??x
Retrying a failed network request could lead to the same action being performed multiple times if the operation is not idempotent. This can cause unintended side effects, such as double processing or data inconsistencies.

Example:
Consider a database update operation that sets a user's status to "active". If this operation is retried due to a transient error, it will result in the status being set to "active" twice if idempotence is not handled correctly. This could lead to duplicate records or incorrect state.

```java
public void activateUser(User user) {
    try {
        // Attempt to update user's status
        userRepository.updateStatus(user.getUserId(), "active");
    } catch (Exception e) {
        // Retry the operation if it fails for a temporary reason
        retryActivateUser(user);
    }
}

private void retryActivateUser(User user) {
    Thread.sleep(1000);  // Simulate retry delay
    activateUser(user);
}
```

x??

---


#### Latency Differences Between Local Function Calls and Network Requests

Background context: Local function calls are typically fast and consistent, while network requests can vary widely in latency due to external factors like network congestion or remote service load.

:p What differences exist between the execution time of local function calls and network requests?

??x
Local function calls generally execute quickly and consistently, whereas network requests can have significant variable latencies depending on network conditions and the load on the remote service. A network request might complete in less than a millisecond under ideal conditions but could take several seconds when network congestion or heavy loads are present.

```java
public void processRequest() {
    long startTime = System.currentTimeMillis();
    
    // Simulate local function call (fast)
    localFunctionCall();

    // Simulate network request (variable latency)
    try {
        Thread.sleep((int) Math.random() * 5000);  // Random delay to simulate variable latency
    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
    }
    
    long endTime = System.currentTimeMillis();
    System.out.println("Total time: " + (endTime - startTime) + " ms");
}

private void localFunctionCall() {
    System.out.println("Local function call executed.");
}
```

x??

---


#### Parameter Passing in Local Function Calls vs. Network Requests

Background context: Local functions can pass object references efficiently, while network requests require parameters to be encoded into byte sequences for transmission.

:p How does parameter passing differ between local function calls and network requests?

??x
Local functions can pass object references directly since they operate within the same memory space. In contrast, network requests must encode all passed parameters as a sequence of bytes, which can become problematic with large objects or complex data types that need to be serialized.

```java
public void processRequest(String param1, User user) {
    // Directly pass object references for local calls
    System.out.println(param1);
    printUser(user);  // Assume this method prints the User object details

    // Encode parameters into bytes for network requests (simplified example)
    byte[] encodedParams = encodeParameters(param1, user);
    
    sendNetworkRequest(encodedParams);
}

private void encodeParameters(String param1, User user) {
    // Simplified logic to convert parameters to a byte array
    String jsonParam1 = new Gson().toJson(param1);  // Serialize string parameter
    String jsonString = new Gson().toJson(user);   // Serialize user object
    
    return (jsonParam1 + jsonString).getBytes();
}

private void sendNetworkRequest(byte[] params) {
    // Simulate network request sending the encoded parameters
}
```

x??

---


#### RPC Frameworks and Their Challenges

Background context: Modern RPC frameworks aim to address challenges such as encoding datatypes across languages, handling asynchronous calls, and managing service discovery. These frameworks use mechanisms like futures and streams.

:p What are some of the key features of modern RPC frameworks?

??x
Modern RPC frameworks like gRPC, Finagle, and Rest.li provide advanced features to handle complex network interactions efficiently. Key features include:

- **Futures**: Encapsulate asynchronous actions that may fail.
- **Streams**: Support multiple requests and responses over time.
- **Service Discovery**: Allow clients to dynamically find service endpoints.

Example:
Using gRPC for handling asynchronous calls with futures:

```java
public Future<ServerResponse> performAsyncCall(ServerRequest request) {
    // Create a call with a future response
    ClientCall<ServerRequest, ServerResponse> call = blockingStub.performAsyncCall(request);
    
    // Use the future to handle the result asynchronously
    return call.responseFuture();
}
```

x??

---

---


---
#### REST vs. RPC for Public APIs
Background context: This concept discusses the differences between REST and RPC (Remote Procedure Call) frameworks, focusing on their usage for public APIs versus internal services within an organization.

:p What are the primary differences in focus between REST and RPC frameworks?
??x
REST is predominantly used for public APIs where requests can span different organizations. It focuses on backward compatibility for responses and forward compatibility for requests due to potential long-term client-server interactions. RPC, however, is more commonly used internally within an organization's datacenter for services that are updated first by servers and then clients.

Example: A public API might use JSON for request parameters and responses, allowing optional fields to be added without breaking old clients. In contrast, a service using RPC in the same organization would require both client and server updates simultaneously.
x??

---


#### Evolvability in RPC Schemes
Background context: This section covers how different RPC frameworks handle evolvability, which is crucial for maintaining backward compatibility during API changes.

:p Which framework can evolve according to specific encoding rules?
??x
Thrift, gRPC (Protocol Buffers), and Avro RPC can be evolved based on the respective encoding format's compatibility rules. For example, Protocol Buffers define a schema that allows adding fields in new versions without breaking old clients.

Example: If you use Protocol Buffers, you might add a new field to a message definition; older services will ignore this new field while newer services can utilize it.
```proto
message Example {
  optional string new_field = 2; // New version only
}
```
x??

---


#### Service Compatibility in RPC vs. REST
Background context: This concept explains the challenges of maintaining service compatibility when using RPC for inter-organizational APIs, as opposed to RESTful services.

:p How does service compatibility differ between RPC and REST?
??x
Service compatibility is harder to maintain with RPC because services often cross organizational boundaries, making it difficult for providers to control client updates. In contrast, RESTful APIs can evolve more flexibly by maintaining backward compatibility in responses while adding optional fields or parameters in requests.

Example: A REST API might use a version number in the URL or HTTP Accept header to indicate which version of the service is being used.
```java
// Versioning via URL
GET /v1/resource

// Versioning via HTTP Accept Header
GET /resource
Accept: application/vnd.example.v2+json
```
x??

---


#### Asynchronous Message-Passing Systems Overview
Background context: This section introduces asynchronous message-passing systems, which lie between RPC and databases in terms of data flow characteristics.

:p What are the key differences between RPC and message-passing systems?
??x
Key differences include:
- **Latency**: RPC is typically low-latency request/response, while message-passing can have higher latency but provides buffering and re-delivery.
- **Reliability**: Message brokers in message-passing systems help with reliability by buffering messages and redelivering them if the recipient fails.
- **Decoupling**: Message-passing decouples producers from consumers more effectively than RPC.

Example: A sender sends a message, and it is stored temporarily before being delivered to one or more consumers.
```java
// Pseudocode for sending a message using a broker
broker.sendMessage("queue_name", "message_data");
```
x??

---


#### Message-Broker Functionality
Background context: This concept describes how message brokers function in asynchronous communication, providing multiple use cases such as buffering and decoupling.

:p What are the primary functions of a message broker?
??x
The primary functions of a message broker include:
- **Buffering**: Storing messages if the recipient is unavailable or overloaded.
- **Reliability**: Automatically redelivering messages to crashed processes.
- **Decoupling**: Allowing publishers and consumers to be independently deployed.

Example: A simple use case where a producer sends a message, and a consumer retrieves it later.
```java
// Pseudocode for using RabbitMQ as a broker
Producer:
rabbit.send("queue_name", "data");

Consumer:
rabbit.receive("queue_name");
```
x??

---


#### Distributed Actor Frameworks Overview
Background context: This concept introduces distributed actor frameworks, which use the actor model to handle asynchronous message-passing across multiple nodes.

:p What is an actor in the context of distributed systems?
??x
An actor is a programming entity that encapsulates logic and communicates with other actors through asynchronous messages. Each actor processes only one message at a time, reducing issues like race conditions and deadlocks.

Example: A simple actor model implementation where an actor sends and receives messages.
```java
// Pseudocode for an actor in a distributed system
class MyActor extends Actor {
    public void onReceive(Object message) {
        if (message instanceof String) {
            System.out.println("Received: " + message);
        } else {
            unhandled(message); // Handle unknown messages
        }
    }

    public void sendMessage(String msg, ActorRef recipient) {
        recipient.tell(msg, getSelf());
    }
}
```
x??

---

---


#### Protocol Buffers for Forward/Backward Compatibility
Protocol Buffers can be used as an alternative to Java’s built-in serialization, providing the ability to perform rolling upgrades. This is because Protocol Buffers support schema evolution.
:p Can you explain how using Protocol Buffers helps in rolling upgrades with Akka?
??x
Using Protocol Buffers for data encoding allows for better compatibility between different versions of a service running on different nodes. The protocol buffers schema can evolve over time, meaning that new code can read old data and vice versa without issues.
```java
// Example of defining a message in Protocol Buffers
message User {
  required string name = 1;
  optional int32 id = 2;
}
```
x??

---


#### Data Encoding Formats and Compatibility
Several encoding formats are discussed, each with their own compatibility properties. Programming language-specific encodings often lack backward/forward compatibility, while schema-driven binary formats like Thrift and Protocol Buffers provide clear definitions for these.
:p What are the key differences between programming language-specific encodings and schema-driven binary formats in terms of backward/forward compatibility?
??x
Programming language-specific encodings are tied to a single programming language and often fail to offer forward or backward compatibility. In contrast, schema-driven binary formats like Thrift and Protocol Buffers allow for compact and efficient encoding with well-defined forward and backward compatibility semantics.
```java
// Example of using Protocol Buffers in Java
public class User {
  public static final MessageLite.BUILDER = User.getDefaultInstance().toBuilder();
}
```
x??

---


#### Modes of Dataflow in Distributed Systems
Data flows through various mechanisms like databases, RPCs, and asynchronous message passing. Each scenario requires different handling for encoding and decoding data.
:p In what ways do the modes of dataflow (databases, RPC, asynchronous messaging) affect how data is encoded and decoded?
??x
In databases, data is encoded by a process writing to it and decoded by one reading from it. For RPCs and REST APIs, clients encode requests, servers decode them, generate responses, and then the client decodes the response. Asynchronous message passing involves nodes sending messages that are encoded by senders and decoded by recipients.
```java
// Example of asynchronous messaging in Java with Akka
ActorRef sender = system.actorOf(Props.create(MyActor.class));
sender.tell("message", null);
```
x??
---

---

