class CountNodes {
	computeDepth(node) {
		let d = 0;
		while (node.left !== null) {
			node = node.left;
			++d;
		}
		return d;
	}

	exists(idx, d, node) {
		let left = 0,
			right = Math.pow(2, d) - 1;
		let pivot;
		for (let i = 0; i < d; ++i) {
			pivot = left + Math.floor((right - left) / 2);
			if (idx <= pivot) {
				node = node.left;
				right = pivot;
			} else {
				node = node.right;
				left = pivot + 1;
			}
		}
		return node !== null;
	}

	solve(root) {
		// TODO If the tree is empty

		// TODO Calculate the depth as `d`

		// TODO If the tree contains 1 node

		// Last level nodes are enumerated from 0 to 2**d - 1 (left -> right).
		// Perform binary search to check how many nodes exist.
		let left = 1,
			right = Math.pow(2, d) - 1;
		let pivot;
		while (left <= right) {
			pivot = left + Math.floor((right - left) / 2);
			if (this.exists(pivot, d, root)) left = pivot + 1;
			else right = pivot - 1;
		}

		// The tree contains 2**d - 1 nodes on the first (d - 1) levels
		// and left nodes on the last level.
		// TODO Return the count of nodes.
	}
}

function TreeNode(val) {
	this.val = val;
	this.left = null;
	this.right = null;
}

module.exports = { Problem: CountNodes, TreeNode };
