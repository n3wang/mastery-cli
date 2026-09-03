/**
 * Greedy - Max
 * Time O(N) | Space O(1)
 * https://leetcode.com/problems/house-robber-ii/
 * @param {number[]} nums
 * @return {number}
 */
const rob = nums => {
	// TODO Detect basecase when there is no houses. then return - and if the length is one then return the first house.

	// TODO Otherwise run the search twice, once from the first house to the second last house and the second time from the second house to the last house.
	// Either from 0 to pre-last one or from 1 to the last one.

	// TODO Return the max of the two searches.
	return Math.max(left, right);
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
