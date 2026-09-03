class BinaryTreeMaximumPathSum {
	/**
	 * https://leetcode.com/problems/binary-tree-maximum-path-sum/
	 * Time O(N) | Space O(H)
	 * @param {TreeNode} root
	 * @return {number}
	 */
	maxPathSum = function (root, maxValue = [-Infinity]) {
		const pathSum = (root, maxValue) => {
			const isBaseCase = root === null;
			if (isBaseCase) return 0;

			return dfs(root, maxValue);
		};

		const dfs = (node, maxValue) => {
			// TODO get the left and right path.
			const sum = left + right + node.val;

			// Chck if the max under these roots to return.
			maxValue[0] = Math.max(maxValue[0], sum);

			// TODO Return Maximum path that makes the most sense..
		};
		pathSum(root, maxValue);

		return maxValue[0];
	};
	solve(root) {
		return this.maxPathSum(root);
	}
}

module.exports = { Problem: BinaryTreeMaximumPathSum };
