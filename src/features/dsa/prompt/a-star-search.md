---
title: A Star Search
description: AI Search Problem
tags: [ medium, search, ai]
---

### Description

A* Search is a graph search algorithm that is often used in pathfinding and graph traversal, which is the process of visiting (checking and/or updating) each vertex in a graph. It enjoys widespread use due to its performance and accuracy. It is one of the best and popular techniques used in path-finding and graph traversals.


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

Should be able to find it in 3 steps

```js
assert.equal(results.path.length, 3);
        assert.equal(results.path[0], start);
        assert.equal(results.path[2], goal);
```







