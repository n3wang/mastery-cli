const assert = require('assert');
const StorableReport = require('../StorableReport');
const ScheduleAssistant = require('../ScheduleAssistant');

describe('ScheduleAssistant', () => {
	it('Basic ', () => {
		assert(true);
	});

	it('Tests if it can create a report based on the weekday', () => {
		const scheduleAssistant = new ScheduleAssistant();
		const reportCreated = scheduleAssistant.createReportPrompt({
			weekday: 'Monday'
		});
		console.log('reportCreated', reportCreated);
	});

	it('Tests if the dates requires a new date.', () => {
		// Create an old date.

		const scheduleAssistant = new ScheduleAssistant();
		const reportCreated = scheduleAssistant.createReportPrompt({
			weekday: 'Monday'
		});
		console.log('reportCreated', JSON.stringify(reportCreated));
	});

	it('Tests if report generated is runnable', async () => {
		const scheduleAssistant = new ScheduleAssistant();
		const reportCreated = scheduleAssistant.createReportPrompt({
			weekday: 'Monday'
		});
		// console.log("reportCreated", reportCreated);
		// done();
		await scheduleAssistant.createRunablePrompts(reportCreated);
	});
});
