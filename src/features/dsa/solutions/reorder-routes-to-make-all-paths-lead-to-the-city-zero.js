class ReorderRoutesToMakeAllPathLeadToTheCityZero {
	solve(n, connections) {
		return minReorder(n, connections);
	}
}

function minReorder(n, connections) {
	let count = 0;

	function bfs(node, n, adj) {
		const queue = [];
		const visit = new Array(n).fill(false);
		queue.push(node);
		visit[node] = true;

		while (queue.length > 0) {
			node = queue.shift();
			for (const [neighbor, sign] of adj[node]) {
				if (!visit[neighbor]) {
					count += sign;
					visit[neighbor] = true;
					queue.push(neighbor);
				}
			}
		}
	}

	const adj = Array(n)
		.fill()
		.map(() => []);

	for (const connection of connections) {
		adj[connection[0]].push([connection[1], 1]);
		adj[connection[1]].push([connection[0], 0]);
	}

	bfs(0, n, adj);
	return count;
}

module.exports = { Problem: ReorderRoutesToMakeAllPathLeadToTheCityZero };
