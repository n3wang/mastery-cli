/**
 * The command registry — one source of truth for dispatch AND help.
 *
 * Command definitions used to live in three places that were never reconciled:
 * cli.js described commands but never dispatched them, utils.js dispatched
 * commands that were never documented, and each extension carried its own list
 * that was merged in after the help text had already been built. The result was
 * two documented commands that could not run and thirteen that ran but were
 * undocumented.
 *
 * Every entry here provides:
 *   name      canonical, readable, kebab-case
 *   aliases   every historical short form, so nothing breaks for existing users
 *   group     used to organise the help output
 *   desc      one line
 *   usage     optional
 *   examples  optional
 *   flags     optional, command-scoped
 *   hidden    optional; runs, but is kept out of the default help listing
 *
 * Handlers are supplied separately (see resolveHandler) because they need the
 * live Mastery instance.
 */

/** Display order and headings for the help output. */
const GROUPS = [
	['study', 'Study'],
	['practice', 'Practice'],
	['decks', 'Decks & masks'],
	['git', 'Git workflow'],
	['config', 'Vault & config'],
	['reports', 'Reports'],
	['misc', 'Other']
];

const COMMANDS = [
	// --- Study -------------------------------------------------------------
	{
		name: 'session',
		aliases: ['ses'],
		group: 'study',
		desc: 'Start a study session',
		usage: 'mastery session [--n=<count>]',
		examples: ['mastery session', 'mastery session --n=20'],
		flags: { '--n': 'Number of terms to run from selected deck' }
	},
	{
		name: 'session-filtered',
		aliases: ['fses'],
		group: 'study',
		desc: 'Study session limited to the decks your active masks enable',
		usage: 'mastery fses [--n=<count>]',
		examples: ['mastery fses', 'mastery fses --n=20'],
		flags: {
			'--n': 'Number of terms to run from selected filtered deck'
		}
	},
	{
		name: 'session-reverse',
		aliases: ['lastses'],
		group: 'study',
		desc: 'Study session in reverse order',
		usage: 'mastery lastses [--n=<count>]',
		examples: ['mastery lastses', 'mastery lastses --n=20'],
		flags: { '--n': 'Number of terms to run from selected deck' }
	},
	{
		name: 'quiz',
		aliases: [],
		group: 'study',
		desc: 'Quick quiz of a few terms',
		usage: 'mastery quiz'
	},
	{
		name: 'term',
		aliases: [],
		group: 'study',
		desc: 'Study a single flashcard (or run session mode)',
		usage: 'mastery term [--session]',
		examples: [
			'mastery term',
			'mastery term --session',
			'mastery term --session --n=20'
		],
		flags: {
			'--session': 'Run full term study session',
			'--n': 'Number of terms to run in session mode (default: 10)'
		}
	},
	{
		name: 'math',
		aliases: [],
		group: 'study',
		desc: 'Answer a mathematics prompt (or run session mode)',
		usage: 'mastery math [--session] [--n=<count>]',
		examples: [
			'mastery math',
			'mastery math --session',
			'mastery math --session --n=20',
			'mastery math --session --n=5'
		],
		flags: {
			'--session': 'Run tracked multi-problem math session',
			'--n': 'Number of problems to solve in session mode (default: 10)'
		}
	},
	{
		name: 'reset-queues',
		aliases: [],
		group: 'study',
		desc: 'Reset session progress queues, keeping completion history',
		usage: 'mastery reset-queues'
	},

	// --- Practice ----------------------------------------------------------
	{
		name: 'dsa',
		aliases: [],
		group: 'practice',
		desc: 'Practice DSA problems (or run algorithm session mode)',
		usage: 'mastery dsa [--all] [--session]',
		examples: [
			'mastery dsa',
			'mastery dsa --all',
			'mastery dsa --session',
			'mastery dsa --session --n=20'
		],
		flags: {
			'--all': 'Show every problem instead of the recommended ones',
			'--session': 'Run algorithm challenge session mode',
			'--n': 'Number of problems to run in session mode (default: 10)'
		}
	},
	{
		name: 'mdsa',
		aliases: [],
		group: 'practice',
		desc: 'Practice DSA in markdown mode (or run markdown session mode)',
		usage: 'mastery mdsa [--all] [--session]',
		examples: [
			'mastery mdsa',
			'mastery mdsa --all',
			'mastery mdsa --session',
			'mastery mdsa --session --n=20'
		],
		flags: {
			'--all': 'Show every problem instead of the recommended ones',
			'--session': 'Run markdown algorithm challenge session mode',
			'--n': 'Number of problems to run in session mode (default: 10)'
		}
	},
	{
		name: 'cloze',
		aliases: [],
		group: 'practice',
		desc: 'Fill-in-the-blank coding exercises (or run cloze session mode)',
		usage: 'mastery cloze [--session]',
		examples: [
			'mastery cloze',
			'mastery cloze --session',
			'mastery cloze --session --n=20'
		],
		flags: {
			'--session': 'Run cloze study session mode',
			'--n': 'Number of cloze problems to run in session mode (default: 10)'
		}
	},

	// --- Decks & masks -----------------------------------------------------
	{
		name: 'mask',
		aliases: ['masks'],
		group: 'decks',
		desc: 'Manage quiz deck masks interactively',
		usage: 'mastery mask'
	},
	{
		name: 'mask-list',
		aliases: [],
		group: 'decks',
		desc: 'List configured deck masks and whether each is active',
		usage: 'mastery mask-list'
	},
	{
		name: 'mask-toggle',
		aliases: [],
		group: 'decks',
		desc: 'Turn a deck mask on or off',
		usage: 'mastery mask-toggle <mask-name>',
		examples: ['mastery mask-toggle interview-prep']
	},
	{
		name: 'mask-create',
		aliases: [],
		group: 'decks',
		desc: 'Create a new deck mask',
		usage: 'mastery mask-create'
	},
	{
		name: 'mask-status',
		aliases: [],
		group: 'decks',
		desc: 'Show which masks are active and what they filter to',
		usage: 'mastery mask-status'
	},
	{
		name: 'create-module',
		aliases: [],
		group: 'decks',
		desc: 'Create a new deck with guided setup',
		usage: 'mastery create-module'
	},
	{
		name: 'prepare-week',
		aliases: [],
		group: 'decks',
		desc: 'Prepare daily study decks for the coming week',
		usage: 'mastery prepare-week'
	},
	{
		name: 'cleanup',
		aliases: [],
		group: 'decks',
		desc: 'Show the deletion queue: terms ignored during study sessions',
		usage: 'mastery cleanup'
	},

	// --- Git workflow ------------------------------------------------------
	{
		name: 'commit',
		aliases: ['co', 'coa'],
		group: 'git',
		desc: 'Stage everything, commit, and quiz yourself afterwards',
		usage: 'mastery commit "your message"',
		examples: ['mastery commit "fix parser"']
	},
	{
		name: 'push',
		aliases: ['poh'],
		group: 'git',
		desc: 'Push to origin HEAD, and quiz yourself afterwards',
		usage: 'mastery push'
	},

	// --- Vault & config ----------------------------------------------------
	{
		name: 'vault',
		aliases: [],
		group: 'config',
		desc: 'Inspect and manage your data vault',
		usage: 'mastery vault <path|init|status|migrate>',
		examples: ['mastery vault status', 'mastery vault init']
	},
	{
		name: 'config',
		aliases: ['setting'],
		group: 'config',
		desc: 'Show where the config file lives',
		usage: 'mastery config'
	},
	{
		name: 'llm',
		aliases: [],
		group: 'config',
		desc: 'Configure the local LLM integration',
		usage: 'mastery llm <setup|on|off|status|test|profiles|use>'
	},
	{
		name: 'where',
		aliases: ['code'],
		group: 'config',
		desc: 'Print the install directory and copy it to the clipboard',
		usage: 'mastery where'
	},
	{
		name: 'clean',
		aliases: [],
		group: 'config',
		desc: 'Clear the terminal',
		usage: 'mastery clean'
	},

	// --- Reports -----------------------------------------------------------
	{
		name: 'report',
		aliases: [],
		group: 'reports',
		desc: 'Show your progress report',
		usage: 'mastery report'
	},
	{
		name: 'skill',
		aliases: [],
		group: 'reports',
		desc: 'Show skill progress reports',
		usage: 'mastery skill'
	},
	{
		name: 'entries',
		aliases: [],
		group: 'reports',
		desc: 'List logged entries',
		usage: 'mastery entries'
	},

	// --- Hidden ------------------------------------------------------------
	// These run but stay out of the default listing: internal or unfinished.
	{
		name: 'services',
		aliases: [],
		group: 'misc',
		desc: 'Secondary services',
		hidden: true
	},
	{
		name: 'imath',
		aliases: [],
		group: 'misc',
		desc: 'Increase the math score directly (development aid)',
		hidden: true
	}
];

/** name -> definition */
const BY_NAME = new Map(COMMANDS.map(command => [command.name, command]));

/** every name and alias -> canonical name */
const RESOLVE = new Map();
for (const command of COMMANDS) {
	RESOLVE.set(command.name, command.name);
	for (const alias of command.aliases || []) {
		RESOLVE.set(alias, command.name);
	}
}

/**
 * Resolve a token typed on the command line to a canonical command name.
 * @param {String} token
 * @returns {String|null}
 */
function resolveName(token) {
	return RESOLVE.get(token) || null;
}

/**
 * @param {String} name canonical name
 * @returns {Object|null}
 */
function getCommand(name) {
	return BY_NAME.get(name) || null;
}

/**
 * Every token the CLI should recognise, canonical names and aliases alike.
 * @returns {String[]}
 */
function getAllTokens() {
	return Array.from(RESOLVE.keys());
}

/**
 * Commands to show in the default help listing, grouped and in order.
 * @returns {Array} [{ key, title, commands }]
 */
function getVisibleGroups() {
	return GROUPS.map(([key, title]) => ({
		key,
		title,
		commands: COMMANDS.filter(
			command => command.group === key && !command.hidden
		)
	})).filter(group => group.commands.length > 0);
}

module.exports = {
	COMMANDS,
	GROUPS,
	resolveName,
	getCommand,
	getAllTokens,
	getVisibleGroups
};
