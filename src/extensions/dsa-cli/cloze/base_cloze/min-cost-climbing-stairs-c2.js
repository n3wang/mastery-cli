class MinMostClimbingStairs {
	/**
	 * DP - Bottom Up
	 * Time O(N) | Space O(1)
	 * https://leetcode.com/problems/min-cost-climbing-stairs/
	 * @param {number[]} cost
	 * @return {number}
	 */
	minCostClimbingStairs = cost => {
		let [downOne, downTwo] = [0, 0];

		//TODO COomplete  {/* Time O(N) */
		const temp = downOne;

		// TODO previous calculated as the cheapest way to reach the prev step + te previous step.
		// TODO prevPrev calculated as the cheapest way to reach the prevPrev step + cost of the preview previous step.

		downOne = Math.min(prev, prevPrev);
		downTwo = temp;

		return downOne;
	};

	solve(cost) {
		return this.minCostClimbingStairs(cost);
	}
}

module.exports = { Problem: MinMostClimbingStairs };
