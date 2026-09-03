/**
 * Constants and Configuration for Mastery CLI
 *
 * This file contains all the fixed values and settings that the app uses.
 * For beginners: Think of this as the app's "settings database" that stores:
 * - Color themes and styling
 * - Default values and limits
 * - Helper functions used throughout the app
 * - Built-in study content (math formulas, terminology, etc.)
 */

const { qmathformulas } = require('./terms-data/math_formulas.js');
const { termJson } = require('./terms-data/terms.js');
const { Term, Terminology, TermStorage } = require('./structures.js');

const path = require('path');
const url = require('url');

/**
 * Get a random item from a list
 * For beginners: This picks one random item from any list you give it
 * @param {Array} list - Any array of items
 * @returns {any} - One random item from the list
 */
function get_random(list) {
	return list[Math.floor(Math.random() * list.length)];
}

/**
 * Get multiple random items from a list
 * For beginners: This picks several random items from a list
 * @param {Array} list - Any array of items
 * @param {Object} options - Configuration options
 * @param {number} options.count - How many random items to pick (default: 1)
 * @returns {Array} - An array of random items from the original list
 */
/**
 * Take a random sample of a list, WITHOUT replacement.
 *
 * This used to pick `count` indices independently, so the result routinely
 * contained duplicates and missed other entries entirely -- drawing 6 of 6
 * items returned all 6 only ~1.5% of the time. That quietly defeated the
 * least-practiced-first selection, which relies on this to see every
 * candidate term.
 *
 * @param {Array} list source list (not mutated)
 * @param {Object} options
 * @param {Number} options.count how many items to draw
 * @returns {Array} up to `count` distinct items in random order
 */
function get_random_of_size(list, { count = 1 } = {}) {
	if (!Array.isArray(list) || list.length === 0) {
		return [];
	}

	// Partial Fisher-Yates: shuffle only as far as we need.
	const pool = [...list];
	const take = Math.min(count, pool.length);

	for (let i = 0; i < take; i++) {
		const j = i + Math.floor(Math.random() * (pool.length - i));
		[pool[i], pool[j]] = [pool[j], pool[i]];
	}

	return pool.slice(0, take);
}
const MASTERY_MANAGER_NAME = 'MCLI';

const MAID_EMOJIS = ['', ''];

// All external API calls have been removed for offline-only operation
let APIDICT = {
	// External APIs disabled for local-only operation
};

let CONSTANTS = {
	ACCOUNT_ID: 1,
	CUTEBLUE: '#9ccfe7', // Cornflower
	CUTEPINK: '#f5a9cb', // Lavander Pink
	PUNCHPINK: '#F25278',
	CUTEYELLOW: '#ffffc2', // Very Pale Yello
	CUTEPURPLE: '#977fd7', // Medium Purple
	default_commit_message: 'wip',
	algo_name: 'algo' // tag being used to identify if an algorithm had been solved that day.
};

// Path utilities - using direct implementation to avoid circular dependency
const getAbsoluteUri = (
	fileimage = './img/unicorn.png',
	subdirectory = './data/'
) => {
	const absolutePath = path.resolve(
		path.join(__dirname, './data/', fileimage)
	);
	const fileUrl = url.pathToFileURL(absolutePath);
	return fileUrl.toString();
};

const getDirAbsoluteUri = (
	fileimage = './img/unicorn.png',
	subdirectory = './data/'
) => {
	const absolutePath = path.resolve(
		path.join(__dirname, './data/', fileimage)
	);
	return absolutePath.toString();
};

// External currency API removed for offline-only operation

// Utility functions - using direct implementation to avoid circular dependency
const getRandomMaidEmoji = () => {
	return `:${get_random(MAID_EMOJIS)}:`;
};

const appendQuotes = message => {
	return `"${message}";`;
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

const getRandomBool = (chances = 0.5) => {
	return Math.random() < chances;
};

const countDecimals = value => {
	if (Math.floor(value) !== value)
		return value?.toString().split('.')[1].length ?? 0;
	return 0;
};

function populateTerms(termJson) {
	return termJson.map(
		obj =>
			new Term(
				obj?.term ?? '',
				obj?.example ?? '',
				obj?.description ?? '',
				obj?.prompt ?? '',
				{
					references: obj?.references ?? '',
					category: obj?.category ?? '',
					attachment: obj?.attachment,
					reference_line: obj?.reference_line ?? -1,
					reference_page: obj?.reference_page ?? '',
					module_name: obj?.module_name ?? '',
					module_path: obj?.module_path ?? '',
					common_instructions: obj?.common_instructions,
					deck_description: obj?.deck_description ?? '',
					prompt_description: obj?.prompt_description ?? '',
					priority: obj?.priority ?? 5,
					auto_newline: obj?.auto_newline ?? true
				}
			)
	);
}

const terms = populateTerms(termJson);

const termStorage = new TermStorage(terms);
const termsEnabled = termStorage.jsonTerms;

const getQmathEnabled = (listOfProblemSets, debugLast = false, lasts = 0) => {
	let qmathEnabled = [];
	for (problemSet of listOfProblemSets) {
		qmathEnabled = qmathEnabled.concat(problemSet);
	}

	// For debugging purposes
	if (lasts > 0) return qmathEnabled.slice(-lasts);
	if (debugLast) return [qmathEnabled.at(qmathEnabled.length - 1)];
	return qmathenabled;
};

// countDecimals moved to utils_functions.js

module.exports = {
	// Core constants and data
	MAID_NAME: MASTERY_MANAGER_NAME,
	MAID_EMOJIS,
	APIDICT,
	CONSTANTS,
	qmathformulas,
	qmathenabled: qmathformulas,
	termsEnabled,

	// Core functions that belong in constants (not duplicated in utils)
	get_random,
	get_random_of_size,

	// Re-exported utility functions for backward compatibility
	getRandomMaidEmoji,
	appendQuotes,
	formatObjectFeatures,
	getRandomInt,
	countDecimals,
	getRandomBool,
	getAbsoluteUri,
	getDirAbsoluteUri
};
