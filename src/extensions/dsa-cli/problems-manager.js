const fs = require('fs');
const path = require('path');
const clipboard = require('copy-paste')
const { TEST_DICTIONARY } = require('./tests');
const { ProblemMetadata } = require('./structures');
const { getPromptDict } = require('./prompt');
const constants = require('./constants');
const { cloze_problems_list } = require('./cloze');

const { getDirAbsoluteUri, openEditorPlatformAgnostic, get_random } = require('./functions');
const { retrieve_dsa_problems_as_decks } = require('./md_dsa_parser');
const { externalProblemsLoader } = require('./external-problems-loader');




/**
 * @class ProblemsManager - Management of the problems
 * 
 * @param {string[]} skip_problems - The list of problems to skip
 */
class ProblemsManager {
    constructor({ skip_problems = [] } = {}) {
        /**
         *  * @property {dict<ProblemMetadata>} problems - The dictionary of problems
            * @property {string[]} skip_problems - The list of problems to skip
            * @property {string} temp_problem_filepath - The path of the temporary problem file
            * @property {string} absolute_problem_file_path - The absolute path of the temporary problem file
            * @property {string} solution_filepath - The path of the solution file
            * @property {string} markdown_filepath - The path of the markdown file
            * @property {string} base_code_filepath - The path of the base code file
            * @property {string} tests_filepath - The path of the tests file
            * @property {string} cloze_problem_base_filepath - The path of the cloze problem base file
         */
        this.problems = {};
        this.skip_problems = skip_problems;
        this.temp_problem_filepath = './user_files/temp_problem';
        this.temp_solution_filepath = './user_files/temp_solution';
        this.absolute_problem_file_path = getDirAbsoluteUri(this.temp_problem_filepath, "./");
        this.solution_filepath = './solutions/';
        this.markdown_filepath = './prompt/';
        this.base_code_filepath = './base_code/';
        this.tests_filepath = './tests/';
        this.cloze_problem_base_filepath = './cloze/base_cloze/';
    }


    get problemSlugs() {
        return Object.keys(this.problems);
    }

    get clozeProblemSlugs() {
        return cloze_problems_list.map(cloze_problem => cloze_problem.file_path); //Useful as there is an algorithm that checks this slugs in order to detect priority
    }

    /**
     * 
     * @param {string} problemSlug Slug of the problem where you want to get the metadata from.
     * @returns 
     */
    getProblem(problemSlug) {
        return this.problems[problemSlug];
    }

    doesProblemHasCloze(problemSlug) {
        /**
         * List format:
         * [
                {
                    filepath: "simple-sum-c1.js",
                    difficulty: 1, // 1 - 5 
                    problem_slug: "simple-sum"
                },
            ]
         */
        return cloze_problems_list.some(cloze_problem => cloze_problem.problem_slug == problemSlug);
    }

    /**
     * 
     * @param {string} problemSlug Gets the cloze problems for a given problem slug.
     * @returns {List<{filepath, difficulty, problem_slug}>} List of cloze problems for a given problem slug.
     */
    getProblemClozes(problemSlug) {

        return cloze_problems_list.filter(cloze_problem => cloze_problem.problem_slug == problemSlug);
    }

    /**
     * Gets a single random cloze problem for a given problem slug.
     * @param {string} problemSlug Gets a random cloze problem for a given problem slug.
     * @returns {<{filepath, difficulty, problem_slug}>} A random cloze problem for a given problem slug.
     */
    getRandomProblemCloze(problemSlug) {
        if (cloze_problems.length == 0) {
            console.log("No cloze problems found for this problem");
            return
        }
        const cloze_problems = this.getProblemClozes(problemSlug);
        return get_random(cloze_problems);
    }

    /**
     * 
     * @returns {ProblemMetadata[]} Array of all the problems in the manager.
     */
    getProblems() {
        return Object.values(this.problems);
    }

    getProblemsByCategory(category) {

        const fiteredProblemsByCategory = Object.values(this.problems).filter(problem => problem.tags.includes(category));
        return fiteredProblemsByCategory;
    }

    getProblemKeysByCategory(category) {
        return Object.keys(this.problems).filter(problem => this.problems[problem].tags.includes(category));
    }


    getTagsForProblem(problemSlug) {

        return this.problems[problemSlug]?.tags ?? [];
    }

    /**
     * Adds problem into the dictionary of problems.
     * @param {ProblemMetadata} problemMetadata Object containing the information aboutthe problem.
     */
    addProblem(problemMetadata) {
        this.problems[problemMetadata.slug] = problemMetadata;
    }


    /**
     * Populates the problems manager with the problems from the TEST_DICTIONARY.
     */
    async autoPopulateUsingTestDictionary({ skip_non_markdown = false } = {}) {

        const classifyDifficulty = (tags) => {
            if (tags == undefined || tags == null || tags?.length <= 0) return "unknown";
            if (tags.includes("easy")) return constants.difficulty.easy;
            if (tags.includes("medium")) return constants.difficulty.medium;
            if (tags.includes("mid")) return constants.difficulty.medium;
            if (tags.includes("hard")) return constants.difficulty.hard;
        }

        const promblem_prompts = await getPromptDict(); //Gets all because no slug was passed in.
        // console.log("promblem_prompts", promblem_prompts)
        for (let problem of Object.keys(TEST_DICTIONARY)) {
            // console.log("Searching if", problem);
            const problem_prompt = promblem_prompts[problem];
            if (problem_prompt == undefined || problem_prompt == null) {
                if (skip_non_markdown) continue;

                this.addProblem(new ProblemMetadata(problem));
                continue;
            };
            // console.log("promblem_prompt", promblem_prompt)


            this.addProblem(new ProblemMetadata(problem, {
                tags: problem_prompt.tags, difficulty: classifyDifficulty(problem_prompt.tags),
                name: problem_prompt.title, description: problem_prompt.description, link: problem_prompt.link,
                hints: problem_prompt.hints ?? []
            }));

        }
        // console.log("this.problems", this.problems)
    }

    /**
     * Populates the problems manager with problems from external DSA modules.
     */
    async autoPopulateUsingDSAModules({ skip_non_markdown = false } = {}) {
        const dsaDecks = retrieve_dsa_problems_as_decks();
        
        for (const [moduleKey, deckData] of Object.entries(dsaDecks)) {
            console.log(`Loading DSA problems from module: ${deckData.title}`);
            
            for (const problem of deckData.items) {
                this.addProblem(problem);
            }
        }
        
        console.log(`Loaded ${Object.keys(this.problems).length} DSA problems from external modules`);
    }

    /**
     * Populates the problems manager with problems from external folders configured in temp_settings.json
     */
    async autoPopulateUsingExternalFolders({ skip_if_disabled = true } = {}) {
        if (skip_if_disabled && !externalProblemsLoader.isAutoLoadEnabled()) {
            console.log('External problems auto-loading is disabled in temp_settings.json');
            return;
        }

        const externalProblems = externalProblemsLoader.loadExternalProblems();
        
        if (externalProblems.length === 0) {
            console.log('No external problems found to load');
            return;
        }

        console.log(`Loading ${externalProblems.length} problems from external folders...`);
        
        for (const problem of externalProblems) {
            this.addProblem(problem);
        }
        
        console.log(`Loaded ${externalProblems.length} problems from external folders`);
    }

    /**
     * Populates the problems manager with all available problems (DSA modules + external folders)
     */
    async autoPopulateAllSources({ skip_non_markdown = false } = {}) {
        // Load from DSA modules first
        await this.autoPopulateUsingDSAModules({ skip_non_markdown });
        
        // Then load from external folders
        await this.autoPopulateUsingExternalFolders();
        
        // Finally load from test dictionary if needed
        await this.autoPopulateUsingTestDictionary({ skip_non_markdown });
        
        console.log(`Total problems loaded: ${Object.keys(this.problems).length}`);
    }

    /**
     * Generates a template for external problems that don't have base code files
     * @param {ProblemMetadata} problemMetadata - The external problem metadata
     * @param {string} targetFilePath - The path where the template should be written
     * @returns {boolean} Success status
     */
    generateExternalProblemTemplate(problemMetadata, targetFilePath) {
        try {
            // Load the external problem data from the markdown source
            const { parseMarkdownProblemsFromFolder } = require('./md_dsa_parser');
            const path = require('path');
            
            let problemData = null;
            
            // Find the problem data from the source folder
            if (problemMetadata.source_folder && fs.existsSync(problemMetadata.source_folder)) {
                const problems = parseMarkdownProblemsFromFolder(problemMetadata.source_folder);
                problemData = problems.find(p => p.title.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-') === problemMetadata.slug);
            }
            
            let templateContent = '';
            
            if (problemData) {
                // Generate rich template with problem data
                templateContent = `# ${problemData.title}

**Difficulty:** ${problemData.difficulty}  
**Tags:** ${problemData.tags.join(', ')}  
**Source:** External Problem

## Description
${problemData.description}

${problemData.theory ? `## Theory\n${problemData.theory}\n` : ''}

${problemData.pseudocode ? `## Pseudocode\n\`\`\`\n${problemData.pseudocode}\n\`\`\`\n` : ''}

## Solutions

${problemData.solution.javascript ? `### JavaScript\n\`\`\`javascript\n${problemData.solution.javascript}\n\`\`\`\n` : ''}

${problemData.solution.python ? `### Python\n\`\`\`python\n${problemData.solution.python}\n\`\`\`\n` : ''}

---

## Your Solution
Write your solution below:

\`\`\`javascript
// Your JavaScript solution here
function solution() {
    // TODO: Implement your solution
}
\`\`\`

\`\`\`python
# Your Python solution here
def solution():
    # TODO: Implement your solution
    pass
\`\`\`
`;
            } else {
                // Generate basic template
                templateContent = `# ${problemMetadata.name}

**Difficulty:** ${problemMetadata.difficulty}  
**Tags:** ${problemMetadata.tags.join(', ')}  
**Source:** External Problem

## Description
${problemMetadata.description || 'Problem description not available.'}

## Your Solution
Write your solution below:

\`\`\`javascript
// Your JavaScript solution here
function solution() {
    // TODO: Implement your solution
}
\`\`\`

\`\`\`python
# Your Python solution here
def solution():
    # TODO: Implement your solution
    pass
\`\`\`
`;
            }
            
            // Write the template to the target file
            fs.writeFileSync(targetFilePath, templateContent, 'utf8');
            console.log(`Generated external problem template: ${targetFilePath}`);
            return true;
            
        } catch (error) {
            console.error('Error generating external problem template:', error.message);
            
            // Fallback: create a minimal template
            const fallbackContent = `# ${problemMetadata.name}

**Source:** External Problem  
**Difficulty:** ${problemMetadata.difficulty}  

## Description
${problemMetadata.description || 'Problem description not available.'}

## Your Solution
\`\`\`javascript
// TODO: Implement your solution
\`\`\`
`;
            
            try {
                fs.writeFileSync(targetFilePath, fallbackContent, 'utf8');
                console.log(`Generated fallback template for external problem: ${targetFilePath}`);
                return true;
            } catch (fallbackError) {
                console.error('Failed to create fallback template:', fallbackError.message);
                return false;
            }
        }
    }

    /**
     * Returns a random problem from the problems manager.
     * @returns {Problem} A random problem from the problems manager
     */
    getRandomProblem() {
        let keys = Object.keys(this.problems);
        // Filter the porblems that are in the skip_problems list
        keys = keys.filter((key) => !this.skip_problems.includes(key));
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        return this.problems[randomKey];
    }



    /**
     * 
     * @returns {Problem} A random problem from the problems manager that has a cloze problem
     */
    getRandomProblemSlugWithCloze() {
        // Get a random clozeProblem Slugs
        return get_random(cloze_problems_list);
    }


    /**
     * Populates the template with the code inside of problem.file_path
     * @param {dict<problem>} problem The problem to populate the template with
     */
    populateTemplate(problem, { base = "base_code" } = {}) {
        if (base != "") {
            return this.copyFileToTemp(problem.file_path, { base: base });
        }
        this.copyFileToTemp(problem.file_path);
    }

    /**
     * Returns the right depending on the problem_metadata
     * @param {dict<ProblemMetadata>} problem_metadata 
     * @returns {ProblemTests}
     */
    selectTest(problem_metadata) {
        return TEST_DICTIONARY[problem_metadata.test_slug];
    }

    /**
     * Runs the tests for the problem and returns if all tests are passed.
     * @param {ProblemMetadata} problemMetadata The information of the problem. 
     * @returns {boolean}
     */
    async runProblem(problemMetadata) {
        // This can only be run with the .js 

        const temp_js_problem_filepath = this.temp_problem_filepath + '.js';
        delete require.cache[require.resolve(temp_js_problem_filepath)] // delete the cache of the file
        const { Problem } = require(temp_js_problem_filepath);

        // const { ProblemTests } = require(this.temp_test_filepath);
        const ProblemTestsObject = this.selectTest(problemMetadata);
        const problemTests = new ProblemTestsObject(Problem);
        const is_correct = problemTests.runTests();
        return is_correct;


    }

    /**
     * Copies the file from problem_file_path to the temp_problem_filepath.
     * @param {str} problem_file_path The path to the file to copy
     * @param {str} base The path to the file to copy from e.g. base_code'
     */

    copyFileToTemp(problem_file_path, { base = "./base_code/", do_all_markdown = false } = {}) {
        try {
            const parts = problem_file_path.split(".");
            let source_extension = parts[parts.length - 1];
            let target_extension = 'md';

            // If do_all_markdown is true, use the file's extension as the markdown extension.
            if (do_all_markdown) {
                target_extension = parts[parts.length - 1];
            }

            const absolute_problem_file_path = getDirAbsoluteUri(problem_file_path, base);
            const absolute_temp_file_path = getDirAbsoluteUri(this.temp_problem_filepath, "./") + '.' + target_extension;

            // Check if this is an external problem (no base code file exists)
            if (!fs.existsSync(absolute_problem_file_path)) {
                // Check if it's an external problem by looking up the problem metadata
                const problemSlug = problem_file_path.replace('.js', '');
                const problemMetadata = this.problems[problemSlug];
                
                if (problemMetadata && problemMetadata.is_external) {
                    return this.generateExternalProblemTemplate(problemMetadata, absolute_temp_file_path);
                }
            }

            // Read the file content
            fs.readFile(absolute_problem_file_path, 'utf8', function (err, data) {
                if (err) {
                    console.log(err);
                    return false;
                }

                let wrappedContent = data;
                if (target_extension === 'md') {
                    const codeBlockMap = {
                        '.js': 'js',
                        '.py': 'python',
                        '.java': 'java',
                        '.html': 'html',
                        '.css': 'css',
                        '.c': 'c',
                        '.cpp': 'cpp',
                        '.rb': 'ruby',
                        '.go': 'go',
                        // Add more file types as needed
                    };


                    const codeLang = codeBlockMap['.' + source_extension] || '';

                    // If the file is a recognized source file (e.g., .js, .py), wrap it inside a code block
                    if (codeLang) {
                        wrappedContent = `\n\`\`\`${codeLang}\n${data}\n\`\`\`\n`;
                    } else {
                        // Default markdown block if the extension is not recognized
                        wrappedContent = `\n\`\`\`\n${data}\n\`\`\`\n`;
                    }

                }

                fs.writeFile(absolute_temp_file_path, wrappedContent, 'utf8', function (err) {
                    if (err) {
                        console.log(err);
                        return false;
                    }
                    console.log(`File successfully written to ${absolute_temp_file_path}`);
                });
            });

            return true;
        } catch (err) {
            console.error("Unexpected error:", err);
            return false;
        }
    }

    copyTempToStash({ stash_file_name = "", force_extension = "", temp_file_extension = ".js" } = {}) {
        try {
            let extension = 'md';
            const timestamp = new Date().toISOString(); // ISO format for the timestamp
            const timestamp_date = timestamp.split('T')[0];

            if (force_extension !== "") {
                extension = force_extension;
            }

            const absolute_temp_file_path = getDirAbsoluteUri(this.temp_problem_filepath, "./") + '.' + extension;
            const stash_directory = path.join(__dirname, 'user_files', 'stash'); // Adjusted path joining
            const target_file_name = `stash_${timestamp_date}.md`;  // The target file where all data will be appended
            const target_file_path = path.join(stash_directory, target_file_name);

            // Log paths to debug
            // console.log("Absolute Temp File Path: ", absolute_temp_file_path);
            // console.log("Stash Directory: ", stash_directory);
            console.log("Target File Path: ", target_file_path);

            // Check if the stash directory exists, create it if not
            if (!fs.existsSync(stash_directory)) {
                console.log("Directory does not exist. Creating:", stash_directory);
                fs.mkdirSync(stash_directory, { recursive: true });
            }

            // Read the file from the temporary location
            fs.readFile(absolute_temp_file_path, 'utf8', function (err, data) {
                if (err) {
                    console.log("Error reading the file:", err);
                    return false;
                }

                // Prepare the header with the stash file name and current date
                const header = `\n### ${stash_file_name} - ${timestamp}\n\n`;  // Markdown header with name and timestamp

                // Hash map (dictionary) to map file extensions to their respective code block languages
                const codeBlockMap = {
                    '.js': 'js',
                    '.py': 'python',
                    '.java': 'java',
                    '.html': 'html',
                    '.css': 'css',
                    '.c': 'c',
                    '.cpp': 'cpp',
                    '.rb': 'ruby',
                    '.go': 'go',
                    // Add more file types and their corresponding language for syntax highlighting
                };

                // Default to plain code block if the extension is not in the map
                const codeLang = codeBlockMap[temp_file_extension.toLowerCase()] || '';

                // Wrap the content in the appropriate code block
                let wrappedContent = codeLang ? `\n\`\`\`${codeLang}\n${data}\n\`\`\`\n` : `\n\`\`\`\n${data}\n\`\`\`\n`;

                // Combine the header and the wrapped content
                const contentToAppend = header + wrappedContent;

                // Append the data to the stash.md file
                fs.appendFile(target_file_path, contentToAppend, 'utf8', function (err) {
                    if (err) {
                        console.log("Error appending the file:", err);
                        return false;
                    }
                    console.log("Data successfully appended to:", target_file_path);
                });
            });

            return true;

        } catch (err) {
            console.error("Unexpected error:", err);
            return false;
        }
    }




    /**
     * Copies the file from problem_file_path content to the temp_problem_filepath.
     */
    copyTempToClipboard() {
        const { getDirAbsoluteUri } = require('./functions');
        const temp_problem_filepath = './user_files/temp_problem.js';
        const absolute_problem_file_path = getDirAbsoluteUri(temp_problem_filepath, "./");

        fs.readFile(absolute_problem_file_path, 'utf8', function (err, data) {
            if (err) {
                console.log(err)
                return false
            }
            try {
                clipboard.copy(data);
            }
            catch (err) { }
        });

    }


    /**
     * Copies the prompt to the clipboard
     */
    copyPromptToCliboard() {

    }


    /**
     * Opens the temporal problem file in the editor (Can be customized which to use).
     * @param {str} editor_instruction The instruction to open the file in the editor. Default is "start".
     */
    async openTemporalProblemFile({ editor_instruction = "", force_extension = "" } = {}) {
        const absolute_problem_file_path = this.findFileWithFilepath(this.temp_problem_filepath, "", { force_extension: force_extension });
        console.log("absolute_temp_file_path", absolute_problem_file_path);
        await openEditorPlatformAgnostic(editor_instruction, { absolute_temp_file_path: absolute_problem_file_path })

    }

    /**
     * Returns the absolute path of the file with the filepath and problem_slug.
     * @param {string} filepath The path to the file to find
     * @param {string} problemSlug The slug of the problem to find
     * @param {dict} options The options to pass to the function
     * @option {bool} return_extension If true, returns the extension of the file found. as [absolute_temp_file_path, extension_detected]
     * @returns {string} The absolute path of the file with the filepath and problem_slug if enabled.
     */
    findFileWithFilepath(filepath, problemSlug, { return_extension = false, force_extension = "" } = {}) {
        let absolute_temp_file_path = "";
        let extensions = ['.py', '.js', '.md', '.java', '.cpp', 'ipynb']; // Add more extensions as needed
        if (force_extension != "") {
            extensions = [force_extension];
        }

        let extension_detected = "";
        for (const ext of extensions) {
            const filePath = getDirAbsoluteUri(filepath + problemSlug + ext, "./");
            if (fs.existsSync(filePath)) {
                absolute_temp_file_path = filePath;
                extension_detected = ext;
                break;
            }
        }
        if (return_extension) {
            return [absolute_temp_file_path, extension_detected];
        } else {
            return absolute_temp_file_path;
        }
    }




    /**
     * Copies the file from problem_file_path to the temp_problem_filepath.
     * @param {str} problem_file_path The path to the file to copy
     * @param {str} base The path to the file to copy from e.g. base_code'
     */
    copySolutionToSol(problem_slug) {
        try {
            // console.log("Copying file from", problem_file_path, "to", this.temp_problem_filepath)
            let [absolute_problem_file_path, extension] = this.findFileWithFilepath(this.solution_filepath, problem_slug, { return_extension: true });
            let absolute_temp_problem_file_path = getDirAbsoluteUri(this.temp_solution_filepath, "./") + extension;


            // console.log('Copying solution to sol', absolute_problem_file_path, absolute_temp_problem_file_path);
            // console.log("Opening file: " + absolute_problem_file_path, "from source,", problem_file_path);
            fs.readFile(absolute_problem_file_path, 'utf8', function (err, data) {
                if (err) {

                    console.log(err)
                    return false
                }

                fs.writeFile(absolute_temp_problem_file_path, data, 'utf8', function (err) {
                    if (err) {
                        console.log(err)
                        return false
                    };

                });
            });
            return { problem_extension: extension, temp_extension: extension, status: true };
        } catch (err) {
            console.error(err);
            return { problem_extension: extension, temp_extension: extension, status: false };

        }

    }

    async openSolutionFile(problem_slug, { editor_instruction = "start" } = {}) {

        let absolute_temp_file_path = this.findFileWithFilepath(this.solution_filepath, problem_slug);

        if (!absolute_temp_file_path) {
            console.log("No solution file found with the supported extensions.");
        }

        console.log("absolute_temp_file_path", absolute_temp_file_path);

        await openEditorPlatformAgnostic(editor_instruction, { absolute_temp_file_path: absolute_temp_file_path });
    }

    async openTemporalSolutionFile({ editor_instruction = "start", extension = '.js' } = {}) {

        const absolute_temp_file_path = getDirAbsoluteUri(this.temp_solution_filepath, "./") + extension;

        await openEditorPlatformAgnostic(editor_instruction, { absolute_temp_file_path: absolute_temp_file_path })

    }

    async openBaseCodeFile(problem_slug, { editor_instruction = "start", create_if_inexistent = true } = {}) {
        console.log("Opening base code file for problem", this.base_code_filepath + problem_slug + '.js');
        const absolute_temp_file_path = getDirAbsoluteUri(this.base_code_filepath + problem_slug + '.js', "./");
        const template_base = getDirAbsoluteUri(this.base_code_filepath + 'base.js', "./");

        // Check if the file exists, if not, create it with the template base.
        if (create_if_inexistent && !fs.existsSync(absolute_temp_file_path)) {
            console.log("File does not exist, creating it with the template base.");
            fs.copyFileSync(template_base, absolute_temp_file_path);
        }

        await openEditorPlatformAgnostic(editor_instruction, { absolute_temp_file_path: absolute_temp_file_path })

    }



    async openTestCaseFile(problem_slug, { editor_instruction = "start" } = {}) {
        const problem_metadata = this.problems[problem_slug];
        const tags = problem_metadata.tags;

        // Identify the correct category by filtering the Constant.PROBLEM_CATEGORIES by the tags
        const categoriesObjects = Object.values(constants.PROBLEM_CATEGORIES);
        const categories_slugs = categoriesObjects.map(category => category.slug); //Names of the testfiles

        const categories = categories_slugs.filter(test_file_name =>
            tags.includes(test_file_name)
        ) ?? [];


        const category_slug_detected = categories.length > 0 ? categories[0] : "";

        if (category_slug_detected === "") {
            throw ("No category detected, Doesnt open any", "categories", categories);
        }

        const category_testslug = categoriesObjects.filter(category => category.slug === category_slug_detected)[0].test_problem_slug;
        console.log("Category testslug", category_testslug);
        const absolute_temp_file_path = getDirAbsoluteUri(this.tests_filepath
            + category_testslug + '.js', "./"
        );
        console.log("absolute_temp_file_path", absolute_temp_file_path);

        await openEditorPlatformAgnostic(editor_instruction, absolute_temp_file_path)

    }

    /**
     * 
     * @param {string} problem_slug The slug of the problem to open the tests case file for
     * @param {string} editor_instruction The instruction to open the file in the editor. Default is "start"
     * 
     */
    async openPromptMarkdownFile(problem_slug, { editor_instruction = "start" } = {}) {

        // Find the test_case_name
        console.log("Attempting to open markdown file for problem", problem_slug, "with path", this.markdown_filepath + problem_slug + '.md');
        const absolute_temp_file_path = getDirAbsoluteUri(this.markdown_filepath + problem_slug + '.md', "./");

        console.log("absolute_temp_file_path", absolute_temp_file_path);


        await openEditorPlatformAgnostic(editor_instruction, { absolute_temp_file_path: absolute_temp_file_path })
    }





}

module.exports = ProblemsManager;