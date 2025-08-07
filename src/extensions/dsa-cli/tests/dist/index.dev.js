'use strict';

function ownKeys(object, enumerableOnly) {
	var keys = Object.keys(object);
	if (Object.getOwnPropertySymbols) {
		var symbols = Object.getOwnPropertySymbols(object);
		if (enumerableOnly)
			symbols = symbols.filter(function (sym) {
				return Object.getOwnPropertyDescriptor(object, sym).enumerable;
			});
		keys.push.apply(keys, symbols);
	}
	return keys;
}

function _objectSpread(target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = arguments[i] != null ? arguments[i] : {};
		if (i % 2) {
			ownKeys(source, true).forEach(function (key) {
				_defineProperty(target, key, source[key]);
			});
		} else if (Object.getOwnPropertyDescriptors) {
			Object.defineProperties(
				target,
				Object.getOwnPropertyDescriptors(source)
			);
		} else {
			ownKeys(source).forEach(function (key) {
				Object.defineProperty(
					target,
					key,
					Object.getOwnPropertyDescriptor(source, key)
				);
			});
		}
	}
	return target;
}

function _defineProperty(obj, key, value) {
	if (key in obj) {
		Object.defineProperty(obj, key, {
			value: value,
			enumerable: true,
			configurable: true,
			writable: true
		});
	} else {
		obj[key] = value;
	}
	return obj;
}

// Imports TEST_DICTIONARY from helloworld.js and simple-problems.js and mergesthem into one dictionary<string, ProblemTests> object
var TEST_DICTIONARY = {};
var problem_tests_filenames = ['helloworld', 'simple-problems']; // Autopopulation of tests assuming that the tests had beend defined

for (
	var _i = 0, _problem_tests_filena = problem_tests_filenames;
	_i < _problem_tests_filena.length;
	_i++
) {
	var problem = _problem_tests_filena[_i];
	TEST_DICTIONARY = _objectSpread(
		{},
		TEST_DICTIONARY,
		{},
		require('./'.concat(problem))
	);
} // console.log("TEST_DICTIONARY", TEST_DICTIONARY);

module.exports = {
	TEST_DICTIONARY: TEST_DICTIONARY
};
