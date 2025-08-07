class FindMedianSortedArrays {
	solve(nums1, nums2) {
		if (nums1.length > nums2.length) {
			return this.solve(nums2, nums1);
		}

		const m = nums1.length;
		const n = nums2.length;
		let left = 0;
		let right = m;

		while (left <= right) {
			const partitionA = Math.floor((left + right) / 2);
			const partitionB = Math.floor((m + n + 1) / 2) - partitionA;

			// TODO Input maxLeftA, minRightA, maxLeftB, minRightB
			//  Max is always the index - 1. Min is always the index itself..
			//  If the index is 0, then the max is the min safe integer (Number.MIN_SAFE_INTEGER).
			// If the index is the length of the array, then the min is the max safe integer (Number.MAX_SAFE_INTEGER).

			if (maxLeftA <= minRightB && maxLeftB <= minRightA) {
				if ((m + n) % 2 === 0) {
					return (
						(Math.max(maxLeftA, maxLeftB) +
							Math.min(minRightA, minRightB)) /
						2.0
					);
				} else {
					return Math.max(maxLeftA, maxLeftB);
				}
			} else if (maxLeftA > minRightB) {
				right = partitionA - 1;
			} else {
				left = partitionA + 1;
			}
		}
		return 0.0;
	}
}

module.exports = { Problem: FindMedianSortedArrays };
