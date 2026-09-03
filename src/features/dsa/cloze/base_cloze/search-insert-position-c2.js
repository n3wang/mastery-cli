class SearchInsertPosition {
	solve(nums, target) {
		let left = 0;
		let right = nums.length - 1;

		while (left <= right) {
			const pivot = left + Math.floor((right - left) / 2);

			if (nums[pivot] === target) {
				return pivot;
			}

			if (target < nums[pivot]) {
				right = pivot - 1;
			} else {
				left = pivot + 1;
			}
		}

		// TODO return if the case is extended
	}
}

module.exports = { Problem: SearchInsertPosition };
