const DEBUG = false;

function heuristic(a, b) {
	return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
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

class Node {
	constructor(id, x, y) {
		this.id = id;
		this.x = x;
		this.y = y;
	}
}

class Graph {
	constructor() {
		this.edges = {};
	}

	addEdge(node, neighbor) {
		// Create a new entry for the node if it doesn't exist
		if (!this.edges[node.id]) {
			this.edges[node.id] = [];
		}

		this.edges[node.id].push(neighbor);
		// Add the node to the neighbor's list of neighbors
		if (!this.edges[neighbor.id]) {
			this.edges[neighbor.id] = [];
		}
		this.edges[neighbor.id].push(node);
	}

	neighbors(node) {
		return this.edges[node.id];
	}

	cost(nodeA, nodeB) {
		return 1; // Assuming uniform cost for this example
	}

	dfs(currentNode, visitedNodes = new Set()) {
		visitedNodes.add(currentNode);

		if (!this.edges[currentNode.id]) {
			if (DEBUG) console.log('No neighbors (leaf node)');
			// console.log("Path", visitedNodes);
			printPath(visitedNodes);
			return;
		} // No neighbors (leaf node)

		this.neighbors(currentNode).forEach(neighbor => {
			if (!visitedNodes.has(neighbor)) {
				this.dfs(neighbor, new Set(visitedNodes));
			}
		});
	}
}

class HillClimbingSearch {
	/**
	 *
	 * @param {Graph} graph a graph of nodes
	 * @param {Node} start start node
	 * @param {Node} goal end goal node
	 * @returns {Dict} path, cost, count_searches, formatted_path, exploration_path
	 */
	hillClimbing(graph, start, goal) {
		let current = start;
		let count_searches = 0;
		let exploration_path = [];

		const cameFrom = new Map();
		cameFrom.set(start, null);

		while (current !== goal) {
			count_searches += 1;
			exploration_path.push(current);

			// console.log('neighbors', graph);
			const neighbors = graph.neighbors(current);
			if (neighbors?.length === 0) {
				break;
			}

			let bestNext = null;
			let bestHeuristic = Infinity;

			// For debugging reasons:
			console.log(
				'neighbors',
				neighbors.map(node => {
					return {
						...node,
						'heuristic (distance)': heuristic(goal, node)
					};
				})
			);
			neighbors.forEach(next => {
				if (!cameFrom.has(next)) {
					const nextHeuristic = heuristic(goal, next);
					if (nextHeuristic < bestHeuristic) {
						bestHeuristic = nextHeuristic;
						bestNext = next;
					}
				}
			});

			console.log('bestNext selected: ', bestNext);

			if (!bestNext || bestHeuristic > heuristic(goal, current)) {
				throw new Error(
					'The algorithm got stuck and could not find a solution.'
				);
			}

			cameFrom.set(bestNext, current);
			current = bestNext;
		}

		return {
			path: reconstructPath(cameFrom, start, goal),
			cost: reconstructPath(cameFrom, start, goal).reduce(
				(acc, node) => acc + graph.cost(node, cameFrom.get(node)),
				0
			),
			count_searches: count_searches,
			formatted_path: reconstructPath(cameFrom, start, goal)
				.map(node => node.id)
				.join(' -> '),
			exploration_path: exploration_path
		};
	}

	solve(graph, start, goal) {
		return this.hillClimbing(graph, start, goal);
	}
}

module.exports = { Problem: HillClimbingSearch };
