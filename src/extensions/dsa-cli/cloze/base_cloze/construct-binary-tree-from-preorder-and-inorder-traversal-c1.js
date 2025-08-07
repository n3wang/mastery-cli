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
			// TODO using getPointer, build the tree down
		};

		const getPointers = (preorder, inorder) => {
			const next = preorder.shift();
			const mid = inorder.indexOf(next);
			const leftInorder = inorder.slice(0, mid);
			const rightInorder = inorder.slice(mid + 1);

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
