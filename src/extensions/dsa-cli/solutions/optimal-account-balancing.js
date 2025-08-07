class OptimalAccountBalancing {
	solve(transactions) {
		const balanceMap = new Map();
		for (const [a, b, amount] of transactions) {
			balanceMap.set(a, (balanceMap.get(a) || 0) + amount);
			balanceMap.set(b, (balanceMap.get(b) || 0) - amount);
		}

		const balanceList = [...balanceMap.values()].filter(
			amount => amount !== 0
		);
		const n = balanceList.length;

		const memo = new Array(1 << n).fill(-1);
		memo[0] = 0;

		const dfs = totalMask => {
			if (memo[totalMask] !== -1) {
				return memo[totalMask];
			}
			let balanceSum = 0;
			let answer = 0;

			// Remove one person at a time in total_mask
			for (let i = 0; i < n; i++) {
				const curBit = 1 << i;
				if (totalMask & curBit) {
					balanceSum += balanceList[i];
					answer = Math.max(answer, dfs(totalMask ^ curBit));
				}
			}

			// If the total balance of total_mask is 0, increment answer by 1.
			memo[totalMask] = answer + (balanceSum === 0 ? 1 : 0);
			return memo[totalMask];
		};

		return n - dfs((1 << n) - 1);
	}
}

module.exports = { Problem: OptimalAccountBalancing };
