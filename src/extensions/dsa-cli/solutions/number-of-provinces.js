class NumberOfProvinces {
	solve(isConnected) {
		return findCircleNum(isConnected);
	}
}

function findCircleNum(isConnected) {
	const n = isConnected.length;
	let numberOfComponents = 0;
	const visited = new Array(n).fill(false);

	function bfs(node) {
		const queue = [];
		queue.push(node);
		visited[node] = true;

		while (queue.length > 0) {
			node = queue.shift();

			for (let i = 0; i < n; i++) {
				if (isConnected[node][i] === 1 && !visited[i]) {
					queue.push(i);
					visited[i] = true;
				}
			}
		}
	}

	for (let i = 0; i < n; i++) {
		if (!visited[i]) {
			numberOfComponents++;
			bfs(i);
		}
	}

	return numberOfComponents;
}

module.exports = { Problem: NumberOfProvinces };
