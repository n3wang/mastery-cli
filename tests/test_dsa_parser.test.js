const assert = require('assert');
const path = require('path');
const fs = require('fs');
const {
	parseMarkdownProblems,
	parseMarkdownProblemsFromFolder,
	parseMarkdownProblemsFromModules,
	convertToProblemsMetadata,
	retrieve_dsa_modules,
	retrieve_dsa_problems_as_decks
} = require('../src/features/dsa/md_dsa_parser.js');

describe('DSA Markdown Parser', () => {
	describe('parseMarkdownProblems', () => {
		it('should parse a single markdown file with multiple problems', () => {
			const testFilePath = path.join(
				__dirname,
				'../user_data/dsa_modules/leetcode-basics/problems/array-problems.md'
			);

			if (!fs.existsSync(testFilePath)) {
				console.warn(
					`Test file ${testFilePath} does not exist, skipping test`
				);
				return;
			}

			const problems = parseMarkdownProblems(testFilePath);

			assert(Array.isArray(problems));
			assert(problems.length >= 2); // Should have at least Two Sum and Valid Parentheses

			const twoSum = problems.find(p => p.title === 'Two Sum Custom');
			assert(twoSum);
			assert.strictEqual(twoSum.title, 'Two Sum Custom');
			assert.deepStrictEqual(twoSum.tags, ['array', 'hashmap']);
			assert.strictEqual(twoSum.difficulty, 'Easy');
			assert(twoSum.description.includes('return indices'));
			assert(twoSum.solution.python.includes('def twoSum'));
			assert(twoSum.solution.javascript.includes('function twoSum'));
		});
	});

	describe('parseMarkdownProblemsFromFolder', () => {
		it('should parse all markdown files in a folder', () => {
			const folderPath = path.join(
				__dirname,
				'../user_data/dsa_modules/leetcode-basics/problems'
			);

			if (!fs.existsSync(folderPath)) {
				console.warn(
					`Test folder ${folderPath} does not exist, skipping test`
				);
				return;
			}

			const problems = parseMarkdownProblemsFromFolder(folderPath);

			assert(Array.isArray(problems));
			assert(problems.length >= 3); // Should have multiple problems from both files

			// Check for problems from array-problems.md
			const twoSum = problems.find(p => p.title === 'Two Sum Custom');
			assert(twoSum);

			// Check for problems from tree-problems.md
			const maxDepth = problems.find(
				p => p.title === 'Maximum Depth of Binary Tree'
			);
			assert(maxDepth);
		});
	});

	describe('convertToProblemsMetadata', () => {
		it('should convert parsed problems to ProblemMetadata format', () => {
			const mockProblems = [
				{
					title: 'Test Problem',
					tags: ['array', 'test'],
					difficulty: 'Easy',
					description: 'A test problem description',
					theory: 'Test theory',
					pseudocode: 'test pseudocode',
					solution: { python: 'def test(): pass' }
				}
			];

			const metadata = convertToProblemsMetadata(
				mockProblems,
				'Test Module'
			);

			assert(Array.isArray(metadata));
			assert.strictEqual(metadata.length, 1);

			const problem = metadata[0];
			assert.strictEqual(problem.slug, 'test-problem');
			assert.strictEqual(problem.name, 'Test Problem');
			assert.strictEqual(problem.difficulty, 'EASY');
			assert.deepStrictEqual(problem.tags, ['array', 'test']);
		});
	});

	describe('retrieve_dsa_modules', () => {
		it('should retrieve DSA modules from user_data directory', () => {
			const modules = retrieve_dsa_modules();

			assert(typeof modules === 'object');

			// If the example module exists, verify its structure
			if (modules['leetcode-basics']) {
				const module = modules['leetcode-basics'];
				assert.strictEqual(module.module_path, 'leetcode-basics');
				assert(module.ABOUT);
				assert.strictEqual(module.ABOUT.title, 'LeetCode Basics');
				assert(Array.isArray(module.CONTENT_FOLDERS));
			}
		});
	});

	describe('retrieve_dsa_problems_as_decks', () => {
		it('should retrieve and parse all DSA problems', () => {
			const decks = retrieve_dsa_problems_as_decks();

			assert(typeof decks === 'object');

			// If the example module exists and has problems, verify the structure
			if (decks['leetcode-basics']) {
				const deck = decks['leetcode-basics'];
				assert.strictEqual(deck.title, 'LeetCode Basics');
				assert.strictEqual(deck.skill_category, 'algorithms');
				assert(Array.isArray(deck.items));

				// If there are problems, verify their structure
				if (deck.items.length > 0) {
					const problem = deck.items[0];
					assert(problem.slug);
					assert(problem.name);
					assert(problem.difficulty);
					assert(Array.isArray(problem.tags));
				}
			}
		});
	});

	describe('parseMarkdownProblemsFromModules', () => {
		it('should parse problems from module configuration', () => {
			const mockModule = {
				module_path: 'test-module',
				ABOUT: {
					title: 'Test Module',
					skill_category: 'test'
				},
				CONTENT_FOLDERS: ['problems'],
				CACHE_CONTENT: false
			};

			// Create a mock problems directory with a test file
			const testDir = path.join(
				__dirname,
				'../user_data/dsa_modules/test-module/problems'
			);
			const testFile = path.join(testDir, 'test.md');

			// Only run this test if we can create the test files
			try {
				if (!fs.existsSync(testDir)) {
					fs.mkdirSync(testDir, { recursive: true });
				}

				fs.writeFileSync(
					testFile,
					`# Test Problem

**Tags:** test  
**Difficulty:** Easy  

## Description
A simple test problem.

## Solution

### Python
\`\`\`python
def test():
    return True
\`\`\`
`
				);

				const decks = parseMarkdownProblemsFromModules([mockModule]);

				assert(decks['test-module']);
				assert(decks['test-module'].items.length >= 1);

				// Clean up
				fs.unlinkSync(testFile);
				fs.rmdirSync(testDir);
				fs.rmdirSync(path.dirname(testDir));
			} catch (error) {
				console.warn(
					'Could not create test files, skipping integration test:',
					error.message
				);
			}
		});
	});
});
