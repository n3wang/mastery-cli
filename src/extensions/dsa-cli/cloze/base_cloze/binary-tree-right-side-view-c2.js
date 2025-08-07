class BinaryTreeRightSideView {
	/**
	 * https://leetcode.com/problems/binary-tree-right-side-view/
	 * Time O(N) | Space O(W)
	 * @param {TreeNode} root
	 * @return {number[]}
	 */
	rightSideView = function (root) {
		const bfs = (queue, rightSide = []) => {
			// TODO Use the correct control.
			while (true) {
				let prev = null;

				// TODO Create the for loop. Important where You start!
				for (;;) {
					const node = queue.shift();

					prev = node;

					if (node.left) queue.push(node.left);
					if (node.right) queue.push(node.right);
				}

				// TODO Add the last previous value
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
