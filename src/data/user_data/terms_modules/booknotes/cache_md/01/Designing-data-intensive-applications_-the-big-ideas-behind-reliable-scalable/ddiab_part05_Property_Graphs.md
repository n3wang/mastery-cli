# High-Quality Flashcards: Designing-data-intensive-applications_-the-big-ideas-behind-reliable-scalable_processed (Part 5)


**Starting Chapter:** Property Graphs

---


#### Many-to-Many Relationships and Data Models

Background context explaining the concept. In many applications, data often involves complex relationships beyond simple one-to-many or tree-structured models. Many-to-many relationships are common, such as social networks, web graphs, road/rail networks.

If applicable, add code examples with explanations.
:p What is a key characteristic of data that necessitates using graph-like data models?
??x
Many-to-many relationships require a more flexible structure than one-to-one or tree-structured models because they involve connections between multiple entities in various ways. For example, people can have friends from different cities or social circles, and web pages can link to other pages through multiple links.

In code terms, imagine trying to model friendships using a traditional relational database (assuming each friendship is stored in its own table with `user1_id` and `user2_id` columns). This approach quickly becomes complex as the number of relationships grows. Graph models handle such scenarios more naturally by representing entities as nodes and relationships as edges.

```java
public class Friendship {
    int user1Id;
    int user2Id;

    // Additional properties like timestamp, status (active/inactive)
}
```
x??

---

#### Social Graphs

Background context explaining the concept. A social graph is a type of data model that represents people and their relationships as nodes and edges in a graph structure.

If applicable, add code examples with explanations.
:p What are some typical elements found in a social graph?
??x
Typical elements include:
- **Nodes (Vertices)**: Representing individuals or entities such as users, businesses, or groups.
- **Edges (Relationships)**: Indicating the relationships between nodes, like friendships, followership, or collaborations.

For example, in Facebook's implementation of a social graph:
```java
public class User {
    String userId;
    String name;
    List<Edge> connections; // List of edges representing friends

    public void connect(User friend) {
        Edge edge = new Edge(this, friend);
        this.connections.add(edge);
        friend.getConnections().add(new Edge(friend, this));
    }
}

public class Edge {
    User sourceUser;
    User targetUser;

    public Edge(User src, User tgt) {
        this.sourceUser = src;
        this.targetUser = tgt;
    }

    // Additional properties like type (friendship, follower), timestamp
}
```
x??

---

#### Web Graphs

Background context explaining the concept. A web graph represents the structure of the World Wide Web where vertices are web pages and edges indicate hyperlinks between them.

If applicable, add code examples with explanations.
:p What does a typical web page vertex contain in a web graph?
??x
A typical web page vertex contains metadata about the page such as its URL, title, content, and links to other pages. Edges represent hyperlinks from one page to another. For example:

```java
public class WebPage {
    String url;
    String title;
    List<Hyperlink> hyperlinks; // Hyperlinks to other web pages

    public void addLink(WebPage target) {
        Hyperlink link = new Hyperlink(this, target);
        this.hyperlinks.add(link);
    }
}

public class Hyperlink {
    WebPage sourcePage;
    WebPage targetPage;

    public Hyperlink(WebPage src, WebPage tgt) {
        this.sourcePage = src;
        this.targetPage = tgt;
    }

    // Additional properties like anchor text
}
```
x??

---

#### Road or Rail Networks

Background context explaining the concept. Road and rail networks are often represented using graphs where vertices represent junctions (intersections, stations), and edges represent roads or railway lines between them.

If applicable, add code examples with explanations.
:p How can a road network be modeled as a graph?
??x
A road network can be modeled by representing intersections/stations as nodes (vertices) and roads/railway lines as edges. Each edge might have properties such as the distance between junctions or speed limits.

Example:
```java
public class Intersection {
    String id;
    List<Road> connectedRoads; // Edges to other intersections

    public void addRoad(Road road) {
        this.connectedRoads.add(road);
    }
}

public class Road {
    Intersection startIntersection;
    Intersection endIntersection;
    double distance;

    public Road(Intersection src, Intersection dst, double dist) {
        this.startIntersection = src;
        this.endIntersection = dst;
        this.distance = dist;
    }

    // Additional properties like speed limit
}
```
x??

---

#### Property Graph Model

Background context explaining the concept. In the property graph model, vertices and edges are represented as objects with unique identifiers, labels, and collections of key-value pairs (properties).

If applicable, add code examples with explanations.
:p What does each vertex in a property graph contain?
??x
Each vertex in a property graph contains:
- A unique identifier (`vertex_id`).
- Incoming and outgoing edges.
- A collection of properties stored as key-value pairs.

Example schema for vertices and edges:

```sql
CREATE TABLE vertices  (
    vertex_id integer PRIMARY KEY,
    properties json
);

CREATE TABLE edges ( 
    edge_id     integer PRIMARY KEY,
    tail_vertex integer REFERENCES  vertices (vertex_id ),
    head_vertex integer REFERENCES  vertices (vertex_id ),
    label       text,
    properties  json
);
```

This schema allows for efficient querying of both incoming and outgoing edges using indexes on `tail_vertex` and `head_vertex`.
x??

---

#### Querying Property Graphs

Background context explaining the concept. Queries in property graphs often use declarative query languages like Cypher, SPARQL, or Datalog.

If applicable, add code examples with explanations.
:p What is a simple example of a Cypher query to find all friends of a user?
??x
A simple example using Cypher:

```cypher
MATCH (user:User {userId: 123})-[:FRIEND]->(friend)
RETURN friend.userId;
```

This query finds all users who are friends with the user having `userId` 123.

Explanation:
- `(user:User {userId: 123})`: Matches a vertex labeled as User with the given `userId`.
- `-[:FRIEND]->`: Indicates an outgoing edge of type `FRIEND`.
- `(friend)`: Represents the target vertex of this relationship.
x??

---


#### Graph Representation and Querying
Background context: This section discusses how to represent data using graphs, specifically focusing on property graphs. It also introduces Cypher as a query language for Neo4j graph databases, highlighting its declarative nature and suitability for representing complex relationships between entities.

:p What is the difference between a sovereign state and a nation?
??x
A sovereign state refers to an organized political community living under one government that has sovereignty over a particular territory. A nation typically represents people sharing common culture or language but may not necessarily have its own government.
x??

---
#### Cypher Query Language Introduction
Background context: Cypher is a declarative query language used for property graphs in Neo4j databases, designed to easily handle complex relationships and data structures.

:p What does the Cypher query in Example 2-3 create?
??x
The Cypher query creates nodes representing different locations (North America, United States, Idaho) and a person named Lucy. It also establishes relationships between these nodes using labels such as `WITHIN` and `BORN_IN`.
x??

---
#### Adding More Data to the Graph Database
Background context: The example provided in Example 2-3 demonstrates how to add more data to an existing graph database, extending it with additional vertices and edges.

:p How can you add a relationship indicating that someone has a food allergy using Cypher?
??x
You would introduce a vertex for each allergen and then use the `CREATE` clause to connect a person to their allergen. For example:
```cypher
CREATE (person:Person {name: 'Alain'}), 
       (peanutAllergy:Allergen {name: 'peanuts'}),
       (person)-[:HAS_ALLERGY]->(peanutAllergy);
```
This creates an edge named `HAS_ALLERGY` between the person and their allergen.
x??

---
#### Querying the Graph for Emigration
Background context: The example demonstrates how to query a graph database using Cypher to find people who have emigrated from one country to another.

:p How can you modify the Cypher query in Example 2-4 to find all European cities where someone was born?
??x
You would adjust the Cypher query by specifying that you want to match locations of type `city` within Europe. Here's an example:
```cypher
MATCH (person:Person) -[:BORN_IN]-> (birthPlace:Location {type: 'city'})
WHERE (birthPlace)-[:WITHIN*0..]->(eu:Location {name: 'Europe'})
RETURN birthPlace.name;
```
This query looks for people born in cities within Europe and returns the names of those cities.
x??

---
#### Graph Queries in SQL
Background context: The example contrasts Cypher's declarative nature with SQL, showing how complex traversal paths can be expressed using recursive common table expressions (CTEs).

:p How does the SQL version in Example 2-5 differ from the Cypher version in finding people who emigrated?
??x
The SQL version uses CTEs to recursively find all locations within a country and then matches these with individuals born in those locations. It is more verbose compared to Cypher, which handles variable-length paths more succinctly.

```sql
WITH RECURSIVE 
in_usa(vertex_id ) AS (
    SELECT vertex_id FROM vertices WHERE properties ->>'name' = 'United States'
    UNION 
    SELECT edges.tail_vertex FROM edges JOIN in_usa ON edges.head_vertex = in_usa.vertex_id 
    WHERE edges.label = 'within'
),
in_europe (vertex_id ) AS (
    SELECT vertex_id FROM vertices WHERE properties ->>'name' = 'Europe'
    UNION 
    SELECT edges.tail_vertex FROM edges JOIN in_europe ON edges.head_vertex = in_europe .vertex_id 
    WHERE edges.label = 'within'
),
born_in_usa (vertex_id ) AS (
    SELECT edges.tail_vertex FROM edges JOIN in_usa ON edges.head_vertex = in_usa.vertex_id 
    WHERE edges.label = 'born_in'
)
SELECT person.name
FROM born_in_usa, people
WHERE people.vertex_id = born_in_usa
AND people -[:LIVES_IN]-> (location:Location {name: 'Europe'});
```
x??

---


#### SQL Query for Intersecting Sets
Background context explaining how SQL queries can be used to intersect sets of vertices based on specific conditions. This involves joining tables and filtering results based on vertex properties.

:p What is the purpose of the provided SQL query?
??x
The provided SQL query aims to find people who were born in the USA and are currently living in Europe by intersecting two sets: one set containing people born in the USA (`born_in_usa`), and another set containing people living in Europe (`lives_in_europe`). The query uses joins to match vertices based on their properties.

```sql
-- lives_in_europe is the set of vertex IDs of all people living in Europe  
lives_in_europe (vertex_id ) AS (
    SELECT edges.tail_vertex 
    FROM edges 
    JOIN in_europe ON edges.head_vertex = in_europe.vertex_id 
    WHERE edges.label = 'lives_in'  
)

SELECT vertices.properties ->>'name'
FROM vertices
-- join to find those people who were both born in the US and live in Europe
JOIN born_in_usa ON vertices.vertex_id = born_in_usa.vertex_id
JOIN lives_in_europe ON vertices.vertex_id = lives_in_europe.vertex_id;
```
x??

---

#### Concept of Vertex Properties and Edge Labels
Background context explaining how vertices and edges are used to represent entities and relationships in a graph database. Vertices have properties, while edges connect them with labels.

:p What is the significance of vertex properties and edge labels?
??x
Vertex properties store additional information about the entity represented by a vertex. For instance, a person might be associated with a "name" property that holds their name. Edge labels define the type or nature of the relationship between two vertices. In this context, an "lives_in" edge might indicate that one vertex (a person) lives in another vertex's geographical region.

For example:
```sql
-- Example of using properties and edges
SELECT vertices.properties ->> 'name' 
FROM vertices
JOIN edges ON vertices.vertex_id = edges.head_vertex
WHERE edges.label = 'lives_in';
```
This query selects the name property from all people who have an "lives_in" edge.

x??

---

#### Triple-Store Data Model and SPARQL
Background context explaining how triple stores represent data as triples consisting of a subject, predicate, and object. This model is often used in semantic web applications.

:p What is the structure of data in a triple-store?
??x
In a triple-store, data is represented using triples of the form (subject, predicate, object). The subject can be any identifier that refers to an entity, the predicate specifies the relationship between entities, and the object can either be another entity or a value.

For example:
- `(Jim, likes, bananas)` represents Jim liking bananas.
- `(lucy, age, 33)` is equivalent to having properties on vertex `lucy` with key "age" and value 33.

:p How do you represent graph-like data in SPARQL?
??x
In SPARQL (SPARQL Protocol and RDF Query Language), which operates over triple stores, you can use patterns to query the triples. For example:
```sparql
PREFIX ex: <http://example.org/>
SELECT ?person ?book
WHERE {
  ?person ex:likes ?book .
}
```
This SPARQL query selects all people who like a book.

x??

---

#### Example of Building Sets in Triple-Store
Background context explaining how to build sets of vertices based on certain criteria, such as finding all places related to "United States" and "Europe."

:p How would you build the set `in_usa` for places related to the United States?
??x
To build the set `in_usa`, you start with the vertex representing the "United States" and follow incoming edges until all connected vertices are included. This process can be represented as follows:

1. Find the vertex whose name property has the value "United States".
2. Follow all incoming edges to add related vertices to the set.

Example:
```sql
-- Assuming `vertices` table has a property `name`
WITH RECURSIVE in_usa AS (
    SELECT *
    FROM vertices
    WHERE properties ->> 'name' = 'United States'
    UNION ALL
    SELECT t.*
    FROM edges e JOIN in_usa u ON e.tail_vertex = u.vertex_id
    JOIN vertices t ON e.head_vertex = t.vertex_id
)
SELECT * FROM in_usa;
```
This query recursively builds the set `in_usa` starting from the "United States" vertex and includes all connected vertices.

x??

---

#### Example of Following Edges to Find People Born in USA
Background context explaining how to follow edges to find people born in a specific place, such as the United States.

:p How would you find people who were born in the USA?
??x
To find people who were born in the USA, start with vertices representing places related to the USA and follow incoming "born_in" edges. This can be achieved using a recursive query:

1. Start with all places related to the USA.
2. Follow all incoming "born_in" edges from these places.

Example:
```sql
WITH RECURSIVE in_usa AS (
    SELECT *
    FROM vertices
    WHERE properties ->> 'name' LIKE '%United States%'
)
SELECT v.properties ->> 'name'
FROM in_usa u
JOIN edges e ON u.vertex_id = e.head_vertex
JOIN born_in_usa b ON e.tail_vertex = b.vertex_id
JOIN vertices v ON b.vertex_id = v.vertex_id;
```
This query finds all people (`vertices`) who were born in the USA by following "born_in" edges from places related to the United States.

x??

---

#### Example of Following Edges to Find People Living in Europe
Background context explaining how to follow edges to find people living in a specific place, such as Europe.

:p How would you find people who live in Europe?
??x
To find people who live in Europe, start with vertices representing places related to Europe and follow incoming "lives_in" edges. This can be achieved using a recursive query:

1. Start with all places related to Europe.
2. Follow all incoming "lives_in" edges from these places.

Example:
```sql
WITH RECURSIVE in_europe AS (
    SELECT *
    FROM vertices
    WHERE properties ->> 'name' LIKE '%Europe%'
)
SELECT v.properties ->> 'name'
FROM in_europe u
JOIN edges e ON u.vertex_id = e.head_vertex
JOIN lives_in_europe l ON e.tail_vertex = l.vertex_id
JOIN vertices v ON l.vertex_id = v.vertex_id;
```
This query finds all people (`vertices`) who live in Europe by following "lives_in" edges from places related to Europe.

x??

---

