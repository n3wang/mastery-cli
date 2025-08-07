/**
 * O(n) space solution, but still. Beautiful Recursion.
 */

class FlattenTree {
	solve(root) {
		lastVisitedNode;
		function flatten(node) {
			if (node === null) {
				return;
			}

			flatten(node.right);
			flatten(node.left);

			// TODO Set the right node to the last visited node, and left node as Null

			// Also remember to set the last visited node to the current node.
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
