class RemoveDuplicatesFromLinkedList {
	solve(linkedList) {
		let currentNode = linkedList;
		while (currentNode !== null) {
			let nextDistictNode = currentNode.next;
			while (
				nextDistictNode !== null &&
				nextDistictNode.value === currentNode.value
			) {
				nextDistictNode = nextDistictNode.next;
			}
			currentNode.next = nextDistictNode;
			currentNode = nextDistictNode;
		}

		return linkedList;
	}
}

// This is an input class. Do not edit.
class LinkedList {
	constructor(value) {
		this.value = value;
		this.next = null;
	}
}

module.exports = { Problem: RemoveDuplicatesFromLinkedList };
