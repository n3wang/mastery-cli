class DiameterOfBinaryTreer {
	/**
	 * https://leetcode.com/problems/diameter-of-binary-tree/
	 * TIme O(N) | Space O(H)
	 * @param {TreeNode} root
	 * @return {number}
	 */
	solve(root, max = [0]) {
		const diameterOfTree = (root, max) => {
			const isBaseCase = root === null;
			if (isBaseCase) return 0;

			return dfs(root, max);
		};

		const dfs = (root, max) => {
			const left = diameterOfTree(root.left, max);
			const right = diameterOfTree(root.right, max);

			// TODO Calculate the diameter and the height of the tree., update max as
			return height + 1;
		};

		diameterOfTree(root, max);
		return max[0];
	}
}

module.exports = { Problem: DiameterOfBinaryTree };
