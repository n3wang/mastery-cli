---
title: Min Max Prunning
description: Create Adversarial Search Prunning Problem
tags: [ai, medium, search]
images: []
---

### Description

Create Adversarial Search Prunning Problem

### Example 1

![](https://media.geeksforgeeks.org/wp-content/uploads/MIN_MAX3.jpg)

```js

let values = [3, 5, 6, 9, 1, 2, 0, -1];
let result = problem.solve(values);
console.log("MinMaxPrunnin with:", values, result);
```

Should equals to:

```js
assert.equal(result.minmax, 5);
assert.deepEqual(result.prunnings, [6, 2]);
```

- Prunnings being the nodes in which trigger prunnings.

### Example 2

```js
let values = [4, 8, 9, 3, 2, -2, 2, -1];
const problem = new this.Problem
```

```js
assert.equal(result.minmax, 8);
assert.deepEqual(result.prunnings, [9, 2]);
```

### Constraints:

- By default the player is a maximizer.
- Numebers on the leafts being x; abs(x) < 1000