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

		for (let i = 2; i < cost.length + 1; i++) {
			/* Time O(N) */

			// TODO Get the temporal which should be downOne, and saved as downTwo.

			const [_prev, _prevPrev] = [i - 1, i - 2];
			const prev = downOne + cost[_prev];
			const prevPrev = downTwo + cost[_prevPrev];

			// TODO downOne as the min of prev and prevPrev. THen update downTwo.
		}

		return downOne;
	};

	solve(cost) {
		return this.minCostClimbingStairs(cost);
	}
}

module.exports = { Problem: MinMostClimbingStairs };
