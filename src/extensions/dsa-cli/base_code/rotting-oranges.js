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
	orangesRotting = function (grid) {};

	solve(grid) {
		return this.orangesRotting(grid);
	}
}

module.exports = { Problem: RottingOranges };
