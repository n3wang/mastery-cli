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
			const isBaseCase1 = s.length === start;
			if (isBaseCase1) return true;

			const hasSeen = memo[start] !== null;
			if (hasSeen) return memo[start];

			return dfs(
				s,
				wordSet,
				start,
				memo
			); /* Time O(N * N * N) | Space O(N) */
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

		// TODO wordset being a set of words. The memo being an array of nulls. The start
	};

	solve(s, wordDict) {
		return this.wordBreak(s, wordDict);
	}
}

module.exports = { Problem: WordBreak };
