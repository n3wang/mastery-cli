class MinimumCostToCutAStick {
	solve(n, cuts) {
		const m = cuts.length;
		const newCuts = new Array(m + 2);
		newCuts[0] = 0;
		for (let i = 0; i < m; i++) {
			newCuts[i + 1] = cuts[i];
		}
		newCuts[m + 1] = n;
		newCuts.sort((a, b) => a - b);

		const dp = new Array(m + 2);
		for (let i = 0; i < m + 2; i++) {
			dp[i] = new Array(m + 2).fill(0);
		}

		for (let diff = 2; diff < m + 2; ++diff) {
			for (let left = 0; left < m + 2 - diff; ++left) {
				const right = left + diff;
				let ans = Number.MAX_SAFE_INTEGER;
				for (let mid = left + 1; mid < right; ++mid) {
					ans = Math.min(
						ans,
						dp[left][mid] +
							dp[mid][right] +
							newCuts[right] -
							newCuts[left]
					);
				}
				dp[left][right] = ans;
			}
		}

		return dp[0][m + 1];
	}
}

module.exports = { Problem: MinimumCostToCutAStick };
