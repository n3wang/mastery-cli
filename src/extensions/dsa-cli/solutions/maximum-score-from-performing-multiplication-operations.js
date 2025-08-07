class MaximumScoreFromPerformingMultiplication {
	solve(nums, multipliers) {
		const m = multipliers.length;
		const n = nums.length;

		const dp = new Array(m + 1).fill(0);

		for (let op = m - 1; op >= 0; op--) {
			for (let left = 0; left <= op; left++) {
				dp[left] = Math.max(
					multipliers[op] * nums[left] + dp[left + 1],
					multipliers[op] * nums[n - 1 - (op - left)] + dp[left]
				);
			}
		}

		return dp[0];
	}
}

module.exports = { Problem: MaximumScoreFromPerformingMultiplication };
