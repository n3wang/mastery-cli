class PaintHouseIII {
	solve(houses, cost, m, n, target) {
		const MAX_COST = 1000001;

		// Initialize prevMemo array
		let prevMemo = new Array(target + 1)
			.fill(null)
			.map(() => new Array(n).fill(MAX_COST));

		// Initialize for house 0, neighborhood will be 1
		for (let color = 1; color <= n; color++) {
			if (houses[0] === color) {
				// If the house has the same color, no cost
				prevMemo[1][color - 1] = 0;
			} else if (!houses[0]) {
				// If the house is not painted, assign the corresponding cost
				prevMemo[1][color - 1] = cost[0][color - 1];
			}
		}

		for (let house = 1; house < m; house++) {
			// Initialize memo array
			const memo = new Array(target + 1)
				.fill(null)
				.map(() => new Array(n).fill(MAX_COST));

			for (
				let neighborhoods = 1;
				neighborhoods <= Math.min(target, house + 1);
				neighborhoods++
			) {
				for (let color = 1; color <= n; color++) {
					// If the house is already painted, and color is different
					if (houses[house] && color !== houses[house]) {
						// Cannot be painted with a different color
						continue;
					}

					let currCost = MAX_COST;
					// Iterate over all the possible colors for the previous house
					for (let prevColor = 1; prevColor <= n; prevColor++) {
						if (prevColor !== color) {
							// Decrement the neighborhood as adjacent houses have different color
							currCost = Math.min(
								currCost,
								prevMemo[neighborhoods - 1][prevColor - 1]
							);
						} else {
							// Previous house has the same color, no change in neighborhood count
							currCost = Math.min(
								currCost,
								prevMemo[neighborhoods][color - 1]
							);
						}
					}

					// If the house is already painted, cost to paint is 0
					const costToPaint = houses[house]
						? 0
						: cost[house][color - 1];
					memo[neighborhoods][color - 1] = currCost + costToPaint;
				}
			}
			// Update the table to have the current house results
			prevMemo = memo;
		}

		let minCost = MAX_COST;
		// Find the minimum cost with m houses and target neighborhoods
		// By comparing cost for different colors for the last house
		for (let color = 1; color <= n; color++) {
			minCost = Math.min(minCost, prevMemo[target][color - 1]);
		}

		// Return -1 if the answer is MAX_COST as it implies no answer is possible
		return minCost === MAX_COST ? -1 : minCost;
	}
}

module.exports = { Problem: PaintHouseIII };
