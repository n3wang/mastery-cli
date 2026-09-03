class SingleNumberII {
	solve(nums) {
		let seenOnce = 0;
		let seenTwice = 0;

		for (const num of nums) {
			seenOnce = (seenOnce ^ num) & ~seenTwice;
			seenTwice = (seenTwice ^ num) & ~seenOnce;
		}

		return seenOnce;
	}
}

module.exports = { Problem: SingleNumberII };
