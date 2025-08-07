class ValidateBinarySearchTree {
	/**
	 * https://leetcode.com/problems/validate-binary-search-tree/
	 * Time O(N) | Space O(H)
	 * @param {TreeNode} root
	 * @return {boolean}
	 */
	isValidBST = function (root, min = -Infinity, max = Infinity) {
		const dfs = (root, min, max) => {
			// TODO Complete dfs
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
