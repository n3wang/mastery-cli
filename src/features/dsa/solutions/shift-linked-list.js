class ShiftLinkedList {
	solve(head, k) {
		return shiftLinkedList(head, k);
	}
}

function shiftLinkedList(head, k) {
	let length = 1;
	let tail = head;
	while (tail.next !== null) {
		tail = tail.next;
		length++;
	}
	let offset = Math.abs(k) % length;
	if (offset === 0) return head;
	let newTailPosition = k > 0 ? length - offset : offset;
	let newTail = head;
	for (let i = 1; i < newTailPosition; i++) {
		newTail = newTail.next;
	}
	let newHead = newTail.next;
	newTail.next = null;
	tail.next = head;
	return newHead;
}

module.exports = { Problem: ShiftLinkedList };
