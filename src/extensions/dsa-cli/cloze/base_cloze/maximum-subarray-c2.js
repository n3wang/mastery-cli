class MaximumSubarrays {
	/**
	 * https://leetcode.com/problems/maximum-subarray/
	 * Time O(N) | Space O(1)
	 * @param {number[]} nums
	 * @return {number}
	 */
	maxSubArray = function (nums) {
		// TODO Declare Running Sum and Max Sum variables

		// TODO Iterate through the array

		runningSum = Math.max(num, sum);
		maxSum = Math.max(maxSum, runningSum);

		return maxSum;
	};

	solve(nums) {
		return this.maxSubArray(nums);
	}
}

module.exports = { Problem: MaximumSubarrays };
