class PaintHouse {
	solve(costs) {
		if (costs.length === 0) return 0;

		let previousRow = [...costs[costs.length - 1]]; // Make a copy of the last row

		for (let n = costs.length - 2; n >= 0; n--) {
			const currentRow = [...costs[n]]; // Make a copy of the current row

			// Total cost of painting the nth house red.
			currentRow[0] += Math.min(previousRow[1], previousRow[2]);
			// Total cost of painting the nth house green.
			currentRow[1] += Math.min(previousRow[0], previousRow[2]);
			// Total cost of painting the nth house blue.
			currentRow[2] += Math.min(previousRow[0], previousRow[1]);

			previousRow = currentRow;
		}

		return Math.min(...previousRow);
	}
}

module.exports = { Problem: PaintHouse };
