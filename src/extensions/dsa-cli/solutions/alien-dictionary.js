class AlienDictionary {
	constructor() {
		this.reverseAdjList = new Map();
		this.seen = new Map();
		this.output = [];
	}

	solve(words) {
		return this.alienOrder(words);
	}

	alienOrder(words) {
		// Step 0: Put all unique letters into reverseAdjList as keys.
		for (const word of words) {
			for (const c of word) {
				if (!this.reverseAdjList.has(c)) {
					this.reverseAdjList.set(c, []);
				}
			}
		}

		// Step 1: Find all edges and add reverse edges to reverseAdjList.
		for (let i = 0; i < words.length - 1; i++) {
			const word1 = words[i];
			const word2 = words[i + 1];
			// Check that word2 is not a prefix of word1.
			if (word1.length > word2.length && word1.startsWith(word2)) {
				return '';
			}
			// Find the first non-match and insert the corresponding relation.
			for (let j = 0; j < Math.min(word1.length, word2.length); j++) {
				if (word1[j] !== word2[j]) {
					this.reverseAdjList.get(word2[j]).push(word1[j]);
					break;
				}
			}
		}

		// Step 2: DFS to build up the output list.
		for (const c of this.reverseAdjList.keys()) {
			const result = this.dfs(c);
			if (!result) return '';
		}

		return this.output.join('');
	}

	// Return true iff no cycles detected.
	dfs(c) {
		if (this.seen.has(c)) {
			return this.seen.get(c); // If this node was grey (false), a cycle was detected.
		}
		this.seen.set(c, false);
		for (const next of this.reverseAdjList.get(c)) {
			const result = this.dfs(next);
			if (!result) return false;
		}
		this.seen.set(c, true);
		this.output.push(c);
		return true;
	}
}

module.exports = { Problem: AlienDictionary };
