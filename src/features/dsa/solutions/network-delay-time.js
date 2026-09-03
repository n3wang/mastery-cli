class NetworkDelayTime {
	/**
	 * Graph - BFS
	 * Queue - Space (WIDTH)
	 * Array - Greedy
	 * https://leetcode.com/problems/network-delay-time/
	 * @param {number[][]} times
	 * @param {number} n
	 * @param {number} k
	 * @return {number}
	 */
	networkDelayTime = (times, n, k) => {
		var initGraph = (n, k) => ({
			graph: Array.from({ length: n + 1 })
				.fill()
				.map(() => []),
			maxTime: Array.from({ length: n + 1 }).fill(Infinity),
			queue: new Queue([[k, 0]])
		});

		var buildGraph = (times, n, k) => {
			const { graph, maxTime, queue } = initGraph(n, k);

			for (const [src, dst, weight] of times) {
				graph[src].push([dst, weight]);
			}

			maxTime[0] = 0;

			return { graph, maxTime, queue };
		};

		var bfs = (queue, graph, maxTime) => {
			while (!queue.isEmpty()) {
				for (let level = queue.size() - 1; 0 <= level; level--) {
					checkNeighbors(queue, graph, maxTime);
				}
			}
		};

		var checkNeighbors = (queue, graph, maxTime) => {
			const [node, time] = queue.dequeue();

			const canUpdate = time < maxTime[node];
			if (!canUpdate) return;

			maxTime[node] = time;

			for (const [dst, weight] of graph[node]) {
				queue.enqueue([dst, weight + time]);
			}
		};

		var checkAns = maxTime => {
			const max = Math.max(...maxTime);

			return max < Infinity ? max : -1;
		};

		const { graph, maxTime, queue } = buildGraph(times, n, k);

		bfs(queue, graph, maxTime, k);

		return checkAns(maxTime);
	};

	solve(times, n, k) {
		return this.networkDelayTime(times, n, k);
	}
}

module.exports = { Problem: NetworkDelayTime };
