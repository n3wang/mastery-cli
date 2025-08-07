const assert = require('assert');
const ProblemTests = require('./problem-test');

const {
	arrayToListNode,
	arrayToBinaryTree,
	TreeNode,
	binaryTreeToArray
} = require('./utils');

class LongestStringChain extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name = 'a -> b -> ba -> bca -> bdca | 4';
		const input = ['a', 'b', 'ba', 'bca', 'bda', 'bdca'];
		const output = 4;

		const sub = new this.Problem();
		const result = sub.solve(input);
		assert.equal(result, output);
	}

	test_2() {
		this.current_test_name = 'xbc -> pcxbcf -> xb -> cxbc -> pcxbc | 5';
		const input = ['xbc', 'pcxbcf', 'xb', 'cxbc', 'pcxbc'];
		const output = 5;

		const sub = new this.Problem();
		const result = sub.solve(input);
		assert.strictEqual(result, output);
	}
}

class WiggleSubsequence extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const input = [1, 7, 4, 9, 2, 5];
		const output = 6;
		this.current_test_name = '1,7,4,9,2,5 | 6';

		const sub = new this.Problem();
		const result = sub.solve(input);
		assert.strictEqual(result, output);
	}

	test_2() {
		this.current_test_name = '1,17,5,10,13,15,10,5,16,8 | 7';
		const input = [1, 17, 5, 10, 13, 15, 10, 5, 16, 8];
		const output = 7;

		const sub = new this.Problem();
		const result = sub.solve(input);
		assert.strictEqual(result, output);
	}
}

class KeysKeyboard4 extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name = '3 | 3';
		const input = 3;
		const output = 3;

		const sub = new this.Problem();
		const result = sub.solve(input);
		assert.strictEqual(result, output);
	}

	test_2() {
		this.current_test_name = '7 | 9';
		const input = 7;
		const output = 9;

		const sub = new this.Problem();
		const result = sub.solve(input);
		assert.strictEqual(result, output);
	}
}

class HandShakesThatDontCross extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name = '6 | 5';

		const sub = new this.Problem();
		const result = sub.solve(6);
		assert.equal(result, 5);
	}

	test_2() {
		this.current_test_name = '4 | 2';

		const sub = new this.Problem();
		const result = sub.solve(4);
		assert.equal(result, 2);
	}
}

class DecodeWaysII extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name = '1* | 18';
		const input = '1*';
		const output = 18;

		const sub = new this.Problem();
		const result = sub.solve(input);
		assert.equal(result, output);
	}

	test_2() {
		this.current_test_name = '2* | 15';
		const input = '2*';
		const output = 15;

		const sub = new this.Problem();
		const result = sub.solve(input);
		assert.equal(result, output);
	}
}

class MaximumScoreFromPerformingMultiplicationOperations extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name = 'nums = [1,2,3], multipliers = [3,2,1] | 14';
		const nums = [1, 2, 3],
			multipliers = [3, 2, 1];
		const output = 14;

		const sub = new this.Problem();
		const result = sub.solve(nums, multipliers);
		assert.equal(result, output);
	}

	test_2() {
		this.current_test_name =
			'nums = [-5,-3,-3,-2,7,1], multipliers = [-10,-5,3,4,6] | 102';
		const nums = [-5, -3, -3, -2, 7, 1],
			multipliers = [-10, -5, 3, 4, 6];
		const output = 102;

		const sub = new this.Problem();
		const result = sub.solve(nums, multipliers);
		assert.equal(result, output);
	}
}

class PaintHouseIII extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name =
			'houses = [0,0,0,0,0], cost = [[1,10],[10,1],[10,1],[1,10],[5,1]], m = 5, n = 2, target = 3 | 9';
		const houses = [0, 0, 0, 0, 0],
			cost = [
				[1, 10],
				[10, 1],
				[10, 1],
				[1, 10],
				[5, 1]
			],
			m = 5,
			n = 2,
			target = 3;
		const output = 9;

		const sub = new this.Problem();
		const result = sub.solve(houses, cost, m, n, target);
		assert.equal(result, output);
	}

	test_2() {
		this.current_test_name =
			'houses = [0,2,1,2,0], cost = [[1,10],[10,1],[10,1],[1,10],[5,1]], m = 5, n = 2, target = 3 | 11';
		const houses = [0, 2, 1, 2, 0],
			cost = [
				[1, 10],
				[10, 1],
				[10, 1],
				[1, 10],
				[5, 1]
			],
			m = 5,
			n = 2,
			target = 3;
		const output = 11;

		const sub = new this.Problem();
		const result = sub.solve(houses, cost, m, n, target);
		assert.equal(result, output);
	}
}

class FrogJump extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name = '[0,1,3,5,6,8,12,17] | true';
		const input = [0, 1, 3, 5, 6, 8, 12, 17];
		const output = true;

		const sub = new this.Problem();
		const result = sub.solve(input);
		assert.equal(result, output);
	}

	test_2() {
		this.current_test_name = '[0,1,2,3,4,8,9,11] | false';
		const input = [0, 1, 2, 3, 4, 8, 9, 11];
		const output = false;

		const sub = new this.Problem();
		const result = sub.solve(input);
		assert.equal(result, output);
	}
}

class MinimumDifficultyOfAJobSchedule extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name = '[6,5,4,3,2,1], 2 | 7';

		const sub = new this.Problem();
		const result = sub.solve([6, 5, 4, 3, 2, 1], 2);
		assert.equal(result, 7);
	}

	test_2() {
		this.current_test_name = '[9,9,9], 4 | -1';

		const sub = new this.Problem();
		const result = sub.solve([9, 9, 9], 4);
		assert.equal(result, -1);
	}
}

class StrangePrinter extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name = 'aaabbb | 2';

		const sub = new this.Problem();
		const result = sub.solve('aaabbb');
		assert.equal(result, 2);
	}

	test_2() {
		this.current_test_name = 'aba | 2';

		const sub = new this.Problem();
		const result = sub.solve('aba');
		assert.equal(result, 2);
	}
}

class MinimumCostToCutAStick extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		// this.tests.push(() => this.test_3());
	}

	test_1() {
		this.current_test_name = '7, [1,3,4,5] | 16';

		const sub = new this.Problem();
		const result = sub.solve(7, [1, 3, 4, 5]);
		assert.equal(result, 16);
	}

	test_2() {
		this.current_test_name = '9, [5,6,1,4,2] | 22';

		const sub = new this.Problem();
		const result = sub.solve(9, [5, 6, 1, 4, 2]);
		assert.equal(result, 22);
	}

	test_3() {
		this.current_test_name = '';
	}
}

class CountAllPossibleRoutes extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name =
			'locations = [2,3,6,8,4], start = 1, finish = 3, fuel = 5 | 4';

		const sub = new this.Problem();
		const result = sub.solve([2, 3, 6, 8, 4], 1, 3, 5);
		assert.equal(result, 4);
	}

	test_2() {
		this.current_test_name =
			'locations = [4,3,1], start = 1, finish = 0, fuel = 6 | 5';
		const sub = new this.Problem();
		const result = sub.solve([4, 3, 1], 1, 0, 6);
		assert.equal(result, 5);
	}
}

class NumberOfWaysToFormATargetStringGivenADictionary extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name =
			'words = ["acca","bbbb","caca"], target = "aba" | 6';
		const sub = new this.Problem();
		const result = sub.solve(['acca', 'bbbb', 'caca'], 'aba');
		assert.equal(result, 6);
	}

	test_2() {
		this.current_test_name = 'words = ["abba","baab"], target = "bab" | 4';
		const sub = new this.Problem();
		const result = sub.solve(['abba', 'baab'], 'bab');
		assert.equal(result, 4);
	}
}

class NumberOfMusicPlaylists extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		this.current_test_name = 'N = 3, L = 3, K = 1 | 6';
		const sub = new this.Problem();
		const result = sub.solve(3, 3, 1);
		assert.equal(result, 6);
	}

	test_2() {
		this.current_test_name = 'N = 2, L = 3, K = 0 | 6';
		const sub = new this.Problem();
		const result = sub.solve(2, 3, 0);
		assert.equal(result, 6);
	}

	test_3() {
		this.current_test_name = 'N = 2, L = 3, K = 1 | 2';
		const sub = new this.Problem();
		const result = sub.solve(2, 3, 1);
		assert.equal(result, 2);
	}
}

class NumberOfWaysOfCuttingAPizza extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		// this.tests.push(() => this.test_3());
	}

	test_1() {
		this.current_test_name = 'pizza = ["A..","AAA","..."], k = 3 | 3';
		const sub = new this.Problem();
		const result = sub.solve(['A..', 'AAA', '...'], 3);
		assert.equal(result, 3);
	}

	test_2() {
		this.current_test_name = 'pizza = ["A..","AA.","..."] | 1';
		const sub = new this.Problem();
		const result = sub.solve(['A..', 'AA.', '...'], 1);
		assert.equal(result, 1);
	}
}

class ScrambleString extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		// this.tests.push(() => this.test_3());
	}

	test_1() {
		this.current_test_name = 's1 = "great", s2 = "rgeat" | true';
		const sub = new this.Problem();
		const result = sub.solve('great', 'rgeat');
		assert.equal(result, true);
	}

	test_2() {
		this.current_test_name = 's1 = "abcde", s2 = "caebd" | false';
		const sub = new this.Problem();
		const result = sub.solve('abcde', 'caebd');
		assert.equal(result, false);
	}

	test_3() {
		this.current_test_name = 's1 = "a", s2 = "a" | true';
		const sub = new this.Problem();
		const result = sub.solve('a', 'a');
		assert.equal(result, true);
	}
}

class TossStrangeCoins extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name = '[0.4], 1 | 0.40000';
		const sub = new this.Problem();
		const result = sub.solve([0.4], 1);
		assert.equal(result, 0.4);
	}

	test_2() {
		this.current_test_name = '[0.5,0.5,0.5,0.5,0.5], 0 | 0.03125';
		const sub = new this.Problem();
		const result = sub.solve([0.5, 0.5, 0.5, 0.5, 0.5], 0);
		assert.equal(result, 0.03125);
	}
}

class MaximumNumberOfAchievableTransferRequests extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name =
			'n = 5, requests = [[0,1],[1,0],[0,1],[1,2],[2,0],[3,4]] | 5';
		const sub = new this.Problem();
		const result = sub.solve(5, [
			[0, 1],
			[1, 0],
			[0, 1],
			[1, 2],
			[2, 0],
			[3, 4]
		]);
		assert.equal(result, 5);
	}

	test_2() {
		this.current_test_name = 'n = 3, requests = [[0,0],[1,2],[2,1]] | 3';
		const sub = new this.Problem();
		const result = sub.solve(3, [
			[0, 0],
			[1, 2],
			[2, 1]
		]);
		assert.equal(result, 3);
	}
}

class BestTeamWithNoConflicts extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name = '[1,3,5,10,15], [1,2,3,4,5] | 34';
		const sub = new this.Problem();
		const result = sub.solve([1, 3, 5, 10, 15], [1, 2, 3, 4, 5]);
		assert.equal(result, 34);
	}

	test_2() {
		this.current_test_name = '[4,5,6,5], [2,1,2,1] | 16';
		const sub = new this.Problem();
		const result = sub.solve([4, 5, 6, 5], [2, 1, 2, 1]);
		assert.equal(result, 16);
	}
}

class TallestBillboard extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		this.current_test_name = '[1,2,3,6] | 6';
		const sub = new this.Problem();
		const result = sub.solve([1, 2, 3, 6]);
		assert.equal(result, 6);
	}

	test_2() {
		this.current_test_name = '[1,2,3,4,5,6] | 10';
		const sub = new this.Problem();
		const result = sub.solve([1, 2, 3, 4, 5, 6]);
		assert.equal(result, 10);
	}

	test_3() {
		this.current_test_name = '[1,2] | 0';
		const sub = new this.Problem();
		const result = sub.solve([1, 2]);
		assert.equal(result, 0);
	}
}

class AllPossibleFullBinaryTrees extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		// this.tests.push(() => this.test_2());
		// this.tests.push(() => this.test_3());
	}

	test_1() {
		/**
         * Input: n = 7
Output: [[0,0,0,null,null,0,0,null,null,0,0],[0,0,0,null,null,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,null,null,null,null,0,0],[0,0,0,0,0,null,null,0,0]]
         */
		this.current_test_name =
			'7 | [[0,0,0,null,null,0,0,null,null,0,0],[0,0,0,null,null,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,null,null,null,null,0,0],[0,0,0,0,0,null,null,0,0]]';
		const sub = new this.Problem();
		const result = sub.solve(7);

		const res = [];
		for (const tree of result) {
			res.push(binaryTreeToArray(tree));
		}

		assert.deepEqual(res, [
			[0, 0, 0, null, null, 0, 0, null, null, 0, 0],
			[0, 0, 0, null, null, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, null, null, null, null, 0, 0],
			[0, 0, 0, 0, 0, null, null, 0, 0]
		]);
	}

	test_2() {
		this.current_test_name = '3 | [[0,0,0]]';
		const sub = new this.Problem();
		const result = sub.solve(3);
		const res = [];
		for (const tree of result) {
			res.push(binaryTreeToArray(tree));
		}
		assert.deepEqual(res, [[0, 0, 0]]);
	}
}

class MaximumProductOfSplittedBinaryTree extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		// this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		this.current_test_name = '[1,2,3,4,5,6] | 110';
		const sub = new this.Problem();
		const result = sub.solve(arrayToBinaryTree([1, 2, 3, 4, 5, 6]));
		assert.equal(result, 110);
	}

	test_2() {
		this.current_test_name = '[1,null,2,3,4,null,null,5,6] | 90';
		const sub = new this.Problem();
		const result = sub.solve(
			arrayToBinaryTree([1, null, 2, 3, 4, null, null, 5, 6])
		);
		assert.equal(result, 90);
	}

	test_3() {
		this.current_test_name = '[2,3,9,10,7,8,6,5,4,11,1] | 1025';
		const sub = new this.Problem();
		const result = sub.solve(
			arrayToBinaryTree([2, 3, 9, 10, 7, 8, 6, 5, 4, 11, 1])
		);
		assert.equal(result, 1025);
	}
}

class BinaryTreeCameras extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		this.current_test_name = '[0,0,null,0,0] | 1';
		const sub = new this.Problem();
		const result = sub.solve(arrayToBinaryTree([0, 0, null, 0, 0]));
		assert.equal(result, 1);
	}

	test_2() {
		this.current_test_name = '[0,0,null,0,null,0,null,null,0] | 2';
		const sub = new this.Problem();
		const result = sub.solve(
			arrayToBinaryTree([0, 0, null, 0, null, 0, null, null, 0])
		);
		assert.equal(result, 2);
	}

	test_3() {
		this.current_test_name =
			'[0,0,null,0,null,0,null,null,0,null,0,null,null,0] | 3';
		const sub = new this.Problem();
		const result = sub.solve(
			arrayToBinaryTree([
				0,
				0,
				null,
				0,
				null,
				0,
				null,
				null,
				0,
				null,
				0,
				null,
				null,
				0
			])
		);
		assert.equal(result, 2);
	}
}

class NumberOfWaysToReorderArrayToGetSameBst extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		this.current_test_name = '[2,1,3] | 1';
		const sub = new this.Problem();
		const result = sub.solve([2, 1, 3]);
		assert.equal(result, 1);
	}

	test_2() {
		this.current_test_name = '[3,4,5,1,2] | 5';
		const sub = new this.Problem();
		const result = sub.solve([3, 4, 5, 1, 2]);
		assert.equal(result, 5);
	}

	test_3() {
		this.current_test_name = '[1,2,3] | 0';
		const sub = new this.Problem();
		const result = sub.solve([1, 2, 3]);
		assert.equal(result, 0);
	}
}

class PartitionToKEqualSumSubsets extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		// this.tests.push(() => this.test_2());
		// this.tests.push(() => this.test_3());
	}

	test_1() {
		this.current_test_name = '[4,3,2,3,5,2,1], k = 4 | true';
		const sub = new this.Problem();
		const result = sub.solve([4, 3, 2, 3, 5, 2, 1], 4);
		assert.equal(result, true);
	}
}

class OptimalAccountBalancing extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name = '[[0,1,10],[2,0,5]] | 2';
		const sub = new this.Problem();
		const result = sub.solve([
			[0, 1, 10],
			[2, 0, 5]
		]);
		assert.equal(result, 2);
	}

	test_2() {
		this.current_test_name = '[[0,1,10],[1,0,1],[1,2,5],[2,0,5]] | 1';
		const sub = new this.Problem();
		const result = sub.solve([
			[0, 1, 10],
			[1, 0, 1],
			[1, 2, 5],
			[2, 0, 5]
		]);
		assert.equal(result, 1);
	}
}

class ShortestPathVisitingAllNodes extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name = '[[1,2,3],[0],[0],[0]] | 4';
		const sub = new this.Problem();
		const result = sub.solve([[1, 2, 3], [0], [0], [0]]);
		assert.equal(result, 4);
	}

	test_2() {
		this.current_test_name = '[[1],[0,2,4],[1,3,4],[2],[1,2]] | 4';
		const sub = new this.Problem();
		const result = sub.solve([[1], [0, 2, 4], [1, 3, 4], [2], [1, 2]]);
		assert.equal(result, 4);
	}
}

class SmallestSufficientTeams extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		// this.tests.push(() => this.test_3());
	}

	test_1() {
		this.current_test_name =
			'[["java"],["nodejs"],["nodejs","reactjs"]], ["java","nodejs","reactjs"] | [0,2]';
		const sub = new this.Problem();
		const result = sub.solve(
			[['java'], ['nodejs'], ['nodejs', 'reactjs']],
			['java', 'nodejs', 'reactjs']
		);
		assert.deepEqual(result, [0, 2]);
	}

	test_2() {
		this.current_test_name =
			'[["algorithms","math","java"],["algorithms","math","reactjs"],["java","csharp","aws"],["reactjs","csharp"],["csharp","math"],["aws","java"]], ["algorithms","math","java","reactjs","csharp","aws"] | [1,2]';
		const sub = new this.Problem();
		const result = sub.solve(
			[
				['algorithms', 'math', 'java'],
				['algorithms', 'math', 'reactjs'],
				['java', 'csharp', 'aws'],
				['reactjs', 'csharp'],
				['csharp', 'math'],
				['aws', 'java']
			],
			['algorithms', 'math', 'java', 'reactjs', 'csharp', 'aws']
		);
		assert.deepEqual(result, [1, 2]);
	}

	test_3() {
		this.current_test_name = '';
	}
}

class NumberOfWaysToWearDifferentHatsToEachOther extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		this.current_test_name = '[[3,4],[4,5],[5]] | 1';
		const sub = new this.Problem();
		const result = sub.solve([[3, 4], [4, 5], [5]]);
		assert.equal(result, 1);
	}

	test_2() {
		this.current_test_name = '[[3,5,1],[3,5] | 4';
		const sub = new this.Problem();
		const result = sub.solve([
			[3, 5, 1],
			[3, 5]
		]);
		assert.equal(result, 4);
	}

	test_3() {
		this.current_test_name =
			'[[1,2,3,4],[1,2,3,4],[1,2,3,4],[1,2,3,4]] | 24';
		const sub = new this.Problem();
		const result = sub.solve([
			[1, 2, 3, 4],
			[1, 2, 3, 4],
			[1, 2, 3, 4],
			[1, 2, 3, 4]
		]);
		assert.equal(result, 24);
	}
}

class MaximizeScoreAfterNOperations extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		this.current_test_name = '[1,2] | 1';
		const sub = new this.Problem();
		const result = sub.solve([1, 2]);
		assert.equal(result, 1);
	}

	test_2() {
		this.current_test_name = '[3,4,6,8] | 11';
		const sub = new this.Problem();
		const result = sub.solve([3, 4, 6, 8]);
		assert.equal(result, 11);
	}

	test_3() {
		this.current_test_name = '[1,2,3,4,5,6] | 14';
		const sub = new this.Problem();
		const result = sub.solve([1, 2, 3, 4, 5, 6]);
		assert.equal(result, 14);
	}
}

class StoneGame extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name = '[5,3,4,5] | true';
		const sub = new this.Problem();
		const result = sub.solve([5, 3, 4, 5]);
		assert.equal(result, true);
	}

	test_2() {
		this.current_test_name = '[1,2,3,4,5,6,7,8,9,10] | true';
		const sub = new this.Problem();
		const result = sub.solve([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
		assert.equal(result, true);
	}
}

class PredictTheWinner extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		this.current_test_name = '[1,5,2] | false';
		const sub = new this.Problem();
		const result = sub.solve([1, 5, 2]);
		assert.equal(result, false);
	}

	test_2() {
		this.current_test_name = '[1,5,233,7] | true';
		const sub = new this.Problem();
		const result = sub.solve([1, 5, 233, 7]);
		assert.equal(result, true);
	}

	test_3() {
		this.current_test_name = '[1,5,2,4,6] | true';
		const sub = new this.Problem();
		const result = sub.solve([1, 5, 2, 4, 6]);
		assert.equal(result, true);
	}
}

class StoneGameII extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name = '[2,7,9,4,4] | 10';
		const sub = new this.Problem();
		const result = sub.solve([2, 7, 9, 4, 4]);
		assert.equal(result, 10);
	}

	test_2() {
		this.current_test_name = '[1,2,3,4,5,100] | 104';
		const sub = new this.Problem();
		const result = sub.solve([1, 2, 3, 4, 5, 100]);
		assert.equal(result, 104);
	}
}

class StoneGameIII extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name = '[1,2,3,7] | "Bob"';
		const sub = new this.Problem();
		const result = sub.solve([1, 2, 3, 7]);
		assert.equal(result, 'Bob');
	}

	test_2() {
		this.current_test_name = '[1,2,3,-9] | "Alice"';
		const sub = new this.Problem();
		const result = sub.solve([1, 2, 3, -9]);
		assert.equal(result, 'Alice');
	}
}

class StoneGameIV extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name = 'n = 1 | true';
		const sub = new this.Problem();
		const result = sub.solve(1);
		assert.equal(result, true);
	}

	test_2() {
		this.current_test_name = 'n = 2 | false';
		const sub = new this.Problem();
		const result = sub.solve(2);
		assert.equal(result, false);
	}
}

class MaximumNUmberOfEventsTHatCanBeAttentedII extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		this.current_test_name =
			'events = [[1,2,4],[3,4,3],[2,3,1]], k = 2 | 7';
		const sub = new this.Problem();
		const result = sub.solve(
			[
				[1, 2, 4],
				[3, 4, 3],
				[2, 3, 1]
			],
			2
		);
		assert.equal(result, 7);
	}

	test_2() {
		/**
         * Input: events = [[1,2,4],[3,4,3],[2,3,10]], k = 2
            Output: 10
         */

		this.current_test_name =
			'events = [[1,2,4],[3,4,3],[2,3,10]], k = 2 | 10';
		const sub = new this.Problem();
		const result = sub.solve(
			[
				[1, 2, 4],
				[3, 4, 3],
				[2, 3, 10]
			],
			2
		);
		assert.equal(result, 10);
	}

	test_3() {
		/**
         * 
            Input: events = [[1,1,1],[2,2,2],[3,3,3],[4,4,4]], k = 3
            Output: 9
         */

		this.current_test_name =
			'events = [[1,1,1],[2,2,2],[3,3,3],[4,4,4]], k = 3 | 9';
		const sub = new this.Problem();
		const result = sub.solve(
			[
				[1, 1, 1],
				[2, 2, 2],
				[3, 3, 3],
				[4, 4, 4]
			],
			3
		);
		assert.equal(result, 9);
	}
}

class MakeArrayStricklyIncreasing extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		this.current_test_name = 'arr1 = [1,5,3,6,7], arr2 = [1,3,2,4] | 1';
		const sub = new this.Problem();
		const result = sub.solve([1, 5, 3, 6, 7], [1, 3, 2, 4]);
		assert.equal(result, 1);
	}

	test_2() {
		this.current_test_name = 'arr1 = [1,5,3,6,7], arr2 = [4,3,1] | 2';
		const sub = new this.Problem();
		const result = sub.solve([1, 5, 3, 6, 7], [4, 3, 1]);
		assert.equal(result, 2);
	}

	test_3() {
		this.current_test_name = 'arr1 = [1,5,3,6,7], arr2 = [1,6,3,3] | -1';
		const sub = new this.Problem();
		const result = sub.solve([1, 5, 3, 6, 7], [1, 6, 3, 3]);
		assert.equal(result, -1);
	}
}

class MaximumProfitInJobScheduling extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name =
			'startTime = [1,2,3,3], endTime = [3,4,5,6], profit = [50,10,40,70] | 120';
		const sub = new this.Problem();
		const result = sub.solve([1, 2, 3, 3], [3, 4, 5, 6], [50, 10, 40, 70]);
		assert.equal(result, 120);
	}

	test_2() {
		this.current_test_name =
			'startTime = [1,2,3,4,6], endTime = [3,5,10,6,9], profit = [20,20,100,70,60] | 150';
		const sub = new this.Problem();
		const result = sub.solve(
			[1, 2, 3, 4, 6],
			[3, 5, 10, 6, 9],
			[20, 20, 100, 70, 60]
		);
		assert.equal(result, 150);
	}
}

class SuperEggDrop extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name = 'k = 1, n = 2 | 2';
		const sub = new this.Problem();
		const result = sub.solve(1, 2);
		assert.equal(result, 2);
	}

	test_2() {
		this.current_test_name = 'k = 2, n = 6 | 3';
		const sub = new this.Problem();
		const result = sub.solve(2, 6);
	}
}

const TEST_DICTIONARY = {
	'longest-string-chain': LongestStringChain,
	'wiggle-subsequence': WiggleSubsequence,
	'4-keys-keyboard': KeysKeyboard4,
	'handshakes-that-dont-cross': HandShakesThatDontCross,
	'decode-ways-ii': DecodeWaysII,
	'maximum-score-from-performing-multiplication-operations':
		MaximumScoreFromPerformingMultiplicationOperations,
	'paint-house-iii': PaintHouseIII,
	'frog-jump': FrogJump,
	'minimum-difficulty-of-a-job-schedule': MinimumDifficultyOfAJobSchedule,
	'strange-printer': StrangePrinter,
	'minimum-cost-to-cut-a-stick': MinimumCostToCutAStick,
	'count-all-possible-routes': CountAllPossibleRoutes,
	'number-of-ways-to-form-a-target-string-given-a-dictionary':
		NumberOfWaysToFormATargetStringGivenADictionary,
	'number-of-music-playlists': NumberOfMusicPlaylists,
	'number-of-ways-of-cutting-a-pizza': NumberOfWaysOfCuttingAPizza,
	'scramble-string': ScrambleString,
	'toss-strange-coins': TossStrangeCoins,
	'maximum-number-of-achievable-transfer-requests':
		MaximumNumberOfAchievableTransferRequests,
	'best-team-with-no-conflicts': BestTeamWithNoConflicts,
	'tallest-billboard': TallestBillboard,
	'all-possible-full-binary-trees': AllPossibleFullBinaryTrees,
	'maximum-product-of-splitted-binary-tree':
		MaximumProductOfSplittedBinaryTree,
	'binary-tree-cameras': BinaryTreeCameras,
	'number-of-ways-to-reorder-array-to-get-same-bst':
		NumberOfWaysToReorderArrayToGetSameBst,
	'partition-to-k-equal-sum-subsets': PartitionToKEqualSumSubsets,
	'optimal-account-balancing': OptimalAccountBalancing,
	'shortest-path-visiting-all-nodes': ShortestPathVisitingAllNodes,
	'smallest-sufficient-team': SmallestSufficientTeams,
	'number-of-ways-to-wear-different-hats-to-each-other':
		NumberOfWaysToWearDifferentHatsToEachOther,
	'maximize-score-after-n-operations': MaximizeScoreAfterNOperations,
	'stone-game': StoneGame,
	'predict-the-winner': PredictTheWinner,
	'stone-game-ii': StoneGameII,
	'stone-game-iii': StoneGameIII,
	'stone-game-iv': StoneGameIV,
	'maximum-number-of-events-that-can-be-attended-ii':
		MaximumNUmberOfEventsTHatCanBeAttentedII,
	'make-array-strictly-increasing': MakeArrayStricklyIncreasing,
	'maximum-profit-in-job-scheduling': MaximumProfitInJobScheduling,
	'super-egg-drop': SuperEggDrop
};

module.exports = TEST_DICTIONARY;
