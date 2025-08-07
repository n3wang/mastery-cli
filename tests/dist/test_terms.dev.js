'use strict';

// I will write some tests for the terms here.
var _require = require('../utils/data/terms_generator'),
	TermGenerator = _require.TermGenerator;

var assert = require('assert');

var _require2 = require('../utils/structures'),
	TermStorage = _require2.TermStorage;

var _require3 = require('../utils/data/terms'),
	populateTerms = _require3.populateTerms;

function createTermGenerator() {
	var filesData = [
		{
			title: 'mock-v1',
			filename: 'terms/mock.csv'
		}
	];
	return new TermGenerator(filesData);
}

describe('Testing Terms Generator', function () {
	it('Test if it is able to read and populate the terms json ', function _callee() {
		var termGenerator, res;
		return regeneratorRuntime.async(function _callee$(_context) {
			while (1) {
				switch ((_context.prev = _context.next)) {
					case 0:
						termGenerator = createTermGenerator();
						_context.next = 3;
						return regeneratorRuntime.awrap(
							termGenerator.fetchTerms()
						);

					case 3:
						res = _context.sent;
						// console.log(termGenerator.termStorageAsJsonList);
						assert(termGenerator.termStorageAsJsonList.length > 2);

					case 5:
					case 'end':
						return _context.stop();
				}
			}
		});
	});
	it('Test that the rows are properly populated ', function _callee2() {
		var termGenerator, res;
		return regeneratorRuntime.async(function _callee2$(_context2) {
			while (1) {
				switch ((_context2.prev = _context2.next)) {
					case 0:
						termGenerator = createTermGenerator();
						_context2.next = 3;
						return regeneratorRuntime.awrap(
							termGenerator.fetchTerms()
						);

					case 3:
						res = _context2.sent;
						first_sample_term =
							termGenerator.termStorageAsJsonList[0];
						console.log('first_sample_term', first_sample_term);
						assert(first_sample_term.term != '');
						assert(first_sample_term.prompt != '');
						assert(first_sample_term.description != '');
						assert(first_sample_term.attachment != '');
						assert(first_sample_term.example == 'Some example');
						assert(first_sample_term.category == 'mock-v1'); //Inherits from the root folder/
					// console.log(termGenerator.termStorageAsJsonList);
					// assert(termGenerator.termStorageAsJsonList.length > 2);

					case 12:
					case 'end':
						return _context2.stop();
				}
			}
		});
	});
	it('Default Prompt Alteration ', function _callee3() {
		var filesData, termGenerator, _;

		return regeneratorRuntime.async(function _callee3$(_context3) {
			while (1) {
				switch ((_context3.prev = _context3.next)) {
					case 0:
						filesData = [
							{
								title: 'mock-v1',
								filename: 'terms/mock.csv'
							}
						];
						termGenerator = new TermGenerator(filesData, {
							default_prompt: 'Some Prompt Here'
						});
						_context3.next = 4;
						return regeneratorRuntime.awrap(
							termGenerator.fetchTerms()
						);

					case 4:
						_ = _context3.sent;
						first_sample_term =
							termGenerator.termStorageAsJsonList[0];
						console.log('alterated prompt:', first_sample_term);
						assert(first_sample_term.prompt == 'Some Prompt Here');

					case 8:
					case 'end':
						return _context3.stop();
				}
			}
		});
	});
});
describe('Testing Terms using Then', function () {
	it('Test if it is able to read and populate the terms json Using then pattern', function () {
		var termGenerator = createTermGenerator();
		termGenerator
			.fetchTerms()
			.then(function () {
				// console.log(termGenerator.termStorageAsJsonList);
				assert(termGenerator.termStorageAsJsonList.length > 2);
			})
			['catch'](function (err) {
				console.log(err);
			});
	});
});
describe('Get all terms at once', function () {
	it('Populating the terms on load time?', function _callee4() {
		var terms;
		return regeneratorRuntime.async(function _callee4$(_context4) {
			while (1) {
				switch ((_context4.prev = _context4.next)) {
					case 0:
						_context4.next = 2;
						return regeneratorRuntime.awrap(populateTerms());

					case 2:
						terms = _context4.sent;
						// console.log("async terms:", terms)
						assert(terms.length > 2);

					case 4:
					case 'end':
						return _context4.stop();
				}
			}
		});
	});
});
