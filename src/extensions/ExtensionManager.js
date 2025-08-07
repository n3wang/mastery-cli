/**
 * ExtensionManager - Professional extension loading and management system
 *
 * This class handles the discovery, loading, validation, and registration
 * of extensions in a professional and scalable manner.
 */

const fs = require('fs');
const path = require('path');
const { ExtensionModel } = require('./models');

class ExtensionManager {
	constructor(extensionsDir = path.join(__dirname), logger = console) {
		this.extensionsDir = extensionsDir;
		this.logger = logger;
		this.loadedExtensions = new Map();
		this.commandHandlers = new Map();
		this.hooks = new Map();
	}

	/**
	 * Discover all extensions in the extensions directory
	 * @returns {Array} Array of extension directory paths
	 */
	discoverExtensions() {
		try {
			const extensions = [];
			const items = fs.readdirSync(this.extensionsDir, {
				withFileTypes: true
			});

			for (const item of items) {
				if (item.isDirectory() && !item.name.startsWith('.')) {
					const extensionPath = path.join(
						this.extensionsDir,
						item.name
					);
					const extensionFile = path.join(
						extensionPath,
						'extension.js'
					);

					if (fs.existsSync(extensionFile)) {
						extensions.push({
							name: item.name,
							path: extensionPath,
							entryPoint: extensionFile
						});
					}
				}
			}

			return extensions;
		} catch (error) {
			this.logger.error('Error discovering extensions:', error);
			return [];
		}
	}

	/**
	 * Load and validate an extension
	 * @param {Object} extensionInfo Extension info from discovery
	 * @returns {Object|null} Loaded extension instance or null if failed
	 */
	loadExtension(extensionInfo) {
		try {
			// Clear require cache for hot reloading in development
			delete require.cache[require.resolve(extensionInfo.entryPoint)];

			const ExtensionClass = require(extensionInfo.entryPoint);

			// Validate extension class
			if (typeof ExtensionClass !== 'function') {
				throw new Error(
					`Extension ${extensionInfo.name} does not export a class`
				);
			}

			const extensionInstance = new ExtensionClass();

			// Validate extension instance
			if (!(extensionInstance instanceof ExtensionModel)) {
				throw new Error(
					`Extension ${extensionInfo.name} must extend ExtensionModel`
				);
			}

			// Validate required methods
			if (typeof extensionInstance.getHandles !== 'function') {
				throw new Error(
					`Extension ${extensionInfo.name} must implement getHandles() method`
				);
			}

			extensionInstance._extensionInfo = extensionInfo;

			this.logger.info(
				`✓ Loaded extension: ${extensionInstance.name} v${extensionInstance.version}`
			);

			return extensionInstance;
		} catch (error) {
			this.logger.error(
				`✗ Failed to load extension ${extensionInfo.name}:`,
				error.message
			);
			return null;
		}
	}

	/**
	 * Register extension command handlers
	 * @param {Object} extension Extension instance
	 * @param {Object} context Context object (e.g., mastery instance, flags)
	 */
	registerExtension(extension, context = {}) {
		try {
			const handles = extension.getHandles(context);

			if (!handles || typeof handles !== 'object') {
				throw new Error(
					`Extension ${extension.name} getHandles() must return an object`
				);
			}

			for (const [command, handler] of Object.entries(handles)) {
				if (typeof handler !== 'function') {
					this.logger.warn(
						`Extension ${extension.name}: Handler for '${command}' is not a function`
					);
					continue;
				}

				// Check for command conflicts
				if (this.commandHandlers.has(command)) {
					const existingExtension =
						this.commandHandlers.get(command).extensionName;
					this.logger.warn(
						`Command conflict: '${command}' from ${extension.name} conflicts with ${existingExtension}`
					);
					continue;
				}

				this.commandHandlers.set(command, {
					handler: handler.bind(extension),
					extensionName: extension.name,
					extension: extension
				});
			}

			this.loadedExtensions.set(extension.name, extension);

			// Register hooks if extension supports them
			if (typeof extension.getHooks === 'function') {
				const hooks = extension.getHooks(context);
				for (const [hookName, hookHandler] of Object.entries(
					hooks || {}
				)) {
					if (!this.hooks.has(hookName)) {
						this.hooks.set(hookName, []);
					}
					this.hooks.get(hookName).push({
						handler: hookHandler.bind(extension),
						extensionName: extension.name
					});
				}
			}

			this.logger.info(`✓ Registered extension: ${extension.name}`);
		} catch (error) {
			this.logger.error(
				`✗ Failed to register extension ${extension.name}:`,
				error.message
			);
		}
	}

	/**
	 * Load all extensions from the extensions directory
	 * @param {Object} context Context object passed to extensions
	 * @returns {Number} Number of successfully loaded extensions
	 */
	loadAllExtensions(context = {}) {
		const discoveredExtensions = this.discoverExtensions();
		let loadedCount = 0;

		this.logger.info(
			`Discovered ${discoveredExtensions.length} extension(s)`
		);

		for (const extensionInfo of discoveredExtensions) {
			const extension = this.loadExtension(extensionInfo);

			if (extension) {
				this.registerExtension(extension, context);
				loadedCount++;
			}
		}

		this.logger.info(
			`Successfully loaded ${loadedCount}/${discoveredExtensions.length} extension(s)`
		);

		return loadedCount;
	}

	/**
	 * Get command handler for a specific command
	 * @param {String} command Command name
	 * @returns {Function|null} Command handler or null
	 */
	getCommandHandler(command) {
		const handlerInfo = this.commandHandlers.get(command);
		return handlerInfo ? handlerInfo.handler : null;
	}

	/**
	 * Get all registered commands
	 * @returns {Array} Array of command names
	 */
	getRegisteredCommands() {
		return Array.from(this.commandHandlers.keys());
	}

	/**
	 * Get extension info by name
	 * @param {String} extensionName Extension name
	 * @returns {Object|null} Extension instance or null
	 */
	getExtension(extensionName) {
		return this.loadedExtensions.get(extensionName) || null;
	}

	/**
	 * Execute hooks for a specific event
	 * @param {String} hookName Hook name
	 * @param {*} data Data to pass to hook handlers
	 * @returns {Promise<Array>} Array of hook results
	 */
	async executeHooks(hookName, data = null) {
		const hookHandlers = this.hooks.get(hookName) || [];
		const results = [];

		for (const { handler, extensionName } of hookHandlers) {
			try {
				const result = await handler(data);
				results.push({ extensionName, result });
			} catch (error) {
				this.logger.error(
					`Hook execution failed for ${extensionName}:${hookName}:`,
					error.message
				);
				results.push({ extensionName, error: error.message });
			}
		}

		return results;
	}

	/**
	 * Unload an extension
	 * @param {String} extensionName Extension name
	 * @returns {Boolean} Success status
	 */
	unloadExtension(extensionName) {
		try {
			const extension = this.loadedExtensions.get(extensionName);
			if (!extension) {
				return false;
			}

			// Remove command handlers
			for (const [
				command,
				handlerInfo
			] of this.commandHandlers.entries()) {
				if (handlerInfo.extensionName === extensionName) {
					this.commandHandlers.delete(command);
				}
			}

			// Remove hooks
			for (const [hookName, hookHandlers] of this.hooks.entries()) {
				const filtered = hookHandlers.filter(
					h => h.extensionName !== extensionName
				);
				if (filtered.length === 0) {
					this.hooks.delete(hookName);
				} else {
					this.hooks.set(hookName, filtered);
				}
			}

			// Cleanup extension
			if (typeof extension.cleanup === 'function') {
				extension.cleanup();
			}

			this.loadedExtensions.delete(extensionName);

			this.logger.info(`✓ Unloaded extension: ${extensionName}`);
			return true;
		} catch (error) {
			this.logger.error(
				`✗ Failed to unload extension ${extensionName}:`,
				error.message
			);
			return false;
		}
	}

	/**
	 * Get extension manager status
	 * @returns {Object} Status information
	 */
	getStatus() {
		return {
			extensionsLoaded: this.loadedExtensions.size,
			commandsRegistered: this.commandHandlers.size,
			hooksRegistered: this.hooks.size,
			extensions: Array.from(this.loadedExtensions.values()).map(ext => ({
				name: ext.name,
				version: ext.version,
				description: ext.description,
				author: ext.author
			}))
		};
	}
}

module.exports = { ExtensionManager };
