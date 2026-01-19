# High-Quality Flashcards: Designing-data-intensive-applications_-the-big-ideas-behind-reliable-scalable_processed (Part 5)


**Starting Chapter:** Query Languages for Data

---


#### Relational and Document Databases Convergence
:p How are relational and document databases becoming more similar over time?
??x
Relational and document databases are converging through features such as JSON support in relational databases and query language enhancements in document databases. This convergence allows applications to leverage the strengths of both models, using hybrid approaches that best fit their needs. Examples include PostgreSQL's and MySQL's JSON support and RethinkDB's ability to perform joins similar to those found in traditional relational databases.
x??

---


#### Query Languages: Imperative vs Declarative
:p What is the difference between an imperative query language and a declarative one?
??x
An imperative query language, like many common programming languages, specifies step-by-step instructions for the computer to follow. An example of this is shown in the provided code where animals are filtered to return only sharks:
```java
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
In contrast, a declarative query language like SQL or relational algebra specifies the desired pattern of data without detailing how to achieve it. The example provided for the imperative approach can be expressed more concisely in a declarative manner:
```sql
sharks = σ family="Sharks" (animals)
```
The key difference is that the database's query optimizer decides on the most efficient way to execute a declarative query, while an imperative query must provide specific instructions.
x??

---


#### Benefits of Declarative Query Languages
:p Why are declarative query languages more attractive than imperative ones?
??x
Declarative query languages like SQL or relational algebra are more concise and easier to work with compared to imperative APIs. They also hide the internal implementation details of the database engine, allowing for performance improvements without requiring changes to queries. Additionally, they can facilitate parallel execution better because they specify only the desired results rather than the exact steps required to achieve them.
x??

---

---


#### MapReduce Programming Model
Background context explaining the MapReduce programming model. It is a framework for processing large data sets across many machines, popularized by Google. The Map function processes input data and generates intermediate key-value pairs, while the Reduce function aggregates these pairs to generate output.

:p What are the main components of the MapReduce programming model?
??x
The main components of the MapReduce programming model are:
- **Map Function**: Takes a set of inputs and generates a set of intermediate key-value pairs.
- **Shuffle Phase**: Shuffles the generated intermediate key-value pairs to the corresponding reducers based on their keys.
- **Reduce Function**: Aggregates the values for each unique key, producing the final output.

For example:
```java
// Pseudocode for Map and Reduce functions in MapReduce

public void map(String key, String value) {
    // Parse input (key, value)
    emit(key, value);
}

public void reduce(Key key, Iterator values) {
    while (values.hasNext()) {
        // Process the values associated with a given key
    }
}
```
x??

---


#### MongoDB MapReduce Example
Background context explaining how the same query can be implemented in MongoDB using its `mapReduce` function.

:p How would you write a MongoDB mapReduce script to count the number of shark sightings per month?
??x
To write a MongoDB mapReduce script to count the number of shark sightings per month, use the following code:

```javascript
db.observations.mapReduce(
    function() {  // Map Function
        var year = this.observationTimestamp.getFullYear();
        var month = this.observationTimestamp.getMonth() + 1;
        emit(year + "-" + month, this.numAnimals);
    },
    function(key, values) {  // Reduce Function
        return Array.sum(values);
    },
    {
        query: { family: "Sharks" },  // Filter by 'Sharks' family
        out: "monthlySharkReport"     // Output collection name
    }
);
```

This script works as follows:
1. **Map Function**: Extracts the year and month from `observationTimestamp` and emits a key-value pair.
2. **Reduce Function**: Sums up the values for each unique key (month and year).
3. **Query Filter**: Filters documents where the family is `'Sharks'`.
4. **Output Collection**: Stores results in `monthlySharkReport`.

The output will be stored in the collection `monthlySharkReport`, providing a count of shark sightings per month.
x??

---


#### MongoDB Aggregation Pipeline
Background context explaining how the aggregation pipeline can be used to achieve similar functionality with a more declarative approach.

:p How would you write an aggregation pipeline query in MongoDB to count the number of shark sightings per month?
??x
To write an aggregation pipeline query in MongoDB to count the number of shark sightings per month, use the following code:

```javascript
db.observations.aggregate([
    { $match: { family: "Sharks" } },  // Filter by 'Sharks' family
    {
        $group: {
            _id: { year: { $year: "$ observationTimestamp" }, month: {$month: "$ observationTimestamp" } },
            totalAnimals: { $sum: "$ numAnimals" }
        }
    }
]);
```

This pipeline works as follows:
1. **$match Stage**: Filters documents where the family is `'Sharks'`.
2. **$group Stage**: Groups by year and month using `$ year` and `$ month`, respectively, and sums up `numAnimals`.

The result will provide a count of shark sightings per month in the aggregation pipeline output:
```javascript
{ _id: { year: 2023, month: 10 }, totalAnimals: 5 }
```
x??

---

---


#### Graph Data Models Overview
Background context: In data modeling, many-to-many relationships are crucial. While document and relational models handle simpler cases well, more complex many-to-many connections may require a graph model. A graph consists of vertices (nodes) and edges (relationships). Typical examples include social networks, the web graph, and road networks.

:p What is a graph in data modeling?
??x
A graph in data modeling consists of two main types of objects: vertices (nodes or entities) and edges (relationships or arcs). These elements are used to represent complex relationships between data points. For example, in a social network, people are nodes, and connections between them are edges.
x??

---


#### Property Graph Model
Background context: The property graph model allows flexibility by using unique identifiers for vertices and edges, along with labels and properties. Vertices can connect to any other vertex through edges, and each edge has labels describing the type of relationship.

:p What are the main components of a vertex in a property graph?
??x
Vertices in a property graph have:
- A unique identifier (vertex_id)
- A set of outgoing edges
- A set of incoming edges
- A collection of properties (key-value pairs)

Example: In Facebook’s data model, vertices could represent people, locations, events, checkins, and comments.
x??

---


#### Edge Components in Property Graphs
Background context: Edges connect two vertices and have unique identifiers, labels to describe the relationship, and associated properties. Efficient traversal is enabled by indexes on tail_vertex and head_vertex.

:p What information does an edge contain in a property graph?
??x
An edge contains:
- A unique identifier (edge_id)
- The starting vertex (tail_vertex) as a reference to another vertex
- The ending vertex (head_vertex) as a reference to another vertex
- A label describing the relationship between vertices
- A collection of properties (key-value pairs)

Example: In a social network, an edge labeled "FRIEND" might connect two people.
x??

---


#### Efficient Traversal Using Indexes
Background context: In property graphs, indexes on `tail_vertex` and `head_vertex` enable efficient traversal. This allows for quick access to incoming or outgoing edges from any vertex.

:p How do indexes on tail_vertex and head_vertex facilitate graph traversal?
??x
Indexes on `tail_vertex` and `head_vertex` allow for fast querying of incoming and outgoing edges from a specific vertex. For instance, if you want to find all the friends of a person (vertices with an edge labeled "FRIEND" pointing to them), you would query using the index.

Example:
```sql
SELECT * FROM edges WHERE head_vertex = <vertex_id> AND label = 'FRIEND';
```
x??

---

---

