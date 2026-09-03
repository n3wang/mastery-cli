/**
 * Settings for Mastery CLI.
 *
 * This module exports the live settings object from the single shared
 * SettingsManager. It used to `require()` the JSON file directly, which handed
 * out a module-cached copy that never saw writes made through SettingsManager —
 * so after a mask toggle the two views disagreed for the rest of the process.
 *
 * The file itself lives at `<vault>/config.json`. See src/vault.js.
 */

const { getSettingsManager } = require('./SettingsManager');

module.exports = getSettingsManager().getSettings();
