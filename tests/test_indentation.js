const { parseMarkdownCards } = require('../src/md_terms_parser.js');
const path = require('path');

const filePath = path.join(__dirname, 'test_data', 'indentation_test.md');
const result = parseMarkdownCards(filePath);

console.log('=== Parsed Result ===');
console.log('Title:', result.title);
console.log('Entries:', result.entries.length);

if (result.entries.length > 0) {
	const entry = result.entries[0];
	console.log('\n=== Entry 0 ===');
	console.log('Header:', entry.header);
	console.log('\n--- Description ---');
	console.log(entry.description);
	console.log('\n--- Answer ---');
	console.log(entry.answer);
	console.log('\n--- Answer (with visible spaces) ---');
	console.log(JSON.stringify(entry.answer, null, 2));
}
