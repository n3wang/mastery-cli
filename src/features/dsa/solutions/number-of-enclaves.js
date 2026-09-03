class NumberOfEnclaves {
	solve(grid) {
		return numEnclaves(grid);
	}
}

function numEnclaves(grid) {
	const m = grid.length;
	const n = grid[0].length;
	const visit = new Array(m).fill(null).map(() => new Array(n).fill(false));

	function bfs(x, y) {
		const dirx = [0, 1, 0, -1];
		const diry = [-1, 0, 1, 0];
		const queue = [];
		queue.push([x, y]);
		visit[x][y] = true;

		while (queue.length > 0) {
			const temp = queue.shift();
			x = temp[0]; // row number
			y = temp[1]; // column number

			for (let i = 0; i < 4; i++) {
				const r = x + dirx[i];
				const c = y + diry[i];
				if (r < 0 || r >= m || c < 0 || c >= n) {
					continue;
				} else if (grid[r][c] === 1 && !visit[r][c]) {
					queue.push([r, c]);
					visit[r][c] = true;
				}
			}
		}
	}

	for (let i = 0; i < m; ++i) {
		// First column.
		if (grid[i][0] === 1 && !visit[i][0]) {
			bfs(i, 0);
		}
		// Last column.
		if (grid[i][n - 1] === 1 && !visit[i][n - 1]) {
			bfs(i, n - 1);
		}
	}

	for (let i = 0; i < n; ++i) {
		// First row.
		if (grid[0][i] === 1 && !visit[0][i]) {
			bfs(0, i);
		}
		// Last row.
		if (grid[m - 1][i] === 1 && !visit[m - 1][i]) {
			bfs(m - 1, i);
		}
	}

	let count = 0;
	for (let i = 0; i < m; i++) {
		for (let j = 0; j < n; j++) {
			if (grid[i][j] === 1 && !visit[i][j]) {
				count++;
			}
		}
	}
	return count;
}

module.exports = { Problem: NumberOfEnclaves };
