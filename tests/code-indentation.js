const { parseMarkdownIntoDeck } = require('../src/md-terms-parser.js');
const path = require('path');

const filePath = path.join(__dirname, 'fixtures', 'code_indentation_test.md');
const terms = parseMarkdownIntoDeck(filePath);

console.log('=== Code Indentation Test ===');
console.log('Number of terms:', terms.length);

let allTestsPassed = true;

// Test 1: Python function with proper indentation
if (terms.length > 0) {
	const pythonTerm = terms[0];
	console.log('\n=== Test 1: Python Function ===');

	const hasCorrectIndent = pythonTerm.example.includes('    left = 0') &&
	                         pythonTerm.example.includes('        mid = (left + right) // 2') &&
	                         pythonTerm.example.includes('            return mid');

	if (hasCorrectIndent) {
		console.log('\u2713 Python function indentation preserved');
	} else {
		console.log('\u2717 Python function indentation FAILED');
		console.log('Example:', pythonTerm.example);
		allTestsPassed = false;
	}
}

// Test 2: Nested JavaScript object
if (terms.length > 1) {
	const jsTerm = terms[1];
	console.log('\n=== Test 2: JavaScript Object ===');

	const hasCorrectIndent = jsTerm.example.includes('    server: {') &&
	                         jsTerm.example.includes('        host: \'localhost\'') &&
	                         jsTerm.example.includes('            host: \'db.example.com\'');

	if (hasCorrectIndent) {
		console.log('\u2713 JavaScript object indentation preserved');
	} else {
		console.log('\u2717 JavaScript object indentation FAILED');
		console.log('Example:', jsTerm.example);
		allTestsPassed = false;
	}
}

// Test 3: Markdown list with indentation
if (terms.length > 2) {
	const listTerm = terms[2];
	console.log('\n=== Test 3: Markdown List ===');

	const hasCorrectIndent = listTerm.example.includes('    - Second level item') &&
	                         listTerm.example.includes('        - Third level item') &&
	                         listTerm.example.includes('    def indented_code():') &&
	                         listTerm.example.includes('        return "This is indented with spaces"');

	if (hasCorrectIndent) {
		console.log('\u2713 Markdown list indentation preserved');
	} else {
		console.log('\u2717 Markdown list indentation FAILED');
		console.log('Example:', listTerm.example);
		allTestsPassed = false;
	}
}

console.log('\n=== Final Result ===');
if (allTestsPassed) {
	console.log('\u2713 ALL TESTS PASSED - Indentation is correctly preserved!');
	process.exit(0);
} else {
	console.log('\u2717 SOME TESTS FAILED - Check output above');
	process.exit(1);
}
