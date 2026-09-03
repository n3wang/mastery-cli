class Solution {
	solve(nums) {
		const n = nums.length;
		const length = new Array(n).fill(0);
		const count = new Array(n).fill(0);
		let maxLength = 0;
		let result = 0;

		for (let i = 0; i < n; i++) {
			this.calculateDP(i, nums, length, count);
			maxLength = Math.max(maxLength, length[i]);
		}

		for (let i = 0; i < n; i++) {
			if (length[i] === maxLength) {
				result += count[i];
			}
		}

		return result;
	}

	calculateDP(i, nums, length, count) {
		if (length[i] !== 0) {
			return;
		}

		length[i] = 1;
		count[i] = 1;

		for (let j = 0; j < i; j++) {
			if (nums[j] < nums[i]) {
				this.calculateDP(j, nums, length, count);
				if (length[j] + 1 > length[i]) {
					length[i] = length[j] + 1;
					count[i] = 0;
				}
				if (length[j] + 1 === length[i]) {
					count[i] += count[j];
				}
			}
		}
	}
}

module.exports = { Problem: Solution };
