class SearchRange {
	solve(nums, target) {
		const firstOccurrence = this.findBound(nums, target, true);

		if (firstOccurrence === -1) {
			return [-1, -1];
		}

		const lastOccurrence = this.findBound(nums, target, false);

		return [firstOccurrence, lastOccurrence];
	}

	findBound(nums, target, isFirst) {
		const N = nums.length;
		let begin = 0;
		let end = N - 1;

		while (begin <= end) {
			const mid = Math.floor((begin + end) / 2);

			if (nums[mid] === target) {
				if (isFirst) {
					// This means we found our lower bound.
					if (mid === begin || nums[mid - 1] !== target) {
						return mid;
					}

					// Search on the left side for the bound.
					end = mid - 1;
				} else {
					// This means we found our upper bound.
					if (mid === end || nums[mid + 1] !== target) {
						return mid;
					}

					// Search on the right side for the bound.
					begin = mid + 1;
				}
			} else if (nums[mid] > target) {
				end = mid - 1;
			} else {
				begin = mid + 1;
			}
		}

		return -1;
	}
}

module.exports = { Problem: SearchRange };
