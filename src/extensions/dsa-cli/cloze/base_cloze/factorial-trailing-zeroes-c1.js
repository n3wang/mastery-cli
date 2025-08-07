class TrailingZeroes {
	solve(n) {
		let zeroCount = 0;
		let currentMultiple = 5;

		while (n >= currentMultiple) {
			// TODO Knowing that n is an integer, what is the value of Math.floor(n / currentMultiple)?
			// Remember to multiply the current multiple. until the current multiple is larger than n.
		}

		return zeroCount;
	}
}

module.exports = { Problem: TrailingZeroes };
