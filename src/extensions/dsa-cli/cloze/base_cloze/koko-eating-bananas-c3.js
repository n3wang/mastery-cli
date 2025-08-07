class KokoEatingBananas {
	minEatingSpeed(piles, h) {
		const getHourSpent = (mid, piles, hourSpent = 0) => {
			for (const pile of piles) {
				hourSpent += Math.ceil(pile / mid);
			}

			return hourSpent;
		};
		let [left, right] = [1, Math.max(...piles)];

		while (left < right) {
			const mid = (left + right) >> 1;
			const hourSpent = getHourSpent(mid, piles);

			// TODO: If the target is greater then the left has to be updated to the middle + 1
			// Otherwise the right has to be updated to the middle
		}

		return right;
	}

	solve(piles, h) {
		return this.minEatingSpeed(piles, h);
	}
}

module.exports = { Problem: KokoEatingBananas };
