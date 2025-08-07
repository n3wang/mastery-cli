class ValidateBinarySearchTree {
	/**
	 * https://leetcode.com/problems/validate-binary-search-tree/
	 * Time O(N) | Space O(H)
	 * @param {TreeNode} root
	 * @return {boolean}
	 */
	isValidBST = function (root, min = -Infinity, max = Infinity) {
		const dfs = (root, min, max) => {
			const left = this.isValidBST(root.left, min, root.val);
			const right = this.isValidBST(root.right, root.val, max);

			return left && right;
		};
		const isBaseCase = root === null;
		if (isBaseCase) return true;

		const isInvalid = root.val <= min || max <= root.val;
		if (isInvalid) return false;

		return dfs(root, min, max);
	};

	solve(root) {
		return this.isValidBST(root);
	}
}

module.exports = { Problem: ValidateBinarySearchTree };
