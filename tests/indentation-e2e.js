const { parseMarkdownIntoDeck } = require('../src/md-terms-parser.js');
const path = require('path');

const filePath = path.join(__dirname, 'fixtures', 'indentation_test.md');
const terms = parseMarkdownIntoDeck(filePath);

console.log('=== End-to-End Indentation Test ===');
console.log('Number of terms:', terms.length);

if (terms.length > 0) {
	const term = terms[0];
	console.log('\n=== Term 0 ===');
	console.log('Header:', term.term);
	console.log('Auto newline disabled:', !term.auto_newline);
	console.log('\n--- Description (raw) ---');
	console.log(term.description);
	console.log('\n--- Example/Answer (raw) ---');
	console.log(term.example);
	console.log('\n--- Example/Answer (with visible spaces) ---');
	console.log(JSON.stringify(term.example, null, 2));

	// Check if indentation is preserved
	const hasIndentation = term.example.includes('    indented') &&
	                       term.example.includes('    is') &&
	                       term.example.includes('        indented');

	console.log('\n--- Verification ---');
	if (hasIndentation) {
		console.log('\u2713 SUCCESS: Indentation is preserved!');
		process.exit(0);
	} else {
		console.log('\u2717 FAILURE: Indentation was lost!');
		process.exit(1);
	}
}
