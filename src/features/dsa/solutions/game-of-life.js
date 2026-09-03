class GameOfLife {
	solve(board) {
		this.board = board;
		this.neighbors = [
			[-1, -1],
			[-1, 0],
			[-1, 1],
			[0, -1],
			[0, 1],
			[1, -1],
			[1, 0],
			[1, 1]
		];
		const rows = this.board.length;
		const cols = this.board[0].length;

		const getNeighbors = (row, col) => {
			let countNeighbors = 0;
			for (const [dr, dc] of this.neighbors) {
				const r = row + dr;
				const c = col + dc;

				if (
					r >= 0 &&
					r < rows &&
					c >= 0 &&
					c < cols &&
					(this.board[r][c] === 1 || this.board[r][c] === -1)
				) {
					countNeighbors++;
				}
			}
			return countNeighbors;
		};

		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				const neighbor = getNeighbors(r, c);
				if (neighbor < 2 || neighbor > 3) {
					if (this.board[r][c] === 1) {
						this.board[r][c] = -1; // Mark for deletion
					}
				} else if (neighbor === 3 && this.board[r][c] === 0) {
					this.board[r][c] = 2; // Mark as new live cell
				}
			}
		}

		// Update the board based on the marked cells
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				if (this.board[r][c] === -1) {
					this.board[r][c] = 0; // Set as dead
				} else if (this.board[r][c] === 2) {
					this.board[r][c] = 1; // Set as live
				}
			}
		}
	}
}

module.exports = { Problem: GameOfLife };
