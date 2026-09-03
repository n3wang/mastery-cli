class CombinationSumII {
	/**
	 * https://leetcode.com/problems/combination-sum-ii/
	 * Time O(2^N) | Space O(N)
	 * @param {number[]} candidates
	 * @param {number} target
	 * @return {number[][]}
	 */
	combinationSum2 = function (candidates, target) {
		const dfs = (
			candidates,
			target,
			index = 0,
			combination = [],
			combinations = []
		) => {
			const isBaseCase = target < 0;
			if (isBaseCase) return combinations;

			const isTarget = target === 0;
			if (isTarget) {
				if (combination.length) combinations.push(combination.slice());

				return combinations;
			}

			// TDOO iterate trought the candidates that are indicated to be after and within the index.
			// TODO if is duplicate then ip. Otherwise continue to backtrack.

			return combinations;
		};

		const backTrack = (
			candidates,
			target,
			i,
			combination,
			combinations
		) => {
			combination.push(candidates[i]);
			dfs(
				candidates,
				target - candidates[i],
				i + 1,
				combination,
				combinations
			);
			combination.pop();
		};

		candidates.sort((a, b) => a - b);

		return dfs(candidates, target);
	};

	solve(candidates, target) {
		return this.combinationSum2(candidates, target);
	}
}

module.exports = { Problem: CombinationSumII };
