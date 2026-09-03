class BinarySearch {
	search(nums, target) {
		let [left, right] = [0, nums.length - 1];

		while (left <= right) {
			const mid = (left + right) >> 1;
			const guess = nums[mid];

			const isTarget = guess === target;
			if (isTarget) return mid;

			const isTargetGreater = guess < target;
			if (isTargetGreater) left = mid + 1;

			const isTargetLess = target < guess;
			if (isTargetLess) right = mid - 1;
		}

		return -1;
	}

	solve(nums, target) {
		// console.log(this.search(nums, target))
		return this.search(nums, target);
	}
}

module.exports = { Problem: BinarySearch };
