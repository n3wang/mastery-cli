class MinCostConnectPoints {
	solve(points) {
		return minCostConnectPoints(points);
	}
}

let minCostConnectPoints = function (points) {
	let n = points.length;
	let mstCost = 0;
	let edgesUsed = 0;

	// Track nodes which are visited.
	let inMST = Array(n).fill(false);

	let minDist = Array(n).fill(Number.MAX_SAFE_INTEGER);
	minDist[0] = 0;

	while (edgesUsed < n) {
		let currMinEdge = Number.MAX_SAFE_INTEGER;
		let currNode = -1;

		// Pick least weight node which is not in MST.
		for (let node = 0; node < n; ++node) {
			if (!inMST[node] && currMinEdge > minDist[node]) {
				currMinEdge = minDist[node];
				currNode = node;
			}
		}

		mstCost += currMinEdge;
		edgesUsed++;
		inMST[currNode] = true;

		// Update adjacent nodes of current node.
		for (let nextNode = 0; nextNode < n; ++nextNode) {
			let weight =
				Math.abs(points[currNode][0] - points[nextNode][0]) +
				Math.abs(points[currNode][1] - points[nextNode][1]);

			if (!inMST[nextNode] && minDist[nextNode] > weight) {
				minDist[nextNode] = weight;
			}
		}
	}

	return mstCost;
};

module.exports = { Problem: MinCostConnectPoints };
