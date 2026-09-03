class MaximalSquare {
	solve(matrix) {
		const rows = matrix.length;
		const cols = rows > 0 ? matrix[0].length : 0;
		const dp = new Array(cols + 1).fill(0);
		let maxSqlen = 0;
		let prev = 0;

		for (let i = 1; i <= rows; i++) {
			for (let j = 1; j <= cols; j++) {
				const temp = dp[j];
				if (matrix[i - 1][j - 1] === '1') {
					dp[j] = Math.min(Math.min(dp[j - 1], prev), dp[j]) + 1;
					maxSqlen = Math.max(maxSqlen, dp[j]);
				} else {
					dp[j] = 0;
				}
				prev = temp;
			}
		}

		return maxSqlen * maxSqlen;
	}
}

module.exports = { Problem: MaximalSquare };
