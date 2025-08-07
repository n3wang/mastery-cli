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
			// TODO Iterate from the end of the array to the beginning if can carry then make it into zero and follow up the carry.
		};

		const addLeading = digits => {
			const canCarry = digits[0] === 10;
			if (!canCarry) return;

			digits[0] = 1;
			digits.push(0); /* Space O(N) */
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
