class SumOfAbsoluteDifferenceInASortedArray {
	solve(nums) {
		const n = nums.length;
		const prefix = [nums[0]];

		for (let i = 1; i < n; i++) {
			prefix.push(prefix[i - 1] + nums[i]);
		}

		const ans = [];

		for (let i = 0; i < n; i++) {
			const leftSum = prefix[i] - nums[i];
			const rightSum = prefix[n - 1] - prefix[i];

			const leftCount = i;
			const rightCount = n - 1 - i;

			const leftTotal = leftCount * nums[i] - leftSum;
			const rightTotal = rightSum - rightCount * nums[i];

			ans.push(leftTotal + rightTotal);
		}

		return ans;
	}
}

module.exports = { Problem: SumOfAbsoluteDifferenceInASortedArray };
