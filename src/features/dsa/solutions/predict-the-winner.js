class PredictTheWinner {
	solve(nums) {
		return predictTheWinner(nums);
	}
}

function predictTheWinner(nums) {
	const n = nums.length;
	let dp = [...nums];

	for (let diff = 1; diff < n; ++diff) {
		for (let left = 0; left < n - diff; ++left) {
			const right = left + diff;
			dp[left] = Math.max(
				nums[left] - dp[left + 1],
				nums[right] - dp[left]
			);
		}
	}

	return dp[0] >= 0;
}

module.exports = { Problem: PredictTheWinner };
