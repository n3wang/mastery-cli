var findDuplicate = function (nums) {
	if (!nums.length) return -1;

	let [slow, fast] = moveFast(nums); /* Time O(N) */
	[slow, fast] = moveSlow(nums, slow, fast); /* Time O(N) */

	return slow;
};

const moveFast = (nums, start = 0) => {
	let [slow, fast] = [nums[start], nums[nums[start]]];

	const isSame = () => slow === fast;
	while (!isSame()) {
		/* Time O(N) */
		slow = nums[slow];
		fast = nums[nums[fast]];
	}

	fast = start;

	return [slow, fast];
};

const moveSlow = (nums, slow, fast) => {
	// TODO Move slow and find the equal disntance
};

class FindDuplicateNumber {
	solve(nums) {
		// Your code here
		return findDuplicate(nums);
	}
}

module.exports = { Problem: FindDuplicateNumber };
