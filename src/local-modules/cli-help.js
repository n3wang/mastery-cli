/**
 * Local CLI Help Generator
 *
 * This is a local replacement for the cli-meow-help package to avoid npm dependency issues
 * in corporate environments. It generates formatted help text for CLI commands and flags.
 */

/**
 * Generate CLI help text
 * @param {Object} options - Configuration object
 * @param {string} options.name - CLI name
 * @param {Object} options.flags - Flag definitions
 * @param {Object} options.commands - Command definitions
 * @returns {string} Formatted help text
 */
function generateHelp({ name = 'cli', flags = {}, commands = {} }) {
	let helpText = `
Usage: ${name} [command] [flags]

Commands:
`;

	// Add commands section
	const commandEntries = Object.entries(commands);
	if (commandEntries.length > 0) {
		const maxCommandLength = Math.max(
			...commandEntries.map(([cmd]) => cmd.length)
		);

		for (const [command, info] of commandEntries) {
			const description = typeof info === 'object' ? info.desc : info;
			const padding = ' '.repeat(maxCommandLength - command.length + 4);
			helpText += `  ${command}${padding}${description}\n`;
		}
	} else {
		helpText += '  (No commands available)\n';
	}

	helpText += '\nFlags:\n';

	// Add flags section
	const flagEntries = Object.entries(flags);
	if (flagEntries.length > 0) {
		const maxFlagLength = Math.max(
			...flagEntries.map(([flag]) => {
				const flagInfo = flags[flag];
				const alias = flagInfo.alias ? `, -${flagInfo.alias}` : '';
				return `--${flag}${alias}`.length;
			})
		);

		for (const [flag, flagInfo] of flagEntries) {
			const alias = flagInfo.alias ? `, -${flagInfo.alias}` : '';
			const flagName = `--${flag}${alias}`;
			const padding = ' '.repeat(maxFlagLength - flagName.length + 4);
			const description = flagInfo.desc || 'No description';
			const type = flagInfo.type ? ` [${flagInfo.type}]` : '';
			const defaultValue =
				flagInfo.default !== undefined
					? ` (default: ${flagInfo.default})`
					: '';

			helpText += `  ${flagName}${padding}${description}${type}${defaultValue}\n`;
		}
	} else {
		helpText += '  (No flags available)\n';
	}

	helpText += `
Examples:
  ${name} help          Show this help message
  ${name} --version     Show version information
`;

	return helpText.trim();
}

module.exports = generateHelp;
