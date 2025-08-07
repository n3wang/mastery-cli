class FlattenTree {
	solve(root) {
		// TODO Handle the null scenario

		let node = root;

		// TODO While the current node is still not null.
		while (false) {
			// If the node has a left child
			if (node.left !== null) {
				// Find the rightmost node
				let rightmost = node.left;
				while (rightmost.right !== null) {
					rightmost = rightmost.right;
				}

				// Rewire the connections
				rightmost.right = node.right;
				node.right = node.left;
				node.left = null;
			}

			// TODO Move on to the right side of the tree
		}
	}
}

function TreeNode(val) {
	this.val = val;
	this.left = null;
	this.right = null;
}

module.exports = { Problem: FlattenTree, TreeNode };
