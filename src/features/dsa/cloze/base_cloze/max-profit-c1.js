class MaxProfit {
	solve(prices) {
		let [left, right, max] = [0, 1, 0];

		while (right < prices.length) {
			const canSlide = prices[right] <= prices[left];
			if (canSlide) left = right;

			const window = prices[right] - prices[left];

			// TODO Complete the max variable
		}

		return max;
	}
}

module.exports = { Problem: MaxProfit };
