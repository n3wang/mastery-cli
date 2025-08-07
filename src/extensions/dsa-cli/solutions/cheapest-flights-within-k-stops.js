const { PriorityQueue } = require('./structures.js');

class CheapestFlightsWithinKStops {
	solve(n, flights, src, dst, k) {
		return this.findCheapestPrice(n, flights, src, dst, k);
	}

	findCheapestPrice(n, flights, src, dst, k) {
		const adj = new Map();
		for (const flight of flights) {
			const [start, end, price] = flight;
			if (!adj.has(start)) {
				adj.set(start, []);
			}
			adj.get(start).push([end, price]);
		}

		const stops = new Array(n).fill(Infinity);
		const pq = new PriorityQueue((a, b) => a[0] - b[0]);
		pq.enqueue([0, src, 0]);

		while (!pq.isEmpty()) {
			const [dist, node, steps] = pq.dequeue();
			if (steps > stops[node] || steps > k + 1) {
				continue;
			}
			stops[node] = steps;
			if (node === dst) {
				return dist;
			}
			if (!adj.has(node)) {
				continue;
			}
			for (const [nextNode, price] of adj.get(node)) {
				pq.enqueue([dist + price, nextNode, steps + 1]);
			}
		}
		return -1;
	}
}

module.exports = { Problem: CheapestFlightsWithinKStops };
