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

		// TODO Find new tail: (n - k % n - 1)th node
		// TODO and new head: (n - k % n)th node

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
