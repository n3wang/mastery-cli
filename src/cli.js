/**
 * CLI setup: flag definitions and help text.
 *
 * Help is generated from the command registry, so it can no longer drift from
 * what actually dispatches.
 */

const meow = require('meow');
const meowHelp = require('./local-modules/cli-help');
const registry = require('./commands/registry');

const flags = {
	clear: {
		type: `boolean`,
		default: true,
		alias: `c`,
		desc: `Clear the console (use --no-clear to keep it)`
	},
	debug: {
		type: `boolean`,
		default: false,
		alias: `d`,
		desc: `Print debug info`
	},
	version: {
		type: `boolean`,
		alias: `v`,
		desc: `Print CLI version`
	},
	all: {
		type: 'boolean',
		default: false,
		alias: 'a',
		desc: 'For dsa/mdsa: list every problem, not just recommended ones'
	},
	reset: {
		type: 'boolean',
		default: false,
		alias: 'r',
		desc: 'For session commands: reset the scheduler first'
	},
	backup: {
		type: 'boolean',
		default: false,
		alias: 'b',
		desc: 'For cleanup: back up files before removing them'
	},
	llm: {
		type: 'boolean',
		desc: 'Enable the local LLM for this run (or use --no-llm)'
	},
	llmFollowup: {
		type: 'boolean',
		desc: 'Enable LLM follow-up on wrong answers (--llm-followup / --no-llm-followup)'
	},
	session: {
		type: 'boolean',
		alias: 's',
		default: false,
		desc: 'Run command in session mode when supported (e.g., term, math, dsa, mdsa, cloze)'
	},
	// Preferred: --number / -n
	number: {
		type: 'number',
		alias: 'n',
		desc: 'For --session commands: number of items to solve'
	},
	// Backward-compatible legacy flag: --n
	n: {
		type: 'number',
		desc: 'Legacy alias for --number'
	}
};

const helpText = meowHelp({
	name: `mastery`,
	flags,
	groups: registry.getVisibleGroups()
});

const options = {
	inferType: true,
	description: false,
	hardRejection: false,
	flags
};

module.exports = [meow(helpText, options), registry];
module.exports.flags = flags;
module.exports.helpText = helpText;
