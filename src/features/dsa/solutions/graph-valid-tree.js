class GraphValidTree {
	validTree = function (n, edges, root = 0) {
		const dfs = (node, graph, visited) => {
			if (visited.has(node)) return;
			visited.add(node);

			for (const neighbor of graph[node]) {
				dfs(neighbor, graph, visited);
			}
		};

		var initGraph = n => ({
			graph: new Array(n).fill().map(() => []),
			visited: new Set()
		});

		var buildGraph = (n, edges) => {
			const { graph, visited } = initGraph(n);

			for (const [src, dst] of edges) {
				graph[src].push(dst);
				graph[dst].push(src);
			}

			return { graph, visited };
		};

		const isEqual = edges.length === n - 1;
		if (!isEqual) return false;

		const { graph, visited } = buildGraph(n, edges);

		dfs(root, graph, visited);

		return visited.size === n;
	};

	solve(n, edges) {
		return this.validTree(n, edges);
	}
}

module.exports = { Problem: GraphValidTree };
