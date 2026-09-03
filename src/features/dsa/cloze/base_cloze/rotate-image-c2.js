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

		// TODO Create the swap1 function. Which performs the transpose by switching their cols and rows.

		var reflect = matrix => {
			const rows = matrix.length;

			for (let row = 0; row < rows; row++) {
				/* Time O(ROWS) */
				for (let col = 0; col < rows / 2; col++) {
					/* Time O(COLS) */
					const reflection = rows - col - 1;

					swap2(matrix, row, col, reflection);
				}
			}
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
