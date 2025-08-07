const assert = require('assert');
const ProblemTests = require('./problem-test');

class RegexProblem_1 extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		console.log('regexProblem_1 constructor ran');
	}

	test_1() {
		this.current_test_name =
			'The hackerrank team is on a mission to flatten the world by restructuring the hackerrank DNA of every company on the planet. We rank programmers based on their coding skills, helping companies source great programmers and reduce the time to hire. As a result, we are revolutionizing the way companies discover and evaluate talented engineers. The hackerrank platform is the destination for the best engineers to hone their skills and companies to find top engineers.';
		const problemToTest = new this.Problem();
		const test_string = this.current_test_name;
		assert.deepEqual(problemToTest.solve(test_string), [
			'hackerrank',
			'hackerrank',
			'hackerrank'
		]);
	}
}

const TEST_DICTIONARY = {
	'regex-1': RegexProblem_1
};

module.exports = TEST_DICTIONARY;
