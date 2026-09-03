class SameTree {
	dfs = (p, q) => {
		const left = this.isSameTree(p.left, q.left);
		const right = this.isSameTree(p.right, q.right);

		return left && right;
	};

	/**
	 * https://leetcode.com/problems/same-tree/
	 * TIme O(N) | Space O(H)
	 * @param {TreeNode} p
	 * @param {TreeNode} q
	 * @return {boolean}
	 */
	isSameTree = function (p, q) {
		const isBaseCase = !(p || q);
		if (isBaseCase) return true;

		const isBalanced = p && q;
		if (!isBalanced) return false;

		// TODO If both are the value then continue, otherwise, DFS for the left and right subtrees.
	};

	solve(p, q) {
		return this.isSameTree(p, q);
	}
}

module.exports = { Problem: SameTree };
