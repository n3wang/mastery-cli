class TallestBillboard {
	solve(rods) {
		return tallestBillboard(rods);
	}
}

var tallestBillboard = function (rods) {
	// dp[taller - shorter] = taller
	let dp = { 0: 0 };

	for (const r of rods) {
		// dp.copy() means we don't add r to these stands.
		const new_dp = { ...dp };
		for (const [diff, taller] of Object.entries(dp)) {
			const shorter = taller - parseInt(diff);

			// Add r to the taller stand, thus the height difference is increased to diff + r.
			new_dp[parseInt(diff) + r] = Math.max(
				new_dp[parseInt(diff) + r] || 0,
				taller + r
			);

			// Add r to the shorter stand, the height difference is expressed as abs(shorter + r - taller).
			const new_diff = Math.abs(shorter + r - taller);
			const new_taller = Math.max(shorter + r, taller);
			new_dp[new_diff] = Math.max(new_dp[new_diff] || 0, new_taller);
		}
		dp = new_dp;
	}

	// Return the maximum height with 0 difference.
	return dp[0] || 0;
};

module.exports = { Problem: TallestBillboard };
