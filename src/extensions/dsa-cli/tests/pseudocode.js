const assert = require('assert');
const ProblemTests = require('./problem-test');

class Pseudocode extends ProblemTests {
	constructor(Problem) {
		super(Problem);
	}

	runTests() {
		super.runTests();
		//  console.log("No tests ");
	}
}

const problems = [
	'score-of-a-string',
	'corporation_count_repetitions',
	'brick-wall',
	'task-scheduler',
	'find-the-celebrity',
	'longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit',
	'minimum-number-of-k-consecutive-bit-flips',
	'put-boxes-into-the-warehouse-ii',
	'binary-search-tree-to-greater-sum-tree',
	'balance-a-binary-search-tree',
	'count-substrings-without-repeating-character',

	'longest-palindromic-subsequence',

	'longest-substring-without-repeating-characters'
];

// All problems here are pseudocodes problems. no tests.
let TEST_DICTIONARY = {};

for (let problem of problems) {
	TEST_DICTIONARY[problem] = Pseudocode;
}

module.exports = TEST_DICTIONARY;
