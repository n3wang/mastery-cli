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

		while (fast && fast.next) {
			/* Time O(N) */
			// TODO slow is moving one step and fast is moving two steps
		}

		return false;
	}
}

module.exports = { Problem: LinkedListCycle };
