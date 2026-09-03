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

	// TODO Run the search twice, once with the first element and once with the last element.
	// Return the max of the two searches.
};

const search = (nums, start, end) => {
	let [left, mid] = [0, 0];

	for (let i = start; i <= end; i++) {
		/* Time O(N) */
		const temp = mid;
		const right = nums[i];
		const house = left + right;

		mid = Math.max(mid, house);
		left = temp;
	}

	return mid;
};

class HouseRobberII {
	solve(nums) {
		return rob(nums);
	}
}

module.exports = { Problem: HouseRobberII };
