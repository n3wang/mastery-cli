const StorableReport = require('../StorableReport');
const assert = require('assert');

describe('StorableReport', function () {
	describe('#getDate()', function () {
		it('should return the date of the report', async function () {
			// Seed a report first. This used to rely on a ./report file left
			// behind by an earlier run, which is why it passed by accident.
			const seed = new StorableReport();
			seed.cleanReport();
			seed.saveReport();

			const report = new StorableReport();
			await report.getReport();
			const date = report.getDate();
			assert(typeof date === 'string');
		});

		it('Clean report popualtes an empty date', async function () {
			const storableReport = new StorableReport();
			storableReport.cleanReport();
			const date = storableReport.getDate();
			console.log('date should be today', date);
			console.log(
				'report should only contain the date',
				storableReport.report
			);
		});
	});

	describe('#setReport(report)', function () {
		it('should update the report data with the provided report', function () {
			const report = new StorableReport();
			const newReport = { date: '2022-01-01', value: 42 };
			report.setReport(newReport);
			assert.deepEqual(report.report, newReport);
		});

		it('should update the report data with the provided report', async function () {
			const report = new StorableReport();
			const newReport = { date: '2022-01-01', value: 10 };
			report.setReport(newReport);

			// Sets the reports to a new instance and checks if the report is the same.
			const anotherReport = new StorableReport();
			await anotherReport.getReport();
			assert.deepEqual(newReport, anotherReport.report);
			console.log(newReport, anotherReport.report);
		});
	});
});
