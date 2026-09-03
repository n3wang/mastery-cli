/**
 * Greedy - product
 * Time O(N) | Space O(1)
 * https://leetcode.com/problems/maximum-product-subarray/
 * @param {number[]} nums
 * @return {number}
 */
maxProduct = nums => {
	const isEmpty = nums.length === 0;
	if (isEmpty) return 0;

	return greedySearch(nums); /* Time O(N) */
};

const greedySearch = nums => {
	let min = (max = product = nums[0]);

	for (let num = 1; num < nums.length; num++) {
		/* Time O(N) */
		// TODO Min and max the product of the current number and the previous min and max.
		// We keep track of the minimum since we might need it for a negative case.
	}

	// TODO Return Product
};

class MaxProductSubArray {
	solve(nums) {
		return maxProduct(nums);
	}
}

module.exports = { Problem: MaxProductSubArray };
