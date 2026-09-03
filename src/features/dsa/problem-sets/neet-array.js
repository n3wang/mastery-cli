/**
 * Problems with Arrays.
 */

const assert = require('assert');
const ProblemTests = require('./problem-test');

class ThreeNumberSum extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name = '[0,1,1] => []';
		const problemToTest = new this.Problem();
		assert.deepEqual(problemToTest.solve([0, 1, 1]), []);
	}
	test_2() {
		this.current_test_name = '[-1,0,1,2,-1,-4]';
		const problemToTest = new this.Problem();
		assert.deepEqual(problemToTest.solve([-1, 0, 1, 2, -1, -4]), [
			[-1, -1, 2],
			[-1, 0, 1]
		]);
	}
}

class ContainerWithMostWater extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name = '[1,8,6,2,5,4,8,3,7] => 49';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve([1, 8, 6, 2, 5, 4, 8, 3, 7]), 49);
	}
	test_2() {
		this.current_test_name = '[1, 1]';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve([1, 1]), 1);
	}
}

class TrappingRainWater extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name = '[0,1,0,2,1,0,1,3,2,1,2,1] => 6';
		const problemToTest = new this.Problem();
		assert.equal(
			problemToTest.solve([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]),
			6
		);
	}
	test_2() {
		this.current_test_name = '[4,2,0,3,2,5]';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve([4, 2, 0, 3, 2, 5]), 9);
	}
}

const TEST_DICTIONARY = {
	'container-with-most-water': ContainerWithMostWater,
	'trapping-rain-water': TrappingRainWater,
	'three-number-sum': ThreeNumberSum
};

module.exports = TEST_DICTIONARY;
