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
			if (seen.has(source)) return false;
			seen.add(source);

			const isEqual = source === target;
			if (isEqual) return true;

			return dfs(graph, source, target, seen);
		};

		const dfs = (graph, source, target, seen) => {
			for (const neighbor of graph[source]) {
				if (hasRedundantConnection(graph, neighbor, target, seen))
					return true;
			}

			return false;
		};

		const graph = new Array(1000 + 1).fill().map(() => []);

		// TODO Iterate over each of the edges, and check if there is a redundant connection.
		// TODO There are nodes in the graph wheather src is in graph or destiny. Add them both after iterating.
		// TODO If there is nodes and there is a redundant connection return the src and dst.
	};

	solve(edges) {
		return this.findRedundantConnection(edges);
	}
}

module.exports = { Problem: ReduntantConnection };
