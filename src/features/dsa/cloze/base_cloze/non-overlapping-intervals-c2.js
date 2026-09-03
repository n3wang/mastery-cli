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

			// TODO For each curr of the intervals, count if there is any gaps. update the prev witht he current.

			return intervals.length + 1 - gaps;
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
