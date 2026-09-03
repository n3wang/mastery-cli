const { RatingStorage } = require('../src/RatingStorage');
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { vaultPath } = require('../src/vault');

describe('RatingStorage', function () {
	let storage;
	const testFilename = 'test_ratings';
	const testFilepath = vaultPath(`progress/${testFilename}.csv`);

	beforeEach(function () {
		// Clean up test file if it exists
		if (fs.existsSync(testFilepath)) {
			fs.unlinkSync(testFilepath);
		}
		storage = new RatingStorage(testFilename);
	});

	afterEach(function () {
		// Clean up after tests
		if (fs.existsSync(testFilepath)) {
			fs.unlinkSync(testFilepath);
		}
	});

	describe('CSV File Creation', function () {
		it('should create CSV file with headers on initialization', function () {
			const exists = fs.existsSync(testFilepath);
			assert.strictEqual(exists, true);

			const content = fs.readFileSync(testFilepath, 'utf-8');
			const firstLine = content.split('\n')[0];
			assert.strictEqual(
				firstLine,
				'term_hash,term_name,category,rating,timestamp,was_correct,has_feedback'
			);
		});
	});

	describe('Adding Ratings', function () {
		it('should add a rating successfully', function () {
			const term = {
				term: 'Test Term',
				description: 'Test description',
				category: 'Test Category'
			};

			const success = storage.addRating(term, 5, true, false);
			assert.strictEqual(success, true);

			const ratings = storage.getAllRatings();
			assert.strictEqual(ratings.length, 1);
			assert.strictEqual(ratings[0].term_name, 'Test Term');
			assert.strictEqual(ratings[0].rating, 5);
			assert.strictEqual(ratings[0].was_correct, true);
			assert.strictEqual(ratings[0].has_feedback, false);
		});

		it('should handle terms with commas in name', function () {
			const term = {
				term: 'Test, Term',
				description: 'Test description',
				category: 'Test Category'
			};

			const success = storage.addRating(term, 4, false, true);
			assert.strictEqual(success, true);

			const ratings = storage.getAllRatings();
			assert.strictEqual(ratings.length, 1);
			assert.strictEqual(ratings[0].term_name, 'Test, Term');
		});

		it('should reject invalid ratings', function () {
			const term = {
				term: 'Test Term',
				description: 'Test description'
			};

			assert.strictEqual(storage.addRating(term, 0, true, false), false);
			assert.strictEqual(storage.addRating(term, 6, true, false), false);
			assert.strictEqual(storage.addRating(term, -1, true, false), false);
		});

		it('should allow multiple ratings for same term', function () {
			const term = {
				term: 'Test Term',
				description: 'Test description',
				category: 'Test Category'
			};

			storage.addRating(term, 3, true, false);
			storage.addRating(term, 5, true, false);

			const ratings = storage.getRatingsByTerm(term);
			assert.strictEqual(ratings.length, 2);
		});
	});

	describe('Retrieving Ratings', function () {
		it('should get all ratings', function () {
			const term1 = {
				term: 'Term 1',
				description: 'Description 1',
				category: 'Category 1'
			};
			const term2 = {
				term: 'Term 2',
				description: 'Description 2',
				category: 'Category 2'
			};

			storage.addRating(term1, 5, true, false);
			storage.addRating(term2, 3, false, true);

			const ratings = storage.getAllRatings();
			assert.strictEqual(ratings.length, 2);
		});

		it('should get ratings by term', function () {
			const term1 = {
				term: 'Term 1',
				description: 'Description 1',
				category: 'Category 1'
			};
			const term2 = {
				term: 'Term 2',
				description: 'Description 2',
				category: 'Category 2'
			};

			storage.addRating(term1, 5, true, false);
			storage.addRating(term1, 4, true, false);
			storage.addRating(term2, 3, false, true);

			const term1Ratings = storage.getRatingsByTerm(term1);
			assert.strictEqual(term1Ratings.length, 2);
			assert.strictEqual(term1Ratings[0].term_name, 'Term 1');
		});

		it('should calculate average rating', function () {
			const term = {
				term: 'Test Term',
				description: 'Test description',
				category: 'Test Category'
			};

			storage.addRating(term, 3, true, false);
			storage.addRating(term, 5, true, false);
			storage.addRating(term, 4, false, false);

			const avg = storage.getAverageRating(term);
			assert.strictEqual(avg, 4);
		});

		it('should return null for average of term with no ratings', function () {
			const term = {
				term: 'Test Term',
				description: 'Test description'
			};

			const avg = storage.getAverageRating(term);
			assert.strictEqual(avg, null);
		});
	});

	describe('Term Hash', function () {
		it('should generate consistent hashes for same term', function () {
			const term = {
				term: 'Test Term',
				description: 'Test description',
				example: 'Test example',
				prompt: 'Test prompt'
			};

			const hash1 = storage.generateTermHash(term);
			const hash2 = storage.generateTermHash(term);

			assert.strictEqual(hash1, hash2);
		});

		it('should generate different hashes for different terms', function () {
			const term1 = {
				term: 'Term 1',
				description: 'Description 1'
			};
			const term2 = {
				term: 'Term 2',
				description: 'Description 2'
			};

			const hash1 = storage.generateTermHash(term1);
			const hash2 = storage.generateTermHash(term2);

			assert.notStrictEqual(hash1, hash2);
		});
	});

	describe('CSV Handling', function () {
		it('should handle special characters in CSV', function () {
			const term = {
				term: 'Test "quoted" term',
				description: 'Description with\nnewline',
				category: 'Category, with, commas'
			};

			storage.addRating(term, 4, true, false);

			const ratings = storage.getAllRatings();
			assert.strictEqual(ratings.length, 1);
			assert.strictEqual(ratings[0].term_name, 'Test "quoted" term');
			assert.strictEqual(ratings[0].category, 'Category, with, commas');
		});
	});

	describe('Count and Clear', function () {
		it('should get correct count', function () {
			const term = {
				term: 'Test Term',
				description: 'Test description'
			};

			storage.addRating(term, 5, true, false);
			storage.addRating(term, 4, true, false);

			assert.strictEqual(storage.getCount(), 2);
		});

		it('should clear all ratings', function () {
			const term = {
				term: 'Test Term',
				description: 'Test description'
			};

			storage.addRating(term, 5, true, false);
			storage.clear();

			assert.strictEqual(storage.getCount(), 0);
			assert.strictEqual(fs.existsSync(testFilepath), true); // File should still exist with headers
		});
	});
});
