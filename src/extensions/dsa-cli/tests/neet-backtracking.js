const assert = require('assert');
const ProblemTests = require('./problem-test');

class CombinationSumII extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const combinationSum = new this.Problem();
		this.current_test_name =
			'[10,1,2,7,6,1,5] | 8 | [[1,1,6],[1,2,5],[1,7],[2,6]]';
		assert.deepEqual(combinationSum.solve([10, 1, 2, 7, 6, 1, 5], 8), [
			[1, 1, 6],
			[1, 2, 5],
			[1, 7],
			[2, 6]
		]);
	}
	test_2() {
		const combinationSum = new this.Problem();
		this.current_test_name = '[2,5,2,1,2] | 5 | [[1,2,2],[5]]';
		assert.deepEqual(combinationSum.solve([2, 5, 2, 1, 2], 5), [
			[1, 2, 2],
			[5]
		]);
	}
}

class CombinationSum extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const combinationSum = new this.Problem();
		this.current_test_name = '[2,3,6,7] | 7 | [[2,2,3],[7]]';
		assert.deepEqual(combinationSum.solve([2, 3, 6, 7], 7), [
			[2, 2, 3],
			[7]
		]);
	}

	test_2() {
		const combinationSum = new this.Problem();
		this.current_test_name = '[2,3,5] | 8 | [[2,2,2,2],[2,3,3],[3,5]]';
		assert.deepEqual(combinationSum.solve([2, 3, 5], 8), [
			[2, 2, 2, 2],
			[2, 3, 3],
			[3, 5]
		]);
	}
}

class GenerateParenthesis extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const generateParenthesis = new this.Problem();
		this.current_test_name =
			'3 | ["((()))","(()())","(())()","()(())","()()()"]';
		assert.deepEqual(generateParenthesis.solve(3), [
			'((()))',
			'(()())',
			'(())()',
			'()(())',
			'()()()'
		]);
	}

	test_2() {
		const generateParenthesis = new this.Problem();
		this.current_test_name = '1 | ["()"]';
		assert.deepEqual(generateParenthesis.solve(1), ['()']);
	}
}

class LetterCombinationsOfAPhoneNumber extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const letterCombinationsOfAPhoneNumber = new this.Problem();
		this.current_test_name =
			'"23" | ["ad","ae","af","bd","be","bf","cd","ce","cf"]';
		assert.deepEqual(letterCombinationsOfAPhoneNumber.solve('23'), [
			'ad',
			'ae',
			'af',
			'bd',
			'be',
			'bf',
			'cd',
			'ce',
			'cf'
		]);
	}

	test_2() {
		const letterCombinationsOfAPhoneNumber = new this.Problem();
		this.current_test_name = '"2" | ["a","b","c"]';
		assert.deepEqual(letterCombinationsOfAPhoneNumber.solve('2'), [
			'a',
			'b',
			'c'
		]);
	}
}

class NQueens extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		const nQueens = new this.Problem();
		this.current_test_name =
			'4 | [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]';
		assert.deepEqual(nQueens.solve(4), [
			['.Q..', '...Q', 'Q...', '..Q.'],
			['..Q.', 'Q...', '...Q', '.Q..']
		]);
	}

	test_2() {
		const nQueens = new this.Problem();
		this.current_test_name = '1 | [["Q"]]';
		assert.deepEqual(nQueens.solve(1), [['Q']]);
	}

	test_3() {
		const nQueens = new this.Problem();
		this.current_test_name =
			"6 | [\
                [ '.Q....', '...Q..', '.....Q', 'Q.....', '..Q...', '....Q.' ],\
                [ '..Q...', '.....Q', '.Q....', '....Q.', 'Q.....', '...Q..' ],\
                [ '...Q..', 'Q.....', '....Q.', '.Q....', '.....Q', '..Q...' ],\
                [ '....Q.', '..Q...', 'Q.....', '.....Q', '...Q..', '.Q....' ]\
              ]";
		assert.deepEqual(nQueens.solve(6), [
			['.Q....', '...Q..', '.....Q', 'Q.....', '..Q...', '....Q.'],
			['..Q...', '.....Q', '.Q....', '....Q.', 'Q.....', '...Q..'],
			['...Q..', 'Q.....', '....Q.', '.Q....', '.....Q', '..Q...'],
			['....Q.', '..Q...', 'Q.....', '.....Q', '...Q..', '.Q....']
		]);
	}
}

class Permutations extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		const permutations = new this.Problem();
		this.current_test_name =
			'[1,2,3] | [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]';
		assert.deepEqual(permutations.solve([1, 2, 3]), [
			[1, 2, 3],
			[1, 3, 2],
			[2, 1, 3],
			[2, 3, 1],
			[3, 1, 2],
			[3, 2, 1]
		]);
	}

	test_2() {
		const permutations = new this.Problem();
		this.current_test_name = '[0,1] | [[0,1],[1,0]]';
		assert.deepEqual(permutations.solve([0, 1]), [
			[0, 1],
			[1, 0]
		]);
	}

	test_3() {
		const permutations = new this.Problem();
		this.current_test_name = '[1] | [[1]]';
		assert.deepEqual(permutations.solve([1]), [[1]]);
	}
}

class Subsets2 extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const subsets2 = new this.Problem();
		this.current_test_name = '[1,2,2] | [[],[1],[1,2],[1,2,2],[2],[2,2]]';
		assert.deepEqual(
			subsets2.solve([1, 2, 2]).sort(),
			[[], [1], [1, 2], [1, 2, 2], [2], [2, 2]].sort()
		);
	}

	test_2() {
		const subsets2 = new this.Problem();
		this.current_test_name = '[0] | [[],[0]]';
		assert.deepEqual(subsets2.solve([0]), [[], [0]]);
	}
}

const TEST_DICTIONARY = {
	'combination-sum-ii': CombinationSumII,
	'combination-sum': CombinationSum,
	'generate-parenthesis': GenerateParenthesis,
	'letter-combinations-of-a-phone-number': LetterCombinationsOfAPhoneNumber,
	'n-queens': NQueens,
	permutations: Permutations,
	'subsets-ii': Subsets2
};

module.exports = TEST_DICTIONARY;
