---
title: Breadth First Search
description: AI Search Problem
tags: [ medium, search, ai]
---

### Description

- uninformed search
- adds neighbors in queue

### Example 1


Given: 

```js

        //   A____B____C
        //   |   |   /
        //   |   |  /
        //   |   | /
        //   D___E
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
        graph.addEdge(D,  G);
        graph.addEdge(E, G);
        graph.addEdge(G, G);

        const nodes = { A, B, C, D, E, G, F };
        return { graph: graph, nodes: nodes };
```

Results in:

```bash
{
  path: [
    Node { id: 'A', x: 0, y: 2 },
    Node { id: 'D', x: 0, y: 1 },
    Node { id: 'G', x: 0, y: 0 }
  ],
  cost: null,
  count_searches: 6,
  formatted_path: 'A -> D -> G',
  exploration_path: [
    Node { id: 'A', x: 0, y: 2 },
    Node { id: 'B', x: 1, y: 2 },
    Node { id: 'D', x: 0, y: 1 },
    Node { id: 'C', x: 2, y: 2 },
    Node { id: 'E', x: 1, y: 1 },
    Node { id: 'G', x: 0, y: 0 }
  ]
}
```

Should be able to find it it using breadth First Search.



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


```bash
 path: [
    Node { id: 'A', x: 0, y: 1 },
    Node { id: 'D', x: 0, y: 0 },
    Node { id: 'E', x: 1, y: -5 },
    Node { id: 'F', x: 1, y: -2 }
  ],
  cost: null,
  count_searches: 8,
  formatted_path: 'A -> D -> E -> F',
  exploration_path: [
    Node { id: 'A', x: 0, y: 1 },
    Node { id: 'B', x: 2, y: 1 },
    Node { id: 'D', x: 0, y: 0 },
    Node { id: 'C', x: 2, y: -1 },
    Node { id: 'H', x: 3, y: 0 },
    Node { id: 'E', x: 1, y: -5 },
    Node { id: 'G', x: 3, y: -2 },
    Node { id: 'F', x: 1, y: -2 }
  ]
```




