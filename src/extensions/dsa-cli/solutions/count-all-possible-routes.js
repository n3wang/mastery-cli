class CountAllPossibleRoutes {
	solve(locations, start, finish, fuel) {
		const n = locations.length;
		const dp = new Array(n).fill(0).map(() => new Array(fuel + 1).fill(0));

		for (let i = 0; i <= fuel; i++) {
			dp[finish][i] = 1;
		}

		for (let j = 0; j <= fuel; j++) {
			for (let i = 0; i < n; i++) {
				for (let k = 0; k < n; k++) {
					if (k === i) {
						continue;
					}
					if (Math.abs(locations[i] - locations[k]) <= j) {
						dp[i][j] =
							(dp[i][j] +
								dp[k][
									j - Math.abs(locations[i] - locations[k])
								]) %
							1000000007;
					}
				}
			}
		}

		return dp[start][fuel];
	}
}

module.exports = { Problem: CountAllPossibleRoutes };
