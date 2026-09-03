const { exec, spawn } = require('node:child_process');

const fileName = 'temp.js';

const common_editors = {
	nano: 'nano',
	vim: 'vim',
	nvim: 'nvim',
	emacs: 'emacs',
	sublime: 'sublime',
	atom: 'atom',
	code: 'code'
};

exec(`${common_editors.nvim} ${fileName}`, (error, stdout, stderr) => {
	if (error) {
		console.error(`exec error: ${error}`);
		return;
	}
	console.log(`Continue running`);
});
