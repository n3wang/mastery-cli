# High-Quality Flashcards: 024---Mastering-API-Architecture_processed (Part 8)

**Starting Chapter:** Contract Testing Versus Component Testing

---

#### Centralized vs Decentralized Contract Storage
In large organizations, decentralized contract storage in individual projects can make it difficult to discover and manage contracts. Centralized storage improves visibility and governance, but it must be properly organized to avoid misalignment between producers and consumers.

:p How does centralized contract storage improve API contract management?
??x
Centralized contract storage improves API contract management by:
- Providing a single source of truth for all contracts.
- Enabling visibility into which services interact with each other.
- Facilitating easier discovery and reuse of contracts.
- Supporting integration with CI/CD pipelines for automated validation.

However, it also introduces challenges such as:
- Risk of incorrect module assignments where producers don’t intend to fulfill certain contracts.
- Need for strong governance and naming conventions.

Example of a centralized Git repository structure:
```
contracts/
├── user-service/
│   └── user_contract.json
├── order-service/
│   └── order_contract.json
└── shared/
    └── common_contract.json
```
x??

---

#### API Status Code Validation
A key aspect of API component testing involves validating that the API returns the correct HTTP status codes in response to different scenarios. For example, a successful request should return a 200 OK status, while a request made by a user without proper authorization should return a 403 Forbidden status. These validations help ensure that the API communicates the correct state of the operation to the client.

:p What status code should be returned for a successful API request?
??x
A successful API request should return a status code of 200 OK. This indicates that the request was processed successfully and the server has returned the expected response. Other common status codes include 403 for forbidden access and 404 for not found.
x??

---

#### Testing Unauthorized Access in APIs
When a user attempts to access an API endpoint without proper authorization, the API should respond with an appropriate status code, typically 403 Forbidden. This ensures that unauthorized access is rejected and that the API enforces access control correctly.

:p What status code should be returned when a user lacks proper entitlements?
??x
When a user attempts to access an API endpoint without proper entitlements, the API should return a 403 Forbidden status code. This indicates that the request was understood, but the server refuses to fulfill it due to lack of authorization.
x??

---

#### Handling Empty Datasets in APIs
APIs must define how they respond when a dataset is empty. For example, if a request to `/conference/conf-1/attendees` returns no attendees, the API should return an empty array (e.g., `[]`) rather than a 404 Not Found error. This ensures consistent behavior and prevents clients from misinterpreting empty results as errors.

:p How should an API respond when no data is found?
??x
When no data is found, an API should return an empty array (e.g., `[]`) with a 200 OK status, rather than a 404 Not Found. This makes the API's behavior predictable and avoids confusion for clients who may not expect a 404 for empty datasets.
x??

---

#### Location Header in API Creation Endpoints
When creating a resource via an API, the response should include a `Location` header that points to the newly created resource. This is a standard HTTP practice that helps clients navigate to the resource after creation.

:p What is the expected behavior of the Location header in a resource creation API call?
??x
When creating a resource, the API should return a `Location` header in the response that points to the newly created resource. This allows clients to easily access the resource after creation, typically using a URL like `/conference/conf-1/attendees/{attendee-id}`.
x??

---

#### Contract Testing vs Component Testing
While contract testing is the preferred method for verifying API behavior, it requires a formal contract (like an OpenAPI spec) to be shared between consumers and providers. When contract testing is not available, component testing can be used to validate that the API conforms to its specification. However, this is more error-prone and tedious compared to contract testing.

:p Why is contract testing preferred over component testing?
??x
Contract testing is preferred because it ensures that the API behavior aligns with a shared, formal specification (like OpenAPI). It generates tests automatically and reduces the risk of misalignment between the API and its consumers. Component testing, while useful, requires manual test writing and is more error-prone.
x??

---

#### Testing Content Type Acceptance in APIs
APIs should respect the content type accepted by the client and return data in the expected format. For example, if a client sends a request with `Accept: application/xml`, the API should return XML-formatted data. This ensures compatibility and proper data exchange.

:p How should an API respond when a client specifies an XML content type?
??x
When a client specifies an XML content type (e.g., `Accept: application/xml`), the API should return the response data in XML format. This ensures compatibility with the client's expectations and proper handling of content negotiation.
x??

---

#### What is an API Gateway?
An API Gateway is a critical component in modern software architecture that acts as a single entry point for all client requests to backend services. It sits at the network edge and mediates between consumers and internal systems, providing features like routing, authentication, rate limiting, and observability.

:p What role does an API Gateway play in managing ingress traffic?
??x
An API Gateway manages ingress traffic by acting as a central mediator between external clients and backend services. It routes requests to appropriate backend services, enforces security policies, handles authentication and authorization, and provides observability through logging and monitoring. Unlike simple proxies or load balancers, an API Gateway offers advanced capabilities such as API composition, circuit breaking, and retry logic.

```java
// Example: Basic API Gateway routing logic (pseudocode)
class ApiGateway {
    void routeRequest(Request request) {
        // Authenticate request
        if (!authenticate(request)) {
            throw new UnauthorizedException();
        }
        
        // Apply rate limiting
        if (rateLimitExceeded(request)) {
            throw new RateLimitExceededException();
        }
        
        // Route to backend service
        BackendService service = findBackendService(request.getPath());
        service.handle(request);
    }
}
```
x??

---

