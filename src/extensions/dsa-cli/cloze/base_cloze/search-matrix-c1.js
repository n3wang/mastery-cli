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

		// TODO While the top is less than the bottom, we can calculate  we can do
		// a binary search on the rows to find the row where the target is located

		if (!(top <= bot)) {
			return false;
		}

		let row = Math.floor((top + bot) / 2);
		let [l, r] = [0, cols - 1];
		while (l <= r) {
			let m = Math.floor((l + r) / 2);
			if (target > matrix[row][m]) {
				l = m + 1;
			} else if (target < matrix[row][m]) {
				r = m - 1;
			} else if (target == matrix[row][m]) {
				return true;
			}
		}
		return false;
	}

	solve(search, target) {
		return this.searchMatrix(search, target);
	}
}

module.exports = { Problem: SearchMatrix };
