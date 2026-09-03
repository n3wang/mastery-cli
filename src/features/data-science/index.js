/**
 * Data science feature — Jupyter notebook practice.
 *
 * Commands:
 * - jupyter : open and practice Jupyter notebook exercises
 *
 * NOTE: this feature is largely unimplemented. `openJupyter` never actually
 * opens a notebook — it only asks whether one was solved and records the
 * score. `openRandomJupyter` is a stub, and `runServer` points at
 * `/src/data-science-cli/problems`, a directory that does not exist. It is
 * carried over as-is by the extension flattening; whether to finish it or
 * drop it is an open question in the OSS prep plan (section 12).
 */

const { exec } = require('node:child_process');
const { Confirm } = require('enquirer');
const { getMaidDirectory } = require('../../utils_functions');

const NAME = 'data-science';

function getCommands() {
	return {
		jupyter: {
			desc: 'Open and practice Jupyter notebook exercises',
			usage: 'mastery jupyter',
			examples: ['mastery jupyter']
		}
	};
}

async function openJupyter(
	masteryManager,
	{ FILE = '/machine_learning/01_pandas.ipynb' } = {}
) {
	const correctPrompt = new Confirm({
		name: 'notebook',
		message: 'Was the notebook solved correctly?',
		initial: true
	});

	const response = await correctPrompt.run();
	if (response && masteryManager) {
		masteryManager.increasePerformance('jupyter');
	}
	return response;
}

function runServer() {
	const projectDirectory = getMaidDirectory();
	const jupyter_folder = '/src/features/data-science/problems';
	exec(
		`jupyter notebook --notebook-dir=${projectDirectory}/${jupyter_folder}`
	);
}

function getHandlers({ masteryManager = null } = {}) {
	return {
		jupyter: () => openJupyter(masteryManager)
	};
}

module.exports = {
	NAME,
	getCommands,
	getHandlers,
	openJupyter,
	runServer
};
