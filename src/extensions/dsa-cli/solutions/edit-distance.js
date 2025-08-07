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
		for (let j = 1; j <= word2.length; j++) {
			let temp = memory[j];
			// Going left + 1: Insertion (Because is backwards)
			// Going up + 1 Deletion (Because is backwards)
			// Going Diagonal: Replacement (The same as insert and DELETE)
			memory[j] =
				word1[i - 1] === word2[j - 1]
					? prev
					: Math.min(prev, memory[j], memory[j - 1]) + 1;
			prev = temp;
		}
	}

	return memory[word2.length];
}

class MinDistance {
	solve(word1, word2) {
		return minDistance(word1, word2);
	}
}

module.exports = { Problem: MinDistance };
