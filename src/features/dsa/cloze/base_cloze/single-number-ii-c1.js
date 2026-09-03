class SingleNumberII {
	solve(nums) {
		let seenOnce = 0;
		let seenTwice = 0;

		// TODO Flip once and twice.
		// Flipped once only occurs when the number is seen once and NOT on seemsTwice
		// Flipped twice only occurs when the number is seen twice and NOT on seemsOnce
		for (const num of nums) {
		}

		return seenOnce;
	}
}

module.exports = { Problem: SingleNumberII };
