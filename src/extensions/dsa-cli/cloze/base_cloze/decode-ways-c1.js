const dfs = (str, index, memo) => {
	// TODO Perform both Num Decodings for the next index and the next two indexes.

	return count;
};

var isTwoDigit = (str, index) => {
	const twoDigit = Number(str.slice(index, index + 2));

	return 10 <= twoDigit && twoDigit <= 26;
};

/**
 * DP - Top Down
 * Hash Map - Memoization
 * Time O(N) | Space O(N)
 * https://leetcode.com/problems/decode-ways/
 * @param {string} s
 * @return {number}
 */
const numDecodings = (str, index = 0, memo = new Map()) => {
	const caseThereIsNoLeftOrZero = !str.length || str[index] === '0';
	if (caseThereIsNoLeftOrZero) return 0;

	const isCaseReachedEnd = index === str.length;
	if (isCaseReachedEnd) return 1;

	if (memo.has(index)) return memo.get(index);

	return dfs(str, index, memo);
};

class DecodeWays {
	solve(str) {
		return numDecodings(str);
	}
}

module.exports = { Problem: DecodeWays };
