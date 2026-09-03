class JuiceBottling {
	solve(prices) {
		return juiceBottling(prices);
	}
}
function juiceBottling(prices) {
	const numSizes = prices.length;
	const maxProfit = new Array(numSizes).fill(0);
	const dividingPoints = new Array(numSizes).fill(0);

	for (let size = 0; size < numSizes; size++) {
		for (let dividing_pt = 0; dividing_pt < size + 1; dividing_pt++) {
			const possibleProfit =
				maxProfit[size - dividing_pt] + prices[dividing_pt];

			if (possibleProfit > maxProfit[size]) {
				maxProfit[size] = possibleProfit;
				dividingPoints[size] = dividing_pt;
			}
		}
	}

	const solution = [];
	let currentDividingPoint = numSizes - 1;
	while (currentDividingPoint > 0) {
		solution.push(dividingPoints[currentDividingPoint]);
		currentDividingPoint -= dividingPoints[currentDividingPoint];
	}

	return solution;
}

module.exports = { Problem: JuiceBottling };
