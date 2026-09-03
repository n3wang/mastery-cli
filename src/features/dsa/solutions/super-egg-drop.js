class SuperEggDrop {
	solve(K, N) {
		return this.superEggDrop(K, N);
	}

	superEggDrop(K, N) {
		function f(x) {
			let ans = 0;
			let r = 1;
			for (let i = 1; i <= K; i++) {
				r *= x - i + 1;
				r = Math.floor(r / i);
				ans += r;
				if (ans >= N) break;
			}
			return ans;
		}

		let lo = 1;
		let hi = N;
		while (lo < hi) {
			let mi = Math.floor((lo + hi) / 2);
			if (f(mi) < N) {
				lo = mi + 1;
			} else {
				hi = mi;
			}
		}
		return lo;
	}
}

module.exports = { Problem: SuperEggDrop };
