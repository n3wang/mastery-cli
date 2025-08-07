class JumpGame {
	/**
	 * Time O(N) | Space O(1)
	 * @param {number[]} nums
	 * @return {boolean}
	 */
	canJump = (nums, max = 0, index = 0) => {
		// TODO  While the index is less than the length
		while (index < nums.length) {
			// TODO Jump to the next index
			// TODO If the max is less than the index, then we can not reach the end Because we are stuck at the index
			// TODO THe max is the max of the current max and the jumps
		}

		return true;
	};

	solve(nums) {
		return this.canJump(nums);
	}
}

module.exports = { Problem: JumpGame };
