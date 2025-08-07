'use strict';

var ScheduleAssistant = require('../ScheduleAssistant');

var scheduleAssistant = new ScheduleAssistant();
var reportCreated = scheduleAssistant.createReportPrompt({
	weekday: 'Monday'
});

(function _callee() {
	return regeneratorRuntime.async(function _callee$(_context) {
		while (1) {
			switch ((_context.prev = _context.next)) {
				case 0:
					_context.next = 2;
					return regeneratorRuntime.awrap(
						scheduleAssistant.runReports(reportCreated)
					);

				case 2:
				case 'end':
					return _context.stop();
			}
		}
	});
})();
