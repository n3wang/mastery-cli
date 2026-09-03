class DesignGraphWithShortestPathCalculator {
	constructor(n, edges) {
		this.adjList = Array.from({ length: n }, () => []);
		for (const [fromNode, toNode, cost] of edges) {
			this.adjList[fromNode].push([toNode, cost]);
		}
	}

	addEdge(edge) {
		const [fromNode, toNode, cost] = edge;
		this.adjList[fromNode].push([toNode, cost]);
	}

	shortestPath(node1, node2) {
		const n = this.adjList.length;
		const pq = new PriorityQueue();
		pq.enqueue([0, node1], 0);

		const costForNode = Array(n).fill(Infinity);
		costForNode[node1] = 0;

		while (!pq.isEmpty()) {
			// console
			const deq = pq.dequeue();
			console.log(deq);
			const [currCost, currNode] = deq.element;
			if (currCost > costForNode[currNode]) {
				continue;
			}
			if (currNode === node2) {
				return currCost;
			}
			for (const [neighbor, cost] of this.adjList[currNode]) {
				const newCost = currCost + cost;
				if (newCost < costForNode[neighbor]) {
					costForNode[neighbor] = newCost;
					pq.enqueue([newCost, neighbor], newCost);
				}
			}
		}
		return -1;
	}
}

class PriorityQueue {
	constructor() {
		this.elements = [];
	}

	enqueue(element, priority) {
		this.elements.push({ element, priority });
		this.elements.sort((a, b) => a.priority - b.priority); // sort by priority in ascending order
	}

	dequeue() {
		return this.elements.shift();
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

module.exports = { Problem: DesignGraphWithShortestPathCalculator };
