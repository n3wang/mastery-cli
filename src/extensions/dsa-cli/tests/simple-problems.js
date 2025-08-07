const assert = require('assert');
const ProblemTests = require('./problem-test');

class SimpleSum extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
	}

	test_1() {
		this.current_test_name = 'sums 1 + 1 = 2';
		const problemToTest = new this.Problem();
		assert(problemToTest.solve(1, 1) == 2);
	}
	test_2() {
		this.current_test_name = 'sums 2 + -2 = 0';
		const problemToTest = new this.Problem();
		assert(problemToTest.solve(2, -2) == 0);
	}
}

class SimpleDivision extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name = 'divides 10 by 2 and returns 5';
		const problemToTest = new this.Problem();
		assert(problemToTest.solve(10, 2) == 5);
	}

	test_2() {
		this.current_test_name = 'divides 10 by 0 and returns undefined';
		const problemToTest = new this.Problem();
		assert(problemToTest.solve(10, 0) == undefined);
	}
}

class SimpleSubtraction extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name = 'subtracts 5 from 10 and returns 5';
		const problemToTest = new this.Problem();
		assert(problemToTest.solve(10, 5) == 5);
	}

	test_2() {
		this.current_test_name = 'subtracts -5 from 5 and returns 10';
		const problemToTest = new this.Problem();
		assert(problemToTest.solve(5, -5) == 10);
	}
}

const TEST_DICTIONARY = {
	'simple-sum': SimpleSum,
	'simple-division': SimpleDivision,
	'simple-substraction': SimpleSubtraction
};

module.exports = TEST_DICTIONARY;
