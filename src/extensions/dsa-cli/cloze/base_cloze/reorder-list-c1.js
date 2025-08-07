class ReorderList {
	solve(head) {
		const getMid = head => {
			let [slow, fast] = [head, head];
			// TODO Complete the getMid function, which obtains the mid by having a faster node.

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

			while (second.next) {
				/* Time O(N) */
				next = first.next;
				first.next = second;
				first = next;

				next = second.next;
				second.next = first;
				second = next;
			}
		};

		const mid = getMid(head); /* Time O(N) */
		const reveredFromMid = reverse(mid); /* Time O(N) */

		reorder(head, reveredFromMid); /* Time O(N) */
	}
}

module.exports = { Problem: ReorderList };
