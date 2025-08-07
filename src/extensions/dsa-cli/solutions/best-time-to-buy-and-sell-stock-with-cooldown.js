class BestTimeToBuyAndSellStockWithCooldown {
	/**
	 * DP - Bottom Up
	 * Array - Tabulation
	 * Time O(N^2) | Space O(N)
	 * https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/
	 * @param {number[]} prices
	 * @return {number}
	 */
	maxProfit = prices => {
		var initTabu = prices => new Array(prices.length + 2).fill(0);

		var search = (prices, tabu) => {
			for (let i = prices.length - 1; 0 <= i; i--) {
				/* Time O(N) */
				const prev = buyAndSell(prices, i, tabu); /* Time O(N) */
				const next = tabu[i + 1];

				tabu[i] = Math.max(prev, next); /* Space O(N) */
			}
		};

		const buyAndSell = (prices, i, tabu, max = 0) => {
			for (let sell = i + 1; sell < prices.length; sell++) {
				/* Time O(N) */
				const profit = prices[sell] - prices[i] + tabu[sell + 2];

				max = Math.max(max, profit);
			}

			return max;
		};

		const tabu = initTabu(prices); /* Space O(N) */

		search(prices, tabu); /* Time O(N * N) */

		return tabu[0];
	};

	solve(prices) {
		return this.maxProfit(prices);
	}
}

module.exports = { Problem: BestTimeToBuyAndSellStockWithCooldown };
