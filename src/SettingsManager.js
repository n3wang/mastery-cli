/**
 * SettingsManager — the one place settings are read and written.
 *
 * Config lives at `<vault>/config.json`, seeded from `content/config.default.json`
 * on first run. There is a single shared instance (exported as `settings` from
 * this module's sibling `settings.js`) so a change made in one place is visible
 * everywhere in the process.
 *
 * Two things this replaces:
 *  - `settings.js` used to `require()` the JSON, handing out a module-cached
 *    snapshot that never saw writes made through this class. Quizzer held both,
 *    so after a mask toggle the two disagreed for the rest of the run.
 *  - each feature used to carry its own settings file via an extension option.
 *    Feature config is now top-level keys here.
 */

const fs = require('fs');
const path = require('path');

const { ensureVault, vaultPath } = require('./vault');

/** Bumped when the shape changes; `migrate()` brings older files forward. */
const CONFIG_VERSION = 1;

const CONFIG_FILENAME = 'config.json';
const DEFAULT_CONFIG_PATH = path.resolve(
	__dirname,
	'../content/config.default.json'
);

/**
 * Keys we expect to exist. Anything else is reported once on load rather than
 * silently ignored, which is what used to happen to a typo'd key.
 */
const KNOWN_KEYS = new Set([
	'version',
	'show_http_errors',
	'online',
	'quiz_enabled',
	'external_term_modules',
	'dsa_language_mode',
	'terms_force_mode_cards',
	'queue_configurations',
	'blog_special_commits',
	'commit_categories',
	'ask_quiz_when_commit',
	'ask_if_algo_missing_when_commit',
	'show_past_commits_features_after_quiz',
	'journal_notes',
	'report_show',
	'week_is_since_today',
	'table_feat_show',
	'objectives_features',
	'quiz_decks_configuration',
	'flashcard_markdown_file',
	'minimal_colors',
	'daily_deck_configuration',
	'deletion_queue',
	'logging',
	'llm',
	'editor',
	'dsa'
]);

/**
 * Bring an older config forward. Runs on every load; each step is a no-op once
 * it has been applied.
 * @param {Object} config
 * @returns {Object} { config, changed }
 */
function migrate(config) {
	let changed = false;

	if (config.version === undefined) {
		config.version = CONFIG_VERSION;
		changed = true;
	}

	// The DSA editor preference used to live in its own file
	// (extensions/dsa-cli/user_files/temp_settings.json).
	if (config.editor === undefined) {
		config.editor = 'nano';
		changed = true;
	}

	// External DSA problem folders used to be looked for in
	// features/dsa/user_files/temp_settings.json, which never held them.
	if (config.dsa === undefined) {
		config.dsa = {
			external_problems_folders: [],
			log_external_loading: false
		};
		changed = true;
	}

	return { config, changed };
}

/**
 * Report unknown top-level keys. Returns them rather than throwing: a stray key
 * is a typo to surface, not a reason to refuse to start.
 * @param {Object} config
 * @returns {String[]}
 */
function findUnknownKeys(config) {
	return Object.keys(config).filter(key => !KNOWN_KEYS.has(key));
}

class SettingsManager {
	constructor() {
		ensureVault();

		this.settings_path = vaultPath(CONFIG_FILENAME);
		this.default_path = DEFAULT_CONFIG_PATH;

		this.load();
	}

	/**
	 * Read config from disk, creating it from the shipped default if absent.
	 * Uses readFileSync rather than require() so writes are always observed.
	 */
	load() {
		if (!fs.existsSync(this.settings_path)) {
			if (!fs.existsSync(this.default_path)) {
				throw new Error(
					`No config at ${this.settings_path} and no default at ${this.default_path}`
				);
			}
			fs.mkdirSync(path.dirname(this.settings_path), { recursive: true });
			fs.copyFileSync(this.default_path, this.settings_path);
		}

		let parsed;
		try {
			parsed = JSON.parse(fs.readFileSync(this.settings_path, 'utf-8'));
		} catch (error) {
			throw new Error(
				`Could not parse ${this.settings_path}: ${error.message}`
			);
		}

		const { config, changed } = migrate(parsed);
		this._settings = config;

		const unknown = findUnknownKeys(config);
		if (unknown.length > 0) {
			console.warn(
				`Unrecognised setting(s) in ${this.settings_path}: ${unknown.join(', ')}`
			);
		}

		if (changed) {
			this.saveSettings(this._settings);
		}

		return this._settings;
	}

	saveSettings(newSettings) {
		this._settings = newSettings;
		fs.mkdirSync(path.dirname(this.settings_path), { recursive: true });
		fs.writeFileSync(
			this.settings_path,
			JSON.stringify(newSettings, null, 2),
			'utf-8'
		);
	}

	getSettings() {
		return this._settings;
	}

	getSettingsPath() {
		return this.settings_path;
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

/** The shared instance. Everything in the process reads through this. */
let instance = null;

/**
 * @returns {SettingsManager} the process-wide settings manager
 */
function getSettingsManager() {
	if (!instance) {
		instance = new SettingsManager();
	}
	return instance;
}

module.exports = SettingsManager;
module.exports.SettingsManager = SettingsManager;
module.exports.getSettingsManager = getSettingsManager;
module.exports.CONFIG_VERSION = CONFIG_VERSION;
module.exports.KNOWN_KEYS = KNOWN_KEYS;
