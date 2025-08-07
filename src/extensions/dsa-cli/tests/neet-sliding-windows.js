const assert = require('assert');
const ProblemTests = require('./problem-test');

class CharacterReplacement extends ProblemTests {
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
		this.current_test_name = 'ABAB, 2 => 4';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve('ABAB', 2), 4);
	}

	test_2() {
		this.current_test_name = 'AABABBA, 1 => 4';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve('AABABBA', 1), 4);
	}
	test_3() {
		this.current_test_name = 'ABCDE, 0 => 1';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve('ABCDE', 0), 1);
	}

	test_4() {
		this.current_test_name = 'AABBBCCCDDDEEE, 3 => 6';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve('AABBBCCCDDDEEE', 3), 6);
	}

	test_5() {
		this.current_test_name = 'ABCD, 1 => 2';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve('ABCD', 1), 2);
	}

	test_6() {
		this.current_test_name = 'AAAAA, 2 => 5';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve('AAAAA', 2), 5);
	}
}

class DailyTemperatures extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}
	test_1() {
		this.current_test_name =
			'[73, 74, 75, 71, 69, 72, 76, 73] => [1, 1, 4, 2, 1, 1, 0, 0]';
		const problemToTest = new this.Problem();
		assert.deepEqual(
			problemToTest.solve([73, 74, 75, 71, 69, 72, 76, 73]),
			[1, 1, 4, 2, 1, 1, 0, 0]
		);
	}

	test_2() {
		this.current_test_name = '[30, 40, 50, 60] => [1, 1, 1, 0]';
		const problemToTest = new this.Problem();
		assert.deepEqual(problemToTest.solve([30, 40, 50, 60]), [1, 1, 1, 0]);
	}

	test_3() {
		this.current_test_name = '[30, 40, 50, 45, 60] => [1, 1, 2, 1, 0]';
		const problemToTest = new this.Problem();
		assert.deepEqual(
			problemToTest.solve([30, 40, 50, 45, 60]),
			[1, 1, 2, 1, 0]
		);
	}
}

class LenghtOfLongestSubString extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}
	test_1() {
		this.current_test_name = 'abcabcbb => 3';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve('abcabcbb'), 3);
	}

	test_2() {
		this.current_test_name = 'bbbbb => 1';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve('bbbbb'), 1);
	}

	test_3() {
		this.current_test_name = 'pwwkew => 3';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve('pwwkew'), 3);
	}
}

class MaxProfit extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		this.current_test_name = '[7,1,5,3,6,4] => 5';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve([7, 1, 5, 3, 6, 4]), 5);
	}

	test_2() {
		this.current_test_name = '[7,6,4,3,1] => 0';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve([7, 6, 4, 3, 1]), 0);
	}

	test_3() {
		this.current_test_name = '[2,4,1] => 2';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve([2, 4, 1]), 2);
	}
}

class MinWindow extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
		this.tests.push(() => this.test_4());
		this.tests.push(() => this.test_5());
	}

	test_1() {
		this.current_test_name = 'ADOBECODEBANC, ABC => BANC';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve('ADOBECODEBANC', 'ABC'), 'BANC');
	}

	test_2() {
		this.current_test_name = 'a, a => a';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve('a', 'a'), 'a');
	}

	test_3() {
		this.current_test_name = "a, aa => ''";
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve('a', 'aa'), '');
	}

	test_4() {
		this.current_test_name = 'ADOBECODEBANCDSF, ABC => BANC';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve('AAADOBECODEBANCDSF', 'ABC'), 'BANC');
	}

	test_5() {
		this.current_test_name = 'ADOBECODEBANACDSF, AABC => BANAC';
		const problemToTest = new this.Problem();
		assert.equal(
			problemToTest.solve('AAADOBECODEBANACDSF', 'AABC'),
			'BANAC'
		);
	}
}

class MaxSlidingWindow extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		this.current_test_name = '[1,3,-1,-3,5,3,6,7], 3 => [3,3,5,5,6,7]';
		const problemToTest = new this.Problem();
		assert.deepEqual(
			problemToTest.solve([1, 3, -1, -3, 5, 3, 6, 7], 3),
			[3, 3, 5, 5, 6, 7]
		);
	}

	test_2() {
		this.current_test_name = '[1], 1 => [1]';
		const problemToTest = new this.Problem();
		assert.deepEqual(problemToTest.solve([1], 1), [1]);
	}

	test_3() {
		this.current_test_name = '[1,-1], 1 => [1,-1]';
		const problemToTest = new this.Problem();
		assert.deepEqual(problemToTest.solve([1, -1], 1), [1, -1]);
	}
}

const TEST_DICTIONARY = {
	'max-profit': MaxProfit,
	'length-of-longest-substring': LenghtOfLongestSubString,
	'character-replacement': CharacterReplacement, //Longest repeating char

	'daily-temperatures': DailyTemperatures,
	'min-window': MinWindow,
	'max-sliding-window': MaxSlidingWindow
};

module.exports = TEST_DICTIONARY;
