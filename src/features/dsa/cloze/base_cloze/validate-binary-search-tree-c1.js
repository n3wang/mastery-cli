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

		// TODO Complete the isValidBST function, which checks if the tree is a valid BST.
	};

	solve(root) {
		return this.isValidBST(root);
	}
}

module.exports = { Problem: ValidateBinarySearchTree };
