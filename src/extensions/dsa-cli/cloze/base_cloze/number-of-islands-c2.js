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

const dfs = (grid, row, rows, col, cols) => {
	const isBaseCase = grid[row][col] === '0';
	if (isBaseCase) return;

	grid[row][col] = '0';

	for (const [_row, _col] of getNeighbors(row, rows, col, cols)) {
		dfs(grid, _row, rows, _col, cols); /* Space O(ROWS * COLS) */
	}
};

class NumberOfIslands {
	/**
	 * https://leetcode.com/problems/number-of-islands/
	 * Time O(ROWS * COLS) | Space O(ROWS * COLS)
	 * @param {character[][]} grid
	 * @return {number}
	 */
	numIslands(grid, connectedComponents = 0) {
		const [rows, cols] = [grid.length, grid[0].length];

		// TODO Iterate over each of the rows and cols, and if it is an island, increment the connectedComponents and dfs to block other connected ndodes.

		return connectedComponents;
	}

	solve(grid) {
		return this.numIslands(grid);
	}
}

module.exports = { Problem: NumberOfIslands };
