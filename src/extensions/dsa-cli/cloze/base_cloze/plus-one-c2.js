class PlusOne {
	/**
	 * Time O(N) | Space O(N)
	 * https://leetcode.com/problems/plus-one/
	 * @param {number[]} digits
	 * @return {number[]}
	 */
	plusOne = digits => {
		var add = digits => (digits[digits.length - 1] += 1);

		var carry = digits => {
			for (let digit = digits.length - 1; 0 < digit; digit--) {
				/* Time O(N) */
				const canCarry = digits[digit] === 10;
				if (!canCarry) break;

				digits[digit] = 0;
				digits[digit - 1] += 1;
			}
		};

		const addLeading = digits => {
			// TODO if the first digit is 10 then make it into 1 and push 0 to the end of the array.
		};

		add(digits);
		carry(digits); /* Time O(N) */
		addLeading(digits); /*           | Space O(N) */

		return digits;
	};

	solve(digits) {
		return this.plusOne(digits);
	}
}

module.exports = { Problem: PlusOne };
