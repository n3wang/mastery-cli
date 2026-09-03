class NumberOf1Bits {
	/**
	 * https://leetcode.com/problems/number-of-1-bits/
	 * Time O(1) | Space (1)
	 * @param {number} n - a positive integer
	 * @return {number}
	 */
	hammingWeight = function (n) {
		let [bits, mask] = [0, 1];

		for (let i = 0; i < 32; i++) {
			const hasBit = (n & mask) !== 0;
			if (hasBit) bits++;

			mask <<= 1;
		}

		return bits;
	};

	solve(n) {
		return this.hammingWeight(n);
	}
}

module.exports = { Problem: NumberOf1Bits };
