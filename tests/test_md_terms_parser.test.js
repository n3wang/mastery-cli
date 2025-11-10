const assert = require('assert');
const {
	parseMarkdownCards,
	parseMarkdownIntoDeck,
	parseMarkdownCardsFromTermsModules
} = require('../src/md_terms_parser.js');
// const fs = require('fs');
const path = require('path');
const {
	EXTERNAL_CONTENT_FOLDERS
} = require('../src/data/user_data/terms_modules/b01-flowers/index.js');

describe('parseMarkdownCards', () => {
	it('should parse a simple markdown file', () => {
		const filePath = path.join(__dirname, 'test_data', 'simple.md');
		const result = parseMarkdownCards(filePath);
		assert.strictEqual(result.title, 'Simple Terms');
		assert.strictEqual(result.entries.length, 2);
		assert.strictEqual(result.entries[0].header, 'Term 1');
		assert.strictEqual(
			result.entries[0].description,
			':m Description for term 1.\n'
		);
		assert.strictEqual(result.entries[0].prompt, 'Prompt for term 1?');
		assert.strictEqual(result.entries[0].answer, ':m Answer for term 1.');
	});

	it('should handle multi-line descriptions and answers', () => {
		const filePath = path.join(__dirname, 'test_data', 'multiline.md');
		const result = parseMarkdownCards(filePath);
		assert.strictEqual(
			result.entries[0].description,
			'Multi-line\ndescription.\n'
		);
		assert.strictEqual(result.entries[0].answer, 'Multi-line\nanswer.');
	});

	it('should handle files with no title', () => {
		const filePath = path.join(__dirname, 'test_data', 'no_title.md');
		const result = parseMarkdownCards(filePath);
		assert.strictEqual(result.title, '');
		assert.strictEqual(result.entries.length, 1);
	});

	it('should handle files with no entries', () => {
		const filePath = path.join(__dirname, 'test_data', 'empty.md');
		const result = parseMarkdownCards(filePath);
		assert.strictEqual(result.title, '');
		assert.strictEqual(result.entries.length, 0);
	});

	it('should handle files with only a title', () => {
		const filePath = path.join(__dirname, 'test_data', 'only_title.md');
		const result = parseMarkdownCards(filePath);
		assert.strictEqual(result.title, 'Only Title');
		assert.strictEqual(result.entries.length, 0);
	});

	it('should handle multiline answer with ??x x??', () => {
		const filePath = path.join(
			__dirname,
			'test_data',
			'multiline_answer_2.md'
		);
		const result = parseMarkdownCards(filePath);
		assert.strictEqual(result.entries[0].answer, 'line1\nline2');
	});

	it('should parse multiple entries correctly', () => {
		const filePath = path.join(
			__dirname,
			'test_data',
			'multiple_entries.md'
		);
		const result = parseMarkdownCards(filePath);

		assert.strictEqual(result.title, 'Multiple Entries Test');
		assert.strictEqual(result.entries.length, 3);

		// Term A
		assert.strictEqual(result.entries[0].header, 'Term A');
		assert.strictEqual(
			result.entries[0].description,
			'Description A line 1\nDescription A line 2\n'
		);
		assert.strictEqual(result.entries[0].prompt, 'Prompt for A?');
		assert.strictEqual(
			result.entries[0].answer,
			'Answer A line 1\nAnswer A line 2'
		);

		// Term B
		assert.strictEqual(result.entries[1].header, 'Term B');
		assert.strictEqual(result.entries[1].description, 'Description B\n');
		assert.strictEqual(result.entries[1].prompt, 'Prompt for B?');
		assert.strictEqual(
			result.entries[1].answer,
			'Multiline B Answer line 1\nMultiline B Answer line 2'
		);

		// Term C
		assert.strictEqual(result.entries[2].header, 'Term C');
		assert.strictEqual(
			result.entries[2].description.startsWith(
				'Only a description for C'
			),
			true
		);
		assert.strictEqual(result.entries[2].prompt, 'Term C');
		assert.strictEqual(result.entries[2].answer, '');
	});

	it(' should parse one-line entries and fallback to previous line as header', () => {
		const filePath = path.join(__dirname, 'test_data', 'one_liners.md');
		const result = parseMarkdownCards(filePath);
		assert.strictEqual(result.entries.length, 3);

		// One-line entry with ::
		assert.deepStrictEqual(result.entries[0], {
			header: 'Simple Term',
			description: 'Simple Term',
			prompt: 'Simple Term',
			answer: 'This is the answer.',
			reference_line: 1
		});

		assert.deepStrictEqual(result.entries[1], {
			header: 'Third Line',
			description: 'Third Line',
			prompt: 'Third Line',
			answer: 'This is the answer.',
			reference_line: 3
		});

		// Entry without #### but followed by ?x
		assert.deepStrictEqual(result.entries[2], {
			header: 'Fallback header',
			description: 'Some explanation\nFallback header\n',
			prompt: 'Fallback header',
			answer: 'Quick answer line',
			reference_line: 6
		});
	});

	it('handle wiki sample', () => {
		const filePath = path.join(__dirname, 'test_data', 'wiki_sample.md');
		const result = parseMarkdownIntoDeck(filePath, 'botanic');
	});

	it('attempt parse module', () => {
		const ABOUT = {
			title: 'Flowers',
			skill_category: 'botany',
			author: 'n3wang'
		};

		const CONTENT_FOLDERS = ['wiki'];

		const CONTENT_FILES = ['00-languages_definitions.md'];

		const module_exports = {
			module_path: 'b01-flowers',
			ABOUT: ABOUT,
			CONTENT_FOLDERS: CONTENT_FOLDERS,
			CONTENT_FILES: CONTENT_FILES
		};

		const result = parseMarkdownCardsFromTermsModules([module_exports]);
	});

	it('should parse from external folder', () => {
		const ABOUT = {
			title: 'Flowers',
			skill_category: 'botany',
			author: 'n3wang'
		};
		const module_exports = {
			ABOUT: ABOUT,
			EXTERNAL_CONTENT_FOLDERS: [
				'E:\\Documents\\obsidian\\general-docs-public\\4 - academia-project\\K1 - cfa\\Kaplan notes'
			]
		};
		const result = parseMarkdownCardsFromTermsModules([module_exports]);
		console.log('========= RESULT =========');
		console.log(result);
	});
});
