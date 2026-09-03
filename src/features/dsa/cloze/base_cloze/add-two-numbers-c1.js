class ListNode {
	constructor(val = 0, next = null) {
		this.val = val;
		this.next = next;
	}
}

class AddTwoNumbers {
	/**
	 * https://leetcode.com/problems/copy-list-with-random-pointer/
	 * Time O(N) | Space O(1)
	 * @param {Node} head
	 * @return {Node}
	 */
	solve(l1Arr, l2Arr) {
		const createLinkedList = arr => {
			let tail;
			let sentinel = (tail = new ListNode());
			for (const val of arr) {
				tail.next = new ListNode(val);
				tail = tail.next;
			}
			return sentinel.next;
		};

		const convertToArray = list => {
			const arr = [];
			while (list) {
				arr.push(list.val);
				list = list.next;
			}
			return arr;
		};

		const l1 = createLinkedList(l1Arr);
		const l2 = createLinkedList(l2Arr);

		const result = this.addTwoNumbers(l1, l2);

		return convertToArray(result);
	}

	/**
	 * https://leetcode.com/problems/add-two-numbers/
	 * Time O(MAX(N, M)) | Space O(MAX(N, M))
	 * @param {ListNode} l1
	 * @param {ListNode} l2
	 * @return {ListNode}
	 */
	addTwoNumbers(l1, l2, carry = 0) {
		let tail;
		let sentinel = (tail = new ListNode());

		while (l1 || l2 || carry) {
			// TODO Calculate the sum and the carry
			// TODO Move the tail to the next node but first assign the value there.
			// TODO Move the l1 and l2 to the next node or null if there is no next node.
		}

		return sentinel.next;
	}
}

module.exports = { Problem: AddTwoNumbers };
