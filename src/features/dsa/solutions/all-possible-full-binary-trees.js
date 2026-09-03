class AllPossibleFullBinaryTrees {
	solve(n) {
		return allPossibleFBT(n);
	}
}

module.exports = { Problem: AllPossibleFullBinaryTrees };

function allPossibleFBT(n) {
	if (n % 2 === 0) {
		return [];
	}

	const dp = new Array(n + 1).fill(null).map(() => []);

	dp[1].push(new TreeNode(0));

	for (let count = 3; count <= n; count += 2) {
		for (let i = 1; i < count - 1; i += 2) {
			const j = count - 1 - i;
			for (const left of dp[i]) {
				for (const right of dp[j]) {
					const root = new TreeNode(0);
					root.left = left;
					root.right = right;
					dp[count].push(root);
				}
			}
		}
	}

	return dp[n];
}

class TreeNode {
	constructor(val, left = null, right = null) {
		this.val = val;
		this.left = left;
		this.right = right;
	}
}
