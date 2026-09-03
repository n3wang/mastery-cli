class Problem {
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
			// TODO Iterate from the start + 1 to the length of the string
			// TODO Get the word from the start to the end, Check if the word exist and can break,
			// if it can break then set the memo at the start to true and return true
			// TODO Set the memo at the start to false and return false
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

module.exports = { Problem };
