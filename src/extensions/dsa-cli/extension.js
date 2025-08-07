/**
 * DSA CLI Extension - Coding practice and algorithm learning
 *
 * This extension provides all the commands for practicing data structures
 * and algorithms. Perfect for:
 * - Job interview preparation
 * - Learning new programming concepts
 * - Daily coding practice
 *
 * Available commands:
 * - dsa: Practice recommended problems
 * - mdsa: Practice in markdown/pseudocode mode
 * - cloze: Fill-in-the-blank coding exercises
 */

const {
	Toggle,
	Confirm,
	prompt,
	AutoComplete,
	Survey,
	Input
} = require('enquirer');
const DSATrainer = require('./dsa-trainer.js');
const { ExtensionModel, Command } = require('../models');

let dsaTrainer = new DSATrainer({
	skip_problems: ['hello-world', 'simple-sum']
});

const Settings = require('../../settings');
const { CONSTANTS } = require('../../constants');

class MasteryDSAExtension extends ExtensionModel {
	constructor(options = {}) {
		super(
			'MasteryDSAExtension',
			'1.0.0',
			'Data Structures and Algorithms practice extension for coding interviews',
			'Mastery CLI Team',
			'MIT',
			options
		);
	}

	provideMissingReport = async ({ ask_if_dsa_missing = false } = {}) => {
		try {
			if (!this.missingFeatReport) {
				const _ = await this.populateMissingReport();
			}

			if (ask_if_dsa_missing) {
				await this.requests_if_run_dsa_trainer(this.missingFeatReport);
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
	 * if `algo` not included on the missing Feat Report:
	 * 	- ask to run `algo`
	 * 	- if yes, run `algo`
	 *
	 */
	requests_if_run_dsa_trainer = async missingFeatReport => {
		const algo_missing = missingFeatReport.includes(CONSTANTS.algo_name);
		if (algo_missing) {
			const dsaPrompt = new Confirm({
				name: 'dsa',
				message: 'Daily DSA Missing; Run algorithms?',
				initial: true
			});
			const response = await dsaPrompt.run();
			if (response) {
				const dsaTrainer = new DSATrainer();
				const dsa_is_correct =
					await dsaTrainer.showRecommendedProblems();

				if (dsa_is_correct) {
					await increasePerformance('algo');
				}
			}
		}
		return;
	};

	getCommands() {
		return {
			dsa: new Command(
				'Practice data structures and algorithms problems',
				'dsa',
				{
					usage: 'mastery dsa [--all]',
					examples: ['mastery dsa', 'mastery dsa --all'],
					flags: {
						'--all': 'Show all problems instead of recommended ones'
					}
				}
			),
			mdsa: new Command(
				'Practice DSA problems in markdown/pseudocode mode',
				'mdsa',
				{
					usage: 'mastery mdsa [--all]',
					examples: ['mastery mdsa', 'mastery mdsa --all']
				}
			),
			cloze: new Command(
				'Practice fill-in-the-blank coding exercises',
				'cloze',
				{
					usage: 'mastery cloze',
					examples: ['mastery cloze']
				}
			)
		};
	}

	updateAlgorithmPerformance = (
		problem_response,
		{ performance_feature = 'algo' } = {}
	) => {
		const dsa_is_correct = problem_response.is_problem_solved;
		if (dsa_is_correct) {
			(async () => {
				// console.log('this mastery exists?', this.masteryManager);
				this.masteryManager.logSkillExperience(performance_feature, {
					score: problem_response.score_to_increase,
					deck_id: 'algo',
					deck_term: problem_response.problem_details.slug,
					comment:
						problem_response?.problem_details?.stash_file_name ??
						`${new Date()}`,
					increased_performance: true,
					performance_feature: performance_feature
				});
			})();
		}
	};

	getHandles({ flags = {}, masteryManager = null } = {}) {
		// Set masteryManager from context if not already set
		if (masteryManager && !this.masteryManager) {
			this.masteryManager = masteryManager;
		}

		dsaTrainer = new DSATrainer({
			skip_problems: ['hello-world', 'simple-sum']
		});

		return {
			dsa: async () => {
				// Wait for all problem sources to be loaded (including external folders)
				await dsaTrainer.ensureProblemsLoaded();

				if (flags.all) {
					const problem_response =
						await dsaTrainer.showMenuOfProblems({
							md_pseudo_mode: true
						});
					this.updateAlgorithmPerformance(problem_response);
				} else {
					const problem_response =
						await dsaTrainer.showRecommendedProblems({
							md_pseudo_mode: true
						});
					this.updateAlgorithmPerformance(problem_response);
				}
			},
			mdsa: async () => {
				// Wait for all problem sources to be loaded (including external folders)
				await dsaTrainer.ensureProblemsLoaded();

				if (flags.all) {
					const problem_response =
						await dsaTrainer.showMenuOfProblems({
							md_pseudo_mode: true
						});
					this.updateAlgorithmPerformance(problem_response);
				} else {
					const problem_response =
						await dsaTrainer.showRecommendedProblems({
							md_pseudo_mode: true
						});
					this.updateAlgorithmPerformance(problem_response);
				}
			},
			cloze: async () => {
				// Wait for all problem sources to be loaded (including external folders)
				await dsaTrainer.ensureProblemsLoaded();

				const problem_response =
					await dsaTrainer.openRandomClozeDSAProblem();
			}
		};
	}
}

module.exports = MasteryDSAExtension;
