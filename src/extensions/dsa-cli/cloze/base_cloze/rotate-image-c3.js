class RotateImage {
	/**
	 * Time O(ROWS * COLS) | Space O(1)
	 * https://leetcode.com/problems/rotate-image/
	 * @param {number[][]} matrix
	 * @return {void} Do not return anything, modify matrix in-place instead.
	 */
	rotate = matrix => {
		var transpose = matrix => {
			const rows = matrix.length;

			for (let row = 0; row < rows; row++) {
				/* Time O(ROWS) */
				for (let col = row + 1; col < rows; col++) {
					/* Time O(COLS) */
					swap1(matrix, row, col);
				}
			}
		};

		var swap1 = (matrix, row, col) =>
			([matrix[row][col], matrix[col][row]] = [
				matrix[col][row],
				matrix[row][col]
			]);

		var reflect = matrix => {
			// TODO Create reflection which finds the reflection using the rows max minus the columns muved -1.
			// This should only happen if the column is less than the rows / 2.
		};

		var swap2 = (matrix, row, col, reflection) =>
			([matrix[row][col], matrix[row][reflection]] = [
				matrix[row][reflection],
				matrix[row][col]
			]);

		transpose(matrix); /* Time O(ROWS * COLS) */
		reflect(matrix); /* Time O(ROWS * COLS) */
	};

	solve(matrix) {
		return this.rotate(matrix);
	}
}

module.exports = { Problem: RotateImage };
