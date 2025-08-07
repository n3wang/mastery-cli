class MissingNumber {
	/**
	 * https://leetcode.com/problems/missing-number/
	 * Time O(N) | Space O(1)
	 * @param {number[]} nums
	 * @return {number}
	 */
	missingNumber = function (nums, missingNumber = nums.length) {
		for (let i = 0; i < nums.length; i++) {
			// TODO Perform the Xor operations to find the missing number.
		}

		return missingNumber;
	};

	solve(nums) {
		return this.missingNumber(nums);
	}
}

module.exports = { Problem: MissingNumber };
