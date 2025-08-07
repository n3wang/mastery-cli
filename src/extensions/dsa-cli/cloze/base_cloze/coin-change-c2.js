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
	// TODO If the amount is less than 0 then return -1, which means likely used a coin larger than the target.

	// TODO If the amount is 0 then return 0, which means we have found the target.

	// TODO If The amount is already in the memo then return the value, which means we have already computed the value.

	return dfs(coins, amount, memo); /* Time O(N) | Space O(N) */
};

class CoinChnage {
	solve(coins, amount) {
		return coinChange(coins, amount);
	}
}

module.exports = { Problem: CoinChnage };
