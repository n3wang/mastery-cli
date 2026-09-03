class MinimumCostForTickets {
	solve(days, costs) {
		return minCostTickets(days, costs);
	}
}

module.exports = { Problem: MinimumCostForTickets };

function minCostTickets(days, costs) {
	const lastDay = days[days.length - 1];
	const dp = new Array(lastDay + 1).fill(0);

	let i = 0;
	for (let day = 1; day <= lastDay; day++) {
		if (day < days[i]) {
			dp[day] = dp[day - 1];
		} else {
			i++;
			dp[day] = Math.min(
				dp[day - 1] + costs[0],
				dp[Math.max(0, day - 7)] + costs[1],
				dp[Math.max(0, day - 30)] + costs[2]
			);
		}
	}

	return dp[lastDay];
}
