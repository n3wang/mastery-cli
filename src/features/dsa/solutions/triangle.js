class MinimumTotal {
	minimumTotal(triangle) {
		for (let row = 1; row < triangle.length; row++) {
			for (let col = 0; col <= row; col++) {
				let smallestAbove = Infinity;
				if (col > 0) {
					smallestAbove = triangle[row - 1][col - 1];
				}
				if (col < row) {
					smallestAbove = Math.min(
						smallestAbove,
						triangle[row - 1][col]
					);
				}
				triangle[row][col] += smallestAbove;
			}
		}

		return Math.min(...triangle[triangle.length - 1]);
	}

	solve(triangle) {
		return this.minimumTotal(triangle);
	}
}

module.exports = { Problem: MinimumTotal };
