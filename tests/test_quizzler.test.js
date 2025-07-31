/**
 * Testing the Quizzer hash-based term selection functionality
 */

const { Quizzer } = require('../src/Quizzer');
const { HashStorage } = require('../src/HashStorage');
const assert = require('assert');
const fs = require('fs');

describe("Quizzer Hash-Based Selection Tests", () => {
    let quizzer;
    let mockMasterDeck;
    let mockMasteryManager;
    let testTerms;

    beforeEach(function() {
        // Setup test terms with varied characteristics
        testTerms = [
            { term: 'Array', description: 'Linear data structure', example: 'let arr = [1,2,3]', category: 'data-structures' },
            { term: 'Hash Map', description: 'Key-value store', example: 'let map = new Map()', category: 'data-structures' },
            { term: 'Binary Tree', description: 'Tree with max 2 children per node', example: 'class TreeNode {}', category: 'data-structures' },
            { term: 'Stack', description: 'LIFO data structure', example: 'let stack = []', category: 'data-structures' },
            { term: 'Queue', description: 'FIFO data structure', example: 'let queue = []', category: 'data-structures' },
            { term: 'Graph', description: 'Nodes connected by edges', example: 'class Graph {}', category: 'data-structures' }
        ];

        // Mock master deck
        mockMasterDeck = {
            listTerms: () => testTerms
        };

        // Mock mastery manager
        mockMasteryManager = {
            logSkillExperience: async () => ({ success: true })
        };

        // Create quizzer with unique hash storage for each test
        quizzer = new Quizzer([], [], mockMasterDeck, mockMasteryManager);
        const testId = Date.now() + Math.random();
        quizzer.termCompletionTracker = new HashStorage(`test_quizzer_${testId}`);
        quizzer.termCompletionTracker.load();
    });

    afterEach(function() {
        // Clean up test files
        if (quizzer.termCompletionTracker && fs.existsSync(quizzer.termCompletionTracker.filepath)) {
            fs.unlinkSync(quizzer.termCompletionTracker.filepath);
        }
    });

    describe("Hash Generation", () => {
        it("should generate consistent hashes for terms", () => {
            const term = testTerms[0];
            const hash1 = quizzer.generateTermHash(term);
            const hash2 = quizzer.generateTermHash(term);
            
            assert.equal(hash1, hash2);
            assert.equal(typeof hash1, 'string');
            assert.equal(hash1.length, 8); // Default hash length
        });

        it("should generate different hashes for different terms", () => {
            const hash1 = quizzer.generateTermHash(testTerms[0]);
            const hash2 = quizzer.generateTermHash(testTerms[1]);
            
            assert.notEqual(hash1, hash2);
        });

        it("should generate same hash for terms with same content", () => {
            const term1 = { term: 'Test', description: 'Description', example: 'Example' };
            const term2 = { term: 'Test', description: 'Description', example: 'Example' };
            
            const hash1 = quizzer.generateTermHash(term1);
            const hash2 = quizzer.generateTermHash(term2);
            
            assert.equal(hash1, hash2);
        });
    });

    describe("Completion Count Tracking", () => {
        it("should return 0 for new terms", () => {
            const hash = quizzer.generateTermHash(testTerms[0]);
            const count = quizzer.getTermCompletionCount(hash);
            assert.equal(count, 0);
        });

        it("should record term completions correctly", async () => {
            const term = testTerms[0];
            await quizzer.recordTermCompletion(term);
            
            const hash = quizzer.generateTermHash(term);
            const count = quizzer.getTermCompletionCount(hash);
            assert.equal(count, 1);
        });

        it("should increment completion count for repeated completions", async () => {
            const term = testTerms[0];
            
            await quizzer.recordTermCompletion(term);
            await quizzer.recordTermCompletion(term);
            await quizzer.recordTermCompletion(term);
            
            const hash = quizzer.generateTermHash(term);
            const count = quizzer.getTermCompletionCount(hash);
            assert.equal(count, 3);
        });

        it("should persist completion counts across sessions", async () => {
            const term = testTerms[0];
            await quizzer.recordTermCompletion(term);
            await quizzer.recordTermCompletion(term);
            
            // Create new quizzer instance with same storage
            const newQuizzer = new Quizzer([], [], mockMasterDeck, mockMasteryManager);
            newQuizzer.termCompletionTracker = new HashStorage(quizzer.termCompletionTracker.filename);
            await newQuizzer.termCompletionTracker.load();
            
            const hash = newQuizzer.generateTermHash(term);
            const count = newQuizzer.getTermCompletionCount(hash);
            assert.equal(count, 2);
        });
    });

    describe("Smart Selection Algorithm - Prioritizes Least Practiced", () => {
        beforeEach(async function() {
            // Setup terms with different completion counts
            // Array: 5 completions (most practiced)
            for (let i = 0; i < 5; i++) {
                await quizzer.recordTermCompletion(testTerms[0]);
            }
            
            // Hash Map: 3 completions
            for (let i = 0; i < 3; i++) {
                await quizzer.recordTermCompletion(testTerms[1]);
            }
            
            // Binary Tree: 1 completion
            await quizzer.recordTermCompletion(testTerms[2]);
            
            // Stack, Queue, Graph: 0 completions (never practiced)
        });

        it("should prioritize least practiced terms", () => {
            const selectedTerms = quizzer.selectLeastPracticedTerms(testTerms, 3);
            
            // Verify we get 3 terms
            assert.equal(selectedTerms.length, 3);
            
            // Check that selected terms are among the least practiced
            const selectedHashes = selectedTerms.map(term => quizzer.generateTermHash(term));
            const selectedCounts = selectedHashes.map(hash => quizzer.getTermCompletionCount(hash));
            
            // Should prioritize terms with lower completion counts
            selectedCounts.forEach((count, index) => {
                if (index > 0) {
                    assert(count >= selectedCounts[index - 1], 
                        `Selection should be sorted by completion count (ascending)`);
                }
            });
        });

        it("should include unpracticed terms first", () => {
            const selectedTerms = quizzer.selectLeastPracticedTerms(testTerms, 4);
            const selectedCounts = selectedTerms.map(term => {
                const hash = quizzer.generateTermHash(term);
                return quizzer.getTermCompletionCount(hash);
            });
            
            // Should include unpracticed terms (count = 0)
            const unpracticedCount = selectedCounts.filter(count => count === 0).length;
            assert(unpracticedCount >= 1, "Should prioritize unpracticed terms");
        });

        it("should respect the limit parameter", () => {
            const limit = 2;
            const selectedTerms = quizzer.selectLeastPracticedTerms(testTerms, limit);
            assert.equal(selectedTerms.length, limit);
        });

        it("should handle case where limit exceeds available terms", () => {
            const selectedTerms = quizzer.selectLeastPracticedTerms(testTerms, 100);
            assert(selectedTerms.length <= testTerms.length);
        });

        it("should demonstrate selection strategy with specific scenario", () => {
            // Test with a smaller, more controlled set
            const controlledTerms = testTerms.slice(0, 4); // Array, HashMap, BinaryTree, Stack
            const selectedTerms = quizzer.selectLeastPracticedTerms(controlledTerms, 2);
            
            // Get completion counts for verification
            const results = selectedTerms.map(term => ({
                term: term.term,
                count: quizzer.getTermCompletionCount(quizzer.generateTermHash(term))
            }));
            
            // Should select the two least practiced terms
            // Stack (0) and Binary Tree (1) should be prioritized over HashMap (3) and Array (5)
            const hasUnpracticed = results.some(r => r.count === 0);
            const hasLeastPracticed = results.some(r => r.count <= 1);
            
            assert(hasUnpracticed || hasLeastPracticed, 
                "Should select from least practiced terms");
        });
    });

    describe("Integration with getYoungest Method", () => {
        it("should use hash-based selection when randomOffline is true", async () => {
            // Setup some completion history
            await quizzer.recordTermCompletion(testTerms[0]); // Array: 1 completion
            await quizzer.recordTermCompletion(testTerms[0]); // Array: 2 completions
            
            const selectedTerms = await quizzer.getYoungest(testTerms, { 
                randomOffline: true, 
                limit: 3 
            });
            
            assert.equal(selectedTerms.length, 3);
            
            // Verify that less practiced terms are prioritized
            const selectedCounts = selectedTerms.map(term => {
                const hash = quizzer.generateTermHash(term);
                return quizzer.getTermCompletionCount(hash);
            });
            
            // Should include terms with 0 completions before terms with 2 completions
            const hasUnpracticed = selectedCounts.includes(0);
            assert(hasUnpracticed, "Should prioritize unpracticed terms");
        });

        it("should fall back to random selection when hash-based selection is disabled", async () => {
            // Temporarily disable hash-based selection
            const originalSettings = require('../src/settings');
            const mockSettings = {
                ...originalSettings,
                queue_configurations: {
                    ...originalSettings.queue_configurations,
                    hash_based_selection: {
                        enabled: false
                    }
                }
            };
            
            // Mock the settings temporarily
            const settingsPath = require.resolve('../src/settings');
            delete require.cache[settingsPath];
            require.cache[settingsPath] = { exports: mockSettings };
            
            const selectedTerms = await quizzer.getYoungest(testTerms, { 
                randomOffline: true, 
                limit: 3 
            });
            
            assert.equal(selectedTerms.length, 3);
            
            // Restore original settings
            delete require.cache[settingsPath];
        });

        it("should return all potential questions when randomOffline is false", async () => {
            const result = await quizzer.getYoungest(testTerms, { 
                randomOffline: false 
            });
            
            // When randomOffline is false, should return all potential questions
            assert.deepEqual(result, testTerms);
        });
    });

    describe("Real-world Usage Scenarios", () => {
        it("should handle mixed completion patterns correctly", async () => {
            // Simulate realistic usage patterns
            const usagePatterns = [
                { term: testTerms[0], completions: 10 }, // Very practiced
                { term: testTerms[1], completions: 5 },  // Moderately practiced
                { term: testTerms[2], completions: 2 },  // Lightly practiced
                { term: testTerms[3], completions: 1 },  // Barely practiced
                // testTerms[4] and testTerms[5] remain unpracticed (0 completions)
            ];
            
            // Apply usage patterns
            for (const pattern of usagePatterns) {
                for (let i = 0; i < pattern.completions; i++) {
                    await quizzer.recordTermCompletion(pattern.term);
                }
            }
            
            // Test selection prioritizes least practiced
            const selectedTerms = quizzer.selectLeastPracticedTerms(testTerms, 3);
            const selectedCounts = selectedTerms.map(term => {
                const hash = quizzer.generateTermHash(term);
                return quizzer.getTermCompletionCount(hash);
            });
            
            // Should prioritize unpracticed (0) and barely practiced (1-2) terms
            const maxSelectedCount = Math.max(...selectedCounts);
            assert(maxSelectedCount <= 2, 
                "Should prioritize terms with low completion counts over highly practiced terms");
        });

        it("should demonstrate adaptive learning behavior", async () => {
            // Start with all terms unpracticed
            let selectedTerms = quizzer.selectLeastPracticedTerms(testTerms, 2);
            
            // Initially, all terms have equal priority (0 completions)
            selectedTerms.forEach(term => {
                const hash = quizzer.generateTermHash(term);
                const count = quizzer.getTermCompletionCount(hash);
                assert.equal(count, 0);
            });
            
            // Practice one term
            await quizzer.recordTermCompletion(selectedTerms[0]);
            
            // Now selection should avoid the practiced term
            const newSelection = quizzer.selectLeastPracticedTerms(testTerms, 2);
            const newSelectionCounts = newSelection.map(term => {
                const hash = quizzer.generateTermHash(term);
                return quizzer.getTermCompletionCount(hash);
            });
            
            // Should prioritize unpracticed terms (count = 0)
            const unpracticedInNewSelection = newSelectionCounts.filter(count => count === 0).length;
            assert(unpracticedInNewSelection > 0, 
                "Should adapt to avoid recently practiced terms");
        });
    });
});



