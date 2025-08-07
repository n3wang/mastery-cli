/**
 * DFS
 * Time (log(N)) | Space O(log(N))
 * https://leetcode.com/problems/powx-n/
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
const myPow = (x, n) => {
	// TODO Base case whether x is 1.0 or n is 0. || or n is 1.

	const isEven = n % 2 === 0;
	if (isEven)
		return myPow(x * x, n / 2); /* Time O(log(N)) | Space O(log(N)) */

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
