const chalk = require('chalk');

class ProblemTests {
	constructor(Problem) {
		this.Problem = Problem;
		this.tests = [];
		this.current_test_name = '';
		this.count_of_tests = 0;
	}

	/**
	 * Runs all the tests from the problemTest Object.
	 * @returns {ProblemTests} Returns the current instance of ProblemTests
	 */
	runTests() {
		const count_of_tests = this.tests.length;
		this.count_of_tests = count_of_tests;
		let count_test_succeed = 0;

		for (
			let test_number = 1;
			test_number <= count_of_tests;
			test_number++
		) {
			const test = this.tests[test_number - 1];
			this.individualTestReport({
				test_number: test_number,
				count_of_tests: count_of_tests
			});
			try {
				test();
				this.printCurrentTestSuccess();
				count_test_succeed++;
			} catch (error) {
				this.printCurrentTestFailed();
				console.log(error);
			}
		}

		if (count_test_succeed == count_of_tests) {
			this.printAllTestsSuccess();
		}

		// Return True if all tests passed, False otherwise
		return count_test_succeed == count_of_tests;
	}

	printAllTestsSuccess() {
		console.log(chalk.green(`All ${this.count_of_tests} tests passed`));
	}

	printCurrentTestSuccess() {
		console.log(chalk.green(`Test ${this.current_test_name} ||  passed`));
	}

	printCurrentTestFailed() {
		console.log(chalk.red(`Test ${this.current_test_name} failed`));
	}

	individualTestReport({ test_number, count_of_tests } = {}) {
		console.log(
			`Test ${test_number}/${count_of_tests}: ${this.current_test_name}`
		);
	}
}

module.exports = ProblemTests;
