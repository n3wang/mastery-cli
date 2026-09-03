class MeetingRooms {
	/**
	 * https://leetcode.com/problems/meeting-rooms/
	 * Time O(N * logN) | Space O(1)
	 * @param {number[][]} intervals
	 * @return {boolean}
	 */
	canAttendMeetings = function (intervals) {
		const canAttend = intervals => {
			// TODO Get the prev, for each interval check if it overlaps with prev
			// TODO Remember to update prev

			return true;
		};
		intervals.sort(([aStart, aEnd], [bStart, bEnd]) =>
			aStart !== bStart ? aStart - bStart : aEnd - bEnd
		);

		return canAttend(intervals);
	};

	solve(intervals) {
		return this.canAttendMeetings(intervals);
	}
}

module.exports = { Problem: MeetingRooms };
