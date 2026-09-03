const assert = require('assert');
const ProblemTests = require('./problem-test');

class Candy extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		const candy = new this.Problem();
		this.current_test_name = '[1,0,2] | 5';
		assert.equal(candy.solve([1, 0, 2]), 5);
	}

	test_2() {
		const candy = new this.Problem();
		this.current_test_name = '[1,2,2] | 4';
		assert.equal(candy.solve([1, 2, 2]), 4);
	}

	test_3() {
		// [1 2 3 4 5 3 2 1 2 6 5 4 3 3 2 1 1 3 3 3 4 2]
		const candy = new this.Problem();
		this.current_test_name =
			'[1,2,3,4,5,3,2,1,2,6,5,4,3,3,2,1,1,3,3,3,4,2] | 47';
		assert.equal(
			candy.solve([
				1, 2, 3, 4, 5, 3, 2, 1, 2, 6, 5, 4, 3, 3, 2, 1, 1, 3, 3, 3, 4, 2
			]),
			47
		);
	}
}

class SubstringWithConcatenationOfAllWords extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		const sub = new this.Problem();
		this.current_test_name = '"barfoothefoobarman", ["foo","bar"]';
		assert.deepEqual(
			sub.solve('barfoothefoobarman', ['foo', 'bar']),
			[0, 9]
		);
	}

	test_2() {
		const sub = new this.Problem();
		this.current_test_name =
			'"wordgoodgoodgoodbestword", ["word","good","best","word"]';
		assert.deepEqual(
			sub.solve('wordgoodgoodgoodbestword', [
				'word',
				'good',
				'best',
				'word'
			]),
			[]
		);
	}

	test_3() {
		const sub = new this.Problem();
		this.current_test_name =
			'"barfoofoobarthefoobarman", ["bar","foo","the"]';
		assert.deepEqual(
			sub.solve('barfoofoobarthefoobarman', ['bar', 'foo', 'the']),
			[6, 9, 12]
		);
	}
}

const TEST_DICTIONARY = {
	candy: Candy,
	'substring-with-concatenation-of-all-words':
		SubstringWithConcatenationOfAllWords
};

module.exports = TEST_DICTIONARY;
