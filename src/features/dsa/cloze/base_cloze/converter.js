const fs = require('fs');

function writeUnresolvedClass(
	sourceFilePath,
	targetFilePath,
	{ avoidOverwrite = true } = {}
) {
	// Read the content of the source file
	const content = fs.readFileSync(sourceFilePath, 'utf8');

	// Find the class name
	const className = content.match(/class (\w+)/)[1];

	// Find the solve method
	const solveMethod = content.match(/solve\([\s\S]*?\n/m);
	console.log('solveMethod', solveMethod);
	const solveMethodHeader = solveMethod ? `\n\t${solveMethod[0]}` : '';

	// Write the unresolved version of the class to the target file
	const unresolvedContent = `class ${className} {${solveMethodHeader}\t// Your code here\n\n\t\}\n}\n\n\nmodule.exports = { Problem: ${className} };`;

	// Check if the target file exists
	if (avoidOverwrite && fs.existsSync(targetFilePath)) {
		console.error(
			`Target file ${targetFilePath} already exists. Aborting write.`
		);
		return;
	}

	fs.writeFileSync(targetFilePath, unresolvedContent, 'utf8');
}

writeUnresolvedClass('./max-profit.js', './base/max-profit.js', {
	avoidOverwrite: false
});
