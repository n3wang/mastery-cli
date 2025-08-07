class MaxAreaOfIsland {
	/**
	 * https://leetcode.com/problems/max-area-of-island
	 * Time O(ROWS * COLS) | Space O(ROWS * COLS)
	 * @param {number[][]} grid
	 * @return {number}
	 */
	maxAreaOfIsland = function (grid, maxArea = 0) {
		var getArea = (grid, row, rows, col, cols, seen) => {
			const isBaseCase = grid[row][col] === 0;
			if (isBaseCase) return 0;

			if (seen[row][col]) return 0;
			seen[row][col] = true; /* Space O(ROWS * COLS) */

			return (
				dfs(grid, row, rows, col, cols, seen) + 1
			); /* Space O(ROWS * COLS) */
		};

		const dfs = (grid, row, rows, col, cols, seen, area = 0) => {
			for (const [_row, _col] of getNeighbors(row, rows, col, cols)) {
				area += getArea(grid, _row, rows, _col, cols, seen);
			}

			return area;
		};

		var getNeighbors = (row, rows, col, cols) =>
			[
				[0, 1],
				[0, -1],
				[1, 0],
				[-1, 0]
			]
				.map(([_row, _col]) => [row + _row, col + _col])
				.filter(
					([_row, _col]) =>
						0 <= _row && _row < rows && 0 <= _col && _col < cols
				);

		const [rows, cols] = [grid.length, grid[0].length];
		const seen = new Array(rows).fill().map(() => new Array(cols));

		// TODO Iterate over each of the rows and cols, and get the area of each of the islands.
	};

	solve(grid) {
		return this.maxAreaOfIsland(grid);
	}
}

module.exports = { Problem: MaxAreaOfIsland };
