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
			// TODO Complete the dfs function which should get the neighbors and call the getArea function for each of them.

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

		for (let row = 0; row < rows; row++) {
			/* Time O(ROWS) */
			for (let col = 0; col < cols; col++) {
				/* Time O(COLS) */
				const area = getArea(
					grid,
					row,
					rows,
					col,
					cols,
					seen
				); /* Space O(ROWS * COLS) */

				maxArea = Math.max(maxArea, area);
			}
		}

		return maxArea;
	};

	solve(grid) {
		return this.maxAreaOfIsland(grid);
	}
}

module.exports = { Problem: MaxAreaOfIsland };
