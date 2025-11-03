const fs = require('fs');
const path = require('path');
const { getDirAbsoluteUri } = require('./utils_functions');
const { APIDICT } = require('./constants');

class SettingsManager {
	constructor({} = {}) {
		this.settings_path = path.join(__dirname, 'user_data', 'settings.json');
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

	getQuizDecksConfiguration() {
		if (!this._settings.quiz_decks_configuration) {
			this._settings.quiz_decks_configuration = {
				masks: [],
				use_masks: []
			};
		}
		return this._settings.quiz_decks_configuration;
	}

	getActiveMasks() {
		const config = this.getQuizDecksConfiguration();
		return config.use_masks || [];
	}

	getEnabledDecksFromMasks() {
		const config = this.getQuizDecksConfiguration();
		const activeMaskNames = config.use_masks || [];

		const enabledDecks = new Set();

		for (const maskName of activeMaskNames) {
			const mask = config.masks.find(m => m.title === maskName);
			if (mask && mask.decks_to_enable) {
				mask.decks_to_enable.forEach(deck => enabledDecks.add(deck));
			}
		}

		return Array.from(enabledDecks);
	}

	getAllMasks() {
		const config = this.getQuizDecksConfiguration();
		return config.masks || [];
	}

	createMask(title, decksToEnable = []) {
		const config = this.getQuizDecksConfiguration();

		const existingMask = config.masks.find(m => m.title === title);
		if (existingMask) {
			throw new Error(`Mask "${title}" already exists`);
		}

		config.masks.push({
			title: title,
			decks_to_enable: decksToEnable
		});

		this.saveSettings(this._settings);
		return true;
	}

	toggleMask(maskName, enable = null) {
		const config = this.getQuizDecksConfiguration();

		const mask = config.masks.find(m => m.title === maskName);
		if (!mask) {
			throw new Error(`Mask "${maskName}" not found`);
		}

		const isCurrentlyEnabled = config.use_masks.includes(maskName);

		if (enable === null) {
			enable = !isCurrentlyEnabled;
		}

		if (enable && !isCurrentlyEnabled) {
			config.use_masks.push(maskName);
		} else if (!enable && isCurrentlyEnabled) {
			config.use_masks = config.use_masks.filter(m => m !== maskName);
		}

		this.saveSettings(this._settings);
		return enable;
	}

	addDecksToMask(maskName, decksToAdd) {
		const config = this.getQuizDecksConfiguration();

		const mask = config.masks.find(m => m.title === maskName);
		if (!mask) {
			throw new Error(`Mask "${maskName}" not found`);
		}

		decksToAdd.forEach(deck => {
			if (!mask.decks_to_enable.includes(deck)) {
				mask.decks_to_enable.push(deck);
			}
		});

		this.saveSettings(this._settings);
		return true;
	}

	removeDecksFromMask(maskName, decksToRemove) {
		const config = this.getQuizDecksConfiguration();

		const mask = config.masks.find(m => m.title === maskName);
		if (!mask) {
			throw new Error(`Mask "${maskName}" not found`);
		}

		mask.decks_to_enable = mask.decks_to_enable.filter(
			deck => !decksToRemove.includes(deck)
		);

		this.saveSettings(this._settings);
		return true;
	}
}

module.exports = SettingsManager;
