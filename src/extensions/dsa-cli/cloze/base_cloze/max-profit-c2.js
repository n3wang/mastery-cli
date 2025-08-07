class MaxProfit {
	solve(prices) {
		let [left, right, max] = [0, 1, 0];

		while (right < prices.length) {
			//TODO  Update if it can slide, and update the windows as well.

			max = Math.max(max, window);
			right++;
		}

		return max;
	}
}

module.exports = { Problem: MaxProfit };
