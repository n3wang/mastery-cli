const { HashStorage } = require('../src/HashStorage');
const fs = require('fs');
const path = require('path');
const assert = require('assert');

describe('HashStorage', function () {
	let hashStorage;
	let testFilepath;

	beforeEach(function () {
		// Create a test instance with unique filename
		const testId = Date.now() + Math.random();
		hashStorage = new HashStorage(`test_hash_storage_${testId}`);
		testFilepath = hashStorage.filepath;
	});

	afterEach(function () {
		// Clean up test files
		if (fs.existsSync(testFilepath)) {
			fs.unlinkSync(testFilepath);
		}
	});

	describe('Constructor', function () {
		it('should initialize with empty data object', function () {
			assert.deepEqual(hashStorage.data, {});
		});

		it('should set correct filepath', function () {
			assert(hashStorage.filepath.includes('test_hash_storage_'));
			assert(hashStorage.filepath.endsWith('.json'));
		});

		it('should use default filename when none provided', function () {
			const defaultStorage = new HashStorage();
			assert(
				defaultStorage.filepath.includes('term_completion_hashes.json')
			);
		});
	});

	describe('Basic Operations', function () {
		it('should return 0 for non-existent hash', function () {
			const count = hashStorage.getCount('nonexistent');
			assert.equal(count, 0);
		});

		it('should set and get count correctly', function () {
			hashStorage.setCount('hash1', 5);
			assert.equal(hashStorage.getCount('hash1'), 5);
		});

		it('should increment count correctly', function () {
			const newCount = hashStorage.incrementCount('hash2');
			assert.equal(newCount, 1);
			assert.equal(hashStorage.getCount('hash2'), 1);
		});

		it('should increment existing count correctly', function () {
			hashStorage.setCount('hash3', 3);
			const newCount = hashStorage.incrementCount('hash3');
			assert.equal(newCount, 4);
			assert.equal(hashStorage.getCount('hash3'), 4);
		});

		it('should return all counts', function () {
			hashStorage.setCount('hash1', 1);
			hashStorage.setCount('hash2', 2);
			hashStorage.setCount('hash3', 3);

			const allCounts = hashStorage.getAllCounts();
			assert.deepEqual(allCounts, {
				hash1: 1,
				hash2: 2,
				hash3: 3
			});
		});

		it('should clear all data', function () {
			hashStorage.setCount('hash1', 1);
			hashStorage.setCount('hash2', 2);

			hashStorage.clear();
			assert.deepEqual(hashStorage.data, {});
			assert.equal(hashStorage.getCount('hash1'), 0);
			assert.equal(hashStorage.getCount('hash2'), 0);
		});
	});

	describe('Data Structure', function () {
		it('should store data at root level', function () {
			hashStorage.setCount('abc123', 5);
			hashStorage.setCount('def456', 10);

			// Verify direct access to root level
			assert.equal(hashStorage.data['abc123'], 5);
			assert.equal(hashStorage.data['def456'], 10);
		});

		it('should maintain simple hash:count structure', function () {
			hashStorage.incrementCount('hash1');
			hashStorage.incrementCount('hash1');
			hashStorage.incrementCount('hash2');

			const expectedStructure = {
				hash1: 2,
				hash2: 1
			};

			assert.deepEqual(hashStorage.data, expectedStructure);
		});
	});

	describe('File Operations', function () {
		it('should load empty data when file does not exist', async function () {
			const result = await hashStorage.load();
			assert.equal(result, true);
			assert.deepEqual(hashStorage.data, {});
		});

		it('should save data to file', async function () {
			hashStorage.setCount('hash1', 5);
			hashStorage.setCount('hash2', 10);

			const result = await hashStorage.save();
			assert.equal(result, true);
			assert(fs.existsSync(testFilepath));

			// Verify file content
			const fileContent = fs.readFileSync(testFilepath, 'utf8');
			const parsedData = JSON.parse(fileContent);
			assert.deepEqual(parsedData, {
				hash1: 5,
				hash2: 10
			});
		});

		it('should load data from file', async function () {
			// First save some data
			hashStorage.setCount('hash1', 3);
			hashStorage.setCount('hash2', 7);
			await hashStorage.save();

			// Create new instance and load
			const newStorage = new HashStorage(hashStorage.filename);
			const result = await newStorage.load();

			assert.equal(result, true);
			assert.equal(newStorage.getCount('hash1'), 3);
			assert.equal(newStorage.getCount('hash2'), 7);
		});

		it('should handle corrupted file gracefully', async function () {
			// Create corrupted file
			const dir = path.dirname(testFilepath);
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir, { recursive: true });
			}
			fs.writeFileSync(testFilepath, 'invalid json content', 'utf8');

			const result = await hashStorage.load();
			assert.equal(result, false);
			assert.deepEqual(hashStorage.data, {});
		});

		it('should create directory if it does not exist', async function () {
			// Use a path with non-existent directory
			const deepPath = new HashStorage('deep/nested/test_storage');
			deepPath.setCount('test', 1);

			const result = await deepPath.save();
			assert.equal(result, true);
			assert(fs.existsSync(deepPath.filepath));

			// Clean up
			fs.unlinkSync(deepPath.filepath);
			fs.rmdirSync(path.dirname(deepPath.filepath));
			fs.rmdirSync(path.dirname(path.dirname(deepPath.filepath)));
		});
	});

	describe('Persistence Integration', function () {
		it('should maintain data across save/load cycles', async function () {
			// Set initial data
			hashStorage.setCount('term1', 5);
			hashStorage.incrementCount('term2');
			hashStorage.incrementCount('term2');
			hashStorage.incrementCount('term3');

			await hashStorage.save();

			// Load in new instance
			const newStorage = new HashStorage(hashStorage.filename);
			await newStorage.load();

			assert.equal(newStorage.getCount('term1'), 5);
			assert.equal(newStorage.getCount('term2'), 2);
			assert.equal(newStorage.getCount('term3'), 1);
			assert.equal(newStorage.getCount('nonexistent'), 0);
		});

		it('should handle multiple operations and persist correctly', async function () {
			// Simulate real usage pattern
			const operations = [
				() => hashStorage.incrementCount('hash_a'),
				() => hashStorage.incrementCount('hash_b'),
				() => hashStorage.incrementCount('hash_a'),
				() => hashStorage.setCount('hash_c', 10),
				() => hashStorage.incrementCount('hash_b'),
				() => hashStorage.incrementCount('hash_d')
			];

			// Execute operations
			operations.forEach(op => op());
			await hashStorage.save();

			// Verify in new instance
			const verifyStorage = new HashStorage(hashStorage.filename);
			await verifyStorage.load();

			assert.equal(verifyStorage.getCount('hash_a'), 2);
			assert.equal(verifyStorage.getCount('hash_b'), 2);
			assert.equal(verifyStorage.getCount('hash_c'), 10);
			assert.equal(verifyStorage.getCount('hash_d'), 1);
		});
	});

	describe('Edge Cases', function () {
		it('should handle empty string hash', function () {
			hashStorage.setCount('', 5);
			assert.equal(hashStorage.getCount(''), 5);
		});

		it('should handle zero count', function () {
			hashStorage.setCount('hash', 0);
			assert.equal(hashStorage.getCount('hash'), 0);
		});

		it('should handle negative count', function () {
			hashStorage.setCount('hash', -5);
			assert.equal(hashStorage.getCount('hash'), -5);
		});

		it('should handle special characters in hash', function () {
			const specialHash = 'hash!@#$%^&*()_+-=[]{}|;:,.<>?';
			hashStorage.setCount(specialHash, 3);
			assert.equal(hashStorage.getCount(specialHash), 3);
		});

		it('should handle large numbers', function () {
			const largeNumber = 999999999;
			hashStorage.setCount('hash', largeNumber);
			assert.equal(hashStorage.getCount('hash'), largeNumber);
		});
	});

	describe('Real-world Usage Simulation', function () {
		it('should simulate term completion tracking', async function () {
			// Simulate hash-based term completion tracking
			const termHashes = {
				array_term: '0b65aa35',
				hashmap_term: '582ad1ea',
				stack_term: 'a39f516c',
				queue_term: '84c245bb'
			};

			// Simulate different completion frequencies
			// Array practiced most
			for (let i = 0; i < 5; i++) {
				hashStorage.incrementCount(termHashes.array_term);
			}

			// HashMap practiced moderately
			for (let i = 0; i < 2; i++) {
				hashStorage.incrementCount(termHashes.hashmap_term);
			}

			// Stack practiced once
			hashStorage.incrementCount(termHashes.stack_term);

			// Queue never practiced (count = 0)

			await hashStorage.save();

			// Verify the completion counts
			assert.equal(hashStorage.getCount(termHashes.array_term), 5);
			assert.equal(hashStorage.getCount(termHashes.hashmap_term), 2);
			assert.equal(hashStorage.getCount(termHashes.stack_term), 1);
			assert.equal(hashStorage.getCount(termHashes.queue_term), 0);

			// Test smart selection logic (least practiced first)
			const allCounts = hashStorage.getAllCounts();
			const storedHashes = Object.keys(allCounts);
			const sortedByCompletion = Object.entries(allCounts)
				.sort(([, a], [, b]) => a - b)
				.map(([hash, count]) => ({ hash, count }));

			// Verify stored data structure
			assert.equal(Object.keys(allCounts).length, 3); // Only stored non-zero counts
			assert.equal(allCounts[termHashes.array_term], 5);
			assert.equal(allCounts[termHashes.hashmap_term], 2);
			assert.equal(allCounts[termHashes.stack_term], 1);
			assert(!storedHashes.includes(termHashes.queue_term)); // Queue not stored (0 count)

			// Test sorting logic - Stack should be first (1 completion), then HashMap (2), then Array (5)
			assert.equal(sortedByCompletion[0].hash, termHashes.stack_term);
			assert.equal(sortedByCompletion[0].count, 1);
			assert.equal(sortedByCompletion[1].hash, termHashes.hashmap_term);
			assert.equal(sortedByCompletion[1].count, 2);
			assert.equal(sortedByCompletion[2].hash, termHashes.array_term);
			assert.equal(sortedByCompletion[2].count, 5);
		});
	});
});
