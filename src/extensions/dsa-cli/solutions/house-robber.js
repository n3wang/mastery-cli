class HouseRobber {
	/**
	 * DP - Bottom Up
	 * Time O(N) | Space O(1)
	 * https://leetcode.com/problems/house-robber/
	 * @param {number[]} nums
	 * @return {number}
	 */
	rob = nums => {
		if (!nums.length) return 0;

		let [left, maxAndPrev] = [0, 0];

		for (const right of nums) {
			/* Time O(N) */
			const leftForNextHouse = maxAndPrev;
			const currentHouseMax = left + right;

			maxAndPrev = Math.max(maxAndPrev, currentHouseMax);
			left = leftForNextHouse;
		}

		return maxAndPrev;
	};

	solve(nums) {
		return this.rob(nums);
	}
}

module.exports = { Problem: HouseRobber };
