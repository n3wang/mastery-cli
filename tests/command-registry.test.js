const assert = require('assert');

const registry = require('../src/commands/registry');
const { buildHandlers, findRequestedCommand } = require('../src/commands/dispatch');
const { getFeatureHandlers, getFeatureCommands } = require('../src/features');
const { generateCommandHelp } = require('../src/local-modules/cli-help');

/**
 * These guard the property that made the old three-registry setup drift:
 * everything documented must run, and everything that runs must be documented.
 */
describe('command registry', () => {
	let handlers;

	before(() => {
		const utils = require('../src/utils');
		const Settings = require('../src/settings');
		const mastery = new utils.Mastery(Settings, null);

		handlers = buildHandlers({
			mastery,
			featureHandlers: getFeatureHandlers({
				flags: {},
				masteryManager: mastery,
				settings: Settings
			})
		});
	});

	it('gives every declared command a handler', () => {
		const missing = registry.COMMANDS.filter(
			command => typeof handlers[command.name] !== 'function'
		).map(command => command.name);

		assert.deepStrictEqual(missing, []);
	});

	it('leaves no core handler undocumented', () => {
		const utils = require('../src/utils');
		const Settings = require('../src/settings');
		const mastery = new utils.Mastery(Settings, null);

		const undocumented = Object.keys(mastery.commandHandlers).filter(
			name => !registry.resolveName(name)
		);

		assert.deepStrictEqual(undocumented, []);
	});

	it('documents every feature command', () => {
		const undocumented = Object.keys(getFeatureCommands()).filter(
			name => !registry.resolveName(name)
		);

		assert.deepStrictEqual(undocumented, []);
	});

	it('resolves each alias to exactly one canonical name', () => {
		for (const command of registry.COMMANDS) {
			assert.strictEqual(registry.resolveName(command.name), command.name);
			for (const alias of command.aliases || []) {
				assert.strictEqual(registry.resolveName(alias), command.name);
			}
		}
	});

	it('has no duplicate names or aliases', () => {
		const seen = new Set();
		for (const command of registry.COMMANDS) {
			for (const token of [command.name, ...(command.aliases || [])]) {
				assert.ok(!seen.has(token), `duplicate token: ${token}`);
				seen.add(token);
			}
		}
	});

	it('keeps every historical command name working', () => {
		// The short forms users already have in their fingers and scripts.
		const legacy = [
			'ses', 'fses', 'lastses', 'cses', 'mcses', 'amses', 'mamses',
			'co', 'coa', 'poh', 'masks', 'setting', 'code',
			'quiz', 'term', 'math', 'clean', 'report', 'skill', 'entries',
			'dsa', 'mdsa', 'cloze', 'jupyter', 'llm',
			'mask-list', 'mask-toggle', 'mask-create', 'mask-status',
			'create-module', 'prepare-week', 'cleanup', 'reset-queues'
		];

		for (const token of legacy) {
			const resolved = registry.resolveName(token);
			assert.ok(resolved, `alias no longer resolves: ${token}`);
			assert.strictEqual(
				typeof handlers[resolved],
				'function',
				`alias resolves but has no handler: ${token}`
			);
		}
	});

	it('does not treat the first declared command as a request for help', () => {
		// index.js used to short-circuit on the first help-declared command,
		// so `mastery co` printed help and exited instead of committing.
		const first = registry.COMMANDS[0];
		assert.strictEqual(findRequestedCommand([first.name]), first.name);
		assert.strictEqual(findRequestedCommand(['co']), 'commit');
	});

	it('returns null when nothing matches', () => {
		assert.strictEqual(findRequestedCommand([]), null);
		assert.strictEqual(findRequestedCommand(['not-a-command']), null);
	});

	it('renders per-command help for every command', () => {
		for (const command of registry.COMMANDS) {
			const text = generateCommandHelp(command);
			assert.ok(text.includes(command.name));
			assert.ok(text.includes(command.desc));
		}
	});

	it('shows every visible command in the grouped listing', () => {
		const grouped = registry
			.getVisibleGroups()
			.flatMap(group => group.commands.map(command => command.name));

		const visible = registry.COMMANDS.filter(
			command => !command.hidden
		).map(command => command.name);

		assert.deepStrictEqual(grouped.sort(), visible.sort());
	});
});
