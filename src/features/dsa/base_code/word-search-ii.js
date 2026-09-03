class FindWords {
	solve(board, words) {
		return new Trie(words).searchBoard(board);
	}
}

class TrieNode {
	constructor() {
		this.children = {};
		this.word = '';
	}
}

class Trie {
	constructor(words) {
		this.root = new TrieNode();
		words.forEach(word => this.insert(word));
	}

	/* Time O(N) | Space O(N) */
	insert(word, node = this.root) {}

	/* Time O((ROWS * COLS) * (4 * (3 ^ (WORDS - 1)))) | Space O(N) */
	searchBoard(board, node = this.root, words = []) {}
}

module.exports = { Problem: FindWords };
