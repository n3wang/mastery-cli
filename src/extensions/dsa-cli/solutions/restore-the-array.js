class RestoreTheArray {
	solve(s, k) {
		const m = s.length;
		const n = k.toString().length;
		const mod = 10 ** 9 + 7;
		// dp[i % (n + 1)] records the number of arrays that can be printed as
		// the prefix substring s[0 ~ i - 1]
		const dp = new Array(n + 1).fill(0);
		dp[0] = 1;

		// Iterate over every digit, for each digit s[start]:
		for (let start = 0; start < m; start++) {
			if (s.charAt(start) === '0') {
				dp[start % (n + 1)] = 0;
				continue;
			}

			// Iterate over ending digit end and find all valid numbers
			// s[start ~ end].
			for (let end = start; end < m; end++) {
				const currNumber = s.substring(start, end + 1);
				if (parseInt(currNumber) > k) {
					break;
				}

				// If s[start ~ end] is valid, increment dp[(end + 1) % (n + 1)] by dp[start].
				dp[(end + 1) % (n + 1)] += dp[start % (n + 1)];
				dp[(end + 1) % (n + 1)] %= mod;
			}

			// Set dp[start % (n + 1)] as 0.
			dp[start % (n + 1)] = 0;
		}

		return dp[m % (n + 1)];
	}
}

module.exports = { Problem: RestoreTheArray };
