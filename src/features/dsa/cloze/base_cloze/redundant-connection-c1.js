class ReduntantConnection {
	/**
	 * https://leetcode.com/problems/redundant-connection/
	 * Time O((V)^2 + E) | Space O(V + E)
	 * @param {number[][]} edges
	 * @return {number[]}
	 */
	findRedundantConnection = function (edges) {
		const hasRedundantConnection = (
			graph,
			source,
			target,
			seen = new Set()
		) => {
			// TODO Check if the source has been seen before, if it has, then return false
			// TODO Otherwise add it to the seen, and if the source is equal to the target, dfs see if there is an redundant node.
		};

		const dfs = (graph, source, target, seen) => {
			for (const neighbor of graph[source]) {
				if (hasRedundantConnection(graph, neighbor, target, seen))
					return true;
			}

			return false;
		};

		const graph = new Array(1000 + 1).fill().map(() => []);

		for (const [src, dst] of edges) {
			const hasNodes = src in graph && dst in graph;
			if (hasNodes && hasRedundantConnection(graph, src, dst))
				return [src, dst];

			graph[src].push(dst);
			graph[dst].push(src);
		}
	};

	solve(edges) {
		return this.findRedundantConnection(edges);
	}
}

module.exports = { Problem: ReduntantConnection };
