class Problem {
	/**
	 * https://leetcode.com/problems/find-the-duplicate-number/
	 * Time O(N * log(N)) | Space O(1)
	 * @param {number[]} nums
	 * @return {number}
	 */
	solve(nums) {
		nums.sort(
			(a, b) => a - b
		); /* Time O(N * log(N)) | HeapSort Space O(1) | QuickSort Space O(log(N)) */

		for (let i = 1; i < nums.length; i++) {
			/* Time O(N) */
			const isPrevDuplicate = nums[i - 1] === nums[i];
			if (isPrevDuplicate) return nums[i];
		}

		return -1;
	}

	/**
	 * https://leetcode.com/problems/find-the-duplicate-number/
	 * Time O(N * log(N)) | Space O(1)
	 * @param {number[]} nums
	 * @return {number}
	 */
	findDuplicate(nums) {
		const getCount = (mid, nums, count = 0) => {
			for (const num of nums) {
				/* Time O(N) */
				const isMidGreater = num <= mid;
				if (isMidGreater) count++;
			}

			return count;
		};

		let [left, right, duplicate] = [1, nums.length - 1, -1];

		while (left <= right) {
			/* Time O(log(N)) */
			const mid = (left + right) >> 1;
			const count = getCount(mid, nums); /* Time O(N) */

			const isMidGreater = count <= mid;
			if (isMidGreater) left = mid + 1;

			const isMidLess = mid < count;
			if (isMidLess) {
				duplicate = mid;
				right = mid - 1;
			}
		}

		return duplicate;
	}

	/**
	 * https://leetcode.com/problems/find-the-duplicate-number/
	 * Time O(N * log(N)) | Space O(1)
	 * @param {number[]} nums
	 * @return {number}
	 */
	findDuplicate = function (nums, duplicate = 0) {
		const calcMaxBit = (nums, bits = 0) => {
			let max = Math.max(0, ...nums); /* Time O(N) */

			while (max) {
				/* Time O(log(MAX)) */
				max >>= 1;
				bits++;
			}

			return bits;
		};

		const count = (nums, bit) => {
			let [baseCount, numsCount, mask] = [0, 0, 1 << bit];

			for (let i = 0; i < nums.length; i++) {
				/* Time O(N) */
				const isBaseBitSet = 0 < (i & mask);
				if (isBaseBitSet) baseCount++;

				const isNumBitSet = 0 < (nums[i] & mask);
				if (isNumBitSet) numsCount++;
			}

			return [baseCount, numsCount, mask];
		};

		const mostSignificantBit = calcMaxBit(nums); /* Time O(N) */

		for (let bit = 0; bit < mostSignificantBit; bit++) {
			/* Time O(log(N)) */
			const [baseCount, numsCount, mask] = count(
				nums,
				bit
			); /* Time O(N) */

			const isMoreFrequentlySet = baseCount < numsCount;
			if (isMoreFrequentlySet) duplicate |= mask;
		}

		return duplicate;
	};
}

module.exports = { Problem };
