class UniqueBinarySearchTrees {
	solve(n) {
		const dp = new Array(n + 1);
		for (let i = 0; i <= n; i++) {
			dp[i] = [];
		}
		dp[0].push(null);

		for (let numberOfNodes = 1; numberOfNodes <= n; numberOfNodes++) {
			for (let i = 1; i <= numberOfNodes; i++) {
				const j = numberOfNodes - i;
				for (const left of dp[i - 1]) {
					for (const right of dp[j]) {
						const root = new TreeNode(i);
						root.left = this.clone(left, 0);
						root.right = this.clone(right, i);
						dp[numberOfNodes].push(root);
					}
				}
			}
		}
		return dp[n];
	}

	clone(node, offset) {
		if (!node) {
			return null;
		}
		const clonedNode = new TreeNode(node.val + offset);
		clonedNode.left = this.clone(node.left, offset);
		clonedNode.right = this.clone(node.right, offset);
		return clonedNode;
	}
}

class TreeNode {
	constructor(val, left = null, right = null) {
		this.val = val;
		this.left = left;
		this.right = right;
	}
}

module.exports = { Problem: UniqueBinarySearchTrees };
