# High-Quality Flashcards: 029---Understanding-Distributed-Systems-2021-Roberto-Vitillo--_processed (Part 11)


**Starting Chapter:** Practical considerations

---


#### Service Operations Challenges
Background context: In a microservices architecture, individual services are developed and maintained by separate teams. However, these teams usually handle both development and operations for their respective services, which can create conflicts between adding new features and maintaining the service.

:p What are some challenges faced when using microservices in terms of operations?
??x
The primary challenges include:
- Staffing each team with its own dedicated operations team is expensive.
- Teams that develop a service are typically on-call for it, creating a conflict of interest during sprint planning.
- Debugging system failures can be difficult as you cannot load the entire application locally to step through it with a debugger.

Code examples can illustrate these challenges:
```java
// Example of a simple logging mechanism in Java
public class ServiceLogger {
    public void logException(Exception e) {
        System.out.println("Error: " + e.getMessage());
        // More sophisticated logging would be needed for production systems
    }
}
```
x??

---

#### Eventual Consistency
Background context: When splitting an application into separate services, the data model no longer resides in a single datastore. Ensuring atomic updates and strong consistency across multiple databases is slow, expensive, and difficult.

:p What does eventual consistency mean in microservices architecture?
??x
Eventual consistency means that after some period of time, all operations against a distributed system have completed and the data has propagated to all nodes so that eventually, if you read from any node, you will see the same data. This is necessary because splitting an application into separate services means that updates can't be guaranteed to happen atomically across multiple databases.

Code examples can illustrate eventual consistency:
```java
// Pseudocode for implementing eventual consistency using a queue system
public class EventualConsistencyManager {
    private Queue<String> operationsQueue = new LinkedList<>();

    public void addOperation(String operation) {
        operationsQueue.add(operation);
    }

    public String getLatestOperation() {
        return operationsQueue.peek();
    }
}
```
x??

---

#### Practical Considerations for Microservices
Background context: While microservices offer many benefits, they also introduce significant complexity. Teams need to carefully consider when and how to split a monolithic application into services.

:p Why is it generally best to start with a monolith before splitting it?
??x
It's generally best to start with a monolith because:
- Splitting an application introduces additional complexity that can be overwhelming.
- Finding the right boundaries between services requires experience and time, which are better spent in a monolithic environment where they can be refined.

Code examples might not directly apply here, but this could illustrate the process of refactoring a monolith to microservices:
```java
// Example code showing potential initial approach (monolithic)
public class MonolithicApplication {
    public void doSomething() {
        // Business logic that spans multiple layers or services in a monolith
    }
}
```
x??

---

#### Moving Boundaries Within a Monolith
Background context: Initially, the boundaries between services are harder to define and move within a monolith. As the application matures, it becomes easier to identify the optimal service boundaries.

:p How does moving boundaries within a monolith help in microservices architecture?
??x
Moving boundaries within a monolith helps by:
- Allowing teams to refactor parts of the application incrementally.
- Making it easier to experiment with different service designs without fully committing to splitting the entire application.
- Reducing initial complexity and risk when first introducing microservices.

Code examples might include refactoring code in a monolithic setup:
```java
// Refactoring part of the monolith into a microservice
public class UserService {
    private UserRepository userRepository = new UserRepository();

    public User getUserById(int id) {
        return userRepository.findById(id);
    }
}
```
x??

---


#### API Gateway Overview
The internal APIs of a microservices application can be hidden by a public API that acts as a facade or proxy for the internal services. This public API is called the API gateway and it provides a transparent interface to its clients, who are unaware they are communicating through an intermediary.

:p What is the role of an API gateway in a microservices architecture?
??x
The API gateway serves as an intermediary layer between external clients and the internal microservices. Its main roles include routing requests to appropriate backend services, providing a unified public API that abstracts away the complexity of interacting with multiple services, and offering features like composition and translation.

```java
// Example of simple routing logic in pseudocode
public class ApiGateway {
    private Map<String, String> routingMap;

    public ApiGateway(Map<String, String> routingMap) {
        this.routingMap = routingMap;
    }

    public Response handleRequest(Request request) {
        String path = request.getPath();
        if (routingMap.containsKey(path)) {
            // Route to the appropriate backend service
            return routeToBackendService(routingMap.get(path), request);
        } else {
            return new Response("404 Not Found");
        }
    }

    private Response routeToBackendService(String internalPath, Request request) {
        // Logic to send request to the correct microservice and handle its response
        // For simplicity, assume a function call to a backend service with given path
        BackendService backend = new BackendService(internalPath);
        return backend.handleRequest(request);
    }
}
```
x??

---

#### Routing in API Gateway
The API gateway uses a routing map to direct incoming requests to the appropriate internal microservices. This mechanism ensures that even if the internal implementation changes, clients can still use familiar external APIs.

:p How does the API gateway handle request routing?
??x
The API gateway maintains a mapping between public (external) paths and private (internal) service paths. When an incoming request is received, it checks this map to determine which microservice should process the request. This allows for flexibility in internal implementation changes without affecting external clients.

```java
// Example of routing logic using a simple map
public class RoutingMap {
    private Map<String, String> pathMapping = new HashMap<>();

    public void addPathMapping(String externalPath, String internalPath) {
        pathMapping.put(externalPath, internalPath);
    }

    public String getInternalPathForExternalRequest(String externalPath) {
        return pathMapping.getOrDefault(externalPath, null);
    }
}
```
x??

---

#### Composition in API Gateway
In distributed systems, data often resides across multiple services. The API gateway can provide a higher-level API that aggregates and composes responses from these different sources into a single response to the client.

:p How does composition work in an API gateway?
??x
Composition allows the API gateway to query multiple microservices and merge their responses into a cohesive output for the client. This abstraction simplifies the client's interaction with multiple services, reducing the number of requests it needs to make to fetch necessary data.

```java
// Example of composition logic in pseudocode
public class ComposedAPI {
    private List<BackendService> services;

    public ComposedAPI(List<BackendService> services) {
        this.services = services;
    }

    public Response getCombinedData(Request request) {
        List<Response> responses = new ArrayList<>();
        for (BackendService service : services) {
            responses.add(service.handleRequest(request));
        }
        // Logic to combine the individual responses into a single response
        return combineResponses(responses);
    }

    private Response combineResponses(List<Response> responses) {
        // Logic to merge multiple responses into one
        // For simplicity, assume merging content of all responses into a single string
        StringBuilder combinedContent = new StringBuilder();
        for (Response r : responses) {
            combinedContent.append(r.getContent());
        }
        return new Response(combinedContent.toString());
    }
}
```
x??

---

#### Translation in API Gateway
API gateways can translate data between different formats or protocols, ensuring seamless communication across microservices with varying APIs.

:p What is the purpose of translation in an API gateway?
??x
Translation allows the API gateway to adapt and convert request and response formats as needed. This could involve converting between JSON and XML, handling different versions of an API, or even adapting the protocol used (e.g., HTTP vs. WebSocket).

```java
// Example of translation logic in pseudocode
public class Translator {
    public Request translateRequest(Request rawRequest) {
        // Logic to convert raw request into a standardized format
        return new StandardizedRequest(rawRequest);
    }

    public Response translateResponse(Response rawResponse) {
        // Logic to adapt the response according to client needs
        return new AdapatedResponse(rawResponse);
    }
}
```
x??

---


#### Functional Decomposition: Gateway Discrepancy Handling
Background context explaining how API gateways handle discrepancies between expected and actual service states. It involves resolving inconsistencies that might arise when functional updates or changes do not propagate uniformly across all services.

:p How does an API gateway handle discrepancies in state propagation?
??x
An API gateway handles discrepancies by ensuring that the latest state is reflected in its responses, even if a particular change has not propagated to all backend services. If there's a discrepancy, the gateway can implement logic to either wait for updates or provide a fallback response until synchronization is achieved.

```java
public class GatewayHandler {
    public Response handleRequest(Request request) {
        // Logic to check if state discrepancy exists and resolve it
        boolean isStateDiscrepant = checkStateDiscrepancy(request);
        
        if (isStateDiscrepant) {
            // Handle discrepancy logic, e.g., wait or provide fallback response
            return handleFallbackResponse();
        } else {
            // Proceed with normal request processing
            return processRequest(request);
        }
    }

    private boolean checkStateDiscrepancy(Request request) {
        // Check for state discrepancies and return true if found
        return false; // Placeholder logic
    }

    private Response handleFallbackResponse() {
        // Implement fallback response handling
        return new Response("Fallback response"); // Placeholder response
    }
}
```
x??

---

#### Functional Decomposition: Translation of IPC Mechanisms
Background context explaining the translation capabilities of API gateways, which can convert between different IPC mechanisms like RESTful HTTP and gRPC.

:p How does an API gateway translate between different IPC mechanisms?
??x
An API gateway translates between IPC mechanisms by converting requests from one protocol to another. For example, it can transform a RESTful HTTP request into an internal gRPC call or expose different APIs tailored for various client types.

```java
public class TranslationGateway {
    public Response translateRequest(Request incomingRequest) {
        // Determine the incoming protocol and convert it if necessary
        Protocol protocol = determineProtocol(incomingRequest);
        
        switch (protocol) {
            case REST:
                return convertRestToGrpc(incomingRequest);
            case GRPC:
                return convertGrpcToRest(incomingRequest);
            default:
                throw new IllegalArgumentException("Unsupported protocol");
        }
    }

    private Response convertRestToGrpc(Request restRequest) {
        // Convert REST request to gRPC call
        return new GrpcCall().call(restRequest.getEndpoint(), restRequest.getBody());
    }

    private Response convertGrpcToRest(Request grpcRequest) {
        // Convert gRPC response back to REST format
        return new Response(grpcRequest.getResponse());
    }
}
```
x??

---

#### Functional Decomposition: Tailored APIs using Graph-Based Schema
Background context explaining how graph-based APIs allow clients to request specific data, reducing the need for different APIs per use case. GraphQL is a popular technology in this space.

:p How do graph-based APIs tailor responses based on client needs?
??x
Graph-based APIs enable clients to declare what data they need and let the gateway figure out how to translate these requests into series of internal API calls. This approach reduces development time by eliminating the need for different APIs per use case, allowing clients to specify exactly what they need.

```java
public class GraphBasedAPIHandler {
    public Response handleGraphRequest(GraphRequest request) {
        // Parse and validate client's data needs from graph schema
        Schema schema = parseSchema(request.getQuery());
        
        // Translate the request into a series of internal API calls
        List<InternalCall> calls = translateToApiCalls(schema);
        
        // Execute internal API calls and aggregate results
        Response response = executeAndAggregateCalls(calls);
        return new Response(response.toString()); // Return formatted response
    }

    private Schema parseSchema(GraphRequest request) {
        // Parse the graph schema from the client's query
        // Placeholder logic for parsing
        return new Schema(); // Placeholder schema
    }

    private List<InternalCall> translateToApiCalls(Schema schema) {
        // Translate parsed schema into internal API calls
        // Placeholder logic for translation
        return new ArrayList<>(); // Placeholder list of calls
    }
}
```
x??

---

#### Functional Decomposition: Cross-cutting Concerns in API Gateway
Background context explaining how an API gateway can implement cross-cutting concerns such as caching and rate-limiting to improve performance while reducing burden on backend services.

:p How does an API gateway handle cross-cutting concerns like caching and rate limiting?
??x
An API gateway can implement caching for frequently accessed resources to improve the API's performance, reduce bandwidth requirements on backend services. It also can rate-limit requests to protect backend services from being overwhelmed. This is often done by handling authentication and authorization at the gateway level while delegating permission checks to individual services.

```java
public class CrossCuttingGateway {
    public Response handleRequest(Request request) {
        // Handle caching logic
        if (shouldCache(request)) {
            return cacheService.getFromCache(request);
        }

        // Handle rate limiting
        int requestsInLastPeriod = rateLimitService.checkAndRecord(request);
        if (requestsInLastPeriod >= LIMIT) {
            return new Response("Rate limit exceeded");
        }

        // Pass request to internal service
        return internalService.handleRequest(request);
    }

    private boolean shouldCache(Request request) {
        // Determine caching logic based on request characteristics
        return true; // Placeholder logic
    }
}
```
x??

---

