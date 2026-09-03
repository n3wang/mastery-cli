/**
 * Greedy - Max
 * Time O(N) | Space O(1)
 * https://leetcode.com/problems/house-robber-ii/
 * @param {number[]} nums
 * @return {number}
 */
const rob = nums => {
	const isBaseCase1 = nums.length === 0;
	if (isBaseCase1) return 0;

	const isBaseCase2 = nums.length === 1;
	if (isBaseCase2) return nums[0];

	const left = search(nums, 0, nums.length - 2); /* Time O(N) */
	const right = search(nums, 1, nums.length - 1); /* Time O(N) */

	return Math.max(left, right);
};

const search = (nums, start, end) => {
	// TODO Find the max amount of money that can be robbed from the houses. from start to end.
	// TODO Loop from start to end and find the max amount of money that can be robbed.
};

class HouseRobberII {
	solve(nums) {
		return rob(nums);
	}
}

module.exports = { Problem: HouseRobberII };
