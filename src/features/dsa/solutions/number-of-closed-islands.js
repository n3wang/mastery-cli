class NumberOfClosedIslands {
	solve(grid) {
		return closedIsland(grid);
	}
}

function closedIsland(grid) {
	const m = grid.length;
	const n = grid[0].length;
	const visit = new Array(m).fill(null).map(() => new Array(n).fill(false));
	let count = 0;

	function bfs(x, y) {
		const dirx = [0, 1, 0, -1];
		const diry = [-1, 0, 1, 0];
		const queue = [];
		queue.push([x, y]);
		visit[x][y] = true;
		let isClosed = true;

		while (queue.length > 0) {
			const temp = queue.shift();
			x = temp[0];
			y = temp[1];

			for (let i = 0; i < 4; i++) {
				const r = x + dirx[i];
				const c = y + diry[i];
				if (r < 0 || r >= m || c < 0 || c >= n) {
					// (x, y) is a boundary cell.
					isClosed = false;
				} else if (grid[r][c] === 0 && !visit[r][c]) {
					queue.push([r, c]);
					visit[r][c] = true;
				}
			}
		}

		return isClosed;
	}

	for (let i = 0; i < m; i++) {
		for (let j = 0; j < n; j++) {
			if (grid[i][j] === 0 && !visit[i][j] && bfs(i, j)) {
				count++;
			}
		}
	}
	return count;
}

module.exports = { Problem: NumberOfClosedIslands };
