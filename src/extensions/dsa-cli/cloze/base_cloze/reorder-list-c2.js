class ReorderList {
	solve(head) {
		const getMid = head => {
			let [slow, fast] = [head, head];

			while (fast && fast.next) {
				/* Time O(N) */
				slow = slow.next;
				fast = fast.next.next;
			}

			return slow;
		};

		const reverse = head => {
			let [prev, curr, next] = [null, head, null];

			while (curr) {
				/* Time O(N) */
				next = curr.next;
				curr.next = prev;

				prev = curr;
				curr = next;
			}

			return prev;
		};

		const reorder = (l1, l2) => {
			let [first, next, second] = [l1, null, l2];

			// TODO Complete the reorder method that mixes both lists.
			while (second.next) {
				/* Time O(N) */
			}
		};

		const mid = getMid(head); /* Time O(N) */
		const reveredFromMid = reverse(mid); /* Time O(N) */

		reorder(head, reveredFromMid); /* Time O(N) */
	}
}

module.exports = { Problem: ReorderList };
