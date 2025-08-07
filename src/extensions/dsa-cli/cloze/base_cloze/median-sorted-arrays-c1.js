class MedianSortedArrays {
	findMedianSortedArrays(nums1, nums2) {
		const getPointers = (nums1, mid1, nums2, mid2) => {
			// TODO Create the get Left and right functions in which defaults to -Infinity and Infinity respectively
			const [aLeft, bLeft] = [getLeft(nums1, mid1), getLeft(nums2, mid2)];
			const [aRight, bRight] = [
				getRight(nums1, mid1),
				getRight(nums2, mid2)
			];

			return { aLeft, aRight, bLeft, bRight };
		};

		const canSwap = nums2.length < nums1.length;
		if (canSwap) [nums1, nums2] = [nums2, nums1];

		let [left, right] = [0, nums1.length - 1];
		const totalLength = nums1.length + nums2.length;
		const mid = totalLength >> 1;
		const isEven = totalLength % 2 === 0;

		while (true) {
			const mid1 = left + right;
			const mid2 = mid - mid1 - 2;
			const { aLeft, aRight, bLeft, bRight } = getPointers(
				nums1,
				mid1,
				nums2,
				mid2
			);

			const isTarget = aLeft <= bRight && bLeft <= aRight;
			if (isTarget)
				return isEven
					? (Math.max(aLeft, bLeft) + Math.min(aRight, bRight)) / 2
					: Math.min(aRight, bRight);

			const isTargetGreater = aLeft <= bRight;
			if (isTargetGreater) left = mid1 + 1;

			const isTargetLess = bRight < aLeft;
			if (isTargetLess) right = mid1 - 1;
		}
	}

	solve(nums1, nums2) {
		return this.findMedianSortedArrays(nums1, nums2);
	}
}

module.exports = { Problem: MedianSortedArrays };
