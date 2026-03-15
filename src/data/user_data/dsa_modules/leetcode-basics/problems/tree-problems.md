# Binary Tree Inorder Traversal

**Tags:** tree, depth-first search, binary tree  
**Difficulty:** Easy  

## Description
Given the root of a binary tree, return the inorder traversal of its nodes' values.

Inorder traversal visits nodes in the order: left subtree → root → right subtree.

## Theory
For inorder traversal, we can use either recursion or iteration with a stack. The recursive approach is more intuitive, while the iterative approach uses explicit stack management.

## Pseudocode
```
function inorderTraversal(root):
    if root is null:
        return []
    
    result = []
    inorderHelper(root, result)
    return result

function inorderHelper(node, result):
    if node is null:
        return
    
    inorderHelper(node.left, result)
    result.append(node.val)
    inorderHelper(node.right, result)
```

## Solution

### Python
```python
def inorderTraversal(root):
    if not root:
        return []
    
    result = []
    
    def inorder(node):
        if not node:
            return
        
        inorder(node.left)
        result.append(node.val)
        inorder(node.right)
    
    inorder(root)
    return result
```

### JavaScript
```javascript
function inorderTraversal(root) {
    if (!root) return [];
    
    const result = [];
    
    function inorder(node) {
        if (!node) return;
        
        inorder(node.left);
        result.push(node.val);
        inorder(node.right);
    }
    
    inorder(root);
    return result;
}
```

---

# Maximum Depth of Binary Tree

**Tags:** tree, depth-first search, breadth-first search, binary tree  
**Difficulty:** Easy  

## Description
Given the root of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

## Theory
We can solve this using either DFS (depth-first search) or BFS (breadth-first search). DFS recursively calculates the depth of left and right subtrees, while BFS uses level-order traversal.

## Pseudocode
```
function maxDepth(root):
    if root is null:
        return 0
    
    leftDepth = maxDepth(root.left)
    rightDepth = maxDepth(root.right)
    
    return 1 + max(leftDepth, rightDepth)
```

## Solution

### Python
```python
def maxDepth(root):
    if not root:
        return 0
    
    left_depth = maxDepth(root.left)
    right_depth = maxDepth(root.right)
    
    return 1 + max(left_depth, right_depth)
```

### JavaScript
```javascript
function maxDepth(root) {
    if (!root) return 0;
    
    const leftDepth = maxDepth(root.left);
    const rightDepth = maxDepth(root.right);
    
    return 1 + Math.max(leftDepth, rightDepth);
}
```

---

# Same Tree

**Tags:** tree, depth-first search, binary tree  
**Difficulty:** Easy  

## Description
Given the roots of two binary trees `p` and `q`, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.

## Theory
Use recursion to compare trees. Two trees are the same if:
1. Both are null, or
2. Both have the same value and their left and right subtrees are respectively the same.

## Pseudocode
```
function isSameTree(p, q):
    if p is null and q is null:
        return true
    
    if p is null or q is null:
        return false
    
    if p.val != q.val:
        return false
    
    return isSameTree(p.left, q.left) and isSameTree(p.right, q.right)
```

## Solution

### Python
```python
def isSameTree(p, q):
    if not p and not q:
        return True
    
    if not p or not q:
        return False
    
    if p.val != q.val:
        return False
    
    return isSameTree(p.left, q.left) and isSameTree(p.right, q.right)
```

### JavaScript
```javascript
function isSameTree(p, q) {
    if (!p && !q) return true;
    
    if (!p || !q) return false;
    
    if (p.val !== q.val) return false;
    
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}
```