/**
 * DP - Bottom Up
 * Array - Tabulation
 * Time O(N) | Space O(N)
 * https://leetcode.com/problems/climbing-stairs/
 * @param {number} n
 * @return {number}
 */
var climbStairs = n => {
	const isBaseCase = n === 1;
	if (isBaseCase) return 1;

	const tabu = initTabu(n); /* Space O(N) */

	search(n, tabu);

	return tabu[n];
};

var initTabu = n => {
	// TODO Initialize the tabu array with the base cases.
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
