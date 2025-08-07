class PerfectSquares {
	solve(n) {
		const dp = new Array(n + 1).fill(Infinity);
		dp[0] = 0;

		const squares = [];
		for (let i = 1; i * i <= n; ++i) {
			squares.push(i * i);
		}

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

module.exports = { Problem: PerfectSquares };
