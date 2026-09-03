const DEBUG = false;

class Queue {
	constructor() {
		this.elements = [];
	}

	enqueue(element) {
		this.elements.push(element);
	}

	dequeue() {
		return this.elements.shift();
	}

	isEmpty() {
		return this.elements.length === 0;
	}

	getSnapshot() {
		return this.elements.map(item => {
			return { ...item };
		});
	}
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
		if (!this.edges[node.id]) {
			this.edges[node.id] = [];
		}
		this.edges[node.id].push(neighbor);
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

function heuristic(a, b) {
	return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

/**
 *
 * @param {Graph} graph a graph of nodes
 * @param {Node} start start node
 * @param {Node} goal end goal node
 * @returns {Dict} path, cost, count_searches, formatted_path, exploration_path, queue_snapshot
 */

function beamSearch(graph, start, goal, beamWidth) {
	const frontier = new Queue();
	frontier.enqueue([start]);
	let count_searches = 0;
	let exploration_path = [];
	let queue_snapshot = [];

	const cameFrom = new Map();
	cameFrom.set(start, null);

	while (!frontier.isEmpty()) {
		queue_snapshot.push(frontier.getSnapshot());
		const currentLevel = frontier.dequeue();
		const nextLevel = [];
		let levelCameFrom = new Map();

		console.log(
			'exploring current level:',
			currentLevel.map(node => node.id).join(', ')
		);
		for (const current of currentLevel) {
			count_searches += 1;

			current.heuristic = heuristic(current, goal);
			exploration_path.push(current);

			if (current === goal) {
				return {
					path: reconstructPath(cameFrom, start, goal),
					cost: count_searches,
					count_searches: count_searches,
					formatted_path: reconstructPath(cameFrom, start, goal)
						.map(node => node.id)
						.join(' -> '),
					exploration_path: exploration_path,
					queue_snapshot: queue_snapshot
				};
			}

			// If not found them on the neighbor yet then, add them to the next level queue if they are not already from where they came.
			const neighbors = graph.neighbors(current);
			if (neighbors?.length === 0) {
				continue;
			}
			try {
				for (const neighbor of neighbors) {
					if (!cameFrom.has(neighbor)) {
						// Also make sure that the neighbor is not already in the nextLevel
						if (nextLevel.find(node => node.id === neighbor.id)) {
							continue;
						}
						nextLevel.push(neighbor);
						levelCameFrom.set(neighbor, current);
					}
				}
			} catch {
				console.log('error, neighbor is undefined');
			}
		}

		// Sort and cut the next level of the beam width

		nextLevel.sort((a, b) => heuristic(a, goal) - heuristic(b, goal));
		const topNodes = nextLevel.slice(0, beamWidth); // After sorting them by heuristic, take the top N nodes pushes them on the came From

		// Add them on the history queue so that it doesnt get added again on the next loop.
		topNodes.forEach(node => {
			cameFrom.set(node, levelCameFrom.get(node));
		});

		// Enquues this for exploration next, but I suspect that it doesnt need that?
		if (topNodes.length > 0) {
			frontier.enqueue(topNodes);
		}
	}

	return null;
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

class BeamSearch {
	solve(graph, start, goal, beamWidth = 3) {
		const results = beamSearch(graph, start, goal, beamWidth);
		return results;
	}
}

module.exports = { Problem: BeamSearch };
