class PerfectSquaresC1 {
	solve(n) {
		const dp = new Array(n + 1).fill(Infinity);
		dp[0] = 0;

		const squares = [];
		for (let i = 1; i * i <= n; ++i) {
			squares.push(i * i);
		}

		for (let i = 1; i <= n; ++i) {
			// TODO Loop for each square until the larger one is found, so is bad.
			// Readapt the smallest square at that point as either itself or The count of mvoements previously + 1
		}

		return dp[n];
	}
}

module.exports = { Problem: PerfectSquaresC1 };
