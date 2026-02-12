# High-Quality Flashcards: Designing-data-intensive-applications_-the-big-ideas-behind-reliable-scalable_processed (Part 4)


**Starting Chapter:** Are Document Databases Repeating History

---


---
#### Hierarchical Model Overview
Background context explaining how IMS used a hierarchical model to represent data. The hierarchical model is characterized by records nested within each other, much like a JSON structure.

:p What is the hierarchical model and how does it differ from document databases?
??x
The hierarchical model represents all data as a tree of records nested within records. Unlike JSON in document databases where data can be more flexible with its structure, IMS had strict rules about parent-child relationships. Each record has exactly one parent, making many-to-many relationships complex.

```java
// Example of hierarchical data representation (simplified)
class Record {
    String id;
    List<Record> children; // Only allows one parent

    void addChild(Record child) {
        children.add(child);
    }
}
```
x??

---
#### Network Model Overview
Background context explaining the CODASYL network model, which generalized the hierarchical model by allowing records to have multiple parents. This enabled many-to-one and many-to-many relationships.

:p What is the network model, and how does it differ from the hierarchical model?
??x
The network model allows a record to have multiple parents, making many-to-many relationships possible. Unlike the hierarchical model where each record has exactly one parent, the network model uses access paths that can be manually managed by programmers. These access paths were like pointers in a programming language but stored on disk.

```java
// Example of network data representation (simplified)
class Record {
    String id;
    List<String> parents; // Multiple parents allowed

    void addParent(String parent) {
        parents.add(parent);
    }
}
```
x??

---
#### Relational Model Overview
Background context explaining the relational model, which represented data in tables and made querying more flexible. Unlike hierarchical or network models, the relational model uses foreign keys to establish relationships between tables.

:p What is the relational model, and how does it differ from previous models?
??x
The relational model represents data as a collection of tuples (rows) in tables. It uses foreign key constraints to manage relationships between different tables, making queries more flexible. Unlike hierarchical or network models where access paths needed manual management, the relational model allows automatic selection of access paths by query optimizers.

```java
// Example of relational database table (simplified)
public class UserTable {
    String id;
    String name;
}

public class RegionTable {
    String id;
    String regionName;
    List<String> users; // Uses foreign keys to link regions and users

    void addUser(String userId) {
        users.add(userId);
    }
}
```
x??

---
#### Access Paths in Network Model
Background context explaining the concept of access paths in the network model, which were crucial for navigating data but required manual management.

:p What are access paths in the network model?
??x
Access paths in the network model refer to the ways records can be linked and accessed. Unlike foreign keys in relational databases, these links function more like pointers in a programming language, stored on disk. Accessing data often involved following multiple paths from root records to find specific data.

```java
// Example of access path management (simplified)
public class Record {
    String id;
    List<String> parents; // Multiple parents allowed

    void addParent(String parentId) {
        parents.add(parentId);
    }

    boolean findPathToRecord(Record target, Set<String> visited) {
        if (this == target) return true;
        for (String parent : parents) {
            Record parentRecord = getRecordById(parent); // Get record by ID
            if (!visited.contains(parent)) {
                visited.add(parent);
                if (parentRecord.findPathToRecord(target, visited)) return true;
            }
        }
        return false;
    }
}
```
x??

---
#### Challenges in Hierarchical and Network Models
Background context explaining the challenges faced with hierarchical and network models, such as difficulty in managing access paths and complications in making changes to data models.

:p What were some of the main challenges faced when using hierarchical or network models?
??x
Hierarchical and network models posed significant challenges. The primary issues included:

- **Complexity**: Manual management of access paths was required, making queries and updates complex.
- **Inflexibility**: Changes to data models often necessitated rewriting large amounts of database query code.
- **Performance**: Accessing records via multiple parents could be inefficient due to the need for manual path tracking.

These challenges led to the development of more flexible alternatives like the relational model.

```java
// Example of handling complex queries in hierarchical or network model (simplified)
public boolean findRecordByPath(Record start, Record target) {
    Set<Record> visited = new HashSet<>();
    return start.findPathToRecord(target, visited);
}
```
x??

---


#### Query Optimizers and Indexes

Background context explaining how query optimizers work within relational databases. The text mentions that query optimizers are complex but once built, they benefit all applications using the database without requiring changes to queries.

:p What is a query optimizer in a relational database?
??x
A query optimizer is an automated system within a relational database management system (RDBMS) designed to select the most efficient way to execute a given SQL statement. It decides on the best execution plan by considering factors like indexes, data distribution, and statistics about the data.

It works behind the scenes so developers rarely need to worry about it but can declare new indexes which automatically get used efficiently by the query optimizer.
x??

---

#### Relational Model Benefits

Background context explaining the benefits of the relational model, including its ability to handle new features without changing existing queries. The text highlights that once a query optimizer is built, all applications benefit from it.

:p What makes the relational model easier for adding new application features?
??x
The relational model simplifies adding new features because the query optimizer is built once and can be used by multiple applications. Developers do not need to change existing queries when they declare a new index; the query optimizer automatically chooses the most appropriate indexes.

For example, if you want to add a new type of search or filter, you could just create an index on that field and the system will use it effectively without requiring changes to your existing SQL queries.
x??

---

#### Document Databases vs Relational Models

Background context comparing document databases with relational models, focusing on storage of nested records. The text mentions how both handle many-to-one and many-to-many relationships differently.

:p How do document databases handle nested records compared to relational models?
??x
Document databases store nested records within the parent record, similar to the hierarchical model. For example, a user's `positions`, `education`, and `contact_info` are stored directly under the user's document rather than in separate tables as in the relational model.

In contrast, in the relational model, such data would typically be split into multiple tables (like positions, education, and contact_info).
x??

---

#### Fault-Tolerance Properties

Background context comparing fault-tolerance properties between relational databases and document databases. The text notes that both have different approaches to handling these properties but focuses on data models.

:p What is a key difference in fault tolerance between relational databases and document databases?
??x
Relational databases often provide ACID (Atomicity, Consistency, Isolation, Durability) guarantees, ensuring transactions are processed reliably. Document databases may offer eventual consistency or weaker forms of durability to achieve better performance.

For example:
- Relational databases ensure that a transaction is completed as a whole or not at all.
- Document databases might allow data updates across multiple documents without immediate consistency.
x??

---

#### Performance Considerations

Background context explaining the performance benefits of document databases, particularly due to locality. The text mentions how nested records in document databases can provide better performance.

:p Why might document databases perform better for certain applications?
??x
Document databases often outperform relational databases when dealing with data that has a hierarchical or tree-like structure because they store related data together within the same document. This reduces the need to traverse multiple tables, leading to improved query performance due to spatial locality.

For example:
```java
// Retrieving all nested data in one go is faster
Document doc = db.getDocById(id);
List<Position> positions = doc.getPositions();
```
x??

---

#### Join Support

Background context comparing join support between relational and document databases. The text highlights that relational models provide better support for complex joins.

:p What advantage do relational databases have over document databases?
??x
Relational databases offer strong support for complex queries involving joins, which are crucial for handling many-to-one and many-to-many relationships. These capabilities can be essential in applications requiring intricate data analysis or reporting.

For instance:
```sql
-- SQL Example: Joining multiple tables
SELECT user.name, position.title
FROM users
JOIN positions ON users.id = positions.user_id;
```
x??

---

#### Many-to-Many Relationships

Background context discussing the handling of many-to-many relationships in both models. The text notes that relational databases handle these well, whereas document databases may struggle.

:p How are many-to-many relationships typically handled in relational databases?
??x
In relational databases, many-to-many relationships are usually managed using junction tables or associative entities. For example:
- A `users` table and a `positions` table can have a `user_positions` table linking them.
```sql
-- SQL Example: Creating a many-to-many relationship
CREATE TABLE user_positions (
    user_id INT,
    position_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (position_id) REFERENCES positions(id)
);
```
x??

---

#### Shredding in Relational Databases

Background context explaining the concept of "shredding" data, which is splitting document-like structures into multiple tables. The text describes how this can lead to more complex schemas.

:p What does it mean to "shred" a database schema?
??x
Shredding refers to breaking down a hierarchical or nested structure (like in documents) into several flat relational tables. This approach, used in the relational model, can result in a complex and unwieldy schema if not handled carefully.

For example:
```sql
-- Shredding an application's data structure
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);

CREATE TABLE positions (
    id INT PRIMARY KEY,
    title VARCHAR(50),
    description TEXT
);

CREATE TABLE user_positions (
    user_id INT,
    position_id INT,
    start_date DATE,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (position_id) REFERENCES positions(id)
);
```
x??

---


#### Denormalization and Joins
Background context: To reduce the need for joins, denormalizing the data can be an effective strategy. However, this approach requires the application to handle consistency manually.

:p What is denormalization, and why might it be used?
??x
Denormalization involves designing a database schema such that it avoids frequent joins by including redundant data in tables. This reduces the number of queries needed but increases storage requirements and the complexity of maintaining consistent data across multiple updates.
x??

---
#### Joins vs Application-Level Logic
Background context: While denormalization can reduce the need for joins, another approach is to emulate joins using application-level logic. However, this method moves complexity to the application code and often performs slower than database join operations.

:p What are some drawbacks of emulating joins in application code?
??x
Emulating joins at the application level means making multiple requests to the database, which can lead to increased latency and more complex application code. Additionally, it does not leverage the specialized optimization capabilities that databases have for join operations.
x??

---
#### Document Model Complexity
Background context: The document model allows flexible schema-on-read but introduces challenges in managing data format changes over time.

:p What are the main characteristics of a document database?
??x
Document databases store data as JSON-like documents, offering flexibility by allowing arbitrary keys and values. However, this means that there is no enforced schema; reading code must interpret the structure implicitly.
x??

---
#### Schema Flexibility in Document Databases
Background context: In contrast to traditional relational databases, document databases like MongoDB or CouchDB do not enforce a strict schema, leading to dynamic data structures.

:p How does a schema-on-read model differ from schema-on-write?
??x
Schema-on-read models allow arbitrary key-value pairs and interpret the structure only when reading the data. This contrasts with schema-on-write, where the database enforces a static schema on written data, ensuring consistency during writes.
x??

---
#### Schema Changes in Relational Databases
Background context: Changing the schema of a relational database can be complex due to potential downtime and performance issues.

:p What are the challenges associated with changing the schema in a relational database?
??x
Changing the schema in a relational database involves altering table structures, which can require significant time and resources. This process often necessitates downtime as the database locks tables during the operation. Even with tools like MySQL’s `ALTER TABLE` or PostgreSQL’s `CREATE INDEX`, the operation can still be slow due to the need to rewrite data.
x??

---
#### Code Example for Schema Changes
Background context: The following code demonstrates how schema changes might look in a document database versus a relational database.

:p Provide an example of altering a schema in both a document and a relational database.
??x
**Document Database (MongoDB):**
```javascript
// Adding new fields to documents
if (user && user.name && !user.first_name) {
    user.first_name = user.name.split(" ")[0];
}
```

**Relational Database:**
```sql
-- Add first name column
ALTER TABLE users ADD COLUMN first_name text;

-- Populate the first name from existing data
UPDATE users SET first_name = split_part(name, ' ', 1);
```
x??

---
#### Performance Considerations in Schema Changes
Background context: The performance of schema changes can vary significantly between different relational database systems.

:p What are some factors that affect the performance of altering a table in MySQL?
??x
Altering a table in MySQL is particularly slow because it often involves copying the entire table, which can result in significant downtime. However, tools like `pt-online-schema-change` and `pt-archiver` help mitigate these issues by performing schema changes without locking tables.
x??

---
#### Summary of Schema Enforcement Approaches
Background context: Different database models enforce schemas differently—some at read time (schema-on-read) and others at write time (schema-on-write).

:p What are the key differences between schema enforcement approaches in databases?
??x
Schema enforcement can be either:
- **Schema-on-read**: Data structures are interpreted dynamically when read, allowing flexibility but requiring application-level validation.
- **Schema-on-write**: The database enforces a static schema during writes to ensure data consistency.

These approaches have different trade-offs in terms of flexibility and performance.
x??

---


---
#### Schema-on-Read Approach
Background context: The schema-on-read approach allows an application to leave certain fields, such as `first_name`, set to their default values (e.g., NULL) and fill them in at read time. This is particularly useful when dealing with heterogeneous data—data where the structure can vary significantly between records or when external systems determine the structure.

:p What is the schema-on-read approach used for?
??x
The schema-on-read approach is used to handle situations where data items don't have a consistent structure, allowing flexibility in how fields are managed and populated. This approach is beneficial when:
- There are many different types of objects that can’t be easily segregated into separate tables.
- The data's structure is dictated by external systems beyond your control.

For example, consider an application that processes logs from various sources; each log might contain different information depending on its source, making it impractical to define a rigid schema in advance. In such cases, the application can read and process fields as needed without initially defining their presence or format.
x??

---
#### Data Locality for Queries
Background context: Storing documents as single continuous strings with encoding formats like JSON, XML, or BSON allows applications to benefit from data locality when accessing entire documents at once. This is particularly useful in scenarios where the application frequently needs to access large parts of a document, such as rendering it on a web page.

:p How does storing documents as single continuous strings enhance performance?
??x
Storing documents as single continuous strings enhances performance by reducing the need for multiple index lookups and minimizing disk seeks. When accessing an entire document, the database typically loads the whole document into memory at once, which is more efficient compared to splitting data across multiple tables.

However, this approach can be wasteful when only small portions of a large document are accessed because the entire document must still be loaded. For updates, the entire document often needs to be rewritten, even if only minor changes are made that don't affect its encoded size.

Code Example (Pseudocode):
```pseudocode
// Pseudocode for loading and updating a document in a document database
function loadDocument(docID) {
    // Load the entire document from disk into memory
    document = readFromDisk(docID)
    return document
}

function updateDocument(docID, changes) {
    // Load the entire document to check its size before updating
    originalDocument = loadDocument(docID)
    updatedDocument = applyChanges(originalDocument, changes)
    
    // If the document size remains the same after updates, in-place modification can be done.
    if (updatedDocument.size() == originalDocument.size()) {
        overwriteOriginalWith(updatedDocument)
    } else {
        rewriteEntireDocument(updatedDocument)
    }
}
```
x??

---
#### Document Database Performance Considerations
Background context: Document databases store data as single continuous strings, which can enhance performance for accessing large parts of documents at once. However, this approach comes with limitations:
- Loading the entire document into memory is required even when only a small portion is accessed.
- Updates to documents often necessitate rewriting the entire document.

:p Why are document databases generally recommended to keep documents fairly small?
??x
Document databases are generally recommended to keep documents fairly small and avoid writes that increase document size because:
- Loading large documents into memory can be wasteful, especially when only a small portion is needed.
- Updating large documents often requires rewriting the entire document, which can be inefficient.

Code Example (Pseudocode):
```pseudocode
// Pseudocode for handling document size and updates in a document database
function handleDocumentUpdates(docID, changes) {
    // Load the entire document into memory to check its size before updating
    originalDocument = loadDocument(docID)
    
    updatedDocument = applyChanges(originalDocument, changes)
    
    if (updatedDocument.size() == originalDocument.size()) {
        // If no change in size, perform in-place update
        overwriteOriginalWith(updatedDocument)
    } else {
        // Otherwise, rewrite the entire document
        rewriteEntireDocument(updatedDocument)
    }
}
```
x??

---
#### Convergence of Document and Relational Databases
Background context: While traditional relational databases did not natively support XML until mid-2000s, they now include functions to modify, index, and query XML documents. This convergence allows applications using document databases and relational databases to achieve similar functionality.

:p How do modern relational databases handle XML data?
??x
Modern relational databases, such as Oracle and SQL Server, have added native support for XML data, including:
- Functions to make local modifications to XML documents.
- Indexing and querying capabilities within XML documents.

This allows applications to use data models very similar to what they would do when using a document database, while still leveraging the strengths of relational databases in terms of transactional consistency and query optimization.

For example, Oracle supports multi-table index cluster tables that allow related rows from different tables to be interleaved, providing similar benefits of data locality as seen in document databases.
x??

---


#### Nonsimple Domains and JSON Support
Background context: In Codd's original description of the relational model, nonsimple domains allowed values within a row to be more complex than primitive datatypes. This concept is akin to modern-day JSON documents, which can store nested structures.

:p What are nonsimple domains in Codd's relational model?
??x
Nonsimple domains allow a value in a row to be a nested relation (table), enabling the storage of complex data structures within rows. This is similar to how JSON supports nested objects and arrays.
x??

---
#### Relational Databases with JSON Support
Background context: Several modern relational databases such as PostgreSQL, MySQL, and IBM DB2 have added support for JSON documents to handle more flexible data structures.

:p How do PostgreSQL, MySQL, and IBM DB2 support JSON documents?
??x
PostgreSQL since version 9.3, MySQL since version 5.7, and IBM DB2 since version 10.5 all provide native support for JSON documents. This allows developers to store complex data structures similar to JSON within their relational databases.
x??

---
#### RethinkDB and MongoDB Join Support
Background context: While traditional document databases like MongoDB do not fully support SQL joins, some databases like RethinkDB offer query language features that enable more relational-like operations.

:p How does RethinkDB handle database references?
??x
RethinkDB supports a form of join-like operations through its query language. It can automatically resolve database references, effectively performing client-side joins. However, these operations are typically slower and less optimized compared to in-database joins.
x??

---
#### Relational vs Document Databases Complementarity
Background context: As data models evolve, there is a trend towards hybrid systems that blend the strengths of both relational and document databases. This allows applications to leverage the best features based on their specific needs.

:p Why are relational and document databases becoming more similar?
??x
The integration of document-like data handling with the ability to perform relational queries makes it easier for applications to use a combination of features from both paradigms, providing greater flexibility and better performance.
x??

---
#### SQL vs Imperative Languages
Background context: SQL is a declarative query language that differs fundamentally from imperative languages used in databases like IMS and CODASYL. This difference impacts how operations are performed and optimized.

:p What distinguishes SQL from imperative languages?
??x
SQL, being declarative, allows users to specify the desired data pattern without detailing how to achieve it. In contrast, imperative languages require step-by-step instructions for performing tasks.
Example of imperative code:
```javascript
function getSharks() {
    var sharks = [];
    for (var i = 0; i < animals.length; i++) {
        if (animals[i].family === "Sharks") {
            sharks.push(animals[i]);
        }
    }
    return sharks;
}
```
x??

---
#### Declarative vs Imperative Query Execution
Background context: Declarative languages like SQL and relational algebra focus on specifying the desired output, while imperative languages detail step-by-step operations. This difference affects performance optimization and parallel execution.

:p How do declarative query languages benefit database systems?
??x
Declarative query languages enable better optimizations because they abstract away implementation details, allowing databases to make changes internally without requiring users to modify their queries.
Example of a SQL query:
```sql
SELECT * FROM animals WHERE family = 'Sharks';
```
x??

---
#### Parallel Execution in Query Languages
Background context: Modern CPUs improve performance by adding more cores rather than increasing clock speeds. Declarative languages are better suited for parallel execution as they focus on the data pattern rather than step-by-step instructions.

:p Why is declarative language more suitable for parallel execution?
??x
Declarative languages specify the desired output without detailing the steps, making them ideal for parallel processing. The database can distribute queries across multiple cores and machines more effectively.
Example of a parallel SQL query:
```sql
SELECT * FROM animals WHERE family = 'Sharks' ORDER BY name;
```
x??

---

