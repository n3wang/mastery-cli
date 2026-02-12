# High-Quality Flashcards: Sam-Newman---Building-Microservices-OReilly-Media-2015_processed (Part 20)


**Starting Chapter:** Single Sign-On Gateway

---


#### Authentication Process
Background context: The process of confirming that a user is who they claim to be is known as authentication. In traditional scenarios, this usually involves providing a username and password, but modern systems can use alternative methods like biometric data (fingerprint).
:p What is the difference between authentication and authorization?
??x
Authentication is about verifying identity, while authorization determines what actions a user is permitted to perform based on their identity.
??x

---


#### Authorization Mechanism
Background context: Once authenticated, users are granted permissions to specific actions or resources. This mapping from an authenticated user (principal) to the allowed actions is known as authorization.
:p How does Django handle authentication and authorization?
??x
Django provides built-in mechanisms for managing users and handling authentication and authorization within single applications. However, in distributed systems, more complex SSO solutions like OpenID Connect or custom gateway implementations are required.
??x

---


#### Security Considerations
Background context: Ensuring data security involves protecting it both in transit (using secure protocols) and at rest (using encryption). Additionally, securing underlying systems and networks is crucial. The human element, including user authentication and authorization, also plays a significant role.
:p What are the main security measures mentioned?
??x
The text mentions network perimeter protection, subnet isolation, firewalls, machine-level security, operating system security, and hardware security as layers of defense in depth. These can be implemented to secure data both in transit and at rest.
??x

---


#### Fine-Grained Authorization for Microservices
Fine-grained authorization goes beyond coarse-grained authentication by providing nuanced access control based on user attributes. For instance, a helpdesk application might allow only staff members with specific roles to view customer details or issue refunds, but limit the amount of refund in certain scenarios.
:p How does fine-grained authorization differ from coarse-grained authentication?
??x
Fine-grained authorization involves making more detailed decisions about what actions are allowed based on additional attributes extracted during authentication. Coarse-grained authentication, on the other hand, simply checks if a user is logged in and grants access to certain resources based on high-level roles like "STAFF" or "ADMIN." Fine-grained authorization allows for more precise control over operations within an application.
x??

---


#### Group-Based Access Control
In fine-grained authorization, groups or roles are often used to grant permissions. For example, a CALL_CENTER group might have limited access to view customer details but can issue refunds of up to $50. A CALL_CENTER_TEAM_LEADER would have similar permissions but could issue higher amounts.
:p How can group-based access control be implemented in an application?
??x
Group-based access control is typically implemented by associating users with roles or groups, and then defining permissions based on these roles. Here's a simplified example using Java:

```java
public class PermissionService {
    public boolean canViewCustomerDetails(User user) {
        return user.getRole().equals("CALL_CENTER") || user.getGroup().contains("CALL_CENTER");
    }

    public boolean canIssueRefund(User user, double amount) {
        if (user.getRole().equals("CALL_CENTER")) {
            return amount <= 50;
        } else if (user.getRole().equals("CALL_CENTER_TEAM_LEADER")) {
            return true; // No specific limit for team leaders
        }
        return false;
    }
}
```
x??

---


#### Service-to-Service Authentication and Authorization
Service-to-service authentication involves programs or services authenticating with each other, which is different from human-computer interactions. One common approach is to assume that all internal service calls are implicitly trusted.
:p What is the main difference between human-computer interaction and service-to-service communication in terms of authentication?
??x
In human-computer interaction, the focus is on verifying the identity of a user through mechanisms like login credentials or biometric data. However, in service-to-service communication, the entities involved are programs or services, which often communicate over network boundaries. The main difference lies in the level of trust and the need for explicit authentication between systems.
x??

---


#### Centralized Service Access Control via Directory Server
Background context: This approach leverages an existing infrastructure and a centralized directory server for managing service access controls. It ensures that all service interactions are authenticated through this central point, making it easier to manage permissions and access across multiple services.

:p What is the main advantage of using a centralized directory server for service access control?
??x
The primary benefit is the ability to centrally manage and enforce authentication and authorization policies, reducing the complexity and effort required to maintain multiple independent systems. This setup also allows for fine-grained control over permissions and easier revocation or modification of credentials.
x??

---


#### Service Accounts for Authentication
Background context: In this approach, clients have a set of credentials they use to authenticate themselves with an identity provider, which then grants the service necessary information for authentication decisions.

:p Why are service accounts recommended in this context?
??x
Service accounts help in maintaining secure and granular access control. By assigning specific credentials to each microservice, it becomes easier to manage and revoke access if a set of credentials is compromised.
x??

---


#### Secure Storage of Credentials
Background context: Storing credentials securely is crucial to prevent unauthorized access. The challenge lies in ensuring that the client has a secure way to store these credentials.

:p How can clients securely store their credentials?
??x
Clients need to employ robust methods to store credentials, such as using environment variables, secret management services, or encrypted storage mechanisms. These methods help mitigate risks associated with insecure storage.
x??

---


#### Summary of Flashcards

- **Centralized Service Access Control via Directory Server**: Focuses on centralizing authentication and authorization policies for multiple services.
- **Service Accounts for Authentication**: Emphasizes using specific credentials for each microservice to manage access more efficiently.
- **Secure Storage of Credentials**: Discusses methods to securely store client credentials, ensuring they are not easily accessible by unauthorized parties.
- **Authentication Protocols: SAML and OpenID Connect**: Compares the strengths and limitations of different authentication protocols.
- **Client Certificates for Authentication**: Highlights the operational challenges associated with managing client certificates.
- **HMAC Over HTTP for Authentication**: Explains how HMAC can be used to secure data integrity over HTTP.

---


#### API Keys for Microservices Communication
Background context explaining the use of API keys in microservice-to-microservice communication. Unlike traditional authentication mechanisms, API keys are designed to be simple and easy to implement but come with their own set of challenges.

API keys allow services to identify who is making a call and often include rate-limiting or other access control measures. They can be implemented using shared keys or public-private key pairs.

:p What is the primary purpose of using API keys in microservice-to-microservice communication?
??x
The main purposes are to identify the caller, enforce access controls, and manage service usage (e.g., rate limiting). For instance, a gateway model might use API keys to authenticate calls and limit the number of requests from a particular key.

Here’s an example of checking an API key in Java:
```java
public class ApiKeyValidator {
    private final Map<String, String> apiKeyMap;

    public ApiKeyValidator(Map<String, String> apiKeyMap) {
        this.apiKeyMap = apiKeyMap;
    }

    public boolean validateApiKey(String apiKey) {
        return apiKeyMap.containsKey(apiKey);
    }
}
```
x??

---


#### JSON Web Tokens (JWT)
Background context explaining JWTs and their use in microservices communication. JWT is a compact, URL-safe means of representing claims to be transferred between two parties.

.JWT consists of three parts: Header, Payload, and Signature. The header typically contains the type of token and the signing algorithm used. The payload can contain various claims about the user or entity holding the token. The signature ensures that the JWT has not been tampered with during transit.

:p What are JSON Web Tokens (JWTs) primarily used for in microservices?
??x
JSON Web Tokens (JWTs) are primarily used to transmit information between parties as a JSON object, typically containing the user's identity and other claims. They offer a stateless way of managing sessions and can be easily cached.

Here’s an example of creating a JWT:
```java
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JwtExample {
    public static String createJwt(String subject, long ttlMillis) {
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary("secret");
        Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());
        return Jwts.builder()
                .setSubject(subject)
                .signWith(signatureAlgorithm, signingKey)
                .compact();
    }
}
```
x??

---


#### Gateway Models for API Management
Background context explaining the role of gateway models in managing and securing microservices. A gateway model acts as a central point of control over all external requests to a system, providing features like authentication, rate limiting, logging, and more.

:p What is the role of a gateway model in microservice architecture?
??x
A gateway model serves as an entry point for all external requests to a system, acting as a single point of control. It can handle tasks such as API key validation, rate limiting, logging, authentication (e.g., SAML), and more. This approach simplifies the complexity of managing security and service access across multiple microservices.

For example, a gateway might use Spring Cloud Gateway or Kong to manage traffic:
```java
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.factory.RateLimiterGatewayFilter;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.server.ServerWebExchange;

@Bean
public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
    return builder.routes()
            .route(r -> r.path("/api/v1/**")
                    .filters(f -> f.filter(new RateLimiterGatewayFilterFactory().apply(ServerWebExchange)))
                    .uri("lb://service-name"))
            .build();
}
```
x??

---

---


#### Verifying Caller Identity
Background context explaining the concept. To mitigate the confused deputy problem, one approach is to verify the identity of the caller before performing any operations.

This can involve passing the original principal's credentials down the call chain and validating them at each step. However, this approach can be complex and may require additional layers of authentication protocols like SAML or OpenID Connect.

:p How can we ensure that downstream services correctly identify the caller?
??x
To ensure that downstream services correctly identify the caller, you can implement a system where the online shop service passes along the original principal's credentials (such as through SAML assertions) when making calls to other services. This way, each service can verify the identity of the caller independently.

For instance, if the online shop wants to fetch an order status for a specific user, it could include the user’s credentials in its request:

```java
// Pseudocode example
public OrderStatus getOrderStatus(String orderId, String userId) {
    // Fetch order from order service with userId and other necessary information
    OrderServiceClient client = new OrderServiceClient();
    
    // Pass along user's credentials for verification
    OrderRequest request = new OrderRequest(orderId, userId);
    OrderResponse response = client.getOrder(request);

    return parseOrderResponse(response);
}
```

This ensures that even if the online shop is compromised, other services can still verify the caller’s identity.
x??

---


#### Complexity of Validation
Background context explaining the concept. In scenarios where multiple services make downstream calls, the validation process can become increasingly complex. Each service might need to validate not only its own identity but also ensure that subsequent calls are valid.

:p How does the complexity increase with each additional call in a chain?
??x
The complexity increases exponentially as you add more layers of service-to-service communication. Each service must verify the legitimacy of the caller at multiple levels, potentially requiring nested authentication checks and complex logic to manage trust between services.

For example:

```java
// Pseudocode example
public OrderStatus getOrderStatus(String orderId) {
    // Service A makes a request to Service B which then requests from Service C
    OrderServiceClient client = new OrderServiceClient();
    
    // Pass along the necessary information for validation
    OrderRequest request = new OrderRequest(orderId);
    OrderResponse responseFromB = client.getOrder(request);  // Service B processes and forwards
    
    // Now, Service B needs to validate its own credentials AND verify the request from Service A
    if (validateRequestFromA(responseFromB)) {
        // Forward validated request to final service C
        ShippingServiceClient shippingClient = new ShippingServiceClient();
        OrderResponse responseFromC = shippingClient.getShippingInfo(orderId);
        
        return parseOrderResponse(responseFromC);
    } else {
        throw new UnauthorizedAccessException("Request validation failed.");
    }
}
```

This example shows how each step in the chain needs to validate its own identity and ensure that it is acting on behalf of a legitimate caller.
x??

---

---

