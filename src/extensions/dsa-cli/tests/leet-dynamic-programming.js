const assert = require('assert');
const ProblemTests = require('./problem-test');

const {
	arrayToListNode,
	arrayToBinaryTree,
	TreeNode,
	binaryTreeToArray
} = require('./utils');

class NthTribonacciNumber extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const trib = new this.Problem();
		this.current_test_name = '4';
		assert.equal(trib.solve(4), 4);
	}

	test_2() {
		const trib = new this.Problem();
		this.current_test_name = '25';
		assert.equal(trib.solve(25), 1389537);
	}
}

class DeleteAndEarn extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		const del = new this.Problem();
		this.current_test_name = '[3,4,2]';
		assert.equal(del.solve([3, 4, 2]), 6);
	}

	test_2() {
		const del = new this.Problem();
		this.current_test_name = '[2,2,3,3,3,4]';
		assert.equal(del.solve([2, 2, 3, 3, 3, 4]), 9);
	}

	test_3() {
		const del = new this.Problem();
		this.current_test_name = '[1,1,1,2,4,5,5,5,6]';
		assert.equal(del.solve([1, 1, 1, 2, 4, 5, 5, 5, 6]), 18);
	}
}

class RussianDollEnvelopers extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const doll = new this.Problem();
		this.current_test_name = '[[5,4],[6,4],[6,7],[2,3]]';
		assert.equal(
			doll.solve([
				[5, 4],
				[6, 4],
				[6, 7],
				[2, 3]
			]),
			3
		);
	}

	test_2() {
		const doll = new this.Problem();
		this.current_test_name = '[[1,1],[1,1],[1,1]]';
		assert.equal(
			doll.solve([
				[1, 1],
				[1, 1],
				[1, 1]
			]),
			1
		);
	}
}

class LongestArithmeticSubsequence extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const sub = new this.Problem();
		this.current_test_name = '[3,6,9,12]';
		assert.equal(sub.solve([3, 6, 9, 12]), 4);
	}

	test_2() {
		const sub = new this.Problem();
		this.current_test_name = '[9,4,7,2,10]';
		assert.equal(sub.solve([9, 4, 7, 2, 10]), 3);
	}
}

class LongestArithmeticSubsequenceGivenDifference extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const sub = new this.Problem();
		this.current_test_name = '[1,2,3,4], 1';
		assert.equal(sub.solve([1, 2, 3, 4], 1), 4);
	}

	test_2() {
		const sub = new this.Problem();
		this.current_test_name = '[1,3,5,7], 1';
		assert.equal(sub.solve([1, 3, 5, 7], 1), 1);
	}
}

class MaximumLengthOfPairChain extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const pair = new this.Problem();
		this.current_test_name = '[[1,2], [2,3], [3,4]]';
		assert.equal(
			pair.solve([
				[1, 2],
				[2, 3],
				[3, 4]
			]),
			2
		);
	}

	test_2() {
		const pair = new this.Problem();
		this.current_test_name = '[[3,4],[2,3],[1,2]]';
		assert.equal(
			pair.solve([
				[3, 4],
				[2, 3],
				[1, 2]
			]),
			2
		);
	}
}

class NumberOfLongestIncreasingSubsequence extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const sub = new this.Problem();
		this.current_test_name = '[1,3,5,4,7]';
		assert.equal(sub.solve([1, 3, 5, 4, 7]), 2);
	}

	test_2() {
		const sub = new this.Problem();
		this.current_test_name = '[2,2,2,2,2]';
		assert.equal(sub.solve([2, 2, 2, 2, 2]), 5);
	}
}

class MinimumInsertionStepsToMakeAStringPalindrome extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		const sub = new this.Problem();
		this.current_test_name = '"zzazz"';
		assert.equal(sub.solve('zzazz'), 0);
	}

	test_2() {
		const sub = new this.Problem();
		this.current_test_name = '"mbadm"';
		assert.equal(sub.solve('mbadm'), 2);
	}

	test_3() {
		const sub = new this.Problem();
		this.current_test_name = '"leetcode"';
		assert.equal(sub.solve('leetcode'), 5);
	}
}

class UncrossedLines extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		const sub = new this.Problem();
		this.current_test_name = '[1,4,2], [1,2,4]';
		assert.equal(sub.solve([1, 4, 2], [1, 2, 4]), 2);
	}

	test_2() {
		const sub = new this.Problem();
		this.current_test_name = '[2,5,1,2,5], [10,5,2,1,5,2]';
		assert.equal(sub.solve([2, 5, 1, 2, 5], [10, 5, 2, 1, 5, 2]), 3);
	}

	test_3() {
		const sub = new this.Problem();
		this.current_test_name = '[1,3,7,1,7,5], [1,9,2,5,1]';
		assert.equal(sub.solve([1, 3, 7, 1, 7, 5], [1, 9, 2, 5, 1]), 2);
	}
}

class FindTheLongestValidObstacleCourseAtEachPosition extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		const sub = new this.Problem();
		this.current_test_name = '[1,2,3,2]';
		assert.deepEqual(sub.solve([1, 2, 3, 2]), [1, 2, 3, 3]);
	}

	test_2() {
		const sub = new this.Problem();
		this.current_test_name = '[2,2,1]';
		assert.deepEqual(sub.solve([2, 2, 1]), [1, 2, 1]);
	}

	test_3() {
		const sub = new this.Problem();
		this.current_test_name = '[3,1,5,6,4,2]';
		assert.deepEqual(sub.solve([3, 1, 5, 6, 4, 2]), [1, 1, 2, 3, 2, 2]);
	}
}

class LongestIncreasingSubsequence extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		const sub = new this.Problem();
		this.current_test_name = '[10,9,2,5,3,7,101,18]';
		assert.equal(sub.solve([10, 9, 2, 5, 3, 7, 101, 18]), 4);
	}

	test_2() {
		const sub = new this.Problem();
		this.current_test_name = '[0,1,0,3,2,3]';
		assert.equal(sub.solve([0, 1, 0, 3, 2, 3]), 4);
	}

	test_3() {
		const sub = new this.Problem();
		this.current_test_name = '[7,7,7,7,7,7,7]';
		assert.equal(sub.solve([7, 7, 7, 7, 7, 7, 7]), 1);
	}
}

class BestTimeToBuyAndSellStockWithTransactionFee extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const sub = new this.Problem();
		this.current_test_name = '[1,3,2,8,4,9], 2';
		assert.equal(sub.solve([1, 3, 2, 8, 4, 9], 2), 8);
	}

	test_2() {
		const sub = new this.Problem();
		this.current_test_name = '[1,3,7,5,10,3], 3';
		assert.equal(sub.solve([1, 3, 7, 5, 10, 3], 3), 6);
	}
}

class HouseRobberIII extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const sub = new this.Problem();
		this.current_test_name = '[3,2,3,null,3,null,1]';
		assert.equal(
			sub.solve(arrayToBinaryTree([3, 2, 3, null, 3, null, 1]), 2),
			7
		);
	}

	test_2() {
		const sub = new this.Problem();
		this.current_test_name = '[3,4,5,1,3,null,1]';
		assert.equal(
			sub.solve(arrayToBinaryTree([3, 4, 5, 1, 3, null, 1]), 2),
			9
		);
	}
}

class UniqueBinarySearchTrees extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const sub = new this.Problem();
		this.current_test_name = '3';
		assert.equal(sub.solve(3), 5);
	}

	test_2() {
		const sub = new this.Problem();
		this.current_test_name = '4';
		assert.equal(sub.solve(4), 14);
	}
}

class UniqueBinarySearchTreesII extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const sub = new this.Problem();
		this.current_test_name =
			'3 => [[1,null,2,null,3],[1,null,3,2],[2,1,3],[3,1,null,null,2],[3,2,null,1]]';

		const solves = sub.solve(3);
		const res = solves.map(row => binaryTreeToArray(row));

		assert.deepEqual(res, [
			[1, null, 2, null, 3],
			[1, null, 3, 2],
			[2, 1, 3],
			[3, 1, null, null, 2],
			[3, 2, null, 1]
		]);
	}

	test_2() {
		const sub = new this.Problem();
		this.current_test_name = '1 => [[1]]';

		const solves = sub.solve(1);
		const res = solves.map(row => binaryTreeToArray(row));

		assert.deepEqual(res, [[1]]);
	}
}

class PerfectSquare extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const sub = new this.Problem();
		this.current_test_name = '12';
		assert.equal(sub.solve(12), 3);
	}

	test_2() {
		const sub = new this.Problem();
		this.current_test_name = '13';
		assert.equal(sub.solve(13), 2);
	}
}

class OnesAndZeroes extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const sub = new this.Problem();
		this.current_test_name = '["10","0001","111001","1","0"], 5, 3';
		assert.equal(sub.solve(['10', '0001', '111001', '1', '0'], 5, 3), 4);
	}

	test_2() {
		const sub = new this.Problem();
		this.current_test_name = '["10","0","1"], 1, 1';
		assert.equal(sub.solve(['10', '0', '1'], 1, 1), 2);
	}
}

class PaintHouse extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const sub = new this.Problem();
		this.current_test_name = '[[17,2,17],[16,16,5],[14,3,19]]';
		assert.equal(
			sub.solve([
				[17, 2, 17],
				[16, 16, 5],
				[14, 3, 19]
			]),
			10
		);
	}

	test_2() {
		const sub = new this.Problem();
		this.current_test_name = '[[7,6,2]]';
		assert.equal(sub.solve([[7, 6, 2]]), 2);
	}
}

class PaintHouseII extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const sub = new this.Problem();
		this.current_test_name = '[[1,5,3],[2,9,4]]';
		assert.equal(
			sub.solve([
				[1, 5, 3],
				[2, 9, 4]
			]),
			5
		);
	}

	test_2() {
		const sub = new this.Problem();
		this.current_test_name = '[[1,3],[2,4]]';
		assert.equal(
			sub.solve([
				[1, 3],
				[2, 4]
			]),
			5
		);
	}
}

class SolvingQuestionsWithBrainPower extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const sub = new this.Problem();
		this.current_test_name = '[[3,2],[4,3],[4,4],[2,5]]';
		assert.equal(
			sub.mostPoints([
				[3, 2],
				[4, 3],
				[4, 4],
				[2, 5]
			]),
			5
		);
	}

	test_2() {
		const sub = new this.Problem();
		this.current_test_name = '[[1,1],[2,2],[3,3],[4,4],[5,5]]';
		assert.equal(
			sub.mostPoints([
				[1, 1],
				[2, 2],
				[3, 3],
				[4, 4],
				[5, 5]
			]),
			7
		);
	}
}

class CountWaysToBuildGoodStrings extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const sub = new this.Problem();
		this.current_test_name =
			'"Input: low = 3, high = 3, zero = 1, one = 1 | Output: 8';
		assert.equal(sub.solve(3, 3, 1, 1), 8);
	}

	test_2() {
		const sub = new this.Problem();
		this.current_test_name =
			'"Input: low = 2, high = 3, zero = 1, one = 2 | Output: 5';
		assert.equal(sub.solve(2, 3, 1, 2), 5);
	}
}

class MinCostTickets extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const sub = new this.Problem();
		this.current_test_name = '[1,4,6,7,8,20], [2,7,15]';
		assert.equal(sub.solve([1, 4, 6, 7, 8, 20], [2, 7, 15]), 11);
	}

	test_2() {
		const sub = new this.Problem();
		this.current_test_name = '[1,2,3,4,5,6,7,8,9,10,30,31], [2,7,15]';
		assert.equal(
			sub.solve([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 30, 31], [2, 7, 15]),
			17
		);
	}
}

class DominoAndTrominoTiling extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		const sub = new this.Problem();
		this.current_test_name = '3 => 5';
		assert.equal(sub.solve(3), 5);
	}

	test_2() {
		const sub = new this.Problem();
		this.current_test_name = '8 => 258';
		assert.equal(sub.solve(8), 258);
	}

	test_3() {
		const sub = new this.Problem();
		this.current_test_name = '1 => 1';
		assert.equal(sub.solve(1), 1);
	}
}

class CountVowelsPermutation extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		const sub = new this.Problem();
		this.current_test_name = '1 => 5';
		assert.equal(sub.solve(1), 5);
	}

	test_2() {
		const sub = new this.Problem();
		this.current_test_name = '2 => 10';
		assert.equal(sub.solve(2), 10);
	}

	test_3() {
		const sub = new this.Problem();
		this.current_test_name = '5 => 68';
		assert.equal(sub.solve(5), 68);
	}
}

class MaximumValueOfKCoinsFromPiles extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		const sub = new this.Problem();
		this.current_test_name = '[[1,100,3],[7,8,9]], 2 => 101';
		assert.equal(
			sub.solve(
				[
					[1, 100, 3],
					[7, 8, 9]
				],
				2
			),
			101
		);
	}

	test_2() {
		const sub = new this.Problem();
		this.current_test_name = '[[1,2,3],[1,2,3],[1,2,3],[1,2,3]], 4 => 7';
		assert.equal(
			sub.solve(
				[
					[1, 2, 3],
					[1, 2, 3],
					[1, 2, 3],
					[1, 2, 3]
				],
				4
			),
			7
		);
	}

	test_3() {
		/**
		 * Input: piles = [[100],[100],[100],[100],[100],[100],[1,1,1,1,1,1,700]], k = 7
		 */
		const sub = new this.Problem();
		this.current_test_name =
			'[[100],[100],[100],[100],[100],[100],[1,1,1,1,1,1,700]], 7 => 706';
		assert.equal(
			sub.solve(
				[
					[100],
					[100],
					[100],
					[100],
					[100],
					[100],
					[1, 1, 1, 1, 1, 1, 700]
				],
				7
			),
			706
		);
	}
}

const TEST_DICTIONARY = {
	'n-th-tribonacci-number': NthTribonacciNumber,
	'delete-and-earn': DeleteAndEarn,
	'russian-doll-envelopes': RussianDollEnvelopers,
	'longest-arithmetic-subsequence': LongestArithmeticSubsequence,
	'longest-arithmetic-subsequence-of-given-difference':
		LongestArithmeticSubsequenceGivenDifference,
	'maximum-length-of-pair-chain': MaximumLengthOfPairChain,
	'number-of-longest-increasing-subsequence':
		NumberOfLongestIncreasingSubsequence,
	'minimum-insertion-steps-to-make-a-string-palindrome':
		MinimumInsertionStepsToMakeAStringPalindrome,
	'uncrossed-lines': UncrossedLines,
	'find-the-longest-valid-obstacle-course-at-each-position':
		FindTheLongestValidObstacleCourseAtEachPosition,
	'longest-increasing-subsequence': LongestIncreasingSubsequence,
	'best-time-to-buy-and-sell-stock-with-transaction-fee':
		BestTimeToBuyAndSellStockWithTransactionFee,
	'house-robber-iii': HouseRobberIII,
	'unique-binary-search-trees': UniqueBinarySearchTrees,
	'unique-binary-search-trees-ii': UniqueBinarySearchTreesII,
	'perfect-squares': PerfectSquare,
	'ones-and-zeroes': OnesAndZeroes,
	'paint-house': PaintHouse,
	'paint-house-ii': PaintHouseII,
	'solving-questions-with-brainpower': SolvingQuestionsWithBrainPower,
	'count-ways-to-build-good-strings': CountWaysToBuildGoodStrings,
	'minimum-cost-for-tickets': MinCostTickets,
	'domino-and-tromino-tiling': DominoAndTrominoTiling,
	'count-vowels-permutation': CountVowelsPermutation,
	'maximum-value-of-k-coins-from-piles': MaximumValueOfKCoinsFromPiles
};

module.exports = TEST_DICTIONARY;
