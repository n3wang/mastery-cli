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

		if(line=="---"){
			// clear all variables
			last_connected_paragraph = '';
			last_line = '';
			last_connected_paragraph_line = 0;
			has_header = false;
			single_line_last_obtained_description = '';
			count_of_blank_lines = 0;
		}

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
				if (isMultiLine && (answerLine.trim() === 'x??' || answerLine.trim() === '---')) {
					i++;
					break;
				}
				if (!isMultiLine && answerLine.trim() === '') break;
				
				// remove x?? and ??x
				if(isMultiLine){
					// remove x?? and ??x
					answerLine = answerLine.replace(/^\?x\?|\?x\?$/g, '').trim();
				}
				if(answerLine.trim() === '') {
					if (isMultiLine) {
						answerLines.push('\n\n');
					}
				}
				answerLines.push(answerLine);

				
				i++;
			}
			
			single_line_last_obtained_description = '';
			last_connected_paragraph = '';
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

	// if (currentEntry && currentEntry.answer !== '' && currentEntry.prompt !== '') {
	// 	result.entries.push(currentEntry);
	// }

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

function parseMarkdownCardsFromFolderRecursive(
	folderPath,
	{ module_name = '', category = '', deckName = '' } = {}
) {
	const files = fs.readdirSync(folderPath);
	const terms = [];
	const nestedDecks = [];

	if (!deckName) {
		deckName = path.basename(folderPath);
	}

	for (const file of files) {
		const filePath = path.join(folderPath, file);
		const stat = fs.statSync(filePath);

		if (stat.isDirectory()) {
			const subDeck = parseMarkdownCardsFromFolderRecursive(filePath, {
				module_name: module_name,
				category: category,
				deckName: file
			});
			if (subDeck) {
				nestedDecks.push(subDeck);
			}
		} else if (stat.isFile() && file.endsWith('.md')) {
			const parsedTerms = parseMarkdownIntoDeck(filePath, {
				module_name: module_name,
				category: category
			});
			terms.push(...parsedTerms);
		}
	}

	if (terms.length === 0 && nestedDecks.length === 0) {
		return null;
	}

	const deck = new TermStorage(
		terms,
		deckName,
		{
			decks: nestedDecks,
			is_active: false,
			module_name: module_name
		}
	);

	return deck;
}


/**
 * Recursively cache markdown files while preserving folder structure
 */
function cacheMarkdownFilesRecursively(sourceFolderPath, targetCachePath) {
	if (!fs.existsSync(targetCachePath)) {
		fs.mkdirSync(targetCachePath, { recursive: true });
	}

	const files = fs.readdirSync(sourceFolderPath);

	for (const file of files) {
		const sourceFilePath = path.join(sourceFolderPath, file);
		const targetFilePath = path.join(targetCachePath, file);
		const stat = fs.statSync(sourceFilePath);

		if (stat.isDirectory()) {
			// Recursively cache subdirectories
			cacheMarkdownFilesRecursively(sourceFilePath, targetFilePath);
		} else if (stat.isFile() && file.endsWith('.md')) {
			// Cache markdown file
			if (!fs.existsSync(targetFilePath)) {
				fs.writeFileSync(
					targetFilePath,
					fs.readFileSync(sourceFilePath, 'utf-8')
				);
				console.log(`Caching markdown file: ${targetFilePath}`);
			}
		}
	}
}

function parseFolderWithOption(folderPath, useRecursive, module_name, category) {
	if (useRecursive) {
		const subDeck = parseMarkdownCardsFromFolderRecursive(folderPath, {
			module_name: module_name,
			category: category,
			deckName: path.basename(folderPath)
		});
		return { nestedDecks: subDeck ? [subDeck] : [], terms: [] };
	} else {
		const parsedTerms = parseMarkdownCardsFromFolder(folderPath, {
			module_name: module_name,
			category: category
		});
		return { nestedDecks: [], terms: parsedTerms };
	}
}

function parseMarkdownCardsFromTermsModules(
	termsModules,
	{ useCacheIfNotFound = true, useRecursive = true } = {}
) {
	const decks = {};
	for (const module of termsModules) {
		const terms = [];
		const nestedDecks = [];
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
				const result = parseFolderWithOption(
					folderPath,
					useRecursive,
					module.ABOUT.title,
					module.ABOUT.skill_category
				);
				terms.push(...result.terms);
				nestedDecks.push(...result.nestedDecks);
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
			const result = parseFolderWithOption(
				folderPath,
				useRecursive,
				module.ABOUT.title,
				module.ABOUT.skill_category
			);
			terms.push(...result.terms);
			nestedDecks.push(...result.nestedDecks);

				// Cache the markdown files with folder structure preservation
				if (shouldCacheContent && useCacheIfNotFound) {
					if (useRecursive) {
						// Recursively cache with folder structure
						cacheMarkdownFilesRecursively(folderPath, moduleCacheDir);
					} else {
						// Flat caching for non-recursive mode
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
								if (!fs.existsSync(cachedFilePath)) {
									fs.writeFileSync(
										cachedFilePath,
										fs.readFileSync(filePath, 'utf-8')
									);
									console.log(
										`Caching markdown file: ${cachedFilePath}`
									);
								}
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

					// Check if cache_md folder exists and has content
					if (fs.existsSync(moduleCacheDir) && fs.readdirSync(moduleCacheDir).length > 0) {
						console.warn(
							`Loading terms from cached markdown files: ${moduleCacheDir}`
						);
						// Parse cached markdown files (preserving nested structure if using recursive mode)
						const result = parseFolderWithOption(
							moduleCacheDir,
							useRecursive,
							module.ABOUT.title,
							module.ABOUT.skill_category
						);
						terms.push(...result.terms);
						nestedDecks.push(...result.nestedDecks);
					} else if (fs.existsSync(targetCacheLocation)) {
						// Fallback to old cache.json format
						console.warn(
							`Loading terms from cache file: ${targetCacheLocation}`
						);
						const cacheFileContent = fs.readFileSync(
							targetCacheLocation,
							'utf-8'
						);
						const cachedTerms = JSON.parse(cacheFileContent);
						for (const termData of cachedTerms) {
							const term = new Term(
								termData.term,
								termData.example || '',
								termData.description || '',
								termData.prompt || '',
								{
									reference_page: termData.reference_page,
									reference_line: termData.reference_line || -1,
									module_name: module.ABOUT.module_name,
									category: module.ABOUT.category
								}
							);
							terms.push(term);
						}
					} else {
						console.warn(
							`No cache found for module ${module.ABOUT.title}. Skipping.`
						);
						continue;
					}
				} else {
					// save the terms to a cache file
					const cacheFilePath = targetCacheLocation;
					const cachedTerms = terms.map(term => ({
						term: term.term,
						example: term.example,
						description: term.description,
						prompt: term.prompt,
						reference_page: term.reference_page,
						reference_line: term.reference_line || -1,
						module_name: term.module_name,
						category: term.category
					}));

					// modify the cache file to include the module name and category
					for (const term of cachedTerms) {
						const cachedFilePath = path.join(
							moduleCacheDir,
							path.basename(term.reference_page)
						);
						term.reference_page = cachedFilePath;
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
			// If using recursive mode and we have no direct terms but exactly one nested deck,
			// flatten the structure to avoid empty wrapper decks
			let finalTerms = terms;
			let finalNestedDecks = nestedDecks;

			if (useRecursive && terms.length === 0 && nestedDecks.length === 1) {
				// Flatten: move the single nested deck's terms and sub-decks up
				const singleDeck = nestedDecks[0];
				finalTerms = singleDeck.terms;
				finalNestedDecks = singleDeck.decks || [];
			}

			decks[module.module_path] = new TermStorage(
				finalTerms,
				module.ABOUT.skill_category,
				{
					module_name: module.ABOUT.title,
					decks: finalNestedDecks,
					is_active: false,
					sort_option: module.SORT_OPTION || 'reversed'
				}
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
	parseMarkdownCardsFromFolderRecursive,
	parseMarkdownCardsFromTermsModules,
	retrieve_terms_modules,
	retrieve_terms_as_decks
};
