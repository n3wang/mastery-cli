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
			// TODO Iterate over each of the neighbors, and call hasRedundantConnection on each of them.
			// If they have so return true;

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
