function minimumSizeSubArraySum(nums, target) {
	let min = Infinity;
	let sum = 0;
	let start = 0;
	for (let i = 0; i < nums.length; i++) {
		sum += nums[i];
		while (sum >= target) {
			min = Math.min(min, i - start + 1);
			sum -= nums[start];
			start++;
		}
	}
	return min === Infinity ? 0 : min;
}

class MinimumSizeSubArraySum {
	solve(target, nums) {
		return minimumSizeSubArraySum(nums, target);
	}
}

module.exports = { Problem: MinimumSizeSubArraySum };
