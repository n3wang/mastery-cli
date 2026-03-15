/**
 * Settings Loader for Mastery CLI
 *
 * This file loads your personal settings from the settings.json file.
 * For beginners: This is where the app gets your preferences like:
 * - Which code editor you prefer
 * - Study session lengths
 * - Progress tracking options
 * - Custom learning paths
 *
 * The settings.json file is created automatically when you first run the app!
 */

const fs = require('fs');
const {
	ensureCanonicalUserDataLayout,
	ensureUserDataParentDir,
	migrateLegacyUserDataPath
} = require('./userDataPaths');

ensureCanonicalUserDataLayout();
migrateLegacyUserDataPath('_settings.json');

// Get the path to your personal settings file
const absolute_settings_uri = ensureUserDataParentDir('settings.json');
const absolute_template_uri = ensureUserDataParentDir('_settings.json');

// If settings.json doesn't exist, copy from _settings.json
if (!fs.existsSync(absolute_settings_uri)) {
	if (fs.existsSync(absolute_template_uri)) {
		try {
			const defaultSettings = fs.readFileSync(absolute_template_uri, 'utf-8');
			fs.writeFileSync(absolute_settings_uri, defaultSettings);
			console.log(`Created settings.json from _settings.json template`);
		} catch (error) {
			console.error(`Error copying _settings.json to settings.json:`, error.message);
			throw error;
		}
	} else {
		throw new Error(`Neither settings.json nor _settings.json found in ${path.dirname(absolute_settings_uri)}`);
	}
}

// Load and export your settings so other parts of the app can use them
module.exports = require(absolute_settings_uri);
