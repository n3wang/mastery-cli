# High-Quality Flashcards: Designing-data-intensive-applications_-the-big-ideas-behind-reliable-scalable_processed (Part 6)


**Starting Chapter:** Graph Queries in SQL

---


#### Graph Database Basics
Background context explaining graph databases, their uses, and how they differ from traditional relational databases. Graph databases use vertices (nodes) to represent entities and edges to represent relationships between them.

Graphs are good for evolvability: as you add features to your application, a graph can easily be extended to accommodate changes in your application’s data structures.
:p What is a graph database?
??x
A graph database is a type of NoSQL database that stores and queries data using vertices (nodes) and edges. Vertices represent entities, and edges represent relationships between these entities. The structure allows for flexible schema and efficient querying based on complex relationships.

For example:
```java
public class Vertex {
    String id;
    String label;

    public Vertex(String id, String label) {
        this.id = id;
        this.label = label;
    }
}

public class Edge {
    String fromVertexId;
    String toVertexId;
    String label;

    public Edge(String fromVertexId, String toVertexId, String label) {
        this.fromVertexId = fromVertexId;
        this.toVertexId = toVertexId;
        this.label = label;
    }
}
```
x??

---


#### Querying Graph Databases
Background context on how to write and execute queries in a graph database. It involves understanding vertex, edge relationships, and patterns.

Example 2-4 shows how to find people who emigrated from the US to Europe using Cypher.
:p How do you query for people who emigrated from the US to Europe?
??x
To query for people who emigrated from the US to Europe, you can use a Cypher query that follows these steps:
1. Find all vertices representing people born in the USA and currently living in Europe.
2. Use pattern matching to find the relationships.

Example 2-4 shows the Cypher query:

```cypher
MATCH   (person) -[:BORN_IN]-> ()
         () -[:WITHIN*0..]-> (us:Location {name: 'United States'}),
     (person) -[:LIVES_IN]-> ()
         () -[:WITHIN*0..]-> (eu:Location {name: 'Europe'})
RETURN person.name
```

This query finds any vertex `person` who:
1. Has a `BORN_IN` edge to some location within the US.
2. Currently lives in Europe.

The pattern matching in Cypher is very flexible, allowing for variable-length paths and complex relationships.
x??

---


#### Property Graph Model Overview
The property graph model represents data using vertices (nodes) and edges (relationships). Each vertex can have properties, and each edge connects two vertices with a label indicating their relationship.

:p What is the primary characteristic of the property graph model?
??x
Vertices represent entities, while edges connect these entities and define relationships between them. Vertices can have multiple properties.
x??

---


#### Query Languages in Graph Databases
Graph databases support high-level declarative languages like Cypher and SPARQL, but fundamentally build upon the older language Datalog, which is a subset of Prolog. Datalog uses rules to define new predicates based on existing data or other rules.
:p What query languages do graph databases support?
??x
Graph databases support multiple query languages such as Cypher, SPARQL, and Datalog (which is derived from Prolog). These languages allow for expressing complex queries in a declarative manner.
x??

---

