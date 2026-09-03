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
			// TODO Calculate the mid and the get Hour Spent fo that.

			const isTargetGreater = h < hourSpent;
			if (isTargetGreater) left = mid + 1;

			const isTargetLess = hourSpent <= h;
			if (isTargetLess) right = mid;
		}

		return right;
	}

	solve(piles, h) {
		return this.minEatingSpeed(piles, h);
	}
}

module.exports = { Problem: KokoEatingBananas };
