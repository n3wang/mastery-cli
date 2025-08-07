class BalanceBinaryTree {
	isBalanced = function (root) {
		const isChildBalanced = root => {
			const left = this.isBalanced(root.left);
			const right = this.isBalanced(root.right);

			return left && right;
		};

		const isAcceptableHeight = root => {
			const left = getHeight(root.left);
			const right = getHeight(root.right);

			const difference = Math.abs(left - right);

			return difference <= 1;
		};

		const getHeight = root => {
			// TODO Complete the getHeight function, which obtains the height of the tree.
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
