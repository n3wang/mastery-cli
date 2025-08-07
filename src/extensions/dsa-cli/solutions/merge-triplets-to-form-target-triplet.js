class MergeTriplets {
	/**
	 * https://leetcode.com/problems/merge-triplets-to-form-target-triplet/
	 * Time O(N) | Space O(1)
	 * @param {number[][]} triplets
	 * @param {number[]} target
	 * @return {boolean}
	 */
	mergeTriplets = function (triplets, target, res = new Array(3).fill(0)) {
		for (const [a, b, c] of triplets) {
			/* Time O(N) */
			const [_a, _b, _c] = target;

			const isTargetGreater = a <= _a && b <= _b && c <= _c;
			if (!isTargetGreater) continue;

			const [__a, __b, __c] = res;
			res = [Math.max(__a, a), Math.max(__b, b), Math.max(__c, c)];
		}

		return res.every((val, i) => val === target[i]); /* Time O(N) */
	};

	solve(triplets, target) {
		return this.mergeTriplets(triplets, target);
	}
}

module.exports = { Problem: MergeTriplets };
