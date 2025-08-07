class AllPathsFromSourceToTarget {
	solve(graphs) {
		return allPathsSourceTarget(graphs);
	}
}

function allPathsSourceTarget(graph) {
	const target = graph.length - 1;

	// Create a map for memoization
	const memo = new Map();

	function allPathsToTarget(currNode) {
		if (currNode === target) {
			return [[target]];
		}

		if (memo.has(currNode)) {
			return memo.get(currNode);
		}

		const results = [];
		for (const nextNode of graph[currNode]) {
			for (const path of allPathsToTarget(nextNode)) {
				results.push([currNode, ...path]);
			}
		}

		memo.set(currNode, results);
		return results;
	}

	return allPathsToTarget(0);
}

module.exports = { Problem: AllPathsFromSourceToTarget };
