# High-Quality Flashcards: Designing-data-intensive-applications_-the-big-ideas-behind-reliable-scalable_processed (Part 4)


**Starting Chapter:** Many-to-One and Many-to-Many Relationships

---


#### Why Store IDs Instead of Text Strings
Background context: The text discusses why it is advantageous to store IDs instead of plain-text strings for entities like regions and industries. Storing an ID has several benefits, including consistency, avoiding ambiguity, ease of updating, localization support, and better search capabilities.
:p What are the reasons given in the text for preferring to store region and industry IDs over their textual descriptions?
??x
The main reasons provided include:
- Consistent style and spelling across profiles
- Avoiding ambiguity (e.g., several cities with the same name)
- Ease of updating—since the ID is stored in only one place, changes can be propagated easily
- Localization support—standardized lists can be localized for different languages
- Better search capabilities—e.g., a search for philanthropists in Washington matches profiles where Seattle (which is in Washington) is referenced through an ID

For example:
```java
// Example of storing region and industry IDs
class Profile {
    String id;
    int regionId; // Instead of using "Greater Seattle Area" as a string
    int industryId; // Instead of using "Philanthropy"
}
```
x??

---


#### Advantages of Using IDs Over Text Strings
Background context: The text elaborates on the advantages of using unique identifiers (IDs) for entities instead of storing their textual descriptions in multiple places.
:p What are the benefits mentioned for using IDs over plain-text strings?
??x
The benefits include:
- No need to change IDs even if the associated information changes, ensuring consistency and avoiding write overheads
- Less risk of inconsistencies since redundant copies do not need updating

For example:
```java
// Example of a database normalization with IDs
class Region {
    String id;
    String name; // This is stored in only one place
}

class Profile {
    int regionId; // References the ID from the Region class
}
```
x??

---


#### Document Model Limitations in Supporting Joins
Background context: The text points out that document databases often lack support for joins, necessitating application-level workarounds. This can lead to increased complexity and performance overhead.
:p Why are joins not supported natively in some document databases?
??x
Joins are not supported natively in some document databases because:
- They do not fit well into the document model designed for one-to-many relationships
- Support for joins is often weak or non-existent

For example, a document database like MongoDB might require application-level logic to emulate join functionality:

```java
// Emulating a join in Java
List<Profile> profiles = profileCollection.find();
Map<String, Organization> organizationsById = organizationCollection.find().stream()
    .collect(Collectors.toMap(Organization::getId, Function.identity()));
for (Profile profile : profiles) {
    // Fetch details from the organizations map using profile's organizationId
}
```
x??

---


#### Many-to-Many Relationships and New Features
Background context: The text discusses how adding new features to an application can introduce many-to-many relationships, which are more complex to manage in a document database.
:p How do many-to-many relationships affect data modeling when moving from a simple one-to-many model?
??x
Many-to-many relationships complicate data modeling because:
- They require additional references and potentially more queries to fetch related data
- Joins become necessary for querying across multiple entities, which can be complex in document databases

For example, adding recommendations introduces many-to-many relationships:

```java
// Example of a many-to-many relationship
class Recommendation {
    String id;
    String recommenderId; // References the user making the recommendation
    String recommendedUserId; // References the user receiving the recommendation
}
```
x??

---


#### Query Execution in Relational Model
The relational model simplified querying and updating by laying out all data openly in tables. A query optimizer automatically decided how to execute a query and which indexes to use, making the process more efficient and flexible.

:p How does the relational model handle queries differently from the network model?
??x
In the relational model, queries are executed by selecting rows based on arbitrary conditions or keys without needing complex access paths. The query optimizer automatically decides the best way to execute the query and which indexes to use, making the process more efficient and flexible compared to manual path selection in the network model.
x??

---


#### Query Optimizers in Relational Databases
Background context: The text explains how query optimizers work in relational databases and why developers rarely need to think about them. It highlights that new indexes can be declared without changing queries, making it easier for developers to add features to applications.

:p What is the key benefit of having a query optimizer in relational databases?
??x
The key benefit is that you only need to build a query optimizer once, and all applications using the database can benefit from it. This simplifies the development process as changes in indexing are automatically handled by the optimizer without requiring developers to manually modify their queries.
x??

---


#### Relational Databases vs. Document Databases
Background context: The text compares relational databases and document databases, focusing on their data models. It highlights advantages of both systems, such as schema flexibility in document databases versus better support for joins in relational databases.

:p What are the main arguments in favor of the document data model?
??x
The main arguments in favor of the document data model include:
- Schema flexibility: Documents can be easily modified and adapted to changing requirements.
- Better performance due to locality: Data is stored together, making it easier to load entire trees or structures at once.
- Closer alignment with application data structures: Documents can mirror the hierarchical nature of application data.

However, relational databases offer better support for complex relationships like many-to-one and many-to-many through joins.
x??

---


#### Limitations of Document Databases
Background context: The text points out limitations in document databases, such as the inability to refer directly to nested items within a document. It also mentions that many-to-many relationships can be less appealing in certain applications.

:p What limitation does the document model have when compared to the hierarchical model?
??x
The document model has a limitation where you cannot directly refer to nested items within a document. Instead, you need to specify paths like "the second item in the list of positions for user 251," similar to access paths in the hierarchical model. This can be cumbersome when dealing with deeply nested structures.

Example:
```java
// Pseudocode example
User user = getUserById(251);
Position position = (Position) user.get("positions").get(1); // Accessing a nested item by path
```
x??

---


#### Fault-Tolerance and Concurrency Handling
Background context: The text briefly mentions that comparison between relational databases and document databases includes fault-tolerance properties and handling of concurrency, which are discussed in later chapters.

:p What topics does the text suggest will be covered in later chapters?
??x
The text suggests that later chapters will cover:
- Fault-tolerance properties (Chapter 5)
- Handling of concurrency (Chapter 7)

These topics provide a more comprehensive comparison between relational and document databases beyond just their data models.
x??

---

---


#### Denormalization and Joins
Background context: The need to reduce joins can sometimes be addressed by denormalizing data, which involves adding redundant copies of data. However, this approach requires additional application code to ensure consistency among these redundant copies.

:p What is denormalization?
??x
Denormalization refers to the process of storing related data in a single database record or document to reduce the need for joins. While it can simplify some queries and reduce network latency by minimizing trips to the database, it introduces complexity into the application code that must ensure consistency across multiple copies of the same data.

```java
// Example of denormalization in Java
public class User {
    private String fullName;
    private String firstName;
    private String lastName;

    public void setFullName(String name) {
        this.fullName = name;
        // Split full name into first and last names
        if (name.contains(" ")) {
            String[] parts = name.split(" ");
            this.firstName = parts[0];
            this.lastName = parts[1];
        }
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }
}
```
x??

---


#### Emulating Joins in Application Code
Background context: In some cases, the application can emulate joins by making multiple requests to the database. However, this approach shifts complexity from the database to the application and typically results in slower performance compared to a join performed by the specialized database code.

:p What are the downsides of emulating joins using application code?
??x
Emulating joins via application code involves making multiple database queries, which can lead to increased latency and reduced performance. Each additional query adds network overhead and processing time, potentially degrading overall system efficiency.

```java
// Pseudocode for emulating a join in Java
public List<User> getUsersWithOrders() {
    // Make two separate database calls: one for users and another for orders
    List<User> users = getUserList();
    Map<Integer, Order> orderMap = getOrderMap();

    List<User> resultUsers = new ArrayList<>();
    for (User user : users) {
        User withOrders = new User(user);
        // Add orders to the user object based on the order map
        for (Order order : orderMap.values()) {
            if (order.getUserId() == user.getId()) {
                withOrders.addOrder(order);
            }
        }
        resultUsers.add(withOrders);
    }
    return resultUsers;
}
```
x??

---


#### Schema Flexibility in Document Models
Background context: Many document databases allow for flexible schemas, meaning that documents can contain arbitrary fields. This flexibility comes at the cost of requiring application code to handle unknown or changing structures.

:p What is schema-on-read?
??x
Schema-on-read refers to a data model where the structure of the data is not enforced by the database but is interpreted only when the data is read. In contrast, schema-on-write enforces a fixed schema during data insertion, ensuring all written data conforms to it.

```java
// Example of schema-on-read in Java
public class User {
    private String name;
    // Additional fields are dynamically added based on incoming documents
}
```
x??

---


#### Downtime in Schema Changes
Background context: Relational databases often have downtime during schema changes due to the need to copy data or ensure consistency across all transactions.

:p What are some tools for managing database downtime during migrations?
??x
Tools such as pt-online-schema-change (for MySQL) and Liquibase (for various relational databases) can help manage schema changes with minimal downtime. These tools work by creating a temporary table, copying data over, applying the new schema, and then swapping in the temporary table.

```sh
# Example command for pt-online-schema-change on MySQL
pt-online-schema-change --alter "ADD COLUMN first_name text" D=example,t=users
```
x??

---

---


---
#### Schema-on-Read Approach
Background context: The schema-on-read approach allows for flexibility by not enforcing a strict structure during storage, but defining it at read time. This is particularly useful when dealing with heterogeneous data or data structures that are determined externally and may change frequently.
:p What does the schema-on-read approach allow in terms of data handling?
??x
The schema-on-read approach allows applications to handle and process data without requiring a predefined structure during storage. Instead, the application defines the schema at read time based on specific needs, making it highly flexible for dealing with heterogeneous or changing data structures.
x??

---


#### Data Locality for Queries
Background context: Document databases store documents as single continuous strings (e.g., JSON, XML). This allows for better performance when large parts of a document need to be accessed simultaneously. However, this advantage is only useful if the entire document needs to be read at once.
:p How does data locality benefit queries in document databases?
??x
Data locality benefits queries by ensuring that all parts of a single document are stored contiguously on disk, allowing for efficient access when the entire document or large portions of it need to be retrieved. This reduces the number of index lookups and minimizes disk seeks.
x??

---


#### Document Database Write Operations
Background context: Writing to documents in a database can be challenging due to the nature of the data being stored as strings. Full rewriting of the document is typically required for updates, except when changes do not alter the encoded size of the document. This can be wasteful on large documents.
:p What are the challenges associated with writing to documents in a database?
??x
Challenges associated with writing to documents include the need to rewrite the entire document upon update, which can be inefficient and wasteful, especially for large documents. Only updates that do not change the encoded size of the document can be performed in place.
x??

---


#### Performance Limitations of Document Databases
Background context: The performance of document databases can be limited due to their write operations requiring full document rewriting and the need to load entire documents even when only small parts are accessed. These limitations reduce the usefulness of document databases in certain scenarios.
:p What are the main performance limitations of document databases?
??x
The main performance limitations include the necessity to rewrite the entire document upon update, which can be inefficient for large documents, and the requirement to load the full document even when only a small portion is accessed. These factors reduce the overall efficiency and make document databases less suitable in certain use cases.
x??

---

