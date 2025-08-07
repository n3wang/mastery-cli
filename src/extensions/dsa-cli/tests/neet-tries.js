const assert = require('assert');
const ProblemTests = require('./problem-test');

class DesignAddAndSearchWordsDataStructure extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test1());
		this.tests.push(() => this.test2());
	}

	test1() {
		const wordDictionary = new this.Problem();
		this.current_test_name = '[bad, dad, mad] | [pad, bad, .ad, b..]';

		wordDictionary.addWord('bad');
		wordDictionary.addWord('dad');
		wordDictionary.addWord('mad');
		assert(wordDictionary.search('pad') == false);
		assert(wordDictionary.search('bad') == true);
		assert(wordDictionary.search('.ad') == true);
		assert(wordDictionary.search('b..') == true);
	}

	test2() {
		const wordDictionary = new this.Problem();
		this.current_test_name = '[a, a] | [., a, aa, a, .a, a.]';

		wordDictionary.addWord('a');
		wordDictionary.addWord('a');
		assert(wordDictionary.search('.') == true);
		assert(wordDictionary.search('a') == true);
		assert(wordDictionary.search('aa') == false);
		assert(wordDictionary.search('a') == true);
		assert(wordDictionary.search('.a') == false);
		assert(wordDictionary.search('a.') == false);
	}
}

class WordSearch extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
		this.tests.push(() => this.test_3());
	}

	test_1() {
		const wordSearch = new this.Problem();
		this.current_test_name =
			'[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]] | ABCCED';

		const board = [
			['A', 'B', 'C', 'E'],
			['S', 'F', 'C', 'S'],
			['A', 'D', 'E', 'E']
		];

		const word = 'ABCCED';

		assert(wordSearch.solve(board, word) == true);
	}

	test_2() {
		const wordSearch = new this.Problem();
		this.current_test_name =
			'[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]] | SEE';

		const board = [
			['A', 'B', 'C', 'E'],
			['S', 'F', 'C', 'S'],
			['A', 'D', 'E', 'E']
		];

		const word = 'SEE';
		assert(wordSearch.solve(board, word) == true);
	}

	test_3() {
		const wordSearch = new this.Problem();
		this.current_test_name =
			'[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]] | ABCB';

		const board = [
			['A', 'B', 'C', 'E'],
			['S', 'F', 'C', 'S'],
			['A', 'D', 'E', 'E']
		];

		const word = 'ABCB';
		assert(wordSearch.solve(board, word) == false);
	}
}

class ImplementTriePrefixTree extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
	}

	test_1() {
		const trie = new this.Problem();
		this.current_test_name =
			'[apple, app, pear, peal] | [apple, app, pear, peal]';

		trie.insert('apple');
		assert(trie.search('apple') == true);
		assert(trie.search('app') == false);
		assert(trie.startsWith('app') == true);
		trie.insert('app');
		assert(trie.search('app') == true);
	}
}

class WordSearchII extends ProblemTests {
	constructor(Problem) {
		super(Problem);
		this.tests.push(() => this.test_1());
		this.tests.push(() => this.test_2());
	}

	test_1() {
		const wordSearchII = new this.Problem();
		this.current_test_name =
			'[["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]] | ["oath","pea","eat","rain"]';

		const board = [
			['o', 'a', 'a', 'n'],
			['e', 't', 'a', 'e'],
			['i', 'h', 'k', 'r'],
			['i', 'f', 'l', 'v']
		];

		const words = ['oath', 'pea', 'eat', 'rain'];

		const result = wordSearchII.solve(board, words);
		assert(result.length == 2);
		assert(result.includes('eat'));
		assert(result.includes('oath'));
	}

	test_2() {
		const wordSearchII = new this.Problem();
		this.current_test_name = '[["a","b"],["c","d"]] | ["abcb"]';

		const board = [
			['a', 'b'],
			['c', 'd']
		];

		const words = ['abcb'];

		const result = wordSearchII.solve(board, words);
		assert(result.length == 0);
	}
}

const TEST_DICTIONARY = {
	'word-search': WordSearch,
	'design-add-and-search-words-data-structure':
		DesignAddAndSearchWordsDataStructure,
	'implement-trie-prefix-tree': ImplementTriePrefixTree,
	'word-search-ii': WordSearchII
};

module.exports = TEST_DICTIONARY;
