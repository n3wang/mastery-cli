/**
 * How to launch each supported editor.
 *
 * This used to live in the DSA feature's own settings file
 * (user_files/temp_settings.json), which meant a second settings file and a
 * second SettingsManager for one lookup table. The table is product data, not
 * user config — the user's choice of editor is the `editor` key in the vault
 * config.
 */

const COMMON_EDITORS = {
	nano: 'nano',
	vim: 'vim',
	nvim: 'nvim',
	emacs: 'emacs',
	sublime: 'sublime',
	atom: 'atom',
	code: 'code',
	default: 'start'
};

module.exports = { COMMON_EDITORS };
