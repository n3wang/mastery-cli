class Solution {
	lcs(s1, s2, m, n) {
		const dp = new Array(n + 1).fill(0);
		const dpPrev = new Array(n + 1).fill(0);

		for (let i = 0; i <= m; i++) {
			for (let j = 0; j <= n; j++) {
				if (i === 0 || j === 0) {
					dp[j] = 0;
				} else if (s1.charAt(i - 1) === s2.charAt(j - 1)) {
					dp[j] = 1 + dpPrev[j - 1];
				} else {
					dp[j] = Math.max(dpPrev[j], dp[j - 1]);
				}
			}
			dpPrev.splice(0, dpPrev.length, ...dp);
		}

		return dp[n];
	}

	solve(s) {
		const n = s.length;
		const sReverse = s.split('').reverse().join('');

		return n - this.lcs(s, sReverse, n, n);
	}
}

module.exports = { Problem: Solution };
