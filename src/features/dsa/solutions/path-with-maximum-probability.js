class MaxPriorityQueue {
	solve(n, edges, succProb, start, end) {
		return maxProbability(n, edges, succProb, start, end);
	}
}

module.exports = { Problem: MaxPriorityQueue };

// There is also an Implementation for Dijikstra that I would like to add.

var maxProbability = function (n, edges, succProb, start, end) {
	const nodes = createNodesWithEdges(edges, succProb);

	if (!nodes.get(end)) {
		return 0;
	}

	let probabilities = new Array(n).fill(0);
	let queue = [new State(start, 1)];

	while (queue.length > 0) {
		let currentState = queue.shift();
		let currentVal = currentState.val;
		let currentProb = currentState.prob;

		let node = nodes.get(currentVal);

		node.edges.forEach(child => {
			let nextProb = currentProb * child.prob;
			if (probabilities[child.node.val] < nextProb) {
				probabilities[child.node.val] = nextProb;
				queue.push(new State(child.node.val, nextProb));
			}
		});
	}

	return probabilities[end];
};

function createNodesWithEdges(edges, succProb) {
	let nodes = new Map();

	for (let i = 0; i < edges.length; i++) {
		let firstVal = edges[i][0];
		let secondVal = edges[i][1];

		let firstNode = nodes.get(firstVal);
		if (!firstNode) {
			firstNode = new Node(firstVal);
			nodes.set(firstVal, firstNode);
		}

		let secondNode = nodes.get(secondVal);
		if (!secondNode) {
			secondNode = new Node(secondVal);
			nodes.set(secondVal, secondNode);
		}

		let probability = succProb[i];

		firstNode.edges.push(new Edge(secondNode, probability));
		secondNode.edges.push(new Edge(firstNode, probability));
	}

	return nodes;
}

function State(val, prob) {
	this.val = val;
	this.prob = prob;
}

function Node(val) {
	this.val = val;
	this.edges = [];
}

function Edge(node, prob) {
	this.node = node;
	this.prob = prob;
}

module.exports = { Problem: MaxPriorityQueue };
