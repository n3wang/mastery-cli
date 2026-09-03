class CampusBikes {
	solve(workers, bikes) {
		return assignBikes(workers, bikes);
	}
}

function assignBikes(workers, bikes) {
	const getDist = ([x1, y1], [x2, y2]) =>
		Math.abs(x1 - x2) + Math.abs(y1 - y2);

	const dists = [];
	for (let i = 0; i < workers.length; i++) {
		for (let j = 0; j < bikes.length; j++) {
			const d = getDist(workers[i], bikes[j]);
			if (dists[d] == null) dists[d] = [];
			dists[d].push([i, j]);
		}
	}

	const res = [];
	for (const bucket of dists) {
		if (bucket != null) {
			for (const [i, j] of bucket) {
				if (workers[i] != null && bikes[j] != null) {
					workers[i] = null;
					bikes[j] = null;
					res[i] = j;
				}
			}
		}
	}
	return res;
}

module.exports = { Problem: CampusBikes };
