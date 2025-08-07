class ShortestPathWithAlternatingColors {
	solve(board) {
		if (!board || !board.length || !board[0].length) {
			return;
		}

		const ROWS = board.length;
		const COLS = board[0].length;

		// Step 1: Retrieve all border cells
		const borders = [];
		for (let r = 0; r < ROWS; r++) {
			borders.push([r, 0]);
			borders.push([r, COLS - 1]);
		}
		for (let c = 0; c < COLS; c++) {
			borders.push([0, c]);
			borders.push([ROWS - 1, c]);
		}

		// Step 2: Mark the "escaped" cells with 'E'
		const BFS = (row, col) => {
			const queue = [[row, col]];
			while (queue.length > 0) {
				const [r, c] = queue.shift();
				if (board[r][c] !== 'O') {
					continue;
				}
				// Mark this cell as escaped
				board[r][c] = 'E';
				// Check its neighbor cells
				if (c < COLS - 1) queue.push([r, c + 1]);
				if (r < ROWS - 1) queue.push([r + 1, c]);
				if (c > 0) queue.push([r, c - 1]);
				if (r > 0) queue.push([r - 1, c]);
			}
		};

		for (const [row, col] of borders) {
			BFS(row, col);
		}

		// Step 3: Flip the captured cells ('O'->'X') and the escaped one ('E'->'O')
		for (let r = 0; r < ROWS; r++) {
			for (let c = 0; c < COLS; c++) {
				if (board[r][c] === 'O') {
					board[r][c] = 'X'; // Captured
				} else if (board[r][c] === 'E') {
					board[r][c] = 'O'; // Escaped
				}
			}
		}
	}
}

module.exports = { Problem: ShortestPathWithAlternatingColors };
