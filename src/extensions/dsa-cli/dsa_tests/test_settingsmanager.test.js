const assert = require('assert');
const SettingsManager = require('../settings-manager');

describe('SettingsManager', function () {
	describe('#settings', function () {
		it('should return the current settings object', function () {
			const manager = new SettingsManager();

			assert(manager.settings !== undefined);
			assert(Object.keys(manager.settings).length > 0);
		});
	});

	describe('#editSettings()', function () {
		it('should open the settings file in the default editor', function (done) {
			const manager = new SettingsManager();
			manager.editSettings();
			done();
		});
	});
});
