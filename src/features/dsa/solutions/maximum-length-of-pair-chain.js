class MaximumLengthOfPairChain {
	solve(pairs) {
		const n = pairs.length;
		pairs.sort((a, b) => a[0] - b[0]);
		const dp = new Array(n).fill(1);
		let ans = 1;

		for (let i = n - 1; i >= 0; i--) {
			for (let j = i + 1; j < n; j++) {
				if (pairs[i][1] < pairs[j][0]) {
					dp[i] = Math.max(dp[i], 1 + dp[j]);
				}
			}
			ans = Math.max(ans, dp[i]);
		}
		return ans;
	}
}

module.exports = { Problem: MaximumLengthOfPairChain };
