const assert = require('assert');
const ProblemTests = require('./problem-test');

class MultiplyStrings extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name = "('2', '3') => '6'";
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve('2', '3'), '6');
	}

	test_2() {
		this.current_test_name = "('123', '456') => '56088'";
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve('123', '456'), '56088');
	}
}

class PlusOne extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name = '([1,2,3]) => [1,2,4]';
		const problemToTest = new this.Problem();
		assert.deepEqual(problemToTest.solve([1, 2, 3]), [1, 2, 4]);
	}

	test_2() {
		this.current_test_name = '([4,3,2,1]) => [4,3,2,2]';
		const problemToTest = new this.Problem();
		assert.deepEqual(problemToTest.solve([4, 3, 2, 1]), [4, 3, 2, 2]);
	}
}

function approximatelyEqual(a, b, tolerance) {
	return Math.abs(a - b) < tolerance;
}

class PowX extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		this.current_test_name = '(2.00000, 10) => 1024.00000';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve(2.0, 10), 1024.0);
	}

	test_2() {
		this.current_test_name = '(2.10000, 3) => 9.26100';
		const problemToTest = new this.Problem();
		assert(approximatelyEqual(problemToTest.solve(2.1, 3), 9.261, 0.00001));
	}

	test_3() {
		this.current_test_name = '(2.00000, -2) => 0.25000';
		const problemToTest = new this.Problem();
		assert.equal(problemToTest.solve(2.0, -2), 0.25);
	}
}

class RotateImage extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name =
			'([[1,2,3],[4,5,6],[7,8,9]]) => [[7,4,1],[8,5,2],[9,6,3]]';
		const problemToTest = new this.Problem();
		const matrix = [
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9]
		];
		problemToTest.solve(matrix);
		assert.deepEqual(matrix, [
			[7, 4, 1],
			[8, 5, 2],
			[9, 6, 3]
		]);
	}

	test_2() {
		this.current_test_name =
			'([[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]) => [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]';
		const problemToTest = new this.Problem();
		const matrix = [
			[5, 1, 9, 11],
			[2, 4, 8, 10],
			[13, 3, 6, 7],
			[15, 14, 12, 16]
		];

		problemToTest.solve(matrix);
		assert.deepEqual(matrix, [
			[15, 13, 2, 5],
			[14, 3, 4, 1],
			[12, 6, 8, 9],
			[16, 7, 10, 11]
		]);
	}
}

class SetMatrixZeroes extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name =
			'([[1,1,1],[1,0,1],[1,1,1]]) => [[1,0,1],[0,0,0],[1,0,1]]';
		const problemToTest = new this.Problem();
		const matrix = [
			[1, 1, 1],
			[1, 0, 1],
			[1, 1, 1]
		];
		problemToTest.solve(matrix);
		assert.deepEqual(matrix, [
			[1, 0, 1],
			[0, 0, 0],
			[1, 0, 1]
		]);
	}

	test_2() {
		this.current_test_name =
			'([[0,1,2,0],[3,4,5,2],[1,3,1,5]]) => [[0,0,0,0],[0,4,5,0],[0,3,1,0]]';

		const problemToTest = new this.Problem();
		const matrix = [
			[0, 1, 2, 0],
			[3, 4, 5, 2],
			[1, 3, 1, 5]
		];
		problemToTest.solve(matrix);
		assert.deepEqual(matrix, [
			[0, 0, 0, 0],
			[0, 4, 5, 0],
			[0, 3, 1, 0]
		]);
	}
}

class SpiralMatrix extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		this.current_test_name =
			'([[1,2,3],[4,5,6],[7,8,9]]) => [1,2,3,6,9,8,7,4,5]';
		const problemToTest = new this.Problem();
		assert.deepEqual(
			problemToTest.solve([
				[1, 2, 3],
				[4, 5, 6],
				[7, 8, 9]
			]),
			[1, 2, 3, 6, 9, 8, 7, 4, 5]
		);
	}

	test_2() {
		this.current_test_name =
			'([[1,2,3,4],[5,6,7,8],[9,10,11,12]]) => [1,2,3,4,8,12,11,10,9,5,6,7]';
		const problemToTest = new this.Problem();
		assert.deepEqual(
			problemToTest.solve([
				[1, 2, 3, 4],
				[5, 6, 7, 8],
				[9, 10, 11, 12]
			]),
			[1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]
		);
	}
}

class ThreeNumberSum extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		this.current_test_name =
			'([12, 3, 1, 2, -6, 5, -8, 6], 0) => [[-8, 2, 6], [-8, 3, 5], [-6, 1, 5]]';
		const problemToTest = new this.Problem();
		assert.deepEqual(problemToTest.solve([12, 3, 1, 2, -6, 5, -8, 6], 0), [
			[-8, 2, 6],
			[-8, 3, 5],
			[-6, 1, 5]
		]);
	}

	test_2() {
		this.current_test_name = '([8, 10, -2, 49, 14], 57) => []';
		const problemToTest = new this.Problem();
		assert.deepEqual(problemToTest.solve([8, 10, -2, 49, 14], 57), []);
	}

	test_3() {
		this.current_test_name =
			'([12, 3, 1, 2, -6, 5, 0, -8, -1], 0) => [[-8, 3, 5], [-6, 1, 5], [-1, 0, 1]]';
		const problemToTest = new this.Problem();
		assert.deepEqual(
			problemToTest.solve([12, 3, 1, 2, -6, 5, 0, -8, -1], 0),
			[
				[-8, 3, 5],
				[-6, 1, 5],
				[-1, 0, 1]
			]
		);
	}
}

const TEST_DICTIONARY = {
	'multiply-strings': MultiplyStrings,
	'plus-one': PlusOne,
	'powx-n': PowX,
	'rotate-image': RotateImage,
	'set-matrix-zeroes': SetMatrixZeroes,
	'spiral-matrix': SpiralMatrix,
	'three-number-sum': ThreeNumberSum
};

module.exports = TEST_DICTIONARY;
