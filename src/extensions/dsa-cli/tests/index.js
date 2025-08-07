// Imports TEST_DICTIONARY from helloworld.js and simple-problems.js and mergesthem into one dictionary<string, ProblemTests> object

let TEST_DICTIONARY = {};
const problem_tests_filenames = [
	'helloworld',
	'simple-problems',
	'neet-array',
	'neet-sliding-windows',
	'neet-stack',
	'neet-binary-search',
	'regex',
	'neet-linked-list',
	'neet-trees',
	'neet-tries',
	'neet-heap',
	'neet-backtracking',
	'neet-graphs',
	'neet-dp',
	'neet-intervals',
	'neet-greedy',
	'neet-bits',
	'neet-math',
	'algo-hard',
	'leet-mid',
	'leet-hard',
	'leet-advanced',
	'leet-dynamic-programming',
	'leet-grand-dynamic-programming',
	'leet-graph',
	'leet-dynamic-programming',
	'leet-challanges-2023',
	'pseudocode'
];

const algoexpert_categories = [
	'algo-searching',
	'algo-sorting',
	'algo-hard',
	'algo-very-hard'
];

const ProblemTests = require('./problem-test');

// , 'ai-search'

let PROBLEM_COUNT_PER_CATEGORY_TEST_NAME = {};

// Autopopulation of tests assuming that the tests had beend defined
for (let problem_category_test_name of problem_tests_filenames) {
	const tests_of_the_problem_category = require(`./${problem_category_test_name}`);

	TEST_DICTIONARY = { ...TEST_DICTIONARY, ...tests_of_the_problem_category };

	PROBLEM_COUNT_PER_CATEGORY_TEST_NAME[problem_category_test_name] =
		Object.keys(tests_of_the_problem_category).length;
}

// console.log("TEST_DICTIONARY", TEST_DICTIONARY);
module.exports = { TEST_DICTIONARY, PROBLEM_COUNT_PER_CATEGORY_TEST_NAME };
