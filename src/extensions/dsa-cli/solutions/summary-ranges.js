class SummaryRanges {
	solve(nums) {
		const ranges = [];

		for (let i = 0; i < nums.length; i++) {
			let start = nums[i];

			// Keep iterating until the next element is one more than the current element.
			while (i + 1 < nums.length && nums[i] + 1 === nums[i + 1]) {
				i++;
			}

			if (start !== nums[i]) {
				ranges.push(start + '->' + nums[i]);
			} else {
				ranges.push(String(start));
			}
		}

		return ranges;
	}
}

module.exports = { Problem: SummaryRanges };
