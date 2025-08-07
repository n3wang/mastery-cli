class TreeNode {
	constructor(val, left = null, right = null) {
		this.val = val;
		this.left = left;
		this.right = right;
	}
}

class ConstructBinaryFromPreorderAndInorder {
	/**
	 * https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
	 * Time O(N^2) | Space(H)
	 * @param {number[]} preorder
	 * @param {number[]} inorder
	 * @return {TreeNode}
	 */
	buildTree(preorder, inorder) {
		if (preorder?.length === 1 && inorder?.length === 1) {
			return new TreeNode(preorder[0]);
		}

		const dfs = (preorder, inorder) => {
			const { leftInorder, mid, rightInorder } = getPointers(
				preorder,
				inorder
			);
			const root = new TreeNode(inorder[mid]);

			root.left = this.buildTree(preorder, leftInorder);
			root.right = this.buildTree(preorder, rightInorder);

			return root;
		};

		const getPointers = (preorder, inorder) => {
			// TODO Complete the getPointers function, which obtains the pointers for the left and right inorder.

			return { leftInorder, mid, rightInorder };
		};

		if (preorder == null || inorder == null) return null;

		if (preorder?.length === 0 || inorder?.length === 0) {
			return null;
		}

		return dfs(preorder, inorder);
	}

	solve(preoreder, inorder) {
		return this.buildTree(preoreder, inorder);
	}
}

module.exports = { Problem: ConstructBinaryFromPreorderAndInorder };
