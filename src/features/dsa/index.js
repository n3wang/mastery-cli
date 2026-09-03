/**
 * DSA feature — coding practice and algorithm learning.
 *
 * Commands:
 * - dsa   : practice recommended problems (--all for the full menu)
 * - mdsa  : same, in markdown/pseudocode mode
 * - cloze : fill-in-the-blank coding exercises
 *
 * This replaces the former dsa-cli "extension". It is a plain module: it
 * describes its commands and returns handlers, and the CLI wires it up
 * directly. There is no discovery, registration or hook machinery.
 */

const { Confirm } = require('enquirer');
const DSATrainer = require('./dsa-trainer.js');
const Settings = require('../../settings');
const { CONSTANTS } = require('../../constants');

const NAME = 'dsa';

let trainer = null;

function getTrainer() {
	if (!trainer) {
		trainer = new DSATrainer({
			skip_problems: ['hello-world', 'simple-sum']
		});
	}
	return trainer;
}

function getCommands() {
	return {
		dsa: {
			desc: 'Practice data structures and algorithms problems',
			usage: 'mastery dsa [--all]',
			examples: ['mastery dsa', 'mastery dsa --all'],
			flags: { '--all': 'Show all problems instead of recommended ones' }
		},
		mdsa: {
			desc: 'Practice DSA problems in markdown/pseudocode mode',
			usage: 'mastery mdsa [--all]',
			examples: ['mastery mdsa', 'mastery mdsa --all']
		},
		cloze: {
			desc: 'Practice fill-in-the-blank coding exercises',
			usage: 'mastery cloze',
			examples: ['mastery cloze']
		}
	};
}

/**
 * Record a solved problem against the user's skill history.
 */
function updateAlgorithmPerformance(
	masteryManager,
	problem_response,
	{ performance_feature = 'algo' } = {}
) {
	if (!problem_response || !problem_response.is_problem_solved) {
		return;
	}
	if (!masteryManager) {
		return;
	}

	masteryManager.logSkillExperience(performance_feature, {
		score: problem_response.score_to_increase,
		deck_id: 'algo',
		deck_term: problem_response.problem_details.slug,
		comment:
			problem_response?.problem_details?.stash_file_name ??
			problem_response?.problem_details?.slug
	});
}

/**
 * If the daily algorithm work is missing from the report, offer to run it.
 */
async function requestIfRunTrainer(missingFeatReport) {
	if (
		!missingFeatReport ||
		!missingFeatReport.includes(CONSTANTS.algo_name)
	) {
		return;
	}

	const dsaPrompt = new Confirm({
		name: 'dsa',
		message: 'Daily DSA Missing; Run algorithms?',
		initial: true
	});

	const shouldRun = await dsaPrompt.run();
	if (!shouldRun) {
		return;
	}

	const dsaTrainer = getTrainer();
	await dsaTrainer.ensureProblemsLoaded();
	const problem_response = await dsaTrainer.showRecommendedProblems({
		md_pseudo_mode: false
	});
	return problem_response;
}

function getHandlers({ flags = {}, masteryManager = null } = {}) {
	const run = async ({ md_pseudo_mode }) => {
		const dsaTrainer = getTrainer();
		await dsaTrainer.ensureProblemsLoaded();

		const problem_response = flags.all
			? await dsaTrainer.showMenuOfProblems({ md_pseudo_mode })
			: await dsaTrainer.showRecommendedProblems({ md_pseudo_mode });

		updateAlgorithmPerformance(masteryManager, problem_response);
		return problem_response;
	};

	return {
		dsa: async () => {
			if (flags.session) {
				const session_size = flags?.number ?? flags?.n ?? 10;
				if (masteryManager) {
					await masteryManager.ensureTermsLoaded();
					return masteryManager.mQuizer.algorithmicStudySession({
						session_size
					});
				}

				const dsaTrainer = getTrainer();
				await dsaTrainer.ensureProblemsLoaded();
				return dsaTrainer.showRecommendedProblems({
					md_pseudo_mode: false
				});
			}

			return run({ md_pseudo_mode: false });
		},
		mdsa: async () => {
			if (flags.session) {
				const session_size = flags?.number ?? flags?.n ?? 10;
				if (masteryManager) {
					await masteryManager.ensureTermsLoaded();
					return masteryManager.mQuizer.algorithmicStudySession({
						session_size,
						md_pseudo_mode: true
					});
				}

				const dsaTrainer = getTrainer();
				await dsaTrainer.ensureProblemsLoaded();
				return dsaTrainer.showRecommendedProblems({
					md_pseudo_mode: true
				});
			}

			return run({ md_pseudo_mode: true });
		},
		cloze: async () => {
			if (flags.session) {
				const session_size = flags?.number ?? flags?.n ?? 10;
				if (masteryManager) {
					await masteryManager.ensureTermsLoaded();
					return masteryManager.mQuizer.clozeStudySession({
						session_size
					});
				}

				const dsaTrainer = getTrainer();
				await dsaTrainer.ensureProblemsLoaded();
				return dsaTrainer.openRandomClozeDSAProblem();
			}

			const dsaTrainer = getTrainer();
			await dsaTrainer.ensureProblemsLoaded();
			return dsaTrainer.openRandomClozeDSAProblem();
		}
	};
}

module.exports = {
	NAME,
	getCommands,
	getHandlers,
	getTrainer,
	requestIfRunTrainer,
	updateAlgorithmPerformance
};
