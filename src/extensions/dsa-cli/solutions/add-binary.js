class AddBinary {
	solve(a, b) {
		const n = Math.max(a.length, b.length);
		a = a.padStart(n, '0');
		b = b.padStart(n, '0');

		let carry = 0;
		const answer = [];

		for (let i = n - 1; i >= 0; i--) {
			if (a[i] === '1') {
				carry += 1;
			}
			if (b[i] === '1') {
				carry += 1;
			}

			if (carry % 2 === 1) {
				answer.push('1');
			} else {
				answer.push('0');
			}

			carry = Math.floor(carry / 2);
		}

		if (carry === 1) {
			answer.push('1');
		}

		return answer.reverse().join('');
	}
}

module.exports = { Problem: AddBinary };
