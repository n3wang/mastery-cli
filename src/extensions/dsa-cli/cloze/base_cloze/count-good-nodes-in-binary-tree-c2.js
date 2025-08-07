class CountGoodNodesInBinaryTree {
	/**
	 * https://leetcode.com/problems/count-good-nodes-in-binary-tree/
	 * Time O(N) | Space O(H)
	 * @param {TreeNode} root
	 * @return {number}
	 */
	goodNodes(root, max = -Infinity, total = [0]) {
		const count = (root, max, total) => {
			const isBaseCase = root === null;
			if (isBaseCase) return 0;

			return dfs(root, max, total);
		};

		const dfs = (root, max, total) => {
			// TODO Complete the is good checkings, update the max appropriatelly as well.
		};

		count(root, max, total);

		return total[0];
	}

	solve(root) {
		return this.goodNodes(root);
	}
}

module.exports = { Problem: CountGoodNodesInBinaryTree };
