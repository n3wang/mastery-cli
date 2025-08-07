class NonOverlappingIntervals {
	/**
	 * https://leetcode.com/problems/non-overlapping-intervals/
	 * Time O(N * logN) | Space O(1)
	 * @param {number[][]} intervals
	 * @return {number}
	 */
	eraseOverlapIntervals = function (intervals) {
		const getGaps = (intervals, gaps = 1) => {
			const prev = intervals.shift();

			for (const curr of intervals) {
				const [prevStart, prevEnd] = prev;
				const [currStart, currEnd] = curr;

				const hasGap = prevEnd <= currStart;
				if (!hasGap) continue;

				prev[1] = curr[1];
				gaps++;
			}

			return intervals.length + 1 - gaps;
		};

		// TODO Sort the intervals by start time if they have the same start time then sort by end time

		return getGaps(intervals);
	};

	solve(intervals) {
		return this.eraseOverlapIntervals(intervals);
	}
}

module.exports = { Problem: NonOverlappingIntervals };
