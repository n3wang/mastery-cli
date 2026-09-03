const assert = require('assert');
const ProblemTests = require('./problem-test');

class MeetingRooms extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const meetingRooms = new this.Problem();
		this.current_test_name = '[[0,30],[5,10],[15,20]] | false';
		assert.deepEqual(
			meetingRooms.solve([
				[0, 30],
				[5, 10],
				[15, 20]
			]),
			false
		);
	}

	test_2() {
		const meetingRooms = new this.Problem();
		this.current_test_name = '[[7,10],[2,4]] | true';
		assert.deepEqual(
			meetingRooms.solve([
				[7, 10],
				[2, 4]
			]),
			true
		);
	}
}

// No access to the actual problem.
// class MeetingRoomsII extends ProblemTests {

//     constructor(Problem) {
//         super(Problem);
//         this.tests.push(() => this.test_1());
//         this.tests.push(() => this.test_2());
//     }

//     test_1() {
//         const meetingRooms = new this.Problem();
//         this.current_test_name = '[[0,30],[5,10],[15,20]] | false';
//         assert.deepEqual(meetingRooms.solve([[0, 30], [5, 10], [15, 20]]), false);
//     }

//     test_2() {

//         const meetingRooms = new this.Problem();
//         this.current_test_name = '[[7,10],[2,4]] | true';
//         assert.deepEqual(meetingRooms.solve([[7, 10], [2, 4]]), true);
//     }
// }

class NonOverlappingIntervals extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		const nonOverlappingIntervals = new this.Problem();
		this.current_test_name = '[[1,2],[2,3],[3,4],[1,3]] | 1';
		assert.deepEqual(
			nonOverlappingIntervals.solve([
				[1, 2],
				[2, 3],
				[3, 4],
				[1, 3]
			]),
			1
		);
	}

	test_2() {
		const nonOverlappingIntervals = new this.Problem();
		this.current_test_name = '[[1,2],[1,2],[1,2]] | 2';
		assert.deepEqual(
			nonOverlappingIntervals.solve([
				[1, 2],
				[1, 2],
				[1, 2]
			]),
			2
		);
	}

	test_3() {
		const nonOverlappingIntervals = new this.Problem();
		this.current_test_name = '[[1,2],[2,3]] | 0';
		assert.deepEqual(
			nonOverlappingIntervals.solve([
				[1, 2],
				[2, 3]
			]),
			0
		);
	}
}

const TEST_DICTIONARY = {
	'meeting-rooms': MeetingRooms,
	'non-overlapping-intervals': NonOverlappingIntervals
};

module.exports = TEST_DICTIONARY;
