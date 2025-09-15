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
const clipboard = require('copy-paste');
const fs = require('fs');
const path = require('path');

const chart = require('./local-modules/terminal-charts');
const { exec } = require('node:child_process');
const {
	Toggle,
	Confirm,
	prompt,
	AutoComplete,
	Survey,
	Input
} = require('enquirer');

const init = require('./init.js');
const constants = require('./constants.js');

const { bar, bg, annotation, radar } = chart;

const { QuizzerWithDSA } = require('./QuizzerWithDSA');
const {
	MAID_NAME,
	getRandomMaidEmoji,
	appendQuotes,
	APIDICT,
	CONSTANTS,
	get_random,
	formatObjectFeatures,
	countDecimals
} = constants;
const { getMaidDirectory } = require('./utils_functions.js');

const Settings = require('./settings.js');

const { Quizzer: FlashQuizzer } = require('./Quizzer.js');

const { LocalStorage } = require('./LocalStorage.js');

const localStorageInstance = new LocalStorage();
localStorageInstance.load();

// https://www.npmjs.com/package/chalk

class DayWeather {
	constructor(jsonDay) {
		const SNOW = 'snow';
		const RAIN = 'rain';

		this.datetime = jsonDay?.datetime;
		this.description = jsonDay?.description;
		this.isPrecipitation = jsonDay.preciptype ? true : false;

		this.hasSnow = this.isPrecipitation
			? jsonDay.preciptype.includes(SNOW)
			: false;
		this.hasRain = this.isPrecipitation
			? jsonDay.preciptype.includes(RAIN)
			: false;
		this.probability = jsonDay.precipprob ? jsonDay.precipprob : 0;
		this.day = this.datetime.slice(-2);
	}
}

const COLORWEATHERMAP = {
	snow: 'white',
	rain: 'blue',
	clear: 'yellow'
};

class WeatherInformation {
	// A wrapper for weather information. that populates itself

	constructor(jsonData) {
		this.json = jsonData;
		this.days_report = jsonData.data.days.map(dayJSON => {
			return new DayWeather(dayJSON);
		});

		this.barData = this.days_report.slice(0, 7).map(dWeather => {
			let barColor = dWeather.isPrecipitation
				? dWeather.hasSnow
					? COLORWEATHERMAP.snow
					: COLORWEATHERMAP.rain
				: COLORWEATHERMAP.clear;

			const bar = {
				key: dWeather.day,
				value: dWeather.probability,
				style: bg(barColor)
			};
			return bar;
		});
		// console.log(bar(barData))
	}

	chartWeatherBar() {
		console.log(bar(this.barData));
		this.printWeatherAnnotations();
	}

	printWeatherAnnotations() {
		const notes = Object.keys(COLORWEATHERMAP).map(weatherlabel => {
			return {
				key: weatherlabel,
				style: bg(COLORWEATHERMAP[weatherlabel])
			};
		});
		console.log(annotation(notes));
	}
}

/**
 * Structure for Bar Charting
 */
class FeatureExtraction {
	constructor(
		feature_name,
		feature_key = 'feat',
		style = bg('white'),
		getDayOnly = true
	) {
		this.feature_name = feature_name;
		this.feature_key = feature_key;
		this.style = style;
	}
}

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
	constructor(
		Settings = {},
		masterDeck,
		name = MAID_NAME,
		headerColor = '#1da1f2',
		clearOnTalk = false
	) {
		this.Settings = Settings;
		this.name = name;
		this.headerColor = headerColor;
		this.clearOnTalk = clearOnTalk;
		this.missing_features_today = []; // Features you haven't practiced today

		// Terms data will be lazily loaded when needed
		this.masterDeck = masterDeck;
		this.termsLoaded = masterDeck !== null;

		// The main quiz system that handles flashcards and algorithm problems
		this.mQuizer = new QuizzerWithDSA(
			constants.qmathformulas,
			constants.qmathenabled,
			masterDeck,
			this
		);

		this.populateMissingReport = withOnlineCheck(
			this.populateMissingReport.bind(this)
		);
		this.login = withOnlineCheck(this.login.bind(this));
		this.dayReport = withOnlineCheck(this.dayReport.bind(this));
		this.provideMissingReport = withOnlineCheck(
			this.provideMissingReport.bind(this)
		);
		this.populateMissingReport = withOnlineCheck(
			this.populateMissingReport.bind(this)
		);
		this.performanceReport = withOnlineCheck(
			this.performanceReport.bind(this)
		);
		this.services = withOnlineCheck(this.services.bind(this));

		// Initialize command handlers after all setup
		this.initializeCommandHandlers();
	}

	/**
	 * Lazily loads terms data when first needed
	 * @returns {Promise} Promise that resolves when terms are loaded
	 */
	async ensureTermsLoaded() {
		if (!this.termsLoaded) {
			console.log('Loading terms data...');
			const { populateMasterDeck } = require('./terms_data/terms');
			this.masterDeck = await populateMasterDeck();
			this.mQuizer.masterDeck = this.masterDeck;
			// Update the terms array in the quizzer
			this.mQuizer.terms = [];
			const allTerms = this.masterDeck.listTerms();
			this.mQuizer.terms.push(...allTerms);
			this.termsLoaded = true;
			console.log(`Terms data loaded successfully. Total terms available: ${allTerms.length}`);
		}
		return this.masterDeck;
	}

	// Initialize command handlers
	initializeCommandHandlers() {
		// Command handlers - these map command names to their functions
		// For beginners: When you type 'mastery quiz', it calls the 'quiz' handler
		this.commandHandlers = {
			hello: () => {
				this.say('Hello!');
			},
			code: () => {
				this.tellCurrentDirectory();
			},
			setting: () => {
				this.displaySettingsPaths();
			},
			coa: () => {
				// Commit, add, and push code changes

				const run = async () => {
					commitpush();
					this.increasePerformance('feat', { score: 1 });
					if (Settings.ask_quiz_when_commit) {
						await this.ensureTermsLoaded();
						return this.mQuizer.smallTermsSession({
							to_answer_correctly: 3,
							loop_max: 20
						});
					}
				};

				run();
			},
			poh: () => {
				const run = async () => {
					pushOriginHead();
					this.increasePerformance('feat', { score: 1 });
					if (Settings.ask_quiz_when_commit) {
						await this.ensureTermsLoaded();
						return this.mQuizer.smallTermsSession({
							to_answer_correctly: 3,
							loop_max: 20
						});
					}
				};
				run();
			},
			log: () => {
				// Log work session (like a pomodoro timer)
				this.say('Logging 30 minutes of work');
			},
			skill: () => {
				// Show skill progress reports
				this.getSkillReports();
			},
			services: () => {
				this.services();
			},
			math: () => {
				this.mQuizer.ask_math_question();
			}, // Practice math problems
			quiz: async () => {
				await this.ensureTermsLoaded();
				return this.mQuizer.smallTermsSession({
					to_answer_correctly: 3,
					loop_max: 20
				});
			}, // Mixed quiz session
			imath: () => {
				this.increasePerformance('math_ss');
			}, // Increase math score
			term: async () => {
				await this.ensureTermsLoaded();
				return this.mQuizer.pick_and_ask_term_question();
			}, // Flashcard study
			clean: () => {
				this.askToClean();
			}, // Clear terminal screen
			ses: async () => {
				await this.ensureTermsLoaded();
				return this.mQuizer.study_session();
			}, // Study session
			lastses: async () => {
				// Study session in reverse order
				await this.ensureTermsLoaded();
				return this.mQuizer.study_session({ reverse: true });
			},
			'reset-queues': async () => {
				// Reset study session queues while preserving hash data
				const { Input, Confirm } = require('enquirer');

				const confirmReset = new Confirm({
					name: 'confirm',
					message:
						'Reset study session progress? (Hash completion data will be preserved)',
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
				const categoryParam =
					category.trim() === '' ? null : category.trim();

				await this.mQuizer.resetStudySessionQueues(categoryParam);
			},
			cses: async () => {
				await this.ensureTermsLoaded();
				return this.mQuizer.cloze_study_session();
			}, // Fill-in-the-blank session
			mcses: async () => {
				// Markdown cloze session (pseudocode mode)
				await this.ensureTermsLoaded();
				return this.mQuizer.cloze_study_session({
					md_pseudo_mode: true
				});
			},
			amses: async () => {
				await this.ensureTermsLoaded();
				return this.mQuizer.algorithmic_study_session();
			}, // Algorithm session
			mamses: async () => {
				// Markdown algorithm session (pseudocode mode)
				await this.ensureTermsLoaded();
				return this.mQuizer.algorithmic_study_session({
					md_pseudo_mode: true
				});
			},
			report: () => {
				// Generate comprehensive progress report
				this.getSkillReports();
				this.generateOfflinePerformanceReport({
					localStorageInstance,
					version: 'tables'
				});
			},
			entries: () => {
				// Search for specific learning entries
				// Get skill name and term from command line arguments
				let skill_name = process.argv[3] ?? '';
				let deck_term = process.argv[4] ?? '';

				if (skill_name == '') {
					console.log(
						'Please provide a skill name to search for entries'
					);
					return;
				}

				this.get_entries({
					skill_name: skill_name,
					deck_term: deck_term
				});
			},
			'create-module': () => {
				this.createTermModule();
			},
			masks: () => {
				this.manageMasks();
			}
		};
	}

	login = async () => {
		if (!Settings?.online) {
			console.log('Offline, should not get comments');
			return {};
		}
	};

	say(message, clearOnTalk = this.clearOnTalk) {
		if (clearOnTalk) init(true);
		console.log(` ${chalk(message)}`);
	}

	tellCurrentDirectory = () => {
		const projectDirectory = getMaidDirectory();
		this.say(projectDirectory);
		clipboard.copy(projectDirectory);
	};
	displaySettingsPaths = () => {
		const path = require('path');
		const fs = require('fs');
		const { ExtensionManager } = require('./extensions/ExtensionManager');

		console.log('\n=== Available Settings Files ===\n');

		// Main settings file
		const mainSettingsPath = path.resolve(__dirname, 'user_data', 'settings.json');
		if (fs.existsSync(mainSettingsPath)) {
			console.log(`📁 Main Settings: ${mainSettingsPath}`);
		} else {
			console.log(`📁 Main Settings: ${mainSettingsPath} (not found)`);
		}

		// Extension settings
		console.log('\n--- Extension Settings ---');
		try {
			const extensionManager = new ExtensionManager(
				path.join(__dirname, 'extensions'),
				{ info: () => { }, error: () => { }, warn: () => { } }
			);

			const context = { flags: {}, masteryManager: this, settings: this.Settings };
			extensionManager.loadAllExtensions(context);

			const extensions = extensionManager.getStatus().extensions;

			if (extensions.length === 0) {
				console.log('No extensions found.');
			} else {
				extensions.forEach(ext => {
					if (ext.settingsPath) {
						const fullPath = path.resolve(__dirname, ext.settingsPath);
						const exists = fs.existsSync(fullPath);
						console.log(`📄 ${ext.name}: ${fullPath}${exists ? '' : ' (not found)'}`);
					} else {
						console.log(`📄 ${ext.name}: No settings file configured`);
					}
				});
			}
		} catch (error) {
			console.log('Error loading extensions:', error.message);
		}

		console.log('\nUse these paths to modify application and extension settings.');
	};

	runServer = () => {
		const projectDirectory = getMaidDirectory();
		const jupyter_folder = '/utils/data-science-cli/problems';

		const jupyterCommand = `jupyter notebook --notebook-dir=${projectDirectory}/${jupyter_folder}`;
		exec(jupyterCommand);
	};

	/**
	 * Cleans the terminal
	 */
	cleanTerminal = () => {
		console.clear();
	};

	// Prompts y/n question to clean, if y, cleans.
	askToClean = async () => {
		// const response = question('clean', 'y/n', { type: 'confirm' });
		const cleanPrompt = new Confirm({
			name: 'clean',
			message: 'Would you like me to clean up the terminal?',
			initial: true
		});
		const response = await cleanPrompt.run();
		console.log(response);
		if (response) {
			this.cleanTerminal();
		}
	};

	get_entries = ({ head = 5, skill_name = '', deck_term = '' }) => {
		localStorageInstance.load().then(() => {
			/**
			 * Returns the entries of the skill_name in the deck_term
			 * @param {number} head - The number of entries to return
			 * @param {string} skill_name - The name of the skill to search for
			 * @param {string} deck_term - The term of the deck to search for
			 */
			const entries = localStorageInstance.get_entries({
				head,
				skill_name,
				deck_term
			});
			if (entries.length == 0) {
				console.log(
					`No entries found for ${skill_name} in ${deck_term}`
				);
			} else {
				console.table(entries);
			}
			return entries;
		});
	};

	/**
	 * Prints the day report based on the settings
	 * - Performance Report: A table report stating the counts of each feature
	 * - Weather Report: A bar chart of the weather for the next 7 days
	 * - Missing Report: A list of the missing features for the day
	 * 		- If the if `ask-if-algo-missing` is true, it will ask if the user wants to run the `algo` trainer (If the user haven't completed his first algorithm in the day.)
	 */
	dayReport = async () => {
		const todaydate = getToday();

		if (Settings?.report_show?.performance_summary) {
			this.say(`Performance Report: ${todaydate}`, false);
			await this.performanceReport();
		}

		if (Settings?.report_show?.missing_report) {
			this.say(
				`Missing Report: ${todaydate}, dsa enabled: ${true}`,
				false
			);
			await this.provideMissingReport({
				ask_if_dsa_missing:
					Settings?.report_show?.ask_if_algo_missing ?? false
			});
		}
	};

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
		} catch (err) {
			console.log('Error in provideMissingReport', err);
		}
	};

	/**
	 *  precalculated asynchronous at the start, since usually the missing Feat report is to be shown at the end of the math thing.
	 *  */
	populateMissingReport = async () => { };

	async generateOfflinePerformanceReport({
		localStorageInstance,
		version = 'tables'
	} = {}) {
		try {
			await localStorageInstance.load();

			// This line is surprisingly important to ensure the localStorageInstance is loaded before proceeding.
			console.log(
				'\nreports loaded\n',
				localStorageInstance.absolute_uri
			);

			const feat_rules = getObjectiveFeatures();

			// Use built-in day and week methods
			const today_scores = localStorageInstance.get_day_logs({
				windows_n: 0
			}).selected_date;
			const yesterday_scores = localStorageInstance.get_day_logs({
				windows_n: 1
			}).selected_date;
			const week_scores = localStorageInstance.get_week_log();
			console.log('Today Scores', today_scores);
			console.log('Yesterday Scores', yesterday_scores);
			console.log('Week Scores', week_scores);

			let userPerformanceData = {
				today: {},
				week_sum: {},
				week_average: {}
			};

			// Fill in today and week data
			for (const feat in today_scores) {
				userPerformanceData.today[feat] = today_scores[feat].value;
			}

			const roundDec = number => {
				try {
					return parseFloat(number.toFixed(2));
				} catch {
					return number;
				}
			};

			for (const feat in week_scores) {
				const total = week_scores[feat].value;
				const today = userPerformanceData.today[feat] ?? 0;
				userPerformanceData.today[feat] = today;
				userPerformanceData.week_sum[feat] = `${total - today
					} -> ${total}`;
				userPerformanceData.week_average[feat] = `${roundDec(
					(total - today) / 6
				)} -> ${roundDec(total / 7)}`;
			}

			// Evaluate performance against rules
			const features_accomplished_today = {};
			for (const [requirement_key, settings] of Object.entries(
				feat_rules
			)) {
				if (settings.day) {
					const actual =
						userPerformanceData.today[requirement_key] ?? 0;
					const diff = settings.day - actual;
					features_accomplished_today[`d: ${requirement_key}`] = {
						miss: diff < 0 ? '✅' : diff,
						type: 'day',
						req: settings.day
					};
				}
				if (settings.week) {
					const actual =
						userPerformanceData.week_sum[requirement_key] ?? 0;
					const diff = settings.week - actual;
					features_accomplished_today[`w: ${requirement_key}`] = {
						miss: diff < 0 ? '✅' : diff,
						type: 'week',
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
			console.error('Error generating offline performance report', err);
		}
	}

	performanceReport = async ({ version = 'tables' } = {}) => { };

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
		let statPerformance = userPerformanceData[label];
		statPerformance = formatObjectFeatures(statPerformance);

		console.log(label, statPerformance);
	}

	// Features is a list of FeatureExtraction
	barChartFeatures = (data, features, lasts = 2) => {
		/**
		 * Based on the key it should identify the
		 */
		// const LASTXCHARS = 5;
		let bars = features.map(feature => {
			// Attempt getting that from data or return a 0 as the bar information.
			const feat_value = data.hasOwnProperty(feature.feature_name)
				? data[feature.feature_name][feature.feature_key]
				: 0;
			const feat_name_len = feature.feature_name.length;
			const lastCharacters =
				lasts > feat_name_len ? 0 : feat_name_len - lasts;
			const feat_name =
				lasts > 0
					? feature.feature_name.substring(lastCharacters)
					: feature.feature_name;
			const bar = {
				key: feat_name,
				value: feat_value != undefined ? feat_value : 0,
				style: feature.style
			};
			return bar;
		});
		// KEEP for debugging. It will throw error if any of the values are undefined

		console.log(bar(bars));
	};

	services = async () => {
		const choices = [
			// 'get_credential',
			// 'forecast_costs',
			// 'usd_to_ars',
			// 'create_credential',
			'swap_double_single_quotes'
		];

		const CHOICE_CREDENTIAL = 0,
			CHOICE_COSTS = 1,
			CHOICE_USD_TO_ARS = 2,
			CHOICE_CREATE_CREDENTIAL = 3,
			CHOICE_SWAP_QUOTES = 4;

		const multiselect = new AutoComplete({
			name: 'ServiceOption',
			message: 'What to do on services?',
			choices: choices
		});

		let serviceSelected = await multiselect.run();

		// if services == get_credi

		if (
			serviceSelected == choices[CHOICE_CREDENTIAL].value &&
			Settings.account_settings.access_credentials_enabled
		) {
			// Show credentials available
		} else if (serviceSelected == choices[CHOICE_USD_TO_ARS].value) {
		} else if (serviceSelected == choices[CHOICE_CREATE_CREDENTIAL].value) {
		} else if (serviceSelected == choices[CHOICE_SWAP_QUOTES].value) {
			let input = await Input({
				name: choices[CHOICE_SWAP_QUOTES].value,
				message: 'Enter string to convert'
			});
			input.replaceAll("'", "$_'");
			input.replaceAll('"', '$_"');
			input.replaceAll('$_"', "'");
			input.replaceAll("$_'", '"');
		} else {
			console.log(choices[CHOICE_CREDENTIAL]);
			console.log(serviceSelected);
		}
	};


	increasePerformance(feature_name, feature_key = 'feat', value = 1) {
		/**
		 * Increases the performance of a feature by the value specified.
		 * @param {str} feature_name: The name of the feature to increase
		 * @param {str} feature_key: The key of the feature to increase, e.g. 'feat', 'acad', 'pro', etc.
		 * @param {int} value: The value to increase the performance by, default 1
		 * @param {int} account_id ?= 1 : The account id to increase the performance; default Settings account_id or 1
		 */
		localStorageInstance
			.load()
			.then(() => {
				localStorageInstance.log_feat(feature_name, { score: value });
			})
			.catch(err => {
				console.error('Error increasing performance', err);
			});
	}

	// log_skill_experience(skill_name, { score = 1, deck_id ='', deck_term = "", comment="", reattempts=0 } = {}) {
	logSkillExperience(
		skill_name,
		{
			score = 1,
			deck_id = '',
			deck_term = '',
			comment = '',
			reattempts = 0,
			increase_performance = false,
			performance_feature = 'term'
		} = {}
	) {
		localStorageInstance
			.load()
			.then(() => {
				localStorageInstance.log_skill_experience(skill_name, {
					score: score,
					deck_id: deck_id,
					deck_term: deck_term,
					comment: comment,
					reattempts: reattempts
				});
				if (increase_performance) {
					localStorageInstance.log_feat(performance_feature, {
						score: score
					});
				}
			})
			.catch(err => {
				console.error('Error logging skill experience', err);
			});
	}

	getSkillReports({ cleanScreen = false } = {}) {
		// wait for load.
		{
			localStorageInstance
				.load()
				.then(() => {
					const today = new Date().toISOString().slice(0, 10);
					const windows_n = 30;
					const windows_days_ago = new Date();
					windows_days_ago.setDate(
						windows_days_ago.getDate() - windows_n
					);
					const windows_days_ago_str = windows_days_ago
						.toISOString()
						.slice(0, 10);

					if (cleanScreen) {
						this.say(
							`Skill Reports from ${windows_days_ago_str} -> ${today}\n`
						);
					}
					localStorageInstance.get_skills_reports({
						windows_n: windows_n
					});
				})
				.catch(err => {
					console.error('Error loading skills reports', err);
				});
		}
	}

	async createTermModule() {
		console.log('\n=== Term Module Creation Wizard ===\n');

		try {
			// Helper function to convert title to module path
			const titleToModulePath = (title) => {
				return title
					.toLowerCase()
					.replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
					.replace(/\s+/g, '-') // Replace spaces with hyphens
					.replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
					.replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
			};

			// Helper function to derive skill category from title
			const titleToSkillCategory = (title) => {
				const lowerTitle = title.toLowerCase();
				
				// Common category mappings
				if (lowerTitle.includes('data') && lowerTitle.includes('science')) return 'datascience';
				if (lowerTitle.includes('math') || lowerTitle.includes('calculus') || lowerTitle.includes('algebra')) return 'mathematics';
				if (lowerTitle.includes('programming') || lowerTitle.includes('code') || lowerTitle.includes('software')) return 'programming';
				if (lowerTitle.includes('business') || lowerTitle.includes('finance') || lowerTitle.includes('economics')) return 'business';
				if (lowerTitle.includes('science') || lowerTitle.includes('chemistry') || lowerTitle.includes('physics')) return 'science';
				if (lowerTitle.includes('language') || lowerTitle.includes('english') || lowerTitle.includes('spanish')) return 'language';
				if (lowerTitle.includes('history') || lowerTitle.includes('geography')) return 'humanities';
				
				// Default: use first word or generic category
				const firstWord = lowerTitle.split(' ')[0].replace(/[^a-z0-9]/g, '');
				return firstWord || 'general';
			};

			// Collect module information
			const titleInput = new Input({
				name: 'title',
				message: 'Enter module title (e.g., "Data Science Fundamentals"):',
				validate: (input) => input.trim() ? true : 'Title is required'
			});

			const authorInput = new Input({
				name: 'author',
				message: 'Enter author name:',
				initial: 'user'
			});

			const cacheContentToggle = new Toggle({
				name: 'cacheContent',
				message: 'Enable content caching?',
				enabled: 'Yes',
				disabled: 'No',
				initial: true
			});

			const useFileAsModuleToggle = new Toggle({
				name: 'useFileAsModule',
				message: 'Use each file as separate module?',
				enabled: 'Yes',
				disabled: 'No',
				initial: false
			});

			const externalFolderInput = new Input({
				name: 'externalFolder',
				message: 'Enter external content folder path (optional, press Enter to skip):',
				validate: (input) => {
					if (!input || input.trim() === '') {
						return true; // Optional field
					}
					
					// Check if path exists (with original single backslashes for validation)
					const originalPath = input.trim();
					if (!fs.existsSync(originalPath)) {
						return `Path does not exist: ${originalPath}`;
					}
					
					// Check if it's a directory
					if (!fs.statSync(originalPath).isDirectory()) {
						return 'Path must be a directory, not a file';
					}
					
					return true;
				},
				format: (input) => {
					// Automatically escape single backslashes to double backslashes for Windows paths
					if (input && input.includes('\\')) {
						return input.replace(/\\/g, '\\\\');
					}
					return input;
				}
			});

			// Run prompts
			const title = await titleInput.run();
			const author = await authorInput.run();
			const cacheContent = await cacheContentToggle.run();
			const useFileAsModule = await useFileAsModuleToggle.run();
			let externalFolder = await externalFolderInput.run();

			// Additional path processing for Windows paths
			if (externalFolder && externalFolder.trim()) {
				// Ensure proper escaping for JavaScript strings
				externalFolder = externalFolder.replace(/\\/g, '\\\\');
			}

			// Derive module path and skill category from title
			const modulePath = titleToModulePath(title);
			const skillCategory = titleToSkillCategory(title);

			console.log(`\n📋 Generated configuration:`);
			console.log(`   Module path: ${modulePath}`);
			console.log(`   Skill category: ${skillCategory}`);
			if (externalFolder && externalFolder.trim()) {
				console.log(`   External folder: ${externalFolder.trim()}`);
			}

			// Confirm generated values
			const confirmGeneration = new Confirm({
				name: 'confirm',
				message: 'Proceed with this configuration?',
				initial: true
			});

			const shouldProceed = await confirmGeneration.run();
			if (!shouldProceed) {
				console.log('Module creation cancelled.');
				return;
			}

			// Create module directory
			const moduleDir = path.join(__dirname, 'data', 'user_data', 'terms_modules', modulePath);
			
			if (fs.existsSync(moduleDir)) {
				console.log(`\nError: Module directory already exists at ${moduleDir}`);
				return;
			}

			fs.mkdirSync(moduleDir, { recursive: true });
			console.log(`\nCreated module directory: ${moduleDir}`);

			// Generate index.js content
			let indexContent = `const ABOUT = {
	title: '${title}',
	skill_category: '${skillCategory}',
	author: '${author}'
};

`;

			if (externalFolder.trim()) {
				indexContent += `const EXTERNAL_CONTENT_FOLDERS = [
	'${externalFolder.trim()}'
];

`;
			}

			indexContent += `module.exports = {
	module_path: '${modulePath}',
	ABOUT: ABOUT,
	CACHE_CONTENT: ${cacheContent}`;

			if (externalFolder.trim()) {
				indexContent += `,
	EXTERNAL_CONTENT_FOLDERS: EXTERNAL_CONTENT_FOLDERS`;
			}

			if (useFileAsModule) {
				indexContent += `,
	USE_FILE_AS_MODULE: true`;
			}

			indexContent += `
};
`;

			// Write index.js file
			const indexPath = path.join(moduleDir, 'index.js');
			fs.writeFileSync(indexPath, indexContent);
			console.log(`Created index.js: ${indexPath}`);

			// Create cache directory if caching is enabled
			if (cacheContent) {
				const cacheDir = path.join(moduleDir, 'cache_md');
				fs.mkdirSync(cacheDir, { recursive: true });
				console.log(`Created cache directory: ${cacheDir}`);
			}

			console.log(`\n✅ Successfully created term module: ${modulePath}`);
			console.log(`📁 Location: ${moduleDir}`);
			console.log(`\n📝 Next steps:`);
			console.log(`   1. Add your markdown files to the module directory`);
			if (externalFolder.trim()) {
				console.log(`   2. Ensure your external folder contains markdown files: ${externalFolder}`);
			}
			console.log(`   3. Run 'mastery ses' to start studying your new module`);

		} catch (error) {
			console.error('Error creating term module:', error.message);
		}
	}

	async manageMasks() {
		const inquirer = require('inquirer');
		const fs = require('fs');
		const path = require('path');

		const settingsPath = path.join(__dirname, 'user_data', 'settings.json');

		try {
			console.log('\n=== Quiz Deck Masks Manager ===\n');

			while (true) {
				const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
				const quizConfig = settings.quiz_decks_configuration || { masks: [], use_masks: [] };

				const { action } = await inquirer.prompt([
					{
						type: 'list',
						name: 'action',
						message: 'What would you like to do?',
						choices: [
							{ name: 'Add new mask', value: 'add' },
							{ name: 'Edit existing mask', value: 'edit' },
							{ name: 'Delete existing mask', value: 'delete' },
							{ name: 'Toggle mask usage', value: 'toggle' },
							{ name: 'View current masks', value: 'view' },
							{ name: 'Exit', value: 'exit' }
						]
					}
				]);

				if (action === 'exit') {
					console.log('Now running quiz or coa will use the selected masks.');
					break;
				}

				if (action === 'view') {
					this.displayCurrentMasks(quizConfig);
					continue;
				}

				if (action === 'add') {
					await this.addNewMask(settingsPath);
				} else if (action === 'edit') {
					await this.editExistingMask(settingsPath);
				} else if (action === 'delete') {
					await this.deleteMask(settingsPath);
				} else if (action === 'toggle') {
					await this.toggleMaskUsageLoop(settingsPath);
				}
			}
		} catch (error) {
			console.error('Error managing masks:', error.message);
		}
	}

	displayCurrentMasks(quizConfig) {
		console.log('\n📋 Current Masks Configuration:\n');
		
		if (quizConfig.masks.length === 0) {
			console.log('No masks configured yet.');
			return;
		}

		quizConfig.masks.forEach((mask, index) => {
			const isActive = quizConfig.use_masks.includes(mask.title);
			const status = isActive ? '✅ ACTIVE' : '❌ INACTIVE';
			console.log(`${index + 1}. ${mask.title} - ${status}`);
			console.log(`   Decks: ${mask.decks_to_enable.join(', ')}`);
		});

		console.log(`\nCurrently active masks: ${quizConfig.use_masks.join(', ') || 'None'}\n`);
	}

	async addNewMask(settingsPath) {
		const inquirer = require('inquirer');
		const fs = require('fs');
		const { retrieve_terms_as_decks } = require('./md_terms_parser');

		try {
			console.log('\n🔍 Loading available modules and categories...\n');

			// Get available modules and their categories
			const termsModules = retrieve_terms_as_decks();
			const moduleChoices = [];
			const moduleCategories = {};

			// Add sample terms modules
			const sampleTerms = require('./terms_data/sample_terms.js');
			Object.keys(sampleTerms).forEach(key => {
				if (Array.isArray(sampleTerms[key])) {
					const displayName = key.replace(/_/g, ' ').toLowerCase();
					moduleChoices.push({ name: displayName, value: displayName });
					moduleCategories[displayName] = ['all'];
				}
			});

			// Add terms modules with their categories
			Object.keys(termsModules).forEach(moduleKey => {
				const module = termsModules[moduleKey];
				const moduleName = module.deck_name;
				moduleChoices.push({ name: moduleName, value: moduleName });

				// Get unique categories from this module
				const categories = new Set(['all']);
				module.terms.forEach(term => {
					if (term.category) {
						categories.add(term.category);
					}
				});
				moduleCategories[moduleName] = Array.from(categories);
			});

			if (moduleChoices.length === 0) {
				console.log('No modules found. Please create some term modules first.');
				return;
			}

			const selectedDecks = [];
			
			console.log('Select modules and categories to include in your mask.\n');

			while (true) {
				const { selectedModule } = await inquirer.prompt([
					{
						type: 'list',
						name: 'selectedModule',
						message: 'Select a module:',
						choices: [
							...moduleChoices,
							{ name: '✅ Done selecting', value: 'done' }
						]
					}
				]);

				if (selectedModule === 'done') {
					break;
				}

				const availableCategories = moduleCategories[selectedModule] || ['all'];
				
				if (availableCategories.length === 1) {
					// Only 'all' is available
					selectedDecks.push(selectedModule);
					console.log(`Added: ${selectedModule} (all categories)`);
				} else {
					const { selectedCategory } = await inquirer.prompt([
						{
							type: 'list',
							name: 'selectedCategory',
							message: `Select category for ${selectedModule}:`,
							choices: availableCategories.map(cat => ({
								name: cat === 'all' ? 'All categories' : cat,
								value: cat
							}))
						}
					]);

					if (selectedCategory === 'all') {
						selectedDecks.push(selectedModule);
						console.log(`Added: ${selectedModule} (all categories)`);
					} else {
						selectedDecks.push(`${selectedModule}:${selectedCategory}`);
						console.log(`Added: ${selectedModule}:${selectedCategory}`);
					}
				}
			}

			if (selectedDecks.length === 0) {
				console.log('No decks selected. Mask creation cancelled.');
				return;
			}

			const { maskName } = await inquirer.prompt([
				{
					type: 'input',
					name: 'maskName',
					message: 'Enter a name for this mask:',
					validate: input => input.trim().length > 0 || 'Mask name cannot be empty'
				}
			]);

			// Save the mask
			const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
			if (!settings.quiz_decks_configuration) {
				settings.quiz_decks_configuration = { masks: [], use_masks: [] };
			}

			const newMask = {
				title: maskName.trim(),
				decks_to_enable: selectedDecks
			};

			settings.quiz_decks_configuration.masks.push(newMask);
			fs.writeFileSync(settingsPath, JSON.stringify(settings, null, '\t'));

			console.log(`\n✅ Mask "${maskName}" created successfully!`);
			console.log(`📦 Contains: ${selectedDecks.join(', ')}`);
			console.log(`💡 Use "Toggle mask usage" to activate it.\n`);

		} catch (error) {
			console.error('Error adding mask:', error.message);
		}
	}

	async deleteMask(settingsPath) {
		const inquirer = require('inquirer');
		const fs = require('fs');

		try {
			const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
			const quizConfig = settings.quiz_decks_configuration || { masks: [], use_masks: [] };

			if (quizConfig.masks.length === 0) {
				console.log('No masks to delete.');
				return;
			}

			const { maskToDelete } = await inquirer.prompt([
				{
					type: 'list',
					name: 'maskToDelete',
					message: 'Select mask to delete:',
					choices: quizConfig.masks.map(mask => ({
						name: `${mask.title} (${mask.decks_to_enable.join(', ')})`,
						value: mask.title
					}))
				}
			]);

			// Remove from masks array
			quizConfig.masks = quizConfig.masks.filter(mask => mask.title !== maskToDelete);

			// Remove from use_masks array if present
			quizConfig.use_masks = quizConfig.use_masks.filter(title => title !== maskToDelete);

			settings.quiz_decks_configuration = quizConfig;
			fs.writeFileSync(settingsPath, JSON.stringify(settings, null, '\t'));

			console.log(`\n✅ Mask "${maskToDelete}" deleted successfully!\n`);

		} catch (error) {
			console.error('Error deleting mask:', error.message);
		}
	}

	async toggleMaskUsageLoop(settingsPath) {
		const inquirer = require('inquirer');
		const fs = require('fs');

		try {
			console.log('\n🔄 Toggle Mask Usage Mode\n');

			while (true) {
				const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
				const quizConfig = settings.quiz_decks_configuration || { masks: [], use_masks: [] };

				if (quizConfig.masks.length === 0) {
					console.log('No masks available to toggle.');
					return;
				}

				console.log('Current status:');
				quizConfig.masks.forEach(mask => {
					const isActive = quizConfig.use_masks.includes(mask.title);
					const status = isActive ? '✅ ACTIVE' : '❌ INACTIVE';
					console.log(`  ${mask.title}: ${status}`);
				});

				const { action } = await inquirer.prompt([
					{
						type: 'list',
						name: 'action',
						message: 'What would you like to do?',
						choices: [
							{ name: 'Toggle individual mask on/off', value: 'toggle_single' },
							{ name: 'Select all active masks at once', value: 'select_all' },
							{ name: 'Finish toggle operations', value: 'finish' }
						]
					}
				]);

				if (action === 'finish') {
					console.log('✅ Finished toggling mask usage.\n');
					break;
				}

				if (action === 'toggle_single') {
					const { maskToToggle } = await inquirer.prompt([
						{
							type: 'list',
							name: 'maskToToggle',
							message: 'Select mask to toggle:',
							choices: quizConfig.masks.map(mask => {
								const isActive = quizConfig.use_masks.includes(mask.title);
								const status = isActive ? '✅ ACTIVE' : '❌ INACTIVE';
								return {
									name: `${mask.title} - ${status}`,
									value: mask.title
								};
							})
						}
					]);

					if (quizConfig.use_masks.includes(maskToToggle)) {
						// Remove from active masks
						quizConfig.use_masks = quizConfig.use_masks.filter(title => title !== maskToToggle);
						console.log(`❌ Deactivated: ${maskToToggle}`);
					} else {
						// Add to active masks
						quizConfig.use_masks.push(maskToToggle);
						console.log(`✅ Activated: ${maskToToggle}`);
					}

					settings.quiz_decks_configuration = quizConfig;
					fs.writeFileSync(settingsPath, JSON.stringify(settings, null, '\t'));
				} else if (action === 'select_all') {
					const { selectedMasks } = await inquirer.prompt([
						{
							type: 'checkbox',
							name: 'selectedMasks',
							message: 'Select which masks should be ACTIVE (uncheck to deactivate):',
							choices: quizConfig.masks.map(mask => ({
								name: `${mask.title} (${mask.decks_to_enable.join(', ')})`,
								value: mask.title,
								checked: quizConfig.use_masks.includes(mask.title)
							}))
						}
					]);

					quizConfig.use_masks = selectedMasks;
					settings.quiz_decks_configuration = quizConfig;
					fs.writeFileSync(settingsPath, JSON.stringify(settings, null, '\t'));

					console.log(`\n✅ Mask usage updated!`);
					console.log(`Active masks: ${selectedMasks.join(', ') || 'None'}\n`);
				}
			}

		} catch (error) {
			console.error('Error toggling mask usage:', error.message);
		}
	}

	async editExistingMask(settingsPath) {
		const inquirer = require('inquirer');
		const fs = require('fs');
		const { retrieve_terms_as_decks } = require('./md_terms_parser');

		try {
			const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
			const quizConfig = settings.quiz_decks_configuration || { masks: [], use_masks: [] };

			if (quizConfig.masks.length === 0) {
				console.log('No masks available to edit.');
				return;
			}

			const { maskToEdit } = await inquirer.prompt([
				{
					type: 'list',
					name: 'maskToEdit',
					message: 'Select mask to edit:',
					choices: quizConfig.masks.map(mask => ({
						name: `${mask.title} (${mask.decks_to_enable.join(', ')})`,
						value: mask.title
					}))
				}
			]);

			const maskIndex = quizConfig.masks.findIndex(mask => mask.title === maskToEdit);
			const currentMask = quizConfig.masks[maskIndex];

			console.log(`\n📝 Editing mask: ${currentMask.title}`);
			console.log(`Current decks: ${currentMask.decks_to_enable.join(', ')}\n`);

			// Get available modules and their categories
			console.log('🔍 Loading available modules and categories...\n');
			const termsModules = retrieve_terms_as_decks();
			const moduleChoices = [];
			const moduleCategories = {};

			// Add sample terms modules
			const sampleTerms = require('./terms_data/sample_terms.js');
			Object.keys(sampleTerms).forEach(key => {
				if (Array.isArray(sampleTerms[key])) {
					const displayName = key.replace(/_/g, ' ').toLowerCase();
					moduleChoices.push({ name: displayName, value: displayName });
					moduleCategories[displayName] = ['all'];
				}
			});

			// Add terms modules with their categories
			Object.keys(termsModules).forEach(moduleKey => {
				const module = termsModules[moduleKey];
				const moduleName = module.deck_name;
				moduleChoices.push({ name: moduleName, value: moduleName });

				// Get unique categories from this module
				const categories = new Set(['all']);
				module.terms.forEach(term => {
					if (term.category) {
						categories.add(term.category);
					}
				});
				moduleCategories[moduleName] = Array.from(categories);
			});

			const { editAction } = await inquirer.prompt([
				{
					type: 'list',
					name: 'editAction',
					message: 'How would you like to edit this mask?',
					choices: [
						{ name: 'Replace all decks (start fresh)', value: 'replace' },
						{ name: 'Add more decks to existing ones', value: 'add' },
						{ name: 'Remove specific decks', value: 'remove' }
					]
				}
			]);

			let newDecks = [...currentMask.decks_to_enable];

			if (editAction === 'replace') {
				newDecks = [];
				console.log('\n🔄 Starting fresh - select new decks for this mask:');
			} else if (editAction === 'add') {
				console.log('\n➕ Adding more decks to the existing ones:');
			} else if (editAction === 'remove') {
				const { decksToRemove } = await inquirer.prompt([
					{
						type: 'checkbox',
						name: 'decksToRemove',
						message: 'Select decks to remove:',
						choices: currentMask.decks_to_enable.map(deck => ({
							name: deck,
							value: deck
						}))
					}
				]);

				newDecks = newDecks.filter(deck => !decksToRemove.includes(deck));
				console.log(`\n✅ Removed ${decksToRemove.length} decks from mask.`);
			}

			if (editAction === 'replace' || editAction === 'add') {
				// Select new decks to add
				while (true) {
					const { selectedModule } = await inquirer.prompt([
						{
							type: 'list',
							name: 'selectedModule',
							message: 'Select a module to add:',
							choices: [
								...moduleChoices,
								{ name: '✅ Done selecting', value: 'done' }
							]
						}
					]);

					if (selectedModule === 'done') {
						break;
					}

					const availableCategories = moduleCategories[selectedModule] || ['all'];
					
					if (availableCategories.length === 1) {
						// Only 'all' is available
						if (!newDecks.includes(selectedModule)) {
							newDecks.push(selectedModule);
							console.log(`Added: ${selectedModule} (all categories)`);
						} else {
							console.log(`Already included: ${selectedModule}`);
						}
					} else {
						const { selectedCategory } = await inquirer.prompt([
							{
								type: 'list',
								name: 'selectedCategory',
								message: `Select category for ${selectedModule}:`,
								choices: availableCategories.map(cat => ({
									name: cat === 'all' ? 'All categories' : cat,
									value: cat
								}))
							}
						]);

						const deckSpec = selectedCategory === 'all' ? selectedModule : `${selectedModule}:${selectedCategory}`;
						
						if (!newDecks.includes(deckSpec)) {
							newDecks.push(deckSpec);
							console.log(`Added: ${deckSpec}`);
						} else {
							console.log(`Already included: ${deckSpec}`);
						}
					}
				}
			}

			// Update the mask
			currentMask.decks_to_enable = newDecks;
			settings.quiz_decks_configuration = quizConfig;
			fs.writeFileSync(settingsPath, JSON.stringify(settings, null, '\t'));

			console.log(`\n✅ Mask "${currentMask.title}" updated successfully!`);
			console.log(`📦 Now contains: ${newDecks.join(', ')}\n`);

		} catch (error) {
			console.error('Error editing mask:', error.message);
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
	});
};

/**
 * Expected output: {month: {}, lastweek: {}, yesterday: {}, today: {}}
 */
populateLastDaysPerformanceReport = (days = 7) => {
	const lastWeekInclusive = getArrayLastXDays(days);
};

getArrayLastXDays = (days = 7) => {
	const pastDays = [...Array(days).keys()].map(index => {
		const date = new Date();
		date.setDate(date.getDate() - (days - 1 - index));

		return date.toISOString().slice(0, 10);
	});

	// console.log(pastDays);
	return pastDays;
};

/**
 * Updates the count of times a concept has been practiced e.g. `algebra-problem-1` or 'js-how-to-loop'
 * @param {str} problem_name: The name of the problem to update
 * @param {bool} success ?= true : If to whether to increase the success count or the fail count
 * @param {int} account_id ?= 1 : The account id to increase the performance; default Settings account_id or 1
 *
 * @returns {"message": f"Success updating {concept_term}, {conceptSelected.correct_times}"}
 */
updateConcept = withOnlineCheck(
	async (
		problem_name,
		success = true,
		account_id = Settings.account_id ?? 1
	) => { }
);

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
		feat_map[feat_rule.feature_key] = {};
		feat_map[feat_rule.feature_key][feat_rule.req_type] =
			feat_rule.requirement;
	}

	return feat_map;
}


const getCredentialNames = credentialDict => {
	return credentialDict.map(cred => {
		return cred.name;
	});
};

/**
 * Retrieves fromt the json the proper credentials as n object
 */
const getCredentialInformation = (credentialsDict, credential_name) => {
	res = credentialsDict.filter(cred => cred.name == credential_name);
	return res.length > 0 ? res[0] : {};
};

const getToday = () => {
	// Returns as string format: "2022/12/09"
	return new Date().toJSON().slice(0, 10).replace(/-/g, '/');
};

class CommitCategoryType {
	constructor(code, icon_list, feature_name = '') {
		this.code = code;
		this.icon_list = icon_list;

		if (feature_name == '') {
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
}

const getCommitCategories = () => {
	let commitCategories = {};
	const commit_categories_settings = Settings.commit_categories ?? [];

	for (const commit_categories_setting_row of commit_categories_settings) {
		const code_key = commit_categories_setting_row.code;
		commitCategories[code_key] = new CommitCategoryType(
			code_key,
			commit_categories_setting_row.icon_list,
			commit_categories_setting_row.code
		);
	}

	return commitCategories;
};

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
	if (commitMessage == undefined || commitMessage == '') {
		commitMessage = CONSTANTS.default_commit_message;
	}

	exec(
		`git add --all && git commit -m ${commitMessage} && git push origin HEAD `
	);
	console.log(`Pushed commit: ${commitMessage}`);
	return true;
};

const pushOriginHead = () => {
	exec(`git push origin HEAD `);
	return true;
};

/**
 *
 * @param {string} term the term to search for comments
 * @param {number} count the number of comments to retrieve
 * @returns {Map<date:<date: comment>>}
 */
const getComments = async (term, count = 5) => {
	if (!Settings?.online) {
		console.log('Offline, should not get comments');
		return {};
	}

	return {};
};

/** 
 * Prints the comments in a nice format
 * @param {Map<date:<date: comment>>} comments e.g. [
  { '2023-04-07': 'feat: debug' },
  { '2023-04-07': 'feat: special category' }
]
*/
const printComments = comments => {
	for (const row in comments) {
		const obj = comments[row];
		console.log(
			`${chalk
				.hex(CONSTANTS.CUTEBLUE)
				.inverse(`${Object.keys(obj)?.[0]} ` ?? 'date')} ${Object.values(obj)?.[0] ?? '1'
			}`
		);
	}
};

/**
 *
 * @param {string} commitMessage Message to commit
 * @param {bool} strict If true, it will only detect categories when they appear followed by '|' e.g. 'feat |'
 * @returns {string} category code e.g. 'feat'
 */
const commitCategory = (commitMessage, strict = false) => {
	for (category of Object.values(getCommitCategories())) {
		if (strict) {
			if (commitMessage.includes(category.code + ' |')) {
				return category;
			}
		} else {
			if (commitMessage.includes(category.code)) {
				return category;
			}
		}
	}
	return ''; //No category at all.
};

const autorelease = () => {
	// Maid can auto-release herself

	let commitMessage = process.argv[3];
	if (commitMessage == undefined) {
		exec(`maid coa && make new m ="random commit"`);
	} else {
		exec(`maid coa && make new m="${commitMessage}"`);
	}
};

const inreasePerformanceOffline = (feature_name, increaseBY = 1) => { };

module.exports = {
	commitpush,
	autorelease,
	printComments,
	Mastery,
	getToday,
	FlashQuizzer,
	commitCategory,
	getComments,
	localStorageInstance
};
