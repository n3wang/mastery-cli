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

var fs = require('fs');

var _require = require('./functions'),
	getDirAbsoluteUri = _require.getDirAbsoluteUri;

var _require2 = require('./tests'),
	TEST_DICTIONARY = _require2.TEST_DICTIONARY;

var _require3 = require('./structures'),
	ProblemMetadata = _require3.ProblemMetadata;

var DEBUG = false;

var ProblemsManager =
	/*#__PURE__*/
	(function () {
		function ProblemsManager() {
			_classCallCheck(this, ProblemsManager);

			this.problems = {};
			this.temp_problem_filepath = './temp_problem.js';
			this.temp_test_filepath = './temp_tests.js';
		}
		/**
		 * Adds problem into the dictionary of problems.
		 * @param {ProblemMetadata} problemMetadata Object containing the information aboutthe problem.
		 */

		_createClass(ProblemsManager, [
			{
				key: 'addProblem',
				value: function addProblem(problemMetadata) {
					this.problems[problemMetadata.slug] = problemMetadata;
				}
				/**
				 * Populates the problems manager with the problems from the TEST_DICTIONARY.
				 */
			},
			{
				key: 'autoPopulateUsingTestDictionary',
				value: function autoPopulateUsingTestDictionary() {
					for (
						var _i = 0, _Object$keys = Object.keys(TEST_DICTIONARY);
						_i < _Object$keys.length;
						_i++
					) {
						var problem = _Object$keys[_i];
						this.addProblem(new ProblemMetadata(problem));
					}
				}
				/**
				 * Returns a random problem from the problems manager.
				 * @returns {Problem} A random problem from the problems manager
				 */
			},
			{
				key: 'getRandomProblem',
				value: function getRandomProblem() {
					var keys = Object.keys(this.problems);
					var randomKey =
						keys[Math.floor(Math.random() * keys.length)];
					return this.problems[randomKey];
				}
				/**
				 * Populates the template with the code inside of problem.file_path
				 * @param {dict<problem>} problem The problem to populate the template with
				 */
			},
			{
				key: 'populateTemplate',
				value: function populateTemplate(problem) {
					this.copyFile(problem.file_path);
				}
				/**
				 * Returns the right depending on the problem_metadata
				 * @param {dict<ProblemMetadata>} problem_metadata
				 * @returns {ProblemTests}
				 */
			},
			{
				key: 'selectTest',
				value: function selectTest(problem_metadata) {
					return TEST_DICTIONARY[problem_metadata.test_slug];
				}
			},
			{
				key: 'runProblem',
				value: function runProblem(problemMetadata) {
					if (DEBUG)
						console.log(
							'Getting temp_file_path from ',
							this.temp_problem_filepath
						);

					var _require4 = require(this.temp_problem_filepath),
						Problem = _require4.Problem; // const { ProblemTests } = require(this.temp_test_filepath);

					var ProblemTestsObject = this.selectTest(problemMetadata); // debug problemTestObject instance

					if (true)
						console.log(
							'ProblemTestsObject instance: ',
							ProblemTestsObject
						);
					if (DEBUG) console.log('metadata', problemMetadata.asJson);
					var problemTests = new ProblemTestsObject(Problem);
					problemTests.runTests();
				}
			},
			{
				key: 'copyFile',
				value: function copyFile(problem_file_path) {
					var absolute_problem_file_path = getDirAbsoluteUri(
						problem_file_path,
						'./base_code/'
					);
					var absolute_temp_file_path = getDirAbsoluteUri(
						this.temp_problem_filepath,
						'./'
					);
					console.log('Opening file: ' + absolute_problem_file_path);
					fs.readFile(
						absolute_problem_file_path,
						'utf8',
						function (err, data) {
							if (err) {
								return console.log(err);
							}

							fs.writeFile(
								absolute_temp_file_path,
								data,
								'utf8',
								function (err) {
									if (err) return console.log(err);
								}
							);
						}
					);
				}
			}
		]);

		return ProblemsManager;
	})();

module.exports = {
	ProblemsManager: ProblemsManager
};
