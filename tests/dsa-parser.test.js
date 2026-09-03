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
} = require('../src/features/dsa/md-dsa-parser.js');
const { vaultPath } = require('../src/vault');

/**
 * These tests used to reach for `<repo>/user_data/dsa_modules/...`, a directory
 * that no longer exists — user problems live in the vault. Every test therefore
 * hit an `existsSync` guard and returned early, or wrapped its assertions in a
 * try/catch that swallowed the failure, so the file passed while verifying
 * nothing. One of them also wrote its fixture into the repository root.
 *
 * The fixture is now built inside the isolated test vault (tests/setup.js), so
 * the tests exercise the real resolution path and assert unconditionally.
 */

const MODULE_NAME = 'fixture-basics';

const MODULE_INDEX = `const ABOUT = {
	title: 'Fixture Basics',
	skill_category: 'algorithms'
};

module.exports = {
	module_path: '${MODULE_NAME}',
	ABOUT: ABOUT,
	CONTENT_FOLDERS: ['problems'],
	CACHE_CONTENT: false
};
`;

const PROBLEMS_MD = `# Two Sum Custom

**Tags:** array, hashmap
**Difficulty:** Easy

## Description
Given an array of integers, return indices of the two numbers that add up to a target.

## Solution

### Python
\`\`\`python
def twoSum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        if target - n in seen:
            return [seen[target - n], i]
        seen[n] = i
\`\`\`

### JavaScript
\`\`\`javascript
function twoSum(nums, target) {
	const seen = new Map();
	for (let i = 0; i < nums.length; i++) {
		if (seen.has(target - nums[i])) {
			return [seen.get(target - nums[i]), i];
		}
		seen.set(nums[i], i);
	}
}
\`\`\`

# Valid Parentheses Custom

**Tags:** stack
**Difficulty:** Easy

## Description
Determine whether a string of brackets is balanced.

## Solution

### Python
\`\`\`python
def isValid(s):
    pairs = {')': '(', ']': '[', '}': '{'}
    stack = []
    for c in s:
        if c in pairs:
            if not stack or stack.pop() != pairs[c]:
                return False
        else:
            stack.append(c)
    return not stack
\`\`\`
`;

describe('DSA Markdown Parser', () => {
	let moduleDir;
	let problemsDir;
	let problemsFile;

	before(() => {
		moduleDir = vaultPath(`problems/${MODULE_NAME}`);
		problemsDir = path.join(moduleDir, 'problems');
		problemsFile = path.join(problemsDir, 'array-problems.md');

		fs.mkdirSync(problemsDir, { recursive: true });
		fs.writeFileSync(path.join(moduleDir, 'index.js'), MODULE_INDEX);
		fs.writeFileSync(problemsFile, PROBLEMS_MD);
	});

	after(() => {
		fs.rmSync(moduleDir, { recursive: true, force: true });
	});

	describe('parseMarkdownProblems', () => {
		it('parses a single markdown file with multiple problems', () => {
			const problems = parseMarkdownProblems(problemsFile);

			assert(Array.isArray(problems));
			assert.strictEqual(problems.length, 2);

			const twoSum = problems.find(p => p.title === 'Two Sum Custom');
			assert(twoSum, 'expected a Two Sum Custom problem');
			assert.deepStrictEqual(twoSum.tags, ['array', 'hashmap']);
			assert.strictEqual(twoSum.difficulty, 'Easy');
			assert(twoSum.description.includes('return indices'));
			assert(twoSum.solution.python.includes('def twoSum'));
			assert(twoSum.solution.javascript.includes('function twoSum'));
		});
	});

	describe('parseMarkdownProblemsFromFolder', () => {
		it('parses every markdown file in a folder', () => {
			const problems = parseMarkdownProblemsFromFolder(problemsDir);

			assert(Array.isArray(problems));
			assert.strictEqual(problems.length, 2);

			const titles = problems.map(p => p.title).sort();
			assert.deepStrictEqual(titles, [
				'Two Sum Custom',
				'Valid Parentheses Custom'
			]);
		});
	});

	describe('convertToProblemsMetadata', () => {
		it('converts parsed problems into metadata', () => {
			const problems = parseMarkdownProblemsFromFolder(problemsDir);
			const metadata = convertToProblemsMetadata(problems);

			assert(Array.isArray(metadata));
			assert.strictEqual(metadata.length, problems.length);

			for (const entry of metadata) {
				assert(entry.slug, 'every problem needs a slug');
			}
		});
	});

	describe('retrieve_dsa_modules', () => {
		it('finds modules in the vault', () => {
			const modules = retrieve_dsa_modules();

			assert(typeof modules === 'object');

			const module = modules[MODULE_NAME];
			assert(module, `expected ${MODULE_NAME} among the modules`);
			assert.strictEqual(module.module_path, MODULE_NAME);
			assert.strictEqual(module.ABOUT.title, 'Fixture Basics');
			assert(Array.isArray(module.CONTENT_FOLDERS));
		});
	});

	describe('retrieve_dsa_problems_as_decks', () => {
		it('parses every module into a deck', () => {
			const decks = retrieve_dsa_problems_as_decks();

			assert(typeof decks === 'object');

			const deck = decks[MODULE_NAME];
			assert(deck, `expected a deck for ${MODULE_NAME}`);
			assert.strictEqual(deck.title, 'Fixture Basics');
			assert.strictEqual(deck.skill_category, 'algorithms');
			assert(Array.isArray(deck.items));
			assert.strictEqual(deck.items.length, 2);

			const problem = deck.items[0];
			assert(problem.slug);
			assert(problem.name);
			assert(problem.difficulty);
			assert(Array.isArray(problem.tags));
		});
	});

	describe('parseMarkdownProblemsFromModules', () => {
		it('parses problems from a module configuration', () => {
			const moduleConfig = {
				module_path: MODULE_NAME,
				ABOUT: {
					title: 'Fixture Basics',
					skill_category: 'algorithms'
				},
				CONTENT_FOLDERS: ['problems'],
				CACHE_CONTENT: false
			};

			const decks = parseMarkdownProblemsFromModules([moduleConfig]);

			assert(decks[MODULE_NAME], `expected a deck for ${MODULE_NAME}`);
			assert.strictEqual(decks[MODULE_NAME].items.length, 2);
		});
	});

	describe('vault isolation', () => {
		it('writes nothing into the repository', () => {
			// The fixture must land in the vault, not next to the source.
			assert(
				!vaultPath('problems').startsWith(path.join(__dirname, '..')),
				'the test vault must live outside the repo'
			);
			assert(
				!fs.existsSync(path.join(__dirname, '..', 'user_data')),
				'nothing should create <repo>/user_data'
			);
		});
	});
});
