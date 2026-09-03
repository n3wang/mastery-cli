class NumberOfWaysToWearDifferentHatsToEachOther {
	solve(hats) {
		const hatsToPeople = new Map();
		for (let i = 0; i < hats.length; i++) {
			for (const hat of hats[i]) {
				if (!hatsToPeople.has(hat)) {
					hatsToPeople.set(hat, []);
				}
				hatsToPeople.get(hat).push(i);
			}
		}

		const n = hats.length;
		const MOD = 10 ** 9 + 7;
		const done = (1 << n) - 1;

		const dp = new Array(42).fill(0).map(() => new Array(done + 1).fill(0));
		for (let i = 0; i < dp.length; i++) {
			dp[i][done] = 1;
		}

		for (let mask = done; mask >= 0; mask--) {
			for (let hat = 40; hat > 0; hat--) {
				let ans = dp[hat + 1][mask];
				for (const person of hatsToPeople.get(hat) || []) {
					if ((mask & (1 << person)) === 0) {
						ans = (ans + dp[hat + 1][mask | (1 << person)]) % MOD;
					}
				}
				dp[hat][mask] = ans;
			}
		}

		return dp[1][0];
	}
}

module.exports = { Problem: NumberOfWaysToWearDifferentHatsToEachOther };
