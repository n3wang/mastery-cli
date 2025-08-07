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

const path = require('path');

/**
 * Helper function to get absolute file paths
 * For beginners: This just figures out the full path to files on your computer
 * @param {string} fileimage - The file you want to find
 * @returns {string} - The complete path to that file
 */
const getDirAbsoluteUri = (
	fileimage = './img/unicorn.png',
	subdirectory = './terms_data/'
) => {
	// Build the complete path from the current directory
	const absolutePath = path.resolve(path.join(__dirname, './', fileimage));
	return absolutePath.toString();
};

// Get the path to your personal settings file
const absolute_settings_uri = getDirAbsoluteUri(`user_data/settings.json`);

// Load and export your settings so other parts of the app can use them
module.exports = require(absolute_settings_uri);
