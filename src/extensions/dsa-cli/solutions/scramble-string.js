class ScreambleString {
	solve(s1, s2) {
		return isScramble(s1, s2);
	}
}

function isScramble(s1, s2) {
	const n = s1.length;
	const dp = new Array(n + 1)
		.fill(null)
		.map(() => new Array(n).fill(null).map(() => new Array(n).fill(false)));

	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			dp[1][i][j] = s1[i] === s2[j];
		}
	}

	for (let length = 2; length <= n; length++) {
		for (let i = 0; i <= n - length; i++) {
			for (let j = 0; j <= n - length; j++) {
				for (let newLength = 1; newLength < length; newLength++) {
					const dp1 = dp[newLength][i];
					const dp2 = dp[length - newLength][i + newLength];
					dp[length][i][j] |= dp1[j] && dp2[j + newLength];
					dp[length][i][j] |= dp1[j + length - newLength] && dp2[j];
				}
			}
		}
	}

	return dp[n][0][0];
}

module.exports = { Problem: ScreambleString };
