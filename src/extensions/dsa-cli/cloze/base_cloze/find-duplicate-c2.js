var findDuplicate = function (nums) {
	if (!nums.length) return -1;

	let [slow, fast] = moveFast(nums); /* Time O(N) */
	[slow, fast] = moveSlow(nums, slow, fast); /* Time O(N) */

	return slow;
};

const moveFast = (nums, start = 0) => {
	let [slow, fast] = [nums[start], nums[nums[start]]];

	// TODO Implement the Floyd's Tortoise and Hare (Cycle Detection) algorithm

	// Rememeber to reset the fast as start and return [fast, slow]
};

const moveSlow = (nums, slow, fast) => {
	const isSame = () => slow === fast;
	while (!isSame()) {
		/* Time O(N) */
		slow = nums[slow];
		fast = nums[fast];
	}

	return [slow, fast];
};

class FindDuplicateNumber {
	solve(nums) {
		// Your code here
		return findDuplicate(nums);
	}
}

module.exports = { Problem: FindDuplicateNumber };
