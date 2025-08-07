class PalindromicSubstring {
	/**
	 * 2 Pointer - Expand Around Center
	 * Time O(N^2) | Space O(1)
	 * https://leetcode.com/problems/palindromic-substrings/
	 * @param {string} s
	 * @return {number}
	 */
	countSubstrings = (s, count = 0) => {
		const isPalindromeFromCenter = (s, left, right, count = 0) => {
			const isInBounds = () => 0 <= left && right < s.length;
			while (isInBounds()) {
				/* Time O(N) */
				const isEqual = s[left] === s[right];
				if (!isEqual) break;

				count++;

				left--;
				right++;
			}

			return count;
		};

		// TODO For each characteacter check if it is a palindrom on the left and right.

		return count;
	};
	solve(s) {
		return this.countSubstrings(s);
	}
}

module.exports = { Problem: PalindromicSubstring };
