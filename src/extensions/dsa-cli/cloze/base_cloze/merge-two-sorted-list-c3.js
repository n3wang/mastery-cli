class ListNode {
	constructor(val = 0, next = null) {
		this.val = val;
		this.next = next;
	}
}

class MergeTwoSorted {
	/**
	 * https://leetcode.com/problems/merge-two-sorted-lists/
	 * Time O(N + M) | Space O(N + M)
	 * @param {ListNode} list1
	 * @param {ListNode} list2
	 * @return {ListNode}
	 */
	mergeTwoLists(list1, list2) {
		let tail;
		let sentinel = (tail = new ListNode());
		while (list1 && list2) {
			// TODO compute if isL2Greater

			if (isL2Greater) {
				tail.next = list2;
				list2 = list2.next;
			} else {
				tail.next = list1;
				list1 = list1.next;
			}

			tail = tail.next;
		}

		tail.next = list1 || list2;
		return sentinel.next;
	}

	solve(list1, list2) {
		return this.mergeTwoLists(list1, list2);
	}
}

module.exports = { Problem: MergeTwoSorted };
