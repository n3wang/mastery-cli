class Permutations {
	/**
	 * https://leetcode.com/problems/permutations/solution/
	 * Time O(N!) | Space(N!)
	 * @param {number[]} nums
	 * @return {number[][]}
	 */
	permute = function (nums) {
		var dfs = function (nums, permutation = [], permutations = []) {
			const isBaseCase = nums.length === permutation.length;
			if (isBaseCase) return permutations.push(permutation.slice());

			for (let i = 0; i < nums.length; i++) {
				// TODO: skip if already in permutation, otherwise continue to backtrack each num there
			}

			return permutations;
		};

		const backTrack = (nums, i, permutation, permutations) => {
			permutation.push(nums[i]);
			dfs(nums, permutation, permutations);
			permutation.pop();
		};
		return dfs(nums);
	};

	solve(nums) {
		return this.permute(nums);
	}
}

module.exports = { Problem: Permutations };
