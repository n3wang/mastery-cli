# High-Quality Flashcards: 2B001--Financial-Data-Engineering_processed (Part 4)


**Starting Chapter:** Panel Data

---


#### Time Series Data
Time series data is a collection of records for one or more variables associated with a single entity, observed at specific intervals over time. These data are indexed in time order and can be mathematically represented as \( X_1, X_2, \ldots , X_N \) where N is the length of the time series, and \( X \) is the observed variable.

In tabular format, a time series with S variables observed over N periods can be represented as follows:
| Time/variable | X1   | X2   | X3  ... XS |
|---------------|------|------|---------|
| T1            | X11  | X21  | X31     ... XS1 |
| T2            | X12  | X22  | X32     ... XS2 |
| ...           | ...  | ...  | ...        ... |
| TN            | X1N  | X2N  | X3N     ... XSN |

:p What is the representation of time series data in tabular format?
??x
The representation of time series data in tabular format involves storing the temporal dimension (TN) in the first column and the time series values for each variable in the subsequent columns. Each cell records the value observed at a specific time for a given variable.
```java
public class TimeSeriesTable {
    // Define a two-dimensional array to store time series data
    private double[][] table;

    public void addTimePoint(double[] values) {
        // Add a new row with the given values
        this.table = Arrays.copyOf(this.table, this.table.length + 1);
        System.arraycopy(values, 0, this.table[this.table.length - 1], 0, values.length);
    }
}
```
x??

---

#### Cross-Sectional Data
Cross-sectional data is a collection of records for one or more variables observed across multiple entities at a single point in time. In cross-sectional data, the focus is on the variables themselves rather than the time series dimension.

Mathematically, it can be represented as:
\[ X_{t,i,j} \] where \( t \) is the fixed time index, \( i \) is the entity index, and \( j \) is the variable index.

In tabular format, we can represent cross-sectional data with N entities and S variables as follows:
| Entity/variable | V1   | V2   | V3  ... VS |
|-----------------|------|------|----------|
| E1              | X11  | X21  | X31      ... XS1 |
| E2              | X12  | X22  | X32      ... XS2 |
| ...             | ...  | ...  | ...          ... |
| EN              | X1N  | X2N  | X3N      ... XSN |

:p How is cross-sectional data represented in a tabular format?
??x
Cross-sectional data is represented in a tabular format by storing the names of entities (EN) in the first column and the cross-section values of S variables (VS) across multiple entities. Each table cell (Xi,j) stores the value of a given entity for a specific variable.
```java
public class CrossSectionTable {
    // Define a two-dimensional array to store cross-sectional data
    private double[][] table;

    public void addEntity(double[] values) {
        // Add a new row with the given values representing different entities
        this.table = Arrays.copyOf(this.table, this.table.length + 1);
        System.arraycopy(values, 0, this.table[this.table.length - 1], 0, values.length);
    }
}
```
x??

---

#### Panel Data
Panel data combines both time series and cross-sectional structures, representing data for a set of variables across multiple entities at different points in time.

Mathematically, panel data can be represented as:
\[ X_{i,j,t} \] where \( i \) is the entity index, \( j \) is the variable index, and \( t \) is the time index.

A tabular representation for a two-entity, two-time periods, and three-variables panel would look like this (wide format):
| Entity | Time | V1   | V2  | V3 |
|--------|------|------|-----|----|
| E1     | t=1  | X111 | X121| X131|
| E1     | t=2  | X112 | X122| X132|
| E2     | t=1  | X211 | X221| X231|
| E2     | t=2  | X212 | X222| X232|

The long format would be:
| Entity | Time | Variable name | Variable value |
|--------|------|---------------|----------------|
| E1     | t=1  | V1            | X111           |
| E1     | t=2  | V2            | X122           |
| E2     | t=1  | V1            | X211           |

:p What are the two formats of panel data representation?
??x
The wide format expands horizontally when new variables are added to the panel, storing the names of entities and time in separate columns. The long format stores variable names and values separately, expanding vertically with new entries.

```java
public class PanelTable {
    // Define a three-dimensional array to store panel data (wide format)
    private double[][][] wideFormatPanel;
    
    public void addEntityTimeVariable(double value) {
        // Add a new entry for the given entity, time period, and variable value
        this.wideFormatPanel = Arrays.copyOf(this.wideFormatPanel, this.wideFormatPanel.length + 1);
        System.arraycopy(new double[] {value}, 0, this.wideFormatPanel[this.wideFormatPanel.length - 1], 0, 1);
    }
    
    // For long format
    private ArrayList<String> variableNames = new ArrayList<>();
    private ArrayList<Double> values = new ArrayList<>();

    public void addEntityTimeVariableNameValue(String name, double value) {
        this.variableNames.add(name);
        this.values.add(value);
    }
}
```
x??

---


#### Matrix Representation in Portfolio Optimization

Matrix representations are fundamental in financial portfolio optimization, particularly for Markowitz’s mean-variance optimization (MVO). These matrices help in organizing and analyzing the expected returns and covariances of various assets.

The **portfolio return matrix** is a 3 × 1 vector representing the expected returns on each asset. Let's denote this as:

\[ \text{ERA} = \begin{bmatrix} ER_A \\ ER_B \\ ER_C \end{bmatrix} \]

Where \( ER_i \) represents the expected return of asset \( i \).

The **covariance matrix** is a 3 × 3 symmetric matrix representing the variances and covariances between each pair of assets. It is denoted as:

\[ \Sigma = \begin{bmatrix} \text{var}(R_A) & \text{cov}(R_A, R_B) & \text{cov}(R_A, R_C) \\ \text{cov}(R_B, R_A) & \text{var}(R_B) & \text{cov}(R_B, R_C) \\ \text{cov}(R_C, R_A) & \text{cov}(R_C, R_B) & \text{var}(R_C) \end{bmatrix} \]

:p What is the structure of the covariance matrix in MVO?
??x
The covariance matrix is a 3 × 3 symmetric matrix where each element represents either the variance (diagonal elements) or the covariance between pairs of assets. The diagonal elements are the variances, and off-diagonal elements are the covariances.

For example:
```java
public class CovarianceMatrix {
    public double[][] computeCovariance(double[] returnsA, double[] returnsB, double[] returnsC) {
        // Code to calculate covariance matrix based on input return data for assets A, B, and C.
        // The method would use the formula: cov(Ri, Rj) = (1/n) * sum((Rit - ERi)(Rjt - ERj))
    }
}
```
x??

---

#### Graph Data in Financial Networks

Graph data is essential in analyzing complex financial systems where relationships and interactions are crucial. These networks consist of nodes representing entities like companies, individuals, or financial instruments, and edges representing the connections between them.

A graph dataset includes two main components:
- **Nodes**: Represented as vertices with attributes such as name, country, type.
- **Edges**: Representing relationships with attributes like type, value, sign.

For example, a network might represent transactions between companies where each node is a company and edges indicate financial transactions.

:p What are the key components of a graph dataset in finance?
??x
A graph dataset consists of nodes (vertices) and edges. Nodes represent entities such as companies or individuals, while edges denote relationships like transactions or dependencies with attributes such as type, value, and sign.

Example structure:
```java
public class Node {
    String name;
    String country;
    String type;
}

public class Edge {
    int weight; // Value of the transaction
    String relationshipType; // Type of interaction (e.g., supplier, customer)
}
```
x??

---

#### Portfolio Optimization Using Matrix Algebra

Portfolio optimization involves choosing an optimal asset allocation to achieve a desired balance between return and risk. Markowitz’s mean-variance model uses matrix algebra to find the portfolio with the highest expected return for a given level of risk.

The key matrices used are:
- **Portfolio Return Vector**: A 1 × n vector representing the expected returns on each asset.
- **Covariance Matrix**: An n × n symmetric matrix representing variances and covariances between assets.

Using these, one can derive optimal weights using linear algebra techniques like solving a quadratic optimization problem.

:p What are the key matrices used in portfolio optimization according to Markowitz’s theory?
??x
The key matrices used in portfolio optimization include:
- **Portfolio Return Vector (ERA)**: A 1 × n vector of expected returns for each asset.
- **Covariance Matrix (\(\Sigma\))**: An n × n symmetric matrix representing the variances and covariances between assets.

These matrices are essential for calculating the optimal weights using quadratic programming or other optimization techniques.

Example:
```java
public class PortfolioOptimizer {
    public double[] optimizePortfolio(double[] expectedReturns, double[][] covarianceMatrix) {
        // Implement optimization logic to find optimal weights.
        // This might involve solving a quadratic problem like: min w' * \(\Sigma\) * w - r' * w
    }
}
```
x??

---

#### Network Science in Finance

Network science provides tools for understanding complex financial interactions and relationships. Traditional time-series or cross-section data are insufficient to capture the depth and complexity required for network analysis.

Graphs help model these interactions, where nodes represent entities (like companies) and edges represent connections (such as transactions).

:p How does graph data enhance the analysis of financial systems?
??x
Graph data enhances the analysis of financial systems by modeling complex relationships and dependencies. It allows researchers to understand intricate networks like transaction flows, supply chains, or market positions.

For example:
```java
public class FinancialNetwork {
    List<Node> nodes;
    List<Edge> edges;

    public void addNode(Node node) {
        nodes.add(node);
    }

    public void addEdge(Edge edge) {
        edges.add(edge);
    }
}
```
x??

---


#### Network Visualization
Network visualization is a method to illustrate graph data by drawing nodes and links. It works best with small networks and provides an intuitive understanding of connections between entities.

:p What does network visualization represent?
??x
In network visualization, nodes are typically represented as circles or other shapes, while the edges connecting them indicate relationships such as interactions, dependencies, or transactions. This visual representation helps in identifying patterns, clusters, and outliers within the data.
```java
public class Node {
    private String name;
    public Node(String name) {
        this.name = name;
    }
}

public class Edge {
    private Node source;
    private Node target;
    public Edge(Node source, Node target) {
        this.source = source;
        this.target = target;
    }
}

// Example of drawing a simple network
List<Node> nodes = new ArrayList<>();
nodes.add(new Node("A"));
nodes.add(new Node("B"));

List<Edge> edges = new ArrayList<>();
edges.add(new Edge(nodes.get(0), nodes.get(1)));

// Visualization logic would be implemented here to draw the nodes and edges.
```
x??

---

#### Adjacency Matrix
An adjacency matrix is a 2D matrix (N x N) where each row and column corresponds to a node, and the value at position (i, j) indicates whether there is an edge between nodes i and j.

:p What does an adjacency matrix represent?
??x
The adjacency matrix stores binary information about the presence or absence of edges in a graph. If there is an edge between nodes i and j, the matrix contains 1 at positions (i, j) and (j, i), otherwise it contains 0.

```java
public class Graph {
    private int[][] adjacencyMatrix;
    
    public Graph(int n) {
        this.adjacencyMatrix = new int[n][n];
    }
    
    // Example of adding an edge using the adjacency matrix
    public void addEdge(int i, int j) {
        if (i >= 0 && i < this.adjacencyMatrix.length && j >= 0 && j < this.adjacencyMatrix[i].length) {
            this.adjacencyMatrix[i][j] = 1;
            this.adjacencyMatrix[j][i] = 1; // For undirected graph
        }
    }
}
```
x??

---

#### Adjacency List
An adjacency list is an array where each entry corresponds to a node and contains a list of neighboring nodes. This structure is efficient for sparse graphs.

:p How does the adjacency list representation work?
??x
In the adjacency list, each node points to a linked list (or ArrayList) that stores its neighbors. The size of this data structure depends on the number of nodes in the graph.

```java
public class Node {
    private int id;
    private List<Integer> neighbors;

    public Node(int id) {
        this.id = id;
        this.neighbors = new ArrayList<>();
    }

    // Method to add a neighbor node
    public void addNeighbor(Node neighbor) {
        this.neighbors.add(neighbor.getId());
    }
}

public class Graph {
    private Map<Integer, Node> nodesById;

    public Graph() {
        this.nodesById = new HashMap<>();
    }

    // Adding an edge using adjacency list
    public void addEdge(int fromId, int toId) {
        Node fromNode = nodesById.computeIfAbsent(fromId, id -> new Node(id));
        Node toNode = nodesById.computeIfAbsent(toId, id -> new Node(id));
        
        fromNode.addNeighbor(toNode);
        // For undirected graph
        toNode.addNeighbor(fromNode);
    }
}
```
x??

---

#### Edge List
An edge list stores all edges in the form of a simple array. Each item in this array represents an edge as a tuple, with the first element being the source node and the second being the target.

:p What is an edge list?
??x
An edge list is a linear representation of graph data where each entry consists of a pair (source, target) or sometimes additional attributes like weight, sign, or time. This format is suitable for small to medium-sized graphs due to its simplicity and ease of parsing.

```java
public class Edge {
    private int source;
    private int target;

    public Edge(int source, int target) {
        this.source = source;
        this.target = target;
    }

    // Method to add an edge in the edge list
    public static void addEdge(ArrayList<Edge> edges, int source, int target) {
        edges.add(new Edge(source, target));
    }
}
```
x??

---

#### Simple Graphs
A simple graph consists of nodes and links that are both homogeneous (nodes and links have the same type). It is undirected and unweighted.

:p What characterizes a simple graph?
??x
In a simple graph:
- Nodes can only be one type.
- Links are undirected, meaning there is no distinction between source and target.
- The graph does not contain multiple edges or self-loops.

```java
public class SimpleGraph {
    private List<Node> nodes;
    
    public SimpleGraph() {
        this.nodes = new ArrayList<>();
    }
    
    // Adding a node to the simple graph
    public void addNode(Node node) {
        this.nodes.add(node);
    }
    
    // Example of adding an edge in a simple, undirected, unweighted graph
    public void addEdge(Node source, Node target) {
        if (source != null && target != null) {
            nodes.stream().filter(n -> n.equals(source)).findFirst().ifPresent(s -> s.addEdge(target));
            nodes.stream().filter(n -> n.equals(target)).findFirst().ifPresent(t -> t.addEdge(source));
        }
    }
}
```
x??

---

#### Directed Graphs
In a directed graph, links have directionality, indicating an orientation between the nodes. This means that each link points from one node to another.

:p What is unique about directed graphs?
??x
Directed graphs are characterized by having directed edges (links) where the relationship has a specific direction. For example, A borrows from B implies a directional link from A to B.

```java
public class DirectedGraph {
    private List<Node> nodes;
    
    public DirectedGraph() {
        this.nodes = new ArrayList<>();
    }
    
    // Adding a node to the directed graph
    public void addNode(Node node) {
        this.nodes.add(node);
    }
    
    // Example of adding an edge in a directed graph
    public void addDirectedEdge(Node source, Node target) {
        if (source != null && target != null) {
            nodes.stream().filter(n -> n.equals(source)).findFirst().ifPresent(s -> s.addEdge(target));
        }
    }
}
```
x??

---

#### Weighted Graphs
Weighted graphs assign numerical values to links to indicate the strength or magnitude of relationships. These weights can be added to adjacency matrices, lists, and edge lists.

:p How are weights represented in a weighted graph?
??x
Weights in a weighted graph are assigned as numerical values associated with each edge. For instance, if an edge between nodes i and j has a weight w, the adjacency matrix would store this value at position (i, j) and (j, i) for undirected graphs.

```java
public class WeightedGraph {
    private int[][] weightedAdjacencyMatrix;
    
    public WeightedGraph(int n) {
        this.weightedAdjacencyMatrix = new int[n][n];
    }
    
    // Adding a weighted edge in the adjacency matrix
    public void addWeightedEdge(int i, int j, int weight) {
        if (i >= 0 && i < this.weightedAdjacencyMatrix.length && j >= 0 && j < this.weightedAdjacencyMatrix[i].length) {
            this.weightedAdjacencyMatrix[i][j] = weight;
            this.weightedAdjacencyMatrix[j][i] = weight; // For undirected graph
        }
    }
}
```
x??


#### Weighted Graphs
Background context explaining weighted graphs. Weights can represent various values such as asset value, money transfer amounts, or trade volumes in financial networks.

:p What are weighted graphs and what do they represent?
??x
Weighted graphs are graphs where edges have associated numerical values called weights. These weights could represent the value of assets held between banks, transaction amounts, or quantities traded in a market.
```java
// Example of adding weight to an edge in Java
public class Graph {
    private Map<Integer, Map<Integer, Integer>> adjList = new HashMap<>();

    public void addEdge(int u, int v, int w) {
        if (!adjList.containsKey(u)) {
            adjList.put(u, new HashMap<>());
        }
        adjList.get(u).put(v, w);
    }
}
```
x??

---

#### Multipartite Graphs
Background context explaining multipartite graphs. They involve multiple types of nodes and edges only exist between different node types.

:p What are multipartite graphs?
??x
Multipartite graphs are a type of graph where the nodes can be divided into two or more disjoint sets such that no edge connects nodes within the same set, but only links nodes from different sets. Bipartite graphs are the simplest form (two types of nodes), while tripartite and k-partite graphs involve three or more node types respectively.
```java
// Example of creating a bipartite graph in Java
public class BipartiteGraph {
    private Map<Integer, Set<Integer>> adjList = new HashMap<>();

    public void addBipartiteEdge(int u, int v) {
        if (!adjList.containsKey(u)) {
            adjList.put(u, new HashSet<>());
        }
        if (!adjList.containsKey(v)) {
            adjList.put(v, new HashSet<>());
        }
        adjList.get(u).add(v);
        adjList.get(v).add(u); // Assuming undirected
    }
}
```
x??

---

#### Bipartite Graphs and Projections
Background context explaining bipartite graphs and their projections. Projections create a simpler graph by focusing on one node type based on shared connections.

:p What is a bipartite projection?
??x
A bipartite projection of a graph focuses on one type of nodes in the original bipartite graph, creating new edges between these nodes if they share a common connection through another type of node. This process simplifies complex networks by reducing them to more manageable structures.
```java
// Example of bipartite graph projection in Java
public class BipartiteProjection {
    private Map<Integer, Set<Integer>> adjList = new HashMap<>();

    public void addBipartiteEdge(int u, int v) {
        // As shown above
    }

    public void projectOnNode1() {
        for (int node1 : adjList.keySet()) {
            if (!adjList.get(node1).isEmpty()) {
                for (int commonNode : adjList.get(node1)) {
                    for (int node2 : adjList.get(commonNode)) {
                        // Add edge between node1 and node2 if they are not directly connected
                        if (!adjList.get(node1).contains(node2)) {
                            adjList.get(node1).add(node2);
                        }
                    }
                }
            }
        }
    }
}
```
x??

---

#### Multipartite Projections
Background context explaining multipartite projections, particularly their application to bipartite graphs.

:p What is a k-partite projection?
??x
A k-partite projection of a graph focuses on one type of nodes from the original k-partite graph by creating edges between these nodes if they share common connections with another type of node. This process helps in understanding complex relationships by isolating and analyzing specific types of nodes.
```java
// Example of tripartite projection in Java (assuming three node types)
public class TriPartiteProjection {
    private Map<Integer, Set<Integer>> adjListType1 = new HashMap<>();
    private Map<Integer, Set<Integer>> adjListType2 = new HashMap<>();
    private Map<Integer, Set<Integer>> adjListType3 = new HashMap<>();

    public void addTriPartiteEdge(int u, int v) {
        // As shown above
    }

    public void projectOnNode1() {
        for (int node1 : adjListType1.keySet()) {
            if (!adjListType1.get(node1).isEmpty()) {
                for (int commonNode2 : adjListType1.get(node1)) {
                    for (int node3 : adjListType2.get(commonNode2)) {
                        // Add edge between node1 and node3
                        adjListType1.get(node1).add(node3);
                    }
                }
            }
        }
    }
}
```
x??

---

#### Adjacency Matrix Representation
Background context explaining adjacency matrices, particularly their block structure in multipartite graphs.

:p How is a bipartite graph represented using an adjacency matrix?
??x
A bipartite graph's adjacency matrix typically has a block structure where the two sets of nodes are arranged such that connections between them appear as non-zero elements. The matrix will have zeros within each block to indicate no direct connection between nodes of the same type.
```java
// Example of generating an adjacency matrix for a bipartite graph in Java
public class BipartiteAdjacencyMatrix {
    public int[][] generateAdjacencyMatrix(Map<Integer, Set<Integer>> adjList) {
        List<Integer> nodeSet1 = new ArrayList<>(adjList.keySet());
        List<Integer> nodeSet2 = new ArrayList<>();
        
        // Populate nodeSet2 from the values of nodeSet1's adjacency lists
        for (Integer node : nodeSet1) {
            nodeSet2.addAll(adjList.get(node));
        }

        int sizeSet1 = nodeSet1.size();
        int sizeSet2 = nodeSet2.size();

        int[][] matrix = new int[sizeSet1][sizeSet2];

        // Populate the matrix based on adjacency list
        for (int i = 0; i < sizeSet1; i++) {
            Set<Integer> adjNodes = adjList.get(nodeSet1.get(i));
            for (Integer j : adjNodes) {
                if (!nodeSet2.contains(j)) {
                    nodeSet2.add(j);
                }
                int indexJ = nodeSet2.indexOf(j);
                matrix[i][indexJ] = 1;
            }
        }

        return matrix;
    }
}
```
x??

---

#### Financial Applications of Graphs
Background context explaining the applications of graph theory in finance, including examples like interlocking directorates and syndicated lending.

:p What are some real-world financial applications of bipartite graphs?
??x
Some real-world financial applications of bipartite graphs include:
- **Interlocking Directorates**: Nodes representing individuals serve as board members for firms.
- **Syndicated Lending**: Multiple lenders provide loans to borrowing entities.
- **Corporate Control Hierarchies**: Parent companies have ownership rights over child companies.

These relationships can be modeled using a bipartite graph, where one set of nodes represents the type of entity and the other set represents connections (board memberships, loan agreements, etc.).
```java
// Example of representing interlocking directorates in Java
public class InterlockingDirectorates {
    private Map<Integer, Set<Integer>> boardMembers = new HashMap<>();
    private Map<Integer, Set<Integer>> firms = new HashMap<>();

    public void addBoardMember(int person, int firm) {
        if (!boardMembers.containsKey(person)) {
            boardMembers.put(person, new HashSet<>());
        }
        if (!firms.containsKey(firm)) {
            firms.put(firm, new HashSet<>());
        }
        boardMembers.get(person).add(firm);
        firms.get(firm).add(person);
    }
}
```
x??

---

#### Temporal Graphs
Background context explaining temporal graphs and their snapshots over time.

:p What are temporal graphs?
??x
Temporal graphs represent networks where the edges have a time dimension, indicating when they were active. The network or adjacency matrix can capture these states at different points in time.
```java
// Example of representing a snapshot of a temporal graph in Java
public class TemporalGraph {
    private Map<Integer, List<Map.Entry<Integer, Integer>>> adjList = new HashMap<>();

    public void addEdge(int u, int v, int timestamp) {
        if (!adjList.containsKey(u)) {
            adjList.put(u, new ArrayList<>());
        }
        adjList.get(u).add(new AbstractMap.SimpleEntry<>(v, timestamp));
    }

    // Method to get snapshots of the graph at a specific time
    public List<Map.Entry<Integer, Integer>> getEdgesAtTime(int time) {
        List<Map.Entry<Integer, Integer>> snapshot = new ArrayList<>();
        for (Map.Entry<Integer, List<Map.Entry<Integer, Integer>>> entry : adjList.entrySet()) {
            for (Map.Entry<Integer, Integer> edge : entry.getValue()) {
                if (edge.getValue() == time) {
                    snapshot.add(edge);
                }
            }
        }
        return snapshot;
    }
}
```
x??

---


#### Fundamental Data Overview
Background context explaining fundamental data, including its sources and importance. Fundamental data encompasses financial statements like balance sheets, income statements, and cash flow statements, which provide insights into a firm's structure, operations, and performance.

:p What are the main types of financial statements that convey information about firms?
??x
The main types of financial statements include:
- **Balance Sheet**: Provides figures on assets, liabilities, and shareholders' equity.
- **Income Statement**: Shows financial performance over a specific period, such as revenues and net profit.
- **Cash Flow Statement**: Offers details on cash movements.

These statements are crucial for understanding the firm's financial health and operations. For example, ROE (Return on Equity) is calculated by dividing net income by shareholders' equity: \( \text{ROE} = \frac{\text{Net Income}}{\text{Shareholders' Equity}} \).

x??

---

#### Characteristics of Fundamental Data
Explanation of the characteristics of fundamental data, such as low frequency and delayed reporting.

:p What are some key characteristics of fundamental data?
??x
Key characteristics include:
- **Low Frequency**: Financial statements are released infrequently, typically quarterly or annually.
- **Delayed Reporting**: Data for a specific period is often published with a time lapse, meaning it’s not available immediately after the event.
- **Revisions and Corrections**: Figures can be revised and corrected after initial release (reinstatements), and data backfilling can occur.

These characteristics affect how data is handled, particularly in terms of PIT (Point-in-Time) versus non-PIT datasets. 

x??

---

#### PIT vs Non-PIT Data
Explanation of the differences between Point-in-Time (PIT) and non-PIT data, including their implications for historical studies.

:p What are the main differences between PIT and non-PIT data?
??x
- **PIT Data** records data with timestamps reflecting the filing or release date. It allows asking questions like "When was the data released?" and "What data was known at that time?"
- **Non-PIT Data** is stamped with the fiscal year-end date or the latest update date, representing the most recent version of the data.

Table 2-7 illustrates:
| Data type | Preliminary result | Fiscal year-end release | Correction | Version 101 | 110 | 120 |
|-----------|--------------------|------------------------|------------|-------------|-----|-----|
| PIT       | 101                | 110                    | 120        | 101         | 110 | 120 |
| Non-PIT   | 120                | 120                    | 120        | 120         | 120 | 120 |

PIT data keeps all historical snapshots, while non-PIT only shows the latest version.

x??

---

#### Financial Highlights from a Bank Annual Report
Explanation of how to read and interpret financial highlights in an annual report.

:p What are some key items in ADK's annual financial highlights?
??x
Key items include:
- **Total Net Revenues**: $102 billion in 2020 (versus $99 billion in 2021).
- **Net Income**: $23 billion in 2020 (versus $25 billion in 2019).
- **Return on Common Equity**: 11% in 2020 (versus 16% in 2019).
- **Total Assets**: Over $3 trillion.
- **Headcount**: 150,432 employees.

These metrics provide insights into the bank's financial health and stability. For example, the Tier 1 capital ratio of 15% indicates strong financial stability according to Basel III standards (minimum 6%).

x??

---

