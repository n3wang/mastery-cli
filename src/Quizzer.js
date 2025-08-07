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
		if (DEBUG) console.log('Picking terms from:', this.terms);
		let potential_questions = this.terms;
		potential_questions = await this.getYoungest(potential_questions, {
			randomOffline: true
		});

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

	study_session = async (
		masterDeck = this.masterDeck,
		{ reverse = false, size_study_deck = -1 } = {}
	) => {
		//Pick a term deck Suppose is given

		// For now just load a new one everytime.
		const termsModules = retrieve_terms_as_decks();
		for (const key of Object.keys(termsModules)) {
			masterDeck.addDeck(termsModules[key]);
		}
		const dictOptions = masterDeck.deck_titles_with_count;

		const allTermsModules = { ...dictOptions, ...termsModules };
		let titles = [...Object.keys(dictOptions)];

		// Sort by count(from dict Options)
		titles.sort(
			(a, b) => allTermsModules[b].count - allTermsModules[a].count
		);

		const ms_deck = new AutoComplete({
			name: 'StudyOption',
			message: 'Choose deck to study',
			choices: titles
		});

		let deck_selected_key = await ms_deck.run();

		let deck_selected = allTermsModules[deck_selected_key].name;

		let selected_terms = masterDeck.listTerms({
			get_only: [deck_selected]
		});

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
			cards_category: deck_selected
		});

		await studyScheduler.setLearningCards(selected_terms); // Populate the right cards.
		// console.log(studyScheduler.learning_queue);
		let exit = false;

		/**
		 * Method called when a problem is unmounted, to be used to print the amount of cards left.
		 */
		const printCardsLeft = (cardsLeft, cardsLearnt) => {
			console.log(
				`\nCards left: ${cardsLeft} || Cards completed: ${cardsLearnt}\n`
			);
		};

		const exitMethod = () => {
			exit = true;
			return false; //So it escapes the loop in case of perpetual until one is right
		};

		while (!studyScheduler.is_completed && !exit) {
			// Continue asking questions.

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

			// Somewhere here the duplication error occurs.

			const answered_correctly = await this.ask_term_question(
				card_to_ask,
				{ exitMethod: exitMethod }
			);
			// To here

			studyScheduler.solveCard(answered_correctly);
			await studyScheduler.saveCards();

			printCardsLeft(
				studyScheduler.getCardsToLearn(),
				studyScheduler.getCardsLearnt()
			);

			// console.log("solveCard");
			// showProgress(studyScheduler.getCardsToLearn(), studyScheduler.getCardsLearnt());
		}
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
		return await this.ask_term_question(term_selected, {
			exitMethod: exitMethod
		});
	}

	async ask_term_question(
		term_selected,
		{ ask_if_correct = true, exitMethod = () => {} } = {}
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

			const isOfflineMessage = Settings?.online
				? ''
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
			console.log(
				`${chalk
					.hex(CONSTANTS.CUTEBLUE)
					.inverse(` ${term_selected.term} `)}|${chalk
					.hex(CONSTANTS.PUNCHPINK)
					.inverse(` ${term_selected.category} `)}${isOfflineMessage}`
			);

			if (term_selected?.attachment ?? false) {
				let image_file = getAbsoluteUri(term_selected?.attachment);
				console.log(`attachment: ${image_file}`);
			}

			printMarked(term_selected?.description ?? '', {
				use_markdown: true
			});

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
				return false;
			}

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

				if (response) {
					const _ = await this.masteryManager.logSkillExperience(
						term_selected.category,
						{
							score: ISANSWERCORRECT ? 1 : 0,
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
								name: 'repractice',
								message: 'Try the question again'
							},
							{
								name: 'providefeedback',
								message: 'Provide feedback about this term'
							},
							{
								name: 'next',
								message: 'Continue to next question'
							}
						]
					});

					const selectedOption = await options.run();

					if (selectedOption === 'repractice') {
						return await this.ask_term_question(term_selected, {
							ask_if_correct,
							exitMethod
						});
					} else if (selectedOption === 'providefeedback') {
						const feedbackPrompt = new Input({
							name: 'feedback',
							message:
								'Please provide your feedback about this term:'
						});

						const feedback = await feedbackPrompt.run();
						if (feedback && feedback.trim()) {
							await this.createAnnotation(
								term_selected,
								user_res,
								feedback
							);
						}
					}
				}

				// Record term completion for hash-based tracking if answer is correct
				if (ISANSWERCORRECT) {
					await this.recordTermCompletion(term_selected);
				}
			}

			return ISANSWERCORRECT;
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
}

module.exports = { Quizzer };
