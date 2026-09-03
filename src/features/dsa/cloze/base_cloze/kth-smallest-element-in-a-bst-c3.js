class KthSmallestElementInABST {
	/**
	 * https://leetcode.com/problems/kth-smallest-element-in-a-bst/
	 * Time O(N + K) | Space O(H)
	 * @param {TreeNode} root
	 * @param {number} k
	 * @return {number}
	 */
	kthSmallest(root, k) {
		const stack = [];

		while (true) {
			while (root !== null) {
				stack.push(root);
				root = root.left;
			}
			root = stack.pop();
			if (--k === 0) return root.val;
			// TODO Perform Inorder pushes from the right
		}
	}

	solve(root, k) {
		return this.kthSmallest(root, k);
	}
}

module.exports = { Problem: KthSmallestElementInABST };
