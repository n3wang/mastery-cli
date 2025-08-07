class KeysKeyboard4 {
	solve(n) {
		const dp = new Array(n + 1).fill(0);
		for (let i = 0; i <= n; i++) {
			dp[i] = i;
		}
		for (let i = 0; i <= n - 3; i++) {
			for (let j = i + 3; j <= Math.min(n, i + 6); j++) {
				dp[j] = Math.max(dp[j], (j - i - 1) * dp[i]);
			}
		}
		return dp[n];
	}
}

module.exports = { Problem: KeysKeyboard4 };
