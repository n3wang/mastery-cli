class KClosest {
	squaredDistance = ([x, y]) => x ** 2 + y ** 2;

	k_closest = function (points, k) {
		// Sort the array with a custom lambda comparator function
		points.sort(
			(a, b) => this.squaredDistance(a) - this.squaredDistance(b)
		);

		// Return the first k elements of the sorted array
		return points.slice(0, k);
	};

	solve(points, k) {
		return this.k_closest(points, k);
	}
}

module.exports = { Problem: KClosest };
