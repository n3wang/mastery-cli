class TheMazeII {
	solve(maze, start, dest) {
		return this.shortestDistance(maze, start, dest);
	}
	shortestDistance(maze, start, dest) {
		const distance = new Array(maze.length)
			.fill(0)
			.map(() => new Array(maze[0].length).fill(Infinity));
		distance[start[0]][start[1]] = 0;
		const dirs = [
			[0, 1],
			[0, -1],
			[-1, 0],
			[1, 0]
		];

		const queue = new PriorityQueue((a, b) => a[2] - b[2]);
		queue.enqueue([start[0], start[1], 0]);

		while (!queue.isEmpty()) {
			const s = queue.dequeue();
			if (distance[s[0]][s[1]] < s[2]) {
				continue;
			}

			for (const dir of dirs) {
				let x = s[0] + dir[0];
				let y = s[1] + dir[1];
				let count = 0;

				while (
					x >= 0 &&
					y >= 0 &&
					x < maze.length &&
					y < maze[0].length &&
					maze[x][y] === 0
				) {
					x += dir[0];
					y += dir[1];
					count++;
				}

				if (
					distance[s[0]][s[1]] + count <
					distance[x - dir[0]][y - dir[1]]
				) {
					distance[x - dir[0]][y - dir[1]] =
						distance[s[0]][s[1]] + count;
					queue.enqueue([
						x - dir[0],
						y - dir[1],
						distance[x - dir[0]][y - dir[1]]
					]);
				}
			}
		}

		return distance[dest[0]][dest[1]] === Infinity
			? -1
			: distance[dest[0]][dest[1]];
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

module.exports = { Problem: TheMazeII };
