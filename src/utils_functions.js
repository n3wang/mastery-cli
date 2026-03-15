/**
 * Standardized Utility Functions for Mastery CLI
 *
 * This file contains all the shared utility functions used across the application.
 * These functions handle file operations, user input validation, markdown rendering,
 * and platform-specific operations.
 */

const path = require('path');
const url = require('url');
const fs = require('fs');
const { get_random, MAID_EMOJIS } = require('./constants');
const DEBUG = false;
const { marked } = require('marked'); //Formats into html
var TerminalRenderer = require('marked-terminal'); //Formats into terminal
const { exec } = require('child_process');
const { getUserDataAbsolutePath } = require('./userDataPaths');

marked.setOptions({
	renderer: new TerminalRenderer()
});

/**
 * Gets clickeable path that could be printed on the console and clicked.
 * @param {str} fileimage : String containing the relative position of the image from utils directory
 * @returns {str} Formatted file:///C:/github/testing/mastery-cli/img/unicorn.png
 */
const getAbsoluteUri = (
	fileimage = './img/unicorn.png',
	subdirectory = './data/'
) => {
	const normalizedFilePath = String(fileimage || '')
		.replace(/\\/g, '/')
		.replace(/^\.\//, '');
	if (
		normalizedFilePath === 'user_data' ||
		normalizedFilePath.startsWith('user_data/')
	) {
		const fileUrl = url.pathToFileURL(
			getUserDataAbsolutePath(normalizedFilePath)
		);
		return fileUrl.toString();
	}

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
	fileimage = './img/unicorn.png',
	subdirectory = './data/'
) => {
	const normalizedFilePath = String(fileimage || '')
		.replace(/\\/g, '/')
		.replace(/^\.\//, '');
	if (
		normalizedFilePath === 'user_data' ||
		normalizedFilePath.startsWith('user_data/')
	) {
		return getUserDataAbsolutePath(normalizedFilePath);
	}

	// Note it should take from the root.
	const absolutePath = path.resolve(
		path.join(__dirname, './data/', fileimage)
	); // Note the '../' because it is inside of constants

	// const fileUrl = url.pathToFileURL(abosolutePath);
	return absolutePath.toString();
};

/**
 *
 * @param {string} directoryPath './data/priorities'
 * @returns Promise that resolves to the files in the directory
 */
const getFilesInDirectory = (directoryPath = './data/priorities') => {
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

/**
 * Return the absolute path of the codebase
 * @returns {str} Formatted full Directory of the codebase e.g. C:/github/testing/mastery-cli
 */
const getMaidDirectory = () => {
	// Note it should take from the root.
	const absolutePath = path.resolve(path.join(__dirname, '../'));
	return absolutePath.toString();
};

// https://api.apilayer.com/exchangerates_data/convert?to={to}&from={from}&amount={amount}
const getRandomMaidEmoji = () => {
	return `:${get_random(MAID_EMOJIS)}:`;
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

/**
 * Counts the decimals.
 * @param {number} value Number to count decimals
 * @returns {number} Number of decimals
 */
const countDecimals = value => {
	if (Math.floor(value) !== value)
		return value?.toString().split('.')[1].length ?? 0;
	return 0;
};

/**
 * Returns whether the user wants to exit.
 * @param {str} res : User input
 * @returns {boolean} : True if user wants to exit, false otherwise
 */
const user_requests_exit = res => {
	return res == 'exit' || res == 'quit' || res == 'q' || res == '!';
};

/**
 * Returns whether the user wants to open a calculator node. (for now a js node would work.)
 * @param {str} res : User input
 * @returns {boolean} : True if user wants to calculate, false otherwise
 */
const user_requests_calc = res => {
	return res == 'calc';
};

/**
 * Returns whether the user wants to skip the problem.
 * @param {boolean} res : User input
 * @returns {boolean} : True if user wants to skip, false otherwise
 */
const user_requests_skip = res => {
	return (
		res == 'skip' ||
		res == 's' ||
		res == 'next' ||
		res == 'n' ||
		res == 'no' ||
		res == ''
	);
};

/**
 * Prints the content as markdown if it is markdown, otherwise it will just print the content
 * @param {string} content The String content that can be either markdown or not, determined by :m
 * @param {boolean} use_markdown If true then it will use markdown, if false then it will just print the content
 * @param {string} markdown_token The token that determines if the content is markdown or not
 */
function printMarked(
	content,
	{ use_markdown = true, markdown_token = ':m' } = {}
) {
	if (use_markdown) {
		// Check if the description starts with :m
		if (content.startsWith(markdown_token)) {
			if (DEBUG) console.log('markdown detected');
			// Remove the :m
			content = content.substring(2);

			console.log(marked(content));
		} else {
			console.log(`${content}\n`);
		}
	} else {
		console.log(`${content}\n`);
	}
}

/**
 * Open the editor with the given instruction
 * @param {Awaited<void>} Returns once the editor is closed
 */
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
	// File and path utilities
	getAbsoluteUri,
	getDirAbsoluteUri,
	getMaidDirectory,
	getFilesInDirectory,

	// Random utilities
	getRandomMaidEmoji,
	getRandomInt,
	getRandomBool,

	// String and formatting utilities
	appendQuotes,
	formatObjectFeatures,
	countDecimals,

	// User input validation
	user_requests_exit,
	user_requests_skip,
	user_requests_calc,

	// Display utilities
	printMarked,
	openEditorPlatformAgnostic
};
