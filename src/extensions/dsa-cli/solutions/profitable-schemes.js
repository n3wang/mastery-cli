class ProfitableSchemes {
	solve(n, minProfit, group, profit) {
		return profitableSchemes(n, minProfit, group, profit);
	}
}

const mod = 1e9 + 7;

function profitableSchemes(n, minProfit, group, profits) {
	const groupSize = group.length;
	const dp = new Array(groupSize + 1).fill(null).map(() => {
		return new Array(n + 1).fill(null).map(() => {
			return new Array(minProfit + 1).fill(0);
		});
	});

	// Initializing the base case.
	for (let count = 0; count <= n; count++) {
		dp[groupSize][count][minProfit] = 1;
	}

	for (let index = groupSize - 1; index >= 0; index--) {
		for (let count = 0; count <= n; count++) {
			for (let profit = 0; profit <= minProfit; profit++) {
				// Ways to get a profitable scheme without this crime.
				dp[index][count][profit] = dp[index + 1][count][profit];
				if (count + group[index] <= n) {
					// Adding ways to get profitable schemes, including this crime.
					dp[index][count][profit] =
						(dp[index][count][profit] +
							dp[index + 1][count + group[index]][
								Math.min(minProfit, profit + profits[index])
							]) %
						mod;
				}
			}
		}
	}

	return dp[0][0][0];
}

module.exports = { Problem: ProfitableSchemes };
