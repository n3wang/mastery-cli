class BalanceBinaryTree {
	isBalanced = function (root) {
		const isChildBalanced = root => {
			// TODO Complete the isChildBalanced function, which checks if the left and right are balanced.
		};

		const isAcceptableHeight = root => {
			const left = getHeight(root.left);
			const right = getHeight(root.right);

			const difference = Math.abs(left - right);

			return difference <= 1;
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
