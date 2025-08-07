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
				const isPrevDuplicate = 0 < i && nums[i - 1] === nums[i];
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
