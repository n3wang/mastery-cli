class KClosest {
	squaredDistance = ([x, y]) => x ** 2 + y ** 2;

	k_closest = function (points, k) {
		// TODO Complete the k_closest function which sorts the points by the squared distance and returns the first k elements.
	};

	solve(points, k) {
		return this.k_closest(points, k);
	}
}

module.exports = { Problem: KClosest };
