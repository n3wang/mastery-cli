class Problem {
	/**
	 * DP - Bottom Up
	 * Array - Tabulation
	 * Time O(N^2) | Space O(N)
	 * https://leetcode.com/problems/longest-increasing-subsequence/
	 * @param {number[]} nums
	 * @return {number}
	 */
	lengthOfLIS_dp = nums => {
		const initTabu = nums => new Array(nums.length).fill(1);

		var linearSearch = (nums, tabu) => {
			for (let right = 1; right < nums.length; right++) {
				/* Time O(N) */
				for (let left = 0; left < right; left++) {
					/* Time O(N) */
					const canUpdate = nums[left] < nums[right];
					if (!canUpdate) continue;

					const [_left, _right] = [tabu[left] + 1, tabu[right]];
					tabu[right] = Math.max(_right, _left); /* Space O(N) */
				}
			}
		};

		const tabu = initTabu(nums); /*               | Space O(N) */

		linearSearch(nums, tabu); /* Time O(N * N) | Space O(N)*/

		return Math.max(...tabu); /* Time O(N) */
	};

	/**
	 * Array - Subsequence
	 * Time O(N * log(N)) | Space O(N)
	 * https://leetcode.com/problems/longest-increasing-subsequence/
	 * @param {number[]} nums
	 * @return {number}
	 */
	lengthOfLIS = nums => {
		var logarithmicSort = (nums, subsequence = []) => {
			for (const num of nums) {
				/* Time O(N) */
				const max = subsequence[subsequence.length - 1];

				const canAdd = max < num;
				if (canAdd) {
					subsequence.push(num);
					continue;
				} /* Space O(N) */

				const index = binarySearch(
					num,
					subsequence
				); /* Time O(log(N)) */

				subsequence[index] = num;
			}

			return subsequence;
		};

		const binarySearch = (num, subsequence) => {
			let [left, right] = [0, subsequence.length - 1];

			while (left < right) {
				/* Time O(log(N)) */
				const mid = (left + right) >> 1;
				const guess = subsequence[mid];

				const isNumTarget = num === guess;
				if (isNumTarget) return mid;

				const isNumGreater = guess < num;
				if (isNumGreater) left = mid + 1;

				const isNumLess = num < guess;
				if (isNumLess) right = mid;
			}

			return left;
		};

		const subsequence = logarithmicSort(nums); /* Time O(N * log(N) */

		return subsequence.length;
	};

	solve(nums) {
		return this.lengthOfLIS_dp(nums);
	}
}

module.exports = { Problem };
