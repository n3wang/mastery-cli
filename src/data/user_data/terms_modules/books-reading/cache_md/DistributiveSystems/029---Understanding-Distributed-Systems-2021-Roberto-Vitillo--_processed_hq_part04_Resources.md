# High-Quality Flashcards: 029---Understanding-Distributed-Systems-2021-Roberto-Vitillo--_processed (Part 4)

**Rating threshold:** >= 8/10

**Starting Chapter:** Resources

---

**Rating: 8/10**

#### HTTP and Its Versions
Background context explaining the concept. Include any relevant formulas or data here.
HTTP is a protocol used to transfer data over the web, evolving through different versions to improve performance and functionality. Version 29 was designed to address limitations of HTTP/1.1 by using a binary protocol and multiplexing multiple concurrent request-response transactions on the same connection.

HTTP/2 introduced these features:
- Binary protocol: Instead of textual protocols like HTTP/1.1.
- Multiplexing: Allowing multiple requests to be sent over a single connection without waiting for responses, improving performance.
- Header compression: Reducing overhead by compressing headers, making it more efficient in managing connections.

HTTP/3 is the latest iteration based on UDP and aims to address TCP's shortcomings:
- Uses UDP, which can be faster due to lower overhead compared to TCP.
- Implements its own transport protocol for better performance.

:p What is HTTP/2 designed to improve over HTTP/1.1?
??x
HTTP/2 improves HTTP/1.1 by introducing a binary protocol and multiplexing multiple concurrent request-response transactions on the same connection, which enhances performance without needing multiple connections.
x??

---
#### Resources in APIs
Background context explaining the concept. Include any relevant formulas or data here.
Resources are abstractions of information like documents, images, or collections of other resources that can be accessed using URLs. A URL identifies a resource and describes its location on the server.

:p What is a resource in an API?
??x
A resource in an API is an abstraction of information such as a document, image, or collection of other resources that can be accessed via a URL.
x??

---
#### Designing APIs with REST Principles
Background context explaining the concept. Include any relevant formulas or data here.
REST (Representational State Transfer) is a set of constraints and conventions for designing elegant and scalable HTTP APIs.

:p How does REST relate to resource naming in API design?
??x
REST suggests that resources should be named descriptively, reflecting their nature and how they are accessed. For instance, using a URL like `/products/42` for a specific product rather than `/getProducts?product=42`.
x??

---
#### URL Query Strings and Parameters
Background context explaining the concept. Include any relevant formulas or data here.
URL query strings allow additional parameters to be passed with requests, affecting how services handle them.

:p What is the purpose of a query string in an HTTP request?
??x
A query string in an HTTP request allows passing additional parameters that affect how the service handles the request. For example, `?sort=price` sorts the list of products returned by the server.
x??

---
#### API Endpoints and URL Construction
Background context explaining the concept. Include any relevant formulas or data here.
API endpoints are specific URLs for performing actions or retrieving resources.

:p What is an endpoint in the context of a product catalog service?
??x
An endpoint in the context of a product catalog service would be a specific URL like `https://www.example.com/products`, used to access and manipulate the collection of products.
x??

---
#### Caching with URLs
Background context explaining the concept. Include any relevant formulas or data here.
Caching can improve performance by storing responses for future use, but it requires unique identifiers in URLs.

:p Why is caching a list of products based on its URL not possible if we change the query string?
??x
If additional parameters are included in the query string (e.g., `?sort=price`), changing these would result in a different URL. Since each request with a different query string is considered unique, this prevents caching by URL.
x??

---
#### Product Resource Hierarchy
Background context explaining the concept. Include any relevant formulas or data here.
Product resources can have nested relationships where specific products belong to collections.

:p How does REST reflect product relationships in URLs?
??x
REST reflects product relationships in URLs using hierarchical structures. For example, a specific product with an identifier 42 might be referenced as `https://www.example.com/products/42`.
x??

---
#### API Methods and Operations
Background context explaining the concept. Include any relevant formulas or data here.
APIs define methods to perform operations such as creating, updating, or deleting resources.

:p What methods could a CatalogService interface include?
??x
A CatalogService interface could include methods like `GetProducts`, `GetProduct`, `AddProduct`, `DeleteProduct`, and `UpdateProduct` to manage the product catalog.
x??

---
#### HTTP Request Handling with an Adapter
Background context explaining the concept. Include any relevant formulas or data here.
An adapter converts HTTP requests into service method calls and vice versa.

:p How does an HTTP adapter handle user interactions in a CatalogService?
??x
An HTTP adapter handles user interactions by converting HTTP requests (like `GET`, `POST`, etc.) into method calls on the CatalogService interface, then converting their return values into appropriate HTTP responses.
x??

---

**Rating: 8/10**

#### Resource URL Structure and Naming Conventions
When working with APIs, it is essential to follow a consistent and clear structure for URLs. This helps maintain simplicity even when dealing with nested resources.

URLs are typically structured as parent-child relationships where each resource's URL includes its unique identifier. For example:
- Parent: `/products/42`
- Child: `/products/42/reviews`

Appending more nested resources, such as reviews, can make the URL complex but is necessary for detailed resource management.
:p How should URLs be structured for APIs with nested resources?
??x
URLs in APIs are structured to reflect hierarchical relationships between resources. For example, a product may have associated reviews, and these would be represented by appending the review resource name after the parent product identifier.

For instance:
- `/products/42` refers to a specific product.
- `/products/42/reviews` lists all reviews for that product.

To add more nested resources like individual review details, the URL further refines this structure, e.g., `/products/42/reviews/1`.

This hierarchical approach keeps URLs clear and understandable while maintaining the necessary depth to manage complex resource structures.
x??

---

#### JSON Representation of Resources
JSON (JavaScript Object Notation) is commonly used to represent non-binary resources in REST APIs due to its simplicity and readability.

A typical product representation might look like this:
```json
{
    "id": 42,
    "category": "Laptop",
    "price": 999
}
```

Clients can request specific representations by adding headers to their requests, instructing the server on preferred formats.
:p How is a resource typically represented in JSON within REST APIs?
??x
A resource in a REST API is often represented using JSON (JavaScript Object Notation). This format allows for clear and easy-to-read data representation. For example, a product might be structured as follows:
```json
{
    "id": 42,
    "category": "Laptop",
    "price": 999
}
```
This JSON object includes attributes such as `id`, `category`, and `price`. Clients can specify their preferred representation by including appropriate headers in their requests, which the server then uses to format its responses.

For instance, a client might send:
```http
Accept: application/json
```
To indicate it prefers JSON over other formats.
x??

---

#### HTTP Request Methods for CRUD Operations
HTTP request methods are used to create, read, update, and delete resources. The most common methods include POST, GET, PUT, and DELETE.

- **POST**: Used to create new resources.
- **GET**: Retrieves a resource or a collection of resources.
- **PUT**: Updates an existing resource.
- **DELETE**: Deletes a resource.

These methods are classified as either safe (no side effects) or idempotent (executing the same request multiple times has the same result).

:p What HTTP methods can be used to perform CRUD operations on RESTful resources?
??x
HTTP provides several methods for performing CRUD (Create, Read, Update, Delete) operations on RESTful resources:

- **POST**: Used to create a new resource. For example:
  ```http
  POST /products
  Content-Type: application/json

  {
      "category": "Laptop",
      "price": 999
  }
  ```

- **GET**: Retrieves a single resource or a collection of resources with optional filtering, pagination, and sorting. For example:
  ```http
  GET /products?category=Laptop&page=1&sort=price:asc
  ```

- **PUT**: Updates an existing resource by replacing its current state. For example:
  ```http
  PUT /products/42
  Content-Type: application/json

  {
      "category": "Laptop",
      "price": 999
  }
  ```

- **DELETE**: Deletes a resource permanently. For example:
  ```http
  DELETE /products/42
  ```

These methods are classified based on their safety and idempotency properties, which are crucial for ensuring reliable request handling.
x??

---

#### HTTP Status Codes and Their Meanings
HTTP responses include status codes that indicate whether a request was successful or encountered errors. Status codes fall into different categories:

- **2xx Success**: Indicate the success of the client’s request.
  - `200 OK`: The request succeeded, and the response body contains the requested resource.

- **3xx Redirection**: Indicate that further action is required by the client to complete the request. For example:
  - `301 Moved Permanently`: The requested resource has been permanently moved to a new URL specified in the Location header.

- **4xx Client Errors**: Indicate errors on the part of the client. These should not be retried.
  - `400 Bad Request`: The request was invalid or cannot be fulfilled due to bad syntax.
  - `401 Unauthorized`: The client is unauthorized to access a resource.
  - `403 Forbidden`: The user is authenticated but does not have permission to access the requested resource.
  - `404 Not Found`: The server couldn’t find the requested resource.

- **5xx Server Errors**: Indicate errors on the part of the server. These might be retryable if temporary issues are resolved.
  - `500 Internal Server Error`: A generic error indicating a failure in the server.
  - `502 Bad Gateway`: An invalid response from an upstream server.
  - `503 Service Unavailable`: The server is temporarily unable to handle the request due to a temporary overloading or maintenance of the server.

:p What are HTTP status codes used for, and what do they signify?
??x
HTTP status codes provide important information about the outcome of client requests. They fall into different categories:

- **2xx Success**: Indicate that the client’s request was successful.
  - `200 OK`: The request succeeded, and the response body contains the requested resource.

- **3xx Redirection**: Indicate that further action is required by the client to complete the request.
  - `301 Moved Permanently`: The requested resource has been permanently moved to a new URL specified in the Location header.

- **4xx Client Errors**: Indicate errors on the part of the client. These should not be retried due to issues with the client’s input or authorization.
  - `400 Bad Request`: The request was invalid or cannot be fulfilled due to bad syntax.
  - `401 Unauthorized`: The client is unauthorized to access a resource.
  - `403 Forbidden`: The user is authenticated but does not have permission to access the requested resource.
  - `404 Not Found`: The server couldn’t find the requested resource.

- **5xx Server Errors**: Indicate errors on the part of the server, often due to temporary issues. These might be retryable if resolved over time.
  - `500 Internal Server Error`: A generic error indicating a failure in the server.
  - `502 Bad Gateway`: An invalid response from an upstream server.
  - `503 Service Unavailable`: The server is temporarily unable to handle the request due to a temporary overloading or maintenance of the server.

Understanding these status codes helps in diagnosing issues and ensuring proper handling of client requests.
x??

---

**Rating: 8/10**

#### OpenAPI Specification Overview
OpenAPI is a popular IDL for defining RESTful APIs based on HTTP. It allows formally describing an API's interface in a YAML document, including endpoints, request methods, response status codes, and resource representations.
:p What does OpenAPI enable us to define for our RESTful services?
??x
OpenAPI enables the formal definition of the operations (endpoints) and their corresponding HTTP methods, parameters, responses, and data schemas for a RESTful API. This is done through a YAML document that can be used to generate documentation, client SDKs, and other necessary components.
```yaml
openapi: 3.0.0
info:
  version: "1.0.0"
  title: Catalog Service API
paths:
  /products:
    get:
      summary: List products
      parameters:
        - in: query
          name: sort
          required: false
          schema:
            type: string
      responses:
        '200':
          description: list of products in catalog
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/ProductItem'
        '400':
          description: bad input
components:
  schemas:
    ProductItem:
      type: object
      required:
        - id
        - name
        - category
      properties:
        id:
          type: number
        name:
          type: string
        category:
          type: string
```
x??

---

#### API Evolution and Versioning
As APIs evolve, changes need to be made to adapt to new use cases. It is crucial to avoid breaking changes that require all clients to be updated simultaneously.
:p What are the two types of changes in an API that can break compatibility?
??x
The two types of changes that can break compatibility in an API are endpoint-level and message-level changes:
- **Endpoint-Level Changes**: Changing the URL or path of a resource, e.g., changing `/products` to `/fancy-products`.
- **Message-Level Changes**: Modifying request or response schemas in a backward-incompatible way. For example, changing the data type of properties like `category` from `string` to `number`.

To support breaking changes, APIs should be versioned using methods such as URL prefixing (`/v1/products/`), custom headers (`Accept-Version: v1`), or content negotiation.
x??

---

#### Backwards Compatibility in REST APIs
Backwards compatibility is crucial when evolving an API. It ensures that clients written for older versions of the API can still work with newer versions without requiring updates.
:p What are some strategies to maintain backwards compatibility when evolving an API?
??x
To maintain backwards compatibility while evolving an API, consider the following strategies:
- **URL Versioning**: Use URL prefixes like `/v1/` or `/v2/` for new resources.
- **Custom Headers**: Introduce custom headers such as `Accept-Version: v1`.
- **Content Negotiation**: Leverage HTTP content negotiation using the `Accept` header to support different versions.

These strategies allow clients to opt-in to newer APIs without breaking existing implementations.
x??

---

#### Tools for Managing API Changes
There are tools available that can help manage and detect breaking changes in API definitions. These tools can be integrated into continuous integration pipelines to ensure compatibility is maintained during development.
:p What tools are mentioned for comparing OpenAPI specifications?
??x
The text mentions the following tools for comparing OpenAPI specifications:
- **Azure OpenAPI Diff**: A tool specifically designed to compare IDL specifications and detect breaking changes.

These tools assist in maintaining API compatibility by automatically identifying changes that may break existing clients.
x??

---

