class RemoveNthFromEnd {
	removeNthFromEnd(head, n) {
		const dummy = new ListNode(0);
		dummy.next = head;
		let first = dummy;
		let second = dummy;

		// Advances first pointer so that the gap between first and second is n nodes apart
		for (let i = 1; i <= n + 1; i++) {
			first = first.next;
		}

		// Move first to the end, maintaining the gap
		while (first !== null) {
			first = first.next;
			second = second.next;
		}

		// TODO - Remove the node
	}
}

function ListNode(val) {
	this.val = val;
	this.next = null;
}

module.exports = { Problem: RemoveNthFromEnd, ListNode };
