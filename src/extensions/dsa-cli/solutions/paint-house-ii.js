class Solution {
	solve(costs) {
		const n = costs.length;
		if (n === 0) return 0; // This is a valid case.
		const k = costs[0].length;

		// Firstly, we need to determine the 2 lowest costs of
		// the first row. We also need to remember the color of
		// the lowest.
		let prevMinCost = null;
		let prevSecondMinCost = null;
		let prevMinColor = null;

		for (let color = 0; color < k; color++) {
			let cost = costs[0][color];

			if (prevMinCost === null || cost < prevMinCost) {
				prevSecondMinCost = prevMinCost;
				prevMinColor = color;
				prevMinCost = cost;
			} else if (prevSecondMinCost === null || cost < prevSecondMinCost) {
				prevSecondMinCost = cost;
			}
		}

		// And now, we need to work our way down, keeping track of the minimums.
		for (let house = 1; house < n; house++) {
			let minCost = null;
			let secondMinCost = null;
			let minColor = null;

			for (let color = 0; color < k; color++) {
				// Determine cost for this cell (without writing it into the input array).
				let cost = costs[house][color];

				if (color === prevMinColor) {
					cost += prevSecondMinCost;
				} else {
					cost += prevMinCost;
				}

				// Work out whether or not it is a current minimum.
				if (minCost === null || cost < minCost) {
					secondMinCost = minCost;
					minColor = color;
					minCost = cost;
				} else if (secondMinCost === null || cost < secondMinCost) {
					secondMinCost = cost;
				}
			}

			// Transfer current values to be previous values.
			prevMinCost = minCost;
			prevMinColor = minColor;
			prevSecondMinCost = secondMinCost;
		}

		return prevMinCost;
	}
}

module.exports = { Problem: Solution };
