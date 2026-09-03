class SearchMatrix {
	//////////////////////////////////////////////////////////////////////////////
	// Two level Binary search
	// Time: O(log(m) + log(n))  Space: O(1)
	//////////////////////////////////////////////////////////////////////////////
	/**
	 * @param {number[][]} matrix
	 * @param {number} target
	 * @return {boolean}
	 */
	searchMatrix(matrix, target) {
		let [rows, cols] = [matrix.length, matrix[0].length];
		let [top, bot] = [0, rows - 1];

		while (top <= bot) {
			let row = Math.floor((top + bot) / 2);
			if (target > matrix[row][cols - 1]) {
				top = row + 1;
			} else if (target < matrix[row][0]) {
				bot = row - 1;
			} else {
				// Found the ideal row
				break;
			}
		}

		if (!(top <= bot)) {
			return false;
		}

		// TODO Run Binary Search on the row values

		return false;
	}

	solve(search, target) {
		return this.searchMatrix(search, target);
	}
}

module.exports = { Problem: SearchMatrix };
