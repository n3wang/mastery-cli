class CountNumberOfHomogenousSubstrings {
	solve(s) {
		return this.countHomogenous(s);
	}

	countHomogenous(s) {
		let count = 0;
		let streak = 0;
		const MOD = 10 ** 9 + 7;

		for (let left = 0; left < s.length; left++) {
			if (left === 0 || s[left] === s[left - 1]) {
				streak += 1;
			} else {
				streak = 1;
			}
			count += streak;
		}

		return count % MOD;
	}
}

module.exports = { Problem: CountNumberOfHomogenousSubstrings };
