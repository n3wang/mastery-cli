/**
 * Loads the weekly schedule definition.
 *
 * The user's own schedule lives at `<vault>/schedule.json`. If they have not
 * written one, the neutral example shipped in `content/schedule.example.json`
 * is used instead.
 *
 * This replaces `src/schedule-assistant/data/schedule-settings.json`, which was
 * one person's actual routine — gym, Trello board links, enrolled courses —
 * shipped as if it were the product default.
 */

const fs = require('fs');
const path = require('path');

const { vaultPath } = require('../vault');

const EXAMPLE_PATH = path.resolve(
	__dirname,
	'../../content/schedule.example.json'
);

/**
 * @returns {String} the path the user's schedule would live at
 */
function getUserSchedulePath() {
	return vaultPath('schedule.json');
}

/**
 * @returns {Object} the schedule definition, user's own if present
 */
function loadScheduleSettings() {
	const userPath = getUserSchedulePath();

	if (fs.existsSync(userPath)) {
		try {
			return JSON.parse(fs.readFileSync(userPath, 'utf-8'));
		} catch (error) {
			console.warn(
				`Could not parse ${userPath}, falling back to the example: ${error.message}`
			);
		}
	}

	return JSON.parse(fs.readFileSync(EXAMPLE_PATH, 'utf-8'));
}

module.exports = {
	EXAMPLE_PATH,
	getUserSchedulePath,
	loadScheduleSettings
};
