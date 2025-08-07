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
			// TODO Check if the target is less than 0, if it is return the combinations.

			// TODO if the target is 0, then add the combination to the combinations and return the combinations.

			for (let i = index; i < candidates.length; i++) {
				const isDuplicate =
					index < i && candidates[i - 1] === candidates[i];
				if (isDuplicate) continue;

				backTrack(candidates, target, i, combination, combinations);
			}

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
