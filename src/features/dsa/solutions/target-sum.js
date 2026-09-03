class TargetSum {
	/**
	 * DP - Top Down
	 * Array - Tabulation
	 * Time O(N * M) | Space O(M)
	 * https://leetcode.com/problems/target-sum/
	 * @param {number[]} nums
	 * @param {number} target
	 * @return {number}
	 */
	findTargetSumWays = (nums, target) => {
		var initTabu = total =>
			new Array((total + 1) << 1).fill(0); /* Time O(M) | Space O(M) */

		var getTabu = (nums, total) => {
			const tabu = initTabu(total); /* Time O(M) | Space O(M) */
			const [left, right] = [total + nums[0], total - nums[0]];

			tabu[left] = 1; /*           | Space O(M) */
			tabu[right] += 1; /*           | Space O(M) */

			return tabu;
		};

		var search = (nums, total, tabu) => {
			for (let i = 1; i < nums.length; i++) {
				/* Time O(N) */
				const num = nums[i];
				const temp = initTabu(total); /* Time O(M) | Space O(M) */

				tabu = update(
					num,
					total,
					tabu,
					temp
				); /* Time O(M) | Space O(M) */
			}

			return tabu;
		};

		var update = (num, total, tabu, temp) => {
			for (let sum = -total; sum <= total; sum++) {
				/* Time O(M) */
				const isInvalid = tabu[sum + total] <= 0;
				if (isInvalid) continue;

				const dpSum = tabu[sum + total];
				const left = sum + num + total;
				const right = sum - num + total;

				temp[left] += dpSum; /* Space O(M) */
				temp[right] += dpSum; /* Space O(M) */
			}

			return temp;
		};

		const total = nums.reduce((sum, num) => sum + num, 0); /* Time O(N) */
		let tabu = getTabu(nums, total); /* Time O(M)     | Space O(M) */

		tabu = search(nums, total, tabu); /* Time O(N * M) | Space O(M) */

		return Math.abs(target) <= total ? tabu[target + total] : 0;
	};

	solve(nums, target) {
		return this.findTargetSumWays(nums, target);
	}
}

module.exports = { Problem: TargetSum };
