class SolveSudoku {
	solve(board) {
		this.solveSudokuHelper(0, 0, board);
		// console.log("solving sudoku", board)
		return board;
	}

	solveSudokuHelper(row, col, board) {
		let currentRow = row;
		let currentCol = col;

		if (currentCol === board[currentRow].length) {
			currentRow++;
			currentCol = 0;
			if (currentRow === board.length) {
				return true;
			}
		}

		if (board[currentRow][currentCol] === 0) {
			return this.tryDigitsAtPosition(currentRow, currentCol, board);
		}

		return this.solveSudokuHelper(currentRow, currentCol + 1, board);
	}

	tryDigitsAtPosition(row, col, board) {
		for (let digit = 1; digit < 10; digit++) {
			if (this.isValidAtPosition(digit, row, col, board)) {
				board[row][col] = digit;
				if (this.solveSudokuHelper(row, col + 1, board)) {
					return true;
				}
			}
		}
		board[row][col] = 0;
		return false;
	}

	isValidAtPosition(value, row, col, board) {
		const rowIsValid = !board[row].includes(value);
		const colIsValid = !board.map(r => r[col]).includes(value);

		if (!rowIsValid || !colIsValid) return false;

		const subgridRowStart = Math.floor(row / 3) * 3;
		const subgridColStart = Math.floor(col / 3) * 3;
		for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
			for (let colIdx = 0; colIdx < 3; colIdx++) {
				const rowToCheck = subgridRowStart + rowIdx;
				const colToCheck = subgridColStart + colIdx;
				const existingValue = board[rowToCheck][colToCheck];

				if (existingValue === value) return false;
			}
		}
		return true;
	}
}

module.exports = { Problem: SolveSudoku };
