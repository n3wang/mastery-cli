---
title: beam search
description: AI Search Problem
tags: [ medium, search, ai]
---

### Description

Introduction :
A heuristic technique is a set of criteria for determining which of multiple options will be the most effective in achieving a particular goal. This strategy increases the efficiency of a search process by surrendering claims of systematic and completeness of the best.
We can hope to achieve a good solution to difficult problems (such as the traveling salesman problem) in less than exponent time if we use appropriate heuristics. 


### Example 1

Sample Graph

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

Should be able to find it it using Beam Search.

Traversal:

```js
______________________________________________
Results from create_graph_5, Beam Search

exploring current level: A
exploring current level: D, B
exploring current level: G, F, E //Note how g goes first.
{
  path: [
    Node { id: 'A', x: 0, y: 2, heuristic: 2 },
    Node { id: 'D', x: 0, y: 1, heuristic: 1 },
    Node { id: 'G', x: 0, y: 0, heuristic: 0 }
  ],
  cost: 4,
  count_searches: 4,
  formatted_path: 'A -> D -> G',
  exploration_path: [
    Node { id: 'A', x: 0, y: 2, heuristic: 2 },
    Node { id: 'D', x: 0, y: 1, heuristic: 1 },
    Node { id: 'B', x: 1, y: 2, heuristic: 3 },
    Node { id: 'G', x: 0, y: 0, heuristic: 0 }
  ],
  queue_snapshot: [
    [ { '0': Node { id: 'A', x: 0, y: 2, heuristic: 2 } } ],
    [
      {
        '0': Node { id: 'D', x: 0, y: 1, heuristic: 1 },
        '1': Node { id: 'B', x: 1, y: 2, heuristic: 3 }
      }
    ],
    [
      {
        '0': Node { id: 'G', x: 0, y: 0, heuristic: 0 },
        '1': Node { id: 'F', x: 1, y: 0 },
        '2': Node { id: 'E', x: 1, y: 1 }
      }
    ]
  ]
}
```


### t_graph_1

```js
        /**  
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
         */


        const A = new Node('A', 0, 1);
        const B = new Node('B', 2, 1);
        const C = new Node('C', 2, -1);
        const D = new Node('D', 0, 0);
        const E = new Node('E', 1, -5);
        const F = new Node('F', 1, -6);
        const G = new Node('G', 3, -2);
        const H = new Node('H', 3, 0);

        const nodes = { A, B, C, D, E, F, G, H };


        const graph = new BidirectionalGraph();
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

```js
exploring current level: A
exploring current level: C, D, B // note how C is first, as it has the lowest heuristic.
exploring current level: E, G, H // Note how e is first., then g, then H.
exploring current level: F
______________________________________________
Results from t_graph_1, Beam Search
{
  path: [
    Node { id: 'A', x: 0, y: 1, heuristic: 8 },
    Node { id: 'D', x: 0, y: 0, heuristic: 7 },
    Node { id: 'E', x: 1, y: -5, heuristic: 1 },
    Node { id: 'F', x: 1, y: -6, heuristic: 0 }
  ],
  cost: 8,
  count_searches: 8,
  formatted_path: 'A -> D -> E -> F',
  exploration_path: [
    Node { id: 'A', x: 0, y: 1, heuristic: 8 },
    Node { id: 'C', x: 2, y: -1, heuristic: 6 },
    Node { id: 'D', x: 0, y: 0, heuristic: 7 },
    Node { id: 'B', x: 2, y: 1, heuristic: 8 },
    Node { id: 'E', x: 1, y: -5, heuristic: 1 },
    Node { id: 'G', x: 3, y: -2, heuristic: 6 },
    Node { id: 'H', x: 3, y: 0, heuristic: 8 },
    Node { id: 'F', x: 1, y: -6, heuristic: 0 }
  ],
  queue_snapshot: [
    [ { '0': Node { id: 'A', x: 0, y: 1, heuristic: 8 } } ],
    [
      {
        '0': Node { id: 'C', x: 2, y: -1, heuristic: 6 },
        '1': Node { id: 'D', x: 0, y: 0, heuristic: 7 },
        '2': Node { id: 'B', x: 2, y: 1, heuristic: 8 }
      }
    ],
    [
      {
        '0': Node { id: 'E', x: 1, y: -5, heuristic: 1 },
        '1': Node { id: 'G', x: 3, y: -2, heuristic: 6 },
        '2': Node { id: 'H', x: 3, y: 0, heuristic: 8 }
      }
    ],
    [ { '0': Node { id: 'F', x: 1, y: -6, heuristic: 0 } } ]
  ]
}
 t_graph_1 Beam Search: 8
```


### Suprisingly for create_long_ass_graph 

- It shouldnt be able to find the response with k = 2
- It should be able to find the response with k = 5



```js width: 3
______________________________________________

Results from create_long_ass_graph Beam Search beam_width 3

exploring current level: A
exploring current level: B, C
exploring current level: G, D, E
exploring current level: K, H, N
exploring current level: AC, V, W
error, neighbor is undefined
error, neighbor is undefined
error, neighbor is undefined
```

But once we increase the beam:

You can also see how the level size increases.

```js width: 5
Results from create_long_ass_graph Beam Search beam_width 5

exploring current level: A
exploring current level: B, C
exploring current level: G, D, E, F
exploring current level: K, L, H, M, N
exploring current level: AC, V, W, P, X
error, neighbor is undefined
error, neighbor is undefined
error, neighbor is undefined
error, neighbor is undefined
exploring current level: AF, AG
```



```js width: 10
______________________________________________

Results from create_long_ass_graph Beam Search beam_width 10 

exploring current level: A
exploring current level: B, C
exploring current level: G, D, E, F
exploring current level: K, L, H, M, N, I, O, J
exploring current level: AC, V, AD, W, P, AE, X, Q, Y, R
error, neighbor is undefined
error, neighbor is undefined
error, neighbor is undefined
error, neighbor is undefined
error, neighbor is undefined
error, neighbor is undefined
error, neighbor is undefined
exploring current level: AK, AF, AG, AH, AI, AJ
Count Searches: 26
{
  path: [
    Node { id: 'A', x: 0, y: 0, heuristic: 16 },
    Node { id: 'B', x: 1, y: -1, heuristic: 14 },
    Node { id: 'D', x: 2, y: -2, heuristic: 12 },
    Node { id: 'I', x: 3, y: 1, heuristic: 14 },
    Node { id: 'R', x: 5, y: -1, heuristic: 10 },
    Node { id: 'AK', x: 8, y: -8, heuristic: 0 }
  ],
  cost: 26,
  count_searches: 26, // Total nodes is around 36. So it is still better than that.
  formatted_path: 'A -> B -> D -> I -> R -> AK',
  exploration_path: [
    Node { id: 'A', x: 0, y: 0, heuristic: 16 },
    Node { id: 'B', x: 1, y: -1, heuristic: 14 },
    Node { id: 'C', x: 1, y: 1, heuristic: 16 },
    Node { id: 'G', x: 3, y: -3, heuristic: 10 },
    Node { id: 'D', x: 2, y: -2, heuristic: 12 },
    Node { id: 'E', x: 2, y: 0, heuristic: 14 },
    Node { id: 'F', x: 2, y: 2, heuristic: 16 },
    Node { id: 'K', x: 4, y: -4, heuristic: 8 },
    Node { id: 'L', x: 4, y: -2, heuristic: 10 },
    Node { id: 'H', x: 3, y: -1, heuristic: 12 },
    Node { id: 'M', x: 4, y: 0, heuristic: 12 },
    Node { id: 'N', x: 4, y: 2, heuristic: 14 },
    Node { id: 'I', x: 3, y: 1, heuristic: 14 },
    Node { id: 'O', x: 4, y: 4, heuristic: 16 },
    Node { id: 'J', x: 3, y: 3, heuristic: 16 },
    Node { id: 'AC', x: 7, y: -7, heuristic: 2 },
    Node { id: 'V', x: 6, y: -6, heuristic: 4 },
    Node { id: 'AD', x: 7, y: -5, heuristic: 4 },
    Node { id: 'W', x: 6, y: -4, heuristic: 6 },
    Node { id: 'P', x: 5, y: -5, heuristic: 6 },
    Node { id: 'AE', x: 7, y: -3, heuristic: 6 },
    Node { id: 'X', x: 6, y: -2, heuristic: 8 },
    Node { id: 'Q', x: 5, y: -3, heuristic: 8 },
    Node { id: 'Y', x: 6, y: 0, heuristic: 10 },
    Node { id: 'R', x: 5, y: -1, heuristic: 10 },
    Node { id: 'AK', x: 8, y: -8, heuristic: 0 }
  ],
  queue_snapshot: [
    [ { '0': Node { id: 'A', x: 0, y: 0, heuristic: 16 } } ],
    [
      {
        '0': Node { id: 'B', x: 1, y: -1, heuristic: 14 },
        '1': Node { id: 'C', x: 1, y: 1, heuristic: 16 }
      }
    ],
    [
      {
        '0': Node { id: 'G', x: 3, y: -3, heuristic: 10 },
        '1': Node { id: 'D', x: 2, y: -2, heuristic: 12 },
        '2': Node { id: 'E', x: 2, y: 0, heuristic: 14 },
        '3': Node { id: 'F', x: 2, y: 2, heuristic: 16 }
      }
    ],
    [
      {
        '0': Node { id: 'K', x: 4, y: -4, heuristic: 8 },
        '1': Node { id: 'L', x: 4, y: -2, heuristic: 10 },
        '2': Node { id: 'H', x: 3, y: -1, heuristic: 12 },
        '3': Node { id: 'M', x: 4, y: 0, heuristic: 12 },
        '4': Node { id: 'N', x: 4, y: 2, heuristic: 14 },
        '5': Node { id: 'I', x: 3, y: 1, heuristic: 14 },
        '6': Node { id: 'O', x: 4, y: 4, heuristic: 16 },
        '7': Node { id: 'J', x: 3, y: 3, heuristic: 16 }
      }
    ],
    [
      {
        '0': Node { id: 'AC', x: 7, y: -7, heuristic: 2 },
        '1': Node { id: 'V', x: 6, y: -6, heuristic: 4 },
        '2': Node { id: 'AD', x: 7, y: -5, heuristic: 4 },
        '3': Node { id: 'W', x: 6, y: -4, heuristic: 6 },
        '4': Node { id: 'P', x: 5, y: -5, heuristic: 6 },
        '5': Node { id: 'AE', x: 7, y: -3, heuristic: 6 },
        '6': Node { id: 'X', x: 6, y: -2, heuristic: 8 },
        '7': Node { id: 'Q', x: 5, y: -3, heuristic: 8 },
        '8': Node { id: 'Y', x: 6, y: 0, heuristic: 10 },
        '9': Node { id: 'R', x: 5, y: -1, heuristic: 10 }
      }
    ],
    [
      {
        '0': Node { id: 'AK', x: 8, y: -8, heuristic: 0 },
        '1': Node { id: 'AF', x: 7, y: -1 },
        '2': Node { id: 'AG', x: 7, y: 1 },
        '3': Node { id: 'AH', x: 7, y: 3 },
        '4': Node { id: 'AI', x: 7, y: 5 },
        '5': Node { id: 'AJ', x: 7, y: 7 }
      }
    ]
  ]
}
```



