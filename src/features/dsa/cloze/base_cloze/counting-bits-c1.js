class CountBits {
	/**
	 * https://leetcode.com/problems/counting-bits/
	 * Time O(N) | Space (1)
	 * @param {number} n
	 * @return {number[]}
	 */
	countBits = function (n, dp = [0]) {
		for (let i = 1; i < n + 1; i++) {
			// TODO Get the bit and the mid
		}

		return dp;
	};

	solve(n) {
		return this.countBits(n);
	}
}

module.exports = { Problem: CountBits };
