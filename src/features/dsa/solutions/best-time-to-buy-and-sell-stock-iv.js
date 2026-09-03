class BestTimeToBuyAndSellStockIV {
	solve(k, prices) {
		const n = prices.length;

		// Solve special cases
		if (n <= 0 || k <= 0) {
			return 0;
		}

		// Find all consecutively increasing subsequences
		const transactions = [];
		let start = 0;
		let end = 0;
		for (let i = 1; i < n; i++) {
			if (prices[i] >= prices[i - 1]) {
				end = i;
			} else {
				if (end > start) {
					const t = [start, end];
					transactions.push(t);
				}
				start = i;
			}
		}
		if (end > start) {
			const t = [start, end];
			transactions.push(t);
		}

		while (transactions.length > k) {
			// Check delete loss
			let deleteIndex = 0;
			let minDeleteLoss = Number.MAX_VALUE;
			for (let i = 0; i < transactions.length; i++) {
				const t = transactions[i];
				const profitLoss = prices[t[1]] - prices[t[0]];
				if (profitLoss < minDeleteLoss) {
					minDeleteLoss = profitLoss;
					deleteIndex = i;
				}
			}

			// Check merge loss
			let mergeIndex = 0;
			let minMergeLoss = Number.MAX_VALUE;
			for (let i = 1; i < transactions.length; i++) {
				const t1 = transactions[i - 1];
				const t2 = transactions[i];
				const profitLoss = prices[t1[1]] - prices[t2[0]];
				if (profitLoss < minMergeLoss) {
					minMergeLoss = profitLoss;
					mergeIndex = i;
				}
			}

			// Delete or merge
			if (minDeleteLoss <= minMergeLoss) {
				transactions.splice(deleteIndex, 1);
			} else {
				const t1 = transactions[mergeIndex - 1];
				const t2 = transactions[mergeIndex];
				t1[1] = t2[1];
				transactions.splice(mergeIndex, 1);
			}
		}

		let res = 0;
		for (const t of transactions) {
			res += prices[t[1]] - prices[t[0]];
		}

		return res;
	}
}

module.exports = { Problem: BestTimeToBuyAndSellStockIV };
