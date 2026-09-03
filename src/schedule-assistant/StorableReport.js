const { JsonDB, Config } = require('../local-modules/json-db');
const { ensureVaultPath } = require('../vault');
const Functions = require('./functions');

const DEBUG = false;

class StorableReport {
	constructor({ filename = 'schedule-report', autosave = true } = {}) {
		// Resolve inside the vault. A bare relative name here made JsonDB write
		// ./report into whatever directory the CLI happened to be launched from.
		this.filename = ensureVaultPath(`progress/${filename}`);
		this.autosave = autosave;

		this.db = new JsonDB(new Config(this.filename, true, false, '/'));
		this.getReport().then(reportData => {
			this.report = reportData;
		});
	}

	getDate() {
		// console.log("this.report", this.report);
		return this.report?.date;
	}

	increaseAnswerFor(key) {
		if (!this.report?.[key]) {
			this.report[key] = 0;
		}
		if (this.report?.[key] !== undefined) {
			this.report[key]++;
		}
	}

	decreaseAnswerFor(key) {
		if (!this.report?.[key]) {
			this.report[key] = 0;
		}
		if (this.report?.[key] !== undefined) {
			this.report[key]--;
		}
	}

	fixCheckAnswers(listOfChekBoxesKeys) {
		// Change the answer of those keys that are in listOfChekBoxesKeys wheres are otehr than 1 or 0 to 0
		for (const key of listOfChekBoxesKeys) {
			const answer = this.getAnswerFor(key);
			if (answer !== 1 && answer !== 0) {
				this.report[key] = 0;
			}
		}
		this.saveReport();
	}

	addAnswers(answers) {
		// A dict will be passsed in you want to merge this with the input.
		const thisanswers = this.report ?? {};
		this.report = { ...thisanswers, ...answers };
		this.saveReport();
	}

	getAnswerFor(key, { defaultvalue = 0 } = {}) {
		console.log('this.report', key, this.report[key]);
		return this.report?.[key] ?? defaultvalue;
	}

	cleanReport() {
		this.report = {};
		this.report.date = new Functions().getCurrentDate();
	}

	async getReport() {
		try {
			const data = await this.db.getData('/');
			if (DEBUG) console.log('data', data);
			this.report = data;
			return data;
		} catch (error) {
			console.error(error);
			return {};
		}
	}

	saveReport() {
		try {
			this.db.push('/', this.report);
		} catch (error) {
			console.error(error);
		}
	}

	setReport(report) {
		this.report = report;
		this.saveReport();
	}
}

module.exports = StorableReport;
