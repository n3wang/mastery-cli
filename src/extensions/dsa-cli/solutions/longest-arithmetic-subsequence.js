class LongestArithmeticSubsequence {
	solve(nums) {
		let maxLength = 0;
		const dp = new Array(nums.length);

		for (let right = 0; right < nums.length; ++right) {
			dp[right] = new Map();

			for (let left = 0; left < right; ++left) {
				const diff = nums[left] - nums[right];
				dp[right].set(diff, (dp[left].get(diff) || 1) + 1);
				maxLength = Math.max(maxLength, dp[right].get(diff));
			}
		}

		return maxLength;
	}
}

module.exports = { Problem: LongestArithmeticSubsequence };
