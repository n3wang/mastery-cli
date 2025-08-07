class MeetingRooms {
	/**
	 * https://leetcode.com/problems/meeting-rooms/
	 * Time O(N * logN) | Space O(1)
	 * @param {number[][]} intervals
	 * @return {boolean}
	 */
	canAttendMeetings = function (intervals) {
		const canAttend = intervals => {
			let prev = intervals.shift();

			for (const curr of intervals) {
				const [prevStart, prevEnd] = prev;
				const [currStart, currEnd] = curr;

				const hasOverlap = currStart < prevEnd;
				if (hasOverlap) return false;

				prev = curr;
			}

			return true;
		};

		// TODO Sort the intervals by start time if they have the same start time then sort by end time

		return canAttend(intervals);
	};

	solve(intervals) {
		return this.canAttendMeetings(intervals);
	}
}

module.exports = { Problem: MeetingRooms };
