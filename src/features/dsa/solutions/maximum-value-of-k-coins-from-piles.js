class MaximumValueOfKCoinsFromPiles {
	solve(piles, k) {
		const n = piles.length;
		const dp = Array.from({ length: n + 1 }, () => Array(k + 1).fill(-1));

		function f(i, coins) {
			if (i === 0) {
				return 0;
			}
			if (dp[i][coins] !== -1) {
				return dp[i][coins];
			}
			let currentSum = 0;
			for (
				let currentCoins = 0;
				currentCoins <= Math.min(piles[i - 1].length, coins);
				currentCoins++
			) {
				if (currentCoins > 0) {
					currentSum += piles[i - 1][currentCoins - 1];
				}
				dp[i][coins] = Math.max(
					dp[i][coins],
					f(i - 1, coins - currentCoins) + currentSum
				);
			}
			return dp[i][coins];
		}

		return f(n, k);
	}
}

module.exports = { Problem: MaximumValueOfKCoinsFromPiles };
