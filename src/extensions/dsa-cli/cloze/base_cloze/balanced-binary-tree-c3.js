class BalanceBinaryTree {
	isBalanced = function (root) {
		const isChildBalanced = root => {
			const left = this.isBalanced(root.left);
			const right = this.isBalanced(root.right);

			return left && right;
		};

		const isAcceptableHeight = root => {
			// TODO Complete the isAcceptableHeight function, which checks if the height is acceptable.
		};

		const getHeight = root => {
			const isBaseCase = root === null;
			if (isBaseCase) return 0;

			return dfs(root);
		};

		var dfs = root => {
			const left = getHeight(root.left);
			const right = getHeight(root.right);

			const height = Math.max(left, right);

			return height + 1;
		};

		const isBaseCase = root === null;
		if (isBaseCase) return true;
		if (!isAcceptableHeight(root)) return false;
		if (!isChildBalanced(root)) return false;

		return true;
	};

	/**
	 * https://leetcode.com/problems/balanced-binary-tree/
	 * TIme O(N) | Space O(H)
	 * @param {TreeNode} root
	 * @return {boolean}
	 */
	solve(root) {
		return this.isBalanced(root);
	}
}

module.exports = { Problem: BalanceBinaryTree };
