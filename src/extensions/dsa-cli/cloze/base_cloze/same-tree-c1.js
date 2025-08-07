class SameTree {
	dfs = (p, q) => {
		// TODO  Run if are the same tree for right and left.
		// Return True only if both are the same tree.
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

		const isSame = p.val === q.val;
		if (!isSame) return false;

		return this.dfs(p, q);
	};

	solve(p, q) {
		return this.isSameTree(p, q);
	}
}

module.exports = { Problem: SameTree };
