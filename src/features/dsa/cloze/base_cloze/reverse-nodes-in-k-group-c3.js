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
			while (canMove()) {
				curr = curr.next;
				k--;
			}

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
			// TODO Complete the while loop until there is no Last.
			// Get the last for the next one and last to run the joins.
			// The next becoming the next to be runned.
			// Then tail which should be the first is connected to last next according to moveNode..
			// And then the tail as next. to be runned.
		}

		return sentinel.next;
	}
}

module.exports = { Problem: ReverseKGroup };
