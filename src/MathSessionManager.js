const chalk = require('chalk');
const { AutoComplete, Input } = require('enquirer');
const { LocalStorage } = require('./LocalStorage');
const Settings = require('./settings');
const {
	user_requests_exit,
	user_requests_calc,
	openEditorPlatformAgnostic
} = require('./utils-functions');

/**
 * MathSessionManager - Manages structured math problem sessions
 * Allows users to:
 * 1. Select a math problem type from available formulas
 * 2. Solve N problems consecutively (default 10)
 * 3. View accuracy and time statistics
 * 4. Track stats in local storage with session count as key
 */
class MathSessionManager {
	constructor(quizzer) {
		this.quizzer = quizzer; // Quizzer instance with math formula handling
		this.sessionStats = {
			formulas: [], // Available formula types
			selected_formula: null,
			total_problems: 10, // Default session count
			correct_answers: 0,
			wrong_answers: 0,
			attempts: [],
			start_time: null,
			end_time: null
		};
		this.localStorage = new LocalStorage('math_sessions');
	}

	/**
	 * Load existing session stats from storage
	 */
	async loadStats() {
		await this.localStorage.load();
	}

	/**
	 * Save session stats to local storage
	 * Uses dynamic key based on problem count (e.g., math_ses_10, math_ses_20)
	 */
	async saveSessionStats() {
		const sessionKey = `math_ses_${this.sessionStats.total_problems}`;
		const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

		if (!this.localStorage.date_based_stats[date]) {
			this.localStorage.date_based_stats[date] = {};
		}

		if (!this.localStorage.date_based_stats[date][sessionKey]) {
			this.localStorage.date_based_stats[date][sessionKey] = {
				value: 0,
				sessions: []
			};
		}

		// Record session data
		const sessionRecord = {
			timestamp: new Date().toISOString(),
			formula_name: this.sessionStats.selected_formula.formula_name,
			total_problems: this.sessionStats.total_problems,
			correct: this.sessionStats.correct_answers,
			wrong: this.sessionStats.wrong_answers,
			accuracy: this.calculateAccuracy(),
			duration_ms: this.sessionStats.end_time - this.sessionStats.start_time,
			attempts: this.sessionStats.attempts.map(a => ({
				question: a.question_prompt,
				correct: a.is_correct,
				attempts_taken: a.attempts_taken
			}))
		};

		this.localStorage.date_based_stats[date][sessionKey].sessions.push(
			sessionRecord
		);
		this.localStorage.date_based_stats[date][sessionKey].value +=
			this.sessionStats.correct_answers;

		await this.localStorage.save();
	}

	/**
	 * Get available formula types to choose from
	 */
	getAvailableFormulas() {
		return this.quizzer.enabledqmathformulas;
	}

	/**
	 * Group formulas by type/name and show user choices
	 */
	async promptSelectFormula() {
		const formulas = this.getAvailableFormulas();

		// Create unique formula choices
		const formulaChoices = formulas.map(f => ({
			name: f.formula_name,
			message: `${f.formula_name}${f.human ? ' - ' + f.human.split('\n')[0] : ''}`
		}));

		// Remove duplicates
		const uniqueChoices = [];
		const seen = new Set();
		for (const choice of formulaChoices) {
			if (!seen.has(choice.name)) {
				seen.add(choice.name);
				uniqueChoices.push(choice);
			}
		}

		if (uniqueChoices.length === 0) {
			console.error('No math formulas available');
			return null;
		}

		const prompt = new AutoComplete({
			name: 'FormulaOption',
			message: 'Select a math problem type',
			choices: uniqueChoices.map(c => c.name)
		});

		const selected = await prompt.run();

		// Find the formula object
		this.sessionStats.selected_formula = formulas.find(
			f => f.formula_name === selected
		);

		return this.sessionStats.selected_formula;
	}

	/**
	 * Calculate accuracy percentage
	 */
	calculateAccuracy() {
		const total = this.sessionStats.correct_answers +
			this.sessionStats.wrong_answers;
		if (total === 0) return 0;
		return Math.round(
			(this.sessionStats.correct_answers / total) * 100
		);
	}

	/**
	 * Ask a single math question and record the result
	 */
	async askSingleMathQuestion(questionNumber) {
		const quiz_allow_reattempts =
			Settings?.queue_configurations?.quiz_allow_reattempts ?? 2;

		try {
			// Generate question
			const question_form =
				this.sessionStats.selected_formula;
			const ans_constraint = question_form?.ans_constraint;
			let question_prompt = {};

			if (ans_constraint == undefined) {
				question_prompt = this.quizzer.compileQuestion(
					question_form
				);
			} else {
				question_prompt = this.quizzer.compileValidQuestion(
					question_form,
					ans_constraint
				);
			}

			// Display question
			console.log(
				`\n${chalk.cyan(
					`[${questionNumber}/${this.sessionStats.total_problems}]`
				)} ${chalk.bold(question_prompt.question_prompt)}`
			);

			let answerIsCorrect = false;
			let attemptsUsed = 0;

			// Allow multiple attempts
			for (let i = 0; i < quiz_allow_reattempts; i++) {
				const question = new Input({
					name: 'Answer',
					message: `Your answer ${i + 1}/${quiz_allow_reattempts}`
				});

				const res = await question.run();

				attemptsUsed++;

				// Check exit conditions
				if (user_requests_exit(res)) {
					return null; // Signal to exit session
				}

				// Allow calculator
				if (user_requests_calc(res)) {
					openEditorPlatformAgnostic('node');
					i -= 1;
					attemptsUsed--;
					continue;
				}

				// Check answer
				if (res == question_prompt.expectedAnswer) {
					answerIsCorrect = true;
					console.log(
						chalk.green('Correct!')
					);
					break;
				} else if (i < quiz_allow_reattempts - 1) {
					console.log(
						chalk.red(
							`Incorrect. Try again.`
						)
					);
				}
			}

			if (!answerIsCorrect) {
				console.log(
					chalk.yellow(
						`Incorrect. Expected: ${question_prompt.expectedAnswer}`
					)
				);
			}

			// Record attempt
			this.sessionStats.attempts.push({
				question_number: questionNumber,
				question_prompt: question_prompt.question_prompt,
				expected_answer: question_prompt.expectedAnswer,
				is_correct: answerIsCorrect,
				attempts_taken: attemptsUsed,
				formula: question_form.formula_name
			});

			if (answerIsCorrect) {
				this.sessionStats.correct_answers++;
			} else {
				this.sessionStats.wrong_answers++;
			}

			return true; // Continue session
		} catch (err) {
			console.error('Error asking math question:', err.message);
			return false;
		}
	}

	/**
	 * Display session report with statistics
	 */
	displaySessionReport() {
		const accuracy = this.calculateAccuracy();
		const duration = this.sessionStats.end_time -
			this.sessionStats.start_time;
		const durationSeconds = Math.round(duration / 1000);
		const avgTimePerProblem = Math.round(
			duration / this.sessionStats.total_problems
		);

		console.log('\n' + '='.repeat(60));
		console.log(chalk.bold.cyan('SESSION REPORT'));
		console.log('='.repeat(60));

		console.log(
			`\nFormula Type: ${chalk.bold(
				this.sessionStats.selected_formula.formula_name
			)}`
		);

		if (
			this.sessionStats.selected_formula.human
		) {
			console.log(
				`   ${this.sessionStats.selected_formula.human.split('\n')[0]}`
			);
		}

		console.log(`\nPerformance:`);
		console.log(
			`   Correct: ${chalk.green(
				this.sessionStats.correct_answers
			)} / ${this.sessionStats.total_problems}`
		);
		console.log(
			`   Wrong: ${chalk.red(this.sessionStats.wrong_answers)} / ${this.sessionStats.total_problems}`
		);
		console.log(
			`   Accuracy: ${accuracy >= 70 ? chalk.green(accuracy + '%') : accuracy >= 50 ? chalk.yellow(accuracy + '%') : chalk.red(accuracy + '%')}`
		);

		console.log(`\nTiming:`);
		console.log(
			`   Total Time: ${chalk.bold(durationSeconds)}s`
		);
		console.log(
			`   Avg per Problem: ${chalk.bold(
				Math.round(avgTimePerProblem)
			)}ms`
		);

		console.log('\n' + '='.repeat(60));

		// Breakdown by correctness
		const correctProblems = this.sessionStats.attempts.filter(
			a => a.is_correct
		);
		const wrongProblems = this.sessionStats.attempts.filter(
			a => !a.is_correct
		);

		if (wrongProblems.length > 0) {
			console.log(chalk.yellow('Problems to Review:'));
			wrongProblems.forEach(attempt => {
				console.log(
					`   Q${attempt.question_number}: ${attempt.question_prompt}`
				);
				console.log(
					`      Your answer vs Expected: ${attempt.expected_answer}`
				);
			});
		}

		console.log();
	}

	/**
	 * Run a complete math session
	 * @param {number} sessionCount - Number of problems to solve (default: 10)
	 * @param {Object} options
	 * @param {boolean} options.resetSession - Reset in-memory session state before starting
	 */
	async runSession(sessionCount = 10, { resetSession = false } = {}) {
		if (resetSession) {
			this.sessionStats.correct_answers = 0;
			this.sessionStats.wrong_answers = 0;
			this.sessionStats.attempts = [];
			this.sessionStats.start_time = null;
			this.sessionStats.end_time = null;
		}

		this.sessionStats.total_problems = sessionCount;

		// Load existing stats
		await this.loadStats();

		console.log(
			chalk.cyan(
				'\nMath Session - Select Formula Type'
			)
		);

		// Prompt user to select formula
		const selected = await this.promptSelectFormula();
		if (!selected) {
			console.log(
				chalk.red('No formula selected. Exiting.')
			);
			return;
		}

		console.log(
			chalk.green(
				`\nSelected: ${selected.formula_name}`
			)
		);

		// Start session timer
		this.sessionStats.start_time = Date.now();
		console.log(chalk.cyan('\nSession started...\n'));

		// Run problems
		for (let i = 1; i <= sessionCount; i++) {
			const result = await this.askSingleMathQuestion(i);

			if (result === null) {
				// User requested exit
				console.log(
					chalk.yellow('\nSession stopped by user')
				);
				return;
			}

			if (result === false) {
				console.log(
					chalk.red(
						'\nError during session. Exiting.'
					)
				);
				return;
			}

			// Small pause between problems for readability
			if (i < sessionCount) {
				console.log('');
			}
		}

		// End session timer
		this.sessionStats.end_time = Date.now();

		// Save stats
		await this.saveSessionStats();

		// Display report
		this.displaySessionReport();
	}
}

module.exports = { MathSessionManager };
