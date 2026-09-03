const { Quizzer } = require('./Quizzer');
const constants = require('./constants');
const DSATrainer = require('./features/dsa/dsa-trainer');
const DEBUG = false;
const { cloze_problems_list } = require('./features/dsa/cloze');
const DSAConstants = require('./features/dsa/constants');

const { TermScheduler } = require('./term-scheduler');
const settings = require('./settings');
const utils = require('./local-modules/terminal-charts').lib.utils;
/**
 * This class also supports DSATrainer Implementation.
 */
class QuizzerWithDSA extends Quizzer {
	constructor(questions, enabled, masterDeck, masteryManager) {
		super(questions, enabled, masterDeck, masteryManager);
		this.dsaTrainer = new DSATrainer({
			skip_problems: ['hello-world', 'simple-sum']
		});
		this.masteryManager = masteryManager;
	}
	async askQuestion({
		ask_until_one_is_correct = true,
		disable_math = false,
		disable_dsa = false,
		increase_performance = true
	} = {}) {
		let exit = false;

		// Determine enabled problem types
		let problem_types =
			Array.isArray(settings.quiz_enabled) &&
			settings.quiz_enabled.length > 0
				? settings.quiz_enabled
				: ['math', 'term'];

		if (disable_math) {
			problem_types = problem_types.filter(type => type !== 'math');
		}
		if (disable_dsa) {
			problem_types = problem_types.filter(
				type => !['algorithm', 'cloze-algo'].includes(type)
			);
		}

		// Exit handler
		const exitMethod = () => {
			if (DEBUG) console.log('Exit method requested');
			exit = true;
			return false;
		};

		// Core random question dispatcher
		const askQuestionRandom = async ({
			exitMethod = () => {},
			force_mode = false
		} = {}) => {
			const problem_type_selected = constants.get_random(problem_types);
			console.log(`Selected problem type: ${problem_type_selected}`);

			switch (problem_type_selected) {
				case 'math': {
					const answered = await this.askMathQuestion({
						exitMethod
					});
					return {
						answered_correctly: answered,
						type_of_problem: 'math'
					};
				}
				case 'term': {
					const method = force_mode
						? this.forceLearnTermQuestions
						: this.pickAndAskTermQuestion;

					const answered = await method.call(this, { exitMethod });
					return {
						answered_correctly: answered,
						type_of_problem: 'term'
					};
				}
				case 'algorithm': {
					const answered = await this.askAlgorithmQuestion({
						exitMethod
					});
					return {
						answered_correctly: answered,
						type_of_problem: 'algorithm'
					};
				}
				case 'cloze-algo': {
					const answered = await this.askClozeAlgorithmQuestion({
						exitMethod
					});
					return {
						answered_correctly: answered,
						type_of_problem: 'cloze-algo'
					};
				}
				default:
					return {
						answered_correctly: false,
						type_of_problem: 'unknown'
					};
			}
		};

		let answerIsCorrect = false;
		let consecutiveFailures = 0;
		const maxConsecutiveFailures = 3;

		if (ask_until_one_is_correct) {
			while (!answerIsCorrect && !exit) {
				const { answered_correctly, type_of_problem } =
					await askQuestionRandom({ exitMethod });
				this.increaseTempCounter({
					attempts: 1,
					learned: answered_correctly ? 1 : 0
				});
				answerIsCorrect = answered_correctly;

				// Track consecutive failures to prevent infinite loops when no terms are available
				if (!answered_correctly) {
					consecutiveFailures++;
					if (type_of_problem === 'term') {
						console.log(
							`Attempt failed - no terms available (${consecutiveFailures}/${maxConsecutiveFailures})`
						);
					}

					if (consecutiveFailures >= maxConsecutiveFailures) {
						console.error(
							'Maximum consecutive failures reached. Exiting quiz to prevent infinite loop.'
						);
						console.error(
							'Please check your term configuration and masks in settings.json'
						);
						exit = true;
						break;
					}
				} else {
					// Reset failure counter on success
					consecutiveFailures = 0;
				}
			}
		} else {
			const { answered_correctly } = await askQuestionRandom({
				exitMethod
			});
			this.increaseTempCounter({
				attempts: 1,
				learned: answered_correctly ? 1 : 0
			});
		}

		return { success: answerIsCorrect, exited: exit };
	}

	async smallTermsSession({ to_answer_correctly = 3, loop_max = 20 } = {}) {
		let remaining = to_answer_correctly;
		let loops = loop_max;
		let exit = false;

		const exitMethod = () => {
			if (DEBUG) console.log('Exit method requested');
			exit = true;
			return false;
		};

		while (remaining > 0 && loops > 0 && !exit) {
			console.log(
				`Remaining correct answers needed: ${remaining} | attempts left: ${loops}${this.getTempCounterSuffix()}`
			);

			const { answered_correctly, exited } = await this.askQuestion({
				ask_until_one_is_correct: false,
				exitMethod
			});

			if (exited || exit) {
				console.log('Session exited by user.');
				break;
			}

			if (answered_correctly) {
				remaining--;
				console.log(`Correct answer! Remaining: ${remaining}`);
			} else {
				console.log(`Incorrect answer. Keep trying!`);
			}

			loops--;
		}

		if (remaining === 0) {
			console.log(
				`Session complete! All ${to_answer_correctly} terms answered correctly.`
			);
			return true;
		} else if (loops === 0) {
			console.log(
				`Session ended. Maximum attempts reached. Terms remaining: ${remaining}`
			);
			return false;
		} else {
			console.log(
				`Session ended by user. Terms remaining: ${remaining}`
			);
			return false;
		}
	}

	askAlgorithmQuestion = async () => {
		await this.dsaTrainer.ensureProblemsLoaded();
		const problem_status = this.dsaTrainer.openRandomProblem();
		return problem_status;
	};

	askClozeAlgorithmQuestion = async ({ exitMethod = () => {} } = {}) => {
		// TODO, create an openRandomProblem where it cleans and loads for you.

		await this.dsaTrainer.ensureProblemsLoaded();
		const problem_status = this.dsaTrainer.openRandomClozeDSAProblem();
		return problem_status;
	};

	clozeStudySession = async ({
		reset_scheduler = false,
		md_pseudo_mode = false,
		session_size = 10
	} = {}) => {
		const targetSessionSize =
			Number.isFinite(Number(session_size)) && Number(session_size) > 0
				? Number(session_size)
				: 10;

		// Pick all the available string keys.

		await this.dsaTrainer.ensureProblemsLoaded();
		const cloze_problems = cloze_problems_list;
		const clozeScheduler = new TermScheduler({
			cards_category: 'cloze_study_sesssion'
		});
		await clozeScheduler.setLearningCards(cloze_problems, {
			shuffle: true,
			reset_scheduler: reset_scheduler
		});
		let exit = false;

		const printCardsLeft = completed => {
			const cardsLeft = Math.max(targetSessionSize - completed, 0);
			console.log(
				`\nAlgorithms left: ${cardsLeft} || Algorithms completed: ${completed}${this.getTempCounterSuffix()}\n`
			);
		};
		let sessionCount = 0;

		while (
			!clozeScheduler.is_completed &&
			!exit &&
			sessionCount < targetSessionSize
		) {
			const card = await clozeScheduler.getCard();
			let problem = this.dsaTrainer.problems_manager.getProblem(
				card.problem_slug
			);

			console.log('Card', card);
			problem.is_cloze = true;
			const solution_metadata = await this.dsaTrainer.solveProblem(
				problem,
				{
					base: DSAConstants.PATHS.base_cloze,
					populate_with_cloze_filepath: card.file_path,
					md_pseudo_mode: md_pseudo_mode
				}
			);

			// Check if user wants to exit
			if (
				solution_metadata.status == DSAConstants.ProblemStatus.aborted
			) {
				exit = true;
				break;
			}

			const answerIsCorrect =
				solution_metadata.status == DSAConstants.ProblemStatus.solved;
			clozeScheduler.solveCard(answerIsCorrect);
			await clozeScheduler.saveCards();
			sessionCount++;
			printCardsLeft(sessionCount);
		}
	};

	algorithmicStudySession = async ({
		reset_scheduler = false,
		filter = {
			easy: true,
			medium: false,
			hard: false
		},
		md_pseudo_mode = false,
		session_size = 10
	} = {}) => {
		const targetSessionSize =
			Number.isFinite(Number(session_size)) && Number(session_size) > 0
				? Number(session_size)
				: 10;

		// Pick all the available string keys.

		await this.dsaTrainer.ensureProblemsLoaded();
		const problems_list = this.dsaTrainer.problems_manager.getProblems();

		const dsaScheduler = new TermScheduler({
			cards_category: 'algorithmic_session'
		});

		await dsaScheduler.setLearningCards(problems_list, {
			shuffle: true,
			reset_scheduler: reset_scheduler
		});
		let exit = false;

		const printCardsLeft = completed => {
			const cardsLeft = Math.max(targetSessionSize - completed, 0);
			console.log(
				`\nAlgorithms left: ${cardsLeft} || Algorithms completed: ${completed}${this.getTempCounterSuffix()}\n`
			);
		};
		let sessionCount = 0;

		while (
			!dsaScheduler.is_completed &&
			!exit &&
			sessionCount < targetSessionSize
		) {
			const card = await dsaScheduler.getCard();

			const solution_metadata = await this.dsaTrainer.solveProblem(card, {
				base: DSAConstants.PATHS.base,
				md_pseudo_mode: md_pseudo_mode
			});

			// Check if user wants to exit
			if (
				solution_metadata.status == DSAConstants.ProblemStatus.aborted
			) {
				exit = true;
				break;
			}

			const answerIsCorrect =
				solution_metadata.status == DSAConstants.ProblemStatus.solved;
			dsaScheduler.solveCard(answerIsCorrect);
			await dsaScheduler.saveCards();
			sessionCount++;
			printCardsLeft(sessionCount);
		}
	};
}

module.exports = { QuizzerWithDSA };
