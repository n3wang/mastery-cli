---
title: Battle of Two Chess Rooks
description: 
tags: [medium, ai-search]
link: ""
images: []
---

### Description

Given a simplified 4x4 chess board with only two rooks (one for each player) placed at random positions, you need to determine the minimum number of moves required for player A to capture player B's rook, considering that player B will try to avoid being captured.

Rooks can move any number of squares horizontally or vertically, but not diagonally. They capture an opponent's piece by moving to its square. Both players will make optimal moves.

You are provided with the coordinates of both rooks. Determine the minimum number of moves required for player A's rook to capture player B's rook.

playerA (0-indexed array): An array of two integers, [row, col], representing the position of player A's rook (0 <= row, col <= 3).
playerB (0-indexed array): An array of two integers, [row, col], representing the position of player B's rook (0 <= row, col <= 3).

```js
function min_moves_to_capture_adversarial(playerA, playerB) {
    // ...
}

```

Output:

Return an integer representing the minimum number of moves required for player A's rook to capture player B's rook.


### Example 1

```bash
console.log(min_moves_to_capture_adversarial([0, 0], [1, 0])); // Output: 3
console.log(min_moves_to_capture_adversarial([0, 0], [1, 1])); // Output: 4
console.log(min_moves_to_capture_adversarial([0, 1], [2, 3])); // Output: 4

```
Explanation: Player A's rook can directly move one step down to capture player B's rook.

### Example 2


```bash
Input: [[0, 0], [3, 3]]
Expected Output: 5

A . . .
. . . .
. . . .
. . . B

```

Player A's rook is at the top-left corner (0, 0), and player B's rook is at the bottom-right corner (3, 3). They are not on the same row or column, and their positions are not neighboring rows or columns.

Optimal moves:

Player A moves the rook to (1, 0) or (0, 1).
Player B moves the rook to avoid capture.
Player A moves the rook to block player B's rook (either on the same row or column).
Player B moves the rook to avoid capture again.
Player A captures player B's rook.
Minimum moves needed: 5


### Example 3

```bash
Input: [[2, 2], [0, 0]]
Expected Output: 5
```

```bash
B . . .
. . . .
. . A .
. . . .

```

Player A's rook is in the middle of the board (2, 2), and player B's rook is at the top-left corner (0, 0). They are not on the same row or column, and their positions are not neighboring rows or columns.

Optimal moves:

Player A moves the rook to (1, 2) or (2, 1).
Player B moves the rook to avoid capture.
Player A moves the rook to block player B's rook (either on the same row or column).
Player B moves the rook to avoid capture again.
Player A captures player B's rook.

### Solution

```js
function min_moves_to_capture_adversarial(playerA, playerB) {
    const [rowA, colA] = playerA;
    const [rowB, colB] = playerB;

    // If the rooks are on the same row or same column, player A needs 3 moves
    if (rowA === rowB || colA === colB) {
        return 3;
    }

    // If the rooks are on neighboring rows or columns, player A needs 4 moves
    if (Math.abs(rowA - rowB) <= 1 || Math.abs(colA - colB) <= 1) {
        return 4;
    }

    // In other cases, player A needs at least 5 moves
    return 5;
}

// Test cases
console.log(min_moves_to_capture_adversarial([0, 0], [1, 0])); // Output: 3
console.log(min_moves_to_capture_adversarial([0, 0], [1, 1])); // Output: 4
console.log(min_moves_to_capture_adversarial([0, 1], [2, 3])); // Output: 5

```

const root_1 = new TreeNode(
    7,
    new TreeNode(3, new TreeNode(6), new TreeNode(1)),
    new TreeNode(5, new TreeNode(4), new TreeNode(2))
);
console.log(optimalPlay(root_1)); // Output: [12, 4]
