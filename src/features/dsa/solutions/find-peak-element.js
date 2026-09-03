class FindPeakElement {
	solve(nums) {
		let left = 0;
		let right = nums.length - 1;

		while (left < right) {
			let mid = Math.floor((left + right) / 2);
			if (nums[mid] > nums[mid + 1]) {
				right = mid;
			} else {
				left = mid + 1;
			}
		}
		return left;
	}
}

module.exports = { Problem: FindPeakElement };
