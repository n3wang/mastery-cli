class TrailingZeroes {
	solve(n) {
		let zeroCount = 0;
		let currentMultiple = 5;

		while (n >= currentMultiple) {
			zeroCount += Math.floor(n / currentMultiple);
			currentMultiple *= 5;
		}

		return zeroCount;
	}
}

module.exports = { Problem: TrailingZeroes };
