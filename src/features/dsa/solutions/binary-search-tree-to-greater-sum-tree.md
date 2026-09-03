

The intuition is to do the reverse inorder traversal of the BST. This way, we visit the nodes in descending order. We keep track of the total sum of the nodes visited so far and update the value of the current node with the total sum. We then move to the left child and repeat the process.

```python
class Solution:
    def bstToGst(self, root):
        # Store the inorder traversal in an array.
        self.inorder_traversal = []
        self.total = 0

        self.inorder(root)

        return root

    def inorder(self, root):
        if root is None:
            return
        self.inorder(root.right)
        self.total += root.val
        root.val = self.total
        self.inorder(root.left)
```







