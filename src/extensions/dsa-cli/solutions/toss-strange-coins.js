class TossStrangeCoins {
	solve(prob, target) {
		return probabilityOfHeads(prob, target);
	}
}

function probabilityOfHeads(prob, target) {
	const n = prob.length;
	const dp = new Array(target + 1).fill(0);
	dp[0] = 1;

	for (let i = 1; i <= n; i++) {
		for (let j = target; j > 0; j--) {
			dp[j] = dp[j - 1] * prob[i - 1] + dp[j] * (1 - prob[i - 1]);
		}
		dp[0] = dp[0] * (1 - prob[i - 1]);
	}

	return dp[target];
}

module.exports = { Problem: TossStrangeCoins };
