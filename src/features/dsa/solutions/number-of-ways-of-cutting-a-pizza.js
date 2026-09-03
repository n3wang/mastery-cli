class NumberOfWaysOfCuttingAPizza {
	solve(pizza, k) {
		return ways(pizza, k);
	}
}

function ways(pizza, k) {
	const rows = pizza.length;
	const cols = pizza[0].length;
	const apples = new Array(rows + 1)
		.fill(0)
		.map(() => new Array(cols + 1).fill(0));
	const f = new Array(rows).fill(0).map(() => new Array(cols).fill(0));

	for (let row = rows - 1; row >= 0; row--) {
		for (let col = cols - 1; col >= 0; col--) {
			apples[row][col] =
				(pizza[row].charAt(col) === 'A' ? 1 : 0) +
				apples[row + 1][col] +
				apples[row][col + 1] -
				apples[row + 1][col + 1];
			f[row][col] = apples[row][col] > 0 ? 1 : 0;
		}
	}

	const mod = 1000000007;

	for (let remain = 1; remain < k; remain++) {
		const g = new Array(rows).fill(0).map(() => new Array(cols).fill(0));

		for (let row = 0; row < rows; row++) {
			for (let col = 0; col < cols; col++) {
				for (let nextRow = row + 1; nextRow < rows; nextRow++) {
					if (apples[row][col] - apples[nextRow][col] > 0) {
						g[row][col] += f[nextRow][col];
						g[row][col] %= mod;
					}
				}

				for (let nextCol = col + 1; nextCol < cols; nextCol++) {
					if (apples[row][col] - apples[row][nextCol] > 0) {
						g[row][col] += f[row][nextCol];
						g[row][col] %= mod;
					}
				}
			}
		}

		// Copy g to f
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				f[i][j] = g[i][j];
			}
		}
	}

	return f[0][0];
}

module.exports = { Problem: NumberOfWaysOfCuttingAPizza };
