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
			// TODO shift the queue and by each next step,
			// TODO If it is board[r][c] == -1 then we know that has the destination should be that.
			// If not updated then update it, the sooner, the smaller the step, therefore first in.
			// push it, to explore
		}

		return dist[n * n];
	}
}

module.exports = { Problem: SnakesAndLadders };
