class BinaryTreeRightSideView {
	/**
	 * https://leetcode.com/problems/binary-tree-right-side-view/
	 * Time O(N) | Space O(W)
	 * @param {TreeNode} root
	 * @return {number[]}
	 */
	rightSideView = function (root) {
		const bfs = (queue, rightSide = []) => {
			while (queue.length) {
				let prev = null;

				for (let i = queue.length - 1; 0 <= i; i--) {
					const node = queue.shift();

					prev = node;

					if (node.left) queue.push(node.left);
					if (node.right) queue.push(node.right);
				}

				rightSide.push(prev.val);
			}

			return rightSide;
		};
		const isBaseCase = root === null;
		if (isBaseCase) return [];

		return bfs([root]);
	};

	solve(root) {
		return this.rightSideView(root);
	}
}

module.exports = { Problem: BinaryTreeRightSideView };
