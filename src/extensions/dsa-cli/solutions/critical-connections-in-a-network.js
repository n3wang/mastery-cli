class CriticalConnectionsInANetwork {
	solve(n, connections) {
		return criticalConnections(n, connections);
	}
}

function criticalConnections(n, connections) {
	const graph = new Map();
	const rank = new Map();
	const connDict = new Map();

	// Default rank for unvisited nodes is "null"
	for (let i = 0; i < n; i++) {
		graph.set(i, []);
		rank.set(i, null);
	}

	// Form the graph
	for (const edge of connections) {
		const u = edge[0];
		const v = edge[1];
		graph.get(u).push(v);
		graph.get(v).push(u);
		const sortedU = Math.min(u, v);
		const sortedV = Math.max(u, v);
		connDict.set(`${sortedU}-${sortedV}`, true);
	}

	const result = [];

	function dfs(node, discoveryRank) {
		// That means this node is already visited. We simply return the rank.
		if (rank.get(node) !== null) {
			return rank.get(node);
		}

		// Update the rank of this node.
		rank.set(node, discoveryRank);

		// This is the max we have seen till now. So we start with this instead of INT_MAX or something.
		let minRank = discoveryRank + 1;

		for (const neighbor of graph.get(node)) {
			// Skip the parent.
			const neighRank = rank.get(neighbor);
			if (neighRank !== null && neighRank === discoveryRank - 1) {
				continue;
			}

			// Recurse on the neighbor.
			const recursiveRank = dfs(neighbor, discoveryRank + 1);

			// Step 1, check if this edge needs to be discarded.
			if (recursiveRank <= discoveryRank) {
				const sortedU = Math.min(node, neighbor);
				const sortedV = Math.max(node, neighbor);
				connDict.delete(`${sortedU}-${sortedV}`);
			}

			// Step 2, update the minRank if needed.
			minRank = Math.min(minRank, recursiveRank);
		}

		return minRank;
	}

	// Call DFS starting from node 0
	dfs(0, 0);

	for (const [key, value] of connDict) {
		const [u, v] = key.split('-').map(Number);
		result.push([u, v]);
	}

	return result;
}

module.exports = { Problem: CriticalConnectionsInANetwork };
