class KnightProbabilityInChessboard {
	solve(n) {
		return soupServings(n);
	}
}

function soupServings(n) {
	const m = Math.ceil(n / 25);
	const dp = new Map();

	function calculateDp(i, j) {
		if (i <= 0 && j <= 0) {
			return 0.5;
		}
		if (i <= 0) {
			return 1.0;
		}
		if (j <= 0) {
			return 0.0;
		}
		if (dp.has(i) && dp.get(i).has(j)) {
			return dp.get(i).get(j);
		}

		const result =
			(calculateDp(i - 4, j) +
				calculateDp(i - 3, j - 1) +
				calculateDp(i - 2, j - 2) +
				calculateDp(i - 1, j - 3)) /
			4.0;

		if (!dp.has(i)) {
			dp.set(i, new Map());
		}
		dp.get(i).set(j, result);
		return result;
	}

	for (let k = 1; k <= m; k++) {
		if (calculateDp(k, k) > 1 - 1e-5) {
			return 1.0;
		}
	}
	return calculateDp(m, m);
}

module.exports = { Problem: KnightProbabilityInChessboard };
