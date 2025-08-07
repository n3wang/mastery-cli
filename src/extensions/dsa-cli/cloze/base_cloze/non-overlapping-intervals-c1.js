class NonOverlappingIntervals {
	/**
	 * https://leetcode.com/problems/non-overlapping-intervals/
	 * Time O(N * logN) | Space O(1)
	 * @param {number[][]} intervals
	 * @return {number}
	 */
	eraseOverlapIntervals = function (intervals) {
		const getGaps = (intervals, gaps = 0) => {
			// TODO Get th prev, and return the intervals which should be te count of intervals minus the amounts of gaps.
			for (const curr of intervals) {
				const [prevStart, prevEnd] = prev;
				const [currStart, currEnd] = curr;

				const hasGap = prevEnd <= currStart;
				if (!hasGap) continue;

				prev[1] = curr[1];
				gaps++;
			}
		};

		intervals.sort(([aStart, aEnd], [bStart, bEnd]) =>
			aEnd !== bEnd ? aEnd - bEnd : aStart - bStart
		);

		return getGaps(intervals);
	};

	solve(intervals) {
		return this.eraseOverlapIntervals(intervals);
	}
}

module.exports = { Problem: NonOverlappingIntervals };
