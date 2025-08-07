class MergeLinkedList {
	solve(headOne, headTwo) {
		return mergeLinkedLists(headOne, headTwo);
	}
}

function recursiveMerge(p1, p2, p1Prev) {
	if (p1 === null) {
		p1Prev.next = p2;
		return;
	}

	if (p2 === null) {
		return;
	}

	if (p1.value < p2.value) {
		recursiveMerge(p1.next, p2, p1);
	} else {
		if (p1Prev !== null) {
			p1Prev.next = p2;
		}
		let newP2 = p2.next;
		p2.next = p1;
		recursiveMerge(p1, newP2, p2);
	}
}

function mergeLinkedLists(headOne, headTwo) {
	recursiveMerge(headOne, headTwo, null);
	return headOne.value < headTwo.value ? headOne : headTwo;
}

module.exports = { Problem: MergeLinkedList };
