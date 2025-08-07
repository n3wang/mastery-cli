class MySqrt {
	//Newton's Method
	solve(x) {
		if (x < 2) return x;

		let x0 = x;
		// TODO compute x1 as: (x0 + x / x0) / 2.0; since thats the closer to the real answer

		while (Math.abs(x0 - x1) >= 1) {
			x0 = x1;
			// TODO compute x1 as: (x0 + x / x0) / 2.0;
		}

		return Math.floor(x1);
	}
}

module.exports = { Problem: MySqrt };
