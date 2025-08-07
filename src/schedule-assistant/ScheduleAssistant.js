const StorableReport = require('./StorableReport');
const Functions = require('./functions');
const { Scale, NumberPrompt } = require('enquirer');

const DEBUG = false;
class ScheduleAssistant {
	// Creates the mock prompts and stores that.

	constructor() {
		// Loads the schedule-settings.json
		this.scheduleSettings = require('./data/schedule-settings.json');
		this.reportAnswers = new StorableReport();
		this.updateReportAnswer();
		this.reportPrompt = this.createReportPrompt();

		this.checkBoxKeys = [];
	}

	/**
	 * Creates the report prompt for that day if weekday not specified
	 * @param {string} weekday e.g. Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday
	 * @returns Json with the structure of the dates.
	 */
	createReportPrompt({ weekday = '' } = {}) {
		// Creates a report based on the schedule-settings.json and the current weekday
		let WEEKDAYNAME = '';
		if (weekday === '') {
			const weekdayNames = [
				'Sunday',
				'Monday',
				'Tuesday',
				'Wednesday',
				'Thursday',
				'Friday',
				'Saturday'
			];
			const today = new Date();
			const weekday = today.getDay();
			WEEKDAYNAME = weekdayNames[weekday].toUpperCase();
		}
		{
			WEEKDAYNAME = weekday.toUpperCase();
		}

		// Gets the weekday json and the common json.
		const weekdayTemplate = this.scheduleSettings?.[WEEKDAYNAME] ?? {};
		const commonTemplate = this.scheduleSettings?.COMMON ?? {};

		if (DEBUG) console.log(weekdayTemplate, commonTemplate);

		// Adds the current common fields and aggregates them in the same group of the weekday.
		const aggregatedJson = this.aggregateJsons(
			commonTemplate,
			weekdayTemplate
		);

		// Add the current date.
		aggregatedJson.date = new Functions().getCurrentDate();
		return aggregatedJson;
	}

	aggregateJsons(commonTemplate, weekdayTemplate) {
		// Aggregates the common and the weekday jsons into one json.
		const aggregatedJson = {};
		for (const key in commonTemplate?.fields) {
			aggregatedJson[key] = {
				...commonTemplate?.fields?.[key],
				...weekdayTemplate?.fields?.[key]
			};
		}
		return aggregatedJson;
	}

	async createRunablePrompts(reportPrompt) {
		const getFieldFromType = (reportPromptGroup, typeExpected) => {
			// Add the key into the properties of themselves.
			const modReportPromptGroup = Object.keys(reportPromptGroup).map(
				key => {
					const fields = reportPromptGroup[key];
					// Skip if fields is a string (Like on descriptions)
					if (typeof fields === 'string') {
						// console.log("skipping", key, fields, "because it's a string");
						return fields;
					}

					fields.key = key;

					return fields;
				}
			);
			console.log('Filtering using', modReportPromptGroup, typeExpected);
			// Returns the field from the type.
			const filtered = modReportPromptGroup.filter(
				field => field?.['TYPE'] === typeExpected
			);

			console.log('Filtered result', filtered);
			return filtered;
		};

		/**
		 * Creates the checkboxes prompts for the report.
		 * @param {Object(Type, description, links, key)>} reportPromptGroup Object containing the fields of the specific group.
		 * @param {string} group_key  e.g. "COMMON", "system", "achievements"
		 * @returns {Prompt} Checkboxes Enquire Prompt created.
		 */
		const createCheckboxPrompts = (reportPromptGroup, group_key) => {
			const checkboxFields = getFieldFromType(
				reportPromptGroup,
				'CHECKBOX'
			);
			this.checkBoxKeys.push(...checkboxFields.map(field => field?.key));

			if (checkboxFields?.length ?? 0 > 0) {
				const checkBoxes = new Scale({
					name: 'checkboxes',
					message: `${group_key}`,
					scale: [
						{ name: 0, message: 'False', value: 0 },
						{ name: 1, message: 'True', value: 1 }
					],
					choices: Object.values(checkboxFields).map(field => {
						return {
							name: field?.key,
							message: field?.key,
							initial:
								this.reportAnswers.getAnswerFor(field?.key) ??
								0,
							hint: field?.DESCRIPTION ?? ''
						};
					})
				});

				return checkBoxes;
			}
			return null;
		};

		const createBlockPrompts = (reportPromptGroup, group_key) => {
			const blockFields = getFieldFromType(reportPromptGroup, 'BLOCKS');
			if (blockFields?.length ?? 0 > 0) {
				const blocks = new Scale({
					name: 'blocks',
					message: `${group_key}`,
					scale: [
						{ name: 0, message: '0', value: 0 },
						{ name: 1, message: '1', value: 1 },
						{ name: 2, message: '2', value: 2 },
						{ name: 3, message: '3', value: 3 },
						{ name: 4, message: '4', value: 4 },
						{ name: 5, message: '5+', value: 5 }
					],
					choices: Object.values(blockFields).map(field => {
						return {
							name: field?.key,
							message: field?.key,
							initial:
								this.reportAnswers.getAnswerFor(field?.key) ??
								0,
							hint: field?.DESCRIPTION ?? ''
						};
					})
				});
				return blocks;
			}
			return null;
		};

		/**
		 *
		 * @param {Object<>} reportPromptGroup
		 * @param {string} group_key key of the group
		 * @returns {List<Prompt>} List of prompts (They shall be pushed using ... expression.)
		 */
		const createNumberPrompts = (reportPromptGroup, group_key) => {
			const numberFields = getFieldFromType(reportPromptGroup, 'NUMBER');
			if (numberFields?.length ?? 0 > 0) {
				const numberPrompts = numberFields.map(field => {
					return new Number({
						name: field?.key,
						message: field?.key,
						initial:
							this.reportAnswers.getAnswerFor(field?.key) ?? 0,
						hint: field?.DESCRIPTION ?? ''
					});
				});
				return numberPrompts;
			}
			return null;
		};

		// Displays reports, also populates the report from it's previous answers.

		// Go for each group. Then filter by CHECKBOX, then BLOCK then NUMBER then TEXT
		// Also check if the field had been asnwered before (stored in the report and complete accordingly)
		const prompts = [];
		await this.reportAnswers.getReport();
		for (const group_key in reportPrompt) {
			const checkboxPrompts = createCheckboxPrompts(
				reportPrompt[group_key],
				group_key
			);

			if (checkboxPrompts) {
				prompts.push(checkboxPrompts);
			}

			// RUN for BLOCKS second.
			const blockPrompts = createBlockPrompts(
				reportPrompt[group_key],
				group_key
			);
			if (blockPrompts) {
				prompts.push(blockPrompts);
			}

			// RUN for NUMBER third.
			const numberPrompts = createNumberPrompts(
				reportPrompt[group_key],
				group_key
			);
			if (numberPrompts) {
				prompts.push(...numberPrompts);
			}
		}

		// based on the answers populate the reportAnswers.

		// Once iterated, store the report answers
		return prompts;
	}

	async runReports(reportPrompt) {
		const prompts = await this.createRunablePrompts(reportPrompt);
		// console.log(prompts);
		for (const prompt of prompts) {
			const answers = await prompt.run();
			// let answers;

			// console.log("answers", answers);
			// Save the answers
			this.reportAnswers.addAnswers(answers);
		}
		// Fix answers
		this.reportAnswers.fixCheckAnswers(this.checkBoxKeys);
		console.log('reportAnswers', this.reportAnswers);
	}

	updateReportAnswer() {
		// Checks if the report is from yesterday, if so, uploads it and creates a new one.
		if (this.reportAnswers.getDate() !== new Date().getDay()) {
			this.uploadReport();
			// Creates new reportPrompt
			// Creates new report answers
			this.reportAnswers.cleanReport();
		}
	}

	async uploadReport() {
		// Uploads the report to the server
		console.log('Uploading report...', this.reportAnswers);
	}
}

module.exports = ScheduleAssistant;
