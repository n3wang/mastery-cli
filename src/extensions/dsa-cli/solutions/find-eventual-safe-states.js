class FindEventualSafeStates {
	solve(graph) {
		return eventualSafeNodes(graph);
	}
}

function eventualSafeNodes(graph) {
	const n = graph.length;
	const visit = new Array(n).fill(false);
	const inStack = new Array(n).fill(false);
	const safeNodes = [];

	function dfs(node) {
		if (inStack[node]) {
			return true;
		}
		if (visit[node]) {
			return false;
		}

		visit[node] = true;
		inStack[node] = true;

		for (const neighbor of graph[node]) {
			if (dfs(neighbor)) {
				return true;
			}
		}

		inStack[node] = false;
		return false;
	}

	for (let i = 0; i < n; i++) {
		if (!dfs(i)) {
			safeNodes.push(i);
		}
	}

	return safeNodes;
}

module.exports = { Problem: FindEventualSafeStates };
