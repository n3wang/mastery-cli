class WordBreak {
	/**
	 * DP - Top Down
	 * Array - Memoization
	 * Hash Set - Distinct Keys
	 * Time O(N^3) | Space O(N)
	 * https://leetcode.com/problems/word-break/
	 * @param {string} s
	 * @param {string[]} wordDict
	 * @return {boolean}
	 */
	wordBreak = (s, wordDict) => {
		var canBreak = (s, wordSet, start, memo) => {
			// TODO If the start is equal to the length of the string, return true
			// TODO If the memo at the start is not null, return the memo at the start
			// TODO Call the dfs function with the string, word set, end, and memo
		};

		var dfs = (s, wordSet, start, memo) => {
			for (let end = start + 1; end <= s.length; end++) {
				/* Time O(N) */
				const word = s.slice(start, end); /* Time O(N) | Space O(N) */

				const _canBreak =
					wordSet.has(word) &&
					canBreak(s, wordSet, end, memo); /* Time O(N * N) */
				if (_canBreak) {
					memo[start] = true;
					return true;
				}
			}

			memo[start] = false;
			return false;
		};

		const wordSet = new Set(wordDict); /* Time O(N)         | Space O(N) */
		const memo = new Array(s.length).fill(
			null
		); /*                   | Space O(N) */
		const start = 0;

		return canBreak(
			s,
			wordSet,
			start,
			memo
		); /* Time O(N * N * N) | Space O(N) */
	};

	solve(s, wordDict) {
		return this.wordBreak(s, wordDict);
	}
}

module.exports = { Problem: WordBreak };
