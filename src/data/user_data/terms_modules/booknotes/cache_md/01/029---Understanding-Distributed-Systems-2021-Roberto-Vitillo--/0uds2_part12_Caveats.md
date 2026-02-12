# High-Quality Flashcards: 029---Understanding-Distributed-Systems-2021-Roberto-Vitillo--_processed (Part 12)


**Starting Chapter:** Caveats

---


#### Token Validation Mechanisms
Background context: When an internal service receives a request with a security token attached to it, it needs a way to validate the token and obtain the principal's identity and its roles. The validation process differs depending on the type of token used.

:p What are the main differences between opaque tokens and transparent tokens in terms of their validation?
??x
Opaque tokens do not contain any information about the principal and require services to call an external auth service to validate the token and retrieve the principal's information. Transparent tokens, such as JSON Web Tokens (JWT), embed the principal’s information within the token itself, making them self-contained.

For opaque tokens:
```java
public class ValidateOpaqueToken {
    public void validateToken(String token) throws Exception {
        // Call external auth service to validate and retrieve principal info
        AuthService authService = new AuthService();
        PrincipalInfo principalInfo = authService.validateToken(token);
        System.out.println("Principal Info: " + principalInfo);
    }
}
```

For JWT (transparent tokens):
```java
public class ValidateJWT {
    public void validateToken(String token) throws Exception {
        // Validate the token using a trusted certificate and extract principal info
        X509Certificate cert = CertificateUtil.getCertificate(); 
        String principalInfo = JWT.decode(token).getPayload().toString();
        System.out.println("Principal Info: " + principalInfo);
    }
}
```
x??

---

#### JSON Web Tokens (JWT)
Background context: The most popular standard for transparent tokens is the JSON Web Token (JWT). A JWT is a JSON payload that contains an expiration date, the principal's identity, roles, and other metadata. This payload is signed with a certificate trusted by internal services, thus eliminating the need for external calls to validate the token.

:p What is a JSON Web Token (JWT) and how does it differ from opaque tokens?
??x
A JWT is a compact, URL-safe means of representing claims to be transferred between two parties. It is self-contained, meaning it includes all necessary information within its payload, such as the principal's identity, roles, and expiration date.

In contrast to opaque tokens, which do not contain any meaningful data about the token itself:
```java
public class JWTExample {
    public void createAndValidateJWT(String principal) throws Exception {
        // Create a signed JWT with a trusted certificate
        String jwt = JWT.create()
            .withSubject(principal)
            .sign(Algorithm.HMAC256("secretKey"));

        // Validate the token using the same certificate
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256("secretKey"))
            .build();
        DecodedJWT decodedJWT = verifier.verify(jwt);
        System.out.println(decodedJWT.getClaim("role").asString());
    }
}
```

In a JWT, you can easily validate it without needing to call an external service.
x??

---

#### OpenID Connect and OAuth2
Background context: OpenID Connect (OIDC) and OAuth2 are security protocols that allow implementing token-based authentication and authorization. These protocols enable services to authenticate users and verify their identities securely.

:p What are the main features of OpenID Connect and how do they differ from JWT?
??x
OpenID Connect is an identity layer on top of the OAuth 2.0 protocol, which allows for secure ID token exchanges between parties. It focuses specifically on authentication (who you are) rather than authorization (what you can do).

OAuth2 is more broadly used for access control and authorization to protected resources but does not inherently provide user authentication.

Example differences:
- **OpenID Connect**:
  - Focuses on authentication
  - Issues ID tokens containing the principal's identity information
  - Provides a way to verify user attributes

- **JWT (OAuth2)**:
  - Can be used for both authentication and authorization due to its self-contained nature
  - Typically used as an access token for API requests

```java
// Example of using OpenID Connect
public class OIDCExample {
    public void authenticateUser(String idToken) throws Exception {
        // Validate the ID token using a trusted issuer
        OIDCVerifier oidcVerifier = new OIDCVerifier();
        UserPrincipal principal = oidcVerifier.verifyIdToken(idToken);
        System.out.println("User Principal: " + principal.getRoles());
    }
}
```

In contrast, JWT can be used in OAuth2 as an access token.
x??

---

#### API Keys
Background context: Another widespread mechanism to authenticate applications is the use of API keys. An API key is a custom key that allows the API gateway to identify which application is making a request and limit what they can do.

:p What are API keys, and how are they used in API gateways?
??x
API keys are unique identifiers assigned to each registered application or user for authentication purposes. They help APIs determine who is accessing the service and what actions are allowed.

API keys are commonly used with public APIs like those provided by GitHub or Twitter. The API gateway uses these keys to enforce access control policies and rate limits.

Example of using an API key:
```java
public class APIKeyAuthentication {
    public boolean authenticate(String apiKey) throws Exception {
        // Check if the API key is valid in a configured list
        List<String> validAPIKeys = Arrays.asList("key1", "key2");
        return validAPIKeys.contains(apiKey);
    }
}
```

This example checks if an incoming request contains a valid API key before allowing access.
x??

---

#### API Gateway Drawbacks and Benefits
Background context: One of the drawbacks of using an API gateway is that it can become a development bottleneck. Every new service created needs to be wired up to the gateway, and changes in the services' APIs require modifications to the gateway as well.

:p What are the main benefits and drawbacks of using an API Gateway?
??x
Benefits:
- Centralizes management of multiple microservices, making them more cohesive.
- Provides a single point for security, monitoring, and rate limiting.

Drawbacks:
- Can become a bottleneck in development processes due to its coupling with services.
- Requires additional maintenance and scaling efforts as it needs to handle traffic from all back-end services.

Example of API Gateway handling requests:
```java
public class APIGateway {
    public void handleRequest(String request) throws Exception {
        // Route the request to appropriate service based on URL or context
        if (request.startsWith("/users")) {
            UserService userService = new UserService();
            userService.handleRequest(request);
        } else if (request.startsWith("/posts")) {
            PostService postService = new PostService();
            postService.handleRequest(request);
        }
    }
}
```

This example shows how an API gateway might route requests to different services.
x??

---

#### Implementing API Gateway
Background context: You can implement a custom API gateway using proxy frameworks like NGINX, or use off-the-shelf solutions such as Azure API Management. This provides a scalable and managed way to handle multiple microservices.

:p What are some ways to implement an API gateway?
??x
You can:
1. **Roll your own** using a proxy framework like NGINX.
2. **Use an off-the-shelf solution** like Azure API Management, which offers managed services for routing, security, and monitoring.

Example of configuring NGINX as an API Gateway (pseudocode):
```nginx
# Nginx configuration file
server {
    listen 80;
    
    location /users/ {
        proxy_pass http://user-service/;
    }
    
    location /posts/ {
        proxy_pass http://post-service/;
    }
}
```

Example of using Azure API Management (pseudocode):
```java
public class AzureAPIManagementClient {
    public void configureApiGateway() {
        // Code to set up API Gateway with routes and policies
        ApiManagement api = new ApiManagement();
        api.addRoute("/users", "http://user-service/");
        api.addRoute("/posts", "http://post-service/");
    }
}
```
x??

---


#### CQRS Pattern
Background context explaining the CQRS pattern. This pattern separates read and write paths to optimize queries and updates, respectively. In a microservice architecture, data stores might not be well suited for specific types of queries or might not scale under high read loads.

The objective is to understand how CQRS can help in managing different data models for reads and writes efficiently.

:p What is the main purpose of implementing the CQRS pattern?
??x
The main purpose of implementing the CQRS pattern is to separate concerns between reading and writing data, optimizing each path according to specific needs. By doing so, it allows using specialized data stores for read operations (like geospatial or graph-based) while maintaining a more traditional structure for write operations.

For example, in an e-commerce application:
- The write path might use a relational database for transactional integrity.
- The read path could leverage NoSQL databases optimized for complex queries like product recommendations based on location data.

This separation ensures that the write path remains simple and fast while allowing the read path to handle more complex, specialized queries efficiently. This approach also helps in keeping the system consistent over time by pushing updates from the write path to the read path whenever changes occur.
x??

---
#### Read Path vs Write Path
Background context explaining how read and write paths are separated in CQRS. The read path typically uses a different data model and storage mechanism than the write path, tailored for optimal query performance.

The objective is to understand the differences between read and write paths and their respective benefits.

:p How do the read and write paths differ in a CQRS system?
??x
In a CQRS system, the read and write paths are separated into different services or components. The write path focuses on handling transactions and updates, typically using traditional data stores like relational databases for maintaining consistency and transactional integrity.

Conversely, the read path is designed to handle complex queries efficiently, often using specialized data stores that may not be well-suited for writes (e.g., NoSQL databases optimized for geospatial or graph-based operations). This separation ensures that each path can use the most appropriate technology stack for its specific needs.

For instance:
- The write path might update a transactional database to ensure data consistency.
- The read path could query a NoSQL database configured for fast, complex queries like recommendation engines based on user location or purchase history.

This separation allows for better optimization of each path's performance and flexibility in choosing the right technology stack for specific use cases. However, it introduces additional complexity as both paths need to be managed independently.
x??

---
#### Messaging for Service Communication
Background context explaining messaging as a form of indirect communication that does not require the destination service to be available at all times. It is useful in microservices architectures where services may temporarily become unavailable.

The objective is to understand how messaging can improve system resilience and functionality by decoupling producers from consumers.

:p What are the benefits of using messaging for service communication?
??x
Using messaging for service communication offers several key benefits:
- **Asynchronous Operations**: Clients can execute long-running operations asynchronously, improving user experience.
- **Load Balancing**: Messages can be distributed across multiple consumers dynamically based on current load conditions.
- **Smooth Load Spikes**: Consumers can handle messages at their own pace without getting overwhelmed.

For example, in a video conversion service:
- A client could send a message to trigger the conversion of a video into different formats optimized for various devices.
- The producer writes a message to a channel, and the consumer processes it when available.

This decoupling ensures that even if one part of the system is temporarily down or overloaded, others can still function normally. Additionally, it helps in managing load more effectively by distributing work among multiple consumers.

```java
// Pseudocode example for sending a message using a messaging system
public class MessageProducer {
    private final MessageBroker broker;

    public void sendVideoConversionRequest(String videoId) {
        Message request = new Message(videoId);
        broker.sendMessage(request);
    }
}

// Consumer processing the message
public class VideoConversionConsumer implements Consumer {
    @Override
    public void processMessage(Message message) {
        String videoId = message.getPayload();
        // Convert video to optimized formats and store results
    }
}
```
x??

---
#### One-way Messaging Style
Background context explaining how one-way messaging allows producers to send messages without expecting an immediate response. It is useful for background tasks that do not require acknowledgment.

The objective is to understand when and why to use one-way messaging in a microservices architecture.

:p What is the difference between one-way and request-response messaging styles?
??x
One-way messaging differs from request-response messaging primarily by not requiring an immediate or guaranteed response. In one-way messaging:
- The producer writes a message to a point-to-point channel.
- A consumer eventually reads and processes it, but there's no guarantee of when the processing will complete.

This style is ideal for background tasks that do not require acknowledgment from the receiver. For example, scheduling long-running jobs or sending notifications.

Request-response messaging, on the other hand:
- The producer writes a message to a request channel.
- The consumer reads and processes it, then sends a reply back through a dedicated response channel.
- The producer waits for an acknowledgment (reply) before considering the operation complete.

For instance, in a payment processing system:
- A client could send a one-way message to initiate a background task of sending confirmation emails or generating reports.
- Alternatively, for confirming a payment transaction, a request-response style would be more appropriate as the client needs assurance that the payment was processed correctly.

```java
// Pseudocode example for one-way messaging
public class NotificationProducer {
    private final MessageBroker broker;

    public void sendNotification(String recipient) {
        Message notification = new Message(recipient);
        broker.sendMessage(notification); // No expectation of a reply
    }
}

// Consumer processing the message
public class NotificationConsumer implements Consumer {
    @Override
    public void processMessage(Message message) {
        String recipient = message.getPayload();
        // Send email or generate report for the recipient
    }
}
```
x??

---
#### Request-response Messaging Style
Background context explaining how request-response messaging provides a synchronous communication pattern where both producer and consumer exchange messages with acknowledgment. It is useful for operations that require immediate feedback.

The objective is to understand when and why to use request-response messaging in a microservices architecture.

:p What is the key feature of request-response messaging?
??x
The key feature of request-response messaging is its synchronous nature, where both the producer (sender) and consumer (receiver) exchange messages with an acknowledgment mechanism. This pattern ensures that:
- The producer sends a message to a request channel.
- A consumer reads the message from this channel and processes it.
- Once processed, the consumer sends a reply back through a dedicated response channel.
- The producer waits for the reply before considering the operation complete.

For example, in an authentication system:
- A client sends a login request to a server.
- The server processes the request, checks credentials, and sends a response (success or failure).
- The client receives this response and takes appropriate action based on the outcome.

This pattern guarantees that all operations are completed successfully before proceeding, making it suitable for scenarios where immediate feedback is necessary.

```java
// Pseudocode example for request-response messaging
public class LoginRequestProducer {
    private final MessageBroker broker;

    public boolean attemptLogin(String username, String password) {
        RequestMessage loginRequest = new RequestMessage(username, password);
        Message response = broker.sendRequest(loginRequest); // Wait for a reply
        return response.isSuccess();
    }
}

// Consumer processing the message and sending a response
public class LoginRequestConsumer implements Consumer {
    @Override
    public Response processRequest(RequestMessage request) {
        String username = request.getUsername();
        String password = request.getPassword();
        boolean isValid = authenticateUser(username, password);
        return new Response(isValid); // Send back to producer through the response channel
    }
}
```
x??

---


#### Broadcast Messaging
Broadcast messaging allows a producer to write a message to a publish-subscribe channel, which is then broadcasted to all consumers. This pattern is used for notifying a group of processes about a specific event. We have previously encountered this when discussing log-based transactions.

:p What is the key feature of broadcast messaging?
??x
The key feature of broadcast messaging is that it allows a single producer to send messages to multiple consumers without needing to know their addresses, number, or availability.
x??

---

#### Message Channel Implementation
Message channels are implemented using messaging services like AWS SQS or Kafka. These services act as buffers for messages, decoupling producers from consumers.

:p What role does the messaging service play in message channel implementation?
??x
The messaging service acts as a buffer for messages and decouples producers from consumers by abstracting away their addresses and availability.
x??

---

#### Tradeoffs and Guarantees
Different message brokers offer different tradeoffs such as delivery guarantees, message durability, latency, supported standards, and support for competing consumers. Some brokers do not guarantee strict order of messages due to the distributed nature of the implementation.

:p Why might a broker like AWS SQS standard queues not provide strong ordering guarantees?
??x
A broker like AWS SQS standard queues does not provide strong ordering guarantees because ensuring message order across multiple nodes is challenging and requires coordination. The distributed nature of the system makes it difficult to guarantee order, leading to simpler implementations that do not offer strict ordering.
x??

---

#### Partitioning for Ordering
To ensure message order, some brokers partition a channel into sub-channels where each sub-channel can be handled by a single process. This ensures that messages within a sub-channel are processed in the order they were sent.

:p How does partitioning help with message ordering?
??x
Partitioning helps with message ordering by dividing the channel into smaller sub-channels, each managed by a single process. Since only one consumer reads from each sub-channel, it becomes easier to guarantee that messages within the same sub-channel are processed in order.
x??

---

#### Drawbacks of Partitioning
While partitioning can help with order guarantees, it also introduces challenges such as potential hotspots where specific partitions may become overloaded.

:p What is a drawback of implementing message channels through partitioning?
??x
A drawback of implementing message channels through partitioning is that specific partitions might become much hotter than others. This can lead to situations where single consumers reading from these partitions struggle to keep up with the load, potentially degrading performance.
x??

---

#### Competing Consumers Pattern
The competing consumers pattern involves using leader election to allow only one consumer process to read from a sub-channel, ensuring message order is preserved.

:p How does the competing consumers pattern ensure message order?
??x
The competing consumers pattern ensures message order by allowing only one consumer process to read from each sub-channel. This is achieved through mechanisms like leader election, which ensures that only one process can consume messages from a partition at any given time.
x??

---

#### Broker Limits and Performance
Brokers have various limits such as the maximum supported size of messages and other constraints. These limitations affect the overall performance and scalability of message processing.

:p What factors might limit the performance of a broker?
??x
Factors that can limit the performance of a broker include the maximum supported size of messages, message durability guarantees, latency requirements, and support for different messaging standards. These limits impact how efficiently messages are processed and delivered.
x??

---

