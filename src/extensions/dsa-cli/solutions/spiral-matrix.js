class SpiralOrder {
	/**
	 * Matrix - Spiral Traversal Pre Update
	 * Array - Ignore Auxilary Space O(ROWS * COLS)
	 * Time O(ROWS * COLS) | Space O(1)
	 * https://leetcode.com/problems/spiral-matrix/
	 * @param {number[][]} matrix
	 * @return {number[]}
	 */
	spiralOrder = function (matrix, order = []) {
		var addTop = (matrix, top, bot, left, right, order) => {
			for (let col = left; col <= right; col++) {
				/* Time O(COLS) */
				order.push(
					matrix[top][col]
				); /* Ignore Auxilary Spsace O(ROWS * COLS) */
			}
		};

		var addRight = (matrix, top, bot, left, right, order) => {
			for (let row = top; row <= bot; row++) {
				/* Time O(ROWS) */
				order.push(
					matrix[row][right]
				); /* Ignore Auxilary Spsace O(ROWS * COLS) */
			}
		};

		var addBot = (matrix, top, bot, left, right, order) => {
			for (let col = right; left <= col; col--) {
				/* Time O(COLS) */
				order.push(
					matrix[bot][col]
				); /* Ignore Auxilary Spsace O(ROWS * COLS) */
			}
		};

		var addLeft = (matrix, top, bot, left, right, order) => {
			for (let row = bot; top <= row; row--) {
				/* Time O(ROWS) */
				order.push(
					matrix[row][left]
				); /* Ignore Auxilary Spsace O(ROWS * COLS) */
			}
		};
		const [rows, cols] = [matrix.length - 1, matrix[0].length - 1];
		let [top, bot, left, right] = [0, rows, 0, cols];

		const isInBounds = () => left <= right && top <= bot;
		while (isInBounds()) {
			/* Time O(ROWS * COLS) */
			addTop(
				matrix,
				top,
				bot,
				left,
				right,
				order
			); /* Time O(COLS)        | Ignore Auxilary Spsace O(ROWS * COLS) */
			top++;

			addRight(
				matrix,
				top,
				bot,
				left,
				right,
				order
			); /* Time O(ROWS)        | Ignore Auxilary Spsace O(ROWS * COLS) */
			right--;

			const hasRow = top <= bot;
			if (hasRow) {
				addBot(
					matrix,
					top,
					bot,
					left,
					right,
					order
				); /* Time O(COLS)         | Ignore Auxilary Spsace O(ROWS * COLS) */
				bot--;
			}

			const hasCol = left <= right;
			if (hasCol) {
				addLeft(
					matrix,
					top,
					bot,
					left,
					right,
					order
				); /* Time O(ROWS)        | Ignore Auxilary Spsace O(ROWS * COLS) */
				left++;
			}
		}

		return order;
	};

	solve(matrix) {
		return this.spiralOrder(matrix);
	}
}

module.exports = { Problem: SpiralOrder };
