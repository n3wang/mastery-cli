/**
 * DP - Bottom Up
 * Matrix - Tabulation
 * Time O(N^3) | Space O(N^2)
 * https://leetcode.com/problems/burst-balloons/
 * @param {number[]} nums
 * @return {number}
 */
var maxCoins = nums => {
	const tabu = initTabu(nums); /* Time O(N * N)     | Space O(N * N) */

	search(nums, tabu); /* Time O(N * N * N) | Space O(N * N) */

	return tabu[1][nums.length];
};

var initTabu = nums =>
	new Array(nums.length + 2)
		.fill() /* Time O(N) | Space O(N) */
		.map(() =>
			new Array(nums.length + 2).fill(0)
		); /* Time O(N) | Space O(N) */

var search = (nums, tabu) => {
	const _nums = [1, ...nums, 1]; /* Time O(N) | Space O(N) */

	for (let left = nums.length; 1 <= left; left--) {
		/* Time O(N) */
		for (let right = left; right <= nums.length; right++) {
			/* Time O(N) */
			for (let i = left; i <= right; i++) {
				const gain = _nums[left - 1] * _nums[i] * _nums[right + 1];
				const remaining = tabu[left][i - 1] + tabu[i + 1][right];

				tabu[left][right] =
					/*   | Space O(N * N) */
					Math.max(remaining + gain, tabu[left][right]);
			}
		}
	}
};

class Problem {
	solve(nums) {
		return maxCoins(nums);
	}
}

module.exports = { Problem };
