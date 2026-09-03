class HouseRobberIII {
	solve(root) {
		const { robMax, notRobMax } = this.dfs(root);
		return Math.max(robMax, notRobMax);
	}

	dfs(node) {
		if (node === null) {
			return { robMax: 0, notRobMax: 0 };
		}

		const left = this.dfs(node.left);
		const right = this.dfs(node.right);

		// If the current node is robbed, we cannot rob its children.
		const robMax = node.val + left.notRobMax + right.notRobMax;

		// If the current node is not robbed, we can choose to rob or not rob its children.
		const notRobMax =
			Math.max(left.robMax, left.notRobMax) +
			Math.max(right.robMax, right.notRobMax);

		return { robMax, notRobMax };
	}
}

class TreeNode {
	constructor(val) {
		this.val = val;
		this.left = this.right = null;
	}
}

module.exports = { Problem: HouseRobberIII };
