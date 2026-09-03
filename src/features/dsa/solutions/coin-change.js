const initMemo = amount => Array(amount).fill(0);

var dfs = (coins, amount, memo, min = Infinity) => {
	for (const coin of coins) {
		/* Time O(N) */
		const cost = coinChange(
			coins,
			amount - coin,
			memo
		); /* Time O(N) | Space O(N) */

		const canUpdate = 0 <= cost && cost < min;
		if (!canUpdate) continue;

		min = cost + 1;
	}

	memo[amount - 1] = min !== Infinity ? min : -1;

	return memo[amount - 1];
};

/**
 * DP - Top Down
 * Array - Memoization
 * Time O(N) | Space O(N)
 * https://leetcode.com/problems/coin-change/
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
const coinChange = (coins, amount, memo = initMemo(amount)) => {
	const isBaseCase1 = amount < 0;
	if (isBaseCase1) return -1;

	const isBaseCase2 = amount < 1;
	if (isBaseCase2) return 0;

	const isBaseCase3 = memo[amount - 1] !== 0;
	if (isBaseCase3) return memo[amount - 1];

	return dfs(coins, amount, memo); /* Time O(N) | Space O(N) */
};

class CoinChnage {
	solve(coins, amount) {
		return coinChange(coins, amount);
	}
}

module.exports = { Problem: CoinChnage };
