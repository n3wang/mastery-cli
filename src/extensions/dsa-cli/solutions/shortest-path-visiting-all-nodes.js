class ShortestPathVisitingAllNodes {
	solve(graph) {
		if (graph.length === 1) {
			return 0;
		}

		const n = graph.length;
		const endingMask = (1 << n) - 1;
		let queue = [...Array(n)].map((_, node) => [node, 1 << node]);
		const seen = new Set(queue);

		let steps = 0;
		while (queue.length > 0) {
			const nextQueue = [];
			for (let i = 0; i < queue.length; i++) {
				const [node, mask] = queue[i];
				for (const neighbor of graph[node]) {
					const nextMask = mask | (1 << neighbor);
					if (nextMask === endingMask) {
						return 1 + steps;
					}

					const neighborTuple = [neighbor, nextMask];
					if (!seen.has(neighborTuple)) {
						seen.add(neighborTuple);
						nextQueue.push(neighborTuple);
					}
				}
			}

			steps++;
			queue = nextQueue;
		}

		return -1; // If we reach here, no valid path exists
	}
}

module.exports = { Problem: ShortestPathVisitingAllNodes };
