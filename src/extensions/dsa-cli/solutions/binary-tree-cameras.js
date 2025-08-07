class BinaryTreeCameras {
	constructor() {
		this.ans = 0;
		this.covered = new Set();
		this.covered.add(null);
	}

	solve(root) {
		this.dfs(root, null);
		return this.ans;
	}

	dfs(node, par) {
		if (node !== null) {
			this.dfs(node.left, node);
			this.dfs(node.right, node);

			if (
				(par === null && !this.covered.has(node)) ||
				!this.covered.has(node.left) ||
				!this.covered.has(node.right)
			) {
				this.ans++;
				this.covered.add(node);
				this.covered.add(par);
				this.covered.add(node.left);
				this.covered.add(node.right);
			}
		}
	}
}

class TreeNode {
	constructor(val) {
		this.val = val;
		this.left = null;
		this.right = null;
	}
}

module.exports = { Problem: BinaryTreeCameras };
