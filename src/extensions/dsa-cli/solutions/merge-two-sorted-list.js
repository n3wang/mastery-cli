class ListNode {
	constructor(val = 0, next = null) {
		this.val = val;
		this.next = next;
	}
}

class MergeTwoSorted {
	solve(list1, list2) {
		return this.mergeTwoLists(list1, list2);
	}

	/**
	 * https://leetcode.com/problems/merge-two-sorted-lists/
	 * Time O(N + M) | Space O(N + M)
	 * @param {ListNode} list1
	 * @param {ListNode} list2
	 * @return {ListNode}
	 */
	mergeTwoLists = function (list1, list2) {
		let tail;
		let sentinel = (tail = new ListNode());

		while (list1 && list2) {
			/* Time O(N + M) */
			const isL2Greater = list1.val <= list2.val;
			const isL2Less = list2.val < list1.val;

			if (isL2Greater) {
				tail.next = list1;
				list1 = list1.next;
			}

			if (isL2Less) {
				tail.next = list2;
				list2 = list2.next;
			}

			tail = tail.next;
		}

		tail.next = list1 || list2;

		return sentinel.next;
	};
}

module.exports = { Problem: MergeTwoSorted };
