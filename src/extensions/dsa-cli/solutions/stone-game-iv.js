class StoneGameIV {
	solve(n) {
		return winnerSquareGame(n);
	}
}

function winnerSquareGame(n) {
	const dp = new Array(n + 1).fill(false);

	for (let i = 0; i <= n; i++) {
		if (dp[i]) continue;

		for (let k = 1; k <= Math.floor(Math.sqrt(n)); k++) {
			if (i + k * k <= n) {
				dp[i + k * k] = true;
			} else {
				break;
			}
		}
	}

	return dp[n];
}

module.exports = { Problem: StoneGameIV };
