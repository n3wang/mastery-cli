



1. Find the first half and try that as root, complete then the second and so forth from an array. and search binary wise. 



```python

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def balanceBST(self, root: TreeNode) -> TreeNode:
        # Create an empty list to store the nodes in inorder.
        self.nodes = []
        
        # Fill the list with nodes from the tree in inorder.
        self.inorder(root)
        
        # Use the sorted nodes to construct a balanced BST.
        return self.craftBalanced(0, len(self.nodes) - 1)

    def craftBalanced(self, l, r):
        # If the left index exceeds the right, no more nodes to process.
        if l > r:
            return None
        
        # Calculate the middle index to pick the median as the root.
        mid = (l + r) // 2
        
        # Create a new tree node with the median value.
        node = TreeNode(self.nodes[mid])
        
        # Recursively construct the left subtree.
        node.left = self.craftBalanced(l, mid - 1)
        
        # Recursively construct the right subtree.
        node.right = self.craftBalanced(mid + 1, r)
        
        return node

    def inorder(self, node):
        # Perform an inorder traversal to get sorted values.
        if node:
            self.inorder(node.left)
            self.nodes.append(node.val)  # Append the node itself if TreeNode needs to be rebuilt
            self.inorder(node.right)


```