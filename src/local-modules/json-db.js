/**
 * Local JSON Database Implementation
 *
 * This is a local replacement for the node-json-db package to avoid dependency issues
 * in corporate environments. It provides simple JSON file-based storage functionality.
 */

const fs = require('fs');
const path = require('path');

/**
 * Configuration class for JsonDB
 */
class Config {
	constructor(
		filename,
		saveOnPush = true,
		humanReadable = false,
		separator = '/'
	) {
		this.filename = filename;
		this.saveOnPush = saveOnPush;
		this.humanReadable = humanReadable;
		this.separator = separator;
	}
}

/**
 * Simple JSON Database implementation
 */
class JsonDB {
	constructor(config) {
		this.config = config;
		this.data = {};
		this.loaded = false;

		// Create directory if it doesn't exist
		const dirname = path.dirname(this.config.filename);
		if (!fs.existsSync(dirname)) {
			fs.mkdirSync(dirname, { recursive: true });
		}

		// Initialize empty file if it doesn't exist
		if (!fs.existsSync(this.config.filename)) {
			this.save(true);
			this.loaded = true;
		}
	}

	/**
	 * Process data path into array segments
	 * @param {string} dataPath - Path like '/elements' or '/date_based_stats'
	 * @returns {string[]} Array of path segments
	 */
	processDataPath(dataPath) {
		if (!dataPath || !dataPath.trim()) {
			throw new Error("The Data Path can't be empty");
		}

		if (dataPath === this.config.separator) {
			return [];
		}

		// Remove leading and trailing separators, then split
		dataPath = dataPath.replace(/^\/+|\/+$/g, '');
		return dataPath ? dataPath.split(this.config.separator) : [];
	}

	/**
	 * Get data from the database
	 * @param {string} dataPath - Path to the data
	 * @returns {any} The data at the specified path
	 */
	async getData(dataPath) {
		if (!this.loaded) {
			await this.load();
		}

		const segments = this.processDataPath(dataPath);
		let current = this.data;

		for (const segment of segments) {
			if (current && typeof current === 'object' && segment in current) {
				current = current[segment];
			} else {
				throw new Error(
					`Can't find dataPath: ${dataPath}. Stopped at ${segment}`
				);
			}
		}

		return current;
	}

	/**
	 * Push/set data in the database
	 * @param {string} dataPath - Path where to store the data
	 * @param {any} data - Data to store
	 */
	push(dataPath, data) {
		if (!this.loaded) {
			this.load();
		}

		const segments = this.processDataPath(dataPath);
		let current = this.data;

		// Navigate to the parent of the target location
		for (let i = 0; i < segments.length - 1; i++) {
			const segment = segments[i];
			if (!(segment in current) || typeof current[segment] !== 'object') {
				current[segment] = {};
			}
			current = current[segment];
		}

		// Set the data at the final segment
		if (segments.length > 0) {
			current[segments[segments.length - 1]] = data;
		} else {
			// Root level assignment
			this.data = data;
		}

		if (this.config.saveOnPush) {
			this.save();
		}
	}

	/**
	 * Load data from file
	 */
	load() {
		try {
			if (fs.existsSync(this.config.filename)) {
				const fileContent = fs.readFileSync(
					this.config.filename,
					'utf8'
				);
				this.data = fileContent.trim() ? JSON.parse(fileContent) : {};
			} else {
				this.data = {};
			}
			this.loaded = true;
		} catch (error) {
			this.data = {};
			this.loaded = true;
		}
	}

	/**
	 * Save data to file
	 * @param {boolean} force - Force save even if saveOnPush is false
	 */
	save(force = false) {
		if (force || this.config.saveOnPush) {
			const jsonData = this.config.humanReadable
				? JSON.stringify(this.data, null, 2)
				: JSON.stringify(this.data);

			fs.writeFileSync(this.config.filename, jsonData, 'utf8');
		}
	}

	/**
	 * Delete data at specified path
	 * @param {string} dataPath - Path to delete
	 */
	delete(dataPath) {
		if (!this.loaded) {
			this.load();
		}

		const segments = this.processDataPath(dataPath);
		let current = this.data;

		// Navigate to the parent of the target location
		for (let i = 0; i < segments.length - 1; i++) {
			const segment = segments[i];
			if (!(segment in current) || typeof current[segment] !== 'object') {
				throw new Error(
					`Can't find dataPath: ${dataPath}. Stopped at ${segment}`
				);
			}
			current = current[segment];
		}

		// Delete the final segment
		if (segments.length > 0) {
			delete current[segments[segments.length - 1]];
		} else {
			this.data = {};
		}

		if (this.config.saveOnPush) {
			this.save();
		}
	}

	/**
	 * Check if path exists
	 * @param {string} dataPath - Path to check
	 * @returns {boolean} True if path exists
	 */
	exists(dataPath) {
		try {
			this.getData(dataPath);
			return true;
		} catch {
			return false;
		}
	}
}

module.exports = { JsonDB, Config };
