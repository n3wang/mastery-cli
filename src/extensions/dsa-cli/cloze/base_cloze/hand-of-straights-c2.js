class HandOfStraights {
	/**
	 * https://leetcode.com/problems/hand-of-straights/
	 * Time O(N * K) | Space O(N)
	 * @param {number[]} hand
	 * @param {number} groupSize
	 * @return {boolean}
	 */
	isNStraightHand = function (hand, groupSize, count = new Map()) {
		// TODO Create a frequency map of the hand
		const getFrequencyMap = (hand, map = new Map()) => {};

		const getUniqueHand = hand =>
			[...new Set(hand)] /* Time O(N) | Space O(N) */
				.sort(
					(a, b) => b - a
				); /* Time O(N * Log(N)) | Space HeapSort O(1) | Space QuickSort O(log(N)) */

		const search = (groupSize, map, sortUniqHand) => {
			while (sortUniqHand.length) {
				/* Time O(N) */
				const smallest = sortUniqHand[sortUniqHand.length - 1];

				for (let i = smallest; i < smallest + groupSize; i++) {
					/* Time O(K) */
					if (!map.has(i)) return false;

					const val = map.get(i) - 1;

					map.set(i, val);

					let isEqual = map.get(i) === 0;
					if (!isEqual) continue;

					isEqual = i === sortUniqHand[sortUniqHand.length - 1];
					if (!isEqual) return false;

					sortUniqHand.pop();
				}
			}

			return true;
		};

		const map = getFrequencyMap(hand); /* Time O(N) | Space O(N) */
		const sortUniqHand =
			getUniqueHand(hand); /* Time O(N * Log(N)) | Space O(N) */

		return search(groupSize, map, sortUniqHand); /* Time O(N * K) */
	};

	solve(hand, groupSize) {
		return this.isNStraightHand(hand, groupSize);
	}
}

module.exports = { Problem: HandOfStraights };
