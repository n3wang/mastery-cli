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

const path = require('path');
const cli = require('./src/cli');
const log = require('./src/log');
const utils = require('./src/utils');
const demos = require('./src/demo');
const Settings = require('./src/settings');
const { populateMasterDeck } = require('./src/terms_data/terms');

const cli_meow = cli[0];
const cmInfo = cli[1];
const flags = cli_meow.flags;
const input = cli_meow.input;

const { Mastery } = utils;
const { ExtensionManager } = require('./src/extensions/ExtensionManager');

(async () => {
	try {
		// Initialize with empty deck, will be lazily loaded when needed
		const mastery = new Mastery(Settings, null);

		// Initialize extension manager
		const extensionManager = new ExtensionManager(
			path.join(__dirname, 'src', 'extensions'),
			{ info: () => {}, error: console.error, warn: console.warn }
		);

		// Load all extensions automatically
		const context = {
			flags: flags,
			masteryManager: mastery,
			settings: Settings
		};

		extensionManager.loadAllExtensions(context);

		// Merge extension commands with mastery commands
		const extensionCommands = {};
		for (const command of extensionManager.getRegisteredCommands()) {
			extensionCommands[command] =
				extensionManager.getCommandHandler(command);
		}

		// Add extension management command
		extensionCommands['extensions'] = () => {
			console.log('\n=== Extension System Status ===');
			const status = extensionManager.getStatus();
			console.log(`Extensions Loaded: ${status.extensionsLoaded}`);
			console.log(`Commands Registered: ${status.commandsRegistered}`);
			console.log(`Hooks Registered: ${status.hooksRegistered}`);

			if (status.extensions.length > 0) {
				console.log('\n=== Loaded Extensions ===');
				status.extensions.forEach(ext => {
					console.log(
						`• ${ext.name} v${ext.version} by ${ext.author}`
					);
					console.log(`  ${ext.description}`);
				});
			}

			console.log('\n=== Available Extension Commands ===');
			extensionManager.getRegisteredCommands().forEach(cmd => {
				console.log(`• mastery ${cmd}`);
			});
		};

		// Combine built-in and extension commands
		const allCommandHandlers = {
			...mastery.commandHandlers,
			...extensionCommands
		};

		const options = Object.keys(cmInfo.commands);
		input.includes(options[0]) && cli_meow.showHelp(0);

		mastery.clearOnTalk = true;

		var functionCalled = false;
		for (const command of Object.keys(allCommandHandlers)) {
			if (input.includes(command)) {
				functionCalled = true;
				const res = await allCommandHandlers[command]();
				return; // Stop after executing the first matched command
			}
		}

		if (!functionCalled) {
			cli_meow.showHelp(0);
			mastery.askToClean();
		}
	} catch (error) {
		console.error('Application error:', error.message);
		process.exit(1);
	}
})();
