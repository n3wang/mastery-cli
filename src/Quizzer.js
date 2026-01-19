const chalk = require('chalk');
const Settings = require('./settings');
const fs = require('fs');
const path = require('path');

const {
	Toggle,
	Confirm,
	prompt,
	AutoComplete,
	Survey,
	Input,
	multiselect
} = require('enquirer');

const constants = require('./constants');
const Parser = require('expr-eval').Parser;

const {
	getAbsoluteUri,
	APIDICT,
	CONSTANTS,
	get_random,
	countDecimals,
	get_random_of_size
} = constants;
const {
	user_requests_exit,
	user_requests_skip,
	user_requests_calc,
	printMarked,
	openEditorPlatformAgnostic
} = require('./utils_functions');

const {
	parseMarkdownCards,
	parseMarkdownIntoDeck,
	parseMarkdownCardsFromFolder,
	parseMarkdownCardsFromTermsModules,
	retrieve_terms_modules,
	retrieve_terms_as_decks
} = require('./md_terms_parser');

const { TermScheduler } = require('./termScheduler');
const { MiniTermScheduler } = require('./MiniTermScheduler');
const { StorableQueue } = require('./StorableQueue');
const { HashStorage } = require('./HashStorage');
const { FeedbackStorage } = require('./FeedbackStorage');
const { RatingStorage } = require('./RatingStorage');
const crypto = require('crypto');

// const DEBUG = true
const DEBUG = false;

class Quizzer {
	constructor(qmathformulas, qmathenabled, masterDeck, masteryManager) {
		const terms = [];
		if (masterDeck) {
			terms.push(...masterDeck.listTerms());
		}
		this.masterDeck = masterDeck;
		this.terms = terms;
		this.enabledqmathformulas = qmathenabled;
		this.masteryManager = masteryManager;

		// Initialize term completion tracker using HashStorage
		this.termCompletionTracker = new HashStorage('term_completion_hashes');
		this.termCompletionTracker.load();

		// Initialize feedback storage
		this.feedbackStorage = new FeedbackStorage('term_feedback');

		// Initialize rating storage
		this.ratingStorage = new RatingStorage('term_ratings');
	}

	/**
	 * Generates a hash for a term based on its content
	 * @param {Object} term - The term object
	 * @returns {string} - 8-character hash
	 */
	generateTermHash(term) {
		const hashLength =
			Settings?.queue_configurations?.hash_based_selection?.hash_length ??
			8;

		// Create content string from available term properties
		const content = [
			term.term || '',
			term.description || '',
			term.example || '',
			term.prompt || ''
		].join('|');

		// Generate SHA256 hash and take first N characters
		const hash = crypto.createHash('sha256').update(content).digest('hex');
		return hash.substring(0, hashLength);
	}

	/**
	 * Gets the completion count for a term hash
	 * @param {string} termHash - The term hash
	 * @returns {number} - Number of times completed
	 */
	getTermCompletionCount(termHash) {
		return this.termCompletionTracker.getCount(termHash);
	}

	/**
	 * Increments the completion count for a term
	 * @param {Object} term - The term object
	 */
	async recordTermCompletion(term) {
		const termHash = this.generateTermHash(term);
		const newCount = this.termCompletionTracker.incrementCount(termHash);
		await this.termCompletionTracker.save();

		if (DEBUG) {
			console.log(
				`Recorded completion for term "${term.term}" (hash: ${termHash}), count: ${newCount}`
			);
		}
	}

	/**
	 * Picks a random question from the enabled list
	 * NOTE It requires the potential questions to have formula_name as the slug
	 * @param {string} potential_questions
	 * @param {int} limit | Optional
	 * OUT:
	 * - {form, replace}
	 */
	getYoungest = async (
		potential_questions,
		{
			limit = Settings?.queue_configurations?.quizzer_repetitive_limit ??
				3,
			account_id = Settings.account_id ?? 1,
			randomOffline = false
		} = {}
	) => {
		if (randomOffline) {
			// Use hash-based selection if enabled
			const hashSelectionEnabled =
				Settings?.queue_configurations?.hash_based_selection?.enabled ??
				true;

			if (hashSelectionEnabled && potential_questions.length > 0) {
				return this.selectLeastPracticedTerms(
					potential_questions,
					limit
				);
			}

			return get_random_of_size(potential_questions, { count: limit });
		}

		return potential_questions;
	};

	/**
	 * Resets all study session completion queues while preserving hash completion data
	 * This clears learning progress but keeps track of term practice counts
	 * @param {string} category - Optional specific category to reset, if not provided resets all
	 */
	async resetStudySessionQueues(category = null) {
		const { glob } = require('glob');
		const fs = require('fs');
		const path = require('path');
		const { getDirAbsoluteUri } = require('./utils_functions');

		try {
			const tempDir = getDirAbsoluteUri('./user_data/temp/');

			// Define patterns for queue files (but not hash files)
			const queuePatterns = [
				'working_set*',
				'learning_queue*',
				'learned_queue*'
			];

			let deletedFiles = [];

			for (const pattern of queuePatterns) {
				const fullPattern = path.join(tempDir, pattern);
				const files = glob.sync(fullPattern);

				for (const file of files) {
					// If category specified, only delete files with that category suffix
					if (category) {
						const fileName = path.basename(file, '.json');
						if (!fileName.endsWith('_' + category)) {
							continue;
						}
					}

					if (fs.existsSync(file)) {
						fs.unlinkSync(file);
						deletedFiles.push(path.basename(file));
					}
				}
			}

			console.log(
				`Reset study session queues. Deleted files: ${deletedFiles.join(
					', '
				)}`
			);
			console.log(
				'Hash completion data preserved for smart term selection.'
			);

			return { success: true, deletedFiles };
		} catch (error) {
			console.error(
				'Failed to reset study session queues:',
				error.message
			);
			return { success: false, error: error.message };
		}
	}

	/**
	 * Selects the least practiced terms using hash-based completion tracking
	 * @param {Array} potential_questions - Array of potential terms
	 * @param {number} limit - Number of terms to return
	 * @returns {Array} - Selected terms prioritizing least practiced
	 */
	selectLeastPracticedTerms(potential_questions, limit) {
		const sampleSize =
			Settings?.queue_configurations?.hash_based_selection?.sample_size ??
			15;

		// If we have fewer questions than the sample size, use all of them
		const actualSampleSize = Math.min(
			sampleSize,
			potential_questions.length
		);

		// Step 1: Get a random sample of terms
		const randomSample = get_random_of_size(potential_questions, {
			count: actualSampleSize
		});

		// Step 2: Score each term based on completion count (lower count = higher priority)
		const scoredTerms = randomSample.map(term => {
			const termHash = this.generateTermHash(term);
			const completionCount = this.getTermCompletionCount(termHash);

			return {
				term: term,
				hash: termHash,
				completionCount: completionCount,
				// Add small random factor to break ties
				randomFactor: Math.random() * 0.1
			};
		});

		// Step 3: Sort by completion count (ascending) with random factor as tiebreaker
		scoredTerms.sort((a, b) => {
			const countDiff = a.completionCount - b.completionCount;
			if (countDiff !== 0) return countDiff;
			return a.randomFactor - b.randomFactor;
		});

		// Step 4: Select the top N least practiced terms
		const selectedTerms = scoredTerms
			.slice(0, limit)
			.map(scored => scored.term);

		if (DEBUG) {
			console.log('Hash-based selection results:');
			scoredTerms.slice(0, limit).forEach((scored, index) => {
				console.log(
					`${index + 1}. "${scored.term.term}" (${
						scored.hash
					}) - completed ${scored.completionCount} times`
				);
			});
		}

		return selectedTerms;
	}

	/**
	 * Picks a math question from the list of math questions in this Quizzer.
	 * 1-15-2021: It will just shuffle the list and pick the first one. No internet required. This is done to accelerate the process.
	 * @returns {QuestionStructure} question_selected
	 */
	pick_math_question = async () => {
		let potential_questions = this.enabledqmathformulas;
		potential_questions = await this.getYoungest(potential_questions, {
			randomOffline: true
		});
		// if (DEBUG) console.log("potential_questions", potential_questions);
		return await get_random(potential_questions);
	};

	/**
     * Picks a term from the list of terms in this Quizzer
     *  *  Terms Structure:
            {
                term: 'Singleton Pattern',
                example: '',
                description: '',
                references: '',
                category: '',
                prompt: 'Use the term',
                formula_name: 'singleton-pattern'
            }
     * @returns {TermStructure} term_selected
     */
	pick_term_question = async () => {
		console.log('Picking terms from:', this.terms?.length || 0, 'total terms');
		if (!this.terms || this.terms.length === 0) {
			console.error('No terms available for quiz. Terms array is empty or undefined.');
			return null;
		}
		
		let potential_questions = this.terms;
		potential_questions = await this.getYoungest(potential_questions, {
			randomOffline: true
		});

		if (!potential_questions || potential_questions.length === 0) {
			console.error('No potential questions returned from getYoungest');
			return null;
		}

		return get_random(potential_questions);
	};

	/**
	 * Runs terms questions until the terms are done.
	 * @param {function} exitMethod the exit method
	 * @returns {int} attempts: The amount of attempts made to learn the terms.
	 */
	forceLearnTermQuestions = async ({ exitMethod = () => {} } = {}) => {
		let potential_questions = this.terms;

		potential_questions = await this.getYoungest(potential_questions, {
			limit:
				Settings?.queue_configurations?.quizzer_force_learn_limit ?? 2,
			randomOffline: true
		});
		let attempts = 0;
		let attempts_timestamps = [];

		let exit_force_method = false;

		// Long term memory. using named: lgterm_forced_terms
		const lgtermScheduler = new StorableQueue({
			name: 'lgterm_forced_terms'
		});
		// Try loading.
		await lgtermScheduler.load();

		// Create miniqueue
		// If there is more than one scheduler elements add the first one it to the mini queue's potential_questions
		if (lgtermScheduler.length > 0) {
			// If larger than three assign the last three in the queue.
			const lastThreeCount =
				Settings?.queue_configurations
					?.quizzer_force_learn_last_three ?? 3;
			if (lgtermScheduler.length >= lastThreeCount) {
				const lastThree = lgtermScheduler.elements.slice(
					-lastThreeCount
				);
				// Remove the last three from the queue
				lgtermScheduler.elements = lgtermScheduler.elements.slice(
					0,
					-lastThreeCount
				);
				potential_questions = lastThree;
			} else {
				const firstElement = lgtermScheduler.dequeue();
				potential_questions.push(firstElement);
			}
			await lgtermScheduler.save();
		}

		const total_cards = potential_questions.length;

		const miniTermScheduler = new MiniTermScheduler(potential_questions);
		const wrappedExitMethod = () => {
			exitMethod();
			exit_force_method = true;
		};

		while (miniTermScheduler.cardsCount != 0 && !exit_force_method) {
			// Print the statistics
			console.log(
				`queue: ${miniTermScheduler.cardsCount}/${total_cards}`
			);
			const card = miniTermScheduler.getCard();
			// console.log("card", card);
			const response = await this.ask_term_question(card, {
				exitMethod: wrappedExitMethod
			});
			if (response == true) {
				// increase the terms
			} else {
				if (!lgtermScheduler.has(card)) {
					// Add to the long term memory only if it was never added yet.
					lgtermScheduler.enqueue(card);
					await lgtermScheduler.save();
				}
			}
			attempts += 1;
			attempts_timestamps.push(new Date());

			miniTermScheduler.solveCard(response);
		}

		return attempts;
	};

	/**
	 * PopulateVariables using naming e.g. d_1 => digit
	 * @param {List[str]} replace : List of Strings
	 * @Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match
	 */
	populateVariables(replace) {
		const variables = {};
		const variable_regex = /(\w+)_(\d)/;
		// if (DEBUG) console.log('replace', replace);
		for (const var_name of replace) {
			// if (DEBUG) console.log('var_name', var_name);
			const variabledetected = var_name.match(variable_regex);
			variables[var_name] = this.getRandomFromType(variabledetected[1]);
		}

		// if (DEBUG) console.log("populated variables", variables);
		return variables;
	}

	/**
	 * Depending on the random type, it will return a random number from different ranges:
	 * - d: 2- 100
	 * - sd: 2-20
	 * - md: 2-50
	 * - ld: 2-10000
	 *
	 * @param {Enumerator: String} type "d | sd | md | ld"
	 * @returns
	 */
	getRandomFromType(type) {
		const ETypes = {};
		let ATLEAST = 2;
		// if (DEBUG) console.log("getRandom from type called", constants.getRandomInt(100), "using type:", type, type=="d");
		if (type == 'd') {
			return constants.getRandomInt(100 - ATLEAST) + ATLEAST;
		} else if (type == 'sd') {
			return constants.getRandomInt(20 - ATLEAST) + ATLEAST;
		} else if (type == 'md') {
			return constants.getRandomInt(50 - ATLEAST) + ATLEAST;
		} else if (type == 'ld') {
			// 1000-10000
			return constants.getRandomInt(10000 - ATLEAST) + ATLEAST;
		}
	}

	/**
	 * Compiles chosen form using form and replace
	 * IN:
	 * {form, replace}
	 * OUT:
	 * - {  question_prompt (with replace replaced with numbers) , expectedAnswer}
	 */
	compile_question(question) {
		// if (DEBUG) console.log("Compile question received", question)
		const form = question?.form;
		const replace = question?.replace ?? [];
		const calculates = question?.calculates ?? 'y';
		const human_form = question?.human;

		// if (DEBUG) console.log("question", question)
		const variables = this.populateVariables(replace);
		var parser = new Parser();
		const humanQuestion = this.getHumanQuestion(
			form,
			variables,
			calculates,
			human_form
		);
		parser.evaluate(form, variables);
		if (DEBUG) console.log('variables', variables);

		// if (DEBUG) console.log("question.form", question.form);
		return {
			question_prompt: humanQuestion,
			expectedAnswer: variables?.[calculates],
			'form:': question.form
		};
	}

	/**
	 * Replaces the string in format of %d with a random number
	 * @param {string} formString the string to replace variables in
	 * @param {dict} variables Variables that will be replaced in the formString
	 * @returns {string} formString with variables replaced
	 */
	replaceStringVariables(formString, variables) {
		for (const variablename of Object.keys(variables)) {
			formString = formString.replace(
				variablename,
				variables[variablename]
			);
		}
		return formString;
	}

	getHumanQuestion(form, variables, solveFor, human_form = '') {
		let question_message = '';
		if (human_form != '') {
			question_message = this.replaceStringVariables(
				human_form,
				variables
			);
		} else {
			const question = this.replaceStringVariables(form, variables);
			const variablesToSolveFor = solveFor.join(' ');
			question_message = `solve for ${variablesToSolveFor}, using ${question}`;
		}

		return question_message;
	}

	/**
	 * Asks question and waits for response, allows repetition.
	 */
	async askQuestion({ ask_until_one_is_correct = true } = {}) {
		// Replace with Chance
		// if (DEBUG) console.log("Asking terms", this.terms)
		// const askMath = true;
		let exit = false;
		const exitMethod = () => {
			if (DEBUG) console.log('Exit method requested');
			exit = true;
			return false;
		};

		const askQuestionRandom = async ({
			exitMethod = () => {},
			force_mode = true
		} = {}) => {
			let questionTypes = ['math', 'term'];
			if (Settings?.quiz_enabled) {
				questionTypes = Settings.quiz_enabled;
			}

			const questionType =
				questionTypes[constants.getRandomInt(questionTypes.length)];

			switch (questionType) {
				case 'math':
					return await this.ask_math_question({
						exitMethod: exitMethod
					});
				case 'term':
					return await this.forceLearnTermQuestions({
						exitMethod: exitMethod
					});

				default:
					return await this.ask_math_question({
						exitMethod: exitMethod
					});
			}
		};
		let answerIsCorrect = false;
		if (ask_until_one_is_correct)
			while (!answerIsCorrect && !exit) {
				answerIsCorrect = await askQuestionRandom({
					exitMethod: exitMethod
				});
			}
		else {
			const _ = askQuestionRandom();
		}
		return true;
	}

	// Returns the term deck name (key), in which is stored the term's deck.
	async pick_terms_deck() {
		return '';
	}

	async runStudySession(selected_terms, deck_name, options = {}) {
		const { resetScheduler = false } = options;

		// Store current deck terms for reset functionality
		this.currentDeckTerms = selected_terms;
		this.currentDeckName = deck_name;
		this.shouldResetAndRestart = false;

		// Sort by hash completion count (least practiced first), then by reverse order as fallback
		selected_terms.sort((a, b) => {
			const hashA = this.generateTermHash(a);
			const hashB = this.generateTermHash(b);
			const countA = this.getTermCompletionCount(hashA);
			const countB = this.getTermCompletionCount(hashB);

			// If hash counts are different, sort by count (ascending - least practiced first)
			if (countA !== countB) {
				return countA - countB;
			}

			// If hash counts are the same, maintain reverse order as fallback
			return selected_terms.indexOf(b) - selected_terms.indexOf(a);
		});

		const studyScheduler = new TermScheduler({
			cards_category: deck_name
		});

		await studyScheduler.setLearningCards(selected_terms, {
			reset_scheduler: resetScheduler
		});
		let exit = false;

		// Load localStorage for tracking today's progress
		const { LocalStorage } = require('./LocalStorage');
		const localStorage = new LocalStorage();
		await localStorage.load();

		// Get today's total learned count for motivation
		// Reload data each time to get the most recent count
		const getTodayLearnedCount = async () => {
			const date = new Date().toISOString().split('T')[0];
			try {
				await localStorage.load();
				const dayData = localStorage.date_based_stats?.[date] || {};
				return dayData.flashcard_learned?.value || 0;
			} catch {
				return 0;
			}
		};

		const printCardsLeft = async (cardsLeft, cardsLearnt) => {
			const todayTotal = await getTodayLearnedCount();
			console.log(
				`\nCards left: ${cardsLeft} || Cards completed: ${cardsLearnt} || Today: ${todayTotal}\n`
			);
		};

		const exitMethod = () => {
			exit = true;
			return false;
		};

		while (!studyScheduler.is_completed && !exit) {
			const showProgress = (
				cardsLeft,
				cardsCompleted,
				learning,
				working
			) => {
				console.log(
					`Cards left: ${cardsLeft} || Cards completed: ${cardsCompleted} || learning ${learning} || workingset: ${working}`
				);
			};

			if (DEBUG)
				showProgress(
					studyScheduler.getCardsToLearn(),
					studyScheduler.getCardsLearnt(),
					studyScheduler.learning_queue.length,
					studyScheduler.working_set.length
				);

			const card_to_ask = studyScheduler.getCard();

			// Prepare progress stats to display with the card
			const todayTotal = await getTodayLearnedCount();
			const progressStats = {
				cardsLeft: studyScheduler.getCardsToLearn(),
				cardsCompleted: studyScheduler.getCardsLearnt(),
				todayTotal: todayTotal
			};

			const answered_correctly = await this.ask_term_question(
				card_to_ask,
				{ exitMethod: exitMethod, progressStats: progressStats }
			);

			studyScheduler.solveCard(answered_correctly);
			await studyScheduler.saveCards();

			await printCardsLeft(
				studyScheduler.getCardsToLearn(),
				studyScheduler.getCardsLearnt()
			);
		}

		// Check if reset was triggered during the session
		if (this.shouldResetAndRestart) {
			console.log('Reloading deck with reset progress...\n');
			await this.runStudySession(this.currentDeckTerms, deck_name, { resetScheduler: true });
			return;
		}

		// If deck completed (not exited early), offer to reset progress
		if (!exit && studyScheduler.is_completed) {
			console.log('\n✓ Deck completed!');
			const resetPrompt = new Confirm({
				name: 'resetProgress',
				message: 'Would you like to reset this deck\'s progress and restart?',
				initial: false
			});

			const shouldReset = await resetPrompt.run();
			if (shouldReset) {
				const resetCount = await this.resetCurrentDeckProgress();
				console.log(`✓ Reset progress for ${resetCount} terms in "${deck_name}"\n`);
			}

			// Restart the deck regardless of reset choice (always reset scheduler to reload cards)
			console.log('Restarting deck...\n');
			await this.runStudySession(this.currentDeckTerms, deck_name, { resetScheduler: true });
		}
	}


	/**
	 * Count how many terms in a deck have been studied (completion count > 0)
	 * @param {Array} terms - Array of terms to check
	 * @returns {number} - Count of studied terms
	 */
	countStudiedTerms(terms) {
		let studiedCount = 0;
		for (const term of terms) {
			const hash = this.generateTermHash(term);
			const completionCount = this.termCompletionTracker.getCount(hash);
			if (completionCount > 0) {
				studiedCount++;
			}
		}
		return studiedCount;
	}

	study_session = async (
		masterDeck = this.masterDeck,
		{ reverse = false, size_study_deck = -1 } = {}
	) => {
		//Pick a term deck Suppose is given

		// Terms are already loaded via ensureTermsLoaded() before this method is called
		// No need to add decks again - this was causing duplicates
		const dictOptions = masterDeck.deck_titles_with_count;

		let titles = [...Object.keys(dictOptions)];

		// Sort by count(from dict Options)
		titles.sort(
			(a, b) => dictOptions[b].count - dictOptions[a].count
		);

		// Add Today's Deck option if enabled
		const { DailyDeckManager } = require('./DailyDeckManager');
		const dailyDeckConfig = Settings?.daily_deck_configuration || {};
		const dailyDeckEnabled = dailyDeckConfig.enabled !== false;

		// Format deck choices with completion progress and nested deck indicators
		const displayToOriginalMapping = {};
		let deckChoices = titles.map(title => {
			const deckInfo = dictOptions[title];
			const deckName = deckInfo.name;
			
			// Get all terms for this deck to calculate completion
			const deckTerms = masterDeck.listTerms({ get_only: [deckName] });
			const studiedCount = this.countStudiedTerms(deckTerms);
			const totalCount = deckTerms.length;
			
			// Build display string with completion count
			let displayTitle = title;
			if (totalCount > 0) {
				// Insert completion count before " - X cards"
				const cardsMatch = title.match(/ - \d+ cards$/);
				if (cardsMatch) {
					const baseTitle = title.substring(0, title.length - cardsMatch[0].length);
					displayTitle = `${baseTitle} (${studiedCount}/${totalCount})${cardsMatch[0]}`;
				}
			}
			
			// Add nested deck indicator if present
			if (deckInfo.nested_count > 0) {
				displayTitle = `${displayTitle} - ${deckInfo.nested_count}N`;
			}
			
			// Store mapping from display title to original title
			displayToOriginalMapping[displayTitle] = title;
			
			return displayTitle;
		});
		if (dailyDeckEnabled) {
			const dailyDeckManager = new DailyDeckManager(Settings);
			const todayDeck = dailyDeckManager.getTodayDeck();
			if (todayDeck) {
				const status = dailyDeckManager.getCompletionStatus(todayDeck);
				if (status.isComplete) {
					deckChoices.unshift(`Today's Deck (Completed ✓)`);
				} else {
					deckChoices.unshift(`Today's Deck (${status.completed}/${status.total} cards)`);
				}
			} else {
				deckChoices.unshift('Today\'s Deck (Generate now)');
			}
		}

		const ms_deck = new AutoComplete({
			name: 'StudyOption',
			message: 'Choose deck to study',
			choices: deckChoices
		});

		let deck_selected_key = await ms_deck.run();
		// Handle Today's Deck selection
		if (deck_selected_key.startsWith('Today\'s Deck')) {
			const dailyDeckManager = new DailyDeckManager(Settings);
			let todayDeck = dailyDeckManager.getTodayDeck();

			if (!todayDeck) {
				// Show week-ahead summary
				const weekSummary = dailyDeckManager.getWeekAheadSummary();
				console.log('\n=== Week Ahead Summary ===');
				for (const day of weekSummary) {
					if (day.exists) {
						const statusStr = day.isComplete ? 'Completed ✓' : `${day.completed}/${day.total}`;
						console.log(`  ${day.dayName} (${day.date}): ${statusStr}`);
					} else {
						console.log(`  ${day.dayName} (${day.date}): Not generated`);
					}
				}
				console.log('');

				// Ask user what to do
				const { AutoComplete } = require('enquirer');
				const actionPrompt = new AutoComplete({
					name: 'action',
					message: 'What would you like to do?',
					choices: [
						'Generate today\'s deck only',
						'Generate week ahead (7 days)',
						'Configure and generate today',
						'Cancel'
					]
				});

				const action = await actionPrompt.run();

				if (action === 'Cancel') {
					console.log('Cancelled. Please select another deck.');
					return;
				}

				const cardsPerDeck = dailyDeckConfig.cards_per_deck || 5;
				const maxTotalCards = dailyDeckConfig.max_total_cards || 20;

				if (action === 'Generate week ahead (7 days)') {
					console.log('\nGenerating decks for the next 7 days...');
					const generatedDecks = await dailyDeckManager.prepareWeekAhead(masterDeck, {
						cardsPerDeck,
						maxTotalCards
					});
					console.log(`Generated ${generatedDecks.length} daily decks successfully!\n`);
					todayDeck = dailyDeckManager.getTodayDeck();
				} else if (action === 'Configure and generate today') {
					// Ask for custom configuration
					const { NumberPrompt } = require('enquirer');

					const cardsPrompt = new NumberPrompt({
						name: 'cards',
						message: 'Cards per deck:',
						initial: cardsPerDeck
					});
					const customCardsPerDeck = await cardsPrompt.run();

					const totalPrompt = new NumberPrompt({
						name: 'total',
						message: 'Total cards:',
						initial: maxTotalCards
					});
					const customMaxTotal = await totalPrompt.run();

					console.log(`\nGenerating deck with ${customCardsPerDeck} cards per deck, ${customMaxTotal} total...`);
					todayDeck = await dailyDeckManager.generateDailyDeck(masterDeck, {
						cardsPerDeck: customCardsPerDeck,
						maxTotalCards: customMaxTotal
					});
				} else {
					// Generate today only
					console.log('Generating today\'s deck...');
					todayDeck = await dailyDeckManager.generateDailyDeck(masterDeck, {
						cardsPerDeck,
						maxTotalCards
					});
				}

				if (!todayDeck) {
					console.log('Failed to generate daily deck. Please try another deck.');
					return;
				}

				console.log('\n' + dailyDeckManager.getTodaySummary());
			}

			const allTerms = dailyDeckManager.getAllTermsFromDailyDeck(todayDeck);
			if (allTerms.length === 0) {
				console.log('No terms available in today\'s deck.');
				return;
			}
			return this.runStudySession(allTerms, 'daily_deck');
		}

		// Convert display title back to original title for dictionary lookup
		const originalKey = displayToOriginalMapping[deck_selected_key] || deck_selected_key;
		let deck_selected = dictOptions[originalKey].name;

		let selected_terms = masterDeck.listTerms({
			get_only: [deck_selected]
		});

		// Find the selected deck to get its sort option
		const selectedDeckObj = masterDeck.findDeck(deck_selected);
		if (selectedDeckObj) {
			selected_terms = selectedDeckObj.applySortOption(selected_terms);
		}

		// Collect categories from the selected deck's terms with counts
		const categoryCounts = {};
		selected_terms.forEach(term => {
			if (term.category) {
				categoryCounts[term.category] = (categoryCounts[term.category] || 0) + 1;
			}
		});

		// If there are multiple categories, ask user to choose
		if (Object.keys(categoryCounts).length > 1) {
			const totalCards = selected_terms.length;
			const categoryChoices = [
				`all (${totalCards})`,
				...Object.keys(categoryCounts)
					.sort()
					.map(category => `${category} (${categoryCounts[category]})`)
			];

			const ms_category = new AutoComplete({
				name: 'CategoryOption',
				message: 'Choose category to study',
				choices: categoryChoices
			});

			let category_selected_with_count = await ms_category.run();
			
			// Extract category name without count
			let category_selected = category_selected_with_count.split(' (')[0];

			// Filter terms by selected category if not 'all'
			if (category_selected !== 'all') {
				selected_terms = selected_terms.filter(term => term.category === category_selected);
			}
		}

		return this.runStudySession(selected_terms, deck_selected);
	};

	filtered_study_session = async (
		masterDeck = this.masterDeck,
		{ reverse = false, size_study_deck = -1 } = {}
	) => {
		const SettingsManager = require('./SettingsManager');
		const settingsManager = new SettingsManager();
		const enabledDecks = settingsManager.getEnabledDecksFromMasks();

		if (enabledDecks.length === 0) {
			console.log('\nNo masks are currently active or configured.');
			console.log('Use "mastery mask-list" to see available masks.');
			console.log('Use "mastery mask-toggle <mask-name>" to enable a mask.\n');
			return;
		}

		console.log(`\nFiltered by active masks: ${settingsManager.getActiveMasks().join(', ')}\n`);

		const dictOptions = masterDeck.deck_titles_with_count;
		let titles = [...Object.keys(dictOptions)];

		titles = titles.filter(title => {
			const deckInfo = dictOptions[title];
			const deckName = deckInfo.name;
			const deckNameLower = deckName.toLowerCase();

			return enabledDecks.some(enabledDeck => {
				const enabledDeckLower = enabledDeck.toLowerCase();

				// Exact match (case insensitive)
				if (deckNameLower === enabledDeckLower) {
					return true;
				}

				// Substring match (both directions)
				if (deckNameLower.includes(enabledDeckLower) ||
					enabledDeckLower.includes(deckNameLower)) {
					return true;
				}

				// Normalize names: replace underscores and hyphens with spaces for comparison
				const normalizedDeckName = deckNameLower.replace(/[-_]/g, ' ');
				const normalizedFilter = enabledDeckLower.replace(/[-_]/g, ' ');

				if (normalizedDeckName.includes(normalizedFilter) ||
					normalizedFilter.includes(normalizedDeckName)) {
					return true;
				}

				return false;
			});
		});

		if (titles.length === 0) {
			console.log('\nNo decks match the enabled filters.');
			console.log('Filters from masks:', enabledDecks.join(', '));
			console.log('\nLoaded deck names:');
			const allDeckNames = Object.keys(dictOptions).map(key => dictOptions[key].name);
			allDeckNames.slice(0, 20).forEach(name => console.log(`  - ${name}`));
			if (allDeckNames.length > 20) {
				console.log(`  ... and ${allDeckNames.length - 20} more`);
			}
			console.log('\nUse "mastery ses" for unfiltered deck selection.\n');
			return;
		}

		titles.sort((a, b) => dictOptions[b].count - dictOptions[a].count);

		const { DailyDeckManager } = require('./DailyDeckManager');
		const dailyDeckConfig = Settings?.daily_deck_configuration || {};
		const dailyDeckEnabled = dailyDeckConfig.enabled !== false;

		const displayToOriginalMapping = {};
		let deckChoices = titles.map(title => {
			const deckInfo = dictOptions[title];
			const deckName = deckInfo.name;

			const deckTerms = masterDeck.listTerms({ get_only: [deckName] });
			const studiedCount = this.countStudiedTerms(deckTerms);
			const totalCount = deckTerms.length;

			let displayTitle = title;
			if (totalCount > 0) {
				const cardsMatch = title.match(/ - \d+ cards$/);
				if (cardsMatch) {
					const baseTitle = title.substring(0, title.length - cardsMatch[0].length);
					displayTitle = `${baseTitle} (${studiedCount}/${totalCount})${cardsMatch[0]}`;
				}
			}

			if (deckInfo.nested_count > 0) {
				displayTitle = `${displayTitle} - ${deckInfo.nested_count}N`;
			}

			displayToOriginalMapping[displayTitle] = title;

			return displayTitle;
		});

		if (dailyDeckEnabled) {
			const dailyDeckManager = new DailyDeckManager(Settings);
			const todayDeck = dailyDeckManager.getTodayDeck();
			if (todayDeck) {
				const status = dailyDeckManager.getCompletionStatus(todayDeck);
				if (status.isComplete) {
					deckChoices.unshift(`Today's Deck (Completed ✓)`);
				} else {
					deckChoices.unshift(`Today's Deck (${status.completed}/${status.total} cards)`);
				}
			} else {
				deckChoices.unshift('Today\'s Deck (Generate now)');
			}
		}

		const { AutoComplete } = require('enquirer');
		const ms_deck = new AutoComplete({
			name: 'StudyOption',
			message: 'Choose deck to study (filtered)',
			choices: deckChoices
		});

		let deck_selected_key = await ms_deck.run();

		if (deck_selected_key.startsWith('Today\'s Deck')) {
			const dailyDeckManager = new DailyDeckManager(Settings);
			let todayDeck = dailyDeckManager.getTodayDeck();

			if (!todayDeck) {
				const weekSummary = dailyDeckManager.getWeekAheadSummary();
				console.log('\n=== Week Ahead Summary ===');
				for (const day of weekSummary) {
					if (day.exists) {
						const statusStr = day.isComplete ? 'Completed ✓' : `${day.completed}/${day.total}`;
						console.log(`  ${day.dayName} (${day.date}): ${statusStr}`);
					} else {
						console.log(`  ${day.dayName} (${day.date}): Not generated`);
					}
				}
				console.log('');

				const actionPrompt = new AutoComplete({
					name: 'action',
					message: 'What would you like to do?',
					choices: [
						'Generate today\'s deck',
						'Prepare full week ahead',
						'Go back to deck selection'
					]
				});

				const action = await actionPrompt.run();

				if (action === 'Generate today\'s deck') {
					todayDeck = dailyDeckManager.generateTodayDeck(masterDeck);
					console.log(`\nGenerated today's deck with ${todayDeck.terms.length} cards\n`);
				} else if (action === 'Prepare full week ahead') {
					dailyDeckManager.prepareWeekAhead(masterDeck);
					console.log('\nWeek ahead prepared!\n');
					todayDeck = dailyDeckManager.getTodayDeck();
				} else {
					return this.filtered_study_session(masterDeck, { reverse, size_study_deck });
				}
			}

			const selected_terms = todayDeck.terms;
			return this.runStudySession(selected_terms, 'Today\'s Deck');
		}

		const originalKey = displayToOriginalMapping[deck_selected_key] || deck_selected_key;
		const deck_selected = dictOptions[originalKey].name;

		let selected_terms = masterDeck.listTerms({
			get_only: [deck_selected]
		});

		if (size_study_deck > 0) {
			selected_terms = selected_terms.slice(0, size_study_deck);
		}

		if (reverse) {
			selected_terms = selected_terms.reverse();
		}

		const categories = [...new Set(selected_terms.map(term => term.category))];

		if (categories.length > 1) {
			const { AutoComplete } = require('enquirer');
			const ms_category = new AutoComplete({
				name: 'CategoryOption',
				message: 'Choose category (optional filter)',
				choices: ['all', ...categories]
			});

			const category_selected = await ms_category.run();

			if (category_selected !== 'all') {
				selected_terms = selected_terms.filter(term => term.category === category_selected);
			}
		}

		return this.runStudySession(selected_terms, deck_selected);
	};

	/**
	 *
	 * @param {method} param0
	 * @returns
	 */
	async pick_and_ask_term_question({ exitMethod = () => {} } = {}) {
		// Fetches a random term form with the youngest one, unless there is no internet

		const term_selected = await this.pick_term_question();
		if (DEBUG) console.log('term_selected', term_selected);
		
		if (!term_selected) {
			console.error('No term could be selected for quiz. Check if terms are loaded properly.');
			return false;
		}
		
		return await this.ask_term_question(term_selected, {
			exitMethod: exitMethod
		});
	}

	async ask_term_question(
		term_selected,
		{ ask_if_correct = true, exitMethod = () => {}, is_try_questin_again: is_try_question_again=false, progressStats = null } = {}
	) {
		try {
			// Start running the question_attempt
			/**
             *  Term Structure
                {
                    term: 'Singleton Pattern',
                    example: '',
                    description: '',
                    references: '',
                    category: '',
                    prompt: 'Use the term',
                    formula_name: 'singleton-pattern'
                }
                
                2024-02-01 13:23:13
                - Remove updateConcept no increase is required
             */

			//If both the term and the description are "" or have no length or are null then assume is a bad term.
			const isInvalidData = data => {
				if (!data?.length ?? 0) return true;
				if (data == undefined || data == null) return true;
				if (data === '') return true;

				return false;
			};

			if (
				isInvalidData(term_selected.term) &&
				isInvalidData(term_selected.description)
			) {
				// Bad data for term testing
				throw ('isInvalidData: term_selected:', term_selected);
			}

			// Create flashcard markdown file before showing the question
			await this.createFlashcardMarkdown(term_selected, false);

			// Display progress stats at the top if provided
			if (progressStats) {
				const statsText = `Cards left: ${progressStats.cardsLeft} || Cards completed: ${progressStats.cardsCompleted} || Today: ${progressStats.todayTotal}`;
				if (Settings?.minimal_colors) {
					console.log(statsText);
				} else {
					console.log(chalk.hex('#90EE90').bold(statsText));
				}
				console.log(''); // Add spacing
			}

			const isOfflineMessage = Settings?.online
				? ''
				: Settings?.minimal_colors
					? ' | offline'
					: `|${chalk.hex(CONSTANTS.CUTEYELLOW).inverse(' offline ')}`;
			// console.log(term_selected);
			// console.trace()
			if (term_selected?.reference_page ?? false) {
				if (
					(term_selected?.reference_line ?? false) &&
					term_selected.reference_line > 0
				) {
					console.log(
						`${term_selected?.reference_page}#${term_selected?.reference_line}`
					);
				} else {
					console.log(`${term_selected?.reference_page}`);
				}
			}

			// Display term and category with or without colors based on setting
			if (Settings?.minimal_colors) {
				console.log(`${term_selected.term} | ${term_selected.category}${isOfflineMessage}`);
			} else {
				console.log(
					`${chalk
						.hex(CONSTANTS.CUTEBLUE)
						.inverse(` ${term_selected.term} `)}|${chalk
						.hex(CONSTANTS.PUNCHPINK)
						.inverse(` ${term_selected.category} `)}${isOfflineMessage}`
				);
			}

			if (term_selected?.attachment ?? false) {
				let image_file = getAbsoluteUri(term_selected?.attachment);
				console.log(`attachment: ${image_file}`);
			}

			printMarked(term_selected?.description ?? '', {
				use_markdown: true
			});

			// Display stored feedback/corrections after description
			const storedFeedback = this.feedbackStorage.getFeedbackByTerm(term_selected);
			if (storedFeedback && storedFeedback.feedback) {
				console.log(''); // Add spacing
				if (Settings?.minimal_colors) {
					console.log('Corrections:');
				} else {
					console.log(chalk.hex(CONSTANTS.CUTEYELLOW).bold('Corrections:'));
				}
				printMarked(storedFeedback.feedback, { use_markdown: true });
				const feedbackDate = new Date(storedFeedback.timestamp).toLocaleDateString();
				if (Settings?.minimal_colors) {
					console.log(`(Added on ${feedbackDate})`);
				} else {
					console.log(chalk.gray(`(Added on ${feedbackDate})`));
				}
				console.log(''); // Add spacing
			}

			const question = new Input({
				name: 'Term Question',
				message: `${term_selected.prompt} (Ignore with "no")\n`
			});

			const user_res = await question.run();

			// Check for escape methods

			if (user_requests_calc(user_res)) {
				openEditorPlatformAgnostic('node');
				// Make the user lose one point for using the calculator.
				return false;
			}

			if (user_requests_exit(user_res)) {
				exitMethod();
				return false;
			}

			if (user_requests_skip(user_res)) {
				this.printExample(term_selected); //You want to print the example as if it didn't know the answer for the next time.
				// Update markdown with example after skipping
				return false;
			}
			
			await this.createFlashcardMarkdown(term_selected, true);
			let ISANSWERCORRECT = true;
			// Print the correct example term if exists

			// if ask_if_correct is true then ask if it is corerect and update after showing examples
			printMarked(term_selected?.example ?? '', { use_markdown: true });

			if (ask_if_correct) {
				const is_correct = new Confirm({
					name: 'is_correct',
					message: 'Is the response correct?',
					initial: true
				});
				const response = await is_correct.run();
				ISANSWERCORRECT = response;

				// Track flashcard attempts and learned counts
				if (!is_try_question_again) {
					this.masteryManager.increasePerformance('flashcard_attempts', 'feat', 1);
					if (response) {
						this.masteryManager.increasePerformance('flashcard_learned', 'feat', 1);
					}
				}

				// Update markdown with answer revealed
				if (response) {
					const _ = await this.masteryManager.logSkillExperience(
						term_selected.category,
						{
							score: ISANSWERCORRECT && !is_try_question_again ? 1 : 0,
							deck_id: term_selected.category,
							deck_term: term_selected.term,
							comment: user_res,
							increased_performance: true,
							performance_feature: 'term'
						}
					);
				} else {
					const options = new AutoComplete({
						name: 'incorrectAnswerOption',
						message: 'What would you like to do?',
						choices: [
							{
								name: 'next',
								message: 'Continue to next question'
							},
							{
								name: 'repractice',
								message: 'Try the question again'
							},
							{
								name: 'providefeedback',
								message: 'Provide feedback about this term'
							},
							{
								name: 'rateflashcard',
								message: 'Rate this flashcard'
							},
							{
								name: 'resetdeck',
								message: 'Reset deck progress'
							},
							{
								name: 'quit',
								message: 'Quit the entire session'
							}
						]
					});

					const selectedOption = await options.run();

					if (selectedOption === 'repractice') {
						return await this.ask_term_question(term_selected, {
							ask_if_correct,
							exitMethod,
							try_question_again: true
						});
					} else if (selectedOption === 'quit') {
						exitMethod();
						return false;
					} else if (selectedOption === 'providefeedback') {
						// Check if there's existing feedback
						const existingFeedback = this.feedbackStorage.getFeedbackByTerm(term_selected);
						let initialValue = '';
						if (existingFeedback && existingFeedback.feedback) {
							console.log('\n📝 Existing feedback/corrections:');
							console.log(existingFeedback.feedback);
							console.log(`(Added on ${new Date(existingFeedback.timestamp).toLocaleDateString()})\n`);
							initialValue = existingFeedback.feedback;
						}

						const feedbackPrompt = new Input({
							name: 'feedback',
							message: 'Add/edit your feedback/corrections:',
							initial: initialValue
						});

						const feedback = await feedbackPrompt.run();
						if (feedback && feedback.trim()) {
							// Save to persistent storage
							this.feedbackStorage.addFeedbackByTerm(term_selected, feedback);
							console.log('✓ Feedback saved and will appear with this term in future reviews');

							// Also create annotation file for daily record
							await this.createAnnotation(
								term_selected,
								user_res,
								feedback
							);
						}
					} else if (selectedOption === 'rateflashcard') {
						// Show existing ratings for this term
						const existingRatings = this.ratingStorage.getRatingsByTerm(term_selected);
						if (existingRatings.length > 0) {
							console.log('\nPrevious ratings for this term:');
							existingRatings.forEach(r => {
								const date = new Date(r.timestamp).toLocaleDateString();
								const stars = '⭐'.repeat(r.rating);
								console.log(`  ${stars} (${r.rating}/5) - ${date}`);
							});
							const avgRating = this.ratingStorage.getAverageRating(term_selected);
							console.log(`Average: ${avgRating.toFixed(1)}/5\n`);
						}

						// Prompt for rating
						const ratingPrompt = new AutoComplete({
							name: 'rating',
							message: 'Rate this flashcard (1-5):',
							choices: [
								{ name: '5', message: '5 - Excellent' },
								{ name: '4', message: '4 - Good' },
								{ name: '3', message: '3 - Average' },
								{ name: '2', message: '2 - Poor' },
								{ name: '1', message: '1 - Very Poor' }
							]
						});

						const rating = await ratingPrompt.run();
						if (rating) {
							const ratingValue = parseInt(rating);
							const hasFeedback = this.feedbackStorage.getFeedbackByTerm(term_selected) !== null;
							const wasCorrect = ISANSWERCORRECT;

							// Save rating to CSV
							const success = this.ratingStorage.addRating(
								term_selected,
								ratingValue,
								wasCorrect,
								hasFeedback
							);

							if (success) {
								console.log(`✓ Rating saved: ${'⭐'.repeat(ratingValue)} (${ratingValue}/5)`);
							}
						}
					} else if (selectedOption === 'resetdeck') {
						const resetCount = await this.resetCurrentDeckProgress();
						console.log(`✓ Reset progress for ${resetCount} terms\n`);
						console.log('Restarting deck...\n');
						this.shouldResetAndRestart = true;
						exitMethod();
						return false;
					}
				}

				// Record term completion for hash-based tracking if answer is correct
				if (ISANSWERCORRECT && !is_try_question_again ) {
					await this.recordTermCompletion(term_selected);
				}
			}

			return ISANSWERCORRECT && !is_try_question_again;
		} catch (err) {
			console.log(
				'Failed at: ask_term_question |  term_selected',
				term_selected
			);
			console.log(err);
			return false; // if in a session, this will skip the card because this is improperly made.
		}
	}

	/**
	 * Prints the example of the term_selected (if available)
	 * @param {TermStructure} term_selected: Term selected from the
	 */
	printExample = async term_selected => {
		if (term_selected?.example ?? false) {
			console.log(
				`${chalk.hex(CONSTANTS.CUTEBLUE).inverse('Correct Example: ')}`
			);
			printMarked(term_selected?.example ?? '', { use_markdown: true });
		}
	};

	async ask_math_question({ exitMethod = () => {} } = {}) {
		const question_form = await this.pick_math_question();
		try {
			if (DEBUG) console.log('question_form', question_form);
			const ans_constraint = question_form?.ans_constraint;
			let question_prompt = {};
			if (ans_constraint == undefined) {
				// Because we dont need to verify the constraints,

				question_prompt = this.compile_question(question_form);
				if (DEBUG)
					console.log(
						'ask question question_prompt',
						question_prompt
					);
			} else {
				question_prompt = this.compile_valid_question(
					question_form,
					ans_constraint
				);
				if (DEBUG) console.log('ask question else', question_prompt);
			}

			const quiz_allow_reattempts =
				Settings?.queue_configurations?.quiz_allow_reattempts ?? 3;
			let answerIsCorrect = false;

			for (let i = 0; i < quiz_allow_reattempts; i++) {
				// if (DEBUG) console.log(question_prompt.humanQuestion);

				const question = new Input({
					name: 'ServiceOption' + i,
					message: `${question_prompt.question_prompt} attempt: ${i}`
				});

				const res = await question.run();

				// Escape if user wants to exit
				if (user_requests_exit(res)) {
					exitMethod();
					return false;
				}

				if (user_requests_calc(res)) {
					const { exec } = require('child_process');
					// exec(`start node`);
					openEditorPlatformAgnostic('node');
					i -= 1;
					continue;
				}

				if (res == question_prompt.expectedAnswer) {
					answerIsCorrect = true;
					console.log('correct!');
					break;
				}
			}

			if (Settings?.online) {
				const _ = await updateConcept(
					question_form.formula_name,
					answerIsCorrect
				);
			}

			if (DEBUG)
				console.log(
					'expected Answer:',
					question_prompt.expectedAnswer,
					', Prompt:',
					question_prompt.question_prompt,
					', \n Formula:',
					question_prompt.form
				);

			return answerIsCorrect;
		} catch (err) {
			console.warn(err, 'With question: ', question_form);
			return false;
		}
	}

	/**
	 * If constraints avaialable, continue compiling the questions until it is appropriate with that contraints
	 * @param: constraint: str
	 * e.g: Gets '-.2' -> Negative Only
	 * .2 -> with two decimals
	 * +.0 -> Positive Integer
	 */
	compile_valid_question(question_form, constraint) {
		// Basically loops until a a result fullfillls the specified constraint.

		const format_reg = /(\W?).(\d)/;
		const format_parsed = constraint.match(format_reg);
		const decimals_allowed = format_parsed[2];
		let foundProper = false;
		let questionPrompt = {};
		while (!foundProper) {
			questionPrompt = this.compile_question(question_form);
			const expectedAnswer = questionPrompt.expectedAnswer;
			const decimalCounts = countDecimals(expectedAnswer);

			// if (DEBUG) console.log(`${expectedAnswer} count is ${decimalCounts}`);
			if (decimals_allowed == 9) {
				foundProper = true;
			} else if (decimals_allowed >= decimalCounts) {
				foundProper = true;
			} else {
				// if (DEBUG) console.log(`${expectedAnswer} is not proper, retrying...`);
			}
		}
		questionPrompt.form = question_form.form;
		return questionPrompt;
	}

	/**
	 * Creates an annotation file with user feedback
	 * @param {Object} term_selected - The term that was being studied
	 * @param {string} user_response - The user's response to the term
	 * @param {string} feedback - The feedback provided by the user
	 */
	async createAnnotation(term_selected, user_response, feedback) {
		try {
			const today = new Date();
			const dateStr = today.toISOString().split('T')[0]; // YYYY-MM-DD format
			const annotationFile = path.join(
				'user_data',
				`terms-annotation-${dateStr}.md`
			);

			const { getDirAbsoluteUri } = require('./utils_functions');
			const fullPath = getDirAbsoluteUri(annotationFile);

			// Ensure the directory exists
			const dir = path.dirname(fullPath);
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir, { recursive: true });
			}

			const annotationEntry = `[${term_selected.category}] - ${term_selected.term}\n${feedback}\n\n`;

			// Append to existing file or create new one
			fs.appendFileSync(fullPath, annotationEntry);

			console.log(`Feedback saved to ${annotationFile}`);
		} catch (error) {
			console.error('Failed to create annotation:', error.message);
		}
	}

	/**
	 * Creates or updates a targeted markdown file for flashcard quiz
	 * @param {Object} term_selected - The term that is being quizzed
	 * @param {boolean} showAnswer - Whether to reveal the answer/solution
	 */
	async createFlashcardMarkdown(term_selected, showAnswer = false) {
		try {

			const removeMarkers = (text) =>{
				// remove :m, ??, and other markers
				return text.replace(/(:m|\?\?|:p)/g, '').trim();
			}
			const markdownFileName = Settings?.flashcard_markdown_file || 'current-quiz.md';
			const fullPath = path.resolve(__dirname, '../', markdownFileName);

			// Create markdown content based on whether answer should be shown
			let markdownContent = `# ${term_selected.term}\n\n`;
			markdownContent += `**Category:** ${term_selected.category}\n\n`;
			
			// Always show description and prompt
			if (term_selected.description) {
				markdownContent += `## Description\n\n${removeMarkers(term_selected.description)}\n\n`;
			}

			// Show stored feedback/corrections after description
			const storedFeedback = this.feedbackStorage.getFeedbackByTerm(term_selected);
			if (storedFeedback && storedFeedback.feedback) {
				markdownContent += `### Corrections\n\n`;
				markdownContent += `${storedFeedback.feedback}\n\n`;
				const feedbackDate = new Date(storedFeedback.timestamp).toLocaleDateString();
				markdownContent += `*Added on ${feedbackDate}*\n\n`;
			}

			if (term_selected.prompt) {
				markdownContent += `## Question\n\n${removeMarkers(term_selected.prompt)}\n\n`;
			}

			// Show answer only if requested
			
			if (showAnswer && term_selected.example) {
				markdownContent += `## Answer\n\n${removeMarkers(term_selected.example)}\n\n`;
			} else if (!showAnswer) {
				markdownContent += `## Answer\n\n*[Answer will be revealed after you respond]*\n\n`;
				// markdownContent+= term_selected.example;
			}

			// Add reference if available
			if (term_selected.reference_page) {
				markdownContent += `## Reference\n\n${term_selected.reference_page}`;
				if (term_selected.reference_line) {
					markdownContent += `#${term_selected.reference_line}`;
				}
				markdownContent += '\n\n';
			}

			// Add attachment info if available
			if (term_selected.attachment) {
				markdownContent += `## Attachment\n\n${term_selected.attachment}\n\n`;
			}

			// Write to file
			fs.writeFileSync(fullPath, markdownContent);

			if (DEBUG) {
				console.log(`Flashcard markdown updated: ${fullPath}`);
			}
		} catch (error) {
			console.error('Failed to create flashcard markdown:', error.message);
		}
	}

	/**
	 * Reset completion progress for all terms in the current deck
	 * @returns {Promise<number>} - Number of terms reset
	 */
	async resetCurrentDeckProgress() {
		if (!this.currentDeckTerms || this.currentDeckTerms.length === 0) {
			console.log('No deck currently loaded');
			return 0;
		}

		const resetCount = this.termCompletionTracker.resetTerms(
			this.currentDeckTerms,
			(term) => this.generateTermHash(term)
		);

		await this.termCompletionTracker.save();
		return resetCount;
	}
}

module.exports = { Quizzer };
