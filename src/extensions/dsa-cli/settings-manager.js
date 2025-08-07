const { getDirAbsoluteUri } = require('./functions');

/**
 * @Class to manage the settings.json file
 */
class SettingsManager {
	// Updates the json editor and allows edition of the settings.json file

	constructor() {
		this.settings_path = './user_files/temp_settings.json';
		this.settings_path = getDirAbsoluteUri(this.settings_path);
		this._settings = require(this.settings_path);
	}

	get settings() {
		return this._settings;
	}

	editSettings() {
		// Opens the settings.json file in the default editor
		const { exec } = require('node:child_process');
		exec(`start ${this.settings_path}`, (error, stdout, stderr) => {
			if (error) {
				console.error(`exec error: ${error}`);
				return;
			}
			console.log(`Continue running`);
		});
	}
}

module.exports = SettingsManager;
