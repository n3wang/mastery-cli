/**
 * DP - Top Down
 * Matrix - Memoization
 * Time O(N * M) | Space O(N * M)
 * https://leetcode.com/problems/regular-expression-matching/
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = (
	text,
	pattern,
	row = 0,
	col = 0,
	memo = initMemo(text, pattern)
) => {
	const hasSeen = memo[row][col];
	if (hasSeen) return memo[row][col];

	const isEqual = col === pattern.length;
	const ans = isEqual
		? row === text.length
		: check(
				text,
				pattern,
				row,
				col,
				memo
		  ); /* Time O(N * M) | Space O(N * M) */

	memo[row][col] = ans;
	return ans;
};

var initMemo = (text, pattern) =>
	new Array(text.length + 1)
		.fill() /* Time O(N) | Space O(N) */
		.map(() =>
			new Array(pattern.length + 1).fill(false)
		); /* Time O(M) | Space O(M) */

var check = (text, pattern, row, col, memo) => {
	const isTextDefined = row < text.length,
		isTextAndPatternEqual = pattern[col] === text[row],
		isPatternPeriod = pattern[col] === '.',
		isFirstMatch =
			isTextDefined && (isTextAndPatternEqual || isPatternPeriod),
		isNextPatternWildCard =
			col + 1 < pattern.length && pattern[col + 1] === '*';

	return isNextPatternWildCard /* Time O(N * M) | Space O(N * M) */
		? isMatch(text, pattern, row, col + 2, memo) ||
				(isFirstMatch && isMatch(text, pattern, row + 1, col, memo))
		: isFirstMatch && isMatch(text, pattern, row + 1, col + 1, memo);
};

class RegularExpressionMatching {
	solve(text, pattern) {
		return this.isMatch(text, pattern);
	}
}

module.exports = { Problem: RegularExpressionMatching };
