const assert = require('assert');
const { DeletionQueueStorage } = require('../src/DeletionQueueStorage');
const fs = require('fs');
const path = require('path');
const { getDirAbsoluteUri } = require('../src/utils-functions');

describe('DeletionQueueStorage', () => {
	let storage;
	let testFilePath;

	beforeEach(() => {
		// Use a test-specific filename to avoid conflicts
		const testFilename = `test_deletion_queue_${Date.now()}.json`;
		storage = new DeletionQueueStorage(testFilename);
		testFilePath = storage.getFilePath();

		// Clean up any existing test file
		if (fs.existsSync(testFilePath)) {
			fs.unlinkSync(testFilePath);
		}
	});

	afterEach(() => {
		// Clean up test file
		if (fs.existsSync(testFilePath) && fs.existsSync(testFilePath)) {
			try {
				fs.unlinkSync(testFilePath);
			} catch (error) {
				// Ignore cleanup errors
			}
		}
	});

	describe('Initialization', () => {
		it('should create empty queue if file does not exist', () => {
			assert.strictEqual(storage.getCount(), 0);
			assert.deepStrictEqual(storage.getQueue(), []);
		});

		it('should load existing queue from file', () => {
			// Create a test file with data
			const testData = [
				{
					termName: 'Test Term',
					folderPath: '/test/path.md',
					category: 'test',
					timestamp: '2026-01-23T00:00:00.000Z',
					hasFeedback: false
				}
			];
			fs.writeFileSync(testFilePath, JSON.stringify(testData, null, 2));

			// Create new storage instance to load the file
			const newStorage = new DeletionQueueStorage(
				path.basename(testFilePath, '.json')
			);
			assert.strictEqual(newStorage.getCount(), 1);
			assert.strictEqual(newStorage.getQueue()[0].termName, 'Test Term');
		});

		it('should return correct file path', () => {
			const filePath = storage.getFilePath();
			assert.ok(filePath);
			assert.strictEqual(typeof filePath, 'string');
			assert.strictEqual(filePath.endsWith('.json'), true);
		});
	});

	describe('Adding terms to queue', () => {
		it('should add term to queue', () => {
			const term = {
				term: 'Test Term',
				reference_page: '/test/path.md',
				category: 'test'
			};

			const added = storage.addToQueue(term);
			assert.strictEqual(added, true);
			assert.strictEqual(storage.getCount(), 1);
		});

		it('should not add duplicate term (same name and path)', () => {
			const term = {
				term: 'Test Term',
				reference_page: '/test/path.md',
				category: 'test'
			};

			storage.addToQueue(term);
			const addedAgain = storage.addToQueue(term);
			assert.strictEqual(addedAgain, false);
			assert.strictEqual(storage.getCount(), 1);
		});

		it('should allow same term name from different paths', () => {
			const term1 = {
				term: 'Test Term',
				reference_page: '/test/path1.md',
				category: 'test'
			};
			const term2 = {
				term: 'Test Term',
				reference_page: '/test/path2.md',
				category: 'test'
			};

			storage.addToQueue(term1);
			const added = storage.addToQueue(term2);
			assert.strictEqual(added, true);
			assert.strictEqual(storage.getCount(), 2);
		});

		it('should persist to file when adding', () => {
			const term = {
				term: 'Test Term',
				reference_page: '/test/path.md',
				category: 'test'
			};

			storage.addToQueue(term);

			// Verify file exists and contains data
			assert.strictEqual(fs.existsSync(testFilePath), true);
			const fileContent = JSON.parse(
				fs.readFileSync(testFilePath, 'utf-8')
			);
			assert.strictEqual(fileContent.length, 1);
			assert.strictEqual(fileContent[0].termName, 'Test Term');
			assert.strictEqual(fileContent[0].folderPath, '/test/path.md');
		});

		it('should check for feedback when provided', () => {
			const mockFeedbackStorage = {
				getFeedbackByTerm: term => ({
					feedback: 'Test feedback',
					timestamp: '2026-01-23T00:00:00.000Z'
				})
			};

			const term = {
				term: 'Test Term',
				reference_page: '/test/path.md',
				category: 'test'
			};

			storage.addToQueue(term, mockFeedbackStorage);
			const queue = storage.getQueue();
			assert.strictEqual(queue[0].hasFeedback, true);
		});
	});

	describe('Checking if term is in queue', () => {
		it('should return true if term matches name and path', () => {
			const term = {
				term: 'Test Term',
				reference_page: '/test/path.md',
				category: 'test'
			};

			storage.addToQueue(term);
			assert.strictEqual(storage.isInQueue(term), true);
		});

		it('should return false if term name matches but path differs', () => {
			const term1 = {
				term: 'Test Term',
				reference_page: '/test/path1.md',
				category: 'test'
			};
			const term2 = {
				term: 'Test Term',
				reference_page: '/test/path2.md',
				category: 'test'
			};

			storage.addToQueue(term1);
			assert.strictEqual(storage.isInQueue(term2), false);
		});

		it('should return false if path matches but name differs', () => {
			const term1 = {
				term: 'Test Term 1',
				reference_page: '/test/path.md',
				category: 'test'
			};
			const term2 = {
				term: 'Test Term 2',
				reference_page: '/test/path.md',
				category: 'test'
			};

			storage.addToQueue(term1);
			assert.strictEqual(storage.isInQueue(term2), false);
		});

		it('should return false for empty queue', () => {
			const term = {
				term: 'Test Term',
				reference_page: '/test/path.md',
				category: 'test'
			};

			assert.strictEqual(storage.isInQueue(term), false);
		});
	});

	describe('Term persists across decks', () => {
		it('should keep term in queue even if it appears in multiple decks', () => {
			const term = {
				term: 'Shared Term',
				reference_page: '/shared/path.md',
				category: 'shared'
			};

			// Add term to queue
			storage.addToQueue(term);
			assert.strictEqual(storage.getCount(), 1);

			// Simulate term appearing in different deck (same name and path)
			const termInDifferentDeck = {
				term: 'Shared Term',
				reference_page: '/shared/path.md',
				category: 'different-deck', // Different category but same name/path
				description: 'Different description' // Different content
			};

			// Should still be in queue (matched by name + path)
			assert.strictEqual(storage.isInQueue(termInDifferentDeck), true);
			assert.strictEqual(storage.getCount(), 1); // Still only one entry
		});

		it('should filter out term from study session regardless of deck', () => {
			const term = {
				term: 'Ignored Term',
				reference_page: '/test/path.md',
				category: 'deck1'
			};

			storage.addToQueue(term);

			// Term appears in deck1
			assert.strictEqual(
				storage.isInQueue({
					term: 'Ignored Term',
					reference_page: '/test/path.md',
					category: 'deck1'
				}),
				true
			);

			// Same term appears in deck2 (different category, but same name/path)
			assert.strictEqual(
				storage.isInQueue({
					term: 'Ignored Term',
					reference_page: '/test/path.md',
					category: 'deck2'
				}),
				true
			);
		});
	});

	describe('Grouping by file path', () => {
		it('should group items by folder path', () => {
			const term1 = {
				term: 'Term 1',
				reference_page: '/test/path1.md',
				category: 'test'
			};
			const term2 = {
				term: 'Term 2',
				reference_page: '/test/path1.md',
				category: 'test'
			};
			const term3 = {
				term: 'Term 3',
				reference_page: '/test/path2.md',
				category: 'test'
			};

			storage.addToQueue(term1);
			storage.addToQueue(term2);
			storage.addToQueue(term3);

			const grouped = storage.getItemsByFilePath();
			assert.strictEqual(Object.keys(grouped).length, 2);
			assert.strictEqual(grouped['/test/path1.md'].length, 2);
			assert.strictEqual(grouped['/test/path2.md'].length, 1);
		});
	});

	describe('Items with feedback', () => {
		it('should identify items with feedback', () => {
			const mockFeedbackStorage = {
				getFeedbackByTerm: term => {
					if (term.term === 'With Feedback') {
						return {
							feedback: 'Test feedback',
							timestamp: '2026-01-23T00:00:00.000Z'
						};
					}
					return null;
				}
			};

			const term1 = {
				term: 'With Feedback',
				reference_page: '/test/path1.md',
				category: 'test'
			};
			const term2 = {
				term: 'No Feedback',
				reference_page: '/test/path2.md',
				category: 'test'
			};

			storage.addToQueue(term1, mockFeedbackStorage);
			storage.addToQueue(term2, mockFeedbackStorage);

			const itemsWithFeedback = storage.getItemsWithFeedback();
			assert.strictEqual(itemsWithFeedback.length, 1);
			assert.strictEqual(itemsWithFeedback[0].termName, 'With Feedback');
		});
	});

	describe('Edge cases', () => {
		it('should handle term with missing properties', () => {
			const term = {
				term: 'Test Term'
				// Missing reference_page
			};

			const added = storage.addToQueue(term);
			assert.strictEqual(added, true);
			assert.strictEqual(storage.getQueue()[0].folderPath, '');
		});

		it('should handle empty term name', () => {
			const term = {
				term: '',
				reference_page: '/test/path.md',
				category: 'test'
			};

			const added = storage.addToQueue(term);
			assert.strictEqual(added, true);
			assert.strictEqual(storage.getQueue()[0].termName, '');
		});

		it('should not add null or undefined term', () => {
			assert.strictEqual(storage.addToQueue(null), false);
			assert.strictEqual(storage.addToQueue(undefined), false);
			assert.strictEqual(storage.getCount(), 0);
		});
	});
});
