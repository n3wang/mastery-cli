class HouseRobber {
	/**
	 * DP - Bottom Up
	 * Time O(N) | Space O(1)
	 * https://leetcode.com/problems/house-robber/
	 * @param {number[]} nums
	 * @return {number}
	 */
	rob = nums => {
		// TODO Detect basecase when there is no houses. Then return 0

		// TODO Initialize the left and maxAndPrev variables.

		for (const right of nums) {
			/* Time O(N) */
			const leftForNextHouse = maxAndPrev;
			const currentHouseMax = left + right;

			maxAndPrev = Math.max(maxAndPrev, currentHouseMax);
			left = leftForNextHouse;
		}

		// TODO Return the maxAndPrev.
	};

	solve(nums) {
		return this.rob(nums);
	}
}

module.exports = { Problem: HouseRobber };
