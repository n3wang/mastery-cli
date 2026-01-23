const { DeletionQueueStorage } = require('../src/DeletionQueueStorage');
const fs = require('fs');
const path = require('path');
const { getDirAbsoluteUri } = require('../src/utils_functions');

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
		test('should create empty queue if file does not exist', () => {
			expect(storage.getCount()).toBe(0);
			expect(storage.getQueue()).toEqual([]);
		});

		test('should load existing queue from file', () => {
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
			const newStorage = new DeletionQueueStorage(path.basename(testFilePath));
			expect(newStorage.getCount()).toBe(1);
			expect(newStorage.getQueue()[0].termName).toBe('Test Term');
		});

		test('should return correct file path', () => {
			const filePath = storage.getFilePath();
			expect(filePath).toBeTruthy();
			expect(typeof filePath).toBe('string');
			expect(filePath.endsWith('.json')).toBe(true);
		});
	});

	describe('Adding terms to queue', () => {
		test('should add term to queue', () => {
			const term = {
				term: 'Test Term',
				reference_page: '/test/path.md',
				category: 'test'
			};

			const added = storage.addToQueue(term);
			expect(added).toBe(true);
			expect(storage.getCount()).toBe(1);
		});

		test('should not add duplicate term (same name and path)', () => {
			const term = {
				term: 'Test Term',
				reference_page: '/test/path.md',
				category: 'test'
			};

			storage.addToQueue(term);
			const addedAgain = storage.addToQueue(term);
			expect(addedAgain).toBe(false);
			expect(storage.getCount()).toBe(1);
		});

		test('should allow same term name from different paths', () => {
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
			expect(added).toBe(true);
			expect(storage.getCount()).toBe(2);
		});

		test('should persist to file when adding', () => {
			const term = {
				term: 'Test Term',
				reference_page: '/test/path.md',
				category: 'test'
			};

			storage.addToQueue(term);
			
			// Verify file exists and contains data
			expect(fs.existsSync(testFilePath)).toBe(true);
			const fileContent = JSON.parse(fs.readFileSync(testFilePath, 'utf-8'));
			expect(fileContent.length).toBe(1);
			expect(fileContent[0].termName).toBe('Test Term');
			expect(fileContent[0].folderPath).toBe('/test/path.md');
		});

		test('should check for feedback when provided', () => {
			const mockFeedbackStorage = {
				getFeedbackByTerm: jest.fn((term) => ({
					feedback: 'Test feedback',
					timestamp: '2026-01-23T00:00:00.000Z'
				}))
			};

			const term = {
				term: 'Test Term',
				reference_page: '/test/path.md',
				category: 'test'
			};

			storage.addToQueue(term, mockFeedbackStorage);
			const queue = storage.getQueue();
			expect(queue[0].hasFeedback).toBe(true);
		});
	});

	describe('Checking if term is in queue', () => {
		test('should return true if term matches name and path', () => {
			const term = {
				term: 'Test Term',
				reference_page: '/test/path.md',
				category: 'test'
			};

			storage.addToQueue(term);
			expect(storage.isInQueue(term)).toBe(true);
		});

		test('should return false if term name matches but path differs', () => {
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
			expect(storage.isInQueue(term2)).toBe(false);
		});

		test('should return false if path matches but name differs', () => {
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
			expect(storage.isInQueue(term2)).toBe(false);
		});

		test('should return false for empty queue', () => {
			const term = {
				term: 'Test Term',
				reference_page: '/test/path.md',
				category: 'test'
			};

			expect(storage.isInQueue(term)).toBe(false);
		});
	});

	describe('Term persists across decks', () => {
		test('should keep term in queue even if it appears in multiple decks', () => {
			const term = {
				term: 'Shared Term',
				reference_page: '/shared/path.md',
				category: 'shared'
			};

			// Add term to queue
			storage.addToQueue(term);
			expect(storage.getCount()).toBe(1);

			// Simulate term appearing in different deck (same name and path)
			const termInDifferentDeck = {
				term: 'Shared Term',
				reference_page: '/shared/path.md',
				category: 'different-deck', // Different category but same name/path
				description: 'Different description' // Different content
			};

			// Should still be in queue (matched by name + path)
			expect(storage.isInQueue(termInDifferentDeck)).toBe(true);
			expect(storage.getCount()).toBe(1); // Still only one entry
		});

		test('should filter out term from study session regardless of deck', () => {
			const term = {
				term: 'Ignored Term',
				reference_page: '/test/path.md',
				category: 'deck1'
			};

			storage.addToQueue(term);

			// Term appears in deck1
			expect(storage.isInQueue({
				term: 'Ignored Term',
				reference_page: '/test/path.md',
				category: 'deck1'
			})).toBe(true);

			// Same term appears in deck2 (different category, but same name/path)
			expect(storage.isInQueue({
				term: 'Ignored Term',
				reference_page: '/test/path.md',
				category: 'deck2'
			})).toBe(true);
		});
	});

	describe('Grouping by file path', () => {
		test('should group items by folder path', () => {
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
			expect(Object.keys(grouped).length).toBe(2);
			expect(grouped['/test/path1.md'].length).toBe(2);
			expect(grouped['/test/path2.md'].length).toBe(1);
		});
	});

	describe('Items with feedback', () => {
		test('should identify items with feedback', () => {
			const mockFeedbackStorage = {
				getFeedbackByTerm: jest.fn((term) => {
					if (term.term === 'With Feedback') {
						return { feedback: 'Test feedback', timestamp: '2026-01-23T00:00:00.000Z' };
					}
					return null;
				})
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
			expect(itemsWithFeedback.length).toBe(1);
			expect(itemsWithFeedback[0].termName).toBe('With Feedback');
		});
	});

	describe('Edge cases', () => {
		test('should handle term with missing properties', () => {
			const term = {
				term: 'Test Term'
				// Missing reference_page
			};

			const added = storage.addToQueue(term);
			expect(added).toBe(true);
			expect(storage.getQueue()[0].folderPath).toBe('');
		});

		test('should handle empty term name', () => {
			const term = {
				term: '',
				reference_page: '/test/path.md',
				category: 'test'
			};

			const added = storage.addToQueue(term);
			expect(added).toBe(true);
			expect(storage.getQueue()[0].termName).toBe('');
		});

		test('should not add null or undefined term', () => {
			expect(storage.addToQueue(null)).toBe(false);
			expect(storage.addToQueue(undefined)).toBe(false);
			expect(storage.getCount()).toBe(0);
		});
	});
});
