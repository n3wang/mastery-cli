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
			const isGood = max <= root.val;
			if (isGood) total[0]++;

			max = Math.max(max, root.val);

			count(root.left, max, total);
			count(root.right, max, total);
		};

		count(root, max, total);

		return total[0];
	}

	solve(root) {
		return this.goodNodes(root);
	}
}

module.exports = { Problem: CountGoodNodesInBinaryTree };
