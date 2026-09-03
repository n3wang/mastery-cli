---
title: Hill Climbing Search
description: AI Search Problem
tags: [ medium, search, ai]
---

### Description

Hill climbing is a simple optimization algorithm used in Artificial Intelligence (AI) to find the best possible solution for a given problem. It belongs to the family of local search algorithms and is often used in optimization problems where the goal is to find the best solution from a set of possible solutions.

In Hill Climbing, the algorithm starts with an initial solution and then iteratively makes small changes to it in order to improve the solution. These changes are based on a heuristic function that evaluates the quality of the solution. The algorithm continues to make these small changes until it reaches a local maximum, meaning that no further improvement can be made with the current set of moves.

Hill Climbing can be useful in a variety of optimization problems, such as scheduling, route planning, and resource allocation. However, it has some limitations, such as the tendency to get stuck in local maxima and the lack of diversity in the search space. Therefore, it is often combined with other optimization techniques, such as genetic algorithms or simulated annealing, to overcome these limitations and improve the search results.


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

Should be able to find it it using depth First Search.

Traversal:

```js
______________________________________________
Results from create_graph_5, Hill Climbing Search
neighbors [
  { id: 'B', x: 1, y: 2, heuristic: 3 },
  { id: 'D', x: 0, y: 1, heuristic: 1 }
]
bestNext selected:  Node { id: 'D', x: 0, y: 1 }
neighbors [
  { id: 'G', x: 0, y: 0, heuristic: 0 },
  { id: 'F', x: 1, y: 0, heuristic: 1 },
  { id: 'E', x: 1, y: 1, heuristic: 2 },
  { id: 'G', x: 0, y: 0, heuristic: 0 }
]
bestNext selected:  Node { id: 'G', x: 0, y: 0 }
{
  path: [
    Node { id: 'A', x: 0, y: 2 },
    Node { id: 'D', x: 0, y: 1 },
    Node { id: 'G', x: 0, y: 0 }
  ],
  cost: 3,
  count_searches: 2,
  formatted_path: 'A -> D -> G',
  exploration_path: [ Node { id: 'A', x: 0, y: 2 }, Node { id: 'D', x: 0, y: 1 } ]
}
```

### create_long_ass_graph

Here it should get stuck, given a a local minima (despite following the right heurisitcs)


Hill climbing algorithm is a local search algorithm that can get stuck in a local maximum if the search space has many peaks and valleys, or if the heuristic function is not well-designed. When hill climbing gets stuck in a local maximum, it cannot find a better solution without backtracking to a previous state and exploring a different path.

Therefore, backtracking is a technique commonly used to escape from local maxima in hill climbing. When the algorithm reaches a local maximum, it backtracks to a previous state and explores a different path. This process continues until the algorithm finds the global maximum or reaches a predefined stopping criterion.

However, not all variants of hill climbing use backtracking. Some variants, such as Simulated Annealing and Tabu Search, use randomization or diversification to escape from local maxima. These variants may not backtrack but instead explore the search space in a more stochastic manner to avoid getting stuck in local maxima.

```js

______________________________________________

Results from create_long_ass_graph, Hill Climbing Search

neighbors [
  { id: 'B', x: 1, y: -1, 'heuristic (distance)': 14 },
  { id: 'C', x: 1, y: 1, 'heuristic (distance)': 16 }
]
bestNext selected:  Node { id: 'B', x: 1, y: -1 }
neighbors [
  { id: 'D', x: 2, y: -2, 'heuristic (distance)': 12 },
  { id: 'E', x: 2, y: 0, 'heuristic (distance)': 14 }
]
bestNext selected:  Node { id: 'D', x: 2, y: -2 }
neighbors [
  { id: 'H', x: 3, y: -1, 'heuristic (distance)': 12 },
  { id: 'I', x: 3, y: 1, 'heuristic (distance)': 14 }
]
bestNext selected:  Node { id: 'H', x: 3, y: -1 }
neighbors [
  { id: 'P', x: 5, y: -5, 'heuristic (distance)': 6 },
  { id: 'Q', x: 5, y: -3, 'heuristic (distance)': 8 }
]
bestNext selected:  Node { id: 'P', x: 5, y: -5 }
neighbors [
  { id: 'AF', x: 7, y: -1, 'heuristic (distance)': 8 },
  { id: 'AG', x: 7, y: 1, 'heuristic (distance)': 10 }
]
bestNext selected:  Node { id: 'AF', x: 7, y: -1 }
Error: The algorithm got stuck and could not find a solution.
```

> Note how the Hill Climbing Search gets stuck at the local Minimum, and does not backtrack to find the global minimum.



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
const F = new Node('F', 1, -6);
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


Expected to fail, as the algorithm should get stuck with the local maximum at node C. (Throw an error)

```js
neighbors [
  { id: 'B', x: 2, y: 1, 'heuristic (distance)': 8 },
  { id: 'D', x: 0, y: 0, 'heuristic (distance)': 7 },
  { id: 'C', x: 2, y: -1, 'heuristic (distance)': 6 }
]
bestNext selected:  Node { id: 'C', x: 2, y: -1 }
neighbors [
  { id: 'A', x: 0, y: 1, 'heuristic (distance)': 8 },
  { id: 'B', x: 2, y: 1, 'heuristic (distance)': 8 },
  { id: 'H', x: 3, y: 0, 'heuristic (distance)': 8 },
  { id: 'G', x: 3, y: -2, 'heuristic (distance)': 6 },
  { id: 'D', x: 0, y: 0, 'heuristic (distance)': 7 }
]
bestNext selected:  Node { id: 'G', x: 3, y: -2 }
neighbors [
  { id: 'C', x: 2, y: -1, 'heuristic (distance)': 6 },
  { id: 'D', x: 0, y: 0, 'heuristic (distance)': 7 },
  { id: 'E', x: 1, y: -5, 'heuristic (distance)': 1 }
]
bestNext selected:  Node { id: 'E', x: 1, y: -5 }
neighbors [
  { id: 'D', x: 0, y: 0, 'heuristic (distance)': 7 },
  { id: 'G', x: 3, y: -2, 'heuristic (distance)': 6 },
  { id: 'F', x: 1, y: -6, 'heuristic (distance)': 0 }
]
bestNext selected:  Node { id: 'F', x: 1, y: -6 }
______________________________________________
Results from t_graph_1, Hill Climbing Search
{
  path: [
    Node { id: 'A', x: 0, y: 1 },
    Node { id: 'C', x: 2, y: -1 },
    Node { id: 'G', x: 3, y: -2 },
    Node { id: 'E', x: 1, y: -5 },
    Node { id: 'F', x: 1, y: -6 }
  ],
  cost: 5,
  count_searches: 4,
  formatted_path: 'A -> C -> G -> E -> F',
  exploration_path: [
    Node { id: 'A', x: 0, y: 1 },
    Node { id: 'C', x: 2, y: -1 },
    Node { id: 'G', x: 3, y: -2 },
    Node { id: 'E', x: 1, y: -5 }
  ]
}
 t_graph_1 Hill Climbing Search: 4
```






