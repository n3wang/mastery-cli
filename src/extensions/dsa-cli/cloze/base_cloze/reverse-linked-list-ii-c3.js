class ReverseLinkedListII {
	solve(head, m, n) {
		if (!head) {
			return null;
		}

		let cur = head;
		let prev = null;
		while (m > 1) {
			prev = cur;
			cur = cur.next;
			m--;
			n--;
		}

		const tail = cur;
		const con = prev;

		while (n > 0) {
			const third = cur.next;
			cur.next = prev;
			prev = cur;
			cur = third;
			n--;
		}

		// TODO Connect the reversed nodes to the list in order, having the connextion if exists next to the previous iterated node
		// If it doesn't exist, then the head is the previous iterated node
		// The tailest next should connect to the 'current' node
		if (con) {
			con.next = prev;
		} else {
			head = prev;
		}

		tail.next = cur;

		return head;
	}
}

class ListNode {
	constructor(val) {
		this.val = val;
		this.next = null;
	}
}

module.exports = { Problem: ReverseLinkedListII };
