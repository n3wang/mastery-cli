class BusRoutes {
	solve(routes, source, target) {
		return numBusesToDestination(routes, source, target);
	}
}

/**
 * @param {number[][]} routes
 * @param {number} source
 * @param {number} target
 * @return {number}
 */
var numBusesToDestination = function (routes, source, target) {
	// If source and target are the same, no buses are needed.
	if (source === target) {
		return 0;
	}

	// Create an adjacency list to represent stops and the routes that include each stop.
	const adjList = new Map();
	for (let route = 0; route < routes.length; route++) {
		for (let stop of routes[route]) {
			adjList.set(stop, (adjList.get(stop) || []).concat(route));
		}
	}

	// Initialize a queue for BFS and a set to keep track of visited routes.
	const q = [];
	const vis = new Set();

	// Insert all the routes in the queue that have the source stop.
	for (let route of adjList.get(source) || []) {
		q.push(route);
		vis.add(route);
	}

	let busCount = 1; // Initialize the bus count.

	// Perform BFS to find the minimum number of buses needed.
	while (q.length > 0) {
		const size = q.length;

		for (let i = 0; i < size; i++) {
			const route = q.shift();

			// Iterate over the stops in the current route.
			for (let stop of routes[route]) {
				// Return the current count if the target is found.
				if (stop === target) {
					return busCount;
				}

				// Iterate over the next possible routes from the current stop.
				for (let nextRoute of adjList.get(stop) || []) {
					if (!vis.has(nextRoute)) {
						vis.add(nextRoute);
						q.push(nextRoute);
					}
				}
			}
		}
		busCount++;
	}

	// If no route is found, return -1.
	return -1;
};

module.exports = { Problem: BusRoutes };
