class MaxPoints {
	solve(points) {
		const n = points.length;
		if (n === 1) {
			return 1;
		}
		let result = 2;
		for (let i = 0; i < n; i++) {
			const cnt = new Map();
			for (let j = 0; j < n; j++) {
				if (j !== i) {
					const slope = Math.atan2(
						points[j][1] - points[i][1],
						points[j][0] - points[i][0]
					);
					cnt.set(slope, (cnt.get(slope) || 0) + 1);
				}
			}
			result = Math.max(result, Math.max(...cnt.values()) + 1);
		}
		return result;
	}
}

module.exports = { Problem: MaxPoints };
