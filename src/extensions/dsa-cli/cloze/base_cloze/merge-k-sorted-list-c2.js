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

			while (list1 && list2) {
				// TODO Check if the list1 is less than the list2 and add it depending on which is smaller

				tail = tail.next;
			}

			tail.next = list1 || list2;

			return sentinel.next;
		};

		let previous = null;

		for (let i = 0; i < lists.length; i++) {
			previous = mergeTwoLists(previous, lists[i]);
		}

		return previous;
	}
}

module.exports = { Problem: MergeKSortedLists };
