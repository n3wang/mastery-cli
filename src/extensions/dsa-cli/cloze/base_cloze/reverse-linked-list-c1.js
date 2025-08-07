class ReverseList {
	solve(head) {
		return this.reverseList(head);
	}

	/**
	 * https://leetcode.com/problems/reverse-linked-list/
	 * Time O(N) | Space O(1)
	 * @param {ListNode} head
	 * @return {ListNode}
	 */
	reverseList = function (head) {
		let [prev, curr, next] = [null, head, null];

		while (curr) {
			/* Time O(N) */
			//TODO  Run Reverse Linked List Strategy
		}

		return prev;
	};
}

module.exports = { Problem: ReverseList };
