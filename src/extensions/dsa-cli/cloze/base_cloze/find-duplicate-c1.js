var findDuplicate = function (nums) {
	// TODO Implement the Floyd's Tortoise and Hare (Cycle Detection)
	// And then find the equal distance between both of them.
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
