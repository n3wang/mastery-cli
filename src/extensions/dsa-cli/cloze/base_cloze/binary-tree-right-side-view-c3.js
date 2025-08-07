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
					// TODO Unishift the node, and update prev. Also do your do dilligence with the right and left nodes.
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
