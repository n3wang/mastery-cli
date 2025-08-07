class SnakesAndLadders {
	solve(board) {
		const n = board.length;
		const cells = new Array(n * n + 1);
		let label = 1;
		const columns = Array.from({ length: n }, (_, i) => i);

		// Labeling each cell with the right [row, col]
		for (let row = n - 1; row >= 0; row--) {
			for (const column of columns) {
				cells[label] = [row, column];
				label += 1;
			}
			columns.reverse();
		}

		const dist = new Array(n * n + 1).fill(-1);
		const q = [1];
		dist[1] = 0;

		while (q.length > 0) {
			const curr = q.shift();
			for (let _n = curr + 1; _n <= Math.min(curr + 6, n * n); _n++) {
				const [r, c] = cells[_n];
				const dest = board[r][c] !== -1 ? board[r][c] : _n;

				// If not updated then update it, the sooner, the smaller the step, therefore first in.
				if (dist[dest] === -1) {
					dist[dest] = dist[curr] + 1;
					// push it, to explore
					q.push(dest);
				}
			}
		}

		return dist[n * n];
	}
}

module.exports = { Problem: SnakesAndLadders };
