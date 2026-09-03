/**
 * Feature registry.
 *
 * Features are plain modules, listed here explicitly. Each one exports:
 *   NAME          - short identifier
 *   getCommands() - { <command>: { desc, usage?, examples?, flags? } }
 *   getHandlers(context) - { <command>: () => any }
 *
 * This replaces the former extension system (ExtensionManager + ExtensionModel),
 * which discovered directories at runtime, registered hooks nothing emitted, and
 * gave each extension its own settings file and path resolver. Adding a feature
 * is now one import and one array entry.
 */

const dsa = require('./dsa');
const dataScience = require('./data-science');

const FEATURES = [dsa, dataScience];

/**
 * Command metadata for every feature, keyed by command name.
 * @returns {Object} command name -> descriptor (with `feature` added)
 */
function getFeatureCommands() {
	const commands = {};

	for (const feature of FEATURES) {
		for (const [name, descriptor] of Object.entries(
			feature.getCommands()
		)) {
			if (commands[name]) {
				console.warn(
					`Command conflict: '${name}' is defined by both ` +
						`${commands[name].feature} and ${feature.NAME}`
				);
				continue;
			}
			commands[name] = { ...descriptor, feature: feature.NAME };
		}
	}

	return commands;
}

/**
 * Executable handlers for every feature, keyed by command name.
 * @param {Object} context { flags, masteryManager, settings }
 * @returns {Object} command name -> handler function
 */
function getFeatureHandlers(context = {}) {
	const handlers = {};

	for (const feature of FEATURES) {
		for (const [name, handler] of Object.entries(
			feature.getHandlers(context)
		)) {
			if (typeof handler !== 'function') {
				console.warn(
					`Feature ${feature.NAME}: handler for '${name}' is not a function`
				);
				continue;
			}
			if (!handlers[name]) {
				handlers[name] = handler;
			}
		}
	}

	return handlers;
}

module.exports = {
	FEATURES,
	getFeatureCommands,
	getFeatureHandlers,
	dsa,
	dataScience
};
