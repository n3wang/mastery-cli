const assert = require('assert');
const ProblemTests = require('./problem-test');

class BinarySearch extends ProblemTests {
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
		this.current_test_name = '[-1,0,3,5,9,12], 9 => 4';
		const problemToTest = new this.Problem();
		assert(problemToTest.solve([-1, 0, 3, 5, 9, 12], 9) == 4);
	}

	test_2() {
		this.current_test_name = '[-1,0,3,5,9,12], 2 => -1';
		const problemToTest = new this.Problem();
		assert(problemToTest.solve([-1, 0, 3, 5, 9, 12], 2) == -1);
	}

	test_3() {
		this.current_test_name = '[-1,0,3,5,9,12], 12 => 5';
		const problemToTest = new this.Problem();
		assert(problemToTest.solve([-1, 0, 3, 5, 9, 12], 12) == 5);
	}

	test_4() {
		this.current_test_name = '[-1,0,3,5,9,12], 0 => 1';
		const problemToTest = new this.Problem();
		assert(problemToTest.solve([-1, 0, 3, 5, 9, 12], 9) == 4);
	}
	test_5() {
		this.current_test_name = '[1,2,3,4,5,6], 6 => 5';
		const problemToTest = new this.Problem();
		assert(problemToTest.solve([1, 2, 3, 4, 5, 6], 6) == 5);
	}

	test_6() {
		this.current_test_name = '[2,4,6,8,10], 4 => 1';
		const problemToTest = new this.Problem();
		assert(problemToTest.solve([2, 4, 6, 8, 10], 4) == 1);
	}

	test_7() {
		this.current_test_name = '[1,3,5,7,9], 2 => -1';
		const problemToTest = new this.Problem();
		assert(problemToTest.solve([1, 3, 5, 7, 9], 2) == -1);
	}

	test_8() {
		this.current_test_name = '[1], 1 => 0';
		const problemToTest = new this.Problem();
		assert(problemToTest.solve([1], 1) == 0);
	}

	test_9() {
		this.current_test_name = '[1,3,5,7], 7 => 3';
		const problemToTest = new this.Problem();
		assert(problemToTest.solve([1, 3, 5, 7], 7) == 3);
	}

	test_10() {
		this.current_test_name = '[1,2,4,5,6], 3 => -1';
		const problemToTest = new this.Problem();
		assert(problemToTest.solve([1, 2, 4, 5, 6], 3) == -1);
	}
}

class FindMin extends ProblemTests {
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
		this.current_test_name = '[3,4,5,1,2] => 1';
		const problemToTest = new this.Problem();
		assert(problemToTest.solve([3, 4, 5, 1, 2]) == 1);
	}

	test_2() {
		this.current_test_name = '[4,5,6,7,0,1,2] => 0';
		const problemToTest = new this.Problem();
		assert(problemToTest.solve([4, 5, 6, 7, 0, 1, 2]) == 0);
	}

	test_3() {
		this.current_test_name = '[11,13,15,17] => 11';
		const problemToTest = new this.Problem();
		assert(problemToTest.solve([11, 13, 15, 17]) == 11);
	}

	test_4() {
		this.current_test_name = '[1] => 1';
		const problemToTest = new this.Problem();
		assert(problemToTest.solve([1]) == 1);
	}

	test_5() {
		this.current_test_name = '[1,2] => 1';
		const problemToTest = new this.Problem();
		assert(problemToTest.solve([1, 2]) == 1);
	}

	test_6() {
		this.current_test_name = '[2,1] => 1';
		const problemToTest = new this.Problem();
		assert(problemToTest.solve([2, 1]) == 1);
	}

	test_7() {
		this.current_test_name = '[2,3,4,5,1] => 1';
		const problemToTest = new this.Problem();
		assert(problemToTest.solve([2, 3, 4, 5, 1]) == 1);
	}
}

class KeyBasedValueStore extends ProblemTests {
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
		const test_input = [
			'TimeMap',
			'set',
			'get',
			'get',
			'set',
			'get',
			'get'
		];
		this.current_test_name =
			"['TimeMap', 'set', 'get', 'get', 'set', 'get', 'get']";

		const timeMap = new this.Problem();
		timeMap.set('foo', 'bar', 1);
		assert(timeMap.get('foo', 1) == 'bar');
		assert(timeMap.get('foo', 3) == 'bar');
		timeMap.set('foo', 'bar2', 4);
		assert(timeMap.get('foo', 4) == 'bar2');
		assert(timeMap.get('foo', 5) == 'bar2');
	}

	test_2() {
		const test_input = [
			'TimeMap',
			'set',
			'get',
			'get',
			'set',
			'get',
			'get',
			'set',
			'set',
			'get',
			'get',
			'get'
		];
		this.current_test_name =
			"['TimeMap', 'set', 'get', 'get', 'set', 'get', 'get', 'set', 'set', 'get', 'get', 'get']";

		const timeMap = new this.Problem();
		timeMap.set('apple', 'red', 1);
		assert(timeMap.get('apple', 1) == 'red');
		assert(timeMap.get('apple', 3) == 'red');
		timeMap.set('apple', 'green', 4);
		assert(timeMap.get('apple', 4) == 'green');
		timeMap.set('orange', 'orange', 1);
		timeMap.set('orange', 'orange1', 2);
		assert(timeMap.get('orange', 1) == 'orange');
		assert(timeMap.get('orange', 2) == 'orange1');
		assert(timeMap.get('orange', 3) == 'orange1');
		assert(timeMap.get('apple', 5) == 'green');
		assert(timeMap.get('banana', 5) == '');
	}

	test_3() {
		this.current_test_name = "['TimeMap', 'set', 'get', 'get']";

		const timeMap = new this.Problem();
		timeMap.set('key1', 'value1', 1);
		assert(timeMap.get('key1', 1) == 'value1');
		assert(timeMap.get('key1', 2) == 'value1');
	}

	test_4() {
		this.current_test_name = "['TimeMap', 'set', 'get']";

		const timeMap = new this.Problem();
		timeMap.set('key1', 'value1', 1);
		assert(timeMap.get('key1', 0) == '');
	}

	test_5() {
		this.current_test_name = "['TimeMap', 'set', 'get']";

		const timeMap = new this.Problem();
		timeMap.set('key1', 'value1', 1);
		assert(timeMap.get('key2', 1) == '');
	}

	test_6() {
		this.current_test_name =
			"['TimeMap', 'set', 'get', 'set', 'get', 'set', 'get']";

		const timeMap = new this.Problem();
		timeMap.set('key1', 'value1', 1);
		assert(timeMap.get('key1', 1) == 'value1');
		timeMap.set('key1', 'value2', 2);
		assert(timeMap.get('key1', 1) == 'value1');
		assert(timeMap.get('key1', 2) == 'value2');
		timeMap.set('key1', 'value3', 2);
		assert(timeMap.get('key1', 1) == 'value1');
		assert(timeMap.get('key1', 2) == 'value3');
	}

	test_7() {
		this.current_test_name =
			"['TimeMap', 'set', 'get', 'set', 'get', 'set', 'get']";

		const timeMap = new this.Problem();
		timeMap.set('key1', 'value1', 1);
		assert(timeMap.get('key1', 1) == 'value1');
		timeMap.set('key1', 'value2', 1);
		assert(timeMap.get('key1', 1) == 'value2');
		timeMap.set('key1', 'value3', 2);
		assert(timeMap.get('key1', 1) == 'value2');
		assert(timeMap.get('key1', 2) == 'value3');
	}
}

class KokoEatingBananas extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		this.current_test_name = '[3,6,7,11], 8';
		assert(new this.Problem().solve([3, 6, 7, 11], 8) == 4);
	}

	test_2() {
		this.current_test_name = '[30,11,23,4,20], 5';
		assert(new this.Problem().solve([30, 11, 23, 4, 20], 5) == 30);
	}

	test_3() {
		this.current_test_name = '[30,11,23,4,20], 6';
		assert(new this.Problem().solve([30, 11, 23, 4, 20], 6) == 23);
	}
}

class MedianSortedArrays extends ProblemTests {
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
		this.current_test_name = '[1,3], [2]';
		assert(new this.Problem().solve([1, 3], [2]) == 2.0);
	}

	test_2() {
		this.current_test_name = '[1,2], [3,4]';
		assert(new this.Problem().solve([1, 2], [3, 4]) == 2.5);
	}

	test_3() {
		this.current_test_name = '[0,0], [0,0]';
		assert(new this.Problem().solve([0, 0], [0, 0]) == 0.0);
	}

	test_4() {
		this.current_test_name = '[], [1]';
		assert(new this.Problem().solve([], [1]) == 1.0);
	}

	test_5() {
		this.current_test_name = '[2], []';
		assert(new this.Problem().solve([2], []) == 2.0);
	}

	test_6() {
		this.current_test_name = '[1,2], [3,4,5]';
		assert(new this.Problem().solve([1, 2], [3, 4, 5]) == 3.0);
	}
}

class SearchMatrix extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
		this.tests.push(() => this.test_4());
		this.tests.push(() => this.test_5());
	}

	test_1() {
		this.current_test_name = '[[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3';
		assert(
			new this.Problem().solve(
				[
					[1, 3, 5, 7],
					[10, 11, 16, 20],
					[23, 30, 34, 60]
				],
				3
			) == true
		);
	}

	test_2() {
		this.current_test_name = '[[1,3,5,7],[10,11,16,20],[23,30,34,60]], 13';
		assert(
			new this.Problem().solve(
				[
					[1, 3, 5, 7],
					[10, 11, 16, 20],
					[23, 30, 34, 60]
				],
				13
			) == false
		);
	}

	test_3() {
		this.current_test_name = '[[1,3,5,7],[10,11,16,20],[23,30,34,60]], 60';
		assert(
			new this.Problem().solve(
				[
					[1, 3, 5, 7],
					[10, 11, 16, 20],
					[23, 30, 34, 60]
				],
				60
			) == true
		);
	}

	test_4() {
		this.current_test_name = '[[1,3,5,7],[10,11,16,20],[23,30,34,60]], 1';
		assert(
			new this.Problem().solve(
				[
					[1, 3, 5, 7],
					[10, 11, 16, 20],
					[23, 30, 34, 60]
				],
				1
			) == true
		);
	}

	test_5() {
		this.current_test_name = '[[1,3,5,7],[10,11,16,20],[23,30,34,60]], 0';
		assert(
			new this.Problem().solve(
				[
					[1, 3, 5, 7],
					[10, 11, 16, 20],
					[23, 30, 34, 60]
				],
				0
			) == false
		);
	}
}

class SearchRotatedArray extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
		this.tests.push(() => this.test_4());
		this.tests.push(() => this.test_5());
	}

	test_1() {
		this.current_test_name = '[4,5,6,7,0,1,2], 0';
		assert(new this.Problem().solve([4, 5, 6, 7, 0, 1, 2], 0) == 4);
	}

	test_2() {
		this.current_test_name = '[4,5,6,7,0,1,2], 3';
		assert(new this.Problem().solve([4, 5, 6, 7, 0, 1, 2], 3) == -1);
	}

	test_3() {
		this.current_test_name = '[1], 0';
		assert(new this.Problem().solve([1], 0) == -1);
	}

	test_4() {
		this.current_test_name = '[1,3], 3';
		assert(new this.Problem().solve([1, 3], 3) == 1);
	}

	test_5() {
		this.current_test_name = '[1,3], 1';
		assert(new this.Problem().solve([1, 3], 1) == 0);
	}
}

const TEST_DICTIONARY = {
	'binary-search': BinarySearch,
	'find-min': FindMin,
	'key-based-value-store': KeyBasedValueStore,
	'koko-eating-bananas': KokoEatingBananas,
	'median-sorted-arrays': MedianSortedArrays,
	'search-matrix': SearchMatrix,
	'search-rotated-array': SearchRotatedArray
};

module.exports = TEST_DICTIONARY;
