class PacificAtlantic {
	pacificAtlantic = function (heights) {
		var search = heights => {
			const [rows, cols] = [heights.length, heights[0].length];
			const [pacificReachable, atlanticReachable] = [
				getMatrix(rows, cols),
				getMatrix(rows, cols)
			]; /* Time O(ROWS * COLS) | Space O(ROWS * COLS) */

			searchRows(
				heights,
				rows,
				cols,
				pacificReachable,
				atlanticReachable
			);
			searchCols(
				heights,
				rows,
				cols,
				pacificReachable,
				atlanticReachable
			);

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
			// TODO Set as the current node as reachable
			// TODO Iterate over each of the neighbors, if it had been already reach, then skip it
			// TODO Otherwise, check if the neighbor is lower than the current node, if it is, then skip it (Because we want to move up.)
			// TODO Otherwise, call dfs on the neighbor
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
