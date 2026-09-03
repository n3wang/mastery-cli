class RemoveDuplicatesFromSortedListII {
	solve(head) {
		// Sentinel node
		const sentinel = new ListNode(0);
		sentinel.next = head;

		// Predecessor = the last node
		// before the sublist of duplicates
		let pred = sentinel;

		while (head !== null) {
			// If it's the beginning of a duplicates sublist
			// skip all duplicates
			if (head.next !== null && head.val === head.next.val) {
				// Move to the end of the duplicates sublist
				while (head.next !== null && head.val === head.next.val) {
					head = head.next;
				}
				// Skip all duplicates
				pred.next = head.next;
				// Otherwise, move the predecessor
			} else {
				pred = pred.next;
			}

			// Move forward
			head = head.next;
		}

		return sentinel.next;
	}
}

function ListNode(val) {
	this.val = val;
	this.next = null;
}

module.exports = { Problem: RemoveDuplicatesFromSortedListII, ListNode };
