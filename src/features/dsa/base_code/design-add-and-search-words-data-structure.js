/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */

class TrieNode {
	constructor() {
		this.children = {};
		this.isWord = false;
	}
}

class WordDictionary {
	constructor() {
		this.root = new TrieNode();
	}

	addWord(word, node = this.root) {}

	/* Time O(N) | Space O(N) */
	search(word) {}

	dfs(word, node, level) {}

	hasWildCard(word, node, level) {}
}

module.exports = { Problem: WordDictionary };
