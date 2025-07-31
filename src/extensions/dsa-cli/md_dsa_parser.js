const fs = require('fs');
const path = require('path');
const { ProblemMetadata } = require('./structures.js');
const { getDirAbsoluteUri } = require('./functions.js');

/**
 * Parses a markdown file containing DSA problems
 * @param {string} filePath - Path to the markdown file
 * @returns {Object[]} Array of parsed DSA problems
 */
function parseMarkdownProblems(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const problems = [];
    
    // Split content by problem sections (# headers)
    const sections = content.split(/^# /m).filter(section => section.trim());
    
    for (const section of sections) {
        const lines = section.split('\n');
        const title = lines[0].trim();
        
        if (!title) continue;
        
        const problem = {
            title: title,
            tags: [],
            difficulty: 'Easy',
            description: '',
            theory: '',
            pseudocode: '',
            solution: {}
        };
        
        let currentSection = '';
        let currentCode = '';
        let currentLanguage = '';
        let inCodeBlock = false;
        
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            
            // Parse metadata lines
            if (line.startsWith('**Tags:**')) {
                problem.tags = line.replace('**Tags:**', '').trim()
                    .split(',').map(tag => tag.trim()).filter(tag => tag);
                continue;
            }
            
            if (line.startsWith('**Difficulty:**')) {
                problem.difficulty = line.replace('**Difficulty:**', '').trim();
                continue;
            }
            
            // Parse section headers
            if (line.startsWith('## ')) {
                currentSection = line.replace('##', '').trim().toLowerCase();
                continue;
            }
            
            if (line.startsWith('### ')) {
                if (currentSection === 'solution') {
                    currentLanguage = line.replace('###', '').trim().toLowerCase();
                }
                continue;
            }
            
            // Handle code blocks
            if (line.startsWith('```')) {
                if (inCodeBlock) {
                    // End of code block
                    if (currentSection === 'pseudocode') {
                        problem.pseudocode = currentCode.trim();
                    } else if (currentSection === 'solution' && currentLanguage) {
                        problem.solution[currentLanguage] = currentCode.trim();
                    }
                    currentCode = '';
                    inCodeBlock = false;
                } else {
                    // Start of code block
                    inCodeBlock = true;
                }
                continue;
            }
            
            if (inCodeBlock) {
                currentCode += line + '\n';
                continue;
            }
            
            // Regular content
            if (currentSection === 'description') {
                problem.description += line + '\n';
            } else if (currentSection === 'theory') {
                problem.theory += line + '\n';
            }
        }
        
        // Clean up trailing whitespace
        problem.description = problem.description.trim();
        problem.theory = problem.theory.trim();
        
        problems.push(problem);
    }
    
    return problems;
}

/**
 * Parses all markdown files in a folder
 * @param {string} folderPath - Path to the folder
 * @returns {Object[]} Array of parsed DSA problems
 */
function parseMarkdownProblemsFromFolder(folderPath) {
    const problems = [];
    
    if (!fs.existsSync(folderPath)) {
        console.warn(`Folder ${folderPath} does not exist`);
        return problems;
    }
    
    const files = fs.readdirSync(folderPath);
    
    for (const file of files) {
        const filePath = path.join(folderPath, file);
        
        if (fs.statSync(filePath).isFile() && file.endsWith('.md')) {
            const fileProblems = parseMarkdownProblems(filePath);
            problems.push(...fileProblems);
        }
    }
    
    return problems;
}

/**
 * Converts parsed problems to ProblemMetadata format for DSA-CLI
 * @param {Object[]} problems - Array of parsed problems
 * @param {string} moduleTitle - Title of the module
 * @returns {ProblemMetadata[]} Array of ProblemMetadata objects
 */
function convertToProblemsMetadata(problems, moduleTitle = 'External DSA Problems') {
    return problems.map(problem => {
        const slug = problem.title.toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+/g, '-');
        
        return new ProblemMetadata(slug, {
            name: problem.title,
            description: problem.description,
            difficulty: problem.difficulty.toUpperCase(),
            tags: problem.tags,
            hints: []
        });
    });
}

/**
 * Parses problems from external DSA modules similar to terms modules
 * @param {Object[]} dsaModules - Array of DSA module configurations
 * @param {Object} options - Options for parsing
 * @returns {Object} Dictionary of module problems
 */
function parseMarkdownProblemsFromModules(dsaModules, { useCacheIfNotFound = true } = {}) {
    const decks = {};
    
    for (const module of dsaModules) {
        const problems = [];
        const moduleCacheDir = getDirAbsoluteUri(`user_data/dsa_modules/${module.module_path}/cache_md`, '../../../');
        const moduleCacheJson = getDirAbsoluteUri(`user_data/dsa_modules/${module.module_path}/cache.json`, '../../../');
        
        const shouldCacheContent = module.CACHE_CONTENT !== false;
        
        // Ensure cache directory exists
        if (shouldCacheContent && !fs.existsSync(moduleCacheDir)) {
            fs.mkdirSync(moduleCacheDir, { recursive: true });
        }
        
        // Parse problems from CONTENT_FOLDERS
        if (module.CONTENT_FOLDERS) {
            for (const folder of module.CONTENT_FOLDERS) {
                const folderPath = getDirAbsoluteUri(`user_data/dsa_modules/${module.module_path}/${folder}`, '../../../');
                const parsedProblems = parseMarkdownProblemsFromFolder(folderPath);
                const problemMetadata = convertToProblemsMetadata(parsedProblems, module.ABOUT.title);
                problems.push(...problemMetadata);
            }
        }
        
        // Parse problems from EXTERNAL_CONTENT_FOLDERS
        if (module.EXTERNAL_CONTENT_FOLDERS) {
            let folderExists = false;
            
            for (const folder of module.EXTERNAL_CONTENT_FOLDERS) {
                console.log(`External DSA folder: ${folder}`);
                
                if (!fs.existsSync(folder)) {
                    console.warn(`External DSA folder ${folder} does not exist. Attempting to use cache.`);
                    continue;
                } else {
                    folderExists = true;
                }
                
                const parsedProblems = parseMarkdownProblemsFromFolder(folder);
                const problemMetadata = convertToProblemsMetadata(parsedProblems, module.ABOUT.title);
                problems.push(...problemMetadata);
                
                // Cache the markdown files
                if (shouldCacheContent) {
                    const files = fs.readdirSync(folder);
                    for (const file of files) {
                        const filePath = path.join(folder, file);
                        if (fs.statSync(filePath).isFile() && file.endsWith('.md')) {
                            const cachedFilePath = path.join(moduleCacheDir, path.basename(filePath));
                            if (useCacheIfNotFound && !fs.existsSync(cachedFilePath)) {
                                fs.writeFileSync(cachedFilePath, fs.readFileSync(filePath, 'utf-8'));
                                console.log(`Caching DSA markdown file: ${cachedFilePath}`);
                            }
                        }
                    }
                }
            }
            
            // Handle caching for external folders
            if (useCacheIfNotFound && module.EXTERNAL_CONTENT_FOLDERS && module.EXTERNAL_CONTENT_FOLDERS.length > 0) {
                const targetCacheLocation = moduleCacheJson;
                
                if (!folderExists) {
                    console.warn(`No external DSA folders found for module ${module.ABOUT.title}. Using cache.`);
                    
                    if (!fs.existsSync(targetCacheLocation)) {
                        console.warn(`Cache file ${targetCacheLocation} does not exist. Skipping.`);
                        continue;
                    }
                    
                    console.warn(`Loading DSA problems from cache file: ${targetCacheLocation}`);
                    const cacheFileContent = fs.readFileSync(targetCacheLocation, 'utf-8');
                    const cachedProblems = JSON.parse(cacheFileContent);
                    
                    for (const problemData of cachedProblems) {
                        const problem = new ProblemMetadata(problemData.slug, {
                            name: problemData.name,
                            description: problemData.description,
                            difficulty: problemData.difficulty,
                            tags: problemData.tags,
                            hints: problemData.hints || []
                        });
                        problems.push(problem);
                    }
                } else {
                    // Save problems to cache
                    const cachedProblems = problems.map(problem => ({
                        slug: problem.slug,
                        name: problem.name,
                        description: problem.description,
                        difficulty: problem.difficulty,
                        tags: problem.tags,
                        hints: problem.hints
                    }));
                    
                    fs.writeFileSync(targetCacheLocation, JSON.stringify(cachedProblems, null, 2));
                }
            }
        }
        
        // Parse problems from CONTENT_FILES
        if (module.CONTENT_FILES) {
            for (const file of module.CONTENT_FILES) {
                const filePath = getDirAbsoluteUri(`user_data/dsa_modules/${module.module_path}/${file}`, '../../../');
                const parsedProblems = parseMarkdownProblems(filePath);
                const problemMetadata = convertToProblemsMetadata(parsedProblems, module.ABOUT.title);
                problems.push(...problemMetadata);
            }
        }
        
        if (module) {
            decks[module.module_path] = {
                title: module.ABOUT.title,
                skill_category: module.ABOUT.skill_category,
                items: problems
            };
        }
    }
    
    return decks;
}

/**
 * Retrieves DSA modules from the user_data directory
 * @returns {Object} Dictionary of DSA modules
 */
function retrieve_dsa_modules() {
    const dsaModules = {};
    const dsaModulesPath = getDirAbsoluteUri('user_data/dsa_modules', '../../../');
    
    if (!fs.existsSync(dsaModulesPath)) {
        console.warn(`DSA modules path ${dsaModulesPath} does not exist`);
        return dsaModules;
    }
    
    const moduleFolders = fs.readdirSync(dsaModulesPath)
        .filter(file => fs.statSync(`${dsaModulesPath}/${file}`).isDirectory());
    
    for (const folder of moduleFolders) {
        const modulePath = `${dsaModulesPath}/${folder}/index.js`;
        if (fs.existsSync(modulePath)) {
            // Clear require cache to ensure fresh module loading
            delete require.cache[require.resolve(modulePath)];
            const moduleExports = require(modulePath);
            dsaModules[moduleExports.module_path] = moduleExports;
        }
    }
    
    return dsaModules;
}

/**
 * Retrieves all DSA problems as organized decks
 * @returns {Object} Dictionary of DSA problem decks
 */
function retrieve_dsa_problems_as_decks() {
    const dsaModules = retrieve_dsa_modules();
    return parseMarkdownProblemsFromModules(Object.values(dsaModules));
}

module.exports = {
    parseMarkdownProblems,
    parseMarkdownProblemsFromFolder,
    parseMarkdownProblemsFromModules,
    convertToProblemsMetadata,
    retrieve_dsa_modules,
    retrieve_dsa_problems_as_decks
};