class Problem {
	/**
	 * DP - Bottom Up
	 * Array - Tabulation
	 * Time O(N * AMOUNT) | Space O(AMOUNT)
	 * https://leetcode.com/problems/coin-change-ii/
	 * @param {number} amount
	 * @param {number[]} coins
	 * @return {number}
	 */
	change = (amount, coins) => {
		var initTabu = amount => {
			var tabu = new Array(amount + 1).fill(0);

			tabu[0] = 1;

			return tabu;
		};

		var search = (amount, coins, tabu) => {
			for (const coin of coins) {
				for (let _amount = 0; _amount < amount + 1; _amount++) {
					const canUpdate = coin <= _amount;
					if (!canUpdate) continue;

					tabu[_amount] += tabu[_amount - coin];
				}
			}
		};

		const tabu = initTabu(amount);

		search(amount, coins, tabu);

		return tabu[amount];
	};

	solve(amount, coins) {
		return this.change(amount, coins);
	}
}

module.exports = { Problem };
