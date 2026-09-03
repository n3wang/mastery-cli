const bfs = (queue, levels = []) => {
	while (queue.length) {
		const level = [];

		for (let i = queue.length - 1; 0 <= i; i--) {
			const node = queue.shift();

			if (node.left) queue.push(node.left);
			if (node.right) queue.push(node.right);

			level.push(node.val);
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
