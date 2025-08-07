class ListNode {
	constructor(val = 0, next = null) {
		this.val = val;
		this.next = next;
	}
}

class Node {
	constructor(val) {
		this.val = val;
		this.neighbors = [];
	}

	push(neighbor) {
		this.neighbors.push(neighbor);
	}
}

class TreeNode {
	constructor(val, left = null, right = null) {
		this.val = val;
		this.left = left;
		this.right = right;
	}
}

const arrayToListNode = array => {
	if (!array || array.length == 0) {
		return null;
	}

	let head = new ListNode(array[0]);
	let node = head;

	for (let i = 1; i < array.length; i++) {
		node.next = new ListNode(array[i]);
		node = node.next;
	}

	return head;
};

const arrayToRandomNode = array => {
	class Node {
		constructor(val, next, random) {
			this.val = val;
			this.next = next;
			this.random = random;
		}
	}

	if (!array || array.length == 0) {
		return null;
	}

	let head = new Node(array[0]);
	let node = head;

	for (let i = 1; i < array.length; i++) {
		node.next = new Node(array[i]);
		node = node.next;
	}

	return head;
};

function arrayToNodeHeadNeighbors(array) {
	const nodes = [];
	for (let i = 0; i < array.length; i++) {
		nodes.push(new Node(i + 1));
	}
	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array[i].length; j++) {
			nodes[i].push(nodes[array[i][j] - 1]);
		}
	}

	const head = new Node();
	head.neighbors = nodes;
	return head;
}

function arrayToBinaryTree(arr) {
	if (arr.length === 0) {
		return null;
	}

	const nodes = arr.map(val => (val === null ? null : new TreeNode(val)));

	for (let i = 0; i < nodes.length; i++) {
		if (nodes[i] !== null) {
			const leftIndex = 2 * i + 1;
			const rightIndex = 2 * i + 2;

			nodes[i].left = leftIndex < nodes.length ? nodes[leftIndex] : null;
			nodes[i].right =
				rightIndex < nodes.length ? nodes[rightIndex] : null;
		}
	}

	return nodes[0];
}

function binaryTreeToArray(root) {
	if (!root) {
		return [];
	}

	const queue = [root];
	const result = [];

	while (queue.length > 0) {
		const node = queue.shift();

		if (node) {
			result.push(node.val);
			queue.push(node.left);
			queue.push(node.right);
		} else {
			result.push(null);
		}
	}

	// Remove trailing null values from the result
	while (result.length > 0 && result[result.length - 1] === null) {
		result.pop();
	}

	return result;
}

class PriorityQueue {
	constructor() {
		this.elements = [];
	}

	enqueue(element, priority) {
		const queueElement = { element, priority };
		let added = false;

		for (let i = 0; i < this.elements.length; i++) {
			if (queueElement.priority < this.elements[i].priority) {
				this.elements.splice(i, 0, queueElement);
				added = true;
				break;
			}
		}

		if (!added) {
			this.elements.push(queueElement);
		}
	}

	dequeue() {
		if (!this.isEmpty()) {
			return this.elements.shift().element;
		}
		return null;
	}

	peek() {
		if (!this.isEmpty()) {
			return this.elements[0].element;
		}
		return null;
	}

	isEmpty() {
		return this.elements.length === 0;
	}

	size() {
		return this.elements.length;
	}
}

module.exports = {
	ListNode,
	Node,
	arrayToListNode,
	arrayToNodeHeadNeighbors,
	TreeNode,
	arrayToBinaryTree,
	binaryTreeToArray,
	arrayToRandomNode,
	PriorityQueue
};
