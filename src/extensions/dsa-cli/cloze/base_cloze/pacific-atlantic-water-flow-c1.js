class PacificAtlantic {
	pacificAtlantic = function (heights) {
		var search = heights => {
			const [rows, cols] = [heights.length, heights[0].length];

			// TODO Searches  using a copy of false and false get Matrix rows. .

			// TODO Search the rows and cols.

			return [pacificReachable, atlanticReachable];
		};

		var getMatrix = (rows, cols) =>
			new Array(rows)
				.fill() /* Time O(ROWS * COLS) | Space O(ROWS * COLS) */
				.map(() => new Array(cols).fill(false));

		var searchRows = (
			heights,
			rows,
			cols,
			pacificReachable,
			atlanticReachable
		) => {
			for (let row = 0; row < rows; row++) {
				/* Time O(ROWS) */

				const [pacificStart, atlanticStart] = [0, cols - 1];

				dfs(
					row,
					pacificStart,
					rows,
					cols,
					pacificReachable,
					heights
				); /* Space O(ROWS * COLS) */
				dfs(
					row,
					atlanticStart,
					rows,
					cols,
					atlanticReachable,
					heights
				); /* Space O(ROWS * COLS) */
			}
		};

		var searchCols = (
			heights,
			rows,
			cols,
			pacificReachable,
			atlanticReachable
		) => {
			for (let col = 0; col < cols; col++) {
				/* Time O(COLS) */
				const [pacificStart, atlanticStart] = [0, rows - 1];

				dfs(
					pacificStart,
					col,
					rows,
					cols,
					pacificReachable,
					heights
				); /* Space O(ROWS * COLS) */
				dfs(
					atlanticStart,
					col,
					rows,
					cols,
					atlanticReachable,
					heights
				); /* Space O(ROWS * COLS) */
			}
		};

		const dfs = (row, col, rows, cols, isReachable, heights) => {
			isReachable[row][col] = true;

			for (const [_row, _col] of getNeighbors(row, rows, col, cols)) {
				if (isReachable[_row][_col]) continue;

				const isLower = heights[_row][_col] < heights[row][col];
				if (isLower) continue;

				dfs(
					_row,
					_col,
					rows,
					cols,
					isReachable,
					heights
				); /* Space O(ROWS * COLS) */
			}
		};

		var searchGrid = (
			heights,
			pacificReachable,
			atlanticReachable,
			intersection = []
		) => {
			const [rows, cols] = [heights.length, heights[0].length];

			for (let row = 0; row < rows; row++) {
				/* Time O(ROWS) */
				for (let col = 0; col < cols; col++) {
					/* Time O(COLS) */
					const isReachable =
						pacificReachable[row][col] &&
						atlanticReachable[row][col];
					if (!isReachable) continue;

					intersection.push([row, col]); /* Space O(ROWS * COLS) */
				}
			}

			return intersection;
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

		const [pacificReachable, atlanticReachable] =
			search(heights); /* Time O(ROWS * COLS) | Space O(ROWS * COLS) */

		return searchGrid(
			heights,
			pacificReachable,
			atlanticReachable
		); /* Time O(ROWS * COLS) | Space O(ROWS * COLS) */
	};

	solve(heights) {
		return this.pacificAtlantic(heights);
	}
}

module.exports = { Problem: PacificAtlantic };
