class RotateRight {
	solve(head, k) {
		// Base cases
		if (head === null) return null;
		if (head.next === null) return head;

		// Close the linked list into a ring
		let oldTail = head;
		let n = 1;
		while (oldTail.next !== null) {
			oldTail = oldTail.next;
			n++;
		}
		oldTail.next = head;

		// Find new tail: (n - k % n - 1)th node
		// and new head: (n - k % n)th node
		let newTail = head;
		for (let i = 0; i < n - (k % n) - 1; i++) {
			newTail = newTail.next;
		}
		let newHead = newTail.next;

		// Break the ring
		newTail.next = null;

		return newHead;
	}
}

function ListNode(val) {
	this.val = val;
	this.next = null;
}

module.exports = { Problem: RotateRight, ListNode };
