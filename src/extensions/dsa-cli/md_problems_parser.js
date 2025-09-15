const fs = require('fs');
const path = require('path');
const { Problem, ProblemStorage } = require('./structures');
const { getDirAbsoluteUri } = require('./utils_functions');

function parseMarkdownProblems(filePath) {
	const lines = fs.readFileSync(filePath, 'utf-8').split(/\r?\n/);
	const problems = [];

	let current = null;
	let buffer = [];
	let inCodeBlock = false;
	let codeLang = '';
	let currentField = '';

	const flushBuffer = () => {
		if (!current || !currentField) return;

		// Join lines and preserve formatting, but only trim excessive whitespace
		let content = buffer.join('\n');
		
		// Remove leading/trailing empty lines but preserve internal structure
		content = content.replace(/^\n+/, '').replace(/\n+$/, '');
		
		if (currentField === 'Solution') {
			if (!current.solution) current.solution = {};
			current.solution[codeLang.toLowerCase()] = content;
		} else {
			current[currentField.toLowerCase()] = content;
		}
		buffer = [];
		codeLang = '';
	};

	for (let line of lines) {
		const trimmed = line.trim();

		if (trimmed.startsWith('# ')) {
			if (current) {
				flushBuffer();
				problems.push(current);
			}
			current = {
				title: trimmed.slice(2).trim(),
				tags: [],
				difficulty: '',
				description: '',
				theory: '',
				pseudocode: '',
				solution: {}
			};
			currentField = '';
			continue;
		}

		if (trimmed.startsWith('**Tags:**')) {
			current.tags = trimmed
				.slice(9)
				.split(',')
				.map(tag => tag.trim());
			continue;
		}

		if (trimmed.startsWith('**Difficulty:**')) {
			current.difficulty = trimmed.slice(15).trim();
			continue;
		}

		const headingMatch = trimmed.match(/^##+\s*(.*)/);
		if (headingMatch) {
			flushBuffer();
			currentField = headingMatch[1];
			continue;
		}

		const codeBlockStart = trimmed.match(/^```(\w*)/);
		if (codeBlockStart) {
			inCodeBlock = true;
			codeLang = codeBlockStart[1] || 'text';
			continue;
		}

		if (trimmed === '```') {
			inCodeBlock = false;
			flushBuffer();
			continue;
		}

		if (currentField) {
			buffer.push(line);
		}
	}

	if (current) {
		flushBuffer();
		problems.push(current);
	}

	return problems;
}

function parseMarkdownProblemsFromFolder(folderPath) {
	const files = fs.readdirSync(folderPath);
	const problems = [];

	for (const file of files) {
		const filePath = path.join(folderPath, file);
		if (fs.statSync(filePath).isFile() && file.endsWith('.md')) {
			const parsed = parseMarkdownProblems(filePath);
			problems.push(...parsed);
		}
	}

	return problems;
}

function parseMarkdownProblemsFromModules(
	modules,
	{ useCacheIfNotFound = true } = {}
) {
	const decks = {};

	for (const module of modules) {
		const problems = [];
		const moduleCacheDir = getDirAbsoluteUri(
			`user_data/terms_modules/${module.module_path}/cache_md`
		);
		const moduleCacheJson = getDirAbsoluteUri(
			`user_data/terms_modules/${module.module_path}/cache_problems.json`
		);

		const shouldCacheContent = module.CACHE_CONTENT !== false;
		const useFileAsModule = module.USE_FILE_AS_MODULE === true;

		if (shouldCacheContent && !fs.existsSync(moduleCacheDir)) {
			fs.mkdirSync(moduleCacheDir, { recursive: true });
		}

		if (module.CONTENT_FOLDERS) {
			for (const folder of module.CONTENT_FOLDERS) {
				const folderPath = getDirAbsoluteUri(
					`user_data/terms_modules/${module.module_path}/${folder}`
				);
				
				if (useFileAsModule) {
					const files = fs.readdirSync(folderPath);
					for (const file of files) {
						const filePath = path.join(folderPath, file);
						if (fs.statSync(filePath).isFile() && file.endsWith('.md')) {
							const fileProblems = parseMarkdownProblems(filePath);
							const fileName = path.basename(file, '.md');
							const fileModulePath = `${module.module_path}-${fileName}`;
							
							decks[fileModulePath] = new ProblemStorage(
								fileProblems.map(
									(p, i) =>
										new Problem({
											...p,
											id: `${i + 1}-${p.title}`,
											module_name: `${module.ABOUT.title} - ${fileName}`,
											category: module.ABOUT.skill_category
										})
								),
								module.ABOUT.skill_category
							);
						}
					}
				} else {
					const parsedProblems = parseMarkdownProblemsFromFolder(folderPath);
					problems.push(...parsedProblems);
				}
			}
		}

		if (module.EXTERNAL_CONTENT_FOLDERS) {
			let folderExists = false;
			for (const folder of module.EXTERNAL_CONTENT_FOLDERS) {
				if (!fs.existsSync(folder)) {
					console.warn(
						`External folder ${folder} does not exist. Attempting to use cache.`
					);
					continue;
				}
				folderExists = true;

				if (useFileAsModule) {
					const files = fs.readdirSync(folder);
					for (const file of files) {
						const filePath = path.join(folder, file);
						if (fs.statSync(filePath).isFile() && file.endsWith('.md')) {
							const fileProblems = parseMarkdownProblems(filePath);
							const fileName = path.basename(file, '.md');
							const fileModulePath = `${module.module_path}-${fileName}`;
							
							decks[fileModulePath] = new ProblemStorage(
								fileProblems.map(
									(p, i) =>
										new Problem({
											...p,
											id: `${i + 1}-${p.title}`,
											module_name: `${module.ABOUT.title} - ${fileName}`,
											category: module.ABOUT.skill_category
										})
								),
								module.ABOUT.skill_category
							);

							if (shouldCacheContent) {
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
									);
									console.log(
										`Caching markdown file: ${cachedFilePath}`
									);
								}
							}
						}
					}
				} else {
					const parsedProblems = parseMarkdownProblemsFromFolder(folder);
					problems.push(...parsedProblems);

					if (shouldCacheContent) {
						const files = fs.readdirSync(folder);
						for (const file of files) {
							const filePath = path.join(folder, file);
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

			if (useCacheIfNotFound && !folderExists && !useFileAsModule) {
				if (!fs.existsSync(moduleCacheJson)) {
					console.warn(
						`No problems found and cache file missing: ${moduleCacheJson}`
					);
					continue;
				}

				console.warn(
					`Loading problems from cache file: ${moduleCacheJson}`
				);
				const cachedData = JSON.parse(
					fs.readFileSync(moduleCacheJson, 'utf-8')
				);
				problems.push(...cachedData);
			} else if (shouldCacheContent && !useFileAsModule) {
				fs.writeFileSync(
					moduleCacheJson,
					JSON.stringify(problems, null, 2)
				);
			}
		}

		if (module.CONTENT_FILES) {
			for (const file of module.CONTENT_FILES) {
				const filePath = getDirAbsoluteUri(
					`user_data/terms_modules/${module.module_path}/${file}`
				);
				
				if (useFileAsModule) {
					const fileProblems = parseMarkdownProblems(filePath);
					const fileName = path.basename(file, '.md');
					const fileModulePath = `${module.module_path}-${fileName}`;
					
					decks[fileModulePath] = new ProblemStorage(
						fileProblems.map(
							(p, i) =>
								new Problem({
									...p,
									id: `${i + 1}-${p.title}`,
									module_name: `${module.ABOUT.title} - ${fileName}`,
									category: module.ABOUT.skill_category
								})
						),
						module.ABOUT.skill_category
					);
				} else {
					const parsedProblems = parseMarkdownProblemsFromFolder(
						path.dirname(filePath)
					);
					problems.push(...parsedProblems);
				}
			}
		}

		if (module && !useFileAsModule) {
			decks[module.module_path] = new ProblemStorage(
				problems.map(
					(p, i) =>
						new Problem({
							...p,
							id: `${i + 1}-${p.title}`,
							module_name: module.ABOUT.title,
							category: module.ABOUT.skill_category
						})
				),
				module.ABOUT.skill_category
			);
		}
	}

	return decks;
}

function retrieve_problem_modules() {
	const problemModules = {};
	const modulesPath = getDirAbsoluteUri('user_data/terms_modules');
	const folders = fs
		.readdirSync(modulesPath)
		.filter(f => fs.statSync(`${modulesPath}/${f}`).isDirectory());

	for (const folder of folders) {
		const indexPath = `${modulesPath}/${folder}/index.js`;
		if (fs.existsSync(indexPath)) {
			const mod = require(indexPath);
			problemModules[mod.module_path] = mod;
		}
	}

	return problemModules;
}

function retrieve_problems_as_decks() {
	const modules = retrieve_problem_modules();
	return parseMarkdownProblemsFromModules(Object.values(modules));
}

module.exports = {
	parseMarkdownProblems,
	parseMarkdownProblemsFromFolder,
	parseMarkdownProblemsFromModules,
	retrieve_problem_modules,
	retrieve_problems_as_decks
};
