const bfs = (queue, levels = []) => {
	while (queue.length) {
		const level = [];

		for (let i = queue.length - 1; 0 <= i; i--) {
			// TODO Complete the bfs function, which obtains the level order traversal.
		}

		levels.push(level.slice());
	}

	return levels;
};

class BinaryTreeLevel {
	/**
	 * https://leetcode.com/problems/binary-tree-level-order-traversal/
	 * Time O(N) | Space O(W)
	 * @param {TreeNode} root
	 * @return {number[][]}
	 */
	levelOrder = function (root) {
		const isBaseCase = root === null;
		if (isBaseCase) return [];

		return bfs([root]);
	};

	solve(root) {
		return this.levelOrder(root);
	}
}

module.exports = { Problem: BinaryTreeLevel };
