class SortList {
	constructor() {
		this.tail = new ListNode();
		this.nextSubList = new ListNode();
	}

	solve(head) {
		return sortList(head);
	}
}

var sortList = function (head) {
	const merge = (list1, list2) => {
		let pointer = new ListNode(0, null);
		const res = pointer;
		while (list1 && list2) {
			if (list1.val > list2.val) {
				pointer.next = list2;
				list2 = list2.next;
			} else {
				pointer.next = list1;
				list1 = list1.next;
			}
			pointer = pointer.next;
		}

		if (list1) {
			pointer.next = list1;
		} else {
			pointer.next = list2;
		}

		return res.next;
	};

	const getMiddle = header => {
		middlePtr = null;
		// TODO Implement Get Middle. Advance middle ptr if middle ptr not null then next otherwise header.
		while (header && header.next) {
			middlePtr = middlePtr != null ? middlePtr.next : header;
			// Advance
			header = header.next.next;
		}

		const mid = middlePtr.next;
		middlePtr.next = null;
		return mid;
	};

	if (!head || !head.next) {
		return head;
	}

	const middle = getMiddle(head);
	const left = sortList(head);
	const right = sortList(middle);

	return merge(left, right);
};

class ListNode {
	constructor(val) {
		this.val = val;
		this.next = null;
	}
}

module.exports = { Problem: SortList };
