/**
 * DFS
 * Time (log(N)) | Space O(log(N))
 * https://leetcode.com/problems/powx-n/
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
const myPow = (x, n) => {
	const isBaseCase1 = x === 1.0 || n === 0;
	if (isBaseCase1) return 1;

	const isBaseCase2 = n === 1;
	if (isBaseCase2) return x;

	// TODO If the exponent is even return as the half of the exponent. Muliplied by a double base case

	const isOdd = n % 2 === 1;
	if (isOdd)
		return x * myPow(x, n - 1); /* Time O(log(N)) | Space O(log(N)) */

	return 1 / myPow(x, -n);
};

class PowX {
	solve(x, n) {
		return myPow(x, n);
	}
}

module.exports = { Problem: PowX };
