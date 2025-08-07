/**
 * DP - Bottom Up
 * Matrix - Tabulation
 * Time O(N * M) | Space O(M)
 * https://leetcode.com/problems/edit-distance/
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
function minDistance(word1, word2) {
	let memory = Array(word2.length + 1)
		.fill(0)
		.map((_, i) => i);

	for (let i = 1; i <= word1.length; i++) {
		let prev = memory[0];
		memory[0] = i;

		// TODO For each of the n*n memory Find the best best closest step
		// Going left + 1: Insertion (Because is backwards)
		// Going up + 1 Deletion (Because is backwards)
		// Going Diagonal: Replacement (The same as insert and DELETE)
	}

	return memory[word2.length];
}

class MinDistance {
	solve(word1, word2) {
		return minDistance(word1, word2);
	}
}

module.exports = { Problem: MinDistance };
