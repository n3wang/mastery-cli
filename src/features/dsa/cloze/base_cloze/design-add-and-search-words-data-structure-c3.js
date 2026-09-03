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

	/* Time O(N) | Space O(N) */
	addWord(word, node = this.root) {
		for (const char of word) {
			const child = node.children[char] || new TrieNode();

			node.children[char] = child;

			node = child;
		}

		node.isWord = true;
	}

	/* Time O(N) | Space O(N) */
	search(word) {
		return this.dfs(word, this.root, 0);
	}

	dfs(word, node, level) {
		// TODO If the node is null it means that there might not be any word added yet.

		// TODO If the level is the same as the word length it means that we have reached the end of the word.

		const isWildCard = word[level] === '.';
		if (isWildCard) return this.hasWildCard(word, node, level);

		return this.dfs(word, node.children[word[level]], level + 1);
	}

	hasWildCard(word, node, level) {
		for (const char of Object.keys(node.children)) {
			const child = node.children[char];

			const hasWord = this.dfs(word, child, level + 1);
			if (hasWord) return true;
		}

		return false;
	}
}

module.exports = { Problem: WordDictionary };
