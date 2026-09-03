const { vaultPath } = require('./vault');
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
const { getMaidDirectory } = require('./utils-functions.js');

const Settings = require('./settings.js');
const {
	DEFAULT_LLM_CONFIG,
	normalizeLlmConfig,
	normalizeLlmRoot,
	listLLMProfiles,
	resolveRuntimeLLMConfig,
	LLMService
} = require('./llm/LLMService');
const { runLLMWizard, printLLMStatus } = require('./llm/wizard');

const { Quizzer: FlashQuizzer } = require('./Quizzer.js');

const { LocalStorage } = require('./LocalStorage.js');

const { MathSessionManager } = require('./MathSessionManager.js');

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
			console.log('Offline, modify in data/settings.json');
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
	 * @param {Object} options - Loading options
	 * @param {string[]} options.deckFilter - Optional array of deck names to load (skips others)
	 * @returns {Promise} Promise that resolves when terms are loaded
	 */
	async ensureTermsLoaded({ deckFilter = null } = {}) {
		if (!this.termsLoaded) {
			console.log('Loading terms data...');
			if (deckFilter && deckFilter.length > 0) {
				console.log(`Filtering to decks: ${deckFilter.join(', ')}`);
			}
			const { populateMasterDeck } = require('./terms-data/terms');
			this.masterDeck = await populateMasterDeck({ deckFilter });
			this.mQuizer.masterDeck = this.masterDeck;
			// Update the terms array in the quizzer
			this.mQuizer.terms = [];
			const allTerms = this.masterDeck.listTerms();
			this.mQuizer.terms.push(...allTerms);
			this.termsLoaded = true;
			console.log(
				`Terms data loaded successfully. Total terms available: ${allTerms.length}`
			);
		}
		return this.masterDeck;
	}

	// Initialize command handlers
	initializeCommandHandlers() {
		// Command handlers - these map command names to their functions
		// For beginners: When you type 'mastery quiz', it calls the 'quiz' handler
		this.commandHandlers = {
			code: () => {
				this.tellCurrentDirectory();
			},
			vault: () => {
				const {
					handleVaultCommand
				} = require('./commands/vault-command');
				return handleVaultCommand();
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
			skill: () => {
				// Show skill progress reports
				this.getSkillReports();
			},
			services: () => {
				this.services();
			},
			math: async (flags = {}) => {
				if (flags?.session) {
					const sessionCount = flags?.n ?? 10;
					const mathSessionManager = new MathSessionManager(
						this.mQuizer
					);
					await mathSessionManager.runSession(sessionCount);
					return;
				}

				this.mQuizer.askMathQuestion();
			}, // Practice math problems (or session mode)
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
			term: async (flags = {}) => {
				if (flags?.session) {
					await this.ensureTermsLoaded();
					const size_study_deck = flags?.n ?? 10;
					return this.mQuizer.studySession(this.masterDeck, {
						size_study_deck
					});
				}

				await this.ensureTermsLoaded();
				return this.mQuizer.pickAndAskTermQuestion();
			}, // Flashcard study (or session mode)
			clean: () => {
				this.askToClean();
			}, // Clear terminal screen
			ses: async (flags = {}) => {
				await this.ensureTermsLoaded();
				return this.mQuizer.studySession(this.masterDeck, {
					size_study_deck: flags?.n ?? -1
				});
			}, // Study session
			lastses: async (flags = {}) => {
				// Study session in reverse order
				await this.ensureTermsLoaded();
				return this.mQuizer.studySession(this.masterDeck, {
					reverse: true,
					size_study_deck: flags?.n ?? -1
				});
			},
			fses: async (flags = {}) => {
				// Filtered study session based on active masks
				const { getSettingsManager } = require('./SettingsManager');
				const settingsManager = getSettingsManager();
				const enabledDecks = settingsManager.getEnabledDecksFromMasks();

				if (enabledDecks.length === 0) {
					console.log(
						'\nNo masks are currently active or configured.'
					);
					console.log(
						'Use "mastery mask-list" to see available masks.'
					);
					console.log(
						'Use "mastery mask-toggle <mask-name>" to enable a mask.\n'
					);
					return;
				}

				await this.ensureTermsLoaded({ deckFilter: enabledDecks });
				return this.mQuizer.filteredStudySession(this.masterDeck, {
					size_study_deck: flags?.n ?? -1
				});
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
			cleanup: async () => {
				// Display deletion queue information and JSON file location
				await this.ensureTermsLoaded();
				await this.mQuizer.cleanupDeletionQueue(flags.backup || false);
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

				this.getEntries({
					skill_name: skill_name,
					deck_term: deck_term
				});
			},
			'create-module': () => {
				this.createTermModule();
			},
			masks: () => {
				this.manageMasks();
			},
			'mask-list': () => {
				this.listMasks();
			},
			'mask-toggle': () => {
				const maskName = process.argv[3];
				if (!maskName) {
					console.log('Usage: mastery mask-toggle <mask-name>');
					return;
				}
				this.quickToggleMask(maskName);
			},
			'mask-create': async () => {
				await this.quickCreateMask();
			},
			'mask-status': () => {
				this.showMaskStatus();
			},
			llm: async () => {
				await this.handleLLMCommand();
			},
			'prepare-week': async () => {
				await this.prepareWeeklyDecks();
			}
		};
	}

	async prepareWeeklyDecks() {
		console.log('\n=== Prepare Weekly Study Decks ===\n');

		try {
			await this.ensureTermsLoaded();

			const { DailyDeckManager } = require('./DailyDeckManager');
			const dailyDeckConfig = Settings?.daily_deck_configuration || {};

			if (dailyDeckConfig.enabled === false) {
				console.log('Daily deck feature is disabled in settings.json');
				return;
			}

			const cardsPerDeck = dailyDeckConfig.cards_per_deck || 5;
			const maxTotalCards = dailyDeckConfig.max_total_cards || 20;
			const daysAhead = 7;

			const dailyDeckManager = new DailyDeckManager(Settings);

			console.log(
				`Preparing daily decks for the next ${daysAhead} days...`
			);
			console.log(
				`Configuration: ${cardsPerDeck} cards per deck, ${maxTotalCards} cards total per day\n`
			);

			const generatedDecks = dailyDeckManager.prepareWeekAhead(
				this.masterDeck,
				{
					cardsPerDeck,
					maxTotalCards,
					daysAhead
				}
			);

			console.log(
				`\nSuccessfully prepared ${generatedDecks.length} daily decks:\n`
			);

			for (const deck of generatedDecks) {
				console.log(
					`${deck.date}: ${deck.total_cards} cards from ${deck.decks.length} decks`
				);
			}

			console.log('\nDaily decks are now ready for the week!');
			console.log(
				'Run "mastery ses" and select "Today\'s Deck" to start studying.'
			);

			const cleanOld = dailyDeckConfig.days_to_keep || 30;
			const removed = dailyDeckManager.cleanOldDecks(cleanOld);
			if (removed > 0) {
				console.log(
					`\nCleaned up ${removed} old daily decks (older than ${cleanOld} days)`
				);
			}
		} catch (error) {
			console.error('Error preparing weekly decks:', error.message);
		}
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
		try {
			clipboard.copy(projectDirectory);
		} catch (err) {
			// clipboard may be unavailable on Linux without xclip/xsel
		}
	};
	displaySettingsPaths = () => {
		const path = require('path');
		const fs = require('fs');
		const { getSettingsManager } = require('./SettingsManager');

		console.log('\n=== Available Settings Files ===\n');

		// The single config file, in the vault.
		const mainSettingsPath = getSettingsManager().getSettingsPath();
		if (fs.existsSync(mainSettingsPath)) {
			console.log(`📁 Main Settings: ${mainSettingsPath}`);
		} else {
			console.log(`📁 Main Settings: ${mainSettingsPath} (not found)`);
		}

		// Feature settings
		console.log('\n--- Feature Settings ---');
		const { getFeatureCommands } = require('./features');
		const featureNames = new Set(
			Object.values(getFeatureCommands()).map(c => c.feature)
		);
		if (featureNames.size === 0) {
			console.log('No features registered.');
		} else {
			for (const name of featureNames) {
				console.log(`\u{1F4C4} ${name}: uses the main settings file`);
			}
		}

		console.log('\nUse these paths to modify application settings.');
	};

	getSettingsManager() {
		const { getSettingsManager } = require('./SettingsManager');
		return getSettingsManager();
	}

	updateRuntimeSettings(newSettings) {
		this.Settings = newSettings;
		Object.assign(Settings, newSettings);
	}

	async handleLLMCommand() {
		const subcommand = (process.argv[3] || 'setup').toLowerCase();
		const settingsManager = this.getSettingsManager();
		const settings = settingsManager.getSettings();
		const persistedRootConfig = normalizeLlmRoot(
			settings.llm || DEFAULT_LLM_CONFIG
		);

		const saveLlmConfig = rootConfig => {
			const nextSettings = {
				...settingsManager.getSettings(),
				llm: normalizeLlmRoot(rootConfig)
			};
			settingsManager.saveSettings(nextSettings);
			this.updateRuntimeSettings(nextSettings);
		};

		if (subcommand === 'setup') {
			const nextRootConfig = await runLLMWizard(persistedRootConfig);
			saveLlmConfig(nextRootConfig);
			const runtimeConfig = resolveRuntimeLLMConfig({
				settings: { llm: nextRootConfig }
			});
			printLLMStatus(runtimeConfig);
			return;
		}

		if (subcommand === 'on') {
			saveLlmConfig({ ...persistedRootConfig, enabled: true });
			console.log('Local LLM enabled.');
			return;
		}

		if (subcommand === 'off') {
			saveLlmConfig({ ...persistedRootConfig, enabled: false });
			console.log('Local LLM disabled.');
			return;
		}

		if (subcommand === 'profiles') {
			const profiles = listLLMProfiles(settingsManager.getSettings());
			if (profiles.length === 0) {
				console.log(
					'No LLM profiles configured. Run "mastery llm setup".'
				);
				return;
			}

			console.log('\nLLM Profiles:\n');
			profiles.forEach(profile => {
				const active = profile.isActive ? ' (active)' : '';
				console.log(`- ${profile.name}${active}`);
				console.log(
					`  provider=${profile.config.provider} model=${profile.config.model}`
				);
				console.log(`  baseUrl=${profile.config.baseUrl}`);
			});
			console.log('');
			return;
		}

		if (subcommand === 'use') {
			const targetProfile = process.argv[4];
			if (!targetProfile) {
				console.log('Usage: mastery llm use <profile-name>');
				return;
			}

			if (!persistedRootConfig.profiles[targetProfile]) {
				console.log(`Profile not found: ${targetProfile}`);
				return;
			}

			saveLlmConfig({
				...persistedRootConfig,
				activeProfile: targetProfile
			});
			console.log(`Active LLM profile set to: ${targetProfile}`);
			return;
		}

		if (subcommand === 'status') {
			const runtimeConfig = resolveRuntimeLLMConfig({
				settings: settingsManager.getSettings()
			});
			printLLMStatus(runtimeConfig);
			return;
		}

		if (subcommand === 'test') {
			const targetProfile = process.argv[4] || null;
			const runtimeConfig = resolveRuntimeLLMConfig({
				settings: settingsManager.getSettings(),
				profileName: targetProfile
			});
			if (!runtimeConfig.enabled) {
				console.log(
					'Local LLM is currently disabled. Run "mastery llm on" first.'
				);
				return;
			}

			try {
				const service = new LLMService(runtimeConfig);
				await service.testConnection();
				console.log(
					`Local LLM connection test successful${runtimeConfig.profileName ? ` (${runtimeConfig.profileName})` : ''}.`
				);
			} catch (error) {
				console.log(`Local LLM test failed: ${error.message}`);
			}
			return;
		}

		console.log(
			'Unknown llm command. Use one of: setup, on, off, status, test, profiles, use'
		);
	}

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

	getEntries = ({ head = 5, skill_name = '', deck_term = '' }) => {
		localStorageInstance.load().then(() => {
			/**
			 * Returns the entries of the skill_name in the deck_term
			 * @param {number} head - The number of entries to return
			 * @param {string} skill_name - The name of the skill to search for
			 * @param {string} deck_term - The term of the deck to search for
			 */
			const entries = localStorageInstance.getEntries({
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
	populateMissingReport = async () => {};

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
			const today_scores = localStorageInstance.getDayLogs({
				windows_n: 0
			}).selected_date;
			const yesterday_scores = localStorageInstance.getDayLogs({
				windows_n: 1
			}).selected_date;
			const week_scores = localStorageInstance.getWeekLog();
			console.log('Today Scores', today_scores);
			console.log('Yesterday Scores', yesterday_scores);
			console.log('Week Scores', week_scores);

			// Check if there's any recent activity
			const hasRecentActivity =
				Object.keys(today_scores).length > 0 ||
				Object.keys(week_scores).length > 0;

			if (!hasRecentActivity) {
				console.log('\n⚠️  No recent activity found.');
				console.log(
					'💡 Try running some quizzes to generate report data.'
				);

				// Show available data dates for reference
				const availableDates = Object.keys(
					localStorageInstance.date_based_stats
				).sort();
				if (availableDates.length > 0) {
					console.log(
						`📅 Latest activity: ${availableDates[availableDates.length - 1]}`
					);
					console.log(`📅 First activity: ${availableDates[0]}`);
				}

				// Still show flashcard report even if no other activity
				this.generateFlashcardReport(localStorageInstance);
				return;
			}

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
				userPerformanceData.week_sum[feat] = `${
					total - today
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

			// Generate flashcard statistics table
			this.generateFlashcardReport(localStorageInstance);
		} catch (err) {
			console.error('Error generating offline performance report', err);
		}
	}

	generateFlashcardReport(localStorageInstance) {
		try {
			console.log('\n=== Flashcard Statistics (Last 7 Days) ===\n');

			const today = new Date();
			const flashcardData = {};

			// Collect data for the last 7 days
			for (let i = 6; i >= 0; i--) {
				const date = new Date(today);
				date.setDate(date.getDate() - i);
				const dateString = date.toISOString().split('T')[0];

				const dayData =
					localStorageInstance.date_based_stats[dateString] || {};
				const attempts = dayData.flashcard_attempts?.value || 0;
				const learned = dayData.flashcard_learned?.value || 0;
				const successRate =
					attempts > 0
						? `${Math.round((learned / attempts) * 100)}%`
						: 'N/A';

				// Format date as MM/DD
				const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;

				flashcardData[formattedDate] = {
					Attempts: attempts,
					Learned: learned,
					'Success Rate': successRate
				};
			}

			console.table(flashcardData);

			// Calculate weekly totals
			let totalAttempts = 0;
			let totalLearned = 0;

			for (const day in flashcardData) {
				totalAttempts += flashcardData[day].Attempts;
				totalLearned += flashcardData[day].Learned;
			}

			const weeklySuccessRate =
				totalAttempts > 0
					? Math.round((totalLearned / totalAttempts) * 100)
					: 0;

			console.log(`\nWeekly Summary:`);
			console.log(`Total Attempts: ${totalAttempts}`);
			console.log(`Total Learned: ${totalLearned}`);
			console.log(`Overall Success Rate: ${weeklySuccessRate}%\n`);
		} catch (err) {
			console.error('Error generating flashcard report', err);
		}
	}

	performanceReport = async ({ version = 'tables' } = {}) => {};

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
				localStorageInstance.logFeat(feature_name, { score: value });
			})
			.catch(err => {
				console.error('Error increasing performance', err);
			});
	}

	// logSkillExperience(skill_name, { score = 1, deck_id ='', deck_term = "", comment="", reattempts=0 } = {}) {
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
				localStorageInstance.logSkillExperience(skill_name, {
					score: score,
					deck_id: deck_id,
					deck_term: deck_term,
					comment: comment,
					reattempts: reattempts
				});
				if (increase_performance) {
					localStorageInstance.logFeat(performance_feature, {
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
					localStorageInstance.getSkillsReports({
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
			const titleToModulePath = title => {
				return title
					.toLowerCase()
					.replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
					.replace(/\s+/g, '-') // Replace spaces with hyphens
					.replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
					.replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
			};

			// Helper function to derive skill category from title
			const titleToSkillCategory = title => {
				const lowerTitle = title.toLowerCase();

				// Common category mappings
				if (
					lowerTitle.includes('data') &&
					lowerTitle.includes('science')
				)
					return 'datascience';
				if (
					lowerTitle.includes('math') ||
					lowerTitle.includes('calculus') ||
					lowerTitle.includes('algebra')
				)
					return 'mathematics';
				if (
					lowerTitle.includes('programming') ||
					lowerTitle.includes('code') ||
					lowerTitle.includes('software')
				)
					return 'programming';
				if (
					lowerTitle.includes('business') ||
					lowerTitle.includes('finance') ||
					lowerTitle.includes('economics')
				)
					return 'business';
				if (
					lowerTitle.includes('science') ||
					lowerTitle.includes('chemistry') ||
					lowerTitle.includes('physics')
				)
					return 'science';
				if (
					lowerTitle.includes('language') ||
					lowerTitle.includes('english') ||
					lowerTitle.includes('spanish')
				)
					return 'language';
				if (
					lowerTitle.includes('history') ||
					lowerTitle.includes('geography')
				)
					return 'humanities';

				// Default: use first word or generic category
				const firstWord = lowerTitle
					.split(' ')[0]
					.replace(/[^a-z0-9]/g, '');
				return firstWord || 'general';
			};

			// Collect module information
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

			const commonInstructionsInput = new Input({
				name: 'commonInstructions',
				message:
					'Enter deck common instructions (optional, use \\n for line breaks):',
				initial: ''
			});

			const useFileAsModuleToggle = new Toggle({
				name: 'useFileAsModule',
				message: 'Use each file as separate module?',
				enabled: 'Yes',
				disabled: 'No',
				initial: false
			});

			// Run prompts — validate after run to avoid enquirer re-render
			// input accumulation bug on Linux terminals
			let title = '';
			while (!title.trim()) {
				const titleInput = new Input({
					name: 'title',
					message:
						'Enter module title (e.g., "Data Science Fundamentals"):'
				});
				title = await titleInput.run();
				if (!title.trim()) console.log('Title is required');
			}
			const author = await authorInput.run();
			const cacheContent = await cacheContentToggle.run();
			const commonInstructions = await commonInstructionsInput.run();
			const useFileAsModule = await useFileAsModuleToggle.run();

			// External folder prompt: validate after run to avoid enquirer re-render
			// input accumulation bug on Linux terminals
			let externalFolder = '';
			let externalPathValid = false;
			while (!externalPathValid) {
				const externalFolderInput = new Input({
					name: 'externalFolder',
					message:
						'Enter external content folder path (optional, press Enter to skip):'
				});
				const rawInput = await externalFolderInput.run();

				if (!rawInput || rawInput.trim() === '') {
					externalPathValid = true;
				} else if (!fs.existsSync(rawInput.trim())) {
					console.log(`Path does not exist: ${rawInput.trim()}`);
				} else if (!fs.statSync(rawInput.trim()).isDirectory()) {
					console.log('Path must be a directory, not a file');
				} else {
					externalFolder = rawInput.trim().replace(/\\/g, '\\\\');
					externalPathValid = true;
				}
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
			const moduleDir = vaultPath(`decks/${modulePath}`);

			if (fs.existsSync(moduleDir)) {
				console.log(
					`\nError: Module directory already exists at ${moduleDir}`
				);
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
	common_instructions: ${JSON.stringify(commonInstructions.replace(/\\n/g, '\n'))},
	ABOUT: ABOUT,
	CACHE_CONTENT: ${cacheContent},
	MARKDOWN_DESIGN: {
		deck_description_file: null,
		prompt_descriptions_file: null
	}`;

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
			console.log(
				`   1. Add your markdown files to the module directory`
			);
			if (externalFolder.trim()) {
				console.log(
					`   2. Ensure your external folder contains markdown files: ${externalFolder}`
				);
			}
			console.log(
				`   3. Run 'mastery ses' to start studying your new module`
			);
		} catch (error) {
			console.error('Error creating term module:', error.message);
		}
	}

	async manageMasks() {
		const fs = require('fs');
		const { getSettingsManager } = require('./SettingsManager');

		const settingsPath = getSettingsManager().getSettingsPath();

		try {
			console.log('\n=== Quiz Deck Masks Manager ===\n');

			while (true) {
				const settings = JSON.parse(
					fs.readFileSync(settingsPath, 'utf8')
				);
				const quizConfig = settings.quiz_decks_configuration || {
					masks: [],
					use_masks: []
				};

				const actionPrompt = new AutoComplete({
					name: 'action',
					message: 'What would you like to do?',
					choices: [
						'Add new mask',
						'Edit existing mask',
						'Delete existing mask',
						'Toggle mask usage',
						'View current masks',
						'Exit'
					]
				});
				const actionResult = await actionPrompt.run();
				const actionMap = {
					'Add new mask': 'add',
					'Edit existing mask': 'edit',
					'Delete existing mask': 'delete',
					'Toggle mask usage': 'toggle',
					'View current masks': 'view',
					Exit: 'exit'
				};
				const action = actionMap[actionResult] || actionResult;

				if (action === 'exit') {
					console.log(
						'Now running quiz or coa will use the selected masks.'
					);
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

		console.log(
			`\nCurrently active masks: ${quizConfig.use_masks.join(', ') || 'None'}\n`
		);
	}

	async addNewMask(settingsPath) {
		const fs = require('fs');
		const { retrieve_terms_as_decks } = require('./md-terms-parser');

		try {
			console.log('\n🔍 Loading available modules and categories...\n');

			// Get available modules and their categories
			const termsModules = retrieve_terms_as_decks();
			const moduleChoices = [];
			const moduleCategories = {};

			// Add sample terms modules
			const sampleTerms = require('./terms-data/sample_terms.js');
			Object.keys(sampleTerms).forEach(key => {
				if (Array.isArray(sampleTerms[key])) {
					const displayName = key.replace(/_/g, ' ').toLowerCase();
					moduleChoices.push({
						name: displayName,
						value: displayName
					});
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
				console.log(
					'No modules found. Please create some term modules first.'
				);
				return;
			}

			const selectedDecks = [];

			console.log(
				'Select modules and categories to include in your mask.\n'
			);

			while (true) {
				const modulePrompt = new AutoComplete({
					name: 'selectedModule',
					message: 'Select a module:',
					choices: [
						...moduleChoices.map(choice => choice.name),
						'✅ Done selecting'
					]
				});
				const selectedModuleResult = await modulePrompt.run();
				// Convert display name back to value
				let selectedModule = selectedModuleResult;
				if (selectedModuleResult === '✅ Done selecting') {
					selectedModule = 'done';
				} else {
					const foundChoice = moduleChoices.find(
						choice => choice.name === selectedModuleResult
					);
					selectedModule = foundChoice
						? foundChoice.value
						: selectedModuleResult;
				}

				if (selectedModule === 'done') {
					break;
				}

				const availableCategories = moduleCategories[
					selectedModule
				] || ['all'];

				if (availableCategories.length === 1) {
					// Only 'all' is available
					selectedDecks.push(selectedModule);
					console.log(`Added: ${selectedModule} (all categories)`);
				} else {
					const categoryPrompt = new AutoComplete({
						name: 'selectedCategory',
						message: `Select category for ${selectedModule}:`,
						choices: availableCategories.map(cat =>
							cat === 'all' ? 'All categories' : cat
						)
					});
					const selectedCategoryResult = await categoryPrompt.run();
					// Convert display name back to value
					const selectedCategory =
						selectedCategoryResult === 'All categories'
							? 'all'
							: selectedCategoryResult;

					if (selectedCategory === 'all') {
						selectedDecks.push(selectedModule);
						console.log(
							`Added: ${selectedModule} (all categories)`
						);
					} else {
						selectedDecks.push(
							`${selectedModule}:${selectedCategory}`
						);
						console.log(
							`Added: ${selectedModule}:${selectedCategory}`
						);
					}
				}
			}

			if (selectedDecks.length === 0) {
				console.log('No decks selected. Mask creation cancelled.');
				return;
			}

			let maskName = '';
			while (!maskName.trim()) {
				const maskNamePrompt = new Input({
					name: 'maskName',
					message: 'Enter a name for this mask:'
				});
				maskName = await maskNamePrompt.run();
				if (!maskName.trim()) console.log('Mask name cannot be empty');
			}

			// Save the mask
			const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
			if (!settings.quiz_decks_configuration) {
				settings.quiz_decks_configuration = {
					masks: [],
					use_masks: []
				};
			}

			const newMask = {
				title: maskName.trim(),
				decks_to_enable: selectedDecks
			};

			settings.quiz_decks_configuration.masks.push(newMask);
			fs.writeFileSync(
				settingsPath,
				JSON.stringify(settings, null, '\t')
			);

			console.log(`\n✅ Mask "${maskName}" created successfully!`);
			console.log(`📦 Contains: ${selectedDecks.join(', ')}`);
			console.log(`💡 Use "Toggle mask usage" to activate it.\n`);
		} catch (error) {
			console.error('Error adding mask:', error.message);
		}
	}

	async deleteMask(settingsPath) {
		const fs = require('fs');

		try {
			const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
			const quizConfig = settings.quiz_decks_configuration || {
				masks: [],
				use_masks: []
			};

			if (quizConfig.masks.length === 0) {
				console.log('No masks to delete.');
				return;
			}

			const maskDeletePrompt = new AutoComplete({
				name: 'maskToDelete',
				message: 'Select mask to delete:',
				choices: quizConfig.masks.map(
					mask => `${mask.title} (${mask.decks_to_enable.join(', ')})`
				)
			});
			const maskToDeleteResult = await maskDeletePrompt.run();
			// Extract the mask title from the display string (everything before the first ' (')
			const maskToDelete = maskToDeleteResult.split(' (')[0];

			// Remove from masks array
			quizConfig.masks = quizConfig.masks.filter(
				mask => mask.title !== maskToDelete
			);

			// Remove from use_masks array if present
			quizConfig.use_masks = quizConfig.use_masks.filter(
				title => title !== maskToDelete
			);

			settings.quiz_decks_configuration = quizConfig;
			fs.writeFileSync(
				settingsPath,
				JSON.stringify(settings, null, '\t')
			);

			console.log(`\n✅ Mask "${maskToDelete}" deleted successfully!\n`);
		} catch (error) {
			console.error('Error deleting mask:', error.message);
		}
	}

	async toggleMaskUsageLoop(settingsPath) {
		const fs = require('fs');

		try {
			console.log('\n🔄 Toggle Mask Usage Mode\n');

			while (true) {
				const settings = JSON.parse(
					fs.readFileSync(settingsPath, 'utf8')
				);
				const quizConfig = settings.quiz_decks_configuration || {
					masks: [],
					use_masks: []
				};

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

				const actionPrompt = new AutoComplete({
					name: 'action',
					message: 'What would you like to do?',
					choices: [
						'Toggle individual mask on/off',
						'Select all active masks at once',
						'Finish toggle operations'
					]
				});
				const actionResult = await actionPrompt.run();
				const actionMap = {
					'Toggle individual mask on/off': 'toggle_single',
					'Select all active masks at once': 'select_all',
					'Finish toggle operations': 'finish'
				};
				const action = actionMap[actionResult] || actionResult;

				if (action === 'finish') {
					console.log('✅ Finished toggling mask usage.\n');
					break;
				}

				if (action === 'toggle_single') {
					const maskTogglePrompt = new AutoComplete({
						name: 'maskToToggle',
						message: 'Select mask to toggle:',
						choices: quizConfig.masks.map(mask => {
							const isActive = quizConfig.use_masks.includes(
								mask.title
							);
							const status = isActive
								? '✅ ACTIVE'
								: '❌ INACTIVE';
							return `${mask.title} - ${status}`;
						})
					});
					const maskToToggleResult = await maskTogglePrompt.run();
					// Extract the mask title from the display string (everything before the first ' - ')
					const maskToToggle = maskToToggleResult.split(' - ')[0];

					if (quizConfig.use_masks.includes(maskToToggle)) {
						// Remove from active masks
						quizConfig.use_masks = quizConfig.use_masks.filter(
							title => title !== maskToToggle
						);
						console.log(`❌ Deactivated: ${maskToToggle}`);
					} else {
						// Add to active masks
						quizConfig.use_masks.push(maskToToggle);
						console.log(`✅ Activated: ${maskToToggle}`);
					}

					settings.quiz_decks_configuration = quizConfig;
					fs.writeFileSync(
						settingsPath,
						JSON.stringify(settings, null, '\t')
					);
				} else if (action === 'select_all') {
					const selectedMasksPrompt = new Survey({
						name: 'selectedMasks',
						message:
							'Select which masks should be ACTIVE (uncheck to deactivate):',
						choices: quizConfig.masks.map(mask => ({
							name: mask.title,
							message: `${mask.title} (${mask.decks_to_enable.join(', ')})`,
							initial: quizConfig.use_masks.includes(mask.title)
						}))
					});
					const surveyResult = await selectedMasksPrompt.run();
					// Extract selected mask titles from survey result
					const selectedMasks = Object.keys(surveyResult).filter(
						key => surveyResult[key]
					);

					quizConfig.use_masks = selectedMasks;
					settings.quiz_decks_configuration = quizConfig;
					fs.writeFileSync(
						settingsPath,
						JSON.stringify(settings, null, '\t')
					);

					console.log(`\n✅ Mask usage updated!`);
					console.log(
						`Active masks: ${selectedMasks.join(', ') || 'None'}\n`
					);
				}
			}
		} catch (error) {
			console.error('Error toggling mask usage:', error.message);
		}
	}

	async editExistingMask(settingsPath) {
		const fs = require('fs');
		const { retrieve_terms_as_decks } = require('./md-terms-parser');

		try {
			const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
			const quizConfig = settings.quiz_decks_configuration || {
				masks: [],
				use_masks: []
			};

			if (quizConfig.masks.length === 0) {
				console.log('No masks available to edit.');
				return;
			}

			const maskEditPrompt = new AutoComplete({
				name: 'maskToEdit',
				message: 'Select mask to edit:',
				choices: quizConfig.masks.map(
					mask => `${mask.title} (${mask.decks_to_enable.join(', ')})`
				)
			});
			const maskToEditResult = await maskEditPrompt.run();
			// Extract the mask title from the display string (everything before the first ' (')
			const maskToEdit = maskToEditResult.split(' (')[0];

			const maskIndex = quizConfig.masks.findIndex(
				mask => mask.title === maskToEdit
			);
			const currentMask = quizConfig.masks[maskIndex];

			console.log(`\n📝 Editing mask: ${currentMask.title}`);
			console.log(
				`Current decks: ${currentMask.decks_to_enable.join(', ')}\n`
			);

			// Get available modules and their categories
			console.log('🔍 Loading available modules and categories...\n');
			const termsModules = retrieve_terms_as_decks();
			const moduleChoices = [];
			const moduleCategories = {};

			// Add sample terms modules
			const sampleTerms = require('./terms-data/sample_terms.js');
			Object.keys(sampleTerms).forEach(key => {
				if (Array.isArray(sampleTerms[key])) {
					const displayName = key.replace(/_/g, ' ').toLowerCase();
					moduleChoices.push({
						name: displayName,
						value: displayName
					});
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

			const editActionPrompt = new AutoComplete({
				name: 'editAction',
				message: 'How would you like to edit this mask?',
				choices: [
					'Replace all decks (start fresh)',
					'Add more decks to existing ones',
					'Remove specific decks'
				]
			});
			const editActionResult = await editActionPrompt.run();
			const editActionMap = {
				'Replace all decks (start fresh)': 'replace',
				'Add more decks to existing ones': 'add',
				'Remove specific decks': 'remove'
			};
			const editAction =
				editActionMap[editActionResult] || editActionResult;

			let newDecks = [...currentMask.decks_to_enable];

			if (editAction === 'replace') {
				newDecks = [];
				console.log(
					'\n🔄 Starting fresh - select new decks for this mask:'
				);
			} else if (editAction === 'add') {
				console.log('\n➕ Adding more decks to the existing ones:');
			} else if (editAction === 'remove') {
				const decksToRemovePrompt = new Survey({
					name: 'decksToRemove',
					message: 'Select decks to remove:',
					choices: currentMask.decks_to_enable.map(deck => ({
						name: deck,
						message: deck
					}))
				});
				const removeResult = await decksToRemovePrompt.run();
				// Extract selected deck names from survey result
				const decksToRemove = Object.keys(removeResult).filter(
					key => removeResult[key]
				);

				newDecks = newDecks.filter(
					deck => !decksToRemove.includes(deck)
				);
				console.log(
					`\n✅ Removed ${decksToRemove.length} decks from mask.`
				);
			}

			if (editAction === 'replace' || editAction === 'add') {
				// Select new decks to add
				while (true) {
					const moduleAddPrompt = new AutoComplete({
						name: 'selectedModule',
						message: 'Select a module to add:',
						choices: [
							...moduleChoices.map(choice => choice.name),
							'✅ Done selecting'
						]
					});
					const selectedModuleResult = await moduleAddPrompt.run();
					// Convert display name back to value
					let selectedModule = selectedModuleResult;
					if (selectedModuleResult === '✅ Done selecting') {
						selectedModule = 'done';
					} else {
						const foundChoice = moduleChoices.find(
							choice => choice.name === selectedModuleResult
						);
						selectedModule = foundChoice
							? foundChoice.value
							: selectedModuleResult;
					}

					if (selectedModule === 'done') {
						break;
					}

					const availableCategories = moduleCategories[
						selectedModule
					] || ['all'];

					if (availableCategories.length === 1) {
						// Only 'all' is available
						if (!newDecks.includes(selectedModule)) {
							newDecks.push(selectedModule);
							console.log(
								`Added: ${selectedModule} (all categories)`
							);
						} else {
							console.log(`Already included: ${selectedModule}`);
						}
					} else {
						const categoryAddPrompt = new AutoComplete({
							name: 'selectedCategory',
							message: `Select category for ${selectedModule}:`,
							choices: availableCategories.map(cat =>
								cat === 'all' ? 'All categories' : cat
							)
						});
						const selectedCategoryResult =
							await categoryAddPrompt.run();
						// Convert display name back to value
						const selectedCategory =
							selectedCategoryResult === 'All categories'
								? 'all'
								: selectedCategoryResult;

						const deckSpec =
							selectedCategory === 'all'
								? selectedModule
								: `${selectedModule}:${selectedCategory}`;

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
			fs.writeFileSync(
				settingsPath,
				JSON.stringify(settings, null, '\t')
			);

			console.log(
				`\n✅ Mask "${currentMask.title}" updated successfully!`
			);
			console.log(`📦 Now contains: ${newDecks.join(', ')}\n`);
		} catch (error) {
			console.error('Error editing mask:', error.message);
		}
	}

	listMasks() {
		const { getSettingsManager } = require('./SettingsManager');
		const settingsManager = getSettingsManager();
		const masks = settingsManager.getAllMasks();
		const activeMasks = settingsManager.getActiveMasks();

		console.log('\n=== Quiz Deck Masks ===\n');

		if (masks.length === 0) {
			console.log('No masks configured yet.');
			console.log('Use "mastery mask-create" to create a new mask.\n');
			return;
		}

		masks.forEach((mask, index) => {
			const isActive = activeMasks.includes(mask.title);
			const status = isActive ? '✅ ACTIVE' : '❌ INACTIVE';
			console.log(`${index + 1}. ${mask.title} - ${status}`);
			console.log(`   Decks: ${mask.decks_to_enable.join(', ')}`);
		});

		console.log(
			`\nCurrently active: ${activeMasks.join(', ') || 'None'}\n`
		);
	}

	quickToggleMask(maskName) {
		const { getSettingsManager } = require('./SettingsManager');
		const settingsManager = getSettingsManager();

		try {
			const enabled = settingsManager.toggleMask(maskName);
			const status = enabled ? '✅ ENABLED' : '❌ DISABLED';
			console.log(`\n${status}: ${maskName}\n`);

			const activeMasks = settingsManager.getActiveMasks();
			console.log(
				`Currently active masks: ${activeMasks.join(', ') || 'None'}\n`
			);
		} catch (error) {
			console.error(`Error: ${error.message}\n`);
			console.log('Use "mastery mask-list" to see available masks.\n');
		}
	}

	async quickCreateMask() {
		const { getSettingsManager } = require('./SettingsManager');
		const settingsManager = getSettingsManager();
		const { Input, MultiSelect } = require('enquirer');

		try {
			let maskName = '';
			while (!maskName.trim()) {
				const namePrompt = new Input({
					name: 'name',
					message: 'Mask name:'
				});
				maskName = await namePrompt.run();
				if (!maskName.trim()) console.log('Name cannot be empty');
			}

			let decksInput = '';
			while (!decksInput.trim()) {
				const decksPrompt = new Input({
					name: 'decks',
					message: 'Deck names (comma-separated):'
				});
				decksInput = await decksPrompt.run();
				if (!decksInput.trim())
					console.log('At least one deck required');
			}
			const decks = decksInput
				.split(',')
				.map(d => d.trim())
				.filter(d => d.length > 0);

			settingsManager.createMask(maskName, decks);
			console.log(`\n✅ Created mask: ${maskName}`);
			console.log(`📦 Decks: ${decks.join(', ')}`);
			console.log(
				`\nUse "mastery mask-toggle ${maskName}" to enable it.\n`
			);
		} catch (error) {
			console.error(`Error: ${error.message}\n`);
		}
	}

	showMaskStatus() {
		const { getSettingsManager } = require('./SettingsManager');
		const settingsManager = getSettingsManager();
		const activeMasks = settingsManager.getActiveMasks();
		const enabledDecks = settingsManager.getEnabledDecksFromMasks();

		console.log('\n=== Active Mask Status ===\n');

		if (activeMasks.length === 0) {
			console.log('No masks currently active.');
			console.log('Use "mastery mask-toggle <name>" to enable a mask.\n');
			return;
		}

		console.log(`Active masks: ${activeMasks.join(', ')}`);
		console.log(`\nFiltered decks (${enabledDecks.length} total):`);
		enabledDecks.forEach(deck => console.log(`  - ${deck}`));
		console.log('');
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
	) => {}
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
				.inverse(`${Object.keys(obj)?.[0]} ` ?? 'date')} ${
				Object.values(obj)?.[0] ?? '1'
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

const inreasePerformanceOffline = (feature_name, increaseBY = 1) => {};

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
