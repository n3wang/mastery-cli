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
			const canCarry = digits[0] === 10;
			if (!canCarry) return;

			digits[0] = 1;
			digits.push(0); /* Space O(N) */
		};

		// TODO Implement the adding, carry and adding tehe lead.
	};

	solve(digits) {
		return this.plusOne(digits);
	}
}

module.exports = { Problem: PlusOne };
