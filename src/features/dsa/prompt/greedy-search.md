---
title: Greedy Search
description: AI Search Problem
tags: [ medium, search, ai]
---

### Description

Greedy Search is a graph search algorithm that is often used in pathfinding and graph traversal, which is the process of visiting (checking and/or updating) each vertex in a graph.

It uses a priority queue to decide which node to take on next

- The difference between Greedy Search and A* Search is that Greedy Search accounts only for the Heuristic function, while A* Search accounts for both the Heuristic function and the cost of the path.
- The difference between Greedy Search and Greedy Search and Hill Climbing is that Hill Climbing grabs the next closes heuristically, while Greedy First grabs the considers all alternatives by putting them all into a priority queue.




| Algorithm             | Comp. | Time    | Space   | Informed | Optimal |
| --------------------- | ----- | ------- | ------- | -------- | ------- |
| GreedyBestFirstSearch | No    | O(b^d)* | O(b^d)* | Yes      | No      |

### Example 1


Given: 

```js

        //   A____B____C
        //   |\   |   /
        //   | \  |  /
        //   |  \ | /
        //   D___\E
        //   |\  |
        //   | \ |
        //   |__\|
        //   F    G

        const A = new Node('A', 0, 2);
        const B = new Node('B', 1, 2);
        const C = new Node('C', 2, 2);
        const D = new Node('D', 0, 1);
        const E = new Node('E', 1, 1);
        const G = new Node('G', 0, 0);
        const F = new Node('F', 1, 0);

        const graph = new Graph();
        graph.addEdge(A, B);
        graph.addEdge(A, D);
        graph.addEdge(B, C);
        graph.addEdge(B, E);
        graph.addEdge(C, E);
        graph.addEdge(D, G);
        graph.addEdge(D, F);
        graph.addEdge(D, E);
        graph.addEdge(E, G);
        graph.addEdge(G, G);

        const nodes = { A, B, C, D, E, G, F };
        return { graph: graph, nodes: nodes };
```

Should be able to find it it using depth First Search.


```js
{
  path: [
    Node { id: 'A', x: 0, y: 2 },
    Node { id: 'D', x: 0, y: 1, heuristic: 1 },
    Node { id: 'G', x: 0, y: 0, heuristic: 0 }
  ],
  cost: null,
  count_searches: 3,
  formatted_path: 'A -> D -> G',
  exploration_path: [
    Node { id: 'A', x: 0, y: 2 },
    Node { id: 'D', x: 0, y: 1, heuristic: 1 },
    Node { id: 'G', x: 0, y: 0, heuristic: 0 }
  ],
  queue_snapshot: [
    [ { id: 'A', priority: 0 } ],
    [ { id: 'D', priority: 1 }, { id: 'B', priority: 3 } ],
    [
      { id: 'G', priority: 0 },
      { id: 'F', priority: 1 },
      { id: 'E', priority: 2 },
      { id: 'B', priority: 3 }
    ]
  ]
}
```


### t_graph_1


```js
        A----B
       |  \ | \
       D   \|  H
       |  \ | /|
       |    C  |
        \    \ G
         \    /
          \  /
           E
           |
           F


const A = new Node('A', 0, 1);
const B = new Node('B', 2, 1);
const C = new Node('C', 2, -1);
const D = new Node('D', 0, 0);
const E = new Node('E', 1, -5);
const F = new Node('F', 1, -2);
const G = new Node('G', 3, -2);
const H = new Node('H', 3, 0);

const nodes = {A, B, C, D, E, F, G, H};


const graph = new Graph();
graph.addEdge(A, B);
graph.addEdge(A, D);
graph.addEdge(A, C);
graph.addEdge(B, C);
graph.addEdge(B, H);
graph.addEdge(C, H);
graph.addEdge(C, G);
graph.addEdge(C, D);
graph.addEdge(D, E);
graph.addEdge(D, G);
graph.addEdge(E, G);
graph.addEdge(E, F);

```

Results:

```bash
nodes {
  A: Node { id: 'A', x: 0, y: 1 },
  B: Node { id: 'B', x: 2, y: 1 },
  C: Node { id: 'C', x: 2, y: -1 },
  D: Node { id: 'D', x: 0, y: 0 },
  E: Node { id: 'E', x: 1, y: -5 },
  F: Node { id: 'F', x: 1, y: -2 },
  G: Node { id: 'G', x: 3, y: -2 },
  H: Node { id: 'H', x: 3, y: 0 }
} start Node { id: 'A', x: 0, y: 1 } goal Node { id: 'F', x: 1, y: -2 }
{
  path: [
    Node { id: 'A', x: 0, y: 1 },
    Node { id: 'D', x: 0, y: 0, heuristic: 3 },
    Node { id: 'E', x: 1, y: -5, heuristic: 3 },
    Node { id: 'F', x: 1, y: -2, heuristic: 0 }
  ],
  cost: null,
  count_searches: 6,
  formatted_path: 'A -> D -> E -> F',
  exploration_path: [
    Node { id: 'A', x: 0, y: 1 },
    Node { id: 'C', x: 2, y: -1, heuristic: 2 },
    Node { id: 'G', x: 3, y: -2, heuristic: 2 },
    Node { id: 'D', x: 0, y: 0, heuristic: 3 },
    Node { id: 'E', x: 1, y: -5, heuristic: 3 },
    Node { id: 'F', x: 1, y: -2, heuristic: 0 }
  ],
  queue_snapshot: [
    [ { id: 'A', priority: 0 } ],
    [
      { id: 'C', priority: 2 },
      { id: 'D', priority: 3 },
      { id: 'B', priority: 4 }
    ],
    [
      { id: 'G', priority: 2 },
      { id: 'D', priority: 3 },
      { id: 'B', priority: 4 },
      { id: 'H', priority: 4 }
    ],
    [
      { id: 'D', priority: 3 },
      { id: 'B', priority: 4 },
      { id: 'H', priority: 4 }
    ],
    [
      { id: 'E', priority: 3 },
      { id: 'B', priority: 4 },
      { id: 'H', priority: 4 }
    ],
    [
      { id: 'F', priority: 0 },
      { id: 'B', priority: 4 },
      { id: 'H', priority: 4 }
    ]
  ]

  ```



