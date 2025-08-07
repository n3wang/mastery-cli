class MultiStringSearch {
	solve(bigString, smallStrings) {
		return multiStringSearch(bigString, smallStrings);
	}
}

function multiStringSearch(bigString, smallStrings) {
	const trie = new Trie();
	for (const string of smallStrings) {
		trie.insert(string);
	}

	const containedStrings = {};
	for (let i = 0; i < bigString.length; i++) {
		findSmallStringsIn(bigString, i, trie, containedStrings);
	}
	return smallStrings.map(string => string in containedStrings);
}

function findSmallStringsIn(string, startIdx, trie, containedStrings) {
	let currentNode = trie.root;
	for (let i = startIdx; i < string.length; i++) {
		const currentChar = string[i];
		if (!(currentChar in currentNode)) break;
		currentNode = currentNode[currentChar];
		if (trie.endSymbol in currentNode) {
			containedStrings[currentNode[trie.endSymbol]] = true;
		}
	}
}

class Trie {
	constructor() {
		this.root = {};
		this.endSymbol = '*';
	}

	insert(string) {
		let current = this.root;
		for (const letter of string) {
			if (!(letter in current)) current[letter] = {};
			current = current[letter];
		}
		current[this.endSymbol] = string;
	}
}

module.exports = { Problem: MultiStringSearch };
