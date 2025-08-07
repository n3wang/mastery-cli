/**
 *
 * @param {Graph} graph a graph of nodes
 * @param {Node} start start node
 * @param {Node} goal end goal node
 * @returns {Dict} path, cost, count_searches, formatted_path, exploration_path, queue_snapshot
 */
function depthFirstSearch(graph, start, goal) {
	const frontier = [];
	frontier.push(start);
	let count_searches = 0;
	let exploration_path = [];
	let queue_snapshot = [];

	// For backtracking purposes
	const cameFrom = new Map();
	cameFrom.set(start, null);
	const visited = new Set();

	while (frontier.length > 0) {
		const current = frontier.pop();

		if (visited.has(current)) continue;

		visited.add(current);
		count_searches += 1;
		exploration_path.push(current);
		queue_snapshot.push(frontier.slice());

		if (current === goal) {
			break;
		}

		const neighbors = graph.neighbors(current);
		try {
			neighbors.forEach(next => {
				if (!visited.has(next)) {
					frontier.push(next);
					cameFrom.set(next, current); // Remember where we came from
				}
			});
		} catch (e) {
			// console.log(e);
		}
	}

	return {
		path: reconstructPath(cameFrom, start, goal),
		cost: reconstructPathCost(cameFrom, start, goal), // There is no cost associated with DFS traversal, you can compute it if needed
		count_searches: count_searches,
		formatted_path: reconstructPath(cameFrom, start, goal)
			.map(node => node.id)
			.join(' -> '),
		exploration_path: exploration_path,
		queue_snapshot: queue_snapshot
	};
}

/**
 * Reconstructs the path from the cameFrom map<Node, Node> by shifting backwards from the goal node to the start node
 * @param {Map<Node, Node>} cameFrom
 * @param {Node} start
 * @param {Node} goal
 * @returns {Node[]} path taken.
 */
function reconstructPath(cameFrom, start, goal) {
	let current = goal;
	const path = [current];
	while (current !== start) {
		current = cameFrom.get(current);
		path.unshift(current);
	}
	return path;
}

/**
 * Reconstructs the path from the cameFrom map<Node, Node> by shifting backwards from the goal node to the start node
 * @param {Map<Node, Node>} cameFrom
 * @param {Node} start
 * @param {Node} goal
 * @returns {number} Cost of the path taken
 */
function reconstructPathCost(cameFrom, start, goal) {
	let current = goal;
	const path = [current];
	let cost = 0;
	while (current !== start) {
		current = cameFrom.get(current);
		path.unshift(current);
		// get the cost from the previous and the current (We are assuming uniform cost here.)
		cost += 1;
	}

	return cost;
}

class DepthFirstSearchAGraph {
	solve(graph, start, goal) {
		return depthFirstSearch(graph, start, goal);
	}
}

module.exports = { Problem: DepthFirstSearchAGraph };
