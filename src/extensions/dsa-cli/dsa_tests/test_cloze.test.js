const ProblemsManager = require('../problems-manager');
const assert = require('assert');

describe('Cloze Tests', function () {
	// Tests that the cloze system is working properly.
	it('Tests that it can print cloze problems', async function () {
		const problemManager = new ProblemsManager();
		await problemManager.autoPopulateUsingTestDictionary();

		const allProblemsMetadata = problemManager.problems;
		for (let problemMetadata of Object.values(allProblemsMetadata)) {
			console.log(
				'Tests if there is a cloze system inside:',
				problemMetadata.slug
			);
			console.log(problemManager.getProblemClozes(problemMetadata.slug));
		}
	});

	it('test that it can populate the problem set', async function () {
		const problemSlug = 'simple-sum';
		const problemManager = new ProblemsManager();
		await problemManager.autoPopulateUsingTestDictionary();

		const problemClozes = problemManager.getProblemClozes(problemSlug);

		for (let clozeFile of problemClozes) {
			problemManager.copyFileToTemp(clozeFile.file_path, {
				base: 'cloze/base_cloze'
			});
		}
	});

	it('Test each cloze in a problem by loading it into the problem manager', async function () {});
});
