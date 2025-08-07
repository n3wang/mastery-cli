/**
 * DP - Bottom Up
 * Array - Tabulation
 * Time O(N) | Space O(N)
 * https://leetcode.com/problems/climbing-stairs/
 * @param {number} n
 * @return {number}
 */
var climbStairs = n => {
	// TODO The base case is when n is 1, then return 1.
	// TODO The initialize on table, is to set the first two steps to 1 and 2.
};

var initTabu = n => {
	const tabu = new Array(n + 1).fill(0);

	tabu[1] = 1;
	tabu[2] = 2;

	return tabu;
};

var search = (n, tabu) => {
	for (let index = 3; index <= n; index++) {
		/* Time O(N) */
		const [prev, prevPrev] = [index - 1, index - 2];

		tabu[index] = tabu[prev] + tabu[prevPrev]; /* Space O(N) */
	}
};

class ClimbStiars {
	solve(n) {
		return climbStairs(n);
	}
}

module.exports = { Problem: ClimbStiars };
