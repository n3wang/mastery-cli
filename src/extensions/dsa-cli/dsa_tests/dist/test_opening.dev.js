'use strict';

var _require = require('node:child_process'),
	exec = _require.exec,
	spawn = _require.spawn;

var fileName = 'temp.js';
exec('nano '.concat(fileName), function (error, stdout, stderr) {
	if (error) {
		console.error('exec error: '.concat(error));
		return;
	}

	console.log('stdout: '.concat(stdout));
	console.error('stderr: '.concat(stderr));
});
