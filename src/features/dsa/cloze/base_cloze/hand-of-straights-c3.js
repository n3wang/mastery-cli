class HandOfStraights {
	/**
	 * https://leetcode.com/problems/hand-of-straights/
	 * Time O(N * K) | Space O(N)
	 * @param {number[]} hand
	 * @param {number} groupSize
	 * @return {boolean}
	 */
	isNStraightHand = function (hand, groupSize, count = new Map()) {
		const getFrequencyMap = (hand, map = new Map()) => {
			for (const _hand of hand) {
				/* Time O(N) */
				const val = (map.get(_hand) || 0) + 1;

				map.set(_hand, val); /* Space O(N) */
			}

			return map;
		};

		const getUniqueHand = hand =>
			[...new Set(hand)] /* Time O(N) | Space O(N) */
				.sort(
					(a, b) => b - a
				); /* Time O(N * Log(N)) | Space HeapSort O(1) | Space QuickSort O(log(N)) */

		const search = (groupSize, map, sortUniqHand) => {
			// TODO While the unique hand is not empty
			while (sortUniqHand.length) {
				/* Time O(N) */

				// TODO Get the index of the smallest element in the unique hand
				const smallest = sortUniqHand[sortUniqHand.length - 1];

				// TODO Iterate from the smallest element to the smallest element + groupSize
				// TODO Check if it has the item on the map, otherwise return false, update the value.
				// TODO If the eleemnt is not the same as the smallest
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
