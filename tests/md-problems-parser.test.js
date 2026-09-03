const assert = require('assert');
const path = require('path');
const {
	parseMarkdownProblemsFromFolder,
	parseMarkdownProblemsFromModules
} = require('../src/features/dsa/md-dsa-parser.js');

describe('parseMarkdownProblemsFromFolder', () => {
	it('should parse Two Sum correctly', () => {
		const folderPath = path.join(__dirname, 'fixtures-problems');
		const problems = parseMarkdownProblemsFromFolder(folderPath);
		const twoSum = problems.find(p => p.title === 'Two Sum');

		assert(twoSum);
		assert.strictEqual(twoSum.title, 'Two Sum');
		assert.deepStrictEqual(twoSum.tags, ['array', 'hashmap']);
		assert.strictEqual(twoSum.difficulty, 'Easy');
		assert(twoSum.description.includes('return indices'));
		assert(twoSum.theory.includes('hash map'));
		assert(twoSum.pseudocode.includes('function twoSum'));
		assert(twoSum.solution.python.includes('def twoSum'));
		assert(twoSum.solution.javascript.includes('function twoSum'));
	});

	it('should parse Reverse String correctly', () => {
		const folderPath = path.join(__dirname, 'fixtures-problems');
		const problems = parseMarkdownProblemsFromFolder(folderPath);
		const reverseString = problems.find(p => p.title === 'Reverse String');

		assert(reverseString);
		assert.strictEqual(reverseString.title, 'Reverse String');
		assert.deepStrictEqual(reverseString.tags, ['string', 'two pointers']);
		assert.strictEqual(reverseString.difficulty, 'Easy');
		assert(reverseString.description.includes('reverses a string'));
		assert(reverseString.theory.includes('two pointers'));
		assert(reverseString.solution.python.includes('def reverseString'));
		assert(
			reverseString.solution.javascript.includes('function reverseString')
		);
	});
});

describe('parseMarkdownProblemsFromModules', () => {
	// TODO(oss-prep): needs the vault env override from phase 4.
	// parseMarkdownProblemsFromModules resolves CONTENT_FOLDERS under
	// user_data/terms_modules/<module_path>/, which is a fixed path today, so this
	// fixture module cannot be placed anywhere the parser will look. Once $MASTERY_HOME
	// exists the test can point at a fixture vault and be re-enabled.
	it.skip('should parse problems from module structure', () => {
		const module_exports = {
			module_path: 'dsa-basic',
			ABOUT: {
				title: 'DSA Basic',
				skill_category: 'algorithms'
			},
			CONTENT_FOLDERS: ['fixtures-problems']
		};

		const decks = parseMarkdownProblemsFromModules([module_exports]);
		assert(decks['dsa-basic']);
		const problems = decks['dsa-basic'].items;
		assert(Array.isArray(problems));
		assert(problems.length >= 2);
	});
});
