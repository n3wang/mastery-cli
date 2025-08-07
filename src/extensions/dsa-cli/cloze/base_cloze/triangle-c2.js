class MinimumTotal {
	minimumTotal(triangle) {
		for (let row = 1; row < triangle.length; row++) {
			for (let col = 0; col <= row; col++) {
				let smallestAbove = Infinity;
				if (col > 0) {
					smallestAbove = triangle[row - 1][col - 1];
				}

				// TODO as long as it is not the last col, compute tcurrent smallest on top as the smaller between the prev top and right top

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
