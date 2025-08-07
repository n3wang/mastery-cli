/**
 * ExtensionModel - Base class for all Mastery CLI extensions
 *
 * This provides the standard interface and structure that all extensions
 * must follow to ensure compatibility and professional integration.
 */

class ExtensionModel {
	constructor(
		name,
		version,
		description,
		author,
		license = 'MIT',
		options = {}
	) {
		// Validate required parameters
		if (!name || !version || !description || !author) {
			throw new Error(
				'Extension must provide name, version, description, and author'
			);
		}

		this.name = name;
		this.version = version;
		this.description = description;
		this.author = author;
		this.license = license;

		// Optional dependencies and configuration
		this.masteryManager = options.masteryManager || null;
		this.config = options.config || {};
		this.dependencies = options.dependencies || [];

		// Extension lifecycle state
		this.isInitialized = false;
		this.isEnabled = true;
	}

	/**
	 * Get extension metadata
	 * @returns {String} Formatted extension details
	 */
	getDetails() {
		return `${this.name} v${this.version} by ${this.author} - ${this.description}`;
	}

	/**
	 * Get extension information object
	 * @returns {Object} Extension metadata
	 */
	getInfo() {
		return {
			name: this.name,
			version: this.version,
			description: this.description,
			author: this.author,
			license: this.license,
			dependencies: this.dependencies,
			isInitialized: this.isInitialized,
			isEnabled: this.isEnabled
		};
	}

	/**
	 * Initialize the extension (called after loading)
	 * Override this method to perform setup tasks
	 * @param {Object} context Application context
	 * @returns {Promise<Boolean>} Success status
	 */
	async initialize(context = {}) {
		try {
			this.isInitialized = true;
			return true;
		} catch (error) {
			console.error(
				`Failed to initialize extension ${this.name}:`,
				error
			);
			return false;
		}
	}

	/**
	 * Get command definitions for help system
	 * Override to provide command documentation
	 * @returns {Object} Command definitions
	 */
	getCommands() {
		return {};
	}

	/**
	 * Get command handlers (REQUIRED)
	 * Extensions MUST override this method
	 * @param {Object} context Application context (flags, mastery instance, etc.)
	 * @returns {Object} Map of command names to handler functions
	 */
	getHandles(context = {}) {
		throw new Error(
			`Extension ${this.name} must implement getHandles() method`
		);
	}

	/**
	 * Get event hooks (OPTIONAL)
	 * Override to register for application events
	 * @param {Object} context Application context
	 * @returns {Object} Map of hook names to handler functions
	 */
	getHooks(context = {}) {
		return {};
	}

	/**
	 * Validate extension dependencies
	 * @param {Object} availableServices Available services/extensions
	 * @returns {Array} Array of missing dependencies
	 */
	validateDependencies(availableServices = {}) {
		const missing = [];

		for (const dependency of this.dependencies) {
			if (!availableServices[dependency]) {
				missing.push(dependency);
			}
		}

		return missing;
	}

	/**
	 * Enable the extension
	 */
	enable() {
		this.isEnabled = true;
	}

	/**
	 * Disable the extension
	 */
	disable() {
		this.isEnabled = false;
	}

	/**
	 * Cleanup extension resources (called before unloading)
	 * Override to perform cleanup tasks
	 */
	cleanup() {
		this.isInitialized = false;
	}

	/**
	 * Get extension configuration
	 * @returns {Object} Configuration object
	 */
	getConfig() {
		return this.config;
	}

	/**
	 * Update extension configuration
	 * @param {Object} newConfig Configuration updates
	 */
	updateConfig(newConfig) {
		this.config = { ...this.config, ...newConfig };
	}

	/**
	 * Check if extension is compatible with application version
	 * @param {String} appVersion Application version
	 * @returns {Boolean} Compatibility status
	 */
	isCompatible(appVersion = '1.0.0') {
		// Override in extensions that need version checking
		return true;
	}
}

/**
 * Command definition class for help system
 */
class Command {
	constructor(description, code, options = {}) {
		this.desc = description;
		this.code = code;
		this.usage = options.usage || '';
		this.examples = options.examples || [];
		this.flags = options.flags || {};
	}
}

module.exports = {
	ExtensionModel,
	Command
};
