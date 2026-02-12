# High-Quality Flashcards: Sam-Newman---Building-Microservices-OReilly-Media-2015_processed (Part 8)


**Starting Chapter:** Use Multiple Concurrent Service Versions

---


#### Multiple Concurrent Service Versions
Background context: This versioning strategy involves running different versions of a service simultaneously to support both old and new consumers. It is used by Netflix for legacy devices or when the cost of changing older consumers is too high.

:p What are the challenges associated with using multiple concurrent service versions?
??x
The challenges include:
- Needing to fix and deploy two sets of services for internal bug fixes, which can require branching the codebase—always problematic.
- The necessity to implement smart routing mechanisms to direct requests to the appropriate version of the service. This often results in additional complexity, with smarts sitting in middleware or nginx scripts.
- Handling persistent state management; customers created by either version need visibility to all services regardless of which version was used.

Code examples are not directly applicable here as they pertain more to architectural and deployment strategies rather than specific coding tasks:
```java
// Pseudocode for branching logic (simplified)
if (consumerVersion == "old") {
    routeTo(oldService);
} else if (consumerVersion == "new") {
    routeTo(newService);
}
```
x??

---


#### Blue/Green Deployments
Background context: This is a deployment strategy where both the old and new versions of an application run in parallel, with traffic directed to one or the other. It allows for a seamless transition without downtime.

:p What are the key characteristics of blue/green deployments?
??x
Blue/green deployments involve:
- Running two identical environments side by side (blue and green).
- Initially directing all production traffic to the "green" environment, which is considered live.
- Slowly shifting traffic from the "blue" to the "green" environment as testing progresses.
- Once fully validated, switching all traffic to the new "green" version while marking the old one as decommissioned.

Code examples are not directly applicable here but can be conceptual:
```java
// Pseudocode for blue/green deployment logic (simplified)
if (environment == "blue") {
    useBlueEnvironment();
} else if (environment == "green") {
    useGreenEnvironment();
}
```
x??

---


#### Canary Releases
Background context: This is a form of controlled release where a new version of an application is first deployed to a small subset of users or nodes. Feedback from this group helps in determining whether the release can be expanded.

:p What are the key characteristics of canary releases?
??x
Canary releases involve:
- Deploying the new version to a small, manageable segment of users or nodes.
- Monitoring the behavior and performance of these users/nodes closely.
- Gradually increasing the proportion of users on the new version based on observed results.
- Allowing quick rollback if issues are identified.

Code examples can be used to illustrate the logic:
```java
// Pseudocode for canary release logic (simplified)
if (userBelongsToCanaryGroup) {
    serveNewVersion();
} else {
    serveOldVersion();
}
```
x??

---

---


#### Web-based User Interfaces

Background context: Early web-based UIs relied heavily on server-side rendering, where the entire page was generated and sent to the client browser. Over time, with the rise of JavaScript, more dynamic behavior could be added to web applications, making them feel "fatter" or more similar to desktop applications.

:p How did the role of JavaScript change in web-based user interfaces?
??x
JavaScript's role evolved from being just a tool for enhancing form validations and simple client-side interactions to becoming an essential component for creating dynamic and interactive web applications. It allowed developers to handle complex UI interactions directly on the browser, reducing the load on the server.

For example:
```javascript
// Example of using JavaScript to dynamically update content based on user interaction
document.getElementById("myButton").addEventListener("click", function() {
    var element = document.getElementById("content");
    if (element.style.display === "none") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
});
```
x??

---


#### Towards a Holistic Digital Experience

Background context: The shift towards digital experiences involves considering multiple touchpoints such as desktop applications, mobile devices, wearables, and physical stores. Microservices enable flexibility in combining services to cater to these diverse interaction points.

:p How does the adoption of microservices contribute to creating a holistic digital experience?
??x
Microservices allow for modular service design, where each service can be independently developed, scaled, and updated. By exposing granular APIs through microservices, organizations can combine different capabilities in various ways to create tailored experiences across multiple touchpoints.

For example:
```java
// Pseudocode to illustrate combining services from microservices
public class DigitalExperienceService {
    private OrderService orderService;
    private CustomerProfileService customerProfileService;

    public void createOrder(int userId, String product) {
        // Get customer profile data
        Map<String, Object> customerData = customerProfileService.getCustomerProfile(userId);

        // Place an order with additional details
        OrderRequest request = new OrderRequest();
        request.setProduct(product);
        request.setCustomerName((String) customerData.get("name"));
        orderService.placeOrder(request);
    }
}
```
x??

---


#### API Composition for User Interfaces
Background context: When designing user interfaces, it’s important to leverage existing APIs that services use for communication. This approach can make development more efficient and ensure consistency in data retrieval.

:p How can a web-based UI interact with APIs?
??x
A web-based UI can interact with APIs by using JavaScript GET or POST requests to retrieve or modify data. For example, the UI could send an HTTP request to fetch customer records from a service API and display them appropriately on the page.
```javascript
// Example of making an HTTP GET request in JavaScript
fetch('https://api.example.com/customers/123')
  .then(response => response.json())
  .then(data => {
    // Update UI with fetched data
  });
```
x??

---


#### UI Fragment Composition
Background context: Instead of the UI interacting directly with APIs and mapping responses to controls, services can provide pre-constructed UI fragments that are combined by the UI. This approach reduces complexity in handling API responses.

:p How does UI fragment composition work?
??x
UI fragment composition involves services providing specific parts (fragments) of the user interface which are then integrated into a larger UI. For example, a recommendation service might provide a widget that can be embedded within other controls to create a comprehensive user experience.
```java
// Pseudocode for integrating a recommendation fragment in Java
public class UserInterface {
    private RecommendationWidget widget;

    public UserInterface() {
        // Initialize and add the recommendation widget
        this.widget = new RecommendationWidget();
    }
}
```
x??

---


#### API Gateway as an Intermediate Layer
Background context: An API gateway can help manage and optimize communication between services and the user interface, especially when dealing with multiple APIs. It aggregates requests to reduce the number of direct calls, thereby improving efficiency.

:p What role does an API gateway play?
??x
An API gateway acts as a middleware that receives requests from the UI, processes them by aggregating multiple service calls, and then sends back a unified response. This helps in reducing the load on mobile devices and optimizing network usage.
```java
// Example of an API Gateway handling multiple requests
public class ApiGateway {
    public Response handleRequest(Request request) {
        // Process the request to aggregate necessary data from services
        List<ServiceResponse> responses = service1.fetchData() + service2.fetchData();
        
        return new Response(responses);
    }
}
```
x??

---

---


#### Coarse-Grained Fragments Serving UI Components

Background context explaining the concept. This approach involves serving up coarser-grained parts of a user interface (UI) from server-side applications, which then make appropriate API calls to assemble these fragments on the client side. The key is that each fragment can be managed by different teams based on their area of responsibility.

:p What is the main idea behind serving coarse-grained UI components?
??x
The main idea involves breaking down the user interface into larger, more manageable parts (panes or pages) that are served up from server-side applications. Each part can be developed and maintained independently by a specific team according to their area of expertise.
```java
// Example of a simple server-side method serving an order management page
public String getOrderManagementPage() {
    // Logic to fetch necessary data for the page
    // ...
    
    // Return the HTML content as a string or render it directly
    return "<h1>Order Management</h1><p>...</p>";
}
```
x??

---


#### Ensuring Consistency of User Experience

Background context explaining the concept. While serving coarse-grained fragments allows for better team ownership and faster updates, it can lead to inconsistencies in the user experience if not managed properly.

:p How do we address the issue of inconsistent user experiences?
??x
To ensure a consistent user experience despite using different server-side applications to serve UI components, techniques like living style guides are employed. These guidebooks or tools provide shared assets such as HTML components, CSS stylesheets, and images that help maintain uniformity across the interface.

```java
// Example of a simple living style guide concept
public class StyleGuide {
    public String getComponent(String componentName) {
        // Return pre-defined HTML component with consistent styling
        return "<div class='component'>" + componentName + "</div>";
    }
}
```
x??

---


#### Cross-Cutting Interactions

Background context explaining the concept. In some cases, interactions are so cross-cutting that they do not fit neatly into widgets or pages managed by server-side applications.

:p Why does a service's capabilities sometimes not fit into widgets or pages?
??x
When an interaction is too complex or pervasive to be contained within a single widget or page, it may not align well with the coarse-grained UI component approach. For instance, dynamic recommendations that need to update in real-time across multiple points of interaction (like auto-suggestions during searches) are challenging to implement using this method.

```java
// Example of handling cross-cutting interactions (pseudo-code)
public void handleDynamicRecommendation(String userQuery) {
    // Fetch relevant recommendations based on the query
    List<String> recommendations = fetchRecommendations(userQuery);
    
    // Update UI elements that trigger these recommendations in real-time
    updateUI(recommendations);
}
```
x??

---

---


#### Backends for Frontends (BFFs)
Background context: A common approach to manage interactions between front-end interfaces and back-end services is through an API gateway. However, this can lead to complications when these gateways become too complex, leading to issues with maintaining and updating them independently.

The objective of BFFs is to provide a more granular and isolated approach where each specific user interface has its dedicated backend service. This allows teams working on different UIs to handle their own server-side components without interfering with others.

:p What are the main benefits of using Backends for Frontends (BFFs)?
??x
The main benefits include maintaining isolation between different front-end interfaces, allowing for independent deployment and updates of each UI component. It also ensures that business logic remains within services themselves rather than in complex gateways, making it easier to manage.

For example:
- If a mobile app needs specific API calls, a BFF can be created just for the mobile application.
- A desktop version might need different APIs or additional functionalities, which would have its own BFF.
```java
public class MobileBff {
    public String fetchUserDetails(String userId) {
        // Logic to fetch user details from backend and format them for the mobile app
    }
}

public class DesktopBff {
    public String fetchUserSettings(String userId) {
        // Logic to fetch settings tailored for desktop users
    }
}
```
x??

---


#### Monolithic Gateway Issue
Background context: Using a single monolithic gateway can lead to several problems, including tightly coupling all services and making it difficult to update or modify individual components independently.

:p What problem does the use of a single monolithic gateway typically cause?
??x
The use of a single monolithic gateway often leads to a situation where everything is thrown into one giant layer, leading to a lack of isolation between different user interfaces. This makes it challenging to release updates for each interface independently without affecting others.

For example:
- A change in authentication logic could impact all services behind the same gateway.
```java
public class MonolithicGateway {
    public void handleRequest(String request) {
        // Complex logic involving multiple backend calls and transformations
    }
}
```
x??

---


#### Dedicated Backends for Frontends (BFFs)
Background context: To avoid the pitfalls of monolithic gateways, a better approach is to use dedicated backends for each front-end interface. This method allows teams working on specific user interfaces to handle their server-side components more effectively.

:p How does using dedicated backends for front-ends improve development and maintenance?
??x
Using dedicated backends for front-ends improves development and maintenance by providing a clear separation of concerns. Each BFF can be tailored specifically to the needs of its corresponding UI, making it easier to update or modify without affecting other interfaces.

For example:
- A web application might have one set of APIs, while a mobile app has another.
```java
public class WebBff {
    public String getUserProfile(String userId) {
        // Logic specific to fetching user profile for the web interface
    }
}

public class MobileBff {
    public String getPushNotifications(String userId) {
        // Logic specific to handling push notifications for the mobile app
    }
}
```
x??

---


#### Authentication and Authorization Layer
Background context: In a system using BFFs, there might be a need for an additional layer between the BFFs and the front-end interfaces to handle authentication and authorization. This layer ensures that only authorized users can access specific functionalities.

:p What is typically placed between BFFs and front-end interfaces?
??x
An API authentication and authorization layer is typically placed between BFFs and front-end interfaces. This layer ensures secure communication by verifying user credentials and authorizing access to appropriate resources.

For example:
- A JWT (JSON Web Token) can be used for authentication.
```java
public class AuthLayer {
    public String authenticateUser(String username, String password) {
        // Logic to validate the user's credentials and issue a token if valid
        return "token123";
    }
}
```
x??

---

---

