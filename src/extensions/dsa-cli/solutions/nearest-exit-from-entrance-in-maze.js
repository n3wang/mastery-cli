class RearestExitFromEntranceInMaze {
	solve(maze, entrance) {
		const rows = maze.length;
		const cols = maze[0].length;
		const dirs = [
			[1, 0],
			[-1, 0],
			[0, 1],
			[0, -1]
		];

		// Mark the entrance as visited since it's not an exit.
		const [startRow, startCol] = entrance;
		maze[startRow][startCol] = '+';

		// Start BFS from the entrance using a queue to store cells to be visited.
		const queue = [[startRow, startCol, 0]];

		while (queue.length > 0) {
			const [currRow, currCol, currDistance] = queue.shift();

			// Check the four neighbor cells of the current cell.
			for (const [dx, dy] of dirs) {
				const nextRow = currRow + dx;
				const nextCol = currCol + dy;

				// If there's an unvisited empty neighbor:
				if (
					0 <= nextRow &&
					nextRow < rows &&
					0 <= nextCol &&
					nextCol < cols &&
					maze[nextRow][nextCol] === '.'
				) {
					// If this empty cell is an exit, return distance + 1.
					if (
						nextRow === 0 ||
						nextRow === rows - 1 ||
						nextCol === 0 ||
						nextCol === cols - 1
					) {
						return currDistance + 1;
					}

					// Otherwise, add this cell to the queue and mark it as visited.
					maze[nextRow][nextCol] = '+';
					queue.push([nextRow, nextCol, currDistance + 1]);
				}
			}
		}

		// If we finish iterating without finding an exit, return -1.
		return -1;
	}
}

module.exports = { Problem: RearestExitFromEntranceInMaze };
