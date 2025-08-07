class StoneGameIII {
	solve(stoneValue) {
		return stoneGameIII(stoneValue);
	}
}

module.exports = { Problem: StoneGameIII };

function stoneGameIII(stoneValue) {
	const n = stoneValue.length;
	const dp = new Array(4).fill(0);

	for (let i = n - 1; i >= 0; i--) {
		dp[i % 4] = stoneValue[i] - dp[(i + 1) % 4];

		if (i + 2 <= n) {
			dp[i % 4] = Math.max(
				dp[i % 4],
				stoneValue[i] + stoneValue[i + 1] - dp[(i + 2) % 4]
			);
		}

		if (i + 3 <= n) {
			dp[i % 4] = Math.max(
				dp[i % 4],
				stoneValue[i] +
					stoneValue[i + 1] +
					stoneValue[i + 2] -
					dp[(i + 3) % 4]
			);
		}
	}

	if (dp[0] > 0) {
		return 'Alice';
	} else if (dp[0] < 0) {
		return 'Bob';
	} else {
		return 'Tie';
	}
}
