class NumberOf1Bits {
	/**
	 * https://leetcode.com/problems/number-of-1-bits/
	 * Time O(1) | Space (1)
	 * @param {number} n - a positive integer
	 * @return {number}
	 */
	hammingWeight = function (n) {
		// TODO Iterate through the 32 bits of the number. Create the bits and mask

		const hasBit = (n & mask) !== 0;
		if (hasBit) bits++;

		mask <<= 1;
	};

	solve(n) {
		return this.hammingWeight(n);
	}
}

module.exports = { Problem: NumberOf1Bits };
