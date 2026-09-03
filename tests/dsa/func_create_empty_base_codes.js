const path = require('path');
const { writeUnresolvedClass } = require('../../src/features/dsa/functions');

const DSA_DIR = path.join(__dirname, '..', '..', 'src', 'features', 'dsa');
const ProblemsManager = require('../../src/features/dsa/problems-manager');

// Iterate for metadata and create the files

async function createEmptyBaseCodes() {
	const problemManager = new ProblemsManager();
	await problemManager.autoPopulateUsingTestDictionary();

	const allProblemsMetadata = problemManager.problems;
	console.log('allProblemsMetadata', allProblemsMetadata);
	for (let problemMetadata of Object.values(allProblemsMetadata)) {
		const filename = problemMetadata.file_path;
		// console.log("traversing", filename);

		writeUnresolvedClass(
			path.join(DSA_DIR, 'solutions', filename),
			path.join(DSA_DIR, 'base_code', filename),
			{ avoidOverwrite: true }
		);
	}
}

// (async () => {
//     await createEmptyBaseCodes();
// })()
module.exports = { createEmptyBaseCodes };
