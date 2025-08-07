class MissingNumber {
	/**
	 * https://leetcode.com/problems/missing-number/
	 * Time O(N) | Space O(1)
	 * @param {number[]} nums
	 * @return {number}
	 */
	missingNumber = function (nums, missingNumber = nums.length) {
		// TODO Iterate through the nums array.

		const xor = i ^ nums[i];

		missingNumber ^= xor;
	};

	solve(nums) {
		return this.missingNumber(nums);
	}
}

module.exports = { Problem: MissingNumber };
