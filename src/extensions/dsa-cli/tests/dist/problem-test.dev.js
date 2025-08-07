'use strict';

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function');
	}
}

function _defineProperties(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ('value' in descriptor) descriptor.writable = true;
		Object.defineProperty(target, descriptor.key, descriptor);
	}
}

function _createClass(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties(Constructor, staticProps);
	return Constructor;
}

var chalk = require('chalk');

var ProblemTests =
	/*#__PURE__*/
	(function () {
		function ProblemTests(Problem) {
			_classCallCheck(this, ProblemTests);

			this.Problem = Problem;
			this.tests = [];
			this.current_test_name = '';
			this.count_of_tests = 0;
		}

		_createClass(ProblemTests, [
			{
				key: 'runTests',
				value: function runTests() {
					var count_of_tests = this.tests.length;
					this.count_of_tests = count_of_tests;
					var count_test_succeed = 0;

					for (
						var test_number = 1;
						test_number <= count_of_tests;
						test_number++
					) {
						var test = this.tests[test_number - 1];
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
				}
			},
			{
				key: 'printAllTestsSuccess',
				value: function printAllTestsSuccess() {
					console.log(
						chalk.green(
							'All '.concat(this.count_of_tests, ' tests passed')
						)
					);
				}
			},
			{
				key: 'printCurrentTestSuccess',
				value: function printCurrentTestSuccess() {
					console.log(
						chalk.green(
							'Test '.concat(this.current_test_name, ' passed')
						)
					);
				}
			},
			{
				key: 'printCurrentTestFailed',
				value: function printCurrentTestFailed() {
					console.log(
						chalk.red(
							'Test '.concat(this.current_test_name, ' failed')
						)
					);
				}
			},
			{
				key: 'individualTestReport',
				value: function individualTestReport() {
					var _ref =
							arguments.length > 0 && arguments[0] !== undefined
								? arguments[0]
								: {},
						test_number = _ref.test_number,
						count_of_tests = _ref.count_of_tests;

					console.log(
						'Test '
							.concat(test_number, '/')
							.concat(count_of_tests, ': ')
							.concat(this.current_test_name)
					);
				}
			}
		]);

		return ProblemTests;
	})();

module.exports = ProblemTests;
