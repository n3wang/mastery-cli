class SortList {
	constructor() {
		this.tail = new ListNode();
		this.nextSubList = new ListNode();
	}

	solve(head) {
		if (head === null || head.next === null) return head;

		console.log('head', head);
		let n = this.getCount(head);
		let start = head;
		let dummyHead = new ListNode();
		for (let size = 1; size < n; size = size * 2) {
			this.tail = dummyHead;
			while (start !== null) {
				if (start.next === null) {
					this.tail.next = start;
					break;
				}
				let mid = this.split(start, size);
				this.merge(start, mid);
				start = this.nextSubList;
			}
			start = dummyHead.next;
		}
		return dummyHead.next;
	}

	split(start, size) {
		let midPrev = start;
		let end = start.next;
		// use fast and slow approach to find middle and end of the second linked list
		for (
			let index = 1;
			index < size && (midPrev.next !== null || end.next !== null);
			index++
		) {
			if (end.next !== null) {
				end = end.next.next !== null ? end.next.next : end.next;
			}
			if (midPrev.next !== null) {
				midPrev = midPrev.next;
			}
		}
		let mid = midPrev.next;
		midPrev.next = null;
		this.nextSubList = end.next;
		end.next = null;
		// return the start of the second linked list
		return mid;
	}

	merge(list1, list2) {
		let dummyHead = new ListNode();
		let newTail = dummyHead;
		while (list1 !== null && list2 !== null) {
			if (list1.val < list2.val) {
				newTail.next = list1;
				list1 = list1.next;
				newTail = newTail.next;
			} else {
				newTail.next = list2;
				list2 = list2.next;
				newTail = newTail.next;
			}
		}
		newTail.next = list1 !== null ? list1 : list2;
		// traverse till the end of the merged list to get the newTail
		while (newTail.next !== null) {
			newTail = newTail.next;
		}
		// link the old tail with the head of the merged list
		this.tail.next = dummyHead.next;
		// update the old tail to the new tail of the merged list
		this.tail = newTail;
	}

	getCount(head) {
		let cnt = 0;
		let ptr = head;
		while (ptr !== null) {
			ptr = ptr.next;
			cnt++;
		}
		return cnt;
	}
}

class ListNode {
	constructor(val) {
		this.val = val;
		this.next = null;
	}
}

module.exports = { Problem: SortList };
