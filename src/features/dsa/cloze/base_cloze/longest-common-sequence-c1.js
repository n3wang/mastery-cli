var initTabu = text1 => new Array(text1.length + 1).fill(0);

var search = (text1, text2, tabu) => {
	for (let col = text2.length - 1; 0 <= col; col--) {
		/* Time O(N) */
		const temp = initTabu(text1); /* Space O(M) */

		// TODO  Loop on the rows and check if the text1[row] is equal to text2[col]
		// TODO If they are equal then we add 1 to the tabu[row + 1]
		//  and assign it to temp[row] diagonally down
		// or the max between the prev tab at same row and the previous temporal row.

		// TODO Assign the temp to the tabu
		/* Space O(M) */
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
	const canSwap = text2.length < text1.length;
	if (canSwap) [text1, text2] = [text2, text1];

	let tabu = initTabu(text1); /* Time O(M)     | Space O(M) */

	tabu = search(text1, text2, tabu); /* Time O(N * M) | Space O(M) */

	return tabu[0];
};

class LongestCommonSubsequence {
	solve(text1, text2) {
		return longestCommonSubsequence(text1, text2);
	}
}

module.exports = { Problem: LongestCommonSubsequence };
