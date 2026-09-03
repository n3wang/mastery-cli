/**
 * O(n) space solution, but still. Beautiful Recursion.
 */

class FlattenTree {
	solve(root) {
		lastVisitedNode;
		function flatten(node) {
			// TODO Return if base case found. Flatte right and left on that order(reverse.)

			node.right = lastVisitedNode;
			node.left = null;
			lastVisitedNode = node;
		}

		flatten(root);
	}
}

function TreeNode(val) {
	this.val = val;
	this.left = null;
	this.right = null;
}

module.exports = { Problem: FlattenTree, TreeNode };
