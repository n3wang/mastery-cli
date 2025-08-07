'use strict';

/**
 * The idea is to have a terms questions generator
 * Features:
 *  Use a template of question or prompt to ask
 *  Have the ability to grab a picture from the browser (img_link)
 *  Receive from an csv with an Term, Definition, Example columns.
 * This should be useful for generating question prompts for languages, it saves everything as a constant and exports it in the module.
 */
var _require = require('../structures'),
	Term = _require.Term,
	Terminology = _require.Terminology,
	TermStorage = _require.TermStorage;

var dfd = require('danfojs-node');

var EXAMPLE_FILE = './terms/german.csv';
var COL_DEFINITION = 'definition';
var COL_TERM = 'term';
dfd.readCSV(EXAMPLE_FILE) //assumes file is in CWD
	.then(function (df) {
		var terminologiesDict = dfd.toJSON(df);
		console.log(terminologiesDict);
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (
				var _iterator = terminologiesDict[Symbol.iterator](), _step;
				!(_iteratorNormalCompletion = (_step = _iterator.next()).done);
				_iteratorNormalCompletion = true
			) {
				var row = _step.value;
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator['return'] != null) {
					_iterator['return']();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}
	})
	['catch'](function (err) {
		console.log(err);
	});
module.exports = {};
