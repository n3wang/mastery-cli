class LargestColorValueInADirectedGraph {
	solve(colors, edge) {
		return this.largestPathValue(colors, edge);
	}

	largestPathValue(colors, edges) {
		const n = colors.length;
		const adj = new Map();

		for (const edge of edges) {
			const [u, v] = edge;
			if (!adj.has(u)) {
				adj.set(u, []);
			}
			adj.get(u).push(v);
		}

		const count = new Array(n).fill(0).map(() => new Array(26).fill(0));
		const visit = new Array(n).fill(false);
		const inStack = new Array(n).fill(false);

		function dfs(node) {
			if (inStack[node]) {
				return Infinity;
			}
			if (visit[node]) {
				return count[node][colors.charCodeAt(node) - 'a'.charCodeAt(0)];
			}

			visit[node] = true;
			inStack[node] = true;

			if (adj.has(node)) {
				for (const neighbor of adj.get(node)) {
					if (dfs(neighbor) === Infinity) {
						return Infinity;
					}
					for (let i = 0; i < 26; i++) {
						count[node][i] = Math.max(
							count[node][i],
							count[neighbor][i]
						);
					}
				}
			}

			count[node][colors.charCodeAt(node) - 'a'.charCodeAt(0)]++;
			inStack[node] = false;

			return count[node][colors.charCodeAt(node) - 'a'.charCodeAt(0)];
		}

		let answer = 0;
		for (let i = 0; i < n; i++) {
			answer = Math.max(answer, dfs(i));
		}

		return answer === Infinity ? -1 : answer;
	}
}

module.exports = { Problem: LargestColorValueInADirectedGraph };
