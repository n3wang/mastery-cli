class InvertTree {
	solve(root) {
		return this.invertTree(root);
	}

	/**
	 * https://leetcode.com/problems/invert-binary-tree/
	 * TIme O(N) | Space O(N)
	 * @param {TreeNode} root
	 * @return {TreeNode}
	 */
	invertTree(root) {
		const dfs = root => {
			const left = this.invertTree(root.left);
			const right = this.invertTree(root.right);

			root.left = right;
			root.right = left;

			return root;
		};

		const isBaseCase = root === null;
		if (isBaseCase) return root;

		return dfs(root);
	}

	/**
	 * https://leetcode.com/problems/invert-binary-tree/
	 * TIme O(N) | Space O(W)
	 * @param {TreeNode} root
	 * @return {TreeNode}
	 */
	invertTree_1 = root => {
		const bfs = queue => {
			while (queue.length) {
				for (let i = queue.length - 1; 0 <= i; i--) {
					const node = queue.shift();
					const left = node.right;
					const right = node.left;

					node.left = left;
					node.right = right;

					if (node.left) queue.push(node.left);
					if (node.right) queue.push(node.right);
				}
			}
		};

		const isBaseCase = root === null;
		if (isBaseCase) return root;

		bfs([root]);

		return root;
	};
}

module.exports = { Problem: InvertTree };
