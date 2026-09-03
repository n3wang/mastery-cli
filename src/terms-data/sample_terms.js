/**
 * Consolidated Terms File - Dynamic Import/Export with Lazy Loading
 *
 * This file automatically imports and re-exports all terms from files in the sample_terms/ folder.
 * Terms are loaded lazily only when first accessed to improve startup performance.
 * Any new files added to sample_terms/ will be automatically included.
 */

const fs = require('fs');
const path = require('path');

let consolidatedExports = null;
let isLoading = false;

function verboseLogsEnabled() {
	return process.env.MASTERY_VERBOSE_LOGS === '1';
}

/**
 * Lazy load all terms from the sample_terms directory
 * @returns {Object} Consolidated exports from all term files
 */
function loadTermsLazy() {
	if (consolidatedExports !== null) {
		return consolidatedExports;
	}

	if (isLoading) {
		// Avoid recursive loading during require cycles
		return {};
	}

	isLoading = true;
	consolidatedExports = {};

	try {
		// Get all JavaScript files in the sample_terms directory
		const sampleTermsDir = path.join(__dirname, 'sample_terms');
		const files = fs
			.readdirSync(sampleTermsDir)
			.filter(file => file.endsWith('.js'));

		files.forEach(file => {
			try {
				const filePath = path.join(sampleTermsDir, file);
				const moduleExports = require(filePath);

				// Merge all exports from this file into our consolidated exports
				Object.assign(consolidatedExports, moduleExports);
			} catch (error) {
				console.warn(`⚠ Failed to load ${file}:`, error.message);
			}
		});

		if (verboseLogsEnabled()) {
			console.log(
				`📦 Consolidated ${Object.keys(consolidatedExports).length} total exports from ${files.length} files`
			);
		}
	} finally {
		isLoading = false;
	}

	return consolidatedExports;
}

// Create a proxy object that loads terms on first access
module.exports = new Proxy(
	{},
	{
		get(target, prop) {
			const terms = loadTermsLazy();
			return terms[prop];
		},
		ownKeys(target) {
			const terms = loadTermsLazy();
			return Object.keys(terms);
		},
		has(target, prop) {
			const terms = loadTermsLazy();
			return prop in terms;
		},
		getOwnPropertyDescriptor(target, prop) {
			const terms = loadTermsLazy();
			return Object.getOwnPropertyDescriptor(terms, prop);
		}
	}
);
