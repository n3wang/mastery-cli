const ScheduleAssistant = require('../ScheduleAssistant');

const scheduleAssistant = new ScheduleAssistant();
const reportCreated = scheduleAssistant.createReportPrompt({
	weekday: 'Monday'
});

(async () => {
	await scheduleAssistant.runReports(reportCreated);
})();
