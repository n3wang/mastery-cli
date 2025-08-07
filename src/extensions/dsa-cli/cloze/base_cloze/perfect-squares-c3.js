class PerfectSquaresC1 {
	solve(n) {
		const dp = new Array(n + 1).fill(Infinity);
		dp[0] = 0;

		const squares = [];
		for (let i = 1; i * i <= n; ++i) {
			squares.push(i * i);
		}

		// TODO Loop Each number from 1 to n
		for (;;) {
			for (const square of squares) {
				if (i < square) {
					break;
				}
				dp[i] = Math.min(dp[i], dp[i - square] + 1);
			}
		}

		// TODO Return the last element of the dp array
	}
}

module.exports = { Problem: PerfectSquaresC1 };
