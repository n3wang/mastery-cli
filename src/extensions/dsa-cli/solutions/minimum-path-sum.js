class MinimumPathSum {
	solve(grid) {
		const rows = grid.length;
		const cols = grid[0].length;

		for (let i = rows - 1; i >= 0; i--) {
			for (let j = cols - 1; j >= 0; j--) {
				if (i === rows - 1 && j !== cols - 1) {
					grid[i][j] += grid[i][j + 1];
				} else if (j === cols - 1 && i !== rows - 1) {
					grid[i][j] += grid[i + 1][j];
				} else if (j !== cols - 1 && i !== rows - 1) {
					grid[i][j] += Math.min(grid[i + 1][j], grid[i][j + 1]);
				}
			}
		}
		return grid[0][0];
	}
}

module.exports = { Problem: MinimumPathSum };
