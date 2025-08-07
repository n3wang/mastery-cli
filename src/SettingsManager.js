const fs = require('fs');
const { getDirAbsoluteUri } = require('./utils_functions');
const { APIDICT } = require('./constants');

class SettingsManager {
	constructor({} = {}) {
		this.settings_path = getDirAbsoluteUri(`./settings.json`);
		this._settings = require(this.settings_path);
	}

	saveSettings(newSettings, { overwrite = true } = {}) {
		this._settings = newSettings;
		fs.writeFileSync(
			this.settings_path,
			JSON.stringify(newSettings, null, 2)
		);
	}

	getSettings() {
		return this._settings;
	}
}

module.exports = SettingsManager;
