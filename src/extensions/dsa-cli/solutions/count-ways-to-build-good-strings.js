class Solution {
	constructor() {
		// Use dp[i] to record the number of good strings of length i.
		this.dp = [];
		this.mod = 1000000007;
	}

	// Find the number of good strings of length `end`.
	dfs(end, zero, one) {
		if (this.dp[end] !== -1) {
			return this.dp[end];
		}
		let count = 0;
		if (end >= one) {
			count += this.dfs(end - one, zero, one);
		}
		if (end >= zero) {
			count += this.dfs(end - zero, zero, one);
		}
		this.dp[end] = count % this.mod;
		return this.dp[end];
	}

	solve(low, high, zero, one) {
		this.dp = new Array(high + 1).fill(-1);
		this.dp[0] = 1;

		// Add up the number of strings with each valid length [low ~ high].
		let answer = 0;
		for (let end = low; end <= high; ++end) {
			answer += this.dfs(end, zero, one);
			answer %= this.mod;
		}
		return answer;
	}
}

module.exports = { Problem: Solution };
