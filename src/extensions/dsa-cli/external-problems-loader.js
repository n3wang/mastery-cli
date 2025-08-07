const fs = require('fs');
const path = require('path');
const {
	parseMarkdownProblemsFromFolder,
	convertToProblemsMetadata
} = require('./md_dsa_parser.js');
const { getDirAbsoluteUri } = require('./functions.js');

/**
 * Loads and manages external DSA problems from temp_settings.json
 */
class ExternalProblemsLoader {
	constructor() {
		this.tempSettingsPath = getDirAbsoluteUri(
			'./user_files/temp_settings.json',
			'./'
		);
		this.externalProblems = [];
		this.loadedFolders = new Set();
	}

	/**
	 * Loads the temp_settings.json configuration
	 * @returns {Object} The configuration object
	 */
	loadTempSettings() {
		try {
			if (!fs.existsSync(this.tempSettingsPath)) {
				console.warn(
					`temp_settings.json not found at ${this.tempSettingsPath}`
				);
				return { external_problems_folders: [], settings: {} };
			}

			const settingsContent = fs.readFileSync(
				this.tempSettingsPath,
				'utf-8'
			);
			const settings = JSON.parse(settingsContent);

			return {
				external_problems_folders:
					settings.external_problems_folders || [],
				settings: settings.settings || {}
			};
		} catch (error) {
			console.error('Error loading temp_settings.json:', error.message);
			return { external_problems_folders: [], settings: {} };
		}
	}

	/**
	 * Loads external problems from all configured folders
	 * @returns {Object[]} Array of ProblemMetadata objects
	 */
	loadExternalProblems() {
		const config = this.loadTempSettings();
		const { external_problems_folders, settings } = config;

		if (
			!external_problems_folders ||
			external_problems_folders.length === 0
		) {
			if (settings.log_external_loading) {
				console.log('No external problems folders configured');
			}
			return [];
		}

		const allProblems = [];

		for (const folderPath of external_problems_folders) {
			try {
				if (this.loadedFolders.has(folderPath)) {
					if (settings.log_external_loading) {
						console.log(
							`Folder ${folderPath} already loaded, skipping`
						);
					}
					continue;
				}

				if (!fs.existsSync(folderPath)) {
					console.warn(
						`External problems folder does not exist: ${folderPath}`
					);
					continue;
				}

				if (settings.log_external_loading) {
					console.log(
						`Loading external problems from: ${folderPath}`
					);
				}

				const parsedProblems =
					parseMarkdownProblemsFromFolder(folderPath);
				const problemMetadata = convertToProblemsMetadata(
					parsedProblems,
					'External Problems',
					folderPath
				);

				allProblems.push(...problemMetadata);
				this.loadedFolders.add(folderPath);

				if (settings.log_external_loading) {
					console.log(
						`Loaded ${problemMetadata.length} problems from ${folderPath}`
					);
				}
			} catch (error) {
				console.error(
					`Error loading problems from ${folderPath}:`,
					error.message
				);
			}
		}

		this.externalProblems = allProblems;

		if (settings.log_external_loading && allProblems.length > 0) {
			console.log(
				`Total external problems loaded: ${allProblems.length}`
			);
		}

		return allProblems;
	}

	/**
	 * Adds a new external problems folder to temp_settings.json
	 * @param {string} folderPath - Path to the folder to add
	 */
	addExternalFolder(folderPath) {
		try {
			const config = this.loadTempSettings();

			if (!config.external_problems_folders.includes(folderPath)) {
				config.external_problems_folders.push(folderPath);

				// Update the temp_settings.json file
				const currentSettings = JSON.parse(
					fs.readFileSync(this.tempSettingsPath, 'utf-8')
				);
				currentSettings.external_problems_folders =
					config.external_problems_folders;
				currentSettings.last_updated = new Date().toISOString();

				fs.writeFileSync(
					this.tempSettingsPath,
					JSON.stringify(currentSettings, null, 4)
				);
				console.log(`Added external folder: ${folderPath}`);
			} else {
				console.log(`Folder already configured: ${folderPath}`);
			}
		} catch (error) {
			console.error('Error adding external folder:', error.message);
		}
	}

	/**
	 * Removes an external problems folder from temp_settings.json
	 * @param {string} folderPath - Path to the folder to remove
	 */
	removeExternalFolder(folderPath) {
		try {
			const config = this.loadTempSettings();
			const index = config.external_problems_folders.indexOf(folderPath);

			if (index > -1) {
				config.external_problems_folders.splice(index, 1);

				// Update the temp_settings.json file
				const currentSettings = JSON.parse(
					fs.readFileSync(this.tempSettingsPath, 'utf-8')
				);
				currentSettings.external_problems_folders =
					config.external_problems_folders;
				currentSettings.last_updated = new Date().toISOString();

				fs.writeFileSync(
					this.tempSettingsPath,
					JSON.stringify(currentSettings, null, 4)
				);
				console.log(`Removed external folder: ${folderPath}`);

				// Remove from loaded folders set so it can be reloaded if re-added
				this.loadedFolders.delete(folderPath);
			} else {
				console.log(`Folder not found in configuration: ${folderPath}`);
			}
		} catch (error) {
			console.error('Error removing external folder:', error.message);
		}
	}

	/**
	 * Lists all configured external folders
	 * @returns {string[]} Array of folder paths
	 */
	listExternalFolders() {
		const config = this.loadTempSettings();
		return config.external_problems_folders || [];
	}

	/**
	 * Checks if external problem loading is enabled
	 * @returns {boolean} True if auto-loading is enabled
	 */
	isAutoLoadEnabled() {
		const config = this.loadTempSettings();
		return config.settings.auto_load_external_problems !== false; // Default to true
	}

	/**
	 * Reloads all external problems (clears cache and reloads)
	 * @returns {Object[]} Array of ProblemMetadata objects
	 */
	reloadExternalProblems() {
		this.loadedFolders.clear();
		this.externalProblems = [];
		return this.loadExternalProblems();
	}

	/**
	 * Gets statistics about loaded external problems
	 * @returns {Object} Statistics object
	 */
	getStats() {
		const config = this.loadTempSettings();
		return {
			total_folders_configured: config.external_problems_folders.length,
			total_folders_loaded: this.loadedFolders.size,
			total_problems_loaded: this.externalProblems.length,
			auto_load_enabled: this.isAutoLoadEnabled(),
			configured_folders: config.external_problems_folders
		};
	}
}

// Create a singleton instance
const externalProblemsLoader = new ExternalProblemsLoader();

module.exports = {
	ExternalProblemsLoader,
	externalProblemsLoader
};
