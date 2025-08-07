class IsGraphBipartite {
	solve(graph) {
		return isBipartite(graph);
	}
}

function isBipartite(graph) {
	const n = graph.length;
	const color = new Array(n).fill(-1);

	for (let start = 0; start < n; ++start) {
		if (color[start] === -1) {
			const stack = [];
			stack.push(start);
			color[start] = 0;

			while (stack.length > 0) {
				const node = stack.pop();
				for (const nei of graph[node]) {
					if (color[nei] === -1) {
						stack.push(nei);
						color[nei] = color[node] ^ 1;
					} else if (color[nei] === color[node]) {
						return false;
					}
				}
			}
		}
	}

	return true;
}

module.exports = { Problem: IsGraphBipartite };

function isBipartite(graph) {
	const n = graph.length;
	const color = new Array(n).fill(-1);

	for (let start = 0; start < n; ++start) {
		if (color[start] === -1) {
			const stack = [];
			stack.push(start);
			color[start] = 0;

			while (stack.length > 0) {
				const node = stack.pop();
				for (const nei of graph[node]) {
					if (color[nei] === -1) {
						stack.push(nei);
						color[nei] = color[node] ^ 1;
					} else if (color[nei] === color[node]) {
						return false;
					}
				}
			}
		}
	}

	return true;
}
