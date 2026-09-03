const path = require('path');
const url = require('url');
const fs = require('fs');
const { marked } = require('marked');
const TerminalRenderer = require('marked-terminal');
const constants = require('./constants');
const { exec } = require('child_process');

const DEBUG = false;

/**
 * Gets clickeable path that could be printed on the console and clicked.
 * @param {str} fileimage : String containing the relative position of the image from utils directory
 * @returns {str} Formatted file:///C:/github/testing/mastery-cli/img/unicorn.png
 */
const getAbsoluteUri = (
	fileimage = './img/unicorn.png',
	subdirectory = './data/'
) => {
	// Note it should take from the root.
	const absolutePath = path.resolve(
		path.join(__dirname, './data/', fileimage)
	); // Note the '../' because it is inside of constants
	const fileUrl = url.pathToFileURL(absolutePath);
	return fileUrl.toString();
};
/**
 * Gets directory path
 * @param {str} fileimage : String containing the relative position of the image from utils directory
 * @returns {str} Formatted C:/github/testing/mastery-cli/img/unicorn.png
 */
const getDirAbsoluteUri = (
	fileimage = './img/unicor1n.png',
	subdirectory = './'
) => {
	// Note it should take from the root.
	const absolutePath = path.resolve(
		path.join(__dirname, subdirectory, fileimage)
	); // Note the '../' because it is inside of constants

	// const fileUrl = url.pathToFileURL(absolutePath);
	return absolutePath.toString();
};

const getFilesInDirectory = async (directoryPath = './data/priorities') => {
	const absolutePath = path.resolve(path.join(__dirname, directoryPath));

	if (DEBUG) console.log('Fetching from: ', absolutePath);

	return new Promise((resolve, reject) => {
		fs.readdir(absolutePath, (err, files) => {
			if (err) {
				reject(err);
			} else {
				resolve(files);
			}
		});
	});
};

const looselyDeepEqual = (a, b, { DEBUG = true } = {}) => {
	if (DEBUG) console.log('Your Output: ', a);
	return JSON.stringify(a.sort()) === JSON.stringify(b.sort());
};

const getMaidDirectory = () => {
	// Note it should take from the root.
	const absolutePath = path.resolve(path.join(__dirname, '../'));
	return absolutePath.toString();
};

const appendQuotes = message => {
	return `"${message}"`;
};
const formatLastTwoDecimals = original => {
	return Math.round(original * 100) / 100;
};
const formatObjectFeatures = userPerformanceData => {
	for (const feat of Object.keys(userPerformanceData)) {
		userPerformanceData[feat] = formatLastTwoDecimals(
			userPerformanceData[feat]
		);
	}
	return userPerformanceData;
};
const getRandomInt = max => {
	return Math.floor(Math.random() * max);
};
/**
 * @param: float ?= 0.05 #e.g. 0.5 The chances in favor of it being True
 * @returns Random Bool
 */
const getRandomBool = (chances = 0.5) => {
	return (random_boolean = Math.random() < chances);
};
const countDecimals = value => {
	if (Math.floor(value) !== value)
		return value?.toString().split('.')[1].length ?? 0;
	return 0;
};

const renderPromptDescription = (
	prompt,
	prompt_details,
	{ is_cloze = false } = {}
) => {
	try {
		const constants = require('./constants');
		const chalk = require('chalk');
		marked.setOptions({
			renderer: new TerminalRenderer()
		});
		// Print title in Blue
		const title = prompt?.['title'] ?? '';
		console.log(
			`${chalk.hex(constants.CONSTANTS.CUTEBLUE).inverse(` ${title} `)} ${
				is_cloze
					? '| ' +
						chalk
							.hex(constants.CONSTANTS.CUTEPINK)
							.inverse(` Cloze `)
					: ''
			}`
		);

		// Colored Difficulty tag.
		const prompt_difficulty = prompt_details?.['difficulty'] ?? '';
		const color_based_on_difficulty = difficulty => {
			if (difficulty === constants.difficulty.easy)
				return constants.CONSTANTS.CUTEGREEN;
			if (difficulty === constants.difficulty.medium)
				return constants.CONSTANTS.CUTEYELLOW;
			if (difficulty === constants.difficulty.hard)
				return constants.CONSTANTS.CUTEPINK;
			return constants.CONSTANTS.CUTEGREEN;
		};
		// Print tags but remove the difficulty from the tags array first
		const tags = prompt_details?.['tags'] ?? [];
		const tags_without_difficulty = tags.filter(
			tag => tag !== prompt_difficulty
		);
		// console.log(tags_without_difficulty);

		try {
			console.log(
				`${chalk
					.hex(color_based_on_difficulty(prompt_difficulty))
					.inverse(` ${prompt_difficulty} `)}`,
				tags_without_difficulty
			);
		} catch {}

		console.log(marked(prompt?.['description'] ?? ''));
		console.log(marked(prompt?.['preview'] ?? ''));
		return true;
	} catch (err) {
		console.log('Error while attempting to render prompt description', err);
		return false;
	}
};

/**
 *
 * @param {List: any} list A lit of any object
 * @param {int: count} count The number of random objects to pick from the list. Default is 1.
 * @returns any # picks the object and returns it. | If however the specified count of random objects is greater than the list, then it will return a list of random elements of that size.
 */
function get_random(list) {
	return list[Math.floor(Math.random() * list.length)];
}

function writeUnresolvedClass(
	sourceFilePath,
	targetFilePath,
	{ avoidOverwrite = true } = {}
) {
	// Check if the target file exists
	if (avoidOverwrite && fs.existsSync(targetFilePath)) {
		console.error(
			`Target file ${targetFilePath} already exists. Aborting write.`
		);
		return;
	}

	// Read the content of the source file
	const content = fs.readFileSync(sourceFilePath, 'utf8');

	// Find the class name
	const className = content.match(/class (\w+)/)[1];

	// Find the solve method
	const solveMethod = content.match(/solve\([\s\S]*?\n/m);
	console.log('solveMethod', solveMethod);
	const solveMethodHeader = solveMethod ? `\n\t${solveMethod[0]}` : '';

	// Write the unresolved version of the class to the target file
	const unresolvedContent = `class ${className} {${solveMethodHeader}\t// Your code here\n\n\t\}\n}\n\n\nmodule.exports = { Problem: ${className} };`;

	fs.writeFileSync(targetFilePath, unresolvedContent, 'utf8');
}

function getCurrentDate() {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, '0');
	const day = String(today.getDate()).padStart(2, '0');
	const currentDate = `${year}-${month}-${day}`;
	// console.log(currentDate); // Output: 2023-07-03
	return currentDate;
}

function getCurrentDateTimeIso() {
	const today = new Date();
	const currentDate = today.toISOString();
	// console.log(currentDate); // Output: 2023-07-03
	return currentDate;
}

const openEditorWithCommand = async instruction => {
	await exec(`${instruction}`, (error, stdout, stderr) => {
		if (error) {
			console.error(`exec error: ${error}`);
			return;
		}
		console.log(`Continue running`);
	});
};

/**
 * Opens the editor with the given instruction and the absolute path of the file
 * @param {string} editor_instruction  e.g. code, vim, nano, etc.
 * @param {string} absolute_temp_file_path e.g. /home/username/.../temp.js
 */
const openEditorPlatformAgnostic = async (
	editor_instruction,
	{ absolute_temp_file_path = '' } = {}
) => {
	const os = require('os');

	if (os.platform() === 'win32') {
		await openEditorWithCommand(
			`start ${editor_instruction} ${absolute_temp_file_path}`
		);
	} else {
		await openEditorWithCommand(
			`${editor_instruction} ${absolute_temp_file_path}`
		);
	}
};

module.exports = {
	getAbsoluteUri,
	getDirAbsoluteUri,
	appendQuotes,
	formatObjectFeatures,
	getRandomInt,
	getRandomBool,
	countDecimals,
	getMaidDirectory,
	getFilesInDirectory,
	renderPromptDescription,
	writeUnresolvedClass,
	getCurrentDate,
	openEditorPlatformAgnostic,
	looselyDeepEqual,
	get_random,
	getCurrentDateTimeIso
};
