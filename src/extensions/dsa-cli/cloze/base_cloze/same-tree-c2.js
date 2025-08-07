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
		// TODO If both are None, return TRUE, retunr false, if they are not both available. Return False if it is not all not None because then it means that one of them is None and the other is not None. If they are both not None, then check if they are the same value. If they are not the same value, return False. If they are the same value, then check if the left and right subtrees are the same. If they are not the same, return False. If they are the same, return True.

		const isSame = p.val === q.val;
		if (!isSame) return false;

		return this.dfs(p, q);
	};

	solve(p, q) {
		return this.isSameTree(p, q);
	}
}

module.exports = { Problem: SameTree };
