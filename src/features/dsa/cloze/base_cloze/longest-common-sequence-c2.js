var initTabu = text1 => new Array(text1.length + 1).fill(0);

var search = (text1, text2, tabu) => {
	for (let col = text2.length - 1; 0 <= col; col--) {
		/* Time O(N) */
		const temp = initTabu(text1); /* Space O(M) */

		for (let row = text1.length - 1; 0 <= row; row--) {
			/* Time O(M) */
			const isEqual = text1[row] == text2[col];

			temp[row] = isEqual /* Space O(M) */
				? tabu[row + 1] + 1
				: Math.max(tabu[row], temp[row + 1]);
		}

		tabu = temp; /* Space O(M) */
	}

	return tabu;
};

/**
 * DP - Bottom Up
 * Matrix - Tabulation
 * Time O(N * M) | Space O(M)
 * https://leetcode.com/problems/longest-common-subsequence/
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = (text1, text2) => {
	// TODO Text 1 should always be the longest one.
	// TODO Initialize the tabu with the length of the text1.
	// TODO Run the search function and return the first element of the tabu.
};

class LongestCommonSubsequence {
	solve(text1, text2) {
		return longestCommonSubsequence(text1, text2);
	}
}

module.exports = { Problem: LongestCommonSubsequence };
