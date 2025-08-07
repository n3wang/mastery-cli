class BuildTreeFromInPost {
	constructor() {
		this.post_idx = 0;
		this.postorder = [];
		this.inorder = [];
		this.idx_map = new Map();
	}

	helper(in_left, in_right) {
		// If there are no elements to construct subtrees
		if (in_left > in_right) return null;

		// Pick up post_idx element as a root
		const root_val = this.postorder[this.post_idx];
		const root = new TreeNode(root_val);

		// Root splits inorder list into left and right subtrees
		const index = this.idx_map.get(root_val);

		// Recursion
		this.post_idx--;
		// Build right subtree
		root.right = this.helper(index + 1, in_right);
		// Build left subtree
		root.left = this.helper(in_left, index - 1);
		return root;
	}

	buildTree(inorder, postorder) {
		this.postorder = postorder;
		this.inorder = inorder;
		// Start from the last postorder element
		this.post_idx = postorder.length - 1;

		// Build a hashmap value -> its index
		let idx = 0;
		for (const val of inorder) this.idx_map.set(val, idx++);
		return this.helper(0, inorder.length - 1);
	}
}

function TreeNode(val) {
	this.val = val;
	this.left = null;
	this.right = null;
}

module.exports = { Problem: BuildTreeFromInPost, TreeNode };
