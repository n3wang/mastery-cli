#!/usr/bin/env node

/**
 * Mastery CLI - A beginner-friendly learning tool
 *
 * Transform your study notes into interactive flashcards and practice
 * coding problems right from your terminal!
 *
 * Quick start:
 * - mastery term    : Study flashcards
 * - mastery dsa     : Practice coding problems
 * - mastery --help  : See all commands
 */

const cli = require('./src/cli');
const utils = require('./src/utils');
const Settings = require('./src/settings');
const { getFeatureHandlers } = require('./src/features');

const cli_meow = cli[0];
const cmInfo = cli[1];
const flags = cli_meow.flags;
const input = cli_meow.input;

const { Mastery } = utils;

(async () => {
	try {
		// Initialize with empty deck, will be lazily loaded when needed
		const mastery = new Mastery(Settings, null);

		const featureHandlers = getFeatureHandlers({
			flags,
			masteryManager: mastery,
			settings: Settings
		});

		const allCommandHandlers = {
			...mastery.commandHandlers,
			...featureHandlers
		};

		mastery.clearOnTalk = true;

		for (const command of Object.keys(allCommandHandlers)) {
			if (input.includes(command)) {
				await allCommandHandlers[command]();
				return; // Stop after executing the first matched command
			}
		}

		cli_meow.showHelp(0);
		mastery.askToClean();
	} catch (error) {
		console.error('Application error:', error.message);
		process.exit(1);
	}
})();
