class JumpGame {
	/**
	 * Time O(N) | Space O(1)
	 * @param {number[]} nums
	 * @return {boolean}
	 */
	canJump = (nums, max = 0, index = 0) => {
		while (index < nums.length) {
			// TODO If the index is greater than the max, then we can't reach the end

			if (max < index) return false;

			const jumps = index + nums[index];

			max = Math.max(max, jumps);
			index++;
		}

		return true;
	};

	solve(nums) {
		return this.canJump(nums);
	}
}

module.exports = { Problem: JumpGame };
