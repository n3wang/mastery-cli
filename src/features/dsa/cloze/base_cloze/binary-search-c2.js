class BinarySearch {
	search(nums, target) {
		let [left, right] = [0, nums.length - 1];

		while (left <= right) {
			const mid = (left + right) >> 1;
			const guess = nums[mid];

			// TODO Complete the binary search.
		}

		return -1;
	}

	solve(nums, target) {
		// console.log(this.search(nums, target))
		return this.search(nums, target);
	}
}

module.exports = { Problem: BinarySearch };
