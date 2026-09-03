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

		// TODO For each character mantain left and right counter, whereas left counts if the openings can be closed,
		// whereas right counts the possibility whereas all * are openings.

		return left === 0;
	};

	solve(s) {
		return this.checkValidString(s);
	}
}

module.exports = { Problem: CheckValidString };
