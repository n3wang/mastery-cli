const { writeUnresolvedClass } = require('../functions');
const ProblemsManager = require('../problems-manager');

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
			`../solutions/${filename}`,
			`../base_code/${filename}`,
			{ avoidOverwrite: true }
		);
	}
}

// (async () => {
//     await createEmptyBaseCodes();
// })()
module.exports = { createEmptyBaseCodes };
