class StoneGameII {
	solve(piles) {
		return stoneGameII(piles);
	}
}

function stoneGameII(piles) {
	const n = piles.length;
	const dp = new Array(2).fill(null).map(() => {
		return new Array(n + 1).fill(null).map(() => {
			return new Array(n + 1).fill(-1);
		});
	});

	function f(p, i, m) {
		if (i === n) {
			return 0;
		}
		if (dp[p][i][m] !== -1) {
			return dp[p][i][m];
		}
		let res = p === 1 ? 1000000 : -1;
		let s = 0;
		for (let x = 1; x <= Math.min(2 * m, n - i); x++) {
			s += piles[i + x - 1];
			if (p === 0) {
				res = Math.max(res, s + f(1, i + x, Math.max(m, x)));
			} else {
				res = Math.min(res, f(0, i + x, Math.max(m, x)));
			}
		}
		dp[p][i][m] = res;
		return res;
	}

	return f(0, 0, 1);
}

module.exports = { Problem: StoneGameII };
