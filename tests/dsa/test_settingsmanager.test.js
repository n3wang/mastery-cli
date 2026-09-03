const assert = require('assert');
const { getSettingsManager } = require('../../src/SettingsManager');
const { COMMON_EDITORS } = require('../../src/features/dsa/editors');

describe('DSA settings', function () {
	describe('editor preference', function () {
		it('reads the editor from the single shared config', function () {
			const settings = getSettingsManager().getSettings();

			assert(settings !== undefined);
			assert.strictEqual(typeof settings.editor, 'string');
		});

		it('resolves the editor to a launch command', function () {
			const settings = getSettingsManager().getSettings();
			const command =
				COMMON_EDITORS[settings.editor] ?? COMMON_EDITORS.default;

			assert.strictEqual(typeof command, 'string');
			assert(command.length > 0);
		});
	});

	describe('shared instance', function () {
		it('hands out the same manager every time', function () {
			assert.strictEqual(getSettingsManager(), getSettingsManager());
		});

		it('a write is visible through settings.js in the same process', function () {
			const manager = getSettingsManager();
			const settings = manager.getSettings();
			const previous = settings.editor;

			settings.editor = 'vim-test-marker';
			manager.saveSettings(settings);

			// settings.js exports the live object, not a require() snapshot
			const liveSettings = require('../../src/settings');
			assert.strictEqual(liveSettings.editor, 'vim-test-marker');

			settings.editor = previous;
			manager.saveSettings(settings);
		});
	});
});
