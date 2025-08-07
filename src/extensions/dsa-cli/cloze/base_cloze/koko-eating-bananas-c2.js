class KokoEatingBananas {
	minEatingSpeed(piles, h) {
		const getHourSpent = (mid, piles, hourSpent = 0) => {
			for (const pile of piles) {
				// TODO Calculate the hourSpent by adding the ceil of the pile divided by the middle
			}

			return hourSpent;
		};
		let [left, right] = [1, Math.max(...piles)];

		while (left < right) {
			const mid = (left + right) >> 1;
			const hourSpent = getHourSpent(mid, piles);

			const isTargetGreater = h < hourSpent;
			if (isTargetGreater) left = mid + 1;

			const isTargetLess = hourSpent <= h;
			if (isTargetLess) right = mid;
		}

		// TODO Return he right value because thats the minimum count to succesffully eating them All
	}

	solve(piles, h) {
		return this.minEatingSpeed(piles, h);
	}
}

module.exports = { Problem: KokoEatingBananas };
