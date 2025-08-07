class TrieNode {
	constructor() {
		this.children = {};
		this.isWord = false;
	}
}

class Trie {
	constructor() {
		this.root = new TrieNode();
	}

	insert(word, node = this.root) {}

	search(word, node = this.root) {}

	startsWith(prefix, node = this.root) {
		return true;
	}
}

module.exports = { Problem: Trie };
