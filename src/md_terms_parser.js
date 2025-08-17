const fs = require('fs');
const { Term, DeckMask, TermStorage } = require('./structures.js');
const { getDirAbsoluteUri } = require('./utils_functions.js');

const path = require('path');

function parseMarkdownCards(filePath) {
	const lines = fs.readFileSync(filePath, 'utf-8').split(/\r?\n/);

	const result = {
		title: '',
		entries: []
	};

	let i = 0;
	let currentEntry = null;

	let last_connected_paragraph = '';
	let last_line = '';
	let last_connected_paragraph_line = 0;
	let has_header = false;
	let single_line_last_obtained_description = '';
	let count_of_blank_lines = 0;

	while (i < lines.length) {
		const line = lines[i].trim();
		const originalLine = lines[i]; // Preserve original line for content that needs formatting

		// Title
		if (!result.title && line.startsWith('# ')) {
			result.title = line.slice(2).trim();
			i++;
			continue;
		}

		// New entry
		if (
			line.startsWith('####') ||
			line.startsWith('###') ||
			line.startsWith('##')
		) {
			const header = line.replace(/^#+/, '').trim();
			single_line_last_obtained_description = '';
			
			if (line.startsWith('####')) {
				has_header = true;
			}
			currentEntry = {
				header: header,
				description: '',
				prompt: '',
				answer: '',
				reference_line: i + 1
			};
			i++;
			continue;
		}

		if (line.startsWith(':d') || line.startsWith('?d')) {
			single_line_last_obtained_description = line;
		}

		if (line.startsWith('?x')) {
			// if we encouner this without a new entry, then use the line above as the description
			if (!currentEntry && i > 0) {
				let previousLine = lines[i - 1].trim();
				currentEntry = {
					header: previousLine,
					description: last_connected_paragraph,
					prompt: previousLine,
					answer: '',
					reference_line: i
				};
			}
		}

		// if the line contains :: then => description::answer
		if (line.includes('::')) {
			const parts = line.split('::');
			if (parts.length >= 2) {
				let singleLineEntry = {};
				let term = parts[0].trim();
				let description = parts[0].trim();
				if (single_line_last_obtained_description !== '') {
					description = single_line_last_obtained_description;
				}
				singleLineEntry.header = term;
				singleLineEntry.description = description;
				singleLineEntry.answer = parts[parts.length - 1].trim();
				singleLineEntry.prompt = term;
				singleLineEntry.reference_line = i + 1;
				result.entries.push(singleLineEntry);
			}
		}

		// Prompt line
		if (
			(line.startsWith('?p:') ||
				line.startsWith('p:') ||
				line.startsWith(':p')) &&
			currentEntry
		) {
			currentEntry.prompt = line.replace(/^(\?p:|p:|:p)/, '').trim();
			single_line_last_obtained_description = '';
			i++;
			continue;
		}

		// Answer block ?x or ??x
		if ((line === '?x' || line === '??x') && currentEntry) {
			const isMultiLine = line === '??x';
			let answerLines = [];

			// if there was an anwsert that means that there is another question and a new rntry should be entered.
			if (currentEntry.answer !== '') {
				currentEntry = {
					header: last_line,
					description: last_connected_paragraph,
					prompt: last_line,
					answer: '',
					reference_line: i + 1
				};
			}

			i++;
			while (i < lines.length) {
				let answerLine = lines[i];
				if (isMultiLine && answerLine.trim() === 'x??') {
					i++;
					break;
				}
				if (!isMultiLine && answerLine.trim() === '') break;
				
				if(answerLine.trim() === '') {
					if (isMultiLine) {
						answerLines.push('\n\n');
					}
				}
				answerLines.push(answerLine);
				
				i++;
			}
			
			single_line_last_obtained_description = '';
			currentEntry.answer = answerLines.join('\n');
			result.entries.push(currentEntry);
			currentEntry = null; // Reset to prevent duplicate at end of file
			continue;
		}

		// Description block (multi-line before ?x or ?p or next ####)
		if (
			currentEntry?.answer == '' &&
			currentEntry &&
			!line.startsWith('?') &&
			!line.startsWith('####')
		) {
			if (currentEntry.description !== '')
				currentEntry.description += '\n';
			currentEntry.description += originalLine;
		}

		// if line is empty, finish the connected paragraph
		if ((line === '' && !has_header) || (line === '' && has_header && count_of_blank_lines >= 2)) {
			if (has_header) {
				// if we have a header and only one blank line, we can keep the last connected paragraph
				count_of_blank_lines++;
				last_connected_paragraph += '\n' + originalLine;
			} else {
				last_connected_paragraph = '';
				last_connected_paragraph_line = i;
			}
		} else {
			// if the line is not empty, we can connect it to the last paragraph
			if (last_connected_paragraph !== '') {
				last_connected_paragraph += '\n' + originalLine;
			} else {
				last_connected_paragraph = originalLine;
			}
		}

		i++;
		last_line = line;
	}

	if (currentEntry && currentEntry.answer !== '' && currentEntry.prompt !== '') {
		result.entries.push(currentEntry);
	}

	// clean up.
	for (const entry of result.entries) {
		if (entry.description) {
			entry.description = ":m " + entry.description.replace(/ {1,}/g, ' ');
		}
		if (entry.answer) {
			entry.answer = ":m " + entry.answer.replace(/ {1,}/g, ' ');
		}
	}

	return result;
}

function parseMarkdownIntoDeck(
	filePath,
	{ module_name = 'Markdown Terms Parser', category = '' } = {}
) {
	/**
	 * Return as a list of Term objects
	 */

	const parsedData = parseMarkdownCards(filePath);
	const termsList = [];
	const filename = path.basename(filePath);

	if (category === '') {
		category = module_name;
	}
	let entry_number = 0;
	for (const entry of parsedData.entries) {
		entry_number++;
		const term = new Term(
			`${entry_number} - ${entry.header}`,
			entry.answer || '',
			entry.description || '',
			entry.prompt || '',
			{
				reference_page: filePath,
				reference_line: entry.reference_line || -1,
				module_name: module_name,
				category: filename
					.replace('.md', '')
					.replace(/ /g, '')
					.replace(/[^a-zA-Z]/g, '')
			}
		);
		// console.log("created new terms", term);
		termsList.push(term);
	}

	return termsList;
}

function parseMarkdownCardsFromFolder(
	folderPath,
	{ module_name = '', category = '' } = {}
) {
	const files = fs.readdirSync(folderPath);
	const terms = [];
	for (const file of files) {
		const filePath = `${folderPath}/${file}`;
		if (fs.statSync(filePath).isFile() && file.endsWith('.md')) {
			const parsedTerms = parseMarkdownIntoDeck(filePath, {
				module_name: module_name,
				category: category
			});
			terms.push(...parsedTerms);
		}
	}
	return terms;
}

function parseMarkdownCardsFromTermsModules(
	termsModules,
	{ useCacheIfNotFound = true } = {}
) {
	const decks = {};
	for (const module of termsModules) {
		const terms = [];
		const moduleCacheDir = getDirAbsoluteUri(
			`user_data/terms_modules/${module.module_path}/cache_md`
		); // Cache directory for markdown files
		const moduleCacheJson = getDirAbsoluteUri(
			`user_data/terms_modules/${module.module_path}/cache.json`
		); // Cache file for terms

		const shouldCacheContent = module.CACHE_CONTENT !== false; // Default to true if not explicitly false

		// Ensure cache directory exists
		if (shouldCacheContent && !fs.existsSync(moduleCacheDir)) {
			fs.mkdirSync(moduleCacheDir, { recursive: true });
		}

		if (module.CONTENT_FOLDERS) {
			for (const folder of module.CONTENT_FOLDERS) {
				const folderPath = getDirAbsoluteUri(
					`user_data/terms_modules/${module.module_path}/${folder}`
				);
				const parsedTerms = parseMarkdownCardsFromFolder(folderPath, {
					module_name: module.ABOUT.title,
					category: module.ABOUT.skill_category
				});
				terms.push(...parsedTerms);
			}
		}

		if (module.EXTERNAL_CONTENT_FOLDERS) {
			let folderExists = false;
			for (const folder of module.EXTERNAL_CONTENT_FOLDERS) {
				// for now print the content on that folder

				console.log(`External folder: ${folder}`);

				if (!fs.existsSync(folder)) {
					console.warn(
						`External folder ${folder} does not exist. Attepting to use cache.`
					);
					continue;
				} else {
					// If at least one folder exists, we can set the flag
					folderExists = true;
				}

				const folderPath = folder;
				const parsedTerms = parseMarkdownCardsFromFolder(folderPath, {
					module_name: module.ABOUT.title,
					category: module.ABOUT.skill_category
				});
				terms.push(...parsedTerms);

				// Cache the markdown files
				if (shouldCacheContent) {
					const files = fs.readdirSync(folderPath);
					for (const file of files) {
						const filePath = path.join(folderPath, file);
						if (
							fs.statSync(filePath).isFile() &&
							file.endsWith('.md')
						) {
							const cachedFilePath = path.join(
								moduleCacheDir,
								path.basename(filePath)
							);
							if (
								useCacheIfNotFound &&
								!fs.existsSync(cachedFilePath)
							) {
								fs.writeFileSync(
									cachedFilePath,
									fs.readFileSync(filePath, 'utf-8')
								); // Cache the markdown file
								console.log(
									`Caching markdown file: ${cachedFilePath}`
								);
							}
						}
					}
				}
			}

			if (useCacheIfNotFound) {
				let targetCacheLocation = getDirAbsoluteUri(
					`user_data/terms_modules/${module.module_path}/cache.json`
				);
				if (!folderExists) {
					console.warn(
						`No external folders found for module ${module.ABOUT.title}. Using cache.`
					);

					if (!fs.existsSync(targetCacheLocation)) {
						console.warn(
							`Cache file ${targetCacheLocation} does not exist. Skipping.`
						);
						continue;
					}
					console.warn(
						`Loading terms from cache file: ${targetCacheLocation}`
					);
					// Load the terms from the cache file
					const cacheFileContent = fs.readFileSync(
						targetCacheLocation,
						'utf-8'
					);
					const cachedTerms = JSON.parse(cacheFileContent);
					for (const termData of cachedTerms) {
						// const cachedFilePath = path.join(moduleCacheDir, path.basename(termData.reference_page)); // Construct the cached file path
						// console.log(`Creating term from cached file: ${cachedFilePath}`);
						const term = new Term(
							termData.term,
							termData.example || '',
							termData.description || '',
							termData.prompt || '',
							{
								reference_page: termData.reference_page, // Use the cached file path
								reference_line: termData.reference_line || -1,
								module_name: module.ABOUT.module_name,
								category: module.ABOUT.category
							}
						);
						terms.push(term);
					}
				} else {
					// save the terms to a cache file
					const cacheFilePath = targetCacheLocation;
					// v
					// remove where more than 2 spaces convert into 1 spaces
					// answerLine = answerLine.replace(/ {2,}/g, ' ');
					const cachedTerms = terms.map(term => ({
						term: term.term,
						example: term.example,
						description: term.description,
						prompt: term.prompt,
						reference_page: term.reference_page, // Use the cached file path
						reference_line: term.reference_line || -1,
						module_name: term.module_name,
						category: term.category
					}));

					// modify the cache file to include the module name and category
					for (const term of cachedTerms) {
						const cachedFilePath = path.join(
							moduleCacheDir,
							path.basename(term.reference_page)
						); // Construct the cached file path
						term.reference_page = cachedFilePath; // Update the reference page to the cached file path
					}
					fs.writeFileSync(
						cacheFilePath,
						JSON.stringify(cachedTerms, null, 2)
					);
				}
			}
		}

		if (module.CONTENT_FILES) {
			for (const file of module.CONTENT_FILES) {
				const filePath = getDirAbsoluteUri(
					`user_data/terms_modules/${module.module_path}/${file}`
				);

				// Check if the markdown file is cached
				// const cachedFilePath = path.join(moduleCacheDir, path.basename(filePath));
				let parsedTerms;
				parsedTerms = parseMarkdownIntoDeck(filePath, {
					module_name: module.ABOUT.title,
					category: module.ABOUT.skill_category
				});
				terms.push(...parsedTerms);
			}
		}
		if (module) {
			decks[module.module_path] = new TermStorage(
				terms,
				module.ABOUT.skill_category
			);
		}
	}
	return decks;
}

function retrieve_terms_modules() {
	const termsModules = {};
	const termsModulesPath = getDirAbsoluteUri('user_data/terms_modules');
	const moduleFolders = fs
		.readdirSync(termsModulesPath)
		.filter(file =>
			fs.statSync(`${termsModulesPath}/${file}`).isDirectory()
		);

	for (const folder of moduleFolders) {
		const modulePath = `${termsModulesPath}/${folder}/index.js`;
		if (fs.existsSync(modulePath)) {
			const moduleExports = require(modulePath);
			termsModules[moduleExports.module_path] = moduleExports;
		}
	}
	return termsModules;
}

function retrieve_terms_as_decks() {
	const termsModules = retrieve_terms_modules();
	return parseMarkdownCardsFromTermsModules(Object.values(termsModules));
}

module.exports = {
	parseMarkdownCards,
	parseMarkdownIntoDeck,
	parseMarkdownCardsFromFolder,
	parseMarkdownCardsFromTermsModules,
	retrieve_terms_modules,
	retrieve_terms_as_decks
};
