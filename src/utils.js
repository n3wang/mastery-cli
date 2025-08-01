/**
 * Core Utilities for Mastery CLI
 * 
 * This file contains the main Mastery class and utility functions that power
 * the entire learning system. Think of this as the brain of the application!
 * 
 * For beginners: This handles:
 * - Progress tracking and reporting
 * - Flashcard and quiz sessions  
 * - Command routing and execution
 * - Local data storage and statistics
 */

const chalk = require('chalk');
const clipboard = require('copy-paste')

const chart = require('./local-modules/terminal-charts')
const { exec } = require('node:child_process');
const { Toggle, Confirm, prompt, AutoComplete, Survey, Input } = require('enquirer');


const init = require('./init.js');
const constants = require('./constants.js');

const { bar, bg, annotation, radar } = chart;

const { QuizzerWithDSA } = require('./QuizzerWithDSA');
const { MAID_NAME, getRandomMaidEmoji, appendQuotes, APIDICT, CONSTANTS, get_random, formatObjectFeatures, countDecimals } = constants;
const { getMaidDirectory } = require('./utils_functions.js');

const Settings = require('./settings.js');
const SettingsManager = require('./SettingsManager.js');




const { Quizzer: FlashQuizzer } = require(
	"./Quizzer.js"
);

const { LocalStorage } = require('./LocalStorage.js');

const localStorageInstance = new LocalStorage();
localStorageInstance.load();

// https://www.npmjs.com/package/chalk

class DayWeather {
	constructor(jsonDay) {
		const SNOW = "snow";
		const RAIN = "rain";

		this.datetime = jsonDay?.datetime;
		this.description = jsonDay?.description;
		this.isPrecipitation = jsonDay.preciptype ? true : false;

		this.hasSnow = this.isPrecipitation ? jsonDay.preciptype.includes(SNOW) : false;
		this.hasRain = this.isPrecipitation ? jsonDay.preciptype.includes(RAIN) : false;
		this.probability = jsonDay.precipprob ? jsonDay.precipprob : 0;
		this.day = this.datetime.slice(-2);
	}
}

const COLORWEATHERMAP = {
	snow: 'white',
	rain: 'blue',
	clear: 'yellow'
}

class WeatherInformation {
	// A wrapper for weather information. that populates itself


	constructor(jsonData) {
		this.json = jsonData;
		this.days_report = jsonData.data.days.map(
			dayJSON => {
				return new DayWeather(dayJSON)
			}
		)

		this.barData = this.days_report.slice(0, 7).map(dWeather => {
			let barColor = dWeather.isPrecipitation ? dWeather.hasSnow ? COLORWEATHERMAP.snow : COLORWEATHERMAP.rain : COLORWEATHERMAP.clear;

			const bar = { key: dWeather.day, value: dWeather.probability, style: bg(barColor) };
			return bar;

		})
		// console.log(bar(barData))
	}

	chartWeatherBar() {
		console.log(bar(this.barData));
		this.printWeatherAnnotations()
	}

	printWeatherAnnotations() {
		const notes = Object.keys(COLORWEATHERMAP).map((weatherlabel) => {
			return { key: weatherlabel, style: bg(COLORWEATHERMAP[weatherlabel]) };
		})
		console.log(annotation(notes))
	}
}


/**
 * Structure for Bar Charting
 */
class FeatureExtraction {

	constructor(feature_name, feature_key = 'feat', style = bg('white'), getDayOnly = true) {
		this.feature_name = feature_name;
		this.feature_key = feature_key;
		this.style = style;
	}
};


const { get } = require('node:http');
const { strict } = require('node:assert');
const { parse } = require('node:path');
const { reverse } = require('node:dns');

function withOnlineCheck(fn) {
	return async function (...args) {
		if (!Settings?.online) {
			console.log('Offline, modify in data\\settings.json');
			return {};
		}
		return await fn.apply(this, args);
	};
}




/**
 * Mastery - The main learning management system
 * 
 * This is the core class that manages your entire learning experience.
 * For beginners: Think of this as your personal study assistant that:
 * - Tracks what you've learned and when
 * - Suggests what to study next
 * - Handles all the different study modes (flashcards, coding, quizzes)
 * - Saves your progress automatically
 */
class Mastery {

	constructor(Settings = {}, masterDeck, name = MAID_NAME, headerColor = '#1da1f2', clearOnTalk = false) {
		this.Settings = Settings;
		this.name = name;
		this.headerColor = headerColor;
		this.clearOnTalk = clearOnTalk;
		this.missing_features_today = []; // Features you haven't practiced today

		// The main quiz system that handles flashcards and algorithm problems
		this.mQuizer = new QuizzerWithDSA(constants.qmathformulas, constants.qmathenabled, masterDeck, this);

		this.populateMissingReport = withOnlineCheck(this.populateMissingReport.bind(this));
		this.login = withOnlineCheck(this.login.bind(this));
		this.dayReport = withOnlineCheck(this.dayReport.bind(this));
		this.provideMissingReport = withOnlineCheck(this.provideMissingReport.bind(this));
		this.populateMissingReport = withOnlineCheck(this.populateMissingReport.bind(this));
		this.performanceReport = withOnlineCheck(this.performanceReport.bind(this));
		this.services = withOnlineCheck(this.services.bind(this));


		// Command handlers - these map command names to their functions
		// For beginners: When you type 'mastery quiz', it calls the 'quiz' handler
		this.commandHandlers = {
			'hello': () => { this.say('Hello!') },
			'code': () => { this.tellCurrentDirectory() },
			'coa': () => { // Commit, add, and push code changes

				const run = async () => {

					commitpush();
					this.increasePerformance('feat', { score: 1 });
					if (Settings.ask_quiz_when_commit) {
						await this.mQuizer.askQuestion();
					}

				};

				run();
			},
			'poh': () => {

				const run = async () => {

					pushOriginHead();
					this.increasePerformance('feat', { score: 1 });
					if (Settings.ask_quiz_when_commit) {
						await this.mQuizer.askQuestion();
					}
				}
				run();
			},
			'log': () => { // Log work session (like a pomodoro timer)
				this.say("Logging 30 minutes of work");
			},
			'skill': () => { // Show skill progress reports
				this.getSkillReports();
			},
			'services': () => { this.services() },
			'math': () => { this.mQuizer.ask_math_question() }, // Practice math problems
			'quiz': () => { this.mQuizer.askQuestion() }, // Mixed quiz session
			'imath': () => { this.increasePerformance('math_ss') }, // Increase math score
			'term': () => { this.mQuizer.pick_and_ask_term_question() }, // Flashcard study
			'clean': () => { this.askToClean() }, // Clear terminal screen
			'ses': () => { this.mQuizer.study_session() }, // Study session
			'lastses': () => { // Study session in reverse order
				this.mQuizer.study_session(
					{ reverse: true }
				)
			},
			'reset-queues': async () => { // Reset study session queues while preserving hash data
				const { Input, Confirm } = require('enquirer');
				
				const confirmReset = new Confirm({
					name: 'confirm',
					message: 'Reset study session progress? (Hash completion data will be preserved)',
					initial: false
				});
				
				const shouldReset = await confirmReset.run();
				if (!shouldReset) {
					console.log('Queue reset cancelled.');
					return;
				}
				
				const categoryInput = new Input({
					name: 'category',
					message: 'Reset specific category (leave empty for all):',
					initial: ''
				});
				
				const category = await categoryInput.run();
				const categoryParam = category.trim() === '' ? null : category.trim();
				
				await this.mQuizer.resetStudySessionQueues(categoryParam);
			},
			'cses': () => { this.mQuizer.cloze_study_session() }, // Fill-in-the-blank session
			'mcses': () => { // Markdown cloze session (pseudocode mode)
				this.mQuizer.cloze_study_session({
					md_pseudo_mode: true
				})
			},
			'amses': () => { this.mQuizer.algorithmic_study_session() }, // Algorithm session
			'mamses': () => { // Markdown algorithm session (pseudocode mode)
				this.mQuizer.algorithmic_study_session({
					md_pseudo_mode: true
				})
			},
			'report': () => { // Generate comprehensive progress report
				this.getSkillReports();
				this.generateOfflinePerformanceReport({ localStorageInstance, version: "tables" })
			},
			'entries': () => { // Search for specific learning entries
				// Get skill name and term from command line arguments
				let skill_name = process.argv[3] ?? "";
				let deck_term = process.argv[4] ?? "";

				if (skill_name == "") {
					console.log("Please provide a skill name to search for entries");
					return;
				}

				this.get_entries({
					skill_name: skill_name,
					deck_term: deck_term,
				});
			}
		};
	}



	login = async () => {

		if (!Settings?.online) {
			console.log('Offline, should not get comments');
			return {}
		}


	}

	say(message, clearOnTalk = this.clearOnTalk) {

		if (clearOnTalk) init(true);
		console.log(` ${chalk(message)}`);
	}

	tellCurrentDirectory = () => {
		const projectDirectory = getMaidDirectory();
		this.say(projectDirectory);
		clipboard.copy(projectDirectory);
	}

	runServer = () => {

		const projectDirectory = getMaidDirectory();
		const jupyter_folder = "/utils/data-science-cli/problems";

		const jupyterCommand = `jupyter notebook --notebook-dir=${projectDirectory}/${jupyter_folder}`;
		exec(jupyterCommand);
	}


	/**
	 * Cleans the terminal
	 */
	cleanTerminal = () => {
		console.clear();
	}

	// Prompts y/n question to clean, if y, cleans.
	askToClean = async () => {

		// const response = question('clean', 'y/n', { type: 'confirm' });
		const cleanPrompt = new Confirm({
			name: 'clean',
			message: "Would you like me to clean up the terminal?",
			initial: true
		});
		const response = await cleanPrompt.run();
		console.log(response)
		if (response) {
			this.cleanTerminal();
		}

	}

	get_entries = ({ head = 5, skill_name = "", deck_term = "" }) => {

		localStorageInstance.load().then(() => {
			/**
			 * Returns the entries of the skill_name in the deck_term
			 * @param {number} head - The number of entries to return
			 * @param {string} skill_name - The name of the skill to search for
			 * @param {string} deck_term - The term of the deck to search for
			*/
			const entries = localStorageInstance.get_entries({ head, skill_name, deck_term });
			if (entries.length == 0) {
				console.log(`No entries found for ${skill_name} in ${deck_term}`);
			}
			else {
				console.table(entries);
			}
			return entries;
		});
	}

	/**
	 * Prints the day report based on the settings
	 * - Performance Report: A table report stating the counts of each feature
	 * - Weather Report: A bar chart of the weather for the next 7 days
	 * - Missing Report: A list of the missing features for the day
	 * 		- If the if `ask-if-algo-missing` is true, it will ask if the user wants to run the `algo` trainer (If the user haven't completed his first algorithm in the day.)
	 */
	dayReport = async () => {

		const todaydate = getToday()

		if (Settings?.report_show?.performance_summary) {
			this.say(`Performance Report: ${todaydate}`, false)
			await this.performanceReport();
		}

		if (Settings?.report_show?.missing_report) {
			this.say(`Missing Report: ${todaydate}, dsa enabled: ${true}`, false)
			await this.provideMissingReport({ ask_if_dsa_missing: Settings?.report_show?.ask_if_algo_missing ?? false });
		}


	}

	/**
	 * Prints the missing objectives
	 * !important: To prepopulate the msising report first!!
	 */
	provideMissingReport = async ({ ask_if_dsa_missing = false } = {}) => {
		try {

			if (!this.missingFeatReport) {
				const _ = await this.populateMissingReport();
			}

			if (Settings?.report_show?.obj_ournal) {
				const journal_notes = Settings.journal_notes;
				console.log(journal_notes);
			}

		}
		catch (err) {
			console.log("Error in provideMissingReport", err)
		}
	}



	/**
	 *  precalculated asynchronous at the start, since usually the missing Feat report is to be shown at the end of the math thing.
	 *  */
	populateMissingReport = async () => {

	}


	async generateOfflinePerformanceReport({ localStorageInstance, version = "tables" } = {}) {
		try {
			await localStorageInstance.load();

			// This line is surprisingly important to ensure the localStorageInstance is loaded before proceeding.
			console.log("\nreports loaded\n", localStorageInstance.absolute_uri);
			
			const feat_rules = getObjectiveFeatures();
			
			// Use built-in day and week methods
			const today_scores = localStorageInstance.get_day_logs({ windows_n: 0 }).selected_date;
			const yesterday_scores = localStorageInstance.get_day_logs({ windows_n: 1 }).selected_date;
			const week_scores = localStorageInstance.get_week_log();
			console.log("Today Scores", today_scores);
			console.log("Yesterday Scores", yesterday_scores);
			console.log("Week Scores", week_scores);

			let userPerformanceData = {
				today: {},
				week_sum: {},
				week_average: {}
			};

			// Fill in today and week data
			for (const feat in today_scores) {
				userPerformanceData.today[feat] = today_scores[feat].value;
			}

			const roundDec = (number) => {
				try {
					return parseFloat(number.toFixed(2));
				} catch {
					return number;
				}
			}


			for (const feat in week_scores) {
				const total = week_scores[feat].value;
				const today = userPerformanceData.today[feat] ?? 0;
				userPerformanceData.today[feat] = today;
				userPerformanceData.week_sum[feat] = `${total - today} -> ${total}`;
				userPerformanceData.week_average[feat] = `${roundDec((total - today) / 6)} -> ${roundDec(total / 7)}`;
			}

			// Evaluate performance against rules
			const features_accomplished_today = {};
			for (const [requirement_key, settings] of Object.entries(feat_rules)) {
				if (settings.day) {
					const actual = userPerformanceData.today[requirement_key] ?? 0;
					const diff = settings.day - actual;
					features_accomplished_today[`d: ${requirement_key}`] = {
						miss: diff < 0 ? "✅" : diff,
						type: "day",
						req: settings.day
					};
				}
				if (settings.week) {
					const actual = userPerformanceData.week_sum[requirement_key] ?? 0;
					const diff = settings.week - actual;
					features_accomplished_today[`w: ${requirement_key}`] = {
						miss: diff < 0 ? "✅" : diff,
						type: "week",
						req: settings.week
					};
				}
			}

			// console.log("Offline Performance Report");
			// console.log(today_scores);
			// console.log("Week Scores", week_scores);
			// console.log("User Performance Data", userPerformanceData);

			console.table(userPerformanceData);


		} catch (err) {
			console.error("Error generating offline performance report", err);
		}
	}




	performanceReport = async ({ version = "tables" } = {}) => {

	}


	printUserPerformanceDataSummary(userPerformanceData) {
		// Print this month
		// This week average
		// Today data

		const STATS = ['week_average_exclude_today', 'today', 'month'];

		for (const stat of STATS) {
			this.printPerformanceStat(stat, userPerformanceData);

		}

	}

	printPerformanceStat(label, userPerformanceData) {
		let statPerformance = userPerformanceData[label]
		statPerformance = formatObjectFeatures(statPerformance)

		console.log(label, statPerformance);
	}




	// Features is a list of FeatureExtraction
	barChartFeatures = (data, features, lasts = 2) => {
		/**
		 * Based on the key it should identify the 
		 */
		// const LASTXCHARS = 5;
		let bars = features.map((feature) => {
			// Attempt getting that from data or return a 0 as the bar information.
			const feat_value = data.hasOwnProperty(feature.feature_name) ? data[feature.feature_name][feature.feature_key] : 0;
			const feat_name_len = feature.feature_name.length;
			const lastCharacters = lasts > feat_name_len ? 0 : feat_name_len - lasts;
			const feat_name = lasts > 0 ? feature.feature_name.substring(lastCharacters) : feature.feature_name
			const bar = { key: feat_name, value: feat_value != undefined ? feat_value : 0, style: feature.style }
			return bar;

		})
		// KEEP for debugging. It will throw error if any of the values are undefined

		console.log(bar(bars))

	}



	services = async () => {

		const choices = [
			// 'get_credential',
			// 'forecast_costs',
			// 'usd_to_ars',
			// 'currency_exchange',
			// 'create_credential',
			'swap_double_single_quotes'
		]

		const CHOICE_CREDENTIAL = 0, CHOICE_COSTS = 1, CHOICE_USD_TO_ARS = 2, CHOICE_CURRENCY_EXCHANGE = 3, CHOICE_CREATE_CREDENTIAL = 4, CHOICE_SWAP_QUOTES = 5;

		const multiselect = new AutoComplete({
			name: 'ServiceOption',
			message: 'What to do on services?',
			choices: choices
		})

		let serviceSelected = await multiselect.run();

		// if services == get_credi

		if (serviceSelected == choices[CHOICE_CREDENTIAL].value && Settings.account_settings.access_credentials_enabled) {


			// Show credentials available

		} else if (serviceSelected == choices[CHOICE_USD_TO_ARS].value) {
			
		} else if (serviceSelected == choices[CHOICE_CURRENCY_EXCHANGE].value) {
			// Prompt from what to what to exchange.

			const fromCurrency = new AutoComplete({
				name: 'fromCurrency',
				message: 'Which Currency from?',
				choices: Object.keys(constants.CURRENCY_SIMBOLS)
			})

			const toCurrency = new AutoComplete({
				name: 'toCurrency',
				message: 'Which Currency to?',
				choices: Object.keys(constants.CURRENCY_SIMBOLS)
			})

			let fromCurrencySelected = await fromCurrency.run();
			let toCurrencySelected = await toCurrency.run();

		}
		else if (serviceSelected == choices[CHOICE_CREATE_CREDENTIAL].value) {


		}
		else if (serviceSelected == choices[CHOICE_SWAP_QUOTES].value) {
			let input = await Input({
				name: choices[CHOICE_SWAP_QUOTES].value,
				message: "Enter string to convert"
			});
			input.replaceAll("'", "$_'")
			input.replaceAll("\"", "$_\"")
			input.replaceAll("$_\"", "'")
			input.replaceAll("$_'", "\"")

		}
		else {
			console.log(choices[CHOICE_CREDENTIAL]);
			console.log(serviceSelected);
		}


	}



	ask = async () => {
		// Asking some random fnction

		const choices = [
			'currency symbol for...',
			// 'forecast_costs',
			// 'usd_to_ars',
			// 'currency_exchange'
		]

		const CHOICE_CURRENCY = 0;

		const multiselect = new AutoComplete({
			name: 'question',
			message: 'What do you want to know?',
			choices: choices
		})

		let serviceSelected = await multiselect.run();

		// if services == get_credi

		console.log("service Selected", serviceSelected);
		if (serviceSelected == choices[CHOICE_CURRENCY].value) {

			const currencySelect = new AutoComplete({
				name: 'currency',
				message: 'Which currency?',
				choices: Object.values(constants.CURRENCY_SIMBOLS)
			})

			let currencySelected = await currencySelect.run();
			this.say(`${currencySelected} => ${getKeyByValue(constants.CURRENCY_SIMBOLS, currencySelected)}`);

		}


	}

	increasePerformance(feature_name, feature_key = 'feat', value = 1) {
		/**
		 * Increases the performance of a feature by the value specified.
		 * @param {str} feature_name: The name of the feature to increase
		 * @param {str} feature_key: The key of the feature to increase, e.g. 'feat', 'acad', 'pro', etc.
		 * @param {int} value: The value to increase the performance by, default 1
		 * @param {int} account_id ?= 1 : The account id to increase the performance; default Settings account_id or 1
		 */
		localStorageInstance.load().then(() => {
			localStorageInstance.log_feat(feature_name, { score: value });
		}).catch((err) => {
			console.error("Error increasing performance", err);
		});

	}

	// log_skill_experience(skill_name, { score = 1, deck_id ='', deck_term = "", comment="", reattempts=0 } = {}) {
	logSkillExperience(skill_name, { score = 1, deck_id = '', deck_term = "", comment = "", reattempts = 0, increase_performance = false, performance_feature = 'term' } = {}) {
		localStorageInstance.load().then(() => {
			localStorageInstance.log_skill_experience(skill_name, {
				score: score,
				deck_id: deck_id,
				deck_term: deck_term,
				comment: comment,
				reattempts: reattempts
			});
			if (increase_performance) {
				localStorageInstance.log_feat(performance_feature, { score: score });
			}
		}).catch((err) => {
			console.error("Error logging skill experience", err);
		}
		);
	}

	getSkillReports({ cleanScreen = false } = {}) {
		// wait for load.
		{
			localStorageInstance.load().then(() => {
				const today = new Date().toISOString().slice(0, 10);
				const windows_n = 30;
				const windows_days_ago = new Date();
				windows_days_ago.setDate(windows_days_ago.getDate() - windows_n);
				const windows_days_ago_str = windows_days_ago.toISOString().slice(0, 10);

				if (cleanScreen) {
					this.say(`Skill Reports from ${windows_days_ago_str} -> ${today}\n`);
				}
				localStorageInstance.get_skills_reports({
					'windows_n': windows_n,
				});
			}).catch((err) => {
				console.error("Error loading skills reports", err);
			});
		}
	}

}




/**
 * Based on the speciffied feature it returns the corresponsive barcharts
 */
populateLastDaysFeaturesBarCharts = (days = 7, feature = 'feat') => {

	const lastWeekInclusive = getArrayLastXDays(days);
	const todayDay = lastWeekInclusive[lastWeekInclusive.length - 1];
	const yesterdayDay = lastWeekInclusive[lastWeekInclusive.length - 2];
	return lastWeekInclusive.map(date => {
		let bgcolor = bg('white');
		if (todayDay == date) {
			bgcolor = bg('yellow');
		} else if (date == yesterdayDay) {
			bgcolor = bg('blue');
		}
		return new FeatureExtraction(date, feature, bgcolor);
	})

}

/**
 * Expected output: {month: {}, lastweek: {}, yesterday: {}, today: {}}
 */
populateLastDaysPerformanceReport = (days = 7) => {
	const lastWeekInclusive = getArrayLastXDays(days);


}



getArrayLastXDays = (days = 7) => {
	const pastDays = [...Array(days).keys()].map(index => {
		const date = new Date();
		date.setDate(date.getDate() - (days - 1 - index));

		return date.toISOString().slice(0, 10);
	});

	// console.log(pastDays);
	return pastDays;
}


/**
 * Updates the count of times a concept has been practiced e.g. `algebra-problem-1` or 'js-how-to-loop'
 * @param {str} problem_name: The name of the problem to update
 * @param {bool} success ?= true : If to whether to increase the success count or the fail count
 * @param {int} account_id ?= 1 : The account id to increase the performance; default Settings account_id or 1
 * 
 * @returns {"message": f"Success updating {concept_term}, {conceptSelected.correct_times}"}
 */
updateConcept = withOnlineCheck(async (problem_name, success = true, account_id = Settings.account_id ?? 1) => {

})


/**
 * based on the `objectives_features` at Settings returns in the format of:
 * 
	const feat_rules = {
		terms: {
			description: "Terminologies practiced",
			week: 100
		},
		pro: {
			description: "Professional Projects",
			week: 3 * 5
		},
		feat: {
			description: "Features for personal projects",
			week: 1 * 5 + 2 * 3
		},
		acad: {
			description: "Academic Projects / Assignments / notes added",
			week: 1 * 5
		}
		...
	}
	 */
function getObjectiveFeatures() {

	const feat_rules = Settings.objectives_features ?? [];
	/** Receives in the format of:
	 * 
	 * [
		{
			"feature_key": "commits",
			"description": "The number of git commits to be done",
			"req_type": "day",
			"requirement": 3
		},
		{
			"feature_key": "feat",
			"description": "The amount of Personal Project Features to be released",
			"req_type": "week",
			"requirement": 11
		},
	 */

	// Format in the expected format.
	let feat_map = {};
	for (const feat_rule of feat_rules) {
		// connect the feature lapse to the requiremnett
		feat_map[feat_rule.feature_key] = {}
		feat_map[feat_rule.feature_key][feat_rule.req_type] = feat_rule.requirement;
	}

	return feat_map;

}

function getKeyByValue(object, value) {
	return Object.keys(object).find(key => object[key] === value);
}

const getCredentialNames = (credentialDict) => {
	return credentialDict.map(cred => {
		return cred.name
	})
}

/**
 * Retrieves fromt the json the proper credentials as n object
 */
const getCredentialInformation = (credentialsDict, credential_name) => {

	res = credentialsDict.filter(
		(cred) => cred.name == credential_name
	)
	return res.length > 0 ? res[0] : {};
}


const getToday = () => {
	// Returns as string format: "2022/12/09" 
	return new Date().toJSON().slice(0, 10).replace(/-/g, '/');
}





class CommitCategoryType {
	constructor(code, icon_list, feature_name = "") {
		this.code = code;
		this.icon_list = icon_list;

		if (feature_name == "") {
			this.features_name = code;
		} else {
			this.feature_name = feature_name;
		}

	}

	randomIcon() {
		return get_random(this.icon_list);
	}

	toString() {
		return this.code;
	}

};


const getCommitCategories = () => {
	let commitCategories = {}
	const commit_categories_settings = Settings.commit_categories ?? [];

	for (const commit_categories_setting_row of commit_categories_settings) {
		const code_key = commit_categories_setting_row.code;
		commitCategories[code_key] = new CommitCategoryType(code_key, commit_categories_setting_row.icon_list, commit_categories_setting_row.code);
	}

	return commitCategories;
}



/**
 * Pushes to origin with a commit message
 * If it contains any of the specials categories (configurable in settings.js) it will log it in the feature (habit) database.
 * @param {bool} addMaidEmoji ?= true : If to whether to add a maid emoji
 * @param {bool} addCommitEmoji ?= true : If to whether to add a commit emoji
 * @param {List: [date: comment]} comments_to_populate ?= [] : List of comments to populate
 * 
 * @Setting {bool} log_special_categories ?= true : Setting to whether to log special categories
 * 
 * @returns {List: [date: comment]}
 * 
 */
const commitpush = () => {


	let commitMessage = process.argv[3];
	// if (debug) {
	// 	console.log(commitMessage)

	// }
	if (commitMessage == undefined || commitMessage == "") {
		commitMessage = CONSTANTS.default_commit_message;
	}

	exec(`git add --all && git commit -m ${commitMessage} && git push origin HEAD `);
	console.log(`Pushed commit: ${commitMessage}`);
	return true;
}

const pushOriginHead = () => {
	exec(`git push origin HEAD `);
	return true;
}

/**
 * 
 * @param {string} term the term to search for comments
 * @param {number} count the number of comments to retrieve
 * @returns {Map<date:<date: comment>>}
 */
const getComments = async (term, count = 5) => {

	if (!Settings?.online) {
		console.log('Offline, should not get comments');
		return {}
	}

	return {}

}


/** 
 * Prints the comments in a nice format
 * @param {Map<date:<date: comment>>} comments e.g. [
  { '2023-04-07': 'feat: debug' },
  { '2023-04-07': 'feat: special category' }
]
*/
const printComments = (comments) => {


	for (const row in comments) {
		const obj = comments[row]
		console.log(`${chalk.hex(CONSTANTS.CUTEBLUE).inverse(`${Object.keys(obj)?.[0]} ` ?? "date")} ${Object.values(obj)?.[0] ?? "1"}`);
	}
}





/**
 * 
 * @param {string} commitMessage Message to commit
 * @param {bool} strict If true, it will only detect categories when they appear followed by '|' e.g. 'feat |'
 * @returns {string} category code e.g. 'feat'
 */
const commitCategory = (commitMessage, strict = false) => {


	for (category of Object.values(getCommitCategories())) {

		if (strict) {
			if (commitMessage.includes(category.code + " |")) {
				return category;
			}

		}
		else {
			if (commitMessage.includes(category.code)) {
				return category;
			}
		}
	}
	return ""; //No category at all.
}

const autorelease = () => {
	// Maid can auto-release herself

	let commitMessage = process.argv[3];
	if (commitMessage == undefined) {
		exec(`maid coa && make new m ="random commit"`);
	} else {

		exec(`maid coa && make new m="${commitMessage}"`);
	}
}


const inreasePerformanceOffline = (feature_name, increaseBY = 1) => {

}

module.exports = {
	commitpush, autorelease, printComments,
	Mastery, getToday, FlashQuizzer,
	commitCategory, getComments,
	localStorageInstance
};
