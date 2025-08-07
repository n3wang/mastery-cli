class MaximumProductOfSplittedBinaryTree {
	solve(root) {
		const treeSum = subroot => {
			if (subroot === null) return 0;
			const leftSum = treeSum(subroot.left);
			const rightSum = treeSum(subroot.right);
			return leftSum + rightSum + subroot.val;
		};

		const maximumProduct = (subroot, total) => {
			let best = 0;

			const recursiveHelper = subroot => {
				if (subroot === null) return 0;
				const leftSum = recursiveHelper(subroot.left);
				const rightSum = recursiveHelper(subroot.right);
				const totalSum = leftSum + rightSum + subroot.val;
				const product = totalSum * (total - totalSum);
				best = Math.max(best, product);
				return totalSum;
			};

			recursiveHelper(subroot);
			return best;
		};

		const treeTotalSum = treeSum(root);
		return maximumProduct(root, treeTotalSum) % (10 ** 9 + 7);
	}
}

class TreeNode {
	constructor(val) {
		this.val = val;
		this.left = this.right = null;
	}
}

module.exports = { Problem: MaximumProductOfSplittedBinaryTree };
