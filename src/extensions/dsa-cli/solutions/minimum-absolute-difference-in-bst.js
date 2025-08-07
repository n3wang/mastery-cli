class GetMinimumDifference {
	constructor() {
		// Array to store the tree nodes in inorder traversal.
		this.inorderNodes = [];
	}

	inorderTraversal(node) {
		if (node === null) {
			return;
		}

		this.inorderTraversal(node.left);
		// Store the nodes in the array.
		this.inorderNodes.push(node.val);
		this.inorderTraversal(node.right);
	}

	solve(root) {
		this.inorderTraversal(root);

		let minDifference = Number.MAX_SAFE_INTEGER;
		// Find the difference between every two consecutive values in the array.
		for (let i = 1; i < this.inorderNodes.length; i++) {
			minDifference = Math.min(
				minDifference,
				this.inorderNodes[i] - this.inorderNodes[i - 1]
			);
		}

		return minDifference;
	}
}

function TreeNode(val) {
	this.val = val;
	this.left = null;
	this.right = null;
}

module.exports = { Problem: GetMinimumDifference, TreeNode };
