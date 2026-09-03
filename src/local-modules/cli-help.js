/**
 * CLI help generator.
 *
 * Renders help from the command registry, so what is documented and what
 * actually dispatches can no longer drift apart. Commands are grouped, aliases
 * are shown next to the canonical name, and per-command usage/examples/flags
 * are rendered for `mastery help <command>`.
 *
 * Local replacement for cli-meow-help, to avoid an npm dependency in
 * restricted environments.
 */

/**
 * Format one command line: "  session (ses)      Start a study session"
 */
function formatCommand(command, width) {
	const aliases =
		command.aliases && command.aliases.length > 0
			? ` (${command.aliases.join(', ')})`
			: '';
	const label = `${command.name}${aliases}`;
	const padding = ' '.repeat(Math.max(2, width - label.length + 2));
	return `  ${label}${padding}${command.desc}`;
}

/**
 * Format the flags block.
 */
function formatFlags(flags) {
	const entries = Object.entries(flags || {});
	if (entries.length === 0) {
		return '  (No flags available)\n';
	}

	const width = Math.max(
		...entries.map(([flag, info]) => {
			const alias = info.alias ? `, -${info.alias}` : '';
			return `--${flag}${alias}`.length;
		})
	);

	let out = '';
	for (const [flag, info] of entries) {
		const alias = info.alias ? `, -${info.alias}` : '';
		const label = `--${flag}${alias}`;
		const padding = ' '.repeat(width - label.length + 4);
		const type = info.type ? ` [${info.type}]` : '';
		const defaultValue =
			info.default !== undefined ? ` (default: ${info.default})` : '';
		out += `  ${label}${padding}${info.desc || 'No description'}${type}${defaultValue}\n`;
	}
	return out;
}

/**
 * Detailed help for one command — `mastery help <command>`.
 * @param {Object} command registry entry
 * @param {String} name CLI name
 * @returns {String}
 */
function generateCommandHelp(command, name = 'mastery') {
	let out = `\n${command.name}`;

	if (command.aliases && command.aliases.length > 0) {
		out += `  (also: ${command.aliases.join(', ')})`;
	}
	out += `\n\n  ${command.desc}\n`;

	if (command.usage) {
		out += `\nUsage:\n  ${command.usage}\n`;
	}

	if (command.examples && command.examples.length > 0) {
		out += '\nExamples:\n';
		for (const example of command.examples) {
			out += `  ${example}\n`;
		}
	}

	if (command.flags && Object.keys(command.flags).length > 0) {
		out += '\nFlags:\n';
		for (const [flag, description] of Object.entries(command.flags)) {
			out += `  ${flag}  ${description}\n`;
		}
	}

	return out.trimEnd();
}

/**
 * The full help listing.
 *
 * @param {Object} options
 * @param {String} options.name CLI name
 * @param {Object} options.flags global flag definitions
 * @param {Array} options.groups from registry.getVisibleGroups()
 * @returns {String}
 */
function generateHelp({ name = 'cli', flags = {}, groups = [] }) {
	let out = `\nUsage: ${name} <command> [flags]\n`;

	const allCommands = groups.flatMap(group => group.commands);
	const width =
		allCommands.length > 0
			? Math.max(
					...allCommands.map(command => {
						const aliases =
							command.aliases && command.aliases.length > 0
								? ` (${command.aliases.join(', ')})`
								: '';
						return `${command.name}${aliases}`.length;
					})
				)
			: 0;

	for (const group of groups) {
		out += `\n${group.title}:\n`;
		for (const command of group.commands) {
			out += `${formatCommand(command, width)}\n`;
		}
	}

	out += '\nFlags:\n';
	out += formatFlags(flags);

	out += `
Examples:
  ${name} session              Study your decks
  ${name} dsa                  Practice a coding problem
  ${name} vault status         See where your data lives
  ${name} help <command>       Details for one command
`;

	return out.trimEnd();
}

module.exports = generateHelp;
module.exports.generateHelp = generateHelp;
module.exports.generateCommandHelp = generateCommandHelp;
