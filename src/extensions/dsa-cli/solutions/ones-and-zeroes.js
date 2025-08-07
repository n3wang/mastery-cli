class Solution {
	solve(strs, m, n) {
		const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));

		for (const s of strs) {
			const count = this.countZeroesOnes(s);

			for (let zeroes = m; zeroes >= count[0]; zeroes--) {
				for (let ones = n; ones >= count[1]; ones--) {
					dp[zeroes][ones] = Math.max(
						1 + dp[zeroes - count[0]][ones - count[1]],
						dp[zeroes][ones]
					);
				}
			}
		}

		return dp[m][n];
	}

	countZeroesOnes(s) {
		const c = [0, 0];

		for (let i = 0; i < s.length; i++) {
			c[s.charAt(i) - '0']++;
		}

		return c;
	}
}

module.exports = { Problem: Solution };
