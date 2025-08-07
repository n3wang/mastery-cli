class PerfectSquaresC1 {
	solve(n) {
		const dp = new Array(n + 1).fill(Infinity);
		dp[0] = 0;

		// TODO Precaluclate squares using target n as the upper boundary

		for (let i = 1; i <= n; ++i) {
			for (const square of squares) {
				if (i < square) {
					break;
				}
				dp[i] = Math.min(dp[i], dp[i - square] + 1);
			}
		}

		return dp[n];
	}
}

module.exports = { Problem: PerfectSquaresC1 };
