// const { getRandomProblem, copyFileToTemp } = require('./index');
// const { increasePerformance } = require('../../utils');
const { getMaidDirectory } = require('../../utils_functions');
const { exec } = require('node:child_process');
const {
	Toggle,
	Confirm,
	prompt,
	AutoComplete,
	Survey,
	Input
} = require('enquirer');
const { ExtensionModel, Command } = require('../models');

class DataScienceExtension extends ExtensionModel {
	constructor(options = {}) {
		super(
			'DataScienceExtension',
			'1.0.0',
			'Data Science and Machine Learning practice extension with Jupyter notebooks',
			'Mastery CLI Team',
			'MIT',
			options
		);
	}

	getCommands() {
		return {
			jupyter: new Command(
				'Open and practice Jupyter notebook exercises',
				'jupyter',
				{
					usage: 'mastery jupyter',
					examples: ['mastery jupyter']
				}
			)
		};
	}

	getHandles({ flags, masteryManager, settings } = {}) {
		return {
			jupyter: this.openJupyter.bind(this)
		};
	}
	async openJupyter({ FILE = '/machine_learning/01_pandas.ipynb' } = {}) {
		// TODO: Implement copyFileToTemp function or import it properly
		// copyFileToTemp(FILE);

		const correctPrompt = new Confirm({
			name: 'notebook',
			message: 'Was the notebook solved correctly?',
			initial: true
		});
		const response = await correctPrompt.run();
		if (response && this.masteryManager) {
			this.masteryManager.increasePerformance('jupyter');
		}
		return response;
	}

	/**
	 * Opens a random jupyter notebook from the list of problems
	 * @returns {bool} if the problem was solved correctly
	 */
	async openRandomJupyter() {
		// TODO: Implement getRandomProblem function or import it properly
		// const selectedProblem = getRandomProblem();
		// this.runServer();
		// return this.openJupyter({ FILE: "/" + selectedProblem.problem });

		console.log(
			'Random Jupyter notebook functionality not implemented yet'
		);
		return false;
	}

	runServer() {
		const projectDirectory = getMaidDirectory();
		const jupyter_folder = '/src/data-science-cli/problems';

		const jupyterCommand = `jupyter notebook --notebook-dir=${projectDirectory}/${jupyter_folder}`;
		exec(jupyterCommand);
	}
}

module.exports = DataScienceExtension;
