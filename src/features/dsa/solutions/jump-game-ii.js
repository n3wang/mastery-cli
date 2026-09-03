class JumpGameII {
	/**
	 * https://leetcode.com/problems/jump-game-ii/
	 * Time O(N) | Space O(1)
	 * @param {number[]} nums
	 * @return {number}
	 */
	jump = function (nums) {
		let [left, right, jumps] = [0, 0, 0];

		while (right < nums.length - 1) {
			const maxReach = getMaxReach(nums, left, right);

			left = right + 1;
			right = maxReach;
			jumps += 1;
		}

		return jumps;
	};

	getMaxReach = (nums, left, right, maxReach = 0) => {
		for (let i = left; i < right + 1; i++) {
			const reach = nums[i] + i;
			maxReach = Math.max(maxReach, reach);
		}

		return maxReach;
	};

	solve(nums) {
		return this.jump(nums);
	}
}

module.exports = { Problem: JumpGameII };
