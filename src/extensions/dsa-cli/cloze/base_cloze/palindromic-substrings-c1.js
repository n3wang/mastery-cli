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
			// TOOD Check if is in bounds if the left and right are inside

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
		for (let i = 0; i < s.length; i++) {
			/* Time O(N) */
			const [odd, even] = [i, i + 1];
			/* odd-length: single character center */
			count += isPalindromeFromCenter(s, i, odd); /* Time O(N) */
			/* even-length: consecutive characters center */
			count += isPalindromeFromCenter(s, i, even); /* Time O(N) */
		}

		return count;
	};
	solve(s) {
		return this.countSubstrings(s);
	}
}

module.exports = { Problem: PalindromicSubstring };
