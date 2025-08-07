class TheMazeIII {
	constructor() {
		this.directions = [
			[0, -1],
			[-1, 0],
			[0, 1],
			[1, 0]
		];
		this.textDirections = ['l', 'u', 'r', 'd'];
		this.m = 0;
		this.n = 0;
	}

	solve(maze, start, dest) {
		return this.findShortestWay(maze, start, dest);
	}

	findShortestWay(maze, ball, hole) {
		this.m = maze.length;
		this.n = maze[0].length;

		const heap = new PriorityQueue((a, b) => {
			const distA = a.dist;
			const distB = b.dist;

			if (distA === distB) {
				return a.path.localeCompare(b.path);
			}

			return distA - distB;
		});

		const seen = new Array(this.m)
			.fill(null)
			.map(() => new Array(this.n).fill(false));
		heap.enqueue(new State(ball[0], ball[1], 0, ''));

		while (!heap.isEmpty()) {
			const curr = heap.dequeue();
			const row = curr.row;
			const col = curr.col;

			if (seen[row][col]) {
				continue;
			}

			if (row === hole[0] && col === hole[1]) {
				return curr.path;
			}

			seen[row][col] = true;

			for (const nextState of this.getNeighbors(row, col, maze, hole)) {
				const nextRow = nextState.row;
				const nextCol = nextState.col;
				const nextDist = nextState.dist;
				const nextChar = nextState.path;
				heap.enqueue(
					new State(
						nextRow,
						nextCol,
						curr.dist + nextDist,
						curr.path + nextChar
					)
				);
			}
		}

		return 'impossible';
	}

	valid(row, col, maze) {
		if (row < 0 || row >= this.m || col < 0 || col >= this.n) {
			return false;
		}

		return maze[row][col] === 0;
	}

	getNeighbors(row, col, maze, hole) {
		const neighbors = [];

		for (let i = 0; i < 4; i++) {
			const dy = this.directions[i][0];
			const dx = this.directions[i][1];
			const direction = this.textDirections[i];

			let currRow = row;
			let currCol = col;
			let dist = 0;

			while (this.valid(currRow + dy, currCol + dx, maze)) {
				currRow += dy;
				currCol += dx;
				dist++;
				if (currRow === hole[0] && currCol === hole[1]) {
					break;
				}
			}

			neighbors.push(new State(currRow, currCol, dist, direction));
		}

		return neighbors;
	}
}

class State {
	constructor(row, col, dist, path) {
		this.row = row;
		this.col = col;
		this.dist = dist;
		this.path = path;
	}
}

class PriorityQueue {
	constructor(compare) {
		this.elements = [];
		this.compare = compare;
	}

	enqueue(element) {
		this.elements.push(element);
		this.elements.sort(this.compare);
	}

	dequeue() {
		if (!this.isEmpty()) {
			return this.elements.shift();
		}
		return null;
	}

	isEmpty() {
		return this.elements.length === 0;
	}
}

// Example usage:
// const solution = new Solution();
// const maze = [
//     [0, 0, 0, 0, 0],
//     [0, 0, 1, 0, 0],
//     [0, 0, 0, 0, 0],
//     [0, 1, 0, 1, 0],
//     [0, 0, 0, 0, 0]
// ];
// const ball = [4, 3];
// const hole = [0, 1];
// const result = solution.findShortestWay(maze, ball, hole);
// console.log(result); // Output: "lul"

module.exports = { Problem: TheMazeIII };
