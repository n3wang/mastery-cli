class Node {
	constructor(val, next, random) {
		this.val = val;
		this.next = next;
		this.random = random;
	}
}

class Solution {
	copyRandomList(head) {
		if (!head) {
			return head;
		}

		// Creating a new weaved list of original and copied nodes.
		let ptr = head;
		while (ptr) {
			// Cloned node
			const newNode = new Node(ptr.val, null, null);

			// Inserting the cloned node just next to the original node.
			// If A->B->C is the original linked list,
			// Linked list after weaving cloned nodes would be A->A'->B->B'->C->C'
			newNode.next = ptr.next;
			ptr.next = newNode;
			ptr = newNode.next;
		}

		ptr = head;

		// Now link the random pointers of the new nodes created.
		// Iterate the newly created list and use the original nodes random pointers,
		// to assign references to random pointers for cloned nodes.
		while (ptr) {
			ptr.next.random = ptr.random ? ptr.random.next : null;
			ptr = ptr.next ? ptr.next.next : null;
		}

		// TODO Unweave the linked list to get back the original linked list and the cloned list.
		// i.e. A->A'->B->B'->C->C' would be broken to A->B->C and A'->B'->C'
		let ptrOldList = head; // A->B->C
		let ptrNewList = head.next; // A'->B'->C'
		const headNew = head.next;
		while (ptrOldList) {}

		return headNew;
	}
}

module.exports = { Problem: Solution };
