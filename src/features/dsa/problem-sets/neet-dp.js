const assert = require('assert');
const ProblemTests = require('./problem-test');

class ClimbingStairs extends ProblemTests {
	constructor(problem) {
		super(problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		const climbingStairs = new this.Problem();
		this.current_test_name = '2 | 2';
		assert.equal(climbingStairs.solve(2), 2);
	}

	test_2() {
		const climbingStairs = new this.Problem();
		this.current_test_name = '3 | 3';
		assert.equal(climbingStairs.solve(3), 3);
	}

	test_3() {
		const climbingStairs = new this.Problem();
		this.current_test_name = '10 | 89';
		assert.equal(climbingStairs.solve(10), 89);
	}
}

class CoinChange extends ProblemTests {
	constructor(problem) {
		super(problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		const coinChange = new this.Problem();
		this.current_test_name = '[1,2,5] | 11 | 3';
		assert.equal(coinChange.solve([1, 2, 5], 11), 3);
	}

	test_2() {
		const coinChange = new this.Problem();
		this.current_test_name = '[2] | 3 | -1';
		assert.equal(coinChange.solve([2], 3), -1);
	}

	test_3() {
		const coinChange = new this.Problem();
		this.current_test_name = '[1] | 0 | 0';
		assert.equal(coinChange.solve([1], 0), 0);
	}
}

class DecodeWays extends ProblemTests {
	constructor(problem) {
		super(problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		const decodeWays = new this.Problem();
		this.current_test_name = '"12" | 2';
		assert.equal(decodeWays.solve('12'), 2);
	}

	test_2() {
		const decodeWays = new this.Problem();
		this.current_test_name = '"226" | 3';
		assert.equal(decodeWays.solve('226'), 3);
	}

	test_3() {
		const decodeWays = new this.Problem();
		this.current_test_name = '"0" | 0';
		assert.equal(decodeWays.solve('06'), 0);
	}
}

class DetectSquares extends ProblemTests {
	constructor(problem) {
		super(problem);
		this.tests.push(() => this.test_1());
	}

	test_1() {
		const detectSquares = new this.Problem();
		this.current_test_name =
			'[[3,10],[11,2],[3,2],[11,10],[2,3],[10,11]] | 2';
		detectSquares.add([3, 10]);
		detectSquares.add([11, 2]);
		detectSquares.add([3, 2]);
		assert.equal(detectSquares.count([11, 10]), 1);
		assert.equal(detectSquares.count([14, 8]), 0);

		detectSquares.add([11, 2]);
		assert.equal(detectSquares.count([11, 10]), 2);
	}
}

class HouseRobber extends ProblemTests {
	constructor(problem) {
		super(problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		// this.tests.push(() => this.test_3());
	}

	test_1() {
		const houseRobber = new this.Problem();
		this.current_test_name = '[1,2,3,1] | 4';
		assert.equal(houseRobber.solve([1, 2, 3, 1]), 4);
	}

	test_2() {
		const houseRobber = new this.Problem();
		this.current_test_name = '[2,7,9,3,1] | 12';
		assert.equal(houseRobber.solve([2, 7, 9, 3, 1]), 12);
	}
}

class HouseRobberII extends ProblemTests {
	constructor(problem) {
		super(problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		const houseRobberII = new this.Problem();
		this.current_test_name = '[2,3,2] | 3';
		assert.equal(houseRobberII.solve([2, 3, 2]), 3);
	}

	test_2() {
		const houseRobberII = new this.Problem();
		this.current_test_name = '[1,2,3,1] | 4';
		assert.equal(houseRobberII.solve([1, 2, 3, 1]), 4);
	}

	test_3() {
		const houseRobberII = new this.Problem();
		this.current_test_name = '[1, 2, 3, 1, 2, 3] | 6';
		assert.equal(houseRobberII.solve([1, 2, 3, 1, 2, 3]), 6);
	}
}

class JumpGame extends ProblemTests {
	constructor(problem) {
		super(problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		const jumpGame = new this.Problem();
		this.current_test_name = '[2,3,1,1,4] | true';
		assert.equal(jumpGame.solve([2, 3, 1, 1, 4]), true);
	}

	test_2() {
		const jumpGame = new this.Problem();
		this.current_test_name = '[3,2,1,0,4] | false';
		assert.equal(jumpGame.solve([3, 2, 1, 0, 4]), false);
	}

	test_3() {
		const jumpGame = new this.Problem();
		this.current_test_name = '[2,0] | true';
		assert.equal(jumpGame.solve([2, 0]), true);
	}
}

class LongestCommonSequence extends ProblemTests {
	constructor(problem) {
		super(problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		const longestCommonSequence = new this.Problem();
		this.current_test_name = '"abcde", "ace" | 3';
		assert.equal(longestCommonSequence.solve('abcde', 'ace'), 3);
	}

	test_2() {
		const longestCommonSequence = new this.Problem();
		this.current_test_name = '"abc", "abc" | 3';
		assert.equal(longestCommonSequence.solve('abc', 'abc'), 3);
	}

	test_3() {
		const longestCommonSequence = new this.Problem();
		this.current_test_name = '"abc", "def" | 0';
		assert.equal(longestCommonSequence.solve('abc', 'def'), 0);
	}
}

class MaximumProductSubArray extends ProblemTests {
	constructor(problem) {
		super(problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		const maximumProductSubArray = new this.Problem();
		this.current_test_name = '[2,3,-2,4] | 6';
		assert.equal(maximumProductSubArray.solve([2, 3, -2, 4]), 6);
	}

	test_2() {
		const maximumProductSubArray = new this.Problem();
		this.current_test_name = '[-2,0,-1] | 0';
		assert.equal(maximumProductSubArray.solve([-2, 0, -1]), 0);
	}

	test_3() {
		const maximumProductSubArray = new this.Problem();
		this.current_test_name = '[-2,3,-4] | 24';
		assert.equal(maximumProductSubArray.solve([-2, 3, -4]), 24);
	}
}

class MaximumSubarray extends ProblemTests {
	constructor(problem) {
		super(problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		const maximumSubarray = new this.Problem();
		this.current_test_name = '[-2,1,-3,4,-1,2,1,-5,4] | 6';
		assert.equal(maximumSubarray.solve([-2, 1, -3, 4, -1, 2, 1, -5, 4]), 6);
	}

	test_2() {
		const maximumSubarray = new this.Problem();
		this.current_test_name = '[1] | 1';
		assert.equal(maximumSubarray.solve([1]), 1);
	}

	test_3() {
		const maximumSubarray = new this.Problem();
		this.current_test_name = '[5,4,-1,7,8] | 23';
		assert.equal(maximumSubarray.solve([5, 4, -1, 7, 8]), 23);
	}
}

class MinCostClimbingStairs extends ProblemTests {
	constructor(problem) {
		super(problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		const minCostClimbingStairs = new this.Problem();
		this.current_test_name = '[10,15,20] | 15';
		assert.equal(minCostClimbingStairs.solve([10, 15, 20]), 15);
	}

	test_2() {
		const minCostClimbingStairs = new this.Problem();
		this.current_test_name = '[1,100,1,1,1,100,1,1,100,1] | 6';
		assert.equal(
			minCostClimbingStairs.solve([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]),
			6
		);
	}

	test_3() {
		const minCostClimbingStairs = new this.Problem();
		this.current_test_name = '[0,0,0,0] | 0';
		assert.equal(minCostClimbingStairs.solve([0, 0, 0, 0]), 0);
	}
}

class PalindromicSubstring extends ProblemTests {
	constructor(problem) {
		super(problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const palindromicSubstring = new this.Problem();
		this.current_test_name = '"abc" | 3';
		assert.equal(palindromicSubstring.solve('abc'), 3);
	}

	test_2() {
		const palindromicSubstring = new this.Problem();
		this.current_test_name = '"aaa" | 6';
		assert.equal(palindromicSubstring.solve('aaa'), 6);
	}
}

class PartitionEqualSubsetSum extends ProblemTests {
	constructor(problem) {
		super(problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const partitionEqualSubsetSum = new this.Problem();
		this.current_test_name = '[1,5,11,5] | true';
		assert.equal(partitionEqualSubsetSum.solve([1, 5, 11, 5]), true);
	}

	test_2() {
		const partitionEqualSubsetSum = new this.Problem();
		this.current_test_name = '[1,2,3,5] | false';
		assert.equal(partitionEqualSubsetSum.solve([1, 2, 3, 5]), false);
	}
}

class WordBreak extends ProblemTests {
	constructor(problem) {
		super(problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		const wordBreak = new this.Problem();
		this.current_test_name = '"leetcode", ["leet", "code"] | true';
		assert.equal(wordBreak.solve('leetcode', ['leet', 'code']), true);
	}

	test_2() {
		const wordBreak = new this.Problem();
		this.current_test_name = '"applepenapple", ["apple", "pen"] | true';
		assert.equal(wordBreak.solve('applepenapple', ['apple', 'pen']), true);
	}

	test_3() {
		const wordBreak = new this.Problem();
		this.current_test_name =
			'"catsandog", ["cats", "dog", "sand", "and", "cat"] | false';
		assert.equal(
			wordBreak.solve('catsandog', ['cats', 'dog', 'sand', 'and', 'cat']),
			false
		);
	}
}

const TEST_DICTIONARY = {
	'climbing-stairs': ClimbingStairs,
	'coin-change': CoinChange,
	'decode-ways': DecodeWays,
	'detect-squares': DetectSquares,
	'house-robber': HouseRobber,
	'house-robber-ii': HouseRobberII,
	'jump-game': JumpGame,
	'longest-common-sequence': LongestCommonSequence,
	'maximum-product-subarray': MaximumProductSubArray,
	'maximum-subarray': MaximumSubarray,
	'min-cost-climbing-stairs': MinCostClimbingStairs,
	'palindromic-substrings': PalindromicSubstring,
	'partition-equal-subset-sum': PartitionEqualSubsetSum,
	'word-break': WordBreak
};

module.exports = TEST_DICTIONARY;
