const dfs = (str, index, memo) => {
	let count = numDecodings(str, index + 1, memo);

	if (isTwoDigit(str, index)) {
		count += numDecodings(str, index + 2, memo);
	}

	memo.set(index, count);

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
	// TODO Detect basecase when there is no left or the left is zero. Then return 0
	// TODO Detect basecase when the index is at the end of the string. Then return 1 (Only one option)
	// TODO Otherwise if the memo already has the index then return the memo.
	// TODO Continue running DFS and return the count down the line until a base case is found.
};

class DecodeWays {
	solve(str) {
		return numDecodings(str);
	}
}

module.exports = { Problem: DecodeWays };
