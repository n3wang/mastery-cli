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

	return 1 / myPow(x, -n);
};

/**
 * Fast Power - Recursive
 * Time O(log(N)) | Space O(log(N))
 * https://leetcode.com/problems/powx-n/
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
const myPow_fast = (x, n) => {
	var fastPow = (x, n) => {
		const isBaseCase = n === 0;
		if (isBaseCase) return 1.0;

		const half = fastPow(x, n / 2); /* Time O(log(N)) | Space O(log(N)) */

		const isEven = n % 2 === 0;
		if (isEven) return half * half;

		const isOdd = n % 2 === 1;
		if (isOdd) return half * half * x;
	};

	if (n < 0) {
		x = 1 / x;
		n = -n;
	}

	return fastPow(x, n); /* Time O(log(N)) | Space O(log(N)) */
};
class PowX {
	solve(x, n) {
		return myPow(x, n);
	}
}

module.exports = { Problem: PowX };
