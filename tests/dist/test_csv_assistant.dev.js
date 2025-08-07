'use strict';

var assert = require('assert');

var _require = require('../utils/csvAssistant'),
	CSVAssistant = _require.CSVAssistant;

describe('Testing Terms Generator', function () {
	it('Tests if mapping occurs succesfully', function _callee() {
		var csvAssistant, listSolvedRows;
		return regeneratorRuntime.async(function _callee$(_context) {
			while (1) {
				switch ((_context.prev = _context.next)) {
					case 0:
						csvAssistant = new CSVAssistant();
						_context.next = 3;
						return regeneratorRuntime.awrap(
							csvAssistant.populateCoefficients()
						);

					case 3:
						listSolvedRows = _context.sent;
						assert(listSolvedRows.length > 0);
						console.log(listSolvedRows[1]);

					case 6:
					case 'end':
						return _context.stop();
				}
			}
		});
	});
	it('Test integration test, if can be saved into the csv target filepath', function _callee2() {
		var csvAssistant, _;

		return regeneratorRuntime.async(function _callee2$(_context2) {
			while (1) {
				switch ((_context2.prev = _context2.next)) {
					case 0:
						// You still have to manually check for this.
						csvAssistant = new CSVAssistant();
						_context2.next = 3;
						return regeneratorRuntime.awrap(
							csvAssistant.populateAndSave(
								'priorities/task_skills.csv',
								{
									saveAs: 'priorities/task_skills_coefficient.csv'
								}
							)
						);

					case 3:
						_ = _context2.sent;

					case 4:
					case 'end':
						return _context2.stop();
				}
			}
		});
	});
	it('Runs coefficients, saves it and returns top 3', function _callee3() {
		var csvAssistant, top3InPriority;
		return regeneratorRuntime.async(function _callee3$(_context3) {
			while (1) {
				switch ((_context3.prev = _context3.next)) {
					case 0:
						// You still have to manually check for this.
						csvAssistant = new CSVAssistant();
						_context3.next = 3;
						return regeneratorRuntime.awrap(
							csvAssistant.getTopPriorities(
								'priorities/task_skills.csv',
								{
									saveAs: 'priorities/task_skills_coefficient.csv',
									filterTop: 3
								}
							)
						);

					case 3:
						top3InPriority = _context3.sent;
						console.log(top3InPriority);
						assert(top3InPriority.length == 3);

					case 6:
					case 'end':
						return _context3.stop();
				}
			}
		});
	});
});
