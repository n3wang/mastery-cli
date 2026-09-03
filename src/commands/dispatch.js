/**
 * Maps canonical command names from the registry to the functions that run them.
 *
 * The handlers themselves still live on the Mastery instance and in the feature
 * modules; this is the one place that says which name runs which function.
 */

const registry = require('./registry');

/**
 * Build the canonical-name -> handler map.
 *
 * @param {Object} params
 * @param {Object} params.mastery the Mastery instance (core handlers)
 * @param {Object} params.featureHandlers from src/features
 * @returns {Object} canonical name -> function
 */
function buildHandlers({ mastery, featureHandlers = {} }) {
	const core = mastery.commandHandlers;

	const handlers = {
		// Study
		session: core.ses,
		'session-filtered': core.fses,
		'session-reverse': core.lastses,
		quiz: core.quiz,
		term: core.term,
		math: core.math,
		'reset-queues': core['reset-queues'],

		// Practice
		'cloze-session': core.cses,
		'cloze-math-session': core.mcses,
		'algo-session': core.amses,
		'algo-math-session': core.mamses,

		// Decks & masks
		mask: core.masks,
		'mask-list': core['mask-list'],
		'mask-toggle': core['mask-toggle'],
		'mask-create': core['mask-create'],
		'mask-status': core['mask-status'],
		'create-module': core['create-module'],
		'prepare-week': core['prepare-week'],
		cleanup: core.cleanup,

		// Git workflow
		commit: core.coa,
		push: core.poh,

		// Vault & config
		vault: core.vault,
		config: core.setting,
		llm: core.llm,
		where: core.code,
		clean: core.clean,

		// Reports
		report: core.report,
		skill: core.skill,
		entries: core.entries,

		// Hidden
		services: core.services,
		imath: core.imath,

		// Features (dsa, mdsa, cloze, jupyter) register under their own names
		...featureHandlers
	};

	// A registry entry with no handler is a bug, not a silent no-op.
	const missing = registry.COMMANDS.filter(
		command => typeof handlers[command.name] !== 'function'
	).map(command => command.name);

	if (missing.length > 0) {
		console.warn(
			`Commands declared in the registry with no handler: ${missing.join(', ')}`
		);
	}

	return handlers;
}

/**
 * Find the command the user asked for.
 *
 * @param {String[]} input positional args from meow
 * @returns {String|null} canonical command name
 */
function findRequestedCommand(input = []) {
	for (const token of input) {
		const name = registry.resolveName(token);
		if (name) {
			return name;
		}
	}
	return null;
}

module.exports = { buildHandlers, findRequestedCommand };
