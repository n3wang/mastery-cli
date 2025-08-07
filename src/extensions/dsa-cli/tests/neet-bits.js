const assert = require('assert');
const ProblemTests = require('./problem-test');

class CountingBits extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name = '(2) => [0,1,1]';
		const problemToTest = new this.Problem();
		assert.deepEqual(problemToTest.solve(2), [0, 1, 1]);
	}

	test_2() {
		this.current_test_name = '(5) => [0,1,1,2,1,2]';
		const problemToTest = new this.Problem();
		assert.deepEqual(problemToTest.solve(5), [0, 1, 1, 2, 1, 2]);
	}
}

class MissingNumber extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
		this.tests.push(() => this.test_4());
	}

	test_1() {
		this.current_test_name = '([3,0,1]) => 2';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve([3, 0, 1]), 2);
	}

	test_2() {
		this.current_test_name = '([9,6,4,2,3,5,7,0,1]) => 8';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve([9, 6, 4, 2, 3, 5, 7, 0, 1]), 8);
	}

	test_3() {
		this.current_test_name = '([0]) => 1';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve([0]), 1);
	}

	test_4() {
		this.current_test_name = '([0, 1]) => 2';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve([0, 1]), 2);
	}
}

class NumberOf1Bits extends ProblemTests {
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
		this.current_test_name = '(00000000000000000000000000001011) => 3';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve(0b1011), 3);
	}

	test_2() {
		this.current_test_name = '(00000000000000000000000010000000) => 1';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve(0o200), 1);
	}
	test_3() {
		this.current_test_name = '(11111111111111111111111111111101) => 31';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve(-3), 31);
	}

	test_4() {
		this.current_test_name = '(11111111111111111111111111111111) => 32';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve(-1), 32);
	}

	test_5() {
		this.current_test_name = '(00000000000000000000000000000000) => 0';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve(0), 0);
	}

	test_6() {
		this.current_test_name = '(11111111111111111111111111111110) => 31';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve(-2), 31);
	}

	test_7() {
		this.current_test_name = '(00000000000000000000000000000001) => 1';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve(1), 1);
	}

	test_8() {
		this.current_test_name = '(00001000000000000000000000000000) => 1';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve(0x80000000), 1);
	}
}

const TEST_DICTIONARY = {
	'counting-bits': CountingBits,
	'missing-number': MissingNumber,
	'number-of-1-bits': NumberOf1Bits
};

module.exports = TEST_DICTIONARY;
