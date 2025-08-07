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
				if (permutation.includes(nums[i])) continue;

				backTrack(nums, i, permutation, permutations);
			}

			return permutations;
		};

		const backTrack = (nums, i, permutation, permutations) => {
			// TODO Push the permutaitons to the stack, run the dfs, then pop the permutation
		};
		return dfs(nums);
	};

	solve(nums) {
		return this.permute(nums);
	}
}

module.exports = { Problem: Permutations };
