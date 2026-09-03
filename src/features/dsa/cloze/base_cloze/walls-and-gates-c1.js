class WallsAndGates {
	/**
	 * https://leetcode.com/problems/walls-and-gates/
	 * Time O(ROWS * COLS) | Space O(ROWS * COLS)
	 * @param {number[][]} rooms
	 * @return {void} Do not return anything, modify rooms in-place instead.
	 */
	wallsAndGates = function (rooms) {
		const dfs = (rooms, row, col) => {
			const [rows, cols] = [rooms.length, rooms[0].length];

			// TODO Loop at each neighbor (starting from the gates)
			// TODO If the previous distance is greater than the current distance, then update the distance and dfs.
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
						0 <= _row && 0 <= _col && _row < rows && _col < cols
				);

		const [rows, cols] = [rooms.length, rooms[0].length];

		for (let row = 0; row < rows; row++) {
			for (let col = 0; col < cols; col++) {
				const isGate = rooms[row][col] === 0;
				if (!isGate) continue;

				dfs(rooms, row, col);
			}
		}
	};

	solve(rooms) {
		return this.wallsAndGates(rooms);
	}
}

module.exports = { Problem: WallsAndGates };
