var isOpened = char => char === '(';
var isClosed = char => char === ')';

class CheckValidString {
	/**
	 * Time O(N) | Space O(1)
	 * @param {string} s
	 * @return {boolean}
	 */
	checkValidString = function (s) {
		let [left, right] = [0, 0];

		for (const char of s) {
			/* Time O(N) */
			left += isOpened(char) ? 1 : -1;
			right += !isClosed(char) ? 1 : -1;

			const isNegative = right < 0;
			if (isNegative) break;

			left = Math.max(left, 0);
		}

		// TODO As long as the left can be closed, it means that the string is valid.
	};

	solve(s) {
		return this.checkValidString(s);
	}
}

module.exports = { Problem: CheckValidString };
