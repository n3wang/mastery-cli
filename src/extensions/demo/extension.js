const { ExtensionModel, Command } = require('../models');

class DemoExtension extends ExtensionModel {
	constructor(options = {}) {
		super(
			'DemoExtension',
			'1.0.0',
			'Demo Extension showcasing the extension system capabilities',
			'Mastery CLI Team',
			'MIT',
			options
		);
	}

	async initialize(context = {}) {
		console.log(`Initializing ${this.name}...`);
		return await super.initialize(context);
	}

	getCommands() {
		return {
			sample: new Command(
				'Execute a sample command to test the extension system',
				'sample',
				{
					usage: 'mastery sample',
					examples: ['mastery sample'],
					flags: {}
				}
			),
			'demo-info': new Command(
				'Show information about the demo extension',
				'demo-info',
				{
					usage: 'mastery demo-info',
					examples: ['mastery demo-info']
				}
			)
		};
	}

	getHandles({ flags, masteryManager, settings } = {}) {
		return {
			sample: this.handleSampleCommand.bind(this),
			'demo-info': this.handleDemoInfoCommand.bind(this)
		};
	}

	getHooks(context = {}) {
		return {
			'before-command': this.beforeCommandHook.bind(this),
			'after-command': this.afterCommandHook.bind(this)
		};
	}

	async handleSampleCommand() {
		console.log('🎉 Sample command executed successfully!');
		console.log('This demonstrates the new extension system is working.');

		if (this.masteryManager) {
			console.log('✓ Extension has access to Mastery Manager');
		}

		return { success: true, message: 'Sample command completed' };
	}

	async handleDemoInfoCommand() {
		console.log('\n=== Demo Extension Information ===');
		console.log(`Name: ${this.name}`);
		console.log(`Version: ${this.version}`);
		console.log(`Description: ${this.description}`);
		console.log(`Author: ${this.author}`);
		console.log(`License: ${this.license}`);
		console.log(`Initialized: ${this.isInitialized}`);
		console.log(`Enabled: ${this.isEnabled}`);

		const commands = Object.keys(this.getCommands());
		console.log(`Available Commands: ${commands.join(', ')}`);

		return { success: true, extensionInfo: this.getInfo() };
	}

	async beforeCommandHook(data) {
		console.log(`🔄 Demo Extension: Before command hook triggered`);
		return { hookName: 'before-command', extension: this.name, data };
	}

	async afterCommandHook(data) {
		console.log(`✅ Demo Extension: After command hook triggered`);
		return { hookName: 'after-command', extension: this.name, data };
	}

	cleanup() {
		console.log(`Cleaning up ${this.name}...`);
		super.cleanup();
	}
}

module.exports = DemoExtension;
