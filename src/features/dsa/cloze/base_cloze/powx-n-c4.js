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

	const isEven = n % 2 === 0;
	if (isEven)
		return myPow(x * x, n / 2); /* Time O(log(N)) | Space O(log(N)) */

	const isOdd = n % 2 === 1;
	if (isOdd)
		return x * myPow(x, n - 1); /* Time O(log(N)) | Space O(log(N)) */

	// TODO Otherwise, return the reciprocal of the base multiplied by the negative exponent
};

class PowX {
	solve(x, n) {
		return myPow(x, n);
	}
}

module.exports = { Problem: PowX };
