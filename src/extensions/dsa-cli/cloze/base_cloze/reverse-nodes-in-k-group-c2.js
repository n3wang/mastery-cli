class ListNode {
	constructor(val = 0, next = null) {
		this.val = val;
		this.next = next;
	}
}

class ReverseKGroup {
	/**
	 * https://leetcode.com/problems/reverse-nodes-in-k-group/
	 * Time O(N) | Space O(N)
	 * @param {ListNode} head
	 * @param {number} k
	 * @return {ListNode}
	 */
	solve(head, k) {
		const moveNode = (curr, k) => {
			const canMove = () => k && curr;
			// Either move k times or reach the end of the list.
			// TODO Complete the moveNode function, which moves the current node k times.

			// TODO Return the next node if exists and the current node.
			return [curr?.next || null, curr];
		};

		const reverse = ([prev, curr, start]) => {
			const isSame = () => curr === start;
			while (!isSame()) {
				const next = curr.next;
				curr.next = prev;

				prev = curr;
				curr = next;
			}
		};
		let tail;
		const sentinel = (tail = new ListNode(0, head));

		while (true) {
			let [start, last] = moveNode(tail, k);
			if (!last) break;

			reverse([start, tail.next, start]);

			const next = tail.next;
			tail.next = last;
			tail = next;
		}

		return sentinel.next;
	}
}

module.exports = { Problem: ReverseKGroup };
