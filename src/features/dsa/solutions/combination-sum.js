class CombinationSum {
	/**
	 * https://leetcode.com/problems/combination-sum/
	 * Time O(N * ((Target/MIN) + 1)) | Space O(N * (Target/Min))
	 * @param {number[]} candidates
	 * @param {number} target
	 * @return {number[][]}
	 */
	combinationSum = function (
		candidates,
		target,
		index = 0,
		combination = [],
		combinations = []
	) {
		const isBaseCase = target < 0;
		if (isBaseCase) return combinations;

		const isTarget = target === 0;
		if (isTarget) return combinations.push(combination.slice());

		for (let i = index; i < candidates.length; i++) {
			this.backTrack(candidates, target, i, combination, combinations);
		}

		return combinations;
	};

	backTrack = (candidates, target, i, combination, combinations) => {
		combination.push(candidates[i]);
		this.combinationSum(
			candidates,
			target - candidates[i],
			i,
			combination,
			combinations
		);
		combination.pop();
	};

	solve(candidate, target) {
		return this.combinationSum(candidate, target);
	}
}

module.exports = { Problem: CombinationSum };
