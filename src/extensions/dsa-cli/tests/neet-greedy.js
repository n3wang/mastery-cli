const assert = require('assert');
const ProblemTests = require('./problem-test');

class ClassPhotos extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
		this.tests.push(() => this.test_4());
		this.tests.push(() => this.test_5());
		this.tests.push(() => this.test_6());
	}

	test_1() {
		this.current_test_name = '([5, 8, 1, 3, 4], [6, 9, 2, 4, 5]) => true';
		const problemToTest = new this.Problem();
		assert.equal(
			problemToTest.solve([5, 8, 1, 3, 4], [6, 9, 2, 4, 5]),
			true
		);
	}

	test_2() {
		this.current_test_name = '([5, 8, 1, 3, 4], [6, 9, 2, 4, 4]) => false';
		const problemToTest = new this.Problem();
		assert.equal(
			problemToTest.solve([5, 8, 1, 3, 4], [6, 9, 2, 4, 4]),
			false
		);
	}

	test_3() {
		/**
         * {
            "blueShirtHeights": [5, 8, 1, 3, 4],
            "redShirtHeights": [6, 9, 2, 4, 5]
            }
         */

		this.current_test_name = '([5, 8, 1, 3, 4], [6, 9, 2, 4, 5]) => true';
		const problemToTest = new this.Problem();
		assert.equal(
			problemToTest.solve([5, 8, 1, 3, 4], [6, 9, 2, 4, 5]),
			true
		);
	}

	test_4() {
		/**
         * {
            "blueShirtHeights": [5, 8, 1, 3, 4, 9],
            "redShirtHeights": [6, 9, 2, 4, 5, 1]
            }
         */

		this.current_test_name =
			'([5, 8, 1, 3, 4, 9], [6, 9, 2, 4, 5, 1]) => false';
		const problemToTest = new this.Problem();
		assert.equal(
			problemToTest.solve([5, 8, 1, 3, 4, 9], [6, 9, 2, 4, 5, 1]),
			false
		);
	}

	test_5() {
		/**
         * {
            "blueShirtHeights": [6],
            "redShirtHeights": [6]
            }
         */

		this.current_test_name = '([6], [6]) => true';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve([6], [6]), false);
	}

	test_6() {
		/**
         * {
            "blueShirtHeights": [2, 3, 4, 5, 6],
            "redShirtHeights": [1, 2, 3, 4, 5]
            }
         */

		this.current_test_name = '([2, 3, 4, 5, 6], [1, 2, 3, 4, 5]) => true';
		const problemToTest = new this.Problem();
		assert.equal(
			problemToTest.solve([2, 3, 4, 5, 6], [1, 2, 3, 4, 5]),
			true
		);
	}
}

class MinimumWaitingTime extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
		this.tests.push(() => this.test_4());
		this.tests.push(() => this.test_5());
		this.tests.push(() => this.test_6());
	}

	test_1() {
		this.current_test_name = '([3, 2, 1, 2, 6]) => 17';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve([3, 2, 1, 2, 6]), 17);
	}

	test_2() {
		this.current_test_name = '([2, 1, 1, 1]) => 6';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve([2, 1, 1, 1]), 6);
	}

	test_3() {
		/**
		 *  "queries": [1, 2, 4, 5, 2, 1]
		 */

		this.current_test_name = '([1, 2, 4, 5, 2, 1]) => 23';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve([1, 2, 4, 5, 2, 1]), 23);
	}

	test_4() {
		/**
		 * [25, 30, 2, 1]
		 * => 32
		 */

		this.current_test_name = '([25, 30, 2, 1]) => 32';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve([25, 30, 2, 1]), 32);
	}

	test_5() {
		/**
		 * [1, 1, 1, 1, 1]
		 * => 10
		 */

		this.current_test_name = '([1, 1, 1, 1, 1]) => 10';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve([1, 1, 1, 1, 1]), 10);
	}

	test_6() {
		/**
         * 19
            View Outputs Side By Side
            Input(s)
            {
            "queries": [7, 9, 2, 3]
            }
         */

		this.current_test_name = '([7, 9, 2, 3]) => 19';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve([7, 9, 2, 3]), 19);
	}
}

class GasStation extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name = '([1,2,3,4,5], [3, 4, 5, 1, 2]) => 3';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]), 3);
	}
	test_2() {
		this.current_test_name = '([2,3,4], [3,4,3]) => -1';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve([2, 3, 4], [3, 4, 3]), -1);
	}
}

class HandOfStraights extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name = '([1,2,3,6,2,3,4,7,8], 3) => true';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve([1, 2, 3, 6, 2, 3, 4, 7, 8], 3), true);
	}

	test_2() {
		this.current_test_name = '([1,2,3,4,5], 4) => false';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve([1, 2, 3, 4, 5], 4), false);
	}
}

class TaskAssigment extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
		this.tests.push(() => this.test_4());
	}

	test_1() {
		/**
         * [
            [4, 2],
            [0, 5],
            [3, 1]
            ]
            View Outputs Side By Side
            Input(s)
            {
            "k": 3,
            "tasks": [1, 3, 5, 3, 1, 4]
            }
         */

		this.current_test_name =
			'([1, 3, 5, 3, 1, 4], 3) => [[4, 2], [0, 5], [3, 1]]';
		const problemToTest = new this.Problem();
		assert.deepEqual(problemToTest.solve([1, 3, 5, 3, 1, 4], 3), [
			[4, 2],
			[0, 5],
			[3, 1]
		]);
	}

	test_2() {
		/**
         * [
            [0, 7],
            [1, 6],
            [2, 5],
            [3, 4]
            ]
            View Outputs Side By Side
            Input(s)
            {
            "k": 4,
            "tasks": [1, 2, 3, 4, 5, 6, 7, 8]
            }
         */

		this.current_test_name =
			'([1, 2, 3, 4, 5, 6, 7, 8], 4) => [[0, 7], [1, 6], [2, 5], [3, 4]]';
		const problemToTest = new this.Problem();
		assert.deepEqual(problemToTest.solve([1, 2, 3, 4, 5, 6, 7, 8], 4), [
			[0, 7],
			[1, 6],
			[2, 5],
			[3, 4]
		]);
	}

	test_3() {
		/**
         * [
            [9, 8],
            [7, 6],
            [5, 4],
            [3, 2],
            [1, 0]
            ]
            View Outputs Side By Side
            Input(s)
            {
            "k": 5,
            "tasks": [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            }
         */

		this.current_test_name =
			'([1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 5) => [[9, 8], [7, 6], [5, 4], [3, 2], [1, 0]]';
		const problemToTest = new this.Problem();
		assert.deepEqual(
			problemToTest.solve([1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 5),
			[
				[9, 8],
				[7, 6],
				[5, 4],
				[3, 2],
				[1, 0]
			]
		);
	}

	test_4() {
		/**
         * [
            [0, 1]
            ]
            View Outputs Side By Side
            Input(s)
            {
            "k": 1,
            "tasks": [3, 5]
            }
         */

		this.current_test_name = '([3, 5], 1) => [[0, 1]]';
		const problemToTest = new this.Problem();
		assert.deepEqual(problemToTest.solve([3, 5], 1), [[0, 1]]);
	}

	test_5() {
		/**
         * [
            [9, 7],
            [8, 1],
            [5, 6],
            [0, 2],
            [4, 3]
            ]
            View Outputs Side By Side
            Input(s)
            {
            "k": 5,
            "tasks": [3, 7, 5, 4, 4, 3, 6, 8, 3, 3]
            }
         */

		this.current_test_name =
			'([3, 7, 5, 4, 4, 3, 6, 8, 3, 3], 5) => [[9, 7], [8, 1], [5, 6], [0, 2], [4, 3]]';
		const problemToTest = new this.Problem();
		assert(
			problemToTest.solve([3, 7, 5, 4, 4, 3, 6, 8, 3, 3], 5) ==
				[
					[9, 7],
					[8, 1],
					[5, 6],
					[0, 2],
					[4, 3]
				]
		);
	}

	test_6() {
		/**
         * [
            [15, 17],
            [19, 13],
            [8, 16],
            [2, 7],
            [12, 6],
            [11, 5],
            [3, 4],
            [0, 14],
            [1, 10],
            [18, 9]
            ]
            View Outputs Side By Side
            Input(s)
            {
            "k": 10,
            "tasks": [5, 6, 2, 3, 15, 15, 16, 19, 2, 10, 10, 3, 3, 32, 12, 1, 23, 32, 9, 2]
            }
         */

		this.current_test_name =
			'([5, 6, 2, 3, 15, 15, 16, 19, 2, 10, 10, 3, 3, 32, 12, 1, 23, 32, 9, 2], 10) => [[15, 17], [19, 13], [8, 16], [2, 7], [12, 6], [11, 5], [3, 4], [0, 14], [1, 10], [18, 9]]';
		const problemToTest = new this.Problem();
		assert.deepEqual(
			problemToTest.solve(
				[
					5, 6, 2, 3, 15, 15, 16, 19, 2, 10, 10, 3, 3, 32, 12, 1, 23,
					32, 9, 2
				],
				10
			),
			[
				[15, 17],
				[19, 13],
				[8, 16],
				[2, 7],
				[12, 6],
				[11, 5],
				[3, 4],
				[0, 14],
				[1, 10],
				[18, 9]
			]
		);
	}

	test_7() {
		/**
         * [
            [3, 7],
            [0, 6],
            [2, 5],
            [1, 4]
            ]
            View Outputs Side By Side
            Input(s)
            {
            "k": 4,
            "tasks": [1, 2, 2, 1, 3, 4, 4, 4]
            }
         */

		this.current_test_name =
			'([1, 2, 2, 1, 3, 4, 4, 4], 4) => [[3, 7], [0, 6], [2, 5], [1, 4]]';
		const problemToTest = new this.Problem();
		assert.deepEqual(problemToTest.solve([1, 2, 2, 1, 3, 4, 4, 4], 4), [
			[3, 7],
			[0, 6],
			[2, 5],
			[1, 4]
		]);
	}

	test_8() {
		/**
         * [
            [4, 5],
            [3, 0],
            [2, 1]
            ]
            View Outputs Side By Side
            Input(s)
            {
            "k": 3,
            "tasks": [87, 65, 43, 32, 31, 320]
            }
         */

		this.current_test_name =
			'([87, 65, 43, 32, 31, 320], 3) => [[4, 5], [3, 0], [2, 1]]';
		const problemToTest = new this.Problem();
		assert.deepEqual(problemToTest.solve([87, 65, 43, 32, 31, 320], 3), [
			[4, 5],
			[3, 0],
			[2, 1]
		]);
	}
}

class MaximumSubarray extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name = '([-2,1,-3,4,-1,2,1,-5,4]) => 6';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve([-2, 1, -3, 4, -1, 2, 1, -5, 4]), 6);
	}

	test_2() {
		this.current_test_name = '([1]) => 1';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve([1]), 1);
	}
}

class MergeTripletsToFormTargetTriplet extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name = '([[2,5,3],[1,8,4],[1,7,5]], [2,7,5]) => true';
		const problemToTest = new this.Problem();
		assert.equal(
			problemToTest.solve(
				[
					[2, 5, 3],
					[1, 8, 4],
					[1, 7, 5]
				],
				[2, 7, 5]
			),
			true
		);
	}

	test_2() {
		this.current_test_name = '([[1,3,4],[2,5,8]], [2,5,8]) => true';
		const problemToTest = new this.Problem();
		assert.equal(
			problemToTest.solve(
				[
					[1, 3, 4],
					[2, 5, 8]
				],
				[2, 5, 8]
			),
			true
		);
	}
}

class PartitionLabels extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name = "('ababcbacadefegdehijhklij') => [9,7,8]";
		const problemToTest = new this.Problem();
		assert.deepEqual(
			problemToTest.solve('ababcbacadefegdehijhklij'),
			[9, 7, 8]
		);
	}

	test_2() {
		this.current_test_name = "('caedbdedda') => [1,9]";
		const problemToTest = new this.Problem();
		assert.deepEqual(problemToTest.solve('caedbdedda'), [1, 9]);
	}
}

class ValidParenthesisString extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
		this.tests.push(() => this.test_4());
		this.tests.push(() => this.test_5());
	}

	test_1() {
		this.current_test_name = "('()') => true";
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve('()'), true);
	}

	test_2() {
		this.current_test_name = "('(*)') => true";
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve('(*)'), true);
	}

	test_3() {
		this.current_test_name = "('(*))') => true";
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve('(*))'), true);
	}

	test_4() {
		this.current_test_name = "'()*))' => false";
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve('()*))'), false);
	}

	test_5() {
		this.current_test_name = '((((*)) => false';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve('((((*))'), false);
	}
}

const TEST_DICTIONARY = {
	'class-photos': ClassPhotos,
	'minimum-waiting-time': MinimumWaitingTime,
	'gas-station': GasStation,
	'hand-of-straights': HandOfStraights,
	'task-assigment': TaskAssigment,
	'maximum-subarray': MaximumSubarray,
	'merge-triplets-to-form-target-triplet': MergeTripletsToFormTargetTriplet,
	'partition-labels': PartitionLabels,
	'valid-parenthesis-string': ValidParenthesisString
};

module.exports = TEST_DICTIONARY;
