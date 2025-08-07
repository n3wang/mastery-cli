class ReverseList {
	solve(head) {
		return this.reverseList(head);
	}

	/**
	 * https://leetcode.com/problems/reverse-linked-list/
	 * Time O(N) | Space O(N)
	 * @param {ListNode} head
	 * @return {ListNode}
	 */
	reverseList(head) {
		const dfs = curr => {
			const prev = this.reverseList(
				curr.next
			); /* Time O(N) | Space O(N) */

			curr.next.next = curr;
			curr.next = null;

			return prev;
		};
		const isBaseCase = !head?.next;
		if (isBaseCase) return head;

		return dfs(head); /* Time O(N) | Space O(N) */
	}

	/**
	 * https://leetcode.com/problems/reverse-linked-list/
	 * Time O(N) | Space O(1)
	 * @param {ListNode} head
	 * @return {ListNode}
	 */
	reverseList_1 = function (head) {
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
}

module.exports = { Problem: ReverseList };
