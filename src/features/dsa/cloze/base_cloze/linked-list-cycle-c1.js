class ListNode {
	constructor(val = 0, next = null) {
		this.val = val;
		this.next = next;
	}
}

class LinkedListCycle {
	solve(head) {
		return this.hasCycle(head);
	}

	/**
	 * https://leetcode.com/problems/linked-list-cycle/
	 * Time O(N) | Space O(1)
	 * @param {ListNode} head
	 * @return {boolean}
	 */
	hasCycle(head) {
		let [slow, fast] = [head, head];
		// TODO The fast pointer is going to be 2 times faster than the slow pointer
		// While the fast pointer is not null and the fast pointer next is not null

		while (true) {
			/* Time O(N) */
			slow = slow.next;
			fast = fast.next.next;

			const hasCycle = slow === fast;
			if (hasCycle) return true;
		}

		return false;
	}
}

module.exports = { Problem: LinkedListCycle };
