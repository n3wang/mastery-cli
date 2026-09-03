class ReverseBits {
	/**
	 * https://leetcode.com/problems/reverse-bits/
	 * Time O(1) | Space O(1)
	 * @param {number} n - a positive integer
	 * @return {number} - a positive integer
	 */
	reverseBits = function (n) {
		let ret = 0;
		let power = 31;
		while (n !== 0) {
			// TODO add the last last bit of n to start of ret.
		}
		return ret;
	};

	solve(n) {
		return this.reverseBits(n);
	}
}

module.exports = { Problem: ReverseBits };
