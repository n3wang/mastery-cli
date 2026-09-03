class MaximumSubarrays {
	/**
	 * https://leetcode.com/problems/maximum-subarray/
	 * Time O(N) | Space O(1)
	 * @param {number[]} nums
	 * @return {number}
	 */
	maxSubArray = function (nums) {
		let [runningSum, maxSum] = [nums[0], nums[0]];

		for (let i = 1; i < nums.length; i++) {
			const num = nums[i];
			const sum = runningSum + num;

			// TODO Calulcate the running Sum and the maximum sum.
		}

		// TODO Return the maximum sum.
	};

	solve(nums) {
		return this.maxSubArray(nums);
	}
}

module.exports = { Problem: MaximumSubarrays };
