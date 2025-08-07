class MinimumNumberOfVerticesToReachAllNodes {
	solve(n, edges) {
		return findSmallestSetOfVertices(n, edges);
	}
}

function findSmallestSetOfVertices(n, edges) {
	// Array to signify if the vertex has an incoming edge or not.
	const isIncomingEdgeExists = new Array(n).fill(false);

	for (const edge of edges) {
		isIncomingEdgeExists[edge[1]] = true;
	}

	const requiredNodes = [];

	for (let i = 0; i < n; i++) {
		// Store all the nodes that don't have an incoming edge.
		if (!isIncomingEdgeExists[i]) {
			requiredNodes.push(i);
		}
	}

	return requiredNodes;
}

module.exports = { Problem: MinimumNumberOfVerticesToReachAllNodes };
