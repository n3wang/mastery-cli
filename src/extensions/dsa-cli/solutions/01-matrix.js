class Matrix01 {
	solve(matrix) {
		return updateMatrix(matrix);
	}
}
function updateMatrix(mat) {
	const m = mat.length;
	const n = mat[0].length;

	const dp = new Array(m).fill(null).map(() => new Array(n).fill(0));

	for (let row = 0; row < m; row++) {
		for (let col = 0; col < n; col++) {
			let minNeighbor = Infinity;

			if (mat[row][col] !== 0) {
				if (row > 0) {
					minNeighbor = Math.min(minNeighbor, dp[row - 1][col]);
				}
				if (col > 0) {
					minNeighbor = Math.min(minNeighbor, dp[row][col - 1]);
				}

				dp[row][col] = minNeighbor + 1;
			}
		}
	}

	for (let row = m - 1; row >= 0; row--) {
		for (let col = n - 1; col >= 0; col--) {
			let minNeighbor = Infinity;

			if (mat[row][col] !== 0) {
				if (row < m - 1) {
					minNeighbor = Math.min(minNeighbor, dp[row + 1][col]);
				}
				if (col < n - 1) {
					minNeighbor = Math.min(minNeighbor, dp[row][col + 1]);
				}

				dp[row][col] = Math.min(dp[row][col], minNeighbor + 1);
			}
		}
	}

	return dp;
}

module.exports = { Problem: Matrix01 };
