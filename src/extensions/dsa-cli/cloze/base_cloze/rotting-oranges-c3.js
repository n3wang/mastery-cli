class Queue {
	constructor() {
		this.queue = [];
	}

	enqueue(element) {
		this.queue.push(element);
	}

	dequeue() {
		return this.queue.shift();
	}

	front() {
		return this.queue[0];
	}

	size() {
		return this.queue.length;
	}

	isEmpty() {
		return this.size() === 0;
	}
}

class RottingOranges {
	/**
	 * https://leetcode.com/problems/rotting-oranges/
	 * Time O(ROWS * COLS) | Space O(ROWS * COLS)
	 * @param {number[][]} grid
	 * @return {number}
	 */
	orangesRotting = function (grid) {
		const searchGrid = (grid, orangeCount = 0, queue = new Queue([])) => {
			const [rows, cols] = [grid.length, grid[0].length];

			// TODO Searches the grid for oranges and rotten oranges, Returning the queue of rotten oranges to explore

			return { queue, orangeCount };
		};

		const bfs = (grid, queue, rottenCount = 0, minutes = 0) => {
			while (!queue.isEmpty()) {
				rottenCount += queue.size();

				for (let i = queue.size() - 1; 0 <= i; i--) {
					/* Time O(WIDTH) */
					expireFresh(grid, queue);
				}

				if (queue.size()) minutes++;
			}

			return { rottenCount, minutes };
		};

		var expireFresh = (grid, queue) => {
			const [rows, cols] = [grid.length, grid[0].length];
			const [row, col] = queue.dequeue();

			for (const [_row, _col] of getNeighbors(row, rows, col, cols)) {
				const isFresh = grid[_row][_col] === 1;
				if (!isFresh) continue;

				grid[_row][_col] = 2;
				queue.enqueue([_row, _col]); /* Space O(ROWS * COLS) */
			}
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

		const { queue, orangeCount } =
			searchGrid(grid); /* Time O(ROWS * COLS) */
		const { rottenCount, minutes } = bfs(grid, queue);

		const isEqual = orangeCount === rottenCount;
		return isEqual ? minutes : -1;
	};

	solve(grid) {
		return this.orangesRotting(grid);
	}
}

module.exports = { Problem: RottingOranges };
