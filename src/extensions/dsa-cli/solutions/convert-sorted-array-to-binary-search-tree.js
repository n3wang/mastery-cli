class SortedArrayToBST {
	constructor() {
		this.nums = [];
	}

	helper(left, right) {
		if (left > right) return null;

		// Always choose the right middle node as the root
		let p = Math.floor((left + right) / 2);
		if ((left + right) % 2 === 1) p++;

		// Preorder traversal: node -> left -> right
		const root = new TreeNode(this.nums[p]);
		root.left = this.helper(left, p - 1);
		root.right = this.helper(p + 1, right);
		return root;
	}

	solve(nums) {
		this.nums = nums;
		return this.helper(0, nums.length - 1);
	}
}

function TreeNode(val) {
	this.val = val;
	this.left = null;
	this.right = null;
}

module.exports = { Problem: SortedArrayToBST, TreeNode };
