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
			const temp = downOne;

			const [_prev, _prevPrev] = [i - 1, i - 2];
			const prev = downOne + cost[_prev];
			const prevPrev = downTwo + cost[_prevPrev];

			downOne = Math.min(prev, prevPrev);
			downTwo = temp;
		}

		return downOne;
	};

	solve(cost) {
		return this.minCostClimbingStairs(cost);
	}
}

module.exports = { Problem: MinMostClimbingStairs };
