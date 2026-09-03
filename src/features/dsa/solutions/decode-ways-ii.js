class DecodeWaysII {
	solve(s) {
		const M = 1000000007;
		const dp = new Array(s.length + 1).fill(0);
		dp[0] = 1;
		dp[1] = s.charAt(0) === '*' ? 9 : s.charAt(0) === '0' ? 0 : 1;

		for (let i = 1; i < s.length; i++) {
			if (s.charAt(i) === '*') {
				dp[i + 1] = (9 * dp[i]) % M;
				if (s.charAt(i - 1) === '1')
					dp[i + 1] = (dp[i + 1] + 9 * dp[i - 1]) % M;
				else if (s.charAt(i - 1) === '2')
					dp[i + 1] = (dp[i + 1] + 6 * dp[i - 1]) % M;
				else if (s.charAt(i - 1) === '*')
					dp[i + 1] = (dp[i + 1] + 15 * dp[i - 1]) % M;
			} else {
				dp[i + 1] = s.charAt(i) !== '0' ? dp[i] : 0;
				if (s.charAt(i - 1) === '1')
					dp[i + 1] = (dp[i + 1] + dp[i - 1]) % M;
				else if (s.charAt(i - 1) === '2' && s.charAt(i) <= '6')
					dp[i + 1] = (dp[i + 1] + dp[i - 1]) % M;
				else if (s.charAt(i - 1) === '*')
					dp[i + 1] =
						(dp[i + 1] + (s.charAt(i) <= '6' ? 2 : 1) * dp[i - 1]) %
						M;
			}
		}

		return dp[s.length];
	}
}

module.exports = { Problem: DecodeWaysII };
