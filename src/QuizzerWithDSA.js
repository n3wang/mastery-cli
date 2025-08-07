const { Quizzer } = require('./Quizzer');
const constants = require('./constants');
const DSATrainer = require('./extensions/dsa-cli/dsa-trainer');
const DEBUG = false;
const { cloze_problems_list } = require('./extensions/dsa-cli/cloze');
const DSAConstants = require('./extensions/dsa-cli/constants');

const { TermScheduler } = require('./termScheduler');
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
			force_mode = true
		} = {}) => {
			const problem_type_selected = constants.get_random(problem_types);

			switch (problem_type_selected) {
				case 'math': {
					const answered = await this.ask_math_question({
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
						: this.pick_and_ask_term_question;

					const answered = await method.call(this, { exitMethod });
					return {
						answered_correctly: answered,
						type_of_problem: 'term'
					};
				}
				case 'algorithm': {
					const answered = await this.ask_algorithm_question({
						exitMethod
					});
					return {
						answered_correctly: answered,
						type_of_problem: 'algorithm'
					};
				}
				case 'cloze-algo': {
					const answered = await this.ask_cloze_algorithm_question({
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

		if (ask_until_one_is_correct) {
			while (!answerIsCorrect && !exit) {
				if (DEBUG)
					console.log(
						'Answer is correct',
						answerIsCorrect,
						'exit',
						exit
					);
				const { answered_correctly, type_of_problem } =
					await askQuestionRandom({ exitMethod });
				answerIsCorrect = answered_correctly;

				if (DEBUG)
					console.log(
						'Answer is correct',
						answerIsCorrect,
						'type of problem',
						type_of_problem
					);
			}
		} else {
			await askQuestionRandom({ exitMethod });
		}

		return { success: answerIsCorrect, exited: exit };
	}

	ask_algorithm_question = async () => {
		await this.dsaTrainer.ensureProblemsLoaded();
		const problem_status = this.dsaTrainer.openRandomProblem();
		return problem_status;
	};

	ask_cloze_algorithm_question = async ({ exitMethod = () => {} } = {}) => {
		// TODO, create an openRandomProblem where it cleans and loads for you.

		await this.dsaTrainer.ensureProblemsLoaded();
		const problem_status = this.dsaTrainer.openRandomClozeDSAProblem();
		return problem_status;
	};

	cloze_study_session = async ({
		reset_scheduler = false,
		md_pseudo_mode = false
	} = {}) => {
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

		const printCardsLeft = (cardsLeft, cardsLearnt) => {
			console.log(
				`\nAlgorithms left: ${cardsLeft} || Algorithms completed: ${cardsLearnt}\n`
			);
		};

		while (!clozeScheduler.is_completed && !exit) {
			const [cardsLeft, cardsLearnt] = [
				clozeScheduler.getCardsToLearn(),
				clozeScheduler.getCardsLearnt()
			];

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
			printCardsLeft(cardsLeft, cardsLearnt);
		}
	};

	algorithmic_study_session = async ({
		reset_scheduler = false,
		filter = {
			easy: true,
			medium: false,
			hard: false
		},
		md_pseudo_mode = false
	} = {}) => {
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

		const printCardsLeft = (cardsLeft, cardsLearnt) => {
			console.log(
				`\nAlgorithms left: ${cardsLeft} || Algorithms completed: ${cardsLearnt}\n`
			);
		};

		while (!dsaScheduler.is_completed && !exit) {
			const [cardsLeft, cardsLearnt] = [
				dsaScheduler.getCardsToLearn(),
				dsaScheduler.getCardsLearnt()
			];

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
			printCardsLeft(cardsLeft, cardsLearnt);
		}
	};
}

module.exports = { QuizzerWithDSA };
