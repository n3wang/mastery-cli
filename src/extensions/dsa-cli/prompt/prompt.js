const { getFilesInDirectory, getDirAbsoluteUri } = require('../functions');
const md2json = require('markdown-to-json');
const fs = require('fs');

const DEBUG = false;
const PROMPT_FILE = 'prompt.json';

const options = {
	minify: false,
	width: DEBUG ? 0 : 9000000,
	outfile: null
};

/**
 * Creates a compiled json file from all the markdown files in the prompt directory
 */
const createCompiledJson = () => {
	let parsed_prompt_dict = {};

	getFilesInDirectory('./prompt/')
		.then(files => {
			const absolutePathForFiles = files.map(file => {
				return getDirAbsoluteUri(file, './prompt/');
			});
			if (DEBUG)
				console.log('absolutePathForFiles: ', absolutePathForFiles);
			const promptsData = md2json.parse(absolutePathForFiles, options);
			if (DEBUG) console.log(promptsData);
			parsed_prompt_dict = JSON.parse(promptsData);
			// Object.values(parsed_prompt_dict).map((prompt) => {

			//     prompt.preview
			// });
			// console.log("promptsData: ", parsed_prompt_dict);

			// Save as a json
			const json = JSON.stringify(parsed_prompt_dict);
			const prompt_file_path = getDirAbsoluteUri(
				PROMPT_FILE,
				'./prompt/'
			);
			fs.writeFile(prompt_file_path, json, err => {
				if (err) throw err;
				// console.log('The file has been saved!');
			});
		})
		.catch(error => {
			console.error(error);
		});
};

const getLatestModified = async () => {
	const files = await getFilesInDirectory('./prompt/');
	let latestModified = null;
	let latestFile = null;

	const absolutePathForFiles = files.map(file => {
		return getDirAbsoluteUri(file, './prompt/');
	});
	for (const file of absolutePathForFiles) {
		const stats = await fs.promises.stat(file);
		if (!latestModified || stats.mtime > latestModified) {
			latestModified = stats.mtime;
			latestFile = file;
		}
	}

	return latestFile;
};

/**
 * Checks if prompt.json exists, if not, creates it, then returns the parsed json
 * @param {String} prompt_slug - The slug of the prompt to return, if empty, returns all prompts
 * @returns {Object} parsed_prompt_dict
 */
const getPromptDict = async (prompt_slug = '') => {
	// check if prompt.json exists
	const prompt_file_path = getDirAbsoluteUri(PROMPT_FILE, './prompt/');
	if (!fs.existsSync(prompt_file_path)) {
		createCompiledJson();
	}

	// If exists, check if it's the latest modified file, if not, update the prompt.json
	const latestModified = await getLatestModified();

	let parsed_prompt_dict;
	if (latestModified !== prompt_file_path) {
		console.log('latestModified his different ere: ', latestModified);
		createCompiledJson();
	}
	try {
		parsed_prompt_dict = require(prompt_file_path);
	} catch (e) {
		// Delete the prompt.json file and try again
		fs.unlinkSync(prompt_file_path);
		// If it fails this time exit and print
		try {
			parsed_prompt_dict = require(prompt_file_path);
		} catch (e) {
			console.error('Error: ', e);
			process.exit(1);
		}
	}

	if (prompt_slug === '') {
		return parsed_prompt_dict;
	}
	return parsed_prompt_dict[prompt_slug];
};

(async () => {
	const sample = await getPromptDict();
	if (DEBUG) console.log('sample: ', sample);
})();

module.exports = { getPromptDict, createCompiledJson };

// const parsed_prompt_dict = require(PROMPT_FILE);
// module.exports = parsed_prompt_dict;
