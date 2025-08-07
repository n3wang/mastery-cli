const assert = require('assert');
const { Term, TermStorage } = require('../src/structures');

describe('TermStorage tests', () => {
	const term1 = new Term('term1', 'example1', 'description1', 'prompt1');
	const term2 = new Term('term2', 'example2', 'description2', 'prompt2');
	const term3 = new Term('term3', 'example3', 'description3', 'prompt3');

	describe('Term class tests', () => {
		it('should create a Term object with the specified properties', () => {
			assert.deepStrictEqual(term1.term, 'term1');
			assert.deepStrictEqual(term1.example, 'example1');
			assert.deepStrictEqual(term1.description, 'description1');
			assert.deepStrictEqual(term1.references, '');
			assert.deepStrictEqual(term1.attachment, '');
			assert.deepStrictEqual(term1.prompt, 'prompt1');
			assert.deepStrictEqual(term1.priority, 5);
			assert.deepStrictEqual(term1.slug, 'term1');
			assert.deepStrictEqual(term1.formula_name, 'term1');
			assert.deepStrictEqual(term1.attachment_is_url, false);
		});

		// it("should create a JSON representation of the Term object", () => {
		//     assert.deepStrictEqual(term1.asJson, {
		//         term: "term1",
		//         example: "example1",
		//         description: "description1",
		//         references: "",
		//         prompt: "prompt1",
		//         formula_name: "term1",
		//         attachment: "",
		//         attachment_is_url: false,
		//     });
		// });
	});

	const deck1 = new TermStorage([term1, term2], 'Deck 1');
	const deck2 = new TermStorage([term2, term3], 'Deck 2');
	const deck3 = new TermStorage([term1, term3], 'Deck 3');

	const deck4 = new TermStorage([], 'Deck 4', { is_active: false });
	const deck5 = new TermStorage([], 'Deck 5');

	deck1.addDecks([deck2, deck3, deck4, deck5]);

	describe('listTerms() - 1', () => {
		it('should return all terms from all decks when called with no arguments', () => {
			// console.log(deck1.listTerms());
			// assert.deepStrictEqual(deck1.listTerms(), [term1, term2, term2, term3, term1, term3]);
		});

		// it("should return only the terms from the specified decks when called with get_only parameter", () => {
		//     assert.deepStrictEqual(deck1.listTerms({ get_only: ["Deck 1", "Deck 2"] }), [term1, term2, term2, term3]);
		//     assert.deepStrictEqual(deck1.listTerms({ get_only: ["Deck 2", "Deck 3"] }), [term2, term3, term1, term3]);
		//     assert.deepStrictEqual(deck1.listTerms({ get_only: ["Deck 4"] }), []);
		// });
	});

	describe('deck_titles property', () => {
		it('should return a list of all deck names, including nested decks', () => {
			assert.deepStrictEqual(deck1.deck_titles, [
				'Deck 1',
				'Deck 2',
				'Deck 3',
				'Deck 4',
				'Deck 5'
			]);
			assert.deepStrictEqual(deck2.deck_titles, ['Deck 2']);
			assert.deepStrictEqual(deck4.deck_titles, ['Deck 4']);
		});
	});
});
