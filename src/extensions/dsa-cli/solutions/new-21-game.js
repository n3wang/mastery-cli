class New21Game {
	solve(n, k, maxPts) {
		return new21Game(n, k, maxPts);
	}
}

function new21Game(n, k, maxPts) {
	const dp = new Array(n + 1).fill(0);
	dp[0] = 1;

	for (let i = 1; i <= n; i++) {
		for (let j = 1; j <= maxPts; j++) {
			if (i - j >= 0 && i - j < k) {
				dp[i] += dp[i - j] / maxPts;
			}
		}
	}

	let result = 0;
	for (let i = k; i <= n; i++) {
		result += dp[i];
	}

	return result;
}

module.exports = { Problem: New21Game };
