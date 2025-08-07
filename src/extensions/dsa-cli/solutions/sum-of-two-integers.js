class SumOfTwoInteger {
	/**
	 * https://leetcode.com/problems/sum-of-two-integers/
	 * Time O(1) | Space O(1)
	 * @param {number} a
	 * @param {number} b
	 * @return {number}
	 */
	getSum = function (a, b) {
		while (b !== 0) {
			const [xor, carry] = [a ^ b, (a & b) << 1];

			a = xor;
			b = carry;
		}

		return a;
	};

	solve(a, b) {
		return this.getSum(a, b);
	}
}

module.exports = { Problem: SumOfTwoInteger };
