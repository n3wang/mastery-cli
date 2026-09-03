/**
 * https://leetcode.com/problems/merge-k-sorted-lists/
 * Time O(N) | Space O(N)
 * @param {ListNode[]} lists
 * @return {ListNode}
 */

class ListNode {
	constructor(value) {
		this.value = value;
		this.next = null;
	}
}

class MergeKSortedLists {
	solve(lists) {
		var mergeTwoLists = function (list1, list2) {
			let tail;
			let sentinel = (tail = new ListNode(0));

			// TODO While both lists have nodes
			while (true) {
				const canAddL1 = list1.val <= list2.val;
				if (canAddL1) {
					tail.next = list1;
					list1 = list1.next;
				} else {
					tail.next = list2;
					list2 = list2.next;
				}

				tail = tail.next;
			}

			// TODO Complete the next as either list 1 or list 2 depending which is not None.

			// TODO Return the sentinel.next
		};

		let previous = null;

		for (let i = 0; i < lists.length; i++) {
			previous = mergeTwoLists(previous, lists[i]);
		}

		return previous;
	}
}

module.exports = { Problem: MergeKSortedLists };
