class RemoveNthFromEnd {
	removeNthFromEnd(head, n) {
		const dummy = new ListNode(0);
		dummy.next = head;
		let first = dummy;
		let second = dummy;

		// TODO Advances first pointer so that the gap between first and second is n nodes apart

		// Move first to the end, maintaining the gap
		while (first !== null) {
			first = first.next;
			second = second.next;
		}

		second.next = second.next.next;
		return dummy.next;
	}
}

function ListNode(val) {
	this.val = val;
	this.next = null;
}

module.exports = { Problem: RemoveNthFromEnd, ListNode };
