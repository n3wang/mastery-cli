class MinimumNumberOfArrowsToBurstBalloons {
	solve(points) {
		if (points.length === 0) return 0;

		// Sort by x_end
		points.sort((a, b) => {
			// We can't simply use the a[1] - b[1] trick, as this may cause integer overflow.
			if (a[1] === b[1]) return 0;
			if (a[1] < b[1]) return -1;
			return 1;
		});

		let arrows = 1;
		let xStart,
			xEnd,
			firstEnd = points[0][1];
		for (const p of points) {
			xStart = p[0];
			xEnd = p[1];
			// If the current balloon starts after the end of another one,
			// one more arrow is needed.
			if (firstEnd < xStart) {
				arrows++;
				firstEnd = xEnd;
			}
		}

		return arrows;
	}
}

module.exports = { Problem: MinimumNumberOfArrowsToBurstBalloons };
