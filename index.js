#!/usr/bin/env node

/**
 * Mastery CLI — turn your notes into flashcards and practise them from the
 * terminal, alongside offline coding problems.
 *
 * Quick start:
 *   mastery session       Study your decks
 *   mastery dsa           Practise a coding problem
 *   mastery vault status  See where your data lives
 *   mastery --help        Every command
 */

const cli = require('./src/cli');
const utils = require('./src/utils');
const Settings = require('./src/settings');
const registry = require('./src/commands/registry');
const {
	buildHandlers,
	findRequestedCommand
} = require('./src/commands/dispatch');
const { getFeatureHandlers } = require('./src/features');
const { generateCommandHelp } = require('./src/local-modules/cli-help');

const cli_meow = cli[0];
const flags = cli_meow.flags;
const input = cli_meow.input;

const { Mastery } = utils;

(async () => {
	try {
		// `mastery help <command>` — detail for a single command.
		if (input[0] === 'help') {
			const requested = registry.resolveName(input[1]);
			if (requested) {
				console.log(
					generateCommandHelp(registry.getCommand(requested))
				);
				return;
			}
			if (input[1]) {
				console.log(`Unknown command: ${input[1]}`);
			}
			cli_meow.showHelp(0);
			return;
		}

		// Deck is loaded lazily, when a command actually needs it.
		const mastery = new Mastery(Settings, null);

		const featureHandlers = getFeatureHandlers({
			flags,
			masteryManager: mastery,
			settings: Settings
		});

		const handlers = buildHandlers({ mastery, featureHandlers });

		mastery.clearOnTalk = true;

		const requested = findRequestedCommand(input);
		if (requested && typeof handlers[requested] === 'function') {
			// Pass flags to handlers that need them (e.g., math-session)
			if (requested === 'math-session' || requested === 'math-ses') {
				await handlers[requested](flags);
			} else {
				await handlers[requested]();
			}
			return;
		}

		cli_meow.showHelp(0);
		mastery.askToClean();
	} catch (error) {
		console.error('Application error:', error.message);
		process.exit(1);
	}
})();
