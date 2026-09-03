const assert = require('assert');
const ProblemTests = require('./problem-test');
const maximizeExpression = require('../solutions/maximize-expression');
const { looselyDeepEqual } = require('../functions');
const { link } = require('fs');

function compareNestedLists(a, b) {
	if (typeof a !== typeof b) {
		return false;
	}

	if (Array.isArray(a)) {
		if (a.length !== b.length) {
			return false;
		}

		for (const x of a) {
			let found = false;
			for (const y of b) {
				if (compareNestedLists(x, y)) {
					found = true;
					break;
				}
			}
			if (!found) {
				return false;
			}
		}

		return true;
	}

	return a === b;
}

class SubarraySort extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
		this.tests.push(() => this.test_4());
		this.tests.push(() => this.test_5());
		this.tests.push(() => this.test_6());
		this.tests.push(() => this.test_7());
		this.tests.push(() => this.test_8());
		this.tests.push(() => this.test_9());
		this.tests.push(() => this.test_10());
	}

	test_1() {
		const subarraySort = new this.Problem();
		this.current_test_name = '[1,2,4,7,10,11,7,12,6,7,16,18,19] | [3,9]';
		assert.deepStrictEqual(
			subarraySort.solve([1, 2, 4, 7, 10, 11, 7, 12, 6, 7, 16, 18, 19]),
			[3, 9]
		);
	}

	test_2() {
		/**
         * 
         * [4, 6]
            View Outputs Side By Side
            Input(s)
            {
            "array": [1, 2, 4, 7, 10, 11, 7, 12, 13, 14, 16, 18, 19]
            }
         */
		const subarraySort = new this.Problem();
		this.current_test_name = '[1,2,4,7,10,11,7,12,13,14,16,18,19] | [4, 6]';
		assert.deepStrictEqual(
			subarraySort.solve([1, 2, 4, 7, 10, 11, 7, 12, 13, 14, 16, 18, 19]),
			[4, 6]
		);
	}

	test_3() {
		/**
         * [2, 4]
            View Outputs Side By Side
            Input(s)
            {
            "array": [1, 2, 8, 4, 5]
            }
         */

		const subarraySort = new this.Problem();
		this.current_test_name = '[1, 2, 8, 4, 5] | [2, 4]';
		assert.deepStrictEqual(subarraySort.solve([1, 2, 8, 4, 5]), [2, 4]);
	}

	test_4() {
		/**
         * [0, 12]
            View Outputs Side By Side
            Input(s)
            {
            "array": [4, 8, 7, 12, 11, 9, -1, 3, 9, 16, -15, 51, 7]
            }
         */

		const subarraySort = new this.Problem();
		this.current_test_name =
			'[4, 8, 7, 12, 11, 9, -1, 3, 9, 16, -15, 51, 7] | [0, 12]';
		assert.deepStrictEqual(
			subarraySort.solve([4, 8, 7, 12, 11, 9, -1, 3, 9, 16, -15, 51, 7]),
			[0, 12]
		);
	}

	test_5() {
		/**
         * [0, 11]
            View Outputs Side By Side
            Input(s)
            {
            "array": [4, 8, 7, 12, 11, 9, -1, 3, 9, 16, -15, 11, 57]
            }
         */

		const subarraySort = new this.Problem();
		this.current_test_name =
			'[4, 8, 7, 12, 11, 9, -1, 3, 9, 16, -15, 11, 57] | [0, 11]';
		assert.deepStrictEqual(
			subarraySort.solve([4, 8, 7, 12, 11, 9, -1, 3, 9, 16, -15, 11, 57]),
			[0, 11]
		);
	}

	test_6() {
		/**
         * [1, 11]
            View Outputs Side By Side
            Input(s)
            {
            "array": [-41, 8, 7, 12, 11, 9, -1, 3, 9, 16, -15, 11, 57]
            }
         */

		const subarraySort = new this.Problem();
		this.current_test_name =
			'[-41, 8, 7, 12, 11, 9, -1, 3, 9, 16, -15, 11, 57] | [1, 11]';
		assert.deepStrictEqual(
			subarraySort.solve([
				-41, 8, 7, 12, 11, 9, -1, 3, 9, 16, -15, 11, 57
			]),
			[1, 11]
		);
	}

	test_7() {
		/**
         * [1, 12]
            View Outputs Side By Side
            Input(s)
            {
            "array": [-41, 8, 7, 12, 11, 9, -1, 3, 9, 16, -15, 51, 7]
            }
         */

		const subarraySort = new this.Problem();
		this.current_test_name =
			'[-41, 8, 7, 12, 11, 9, -1, 3, 9, 16, -15, 51, 7] | [1, 12]';
		assert.deepStrictEqual(
			subarraySort.solve([
				-41, 8, 7, 12, 11, 9, -1, 3, 9, 16, -15, 51, 7
			]),
			[1, 12]
		);
	}

	test_8() {
		/**
         * [6, 7]
            View Outputs Side By Side
            Input(s)
            {
            "array": [1, 2, 3, 4, 5, 6, 8, 7, 9, 10, 11]
            }
         */

		const subarraySort = new this.Problem();
		this.current_test_name = '[1, 2, 3, 4, 5, 6, 8, 7, 9, 10, 11] | [6, 7]';
		assert.deepStrictEqual(
			subarraySort.solve([1, 2, 3, 4, 5, 6, 8, 7, 9, 10, 11]),
			[6, 7]
		);
	}

	test_9() {
		/**
         * [6, 16]
            View Outputs Side By Side
            Input(s)
            {
            "array": [1, 2, 3, 4, 5, 6, 18, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19]
            }
         */

		const subarraySort = new this.Problem();
		this.current_test_name =
			'[1, 2, 3, 4, 5, 6, 18, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19] | [6, 16]';
		assert.deepStrictEqual(
			subarraySort.solve([
				1, 2, 3, 4, 5, 6, 18, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19
			]),
			[6, 16]
		);
	}

	test_10() {
		/**
         * [4, 24]
            View Outputs Side By Side
            Input(s)
            {
            "array": [1, 2, 3, 4, 5, 6, 18, 21, 22, 7, 14, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 4, 14, 11, 6, 33, 35, 41, 55]
            }
         */

		const subarraySort = new this.Problem();
		this.current_test_name =
			'[1, 2, 3, 4, 5, 6, 18, 21, 22, 7, 14, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 4, 14, 11, 6, 33, 35, 41, 55] | [4, 24]';
		assert.deepStrictEqual(
			subarraySort.solve([
				1, 2, 3, 4, 5, 6, 18, 21, 22, 7, 14, 9, 10, 11, 12, 13, 14, 15,
				16, 17, 19, 4, 14, 11, 6, 33, 35, 41, 55
			]),
			[4, 24]
		);
	}
}

class MinRewards extends ProblemTests {
	constructor(Problem) {
		super(Problem);

		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
		this.tests.push(() => this.test_4());
		this.tests.push(() => this.test_5());
		this.tests.push(() => this.test_6());
		this.tests.push(() => this.test_7());
		this.tests.push(() => this.test_8());
		this.tests.push(() => this.test_9());
	}

	test_1() {
		/**
         * 25
            View Outputs Side By Side
            Input(s)
            {
            "scores": [8, 4, 2, 1, 3, 6, 7, 9, 5]
            }
         */

		const minRewards = new this.Problem();
		this.current_test_name = '[8, 4, 2, 1, 3, 6, 7, 9, 5] | 25';
		assert.equal(minRewards.solve([8, 4, 2, 1, 3, 6, 7, 9, 5]), 25);
	}

	test_2() {
		/**
         * 1
            View Outputs Side By Side
            Input(s)
            {
            "scores": [1]
            }
         */

		const minRewards = new this.Problem();
		this.current_test_name = '[1] | 1';
		assert.equal(minRewards.solve([1]), 1);
	}

	test_3() {
		/**
         * 
         * 3
            View Outputs Side By Side
            Input(s)
            {
            "scores": [5, 10]
            }
         */

		const minRewards = new this.Problem();
		this.current_test_name = '[5, 10] | 3';
		assert.equal(minRewards.solve([5, 10]), 3);
	}

	test_4() {
		/**
         * 3
            View Outputs Side By Side
            Input(s)
            {
            "scores": [10, 5]
            }
         */

		const minRewards = new this.Problem();
		this.current_test_name = '[10, 5] | 3';
		assert.equal(minRewards.solve([10, 5]), 3);
	}

	test_5() {
		/**
         * 8
            View Outputs Side By Side
            Input(s)
            {
            "scores": [4, 2, 1, 3]
            }
         */

		const minRewards = new this.Problem();
		this.current_test_name = '[4, 2, 1, 3] | 8';
		assert.equal(minRewards.solve([4, 2, 1, 3]), 8);
	}

	test_6() {
		/**
         * 9
            View Outputs Side By Side
            Input(s)
            {
            "scores": [0, 4, 2, 1, 3]
            }
         */

		const minRewards = new this.Problem();
		this.current_test_name = '[0, 4, 2, 1, 3] | 9';
		assert.equal(minRewards.solve([0, 4, 2, 1, 3]), 9);
	}

	test_7() {
		/**
         * 52
            View Outputs Side By Side
            Input(s)
            {
            "scores": [2, 20, 13, 12, 11, 8, 4, 3, 1, 5, 6, 7, 9, 0]
            }
         */

		const minRewards = new this.Problem();
		this.current_test_name =
			'[2, 20, 13, 12, 11, 8, 4, 3, 1, 5, 6, 7, 9, 0] | 52';
		assert.equal(
			minRewards.solve([2, 20, 13, 12, 11, 8, 4, 3, 1, 5, 6, 7, 9, 0]),
			52
		);
	}

	test_8() {
		/**
         * 15
            View Outputs Side By Side
            Input(s)
            {
            "scores": [2, 1, 4, 3, 6, 5, 8, 7, 10, 9]
            }
         */

		const minRewards = new this.Problem();
		this.current_test_name = '[2, 1, 4, 3, 6, 5, 8, 7, 10, 9] | 15';
		assert.equal(minRewards.solve([2, 1, 4, 3, 6, 5, 8, 7, 10, 9]), 15);
	}

	test_9() {
		/**
         * 93
            View Outputs Side By Side
            Input(s)
            {
            "scores": [800, 400, 20, 10, 30, 61, 70, 90, 17, 21, 22, 13, 12, 11, 8, 4, 2, 1, 3, 6, 7, 9, 0, 68, 55, 67, 57, 60, 51, 661, 50, 65, 53]
            }
         */

		const minRewards = new this.Problem();
		this.current_test_name =
			'[800, 400, 20, 10, 30, 61, 70, 90, 17, 21, 22, 13, 12, 11, 8, 4, 2, 1, 3, 6, 7, 9, 0, 68, 55, 67, 57, 60, 51, 661, 50, 65, 53] | 93';
		assert.equal(
			minRewards.solve([
				800, 400, 20, 10, 30, 61, 70, 90, 17, 21, 22, 13, 12, 11, 8, 4,
				2, 1, 3, 6, 7, 9, 0, 68, 55, 67, 57, 60, 51, 661, 50, 65, 53
			]),
			93
		);
	}
}

class zigzagTraverse extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
		this.tests.push(() => this.test_4());
		this.tests.push(() => this.test_5());
		this.tests.push(() => this.test_6());
		this.tests.push(() => this.test_7());
		this.tests.push(() => this.test_8());
		this.tests.push(() => this.test_9());
		this.tests.push(() => this.test_10());
	}

	test_1() {
		/**
         * [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
            View Outputs Side By Side
            Input(s)
            {
            "array": [
                [1, 3, 4, 10],
                [2, 5, 9, 11],
                [6, 8, 12, 15],
                [7, 13, 14, 16]
            ]
            }
         */

		const zigzagTraverse = new this.Problem();
		this.current_test_name =
			'[[1, 3, 4, 10], [2, 5, 9, 11], [6, 8, 12, 15], [7, 13, 14, 16]] | [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]';
		assert.deepStrictEqual(
			zigzagTraverse.solve([
				[1, 3, 4, 10],
				[2, 5, 9, 11],
				[6, 8, 12, 15],
				[7, 13, 14, 16]
			]),
			[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
		);
	}

	test_2() {
		/**
         * [1]
            View Outputs Side By Side
            Input(s)
            {
            "array": [
                [1]
            ]
            }
         */

		const zigzagTraverse = new this.Problem();
		this.current_test_name = '[[1]] | [1]';
		assert.deepStrictEqual(zigzagTraverse.solve([[1]]), [1]);
	}

	test_3() {
		/**
         * [1, 2, 3, 4, 5]
            View Outputs Side By Side
            Input(s)
            {
            "array": [
                [1, 2, 3, 4, 5]
            ]
            }
         */

		const zigzagTraverse = new this.Problem();
		this.current_test_name = '[[1, 2, 3, 4, 5]] | [1, 2, 3, 4, 5]';
		assert.deepStrictEqual(
			zigzagTraverse.solve([[1, 2, 3, 4, 5]]),
			[1, 2, 3, 4, 5]
		);
	}

	test_4() {
		/**
         * [1, 2, 3, 4, 5]
            View Outputs Side By Side
            Input(s)
            {
            "array": [
                [1],
                [2],
                [3],
                [4],
                [5]
            ]
            }
         */

		const zigzagTraverse = new this.Problem();
		this.current_test_name = '[[1], [2], [3], [4], [5]] | [1, 2, 3, 4, 5]';
		assert.deepStrictEqual(
			zigzagTraverse.solve([[1], [2], [3], [4], [5]]),
			[1, 2, 3, 4, 5]
		);
	}

	test_5() {
		/**
         * [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            View Outputs Side By Side
            Input(s)
            {
            "array": [
                [1, 3],
                [2, 4],
                [5, 7],
                [6, 8],
                [9, 10]
            ]
            }
         */

		const zigzagTraverse = new this.Problem();
		this.current_test_name =
			'[[1, 3], [2, 4], [5, 7], [6, 8], [9, 10]] | [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]';
		assert.deepStrictEqual(
			zigzagTraverse.solve([
				[1, 3],
				[2, 4],
				[5, 7],
				[6, 8],
				[9, 10]
			]),
			[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
		);
	}

	test_6() {
		/**
         * [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            View Outputs Side By Side
            Input(s)
            {
            "array": [
                [1, 3, 4, 7, 8],
                [2, 5, 6, 9, 10]
            ]
            }
         */

		const zigzagTraverse = new this.Problem();
		this.current_test_name =
			'[[1, 3, 4, 7, 8], [2, 5, 6, 9, 10]] | [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]';
		assert.deepStrictEqual(
			zigzagTraverse.solve([
				[1, 3, 4, 7, 8],
				[2, 5, 6, 9, 10]
			]),
			[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
		);
	}

	test_7() {
		/**
         * [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
            View Outputs Side By Side
            Input(s)
            {
            "array": [
                [1, 3, 4, 10, 11],
                [2, 5, 9, 12, 19],
                [6, 8, 13, 18, 20],
                [7, 14, 17, 21, 24],
                [15, 16, 22, 23, 25]
            ]
            }
         */

		const zigzagTraverse = new this.Problem();
		this.current_test_name =
			'[[1, 3, 4, 10, 11], [2, 5, 9, 12, 19], [6, 8, 13, 18, 20], [7, 14, 17, 21, 24], [15, 16, 22, 23, 25]] | [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]';
		assert.deepStrictEqual(
			zigzagTraverse.solve([
				[1, 3, 4, 10, 11],
				[2, 5, 9, 12, 19],
				[6, 8, 13, 18, 20],
				[7, 14, 17, 21, 24],
				[15, 16, 22, 23, 25]
			]),
			[
				1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
				19, 20, 21, 22, 23, 24, 25
			]
		);
	}

	test_8() {
		/**
         * [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
            View Outputs Side By Side
            Input(s)
            {
            "array": [
                [1, 3, 4, 10, 11, 20],
                [2, 5, 9, 12, 19, 21],
                [6, 8, 13, 18, 22, 27],
                [7, 14, 17, 23, 26, 28],
                [15, 16, 24, 25, 29, 30]
            ]
            }
         */

		const zigzagTraverse = new this.Problem();
		this.current_test_name =
			'[[1, 3, 4, 10, 11, 20], [2, 5, 9, 12, 19, 21], [6, 8, 13, 18, 22, 27], [7, 14, 17, 23, 26, 28], [15, 16, 24, 25, 29, 30]] | [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]';
		assert.deepStrictEqual(
			zigzagTraverse.solve([
				[1, 3, 4, 10, 11, 20],
				[2, 5, 9, 12, 19, 21],
				[6, 8, 13, 18, 22, 27],
				[7, 14, 17, 23, 26, 28],
				[15, 16, 24, 25, 29, 30]
			]),
			[
				1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
				19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
			]
		);
	}

	test_9() {
		/**
         * [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
            View Outputs Side By Side
            Input(s)
            {
            "array": [
                [1, 3, 4, 10, 11],
                [2, 5, 9, 12, 20],
                [6, 8, 13, 19, 21],
                [7, 14, 18, 22, 27],
                [15, 17, 23, 26, 28],
                [16, 24, 25, 29, 30]
            ]
            }
         */

		const zigzagTraverse = new this.Problem();
		this.current_test_name =
			'[[1, 3, 4, 10, 11], [2, 5, 9, 12, 20], [6, 8, 13, 19, 21], [7, 14, 18, 22, 27], [15, 17, 23, 26, 28], [16, 24, 25, 29, 30]] | [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]';
		assert.deepStrictEqual(
			zigzagTraverse.solve([
				[1, 3, 4, 10, 11],
				[2, 5, 9, 12, 20],
				[6, 8, 13, 19, 21],
				[7, 14, 18, 22, 27],
				[15, 17, 23, 26, 28],
				[16, 24, 25, 29, 30]
			]),
			[
				1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
				19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
			]
		);
	}

	test_10() {
		/**
         * [1, 10, 21, -3, 11, 6, 7, 8, 112, 4, 15, 12, 113, 2, 15, 16, 17, 18, 19, 20, 6, -7, -1, 21, 22, 23, 24, 27, 226, -27, 0, -2, 88, 9, -3, 0, 12, 28, 299, 30, -28, 32, 0, -4, 0, -111, -226, 29, 32, -23, 66, -17, 31, 88]
            View Outputs Side By Side
            Input(s)
            {
            "array": [
                [1, 21, -3, 4, 15, 6, -7, 88, 9],
                [10, 11, 112, 12, 20, -1, -2, -3, -4],
                [6, 8, 113, 19, 21, 0, 0, 0, 0],
                [7, 2, 18, 22, -27, 12, 32, -111, 66],
                [15, 17, 23, 226, 28, -28, -226, -23, -17],
                [16, 24, 27, 299, 30, 29, 32, 31, 88]
            ]
            }
         */

		const zigzagTraverse = new this.Problem();
		this.current_test_name =
			'[[1, 21, -3, 4, 15, 6, -7, 88, 9], [10, 11, 112, 12, 20, -1, -2, -3, -4], [6, 8, 113, 19, 21, 0, 0, 0, 0], [7, 2, 18, 22, -27, 12, 32, -111, 66], [15, 17, 23, 226, 28, -28, -226, -23, -17], [16, 24, 27, 299, 30, 29, 32, 31, 88]] | [1, 10, 21, -3, 11, 6, 7, 8, 112, 4, 15, 12, 113, 2, 15, 16, 17, 18, 19, 20, 6, -7, -1, 21, 22, 23, 24, 27, 226, -27, 0, -2, 88, 9, -3, 0, 12, 28, 299, 30, -28, 32, 0, -4, 0, -111, -226, 29, 32, -23, 66, -17, 31, 88]';
		assert.deepStrictEqual(
			zigzagTraverse.solve([
				[1, 21, -3, 4, 15, 6, -7, 88, 9],
				[10, 11, 112, 12, 20, -1, -2, -3, -4],
				[6, 8, 113, 19, 21, 0, 0, 0, 0],
				[7, 2, 18, 22, -27, 12, 32, -111, 66],
				[15, 17, 23, 226, 28, -28, -226, -23, -17],
				[16, 24, 27, 299, 30, 29, 32, 31, 88]
			]),
			[
				1, 10, 21, -3, 11, 6, 7, 8, 112, 4, 15, 12, 113, 2, 15, 16, 17,
				18, 19, 20, 6, -7, -1, 21, 22, 23, 24, 27, 226, -27, 0, -2, 88,
				9, -3, 0, 12, 28, 299, 30, -28, 32, 0, -4, 0, -111, -226, 29,
				32, -23, 66, -17, 31, 88
			]
		);
	}
}

class SameBsts extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
		this.tests.push(() => this.test_4());
		this.tests.push(() => this.test_5());
		this.tests.push(() => this.test_6());
		this.tests.push(() => this.test_7());
		this.tests.push(() => this.test_8());
		this.tests.push(() => this.test_9());
		this.tests.push(() => this.test_10());
	}

	test_1() {
		const sameBsts = new this.Problem();
		this.current_test_name =
			'[10,15,8,12,94,81,5,2,11] | [10,8,5,15,2,12,11,94,81] | true';
		assert.equal(
			sameBsts.solve(
				[10, 15, 8, 12, 94, 81, 5, 2, 11],
				[10, 8, 5, 15, 2, 12, 11, 94, 81]
			),
			true
		);
	}

	test_2() {
		const sameBsts = new this.Problem();
		this.current_test_name =
			'[10,15,8,12,94,81,5,2,11] | [10,8,5,15,2,12,11,94,81,100] | false';
		assert.equal(
			sameBsts.solve(
				[10, 15, 8, 12, 94, 81, 5, 2, 11],
				[10, 8, 5, 15, 2, 12, 11, 94, 81, 100]
			),
			false
		);
	}

	test_3() {
		const sameBsts = new this.Problem();
		this.current_test_name =
			'[10,15,8,12,94,81,5,2,11] | [10,8,5,15,2,12,11,94,81,100] | false';
		assert.equal(
			sameBsts.solve(
				[10, 15, 8, 12, 94, 81, 5, 2, 11],
				[10, 8, 5, 15, 2, 12, 11, 94, 81, 100]
			),
			false
		);
	}

	test_4() {
		/**
         * true
            View Outputs Side By Side
            Input(s)
            {
            "arrayOne": [1, 2, 3, 4, 5, 6, 7],
            "arrayTwo": [1, 2, 3, 4, 5, 6, 7]
            }
         */

		const sameBsts = new this.Problem();
		this.current_test_name =
			'[1, 2, 3, 4, 5, 6, 7] | [1, 2, 3, 4, 5, 6, 7] | true';
		assert.equal(
			sameBsts.solve([1, 2, 3, 4, 5, 6, 7], [1, 2, 3, 4, 5, 6, 7]),
			true
		);
	}

	test_5() {
		/**
         * true
            View Outputs Side By Side
            Input(s)
            {
            "arrayOne": [7, 6, 5, 4, 3, 2, 1],
            "arrayTwo": [7, 6, 5, 4, 3, 2, 1]
            }
         */

		const sameBsts = new this.Problem();
		this.current_test_name =
			'[7, 6, 5, 4, 3, 2, 1] | [7, 6, 5, 4, 3, 2, 1] | true';
		assert.equal(
			sameBsts.solve([7, 6, 5, 4, 3, 2, 1], [7, 6, 5, 4, 3, 2, 1]),
			true
		);
	}

	test_6() {
		/**
         * true
            View Outputs Side By Side
            Input(s)
            {
            "arrayOne": [10, 15, 8, 12, 94, 81, 5, 2],
            "arrayTwo": [10, 8, 5, 15, 2, 12, 94, 81]
            }
         */

		const sameBsts = new this.Problem();
		this.current_test_name =
			'[10, 15, 8, 12, 94, 81, 5, 2] | [10, 8, 5, 15, 2, 12, 94, 81] | true';
		assert.equal(
			sameBsts.solve(
				[10, 15, 8, 12, 94, 81, 5, 2],
				[10, 8, 5, 15, 2, 12, 94, 81]
			),
			true
		);
	}

	test_7() {
		/**
         * false
            View Outputs Side By Side
            Input(s)
            {
            "arrayOne": [10, 15, 8, 12, 94, 81, 5, 2],
            "arrayTwo": [11, 8, 5, 15, 2, 12, 94, 81]
            }
         */

		const sameBsts = new this.Problem();
		this.current_test_name =
			'[10, 15, 8, 12, 94, 81, 5, 2] | [11, 8, 5, 15, 2, 12, 94, 81] | false';
		assert.equal(
			sameBsts.solve(
				[10, 15, 8, 12, 94, 81, 5, 2],
				[11, 8, 5, 15, 2, 12, 94, 81]
			),
			false
		);
	}

	test_8() {
		/**
         * true
        View Outputs Side By Side
        Input(s)
        {
        "arrayOne": [10, 15, 8, 12, 94, 81, 5, 2, -1, 100, 45, 12, 8, -1, 8, 2, -34],
        "arrayTwo": [10, 8, 5, 15, 2, 12, 94, 81, -1, -1, -34, 8, 2, 8, 12, 45, 100]
        }
        */

		const sameBsts = new this.Problem();
		this.current_test_name =
			'[10, 15, 8, 12, 94, 81, 5, 2, -1, 100, 45, 12, 8, -1, 8, 2, -34] | [10, 8, 5, 15, 2, 12, 94, 81, -1, -1, -34, 8, 2, 8, 12, 45, 100] | true';
		assert.equal(
			sameBsts.solve(
				[
					10, 15, 8, 12, 94, 81, 5, 2, -1, 100, 45, 12, 8, -1, 8, 2,
					-34
				],
				[10, 8, 5, 15, 2, 12, 94, 81, -1, -1, -34, 8, 2, 8, 12, 45, 100]
			),
			true
		);
	}

	test_9() {
		/**
         * false
            View Outputs Side By Side
            Input(s)
            {
            "arrayOne": [10, 15, 8, 12, 94, 81, 5, 2, -1, 101, 45, 12, 8, -1, 8, 2, -34],
            "arrayTwo": [10, 8, 5, 15, 2, 12, 94, 81, -1, -1, -34, 8, 2, 8, 12, 45, 100]
            }
         */

		const sameBsts = new this.Problem();
		this.current_test_name =
			'[10, 15, 8, 12, 94, 81, 5, 2, -1, 101, 45, 12, 8, -1, 8, 2, -34] | [10, 8, 5, 15, 2, 12, 94, 81, -1, -1, -34, 8, 2, 8, 12, 45, 100] | false';
		assert.equal(
			sameBsts.solve(
				[
					10, 15, 8, 12, 94, 81, 5, 2, -1, 101, 45, 12, 8, -1, 8, 2,
					-34
				],
				[10, 8, 5, 15, 2, 12, 94, 81, -1, -1, -34, 8, 2, 8, 12, 45, 100]
			),
			false
		);
	}

	test_10() {
		/**
         * false
            View Outputs Side By Side
            Input(s)
            {
            "arrayOne": [5, 2, -1, 100, 45, 12, 8, -1, 8, 10, 15, 8, 12, 94, 81, 2, -34],
            "arrayTwo": [5, 8, 10, 15, 2, 8, 12, 45, 100, 2, 12, 94, 81, -1, -1, -34, 8]
            }
         */

		const sameBsts = new this.Problem();
		this.current_test_name =
			'[5, 2, -1, 100, 45, 12, 8, -1, 8, 10, 15, 8, 12, 94, 81, 2, -34] | [5, 8, 10, 15, 2, 8, 12, 45, 100, 2, 12, 94, 81, -1, -1, -34, 8] | false';
		assert.equal(
			sameBsts.solve(
				[
					5, 2, -1, 100, 45, 12, 8, -1, 8, 10, 15, 8, 12, 94, 81, 2,
					-34
				],
				[5, 8, 10, 15, 2, 8, 12, 45, 100, 2, 12, 94, 81, -1, -1, -34, 8]
			),
			false
		);
	}
}

class BST {
	constructor(value) {
		this.value = value;
		this.left = null;
		this.right = null;
	}
}
class validateThreeNodes extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
		this.tests.push(() => this.test_4());
		this.tests.push(() => this.test_5());
		this.tests.push(() => this.test_6());
		this.tests.push(() => this.test_7());
		this.tests.push(() => this.test_8());
		this.tests.push(() => this.test_9());
		this.tests.push(() => this.test_10());
	}

	test_1() {
		/**
         * true
            View Outputs Side By Side
            Input(s)
            {
                 "nodeOne": "5",
                "nodeThree": "3",
                "nodeTwo": "2",
            "tree": {
                "nodes": [
                {"id": "0", "left": null, "right": null, "value": 0},
                {"id": "1", "left": "0", "right": null, "value": 1},
                {"id": "2", "left": "1", "right": "4", "value": 2},
                {"id": "3", "left": null, "right": null, "value": 3},
                {"id": "4", "left": "3", "right": null, "value": 4},
                {"id": "5", "left": "2", "right": "7", "value": 5},
                {"id": "6", "left": null, "right": null, "value": 6},
                {"id": "7", "left": "6", "right": "8", "value": 7},
                {"id": "8", "left": null, "right": null, "value": 8}
                ],
                "root": "5"
            }
            }
         */

		const validateThreeNodes = new this.Problem();

		const tree = new BST(5);
		tree.left = new BST(2);
		tree.left.left = new BST(1);
		tree.left.left.left = new BST(0);
		tree.left.right = new BST(3);
		tree.right = new BST(7);
		tree.right.left = new BST(6);
		tree.right.right = new BST(8);

		// Nodes you mentioned in the comment
		const nodeOne = tree; // Value: 5
		const nodeTwo = tree.left; // Value: 2
		const nodeThree = tree.left.right; // Value: 3
		this.current_test_name = '5 | 3 | 2 | true';
		assert.equal(
			validateThreeNodes.solve(nodeOne, nodeTwo, nodeThree),
			true
		);

		// this.current_test_name = '5 | 3 | 2 | true';
		// assert.equal(validateThreeNodes.solve(tree, 5, 3, 2), true);
	}

	test_2() {
		/**
         * false
            View Outputs Side By Side
            Input(s)
            {
            "nodeOne": "5",
            "nodeThree": "1",
            "nodeTwo": "8",
            "tree": {
                "nodes": [
                {"id": "0", "left": null, "right": null, "value": 0},
                {"id": "1", "left": "0", "right": null, "value": 1},
                {"id": "2", "left": "1", "right": null, "value": 2},
                {"id": "3", "left": "2", "right": "4", "value": 3},
                {"id": "4", "left": null, "right": null, "value": 4},
                {"id": "5", "left": "3", "right": "7", "value": 5},
                {"id": "6", "left": null, "right": null, "value": 6},
                {"id": "7", "left": "6", "right": "8", "value": 7},
                {"id": "8", "left": null, "right": null, "value": 8}
                ],
                "root": "5"
            }
            }
         */

		const validateThreeNodes = new this.Problem();
		const tree = new BST(5);
		tree.left = new BST(3);
		tree.left.left = new BST(2);
		tree.left.left.left = new BST(1);
		tree.left.left.left.left = new BST(0);
		tree.left.right = new BST(4);
		tree.right = new BST(7);
		tree.right.left = new BST(6);
		tree.right.right = new BST(8);

		const nodeOne = tree;
		const nodeTwo = tree.left.left.left;
		const nodeThree = tree.left.left;

		this.current_test_name = '5 | 1 | 8 | false';
		assert.equal(
			validateThreeNodes.solve(nodeOne, nodeTwo, nodeThree),
			false
		);
	}

	test_3() {
		/**
         * false
            View Outputs Side By Side
            Input(s)
            {
            "nodeOne": "8",
            "nodeThree": "2",
            "nodeTwo": "5",
            "tree": {
                "nodes": [
                {"id": "0", "left": null, "right": null, "value": 0},
                {"id": "1", "left": "0", "right": null, "value": 1},
                {"id": "2", "left": "1", "right": null, "value": 2},
                {"id": "3", "left": "2", "right": "4", "value": 3},
                {"id": "4", "left": null, "right": null, "value": 4},
                {"id": "5", "left": "3", "right": "7", "value": 5},
                {"id": "6", "left": null, "right": null, "value": 6},
                {"id": "7", "left": "6", "right": "8", "value": 7},
                {"id": "8", "left": null, "right": null, "value": 8}
                ],
                "root": "5"
            }
            }
         */

		const validateThreeNodes = new this.Problem();
		const tree = new BST(5);
		tree.left = new BST(3);
		tree.left.left = new BST(2);
		tree.left.left.left = new BST(1);
		tree.left.left.left.left = new BST(0);
		tree.left.right = new BST(4);
		tree.right = new BST(7);
		tree.right.left = new BST(6);
		tree.right.right = new BST(8);

		const nodeOne = tree.right.right;
		const nodeTwo = tree.left;
		const nodeThree = tree.left.left;

		this.current_test_name = '8 | 2 | 5 | false';
		assert.equal(
			validateThreeNodes.solve(nodeOne, nodeTwo, nodeThree),
			false
		);
	}

	test_4() {
		const validateThreeNodes = new this.Problem();

		/**
         * 
         *       
      2
       \
        3
         \
          4
           \
            5
             \
              6
               \
                7
                 \
                  8
                   \
                    9
         * true
        View Outputs Side By Side
        Input(s)
        {
          "nodeOne": "2",
          "nodeThree": "8",
          "nodeTwo": "5",
          "tree": {
            "nodes": [
              {"id": "1", "left": null, "right": null, "value": 1},
              {"id": "2", "left": "1", "right": "3", "value": 2},
              {"id": "3", "left": null, "right": "4", "value": 3},
              {"id": "4", "left": null, "right": "5", "value": 4},
              {"id": "5", "left": null, "right": "6", "value": 5},
              {"id": "6", "left": null, "right": "7", "value": 6},
              {"id": "7", "left": null, "right": "8", "value": 7},
              {"id": "8", "left": null, "right": "9", "value": 8},
              {"id": "9", "left": null, "right": null, "value": 9}
            ],
            "root": "2"
          }
        }
         */

		const tree = new BST(2);
		tree.right = new BST(3);
		tree.right.right = new BST(4);
		tree.right.right.right = new BST(5);
		tree.right.right.right.right = new BST(6);
		tree.right.right.right.right.right = new BST(7);
		tree.right.right.right.right.right.right = new BST(8);
		tree.right.right.right.right.right.right.right = new BST(9);

		// Nodes you mentioned in the comment
		const nodeOne = tree; // Value: 2
		const nodeTwo = tree.right.right.right; // Value: 5
		const nodeThree = tree.right.right.right.right.right.right; // Value: 8

		this.current_test_name = '2 | 5 | 8 | true';
		assert.equal(
			validateThreeNodes.solve(nodeOne, nodeTwo, nodeThree),
			true
		);
	}

	test_5() {
		/**
         6
       / \
      4   8
     /   / \
    3   7   9
   /
  1
   \
    2

         * true
            View Outputs Side By Side
            Input(s)
            {
            "nodeOne": "4",
            "nodeThree": "2",
            "nodeTwo": "1",
            "tree": {
                "nodes": [
                {"id": "1", "left": null, "right": "2", "value": 1},
                {"id": "2", "left": null, "right": null, "value": 2},
                {"id": "3", "left": "1", "right": null, "value": 3},
                {"id": "4", "left": "3", "right": null, "value": 4},
                {"id": "5", "left": null, "right": "5", "value": 5},
                {"id": "6", "left": "4", "right": "8", "value": 6},
                {"id": "7", "left": null, "right": null, "value": 7},
                {"id": "8", "left": "7", "right": "9", "value": 8},
                {"id": "9", "left": null, "right": null, "value": 9}
                ],
                "root": "6"
            }
            }
         */

		const validateThreeNodes = new this.Problem();
		const tree = {
			value: 6,
			left: {
				value: 4,
				left: {
					value: 3,
					left: {
						value: 1,
						left: null,
						right: {
							value: 2,
							left: null,
							right: null
						}
					},
					right: null
				},
				right: null
			},
			right: {
				value: 8,
				left: {
					value: 7,
					left: null,
					right: null
				},
				right: {
					value: 9,
					left: null,
					right: null
				}
			}
		};

		// Nodes you mentioned in the comment
		const nodeOne = tree.left; // Value: 4
		const nodeTwo = tree.left.left.left; // Value: 1
		const nodeThree = tree.left.left.left.right; // Value: 2

		this.current_test_name = '1 | 4 | 2 | true';
		assert.equal(
			validateThreeNodes.solve(nodeOne, nodeTwo, nodeThree),
			true
		);
	}

	test_6() {
		/**
         * false
            View Outputs Side By Side
            Input(s)
            {
            "nodeOne": "1",
            "nodeThree": "3",
            "nodeTwo": "2",
            "tree": {
                "nodes": [
                {"id": "1", "left": null, "right": null, "value": 1},
                {"id": "2", "left": "1", "right": "3", "value": 2},
                {"id": "3", "left": null, "right": "4", "value": 3},
                {"id": "4", "left": null, "right": null, "value": 4}
                ],
                "root": "2"
            }
            }
         */

		const validateThreeNodes = new this.Problem();

		const tree = new BST(2);
		tree.left = new BST(1);
		tree.right = new BST(3);
		tree.right.right = new BST(4);

		const nodeOne = tree.left;
		const nodeTwo = tree;
		const nodeThree = tree.right;

		this.current_test_name = '1 | 2 | 3 | false';
		assert.equal(
			validateThreeNodes.solve(nodeOne, nodeTwo, nodeThree),
			false
		);
	}

	test_7() {
		/**
         * false
            View Outputs Side By Side
            Input(s)
            {
            "nodeOne": "2",
            "nodeThree": "13",
            "nodeTwo": "4",
            "tree": {
                "nodes": [
                {"id": "1", "left": null, "right": null, "value": 1},
                {"id": "2", "left": "1", "right": null, "value": 2},
                {"id": "3", "left": "2", "right": null, "value": 3},
                {"id": "4", "left": "3", "right": "5", "value": 4},
                {"id": "5", "left": null, "right": "7", "value": 5},
                {"id": "6", "left": null, "right": null, "value": 6},
                {"id": "7", "left": "6", "right": null, "value": 7},
                {"id": "8", "left": "4", "right": "10", "value": 8},
                {"id": "9", "left": null, "right": null, "value": 9},
                {"id": "10", "left": "9", "right": "14", "value": 10},
                {"id": "11", "left": null, "right": null, "value": 11},
                {"id": "12", "left": "11", "right": "13", "value": 12},
                {"id": "13", "left": null, "right": null, "value": 13},
                {"id": "14", "left": "12", "right": null, "value": 14}
                ],
                "root": "8"
            }
            }
         */

		const validateThreeNodes = new this.Problem();

		const tree = new BST(8);
		tree.left = new BST(4);
		tree.left.left = new BST(3);
		tree.left.left.left = new BST(2);
		tree.left.left.left.left = new BST(1);
		tree.left.right = new BST(5);
		tree.left.right.right = new BST(7);
		tree.left.right.right.left = new BST(6);
		tree.right = new BST(10);
		tree.right.left = new BST(9);
		tree.right.right = new BST(14);
		tree.right.right.left = new BST(12);
		tree.right.right.left.left = new BST(11);
		tree.right.right.left.right = new BST(13);
		tree.right.right.right = new BST(14);

		const nodeOne = tree.left.left.left;
		const nodeTwo = tree.left;
		const nodeThree = tree.right.right.left.right;

		this.current_test_name = '1 | 4 | 13 | false';
		assert.equal(
			validateThreeNodes.solve(nodeOne, nodeTwo, nodeThree),
			false
		);
	}

	test_8() {
		/**
         * true
            View Outputs Side By Side
            Input(s)
            {
            "nodeOne": "8",
            "nodeThree": "1",
            "nodeTwo": "7",
            "tree": {
                "nodes": [
                {"id": "1", "left": null, "right": null, "value": 1},
                {"id": "2", "left": "1", "right": null, "value": 2},
                {"id": "3", "left": "2", "right": null, "value": 3},
                {"id": "4", "left": "3", "right": null, "value": 4},
                {"id": "5", "left": "4", "right": null, "value": 5},
                {"id": "6", "left": "5", "right": null, "value": 6},
                {"id": "7", "left": "6", "right": null, "value": 7},
                {"id": "8", "left": "7", "right": "9", "value": 8},
                {"id": "9", "left": null, "right": null, "value": 9}
                ],
                "root": "8"
            }
            }
         */

		const validateThreeNodes = new this.Problem();

		const tree = new BST(8);
		tree.left = new BST(7);
		tree.left.left = new BST(6);
		tree.left.left.left = new BST(5);
		tree.left.left.left.left = new BST(4);
		tree.left.left.left.left.left = new BST(3);
		tree.left.left.left.left.left.left = new BST(2);
		tree.left.left.left.left.left.left.left = new BST(1);
		tree.right = new BST(9);

		const nodeOne = tree.left.left.left.left.left.left.left;
		const nodeTwo = tree.left.left.left.left.left.left;
		const nodeThree = tree.left.left.left.left.left;

		this.current_test_name = '1 | 7 | 6 | true';
		assert.equal(
			validateThreeNodes.solve(nodeOne, nodeTwo, nodeThree),
			true
		);
	}

	test_9() {
		/**
         * false
            View Outputs Side By Side
            Input(s)
            {
            "nodeOne": "2",
            "nodeThree": "3",
            "nodeTwo": "1",
            "tree": {
                "nodes": [
                {"id": "1", "left": null, "right": null, "value": 1},
                {"id": "2", "left": "1", "right": null, "value": 2},
                {"id": "3", "left": "2", "right": null, "value": 3}
                ],
                "root": "3"
                }
            }
         */

		const validateThreeNodes = new this.Problem();

		const tree = {
			value: 3,
			left: {
				value: 2,
				left: {
					value: 1,
					left: null,
					right: null
				},
				right: null
			},
			right: null
		};

		// Nodes you mentioned in the comment
		const nodeOne = tree.left; // Value: 2
		const nodeTwo = tree.left.left; // Value: 1
		const nodeThree = tree; // Value: 3

		this.current_test_name = '1 | 2 | 3 | false';
		assert.equal(
			validateThreeNodes.solve(nodeOne, nodeTwo, nodeThree),
			false
		);
	}

	test_10() {
		/**
         * true
            View Outputs Side By Side
            Input(s)
            {
            "nodeOne": "1",
            "nodeThree": "3",
            "nodeTwo": "2",
            "tree": {
                "nodes": [
                {"id": "1", "left": null, "right": null, "value": 1},
                {"id": "2", "left": "1", "right": null, "value": 2},
                {"id": "3", "left": "2", "right": null, "value": 3}
                ],
                "root": "3"
            }
            }
         */

		const validateThreeNodes = new this.Problem();

		const tree = new BST(3);
		tree.left = new BST(2);
		tree.left.left = new BST(1);

		const nodeOne = tree.left.left;
		const nodeTwo = tree.left;
		const nodeThree = tree;

		this.current_test_name = '1 | 2 | 3 | true';
		assert.equal(
			validateThreeNodes.solve(nodeOne, nodeTwo, nodeThree),
			true
		);
	}
}

class MaxPathPathSum extends ProblemTests {
	constructor(Problem) {
		super(Problem);

		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
		this.tests.push(() => this.test_4());
		this.tests.push(() => this.test_5());
		this.tests.push(() => this.test_6());
		this.tests.push(() => this.test_7());
		this.tests.push(() => this.test_8());
		this.tests.push(() => this.test_9());
	}

	test_1() {
		/**
         * 18
        View Outputs Side By Side
        Input(s)
        {
          "tree": {
            "nodes": [
              {"id": "1", "left": "2", "right": "3", "value": 1},
              {"id": "3", "left": "6", "right": "7", "value": 3},
              {"id": "7", "left": null, "right": null, "value": 7},
              {"id": "6", "left": null, "right": null, "value": 6},
              {"id": "2", "left": "4", "right": "5", "value": 2},
              {"id": "5", "left": null, "right": null, "value": 5},
              {"id": "4", "left": null, "right": null, "value": 4}
            ],
            "root": "1"
          }
        }
         */

		const maxPathSum = new this.Problem();

		const tree = new BST(1);
		tree.left = new BST(2);
		tree.left.left = new BST(4);
		tree.left.right = new BST(5);
		tree.right = new BST(3);
		tree.right.left = new BST(6);
		tree.right.right = new BST(7);

		this.current_test_name = '1 | 3 | 6 | 7 | 18';
		assert.equal(maxPathSum.solve(tree), 18);
	}

	test_2() {
		/**
         * 6
            View Outputs Side By Side
            Input(s)
            {
            "tree": {
                "nodes": [
                {"id": "1", "left": "2", "right": "3", "value": 1},
                {"id": "3", "left": null, "right": null, "value": 3},
                {"id": "2", "left": null, "right": null, "value": 2}
                ],
                "root": "1"
            }
            }
         */

		const maxPathSum = new this.Problem();

		const tree = new BST(1);
		tree.left = new BST(2);
		tree.right = new BST(3);

		this.current_test_name = '1 | 2 | 3 | 6';
		assert.equal(maxPathSum.solve(tree), 6);
	}

	test_3() {
		/**
         * 3
            View Outputs Side By Side
            Input(s)
            {
            "tree": {
                "nodes": [
                {"id": "1", "left": "2", "right": "-1", "value": 1},
                {"id": "-1", "left": null, "right": null, "value": -1},
                {"id": "2", "left": null, "right": null, "value": 2}
                ],
                "root": "1"
            }
            }
         */

		const maxPathSum = new this.Problem();

		const tree = new BST(1);
		tree.left = new BST(2);
		tree.right = new BST(-1);

		this.current_test_name = '1 | 2 | -1 | 3';
		assert.equal(maxPathSum.solve(tree), 3);
	}

	test_4() {
		/**
         * 6
            View Outputs Side By Side
            Input(s)
            {
            "tree": {
                "nodes": [
                {"id": "1", "left": "-5", "right": "3", "value": 1},
                {"id": "3", "left": null, "right": null, "value": 3},
                {"id": "-5", "left": "6", "right": null, "value": -5},
                {"id": "6", "left": null, "right": null, "value": 6}
                ],
                "root": "1"
            }
            }
         */

		const maxPathSum = new this.Problem();

		const tree = new BST(1);
		tree.left = new BST(-5);
		tree.left.left = new BST(6);
		tree.right = new BST(3);

		this.current_test_name = '1 | -5 | 6 | 3 | 6';

		assert.equal(maxPathSum.solve(tree), 6);
	}

	test_5() {
		/**
         * 
         1
       /   \
    -10    -5
    /  \    / \
   30  45 -20 -21
  / \  / \  / \
 5  1 3 -3 100  2

         * 154
        View Outputs Side By Side
        Input(s)
        {
        "tree": {
            "nodes": [
            {"id": "1", "left": "-10", "right": "-5", "value": 1},
            {"id": "-5", "left": "-20", "right": "-21", "value": -5},
            {"id": "-21", "left": "100-2", "right": "1-3", "value": -21},
            {"id": "1-3", "left": null, "right": null, "value": 1},
            {"id": "100-2", "left": null, "right": null, "value": 100},
            {"id": "-20", "left": "100", "right": "2", "value": -20},
            {"id": "2", "left": null, "right": null, "value": 2},
            {"id": "100", "left": null, "right": null, "value": 100},
            {"id": "-10", "left": "30", "right": "45", "value": -10},
            {"id": "45", "left": "3", "right": "-3", "value": 45},
            {"id": "-3", "left": null, "right": null, "value": -3},
            {"id": "3", "left": null, "right": null, "value": 3},
            {"id": "30", "left": "5", "right": "1-2", "value": 30},
            {"id": "1-2", "left": null, "right": null, "value": 1},
            {"id": "5", "left": null, "right": null, "value": 5}
            ],
            "root": "1"
        }
        }
         */

		const maxPathSum = new this.Problem();
		const tree = {
			value: 1,
			left: {
				value: -10,
				left: {
					value: 30,
					left: {
						value: 5,
						left: null,
						right: null
					},
					right: {
						value: 1,
						left: null,
						right: null
					}
				},
				right: {
					value: 45,
					left: {
						value: 3,
						left: null,
						right: null
					},
					right: {
						value: -3,
						left: null,
						right: null
					}
				}
			},
			right: {
				value: -5,
				left: {
					value: -20,
					left: {
						value: 100,
						left: null,
						right: null
					},
					right: {
						value: 2,
						left: null,
						right: null
					}
				},
				right: {
					value: -21,
					left: {
						value: 100,
						left: null,
						right: null
					},
					right: {
						value: 1,
						left: null,
						right: null
					}
				}
			}
		};

		this.current_test_name =
			'1 | -10 | 30 | 5 | 1 | 45 | 3 | -3 | -5 | -20 | 100 | 2 | -21 | 100 | 1 | 154';

		assert.equal(maxPathSum.solve(tree), 154);
	}

	test_6() {
		/** 
         * 201
            View Outputs Side By Side
            Input(s)
            {
            "tree": {
                "nodes": [
                {"id": "1", "left": "-10", "right": "-5", "value": 1},
                {"id": "-5", "left": "-20", "right": "-21", "value": -5},
                {"id": "-21", "left": "100-3", "right": "1-3", "value": -21},
                {"id": "1-3", "left": null, "right": null, "value": 1},
                {"id": "100-3", "left": null, "right": null, "value": 100},
                {"id": "-20", "left": "100-2", "right": "2", "value": -20},
                {"id": "2", "left": null, "right": null, "value": 2},
                {"id": "100-2", "left": null, "right": null, "value": 100},
                {"id": "-10", "left": "30", "right": "45", "value": -10},
                {"id": "45", "left": "3", "right": "-3", "value": 45},
                {"id": "-3", "left": null, "right": null, "value": -3},
                {"id": "3", "left": null, "right": null, "value": 3},
                {"id": "30", "left": "5", "right": "1-2", "value": 30},
                {"id": "1-2", "left": null, "right": null, "value": 1},
                {"id": "5", "left": "100", "right": null, "value": 5},
                {"id": "100", "left": null, "right": null, "value": 100}
                ],
                "root": "1"
            }
            }
         */

		const maxPathSum = new this.Problem();
		const tree = {
			value: 1,
			left: {
				value: -10,
				left: {
					value: 30,
					left: {
						value: 5,
						left: {
							value: 100,
							left: null,
							right: null
						},
						right: null
					},
					right: {
						value: 1,
						left: null,
						right: null
					}
				},
				right: {
					value: 45,
					left: {
						value: 3,
						left: null,
						right: null
					},
					right: {
						value: -3,
						left: null,
						right: null
					}
				}
			},
			right: {
				value: -5,
				left: {
					value: -20,
					left: {
						value: 100,
						left: null,
						right: null
					},
					right: {
						value: 2,
						left: null,
						right: null
					}
				},
				right: {
					value: -21,
					left: {
						value: 100,
						left: null,
						right: null
					},
					right: {
						value: 1,
						left: null,
						right: null
					}
				}
			}
		};

		this.current_test_name =
			'1 | -10 | 30 | 5 | 100 | 1 | 45 | 3 | -3 | -5 | -20 | 100 | 2 | -21 | 100 | 1 => 201';

		assert.equal(maxPathSum.solve(tree), 201);
	}

	test_7() {
		/**
         * 
        1
       /   \
    -10    -5
    /  \    / \
   30  75 -20 -21
  / \  / \  / \
 5  1 3 -3 100  1
  \
 100
 
        203
            View Outputs Side By Side
            Input(s)
            {
            "tree": {
                "nodes": [
                {"id": "1", "left": "-10", "right": "-5", "value": 1},
                {"id": "-5", "left": "-20", "right": "-21", "value": -5},
                {"id": "-21", "left": "100-3", "right": "1-3", "value": -21},
                {"id": "1-3", "left": null, "right": null, "value": 1},
                {"id": "100-3", "left": null, "right": null, "value": 100},
                {"id": "-20", "left": "100-2", "right": "2", "value": -20},
                {"id": "2", "left": null, "right": null, "value": 2},
                {"id": "100-2", "left": null, "right": null, "value": 100},
                {"id": "-10", "left": "30", "right": "75", "value": -10},
                {"id": "75", "left": "3", "right": "-3", "value": 75},
                {"id": "-3", "left": null, "right": null, "value": -3},
                {"id": "3", "left": null, "right": null, "value": 3},
                {"id": "30", "left": "5", "right": "1-2", "value": 30},
                {"id": "1-2", "left": null, "right": null, "value": 1},
                {"id": "5", "left": "100", "right": null, "value": 5},
                {"id": "100", "left": null, "right": null, "value": 100}
                ],
                "root": "1"
            }
            }
         */

		const maxPathSum = new this.Problem();
		const tree = {
			value: 1,
			left: {
				value: -10,
				left: {
					value: 30,
					left: {
						value: 5,
						left: {
							value: 100,
							left: null,
							right: null
						},
						right: null
					},
					right: {
						value: 1,
						left: null,
						right: null
					}
				},
				right: {
					value: 75,
					left: {
						value: 3,
						left: null,
						right: null
					},
					right: {
						value: -3,
						left: null,
						right: null
					}
				}
			},
			right: {
				value: -5,
				left: {
					value: -20,
					left: {
						value: 100,
						left: null,
						right: null
					},
					right: {
						value: 2,
						left: null,
						right: null
					}
				},
				right: {
					value: -21,
					left: {
						value: 100,
						left: null,
						right: null
					},
					right: {
						value: 1,
						left: null,
						right: null
					}
				}
			}
		};

		this.current_test_name =
			'1 | -10 | 30 | 5 | 100 | 1 | 75 | 3 | -3 | -5 | -20 | 100 | 100 | 2 | -21 | 100 | 1 => 203';

		assert.equal(maxPathSum.solve(tree), 203);
	}

	test_8() {
		/**
         * 228
            View Outputs Side By Side
            Input(s)
            {
            "tree": {
                "nodes": [
                {"id": "1", "left": "-150", "right": "-5", "value": 1},
                {"id": "-5", "left": "-20", "right": "-21", "value": -5},
                {"id": "-21", "left": "100-4", "right": "1-3", "value": -21},
                {"id": "1-3", "left": null, "right": null, "value": 1},
                {"id": "100-4", "left": null, "right": null, "value": 100},
                {"id": "-20", "left": "100-3", "right": "2", "value": -20},
                {"id": "2", "left": null, "right": null, "value": 2},
                {"id": "100-3", "left": null, "right": null, "value": 100},
                {"id": "-150", "left": "30", "right": "75", "value": -150},
                {"id": "75", "left": "3", "right": "-3", "value": 75},
                {"id": "-3", "left": null, "right": null, "value": -3},
                {"id": "3", "left": "150", "right": "-8", "value": 3},
                {"id": "-8", "left": null, "right": null, "value": -8},
                {"id": "150", "left": null, "right": null, "value": 150},
                {"id": "30", "left": "5", "right": "1-2", "value": 30},
                {"id": "1-2", "left": "5-2", "right": "10", "value": 1},
                {"id": "10", "left": null, "right": null, "value": 10},
                {"id": "5-2", "left": null, "right": null, "value": 5},
                {"id": "5", "left": "100", "right": "100-2", "value": 5},
                {"id": "100-2", "left": null, "right": null, "value": 100},
                {"id": "100", "left": null, "right": null, "value": 100}
                ],
                "root": "1"
            }
            }
         */

		const maxPathSum = new this.Problem();

		const tree = new BST(1);
		tree.left = new BST(-150);
		tree.left.left = new BST(30);
		tree.left.left.left = new BST(5);
		tree.left.left.left.left = new BST(100);
		tree.left.left.left.right = new BST(100);
		tree.left.left.right = new BST(1);
		tree.left.left.right.left = new BST(5);
		tree.left.left.right.right = new BST(10);
		tree.left.right = new BST(75);
		tree.left.right.left = new BST(3);
		tree.left.right.left.left = new BST(150);
		tree.left.right.left.right = new BST(-8);
		tree.left.right.right = new BST(-3);
		tree.right = new BST(-5);
		tree.right.left = new BST(-20);
		tree.right.left.left = new BST(100);
		tree.right.left.right = new BST(2);
		tree.right.right = new BST(-21);
		tree.right.right.left = new BST(100);
		tree.right.right.right = new BST(1);

		this.current_test_name =
			'1 | -150 | 30 | 5 | 100 | 100 | 1 | 5 | 10 | 75 | 3 | 150 | -8 | -3 | -5 | -20 | 100 | 2 | -21 | 100 | 1 => 228';

		assert.equal(maxPathSum.solve(tree), 228);
	}

	test_9() {
		/**
         * 304
            View Outputs Side By Side
            Input(s)
            {
            "tree": {
                "nodes": [
                {"id": "1", "left": "-150", "right": "-5", "value": 1},
                {"id": "-5", "left": "-20", "right": "-21", "value": -5},
                {"id": "-21", "left": "100-4", "right": "1-3", "value": -21},
                {"id": "1-3", "left": null, "right": null, "value": 1},
                {"id": "100-4", "left": null, "right": null, "value": 100},
                {"id": "-20", "left": "100-3", "right": "2", "value": -20},
                {"id": "2", "left": null, "right": null, "value": 2},
                {"id": "100-3", "left": null, "right": null, "value": 100},
                {"id": "-150", "left": "30", "right": "75", "value": -150},
                {"id": "75", "left": "3", "right": "-3", "value": 75},
                {"id": "-3", "left": null, "right": null, "value": -3},
                {"id": "3", "left": "150", "right": "151", "value": 3},
                {"id": "151", "left": null, "right": null, "value": 151},
                {"id": "150", "left": null, "right": null, "value": 150},
                {"id": "30", "left": "5", "right": "1-2", "value": 30},
                {"id": "1-2", "left": "5-2", "right": "10", "value": 1},
                {"id": "10", "left": null, "right": null, "value": 10},
                {"id": "5-2", "left": null, "right": null, "value": 5},
                {"id": "5", "left": "100", "right": "100-2", "value": 5},
                {"id": "100-2", "left": null, "right": null, "value": 100},
                {"id": "100", "left": null, "right": null, "value": 100}
                ],
                "root": "1"
            }
            }
         */

		const maxPathSum = new this.Problem();

		const tree = new BST(1);
		tree.left = new BST(-150);
		tree.left.left = new BST(30);
		tree.left.left.left = new BST(5);
		tree.left.left.left.left = new BST(100);
		tree.left.left.left.right = new BST(100);
		tree.left.left.right = new BST(1);
		tree.left.left.right.left = new BST(5);
		tree.left.left.right.right = new BST(10);
		tree.left.right = new BST(75);
		tree.left.right.left = new BST(3);
		tree.left.right.left.left = new BST(150);
		tree.left.right.left.right = new BST(151);
		tree.left.right.right = new BST(-3);
		tree.right = new BST(-5);
		tree.right.left = new BST(-20);
		tree.right.left.left = new BST(100);
		tree.right.left.right = new BST(2);
		tree.right.right = new BST(-21);
		tree.right.right.left = new BST(100);
		tree.right.right.right = new BST(1);

		this.current_test_name =
			'1 | -150 | 30 | 5 | 100 | 100 | 1 | 5 | 10 | 75 | 3 | 150 | 151 | -3 | -5 | -20 | 100 | 2 | -21 | 100 | 1 => 304';

		assert.equal(maxPathSum.solve(tree), 304);
	}
}

function createTreeFromData(data) {
	const nodes = new Map();
	const rootId = data.tree.root;

	// Create node objects for each entry in the data
	data.tree.nodes.forEach(node => {
		nodes.set(node.id, {
			value: node.value,
			left: null,
			right: null
		});
	});

	// Connect parent nodes to their children
	data.tree.nodes.forEach(node => {
		const currentNode = nodes.get(node.id);
		currentNode.left = node.left ? nodes.get(node.left) : null;
		currentNode.right = node.right ? nodes.get(node.right) : null;
	});

	// Return the root node
	return nodes.get(rootId);
}

class findNodesDistanceK extends ProblemTests {
	constructor(Problem) {
		super(Problem);

		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
		this.tests.push(() => this.test_4());
		this.tests.push(() => this.test_5());
		this.tests.push(() => this.test_6());
		this.tests.push(() => this.test_7());
		this.tests.push(() => this.test_8());
		this.tests.push(() => this.test_9());
		this.tests.push(() => this.test_10());
	}

	test_1() {
		/**
         * [7, 8, 2]
            View Outputs Side By Side
            Input(s)
            {
            "k": 2,
            "target": 3,
            "tree": {
                "nodes": [
                {"id": "1", "left": "2", "right": "3", "value": 1},
                {"id": "2", "left": "4", "right": "5", "value": 2},
                {"id": "3", "left": null, "right": "6", "value": 3},
                {"id": "4", "left": null, "right": null, "value": 4},
                {"id": "5", "left": null, "right": null, "value": 5},
                {"id": "6", "left": "7", "right": "8", "value": 6},
                {"id": "7", "left": null, "right": null, "value": 7},
                {"id": "8", "left": null, "right": null, "value": 8}
                ],
                "root": "1"
            }
            }
         */

		const findNodesDistanceK = new this.Problem();

		const tree = new BST(1);
		tree.left = new BST(2);
		tree.left.left = new BST(4);
		tree.left.right = new BST(5);
		tree.right = new BST(3);
		tree.right.right = new BST(6);
		tree.right.right.left = new BST(7);
		tree.right.right.right = new BST(8);

		this.current_test_name =
			'(1 | 2 | 4 | 5 | 3 | 6 | 7 | 8 | 2 | 2), 3, 2 => [7, 8, 2]';
		assert.deepStrictEqual(findNodesDistanceK.solve(tree, 3, 2), [7, 8, 2]);
	}

	test_2() {
		/**
         * [5]
            View Outputs Side By Side
            Input(s)
            {
            "k": 3,
            "target": 2,
            "tree": {
                "nodes": [
                {"id": "1", "left": "2", "right": null, "value": 1},
                {"id": "2", "left": "3", "right": null, "value": 2},
                {"id": "3", "left": "4", "right": null, "value": 3},
                {"id": "4", "left": "5", "right": null, "value": 4},
                {"id": "5", "left": null, "right": null, "value": 5}
                ],
                "root": "1"
            }
            }
         */

		const findNodesDistanceK = new this.Problem();

		const tree = new BST(1);
		tree.left = new BST(2);
		tree.left.left = new BST(3);
		tree.left.left.left = new BST(4);
		tree.left.left.left.left = new BST(5);

		this.current_test_name = '(5 | 4 | 3 | 2), 2, 3 => [5]';
		assert.deepStrictEqual(findNodesDistanceK.solve(tree, 2, 3), [5]);
	}

	test_3() {
		/**
         * [4]
        View Outputs Side By Side
        Input(s)
        {
        "k": 6,
        "target": 8,
        "tree": {
            "nodes": [
            {"id": "1", "left": "2", "right": "3", "value": 1},
            {"id": "2", "left": "4", "right": null, "value": 2},
            {"id": "3", "left": "5", "right": "6", "value": 3},
            {"id": "4", "left": null, "right": null, "value": 4},
            {"id": "5", "left": null, "right": null, "value": 5},
            {"id": "6", "left": null, "right": "7", "value": 6},
            {"id": "7", "left": null, "right": "8", "value": 7},
            {"id": "8", "left": null, "right": null, "value": 8}
            ],
            "root": "1"
        }
        }
        */

		const findNodesDistanceK = new this.Problem();

		const tree = new BST(1);
		tree.left = new BST(2);
		tree.left.left = new BST(4);
		tree.right = new BST(3);
		tree.right.left = new BST(5);
		tree.right.right = new BST(6);
		tree.right.right.right = new BST(7);
		tree.right.right.right.right = new BST(8);

		this.current_test_name = '(4 | 2 | 1 | 3 | 6 | 7 | 8), 6, 8 => [4]';
		assert.deepStrictEqual(findNodesDistanceK.solve(tree, 8, 6), [4]);
	}

	test_4() {
		/**
         * [5, 6, 1]
            View Outputs Side By Side
            Input(s)
            {
            "k": 1,
            "target": 3,
            "tree": {
                "nodes": [
                {"id": "1", "left": "2", "right": "3", "value": 1},
                {"id": "2", "left": "4", "right": null, "value": 2},
                {"id": "3", "left": "5", "right": "6", "value": 3},
                {"id": "4", "left": null, "right": null, "value": 4},
                {"id": "5", "left": null, "right": null, "value": 5},
                {"id": "6", "left": null, "right": "7", "value": 6},
                {"id": "7", "left": null, "right": "8", "value": 7},
                {"id": "8", "left": null, "right": null, "value": 8}
                ],
                "root": "1"
            }
            }
         */

		const findNodesDistanceK = new this.Problem();

		const tree = new BST(1);
		tree.left = new BST(2);
		tree.left.left = new BST(4);
		tree.right = new BST(3);
		tree.right.left = new BST(5);
		tree.right.right = new BST(6);
		tree.right.right.right = new BST(7);
		tree.right.right.right.right = new BST(8);

		this.current_test_name =
			'(4 | 2 | 1 | 3 | 6 | 7 | 8), 3, 1 => [5, 6, 1]';
		assert.deepStrictEqual(findNodesDistanceK.solve(tree, 3, 1), [5, 6, 1]);
	}

	test_5() {
		/**
         * [4, 5, 6, 7]
            View Outputs Side By Side
            Input(s)
            {
            "k": 2,
            "target": 1,
            "tree": {
                "nodes": [
                {"id": "1", "left": "2", "right": "3", "value": 1},
                {"id": "2", "left": "4", "right": "5", "value": 2},
                {"id": "3", "left": "6", "right": "7", "value": 3},
                {"id": "4", "left": null, "right": null, "value": 4},
                {"id": "5", "left": null, "right": null, "value": 5},
                {"id": "6", "left": null, "right": null, "value": 6},
                {"id": "7", "left": null, "right": null, "value": 7}
                ],
                "root": "1"
            }
            }
         */

		const findNodesDistanceK = new this.Problem();

		const tree = new BST(1);
		tree.left = new BST(2);
		tree.left.left = new BST(4);
		tree.left.right = new BST(5);
		tree.right = new BST(3);
		tree.right.left = new BST(6);
		tree.right.right = new BST(7);

		this.current_test_name =
			'(4 | 2 | 1 | 3 | 6 | 7), 1, 2 => [4, 5, 6, 7]';
		assert.deepStrictEqual(
			findNodesDistanceK.solve(tree, 1, 2),
			[4, 5, 6, 7]
		);
	}

	test_6() {
		/**
         * [9, 2]
            View Outputs Side By Side
            Input(s)
            {
            "k": 2,
            "target": 8,
            "tree": {
                "nodes": [
                {"id": "1", "left": "2", "right": "3", "value": 1},
                {"id": "2", "left": "4", "right": "5", "value": 2},
                {"id": "3", "left": "6", "right": "7", "value": 3},
                {"id": "4", "left": "8", "right": "9", "value": 4},
                {"id": "5", "left": null, "right": null, "value": 5},
                {"id": "6", "left": null, "right": null, "value": 6},
                {"id": "7", "left": null, "right": null, "value": 7},
                {"id": "8", "left": null, "right": null, "value": 8},
                {"id": "9", "left": null, "right": null, "value": 9}
                ],
                "root": "1"
            }
            }
         */

		const findNodesDistanceK = new this.Problem();

		const tree = new BST(1);
		tree.left = new BST(2);
		tree.left.left = new BST(4);
		tree.left.left.left = new BST(8);
		tree.left.left.right = new BST(9);
		tree.left.right = new BST(5);
		tree.right = new BST(3);
		tree.right.left = new BST(6);
		tree.right.right = new BST(7);

		this.current_test_name =
			'(8 | 4 | 2 | 1 | 3 | 6 | 7 | 9), 8, 2 => [9, 2]';
		assert.deepStrictEqual(findNodesDistanceK.solve(tree, 8, 2), [9, 2]);
	}

	test_7() {
		/**
         * [7, 8]
            View Outputs Side By Side
            Input(s)
            {
            "k": 6,
            "target": 6,
            "tree": {
                "nodes": [
                {"id": "1", "left": "2", "right": "3", "value": 1},
                {"id": "2", "left": "4", "right": null, "value": 2},
                {"id": "3", "left": null, "right": "5", "value": 3},
                {"id": "4", "left": "6", "right": null, "value": 4},
                {"id": "5", "left": "7", "right": "8", "value": 5},
                {"id": "6", "left": null, "right": null, "value": 6},
                {"id": "7", "left": null, "right": null, "value": 7},
                {"id": "8", "left": null, "right": null, "value": 8}
                ],
                "root": "1"
            }
            }
         */

		const findNodesDistanceK = new this.Problem();

		const tree = new BST(1);
		tree.left = new BST(2);
		tree.left.left = new BST(4);
		tree.left.left.left = new BST(6);
		tree.right = new BST(3);
		tree.right.left = new BST(5);
		tree.right.left.left = new BST(7);
		tree.right.left.right = new BST(8);

		this.current_test_name =
			'(6 | 4 | 2 | 1 | 3 | 5 | 7 | 8), 6, 6 => [7, 8]';
		assert.deepStrictEqual(findNodesDistanceK.solve(tree, 6, 6), [7, 8]);
	}

	test_8() {
		/**
         * []
            View Outputs Side By Side
            Input(s)
            {
            "k": 1,
            "target": 1,
            "tree": {
                "nodes": [
                {"id": "1", "left": null, "right": null, "value": 1}
                ],
                "root": "1"
            }
            }
         */

		const findNodesDistanceK = new this.Problem();

		const tree = new BST(1);

		this.current_test_name = '(1), 1, 1 => []';
		assert.deepStrictEqual(findNodesDistanceK.solve(tree, 1, 1), []);
	}

	test_9() {
		/**
         * []
            View Outputs Side By Side
            Input(s)
            {
            "k": 17,
            "target": 6,
            "tree": {
                "nodes": [
                {"id": "1", "left": "2", "right": "3", "value": 1},
                {"id": "2", "left": "4", "right": null, "value": 2},
                {"id": "3", "left": null, "right": "5", "value": 3},
                {"id": "4", "left": "6", "right": null, "value": 4},
                {"id": "5", "left": "7", "right": "8", "value": 5},
                {"id": "6", "left": null, "right": null, "value": 6},
                {"id": "7", "left": null, "right": null, "value": 7},
                {"id": "8", "left": null, "right": null, "value": 8}
                ],
                "root": "1"
            }
            }
         */

		const findNodesDistanceK = new this.Problem();

		const tree = new BST(1);
		tree.left = new BST(2);
		tree.left.left = new BST(4);
		tree.left.left.left = new BST(6);
		tree.right = new BST(3);
		tree.right.left = new BST(5);
		tree.right.left.left = new BST(7);
		tree.right.left.right = new BST(8);

		this.current_test_name = '(6 | 4 | 2 | 1 | 3 | 5 | 7 | 8), 6, 17 => []';
		assert.deepStrictEqual(findNodesDistanceK.solve(tree, 6, 17), []);
	}

	test_10() {
		/**
         * [8, 9, 10, 11, 3]
            View Outputs Side By Side
            Input(s)
            {
            "k": 2,
            "target": 2,
            "tree": {
                "nodes": [
                {"id": "1", "left": "2", "right": "3", "value": 1},
                {"id": "2", "left": "4", "right": "5", "value": 2},
                {"id": "3", "left": "6", "right": "7", "value": 3},
                {"id": "4", "left": "8", "right": "9", "value": 4},
                {"id": "5", "left": "10", "right": "11", "value": 5},
                {"id": "6", "left": "12", "right": "13", "value": 6},
                {"id": "7", "left": null, "right": null, "value": 7},
                {"id": "8", "left": null, "right": null, "value": 8},
                {"id": "9", "left": null, "right": null, "value": 9},
                {"id": "10", "left": null, "right": null, "value": 10},
                {"id": "11", "left": null, "right": null, "value": 11},
                {"id": "12", "left": null, "right": null, "value": 12},
                {"id": "13", "left": null, "right": null, "value": 13}
                ],
                "root": "1"
            }
            }
         */

		const findNodesDistanceK = new this.Problem();

		const tree = new BST(1);
		tree.left = new BST(2);
		tree.left.left = new BST(4);
		tree.left.left.left = new BST(8);
		tree.left.left.right = new BST(9);
		tree.left.right = new BST(5);
		tree.left.right.left = new BST(10);
		tree.left.right.right = new BST(11);
		tree.right = new BST(3);
		tree.right.left = new BST(6);
		tree.right.left.left = new BST(12);
		tree.right.left.right = new BST(13);

		this.current_test_name =
			'(8 | 9 | 10 | 11 | 4 | 2 | 1 | 3 | 6 | 12 | 13 | 5), 2, 2 => [8, 9, 10, 11, 3]';
		assert.deepStrictEqual(
			findNodesDistanceK.solve(tree, 2, 2),
			[8, 9, 10, 11, 3]
		);
	}
}

class maxSumIncreasingSubsequence extends ProblemTests {
	constructor(Problem) {
		super(Problem);

		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
		this.tests.push(() => this.test_4());
		this.tests.push(() => this.test_5());
		this.tests.push(() => this.test_6());
		this.tests.push(() => this.test_7());
		this.tests.push(() => this.test_8());
		this.tests.push(() => this.test_9());
		this.tests.push(() => this.test_10());
	}

	test_1() {
		/**
         * [110, [10, 20, 30, 50]]
            View Outputs Side By Side
            Input(s)
            {
            "array": [10, 70, 20, 30, 50, 11, 30]
            }
         */

		const maxSumIncreasingSubsequence = new this.Problem();

		this.current_test_name =
			'[10, 70, 20, 30, 50, 11, 30] => [110, [10, 20, 30, 50]]';
		assert.deepStrictEqual(
			maxSumIncreasingSubsequence.solve([10, 70, 20, 30, 50, 11, 30]),
			[110, [10, 20, 30, 50]]
		);
	}

	test_2() {
		/**
         * [1, [1]]
            View Outputs Side By Side
            Input(s)
            {
            "array": [1]
            }
         */

		const maxSumIncreasingSubsequence = new this.Problem();

		this.current_test_name = '[1] => [1, [1]]';
		assert.deepStrictEqual(maxSumIncreasingSubsequence.solve([1]), [
			1,
			[1]
		]);
	}

	test_3() {
		/**
         * [-1, [-1]]
            View Outputs Side By Side
            Input(s)
            {
            "array": [-1]
            }
         */

		const maxSumIncreasingSubsequence = new this.Problem();

		this.current_test_name = '[-1] => [-1, [-1]]';
		assert.deepStrictEqual(maxSumIncreasingSubsequence.solve([-1]), [
			-1,
			[-1]
		]);
	}

	test_4() {
		/**
         * [1, [1]]
            View Outputs Side By Side
            Input(s)
            {
            "array": [-1, 1]
            }

         */

		const maxSumIncreasingSubsequence = new this.Problem();

		this.current_test_name = '[-1, 1] => [1, [1]]';
		assert.deepStrictEqual(maxSumIncreasingSubsequence.solve([-1, 1]), [
			1,
			[1]
		]);
	}

	test_5() {
		/**
         * [5, [5]]
            View Outputs Side By Side
            Input(s)
            {
            "array": [5, 4, 3, 2, 1]
            }
         */

		const maxSumIncreasingSubsequence = new this.Problem();

		this.current_test_name = '[5, 4, 3, 2, 1] => [5, [5]]';
		assert.deepStrictEqual(
			maxSumIncreasingSubsequence.solve([5, 4, 3, 2, 1]),
			[5, [5]]
		);
	}

	test_6() {
		/**
         * [15, [1, 2, 3, 4, 5]]
            View Outputs Side By Side
            Input(s)
            {
            "array": [1, 2, 3, 4, 5]
            }
         */

		const maxSumIncreasingSubsequence = new this.Problem();

		this.current_test_name = '[1, 2, 3, 4, 5] => [15, [1, 2, 3, 4, 5]]';
		assert.deepStrictEqual(
			maxSumIncreasingSubsequence.solve([1, 2, 3, 4, 5]),
			[15, [1, 2, 3, 4, 5]]
		);
	}

	test_7() {
		/**
         * [-1, [-1]]
            View Outputs Side By Side
            Input(s)
            {
            "array": [-5, -4, -3, -2, -1]
            }
         */

		const maxSumIncreasingSubsequence = new this.Problem();

		this.current_test_name = '[-5, -4, -3, -2, -1] => [-1, [-1]]';
		assert.deepStrictEqual(
			maxSumIncreasingSubsequence.solve([-5, -4, -3, -2, -1]),
			[-1, [-1]]
		);
	}

	test_8() {
		/**
         * [35, [8, 12, 15]]
            View Outputs Side By Side
            Input(s)
            {
            "array": [8, 12, 2, 3, 15, 5, 7]
            }
         */

		const maxSumIncreasingSubsequence = new this.Problem();

		this.current_test_name = '[8, 12, 2, 3, 15, 5, 7] => [35, [8, 12, 15]]';
		assert.deepStrictEqual(
			maxSumIncreasingSubsequence.solve([8, 12, 2, 3, 15, 5, 7]),
			[35, [8, 12, 15]]
		);
	}

	test_9() {
		/**
         * [164, [10, 11, 14, 23, 25, 31, 50]]
            View Outputs Side By Side
            Input(s)
            {
            "array": [10, 15, 4, 5, 11, 14, 31, 25, 31, 23, 25, 31, 50]
            }
         */

		const maxSumIncreasingSubsequence = new this.Problem();
		this.current_test_name =
			'[10, 15, 4, 5, 11, 14, 31, 25, 31, 23, 25, 31, 50] => [164, [10, 11, 14, 23, 25, 31, 50]]';
		assert.deepStrictEqual(
			maxSumIncreasingSubsequence.solve([
				10, 15, 4, 5, 11, 14, 31, 25, 31, 23, 25, 31, 50
			]),
			[164, [10, 11, 14, 23, 25, 31, 50]]
		);
	}

	test_10() {
		/**
         * [45, [1, 2, 3, 4, 5, 6, 7, 8, 9]]
            View Outputs Side By Side
            Input(s)
            {
            "array": [10, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            }
         */

		const maxSumIncreasingSubsequence = new this.Problem();
		this.current_test_name =
			'[10, 1, 2, 3, 4, 5, 6, 7, 8, 9] => [45, [1, 2, 3, 4, 5, 6, 7, 8, 9]]';
		assert.deepStrictEqual(
			maxSumIncreasingSubsequence.solve([10, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
			[45, [1, 2, 3, 4, 5, 6, 7, 8, 9]]
		);
	}
}

class LongestCommonSubsequence extends ProblemTests {
	constructor(Problem) {
		super(Problem);

		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
		this.tests.push(() => this.test_4());
		this.tests.push(() => this.test_5());
		this.tests.push(() => this.test_6());
		this.tests.push(() => this.test_7());
		this.tests.push(() => this.test_8());
		this.tests.push(() => this.test_9());
		this.tests.push(() => this.test_10());
	}

	test_1() {
		/**
         * ["X", "Y", "Z", "W"]
            View Outputs Side By Side
            Input(s)
            {
            "str1": "ZXVVYZW",
            "str2": "XKYKZPW"
            }
         */

		const longestCommonSubsequence = new this.Problem();

		this.current_test_name = '"ZXVVYZW", "XKYKZPW" => ["X", "Y", "Z", "W"]';
		assert.deepStrictEqual(
			longestCommonSubsequence.solve('ZXVVYZW', 'XKYKZPW'),
			['X', 'Y', 'Z', 'W']
		);
	}

	test_2() {
		/**
         * []
            View Outputs Side By Side
            Input(s)
            {
            "str1": "",
            "str2": ""
            }
         */

		const longestCommonSubsequence = new this.Problem();

		this.current_test_name = '"", "" => []';
		assert.deepStrictEqual(longestCommonSubsequence.solve('', ''), []);
	}

	test_3() {
		/**
         * []
            View Outputs Side By Side
            Input(s)
            {
            "str1": "",
            "str2": "ABCDEFG"
            }
         */

		const longestCommonSubsequence = new this.Problem();

		this.current_test_name = '"", "ABCDEFG" => []';
		assert.deepStrictEqual(
			longestCommonSubsequence.solve('', 'ABCDEFG'),
			[]
		);
	}

	test_4() {
		/**
         * []
        View Outputs Side By Side
        Input(s)
        {
          "str1": "ABCDEFG",
          "str2": ""
        }
         */

		const longestCommonSubsequence = new this.Problem();

		this.current_test_name = '"ABCDEFG", "" => []';
		assert.deepStrictEqual(
			longestCommonSubsequence.solve('ABCDEFG', ''),
			[]
		);
	}

	test_5() {
		/**
         * ["A", "B", "C", "D", "E", "F", "G"]
            View Outputs Side By Side
            Input(s)
            {
            "str1": "ABCDEFG",
            "str2": "ABCDEFG"
            }
         */

		const longestCommonSubsequence = new this.Problem();

		this.current_test_name =
			'"ABCDEFG", "ABCDEFG" => ["A", "B", "C", "D", "E", "F", "G"]';
		assert.deepStrictEqual(
			longestCommonSubsequence.solve('ABCDEFG', 'ABCDEFG'),
			['A', 'B', 'C', 'D', 'E', 'F', 'G']
		);
	}

	test_6() {
		/**
         * ["A", "E"]
            View Outputs Side By Side
            Input(s)
            {
            "str1": "ABCDEFG",
            "str2": "APPLES"
            }
         */

		const longestCommonSubsequence = new this.Problem();

		this.current_test_name = '"ABCDEFG", "APPLES" => ["A", "E"]';
		assert.deepStrictEqual(
			longestCommonSubsequence.solve('ABCDEFG', 'APPLES'),
			['A', 'E']
		);
	}

	test_7() {
		/**
         * ["n", "t"]
            View Outputs Side By Side
            Input(s)
            {
            "str1": "clement",
            "str2": "antoine"
            }
         */

		const longestCommonSubsequence = new this.Problem();

		this.current_test_name = '"clement", "antoine" => ["n", "t"]';
		assert.deepStrictEqual(
			longestCommonSubsequence.solve('clement', 'antoine'),
			['n', 't']
		);
	}

	test_8() {
		/**
         * ["8", "4", "2"]
        View Outputs Side By Side
        Input(s)
        {
          "str1": "8111111111111111142",
          "str2": "222222222822222222222222222222433333333332"
        }
         */

		const longestCommonSubsequence = new this.Problem();

		this.current_test_name =
			'"8111111111111111142", "222222222822222222222222222222433333333332" => ["8", "4", "2"]';
		assert.deepStrictEqual(
			longestCommonSubsequence.solve(
				'8111111111111111142',
				'222222222822222222222222222222433333333332'
			),
			['8', '4', '2']
		);
	}

	test_9() {
		/**
         * ["C", "D", "E", "G", "H", "J", "K", "L", "W"]
            View Outputs Side By Side
            Input(s)
            {
            "str1": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            "str2": "CCCDDEGDHAGKGLWAJWKJAWGKGWJAKLGGWAFWLFFWAGJWKAG"
            }
         */

		const longestCommonSubsequence = new this.Problem();

		this.current_test_name =
			'"ABCDEFGHIJKLMNOPQRSTUVWXYZ", "CCCDDEGDHAGKGLWAJWKJAWGKGWJAKLGGWAFWLFFWAGJWKAG" => ["C", "D", "E", "G", "H", "J", "K", "L", "W"]';
		assert.deepStrictEqual(
			longestCommonSubsequence.solve(
				'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
				'CCCDDEGDHAGKGLWAJWKJAWGKGWJAKLGGWAFWLFFWAGJWKAG'
			),
			['C', 'D', 'E', 'G', 'H', 'J', 'K', 'L', 'W']
		);
	}

	test_10() {
		/**
         * ["C", "D", "E", "G", "H", "J", "K", "L", "T", "U", "V"]
            View Outputs Side By Side
            Input(s)
            {
            "str1": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            "str2": "CCCDDEGDHAGKGLWAJWKJAWGKGWJAKLGGWAFWLFFWAGJWKAGTUV"
            }
         */

		const longestCommonSubsequence = new this.Problem();
		assert.deepStrictEqual(
			longestCommonSubsequence.solve(
				'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
				'CCCDDEGDHAGKGLWAJWKJAWGKGWJAKLGGWAFWLFFWAGJWKAGTUV'
			),
			['C', 'D', 'E', 'G', 'H', 'J', 'K', 'L', 'T', 'U', 'V']
		);
	}
}

class ContinuousMedianHandler extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
		this.tests.push(() => this.test_4());
		this.tests.push(() => this.test_5());
		this.tests.push(() => this.test_6());
		this.tests.push(() => this.test_7());
		this.tests.push(() => this.test_8());
	}

	test_1() {
		/**
         * [
            {
                "arguments": [5],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [10],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [],
                "method": "getMedian",
                "output": 7.5
            },
            {
                "arguments": [100],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [],
                "method": "getMedian",
                "output": 10
            }
            ]
         */

		const continuousMedianHandler = new this.Problem();

		this.current_test_name = '[5, 10, 100] => [7.5, 10]';
		continuousMedianHandler.insert(5);
		continuousMedianHandler.insert(10);
		assert.deepStrictEqual(continuousMedianHandler.getMedian(), 7.5);
		continuousMedianHandler.insert(100);
		assert.deepStrictEqual(continuousMedianHandler.getMedian(), 10);
	}

	test_2() {
		/**
         * [
            {
                "arguments": [5],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [10],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [],
                "method": "getMedian",
                "output": 7.5
            },
            {
                "arguments": [100],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [],
                "method": "getMedian",
                "output": 10
            }
            ]
         */

		const continuousMedianHandler = new this.Problem();

		this.current_test_name = '[5, 10, 100] => [7.5, 10]';
		continuousMedianHandler.insert(5);
		continuousMedianHandler.insert(10);
		assert.deepStrictEqual(continuousMedianHandler.getMedian(), 7.5);
		continuousMedianHandler.insert(100);
		assert.deepStrictEqual(continuousMedianHandler.getMedian(), 10);
	}

	test_3() {
		/**
         * [
            [
            {
                "arguments": [5],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [10],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [100],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [],
                "method": "getMedian",
                "output": 10
            },
            {
                "arguments": [200],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [],
                "method": "getMedian",
                "output": 55
            }
            ]
         */

		const continuousMedianHandler = new this.Problem();

		this.current_test_name = '[5, 10, 100, 200] => [10, 55]';
		continuousMedianHandler.insert(5);
		continuousMedianHandler.insert(10);
		continuousMedianHandler.insert(100);
		assert.deepStrictEqual(continuousMedianHandler.getMedian(), 10);
		continuousMedianHandler.insert(200);
		assert.deepStrictEqual(continuousMedianHandler.getMedian(), 55);
	}

	test_4() {
		/**
         * [
            {
                "arguments": [5],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [10],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [100],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [200],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [6],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [],
                "method": "getMedian",
                "output": 10
            },
            {
                "arguments": [13],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [],
                "method": "getMedian",
                "output": 11.5
            }
            ]
         */

		const continuousMedianHandler = new this.Problem();

		this.current_test_name = '[5, 10, 100, 200, 6, 13] => [10, 11.5]';
		continuousMedianHandler.insert(5);
		continuousMedianHandler.insert(10);
		continuousMedianHandler.insert(100);
		continuousMedianHandler.insert(200);
		continuousMedianHandler.insert(6);
		assert.deepStrictEqual(continuousMedianHandler.getMedian(), 10);
		continuousMedianHandler.insert(13);
		assert.deepStrictEqual(continuousMedianHandler.getMedian(), 11.5);
	}

	test_5() {
		/**
         * [
            {
                "arguments": [5],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [10],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [100],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [200],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [6],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [13],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [14],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [],
                "method": "getMedian",
                "output": 13
            },
            {
                "arguments": [50],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [],
                "method": "getMedian",
                "output": 13.5
            }
            ]
         */

		const continuousMedianHandler = new this.Problem();

		this.current_test_name =
			'[5, 10, 100, 200, 6, 13, 14, 50] => [13, 13.5]';
		continuousMedianHandler.insert(5);
		continuousMedianHandler.insert(10);
		continuousMedianHandler.insert(100);
		continuousMedianHandler.insert(200);
		continuousMedianHandler.insert(6);
		continuousMedianHandler.insert(13);
		continuousMedianHandler.insert(14);
		assert.deepStrictEqual(continuousMedianHandler.getMedian(), 13);
		continuousMedianHandler.insert(50);
		assert.deepStrictEqual(continuousMedianHandler.getMedian(), 13.5);
	}

	test_6() {
		/**
         * [
             {
                "arguments": [5],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [10],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [100],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [200],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [6],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [13],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [14],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [50],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [51],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [],
                "method": "getMedian",
                "output": 14
            },
            {
                "arguments": [52],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [],
                "method": "getMedian",
                "output": 32
            }
            ]
         */

		const continuousMedianHandler = new this.Problem();

		this.current_test_name =
			'[5, 10, 100, 200, 6, 13, 14, 50, 51, 52] => [14, 32]';
		continuousMedianHandler.insert(5);
		continuousMedianHandler.insert(10);
		continuousMedianHandler.insert(100);
		continuousMedianHandler.insert(200);
		continuousMedianHandler.insert(6);
		continuousMedianHandler.insert(13);
		continuousMedianHandler.insert(14);
		continuousMedianHandler.insert(50);
		continuousMedianHandler.insert(51);
		assert.deepStrictEqual(continuousMedianHandler.getMedian(), 14);
		continuousMedianHandler.insert(52);
		assert.deepStrictEqual(continuousMedianHandler.getMedian(), 32);
	}

	test_7() {
		/**
         * [
                {
                    "arguments": [5],
                    "method": "insert",
                    "output": null
                },
                {
                    "arguments": [10],
                    "method": "insert",
                    "output": null
                },
                {
                    "arguments": [100],
                    "method": "insert",
                    "output": null
                },
                {
                    "arguments": [200],
                    "method": "insert",
                    "output": null
                },
                {
                    "arguments": [6],
                    "method": "insert",
                    "output": null
                },
                {
                    "arguments": [13],
                    "method": "insert",
                    "output": null
                },
                {
                    "arguments": [14],
                    "method": "insert",
                    "output": null
                },
                {
                    "arguments": [50],
                    "method": "insert",
                    "output": null
                },
                {
                    "arguments": [51],
                    "method": "insert",
                    "output": null
                },
                {
                    "arguments": [52],
                    "method": "insert",
                    "output": null
                },
                {
                    "arguments": [1000],
                    "method": "insert",
                    "output": null
                },
                {
                    "arguments": [],
                    "method": "getMedian",
                    "output": 50
                },
                {
                    "arguments": [10000],
                    "method": "insert",
                    "output": null
                },
         */

		const continuousMedianHandler = new this.Problem();

		this.current_test_name =
			'[5, 10, 100, 200, 6, 13, 14, 50, 51, 52, 1000, 10000] => [50, 100]';
		continuousMedianHandler.insert(5);
		continuousMedianHandler.insert(10);
		continuousMedianHandler.insert(100);
		continuousMedianHandler.insert(200);
		continuousMedianHandler.insert(6);
		continuousMedianHandler.insert(13);
		continuousMedianHandler.insert(14);
		continuousMedianHandler.insert(50);
		continuousMedianHandler.insert(51);
		continuousMedianHandler.insert(52);
		continuousMedianHandler.insert(1000);
		assert.deepStrictEqual(continuousMedianHandler.getMedian(), 50);
		continuousMedianHandler.insert(10000);
		assert.deepStrictEqual(continuousMedianHandler.getMedian(), 50.5);
	}

	test_8() {
		/**
         * [
            {
                "arguments": [5],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [10],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [100],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [200],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [6],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [13],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [14],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [50],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [51],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [52],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [1000],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [10000],
                "method": "insert",
                "output": null
            },
            {
                "arguments": [10001],
                "method": "insert",
                "output": null
            },
         */

		const continuousMedianHandler = new this.Problem();

		this.current_test_name =
			'[5, 10, 100, 200, 6, 13, 14, 50, 51, 52, 1000, 10000, 10001] => [100, 100]';
		continuousMedianHandler.insert(5);
		continuousMedianHandler.insert(10);
		continuousMedianHandler.insert(100);
		continuousMedianHandler.insert(200);
		continuousMedianHandler.insert(6);
		continuousMedianHandler.insert(13);
		continuousMedianHandler.insert(14);
		continuousMedianHandler.insert(50);
		continuousMedianHandler.insert(51);
		continuousMedianHandler.insert(52);
		continuousMedianHandler.insert(1000);
		continuousMedianHandler.insert(10000);
		continuousMedianHandler.insert(10001);
	}
}

class MinNumberOfJumps extends ProblemTests {
	constructor(Problem) {
		super(Problem);

		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
		this.tests.push(() => this.test_4());
		this.tests.push(() => this.test_5());
		this.tests.push(() => this.test_6());
		this.tests.push(() => this.test_7());
		this.tests.push(() => this.test_8());
		this.tests.push(() => this.test_9());
		this.tests.push(() => this.test_10());
	}

	test_1() {
		this.current_test_name = '[3, 4, 2, 1, 2, 3, 7, 1, 1, 1, 3] => 4';
		const minNumberOfJumps = new this.Problem();
		assert.deepStrictEqual(
			minNumberOfJumps.solve([3, 4, 2, 1, 2, 3, 7, 1, 1, 1, 3]),
			4
		);
	}

	test_2() {
		/**
         * 0
            View Outputs Side By Side
            Input(s)
            {
            "array": [1]
            }
         */

		this.current_test_name = '[1] => 0';
		const minNumberOfJumps = new this.Problem();
		assert.deepStrictEqual(minNumberOfJumps.solve([1]), 0);
	}

	test_3() {
		/**
         * 1
        View Outputs Side By Side
        Input(s)
        {
        "array": [1, 1]
        }
        */

		this.current_test_name = '[1, 1] => 1';
		const minNumberOfJumps = new this.Problem();
		assert.deepStrictEqual(minNumberOfJumps.solve([1, 1]), 1);
	}

	test_4() {
		/**
         * 1
            View Outputs Side By Side
            Input(s)
            {
            "array": [3, 1]
            }
         */

		this.current_test_name = '[3, 1] => 1';
		const minNumberOfJumps = new this.Problem();
		assert.deepStrictEqual(minNumberOfJumps.solve([3, 1]), 1);
	}

	test_5() {
		/**
         * 2
            View Outputs Side By Side
            Input(s)
            {
            "array": [1, 1, 1]
            }
         */

		this.current_test_name = '[1, 1, 1] => 2';
		const minNumberOfJumps = new this.Problem();
		assert.deepStrictEqual(minNumberOfJumps.solve([1, 1, 1]), 2);
	}

	test_6() {
		/**
         * 1
            View Outputs Side By Side
            Input(s)
            {
            "array": [2, 1, 1]
            }
         */

		this.current_test_name = '[2, 1, 1] => 1';
		const minNumberOfJumps = new this.Problem();
		assert.deepStrictEqual(minNumberOfJumps.solve([2, 1, 1]), 1);
	}

	test_7() {
		/**
         * 2
            View Outputs Side By Side
            Input(s)
            {
            "array": [2, 1, 2, 3, 1]
            }
         */

		this.current_test_name = '[2, 1, 2, 3, 1] => 2';
		const minNumberOfJumps = new this.Problem();
		assert.deepStrictEqual(minNumberOfJumps.solve([2, 1, 2, 3, 1]), 2);
	}

	test_8() {
		/**
         * 3
            View Outputs Side By Side
            Input(s)
            {
            "array": [2, 1, 2, 3, 1, 1, 1]
            }
         */

		this.current_test_name = '[2, 1, 2, 3, 1, 1, 1] => 3';
		const minNumberOfJumps = new this.Problem();
		assert.deepStrictEqual(
			minNumberOfJumps.solve([2, 1, 2, 3, 1, 1, 1]),
			3
		);
	}

	test_9() {
		/**
         * 4
            View Outputs Side By Side
            Input(s)
            {
            "array": [2, 1, 2, 2, 1, 1, 1]
            }
         */

		this.current_test_name = '[2, 1, 2, 2, 1, 1, 1] => 4';
		const minNumberOfJumps = new this.Problem();
		assert.deepStrictEqual(
			minNumberOfJumps.solve([2, 1, 2, 2, 1, 1, 1]),
			4
		);
	}

	test_10() {
		/**
         * 5
            View Outputs Side By Side
            Input(s)
            {
            "array": [3, 4, 2, 1, 2, 3, 7, 1, 1, 1, 3, 2, 6, 2, 1, 1, 1, 1]
            }
         */

		this.current_test_name =
			'[3, 4, 2, 1, 2, 3, 7, 1, 1, 1, 3, 2, 6, 2, 1, 1, 1, 1] => 5';
		const minNumberOfJumps = new this.Problem();
		assert.deepStrictEqual(
			minNumberOfJumps.solve([
				3, 4, 2, 1, 2, 3, 7, 1, 1, 1, 3, 2, 6, 2, 1, 1, 1, 1
			]),
			5
		);
	}
}

class MultiStringSearch extends ProblemTests {
	constructor(Problem) {
		super(Problem);

		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
		this.tests.push(() => this.test_4());
		this.tests.push(() => this.test_5());
		this.tests.push(() => this.test_6());
		this.tests.push(() => this.test_7());
		this.tests.push(() => this.test_8());
		this.tests.push(() => this.test_9());
		this.tests.push(() => this.test_10());
	}

	test_1() {
		/**
         * [true, false, true, true, false, true, false]
            View Outputs Side By Side
            Input(s)
            {
            "bigString": "this is a big string",
            "smallStrings": ["this", "yo", "is", "a", "bigger", "string", "kappa"]
            }
         */

		this.current_test_name =
			'["this", "yo", "is", "a", "bigger", "string", "kappa"] => [true, false, true, true, false, true, false]';
		const multiStringSearch = new this.Problem();

		assert.deepStrictEqual(
			multiStringSearch.solve('this is a big string', [
				'this',
				'yo',
				'is',
				'a',
				'bigger',
				'string',
				'kappa'
			]),
			[true, false, true, true, false, true, false]
		);
	}

	test_2() {
		/**
         * [true, true, false, true, true, false]
            View Outputs Side By Side
            Input(s)
            {
            "bigString": "abcdefghijklmnopqrstuvwxyz",
            "smallStrings": ["abc", "mnopqr", "wyz", "no", "e", "tuuv"]
            }
         */

		this.current_test_name =
			'["abc", "mnopqr", "wyz", "no", "e", "tuuv"] => [true, true, false, true, true, false]';
		const multiStringSearch = new this.Problem();

		assert.deepStrictEqual(
			multiStringSearch.solve('abcdefghijklmnopqrstuvwxyz', [
				'abc',
				'mnopqr',
				'wyz',
				'no',
				'e',
				'tuuv'
			]),
			[true, true, false, true, true, false]
		);
	}

	test_3() {
		/**
         * [true, true, true, true, true, false, false]
            View Outputs Side By Side
            Input(s)
            {
            "bigString": "abcdefghijklmnopqrstuvwxyz",
            "smallStrings": ["abcdefghijklmnopqrstuvwxyz", "abc", "j", "mnopqr", "pqrstuvwxyz", "xyzz", "defh"]
            }
         */

		this.current_test_name =
			'["abcdefghijklmnopqrstuvwxyz", "abc", "j", "mnopqr", "pqrstuvwxyz", "xyzz", "defh"] => [true, true, true, true, true, false, false]';
		const multiStringSearch = new this.Problem();

		assert.deepStrictEqual(
			multiStringSearch.solve('abcdefghijklmnopqrstuvwxyz', [
				'abcdefghijklmnopqrstuvwxyz',
				'abc',
				'j',
				'mnopqr',
				'pqrstuvwxyz',
				'xyzz',
				'defh'
			]),
			[true, true, true, true, true, false, false]
		);
	}

	test_4() {
		/**
         * [false, true, true, true, false, false, false]
            View Outputs Side By Side
            Input(s)
            {
            "bigString": "hj!)!%Hj1jh8f1985n!)51",
            "smallStrings": ["%Hj7", "8f198", "!)5", "!)!", "!!", "jh81", "j181hf"]
            }
         */

		this.current_test_name =
			'["%Hj7", "8f198", "!)5", "!)!", "!!", "jh81", "j181hf"] => [false, true, true, true, false, false, false]';
		const multiStringSearch = new this.Problem();

		assert.deepStrictEqual(
			multiStringSearch.solve('hj!)!%Hj1jh8f1985n!)51', [
				'%Hj7',
				'8f198',
				'!)5',
				'!)!',
				'!!',
				'jh81',
				'j181hf'
			]),
			[false, true, true, true, false, false, false]
		);
	}

	test_5() {
		/**
         * [true, true, false, true, true, false, false]
            View Outputs Side By Side
            Input(s)
            {
            "bigString": "Mary goes to the shopping center every week.",
            "smallStrings": ["to", "Mary", "centers", "shop", "shopping", "string", "kappa"]
            }
         */

		this.current_test_name =
			'["to", "Mary", "centers", "shop", "shopping", "string", "kappa"] => [true, true, false, true, true, false, false]';
		const multiStringSearch = new this.Problem();

		assert.deepStrictEqual(
			multiStringSearch.solve(
				'Mary goes to the shopping center every week.',
				['to', 'Mary', 'centers', 'shop', 'shopping', 'string', 'kappa']
			),
			[true, true, false, true, true, false, false]
		);
	}

	test_6() {
		/**
         * [false, false, false, false, true, false, false]
            View Outputs Side By Side
            Input(s)
            {
            "bigString": "adcb akfkw afnmc fkadn vkaca jdaf dacb cdba cbda",
            "smallStrings": ["abcd", "acbd", "adbc", "dabc", "cbda", "cabd", "cdab"]
            }
         */

		this.current_test_name =
			'["abcd", "acbd", "adbc", "dabc", "cbda", "cabd", "cdab"] => [false, false, false, false, true, false, false]';
		const multiStringSearch = new this.Problem();

		assert.deepStrictEqual(
			multiStringSearch.solve(
				'adcb akfkw afnmc fkadn vkaca jdaf dacb cdba cbda',
				['abcd', 'acbd', 'adbc', 'dabc', 'cbda', 'cabd', 'cdab']
			),
			[false, false, false, false, true, false, false]
		);
	}

	test_7() {
		/**
         * [true, false, false, false, true, true]
            View Outputs Side By Side
            Input(s)
            {
            "bigString": "test testing testings tests testers test-takers",
            "smallStrings": ["tests", "testatk", "testiing", "trsatii", "test-taker", "test"]
            }
         */

		this.current_test_name =
			'["tests", "testatk", "testiing", "trsatii", "test-taker", "test"] => [true, false, false, false, true, true]';
		const multiStringSearch = new this.Problem();

		assert.deepStrictEqual(
			multiStringSearch.solve(
				'test testing testings tests testers test-takers',
				[
					'tests',
					'testatk',
					'testiing',
					'trsatii',
					'test-taker',
					'test'
				]
			),
			[true, false, false, false, true, true]
		);
	}

	test_8() {
		/**
         * [false, false, false, false, false, false, true]
            View Outputs Side By Side
            Input(s)
            {
            "bigString": "ndbajwhfawkjljkfaopwdlaawjk dawkj awjkawkfjhkawk ahjwkjad jadfljawd",
            "smallStrings": ["abc", "akwbc", "awbc", "abafac", "ajjfbc", "abac", "jadfl"]
            }
         */

		this.current_test_name =
			'["abc", "akwbc", "awbc", "abafac", "ajjfbc", "abac", "jadfl"] => [false, false, false, false, false, false, true]';
		const multiStringSearch = new this.Problem();

		assert.deepStrictEqual(
			multiStringSearch.solve(
				'ndbajwhfawkjljkfaopwdlaawjk dawkj awjkawkfjhkawk ahjwkjad jadfljawd',
				['abc', 'akwbc', 'awbc', 'abafac', 'ajjfbc', 'abac', 'jadfl']
			),
			[false, false, false, false, false, false, true]
		);
	}

	test_9() {
		/**
         * [false, true, false, false, false, false, false, true, true]
            View Outputs Side By Side
            Input(s)
            {
            "bigString": "Is this particular test going to pass or is it going to fail? That is the question.",
            "smallStrings": ["that", "the", "questions", "goes", "mountain", "passes", "passed", "going", "is"]
            }
         */

		this.current_test_name =
			'["that", "the", "questions", "goes", "mountain", "passes", "passed", "going", "is"] => [false, true, false, false, false, false, false, true, true]';
		const multiStringSearch = new this.Problem();

		assert.deepStrictEqual(
			multiStringSearch.solve(
				'Is this particular test going to pass or is it going to fail? That is the question.',
				[
					'that',
					'the',
					'questions',
					'goes',
					'mountain',
					'passes',
					'passed',
					'going',
					'is'
				]
			),
			[false, true, false, false, false, false, false, true, true]
		);
	}

	test_10() {
		/**
         * [false, false, false, false, false, false]
            View Outputs Side By Side
            Input(s)
            {
            "bigString": "Everything in this test should fail.",
            "smallStrings": ["everything", "inn", "that", "testers", "shall", "failure"]
            }
         */

		this.current_test_name =
			'["everything", "inn", "that", "testers", "shall", "failure"] => [false, false, false, false, false, false]';
		const multiStringSearch = new this.Problem();

		assert.deepStrictEqual(
			multiStringSearch.solve('Everything in this test should fail.', [
				'everything',
				'inn',
				'that',
				'testers',
				'shall',
				'failure'
			]),
			[false, false, false, false, false, false]
		);
	}
}

class KnacksackProblem extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
		this.tests.push(() => this.test_4());
		this.tests.push(() => this.test_5());
		this.tests.push(() => this.test_6());
		this.tests.push(() => this.test_7());
	}

	test_1() {
		/**
         * [10, [1, 3]]
            View Outputs Side By Side
            Input(s)
            {
            "capacity": 10,
            "items": [
                [1, 2],
                [4, 3],
                [5, 6],
                [6, 7]
            ]
            }
         */

		this.current_test_name =
			'[10, [[1, 2], [4, 3], [5, 6], [6, 7]]] => [10, [1, 3]]';
		const knapsackProblem = new this.Problem();

		assert.deepStrictEqual(
			knapsackProblem.solve(10, [
				[1, 2],
				[4, 3],
				[5, 6],
				[6, 7]
			]),
			[10, [1, 3]]
		);
	}

	test_2() {
		/**
         * [10, [0, 1, 2]]
        View Outputs Side By Side
        Input(s)
        {
        "capacity": 11,
        "items": [
            [1, 2],
            [4, 3],
            [5, 6],
            [6, 9]
        ]
        }
        */

		this.current_test_name =
			'[11, [[1, 2], [4, 3], [5, 6], [6, 9]]] => [10, [0, 1, 2]]';
		const knapsackProblem = new this.Problem();

		assert.deepStrictEqual(
			knapsackProblem.solve(11, [
				[1, 2],
				[4, 3],
				[5, 6],
				[6, 9]
			]),
			[10, [0, 1, 2]]
		);
	}

	test_3() {
		/**
         * [1500, [3, 12, 14]]
            View Outputs Side By Side
            Input(s)
            {
            "capacity": 200,
            "items": [
                [465, 100],
                [400, 85],
                [255, 55],
                [350, 45],
                [650, 130],
                [1000, 190],
                [455, 100],
                [100, 25],
                [1200, 190],
                [320, 65],
                [750, 100],
                [50, 45],
                [550, 65],
                [100, 50],
                [600, 70],
                [240, 40]
            ]
            }
         */

		this.current_test_name =
			'[200, [[465, 100], [400, 85], [255, 55], [350, 45], [650, 130], [1000, 190], [455, 100], [100, 25], [1200, 190], [320, 65], [750, 100], [50, 45], [550, 65], [100, 50], [600, 70], [240, 40]]] => [1500, [3, 12, 14]]';
		const knapsackProblem = new this.Problem();

		assert.deepStrictEqual(
			knapsackProblem.solve(200, [
				[465, 100],
				[400, 85],
				[255, 55],
				[350, 45],
				[650, 130],
				[1000, 190],
				[455, 100],
				[100, 25],
				[1200, 190],
				[320, 65],
				[750, 100],
				[50, 45],
				[550, 65],
				[100, 50],
				[600, 70],
				[240, 40]
			]),
			[1500, [3, 12, 14]]
		);
	}

	test_4() {
		/**
         * [1505, [7, 12, 14, 15]]
            View Outputs Side By Side
            Input(s)
            {
            "capacity": 200,
            "items": [
                [465, 100],
                [400, 85],
                [255, 55],
                [350, 45],
                [650, 130],
                [1000, 190],
                [455, 100],
                [100, 25],
                [1200, 190],
                [320, 65],
                [750, 100],
                [50, 45],
                [550, 65],
                [100, 50],
                [600, 70],
                [255, 40]
            ]
            }
         */

		this.current_test_name =
			'[200, [[465, 100], [400, 85], [255, 55], [350, 45], [650, 130], [1000, 190], [455, 100], [100, 25], [1200, 190], [320, 65], [750, 100], [50, 45], [550, 65], [100, 50], [600, 70], [255, 40]]] => [1505, [7, 12, 14, 15]]';
		const knapsackProblem = new this.Problem();

		assert.deepStrictEqual(
			knapsackProblem.solve(200, [
				[465, 100],
				[400, 85],
				[255, 55],
				[350, 45],
				[650, 130],
				[1000, 190],
				[455, 100],
				[100, 25],
				[1200, 190],
				[320, 65],
				[750, 100],
				[50, 45],
				[550, 65],
				[100, 50],
				[600, 70],
				[255, 40]
			]),
			[1505, [7, 12, 14, 15]]
		);
	}

	test_5() {
		/**
         * [101, [0, 2, 3]]
            View Outputs Side By Side
            Input(s)
            {
            "capacity": 100,
            "items": [
                [2, 1],
                [70, 70],
                [30, 30],
                [69, 69],
                [100, 100]
            ]
            }
         */

		this.current_test_name =
			'[100, [[2, 1], [70, 70], [30, 30], [69, 69], [100, 100]]] => [101, [0, 2, 3]]';
		const knapsackProblem = new this.Problem();

		assert.deepStrictEqual(
			knapsackProblem.solve(100, [
				[2, 1],
				[70, 70],
				[30, 30],
				[69, 69],
				[100, 100]
			]),
			[101, [0, 2, 3]]
		);
	}

	test_6() {
		/**
         * [100, [1, 2]]
            View Outputs Side By Side
            Input(s)
            {
            "capacity": 100,
            "items": [
                [1, 2],
                [70, 70],
                [30, 30],
                [69, 69],
                [99, 100]
            ]
            }
         */

		this.current_test_name =
			'[100, [[1, 2], [70, 70], [30, 30], [69, 69], [99, 100]]] => [100, [1, 2]]';
		const knapsackProblem = new this.Problem();

		assert.deepStrictEqual(
			knapsackProblem.solve(100, [
				[1, 2],
				[70, 70],
				[30, 30],
				[69, 69],
				[99, 100]
			]),
			[100, [1, 2]]
		);
	}

	test_7() {
		/**
         * [0, []]
            View Outputs Side By Side
            Input(s)
            {
            "capacity": 0,
            "items": [
                [1, 2],
                [70, 70],
                [30, 30],
                [69, 69],
                [100, 100]
            ]
            }
         */

		this.current_test_name =
			'[0, [[1, 2], [70, 70], [30, 30], [69, 69], [100, 100]]] => [0, []]';
		const knapsackProblem = new this.Problem();

		assert.deepStrictEqual(
			knapsackProblem.solve(0, [
				[1, 2],
				[70, 70],
				[30, 30],
				[69, 69],
				[100, 100]
			]),
			[0, []]
		);
	}
}

class DiskStacking extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
		this.tests.push(() => this.test_4());
		this.tests.push(() => this.test_5());
		this.tests.push(() => this.test_6());
		this.tests.push(() => this.test_7());
		this.tests.push(() => this.test_8());
		this.tests.push(() => this.test_9());
	}

	test_1() {
		/**
         * [
            [2, 1, 2],
            [3, 2, 3],
            [4, 4, 5]
            ]
            View Outputs Side By Side
            Input(s)
            {
            "disks": [
                [2, 1, 2],
                [3, 2, 3],
                [2, 2, 8],
                [2, 3, 4],
                [1, 3, 1],
                [4, 4, 5]
            ]
            }
         */

		this.current_test_name =
			'[[2, 1, 2], [3, 2, 3], [2, 2, 8], [2, 3, 4], [1, 3, 1], [4, 4, 5]] => [[2, 1, 2], [3, 2, 3], [4, 4, 5]]';
		const diskStacking = new this.Problem();

		assert.deepStrictEqual(
			diskStacking.solve([
				[2, 1, 2],
				[3, 2, 3],
				[2, 2, 8],
				[2, 3, 4],
				[1, 3, 1],
				[4, 4, 5]
			]),
			[
				[2, 1, 2],
				[3, 2, 3],
				[4, 4, 5]
			]
		);
	}

	test_2() {
		/**
         * [
            [2, 1, 2]
            ]
            View Outputs Side By Side
            Input(s)
            {
            "disks": [
                [2, 1, 2]
            ]
            }
         */

		this.current_test_name = '[[2, 1, 2]] => [[2, 1, 2]]';
		const diskStacking = new this.Problem();

		assert.deepStrictEqual(diskStacking.solve([[2, 1, 2]]), [[2, 1, 2]]);
	}

	test_3() {
		/**
         * [
            [2, 1, 2],
            [3, 2, 3]
            ]
            View Outputs Side By Side
            Input(s)
            {
            "disks": [
                [2, 1, 2],
                [3, 2, 3]
            ]
            }
         */

		this.current_test_name =
			'[[2, 1, 2], [3, 2, 3]] => [[2, 1, 2], [3, 2, 3]]';
		const diskStacking = new this.Problem();

		assert.deepStrictEqual(
			diskStacking.solve([
				[2, 1, 2],
				[3, 2, 3]
			]),
			[
				[2, 1, 2],
				[3, 2, 3]
			]
		);
	}

	test_4() {
		/**
         * [
            [2, 2, 8]
            ]
            View Outputs Side By Side
            Input(s)
            {
            "disks": [
                [2, 1, 2],
                [3, 2, 3],
                [2, 2, 8]
            ]
            }
         */

		this.current_test_name =
			'[[2, 1, 2], [3, 2, 3], [2, 2, 8]] => [[2, 2, 8]]';
		const diskStacking = new this.Problem();

		assert.deepStrictEqual(
			diskStacking.solve([
				[2, 1, 2],
				[3, 2, 3],
				[2, 2, 8]
			]),
			[[2, 2, 8]]
		);
	}

	test_5() {
		/**
         * [
            [2, 1, 2],
            [3, 2, 3]
            ]
            View Outputs Side By Side
            Input(s)
            {
            "disks": [
                [2, 1, 2],
                [3, 2, 3],
                [2, 3, 4]
            ]
            }
         */

		this.current_test_name =
			'[[2, 1, 2], [3, 2, 3], [2, 3, 4]] => [[2, 1, 2], [3, 2, 3]]';
		const diskStacking = new this.Problem();

		assert.deepStrictEqual(
			diskStacking.solve([
				[2, 1, 2],
				[3, 2, 3],
				[2, 3, 4]
			]),
			[
				[2, 1, 2],
				[3, 2, 3]
			]
		);
	}

	test_6() {
		/**
         * [
            [2, 1, 2],
            [3, 2, 3],
            [4, 4, 5]
            ]
            View Outputs Side By Side
            Input(s)
            {
            "disks": [
                [2, 1, 2],
                [3, 2, 3],
                [2, 2, 8],
                [2, 3, 4],
                [2, 2, 1],
                [4, 4, 5]
            ]
            }
         */

		this.current_test_name =
			'[[2, 1, 2], [3, 2, 3], [2, 2, 8], [2, 3, 4], [2, 2, 1], [4, 4, 5]] => [[2, 1, 2], [3, 2, 3], [4, 4, 5]]';
		const diskStacking = new this.Problem();

		assert.deepStrictEqual(
			diskStacking.solve([
				[2, 1, 2],
				[3, 2, 3],
				[2, 2, 8],
				[2, 3, 4],
				[2, 2, 1],
				[4, 4, 5]
			]),
			[
				[2, 1, 2],
				[3, 2, 3],
				[4, 4, 5]
			]
		);
	}

	test_7() {
		/**
         * [
            [2, 3, 4],
            [4, 4, 5]
            ]
            View Outputs Side By Side
            Input(s)
            {
            "disks": [
                [2, 1, 2],
                [3, 2, 5],
                [2, 2, 8],
                [2, 3, 4],
                [2, 2, 1],
                [4, 4, 5]
            ]
            }
         */

		this.current_test_name =
			'[[2, 1, 2], [3, 2, 5], [2, 2, 8], [2, 3, 4], [2, 2, 1], [4, 4, 5]] => [[2, 3, 4], [4, 4, 5]]';
		const diskStacking = new this.Problem();

		assert.deepStrictEqual(
			diskStacking.solve([
				[2, 1, 2],
				[3, 2, 5],
				[2, 2, 8],
				[2, 3, 4],
				[2, 2, 1],
				[4, 4, 5]
			]),
			[
				[2, 3, 4],
				[4, 4, 5]
			]
		);
	}

	test_8() {
		/**
         * [
            [1, 1, 4],
            [2, 2, 8]
            ]
            View Outputs Side By Side
            Input(s)
            {
            "disks": [
                [2, 1, 2],
                [3, 2, 3],
                [2, 2, 8],
                [2, 3, 4],
                [1, 2, 1],
                [4, 4, 5],
                [1, 1, 4]
            ]
            }
         */

		this.current_test_name =
			'[[2, 1, 2], [3, 2, 3], [2, 2, 8], [2, 3, 4], [1, 2, 1], [4, 4, 5], [1, 1, 4]] => [[1, 1, 4], [2, 2, 8]]';
		const diskStacking = new this.Problem();

		assert.deepStrictEqual(
			diskStacking.solve([
				[2, 1, 2],
				[3, 2, 3],
				[2, 2, 8],
				[2, 3, 4],
				[1, 2, 1],
				[4, 4, 5],
				[1, 1, 4]
			]),
			[
				[1, 1, 4],
				[2, 2, 8]
			]
		);
	}

	test_9() {
		/**
         * [
            [2, 2, 3],
            [3, 3, 4],
            [4, 4, 5],
            [5, 5, 6]
            ]
            View Outputs Side By Side
            Input(s)
            {
            "disks": [
                [3, 3, 4],
                [2, 1, 2],
                [3, 2, 3],
                [2, 2, 8],
                [2, 3, 4],
                [5, 5, 6],
                [1, 2, 1],
                [4, 4, 5],
                [1, 1, 4],
                [2, 2, 3]
            ]
            }
         */

		this.current_test_name =
			'[[3, 3, 4], [2, 1, 2], [3, 2, 3], [2, 2, 8], [2, 3, 4], [5, 5, 6], [1, 2, 1], [4, 4, 5], [1, 1, 4], [2, 2, 3]] => [[2, 2, 3], [3, 3, 4], [4, 4, 5], [5, 5, 6]]';
		const diskStacking = new this.Problem();

		assert.deepStrictEqual(
			diskStacking.solve([
				[3, 3, 4],
				[2, 1, 2],
				[3, 2, 3],
				[2, 2, 8],
				[2, 3, 4],
				[5, 5, 6],
				[1, 2, 1],
				[4, 4, 5],
				[1, 1, 4],
				[2, 2, 3]
			]),
			[
				[2, 2, 3],
				[3, 3, 4],
				[4, 4, 5],
				[5, 5, 6]
			]
		);
	}
}

class NumbersInPi extends ProblemTests {
	constructor(Problem) {
		super(Problem);

		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
		this.tests.push(() => this.test_4());
		this.tests.push(() => this.test_5());
		this.tests.push(() => this.test_6());
		this.tests.push(() => this.test_7());
		this.tests.push(() => this.test_8());
		this.tests.push(() => this.test_9());
		this.tests.push(() => this.test_10());
	}

	test_1() {
		/**
         * 2
            View Outputs Side By Side
            Input(s)
            {
            "numbers": ["314159265358979323846", "26433", "8", "3279", "314159265", "35897932384626433832", "79"],
            "pi": "3141592653589793238462643383279"
            }
         */

		this.current_test_name =
			'"3141592653589793238462643383279", ["314159265358979323846", "26433", "8", "3279", "314159265", "35897932384626433832", "79"] => 2';
		const numbersInPi = new this.Problem();

		assert.equal(
			numbersInPi.solve('3141592653589793238462643383279', [
				'314159265358979323846',
				'26433',
				'8',
				'3279',
				'314159265',
				'35897932384626433832',
				'79'
			]),
			2
		);
	}

	test_2() {
		/**
         * 1
            View Outputs Side By Side
            Input(s)
            {
            "numbers": ["314159265358979323846264338327", "9"],
            "pi": "3141592653589793238462643383279"
            }
         */

		this.current_test_name =
			'"3141592653589793238462643383279" , ["314159265358979323846264338327", "9"]=> 1';
		const numbersInPi = new this.Problem();

		assert.equal(
			numbersInPi.solve('3141592653589793238462643383279', [
				'314159265358979323846264338327',
				'9'
			]),
			1
		);
	}

	test_3() {
		/**
         * 3
        View Outputs Side By Side
        Input(s)
        {
        "numbers": ["3", "314", "49", "9001", "15926535897", "14", "9323", "8462643383279", "4", "793"],
        "pi": "3141592653589793238462643383279"
        }
         */

		this.current_test_name =
			'"3141592653589793238462643383279", ["3", "314", "49", "9001", "15926535897", "14", "9323", "8462643383279", "4", "793"] => 3';
		const numbersInPi = new this.Problem();

		assert.equal(
			numbersInPi.solve('3141592653589793238462643383279', [
				'3',
				'314',
				'49',
				'9001',
				'15926535897',
				'14',
				'9323',
				'8462643383279',
				'4',
				'793'
			]),
			3
		);
	}

	test_4() {
		/**
         * 0
            View Outputs Side By Side
            Input(s)
            {
            "numbers": ["3141592653589793238462643383279"],
            "pi": "3141592653589793238462643383279"
            }
         */

		this.current_test_name =
			'"3141592653589793238462643383279", ["3141592653589793238462643383279"] => 0';
		const numbersInPi = new this.Problem();

		assert.equal(
			numbersInPi.solve('3141592653589793238462643383279', [
				'3141592653589793238462643383279'
			]),
			0
		);
	}

	test_5() {
		/**
         * -1
            View Outputs Side By Side
            Input(s)
            {
            "numbers": ["3141", "1512", "159", "793", "12412451", "8462643383279"],
            "pi": "3141592653589793238462643383279"
            }
         */

		this.current_test_name =
			'"3141592653589793238462643383279", ["3141", "1512", "159", "793", "12412451", "8462643383279"] => -1';
		const numbersInPi = new this.Problem();

		assert.equal(
			numbersInPi.solve('3141592653589793238462643383279', [
				'3141',
				'1512',
				'159',
				'793',
				'12412451',
				'8462643383279'
			]),
			-1
		);
	}

	test_6() {
		/**
         * 2
            View Outputs Side By Side
            Input(s)
            {
            "numbers": ["314159265358979323846", "327", "26433", "8", "3279", "9", "314159265", "35897932384626433832", "79"],
            "pi": "3141592653589793238462643383279"
            }
         */

		this.current_test_name =
			'"3141592653589793238462643383279", ["314159265358979323846", "327", "26433", "8", "3279", "9", "314159265", "35897932384626433832", "79"] => 2';
		const numbersInPi = new this.Problem();

		assert.equal(
			numbersInPi.solve('3141592653589793238462643383279', [
				'314159265358979323846',
				'327',
				'26433',
				'8',
				'3279',
				'9',
				'314159265',
				'35897932384626433832',
				'79'
			]),
			2
		);
	}

	test_7() {
		/**
         * 1
        View Outputs Side By Side
        Input(s)
        {
        "numbers": ["141592653589793238462643383279", "314159265358979323846", "327", "26433", "8", "3279", "9", "314159265", "35897932384626433832", "79", "3"],
        "pi": "3141592653589793238462643383279"
        }
         */

		this.current_test_name =
			'"3141592653589793238462643383279", ["141592653589793238462643383279", "314159265358979323846", "327", "26433", "8", "3279", "9", "314159265", "35897932384626433832", "79", "3"] => 1';
		const numbersInPi = new this.Problem();

		assert.equal(
			numbersInPi.solve('3141592653589793238462643383279', [
				'141592653589793238462643383279',
				'314159265358979323846',
				'327',
				'26433',
				'8',
				'3279',
				'9',
				'314159265',
				'35897932384626433832',
				'79',
				'3'
			]),
			1
		);
	}

	test_8() {
		/**
         * 13
            View Outputs Side By Side
            Input(s)
            {
            "numbers": ["3", "1", "4", "592", "65", "55", "35", "8", "9793", "2384626", "83279"],
            "pi": "3141592653589793238462643383279"
            }
         */

		this.current_test_name =
			'"3141592653589793238462643383279", ["3", "1", "4", "592", "65", "55", "35", "8", "9793", "2384626", "83279"] => 13';
		const numbersInPi = new this.Problem();

		assert.equal(
			numbersInPi.solve('3141592653589793238462643383279', [
				'3',
				'1',
				'4',
				'592',
				'65',
				'55',
				'35',
				'8',
				'9793',
				'2384626',
				'83279'
			]),
			13
		);
	}

	test_9() {
		/**
         * 12
            View Outputs Side By Side
            Input(s)
            {
            "numbers": ["3", "1", "4", "592", "65", "55", "35", "8", "9793", "2384626", "383279"],
            "pi": "3141592653589793238462643383279"
            }
         */

		this.current_test_name =
			'"3141592653589793238462643383279", ["3", "1", "4", "592", "65", "55", "35", "8", "9793", "2384626", "383279"] => 12';
		const numbersInPi = new this.Problem();

		assert.equal(
			numbersInPi.solve('3141592653589793238462643383279', [
				'3',
				'1',
				'4',
				'592',
				'65',
				'55',
				'35',
				'8',
				'9793',
				'2384626',
				'383279'
			]),
			12
		);
	}

	test_10() {
		/**
         * -1
            View Outputs Side By Side
            Input(s)
            {
            "numbers": ["3", "141", "592", "65", "55", "35", "8", "9793", "2384626", "383279"],
            "pi": "3141592653589793238462643383279"
            }
         */

		this.current_test_name =
			'"3141592653589793238462643383279", ["3", "141", "592", "65", "55", "35", "8", "9793", "2384626", "383279"] => -1';
		const numbersInPi = new this.Problem();

		assert.equal(
			numbersInPi.solve('3141592653589793238462643383279', [
				'3',
				'141',
				'592',
				'65',
				'55',
				'35',
				'8',
				'9793',
				'2384626',
				'383279'
			]),
			-1
		);
	}
}

class MaximumSumSubmatrix extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
		this.tests.push(() => this.test_4());
		this.tests.push(() => this.test_5());
		this.tests.push(() => this.test_6());
		this.tests.push(() => this.test_7());
		this.tests.push(() => this.test_8());
		this.tests.push(() => this.test_9());
		this.tests.push(() => this.test_10());
	}

	test_1() {
		/**
         * 18
            View Outputs Side By Side
            Input(s)
            {
            "matrix": [
                [5, 3, -1, 5],
                [-7, 3, 7, 4],
                [12, 8, 0, 0],
                [1, -8, -8, 2]
            ],
            "size": 2
            }
         */

		this.current_test_name =
			'[[5, 3, -1, 5], [-7, 3, 7, 4], [12, 8, 0, 0], [1, -8, -8, 2]], 2 => 18';
		const maximumSubSubmatrix = new this.Problem();

		assert.equal(
			maximumSubSubmatrix.solve(
				[
					[5, 3, -1, 5],
					[-7, 3, 7, 4],
					[12, 8, 0, 0],
					[1, -8, -8, 2]
				],
				2
			),
			18
		);
	}

	test_2() {
		/**
         * 28
            View Outputs Side By Side
            Input(s)
            {
            "matrix": [
                [3, -4, 6, -5, 1],
                [1, -2, 8, -4, -2],
                [3, -8, 9, 3, 1],
                [-7, 3, 4, 2, 7],
                [-3, 7, -5, 7, -6]
            ],
            "size": 3
            }
         */

		this.current_test_name =
			'[[3, -4, 6, -5, 1], [1, -2, 8, -4, -2], [3, -8, 9, 3, 1], [-7, 3, 4, 2, 7], [-3, 7, -5, 7, -6]], 3 => 28';
		const maximumSubSubmatrix = new this.Problem();

		assert.equal(
			maximumSubSubmatrix.solve(
				[
					[3, -4, 6, -5, 1],
					[1, -2, 8, -4, -2],
					[3, -8, 9, 3, 1],
					[-7, 3, 4, 2, 7],
					[-3, 7, -5, 7, -6]
				],
				3
			),
			28
		);
	}

	test_3() {
		/**
         * 17
            View Outputs Side By Side
            Input(s)
            {
            "matrix": [
                [2, 4],
                [5, 6],
                [-3, 2]
            ],
            "size": 2
            }
         */

		this.current_test_name = '[[2, 4], [5, 6], [-3, 2]], 2 => 17';
		const maximumSubSubmatrix = new this.Problem();

		assert.equal(
			maximumSubSubmatrix.solve(
				[
					[2, 4],
					[5, 6],
					[-3, 2]
				],
				2
			),
			17
		);
	}

	test_4() {
		/**
         * 38
            View Outputs Side By Side
            Input(s)
            {
            "matrix": [
                [3, -4, 6, -5, 1],
                [1, -2, 8, -4, -2],
                [3, -8, 9, 3, 1],
                [-7, 3, 4, 2, 7],
                [-3, 7, -5, 7, -6],
                [2, 4, 5, 2, 3]
            ],
            "size": 4
            }
         */

		this.current_test_name =
			'[[3, -4, 6, -5, 1], [1, -2, 8, -4, -2], [3, -8, 9, 3, 1], [-7, 3, 4, 2, 7], [-3, 7, -5, 7, -6], [2, 4, 5, 2, 3]], 4 => 38';
		const maximumSubSubmatrix = new this.Problem();

		assert.equal(
			maximumSubSubmatrix.solve(
				[
					[3, -4, 6, -5, 1],
					[1, -2, 8, -4, -2],
					[3, -8, 9, 3, 1],
					[-7, 3, 4, 2, 7],
					[-3, 7, -5, 7, -6],
					[2, 4, 5, 2, 3]
				],
				4
			),
			38
		);
	}

	test_5() {
		/**
         * 1
            View Outputs Side By Side
            Input(s)
            {
            "matrix": [
                [1]
            ],
            "size": 1
            }
         */

		this.current_test_name = '[[1]], 1 => 1';
		const maximumSubSubmatrix = new this.Problem();

		assert.equal(maximumSubSubmatrix.solve([[1]], 1), 1);
	}

	test_6() {
		/**
         * 4
            View Outputs Side By Side
            Input(s)
            {
            "matrix": [
                [1, 1],
                [1, 1]
            ],
            "size": 2
            }
         */

		this.current_test_name = '[[1, 1], [1, 1]], 2 => 4';
		const maximumSubSubmatrix = new this.Problem();

		assert.equal(
			maximumSubSubmatrix.solve(
				[
					[1, 1],
					[1, 1]
				],
				2
			),
			4
		);
	}

	test_7() {
		/**
         * 6
            View Outputs Side By Side
            Input(s)
            {
            "matrix": [
                [1, 1, 2, -1],
                [1, 1, 2, -1]
            ],
            "size": 2
            }
         */

		this.current_test_name = '[[1, 1, 2, -1], [1, 1, 2, -1]], 2 => 6';
		const maximumSubSubmatrix = new this.Problem();

		assert.equal(
			maximumSubSubmatrix.solve(
				[
					[1, 1, 2, -1],
					[1, 1, 2, -1]
				],
				2
			),
			6
		);
	}

	test_8() {
		/**
         * 25
            View Outputs Side By Side
            Input(s)
            {
            "matrix": [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ],
            "size": 5
            }
         */

		this.current_test_name =
			'[[1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]], 5 => 25';
		const maximumSubSubmatrix = new this.Problem();

		assert.equal(
			maximumSubSubmatrix.solve(
				[
					[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
					[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
					[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
					[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
					[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
					[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
					[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
				],
				5
			),
			25
		);
	}

	test_9() {
		/**
         * 45
            View Outputs Side By Side
            Input(s)
            {
            "matrix": [
                [2, 1, 1, 1, 1, 4, -1, 1, 1, 5],
                [1, -1, 1, 1, 1, 1, -1, 1, 4, 1],
                [-50, 12, -1, 1, 5, 1, -1, 1, 1, 1],
                [-52, 99, 1, -1, 1, 1, -1, 1, 1, 1],
                [1, -10, -287, 9, -1, 1, -1, 1, 1, 1],
                [1, 2, 1, 8, 1, -1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, -1, 1, 1, 1]
            ],
            "size": 6
            }
         */

		this.current_test_name =
			'[[2, 1, 1, 1, 1, 4, -1, 1, 1, 5], [1, -1, 1, 1, 1, 1, -1, 1, 4, 1], [-50, 12, -1, 1, 5, 1, -1, 1, 1, 1], [-52, 99, 1, -1, 1, 1, -1, 1, 1, 1], [1, -10, -287, 9, -1, 1, -1, 1, 1, 1], [1, 2, 1, 8, 1, -1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, -1, 1, 1, 1]], 6 => 45';
		const maximumSubSubmatrix = new this.Problem();

		assert.equal(
			maximumSubSubmatrix.solve(
				[
					[2, 1, 1, 1, 1, 4, -1, 1, 1, 5],
					[1, -1, 1, 1, 1, 1, -1, 1, 4, 1],
					[-50, 12, -1, 1, 5, 1, -1, 1, 1, 1],
					[-52, 99, 1, -1, 1, 1, -1, 1, 1, 1],
					[1, -10, -287, 9, -1, 1, -1, 1, 1, 1],
					[1, 2, 1, 8, 1, -1, 1, 1, 1, 1],
					[1, 1, 1, 1, 1, 1, -1, 1, 1, 1]
				],
				6
			),
			45
		);
	}

	test_10() {
		/**
         * -12
            View Outputs Side By Side
            Input(s)
            {
            "matrix": [
                [-1, -2, -3, -4, -5],
                [-5, -4, -3, -2, -1],
                [-1, -2, -3, -4, -5]
            ],
            "size": 2
            }
         */

		this.current_test_name =
			'[[-1, -2, -3, -4, -5], [-5, -4, -3, -2, -1], [-1, -2, -3, -4, -5]], 2 => -12';
		const maximumSubSubmatrix = new this.Problem();

		assert.equal(
			maximumSubSubmatrix.solve(
				[
					[-1, -2, -3, -4, -5],
					[-5, -4, -3, -2, -1],
					[-1, -2, -3, -4, -5]
				],
				2
			),
			-12
		);
	}
}

class MaximizeExpression extends ProblemTests {
	constructor(Problem) {
		super(Problem);

		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
		this.tests.push(() => this.test_4());
		this.tests.push(() => this.test_5());
		this.tests.push(() => this.test_6());
		this.tests.push(() => this.test_7());
		this.tests.push(() => this.test_8());
		this.tests.push(() => this.test_9());
		this.tests.push(() => this.test_10());
	}

	test_1() {
		/**
         * 4
            View Outputs Side By Side
            Input(s)
            {
            "array": [3, 6, 1, -3, 2, 7]
            }
         */

		this.current_test_name = '[3, 6, 1, -3, 2, 7] => 4';
		const maximizeExpression = new this.Problem();

		assert.equal(maximizeExpression.solve([3, 6, 1, -3, 2, 7]), 4);
	}

	test_2() {
		/**
         * 3
            View Outputs Side By Side
            Input(s)
            {
            "array": [3, 9, 10, 1, 30, 40]
            }
         */

		this.current_test_name = '[3, 9, 10, 1, 30, 40] => 3';
		const maximizeExpression = new this.Problem();

		assert.equal(maximizeExpression.solve([3, 9, 10, 1, 30, 40]), 3);
	}

	test_3() {
		/**
         * 46
            View Outputs Side By Side
            Input(s)
            {
            "array": [40, 30, 1, 10, 9, 3]
            }
         */

		this.current_test_name = '[40, 30, 1, 10, 9, 3] => 46';
		const maximizeExpression = new this.Problem();

		assert.equal(maximizeExpression.solve([40, 30, 1, 10, 9, 3]), 46);
	}

	test_4() {
		/**
         * 6
            View Outputs Side By Side
            Input(s)
            {
            "array": [-1, 2, -1, -2, -2, 1, -1]
            }
         */

		this.current_test_name = '[-1, 2, -1, -2, -2, 1, -1] => 6';
		const maximizeExpression = new this.Problem();

		assert.equal(maximizeExpression.solve([-1, 2, -1, -2, -2, 1, -1]), 6);
	}

	test_5() {
		/**
         * 10
            View Outputs Side By Side
            Input(s)
            {
            "array": [10, 5, 10, 5]
            }
         */

		this.current_test_name = '[10, 5, 10, 5] => 10';
		const maximizeExpression = new this.Problem();

		assert.equal(maximizeExpression.solve([10, 5, 10, 5]), 10);
	}

	test_6() {
		/**
         * 1
            View Outputs Side By Side
            Input(s)
            {
            "array": [0, 0, 0, 0, 0, 0, 0, 1, 1, 0]
            }
         */

		this.current_test_name = '[0, 0, 0, 0, 0, 0, 0, 1, 1, 0] => 1';
		const maximizeExpression = new this.Problem();

		assert.equal(
			maximizeExpression.solve([0, 0, 0, 0, 0, 0, 0, 1, 1, 0]),
			1
		);
	}

	test_7() {
		/**
         * 209
            View Outputs Side By Side
            Input(s)
            {
            "array": [34, 21, 22, 0, -98, -72, 100, 23]
            }
         */

		this.current_test_name = '[34, 21, 22, 0, -98, -72, 100, 23] => 209';
		const maximizeExpression = new this.Problem();

		assert.equal(
			maximizeExpression.solve([34, 21, 22, 0, -98, -72, 100, 23]),
			209
		);
	}

	test_8() {
		/**
         * 18
            View Outputs Side By Side
            Input(s)
            {
            "array": [5, 2, 2, 1, -2, 2, -9, 0]
            }
         */

		this.current_test_name = '[5, 2, 2, 1, -2, 2, -9, 0] => 18';
		const maximizeExpression = new this.Problem();

		assert.equal(maximizeExpression.solve([5, 2, 2, 1, -2, 2, -9, 0]), 18);
	}

	test_9() {
		/**
         * 0
            View Outputs Side By Side
            Input(s)
            {
            "array": [1, 1, 1, 1]
            }
         */

		this.current_test_name = '[1, 1, 1, 1] => 0';
		const maximizeExpression = new this.Problem();

		assert.equal(maximizeExpression.solve([1, 1, 1, 1]), 0);
	}

	test_10() {
		/**
         * 4
            View Outputs Side By Side
            Input(s)
            {
            "array": [1, -1, 1, -1]
            }
         */

		this.current_test_name = '[1, -1, 1, -1] => 4';
		const maximizeExpression = new this.Problem();

		assert.equal(maximizeExpression.solve([1, -1, 1, -1]), 4);
	}
}

class JuiceBottling extends ProblemTests {
	constructor(Problem) {
		super(Problem);

		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
		this.tests.push(() => this.test_4());
		this.tests.push(() => this.test_5());
		this.tests.push(() => this.test_6());
		this.tests.push(() => this.test_7());
		this.tests.push(() => this.test_8());
		this.tests.push(() => this.test_9());
		this.tests.push(() => this.test_10());
	}

	test_1() {
		/**
         * [1]
            View Outputs Side By Side
            Input(s)
            {
            "prices": [0, 1]
            }
         */

		this.current_test_name = '[0, 1] => [1]';
		const juiceBottling = new this.Problem();

		assert.deepStrictEqual(juiceBottling.solve([0, 1]), [1]);
	}

	test_2() {
		/**
         * [2]
            View Outputs Side By Side
            Input(s)
            {
            "prices": [0, 1, 3]
            }
         */

		this.current_test_name = '[0, 1, 3] => [2]';
		const juiceBottling = new this.Problem();

		assert.deepStrictEqual(juiceBottling.solve([0, 1, 3]), [2]);
	}

	test_3() {
		/**
         * [1, 1]
            View Outputs Side By Side
            Input(s)
            {
            "prices": [0, 2, 3]
            }
         */

		this.current_test_name = '[0, 2, 3] => [1, 1]';
		const juiceBottling = new this.Problem();

		assert.deepStrictEqual(juiceBottling.solve([0, 2, 3]), [1, 1]);
	}

	test_4() {
		/**
         * [1, 1, 1]
            View Outputs Side By Side
            Input(s)
            {
            "prices": [0, 2, 3, 4]
            }
         */

		this.current_test_name = '[0, 2, 3, 4] => [1, 1, 1]';
		const juiceBottling = new this.Problem();

		assert.deepStrictEqual(juiceBottling.solve([0, 2, 3, 4]), [1, 1, 1]);
	}

	test_5() {
		/**
         * [1, 2]
            View Outputs Side By Side
            Input(s)
            {
            "prices": [0, 2, 5, 6]
            }
         */

		this.current_test_name = '[0, 2, 5, 6] => [1, 2]';
		const juiceBottling = new this.Problem();

		assert.deepStrictEqual(juiceBottling.solve([0, 2, 5, 6]), [1, 2]);
	}

	test_6() {
		/**
         * [2, 2]
            View Outputs Side By Side
            Input(s)
            {
            "prices": [0, 2, 5, 6, 7]
            }
         */

		this.current_test_name = '[0, 2, 5, 6, 7] => [2, 2]';
		const juiceBottling = new this.Problem();

		assert.deepStrictEqual(juiceBottling.solve([0, 2, 5, 6, 7]), [2, 2]);
	}

	test_7() {
		/**
         * [4]
            View Outputs Side By Side
            Input(s)
            {
            "prices": [0, 2, 5, 6, 11]
            }
        */

		this.current_test_name = '[0, 2, 5, 6, 11] => [4]';
		const juiceBottling = new this.Problem();

		assert.deepStrictEqual(juiceBottling.solve([0, 2, 5, 6, 11]), [4]);
	}

	test_8() {
		/**
         * [1, 3]
            View Outputs Side By Side
            Input(s)
            {
            "prices": [0, 2, 5, 10, 11]
            }
         */

		this.current_test_name = '[0, 2, 5, 10, 11] => [1, 3]';
		const juiceBottling = new this.Problem();

		assert.deepStrictEqual(juiceBottling.solve([0, 2, 5, 10, 11]), [1, 3]);
	}

	test_9() {
		/**
         * [1, 1, 1, 1, 1, 1]
            View Outputs Side By Side
            Input(s)
            {
            "prices": [0, 5, 6, 7, 8, 9, 10]
            }
         */

		this.current_test_name = '[0, 5, 6, 7, 8, 9, 10] => [1, 1, 1, 1, 1, 1]';
		const juiceBottling = new this.Problem();

		assert.deepStrictEqual(
			juiceBottling.solve([0, 5, 6, 7, 8, 9, 10]),
			[1, 1, 1, 1, 1, 1]
		);
	}

	test_10() {
		/**
         * [2, 2]
            View Outputs Side By Side
            Input(s)
            {
            "prices": [0, 2, 5, 4, 4]
            }
         */

		this.current_test_name = '[0, 2, 5, 4, 4] => [2, 2]';
		const juiceBottling = new this.Problem();

		assert.deepStrictEqual(juiceBottling.solve([0, 2, 5, 4, 4]), [2, 2]);
	}
}

class TopologicalSort extends ProblemTests {
	constructor(Problem) {
		super(Problem);

		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
		this.tests.push(() => this.test_4());
		this.tests.push(() => this.test_5());
		this.tests.push(() => this.test_6());
		this.tests.push(() => this.test_7());
		this.tests.push(() => this.test_8());
		this.tests.push(() => this.test_9());
		this.tests.push(() => this.test_10());
	}

	test_1() {
		/**
         * {
            "isValidTopologicalOrder": true,
            "order": [4, 1, 3, 2]
            }
            View Outputs Side By Side
            Input(s)
            {
            "deps": [
                [1, 2],
                [1, 3],
                [3, 2],
                [4, 2],
                [4, 3]
            ],
            "jobs": [1, 2, 3, 4]
            }
         */

		this.current_test_name =
			'([1, 2, 3, 4], [[1, 2], [1, 3], [3, 2], [4, 2], [4, 3]]) => [4, 1, 3, 2]';
		const topologicalSort = new this.Problem();
		const solution = topologicalSort.solve(
			[1, 2, 3, 4],
			[
				[1, 2],
				[1, 3],
				[3, 2],
				[4, 2],
				[4, 3]
			]
		);

		assert.deepStrictEqual(
			topologicalSort.solve(
				[1, 2, 3, 4],
				[
					[1, 2],
					[1, 3],
					[3, 2],
					[4, 2],
					[4, 3]
				]
			),
			[4, 1, 3, 2]
		);
	}

	test_2() {
		/**
         * {
            "isValidTopologicalOrder": true,
            "order": [8, 5, 7, 3, 1, 4, 6, 2]
            }
            View Outputs Side By Side
            Input(s)
            {
            "deps": [
                [3, 1],
                [8, 1],
                [8, 7],
                [5, 7],
                [5, 2],
                [1, 4],
                [1, 6],
                [1, 2],
                [7, 6]
            ],
            "jobs": [1, 2, 3, 4, 5, 6, 7, 8]
            }
         */

		this.current_test_name =
			'([1, 2, 3, 4, 5, 6, 7, 8], [[3, 1], [8, 1], [8, 7], [5, 7], [5, 2], [1, 4], [1, 6], [1, 2], [7, 6]]) => [8, 5, 7, 3, 1, 4, 6, 2]';
		const topologicalSort = new this.Problem();

		assert.deepStrictEqual(
			topologicalSort.solve(
				[1, 2, 3, 4, 5, 6, 7, 8],
				[
					[3, 1],
					[8, 1],
					[8, 7],
					[5, 7],
					[5, 2],
					[1, 4],
					[1, 6],
					[1, 2],
					[7, 6]
				]
			),
			[8, 5, 7, 3, 1, 4, 6, 2]
		);
	}

	test_3() {
		/**
         * {
            "isValidTopologicalOrder": false,
            "order": []
            }
            View Outputs Side By Side
            Input(s)
            {
            "deps": [
                [3, 1],
                [8, 1],
                [8, 7],
                [5, 7],
                [5, 2],
                [1, 4],
                [6, 7],
                [1, 2],
                [7, 6]
            ],
            "jobs": [1, 2, 3, 4, 5, 6, 7, 8]
            }
         */

		this.current_test_name =
			'([1, 2, 3, 4, 5, 6, 7, 8], [[3, 1], [8, 1], [8, 7], [5, 7], [5, 2], [1, 4], [6, 7], [1, 2], [7, 6]]) => []';
		const topologicalSort = new this.Problem();

		assert.deepStrictEqual(
			topologicalSort.solve(
				[1, 2, 3, 4, 5, 6, 7, 8],
				[
					[3, 1],
					[8, 1],
					[8, 7],
					[5, 7],
					[5, 2],
					[1, 4],
					[6, 7],
					[1, 2],
					[7, 6]
				]
			),
			[]
		);
	}

	test_4() {
		/**
         * {
            "isValidTopologicalOrder": false,
            "order": []
            }
            View Outputs Side By Side
            Input(s)
            {
            "deps": [
                [3, 1],
                [8, 1],
                [8, 7],
                [5, 7],
                [5, 2],
                [1, 4],
                [1, 6],
                [1, 2],
                [7, 6],
                [4, 6],
                [6, 2],
                [2, 3]
            ],
            "jobs": [1, 2, 3, 4, 5, 6, 7, 8]
            }
         */

		this.current_test_name =
			'([1, 2, 3, 4, 5, 6, 7, 8], [[3, 1], [8, 1], [8, 7], [5, 7], [5, 2], [1, 4], [1, 6], [1, 2], [7, 6], [4, 6], [6, 2], [2, 3]]) => []';
		const topologicalSort = new this.Problem();

		assert.deepStrictEqual(
			topologicalSort.solve(
				[1, 2, 3, 4, 5, 6, 7, 8],
				[
					[3, 1],
					[8, 1],
					[8, 7],
					[5, 7],
					[5, 2],
					[1, 4],
					[1, 6],
					[1, 2],
					[7, 6],
					[4, 6],
					[6, 2],
					[2, 3]
				]
			),
			[]
		);
	}

	test_5() {
		/**
         * {
            "isValidTopologicalOrder": false,
            "order": []
            }
            View Outputs Side By Side
            Input(s)
            {
            "deps": [
                [1, 2],
                [2, 3],
                [3, 4],
                [4, 5],
                [5, 6],
                [6, 7],
                [7, 8],
                [8, 1]
            ],
            "jobs": [1, 2, 3, 4, 5, 6, 7, 8]
            }
         */

		this.current_test_name =
			'([1, 2, 3, 4, 5, 6, 7, 8], [[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 1]]) => []';
		const topologicalSort = new this.Problem();

		assert.deepStrictEqual(
			topologicalSort.solve(
				[1, 2, 3, 4, 5, 6, 7, 8],
				[
					[1, 2],
					[2, 3],
					[3, 4],
					[4, 5],
					[5, 6],
					[6, 7],
					[7, 8],
					[8, 1]
				]
			),
			[]
		);
	}

	test_6() {
		/**
         * {
            "isValidTopologicalOrder": true,
            "order": [9, 7, 8, 1, 2, 3, 4, 5, 6]
            }
            View Outputs Side By Side
            Input(s)
            {
            "deps": [
                [1, 2],
                [2, 3],
                [3, 4],
                [4, 5],
                [5, 6],
                [7, 6],
                [7, 8],
                [8, 1]
            ],
            "jobs": [1, 2, 3, 4, 5, 6, 7, 8, 9]
            }
         */

		this.current_test_name =
			'([1, 2, 3, 4, 5, 6, 7, 8, 9], [[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [7, 6], [7, 8], [8, 1]]) => [9, 7, 8, 1, 2, 3, 4, 5, 6]';
		const topologicalSort = new this.Problem();

		assert.deepStrictEqual(
			topologicalSort.solve(
				[1, 2, 3, 4, 5, 6, 7, 8, 9],
				[
					[1, 2],
					[2, 3],
					[3, 4],
					[4, 5],
					[5, 6],
					[7, 6],
					[7, 8],
					[8, 1]
				]
			),
			[9, 7, 8, 1, 2, 3, 4, 5, 6]
		);
	}

	test_7() {
		/**
         * {
            "isValidTopologicalOrder": true,
            "order": [4, 3, 5, 6, 1, 2, 7, 8]
            }
            View Outputs Side By Side
            Input(s)
            {
            "deps": [
                [1, 2],
                [3, 5],
                [4, 6],
                [3, 6],
                [1, 7],
                [7, 8],
                [1, 8],
                [2, 8]
            ],
            "jobs": [1, 2, 3, 4, 5, 6, 7, 8]
            }
         */

		this.current_test_name =
			'([1, 2, 3, 4, 5, 6, 7, 8], [[1, 2], [3, 5], [4, 6], [3, 6], [1, 7], [7, 8], [1, 8], [2, 8]]) => [4, 3, 5, 6, 1, 2, 7, 8]';
		const topologicalSort = new this.Problem();

		assert.deepStrictEqual(
			topologicalSort.solve(
				[1, 2, 3, 4, 5, 6, 7, 8],
				[
					[1, 2],
					[3, 5],
					[4, 6],
					[3, 6],
					[1, 7],
					[7, 8],
					[1, 8],
					[2, 8]
				]
			),
			[4, 3, 5, 6, 1, 2, 7, 8]
		);
	}

	test_8() {
		/**
         * {
            "isValidTopologicalOrder": true,
            "order": [1, 2, 3, 4, 5, 6, 7, 8]
            }
            View Outputs Side By Side
            Input(s)
            {
            "deps": [
                [1, 2],
                [1, 3],
                [1, 4],
                [1, 5],
                [1, 6],
                [1, 7],
                [2, 8],
                [3, 8],
                [4, 8],
                [5, 8],
                [6, 8],
                [7, 8]
            ],
            "jobs": [1, 2, 3, 4, 5, 6, 7, 8]
            }
         */

		this.current_test_name =
			'([1, 2, 3, 4, 5, 6, 7, 8], [[1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8]]) => [1, 2, 3, 4, 5, 6, 7, 8]';
		const topologicalSort = new this.Problem();

		assert.deepStrictEqual(
			topologicalSort.solve(
				[1, 2, 3, 4, 5, 6, 7, 8],
				[
					[1, 2],
					[1, 3],
					[1, 4],
					[1, 5],
					[1, 6],
					[1, 7],
					[2, 8],
					[3, 8],
					[4, 8],
					[5, 8],
					[6, 8],
					[7, 8]
				]
			),
			[1, 2, 3, 4, 5, 6, 7, 8]
		);
	}

	test_9() {
		/**
         * {
            "isValidTopologicalOrder": true,
            "order": [1, 7, 6, 2, 3, 10, 11, 12, 5, 4, 9, 8, 0]
            }
            View Outputs Side By Side
            Input(s)
            {
            "deps": [
                [1, 2],
                [1, 3],
                [1, 4],
                [1, 5],
                [1, 6],
                [1, 7],
                [2, 8],
                [3, 8],
                [4, 8],
                [5, 8],
                [6, 8],
                [7, 8],
                [2, 3],
                [2, 4],
                [5, 4],
                [7, 6],
                [6, 2],
                [6, 3],
                [6, 5],
                [5, 9],
                [9, 8],
                [8, 0],
                [4, 0],
                [5, 0],
                [9, 0],
                [2, 0],
                [3, 9],
                [3, 10],
                [10, 11],
                [11, 12],
                [2, 12]
            ],
            "jobs": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
            }
         */

		this.current_test_name =
			'([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [[1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [2, 3], [2, 4], [5, 4], [7, 6], [6, 2], [6, 3], [6, 5], [5, 9], [9, 8], [8, 0], [4, 0], [5, 0], [9, 0], [2, 0], [3, 9], [3, 10], [10, 11], [11, 12], [2, 12]]) => [1, 7, 6, 2, 3, 10, 11, 12, 5, 4, 9, 8, 0]';
		const topologicalSort = new this.Problem();

		assert.deepStrictEqual(
			topologicalSort.solve(
				[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
				[
					[1, 2],
					[1, 3],
					[1, 4],
					[1, 5],
					[1, 6],
					[1, 7],
					[2, 8],
					[3, 8],
					[4, 8],
					[5, 8],
					[6, 8],
					[7, 8],
					[2, 3],
					[2, 4],
					[5, 4],
					[7, 6],
					[6, 2],
					[6, 3],
					[6, 5],
					[5, 9],
					[9, 8],
					[8, 0],
					[4, 0],
					[5, 0],
					[9, 0],
					[2, 0],
					[3, 9],
					[3, 10],
					[10, 11],
					[11, 12],
					[2, 12]
				]
			),
			[1, 7, 6, 2, 3, 10, 11, 12, 5, 4, 9, 8, 0]
		);
	}

	test_10() {
		/**
         * {
            "isValidTopologicalOrder": false,
            "order": []
            }
            View Outputs Side By Side
            Input(s)
            {
            "deps": [
                [1, 2],
                [1, 3],
                [1, 4],
                [1, 5],
                [1, 6],
                [1, 7],
                [2, 8],
                [3, 8],
                [4, 8],
                [5, 8],
                [6, 8],
                [7, 8],
                [2, 3],
                [2, 4],
                [5, 4],
                [7, 6],
                [6, 2],
                [6, 3],
                [6, 5],
                [5, 9],
                [9, 8],
                [8, 0],
                [4, 0],
                [5, 0],
                [9, 0],
                [2, 0],
                [3, 9],
                [3, 10],
                [10, 11],
                [11, 12],
                [12, 2]
            ],
            "jobs": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
            }
         */

		this.current_test_name =
			'([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [[1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [2, 3], [2, 4], [5, 4], [7, 6], [6, 2], [6, 3], [6, 5], [5, 9], [9, 8], [8, 0], [4, 0], [5, 0], [9, 0], [2, 0], [3, 9], [3, 10], [10, 11], [11, 12], [12, 2]]) => []';
		const topologicalSort = new this.Problem();

		assert.deepStrictEqual(
			topologicalSort.solve(
				[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
				[
					[1, 2],
					[1, 3],
					[1, 4],
					[1, 5],
					[1, 6],
					[1, 7],
					[2, 8],
					[3, 8],
					[4, 8],
					[5, 8],
					[6, 8],
					[7, 8],
					[2, 3],
					[2, 4],
					[5, 4],
					[7, 6],
					[6, 2],
					[6, 3],
					[6, 5],
					[5, 9],
					[9, 8],
					[8, 0],
					[4, 0],
					[5, 0],
					[9, 0],
					[2, 0],
					[3, 9],
					[3, 10],
					[10, 11],
					[11, 12],
					[12, 2]
				]
			),
			[]
		);
	}
}

class KruskalsAlgorithm extends ProblemTests {
	constructor(Problem) {
		super(Problem);

		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
		this.tests.push(() => this.test_4());
		this.tests.push(() => this.test_5());
		this.tests.push(() => this.test_6());
		this.tests.push(() => this.test_7());
		this.tests.push(() => this.test_8());
		this.tests.push(() => this.test_9());
		// this.tests.push(() => this.test_10());
	}

	test_1() {
		/**
         * [
            [
                [1, 1]
            ],
            [
                [0, 1]
            ]
            ]
            View Outputs Side By Side
            Input(s)
            {
            "edges": [
                [
                [1, 1]
                ],
                [
                [0, 1]
                ]
            ]
            }
         */

		this.current_test_name =
			'([ [ [1, 1] ], [ [0, 1] ] ]) => [[1, 1], [0, 1]]';
		const kruskalsAlgorithms = new this.Problem();

		assert.deepStrictEqual(kruskalsAlgorithms.solve([[[1, 1]], [[0, 1]]]), [
			[[1, 1]],
			[[0, 1]]
		]);
	}

	test_2() {
		/**
         * [
            [
                [1, 1]
            ],
            [
                [0, 1],
                [2, 2]
            ],
            [
                [1, 2]
            ]
            ]
            View Outputs Side By Side
            Input(s)
            {
            "edges": [
                [
                [1, 1]
                ],
                [
                [0, 1],
                [2, 2]
                ],
                [
                [1, 2]
                ]
            ]
            }
         */

		this.current_test_name =
			'([ [ [1, 1] ], [ [0, 1], [2, 2] ], [ [1, 2] ] ]) => [[1, 1], [0, 1], [2, 2]]';
		const kruskalsAlgorithms = new this.Problem();

		assert.deepStrictEqual(
			kruskalsAlgorithms.solve([
				[[1, 1]],
				[
					[0, 1],
					[2, 2]
				],
				[[1, 2]]
			]),
			[
				[[1, 1]],
				[
					[0, 1],
					[2, 2]
				],
				[[1, 2]]
			]
		);
	}

	test_3() {
		/**
         * [
            [
                [1, 3],
                [2, 5]
            ],
            [
                [0, 3],
                [3, 12]
            ],
            [
                [0, 5]
            ],
            [
                [1, 12]
            ]
            ]
            View Outputs Side By Side
            Input(s)
            {
            "edges": [
                [
                [1, 3],
                [2, 5]
                ],
                [
                [0, 3],
                [2, 10],
                [3, 12]
                ],
                [
                [0, 5],
                [1, 10]
                ],
                [
                [1, 12]
                ]
            ]
            }
         */

		this.current_test_name =
			'([[1, 3], [2, 5]], [[0, 3], [3, 12]], [[0, 5]], [[1, 12]]) => [[1, 3], [0, 3], [2, 5], [3, 12]]';
		const kruskalsAlgorithms = new this.Problem();

		assert.deepStrictEqual(
			kruskalsAlgorithms.solve([
				[
					[1, 3],
					[2, 5]
				],
				[
					[0, 3],
					[3, 12]
				],
				[[0, 5]],
				[[1, 12]]
			]),
			[
				[
					[1, 3],
					[2, 5]
				],
				[
					[0, 3],
					[3, 12]
				],
				[[0, 5]],
				[[1, 12]]
			]
		);
	}

	test_4() {
		/**
         * [
            [
                [1, 3],
                [2, 5]
            ],
            [
                [0, 3],
                [3, 12],
                [4, 1]
            ],
            [
                [0, 5]
            ],
            [
                [1, 12]
            ],
            [
                [1, 1]
            ]
            ]
            View Outputs Side By Side
            Input(s)
            {
            "edges": [
                [
                [1, 3],
                [2, 5]
                ],
                [
                [0, 3],
                [2, 10],
                [3, 12],
                [4, 1]
                ],
                [
                [0, 5],
                [1, 10],
                [4, 7]
                ],
                [
                [1, 12]
                ],
                [
                [1, 1],
                [2, 7]
                ]
            ]
            }
         */

		this.current_test_name =
			'([[1, 3], [2, 5]], [[0, 3], [3, 12], [4, 1]], [[0, 5]], [[1, 12]], [[1, 1]]) => [[1, 3], [0, 3], [4, 1], [2, 5], [3, 12]]';
		const kruskalsAlgorithms = new this.Problem();

		assert.deepEqual(
			kruskalsAlgorithms.solve([
				[
					[1, 3],
					[2, 5]
				],
				[
					[0, 3],
					[2, 10],
					[3, 12],
					[4, 1]
				],
				[
					[0, 5],
					[1, 10],
					[4, 7]
				],
				[[1, 12]],
				[
					[1, 1],
					[2, 7]
				]
			]),
			[
				[
					[1, 3],
					[2, 5]
				],
				[
					[4, 1],
					[0, 3],
					[3, 12]
				],
				[[0, 5]],
				[[1, 12]],
				[[1, 1]]
			]
		);
	}

	test_5() {
		/**
         * [
            [
                [1, 3],
                [2, 5]
            ],
            [
                [0, 3],
                [4, 1]
            ],
            [
                [0, 5]
            ],
            [
                [4, 11]
            ],
            [
                [1, 1],
                [3, 11]
            ]
            ]
            View Outputs Side By Side
            Input(s)
            {
            "edges": [
                [
                [1, 3],
                [2, 5]
                ],
                [
                [0, 3],
                [2, 10],
                [3, 12],
                [4, 1]
                ],
                [
                [0, 5],
                [1, 10],
                [4, 7]
                ],
                [
                [1, 12],
                [4, 11]
                ],
                [
                [1, 1],
                [2, 7],
                [3, 11]
                ]
            ]
            }
         */

		this.current_test_name =
			'([[1, 3], [2, 5]], [[0, 3], [4, 1]], [[0, 5]], [[4, 11]], [[1, 1], [3, 11]]) => [[1, 3], [0, 3], [4, 1], [2, 5], [3, 11]]';
		const kruskalsAlgorithms = new this.Problem();

		compareNestedLists(
			kruskalsAlgorithms.solve([
				[
					[1, 3],
					[2, 5]
				],
				[
					[0, 3],
					[2, 10],
					[3, 12],
					[4, 1]
				],
				[
					[0, 5],
					[1, 10],
					[4, 7]
				],
				[
					[1, 12],
					[4, 11]
				],
				[
					[1, 1],
					[2, 7],
					[3, 11]
				]
			]),
			[
				[
					[1, 3],
					[2, 5]
				],
				[
					[0, 3],
					[4, 1]
				],
				[[0, 5]],
				[[4, 11]],
				[
					[1, 1],
					[3, 11]
				]
			]
		);

		// assert.deepEqual(kruskalsAlgorithms.solve( [
		//     [
		//       [1, 3],
		//       [2, 5]
		//     ],
		//     [
		//       [0, 3],
		//       [2, 10],
		//       [3, 12],
		//       [4, 1]
		//     ],
		//     [
		//       [0, 5],
		//       [1, 10],
		//       [4, 7]
		//     ],
		//     [
		//       [1, 12],
		//       [4, 11]
		//     ],
		//     [
		//       [1, 1],
		//       [2, 7],
		//       [3, 11]
		//     ]
		//   ]),
		// [
		//     [
		//       [1, 3],
		//       [2, 5]
		//     ],
		//     [
		//       [0, 3],
		//       [4, 1]
		//     ],
		//     [
		//       [0, 5]
		//     ],
		//     [
		//       [4, 11]
		//     ],
		//     [
		//       [1, 1],
		//       [3, 11]
		//     ]
		//   ]);
	}

	test_6() {
		/**
         * [
            [
                [1, 7]
            ],
            [
                [0, 7],
                [2, 6],
                [4, 3]
            ],
            [
                [1, 6]
            ],
            [
                [4, 2]
            ],
            [
                [1, 3],
                [3, 2]
            ]
            ]
            View Outputs Side By Side
            Input(s)
            {
            "edges": [
                [
                [1, 7]
                ],
                [
                [0, 7],
                [2, 6],
                [4, 3]
                ],
                [
                [1, 6]
                ],
                [
                [4, 2]
                ],
                [
                [1, 3],
                [3, 2]
                ]
            ]
            }
         */

		this.current_test_name =
			'([[1, 7]], [[0, 7], [2, 6], [4, 3]], [[1, 6]], [[4, 2]], [[1, 3], [3, 2]]) => [[1, 7], [4, 2], [3, 2], [2, 6]]';
		const kruskalsAlgorithms = new this.Problem();

		assert.deepEqual(
			kruskalsAlgorithms.solve([
				[[1, 7]],
				[
					[0, 7],
					[2, 6],
					[4, 3]
				],
				[[1, 6]],
				[[4, 2]],
				[
					[1, 3],
					[3, 2]
				]
			]),
			[
				[[1, 7]],
				[
					[4, 3],
					[2, 6],
					[0, 7]
				],
				[[1, 6]],
				[[4, 2]],
				[
					[3, 2],
					[1, 3]
				]
			]
		);
	}

	test_7() {
		/**
         * [
            [
                [1, 7]
            ],
            [
                [0, 7],
                [2, 6],
                [4, 3]
            ],
            [
                [1, 6]
            ],
            [
                [4, 2]
            ],
            [
                [1, 3],
                [3, 2]
            ]
            ]
            View Outputs Side By Side
            Input(s)
            {
            "edges": [
                [
                [1, 7]
                ],
                [
                [0, 7],
                [2, 6],
                [3, 20],
                [4, 3]
                ],
                [
                [1, 6],
                [3, 14]
                ],
                [
                [1, 20],
                [2, 14],
                [4, 2]
                ],
                [
                [1, 3],
                [3, 2]
                ]
            ]
            }
         */

		this.current_test_name =
			'([[1, 7]], [[0, 7], [2, 6], [3, 20], [4, 3]], [[1, 6], [3, 14]], [[1, 20], [2, 14], [4, 2]], [[1, 3], [3, 2]]) => [[1, 7], [4, 3], [2, 6], [3, 14]]';
		const kruskalsAlgorithms = new this.Problem();

		assert.deepEqual(
			kruskalsAlgorithms.solve([
				[[1, 7]],
				[
					[0, 7],
					[2, 6],
					[3, 20],
					[4, 3]
				],
				[
					[1, 6],
					[3, 14]
				],
				[
					[1, 20],
					[2, 14],
					[4, 2]
				],
				[
					[1, 3],
					[3, 2]
				]
			]),
			[
				[[1, 7]],
				[
					[4, 3],
					[2, 6],
					[0, 7]
				],
				[[1, 6]],
				[[4, 2]],
				[
					[3, 2],
					[1, 3]
				]
			]
		);
	}

	test_8() {
		/**
         * [
            [
                [2, 5]
            ],
            [
                [2, 6],
                [4, 3]
            ],
            [
                [0, 5],
                [1, 6]
            ],
            [
                [4, 2]
            ],
            [
                [1, 3],
                [3, 2]
            ]
            ]
            View Outputs Side By Side
            Input(s)
            {
            "edges": [
                [
                [1, 7],
                [2, 5]
                ],
                [
                [0, 7],
                [2, 6],
                [3, 20],
                [4, 3]
                ],
                [
                [0, 5],
                [1, 6],
                [3, 14]
                ],
                [
                [1, 20],
                [2, 14],
                [4, 2]
                ],
                [
                [1, 3],
                [3, 2]
                ]
            ]
            }
         */

		this.current_test_name =
			'([[1, 7], [2, 5]], [[0, 7], [2, 6], [3, 20], [4, 3]], [[0, 5], [1, 6], [3, 14]], [[1, 20], [2, 14], [4, 2]], [[1, 3], [3, 2]]) => [[1, 7], [4, 3], [2, 5], [3, 14]]';
		const kruskalsAlgorithms = new this.Problem();

		assert.deepEqual(
			kruskalsAlgorithms.solve([
				[
					[1, 7],
					[2, 5]
				],
				[
					[0, 7],
					[2, 6],
					[3, 20],
					[4, 3]
				],
				[
					[0, 5],
					[1, 6],
					[3, 14]
				],
				[
					[1, 20],
					[2, 14],
					[4, 2]
				],
				[
					[1, 3],
					[3, 2]
				]
			]),
			[
				[[2, 5]],
				[
					[4, 3],
					[2, 6]
				],
				[
					[0, 5],
					[1, 6]
				],
				[[4, 2]],
				[
					[3, 2],
					[1, 3]
				]
			]
		);
	}

	test_9() {
		/**
         * [
            [
                [1, 1]
            ],
            [
                [0, 1]
            ],
            [
                [3, 1]
            ],
            [
                [2, 1]
            ]
            ]
            View Outputs Side By Side
            Input(s)
            {
            "edges": [
                [
                [1, 1]
                ],
                [
                [0, 1]
                ],
                [
                [3, 1]
                ],
                [
                [2, 1]
                ]
            ]
            }
         */

		this.current_test_name =
			'([[1, 1]], [[0, 1]], [[3, 1]], [[2, 1]]) => [[1, 1], [0, 1], [3, 1], [2, 1]]';
		const kruskalsAlgorithms = new this.Problem();

		assert.deepEqual(
			kruskalsAlgorithms.solve([[[1, 1]], [[0, 1]], [[3, 1]], [[2, 1]]]),
			[[[1, 1]], [[0, 1]], [[3, 1]], [[2, 1]]]
		);
	}
}

class BoggleBoard extends ProblemTests {
	constructor(Problem) {
		super(Problem);

		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
		this.tests.push(() => this.test_4());
		this.tests.push(() => this.test_5());
		this.tests.push(() => this.test_6());
		this.tests.push(() => this.test_7());
		this.tests.push(() => this.test_8());
	}

	test_1() {
		/**
         * ["this", "is", "simple", "a", "boggle", "board", "NOTRE-PEATED"]
            View Outputs Side By Side
            Input(s)
            {
            "board": [
                ["t", "h", "i", "s", "i", "s", "a"],
                ["s", "i", "m", "p", "l", "e", "x"],
                ["b", "x", "x", "x", "x", "e", "b"],
                ["x", "o", "g", "g", "l", "x", "o"],
                ["x", "x", "x", "D", "T", "r", "a"],
                ["R", "E", "P", "E", "A", "d", "x"],
                ["x", "x", "x", "x", "x", "x", "x"],
                ["N", "O", "T", "R", "E", "-", "P"],
                ["x", "x", "D", "E", "T", "A", "E"]
            ],
            "words": ["this", "is", "not", "a", "simple", "boggle", "board", "test", "REPEATED", "NOTRE-PEATED"]
            }
         */

		this.current_test_name =
			'(["this", "is", "simple", "a", "boggle", "board", "NOTRE-PEATED"], [["t", "h", "i", "s", "i", "s", "a"], ["s", "i", "m", "p", "l", "e", "x"], ["b", "x", "x", "x", "x", "e", "b"], ["x", "o", "g", "g", "l", "x", "o"], ["x", "x", "x", "D", "T", "r", "a"], ["R", "E", "P", "E", "A", "d", "x"], ["x", "x", "x", "x", "x", "x", "x"], ["N", "O", "T", "R", "E", "-", "P"], ["x", "x", "D", "E", "T", "A", "E"]]) => ["this", "is", "a", "simple", "boggle", "board", "NOTRE-PEATED"]';
		const boggleBoard = new this.Problem();

		looselyDeepEqual(
			boggleBoard.solve(
				[
					['t', 'h', 'i', 's', 'i', 's', 'a'],
					['s', 'i', 'm', 'p', 'l', 'e', 'x'],
					['b', 'x', 'x', 'x', 'x', 'e', 'b'],
					['x', 'o', 'g', 'g', 'l', 'x', 'o'],
					['x', 'x', 'x', 'D', 'T', 'r', 'a'],
					['R', 'E', 'P', 'E', 'A', 'd', 'x'],
					['x', 'x', 'x', 'x', 'x', 'x', 'x'],
					['N', 'O', 'T', 'R', 'E', '-', 'P'],
					['x', 'x', 'D', 'E', 'T', 'A', 'E']
				],
				['this', 'is', 'simple', 'a', 'boggle', 'board', 'NOTRE-PEATED']
			),
			['this', 'is', 'a', 'simple', 'boggle', 'board', 'NOTRE-PEATED']
		);
	}

	test_2() {
		/**
         * ["yours", "help", "danger", "san", "at"]
            View Outputs Side By Side
            Input(s)
            {
            "board": [
                ["y", "g", "f", "y", "e", "i"],
                ["c", "o", "r", "p", "o", "u"],
                ["j", "u", "z", "s", "e", "l"],
                ["s", "y", "u", "r", "h", "p"],
                ["e", "a", "e", "g", "n", "d"],
                ["h", "e", "l", "s", "a", "t"]
            ],
            "words": ["san", "sana", "at", "vomit", "yours", "help", "end", "been", "bed", "danger", "calm", "ok", "chaos", "complete", "rear", "going", "storm", "face", "epual", "dangerous"]
            }
         */

		this.current_test_name =
			'(["yours", "help", "danger", "san", "at"], [["y", "g", "f", "y", "e", "i"], ["c", "o", "r", "p", "o", "u"], ["j", "u", "z", "s", "e", "l"], ["s", "y", "u", "r", "h", "p"], ["e", "a", "e", "g", "n", "d"], ["h", "e", "l", "s", "a", "t"]]) => ["yours", "help", "danger", "san", "at"]';
		const boggleBoard = new this.Problem();

		looselyDeepEqual(
			boggleBoard.solve(
				[
					['y', 'g', 'f', 'y', 'e', 'i'],
					['c', 'o', 'r', 'p', 'o', 'u'],
					['j', 'u', 'z', 's', 'e', 'l'],
					['s', 'y', 'u', 'r', 'h', 'p'],
					['e', 'a', 'e', 'g', 'n', 'd'],
					['h', 'e', 'l', 's', 'a', 't']
				],
				['yours', 'help', 'danger', 'san', 'at']
			),
			['yours', 'help', 'danger', 'san', 'at']
		);
	}

	test_3() {
		/**
         * ["agmsy", "agmsytojed", "agmsytojedinhcbfl"]
            View Outputs Side By Side
            Input(s)
            {
            "board": [
                ["a", "b", "c", "d", "e"],
                ["f", "g", "h", "i", "j"],
                ["k", "l", "m", "n", "o"],
                ["p", "q", "r", "s", "t"],
                ["u", "v", "w", "x", "y"]
            ],
            "words": ["agmsy", "agmsytojed", "agmsytojedinhcbgl", "agmsytojedinhcbfl"]
            }
         */

		this.current_test_name =
			"(['agmsy', 'agmsytojed', 'agmsytojedinhcbfl'], [['a', 'b', 'c', 'd', 'e'], ['f', 'g', 'h', 'i', 'j'], ['k', 'l', 'm', 'n', 'o'], ['p', 'q', 'r', 's', 't'], ['u', 'v', 'w', 'x', 'y']]) => ['agmsy', 'agmsytojed', 'agmsytojedinhcbfl']";
		const boggleBoard = new this.Problem();

		looselyDeepEqual(
			boggleBoard.solve(
				[
					['a', 'b', 'c', 'd', 'e'],
					['f', 'g', 'h', 'i', 'j'],
					['k', 'l', 'm', 'n', 'o'],
					['p', 'q', 'r', 's', 't'],
					['u', 'v', 'w', 'x', 'y']
				],
				[
					'agmsy',
					'agmsytojed',
					'agmsytojedinhcbgl',
					'agmsytojedinhcbfl'
				]
			),
			['agmsy', 'agmsytojed', 'agmsytojedinhcbfl']
		);
	}

	test_4() {
		/**
         * ["adbc", "adcb", "acbd", "acdb", "abcd", "abdc"]
            View Outputs Side By Side
            Input(s)
            {
            "board": [
                ["a", "b"],
                ["c", "d"]
            ],
            "words": ["abcd", "abdc", "acbd", "acdb", "adbc", "adcb", "abca"]
            }
         */

		this.current_test_name =
			"(['adbc', 'adcb', 'acbd', 'acdb', 'abcd', 'abdc'], [['a', 'b'], ['c', 'd']]) => ['adbc', 'adcb', 'acbd', 'acdb', 'abcd', 'abdc']";
		const boggleBoard = new this.Problem();

		looselyDeepEqual(
			boggleBoard.solve(
				[
					['a', 'b'],
					['c', 'd']
				],
				['abcd', 'abdc', 'acbd', 'acdb', 'adbc', 'adcb', 'abca']
			),
			['adbc', 'adcb', 'acbd', 'acdb', 'abcd', 'abdc']
		);
	}

	test_5() {
		/**
         * ["frozen", "rope", "kappa", "before", "obligate", "rotten", "teleport"]
            View Outputs Side By Side
            Input(s)
            {
            "board": [
                ["f", "t", "r", "o", "p", "i", "k", "b", "o"],
                ["r", "w", "l", "p", "e", "u", "e", "a", "b"],
                ["j", "o", "t", "s", "e", "l", "f", "l", "p"],
                ["s", "z", "u", "t", "h", "u", "o", "p", "i"],
                ["k", "a", "e", "g", "n", "d", "r", "g", "a"],
                ["h", "n", "l", "s", "a", "t", "e", "t", "x"]
            ],
            "words": ["frozen", "rotten", "teleport", "city", "zutgatz", "kappa", "before", "rope", "obligate", "annoying"]
            }
         */

		this.current_test_name =
			"(['frozen', 'rope', 'kappa', 'before', 'obligate', 'rotten', 'teleport'], [['f', 't', 'r', 'o', 'p', 'i', 'k', 'b', 'o'], ['r', 'w', 'l', 'p', 'e', 'u', 'e', 'a', 'b'], ['j', 'o', 't', 's', 'e', 'l', 'f', 'l', 'p'], ['s', 'z', 'u', 't', 'h', 'u', 'o', 'p', 'i'], ['k', 'a', 'e', 'g', 'n', 'd', 'r', 'g', 'a'], ['h', 'n', 'l', 's', 'a', 't', 'e', 't', 'x']]) => ['frozen', 'rope', 'kappa', 'before', 'obligate', 'rotten', 'teleport']";
		const boggleBoard = new this.Problem();

		looselyDeepEqual(
			boggleBoard.solve(
				[
					['f', 't', 'r', 'o', 'p', 'i', 'k', 'b', 'o'],
					['r', 'w', 'l', 'p', 'e', 'u', 'e', 'a', 'b'],
					['j', 'o', 't', 's', 'e', 'l', 'f', 'l', 'p'],
					['s', 'z', 'u', 't', 'h', 'u', 'o', 'p', 'i'],
					['k', 'a', 'e', 'g', 'n', 'd', 'r', 'g', 'a'],
					['h', 'n', 'l', 's', 'a', 't', 'e', 't', 'x']
				],
				[
					'frozen',
					'rotten',
					'teleport',
					'city',
					'zutgatz',
					'kappa',
					'before',
					'rope',
					'obligate',
					'annoying'
				]
			),
			[
				'frozen',
				'rope',
				'kappa',
				'before',
				'obligate',
				'rotten',
				'teleport'
			]
		);
	}

	test_6() {
		/**
         * ["complicated", "foobar", "zigzag", "twisted"]
            View Outputs Side By Side
            Input(s)
            {
            "board": [
                ["c", "o", "m"],
                ["r", "p", "l"],
                ["c", "i", "t"],
                ["o", "a", "e"],
                ["f", "o", "d"],
                ["z", "r", "b"],
                ["g", "i", "a"],
                ["o", "a", "g"],
                ["f", "s", "z"],
                ["t", "e", "i"],
                ["t", "w", "d"]
            ],
            "words": ["commerce", "complicated", "twisted", "zigzag", "comma", "foobar", "baz", "there"]
            }
         */

		this.current_test_name =
			"(['complicated', 'foobar', 'zigzag', 'twisted'], [['c', 'o', 'm'], ['r', 'p', 'l'], ['c', 'i', 't'], ['o', 'a', 'e'], ['f', 'o', 'd'], ['z', 'r', 'b'], ['g', 'i', 'a'], ['o', 'a', 'g'], ['f', 's', 'z'], ['t', 'e', 'i'], ['t', 'w', 'd']]) => ['complicated', 'foobar', 'zigzag', 'twisted']";
		const boggleBoard = new this.Problem();

		looselyDeepEqual(
			boggleBoard.solve(
				[
					['c', 'o', 'm'],
					['r', 'p', 'l'],
					['c', 'i', 't'],
					['o', 'a', 'e'],
					['f', 'o', 'd'],
					['z', 'r', 'b'],
					['g', 'i', 'a'],
					['o', 'a', 'g'],
					['f', 's', 'z'],
					['t', 'e', 'i'],
					['t', 'w', 'd']
				],
				[
					'commerce',
					'complicated',
					'twisted',
					'zigzag',
					'comma',
					'foobar',
					'baz',
					'there'
				]
			),
			['complicated', 'foobar', 'zigzag', 'twisted']
		);
	}

	test_7() {
		/**
         * ["cr", "oc", "ml", "iao", "zrb", "big", "fs", "twt"]
            View Outputs Side By Side
            Input(s)
            {
            "board": [
                ["c", "o", "m"],
                ["r", "p", "l"],
                ["c", "i", "t"],
                ["o", "a", "e"],
                ["f", "o", "d"],
                ["z", "r", "b"],
                ["g", "i", "a"],
                ["o", "a", "g"],
                ["f", "s", "z"],
                ["t", "e", "i"],
                ["t", "w", "d"]
            ],
            "words": ["cr", "oc", "ml", "iao", "opo", "zrb", "big", "fs", "ogiagao", "dwd", "twt"]
            }
         */

		this.current_test_name =
			"(['cr', 'oc', 'ml', 'iao', 'zrb', 'big', 'fs', 'twt'], [['c', 'o', 'm'], ['r', 'p', 'l'], ['c', 'i', 't'], ['o', 'a', 'e'], ['f', 'o', 'd'], ['z', 'r', 'b'], ['g', 'i', 'a'], ['o', 'a', 'g'], ['f', 's', 'z'], ['t', 'e', 'i'], ['t', 'w', 'd']]) => ['cr', 'oc', 'ml', 'iao', 'zrb', 'big', 'fs', 'twt']";
		const boggleBoard = new this.Problem();

		looselyDeepEqual(
			boggleBoard.solve(
				[
					['c', 'o', 'm'],
					['r', 'p', 'l'],
					['c', 'i', 't'],
					['o', 'a', 'e'],
					['f', 'o', 'd'],
					['z', 'r', 'b'],
					['g', 'i', 'a'],
					['o', 'a', 'g'],
					['f', 's', 'z'],
					['t', 'e', 'i'],
					['t', 'w', 'd']
				],
				[
					'cr',
					'oc',
					'ml',
					'iao',
					'opo',
					'zrb',
					'big',
					'fs',
					'ogiagao',
					'dwd',
					'twt'
				]
			),
			['cr', 'oc', 'ml', 'iao', 'zrb', 'big', 'fs', 'twtx']
		);
	}

	test_8() {
		/**
         * ["comlpriteacoofziraagsizefttw"]
            View Outputs Side By Side
            Input(s)
            {
            "board": [
                ["c", "o", "m"],
                ["r", "p", "l"],
                ["c", "i", "t"],
                ["o", "a", "e"],
                ["f", "o", "d"],
                ["z", "r", "b"],
                ["g", "i", "a"],
                ["o", "a", "g"],
                ["f", "s", "z"],
                ["t", "e", "i"],
                ["t", "w", "d"]
            ],
            "words": ["comlpriteacoofziraagsizefttw", "comlpriteacoofzirabagsizefottw", "comlpriteacoofziraagsizefottw", "comlpriteacoofzirabagsizeftttw"]
            }
         */

		this.current_test_name =
			"(['comlpriteacoofziraagsizefttw', 'comlpriteacoofzirabagsizefottw', 'comlpriteacoofziraagsizefottw', 'comlpriteacoofzirabagsizeftttw'], [['c', 'o', 'm'], ['r', 'p', 'l'], ['c', 'i', 't'], ['o', 'a', 'e'], ['f', 'o', 'd'], ['z', 'r', 'b'], ['g', 'i', 'a'], ['o', 'a', 'g'], ['f', 's', 'z'], ['t', 'e', 'i'], ['t', 'w', 'd']]) => ['comlpriteacoofziraagsizefttw', 'comlpriteacoofzirabagsizefottw', 'comlpriteacoofziraagsizefottw', 'comlpriteacoofzirabagsizeftttw']";
		const boggleBoard = new this.Problem();

		looselyDeepEqual(
			boggleBoard.solve(
				[
					['c', 'o', 'm'],
					['r', 'p', 'l'],
					['c', 'i', 't'],
					['o', 'a', 'e'],
					['f', 'o', 'd'],
					['z', 'r', 'b'],
					['g', 'i', 'a'],
					['o', 'a', 'g'],
					['f', 's', 'z'],
					['t', 'e', 'i'],
					['t', 'w', 'd']
				],
				[
					'comlpriteacoofziraagsizefttw',
					'comlpriteacoofzirabagsizefottw',
					'comlpriteacoofziraagsizefottw',
					'comlpriteacoofzirabagsizeftttw'
				]
			),
			[
				'comlpriteacoofziraagsizefttw',
				'comlpriteacoofzirabagsizefottw',
				'comlpriteacoofziraagsizefottw',
				'comlpriteacoofzirabagsizeftttw'
			]
		);
	}
}

class LaptopRentals extends ProblemTests {
	constructor(Problem) {
		super(Problem);

		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
		this.tests.push(() => this.test_4());
		this.tests.push(() => this.test_5());
		this.tests.push(() => this.test_6());
		this.tests.push(() => this.test_7());
		this.tests.push(() => this.test_8());
		this.tests.push(() => this.test_9());
	}

	test_1() {
		/**
         * 3
            View Outputs Side By Side
            Input(s)
            {
            "times": [
                [0, 2],
                [1, 4],
                [4, 6],
                [0, 4],
                [7, 8],
                [9, 11],
                [3, 10]
            ]
            }
         */

		this.current_test_name =
			'([[0, 2], [1, 4], [4, 6], [0, 4], [7, 8], [9, 11], [3, 10]]) => 3';
		const laptopRentals = new this.Problem();

		assert.equal(
			laptopRentals.solve([
				[0, 2],
				[1, 4],
				[4, 6],
				[0, 4],
				[7, 8],
				[9, 11],
				[3, 10]
			]),
			3
		);
	}

	test_2() {
		/**
         * 4
            View Outputs Side By Side
            Input(s)
            {
            "times": [
                [0, 4],
                [2, 3],
                [2, 3],
                [2, 3]
            ]
            }
         */

		this.current_test_name = '([[0, 4], [2, 3], [2, 3], [2, 3]]) => 4';
		const laptopRentals = new this.Problem();

		assert.equal(
			laptopRentals.solve([
				[0, 4],
				[2, 3],
				[2, 3],
				[2, 3]
			]),
			4
		);
	}

	test_3() {
		/**
         * 1
            View Outputs Side By Side
            Input(s)
            {
            "times": [
                [1, 5],
                [5, 6],
                [6, 7],
                [7, 9]
            ]
            }
         */

		this.current_test_name = '([[1, 5], [5, 6], [6, 7], [7, 9]]) => 1';
		const laptopRentals = new this.Problem();

		assert.equal(
			laptopRentals.solve([
				[1, 5],
				[5, 6],
				[6, 7],
				[7, 9]
			]),
			1
		);
	}

	test_4() {
		/**
         * 1
            View Outputs Side By Side
            Input(s)
            {
            "times": [
                [0, 4]
            ]
            }
         */

		this.current_test_name = '([[0, 4]]) => 1';
		const laptopRentals = new this.Problem();

		assert.equal(laptopRentals.solve([[0, 4]]), 1);
	}

	test_5() {
		/**
         * 0
            View Outputs Side By Side
            Input(s)
            {
            "times": []
            }
         */

		this.current_test_name = '([]) => 0';
		const laptopRentals = new this.Problem();

		assert.equal(laptopRentals.solve([]), 0);
	}

	test_6() {
		/**
         * 4
        View Outputs Side By Side
        Input(s)
        {
        "times": [
            [0, 5],
            [2, 4],
            [4, 7],
            [5, 7],
            [9, 20],
            [3, 15],
            [6, 10]
        ]
        }
         */

		this.current_test_name =
			'([[0, 5], [2, 4], [4, 7], [5, 7], [9, 20], [3, 15], [6, 10]]) => 4';
		const laptopRentals = new this.Problem();
	}

	test_7() {
		/**
         * 2
            View Outputs Side By Side
            Input(s)
            {
            "times": [
                [10, 20],
                [0, 5],
                [5, 10],
                [10, 15]
            ]
            }
         */

		this.current_test_name = '([[10, 20], [0, 5], [5, 10], [10, 15]]) => 2';
		const laptopRentals = new this.Problem();

		assert.equal(
			laptopRentals.solve([
				[10, 20],
				[0, 5],
				[5, 10],
				[10, 15]
			]),
			2
		);
	}

	test_8() {
		/**
         * 4
        View Outputs Side By Side
        Input(s)
        {
        "times": [
            [0, 5],
            [3, 8],
            [4, 10],
            [7, 11],
            [6, 10]
        ]
        }
         */

		this.current_test_name =
			'([[0, 5], [3, 8], [4, 10], [7, 11], [6, 10]]) => 4';
		const laptopRentals = new this.Problem();

		assert.equal(
			laptopRentals.solve([
				[0, 5],
				[3, 8],
				[4, 10],
				[7, 11],
				[6, 10]
			]),
			4
		);
	}

	test_9() {
		/**
         * 4
        View Outputs Side By Side
        Input(s)
        {
        "times": [
            [1, 5],
            [2, 6],
            [3, 7],
            [4, 8],
            [5, 9]
        ]
        }
         */

		this.current_test_name =
			'([[1, 5], [2, 6], [3, 7], [4, 8], [5, 9]]) => 4';
		const laptopRentals = new this.Problem();

		assert.equal(
			laptopRentals.solve([
				[1, 5],
				[2, 6],
				[3, 7],
				[4, 8],
				[5, 9]
			]),
			4
		);
	}

	test_10() {
		/**
         * [false, false, false, false, false, false]
            View Outputs Side By Side
            Input(s)
            {
            "bigString": "Everything in this test should fail.",
            "smallStrings": ["everything", "inn", "that", "testers", "shall", "failure"]
            }
         */

		this.current_test_name =
			"(['Everything in this test should fail.', ['everything', 'inn', 'that', 'testers', 'shall', 'failure']]) => [false, false, false, false, false, false]";
		const multiStringSearch = new this.Problem();

		assert.deepEqual(
			multiStringSearch.solve('Everything in this test should fail.', [
				'everything',
				'inn',
				'that',
				'testers',
				'shall',
				'failure'
			]),
			[false, false, false, false, false, false]
		);
	}
}

class LinkedList {
	constructor(value) {
		this.value = value;
		this.next = null;
	}
}

class FindLoop extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
		this.tests.push(() => this.test_4());
		this.tests.push(() => this.test_5());
		this.tests.push(() => this.test_6());
		this.tests.push(() => this.test_7());
		this.tests.push(() => this.test_8());
		this.tests.push(() => this.test_9());
		this.tests.push(() => this.test_10());
	}

	test_1() {
		/**
         * {
            "head": "4",
            "nodes": [
                {"id": "4", "next": "5", "value": 4},
                {"id": "5", "next": "6", "value": 5},
                {"id": "6", "next": "7", "value": 6},
                {"id": "7", "next": "8", "value": 7},
                {"id": "8", "next": "9", "value": 8},
                {"id": "9", "next": "4", "value": 9}
            ]
            }
         */

		this.current_test_name =
			'({"head": "4", "nodes": [{"id": "4", "next": "5", "value": 4}, {"id": "5", "next": "6", "value": 5}, {"id": "6", "next": "7", "value": 6}, {"id": "7", "next": "8", "value": 7}, {"id": "8", "next": "9", "value": 8}, {"id": "9", "next": "4", "value": 9}]}) => 4';
		const findLoop = new this.Problem();
		const nodesRoot = new LinkedList(4);
		nodesRoot.next = new LinkedList(5);
		nodesRoot.next.next = new LinkedList(6);
		nodesRoot.next.next.next = new LinkedList(7);
		nodesRoot.next.next.next.next = new LinkedList(8);
		nodesRoot.next.next.next.next.next = new LinkedList(9);
		nodesRoot.next.next.next.next.next.next = nodesRoot.next.next;

		assert.equal(findLoop.solve(nodesRoot), nodesRoot.next.next);
	}

	test_2() {
		/**
         * {
            "head": "0",
            "nodes": [
                {"id": "0", "next": "1", "value": 0},
                {"id": "1", "next": "2", "value": 1},
                {"id": "2", "next": "3", "value": 2},
                {"id": "3", "next": "4", "value": 3},
                {"id": "4", "next": "5", "value": 4},
                {"id": "5", "next": "6", "value": 5},
                {"id": "6", "next": "7", "value": 6},
                {"id": "7", "next": "8", "value": 7},
                {"id": "8", "next": "9", "value": 8},
                {"id": "9", "next": "0", "value": 9}
            ]
            }
         */

		this.current_test_name =
			'({"head": "0", "nodes": [{"id": "0", "next": "1", "value": 0}, {"id": "1", "next": "2", "value": 1}, {"id": "2", "next": "3", "value": 2}, {"id": "3", "next": "4", "value": 3}, {"id": "4", "next": "5", "value": 4}, {"id": "5", "next": "6", "value": 5}, {"id": "6", "next": "7", "value": 6}, {"id": "7", "next": "8", "value": 7}, {"id": "8", "next": "9", "value": 8}, {"id": "9", "next": "0", "value": 9}]}) => 0';
		const findLoop = new this.Problem();
		const nodesRoot = new LinkedList(0);
		nodesRoot.next = new LinkedList(1);
		nodesRoot.next.next = new LinkedList(2);
		nodesRoot.next.next.next = new LinkedList(3);
		nodesRoot.next.next.next.next = new LinkedList(4);
		nodesRoot.next.next.next.next.next = new LinkedList(5);
		nodesRoot.next.next.next.next.next.next = new LinkedList(6);
		nodesRoot.next.next.next.next.next.next.next = new LinkedList(7);
		nodesRoot.next.next.next.next.next.next.next.next = new LinkedList(8);
		nodesRoot.next.next.next.next.next.next.next.next.next = new LinkedList(
			9
		);
		nodesRoot.next.next.next.next.next.next.next.next.next.next = nodesRoot;

		assert.equal(findLoop.solve(nodesRoot), nodesRoot);
	}

	test_3() {
		/**
         * {
         "head": "1",
         "nodes": [
             {"id": "1", "next": "2", "value": 1},
             {"id": "2", "next": "3", "value": 2},
             {"id": "3", "next": "4", "value": 3},
             {"id": "4", "next": "5", "value": 4},
             {"id": "5", "next": "6", "value": 5},
             {"id": "6", "next": "7", "value": 6},
             {"id": "7", "next": "8", "value": 7},
             {"id": "8", "next": "9", "value": 8},
             {"id": "9", "next": "1", "value": 9}
         ]
         } */

		this.current_test_name =
			'({"head": "1", "nodes": [{"id": "1", "next": "2", "value": 1}, {"id": "2", "next": "3", "value": 2}, {"id": "3", "next": "4", "value": 3}, {"id": "4", "next": "5", "value": 4}, {"id": "5", "next": "6", "value": 5}, {"id": "6", "next": "7", "value": 6}, {"id": "7", "next": "8", "value": 7}, {"id": "8", "next": "9", "value": 8}, {"id": "9", "next": "1", "value": 9}]}) => 1';
		const findLoop = new this.Problem();
		const nodesRoot = new LinkedList(1);
		nodesRoot.next = new LinkedList(2);
		nodesRoot.next.next = new LinkedList(3);
		nodesRoot.next.next.next = new LinkedList(4);
		nodesRoot.next.next.next.next = new LinkedList(5);
		nodesRoot.next.next.next.next.next = new LinkedList(6);
		nodesRoot.next.next.next.next.next.next = new LinkedList(7);
		nodesRoot.next.next.next.next.next.next.next = new LinkedList(8);
		nodesRoot.next.next.next.next.next.next.next.next = new LinkedList(9);
		nodesRoot.next.next.next.next.next.next.next.next.next = nodesRoot;

		assert.equal(findLoop.solve(nodesRoot), nodesRoot);
	}

	test_4() {
		/**
         * {
            "head": "2",
            "nodes": [
                {"id": "2", "next": "3", "value": 2},
                {"id": "3", "next": "4", "value": 3},
                {"id": "4", "next": "5", "value": 4},
                {"id": "5", "next": "6", "value": 5},
                {"id": "6", "next": "7", "value": 6},
                {"id": "7", "next": "8", "value": 7},
                {"id": "8", "next": "9", "value": 8},
                {"id": "9", "next": "2", "value": 9}
            ]
            }
         */

		this.current_test_name =
			'({"head": "2", "nodes": [{"id": "2", "next": "3", "value": 2}, {"id": "3", "next": "4", "value": 3}, {"id": "4", "next": "5", "value": 4}, {"id": "5", "next": "6", "value": 5}, {"id": "6", "next": "7", "value": 6}, {"id": "7", "next": "8", "value": 7}, {"id": "8", "next": "9", "value": 8}, {"id": "9", "next": "2", "value": 9}]}) => 2';
		const findLoop = new this.Problem();
		const nodesRoot = new LinkedList(2);
		nodesRoot.next = new LinkedList(3);
		nodesRoot.next.next = new LinkedList(4);
		nodesRoot.next.next.next = new LinkedList(5);
		nodesRoot.next.next.next.next = new LinkedList(6);
		nodesRoot.next.next.next.next.next = new LinkedList(7);
		nodesRoot.next.next.next.next.next.next = new LinkedList(8);
		nodesRoot.next.next.next.next.next.next.next = new LinkedList(9);
		nodesRoot.next.next.next.next.next.next.next.next = nodesRoot;

		assert.equal(findLoop.solve(nodesRoot), nodesRoot);
	}

	test_5() {
		/**
         * {
            "head": "3",
            "nodes": [
                {"id": "3", "next": "4", "value": 3},
                {"id": "4", "next": "5", "value": 4},
                {"id": "5", "next": "6", "value": 5},
                {"id": "6", "next": "7", "value": 6},
                {"id": "7", "next": "8", "value": 7},
                {"id": "8", "next": "9", "value": 8},
                {"id": "9", "next": "3", "value": 9}
            ]
            }
         */

		this.current_test_name =
			'({"head": "3", "nodes": [{"id": "3", "next": "4", "value": 3}, {"id": "4", "next": "5", "value": 4}, {"id": "5", "next": "6", "value": 5}, {"id": "6", "next": "7", "value": 6}, {"id": "7", "next": "8", "value": 7}, {"id": "8", "next": "9", "value": 8}, {"id": "9", "next": "3", "value": 9}]}) => 3';
		const findLoop = new this.Problem();
		const nodesRoot = new LinkedList(3);
		nodesRoot.next = new LinkedList(4);
		nodesRoot.next.next = new LinkedList(5);
		nodesRoot.next.next.next = new LinkedList(6);
		nodesRoot.next.next.next.next = new LinkedList(7);
		nodesRoot.next.next.next.next.next = new LinkedList(8);
		nodesRoot.next.next.next.next.next.next = new LinkedList(9);
		nodesRoot.next.next.next.next.next.next.next = nodesRoot;

		assert.equal(findLoop.solve(nodesRoot), nodesRoot);
	}

	test_6() {
		/**
         * {
            "head": "5",
            "nodes": [
                {"id": "5", "next": "6", "value": 5},
                {"id": "6", "next": "7", "value": 6},
                {"id": "7", "next": "8", "value": 7},
                {"id": "8", "next": "9", "value": 8},
                {"id": "9", "next": "5", "value": 9}
            ]
            }
         */

		this.current_test_name =
			'({"head": "5", "nodes": [{"id": "5", "next": "6", "value": 5}, {"id": "6", "next": "7", "value": 6}, {"id": "7", "next": "8", "value": 7}, {"id": "8", "next": "9", "value": 8}, {"id": "9", "next": "5", "value": 9}]}) => 5';
		const findLoop = new this.Problem();
		const nodesRoot = new LinkedList(5);
		nodesRoot.next = new LinkedList(6);
		nodesRoot.next.next = new LinkedList(7);
		nodesRoot.next.next.next = new LinkedList(8);
		nodesRoot.next.next.next.next = new LinkedList(9);
		nodesRoot.next.next.next.next.next = nodesRoot;
	}

	test_7() {
		/**
         * {
            "head": "6",
            "nodes": [
                {"id": "6", "next": "7", "value": 6},
                {"id": "7", "next": "8", "value": 7},
                {"id": "8", "next": "9", "value": 8},
                {"id": "9", "next": "6", "value": 9}
            ]
            }
         */

		this.current_test_name =
			'({"head": "6", "nodes": [{"id": "6", "next": "7", "value": 6}, {"id": "7", "next": "8", "value": 7}, {"id": "8", "next": "9", "value": 8}, {"id": "9", "next": "6", "value": 9}]}) => 6';
		const findLoop = new this.Problem();
		const nodesRoot = new LinkedList(6);
		nodesRoot.next = new LinkedList(7);
		nodesRoot.next.next = new LinkedList(8);
		nodesRoot.next.next.next = new LinkedList(9);

		nodesRoot.next.next.next.next = nodesRoot;

		assert.equal(findLoop.solve(nodesRoot), nodesRoot);
	}

	test_8() {
		/**
         * {
            "head": "7",
            "nodes": [
                {"id": "7", "next": "8", "value": 7},
                {"id": "8", "next": "9", "value": 8},
                {"id": "9", "next": "7", "value": 9}
            ]
            }
         */

		this.current_test_name =
			'({"head": "7", "nodes": [{"id": "7", "next": "8", "value": 7}, {"id": "8", "next": "9", "value": 8}, {"id": "9", "next": "7", "value": 9}]}) => 7';
		const findLoop = new this.Problem();
		const nodesRoot = new LinkedList(7);
		nodesRoot.next = new LinkedList(8);
		nodesRoot.next.next = new LinkedList(9);
		nodesRoot.next.next.next = nodesRoot;

		assert.equal(findLoop.solve(nodesRoot), nodesRoot);
	}

	test_9() {
		/**
         * {
            "linkedList": {
                "head": "0",
                "nodes": [
                {"id": "0", "next": "1", "value": 0},
                {"id": "1", "next": "2", "value": 1},
                {"id": "2", "next": "3", "value": 2},
                {"id": "3", "next": "4", "value": 3},
                {"id": "4", "next": "5", "value": 4},
                {"id": "5", "next": "6", "value": 5},
                {"id": "6", "next": "7", "value": 6},
                {"id": "7", "next": "8", "value": 7},
                {"id": "8", "next": "9", "value": 8},
                {"id": "9", "next": "9", "value": 9}
                ]
            }
            }
         */

		this.current_test_name =
			'({"linkedList": {"head": "0", "nodes": [{"id": "0", "next": "1", "value": 0}, {"id": "1", "next": "2", "value": 1}, {"id": "2", "next": "3", "value": 2}, {"id": "3", "next": "4", "value": 3}, {"id": "4", "next": "5", "value": 4}, {"id": "5", "next": "6", "value": 5}, {"id": "6", "next": "7", "value": 6}, {"id": "7", "next": "8", "value": 7}, {"id": "8", "next": "9", "value": 8}, {"id": "9", "next": "9", "value": 9}]}}) => 9';
		const findLoop = new this.Problem();
		const nodesRoot = new LinkedList(0);
		nodesRoot.next = new LinkedList(1);
		nodesRoot.next.next = new LinkedList(2);
		nodesRoot.next.next.next = new LinkedList(3);
		nodesRoot.next.next.next.next = new LinkedList(4);
		nodesRoot.next.next.next.next.next = new LinkedList(5);
		nodesRoot.next.next.next.next.next.next = new LinkedList(6);
		nodesRoot.next.next.next.next.next.next.next = new LinkedList(7);
		nodesRoot.next.next.next.next.next.next.next.next = new LinkedList(8);
		nodesRoot.next.next.next.next.next.next.next.next.next = new LinkedList(
			9
		);
		nodesRoot.next.next.next.next.next.next.next.next.next.next =
			nodesRoot.next.next.next.next.next.next.next.next;

		assert.equal(
			findLoop.solve(nodesRoot),
			nodesRoot.next.next.next.next.next.next.next.next
		);
	}

	test_10() {
		/**
         * {
            "head": "9",
            "nodes": [
                {"id": "9", "next": "9", "value": 9}
            ]
            }
         */

		this.current_test_name =
			'({"head": "9", "nodes": [{"id": "9", "next": "9", "value": 9}]}) => 9';
		const findLoop = new this.Problem();
		const nodesRoot = new LinkedList(9);
		nodesRoot.next = nodesRoot;

		assert.equal(findLoop.solve(nodesRoot), nodesRoot);
	}
}

class mergeLinkedLists extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
		this.tests.push(() => this.test_4());
		this.tests.push(() => this.test_5());
		this.tests.push(() => this.test_6());
		this.tests.push(() => this.test_7());
	}

	test_1() {
		/**
         * 
         * {
            "head": "1",
            "nodes": [
                {"id": "1", "next": "2", "value": 1},
                {"id": "2", "next": "3", "value": 2},
                {"id": "3", "next": "4", "value": 3},
                {"id": "4", "next": "5", "value": 4},
                {"id": "5", "next": "6", "value": 5},
                {"id": "6", "next": "7", "value": 6},
                {"id": "7", "next": "8", "value": 7},
                {"id": "8", "next": "9", "value": 8},
                {"id": "9", "next": "10", "value": 9},
                {"id": "10", "next": null, "value": 10}
            ]
            }
            View Outputs Side By Side
            Input(s)
            {
            "linkedListOne": {
                "head": "2",
                "nodes": [
                {"id": "2", "next": "6", "value": 2},
                {"id": "6", "next": "7", "value": 6},
                {"id": "7", "next": "8", "value": 7},
                {"id": "8", "next": null, "value": 8}
                ]
            },
            "linkedListTwo": {
                "head": "1",
                "nodes": [
                {"id": "1", "next": "3", "value": 1},
                {"id": "3", "next": "4", "value": 3},
                {"id": "4", "next": "5", "value": 4},
                {"id": "5", "next": "9", "value": 5},
                {"id": "9", "next": "10", "value": 9},
                {"id": "10", "next": null, "value": 10}
                ]
            }
            }
         */

		this.current_test_name =
			'({"linkedListOne": {"head": "2", "nodes": [{"id": "2", "next": "6", "value": 2}, {"id": "6", "next": "7", "value": 6}, {"id": "7", "next": "8", "value": 7}, {"id": "8", "next": null, "value": 8}]}, "linkedListTwo": {"head": "1", "nodes": [{"id": "1", "next": "3", "value": 1}, {"id": "3", "next": "4", "value": 3}, {"id": "4", "next": "5", "value": 4}, {"id": "5", "next": "9", "value": 5}, {"id": "9", "next": "10", "value": 9}, {"id": "10", "next": null, "value": 10}]}}) => 1,2,3,4,5,6,7,8,9,10';
		const mergeLinkedLists = new this.Problem();
		const linkedListOne = new LinkedList(2);
		linkedListOne.next = new LinkedList(6);
		linkedListOne.next.next = new LinkedList(7);
		linkedListOne.next.next.next = new LinkedList(8);
		const linkedListTwo = new LinkedList(1);
		linkedListTwo.next = new LinkedList(3);
		linkedListTwo.next.next = new LinkedList(4);
		linkedListTwo.next.next.next = new LinkedList(5);
		linkedListTwo.next.next.next.next = new LinkedList(9);

		linkedListTwo.next.next.next.next.next = new LinkedList(10);
		assert.equal(
			mergeLinkedLists.solve(linkedListOne, linkedListTwo),
			linkedListTwo
		);
	}

	test_2() {
		/**
         * {
            "head": "1",
            "nodes": [
                {"id": "1", "next": "2", "value": 1},
                {"id": "2", "next": "3", "value": 2},
                {"id": "3", "next": "4", "value": 3},
                {"id": "4", "next": "5", "value": 4},
                {"id": "5", "next": "6", "value": 5},
                {"id": "6", "next": "7", "value": 6},
                {"id": "7", "next": "8", "value": 7},
                {"id": "8", "next": "9", "value": 8},
                {"id": "9", "next": "10", "value": 9},
                {"id": "10", "next": null, "value": 10}
            ]
            }
            View Outputs Side By Side
            Input(s)
            {
            "linkedListOne": {
                "head": "1",
                "nodes": [
                {"id": "1", "next": "2", "value": 1},
                {"id": "2", "next": "3", "value": 2},
                {"id": "3", "next": "4", "value": 3},
                {"id": "4", "next": "5", "value": 4},
                {"id": "5", "next": null, "value": 5}
                ]
            },
            "linkedListTwo": {
                "head": "6",
                "nodes": [
                {"id": "6", "next": "7", "value": 6},
                {"id": "7", "next": "8", "value": 7},
                {"id": "8", "next": "9", "value": 8},
                {"id": "9", "next": "10", "value": 9},
                {"id": "10", "next": null, "value": 10}
                ]
            }
            }
         */

		this.current_test_name =
			'test 2 | ({"linkedListOne": {"head": "1", "nodes": [{"id": "1", "next": "2", "value": 1}, {"id": "2", "next": "3", "value": 2}, {"id": "3", "next": "4", "value": 3}, {"id": "4", "next": "5", "value": 4}, {"id": "5", "next": null, "value": 5}]}, "linkedListTwo": {"head": "6", "nodes": [{"id": "6", "next": "7", "value": 6}, {"id": "7", "next": "8", "value": 7}, {"id": "8", "next": "9", "value": 8}, {"id": "9", "next": "10", "value": 9}, {"id": "10", "next": null, "value": 10}]}}) => 1,2,3,4,5,6,7,8,9,10';
		const mergeLinkedLists = new this.Problem();
		const linkedListOne = new LinkedList(1);
		linkedListOne.next = new LinkedList(2);
		linkedListOne.next.next = new LinkedList(3);
		linkedListOne.next.next.next = new LinkedList(4);
		linkedListOne.next.next.next.next = new LinkedList(5);

		const linkedListTwo = new LinkedList(6);
		linkedListTwo.next = new LinkedList(7);
		linkedListTwo.next.next = new LinkedList(8);
		linkedListTwo.next.next.next = new LinkedList(9);
		linkedListTwo.next.next.next.next = new LinkedList(10);

		assert.equal(
			mergeLinkedLists.solve(linkedListOne, linkedListTwo),
			linkedListOne
		);
	}

	test_3() {
		/**
         * {
            "head": "1",
            "nodes": [
                {"id": "1", "next": "2", "value": 1},
                {"id": "2", "next": "3", "value": 2},
                {"id": "3", "next": "4", "value": 3},
                {"id": "4", "next": "5", "value": 4},
                {"id": "5", "next": "6", "value": 5},
                {"id": "6", "next": "7", "value": 6},
                {"id": "7", "next": "8", "value": 7},
                {"id": "8", "next": "9", "value": 8},
                {"id": "9", "next": "10", "value": 9},
                {"id": "10", "next": null, "value": 10}
            ]
            }
            View Outputs Side By Side
            Input(s)
            {
            "linkedListOne": {
                "head": "6",
                "nodes": [
                {"id": "6", "next": "7", "value": 6},
                {"id": "7", "next": "8", "value": 7},
                {"id": "8", "next": "9", "value": 8},
                {"id": "9", "next": "10", "value": 9},
                {"id": "10", "next": null, "value": 10}
                ]
            },
            "linkedListTwo": {
                "head": "1",
                "nodes": [
                {"id": "1", "next": "2", "value": 1},
                {"id": "2", "next": "3", "value": 2},
                {"id": "3", "next": "4", "value": 3},
                {"id": "4", "next": "5", "value": 4},
                {"id": "5", "next": null, "value": 5}
                ]
            }
            }
         */

		this.current_test_name =
			'test 3 | ({"linkedListOne": {"head": "6", "nodes": [{"id": "6", "next": "7", "value": 6}, {"id": "7", "next": "8", "value": 7}, {"id": "8", "next": "9", "value": 8}, {"id": "9", "next": "10", "value": 9}, {"id": "10", "next": null, "value": 10}]}, "linkedListTwo": {"head": "1", "nodes": [{"id": "1", "next": "2", "value": 1}, {"id": "2", "next": "3", "value": 2}, {"id": "3", "next": "4", "value": 3}, {"id": "4", "next": "5", "value": 4}, {"id": "5", "next": null, "value": 5}]}}) => 1,2,3,4,5,6,7,8,9,10';
		const mergeLinkedLists = new this.Problem();
		const linkedListOne = new LinkedList(6);
		linkedListOne.next = new LinkedList(7);
		linkedListOne.next.next = new LinkedList(8);
		linkedListOne.next.next.next = new LinkedList(9);
		linkedListOne.next.next.next.next = new LinkedList(10);

		const linkedListTwo = new LinkedList(1);
		linkedListTwo.next = new LinkedList(2);
		linkedListTwo.next.next = new LinkedList(3);
		linkedListTwo.next.next.next = new LinkedList(4);
		linkedListTwo.next.next.next.next = new LinkedList(5);

		assert.equal(
			mergeLinkedLists.solve(linkedListOne, linkedListTwo),
			linkedListTwo
		);
	}

	test_4() {
		/**
         * {
        "head": "1",
        "nodes": [
            {"id": "1", "next": "2", "value": 1},
            {"id": "2", "next": "3", "value": 2},
            {"id": "3", "next": "4", "value": 3},
            {"id": "4", "next": "5", "value": 4},
            {"id": "5", "next": "6", "value": 5},
            {"id": "6", "next": "7", "value": 6},
            {"id": "7", "next": "8", "value": 7},
            {"id": "8", "next": "9", "value": 8},
            {"id": "9", "next": "10", "value": 9},
            {"id": "10", "next": null, "value": 10}
        ]
        }
        View Outputs Side By Side
        Input(s)
        {
        "linkedListOne": {
            "head": "1",
            "nodes": [
            {"id": "1", "next": "3", "value": 1},
            {"id": "3", "next": "5", "value": 3},
            {"id": "5", "next": "7", "value": 5},
            {"id": "7", "next": "9", "value": 7},
            {"id": "9", "next": null, "value": 9}
            ]
        },
        "linkedListTwo": {
            "head": "2",
            "nodes": [
            {"id": "2", "next": "4", "value": 2},
            {"id": "4", "next": "6", "value": 4},
            {"id": "6", "next": "8", "value": 6},
            {"id": "8", "next": "10", "value": 8},
            {"id": "10", "next": null, "value": 10}
            ]
        }
        }
         */

		this.current_test_name = '';
		const mergeLinkedLists = new this.Problem();
		const linkedListOne = new LinkedList(1);
		linkedListOne.next = new LinkedList(3);
		linkedListOne.next.next = new LinkedList(5);
		linkedListOne.next.next.next = new LinkedList(7);
		linkedListOne.next.next.next.next = new LinkedList(9);

		const linkedListTwo = new LinkedList(2);
		linkedListTwo.next = new LinkedList(4);
		linkedListTwo.next.next = new LinkedList(6);
		linkedListTwo.next.next.next = new LinkedList(8);
		linkedListTwo.next.next.next.next = new LinkedList(10);

		assert.equal(
			mergeLinkedLists.solve(linkedListOne, linkedListTwo),
			linkedListOne
		);
	}

	test_5() {
		/**
         * {
        "head": "0",
        "nodes": [
            {"id": "0", "next": "1", "value": 0},
            {"id": "1", "next": "2", "value": 1},
            {"id": "2", "next": "3", "value": 2},
            {"id": "3", "next": "4", "value": 3},
            {"id": "4", "next": "5", "value": 4},
            {"id": "5", "next": "6", "value": 5},
            {"id": "6", "next": "7", "value": 6},
            {"id": "7", "next": "8", "value": 7},
            {"id": "8", "next": "9", "value": 8},
            {"id": "9", "next": "10", "value": 9},
            {"id": "10", "next": null, "value": 10}
        ]
        }
        View Outputs Side By Side
        Input(s)
        {
        "linkedListOne": {
            "head": "0",
            "nodes": [
            {"id": "0", "next": "1", "value": 0},
            {"id": "1", "next": "2", "value": 1},
            {"id": "2", "next": "3", "value": 2},
            {"id": "3", "next": "4", "value": 3},
            {"id": "4", "next": "5", "value": 4},
            {"id": "5", "next": "7", "value": 5},
            {"id": "7", "next": "8", "value": 7},
            {"id": "8", "next": "9", "value": 8},
            {"id": "9", "next": "10", "value": 9},
            {"id": "10", "next": null, "value": 10}
            ]
        },
        "linkedListTwo": {
            "head": "6",
            "nodes": [
            {"id": "6", "next": null, "value": 6}
            ]
        }
        }
         */

		this.current_test_name =
			'test 5 | ({"linkedListOne": {"head": "0", "nodes": [{"id": "0", "next": "1", "value": 0}, {"id": "1", "next": "2", "value": 1}, {"id": "2", "next": "3", "value": 2}, {"id": "3", "next": "4", "value": 3}, {"id": "4", "next": "5", "value": 4}, {"id": "5", "next": "7", "value": 5}, {"id": "7", "next": "8", "value": 7}, {"id": "8", "next": "9", "value": 8}, {"id": "9", "next": "10", "value": 9}, {"id": "10", "next": null, "value": 10}]}, "linkedListTwo": {"head": "6", "nodes": [{"id": "6", "next": null, "value": 6}]}}) => 0,1,2,3,4,5,6,7,8,9,10';

		const mergeLinkedLists = new this.Problem();
		const linkedListOne = new LinkedList(0);
		linkedListOne.next = new LinkedList(1);
		linkedListOne.next.next = new LinkedList(2);
		linkedListOne.next.next.next = new LinkedList(3);
		linkedListOne.next.next.next.next = new LinkedList(4);
		linkedListOne.next.next.next.next.next = new LinkedList(5);
		linkedListOne.next.next.next.next.next.next = new LinkedList(7);
		linkedListOne.next.next.next.next.next.next.next = new LinkedList(8);
		linkedListOne.next.next.next.next.next.next.next.next = new LinkedList(
			9
		);
		linkedListOne.next.next.next.next.next.next.next.next.next =
			new LinkedList(10);

		const linkedListTwo = new LinkedList(6);

		assert.equal(
			mergeLinkedLists.solve(linkedListOne, linkedListTwo),
			linkedListOne
		);
	}

	test_6() {
		/**
         * {
            "head": "0",
            "nodes": [
                {"id": "0", "next": "1", "value": 0},
                {"id": "1", "next": "2", "value": 1},
                {"id": "2", "next": "3", "value": 2},
                {"id": "3", "next": "4", "value": 3},
                {"id": "4", "next": "5", "value": 4},
                {"id": "5", "next": "6", "value": 5},
                {"id": "6", "next": "7", "value": 6},
                {"id": "7", "next": "8", "value": 7},
                {"id": "8", "next": "9", "value": 8},
                {"id": "9", "next": "10", "value": 9},
                {"id": "10", "next": null, "value": 10}
            ]
            }
            View Outputs Side By Side
            Input(s)
            {
            "linkedListOne": {
                "head": "6",
                "nodes": [
                {"id": "6", "next": null, "value": 6}
                ]
            },
            "linkedListTwo": {
                "head": "0",
                "nodes": [
                {"id": "0", "next": "1", "value": 0},
                {"id": "1", "next": "2", "value": 1},
                {"id": "2", "next": "3", "value": 2},
                {"id": "3", "next": "4", "value": 3},
                {"id": "4", "next": "5", "value": 4},
                {"id": "5", "next": "7", "value": 5},
                {"id": "7", "next": "8", "value": 7},
                {"id": "8", "next": "9", "value": 8},
                {"id": "9", "next": "10", "value": 9},
                {"id": "10", "next": null, "value": 10}
                ]
            }
            }
         */

		this.current_test_name =
			'Test 6 | ({"linkedListOne": {"head": "6", "nodes": [{"id": "6", "next": null, "value": 6}]}, "linkedListTwo": {"head": "0", "nodes": [{"id": "0", "next": "1", "value": 0}, {"id": "1", "next": "2", "value": 1}, {"id": "2", "next": "3", "value": 2}, {"id": "3", "next": "4", "value": 3}, {"id": "4", "next": "5", "value": 4}, {"id": "5", "next": "7", "value": 5}, {"id": "7", "next": "8", "value": 7}, {"id": "8", "next": "9", "value": 8}, {"id": "9", "next": "10", "value": 9}, {"id": "10", "next": null, "value": 10}]}}) => 0,1,2,3,4,5,6,7,8,9,10';
		const mergeLinkedLists = new this.Problem();
		const linkedListOne = new LinkedList(6);

		const linkedListTwo = new LinkedList(0);
		linkedListTwo.next = new LinkedList(1);
		linkedListTwo.next.next = new LinkedList(2);
		linkedListTwo.next.next.next = new LinkedList(3);
		linkedListTwo.next.next.next.next = new LinkedList(4);
		linkedListTwo.next.next.next.next.next = new LinkedList(5);
		linkedListTwo.next.next.next.next.next.next = new LinkedList(7);
		linkedListTwo.next.next.next.next.next.next.next = new LinkedList(8);
		linkedListTwo.next.next.next.next.next.next.next.next = new LinkedList(
			9
		);
		linkedListTwo.next.next.next.next.next.next.next.next.next =
			new LinkedList(10);

		assert.equal(
			mergeLinkedLists.solve(linkedListOne, linkedListTwo),
			linkedListTwo
		);
	}

	test_7() {
		/**
         * {
            "head": "1",
            "nodes": [
                {"id": "1", "next": "2", "value": 1},
                {"id": "2", "next": null, "value": 2}
            ]
            }
            View Outputs Side By Side
            Input(s)
            {
            "linkedListOne": {
                "head": "1",
                "nodes": [
                {"id": "1", "next": null, "value": 1}
                ]
            },
            "linkedListTwo": {
                "head": "2",
                "nodes": [
                {"id": "2", "next": null, "value": 2}
                ]
            }
            }
         */

		this.current_test_name =
			'Test 7 | ({"linkedListOne": {"head": "1", "nodes": [{"id": "1", "next": null, "value": 1}]}, "linkedListTwo": {"head": "2", "nodes": [{"id": "2", "next": null, "value": 2}]}}) => 1,2';
		const mergeLinkedLists = new this.Problem();
		const linkedListOne = new LinkedList(1);

		const linkedListTwo = new LinkedList(2);

		assert.equal(
			mergeLinkedLists.solve(linkedListOne, linkedListTwo),
			linkedListOne
		);
	}
}

class ShiftLinkedList extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
		this.tests.push(() => this.test_4());
		this.tests.push(() => this.test_5());
		this.tests.push(() => this.test_6());
		this.tests.push(() => this.test_7());
		this.tests.push(() => this.test_8());
		this.tests.push(() => this.test_9());
		this.tests.push(() => this.test_10());
	}

	test_1() {
		/**
         * 
        "head": "4",
        "nodes": [
            {"id": "4", "next": "5", "value": 4},
            {"id": "5", "next": "0", "value": 5},
            {"id": "0", "next": "1", "value": 0},
            {"id": "1", "next": "2", "value": 1},
            {"id": "2", "next": "3", "value": 2},
            {"id": "3", "next": null, "value": 3}
        ]
        }
        View Outputs Side By Side
        Input(s)
        {
        "k": 2,
        "linkedList": {
            "head": "0",
            "nodes": [
            {"id": "0", "next": "1", "value": 0},
            {"id": "1", "next": "2", "value": 1},
            {"id": "2", "next": "3", "value": 2},
            {"id": "3", "next": "4", "value": 3},
            {"id": "4", "next": "5", "value": 4},
            {"id": "5", "next": null, "value": 5}
            ]
        }
        }
         */

		this.current_test_name =
			'({"k": 2, "linkedList": {"head": "0", "nodes": [{"id": "0", "next": "1", "value": 0}, {"id": "1", "next": "2", "value": 1}, {"id": "2", "next": "3", "value": 2}, {"id": "3", "next": "4", "value": 3}, {"id": "4", "next": "5", "value": 4}, {"id": "5", "next": null, "value": 5}]}}) => 4';
		const linkedList = new this.Problem();
		const head = new LinkedList(0);
		head.next = new LinkedList(1);
		head.next.next = new LinkedList(2);
		head.next.next.next = new LinkedList(3);
		head.next.next.next.next = new LinkedList(4);
		head.next.next.next.next.next = new LinkedList(5);

		const solutionLink = linkedList.solve(head, 2);
		assert.equal(solutionLink.value, 4);
		assert.equal(solutionLink.next.value, 5);
		assert.equal(solutionLink.next.next.value, 0);
		assert.equal(solutionLink.next.next.next.value, 1);
		assert.equal(solutionLink.next.next.next.next.value, 2);
		assert.equal(solutionLink.next.next.next.next.next.value, 3);
	}

	test_2() {
		/**
         * {
        "head": "0",
        "nodes": [
            {"id": "0", "next": "1", "value": 0},
            {"id": "1", "next": "2", "value": 1},
            {"id": "2", "next": "3", "value": 2},
            {"id": "3", "next": "4", "value": 3},
            {"id": "4", "next": "5", "value": 4},
            {"id": "5", "next": null, "value": 5}
        ]
        }
        View Outputs Side By Side
        Input(s)
        {
        "k": 0,
        "linkedList": {
            "head": "0",
            "nodes": [
            {"id": "0", "next": "1", "value": 0},
            {"id": "1", "next": "2", "value": 1},
            {"id": "2", "next": "3", "value": 2},
            {"id": "3", "next": "4", "value": 3},
            {"id": "4", "next": "5", "value": 4},
            {"id": "5", "next": null, "value": 5}
            ]
        }
        }
         */

		this.current_test_name =
			'({"k": 0, "linkedList": {"head": "0", "nodes": [{"id": "0", "next": "1", "value": 0}, {"id": "1", "next": "2", "value": 1}, {"id": "2", "next": "3", "value": 2}, {"id": "3", "next": "4", "value": 3}, {"id": "4", "next": "5", "value": 4}, {"id": "5", "next": null, "value": 5}]}}) => 0';
		const linkedList = new this.Problem();
		const head = new LinkedList(0);
		head.next = new LinkedList(1);
		head.next.next = new LinkedList(2);
		head.next.next.next = new LinkedList(3);
		head.next.next.next.next = new LinkedList(4);
		head.next.next.next.next.next = new LinkedList(5);

		const solutionLink = linkedList.solve(head, 0);
		assert.equal(solutionLink.value, 0);
		assert.equal(solutionLink.next.value, 1);
		assert.equal(solutionLink.next.next.value, 2);
		assert.equal(solutionLink.next.next.next.value, 3);
		assert.equal(solutionLink.next.next.next.next.value, 4);
		assert.equal(solutionLink.next.next.next.next.next.value, 5);
	}

	test_3() {
		/**
         * {
            "head": "5",
            "nodes": [
                {"id": "5", "next": "0", "value": 5},
                {"id": "0", "next": "1", "value": 0},
                {"id": "1", "next": "2", "value": 1},
                {"id": "2", "next": "3", "value": 2},
                {"id": "3", "next": "4", "value": 3},
                {"id": "4", "next": null, "value": 4}
            ]
            }
            View Outputs Side By Side
            Input(s)
            {
            "k": 1,
            "linkedList": {
                "head": "0",
                "nodes": [
                {"id": "0", "next": "1", "value": 0},
                {"id": "1", "next": "2", "value": 1},
                {"id": "2", "next": "3", "value": 2},
                {"id": "3", "next": "4", "value": 3},
                {"id": "4", "next": "5", "value": 4},
                {"id": "5", "next": null, "value": 5}
                ]
            }
            }
         */

		this.current_test_name =
			'({"k": 1, "linkedList": {"head": "0", "nodes": [{"id": "0", "next": "1", "value": 0}, {"id": "1", "next": "2", "value": 1}, {"id": "2", "next": "3", "value": 2}, {"id": "3", "next": "4", "value": 3}, {"id": "4", "next": "5", "value": 4}, {"id": "5", "next": null, "value": 5}]}}) => 5';
		const linkedList = new this.Problem();

		const head = new LinkedList(0);
		head.next = new LinkedList(1);
		head.next.next = new LinkedList(2);
		head.next.next.next = new LinkedList(3);
		head.next.next.next.next = new LinkedList(4);
		head.next.next.next.next.next = new LinkedList(5);

		const solutionLink = linkedList.solve(head, 1);
		assert.equal(solutionLink.value, 5);
		assert.equal(solutionLink.next.value, 0);
		assert.equal(solutionLink.next.next.value, 1);
		assert.equal(solutionLink.next.next.next.value, 2);
		assert.equal(solutionLink.next.next.next.next.value, 3);
		assert.equal(solutionLink.next.next.next.next.next.value, 4);
	}

	test_4() {
		/** 
         * {
            "head": "3",
            "nodes": [
                {"id": "3", "next": "4", "value": 3},
                {"id": "4", "next": "5", "value": 4},
                {"id": "5", "next": "0", "value": 5},
                {"id": "0", "next": "1", "value": 0},
                {"id": "1", "next": "2", "value": 1},
                {"id": "2", "next": null, "value": 2}
            ]
            }
            View Outputs Side By Side
            Input(s)
            {
            "k": 3,
            "linkedList": {
                "head": "0",
                "nodes": [
                {"id": "0", "next": "1", "value": 0},
                {"id": "1", "next": "2", "value": 1},
                {"id": "2", "next": "3", "value": 2},
                {"id": "3", "next": "4", "value": 3},
                {"id": "4", "next": "5", "value": 4},
                {"id": "5", "next": null, "value": 5}
                ]
            }
            }
        */

		this.current_test_name =
			'({"k": 3, "linkedList": {"head": "0", "nodes": [{"id": "0", "next": "1", "value": 0}, {"id": "1", "next": "2", "value": 1}, {"id": "2", "next": "3", "value": 2}, {"id": "3", "next": "4", "value": 3}, {"id": "4", "next": "5", "value": 4}, {"id": "5", "next": null, "value": 5}]}}) => 3';
		const linkedList = new this.Problem();

		const head = new LinkedList(0);
		head.next = new LinkedList(1);
		head.next.next = new LinkedList(2);
		head.next.next.next = new LinkedList(3);
		head.next.next.next.next = new LinkedList(4);
		head.next.next.next.next.next = new LinkedList(5);

		const solutionLink = linkedList.solve(head, 3);
		assert.equal(solutionLink.value, 3);
		assert.equal(solutionLink.next.value, 4);
		assert.equal(solutionLink.next.next.value, 5);
		assert.equal(solutionLink.next.next.next.value, 0);
		assert.equal(solutionLink.next.next.next.next.value, 1);
		assert.equal(solutionLink.next.next.next.next.next.value, 2);
	}

	test_5() {
		/**
         * {
            "head": "2",
            "nodes": [
                {"id": "2", "next": "3", "value": 2},
                {"id": "3", "next": "4", "value": 3},
                {"id": "4", "next": "5", "value": 4},
                {"id": "5", "next": "0", "value": 5},
                {"id": "0", "next": "1", "value": 0},
                {"id": "1", "next": null, "value": 1}
            ]
            }
            View Outputs Side By Side
            Input(s)
            {
            "k": 4,
            "linkedList": {
                "head": "0",
                "nodes": [
                {"id": "0", "next": "1", "value": 0},
                {"id": "1", "next": "2", "value": 1},
                {"id": "2", "next": "3", "value": 2},
                {"id": "3", "next": "4", "value": 3},
                {"id": "4", "next": "5", "value": 4},
                {"id": "5", "next": null, "value": 5}
                ]
            }
            }
         * 
         */

		this.current_test_name =
			'({"k": 4, "linkedList": {"head": "0", "nodes": [{"id": "0", "next": "1", "value": 0}, {"id": "1", "next": "2", "value": 1}, {"id": "2", "next": "3", "value": 2}, {"id": "3", "next": "4", "value": 3}, {"id": "4", "next": "5", "value": 4}, {"id": "5", "next": null, "value": 5}]}}) => 2';
		const linkedList = new this.Problem();
		const head = new LinkedList(0);
		head.next = new LinkedList(1);
		head.next.next = new LinkedList(2);
		head.next.next.next = new LinkedList(3);
		head.next.next.next.next = new LinkedList(4);
		head.next.next.next.next.next = new LinkedList(5);

		const solutionLink = linkedList.solve(head, 4);
		assert.equal(solutionLink.value, 2);
		assert.equal(solutionLink.next.value, 3);
		assert.equal(solutionLink.next.next.value, 4);
		assert.equal(solutionLink.next.next.next.value, 5);
		assert.equal(solutionLink.next.next.next.next.value, 0);
		assert.equal(solutionLink.next.next.next.next.next.value, 1);
	}

	test_6() {
		/**
         * {
            "head": "1",
            "nodes": [
                {"id": "1", "next": "2", "value": 1},
                {"id": "2", "next": "3", "value": 2},
                {"id": "3", "next": "4", "value": 3},
                {"id": "4", "next": "5", "value": 4},
                {"id": "5", "next": "0", "value": 5},
                {"id": "0", "next": null, "value": 0}
            ]
            }
            View Outputs Side By Side
            Input(s)
            {
            "k": 5,
            "linkedList": {
                "head": "0",
                "nodes": [
                {"id": "0", "next": "1", "value": 0},
                {"id": "1", "next": "2", "value": 1},
                {"id": "2", "next": "3", "value": 2},
                {"id": "3", "next": "4", "value": 3},
                {"id": "4", "next": "5", "value": 4},
                {"id": "5", "next": null, "value": 5}
                ]
            }
            }
         */

		this.current_test_name =
			'({"k": 5, "linkedList": {"head": "0", "nodes": [{"id": "0", "next": "1", "value": 0}, {"id": "1", "next": "2", "value": 1}, {"id": "2", "next": "3", "value": 2}, {"id": "3", "next": "4", "value": 3}, {"id": "4", "next": "5", "value": 4}, {"id": "5", "next": null, "value": 5}]}}) => 1';
		const linkedList = new this.Problem();
		const head = new LinkedList(0);
		head.next = new LinkedList(1);
		head.next.next = new LinkedList(2);
		head.next.next.next = new LinkedList(3);
		head.next.next.next.next = new LinkedList(4);
		head.next.next.next.next.next = new LinkedList(5);

		const solutionLink = linkedList.solve(head, 5);
		assert.equal(solutionLink.value, 1);
		assert.equal(solutionLink.next.value, 2);
		assert.equal(solutionLink.next.next.value, 3);
		assert.equal(solutionLink.next.next.next.value, 4);
		assert.equal(solutionLink.next.next.next.next.value, 5);
		assert.equal(solutionLink.next.next.next.next.next.value, 0);
	}

	test_7() {
		/**
         * {
            "head": "0",
            "nodes": [
                {"id": "0", "next": "1", "value": 0},
                {"id": "1", "next": "2", "value": 1},
                {"id": "2", "next": "3", "value": 2},
                {"id": "3", "next": "4", "value": 3},
                {"id": "4", "next": "5", "value": 4},
                {"id": "5", "next": null, "value": 5}
            ]
            }
            View Outputs Side By Side
            Input(s)
            {
            "k": 6,
            "linkedList": {
                "head": "0",
                "nodes": [
                {"id": "0", "next": "1", "value": 0},
                {"id": "1", "next": "2", "value": 1},
                {"id": "2", "next": "3", "value": 2},
                {"id": "3", "next": "4", "value": 3},
                {"id": "4", "next": "5", "value": 4},
                {"id": "5", "next": null, "value": 5}
                ]
            }
            }
         */

		this.current_test_name =
			'({"k": 6, "linkedList": {"head": "0", "nodes": [{"id": "0", "next": "1", "value": 0}, {"id": "1", "next": "2", "value": 1}, {"id": "2", "next": "3", "value": 2}, {"id": "3", "next": "4", "value": 3}, {"id": "4", "next": "5", "value": 4}, {"id": "5", "next": null, "value": 5}]}}) => 0';
		const linkedList = new this.Problem();
		const head = new LinkedList(0);
		head.next = new LinkedList(1);
		head.next.next = new LinkedList(2);
		head.next.next.next = new LinkedList(3);
		head.next.next.next.next = new LinkedList(4);
		head.next.next.next.next.next = new LinkedList(5);

		const solutionLink = linkedList.solve(head, 6);
		assert.equal(solutionLink.value, 0);
		assert.equal(solutionLink.next.value, 1);
		assert.equal(solutionLink.next.next.value, 2);
		assert.equal(solutionLink.next.next.next.value, 3);
		assert.equal(solutionLink.next.next.next.next.value, 4);
		assert.equal(solutionLink.next.next.next.next.next.value, 5);
	}

	test_8() {
		/**
         * {
            "head": "4",
            "nodes": [
                {"id": "4", "next": "5", "value": 4},
                {"id": "5", "next": "0", "value": 5},
                {"id": "0", "next": "1", "value": 0},
                {"id": "1", "next": "2", "value": 1},
                {"id": "2", "next": "3", "value": 2},
                {"id": "3", "next": null, "value": 3}
            ]
            }
            View Outputs Side By Side
            Input(s)
            {
            "k": 8,
            "linkedList": {
                "head": "0",
                "nodes": [
                {"id": "0", "next": "1", "value": 0},
                {"id": "1", "next": "2", "value": 1},
                {"id": "2", "next": "3", "value": 2},
                {"id": "3", "next": "4", "value": 3},
                {"id": "4", "next": "5", "value": 4},
                {"id": "5", "next": null, "value": 5}
                ]
            }
            }
         */

		this.current_test_name =
			'test 8 | ({"k": 8, "linkedList": {"head": "0", "nodes": [{"id": "0", "next": "1", "value": 0}, {"id": "1", "next": "2", "value": 1}, {"id": "2", "next": "3", "value": 2}, {"id": "3", "next": "4", "value": 3}, {"id": "4", "next": "5", "value": 4}, {"id": "5", "next": null, "value": 5}]}}) => 4';
		const linkedList = new this.Problem();
		const head = new LinkedList(0);
		head.next = new LinkedList(1);
		head.next.next = new LinkedList(2);
		head.next.next.next = new LinkedList(3);
		head.next.next.next.next = new LinkedList(4);
		head.next.next.next.next.next = new LinkedList(5);

		const solutionLink = linkedList.solve(head, 8);
		assert.equal(solutionLink.value, 4);
		assert.equal(solutionLink.next.value, 5);
		assert.equal(solutionLink.next.next.value, 0);
		assert.equal(solutionLink.next.next.next.value, 1);
		assert.equal(solutionLink.next.next.next.next.value, 2);
		assert.equal(solutionLink.next.next.next.next.next.value, 3);
	}

	test_9() {
		/**
         * {
            "head": "4",
            "nodes": [
                {"id": "4", "next": "5", "value": 4},
                {"id": "5", "next": "0", "value": 5},
                {"id": "0", "next": "1", "value": 0},
                {"id": "1", "next": "2", "value": 1},
                {"id": "2", "next": "3", "value": 2},
                {"id": "3", "next": null, "value": 3}
            ]
            }
            View Outputs Side By Side
            Input(s)
            {
            "k": 14,
            "linkedList": {
                "head": "0",
                "nodes": [
                {"id": "0", "next": "1", "value": 0},
                {"id": "1", "next": "2", "value": 1},
                {"id": "2", "next": "3", "value": 2},
                {"id": "3", "next": "4", "value": 3},
                {"id": "4", "next": "5", "value": 4},
                {"id": "5", "next": null, "value": 5}
                ]
            }
            }
         */

		this.current_test_name =
			'test 9 | ({"k": 14, "linkedList": {"head": "0", "nodes": [{"id": "0", "next": "1", "value": 0}, {"id": "1", "next": "2", "value": 1}, {"id": "2", "next": "3", "value": 2}, {"id": "3", "next": "4", "value": 3}, {"id": "4", "next": "5", "value": 4}, {"id": "5", "next": null, "value": 5}]}}) => 4';
		const linkedList = new this.Problem();
		const head = new LinkedList(0);
		head.next = new LinkedList(1);
		head.next.next = new LinkedList(2);
		head.next.next.next = new LinkedList(3);
		head.next.next.next.next = new LinkedList(4);
		head.next.next.next.next.next = new LinkedList(5);

		const solutionLink = linkedList.solve(head, 14);
		assert.equal(solutionLink.value, 4);
		assert.equal(solutionLink.next.value, 5);
		assert.equal(solutionLink.next.next.value, 0);
		assert.equal(solutionLink.next.next.next.value, 1);
		assert.equal(solutionLink.next.next.next.next.value, 2);
		assert.equal(solutionLink.next.next.next.next.next.value, 3);
	}

	test_10() {
		/**
         * {
            "head": "0",
            "nodes": [
                {"id": "0", "next": "1", "value": 0},
                {"id": "1", "next": "2", "value": 1},
                {"id": "2", "next": "3", "value": 2},
                {"id": "3", "next": "4", "value": 3},
                {"id": "4", "next": "5", "value": 4},
                {"id": "5", "next": null, "value": 5}
            ]
            }
            View Outputs Side By Side
            Input(s)
            {
            "k": 18,
            "linkedList": {
                "head": "0",
                "nodes": [
                {"id": "0", "next": "1", "value": 0},
                {"id": "1", "next": "2", "value": 1},
                {"id": "2", "next": "3", "value": 2},
                {"id": "3", "next": "4", "value": 3},
                {"id": "4", "next": "5", "value": 4},
                {"id": "5", "next": null, "value": 5}
                ]
            }
            }
         */

		this.current_test_name =
			'test 10 | ({"k": 18, "linkedList": {"head": "0", "nodes": [{"id": "0", "next": "1", "value": 0}, {"id": "1", "next": "2", "value": 1}, {"id": "2", "next": "3", "value": 2}, {"id": "3", "next": "4", "value": 3}, {"id": "4", "next": "5", "value": 4}, {"id": "5", "next": null, "value": 5}]}}) => 0';
		const linkedList = new this.Problem();
		const head = new LinkedList(0);
		head.next = new LinkedList(1);
		head.next.next = new LinkedList(2);
		head.next.next.next = new LinkedList(3);
		head.next.next.next.next = new LinkedList(4);
		head.next.next.next.next.next = new LinkedList(5);

		const solutionLink = linkedList.solve(head, 18);
		assert.equal(solutionLink.value, 0);
		assert.equal(solutionLink.next.value, 1);
		assert.equal(solutionLink.next.next.value, 2);
		assert.equal(solutionLink.next.next.next.value, 3);
		assert.equal(solutionLink.next.next.next.next.value, 4);
		assert.equal(solutionLink.next.next.next.next.next.value, 5);
	}
}

// This is an input class. Do not edit.
class OrgChart {
	constructor(name) {
		this.name = name;
		this.directReports = [];
	}
}

class LowestCommonManager extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
		this.tests.push(() => this.test_4());
		this.tests.push(() => this.test_5());
		this.tests.push(() => this.test_6());
		this.tests.push(() => this.test_7());
	}

	test_1() {
		/** 
         * {
            "nodeId": "B"
            }
            View Outputs Side By Side
            Input(s)
            {
            "orgChart": {
                "nodes": [
                {"directReports": ["B", "C"], "id": "A", "name": "A"},
                {"directReports": ["D", "E"], "id": "B", "name": "B"},
                {"directReports": ["F", "G"], "id": "C", "name": "C"},
                {"directReports": ["H", "I"], "id": "D", "name": "D"},
                {"directReports": [], "id": "E", "name": "E"},
                {"directReports": [], "id": "F", "name": "F"},
                {"directReports": [], "id": "G", "name": "G"},
                {"directReports": [], "id": "H", "name": "H"},
                {"directReports": [], "id": "I", "name": "I"}
                ]
            },
            "reportOne": "E",
            "reportTwo": "I",
            "topManager": "A"
            }
        */
		this.current_test_name = 'Test 1 | E, I and A';
		const orgChart = new this.Problem();
		const A = new OrgChart('A');
		const B = new OrgChart('B');
		const C = new OrgChart('C');
		const D = new OrgChart('D');
		const E = new OrgChart('E');
		const F = new OrgChart('F');
		const G = new OrgChart('G');
		const H = new OrgChart('H');
		const I = new OrgChart('I');

		A.directReports = [B, C];
		B.directReports = [D, E];
		C.directReports = [F, G];
		D.directReports = [H, I];

		const solution = orgChart.solve(A, E, I);
		assert.equal(solution.name, 'B');
	}

	test_2() {
		/**
         * {
            "nodeId": "A"
            }
            View Outputs Side By Side
            Input(s)
            {
            "orgChart": {
                "nodes": [
                {"directReports": ["B", "C", "D", "E", "F"], "id": "A", "name": "A"},
                {"directReports": ["G", "H", "I"], "id": "B", "name": "B"},
                {"directReports": ["J"], "id": "C", "name": "C"},
                {"directReports": ["K", "L"], "id": "D", "name": "D"},
                {"directReports": [], "id": "E", "name": "E"},
                {"directReports": ["M", "N"], "id": "F", "name": "F"},
                {"directReports": [], "id": "G", "name": "G"},
                {"directReports": ["O", "P", "Q", "R"], "id": "H", "name": "H"},
                {"directReports": [], "id": "I", "name": "I"},
                {"directReports": [], "id": "J", "name": "J"},
                {"directReports": ["S"], "id": "K", "name": "K"},
                {"directReports": [], "id": "L", "name": "L"},
                {"directReports": [], "id": "M", "name": "M"},
                {"directReports": [], "id": "N", "name": "N"},
                {"directReports": [], "id": "O", "name": "O"},
                {"directReports": ["T", "U"], "id": "P", "name": "P"},
                {"directReports": [], "id": "Q", "name": "Q"},
                {"directReports": ["V"], "id": "R", "name": "R"},
                {"directReports": [], "id": "S", "name": "S"},
                {"directReports": [], "id": "T", "name": "T"},
                {"directReports": [], "id": "U", "name": "U"},
                {"directReports": ["W", "X", "Y"], "id": "V", "name": "V"},
                {"directReports": [], "id": "W", "name": "W"},
                {"directReports": ["Z"], "id": "X", "name": "X"},
                {"directReports": [], "id": "Y", "name": "Y"},
                {"directReports": [], "id": "Z", "name": "Z"}
                ]
            },
            "reportOne": "A",
            "reportTwo": "B",
            "topManager": "A"
            }
         */

		this.current_test_name = 'Test 2 | A, B and A';
		const orgChart = new this.Problem();
		const A = new OrgChart('A');
		const B = new OrgChart('B');
		const C = new OrgChart('C');
		const D = new OrgChart('D');
		const E = new OrgChart('E');
		const F = new OrgChart('F');
		const G = new OrgChart('G');
		const H = new OrgChart('H');
		const I = new OrgChart('I');
		const J = new OrgChart('J');

		A.directReports = [B, C, D, E, F];
		B.directReports = [G, H, I];
		C.directReports = [J];
		D.directReports = [];
		E.directReports = [];
		F.directReports = [];
		G.directReports = [];
		H.directReports = [];
		I.directReports = [];
		J.directReports = [];

		const solution = orgChart.solve(A, B, A);
		assert.equal(solution.name, 'A');
	}

	test_3() {
		/**
         * {
            "nodeId": "A"
            }
            View Outputs Side By Side
            Input(s)
            {
            "orgChart": {
                "nodes": [
                {"directReports": ["B", "C", "D", "E", "F"], "id": "A", "name": "A"},
                {"directReports": ["G", "H", "I"], "id": "B", "name": "B"},
                {"directReports": ["J"], "id": "C", "name": "C"},
                {"directReports": ["K", "L"], "id": "D", "name": "D"},
                {"directReports": [], "id": "E", "name": "E"},
                {"directReports": ["M", "N"], "id": "F", "name": "F"},
                {"directReports": [], "id": "G", "name": "G"},
                {"directReports": ["O", "P", "Q", "R"], "id": "H", "name": "H"},
                {"directReports": [], "id": "I", "name": "I"},
                {"directReports": [], "id": "J", "name": "J"},
                {"directReports": ["S"], "id": "K", "name": "K"},
                {"directReports": [], "id": "L", "name": "L"},
                {"directReports": [], "id": "M", "name": "M"},
                {"directReports": [], "id": "N", "name": "N"},
                {"directReports": [], "id": "O", "name": "O"},
                {"directReports": ["T", "U"], "id": "P", "name": "P"},
                {"directReports": [], "id": "Q", "name": "Q"},
                {"directReports": ["V"], "id": "R", "name": "R"},
                {"directReports": [], "id": "S", "name": "S"},
                {"directReports": [], "id": "T", "name": "T"},
                {"directReports": [], "id": "U", "name": "U"},
                {"directReports": ["W", "X", "Y"], "id": "V", "name": "V"},
                {"directReports": [], "id": "W", "name": "W"},
                {"directReports": ["Z"], "id": "X", "name": "X"},
                {"directReports": [], "id": "Y", "name": "Y"},
                {"directReports": [], "id": "Z", "name": "Z"}
                ]
            },
            "reportOne": "B",
            "reportTwo": "F",
            "topManager": "A"
            }
         */

		this.current_test_name = 'Test 2 | B, F, and A';
		const orgChart = new this.Problem();
		const A = new OrgChart('A');
		const B = new OrgChart('B');
		const C = new OrgChart('C');
		const D = new OrgChart('D');
		const E = new OrgChart('E');
		const F = new OrgChart('F');
		const G = new OrgChart('G');
		const H = new OrgChart('H');
		const I = new OrgChart('I');
		const J = new OrgChart('J');
		const K = new OrgChart('K');
		const L = new OrgChart('L');
		const M = new OrgChart('M');
		const N = new OrgChart('N');
		const O = new OrgChart('O');
		const P = new OrgChart('P');
		const Q = new OrgChart('Q');
		const R = new OrgChart('R');
		const S = new OrgChart('S');
		const T = new OrgChart('T');
		const U = new OrgChart('U');
		const V = new OrgChart('V');
		const W = new OrgChart('W');
		const X = new OrgChart('X');
		const Y = new OrgChart('Y');
		const Z = new OrgChart('Z');

		A.directReports = [B, C, D, E, F];
		B.directReports = [G, H, I];
		C.directReports = [J];
		D.directReports = [K, L];
		E.directReports = [];
		F.directReports = [M, N];
		G.directReports = [];
		H.directReports = [O, P, Q, R];
		I.directReports = [];
		J.directReports = [];
		K.directReports = [S];
		L.directReports = [];
		M.directReports = [];
		N.directReports = [];
		O.directReports = [];
		P.directReports = [T, U];
		Q.directReports = [];
		R.directReports = [V];
		S.directReports = [];
		T.directReports = [];
		U.directReports = [];
		V.directReports = [W, X, Y];
		W.directReports = [];
		X.directReports = [Z];
		Y.directReports = [];
		Z.directReports = [];

		const solution = orgChart.solve(A, B, F);
		assert.equal(solution.name, 'A');
	}

	test_4() {
		/**
         * {
            "orgChart": {
                "nodes": [
                {"directReports": ["B", "C", "D", "E", "F"], "id": "A", "name": "A"},
                {"directReports": ["G", "H", "I"], "id": "B", "name": "B"},
                {"directReports": ["J"], "id": "C", "name": "C"},
                {"directReports": ["K", "L"], "id": "D", "name": "D"},
                {"directReports": [], "id": "E", "name": "E"},
                {"directReports": ["M", "N"], "id": "F", "name": "F"},
                {"directReports": [], "id": "G", "name": "G"},
                {"directReports": ["O", "P", "Q", "R"], "id": "H", "name": "H"},
                {"directReports": [], "id": "I", "name": "I"},
                {"directReports": [], "id": "J", "name": "J"},
                {"directReports": ["S"], "id": "K", "name": "K"},
                {"directReports": [], "id": "L", "name": "L"},
                {"directReports": [], "id": "M", "name": "M"},
                {"directReports": [], "id": "N", "name": "N"},
                {"directReports": [], "id": "O", "name": "O"},
                {"directReports": ["T", "U"], "id": "P", "name": "P"},
                {"directReports": [], "id": "Q", "name": "Q"},
                {"directReports": ["V"], "id": "R", "name": "R"},
                {"directReports": [], "id": "S", "name": "S"},
                {"directReports": [], "id": "T", "name": "T"},
                {"directReports": [], "id": "U", "name": "U"},
                {"directReports": ["W", "X", "Y"], "id": "V", "name": "V"},
                {"directReports": [], "id": "W", "name": "W"},
                {"directReports": ["Z"], "id": "X", "name": "X"},
                {"directReports": [], "id": "Y", "name": "Y"},
                {"directReports": [], "id": "Z", "name": "Z"}
                ]
            },
            "reportOne": "G",
            "reportTwo": "M",
            "topManager": "A"
            }
         */

		this.current_test_name = 'Test 3 | G, M, and A';
		const orgChart = new this.Problem();
		const A = new OrgChart('A');
		const B = new OrgChart('B');
		const C = new OrgChart('C');
		const D = new OrgChart('D');
		const E = new OrgChart('E');
		const F = new OrgChart('F');
		const G = new OrgChart('G');
		const H = new OrgChart('H');
		const I = new OrgChart('I');
		const J = new OrgChart('J');
		const K = new OrgChart('K');
		const L = new OrgChart('L');
		const M = new OrgChart('M');
		const N = new OrgChart('N');
		const O = new OrgChart('O');
		const P = new OrgChart('P');
		const Q = new OrgChart('Q');
		const R = new OrgChart('R');
		const S = new OrgChart('S');
		const T = new OrgChart('T');
		const U = new OrgChart('U');
		const V = new OrgChart('V');
		const W = new OrgChart('W');
		const X = new OrgChart('X');
		const Y = new OrgChart('Y');
		const Z = new OrgChart('Z');

		A.directReports = [B, C, D, E, F];
		B.directReports = [G, H, I];
		C.directReports = [J];
		D.directReports = [K, L];
		E.directReports = [];
		F.directReports = [M, N];
		G.directReports = [];
		H.directReports = [O, P, Q, R];
		I.directReports = [];
		J.directReports = [];
		K.directReports = [S];
		L.directReports = [];
		M.directReports = [];
		N.directReports = [];
		O.directReports = [];
		P.directReports = [T, U];
		Q.directReports = [];
		R.directReports = [V];
		S.directReports = [];
		T.directReports = [];
		U.directReports = [];
		V.directReports = [W, X, Y];
		W.directReports = [];
		X.directReports = [Z];
		Y.directReports = [];
		Z.directReports = [];

		const solution = orgChart.solve(A, G, M);
		assert.equal(solution.name, 'A');
	}

	test_5() {
		/**
         * {
            "nodeId": "A"
            }
            View Outputs Side By Side
            Input(s)
            {
            "orgChart": {
                "nodes": [
                {"directReports": ["B", "C", "D", "E", "F"], "id": "A", "name": "A"},
                {"directReports": ["G", "H", "I"], "id": "B", "name": "B"},
                {"directReports": ["J"], "id": "C", "name": "C"},
                {"directReports": ["K", "L"], "id": "D", "name": "D"},
                {"directReports": [], "id": "E", "name": "E"},
                {"directReports": ["M", "N"], "id": "F", "name": "F"},
                {"directReports": [], "id": "G", "name": "G"},
                {"directReports": ["O", "P", "Q", "R"], "id": "H", "name": "H"},
                {"directReports": [], "id": "I", "name": "I"},
                {"directReports": [], "id": "J", "name": "J"},
                {"directReports": ["S"], "id": "K", "name": "K"},
                {"directReports": [], "id": "L", "name": "L"},
                {"directReports": [], "id": "M", "name": "M"},
                {"directReports": [], "id": "N", "name": "N"},
                {"directReports": [], "id": "O", "name": "O"},
                {"directReports": ["T", "U"], "id": "P", "name": "P"},
                {"directReports": [], "id": "Q", "name": "Q"},
                {"directReports": ["V"], "id": "R", "name": "R"},
                {"directReports": [], "id": "S", "name": "S"},
                {"directReports": [], "id": "T", "name": "T"},
                {"directReports": [], "id": "U", "name": "U"},
                {"directReports": ["W", "X", "Y"], "id": "V", "name": "V"},
                {"directReports": [], "id": "W", "name": "W"},
                {"directReports": ["Z"], "id": "X", "name": "X"},
                {"directReports": [], "id": "Y", "name": "Y"},
                {"directReports": [], "id": "Z", "name": "Z"}
                ]
            },
            "reportOne": "U",
            "reportTwo": "S",
            "topManager": "A"
            }
         */

		this.current_test_name = 'Test 5 | U, S, and A';
		const orgChart = new this.Problem();
		const A = new OrgChart('A');
		const B = new OrgChart('B');
		const C = new OrgChart('C');
		const D = new OrgChart('D');
		const E = new OrgChart('E');
		const F = new OrgChart('F');
		const G = new OrgChart('G');
		const H = new OrgChart('H');
		const I = new OrgChart('I');
		const J = new OrgChart('J');
		const K = new OrgChart('K');
		const L = new OrgChart('L');
		const M = new OrgChart('M');
		const N = new OrgChart('N');
		const O = new OrgChart('O');
		const P = new OrgChart('P');
		const Q = new OrgChart('Q');
		const R = new OrgChart('R');
		const S = new OrgChart('S');
		const T = new OrgChart('T');
		const U = new OrgChart('U');
		const V = new OrgChart('V');
		const W = new OrgChart('W');
		const X = new OrgChart('X');
		const Y = new OrgChart('Y');
		const Z = new OrgChart('Z');

		A.directReports = [B, C, D, E, F];
		B.directReports = [G, H, I];
		C.directReports = [J];
		D.directReports = [K, L];
		E.directReports = [];
		F.directReports = [M, N];
		G.directReports = [];
		H.directReports = [O, P, Q, R];
		I.directReports = [];
		J.directReports = [];
		K.directReports = [S];
		L.directReports = [];
		M.directReports = [];
		N.directReports = [];
		O.directReports = [];
		P.directReports = [T, U];
		Q.directReports = [];
		R.directReports = [V];
		S.directReports = [];
		T.directReports = [];
		U.directReports = [];
		V.directReports = [W, X, Y];
		W.directReports = [];
		X.directReports = [Z];
		Y.directReports = [];
		Z.directReports = [];

		const solution = orgChart.solve(A, U, S);
		assert.equal(solution.name, 'A');
	}

	test_6() {
		/**
         * {
            "nodeId": "A"
            }
            View Outputs Side By Side
            Input(s)
            {
            "orgChart": {
                "nodes": [
                {"directReports": ["B", "C", "D", "E", "F"], "id": "A", "name": "A"},
                {"directReports": ["G", "H", "I"], "id": "B", "name": "B"},
                {"directReports": ["J"], "id": "C", "name": "C"},
                {"directReports": ["K", "L"], "id": "D", "name": "D"},
                {"directReports": [], "id": "E", "name": "E"},
                {"directReports": ["M", "N"], "id": "F", "name": "F"},
                {"directReports": [], "id": "G", "name": "G"},
                {"directReports": ["O", "P", "Q", "R"], "id": "H", "name": "H"},
                {"directReports": [], "id": "I", "name": "I"},
                {"directReports": [], "id": "J", "name": "J"},
                {"directReports": ["S"], "id": "K", "name": "K"},
                {"directReports": [], "id": "L", "name": "L"},
                {"directReports": [], "id": "M", "name": "M"},
                {"directReports": [], "id": "N", "name": "N"},
                {"directReports": [], "id": "O", "name": "O"},
                {"directReports": ["T", "U"], "id": "P", "name": "P"},
                {"directReports": [], "id": "Q", "name": "Q"},
                {"directReports": ["V"], "id": "R", "name": "R"},
                {"directReports": [], "id": "S", "name": "S"},
                {"directReports": [], "id": "T", "name": "T"},
                {"directReports": [], "id": "U", "name": "U"},
                {"directReports": ["W", "X", "Y"], "id": "V", "name": "V"},
                {"directReports": [], "id": "W", "name": "W"},
                {"directReports": ["Z"], "id": "X", "name": "X"},
                {"directReports": [], "id": "Y", "name": "Y"},
                {"directReports": [], "id": "Z", "name": "Z"}
                ]
            },
            "reportOne": "Z",
            "reportTwo": "M",
            "topManager": "A"
            }
         */

		this.current_test_name = 'Test 5 | Z, M, and A';
		const orgChart = new this.Problem();
		const A = new OrgChart('A');
		const B = new OrgChart('B');
		const C = new OrgChart('C');
		const D = new OrgChart('D');
		const E = new OrgChart('E');
		const F = new OrgChart('F');
		const G = new OrgChart('G');
		const H = new OrgChart('H');
		const I = new OrgChart('I');
		const J = new OrgChart('J');
		const K = new OrgChart('K');
		const L = new OrgChart('L');
		const M = new OrgChart('M');
		const N = new OrgChart('N');
		const O = new OrgChart('O');
		const P = new OrgChart('P');
		const Q = new OrgChart('Q');
		const R = new OrgChart('R');
		const S = new OrgChart('S');
		const T = new OrgChart('T');
		const U = new OrgChart('U');
		const V = new OrgChart('V');
		const W = new OrgChart('W');
		const X = new OrgChart('X');
		const Y = new OrgChart('Y');
		const Z = new OrgChart('Z');

		A.directReports = [B, C, D, E, F];
		B.directReports = [G, H, I];
		C.directReports = [J];
		D.directReports = [K, L];
		E.directReports = [];
		F.directReports = [M, N];
		G.directReports = [];
		H.directReports = [O, P, Q, R];
		I.directReports = [];
		J.directReports = [];
		K.directReports = [S];
		L.directReports = [];
		M.directReports = [];
		N.directReports = [];
		O.directReports = [];
		P.directReports = [T, U];
		Q.directReports = [];
		R.directReports = [V];
		S.directReports = [];
		T.directReports = [];
		U.directReports = [];
		V.directReports = [W, X, Y];
		W.directReports = [];
		X.directReports = [Z];
		Y.directReports = [];
		Z.directReports = [];

		const solution = orgChart.solve(A, Z, M);
		assert.equal(solution.name, 'A');
	}

	test_7() {
		/**
         * {
            "nodeId": "B"
            }
            View Outputs Side By Side
            Input(s)
            {
            "orgChart": {
                "nodes": [
                {"directReports": ["B", "C", "D", "E", "F"], "id": "A", "name": "A"},
                {"directReports": ["G", "H", "I"], "id": "B", "name": "B"},
                {"directReports": ["J"], "id": "C", "name": "C"},
                {"directReports": ["K", "L"], "id": "D", "name": "D"},
                {"directReports": [], "id": "E", "name": "E"},
                {"directReports": ["M", "N"], "id": "F", "name": "F"},
                {"directReports": [], "id": "G", "name": "G"},
                {"directReports": ["O", "P", "Q", "R"], "id": "H", "name": "H"},
                {"directReports": [], "id": "I", "name": "I"},
                {"directReports": [], "id": "J", "name": "J"},
                {"directReports": ["S"], "id": "K", "name": "K"},
                {"directReports": [], "id": "L", "name": "L"},
                {"directReports": [], "id": "M", "name": "M"},
                {"directReports": [], "id": "N", "name": "N"},
                {"directReports": [], "id": "O", "name": "O"},
                {"directReports": ["T", "U"], "id": "P", "name": "P"},
                {"directReports": [], "id": "Q", "name": "Q"},
                {"directReports": ["V"], "id": "R", "name": "R"},
                {"directReports": [], "id": "S", "name": "S"},
                {"directReports": [], "id": "T", "name": "T"},
                {"directReports": [], "id": "U", "name": "U"},
                {"directReports": ["W", "X", "Y"], "id": "V", "name": "V"},
                {"directReports": [], "id": "W", "name": "W"},
                {"directReports": ["Z"], "id": "X", "name": "X"},
                {"directReports": [], "id": "Y", "name": "Y"},
                {"directReports": [], "id": "Z", "name": "Z"}
                ]
            },
            "reportOne": "O",
            "reportTwo": "I",
            "topManager": "A"
            }
         */
		this.current_test_name = 'Test 7 | O, I, and B';
		const orgChart = new this.Problem();
		const A = new OrgChart('A');
		const B = new OrgChart('B');
		const C = new OrgChart('C');
		const D = new OrgChart('D');
		const E = new OrgChart('E');
		const F = new OrgChart('F');
		const G = new OrgChart('G');
		const H = new OrgChart('H');
		const I = new OrgChart('I');
		const J = new OrgChart('J');
		const K = new OrgChart('K');
		const L = new OrgChart('L');
		const M = new OrgChart('M');
		const N = new OrgChart('N');
		const O = new OrgChart('O');
		const P = new OrgChart('P');
		const Q = new OrgChart('Q');
		const R = new OrgChart('R');
		const S = new OrgChart('S');
		const T = new OrgChart('T');
		const U = new OrgChart('U');
		const V = new OrgChart('V');
		const W = new OrgChart('W');
		const X = new OrgChart('X');
		const Y = new OrgChart('Y');
		const Z = new OrgChart('Z');

		A.directReports = [B, C, D, E, F];
		B.directReports = [G, H, I];
		C.directReports = [J];
		D.directReports = [K, L];
		E.directReports = [];
		F.directReports = [M, N];
		G.directReports = [];
		H.directReports = [O, P, Q, R];
		I.directReports = [];
		J.directReports = [];
		K.directReports = [S];
		L.directReports = [];
		M.directReports = [];
		N.directReports = [];
		O.directReports = [];
		P.directReports = [T, U];
		Q.directReports = [];
		R.directReports = [V];
		S.directReports = [];
		T.directReports = [];
		U.directReports = [];
		V.directReports = [W, X, Y];
		W.directReports = [];
		X.directReports = [Z];
		Y.directReports = [];
		Z.directReports = [];

		const solution = orgChart.solve(B, O, I);
		assert.equal(solution.name, 'B');
	}
}

class InterweavingStrings extends ProblemTests {
	constructor(Problem) {
		super(Problem);

		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
		this.tests.push(() => this.test_4());
		this.tests.push(() => this.test_5());
		this.tests.push(() => this.test_6());
		this.tests.push(() => this.test_7());
		this.tests.push(() => this.test_8());
		this.tests.push(() => this.test_9());
		this.tests.push(() => this.test_10());
		this.tests.push(() => this.test_11());
		this.tests.push(() => this.test_12());
		this.tests.push(() => this.test_13());
		this.tests.push(() => this.test_14());
		this.tests.push(() => this.test_15());
		this.tests.push(() => this.test_16());
		this.tests.push(() => this.test_17());
		this.tests.push(() => this.test_18());
		this.tests.push(() => this.test_19());
		this.tests.push(() => this.test_20());
	}

	test_1() {
		/**
         * true
            View Outputs Side By Side
            Input(s)
            {
            "one": "algoexpert",
            "three": "your-algodream-expertjob",
            "two": "your-dream-job"
            }
         */

		this.current_test_name =
			'Test 1 | algoexpert, your-algodream-expertjob, and your-dream-job';
		const interweavingStrings = new this.Problem();
		const solution = interweavingStrings.solve(
			'algoexpert',
			'your-dream-job',
			'your-algodream-expertjob'
		);
		assert.equal(solution, true);
		// console.log("solution test_1", solution)
	}

	test_2() {
		/**
         * true
            View Outputs Side By Side
            Input(s)
            {
            "one": "a",
            "two": "b"
            "three": "ab",
            }
         */

		this.current_test_name = 'Test 2 | a, ab, and b';
		const interweavingStrings = new this.Problem();
		const solution = interweavingStrings.solve('a', 'b', 'ab');
		assert.equal(solution, true);
	}

	test_3() {
		/**
         * true
            View Outputs Side By Side
            Input(s)
            {
            "one": "a",
            "two": "b"
            "three": "ba",
            }
         */

		this.current_test_name = 'Test 3 | a, ba, and b';
		const interweavingStrings = new this.Problem();
		const solution = interweavingStrings.solve('a', 'b', 'ba');
		assert.equal(solution, true);
	}

	test_4() {
		/**
         * false
            View Outputs Side By Side
            Input(s)
            {
            "one": "a",
            "two": "b"
            "three": "ac",
            }
         */

		this.current_test_name = 'Test 4 | a, ac, and b';
		const interweavingStrings = new this.Problem();
		const solution = interweavingStrings.solve('a', 'b', 'ac');
		assert.equal(solution, false);
	}

	test_5() {
		/**
         * true
            View Outputs Side By Side
            Input(s)
            {
            "one": "abc",
            "two": "def"
            "three": "abcdef",
            }
         */

		this.current_test_name = 'Test 5 | abc, abcdef, and def';
		const interweavingStrings = new this.Problem();
		const solution = interweavingStrings.solve('abc', 'def', 'abcdef');
		assert.equal(solution, true);
	}

	test_6() {
		/**
         * true
            View Outputs Side By Side
            Input(s)
            {
            "one": "abc",
            "two": "def"
            "three": "adbecf",
            }
         */

		this.current_test_name = 'Test 6 | abc, adbecf, and def';
		const interweavingStrings = new this.Problem();
		const solution = interweavingStrings.solve('abc', 'def', 'adbecf');
		assert.equal(solution, true);
	}

	test_7() {
		/**
         * true
            View Outputs Side By Side
            Input(s)
            {
            "one": "abc",
            "two": "def"
            "three": "deabcf",
            }
         */

		this.current_test_name = 'Test 7 | abc, def and deabcf => true';
		const interweavingStrings = new this.Problem();
		const solution = interweavingStrings.solve('abc', 'def', 'deabcf');
		assert.equal(solution, true);
	}

	test_8() {
		/**
         * true
            View Outputs Side By Side
            Input(s)
            {
            "one": "aabcc",
            "two": "dbbca"
            "three": "aadbbcbcac",
            }
         */

		this.current_test_name = 'Test 8 | aabcc, dbbca and aadbbcbcac => true';
		const interweavingStrings = new this.Problem();

		const solution = interweavingStrings.solve(
			'aabcc',
			'dbbca',
			'aadbbcbcac'
		);
		assert.equal(solution, true);
	}

	test_9() {
		/**
         * false
         View Outputs Side By Side
         Input(s)
         {
         "one": "aabcc",
         "three": "aadbbbaccc",
         "two": "dbbca"
         } */

		this.current_test_name =
			'Test 9 | aabcc, dbbca and aadbbbaccc => false';
		const interweavingStrings = new this.Problem();
		const solution = interweavingStrings.solve(
			'aabcc',
			'dbbca',
			'aadbbbaccc'
		);
		assert.equal(solution, false);
	}

	test_10() {
		/**
         * true
            View Outputs Side By Side
            Input(s)
            {
            "one": "algoexpert",
            "three": "ayloguore-xdpreeratm-job",
            "two": "your-dream-job"
            }
         */

		this.current_test_name =
			'Test 10 | algoexpert, your-dream-job and ayloguore-xdpreeratm-job => true';
		const interweavingStrings = new this.Problem();
		const solution = interweavingStrings.solve(
			'algoexpert',
			'your-dream-job',
			'ayloguore-xdpreeratm-job'
		);
		assert.equal(solution, true);
	}

	test_11() {
		/**
         * false
            View Outputs Side By Side
            Input(s)
            {
            "one": "aaaaaaa",
            "two": "aaaabaaa"
            "three": "aaaaaaaaaaaaaab",
            }
         */

		this.current_test_name =
			'Test 11 | aaaaaaa, aaaabaaa and aaaaaaaaaaaaaab => false';
		const interweavingStrings = new this.Problem();
		const solution = interweavingStrings.solve(
			'aaaaaaa',
			'aaaabaaa',
			'aaaaaaaaaaaaaab'
		);
		assert.equal(solution, false);
	}

	test_12() {
		/**
         * true
            View Outputs Side By Side
            Input(s)
            {
            "one": "aaaaaaa",
            "two": "aaaaaaa"
            "three": "aaaaaaaaaaaaaa",
            }
         */

		this.current_test_name =
			'Test 12 | aaaaaaa, aaaaaaa and aaaaaaaaaaaaaa => true';
		const interweavingStrings = new this.Problem();
		const solution = interweavingStrings.solve(
			'aaaaaaa',
			'aaaaaaa',
			'aaaaaaaaaaaaaa'
		);
		assert.equal(solution, true);
	}

	test_13() {
		/**
         * true
        View Outputs Side By Side
        Input(s)
        {
        "one": "aacaaaa",
        "two": "aaabaaa"
        "three": "aaaabacaaaaaaa",
        }
         */

		this.current_test_name =
			'Test 13 | aacaaaa, aaabaaa and aaaabacaaaaaaa => true';
		const interweavingStrings = new this.Problem();
		const solution = interweavingStrings.solve(
			'aacaaaa',
			'aaabaaa',
			'aaaabacaaaaaaa'
		);
		assert.equal(solution, true);
	}

	test_14() {
		/**
         * true
            View Outputs Side By Side
            Input(s)
            {
            "one": "aacaaaa",
            "three": "aaaacabaaaaaaa",
            "two": "aaabaaa"
            }
         */

		this.current_test_name =
			'Test 14 | aacaaaa, aaabaaa and aaaacabaaaaaaa => true';
		const interweavingStrings = new this.Problem();
		const solution = interweavingStrings.solve(
			'aacaaaa',
			'aaabaaa',
			'aaaacabaaaaaaa'
		);
		assert.equal(solution, true);
	}

	test_15() {
		/**
         * false
            View Outputs Side By Side
            Input(s)
            {
            "one": "aacaaaa",
            "three": "aaaaaacbaaaaaa",
            "two": "aaabaaa"
            }
         */

		this.current_test_name =
			'Test 15 | aacaaaa, aaabaaa and aaaaaacbaaaaaa => false';
		const interweavingStrings = new this.Problem();
		const solution = interweavingStrings.solve(
			'aacaaaa',
			'aaabaaa',
			'aaaaaacbaaaaaa'
		);
		assert.equal(solution, false);
	}

	test_16() {
		/**
         * false
            View Outputs Side By Side
            Input(s)
            {
            "one": "algoexpert",
            "three": "1your-algodream-expertjob",
            "two": "your-dream-job"
            }
         */

		this.current_test_name =
			'Test 16 | algoexpert, your-dream-job and 1your-algodream-expertjob => false';
		const interweavingStrings = new this.Problem();
		const solution = interweavingStrings.solve(
			'algoexpert',
			'your-dream-job',
			'1your-algodream-expertjob'
		);
		assert.equal(solution, false);
	}

	test_17() {
		/**
         * false
            View Outputs Side By Side
            Input(s)
            {
            "one": "algoexpert",
            "three": "your-algodream-expertjob1",
            "two": "your-dream-job"
            }
         */

		this.current_test_name =
			'Test 17 | algoexpert, your-dream-job and your-algodream-expertjob1 => false';
		const interweavingStrings = new this.Problem();
		const solution = interweavingStrings.solve(
			'algoexpert',
			'your-dream-job',
			'your-algodream-expertjob1'
		);
		assert.equal(solution, false);
	}

	test_18() {
		/**
         * false
            View Outputs Side By Side
            Input(s)
            {
            "one": "algoexpert",
            "three": "your-algodream-expertjo",
            "two": "your-dream-job"
            }
         */

		this.current_test_name =
			'Test 18 | algoexpert, your-dream-job and your-algodream-expertjo => false';
		const interweavingStrings = new this.Problem();
		const solution = interweavingStrings.solve(
			'algoexpert',
			'your-dream-job',
			'your-algodream-expertjo'
		);
		assert.equal(solution, false);
	}

	test_19() {
		/**
         * false
            View Outputs Side By Side
            Input(s)
            {
            "one": "ae",
            "two": "e"
            "three": "see",
            }
         */

		this.current_test_name = 'Test 19 | ae, e and see => false';
		const interweavingStrings = new this.Problem();
		const solution = interweavingStrings.solve('ae', 'e', 'see');
		assert.equal(solution, false);
	}

	test_20() {
		/**
         * true
            View Outputs Side By Side
            Input(s)
            {
            "one": "algo",
            "three": "fralgogo",
            "two": "frog"
            }
         */

		this.current_test_name = 'Test 20 | algo, frog and fralgogo => true';
		const interweavingStrings = new this.Problem();
		const solution = interweavingStrings.solve('algo', 'frog', 'fralgogo');
		assert.equal(solution, true);
	}
}

class solveSudoku extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
		this.tests.push(() => this.test_4());
	}

	test_1() {
		/**
           [7, 8, 0, 4, 0, 0, 1, 2, 0],
            [6, 0, 0, 0, 7, 5, 0, 0, 9],
            [0, 0, 0, 6, 0, 1, 0, 7, 8],
            [0, 0, 7, 0, 4, 0, 2, 6, 0],
            [0, 0, 1, 0, 5, 0, 9, 3, 0],
            [9, 0, 4, 0, 6, 0, 0, 0, 5],
            [0, 7, 0, 3, 0, 0, 0, 1, 2],
            [1, 2, 0, 0, 0, 7, 4, 0, 0],
            [0, 4, 9, 2, 0, 6, 0, 0, 7]
            ]
            Our Code's Output
            [
            [7, 8, 5, 4, 3, 9, 1, 2, 6],
            [6, 1, 2, 8, 7, 5, 3, 4, 9],
            [4, 9, 3, 6, 2, 1, 5, 7, 8],
            [8, 5, 7, 9, 4, 3, 2, 6, 1],
            [2, 6, 1, 7, 5, 8, 9, 3, 4],
            [9, 3, 4, 1, 6, 2, 7, 8, 5],
            [5, 7, 8, 3, 9, 4, 6, 1, 2],
            [1, 2, 6, 5, 8, 7, 4, 9, 3],
            [3, 4, 9, 2, 1, 6, 8, 5, 7]
            ]
         */

		this.current_test_name = 'Test 1 | 9x9 Sudoku';
		const sudoku = new this.Problem();
		const board = [
			[7, 8, 0, 4, 0, 0, 1, 2, 0],
			[6, 0, 0, 0, 7, 5, 0, 0, 9],
			[0, 0, 0, 6, 0, 1, 0, 7, 8],
			[0, 0, 7, 0, 4, 0, 2, 6, 0],
			[0, 0, 1, 0, 5, 0, 9, 3, 0],
			[9, 0, 4, 0, 6, 0, 0, 0, 5],
			[0, 7, 0, 3, 0, 0, 0, 1, 2],
			[1, 2, 0, 0, 0, 7, 4, 0, 0],
			[0, 4, 9, 2, 0, 6, 0, 0, 7]
		];

		const solution = sudoku.solve(board);
		assert.deepEqual(solution, [
			[7, 8, 5, 4, 3, 9, 1, 2, 6],
			[6, 1, 2, 8, 7, 5, 3, 4, 9],
			[4, 9, 3, 6, 2, 1, 5, 7, 8],
			[8, 5, 7, 9, 4, 3, 2, 6, 1],
			[2, 6, 1, 7, 5, 8, 9, 3, 4],
			[9, 3, 4, 1, 6, 2, 7, 8, 5],
			[5, 7, 8, 3, 9, 4, 6, 1, 2],
			[1, 2, 6, 5, 8, 7, 4, 9, 3],
			[3, 4, 9, 2, 1, 6, 8, 5, 7]
		]);
	}

	test_2() {
		/**
         * Expected Output
            [
            [1, 8, 5, 7, 3, 6, 2, 4, 9],
            [3, 4, 6, 5, 2, 9, 1, 7, 8],
            [2, 9, 7, 4, 8, 1, 6, 5, 3],
            [5, 7, 8, 2, 9, 3, 4, 1, 6],
            [9, 3, 2, 1, 6, 4, 7, 8, 5],
            [6, 1, 4, 8, 5, 7, 9, 3, 2],
            [4, 6, 3, 9, 1, 8, 5, 2, 7],
            [7, 2, 9, 3, 4, 5, 8, 6, 1],
            [8, 5, 1, 6, 7, 2, 3, 9, 4]
            ]
            Our Code's Output
            [
            [1, 8, 5, 7, 3, 6, 2, 4, 9],
            [3, 4, 6, 5, 2, 9, 1, 7, 8],
            [2, 9, 7, 4, 8, 1, 6, 5, 3],
            [5, 7, 8, 2, 9, 3, 4, 1, 6],
            [9, 3, 2, 1, 6, 4, 7, 8, 5],
            [6, 1, 4, 8, 5, 7, 9, 3, 2],
            [4, 6, 3, 9, 1, 8, 5, 2, 7],
            [7, 2, 9, 3, 4, 5, 8, 6, 1],
            [8, 5, 1, 6, 7, 2, 3, 9, 4]
            ]
         */

		this.current_test_name = 'Test 2 | 9x9 Sudoku';
		const sudoku = new this.Problem();
		const board = [
			[0, 8, 5, 7, 3, 6, 2, 4, 0],
			[3, 4, 6, 5, 2, 9, 1, 7, 8],
			[2, 9, 7, 4, 8, 1, 6, 5, 3],
			[5, 7, 8, 2, 9, 3, 4, 1, 6],
			[9, 3, 2, 1, 6, 4, 7, 8, 5],
			[6, 1, 4, 8, 5, 7, 9, 3, 2],
			[4, 6, 3, 9, 1, 8, 5, 2, 7],
			[7, 2, 9, 3, 4, 5, 8, 6, 1],
			[8, 5, 1, 6, 7, 2, 3, 9, 4]
		];

		const solution = sudoku.solve(board);
		assert.deepEqual(solution, [
			[1, 8, 5, 7, 3, 6, 2, 4, 9],
			[3, 4, 6, 5, 2, 9, 1, 7, 8],
			[2, 9, 7, 4, 8, 1, 6, 5, 3],
			[5, 7, 8, 2, 9, 3, 4, 1, 6],
			[9, 3, 2, 1, 6, 4, 7, 8, 5],
			[6, 1, 4, 8, 5, 7, 9, 3, 2],
			[4, 6, 3, 9, 1, 8, 5, 2, 7],
			[7, 2, 9, 3, 4, 5, 8, 6, 1],
			[8, 5, 1, 6, 7, 2, 3, 9, 4]
		]);
	}

	test_3() {
		/**
         * [
            [5, 3, 8, 0, 1, 0, 0, 0, 0],
    [0, 7, 9, 6, 0, 0, 0, 0, 0],
    [0, 0, 4, 0, 0, 2, 0, 0, 0],
    [0, 0, 7, 0, 2, 3, 4, 0, 0],
    [0, 0, 5, 0, 8, 0, 0, 0, 9],
    [4, 6, 0, 0, 9, 0, 0, 0, 1],
    [0, 9, 0, 2, 3, 4, 1, 5, 0],
    [0, 4, 1, 5, 0, 0, 2, 0, 0],
    [0, 0, 0, 8, 6, 1, 0, 3, 0]
            ]
            Our Code's Output
            [
            [5, 3, 8, 9, 1, 7, 6, 4, 2],
            [2, 7, 9, 6, 4, 8, 5, 1, 3],
            [6, 1, 4, 3, 5, 2, 7, 9, 8],
            [9, 8, 7, 1, 2, 3, 4, 6, 5],
            [1, 2, 5, 4, 8, 6, 3, 7, 9],
            [4, 6, 3, 7, 9, 5, 8, 2, 1],
            [8, 9, 6, 2, 3, 4, 1, 5, 7],
            [3, 4, 1, 5, 7, 9, 2, 8, 6],
            [7, 5, 2, 8, 6, 1, 9, 3, 4]
            ]

         */

		this.current_test_name = 'Test 3 | 9x9 Sudoku';
		const sudoku = new this.Problem();
		const board = [
			[5, 3, 8, 0, 1, 0, 0, 0, 0],
			[0, 7, 9, 6, 0, 0, 0, 0, 0],
			[0, 0, 4, 0, 0, 2, 0, 0, 0],
			[0, 0, 7, 0, 2, 3, 4, 0, 0],
			[0, 0, 5, 0, 8, 0, 0, 0, 9],
			[4, 6, 0, 0, 9, 0, 0, 0, 1],
			[0, 9, 0, 2, 3, 4, 1, 5, 0],
			[0, 4, 1, 5, 0, 0, 2, 0, 0],
			[0, 0, 0, 8, 6, 1, 0, 3, 0]
		];

		const solution = sudoku.solve(board);
		assert.deepEqual(solution, [
			[5, 3, 8, 9, 1, 7, 6, 4, 2],
			[2, 7, 9, 6, 4, 8, 5, 1, 3],
			[6, 1, 4, 3, 5, 2, 7, 9, 8],
			[9, 8, 7, 1, 2, 3, 4, 6, 5],
			[1, 2, 5, 4, 8, 6, 3, 7, 9],
			[4, 6, 3, 7, 9, 5, 8, 2, 1],
			[8, 9, 6, 2, 3, 4, 1, 5, 7],
			[3, 4, 1, 5, 7, 9, 2, 8, 6],
			[7, 5, 2, 8, 6, 1, 9, 3, 4]
		]);
	}

	test_4() {
		/**
         * Our Code's Output
        [
          [5, 2, 4, 3, 9, 6, 1, 7, 8],
          [3, 6, 7, 8, 4, 1, 9, 5, 2],
          [1, 8, 9, 7, 5, 2, 3, 6, 4],
          [2, 5, 1, 9, 7, 4, 8, 3, 6],
          [9, 4, 3, 6, 8, 5, 2, 1, 7],
          [8, 7, 6, 2, 1, 3, 5, 4, 9],
          [6, 1, 5, 4, 2, 8, 7, 9, 3],
          [7, 3, 2, 1, 6, 9, 4, 8, 5],
          [4, 9, 8, 5, 3, 7, 6, 2, 1]
        ]
        View Outputs Side By Side
        Input(s)
        {
          "board": [
            [0, 2, 0, 0, 9, 0, 1, 0, 0],
            [0, 0, 7, 8, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 3, 6, 0],
            [0, 0, 1, 9, 0, 4, 0, 0, 0],
            [0, 0, 0, 6, 0, 5, 0, 0, 7],
            [8, 0, 0, 0, 0, 0, 0, 0, 9],
            [0, 0, 0, 0, 2, 0, 0, 0, 0],
            [7, 0, 0, 0, 0, 0, 0, 8, 5],
            [4, 9, 0, 0, 3, 0, 0, 0, 0]
          ]
        }
        
         */

		this.current_test_name = 'Test 4 | 9x9 Sudoku';
		const sudoku = new this.Problem();
		const board = [
			[0, 2, 0, 0, 9, 0, 1, 0, 0],
			[0, 0, 7, 8, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 3, 6, 0],
			[0, 0, 1, 9, 0, 4, 0, 0, 0],
			[0, 0, 0, 6, 0, 5, 0, 0, 7],
			[8, 0, 0, 0, 0, 0, 0, 0, 9],
			[0, 0, 0, 0, 2, 0, 0, 0, 0],
			[7, 0, 0, 0, 0, 0, 0, 8, 5],
			[4, 9, 0, 0, 3, 0, 0, 0, 0]
		];

		const solution = sudoku.solve(board);
		assert.deepEqual(solution, [
			[5, 2, 4, 3, 9, 6, 1, 7, 8],
			[3, 6, 7, 8, 4, 1, 9, 5, 2],
			[1, 8, 9, 7, 5, 2, 3, 6, 4],
			[2, 5, 1, 9, 7, 4, 8, 3, 6],
			[9, 4, 3, 6, 8, 5, 2, 1, 7],
			[8, 7, 6, 2, 1, 3, 5, 4, 9],
			[6, 1, 5, 4, 2, 8, 7, 9, 3],
			[7, 3, 2, 1, 6, 9, 4, 8, 5],
			[4, 9, 8, 5, 3, 7, 6, 2, 1]
		]);
	}
}

class GenerateDivTags extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
		this.tests.push(() => this.test_4());
	}

	test_1() {
		/**
         * Our Code's Output
            ["<div><div><div></div></div></div>", "<div><div></div><div></div></div>", "<div><div></div></div><div></div>", "<div></div><div><div></div></div>", "<div></div><div></div><div></div>"]
            View Outputs Side By Side
            Input(s)
            {
            "numberOfTags": 3
            }
         */

		this.current_test_name = 'Test 1 | 3 div tags';
		const generateDivTags = new this.Problem();
		const solution = generateDivTags.solve(3);

		assert.deepEqual(solution, [
			'<div><div><div></div></div></div>',
			'<div><div></div><div></div></div>',
			'<div><div></div></div><div></div>',
			'<div></div><div><div></div></div>',
			'<div></div><div></div><div></div>'
		]);
	}

	test_2() {
		/**
         * Our Code's Output
        ["<div><div></div></div>", "<div></div><div></div>"]
        View Outputs Side By Side
        Input(s)
        {
        "numberOfTags": 2
        }
         */

		this.current_test_name = 'Test 2 | 2 div tags';
		const generateDivTags = new this.Problem();
		const solution = generateDivTags.solve(2);

		assert.deepEqual(solution, [
			'<div><div></div></div>',
			'<div></div><div></div>'
		]);
	}

	test_3() {
		/**
         * ["<div></div>"]
            View Outputs Side By Side
            Input(s)
            {
            "numberOfTags": 1
            }
         */

		this.current_test_name = 'Test 3 | 1 div tag';
		const generateDivTags = new this.Problem();
		const solution = generateDivTags.solve(1);

		assert.deepEqual(solution, ['<div></div>']);
	}

	test_4() {
		/**
         * ["<div><div><div><div></div></div></div></div>", "<div><div><div></div><div></div></div></div>", "<div><div><div></div></div><div></div></div>", "<div><div><div></div></div></div><div></div>", "<div><div></div><div><div></div></div></div>", "<div><div></div><div></div><div></div></div>", "<div><div></div><div></div></div><div></div>", "<div><div></div></div><div><div></div></div>", "<div><div></div></div><div></div><div></div>", "<div></div><div><div><div></div></div></div>", "<div></div><div><div></div><div></div></div>", "<div></div><div><div></div></div><div></div>", "<div></div><div></div><div><div></div></div>", "<div></div><div></div><div></div><div></div>"]
            View Outputs Side By Side
            Input(s)
            {
            "numberOfTags": 4
            }
         */

		this.current_test_name = 'Test 4 | 4 div tags';
		const generateDivTags = new this.Problem();
		const solution = generateDivTags.solve(4);

		assert.deepEqual(solution, [
			'<div><div><div><div></div></div></div></div>',
			'<div><div><div></div><div></div></div></div>',
			'<div><div><div></div></div><div></div></div>',
			'<div><div><div></div></div></div><div></div>',
			'<div><div></div><div><div></div></div></div>',
			'<div><div></div><div></div><div></div></div>',
			'<div><div></div><div></div></div><div></div>',
			'<div><div></div></div><div><div></div></div>',
			'<div><div></div></div><div></div><div></div>',
			'<div></div><div><div><div></div></div></div>',
			'<div></div><div><div></div><div></div></div>',
			'<div></div><div><div></div></div><div></div>',
			'<div></div><div></div><div><div></div></div>',
			'<div></div><div></div><div></div><div></div>'
		]);
	}
}

class AmbiguousMeasurements extends ProblemTests {
	constructor(Problem) {
		super(Problem);

		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
		this.tests.push(() => this.test_4());
		this.tests.push(() => this.test_5());
		this.tests.push(() => this.test_6());
		this.tests.push(() => this.test_7());
		this.tests.push(() => this.test_8());
		this.tests.push(() => this.test_9());
		this.tests.push(() => this.test_10());
		this.tests.push(() => this.test_11());
		this.tests.push(() => this.test_12());
		this.tests.push(() => this.test_13());
		this.tests.push(() => this.test_14());
		this.tests.push(() => this.test_15());
	}

	test_1() {
		/**
         * Our Code's Output
            true
            View Outputs Side By Side
            Input(s)
            {
            "high": 2300,
            "low": 2100,
            "measuringCups": [
                [200, 210],
                [450, 465],
                [800, 850]
            ]
            }
         */

		this.current_test_name =
			'Test 1 | 2300, 2100 and [[200, 210], [450, 465], [800, 850]] => true';
		const ambiguousMeasurements = new this.Problem();
		const solution = ambiguousMeasurements.solve(2300, 2100, [
			[200, 210],
			[450, 465],
			[800, 850]
		]);

		assert.equal(solution, true);
	}

	test_2() {
		/**
         * Our Code's Output
            false
            View Outputs Side By Side
            Input(s)
            {
            "high": 20,
            "low": 10,
            "measuringCups": [
                [200, 210]
            ]
            }
         */

		this.current_test_name = 'Test 2 | 20, 10 and [[200, 210]] => false';
		const ambiguousMeasurements = new this.Problem();
		const solution = ambiguousMeasurements.solve(20, 10, [[200, 210]]);

		assert.equal(solution, false);
	}

	test_3() {
		/**
         * Our Code's Output
            true
            View Outputs Side By Side
            Input(s)
            {
            "high": 2300,
            "low": 2100,
            "measuringCups": [
                [230, 240],
                [290, 310],
                [500, 515]
            ]
            }
         */

		this.current_test_name =
			'Test 3 | 2300, 2100 and [[230, 240], [290, 310], [500, 515]] => true';
		const ambiguousMeasurements = new this.Problem();
		const solution = ambiguousMeasurements.solve(2300, 2100, [
			[230, 240],
			[290, 310],
			[500, 515]
		]);

		assert.equal(solution, true);
	}

	test_4() {
		/**
         * false
            View Outputs Side By Side
            Input(s)
            {
            "high": 101,
            "low": 100,
            "measuringCups": [
                [1, 3],
                [2, 4],
                [5, 6]
            ]
            }
         */

		this.current_test_name =
			'Test 4 | 101, 100 and [[1, 3], [2, 4], [5, 6]] => false';
		const ambiguousMeasurements = new this.Problem();
		const solution = ambiguousMeasurements.solve(101, 100, [
			[1, 3],
			[2, 4],
			[5, 6]
		]);

		assert.equal(solution, false);
	}

	test_5() {
		/**
         * true
            View Outputs Side By Side
            Input(s)
            {
            "high": 120,
            "low": 100,
            "measuringCups": [
                [1, 3],
                [2, 4],
                [5, 6]
            ]
            }
         */

		this.current_test_name =
			'Test 5 | 120, 100 and [[1, 3], [2, 4], [5, 6]] => true';
		const ambiguousMeasurements = new this.Problem();
		const solution = ambiguousMeasurements.solve(120, 100, [
			[1, 3],
			[2, 4],
			[5, 6]
		]);

		assert.equal(solution, true);
	}

	test_6() {
		/**true
        View Outputs Side By Side
        Input(s)
        {
        "high": 120,
        "low": 100,
        "measuringCups": [
            [1, 3],
            [2, 4],
            [5, 6]
        ]
        } */

		this.current_test_name =
			'Test 6 | 120, 100 and [[1, 3], [2, 4], [5, 6]] => true';
		const ambiguousMeasurements = new this.Problem();
		const solution = ambiguousMeasurements.solve(120, 100, [
			[1, 3],
			[2, 4],
			[5, 6]
		]);
		assert.equal(solution, true);
	}

	test_7() {
		/**
         * true
        View Outputs Side By Side
        Input(s)
        {
        "high": 12,
        "low": 10,
        "measuringCups": [
            [1, 3],
            [2, 4],
            [5, 6],
            [10, 20]
        ]
        }
         */

		this.current_test_name =
			'Test 7 | 12, 10 and [[1, 3], [2, 4], [5, 6], [10, 20]] => true';
		const ambiguousMeasurements = new this.Problem();
		const solution = ambiguousMeasurements.solve(12, 10, [
			[1, 3],
			[2, 4],
			[5, 6],
			[10, 20]
		]);
		assert.equal(solution, true);
	}

	test_8() {
		/**
         * false
        View Outputs Side By Side
        Input(s)
        {
        "high": 1050,
        "low": 1000,
        "measuringCups": [
            [50, 60],
            [100, 120],
            [20, 40],
            [10, 15],
            [400, 500]
        ]
        }
         */

		this.current_test_name =
			'Test 8 | 1050, 1000 and [[50, 60], [100, 120], [20, 40], [10, 15], [400, 500]] => false';
		const ambiguousMeasurements = new this.Problem();
		const solution = ambiguousMeasurements.solve(1050, 1000, [
			[50, 60],
			[100, 120],
			[20, 40],
			[10, 15],
			[400, 500]
		]);
		assert.equal(solution, false);
	}

	test_9() {
		/**
         * true
            View Outputs Side By Side
            Input(s)
            {
            "high": 1200,
            "low": 1000,
            "measuringCups": [
                [50, 65],
                [100, 120],
                [20, 40],
                [10, 15],
                [400, 500]
            ]
            }
         */

		this.current_test_name =
			'Test 9 | 1200, 1000 and [[50, 65], [100, 120], [20, 40], [10, 15], [400, 500]] => true';
		const ambiguousMeasurements = new this.Problem();
		const solution = ambiguousMeasurements.solve(1200, 1000, [
			[50, 65],
			[100, 120],
			[20, 40],
			[10, 15],
			[400, 500]
		]);
		assert.equal(solution, true);
	}

	test_10() {
		/**
         * false
            View Outputs Side By Side
            Input(s)
            {
            "high": 3300,
            "low": 3000,
            "measuringCups": [
                [50, 65],
                [100, 120],
                [20, 40],
                [10, 15],
                [400, 500],
                [300, 350],
                [10, 25]
            ]
            }
         */

		this.current_test_name =
			'Test 10 | 3300, 3000 and [[50, 65], [100, 120], [20, 40], [10, 15], [400, 500], [300, 350], [10, 25]] => false';
		const ambiguousMeasurements = new this.Problem();
		const solution = ambiguousMeasurements.solve(3300, 3000, [
			[50, 65],
			[100, 120],
			[20, 40],
			[10, 15],
			[400, 500],
			[300, 350],
			[10, 25]
		]);
		assert.equal(solution, false);
	}

	test_11() {
		/**
         * false
        View Outputs Side By Side
        Input(s)
        {
        "high": 1050,
        "low": 1000,
        "measuringCups": [
            [50, 60],
            [100, 120],
            [20, 40],
            [400, 500]
        ]
        }
         */

		this.current_test_name =
			'Test 11 | 1050, 1000 and [[50, 60], [100, 120], [20, 40], [400, 500]] => false';
		const ambiguousMeasurements = new this.Problem();
		const solution = ambiguousMeasurements.solve(1050, 1000, [
			[50, 60],
			[100, 120],
			[20, 40],
			[400, 500]
		]);
		assert.equal(solution, false);
	}

	test_12() {
		/**
         * false
            View Outputs Side By Side
            Input(s)
            {
            "high": 200,
            "low": 200,
            "measuringCups": [
                [50, 65]
            ]
            }
         */

		this.current_test_name = 'Test 12 | 200, 200 and [[50, 65]] => false';
		const ambiguousMeasurements = new this.Problem();

		const solution = ambiguousMeasurements.solve(200, 200, [[50, 65]]);
		assert.equal(solution, false);
	}

	test_13() {
		/**
         * true
        View Outputs Side By Side
        Input(s)
        {
        "high": 200,
        "low": 200,
        "measuringCups": [
            [50, 50]
        ]
        }
         */

		this.current_test_name = 'Test 13 | 200, 200 and [[50, 50]] => true';
		const ambiguousMeasurements = new this.Problem();
		const solution = ambiguousMeasurements.solve(200, 200, [[50, 50]]);
		assert.equal(solution, true);
	}

	test_14() {
		/**
         * true
        View Outputs Side By Side
        Input(s)
        {
        "high": 200,
        "low": 200,
        "measuringCups": [
            [50, 50],
            [50, 51]
        ]
        }
         */

		this.current_test_name =
			'Test 14 | 200, 200 and [[50, 50], [50, 51]] => true';
		const ambiguousMeasurements = new this.Problem();
		const solution = ambiguousMeasurements.solve(200, 200, [
			[50, 50],
			[50, 51]
		]);
		assert.equal(solution, true);
	}

	test_15() {
		/**
         * true
            View Outputs Side By Side
            Input(s)
            {
            "high": 1000,
            "low": 0,
            "measuringCups": [
                [100, 150],
                [1000, 2000]
            ]
            }
         */

		this.current_test_name =
			'Test 15 | 1000, 0 and [[100, 150], [1000, 2000]] => true';
		const ambiguousMeasurements = new this.Problem();
		const solution = ambiguousMeasurements.solve(1000, 0, [
			[100, 150],
			[1000, 2000]
		]);
		assert.equal(solution, true);
	}
}

class ShiftedBinarySearch extends ProblemTests {
	constructor(Problem) {
		super(Problem);

		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
		this.tests.push(() => this.test_4());
		this.tests.push(() => this.test_5());
		this.tests.push(() => this.test_6());
		this.tests.push(() => this.test_7());
		this.tests.push(() => this.test_8());
		this.tests.push(() => this.test_9());
		this.tests.push(() => this.test_10());
		this.tests.push(() => this.test_11());
		this.tests.push(() => this.test_12());
		this.tests.push(() => this.test_13());
		this.tests.push(() => this.test_14());
		this.tests.push(() => this.test_15());
		this.tests.push(() => this.test_16());
	}

	test_1() {
		/**
         * Our Code's Output
            8
            View Outputs Side By Side
            Input(s)
            {
            "array": [45, 61, 71, 72, 73, 0, 1, 21, 33, 37],
            "target": 33
            }
         */

		this.current_test_name =
			'Test 1 | [45, 61, 71, 72, 73, 0, 1, 21, 33, 37] and 33 => 8';
		const shiftedBinarySearch = new this.Problem();
		const solution = shiftedBinarySearch.solve(
			[45, 61, 71, 72, 73, 0, 1, 21, 33, 37],
			33
		);
		assert.equal(solution, 8);
	}

	test_2() {
		/**
         * Our Code's Output
            2
            View Outputs Side By Side
            Input(s)
            {
            "array": [5, 23, 111, 1],
            "target": 111
            }
         */

		this.current_test_name = 'Test 2 | [5, 23, 111, 1] and 111 => 2';
		const shiftedBinarySearch = new this.Problem();
		const solution = shiftedBinarySearch.solve([5, 23, 111, 1], 111);
		assert.equal(solution, 2);
	}

	test_3() {
		/**
         * 2
            View Outputs Side By Side
            Input(s)
            {
            "array": [111, 1, 5, 23],
            "target": 5
            }
         */

		this.current_test_name = 'Test 3 | [111, 1, 5, 23] and 5 => 2';
		const shiftedBinarySearch = new this.Problem();
		const solution = shiftedBinarySearch.solve([111, 1, 5, 23], 5);
	}

	test_4() {
		/**
         * Our Code's Output
            -1
            View Outputs Side By Side
            Input(s)
            {
            "array": [23, 111, 1, 5],
            "target": 35
            }
         */

		this.current_test_name = 'Test 4 | [23, 111, 1, 5] and 35 => -1';
		const shiftedBinarySearch = new this.Problem();
		const solution = shiftedBinarySearch.solve([23, 111, 1, 5], 35);
		assert.equal(solution, -1);
	}

	test_5() {
		/**
         * Our Code's Output
            7
            View Outputs Side By Side
            Input(s)
            {
            "array": [61, 71, 72, 73, 0, 1, 21, 33, 37, 45],
            "target": 33
            }
         */

		this.current_test_name =
			'Test 5 | [61, 71, 72, 73, 0, 1, 21, 33, 37, 45] and 33 => 7';
		const shiftedBinarySearch = new this.Problem();
		const solution = shiftedBinarySearch.solve(
			[61, 71, 72, 73, 0, 1, 21, 33, 37, 45],
			33
		);
		assert.equal(solution, 7);
	}

	test_6() {
		/**
         * Our Code's Output
            0
            View Outputs Side By Side
            Input(s)
            {
            "array": [72, 73, 0, 1, 21, 33, 37, 45, 61, 71],
            "target": 72
            }
         */

		this.current_test_name =
			'Test 6 | [72, 73, 0, 1, 21, 33, 37, 45, 61, 71] and 72 => 0';
		const shiftedBinarySearch = new this.Problem();
		const solution = shiftedBinarySearch.solve(
			[72, 73, 0, 1, 21, 33, 37, 45, 61, 71],
			72
		);
		assert.equal(solution, 0);
	}

	test_7() {
		/**
         * 
        View Outputs Side By Side
        Input(s)
        {
        "array": [71, 72, 73, 0, 1, 21, 33, 37, 45, 61],
        "target": 73
        }
         */

		this.current_test_name =
			'Test 7 | [71, 72, 73, 0, 1, 21, 33, 37, 45, 61] and 73 => 2';
		const shiftedBinarySearch = new this.Problem();
		const solution = shiftedBinarySearch.solve(
			[71, 72, 73, 0, 1, 21, 33, 37, 45, 61],
			73
		);
		assert.equal(solution, 2);
	}

	test_8() {
		/**
         * Our Code's Output
            -1
            View Outputs Side By Side
            Input(s)
            {
            "array": [73, 0, 1, 21, 33, 37, 45, 61, 71, 72],
            "target": 70
            }
         */

		this.current_test_name =
			'Test 8 | [73, 0, 1, 21, 33, 37, 45, 61, 71, 72] and 70 => -1';
		const shiftedBinarySearch = new this.Problem();
		const solution = shiftedBinarySearch.solve(
			[73, 0, 1, 21, 33, 37, 45, 61, 71, 72],
			70
		);
		assert.equal(solution, -1);
	}

	test_9() {
		/**
         * Our Code's Output
        7
        View Outputs Side By Side
        Input(s)
        {
        "array": [33, 37, 45, 61, 71, 72, 73, 355, 0, 1, 21],
        "target": 355
        }
         */

		this.current_test_name =
			'Test 9 | [33, 37, 45, 61, 71, 72, 73, 355, 0, 1, 21] and 355 => 7';
		const shiftedBinarySearch = new this.Problem();
		const solution = shiftedBinarySearch.solve(
			[33, 37, 45, 61, 71, 72, 73, 355, 0, 1, 21],
			355
		);
		assert.equal(solution, 7);
	}

	test_10() {
		/**
         * ur Code's Output
            -1
            View Outputs Side By Side
            Input(s)
            {
            "array": [33, 37, 45, 61, 71, 72, 73, 355, 0, 1, 21],
            "target": 354
            }
         */

		this.current_test_name =
			'Test 10 | [33, 37, 45, 61, 71, 72, 73, 355, 0, 1, 21] and 354 => -1';
		const shiftedBinarySearch = new this.Problem();
		const solution = shiftedBinarySearch.solve(
			[33, 37, 45, 61, 71, 72, 73, 355, 0, 1, 21],
			354
		);
		assert.equal(solution, -1);
	}

	test_11() {
		/**
         * Our Code's Output
            0
            View Outputs Side By Side
            Input(s)
            {
            "array": [45, 61, 71, 72, 73, 0, 1, 21, 33, 37],
            "target": 45
            }
        */
		this.current_test_name =
			'Test 11 | [45, 61, 71, 72, 73, 0, 1, 21, 33, 37] and 45 => 0';
		const shiftedBinarySearch = new this.Problem();
		const solution = shiftedBinarySearch.solve(
			[45, 61, 71, 72, 73, 0, 1, 21, 33, 37],
			45
		);
		assert.equal(solution, 0);
	}

	test_12() {
		/**
         * Our Code's Output
            1
            View Outputs Side By Side
            Input(s)
            {
            "array": [45, 61, 71, 72, 73, 0, 1, 21, 33, 37],
            "target": 61
            }
         */

		this.current_test_name =
			'Test 12 | [45, 61, 71, 72, 73, 0, 1, 21, 33, 37] and 61 => 1';
		const shiftedBinarySearch = new this.Problem();
		const solution = shiftedBinarySearch.solve(
			[45, 61, 71, 72, 73, 0, 1, 21, 33, 37],
			61
		);
		assert.equal(solution, 1);
	}

	test_13() {
		/**
         * Our Code's Output
            2
            View Outputs Side By Side
            Input(s)
            {
            "array": [45, 61, 71, 72, 73, 0, 1, 21, 33, 37],
            "target": 71
            }
         */

		this.current_test_name =
			'Test 13 | [45, 61, 71, 72, 73, 0, 1, 21, 33, 37] and 71 => 2';
		const shiftedBinarySearch = new this.Problem();
		const solution = shiftedBinarySearch.solve(
			[45, 61, 71, 72, 73, 0, 1, 21, 33, 37],
			71
		);
		assert.equal(solution, 2);
	}

	test_14() {
		/**
         * 3
            View Outputs Side By Side
            Input(s)
            {
            "array": [45, 61, 71, 72, 73, 0, 1, 21, 33, 37],
            "target": 72
            }
         */

		this.current_test_name =
			'Test 14 | [45, 61, 71, 72, 73, 0, 1, 21, 33, 37] and 72 => 3';
		const shiftedBinarySearch = new this.Problem();
		const solution = shiftedBinarySearch.solve(
			[45, 61, 71, 72, 73, 0, 1, 21, 33, 37],
			72
		);
		assert.equal(solution, 3);
	}

	test_15() {
		/**
         * Our Code's Output
            4
            View Outputs Side By Side
            Input(s)
            {
            "array": [45, 61, 71, 72, 73, 0, 1, 21, 33, 37],
            "target": 73
            }
         */

		this.current_test_name =
			'Test 15 | [45, 61, 71, 72, 73, 0, 1, 21, 33, 37] and 73 => 4';
		const shiftedBinarySearch = new this.Problem();
		const solution = shiftedBinarySearch.solve(
			[45, 61, 71, 72, 73, 0, 1, 21, 33, 37],
			73
		);
		assert.equal(solution, 4);
	}

	test_16() {
		/**
         * Our Code's Output
            5
            View Outputs Side By Side
            Input(s)
            {
            "array": [45, 61, 71, 72, 73, 0, 1, 21, 33, 37],
            "target": 0
            }
         */

		this.current_test_name =
			'Test 16 | [45, 61, 71, 72, 73, 0, 1, 21, 33, 37] and 0 => 5';
		const shiftedBinarySearch = new this.Problem();
		const solution = shiftedBinarySearch.solve(
			[45, 61, 71, 72, 73, 0, 1, 21, 33, 37],
			0
		);
		assert.equal(solution, 5);
	}

	test_17() {
		/**
         * 6
            View Outputs Side By Side
            Input(s)
            {
            "array": [45, 61, 71, 72, 73, 0, 1, 21, 33, 37],
            "target": 1
            }
         */

		this.current_test_name =
			'Test 17 | [45, 61, 71, 72, 73, 0, 1, 21, 33, 37] and 1 => 6';
		const shiftedBinarySearch = new this.Problem();
		const solution = shiftedBinarySearch.solve(
			[45, 61, 71, 72, 73, 0, 1, 21, 33, 37],
			1
		);
		assert.equal(solution, 6);
	}
}

const TEST_DICTIONARY = {
	'subarray-sort': SubarraySort,
	'min-rewards': MinRewards,
	'zigzag-traverse': zigzagTraverse,
	'same-bsts': SameBsts,
	'validate-three-nodes': validateThreeNodes,
	'max-path-sum': MaxPathPathSum,
	'find-nodes-distance-k': findNodesDistanceK,
	'max-sum-increasing-subsequence': maxSumIncreasingSubsequence,
	'longest-common-subsequence': LongestCommonSubsequence,
	'continuous-median': ContinuousMedianHandler,
	'min-number-of-jumps': MinNumberOfJumps,
	'multi-string-search': MultiStringSearch,
	'knapsack-problem': KnacksackProblem,
	'disk-stacking': DiskStacking,
	'numbers-in-pi': NumbersInPi,
	'maximum-sum-submatrix': MaximumSumSubmatrix,
	'maximize-expression': MaximizeExpression,
	'juice-bottling': JuiceBottling,
	'topological-sort': TopologicalSort,
	'kruskals-algorithm': KruskalsAlgorithm,
	'boggle-board': BoggleBoard,
	'laptop-rentals': LaptopRentals,
	'find-loop': FindLoop,
	'merge-linked-lists': mergeLinkedLists,
	'shift-linked-list': ShiftLinkedList,
	'lowest-common-manager': LowestCommonManager,
	'interweaving-strings': InterweavingStrings,
	'solve-sudoku': solveSudoku,
	'generate-div-tags': GenerateDivTags,
	'ambiguous-measurements': AmbiguousMeasurements,
	'shifted-binary-search': ShiftedBinarySearch
};

module.exports = TEST_DICTIONARY;
