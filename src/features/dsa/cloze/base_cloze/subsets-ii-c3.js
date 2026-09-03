class SubsetII {
	/**
	 * https://leetcode.com/problems/subsets-ii/
	 * Time O(N * 2^N) | Space O(N * 2^N)
	 * @param {number[]} nums
	 * @return {number[][]}
	 */
	subsetsWithDup = nums => {
		const bfs = (nums, subsets = [[]]) => {
			let levels = subsets.length - 1;

			for (let i = 0; i < nums.length; i++) {
				// TODO If the previous duplicate is the same as the current number, then we only want to start from the last level

				const start = isPrevDuplicate ? levels + 1 : 0;

				levels = subsets.length - 1;

				for (let level = start; level < levels + 1; level++) {
					const nextLevel = [...subsets[level], nums[i]];

					subsets.push(nextLevel);
				}
			}

			return subsets;
		};
		nums.sort((a, b) => a - b);

		return bfs(nums);
	};

	solve(nums) {
		return this.subsetsWithDup(nums);
	}
}

module.exports = { Problem: SubsetII };
