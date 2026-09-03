const DEBUG = false;

class PriorityQueue {
	constructor() {
		this.elements = [];
	}

	enqueue(element, priority) {
		this.elements.push({ element, priority });
		this.elements.sort((a, b) => a.priority - b.priority);
	}

	dequeue() {
		return this.elements.shift().element;
	}

	isEmpty() {
		return this.elements.length === 0;
	}

	getSnapshot() {
		return this.elements.map(item => {
			return { id: item.element.id, priority: item.priority };
		});
	}
}

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
		if (!this.edges[node.id]) {
			this.edges[node.id] = [];
		}
		this.edges[node.id].push(neighbor);
	}

	neighbors(node) {
		return this.edges[node.id];
	}

	cost(nodeA, nodeB) {
		return 1;
	}
}

class DijkstraSearch {
	dijkstraSearch(graph, start, goal) {
		const frontier = new PriorityQueue();
		frontier.enqueue(start, 0); //Starts searching from the start node
		let count_searches = 0;
		let exploration_path = [];
		let queue_snapshot = [];

		const cameFrom = new Map();
		const costSoFar = new Map();

		cameFrom.set(start, null);
		costSoFar.set(start, 0);

		while (!frontier.isEmpty()) {
			const current = frontier.dequeue();

			count_searches += 1;
			exploration_path.push(current);
			queue_snapshot.push(frontier.getSnapshot());

			if (current === goal) {
				break;
			}

			const neighbors = graph.neighbors(current);
			if (neighbors?.length === 0) {
				continue;
			}
			try {
				neighbors.forEach(next => {
					const newCost =
						costSoFar.get(current) + graph.cost(current, next);
					if (!costSoFar.has(next) || newCost < costSoFar.get(next)) {
						costSoFar.set(next, newCost);
						const priority = newCost;
						frontier.enqueue(next, priority);
						cameFrom.set(next, current);
					}
				});
			} catch (e) {
				// console.log(e);
			}
		}

		return {
			path: reconstructPath(cameFrom, start, goal),
			cost: costSoFar.get(goal),
			count_searches: count_searches,
			formatted_path: reconstructPath(cameFrom, start, goal)
				.map(node => node.id)
				.join(' -> '),
			exploration_path: exploration_path,
			queue_snapshot: queue_snapshot
		};
	}

	solve(graph, start, goal) {
		return this.dijkstraSearch(graph, start, goal);
	}
}

module.exports = { Problem: DijkstraSearch };
