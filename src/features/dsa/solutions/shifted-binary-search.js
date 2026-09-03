class ShiftedBinarySearch {
	solve(array, target) {
		return shiftedBinarySearch(array, target);
	}
}

module.exports = { Problem: ShiftedBinarySearch };

function shiftedBinarySearch(array, target) {
	// Write your code here.
	return shiftedBinarySearchHelper(array, target, 0, array.length - 1);
}

function shiftedBinarySearchHelper(array, target, left, right) {
	while (left <= right) {
		const middle = Math.floor((left + right) / 2);
		const potentialMatch = array[middle];
		const leftNum = array[left];
		const rightNum = array[right];

		if (target === potentialMatch) {
			return middle;
		} else if (leftNum <= potentialMatch) {
			if (target < potentialMatch && target >= leftNum) {
				right = middle - 1;
			} else {
				left = middle + 1;
			}
		} else {
			if (target > potentialMatch && target <= rightNum) {
				left = middle + 1;
			} else {
				right = middle - 1;
			}
		}
	}
	return -1;
}
