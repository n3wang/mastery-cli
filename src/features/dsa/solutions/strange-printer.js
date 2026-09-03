class Solution {
	solve(s) {
		const n = s.length;
		const dp = new Array(n).fill(null).map(() => new Array(n).fill(0));

		for (let length = 1; length <= n; length++) {
			for (let left = 0; left <= n - length; left++) {
				const right = left + length - 1;
				let j = -1;
				dp[left][right] = n;

				for (let i = left; i < right; i++) {
					if (s.charAt(i) !== s.charAt(right) && j === -1) {
						j = i;
					}

					if (j !== -1) {
						dp[left][right] = Math.min(
							dp[left][right],
							1 + dp[j][i] + dp[i + 1][right]
						);
					}
				}

				if (j === -1) {
					dp[left][right] = 0;
				}
			}
		}

		return dp[0][n - 1] + 1;
	}
}

module.exports = { Problem: Solution };
