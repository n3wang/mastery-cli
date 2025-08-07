'use strict';

var assert = require('assert');

var StorableReport = require('../StorableReport');

var ScheduleAssistant = require('../ScheduleAssistant');

describe('ScheduleAssistant', function () {
	it('Basic ', function () {
		assert(true);
	});
	it('Tests if it can create a report based on the weekday', function () {
		var scheduleAssistant = new ScheduleAssistant();
		var reportCreated = scheduleAssistant.createReportPrompt({
			weekday: 'Monday'
		});
		console.log('reportCreated', reportCreated);
	});
	it('Tests if the dates requires a new date.', function () {
		// Create an old date.
		var scheduleAssistant = new ScheduleAssistant();
		var reportCreated = scheduleAssistant.createReportPrompt({
			weekday: 'Monday'
		});
		console.log('reportCreated', JSON.stringify(reportCreated)); // console.log("reportCreated length", reportCreated?.fields?.length);
	});
	it('Tests if report generated is runnable', function _callee() {
		var scheduleAssistant, reportCreated;
		return regeneratorRuntime.async(function _callee$(_context) {
			while (1) {
				switch ((_context.prev = _context.next)) {
					case 0:
						scheduleAssistant = new ScheduleAssistant();
						reportCreated = scheduleAssistant.createReportPrompt({
							weekday: 'Monday'
						}); // console.log("reportCreated", reportCreated);
						// done();

						_context.next = 4;
						return regeneratorRuntime.awrap(
							scheduleAssistant.createRunablePrompts(
								reportCreated
							)
						);

					case 4:
					case 'end':
						return _context.stop();
				}
			}
		});
	});
});
